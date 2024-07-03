import skeleton from './images/skeleton.png'
import { useState, useEffect, useRef } from "react"
import './App.css';

function App() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  }

  const handleFileChange = (e) => {
    if(e.target.files && e.target.files.length > 0 ) {
      setFile(e.target.files)
    }
  }

  useEffect(() => {
    if (!file) return;

    let temp = [];
    temp.push(URL.createObjectURL(file[0]))

    const objectURL = temp
    setPreview(objectURL)

    return () => {
      URL.revokeObjectURL(objectURL[0])
    }
  }, [file])


  return (
    <div className="App">
      <header className="App-header">
     
        <img 
          src= {preview ? preview[0] : skeleton } 
          className="skeleton-image" 
          alt="skeleton" 
          onClick={handleImageClick}
        /> 

        <input 
          type ="file"
          accept= "image/jpg, image/jpeg, image/png"
          onChange = {handleFileChange}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        <p>
          Click the skeleton to upload an image
        </p>

        {/* {preview &&
          <img 
            src={preview[0]} 
            className="preview-image"
            alt="preview-image"
          />
        } */}
        
      </header>
    </div>
  );
}

export default App;
