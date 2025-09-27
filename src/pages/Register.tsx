import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonInput, IonButton
} from '@ionic/react';
import { registerLocal, debugUsers } from '../services/authService';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Registrando nuevo usuario:', { name, email });
      await registerLocal({ name, email, password });
      setMessage('Usuario registrado exitosamente 🚀');
      
      // Debug: ver usuarios después de registrar
      await debugUsers();
      
      setName('');
      setEmail('');
      setPassword('');
    } catch (error: any) {
      console.error('Error en registro:', error);
      setMessage('Error registrando usuario: ' + error.message);
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
            <IonLabel position="stacked">Nombre</IonLabel>
            <IonInput 
              value={name} 
              onIonChange={e => setName(e.detail.value!)} 
              placeholder="Tu nombre"
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Correo</IonLabel>
            <IonInput 
              type="email" 
              value={email} 
              onIonChange={e => setEmail(e.detail.value!)} 
              placeholder="ejemplo@mail.com"
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Contraseña</IonLabel>
            <IonInput 
              type="password" 
              value={password} 
              onIonChange={e => setPassword(e.detail.value!)} 
              placeholder="******"
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
        {message && <p style={{marginTop:12, textAlign: 'center'}}>{message}</p>}
      </IonContent>
    </IonPage>
  );
};

export default Register;