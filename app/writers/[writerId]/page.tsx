import { Metadata } from 'next';
import { getList, getWriter } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Pagination from '@/components/Pagination';
import ArticleList from '@/components/ArticleList';

type Props = {
  params: Promise<{
    writerId: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { writerId } = await params;
  const writer = await getWriter(writerId);
  return {
    title: writer.name,
    openGraph: {
      title: writer.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: writer.name,
      site: '@futarigotonote',
      creator: '@futarigotonote',
    },
    alternates: {
      canonical: `/writers/${writerId}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { writerId } = await params;
  const data = await getList({
    limit: LIMIT,
    filters: `writer[equals]${writerId}`,
  });
  return (
    <>
      <ArticleList articles={data.contents} />
      <Pagination totalCount={data.totalCount} basePath={`/writers/${writerId}`} />
    </>
  );
}
