import Navbar from "./components/navbar/Navbar.tsx";
import AboutScreen from "./pages/AboutScreen.tsx";
import HomeScreen from "./pages/HomeScreen.tsx";
import RecipesScreen from "./pages/RecipesScreen.tsx";

function App() {
  let Component;
  switch (window.location.pathname) {
    case "/":
      Component = HomeScreen;
      break;
    case "/recipes":
      Component = RecipesScreen;
      break;
    case "/about":
      Component = AboutScreen;
      break;
  }
  return (
    <>
      <Navbar />
      <Component />
    </>
  );
}

export default App;
