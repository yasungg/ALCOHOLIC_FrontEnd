import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import X from "../Image/x.png";
import { UserContext } from "../api/Context";

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
  text-align: center;

  .close {
    width: 15px;
    margin-left: auto;
    margin-right: 10px;
    margin-top: -20px;
    cursor: pointer;
  }

  .usersbti {
    font-size: 1.5em;
  }

  .sbtiresult {
    font-weight: bold;
    font-style: italic;
    color: red;
  }

  .recommend {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }

  .recommend img {
    padding-left: 10px;
    padding-right: 10px;
    width: 80px;
    height: 80px;
    cursor: pointer;
  }
  .sul {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    cursor: pointer;
  }

  /* 하단 버튼 2개 */
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

const SBTIResult = () => {
  const navigate = useNavigate();

//  const [ tmpSbti, setTmpSbti ] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [sbtiInfo, setSbtiInfo] = useState([]);

  const { userNum } = useContext(UserContext); // 로그인 관리를 위한 Context API

  // 설문 결과에 따른 4가지 주종 유형 계산
  const tmpSBTIResult = () => {
    const takju = parseInt(localStorage.getItem("takju"));
    const chungju = parseInt(localStorage.getItem("chungju"));
    const wine = parseInt(localStorage.getItem("wine"));
    const spirits = parseInt(localStorage.getItem("spirits"));
  
    const values = [takju, chungju, wine, spirits];
    const maxValue = Math.max(...values);
  
    // const filteredValues = values.filter((value) => value !== maxValue);
    // const secondMaxValue = Math.max(...filteredValues);
  
    const variableNames = ["takju", "chungju", "wine", "spirits"];
    const maxVariable = variableNames[values.indexOf(maxValue)];
    // const secondMaxVariable = variableNames[filteredValues.indexOf(secondMaxValue)];
  
    return {
      maxVariable,
      // secondMaxVariable,
    };
  };

  const result = tmpSBTIResult();
  console.log(userNum);
  console.log(result);
  
  useEffect(() => {
    const resultFilter = async() => {
      switch (result.maxVariable) {
        case "takju":
        // setTmpSbti("숙취가 두렵지 않은 탁주 러버");
          await AxiosApi.sbtiUpdate(userNum, "숙취가 두렵지 않은 탁주 러버");
          const rsp1 = await AxiosApi.sbtiRecommend("숙취가 두렵지 않은 탁주 러버");
          if (rsp1.status === 200) setSbtiInfo(rsp1.data);
          console.log("탁주 1등");
          console.log(sbtiInfo);
          break;
        case "chungju":
        // setTmpSbti("청아하고 우아한 한잔");
          await AxiosApi.sbtiUpdate(userNum, "청아하고 우아한 한잔");
          const rsp2 = await AxiosApi.sbtiRecommend("청아하고 우아한 한잔");
          if (rsp2.status === 200) setSbtiInfo(rsp2.data);
          console.log("청주 1등");
          console.log(sbtiInfo);
          break;
        case "wine":
        // setTmpSbti("와인 말고 전통주");
          await AxiosApi.sbtiUpdate(userNum, "와인 말고 전통주");
          const rsp3 = await AxiosApi.sbtiRecommend("와인 말고 전통주");
          if (rsp3.status === 200) setSbtiInfo(rsp3.data);
          console.log("과실주 1등");
          console.log(sbtiInfo);
          break;
        case "spirits":
          // setTmpSbti("깔끔하고 묵직하게");
          await AxiosApi.sbtiUpdate(userNum, "깔끔하게 묵직하게");
          const rsp4 = await AxiosApi.sbtiRecommend("깔끔하게 묵직하게");
          if (rsp4.status === 200) setSbtiInfo(rsp4.data);
          console.log("증류주 1등");
          console.log(sbtiInfo);
          break;
        default:
          console.log("스위치문 오류");
          break;
      }
    }
    resultFilter();
  }, [result.maxVariable]);

  useEffect(() => {
    const userInfos = async () => {
      const rsp = await AxiosApi.userNumber(userNum);
      if (rsp.status === 200) setUserInfo(rsp.data);
    };
    userInfos();

    // const sbtiInfos = async () => {
    //   const rsp = await AxiosApi.sbtiRecommend(tmpSbti);
    //   if (rsp.status === 200) setSbtiInfo(rsp.data);
    // };
    // sbtiInfos();
  }, []);

  return (
    <OutBox>
      <Container>
        <img className="close" src={X} alt="x" onClick={() => {navigate("/");}}/>
        <div className="usersbti">
          {userInfo && userInfo.map((user) => (
            <div key={user.user_no}>
              <p>{user.user_name}님의 SBTI 결과</p>
              <p className="sbtiresult">"{user.user_sbti}"</p>
            </div>
          ))}
        </div>
        <div>
          <p>SBTI 유형에 맞는 추천 전통주</p>
        </div>
        <div className="recommend">
          {sbtiInfo && sbtiInfo.map(( {recImg, recommend, recUrl} ) => (
            <div key={recImg}>
              <div>
                <img src={recImg} alt="추천 이미지" onClick={()=>{navigate(recUrl);}} />
              </div>
              <div>
                <p className="sul" onClick={()=>{navigate(recUrl);}}>
                  {recommend}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="buttonBox">
          <button onClick={() => navigate("/")}>홈으로</button>
          <button onClick={() => navigate("/SBTIMain")}>다시하기</button>
        </div>
      </Container>
    </OutBox>
  );
};
export default SBTIResult;
