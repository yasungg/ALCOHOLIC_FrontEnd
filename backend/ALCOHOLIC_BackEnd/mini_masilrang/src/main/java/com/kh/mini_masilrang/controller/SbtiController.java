package com.kh.mini_masilrang.controller;

import com.kh.mini_masilrang.dao.MemberDAO;
import com.kh.mini_masilrang.dao.SbtiQuestionDAO;
import com.kh.mini_masilrang.dao.SbtiResultDAO;
import com.kh.mini_masilrang.vo.MemberVO;
import com.kh.mini_masilrang.vo.SbtiQuestionVO;
import com.kh.mini_masilrang.vo.SbtiResultVO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// 프론트(3000)랑 백(8111)이랑 포트가 다른 것은 에러처리 하지 말도록 예외처리
@CrossOrigin(origins = "http://localhost:3000")
// rest 방식의 요청에 응답을 주겠다
@RestController
public class SbtiController {

    @GetMapping("/sbti")
    public ResponseEntity<List<SbtiQuestionVO>> questionList(@RequestParam Integer number) {
        System.out.println("질문 번호: " + number);
        SbtiQuestionDAO dao = new SbtiQuestionDAO();
        List<SbtiQuestionVO> list = dao.questionSelect(number);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/sbtirecommend")
    public  ResponseEntity<List<SbtiResultVO>> sbtiList(@RequestParam String cat) {
        System.out.println("카테고리: " + cat);
        SbtiResultDAO dao = new SbtiResultDAO();
        List<SbtiResultVO> list = dao.sbtiRecommend(cat);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

}

class SbtiUpdateRequest {
    private int user_no;
    private String user_sbti;

    public int getUser_no() {
        return user_no;
    }
    public void setUser_no(int user_no) {
        this.user_no = user_no;
    }

    public String getUser_sbti() {
        return user_sbti;
    }
    public void setUser_sbti(String user_sbti) {
        this.user_sbti = user_sbti;
    }
}
