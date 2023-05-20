package com.kh.mini_masilrang.dao;

import com.kh.mini_masilrang.common.Common;
import com.kh.mini_masilrang.vo.SbtiResultVO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class SbtiResultDAO {
    private Connection conn = null;
    private Statement stmt = null;
    private ResultSet rs = null;
    private PreparedStatement pStmt = null;

    public List<SbtiResultVO> sbtiRecommend(String getCategory) {
        List<SbtiResultVO> list = new ArrayList<>();
        try {
            conn = Common.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT * FROM SBTI_RESULT WHERE RES_CATEGORY = " + "'" + getCategory + "'";
            rs = stmt.executeQuery(sql);

            while (rs.next()) {
                int number = rs.getInt("RES_NUM");
                String category = rs.getString("RES_CATEGORY");
                String recommend = rs.getString("RES_SUL");
                String img = rs.getString("RES_SUL_IMG");

                SbtiResultVO vo = new SbtiResultVO();
                vo.setNumber(number);
                vo.setCategory(category);
                vo.setRecommend(recommend);
                vo.setRecImg(img);
                list.add(vo);
            }
            Common.close(rs);
            Common.close(stmt);
            Common.close(conn);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

}
