import Link from 'next/link';
import styles from './index.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.links}>
        <Link href="/about" className={styles.cr}>
          このサイトについて
        </Link>
        {' / '}
        <Link href="/privacy-policy" className={styles.cr}>
          プライバシーポリシー
        </Link>
        {' / '}
        <Link href="/disclaimer" className={styles.cr}>
          免責事項
        </Link>
        {' / '}
        <Link href="/contact" className={styles.cr}>
          お問い合わせ
        </Link>
      </nav>
      <p className={styles.cr}>© 2025 futarigotonote. All Rights Reserved </p>
    </footer>
  );
}
