export async function loadClassifier(): Promise<void> {
  return Promise.resolve();
}

export async function classifyDisaster(text: string): Promise<string> {
  const t = text.toLowerCase();
  if (t.match(/flood|water|rain|river|drown|submerge/)) return 'flood';
  if (t.match(/cyclone|storm|wind|hurricane|typhoon|roof/)) return 'cyclone';
  if (t.match(/earthquake|quake|tremor|shake|collapse/)) return 'earthquake';
  if (t.match(/fire|burn|smoke|flame|blaze/)) return 'fire';
  return 'flood';
}