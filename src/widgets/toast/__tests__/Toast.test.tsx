import { store } from '@/app/store';
import { MainLayout } from '@/shared/layouts/main-layout';
import { customRender } from '@/test/utils';
import { showToast } from '@/widgets/toast/model/slice';
import { fireEvent, screen } from '@testing-library/react';

describe('Toast notification', () => {
  it('displays and hides toast message', async () => {
    // First render the layout (which includes the Toast component)
    customRender(<MainLayout />);

    // Dispatch toast manually
    store.dispatch(
      showToast({
        message: 'User deleted successfully',
        severity: 'success',
      }),
    );

    // ✅ Toast should appear
    expect(
      await screen.findByText(/user deleted successfully/i),
    ).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-standardSuccess');

    // ✅ Close the toast
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    // ✅ Toast should disappear after hide action
    expect(store.getState().toast.open).toBe(false);
  });
});
