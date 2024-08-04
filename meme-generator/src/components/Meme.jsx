import { useState } from 'react';
import { useEffect } from 'react';
import './Meme.css';

function Meme({ url }) {
  const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
    image: 'https://i.imgflip.com/1bij.jpg',
  });

  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function getRandomImage() {
    const memeImg = allMemes[Math.floor(Math.random() * allMemes.length)];

    setMeme((prevMeme) => ({
      ...prevMeme,
      image: memeImg.url,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <div className='meme-container'>
      <div className='form'>
        <input
          type='text'
          placeholder='Top text'
          name='topText'
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Bottom text'
          name='bottomText'
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button onClick={getRandomImage}>Generate a new Meme</button>
      </div>

      <div className='meme'>
        <img src={meme.image} className='meme-image' alt='meme' />
        <h2 className='meme-text top'>{meme.topText}</h2>
        <h2 className='meme-text bottom'>{meme.bottomText}</h2>
      </div>
    </div>
  );
}

export default Meme;
