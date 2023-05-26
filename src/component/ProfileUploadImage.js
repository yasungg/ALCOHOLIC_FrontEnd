import React, { useContext, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import AxiosApi from '../api/AxiosApi';
import { UserContext } from '../api/Context';

const firebaseConfig = {
    apiKey: "AIzaSyAGQ35bn4eC-oCb_QGEO7qnjX_nhqEixYM",
    authDomain: "alcoholic-5c67c.firebaseapp.com",
    projectId: "alcoholic-5c67c",
    storageBucket: "alcoholic-5c67c.appspot.com",
    messagingSenderId: "738165300307",
    appId: "1:738165300307:web:28fcfee97c0634799dfaa6",
    measurementId: "G-QY6VQCDZEW",
};

initializeApp(firebaseConfig);

const storage = getStorage();


// 회원 프로필 업데이트
const ProfileImageUploader = () => {
  const [file, setFile] = useState(null);
  const { userNum } = useContext(UserContext); // 로그인 관리를 위한 Context API

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadAndUploadUrl = async () => {
    const storageRef = ref(storage, "ProfileImage");
    const fileRef = ref(storageRef, file.name);
    
    await uploadBytes(fileRef, file);
    console.log('File uploaded successfully!');
    
    const downloadURL = await getDownloadURL(fileRef);
    console.log("저장경로 확인: " + downloadURL);
    
    setTimeout(async () => {
        console.log(downloadURL);
        const response = await AxiosApi.uploadProfileImage(downloadURL, userNum);
        if (response.data === true) console.log(response.data);
        else {
          console.log(response.data);
        }
      }, 1000); // 1초(1000ms) 후에 코드 실행
    };
  

  return (
    <div>
      <input type="file" onChange={handleFileInputChange} />
      <button onClick={handleUploadAndUploadUrl}>업로드</button>
      {/* {url && <img src={url} alt="uploaded" />} */}
    </div>
  );
};

export default ProfileImageUploader;