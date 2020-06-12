package com.huawei.bigscreen.controller;

import com.huawei.bigscreen.service.UserService;
import com.huawei.bigscreen.wsserver.WsMainPage;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
public class BigScreenController {


    @Resource
    private UserService us;

    @GetMapping(value = "/hello")
    public String hello() {
        return "hello";
    }

    @RequestMapping(value = "/api/getAllUser")
    public Map<String, Object> getAllUser() {
        Map<String, Object> map = new HashMap<>();
        map.put("UserList",us.selectAll());
        return map;
    }

    @RequestMapping(value = "/api/getUserById")
    public String getAllUser(String id) {
        Map<String, Object> map = new HashMap<>();
        map.put("UserList",us.selectById(id));
        JSONObject json = new JSONObject(map);
        return json.toString();
    }

    @RequestMapping(value = "/ws/sendMainPage")
    public String sendMainPage() {
        WsMainPage wmp = new WsMainPage();
        try {
            wmp.BroadCastInfo();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "Ok";
    }
    // 定时更新任务
    @Scheduled(cron = "${refreshCron}")
    public void refreshTask() {
        WsMainPage wmp = new WsMainPage();
        try {
            wmp.BroadCastInfo();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


}
