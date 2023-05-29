import React, { useState } from "react";
import { storage } from "../api/firebase";
import { ref } from "firebase/storage";

const ImageUploader = () => {
  const [files, setFiles] = useState(null);
  const [url, setUrl] = useState("");

  const handleFileInputChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleUploadClick = () => {
    const storageRef = ref(storage, "ReviewImage");

    Promise.all(
      files.map((file) => {
        const fileRef = storageRef.child(file.name);
        fileRef.put(file).then((urls) => {
          setUrl(urls);
        });
      })
    );
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileInputChange} />
      <button onClick={handleUploadClick}>Upload</button>
      {url && <img src={url} alt="uploaded" />}
    </div>
  );
};
export default ImageUploader;
