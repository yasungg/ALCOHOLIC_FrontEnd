import React, { useRef, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import Modal from "../utils/Modal";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogoHomeBtn } from "../component/ReusableComponents";
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-evenly;
  padding-top: 50px;
  width: 100%;
  height: 100%;
  .sign {
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 35px;
    font-weight: bold;
    letter-spacing: 0px;
    color: rgb(193, 159, 138);
    margin-top: 40px;
    opacity: 1;
  }
  .hr {
    border: 1px solid rgb(223, 214, 210);
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
  .idcheck {
    border-style: none;
    background-color: white;
    margin-left: 220px;
    font-size: 0.75rem;
  }
  .idcheck:hover {
    cursor: pointer;
  }
  .label {
    font-weight: bold;
    display: flex;
  }
  .hint {
    display: flex;
    justify-content: center;
    align-items: center;
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
    border: 1px solid rgb(223, 214, 210);
    &:focus {
      outline: 1px solid rgb(193, 159, 138);
    }
  }
`;

const SignUp = () => {
  const navigate = useNavigate();

  // 키보드 입력
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [inputConPw, setInputConPw] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputJumin, setInputJumin] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPhone, setInputPhone] = useState("");

  // 오류 메시지
  const [idMessage, setIdMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [conPwMessage, setConPwMessage] = useState("");

  // 유효성 검사
  const [isId, setIsId] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [isConPw, setIsConPw] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isJumin, setIsJumin] = useState(false);
  const [isMail, setIsMail] = useState(false);
  const [isPhone, setIsPhone] = useState(false);

  // 약관 스크롤 다 내려야 체크박스 선택 가능
  const [ischeckBox, checkboxEnable] = useState(false);
  const textareaRef = useRef(null);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const onChangeId = (e) => {
    setInputId(e.target.value);
  };
  // 아이디 중복확인
  const onClickIdCheck = async () => {
    const response = await AxiosApi.IdCheck(inputId);
    if (response.data === true) {
      setIdMessage("사용하실 수 있는 아이디입니다.");
      setIsId(true);
    } else {
      setIdMessage("중복된 아이디입니다.");
      setIsId(false);
    }
  };
  const onChangePw = (e) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`|}{[\]\\:';"<>?,./])[A-Za-z\d!@#$%^&*()_+~`|}{[\]\\:';"<>?,./]{8,}$/;
    const passwordCurrent = e.target.value;
    setInputPw(passwordCurrent);
    if (!passwordRegex.test(passwordCurrent)) {
      setPwMessage("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!");
      setIsPw(false);
    } else {
      setPwMessage("안전한 비밀번호입니다");
      setIsPw(true);
    }
  };
  const onChangeConPw = (e) => {
    const passwordCurrent = e.target.value;
    setInputConPw(passwordCurrent);
    if (passwordCurrent !== inputPw) {
      setConPwMessage("비밀번호가 일치하지 않습니다");
      setIsConPw(false);
    } else {
      setConPwMessage("비밀번호가 일치 합니다");
      setIsConPw(true);
    }
  };
  const onChangeName = (e) => {
    setInputName(e.target.value);
    setIsName(true);
  };
  const onChangeJumin = (e) => {
    setInputJumin(e.target.value);
    setIsJumin(true);
  };
  const onChangeMail = (e) => {
    setInputEmail(e.target.value);
    setIsMail(true);
  };
  const onChangePhone = (e) => {
    setInputPhone(e.target.value);
    setIsPhone(true);
  };
  const onClickSignUp = async () => {
    // 로그인을 위해 axios 호출
    const response = await AxiosApi.MemberSign(
      inputId,
      inputPw,
      inputName,
      inputJumin,
      inputEmail,
      inputPhone
    );
    console.log(response.data);
    if (response.data === true) {
      console.log("회원가입 성공");
      setModalOpen(true);
      setModalText("회원가입 성공");
    } else {
      console.log("회원가입 에러");
      setModalOpen(true);
      setModalText("회원가입 에러");
    }
  };
  const termsChange = (e) => {
    const textarea = textareaRef.current;
    if (
      textarea.scrollTop - (textarea.scrollHeight - textarea.offsetHeight) >
        0 &&
      textarea.scrollTop > 0
    ) {
      checkboxEnable(true);
      console.log(
        textarea.scrollTop,
        textarea.scrollHeight - textarea.offsetHeight
      );
    } else {
      checkboxEnable(false);
      console.log(
        textarea.scrollTop,
        textarea.scrollHeight - textarea.offsetHeight
      );
    }
  };

  useEffect(() => {
    // 스크롤 위치가 변경될 때마다 handleScroll 함수가 호출되도록 합니다.
    const textarea = textareaRef.current;
    textarea.addEventListener("scroll", termsChange);
    return () => {
      textarea.removeEventListener("scroll", termsChange);
    };
  }, []);

  // 팝업처리(모달)
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("회원가입이 완료되었습니다.");

  const confirmBtn = () => {
    setModalOpen(false);
    console.log("확인 버튼이 눌려 졌습니다.");
    navigate("/login");
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Container>
      <LogoHomeBtn />
      <div className="sign">
        <span>회원 가입</span>
      </div>
      <hr className="hr" />
      <div className="item">
        <label className="label" for="id">
          아이디
        </label>
        <input
          className="input"
          placeholder="아이디를 입력해주세요"
          value={inputId}
          onChange={onChangeId}
        />
        <button className="idcheck" onClick={onClickIdCheck}>
          아이디 중복체크
        </button>
        <span>{idMessage}</span>
      </div>
      <div className="item">
        <label className="label" for="password">
          비밀번호
        </label>
        <input
          className="input"
          type="password"
          placeholder="숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요"
          value={inputPw}
          onChange={onChangePw}
        />
      </div>
      <div className="hint">
        {inputPw.length > 0 && (
          <span className={`message ${isPw ? "success" : "error"}`}>
            {pwMessage}
          </span>
        )}
      </div>
      <div className="item">
        <label className="label" for="passwordcheck">
          비밀번호 확인
        </label>
        <input
          className="input"
          type="password"
          placeholder="비밀번호를 한번 더 입력해 주세요"
          value={inputConPw}
          onChange={onChangeConPw}
        />
      </div>
      <div className="hint">
        {inputPw.length > 0 && (
          <span className={`message ${isConPw ? "success" : "error"}`}>
            {conPwMessage}
          </span>
        )}
      </div>
      <div className="item">
        <label className="label" for="name">
          이름
        </label>
        <input
          className="input"
          type="text"
          placeholder="이름을 입력해주세요"
          value={inputName}
          onChange={onChangeName}
        />
      </div>
      <div className="item">
        <label className="label" for="jumin">
          생년월일
        </label>
        <input
          className="input"
          type="text"
          placeholder="ex)19980905,20010420"
          value={inputJumin}
          onChange={onChangeJumin}
        />
      </div>
      <div className="item">
        <label className="label" for="email">
          이메일
        </label>
        <input
          className="input"
          type="email"
          placeholder="ex)asd1234@naver.com"
          value={inputEmail}
          onChange={onChangeMail}
        />
      </div>
      <div className="item">
        <label className="label" for="phone">
          핸드폰 번호
        </label>
        <input
          className="input"
          type="text"
          placeholder="ex)010-1111-2222"
          value={inputPhone}
          onChange={onChangePhone}
        />
      </div>
      <hr className="hr" />
      <div className="item">
        <textarea
          ref={textareaRef}
          name="terms"
          className="terms"
          cols="100"
          rows="10"
          readOnly
        >
          [회원가입 이용약관] 1. 이 약관은 서비스 이용자(이하 “회원”)과
          [회사명](이하 “회사”)와의 권리 및 의무사항 등 기본적인 사항을 규정함을
          목적으로 합니다. 2. 회사는 회원에 대한 이용계약의 성립 여부를 확인하기
          위하여 회원의 개인정보를 수집할 수 있습니다. 이 경우 회사는 관련
          법령을 준수하며, 개인정보보호정책에 따라 회원의 정보를 보호합니다. 3.
          회원은 본 서비스를 이용함으로써 전자적으로 회원을 식별하고, 회원과
          회사 간에 커뮤니케이션을 위한 수단으로서 전자우편 주소 등을 사용할 수
          있습니다. 4. 회사는 회원이 제공한 정보를 바탕으로 회원의 개인정보를
          보호합니다. 회원의 정보는 회사의 개인정보보호정책에 따라 안전하게
          관리됩니다. 5. 회사는 회원의 정보를 제3자에게 제공하거나 공유하지
          않습니다. 다만, 아래의 경우에는 예외적으로 개인정보를 제공할 수
          있습니다. - 법적인 요청이 있을 경우 - 서비스 제공에 필요한 경우 6.
          회사는 회원의 권리 보호를 위해 노력합니다. 회원은 개인정보보호관련
          법령을 준수해야 하며, 회원의 개인정보를 적극적으로 관리할 책임이
          있습니다. 7. 회사는 회원에게 서비스 이용과 관련된 공지사항을 전자적
          수단으로 제공할 수 있습니다. 회원은 이에 동의한 것으로 간주됩니다. 8.
          회원이 이 약관에 동의함으로써 회사와의 이용계약이 성립됩니다. 회원은
          이 약관에 따라 회사가 제공하는 서비스를 이용할 수 있습니다.
        </textarea>
        <label className="termcheckbox">
          이용약관 확인 및 동의
          <input className="checkbox" type="checkbox" disabled={!ischeckBox} />
        </label>
      </div>
      <br />
      <div className="item">
        {isId && isPw && isConPw && isName && isJumin && isMail && isPhone ? (
          <button className="enable-button" onClick={onClickSignUp}>
            가입하기
          </button>
        ) : (
          <button className="disable-button">가입하기</button>
        )}
        <Modal
          open={modalOpen}
          type={true}
          confirm={confirmBtn}
          close={closeModal}
          header="회원가입"
        >
          {modalText}
        </Modal>
      </div>
    </Container>
  );
};
export default SignUp;
