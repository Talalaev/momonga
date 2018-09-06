package com.example.mike.momonga.api.data;

public class LoginWithTokenResponse {
    public class User {
        public int     id                 = 0;
        public String  login              = null;
        public String  email              = null;
        public int     isAdmin            = 0;
        public int     currencyID         = 0;
        public int     countryID          = 0;
        public String  city               = null;
        public String  language           = null;
        public int     autoChangeLanguage = 0;
        public String  createdAt          = null;
        public String  updatedAt          = null;

        public User(
                int     pId,
                String  pLogin,
                String  pEmail,
                int     pIsAdmin,
                int     pCurrencyID,
                int     pCountryID,
                String  pCity,
                String  pLanguage,
                int     pAutoChangeLanguage,
                String  pCreatedAt,
                String  pUpdatedAt)
        {
            id                  = pId;
            login               = pLogin;
            email               = pEmail;
            isAdmin             = pIsAdmin;
            currencyID          = pCurrencyID;
            countryID           = pCountryID;
            city                = pCity;
            language            = pLanguage;
            autoChangeLanguage  = pAutoChangeLanguage;
            createdAt           = pCreatedAt;
            updatedAt           = pUpdatedAt;
        }
    }

    public User     user    = null;
    public String   token   = null;
}
