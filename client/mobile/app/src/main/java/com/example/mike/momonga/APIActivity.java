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

public interface APIActivity {
    default void showProgress(String pTitle){

        FrameLayout waitScreen      = ((AppCompatActivity)this).findViewById(R.id.wait_activity);
        TextView waitScreenTitle    = ((AppCompatActivity)this).findViewById(R.id.wait_activity_title);

        waitScreenTitle.setText(pTitle);
        waitScreen.setVisibility(View.VISIBLE);
    }

    default void hideProgress(){
        FrameLayout waitScreen = ((AppCompatActivity)this).findViewById(R.id.wait_activity);
        waitScreen.setVisibility(View.GONE);
    }

    default void saveUserData(UserInfo pUserInfo, String pToken){
        ApplicationSettings.setString((AppCompatActivity)this, ApplicationSettings.USER_TOKEN, pToken);
        ApplicationSettings.setString((AppCompatActivity)this, ApplicationSettings.USER_LOGIN, pUserInfo.login);
        ApplicationSettings.setString((AppCompatActivity)this, ApplicationSettings.USER_EMAIL, pUserInfo.email);
        ApplicationSettings.setBoolean((AppCompatActivity)this, ApplicationSettings.USER_IS_ADMIN,  pUserInfo.isAdmin > 0);
    }

    default void onError(Throwable pThrowable){
        onError("Error: " + pThrowable.getMessage());
    }

    default void onError(String pMessage){
        Toast toast = Toast.makeText((AppCompatActivity)this, pMessage, Toast.LENGTH_SHORT);
        toast.setGravity(Gravity.CENTER, 0, 0);
        toast.show();
    }

    default void startMainActivity(){
        Intent intent = new Intent((AppCompatActivity)this, MainActivity.class);
        ((AppCompatActivity)this).startActivity(intent);
        ((AppCompatActivity)this).finish();
    }
}
