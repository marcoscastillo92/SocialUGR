package com.example.ds_socialugr;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button bEntrar = findViewById(R.id.bEntrar);
        Button bRegistrarse = findViewById(R.id.bRegistrarse);
        final EditText etUsername = findViewById(R.id.etUsername);
        final EditText etPassword = findViewById(R.id.etContrasena);
        bRegistrarse.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent myIntent = new Intent(MainActivity.this, RegistrarseActivity.class);
                MainActivity.this.startActivity(myIntent);
            }
        });
        bEntrar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                checkLogin(etUsername.getText().toString(), etPassword.getText().toString());
            }
        });
    }

    public void checkLogin(String username, String pasword){
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://192.168.0.20:8080/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        JsonPlaceHolderApi jsonPlaceHolderApi = retrofit.create(JsonPlaceHolderApi.class);
        Call<User> call = jsonPlaceHolderApi.checkLogin(username, pasword);
        call.enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                User user = response.body();
                if(user != null){
                    Intent myIntent = new Intent(MainActivity.this, PostsActivity.class);
                    myIntent.putExtra("user", user); //Optional parameters
                    MainActivity.this.startActivity(myIntent);
                }
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {

            }
        });
    }
}
