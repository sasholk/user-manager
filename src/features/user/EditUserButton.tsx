import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Props {
  id: number;
}

export function EditUserButton({ id }: Props) {
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
