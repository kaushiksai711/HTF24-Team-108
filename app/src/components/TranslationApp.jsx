import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import './TranslationApp.css'
const puns = [
  "I'm a big fan of translations—they always make more *cents*!",
  "This translation app? It’s truly *word-ly* amazing!",
  "Why was the text nervous? It was going through some major *changes*!",
  "Translations are like jokes—if you don't get it, it probably got lost in translation!",
  "I used to be a translator, but I quit. It was all just *talk*!",
  "This app's translations are so good... they should have their own *lingua award*!",
  "Why did the word cross the road? To get to the other *meaning*!",
  "I'm not fluent, but I'm great at *translating my way into trouble*!",
];

const getRandomPun = () => puns[Math.floor(Math.random() * puns.length)];

const TranslationApp = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [pun, setPun] = useState('');
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
    setPun('');

    try {
      const response = await fetch(
        `https://lingva.ml/api/v1/${sourceLang}/${targetLang}/${encodeURIComponent(text)}`
      );

      if (!response.ok) {
        throw new Error(`Translation failed: ${response.statusText}`);
      }

      const result = await response.json();
      setTranslatedText(result.translation || 'Translation not found');
      setPun(getRandomPun());
    } catch (error) {
      setError(`Translation failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-white to-blue-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 space-y-6">
        <h1 className="text-4xl font-extrabold text-center mb-4 text-indigo-600">
          🌐 Translation App
        </h1>

        {/* Input Text Area */}
        <div className="relative">
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Enter text to translate..."
            disabled={isLoading}
            className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-300 transition-all min-h-[150px] disabled:bg-gray-100"
          />
          <div className="absolute bottom-2 right-2 text-sm text-gray-500">
            {text.length}/{MAX_CHARS}
          </div>
        </div>

        {/* Language Selectors */}
        <div className="flex space-x-4">
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
        </div>

        {/* Translate Button */}
        <button
          onClick={handleTranslate}
          disabled={isLoading || !text.trim() || text.length > MAX_CHARS}
          className="w-full bg-indigo-500 text-white py-3 px-4 rounded-xl hover:bg-indigo-600 transition-all flex items-center justify-center shadow-md hover:shadow-lg"
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

        {/* Error Message */}
        {error && (
          <div className="text-red-600 text-sm mt-2 bg-red-50 p-3 rounded-md shadow-md">
            {error}
          </div>
        )}

        {/* Translated Text Display */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Translated Text:
          </h3><br></br>
          <div className={`p-4 bg-gray-50 rounded-xl min-h-[100px] ${isLoading ? 'opacity-50' : ''}`}>
            {translatedText || 'Translation will appear here...'}
          </div>
        </div>
        <hr></hr>
        {/* Random Pun Display */}
        {pun && (
          <div className="mt-4 p-4 bg-yellow-100 rounded-lg text-yellow-800 text-center font-medium shadow-sm">
            <span role="img" aria-label="lightbulb">💡</span> {pun}
          </div>
        )}
      </div>
    </div>
  );
};

export default TranslationApp;
