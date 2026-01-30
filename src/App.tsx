import { PassphraseGenerator } from './components/PassphraseGenerator'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Svensk Lösenordsgenerator</h1>
        <p className="subtitle">Skapa säkra lösenfraser med svenska ord</p>
      </header>
      <main className="main">
        <PassphraseGenerator />
      </main>
      <footer className="footer">
        <p>Använder kryptografiskt säker slumpgenerering</p>
      </footer>
    </div>
  )
}

export default App
