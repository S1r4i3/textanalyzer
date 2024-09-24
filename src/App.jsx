import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const TextAnalyzer = () => {
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [paragraphCount, setParagraphCount] = useState(0);
  const [spaceCount, setSpaceCount] = useState(0);

  useEffect(() => {
    const analyzeText = () => {
      setWordCount(text.trim().split(/\s+/).filter(word => word !== '').length);
      setCharCount(text.length);
      setSentenceCount((text.match(/[.!?]+/g) || []).length);
      setParagraphCount((text.split(/\n\s*\n/) || []).length);
      setSpaceCount((text.match(/\s/g) || []).length);
    };

    analyzeText();
  }, [text]);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full px-4 sm:px-0">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Text Analyzer</h1>
          <textarea
            className="w-full p-2 border rounded-md resize-none h-40 mb-4"
            placeholder="Enter your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <StatCard title="Words" value={wordCount} />
            <StatCard title="Characters" value={charCount} />
            <StatCard title="Sentences" value={sentenceCount} />
            <StatCard title="Paragraphs" value={paragraphCount} />
            <StatCard title="Spaces" value={spaceCount} />
          </div>
          {text.length > 500 && (
            <Alert className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Long Text</AlertTitle>
              <AlertDescription>
                Your text is quite long. Consider breaking it into smaller sections for better readability.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-gray-100 p-4 rounded-lg text-center">
    <h3 className="font-semibold text-gray-700">{title}</h3>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

export default TextAnalyzer;