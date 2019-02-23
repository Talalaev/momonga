package com.example.mike.momonga.api;

import com.example.mike.momonga.api.data.IsLoginTakenResponse;
import com.example.mike.momonga.api.data.LoginWithTokenRequest;
import com.example.mike.momonga.api.data.LoginWithTokenResponse;
import com.example.mike.momonga.api.data.SignUpRequest;
import com.example.mike.momonga.api.data.SignUpResponse;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Headers;
import retrofit2.http.POST;
import retrofit2.http.Query;

public interface APIInterface {
    @Headers({
        "accept: application/json",
        "Content-Type: application/json"
    })
    @POST("login-with-token")
    Call<LoginWithTokenResponse> LoginWithToken(@Body LoginWithTokenRequest pBody);

    @Headers({
        "accept: application/json"
    })
    @GET("auth-user")
    Call<LoginWithTokenResponse.User> AuthUser(@Query("token") String pToken);

    @Headers({
            "accept: application/json",
            "Content-Type: application/json"
    })
    @POST("register")
    Call<SignUpResponse> SignUp(@Body SignUpRequest pBody);

    @Headers({
            "accept: application/json"
    })
    @GET("is-login-taken")
    Call<IsLoginTakenResponse> IsLoginTaken(@Query("login") String pLogin);
}
