package com.example.mike.momonga;

import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.preference.PreferenceManager;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.mike.momonga.api.APIService;
import com.example.mike.momonga.api.data.LoginWithTokenRequest;
import com.example.mike.momonga.api.data.LoginWithTokenResponse;
import com.example.mike.momonga.api.data.User;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LogInActivity extends AppCompatActivity {

    private EditText            mEditTextEmail      = null;
    private EditText            mEditTextPassword   = null;
    private SharedPreferences   mPreferences        = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_log_in);

        mPreferences =  PreferenceManager.getDefaultSharedPreferences(this);

        checkToken();

        mEditTextEmail      = findViewById(R.id.login_activity_edittext_email);
        mEditTextPassword   = findViewById(R.id.login_activity_edittext_password);

        Button buttonLogIn  = findViewById(R.id.login_activity_button_login);
        Button buttonCancel = findViewById(R.id.login_activity_button_cancel);

        buttonLogIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                LogIn();
            }
        });

        buttonCancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                LogInActivity.this.finish();
            }
        });
    }

    private void checkToken(){
        String token = mPreferences.getString("user_token", null);
        if(token != null){
            Call<User> call = APIService.getInstance().AuthUser(token);
            call.enqueue(new Callback<User>() {
                @Override
                public void onResponse(Call<User> pCall, Response<User> pResponse) {
                    if(pResponse.isSuccessful()) {
                        startMainActivity();
                    } else {
                        String message =
                            "Error: " +
                            Integer.toString(pResponse.code()) +
                            ", " +
                            pResponse.message().toString();
                        onError(message);
                    }
                }

                @Override
                public void onFailure(Call<User> pCall, Throwable pThrowable) {
                    onError(pThrowable);
                }
            });

        }
    }

    private void LogIn(){
        String email    = mEditTextEmail.getText().toString();
        String password = mEditTextPassword.getText().toString();
        Call<LoginWithTokenResponse> call = APIService.getInstance().LoginWithToken(new LoginWithTokenRequest(email, password));
        call.enqueue(new Callback<LoginWithTokenResponse>() {
            @Override
            public void onResponse(Call<LoginWithTokenResponse> pCall, Response<LoginWithTokenResponse> pResponse) {
                if(pResponse.isSuccessful()) {
                    LoginWithTokenResponse response = pResponse.body();
                    SharedPreferences.Editor editor = mPreferences.edit();
                    editor.putString("user_token", response.token);
                    editor.apply();
                    startMainActivity();
                } else {
                    String message =
                        "Error: " +
                        Integer.toString(pResponse.code()) +
                        ", " +
                        pResponse.message().toString();
                    onError(message);
                }
            }

            @Override
            public void onFailure(Call<LoginWithTokenResponse> pCall, Throwable pThrowable) {
                onError(pThrowable);
            }
        });
    }

    private void onError(Throwable pThrowable){
        onError("Error: " + pThrowable.getLocalizedMessage());
    }

    private void onError(String pMessage){
        Toast toast = Toast.makeText(LogInActivity.this, pMessage, Toast.LENGTH_SHORT);
        toast.setGravity(Gravity.CENTER, 0, 0);
        toast.show();
    }

    private void startMainActivity(){
//            Intent intent = new Intent(MainActivity.this, LogInActivity.class);
//            startActivity(intent);
    }
}
