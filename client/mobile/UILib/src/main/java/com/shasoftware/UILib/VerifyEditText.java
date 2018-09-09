package com.shasoftware.UILib;

import android.content.Context;
import android.content.res.TypedArray;
import android.os.Handler;
import android.support.v7.widget.LinearLayoutCompat;
import android.text.Editable;
import android.text.InputType;
import android.text.TextWatcher;
import android.util.AttributeSet;
import android.widget.EditText;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.ProgressBar;

import com.shasoftware.uilib.R;

import java.util.Timer;
import java.util.TimerTask;

public class VerifyEditText extends LinearLayoutCompat {

    public enum STATE {
        UNVERIFIED,
        CORRECT,
        INCORRECT,
        VERIFICATION
    }

    public interface OnVerifyText {
        void verify(String pText);
    }

    public interface OnStateChange {
        void changed(STATE pState);
    }

    STATE mState = STATE.UNVERIFIED;

    OnVerifyText    mOnVerifyText   = null;
    OnStateChange   mOnStateChange  = null;

    FrameLayout mFrameLayout            = null;
    EditText    mEditText               = null;
    ImageView   mImageViewCorrect       = null;
    ImageView   mImageViewIncorrect     = null;
    ImageView   mImageViewUnverified    = null;
    ProgressBar mProgressBar            = null;

    Handler     mHandler            = null;
    Timer       mTimer              = null;
    TimerTask   mTimerTask          = null;
    int         mVerificationDelay  = 0;

    public void setOnVerifyText(OnVerifyText pOnVerifyText) {
        mOnVerifyText = pOnVerifyText;
        setState(STATE.UNVERIFIED);
        mOnVerifyText.verify(mEditText != null ? mEditText.getText().toString() : "");
    }

    public void setOnStateChange(OnStateChange pOnStateChange) {
        mOnStateChange = pOnStateChange;
        mOnStateChange.changed(mState);
    }

    public void setVerificationDelay(int pVerificationDelay) {
        mVerificationDelay = pVerificationDelay;
    }

    public VerifyEditText(Context pContext) {
        this(pContext,null);
        init();
    }

    public VerifyEditText(Context pContext, AttributeSet pAttributeSet) {
        this(pContext, pAttributeSet,0);
        init(pAttributeSet);
    }

    public VerifyEditText(Context pContext, AttributeSet pAttributeSet, int pDefaultStyleAttr) {
        super(pContext, pAttributeSet, pDefaultStyleAttr);
        init(pAttributeSet);
    }

    private  void init() {
        init(null);
    }

    private void init(AttributeSet pAttributeSet) {
        inflate(getContext(), R.layout.verify_edit_text_layout,this);

        mHandler = new Handler();

        mFrameLayout            = findViewById(R.id.verify_edit_text_icons);
        mEditText               = findViewById(R.id.verify_edit_text_edit_text);
        mImageViewUnverified    = findViewById(R.id.verify_edit_text_image_view_unverified);
        mImageViewCorrect       = findViewById(R.id.verify_edit_text_image_view_correct);
        mImageViewIncorrect     = findViewById(R.id.verify_edit_text_image_view_incorrect);
        mProgressBar            = findViewById(R.id.verify_edit_text_progress_bar);

        applyAttributes(pAttributeSet);

        mEditText.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {
            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
            }

            @Override
            public void afterTextChanged(Editable s) {
                if(mTimer != null) {
                    mTimer.cancel();
                    mTimer.purge();
                    mTimerTask.cancel();
                }
                mTimer = new Timer();
                mTimerTask = new TimerTask() {
                    @Override
                    public void run() {
                        onTimerTick();
                    }
                };
                mTimer.schedule(mTimerTask, mVerificationDelay);
            }
        });
    }

    private void applyAttributes(AttributeSet pAttributeSet) {
        if(pAttributeSet != null) {
            TypedArray typedArray = getContext().obtainStyledAttributes(pAttributeSet, R.styleable.VerifyEditText, 0, 0);

            String  text        = typedArray.getString(R.styleable.VerifyEditText_android_text);
            int     inputType   = typedArray.getInteger(
                    R.styleable.VerifyEditText_android_inputType,
                    InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_FLAG_MULTI_LINE);
            mVerificationDelay  = typedArray.getInt(R.styleable.VerifyEditText_verificationDelay, 0);

            String  hint        = typedArray.getString(R.styleable.VerifyEditText_android_hint);
            int     iconSize    = typedArray.getInteger(R.styleable.VerifyEditText_stateIconSize, 32);
            int     maxLines    = typedArray.getInteger(R.styleable.VerifyEditText_android_maxLines, 1);

            LayoutParams params = (LayoutParams) mFrameLayout.getLayoutParams();
            params.height = iconSize;
            params.width = iconSize;
            mFrameLayout.setLayoutParams(params);

            mEditText.setText(text);
            mEditText.setSelection(mEditText.getText().length());
            mEditText.setInputType(inputType);
            mEditText.setHint(hint);
            mEditText.setMaxLines(maxLines);
        }
    }

    private void onTimerTick(){
        if(mOnVerifyText != null)
        {
            mHandler.post(new Runnable() {
                public void run() {
                    mOnVerifyText.verify(mEditText.getText().toString());
                }
            });
        }
    }

    public STATE getSate() {
        return mState;
    }

    public void setState(STATE pState){
        mState = pState;
        mImageViewUnverified.setVisibility(mState == STATE.UNVERIFIED ? VISIBLE : INVISIBLE);
        mImageViewCorrect.setVisibility(mState == STATE.CORRECT ? VISIBLE : INVISIBLE);
        mImageViewIncorrect.setVisibility(mState == STATE.INCORRECT ? VISIBLE : INVISIBLE);
        mProgressBar.setVisibility(mState == STATE.VERIFICATION ? VISIBLE : INVISIBLE);
        if(mOnStateChange != null) {
            mOnStateChange.changed(mState);
        }
    }

    public String getText() {
        return mEditText.getText().toString();
    }

    public void setText(String pText) {
        mEditText.setText(pText);
    }
}