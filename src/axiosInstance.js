import axios from 'axios';

// Function to get the CSRF token from the browser's cookies
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Create an axios instance with a base URL
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000', // Your Django backend address
    headers: {
        'Content-Type': 'application/json',
    },
    // This is the line you need to add
    withCredentials: true, // This tells axios to send cookies (like the sessionid) with every request
});

// Use an interceptor to automatically add the CSRF token to every request header
axiosInstance.interceptors.request.use(config => {
    const csrfToken = getCookie('csrftoken');
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default axiosInstance;