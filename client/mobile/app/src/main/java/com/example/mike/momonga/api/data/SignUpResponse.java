package com.example.mike.momonga.api.data;

public class SignUpResponse {
    public class User{
        public String   password            = null;
        public int      isAdmin             = 0;
        public int      autoChangeLanguage  = 0;
        public int      id                  = 0;
        public String   login               = null;
        public String   email               = null;
        public String   updatedAt           = null;
        public String   createdAt           = null;

        public User(
            String pPassword,
            int pIsAdmin,
            int pAutoChangeLanguage,
            int pId, String pLogin,
            String pEmail,
            String pUpdatedAt,
            String pCreatedAt)
        {
            password            = pPassword;
            isAdmin             = pIsAdmin;
            autoChangeLanguage  = pAutoChangeLanguage;
            id                  = pId;
            login               = pLogin;
            email               = pEmail;
            updatedAt           = pUpdatedAt;
            createdAt           = pCreatedAt;
        }
    }

    public User     user    = null;
    public String   token   = null;

    public SignUpResponse(
        User pUser,
        String pToken)
    {
        user = pUser;
        token = pToken;
    }
}
