package com.phegondev.usermenegementsystem.repository;

import com.phegondev.usermenegementsystem.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NewsRepo extends JpaRepository<News, Integer> {

    Optional<News> findById(Long newsId);

    void deleteById(Long newsId);
}
