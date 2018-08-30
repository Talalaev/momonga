package com.example.mike.momonga;

import android.content.Intent;
import android.support.v4.app.NavUtils;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.view.Menu;
import android.view.MenuItem;

import com.example.mike.momonga.ui.settings.SettingsActivity;

public class ApplicationToolbar {

    private static ApplicationToolbar sInstance = null;

    public static ApplicationToolbar getInstance(){
        if(sInstance == null){
            sInstance = new ApplicationToolbar();
        }
        return sInstance;
    }

    public static void addToolbar(AppCompatActivity pActivity){
        android.support.v7.widget.Toolbar toolbar = pActivity.findViewById(R.id.toolbar);
        pActivity.setSupportActionBar(toolbar);
        ActionBar actionbar = pActivity.getSupportActionBar();
        actionbar.setDisplayHomeAsUpEnabled(true);

        final Class<?>activity_class = pActivity.getClass();
        if(activity_class == MainActivity.class) {
            actionbar.setHomeAsUpIndicator(R.drawable.ic_menu);
        }
    }

    public static boolean onCreateOptionsMenu(AppCompatActivity pActivity, Menu pMenu) {
        pActivity.getMenuInflater().inflate(R.menu.application_menu, pMenu);

        MenuItem item_change_user = pMenu.findItem(R.id.application_menu_login);
        MenuItem item_sign_up = pMenu.findItem(R.id.application_menu_sign_up);
        MenuItem item_settings = pMenu.findItem(R.id.application_menu_settings);
        item_change_user.setVisible(true);
        item_sign_up.setVisible(true);
        item_settings.setVisible(true);

        final Class<?>activity_class = pActivity.getClass();

        if(activity_class == StartActivity.class){

        } if(activity_class == LogInActivity.class){
            item_change_user.setVisible(false);
        } if(activity_class == SingUpActivity.class) {
            item_sign_up.setVisible(false);
        }

        return true;
    }

    public static boolean onOptionsItemSelected(AppCompatActivity pActivity, MenuItem pItem) {
        Intent intent = null;
        final Class<?>activity_class = pActivity.getClass();
        switch (pItem.getItemId()){
            case android.R.id.home:
                NavUtils.navigateUpFromSameTask(pActivity);
                return true;
            case R.id.application_menu_settings:
                intent = new Intent(pActivity, SettingsActivity.class);
                pActivity.startActivity(intent);
                break;
            case R.id.application_menu_login:
                intent = new Intent(pActivity, LogInActivity.class);
                pActivity.startActivity(intent);
                break;
            case R.id.application_menu_sign_up:
                intent = new Intent(pActivity, SingUpActivity.class);
                pActivity.startActivity(intent);
                break;
            default: return false;
        }
        if(activity_class != StartActivity.class){
            pActivity.finish();
        }
        return true;
    }
}
