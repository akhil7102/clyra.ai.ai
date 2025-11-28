import React from 'react';
import { Header } from '../header/Header';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function PageLayout({ children, title, description }: PageLayoutProps) {
  return (
    <div className="relative flex flex-col min-h-screen w-full text-gray-200 overflow-hidden">
      <Header />
      <main className="relative z-[1] flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12" style={{ paddingTop: 'calc(var(--header-height) + 3rem)' }}>
        {title && (
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              {title}
            </h1>
            {description && (
              <p className="text-lg max-w-3xl mx-auto text-white/90" style={{ textShadow: '0 2px 20px rgba(123,255,244,0.25), 0 1px 8px rgba(0,0,0,0.55)' }}>
                {description}
              </p>
            )}
          </div>
        )}
        <div className="w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
