import { getWriter } from '@/libs/microcms';
import styles from '../../categories/[categoryId]/layout.module.css';

type Props = {
  children: React.ReactNode;
  params: Promise<{
    writerId: string;
  }>;
};

export default async function WriterLayout({ children, params }: Props) {
  const { writerId } = await params;
  const writer = await getWriter(writerId);
  return (
    <div>
      <p className={styles.title}>{writer.name} の記事一覧</p>
      <div>{children}</div>
    </div>
  );
}
