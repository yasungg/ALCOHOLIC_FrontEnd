import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import AxiosApi from "../api/AxiosApi";
import { UserContext } from "../api/Context";
import HeaderDesign from "../HeaderDesign";

 const Container = styled.div`
 display: flex;
 width: 100%;
 flex-direction: column;
 `;
 const BodyContainer = styled.div`
 flex-direction: column;
 display: flex;
 width: 1024px;
 height: 500px;
 align-self: center;
 border: 1px;
 
 `;

const Contents = styled.div`
    width: 748px;
    align-self: center;
    display: flex;
    flex-flow: row;
    justify-content: space-around;
    margin-top: 30px;
    `;

const Productimg = styled.div`
        width: 300px;
        margin-right: 20px;
        background-color: red;
    `;

const Products = styled.img`
        width: 100%;
        height: 100%;
    `;

const ProductDetail = styled.div`
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
        padding-left:0; 
        margin-left:0;
        line-height: 1.8;
        padding-bottom: 20px;
        border-bottom: 1px solid #aaa;
        color: #aaa;
        font-weight: bold;
    `;


const Content = styled.div`
align-self: center;
margin-top: 20px;
margin-bottom: 20px;
  #content {
    width: 800px;
    height: 300px;
  }
`;

const Button = styled.button`
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
        align-self: center;
`;

const InsertReview = () => {
    const { product_no } = useParams();
    const [productDetail, setProductDetail] = useState([]);
    const [rev_content, setRevContent] = useState("");
    const { userNum } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(()=>{
        const productDetail = async() => {
        try {
            const rsp = await AxiosApi.ProductInfo(product_no);
            if(rsp) setProductDetail(rsp);
            console.log(rsp);
            console.log(product_no);
            } catch(error) {
            console.error("실패!!", error);
            }
        };
        productDetail();
    }, [product_no]);

      const handleReviewSubmit = async (e) => {
        
        try {
            const success = await AxiosApi.insertReview(userNum, rev_content, product_no);
            if (success) {
              console.log("리뷰 작성 성공");
              navigate(`/product/${product_no}`);

              // 리뷰 작성 성공 시 추가적으로 수행할 작업을 여기에 추가하면 됩니다.
            } else {
              console.log("리뷰 작성 실패");
              // 리뷰 작성 실패 시 추가적으로 수행할 작업을 여기에 추가하면 됩니다.
            }
          } catch (error) {
            console.error("오류 발생:", error);
            // 오류 발생 시 추가적으로 수행할 작업을 여기에 추가하면 됩니다.
          }
      };




    return(
      
        <Container>
          <HeaderDesign />
                <BodyContainer>
                {productDetail.map((detail) => (
         <Contents key={detail.product_no}>
            <Productimg>
             <Products src={detail.product_img} />
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
        </ProductDetail>
        </Contents>
        ))}  
                <Content>
                <input id="content" type="text" value={rev_content} 
                placeholder="한줄평을 작성해 주세요." onChange={(e) => setRevContent(e.target.value)} />
                </Content>
                <Button type="submit" onClick={handleReviewSubmit}>등록</Button>
            </BodyContainer>
        </Container>
    );
}

export default InsertReview;