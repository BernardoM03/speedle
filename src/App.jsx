import React, {useState} from 'react';
import {
  DndContext, 
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import {SortableItem} from './SortableItem';
import './App.css'

function App() {

  const [items, setItems] = useState([
    "Wordle",
    "NYT Mini",
    "Strands",
    "Connections",
    "Movie to Movie",
    "Wiki Game",
    "Food Guessr",
    "CATfishing",
    "Timeguessr",
    "Your choice"
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor)
  );

  function handleDragEnd(event) {
    const {active, over} = event;
    
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
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
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
              {items.map(id => <SortableItem key={id} id={id} />)}
            </SortableContext>
          </DndContext>
        </div>
        <button>start</button>
        <div className='card leaderboard-window'>
          <div>Leaderboard</div>
        </div>
      </div>
    </>
  )
}

export default App
