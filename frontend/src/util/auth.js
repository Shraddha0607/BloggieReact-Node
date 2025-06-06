export function getAuthToken() {
    const token = localStorage.getItem('token');

    if(!token) {
        return null;
    }

    return token;
}

export function loader() {
    return getAuthToken();
}

export function checkAuthLoader() {
    const token = getAuthToken();

    if(!token) {
        return redirect('/auth');
    }

    return null;
}