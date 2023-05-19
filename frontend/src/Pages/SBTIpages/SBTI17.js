import React from "react";
import AxiosApi from "../../api/AxiosApi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import X from "../../Image/x.png";

const OutBox = styled.div`
  padding-bottom: 100px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: beige;
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
  text-align: left;

  .close {
    width: 15px;
    margin-left: auto;
    margin-right: 10px;
    margin-top: -90px;
    cursor: pointer;
  }

  .progress {
    p {
      font-size: 1.7em;
      font-weight: bold;
      color: brown;
    }
  }

  .question {
    margin-top: -130px;
    margin-left: 40px;
    margin-right: 40px;
    font-size: 1.5em;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .buttonBox {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
  }

  button {
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
    padding: 1.2em 4em;
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

const SBTI17 = () => {
  const navigate = useNavigate();

  const [questInfo, setQuestInfo] = useState([]);

  // localStorage에 해당 주종 증가 효과
  const increaseInteger = (key) => {
    const value = localStorage.getItem(key);

    if (value) {
      const intValue = parseInt(value);
      const newValue = intValue + 1;
      localStorage.setItem(key, newValue.toString());
      return newValue;
    }

    return null;
  };

  // localStorage에 해당 주종 감소 효과
  const decreaseInteger = (key) => {
    const value = localStorage.getItem(key);

    if (value) {
      const intValue = parseInt(value);
      const newValue = intValue - 1;
      localStorage.setItem(key, newValue.toString());
      return newValue;
    }

    return null;
  };

  // '그렇다' 선택한 경우
  const clickYes = () => {
    questInfo.forEach((item) => {
      if (item.answer1 === "탁주" || item.answer2 === "탁주")
        increaseInteger("takju");
      if (item.answer1 === "청주" || item.answer2 === "청주")
        increaseInteger("chungju");
      if (item.answer1 === "과실주" || item.answer2 === "과실주")
        increaseInteger("wine");
      if (item.answer1 === "증류주" || item.answer2 === "증류주")
        increaseInteger("spirits");
    });
    navigate("/SBTI18");
  };

  // '아니다' 선택한 경우
  const clickNo = () => {
    questInfo.forEach((item) => {
      if (item.answer1 === "탁주" || item.answer2 === "탁주")
        decreaseInteger("takju");
      if (item.answer1 === "청주" || item.answer2 === "청주")
        decreaseInteger("chungju");
      if (item.answer1 === "과실주" || item.answer2 === "과실주")
        decreaseInteger("wine");
      if (item.answer1 === "증류주" || item.answer2 === "증류주")
        decreaseInteger("spirits");
    });
    navigate("/SBTI18");
  };

  useEffect(() => {
    const questInfo = async () => {
      const rsp = await AxiosApi.sbtiQuestion("17");
      if (rsp.status === 200) setQuestInfo(rsp.data);
    };
    questInfo();
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
        <div className="progress">
          <p>17/20</p>
        </div>
        <div className="question">
          {questInfo &&
            questInfo.map((quest) => (
              <div key={quest.number}>
                <p>{quest.question}</p>
              </div>
            ))}
        </div>
        <div className="buttonBox">
          <button onClick={clickYes}>그렇다</button>
          <button onClick={clickNo}>아니다</button>
        </div>
      </Container>
    </OutBox>
  );
};
export default SBTI17;
