import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8081/api/accounts/';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }

    getAdminBoard() {
        console.log('qwerty')
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }
}

export default new UserService();