package com.phegondev.usermenegementsystem.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Table(name = "ssr_news")
@AllArgsConstructor
@Entity
public class News {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "data")
    protected LocalDateTime data;

    @PrePersist
    public void onCreate() {
        this.data = LocalDateTime.now();
    }

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "category_id")
    private Category category;
//    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY,
//            mappedBy = "news")
//    private List<Image> images=new ArrayList<>();
//    private Long previewImageId;

    public News() {

    }

    public News(String title, String content, LocalDateTime data, Category category) {
        this.title = title;
        this.content = content;
        this.data = data;
        this.category = category;

    }
//    public void addImageToNews(Image image) {
//        image.setNews(this);
//        images.add(image);
//    }


}