import { useEffect, useState } from 'react';
import type { Policy } from '../types/policy';
import { getFakePolicies } from '../services/policiesService';

export function usePolicies() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchPolicies() {
    try {
      setLoading(true);
      setError(null);
      const data = await getFakePolicies();
      setPolicies(data);
    } catch {
      setError('Não foi possível carregar as apólices.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPolicies();
  }, []);

  return {
    policies,
    loading,
    error,
    refetch: fetchPolicies,
  };
}