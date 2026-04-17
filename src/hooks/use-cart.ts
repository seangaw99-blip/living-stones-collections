'use client';

import { useCartContext, type CartItem } from '@/context/cart-context';

export function useCart() {
  const { state, dispatch } = useCartContext();

  const cartCount = state.items.length;
  const cartTotal = state.items.reduce((sum, item) => sum + item.price, 0);

  function addToCart(item: CartItem) {
    dispatch({ type: 'ADD_ITEM', payload: item });
  }

  function removeFromCart(slug: string) {
    dispatch({ type: 'REMOVE_ITEM', payload: slug });
  }

  function clearCart() {
    dispatch({ type: 'CLEAR_CART' });
  }

  function openCart() {
    dispatch({ type: 'OPEN_CART' });
  }

  function closeCart() {
    dispatch({ type: 'CLOSE_CART' });
  }

  return {
    items: state.items,
    isOpen: state.isOpen,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    clearCart,
    openCart,
    closeCart,
  };
}
