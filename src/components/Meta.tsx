import Head from 'next/head';
import React from 'react';

type MetaProps = {
  title: string;
  description: string;
  imageUrl?: string;
  timestamp?: string;
};

export function Meta({ title, description, imageUrl, timestamp }: MetaProps) {
  return (
    <Head>
      <title>Purrlend - lending borrowing on hyperevm</title>
      <meta name="description" content={description} key="description" />
      <meta property="og:title" content={`Purrlend - ${title}`} key="title" />
      <meta property="og:description" content={description} key="ogdescription" />
      {imageUrl && <meta property="og:image" content={imageUrl} key="ogimage" />}
      {imageUrl && <meta name="twitter:image" content={imageUrl} key="twitterimage" />}
      <meta
        name="keywords"
        key="keywords"
        content="Decentralized Finance, DeFi, lending, borrowing, stablecoins, Ethereum, assets, erc-20, smart contracts, open finance, trustless"
      />
    </Head>
  );
}
