import { useState } from 'react';
import './DragAndDrop.css';

const initialItems = [
  { id: 1, text: 'Item 1' },
  { id: 2, text: 'Item 2' },
  { id: 3, text: 'Item 3' },
  { id: 4, text: 'Item 4' },
  { id: 5, text: 'Item 5' },
  { id: 6, text: 'Item 6' },
  { id: 7, text: 'Item 7' },
];

function DragAndDrop() {
  const [list1, setList1] = useState(initialItems);
  const [list2, setList2] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('text', JSON.stringify(item));
  };

  const handleDrop = (e, targetList) => {
    e.preventDefault();

    const droppedItem = JSON.parse(e.dataTransfer.getData('text'));

    const addDroppedItem = (prevItems) => {
      const isItemPresent = prevItems.some(
        (item) => item.id === droppedItem.id
      );

      return isItemPresent ? [...prevItems] : [...prevItems, droppedItem];
    };

    const removeDroppedItem = (prevItems) =>
      prevItems.filter((item) => item.id !== droppedItem.id);

    if (targetList === 'list1') {
      setList1(addDroppedItem);
      setList2(removeDroppedItem);
    } else if (targetList === 'list2') {
      setList2(addDroppedItem);
      setList1(removeDroppedItem);
    }
  };

  return (
    <>
      <h2>Drag & Drop App</h2>
      <div className='lists-container'>
        <div
          className='list'
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, 'list1')}
        >
          <h3>List 1</h3>
          <ul>
            {list1.map((item) => (
              <li
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
              >
                {item.text}
              </li>
            ))}
          </ul>
        </div>
        <div
          className='list list2'
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, 'list2')}
        >
          <h3>List 2</h3>
          <ul>
            {list2.map((item) => (
              <li
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
              >
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default DragAndDrop;
