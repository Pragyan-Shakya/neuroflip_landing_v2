import { formatDate } from "./format";

export function PostMetaLine({ author, date, readingMinutes, className = "" }: {
  author: string;
  date: string;
  readingMinutes: number;
  className?: string;
}) {
  return (
    <p className={`m-0 flex flex-wrap items-center gap-x-2 ${className}`}>
      <span>{author}</span>
      <span aria-hidden="true">·</span>
      <time dateTime={date}>{formatDate(date)}</time>
      <span aria-hidden="true">·</span>
      <span>{readingMinutes} min read</span>
    </p>
  );
}
