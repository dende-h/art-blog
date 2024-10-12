"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createClient } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase: ReturnType<typeof createClient> | null = null;

if (typeof window !== 'undefined' && supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
  }
}

type Comment = {
  id: number;
  created_at: string;
  author: string;
  content: string;
};

type CommentFormData = {
  author: string;
  content: string;
};

export default function CommentSection({ postSlug }: { postSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, reset } = useForm<CommentFormData>();

  useEffect(() => {
    fetchComments();
  }, [postSlug]);

  async function fetchComments() {
    if (!supabase) {
      setError("コメント機能は現在利用できません。");
      return;
    }

    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_slug', postSlug)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setError("コメントの取得に失敗しました。後でもう一度お試しください。");
    }
  }

  async function onSubmit(data: CommentFormData) {
    if (!supabase) {
      setError("コメント機能は現在利用できません。");
      return;
    }

    try {
      const { error } = await supabase.from('comments').insert({
        post_slug: postSlug,
        author: data.author,
        content: data.content,
      });

      if (error) throw error;
      reset();
      fetchComments();
    } catch (error) {
      console.error('Error submitting comment:', error);
      setError("コメントの投稿に失敗しました。後でもう一度お試しください。");
    }
  }

  if (error) {
    return <div className="text-red-500 mt-4">{error}</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">コメント</h2>
      {supabase ? (
        <>
          <form onSubmit={handleSubmit(onSubmit)} className="mb-6 space-y-4">
            <Input {...register('author', { required: true })} placeholder="名前" className="bg-secondary/50" />
            <Textarea {...register('content', { required: true })} placeholder="コメントを入力" className="bg-secondary/50" />
            <Button type="submit">コメントを投稿</Button>
          </form>
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-secondary/50 p-4 rounded-lg">
                <p className="font-bold">{comment.author}</p>
                <p className="text-sm text-muted-foreground">{new Date(comment.created_at).toLocaleString()}</p>
                <p className="mt-2">{comment.content}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>コメント機能は現在利用できません。</p>
      )}
    </div>
  );
}