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
          <input name="arxivLink" placeholder="Arxiv link:"/>
          {"\n"}
          <button>Continue</button>
        </div>
      </div>
    );
}
