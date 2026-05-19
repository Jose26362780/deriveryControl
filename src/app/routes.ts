import { createBrowserRouter, redirect } from 'react-router';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Entregas } from './components/Entregas';
import { Analytics } from './components/Analytics';
import { Reportes } from './components/Reportes';
import { Login } from './components/Login';

function requireAuth() {
  if (!localStorage.getItem('dc_auth')) {
    return redirect('/login');
  }
  return null;
}

export const router = createBrowserRouter([
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/',
    Component: Layout,
    loader: requireAuth,
    children: [
      { index: true, Component: Dashboard },
      { path: 'entregas', Component: Entregas },
      { path: 'analytics', Component: Analytics },
      { path: 'reportes', Component: Reportes },
    ],
  },
]);
