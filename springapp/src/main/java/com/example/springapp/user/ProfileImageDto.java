package com.example.springapp.user;

import org.springframework.web.multipart.MultipartFile;

public class ProfileImageDto {
    private MultipartFile image;

    public MultipartFile getImage() {
        return image;
    }

    public void setImage(MultipartFile image) {
        this.image = image;
    }
}
