import React from "react";

const HelpCenter = () => {
  return (
    <section className="max-w-6xl mx-auto px-5 py-16">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Help Center
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-2xl font-semibold mb-3">
            Account & Registration
          </h2>
          <p>
            Learn how to create an account, update your profile, and manage your
            login details.
          </p>
        </div>

        <div className="card">
          <h2 className="text-2xl font-semibold mb-3">
            Learning Challenges
          </h2>
          <p>
            Get help joining challenges, tracking progress, and understanding
            challenge rules.
          </p>
        </div>

        <div className="card">
          <h2 className="text-2xl font-semibold mb-3">
            Payments & Subscriptions
          </h2>
          <p>
            Information about subscriptions, billing cycles, and refunds.
          </p>
        </div>

        {/* <div className="card">
          <h2 className="text-2xl font-semibold mb-3">
            Contact Support
          </h2>
          <p>
            If you need further help, reach out to our support team and we’ll
            assist you promptly.
          </p>

          <button className="btn-primary mt-4">
            Contact Support
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default HelpCenter;
