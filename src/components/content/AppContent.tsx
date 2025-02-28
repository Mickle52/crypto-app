import { Layout, Typography } from "antd";
import { useCrypto } from "../../context/crypto-context.tsx";
import { ICrypto } from "../../types/types.tsx";
import PorfolioChart from "./PorfolioChart.tsx";
import AssetsTable from "./AssetsTable.tsx";
const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  color: "#fff",
  backgroundColor: "#2a2a2a",
  padding: "1rem",
};

export default function AppContent() {
  const { assets, crypto } = useCrypto();

  const cryptoPriceMap = crypto?.reduce((acc: any, c: ICrypto) => {
    acc[c.id] = c.price;
    return acc;
  }, {});

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: "left", color: "#fff" }}>
        Portfolio:
        {assets
          ?.map((asset) => {
            return asset.amount * cryptoPriceMap[asset.id];
          })
          .reduce((acc, cur) => {
            acc += cur;
            return acc;
          }, 0)
          .toFixed(2)}
        $
      </Typography.Title>
      <PorfolioChart></PorfolioChart>
      <AssetsTable></AssetsTable>
    </Layout.Content>
  );
}
