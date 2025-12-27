import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-12 text-center text-sm text-gray-600">
      <div className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-gray-100 border border-gray-200">
        <span>Geliştiren / Developed by</span>
        <span className="font-semibold text-gray-800">Mustafa Doğan</span>
        <span className="hidden sm:inline text-gray-400">•</span>
        <span className="hidden sm:inline">React · Vite · Tailwind · pdf.js · pdf-lib</span>
      </div>
    </footer>
  );
}
