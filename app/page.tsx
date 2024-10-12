import { getPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}