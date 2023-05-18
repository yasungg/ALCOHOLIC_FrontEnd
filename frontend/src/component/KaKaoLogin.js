import styled from "styled-components";
import { KAKAO_AUTH_URL } from "./OAuth";
import KakaoIcon from "../Image/KakaoIcon.png";

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  padding: 5px;
  margin-top: 15px;
  border: none;
  background: white;
  img {
    width: 45px;
    height: 45px;
  }
  &:hover {
    cursor: pointer;
  }
`;
const KaKaoLogin = () => {
  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div>
      <Button onClick={kakaoLogin}>
        <img src={KakaoIcon} alt="" />
      </Button>
    </div>
  );
};

export default KaKaoLogin;
