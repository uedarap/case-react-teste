import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Home } from '../pages/Home';
import * as hook from '../hooks/usePolicies';

describe('Home', () => {
  it('deve exibir loading', () => {
    jest.spyOn(hook, 'usePolicies').mockReturnValue({
      policies: [],
      loading: true,
      error: null,
      refetch: jest.fn(),
    });

    render(<Home />);

    expect(screen.getByText(/carregando/i)).toBeInTheDocument();
  });

  it('deve exibir erro', () => {
    jest.spyOn(hook, 'usePolicies').mockReturnValue({
      policies: [],
      loading: false,
      error: 'Não foi possível carregar as apólices.',
      refetch: jest.fn(),
    });

    render(<Home />);

    expect(
      screen.getByText(/não foi possível carregar as apólices/i)
    ).toBeInTheDocument();
  });

  it('deve filtrar apólices por busca', async () => {
    const user = userEvent.setup();

    jest.spyOn(hook, 'usePolicies').mockReturnValue({
      policies: [
        {
          id: '1',
          customerName: 'Ana Souza',
          policyNumber: 'POL123',
          premium: 1000,
          status: 'Ativa',
        },
        {
          id: '2',
          customerName: 'Carlos Lima',
          policyNumber: 'POL456',
          premium: 2000,
          status: 'Cancelada',
        },
      ],
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    render(<Home />);

    await user.type(screen.getByPlaceholderText(/buscar cliente/i), 'Ana');

    expect(screen.getByText('Ana Souza')).toBeInTheDocument();
    expect(screen.queryByText('Carlos Lima')).not.toBeInTheDocument();
  });

  it('deve abrir detalhes ao clicar em ver detalhes', async () => {
    const user = userEvent.setup();

    jest.spyOn(hook, 'usePolicies').mockReturnValue({
      policies: [
        {
          id: '1',
          customerName: 'Ana Souza',
          policyNumber: 'POL123',
          premium: 1000,
          status: 'Ativa',
        },
      ],
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    render(<Home />);

    await user.click(screen.getByRole('button', { name: /ver detalhes/i }));

    expect(screen.getByText(/detalhes da apólice/i)).toBeInTheDocument();
    expect(screen.getByText(/cliente: ana souza/i)).toBeInTheDocument();
  });
});