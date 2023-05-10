import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import searchIcon from "./Image/메뉴버튼용 돋보기.png";
import logo from "./Image/logo.jpg";
import { Link } from "react-router-dom";
const HeaderDesign = () => {
  const Header = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 180px;
    display: flex;
    flex-flow: column;
    @media screen and (max-width: 1024px) {
      .searchBox {
        display: none;
      }
      .userMenu {
        display: none;
      }
    }
  `;
  const HeaderContainer = styled.div`
    display: flex;
    width: 100%;
    height: 73%;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(223, 214, 210);
  `;
  const HeaderNavi = styled.div`
    display: flex;
    width: 100%;
    height: 27%;
    justify-content: center;
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
    /* &:active {
      border: none;
    } */
  `;
  const Logo = styled.img`
    background: rgba(223, 214, 210);
    width: 100px;
    height: 100px;
    border-radius: 50%;
    align-self: flex-start;
    /* margin: auto 20px; */
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
  return (
    <Header>
      <HeaderContainer>
        <LogoButton>
          <Link to="/">
            <Logo src={logo} alt="로고"></Logo>
          </Link>
        </LogoButton>
        <SearchBox className="searchBox">
          <input type="text" name="search" id="search" />
          <button className="searchBtn" type="submit">
            <img src={searchIcon} className="searchBtnIcon" alt="돋" />
          </button>
        </SearchBox>
        <UserMenu className="userMenu">
          <UserButtons className="signUp">회원가입</UserButtons>
          <UserButtons>로그인</UserButtons>
        </UserMenu>
      </HeaderContainer>
      <HeaderNavi>
        <Link to="/">
          <NaviButtons>홈</NaviButtons>
        </Link>
        <NaviButtons>이달의 술</NaviButtons>
        <NaviButtons>술 추천</NaviButtons>
        <NaviButtons>이벤트</NaviButtons>
      </HeaderNavi>
    </Header>
  );
};

export default HeaderDesign;
