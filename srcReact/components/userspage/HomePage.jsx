// import React, { useState, useEffect } from 'react';
// import NewsService from '../service/NewsService';
// import CategoryService from '../service/CategoryService';

// function HomePage() {
//     const [news, setNews] = useState([]);
//     const [categories, setCategories] = useState([]);

//     useEffect(() => {
//         fetchNews();
//         fetchCategories(); 
//     }, []);

//     const fetchNews = async () => {
//         try {
//             const response = await NewsService.getAllNews();
//             console.log(response);
//             setNews(response.newsList);
//         } catch (error) {
//             console.error('Error fetching news:', error);
//         }
//     };

//     const fetchCategories = async () => {
//         try {
//             const response = await CategoryService.getAllCategories();
//             console.log(response);
//             setCategories(response.categoryList);
//         } catch (error) {
//             console.error('Error fetching categories:', error);
//         }
//     };

//     return (
//         <div>
//             <h1>Главная страница</h1>
//             <h2>Новости</h2>
//             <ul>
//                 {news.map(newsItem => (
//                     <li key={newsItem.id}>
//                         <h3>{newsItem.title}</h3>
//                         <p>{newsItem.content}</p>
//                     </li>
//                 ))}
//             </ul>
//             <h2>Категории</h2>
//             <ul>
//                 {categories.map(category => (
//                     <li key={category.id}>
//                         <h3>{category.name}</h3>
//                         <p>{category.description}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default HomePage;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
function HomePage(){


    return (
        <div class="content">
        <h1>News</h1>
        <h2><Link to={`/login`}>Войти</Link></h2>
    </div>
    );

}
export default HomePage;