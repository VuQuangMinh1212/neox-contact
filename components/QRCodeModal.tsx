"use client";

import { useState, useEffect } from "react";
import { X, Download, Copy, Check } from "lucide-react";
import QRCode from "qrcode";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

export default function QRCodeModal({ isOpen, onClose, url, title }: QRCodeModalProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && url) {
      QRCode.toDataURL(url, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      }).then(setQrCodeUrl);
    }
  }, [isOpen, url]);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `${title.replace(/\s+/g, '_')}_QR.png`;
    link.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-zinc-800 rounded-lg p-6 max-w-sm w-full mx-4 relative scale-in shadow-2xl border border-zinc-700">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors hover:bg-zinc-700 rounded-full p-1"
        >
          <X size={20} />
        </button>
        
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
          
          {qrCodeUrl ? (
            <div className="bg-white p-4 rounded-lg mb-4 inline-block shadow-lg">
              <img 
                src={qrCodeUrl} 
                alt={`QR Code for ${title}`}
                className="w-64 h-64 block"
              />
            </div>
          ) : (
            <div className="bg-zinc-700 p-4 rounded-lg mb-4 w-64 h-64 flex items-center justify-center mx-auto">
              <div className="loading-spinner w-8 h-8" />
            </div>
          )}
          
          <p className="text-sm text-gray-300 mb-4">
            Scan this QR code to visit my profile
          </p>
          
          <div className="flex gap-2 justify-center">
            <button
              onClick={handleCopyUrl}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-md transition-all duration-200 text-sm hover:scale-105"
            >
              {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy URL'}
            </button>
            
            <button
              onClick={handleDownload}
              disabled={!qrCodeUrl}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-md transition-all duration-200 text-sm hover:scale-105"
            >
              <Download size={16} />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
