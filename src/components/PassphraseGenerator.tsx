import { useState, useCallback } from 'react';
import { generatePassphrase } from '../utils/generatePassphrase';
import './PassphraseGenerator.css';

export function PassphraseGenerator() {
  const [wordCount, setWordCount] = useState(4);
  const [passphrase, setPassphrase] = useState(() => generatePassphrase(4));
  const [copied, setCopied] = useState(false);

  const handleRegenerate = useCallback(() => {
    setPassphrase(generatePassphrase(wordCount));
    setCopied(false);
  }, [wordCount]);

  const handleWordCountChange = useCallback((newCount: number) => {
    setWordCount(newCount);
    setPassphrase(generatePassphrase(newCount));
    setCopied(false);
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(passphrase);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = passphrase;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [passphrase]);

  return (
    <div className="generator">
      <div className="word-count-selector">
        <label htmlFor="word-count">Antal ord: {wordCount}</label>
        <input
          type="range"
          id="word-count"
          min="3"
          max="8"
          value={wordCount}
          onChange={(e) => handleWordCountChange(Number(e.target.value))}
        />
        <div className="word-count-labels">
          <span>3</span>
          <span>8</span>
        </div>
      </div>

      <div className="passphrase-display">
        <p className="passphrase">{passphrase}</p>
      </div>

      <div className="actions">
        <button onClick={handleRegenerate} className="btn btn-primary">
          Generera ny
        </button>
        <button onClick={handleCopy} className="btn btn-secondary">
          {copied ? 'Kopierad!' : 'Kopiera'}
        </button>
      </div>
    </div>
  );
}
