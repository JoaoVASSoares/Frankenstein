import { useEffect, useRef, useState } from "react";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./imageCropper.css";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon as UserCircleIconSolid } from "@heroicons/react/24/solid";

interface ImageCropperProps {
  onImageCropped: (file: File) => void; // Callback para enviar o arquivo ao componente pai
  imageUrl?: string | null; // URL da imagem existente (opcional)
}

const ImageCropper: React.FC<ImageCropperProps> = ({ onImageCropped, imageUrl }) => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const cropperRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!croppedImage && imageUrl) {
      setCroppedImage(imageUrl);
    }
  }, [imageUrl]);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setShowModal(true);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const dataURLtoFile = (dataURL: string, filename: string): File => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const cropImage = () => {
    setCroppedImage(null);
    // @ts-ignore
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      setCroppedImage(null);
      const croppedDataURL = cropper.getCroppedCanvas({ width: 200, height: 200 }).toDataURL();
      setCroppedImage(croppedDataURL);
      setShowModal(false);
      // Converte para arquivo e envia ao pai
      const croppedFile = dataURLtoFile(croppedDataURL, "croppedImage.png");
      onImageCropped(croppedFile);
    }
  };

  return (
    <div>
      {croppedImage ? (
        <div>
          <label htmlFor="fileInput" className="labelFileInput">
            <img src={croppedImage} alt="Cropped" id="imageCropped" />
          </label>
          <input id="fileInput" type="file" accept="image/*" onChange={onImageChange} style={{ display: "none" }} />
        </div>
      ) : (
        <div>
          <label htmlFor="fileInput" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="labelFileInput">
            {isHovered ? <UserCircleIconSolid className="h-48 w-48 text-black cursor-pointer" /> : <UserCircleIcon className="h-48 w-48 text-black cursor-pointer" />}
          </label>
          <input id="fileInput" type="file" accept="image/*" onChange={onImageChange} style={{ display: "none" }} />
        </div>
      )}

      {showModal && (
        <div id="divModal">
          <div id="divModalInternal">
            {/* @ts-ignore */}
            <Cropper src={image as string} style={{ height: 400, width: "100%" }} aspectRatio={1} viewMode={1} guides={true} ref={cropperRef} />
            <div>
              <button onClick={cropImage} style={{ margin: "10px" }}>
                Cortar
              </button>
              <button onClick={() => setShowModal(false)} style={{ margin: "10px" }}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
