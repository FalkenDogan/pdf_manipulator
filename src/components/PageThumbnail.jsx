import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function PageThumbnail({ 
  id,
  pageNumber, 
  dataUrl, 
  isSelected, 
  onClick 
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleClick = (e) => {
    // Sadece thumbnail'a tıklanırsa seçim yap (sürükleme değilse)
    if (e.target.closest('[data-select-button]')) {
      e.stopPropagation();
      onClick();
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg ${
        isSelected ? 'ring-4 ring-blue-500' : ''
      } ${isDragging ? 'z-50' : ''}`}
    >
      {/* Sürüklenebilir alan */}
      <div 
        {...attributes}
        {...listeners}
        className="aspect-[8.5/11] bg-gray-200 flex items-center justify-center cursor-move"
      >
        <img 
          src={dataUrl} 
          alt={`Sayfa ${pageNumber}`}
          className="w-full h-full object-contain pointer-events-none"
        />
      </div>
      
      {/* Overlay - seçim butonu */}
      <div 
        className={`absolute inset-0 transition-all flex items-end justify-between p-2 pointer-events-none ${
          isSelected ? 'bg-blue-500 bg-opacity-20' : 'bg-black bg-opacity-0 hover:bg-opacity-10'
        }`}
      >
        <span className="text-white text-xs font-semibold bg-black bg-opacity-50 px-2 py-1 rounded">
          Sayfa {pageNumber}
        </span>
        
        {/* Seçim butonu */}
        <button
          data-select-button
          onClick={onClick}
          className="pointer-events-auto bg-white hover:bg-blue-600 text-gray-700 hover:text-white rounded-full p-2 transition-colors shadow-lg"
          title={isSelected ? "Seçimi kaldır" : "Sayfayı seç"}
        >
          {isSelected ? (
            <svg
              className="w-4 h-4 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4"
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
          )}
        </button>
      </div>
    </div>
  );
}
