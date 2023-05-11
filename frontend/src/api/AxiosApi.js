import axios from "axios";
const KH_DOMAIN = "http://localhost:8111";


const AxiosApi = {
// 로그인 
memberLogin : async(id, pw) => {
    const login = {
        user_id : id,
        user_pw : pw
    };
        return await axios.post(KH_DOMAIN + "/login", login);
    },
// 회원 가입
MemberSign : async(id, pw, name, jumin, email, phone) => {
    const member ={
        user_id : id,
        user_pw: pw,
        user_name: name,
        user_jumin : jumin,
        user_email: email,
        user_phone: phone
    };
    return await axios.post(KH_DOMAIN + "/new", member);
},
IdCheck : async(id) => {
    return await axios.get(KH_DOMAIN + `/check?id=${id}`)
},
IdGet: async(email) => {
    return await axios.get(KH_DOMAIN + `/memberId?email=${email}`)
}, 
PwGet: async(id) => {
    return await axios.get(KH_DOMAIN + `/memberPw?id=${id}`)
}, 
MemberUpdate : async(pw, name, jumin, email, phone) => {
    const update = {
        user_pw : pw,
        user_name : name,
        user_jumin : jumin,
        user_email : email,
        user_phone : phone
    };
    return await axios.post(KH_DOMAIN + "/update", update)
}

};
export default AxiosApi;