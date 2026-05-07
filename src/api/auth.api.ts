import api from "./axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const login = async (payload: LoginPayload) => {
  const res = await api.post("/auth/login", payload);
  return res.data;
};

export const register = async (payload: RegisterPayload) => {
  const res = await api.post("/auth/signup", payload);
  return res.data;
};

export const getProfile = async () => {
  const res = await api.get("/auth/profile");
  return res.data.data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};
