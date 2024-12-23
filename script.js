// Monaco Editor setup
require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs' } });

let editor;
let files = [];  // Store files in memory

require(['vs/editor/editor.main'], function () {
  editor = monaco.editor.create(document.getElementById('editor'), {
    value: 'console.log("Hello World!");',
    language: 'javascript',  // Default language
    theme: 'vs-dark'
  });
});

// File Explorer logic
function loadFileList() {
  const fileListContainer = document.getElementById('file-list');
  fileListContainer.innerHTML = '';
  files.forEach((file, index) => {
    const fileElement = document.createElement('li');
    fileElement.classList.add('file-item');
    fileElement.textContent = file.name;
    fileElement.onclick = () => loadFileContent(file, index);
    fileListContainer.appendChild(fileElement);
  });
}

function loadFileContent(file, index) {
  editor.setValue(file.content);
  monaco.editor.setModelLanguage(editor.getModel(), file.language);
}

document.getElementById('new-file').onclick = () => {
  const newFile = {
    name: `newfile${files.length + 1}.js`,
    content: '',
    language: 'javascript',
  };
  files.push(newFile);
  loadFileList();
};

document.getElementById('save-file').onclick = () => {
  const currentFile = files[0];  // For simplicity, assume the first file is the active file
  currentFile.content = editor.getValue();
  loadFileList();
};

// Run code in the browser when the "Run Code" button is clicked
document.getElementById('run-code').onclick = () => {
  const code = editor.getValue();  // Get the code from the Monaco editor
  try {
    eval(code);  // Execute the code (Note: eval can be dangerous, use it carefully)
  } catch (e) {
    console.error('Error executing code:', e);  // Handle any errors that occur during execution
  }
};

// Change the language of the Monaco editor when the user selects a language from the dropdown
document.getElementById('language-selector').addEventListener('change', function (event) {
  const selectedLanguage = event.target.value;  // Get the selected language from the dropdown
  monaco.editor.setModelLanguage(editor.getModel(), selectedLanguage);  // Change the editor's language
});

// Load the file list on page load
loadFileList();

