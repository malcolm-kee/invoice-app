import { Link, Route, Routes } from 'react-router-dom';
import { InvoiceDetails, InvoiceList } from './modules/invoice';

function App() {
  return (
    <div className="h-screen flex flex-col sm:flex-row bg-grey-100">
      <nav className="relative sm:z-20 flex-shrink-0 flex sm:flex-col sm:w-20 bg-gray-300 shadow sm:rounded-r-xl">
        <div className="flex justify-center items-center p-4 bg-primary-300 rounded-br-2xl">
          <Link to="/">
            <img src="/logo.svg" alt="" className="w-10" />
          </Link>
        </div>
        <div className="flex-1" />
        <div className="flex justify-center items-center p-3 border-t border-gray-400">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="profile pic"
            className="w-10 sm:w-14 rounded-full"
          />
        </div>
      </nav>
      <main className="flex-1 py-6 px-2 sm:px-6 overflow-y-auto">
        <Routes>
          <Route
            path="/"
            element={
              <div className="max-w-6xl mx-auto">
                <InvoiceList />
              </div>
            }
          />
          <Route path="invoice">
            <Route
              path=":invoiceId"
              element={
                <div className="max-w-6xl mx-auto">
                  <InvoiceDetails />
                </div>
              }
            />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
