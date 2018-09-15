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

        final Class<?>activity_class = pActivity.getClass();

        if(activity_class != LogInActivity.class){
            actionbar.setDisplayHomeAsUpEnabled(true);
        }

        if(activity_class == MainActivity.class) {
            actionbar.setHomeAsUpIndicator(R.drawable.ic_menu);
        }
    }

    public static boolean onCreateOptionsMenu(AppCompatActivity pActivity, Menu pMenu) {
        pActivity.getMenuInflater().inflate(R.menu.application_menu, pMenu);

        MenuItem item_sign_up = pMenu.findItem(R.id.application_menu_sign_up);
        MenuItem item_settings = pMenu.findItem(R.id.application_menu_settings);
        item_sign_up.setVisible(true);
        item_settings.setVisible(true);

        final Class<?>activity_class = pActivity.getClass();

        if(activity_class == SignUpActivity.class) {
            item_sign_up.setVisible(false);
        }

        return true;
    }

    public static boolean onOptionsItemSelected(AppCompatActivity pActivity, MenuItem pItem) {
        Intent intent = null;
        switch (pItem.getItemId()){
            case android.R.id.home:
                NavUtils.navigateUpFromSameTask(pActivity);
                return true;
            case R.id.application_menu_settings:
                intent = new Intent(pActivity, SettingsActivity.class);
                pActivity.startActivity(intent);
                break;
            case R.id.application_menu_sign_up:
                intent = new Intent(pActivity, SignUpActivity.class);
                pActivity.startActivity(intent);
                break;
            default: return false;
        }
        return true;
    }
}
