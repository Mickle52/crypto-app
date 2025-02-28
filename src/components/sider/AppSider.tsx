import {
  Layout,
  Card,
  Statistic,
  List,
  Typography,
  Spin,
  Tag,
  Drawer,
  Space,
  Button,
} from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { capitalize } from "../../utils";
import { useCrypto } from "../../context/crypto-context.tsx";
import { IAsset, ICryptoContext } from "../../types/types.tsx";
import "./AppSider.css";
import { useEffect, useState } from "react";
const siderStyle: React.CSSProperties = {
  padding: "1rem",
  background: "#2a2a2a",
};

const siderStyleSmallWidth: React.CSSProperties = {
  padding: "0",
  background: "#2a2a2a",
};

console.log(window.screen.width);

export default function AppSider() {
  const { loading, assets }: ICryptoContext = useCrypto();
  const [width, setWidth] = useState(window.innerWidth);
  const [open, setOpen] = useState(false);
  const breakpoint = 768;

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  if (loading) {
    return <Spin fullscreen />;
  }

  if (width > breakpoint) {
    return (
      <Layout.Sider width="25%" style={siderStyle}>
        {assets?.map((asset: IAsset) => (
          <Card
            key={asset.id + String(Math.random())}
            style={{ marginBottom: "1rem" }}
            className="sider-card"
          >
            <Statistic
              title={capitalize(asset.id)}
              value={asset.totalAmount}
              precision={2}
              valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
              prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix="$"
              className="statistic"
            />
            <List
              size="small"
              dataSource={[
                {
                  title: "Total Profit",
                  value: asset.totalProfit,
                  withTag: true,
                },
                { title: "Asset Amount", value: asset.amount, isPlain: true },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <span>{item.title}</span>
                  <span>
                    {item.withTag && (
                      <Tag color={asset.grow ? "green" : "red"}>
                        {asset.growPercent}%
                      </Tag>
                    )}
                    {item.isPlain && item.value}
                    {!item.isPlain && (
                      <Typography.Text type={asset.grow ? "success" : "danger"}>
                        {item.value ? item.value.toFixed(2) : null}$
                      </Typography.Text>
                    )}
                  </span>
                </List.Item>
              )}
            />
          </Card>
        ))}
      </Layout.Sider>
    );
  } else {
    return (
      <>
        <Layout.Sider width="0%" style={siderStyleSmallWidth}>
          <Button
            type="primary"
            onClick={showDrawer}
            style={{ left: "20px" }}
            className="assets-changes-btn"
          >
            Assets changes
          </Button>
          <Drawer
            title="Total changes"
            placement="left"
            width={500}
            onClose={onClose}
            open={open}
            extra={<Space></Space>}
          >
            {assets?.map((asset: IAsset) => (
              <Card
                key={asset.id + String(Math.random())}
                style={{
                  marginBottom: "1rem",
                  borderColor: "black",
                  overflowX: "hidden",
                }}
                className="sider-card"
              >
                <Statistic
                  title={capitalize(asset.id)}
                  value={asset.totalAmount}
                  precision={2}
                  valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
                  prefix={
                    asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />
                  }
                  suffix="$"
                  className="statistic"
                />
                <List
                  size="small"
                  dataSource={[
                    {
                      title: "Total Profit",
                      value: asset.totalProfit,
                      withTag: true,
                    },
                    {
                      title: "Asset Amount",
                      value: asset.amount,
                      isPlain: true,
                    },
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      <span>{item.title}</span>
                      <span>
                        {item.withTag && (
                          <Tag color={asset.grow ? "green" : "red"}>
                            {asset.growPercent}%
                          </Tag>
                        )}
                        {item.isPlain && item.value}
                        {!item.isPlain && (
                          <Typography.Text
                            type={asset.grow ? "success" : "danger"}
                          >
                            {item.value ? item.value.toFixed(2) : null}$
                          </Typography.Text>
                        )}
                      </span>
                    </List.Item>
                  )}
                />
              </Card>
            ))}
          </Drawer>
        </Layout.Sider>
      </>
    );
  }
}
