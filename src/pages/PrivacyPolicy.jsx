import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="max-w-5xl mx-auto px-5 py-16">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

      <div className="card space-y-6">
        <p>
          Your privacy is important to us. This policy explains how we collect,
          use, and protect your information.
        </p>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            1. Information We Collect
          </h2>
          <p>
            We may collect personal information such as name, email address, and
            usage data when you interact with our services.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            2. How We Use Information
          </h2>
          <p>
            Information is used to improve services, personalize user experience,
            and communicate important updates.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            3. Data Protection
          </h2>
          <p>
            We implement industry-standard security measures to protect your
            data from unauthorized access.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            4. Third-Party Services
          </h2>
          <p>
            We do not sell or share your personal data with third parties except
            where required by law.
          </p>
        </div>

        <p className="text-sm opacity-70">
          Last updated: January 2026
        </p>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
