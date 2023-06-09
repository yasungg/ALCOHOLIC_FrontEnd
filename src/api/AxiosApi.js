import axios from "axios";
const KH_DOMAIN = "http://localhost:8111";

const AxiosApi = {
  // 로그인
  memberLogin: async (id, pw) => {
    const login = {
      user_id: id,
      user_pw: pw,
    };
    return await axios.post(KH_DOMAIN + "/login", login);
  },
  //로그인 시 회원정보 불러오기
  memberGet: async (id) => {
    return await axios.get(KH_DOMAIN + `/getMember?id=${id}`);
  },
  // 회원 가입
  MemberSign: async (id, pw, name, jumin, email, phone) => {
    const member = {
      user_id: id,
      user_pw: pw,
      user_name: name,
      user_jumin: jumin,
      user_email: email,
      user_phone: phone,
    };
    return await axios.post(KH_DOMAIN + "/new", member);
  },
  IdCheck: async (id) => {
    return await axios.get(KH_DOMAIN + `/check?id=${id}`);
  },
  IdGet: async (email) => {
    return await axios.get(KH_DOMAIN + `/memberId?email=${email}`);
  },
  PwGet: async (id) => {
    return await axios.get(KH_DOMAIN + `/memberPw?id=${id}`);
  },
  MemberUpdate: async (pw, name, jumin, email, phone) => {
    const update = {
      user_pw: pw,
      user_name: name,
      user_jumin: jumin,
      user_email: email,
      user_phone: phone,
    };
    return await axios.post(KH_DOMAIN + "/update", update);
  },
  // MemberInfo: async (userNum) => {
  //   try {
  //     const numResponse = await axios.get(
  //       KH_DOMAIN + `/user?usernum=${userNum}`
  //     );
  //     return numResponse.data;
  //   } catch(error) {
  //     console.error("AxiosApi.MemberInfo error", error);
  //     return null;
  //   }
  // },
  Checked: async (checked) => {
    try {
      const response = await axios.get(
        KH_DOMAIN + `/checked?checked=${checked}`
      );
      return response.data;
    } catch (error) {
      console.error("데이터 전송 실패!!", error);
      return null;
    }
  },
  ThemeChecked: async (theme) => {
    try {
      const themeResponse = await axios.get(
        KH_DOMAIN + `/theme?theme=${theme}`
      );
      return themeResponse.data;
    } catch (error) {
      console.error("데이터 전송 실패!!", error);
      return null;
    }
  },
  // 술 상세정보 가져오기
  ProductInfo: async (product) => {
    try {
      const productInfoResponse = await axios.get(
        KH_DOMAIN + `/product?product=${product}`
      );
      return productInfoResponse.data;
    } catch (error) {
      console.error("연결 실패!!", error);
    }
  },
  // 진행중인 이벤트 조회
  eventGet: async (eventname) => {
    return await axios.get(KH_DOMAIN + `/event?eventname=${eventname}`);
  },
  // 종료된 이벤트 조회
  doneEventGet: async (eventname) => {
    return await axios.get(KH_DOMAIN + `/dEvent?eventname=${eventname}`);
  },
  // 상품 검색
  searchResultGet: async (productname) => {
    try {
      const searchResultRsp = axios.get(
        KH_DOMAIN + `/search?productname=${productname}`
      );
      return (await searchResultRsp).data;
    } catch (error) {
      console.error("검색 결과 불러오기 실패!!", error);
    }
  },

  // GET: sbiti 질문 번호에 맞는 질문 내용과 결과값 받아옴
  sbtiQuestion: async (number) => {
    return await axios.get(KH_DOMAIN + `/sbti?number=${number}`);
  },
  // GET: 사용자 전체 정보 조회
  userNumber: async (no) => {
    return await axios.get(KH_DOMAIN + `/user?no=${no}`);
  },
  // POST: sbti 결과를 MEMBER_INFO 테이블에 update
  sbtiUpdate: async (no, sbti) => {
    const member = {
      user_no: no,
      user_sbti: sbti,
    };
    return await axios.post(KH_DOMAIN + "/sbtiupdate", member);
  },
  // GET: sbti 결과에 맞는 추천 상품 목록 받아옴
  sbtiRecommend: async (category) => {
    return await axios.get(KH_DOMAIN + `/sbtirecommend?cat=${category}`);
  },
  
   //메인 상품
  mainProductGet : async(thema) => {
    return await axios.get(KH_DOMAIN + `/mainProduct?thema=${thema}`)
  },
  //메인 상품2
  mainProductGet2 : async(thema) => {
    return await axios.get(KH_DOMAIN + `/mainProduct2?thema=${thema}`)
  },
  //프로필 업데이트
  uploadProfileImage : async(url, userNum) => {
    const profileImage = {
      url : url,
      userNum : userNum
    };
    return await axios.post(KH_DOMAIN + "/profileImageUpload", profileImage);
  },
  // 관심 상품 추가
  insertProduct : async(userNum, productNum) => {
    const likeProduct = {
      userNum : userNum,
      productNum : productNum,
    };
    return await axios.post(KH_DOMAIN + "/insertLikeProduct", likeProduct);
  },
  // 관심 상품 보여주기
  likeProductGet : async(userNo) => {
    return await axios.get(KH_DOMAIN + `/likeProduct?userNo=${userNo}`)
  },
  // 관심 상품 하트 표시
  getCheckHeart : async(product_no, userNum) => {
    return await axios.get(KH_DOMAIN+ `/checkHeart?product_no=${product_no}&userNum=${userNum}`)
  },
  // 관심 상품 하트 삭제
  postDeleteHeart : async(product_no, userNum) => {
    const deleteHeart = {
      productNo : product_no,
      userNum : userNum
    };
    return await axios.post(KH_DOMAIN+ "/deleteHeart", deleteHeart);
  },
// 해당 술 리뷰 가져오기
productReview : async(product)=>{
  try{
    const productReviewResponse = await axios.get(
      KH_DOMAIN + `/product/review?product=${product}`
    );
    console.log(productReviewResponse);
    console.log(productReviewResponse.data);
    return productReviewResponse.data;
  } catch(error) {
    console.error("연결 실패!!", error);
  }
  },

// 리뷰 작성
insertReview : async(user_no, rev_content, rev_img, product_no) => {
try {
  const rsp = await axios.post(KH_DOMAIN + "/product/insertReview", {
    user_no : user_no,
    rev_content : rev_content,
    rev_img : rev_img,
    product : product_no
  });
  console.log(rsp.data);
  return rsp.data
} catch(error) {
  console.error("실패");
  console.log(user_no, rev_content, rev_img, product_no);
  return false;
}
},
// 리뷰 수정
updateReview: async (rev_no, rev_content, rev_img) => {
try {
  const rsp = await axios.post(KH_DOMAIN + "/updateReview", {
    rev_no : rev_no,
    rev_content : rev_content,
    rev_img : rev_img
  });
  return rsp.data;
} catch (error) {
  console.error("리뷰 수정에 실패했습니다.", error);
  console.log(rev_no, rev_content);
  return false;
}
},

// 리뷰 삭제
deleteReview: async (rev_no) => {
try {
  const rsp = await axios.get(
    KH_DOMAIN + `/deleteReview?rev_no=${rev_no}`
  );
  return rsp.data;
} catch (error) {
  console.error("리뷰 삭제에 실패했습니다.", error);
  console.log(rev_no);
  return false;
  }
},

// 마이페이지 리뷰 조회
  myReview : async(userNo) => {
    return await axios.get(KH_DOMAIN + `/myReview?userNo=${userNo}`)
  }
    };
export default AxiosApi;
