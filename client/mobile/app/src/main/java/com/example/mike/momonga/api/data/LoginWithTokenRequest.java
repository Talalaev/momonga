package com.example.mike.momonga.api.data;

public class LoginWithTokenRequest {
    public String email     = null;
    public String password  = null;

    public LoginWithTokenRequest(String pEmail, String pPassword) {
        email       = pEmail;
        password    = pPassword;
    }
}
