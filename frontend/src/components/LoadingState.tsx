import React, { useState, useEffect } from 'react';
import { Cpu } from 'lucide-react';

interface AnimatedCheckmarkProps {
  isDone: boolean;
  isActive: boolean;
}

const AnimatedCheckmark: React.FC<AnimatedCheckmarkProps> = ({ isDone, isActive }) => {
  const [isSpinningDone, setIsSpinningDone] = useState(false);

  useEffect(() => {
    if (isDone) {
      const timer = setTimeout(() => {
        setIsSpinningDone(true);
      }, 450);
      return () => clearTimeout(timer);
    } else {
      setIsSpinningDone(false);
    }
  }, [isDone]);

  const shouldSpin = isActive || (isDone && !isSpinningDone);

  return (
    <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
      <svg
        className={`w-5 h-5 text-white overflow-visible transition-all duration-300 ${
          isDone && isSpinningDone
            ? 'animate-checkmark-pop drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]'
            : shouldSpin
            ? 'animate-spin'
            : ''
        }`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle
          cx="12"
          cy="12"
          r="9"
          className="text-zinc-800"
          strokeWidth="2"
        />

        <circle
          cx="12"
          cy="12"
          r="9"
          className={`transition-all duration-500 ease-out ${
            isDone ? 'text-white' : isActive ? 'text-zinc-200' : 'text-transparent'
          }`}
          style={{
            transformOrigin: 'center',
            strokeDasharray: 57,
            strokeDashoffset: isDone ? 0 : isActive ? 38 : 57,
          }}
        />

        {isDone && isSpinningDone && (
          <path
            d="M7.5 12l3.2 3.2L16.5 8.5"
            className="animate-draw-check text-white"
          />
        )}
      </svg>
    </div>
  );
};

interface LoadingStateProps {
  isApiDone?: boolean;
  onComplete?: () => void;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  isApiDone = false,
  onComplete,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAllDone, setIsAllDone] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isMainSpinningDone, setIsMainSpinningDone] = useState(false);

  const steps = [
    'Reading & extracting resume text content...',
    'Performing Reality Check on experience level & work history...',
    'Calculating ATS Match Score & job role recommendations...',
    'Identifying skill gaps & generating actionable roadmap...',
  ];

  useEffect(() => {
    if (isApiDone) return;

    const timer = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 2200);

    return () => clearInterval(timer);
  }, [isApiDone, steps.length]);

  useEffect(() => {
    if (!isApiDone) return;

    const stepTimer = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < steps.length) {
          return prev + 1;
        } else {
          clearInterval(stepTimer);
          setIsAllDone(true);
          return prev;
        }
      });
    }, 480);

    return () => clearInterval(stepTimer);
  }, [isApiDone, steps.length]);

  useEffect(() => {
    if (isAllDone) {
      const timer = setTimeout(() => {
        setIsMainSpinningDone(true);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setIsMainSpinningDone(false);
    }
  }, [isAllDone]);

  useEffect(() => {
    if (!isAllDone || !isMainSpinningDone) return;

    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 900);

    const finishTimer = setTimeout(() => {
      onComplete?.();
    }, 1250);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
    };
  }, [isAllDone, isMainSpinningDone, onComplete]);

  return (
    <div
      className={`max-w-xl mx-auto w-full p-8 text-center bg-zinc-950/80 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl font-normal transition-all duration-300 ${
        isExiting ? 'animate-fade-out' : 'animate-scale-up'
      }`}
    >
      <div className="w-24 h-24 mx-auto mb-8 relative flex items-center justify-center transition-all duration-500">
        <svg
          className={`w-24 h-24 text-white overflow-visible transition-all duration-500 ${
            isAllDone && isMainSpinningDone
              ? 'drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] animate-checkmark-pop'
              : !isMainSpinningDone
              ? 'animate-spin'
              : ''
          }`}
          viewBox="0 0 96 96"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="48" cy="48" r="40" className="text-zinc-800" strokeWidth="3" />

          <circle
            cx="48"
            cy="48"
            r="40"
            className="text-white transition-all duration-600 ease-out"
            style={{
              transformOrigin: 'center',
              strokeDasharray: 251,
              strokeDashoffset: isAllDone ? 0 : 170,
            }}
          />

          {isAllDone && isMainSpinningDone && (
            <path
              d="M28 48l14 14 26-26"
              className="animate-draw-main-check text-white"
              strokeWidth="5"
            />
          )}
        </svg>

        {!isAllDone && (
          <Cpu className="text-white absolute z-10 animate-pulse transition-opacity duration-300" size={36} />
        )}
      </div>

      <h3 className="text-2xl font-normal text-white mb-2 transition-all duration-300">
        {isAllDone ? 'Analysis Complete!' : 'AI Model Is Working...'}
      </h3>
      <p className="text-sm text-zinc-400 mb-8 font-normal transition-all duration-300">
        {isAllDone
          ? 'All 4 modules processed. Preparing your report...'
          : 'The system is analyzing your resume using Ollama Qwen 2.5.'}
      </p>

      <div className="flex flex-col gap-3.5 text-left bg-zinc-900/90 p-5 rounded-xl border border-zinc-800/80 shadow-inner">
        {steps.map((step, idx) => {
          const isDone = idx < activeStep;
          const isActive = idx === activeStep && !isAllDone;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3.5 text-sm transition-all duration-300 ${
                isDone
                  ? 'text-white font-normal'
                  : isActive
                  ? 'text-zinc-100 font-normal'
                  : 'text-zinc-600 font-normal'
              }`}
            >
              <AnimatedCheckmark isDone={isDone} isActive={isActive} />
              <span>{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
