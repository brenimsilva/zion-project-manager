export const APP_ROUTES = {
    private: {
        dashboard: {
            name: '/dashboard'
        }
    },
    public: {
        home: "/",
        login: "/login"
    }
}

export function checkPublicRoute(asPath: string): boolean {
    const appPublicRoutes = Object.values(APP_ROUTES.public);

    return appPublicRoutes.includes(asPath);
}

export function checkLocalStorageToken() {
    const userToken = localStorage.getItem("datamatrix.token");
    console.log(userToken);

    return !!userToken;
}