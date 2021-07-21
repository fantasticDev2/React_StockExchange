import axios from "axios";
import jwtDecode from "jwt-decode";

class JwtService {
    init() {
        this.setInterceptors();
        this.handleAuthentication();
    }

    setInterceptors = () => {
        axios.interceptors.response.use(
            response => {
                return response;
            },
            err => {
                return new Promise((resolve, reject) => {
                    if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
                        this.setSession(null);
                    }
                    throw err;
                });
            }
        );
    };

    handleAuthentication = () => {
        const access_token = this.getAccessToken();

        if (!access_token) {
            /// No access Token
            return;
        }

        if (this.isAuthTokenValid(access_token)) {
            this.setSession(access_token);
            /// Auto Login
        } else {
            this.setSession(null);
            /// Token Expired
        }
    };

    createUser = (data: any) => {
        return new Promise((resolve, reject) => {
            axios.post("/api/auth/register", data).then(response => {
                if (response.data.user) {
                    this.setSession(response.data.access_token);
                    resolve(response.data.user);
                } else {
                    reject(response.data.error);
                }
            });
        });
    };

    signInWithEmailAndPassword = (email: string, password: string) => {
        return new Promise((resolve, reject) => {
            axios(
                "http://localhost:8000/api/auth/login",
                {
                    method: "post",
                    url: "http://localhost:8000/api/auth/login",
                    data: {
                        email,
                        password
                    },
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json"
                    }
                })
                .then(response => {
                    if (response.data.user) {
                        this.setSession(response.data.access_token);
                        resolve(response.data.user);
                    } else {
                        reject(response.data.error);
                    }
                });
        });
    };

    setSession = (access_token: any) => {
        if (access_token) {
            localStorage.setItem("access_token", access_token);
            axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
        } else {
            localStorage.removeItem("access_token");
            delete axios.defaults.headers.common.Authorization;
        }
    };

    logout = () => {
        this.setSession(null);
    };

    isAuthTokenValid = (access_token: string) => {
        if (!access_token) {
            return false;
        }
        const decoded = jwtDecode(access_token);
        const currentTime = Date.now() / 1000;
        // @ts-ignore
        if (decoded.exp < currentTime) {
            console.warn("access token expired");
            return false;
        }

        return true;
    };

    getAccessToken = () => {
        return window.localStorage.getItem("access_token");
    };
}

const instance = new JwtService();

export default instance;
