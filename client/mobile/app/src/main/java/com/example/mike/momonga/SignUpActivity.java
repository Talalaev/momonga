package com.example.mike.momonga;

import android.os.Bundle;
import android.text.TextUtils;
import android.util.Patterns;
import android.view.View;
import android.widget.Button;

import com.example.mike.momonga.api.APIInterface;
import com.example.mike.momonga.api.APIService;
import com.example.mike.momonga.api.data.IsLoginTakenResponse;
import com.example.mike.momonga.api.data.SignUpRequest;
import com.example.mike.momonga.api.data.SignUpResponse;
import com.shasoftware.UILib.VerifyEditText;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SignUpActivity extends ActionBarActivity implements APIActivity{

    private VerifyEditText  mEditTextEmail             = null;
    private VerifyEditText  mEditTextLogin             = null;
    private VerifyEditText  mEditTextPassword          = null;
    private VerifyEditText  mEditTextPasswordConfirm   = null;

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

        mEditTextLogin.setOnVerifyText(this::verifyLogin);
        mEditTextEmail.setOnVerifyText(this::verifyEmail);
        mEditTextPassword.setOnVerifyText(this::verifyPassword);
        mEditTextPasswordConfirm.setOnVerifyText(this::verifyPasswordConfirm);
    }

    private void verifyLogin(String pLogin) {
        if(pLogin.length() < 4) {
            mEditTextLogin.setState(VerifyEditText.STATE.INCORRECT);
            return;
        }

        APIInterface service = APIService.getInstance(this);
        if(service == null){
            return;
        }

        mEditTextLogin.setState(VerifyEditText.STATE.VERIFICATION);
        Call<IsLoginTakenResponse> call = service.IsLoginTaken(pLogin);
        call.enqueue(new Callback<IsLoginTakenResponse>() {
            @Override
            public void onResponse(Call<IsLoginTakenResponse> pCall, Response<IsLoginTakenResponse> pResponse) {
                if(pResponse.isSuccessful()) {
                    mEditTextLogin.setState(pResponse.body().taken ? VerifyEditText.STATE.INCORRECT : VerifyEditText.STATE.CORRECT);
                } else {
                    mEditTextLogin.setState(VerifyEditText.STATE.INCORRECT);
                    String message =
                            "Error: " +
                                    Integer.toString(pResponse.code()) +
                                    ", " +
                                    pResponse.message().toString();
                    onError(message);
                }
            }

            @Override
            public void onFailure(Call<IsLoginTakenResponse> pCall, Throwable pThrowable) {
                mEditTextLogin.setState(VerifyEditText.STATE.INCORRECT);
                onError(pThrowable);
            }
        });


        mEditTextLogin.setState(VerifyEditText.STATE.CORRECT);
    }

    private void verifyEmail(String pEmail) {
        if(!TextUtils.isEmpty(pEmail) && Patterns.EMAIL_ADDRESS.matcher(pEmail).matches()){
            mEditTextEmail.setState(VerifyEditText.STATE.CORRECT);
        } else {
            mEditTextEmail.setState(VerifyEditText.STATE.INCORRECT);
        }
    }

    private void verifyPassword(String pPassword) {
        if(pPassword.length() > 5){
            mEditTextPassword.setState(VerifyEditText.STATE.CORRECT);
        } else {
            mEditTextPassword.setState(VerifyEditText.STATE.INCORRECT);
        }

        verifyPasswordConfirm(mEditTextPasswordConfirm.getText());
    }

    private void verifyPasswordConfirm(String pPasswordConfirm) {
        if((mEditTextPassword.getSate() == VerifyEditText.STATE.CORRECT)&&
           (mEditTextPassword.getText().matches(pPasswordConfirm)))
        {
            mEditTextPasswordConfirm.setState(VerifyEditText.STATE.CORRECT);
        } else {
            mEditTextPasswordConfirm.setState(VerifyEditText.STATE.INCORRECT);
        }
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

        showProgress(getResources().getString(R.string.sign_up_user));
        Call<SignUpResponse> call = service.SignUp(new SignUpRequest(login, email, password));
        call.enqueue(new Callback<SignUpResponse>() {
            @Override
            public void onResponse(Call<SignUpResponse> pCall, Response<SignUpResponse> pResponse) {
                hideProgress();
                if(pResponse.isSuccessful()) {
                    saveUserData(pResponse.body().user, pResponse.body().token);
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
            public void onFailure(Call<SignUpResponse> pCall, Throwable pThrowable) {
                hideProgress();
                onError(pThrowable);
            }
        });
    }

    private boolean checkData(){
        String password         = mEditTextPassword.getText().toString();
        String passwordConfirm  = mEditTextPasswordConfirm.getText().toString();
        if(password.compareTo(passwordConfirm) != 0) {
            onError(getResources().getString(R.string.passwords_not_match));
            return false;
        }
        return true;
    }
}
