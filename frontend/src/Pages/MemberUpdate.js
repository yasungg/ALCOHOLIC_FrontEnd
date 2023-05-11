import React, { useState }from "react";
import styled from "styled-components";
import HeaderDesign from "../HeaderDesign";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;

  .sign {
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 35px;
    font-weight: bold;
    letter-spacing: 0px;
    opacity: 1;
    margin-top: 100px;
}
.hr {
  border: solid 1px #090808;
  width: 50%;
  margin-top: 10px;
  margin-bottom: 10px;
}
.item {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.label {
    font-weight: bold;
    display: flex;
}
.hint {
  display: flex;
  justify-content: center;
  align-items:center;
}
.term {
  border-style: none;
  background-color: white;
}
.term:hover {
  cursor: pointer;
}
.enable-button {
  width: 250px;
  height: 50px;
  background-color: #c19f8a;
  border-style: none;
  border-radius: 3px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin-bottom: 100px;
}
.enable-button:hover {
    cursor: pointer;
}
.disable-button {
  width: 250px;
  height: 50px;
  background-color: gray;
  border-style: none;
  border-radius: 3px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin-bottom: 100px;
}
.input {
  width: 300px;
  height: 30px;
  border-radius: 5px;
  line-height: normal;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid;
}
`;

const MemberUpdate = () => {
    // 키보드 입력
    const [inputPw, setInputPw] = useState("");
    const [inputConPw, setInputConPw] = useState("");
    const [inputName, setInputName] = useState("");
    const [inputJumin, setInputJumin] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPhone, setInputPhone] = useState("")

    // 오류 메시지
    // const [idMessage, setIdMessage] = useState("");
    const [pwMessage, setPwMessage] = useState("");
    const [conPwMessage, setConPwMessage] = useState("");
    
    // 유효성 검사
    const [isPw, setIsPw] = useState(false)
    const [isConPw, setIsConPw] = useState(false);
    const [isName, setIsName] = useState(false);
    const [isJumin, setIsJumin] = useState(false);
    const [isMail, setIsMail] = useState(false);
    const [isPhone, setIsPhone] = useState(false);


    const onChangePw = (e) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`|}{[\]\\:';"<>?,./])[A-Za-z\d!@#$%^&*()_+~`|}{[\]\\:';"<>?,./]{8,}$/
        const passwordCurrent = e.target.value ;
        setInputPw(passwordCurrent);
        if (!passwordRegex.test(passwordCurrent)) {
            setPwMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!')
            setIsPw(false)
        } else {
            setPwMessage('안전한 비밀번호입니다')
            setIsPw(true);
        }        
    }
    const onChangeConPw = (e) => {
        const passwordCurrent = e.target.value ;
        setInputConPw(passwordCurrent)
        if (passwordCurrent !== inputPw) {
            setConPwMessage('비밀번호가 일치하지 않습니다')
            setIsConPw(false)
        } else {
            setConPwMessage('비밀번호가 일치 합니다')
            setIsConPw(true);
        }      
    }
    const onChangeName = (e) => {
        setInputName(e.target.value);
        setIsName(true);
    }
    const onChangeJumin = (e) => {
        setInputJumin(e.target.value);
        setIsJumin(true);
    }
    const onChangeMail = (e) => {
        setInputEmail(e.target.value);
        setIsMail(true);
    }
    const onChangePhone = (e) => {
        setInputPhone(e.target.value);
        setIsPhone(true);
    }

    return (
        <Container>
            <HeaderDesign/>
          <div className="sign">
            <span>회원 정보 수정</span>
          </div>
          <hr className="hr"/>
        <div className="item">
            <label className="label" for = "password">비밀번호</label>
            <input className="input" type="password" placeholder="숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요" value ={inputPw} onChange={onChangePw}/>
        </div>
        <div className="hint">
                {inputPw.length > 0 && (
                <span className={`message ${isPw ? 'success' : 'error'}`}>{pwMessage}</span>)}
        </div>
        <div className="item">
            <label className="label" for = "passwordcheck">비밀번호 확인</label>
            <input className="input" type="password" placeholder="비밀번호를 한번 더 입력해 주세요" value ={inputConPw} onChange={onChangeConPw}/>
        </div>
        <div className="hint">
                {inputPw.length > 0 && (
                <span className={`message ${isConPw ? 'success' : 'error'}`}>{conPwMessage}</span>)}
        </div>
        <div className="item">
            <label className="label" for = "name">이름</label>
            <input className="input" type="text" placeholder="이름을 입력해주세요" value ={inputName} onChange={onChangeName}/>
        </div>
        <div className="item">
            <label className="label" for = "jumin">생년월일</label>
            <input className="input" type="text" placeholder="ex)19980905,20010420" value ={inputJumin} onChange={onChangeJumin}/>
        </div>
        <div className="item">
            <label className="label" for = "email">이메일</label>
            <input className="input" type="email" placeholder="ex)asd1234@naver.com" value ={inputEmail} onChange={onChangeMail}/>
        </div>
        <div className="item">
            <label className="label" for = "phone">핸드폰 번호</label>
            <input className="input" type="text" placeholder="ex)010-1111-2222" value ={inputPhone} onChange={onChangePhone}/>
        </div>
        <hr className="hr"/>
        <div className="item">
            {(isPw && isConPw && isName && isJumin && isMail && isPhone) ? 
            <button className="enable-button" >회원정보수정</button> :
            <button className="disable-button">회원정보수정</button>}
        </div>
        </Container>
    );
};
export default MemberUpdate;