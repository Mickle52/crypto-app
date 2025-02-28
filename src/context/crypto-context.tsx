import { createContext, useContext, useEffect, useState } from "react";
import { fakeFetchAssets, fetchCrypto } from "../api.js";
import { percentDifference } from "../utils.ts";
import { IAsset, ICrypto, ICryptoContext } from "../types/types.tsx";
import * as React from "react";

interface CryptoContextProviderProps {
  children: React.ReactNode;
}

const CryptoContext = createContext<ICryptoContext>({});

export function CryptoContextProvider({
  children,
}: CryptoContextProviderProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [crypto, setCrypto] = useState<ICrypto[]>([]);
  const [assets, setAssets] = useState<any>([]);

  function mapAssets(assetsArr: IAsset[], cryptoArr: ICrypto[]) {
    return assetsArr.map((asset: IAsset) => {
      const coin = cryptoArr.find((c: ICrypto) => c.id === asset.id);
      if (coin) {
        return {
          grow: asset.price < coin.price,
          growPercent: percentDifference(asset.price, coin.price),
          totalAmount: asset.amount * coin.price,
          totalProfit: asset.amount * coin.price - asset.amount * asset.price,
          name: coin.name,
          ...asset,
        };
      } else return;
    });
  }

  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fetchCrypto();
      const fetchAssets: IAsset[] = await fakeFetchAssets();

      setAssets(mapAssets(fetchAssets, result));

      setCrypto(result);
      setLoading(false);
    }
    preload();
  }, []);

  function addAssets(newAsset: IAsset) {
    setAssets((prevState: IAsset[]) =>
      mapAssets([...prevState, newAsset], crypto),
    );
  }

  return (
    <CryptoContext.Provider value={{ loading, crypto, assets, addAssets }}>
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;

export function useCrypto() {
  return useContext(CryptoContext);
}
