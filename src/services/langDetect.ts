export function detectLanguage(text: string): string {
  // Simple script-based detection
  if (/[\u0C00-\u0C7F]/.test(text)) return 'tel'; // Telugu
  if (/[\u0900-\u097F]/.test(text)) return 'hin'; // Hindi
  if (/[\u0B80-\u0BFF]/.test(text)) return 'tam'; // Tamil
  if (/[\u0980-\u09FF]/.test(text)) return 'ben'; // Bengali
  if (/[\u0900-\u097F]/.test(text)) return 'mar'; // Marathi
  return 'eng'; // Default English
}

export const LANG_MAP: Record<string, string> = {
  'tel': 'tel_Telu',
  'hin': 'hin_Deva',
  'tam': 'tam_Taml',
  'ben': 'ben_Beng',
  'mar': 'mar_Deva',
  'eng': 'eng_Latn',
};