import React, { useRef } from "react";
import skeleton from '../images/skeleton.png'

const FileUploader = ({ onChange }) => {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    onChange(e.target.files[0]);
  };

  return (
    <>
      <img
        src={skeleton}
        className="skeleton-image"
        alt="skeleton"
        onClick={handleImageClick}
      />
      <input
        type="file"
        accept="image/jpg, image/jpeg, image/png"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />

        <p> Click the skeleton to upload an image</p>
    </>
  );
};

export default FileUploader;