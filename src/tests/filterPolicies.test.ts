// O que está sendo testado
// Uma função que recebe:

// lista de apólices
// texto de busca
// status

// e devolve a lista filtrada.
// Por que esse teste é importante? - Porque é a regra de negócio mais isolada.

// Aqui você não testa:
// Você testa só:
// “essa lógica retorna o resultado certo?”

// describe('filterPolicies')
// “estou testando a função filterPolicies”

// it('deve filtrar por nome do cliente')
// “ela deveria filtrar pelo nome”

// const result = ...
// executa a função

// expect(...)
// verifica se o retorno veio certo


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