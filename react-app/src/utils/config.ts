export const BASEURL =
    process.env.NODE_ENV === 'production'
        ? (process.env.REACT_APP_PROD_BASE_URL as string)
        : 'http://localhost:5000';