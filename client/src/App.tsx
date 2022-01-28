import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [file, setFile] = useState<File>();
  const [shouldUpload, setShouldUpload] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const worker = new Worker("../upload.worker.ts");
    worker.onmessage = (e) => console.log(e.data);

    if (shouldUpload && file) {
      worker.postMessage(file);
    }
  }, [shouldUpload]);

  const handleInputChange = ({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (currentTarget.files && currentTarget.files[0]) {
      setFile(currentTarget.files[0]);
    }
  };

  const handleSelectFile = () => {
    inputRef?.current?.click();
  };

  const handleUploadFile = () => {
    setShouldUpload(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <input onChange={handleInputChange} ref={inputRef} type="file" hidden />
        <button onClick={handleSelectFile}>select file</button>
        <button onClick={handleUploadFile}>upload file</button>
      </header>
    </div>
  );
}

export default App;
