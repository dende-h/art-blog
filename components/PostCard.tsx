import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Post } from '@/lib/posts';

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <Card className="japanese-paper h-full transition-transform hover:scale-105 overflow-hidden">
        {post.coverImage && (
          <div className="relative w-full h-48">
            <Image
              src={post.coverImage}
              alt={post.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{post.excerpt}</p>
        </CardContent>
      </Card>
    </Link>
  );
}