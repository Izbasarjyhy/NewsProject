import axios from "axios";

class CategoryService {
    static BASE_URL = "http://localhost:8096";

    static async getAllCategories(token) {
        try {
            const response = await axios.get(`${CategoryService.BASE_URL}/get-all-categories`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getCategoryById(categoryId, token) {
        try {
            const response = await axios.get(`${CategoryService.BASE_URL}/get-category/${categoryId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async createCategory(categoryData, token) {
        try {
            const response = await axios.post(`${CategoryService.BASE_URL}/admin/create-category`, categoryData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async updateCategory(categoryId, categoryData, token) {
        try {
            const response = await axios.put(`${CategoryService.BASE_URL}/admin/update-category/${categoryId}`, categoryData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async deleteCategory(categoryId, token) {
        try {
            const response = await axios.delete(`${CategoryService.BASE_URL}/admin/delete-category/${categoryId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }
}

export default CategoryService;
