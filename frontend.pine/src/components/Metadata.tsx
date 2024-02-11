import './Metadata.css';
import {NameContext} from "./Main.tsx";
import {useContext} from "react";

export default function Metadata() {
    // @ts-ignore
  const {name} = useContext(NameContext);
    return (
        <div className="sidebar-wrapper">
          <h1>{name != null && name['title']} </h1>
          <h2>{name != null && name['authors'].join(" ")}</h2>
          <p> {name != null && name['abstract']}</p>
        </div>
    );
}