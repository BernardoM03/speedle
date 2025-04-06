import React, { useEffect, useState } from 'react';
import axios from "axios"
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import {SortableItem} from './SortableItem';
import './App.css'

function App() {
  const [items, setItems] = useState([]);
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

  function enableDisable(id) {
    setItems(prevItems =>
      prevItems.map(item =>
        item._id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  }

  function startChallenge() {
    items.slice().reverse().forEach((item) => {
      if (item.enabled === true) {
        console.log(item.title, item.url);
        window.open(item.url, '_blank');
      }
    });
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
          <a className='FAQ-button'>FAQ</a>
          <a className='support-button'>Support Me</a>
        </div>
      </div>
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
        <button className='start-button' onClick={startChallenge}>start</button>
        <div className='card leaderboard-window'>
          <div>Leaderboard</div>
        </div>
      </div>
    </>
  )
}

export default App
