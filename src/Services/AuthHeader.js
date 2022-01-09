export default function authHeader() {
    const token = localStorage.getItem("user");

    if (token) {
        console.log("token: " + token)
        return { Authorization: 'Bearer ' + token };
    } else {
        return { Authorization: '' };
    }
}

