import React, { useEffect, useState, useRef, useContext } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import product1 from "../Image/product1.jpg";
import point1 from "../Image/point1.jpeg";
import AxiosApi from "../api/AxiosApi";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import HeaderDesign from "../HeaderDesign";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { UserContext } from "../api/Context";
import Review from "./Review";

const Container = styled.div`
  width: 100%;
  height: auto;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const BodyContainer = styled.div`
  width: 1024px;
  display: flex;
  flex-direction: column;
  align-self: center;
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

const Content = styled.div`
  width: 768px;
  align-self: center;
  display: flex;
  flex-flow: row;
  justify-content: space-around;
  margin-top: 30px;
`;

const Productimg = styled.div`
  width: 300px;
  margin-right: 20px;
`;

const Products = styled.img`
  width: 100%;
  height: 100%;
`;

const ProductDetail = styled.div`
  margin-left: -20px;
  margin-top: 30px;

  h1 {
    padding-bottom: 20px;
    border-bottom: 1px solid #aaa;
  }
  p {
    &:nth-child(2) {
      color: #aaa;
      line-height: 0.7;
      font-weight: bold;
    }

    &:nth-child(3) {
      color: rgb(255, 186, 0);
      font-weight: bold;
      padding-bottom: 20px;
      border-bottom: 1px solid #aaa;
    }
  }
`;

const Category = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-left: 0;
  line-height: 1.8;
  padding-bottom: 20px;
  border-bottom: 1px solid #aaa;
  color: #aaa;
  font-weight: bold;
`;

const Productcontent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
`;

const Point = styled.img`
  margin-top: 30px;
  width: 700px;
`;


const Btn = styled.div`
  display: flex;
  justify-content: flex-end;

  #revbtn {
        padding: 0 10px;
        text-align: center;
        width: 100px;
        height: 40px;
        margin-right: 10px;
        font-weight: bold;
        border-radius: 5px;
        color: #333;
        border: 1px solid #ddd;
        cursor: pointer;
        background-color: rgb(193, 159, 138);
        color: white;
}

  .likebtn {
    padding: 0 10px;
    text-align: center;
    width: 50px;
    height: 40px;
    border-radius: 3px;
    color: #333;
    background-color: #fff;
    border: 1px solid #ddd;
    margin-right: 20px;
    cursor: pointer;
  }
  .liked {
    background-color: red;
    padding: 0 10px;
    text-align: center;
    width: 50px;
    height: 40px;
    border-radius: 3px;
    color: white;
    border: 1px solid #ddd;
    margin-right: 20px;
    cursor: pointer;
  }
  #cartbtn {
    padding: 0 10px;
        text-align: center;
        width: 100px;
        height: 40px;
        font-weight: bold;
        border-radius: 5px;
        color: #333;
        border: 1px solid #ddd;
        cursor: pointer;
        background-color: rgb(193, 159, 138);
        color: white;
        margin-right: 10px;
  }
`;
const TabMenuContainer = styled.div`
  width: 768px;
  display: flex;
  align-self: center;
`;
const TabMenu = styled.ul`
  color: rgb(232, 234, 237);
  width: 500px;
  font-weight: bold;
  display: flex;
  align-items: center;
  list-style: none;
  margin-bottom: 64px;
  margin-top: 30px;

  .submenu {
    // 기본 Tabmenu 에 대한 CSS를 구현
    display: flex;
    width: 70px;
    height: 30px;
    padding: 0 10px;
    font-size: 10px;
    transition: 0.5s;
    border: 1px solid rgb(223, 214, 210);
    border-radius: 10px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    margin-right: 16px;
    color: #495057;
  }

  .focused {
    //선택된 Tabmenu 에만 적용되는 CSS를 구현
    background-color: rgb(193, 159, 138);
    color: white;
  }
`;

const Detail = () => {
  const { product_no } = useParams();
  const { isLogin, userNum } = useContext(UserContext); // 로그인 관리를 위한 Context API
  const [isProductLiked, setProductLiked] = useState(false);
  const [productDetail, setProductDetail] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const tabMenuRef = useRef();
  const navigate = useNavigate();

  // 술 상세정보 조회
  useEffect(() => {
    const productDetail = async () => {
      try {
        const rsp = await AxiosApi.ProductInfo(product_no);
        if (rsp) setProductDetail(rsp);
        console.log(rsp);
        console.log(product_no);
      } catch (error) {
        console.error("실패!!", error);
      }
    };
    productDetail();
  }, [product_no]);


  // 구매처 링크 이동
const handleCartButtonClick = (link) => {
  window.open(link, '_blank');
};

  const menuArr = [
    { name: "상세정보", content: "Tab menu ONE" },
    { name: "리뷰", content: "Tab menu TWO" },
  ];

  const selectMenuHandler = (index) => {
    setCurrentTab(index);
    // 탭 메뉴로 스크롤 이동
    const tabMenuElement = tabMenuRef.current[index];
    if (tabMenuElement) {
      tabMenuElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const InsertLikeProduct = async () => {
  console.log(product_no);
  console.log(userNum);
  try {
    const response = await AxiosApi.insertProduct(product_no, userNum);
    if (response.data === true) {
      console.log(response.data);
      setProductLiked(true); // 제품이 추가되었으므로 상태를 true로 업데이트합니다.
    } else {
      console.log(response.data);
    }
  } catch (error) {
    console.error("실패!!", error);
  };
  };
  useEffect(() => {
    const checkHeart = async() => {
      const response = await AxiosApi.getCheckHeart(product_no, userNum);
      if(response.data === true) {
        setProductLiked(true);
      } else {
        setProductLiked(false);
      }
    };
    checkHeart();
  },[])
    const deleteHeart = async() => {
      const response = await AxiosApi.postDeleteHeart(product_no, userNum);
      if(response.data === true) {
        setProductLiked(false);
        console.log(response.data);
      } else {
        setProductLiked(true);
      }
    };
  return (
    <Container>
      <HeaderDesign />
      <BodyContainer>
        {productDetail.map((detail) => (
          <Content key={detail.product_no}>
            <Productimg>
              <Products src={detail.product_img} alt="얼떨결에퍼플" />
            </Productimg>
            <ProductDetail>
              <h1>{detail.product_name}</h1>
              <p>{detail.content1}</p>
              <p>{detail.content2}</p>
              <Category>
                <li className="item1">주종 : {detail.genre}</li>
                <li className="item1">도수 : {detail.alcoholp}</li>
                <li className="item1">용량 : {detail.capacity}</li>
              </Category>
              <Btn>
            {isLogin ? (<button type="button" id="revbtn"
            onClick={()=>navigate(`/InsertReview/${product_no}`)}><ModeEditOutlineIcon fontSize="small"/>한줄평</button>)
            : (<button type="button" id="revbtn"
            onClick={()=>navigate("/Login")}><ModeEditOutlineIcon fontSize="small"/>한줄평</button>)}
             <button type="button" id="cartbtn"
             onClick={()=>handleCartButtonClick(detail.store_link)}>구매처 링크</button>
              {isProductLiked?(<button onClick={deleteHeart} type="button" className={isProductLiked ? "liked" : "likebtn"}>
                <FavoriteIcon />
                </button>):(<button onClick={InsertLikeProduct} type="button" className={isProductLiked ? "liked" : "likebtn"}>
                <FavoriteIcon />
                </button>)}
            </Btn>
            </ProductDetail>
          </Content>
        ))}

        <TabMenuContainer ref={tabMenuRef}>
          <TabMenu>
            {menuArr.map((el, index) => (
              <li
                className={index === currentTab ? "submenu focused" : "submenu"}
                onClick={() => selectMenuHandler(index)}
              >
                {el.name}
              </li>
            ))}
          </TabMenu>
        </TabMenuContainer>

        {currentTab === 0 &&
          productDetail.map((detail) => (
            <Productcontent key={detail.product_no}>
              <Point src={detail.description_img} alt="핵심포인트" />
            </Productcontent>
          ))}

        {currentTab === 1 && (
          <Review></Review>
        )}
      </BodyContainer>
    </Container>
  );
};

export default Detail;
