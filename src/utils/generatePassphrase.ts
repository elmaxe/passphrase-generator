import { swedishWords } from '../data/swedishWords';

/**
 * Generates a random passphrase using cryptographically secure random selection.
 * @param wordCount Number of words to include in the passphrase (3-8)
 * @returns A passphrase string with words separated by spaces
 */
export function generatePassphrase(wordCount: number): string {
  const clampedCount = Math.min(8, Math.max(3, wordCount));
  const selectedWords: string[] = [];

  // Use crypto.getRandomValues for secure random selection
  const randomValues = new Uint32Array(clampedCount);
  crypto.getRandomValues(randomValues);

  for (let i = 0; i < clampedCount; i++) {
    const randomIndex = randomValues[i] % swedishWords.length;
    selectedWords.push(swedishWords[randomIndex]);
  }

  return selectedWords.join(' ');
}
