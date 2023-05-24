import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import { KAKAO_AUTH_URL } from "../component/OAuth";
import KaKaoLogin from "../component/KaKaoLogin";
import KakaoIcon from "../Image/KakaoIcon.png";
import { UserContext } from "../api/Context";
import { LogoHomeBtn } from "../component/ReusableComponents";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  height: 100%;
  .Login {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 40px;
    color: #c19f8a;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: bold;
  }
  .item2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .login-enable-button {
    width: 400px;
    height: 60px;
    background-color: #c19f8a;
    border-style: none;
    font-weight: bold;
    color: white;
    border-radius: 3px;
  }
  .login-enable-button:hover {
    cursor: pointer;
  }
  .login-disable-button {
    width: 400px;
    height: 60px;
    background-color: #c19f8a;
    border-style: none;
    font-weight: bold;
    color: white;
    border-radius: 3px;
  }
  .login-disable-button:hover {
    cursor: pointer;
  }
  .signbutton {
    width: 400px;
    height: 60px;
    color: #c19f8a;
    font-weight: bold;
    background-color: white;
    border: 1px solid rgb(223, 214, 210);
    border-radius: 3px;
  }
  .signbutton:hover {
    cursor: pointer;
  }
`;
const Input = styled.input`
  border: 1px solid rgb(223, 214, 210);
  color: gray;
  width: 400px;
  height: 50px;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 3px;
  &:focus {
    outline: 1px solid rgb(193, 159, 138);
  }
`;
const Find = styled.div`
  width: 400px;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: center;
  justify-content: center;
  height: 8vw;
  &:nth-child(1) {
    border-right: 1px solid rgb(223, 214, 210);
  }
  .findbutton {
    border-style: none;
    background-color: white;
    font-weight: bold;
  }
  .findbutton:hover {
    cursor: pointer;
    transition: all 0.5s;
    color: rgba(223, 214, 210);
  }
`;
const TopContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
`;
const Login = () => {
  //네비게이터
  const navigate = useNavigate();
  // 키보드 입력 받기
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  // 유효성 검사
  const [isId, setIsId] = useState(false);
  const [isPw, setIsPw] = useState(false);

  //로그인 정보 저장을 위한 Context API
  const { contextLogin, setUserNum } = useContext(UserContext);

  const onChangeId = (e) => {
    setInputId(e.target.value);
    setIsId(true);
  };
  const onChangePw = (e) => {
    setInputPw(e.target.value);
    setIsPw(true);
  };
  const onClickLogin = async () => {
    // 로그인을 위해 axios 호출
    try {
      const response1 = await AxiosApi.memberLogin(inputId, inputPw);
      const response2 = await AxiosApi.memberGet(inputId);
      const rst = response2.data;
      if (response1.data === true) {
        contextLogin();
        setUserNum(rst[0].user_no);
        navigate("/");
      }
    } catch (error) {
      console.error("로그인 에러", error);
    }
  };

  return (
    <Container>
      <TopContainer>
        <LogoHomeBtn />
      </TopContainer>
      <div className="Login">
        <span>로그인</span>
      </div>
      <div className="item">
        <Input
          type="text"
          placeholder="아이디를 입력해주세요"
          value={inputId}
          onChange={onChangeId}
        />
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={inputPw}
          onChange={onChangePw}
        />
      </div>

      <Find>
        <Link to="/FindId">
          <button className="findbutton">아이디 찾기</button>
        </Link>
        <Link to="/FindPw">
          <button className="findbutton">비밀번호 찾기</button>
        </Link>
      </Find>
      <div className="item2">
        {isId && isPw ? (
          <button
            className="login-enable-button"
            onClick={() => onClickLogin()}
          >
            로그인
          </button>
        ) : (
          <button className="login-disable-button">로그인</button>
        )}
      </div>
      <div className="item2">
        <Link to="/SignUp">
          <button className="signbutton">회원가입</button>
        </Link>
        <KaKaoLogin />
      </div>
    </Container>
  );
};
export default Login;
