package com.example.mike.momonga.api.data;

public class SignUpRequest {
    public String login     = null;
    public String email     = null;
    public String password  = null;

    public SignUpRequest(
        String pLogin,
        String pEmail,
        String pPassword)
    {
        login       = pLogin;
        email       = pEmail;
        password    = pPassword;
    }
}
