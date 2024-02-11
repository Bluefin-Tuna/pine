import Graph from "./Graph";
import Metadata from "./Metadata";
import './Main.css'
import {createContext, useState} from "react";
import Entry from "./Entry.tsx";


export const NameContext = createContext({author: "I. Sutskever",
  title: "ImageNet classification with deep convolutional neural networks", abstract: "We trained a large, deep convolutional neural network to classify the 1.2 million high-resolution images in the ImageNet LSVRC-2010 contest into the 1000 different classes."});
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