import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), dts()],
    build: {
        lib: {
            entry: 'src/export.ts',
            name: 'vue3H5Hooks',
            fileName: "vue3-h5-hooks",
        },
        rollupOptions: {
            external: ['vue'],
        },
    },
    optimizeDeps: {
        exclude: ['vue-demi']
    }
})
