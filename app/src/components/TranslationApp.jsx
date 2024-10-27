// TranslationApp.jsx
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

const TranslationApp = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const MAX_CHARS = 500;

  const handleTextChange = (e) => {
    const newText = e.target.value;
    if (newText.length <= MAX_CHARS) {
      setText(newText);
      setError('');
    } else {
      setError(`Text must be ${MAX_CHARS} characters or less`);
    }
  };

  const handleTranslate = async () => {
    if (!text.trim()) {
      setError('Please enter text to translate');
      return;
    }

    setIsLoading(true);
    setError('');
    setTranslatedText('');

    try {
      const response = await fetch(
        `https://lingva.ml/api/v1/${sourceLang}/${targetLang}/${encodeURIComponent(text)}`
      );

      if (!response.ok) {
        throw new Error(`Translation failed: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('API Response:', result);
      setTranslatedText(result.translation || 'Translation not found');
    } catch (error) {
      console.error("Translation error:", error);
      setError(`Translation failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Translation App</h1>

        <div className="space-y-6">
          <div className="relative">
            <textarea
              value={text}
              onChange={handleTextChange}
              placeholder="Enter text to translate"
              disabled={isLoading}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[150px] text-gray-700 disabled:bg-gray-50"
            />
            <div className="absolute bottom-2 right-2 text-sm text-gray-500">
              {text.length}/{MAX_CHARS}
            </div>
          </div>

          <LanguageSelector
            label="Source Language"
            selectedLang={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            isDisabled={isLoading}
          />

          <LanguageSelector
            label="Target Language"
            selectedLang={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            isDisabled={isLoading}
          />

          <button
            onClick={handleTranslate}
            disabled={isLoading || !text.trim() || text.length > MAX_CHARS}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                Translating...
              </>
            ) : (
              'Translate'
            )}
          </button>

          {error && (
            <div className="text-red-500 text-sm mt-2 p-2 bg-red-50 rounded-md">
              {error}
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Translated Text:</h3>
            <div className={`p-4 bg-gray-50 rounded-lg min-h-[100px] text-gray-700 ${isLoading ? 'opacity-50' : ''}`}>
              {translatedText || 'Translation will appear here'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslationApp;
