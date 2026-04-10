import type { Policy } from '../types/policy';

export const mockedPolicies: Policy[] = [
  {
    id: '1',
    customerName: 'Ana Souza',
    policyNumber: 'POL123',
    premium: 1200,
    status: 'Ativa',
  },
  {
    id: '2',
    customerName: 'Carlos Lima',
    policyNumber: 'POL456',
    premium: 980,
    status: 'Pendente',
  },
  {
    id: '3',
    customerName: 'Marina Alves',
    policyNumber: 'POL789',
    premium: 1500,
    status: 'Cancelada',
  },
];