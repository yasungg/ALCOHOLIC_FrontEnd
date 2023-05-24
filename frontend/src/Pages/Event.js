import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import HeaderDesign from "../HeaderDesign";
import FooterDesign from "../FooterDesign";
import { UpBtn, Sidebar } from "../component/ReusableComponents";
import ImageUploader from "../component/UploadImage";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const BottomBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
`;
const Events = styled.div`
  display: flex;
  justify-content: space-evenly;
  border: 1px solid rgb(223, 214, 210);
  border-radius: 3px;
  height: 100px;
  width: 70%;
  margin-top: 80px;
  .eventbutton {
    height: 30px;
    width: 30vw;
    align-self: center;
    border-radius: 5px;
    border: 1px solid rgb(223, 214, 210);
    background-color: white;
    font-weight: bold;
    color: #495057;
  }
  .eventbutton:hover {
    cursor: pointer;
  }
  .eventbutton.active {
    border: none;
    background-color: #c19f8a;
    color: white;
  }
`;

const EventsWrapper = styled.div`
  width: 1024px; // 반응형 웹을 고려해 1024px로 설정.
  margin-top: 50px;
  margin-bottom: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  .atmp {
    text-decoration: none;
    &:active {
      text-decoration: none;
    }
  }
  @media screen and (max-width: 1024px) {
    width: 100%;
    justify-content: space-evenly;
  }
`;
const EventInfoWrapper = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: 280px;
  background: white;
  border-radius: 5px;
  padding: 0;
  margin: 20px;
  text-align: center;
  border: 1px solid rgb(223, 214, 210);
  cursor: pointer;
  @media screen and (max-width: 1024px) {
    margin-left: 10px;
    margin-right: 10px;
  }
`;
const EventName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 96%;
  height: 50px;
  font-weight: bold;
  border-bottom: 0.5px solid rgb(223, 214, 210);
`;
const EventImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 300px;
  height: 180px;
  .eventimg {
    width: 280px;
    height: 170px;
    border-radius: 5px;
  }
`;
const EventEnddate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
`;

const Event = () => {
  const [ingEvent, setIngEvent] = useState([]);
  const [endEvent, setEndEvent] = useState([]);
  const [isIngEventButtonClicked, setIsIngEventButtonClicked] = useState(true);
  const [isEndEventButtonClicked, setIsEndEventButtonClicked] = useState(false);

  // 진행중인 이벤트 조회
  const ingEventInfo = async () => {
    const rsp = await AxiosApi.eventGet("ALL");
    if (rsp.status === 200) setIngEvent(rsp.data);
    console.log(rsp.data);
  };

  useEffect(() => {
    ingEventInfo();
  }, []);

  const ingButtonClick = () => {
    ingEventInfo();
    setEndEvent([]); // 종료된 이벤트 초기화
    setIsIngEventButtonClicked(true);
    setIsEndEventButtonClicked(false);
  };

  // 종료된 이벤트 조회
  const doneEventInfo = async () => {
    const rsp = await AxiosApi.doneEventGet("ALL");
    if (rsp.status === 200) setEndEvent(rsp.data);
    console.log(rsp.data);
  };
  useEffect(() => {
    doneEventInfo();
  }, []);

  const endButtonClick = () => {
    doneEventInfo();
    setIngEvent([]); // 진행중인 이벤트 초기화
    setIsIngEventButtonClicked(false);
    setIsEndEventButtonClicked(true);
  };

  return (
    <Container>
      <HeaderDesign />
      <Sidebar height="100%" />
      <Events>
        <button
          className={`eventbutton ${isIngEventButtonClicked ? "active" : ""}`}
          onClick={ingButtonClick}
        >
          진행중인 이벤트
        </button>
        <button
          className={`eventbutton ${isEndEventButtonClicked ? "active" : ""}`}
          onClick={endButtonClick}
        >
          종료된 이벤트
        </button>
      </Events>
      <EventsWrapper>
        {(isIngEventButtonClicked ? ingEvent : endEvent).map((event) => (
          <a
            className="atmp"
            href={event.event_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <EventInfoWrapper key={event.event_name}>
              <EventImg>
                <img className="eventimg" src={event.event_img} alt="" />
              </EventImg>
              <EventName>{event.event_name}</EventName>
              <EventEnddate>이벤트 종료일: {event.event_enddate}</EventEnddate>
            </EventInfoWrapper>
          </a>
        ))}
      </EventsWrapper>
      <BottomBox>
        <UpBtn />
      </BottomBox>
      <FooterDesign />
    </Container>
  );
};
export default Event;
