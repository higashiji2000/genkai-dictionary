import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Box sx={{ mt: 20, mb: 10, backgroundColor: "primary.main" }}>
        <Typography align="center" variant="h2" sx={{ fontWeight: 700 }}>
          限界辞典
        </Typography>
      </Box>
      <Button
        fullWidth
        variant="contained"
        sx={{
          display: "block",
          mb: 5,
          color: "primary.main",
          bgcolor: "black",
          "&:hover": { bgcolor: "black" },
        }}
        onClick={() => {
          navigate("search");
        }}
      >
        Search
      </Button>
      <Button
        fullWidth
        variant="contained"
        sx={{
          display: "block",
          color: "primary.main",
          bgcolor: "black",
          "&:hover": { bgcolor: "black" },
        }}
        onClick={() => {
          navigate("view/あ");
        }}
      >
        View
      </Button>
    </Container>
  );
};
