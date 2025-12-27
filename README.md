# PDF Manipülatörü

Tarayıcı tabanlı, istemci-tarafından çalışan PDF düzenleme uygulaması.

## 🚀 Özellikler

✅ PDF dosyası yükleme  
✅ Sayfaları küçük resimler olarak görüntüleme (pdf.js)  
✅ **Sürükle-bırak ile sayfa sıralama**  
✅ Sayfaları seçme ve silme  
✅ Yeni PDF ekleme (birleştirme)  
✅ Seçilmiş sayfaları yeni PDF olarak indirme  
✅ Tüm PDF'i kaydetme  

## 📦 Kurulum

```bash
npm install
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## 🌐 GitHub Pages Deployment

### 1. GitHub Repository Oluştur
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADIN/pdf_manipulator.git
git push -u origin main
```

### 2. GitHub Pages Ayarları
1. GitHub repo'na git
2. **Settings** → **Pages**
3. **Source**: GitHub Actions seç
4. Commit ve push yap - otomatik deploy olacak

### 3. Erişim
Uygulama: `https://KULLANICI_ADIN.github.io/pdf_manipulator/`

## 🛠️ Teknolojiler

- React.js
- Vite
- Tailwind CSS
- pdf.js (Rendering)
- pdf-lib (Manipulation)
- dnd-kit (Drag & Drop)

## 📝 Kullanım

1. PDF dosyasını yükle
2. Sayfaları sürükleyerek sırala
3. Sayfaları seç (sağ alttaki + butonu)
4. İstemediğin sayfaları sil
5. "Tümünü Kaydet" veya "Seçilenleri İndir"
