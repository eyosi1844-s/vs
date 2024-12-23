require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs' } });

let editor;    // Store Monaco Editor instance
let files = [];  // Array to store the file data

require(['vs/editor/editor.main'], function () {
  // Initialize Monaco Editor
  editor = monaco.editor.create(document.getElementById('editor'), {
    value: '',  // Empty editor content by default
    language: 'javascript',  // Default language is JavaScript
    theme: 'vs-dark',  // Set dark theme
  });
  
  // Load initial file list
  loadFileList();
});
