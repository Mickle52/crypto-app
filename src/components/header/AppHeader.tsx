import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useCrypto } from "../../context/crypto-context.tsx";
import { useEffect, useState } from "react";
import CoinInfoModal from "./CoinInfoModal.tsx";
import { ICrypto } from "../../types/types.tsx";
import AddAssetForm from "./AddAssetForm.tsx";

const headerStyle: React.CSSProperties = {
  width: "100%",
  textAlign: "center",
  height: 60,
  padding: "1rem",
  display: "flex",
  background: "#2a2a2a",
  justifyContent: "space-between",
  alignItems: "center",
};

export default function AppHeader() {
  const cryptoContext = useCrypto();
  const [select, setSelect] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [coin, setCoin] = useState<any>(null);
  const [drawer, setDrawer] = useState<boolean>(false);
  const crypto = cryptoContext?.crypto;

  useEffect(() => {
    const keypress = (event: KeyboardEvent) => {
      if (event.key === `/`) {
        setSelect(!select);
      }
    };
    document.addEventListener("keypress", keypress);
    return () => document.removeEventListener("keypress", keypress);
  }, [select]);

  function handleSelect(value: string) {
    console.log(value);
    setCoin(crypto?.find((c: ICrypto) => c.id === value));
    setModal(true);
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        onSelect={handleSelect}
        open={select}
        onClick={() => setSelect((prev) => !prev)}
        style={{ width: 250 }}
        value="press / to open"
        options={crypto?.map((coin: ICrypto) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />{" "}
            {option.data.label}
          </Space>
        )}
      />
      <Button type="primary" onClick={() => setDrawer(true)}>
        Add Asset
      </Button>

      <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
        <CoinInfoModal coin={coin}></CoinInfoModal>
      </Modal>

      <Drawer
        width={600}
        title="Basic Drawer"
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnClose
      >
        <AddAssetForm onClose={() => setDrawer(false)}></AddAssetForm>
      </Drawer>
    </Layout.Header>
  );
}
