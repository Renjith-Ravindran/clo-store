import ContentFilter from "./components/ContentFilter";
import Navbar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import ContentList from "./components/ContentList";

function App() {
  return (
    <>
      <Navbar />
      <SearchBar />
      <ContentFilter />
      <ContentList />
    </>
  );
}

export default App;
