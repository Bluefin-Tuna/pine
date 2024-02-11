import Graph from "./Graph";
import Metadata from "./Metadata";
import './Main.css'
import {createContext, useState} from "react";
import Entry from "./Entry.tsx";


export const NameContext = createContext("mageNet Classification with Deep Convolutional Neural Networks");
// @ts-ignore
const NameContextProvider = ({ children }) => {
  const [name, setName] = useState(undefined);

  return (
    <NameContext.Provider value={{ name, setName }}>
      {children}
    </NameContext.Provider>
  );
};

export default function Main() {
    return (
        <div className="main-wrapper">
          <NameContextProvider>
            <Entry />
            <Metadata />
            <Graph />
          </NameContextProvider>
        </div>
    )
}