import { BrowserRouter } from 'react-router-dom';
import RoutesList from './RoutesList';
import NavBar from './NavBar';
import './index.css'

/** App: main app component
 *
 * App -> NavBar
 *     -> RoutesList
 */

function App() {

  return (
    <div className='bg-slate-200 mt-20'>
      <BrowserRouter>
        <NavBar />
        <RoutesList />
      </BrowserRouter>
    </div>
  );
}

export default App;
