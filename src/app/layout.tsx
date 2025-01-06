"use client";
import { useEffect, useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import CookieConsent from 'react-cookie-consent';
import './globals.css';
import Footer from './components/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); 
  }, []);

  return (
    <html lang="en">
      <body>
        <SessionProvider> 
          {isClient && (
            <CookieConsent
              location="top"
              buttonText="I understand"
              declineButtonText="Decline"
              cookieName="myAwesomeCookieName"
              enableDeclineButton
              buttonStyle={{
                background: "#2842a7",
                color: "#fff",
                fontSize: "14px",
              }}
              declineButtonStyle={{
                background: "#dc3545",
                color: "#fff",
                fontSize: "14px",
              }}
              style={{ background: "#2B373B" }}
            >
              This website uses cookies to enhance the user experience. You can learn more in our Privacy Policy.
            </CookieConsent>
          )}
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
