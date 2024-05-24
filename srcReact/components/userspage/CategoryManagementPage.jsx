import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CategoryService from '../service/CategoryService';
import './CategoryManagementPage.css';

function CategoryManagementPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await CategoryService.getAllCategories(token);
      setCategories(response.categoriesList);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const deleteCategory = async (categoryId) => {
    console.log('Deleting category with id:', categoryId); 
    try {
      const confirmDelete = window.confirm('Вы уверены, что хотите удалить эту категорию?');
      const token = localStorage.getItem('token'); 
      if (confirmDelete) {
        await CategoryService.deleteCategory(categoryId, token);
        fetchCategories();
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="category-management-container">
      <h2 className="page-title">Category Management Page</h2>
      <button className='add-category-button'>
        <Link to="/create-category" className="link-style">Add Category</Link>
      </button>
      <table className="category-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories && categories.map(category => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <button className='delete-button' onClick={() => deleteCategory(category.id)}>Delete</button>
                <button className='update-button'>
                  <Link to={`/admin/update-category/${category.id}`} className="link-style">Update</Link>
                </button>
              </td>
            </tr>
            
          ))}

        </tbody>

      </table>
      
    </div>
  );
}

export default CategoryManagementPage;
