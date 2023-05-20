package com.kh.mini_masilrang.controller;

import com.kh.mini_masilrang.dao.MemberDAO;
import com.kh.mini_masilrang.vo.MemberVO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class MemberController {
    // POST : 회원 가입
    @PostMapping("/new")
    public ResponseEntity<Boolean> memberRegister(@RequestBody Map<String, String> regData) {
        String getId = regData.get("user_id");
        String getPwd = regData.get("user_pw");
        String getName = regData.get("user_name");
        String getJumin = regData.get("user_jumin");
        String getEmail = regData.get("user_email");
        String getPhone = regData.get("user_phone");
        MemberDAO dao = new MemberDAO();
        boolean isTrue = dao.memberRegister(getId, getPwd, getName, getJumin, getEmail, getPhone);
        return new ResponseEntity<>(isTrue, HttpStatus.OK);
    }
    //GET : 아이디 중복 확인
    @GetMapping("/check")
    public ResponseEntity<Boolean> memberCheck(@RequestParam String id) {
        MemberDAO dao = new MemberDAO();
        boolean isTrue = dao.MemberCheck(id);
        return new ResponseEntity<>(isTrue, HttpStatus.OK);
    }
    //GET: 아이디 찾기
    @GetMapping("/memberId")
    public ResponseEntity<List<MemberVO>> IdGet(@RequestParam String email) {
        MemberDAO dao = new MemberDAO();
        List<MemberVO> list = dao.idSelect(email);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    //GET: 비밀번호 찾기
    @GetMapping("/memberPw")
    public ResponseEntity<List<MemberVO>> PwGet(@RequestParam String id) {
        MemberDAO dao = new MemberDAO();
        List<MemberVO> list = dao.pwSelect(id);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // POST : 로그인
    @PostMapping("/login")
    public ResponseEntity<Boolean> memberLogin(@RequestBody Map<String, String> loginData) {
        String id = loginData.get("user_id");
        String pw = loginData.get("user_pw");
        MemberDAO dao = new MemberDAO();
        boolean result = dao.loginCheck(id, pw);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    // POST : 회원 정보 수정
    @PostMapping("/update")
    public ResponseEntity<Boolean> memberUpdate(@RequestBody Map<String, String> updateData) {
        String existPw = updateData.get("exist_pw");
        String updatePw = updateData.get("user_pw");
        String updateName = updateData.get("user_name");
        String updateJumin = updateData.get("user_jumin");
        String updateEmail = updateData.get("user_email");
        String updatePhone = updateData.get("user_phone");
        MemberDAO dao = new MemberDAO();
        boolean result = dao.memberUpdate(existPw, updatePw, updateName, updateJumin, updateEmail, updatePhone);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // GET: 개별 유저 정보 전체 조회
    @GetMapping("/user")
    public ResponseEntity<List<MemberVO>> memberList(@RequestParam Integer no) {
        System.out.println("유저 번호: " + no);
        MemberDAO dao = new MemberDAO();
        List<MemberVO> list = dao.memberSelect(no);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // Post: 유저 sbti 업데이트
    @PostMapping("/sbtiupdate")
    public ResponseEntity<Boolean> sbtiUpdate(@RequestBody SbtiUpdateRequest sbtiData) {
        int getId = sbtiData.getUser_no();
        String getSbtiRes = sbtiData.getUser_sbti();
        MemberDAO dao = new MemberDAO();
        boolean isTrue = dao.sbtiUpdate(getId, getSbtiRes);
        return new ResponseEntity<>(isTrue, HttpStatus.OK);
    }

}
