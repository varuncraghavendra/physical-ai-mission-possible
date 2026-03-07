import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const QUIZ_SCORE_TARGET = 10000;
const QUESTION_TIME_LIMIT = 60;
const AUTO_REVEAL_AFTER = 120;

const CALM_REALMS = [
  { name: "Kinematics", description: "Position, orientation, motion and frame transformations.", icon: "🦾", color: "from-emerald-400 to-teal-500" },
  { name: "Control", description: "Feedback, PID, stability and tracking.", icon: "🎛️", color: "from-teal-400 to-cyan-500" },
  { name: "SLAM & Estimation", description: "Localization, mapping and uncertainty.", icon: "🗺️", color: "from-cyan-400 to-sky-500" },
  { name: "Dynamics", description: "Forces, inertia and equations of motion.", icon: "⚙️", color: "from-sky-400 to-blue-500" },
  { name: "Perception", description: "Vision, sensing and scene understanding.", icon: "👁️", color: "from-blue-400 to-indigo-500" },
  { name: "Machine Learning", description: "Learning methods in robotics and AI.", icon: "🧠", color: "from-indigo-400 to-violet-500" },
  { name: "Linear Algebra", description: "Matrices, vectors and coordinate transforms.", icon: "📐", color: "from-violet-400 to-purple-500" },
  { name: "Probability", description: "Uncertainty, Bayes rule and random variables.", icon: "🎲", color: "from-purple-400 to-fuchsia-500" },
  { name: "Manipulators", description: "Robot arms, Jacobians, workspace and grasping.", icon: "🤖", color: "from-fuchsia-400 to-pink-500" },
  { name: "Computation", description: "CPU, GPU and real-time computing basics.", icon: "💻", color: "from-pink-400 to-rose-500" },
];

const COMPETITIVE_REALMS = [
  { name: "Numerical Optimization", description: "Optimization theory, convexity and trajectory methods.", icon: "📈", color: "from-blue-500 to-cyan-500" },
  { name: "Reinforcement Learning", description: "Policies, value functions and embodied RL.", icon: "🎮", color: "from-cyan-500 to-sky-500" },
  { name: "Foundation Models", description: "Multimodal models, robot reasoning and embodied AI.", icon: "🌐", color: "from-sky-500 to-indigo-500" },
  { name: "Aerial Robotics", description: "UAV dynamics, estimation and agile flight.", icon: "✈️", color: "from-indigo-500 to-blue-600" },
  { name: "Underwater Robotics", description: "Navigation, localization and sensing underwater.", icon: "🌊", color: "from-blue-600 to-cyan-600" },
  { name: "Autonomous Driving", description: "Perception, prediction and planning in AVs.", icon: "🚗", color: "from-cyan-600 to-teal-500" },
  { name: "Legged Locomotion", description: "Contact dynamics, balance and gait control.", icon: "🦿", color: "from-teal-500 to-blue-500" },
  { name: "Motion Planning", description: "Sampling, graph search and kinodynamic planning.", icon: "🧭", color: "from-blue-500 to-violet-500" },
  { name: "ROS2", description: "DDS, QoS, executors, TF and lifecycle systems.", icon: "🧩", color: "from-red-500 to-orange-500" },
  { name: "Cloud Deployment of Robotics", description: "Docker, fleet ops, observability and OTA updates.", icon: "☁️", color: "from-red-600 to-amber-500" },
  { name: "Robot Communication", description: "RF, transport protocols, latency and middleware.", icon: "📡", color: "from-rose-500 to-red-700" },
  { name: "Space Robotics", description: "Planetary autonomy, orbital servicing and delay-tolerant control.", icon: "🛰️", color: "from-orange-500 to-red-600" },
  { name: "Assistive Robotics", description: "Prosthetics, exoskeletons and human-in-the-loop control.", icon: "🦾", color: "from-pink-500 to-rose-600" },
  { name: "Industrial Robotics", description: "Automation cells, safety, PLCs and throughput.", icon: "🏭", color: "from-red-700 to-orange-600" },
  { name: "CAD for Robotics", description: "Parametric design, tolerances and manufacturability.", icon: "📐", color: "from-amber-500 to-yellow-500" },
  { name: "Power Systems for Robotics", description: "Battery systems, converters and power budgeting.", icon: "🔋", color: "from-yellow-500 to-orange-500" },
  { name: "Deep Learning for Robotics", description: "Policies, perception models and embodied learning.", icon: "🧠", color: "from-red-500 to-pink-600" },
  { name: "Sensors", description: "IMUs, LiDAR, calibration, observability and noise.", icon: "🎯", color: "from-orange-500 to-amber-600" },
  { name: "Actuators for Robotics", description: "BLDCs, geartrains, torque control and elasticity.", icon: "⚙️", color: "from-red-600 to-red-800" },
  { name: "Robotic Dexterity", description: "Hands, tactile sensing, soft robotics and in-hand manipulation.", icon: "✋", color: "from-rose-600 to-pink-700" },
];

const competitiveBlueprints = {
  "Numerical Optimization": {
    stem: "numerical optimization for robotics",
    concepts: ["convex relaxation", "conditioning", "constraint handling", "local minima"],
    scenario: "a trajectory optimization stack for a dynamic robot",
  },
  "Reinforcement Learning": {
    stem: "robot reinforcement learning",
    concepts: ["reward design", "exploration bias", "distribution shift", "sim-to-real transfer"],
    scenario: "a learned manipulation or locomotion policy deployed on hardware",
  },
  "Foundation Models": {
    stem: "foundation models for robotics",
    concepts: ["prompt grounding", "multi-modal alignment", "hallucination risk", "closed-loop embodiment"],
    scenario: "a robot system using language, vision and action reasoning together",
  },
  "Aerial Robotics": {
    stem: "aerial robotics",
    concepts: ["attitude stability", "state estimation drift", "latency sensitivity", "thrust-to-weight margins"],
    scenario: "a quadrotor flying through a dynamic environment",
  },
  "Underwater Robotics": {
    stem: "underwater robotics",
    concepts: ["acoustic sensing ambiguity", "navigation drift", "communication bandwidth", "hydrodynamic uncertainty"],
    scenario: "an AUV operating without GPS in turbid water",
  },
  "Autonomous Driving": {
    stem: "autonomous driving",
    concepts: ["prediction uncertainty", "rare-event tails", "planner consistency", "safety envelopes"],
    scenario: "an urban driving stack under dense traffic conditions",
  },
  "Legged Locomotion": {
    stem: "legged locomotion",
    concepts: ["contact timing", "state estimation", "terrain uncertainty", "whole-body coordination"],
    scenario: "a quadruped or humanoid traversing challenging terrain",
  },
  "Motion Planning": {
    stem: "robot motion planning",
    concepts: ["sampling bias", "kinodynamic feasibility", "collision margins", "completeness vs optimality"],
    scenario: "a robot navigating cluttered spaces with dynamic constraints",
  },
  "ROS2": {
    stem: "ROS 2",
    concepts: ["DDS discovery", "QoS compatibility", "executor scheduling", "TF frame consistency"],
    scenario: "a distributed robot stack with perception, planning and control nodes",
  },
  "Cloud Deployment of Robotics": {
    stem: "robot cloud deployment",
    concepts: ["container isolation", "fleet orchestration", "observability", "OTA rollout safety"],
    scenario: "a multi-robot fleet deployed across edge devices and cloud backends",
  },
  "Robot Communication": {
    stem: "robot communication",
    concepts: ["RF link budget", "transport latency", "packet loss", "middleware reliability"],
    scenario: "a teleoperation and autonomy stack sharing control and perception traffic",
  },
  "Space Robotics": {
    stem: "space robotics",
    concepts: ["communication delay", "radiation tolerance", "orbital dynamics", "delay-tolerant autonomy"],
    scenario: "an orbital servicing or planetary rover mission",
  },
  "Assistive Robotics": {
    stem: "assistive robotics",
    concepts: ["human intent estimation", "compliance", "biomechanics", "safety envelope"],
    scenario: "an exoskeleton or prosthetic system interacting continuously with a human user",
  },
  "Industrial Robotics": {
    stem: "industrial robotics",
    concepts: ["cycle-time optimization", "safety interlocks", "repeatability", "PLC-cell integration"],
    scenario: "a high-throughput robotic production cell",
  },
  "CAD for Robotics": {
    stem: "robot CAD",
    concepts: ["tolerance stack-up", "joint clearance", "mass distribution", "manufacturability"],
    scenario: "a robot end-effector and structural assembly intended for production",
  },
  "Power Systems for Robotics": {
    stem: "robot power systems",
    concepts: ["battery internal resistance", "DC-DC conversion", "peak current draw", "thermal derating"],
    scenario: "a battery-powered robot operating under dynamic load conditions",
  },
  "Deep Learning for Robotics": {
    stem: "deep learning for robotics",
    concepts: ["representation learning", "policy generalization", "dataset shift", "closed-loop deployment"],
    scenario: "a robot policy trained in simulation and deployed on physical hardware",
  },
  "Sensors": {
    stem: "robot sensing",
    concepts: ["noise density", "bias drift", "extrinsic calibration", "observability"],
    scenario: "a multi-sensor robot performing state estimation in a dynamic environment",
  },
  "Actuators for Robotics": {
    stem: "robot actuation",
    concepts: ["torque bandwidth", "backlash", "efficiency", "force controllability"],
    scenario: "a precision robotic axis that must track fast and compliant motions",
  },
  "Robotic Dexterity": {
    stem: "robotic dexterity",
    concepts: ["contact-rich manipulation", "tactile feedback", "grasp stability", "underactuation"],
    scenario: "a multi-finger hand performing in-hand reorientation on diverse objects",
  },
};

const calmBlueprints = {
  "Kinematics": { stem: "robot kinematics", concepts: ["forward kinematics", "inverse kinematics", "Jacobian intuition", "reference frames"], scenario: "a robot arm moving its end-effector to a target pose" },
  "Control": { stem: "robot control", concepts: ["PID feedback", "stability", "tracking error", "feedforward intuition"], scenario: "a robot controller following a desired trajectory" },
  "SLAM & Estimation": { stem: "SLAM and estimation", concepts: ["sensor fusion", "uncertainty", "Kalman intuition", "map consistency"], scenario: "a mobile robot localizing while building a map" },
  "Dynamics": { stem: "robot dynamics", concepts: ["force and torque", "inertia", "equations of motion", "energy intuition"], scenario: "a manipulator or drone accelerating under load" },
  "Perception": { stem: "robot perception", concepts: ["camera sensing", "depth understanding", "feature extraction", "calibration basics"], scenario: "a robot trying to interpret its surroundings" },
  "Machine Learning": { stem: "machine learning for robotics", concepts: ["classification", "generalization", "training data", "model bias"], scenario: "a robot perception model making predictions from data" },
  "Linear Algebra": { stem: "linear algebra in robotics", concepts: ["vectors", "matrices", "eigen intuition", "coordinate transforms"], scenario: "a robotics pipeline using transformations and projections" },
  "Probability": { stem: "probability for robotics", concepts: ["random variables", "Bayes rule", "expectation", "variance"], scenario: "a robot reasoning under uncertainty" },
  "Manipulators": { stem: "robot manipulators", concepts: ["workspace", "singularity intuition", "grasping", "joint-space vs task-space"], scenario: "a robotic arm reaching and manipulating objects" },
  "Computation": { stem: "robot computation", concepts: ["latency", "throughput", "CPU vs GPU", "real-time scheduling"], scenario: "a robot stack running perception and control loops together" },
};

function q(id, realm, mode, difficulty, points, prompt, options, answer, hint, explain, example) {
  return { id, realm, mode, difficulty, points, prompt, options, answer, hint, explain, example };
}

function makeCalmQuestions(realmName, baseId) {
  const b = calmBlueprints[realmName];
  const difficulties = ["Easy", "Easy", "Easy", "Medium", "Medium", "Medium", "Medium", "Hard", "Hard", "Hard"];
  const pts = [10, 10, 10, 15, 15, 15, 15, 20, 20, 20];

  const builders = [
    (id) => q(id, realmName, "calm", difficulties[0], pts[0], `In ${b.stem}, what is the simplest role of ${b.concepts[0]}?`, [
      `It helps describe or compute an essential part of the robot's behavior in a mathematically structured way.`,
      `It removes the need for sensing, calibration and feedback entirely.`,
      `It only matters in entertainment robots and not in engineering systems.`,
      `It is used only after the robot is powered off.`
    ], 0, `Pick the option that captures the core conceptual role.`, `${b.concepts[0]} is a foundational concept because it helps engineers reason about what the robot is doing and how system variables relate to physical behavior.`, `A typical example appears in ${b.scenario}.`),
    (id) => q(id, realmName, "calm", difficulties[1], pts[1], `Why is ${b.concepts[1]} useful in ${b.stem}?`, [
      `Because it helps connect desired robot behavior to the variables we can control or estimate.`,
      `Because it automatically guarantees perfect performance in every environment.`,
      `Because it replaces mathematics with trial and error.`,
      `Because it only affects the robot's outer appearance.`
    ], 0, `Think about how engineers map goals to internal variables.`, `${b.concepts[1]} is useful because robotics problems often require translating a desired task into internal coordinates, control actions or estimates.`, `This shows up clearly in ${b.scenario}.`),
    (id) => q(id, realmName, "calm", difficulties[2], pts[2], `What makes ${b.concepts[2]} important for beginners in ${b.stem}?`, [
      `It provides intuition for how small changes in one part of the system affect another.`,
      `It only matters for robots larger than a car.`,
      `It is a purely legal concept rather than a technical one.`,
      `It eliminates all uncertainty from robotic behavior.`
    ], 0, `Robotics intuition often begins with sensitivities and relationships.`, `${b.concepts[2]} matters because robotics is full of coupled variables. Understanding how one quantity influences another is a key step toward strong system intuition.`, `That coupling is important in ${b.scenario}.`),
    (id) => q(id, realmName, "calm", difficulties[3], pts[3], `Why do engineers care about ${b.concepts[3]} in ${b.stem}?`, [
      `Because consistent assumptions and representations prevent confusion and reduce system errors.`,
      `Because it is only needed for artistic robot design.`,
      `Because it makes all sensors noise-free.`,
      `Because it guarantees zero compute cost.`
    ], 0, `Consistency across a system matters.`, `${b.concepts[3]} supports correctness because robotics stacks depend on shared assumptions across sensing, estimation, planning and control.`, `That is especially visible in ${b.scenario}.`),
    (id) => q(id, realmName, "calm", difficulties[4], pts[4], `What is usually the best beginner mindset for ${b.stem}?`, [
      `Focus on physical meaning first, then connect it to equations and implementation.`,
      `Memorize formulas without understanding assumptions.`,
      `Ignore units and geometry if the code runs once.`,
      `Assume every lab result will generalize automatically.`
    ], 0, `Good intuition starts from physics and assumptions.`, `A strong beginner mindset in robotics is to link equations to physical meaning, assumptions, and observable behavior instead of treating formulas as isolated facts.`, `This is a reliable way to learn ${b.stem}.`),
    (id) => q(id, realmName, "calm", difficulties[5], pts[5], `In ${b.scenario}, which engineering habit is most valuable?`, [
      `Check assumptions, units, frames and signal meanings before debugging deeper logic.`,
      `Assume the last plotted curve must be correct.`,
      `Avoid sensor validation because it slows progress.`,
      `Treat simulation and hardware as identical.`
    ], 0, `Many robotics bugs are caused by broken assumptions.`, `Robotics systems often fail because of hidden mismatches in conventions, units, frames, timing or sensor interpretation. Verifying those basics is a high-value habit.`, `That habit is crucial in ${b.stem}.`),
    (id) => q(id, realmName, "calm", difficulties[6], pts[6], `Why does uncertainty still matter even in basic ${b.stem} problems?`, [
      `Because real robots operate with imperfect measurements, models and timing.`,
      `Because uncertainty only exists in finance, not engineering.`,
      `Because uncertainty disappears once a controller is tuned.`,
      `Because modern CPUs make uncertainty irrelevant.`
    ], 0, `Real robots are never perfectly known.`, `Even simple robotics tasks must account for imperfect sensing, model mismatch and environmental variation. That is why robust reasoning matters early.`, `You see this clearly in ${b.scenario}.`),
    (id) => q(id, realmName, "calm", difficulties[7], pts[7], `What is the biggest risk of learning ${b.stem} only from equations and not from system context?`, [
      `You may know formulas but miss when assumptions break in real robotic systems.`,
      `You will automatically become better at deployment.`,
      `You will never need debugging tools.`,
      `You will always get lower compute usage.`
    ], 0, `Assumptions determine whether equations apply.`, `Equations are powerful, but robotics depends on when they apply, how they break, and how signals move through the full system. Context is what turns math into engineering.`, `That distinction appears in ${b.scenario}.`),
    (id) => q(id, realmName, "calm", difficulties[8], pts[8], `Which statement best reflects sound reasoning in ${b.stem}?`, [
      `A model can be useful even when imperfect, as long as we understand its limits.`,
      `Only exact models are worth using in robotics.`,
      `If a model is approximate, it has no engineering value.`,
      `Every robot can be analyzed with the same assumptions.`
    ], 0, `Useful models are often approximate but informative.`, `Engineering models are valuable because they guide prediction, control and diagnosis. Their usefulness depends on understanding validity limits, not on being perfectly exact.`, `That is a core lesson in ${b.stem}.`),
    (id) => q(id, realmName, "calm", difficulties[9], pts[9], `What is the best final takeaway for a student learning ${b.stem}?`, [
      `Build intuition, verify assumptions, and connect math to physical robot behavior.`,
      `Optimization alone solves all robotics problems.`,
      `Deployment quality does not depend on fundamentals.`,
      `Only advanced research topics matter; basics do not.`
    ], 0, `Strong fundamentals make advanced robotics easier later.`, `The best takeaway is that robotics fundamentals are not separate from practice. They are the language used to understand behavior, diagnose failures and build better systems.`, `That is exactly why ${b.stem} matters in ${b.scenario}.`),
  ];

  return builders.map((fn, idx) => fn(baseId + idx));
}

function makeCompetitiveQuestions(realmName, baseId) {
  const s = competitiveBlueprints[realmName];
  const builders = [
    (id) => q(id, realmName, "competitive", "Starter", 40, `In ${s.stem}, which failure mode most directly appears when ${s.concepts[0]} is not handled correctly?`, [
      `The system develops hidden instability or inconsistent behavior because a core assumption is violated.`,
      `The robot becomes perfectly robust because the issue fixes itself automatically.`,
      `The hardware power draw becomes zero because the issue is purely mechanical.`,
      `The estimator becomes globally optimal without any extra assumptions.`
    ], 0, `Look for the most realistic systems consequence.`, `${s.concepts[0]} is foundational, so mishandling it usually breaks timing, consistency, safety margins or numerical reliability across the stack.`, `This matters in ${s.scenario}.`),
    (id) => q(id, realmName, "competitive", "Starter", 45, `Why is ${s.concepts[1]} a first-class design concern in ${s.stem}?`, [
      `Because real robots must remain correct under noise, delay, load and imperfect assumptions.`,
      `Because it only affects user interface styling and not robot behavior.`,
      `Because it guarantees zero latency regardless of architecture.`,
      `Because it eliminates the need for sensing and feedback.`
    ], 0, `Think deployment realism, not ideal theory.`, `${s.concepts[1]} matters because robotics systems operate under uncertainty, asynchronous execution and changing workloads. Designs that ignore this often fail outside the lab.`, `That is clear in ${s.scenario}.`),
    (id) => q(id, realmName, "competitive", "Advanced", 50, `What system property is most threatened when ${s.concepts[2]} becomes severe in ${s.stem}?`, [
      `Predictable closed-loop behavior and trustworthy system timing.`,
      `The mathematical definition of Euclidean distance.`,
      `The existence of state-space models.`,
      `The possibility of using any finite-dimensional controller.`
    ], 0, `Severe degradation usually attacks predictability.`, `When ${s.concepts[2]} becomes severe, the robot loses timing regularity, reliability or consistency, which undermines safety and performance.`, `This is a common systems issue in ${s.scenario}.`),
    (id) => q(id, realmName, "competitive", "Advanced", 55, `Why is ${s.concepts[3]} usually tied to cross-module performance rather than a single algorithm?`, [
      `Because it couples sensing, estimation, planning, control and infrastructure assumptions together.`,
      `Because it is purely cosmetic and only affects logs.`,
      `Because it converts floating-point arithmetic into exact integer math.`,
      `Because it only matters after the robot is shut down.`
    ], 0, `Cross-module coupling is the key clue.`, `${s.concepts[3]} spans the stack, so its effects emerge through interactions between modules rather than from one component in isolation.`, `This is especially visible in ${s.scenario}.`),
    (id) => q(id, realmName, "competitive", "Research", 60, `Which design choice best improves robustness for ${s.scenario}?`, [
      `Architect the system so degraded performance is detectable, bounded and recoverable.`,
      `Assume all measurements and communication are perfect at all times.`,
      `Remove monitoring because observability reduces speed.`,
      `Force every subsystem to run with identical timing no matter the workload.`
    ], 0, `Graceful degradation beats idealized assumptions.`, `Strong systems do not assume perfection. They instrument failure modes, detect degradation and define safe fallback behavior.`, `That principle is central in ${s.stem}.`),
    (id) => q(id, realmName, "competitive", "Research", 65, `Why is it dangerous to optimize only average-case behavior in ${s.stem}?`, [
      `Because edge cases and tail events often dominate real deployment failures.`,
      `Because average-case analysis is mathematically invalid.`,
      `Because robots never experience nominal operating conditions.`,
      `Because it always causes memory leaks in production.`
    ], 0, `Robotics failures often live in the tails.`, `Average-case metrics can look strong while the system remains brittle under rare contacts, delays, resets, dynamic scenes or hard environments.`, `This is exactly why robust evaluation matters for ${s.scenario}.`),
    (id) => q(id, realmName, "competitive", "Research", 70, `For ${s.scenario}, which principle most directly supports scalability?`, [
      `Decoupled interfaces with measurable contracts between modules.`,
      `Hard-coding every subsystem to one machine and one timing profile.`,
      `Removing diagnostics to reduce code size.`,
      `Relying on manual intervention whenever anomalies occur.`
    ], 0, `Scalability requires interfaces, contracts and observability.`, `Large robotics systems scale when modules have clear interfaces, measurable assumptions and diagnosable boundaries. Tight coupling makes maintenance and fleet operation fragile.`, `That is vital in ${s.stem}.`),
    (id) => q(id, realmName, "competitive", "Research", 70, `What is the most realistic meaning of production readiness in ${s.stem}?`, [
      `The system remains monitorable, recoverable and safe under non-ideal conditions.`,
      `The demo works once in a lab with ideal assumptions.`,
      `The code compiles without runtime measurements.`,
      `Only the original developer can operate the robot.`
    ], 0, `Production readiness is about real operating conditions.`, `A deployable robot stack must tolerate variation in sensing, compute, networking and hardware while exposing health signals and recovery paths.`, `That standard matters in ${s.scenario}.`),
    (id) => q(id, realmName, "competitive", "Expert", 75, `Why do advanced teams treat validation for ${s.stem} as a full-stack activity?`, [
      `Because integration effects dominate isolated component benchmarks in real deployments.`,
      `Because individual modules cannot be tested at all.`,
      `Because simulation exactly guarantees field performance.`,
      `Because hardware no longer matters once software is validated.`
    ], 0, `Integration effects dominate in robotics.`, `Many failures happen at module boundaries: power and compute interactions, planner freshness, estimator lag, communication jitter or mechanics-perception mismatch.`, `That is why ${s.scenario} must be validated end to end.`),
    (id) => q(id, realmName, "competitive", "Expert", 80, `Which metric is most misleading if used alone to judge ${s.stem}?`, [
      `A single headline metric without latency, reliability or failure-context breakdowns.`,
      `A latency distribution with percentile analysis.`,
      `A scenario-tagged benchmark with controlled regressions.`,
      `A hardware-in-the-loop evaluation with safety logs.`
    ], 0, `One number often hides failure structure.`, `A single high-level score can conceal tail failures, operating-region collapse or unstable deployment behavior. Robotics needs stratified evaluation.`, `This is especially true in ${s.scenario}.`),
    (id) => q(id, realmName, "competitive", "Expert", 80, `What is the main architectural benefit of explicit fallbacks in ${s.stem}?`, [
      `They convert catastrophic failure into bounded degradation that operators and controllers can handle.`,
      `They make the nominal system mathematically exact.`,
      `They remove the need for corner-case testing.`,
      `They guarantee optimality under all disturbances.`
    ], 0, `Fallbacks are about limiting severity.`, `Explicit fallback paths preserve observability and controllability long enough for recovery, intervention or safe shutdown instead of allowing sudden all-or-nothing collapse.`, `That is crucial in ${s.scenario}.`),
    (id) => q(id, realmName, "competitive", "Expert", 85, `In a mature ${s.stem} stack, what usually separates a research prototype from a deployable system?`, [
      `Operational discipline: monitoring, recovery logic, interfaces, reproducibility and safety constraints.`,
      `A larger font size in the dashboard.`,
      `Using more buzzwords in the README.`,
      `Avoiding quantitative benchmarks entirely.`
    ], 0, `Deployment needs operations, not only algorithms.`, `The difference is often not the model alone but the engineering around it: rollback plans, telemetry, safe defaults, reproducibility and failure handling.`, `Those factors become decisive in ${s.scenario}.`),
    (id) => q(id, realmName, "competitive", "Master", 90, `Why is closed-loop evaluation essential for ${s.stem}?`, [
      `Because robot actions change future observations, so open-loop metrics alone miss feedback effects.`,
      `Because open-loop datasets are never useful in robotics.`,
      `Because closed-loop systems cannot be simulated.`,
      `Because evaluation only matters after hardware deployment.`
    ], 0, `Actions influence future data.`, `Perception, planning and control are coupled. A model that looks good offline can fail once its outputs shape the next state and next observations.`, `That coupling is fundamental in ${s.scenario}.`),
    (id) => q(id, realmName, "competitive", "Master", 95, `Which statement best captures the engineering mindset needed for ${s.stem}?`, [
      `Design for uncertainty, measure the tails and make degradation observable and controllable.`,
      `Assume nominal conditions and optimize only the happy path.`,
      `Prioritize complexity even when simpler interfaces are safer.`,
      `Treat instrumentation as optional after deployment.`
    ], 0, `Robotics engineering is uncertainty management.`, `The most reliable engineering mindset is to expect imperfect sensing, imperfect models and imperfect timing - then build systems that remain diagnosable and safe anyway.`, `That principle guides ${s.scenario}.`),
    (id) => q(id, realmName, "competitive", "PhD", 100, `What is the best final systems-level takeaway for ${s.stem}?`, [
      `Performance matters, but trustworthy deployment comes from architecture, instrumentation and graceful behavior under stress.`,
      `Only theoretical optimality matters once a paper is published.`,
      `User-facing visuals are the only thing that determines robot success.`,
      `If one subsystem is accurate in isolation, the full stack is guaranteed to succeed.`
    ], 0, `Trustworthy deployment is broader than raw algorithmic performance.`, `${s.stem} becomes useful in practice when architecture, metrics, fallback behavior and deployment realism all support the algorithmic core.`, `That is what separates demos from durable systems in ${s.scenario}.`),
  ];

  return builders.map((fn, idx) => fn(baseId + idx));
}

const calmQuestionBank = CALM_REALMS.flatMap((realm, idx) => makeCalmQuestions(realm.name, 1000 + idx * 20));
const competitiveQuestionBank = COMPETITIVE_REALMS.flatMap((realm, idx) => makeCompetitiveQuestions(realm.name, 3000 + idx * 20));
const QUESTION_BANK = [...calmQuestionBank, ...competitiveQuestionBank];

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function normalizeQuestionsForTarget(bank) {
  const rawTotal = bank.reduce((sum, item) => sum + item.points, 0);
  if (!rawTotal) return bank;
  return bank.map((item) => {
    const scaled = Math.max(1, Math.round((item.points / rawTotal) * QUIZ_SCORE_TARGET));
    return { ...item, scaledPoints: scaled };
  });
}

function getDisplayedPoints(question) {
  return (question && (question.scaledPoints || question.points)) || 0;
}

function usePersistentNumber(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? Number(raw) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, String(value));
    } catch {
      // ignore
    }
  }, [key, value]);

  return [value, setValue];
}

function Card({ className = "", children }) {
  return <div className={`rounded-[28px] border ${className}`}>{children}</div>;
}

function CardContent({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

function Progress({ value = 0, color = "bg-blue-500", height = "h-2" }) {
  return (
    <div className={`w-full overflow-hidden rounded-full bg-slate-200/80 ${height}`}>
      <motion.div
        className={`h-full ${color} rounded-full`}
        animate={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
    </div>
  );
}

function Pill({ children, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-black tracking-wide ${className}`}>
      {children}
    </span>
  );
}

function buildQuestions(mode, realm) {
  const bank = QUESTION_BANK.filter((qItem) => qItem.mode === mode && qItem.realm === realm);
  return normalizeQuestionsForTarget(shuffleArray(bank));
}

export default function App() {
  const [view, setView] = useState("home");
  const [mode, setMode] = useState("calm");
  const [currentRealm, setCurrentRealm] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswerPanel, setShowAnswerPanel] = useState(false);
  const [autoRevealed, setAutoRevealed] = useState(false);
  const [questionTimeLeft, setQuestionTimeLeft] = useState(QUESTION_TIME_LIMIT);
  const [answerRevealCountdown, setAnswerRevealCountdown] = useState(AUTO_REVEAL_AFTER);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [streakGlow, setStreakGlow] = useState(false);
  const [bestCalmScore, setBestCalmScore] = usePersistentNumber("robotics_quiz_best_calm", 0);
  const [bestCompetitiveScore, setBestCompetitiveScore] = usePersistentNumber("robotics_quiz_best_competitive", 0);
  const [search, setSearch] = useState("");
  const revealTriggeredRef = useRef(false);

  const comp = mode === "competitive";
  const realms = mode === "competitive" ? COMPETITIVE_REALMS : CALM_REALMS;
  const filteredRealms = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return realms;
    return realms.filter((realm) => `${realm.name} ${realm.description}`.toLowerCase().includes(term));
  }, [realms, search]);

  const currentQuestion = questions[currentIndex];
  const currentQuestionPoints = getDisplayedPoints(currentQuestion);
  const questionTimerPercent = (questionTimeLeft / QUESTION_TIME_LIMIT) * 100;
  const revealTimerPercent = (answerRevealCountdown / AUTO_REVEAL_AFTER) * 100;
  const scorePercent = Math.min(100, Math.round((score / QUIZ_SCORE_TARGET) * 100));
  const bestScore = comp ? bestCompetitiveScore : bestCalmScore;

  useEffect(() => {
    if (!currentQuestion || showAnswerPanel) return;

    revealTriggeredRef.current = false;
    const timer = window.setInterval(() => {
      setQuestionTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
      setAnswerRevealCountdown((prev) => {
        if (prev <= 1 && !revealTriggeredRef.current) {
          revealTriggeredRef.current = true;
          setAutoRevealed(true);
          setShowAnswerPanel(true);
          setCombo(0);
          return 0;
        }
        return prev <= 1 ? 0 : prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [currentQuestion, showAnswerPanel]);

  useEffect(() => {
    setQuestionTimeLeft(QUESTION_TIME_LIMIT);
    setAnswerRevealCountdown(AUTO_REVEAL_AFTER);
    setSelectedOption(null);
    setShowAnswerPanel(false);
    setAutoRevealed(false);
    revealTriggeredRef.current = false;
  }, [currentIndex, questions]);

  useEffect(() => {
    if (view !== "results") return;
    if (comp) {
      if (score > bestCompetitiveScore) setBestCompetitiveScore(score);
    } else {
      if (score > bestCalmScore) setBestCalmScore(score);
    }
  }, [view, score, comp, bestCalmScore, bestCompetitiveScore, setBestCalmScore, setBestCompetitiveScore]);

  function startRealmQuiz(realm) {
    const built = buildQuestions(mode, realm.name);
    setCurrentRealm(realm);
    setQuestions(built);
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowAnswerPanel(false);
    setAutoRevealed(false);
    setQuestionTimeLeft(QUESTION_TIME_LIMIT);
    setAnswerRevealCountdown(AUTO_REVEAL_AFTER);
    setScore(0);
    setCombo(0);
    setCorrectAnswers(0);
    setView("quiz");
  }

  function handleAnswer(optionIdx) {
    if (!currentQuestion || showAnswerPanel) return;

    setSelectedOption(optionIdx);
    setShowAnswerPanel(true);

    const isCorrect = optionIdx === currentQuestion.answer;
    if (isCorrect) {
      const comboBonus = Math.min(combo * 25, 250);
      const earned = Math.min(QUIZ_SCORE_TARGET, currentQuestionPoints + comboBonus);
      setScore((prev) => Math.min(QUIZ_SCORE_TARGET, prev + earned));
      setCombo((prev) => prev + 1);
      setCorrectAnswers((prev) => prev + 1);
      setStreakGlow(true);
      window.setTimeout(() => setStreakGlow(false), 350);
    } else {
      setCombo(0);
    }
  }

  function handleReveal() {
    if (showAnswerPanel) return;
    setSelectedOption(null);
    setShowAnswerPanel(true);
    setCombo(0);
  }

  function goToNextQuestion() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setView("results");
    }
  }

  function restartCurrentMode() {
    setCurrentRealm(null);
    setQuestions([]);
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowAnswerPanel(false);
    setAutoRevealed(false);
    setQuestionTimeLeft(QUESTION_TIME_LIMIT);
    setAnswerRevealCountdown(AUTO_REVEAL_AFTER);
    setScore(0);
    setCombo(0);
    setCorrectAnswers(0);
    setView("realms");
  }

  return (
    <div className={`min-h-screen w-full ${comp ? "bg-black text-white" : "bg-gradient-to-br from-emerald-50 via-white to-cyan-50 text-slate-900"}`}>
      <div className={`fixed inset-0 pointer-events-none ${comp ? "bg-[radial-gradient(circle_at_top,_rgba(255,0,0,0.18),_transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(255,120,0,0.14),_transparent_34%)]" : "bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.16),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(6,182,212,0.14),_transparent_34%)]"}`} />
      <div className="relative mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        {view === "home" && (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card className={`${comp ? "border-red-900/40 bg-black/70" : "border-emerald-100 bg-white/80"} shadow-2xl backdrop-blur-xl`}>
              <CardContent className="p-6 md:p-8 lg:p-10">
                <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                  <div className="space-y-5">
                    <Pill className={comp ? "bg-red-950 text-red-200 border border-red-800/40" : "bg-emerald-50 text-emerald-700 border border-emerald-200"}>
                      🚀 Physical AI Mission Quiz
                    </Pill>
                    <div>
                      <h1 className={`text-4xl md:text-5xl lg:text-6xl font-black leading-tight ${comp ? "text-white" : "text-slate-900"}`}>
                        Master robotics fundamentals and battle through advanced realms.
                      </h1>
                      <p className={`mt-4 max-w-3xl text-base md:text-lg leading-relaxed ${comp ? "text-red-100/80" : "text-slate-600"}`}>
                        Calm mode is concept-first and easier. Competitive mode is Masters / PhD level, faster-paced, and built around high-end robotics systems thinking across planning, learning, communication, deployment and embodiment.
                      </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div className={`rounded-3xl border p-5 ${comp ? "border-red-900/40 bg-red-950/30" : "border-emerald-100 bg-emerald-50/70"}`}>
                        <div className={`text-sm font-black ${comp ? "text-red-300" : "text-emerald-700"}`}>Competitive realms</div>
                        <div className="mt-2 text-3xl font-black">{COMPETITIVE_REALMS.length}</div>
                        <div className={`mt-1 text-sm ${comp ? "text-red-100/70" : "text-slate-500"}`}>including 12 new deep-tech sections</div>
                      </div>
                      <div className={`rounded-3xl border p-5 ${comp ? "border-red-900/40 bg-red-950/30" : "border-emerald-100 bg-emerald-50/70"}`}>
                        <div className={`text-sm font-black ${comp ? "text-red-300" : "text-emerald-700"}`}>Per-question timer</div>
                        <div className="mt-2 text-3xl font-black">60s</div>
                        <div className={`mt-1 text-sm ${comp ? "text-red-100/70" : "text-slate-500"}`}>answer clock + 2 min reveal clock</div>
                      </div>
                      <div className={`rounded-3xl border p-5 ${comp ? "border-red-900/40 bg-red-950/30" : "border-emerald-100 bg-emerald-50/70"}`}>
                        <div className={`text-sm font-black ${comp ? "text-red-300" : "text-emerald-700"}`}>Score target</div>
                        <div className="mt-2 text-3xl font-black">10000</div>
                        <div className={`mt-1 text-sm ${comp ? "text-red-100/70" : "text-slate-500"}`}>normalized across the chosen realm</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <button onClick={() => { setMode("calm"); setSearch(""); setView("realms"); }} className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-black text-white shadow-lg transition hover:translate-y-[-1px] hover:bg-emerald-500">
                        🌿 Start Calm Mode
                      </button>
                      <button onClick={() => { setMode("competitive"); setSearch(""); setView("realms"); }} className="rounded-2xl bg-red-600 px-5 py-3 text-sm font-black text-white shadow-lg transition hover:translate-y-[-1px] hover:bg-red-500">
                        ⚡ Start Competitive Mode
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {[
                      ["ROS2", "QoS, DDS, TF, lifecycle nodes"],
                      ["Cloud Robotics", "Docker, fleets, observability, OTA"],
                      ["Robot Communication", "RF, TCP/UDP, middleware reliability"],
                      ["Dexterity", "hands, soft robotics, tactile feedback"],
                    ].map(([title, text], idx) => (
                      <motion.div key={title} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.07 }} className={`rounded-[28px] border p-5 ${comp ? "border-red-900/40 bg-zinc-950/80" : "border-slate-200 bg-white/90"} shadow-lg`}>
                        <div className={`text-xs uppercase tracking-[0.18em] font-black ${comp ? "text-red-300" : "text-cyan-700"}`}>Featured realm</div>
                        <div className={`mt-2 text-xl font-black ${comp ? "text-white" : "text-slate-900"}`}>{title}</div>
                        <p className={`mt-2 text-sm leading-relaxed ${comp ? "text-red-100/75" : "text-slate-600"}`}>{text}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {view === "realms" && (
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <Pill className={comp ? "bg-red-950 text-red-200 border border-red-800/40" : "bg-emerald-50 text-emerald-700 border border-emerald-200"}>
                  {comp ? "⚡ Competitive mode" : "🌿 Calm mode"}
                </Pill>
                <h2 className={`mt-3 text-3xl md:text-4xl font-black ${comp ? "text-white" : "text-slate-900"}`}>
                  Choose your realm
                </h2>
                <p className={`mt-2 text-sm md:text-base ${comp ? "text-red-100/75" : "text-slate-600"}`}>
                  {comp ? "20 advanced sections. Each competitive realm contains 15 questions." : "10 easier sections with concept-first questions and explanations."}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search a topic..."
                  className={`w-full md:w-72 rounded-2xl border px-4 py-3 text-sm outline-none ${comp ? "border-red-900/40 bg-zinc-950 text-white placeholder:text-red-200/45 focus:border-red-500" : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-500"}`}
                />
                <button onClick={() => setView("home")} className={`rounded-2xl px-4 py-3 text-sm font-black border ${comp ? "border-red-900/40 bg-zinc-950 text-red-100 hover:bg-red-950/40" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}>
                  ← Back
                </button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredRealms.map((realm, idx) => (
                <motion.button key={realm.name} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.025 }} onClick={() => startRealmQuiz(realm)} className={`group relative overflow-hidden rounded-[30px] border p-5 text-left shadow-xl transition hover:-translate-y-1 ${comp ? "border-red-900/40 bg-zinc-950/90" : "border-white/80 bg-white/90"}`}>
                  <div className={`absolute inset-0 bg-gradient-to-br opacity-95 ${realm.color}`} />
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-4xl">{realm.icon}</div>
                      <div className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-black tracking-wide text-white backdrop-blur">
                        {comp ? "15 questions" : "10 questions"}
                      </div>
                    </div>
                    <div className="mt-5">
                      <div className="text-2xl font-black text-white">{realm.name}</div>
                      <p className="mt-2 text-sm leading-relaxed text-white/90">{realm.description}</p>
                    </div>
                    <div className="mt-6 flex items-center justify-between text-sm font-black text-white">
                      <span>Start quiz</span>
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
            <div className={`rounded-[32px] border p-5 md:p-6 shadow-2xl backdrop-blur-xl ${comp ? "border-red-900/50 bg-black/70" : "border-emerald-100 bg-white/80"}`}>
              <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <Pill className={comp ? "bg-red-950 text-red-200 border border-red-700/40" : "bg-emerald-50 text-emerald-700 border border-emerald-200"}>
                    {comp ? "⚡ COMPETITIVE MODE" : "🌿 CALM MODE"}
                  </Pill>
                  <h2 className={`mt-3 text-2xl md:text-3xl font-black ${comp ? "text-white" : "text-slate-900"}`}>
                    {currentRealm.icon} {currentRealm.name}
                  </h2>
                  <p className={`${comp ? "text-red-200/70" : "text-slate-500"} mt-1 text-sm`}>
                    Question {currentIndex + 1} of {questions.length}
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 min-w-full xl:min-w-[680px]">
                  <div className={`rounded-2xl p-4 border ${comp ? "border-red-800/50 bg-red-950/40" : "border-emerald-100 bg-emerald-50"}`}>
                    <div className={`text-xs uppercase font-bold ${comp ? "text-red-300" : "text-emerald-700"}`}>Score</div>
                    <div className={`text-2xl font-black ${comp ? "text-white" : "text-slate-900"}`}>{score}</div>
                    <div className={`text-[11px] ${comp ? "text-red-200/70" : "text-slate-500"}`}>out of 10000</div>
                  </div>

                  <div className={`rounded-2xl p-4 border ${streakGlow ? (comp ? "border-red-500 bg-red-900/40" : "border-emerald-400 bg-emerald-100") : (comp ? "border-red-800/50 bg-red-950/40" : "border-emerald-100 bg-emerald-50")}`}>
                    <div className={`text-xs uppercase font-bold ${comp ? "text-red-300" : "text-emerald-700"}`}>Combo</div>
                    <div className={`text-2xl font-black ${comp ? "text-white" : "text-slate-900"}`}>x{combo}</div>
                    <div className={`text-[11px] ${comp ? "text-red-200/70" : "text-slate-500"}`}>streak bonus</div>
                  </div>

                  <div className={`rounded-2xl p-4 border ${comp ? "border-red-800/50 bg-red-950/40" : "border-emerald-100 bg-emerald-50"}`}>
                    <div className={`text-xs uppercase font-bold ${comp ? "text-red-300" : "text-emerald-700"}`}>Answer In</div>
                    <div className={`text-2xl font-black ${questionTimeLeft <= 10 ? "text-amber-400" : comp ? "text-white" : "text-slate-900"}`}>{questionTimeLeft}s</div>
                    <div className={`text-[11px] ${comp ? "text-red-200/70" : "text-slate-500"}`}>1-minute timer</div>
                  </div>

                  <div className={`rounded-2xl p-4 border ${comp ? "border-red-800/50 bg-red-950/40" : "border-emerald-100 bg-emerald-50"}`}>
                    <div className={`text-xs uppercase font-bold ${comp ? "text-red-300" : "text-emerald-700"}`}>Reveal In</div>
                    <div className={`text-2xl font-black ${answerRevealCountdown <= 15 ? "text-pink-400" : comp ? "text-white" : "text-slate-900"}`}>{answerRevealCountdown}s</div>
                    <div className={`text-[11px] ${comp ? "text-red-200/70" : "text-slate-500"}`}>auto-answer at 2 min</div>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div>
                  <div className="mb-1 flex items-center justify-between text-[11px] font-bold">
                    <span className={comp ? "text-red-300" : "text-emerald-700"}>Answer Timer</span>
                    <span className={comp ? "text-red-200/70" : "text-slate-500"}>{questionTimeLeft}s left</span>
                  </div>
                  <Progress value={questionTimerPercent} color={comp ? (questionTimeLeft <= 10 ? "bg-amber-400" : "bg-red-500") : (questionTimeLeft <= 10 ? "bg-amber-400" : "bg-emerald-500")} height="h-3" />
                </div>

                <div>
                  <div className="mb-1 flex items-center justify-between text-[11px] font-bold">
                    <span className={comp ? "text-pink-300" : "text-cyan-700"}>Auto-Reveal Timer</span>
                    <span className={comp ? "text-red-200/70" : "text-slate-500"}>{answerRevealCountdown}s left</span>
                  </div>
                  <Progress value={revealTimerPercent} color={comp ? "bg-pink-500" : "bg-cyan-500"} height="h-2.5" />
                </div>
              </div>
            </div>

            <div className={`rounded-[32px] border p-5 md:p-6 shadow-xl ${comp ? "border-red-900/50 bg-zinc-950 text-white" : "border-emerald-100 bg-white text-slate-900"}`}>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Pill className={comp ? "bg-red-900/60 text-red-200 border border-red-800/50" : "bg-emerald-50 text-emerald-700 border border-emerald-200"}>{currentQuestion.difficulty}</Pill>
                <Pill className={comp ? "bg-black text-red-300 border border-red-900/50" : "bg-slate-50 text-slate-700 border border-slate-200"}>{currentQuestionPoints} pts</Pill>
                {autoRevealed && <Pill className="bg-amber-500/20 text-amber-300 border border-amber-500/30">Auto-Revealed</Pill>}
              </div>

              <h3 className="text-xl md:text-2xl font-black leading-snug">{currentQuestion.prompt}</h3>

              <div className="mt-5 grid gap-3">
                {currentQuestion.options.map((option, idx) => {
                  const isCorrect = idx === currentQuestion.answer;
                  const isPicked = idx === selectedOption;

                  let optionClass = comp ? "border-red-900/40 bg-black/50 hover:bg-red-950/40 text-red-50" : "border-emerald-100 bg-slate-50 hover:bg-emerald-50 text-slate-900";
                  if (showAnswerPanel && isCorrect) optionClass = "border-emerald-500 bg-emerald-500/10 text-emerald-300";
                  if (showAnswerPanel && isPicked && !isCorrect) optionClass = "border-rose-500 bg-rose-500/10 text-rose-300";

                  return (
                    <motion.button key={idx} whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => handleAnswer(idx)} disabled={showAnswerPanel} className={`w-full text-left rounded-[22px] border px-4 py-4 transition-all ${optionClass}`}>
                      <div className="flex items-start gap-3">
                        <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${showAnswerPanel && isCorrect ? "bg-emerald-500 text-white" : showAnswerPanel && isPicked && !isCorrect ? "bg-rose-500 text-white" : comp ? "bg-red-950 text-red-200 border border-red-800/40" : "bg-white text-slate-700 border border-slate-200"}`}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <div className="text-sm md:text-base leading-relaxed">{option}</div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {!showAnswerPanel ? (
                  <button onClick={handleReveal} className={`rounded-2xl px-4 py-3 text-sm font-black border ${comp ? "border-red-800/50 bg-red-950/40 text-red-100 hover:bg-red-900/40" : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
                    Reveal Answer
                  </button>
                ) : (
                  <button onClick={goToNextQuestion} className={`rounded-2xl px-5 py-3 text-sm font-black border ${comp ? "border-red-500 bg-red-600 text-white hover:bg-red-500" : "border-emerald-500 bg-emerald-600 text-white hover:bg-emerald-500"}`}>
                    {currentIndex < questions.length - 1 ? "Next Question" : "See Results"}
                  </button>
                )}

                <button onClick={() => setView("realms")} className={`rounded-2xl px-4 py-3 text-sm font-black border ${comp ? "border-red-900/40 bg-black/60 text-red-100 hover:bg-red-950/30" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}>
                  Exit Realm
                </button>
              </div>

              <AnimatePresence>
                {showAnswerPanel && (
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className={`mt-5 rounded-[28px] border p-5 ${comp ? "border-red-900/50 bg-black/40" : "border-emerald-100 bg-emerald-50/50"}`}>
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-black text-white">Correct Answer</span>
                      <span className={`text-sm font-bold ${comp ? "text-red-100" : "text-slate-700"}`}>
                        {String.fromCharCode(65 + currentQuestion.answer)}. {currentQuestion.options[currentQuestion.answer]}
                      </span>
                    </div>

                    <div className={`space-y-2 text-sm leading-relaxed ${comp ? "text-red-50/90" : "text-slate-700"}`}>
                      <p><span className="font-black">Hint:</span> {currentQuestion.hint}</p>
                      <p><span className="font-black">Explanation:</span> {currentQuestion.explain}</p>
                      <p><span className="font-black">Example:</span> {currentQuestion.example}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {view === "results" && currentRealm && (
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            <div className={`rounded-[32px] border p-6 shadow-2xl ${comp ? "border-red-900/50 bg-black/70 text-white" : "border-emerald-100 bg-white text-slate-900"}`}>
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className={`text-xs font-black uppercase tracking-[0.2em] ${comp ? "text-red-300" : "text-emerald-700"}`}>Final Score</div>
                  <div className="mt-2 text-5xl md:text-6xl font-black">{score}</div>
                  <div className={`mt-2 text-sm ${comp ? "text-red-100/70" : "text-slate-500"}`}>Target: {QUIZ_SCORE_TARGET} points</div>
                </div>

                <div className="w-full md:w-[360px]">
                  <div className="mb-2 flex justify-between text-sm font-bold">
                    <span className={comp ? "text-red-300" : "text-emerald-700"}>Completion Score</span>
                    <span>{scorePercent}%</span>
                  </div>
                  <Progress value={scorePercent} color={comp ? "bg-red-500" : "bg-emerald-500"} height="h-4" />
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-4">
                <div className={`rounded-3xl border p-5 ${comp ? "border-red-900/40 bg-zinc-950/70" : "border-emerald-100 bg-emerald-50/70"}`}>
                  <div className={`text-xs font-black uppercase ${comp ? "text-red-300" : "text-emerald-700"}`}>Realm</div>
                  <div className="mt-2 text-xl font-black">{currentRealm.name}</div>
                </div>
                <div className={`rounded-3xl border p-5 ${comp ? "border-red-900/40 bg-zinc-950/70" : "border-emerald-100 bg-emerald-50/70"}`}>
                  <div className={`text-xs font-black uppercase ${comp ? "text-red-300" : "text-emerald-700"}`}>Correct</div>
                  <div className="mt-2 text-xl font-black">{correctAnswers} / {questions.length}</div>
                </div>
                <div className={`rounded-3xl border p-5 ${comp ? "border-red-900/40 bg-zinc-950/70" : "border-emerald-100 bg-emerald-50/70"}`}>
                  <div className={`text-xs font-black uppercase ${comp ? "text-red-300" : "text-emerald-700"}`}>Mode Best</div>
                  <div className="mt-2 text-xl font-black">{Math.max(bestScore, score)}</div>
                </div>
                <div className={`rounded-3xl border p-5 ${comp ? "border-red-900/40 bg-zinc-950/70" : "border-emerald-100 bg-emerald-50/70"}`}>
                  <div className={`text-xs font-black uppercase ${comp ? "text-red-300" : "text-emerald-700"}`}>Level</div>
                  <div className="mt-2 text-xl font-black">
                    {scorePercent >= 90 ? "Elite" : scorePercent >= 75 ? "Strong" : scorePercent >= 55 ? "Solid" : "Keep Training"}
                  </div>
                </div>
              </div>
            </div>

            <div className={`rounded-[32px] border p-6 ${comp ? "border-red-900/50 bg-zinc-950/80" : "border-emerald-100 bg-white"} shadow-xl`}>
              <h3 className={`text-2xl font-black ${comp ? "text-white" : "text-slate-900"}`}>What changed in this rebuilt app</h3>
              <div className={`mt-4 grid gap-3 md:grid-cols-2 ${comp ? "text-red-100/80" : "text-slate-600"}`}>
                <div className={`rounded-2xl border p-4 ${comp ? "border-red-900/30 bg-black/40" : "border-slate-200 bg-slate-50"}`}>12 new competitive sections with 15 questions each</div>
                <div className={`rounded-2xl border p-4 ${comp ? "border-red-900/30 bg-black/40" : "border-slate-200 bg-slate-50"}`}>1-minute question timer + answer auto-reveal at 2 minutes</div>
                <div className={`rounded-2xl border p-4 ${comp ? "border-red-900/30 bg-black/40" : "border-slate-200 bg-slate-50"}`}>Normalized scoring toward a 10000-point target</div>
                <div className={`rounded-2xl border p-4 ${comp ? "border-red-900/30 bg-black/40" : "border-slate-200 bg-slate-50"}`}>More visual UI with streak combo, progress bars and better option cards</div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button onClick={restartCurrentMode} className={`rounded-2xl px-5 py-3 text-sm font-black ${comp ? "bg-red-600 text-white hover:bg-red-500" : "bg-emerald-600 text-white hover:bg-emerald-500"}`}>
                  Play Another Realm
                </button>
                <button onClick={() => { setView("home"); setCurrentRealm(null); setQuestions([]); setSearch(""); }} className={`rounded-2xl px-5 py-3 text-sm font-black border ${comp ? "border-red-900/40 bg-black text-red-100 hover:bg-red-950/30" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}>
                  Return Home
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

