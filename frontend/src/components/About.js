import React from "react";
import {
  FaRocket,
  FaMap,
  FaChalkboardTeacher,
  FaChartLine,
  FaBullseye,
  FaStar,
} from "react-icons/fa";
import "../CustomCss/About.css"; // You can create a CSS file for styling

const About = () => {
  return (
    <div className="about-page">
      <header>
        <h1>
          <span style={{ color: "#DC143C" }}>
            <strong> TaskDailyPro: Your Path to Efficient Success !!</strong>
          </span>
        </h1>
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
          alt=""
          width={"400"}
        />
      </header>
      <img
        src="https://www.bing.com/images/search?view=detailV2&ccid=iAhcp6m%2f&id=D03C14D022524F9A4B82EB0511A801A22E82BF84&thid=OIP.iAhcp6m_91O-ClK79h8EQQHaFj&mediaurl=https%3a%2f%2fwonderfulengineering.com%2fwp-content%2fuploads%2f2014%2f10%2fimage-wallpaper-15.jpg&exph=1200&expw=1600&q=image&simid=608021233500824805&FORM=IRPRST&ck=7801324825C266999472762AEE3B00ED&selectedIndex=1&itb=0"
        alt=""
      />

      <section className="core-thought-process" style={{ marginTop: "30px" }}>
        <h2>
          <FaMap />{" "}
          <span style={{ color: "green" }}>
            Core Thought Process: Navigating the Path to Success
          </span>
        </h2>
        <p style={{ marginLeft: "20px" }}>
          The fundamental philosophy embedded in TaskDailyPro is the
          understanding that reaching a goal becomes attainable when we
          comprehend the process involved. Just like a goal is the final
          destination, we cannot reach it without traversing the correct path.
        </p>
      </section>

      <section className="knowing-the-path">
        <h2>
          <FaBullseye />{" "}
          <span style={{ color: "green" }}>
            Knowing the Path Before the Journey
          </span>
        </h2>
        <p style={{ marginLeft: "20px" }}>
          Prior to embarking on any journey, it is essential to have a clear
          understanding of the path to be followed. TaskDailyPro emphasizes the
          importance of knowing the route before starting, ensuring a smoother
          journey towards your goals.
        </p>
      </section>

      <section className="choosing-the-right-mentor">
        <h2>
          <FaChalkboardTeacher />{" "}
          <span style={{ color: "green" }}>
            Choosing the Right Mentor: Key to Success
          </span>
        </h2>
        <p style={{ marginLeft: "20px" }}>
          Identifying the right path becomes more effective when guided by the
          right person. In TaskDailyPro, the emphasis is on connecting with
          mentors – individuals who have successfully reached the destination
          you aspire to reach. These mentors act as guides, providing valuable
          insights and expertise.
        </p>
      </section>

      <section className="mentors">
        <h2>
          <FaStar />{" "}
          <span style={{ color: "green" }}>Mentors: Navigators of Success</span>
        </h2>
        <p style={{ marginLeft: "20px" }}>
          Mentors within the app are individuals who have traversed the same
          path, successfully reaching their goals. Their experiences serve as a
          beacon for users, offering a blueprint to follow and ensuring a
          well-informed journey.
        </p>
      </section>

      <section className="process-management">
        <h2>
          <FaChartLine />{" "}
          <span style={{ color: "green" }}>
            Process Management and Tracking
          </span>
        </h2>
        <p style={{ marginLeft: "20px" }}>
          TaskDailyPro assists users in managing and tracking their progress
          along the chosen path. The app facilitates a systematic approach,
          ensuring users stay on course and make informed decisions throughout
          their journey.
        </p>
      </section>

      <section className="goal-setting">
        <h2>
          <FaBullseye />{" "}
          <span style={{ color: "green" }}> Goal Setting Made Easy</span>
        </h2>
        <p style={{ marginLeft: "20px" }}>
          Setting goals is the foundation of success. TaskDailyPro empowers
          users to set clear goals and systematically break them down into
          daily, monthly, and yearly tasks. Following the principle of "divide
          and rule," users can efficiently manage their objectives.
        </p>
      </section>

      <footer style={{ marginTop: "30px" }}>
        <strong style={{ color: "blue " }}>
          <strong>TaskDailyPro</strong> is not just an app it's a holistic
          approach to success, guiding users through the journey with a{" "}
          <u>clear roadmap</u>, the <u>right mentors</u> , and effective{" "}
          <u>goal management.</u>
        </strong>
      </footer>
    </div>
  );
};

export default About;
