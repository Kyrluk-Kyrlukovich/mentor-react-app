import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import setupStore from './store/store';
import { Provider } from 'react-redux';

const container = document.getElementById('root');

if (!container) {
    throw new Error('Root element not found');
}

const store = setupStore();

createRoot(container).render(
    <Provider store={store}>
        <App />
    </Provider>,
);
