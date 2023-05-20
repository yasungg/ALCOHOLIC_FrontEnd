package com.kh.mini_masilrang.vo;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class EventVO {
    private String event_name;
    private String event_progress;
    private String event_img;
    private Date event_enddate;
    private String event_url;
}
