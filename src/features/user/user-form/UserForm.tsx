import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserFormData, userSchema } from './schema';

interface Props {
  initialValues?: Partial<UserFormData>;
  onSubmit: (data: UserFormData) => void;
  isSubmitting?: boolean;
}

export default function UserForm({
  initialValues,
  onSubmit,
  isSubmitting = false,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues: initialValues,
    resolver: zodResolver(userSchema),
  });

  const navigate = useNavigate();
  const handleCancelButton = () => navigate('/users');

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={2}>
        <TextField
          label="Name"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="Email"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Phone"
          {...register('phone')}
          error={!!errors.phone}
          helperText={errors.phone?.message}
        />

        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>

          <Button type="button" variant="outlined" onClick={handleCancelButton}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
