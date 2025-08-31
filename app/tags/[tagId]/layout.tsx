import { getTag } from '@/libs/microcms';
import styles from '../../categories/[categoryId]/layout.module.css';

type Props = {
  children: React.ReactNode;
  params: Promise<{
    tagId: string;
  }>;
};

export default async function TagLayout({ children, params }: Props) {
  const { tagId } = await params;
  const tag = await getTag(tagId);
  return (
    <div>
      <p className={styles.title}>{tag.name} の記事一覧</p>
      <div>{children}</div>
    </div>
  );
}
