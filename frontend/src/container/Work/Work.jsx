/* eslint-disable new-cap */
import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";

import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./Work.scss";

const Work = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  useEffect(() => {
    const query = "*[_type ==  'works']";
    client.fetch(query).then((data) => {
      setWorks(data);
      setFilterWork(data);
    });
  }, []);

  const handleWorkFilter = (item) => {
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === "All") {
        setFilterWork(works);
      } else {
        setFilterWork(works.filter((work) => work.tags.includes(item)));
        setActiveFilter(item);
      }
    }, 500);
  };

  const [opacity, setOpacity] = useState(0);

  const handleHover = () => {
    setOpacity(opacity === 0 ? 1 : 0);
  };

  return (
    <>
      <h2 className="head-text">
        My creative
        <span> Portfolio </span>
        Section
      </h2>

      <div className="app__work-filter">
        {["Full Stack", "Web App", "MERN", "React Js", "All"].map(
          (item, index) => {
            return (
              <div
                key={index}
                onClick={() => handleWorkFilter(item)}
                className={`app__work-filter-item app__flex p-text ${activeFilter === item ? "item-active" : ""
                  }`}
              >
                {item}
              </div>
            );
          }
        )}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filterWork.map((work, index) => {
          return (
            <div className="app__work-item app__flex" key={index}>
              <div className="app__work-img app__flex">
                <img src={urlFor(work.imgUrl)} alt={work.name} />
                <motion.div
                  // whileHover={{ opacity: [0, 1] }}
                  whileHover={{ opacity: opacity }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                    staggerChildren: 0.5,
                  }}
                  className="app__work-hover app__flex"
                  onMouseEnter={handleHover}
                  onMouseLeave={handleHover}
                >
                  {work.projectLink && (
                    <a href={work.projectLink} target="_blank" rel="noreferrer">
                      <motion.div
                        whileInView={{ scale: [0, 1] }}
                        whileHover={{ scale: [1, 0.9] }}
                        transition={{
                          duration: 0.25,
                        }}
                        className="app__flex"
                      >
                        <AiFillEye color="#fff" />
                      </motion.div>
                    </a>
                  )}
                  <a href={work.codeLink} target="_blank" rel="noreferrer">
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, 0.9] }}
                      transition={{
                        duration: 0.25,
                      }}
                      className="app__flex"
                    >
                      <AiFillGithub color="fff" />
                    </motion.div>
                  </a>
                </motion.div>
              </div>
              <div className="app__work-content app__flex">
                <h4 className="bold-text">{work.title}</h4>
                <p className="p-text" style={{ marginTop: 10 }}>
                  {work.description}
                </p>

                <div className="app__work-tag app__flex">
                  <p className="p-text"> {work.tags[0]}</p>
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </>
  );
};

export default AppWrap(MotionWrap(Work, "app__works"), "work");