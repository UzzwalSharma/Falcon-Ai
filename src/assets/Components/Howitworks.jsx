import PropTypes from "prop-types";
import { motion } from "framer-motion";
import "./How.css";

const cardVariants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const hue = (h) => `hsl(${h}, 100%, 50%)`;

function Card({ emoji, title, description, hueA, hueB }) {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

  return (
    <motion.div
      className="card-container"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: false, amount: 0.8 }}
    >
      <div className="splash" style={{ background }} />
      <motion.div className="card" variants={cardVariants}>
        <div className="emoji">{emoji}</div>
        <h3 className="title">{title}</h3>
        <p className="description">{description}</p>
      </motion.div>
    </motion.div>
  );
}

Card.propTypes = {
  emoji: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  hueA: PropTypes.number.isRequired,
  hueB: PropTypes.number.isRequired,
};


const steps = [
  { emoji: "📝", title: "Step 1", description: "Create an Account", hueA: 340, hueB: 10 },
  { emoji: "🔍", title: "Step 2", description: "Choose a Template", hueA: 20, hueB: 40 },
  { emoji: "💡", title: "Step 3", description: "Review and Optimize", hueA: 60, hueB: 90 },
  { emoji: "🚀", title: "Step 4", description: "Download and Share", hueA: 80, hueB: 120 },
];

export default function Howitworks() {
    return (
      <section className="how-it-works-section">
        <h1 className="section-title">That's how Falcon works</h1>
        {steps.map(({ emoji, title, description, hueA, hueB }) => (
          <Card
            key={title}
            emoji={emoji}
            title={title}
            description={description}
            hueA={hueA}
            hueB={hueB}
          />
        ))}
      </section>
    );
  }
  
