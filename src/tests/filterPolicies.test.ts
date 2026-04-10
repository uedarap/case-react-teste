import { filterPolicies } from '../utils/filterPolicies';
import type { Policy } from '../types/policy';

const mockPolicies: Policy[] = [
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
];

describe('filterPolicies', () => {
  it('deve filtrar por nome do cliente', () => {
    const result = filterPolicies(mockPolicies, {
      search: 'Ana',
      status: 'Todos',
    });

    expect(result).toHaveLength(1);
    expect(result[0].customerName).toBe('Ana Souza');
  });

  it('deve filtrar por status', () => {
    const result = filterPolicies(mockPolicies, {
      search: '',
      status: 'Cancelada',
    });

    expect(result).toHaveLength(1);
    expect(result[0].status).toBe('Cancelada');
  });

  it('deve combinar busca e status', () => {
    const result = filterPolicies(mockPolicies, {
      search: 'Carlos',
      status: 'Cancelada',
    });

    expect(result).toHaveLength(1);
  });

  it('deve retornar vazio quando não encontrar resultados', () => {
    const result = filterPolicies(mockPolicies, {
      search: 'João',
      status: 'Todos',
    });

    expect(result).toHaveLength(0);
  });
});