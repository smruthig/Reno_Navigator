import { StoreProvider } from "easy-peasy";
import { QueryClient, QueryClientProvider } from "react-query";
import Routes from "./Routes";
import store from "./store/store";
import "./styles/App.css";

const queryClient = new QueryClient();

function App() {
    return (
        <StoreProvider store={store}>
            <QueryClientProvider client={queryClient}>
                <Routes />
            </QueryClientProvider>
        </StoreProvider>
    );
}

export default App;
