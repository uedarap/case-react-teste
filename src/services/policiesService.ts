import type { Policy } from '../types/policy';

export async function getPolicies(): Promise<Policy[]> {
  const response = await fetch('/api/policies');

  if (!response.ok) {
    throw new Error('Erro ao buscar apólices');
  }

  return response.json() as Promise<Policy[]>;
}