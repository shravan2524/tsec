import './App.css';
import axios from 'axios';

const backend_url = process.env.BACKEND_URL;
function App() {
  function submit(){
    console.log(process.env);
    axios.post(`${process.env.REACT_APP_BACKEND_URL}test`, {name : "shravan"})
    .then((e) => console.log(e))
    .catch((err) => console.log(err));
  }
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline" onClick={submit}>
      Hello world!
    </h1>

    </div>
  );
}

export default App;
