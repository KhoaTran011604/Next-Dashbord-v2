import "../css/satoshi.css";
import "../css/style.css";

import "../../main.css";
import { Providers } from "./providers";
import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = true;

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {isAuth ? (
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="w-full bg-gray-200 dark:bg-[#020d1a]">
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
