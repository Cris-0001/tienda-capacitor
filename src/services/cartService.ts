// src/services/cartService.ts
import { Preferences } from '@capacitor/preferences';

const CART_KEY = 'cart_items';

export async function getCart() {
  const { value } = await Preferences.get({ key: CART_KEY });
  return value ? JSON.parse(value) : [];
}

export async function addToCart(item: any) {
  const cart = await getCart();
  cart.push(item);
  await Preferences.set({ key: CART_KEY, value: JSON.stringify(cart) });
}

export async function removeFromCart(index: number) {
  const cart = await getCart();
  cart.splice(index, 1);
  await Preferences.set({ key: CART_KEY, value: JSON.stringify(cart) });
}

export async function clearCart() {
  await Preferences.remove({ key: CART_KEY });
}