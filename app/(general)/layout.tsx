import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import CookiesConsent from '@/components/cookiesConsent';

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <CookiesConsent />

      <Footer />
    </>
  );
}
