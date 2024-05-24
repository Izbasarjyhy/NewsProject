// NewsManagementPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NewsService from '../service/NewsService';
import './NewsManagementPage.css'; // Импорт файла стилей

function NewsManagementPage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await NewsService.getAllNews(token);
      setNews(response.newsList);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const deleteNews = async (newsId) => {
    console.log('Deleting news with id:', newsId); 
    try {
      const confirmDelete = window.confirm('Господин вы хотите его удалить?');
      const token = localStorage.getItem('token'); 
      if (confirmDelete) {
        await NewsService.deleteNews(newsId, token);
        fetchNews();
      }
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  return (
    <div className="news-management-container">
      <h2 className="page-title">News Management Page</h2>
      <button className='add-news-button'>
        <Link to="/create-news" className="link-style">Add News</Link>
      </button>
      <table className="news-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {news && news.map(singleNews => (
            <tr key={singleNews.id}>
              <td>{singleNews.id}</td>
              <td>{singleNews.title}</td>
              <td>{singleNews.content}</td>
              <td>
                <button className='delete-button' onClick={() => deleteNews(singleNews.id)}>Delete</button>
                <button className='update-button'>
                  <Link to={`/admin/update-news/${singleNews.id}`} className="link-style">Update</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NewsManagementPage;
