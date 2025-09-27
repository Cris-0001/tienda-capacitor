import React, { useState } from 'react';
import {
  IonPage, IonContent, IonInput, IonItem, IonLabel,
  IonButton, IonHeader, IonToolbar, IonTitle, IonGrid, 
  IonRow, IonCol, IonAlert
} from '@ionic/react';
import { login, debugUsers } from '../services/authService';

interface LoginProps {
  onLogin?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const doLogin = async () => {
    try {
      if (!email || !password) {
        setAlertMessage('Por favor ingresa email y contraseña');
        setShowAlert(true);
        return;
      }

      console.log('Iniciando login...');
      await login(email, password);
      
      // Debug: ver usuarios registrados
      await debugUsers();
      
      if (onLogin) {
        onLogin();
      }
      window.location.href = '/products';
      
    } catch (error: any) {
      console.error('Error completo en login:', error);
      setAlertMessage(error.message || 'Error en login: revisa credenciales');
      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Iniciar Sesión</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" color="light">
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonItem>
                <IonLabel position="stacked">Correo electrónico *</IonLabel>
                <IonInput
                  type="email"
                  value={email}
                  onIonInput={e => setEmail(e.detail.value!)}
                  placeholder="ejemplo@mail.com"
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Contraseña *</IonLabel>
                <IonInput
                  type="password"
                  value={password}
                  onIonInput={e => setPassword(e.detail.value!)}
                  placeholder="Escribe tu contraseña"
                />
              </IonItem>

              <IonButton 
                expand="block" 
                color="primary" 
                onClick={doLogin} 
                style={{ marginTop: '20px' }}
              >
                Entrar
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Error de Login'}
          message={alertMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;