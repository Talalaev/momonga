package com.example.mike.momonga.api;

import java.util.concurrent.TimeUnit;

import okhttp3.OkHttpClient;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class APIService {

    private static APIInterface sInstance           = null;
    private static String       sBaseURL            = null;
    private static int          sConnectionTimeout  = 5;

    public static void setBaseURL(String pBaseURL) {
        sBaseURL    = pBaseURL;
        sInstance   = null;
    }

    public static void setConnectionTimeout(int pConnectionTimeout) {
        sConnectionTimeout = pConnectionTimeout;
        sInstance = null;
    }

    public static APIInterface getInstance() {
        if (sInstance == null) {
            OkHttpClient client = new OkHttpClient.Builder()
                .connectTimeout(sConnectionTimeout  , TimeUnit.SECONDS)
                .build();
            Retrofit retrofit = new retrofit2.Retrofit.Builder()
                .client(client)
                .baseUrl(sBaseURL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();
            sInstance = retrofit.create(APIInterface.class);
        }
        return sInstance;
    }
}
