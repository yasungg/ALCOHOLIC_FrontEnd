package com.kh.mini_masilrang.dao;

import com.kh.mini_masilrang.common.Common;
import com.kh.mini_masilrang.vo.SbtiQuestionVO;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class SbtiQuestionDAO {
    private Connection conn = null;
    private Statement stmt = null;
    private ResultSet rs = null;
    private PreparedStatement pStmt = null;

    public List<SbtiQuestionVO> questionSelect(int getNumber) {
        List<SbtiQuestionVO> list = new ArrayList<>();
        try{
            conn = Common.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT * FROM SBTI_QA WHERE S_QUESTION_NUM = " + getNumber;
            rs = stmt.executeQuery(sql);

            while (rs.next()) {
                int number = rs.getInt("S_QUESTION_NUM");
                String question = rs.getString("S_QUESTION");
                String answer1 = rs.getString("S_ANSWER1");
                String answer2 = rs.getString("S_ANSWER2");

                SbtiQuestionVO vo = new SbtiQuestionVO();
                vo.setNumber(number);
                vo.setQuestion(question);
                vo.setAnswer1(answer1);
                vo.setAnswer2(answer2);
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
