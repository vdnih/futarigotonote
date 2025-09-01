import { Metadata } from 'next';
import { getList, getTag } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Pagination from '@/components/Pagination';
import ArticleList from '@/components/ArticleList';

type Props = {
  params: Promise<{
    tagId: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tagId } = await params;
  const tag = await getTag(tagId);
  return {
    title: tag.name,
    openGraph: {
      title: tag.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: tag.name,
      site: '@futarigotonote',
      creator: '@futarigotonote',
    },
    alternates: {
      canonical: `/tags/${tagId}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { tagId } = await params;
  const data = await getList({
    limit: LIMIT,
    filters: `tags[contains]${tagId}`,
  });
  return (
    <>
      <ArticleList articles={data.contents} />
      <Pagination totalCount={data.totalCount} basePath={`/tags/${tagId}`} />
    </>
  );
}
