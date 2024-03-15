import { FC } from "react";

interface AboutProps {}

const About: FC<AboutProps> = ({}) => {
  return (
    <section className="bg-gray-100 py-40 relative ">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-4xl font-semibold text-gray-800 mb-12">
            About AiWizard
          </h2>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="md:w-3/5 mb-8 mx-4 text-center ">
            <p className="text-gray-500 text-xl leading-relaxed ">
              Welcome to AiWizard, your trusted partner in creating personalized
              and thoughtful gifts using the power of artificial intelligence.
            </p>
            <p className="text-gray-500 text-xl leading-relaxed mt-7">
              Our mission is to revolutionize the art of gifting, making it
              effortless and meaningful. With AIWizard, you can craft unique and
              memorable gifts that will leave a lasting impression on your loved
              ones.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
