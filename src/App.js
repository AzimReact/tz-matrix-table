import './App.css';
import Main from './components/Main';
import data from './data/mini-data.json'
// import data from './data/mock_stores.json'

function App() {
  return (
    <>
      <Main data={data} />
    </>
  );
}

export default App;
