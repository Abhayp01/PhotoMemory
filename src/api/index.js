import api from "./client";

export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  logout: () => api.post("/auth/logout"),
  refresh: () => api.post("/auth/refresh"),
  changePassword: (data) => api.post("/auth/change-password", data),
};

export const userAPI = {
  getMe: () => api.get("/users/me"),
  updateProfile: (data) => api.patch("/users/me", data),
  getProfile: (username) => api.get(`/users/${username}`),
  follow: (userId) => api.post(`/users/${userId}/follow`),
  unfollow: (userId) => api.delete(`/users/${userId}/follow`),
  getFollowStatus: (userId) => api.get(`/users/${userId}/follow-status`),
  getFollowers: (userId, params) => api.get(`/users/${userId}/followers`, { params }),
  getFollowing: (userId, params) => api.get(`/users/${userId}/following`, { params }),
};

export const imageAPI = {
  upload: (formData) =>
    api.post("/images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  getById: (id) => api.get(`/images/${id}`),
  getMyImages: (params) => api.get("/images/me", { params }),
  getUserImages: (userId, params) => api.get(`/images/user/${userId}`, { params }),
  update: (id, data) => api.patch(`/images/${id}`, data),
  delete: (id) => api.delete(`/images/${id}`),
  like: (id) => api.post(`/images/${id}/like`),
  unlike: (id) => api.delete(`/images/${id}/like`),
  explore: (params) => api.get("/images/explore", { params }),
  search: (params) => api.get("/images/search", { params }),
  searchByTag: (tag, params) => api.get(`/images/tags/${tag}`, { params }),
  getShared: (shareToken) => api.get(`/images/shared/${shareToken}`),
};

export const feedAPI = {
  getFeed: (params) => api.get("/feed", { params }),
};
