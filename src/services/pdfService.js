import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument } from 'pdf-lib';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// PDF.js worker setup
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

/**
 * Yüklenen PDF dosyasını ArrayBuffer olarak oku
 */
export const loadPDF = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

/**
 * PDF'in sayfa sayısını al
 */
export const getPDFPageCount = async (pdfData) => {
  // Verileri kopyala (detach sorununu önlemek için)
  const pdfDataCopy = pdfData.slice();
  const pdf = await pdfjsLib.getDocument({ data: pdfDataCopy }).promise;
  return pdf.numPages;
};

/**
 * Belirli bir sayfayı canvas olarak render et ve data URL olarak döndür
 */
export const renderPageThumbnail = async (pdfData, pageNumber, scale = 0.5) => {
  // Verileri kopyala (detach sorununu önlemek için)
  const pdfDataCopy = pdfData.slice();
  const pdf = await pdfjsLib.getDocument({ data: pdfDataCopy }).promise;
  const page = await pdf.getPage(pageNumber);
  
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  
  await page.render({
    canvasContext: context,
    viewport: viewport
  }).promise;
  
  return canvas.toDataURL('image/png');
};

/**
 * Tüm sayfaların thumbnail'larını oluştur
 */
export const renderAllThumbnails = async (pdfData, scale = 0.5) => {
  // ArrayBuffer'ı Uint8Array'e dönüştür (detach sorununu önlemek için)
  const uint8Array = new Uint8Array(pdfData);
  const pageCount = await getPDFPageCount(uint8Array);
  const thumbnails = [];
  
  for (let i = 1; i <= pageCount; i++) {
    const dataUrl = await renderPageThumbnail(uint8Array, i, scale);
    thumbnails.push({
      pageNumber: i,
      dataUrl: dataUrl
    });
  }
  
  return thumbnails;
};

/**
 * Seçilmiş sayfaları yeni bir PDF olarak kaydet
 * pageIndices: 0-tabanlı sayfaların indis dizisi
 */
export const savePDFWithSelectedPages = async (pdfData, pageIndices) => {
  // Verileri kopyala (detach sorununu önlemek için)
  const pdfDataCopy = pdfData.slice();
  const originalPDF = await PDFDocument.load(pdfDataCopy);
  const newPDF = await PDFDocument.create();
  
  // Seçilmiş sayfaları kopyala
  const copiedPages = await newPDF.copyPages(originalPDF, pageIndices);
  copiedPages.forEach(page => newPDF.addPage(page));
  
  const pdfBytes = await newPDF.save();
  return pdfBytes;
};

/**
 * Belirli bir sayfayı sil ve yeni PDF oluştur
 * pageIndex: 0-tabanlı sayfa indeksi
 */
export const deletePageFromPDF = async (pdfData, pageIndex) => {
  // Verileri kopyala (detach sorununu önlemek için)
  const pdfDataCopy = pdfData.slice();
  const pdf = await PDFDocument.load(pdfDataCopy);
  const totalPages = pdf.getPageCount();
  
  // Silmek istenen sayfa hariç tüm sayfaları bul
  const pageIndicesToKeep = Array.from({ length: totalPages }, (_, i) => i).filter(i => i !== pageIndex);
  
  const newPDF = await PDFDocument.create();
  const copiedPages = await newPDF.copyPages(pdf, pageIndicesToKeep);
  copiedPages.forEach(page => newPDF.addPage(page));
  
  const pdfBytes = await newPDF.save();
  return pdfBytes;
};

/**
 * Seçilmiş sayfaları sil ve yeni PDF oluştur
 * pageIndicesToDelete: 0-tabanlı silinecek sayfa indisleri dizisi
 */
export const deleteMultiplePagesFromPDF = async (pdfData, pageIndicesToDelete) => {
  const pdfDataCopy = pdfData.slice();
  const pdf = await PDFDocument.load(pdfDataCopy);
  const totalPages = pdf.getPageCount();
  
  // Silinecek sayfalar hariç tüm sayfaları bul
  const deleteSet = new Set(pageIndicesToDelete);
  const pageIndicesToKeep = Array.from({ length: totalPages }, (_, i) => i).filter(i => !deleteSet.has(i));
  
  const newPDF = await PDFDocument.create();
  const copiedPages = await newPDF.copyPages(pdf, pageIndicesToKeep);
  copiedPages.forEach(page => newPDF.addPage(page));
  
  const pdfBytes = await newPDF.save();
  return pdfBytes;
};

/**
 * İki PDF'i birleştir (yeni PDF sayfalarını mevcut PDF'in sonuna ekle)
 */
export const mergePDFs = async (existingPdfData, newPdfData) => {
  const existingCopy = existingPdfData.slice();
  const newCopy = newPdfData.slice();
  
  const existingPDF = await PDFDocument.load(existingCopy);
  const newPDF = await PDFDocument.load(newCopy);
  
  const newPageCount = newPDF.getPageCount();
  const copiedPages = await existingPDF.copyPages(newPDF, Array.from({ length: newPageCount }, (_, i) => i));
  copiedPages.forEach(page => existingPDF.addPage(page));
  
  const pdfBytes = await existingPDF.save();
  return pdfBytes;
};

/**
 * PDF'i indir
 */
export const downloadPDF = (pdfBytes, filename = 'document.pdf') => {
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
