package kr.wonyoungpark.api.common.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
public class HomeController{
    @GetMapping("/")
    public String home(){
        return String.format("Web Service started at %s", new SimpleDateFormat("MM-dd HH:mm").format(new Date()));
    }
}
