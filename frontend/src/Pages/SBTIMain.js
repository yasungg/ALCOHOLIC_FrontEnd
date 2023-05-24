import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import { storage } from "../api/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { UserContext } from "../api/Context";


const OutBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
const Top = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 399px;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  color: white;
  background: rgb(193, 159, 138);
  border-radius: 5px;
`;
const Xbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  float: right;
`;
const Container = styled.div`
  box-sizing: border-box;
  width: 400px;
  height: 550px;
  border: 1px solid rgb(193, 159, 138);
  border-radius: 5px;
  background-color: white;
  margin-top: 5%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .sbtiresult {
    font-weight: bold;
    font-style: italic;
    color: blue;
    text-align: center;
  }

  .imo {
    width: 16em;
    border-radius: 50%;
  }

  .close {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .content1 {
    margin: 0;
  }

  .box {
    width: 200px;
    height: 50px;
    align-self: center;
    margin-bottom: 32px;
    border: 1px solid rgb(193, 159, 138);
    color: rgb(193, 159, 138);
    background: white;
    &:hover {
      transform: translateY(-3px);
      transition: all 1s;
      background: rgb(193, 159, 138);
      color: white;
    }
  }
`;

const SBTIMain = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const { userNum } = useContext(UserContext); // 로그인 관리를 위한 Context API


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
      const rsp = await AxiosApi.userNumber(userNum);
      if (rsp.status === 200) setUserInfo(rsp.data);
    };
    userInfo();
  }, [userNum]);
  useEffect(() => {
    const storageIconRef = ref(storage, "Icons");

    Promise.all([
      getDownloadURL(ref(storageIconRef, "x.png")),
      getDownloadURL(ref(storageIconRef, "logo.jpg")),
    ])
      .then((urls) => {
        setImageUrls(urls);
        // console.log(imageUrls);
      })
      .catch((error) => {
        console.error("아이콘 이미지 로딩 실패!!", error);
      });
  }, []);

  return (
    <OutBox>
      <Container>
        <Top>
          <span className="content1" style={{ marginLeft: "165px" }}>
            술BTI 검사
          </span>
          <Xbox>
            <img className="close" src={imageUrls[0]} alt="x" onClick={() => {navigate("/");}}/>
          </Xbox>
        </Top>
        <div>
          <p>1분만에 분석해드려요!</p>
        </div>
        <div>
          <img className="imo" src={imageUrls[1]} alt="이모티콘" />
        </div>
        <div>
          {userInfo.map((user) => (
            <div key={user.user_no}>
              <p>{user.user_name}님의 기존 SBTI 결과:</p>
              <p className="sbtiresult">"{user.user_sbti}"</p>
            </div>
          ))}
        </div>
        <div>
          <button className="box" onClick={onClickSBTI}>
            <span>SBTI 시작하기</span>
          </button>
        </div>
      </Container>
    </OutBox>
  );
};
export default SBTIMain;
