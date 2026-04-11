import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PolicyCard } from '../components/PolicyCard';

const mockPolicy = {
  id: '1',
  customerName: 'Ana Souza',
  policyNumber: 'POL123',
  premium: 1000,
  status: 'Ativa' as const,
};

describe('PolicyCard', () => {
  it('deve renderizar os dados da apólice', () => {
    render(<PolicyCard policy={mockPolicy} onSelect={jest.fn()} />);

    expect(screen.getByText('Ana Souza')).toBeInTheDocument();
    expect(screen.getByText(/POL123/)).toBeInTheDocument();
    expect(screen.getByText(/Ativa/)).toBeInTheDocument();
  });

  it('deve chamar onSelect ao clicar em ver detalhes', async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup();

    render(<PolicyCard policy={mockPolicy} onSelect={onSelect} />);

    await user.click(screen.getByRole('button', { name: /ver detalhes/i }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(mockPolicy);
  });
});