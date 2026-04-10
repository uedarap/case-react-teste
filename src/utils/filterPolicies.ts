import type { Policy, PolicyStatus } from '../types/policy';

interface FilterParams {
  search: string;
  status: PolicyStatus | 'Todos';
}

export function filterPolicies(
  policies: Policy[],
  { search, status }: FilterParams
) {
  return policies.filter((policy) => {
    const matchesSearch = policy.customerName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      status === 'Todos' ? true : policy.status === status;

    return matchesSearch && matchesStatus;
  });
}