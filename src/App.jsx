import { useState } from 'react'
import {DndContext} from '@dnd-kit/core';

import {Droppable} from './Droppable';
import {Draggable} from './Draggable';

import './App.css'

function App() {

  const containers = ['A', 'B', 'C'];
  const [parent, setParent] = useState(null);
  const draggableMarkup = (
    <Draggable id="draggable">Drag me</Draggable>
  );

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
          <DndContext onDragEnd={handleDragEnd}>
            {parent === null ? draggableMarkup : null}

            {containers.map((id) => (
              <Droppable key={id} id={id}>
                {parent === id ? draggableMarkup : 'Drop here'}
              </Droppable>
            ))}
          </DndContext>
        </div>
        <button>start</button>
        <div className='card leaderboard-window'></div>
      </div>
    </>
  )

  function handleDragEnd(event) {
    const {over} = event;
    setParent(over ? over.id : null);
  }
}

export default App
