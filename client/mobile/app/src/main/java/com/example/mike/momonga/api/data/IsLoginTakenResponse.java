package com.example.mike.momonga.api.data;

public class IsLoginTakenResponse {
    public boolean taken = true;

    public IsLoginTakenResponse(boolean pTaken) {
        taken = pTaken;
    }
}