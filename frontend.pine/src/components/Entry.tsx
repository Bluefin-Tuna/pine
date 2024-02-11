import './Entry.css'
import {useState, useId, useContext} from "react";
import {NameContext} from "./Main";

export default function Entry() {
  const [input, setInput] = useState('');
  const id = useId();
  // @ts-ignore
  const { setName } = useContext(NameContext);
  async function onClick () {
    //POST with arxiv link

    const response = async () => {
      const req = await fetch('http://127.0.0.1:5000/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: JSON.stringify({"paper_name": input}),
        }
      );
      const json = await req.json();
      console.log(json);
      setName(input);
    }
    await response();
  }
    return (
      <div className="entry-wrapper">
        <h1>
          Pine
        </h1>
        <h3>
          Your papers, organized
        </h3>
        <div className="inputDiv">
          <input id = {id} value={input} name="arxivLink" className="arxivLink" placeholder="ArXiv Link:"
                 onInput={e => setInput((e.target as HTMLTextAreaElement).value)}/>
          <button className="inputButton" onClick={onClick}>Continue</button>
        </div>
      </div>
    );
}
