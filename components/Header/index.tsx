import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image
          src="/futarigoto-note.png"
          alt="SIMPLE"
          className={styles.logo}
          width={800}
          height={100}
          priority
        />
      </Link>
    </header>
  );
}
