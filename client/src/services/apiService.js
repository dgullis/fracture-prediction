const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData
      });
  
      if (!response.ok) {
        throw new Error('File upload failed');
      }
  
      return await response.json();
    } catch (error) {
      throw new Error(`API Error: ${error.message}`);
    }
  };

const deleteUpload = async (filename) => {

    try {
        const response = await fetch(`http://localhost:8000/delete?filename=${encodeURIComponent(filename)}`, {
          method: 'DELETE',
          body: JSON.stringify({'filename': filename})
        });
    
        if (!response.ok) {
          throw new Error('Failed to delete upload');
        }
    
        return await response.json();
      } catch (error) {
        throw new Error(`API Error: ${error.message}`);
      }
}
  
  export { uploadImage, deleteUpload };