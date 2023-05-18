import upArrow from "../Image/angle-up.png";
import logo from "../Image/logo.jpg";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const UpBtn = () => {
  const UpBtn = styled.button`
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
  const pageUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <UpBtn onClick={pageUp}>
      <img src={upArrow} alt="위로가기" />
    </UpBtn>
  );
};

export const LogoHomeBtn = () => {
  const LogoButton = styled.button`
    background: white;
    border: none;
    cursor: pointer;
  `;
  const Logo = styled.img`
    background: rgb(223, 214, 210);
    width: 100px;
    height: 100px;
    border-radius: 50%;
    align-self: flex-start;
  `;

  return (
    <LogoButton>
      <Link to="/">
        <Logo src={logo} alt="로고"></Logo>
      </Link>
    </LogoButton>
  );
};
