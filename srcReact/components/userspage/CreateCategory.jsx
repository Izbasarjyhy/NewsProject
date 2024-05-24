import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryService from '../service/CategoryService';
import './CreateCategory.css';

function CreateCategory() {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { value } = e.target;
    setCategoryName(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await CategoryService.createCategory({ name: categoryName }, token);
      setSuccessMessage('Category created successfully');
      setErrorMessage('');
      setTimeout(() => {
        navigate("/admin/category-management");
      }, 2000);
    } catch (error) {
      setErrorMessage('Failed to create category');
      setSuccessMessage('');
      console.error('Error creating category:', error);
    }
  };

  return (
    <div className="create-category-container">
      <h2>Create Category</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={categoryName} onChange={handleInputChange} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateCategory;
