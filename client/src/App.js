import skeleton from './images/skeleton.png'
import { useState, useEffect, useRef } from "react"
import './App.css';
import { uploadImage, deleteUpload } from './services/apiService';
import FileUploader from './components/fileUploader';
import UploadResult from './components/uploadResult';
import ResetUploadButton from './components/resetUploadButton';
import Title from './components/title';

function App() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setPreview(objectURL);
      return () => URL.revokeObjectURL(objectURL);
    }
  }, [file]);

  const handleFileChange = (uploadedFile) => {
    setFile(uploadedFile);
    handleUpload(uploadedFile);
  };

  const handleUpload = async (uploadedFile) => {
    if (!uploadedFile) {
      setError('Please select a file')
      return
    }

    try {
      const data = await uploadImage(uploadedFile);
      setResult({
        predicted_class: data.predicted_class,
        confidence: (data.confidence * 100).toFixed(0)
      });
    } catch (error) {
      setError(`${error.error}`);
    }
  };

  const handleResetPreview = async () => {

    try {
      const result = await deleteUpload(file.name)
    } catch (error) {
      setError(`${error.error}`)
    }

    setPreview(null);
    setFile(null);
    setResult(null);
    setError(null)

  };

  return (
    <div className="App">
      <header className="App-header">
        
      
        <div className='main-section'>
          <div className="title-section">
          <Title />
          </div>
          <div className="content-section">
            {preview ? (
              <div>
                <UploadResult 
                  preview={preview}
                  result={result}
                />
                <ResetUploadButton handleResetPreview={handleResetPreview} />
              </div>
              ) : 
              <FileUploader onChange={handleFileChange} />
            }

            {error && 
              <p>{error}</p>
            }
            </div>
        </div>
      </header>
    </div>
  );
}

export default App;
