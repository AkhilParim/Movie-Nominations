import React, { useState } from 'react';
import Movie from './Movie';
import NominatedCard from './NominatedCard';
{/* import Swal from 'sweetalert2' */}


const SEARCH_API = "http://www.omdbapi.com/?apikey=ef1a2d95&s="

function EmptySearch() {
    return <h1>Search a movie to show results..</h1>
}
function SearchResults(props) {
    return <h1>Showing results for "{props.name}"</h1>
}

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

const handleOnSubmit = (e) => {
  const searchField = document.getElementById("search").value;
  setSearchTerm(searchField);
  console.log("searchTerm");
  console.log(searchTerm);

  if(searchField) {
    fetch(SEARCH_API + searchField)
    .then(res => res.json())
    .then(data => {
      console.log(data.Search);
      if(typeof(data.Search) === 'undefined'){
        setError(data.Error);
      } else {
        setMovies(data.Search);
        setError('');
      }
    });
  }

  e.preventDefault();
};


{/****************  Movie Comp  *****************/}
const [selected, setSelected] = useState([]);

function addNomination(e) {
  const newSelected = selected.concat(e);
  console.log("newSelected");
  console.log(newSelected);
  setSelected(newSelected);
  console.log(selected);
{/*  if(selected.length == 4) {
    popup();
  } */}
}

function removeNomination(e) {
  const newSelected = selected.filter((item) => item !== e);
  setSelected(newSelected);
}
{/* function popup() {
   return (
      Swal.fire({
        title: 'Do you want to confirm the nominations?',
        showDenyButton: true,
        confirmButtonText: `Yes!`,
        denyButtonText: `Edit List`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Thanks!<br>Your nominations are saved!', 'Submit another response?', 'success')
          const newSelected = [];
          setSelected(newSelected);
          setMovies([]);
          document.getElementById("search").value = '';
          setSearchTerm('');
        } else if (result.isDenied) {

        }
      })
   )
 }
*/}
{/* function loader() {
     setTimeout(() => {
       return <p>Loading</p>
     }, 5000
   );
 }
*/}

  return (
    <>
    <header>
    <h1 className="title">Shopify Awards</h1>
    <form onSubmit={handleOnSubmit}>
      <input placeholder="Search.." type="search" class="search" id="search" />
      <button className="search-btn" onClick={handleOnSubmit}>Search</button>
    </form>
    </header>

    <div className="main">
      <div className="left">
        <div class="results">
          {searchTerm.length > 0 && <SearchResults name={searchTerm} />}
          {searchTerm.length == 0 && <EmptySearch />}
        </div>
        {(() => {
          if(searchTerm.length > 0 && error.length > 0) {
            return (
                <>
                  <p class="nom-inst">{error}</p>
                  <p class="nom-inst">Search for another movie!</p>
              </>
            )
          } else {
            return (
              <div class="movie-container">
                {searchTerm.length > 0 && movies.map((movie, index) => <Movie key={index} {...movie} nominated={addNomination} list={selected} /> )}
              </div>
            )
          }
        })()}

      </div>
      <div className="right">
        <h2>Nominations List</h2>
        {(() => {
          if(selected.length == 0) {
            return(
              <>
                <p class="nom-inst">Movies you nominated</p>
                <p class="nom-inst">are displayed here</p>
              </>
            )
          } else if(selected.length == 5){
            return (
              <>
                {selected.length > 0 && selected.map((select, index) => <NominatedCard key={index} remnominated={removeNomination} movieId={select} /> )}
                {/* {popup} */}
              </>
            )
          } else {
            return (
              <>
                {selected.length > 0 && selected.map((select, index) => <NominatedCard key={index} remnominated={removeNomination} movieId={select} /> )}
              </>
            )
          }
        })()}
      </div>
    </div>
  </>
);
}

export default App;
