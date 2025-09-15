import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.css';
import { BsTwitterX } from 'react-icons/bs';
import { AiOutlineInstagram, AiFillYoutube } from 'react-icons/ai';

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
      <div className={styles.social}>
        <Link
          href="https://www.youtube.com/@sakeflow"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
        >
          <AiFillYoutube size={24} />
        </Link>
        <Link
          href="https://www.instagram.com/futarigotonote/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
        >
          <AiOutlineInstagram size={24} />
        </Link>
        <Link
          href="https://x.com/futarigotonote"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
        >
          <BsTwitterX size={21} />
        </Link>
      </div>
    </header>
  );
}
