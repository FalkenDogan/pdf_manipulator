import React from 'react';

export default function Toolbar({ 
  onDownload, 
  onSaveAll,
  isLoaded,
  selectedCount,
  onClearSelection,
  onDeleteSelected,
  onAddPDF
}) {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-3 items-center">
          <div></div>
          <div className="justify-self-center text-center">
            <h1 className="text-2xl font-bold text-gray-900">PDF Manipulator</h1>
            {isLoaded && (
              <p className="text-sm text-gray-600 mt-1">
                {selectedCount > 0 
                  ? `${selectedCount} sayfa seçildi` 
                  : 'Sayfaları seçmek için tıklayın veya sürükleyerek yeniden sıralayın'}
              </p>
            )}
          </div>
          
          <div className="justify-self-end flex gap-2">
            {isLoaded && (
              <button
                onClick={onAddPDF}
                className="px-4 py-2 text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors font-medium flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                PDF Ekle
              </button>
            )}

            {selectedCount > 0 && (
              <>
                <button
                  onClick={onDeleteSelected}
                  className="px-4 py-2 text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors font-medium flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Seçilenleri Sil
                </button>
                
                <button
                  onClick={onClearSelection}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Seçimi Temizle
                </button>
              </>
            )}
            
            {isLoaded && (
              <>
                <button
                  onClick={onSaveAll}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                    />
                  </svg>
                  Tümünü Kaydet
                </button>
                
                <button
                  onClick={onDownload}
                  disabled={selectedCount === 0}
                  className={`px-4 py-2 rounded-lg transition-colors font-medium flex items-center gap-2 ${
                    selectedCount > 0
                      ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Seçilenleri İndir
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
