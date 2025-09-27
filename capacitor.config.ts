import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'tienda-capacitor',
  webDir: 'dist',
  plugins: {
    Camera: {
      allowEditing: false,
      saveToGallery: true
    }
  }
};

export default config;