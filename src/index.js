import * as ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

import App from './App';
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
const queryClient = new QueryClient();
root.render(<QueryClientProvider client={queryClient}><App /></QueryClientProvider>)