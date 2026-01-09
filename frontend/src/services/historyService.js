import api from './api';

// Get all history
export const getHistory = async (params = {}) => {
  const response = await api.get('/history', { params });
  return response.data;
};

// Get history by ID
export const getHistoryById = async (id) => {
  const response = await api.get(`/history/${id}`);
  return response.data;
};

// Create history
export const createHistory = async (data) => {
  const response = await api.post('/history', data);
  return response.data;
};

// Update history
export const updateHistory = async (id, data) => {
  const response = await api.put(`/history/${id}`, data);
  return response.data;
};

// Delete history
export const deleteHistory = async (id) => {
  const response = await api.delete(`/history/${id}`);
  return response.data;
};

// Toggle favorite
export const toggleFavorite = async (id) => {
  const response = await api.patch(`/history/${id}/favorite`);
  return response.data;
};

// Get statistics
export const getStats = async () => {
  const response = await api.get('/history/stats');
  return response.data;
};
