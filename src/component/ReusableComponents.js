import logo from "../Image/logo.jpg";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { React, useState, useEffect, useContext } from "react";
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
  height: 100%;
  display: none;
  position: fixed;
  right: -300px;
  transition: right 0.3s ease-in-out;
  flex-direction: column;
  padding: 25px;
  border-radius: 10px;
  background: rgb(223, 214, 210, 0.9);
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
const SideBarTopDiv = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
`;
const SideBarUserDiv = styled.div`
  width: 250px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const SideBarUserBtn = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: none;
  border-radius: ${(props) => props.radius};
  cursor: pointer;
  &:hover {
    background: rgb(193, 159, 138);
    color: white;
    transition: all 0.5s;
  }
`;
const SideBarBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
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
  const { userNum, isLogin, isSidebar, setIsSidebar, contextLogout } =
    useContext(UserContext);
  const [sideBarInfo, setSideBarInfo] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getSidebarInfo = async (num) => {
      if (isSidebar && isLogin) {
        const memInfo = await AxiosApi.userNumber(num);
        setSideBarInfo(memInfo.data);
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
        <>
          {sideBarInfo.map((e) => (
            <div key={e.user_no}>
              <SideBarTopDiv>
                <ProfilePicture
                  src={e.user_profile}
                  alt="프로필"
                  onClick={() => navigate("/SBTIMain")}
                />
                <SideBarUserDiv>
                  <SideBarUserBtn
                    width="80px"
                    height="20px"
                    radius="3px"
                    onClick={() => navigate("/MyPage")}
                  >
                    마이페이지
                  </SideBarUserBtn>
                  <SideBarUserBtn
                    width="80px"
                    height="20px"
                    radius="3px"
                    onClick={contextLogout}
                  >
                    로그아웃
                  </SideBarUserBtn>
                </SideBarUserDiv>
              </SideBarTopDiv>
              <SideBarBody>
                <SideBarUserBtn
                  width="100%"
                  height="40px"
                  radius="5px"
                  onClick={() => navigate("/SBTIMain")}
                >
                  SBTI
                </SideBarUserBtn>
                <SideBarUserBtn
                  width="100%"
                  height="40px"
                  radius="5px"
                  onClick={() => navigate("/drinkofmonth")}
                >
                  이달의 술
                </SideBarUserBtn>
                <SideBarUserBtn
                  width="100%"
                  height="40px"
                  radius="5px"
                  onClick={() => navigate("/RecmdPage")}
                >
                  술 추천
                </SideBarUserBtn>
                <SideBarUserBtn
                  width="100%"
                  height="40px"
                  radius="5px"
                  onClick={() => navigate("/Event")}
                >
                  이벤트
                </SideBarUserBtn>
              </SideBarBody>
            </div>
          ))}
        </>
      ) : (
        <>
          <SideBarTopDiv>
            <ProfilePicture
              src={logo}
              alt="프로필"
              onClick={() => navigate("/SBTIMain")}
            />
            <SideBarUserDiv>
              <SideBarUserBtn
                width="100%"
                height="40px"
                radius="5px"
                onClick={() => navigate("/Login")}
              >
                로그인
              </SideBarUserBtn>
            </SideBarUserDiv>
          </SideBarTopDiv>
          <SideBarBody>
            <SideBarUserBtn
              width="100%"
              height="40px"
              radius="5px"
              onClick={() => navigate("/SBTIMain")}
            >
              SBTI
            </SideBarUserBtn>
            <SideBarUserBtn
              width="100%"
              height="40px"
              radius="5px"
              onClick={() => navigate("/drinkofmonth")}
            >
              이달의 술
            </SideBarUserBtn>
            <SideBarUserBtn
              width="100%"
              height="40px"
              radius="5px"
              onClick={() => navigate("/RecmdPage")}
            >
              술 추천
            </SideBarUserBtn>
            <SideBarUserBtn
              width="100%"
              height="40px"
              radius="5px"
              onClick={() => navigate("/Event")}
            >
              이벤트
            </SideBarUserBtn>
          </SideBarBody>
        </>
      )}
    </SideBar>
  );
};
