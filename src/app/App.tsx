import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          User Manger App
        </Typography>
      </Box>
    </Container>
  );
}
