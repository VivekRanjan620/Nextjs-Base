import Navbar from './components/layout/Navbar';
import Footer from "./components/layout/Footer";
// import ProfileBottomNav  from "./components/layout/Profile-bottomNav";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>  {/* pb-16 — BottomNav ke liye space */}
        {/* <ProfileBottomNav  />    */}
        <Footer />
      </body>
    </html>
  );
}