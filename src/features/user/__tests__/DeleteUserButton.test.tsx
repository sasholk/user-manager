import { customRender } from '@/test/utils';
import { fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { DeleteUserButton } from '../DeleteUserButton';

const deleteUserMock = vi.fn();

vi.mock('@/entities/user/model/userApi', async () => {
  const original = await vi.importActual<any>('@/entities/user/model/userApi');
  return {
    ...original,
    useDeleteUserMutation: () => [deleteUserMock],
  };
});

describe('DeleteUserButton', () => {
  it('opens confirm modal and deletes user', async () => {
    customRender(<DeleteUserButton id={1} />);

    fireEvent.click(screen.getByRole('button', { name: /^delete$/i }));

    expect(
      await screen.findByText(/are you sure you want to delete/i),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /^delete$/i }));

    expect(deleteUserMock).toHaveBeenCalledWith(1);
  });
});
