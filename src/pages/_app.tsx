import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';
import { RainbowKitProvider, getDefaultWallets, midnightTheme } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import dynamic from "next/dynamic";

const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.mainnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
      ? [chain.goerli]
      : []),
  ],
  [
    // default: '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC'
    alchemyProvider({
      apiKey: 'm-hvY9WoNVSJMsy7bgViEm3wH9eBQFAF',
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function App({ Component, pageProps }: AppProps) {

  const Page = dynamic(() => import("../components/Page"), { ssr:false, });

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider 
        theme={midnightTheme({
          accentColor: 'green',
          borderRadius: 'medium',
          fontStack: 'system'
        })} 
        chains={chains}>
        <ChakraProvider theme={theme}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;






