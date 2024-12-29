export const api = "http://localhost:3000/api/v1";

export const defaultRequestConfig = (method: string, data: Object) => {
  let config;

  config = {
    method: method,
    body: data,
    headers: {},
  };

  return config;
};
