import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-secondary/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            夜の文豪の書斎
          </Link>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                ホーム
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-foreground hover:text-primary transition-colors">
                このサイトについて
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}