import HomePage from './pages/HomePage';
import { PostsProvider } from './contexts/PostsContext';
import './App.css';

function App() {
  return (
    <PostsProvider>
      <HomePage />
    </PostsProvider>
  );
}

export default App;
