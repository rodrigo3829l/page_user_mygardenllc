const axiosInstance = {
  create: () => axiosInstance,
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  interceptors: {
    request: {
      use: jest.fn((callback) => {
        // Simulamos una configuración básica con headers
        const config = { headers: {} };
        callback(config); // Ejecuta el interceptor con la config simulada
        return config;
      }),
    },
    response: {
      use: jest.fn((resolve) => resolve({})), // Mock del interceptor de respuesta
    },
  },
};

export default axiosInstance;
