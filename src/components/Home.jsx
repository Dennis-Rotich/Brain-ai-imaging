import React, { useState, useCallback } from 'react';

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setSelectedFile(event.dataTransfer.files[0]);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-gray-50">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">MRI Tumor Classification</h1>
        <p className="text-gray-600">Upload a scan to analyze with our AI model</p>
      </header>

      <div 
        className={`w-4/5 h-96 rounded-xl border-2 border-dashed flex flex-col justify-center items-center text-center cursor-pointer transition-all
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}
          ${selectedFile ? 'p-8' : 'p-4'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {selectedFile ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-700">Selected file: <span className="font-medium">{selectedFile.name}</span></p>
            <div className="flex gap-4">
              <button 
                onClick={() => setSelectedFile(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 transition-colors"
              >
                Clear
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-colors">
                Analyze Scan
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-lg text-gray-700 mb-2">Drag & drop your MRI scan here</p>
            <p className="text-gray-500 mb-4">or</p>
            <label className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md cursor-pointer transition-colors">
              Browse Files
              <input 
                type="file" 
                onChange={handleFileChange}
                accept=".dicom,.nii,.nii.gz,.jpg,.png,.dcm" 
                className="hidden"
              />
            </label>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;