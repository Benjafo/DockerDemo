import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

// [INSTRUCTIONS] Wait to add this until the client hot reloading part of the demo
//   server: {
//     watch: {
//         usePolling: true,
//     }
//   }

})
