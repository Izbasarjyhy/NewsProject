
// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Navbar from './components/common/Navbar';
// import LoginPage from './components/auth/LoginPage';
// import RegistrationPage from './components/auth/RegistrationPage';
// import FooterComponent from './components/common/Footer';
// import UserService from './components/service/UserService';
// import UpdateUser from './components/userspage/UpdateUser';
// import UserManagementPage from './components/userspage/UserManagementPage';
// import ProfilePage from './components/userspage/ProfilePage';
// import NewsManagementPage from './components/userspage/NewsManagementPage';
// import UpdateNews from './components/userspage/UpdateNews';

// function App() {
//   return (
//     <BrowserRouter>
//       <div className="App">
//         <Navbar />
//         <div className="content">
//           <Routes>
//             <Route exact path="/" element={<LoginPage />} />
//             <Route exact path="/login" element={<LoginPage />} />
//             <Route path="/profile" element={<ProfilePage />} />

//             {/* Check if user is authenticated and admin before rendering admin-only routes */}
//             {UserService.adminOnly() && (
//               <>
//                 <Route path="/register" element={<RegistrationPage />} />
//                 <Route path="/admin/user-management" element={<UserManagementPage />} />
//                 <Route path="/update-user/:userId" element={<UpdateUser />} />
//                 <Route path="/admin/news-management" element={<NewsManagementPage />} />
//                 <Route path="/admin/update-news/:newsId" element={<UpdateNews />} />
//               </>
//             )}
//             <Route path="*" element={<Navigate to="/login" />} />
//           </Routes>
//         </div>
//         <FooterComponent />
//       </div>
//     </BrowserRouter>
//   );
// }
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/common/Navbar';
import LoginPage from './components/auth/LoginPage';
import RegistrationPage from './components/auth/RegistrationPage';
import FooterComponent from './components/common/Footer';
import UserService from './components/service/UserService';
import UpdateUser from './components/userspage/UpdateUser';
import UserManagementPage from './components/userspage/UserManagementPage';
import ProfilePage from './components/userspage/ProfilePage';
import NewsManagementPage from './components/userspage/NewsManagementPage';
import CategoryManagementPage from './components/userspage/CategoryManagementPage';
import UpdateNews from './components/userspage/UpdateNews';
import CreateNews from './components/userspage/CreateNews';
import HomePage from './components/userspage/HomePage';
import CreateCategory from './components/userspage/CreateCategory'; // Импорт компонента для создания категории
import UpdateCategory from './components/userspage/UpdateCategory';
import Football from './components/userspage/Football';
import Basketball from './components/userspage/Basketball';
import Boxes from './components/userspage/Boxes';
import Tennis from './components/userspage/Tennis';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(UserService.isAuthenticated());
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogout = () => {
    UserService.logout();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    setIsAdmin(UserService.isAdmin()); // Проверяем, является ли пользователь администратором
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogout={handleLogout} />
        <div className="content">
          <Routes>
            <Route exact path="/" element={isLoggedIn ? <Navigate to="/profile" /> : <HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/create-news" element={<CreateNews />} />
            <Route path="/create-category" element={<CreateCategory />} /> // Добавляем маршрут для создания категории
            <Route path="/admin/update-category/:categoryId" element={<UpdateCategory />} /> // Добавляем маршрут для обновления категории
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin/user-management" element={<UserManagementPage />} />
            <Route path="/admin/news-management" element={<NewsManagementPage />} />
            <Route path="/admin/category-management" element={<CategoryManagementPage />} />
            <Route path="/update-user/:userId" element={<UpdateUser />} />
            <Route path="/admin/update-news/:newsId" element={<UpdateNews />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/football" element={<Football />} />
            <Route path="/basketball" element={<Basketball />} />
            <Route path="/boxes" element={<Boxes />} />
            <Route path="/tennis" element={<Tennis />} />
          </Routes>
        </div>
        <FooterComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;
