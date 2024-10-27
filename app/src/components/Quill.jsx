
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill Snow theme

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    ['link', 'image'],
    [{ align: [] }],
    ['clean'], // Removes formatting
  ],
};

const formats = [
  'header', 'font', 'list', 'bullet', 'bold', 
  'italic', 'underline', 'strike', 'blockquote',
  'link', 'image', 'align',
];

const QuillEditor = ({ value, onChange, placeholder = "Write something..." }) => {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      theme="snow"
      placeholder={placeholder}
    />
  );
};

export default QuillEditor;
