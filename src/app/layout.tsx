"use client";
import "../css/satoshi.css";
import "../css/style.css";

import { StoreProvider } from "context/store";
import { ThemeProvider } from "context/theme";
import "../../main.css";
import { Navbar } from "@/components/Navbar";
import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "context/auth";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Providers } from "./providers";
import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = true;
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 phút dữ liệu không "stale"
            //cacheTime: 1000 * 60 * 30, // 30 phút trước khi cache bị xoá
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push("/login");
  //   }
  // }, [isAuthenticated]);

  //if (!isAuthenticated) return null; // Hoặc loading...
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {/* <NextTopLoader color="#5750F1" showSpinner={false} /> */}

          {isAuth ? (
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
                <Header />
                <main className="bg-gray-100 h-full overflow-y-hidden isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10 dark:bg-black/70">
                  {children}
                </main>
              </div>
            </div>
          ) : (
            <>{children}</>
          )}
        </Providers>
      </body>
    </html>
  );
}
