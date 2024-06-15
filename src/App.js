import './App.css';
import BaseLayout from './components/BaseLayout';
import './global.js';
import Index from './pages/index';

function App() {
  return (
    <>
      <BaseLayout
      >
        <Index />
      </BaseLayout>
    </>
  );
}

export default App;
