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

- Jest: roda os testes, organiza suites, mostra falhas, mocks e spies
- React Testing Library: renderiza componente e busca elementos na tela
- user-event: simula interação mais parecida com usuário real, como digitar e clicar, e costuma ser preferido em vez de disparar eventos “na mão”

```tsx
const onClick = jest.fn();
render(<Button onClick={onClick} />);
await user.click(screen.getByRole('button'));
expect(onClick).toHaveBeenCalled();
```

Aqui:
- jest.fn() cria uma função falsa
- render desenha o componente
- user.click simula clique
- expect valida o efeito esperado

### Como o Jest sabe o que rodar
Ele usa a configuração do projeto, normalmente em algo como:

```ts
// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
};

export default config;
```

Alguns pontos importantes:
- testEnvironment: 'jsdom' é o que deixa componente React funcionar no teste
- setupFilesAfterEnv geralmente importa @testing-library/jest-dom
- testMatch define quais arquivos são testes

### Watch
`npx jest --watch`
o Jest observa alterações no projeto e roda os testes relevantes de novo. Ele também permite focar em testes ou arquivos específicos.

## E o Wallaby, onde entra?
O Wallaby não substitui o Jest no sentido de inventar outra lógica de teste.
Ele funciona integrado ao framework de teste e roda os testes continuamente no editor, mostrando resultado, cobertura, logs e erros ao lado do código. A própria documentação diz que, no caso do Jest, o Wallaby roda dentro do pipeline de execução do Jest e tende a devolver os mesmos resultados que você teria pela linha de comando.