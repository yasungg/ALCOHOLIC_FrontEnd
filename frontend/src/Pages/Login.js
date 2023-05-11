import React, { useState }from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import HeaderDesign from "../HeaderDesign";
import AxiosApi from "../api/AxiosApi";
import { KAKAO_AUTH_URL } from "../component/OAuth";
import KaKaoLogin from "../component/KaKaoLogin";

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
        font-weight: bold;
        margin-bottom: 20px;
        margin-top: 50px;
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
        border: 1px solid black;
        border-radius: 3px;
      }
      .signbutton:hover {
        cursor: pointer;
      }
    `;
    const Input = styled.input`
      border: 1px solid black;
      color: gray;
      width: 400px;
      height: 50px;
      text-align: center;
      margin-top: 10px;
      margin-bottom: 10px;
      border-radius: 3px;
    `;
    const Find = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 8vw;
      .findbutton {
        border-style: none;
        background-color: white;
        margin-left: 300px;
        font-weight: bold;
      }
      .findbutton:hover {
        cursor: pointer;
        transition: all .5s;
        color: rgba(223, 214, 210);
      }
    `;
    const KaKaoButton =styled.button`
    `;

    const Login = () => {
    // 키보드 입력 받기
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");

    // 유효성 검사
    const [isId, setIsId] = useState(false);
    const [isPw, setIsPw] = useState(false);

    const onChangeId = e => {
        setInputId(e.target.value);
        setIsId(true);
    }
    const onChangePw = (e) => {
        setInputPw(e.target.value);
        setIsPw(true);
    }
    const onClickLogin = async() => {
        // 로그인을 위해 axios 호출
        const response = await AxiosApi.memberLogin(inputId, inputPw);
        console.log(response.data);
        if(response.data === true) {
           console.log("로그인 성공");
        } else {
            console.log("로그인 에러");
        }
  }


  
    


    return (
        <Container>
            <HeaderDesign/>
          <div className="Login">
            <span>로그인</span>
          </div>
          <div className="item">
            <Input type="text" placeholder="아이디를 입력해주세요" value={inputId} onChange={onChangeId}/>
            <Input type="password" placeholder="비밀번호를 입력해주세요" value={inputPw} onChange={onChangePw}/>
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
          {(isId && isPw) ?
                <button className="login-enable-button" onClick={onClickLogin}>로그인</button>  :
                <button className="login-disable-button" >로그인</button>}
          </div>
          <div className="item2">
            <Link to = "/SignUp">
            <button className="signbutton">회원가입</button>
            </Link>
            <KaKaoLogin/>
          </div>
          
        </Container>
      );
    };
    export default Login;