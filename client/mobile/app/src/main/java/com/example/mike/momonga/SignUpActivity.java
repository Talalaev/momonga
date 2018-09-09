package com.example.mike.momonga;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Patterns;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.example.mike.momonga.api.APIInterface;
import com.example.mike.momonga.api.APIService;
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

        mEditTextLogin.setOnVerifyText(pText -> {
            verifyLogin();
        });

        mEditTextEmail.setOnVerifyText(pText -> {
            verfiyEmail();
        });

        mEditTextPassword.setOnVerifyText(pText -> {
            verifyPassword();
        });

        mEditTextPasswordConfirm.setOnVerifyText(pText -> {
            verifyPassword();
        });
    }

    private void verifyLogin() {

    }

    private void verfiyEmail() {
        if(!TextUtils.isEmpty(mEditTextEmail.getText()) && Patterns.EMAIL_ADDRESS.matcher(mEditTextEmail.getText()).matches()){
            mEditTextEmail.setState(VerifyEditText.STATE.CORRECT);
        } else {
            mEditTextEmail.setState(VerifyEditText.STATE.INCORRECT);
        }
    }

    private void verifyPassword() {
        if(mEditTextPassword.getText().length() > 5){
            mEditTextPassword.setState(VerifyEditText.STATE.CORRECT);
        } else {
            mEditTextPassword.setState(VerifyEditText.STATE.INCORRECT);
        }

        if((mEditTextPassword.getSate() == VerifyEditText.STATE.CORRECT)&&
           (mEditTextPassword.getText().matches(mEditTextPasswordConfirm.getText())))
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
