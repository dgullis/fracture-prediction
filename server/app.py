from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
import fastbook
from fastai.learner import load_learner
from fastai.vision.core import PILImage

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg'}

# Function to check if a file has an allowed extension
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']


@app.route('/upload', methods=['POST'])
def upload_file():
    # Check if the post request has the file part
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['image']

    # If user does not select file, browser also
    # submit an empty part without filename
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        learn_inf = load_learner('learn-model.pkl')

        # Open the uploaded image and prepare it for prediction
        img = PILImage.create(filepath)  # Load the image using fastai's PILImage
        pred, pred_idx, probs = learn_inf.predict(img)  # Make prediction

        # Prepare the prediction result to be returned
        prediction = {
            'predicted_class': str(pred),
            'confidence': float(probs[pred_idx])
        }

        print(prediction)
        
        return jsonify(prediction), 200
    
    else:
        return jsonify({'error': 'Invalid file type or extension'}), 400


if __name__ == '__main__':
    app.run(debug=True)