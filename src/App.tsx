import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { cart, logIn, personAdd, list, camera, logOut } from 'ionicons/icons';
import { isAuthenticated } from './services/authService';

import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Cart from './pages/Cart';
import ProductForm from './pages/ProductForm';

setupIonicReact({
  mode: 'md'
});

const App: React.FC = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const authenticated = await isAuthenticated();
    setIsAuth(authenticated);
    setAuthChecked(true);
  };

  if (!authChecked) {
    return (
      <IonApp>
        <div>Cargando...</div>
      </IonApp>
    );
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/login">
              {isAuth ? <Redirect to="/products" /> : <Login onLogin={() => setIsAuth(true)} />}
            </Route>
            <Route exact path="/register">
              {isAuth ? <Redirect to="/products" /> : <Register />}
            </Route>
            <Route exact path="/products">
              {isAuth ? <Products /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/cart">
              {isAuth ? <Cart /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/product-form">
              {isAuth ? <ProductForm /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/">
              <Redirect to={isAuth ? "/products" : "/login"} />
            </Route>
          </IonRouterOutlet>

          {/* Mostrar tabs solo si está autenticado */}
          {isAuth ? (
            <IonTabBar slot="bottom">
              <IonTabButton tab="products" href="/products">
                <IonIcon icon={list} />
                <IonLabel>Productos</IonLabel>
              </IonTabButton>
              <IonTabButton tab="form" href="/product-form">
                <IonIcon icon={camera} />
                <IonLabel>Nuevo</IonLabel>
              </IonTabButton>
              <IonTabButton tab="cart" href="/cart">
                <IonIcon icon={cart} />
                <IonLabel>Carrito</IonLabel>
              </IonTabButton>
              <IonTabButton tab="logout" href="/login" onClick={async () => {
                const { logout } = await import('./services/authService');
                await logout();
                setIsAuth(false);
              }}>
                <IonIcon icon={logOut} />
                <IonLabel>Salir</IonLabel>
              </IonTabButton>
            </IonTabBar>
          ) : (
            <IonTabBar slot="bottom">
              <IonTabButton tab="login" href="/login">
                <IonIcon icon={logIn} />
                <IonLabel>Login</IonLabel>
              </IonTabButton>
              <IonTabButton tab="register" href="/register">
                <IonIcon icon={personAdd} />
                <IonLabel>Registro</IonLabel>
              </IonTabButton>
            </IonTabBar>
          )}
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;