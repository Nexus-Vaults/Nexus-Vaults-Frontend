import React from 'react';
import QRCode from 'qrcode.react';

type Props = {
  qrData: string;
  onClose: () => void;
};

const ReceiveModal = ({ qrData, onClose }: Props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="flex flex-col items-center justify-center bg-white rounded-lg p-6 w-80">
        <QRCode value={qrData} size={200} />
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ReceiveModal;
