import React from "react";
import img from "../note-taking.jpg"
const About = () => {
  return (
    <>
      <div className="d-flex flex-column  m-5 p-3 justify-content-center align-items-center">
        <div>
          <h1 className="text-center fw-bold  py-3 my-5">
            The Biggest Benefits of Effective Note-taking
          </h1>
          <div className="py-3">
            <h5>
              Note-taking is one of the most important things to become a
              successful student. For some students, note-taking is an outdated
              concept, but its importance in effective learning cannot be
              ignored. Various researchers found that if students note in
              important information, it had 34% chance of being remembered. On
              the other hand, information not found in notes had only 5% chance
              of being remembered. Note-taking provides a number of benefits
              beyond that record of what was taught in the classroom. So, here
              are some benefits of making effective notes in a classroom:
            </h5>
            <h5>
              1. It Keeps you alert When you are taking notes, your body becomes
              active and involved and it helps you to avoid feelings of
              distractions or drowsiness. Listening carefully and deciding what
              to comprise in notes keeps your mind active and involved with what
              you hear.
            </h5>
            <h5>
              2. It Organizes and Emphasizes Information When you take notes,
              you will decide on and focus the main ideas you listen detecting
              the structure of the classroom. Making effective notes will enable
              to specify the secondary points of a presentation, review, and
              understanding easily after class. These notes also make it easier
              to associate classroom learning to book reading.
            </h5>
            <h5>
              3. It Improves Learning Effective note-taking improves your
              learning abilities. By taking effective notes, students are
              actively engaged in the learning procedure thus giving it a
              determination and improving learning productivity.
            </h5>
          </div>
        </div>
        <div>
          <img className="fluid" src={img} alt="" />
        </div>
      </div>
    </>
  );
};

export default About;
