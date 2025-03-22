import { customRender } from '@/test/utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import UserForm from '../UserForm';

describe('UserForm', () => {
  it('submits valid form data', async () => {
    const handleSubmit = vi.fn();

    customRender(<UserForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Oleksandr' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/phone/i), {
      target: { value: '+380931234567' },
    });

    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          name: 'Oleksandr',
          email: 'test@example.com',
          phone: '+380931234567',
        },
        expect.anything(), // react-hook-form context
      );
    });
  });
});
