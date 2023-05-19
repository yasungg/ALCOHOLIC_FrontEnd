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
    return await axios.get(KH_DOMAIN + `/search?productname=${productname}`);
  },
  sbtiQuestion: async (number) => {
    return await axios.get(KH_DOMAIN + `/sbti?number=${number}`);
  },
  userNumber: async (no) => {
    return await axios.get(KH_DOMAIN + `/user?no=${no}`);
  },
  sbtiUpdate: async (no, sbti) => {
    const member = {
      user_no: no,
      user_sbti: sbti,
    };
    return await axios.post(KH_DOMAIN + "/sbtiupdate", member);
  },
  sbtiRecommend: async (category) => {
    return await axios.get(KH_DOMAIN + `/sbtirecommend?cat=${category}`);
  },
};
export default AxiosApi;
