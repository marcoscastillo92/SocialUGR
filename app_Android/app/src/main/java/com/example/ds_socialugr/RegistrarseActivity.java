package com.example.ds_socialugr;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RegistrarseActivity extends AppCompatActivity {
    EditText name, lastname, username, email, birthdate, password, gender;
    Button bRegistrarse;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_registrarse);
        String[] arraySpinner = new String[] {
                "Hombre","Mujer", "Otro"
        };
        final Spinner s =  findViewById(R.id.spinner);
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_spinner_item, arraySpinner);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        s.setAdapter(adapter);
        s.setSelection(1);
        name = findViewById(R.id.etName);
        lastname = findViewById(R.id.etLastName);
        username = findViewById(R.id.etUsername);
        email = findViewById(R.id.etEmail);
        birthdate = findViewById(R.id.etDate);
        password = findViewById(R.id.etPassword);

        String dtStart = birthdate.getText().toString();
        SimpleDateFormat format = new SimpleDateFormat("dd/MM/YYYY");
        Date date = new Date();
        try {
            date = format.parse(dtStart);
            System.out.println(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        bRegistrarse = findViewById(R.id.bRegistrarse);
        final Date finalDate = date;
        bRegistrarse.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Retrofit retrofit = new Retrofit.Builder()
                        .baseUrl("http://192.168.0.20:8080/")
                        .addConverterFactory(GsonConverterFactory.create())
                        .build();
                JsonPlaceHolderApi jsonPlaceHolderApi = retrofit.create(JsonPlaceHolderApi.class);
                Call<User> call = jsonPlaceHolderApi.signUp(username.getText().toString(),lastname.getText().toString(), username.getText().toString(), finalDate,s.getSelectedItem().toString(), email.getText().toString(), password.getText().toString());
                call.enqueue(new Callback<User>() {
                    @Override
                    public void onResponse(Call<User> call, Response<User> response) {
                        User user = response.body();
                        if(user != null){
                            Intent myIntent = new Intent(RegistrarseActivity.this, PostsActivity.class);
                            myIntent.putExtra("user", user); //Optional parameters
                            RegistrarseActivity.this.startActivity(myIntent);
                        }
                    }

                    @Override
                    public void onFailure(Call<User> call, Throwable t) {

                    }
                });
            }
        });
    }
}
