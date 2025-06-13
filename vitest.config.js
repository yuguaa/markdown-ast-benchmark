import { mergeConfig, defineConfig } from 'vitest/config'
import viteConfig from './vite.config'
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'node',
      globals: true,
      benchmark: {
        threads: true,
        reporters: ['verbose'],
        time: 1000
      }
    }
  })
)
