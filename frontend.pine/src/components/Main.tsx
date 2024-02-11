import Graph from "./Graph";
import Metadata from "./Metadata";
import { useLocation } from 'react-router-dom';
import './Main.css'
import { useState } from "react";



export default function Main() {
    const location = useLocation();
    const data = location.state?.metadata; // Access passed data
    const [metadata, setMetadata] = useState(null);
    const handleNodeHover = (nodeData: any) => { setMetadata(nodeData); };
    return (
        <div className="main-wrapper">
            <Metadata data={metadata} />
            <Graph data={data} onNodeHover={handleNodeHover} />
        </div>
    );
}