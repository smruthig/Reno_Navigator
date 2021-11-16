import { StoreProvider, useStoreRehydrated } from "easy-peasy";
import { QueryClient, QueryClientProvider } from "react-query";
import Routes from "./Routes";
import store from "./store/store";
import "./styles/App.css";

const queryClient = new QueryClient();

const WaitForStateRehydration = ({ children }: { children: any }) => {
    const isRehydrated = useStoreRehydrated();
    return isRehydrated ? children : null;
};

function App() {
    return (
        <StoreProvider store={store}>
            <QueryClientProvider client={queryClient}>
                <WaitForStateRehydration>
                    <Routes />
                </WaitForStateRehydration>
            </QueryClientProvider>
        </StoreProvider>
    );
}

export default App;
