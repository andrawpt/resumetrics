import React, { useState } from 'react';
import { HelpCircle, Sparkles, ShieldCheck, Zap, FileText, ChevronDown } from 'lucide-react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  icon: React.ReactNode;
}

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const faqData: FaqItem[] = [
    {
      id: 0,
      question: 'How does the AI analyze my resume?',
      answer:
        'Our system extracts the text content of your resume document and intelligently evaluates it using the Qwen 2.5 AI model. The AI computes role fit, ATS match scores, formal employment history detection, and provides relevant industry keyword recommendations.',
      icon: <Sparkles className="text-white shrink-0" size={20} />,
    },
    {
      id: 1,
      question: 'What file formats are supported and what is the maximum file size?',
      answer:
        'We support PDF, DOCX (Microsoft Word), and TXT file formats with a maximum file size limit of up to 5 MB per document.',
      icon: <FileText className="text-white shrink-0" size={20} />,
    },
    {
      id: 2,
      question: 'Is my resume data and document content secure and confidential?',
      answer:
        'Yes, your privacy and data security are our top priorities. Uploaded documents are processed securely during your analysis session and are never stored permanently or shared with third parties.',
      icon: <ShieldCheck className="text-white shrink-0" size={20} />,
    },
    {
      id: 3,
      question: 'How long does it take to receive the complete analysis report?',
      answer:
        'The analysis runs automatically in real time. Typically, all evaluation modules (ATS scoring, role recommendations, skill gap analysis, and action plans) complete in just a few seconds.',
      icon: <Zap className="text-white shrink-0" size={20} />,
    },
    {
      id: 4,
      question: 'What should I do if the AI recommendations show a lower match score?',
      answer:
        'Our analysis report includes an "Actionable Improvements" section detailing specific gaps alongside concrete, step-by-step recommendations that you can apply directly to optimize your resume.',
      icon: <HelpCircle className="text-white shrink-0" size={20} />,
    },
  ];

  const toggleFaq = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const header = (
    <div className="flex flex-col items-start text-left gap-2 max-w-2xl">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-white tracking-tight">
        Frequently Asked Questions (Q&A)
      </h2>
      <p className="text-xs sm:text-sm lg:text-base text-zinc-400 font-normal">
        Scroll down to explore interactive card questions stacking sequentially.
      </p>
    </div>
  );

  const floatConfigs = [
    { delay: '0s', duration: '4.2s', amplitude: '6px', rotate: '0.4deg' },
    { delay: '0.8s', duration: '5.2s', amplitude: '8px', rotate: '-0.6deg' },
    { delay: '1.5s', duration: '4.6s', amplitude: '5px', rotate: '0.5deg' },
    { delay: '0.4s', duration: '5.8s', amplitude: '9px', rotate: '-0.5deg' },
    { delay: '1.1s', duration: '4.0s', amplitude: '7px', rotate: '0.6deg' },
  ];

  return (
    <section className="w-full max-w-[96vw] lg:max-w-[92vw] 2xl:max-w-[92vw] mx-auto pt-8 lg:pt-12 pb-0 text-left">
      <ScrollStack
        header={header}
        itemDistance={180}
        itemScale={0.05}
        itemStackDistance={18}
        headerPosition="center"
        stackPosition="center"
        useWindowScroll={true}
      >
        {faqData.map((item, idx) => {
          const isOpen = openId === item.id;
          const float = floatConfigs[idx % floatConfigs.length];

          return (
            <ScrollStackItem
              key={item.id}
              floatDelay={float.delay}
              floatDuration={float.duration}
              floatAmplitude={float.amplitude}
              floatRotate={float.rotate}
            >
              <div
                className={`w-full p-6 sm:p-8 rounded-3xl border flex flex-col justify-between backdrop-blur-2xl transition-all duration-300 text-left select-none shadow-2xl ${isOpen
                    ? 'bg-zinc-950 border-zinc-700 shadow-[0_20px_50px_rgba(0,0,0,0.95)]'
                    : 'bg-zinc-950/90 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-950'
                  }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 shrink-0">
                        {item.icon}
                      </div>
                      <span className="text-xs uppercase font-normal tracking-widest text-zinc-500">
                        Card 0{item.id + 1}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleFaq(item.id)}
                      className={`p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 cursor-pointer transition-transform duration-300 ${isOpen ? 'rotate-180 text-white bg-zinc-800' : ''
                        }`}
                    >
                      <ChevronDown size={18} />
                    </button>
                  </div>

                  <h3
                    onClick={() => toggleFaq(item.id)}
                    className="text-lg sm:text-xl lg:text-2xl font-normal text-white mb-3 tracking-tight leading-snug cursor-pointer hover:text-zinc-200"
                  >
                    {item.question}
                  </h3>

                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-350 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-xs sm:text-sm lg:text-base text-zinc-300 leading-relaxed font-normal pt-2 border-t border-zinc-900/80 mt-2">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          );
        })}
      </ScrollStack>
    </section>
  );
};

