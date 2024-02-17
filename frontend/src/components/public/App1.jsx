import React, { useState } from "react";
import "react-quill/dist/quill.snow.css"; // Impor gaya dari react-quill
import ReactQuill from "react-quill";

function App1() {
  const [content, setContent] = useState("");

  const handleContentChange = (value) => {
    setContent(value);
  };

  return (
    <div className="">
      <h1>Rich Text Editor</h1>
      <div>
        <label
          htmlFor="misi"
          className="d-flex flex-column align-items-left pt-4 text-black"
        >
          <b>MISI</b>
        </label>
        <ReactQuill
          value={content}
          onChange={handleContentChange}
          placeholder="Type your text here..."
        />
      </div>

      <div>
        <label
          htmlFor="misi"
          className="d-flex flex-column align-items-left pt-4 text-black"
        >
          <b>MISI</b>
        </label>
        <ReactQuill
          value={content}
          onChange={handleContentChange}
          placeholder="Type your text here..."
        />
      </div>
      <br />
      <br />
      <div className="output">
        <h2>Output:</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}

export default App1;
