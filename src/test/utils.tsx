import { AppProvider } from '@/app/probiders';
import { render } from '@testing-library/react';

export function customRender(ui: React.ReactNode) {
  return render(<AppProvider>{ui}</AppProvider>);
}
