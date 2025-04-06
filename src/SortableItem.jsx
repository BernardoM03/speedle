import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

export function SortableItem({ id, title, description, enabled, onClick }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <div className={`sortable-item ${!enabled ? 'disabled' : ''}`} ref={setNodeRef} style={style}  onClick={() => onClick(id)}>
      <div className='sortable-item-info'>
        <div className='site-name'>{title}</div>
        <div className='site-desc'>{description}</div>
      </div>
      <div className='sortable-item-button' {...attributes} {...listeners}>≡</div>
    </div>
  );
}