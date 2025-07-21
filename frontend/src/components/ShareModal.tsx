import React, { useState } from "react";
import { Copy, XCircle } from "lucide-react";

type ShareModalProps = {
  open: boolean;
  onClose: () => void;
  shareUrl: string;
};

const ShareModal: React.FC<ShareModalProps> = ({ open, onClose, shareUrl }) => {
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-[95vw] border flex flex-col items-center py-10 relative">
        <button type="button" onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
          <XCircle size={28} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Share Your Brain</h2>
        <input
          type="text"
          value={shareUrl}
          readOnly
          className="w-full px-3 py-2 border rounded mb-4 bg-gray-100 text-gray-800 font-mono text-center"
        />
        <button
          onClick={handleCopy}
          className="mb-2 px-4 py-2 flex items-center gap-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 shadow"
        >
          <Copy size={20} />
          {copied ? "Copied!" : "Copy Link"}
        </button>
        <button
          onClick={onClose}
          className="underline text-gray-500 mt-2 hover:text-gray-800"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
