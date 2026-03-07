import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// GitHub/Vite-ready single-file version
// Save this file as: src/App.jsx
// Install dependency: npm install framer-motion

function Card({ className = "", children }) {
  return <div className={`bg-white ${className}`}>{children}</div>;
}

function CardHeader({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

function CardContent({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

function CardTitle({ className = "", children }) {
  return <h3 className={className}>{children}</h3>;
}

function Button({ className = "", variant = "default", children, ...props }) {
  const base = "inline-flex items-center justify-center rounded-md px-4 py-2 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const styles = variant === "secondary"
    ? "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50"
    : "bg-blue-600 text-white hover:bg-blue-500";
  return <button className={`${base} ${styles} ${className}`} {...props}>{children}</button>;
}

function Badge({ className = "", children }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}>{children}</span>;
}

function Progress({ value = 0, className = "" }) {
  return (
    <div className={`w-full overflow-hidden rounded-full bg-slate-200 ${className}`}>
      <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

function Input({ className = "", ...props }) {
  return <input className={`w-full border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-300 ${className}`} {...props} />;
}

const EASY_REALMS = [
  {
    name: "Kinematics",
    description: "Basic position, orientation and motion relationships in robot mechanisms.",
  },
  {
    name: "Control",
    description: "Foundations of feedback, PID, stability and trajectory tracking in robots.",
  },
  {
    name: "SLAM & Estimation",
    description: "Core ideas behind localization, mapping, filtering and sensor fusion.",
  },
  {
    name: "Dynamics",
    description: "Basic force, inertia, torque and equations-of-motion concepts in robotics.",
  },
  {
    name: "Perception",
    description: "Vision, depth, calibration and sensing basics for robot scene understanding.",
  },
  {
    name: "Machine Learning",
    description: "Basic learning concepts used in robot perception, prediction and decision-making.",
  },
  {
    name: "Linear Algebra",
    description: "Matrices, vectors and transformations that support robotics modeling and motion.",
  },
  {
    name: "Probability",
    description: "Uncertainty, estimation and Bayesian ideas used in SLAM and robotics sensing.",
  },
  {
    name: "Manipulators",
    description: "Foundations of robot arms, kinematics, Jacobians and workspace reasoning.",
  },
  {
    name: "Computation",
    description: "CPU, GPU and accelerator basics for robotics software and AI workloads.",
  },
];

const HARD_REALMS = [
  {
    name: "Numerical Optimization",
    description: "Optimization methods for planning, control and estimation in robotics.",
  },
  {
    name: "Reinforcement Learning",
    description: "Policy learning, value functions and modern robot learning ideas.",
  },
  {
    name: "Foundation Models",
    description: "Large multimodal models, robot reasoning and embodied AI concepts.",
  },
  {
    name: "Aerial Robotics",
    description: "UAV dynamics, estimation, planning and advanced flight-control ideas.",
  },
  {
    name: "Underwater Robotics",
    description: "Navigation, localization and sensing challenges for underwater systems.",
  },
  {
    name: "Autonomous Driving",
    description: "Perception, planning, occupancy reasoning and end-to-end driving concepts.",
  },
];

function q(id, realm, mode, difficulty, points, prompt, options, answer, hint, explain, example) {
  return { id, realm, mode, difficulty, points, prompt, options, answer, hint, explain, example };
}

const QUESTION_BANK = [
  // EASY — Kinematics
  q(1001, "Kinematics", "easy", "Easy", 10, "What does forward kinematics compute?", [
    "End-effector pose from known joint variables.",
    "Joint torques from known end-effector pose.",
    "Battery voltage from known joint variables.",
    "Sensor covariance from known workspace pose.",
  ], 0, "Joint values in, pose out.", "Forward kinematics maps joint coordinates to the position and orientation of the end effector.", "A robot arm uses forward kinematics to determine where its gripper is in space."),
  q(1002, "Kinematics", "easy", "Easy", 10, "What is inverse kinematics?", [
    "Finding joint variables that achieve a desired end-effector pose.",
    "Finding torques that achieve a desired battery state.",
    "Finding sensor gains that achieve a desired image pose.",
    "Finding covariance values that achieve a desired workspace.",
  ], 0, "Desired pose, unknown joints.", "Inverse kinematics solves for the joint configuration that realizes a requested Cartesian pose.", "A manipulator solving for joint angles to reach a target point uses inverse kinematics."),
  q(1003, "Kinematics", "easy", "Easy", 10, "What does a rotation matrix represent?", [
    "Orientation of one coordinate frame relative to another.",
    "Translation of one coordinate frame relative to another.",
    "Covariance of one sensor relative to another.",
    "Velocity of one actuator relative to another.",
  ], 0, "Orientation only.", "A rotation matrix describes how axes are oriented between frames while preserving lengths and angles.", "Camera and robot-base frame alignment is often represented with a rotation matrix."),
  q(1004, "Kinematics", "easy", "Easy", 10, "What is a homogeneous transformation matrix used for?", [
    "Combining rotation and translation in one rigid-body transform.",
    "Combining torque and current in one motor model.",
    "Combining probability and covariance in one estimator step.",
    "Combining reward and action in one policy model.",
  ], 0, "Pose composition.", "Homogeneous transforms allow rigid motions to be chained with simple matrix multiplication.", "Serial robot links are often connected using homogeneous transforms."),
  q(1005, "Kinematics", "easy", "Easy", 10, "What does the Jacobian relate in robot kinematics?", [
    "Joint velocities to end-effector velocities.",
    "Joint torques to battery voltages.",
    "Joint positions to sensor noise.",
    "Joint currents to image coordinates.",
  ], 0, "Differential motion mapping.", "The Jacobian maps small changes or rates in joint space into task-space motion.", "It is used for velocity control and singularity analysis."),
  q(1006, "Kinematics", "easy", "Easy", 10, "Why can inverse kinematics have multiple solutions?", [
    "Different joint configurations can reach the same end-effector pose.",
    "Different battery states can reach the same end-effector pose.",
    "Different sensor models can reach the same end-effector pose.",
    "Different cost functions can reach the same end-effector pose.",
  ], 0, "Elbow-up versus elbow-down.", "Many robot geometries allow more than one joint arrangement to reach the same Cartesian target.", "A planar arm commonly has two configurations for one reachable point."),
  q(1007, "Kinematics", "easy", "Easy", 10, "What is a singularity in kinematics?", [
    "A configuration where the Jacobian loses rank and motion capability drops.",
    "A configuration where the inertia matrix becomes diagonal and motion improves.",
    "A configuration where every joint angle becomes zero.",
    "A configuration where all sensors become fully observable.",
  ], 0, "Rank loss is the clue.", "At a singularity, some Cartesian directions become difficult or impossible to generate cleanly.", "Near singularities, small Cartesian commands can require large joint velocities."),
  q(1008, "Kinematics", "easy", "Easy", 10, "What is a robot workspace?", [
    "The set of positions or poses the robot end effector can reach.",
    "The set of torques the robot controller can stabilize.",
    "The set of images the robot can classify.",
    "The set of covariances the robot filter can estimate.",
  ], 0, "Reachability region.", "Workspace describes the reachable geometric region of the robot end effector.", "Joint limits reduce the practical workspace of a manipulator."),
  q(1009, "Kinematics", "easy", "Easy", 10, "What do DH parameters describe?", [
    "Geometric relationships between successive robot links.",
    "Probability relationships between successive sensor updates.",
    "Dynamic relationships between successive torque inputs.",
    "Visual relationships between successive image frames.",
  ], 0, "Serial-link geometry.", "Denavit–Hartenberg parameters provide a systematic way to define serial manipulator geometry.", "They are often used to derive forward kinematics."),
  q(1010, "Kinematics", "easy", "Easy", 10, "What does a prismatic joint allow?", [
    "Linear translation along a joint axis.",
    "Pure rotation about a joint axis.",
    "Pure probability shift in state space.",
    "Pure acceleration in image space.",
  ], 0, "Translation, not rotation.", "A prismatic joint produces translational motion, unlike a revolute joint which produces rotation.", "A sliding-axis actuator is a prismatic-joint example."),

  // EASY — Control
  q(1011, "Control", "easy", "Easy", 10, "What is the purpose of feedback control?", [
    "To reduce error by using measurements of the system output.",
    "To remove measurements and use only open-loop commands.",
    "To estimate probability distributions without sensors.",
    "To replace all dynamics with static maps.",
  ], 0, "Measured output matters.", "Feedback control compares desired and measured behavior and corrects error in real time.", "A speed controller uses encoder feedback to maintain target velocity."),
  q(1012, "Control", "easy", "Easy", 10, "What does the proportional term in a PID controller do?", [
    "Applies control effort proportional to the current error.",
    "Applies control effort proportional to the future reward.",
    "Applies control effort proportional to the covariance matrix.",
    "Applies control effort proportional to the joint limit only.",
  ], 0, "Current error response.", "The proportional term reacts directly to the present tracking error.", "Larger error produces larger corrective effort."),
  q(1013, "Control", "easy", "Easy", 10, "What does the integral term in PID help remove?", [
    "Steady-state error caused by persistent bias or disturbance.",
    "Instantaneous sensor noise in a single sample.",
    "All nonlinearities in the plant model.",
    "All delay in the communication channel.",
  ], 0, "Accumulated error.", "Integral action sums error over time and can eliminate constant offsets.", "A motor with friction bias may need integral action to hit the exact target speed."),
  q(1014, "Control", "easy", "Easy", 10, "What does the derivative term in PID mainly respond to?", [
    "The rate of change of the error.",
    "The probability of the error.",
    "The position of the control input.",
    "The covariance of the output signal.",
  ], 0, "Error slope.", "Derivative action reacts to how fast the error is changing and can improve damping.", "It is often used to reduce overshoot."),
  q(1015, "Control", "easy", "Easy", 10, "Why is closed-loop control usually preferred over open-loop control?", [
    "It can correct for disturbances and model mismatch using feedback.",
    "It never needs sensors or observations.",
    "It guarantees global optimality for every robot.",
    "It removes all actuator limits from the system.",
  ], 0, "Feedback corrects deviations.", "Closed-loop controllers adapt to actual system behavior instead of assuming the model is perfect.", "Payload changes can be compensated through feedback."),
  q(1016, "Control", "easy", "Easy", 10, "What is setpoint tracking?", [
    "Driving the system output to follow a desired reference value.",
    "Driving the robot state to maximize covariance.",
    "Driving the battery voltage to equal the sensor noise.",
    "Driving the map to match the Jacobian matrix.",
  ], 0, "Follow the reference.", "Setpoint tracking means the controller tries to keep the output close to the commanded target.", "A temperature controller or joint-angle controller both perform setpoint tracking."),
  q(1017, "Control", "easy", "Easy", 10, "What is actuator saturation?", [
    "A condition where demanded control exceeds physical actuator limits.",
    "A condition where sensor noise exceeds filter covariance.",
    "A condition where robot pose exceeds camera field of view.",
    "A condition where probability exceeds one.",
  ], 0, "Physical limits matter.", "Actuators cannot deliver infinite torque, speed or voltage, so commands may clip at physical limits.", "Motor voltage saturation is common in practice."),
  q(1018, "Control", "easy", "Easy", 10, "What is stability in control?", [
    "The tendency of a system to remain bounded and return near equilibrium after disturbance.",
    "The tendency of a system to maximize error after disturbance.",
    "The tendency of a system to increase battery voltage after disturbance.",
    "The tendency of a system to randomize its sensor outputs after disturbance.",
  ], 0, "Bounded behavior.", "A stable system does not diverge uncontrollably when perturbed.", "Balance control for a robot depends critically on stability."),
  q(1019, "Control", "easy", "Easy", 10, "Why are constraints important in robot control?", [
    "Robots must obey limits such as torque, speed, angle and safety bounds.",
    "Constraints only matter in probability theory and not in robots.",
    "Constraints remove the need for models and sensors.",
    "Constraints guarantee zero tracking error automatically.",
  ], 0, "Physical and safety bounds.", "Control design must respect what the robot can safely and physically do.", "Joint-limit and torque-limit handling are common examples."),
  q(1020, "Control", "easy", "Easy", 10, "What is feedforward control?", [
    "Using a model or reference information to apply anticipatory control action.",
    "Using only feedback error and no model information.",
    "Using only probability distributions without actuation.",
    "Using only image features to set battery state.",
  ], 0, "Anticipatory control.", "Feedforward uses expected system behavior to improve tracking before error appears.", "Computed torque control includes a feedforward dynamics term."),

  // EASY — SLAM & Estimation
  q(1021, "SLAM & Estimation", "easy", "Easy", 10, "What is the main goal of SLAM?", [
    "To estimate robot pose while simultaneously building a map.",
    "To estimate motor current while simultaneously building a controller.",
    "To estimate battery state while simultaneously building a planner.",
    "To estimate camera intrinsics while simultaneously building a dataset.",
  ], 0, "Localization plus mapping.", "SLAM stands for Simultaneous Localization and Mapping and solves both problems together.", "A robot in an unknown building often relies on SLAM."),
  q(1022, "SLAM & Estimation", "easy", "Easy", 10, "What is odometry?", [
    "An estimate of motion obtained from onboard sensors over time.",
    "An estimate of battery life obtained from charging history.",
    "An estimate of image segmentation obtained from labels.",
    "An estimate of control gain obtained from optimization.",
  ], 0, "Incremental motion estimate.", "Odometry tracks relative motion from wheel encoders, visual features, inertial sensors or similar sources.", "It is useful but usually drifts over time."),
  q(1023, "SLAM & Estimation", "easy", "Easy", 10, "What is a Kalman filter used for?", [
    "Recursive state estimation from noisy measurements and a system model.",
    "Recursive trajectory optimization from noiseless measurements only.",
    "Recursive battery control from image segmentation.",
    "Recursive joint calibration from end-effector torque only.",
  ], 0, "Prediction plus update.", "A Kalman filter combines model prediction and observation correction for linear-Gaussian systems.", "It is widely used for robotics state estimation."),
  q(1024, "SLAM & Estimation", "easy", "Easy", 10, "What is sensor fusion?", [
    "Combining information from multiple sensors to improve estimation.",
    "Combining multiple actuators to reduce battery use.",
    "Combining multiple maps to eliminate all uncertainty.",
    "Combining multiple reward functions to form one controller.",
  ], 0, "Multiple sensors, better estimate.", "Different sensors provide complementary information and failure modes, so fusion improves robustness.", "IMU plus camera plus wheel encoder fusion is common."),
  q(1025, "SLAM & Estimation", "easy", "Easy", 10, "What is loop closure in SLAM?", [
    "Recognizing a previously visited place to reduce accumulated drift.",
    "Recognizing a previously visited control law to increase reward.",
    "Recognizing a previously visited Jacobian to remove torque.",
    "Recognizing a previously visited battery state to reset the map.",
  ], 0, "Revisiting a place.", "Loop closure adds constraints when the robot detects it has returned to a known location.", "This helps correct map and trajectory drift."),
  q(1026, "SLAM & Estimation", "easy", "Easy", 10, "What is a state estimate?", [
    "The robot's best current guess of variables such as pose or velocity.",
    "The robot's best current guess of only battery chemistry.",
    "The robot's best current guess of only neural-network architecture.",
    "The robot's best current guess of only workspace size.",
  ], 0, "Best guess under uncertainty.", "State estimation aims to recover hidden variables needed for control and planning.", "Pose, velocity and bias are common estimated states."),
  q(1027, "SLAM & Estimation", "easy", "Easy", 10, "Why does odometry drift over time?", [
    "Small errors accumulate when motion increments are integrated repeatedly.",
    "Because odometry has perfect corrections at every time step.",
    "Because covariance always goes to zero during motion.",
    "Because SLAM removes all process noise instantly.",
  ], 0, "Accumulated error.", "Even small measurement or modeling errors cause long-term drift if not corrected by external observations.", "Wheel slip is a classic source of odometric drift."),
  q(1028, "SLAM & Estimation", "easy", "Easy", 10, "What does EKF stand for?", [
    "Extended Kalman Filter.",
    "Estimated Kinematic Function.",
    "Embedded Kernel Framework.",
    "Expected Koopman Feature.",
  ], 0, "Nonlinear extension of KF.", "The Extended Kalman Filter handles nonlinear systems by locally linearizing them.", "It is used in many robotics estimation pipelines."),
  q(1029, "SLAM & Estimation", "easy", "Easy", 10, "Why are landmarks useful in localization?", [
    "They provide reference features the robot can reobserve to estimate its pose.",
    "They provide direct actuator torques for controller tuning.",
    "They provide battery voltages for navigation correction.",
    "They provide learning labels for Jacobian estimation.",
  ], 0, "Reference features.", "Landmarks help anchor the robot's estimate to the environment.", "AprilTags or visual corners often act as landmarks."),
  q(1030, "SLAM & Estimation", "easy", "Easy", 10, "What is measurement noise?", [
    "Random uncertainty or corruption in sensor observations.",
    "Deterministic control effort applied to the actuators.",
    "Guaranteed bias-free information from the environment.",
    "Rigid-body motion caused by wheel rotation.",
  ], 0, "Sensor uncertainty.", "Real sensors are imperfect, so readings often include random error and disturbances.", "Filters explicitly model measurement noise."),

  // EASY — Dynamics
  q(1031, "Dynamics", "easy", "Easy", 10, "What does robot dynamics study?", [
    "How forces and torques cause robot motion.",
    "How colors and textures cause image segmentation.",
    "How labels and datasets cause classification.",
    "How battery chemistry causes symbolic reasoning.",
  ], 0, "Motion from forces.", "Dynamics connects forces, torques, inertia and acceleration.", "It goes beyond purely geometric kinematics."),
  q(1032, "Dynamics", "easy", "Easy", 10, "What is torque?", [
    "A rotational effect of a force about an axis.",
    "A translational effect of a force along a line.",
    "A probabilistic effect of noise on a filter.",
    "A visual effect of light on a camera.",
  ], 0, "Rotational analogue of force.", "Torque describes how strongly a force tends to rotate a body about a point or axis.", "Motor torques drive robot joints."),
  q(1033, "Dynamics", "easy", "Easy", 10, "What is inertia?", [
    "Resistance of a body to changes in its motion.",
    "Ability of a body to amplify all control signals.",
    "Probability of a body remaining at zero velocity.",
    "Color response of a sensor to incoming light.",
  ], 0, "Resistance to acceleration.", "Inertia quantifies how difficult it is to change translational or rotational motion.", "Heavier or more spread-out bodies generally have higher inertia effects."),
  q(1034, "Dynamics", "easy", "Easy", 10, "What does gravity compensation do?", [
    "Applies control effort to counteract gravitational loading.",
    "Removes all measurement noise from the control loop.",
    "Makes the inertia matrix constant at all configurations.",
    "Converts kinematics directly into reinforcement learning.",
  ], 0, "Counteracts weight.", "Gravity compensation reduces the effort needed to hold or track positions against gravity.", "Robot arms often use model-based gravity compensation."),
  q(1035, "Dynamics", "easy", "Easy", 10, "What is inverse dynamics?", [
    "Computing required torques from desired motion and a dynamic model.",
    "Computing desired motion from required image labels.",
    "Computing sensor noise from required torques.",
    "Computing probability distributions from required acceleration only.",
  ], 0, "Desired motion in, torques out.", "Inverse dynamics calculates the actuation needed to produce a target acceleration, velocity or trajectory.", "It is common in model-based robot control."),
  q(1036, "Dynamics", "easy", "Easy", 10, "Why do robot links exhibit dynamic coupling?", [
    "Motion in one joint can affect forces and torques in other joints.",
    "Motion in one joint removes all forces in other joints.",
    "Motion in one joint changes camera calibration in other joints.",
    "Motion in one joint makes the robot fully linear everywhere.",
  ], 0, "Multi-body interaction.", "Because links are mechanically connected, accelerating one part of the robot influences others.", "This is important in fast manipulator motion."),
  q(1037, "Dynamics", "easy", "Easy", 10, "What is damping?", [
    "An effect that dissipates energy and reduces oscillation.",
    "An effect that increases energy and amplifies oscillation.",
    "An effect that removes mass from the robot model.",
    "An effect that converts torque directly into probability.",
  ], 0, "Dissipative effect.", "Damping opposes motion and helps reduce vibrations or overshoot.", "Mechanical systems often rely on damping for smoother behavior."),
  q(1038, "Dynamics", "easy", "Easy", 10, "What is the difference between kinematics and dynamics?", [
    "Kinematics describes motion geometry, while dynamics relates motion to forces.",
    "Kinematics describes forces, while dynamics describes only camera images.",
    "Kinematics describes probabilities, while dynamics describes labels.",
    "Kinematics describes optimization, while dynamics describes translation only.",
  ], 0, "Geometry vs causes.", "Kinematics says how things move; dynamics says why they move under applied forces and torques.", "Both are central in robotics."),
  q(1039, "Dynamics", "easy", "Easy", 10, "Why does mass distribution matter in robot motion?", [
    "It changes the robot's inertia and resistance to acceleration.",
    "It changes the robot's camera intrinsics directly.",
    "It changes the robot's probability distributions only.",
    "It changes the robot's reward function automatically.",
  ], 0, "Where the mass sits matters.", "Not just total mass but how that mass is distributed affects rotational and translational behavior.", "A stretched-out arm feels dynamically different from a tucked one."),
  q(1040, "Dynamics", "easy", "Easy", 10, "What is friction in robot dynamics?", [
    "A resistive force or torque opposing relative motion.",
    "A force that always increases acceleration without energy loss.",
    "A probability distribution over robot states.",
    "A coordinate transformation between moving frames.",
  ], 0, "Opposes motion.", "Friction can be useful or harmful, but it generally resists relative sliding or rotation.", "Wheel slip and joint stiction are common friction phenomena."),

  // EASY — Perception
  q(1041, "Perception", "easy", "Easy", 10, "Why is camera calibration important?", [
    "It recovers imaging parameters needed for geometric reasoning from pixels.",
    "It removes all uncertainty from robot localization.",
    "It converts joint torque directly into image depth.",
    "It guarantees object detection without training data.",
  ], 0, "Geometry from images.", "Calibration determines parameters such as focal length and distortion so image measurements can be interpreted correctly.", "Without calibration, 3D reconstruction is inaccurate."),
  q(1042, "Perception", "easy", "Easy", 10, "What is image segmentation?", [
    "Partitioning an image into meaningful regions or class labels.",
    "Partitioning a robot arm into torque regions or force labels.",
    "Partitioning a covariance matrix into battery regions.",
    "Partitioning a reward signal into velocity classes.",
  ], 0, "Labeling image regions.", "Segmentation assigns semantics to pixels or regions of an image.", "Robots use it to distinguish objects, floor and obstacles."),
  q(1043, "Perception", "easy", "Easy", 10, "Why is depth sensing useful for robots?", [
    "It provides geometric distance information about the scene.",
    "It directly provides actuator torque information about the scene.",
    "It directly provides reward information about the scene.",
    "It directly provides covariance gradients about the scene.",
  ], 0, "Distance to objects.", "Depth sensors help robots understand 3D structure for navigation and manipulation.", "An RGB-D camera is a common example."),
  q(1044, "Perception", "easy", "Easy", 10, "What is visual odometry?", [
    "Estimating motion by analyzing changes across image frames.",
    "Estimating torque by analyzing changes across motor currents.",
    "Estimating probability by analyzing changes across rewards.",
    "Estimating kinematics by analyzing changes across battery voltages.",
  ], 0, "Motion from images.", "Visual odometry tracks visual changes over time to infer camera or robot motion.", "It is useful in GPS-denied environments."),
  q(1045, "Perception", "easy", "Easy", 10, "What is a point cloud?", [
    "A collection of 3D points representing sampled scene geometry.",
    "A collection of 2D labels representing sampled reward geometry.",
    "A collection of torques representing sampled actuator geometry.",
    "A collection of probabilities representing sampled battery geometry.",
  ], 0, "3D sampled structure.", "Point clouds are common outputs of lidar, depth cameras and reconstruction systems.", "They are widely used for mapping and obstacle detection."),
  q(1046, "Perception", "easy", "Easy", 10, "Why is lighting variation hard for vision systems?", [
    "Because object appearance can change even when geometry stays the same.",
    "Because lighting changes always improve segmentation accuracy.",
    "Because lighting eliminates shadows and reflections automatically.",
    "Because lighting has no effect on camera measurements.",
  ], 0, "Appearance changes.", "Vision systems can struggle when brightness, shadows or reflections vary across environments.", "Robust models and preprocessing help reduce this sensitivity."),
  q(1047, "Perception", "easy", "Easy", 10, "What is sensor fusion in perception?", [
    "Combining multiple sensing modalities to improve scene understanding.",
    "Combining multiple actuators to improve scene understanding.",
    "Combining multiple reward signals to improve scene understanding.",
    "Combining multiple battery models to improve scene understanding.",
  ], 0, "Complementary sensing.", "Fusing camera, lidar, radar or IMU data can improve robustness and accuracy.", "Self-driving stacks often rely heavily on sensor fusion."),
  q(1048, "Perception", "easy", "Easy", 10, "What is object detection?", [
    "Finding and classifying objects in an image or scene.",
    "Finding and classifying torques in a dynamics equation.",
    "Finding and classifying states in a covariance matrix.",
    "Finding and classifying rewards in a policy network.",
  ], 0, "Locate and classify objects.", "Object detection predicts object categories and often bounding boxes or regions.", "Robots use it for picking, navigation and scene understanding."),
  q(1049, "Perception", "easy", "Easy", 10, "Why are extrinsic parameters important?", [
    "They describe how a sensor is positioned relative to the robot or another sensor.",
    "They describe how a loss function is positioned relative to the optimizer.",
    "They describe how a battery is positioned relative to the joint torque.",
    "They describe how a reward is positioned relative to the covariance matrix.",
  ], 0, "Sensor-to-robot transform.", "Extrinsic calibration tells the robot where the sensor sits in a common frame.", "This is essential for multi-sensor fusion."),
  q(1050, "Perception", "easy", "Easy", 10, "What is feature extraction in computer vision?", [
    "Computing informative descriptors or structures from image data.",
    "Computing informative torques or currents from image data.",
    "Computing informative rewards or gradients from image data.",
    "Computing informative masses or inertias from image data.",
  ], 0, "Useful image cues.", "Feature extraction identifies patterns such as corners, textures or learned descriptors that are useful for later tasks.", "Many perception pipelines begin with feature extraction or learned representations."),
  // EASY — Machine Learning
  q(1, "Machine Learning", "easy", "Easy", 10, "What does supervised learning require?", [
    "Training data with input-output label pairs.",
    "Training data with only unlabeled input samples.",
    "Training data with only reward trajectories.",
    "Training data with only latent state vectors.",
  ], 0, "Think labels.", "Supervised learning learns a mapping from inputs to outputs using labeled examples.", "Object detection datasets pair images with bounding-box or class labels."),
  q(2, "Machine Learning", "easy", "Easy", 10, "Why are convolutional neural networks useful in robot vision?", [
    "They exploit local spatial structure in images.",
    "They eliminate the need for training data in images.",
    "They directly compute dynamic equations from images.",
    "They replace probability models in all vision pipelines.",
  ], 0, "Think image filters and locality.", "CNNs use shared filters to capture local image patterns such as edges, corners and textures efficiently.", "A mobile robot camera pipeline often uses CNNs for detection or segmentation."),
  q(3, "Machine Learning", "easy", "Easy", 10, "What is overfitting in machine learning?", [
    "Performing well on training data but poorly on unseen data.",
    "Performing poorly on training data but well on unseen data.",
    "Performing equally on training and unseen data by construction.",
    "Performing only on reinforcement-learning datasets.",
  ], 0, "Generalization is the keyword.", "Overfitting happens when a model memorizes training patterns instead of learning features that generalize.", "A robot vision model trained only in one lab may fail outdoors."),
  q(4, "Machine Learning", "easy", "Easy", 10, "Why is train-validation-test splitting important?", [
    "It helps measure generalization without evaluating only on training data.",
    "It guarantees a model will never overfit the training data.",
    "It removes the need for hyperparameter tuning entirely.",
    "It ensures all classes have identical loss values.",
  ], 0, "Evaluation should be separated from training.", "Separate splits help tune models and estimate real-world performance more honestly.", "A grasp classifier can look strong on training images but fail on held-out scenes."),
  q(5, "Machine Learning", "easy", "Easy", 10, "What does a loss function do during training?", [
    "It quantifies prediction error so model parameters can be updated.",
    "It directly stores learned parameters after each epoch.",
    "It converts labels into actuator commands for robots.",
    "It removes all gradient noise from optimization.",
  ], 0, "It measures how wrong the prediction is.", "A loss function provides the optimization objective used to improve the model.", "Cross-entropy is common for classification tasks."),
  q(6, "Machine Learning", "easy", "Easy", 10, "What is a feature in machine learning?", [
    "An informative input variable used by a model.",
    "An informative output label produced by a model.",
    "A hidden optimizer step produced by a model.",
    "A final loss value used as robot state.",
  ], 0, "Feature means useful signal in the input.", "Features are measurable properties or learned representations used to make predictions.", "Image edges, depth values or IMU statistics can all be features."),
  q(7, "Machine Learning", "easy", "Easy", 10, "Why is normalization often applied before training a model?", [
    "It improves numerical stability and helps optimization behave better.",
    "It removes the need for model initialization entirely.",
    "It guarantees the model will achieve zero training error.",
    "It converts supervised problems into reinforcement learning.",
  ], 0, "Optimization becomes easier with scaled inputs.", "Normalization keeps input magnitudes in a comparable range, which usually helps gradient-based training.", "Sensor streams with very different scales can otherwise dominate updates."),
  q(8, "Machine Learning", "easy", "Easy", 10, "What does classification mean in machine learning?", [
    "Assigning an input to one of several discrete categories.",
    "Assigning an input to a continuous scalar trajectory.",
    "Assigning an optimizer to one of several gradient steps.",
    "Assigning a robot to one of several dynamic equations.",
  ], 0, "Discrete labels.", "Classification predicts class labels such as obstacle/not obstacle or object category.", "A robot may classify images into corridor, stairway or doorway."),
  q(9, "Machine Learning", "easy", "Easy", 10, "What is the purpose of data augmentation in robot perception?", [
    "To improve robustness by varying the training examples.",
    "To reduce the dataset size by removing variations.",
    "To force all inputs into the same feature vector.",
    "To convert regression tasks into segmentation tasks.",
  ], 0, "Think flips, crops, lighting changes.", "Augmentation creates diverse training views so the model generalizes better to real environments.", "Robots face changes in pose, lighting and scale, so augmented training helps."),
  q(10, "Machine Learning", "easy", "Easy", 10, "What does reinforcement learning mainly optimize?", [
    "Long-term cumulative reward over interactions.",
    "Immediate supervised label accuracy only.",
    "The determinant of the covariance matrix only.",
    "A fixed trajectory independent of reward.",
  ], 0, "Rewards across time matter.", "Reinforcement learning optimizes behavior by maximizing expected return over time.", "A robot can learn navigation policies from success and failure signals."),

  // EASY — Linear Algebra
  q(11, "Linear Algebra", "easy", "Easy", 10, "What does a matrix represent in robotics most commonly?", [
    "A linear transformation or system relationship.",
    "A nonlinear reward function only.",
    "A battery chemistry state only.",
    "A sensor calibration image only.",
  ], 0, "Think transformations and models.", "Matrices are used for rotations, transformations, Jacobians and state-space models.", "A rotation matrix maps vectors between frames."),
  q(12, "Linear Algebra", "easy", "Easy", 10, "What does an eigenvector represent?", [
    "A direction preserved by a linear transformation up to scaling.",
    "A direction rotated by exactly ninety degrees by any matrix.",
    "A direction that always becomes orthogonal after transformation.",
    "A direction that must map to the zero vector.",
  ], 0, "Invariant direction.", "Eigenvectors remain on the same line after transformation, scaled by the eigenvalue.", "They appear in stability analysis and principal-component reasoning."),
  q(13, "Linear Algebra", "easy", "Easy", 10, "What is the determinant often used to indicate?", [
    "Whether a square matrix is singular and how it scales volume.",
    "Whether a square matrix is always symmetric and positive definite.",
    "Whether a square matrix is guaranteed orthonormal.",
    "Whether a square matrix stores only eigenvectors.",
  ], 0, "Zero determinant is important.", "A zero determinant indicates singularity, and the determinant magnitude indicates oriented volume scaling.", "A singular transformation cannot be inverted."),
  q(14, "Linear Algebra", "easy", "Easy", 10, "Why is matrix inversion important in robotics?", [
    "It helps recover unknown variables in linear relationships when the matrix is invertible.",
    "It guarantees stable control even when the model is wrong.",
    "It removes all uncertainty from state estimation.",
    "It converts nonlinear systems into neural networks.",
  ], 0, "Undoing a transformation.", "An inverse matrix allows one to solve linear systems or reverse linear transforms when the inverse exists.", "Coordinate conversion sometimes requires matrix inversion."),
  q(15, "Linear Algebra", "easy", "Easy", 10, "What is a transpose of a matrix?", [
    "A matrix obtained by swapping rows and columns.",
    "A matrix obtained by negating all diagonal entries.",
    "A matrix obtained by inverting only the first column.",
    "A matrix obtained by sorting entries by magnitude.",
  ], 0, "Rows become columns.", "The transpose changes orientation of rows and columns and appears in dot products, Jacobians and covariance operations.", "J^T is used in force-to-torque mappings."),
  q(16, "Linear Algebra", "easy", "Easy", 10, "Why are orthonormal matrices important for rotations?", [
    "They preserve lengths and angles during transformation.",
    "They preserve only scaling but not angle relationships.",
    "They preserve angle relationships but not vector lengths.",
    "They preserve neither lengths nor angles by design.",
  ], 0, "Rigid-body rotations should not distort geometry.", "Rotation matrices are orthonormal, so they preserve Euclidean structure.", "A robot frame rotation should not stretch vectors."),
  q(17, "Linear Algebra", "easy", "Easy", 10, "What is rank of a matrix?", [
    "The number of linearly independent rows or columns.",
    "The number of eigenvalues larger than one.",
    "The number of zero entries in the matrix.",
    "The number of gradients needed for inversion.",
  ], 0, "Independence matters.", "Rank tells us how many independent directions are represented by a matrix.", "A Jacobian losing rank indicates singularity."),
  q(18, "Linear Algebra", "easy", "Easy", 10, "What is a vector norm used for?", [
    "Measuring magnitude or distance of a vector quantity.",
    "Measuring only the direction of a vector quantity.",
    "Measuring only the sign pattern of vector entries.",
    "Measuring only whether a vector is orthogonal.",
  ], 0, "Think magnitude.", "Norms quantify vector size and are used in optimization, control and estimation.", "Path error is often measured with an L2 norm."),
  q(19, "Linear Algebra", "easy", "Easy", 10, "What does a homogeneous transformation matrix combine?", [
    "Rotation and translation in a single rigid-body representation.",
    "Velocity and acceleration in a single force representation.",
    "Torque and current in a single sensor representation.",
    "Probability and covariance in a single dynamics representation.",
  ], 0, "Pose = rotation + translation.", "Homogeneous transforms let us compose rigid motions conveniently using matrix multiplication.", "Robot-link transforms are chained this way."),
  q(20, "Linear Algebra", "easy", "Easy", 10, "Why is singular value decomposition useful?", [
    "It reveals geometric structure, rank and conditioning of a matrix.",
    "It guarantees every nonlinear system becomes convex.",
    "It eliminates the need for numerical optimization.",
    "It converts probability distributions into trajectories.",
  ], 0, "Think rank, conditioning, pseudoinverse.", "SVD is a powerful factorization used for numerical analysis, pseudoinverses and low-rank approximations.", "Robotics inverse-kinematics solvers often use SVD-based reasoning near singularities."),

  // EASY — Probability
  q(21, "Probability", "easy", "Easy", 10, "What does a probability distribution represent in robotics?", [
    "Uncertainty over possible values of a variable or state.",
    "An exact deterministic trajectory of the system.",
    "A fixed control law with zero uncertainty.",
    "A rigid coordinate transform with no ambiguity.",
  ], 0, "Think uncertainty.", "Probability distributions model uncertain states, measurements or outcomes in robotics.", "A robot pose estimate is often represented probabilistically."),
  q(22, "Probability", "easy", "Easy", 10, "What does Bayesian filtering do?", [
    "Updates a belief over state using prediction and observation steps.",
    "Updates a control law using only optimization steps.",
    "Updates a map using only deterministic geometry steps.",
    "Updates a trajectory using only supervised labels.",
  ], 0, "Prediction plus correction.", "Bayesian filtering recursively maintains a probability distribution over state using a motion model and sensor data.", "Kalman filtering is one special case."),
  q(23, "Probability", "easy", "Easy", 10, "What is conditional probability?", [
    "The probability of an event given that another event is known.",
    "The probability of an event independent of all observations.",
    "The probability of an event with zero variance always.",
    "The probability of an event after removing all priors.",
  ], 0, "'Given' is the key word.", "Conditional probability quantifies uncertainty after some information is observed.", "SLAM often uses probabilities conditioned on sensor data."),
  q(24, "Probability", "easy", "Easy", 10, "Why is Gaussian noise commonly assumed in estimation?", [
    "It leads to mathematically convenient models and often matches many small disturbances.",
    "It exactly describes every robotic sensor in all situations.",
    "It removes the need for covariance matrices.",
    "It guarantees zero measurement bias.",
  ], 0, "Convenience and approximation.", "Gaussian assumptions simplify inference and often approximate aggregate noise well under many conditions.", "Kalman filtering relies heavily on Gaussian assumptions."),
  q(25, "Probability", "easy", "Easy", 10, "What does covariance describe?", [
    "The uncertainty spread and correlations between variables.",
    "The deterministic mapping between states and controls.",
    "The exact value of the mean state estimate.",
    "The rotation of a vector between coordinate frames.",
  ], 0, "Variance plus relationships.", "Covariance matrices capture uncertainty magnitude and cross-variable correlation.", "In localization, x and y errors can be correlated."),
  q(26, "Probability", "easy", "Easy", 10, "What is a prior in Bayesian estimation?", [
    "Belief about a variable before incorporating the latest observation.",
    "Belief about a variable after ignoring all previous observations.",
    "Belief about a variable after optimization has converged exactly.",
    "Belief about a variable after removing all model assumptions.",
  ], 0, "Before the new measurement.", "A prior summarizes knowledge before the current evidence is processed.", "Motion-model propagation often produces the prior for the next step."),
  q(27, "Probability", "easy", "Easy", 10, "What is a posterior in Bayesian estimation?", [
    "Belief about a variable after updating with observed evidence.",
    "Belief about a variable before seeing any evidence.",
    "Belief about a variable with no uncertainty at all.",
    "Belief about a variable after removing the likelihood term.",
  ], 0, "After the measurement update.", "The posterior combines prior belief and observation likelihood.", "Localization updates a posterior pose distribution after each sensor reading."),
  q(28, "Probability", "easy", "Easy", 10, "Why is probabilistic reasoning important in SLAM?", [
    "Because both robot motion and sensing are uncertain.",
    "Because robot motion is deterministic but sensing is always exact.",
    "Because mapping is exact while localization is impossible.",
    "Because probability removes the need for sensor models.",
  ], 0, "Uncertainty is everywhere.", "SLAM must reason under uncertain motion, noisy observations and ambiguous data association.", "A robot never knows its pose or map perfectly."),
  q(29, "Probability", "easy", "Easy", 10, "What is a likelihood function?", [
    "A function measuring how probable an observation is for a hypothesized state.",
    "A function measuring how probable a control input is for a fixed map.",
    "A function measuring how probable a trajectory is after optimization only.",
    "A function measuring how probable a battery voltage is after calibration only.",
  ], 0, "Observation given state.", "Likelihood tells us how compatible the measurement is with a candidate state.", "Range sensors often use a measurement likelihood in localization."),
  q(30, "Probability", "easy", "Easy", 10, "What is the expected value of a random variable?", [
    "Its probability-weighted average value.",
    "Its maximum physically possible value.",
    "Its minimum uncertainty value.",
    "Its most recent observed value only.",
  ], 0, "Average with weights.", "Expectation is a weighted average based on the distribution.", "Expected cost is common in planning under uncertainty."),

  // EASY — Manipulators
  q(31, "Manipulators", "easy", "Easy", 10, "What does forward kinematics compute?", [
    "End-effector pose from joint coordinates.",
    "Joint torques from end-effector pose.",
    "End-effector covariance from link mass values.",
    "Sensor noise from actuator coordinates.",
  ], 0, "Joints in, pose out.", "Forward kinematics maps joint variables to end-effector position and orientation.", "Robot arms use it to determine where the gripper currently is."),
  q(32, "Manipulators", "easy", "Easy", 10, "What does the Jacobian matrix relate?", [
    "Joint velocities to end-effector velocities.",
    "Joint torques to battery voltage.",
    "Joint inertia to end-effector color.",
    "Joint positions to camera intrinsics.",
  ], 0, "Differential motion map.", "The Jacobian relates q̇ and ẋ in manipulator kinematics.", "It is also used in force and control formulations."),
  q(33, "Manipulators", "easy", "Easy", 10, "What is inverse kinematics?", [
    "Computing joint coordinates that achieve a desired end-effector pose.",
    "Computing end-effector torques that achieve a desired joint pose.",
    "Computing joint velocities that achieve a desired battery state.",
    "Computing map coordinates that achieve a desired sensor pose.",
  ], 0, "Pose desired, joints unknown.", "Inverse kinematics solves for joint values that realize a requested Cartesian pose.", "Multiple or no solutions can exist depending on geometry."),
  q(34, "Manipulators", "easy", "Easy", 10, "Why can inverse kinematics have multiple solutions?", [
    "Different joint configurations can realize the same end-effector pose.",
    "Different sensors can realize the same Jacobian matrix.",
    "Different battery states can realize the same workspace.",
    "Different control gains can realize the same DH table.",
  ], 0, "Elbow-up and elbow-down.", "Many manipulators can reach a pose through more than one joint arrangement.", "A two-link arm is the classic example."),
  q(35, "Manipulators", "easy", "Easy", 10, "What is a manipulator workspace?", [
    "The set of positions or poses the end effector can reach.",
    "The set of torques the controller can stabilize exactly.",
    "The set of covariance matrices the estimator can invert.",
    "The set of images the camera can classify correctly.",
  ], 0, "Reachability region.", "Workspace describes the reachable region of the end effector, sometimes including orientations.", "Joint limits affect the actual workspace."),
  q(36, "Manipulators", "easy", "Easy", 10, "What is a singularity in manipulator kinematics?", [
    "A configuration where the Jacobian loses rank and dexterity drops.",
    "A configuration where the inertia matrix becomes diagonal and control improves.",
    "A configuration where battery voltage becomes zero and motion stops.",
    "A configuration where all sensor noise becomes isotropic instantly.",
  ], 0, "Rank loss.", "At singularities, certain Cartesian motions become hard or impossible to generate cleanly.", "Near singularity, small Cartesian moves may require very large joint rates."),
  q(37, "Manipulators", "easy", "Easy", 10, "Why are homogeneous transformation matrices used?", [
    "They combine rotation and translation in one rigid-body transform.",
    "They combine torque and current in one actuator model.",
    "They combine probability and covariance in one estimator update.",
    "They combine reward and value in one policy model.",
  ], 0, "Pose composition.", "Homogeneous matrices let us chain rigid transforms with matrix multiplication.", "Link-by-link forward kinematics often uses them."),
  q(38, "Manipulators", "easy", "Easy", 10, "What do DH parameters help describe?", [
    "The geometric relationship between successive manipulator links.",
    "The probabilistic relationship between sensor noise models.",
    "The dynamic relationship between battery cells and motors.",
    "The visual relationship between pixels and semantic classes.",
  ], 0, "Serial-arm geometry.", "Denavit–Hartenberg parameters are a systematic way to describe serial-chain geometry.", "They are used to build transformation chains."),
  q(39, "Manipulators", "easy", "Easy", 10, "What does a revolute joint allow?", [
    "Relative rotational motion about a joint axis.",
    "Relative translational motion along every joint axis.",
    "Relative probabilistic motion under every uncertainty axis.",
    "Relative visual motion between camera pixels.",
  ], 0, "Rotation joint.", "A revolute joint rotates around an axis, unlike a prismatic joint which translates.", "Industrial arms are dominated by revolute joints."),
  q(40, "Manipulators", "easy", "Easy", 10, "Why is the Jacobian transpose useful in manipulation?", [
    "It maps end-effector forces or wrenches into joint torques.",
    "It maps joint torques into battery temperatures.",
    "It maps camera images into end-effector velocities.",
    "It maps covariance matrices into reachable workspace boundaries.",
  ], 0, "Think force mapping.", "The transpose of the Jacobian appears in virtual work and force-torque relationships.", "Contact force at the gripper can be converted into joint torque demand."),

  // EASY — Computation
  q(41, "Computation", "easy", "Easy", 10, "Why are GPUs useful for robotics AI workloads?", [
    "They are efficient at massively parallel numerical computation.",
    "They remove the need for training data in robotics.",
    "They replace all sensors in AI-based robot stacks.",
    "They guarantee real-time performance for every task.",
  ], 0, "Parallelism.", "GPUs accelerate large matrix and tensor operations common in perception and learning.", "Segmentation and detection models often run on GPUs."),
  q(42, "Computation", "easy", "Easy", 10, "What is the main job of a CPU in robotics software?", [
    "General-purpose control, logic, coordination and sequential computation.",
    "Only massively parallel neural-network matrix multiplication.",
    "Only high-bandwidth graphics rasterization.",
    "Only analog sensor calibration in hardware.",
  ], 0, "General-purpose orchestration.", "CPUs handle logic-heavy workloads such as planning, middleware, state machines and control coordination.", "Robot operating systems depend heavily on CPU scheduling."),
  q(43, "Computation", "easy", "Easy", 10, "What is the role of an accelerator such as an NPU or TPU?", [
    "Speeding up specialized operations such as neural inference efficiently.",
    "Replacing all robot software and control architecture.",
    "Eliminating the need for sensor fusion entirely.",
    "Performing only rigid-body kinematics with no learning tasks.",
  ], 0, "Specialized hardware.", "Accelerators are designed for specific workloads and can improve performance-per-watt on those tasks.", "Edge robots often use NPUs for vision inference."),
  q(44, "Computation", "easy", "Easy", 10, "Why is memory bandwidth important in robotics perception?", [
    "Large sensor tensors and images must be moved efficiently through the compute pipeline.",
    "It directly determines the mechanical strength of the robot frame.",
    "It guarantees a model will generalize to new environments.",
    "It eliminates the need for numerical optimization.",
  ], 0, "Data movement matters.", "Perception systems can become bottlenecked by data transfer rather than arithmetic alone.", "Point-cloud and image pipelines are often memory intensive."),
  q(45, "Computation", "easy", "Easy", 10, "What does real-time computing mean in robotics?", [
    "Computation that consistently meets required timing deadlines.",
    "Computation that simply runs faster than human reaction speed.",
    "Computation that always uses GPUs for execution.",
    "Computation that eliminates all operating-system delays.",
  ], 0, "Deadline-focused.", "A real-time system is judged by whether it meets timing constraints, not only by average speed.", "Motor control loops often require predictable update timing."),
  q(46, "Computation", "easy", "Easy", 10, "Why is parallelism valuable in robotics?", [
    "Multiple computations can be executed simultaneously for higher throughput.",
    "Multiple computations become sequentially equivalent by definition.",
    "Multiple computations eliminate the need for synchronization.",
    "Multiple computations always reduce latency to zero.",
  ], 0, "More work at once.", "Parallelism helps when perception, planning and learning workloads can be distributed effectively.", "A robot may run detection, tracking and mapping concurrently."),
  q(47, "Computation", "easy", "Easy", 10, "What is latency in a compute pipeline?", [
    "The time between input arrival and output availability.",
    "The number of processor cores in the system.",
    "The total memory installed in the system.",
    "The number of sensors attached to the robot.",
  ], 0, "Delay through the system.", "Latency matters for control because stale outputs can hurt decision quality.", "Fast throughput does not automatically imply low latency."),
  q(48, "Computation", "easy", "Easy", 10, "Why are embedded systems important in robotics?", [
    "They provide onboard computation close to sensors and actuators.",
    "They remove the need for any external communication.",
    "They guarantee global optimality in motion planning.",
    "They replace all high-level decision making with hardware.",
  ], 0, "Onboard intelligence.", "Embedded controllers are essential for local sensing, actuation and timing-critical loops.", "Flight controllers are a common embedded robotics example."),
  q(49, "Computation", "easy", "Easy", 10, "What is heterogeneous computing?", [
    "Using different processor types for the tasks they handle best.",
    "Using a single CPU for every task regardless of workload.",
    "Using the same GPU kernel for all sensing and control tasks.",
    "Using only analog electronics for learning inference.",
  ], 0, "CPU + GPU + accelerator style division.", "Robotics systems often combine CPUs, GPUs, MCUs and accelerators for efficiency and capability.", "A drone may use an MCU for control and a GPU module for vision."),
  q(50, "Computation", "easy", "Easy", 10, "Why are caches helpful in processors?", [
    "They reduce average access time for frequently used data.",
    "They increase network latency for control messages.",
    "They replace RAM with permanent storage automatically.",
    "They transform nonlinear control laws into linear ones.",
  ], 0, "Faster nearby memory.", "Caches store recently used data so the processor spends less time waiting on slower memory.", "Repeated matrix and state access can benefit significantly."),

  // HARD — Numerical Optimization (1-5 starter, 6-10 research-inspired)
  q(51, "Numerical Optimization", "hard", "Starter", 15, "Why are convex optimization problems attractive in robotics?", [
    "They have no spurious local minima beyond the global optimum.",
    "They eliminate all constraints from the optimization model.",
    "They remove gradient information from the objective.",
    "They make all nonlinear systems exactly linear.",
  ], 0, "Global optimum guarantee.", "Convex structure gives strong solution guarantees and predictable solver behavior.", "Quadratic programs are common in robotics control."),
  q(52, "Numerical Optimization", "hard", "Starter", 15, "What is a quadratic program?", [
    "An optimization problem with a quadratic objective and linear constraints.",
    "An optimization problem with a linear objective and nonlinear constraints only.",
    "An optimization problem with a quadratic objective and no variables.",
    "An optimization problem with a cubic objective and linearized rewards.",
  ], 0, "QP.", "Quadratic programs are efficient and appear in control allocation and whole-body control.", "Many constrained controllers solve QPs every cycle."),
  q(53, "Numerical Optimization", "hard", "Starter", 15, "Why are gradients important in numerical optimization?", [
    "They indicate how the objective changes with respect to variables.",
    "They directly solve the optimization without iteration.",
    "They remove the need for constraints in robotics models.",
    "They guarantee robustness against all model mismatch.",
  ], 0, "Direction of improvement.", "Gradients guide first-order optimization methods toward lower-cost solutions.", "Trajectory optimizers often rely on gradient information."),
  q(54, "Numerical Optimization", "hard", "Starter", 15, "What is trajectory optimization in robotics?", [
    "Optimizing a sequence of states and controls subject to dynamics and constraints.",
    "Optimizing only the final goal position without intermediate states.",
    "Optimizing only a perception model without dynamics.",
    "Optimizing a map representation without a cost function.",
  ], 0, "Motion as optimization.", "Trajectory optimization formulates motion planning and control as constrained optimization over time.", "Legged and aerial planners commonly use it."),
  q(55, "Numerical Optimization", "hard", "Starter", 15, "Why is warm-starting useful in receding-horizon control?", [
    "It initializes the next solve near a previous solution to reduce computation.",
    "It guarantees the next solve has zero suboptimality.",
    "It removes the need for constraints in the horizon.",
    "It replaces the dynamics model with sensor feedback.",
  ], 0, "Reuse previous solutions.", "Warm-starts are useful because adjacent MPC problems are often similar.", "They can significantly reduce solve time in practice."),
  q(56, "Numerical Optimization", "hard", "Research", 20, "In modern robotics papers, why are differentiable simulators attractive for optimization?", [
    "They provide gradients through system evolution for learning and control optimization.",
    "They remove the need for any physical model in simulation.",
    "They guarantee sim-to-real transfer without domain gaps.",
    "They replace state estimators with exact observation models.",
  ], 0, "Gradients through physics.", "Differentiable simulation enables end-to-end optimization by propagating gradient information through dynamic rollouts.", "Recent robotics research uses this for policy learning and system identification."),
  q(57, "Numerical Optimization", "hard", "Research", 20, "Why do contact-implicit optimization methods remain challenging in robotics research?", [
    "Because contacts introduce non-smooth constraints, complementarity and many local minima.",
    "Because contacts make all optimization objectives strictly convex.",
    "Because contacts remove friction and simplify the dynamics strongly.",
    "Because contacts eliminate the need for state constraints.",
  ], 0, "Non-smooth contact.", "Contact-rich planning is difficult because the underlying optimization is hybrid and often poorly conditioned.", "Manipulation and locomotion papers still study better formulations for this."),
  q(58, "Numerical Optimization", "hard", "Research", 20, "Why is iLQR popular in research on robot control and planning?", [
    "It iteratively approximates nonlinear optimal control with local quadratic models.",
    "It solves only linear programs with no dynamics approximation.",
    "It guarantees global optimality for every nonconvex robotics problem.",
    "It removes the need for backward passes in trajectory improvement.",
  ], 0, "Iterative local approximation.", "Iterative LQR uses local linearization and quadratic cost approximation to improve a control trajectory efficiently.", "It remains popular for nonlinear control and model-based planning research."),
  q(59, "Numerical Optimization", "hard", "Research", 20, "Why do research papers often combine sampling and optimization in motion planning?", [
    "Sampling provides feasibility while optimization improves smoothness, cost and dynamics consistency.",
    "Sampling guarantees optimality and optimization guarantees feasibility independently.",
    "Sampling removes collision checking while optimization removes dynamics.",
    "Sampling eliminates the need for state representations in planning.",
  ], 0, "Complementary strengths.", "Hybrid pipelines use sampling for exploration and optimization for refinement.", "This combination is common in planning systems for manipulators and mobile robots."),
  q(60, "Numerical Optimization", "hard", "Research", 20, "Why are learned optimizers or learned cost terms appearing in recent robotics papers?", [
    "They can inject data-driven priors into planning and control objectives.",
    "They make optimization unnecessary by definition.",
    "They remove the need for robot models and sensor inputs.",
    "They guarantee safety in all unseen operating regimes.",
  ], 0, "Data-driven priors.", "Recent work explores combining classical optimization with learned components to improve efficiency and task performance.", "This trend appears in planning, manipulation and driving research."),

  // HARD — Reinforcement Learning
  q(61, "Reinforcement Learning", "hard", "Starter", 15, "What does a policy represent in reinforcement learning?", [
    "A mapping from states or observations to actions.",
    "A mapping from actions to rewards only.",
    "A mapping from rewards to observations only.",
    "A mapping from dynamics to labels only.",
  ], 0, "State to action.", "A policy tells the agent what action to choose given its current information.", "Policies may be deterministic or stochastic."),
  q(62, "Reinforcement Learning", "hard", "Starter", 15, "What is a value function?", [
    "An estimate of expected future cumulative reward.",
    "An estimate of current observation noise only.",
    "An estimate of state dimensionality only.",
    "An estimate of control frequency only.",
  ], 0, "Future return.", "Value functions summarize how good states or actions are under a policy.", "They guide policy improvement in many RL algorithms."),
  q(63, "Reinforcement Learning", "hard", "Starter", 15, "Why is exploration necessary in reinforcement learning?", [
    "The agent must try actions to discover better long-term strategies.",
    "The agent must avoid all unknown actions to stay optimal.",
    "The agent must eliminate rewards during early training.",
    "The agent must only replay expert data forever.",
  ], 0, "Trying new actions matters.", "Without exploration, the agent may never discover better policies.", "Exploration-exploitation balance is central to RL."),
  q(64, "Reinforcement Learning", "hard", "Starter", 15, "What is the reward function in RL?", [
    "A signal describing task desirability of actions or outcomes.",
    "A guaranteed terminal policy produced by the optimizer.",
    "A covariance matrix describing observation uncertainty.",
    "A rigid-body model describing robot geometry.",
  ], 0, "Task objective signal.", "The reward defines what the agent is encouraged to achieve.", "Poor reward design can lead to unintended behavior."),
  q(65, "Reinforcement Learning", "hard", "Starter", 15, "Why is sim-to-real transfer hard in robot RL?", [
    "The simulated environment never matches the real world perfectly.",
    "The simulated environment exactly matches every real deployment condition.",
    "The simulated environment removes perception from the problem entirely.",
    "The simulated environment guarantees contact dynamics are always correct.",
  ], 0, "Reality gap.", "Differences in sensing, dynamics and contact can cause policies to fail when moved from simulation to hardware.", "Domain randomization is one common mitigation strategy."),
  q(66, "Reinforcement Learning", "hard", "Research", 20, "Why are diffusion-policy ideas interesting in recent robot learning papers?", [
    "They model multimodal action distributions and can represent diverse expert-like behaviors.",
    "They remove the need for any training data in imitation or RL.",
    "They guarantee hard-real-time control for every robot platform.",
    "They replace policy optimization with deterministic finite-state machines.",
  ], 0, "Multimodal action modeling.", "Diffusion-based policies have become popular because many robotic tasks admit multiple valid action sequences.", "Manipulation research has explored this heavily."),
  q(67, "Reinforcement Learning", "hard", "Research", 20, "Why do offline RL papers matter for robotics?", [
    "They aim to learn useful policies from fixed datasets without dangerous online trial-and-error.",
    "They assume unlimited online interaction is always safe and cheap.",
    "They remove the need for policies and learn only reward models.",
    "They guarantee perfect generalization to all unseen tasks.",
  ], 0, "Fixed dataset learning.", "Offline RL is attractive because real-robot data collection can be expensive or unsafe.", "It is especially relevant in industrial and autonomous-driving contexts."),
  q(68, "Reinforcement Learning", "hard", "Research", 20, "Why is credit assignment hard in long-horizon robotics tasks?", [
    "Important rewards may occur long after the actions that caused them.",
    "Rewards always occur immediately after every action in robotics.",
    "Long-horizon tasks remove the need for temporal reasoning.",
    "Long-horizon tasks make exploration unnecessary.",
  ], 0, "Delayed consequences.", "A manipulation or navigation success may depend on early actions whose effect is visible only much later.", "This makes policy learning harder."),
  q(69, "Reinforcement Learning", "hard", "Research", 20, "Why do many recent robot RL papers combine model-based and model-free ideas?", [
    "They seek both data efficiency from models and expressiveness from direct policy learning.",
    "They seek to eliminate all uncertainty by combining two equivalent methods.",
    "They seek to replace reward functions with kinematic constraints only.",
    "They seek to guarantee globally optimal exploration in every environment.",
  ], 0, "Hybrid strengths.", "Research often blends predictive modeling with policy optimization to improve sample efficiency and robustness.", "This is a recurring theme in robot control papers."),
  q(70, "Reinforcement Learning", "hard", "Research", 20, "Why is distribution shift a major issue in robot learning?", [
    "Policies may encounter states at deployment that differ from the training distribution.",
    "Policies always see identical state distributions during training and deployment.",
    "Distribution shift removes the need for robust policy evaluation.",
    "Distribution shift only affects linear systems and not learned policies.",
  ], 0, "Train-test mismatch.", "Robot policies can fail badly when real-world states differ from those seen in data or simulation.", "Robustness to shift is an active research topic."),

  // HARD — Foundation Models
  q(71, "Foundation Models", "hard", "Starter", 15, "What is a foundation model in the robotics context?", [
    "A large pretrained model intended to generalize across many tasks and inputs.",
    "A small task-specific controller used only for one manipulator.",
    "A deterministic optimizer used only for one cost function.",
    "A rigid-body simulator used only for one environment.",
  ], 0, "Large pretrained generalist.", "Foundation models are trained broadly and then adapted to many downstream uses.", "In robotics they may combine language, vision and action understanding."),
  q(72, "Foundation Models", "hard", "Starter", 15, "Why is multimodality important for robot foundation models?", [
    "Robots must connect language, vision, state and action information.",
    "Robots only need text and never need sensor observations.",
    "Robots only need images and never need actions.",
    "Robots only need actions and never need scene context.",
  ], 0, "Many input and output types.", "Robots operate in physical environments, so useful models must connect different modalities coherently.", "Instruction following often requires language plus perception."),
  q(73, "Foundation Models", "hard", "Starter", 15, "What is one major challenge in using language models for robotics?", [
    "They often lack grounded physical reasoning and real-time embodiment awareness.",
    "They naturally satisfy all safety constraints in physical systems.",
    "They directly output low-level torques with guaranteed stability.",
    "They remove the need for calibration or perception entirely.",
  ], 0, "Text models are not automatically embodied.", "Language competence alone does not guarantee correct reasoning about geometry, contact, timing or safety.", "Grounding remains a major challenge."),
  q(74, "Foundation Models", "hard", "Starter", 15, "Why are robot demonstrations useful for foundation-model adaptation?", [
    "They provide grounded examples linking perception, instruction and action.",
    "They remove the need for pretraining on diverse data.",
    "They guarantee optimal control for all new tasks.",
    "They replace all symbolic reasoning automatically.",
  ], 0, "Grounded action data.", "Demonstrations help bridge abstract semantics and concrete robot behavior.", "Instruction-conditioned imitation is one common approach."),
  q(75, "Foundation Models", "hard", "Starter", 15, "Why is data scale important for foundation models?", [
    "Large and diverse data supports broader generalization.",
    "Small and narrow data always generalizes better by design.",
    "Data scale removes the need for architecture design.",
    "Data scale eliminates sensor noise in deployment.",
  ], 0, "Breadth matters.", "Foundation models rely on broad data coverage to learn reusable patterns across tasks and domains.", "Scale is one reason they can transfer better than narrow models."),
  q(76, "Foundation Models", "hard", "Research", 20, "Why do recent robotics workshops emphasize neuro-symbolic or language-grounded robot models?", [
    "They aim to combine broad semantic reasoning with structured physical constraints and task logic.",
    "They aim to remove all symbolic structure from robot reasoning permanently.",
    "They aim to replace perception with hand-coded battery models.",
    "They aim to eliminate action execution from embodied systems.",
  ], 0, "Semantics plus structure.", "Current robotics research explores how large models can be grounded with structured planning, world knowledge and safety constraints.", "This theme appears in recent foundation-model workshops and papers."),
  q(77, "Foundation Models", "hard", "Research", 20, "Why are vision-language-action models interesting in robotics research?", [
    "They directly connect perception, instruction and action generation in one framework.",
    "They guarantee stable torque control without robot hardware models.",
    "They remove the need for robot datasets because language alone is enough.",
    "They only work for static image captioning tasks.",
  ], 0, "Perception-to-action bridge.", "Vision-language-action models are attractive because they promise a more unified pipeline from observation and instruction to behavior.", "They are a major embodied-AI research direction."),
  q(78, "Foundation Models", "hard", "Research", 20, "Why is temporal reasoning still difficult for robot foundation models?", [
    "Physical tasks require long-horizon state evolution, causality and timing awareness.",
    "Temporal reasoning disappears once images are embedded into tokens.",
    "Robots operate only on static snapshots with no sequential dependency.",
    "Physical tasks never depend on action order or delay.",
  ], 0, "Embodied tasks unfold over time.", "Many model failures come from weak reasoning about future consequences, durations and state transitions.", "Long-horizon sequencing remains a key challenge."),
  q(79, "Foundation Models", "hard", "Research", 20, "Why is grounding a major theme in embodied AI research?", [
    "Because symbols or tokens must connect to real sensorimotor meaning in the world.",
    "Because grounding means removing all perception from robot models.",
    "Because grounding guarantees a model is globally optimal.",
    "Because grounding makes action execution unnecessary.",
  ], 0, "Meaning must connect to physical experience.", "A robot must tie abstract representations to actual objects, geometry, actions and consequences.", "Grounding is central to usable embodied intelligence."),
  q(80, "Foundation Models", "hard", "Research", 20, "Why do recent robotics papers discuss world models together with foundation models?", [
    "Because predictive latent models may support planning, reasoning and data-efficient behavior.",
    "Because world models remove the need for any sensory input during deployment.",
    "Because world models are identical to static language embeddings.",
    "Because world models guarantee zero-shot success on all tasks.",
  ], 0, "Prediction for planning.", "World models aim to represent environment dynamics compactly so the agent can reason about future outcomes.", "This idea is increasingly tied to embodied foundation-model research."),

  // HARD — Aerial Robotics
  q(81, "Aerial Robotics", "hard", "Starter", 15, "How does a quadrotor generate yaw motion?", [
    "By creating a net reaction-torque imbalance between clockwise and counterclockwise rotors.",
    "By increasing total thrust equally on all four rotors.",
    "By changing only the barometer update frequency.",
    "By translating the center of mass without rotor-speed change.",
  ], 0, "Yaw comes from rotor torque imbalance.", "Yaw control changes the relative speeds of opposite spin directions while roughly preserving total thrust.", "This rotates the vehicle about its vertical axis."),
  q(82, "Aerial Robotics", "hard", "Starter", 15, "Why is attitude control crucial for multirotors?", [
    "Because the direction of thrust depends on vehicle orientation.",
    "Because attitude determines battery energy density directly.",
    "Because attitude eliminates the need for state estimation.",
    "Because attitude alone determines GPS accuracy.",
  ], 0, "Orientation changes thrust direction.", "Pitch and roll tilt the body so thrust gains horizontal components, enabling motion control.", "Without stable attitude control, translation is hard to regulate."),
  q(83, "Aerial Robotics", "hard", "Starter", 15, "What does an IMU provide for UAV control?", [
    "Angular velocity and linear acceleration measurements.",
    "Absolute global position and heading in all conditions.",
    "Direct thrust and torque commands for the motors.",
    "Semantic scene labels for obstacle maps.",
  ], 0, "Inertial sensing.", "IMUs provide high-rate motion information used in state estimation and stabilization.", "They are fundamental in flight controllers."),
  q(84, "Aerial Robotics", "hard", "Starter", 15, "What is hover for a quadrotor?", [
    "A condition where total thrust approximately balances weight.",
    "A condition where all rotors are stopped and drag balances weight.",
    "A condition where yaw torque cancels all aerodynamic drag only.",
    "A condition where GPS alone maintains altitude.",
  ], 0, "Lift equals weight approximately.", "Hover occurs when net translational acceleration is near zero and moments are regulated.", "Small control corrections are still needed in practice."),
  q(85, "Aerial Robotics", "hard", "Starter", 15, "What is motor mixing in a multirotor autopilot?", [
    "Mapping desired thrust and body torques into individual rotor commands.",
    "Mapping camera images into rotor-efficiency estimates.",
    "Mapping battery temperature into GPS corrections.",
    "Mapping altitude setpoints into sensor covariance matrices.",
  ], 0, "Control distribution.", "Motor mixing converts collective and attitude demands into motor-level signals according to frame geometry.", "Every multirotor controller uses some mixing strategy."),
  q(86, "Aerial Robotics", "hard", "Research", 20, "Why are event cameras interesting in aerial-robotics research?", [
    "They offer high temporal resolution and large dynamic range for fast flight.",
    "They provide dense absolute depth at every pixel natively.",
    "They remove the need for inertial sensing during aggressive maneuvers.",
    "They guarantee perfect scene semantics at all frame rates.",
  ], 0, "Fast motion perception.", "Event cameras are attractive for high-speed UAV tasks because they react to brightness changes with very low latency.", "They appear often in agile-flight research."),
  q(87, "Aerial Robotics", "hard", "Research", 20, "Why is nonlinear MPC common in advanced UAV papers?", [
    "It handles vehicle nonlinearities and constraints more explicitly than simple linear controllers.",
    "It removes the need for any state estimate or model.",
    "It guarantees zero computation time on embedded hardware.",
    "It turns every underactuated UAV into a fully actuated system.",
  ], 0, "Nonlinear dynamics plus constraints.", "Aggressive flight and obstacle-rich motion often require planners/controllers that reason with nonlinear dynamics directly.", "Research UAV stacks frequently use nonlinear MPC."),
  q(88, "Aerial Robotics", "hard", "Research", 20, "Why is perception-aware planning studied in UAV research?", [
    "Control actions can affect how well the vehicle can localize and observe the scene.",
    "Control actions are always independent of sensing quality in flight.",
    "Perception-aware planning means removing dynamics from the planner.",
    "Perception-aware planning only matters when GPS is perfect.",
  ], 0, "Motion influences sensing.", "The chosen path can improve or degrade visual observability, feature quality and state-estimation performance.", "This coupling is a major research topic."),
  q(89, "Aerial Robotics", "hard", "Research", 20, "Why do some recent UAV papers combine learning with classical control?", [
    "Learning can model residual effects while classical control preserves structure and stability.",
    "Learning can remove the need for all aerodynamics and state estimation.",
    "Classical control can be discarded once a small neural net is added.",
    "The combination guarantees sim-to-real transfer with no tuning.",
  ], 0, "Residual learning plus structure.", "Hybrid approaches use learning to capture unmodeled dynamics while retaining strong model-based control backbones.", "This is common in high-performance flight research."),
  q(90, "Aerial Robotics", "hard", "Research", 20, "Why is thrust-to-weight ratio important for agile UAVs?", [
    "It strongly affects maneuverability, recovery authority and disturbance rejection.",
    "It only matters for battery charging, not flight dynamics.",
    "It affects yaw sensing but not translational control.",
    "It determines GPS observability more than actuation limits.",
  ], 0, "Actuation authority.", "Higher thrust-to-weight ratios allow faster acceleration and more aggressive maneuvers, though often at energy cost.", "Racing drones are a familiar example."),

  // HARD — Underwater Robotics
  q(91, "Underwater Robotics", "hard", "Starter", 15, "Why is localization difficult underwater?", [
    "GPS signals do not propagate effectively underwater.",
    "Cameras always provide perfect metric localization underwater.",
    "Underwater vehicles have no sensor noise in practice.",
    "Acoustic sensing removes all mapping ambiguity.",
  ], 0, "No easy GPS underwater.", "Underwater robots rely on acoustics, inertial sensing, Doppler logs and other alternatives because GPS is unavailable underwater.", "This makes navigation harder than in many surface settings."),
  q(92, "Underwater Robotics", "hard", "Starter", 15, "Why are acoustic sensors common in underwater robotics?", [
    "Sound propagates much better than radio waves underwater.",
    "Sound provides exact dense color imagery underwater.",
    "Sound eliminates all multipath and noise underwater.",
    "Sound gives direct absolute pose without estimation.",
  ], 0, "Acoustic propagation.", "Acoustic sensing is widely used for communication, ranging and localization in underwater environments.", "Sonar is a core underwater sensing modality."),
  q(93, "Underwater Robotics", "hard", "Starter", 15, "What is one major challenge for underwater vision?", [
    "Light scattering and absorption degrade image quality.",
    "Images underwater are always sharper than in air.",
    "Underwater scenes remove the need for calibration.",
    "Water guarantees constant illumination everywhere.",
  ], 0, "Scattering matters.", "Water reduces contrast, color fidelity and visibility, making visual perception much harder.", "This affects detection, mapping and visual odometry."),
  q(94, "Underwater Robotics", "hard", "Starter", 15, "Why is buoyancy important for underwater vehicles?", [
    "It affects vertical equilibrium and energy needed for depth control.",
    "It only affects sensor latency and not motion.",
    "It removes the need for thrusters entirely.",
    "It determines acoustic bandwidth more than force balance.",
  ], 0, "Force balance in water.", "Buoyancy interacts with gravity and vehicle design, strongly influencing depth regulation and stability.", "Neutral buoyancy is often desirable."),
  q(95, "Underwater Robotics", "hard", "Starter", 15, "Why is drag especially significant underwater?", [
    "Fluid forces are substantial and strongly affect motion and control.",
    "Drag is negligible underwater compared with aerial vehicles.",
    "Drag only affects sensors and not thruster-driven dynamics.",
    "Drag disappears once the vehicle is neutrally buoyant.",
  ], 0, "Hydrodynamics matter.", "Water is much denser than air, so drag and added-mass effects are central to underwater vehicle modeling.", "Controllers must account for these effects."),
  q(96, "Underwater Robotics", "hard", "Research", 20, "Why is underwater SLAM an active research area?", [
    "Vehicles must localize with noisy, sparse and environment-dependent sensing in GPS-denied conditions.",
    "Underwater vehicles already have perfect global localization from acoustics alone.",
    "Mapping is trivial underwater because scenes are static and fully observable.",
    "SLAM is unnecessary once a depth sensor is installed.",
  ], 0, "GPS-denied mapping.", "Recent underwater robotics literature emphasizes SLAM because sensing is difficult, observability is limited and drift accumulates quickly.", "Sonar- and vision-based SLAM remain important topics."),
  q(97, "Underwater Robotics", "hard", "Research", 20, "Why are sonar-based representations important in underwater papers?", [
    "Sonar can perceive where optical sensing is unreliable or visibility is poor.",
    "Sonar directly provides semantic language labels for objects.",
    "Sonar eliminates the need for all motion models in navigation.",
    "Sonar makes water scattering irrelevant to all sensors.",
  ], 0, "Perception in low-visibility water.", "Sonar is crucial when optical conditions are poor and is a major focus of underwater mapping and localization work.", "Different sonar modalities lead to different representation challenges."),
  q(98, "Underwater Robotics", "hard", "Research", 20, "Why is multi-sensor fusion particularly valuable underwater?", [
    "No single underwater sensor is reliable enough across all conditions.",
    "Every underwater sensor provides the same failure-free information.",
    "Fusion removes the need for vehicle dynamics models completely.",
    "Fusion guarantees loop closure at every timestep.",
  ], 0, "Complementary sensing.", "Research systems often fuse IMU, depth, DVL, sonar and vision because each sensor has major limitations.", "Robust navigation depends on combining them effectively."),
  q(99, "Underwater Robotics", "hard", "Research", 20, "Why are terrain-relative navigation methods studied underwater?", [
    "They use environmental structure to bound drift when global references are unavailable.",
    "They replace all onboard sensing with precomputed maps automatically.",
    "They only work when GPS is stronger underwater than in air.",
    "They eliminate the need for uncertainty modeling.",
  ], 0, "Use the environment as reference.", "Terrain-relative navigation is useful because consistent seabed structure can help correct drift without global positioning.", "It appears in AUV research for long missions."),
  q(100, "Underwater Robotics", "hard", "Research", 20, "Why is adaptive control studied in underwater robot research?", [
    "Hydrodynamic parameters and disturbances can vary significantly across operating conditions.",
    "Underwater dynamics are perfectly constant across all vehicles and speeds.",
    "Adaptive control removes the need for localization and mapping.",
    "Adaptive control guarantees exact modeling of turbulence.",
  ], 0, "Changing water conditions.", "Research explores adaptive and robust control because underwater environments introduce uncertain dynamics and disturbances.", "Current, drag and loading can vary over a mission."),

  // HARD — Autonomous Driving
  q(101, "Autonomous Driving", "hard", "Starter", 15, "What is the role of perception in autonomous driving?", [
    "Estimating scene structure, agents, lanes and obstacles from sensor data.",
    "Estimating only wheel torques without scene understanding.",
    "Estimating only battery temperature without sensor fusion.",
    "Estimating only steering control without map context.",
  ], 0, "Scene understanding.", "Perception builds the machine's understanding of the environment so planning and control can act safely.", "Detectors, segmentation and tracking are common perception tasks."),
  q(102, "Autonomous Driving", "hard", "Starter", 15, "Why is prediction important in autonomous driving?", [
    "Other agents move, so the vehicle must anticipate future interactions.",
    "The road scene is always static, so anticipation is unnecessary.",
    "Prediction only matters after the control command is executed.",
    "Prediction replaces localization and mapping entirely.",
  ], 0, "Dynamic traffic.", "Driving requires reasoning about pedestrians, vehicles and cyclists whose future motion affects safe decisions.", "Prediction supports planning in interactive environments."),
  q(103, "Autonomous Driving", "hard", "Starter", 15, "What is motion planning in autonomous driving?", [
    "Choosing a feasible and safe future trajectory for the vehicle.",
    "Choosing a future neural architecture for perception.",
    "Choosing only the next camera exposure setting.",
    "Choosing only the next steering-angle sensor reading.",
  ], 0, "Future path selection.", "Planning selects vehicle behavior subject to safety, comfort, road rules and dynamic feasibility.", "This sits between perception/prediction and low-level control."),
  q(104, "Autonomous Driving", "hard", "Starter", 15, "Why is sensor fusion widely used in self-driving systems?", [
    "Different sensors provide complementary strengths and failure modes.",
    "A single sensor already dominates all conditions perfectly.",
    "Fusion removes the need for state estimation or calibration.",
    "Fusion guarantees zero-latency decisions in every case.",
  ], 0, "Complementary sensing again.", "Cameras, lidar, radar, GNSS and IMU offer different advantages, so fusion improves robustness.", "No single sensor is reliable everywhere."),
  q(105, "Autonomous Driving", "hard", "Starter", 15, "Why is safety validation hard in autonomous driving?", [
    "Rare edge cases and long-tail events are difficult to cover exhaustively.",
    "Traffic scenarios are simple and perfectly repetitive in practice.",
    "Validation needs only a few short closed-course tests.",
    "Simulation automatically proves correctness in all conditions.",
  ], 0, "Long tail.", "Driving systems must handle a vast distribution of scenarios, many of which are rare but safety-critical.", "Validation therefore becomes a major systems challenge."),
  q(106, "Autonomous Driving", "hard", "Research", 20, "Why are occupancy-based scene representations important in modern autonomous-driving research?", [
    "They model free space and occupied volume more directly than object lists alone.",
    "They eliminate the need for perception and prediction entirely.",
    "They are only useful for static indoor mobile robots.",
    "They replace control with a single image-classification step.",
  ], 0, "Scene geometry beyond boxes.", "Recent driving research increasingly studies occupancy representations because they capture scene structure more flexibly than discrete detections alone.", "This trend appears in recent driving papers and challenges."),
  q(107, "Autonomous Driving", "hard", "Research", 20, "Why is end-to-end driving a major research topic?", [
    "It aims to learn planning behavior directly from sensor inputs without fully hand-designed modular pipelines.",
    "It removes the need for any training data because driving is deterministic.",
    "It guarantees interpretability better than every modular system.",
    "It means the vehicle no longer needs control outputs.",
  ], 0, "Sensor-to-plan learning.", "End-to-end driving is studied because modular pipelines can suffer from compounding interface errors and heavy supervision needs.", "Recent tutorials and papers highlight both its promise and challenges."),
  q(108, "Autonomous Driving", "hard", "Research", 20, "Why are world-model ideas appearing in autonomous-driving papers?", [
    "Latent predictive models may support planning and closed-loop reasoning about future traffic evolution.",
    "World models eliminate the need for sensor input at deployment.",
    "World models are identical to static map storage only.",
    "World models guarantee certification-ready safety automatically.",
  ], 0, "Predict future scenarios.", "Recent work studies latent world models because planning under uncertainty benefits from learned predictive structure.", "This is now a visible theme in modern driving research."),
  q(109, "Autonomous Driving", "hard", "Research", 20, "Why are diffusion-based action models being explored for driving?", [
    "They can represent multimodal future behaviors and planning outputs.",
    "They remove the need for real-time inference entirely.",
    "They only apply to image denoising and not decision making.",
    "They force the planner to output one deterministic behavior always.",
  ], 0, "Multiple valid futures.", "Driving often has several reasonable actions, and diffusion-style generative models can capture multimodal decision distributions.", "Recent CV and driving papers explore this direction."),
  q(110, "Autonomous Driving", "hard", "Research", 20, "Why is closed-loop evaluation emphasized in autonomous-driving research?", [
    "Open-loop perception metrics alone do not capture full decision-feedback interaction quality.",
    "Open-loop perception metrics fully determine safety and planning quality.",
    "Closed-loop evaluation removes the need for simulation or benchmarks.",
    "Closed-loop evaluation only matters for low-speed parking tasks.",
  ], 0, "Behavior affects future observations.", "Driving is an interactive sequential control problem, so evaluating the feedback loop is essential.", "Modern driving challenges increasingly emphasize closed-loop assessment."),
];

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function SegmentedToggle({ value, onChange, leftLabel, leftValue, rightLabel, rightValue }) {
  return (
    <div className="inline-flex rounded-2xl border border-blue-200/70 bg-white/80 p-1 shadow-sm">
      <button
        onClick={() => onChange(leftValue)}
        className={`rounded-xl px-3 py-2 text-sm font-medium transition-all ${
          value === leftValue ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:bg-blue-50"
        }`}
      >
        {leftLabel}
      </button>
      <button
        onClick={() => onChange(rightValue)}
        className={`rounded-xl px-3 py-2 text-sm font-medium transition-all ${
          value === rightValue ? "bg-cyan-600 text-white shadow-sm" : "text-slate-600 hover:bg-cyan-50"
        }`}
      >
        {rightLabel}
      </button>
    </div>
  );
}

function buildQuestionPack(mode, realmName) {
  return QUESTION_BANK.filter((item) => item.mode === mode && item.realm === realmName);
}

export default function PhysicalAIMissionPossible() {
  const [screen, setScreen] = useState("home");
  const [gameMode, setGameMode] = useState("easy");
  const [uiMode, setUiMode] = useState("normal");
  const [realmIndex, setRealmIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [showExplain, setShowExplain] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [search, setSearch] = useState("");

  const isNeuro = uiMode === "neuro";
  const realms = gameMode === "easy" ? EASY_REALMS : HARD_REALMS;
  const currentRealm = realms[realmIndex];
  const currentRealmQuestions = currentRealm ? buildQuestionPack(gameMode, currentRealm.name) : [];
  const currentQuestion = currentRealmQuestions[questionIndex] || null;

  const optionPack = useMemo(() => {
    if (!currentQuestion) return [];
    return shuffleArray(
      currentQuestion.options.map((text, idx) => ({
        id: `${currentQuestion.id}-${idx}`,
        text,
        correct: idx === currentQuestion.answer,
      }))
    );
  }, [currentQuestion?.id]);

  const accuracy = answered.length > 0 ? Math.round((answered.filter((item) => item.correct).length / answered.length) * 100) : 0;
  const savedQuestionIds = Array.from(new Set(reviewList));
  const progress = currentRealmQuestions.length > 0 ? ((questionIndex + (showExplain ? 1 : 0)) / currentRealmQuestions.length) * 100 : 0;

  const appBg = isNeuro
    ? "bg-[linear-gradient(180deg,#f8fcff_0%,#eefaf8_100%)]"
    : "bg-[linear-gradient(180deg,#f8fbff_0%,#edf4ff_55%,#f4f8ff_100%)]";
  const shell = isNeuro
    ? "border-cyan-100/90 bg-white/95 shadow-[0_12px_40px_rgba(16,185,129,0.08)]"
    : "border-blue-100 bg-white/90 shadow-[0_14px_48px_rgba(37,99,235,0.08)]";
  const panel = isNeuro ? "border-cyan-100 bg-cyan-50/70" : "border-blue-100 bg-blue-50/70";
  const primary = isNeuro ? "bg-cyan-600 hover:bg-cyan-500" : "bg-blue-600 hover:bg-blue-500";

  function resetQuestionView() {
    setSelectedChoice(null);
    setShowHint(false);
    setShowExplain(false);
  }

  function startQuest(mode, startIndex = 0) {
    setGameMode(mode);
    setRealmIndex(startIndex);
    setQuestionIndex(0);
    setScore(0);
    setAnswered([]);
    resetQuestionView();
    setScreen("play");
  }

  function openRealm(mode, index) {
    setGameMode(mode);
    setRealmIndex(index);
    setQuestionIndex(0);
    resetQuestionView();
    setScreen("play");
  }

  function submitAnswer() {
    if (selectedChoice === null || showExplain || !currentQuestion) return;
    const chosen = optionPack[selectedChoice];
    const correct = !!chosen?.correct;
    if (correct) setScore((prev) => prev + currentQuestion.points);
    setAnswered((prev) => [...prev, { id: currentQuestion.id, correct }]);
    setShowExplain(true);
  }

  function toggleSave() {
    if (!currentQuestion) return;
    setReviewList((prev) =>
      prev.includes(currentQuestion.id) ? prev.filter((id) => id !== currentQuestion.id) : [...prev, currentQuestion.id]
    );
  }

  function nextQuestion() {
    if (!currentQuestion) return;
    if (questionIndex + 1 < currentRealmQuestions.length) {
      setQuestionIndex((prev) => prev + 1);
      resetQuestionView();
      return;
    }

    if (realmIndex + 1 < realms.length) {
      setScreen("realmComplete");
      return;
    }

    setScreen("result");
  }

  function continueToNextRealm() {
    if (realmIndex + 1 >= realms.length) {
      setScreen("result");
      return;
    }
    setRealmIndex((prev) => prev + 1);
    setQuestionIndex(0);
    resetQuestionView();
    setScreen("play");
  }

  function replayCurrentMode() {
    startQuest(gameMode, 0);
  }

  const filteredEasyRealms = EASY_REALMS.filter((realm) => {
    const t = search.toLowerCase();
    return !t || realm.name.toLowerCase().includes(t) || realm.description.toLowerCase().includes(t);
  });
  const filteredHardRealms = HARD_REALMS.filter((realm) => {
    const t = search.toLowerCase();
    return !t || realm.name.toLowerCase().includes(t) || realm.description.toLowerCase().includes(t);
  });

  return (
    <div className={`min-h-screen p-6 text-slate-900 ${appBg}`}>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className={`flex flex-wrap items-center justify-between gap-4 rounded-[28px] border px-5 py-5 ${shell}`}>
          <div>
            <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${panel}`}>
              Physical AI interview quiz
            </div>
            <h1 className="mt-3 text-3xl md:text-5xl font-black tracking-tight">Physical AI - Mission Possible</h1>
            <p className="mt-2 max-w-3xl text-sm md:text-base leading-7 text-slate-600">
              {isNeuro
                ? "A calmer interface with the same quiz depth, softer contrast and reduced visual intensity."
                : "A structured robotics quiz with easy foundations and harder research-inspired realms."}
            </p>
          </div>
          <SegmentedToggle
            value={uiMode}
            onChange={setUiMode}
            leftLabel="Normal"
            leftValue="normal"
            rightLabel="Neurodiverse"
            rightValue="neuro"
          />
        </div>

        {screen === "home" && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6">
              <Card className={`rounded-[30px] border ${shell}`}>
                <CardContent className="p-8 space-y-5">
                  <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${panel}`}>
                    Two difficulty tracks
                  </div>
                  <h2 className="text-2xl md:text-4xl font-black leading-tight">Build fundamentals first, then move into harder robotics theory.</h2>
                  <p className="max-w-2xl text-base md:text-lg leading-8 text-slate-600">
                    Easy mode targets ages 15+ and undergraduate foundations. Difficulty mode contains more theoretically challenging questions, with the back half of each realm inspired by active research themes.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button className={`rounded-2xl px-5 py-6 text-base text-white ${primary}`} onClick={() => startQuest("easy", 0)}>
                      Start Easy Mode
                    </Button>
                    <Button variant="secondary" className={`rounded-2xl px-5 py-6 text-base border ${panel}`} onClick={() => startQuest("hard", 0)}>
                      Start Difficulty Mode
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className={`rounded-[30px] border ${shell}`}>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <div className="text-sm font-medium text-slate-500">Question bank</div>
                    <div className="mt-2 text-5xl font-black">{QUESTION_BANK.length}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className={`rounded-2xl border p-4 ${panel}`}>
                      <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Easy realms</div>
                      <div className="mt-1 text-2xl font-bold">{EASY_REALMS.length}</div>
                    </div>
                    <div className={`rounded-2xl border p-4 ${panel}`}>
                      <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Hard realms</div>
                      <div className="mt-1 text-2xl font-bold">{HARD_REALMS.length}</div>
                    </div>
                  </div>
                  <div className={`rounded-2xl border p-4 text-sm leading-6 ${panel}`}>
                    Infinite play is enabled because there are no lives. You can replay any mode or jump directly into any realm.
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className={`rounded-[30px] border ${shell}`}>
              <CardHeader>
                <CardTitle className="text-2xl font-black">Browse realms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by topic"
                  className="max-w-md rounded-2xl border-blue-100 bg-white text-slate-900 placeholder:text-slate-400"
                />

                <div className="space-y-4">
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50">Easy Mode</Badge>
                      <span className="text-sm text-slate-600">Undergraduate level, ages 15+.</span>
                    </div>
                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                      {filteredEasyRealms.map((realm, idx) => (
                        <motion.button
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.99 }}
                          key={`easy-${realm.name}`}
                          onClick={() => openRealm("easy", idx)}
                          className="rounded-[26px] border border-blue-100 bg-white p-5 text-left shadow-[0_10px_30px_rgba(37,99,235,0.08)]"
                        >
                          <div className="h-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400" />
                          <div className="mt-4 flex items-center justify-between gap-3">
                            <div className="text-xl font-bold">{realm.name}</div>
                            <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50">10 questions</Badge>
                          </div>
                          <div className="mt-2 text-sm leading-6 text-slate-600">{realm.description}</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100">Difficulty Mode</Badge>
                      <span className="text-sm text-slate-600">First 5 starter questions, final 5 research-inspired.</span>
                    </div>
                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                      {filteredHardRealms.map((realm, idx) => (
                        <motion.button
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.99 }}
                          key={`hard-${realm.name}`}
                          onClick={() => openRealm("hard", idx)}
                          className="rounded-[26px] border border-blue-100 bg-white p-5 text-left shadow-[0_10px_30px_rgba(37,99,235,0.08)]"
                        >
                          <div className="h-1 rounded-full bg-gradient-to-r from-slate-700 to-blue-500" />
                          <div className="mt-4 flex items-center justify-between gap-3">
                            <div className="text-xl font-bold">{realm.name}</div>
                            <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100">10 questions</Badge>
                          </div>
                          <div className="mt-2 text-sm leading-6 text-slate-600">{realm.description}</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {screen === "play" && currentQuestion && (
          <div className="grid xl:grid-cols-[1.12fr_0.88fr] gap-6 items-start">
            <Card className={`rounded-[32px] border overflow-hidden ${shell}`}>
              <div className={`h-1.5 ${isNeuro ? "bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400" : "bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400"}`} />
              <CardContent className="p-6 md:p-8 space-y-6">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className="rounded-full bg-blue-50 text-blue-700 hover:bg-blue-50">{currentQuestion.realm}</Badge>
                      <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">{currentQuestion.difficulty}</Badge>
                      <Badge className="rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-50">Question {questionIndex + 1}/{currentRealmQuestions.length}</Badge>
                    </div>
                    <div className="text-sm font-medium uppercase tracking-[0.12em] text-slate-500">{currentQuestion.points} pts</div>
                  </div>
                  <Button variant="secondary" className={`rounded-2xl border ${panel}`} onClick={() => setScreen("home")}>Exit</Button>
                </div>

                {gameMode === "easy" && (
                  <div className={`rounded-2xl border p-4 text-sm leading-6 ${panel}`}>
                    Disclaimer: Easy mode contains basic undergraduate-level concepts and is suitable for ages 15 and beyond.
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-3 rounded-full bg-blue-100" />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestion.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    <div className={`rounded-[28px] border p-5 ${panel}`}>
                      <div className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-700">Question</div>
                      <h2 className="mt-3 text-2xl md:text-3xl font-black leading-tight">{currentQuestion.prompt}</h2>
                    </div>

                    <div className="grid gap-3">
                      {optionPack.map((option, index) => {
                        const isCorrect = showExplain && option.correct;
                        const isWrong = showExplain && selectedChoice === index && !option.correct;
                        return (
                          <button
                            key={option.id}
                            onClick={() => !showExplain && setSelectedChoice(index)}
                            className={`rounded-[24px] border px-4 py-4 text-left transition-all duration-200 ${
                              isCorrect
                                ? "border-emerald-300 bg-emerald-50"
                                : isWrong
                                ? "border-rose-300 bg-rose-50"
                                : selectedChoice === index
                                ? isNeuro
                                  ? "border-cyan-300 bg-cyan-50"
                                  : "border-blue-300 bg-blue-50"
                                : "border-blue-100 bg-white hover:bg-blue-50/60"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`mt-0.5 h-8 w-8 rounded-full border flex items-center justify-center text-xs font-bold ${selectedChoice === index ? "border-blue-300 text-blue-700" : "border-slate-200 text-slate-600"}`}>
                                {String.fromCharCode(65 + index)}
                              </div>
                              <div className="leading-7 text-slate-800">{option.text}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button className={`rounded-2xl text-white ${primary}`} onClick={submitAnswer} disabled={selectedChoice === null || showExplain}>
                        Submit
                      </Button>
                      <Button variant="secondary" className={`rounded-2xl border ${panel}`} onClick={() => setShowHint((prev) => !prev)}>
                        {showHint ? (isNeuro ? "Hide support" : "Hide hint") : (isNeuro ? "Show support" : "Show hint")}
                      </Button>
                      <Button variant="secondary" className={`rounded-2xl border ${panel}`} onClick={toggleSave}>
                        {reviewList.includes(currentQuestion.id) ? "Remove from review" : "Save for review"}
                      </Button>
                    </div>

                    {showHint && (
                      <div className={`rounded-[24px] border p-4 ${panel}`}>
                        <div className="text-sm font-semibold uppercase tracking-[0.08em] text-blue-700">{isNeuro ? "Support cue" : "Hint"}</div>
                        <p className="mt-2 leading-7 text-slate-700">{currentQuestion.hint}</p>
                      </div>
                    )}

                    {showExplain && (
                      <div className="space-y-4">
                        <div className="rounded-[24px] border border-emerald-200 bg-emerald-50 p-4">
                          <div className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">Explanation</div>
                          <p className="mt-2 leading-7 text-slate-700">{currentQuestion.explain}</p>
                        </div>
                        <div className="rounded-[24px] border border-sky-200 bg-sky-50 p-4">
                          <div className="text-sm font-semibold uppercase tracking-[0.14em] text-sky-700">Example</div>
                          <p className="mt-2 leading-7 text-slate-700">{currentQuestion.example}</p>
                        </div>
                        <Button className={`rounded-2xl text-white ${primary}`} onClick={nextQuestion}>
                          Next question
                        </Button>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className={`rounded-[30px] border ${shell}`}>
                <CardHeader>
                  <CardTitle className="text-xl font-black">Session status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className={`rounded-2xl border p-4 ${panel}`}>
                      <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Score</div>
                      <div className="mt-1 text-3xl font-black">{score}</div>
                    </div>
                    <div className={`rounded-2xl border p-4 ${panel}`}>
                      <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Accuracy</div>
                      <div className="mt-1 text-3xl font-black">{accuracy}%</div>
                    </div>
                  </div>
                  <div className={`rounded-2xl border p-4 ${panel}`}>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Mode</div>
                    <div className="mt-1 text-2xl font-black">{gameMode === "easy" ? "Easy" : "Difficulty"}</div>
                  </div>
                  <div className={`rounded-2xl border p-4 ${panel}`}>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Saved cards</div>
                    <div className="mt-1 text-2xl font-black">{savedQuestionIds.length}</div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`rounded-[30px] border ${shell}`}>
                <CardHeader>
                  <CardTitle className="text-xl font-black">Quiz notes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-slate-700">
                  <div className={`rounded-2xl border p-4 ${panel}`}>Lives have been removed, so you can keep playing without being stopped by mistakes.</div>
                  <div className={`rounded-2xl border p-4 ${panel}`}>Easy mode covers undergraduate fundamentals such as ML, math, manipulators and compute.</div>
                  <div className={`rounded-2xl border p-4 ${panel}`}>Difficulty mode starts with foundational questions and shifts to research-inspired ideas in the second half.</div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {screen === "realmComplete" && (
          <div className="max-w-4xl mx-auto pt-6">
            <Card className={`rounded-[32px] border ${shell}`}>
              <CardContent className="p-8 space-y-6">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">Realm complete</div>
                  <h2 className="mt-2 text-3xl font-black">{currentRealm?.name} finished</h2>
                  <p className="mt-2 leading-7 text-slate-600">You completed all 10 questions in this realm. Continue to the next one whenever you are ready.</p>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className={`rounded-2xl border p-5 ${panel}`}>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Score</div>
                    <div className="mt-1 text-3xl font-black">{score}</div>
                  </div>
                  <div className={`rounded-2xl border p-5 ${panel}`}>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Accuracy</div>
                    <div className="mt-1 text-3xl font-black">{accuracy}%</div>
                  </div>
                  <div className={`rounded-2xl border p-5 ${panel}`}>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Up next</div>
                    <div className="mt-1 text-xl font-bold">{realms[realmIndex + 1]?.name || "Results"}</div>
                  </div>
                </div>
                <Button className={`rounded-2xl text-white ${primary}`} onClick={continueToNextRealm}>
                  Continue to {realms[realmIndex + 1]?.name || "Results"}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {screen === "result" && (
          <div className="max-w-4xl mx-auto pt-6">
            <Card className={`rounded-[32px] border ${shell}`}>
              <CardContent className="p-8 space-y-6">
                <div>
                  <h2 className="text-3xl font-black">Session complete</h2>
                  <p className="mt-1 text-slate-600">You finished this run of Physical AI - Mission Possible.</p>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className={`rounded-2xl border p-5 ${panel}`}>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Final score</div>
                    <div className="mt-1 text-4xl font-black">{score}</div>
                  </div>
                  <div className={`rounded-2xl border p-5 ${panel}`}>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Accuracy</div>
                    <div className="mt-1 text-4xl font-black">{accuracy}%</div>
                  </div>
                  <div className={`rounded-2xl border p-5 ${panel}`}>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Saved cards</div>
                    <div className="mt-1 text-4xl font-black">{savedQuestionIds.length}</div>
                  </div>
                </div>
                <div className={`rounded-2xl border p-5 leading-7 ${panel}`}>
                  You can replay either mode as often as you like. There is no lives limit, so the quiz is designed for repeated practice.
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button className={`rounded-2xl text-white ${primary}`} onClick={replayCurrentMode}>Replay current mode</Button>
                  <Button variant="secondary" className={`rounded-2xl border ${panel}`} onClick={() => setScreen("home")}>Back home</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
