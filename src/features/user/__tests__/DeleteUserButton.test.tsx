import { customRender } from '@/test/utils';
import { fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { DeleteUserButton } from '../DeleteUserButton';

vi.mock('@/entities/user/model/userApi', async () => {
  const original = await vi.importActual<any>('@/entities/user/model/userApi');
  return {
    ...original,
    useDeleteUserMutation: () => [vi.fn()],
  };
});

describe('DeleteUserButton', () => {
  it('confirms and deletes user', () => {
    window.confirm = vi.fn(() => true);

    customRender(<DeleteUserButton id={1} />);
    fireEvent.click(screen.getByRole('button', { name: /delete/i }));

    expect(window.confirm).toHaveBeenCalledWith(
      'Are you sure you want to delete this user?',
    );
  });
});
