import { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { LoadingState } from './components/LoadingState';
import { AnalysisDashboard } from './components/AnalysisDashboard';
import { analyzeResumeFile, MOCK_SAMPLE_ANALYSIS } from './services/api';
import type { AnalyzeResponse } from './types/resume';

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isApiDone, setIsApiDone] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pendingResult, setPendingResult] = useState<AnalyzeResponse | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeResponse | null>(null);

  const handleAnalyzeFile = async (file: File) => {
    setIsLoading(true);
    setIsApiDone(false);
    setPendingResult(null);
    setErrorMessage(null);

    try {
      const response = await analyzeResumeFile(file);
      setPendingResult(response);
      setIsApiDone(true);
    } catch (err: unknown) {
      setIsLoading(false);
      setIsApiDone(false);
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('An unknown error occurred while connecting to the server.');
      }
    }
  };

  const handleUseSample = () => {
    setIsLoading(true);
    setIsApiDone(false);
    setPendingResult(null);
    setErrorMessage(null);

    setTimeout(() => {
      setPendingResult(MOCK_SAMPLE_ANALYSIS);
      setIsApiDone(true);
    }, 1500);
  };

  const handleLoadingComplete = () => {
    if (pendingResult) {
      setAnalysisResult(pendingResult);
    }
    setIsLoading(false);
    setIsApiDone(false);
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setPendingResult(null);
    setIsLoading(false);
    setIsApiDone(false);
    setErrorMessage(null);
  };

  return (
    <div className="w-full max-w-[94vw] 2xl:max-w-[92vw] mx-auto px-4 sm:px-6 2xl:px-8 py-2 sm:py-3 flex flex-col min-h-screen font-sans animate-page-fade-in">
      <main className={`w-full flex-1 flex flex-col ${isLoading ? 'items-center justify-center min-h-[85vh]' : ''} animate-fade-in`}>
        {isLoading ? (
          <LoadingState
            isApiDone={isApiDone}
            onComplete={handleLoadingComplete}
          />
        ) : analysisResult ? (
          <AnalysisDashboard
            filename={analysisResult.filename}
            data={analysisResult.data}
            onReset={handleReset}
          />
        ) : (
          <FileUpload
            onAnalyzeFile={handleAnalyzeFile}
            onUseSample={handleUseSample}
            isLoading={isLoading}
            errorMessage={errorMessage}
          />
        )}
      </main>
    </div>
  );
}

export default App;

