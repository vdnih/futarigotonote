import { getList } from '@/libs/microcms';
import ArticleList from '@/components/ArticleList';
import Pagination from '@/components/Pagination';

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const revalidate = 60;

export default async function Page({ searchParams }: Props) {
  const search = await searchParams;
  const q = typeof search.q === 'string' ? search.q : undefined;
  const data = await getList({
    q,
  });

  return (
    <>
      <ArticleList articles={data.contents} />
      <Pagination totalCount={data.totalCount} basePath="/search" q={q} />
    </>
  );
}
