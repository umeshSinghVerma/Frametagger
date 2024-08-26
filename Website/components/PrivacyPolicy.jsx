import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto my-10 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        At Vegah LLC, we value your privacy and are committed to protecting your personal information. This privacy policy explains how we collect, use, and disclose information from our users when they use our Youtube-Notes browser extension and website.
      </p>
      
      <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Usage Data: We collect data on how you use Youtube-Notes, including the videos you tag, the timestamps and screenshots you capture, and your interactions with the extension.</li>
        <li>Device and Browser Data: We collect data about your device and browser, including your IP address, browser type, and device type.</li>
        <li>Login Data: If you choose to create an account with us, we collect your email address and password.</li>
      </ul>
      
      <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Providing and Improving Youtube-Notes: We use your information to provide and improve Youtube-Notes, including developing new features and improving performance.</li>
        <li>Customer Support: We use your information to respond to your support requests and provide assistance with using Youtube-Notes.</li>
        <li>Marketing and Promotions: We may use your information to send you updates, promotions, and other marketing materials about Youtube-Notes.</li>
      </ul>
      
      <h2 className="text-xl font-semibold mt-6 mb-2">YouTube Video Data and User Interactions</h2>
      <ul className="list-disc list-inside mb-4">
        <li>We collect and store YouTube video metadata, including video titles, URLs, and timestamps, solely for the purpose of providing the Youtube-Notes service.</li>
        <li>We do not collect or store any personal data from YouTube, such as user accounts or video viewing history.</li>
        <li>Our extension may interact with YouTube&apos;s API to retrieve video metadata and provide tagging functionality. We adhere to YouTube&apos;s Terms of Service and API usage guidelines.</li>
        <li>We do not sell, rent, or share YouTube video data or user interaction data with third parties, except as required by law or to comply with a legal obligation.</li>
      </ul>
      
      <h2 className="text-xl font-semibold mt-6 mb-2">Data Storage and Security</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Local Storage: Youtube-Notes stores your data locally on your device, ensuring quick access and privacy.</li>
        <li>Encryption: We encrypt your data to protect it from unauthorized access.</li>
        <li>Secure Servers: Our servers are hosted on secure infrastructure, with appropriate security measures to protect your data.</li>
      </ul>
      
      <h2 className="text-xl font-semibold mt-6 mb-2">Data Sharing</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Third-Party Services: We may share your information with third-party services that help us operate Youtube-Notes, such as analytics providers and customer support software.</li>
        <li>Legal Requirements: We may share your information to comply with legal requirements, such as responding to subpoenas or other legal processes.</li>
      </ul>
      
      <h2 className="text-xl font-semibold mt-6 mb-2">Your Rights</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Access and Correction: You have the right to access and correct your personal information.</li>
        <li>Deletion: You have the right to request deletion of your personal information.</li>
        <li>Opt-Out: You have the right to opt-out of marketing communications from us.</li>
      </ul>
      
      <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
      <p className="mb-4">
        If you have any questions about this privacy policy or our data practices, please contact us at <a href="mailto:info@Youtube-Notes.com" className="text-blue-600">info@Youtube-Notes.com</a>. We&apos;ll be happy to help!
      </p>
      
      <h2 className="text-xl font-semibold mt-6 mb-2">Changes to This Privacy Policy</h2>
      <p className="mb-4">
        We may update this privacy policy from time to time. We will notify you of any significant changes by posting a notice on our website.
      </p>
      
      <p className="mb-4">
        Effective Date: This privacy policy is effective as of May 17, 2024.
      </p>
      
      <p className="mb-4 font-semibold">
        By using Youtube-Notes, you acknowledge that you have read, understand, and agree to be bound by this privacy policy.
      </p>
    </div>
  );
}

export default PrivacyPolicy;
