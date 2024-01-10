import React from "react";

function About() {
  return (
    <div className="container mx-auto mt-10 p-5 bg-white rounded shadow-lg animated-link">
      <blockquote className="text-center border-l-4 border-blue-500 pl-4">
        <p className="text-lg mb-5 italic">
          <strong className="font-bold text-blue-500">
            {" "}
            Every thing is possible,
          </strong>
          <br />
          Every thing is in the scope of the process,
          <br />
          Your work is to{" "}
          <strong className="font-bold text-blue-500">
            get the process from the right mentor and work hard
          </strong>
          <br />
          <strong className="font-bold text-blue-500">
            to complete the process, and complete it.
          </strong>
          <br />
        </p>
        <p className="text-lg mb-5 italic">
          Process: 1) Must be taken from a person who has achieved the goal
          state,
          <br />
          2) Process must be verified by at least 5 successful persons,
          <br />
          Then put your soul to follow that process, you will reach the goal
          state.
        </p>
        <footer className="text-right text-sm text-gray-500">
          - Mangesh Vispute
        </footer>
      </blockquote>
    </div>
  );
}

export default About;
