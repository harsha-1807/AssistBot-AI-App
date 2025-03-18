import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ApolloProviderWrapper from "../../components/ApolloProvider";

export const metadata: Metadata = {
  title: "AI Assist Bot",
  description: "Custamize your own AI Assist Bot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ApolloProviderWrapper>
      <ClerkProvider>
        <html lang="en">
          <body className="min-h-screen flex">{children}</body>

          {/* toaster  */}
        </html>
      </ClerkProvider>
    </ApolloProviderWrapper>
  );
}
