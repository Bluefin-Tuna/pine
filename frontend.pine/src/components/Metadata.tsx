import './Metadata.css';
import {NameContext} from "./Main.tsx";
import {useContext} from "react";

export default function Metadata() {
    // @ts-ignore
  const {name} = useContext(NameContext);
    return (
        <div className="sidebar-wrapper">
            Hello {name}
        </div>
    );
}