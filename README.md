# Case estudo coom JEST

Um projeto para ter uma base de uma pagina com uma arquitetura basica pra pagina simples com componentes e a integração de test unitarios com JEST
`npm install -D jest ts-jest jest-environment-jsdom @types/jest @testing-library/react @testing-library/jest-dom @testing-library/user-event`


## Execução 
`npm test` ou `npx jest` - Quem entra em ação é o Jest, que procura arquivos de teste com padrões como .test.ts, .test.tsx, .spec.ts e similares, conforme a configuração do projeto. O Jest também pode rodar em modo watch, acompanhando mudanças e reexecutando testes automaticamente.

O que acontece por baixo
O fluxo mental é mais ou menos este:
- o Jest encontra os arquivos de teste
- prepara o ambiente de execução
- se for teste de componente React, usa um ambiente de DOM em memória, normalmente jsdom
- executa cada describe e cada it/test
- compara o resultado com os expect(...)
- marca como passou ou falhou

```tsx
it('deve renderizar o botão', () => {
  render(<Button label="Enviar" />);
  expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
});
```

o Jest chama a função do teste, o React Testing Library renderiza o componente num DOM fake, e o expect verifica se o botão realmente apareceu. O React Testing Library foi feito justamente para testar a interface de um jeito próximo ao uso real da pessoa usuária.