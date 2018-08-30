package com.example.mike.momonga;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.Gravity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.example.mike.momonga.ui.settings.SettingsActivity;

public class SingUpActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sing_up);

        Toolbar toolbar = findViewById(R.id.toolbar_activity);
        setSupportActionBar(toolbar);

        Button buttonSingUp = findViewById(R.id.sign_up_activity_button_sign_up);
        Button buttonCancel = findViewById(R.id.sign_up_activity_button_cancel);

        buttonSingUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SingUp();
            }
        });

        buttonCancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SingUpActivity.this.finish();
            }
        });
    }

    private void SingUp(){
        Toast toast = Toast.makeText(SingUpActivity.this, R.string.login_failed, Toast.LENGTH_SHORT);
        toast.setGravity(Gravity.CENTER, 0, 0);
        toast.show();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu pMenu) {
        return ApplicationMenu.getInstance().onCreateOptionsMenu(SingUpActivity.this, pMenu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem pMenu) {
        return ApplicationMenu.getInstance().onOptionsItemSelected(SingUpActivity.this, pMenu);
    }

}
