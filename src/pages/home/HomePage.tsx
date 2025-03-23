import { Box, Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <Box p={4}>
      <Typography variant="h4" mb={2}>
        Welcome to the User Manager App
      </Typography>

      <Stack direction="row" spacing={2}>
        <Button variant="contained" component={Link} to="/users">
          View Users
        </Button>

        <Button variant="outlined" component={Link} to="/users/new">
          Create User
        </Button>
      </Stack>
    </Box>
  );
}
