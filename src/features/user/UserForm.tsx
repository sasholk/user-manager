import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const userSchema = z.object({
  name: z.string().min(3, 'Minimum 3 characters'),
  email: z.string().email('Invalid email'),
  phone: z
    .string()
    .regex(/^\+?\d{10,15}$/, 'Invalid phone number')
    .optional()
    .or(z.literal('')),
});

export type UserFormData = z.infer<typeof userSchema>;

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
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </Stack>
    </Box>
  );
}
