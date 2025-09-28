import { Category } from '@/libs/microcms';
import CategoryList from '@/components/CategoryList';
import SearchField from '@/components/SearchField';
import Link from 'next/link';
import { Suspense } from 'react';
import styles from './index.module.css';

type Props = {
  categories: Category[];
};

export default function Nav({ categories }: Props) {
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <h1 className={styles.title}>ふたりごとnote</h1>
      </Link>
      <Suspense fallback={null}>
        <SearchField />
      </Suspense>
      <div className={styles.categories}>
        {categories.map((category) => (
          <CategoryList key={category.id} category={category} />
        ))}
      </div>
    </nav>
  );
}
