package com.phegondev.usermenegementsystem.repository;

import com.phegondev.usermenegementsystem.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepo extends JpaRepository<Category, Integer> {
    Optional<Category> findById(Long newsId);
}