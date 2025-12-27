import React from 'react';

export default function LandingHero({ children }) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at top left, rgba(255,255,255,0.3), transparent 40%), radial-gradient(ellipse at bottom right, rgba(255,255,255,0.15), transparent 40%)',
        }}
      />
      <div className="relative px-6 sm:px-10 py-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-center">
          PDF Manipulator
        </h1>
      <p className="text-base sm:text-lg text-white opacity-95 text-center leading-relaxed">
    Tarayıcıda çalışan ve GitHub Pages üzerinde barındırılabilen PDF düzenleme aracı.
  </p>
  <p className="text-sm sm:text-base text-slate-400 text-center italic leading-relaxed">
    A browser-based PDF manipulation tool that can be hosted on GitHub Pages.
  </p>
        

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="bg-white/10 backdrop-blur rounded-xl p-5 border border-white/10">
            <h2 className="font-semibold mb-3 text-lg">Özellikler (TR)</h2>
            <ul className="text-sm space-y-2 opacity-95">
              <li>• PDF yükleme ve sayfaları küçük resim olarak görme</li>
              <li>• Sürükle-bırak ile sayfa sıralama</li>
              <li>• Sayfa seçme, silme ve birleştirme</li>
              <li>• Sadece seçilen sayfaları indirme</li>
              <li>• Tüm düzenlemeleri kaydedip indirme</li>
            </ul>
          </div>

          <div className="bg-white text-gray-900 rounded-2xl shadow-2xl p-5 lg:p-6 flex items-center justify-center">
            <div className="w-full max-w-xl">{children}</div>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-xl p-5 border border-white/10">
            <h2 className="font-semibold mb-3 text-lg">Features (EN)</h2>
            <ul className="text-sm space-y-2 opacity-95">
              <li>• Upload and render pages as thumbnails</li>
              <li>• Drag-and-drop page reordering</li>
              <li>• Select pages, delete, and merge</li>
              <li>• Export only selected pages</li>
              <li>• Save and download the entire edited PDF</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 text-xs sm:text-sm opacity-90 text-center">
          Geliştiren / Developed by <span className="font-semibold">Mustafa Doğan</span>
        </div>
      </div>
    </section>
  );
}
