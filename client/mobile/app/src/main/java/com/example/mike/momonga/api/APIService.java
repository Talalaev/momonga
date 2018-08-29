package com.example.mike.momonga.api;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class APIService {

    private static APIInterface sInstance   = null;
    private static String       sBaseURL    = null;

    public static void setBaseURL(String pBaseURL) {
        sBaseURL    = pBaseURL;
        sInstance   = null;
    }

    public static APIInterface getInstance() {
        if (sInstance == null) {
             Retrofit retrofit = new retrofit2.Retrofit.Builder()
                    .baseUrl(sBaseURL)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
            sInstance = retrofit.create(APIInterface.class);
        }
        return sInstance;
    }
}
