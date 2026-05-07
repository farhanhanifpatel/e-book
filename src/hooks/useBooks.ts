import { useEffect, useState } from "react";
import { getBooks, createBookApi } from "../api/book.api";

interface Book {
  _id: string;
  title: string;
  author: string;
  image?: string;
}

interface Pagination {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
}

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [pagination, setPagination] = useState<Pagination | null>(null);

  // debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // fetch books
  const loadBooks = async (pageNumber = 1) => {
    setLoading(true);

    try {
      const data = await getBooks({
        page: pageNumber,
        limit: 10,
        search: debouncedSearch || undefined,
      });

      setBooks(data.books);
      setPagination(data.pagination);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks(page);
  }, [page, debouncedSearch]);

  // create book
  const createBook = async (payload: {
    title: string;
    author: string;
    image?: File;
  }) => {
    const formData = new FormData();

    formData.append("title", payload.title);
    formData.append("author", payload.author);

    if (payload.image) {
      formData.append("image", payload.image);
    }

    await createBookApi(formData);

    loadBooks(page);
  };

  return {
    books,
    loading,
    page,
    setPage,
    search,
    setSearch,
    pagination,
    loadBooks,
    createBook,
  };
};
