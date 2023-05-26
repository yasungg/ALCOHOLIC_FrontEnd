import firebase from "firebase/compat/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useState, createContext } from "react";
import roboto from "@fontsource/roboto/400.css";
export const UserContext = createContext(null);

const UserStore = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userNum, setUserNum] = useState(0);
  const [isSidebar, setIsSidebar] = useState(true);
  const mainfont = roboto;
  const contextValue = {
    isLogin,
    isSidebar,
    userNum,
    mainfont,
    setUserNum,
    setIsSidebar,
    contextLogin: () => setIsLogin(true),
    contextLogout: () => setIsLogin(false),
    deleteUserNum: () => setUserNum(0)
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
