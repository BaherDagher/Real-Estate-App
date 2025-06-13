import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
    base: '/Real-Estate-App/', 
  plugins: [react()],
})
