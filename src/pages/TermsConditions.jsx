import React from "react";

const TermsConditions = () => {
  return (
    <section className="max-w-5xl mx-auto px-5 py-16">
      <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>

      <div className="card space-y-6">
        <p>
          Welcome to our platform. By accessing or using our services, you agree
          to be bound by these Terms & Conditions. Please read them carefully.
        </p>

        <div>
          <h2 className="text-2xl font-semibold mb-2">1. Use of Services</h2>
          <p>
            You agree to use our platform only for lawful purposes and in a way
            that does not infringe the rights of others or restrict their use.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            2. User Responsibilities
          </h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account and for all activities that occur under your account.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            3. Content & Intellectual Property
          </h2>
          <p>
            All content on this platform is protected by copyright laws. You may
            not copy, distribute, or reuse content without permission.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            4. Termination
          </h2>
          <p>
            We reserve the right to suspend or terminate access if these terms
            are violated.
          </p>
        </div>

        <p className="text-sm opacity-70">
          Last updated: January 2026
        </p>
      </div>
    </section>
  );
};

export default TermsConditions;
