"use client";
import React from "react";
import { SWRConfig } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const swrConfig = {
  revalidateOnFocus: false,
  shouldRetryOnError: false,
  fetcher,
};

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SWRConfig value={swrConfig}>{children}</SWRConfig>;
}
