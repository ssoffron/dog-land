import { Link } from 'react-router-dom';
import { Button } from './components/ui/button';

function App() {
  return (
    <main className='flex flex-col justify-center items-center w-screen h-screen'>
      <h1 className='text-3xl font-extrabold mb-4'>개집짓개</h1>
      <Link to='/map'>
        <Button className='text-xl font-bold' size='lg'>
          땅 고르기
        </Button>
      </Link>
    </main>
  );
}

export default App;

// Main concept of the game
// - Dog life simulation game
// - Dog health/happiness simulator
// - Dog economy? simulator
