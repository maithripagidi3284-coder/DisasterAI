import { getTranslation, saveTranslation } from './storage';

export async function loadTranslator(targetLangCode: string): Promise<void> {
  return Promise.resolve();
}

export async function translate(text: string): Promise<string> {
  return text;
}

export async function getOrTranslate(chunk: any, targetLang: string): Promise<string> {
  return chunk.text;
}