import { useEffect, useMemo, useState } from "react";
import Main from "./Main";
import { RPC_ENDPOINT } from "../utils";

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";

import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";

import "@solana/wallet-adapter-react-ui/styles.css"

export default function Home() {
  const [mounted, setMounted] =useState(false)

  const wallets = useMemo(
    ()=> [
      new PhantomWalletAdapter()
    ],
    []
  );

  //In order to fix SSR error with Next
  useEffect(()=>{
    setMounted(true)
  },[])

  return (
    <ConnectionProvider
      endpoint={RPC_ENDPOINT}
      config ={{ commitment: "confirmed"}}
    >
      <WalletProvider wallets={wallets} autoconnect>
        <WalletModalProvider>
          {mounted && <Main />}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
