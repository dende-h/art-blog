import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Post } from '@/lib/posts';

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <Card className="japanese-paper h-full transition-transform hover:scale-105 overflow-hidden">
      {post.coverImage && (
          <div className="relative w-full pt-[56.25%]"> {/* 16:9 aspect ratio */}
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="absolute top-0 left-0  object-cover"
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