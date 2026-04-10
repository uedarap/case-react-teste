import type { Policy } from '../types/policy';
import { mockedPolicies } from '../mocks/policies';

export async function getPolicies(): Promise<Policy[]> {
  const response = await fetch('/api/policies');

  if (!response.ok) {
    throw new Error('Erro ao buscar apólices');
  }

  return response.json() as Promise<Policy[]>;
}

export async function getFakePolicies(): Promise<Policy[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockedPolicies);
    }, 500);
  });
}