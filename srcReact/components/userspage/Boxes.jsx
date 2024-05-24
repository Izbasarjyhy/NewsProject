import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NewsService from '../service/NewsService';
import footballImage from './images/boxes.jpg'; 
import './Football.css'; // Импорт файла стилей

function Boxes() {
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
  return (
    <div className="football-container">
    <div className="football-image-container">
          <img src={footballImage} alt="Football" className="football-image" />
        </div>
      <h1 className="page-title">Boxes</h1>

      <div className="football-info">
        
        <div className="football-details">
          <tbody>
          {news && news.map(singleNews => (
            <p key={singleNews.id}>
              <h1>{singleNews.title}</h1>
              <h2>{singleNews.content}</h2>
              <p>{singleNews.data}</p>
              
            </p>
          ))}
        </tbody>
        </div>
      </div>
    </div>
  );
}

export default Boxes;