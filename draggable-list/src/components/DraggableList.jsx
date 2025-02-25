import { useState } from 'react';
import './DraggableList.css';

export function DraggableList({ listItems }) {
  const [items, setItems] = useState(listItems);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  const onDragStart = (event, index) => {
    console.log('onDragStart');
    setDraggingIndex(index);
  };

  const onDragEnter = (event, index) => {
    console.log('onDragEnter');
    setHoverIndex(index);
  };

  const onDragEnd = () => {
    console.log('onDragEnd');
    setDraggingIndex(null);
    setHoverIndex(null);
  };

  const onDrop = () => {
    console.log('onDrop');
    const startIndex = draggingIndex;
    if (hoverIndex !== null && startIndex !== hoverIndex) {
      const updatedImems = [...items];
      const [reorderedItem] = updatedImems.splice(startIndex, 1);
      updatedImems.splice(hoverIndex, 0, reorderedItem);
      setItems(updatedImems);
    }
    setDraggingIndex(null);
    setHoverIndex(null);
  };
  return (
    <div className='container'>
      <h2>Draggable List</h2>
      {items.map((item, index) => (
        <div
          key={item.id}
          draggable
          onDragStart={(event) => onDragStart(event, index)}
          onDragEnter={(event) => onDragEnter(event, index)}
          onDragOver={(event) => event.preventDefault()}
          onDragEnd={onDragEnd}
          onDrop={onDrop}
          className={`item ${draggingIndex === index ? 'dragging' : ''} ${
            hoverIndex === index ? 'hovered' : ''
          }`}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
