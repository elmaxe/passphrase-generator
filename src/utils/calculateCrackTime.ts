import { swedishWords } from '../data/swedishWords';

// 2026 GPU cluster estimate: ~1 trillion guesses per second for fast hashes
// This assumes a well-funded attacker with multiple high-end GPUs
const GUESSES_PER_SECOND = 1e12;

export interface CrackTimeResult {
  seconds: number;
  formatted: string;
  entropy: number;
  strength: 'weak' | 'moderate' | 'strong' | 'very-strong';
}

function formatTime(seconds: number): string {
  if (seconds < 1) {
    return 'mindre än en sekund';
  }
  if (seconds < 60) {
    return `${Math.round(seconds)} sekunder`;
  }

  const minutes = seconds / 60;
  if (minutes < 60) {
    return `${Math.round(minutes)} minuter`;
  }

  const hours = minutes / 60;
  if (hours < 24) {
    return `${Math.round(hours)} timmar`;
  }

  const days = hours / 24;
  if (days < 30) {
    return `${Math.round(days)} dagar`;
  }

  const months = days / 30;
  if (months < 12) {
    return `${Math.round(months)} månader`;
  }

  const years = days / 365;
  if (years < 1000) {
    return `${Math.round(years).toLocaleString('sv-SE')} år`;
  }

  if (years < 1e6) {
    return `${Math.round(years / 1000).toLocaleString('sv-SE')} tusen år`;
  }

  if (years < 1e9) {
    return `${Math.round(years / 1e6).toLocaleString('sv-SE')} miljoner år`;
  }

  if (years < 1e12) {
    return `${Math.round(years / 1e9).toLocaleString('sv-SE')} miljarder år`;
  }

  return `${(years / 1e12).toExponential(1)} biljoner år`;
}

function getStrength(entropy: number): CrackTimeResult['strength'] {
  if (entropy < 35) return 'weak';
  if (entropy < 50) return 'moderate';
  if (entropy < 70) return 'strong';
  return 'very-strong';
}

export function calculateCrackTime(wordCount: number): CrackTimeResult {
  const wordListSize = swedishWords.length;

  // Entropy in bits = log2(wordListSize^wordCount) = wordCount * log2(wordListSize)
  const entropy = wordCount * Math.log2(wordListSize);

  // Total combinations
  const combinations = Math.pow(wordListSize, wordCount);

  // Average time to crack (50% of keyspace on average)
  const secondsToCrack = (combinations / 2) / GUESSES_PER_SECOND;

  return {
    seconds: secondsToCrack,
    formatted: formatTime(secondsToCrack),
    entropy: Math.round(entropy),
    strength: getStrength(entropy),
  };
}
