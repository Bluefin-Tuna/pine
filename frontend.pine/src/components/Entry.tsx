import './Entry.css'
import {useState, useId, useContext} from "react";
import {NameContext} from "./Main";

export default function Entry() {
  const [input, setInput] = useState('');
  const id = useId();
  // @ts-ignore
  const { setName: setPaper } = useContext(NameContext);
  async function onClick () {
    //POST with arxiv link
    let paper_id: string;
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
      paper_id = json["paper_id"];
    }
    await response();

    const getFromID = async () => {
      const req = await fetch('http://127.0.0.1:5000/get/' + paper_id, {
          method: 'GET',
        }
      );
      const json = await req.json();
      console.log(json);
      setPaper(json);
    }
    await getFromID();
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
