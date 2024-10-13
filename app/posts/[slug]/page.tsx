import { getPostBySlug, getPosts } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import CommentSection from '@/components/CommentSection';
import Image from 'next/image';
import PostNavigation from '@/components/PostNavigation';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return <div>記事が見つかりません</div>;
  }

  const posts = await getPosts();
  const currentPostIndex = posts.findIndex(p => p.slug === params.slug);
  const prevPost = currentPostIndex > 0 ? posts[currentPostIndex - 1] : null;
  const nextPost = currentPostIndex < posts.length - 1 ? posts[currentPostIndex + 1] : null;

  return (
    <article className="japanese-paper p-6 rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{post.title}</h1>
      {post.coverImage && (
        <div className="relative w-full pt-[56.25%] mb-6"> {/* 16:9 aspect ratio */}
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="absolute top-0 left-0 rounded-lg object-cover"
          />
        </div>
      )}
      <div className="prose prose-invert max-w-none">
        <MDXRemote source={post.content} />
      </div>
      <PostNavigation prevPost={prevPost} nextPost={nextPost} />
      <CommentSection postSlug={params.slug} />
    </article>
  );
}