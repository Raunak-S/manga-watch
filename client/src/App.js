import logo from './logo.svg';
import './App.css';
import Manga from './components/Manga.jsx';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {

  const url = 'https://api.mangadex.org'
  const [manga, setManga] = useState(null)

  useEffect(() => {
    const getMangaList = async () => {
      const res = await axios.get(`${url}/manga`)
      setManga(res.data)
    }
    
    getMangaList()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {manga !== null ? <Manga mangaList={manga} /> : <div>Loading...</div> }
      </header>
    </div>
  );
}

export default App;
