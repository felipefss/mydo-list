// Context
import { TodoProvider } from '../context/TodoContext';
import { ThemeProvider } from '../context/ThemeContext';

// Components
import TodoList from '../components/TodoList';
import TopBar from '../components/TopBar';

function HomePage() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <TopBar />

        <div className="content">
          <TodoList />
        </div>
      </TodoProvider>
    </ThemeProvider>
  );
}

export default HomePage;
