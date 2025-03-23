import { customRender } from '@/test/utils';
import { fireEvent, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { vi } from 'vitest';
import { EditUserButton } from '../EditUserButton';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('EditUserButton', () => {
  it('navigates to edit page', () => {
    const navigate = vi.fn();
    (useNavigate as unknown as jest.Mock).mockReturnValue(navigate);

    customRender(<EditUserButton id={5} />);

    fireEvent.click(screen.getByRole('button', { name: /edit/i }));

    expect(navigate).toHaveBeenCalledWith('/users/edit/5');
  });
});
