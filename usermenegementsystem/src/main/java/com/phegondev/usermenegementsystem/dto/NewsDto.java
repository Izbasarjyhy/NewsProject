package com.phegondev.usermenegementsystem.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.phegondev.usermenegementsystem.entity.Image;
import com.phegondev.usermenegementsystem.entity.News;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class NewsDto {
    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String title;
    private String content;
    private LocalDateTime data;
    private Long categoryId;
    private List<News> newsList;
    private List<Image> imageList;



    public void addImageToNews(Image image) {
        image.setNews((News) newsList);
        imageList.add(image);
    }
}

