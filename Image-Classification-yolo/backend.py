from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
import io
import base64
from PIL import Image
import uvicorn

app = FastAPI()

# Allow requests from your React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the PyTorch YOLO model
try:
    model = YOLO("best (1).pt")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

@app.post("/analyze")
async def analyze(image: UploadFile = File(...), objectName: str = Form(...)):
    if model is None:
        return {"found": False, "message": "Model failed to load. Check the server logs.", "image": None}
        
    contents = await image.read()
    img = Image.open(io.BytesIO(contents)).convert("RGB")
    
    # Run YOLO inference
    results = model(img)
    result = results[0]
    
    # Generate an image with bounding boxes drawn over it
    # result.plot() returns a BGR numpy array
    img_array = result.plot()
    
    # Convert BGR array to RGB Pillow Image
    img_rgb = Image.fromarray(img_array[..., ::-1])
    
    # Convert the Pillow Image to Base64 to send it back to the browser
    buffered = io.BytesIO()
    img_rgb.save(buffered, format="JPEG")
    img_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
    
    full_base64_img = f"data:image/jpeg;base64,{img_base64}"
    
    # Extract the names of the detected classes
    detected_classes = [result.names[int(c)] for c in result.boxes.cls]
    
    # Determine if requested object is in detected classes
    found = False
    for det_class in detected_classes:
        if objectName.lower() in det_class.lower() or det_class.lower() in objectName.lower():
            found = True
            break
            
    # Format a response message
    if not detected_classes:
        message = "No recognizable objects were found in the image."
    elif found:
        message = f"Identification Successful! Found '{objectName}'. Detected objects in image: {', '.join(set(detected_classes))}."
    else:
        message = f"Object '{objectName}' was not found. Detected objects in image: {', '.join(set(detected_classes))}."
        
    return {
        "found": found, 
        "message": message,
        "image": full_base64_img
    }

if __name__ == "__main__":
    uvicorn.run("backend:app", host="0.0.0.0", port=8000, reload=True)
