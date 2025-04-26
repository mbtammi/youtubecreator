import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Creator Inspiration Engine</h1>
        <p>Welcome! Start by entering your favorite YouTube channels to get inspired.</p>
      </header>
      <Outlet />
    </div>
  );
}

export default Layout;