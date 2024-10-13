"use client"

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Home, Info, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { href: '/', label: 'ホーム', icon: Home },
    { href: '/about', label: 'このサイトについて', icon: Info },
    { href: '/gallery', label: 'ギャラリー', icon: Image },
  ];

  return (
    <header className="bg-secondary/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
            夜の文豪の書斎
          </Link>
          <ul className="hidden md:flex space-x-4">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-foreground hover:text-primary transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="p-0 md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}