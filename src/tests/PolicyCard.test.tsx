

// O que está sendo testado
// O componente renderiza:

// nome
// número da apólice
// status
// botão

// e quando clica no botão, chama a função recebida via prop.

// O que isso quer dizer?
// A gente monta o componente com um dado fake e confere se ele apareceu corretamente na tela.

// render(...)
// Monta o componente num DOM fake.

// screen.getByText(...)
// Procura o texto renderizado.

// toBeInTheDocument()
// Confirma que esse elemento existe na tela.

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