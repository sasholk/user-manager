import { customRender } from '@/test/utils';
import { screen } from '@testing-library/react';
import { UserTable } from '../UsersTable';

const mockUsers = [
  { id: 1, name: 'Test User', email: 'test@example.com', phone: '123456789' },
];

describe('UserTable', () => {
  it('renders user info correctly', () => {
    customRender(<UserTable users={mockUsers} />);
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('123456789')).toBeInTheDocument();
  });
});
