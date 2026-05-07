import { useBooks } from "../hooks/useBooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
  CircularProgress,
  Paper,
} from "@mui/material";

export default function MyBooks() {
  const {
    books,
    loading,
    page,
    setPage,
    search,
    setSearch,
    pagination,
    createBook,
  } = useBooks();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [creating, setCreating] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      setCreating(true);

      await createBook({
        title,
        author,
        image: image || undefined,
      });

      setTitle("");
      setAuthor("");
      setImage(null);
    } catch (error) {
      console.log(error);
    } finally {
      setCreating(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
          }}
        >
          📚 My Books
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <TextField
            label="Search books"
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>

      {/* CREATE BOOK */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 3,
          mb: 5,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
          }}
        >
          Create New Book
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <TextField
            label="Book Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Author Name"
            fullWidth
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <Button variant="outlined" component="label">
            Upload Image
            <input
              hidden
              type="file"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </Button>

          <Button
            variant="contained"
            onClick={handleCreate}
            disabled={creating}
          >
            {creating ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Create Book"
            )}
          </Button>
        </Box>
      </Paper>

      {/* BOOK LIST */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 5,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {books.map((book) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={book._id}>
              <Card
                sx={{
                  borderRadius: 4,
                  height: "100%",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                  },
                }}
              >
                {book.image ? (
                  <CardMedia
                    component="img"
                    height="220"
                    image={book.image}
                    alt={book.title}
                  />
                ) : (
                  <Box
                    sx={{
                      height: 220,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      bgcolor: "#f3f4f6",
                    }}
                  >
                    <Typography color="text.secondary">No Image</Typography>
                  </Box>
                )}

                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    {book.title}
                  </Typography>

                  <Typography color="text.secondary">
                    by {book.author}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* PAGINATION */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          mt: 5,
        }}
      >
        <Button
          variant="contained"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </Button>

        <Typography>
          Page {page} of {pagination?.totalPages || 1}
        </Typography>

        <Button
          variant="contained"
          disabled={page === pagination?.totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
}
