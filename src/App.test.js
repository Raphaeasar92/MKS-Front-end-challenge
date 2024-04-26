import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders product list and cart', () => {
  render(<App />);

  // Verifica se o título da página está presente
  const pageTitle = screen.getByText(/Loja de Produtos/i);
  expect(pageTitle).toBeInTheDocument();

  // Verifica se o shimmer/skeleton está presente enquanto os dados estão carregando
  const skeletonElements = screen.getAllByRole('status');
  expect(skeletonElements.length).toBeGreaterThan(0);

  // Simula o carregamento dos dados
  setTimeout(() => {
    // Verifica se os produtos da loja são renderizados corretamente
    const productNames = screen.getAllByRole('listitem');
    expect(productNames.length).toBeGreaterThan(0);

    // Verifica se o carrinho está inicialmente vazio
    const cartTitle = screen.getByText(/Carrinho/i);
    expect(cartTitle).toBeInTheDocument();
    const emptyCartMessage = screen.getByText(/Nenhum item no carrinho/i);
    expect(emptyCartMessage).toBeInTheDocument();

    // Simula a adição de um produto ao carrinho
    const addButton = screen.getAllByText(/Adicionar ao Carrinho/i)[0];
    userEvent.click(addButton);

    // Verifica se o produto adicionado aparece no carrinho
    const cartItem = screen.getByText(/- Quantidade: 1/i);
    expect(cartItem).toBeInTheDocument();
  }, 1000);
});