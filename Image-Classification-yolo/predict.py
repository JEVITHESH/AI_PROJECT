from ultralytics import YOLO
import sys

def main():
    if len(sys.argv) < 2:
        print("Usage: python predict.py <path_to_image>")
        sys.exit(1)
        
    image_path = sys.argv[1]
    
    print("Loading model 'best (1).pt'...")
    model = YOLO("best (1).pt")
    
    print(f"Running prediction on {image_path}...")
    results = model(image_path)
    
    # Process results list
    for result in results:
        boxes = result.boxes
        if len(boxes) == 0:
            print("No objects detected.")
        else:
            print(f"Detected {len(boxes)} object(s):")
            for i, box in enumerate(boxes):
                class_id = int(box.cls[0].item())
                class_name = result.names[class_id]
                conf = box.conf[0].item() * 100
                print(f"  [{i+1}] {class_name} (Confidence: {conf:.2f}%)")
        
        # Display image with bounding boxes
        result.show()  
        
        # Save the result to a file as well
        result.save(filename="result.jpg")
        print("Output saved to result.jpg")

if __name__ == "__main__":
    main()
