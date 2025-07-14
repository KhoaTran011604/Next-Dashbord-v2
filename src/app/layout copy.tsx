"use client";
import { StoreProvider } from "context/store";
import { ThemeProvider } from "context/theme";
import "../../main.css";
import { Navbar } from "@/components/Navbar";
import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "context/auth";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <html lang="en">
      <head>
        <meta name="description" content="Todo APP - NextJs chuẩn SEO" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Todo App - NEXTJS</title>
      </head>
      <body>
        <StoreProvider>
          <ThemeProvider>
            <QueryClientProvider client={queryClient}>
              <AuthProvider>
                <div>
                  {children}
                </div>
              </AuthProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
