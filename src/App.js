import MovieList from "./components/movieList";
import Watchlist from "./components/watchlist";
import MyWatchlistProvider from "./Contexts/MyWatchlistProvider";
import './css/App.css'
import MyCatalogProvider from './Contexts/MyCatalogProvider'
import SelectedMovie from "./components/SelectedMovie";

function App() {

  return (
    <>
      <MyWatchlistProvider>
      <MyCatalogProvider>
        <SelectedMovie />
          <MovieList genre={'drama'}/>
          <MovieList genre={'action'}/>
          <MovieList genre={'biography'}/>
          <Watchlist />
      </MyCatalogProvider>
      </MyWatchlistProvider>
    </>
  );

}

export default App;
