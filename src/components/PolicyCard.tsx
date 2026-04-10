import type { Policy } from '../types/policy';

interface PolicyCardProps {
  policy: Policy;
  onSelect: (policy: Policy) => void;
}

export function PolicyCard({ policy, onSelect }: PolicyCardProps) {
  return (
    <article>
      <h3>{policy.customerName}</h3>
      <p>Número: {policy.policyNumber}</p>
      <p>Status: {policy.status}</p>
      <p>Prêmio: R$ {policy.premium}</p>

      <button onClick={() => onSelect(policy)}>
        Ver detalhes
      </button>
    </article>
  );
}