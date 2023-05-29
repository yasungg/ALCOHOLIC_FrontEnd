import HeaderDesign from "../HeaderDesign";
import styled from "styled-components";
import TMP from "../Image/벚꽃.png";
import rightArrow from "../Image/angle-right.png";
import { UpBtn, Sidebar } from "../component/ReusableComponents";
import { useNavigate,Link } from "react-router-dom";
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
  display: flex;
`;

const BodyMoreBtn = styled.button`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: none;
  width: 32px;
  height: 32px;
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

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 220px;
  height: 98%;
  align-self: space-evenly;
  /* background: rgb(193, 159, 138); */
  background: white;
  border: 0.5px solid rgb(193, 159, 138);
  /* border: none; */
  border-radius: 10px;
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
  &:hover {
    transform: translate(0, -5px);
  }

  &:hover {
    transform: translate(0, -5px);
  }
  @media screen and (max-width: 1024px) {
    &:nth-child(4) {
      display: none;
    }
  }
  @media screen and (max-width: 768px) {
    &:nth-child(3) {
      display: none;
    }
  }
`;
const ProductBodyBox = styled.div`
  width: 100%;
  height: 380px;
  border-radius: 10px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-self: center;
  align-items: center;
  @media screen and (max-width: 1024px) {
    width: 100vw;
    justify-content: flex-start;
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
const ReviewBodyBox = styled.div`
  width: 100%;
  border: none;
  border-radius: 10px;
  display: flex;
  justify-content: space-evenly;
`;
const ReviewBodyCard = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 500px;
  min-width: 500px;
  height: 254px;
  background: rgba(223, 214, 210, .9);
  border-radius: 10px;
  align-self: center;
  cursor: pointer;
  &:nth-child(1) {
    margin-right: 16px;
  }
  .reviewP {
    text-decoration: none;
    &:active {
      text-decoration: none;
    }
    &:visited {
      text-decoration: none;
    }
  }
  &:hover {
    transform: translate(0, -5px);
    transition: all 0.5s;
  }
  &:active {
    text-decoration: none;
  }
  @media screen and (max-width: 1024px) {
    &:nth-child(4) {
      display: none;
    }
  }
`;
const ReviewImg = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 10px;
  margin: 0 32px 0 32px;
`;
const ReviewCardPBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 180px;
`;

const MyPage = () => {
  const navigate = useNavigate();
  const { userNum, isLogin, setIsSidebar } = useContext(UserContext);
  const [review, setReview] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [isNull, setIsNull] = useState(false);
  const [likeProduct, setLikeProduct] = useState([]);
  useEffect(() => {
    setIsSidebar(false);
    console.log(isNull);
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
        if (userInfo.user_sbti == null) {
          setIsNull(true);
        } else {
          setIsNull(false);
        }
      } else if (!isLogin) {
        setUserInfo([]);
      }
    };
    getName(userNum);
  }, [isLogin]);
    useEffect(() => {
    const reviewGet = async() => {
      const rv = await AxiosApi.myReview(userNum);
      console.log(rv.data);
      setReview(rv.data);
    }
    reviewGet();
  }, []);
  // 관심 상품 표시
  useEffect(() => {
    const likeProductSeen = async () => {
      const rsp = await AxiosApi.likeProductGet(userNum);
      if (rsp.status === 200) setLikeProduct(rsp.data);
    };
    likeProductSeen();
  }, []);
  const cardClick = (product_no) => {
    navigate(`/Product/${product_no}`);
  };

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
                  <span>{e.user_sbti}</span>
                ) : (
                  <span>아직 술bti 검사가 이루어지지 않은 회원입니다.</span>
                )}
              </p>
            </UserDesc>
          </UserCard>
        ))}
        <ModifyBtn onClick={() => navigate("/MemberUpdate")}>
          <span>회원정보 수정</span>
        </ModifyBtn>
        <MyPageBody>
        <BodyTitle>
            리뷰 관리
            <BodyMoreBtn>
              <img src={rightArrow} alt="ㅅ" />
            </BodyMoreBtn>  
          </BodyTitle>
          <ReviewBodyBox >
          {review.slice(0, 2).map((e)=> (
            <Link to={`/product/${e.product_no}`} style={{ textDecoration: 'none', color: '#404949'}}><ReviewBodyCard key={e.rev_no} >
              <ReviewImg src={e.rev_img}/>
              <ReviewCardPBox>
              <p className="reviewP">아이디 : {e.user_id}</p>
              <p className="reviewP">작성일 : {e.rev_date}</p>
              <p className="reviewP">한줄평 : {e.rev_content}</p>
              </ReviewCardPBox>
            </ReviewBodyCard>
            </Link>
          ))}
          </ReviewBodyBox>
        </MyPageBody>
        <MyPageBody>
          <BodyTitle>
            관심 상품
            <BodyMoreBtn>
              <img
                onClick={() => navigate("/MyProduct")}
                src={rightArrow}
                alt="ㅅ"
              />
            </BodyMoreBtn>
          </BodyTitle>
          <ProductBodyBox>
            {likeProduct.slice(0, 4).map((product) => (
              <Card
                className="card"
                key={product.product_no}
                onClick={() => cardClick(product.product_no)}
              >
                <CardImg src={product.product_img} />
                <CardTitle>
                  <h4>{product.product_name}</h4>
                </CardTitle>
                <CardDesc>{product.content1}</CardDesc>
                <CardTag>{product.content2}</CardTag>
              </Card>
            ))}
          </ProductBodyBox>
        </MyPageBody>
      </MyPageContainer>
      <FooterDiv>
        <UpBtn />
      </FooterDiv>
      <Sidebar />
    </Container>
  );
};
export default MyPage;
