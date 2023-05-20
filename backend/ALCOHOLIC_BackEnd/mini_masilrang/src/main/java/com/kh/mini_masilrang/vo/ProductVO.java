package com.kh.mini_masilrang.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductVO {
    private int product_no; // 고유번호
    private String product_name; // 제품 이름
    private String content1; // 설명1
    private String content2; // 설명 2
    private String genre; // 주종
    private String alcoholp; // 도수
    private String capacity; // 용량
    private String store_link; // 구매처 링크
    private String product_img; // 이미지 링크
    private String description_img; // 제품 상세 설명 이미지
    private String thema; // 테마
}