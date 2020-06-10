package com.huawei.bigscreen.service.impl;

import com.huawei.bigscreen.mapper.TestMapper;
import com.huawei.bigscreen.model.User;
import com.huawei.bigscreen.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserImpl implements UserService {

    @Autowired
    private TestMapper tm;

    @Override
    public List<User> selectAll() {
        return tm.getAllUser();
    }

    @Override
    public User selectById(String id) {
        return tm.getUserById(id);
    }
}
