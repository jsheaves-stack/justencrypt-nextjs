export function sanitizePath(path) {
    // Trim leading and trailing whitespace and replace multiple slashes with a single slash
    let sanitizedPath = path.trim().replace(/\/+/g, '/');

    // Remove trailing slash if it's not the root path
    if (sanitizedPath.length > 1 && sanitizedPath.endsWith('/')) {
        sanitizedPath = sanitizedPath.slice(0, -1);
    }

    // Ensure it starts with a single slash
    if (!sanitizedPath.startsWith('/')) {
        sanitizedPath = '/' + sanitizedPath;
    }

    return sanitizedPath;
}

export function popPath(path) {
    // Trim any trailing slashes and split the path into segments
    const segments = path.replace(/\/$/, '').split('/');

    // Remove the last segment if there are multiple segments
    if (segments.length > 1) {
        segments.pop();
    }

    // Join the segments back into a path, ensuring the root path is '/'
    return segments.length > 1 ? '/' + segments.join('/') : '/';
}