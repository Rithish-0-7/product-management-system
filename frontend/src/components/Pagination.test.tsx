import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';

describe('Pagination', () => {
  it('changes page when user clicks next', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Pagination page={1} totalPages={3} onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: /next/i }));
    expect(onChange).toHaveBeenCalledWith(2);
  });
});
