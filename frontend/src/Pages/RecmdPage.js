import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import firebase from "firebase/compat/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import HeaderDesign from "../HeaderDesign";
import AxiosApi from "../api/AxiosApi";

const initialMinheight = "200px";
const changedMinheight = "295px";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
`;
const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1024px;
  height: 100vh;
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;
const AdditionalBlank = styled.div`
  display: flex;
  width: 100%;
  height: 7vh;
  min-height: 7vh;
`;
const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: ${(props) => props.minHeight};
  border: 1px solid rgb(223, 214, 210);
  border-radius: 5px;
`;
const CategoryTitle = styled.div`
  display: flex;
  width: 90%;
  height: 33%;
  min-height: 65px;
  align-self: center;
  border-bottom: 1px solid rgb(223, 214, 210);
  align-items: center;
  h4 {
    font-weight: normal;
    margin: 0;
    color: #495057;
  }
`;
const CategoryBtnBox = styled.div`
  display: flex;
  width: 90%;
  height: 33%;
  min-height: 65px;
  align-self: center;
  justify-content: space-evenly;
  align-items: center;
`;
const CategoryBtn = styled.button`
  width: 140px;
  height: 24px;
  border: ${({ isClicked }) =>
    isClicked
      ? "1px solid rgb(193, 159, 138)"
      : "1px solid rgb(223, 214, 210)"};
  border-radius: 3px;
  background: ${({ isClicked }) =>
    isClicked ? "rgb(193, 159, 138)" : "transparent"};
  color: ${({ isClicked }) => (isClicked ? "white" : "#495057")};
  &:hover {
    cursor: pointer;
  }
`;
const CheckboxDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  height: 33%;
  align-self: center;
`;
const ThemeCardDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  width: 90%;
  align-self: center;
`;
const CheckBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #495057;
  width: 25%;
  height: 100%;
  align-self: center;
`;
const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
`;
const RecmdCard = styled.button`
  display: flex;
  flex-direction: column;
  width: 220px;
  height: 360px;
  padding: 0;
  margin: 30px 0 30px;
  align-self: space-evenly;
  /* background: rgb(193, 159, 138); */
  background: white;
  border: 0.5px solid rgb(193, 159, 138);
  /* border: none; */
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    transform: translate(0, -5px);
  }
`;
const CardImg = styled.img`
  width: 200px;
  height: 200px;
  border: none;
  outline: none;
  margin-top: 10px;
  border-radius: 10px;
  align-self: center;
`;
const CardTitle = styled.div`
  margin-left: 16px;
`;
const CardDesc = styled.div`
  font-size: 0.9em;
  width: 90%;
  height: 35px;
  align-self: center;
  padding-top: 8px;
  border-top: 0.5px solid rgb(193, 159, 138);
  color: #495057;
`;
const CardTag = styled.div`
  width: 90%;
  color: #495057;
  font-size: 0.9em;
  align-self: center;
`;

const ThemeCard = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100px;
  width: 100px;
  height: 140px;
  outline: none;
  border: none;
  border-radius: 5px;
  background: white;
  min-height: 140px;
  margin-bottom: 22px;
  cursor: pointer;
  p {
    margin: none;
  }
`;
const ThemeCardImg = styled.img`
  width: 90px;
  height: 90px;
  min-width: 90px;
  background: rgb(193, 159, 138);
  border-radius: 5px;
  align-self: center;
`;
const ThemeCardDesc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90%;
  height: 30px;
  min-height: 30px;
`;
const RecmdPage = () => {
  const [isFirstBtnClicked, setIsFirstBtnClicked] = useState(true); // '종류별' 버튼 토글
  const [isSecondBtnClicked, setIsSecondBtnClicked] = useState(false); // '테마' 버튼 토글
  const [yakjuChecked, setYakjuChecked] = useState(false); // 약주(청주) 체크박스 토글
  const [takjuChecked, setTakjuChecked] = useState(false); // 탁주 체크박스 토글
  const [boiledjuChecked, setBoiledjuChecked] = useState(false); // 증류주 체크박스 토글
  const [fruitjuChecked, setFruitjuChecked] = useState(false); // 과실주 체크박스 토글
  const [imageUrls, setImageUrls] = useState([]); // 파이어베이스 이미지 URL 배열 저장
  const [yakjuData, setYakjuData] = useState([]); // 약주 종류별 검색 결과 배열 저장
  const [takjuData, setTakjuData] = useState([]); // 탁주 종류별 검색 결과 배열 저장
  const [boiledjuData, setBoiledjuData] = useState([]); // 증류주 종류별 검색 결과 배열 저장
  const [fruitjuData, setFruitjuData] = useState([]); // 과실주 종류별 검색 결과 배열 저장
  const [firstData, setFirstData] = useState([]); // 봄소풍 테마 검색 결과 저장
  const [secondData, setSecondData] = useState([]); // 어버이날 테마 검색 결과 저장
  const [thirdData, setThirdData] = useState([]); // 기념일 테마 검색 결과 저장
  const [forthData, setForthData] = useState([]); // 홈파티 테마 검색 결과 저장
  const [fifthData, setFifthData] = useState([]); // 감성캠핑 테마 검색 결과 저장
  const [productName, setProductName] = useState("");
  const [divMinHeight, setDivMinHeight] = useState(initialMinheight);
  // ㄴ 종류별/테마 버튼 토글로 Category Container styled component min-height 값 변경을 위한 useState

  // useEffect(() => { // 아이콘 로딩을 위한 파이어베이스
  //   const storage = getStorage(firebase.app());
  //   const storageIconRef = ref(storage, "Icons");

  //   Promise.all([getDownloadURL(storageIconRef, "벚꽃.png")]);
  // });
  const navigate = useNavigate(); // 카드 클릭 시 술 상세정보 페이지로 넘어가도록 하기 위한 useNavigate

  const FirstBtnCLicked = () => {
    // 종류별 버튼 onClick
    setIsFirstBtnClicked(true);
    setIsSecondBtnClicked(false);
    setFirstData([]);
    setSecondData([]);
    setThirdData([]);
    setForthData([]);
    setFifthData([]);
    setDivMinHeight(initialMinheight);
  };
  const SecondBtnClicked = () => {
    // 테마 버튼 onClick
    setIsFirstBtnClicked(false);
    setIsSecondBtnClicked(true);
    setYakjuData([]);
    setTakjuData([]);
    setBoiledjuData([]);
    setFruitjuData([]);
    setYakjuChecked(false);
    setTakjuChecked(false);
    setBoiledjuChecked(false);
    setFruitjuChecked(false);
    setDivMinHeight(changedMinheight);
  };
  const yakjuChange = async (e) => {
    // 약주(청주) 체크박스 onChange
    setYakjuChecked(() => !yakjuChecked);
    if (!yakjuChecked) {
      try {
        const yakjuResult = await AxiosApi.Checked("청주");
        setYakjuData(yakjuResult);
      } catch (error) {
        console.error("데이터 전송 실패!!", error);
      }
    } else {
      setYakjuData([]); // 체크박스 해제 시 표시됐던 검색결과 삭제
    }
  };
  const takjuChange = async (e) => {
    // 탁주 체크박스 onChange
    setTakjuChecked(() => !takjuChecked);
    if (!takjuChecked) {
      try {
        const takjuResult = await AxiosApi.Checked("탁주");
        setTakjuData(takjuResult);
      } catch (error) {
        console.error("데이터 전송 실패!!", error);
      }
    } else {
      setTakjuData([]); // 체크박스 해제 시 표시됐던 검색결과 삭제
    }
  };
  const boiledChange = async (e) => {
    // 증류주 체크박스 onChange
    setBoiledjuChecked(() => !boiledjuChecked);
    if (!boiledjuChecked) {
      try {
        const boiledjuResult = await AxiosApi.Checked("증류주");
        setBoiledjuData(boiledjuResult);
      } catch (error) {
        console.error("데이터 전송 실패!!", error);
      }
    } else {
      setBoiledjuData([]); // 체크박스 해제 시 표시됐던 검색결과 삭제
    }
  };
  const fruitChange = async (e) => {
    // 과실주 체크박스 onChange
    setFruitjuChecked(() => !fruitjuChecked);
    if (!fruitjuChecked) {
      try {
        const fruitjuResult = await AxiosApi.Checked("과실주");
        setFruitjuData(fruitjuResult);
        console.log(fruitjuResult);
      } catch (error) {
        console.error("데이터 전송 실패!!", error);
      }
    } else {
      setFruitjuData([]); // 체크박스 해제 시 표시됐던 검색결과 삭제
    }
  };
  const clickFirstOne = async (e) => {
    setSecondData([]);
    setThirdData([]);
    setForthData([]);
    setFifthData([]); // 다른 테마 버튼 클릭시 출력됐던 검색결과 삭제
    try {
      const firstResult = await AxiosApi.ThemeChecked("봄소풍");
      setFirstData(firstResult);
    } catch (error) {
      console.error("온클릭 에러!!", error);
    }
  };
  const clickSecondOne = async (e) => {
    setFirstData([]);
    setThirdData([]);
    setForthData([]);
    setFifthData([]); // 다른 테마 버튼 클릭시 출력됐던 검색결과 삭제
    try {
      const secondResult = await AxiosApi.ThemeChecked("어버이날");
      setSecondData(secondResult);
    } catch (error) {
      console.error("온클릭 에러!!", error);
    }
  };
  const clickThirdOne = async (e) => {
    setFirstData([]);
    setSecondData([]);
    setForthData([]);
    setFifthData([]); // 다른 테마 버튼 클릭시 출력됐던 검색결과 삭제
    try {
      const thirdResult = await AxiosApi.ThemeChecked("기념일");
      setThirdData(thirdResult);
    } catch (error) {
      console.error("온클릭 에러!!", error);
    }
  };
  const clickForthOne = async (e) => {
    setFirstData([]);
    setSecondData([]);
    setThirdData([]);
    setFifthData([]); // 다른 테마 버튼 클릭시 출력됐던 검색결과 삭제
    try {
      const forthResult = await AxiosApi.ThemeChecked("홈파티");
      setForthData(forthResult);
    } catch (error) {
      console.error("온클릭 에러!!", error);
    }
  };
  const clickFifthOne = async (e) => {
    setFirstData([]);
    setSecondData([]);
    setThirdData([]);
    setForthData([]); // 다른 테마 버튼 클릭시 출력됐던 검색결과 삭제
    try {
      const fifthResult = await AxiosApi.ThemeChecked("감성캠핑");
      setFifthData(fifthResult);
    } catch (error) {
      console.error("온클릭 에러!!", error);
    }
  };
  const cardClick = (product_no) => {
    navigate(`/Product/${product_no}`);
  };

  return (
    <Container>
      <HeaderDesign />
      <BodyContainer>
        <AdditionalBlank />
        <CategoryContainer minHeight={divMinHeight}>
          <CategoryTitle>
            <h4>분류 보기</h4>
          </CategoryTitle>
          <CategoryBtnBox>
            <CategoryBtn
              isClicked={isFirstBtnClicked}
              onClick={FirstBtnCLicked}
            >
              <span>종류별</span>
            </CategoryBtn>
            <CategoryBtn
              isClicked={isSecondBtnClicked}
              onClick={SecondBtnClicked}
            >
              <span>테마</span>
            </CategoryBtn>
          </CategoryBtnBox>
          {isFirstBtnClicked && (
            <CheckboxDiv>
              <CheckBox>
                <label htmlFor="청주">
                  청주
                  <input
                    type="checkbox"
                    name="product"
                    id="청주"
                    checked={yakjuChecked}
                    onChange={yakjuChange}
                  />
                </label>
              </CheckBox>
              <CheckBox>
                <label htmlFor="탁주">
                  탁주
                  <input
                    type="checkbox"
                    name="product"
                    id="탁주"
                    value="탁주"
                    checked={takjuChecked}
                    onChange={takjuChange}
                  />
                </label>
              </CheckBox>
              <CheckBox>
                <label htmlFor="증류주">
                  증류주
                  <input
                    type="checkbox"
                    name="product"
                    id="증류주"
                    value="증류주"
                    checked={boiledjuChecked}
                    onChange={boiledChange}
                  />
                </label>
              </CheckBox>
              <CheckBox>
                <label htmlFor="과실주">
                  과실주
                  <input
                    type="checkbox"
                    name="product"
                    id="과실주"
                    value="과실주"
                    checked={fruitjuChecked}
                    onChange={fruitChange}
                  />
                </label>
              </CheckBox>
            </CheckboxDiv>
          )}
          {isSecondBtnClicked && (
            <ThemeCardDiv>
              <ThemeCard onClick={clickFirstOne}>
                <ThemeCardImg />
                <ThemeCardDesc>
                  <span>#봄소풍</span>
                </ThemeCardDesc>
              </ThemeCard>
              <ThemeCard onClick={clickSecondOne}>
                <ThemeCardImg />
                <ThemeCardDesc>
                  <span>#어버이날</span>
                </ThemeCardDesc>
              </ThemeCard>
              <ThemeCard onClick={clickThirdOne}>
                <ThemeCardImg />
                <ThemeCardDesc>
                  <span>#기념일</span>
                </ThemeCardDesc>
              </ThemeCard>
              <ThemeCard onClick={clickForthOne}>
                <ThemeCardImg />
                <ThemeCardDesc>
                  <span>#홈파티</span>
                </ThemeCardDesc>
              </ThemeCard>
              <ThemeCard onClick={clickFifthOne}>
                <ThemeCardImg />
                <ThemeCardDesc>
                  <span>#감성캠핑</span>
                </ThemeCardDesc>
              </ThemeCard>
            </ThemeCardDiv>
          )}
        </CategoryContainer>
        <AdditionalBlank
          style={{ borderBottom: "1px solid rgb(223, 214, 210)" }}
        />
        <AdditionalBlank />
        <CardContainer>
          {yakjuData.map((e) => (
            <RecmdCard
              key={e.product_name}
              onClick={() => cardClick(e.product_no)}
            >
              <CardImg src={e.product_img} />
              <CardTitle>
                <h4>{e.product_name}</h4>
              </CardTitle>
              <CardDesc>{e.content1}</CardDesc>
              <CardTag>{e.content2}</CardTag>
            </RecmdCard>
          ))}
          {takjuData.map((e) => (
            <RecmdCard
              key={e.product_name}
              onClick={() => cardClick(e.product_no)}
            >
              <CardImg src={e.product_img} />
              <CardTitle>
                <h4>{e.product_name}</h4>
              </CardTitle>
              <CardDesc>{e.content1}</CardDesc>
              <CardTag>{e.content2}</CardTag>
            </RecmdCard>
          ))}
          {boiledjuData.map((e) => (
            <RecmdCard
              key={e.product_name}
              onClick={() => cardClick(e.product_no)}
            >
              <CardImg src={e.product_img} />
              <CardTitle>
                <h4>{e.product_name}</h4>
              </CardTitle>
              <CardDesc>{e.content1}</CardDesc>
              <CardTag>{e.content2}</CardTag>
            </RecmdCard>
          ))}
          {fruitjuData.map((e) => (
            <RecmdCard
              key={e.product_name}
              onClick={() => cardClick(e.product_no)}
            >
              <CardImg src={e.product_img} />
              <CardTitle>
                <h4>{e.product_name}</h4>
              </CardTitle>
              <CardDesc>{e.content1}</CardDesc>
              <CardTag>{e.content2}</CardTag>
            </RecmdCard>
          ))}
          {firstData.map((e) => (
            <RecmdCard
              key={e.product_name}
              onClick={() => cardClick(e.product_no)}
            >
              <CardImg src={e.product_img} />
              <CardTitle>
                <h4>{e.product_name}</h4>
              </CardTitle>
              <CardDesc>{e.content1}</CardDesc>
              <CardTag>{e.content2}</CardTag>
            </RecmdCard>
          ))}
          {secondData.map((e) => (
            <RecmdCard
              key={e.product_name}
              onClick={() => cardClick(e.product_no)}
            >
              <CardImg src={e.product_img} />
              <CardTitle>
                <h4>{e.product_name}</h4>
              </CardTitle>
              <CardDesc>{e.content1}</CardDesc>
              <CardTag>{e.content2}</CardTag>
            </RecmdCard>
          ))}
          {thirdData.map((e) => (
            <RecmdCard
              key={e.product_name}
              onClick={() => cardClick(e.product_no)}
            >
              <CardImg src={e.product_img} />
              <CardTitle>
                <h4>{e.product_name}</h4>
              </CardTitle>
              <CardDesc>{e.content1}</CardDesc>
              <CardTag>{e.content2}</CardTag>
            </RecmdCard>
          ))}
          {forthData.map((e) => (
            <RecmdCard
              key={e.product_name}
              onClick={() => cardClick(e.product_no)}
            >
              <CardImg src={e.product_img} />
              <CardTitle>
                <h4>{e.product_name}</h4>
              </CardTitle>
              <CardDesc>{e.content1}</CardDesc>
              <CardTag>{e.content2}</CardTag>
            </RecmdCard>
          ))}
          {fifthData.map((e) => (
            <RecmdCard
              key={e.product_name}
              onClick={() => cardClick(e.product_no)}
            >
              <CardImg src={e.product_img} />
              <CardTitle>
                <h4>{e.product_name}</h4>
              </CardTitle>
              <CardDesc>{e.content1}</CardDesc>
              <CardTag>{e.content2}</CardTag>
            </RecmdCard>
          ))}
        </CardContainer>
      </BodyContainer>
    </Container>
  );
};
export default RecmdPage;
