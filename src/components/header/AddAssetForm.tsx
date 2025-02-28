import { useRef, useState } from "react";
import {
  Button,
  Checkbox,
  CheckboxProps,
  Divider,
  Form,
  InputNumber,
  Select,
  Space,
  DatePicker,
  Result,
} from "antd";
import { useCrypto } from "../../context/crypto-context.tsx";
import { ICrypto } from "../../types/types.tsx";
import CoinInfo from "./CoinInfo.tsx";

type FieldType = {
  amount?: number;
  price?: number;
  checkbox?: any;
  date?: any;
  total?: number;
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    number: "${label} is not valid number",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

interface PropsAddAssetForm {
  onClose: () => void;
}

interface IAsetRef {
  id?: string;
  amount?: number;
  price?: number;
  date?: any;
}

const AddAssetForm = ({ onClose }: PropsAddAssetForm) => {
  const { crypto, addAssets } = useCrypto();
  const [coin, setCoin] = useState<ICrypto>();
  const [form] = Form.useForm();
  const [submitted, setSubmitted] = useState(false);
  const assetRef = useRef<IAsetRef | null>(null);

  if (submitted) {
    return (
      <Result
        status="success"
        title="New Asset Added"
        subTitle={`Added ${assetRef.current?.amount} of ${assetRef.current?.id} by price ${assetRef.current?.price} $`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    );
  }

  if (!coin) {
    return (
      <Select
        style={{ width: "100%" }}
        onSelect={(v) => setCoin(crypto?.find((c: ICrypto) => c.id === v))}
        placeholder="Select coin"
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
    );
  }

  function onFinish(values: FieldType) {
    const newAsset: IAsetRef = {
      id: coin?.id,
      amount: values.amount,
      price: values.price,
      date: values.date
        ? new Date(values.date).toLocaleDateString()
        : new Date().toLocaleDateString(),
    };
    assetRef.current = newAsset;
    console.log(newAsset.date.value);
    setSubmitted(true);
    addAssets(newAsset);
  }

  function handleAmountChange(value: number | null): void {
    const price = form.getFieldValue("price");
    if (value) {
      form.setFieldsValue({
        total: +(value * price).toFixed(2),
      });
    }
  }

  function handlePriceChange(value: number | null): void {
    const amount = form.getFieldValue("amount");
    if (value) {
      form.setFieldsValue({
        total: +(amount * value).toFixed(2),
      });
    }
  }

  const onChangeCheckbox: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
    const amount = form.getFieldValue("amount");
    let price = 0;
    if (e.target.checked) {
      price = coin.price;
      form.setFieldsValue({
        price: +price.toFixed(2),
        total: +(amount * price).toFixed(2),
      });
    } else {
      form.setFieldsValue({
        price: 0,
        total: +(amount * price).toFixed(2),
      });
    }
  };

  return (
    <>
      <CoinInfo coin={coin}></CoinInfo>

      <Divider />

      <Form
        form={form}
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 10 }}
        style={{ maxWidth: 600 }}
        initialValues={{
          price: +coin.price.toFixed(2),
        }}
        onFinish={onFinish}
        autoComplete="off"
        validateMessages={validateMessages}
        labelWrap
      >
        <Form.Item<FieldType>
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              type: "number",
              min: 0,
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Enter coin amount"
            onChange={handleAmountChange}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              type: "number",
              min: 0,
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            prefix="$"
            onChange={handlePriceChange}
          />
        </Form.Item>

        <Form.Item<FieldType> label="Set market price" name="checkbox">
          <Checkbox onChange={onChangeCheckbox} defaultChecked></Checkbox>
        </Form.Item>

        <Form.Item<FieldType> name="date" label="Date & Time">
          <DatePicker
            style={{ width: "100%" }}
            format={"DD/MM/YYYY"}
            mode={"date"}
          />
        </Form.Item>

        <Form.Item<FieldType> name="total" label="Total">
          <InputNumber style={{ width: "100%" }} min={0} prefix="$" readOnly />
        </Form.Item>

        <Form.Item name="button">
          <Button type="primary" htmlType="submit">
            Add Asset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddAssetForm;
