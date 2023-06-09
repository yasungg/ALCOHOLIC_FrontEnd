import styled from "styled-components";
import { useState, useEffect } from "react";
import { storage } from "./api/firebase";
import { ref, getDownloadURL } from "firebase/storage";
const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 200px;
  border-top: 1px solid rgb(223, 214, 210);
  @media screen and (max-width: 1024px) {
    height: 350px;
  }
`;
const UpperBox = styled.div`
  width: 80%;
  height: 70px;
  margin: 25px 20px 10px 20px;
  display: flex;
  justify-content: space-between;
  align-self: center;
  @media screen and (max-width: 1024px) {
    width: 95%;
    margin: 10px 20px 10px 20px;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 70%;
  }
`;
const NameBox = styled.div`
  width: 250px;
  height: 70px;
  display: flex;
  flex-direction: column;
  .firstLine {
    font-size: 1.3em;
    margin: 0;
  }
  .secondLine {
    font-size: 0.7em;
    margin-top: 5px;
  }
  .thirdLine {
    font-size: 0.6em;
    margin: 0;
  }
`;
const FooterButtonBox = styled.div`
  display: flex;
  width: 400px;
  justify-content: space-between;
  align-self: flex-start;
  @media screen and (max-width: 1024px) {
    align-self: center;
  }
`;
const FooterButton = styled.button`
  width: 150px;
  border: none;
  background: none;
  font-weight: bold;
  cursor: pointer;
  &:nth-child(1) {
    border-right: 1px solid rgb(223, 214, 210);
  }
  &:nth-child(2) {
    border-right: 1px solid rgb(223, 214, 210);
  }
`;
const SNSBox = styled.div`
  width: 250px;
  display: flex;
  justify-content: space-between;
`;
const SNSButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background: rgb(223, 214, 210);
  border-radius: 50%;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
const SNSBtnImg = styled.img`
  width: 50px;
  height: 50px;
  border: none;
  outline: none;
  border-radius: 50%;
  margin: 0;
`;
const LowBox = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 80%;
  margin: 0 20px 0 20px;
  .lowBoxA {
    font-size: 0.8em;
    text-decoration: none;
    &:visited {
      color: black;
    }
  }
  .lowBoxSpan {
    font-size: 0.8em;
  }
`;
const FooterDesign = () => {
  const [iconUrls, setIconUrls] = useState([]);
  useEffect(() => {
    // 파이어베이스를 이용한 홈페이지 아이콘 렌더링
    const storageIconRef = ref(storage, "Icons");

    Promise.all([
      getDownloadURL(ref(storageIconRef, "네이버.png")),
      getDownloadURL(ref(storageIconRef, "페이스북.png")),
      getDownloadURL(ref(storageIconRef, "인스타그램.png")),
      getDownloadURL(ref(storageIconRef, "트위터.png")),
    ])
      .then((urls) => {
        setIconUrls(urls);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <FooterContainer>
      <UpperBox>
        <NameBox>
          <p className="firstLine">마쉴랭 제작소</p>
          <span className="secondLine">Tel: 02-0000-0000</span>
          <p className="thirdLine">
            고객센터 운영시간: 10:00 ~ 18:00, 일요일 휴무
          </p>
        </NameBox>
        <FooterButtonBox>
          <FooterButton>이용약관</FooterButton>
          <FooterButton>개인정보처리방침</FooterButton>
          <FooterButton>입점문의</FooterButton>
        </FooterButtonBox>
        <SNSBox>
          <SNSButton>
            <SNSBtnImg src={iconUrls[0]} />
          </SNSButton>
          <SNSButton>
            <SNSBtnImg src={iconUrls[1]} />
          </SNSButton>
          <SNSButton>
            <SNSBtnImg src={iconUrls[2]} />
          </SNSButton>
          <SNSButton>
            <SNSBtnImg src={iconUrls[3]} />
          </SNSButton>
        </SNSBox>
      </UpperBox>
      <LowBox>
        <span className="lowBoxSpan">대표 : 곽용석</span>
        <a className="lowBoxA" href="/">
          사업자등록번호 : xxx-xx-xxxxx
        </a>
        <span className="lowBoxSpan">
          통신판매 신고번호: 2021-서울서초-xxxx
        </span>
        <span className="lowBoxSpan">All right reserved. @masilang 2023.</span>
      </LowBox>
    </FooterContainer>
  );
};
export default FooterDesign;
