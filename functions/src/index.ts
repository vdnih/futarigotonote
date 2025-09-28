import {https, logger} from "firebase-functions/v2";
// defineString の代わりに defineSecret をインポート
import {defineSecret} from "firebase-functions/params";
import {TwitterApi} from "twitter-api-v2";
import * as crypto from "crypto";

// ✅ Secret Managerから値を読み込むように変更
const twitterApiKey = defineSecret("TWITTER_APIKEY");
const twitterApiSecret = defineSecret("TWITTER_APISECRET");
const twitterAccessToken = defineSecret("TWITTER_ACCESSTOKEN");
const twitterAccessTokenSecret = defineSecret("TWITTER_ACCESSTOKENSECRET");
const microCMSWebhookSecret = defineSecret("MICROCMS_WEBHOOK_SECRET");
const baseUrl = "https://iecafe.link";

// ✅ Emulatorで実行されているかどうかを判定するフラグ
const isEmulated = process.env.FUNCTIONS_EMULATOR === "true";

// microCMSからのWebhookリクエストの型定義
interface MicroCMSWebhookBody {
  id: string;
  contents: { new: { publishValue: { title: string; }; }; };
}

// ✅ リクエストボディの型を検証する型ガード関数
const isMicroCMSWebhookBody = (body: any): body is MicroCMSWebhookBody => {
  return (
    typeof body === "object" &&
    body !== null &&
    typeof body.id === "string" &&
    typeof body.contents?.new?.publishValue?.title === "string"
  );
};

export const postToXOnPublish = https.onRequest(
  {
    region: "asia-northeast1",
    // ✅ secretsを関数に紐付ける
    secrets: [
      twitterApiKey,
      twitterApiSecret,
      twitterAccessToken,
      twitterAccessTokenSecret,
      microCMSWebhookSecret,
    ],
  },
  async (request, response) => {
    if (request.method !== "POST") {
      response.status(405).send("Method Not Allowed");
      return;
    }

    // ✅ Emulator実行時は署名検証をスキップする
    if (!isEmulated) {
      const signature = request.headers["x-microcms-signature"];
      if (!signature || typeof signature !== "string") {
        logger.warn("Signature not found.");
        response.status(400).send("Signature not found.");
        return;
      }
      const expectedSignature = crypto
        .createHmac("sha256", microCMSWebhookSecret.value())
        .update(request.rawBody)
        .digest("hex");

      if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
        logger.error("Invalid signature.");
        response.status(400).send("Invalid signature.");
        return;
      }
    }

    try {
      // ✅ 型ガードでボディを検証
      if (!isMicroCMSWebhookBody(request.body)) {
        logger.warn("Invalid request body structure.", {body: request.body});
        response.status(400).send("Invalid request body.");
        return;
      }
      const body = request.body;
      const articleId = body.id;
      const title = body.contents.new.publishValue.title;
      const articleUrl = `${baseUrl}/articles/${articleId}`;
      const tweetText = `【new!】\n${title}\n\n${articleUrl}`;
      const twitterConfig = {
        appKey: twitterApiKey.value(),
        appSecret: twitterApiSecret.value(),
        accessToken: twitterAccessToken.value(),
        accessSecret: twitterAccessTokenSecret.value(),
      };

      // ✅ Emulator実行時はログ出力のみ、本番環境では実際にツイート
      if (isEmulated) {
        logger.info("[EMULATOR MODE] Tweet content (dry run):", tweetText);
      } else {
        const client = new TwitterApi(twitterConfig);
        await client.v2.tweet(tweetText);
      }

      logger.info("Successfully processed:", {title: title});
      response.status(200).send("Tweet processed successfully!");
    } catch (error) {
      logger.error("Error processing request:", error);
      response.status(500).send("Internal Server Error");
    }
  },
);
