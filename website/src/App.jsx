import { useState } from 'react'
import 'babel-polyfill';
import ImageGrid from './components/sidebar'
import SpeechRecognizer from './components/SpeechRecognizer'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './components/layout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ImageGrid />
      <div>
      <Layout />
      </div>
      <SpeechRecognizer />
    </>
  )
}

export default App
