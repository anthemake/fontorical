import CookieConsent, { Cookies } from "react-cookie-consent";

export default function Footer() {

    const handleRevokeConsent = () => {
        Cookies.remove("myAwesomeCookieName");
        // Optionally reload the page to show the consent banner again
        window.location.reload();
      };

    return (
      <footer className="fixed bottom-0 left-0 w-auto p-1 bg-gray-800 text-center">
        <a href="/privacy-policy" className="text-white underline">
          Privacy Policy
        </a>
        <button
        onClick={handleRevokeConsent}
        className="underline px-1 text-indigo-300"
      >
        Manage Cookies
      </button>
      </footer>
    );
  }
  