import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Country from "./components/Country";
const client = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={client}>
      <div className="container">
        <div className="card">
          <Country />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
