package com.example.mike.momonga;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Gravity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.FrameLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.example.mike.momonga.api.APIInterface;
import com.example.mike.momonga.api.APIService;
import com.example.mike.momonga.api.data.LoginWithTokenRequest;
import com.example.mike.momonga.api.data.LoginWithTokenResponse;
import com.example.mike.momonga.api.data.User;
import com.example.mike.momonga.ui.settings.ApplicationSettings;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LogInActivity extends AppCompatActivity {

    private EditText            mEditTextEmail      = null;
    private EditText            mEditTextPassword   = null;
    FrameLayout                 mWaitScreen         = null;
    TextView                    mWaitScreenTitle    = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_log_in);

        ApplicationToolbar.addToolbar(this);

        String api_url = ApplicationSettings.getString(LogInActivity.this, ApplicationSettings.API_URL);
        if(api_url == null) {
            api_url = getResources().getString(R.string.default_api_url);
        }
        APIService.setBaseURL(api_url);

        mWaitScreen         = findViewById(R.id.wait_activity);
        mWaitScreenTitle    = findViewById(R.id.wait_activity_title);

        checkToken();

        mEditTextEmail      = findViewById(R.id.login_activity_edittext_email);
        mEditTextPassword   = findViewById(R.id.login_activity_edittext_password);

        Button buttonLogIn  = findViewById(R.id.login_activity_button_login);

        String user_email = ApplicationSettings.getString(LogInActivity.this, ApplicationSettings.USER_EMAIL);

        if(user_email != null) {
            mEditTextEmail.setText(user_email);
            mEditTextPassword.requestFocus();
        }

        buttonLogIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                LogIn();
            }
        });

    }

    private void checkToken(){
        APIInterface service = APIService.getInstance(this);
        if(service == null){
            return;
        }
        String token = ApplicationSettings.getString(LogInActivity.this, ApplicationSettings.USER_TOKEN);
        if(token != null){
            mWaitScreenTitle.setText(R.string.login_in_appligation);
            mWaitScreen.setVisibility(View.VISIBLE);
            Call<User> call = service.AuthUser(token);
            call.enqueue(new Callback<User>() {
                @Override
                public void onResponse(Call<User> pCall, Response<User> pResponse) {
                    mWaitScreen.setVisibility(View.GONE);
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
                    mWaitScreen.setVisibility(View.GONE);
                    onError(pThrowable);
                }
            });

        }
    }

    private void LogIn(){
        APIInterface service = APIService.getInstance(this);
        if(service == null){
            return;
        }
        String email    = mEditTextEmail.getText().toString();
        String password = mEditTextPassword.getText().toString();
        mWaitScreenTitle.setText(R.string.login_in_appligation);
        mWaitScreen.setVisibility(View.VISIBLE);
        Call<LoginWithTokenResponse> call = service.LoginWithToken(new LoginWithTokenRequest(email, password));
        call.enqueue(new Callback<LoginWithTokenResponse>() {
            @Override
            public void onResponse(Call<LoginWithTokenResponse> pCall, Response<LoginWithTokenResponse> pResponse) {
                mWaitScreen.setVisibility(View.GONE);
                if(pResponse.isSuccessful()) {
                    saveUserData(pResponse.body());
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
                mWaitScreen.setVisibility(View.GONE);
                onError(pThrowable);
            }
        });
    }

    private void saveUserData(LoginWithTokenResponse pResponse){
        ApplicationSettings.setString(LogInActivity.this, ApplicationSettings.USER_TOKEN, pResponse.token);
        ApplicationSettings.setString(LogInActivity.this, ApplicationSettings.USER_LOGIN, pResponse.user.login);
        ApplicationSettings.setString(LogInActivity.this, ApplicationSettings.USER_EMAIL, pResponse.user.email);
        ApplicationSettings.setBoolean(LogInActivity.this, ApplicationSettings.USER_IS_ADMIN,  pResponse.user.isAdmin > 0);
    }

    private void onError(Throwable pThrowable){
        onError("Error: " + pThrowable.getMessage());
    }

    private void onError(String pMessage){
        Toast toast = Toast.makeText(LogInActivity.this, pMessage, Toast.LENGTH_SHORT);
        toast.setGravity(Gravity.CENTER, 0, 0);
        toast.show();
    }

    private void startMainActivity(){
        Intent intent = new Intent(LogInActivity.this, MainActivity.class);
        mEditTextPassword.setText(null);
        startActivity(intent);
        LogInActivity.this.finish();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu pMenu) {
        return ApplicationToolbar.getInstance().onCreateOptionsMenu(LogInActivity.this, pMenu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem pMenu) {
        return ApplicationToolbar.getInstance().onOptionsItemSelected(LogInActivity.this, pMenu);
    }
}
