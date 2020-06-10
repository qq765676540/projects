package com.huawei.bigscreen.model;


public class User {
    private String account_id;
    private String username;

    public String getAccount_id() {
        return account_id;
    }

    public String getUsername() {
        return username;
    }

    public void setAccount_id(String account_id) {
        this.account_id = account_id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return "User{" +"id=" + account_id +", name='" + username + '\'' +'}';
    }
}
