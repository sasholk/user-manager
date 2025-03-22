import * as z from 'zod';

export const userSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .regex(
      /^(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d-.\s]{7,10}$/,
      'Invalid phone number',
    )
    .optional()
    .or(z.literal('')),
});

export type UserFormData = z.infer<typeof userSchema>;
