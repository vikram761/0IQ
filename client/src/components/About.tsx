import { FC } from "react";

interface AboutProps {}

const About: FC<AboutProps> = ({}) => {
  return (
    <section className="bg-gray-100 py-40 relative ">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-4xl font-semibold text-gray-800 mb-12">
            About Grader 
          </h2>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="md:w-3/5 mb-8 mx-4 text-center ">
            <p className="text-gray-500 text-xl leading-relaxed ">
            We envision a future where learning is engaging, interactive, and tailored to individual needs. By leveraging artificial intelligence and modern educational techniques, we aim to empower students to excel in their academic pursuits.
            </p>
            <p className="text-gray-500 text-xl leading-relaxed mt-7">
            Our platform use AI to produce a wide range of questions for any subject, while also allowing teachers to customize content. Our AI system allows students to answer questions and receive fast feedback, which helps them understand their own strengths and flaws. 
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
