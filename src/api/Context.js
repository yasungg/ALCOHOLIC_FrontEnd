import firebase from "firebase/compat/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useState, createContext } from "react";
export const UserContext = createContext(null);

const UserStore = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userNum, setUserNum] = useState(0);
  const [isSidebar, setIsSidebar] = useState(true);
  const [productNo, setProductNo] = useState(0);
  const [rev_img, setRev_img] = useState("");
  const contextValue = {
    isLogin,
    isSidebar,
    userNum,
    setUserNum,
    setIsSidebar,
    contextLogin: () => setIsLogin(true),
    contextLogout: () => setIsLogin(false),
		deleteUserNum: () => setUserNum(0),
    productNo,
    setProductNo,
    rev_img,
    setRev_img,
    // ImageLoader: () => async (imageName) => {
    //   const storage = getStorage(firebase.app());
    //   const storageIconRef = ref(storage, "Icons");
    //   const imageRef = ref(storageIconRef, imageName);
    //   const imageUrl = await getDownloadURL(imageRef);
    //   return imageUrl
    // },
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
export default UserStore;