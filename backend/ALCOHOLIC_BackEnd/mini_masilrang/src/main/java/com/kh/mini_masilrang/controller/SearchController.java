package com.kh.mini_masilrang.controller;

import com.kh.mini_masilrang.dao.SearchDAO;
import com.kh.mini_masilrang.vo.ProductVO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
// GET: 검색 기능
public class SearchController {
    @GetMapping("/search")
    public ResponseEntity<List<ProductVO>> searchResultGet(@RequestParam String productname) {
        SearchDAO dao = new SearchDAO();
        List<ProductVO> list = dao.productSearch(productname);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}