package com.example.ds_socialugr;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.Date;

public class Post {
    @SerializedName("username")
    @Expose
    String username;
    @SerializedName("description")
    @Expose
    String description;
    @SerializedName("idPost")
    @Expose
    String idPost;
    @SerializedName("image")
    @Expose
    String image;
    @SerializedName("type")
    @Expose
    String type;
    @SerializedName("profileImage")
    @Expose
    String profileImage;
    @SerializedName("date")
    @Expose
    Date date;
    ArrayList likes, comments;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIdPost() {
        return idPost;
    }

    public void setIdPost(String idPost) {
        this.idPost = idPost;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public ArrayList getLikes() {
        return likes;
    }

    public void setLikes(ArrayList likes) {
        this.likes = likes;
    }

    public ArrayList getComments() {
        return comments;
    }

    public void setComments(ArrayList comments) {
        this.comments = comments;
    }
}