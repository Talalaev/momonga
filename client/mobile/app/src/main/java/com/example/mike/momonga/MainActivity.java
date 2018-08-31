package com.example.mike.momonga;

import android.content.Intent;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;

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

        setupNavigationView();

        TextView textViewGreeting = findViewById(R.id.main_activity_greeting);
        String user_name = ApplicationSettings.getString(MainActivity.this, ApplicationSettings.USER_LOGIN);
        String welcome = getResources().getString(R.string.welcome);
        textViewGreeting.setText(welcome + ", " + user_name);
    }

    private void setupNavigationView(){
        NavigationView navigationView = findViewById(R.id.navigation_view);
        View headerView = navigationView.getHeaderView(0);

        navigationView.setNavigationItemSelectedListener(MainActivity.this);

        TextView textViewLogin = headerView.findViewById(R.id.navigation_header_text);
        String user_name = ApplicationSettings.getString(MainActivity.this, ApplicationSettings.USER_LOGIN);
        String user_email = ApplicationSettings.getString(MainActivity.this, ApplicationSettings.USER_EMAIL);
        textViewLogin.setText(user_name + '\n' + user_email);
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

    private void clearUserData(){
        ApplicationSettings.remove(MainActivity.this, ApplicationSettings.USER_TOKEN);
        ApplicationSettings.remove(MainActivity.this, ApplicationSettings.USER_LOGIN);
        ApplicationSettings.remove(MainActivity.this, ApplicationSettings.USER_IS_ADMIN);
    }

    private void exit(){
        clearUserData();
        Intent intent = new Intent(MainActivity.this, LogInActivity.class);
        startActivity(intent);
        MainActivity.this.finish();
    }

}