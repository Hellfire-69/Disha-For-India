export const metadata = {
  title: "Terms of Service | Disha for India",
  description: "Read the terms and conditions governing your use of the Disha for India website.",
  openGraph: {
    title: "Terms of Service | Disha for India",
    description: "Read the terms and conditions governing your use of the Disha for India website.",
    type: "website",
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="w-full bg-bg py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <h1 className="font-display font-bold text-4xl md:text-5xl text-text mb-4">Terms of Service</h1>
        <p className="font-body text-text-muted mb-12">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        
        <div className="prose prose-lg prose-orange max-w-none font-body text-text-muted prose-headings:font-display prose-headings:text-text prose-a:text-primary">
          <p>
            Welcome to the Disha for India website. By accessing or using our website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website.
          </p>

          <h2>1. Use of the Website</h2>
          <p>
            You agree to use the website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else&apos;s use and enjoyment of the website. Prohibited behavior includes harassing or causing distress or inconvenience to any person, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our website.
          </p>

          <h2>2. Intellectual Property</h2>
          <p>
            All content on this website, including but not limited to text, graphics, logos, images, audio clips, and software, is the property of Disha for India or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works from any part of this website without our express written permission.
          </p>

          <h2>3. User Submissions</h2>
          <p>
            By submitting success stories, feedback, or any other content to us, you grant Disha for India a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, adapt, publish, translate, and display such content in any media. You warrant that any content you submit does not violate the rights of any third party.
          </p>

          <h2>4. Links to Third-Party Websites</h2>
          <p>
            Our website may contain links to third-party websites or services that are not owned or controlled by Disha for India. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites. You acknowledge and agree that Disha for India shall not be responsible or liable, directly or indirectly, for any damage or loss caused by your use of such websites.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Disha for India shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the website.
          </p>

          <h2>6. Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms of Service at any time. We will provide notice of any significant changes by posting the new Terms on this page. Your continued use of the website after any such changes constitutes your acceptance of the new Terms of Service.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:<br/>
            <strong>Email:</strong> contact@dishaforindia.org<br/>
            <strong>Address:</strong> 123 NGO Street, New Delhi, India 110001
          </p>
        </div>
      </div>
    </div>
  );
}
