package com.phegondev.usermenegementsystem.service;

import com.phegondev.usermenegementsystem.dto.NewsDto;
import com.phegondev.usermenegementsystem.entity.Category;
import com.phegondev.usermenegementsystem.entity.Image;
import com.phegondev.usermenegementsystem.entity.News;
import com.phegondev.usermenegementsystem.repository.CategoryRepo;
import com.phegondev.usermenegementsystem.repository.NewsRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NewsManagementService {
    private final NewsRepo newsRepository;

    private final CategoryRepo categoryRepository;

    public NewsDto getAllNews() {
        NewsDto newsDto = new NewsDto();
        try {
            List<News> result = newsRepository.findAll();
            if (!result.isEmpty()) {
                newsDto.setNewsList(result);
                newsDto.setStatusCode(200);
                newsDto.setMessage("Successful");
            } else {
                newsDto.setStatusCode(404);
                newsDto.setMessage("No users found");
            }
            return newsDto;
        } catch (Exception e) {
            newsDto.setStatusCode(500);
            newsDto.setMessage("Error occurred: " + e.getMessage());
            return newsDto;
        }
    }

    public NewsDto getNewsById(Long newsId) {
        Optional<News> newsOptional = newsRepository.findById(newsId);
        if (newsOptional.isPresent()) {
            return mapToDto(newsOptional.get());
        } else {
            throw new RuntimeException("News not found for id: " + newsId);
        }
    }

    public NewsDto createNews(NewsDto newsDto) {

        Optional<Category> categoryOptional = categoryRepository.findById(newsDto.getCategoryId());
        if (categoryOptional.isPresent()) {

            Category category = categoryOptional.get();
            News news = new News(newsDto.getTitle(), newsDto.getContent(), newsDto.getData(), category);
            News savedNews = newsRepository.save(news);
            return mapToDto(savedNews);
        } else {
            throw new RuntimeException("Category not found for id: " + newsDto.getCategoryId());
        }
    }

    private Image toImageEntity(MultipartFile file) throws IOException {
        Image image = new Image();
        image.setName(file.getName());
        image.setOriginalFileName(file.getOriginalFilename());
        image.setContentType(file.getContentType());
        image.setSize(file.getSize());
        image.setBytes(file.getBytes());
        return image;
    }

    public NewsDto updateNews(Long newsId, NewsDto newsDto) {
        Optional<News> newsOptional = newsRepository.findById(newsId);
        if (newsOptional.isPresent()) {
            News news = newsOptional.get();
            news.setTitle(newsDto.getTitle());
            news.setContent(newsDto.getContent());
            Optional<Category> categoryOptional = categoryRepository.findById(newsDto.getCategoryId());
            if (categoryOptional.isPresent()) {
                news.setCategory(categoryOptional.get());
            } else {
                throw new RuntimeException("Category not found for id: " + newsDto.getCategoryId());
            }
            News updatedNews = newsRepository.save(news);
            return mapToDto(updatedNews);
        } else {
            throw new RuntimeException("News not found for id: " + newsId);
        }
    }

    public NewsDto deleteNews(Integer newsId) {
        NewsDto newsDto = new NewsDto();
        try {
            Optional<News> newsOptional = newsRepository.findById(newsId);
            if (newsOptional.isPresent()) {
                newsRepository.deleteById(newsId);
            } else {
                newsDto.setStatusCode(404);
            }
            return newsDto;

        } catch (Exception e) {
            newsDto.setStatusCode(500);
        }
        return newsDto;
    }

    private NewsDto mapToDto(News news) {
        NewsDto newsDto = new NewsDto();
        newsDto.setTitle(news.getTitle());
        newsDto.setContent(news.getContent());
        newsDto.setData(news.getData());
        newsDto.setCategoryId(news.getCategory().getId());
        return newsDto;
    }
}
