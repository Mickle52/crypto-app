import { cryptoAssets, cryptoData } from "./data.js";

export async function fetchCrypto() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": "F5JjdVg65zWwq9eB7BY88Z17vY4pEZVxZCHvloD/t98=",
    },
  };
  let response = await fetch("https://openapiv1.coinstats.app/coins", options);
  if (response.ok) {
    return await response.json();
  } else {
    return cryptoData;
  }
}

// export function fakeFetchCrypto() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(cryptoData);
//     }, 1);
//   });
// }

export function fakeFetchAssets() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets);
    }, 1);
  });
}
