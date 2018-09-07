package com.example.mike.momonga;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Gravity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.mike.momonga.api.APIInterface;
import com.example.mike.momonga.api.APIService;
import com.example.mike.momonga.api.data.LoginWithTokenRequest;
import com.example.mike.momonga.api.data.LoginWithTokenResponse;
import com.example.mike.momonga.api.data.SignUpRequest;
import com.example.mike.momonga.api.data.SignUpResponse;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SignUpActivity extends AppCompatActivity {

    private EditText mEditTextEmail             = null;
    private EditText mEditTextLogin             = null;
    private EditText mEditTextPassword          = null;
    private EditText mEditTextPasswordConfirm   = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sing_up);

        ApplicationToolbar.addToolbar(this);

        mEditTextEmail              = findViewById(R.id.sign_up_activity_edittext_email);
        mEditTextLogin              = findViewById(R.id.sign_up_activity_edittext_login);
        mEditTextPassword           = findViewById(R.id.sign_up_activity_edittext_password);
        mEditTextPasswordConfirm    = findViewById(R.id.sign_up_activity_edittext_password_confirm);

        Button buttonSingUp = findViewById(R.id.sign_up_activity_button_sign_up);
        Button buttonCancel = findViewById(R.id.sign_up_activity_button_cancel);

        buttonSingUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SignUp();
            }
        });

        buttonCancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SignUpActivity.this.finish();
            }
        });
    }

    private void SignUp(){
        APIInterface service = APIService.getInstance(SignUpActivity.this);
        if(service == null){
            return;
        }
        String login            = mEditTextLogin.getText().toString();
        String email            = mEditTextEmail.getText().toString();
        String password         = mEditTextPassword.getText().toString();

        if(!checkData()) {
            return;
        }

        Tools.showProgress(SignUpActivity.this, getResources().getString(R.string.sign_up_user));
        Call<SignUpResponse> call = service.SignUp(new SignUpRequest(login, email, password));
        call.enqueue(new Callback<SignUpResponse>() {
            @Override
            public void onResponse(Call<SignUpResponse> pCall, Response<SignUpResponse> pResponse) {
                Tools.hideProgress(SignUpActivity.this);
                if(pResponse.isSuccessful()) {
                    Tools.saveUserData(SignUpActivity.this, pResponse.body().user, pResponse.body().token);
                    Tools.startMainActivity(SignUpActivity.this);
                } else {
                    String message =
                            "Error: " +
                                    Integer.toString(pResponse.code()) +
                                    ", " +
                                    pResponse.message().toString();
                    Tools.onError(SignUpActivity.this, message);
                }
            }

            @Override
            public void onFailure(Call<SignUpResponse> pCall, Throwable pThrowable) {
                Tools.hideProgress(SignUpActivity.this);
                Tools.onError(SignUpActivity.this, pThrowable);
            }
        });
    }

    private boolean checkData(){
        String password         = mEditTextPassword.getText().toString();
        String passwordConfirm  = mEditTextPasswordConfirm.getText().toString();
        if(password.compareTo(passwordConfirm) != 0) {
            Tools.onError(SignUpActivity.this, getResources().getString(R.string.passwords_not_match));
            return false;
        }
        return true;
    }

    @Override
    public boolean onCreateOptionsMenu(Menu pMenu) {
        return ApplicationToolbar.getInstance().onCreateOptionsMenu(SignUpActivity.this, pMenu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem pMenu) {
        return ApplicationToolbar.getInstance().onOptionsItemSelected(SignUpActivity.this, pMenu);
    }

}
