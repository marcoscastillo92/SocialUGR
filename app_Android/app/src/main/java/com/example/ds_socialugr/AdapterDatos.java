package com.example.ds_socialugr;

import android.content.Intent;
import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.squareup.picasso.Picasso;
import com.squareup.picasso.Transformation;

import java.util.ArrayList;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class AdapterDatos extends RecyclerView.Adapter<AdapterDatos.ViewHolderDats>{

    private ArrayList<Post> listaPosts;
    private User user;

    public AdapterDatos(ArrayList<Post> listaPosts, User user) {
        this.listaPosts = listaPosts;
        this.user = user;
    }

    @NonNull
    @Override
    public ViewHolderDats onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.post_image, null, false);
        return new ViewHolderDats(view);
    }

    @Override
    public void onBindViewHolder(@NonNull final ViewHolderDats holder, int position) {
        holder.asignarDatos(listaPosts.get(position));
    }

    @Override
    public int getItemCount() {
        return listaPosts.size();
    }

    public class ViewHolderDats extends RecyclerView.ViewHolder implements View.OnClickListener{
        TextView username, date, description, numComments, numLikes;
        ImageView imageProfile, postImage;
        public ViewHolderDats(@NonNull View itemView) {
            super(itemView);
            username = itemView.findViewById(R.id.tvUsername);
            date = itemView.findViewById(R.id.tvDate);
            description = itemView.findViewById(R.id.tvPostDescription);
            numComments = itemView.findViewById(R.id.tvNumComments);
            numLikes = itemView.findViewById(R.id.tvNumLikes);
            imageProfile = itemView.findViewById(R.id.ivProfileImage);
            postImage = itemView.findViewById(R.id.ivPostImage);

            imageProfile.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(final View v) {
                    Retrofit retrofit = new Retrofit.Builder()
                            .baseUrl("http://192.168.0.20:8080/")
                            .addConverterFactory(GsonConverterFactory.create())
                            .build();
                    JsonPlaceHolderApi jsonPlaceHolderApi = retrofit.create(JsonPlaceHolderApi.class);
                    Call<Profile> call = jsonPlaceHolderApi.checkProfile(user.get_id() ,user.getUsername(), username.getText().toString());
                    call.enqueue(new Callback<Profile>() {
                        @Override
                        public void onResponse(Call<Profile> call, Response<Profile> response) {
                            Intent myIntent = new Intent(v.getContext(), ProfileActivity.class);
                            Profile perfil = response.body();
                            myIntent.putExtra("user", user); //Optional parameters
                            myIntent.putExtra("profile", perfil);
                            v.getContext().startActivity(myIntent);
                        }

                        @Override
                        public void onFailure(Call<Profile> call, Throwable t) {
                            Toast.makeText(v.getContext(),"Error ",Toast.LENGTH_LONG).show();
                        }
                    });
                }
            });

            username.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(final View v) {
                    Retrofit retrofit = new Retrofit.Builder()
                            .baseUrl("http://192.168.0.20:8080/")
                            .addConverterFactory(GsonConverterFactory.create())
                            .build();
                    JsonPlaceHolderApi jsonPlaceHolderApi = retrofit.create(JsonPlaceHolderApi.class);
                    Call<Profile> call = jsonPlaceHolderApi.checkProfile(user.get_id() ,user.getUsername(), username.getText().toString());
                    call.enqueue(new Callback<Profile>() {
                        @Override
                        public void onResponse(Call<Profile> call, Response<Profile> response) {
                            Intent myIntent = new Intent(v.getContext(), ProfileActivity.class);
                            Profile perfil = response.body();
                            myIntent.putExtra("user", user); //Optional parameters
                            //Toast.makeText(v.getContext(),"aaaaaaa "+ perfil.getEmail(),Toast.LENGTH_LONG).show();
                            myIntent.putExtra("profile", perfil);
                            v.getContext().startActivity(myIntent);
                        }

                        @Override
                        public void onFailure(Call<Profile> call, Throwable t) {
                            Toast.makeText(v.getContext(),"Error2 ",Toast.LENGTH_LONG).show();
                        }
                    });
                }
            });
        }

        public void asignarDatos(Post post) {
            username.setText(post.getUsername());
            date.setText(post.getDate().toString());
            description.setText(post.getDescription());
            numComments.setText(post.getComments().size()+" Comentarios");
            numLikes.setText(post.getLikes().size()+" Likes");
            Picasso.get()
                    .load("http://192.168.0.20:8080" + post.getImage())
                    .fit().centerInside()
                    .into(postImage);

            Picasso.get()
                    .load("http://192.168.0.20:8080" + post.getProfileImage())
                    .transform(new CircleTransform())
                    .into(imageProfile);
            if(post.getType().equals("text")){
                postImage.setVisibility(View.GONE);
            }


        }
        @Override
        public void onClick(final View v) {

        }
    }
}
