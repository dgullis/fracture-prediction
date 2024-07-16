import React from "react";

const UploadResult = ({ preview, result }) => {
    const predicted_class = result && result.predicted_class === 'fractured' ? 'Fractured' : 'Not Fractured'
    const borderColour = result && result.predicted_class === 'fractured' ? 'red' : 'green';

    return (
        <>
        <img
            src={preview}
            className="preview-image"
            alt="preview-image"
            style={{ maxWidth: "300px", height: "auto", boxShadow: `0 0 10px ${borderColour}`, borderRadius: "5px"  }}
            />
        <p> Result: {result && predicted_class}</p>
        <p> Confidence: {result && result.confidence} %</p>

        </>


    )
}

export default UploadResult;