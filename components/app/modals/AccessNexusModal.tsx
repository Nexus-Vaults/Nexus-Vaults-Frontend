import React, { useRef } from 'react';

type Props = {
  onClose: () => void;
};

const AccessNexusModal = ({ onClose }: Props) => {
  const modalRef = useRef(null);

  const handleBackgroundClick = (event: any) => {
    onClose();
  };

  const handleInnerClick = (event: any) => {
    event.stopPropagation();
  };
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white rounded-lg p-6" onClick={handleInnerClick}>
        <h2 className="text-2xl font-bold mb-4">Enter the Nexus Information</h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="chainId"
            >
              Chain ID:
            </label>
            <input
              className="border rounded-md py-2 px-3 w-full"
              id="chainId"
              type="text"
              placeholder="Enter Chain ID"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Address:
            </label>
            <input
              className="border rounded-md py-2 px-3 w-full"
              id="address"
              type="text"
              placeholder="Enter Address"
            />
          </div>
          <div className="flex justify-end">
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AccessNexusModal;
