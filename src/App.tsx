import "./App.css";
import { Layout } from "antd";
import AppHeader from "./components/header/AppHeader.tsx";
import AppSider from "./components/sider/AppSider.tsx";
import AppContent from "./components/content/AppContent.tsx";
import { CryptoContextProvider } from "./context/crypto-context.tsx";

function App() {
  return (
    <CryptoContextProvider>
      <Layout>
        <AppHeader />
        <Layout>
          <AppSider />
          <AppContent />
        </Layout>
      </Layout>
    </CryptoContextProvider>
  );
}

export default App;
