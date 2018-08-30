package com.example.mike.momonga.ui.settings;

import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.preference.PreferenceManager;

public class ApplicationSettings {
    public static final String USER_TOKEN   = "user_token";
    public static final String API_URL      = "api_url";

    public static String getString(AppCompatActivity pActivity, String pKey){
        SharedPreferences preferences =  PreferenceManager.getDefaultSharedPreferences(pActivity);
        return preferences.getString(pKey,null);
    }

    public static void setString(AppCompatActivity pActivity, String pKey, String pValue){
        SharedPreferences preferences =  PreferenceManager.getDefaultSharedPreferences(pActivity);
        SharedPreferences.Editor editor = preferences.edit();
        editor.putString(pKey, pValue);
        editor.apply();
    }

    public static void remove(AppCompatActivity pActivity, String pKey){
        SharedPreferences preferences =  PreferenceManager.getDefaultSharedPreferences(pActivity);
        SharedPreferences.Editor editor = preferences.edit();
        editor.remove(pKey);
        editor.apply();
    }
}
