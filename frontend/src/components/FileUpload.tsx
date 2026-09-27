import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, X, AlertCircle, PlayCircle, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { FanCards } from './FanCards';
import { FaqSection } from './FaqSection';
import { ScrollReveal } from './ScrollReveal';

interface FileUploadProps {
  onAnalyzeFile: (file: File) => void;
  onUseSample: () => void;
  isLoading: boolean;
  errorMessage: string | null;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onAnalyzeFile,
  onUseSample,
  isLoading,
  errorMessage,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndSetFile = (file: File) => {
    setIsRemoving(false);
    setValidationError(null);
    const validExtensions = ['.pdf', '.docx', '.txt'];
    const fileNameLower = file.name.toLowerCase();
    const isValidExt = validExtensions.some((ext) => fileNameLower.endsWith(ext));

    if (!isValidExt) {
      setValidationError('Unsupported file format. Please upload PDF, DOCX, or TXT.');
      setSelectedFile(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setValidationError('File size exceeds maximum limit of 5 MB.');
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    if (isRemoving) return;
    setIsRemoving(true);
    setTimeout(() => {
      setSelectedFile(null);
      setValidationError(null);
      setIsRemoving(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 320);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleStartAnalysis = () => {
    if (selectedFile) {
      onAnalyzeFile(selectedFile);
    }
  };

  const scrollToAnalyze = () => {
    const el = document.getElementById('analyze-cv');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 2xl:gap-8 font-normal">
      <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center w-full max-w-[96vw] 2xl:max-w-[94vw] mx-auto py-[4vh] sm:py-[5vh]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 2xl:gap-16 items-center w-full">
          <div className="lg:col-span-7 flex flex-col items-start text-left gap-4 lg:gap-5 2xl:gap-7">
            <ScrollReveal direction="up" delay={0} className="w-full">
              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-[3rem] 2xl:text-[3.75rem] font-normal tracking-tight leading-[1.12] 2xl:leading-[1.1] text-white text-left">
                Optimize Your Resume for Your <span className="text-zinc-400">Dream Career</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={120} className="w-full">
              <p className="text-sm lg:text-base 2xl:text-xl text-zinc-400 leading-relaxed font-normal text-left max-w-xl lg:max-w-2xl 2xl:max-w-3xl">
                Upload your resume document to get instant smart AI analysis: role suitability detection,
                ATS readiness evaluation, industry keyword recommendations, and measurable career guidance.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={240} className="w-full max-w-lg lg:max-w-xl 2xl:max-w-2xl">
              <div className="flex flex-row items-center gap-3.5 2xl:gap-4 pt-1 w-full">
                <button
                  type="button"
                  onClick={scrollToAnalyze}
                  className="relative overflow-hidden group flex-1 inline-flex items-center justify-center gap-2 2xl:gap-3 px-4 sm:px-5 lg:px-6 2xl:px-8 py-2.5 sm:py-3 lg:py-3.5 2xl:py-4 rounded-lg 2xl:rounded-2xl bg-zinc-900 border border-zinc-700 font-normal text-xs sm:text-sm lg:text-base 2xl:text-lg transition-all duration-300 shadow-xl hover:-translate-y-0.5 hover:scale-[1.01] active:scale-[0.99] cursor-pointer whitespace-nowrap"
                >
                  <span className="absolute inset-0 bg-white -translate-x-[102%] opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out pointer-events-none" />
                  <span className="relative z-10 flex items-center gap-2 2xl:gap-3 text-white group-hover:text-black transition-colors duration-300">
                    <span>Start Resume Analysis</span>
                    <span className="inline-flex items-center group-hover:animate-bounce">
                      <ArrowRight size={18} className="shrink-0 transition-transform duration-300 group-hover:rotate-90" />
                    </span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={onUseSample}
                  disabled={isLoading}
                  className="flex-1 inline-flex items-center justify-center gap-2 2xl:gap-3 px-4 sm:px-5 lg:px-6 2xl:px-8 py-2.5 sm:py-3 lg:py-3.5 2xl:py-4 rounded-lg 2xl:rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-normal text-xs sm:text-sm lg:text-base 2xl:text-lg transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] active:scale-[0.99] cursor-pointer whitespace-nowrap"
                >
                  <PlayCircle size={18} className="text-zinc-400 shrink-0" />
                  <span>Try Sample Resume Demo</span>
                </button>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5 flex justify-center 2xl:justify-end items-center w-full 2xl:pr-4">
            <ScrollReveal direction="scale" delay={180} className="w-full flex justify-center 2xl:justify-end">
              <FanCards />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section id="analyze-cv" className="min-h-[calc(100vh-4rem)] flex flex-col justify-center w-full max-w-[96vw] lg:max-w-[92vw] 2xl:max-w-[92vw] mx-auto py-[4vh] sm:py-[5vh] items-start text-left">
        <ScrollReveal direction="up" delay={0} className="w-full mb-3 sm:mb-4 2xl:mb-6">
          <div className="text-left w-full">
            <h2 className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-normal text-white mb-1.5 2xl:mb-2 text-left">Upload Your Resume Document</h2>
            <p className="text-xs sm:text-sm lg:text-base 2xl:text-lg text-zinc-400 text-left">
              Select a PDF, DOCX, or TXT file (Max 5MB) for instant AI analysis.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="scale" delay={120} className="w-full">
          <div
            className={`relative w-full border-2 border-dashed rounded-2xl p-6 sm:p-8 lg:p-10 2xl:p-14 text-left bg-zinc-950/90 backdrop-blur-md cursor-pointer transition-all duration-500 ease-out ${isDragging
              ? 'border-white bg-zinc-900 shadow-2xl scale-[1.01]'
              : 'border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900/60 hover:-translate-y-1 hover:shadow-2xl'
              }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.docx,.txt"
              className="hidden"
            />

            <div className="w-11 h-11 2xl:w-14 2xl:h-14 mb-3.5 2xl:mb-5 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-zinc-800">
              <UploadCloud size={22} className="2xl:hidden" />
              <UploadCloud size={26} className="hidden 2xl:block" />
            </div>

            <h3 className="text-lg sm:text-xl lg:text-2xl 2xl:text-3xl font-normal text-white mb-1 text-left">Drag & Drop Your Resume File Here</h3>
            <p className="text-xs sm:text-sm lg:text-base 2xl:text-lg text-zinc-400 mb-4 2xl:mb-6 text-left">Or click the button below to browse files from your computer</p>

            <button
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 2xl:px-7 2xl:py-3.5 rounded-lg 2xl:rounded-xl bg-white text-black hover:bg-zinc-200 font-normal text-xs sm:text-sm lg:text-base 2xl:text-lg transition-all duration-300 shadow-md hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              Select Resume File
            </button>

            <div className="flex flex-wrap items-center gap-4 2xl:gap-8 mt-4.5 2xl:mt-6 text-xs 2xl:text-sm text-zinc-500 font-normal text-left">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={15} className="text-zinc-400" /> PDF, DOCX, TXT Formats
              </span>
              <span className="flex items-center gap-1.5">
                <Zap size={15} className="text-zinc-400" /> Maximum 5 MB
              </span>
            </div>
          </div>
        </ScrollReveal>

        <div
          className={`grid w-full ${selectedFile && !isRemoving
              ? 'grid-rows-[1fr] opacity-100 mt-3.5 2xl:mt-5 animate-layout-spring-push'
              : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none animate-layout-spring-pull'
            }`}
        >
          <div className="overflow-hidden min-h-0 p-2 -m-2">
            {selectedFile && (
              <div
                key={selectedFile.name + '-' + selectedFile.lastModified}
                className={`${isRemoving ? 'animate-file-remove' : 'animate-file-insert'
                  } flex items-center justify-between p-4 2xl:p-5 bg-zinc-900 border border-zinc-700 rounded-xl shadow-xl w-full transition-all duration-300`}
              >
                <div className="flex items-center gap-3.5 z-10">
                  <div className="w-11 h-11 2xl:w-13 2xl:h-13 rounded-lg bg-zinc-800 text-white flex items-center justify-center border border-zinc-700 animate-scale-up shadow-sm">
                    <FileText size={20} className="2xl:hidden text-zinc-200" />
                    <FileText size={24} className="hidden 2xl:block text-zinc-200" />
                  </div>
                  <div className="text-left">
                    <div className="font-normal text-white text-xs sm:text-sm lg:text-base 2xl:text-lg break-all">
                      {selectedFile.name}
                    </div>
                    <div className="text-xs 2xl:text-sm text-zinc-400 mt-0.5">{formatFileSize(selectedFile.size)}</div>
                  </div>
                </div>

                <button
                  type="button"
                  className="z-10 p-1.5 2xl:p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-all duration-200 hover:rotate-90 cursor-pointer disabled:opacity-50"
                  onClick={handleRemoveFile}
                  disabled={isRemoving}
                  title="Remove file"
                >
                  <X size={17} className="2xl:hidden" />
                  <X size={20} className="hidden 2xl:block" />
                </button>
              </div>
            )}
          </div>
        </div>

        {(validationError || errorMessage) && (
          <ScrollReveal direction="up" delay={80} className="w-full">
            <div className="flex items-start gap-2.5 2xl:gap-3.5 p-4 2xl:p-5 bg-zinc-900 border border-zinc-700 rounded-xl text-zinc-200 text-xs sm:text-sm 2xl:text-base w-full mt-3.5 2xl:mt-5 text-left">
              <AlertCircle size={18} className="text-zinc-400 shrink-0 mt-0.5" />
              <div>{validationError || errorMessage}</div>
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal direction="up" delay={180} className="w-full max-w-lg lg:max-w-xl 2xl:max-w-2xl">
          <div className="flex flex-row items-center gap-3.5 2xl:gap-5 pt-4.5 2xl:pt-6 w-full transition-all duration-500 ease-[cubic-bezier(0.34,1.45,0.64,1)]">
            <button
              type="button"
              className={`relative overflow-hidden flex-1 inline-flex items-center justify-center gap-2 2xl:gap-3 px-4 sm:px-5 lg:px-6 2xl:px-8 py-2.5 sm:py-3 lg:py-3.5 2xl:py-4 rounded-lg 2xl:rounded-2xl border font-normal text-xs sm:text-sm lg:text-base 2xl:text-lg transition-all duration-300 ${selectedFile && !isLoading
                  ? 'group bg-zinc-900 border-zinc-700 text-white shadow-xl hover:-translate-y-0.5 hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
                  : 'bg-zinc-900/40 border-zinc-800 text-zinc-500 opacity-50 cursor-not-allowed'
                }`}
              disabled={!selectedFile || isLoading}
              onClick={handleStartAnalysis}
              title={!selectedFile ? 'Please select or upload a resume file first' : undefined}
            >
              {selectedFile && !isLoading && (
                <span className="absolute inset-0 bg-white -translate-x-[102%] opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out pointer-events-none" />
              )}
              <span
                className={`relative z-10 flex items-center gap-2 2xl:gap-3 ${selectedFile && !isLoading
                    ? 'text-white group-hover:text-black transition-colors duration-300'
                    : 'text-zinc-500'
                  }`}
              >
                <Zap size={18} />
                <span>{isLoading ? 'Analyzing Resume...' : 'Start AI Resume Analysis'}</span>
              </span>
            </button>

            <button
              type="button"
              className="flex-1 inline-flex items-center justify-center gap-2 2xl:gap-3 px-4 sm:px-5 lg:px-6 2xl:px-8 py-2.5 sm:py-3 lg:py-3.5 2xl:py-4 rounded-lg 2xl:rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-normal text-xs sm:text-sm lg:text-base 2xl:text-lg transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              onClick={onUseSample}
              disabled={isLoading}
            >
              <PlayCircle size={18} className="text-zinc-400 shrink-0" />
              <span>Use Sample Resume</span>
            </button>
          </div>
        </ScrollReveal>
      </section>

      <FaqSection />
    </div>
  );
};
