package com.example.mike.momonga;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

public class SingUpActivity extends AppCompatActivity {

    private Button mButtonSingUp = null;
    private Button mButtonCancel = null;
    private TextView mTextViewLogIn = null;
    private TextView mTextViewEmail = null;
    private TextView mTextViewPassword = null;
    private TextView mTextViewPasswordConfirm = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sing_up);

        mButtonSingUp = findViewById(R.id.signupactivity_button_signup);
        mButtonCancel = findViewById(R.id.signupactivity_button_cancel);
        mTextViewLogIn = findViewById(R.id.signupactivity_edittext_login);
        mTextViewEmail = findViewById(R.id.signupactivity_edittext_email);
        mTextViewPassword = findViewById(R.id.signupactivity_edittext_password);
        mTextViewPasswordConfirm = findViewById(R.id.signupactivity_edittext_password_confirm);

        mButtonSingUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SingUp();
            }
        });

        mButtonCancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SingUpActivity.this.finish();
            }
        });
    }

    private void SingUp(){
        Toast toast = Toast.makeText(SingUpActivity.this, R.string.string_login_failed, Toast.LENGTH_SHORT);
        toast.setGravity(Gravity.CENTER, 0, 0);
        toast.show();
    }
}
