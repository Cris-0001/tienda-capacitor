import React, { useEffect, useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonThumbnail, IonImg, IonButton
} from '@ionic/react';
import { getCart, removeFromCart, clearCart } from '../services/cartService';

const Cart: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const items = await getCart();
    setCart(items);
  };

  const handleRemove = async (index: number) => {
    await removeFromCart(index);
    loadCart();
  };

  const handleClear = async () => {
    await clearCart();
    loadCart();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Carrito de Compras</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" color="light">
        {cart.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <IonList>
            {cart.map((item, i) => (
              <IonItem key={i}>
                <IonThumbnail slot="start">
                  <IonImg src={item.image || item.photo}/>
                </IonThumbnail>
                <IonLabel>
                  <h2>{item.title || item.desc}</h2>
                  <p>${item.price}</p>
                </IonLabel>
                <IonButton color="danger" onClick={() => handleRemove(i)}>
                  Eliminar
                </IonButton>
              </IonItem>
            ))}
          </IonList>
        )}
        {cart.length > 0 && (
          <IonButton expand="full" color="medium" onClick={handleClear} style={{marginTop:20}}>
            Vaciar carrito
          </IonButton>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Cart;
