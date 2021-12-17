import logo from './logo.svg';
import './App.css';
import SSidebar from './components/sidebar';
import Header from './components/header';
import Main from './Main';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className='division1'>
        <SSidebar/>
        <Main/>
      </div>
      
    </div>
  )
}

export default App;
