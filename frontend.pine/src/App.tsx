import './App.css'
import Input from "./components/Input.tsx";
import Graph from "./components/Graph.tsx";

function App() {
  //const [count, setCount] = useState(0)

  return (
    <div className="wrapper">
      <Input />
      {<Graph />}
    </div>
  )
}

export default App
