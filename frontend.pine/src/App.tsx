import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Entry from './components/Entry.tsx';
import Main from './components/Main.tsx';
import './App.css'


function App() {
  //const [count, setCount] = useState(0)

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={ Entry } />
          <Route path="/graph" Component={ Main }/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;