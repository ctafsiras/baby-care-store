import React from "react";

const TermsOfService: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-5xl text-center font-bold mb-6">
        Terms of Service
      </h1>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using this website, you accept and agree to be
            bound by the terms and provision of this agreement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">2. Use of the Service</h2>
          <p>
            You agree to use our service for lawful purposes only and in a way
            that does not infringe the rights of, restrict or inhibit anyone
            else&apos;s use and enjoyment of the website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            3. Intellectual Property
          </h2>
          <p>
            The content, organization, graphics, design, compilation, magnetic
            translation, digital conversion and other matters related to the
            Site are protected under applicable copyrights, trademarks and other
            proprietary rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            4. Disclaimer of Warranties
          </h2>
          <p>
            This website and the materials, information, services, and products
            in this site, including, without limitation, text, graphics, and
            links, are provided &quot;as is&quot; and without warranties of any
            kind, whether express or implied.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            5. Limitation of Liability
          </h2>
          <p>
            In no event shall we be liable for any direct, indirect, incidental,
            special or consequential damages, resulting from the use or the
            inability to use the website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">6. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Please check
            this page periodically for changes. Your continued use of our
            services following the posting of changes to these terms will mean
            you accept those changes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">7. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in
            accordance with the laws of [Your Jurisdiction] and you irrevocably
            submit to the exclusive jurisdiction of the courts in that State or
            location.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
