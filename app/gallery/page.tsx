import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

// サーバーサイドでの画像ファイル取得
import fs from 'fs';
import path from 'path';

export default function GalleryPage() {
  const publicDir = path.join(process.cwd(), 'public');
  const imageFiles = fs.readdirSync(publicDir).filter(file => 
    file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.gif')
  );

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">イラストギャラリー</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {imageFiles.map((file, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <Card className="japanese-paper overflow-hidden cursor-pointer">
                <CardContent className="p-2">
                  <div className="relative w-full h-48">
                    <Image
                      src={`/${file}`}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-3xl w-full">
            <VisuallyHidden>
                <DialogTitle>ギャラリー画像 {index + 1}</DialogTitle>
              </VisuallyHidden>
              <div className="relative w-full h-[80vh]">
                <Image
                  src={`/${file}`}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className='object-contain'
                />
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}