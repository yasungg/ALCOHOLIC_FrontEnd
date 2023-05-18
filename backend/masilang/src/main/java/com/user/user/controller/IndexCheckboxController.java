package com.user.user.controller;

import com.user.user.dao.IndexCheckboxDAO;
import com.user.user.vo.IndexCheckboxVO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class IndexCheckboxController {
    // 체크박스별 검색
    @GetMapping("/checked")
    public ResponseEntity<List<IndexCheckboxVO>> productGet(@RequestParam String checked) {
        IndexCheckboxDAO dao = new IndexCheckboxDAO();
        List<IndexCheckboxVO> list = dao.productFind(checked);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
