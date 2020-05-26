package com.example.ds_socialugr;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;

public class Profile implements Serializable {
    @SerializedName("name")
    @Expose
    String name;
    @SerializedName("lastName")
    @Expose
    String lastName;
    @SerializedName("birthDate")
    @Expose
    Date birthDate;
    @SerializedName("bios")
    @Expose
    String bios;
    @SerializedName("gender")
    @Expose
    String gender;
    @SerializedName("following")
    @Expose
    ArrayList following;
    @SerializedName("followers")
    @Expose
    ArrayList followers;
    @SerializedName("username")
    @Expose
    String username;
    @SerializedName("email")
    @Expose
    String email;
    @SerializedName("image")
    @Expose
    String image;
    @SerializedName("landscape")
    @Expose
    String landscape;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public String getBios() {
        return bios;
    }

    public void setBios(String bios) {
        this.bios = bios;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public ArrayList getFollowing() {
        return following;
    }

    public void setFollowing(ArrayList following) {
        this.following = following;
    }

    public ArrayList getFollowers() {
        return followers;
    }

    public void setFollowers(ArrayList followers) {
        this.followers = followers;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getLandscape() {
        return landscape;
    }

    public void setLandscape(String landscape) {
        this.landscape = landscape;
    }
}
