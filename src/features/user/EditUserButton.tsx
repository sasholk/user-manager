import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function EditUserButton({ id }: { id: number }) {
  const navigate = useNavigate();
  return (
    <Button
      variant="outlined"
      color="primary"
      size="small"
      onClick={() => navigate(`/users/edit/${id}`)}
    >
      Edit
    </Button>
  );
}
