import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import HeaderDesign from "../HeaderDesign";
import FooterDesign from "../FooterDesign";
import { UpBtn } from "../component/ReusableComponents";
import SideBox from "../SideBox";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`;
const BottomBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
`;
const DrinkContent = styled.div`
  margin-top: 40px;

  img {
    width: 300px;
    height: 300px;
  }

  .contentbox {
    display: flex;
    justify-content: space-evenly;
    text-align: left;
    margin: 40px;

    p {
      margin-top: -5px;
      margin-right: 50px;
      margin-left: 20px;
    }
    /* button {
      margin-right: 50px;
      margin-left: 20px;
    } */
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
    margin-right: 50px;
    margin-left: 20px; 
    padding: .7em 1.8em;
    text-decoration: none;
    text-align: center;
    text-transform: uppercase;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;

    &:hover,
    &:focus {
      color: #c19f8a;
      outline: 0;
    }

    border-color: #c19f8a;
    color: #c19f8a;
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
      background: #c19f8a;
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
  }

  .row {
    font-weight: bold;
  }
  .summary {
    font-style: italic;
  }
  .title {
    font-size: 24px;
    font-weight: bold;
    color: #495057;
  }

`;

const DrinkofMonth = () => {
  const navigate = useNavigate();

  return(
    <Container>
      <HeaderDesign />
      <DrinkContent>
        <SideBox />
        <div className="contentbox">
          <div>
            <p className="row">이달의 술 1</p>
            <p className="summary">"세 살 야쿠르트, 여든까지 막쿠르트"</p>
            <p className="title">막쿠르트</p>
            <p>· 야쿠르트와 막걸리의 정체성을 모두 살린 균형 잡힌 맛</p>
            <p>· 좋은 재료가 좋은 술맛을 내듯, 국내산 재료만을 사용하여 정성스럽게 빚어낸 술</p>
            <p>· 매운 음식과 함께 하면 유제품 음료의 역할도 척척</p>
            <button onClick={()=>{navigate("/Product/61")}}>자세히 보기</button>
          </div>
          <div>
            <img src="https://d38cxpfv0ljg7q.cloudfront.net/admin_contents/detail/fWO1-1668403134296-1Z7A1584.jpg" alt="추천술1" />
          </div>
        </div>
        <div className="contentbox">
          <div>
            <img src="https://d38cxpfv0ljg7q.cloudfront.net/admin_contents/detail/rC0W-1659321041025-0.jpg" alt="추천술2" />
          </div>
          <div>
            <p className="row">이달의 술 2</p>
            <p className="summary">달달한 유자향 한 가득</p>
            <p className="title">고흥 유자주</p>
            <p>· 새콤달콤한 유자 향 뒤에 고소 담백한 곡물 향을 느낄 수 있는 술</p>
            <p>· 달콤한 맛이 자연스럽게 사라질 때 쯤 누룩의 고소하고 담백한 맛이 샤르르</p>
            <p>· 와플이나 과일 타르트 같은 디저트류와 달콤하게 즐기기 좋은 술</p>
            <button onClick={()=>{navigate("/Product/1")}}>자세히 보기</button>
          </div>
        </div>
        <div className="contentbox">
          <div>
            <p className="row">이달의 술 3</p>
            <p className="summary">벚꽃시즌에만 채밀할 수 있는 꿀로 빚은 산뜻한 미드</p>
            <p className="title">벚꽃시즌</p>
            <p>· 잔에 따르자마자 새콤한 레몬 향이 코앞에서 물신 풍기는 술</p>
            <p>· 옅은 탄산과 꿀의 달콤한 풍미가 가득함</p>
            <p>· 가벼운 화이트 와인을 마시는 듯한 산뜻함이 올라오며 입안 분위기를 화사하게 변화</p>
            <button onClick={()=>{navigate("/Product/31")}}>자세히 보기</button>
          </div>
          <div>
            <img src="https://d38cxpfv0ljg7q.cloudfront.net/admin_contents/detail/HJby-1675410687308-1.jpg" alt="추천술3" />
          </div>
        </div>
      </DrinkContent>

      <BottomBox>
        <UpBtn />
      </BottomBox>
      <FooterDesign />
    </Container>
  );
};
export default DrinkofMonth;