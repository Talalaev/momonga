package com.example.mike.momonga;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Gravity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

public class SingUpActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sing_up);

        ApplicationToolbar.addToolbar(this);

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
        return ApplicationToolbar.getInstance().onCreateOptionsMenu(SingUpActivity.this, pMenu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem pMenu) {
        return ApplicationToolbar.getInstance().onOptionsItemSelected(SingUpActivity.this, pMenu);
    }

}
