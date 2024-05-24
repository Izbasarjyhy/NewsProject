import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CategoryService from '../service/CategoryService';
import './UpdateCategory.css';

function UpdateCategory() {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const [categoryData, setCategoryData] = useState({
    name: ''
  });

  useEffect(() => {
    fetchCategoryDataById(categoryId);
  }, [categoryId]); 

  const fetchCategoryDataById = async (categoryId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await CategoryService.getCategoryById(categoryId, token);
      const { name } = response;
      setCategoryData({ name });
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prevCategoryData) => ({
      ...prevCategoryData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const confirmUpdate = window.confirm('Are you sure you want to update this category?');
      if (confirmUpdate) {
        const token = localStorage.getItem('token');
        const res = await CategoryService.updateCategory(categoryId, categoryData, token);
        console.log(res);
        navigate("/admin/category-management");
      }
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <div className="update-category-container">
      <h2>Update Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={categoryData.name} onChange={handleInputChange} />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateCategory;
