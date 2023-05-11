import React, { useState } from "react";
import styled from "styled-components";
import HeaderDesign from "../HeaderDesign";
import AxiosApi from "../api/AxiosApi";
import Modal from "../utils/Modal";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  height: 550px;

.findid {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 40px;
    font-weight: bold;
    margin-top: 50px;
    margin-bottom: 20px;
    }
`;
const Item = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: bold;
`;

const Input = styled.input`
    border: 1px solid black;
    color: gray;
    width: 400px;
    height: 50px;
    text-align: center;
    margin-top: 15px;
    margin-bottom: 15px;
    border-radius: 3px;
`;
const Find = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    .idfindbutton {
        width: 400px;
        height: 60px;
        background-color: #c19f8a;
        border-style: none;
        font-weight: bold;
        color: white;
        border-radius: 3px;
      }
    .idfindbutton:hover {
        cursor: pointer;
      }
`;

const FindId = () => {

    const [inputEmail, setInputEmail] = useState("");

    const onChangeEmail = (e) => {
        setInputEmail(e.target.value);

    }

    const onClickIdInfo = async() => {
        const response = await AxiosApi.IdGet(inputEmail)
        if(response.status === 200)
        console.log(response.data[0])
        if(response.data[0] === undefined) {
            setModalOpen(true);
            setModalText("찾을 수 없는 아이디입니다.")    
        } else {
            setModalOpen(true);
            setModalText("아이디: " + response.data[0].user_id)  
        }    
        
    }

     // 팝업처리(모달)
     const [modalOpen, setModalOpen] = useState(false);
     const [modalText, setModalText] = useState("");
 
     const confirmBtn = () => {
        setModalOpen(false);
         console.log("확인 버튼이 눌려 졌습니다.");
     }
     const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <Container>
            <HeaderDesign/>
            <div className="findid">
                <span>아이디 찾기</span>
            </div>
            <Item>
            <Input type="text" placeholder="이름을 입력해주세요"/>
            <Input type="email" placeholder="이메일을 입력해주세요" value={inputEmail} onChange={onChangeEmail}/>
            </Item>
          <Find>
            <button onClick={onClickIdInfo} className="idfindbutton">확인</button>
            <Modal open={modalOpen} type={true} confirm={confirmBtn} close={closeModal} header="아이디 찾기">{modalText}</Modal>
          </Find>
          
        </Container>

    );
};
export default FindId;