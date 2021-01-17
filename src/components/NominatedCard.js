import React, {useEffect, useState } from 'react';
const API = "http://www.omdbapi.com/?apikey=ef1a2d95&i="

function NominatedCard(props) {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');

  fetch(API + props.movieId)
  .then(res => res.json())
  .then(data => {
    setTitle(data.Title);
    setYear(data.Year)
  });

  return (
    <div className="card">
      <div>
        <p>{title}</p>
        <p>{year}</p>
      </div>
      <button className="remove" onClick={() => props.remnominated(props.movieId)}>Remove</button>
    </div>

  )
}


export default NominatedCard;
