"use client";

import { motion, AnimatePresence } from "framer-motion";
import Cropper, { type Point, type Area } from "react-easy-crop";
import Jersey from "@/components/atoms/texts/Jersey";
import { useState } from "react";

interface CropModalProps {
  imageToCrop: string | null;
  onClose: () => void;
  onConfirm: (croppedAreaPixels: Area) => void;
}

export default function CropModal({ imageToCrop, onClose, onConfirm }: CropModalProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = (_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  return (
    <AnimatePresence>
      {imageToCrop && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
        >
          <div className="bg-white border-4 border-black p-6 rounded-[2.5rem] max-w-lg w-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <Jersey text="AJUSTA TU FOTO" size="24|28" className="text-center mb-6" />
            
            <div className="relative h-64 md:h-80 bg-gray-200 border-2 border-dashed border-gray-400 rounded-2xl overflow-hidden mb-6">
              <Cropper
                image={imageToCrop}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="px-4">
                  <p className="text-xs font-bold mb-2">ZOOM</p>
                  <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-v2k-pink-hot"
                  />
              </div>
              
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-100 border-[3px] border-black py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                >
                  CANCELAR
                </button>
                <button
                  type="button"
                  onClick={() => croppedAreaPixels && onConfirm(croppedAreaPixels)}
                  className="flex-1 bg-v2k-pink-hot text-white border-[3px] border-black py-3 rounded-xl font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] active:translate-y-0 transition-all"
                >
                  ACEPTAR
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
