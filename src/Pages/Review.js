import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import { UserContext } from "../api/Context";

const Reviewbox = styled.div`
    width: 768px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-self: center;
    `;

const Reviews = styled.div`
    display: flex;
    flex-direction: column;
    align-self: center;
    margin-bottom: 20px;
    width: 700px;
    background-color : #edeae3;
    border-radius: 3px;

    `;

const Item1 = styled.div`
    height: auto;
    padding: 10px 30px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #aaa;
    `;

const Rid = styled.div`
align-self: center;

    
    
    `;

const Rdate = styled.div`
align-self: center;

        
    `;

const Item2 = styled.div`
    height: auto;
    padding: 20px 30px;
    display: flex;
    justify-content: flex-start;
    
    `;

const Rcontent = styled.div`
align-self: center;

`;

const Btn = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;

#editbtn {
    padding: 0 10px;
        text-align: center;
        width: 50px;
        height: 30px;
        margin-right: 10px;
        font-weight: bold;
        border-radius: 5px;
        color: #333;
        border: 1px solid #ddd;
        cursor: pointer;
        background-color: rgb(193, 159, 138);
        color: white;
}
#deletebtn {
    padding: 0 10px;
        text-align: center;
        width: 50px;
        height: 30px;
        margin-right: 10px;
        font-weight: bold;
        border-radius: 5px;
        color: #333;
        border: 1px solid #ddd;
        cursor: pointer;
        background-color: rgb(193, 159, 138);
        color: white;
    
}
`;
const ReviewImg = styled.img`
    width: 150px;
    height: 150px;
    margin-right: 32px;
`;

const Review = () => {
    const { product_no } = useParams();
    const { userNum, setProductNo  } = useContext(UserContext);
    const [review, setReview] = useState([]); // 리뷰 데이터 불러오기
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        const review = async() => {
        try {
            const rsp = await AxiosApi.productReview(product_no);
            if(rsp) setReview(rsp); 
            console.log(rsp);
            console.log(product_no);
            setProductNo(product_no);
        } catch(error) {
            console.log("실패!!", error);
        }
    };
        review();
        return (
            setLoad(false)
        )
    },[product_no, load]);

    const handleReviewDelete = async (e) => {
        console.log(e.target.value);
        try {
            const success = await AxiosApi.deleteReview(e.target.value);
            if (success) {
              console.log("리뷰 삭제 성공");
              console.log(success);
              setLoad(true);
              // 리뷰 작성 성공 시 추가적으로 수행할 작업을 여기에 추가하면 됩니다.
            } else {
              console.log("리뷰 삭제 실패");
              // 리뷰 작성 실패 시 추가적으로 수행할 작업을 여기에 추가하면 됩니다.
            }
          } catch (error) {
            console.error("오류 발생:", error);
            // 오류 발생 시 추가적으로 수행할 작업을 여기에 추가하면 됩니다.
          }
      };

    return(
        <Reviewbox>
            {review.map((rv)=>(
              <Reviews key={rv.product_no}>
                <Item1>
                  <Rid>{rv.user_id}</Rid>
                  <Rdate>{rv.rev_date}</Rdate>
                </Item1>
                <Item2>
                    <ReviewImg src={rv.rev_img}/>
                  <Rcontent>{rv.rev_content}</Rcontent>
                </Item2>
            <Btn>
            {userNum === rv.user_no ? 
            (   <>
                <button type="button" id="editbtn" value={rv.product_no} onClick={()=>navigate(`/UpdateReview/${rv.rev_no}`)}>수정</button>
                <button type="button" id="deletebtn" value={rv.rev_no}onClick={handleReviewDelete} >삭제</button>
                </>
            ) : (
                <></>
            )}
            </Btn>
               </Reviews>
                ))}
        </Reviewbox>
        )
        
};

export default Review;