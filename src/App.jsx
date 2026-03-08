import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const QUIZ_SCORE_TARGET = 10000;
const QUESTION_TIME_LIMIT = 60;
const AUTO_REVEAL_AFTER = 120;
const QUESTIONS_PER_REALM = ;

function useWhiteNoise(enabled = true, volume = 0.016) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return undefined;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return undefined;

    let ctx;
    let source;

    const start = async () => {
      try {
        ctx = new AudioCtx();
        const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i += 1) data[i] = (Math.random() * 2 - 1) * 0.42;

        source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;

        const lowpass = ctx.createBiquadFilter();
        lowpass.type = "lowpass";
        lowpass.frequency.value = 1300;

        const gain = ctx.createGain();
        gain.gain.value = volume;

        source.connect(lowpass);
        lowpass.connect(gain);
        gain.connect(ctx.destination);
        source.start(0);

        const resume = async () => {
          try {
            await ctx.resume();
          } catch {}
        };
        window.addEventListener("pointerdown", resume, { once: true });
        window.addEventListener("keydown", resume, { once: true });
      } catch {}
    };

    start();
    return () => {
      try { if (source) source.stop(); } catch {}
      try { if (ctx) ctx.close(); } catch {}
    };
  }, [enabled, volume]);
}

const CALM_REALMS = [
  { name: "Kinematics", code: "KI", description: "Frames, FK/IK, Jacobians and singularities.", palette: "from-emerald-400 to-teal-500" },
  { name: "Control", code: "CT", description: "PID, pole intuition, stability and state-space basics.", palette: "from-teal-400 to-cyan-500" },
  { name: "SLAM & Estimation", code: "SE", description: "Kalman filtering, uncertainty, loop closure and observability.", palette: "from-cyan-400 to-sky-500" },
  { name: "Dynamics", code: "DY", description: "Mass matrix, Coriolis terms, rigid-body motion and energy.", palette: "from-sky-400 to-blue-500" },
  { name: "Perception", code: "PV", description: "Calibration, stereo, projection and features.", palette: "from-blue-400 to-indigo-500" },
  { name: "Machine Learning", code: "ML", description: "Generalization, bias-variance and learning for robotics.", palette: "from-indigo-400 to-violet-500" },
  { name: "Linear Algebra", code: "LA", description: "Rank, eigenvalues, transformations and vector spaces.", palette: "from-violet-400 to-purple-500" },
  { name: "Probability", code: "PR", description: "Bayes rule, expectation, variance and uncertainty reasoning.", palette: "from-purple-400 to-fuchsia-500" },
  { name: "Manipulators", code: "MN", description: "Workspace, dexterity, force mapping and grasp basics.", palette: "from-fuchsia-400 to-pink-500" },
  { name: "Computation", code: "CP", description: "Latency, throughput, CPU/GPU and real-time scheduling.", palette: "from-pink-400 to-rose-500" },
];

const COMPETITIVE_REALMS = [
  { name: "Numerical Optimization", code: "NO", description: "Convexity, KKT, conditioning and trajectory optimization.", palette: "from-sky-400 via-cyan-400 to-blue-500" },
  { name: "Reinforcement Learning", code: "RL", description: "Bellman equations, exploration and sim-to-real issues.", palette: "from-cyan-400 via-sky-400 to-blue-500" },
  { name: "Foundation Models", code: "FM", description: "Grounding, multimodal alignment and embodied reasoning.", palette: "from-blue-400 via-sky-400 to-cyan-500" },
  { name: "Aerial Robotics", code: "AR", description: "Quadrotor dynamics, attitude loops and estimation drift.", palette: "from-sky-500 via-blue-500 to-cyan-500" },
  { name: "Underwater Robotics", code: "UR", description: "Hydrodynamics, acoustic links and GPS-denied navigation.", palette: "from-cyan-500 via-blue-500 to-sky-600" },
  { name: "Autonomous Driving", code: "AV", description: "Prediction, planning, safety envelopes and edge cases.", palette: "from-blue-500 via-cyan-500 to-sky-500" },
  { name: "Legged Locomotion", code: "LL", description: "Contact timing, ZMP, gait stability and state estimation.", palette: "from-sky-400 via-blue-500 to-cyan-400" },
  { name: "Motion Planning", code: "MP", description: "A*, RRT, kinodynamic planning and completeness.", palette: "from-blue-500 via-sky-500 to-cyan-500" },
  { name: "ROS2", code: "R2", description: "QoS, executors, tf2 and lifecycle nodes.", palette: "from-cyan-400 via-sky-500 to-blue-500" },
  { name: "Cloud Deployment of Robotics", code: "CL", description: "Containers, orchestration, observability and OTA safety.", palette: "from-sky-400 via-cyan-400 to-blue-600" },
  { name: "Robot Communication", code: "RC", description: "RF links, TCP/UDP, middleware and latency tradeoffs.", palette: "from-cyan-500 via-blue-500 to-sky-500" },
  { name: "Space Robotics", code: "SR", description: "Orbital dynamics, communication delay and radiation tolerance.", palette: "from-blue-400 via-cyan-500 to-sky-600" },
  { name: "Assistive Robotics", code: "AS", description: "Biomechanics, compliance, intent estimation and safety.", palette: "from-sky-400 via-blue-500 to-cyan-400" },
  { name: "Industrial Robotics", code: "IR", description: "Repeatability, cycle time, PLC integration and safety cells.", palette: "from-cyan-400 via-sky-500 to-blue-600" },
  { name: "CAD for Robotics", code: "CD", description: "Tolerance stack-up, assemblies and manufacturability.", palette: "from-blue-400 via-sky-400 to-cyan-500" },
  { name: "Power Systems for Robotics", code: "PW", description: "Batteries, converters, peak load and thermal derating.", palette: "from-cyan-400 via-blue-500 to-sky-600" },
  { name: "Deep Learning for Robotics", code: "DL", description: "Representation learning, dataset shift and closed-loop evaluation.", palette: "from-sky-500 via-cyan-500 to-blue-500" },
  { name: "Sensors", code: "SN", description: "Noise density, bias drift, calibration and fusion limits.", palette: "from-blue-500 via-cyan-400 to-sky-500" },
  { name: "Actuators for Robotics", code: "AC", description: "Torque bandwidth, backlash, compliance and efficiency.", palette: "from-cyan-500 via-sky-500 to-blue-600" },
  { name: "Robotic Dexterity", code: "DX", description: "Tactile sensing, in-hand manipulation and contact stability.", palette: "from-sky-400 via-cyan-500 to-blue-500" },
];

function q(id, realm, mode, difficulty, points, prompt, options, answer, hint, explain, example) {
  return { id, realm, mode, difficulty, points, prompt, options, answer, hint, explain, example };
}

const CALM_TEMPLATES = [
  {
    difficulty: "Easy", points: 10,
    prompt: (r) => `For a serial manipulator, what does the Jacobian physically represent in ${r.name}?`,
    options: () => [
      "The linear mapping between joint velocities and end‑effector spatial velocity (twist).",
      "The matrix used only for rendering robot links in simulation.",
      "A table containing calibration parameters for motors.",
      "The gradient of electrical power consumption."
    ],
    answer: 0,
    hint: () => `Think differential kinematics.` ,
    explain: () => `The manipulator Jacobian maps joint velocity vector q̇ to the end‑effector spatial velocity V = J(q)q̇. This concept appears in almost every robotics interview when discussing singularities, velocity control and force mapping.` ,
    example: () => `Interviewers often ask how the Jacobian changes near singular configurations.`
  },
  {
    difficulty: "Easy", points: 10,
    prompt: (r) => `Why are coordinate frames essential in ${r.name}?`,
    options: () => [
      "They allow consistent mathematical description of positions, orientations and transformations between robot components.",
      "They reduce CPU usage in robot programs.",
      "They remove the need for calibration.",
      "They only exist for visualization purposes."
    ],
    answer: 0,
    hint: () => `Robotics relies on rigid‑body transformations.` ,
    explain: () => `Robotic systems reason about motion using homogeneous transformations between coordinate frames. Frame consistency is crucial when combining sensors, kinematics and control.` ,
    example: () => `A common interview question asks how camera and robot base frames are related.`
  },
  {
    difficulty: "Medium", points: 12,
    prompt: (r) => `In estimation theory, why is observability important for ${r.name}?`,
    options: () => [
      "It determines whether system states can be uniquely inferred from available measurements.",
      "It measures the computational cost of the estimator.",
      "It ensures the robot never experiences noise.",
      "It guarantees stability of the control law."
    ],
    answer: 0,
    hint: () => `Think about reconstructing hidden states.` ,
    explain: () => `Observability determines whether the internal state of a system can be reconstructed from outputs. In robotics it determines whether localization or state estimation is mathematically possible.` ,
    example: () => `SLAM interviews often ask when a robot pose becomes unobservable.`
  },
  {
    difficulty: "Medium", points: 12,
    prompt: (r) => `Why do control engineers analyze closed‑loop stability?`,
    options: () => [
      "To ensure feedback causes system trajectories to converge rather than diverge.",
      "To reduce sensor noise to zero.",
      "To eliminate system dynamics.",
      "To simplify robot mechanical design."
    ],
    answer: 0,
    hint: () => `Feedback changes system dynamics.` ,
    explain: () => `Closed‑loop stability determines whether the system response remains bounded and converges to the desired equilibrium or trajectory.` ,
    example: () => `Interviewers often ask how pole placement affects stability margins.`
  },
  {
    difficulty: "Medium", points: 13,
    prompt: () => `Why are probabilistic models widely used in robotics?`,
    options: () => [
      "Because sensors and environments introduce uncertainty that must be modeled statistically.",
      "Because deterministic algorithms cannot run on robots.",
      "Because probability eliminates all errors.",
      "Because it simplifies mechanical design."
    ],
    answer: 0,
    hint: () => `Think uncertainty.` ,
    explain: () => `Robots must reason under uncertainty due to sensor noise, imperfect models and dynamic environments. Probabilistic methods such as Bayesian filtering address this.` ,
    example: () => `A typical question asks how the Kalman filter combines prediction and measurement.`
  },
  {
    difficulty: "Hard", points: 14,
    prompt: () => `What is the key idea behind the Kalman filter update step?`,
    options: () => [
      "Combining prior prediction with measurement information weighted by uncertainty.",
      "Replacing the prediction entirely with the measurement.",
      "Ignoring sensor noise.",
      "Resetting state estimates every timestep."
    ],
    answer: 0,
    hint: () => `Look for optimal fusion.` ,
    explain: () => `The Kalman gain determines how much the estimate should move toward the measurement depending on uncertainty.` ,
    example: () => `Interviews often ask how increasing measurement noise changes the gain.`
  },
  {
    difficulty: "Hard", points: 14,
    prompt: () => `Why do singularities create problems in robot manipulators?`,
    options: () => [
      "Because the Jacobian loses rank, causing loss of motion capability or infinite joint velocities.",
      "Because motors stop functioning.",
      "Because the robot loses calibration permanently.",
      "Because sensors fail simultaneously."
    ],
    answer: 0,
    hint: () => `Rank deficiency.` ,
    explain: () => `At singular configurations the Jacobian becomes rank deficient, meaning certain task‑space motions cannot be produced.` ,
    example: () => `This commonly occurs when a robotic arm fully stretches.`
  },
  {
    difficulty: "Hard", points: 15,
    prompt: () => `Why is real‑time computation critical for robotics control loops?`,
    options: () => [
      "Because delayed control signals can destabilize feedback systems.",
      "Because robots cannot operate without GPUs.",
      "Because real‑time computing eliminates sensor noise.",
      "Because it simplifies motion planning."
    ],
    answer: 0,
    hint: () => `Think control latency.` ,
    explain: () => `Feedback controllers assume bounded latency; excessive delay can destabilize otherwise stable systems.` ,
    example: () => `Autonomous drones require high‑frequency control loops.`
  },
  {
    difficulty: "Hard", points: 15,
    prompt: () => `What does eigenvalue analysis reveal about a dynamic system?`,
    options: () => [
      "The stability and time evolution of system states.",
      "The color of the robot hardware.",
      "The number of sensors required.",
      "The mechanical mass distribution."
    ],
    answer: 0,
    hint: () => `Eigenvalues relate to system poles.` ,
    explain: () => `Eigenvalues of the system matrix determine whether trajectories converge, oscillate or diverge.` ,
    example: () => `Control interviews often ask how pole locations affect response speed.`
  },
  {
    difficulty: "Hard", points: 16,
    prompt: () => `Why is sensor fusion used in mobile robotics?`,
    options: () => [
      "Because combining complementary sensors improves accuracy and robustness.",
      "Because a single sensor cannot operate continuously.",
      "Because fusion reduces computation.",
      "Because it eliminates calibration entirely."
    ],
    answer: 0,
    hint: () => `Complementary information.` ,
    explain: () => `For example, IMUs provide high‑frequency motion estimates while cameras provide drift correction.` ,
    example: () => `Visual‑inertial odometry is a classic fusion example.`
  }
];

const COMPETITIVE_TEMPLATES = [
  {
    difficulty: "Starter", points: 40,
    prompt: (r) => `What is the Bellman equation fundamental to in ${r.name}?`,
    options: () => [
      "Dynamic programming and optimal control for sequential decision making.",
      "Mechanical stress analysis.",
      "Camera calibration.",
      "Motor driver electronics."
    ],
    answer: 0,
    hint: () => `Think optimal value recursion.` ,
    explain: () => `The Bellman equation expresses optimal value as immediate reward plus expected future value.` ,
    example: () => `Many RL algorithms derive directly from it.`
  },
  {
    difficulty: "Advanced", points: 48,
    prompt: () => `Why are KKT conditions important in trajectory optimization?`,
    options: () => [
      "They provide necessary conditions for optimality in constrained optimization problems.",
      "They determine sensor placement.",
      "They compute robot kinematics.",
      "They stabilize control loops automatically."
    ],
    answer: 0,
    hint: () => `Optimization theory.` ,
    explain: () => `Karush‑Kuhn‑Tucker conditions generalize Lagrange multipliers to inequality constraints.` ,
    example: () => `Used in trajectory optimization and MPC.`
  },
  {
    difficulty: "Advanced", points: 50,
    prompt: () => `Why does sim‑to‑real transfer often fail in robotics learning systems?`,
    options: () => [
      "Because real environments differ from simulation in dynamics, sensing and noise distributions.",
      "Because robots cannot run neural networks.",
      "Because simulations are always deterministic.",
      "Because sensors do not work in reality."
    ],
    answer: 0,
    hint: () => `Domain gap.` ,
    explain: () => `Differences in friction, delay, noise and perception cause policies trained in simulation to fail in reality.` ,
    example: () => `Domain randomization is often used to mitigate this.`
  },
  {
    difficulty: "Research", points: 60,
    prompt: () => `Why is probabilistic completeness important for sampling‑based planners like RRT?`,
    options: () => [
      "It guarantees that a solution will be found with probability approaching one as samples increase.",
      "It guarantees the shortest path.",
      "It removes collision checking.",
      "It eliminates dynamics constraints."
    ],
    answer: 0,
    hint: () => `Probability of success.` ,
    explain: () => `Sampling‑based planners rely on increasing coverage of the state space.` ,
    example: () => `This property distinguishes RRT from deterministic grid planners.`
  },
  {
    difficulty: "Expert", points: 70,
    prompt: () => `Why is latency critical in distributed robotic systems using ROS2?`,
    options: () => [
      "Because delayed messages can destabilize estimation, planning or control loops.",
      "Because ROS2 cannot handle large messages.",
      "Because DDS removes all delays.",
      "Because robots cannot run networks."
    ],
    answer: 0,
    hint: () => `Communication delay.` ,
    explain: () => `Distributed systems must manage latency and QoS settings to maintain system stability.` ,
    example: () => `QoS reliability and deadline policies are important.`
  }
];

const CALM_BLUEPRINTS = {
  "Kinematics": { termA: "forward kinematics", termB: "frame consistency", termC: "Jacobian rank", scenario: "mapping joint motion into end-effector behavior", name: "Kinematics" },
  "Control": { termA: "feedback", termB: "closed-loop stability", termC: "tracking error dynamics", scenario: "tracking a time-varying trajectory under disturbances", name: "Control" },
  "SLAM & Estimation": { termA: "Kalman gain", termB: "observability", termC: "filter consistency", scenario: "localizing while building a map under sensor uncertainty", name: "SLAM & Estimation" },
  "Dynamics": { termA: "mass matrix", termB: "velocity coupling", termC: "energy consistency", scenario: "predicting motion under forces and torques", name: "Dynamics" },
  "Perception": { termA: "camera calibration", termB: "depth ambiguity", termC: "projective geometry", scenario: "inferring 3D structure from image measurements", name: "Perception" },
  "Machine Learning": { termA: "generalization", termB: "dataset bias", termC: "representation quality", scenario: "deploying a learned model beyond its training data", name: "Machine Learning" },
  "Linear Algebra": { termA: "matrix rank", termB: "eigenstructure", termC: "basis transformation", scenario: "analyzing linear mappings and robot state spaces", name: "Linear Algebra" },
  "Probability": { termA: "Bayesian inference", termB: "variance", termC: "expectation", scenario: "reasoning under uncertainty with noisy measurements", name: "Probability" },
  "Manipulators": { termA: "workspace", termB: "singularity", termC: "force mapping", scenario: "commanding a robotic arm in task space", name: "Manipulators" },
  "Computation": { termA: "latency budget", termB: "throughput", termC: "real-time scheduling", scenario: "running perception and control pipelines concurrently", name: "Computation" },
};

const COMPETITIVE_BLUEPRINTS = {
  "Numerical Optimization": { termA: "conditioning", termB: "constraint qualification", termC: "KKT structure", scenario: "trajectory optimization for a constrained robot", name: "Numerical Optimization" },
  "Reinforcement Learning": { termA: "credit assignment", termB: "distribution shift", termC: "exploration", scenario: "deploying a learned policy on real hardware", name: "Reinforcement Learning" },
  "Foundation Models": { termA: "grounding", termB: "alignment", termC: "hallucination control", scenario: "an embodied model reasoning over vision, language and action", name: "Foundation Models" },
  "Aerial Robotics": { termA: "attitude loop", termB: "state estimation drift", termC: "thrust margin", scenario: "aggressive quadrotor flight through clutter", name: "Aerial Robotics" },
  "Underwater Robotics": { termA: "hydrodynamic uncertainty", termB: "navigation drift", termC: "acoustic bandwidth", scenario: "an AUV operating in GPS-denied water", name: "Underwater Robotics" },
  "Autonomous Driving": { termA: "prediction uncertainty", termB: "tail-risk events", termC: "planner consistency", scenario: "urban autonomy under dense traffic", name: "Autonomous Driving" },
  "Legged Locomotion": { termA: "contact timing", termB: "terrain uncertainty", termC: "whole-body coordination", scenario: "a legged robot traversing uneven terrain", name: "Legged Locomotion" },
  "Motion Planning": { termA: "sampling bias", termB: "kinodynamic feasibility", termC: "probabilistic completeness", scenario: "planning motion through clutter with dynamics", name: "Motion Planning" },
  "ROS2": { termA: "QoS compatibility", termB: "executor scheduling", termC: "tf consistency", scenario: "a distributed robot software stack", name: "ROS2" },
  "Cloud Deployment of Robotics": { termA: "container isolation", termB: "fleet orchestration", termC: "OTA safety", scenario: "managing a cloud-connected robot fleet", name: "Cloud Deployment of Robotics" },
  "Robot Communication": { termA: "link budget", termB: "transport latency", termC: "packet loss semantics", scenario: "sending control and perception data across a robot network", name: "Robot Communication" },
  "Space Robotics": { termA: "communication delay", termB: "radiation tolerance", termC: "orbital dynamics", scenario: "orbital servicing or planetary autonomy", name: "Space Robotics" },
  "Assistive Robotics": { termA: "intent estimation", termB: "compliance", termC: "safety envelope", scenario: "controlling an exoskeleton around a human user", name: "Assistive Robotics" },
  "Industrial Robotics": { termA: "repeatability", termB: "cycle time", termC: "safety interlocks", scenario: "running a high-throughput robotic workcell", name: "Industrial Robotics" },
  "CAD for Robotics": { termA: "tolerance stack-up", termB: "clearance", termC: "manufacturability", scenario: "designing a robot assembly for production", name: "CAD for Robotics" },
  "Power Systems for Robotics": { termA: "internal resistance", termB: "peak load", termC: "thermal derating", scenario: "powering a mobile robot under dynamic load", name: "Power Systems for Robotics" },
  "Deep Learning for Robotics": { termA: "dataset shift", termB: "closed-loop evaluation", termC: "representation learning", scenario: "deploying a learned perception or control model", name: "Deep Learning for Robotics" },
  "Sensors": { termA: "noise density", termB: "bias drift", termC: "observability", scenario: "fusing multiple sensors for state estimation", name: "Sensors" },
  "Actuators for Robotics": { termA: "torque bandwidth", termB: "backlash", termC: "efficiency", scenario: "driving a precision robotic joint", name: "Actuators for Robotics" },
  "Robotic Dexterity": { termA: "tactile feedback", termB: "contact stability", termC: "underactuation", scenario: "in-hand manipulation with a dexterous hand", name: "Robotic Dexterity" },
};

function buildRealmQuestions(realm, mode, baseId) {
  const blueprint = mode === "calm" ? CALM_BLUEPRINTS[realm.name] : COMPETITIVE_BLUEPRINTS[realm.name];
  const templates = mode === "calm" ? CALM_TEMPLATES : COMPETITIVE_TEMPLATES;
  return templates.map((tpl, idx) =>
    q(
      baseId + idx,
      realm.name,
      mode,
      tpl.difficulty,
      tpl.points,
      tpl.prompt(blueprint),
      tpl.options(blueprint),
      tpl.answer,
      tpl.hint(blueprint),
      tpl.explain(blueprint),
      tpl.example(blueprint)
    )
  );
}

const QUESTION_BANK = [
  ...CALM_REALMS.flatMap((realm, idx) => buildRealmQuestions(realm, "calm", 1000 + idx * 100)),
  ...COMPETITIVE_REALMS.flatMap((realm, idx) => buildRealmQuestions(realm, "competitive", 5000 + idx * 100)),
];

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function shuffleQuestionOptions(question) {
  const tagged = question.options.map((option, idx) => ({ option, correct: idx === question.answer }));
  const shuffled = shuffleArray(tagged);
  return {
    ...question,
    options: shuffled.map((item) => item.option),
    answer: shuffled.findIndex((item) => item.correct),
  };
}

function normalizeQuestionsForTarget(list) {
  const total = list.reduce((sum, item) => sum + item.points, 0);
  return list.map((item) => ({
    ...item,
    scaledPoints: Math.max(1, Math.round((item.points / total) * QUIZ_SCORE_TARGET)),
  }));
}

function buildQuestionSet(mode, realmName) {
  const pool = QUESTION_BANK.filter((item) => item.mode === mode && item.realm === realmName);
  return normalizeQuestionsForTarget(shuffleArray(pool).map(shuffleQuestionOptions));
}

function Pill({ children, className = "" }) {
  return <span className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide ${className}`}>{children}</span>;
}

function Progress({ value, color, height = "h-2.5" }) {
  return (
    <div className={`w-full overflow-hidden rounded-full bg-slate-200 ${height}`}>
      <motion.div className={`h-full ${color}`} animate={{ width: `${Math.max(0, Math.min(100, value))}%` }} transition={{ duration: 0.35, ease: "easeOut" }} />
    </div>
  );
}

function StatCard({ label, value, sub, mode }) {
  const competitive = mode === "competitive";
  return (
    <div className={`rounded-2xl border p-4 ${competitive ? "border-sky-200 bg-sky-50/70" : "border-emerald-100 bg-emerald-50/70"}`}>
      <div className={`text-[11px] uppercase font-semibold ${competitive ? "text-sky-700" : "text-emerald-700"}`}>{label}</div>
      <div className="mt-1 text-2xl font-black text-slate-950">{value}</div>
      {sub ? <div className="mt-1 text-[11px] text-slate-500">{sub}</div> : null}
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("home");
  const [mode, setMode] = useState("calm");
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [search, setSearch] = useState("");
  const [currentRealm, setCurrentRealm] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [autoRevealed, setAutoRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);
  const [revealLeft, setRevealLeft] = useState(AUTO_REVEAL_AFTER);
  const revealRef = useRef(false);

  useWhiteNoise(audioEnabled, 0.016);

  const competitive = mode === "competitive";
  const realms = competitive ? COMPETITIVE_REALMS : CALM_REALMS;
  const filteredRealms = useMemo(() => {
    const needle = search.trim().toLowerCase();
    if (!needle) return realms;
    return realms.filter((realm) => `${realm.name} ${realm.description}`.toLowerCase().includes(needle));
  }, [realms, search]);

  const currentQuestion = questions[currentIndex];
  const points = currentQuestion?.scaledPoints || 0;
  const answerPercent = (timeLeft / QUESTION_TIME_LIMIT) * 100;
  const revealPercent = (revealLeft / AUTO_REVEAL_AFTER) * 100;
  const scorePercent = Math.min(100, Math.round((score / QUIZ_SCORE_TARGET) * 100));

  useEffect(() => {
    if (!currentQuestion || showAnswer) return undefined;
    revealRef.current = false;
    const timer = window.setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
      setRevealLeft((prev) => {
        if (prev <= 1 && !revealRef.current) {
          revealRef.current = true;
          setAutoRevealed(true);
          setShowAnswer(true);
          setCombo(0);
          return 0;
        }
        return prev <= 1 ? 0 : prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [currentQuestion, showAnswer]);

  useEffect(() => {
    setTimeLeft(QUESTION_TIME_LIMIT);
    setRevealLeft(AUTO_REVEAL_AFTER);
    setSelectedOption(null);
    setShowAnswer(false);
    setAutoRevealed(false);
    revealRef.current = false;
  }, [currentIndex, questions]);

  function startRealm(realm) {
    setCurrentRealm(realm);
    setQuestions(buildQuestionSet(mode, realm.name));
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setAutoRevealed(false);
    setScore(0);
    setCorrect(0);
    setCombo(0);
    setBestCombo(0);
    setView("quiz");
  }

  function chooseAnswer(idx) {
    if (!currentQuestion || showAnswer) return;
    setSelectedOption(idx);
    setShowAnswer(true);
    if (idx === currentQuestion.answer) {
      const newCombo = combo + 1;
      const bonus = Math.min(combo * 20, 200);
      setScore((prev) => Math.min(QUIZ_SCORE_TARGET, prev + points + bonus));
      setCorrect((prev) => prev + 1);
      setCombo(newCombo);
      setBestCombo((prev) => Math.max(prev, newCombo));
    } else {
      setCombo(0);
    }
  }

  function revealNow() {
    if (showAnswer) return;
    setShowAnswer(true);
    setCombo(0);
  }

  function nextQuestion() {
    if (currentIndex < questions.length - 1) setCurrentIndex((prev) => prev + 1);
    else setView("results");
  }

  function resetToHome() {
    setView("home");
    setCurrentRealm(null);
    setQuestions([]);
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setAutoRevealed(false);
    setScore(0);
    setCorrect(0);
    setCombo(0);
    setBestCombo(0);
  }

  return (
    <div className={`min-h-screen ${competitive ? "bg-white text-slate-950" : "bg-gradient-to-br from-emerald-50 via-white to-cyan-50 text-slate-900"}`}>
      <div className={`fixed inset-0 pointer-events-none ${competitive ? "bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.20),_transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.16),_transparent_34%)]" : "bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.16),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(6,182,212,0.14),_transparent_34%)]"}`} />
      <div className="relative mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        {view === "home" && (
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className={`rounded-[32px] border p-6 md:p-8 lg:p-10 shadow-2xl backdrop-blur-xl ${competitive ? "border-sky-200 bg-white/90" : "border-emerald-100 bg-white/85"}`}>
              <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="space-y-5">
                  <Pill className={competitive ? "bg-sky-50 text-sky-700 border border-sky-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"}>Robotics Interview Trainer</Pill>
                  <div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">Fifteen interview-style questions in every domain.</h1>
                    <p className="mt-4 max-w-3xl text-base md:text-lg leading-relaxed text-slate-600">
                      Calm mode includes the original 10 foundational domains. Competitive mode includes the original 20 advanced domains. Each section interview questions with shuffled answers, timers, and guided explanations.
                    </p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <StatCard label="Calm Domains" value={CALM_REALMS.length} sub={`${QUESTIONS_PER_REALM} questions each`} mode="calm" />
                    <StatCard label="Competitive Domains" value={COMPETITIVE_REALMS.length} sub={`${QUESTIONS_PER_REALM} questions each`} mode="competitive" />
                    <StatCard label="Score Target" value={QUIZ_SCORE_TARGET} sub="normalized by realm" mode={mode} />
                  </div>
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button onClick={() => { setMode("calm"); setSearch(""); setView("realms"); }} className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-500">Start Calm Mode</button>
                    <button onClick={() => { setMode("competitive"); setSearch(""); setView("realms"); }} className="rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-500">Start Competitive Mode</button>
                    <button onClick={() => setAudioEnabled((prev) => !prev)} className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${competitive ? "border-sky-200 bg-white text-sky-700 hover:bg-sky-50" : "border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50"}`}>{audioEnabled ? "White noise on" : "White noise off"}</button>
                  </div>
                </div>
                <div className="grid gap-4">
                  {[
                    ["Kinematics", "FK, IK, Jacobians, singularities"],
                    ["Control", "PID, stability, anti-windup"],
                    ["ROS2", "QoS, executors, tf2, lifecycle"],
                    ["Optimization", "KKT, conditioning, warm starts"],
                  ].map(([title, text], idx) => (
                    <motion.div key={title} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.06 }} className={`rounded-[28px] border p-5 ${competitive ? "border-sky-200 bg-white/95" : "border-slate-200 bg-white/90"} shadow-lg`}>
                      <div className={`text-xs uppercase tracking-[0.18em] font-semibold ${competitive ? "text-sky-700" : "text-cyan-700"}`}>Featured domain</div>
                      <div className="mt-2 text-xl font-black text-slate-950">{title}</div>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {view === "realms" && (
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <Pill className={competitive ? "bg-sky-50 text-sky-700 border border-sky-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"}>{competitive ? "Competitive Mode" : "Calm Mode"}</Pill>
                <h2 className="mt-3 text-3xl md:text-4xl font-black">Choose a domain</h2>
                <p className="mt-2 text-sm md:text-base text-slate-600">{competitive ? "20 advanced interview domains." : "10 core robotics interview domains."}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search domains..." className={`w-full md:w-72 rounded-2xl border px-4 py-3 text-sm outline-none ${competitive ? "border-sky-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-sky-500" : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-500"}`} />
                <button onClick={() => setView("home")} className={`rounded-2xl px-4 py-3 text-sm font-semibold border ${competitive ? "border-sky-200 bg-white text-sky-700 hover:bg-sky-50" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}>Back</button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredRealms.map((realm, idx) => (
                <motion.button key={realm.name} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }} onClick={() => startRealm(realm)} className={`group relative overflow-hidden rounded-[30px] border p-5 text-left shadow-xl transition hover:-translate-y-1 ${competitive ? "border-sky-200 bg-white/95" : "border-white/80 bg-white/90"}`}>
                  <div className={`absolute inset-0 bg-gradient-to-br opacity-95 ${realm.palette}`} />
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/35 bg-white/15 text-sm font-bold tracking-[0.18em] text-white backdrop-blur-md">{realm.code}</div>
                      <div className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold tracking-wide text-white backdrop-blur"></div>
                    </div>
                    <div className="mt-5">
                      <div className="text-2xl font-black text-white">{realm.name}</div>
                      <p className="mt-2 text-sm leading-relaxed text-white/90">{realm.description}</p>
                    </div>
                    <div className="mt-6 flex items-center justify-between text-sm font-semibold text-white">
                      <span>Start assessment</span>
                      <span className="transition group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {view === "quiz" && currentQuestion && currentRealm && (
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            <div className={`rounded-[32px] border p-5 md:p-6 shadow-2xl backdrop-blur-xl ${competitive ? "border-sky-200 bg-white/90" : "border-emerald-100 bg-white/80"}`}>
              <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <Pill className={competitive ? "bg-sky-50 text-sky-700 border border-sky-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"}>{competitive ? "Competitive Mode" : "Calm Mode"}</Pill>
                  <h2 className="mt-3 text-2xl md:text-3xl font-black text-slate-950">{currentRealm.code} {currentRealm.name}</h2>
                  <p className="mt-1 text-sm text-slate-500">Question {currentIndex + 1} of {questions.length}</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 min-w-full xl:min-w-[680px]">
                  <StatCard label="Score" value={score} sub="out of 10000" mode={mode} />
                  <StatCard label="Combo" value={`x${combo}`} sub="current streak" mode={mode} />
                  <StatCard label="Answer In" value={`${timeLeft}s`} sub="primary timer" mode={mode} />
                  <StatCard label="Reveal In" value={`${revealLeft}s`} sub="auto reveal" mode={mode} />
                </div>
              </div>
              <div className="mt-5 space-y-3">
                <div>
                  <div className="mb-1 flex items-center justify-between text-[11px] font-semibold"><span className={competitive ? "text-sky-700" : "text-emerald-700"}>Answer Timer</span><span className="text-slate-500">{timeLeft}s left</span></div>
                  <Progress value={answerPercent} color={competitive ? (timeLeft <= 10 ? "bg-amber-400" : "bg-sky-500") : (timeLeft <= 10 ? "bg-amber-400" : "bg-emerald-500")} height="h-3" />
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-[11px] font-semibold"><span className={competitive ? "text-blue-700" : "text-cyan-700"}>Auto-Reveal Timer</span><span className="text-slate-500">{revealLeft}s left</span></div>
                  <Progress value={revealPercent} color={competitive ? "bg-blue-500" : "bg-cyan-500"} height="h-2.5" />
                </div>
              </div>
            </div>

            <div className={`rounded-[32px] border p-5 md:p-6 shadow-xl ${competitive ? "border-sky-200 bg-white text-slate-950" : "border-emerald-100 bg-white text-slate-900"}`}>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Pill className={competitive ? "bg-sky-50 text-sky-700 border border-sky-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"}>{currentQuestion.difficulty}</Pill>
                <Pill className={competitive ? "bg-slate-950 text-sky-300 border border-sky-200" : "bg-slate-50 text-slate-700 border border-slate-200"}>{points} pts</Pill>
                {autoRevealed ? <Pill className="bg-amber-500/20 text-amber-700 border border-amber-300">Auto-Revealed</Pill> : null}
              </div>
              <h3 className="text-xl md:text-2xl font-black leading-snug text-slate-950">{currentQuestion.prompt}</h3>
              <div className="mt-5 grid gap-3">
                {currentQuestion.options.map((option, idx) => {
                  const isCorrect = idx === currentQuestion.answer;
                  const isPicked = idx === selectedOption;
                  let optionClass = competitive ? "border-sky-200 bg-white hover:bg-sky-50 text-slate-950" : "border-emerald-100 bg-slate-50 hover:bg-emerald-50 text-slate-900";
                  if (showAnswer && isCorrect) optionClass = "border-emerald-500 bg-emerald-500/10 text-emerald-700";
                  if (showAnswer && isPicked && !isCorrect) optionClass = "border-blue-500 bg-blue-500/10 text-blue-700";
                  return (
                    <motion.button key={idx} whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => chooseAnswer(idx)} disabled={showAnswer} className={`w-full text-left rounded-[22px] border px-4 py-4 transition-all ${optionClass}`}>
                      <div className="flex items-start gap-3">
                        <div className={`shrink-0 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${showAnswer && isCorrect ? "bg-emerald-500 text-white" : showAnswer && isPicked && !isCorrect ? "bg-blue-500 text-white" : competitive ? "border border-sky-200 bg-sky-50 text-sky-700" : "border border-slate-200 bg-white text-slate-700"}`}>{String.fromCharCode(65 + idx)}</div>
                        <div className="text-sm md:text-base leading-relaxed">{option}</div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                {!showAnswer ? (
                  <button onClick={revealNow} className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${competitive ? "border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100" : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>Reveal Answer</button>
                ) : (
                  <button onClick={nextQuestion} className={`rounded-2xl border px-5 py-3 text-sm font-semibold ${competitive ? "border-sky-500 bg-sky-500 text-white hover:bg-blue-500" : "border-emerald-500 bg-emerald-600 text-white hover:bg-emerald-500"}`}>{currentIndex < questions.length - 1 ? "Next Question" : "See Results"}</button>
                )}
                <button onClick={() => setView("realms")} className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${competitive ? "border-sky-200 bg-white text-sky-700 hover:bg-sky-50" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}>Exit Realm</button>
              </div>
              <AnimatePresence>
                {showAnswer ? (
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className={`mt-5 rounded-[28px] border p-5 ${competitive ? "border-sky-200 bg-sky-50/60" : "border-emerald-100 bg-emerald-50/50"}`}>
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">Correct Answer</span>
                      <span className="text-sm font-semibold text-slate-800">{String.fromCharCode(65 + currentQuestion.answer)}. {currentQuestion.options[currentQuestion.answer]}</span>
                    </div>
                    <div className="space-y-2 text-sm leading-relaxed text-slate-700">
                      <p><span className="font-bold">Hint:</span> {currentQuestion.hint}</p>
                      <p><span className="font-bold">Explanation:</span> {currentQuestion.explain}</p>
                      <p><span className="font-bold">Interview Angle:</span> {currentQuestion.example}</p>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {view === "results" && currentRealm ? (
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            <div className={`rounded-[32px] border p-6 shadow-2xl ${competitive ? "border-sky-200 bg-white/95 text-slate-950" : "border-emerald-100 bg-white text-slate-900"}`}>
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className={`text-xs font-semibold uppercase tracking-[0.2em] ${competitive ? "text-sky-700" : "text-emerald-700"}`}>Final Score</div>
                  <div className="mt-2 text-5xl md:text-6xl font-black">{score}</div>
                  <div className="mt-2 text-sm text-slate-500">Target: {QUIZ_SCORE_TARGET} points</div>
                </div>
                <div className="w-full md:w-[360px]">
                  <div className="mb-2 flex justify-between text-sm font-semibold"><span className={competitive ? "text-sky-700" : "text-emerald-700"}>Completion Score</span><span>{scorePercent}%</span></div>
                  <Progress value={scorePercent} color={competitive ? "bg-sky-500" : "bg-emerald-500"} height="h-4" />
                </div>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-4">
                <StatCard label="Realm" value={currentRealm.name} sub="selected domain" mode={mode} />
                <StatCard label="Correct" value={`${correct}/${questions.length}`} mode={mode} />
                <StatCard label="Best Combo" value={`x${bestCombo}`} sub="peak streak" mode={mode} />
                <StatCard label="Level" value={scorePercent >= 90 ? "Elite" : scorePercent >= 75 ? "Strong" : scorePercent >= 55 ? "Solid" : "Developing"} sub="performance band" mode={mode} />
              </div>
            </div>
            <div className={`rounded-[32px] border p-6 shadow-xl ${competitive ? "border-sky-200 bg-white/95" : "border-emerald-100 bg-white"}`}>
              <h3 className="text-2xl font-black text-slate-950">Assessment Summary</h3>
              <div className="mt-4 grid gap-3 text-slate-600 md:grid-cols-2">
                <div className={`rounded-2xl border p-4 ${competitive ? "border-sky-200 bg-sky-50/70" : "border-slate-200 bg-slate-50"}`}>All 10 calm domains and all 20 competitive domains are present.</div>
                <div className={`rounded-2xl border p-4 ${competitive ? "border-sky-200 bg-sky-50/70" : "border-slate-200 bg-slate-50"}`}></div>
                <div className={`rounded-2xl border p-4 ${competitive ? "border-sky-200 bg-sky-50/70" : "border-slate-200 bg-slate-50"}`}>Answer options shuffle each run to reduce answer-position bias.</div>
                <div className={`rounded-2xl border p-4 ${competitive ? "border-sky-200 bg-sky-50/70" : "border-slate-200 bg-slate-50"}`}>White noise, timers, guided explanations and normalized scoring are retained.</div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button onClick={() => setView("realms")} className={`rounded-2xl px-5 py-3 text-sm font-semibold ${competitive ? "bg-sky-500 text-white hover:bg-blue-500" : "bg-emerald-600 text-white hover:bg-emerald-500"}`}>Play Another Realm</button>
                <button onClick={resetToHome} className={`rounded-2xl border px-5 py-3 text-sm font-semibold ${competitive ? "border-sky-200 bg-white text-sky-700 hover:bg-sky-50" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}>Return Home</button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}
