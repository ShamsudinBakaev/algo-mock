import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

const code = `// Введите ваш код\n\n`;

const hightlightWithLineNumbers = (input, language) =>
  highlight(input, language)
    .split('\n')
    .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
    .join('\n');

const CodeEditor = () => {
  const [codeValue, setCodeValue] = React.useState(code);
  // console.log('Введенный код: ', codeValue);

  // const handleCheckSolution = () => {
  //   onSolutionChange(codeValue);
  // };

  return (
    <Editor
      value={codeValue}
      onValueChange={(code) => setCodeValue(code)}
      highlight={(code) => hightlightWithLineNumbers(code, languages.js)}
      padding={10}
      textareaId="codeArea"
      className="editor"
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 16,
        outline: 0,
      }}
    />
  );
};

export default CodeEditor;
