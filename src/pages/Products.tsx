import React, { useEffect, useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonThumbnail, IonImg, IonButton
} from '@ionic/react';
import { addToCart } from '../services/cartService';
import api from '../services/api';

const Products: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Error cargando productos', err);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (product: any) => {
    await addToCart(product);
    alert(`${product.title} agregado al carrito 🛒`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Productos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" color="light">
        <IonList>
          {products.map((p) => (
            <IonItem key={p.id}>
              <IonThumbnail slot="start">
                <IonImg src={p.image}/>
              </IonThumbnail>
              <IonLabel>
                <h2>{p.title}</h2>
                <p>${p.price}</p>
              </IonLabel>
              <IonButton slot="end" color="primary" onClick={() => handleAddToCart(p)}>
                Agregar
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Products;