export const metadata = {
  title: 'お問い合わせ',
  description: '当サイトへのご連絡・ご相談はこちらからお寄せください。',
};

export default function ContactPage() {
  return (
    <article>
      <h1>お問い合わせ</h1>
      <p>
        当サイトに関するご意見・ご質問・ご連絡は、以下のX（Twitter）アカウントまでお寄せください。
      </p>
      <a href="https://x.com/futarigotonote" target="_blank" rel="noopener noreferrer">
        公式X（@futarigotonote）
      </a>
    </article>
  );
}

