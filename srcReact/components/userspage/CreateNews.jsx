import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryService from '../service/CategoryService';
import NewsService from '../service/NewsService';

import './CreateNews.css';

function CreateNews() {
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState({
    title: '',
    content: '',
    categoryId: '',
    images: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const token = localStorage.getItem('token');
        const categoriesResponse = await CategoryService.getAllCategories(token);
        if (Array.isArray(categoriesResponse)) {
          setCategories(categoriesResponse);
        } else {
          console.error('Ошибка при получении категорий: Ответ не является массивом');
        }
      } catch (error) {
        console.error('Ошибка при получении категорий:', error);
      }
    }
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewsData((prevNewsData) => ({
      ...prevNewsData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await NewsService.createNews(newsData, token);
      setSuccessMessage('Новость успешно создана');
      setErrorMessage('');
      setTimeout(() => {
        navigate("/admin/news-management");
      }, 2000);
    } catch (error) {
      setErrorMessage('Ошибка при создании новости');
      setSuccessMessage('');
      console.error('Ошибка при создании новости:', error);
    }
  };

  return (
    <div className="create-news-container">
      <h2>Создать новость</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} enctype="multipart/form-data" >
        <div className="form-group">
          <label>Заголовок:</label>
          <input type="text" name="title" value={newsData.title} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Фотография:</label>
          <input type="file" name="file" value={newsData.file} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Контент:</label>
          <textarea name="content" value={newsData.content} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Категория:</label>
          <select name="categoryId" value={newsData.categoryId} onChange={handleInputChange}>
         <option value="0">Выбирай</option>
         <option value="1">Футбол</option>
         <option value="2">Волейбол</option>
         <option value="3">Теннис</option>
         <option value="4">ММА/UFC</option>
         <option value="5">Хоккей</option>
         <option value="6">Баскетбол</option>

         </select>
        </div>
        <button type="submit">Создать</button>
      </form>
    </div>
  );
}

export default CreateNews;


