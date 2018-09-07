package com.example.mike.momonga;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.view.Gravity;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.example.mike.momonga.api.data.UserInfo;
import com.example.mike.momonga.ui.settings.ApplicationSettings;

public class Tools {
    public static void showProgress(AppCompatActivity pActivity, String pTitle){

        FrameLayout waitScreen      = pActivity.findViewById(R.id.wait_activity);
        TextView waitScreenTitle    = pActivity.findViewById(R.id.wait_activity_title);

        waitScreenTitle.setText(pTitle);
        waitScreen.setVisibility(View.VISIBLE);
    }

    public static void hideProgress(AppCompatActivity pActivity){
        FrameLayout waitScreen = pActivity.findViewById(R.id.wait_activity);
        waitScreen.setVisibility(View.GONE);
    }

    public static void saveUserData(AppCompatActivity pActivity, UserInfo pUserInfo, String pToken){
        ApplicationSettings.setString(pActivity, ApplicationSettings.USER_TOKEN, pToken);
        ApplicationSettings.setString(pActivity, ApplicationSettings.USER_LOGIN, pUserInfo.login);
        ApplicationSettings.setString(pActivity, ApplicationSettings.USER_EMAIL, pUserInfo.email);
        ApplicationSettings.setBoolean(pActivity, ApplicationSettings.USER_IS_ADMIN,  pUserInfo.isAdmin > 0);
    }

    public static void onError(AppCompatActivity pActivity, Throwable pThrowable){
        onError(pActivity,"Error: " + pThrowable.getMessage());
    }

    public static void onError(AppCompatActivity pActivity, String pMessage){
        Toast toast = Toast.makeText(pActivity, pMessage, Toast.LENGTH_SHORT);
        toast.setGravity(Gravity.CENTER, 0, 0);
        toast.show();
    }

    public static void startMainActivity(AppCompatActivity pActivity){
        Intent intent = new Intent(pActivity, MainActivity.class);
        pActivity.startActivity(intent);
        pActivity.finish();
    }
}
