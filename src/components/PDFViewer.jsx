import React, { useState, useEffect, useRef } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import PageThumbnail from './PageThumbnail';
import Toolbar from './Toolbar';
import FileUpload from './FileUpload';
import {
  loadPDF,
  renderAllThumbnails,
  deleteMultiplePagesFromPDF,
  savePDFWithSelectedPages,
  downloadPDF,
  mergePDFs
} from '../services/pdfService';

export default function PDFViewer() {
  const [pdfData, setPdfData] = useState(null);
  const [pages, setPages] = useState([]);
  const [selectedPages, setSelectedPages] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Sayfa sırasını değiştirme
  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = pages.findIndex((p) => p.id === active.id);
      const newIndex = pages.findIndex((p) => p.id === over.id);

      const newPages = arrayMove(pages, oldIndex, newIndex);
      setPages(newPages);

      // Seçimleri güncelle (indeks değiştiği için)
      const newSelectedPages = new Set();
      selectedPages.forEach(oldIdx => {
        const page = pages[oldIdx];
        const newIdx = newPages.findIndex(p => p.id === page.id);
        if (newIdx !== -1) {
          newSelectedPages.add(newIdx);
        }
      });
      setSelectedPages(newSelectedPages);

      // PDF'i yeniden oluştur
      await reorderPDF(newPages);
    }
  };

  // Yeniden sıralanmış PDF oluştur
  const reorderPDF = async (orderedPages) => {
    try {
      const pageIndices = orderedPages.map(page => page.originalIndex);
      const newPdfData = await savePDFWithSelectedPages(pdfData, pageIndices);
      const newUint8 = new Uint8Array(newPdfData);
      setPdfData(newUint8);
      
      // Original index'leri güncelle
      const updatedPages = orderedPages.map((page, index) => ({
        ...page,
        originalIndex: index
      }));
      setPages(updatedPages);
    } catch (error) {
      console.error('PDF yeniden sıralama hatası:', error);
    }
  };

  // PDF dosyasını yükle
  const handleFileSelect = async (file) => {
    setLoading(true);
    try {
      const arrayBuffer = await loadPDF(file);
      // ArrayBuffer'ı Uint8Array'e dönüştür (tekrar kullanılabilir hale getir)
      const uint8Data = new Uint8Array(arrayBuffer);
      setPdfData(uint8Data);
      setFileName(file.name.replace('.pdf', ''));
      
      // Tüm sayfaların thumbnail'larını oluştur
      const thumbnails = await renderAllThumbnails(uint8Data);
      // Her sayfaya unique ID ve orijinal indeks ekle
      const pagesWithIds = thumbnails.map((page, index) => ({
        ...page,
        id: `page-${index}-${Date.now()}`,
        originalIndex: index
      }));
      setPages(pagesWithIds);
      setSelectedPages(new Set()); // Seçimleri sıfırla
    } catch (error) {
      console.error('PDF yükleme hatası:', error);
      alert('PDF yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  // Yeni PDF ekle (mevcut PDF'e sayfaları ekle)
  const handleAddPDF = () => {
    fileInputRef.current?.click();
  };

  const handleAdditionalFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== 'application/pdf') {
      alert('Lütfen geçerli bir PDF dosyası seçin');
      return;
    }

    setLoading(true);
    try {
      const arrayBuffer = await loadPDF(file);
      const uint8Data = new Uint8Array(arrayBuffer);
      
      // Mevcut PDF ile yeni PDF'i birleştir
      const mergedPdfData = await mergePDFs(pdfData, uint8Data);
      const mergedUint8 = new Uint8Array(mergedPdfData);
      
      setPdfData(mergedUint8);
      
      // Thumbnail'ları yeniden oluştur
      const thumbnails = await renderAllThumbnails(mergedUint8);
      const pagesWithIds = thumbnails.map((page, index) => ({
        ...page,
        id: `page-${index}-${Date.now()}`,
        originalIndex: index
      }));
      setPages(pagesWithIds);
      setSelectedPages(new Set());
      
      // Input'u temizle
      e.target.value = '';
    } catch (error) {
      console.error('PDF ekleme hatası:', error);
      alert('PDF eklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  // Seçilmiş sayfaları sil
  const handleDeleteSelected = async () => {
    if (selectedPages.size === 0) return;
    
    const confirmDelete = window.confirm(`${selectedPages.size} sayfayı silmek istediğinizden emin misiniz?`);
    if (!confirmDelete) return;

    try {
      setLoading(true);
      const selectedIndices = Array.from(selectedPages).sort((a, b) => a - b);
      const newPdfData = await deleteMultiplePagesFromPDF(pdfData, selectedIndices);
      const newUint8 = new Uint8Array(newPdfData);
      
      setPdfData(newUint8);
      
      // Thumbnail'ları yeniden oluştur
      const thumbnails = await renderAllThumbnails(newUint8);
      const pagesWithIds = thumbnails.map((page, index) => ({
        ...page,
        id: `page-${index}-${Date.now()}`,
        originalIndex: index
      }));
      setPages(pagesWithIds);
      setSelectedPages(new Set());
    } catch (error) {
      console.error('Sayfa silme hatası:', error);
      alert('Sayfalar silinirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  // Seçimi temizle
  const handleClearSelection = () => {
    setSelectedPages(new Set());
  };

  // Sayfayı seç/kaldır
  const togglePageSelection = (pageIndex) => {
    const newSelected = new Set(selectedPages);
    if (newSelected.has(pageIndex)) {
      newSelected.delete(pageIndex);
    } else {
      newSelected.add(pageIndex);
    }
    setSelectedPages(newSelected);
  };

  // Seçili sayfaları PDF'e indir
  const handleDownload = async () => {
    try {
      setLoading(true);
      const selectedIndices = Array.from(selectedPages).sort((a, b) => a - b);
      const pdfBytes = await savePDFWithSelectedPages(pdfData, selectedIndices);
      const timestamp = new Date().toISOString().split('T')[0];
      downloadPDF(pdfBytes, `${fileName}_secilmis_${timestamp}.pdf`);
    } catch (error) {
      console.error('PDF indirme hatası:', error);
      alert('PDF indirilirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  // Tüm PDF'i kaydet
  const handleSaveAll = async () => {
    try {
      setLoading(true);
      const timestamp = new Date().toISOString().split('T')[0];
      downloadPDF(pdfData, `${fileName}_${timestamp}.pdf`);
    } catch (error) {
      console.error('PDF kaydetme hatası:', error);
      alert('PDF kaydedilirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toolbar
        isLoaded={pages.length > 0}
        onDownload={handleDownload}
        onSaveAll={handleSaveAll}
        selectedCount={selectedPages.size}
        onClearSelection={handleClearSelection}
        onDeleteSelected={handleDeleteSelected}
        onAddPDF={handleAddPDF}
      />

      {/* Gizli file input - PDF ekleme için */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleAdditionalFileSelect}
        className="hidden"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {pages.length === 0 ? (
          <div className="max-w-2xl mx-auto">
            <FileUpload onFileSelect={handleFileSelect} />
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <FileUpload onFileSelect={handleFileSelect} />
            </div>

            {loading && (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            )}

            {!loading && pages.length > 0 && (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={pages.map(p => p.id)}
                  strategy={rectSortingStrategy}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {pages.map((page, index) => (
                      <PageThumbnail
                        key={page.id}
                        id={page.id}
                        pageNumber={page.pageNumber}
                        dataUrl={page.dataUrl}
                        isSelected={selectedPages.has(index)}
                        onClick={() => togglePageSelection(index)}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
