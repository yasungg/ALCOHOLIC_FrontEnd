import HeaderDesign from "../HeaderDesign";
import styled from "styled-components";
import TMP from "../Image/벚꽃.png";
import rightArrow from "../Image/angle-right.png";
import { UpBtn } from "../component/ReusableComponents";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AxiosApi from "../api/AxiosApi";
import { UserContext } from "../api/Context";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const MyPageContainer = styled.div`
  width: 1024px;
  height: 100%;
  align-self: center;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1024px) {
    width: 100vw;
  }
`;
const UserCard = styled.div`
  width: 100%;
  height: 250px;
  margin-top: 32px;
  border-radius: 10px;
  background: rgba(223, 214, 210);
  display: flex;
  justify-content: space-between;
`;
const ProfilePicture = styled.img`
  width: 218px;
  height: 218px;
  margin: 16px 0 16px 16px;
  background: white;
  border-radius: 10px;
  cursor: pointer;
  @media screen and (max-width: 1024px) {
    margin-right: 16px;
  }
`;
const UserDesc = styled.div`
  box-sizing: border-box;
  width: 758px;
  height: 218px;
  margin: 16px 16px 16px 0;
  padding: 16px 16px 16px 32px;
  background: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  p {
    margin: 0;
  }
`;
const ModifyBtn = styled.button`
  width: 100px;
  height: 20px;
  font-size: 0.7em;
  background: white;
  border: none;
  box-shadow: none;
  cursor: pointer;
  &:hover {
    transition: all 0.5s;
    color: rgba(223, 214, 210);
  }
`;
const MyPageBody = styled.div`
  width: 100%;
  height: 350px;
  margin-top: 32px;
  @media screen and (max-width: 1024px) {
    justify-content: space-evenly;
  }
`;
const BodyTitle = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 64px;
  padding: 16px;
  font-size: 1.5em;
`;
const BodyBox = styled.div`
  width: 100%;
  height: 286px;
  border: 1px solid rgba(223, 214, 210);
  border-radius: 10px;
  display: flex;
  justify-content: space-evenly;
`;
const BodyCard = styled.div`
  width: 180px;
  height: 254px;
  background: white;
  border-radius: 10px;
  align-self: center;
  cursor: pointer;
  &:hover {
    transform: translate(0, -5px);
    transition: all 0.5s;
  }
  @media screen and (max-width: 1024px) {
    &:nth-child(4) {
      display: none;
    }
  }
`;
const BodyImg = styled.img`
  width: 180px;
  height: 180px;
  background: rgb(193, 159, 138);
  border-radius: 10px;
`;
const BodyMoreBtn = styled.button`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(223, 214, 210);
  border-radius: 10px;
  border: 1px solid rgba(223, 214, 210);
  align-self: center;
  cursor: pointer;
  img {
    width: 16px;
    height: 16px;
    margin-left: 3px;
  }
`;
const FooterDiv = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyPage = () => {
  const navigate = useNavigate();
  const { userNum, isLogin } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState([]);
  const [isNull, setIsNull] = useState(false);
  useEffect(() => {
    const getName = async (num) => {
      if (isLogin) {
        try {
          const responseNum = await AxiosApi.userNumber(num);
          console.log(responseNum.data);
          setUserInfo(responseNum.data);
        } catch (error) {
          console.error("유저 정보 불러오기 실패!!", error);
          console.log(userNum);
        }
        if (userInfo.user_sbti == null) setIsNull(true);
      } else if (!isLogin) {
        setUserInfo([]);
      }
    };
    getName(userNum);
  }, [isLogin]);

  return (
    <Container>
      <HeaderDesign />
      <MyPageContainer>
      {userInfo.map((e) => (
        <UserCard key={e.user_no}>
          <ProfilePicture 
            src={e.user_profile}
            onClick={() => navigate("/SBTIMain")}
          />
            <UserDesc>
              <p>{e.user_name}님 환영합니다.</p>
              <p>연락처 : {e.user_phone}</p>
              <p>등록 이메일 : {e.user_email}</p>
              <p>
                술 취향 :&nbsp;
                {isNull ? (
                  <span>아직 술bti 검사가 이루어지지 않은 회원입니다.</span>
                ) : (
                  e.user_sbti
                )}
              </p>
            </UserDesc>
        </UserCard>
                  ))}
        <ModifyBtn onClick={() => navigate("/MemberUpdate")}>
          <span>회원정보 수정</span>
        </ModifyBtn>
        <MyPageBody>
          <BodyTitle>리뷰 관리</BodyTitle>
          <BodyBox>
            <BodyCard>
              <BodyImg src={TMP} alt="이미지" />
            </BodyCard>
            <BodyCard>
              <BodyImg src={TMP} alt="이미지" />
            </BodyCard>
            <BodyCard>
              <BodyImg src={TMP} alt="이미지" />
            </BodyCard>
            <BodyCard>
              <BodyImg src={TMP} alt="이미지" />
            </BodyCard>
            <BodyMoreBtn>
              <img src={rightArrow} alt="ㅅ" />
            </BodyMoreBtn>
          </BodyBox>
        </MyPageBody>
        <MyPageBody>
          <BodyTitle>관심 상품</BodyTitle>
          <BodyBox>
            <BodyCard>
              <BodyImg src={TMP} alt="이미지" />
            </BodyCard>
            <BodyCard>
              <BodyImg src={TMP} alt="이미지" />
            </BodyCard>
            <BodyCard>
              <BodyImg src={TMP} alt="이미지" />
            </BodyCard>
            <BodyCard>
              <BodyImg src={TMP} alt="이미지" />
            </BodyCard>
            <BodyMoreBtn>
              <img src={rightArrow} alt="ㅅ" />
            </BodyMoreBtn>
          </BodyBox>
        </MyPageBody>
      </MyPageContainer>
      <FooterDiv>
        <UpBtn />
      </FooterDiv>
    </Container>
  );
};
export default MyPage;