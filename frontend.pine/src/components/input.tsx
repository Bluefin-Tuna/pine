import './input.css'

function checkInput(){
  
}

export default function inputForm() {
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
          <button className="inputButton" onClick={checkInput}>Continue</button>
        </div>
      </div>
    );
}
