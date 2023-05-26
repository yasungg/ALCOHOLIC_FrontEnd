
const REST_API_KEY = "1cf9a53a1b8146a84f0191b19e7f5d2a";
const REDIRECT_URI =  "http://localhost:3000/oauth/kakao/callback";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;