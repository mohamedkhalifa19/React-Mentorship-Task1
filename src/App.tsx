import DataTable from "./components/DataTable/DataTable";
import Header from "./components/Header/Header";
import MainLayout from "./components/MainLayout/MainLayout";
import { Provider } from "react-redux";
import { store } from "./app/store";
function App() {
  return (
    <Provider store={store}>
      <Header />
      <MainLayout />
      <DataTable />
    </Provider>
  );
}

export default App;
