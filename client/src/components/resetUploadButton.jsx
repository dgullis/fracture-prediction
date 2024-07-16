import React from "react";
import './resetUploadButton.css'

const ResetUploadButton = ({handleResetPreview}) => {

    return (
        <button className="reset-upload-button" onClick={handleResetPreview}>Reset</button>
    )
   
}

export default ResetUploadButton