import React from "react";

const UploadResult = ({ preview, result }) => {
    const predicted_class = result && result.predicted_class === 'fractured' ? 'Fractured' : 'Not Fractured'
    const borderColour = result && result.predicted_class === 'fractured' ? 'rgba(255, 0, 0, 0.891)' : 'rgba(0, 255, 0, 0.891)';

    return (
        <>
        <img
            src={preview}
            className="preview-image"
            alt="preview-image"
            style={{ maxWidth: "300px", height: "auto", border: `3px solid ${borderColour}`, borderRadius: '2px' }}
            />
        <p> Result: {result && predicted_class}</p>
        <p> Confidence: {result && result.confidence} %</p>

        </>


    )
}

export default UploadResult;