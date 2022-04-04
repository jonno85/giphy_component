import React from 'react';
import './App.css';
import GiphyLayout from './components/GiphyLayout';

const words = ['elephants', 'monkeys', 'cats', 'dogs', 'lions'];

function App() {
  return (
    <div className="App">
      <GiphyLayout words={words} sizes={{ columns: 4, gutter: 25 }} />
    </div>
  );
}

export default App;
