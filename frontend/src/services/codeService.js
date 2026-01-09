import api from './api';

// Generate code
export const generateCode = async (data) => {
  const response = await api.post('/code/generate', data);
  return response.data;
};

// Fix code
export const fixCode = async (data) => {
  const response = await api.post('/code/fix', data);
  return response.data;
};

// Explain code
export const explainCode = async (data) => {
  const response = await api.post('/code/explain', data);
  return response.data;
};

// Optimize code
export const optimizeCode = async (data) => {
  const response = await api.post('/code/optimize', data);
  return response.data;
};

// Convert code
export const convertCode = async (data) => {
  const response = await api.post('/code/convert', data);
  return response.data;
};
