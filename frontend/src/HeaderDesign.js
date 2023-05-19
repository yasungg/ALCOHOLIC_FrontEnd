import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import firebase from "firebase/compat/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./api/Context";

const Header = styled.div`
  box-sizing: border-box;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
  width: 100%;
  height: 180px;
  display: flex;
  flex-flow: column;
  @media screen and (max-width: 768px) {
    .searchBox {
      display: none;
    }
    .userMenu {
      display: none;
    }
    .HamburgerBtn {
      display: block;
    }
  }
`;
const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  height: 73%;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.5px solid rgb(223, 214, 210);
`;
const HeaderNavi = styled.div`
  display: flex;
  width: 100%;
  height: 27%;
  justify-content: center;
  border-bottom: 0.5px solid rgb(223, 214, 210);
`;
const NaviButtons = styled.button`
  width: 130px;
  height: 100%;
  background: white;
  margin-right: 20px;
  border: none;
  border-radius: 5px;
  box-shadow: none;
  color: #495057;
  cursor: pointer;
  &:hover {
    color: rgb(223, 214, 210);
    transition: all 0.5s;
  }
  &:visited {
    text-decoration: none;
  }
`;
const LogoButton = styled.button`
  background: white;
  border: none;
  cursor: pointer;
  margin: 8px 0 5px 20px;
`;
const Logo = styled.img`
  background: rgb(223, 214, 210);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  align-self: flex-start;
`;
const SearchBox = styled.div`
  width: 400px;
  height: 40px;
  background: white;
  display: flex;
  border: 2px solid rgba(223, 214, 210);
  border-radius: 10px;
  #search {
    width: 350px;
    height: 30px;
    border: none;
    margin-left: 5px;
    align-self: center;
    caret-color: gray;
    &:focus {
      outline: none;
    }
  }
  .searchBtn {
    display: flex;
    width: 30px;
    height: 30px;
    margin: auto;
    background: white;
    border: none;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:active {
      border: none;
    }
    .searchBtnIcon {
      width: 20px;
      height: 20px;
      color: rgba(223, 214, 210);
    }
  }
`;
const UserMenu = styled.div`
  width: 120px;
  height: 20px;
  align-self: flex-start;
  margin-right: 50px;
`;
const UserButtons = styled.button`
  width: 60px;
  height: 20px;
  font-size: 0.5rem;
  background: white;
  color: #495057;
  border: none;
  border-radius: 5px;
  box-shadow: none;
  cursor: pointer;

  &:hover {
    color: rgb(223, 214, 210);
    transition: all 0.5s;
  }
  &:visited {
    text-decoration: none;
  }
`;
const HamburgerBtn = styled.button`
  width: 3rem;
  height: 3rem;
  padding: 0;
  display: none;
  background: rgb(223, 214, 210);
  img {
    width: 2rem;
    height: 2rem;
    background-color: white;
  }
`;

const HeaderDesign = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storage = getStorage(firebase.app());
    const storageIconRef = ref(storage, "Icons");

    Promise.all([
      getDownloadURL(ref(storageIconRef, "logo.jpg")),
      getDownloadURL(ref(storageIconRef, "SearchIcon.png")),
      getDownloadURL(ref(storageIconRef, "HamburgerBtn.png")),
    ])
      .then((urls) => {
        setImageUrls(urls);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Header>
      <HeaderContainer>
        <LogoButton>
          <Link to="/">
            <Logo src={imageUrls[0]} alt="로고"></Logo>
          </Link>
        </LogoButton>
        <SearchBox className="searchBox">
          <input type="text" name="search" id="search" />
          <button className="searchBtn" type="submit">
            <img src={imageUrls[1]} className="searchBtnIcon" alt="돋" />
          </button>
        </SearchBox>
        <UserMenu className="userMenu">
          <UserButtons className="signUp" onClick={() => navigate("/SignUp")}>
            <span>회원가입</span>
          </UserButtons>
          <UserButtons onClick={() => navigate("/Login")}>
            <span>로그인</span>
          </UserButtons>
        </UserMenu>
        <HamburgerBtn className="HamburgerBtn">
          <img src={imageUrls[2]} alt="" />
        </HamburgerBtn>
      </HeaderContainer>
      <HeaderNavi>
        <Link to="/">
          <NaviButtons>
            <span>홈</span>
          </NaviButtons>
        </Link>
        <NaviButtons>
          <span onClick={() => navigate("/SBTIMain")}>이달의 술</span>
        </NaviButtons>
        <NaviButtons onClick={() => navigate("/RecmdPage")}>
          <span>술 추천</span>
        </NaviButtons>
        <NaviButtons onClick={() => navigate("/Event")}>
          <span>이벤트</span>
        </NaviButtons>
      </HeaderNavi>
    </Header>
  );
};

export default HeaderDesign;
