export const metadata = {
  title: "Privacy Policy | Disha for India",
  description: "Learn how Disha for India collects, uses, and protects your personal information.",
  openGraph: {
    title: "Privacy Policy | Disha for India",
    description: "Learn how Disha for India collects, uses, and protects your personal information.",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-bg py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <h1 className="font-display font-bold text-4xl md:text-5xl text-text mb-4">Privacy Policy</h1>
        <p className="font-body text-text-muted mb-12">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        
        <div className="prose prose-lg prose-orange max-w-none font-body text-text-muted prose-headings:font-display prose-headings:text-text prose-a:text-primary">
          <p>
            At Disha for India, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or interact with our programs.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We may collect personal information that you voluntarily provide to us when you:
          </p>
          <ul>
            <li>Register for an event or workshop</li>
            <li>Sign up to volunteer</li>
            <li>Subscribe to our newsletter</li>
            <li>Submit a success story or contact us</li>
          </ul>
          <p>
            This information may include your name, email address, phone number, location, and any other details you choose to share with us.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Communicate with you regarding our programs, events, and initiatives</li>
            <li>Process your volunteer applications or event registrations</li>
            <li>Improve our website and community outreach efforts</li>
            <li>Send periodic newsletters and updates (you can opt out at any time)</li>
          </ul>

          <h2>3. Information Sharing and Disclosure</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent. We may share your information with trusted third-party service providers who assist us in operating our website, conducting our operations, or servicing you, so long as those parties agree to keep this information confidential.
          </p>

          <h2>4. Data Security</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee its absolute security.
          </p>

          <h2>5. Your Rights</h2>
          <p>
            You have the right to request access to, correction of, or deletion of your personal information. If you wish to exercise any of these rights, please contact us using the details provided below.
          </p>

          <h2>6. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:<br/>
            <strong>Email:</strong> contact@dishaforindia.org<br/>
            <strong>Address:</strong> 123 NGO Street, New Delhi, India 110001
          </p>
        </div>
      </div>
    </div>
  );
}
