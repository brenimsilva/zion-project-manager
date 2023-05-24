export const APP_ROUTES = {
    private: {
        dashboard: {
            name: '/dashboard'
        }
    },
    public: {
        home: "/",
        login: "/login",
        admin: "/admin"
    }
}

export function checkPublicRoute(asPath: string): boolean {
    const appPublicRoutes = Object.values(APP_ROUTES.public);

    return appPublicRoutes.includes(asPath);
}

export function checkCookiesForToken() {
    const userToken = localStorage.getItem("datamatrix.token");
    console.log(userToken);

    return !!userToken;
}