package com.kh.mini_masilrang.controller;


import com.kh.mini_masilrang.dao.EventDAO;
import com.kh.mini_masilrang.vo.EventVO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class EventController {

    // GET : 진행중인 이벤트 조회
    @GetMapping("/event")
    public ResponseEntity<List<EventVO>> eventList(@RequestParam String eventname) {
        System.out.println("EVENT_NAME : " + eventname);
        EventDAO dao = new EventDAO();
        List<EventVO> list = dao.EventSelect(eventname);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // GET : 종료된 이벤트 조회
    @GetMapping("/dEvent")
    public ResponseEntity<List<EventVO>> doneEventList(@RequestParam String eventname) {
        System.out.println("EVENT_NAME : " + eventname);
        EventDAO dao = new EventDAO();
        List<EventVO> list = dao.DoneEventSelect(eventname);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
