package com.example.ds_socialugr;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ImageView;
import android.widget.TextView;

import com.squareup.picasso.Picasso;

public class ProfileActivity extends AppCompatActivity {
    private User user;
    private Profile profile;
    TextView name, lastName, username, date, gender, bios, email;
    ImageView profileImage, landscapeImage;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.perfil);

        name = findViewById(R.id.tvName);
        lastName = findViewById(R.id.tvLastName);
        username = findViewById(R.id.tvUsername);
        date = findViewById(R.id.tvBirthDate);
        gender = findViewById(R.id.tvGender);
        bios = findViewById(R.id.tvBios);
        email = findViewById(R.id.tvEmail);

        profileImage = findViewById(R.id.ivProfileImage);
        landscapeImage = findViewById(R.id.ivLandscapeImage);

        Intent intent = getIntent();
        user = (User) intent.getSerializableExtra("user");
        profile = (Profile) intent.getSerializableExtra("profile");

        name.setText(profile.getName());
        lastName.setText(profile.getLastName());
        username.setText(profile.getUsername());
        date.setText(profile.getBirthDate().toString());
        //gender.setText(profile.getGender());
        bios.setText(profile.getBios());
        email.setText(profile.getEmail());

        Picasso.get()
                .load("http://192.168.0.20:8080" + profile.getImage())
                .transform(new CircleTransform())
                .into(profileImage);
        Picasso.get()
                .load("http://192.168.0.20:8080" + profile.getLandscape())
                .into(landscapeImage);
    }
}
