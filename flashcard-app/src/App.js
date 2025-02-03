import logo from './logo.svg';
import './App.css';
import SearchBar from './search-bar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Paste url of article that you want to use!
        </p>
        <SearchBar />
        
      </header>
    </div>
  );
}

export default App;
