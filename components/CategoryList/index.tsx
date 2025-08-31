import { Category } from '@/libs/microcms';
import CategoryListItem from '../CategoryListItem';
import styles from './index.module.css';

type Props = {
  category: Category;
  hasLink?: boolean;
};

export default function CategoryList({ category, hasLink = true }: Props) {
  if (!category) return null;

  return (
    <div className={styles.tags}>
      <CategoryListItem category={category} hasLink={hasLink} />
    </div>
  );
}
