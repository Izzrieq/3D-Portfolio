import { ValidationError, useForm } from "@formspree/react";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { currentProjectAtom, projects } from "./Projects";
import React, { useState, useEffect } from 'react';
import { useSpring, animated } from "react-spring";

const Section = (props) => {
  const { children, mobileTop, height } = props;

  const sectionStyle = {
    height: height || "100vh", // You can adjust the default height here
  };

  return (
    <motion.section
      className={`
        h-screen w-screen p-8 max-w-screen-2xl mx-auto
        flex flex-col items-start
        ${mobileTop ? "justify-start md:justify-center" : "justify-center"}
      `}
      style={sectionStyle}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.6,
        },
      }}
    >
      {children}
    </motion.section>
  );
};

export const Interface = (props) => {
  const { setSection } = props;
  return (
    <div className="flex flex-col w-screen">
      <AboutSection setSection={setSection} />
      <div className="flex w-full justify-between">
        <div className="w-1/2">
          <SkillsSection />
        </div>
        <div className="w-1/2 flex justify-end"> {/* Updated line to align the content to the right */}
          <ExperienceSection />
        </div>
      </div>
      <ProjectsSection />
      <ContactSection />
    </div>
  );
};

//hero 
const AboutSection = (props) => {
  const { setSection } = props;
  const [displayText, setDisplayText] = useState('');
  const texts = ["I build design mockups", "I build web interfaces", "I build system applications"];
  const [textIndex, setTextIndex] = useState(0);
  const currentText = texts[textIndex];

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayText((prevDisplayText) => {
        if (prevDisplayText === currentText) {
          clearInterval(interval);
          setTimeout(() => {
            setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
          }, 200);
          return prevDisplayText;
        } else {
          currentIndex++;
          return currentText.substring(0, currentIndex);
        }
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentText, textIndex, texts.length]);

  const textStyle = {
    fontFamily: 'Arial, sans-serif', // Customize the font here
    fontSize: '1.5em', // Adjust the font size // Change the text color if needed
    color: '#FF5F1F',
    // Add any additional text styles here
  };

  return (
    <Section mobileTop>
      <h1 className="text-4xl md:text-6xl font-extrabold leading-snug mt-8 md:mt-0 text-white">
        Hi, I'm
        <br />
        <span className="text-white px-1 italic">Niko</span>
      </h1>
      <motion.p
        className="text-lg text-gray-600 mt-4"
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 1.5,
        }}
      >
        <div style={textStyle}>
    <span className="italic text-white-900">
      {texts[textIndex]}
      </span>
    </div>
      </motion.p>
      <motion.button
        onClick={() => setSection(3)}
        className={`text-orange-600 hover:text-white border border-orange-600 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-600 font-medium rounded-lg text-xl px-8 py-4 mt-16 text-center mr-2 mb-2 dark:border-orange-600 dark:text-orange-600 dark:hover:text-white dark:hover:bg-orange-600 dark:focus:ring-orange-600`}
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 2,
        }}
      >
        Contact me
      </motion.button>
    </Section>
  );
};

//skill
const skills = [
  {
    title: "Javascript",
    level: 60,
  },
  {
    title: "React / React Native",
    level: 40,
  },
  {
    title: "PHP",
    level: 90,
  },
  {
    title: "Java",
    level: 50,
  },
  {
    title: "Ui/Ux",
    level: 50,
  },
];

//language
const languages = [
  {
    title: "English",
    level: 70,
  },
  {
    title: "Malay",
    level: 90,
  },
];

//skills
const SkillsSection = () => {
  return (
    <Section>
      <motion.div whileInView={"visible"}>
        <h2 className="text-3xl md:text-5xl font-bold text-white">Skills</h2>
        <div className="mt-8 space-y-4">
          {skills.map((skill, index) => (
            <div className="w-64 md:w-64" key={index}>
              <motion.h3
                className="text-lg md:text-xl font-bold text-gray-100"
                initial={{
                  opacity: 0,
                }}
                variants={{
                  visible: {
                    opacity: 1,
                    transition: {
                      duration: 1,
                      delay: 1 + index * 0.2,
                    },
                  },
                }}
              >
                {skill.title}
              </motion.h3>
              <div className="h-2 w-full bg-slate-500 rounded-full mt-2">
                <motion.div
                  className="h-full bg-orange-600 rounded-full "
                  style={{ width: `${skill.level}%` }}
                  initial={{
                    scaleX: 0,
                    originX: 0,
                  }}
                  variants={{
                    visible: {
                      scaleX: 1,
                      transition: {
                        duration: 1,
                        delay: 1 + index * 0.2,
                      },
                    },
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mt-10 text-white">
            Languages
          </h2>
          <div className="mt-8 space-y-4">
            {languages.map((lng, index) => (
              <div className="w-full md:w-64" key={index}>
                <motion.h3
                  className="text-lg md:text-xl font-bold text-gray-100"
                  initial={{
                    opacity: 0,
                  }}
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 1,
                        delay: 2 + index * 0.2,
                      },
                    },
                  }}
                >
                  {lng.title}
                </motion.h3>
                <div className="h-2 w-full bg-slate-500 rounded-full mt-2">
                  <motion.div
                    className="h-full bg-orange-600 rounded-full "
                    style={{ width: `${lng.level}%` }}
                    initial={{
                      scaleX: 0,
                      originX: 0,
                    }}
                    variants={{
                      visible: {
                        scaleX: 1,
                        transition: {
                          duration: 1,
                          delay: 2 + index * 0.2,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
};
const ExperienceSection = () => {
  const education = [
    {
      company: "Certificate Industrial Training Institute Kuala Langat",
      role: "Teknologi Pembangunan Aplikasi Web",
      duration: "2021 - 2023",
    },
    {
      company: "SMK SEKSYEN 9 Shah Alam",
      role: "Computer Science",
      duration: "2013-2020",
    },
  ];

  return (
    <div className="w-72 flex justify-end"> {/* Updated line to align the content to the right */}
      <Section>
        <h2 className="text-5xl font-bold text-white mr-3">Education</h2>
        <div className="mt-8 space-y-4">
          {education.map((experience, index) => (
            <div key={index}>
              <h3 className="text-xl text-gray-200">{experience.company}</h3>
              <p className="text-lg text-gray-400">
                {experience.role} <br></br>
                {experience.duration}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);

  const nextProject = () => {
    setCurrentProject((currentProject + 1) % projects.length);
  };

  const previousProject = () => {
    setCurrentProject((currentProject - 1 + projects.length) % projects.length);
  };

  const [achievements, setAchievements] = useState(15);
  const [honorsAndAwards, setHonorsAndAwards] = useState(3);
  const [yearsOfExperience, setYearsOfExperience] = useState(7);

  const props = useSpring({ opacity: 1, from: { opacity: 0 } });

  

  return (
    <Section>
      <div className="flex w-full gap-8 items-center justify-center mt-10 mb-10">
        <button
          className="text-orange-600 mt-10 mb-10 hover:text-slate-400 transition-colors"
          onClick={previousProject}
        >
          ← Previous
        </button>
        <h2 className="text-3xl md:text-5xl font-bold text-orange-600 mt-10 mb-10">Projects</h2>
        <button
          className="text-orange-600 mt-10 mb-10 hover:text-slate-400 transition-colors"
          onClick={nextProject}
        >
          Next →
        </button>
      </div>
      <div className="w-full flex items-center justify-center mt-20">
        <video autoPlay controls loop style={{ width: "45%", height: "auto", marginTop: "90px", border: "1px solid black", borderRadius: "20px" }}>
          <source src="/projects/video.mp4" type="video/mp4" />
        </video>
      </div>
      <animated.div style={props} className="flex w-full items-center justify-center py-10">
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <div style={{ margin: "0 10px" }}>
            <p style={{ fontSize: "35px", color: "#FF5F1F" }}>{achievements}+ <span className="text-slate-300 text-xl">Achievements</span></p>
          </div>
          <div style={{ margin: "0 10px" }}>
            <p style={{ fontSize: "35px", color: "#FF5F1F" }}>{honorsAndAwards}+ <span className="text-slate-300 text-xl">Honors and Awards</span></p>
          </div>
          <div style={{ margin: "0 10px" }}>
            <p style={{ fontSize: "35px", color: "#FF5F1F" }}>{yearsOfExperience}+ <span className="text-slate-300 text-xl">Years of Experience</span></p>
          </div>
        </div>
      </animated.div>
    </Section>
  );
};

const ContactSection = () => {
  const [state, handleSubmit] = useForm("xpzgkggo");
  return (
    <Section>
      <h2 className="text-3xl text-white md:text-5xl font-bold">Contact me</h2>
      <div className="mt-8 p-8 rounded-md bg-white bg-opacity-50 w-96 max-w-full">
        {state.succeeded ? (
          <p className="text-gray-900 text-center">Thanks for your message !</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label for="name" className="font-medium text-gray-900 block mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
            />
            <label
              for="email"
              className="font-medium text-gray-900 block mb-1 mt-8"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
            />
            <ValidationError
              className="mt-1 text-red-500"
              prefix="Email"
              field="email"
              errors={state.errors}
            />
            <label
              for="email"
              className="font-medium text-gray-900 block mb-1 mt-8"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              className="h-32 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
            />
            <ValidationError
              className="mt-1 text-red-500"
              errors={state.errors}
            />
            <button
              disabled={state.submitting}
              className="bg-orange-600 text-white py-4 px-8 rounded-lg font-bold text-lg mt-16 "
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </Section>
  );
};
