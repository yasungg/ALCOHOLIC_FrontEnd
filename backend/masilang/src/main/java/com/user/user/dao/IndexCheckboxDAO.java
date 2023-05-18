package com.user.user.dao;

import com.user.user.common.Common;
import com.user.user.vo.IndexCheckboxVO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class IndexCheckboxDAO {
    private Connection conn = null;
    private Statement stmt = null;
    private PreparedStatement pStmt = null;
    private ResultSet rs = null;

    //체크박스 선택 시 정보 받아오기
    public List<IndexCheckboxVO> productFind(String checked) {
    List<IndexCheckboxVO> list = new ArrayList<>();
    try {
        conn = Common.getConnection();

        String sql = "SELECT PRODUCT_NAME, CONTENT1, CONTENT2 FROM PRODUCT WHERE GENRE = ?";
        pStmt = conn.prepareStatement(sql);
        pStmt.setString(1, checked);
        rs = pStmt.executeQuery();
        while(rs.next()) {
            IndexCheckboxVO vo = new IndexCheckboxVO();
            String product_name = rs.getString("PRODUCT_NAME");
            String content1 = rs.getString("CONTENT1");
            String content2 = rs.getString("CONTENT2");
            vo.setProduct_name(product_name);
            vo.setContent1(content1);
            vo.setContent2(content2);
            list.add(vo);
        }
        Common.close(rs);
        Common.close(pStmt);
        Common.close(conn);
    } catch(Exception e) {
        e.printStackTrace();
    }
    return list;
    }
}
