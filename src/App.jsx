import React, { useActionState, useEffect, useState } from 'react';
import axios from "axios"
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import Modal from "./Modal"
import {SortableItem} from './SortableItem';
import Leaderboard from './Leaderboard';
import Records from './Records';
import githubIcon from './assets/github-mark-white.svg';
import './App.css'


function App() {
  const [faqIsOpen, setFaqIsOpen] = useState(false);
  const [supportIsOpen, setSupportIsOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [records, setRecords] = useState([]);
  const [publicLeaderboard, setPublicLeaderboard] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const intervalRef = React.useRef(null);
  const startTimeRef = React.useRef(null);

// API call to fetch site data from MongoDB
  useEffect(() => {
    async function grabSiteData() {
      try {
        const res = await axios.get("http://localhost:5000/sites")
        if (res.status === 200) {
          setItems(res.data);
        } 
      } catch (err) {
        console.error("Failed to fetch:", err);
      }
    }

    grabSiteData()
  }, [])

// API call to fetch leaderboard data from MongoDB
  useEffect(() => {
    async function grabLeaderboardData() {
      try {
        const res = await axios.get("http://localhost:5000/leaderboard")
        if (res.status === 200) {
          setLeaderboard(res.data);
        } 
      } catch (err) {
        console.error("Failed to fetch:", err);
      }
    }

    grabLeaderboardData()
  }, [])

// call to fetch personal record data from localstorage
  useEffect(() => {
    const records = JSON.parse(localStorage.getItem('records'));
    if (records) setRecords(records);
  }, [])

// cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

// dnd-kit functions to handle mouse sensor and dragging events for the sortable items
  const sensors = useSensors(
    useSensor(PointerSensor)
  );

  function handleDragEnd(event) {
    const {active, over} = event;
    if (!over) return;
    if (active.id !== over.id) {
      setItems((prevItems) => {
        const oldIndex = prevItems.findIndex(item => item._id === active.id);
        const newIndex = prevItems.findIndex(item => item._id === over.id);
        return arrayMove(prevItems, oldIndex, newIndex);
      });
    }
  }

// function to enable/disable each element in the list of Sortable items
// disabled items will not open as a link in the challenge
  function enableDisable(id) {
    setItems(prevItems =>
      prevItems.map(item =>
        item._id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  }

  // function to start the challenge through the following steps
  // 1. Open all the links
  // 2. Start the timer for the challenge
  function startChallenge() {
    items.slice().reverse().forEach((item) => {
      if (item.enabled === true) {
        console.log(item.title, item.url);
        window.open(item.url, '_blank');
      }
    });

    if (intervalRef.current) return;

    setElapsedTime(0);
    setTimerRunning(true);
    startTimeRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const newElapsed = now - startTimeRef.current;
      setElapsedTime(newElapsed);
      document.title = formatTime(newElapsed) + " – speedrundle";
    }, 50);
  }

  // function to stop the challenge
  function stopStopwatch() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setTimerRunning(false);

      const newTime = {
        time: elapsedTime,
        date: new Date().toISOString(),
        _id: crypto.randomUUID(), // Ensure uniqueness for rendering keys
      };

      const updatedRecords = [newTime, ...records];
      setRecords(updatedRecords);
      localStorage.setItem('records', JSON.stringify(updatedRecords));
    }
  }

  // function to format the time in terms of minutes:seconds:milliseconds
  function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10); // two-digit ms
  
    return `${minutes}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  }

  function handleDeleteRecord(id) {
    const updatedRecords = records.filter(record => record._id !== id);
    setRecords(updatedRecords);
    localStorage.setItem('records', JSON.stringify(updatedRecords));
  }

  return (
    <>
      <div className='site-banner'>
        <div className="left-spacer" />
        <div className='site-titles'>
          <h1 className="site-header">speedrundle</h1>
          <h2 className='site-subheader'>the daily-game speedrun challenge</h2>
        </div>
        <div className='modal-nav'>
          <a className='FAQ-button' onClick={() => setFaqIsOpen(true)}>Help</a>
          <a className='support-button' onClick={() => setSupportIsOpen(true)}>More</a>
        </div>
      </div>
      <Modal open={faqIsOpen} onClose={() => setFaqIsOpen(false)}>
        <h2>Welcome to speedrundle</h2>
        <h4>the daily-game speedrun challenge</h4>
        <p className='modal-text'>This site acts as a hub for a daily-game speedrun devised by Stanz, and commonly played by my friends and I for weeks on end. Here are the rules....</p>
        <p className='modal-text'>You will select a variety of daily games from our collection of sites. You will be able to order them in the way that you want, and they will open in that order when you begin. A vanilla run will be provided to you, which is the the original run devised by Stanz.</p>
        <p className='modal-text'>The leaderboard contains the scores for all vanilla runs. The leaderboard will contain your own local scores and the public scores. Public scores will need to be submitted and checked before displayed.</p>
        <p className='modal-text'>Once you have curated your speedrun, you may start by pressing the Start button in the center of your screen. This will open every link onto your browser and start the timer for the speedrun. Remember to enable pop-ups!</p>
        <p className='modal-text'>Once you have finished all runs, you may submit your run and finalize your time. Your time will be stored in local storage, and ranked upon your local leaderboard. </p>
    </Modal>
    <Modal open={supportIsOpen} onClose={() => setSupportIsOpen(false)}>
      <h2>Like speedrundle?</h2>
      <p className='modal-text'>Here is the original concept for it!</p>
      <div className="video-wrapper">
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/LCPsFvPDJTQ"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </Modal>
      <div className="page-content">
        <div className='card selector-window'>
          <div className='selector-header'>Select and order your daily games!</div>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            {items.length > 0 && (
              <SortableContext items={items.map(item => item._id)} strategy={verticalListSortingStrategy}>
                {items.map(site => <SortableItem key={site._id} id={site._id} title={site.title} description={site.description} enabled={site.enabled} onClick={enableDisable}/>)}
              </SortableContext>
            )}
          </DndContext>
        </div>
        <div className='game-board'>
          <button className='start-button' onClick={startChallenge} disabled={timerRunning}>start</button>
          <div className="timer-container">
                <button className="timer-button" id="stop" onClick={stopStopwatch}>stop</button>
                <p className="timer-text">{formatTime(elapsedTime)}</p>
            </div>
        </div>
        <div className='card leaderboard-window'>
          <div className='leaderboard-types'>
            <div className='leaderboard-select' onClick={() => setPublicLeaderboard(false)}>Personal Records</div>
            <div className='leaderboard-select' onClick={() => setPublicLeaderboard(true)}>Public Leaderboard</div>
          </div>
          { publicLeaderboard ?
          <Leaderboard
            entries={leaderboard}
            formatTime={formatTime}
          /> :
            <Records
            entries={records}
            formatTime={formatTime}
            onDelete={handleDeleteRecord}
          />
          }
        </div>
      </div>
      <footer className="site-footer">
        <p>
          Built by <a href="https://github.com/BernardoM03" target="_blank" rel="noopener noreferrer">BernardoM03</a> • Inspired by Stanz’s daily-game speedrun
        </p>
        <p>Make sure pop-ups are enabled for the best experience.</p>
      </footer>
    </>
  )
}

export default App
