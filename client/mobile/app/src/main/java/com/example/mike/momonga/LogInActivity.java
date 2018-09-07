package com.example.mike.momonga;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.example.mike.momonga.api.APIInterface;
import com.example.mike.momonga.api.APIService;
import com.example.mike.momonga.api.data.LoginWithTokenRequest;
import com.example.mike.momonga.api.data.LoginWithTokenResponse;
import com.example.mike.momonga.ui.settings.ApplicationSettings;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LogInActivity extends ActionBarActivity implements APIActivity {

    private EditText            mEditTextEmail      = null;
    private EditText            mEditTextPassword   = null;

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
        final String token = ApplicationSettings.getString(LogInActivity.this, ApplicationSettings.USER_TOKEN);
        if(token != null){
            showProgress(getResources().getString(R.string.login_in_appligation));
            Call<LoginWithTokenResponse.User> call = service.AuthUser(token);
            call.enqueue(new Callback<LoginWithTokenResponse.User>() {
                @Override
                public void onResponse(Call<LoginWithTokenResponse.User> pCall, Response<LoginWithTokenResponse.User> pResponse) {
                    hideProgress();
                    if(pResponse.isSuccessful()) {
                        saveUserData(pResponse.body(), token);
                        mEditTextPassword.setText(null);
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
                public void onFailure(Call<LoginWithTokenResponse.User> pCall, Throwable pThrowable) {
                    hideProgress();
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
        showProgress(getResources().getString(R.string.login_in_appligation));
        Call<LoginWithTokenResponse> call = service.LoginWithToken(new LoginWithTokenRequest(email, password));
        call.enqueue(new Callback<LoginWithTokenResponse>() {
            @Override
            public void onResponse(Call<LoginWithTokenResponse> pCall, Response<LoginWithTokenResponse> pResponse) {
                hideProgress();
                if(pResponse.isSuccessful()) {
                    saveUserData(pResponse.body().user, pResponse.body().token);
                    mEditTextPassword.setText(null);
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
                hideProgress();
                onError(pThrowable);
            }
        });
    }
}
