import styles from './index.module.css';

export default function Intro() {
  return (
    <section className={styles.wrapper}>
      <p>
        <strong>「ふたりごとnote」</strong>は、夫婦それぞれがChatGPTと対話した記録を綴るブログです。
      </p>
      <p>
        <strong>仕事・キャリア</strong>から<strong>旅行・食・暮らし</strong>まで、夫と妻それぞれの視点で日々の気づきをシェアします。
      </p>
    </section>
  );
}

