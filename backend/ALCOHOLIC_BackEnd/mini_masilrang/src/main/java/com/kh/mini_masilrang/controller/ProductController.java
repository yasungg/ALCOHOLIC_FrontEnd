package com.kh.mini_masilrang.controller;

import com.kh.mini_masilrang.dao.ProductDAO;
import com.kh.mini_masilrang.vo.ProductVO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ProductController {
    // 체크박스별 검색
    @GetMapping("/checked")
    public ResponseEntity<List<ProductVO>> productGet(@RequestParam String checked) {
        ProductDAO dao = new ProductDAO();
        List<ProductVO> list1 = dao.productFind(checked);
        return new ResponseEntity<>(list1, HttpStatus.OK);
    }
    @GetMapping("/theme")
    public ResponseEntity<List<ProductVO>> productThemeGet(@RequestParam String theme) {
        ProductDAO dao = new ProductDAO();
        List<ProductVO> list2 = dao.productThemeFind(theme);
        return new ResponseEntity<>(list2, HttpStatus.OK);
    }

    @GetMapping("/product")
    public ResponseEntity<List<ProductVO>> ProductInfo(@RequestParam int product) {
        ProductDAO dao = new ProductDAO();
        List<ProductVO> list = dao.ProductInfo(product);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
