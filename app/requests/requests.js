const API_URL = process.env.NEXT_PUBLIC_JUSTENCRYPT_API_URL;

export function checkAuthRequest() {
    console.log(process)
    return new Promise((resolve, reject) => {
        const options = { method: "GET", credentials: 'include' };

        fetch(`${API_URL}/session`, options).then((res) => {
            if (res.ok) {
                return resolve(true);
            } else {
                return resolve(false);
            }
        }).catch((err) => {
            return reject(err);
        });
    });
}

export function submitLoginRequest(username, password) {
    return new Promise((resolve, reject) => {
        const options = {
            method: "POST",
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        };

        fetch(`${API_URL}/session/create`, options).then((res) => {
            if (res.ok) {
                return resolve(true);
            } else {
                return resolve(false);
            }
        }).catch((err) => {
            return reject(err);
        });
    });
}

export function submitLogoutRequest() {
    return new Promise((resolve, reject) => {
        const options = { method: "POST", credentials: 'include' };

        fetch(`${API_URL}/session/destroy`, options).then((res) => {
            if (res.ok) {
                return resolve(false);
            } else {
                return resolve(true);
            }
        }).catch((err) => {
            return reject(err);
        });
    });
}

export function getFolderRequest(path) {
    return new Promise((resolve, reject) => {
        const options = { method: "GET", credentials: 'include' };

        fetch(`${API_URL}/folder${path}`, options).then((res) => {
            if (res.ok) {
                res.json().then((json) => {
                    return resolve(json);
                }).catch((err) => {
                    return reject(err);
                });
            } else {
                return reject("")
            }
        }).catch((err) => {
            return reject(err);
        });
    });
}