import './App.css';
import Header from './components/header';
import Main from './Main';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className='division1' id='division1'>
        <Main/>
      </div>
      
    </div>
  )
}

export default App;
