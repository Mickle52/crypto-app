import { Table } from "antd";
import type { TableColumnsType } from "antd";
import React, { FC } from "react";
import { useCrypto } from "../../context/crypto-context.tsx";

interface DataType {
  key: React.Key;
  name: string;
  price: number;
  amount: number;
  date: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    showSorterTooltip: { target: "full-header" },
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Jim",
        value: "Jim",
      },
      {
        text: "Submenu",
        value: "Submenu",
        children: [
          {
            text: "Green",
            value: "Green",
          },
          {
            text: "Black",
            value: "Black",
          },
        ],
      },
    ],
    // @ts-expect-error 'Проблема с внутренним апи таблицы'
    sorter: (a, b) => a.name[0] < b.name[0],
    sortDirections: ["descend"],
  },
  {
    title: "Price, $",
    dataIndex: "price",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: "Date",
    dataIndex: "date",
  },
];

const AssetsTable: FC = () => {
  const { assets } = useCrypto();

  const dataAssets = assets?.map((asset) => ({
    key: asset.id + String(Math.random()),
    name: asset.name,
    price: asset.price,
    amount: asset.amount,
    date: asset.date,
  }));

  return (
    <Table<DataType>
      pagination={false}
      columns={columns}
      // @ts-expect-error 'Проблема с внутренним апи таблицы'
      dataSource={dataAssets}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AssetsTable;
