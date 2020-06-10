package com.huawei.bigscreen.controller;

import com.huawei.bigscreen.mapper.TestMapper;
import com.huawei.bigscreen.model.User;
import com.huawei.bigscreen.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class BigscreenController {

    @Autowired
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
    public Map<String, Object> getAllUser(String id) {
        Map<String, Object> map = new HashMap<>();
        map.put("UserList",us.selectById(id));
        return map;
    }


}
