import api from "./axios";

export const getBooks = async (params: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const res = await api.get("/books", { params });

  return res.data.data;
};

export const createBookApi = async (formData: FormData) => {
  const res = await api.post("/books", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
