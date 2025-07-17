import React from 'react';

const CreateContentModel: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
        {/* Close Button */}
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Form Title */}
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Create New Content</h2>

        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            maxLength={15}
            placeholder="15 Character limit on Title"
            className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
          />
        </div>

        {/* Type Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">Type</label>
          <select className="w-full p-2 border border-gray-300 rounded-md text-gray-700">
            <option>Video</option>
          </select>
        </div>

        {/* Link Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">Link (Optional)</label>
          <input
            type="text"
            placeholder="Enter URL"
            className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
          />
        </div>

        {/* Tags Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">Tags</label>
          <input
            type="text"
            placeholder="Add a tag"
            className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
          />
        </div>

        {/* Content Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">Content (Optional)</label>
          <textarea
            placeholder="Enter content details"
            className="w-full p-2 border border-gray-300 rounded-md text-gray-700 h-24"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-200 text-blue-700 rounded-md hover:bg-blue-300">
            Create Content
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContentModel;