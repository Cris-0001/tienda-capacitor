import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonInput, IonButton, IonImg, IonAlert
} from '@ionic/react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { addToCart } from '../services/cartService';

const ProductForm: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [desc, setDesc] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const takePhoto = async () => {
    try {
      // Verificar permisos de cámara
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        saveToGallery: true // Opcional: guardar en galería
      });

      setPhoto(image.dataUrl || null);
    } catch (error) {
      console.error('Error al tomar foto:', error);
      setAlertMessage('Error al acceder a la cámara. Asegúrate de dar los permisos necesarios.');
      setShowAlert(true);
    }
  };

  const chooseFromGallery = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
      });

      setPhoto(image.dataUrl || null);
    } catch (error) {
      console.error('Error al elegir de galería:', error);
    }
  };

  const saveOrder = async () => {
    if (!desc.trim()) {
      setAlertMessage('Ingresa una descripción del producto');
      setShowAlert(true);
      return;
    }

    if (!price || price <= 0) {
      setAlertMessage('Ingresa un precio válido');
      setShowAlert(true);
      return;
    }

    try {
      const item = { 
        photo, 
        price, 
        desc, 
        date: new Date().toISOString(),
        id: Date.now() // ID único
      };
      
      await addToCart(item);
      setAlertMessage('Pedido agregado al carrito correctamente');
      setShowAlert(true);
      
      // Limpiar formulario
      setPhoto(null);
      setPrice(null);
      setDesc('');
    } catch (error) {
      setAlertMessage('Error al guardar el pedido');
      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Nuevo Pedido</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" color="light">
        <IonItem>
          <IonLabel position="stacked">Descripción *</IonLabel>
          <IonInput
            value={desc}
            placeholder="Ej. Caja metálica roja"
            onIonInput={e => setDesc(e.detail.value as string)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Precio *</IonLabel>
          <IonInput
            type="number"
            value={price ? price.toString() : ''}
            placeholder="Ej. 120.00"
            onIonInput={e => setPrice(Number(e.detail.value))}
          />
        </IonItem>

        <div style={{ marginTop: 20, display: 'flex', gap: '10px' }}>
          <IonButton expand="block" color="primary" onClick={takePhoto}>
            📸 Tomar foto
          </IonButton>
          <IonButton expand="block" color="secondary" onClick={chooseFromGallery}>
            🖼️ Galería
          </IonButton>
        </div>

        {photo && (
          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <IonImg 
              src={photo} 
              style={{ 
                maxWidth: 200, 
                maxHeight: 200, 
                margin: 'auto',
                borderRadius: '8px',
                border: '2px solid var(--ion-color-primary)'
              }} 
            />
            <IonButton 
              color="danger" 
              size="small" 
              onClick={() => setPhoto(null)}
              style={{ marginTop: 10 }}
            >
              Eliminar foto
            </IonButton>
          </div>
        )}

        <div style={{ marginTop: 20 }}>
          <IonButton expand="full" color="success" onClick={saveOrder}>
            💾 Agregar al carrito
          </IonButton>
        </div>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Aviso'}
          message={alertMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default ProductForm;