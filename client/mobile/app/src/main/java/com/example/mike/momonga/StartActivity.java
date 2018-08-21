package com.example.mike.momonga;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class StartActivity extends AppCompatActivity {

    private Button mButtonLogIn = null;
    private Button mButtonSingUp = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_start);

        mButtonLogIn = findViewById(R.id.button_login);
        mButtonSingUp = findViewById(R.id.button_sing_up);

        mButtonLogIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(StartActivity.this, LogInActivity.class);
                startActivity(intent);
            }
        });

        mButtonSingUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(StartActivity.this, SingUpActivity.class);
                startActivity(intent);
            }
        });
    }
}
