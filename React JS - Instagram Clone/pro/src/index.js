import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css';
import App from './App';
import ViewStory from './ViewStory';
import { AppProvider } from './Context';

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App/>
        },
        {
            path: '/stories/:id',
            element: <ViewStory/>
        }
    ]
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>
);