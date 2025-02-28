import { Flex, Typography } from "antd";
import { ICrypto } from "../../types/types.tsx";

interface Props {
  coin: ICrypto;
}

const CoinInfo = ({ coin }: Props) => {
  return (
    <Flex align="center">
      <img
        src={coin.icon}
        alt={coin.name}
        width="40"
        loading="lazy"
        style={{ marginRight: 10 }}
      />
      <Typography.Title level={2} style={{ margin: 0 }}>
        {`(${coin.symbol})`} {coin.name}
      </Typography.Title>
    </Flex>
  );
};

export default CoinInfo;
