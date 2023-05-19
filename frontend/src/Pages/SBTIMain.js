import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import Hmm from "../Image/hmm.png";
import X from "../Image/x.png";

const OutBox = styled.div`
  padding-bottom: 100px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: beige;
`;

const Underline = styled.div`
  width: 480px;
  height: 10px;
  border-bottom: 1px solid black;
`;

const Container = styled.div`
  width: 480px;
  height: 600px;
  border: 1px solid black;
  background-color: white;
  margin-top: 5%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding-bottom: 50px;

  .imo {
    width: 16em;
    /* border-radius: 50%; */
  }

  .close {
    width: 15px;
    margin-left: auto;
    margin-right: 10px;
    margin-top: 10px;
    cursor: pointer;
  }

  .content1 {
    margin-top: -13px;
    text-align: center;
    margin-bottom: 0px;
  }

  .box {
    box-sizing: border-box;
    appearance: none;
    background-color: transparent;
    border: 2px solid black;
    border-radius: 0.6em;
    color: black;
    cursor: pointer;
    display: flex;
    align-self: center;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    margin: 20px;
    padding: 1.2em 2.8em;
    text-decoration: none;
    text-align: center;
    text-transform: uppercase;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;

    &:hover,
    &:focus {
      color: brown;
      outline: 0;
    }

    border-color: brown;
    // border: 0;
    border-radius: 0;
    color: brown;
    position: relative;
    overflow: hidden;
    z-index: 1;
    transition: color 150ms ease-in-out;

    &:after {
      content: "";
      position: absolute;
      display: block;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 100%;
      background: brown;
      z-index: -1;
      transition: width 150ms ease-in-out;
    }

    &:hover {
      color: #fff;
      &:after {
        width: 110%;
      }
    }
  }
`;

const SBTIMain = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState([]);

  // localStorage를 이용하여 SBTI 문항에 대한 답변 기록 저장
  localStorage.setItem("takju", 0);
  localStorage.setItem("chungju", 0);
  localStorage.setItem("wine", 0);
  localStorage.setItem("spirits", 0);

  const onClickSBTI = async () => {
    navigate("/SBTIStartQuestion1");
  };

  useEffect(() => {
    const userInfo = async () => {
      const rsp = await AxiosApi.userNumber("10000001");
      if (rsp.status === 200) setUserInfo(rsp.data);
    };
    userInfo();
  }, []);

  return (
    <OutBox>
      <Container>
        <img
          className="close"
          src={X}
          alt="x"
          onClick={() => {
            navigate("/");
          }}
        />
        <div className="top">
          <p className="content1">술BTI 검사</p>
        </div>
        <Underline />
        <div style={{ marginBottom: "20px" }}>
          <p>1분만에 분석해드려요!</p>
        </div>
        <div>
          <img className="imo" src={Hmm} alt="이모티콘" />
        </div>
        <div style={{ marginTop: "60px" }}>
          {userInfo.map((user) => (
            <div key={user.user_no}>
              <p>
                {user.user_name}님의 기존 SBTI 결과: {user.user_sbti}
              </p>
            </div>
          ))}
        </div>
        <div>
          <button className="box" onClick={onClickSBTI}>
            SBTI 시작하기
          </button>
        </div>
      </Container>
    </OutBox>
  );
};
export default SBTIMain;
