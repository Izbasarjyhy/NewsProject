import axios from "axios";

class NewsService {
    static BASE_URL = "http://localhost:8096";

    static async getAllNews(token) {
        try {
            const response = await axios.get(`${NewsService.BASE_URL}/get-all-news`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getNewsById(newsId, token) {
        try {
            const response = await axios.get(`${NewsService.BASE_URL}/get-news/${newsId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async createNews(newsData, token) {
        try {
            const response = await axios.post(`${NewsService.BASE_URL}/create-news`, newsData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async updateNews(newsId, newsData, token) {
        try {
            const response = await axios.put(`${NewsService.BASE_URL}/admin/update-news/${newsId}`, newsData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async deleteNews(newsId, token) {
        try {
            const response = await axios.delete(`${NewsService.BASE_URL}/admin/delete-news/${newsId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }
}

export default NewsService;
