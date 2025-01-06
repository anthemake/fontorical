export default function PrivacyPolicy() {
    return (
      <main className="h-screen bg-background text-textcolor flex flex-col justify-center items-center p-8">
        <div className="max-w-4xl w-full bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-6 text-white">Privacy Policy</h1>
          <p className="text-lg mb-4 text-gray-300">
            This page explains what data we collect, why we collect it, and how you can access or request the deletion of your data. 
          </p>
          <p className="text-lg mb-6 text-gray-300">
            We value your privacy and are committed to protecting your personal data.
          </p>
          <h2 className="text-2xl font-semibold mb-4 text-white">What Data We Collect</h2>
          <p className="text-lg mb-4 text-gray-300">
            We collect basic information like usernames and email addresses when you sign in using Google OAuth. This is used to identify your account.
          </p>
          <h2>Cookie Usage</h2>
<p>
  Our website uses cookies to improve your experience. Cookies are small text files that are placed on your device to store information about your preferences. You can choose to accept or decline cookies at any time using the "Manage Cookies" option at the bottom of the page.
</p>
<p>
  We use cookies for:
  <ul>
    <li>Personalizing your experience</li>
    <li>Remembering your preferences</li>
    <li>Analyzing site traffic and performance</li>
  </ul>
</p>
<p>
  You can manage your cookie preferences or revoke your consent by clicking on "Manage Cookies" at the bottom of the page.
</p>

          <h2 className="text-2xl font-semibold mb-4 text-white">How to Request Data Deletion</h2>
          <p className="text-lg mb-4 text-gray-300">
            If you would like to delete your data, please visit your account settings or contact us at [email address].
          </p>
        </div>
      </main>
    );
  }
  