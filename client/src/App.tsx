import AppRouter from './router'
import { PrimeReactProvider } from "primereact/api";
import "./App.global.css";
import ToastContextProvider from './providers/toast-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
    mutations: {
      retry: 1,
    }
  }
});

function App() {
  return (
    <PrimeReactProvider>
      <ToastContextProvider>
        <QueryClientProvider client={queryClient}>
          <AppRouter>

          </AppRouter>
        </QueryClientProvider>
      </ToastContextProvider>
    </PrimeReactProvider>
  )
}

export default App
