import { getPostBySlug, getPosts } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import CommentSection from '@/components/CommentSection';
import Image from 'next/image';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article className="japanese-paper p-6 rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{post.title}</h1>
      {post.coverImage && (
        <div className="relative w-full h-64 mb-6">
          <Image
            src={post.coverImage}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      )}
      <div className="prose prose-invert max-w-none">
        <MDXRemote source={post.content} />
      </div>
      <CommentSection postSlug={params.slug} />
    </article>
  );
}