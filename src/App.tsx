import DataTable from "./components/DataTable/DataTable";
import Header from "./components/Header/Header";
import MainLayout from "./components/MainLayout/MainLayout";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <Provider store={store}>
      <Header />
      <MainLayout />
      <DataTable />
      <Footer />
      <Toaster />
    </Provider>
  );
}

export default App;
