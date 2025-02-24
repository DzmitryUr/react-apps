import { useState } from 'react';
import './DraggableList.css';

export function DraggableList({ listItems }) {
  const [items, setItems] = useState(listItems);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDragEnter = (event, index) => {
    console.log('onDragEnter');
    if (draggingIndex !== index) {
      setHoverIndex(index);
    }
  };

  const onDragStart = (event, index) => {
    console.log('onDragStart');
    setDraggingIndex(index);
  };

  const onDragEnd = () => {
    console.log('onDragEnd');
    setDraggingIndex(null);
    setHoverIndex(null);
  };

  const onDrop = (event) => {
    console.log('onDrop');
    const startIndex = draggingIndex;
    if (hoverIndex !== null && startIndex !== hoverIndex) {
      const updatedItems = [...items];
      const [reorderedItem] = updatedItems.splice(startIndex, 1);
      updatedItems.splice(hoverIndex, 0, reorderedItem);
      setItems(updatedItems);
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
          onDragOver={onDragOver}
          onDragEnter={(event) => onDragEnter(event, index)}
          onDrop={onDrop}
          onDragEnd={onDragEnd}
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
