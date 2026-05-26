// src/i18n/index.ts

import { useSettingsStore } from '../store/settingsStore';
import { translations, Language } from './translations';

export { translations, type Language };

export const useTranslation = () => {
  const language = useSettingsStore(state => state.language);
  const t = translations[language] ?? translations.en;
  return { t, language };
};
