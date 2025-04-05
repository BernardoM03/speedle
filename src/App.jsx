import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='site-banner'>
        <div className="left-spacer" />
        <div className='site-titles'>
          <h1 className="site-header">speedrundle</h1>
          <h2 className='site-subheader'>the daily-game speedrun challenge</h2>
        </div>
        <div className='modal-nav'>
          <a className='FAQ-button'>FAQ</a>
          <a className='support-button'>Support Me</a>
        </div>
      </div>
      <div className="page-content">
        <div className='card selector-window'>
        </div>
        <button>start</button>
        <div className='card leaderboard-window'></div>
      </div>
    </>
  )
}

export default App
