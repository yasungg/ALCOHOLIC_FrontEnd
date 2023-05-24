import logo from "../Image/logo.jpg";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { storage } from "../api/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import { UserContext } from "../api/Context";
import AxiosApi from "../api/AxiosApi";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const LogoButton = styled.button`
  background: white;
  border: none;
  cursor: pointer;
`;
const Logo = styled.img`
  background: rgb(223, 214, 210);
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 50%;
  align-self: flex-start;
`;
const UpBtnStyle = styled.button`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(223, 214, 210);
  border-radius: 50%;
  border: 1px solid rgba(223, 214, 210);
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;
const SideBar = styled.div`
  box-sizing: border-box;
  width: 300px;
  height: ${(props) => props.height};
  display: none;
  position: fixed;
  right: -300px;
  transition: right 0.3s ease-in-out;
  flex-direction: column;
  padding: 25px;
  border-radius: 10px;
  background: rgb(223, 214, 210);
  z-index: 11;
  &.active {
    right: 0px;
  }
  @media screen and (max-width: 1024px) {
    display: flex;
  }
`;
const SideBarTop = styled.div`
  display: flex;
  justify-content: flex-end;
  .xButton {
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 3px;
    display: flex;
    color: black;
    justify-content: center;
    align-items: center;
    &:active {
      background: rgb(193, 159, 138);
      color: white;
    }
  }
`;
const ProfilePicture = styled.img`
  width: 200px;
  height: 200px;
  margin: 16px 16px 16px 16px;
  background: white;
  border-radius: 10px;
  cursor: pointer;
  align-self: center;
  @media screen and (max-width: 1024px) {
    margin-right: 16px;
  }
`;
export const UpBtn = () => {
  const pageUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <UpBtnStyle onClick={pageUp}>
      <KeyboardArrowUpRoundedIcon />
    </UpBtnStyle>
  );
};

export const LogoHomeBtn = () => {
  const [iconUrls, setIconUrls] = useState([]);

  useEffect(() => {
    // 파이어베이스를 이용한 홈페이지 아이콘 렌더링
    const storageIconRef = ref(storage, "Icons");

    Promise.all([getDownloadURL(ref(storageIconRef, "logo.jpg"))])
      .then((urls) => {
        setIconUrls(urls);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <LogoButton>
      <Link to="/">
        <Logo src={iconUrls[0]} alt="로고" width="150px" height="150px" />
      </Link>
    </LogoButton>
  );
};
export const Sidebar = () => {
  const { userNum, isLogin, isSidebar, setIsSidebar } = useContext(UserContext);
  const [sideBarInfo, setSideBarInfo] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getSidebarInfo = async (num) => {
      if (isSidebar && isLogin) {
        const memInfo = await AxiosApi.userNumber(num);
        setSideBarInfo(memInfo);
        console.log(memInfo);
      } else {
        setSideBarInfo([]);
      }
    };
    getSidebarInfo(userNum);

    console.log(sideBarInfo);
  }, [isSidebar, isLogin]);
  return (
    <SideBar className={isSidebar ? "active" : ""}>
      <SideBarTop>
        <button className="xButton" onClick={() => setIsSidebar(false)}>
          <CloseRoundedIcon />
        </button>
      </SideBarTop>
      {isLogin ? (
        <ProfilePicture
          src={logo}
          alt="프로필"
          onClick={() => navigate("/SBTIMain")}
        />
      ) : (
        <ProfilePicture src={logo} />
      )}
    </SideBar>
  );
};
