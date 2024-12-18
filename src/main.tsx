import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import AppRouter from "@/AppRouter.tsx";
import {Toaster} from "react-hot-toast";

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <div className="font-body bg-gradient-to-b from-primary to-white h-screen text-sm">
    <Toaster position="bottom-right"/>
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <AppRouter/>
      </StrictMode>
    </QueryClientProvider>
  </div>
)
