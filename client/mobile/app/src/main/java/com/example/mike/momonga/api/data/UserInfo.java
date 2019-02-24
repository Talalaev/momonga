package com.example.mike.momonga.api.data;

public class UserInfo {
    public int     id                 = 0;
    public String  login              = null;
    public String  email              = null;
    public int     isAdmin            = 0;

    public UserInfo() {}

    public UserInfo(
        int pId,
        String pLogin,
        String pEmail,
        int pIsAdmin)
    {
        id      = pId;
        login   = pLogin;
        email   = pEmail;
        isAdmin = pIsAdmin;
    }
}
