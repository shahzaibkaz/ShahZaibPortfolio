import React, { memo, useState, useEffect } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { GITHUB_URL, LINKEDIN_URL, PERPLEXITY_URL } from "../constants/index";
import { useSpring, animated, config } from "react-spring";
import { SiPerplexity } from "react-icons/si";
import { pics } from "../assets/assets";

const Anchor = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="mx-2 text-darkDesert hover:text-goldDesert transition-colors duration-300"
    aria-label={`Link to ${href}`}
  >
    {children}
  </a>
);

const About = () => {
  // Fade-in effect
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: config.slow,
  });

  // Springy effect on image hover
  const [scale, setScale] = useState(1);
  const springProps = useSpring({
    transform: `scale(${scale})`,
    config: config.wobbly,
  });

  // Slide-up effect
  const slideUp = useSpring({
    transform: "translate3d(0,0px,0)",
    from: { transform: "translate3d(0,40px,0)" },
    delay: 200,
  });

  return (
    <animated.div
      style={fadeIn}
      id="about"
      className="container mx-auto flex flex-col items-center justify-center bg-lightDesert min-h-screen"
    >
      <animated.img
        style={{ ...springProps }}
        src={pics.pic}
        alt="Shah Zaib"
        className="rounded-full w-64 h-64 border-4 border-darkDesert object-cover mb-8 mt-20"
        onMouseEnter={() => setScale(1.1)}
        onMouseLeave={() => setScale(1)}
      />
      <animated.div style={slideUp}>
        <h1 className="text-4xl font-bold text-darkDesert mb-4 text-center px-8">
          Shah Zaib
        </h1>
        <p className="text-lg text-darkDesert mb-4 text-center px-8">
        I am a passionate and skilled front-end developer with expertise in building dynamic, responsive, and user-friendly web applications. I specialize in using modern technologies like ReactJS, Bootstrap, HTML, CSS, and Tailwind CSS to create seamless and interactive user interfaces.


        </p>
        <p className="text-lg text-darkDesert mb-4 text-center px-8">
        With a strong focus on responsive design, I ensure that every project I work on is optimized for a flawless experience across all devices, from desktops to smartphones. My proficiency in ReactJS allows me to build reusable components and efficient single-page applications, while my experience with CSS frameworks like Bootstrap and Tailwind CSS ensures fast development and consistent designs.
        </p>
        <p className="text-lg text-darkDesert mb-4 text-center px-8">
        I am dedicated to delivering clean, maintainable code and intuitive user experiences, continuously exploring new tools and techniques to stay at the forefront of front-end development.
          </p>
        <div className="flex justify-center items-center pb-8">
          <Anchor href={'https://github.com/ShahZaib151214'}>
            <FaGithub size={32} />
          </Anchor>
          <Anchor href={'https://www.linkedin.com/in/shah-zaib-kazmi-08914a282'}>
            <FaLinkedin size={32} />
          </Anchor>
          {/* <Anchor href={PERPLEXITY_URL}>
            <SiPerplexity size={32} />
          </Anchor> */}
        </div>
        <div>
        </div>
      </animated.div>
    </animated.div>
  );
};

export default memo(About);
