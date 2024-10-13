import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type PostNavigationProps = {
  prevPost: { slug: string; title: string } | null;
  nextPost: { slug: string; title: string } | null;
};

export default function PostNavigation({ prevPost, nextPost }: PostNavigationProps) {
    return (
      <div className="flex justify-between mt-8">
        {prevPost ? (
          <Link href={`/posts/${prevPost.slug}`} className="flex items-center text-amber-600 hover:text-amber-900 underline">
            <ChevronLeft className="mr-2" />
            <span className="max-w-[200px] truncate">{prevPost.title}</span>
          </Link>
        ) : (
          <div />
        )}
        {nextPost ? (
          <Link href={`/posts/${nextPost.slug}`} className="flex items-center text-amber-600 hover:text-amber-900 underline">
            <span className="max-w-[200px] truncate ">{nextPost.title}</span>
            <ChevronRight className="ml-2" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    );
  }