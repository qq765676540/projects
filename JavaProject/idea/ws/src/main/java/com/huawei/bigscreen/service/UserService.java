package com.huawei.bigscreen.service;

import com.huawei.bigscreen.model.User;
import org.springframework.stereotype.Service;

import java.util.List;


public interface UserService {

    List<User> selectAll();

    User selectById(String id);
}
