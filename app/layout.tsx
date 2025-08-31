import { getCategoryList } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import './globals.css';
import styles from './layout.module.css';
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL(process.env.BASE_URL || 'http://localhost:3000'),
  title: 'ふたりごとnote',
  description: '夫婦それぞれがChatGPTと対話した学びや暮らしを綴るブログ。',
  openGraph: {
    title: {
      default: 'ふたりごとnote',
      en: 'futarigotonote',
    },
    description:
      '夫婦それぞれがChatGPTと対話した学びや暮らしを綴るブログ。',
    images: '/ogp.png',
  },
  alternates: {
    canonical: '/',
  },
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const categories = await getCategoryList();
  return (
    <html lang="ja">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-SRP75E3E41" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SRP75E3E41');
          `}
        </Script>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3598027223624482"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        <Header />
        <Nav categories={categories.contents} />
        <main className={styles.main}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
