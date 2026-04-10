export type PolicyStatus = 'Ativa' | 'Pendente' | 'Cancelada';

export interface Policy {
  id: string;
  customerName: string;
  policyNumber: string;
  premium: number;
  status: PolicyStatus;
}