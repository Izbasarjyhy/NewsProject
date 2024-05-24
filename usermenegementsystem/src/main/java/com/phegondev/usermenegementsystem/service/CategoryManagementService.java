package com.phegondev.usermenegementsystem.service;

import com.phegondev.usermenegementsystem.dto.CategoryDto;
import com.phegondev.usermenegementsystem.dto.NewsDto;
import com.phegondev.usermenegementsystem.entity.Category;
import com.phegondev.usermenegementsystem.entity.News;
import com.phegondev.usermenegementsystem.repository.CategoryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryManagementService {
    @Autowired
    private final CategoryRepo categoryRepository;

    public CategoryDto getAllCategories() {
        CategoryDto categoryDto = new CategoryDto();
        try {
            List<Category> result = categoryRepository.findAll();
            if(!result.isEmpty()) {
                categoryDto.setCategoriesList(result);
                categoryDto.setStatusCode(200);
                categoryDto.setMessage("Successful");
            }
            else {
                categoryDto.setStatusCode(404);
                categoryDto.setMessage("No users found");
            }
            return categoryDto;
        }
        catch (Exception e) {
            categoryDto.setStatusCode(500);
            categoryDto.setMessage("Error occurred: " + e.getMessage());
            return categoryDto;
        }
    }

    public CategoryDto getCategoryById(Long categoryId) {
        Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
        if (categoryOptional.isPresent()) {
            return mapToDto(categoryOptional.get());
        } else {
            throw new RuntimeException("Category not found for id: " + categoryId);
        }
    }

    public CategoryDto createCategory(CategoryDto categoryDto) {
        if (categoryDto.getName() == null || categoryDto.getName().isEmpty()) {
            // Имя категории пустое или null
            throw new IllegalArgumentException("Имя категории не может быть пустым");
        }

        Category category = new Category(categoryDto.getName());
        Category savedCategory = categoryRepository.save(category);
        return mapToDto(savedCategory);
    }





    public CategoryDto updateCategory(Long categoryId, CategoryDto categoryDto) {
        Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
        if (categoryOptional.isPresent()) {
            Category category = categoryOptional.get();
            category.setName(categoryDto.getName());
            Category updatedCategory = categoryRepository.save(category);
            return mapToDto(updatedCategory);
        } else {
            throw new RuntimeException("News not found for id: " + categoryId);
        }
    }



    public CategoryDto deleteCategory(Integer categoryId)
    {
        CategoryDto categoryDto = new CategoryDto();
        try {
            Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
            if (categoryOptional.isPresent()) {
                categoryRepository.deleteById(categoryId);
            }
            else {
                categoryDto.setStatusCode(404);
            }
            return categoryDto;
        }
        catch (Exception e) {
        categoryDto.setStatusCode(500);
    }
        return categoryDto;
    }


    private CategoryDto mapToDto(Category category) {
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setName(category.getName());
        return categoryDto;
    }
}
