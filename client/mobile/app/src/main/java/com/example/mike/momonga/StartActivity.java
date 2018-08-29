package com.example.mike.momonga;

import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.preference.PreferenceManager;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;

import com.example.mike.momonga.api.APIService;
import com.example.mike.momonga.ui.settings.SettingsActivity;

public class StartActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_start);

        SharedPreferences   preferences = PreferenceManager.getDefaultSharedPreferences(this);
        String              api_url     = preferences.getString("api_url",null);
        if(api_url == null) {
            api_url = getResources().getString(R.string.default_api_url);
        }
        APIService.setBaseURL(api_url);

        Button buttonLogIn  = findViewById(R.id.button_login);
        Button buttonSingUp = findViewById(R.id.button_sing_up);

        buttonLogIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(StartActivity.this, LogInActivity.class);
                startActivity(intent);
            }
        });

        buttonSingUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(StartActivity.this, SingUpActivity.class);
                startActivity(intent);
            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        super.onCreateOptionsMenu(menu);
        getMenuInflater().inflate(R.menu.main_menu, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        Intent intent = null;
        switch (item.getItemId()){
            case R.id.main_menu_settings:
                intent = new Intent(StartActivity.this, SettingsActivity.class);
                startActivity(intent);
                break;
            case R.id.main_menu_change_user:
                intent = new Intent(StartActivity.this, LogInActivity.class);
                startActivity(intent);
                break;
            case R.id.main_menu_sign_up:
                intent = new Intent(StartActivity.this, SingUpActivity.class);
                startActivity(intent);
                break;
            default: return super.onOptionsItemSelected(item);
        }
        return true;
    }
}
