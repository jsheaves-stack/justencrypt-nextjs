const API_URL = process.env.NEXT_PUBLIC_JUSTENCRYPT_API_URL;

export function checkAuthRequest() {
  return new Promise((resolve, reject) => {
    const options = { method: 'GET', credentials: 'include' };

    fetch(`${API_URL}/session`, options)
      .then((res) => {
        if (res.ok) {
          return resolve(true);
        } else {
          return resolve(false);
        }
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

export function submitLoginRequest(username, password) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    };

    fetch(`${API_URL}/session/create`, options)
      .then((res) => {
        if (res.ok) {
          return resolve(true);
        } else {
          return resolve(false);
        }
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

export function submitLogoutRequest() {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST', credentials: 'include' };

    fetch(`${API_URL}/session/destroy`, options)
      .then((res) => {
        if (res.ok) {
          return resolve(false);
        } else {
          return resolve(true);
        }
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

export function getFolderRequest(path) {
  return new Promise((resolve, reject) => {
    const options = { method: 'GET', credentials: 'include' };

    fetch(`${API_URL}/folder${path}`, options)
      .then((res) => {
        if (res.ok) {
          res
            .json()
            .then((json) => {
              return resolve(json);
            })
            .catch((err) => {
              return reject(err);
            });
        } else {
          return reject('');
        }
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

export function uploadFilesRequest(files, path) {
  return new Promise((resolve, reject) => {
    const uploadFilesPromises = [];

    if (!files) return reject();

    for (let x = 0; x < files.length; x++) {
      const file = files[x];

      const options = {
        method: 'PUT',
        credentials: 'include',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      };

      uploadFilesPromises.push(fetch(`${API_URL}/file${path}/${file.name}`, options));
    }

    Promise.all(uploadFilesPromises)
      .then((res) => {
        getFolderRequest(path)
          .then((res) => {
            return resolve(res);
          })
          .catch((err) => {
            return reject(err);
          });
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

export function deleteFileRequest(fileName, path) {
  return new Promise((resolve, reject) => {
    const options = { method: 'DELETE', credentials: 'include' };

    fetch(`${API_URL}/file${path}/${fileName}`, options)
      .then((res) => {
        if (res.ok) {
          getFolderRequest(path)
            .then((res) => {
              return resolve(res);
            })
            .catch((err) => {
              return reject(err);
            });
        } else {
          return reject('');
        }
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

export function uploadFolderRequest(folderName, path) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'PUT',
      credentials: 'include',
    };

    fetch(`${API_URL}/folder/${path}/${folderName}`, options)
      .then((res) => {
        if (res.ok) {
          getFolderRequest(path)
            .then((res) => {
              return resolve(res);
            })
            .catch((err) => {
              return reject(err);
            });
        } else {
          return resolve(false);
        }
      })
      .catch((err) => {
        return reject(err);
      });
  });
}
