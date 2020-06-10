package com.huawei.bigscreen.mapper;

import com.huawei.bigscreen.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface TestMapper {

    @Select("select account_id,username from view_um_user")
    List<User> getAllUser();

    @Select("select account_id,username from view_um_user where account_id = #{id}")
    User getUserById(String id);

}
