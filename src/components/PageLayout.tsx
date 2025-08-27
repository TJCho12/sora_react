import { ReactNode } from 'react';

interface PageLayoutProps {
  letter: string;
  children: ReactNode;
  letterPosition?: 'top-left' | 'top-right' | 'center';
}

export default function PageLayout({ letter, children, letterPosition = 'top-right' }: PageLayoutProps) {
  const getLetterPosition = () => {
    switch (letterPosition) {
      case 'top-left':
        return 'top-24 left-8';
      case 'center':
        return 'top-32 left-1/2 transform -translate-x-1/2';
      default:
        return 'top-24 right-8';
    }
  };

  return (
    <div className="relative min-h-screen pt-20">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/30 via-transparent to-orange-50/20"></div>

      {/* 3D Letter */}
      <div className={`absolute ${getLetterPosition()} z-10`}>
        <div className="relative">


        </div>
      </div>

      {/* Decorative Lines */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-48 right-0 w-px h-32 bg-[#0ABAB5]/30"></div>
        <div className="absolute bottom-32 left-1/4 w-24 h-px bg-[#0ABAB5]/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 my-[30px] m-[30px] p-[20px]">
        {children}
      </div>
    </div>
  );
}