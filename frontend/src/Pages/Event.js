import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import HeaderDesign from "../HeaderDesign";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`;
const Events = styled.div`
  display: flex;
  justify-content: space-evenly;
  border: 1px solid gray;
  border-radius: 3px;
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
  .eventbutton.active {
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
  @media screen and (max-width: 1024px) {
    width: 100%;
    justify-content: space-evenly;
  }
`;
const EventInfoWrapper = styled.div`
  width: 300px;
  height: 300px;
  background-color: #edeae3;
  border-radius: 5px;
  margin: 20px;
  text-align: center;
  border: none;
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
const EventName = styled.div`
  font-weight: bold;
`;
const EventImg = styled.div`
  width: 300px;
  height: 200px;
  .eventimg {
    width: 100%;
    height: 90%;
    border-radius: 5px;
  }
`;
const EventEnddate = styled.div``;
const EventUrl = styled.div`
  .eventlink {
    text-decoration: none;
  }
  .evetnlink:hover {
    cursor: pointer;
  }
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
          <EventInfoWrapper key={event.event_name}>
            <EventImg>
              <img className="eventimg" src={event.event_img} alt="" />
            </EventImg>
            <EventName>{event.event_name}</EventName>
            <EventEnddate>이벤트 종료일: {event.event_enddate}</EventEnddate>
            <EventUrl>
              <a
                className="eventlink"
                href={event.event_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                이벤트 바로가기
              </a>
            </EventUrl>
          </EventInfoWrapper>
        ))}
      </EventsWrapper>
    </Container>
  );
};
export default Event;
