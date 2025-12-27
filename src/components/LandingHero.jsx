import React from 'react';

export default function LandingHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage:
          'radial-gradient(ellipse at top left, rgba(255,255,255,0.3), transparent 40%), radial-gradient(ellipse at bottom right, rgba(255,255,255,0.15), transparent 40%)',
      }} />
      <div className="relative px-6 sm:px-10 py-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          PDF Manipulator
        </h1>
        <p className="mt-3 text-base sm:text-lg opacity-95">
          Tarayıcıda çalışan ve GitHub Pages üzerinde barındırılabilen PDF düzenleme aracı.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4">
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <h2 className="font-semibold mb-2">Özellikler</h2>
            <ul className="text-sm space-y-1">
              <li>• PDF yükleme ve sayfaları küçük resim olarak görme</li>
              <li>• Sürükle-bırak ile sayfa sıralama</li>
              <li>• Sayfa seçme, silme ve birleştirme</li>
              <li>• Sadece seçilen sayfaları indirme</li>
              <li>• Tüm düzenlemeleri kaydedip indirme</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 text-xs sm:text-sm opacity-90">
          Geliştiren / Developed by <span className="font-semibold">Mustafa Doğan</span>
        </div>
      </div>
    </section>
  );
}
