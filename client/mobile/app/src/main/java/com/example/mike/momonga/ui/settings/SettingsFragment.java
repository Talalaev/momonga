package com.example.mike.momonga.ui.settings;

import android.os.Bundle;
import android.support.v7.preference.PreferenceFragmentCompat;

import com.example.mike.momonga.R;

public class SettingsFragment extends PreferenceFragmentCompat {
    @Override
    public void onCreatePreferences(Bundle pBundle, String pS) {
        addPreferencesFromResource(R.xml.settings);
    }
}
