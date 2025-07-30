import torch
import torch.onnx
import os
from pathlib import Path

def convert_pt_to_onnx():
    """
    RoboFlowModel.pt dosyasını ONNX formatına çevirir
    """
    
    # Model dosyasının yolu
    pt_model_path = "YOLO Model/RoboFlowModel.pt"
    onnx_output_path = "public/models/RoboFlowModel.onnx"
    
    # Model dosyasının var olup olmadığını kontrol et
    if not os.path.exists(pt_model_path):
        print(f"Hata: {pt_model_path} dosyası bulunamadı!")
        return False
    
    try:
        print("PyTorch modeli yükleniyor...")
        
        # Modeli yükle (CPU'da)
        model = torch.load(pt_model_path, map_location=torch.device('cpu'))
        
        # Eğer model bir state_dict ise, model sınıfını oluştur
        if isinstance(model, dict):
            print("Model state_dict formatında, model sınıfı oluşturuluyor...")
            # Bu durumda model sınıfını manuel olarak oluşturmamız gerekebilir
            # Şimdilik basit bir yaklaşım deneyelim
            model = torch.jit.load(pt_model_path)
        
        # Modeli eval moduna al
        model.eval()
        
        print("Model yüklendi. ONNX formatına çevriliyor...")
        
        # Örnek input oluştur (224x224 boyutunda)
        dummy_input = torch.randn(1, 3, 224, 224)
        
        # ONNX formatına çevir
        torch.onnx.export(
            model,                          # Model
            dummy_input,                    # Örnek input
            onnx_output_path,              # Çıktı dosyası
            export_params=True,            # Parametreleri dahil et
            opset_version=11,              # ONNX opset versiyonu
            do_constant_folding=True,      # Sabit katlama optimizasyonu
            input_names=['input'],         # Input isimleri
            output_names=['output'],       # Output isimleri
            dynamic_axes={                 # Dinamik boyutlar
                'input': {0: 'batch_size'},
                'output': {0: 'batch_size'}
            }
        )
        
        print(f"Model başarıyla ONNX formatına çevrildi: {onnx_output_path}")
        
        # Dosya boyutunu kontrol et
        file_size = os.path.getsize(onnx_output_path) / (1024 * 1024)  # MB
        print(f"ONNX dosya boyutu: {file_size:.2f} MB")
        
        return True
        
    except Exception as e:
        print(f"Hata oluştu: {str(e)}")
        return False

def convert_with_ultralytics():
    """
    Ultralytics YOLO modelini kullanarak dönüştürme
    """
    try:
        from ultralytics import YOLO
        
        print("Ultralytics YOLO kullanılarak dönüştürülüyor...")
        
        # Modeli yükle
        model = YOLO("YOLO Model/RoboFlowModel.pt")
        
        # ONNX formatına çevir
        model.export(format="onnx", imgsz=224)
        
        # Dosyayı doğru konuma taşı
        onnx_path = "RoboFlowModel.onnx"
        if os.path.exists(onnx_path):
            os.rename(onnx_path, "public/models/RoboFlowModel.onnx")
            print("Model başarıyla dönüştürüldi ve taşındı!")
            return True
        
    except ImportError:
        print("Ultralytics yüklü değil. Yüklemek için: pip install ultralytics")
        return False
    except Exception as e:
        print(f"Ultralytics ile dönüştürme hatası: {str(e)}")
        return False

if __name__ == "__main__":
    print("PyTorch modelini ONNX formatına çevirme işlemi başlatılıyor...")
    
    # İlk olarak standart PyTorch yöntemini dene
    if not convert_pt_to_onnx():
        print("Standart yöntem başarısız, Ultralytics yöntemi deneniyor...")
        convert_with_ultralytics() 