package com.phegondev.usermenegementsystem.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Table(name = "ssr_category")
@AllArgsConstructor
@Entity
@Data
public class Category {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @OneToMany(mappedBy = "category")
    private List<News> newsList;


    @Column(name = "name")
    private String name;

    public Category() {

    }
    public Category(String name) {
        this.name = name;
    }


}
