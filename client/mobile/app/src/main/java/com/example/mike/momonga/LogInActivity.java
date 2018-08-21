package com.example.mike.momonga;

import android.app.Activity;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class LogInActivity extends AppCompatActivity {

    Button mButtonLogIn = null;
    Button mButtonCancel = null;
    EditText mEditTextUserName = null;
    EditText mEditTextPassword = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_log_in);

        mButtonLogIn = findViewById(R.id.loginactivity_button_login);
        mButtonCancel = findViewById(R.id.loginactivity_button_cancel);
        mEditTextUserName = findViewById(R.id.loginactivity_edittext_login);
        mEditTextUserName = findViewById(R.id.loginactivity_edittext_password);

        mButtonLogIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                LogIn();
            }
        });

        mButtonCancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                LogInActivity.this.finish();
            }
        });
    }

    private void LogIn(){
        Toast toast = Toast.makeText(LogInActivity.this, R.string.string_login_failed, Toast.LENGTH_SHORT);
        toast.setGravity(Gravity.CENTER, 0, 0);
        toast.show();
    }
}
