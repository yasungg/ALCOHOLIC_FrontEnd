package com.kh.mini_masilrang.dao;

import com.kh.mini_masilrang.common.Common;
import com.kh.mini_masilrang.vo.EventVO;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class EventDAO {
    private Connection conn = null;
    private Statement stmt = null;
    private ResultSet rs = null;
    private PreparedStatement pStmt = null;
    // 진행중인 이벤트 조회
    public List<EventVO> EventSelect(String getEventName) {
        List<EventVO> list = new ArrayList<>();
        try {
            conn = Common.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT * FROM EVENT WHERE EVENT_ENDDATE >= TRUNC(SYSDATE)";
            rs = stmt.executeQuery(sql);

            while(rs.next()) {
                String event_name = rs.getString("EVENT_NAME");
                String event_img = rs.getString("EVENT_IMG");
                Date event_enddate = rs.getDate("EVENT_ENDDATE");
                String event_url = rs.getString("EVENT_URL");

                EventVO vo = new EventVO();
                vo.setEvent_name(event_name);
                vo.setEvent_img(event_img);
                vo.setEvent_enddate(event_enddate);
                vo.setEvent_url(event_url);
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
    // 종료된 이벤트 조회
    public List<EventVO> DoneEventSelect(String getEventName) {
        List<EventVO> list = new ArrayList<>();
        try {
            conn = Common.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT * FROM EVENT WHERE EVENT_ENDDATE < TRUNC(SYSDATE)";
            rs = stmt.executeQuery(sql);

            while(rs.next()) {
                String event_name = rs.getString("EVENT_NAME");
                String event_img = rs.getString("EVENT_IMG");
                Date event_enddate = rs.getDate("EVENT_ENDDATE");
                String event_url = rs.getString("EVENT_URL");

                EventVO vo = new EventVO();
                vo.setEvent_name(event_name);
                vo.setEvent_img(event_img);
                vo.setEvent_enddate(event_enddate);
                vo.setEvent_url(event_url);
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
