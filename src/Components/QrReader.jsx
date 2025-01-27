import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QRReaderWithHtml5Qrcode = ({ isOpen, onClose,callback }) => {
  const qrCodeRef = useRef(null);
  const [data, setData] = useState("No result");

  useEffect(() => {
    if (isOpen && qrCodeRef.current) {
      const html5QrCode = new Html5Qrcode("reader");
      setData('')

      html5QrCode
        .start(
          { facingMode: "environment" }, // Back camera
          {
            fps: 10, // Scans per second
            qrbox: { width: 250, height: 250 }, // Scanning area
          },
          (decodedText) => {
            callback(decodedText);
            setData(decodedText);

          },
          (error) => {
            console.error("QR Code scanning error:", error);
          }
        )
        .catch((err) => console.error("Error starting QR Code scanner:", err));

      return () => {
        html5QrCode.stop().then(() => html5QrCode.clear());
      };
    }
  }, [isOpen]);

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Scan QR Code</h2>
          <p className="mt-4 text-lg">
            <strong>Scanned Data:</strong> {data}
          </p>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-700"
          >
            ✖
          </button>
          <div id="reader" className="w-full h-64" ref={qrCodeRef}></div>
        
        </div>
      </div>
    )
  );
};

export default QRReaderWithHtml5Qrcode;
