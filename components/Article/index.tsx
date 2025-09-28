import Link from 'next/link';
import { formatRichText } from '@/libs/utils';
import { type Article as BaseArticle } from '@/libs/microcms';
import PublishedDate from '../Date';
import styles from './index.module.css';
import Profile from '../Profile';
import CategoryList from '../CategoryList';

type Props = {
  data: BaseArticle & {
    prevArticle: { id: string; title: string } | null;
    nextArticle: { id: string; title: string } | null;
  };
};

export default function Article({ data }: Props) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{data.title}</h1>
      <CategoryList category={data.category} />
      <p className={styles.description}>{data.description}</p>
      <div className={styles.meta}>
        {data.writer && (
          <Link href={`/writers/${data.writer.id}`} className={styles.writer}>
            {data.writer?.image?.url && (
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${data.writer.image.url}?fm=webp&fit=crop&w=48&h=48 1x, ${data.writer.image.url}?fm=webp&fit=crop&w=48&h=48&dpr=2 2x`}
                />
                <img
                  src={data.writer.image.url}
                  alt=""
                  className={styles.writerIcon}
                  width={data.writer.image.width}
                  height={data.writer.image.height}
                />
              </picture>
            )}
            <span className={styles.writerName}>{data.writer?.name}</span>
          </Link>
        )}
        <PublishedDate date={data.publishedAt || data.createdAt} />
      </div>
      {data.tags && data.tags.length > 0 && (
        <p>
          {data.tags.map((tag, i) => (
            <span key={tag.id}>
              {i > 0 ? ' ' : ''}
              <Link href={`/tags/${tag.id}`}>#{tag.name}</Link>
            </span>
          ))}
        </p>
      )}
      {data.thumbnail?.url && (
        <picture>
          <source
            type="image/webp"
            media="(max-width: 640px)"
            srcSet={`${data.thumbnail.url}?fm=webp&fit=crop&w=414&h=217 1x, ${data.thumbnail.url}?fm=webp&fit=crop&w=414&h=217&dpr=2 2x`}
          />
          <source
            type="image/webp"
            srcSet={`${data.thumbnail.url}?fm=webp&fit=crop&w=960&h=504 1x, ${data.thumbnail.url}?fm=webp&fit=crop&w=960&h=504&dpr=2 2x`}
          />
          <img
            src={data.thumbnail.url}
            alt=""
            className={styles.thumbnail}
            width={data.thumbnail.width}
            height={data.thumbnail.height}
          />
        </picture>
      )}
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: `${formatRichText(data.content)}`,
        }}
      />
      <Profile writer={data.writer} />
      <div className={styles.navigation}>
        {data.nextArticle && (
          <Link href={`/articles/${data.nextArticle.id}`} className={styles.next}>
            {'<< 次の記事'}
            <br />
            {data.nextArticle.title}
          </Link>
        )}
        {data.prevArticle && (
          <Link href={`/articles/${data.prevArticle.id}`} className={styles.prev}>
            {'前の記事 >>'}
            <br />
            {data.prevArticle.title}
          </Link>
        )}
      </div>
    </main>
  );
}
