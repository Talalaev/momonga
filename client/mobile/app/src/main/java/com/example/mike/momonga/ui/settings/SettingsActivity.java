package com.example.mike.momonga.ui.settings;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.example.mike.momonga.ApplicationToolbar;
import com.example.mike.momonga.LogInActivity;
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
        String api_url = ApplicationSettings.getString(SettingsActivity.this, ApplicationSettings.API_URL);
        if(api_url == null) {
            api_url = getResources().getString(R.string.default_api_url);
        }
        APIService.setBaseURL(api_url);
    }
}
