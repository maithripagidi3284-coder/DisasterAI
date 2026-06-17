import * as SQLite from 'expo-sqlite';

let db: any = null;

function getDB() {
  if (!db) {
    db = SQLite.openDatabaseSync('disaster.db');
  }
  return db;
}

export function initDB() {
  const database = getDB();
  database.execSync(`CREATE TABLE IF NOT EXISTS chunks
    (id TEXT PRIMARY KEY, type TEXT, title TEXT,
    text TEXT, embedding TEXT)`);
  database.execSync(`CREATE TABLE IF NOT EXISTS contacts
    (id TEXT PRIMARY KEY, state TEXT, district TEXT,
    name TEXT, phone TEXT, type TEXT)`);
  database.execSync(`CREATE TABLE IF NOT EXISTS translations
    (id TEXT PRIMARY KEY, lang TEXT, text TEXT)`);
}

export function saveChunk(chunk: any) {
  const database = getDB();
  database.runSync(
    'INSERT OR REPLACE INTO chunks VALUES (?,?,?,?,?)',
    [chunk.id, chunk.type, chunk.title, chunk.text, '']
  );
}

export function saveEmbedding(chunkId: string, embedding: string) {
  const database = getDB();
  database.runSync(
    'UPDATE chunks SET embedding = ? WHERE id = ?',
    [embedding, chunkId]
  );
}

export function getChunksByType(type: string): Promise<any[]> {
  return new Promise((resolve) => {
    const database = getDB();
    const result = database.getAllSync(
      'SELECT * FROM chunks WHERE type = ?',
      [type]
    );
    resolve(result);
  });
}

export function saveTranslation(chunkId: string, lang: string, text: string) {
  const database = getDB();
  database.runSync(
    'INSERT OR REPLACE INTO translations VALUES (?,?,?)',
    [chunkId + '_' + lang, lang, text]
  );
}

export function getTranslation(chunkId: string, lang: string): Promise<string | null> {
  return new Promise((resolve) => {
    const database = getDB();
    const result = database.getFirstSync(
      'SELECT text FROM translations WHERE id = ?',
      [chunkId + '_' + lang]
    );
    resolve(result ? result.text : null);
  });
}