import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonInput, IonButton, IonAlert
} from '@ionic/react';
import { registerLocal, debugUsers } from '../services/authService';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos
    if (!name || !email || !password) {
      setMessage('Por favor completa todos los campos');
      setShowAlert(true);
      return;
    }

    if (password.length < 3) {
      setMessage('La contraseña debe tener al menos 3 caracteres');
      setShowAlert(true);
      return;
    }

    try {
      console.log('Registrando nuevo usuario:', { name, email, password });
      await registerLocal({ name, email, password });
      setMessage('Usuario registrado exitosamente 🚀');
      setShowAlert(true);
      
      // Debug: ver usuarios después de registrar
      await debugUsers();
      
      // Limpiar formulario
      setName('');
      setEmail('');
      setPassword('');
    } catch (error: any) {
      console.error('Error en registro:', error);
      setMessage('Error registrando usuario: ' + error.message);
      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Registro</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" color="light">
        <form onSubmit={handleRegister}>
          <IonItem>
            <IonLabel position="stacked">Nombre *</IonLabel>
            <IonInput 
              value={name} 
              onIonInput={e => setName(e.detail.value!)} 
              placeholder="Tu nombre"
              required
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Correo *</IonLabel>
            <IonInput 
              type="email" 
              value={email} 
              onIonInput={e => setEmail(e.detail.value!)} 
              placeholder="ejemplo@mail.com"
              required
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Contraseña *</IonLabel>
            <IonInput 
              type="password" 
              value={password} 
              onIonInput={e => setPassword(e.detail.value!)} 
              placeholder="Mínimo 3 caracteres"
              required
              minlength={3}
            />
          </IonItem>

          <IonButton 
            expand="full" 
            type="submit" 
            color="primary" 
            style={{marginTop:20}}
          >
            Registrarse
          </IonButton>
        </form>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Registro'}
          message={message}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Register;