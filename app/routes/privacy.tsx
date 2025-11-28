import { json, type MetaFunction } from '@remix-run/cloudflare';
import { PageLayout } from '~/components/layout/PageLayout';

export const meta: MetaFunction = () => {
  return [
    { title: 'Clyra.ai || Next Gen Ai Assistant' },
    { name: 'description', content: 'The privacy policy describing how user data is collected, used, stored, and protected. Required for legal compliance and transparency with users.' },
  ];
};

export const loader = () => json({});

const privacySections = [
  {
    id: 'introduction',
    title: '1. Introduction',
    content: `
      <p class="mb-4">At Clyra.ai, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, share, and protect your data when you use our AI development platform and services.</p>
      <p class="mb-4">By using Clyra.ai, you agree to the collection and use of information in accordance with this policy. If you disagree with any part of this privacy policy, please do not use our platform or services.</p>
      <p><strong>Last Updated:</strong> November 6, 2024</p>
    `
  },
  {
    id: 'information-we-collect',
    title: '2. Information We Collect',
    content: `
      <h4 class="font-semibold text-lg mb-3">Personal Information</h4>
      <ul class="list-disc list-inside mb-6 space-y-2">
        <li>Name and contact information (email address, phone number)</li>
        <li>Account credentials and authentication data</li>
        <li>Profile information and preferences</li>
        <li>Payment and billing information (for paid plans)</li>
        <li>Communication preferences and support interactions</li>
      </ul>

      <h4 class="font-semibold text-lg mb-3">Technical Information</h4>
      <ul class="list-disc list-inside mb-6 space-y-2">
        <li>IP address and device information</li>
        <li>Browser type, operating system, and usage patterns</li>
        <li>API usage statistics and performance metrics</li>
        <li>Log data and diagnostic information</li>
        <li>Cookies and similar tracking technologies</li>
      </ul>

      <h4 class="font-semibold text-lg mb-3">Content and Project Data</h4>
      <ul class="list-disc list-inside mb-6 space-y-2">
        <li>Code repositories and project files</li>
        <li>Chat histories and AI interactions</li>
        <li>Uploaded documents and media files</li>
        <li>Generated content and AI model outputs</li>
        <li>Collaboration data and team information</li>
      </ul>
    `
  },
  {
    id: 'how-we-use-information',
    title: '3. How We Use Your Information',
    content: `
      <p class="mb-4">We use the information we collect for various purposes, including:</p>
      
      <h4 class="font-semibold text-lg mb-3">Service Provision</h4>
      <ul class="list-disc list-inside mb-6 space-y-2">
        <li>Providing and maintaining our AI development platform</li>
        <li>Processing API requests and delivering AI services</li>
        <li>Managing your account and authentication</li>
        <li>Facilitating collaboration and team features</li>
        <li>Providing customer support and technical assistance</li>
      </ul>

      <h4 class="font-semibold text-lg mb-3">Platform Improvement</h4>
      <ul class="list-disc list-inside mb-6 space-y-2">
        <li>Analyzing usage patterns to improve our services</li>
        <li>Training and optimizing our AI models</li>
        <li>Developing new features and functionality</li>
        <li>Conducting research and development</li>
        <li>Monitoring platform performance and reliability</li>
      </ul>

      <h4 class="font-semibold text-lg mb-3">Communication</h4>
      <ul class="list-disc list-inside mb-6 space-y-2">
        <li>Sending service updates and technical notifications</li>
        <li>Providing important account and security information</li>
        <li>Sharing product updates and new feature announcements</li>
        <li>Responding to your inquiries and support requests</li>
        <li>Sending marketing communications (with your consent)</li>
      </ul>
    `
  },
  {
    id: 'data-sharing',
    title: '4. Data Sharing and Disclosure',
    content: `
      <p class="mb-4">We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:</p>
      
      <h4 class="font-semibold text-lg mb-3">Service Providers</h4>
      <p class="mb-4">We may share information with trusted third-party service providers who assist us in operating our platform, such as:</p>
      <ul class="list-disc list-inside mb-6 space-y-2">
        <li>Cloud infrastructure providers (AWS, Google Cloud)</li>
        <li>Payment processing services</li>
        <li>Email and communication services</li>
        <li>Analytics and monitoring tools</li>
        <li>Customer support platforms</li>
      </ul>

      <h4 class="font-semibold text-lg mb-3">Legal Requirements</h4>
      <p class="mb-4">We may disclose your information if required by law or in good faith belief that such action is necessary to:</p>
      <ul class="list-disc list-inside mb-6 space-y-2">
        <li>Comply with legal obligations and government requests</li>
        <li>Protect and defend our rights and property</li>
        <li>Prevent fraud or protect the safety of our users</li>
        <li>Enforce our Terms of Service and other policies</li>
        <li>Respond to emergency situations</li>
      </ul>

      <h4 class="font-semibold text-lg mb-3">Business Transfers</h4>
      <p class="mb-4">In the event of a merger, acquisition, or sale of assets, user information may be transferred as part of the transaction. We will provide notice before such transfers.</p>
    `
  },
  {
    id: 'data-security',
    title: '5. Data Security and Protection',
    content: `
      <p class="mb-4">We implement industry-standard security measures to protect your information:</p>
      
      <h4 class="font-semibold text-lg mb-3">Technical Safeguards</h4>
      <ul class="list-disc list-inside mb-6 space-y-2">
        <li><strong>Encryption:</strong> Data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption</li>
        <li><strong>Access Controls:</strong> Strict authentication and authorization mechanisms</li>
        <li><strong>Network Security:</strong> Firewalls, intrusion detection, and DDoS protection</li>
        <li><strong>Regular Audits:</strong> Security assessments and penetration testing</li>
        <li><strong>Secure Infrastructure:</strong> SOC 2 compliant data centers and cloud services</li>
      </ul>

      <h4 class="font-semibold text-lg mb-3">Organizational Measures</h4>
      <ul class="list-disc list-inside mb-6 space-y-2">
        <li>Employee training on data protection and privacy</li>
        <li>Need-to-know access principles</li>
        <li>Confidentiality agreements and background checks</li>
        <li>Incident response procedures and disaster recovery plans</li>
        <li>Regular security awareness programs</li>
      </ul>

      <h4 class="font-semibold text-lg mb-3">Data Retention</h4>
      <p class="mb-4">We retain your information only as long as necessary to:</p>
      <ul class="list-disc list-inside mb-6 space-y-2">
        <li>Fulfill the purposes for which it was collected</li>
        <li>Comply with legal obligations</li>
        <li>Resolve disputes and enforce our agreements</li>
        <li>Maintain security and prevent fraud</li>
      </ul>
    `
  },
  {
    id: 'your-rights',
    title: '6. Your Rights and Choices',
    content: `
      <p class="mb-4">You have the following rights regarding your personal information:</p>
      
      <h4 class="font-semibold text-lg mb-3">Access and Correction</h4>
      <ul class="list-disc list-inside mb-6 space-y-2">
        <li>Request access to your personal information</li>
        <li>Correct inaccurate or incomplete data</li>
        <li>Update your account information and preferences</li>
        <li>Export your data in a portable format</li>
      </ul>

      <h4 class="font-semibold text-lg mb-3">Control and Deletion</h4>
      <ul class="list-disc list-inside mb-6 space-y-2">
        <li>Delete your account and associated data</li>
        <li>Opt out of marketing communications</li>
        <li>Manage cookie preferences and tracking</li>
        <li>Control data sharing with third parties</li>
      </ul>

      <h4 class="font-semibold text-lg mb-3">To Exercise Your Rights</h4>
      <p class="mb-4">Contact us at:</p>
      <ul class="list-disc list-inside mb-6 space-y-2">
        <li>Email: privacy@clyra.ai</li>
        <li>Mail: Privacy Team, Clyra.ai, 123 Tech Street, San Francisco, CA 94105</li>
        <li>Account Settings: Manage preferences directly in your dashboard</li>
      </ul>
    `
  },
  {
    id: 'international-transfers',
    title: '7. International Data Transfers',
    content: `
      <p class="mb-4">Clyra.ai operates globally and may transfer your information to countries other than your own. We ensure appropriate safeguards are in place:</p>
      
      <h4 class="font-semibold text-lg mb-3">Transfer Mechanisms</h4>
      <ul class="list-disc list-inside mb-6 space-y-2">
        <li><strong>Adequacy Decisions:</strong> Transfers to countries with EU-approved data protection</li>
        <li><strong>Standard Contractual Clauses:</strong> EU-approved contracts for data transfers</li>
        <li><strong>Binding Corporate Rules:</strong> Internal rules for intra-organizational transfers</li>
        <li><strong> Consent:</strong> Your explicit consent when required</li>
      </ul>

      <h4 class="font-semibold text-lg mb-3">Data Centers</h4>
      <p class="mb-4">Our primary data centers are located in:</p>
      <ul class="list-disc list-inside mb-6 space-y-2">
        <li>United States (East and West Coast)</li>
        <li>European Union (Ireland and Germany)</li>
        <li>Asia Pacific (Singapore and Japan)</li>
      </ul>
    `
  },
  {
    id: 'childrens-privacy',
    title: '8. Children\'s Privacy',
    content: `
      <p class="mb-4">Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.</p>
      <p class="mb-4">If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately so we can delete such information.</p>
      <p class="mb-4">For users aged 13-17, we may collect limited information with parental consent where required by applicable law.</p>
    `
  },
  {
    id: 'policy-changes',
    title: '9. Changes to This Policy',
    content: `
      <p class="mb-4">We may update this Privacy Policy from time to time. Changes will be effective immediately upon posting.</p>
      <p class="mb-4">We will notify you of significant changes by:</p>
      <ul class="list-disc list-inside mb-6 space-y-2">
        <li>Email notification to registered users</li>
        <li>In-app notifications and dashboard alerts</li>
        <li>Posting on our website and social media channels</li>
        <li>Other appropriate communication methods</li>
      </ul>
      <p class="mb-4">We encourage you to review this policy periodically to stay informed about our privacy practices.</p>
    `
  },
  {
    id: 'contact-us',
    title: '10. Contact Us',
    content: `
      <p class="mb-4">If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
      
      <h4 class="font-semibold text-lg mb-3">Privacy Team</h4>
      <ul class="list-disc list-inside mb-6 space-y-2">
        <li><strong>Email:</strong> privacy@clyra.ai</li>
        <li><strong>Phone:</strong> +1 (555) 123-4567</li>
        <li><strong>Mail:</strong> Privacy Team, Clyra.ai, 123 Tech Street, San Francisco, CA 94105</li>
        <li><strong>Online Form:</strong> <a href="#" class="text-[#4DA8FF] hover:underline">Privacy Request Form</a></li>
      </ul>

      <h4 class="font-semibold text-lg mb-3">Data Protection Officer</h4>
      <p class="mb-4">For EU data protection matters: dpo@clyra.ai</p>
      
      <h4 class="font-semibold text-lg mb-3">Response Times</h4>
      <p class="mb-4">We will respond to privacy inquiries within 30 days of receipt, providing an update or resolution.</p>
    `
  }
];

export default function Privacy() {
  return (
    <PageLayout 
      title="Privacy Policy" 
      description="The privacy policy describing how user data is collected, used, stored, and protected. Required for legal compliance and transparency with users."
    >
      <div className="max-w-4xl mx-auto">
        {/* Quick Navigation */}
        <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl border border-accent-200/60 p-6 mb-8 shadow-lg sticky top-24">
          <h3 className="text-lg font-semibold text-bolt-elements-textPrimary mb-4">Quick Navigation</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {privacySections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-bolt-elements-textSecondary hover:text-[#4DA8FF] transition-colors py-2 px-3 rounded-lg hover:bg-accent-100 dark:hover:bg-accent-800"
              >
                {section.title}
              </a>
            ))}
          </div>
        </nav>

        {/* Privacy Content */}
        <div className="space-y-8">
          {privacySections.map((section) => (
            <section 
              key={section.id}
              id={section.id}
              className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl border border-accent-200/60 p-8 shadow-lg scroll-mt-32"
            >
              <h2 className="text-2xl font-bold text-bolt-elements-textPrimary mb-6">
                {section.title}
              </h2>
              <div 
                className="prose prose-lg max-w-none text-bolt-elements-textSecondary"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </section>
          ))}
        </div>

        {/* Download and Print Options */}
        <div className="mt-12 bg-gradient-to-r from-[#4DA8FF]/10 to-[#2C8CFF]/10 rounded-2xl border border-accent-200/60 p-8 text-center">
          <h3 className="text-xl font-bold text-bolt-elements-textPrimary mb-4">
            Keep This Policy Handy
          </h3>
          <p className="text-bolt-elements-textSecondary mb-6">
            Download or print our privacy policy for your records.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-gradient-to-r from-[#4DA8FF] to-[#2C8CFF] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2">
              <span className="i-ph:download-simple"></span>
              Download PDF
            </button>
            <button className="px-6 py-3 bg-white/80 dark:bg-gray-900/80 text-bolt-elements-textPrimary font-semibold rounded-xl border border-accent-200/60 hover:border-[#4DA8FF] transition-all duration-200 flex items-center justify-center gap-2">
              <span className="i-ph:printer"></span>
              Print Policy
            </button>
          </div>
        </div>

        {/* Last Updated Notice */}
        <div className="mt-8 text-center text-sm text-bolt-elements-textSecondary">
          <p>This Privacy Policy was last updated on November 6, 2024.</p>
          <p className="mt-2">For questions about this policy, contact us at privacy@clyra.ai</p>
        </div>
      </div>
    </PageLayout>
  );
}
