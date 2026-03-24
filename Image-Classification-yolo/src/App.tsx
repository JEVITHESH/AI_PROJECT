/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Search, Loader2, CheckCircle2, AlertCircle, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
// Local Python API used instead of Gemini

export default function App() {
  const [image, setImage] = useState<string | null>(null);
  const [objectName, setObjectName] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{ found: boolean; message: string; image?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!image || !objectName.trim()) return;

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      // Prepare local request
      const formData = new FormData();
      const res = await fetch(image);
      const blob = await res.blob();
      
      formData.append("image", blob, "image.jpg");
      formData.append("objectName", objectName);

      // Note: Must match the port where our FastAPI server is running
      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Unable to complete analysis. Ensure the python backend is running on port 8000.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setImage(null);
    setObjectName('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#212529] font-sans selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Header Section */}
        <header className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Object Identifier</h1>
            <p className="text-sm text-slate-500">Visual analysis utility powered by AI</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full shadow-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-slate-600">System Ready</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Visual Input */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Visual Input</span>
                {image && (
                  <button 
                    onClick={reset}
                    className="text-xs font-medium text-slate-500 hover:text-slate-900 flex items-center gap-1 transition-colors"
                  >
                    <X className="w-3 h-3" /> Clear
                  </button>
                )}
              </div>
              
              <div className="flex-grow relative min-h-[400px] flex items-center justify-center p-6">
                {!image ? (
                  <div 
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-full border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all group"
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                      <Upload className="w-6 h-6 text-slate-400 group-hover:text-blue-500" />
                    </div>
                    <p className="text-sm font-medium text-slate-900">Upload an image</p>
                    <p className="text-xs text-slate-400 mt-1">Drag and drop or click to browse</p>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center relative">
                    <img 
                      src={result?.image || image} 
                      alt="Preview" 
                      className="max-w-full max-h-[500px] object-contain rounded-lg shadow-md transition-all duration-300"
                      referrerPolicy="no-referrer"
                    />
                    {isAnalyzing && (
                      <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] flex items-center justify-center rounded-lg">
                        <motion.div 
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
                        >
                          <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                          <span className="text-sm font-medium text-slate-900">Analyzing image...</span>
                        </motion.div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Controls & Results */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Control Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-sm font-semibold text-slate-900 mb-4">Analysis Parameters</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5 ml-1">Object to identify</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <Search className="w-4 h-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. 'Golden Retriever'"
                      value={objectName}
                      onChange={(e) => setObjectName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      onKeyDown={(e) => e.key === 'Enter' && analyzeImage()}
                    />
                  </div>
                </div>

                <button
                  onClick={analyzeImage}
                  disabled={!image || !objectName.trim() || isAnalyzing}
                  className="w-full py-3 bg-slate-900 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-sm"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Identify Object <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Results Section */}
            <AnimatePresence mode="wait">
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-6 rounded-2xl border shadow-sm ${
                    result.found 
                      ? 'bg-emerald-50 border-emerald-100' 
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-xl ${result.found ? 'bg-emerald-100' : 'bg-slate-200'}`}>
                      {result.found ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-slate-500" />
                      )}
                    </div>
                    <div>
                      <h3 className={`text-sm font-bold mb-1 ${result.found ? 'text-emerald-900' : 'text-slate-900'}`}>
                        {result.found ? 'Identification Successful' : 'Object Not Identified'}
                      </h3>
                      <p className={`text-sm leading-relaxed ${result.found ? 'text-emerald-700' : 'text-slate-600'}`}>
                        {result.message}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-6 rounded-2xl bg-red-50 border border-red-100 text-red-900 flex items-start gap-4 shadow-sm"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-bold mb-1">Analysis Error</h3>
                    <p className="text-sm opacity-80">{error}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        <footer className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium">
          <span>Neural Vision Engine v4.0</span>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-600 cursor-pointer">Documentation</span>
            <span className="hover:text-slate-600 cursor-pointer">API Status</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
