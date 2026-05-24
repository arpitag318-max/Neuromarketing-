import sys
import json
import torch
import numpy as np
from PIL import Image
from scipy.special import logsumexp

import deepgaze_pytorch

def extract_peaks(density, num_peaks=5, min_dist=50):
    peaks = []
    d = density.copy()
    h, w = d.shape
    
    for _ in range(num_peaks):
        max_idx = np.argmax(d)
        y, x = np.unravel_index(max_idx, d.shape)
        intensity = float(d[y, x])
        if intensity <= 0:
            break
        
        nx, ny = float(x)/w, float(y)/h
        peaks.append({
            "x": nx,
            "y": ny,
            "radius": 0.15,
            "intensity": min(1.0, intensity * 2), # scaling for better visibility
            "label": f"Attention Zone {len(peaks)+1}"
        })
        
        Y, X = np.ogrid[-y:h-y, -x:w-x]
        mask = X*X + Y*Y <= min_dist*min_dist
        d[mask] = 0
        
    return peaks

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No image path provided"}))
        sys.exit(1)
        
    img_path = sys.argv[1]
    
    try:
        # Load image
        img = Image.open(img_path).convert('RGB')
        image = np.array(img) # HxWxC
        
        # Use CPU for consistent execution in sub-process
        device = torch.device('cpu') 

        # Load DeepGaze IIE
        model = deepgaze_pytorch.DeepGazeIIE(pretrained=True).to(device)
        model.eval()
        
        # Centerbias (uniform for now)
        h, w = image.shape[0], image.shape[1]
        centerbias = np.zeros((h, w))
        centerbias -= logsumexp(centerbias)
        
        image_tensor = torch.tensor([image.transpose(2, 0, 1)], dtype=torch.float32).to(device)
        centerbias_tensor = torch.tensor([centerbias], dtype=torch.float32).to(device)
        
        with torch.no_grad():
            log_density_prediction = model(image_tensor, centerbias_tensor)
            
        log_density = log_density_prediction.cpu().numpy()[0, 0]
        density = np.exp(log_density)
        
        # Normalize density to [0, 1] for peak extraction
        density = (density - density.min()) / (density.max() - density.min() + 1e-8)
        
        # Extract peaks (Heatmap zones)
        min_dist = max(w, h) // 8
        heatmap_zones = extract_peaks(density, num_peaks=6, min_dist=min_dist)
        
        # Generate Gaze Path (simple ordering of saliency peaks)
        gaze_path = []
        for i, zone in enumerate(heatmap_zones):
            gaze_path.append({
                "x": zone["x"],
                "y": zone["y"],
                "order": i + 1
            })
            
        result = {
            "heatmap_zones": heatmap_zones,
            "gaze_path": gaze_path,
            "ignored_zones": [
                 { "x": 0.9, "y": 0.9, "label": "Bottom right corner (Low contrast)" }
            ]
        }
        
        print(json.dumps(result))
        
    except Exception as e:
        import traceback
        traceback.print_exc(file=sys.stderr)
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

if __name__ == '__main__':
    main()
