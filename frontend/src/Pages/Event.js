import React from "react";
import styled from "styled-components";
import eventimage from "../Image/main_bnr.jpg"
import HeaderDesign from "../HeaderDesign";

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-evenly;
width: 100%;
`
const Events = styled.div`
display:flex;
justify-content: space-evenly;
border: 1px solid black;
height: 100px;
width: 70%;
margin-top: 80px;
.eventbutton {
    height: 30px;
    width: 30vw;
    margin-top: 33px;
    border-radius: 5px;
    border: 1px solid gray;
    background-color: white;
    font-weight: bold;
  }
.eventbutton:hover {
  cursor: pointer;
}
`;

const DivBox1 = styled.div`
width: 1024px; // 반응형 웹을 고려해 1024px로 설정. 
height: 250px;
margin-top: 50px;
margin-bottom: 50px;
display: flex;
justify-content: space-evenly;
align-items: center;
flex-wrap: nowrap;
@media screen and (max-width: 1024px) {
  width: 100%;
  justify-content: space-evenly;
}
`;

const DivBox2 = styled.div`
width: 1024px; // 반응형 웹을 고려해 1024px로 설정. 
height: 250px;
margin-top: 50px;
margin-bottom: 50px;
display: flex;
justify-content: space-evenly;
align-items: center;
@media screen and (max-width: 1024px) {
  width: 100%;
  justify-content: space-evenly;
}

`;
const Card = styled.div`
  width: 350px;
  height: 200px;
  background-color: #edeae3;
  border-radius: 10px;
  cursor: pointer;
  .eventname {
    display: flex;
    align-items: flex-end;
    justify-content: center;
}
@media screen and (max-width: 1024px) {
  margin-left: 10px;
  margin-right: 10px;
}
`;

const Event = () => {

    return (
        <Container>
          <HeaderDesign/>
            <Events>
            <button className="eventbutton">진행중인 이벤트</button>
            <button className="eventbutton">종료된 이벤트</button>
            </Events>
            <DivBox1>
            <Card className="card">
              <h2 className="eventname">이벤트 제목</h2>
            </Card>
            <Card className="card">
              <h2 className="eventname">이벤트 제목</h2>
            </Card>
            </DivBox1>
            <DivBox2>
            <Card className="card">
              <h2 className="eventname">이벤트 제목</h2>
            </Card>
            <Card className="card">
              <h2 className="eventname">이벤트 제목</h2>
            </Card>
            </DivBox2>
        </Container>
    );
};
export default Event;