import 'dotenv-expand/config';

export default {
  name: 'Vault',
  slug: 'vault-app',
  version: '1.0.0',
  newArchEnabled: true,
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: 'https://i.imgur.com/dZLsFyf.png',
    resizeMode: 'contain',
    backgroundColor: '#0d1117',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/icon.png',
      backgroundColor: '#0d1117',
    },
  },
  web: {
    favicon: './assets/images/favicon.png',
    bundler: 'metro',
  },
  extra: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
  },
};
