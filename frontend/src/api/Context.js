import firebase from "firebase/compat/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useState, createContext } from "react";
export const UserContext = createContext(null);

const UserStore = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userNum, setUserNum] = useState(0);

  const contextValue = {
    isLogin,
    userNum,
    setUserNum,
    contextLogin: () => setIsLogin(true),
    contextLogout: () => setIsLogin(false),
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
