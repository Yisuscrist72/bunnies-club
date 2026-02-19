import React from 'react';
import Jersey from '../atoms/texts/Jersey';

export default function Footer() {
  return (
    <footer className="w-full bg-[#BEE5FD] border-t-[3px] border-black py-3 mt-auto z-50">
      <div className="max-w-[1440px] mx-auto flex justify-center items-center px-4 text-center">
        <Jersey 
          tag="p" 
          text="© 2026 NewJeans FANS CLUB. MADE BY Jesús. All Rights Reserved." 
          size="12|12" 
          className="text-black tracking-widest break-words"
        />
      </div>
    </footer>
  );
}