// LanguageSelector.jsx
import React from 'react';

const LanguageSelector = ({ label, selectedLang, onChange, isDisabled }) => (
  <label className="block text-sm font-medium text-gray-700 mb-2">
    {label}:
    <select
      value={selectedLang}
      onChange={onChange}
      disabled={isDisabled}
      className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
    >
      <option value="en">English</option>
      <option value="es">Spanish</option>
      <option value="fr">French</option>
      <option value="de">German</option>
      <option value="it">Italian</option>
      <option value="pt">Portuguese</option>
      <option value="ru">Russian</option>
      <option value="ja">Japanese</option>
      <option value="ko">Korean</option>
      <option value="zh">Chinese (Simplified)</option>
      <option value="ar">Arabic</option>
      <option value="hi">Hindi</option>
      <option value="nl">Dutch</option>
      <option value="sv">Swedish</option>
      <option value="no">Norwegian</option>
      <option value="tr">Turkish</option>
      <option value="pl">Polish</option>
      <option value="th">Thai</option>
    </select>
  </label>
);

export default LanguageSelector;
