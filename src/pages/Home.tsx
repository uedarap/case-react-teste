import { useEffect, useMemo, useState } from 'react';
import { usePolicies } from '../hooks/usePolicies';
import { filterPolicies } from '../utils/filterPolicies';
import type { Policy, PolicyStatus } from '../types/policy';
import { PolicyCard } from '../components/PolicyCard';

export function Home() {
  const { policies, loading, error, refetch } = usePolicies();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<PolicyStatus | 'Todos'>('Todos');
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);

  const toggleTheme = () => {
    const current = document.documentElement.getAttribute('data-bs-theme');
    const next = current === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-bs-theme', next);
  };

  useEffect(() => {
    toggleTheme();
  }, []);


  const filteredPolicies = useMemo(() => {
    return filterPolicies(policies, { search, status });
  }, [policies, search, status]);

  if (loading) return <p>Carregando...</p>;

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={refetch}>Tentar novamente</button>
      </div>
    );
  }

  return (
    <main>
      <h1>Apólices</h1>

      <input
        placeholder="Buscar cliente"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as PolicyStatus | 'Todos')}
      >
        <option value="Todos">Todos</option>
        <option value="Ativa">Ativa</option>
        <option value="Pendente">Pendente</option>
        <option value="Cancelada">Cancelada</option>
      </select>

      <section>
        {filteredPolicies.map((policy) => (
          <PolicyCard
            key={policy.id}
            policy={policy}
            onSelect={setSelectedPolicy}
          />
        ))}
      </section>

      {selectedPolicy && (
        <aside>
          <h2>Detalhes da Apólice</h2>
          <p>Cliente: {selectedPolicy.customerName}</p>
          <p>Número: {selectedPolicy.policyNumber}</p>
          <p>Status: {selectedPolicy.status}</p>
        </aside>
      )}
    </main>
  );
}

