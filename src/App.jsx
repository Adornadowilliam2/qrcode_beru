import React, { useEffect, useRef, useState } from 'react';
import EasyQRCode from 'easyqrcodejs';
import { toast, ToastContainer } from 'react-toastify';

const App = () => {
  const [data, setData] = useState('');
  const qrCodeRef = useRef(null);

  const handleInputChange = (event) => {
    setData(event.target.value);
  };

  const downloadQRCode = () => {
    const canvas = qrCodeRef.current.querySelector('canvas');
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'qrcode.png';
      link.click();
      toast.success(<div className='flex items-center'><img src={"https://i.redd.it/will-the-anime-cutt-out-berus-chibi-moments-v0-7rjc5gsjmzqe1.jpg?width=368&format=pjpg&auto=webp&s=9d36bdd50fb48488edf317682f9886fd31b7cc4e"} alt="beru logo" style={{width:"100px", marginRight:"10px"}}/><span>Downloaded successfully</span></div>);
    }
  };

  
  const isValidURL = (url) => {
    try {
      new URL(url); 
      return true;
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    if (data) {
      
      if (!isValidURL(data)) {
        qrCodeRef.current.innerHTML = ''; 
        toast.error('Please enter a valid URL.');
        return; 
      }

      const options = {
        text: data,
        width: 256, 
        height: 256, 
        colorDark: '#000000', 
        colorLight: '#ffffff', 
        correctLevel: EasyQRCode.CorrectLevel.L, 
      };

      
      new EasyQRCode(qrCodeRef.current, options);
    } else {
      qrCodeRef.current.innerHTML = ''; 
    }
  }, [data]);

  return (
    <main className="flex justify-center items-center h-full bg-black text-white">
      <div>
        <ToastContainer position="bottom-right" />
        <h1>Generate QR Code</h1>

        {/* Input field for the URL or any data */}
        <input
          type="text"
          placeholder="Enter a valid URL to encode in QR code"
          value={data}
          onChange={handleInputChange}
          className="p-2 my-5 w-78"
        />

        {/* QR Code will be rendered here */}
        <div ref={qrCodeRef} className="flex justify-center mb-2"></div>

     
        <button
          onClick={downloadQRCode}
          disabled={!data ? !data : !isValidURL(data)}
     
          className='p-10px mt-20px block m-auto'
        >
          Download QR Code
        </button>
      </div>
    </main>
  );
};

export default App;
