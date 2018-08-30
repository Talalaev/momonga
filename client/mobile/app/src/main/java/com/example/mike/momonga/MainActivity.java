package com.example.mike.momonga;

import android.content.Intent;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.MenuItem;

import com.example.mike.momonga.ui.settings.ApplicationSettings;
import com.example.mike.momonga.ui.settings.SettingsActivity;

public class MainActivity extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener {

    private DrawerLayout mDrawerLayout = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mDrawerLayout = findViewById(R.id.main_activity_drawer);

        ApplicationToolbar.addToolbar(this);

        NavigationView navigationView = findViewById(R.id.main_activity_navigation_view);
        navigationView.setNavigationItemSelectedListener(this);

    }

    @Override
    public boolean onOptionsItemSelected(MenuItem pItem) {
        switch (pItem.getItemId()) {
            case android.R.id.home:
                mDrawerLayout.openDrawer(GravityCompat.START);
                break;
            default: return super.onOptionsItemSelected(pItem);
        }

        return true;
    }

    @Override
    public boolean onNavigationItemSelected(MenuItem pItem) {
        Class<?> activity_class = null;
        switch (pItem.getItemId()) {
            case R.id.main_menu_settings:
                activity_class = SettingsActivity.class;
                break;
            case R.id.main_menu_exit:
                exit();
                return true;
        }
        mDrawerLayout.closeDrawers();
        Intent intent = new Intent(MainActivity.this, activity_class);
        startActivity(intent);
        return true;
    }

    private void exit(){
        ApplicationSettings.remove(MainActivity.this, ApplicationSettings.USER_TOKEN);
        Intent intent = new Intent(MainActivity.this, LogInActivity.class);
        startActivity(intent);
        MainActivity.this.finish();
    }

}