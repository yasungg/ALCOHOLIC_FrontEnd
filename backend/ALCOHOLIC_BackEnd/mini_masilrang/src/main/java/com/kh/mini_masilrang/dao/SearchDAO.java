package com.kh.mini_masilrang.dao;

import com.kh.mini_masilrang.common.Common;
import com.kh.mini_masilrang.vo.ProductVO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class SearchDAO {

    private Connection conn = null;
    private Statement stmt = null;
    private ResultSet rs = null;
    private PreparedStatement pStmt = null;

    // 검색 기능
    public List<ProductVO> productSearch(String getProductName) {
        List<ProductVO> list = new ArrayList<>();
        try {
            conn = Common.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT * FROM PRODUCT WHERE PRODUCT_NAME LIKE '%" + getProductName + "%'" ;
            rs = stmt.executeQuery(sql);

            while(rs.next()) {
                int product_no = rs.getInt("PRODUCT_NO");
                String product_name = rs.getString("PRODUCT_NAME");
                String content1 = rs.getString("CONTENT1");
                String content2 = rs.getString("CONTENT2");
                String genre = rs.getString("GENRE");
                String alcoholp = rs.getString("ALCOHOLP");
                String capacity = rs.getString("STORE_LINK");
                String store_link = rs.getString("PRODUCT_IMG");
                String product_img = rs.getString("PRODUCT_IMG");
                String description_img = rs.getString("DESCRIPTION_IMG");
                String thema = rs.getString("THEMA1");
                ProductVO vo = new ProductVO();
                vo.setProduct_no(product_no);
                vo.setProduct_name(product_name);
                vo.setContent1(content1);
                vo.setContent2(content2);
                vo.setGenre(genre);
                vo.setAlcoholp(alcoholp);
                vo.setCapacity(capacity);
                vo.setStore_link(store_link);
                vo.setProduct_img(product_img);
                vo.setDescription_img(description_img);
                vo.setThema(thema);
                list.add(vo);
            }
            Common.close(rs);
            Common.close(stmt);
            Common.close(conn);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }
}