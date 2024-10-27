// QuillModal.js
import React, { useState } from 'react';
import QuillEditor from './Quill'; // Import your Quill component
import './QuillModal.css'; // Custom modal CSS

const QuillModal = ({ isOpen, onClose, onSave }) => {
  const [content, setContent] = useState(''); // State for editor content

  const handleSave = () => {
    onSave(content); // Save content to parent component
    onClose(); // Close the modal
  };

  if (!isOpen) return null; // Don't render if modal is not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit Content</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <QuillEditor value={content} onChange={setContent} />
        </div>
        <div className="modal-footer">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default QuillModal;
