import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <Card className="japanese-paper">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">このサイトについて</CardTitle>
      </CardHeader>
      <CardContent className="prose prose-invert max-w-none">
        <p>
          「夜の文豪の書斎」へようこそ。このブログは、日本文学の魅力と深遠さを探求し、共有することを目的としています。
        </p>
        <p>
          ここでは、古典から現代までの日本文学作品について議論し、分析します。また、文学と日本文化の関連性についても探求していきます。
        </p>
        <p>
          読者の皆様とともに、日本文学の世界をより深く理解し、その美しさを味わう場となることを願っています。
        </p>
        <p>
          ご意見、ご感想、そして議論への参加を心よりお待ちしております。
        </p>
      </CardContent>
    </Card>
  );
}