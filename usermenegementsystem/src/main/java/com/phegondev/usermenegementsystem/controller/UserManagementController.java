package com.phegondev.usermenegementsystem.controller;

import com.phegondev.usermenegementsystem.dto.CategoryDto;
import com.phegondev.usermenegementsystem.dto.NewsDto;
import com.phegondev.usermenegementsystem.dto.ReqRes;
import com.phegondev.usermenegementsystem.entity.OurUsers;
import com.phegondev.usermenegementsystem.service.CategoryManagementService;
import com.phegondev.usermenegementsystem.service.NewsManagementService;
import com.phegondev.usermenegementsystem.service.UsersManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class UserManagementController {
    @Autowired
    private UsersManagementService usersManagementService;

    @Autowired
    private CategoryManagementService categoryService;

    private final NewsManagementService newsService;

    @PostMapping("/auth/register")
    public ResponseEntity<ReqRes> regeister(@RequestBody ReqRes reg){
        return ResponseEntity.ok(usersManagementService.register(reg));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<ReqRes> login(@RequestBody ReqRes req){
        return ResponseEntity.ok(usersManagementService.login(req));
    }

    @PostMapping("/auth/refresh")
    public ResponseEntity<ReqRes> refreshToken(@RequestBody ReqRes req){
        return ResponseEntity.ok(usersManagementService.refreshToken(req));
    }

    @GetMapping("/admin/get-all-users")
    public ResponseEntity<ReqRes> getAllUsers(){
        return ResponseEntity.ok(usersManagementService.getAllUsers());

    }

    @GetMapping("/admin/get-users/{userId}")
    public ResponseEntity<ReqRes> getUSerByID(@PathVariable Integer userId){
        return ResponseEntity.ok(usersManagementService.getUsersById(userId));

    }

    @PutMapping("/admin/update/{userId}")
    public ResponseEntity<ReqRes> updateUser(@PathVariable Integer userId, @RequestBody OurUsers reqres){
        return ResponseEntity.ok(usersManagementService.updateUser(userId, reqres));
    }

    @GetMapping("/adminuser/get-profile")
    public ResponseEntity<ReqRes> getMyProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        ReqRes response = usersManagementService.getMyInfo(email);
        return  ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/admin/delete/{userId}")
    public ResponseEntity<ReqRes> deleteUSer(@PathVariable Integer userId){
        return ResponseEntity.ok(usersManagementService.deleteUser(userId));
    }

    // CRUD operations for News


    @GetMapping("/get-news/{newsId}")
    public ResponseEntity<NewsDto> getNewsById(@PathVariable Long newsId) {
        return ResponseEntity.ok(newsService.getNewsById(newsId));
    }

    @PostMapping("/create-news")
    public ResponseEntity<NewsDto> createNews(@RequestBody NewsDto newsDto) {
        return ResponseEntity.ok(newsService.createNews(newsDto));
    }

    @PutMapping("/admin/update-news/{newsId}")
    public ResponseEntity<NewsDto> updateNews(@PathVariable Long newsId, @RequestBody NewsDto newsDto) {
        return ResponseEntity.ok(newsService.updateNews(newsId, newsDto));
    }

    @DeleteMapping("/admin/delete-news/{newsId}")
    public ResponseEntity<NewsDto> deleteNews(@PathVariable Integer newsId) {

        return ResponseEntity.ok(newsService.deleteNews(newsId));
    }


    @GetMapping("/get-all-news")
    public ResponseEntity<NewsDto> getAllNews() {

        return ResponseEntity.ok(newsService.getAllNews());
    }

    @GetMapping("/get-all-categories")
    public ResponseEntity<CategoryDto> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @GetMapping("/admin/get-category/{categoryId}")
    public ResponseEntity<CategoryDto> getCategoryById(@PathVariable Long categoryId) {
        return ResponseEntity.ok(categoryService.getCategoryById(categoryId));
    }

    @PostMapping("/admin/create-category")
    public ResponseEntity<CategoryDto> createCategory(@RequestBody CategoryDto categoryDto) {
        return ResponseEntity.ok(categoryService.createCategory(categoryDto));
    }

    @PutMapping("/admin/update-category/{categoryId}")
    public ResponseEntity<CategoryDto> updateCategory(@PathVariable Long categoryId, @RequestBody CategoryDto categoryDto) {
        return ResponseEntity.ok(categoryService.updateCategory(categoryId, categoryDto));
    }

    @DeleteMapping("/admin/delete-category/{categoryId}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Integer categoryId) {
        categoryService.deleteCategory(categoryId);
        return ResponseEntity.ok().build();
    }
}
