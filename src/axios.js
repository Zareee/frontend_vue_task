import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost/backend_php_task/routes/api.php", 
})

const token = localStorage.getItem("token")
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

export default api 
