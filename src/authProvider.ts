import { API_BASE_URL } from "./config";

const COOKIE_EXPIRATION = 60 * 60 * 12;

const setCookie = (name: string, value: string) => {
    document.cookie = `${name}=${value}; path=/; max-age=${COOKIE_EXPIRATION}; SameSite=Strict`;
};

const getCookie = (name: string) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find(row => row.startsWith(name + "="));
    return cookie ? cookie.split("=")[1] : null;
};

const deleteCookie = (name: string) => {
    document.cookie = `${name}=; path=/; max-age=0; SameSite=Strict`;
};

const clearAuthCookies = () => {
    deleteCookie("adminToken");
    deleteCookie("adminUser");
};

const authProvider = {
    login: async ({ username, password }: any) => {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: username,
                password,
            }),
        });

        const data = await response.json();

        if (!response.ok || !data.success || !data.user?.token) {
            clearAuthCookies();
            throw new Error(data.message || "Login failed");
        }

        setCookie("adminToken", data.user.token);
        setCookie("adminUser", encodeURIComponent(JSON.stringify(data.user)));

        return Promise.resolve();
    },

    logout: async () => {
        clearAuthCookies();
        return Promise.resolve();
    },

    checkAuth: async () => {
        const token = getCookie("adminToken");
        const user = getCookie("adminUser");

        if (!token || !user) {
            clearAuthCookies();
            return Promise.reject({ redirectTo: "/login" });
        }

        return Promise.resolve();
    },

    checkError: async ({ status }: any) => {
        if (status === 401 || status === 403) {
            clearAuthCookies();
            return Promise.reject({ redirectTo: "/login" });
        }
        return Promise.resolve();
    },

    getPermissions: async () => Promise.resolve(),

    getIdentity: async () => {
        const user = getCookie("adminUser");

        if (!user) {
            return Promise.reject();
        }

        const parsedUser = JSON.parse(decodeURIComponent(user));

        return Promise.resolve({
            id: parsedUser._id,
            fullName: parsedUser.email,
        });
    },
};

export default authProvider;