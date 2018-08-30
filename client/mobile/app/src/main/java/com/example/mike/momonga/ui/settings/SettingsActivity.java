package com.example.mike.momonga.ui.settings;

import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.preference.PreferenceManager;

import com.example.mike.momonga.ApplicationToolbar;
import com.example.mike.momonga.R;
import com.example.mike.momonga.api.APIService;

public class SettingsActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_settings);

        ApplicationToolbar.addToolbar(this);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this);
        String            api_url     = preferences.getString("api_url",null);
        if(api_url == null) {
            api_url = getResources().getString(R.string.default_api_url);
        }
        APIService.setBaseURL(api_url);
    }
}
