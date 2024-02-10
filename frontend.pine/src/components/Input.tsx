import './Input.css'

function sendInput(){
  
}

export default function Input() {
    return (
      <div>
        <h1>
          Pine
        </h1>
        <h3>
          Your papers, organized
        </h3>
        <div className="inputDiv">
          <input name="arxivLink" className="arxivLink" placeholder="ArXiv Link:"/>
          <button className="inputButton" onClick={sendInput}>Continue</button>
        </div>
      </div>
    );
}
