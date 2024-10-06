import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Baby Care Store",
  description:
    "Our commitment to protecting your privacy and personal information.",
};

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-5xl text-center font-bold mb-6">Privacy Policy</h1>

      <p className="mb-6">
        At Baby Care Store, we are committed to protecting your privacy and
        ensuring the security of your personal information. This Privacy Policy
        outlines how we collect, use, and safeguard your data when you use our
        website and services.
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">
          1. Information We Collect
        </h2>
        <p>We collect the following types of information:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Personal information (name, email address, phone number)</li>
          <li>Payment information</li>
          <li>Shipping address</li>
          <li>Browsing history and preferences</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">
          2. How We Use Your Information
        </h2>
        <p>We use your information to:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Process and fulfill your orders</li>
          <li>Provide customer support</li>
          <li>Improve our products and services</li>
          <li>Send promotional offers and updates (with your consent)</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">3. Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your
          personal information from unauthorized access, disclosure, alteration,
          and destruction. Our website uses SSL encryption to secure data
          transmission.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">4. Third-Party Services</h2>
        <p>
          We may use third-party services for analytics, payment processing, and
          marketing. These services may collect and process your data according
          to their own privacy policies.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">5. Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Access and update your personal information</li>
          <li>Request deletion of your data</li>
          <li>Opt-out of marketing communications</li>
          <li>Lodge a complaint with a supervisory authority</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">
          6. Changes to This Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify
          you of any significant changes by posting a notice on our website or
          sending you an email.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">7. Contact Us</h2>
        <p>
          If you have any questions or concerns about our Privacy Policy, please
          contact us at:
        </p>
        <address className="mt-2">
          <strong>Baby Care Store</strong>
          <br />
          Email: privacy@babycarestore.com
          <br />
          Phone: (123) 456-7890
          <br />
          Address: 123 Privacy Street, Securetown, ST 12345
        </address>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
