import Graph from "./Graph";
import Metadata from "./Metadata";
import './Main.css'

export default function Main() {
    return (
        <div className="main-wrapper">
            <Metadata />
            <Graph />
        </div>
    )
}