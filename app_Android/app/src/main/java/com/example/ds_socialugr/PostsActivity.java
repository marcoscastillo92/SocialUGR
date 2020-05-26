package com.example.ds_socialugr;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class PostsActivity extends AppCompatActivity {
    ArrayList<Post> listPosts;
    RecyclerView recycler;
    User user;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_posts);

        recycler = findViewById(R.id.recyclerId);
        recycler.setLayoutManager(new LinearLayoutManager(this,LinearLayoutManager.VERTICAL,false));
        listPosts = new ArrayList<>();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://192.168.0.20:8080/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        JsonPlaceHolderApi jsonPlaceHolderApi = retrofit.create(JsonPlaceHolderApi.class);
        Intent intent = getIntent();
        user = (User) intent.getSerializableExtra("user");
        Call<List<Post>> call = jsonPlaceHolderApi.getPostsFromUser(user.get_id(), user.getUsername());
        call.enqueue(new Callback<List<Post>>() {
            @Override
            public void onResponse(Call<List<Post>> call, Response<List<Post>> response) {
                listPosts = (ArrayList<Post>) response.body();
                AdapterDatos adapter = new AdapterDatos(listPosts, user);
                recycler.setAdapter(adapter);
            }

            @Override
            public void onFailure(Call<List<Post>> call, Throwable t) {

            }
        });



    }
}
