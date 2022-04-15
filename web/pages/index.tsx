// Context
import { TodoProvider } from '../context/TodoContext';

// Components
import TodoList from '../components/TodoList';
import TopBar from '../components/TopBar';


//TODO: Edit items
//TODO: Create dark mode
//TODO: Make input element smaller

function HomePage() {
  return (
    <TodoProvider>
      <TopBar />

      <div className="content">
        <TodoList />
      </div>
    </TodoProvider>
  );
}

export default HomePage;
