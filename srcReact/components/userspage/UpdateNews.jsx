import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NewsService from '../service/NewsService';
import './UpdateCategory.css';

function UpdateNews() {
  const navigate = useNavigate();
  const { newsId } = useParams();

  const [newsData, setNewsData] = useState({
    title: '',
    content: '',
    categoryId: ''
  });

  useEffect(() => {
    fetchNewsDataById(newsId);
  }, [newsId]); 

  const fetchNewsDataById = async (newsId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await NewsService.getNewsById(newsId, token);
    const { title, content, categoryId } = response;
    setNewsData({ title, content, categoryId });
  } catch (error) {
    console.error('Error fetching news data:', error);
  }
};

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
      const confirmUpdate = window.confirm('Are you sure you want to update this news?');
      if (confirmUpdate) {
        const token = localStorage.getItem('token');
        const res = await NewsService.updateNews(newsId, newsData, token);
        console.log(res);
        navigate("/admin/news-management");
      }
    } catch (error) {
      console.error('Error updating news:', error);
    }
  };

  return (
    <div className="update-news-container">
      <h2>Update News</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input type="text" name="title" value={newsData.title} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Content:</label>
          <textarea name="content" value={newsData.content} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Category ID:</label>
         <select name="categoryId" value={newsData.categoryId} onChange={handleInputChange}>
         <option value="1">Футбол</option>
         <option value="2">Волейбол</option>
         <option value="3">Баскетбол</option>
         <option value="4">ММА</option>
         <option value="5">Теннис</option>
         <option value="6">Бокс</option>

         </select>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateNews;

