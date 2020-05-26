package com.example.ds_socialugr;

import java.util.Date;
import java.util.List;

import retrofit2.Call;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.POST;

public interface JsonPlaceHolderApi {

    @GET("posts")
    Call<List<Post>> getPosts();

    @POST("/login_mobile")
    @FormUrlEncoded
    Call<User> checkLogin(@Field("username") String username, @Field("password") String password);

    @POST("posts")
    @FormUrlEncoded
    Call<List<Post>> getPostsFromUser(@Field("token") String token, @Field("username") String username);

    @POST("get_profile")
    @FormUrlEncoded
    Call<Profile> checkProfile(@Field("token") String token, @Field("username") String form, @Field("usernameProfile") String to);

    @POST("signup_mobile")
    @FormUrlEncoded
    Call<User> signUp(@Field("name") String name, @Field("lastName") String lastName, @Field("username") String username, @Field("birthDate") Date birthDate, @Field("gender") String gender, @Field("email") String email, @Field("password") String password);
}