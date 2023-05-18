package com.user.user.dao;

import com.user.user.common.Common;
import com.user.user.vo.MemberVO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class MemberDAO {
    private Connection conn = null;
    private Statement stmt = null;
    private ResultSet rs = null;
    private PreparedStatement pStmt = null;

    // 로그인 체크
    public boolean loginCheck(String user_id, String user_pw) {
        try {
            conn = Common.getConnection();
            stmt = conn.createStatement(); // Statement 객체 얻기
            String sql = "SELECT * FROM MEMBER_INFO WHERE USER_ID = " + "'" + user_id + "'";
            rs = stmt.executeQuery(sql);

            while(rs.next()) { // 읽을 데이타가 있으면 true
                String sqlId = rs.getString("USER_ID"); // 쿼리문 수행 결과에서 ID값을 가져 옴
                String sqlPwd = rs.getString("USER_PW");
                System.out.println("ID : " + sqlId);
                System.out.println("PWD : " + sqlPwd);
                if(user_id.equals(sqlId) && user_pw.equals(sqlPwd)) {
                    Common.close(rs);
                    Common.close(stmt);
                    Common.close(conn);
                    return true;
                }
            }
            Common.close(rs);
            Common.close(stmt);
            Common.close(conn);
        } catch(Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    // 회원 가입
    public boolean memberRegister(String user_id, String user_pw, String user_name, String user_jumin, String user_email,String user_phone) {
        int result = 0;
        String sql = "INSERT INTO MEMBER_INFO(USER_NO, USER_ID, USER_PW, USER_NAME, USER_JUMIN, USER_EMAIL, USER_PHONE, USER_SBTI) VALUES(10000005,?, ?, ?, ?, ?, ?,NULL)";
        try {
            conn = Common.getConnection();
            pStmt = conn.prepareStatement(sql);
            pStmt.setString(1, user_id);
            pStmt.setString(2, user_pw);
            pStmt.setString(3, user_name);
            pStmt.setString(4, user_jumin);
            pStmt.setString(5, user_email);
            pStmt.setString(6, user_phone);
            result = pStmt.executeUpdate();
            System.out.println("회원 가입 DB 결과 확인 : " + result);

        } catch (Exception e) {
            e.printStackTrace();
        }
        Common.close(pStmt);
        Common.close(conn);

        if(result == 1) return true;
        else return false;
    }
    // 아이디 중복 여부 확인
    public boolean MemberCheck(String id) {
        boolean isNotReg = false;
        try {
            conn = Common.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT * FROM MEMBER_INFO WHERE USER_ID = " + "'" + id +"'";
            rs = stmt.executeQuery(sql);
            if(rs.next()) isNotReg = false;
            else isNotReg = true;
        } catch(Exception e) {
            e.printStackTrace();
        }
        Common.close(rs);
        Common.close(stmt);
        Common.close(conn);
        return isNotReg; // 가입 되어 있으면 false, 가입이 안되어 있으면 true
    }

    // 아이디 찾기
    public List<MemberVO> idSelect(String getEmail) {
        List<MemberVO> list = new ArrayList<>();
        try {
            conn = Common.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT USER_ID FROM MEMBER_INFO WHERE USER_EMAIL = " + "'" + getEmail + "'";
            rs = stmt.executeQuery(sql);

            while(rs.next()) {
                String id = rs.getString("USER_ID");
                MemberVO vo = new MemberVO();
                vo.setUser_id(id);;
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
    // 비밀번호 찾기
    public List<MemberVO> pwSelect(String getId) {
        List<MemberVO> list = new ArrayList<>();
        try {
            conn = Common.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT USER_PW FROM MEMBER_INFO WHERE USER_ID = " + "'" + getId + "'";
            rs = stmt.executeQuery(sql);

            while(rs.next()) {
                String pw = rs.getString("USER_PW");
                MemberVO vo = new MemberVO();
                vo.setUser_pw(pw);;
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

    public boolean memberUpdate(String user_pw, String user_name, String user_jumin, String user_email, String user_phone, String user_id) {
        int result = 0;
        String sql = "UPDATE FROM MEMBER_INFO SET USER_PW = ?, USER_NAME = ?, USER_JUMIN = ?, USER_EMAIL = ?, USER_PHONE = ?  WHERE USER_ID = ?";

        try {
            conn = Common.getConnection();
            pStmt = conn.prepareStatement(sql);
            pStmt.setString(1, user_pw);
            pStmt.setString(2, user_name);
            pStmt.setString(3, user_jumin);
            pStmt.setString(4, user_email);
            pStmt.setString(5, user_phone);
            pStmt.setString(6, user_id);
            result = pStmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
        Common.close(pStmt);
        Common.close(conn);
        if(result == 1) return true;
        else return false;
    }
}
