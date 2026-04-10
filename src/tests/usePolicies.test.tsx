import { renderHook, waitFor } from '@testing-library/react';
import { usePolicies } from '../hooks/usePolicies';
import * as service from '../services/policiesService';

describe('usePolicies', () => {
  it('deve carregar apólices com sucesso', async () => {
    jest.spyOn(service, 'getPolicies').mockResolvedValue([
      {
        id: '1',
        customerName: 'Ana Souza',
        policyNumber: 'POL123',
        premium: 1000,
        status: 'Ativa',
      },
    ]);

    const { result } = renderHook(() => usePolicies());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.policies).toHaveLength(1);
    expect(result.current.error).toBeNull();
  });

  it('deve retornar erro quando a API falhar', async () => {
    jest.spyOn(service, 'getPolicies').mockRejectedValue(new Error('Falha'));

    const { result } = renderHook(() => usePolicies());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(
      'Não foi possível carregar as apólices.'
    );
    expect(result.current.policies).toEqual([]);
  });
});