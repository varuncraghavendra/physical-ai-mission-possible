// ============================================================
// PART 1 of 3 — Imports, Realm Definitions, Question Bank
// ============================================================
import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── primitives ────────────────────────────────────────────
function Progress({ value = 0, color = "bg-blue-500", className = "" }) {
  return (
    <div className={`w-full overflow-hidden rounded-full bg-white/10 ${className}`}>
      <div className={`h-full ${color} transition-all duration-500`} style={{ width: `${Math.max(0,Math.min(100,value))}%` }} />
    </div>
  );
}

// ── Realm definitions ─────────────────────────────────────
const CALM_REALMS = [
  { name:"Kinematics",        desc:"Position, orientation, motion and transformations.", icon:"🦾", color:"from-emerald-400 to-teal-500" },
  { name:"Control",           desc:"Feedback, PID, stability and trajectory tracking.",  icon:"🎛️", color:"from-teal-400 to-cyan-500" },
  { name:"SLAM & Estimation", desc:"Localization, mapping, filtering under uncertainty.",icon:"🗺️", color:"from-cyan-400 to-blue-500" },
  { name:"Dynamics",          desc:"Forces, inertia, torque and equations of motion.",   icon:"⚙️", color:"from-blue-400 to-indigo-500" },
  { name:"Perception",        desc:"Vision, depth, calibration and scene understanding.",icon:"👁️", color:"from-violet-400 to-purple-500" },
  { name:"Machine Learning",  desc:"Learning for robot perception and decisions.",        icon:"🧠", color:"from-purple-400 to-pink-500" },
  { name:"Linear Algebra",    desc:"Matrices, vectors and transformations in robotics.", icon:"📐", color:"from-pink-400 to-rose-500" },
  { name:"Probability",       desc:"Uncertainty and probabilistic models in robotics.",  icon:"🎲", color:"from-rose-400 to-orange-500" },
  { name:"Manipulators",      desc:"Robot arms, Jacobians, workspace and force control.",icon:"🤖", color:"from-orange-400 to-amber-500" },
  { name:"Computation",       desc:"CPU/GPU fundamentals for robotics and AI.",          icon:"💻", color:"from-amber-400 to-yellow-500" },
];

const COMPETITIVE_REALMS = [
  { name:"Numerical Optimization",  desc:"Convexity, gradient methods, trajectory planning.",      icon:"📈", color:"from-blue-500 to-cyan-400" },
  { name:"Reinforcement Learning",  desc:"Policy learning, value functions, modern robot RL.",     icon:"🎮", color:"from-cyan-500 to-teal-400" },
  { name:"Foundation Models",       desc:"LLMs, VLAs, embodied AI and robot reasoning.",           icon:"🌐", color:"from-teal-500 to-emerald-400" },
  { name:"Aerial Robotics",         desc:"UAV dynamics, estimation and agile flight.",             icon:"✈️", color:"from-sky-500 to-blue-400" },
  { name:"Underwater Robotics",     desc:"Navigation and localisation for underwater systems.",    icon:"🌊", color:"from-blue-600 to-indigo-400" },
  { name:"Autonomous Driving",      desc:"Perception, prediction, planning, end-to-end.",          icon:"🚗", color:"from-indigo-500 to-violet-400" },
  { name:"Legged Locomotion",       desc:"Contact planning, stability, ZMP, legged control.",      icon:"🦿", color:"from-violet-500 to-purple-400" },
  { name:"Motion Planning",         desc:"Sampling, graph search, optimisation, completeness.",    icon:"🧭", color:"from-purple-500 to-pink-400" },
  { name:"ROS2",                    desc:"DDS, lifecycle nodes, executors, real-time tooling.",    icon:"🔧", color:"from-pink-500 to-rose-400" },
  { name:"Cloud Robotics",          desc:"Docker, fleet ops, CI/CD, cloud-native robotics.",       icon:"☁️", color:"from-rose-500 to-red-400" },
  { name:"Robot Communication",     desc:"RF, protocols, middleware, TCP/UDP, CAN, EtherCAT.",    icon:"📡", color:"from-red-500 to-orange-400" },
  { name:"Space Robotics",          desc:"Orbital mechanics, autonomy, radiation, rovers.",        icon:"🚀", color:"from-orange-500 to-amber-400" },
  { name:"Assistive Robotics",      desc:"Prosthetics, exoskeletons, BCI, rehabilitation.",        icon:"🦾", color:"from-amber-500 to-yellow-400" },
  { name:"Industrial Robotics",     desc:"ISO standards, safety, cobots, production automation.", icon:"🏭", color:"from-lime-500 to-green-400" },
  { name:"CAD for Robotics",        desc:"URDF, SDF, Fusion 360, GD&T, FEA, mechanical design.",  icon:"📐", color:"from-green-500 to-emerald-400" },
  { name:"Power Systems",           desc:"Battery, BMS, power electronics, BLDC drives.",          icon:"⚡", color:"from-emerald-500 to-teal-400" },
  { name:"Deep Learning Robotics",  desc:"CNNs, transformers, imitation learning, sim-to-real.",  icon:"🧠", color:"from-teal-500 to-cyan-400" },
  { name:"Sensors",                 desc:"LiDAR, IMU, encoders, force/torque, cameras.",           icon:"📷", color:"from-cyan-500 to-sky-400" },
  { name:"Actuators",               desc:"DC, BLDC, servo, hydraulic, pneumatic, soft.",           icon:"⚙️", color:"from-sky-500 to-blue-400" },
  { name:"Robotic Dexterity",       desc:"Multi-finger hands, soft robotics, tactile sensing.",    icon:"🖐️", color:"from-blue-500 to-indigo-400" },
];

// ── question factory ──────────────────────────────────────
// opts: array of 4 strings where index `ans` is always the CORRECT one.
// Shuffling happens at render time so the correct answer appears in a random slot each time.
function q(id,realm,mode,diff,pts,prompt,opts,ans,hint,explain,example){
  return{id,realm,mode,difficulty:diff,points:pts,prompt,options:opts,answer:ans,hint,explain,example};
}

// ════════════════════════════════════════════════════════
// QUESTION BANK
// Rule: options[answer] is the correct answer.
// All 4 options are similar in length and style.
// The correct answer is NOT always the longest.
// ════════════════════════════════════════════════════════
const QUESTION_BANK = [

// ── CALM: Kinematics (1001-1015) ─────────────────────────
q(1001,"Kinematics","calm","Easy",10,
  "What does forward kinematics compute?",
  ["Joint torques needed to reach a target pose.",
   "End-effector pose from known joint variables.",
   "Optimal trajectory between two configurations.",
   "Sensor noise model for joint encoders."],
  1,"Joints in → pose out.",
  "FK maps joint coordinates to end-effector position and orientation in the base frame.",
  "A robot arm uses FK to find where its gripper is given encoder readings."),

q(1002,"Kinematics","calm","Easy",10,
  "What algebraic property defines a valid 3D rotation matrix?",
  ["Its trace equals the rotation angle in radians.",
   "All entries are non-negative real numbers.",
   "Its columns are mutually orthonormal and its determinant equals +1.",
   "It is always a symmetric matrix."],
  2,"R^T R = I, det = +1.",
  "Rotation matrices belong to SO(3): orthonormal columns preserve lengths and angles, det=+1 distinguishes rotations from reflections.",
  "Camera-to-base frame alignment uses a rotation matrix satisfying these constraints."),

q(1003,"Kinematics","calm","Easy",10,
  "What four parameters do Denavit-Hartenberg conventions assign per joint?",
  ["Motor torque, gear ratio, link mass, joint velocity.",
   "Focal length, baseline, distortion coefficient, resolution.",
   "Link length, link twist, joint offset, and joint angle.",
   "Voltage, current, resistance, and temperature."],
  2,"Four geometric numbers per joint.",
  "DH parameters (a, α, d, θ) describe consecutive link geometry systematically, enabling a transformation chain.",
  "Used to derive forward kinematics tables for serial manipulators."),

q(1004,"Kinematics","calm","Easy",10,
  "Why can a 6-DOF robot arm have multiple IK solutions for the same end-effector pose?",
  ["Each joint independently contributes exactly two angle solutions.",
   "The joint limits create mirror-image configurations across each axis.",
   "Different elbow and wrist configurations can place the end effector at the same pose.",
   "Numerical solvers introduce spurious extra solutions during iteration."],
  2,"Elbow-up/down and wrist flips.",
  "Geometric ambiguities at shoulder, elbow, and wrist joints combine, giving up to 16 valid configurations for a spherical wrist.",
  "Industrial robots store preferred solution branches to avoid unexpected motion during operation."),

q(1005,"Kinematics","calm","Easy",10,
  "What does the manipulator Jacobian matrix map?",
  ["Second derivatives of joint positions to link accelerations.",
   "Joint-velocity vector to end-effector velocity twist.",
   "Joint torques to Cartesian forces at the tool.",
   "Inertia tensor of the last link to base-frame coordinates."],
  1,"ẋ = J(q)·q̇.",
  "The Jacobian relates joint rates to Cartesian rates and is used for velocity control and singularity analysis.",
  "Real-time velocity control inverts or pseudo-inverts J(q) every control cycle."),

q(1006,"Kinematics","calm","Easy",10,
  "How does a prismatic joint differ from a revolute joint kinematically?",
  ["Prismatic joints rotate about a fixed axis; revolute joints translate along an axis.",
   "Both produce translation but prismatic joints have a variable axis direction.",
   "Prismatic joints produce linear translation; revolute joints produce rotation about an axis.",
   "Revolute joints are always unbounded; prismatic joints have hard stops."],
  2,"Translation vs rotation.",
  "Prismatic joints change DH offset d; revolute joints change angle θ in the transformation chain.",
  "Cartesian robots rely on prismatic joints for orthogonal linear axes."),

q(1007,"Kinematics","calm","Medium",10,
  "What mathematical condition defines a kinematic singularity?",
  ["All joint angles simultaneously reach their physical limits.",
   "The inertia matrix becomes ill-conditioned near a workspace boundary.",
   "The Jacobian loses full row rank, eliminating reachable Cartesian directions.",
   "The end effector exits the dexterous but remains in the reachable workspace."],
  2,"det(JJ^T)=0 at a singularity.",
  "When rank(J) drops below the task dimension, some Cartesian velocities cannot be generated regardless of joint velocities.",
  "Near singularities, tiny Cartesian commands require very large joint velocities."),

q(1008,"Kinematics","calm","Medium",10,
  "What distinguishes the dexterous workspace from the reachable workspace?",
  ["Dexterous workspace excludes singular configurations; reachable workspace includes them.",
   "Dexterous workspace requires all orientations to be achievable; reachable workspace requires at least one.",
   "Dexterous workspace is larger for robots with more than 6 DOF.",
   "Reachable workspace is the subset where task-space velocity control is stable."],
  1,"Full orientation freedom vs any one orientation.",
  "The dexterous workspace is a subset where arbitrary end-effector orientations are possible at every point.",
  "Six-DOF arms are designed to maximise dexterous workspace for assembly tasks."),

q(1009,"Kinematics","calm","Medium",10,
  "Which rotation representation avoids gimbal lock?",
  ["ZYX Euler angles stored as a 3-vector.",
   "Rotation matrices stored as a 3×3 array.",
   "Unit quaternions parameterising SO(3) on a 3-sphere.",
   "Axis-angle representation with a magnitude-encoded axis."],
  2,"Quaternions have no gimbal lock.",
  "Euler angles lose a DOF when two axes align; unit quaternions represent every rotation without this topological issue.",
  "Flight controllers commonly use quaternions for attitude estimation to avoid singularities."),

q(1010,"Kinematics","calm","Medium",10,
  "Why does composing two rigid-body transforms require 4×4 matrix multiplication rather than simple addition?",
  ["4×4 matrices store more bits per element than 3×3 matrices, reducing round-off error.",
   "Addition is undefined for any non-square sub-blocks in the transform.",
   "Translation is rotated by the first frame's rotation before being added to it.",
   "The determinant must remain +1, which addition cannot guarantee."],
  2,"Translation couples with rotation under composition.",
  "The product T1·T2 correctly rotates the second translation by the first rotation, then adds — simple addition would ignore this coupling.",
  "Chaining DH transforms along a kinematic chain exploits exactly this product structure."),

q(1011,"Kinematics","calm","Medium",10,
  "What solution does the Jacobian pseudo-inverse provide for redundant manipulators?",
  ["The unique closed-form IK solution for any reachable end-effector pose.",
   "The maximum-torque joint velocity that achieves a desired Cartesian velocity.",
   "The minimum-norm joint velocity that achieves a desired end-effector velocity.",
   "An exact singularity-free solution that avoids all joint limits."],
  2,"J† gives minimum-norm q̇.",
  "J† = J^T(JJ^T)^-1 gives the minimum-norm least-squares solution; the null-space component can be used for secondary objectives.",
  "Redundancy resolution exploits the null space for joint-limit and obstacle avoidance."),

q(1012,"Kinematics","calm","Hard",10,
  "In the product-of-exponentials formulation, what does exp(ξ̂·θ) represent?",
  ["The covariance matrix of the joint angle estimate from encoder noise.",
   "A Taylor linearisation of the DH table evaluated at zero configuration.",
   "The rigid-body transform produced by rotating joint i by angle θ about its screw axis ξ.",
   "The mass distribution of link i encoded as an exponential of its inertia tensor."],
  2,"POE: T = exp(ξ1·t1)·…·exp(ξN·tN)·M.",
  "Each exponential is a full SE(3) transform derived from the joint screw axis expressed in the world frame at zero configuration.",
  "POE avoids DH conventions and handles all kinematic chain types elegantly."),

q(1013,"Kinematics","calm","Hard",10,
  "What does the null space of the Jacobian represent for a redundant robot?",
  ["The set of singular configurations where motion becomes uncontrollable.",
   "Directions of maximum end-effector acceleration under unit joint torque.",
   "Joint velocities that exceed actuator limits and must be projected away.",
   "Joint motions that produce no end-effector movement and can serve secondary goals."],
  3,"Internal motion with zero task-space effect.",
  "For n>m DOF, dim(null(J)) = n−rank(J) > 0; these directions reconfigure the robot without disturbing the task.",
  "Gradient projection into null(J) avoids joint limits while tracking the primary task."),

q(1014,"Kinematics","calm","Hard",10,
  "Why is the condition number of the Jacobian a better manipulability indicator than det(J)?",
  ["det(J) requires O(n³) computation; condition number is O(n) using the trace.",
   "Condition number is always 1 for fully redundant robots, giving a universal reference.",
   "det(J) only applies to square Jacobians, making it undefined for redundant arms.",
   "Condition number reveals how close the smallest singular value is to zero, capturing near-singularity in all directions."],
  3,"σ_max/σ_min captures worst-case direction.",
  "det(J) can be small even far from singularity; σ_min from SVD directly measures worst-case velocity amplification.",
  "Trajectory planners minimise condition number to maintain uniform dexterity along a path."),

q(1015,"Kinematics","calm","Hard",10,
  "How does Chasles' theorem simplify the description of any rigid-body displacement?",
  ["It decomposes any rigid motion into exactly three independent planar rotations.",
   "It proves that screw theory applies only to planar 2D mechanisms.",
   "Any rigid motion equals a rotation about and translation along a single screw axis.",
   "Every rigid displacement can be parameterised with exactly four independent numbers."],
  2,"One screw axis describes any 3D rigid motion.",
  "Chasles: every rigid displacement equals a pure screw (rotation plus translation along the same axis).",
  "Product-of-exponentials FK builds on this by composing joint screws along the chain."),

// ── CALM: Control (1016-1030) ─────────────────────────────
q(1016,"Control","calm","Easy",10,
  "What does the integral term in a PID controller accumulate and what problem does it solve?",
  ["Derivative of sensor noise, amplifying high-frequency measurement errors.",
   "Product of proportional gain and instantaneous velocity for feedforward.",
   "Time-integral of tracking error, eliminating steady-state bias from disturbances.",
   "Sum of all future reference values to pre-compensate known trajectories."],
  2,"Integral of error removes constant offsets.",
  "Without integral action, constant disturbances like gravity produce a fixed tracking offset that P and D terms alone cannot remove.",
  "Gravity compensation feedforward can reduce the need for integral action in joint control."),

q(1017,"Control","calm","Easy",10,
  "What does the Nyquist stability criterion assess?",
  ["The minimum sampling rate needed to avoid aliasing in digital control.",
   "Whether the closed-loop system is stable, via encirclements of the −1 point.",
   "Maximum PID gains before actuator saturation occurs.",
   "The bandwidth of an anti-aliasing digital filter required before sampling."],
  1,"Encirclements of −1 determine closed-loop stability.",
  "The Nyquist plot of the open-loop response counts right-half-plane poles of the closed-loop system.",
  "Used alongside Bode plots in classical loop-shaping controller design."),

q(1018,"Control","calm","Easy",10,
  "What does gain margin quantify in a control system?",
  ["The ratio of proportional gain to derivative gain at the operating point.",
   "The maximum time delay the system can tolerate before going unstable.",
   "The maximum joint torque the controller can command before saturation.",
   "How much open-loop gain can increase before closed-loop instability occurs."],
  3,"Gain headroom before instability at phase-crossover frequency.",
  "Gain margin = 1/|G(jω_pc)|; a common design target is at least 6 dB of margin.",
  "Phase margin and gain margin together characterise robust stability of the loop."),

q(1019,"Control","calm","Easy",10,
  "Why is feedforward combined with feedback in precision robot motion control?",
  ["Feedforward replaces all sensors once the model is accurate enough.",
   "Feedforward increases integral windup, which improves disturbance rejection.",
   "Feedforward guarantees global stability regardless of model uncertainty.",
   "Feedforward cancels known dynamics proactively; feedback corrects residual errors reactively."],
  3,"Anticipate with FF, correct with FB.",
  "Model-based feedforward reduces burden on the feedback loop, allowing lower gains and better stability margins.",
  "Computed-torque control uses inverse dynamics as the feedforward term."),

q(1020,"Control","calm","Easy",10,
  "Why does PD control leave a steady-state error under constant disturbances that PID eliminates?",
  ["PD always overshoots more than PID, which shifts the steady-state value.",
   "PD cannot track step references because it has no low-frequency gain.",
   "PD has no integral action to accumulate and cancel persistent offsets.",
   "PD derivative gain causes instability in the presence of constant loads."],
  2,"No integral means residual bias under constant load.",
  "A constant disturbance produces a fixed offset that only the integral term can drive to zero over time.",
  "PD plus gravity compensation feedforward is the most common joint controller structure."),

q(1021,"Control","calm","Medium",10,
  "What is integral windup and why must it be mitigated?",
  ["High-frequency oscillation caused by excessive derivative gain in the loop.",
   "Desired accumulation of integral action very close to the setpoint.",
   "Measurement noise amplification through the integral branch of the controller.",
   "The integrator accumulates error during actuator saturation, causing large overshoot when the limit is released."],
  3,"Saturation + integration = windup.",
  "When the actuator clips, the integrator keeps growing; anti-windup schemes clamp or back-calculate the integrator state to prevent this.",
  "Back-calculation and clamping are the two most common anti-windup strategies in practice."),

q(1022,"Control","calm","Medium",10,
  "In state-space ẋ=Ax+Bu, what does full rank of the controllability matrix imply?",
  ["All eigenvalues of A lie in the left half-plane, ensuring open-loop stability.",
   "All states can be measured without noise using the available outputs.",
   "The system is asymptotically stable without any control input applied.",
   "Every state can be driven to any desired value using the available input."],
  3,"Full rank means fully controllable.",
  "If rank(C)=n, every state is reachable from the origin; uncontrollable modes cannot be placed by any linear feedback.",
  "LQR and pole placement both require the controllability condition to be satisfied."),

q(1023,"Control","calm","Medium",10,
  "What does Lyapunov's direct method prove about a dynamical system?",
  ["If the linearisation is stable, the full nonlinear system is globally stable.",
   "The largest eigenvalue of A must be negative for stability.",
   "Stability holds only for linear time-invariant systems, not nonlinear ones.",
   "If a positive-definite V with V̇≤0 exists, the system is stable without solving the ODEs."],
  3,"Energy-like function proves stability without ODE solution.",
  "V is a generalised energy; V̇≤0 means energy never increases, preventing divergence from equilibrium.",
  "Lyapunov functions are the primary tool for proving nonlinear system stability."),

q(1024,"Control","calm","Medium",10,
  "What is the separation principle in observer-based control?",
  ["The integral and derivative gains can always be tuned independently.",
   "Observers must always be designed before controllers in every nonlinear case.",
   "Observer and controller gains can be designed independently for linear systems.",
   "Integral action must always be placed last in the loop structure."],
  2,"Design observer and controller independently.",
  "For LTI systems, closed-loop eigenvalues equal the union of controller and observer poles; LQG exploits this separation.",
  "The separation principle breaks down for nonlinear systems in general."),

q(1025,"Control","calm","Medium",10,
  "In model predictive control, what is the receding-horizon principle?",
  ["The prediction horizon grows over time until the terminal state is reached.",
   "The receding horizon replaces the need for a plant dynamics model.",
   "It sets the integral time constant of an embedded PID structure.",
   "Solve a finite-horizon optimisation each step, apply only the first control; shift horizon and repeat."],
  3,"Solve, apply first input, shift horizon, repeat.",
  "MPC re-solves at each timestep with updated state, combining feedforward optimality and feedback robustness.",
  "Warm-starting the previous solution significantly reduces solve time in practice."),

q(1026,"Control","calm","Hard",10,
  "Why does collocated control provide a passivity advantage?",
  ["Collocated sensors are always more accurate than non-collocated remote sensors.",
   "Non-collocated control is only unstable at very high frequencies.",
   "Collocated control removes the need for any model-based feedforward term.",
   "Collocated input-output pairs are passive, guaranteeing stability for any positive gain."],
  3,"Passivity guarantees unconditional stability.",
  "Collocation creates a transfer function with alternating poles and zeros, making the system passive and robustly stable.",
  "Flexible robot joints exploit collocation to avoid spillover instability into structural modes."),

q(1027,"Control","calm","Hard",10,
  "How does H∞ control differ from LQR in its treatment of disturbances?",
  ["H∞ assumes no disturbances at all; LQR assumes adversarial worst-case disturbances.",
   "H∞ requires full state feedback; LQR only requires output feedback measurements.",
   "Both use identical Riccati equations but with different weighting matrix choices.",
   "H∞ minimises worst-case disturbance amplification; LQR minimises expected quadratic cost under Gaussian noise."],
  3,"Worst-case vs average-case disturbance treatment.",
  "H∞ solves a min-max game against worst-case L2-bounded disturbances; LQR uses a stochastic average-cost criterion.",
  "Robust robot controllers often use H∞ to handle structured modelling uncertainty."),

q(1028,"Control","calm","Hard",10,
  "In impedance control for robot interaction, what physical quantity is regulated?",
  ["Absolute joint torques to rigidly follow a fixed reference trajectory.",
   "Cartesian acceleration regardless of external contact forces.",
   "Time-integral of contact force over the duration of the interaction.",
   "The dynamic relationship (mass-spring-damper) between end-effector force and position deviation."],
  3,"Force-displacement dynamics: Z(s)=F(s)/Ẋ(s).",
  "Impedance control shapes how stiff or compliant the robot feels to external forces, enabling safe human-robot interaction.",
  "Collaborative robots and surgical tools rely on impedance control for safe contact behaviour."),

q(1029,"Control","calm","Hard",10,
  "Why does pure time delay reduce stability margins in a feedback loop?",
  ["Time delay increases gain margin by naturally preventing high-frequency oscillation.",
   "Time delay shifts all poles leftward, paradoxically improving stability margins.",
   "Delay only affects the integral branch, not the proportional or derivative terms.",
   "It contributes phase lag of −ω·τ that grows without bound as frequency increases, eroding phase margin."],
  3,"Phase lag grows unboundedly with frequency.",
  "A pure delay is all-pass with phase −ω·τ; at the gain-crossover frequency this lag can consume the entire phase margin.",
  "Network-controlled robots must explicitly account for communication latency in design."),

q(1030,"Control","calm","Hard",10,
  "What makes the flexible-joint robot model require two separate dynamic subsystems?",
  ["Flexible joints need separate friction models for static and kinetic phases.",
   "Two separate models are needed for prismatic and revolute joints respectively.",
   "One model handles heavy links while another handles the lightweight end-effector.",
   "Link-side and motor-side dynamics are elastically coupled, doubling the state dimension and introducing resonance modes."],
  3,"Elastic coupling: link-side + motor-side states.",
  "Torsional spring between motor and link introduces motor angle, link angle, and resonant modes absent in rigid-joint models.",
  "Singular perturbation and two-DOF controllers specifically address flexible joint dynamics."),

// ── CALM: SLAM & Estimation (1031-1045) ───────────────────
q(1031,"SLAM & Estimation","calm","Easy",10,
  "What makes SLAM harder than pure localisation with a known map?",
  ["SLAM requires GPS corrections; localisation can work entirely offline.",
   "SLAM only works in 2D environments; localisation generalises to 3D.",
   "SLAM eliminates loop closure, requiring a perfect prior map assumption.",
   "Map and pose are jointly unknown, creating a coupled high-dimensional inference problem."],
  3,"Joint map and pose uncertainty.",
  "In localisation the map is given; in SLAM both must be estimated simultaneously, coupling their uncertainties.",
  "EKF-SLAM and graph-SLAM are the two classical approaches to this coupled problem."),

q(1032,"SLAM & Estimation","calm","Easy",10,
  "What does loop closure accomplish in a SLAM factor graph?",
  ["It terminates the filter when the robot returns to its start pose.",
   "It connects first and last map nodes to physically close the map boundary.",
   "It removes outlier landmarks to reduce memory usage of the graph.",
   "It adds a constraint correcting accumulated drift when a previously visited location is re-observed."],
  3,"Drift correction via revisit constraint.",
  "Without loop closure, odometric error grows unboundedly; a recognised revisit provides a high-quality pose constraint.",
  "Pose-graph optimisation distributes the correction across all nodes globally."),

q(1033,"SLAM & Estimation","calm","Easy",10,
  "In a Kalman filter, what is the innovation?",
  ["Total accumulated odometry error since the filter was initialised.",
   "Derivative of the covariance matrix with respect to time.",
   "Change in the landmark map between two consecutive timesteps.",
   "Difference between the actual measurement and the predicted measurement."],
  3,"y = z − H·x̂⁻ is the innovation.",
  "The Kalman gain weights how much the innovation corrects the predicted state estimate.",
  "The innovation covariance S = HPH^T + R determines the magnitude of the correction."),

q(1034,"SLAM & Estimation","calm","Easy",10,
  "Why is the Extended Kalman Filter only a first-order approximation for nonlinear systems?",
  ["It uses Monte Carlo samples to represent the posterior distribution.",
   "It applies Bayes rule exactly by discretising the continuous state space.",
   "It extends the state vector to include all higher-order nonlinear terms explicitly.",
   "It linearises nonlinear functions via Jacobians, discarding higher-order Taylor terms."],
  3,"Jacobian linearisation truncates the Taylor series.",
  "EKF applies standard Kalman equations to locally linearised dynamics; errors accumulate when nonlinearity is strong.",
  "The Unscented KF propagates sigma points to capture second-order statistics instead."),

q(1035,"SLAM & Estimation","calm","Easy",10,
  "What is the primary advantage of a particle filter over a Kalman filter?",
  ["Particle filters are always more computationally efficient for all state dimensions.",
   "They require no motion model for time propagation of the belief.",
   "They eliminate the need for resampling under any measurement noise model.",
   "Particle filters can represent arbitrary non-Gaussian multimodal distributions over state."],
  3,"Non-Gaussian multimodal beliefs.",
  "Particles are weighted samples from p(x); no Gaussian assumption is needed, allowing complex posteriors.",
  "The kidnapped-robot problem benefits from particle-based multimodal belief representations."),

q(1036,"SLAM & Estimation","calm","Medium",10,
  "In factor graph SLAM, what do variables and factors represent?",
  ["Variables: sensor readings; factors: joint angles of the robot.",
   "Variables: control inputs; factors: Jacobians of the observation model.",
   "Variables: map grid cells; factors: sensor noise covariance matrices.",
   "Variables: unknown poses or landmarks; factors: probabilistic constraints from measurements or motion."],
  3,"Unknowns vs probabilistic constraints.",
  "Factor graphs separate what we estimate (variables) from the probabilistic information tying them (factors), enabling efficient sparse inference.",
  "iSAM2 exploits this sparsity with incremental Bayes-tree updates for real-time SLAM."),

q(1037,"SLAM & Estimation","calm","Medium",10,
  "What property makes sparse linear solvers efficient for graph-SLAM?",
  ["Every pose directly observes every other pose, creating a dense but structured matrix.",
   "The information matrix is always diagonal for any 3D SLAM problem.",
   "Sparse structure only arises when a single sensor type is used throughout.",
   "Observations only link nearby poses or landmarks, creating few non-zero off-diagonal entries."],
  3,"Local constraints create banded sparse structure.",
  "Each factor connects only the variables it involves; in typical trajectories this produces a sparse banded pattern.",
  "Sparse Cholesky factorisation makes large-scale SLAM with thousands of nodes tractable."),

q(1038,"SLAM & Estimation","calm","Medium",10,
  "What does Mahalanobis distance measure in data association?",
  ["Euclidean distance between two 3D landmarks in the world frame.",
   "Number of standard deviations a pose estimate is from the prior mean.",
   "The norm of the innovation vector divided by its dimension.",
   "Normalised distance accounting for measurement covariance, enabling consistent gating."],
  3,"Covariance-weighted distance.",
  "d² = y^T S⁻¹ y normalises residuals by their uncertainty, avoiding false matches in noisy environments.",
  "Nearest-neighbour data association uses a Mahalanobis distance gate to reject outliers."),

q(1039,"SLAM & Estimation","calm","Medium",10,
  "Why does LiDAR odometry degrade in geometrically symmetric environments?",
  ["LiDAR degeneracy is a special case that only occurs in underwater settings.",
   "The point cloud exceeds the ICP memory buffer, causing periodic resets.",
   "Symmetry causes incorrect loop closures that corrupt the pose graph.",
   "The scan-matching Hessian becomes ill-conditioned along directions with no geometric variation."],
  3,"Ill-conditioned Hessian along featureless directions.",
  "In tunnels or corridors, scan matching cannot resolve motion along the symmetric axis; the Hessian eigenvalue approaches zero.",
  "LOAM explicitly detects and handles degenerate directions in its point selection strategy."),

q(1040,"SLAM & Estimation","calm","Hard",10,
  "How does the Unscented Transform reduce linearisation error compared to EKF?",
  ["It replaces all Jacobians with finite-difference gradients for accuracy.",
   "It uses random Monte Carlo samples like a particle filter but with a fixed count.",
   "It applies exact Bayesian updates by discretising the continuous state space.",
   "It propagates deterministically chosen sigma points through the nonlinear function, capturing second-order statistics."],
  3,"Sigma points capture higher-order moments.",
  "The UT matches mean and covariance of the true transformed distribution to third order for Gaussian inputs, vs first order for EKF.",
  "UKF outperforms EKF for strongly curved observation models like bearing-only measurements."),

q(1041,"SLAM & Estimation","calm","Hard",10,
  "Why does resampling in a particle filter cause sample impoverishment?",
  ["Resampling always improves diversity by drawing fresh samples from the prior.",
   "It is only a problem with fewer than 10 particles and disappears at larger counts.",
   "It is mitigated by increasing the measurement noise covariance after each resample.",
   "Resampling duplicates high-weight particles, collapsing diversity; MCMC rejuvenation steps restore it."],
  3,"Duplication collapses particle diversity.",
  "After resampling, multiple identical particles cluster around modes; small MCMC perturbations diversify the set.",
  "Rao-Blackwellised particle filters reduce the sample count needed by exploiting conditionally linear structure."),

q(1042,"SLAM & Estimation","calm","Hard",10,
  "What observability condition must monocular VIO satisfy to initialise correctly?",
  ["The camera must observe at least three coplanar landmarks simultaneously.",
   "The IMU must be pre-calibrated to machine precision before any motion starts.",
   "The robot must start from a known pose with a pre-loaded feature map.",
   "Sufficient excitation with non-zero acceleration and rotation to make metric scale and IMU biases observable."],
  3,"Excitation makes scale observable.",
  "Monocular cameras cannot recover metric scale from pure rotation; translational acceleration coupled with IMU data makes scale observable.",
  "VIO initialisation sequences intentionally include rotational and translational motion."),

q(1043,"SLAM & Estimation","calm","Hard",10,
  "What is the MAP estimate in Bayesian SLAM and how does it differ from ML?",
  ["MAP maximises the observation likelihood; ML includes the prior over state.",
   "Both are identical when the prior distribution happens to be uninformative.",
   "MAP is used for landmarks only; ML is reserved for robot pose estimation.",
   "MAP includes the prior over state; ML maximises only the observation likelihood, ignoring the prior."],
  3,"MAP is posterior mode; ML is likelihood mode.",
  "MAP = argmax p(x|z) ∝ p(z|x)·p(x); ML = argmax p(z|x), dropping the prior term entirely.",
  "Graph-SLAM solves MAP inference; geometric scan-matching is closer to ML."),

q(1044,"SLAM & Estimation","calm","Hard",10,
  "Why does the information matrix in EKF-SLAM become denser as loop closures are added?",
  ["The information matrix becomes sparser with closures because uncertainty is reduced.",
   "Density is independent of loop closure count and only grows with landmark count.",
   "Only diagonal blocks grow; off-diagonal entries remain zero throughout.",
   "Each loop closure links distant poses, adding off-diagonal entries that propagate via matrix updates."],
  3,"Distant pose links add off-diagonal entries.",
  "A loop closure between pose i and pose j creates a non-zero block (i,j) in the information matrix, increasing fill-in.",
  "Sparse approximations like SEIF and iSAM truncate small information entries to maintain scalability."),

q(1045,"SLAM & Estimation","calm","Hard",10,
  "How does factor graph inference handle both pose estimation and map building simultaneously?",
  ["Factor graphs solve only the mapping problem; localisation is handled by a separate filter.",
   "Factor graphs require a known initial pose to initialise the inference correctly.",
   "Factor graph inference is only tractable for 2D SLAM, not full 3D problems.",
   "Pose and landmark variables are connected by measurement factors; joint MAP inference over all variables solves SLAM."],
  3,"Joint MAP over all variables solves SLAM.",
  "Pose and landmark variables are connected by odometry and observation factors; batch or incremental inference finds the joint MAP estimate.",
  "GTSAM and g2o implement efficient factor graph SLAM solvers used in real systems."),

// ── CALM: Dynamics (1046-1060) ────────────────────────────
q(1046,"Dynamics","calm","Easy",10,
  "In the Euler-Lagrange robot equation, what does C(q,q̇)·q̇ represent?",
  ["Gravitational potential energy gradient along the joint coordinate vector.",
   "Motor friction torque opposing joint velocity at each actuated joint.",
   "Inertia matrix multiplied by joint acceleration for the inertial term.",
   "Centripetal and Coriolis forces arising from joint velocities."],
  3,"Velocity-dependent coupling forces.",
  "C(q,q̇) contains Christoffel symbols; its product with q̇ captures forces due to rotation and coupling between joints.",
  "These terms grow quadratically with velocity and matter most during high-speed motions."),

q(1047,"Dynamics","calm","Easy",10,
  "What property of the robot inertia matrix M(q) is exploited in model-based control?",
  ["M(q) is diagonal for all serial-chain robot configurations.",
   "M(q) is constant and independent of joint angle configuration.",
   "det(M) equals total robot mass for any configuration.",
   "M(q) is symmetric and positive definite for all configurations, ensuring invertibility."],
  3,"Symmetric positive definite.",
  "Symmetry comes from reciprocal inertia coupling; positive definiteness means kinetic energy is always positive.",
  "These properties enable stable computed-torque control designs that invert M(q)."),

q(1048,"Dynamics","calm","Easy",10,
  "What does the skew-symmetry property Ṁ−2C enable in robot dynamics analysis?",
  ["It proves the Coriolis matrix is always zero for planar two-link robots.",
   "It shows the gravity vector is orthogonal to the Coriolis matrix.",
   "It proves M(q) is independent of joint velocities at all configurations.",
   "It proves robot dynamics are passive since ẋ^T·(Ṁ/2−C)·ẋ=0."],
  3,"Passivity proof via skew-symmetry.",
  "Ṁ = C + C^T means the robot is passive; this is the foundation of many adaptive and robust controllers.",
  "Passivity-based control exploits this without needing exact model parameters."),

q(1049,"Dynamics","calm","Easy",10,
  "Why is the Newton-Euler recursive algorithm preferred for real-time inverse dynamics?",
  ["It is always more numerically accurate than the Lagrangian formulation.",
   "It eliminates the need for Coriolis and gravity terms in the model.",
   "It only works for tree-structure robots, not standard serial chains.",
   "It uses forward/backward recursion with O(n) complexity vs O(n³) for the Lagrangian."],
  3,"O(n) recursive passes vs O(n³) Lagrangian.",
  "Newton-Euler sweeps outward (velocities/accelerations) then inward (forces/torques), making it efficient for real-time control.",
  "Pinocchio and RBDL implement Newton-Euler for high-speed control loops in practice."),

q(1050,"Dynamics","calm","Medium",10,
  "Why does the apparent inertia of a robot arm change with configuration even though no masses change?",
  ["The gravitational field direction changes relative to the robot's base frame.",
   "Friction coefficients at joints are configuration-dependent functions.",
   "Motor back-EMF varies with joint angle, changing the effective electrical inertia.",
   "Inertia depends on mass distribution relative to joint axes, which changes as links move."],
  3,"Second moments of mass about joint axes change with configuration.",
  "The inertia matrix M(q) encodes second moments; as q changes these moments change because mass is distributed differently.",
  "A fully extended arm has higher distal inertia than a tucked configuration by orders of magnitude."),

q(1051,"Dynamics","calm","Medium",10,
  "What is the key difference between static (stiction) and kinetic (Coulomb) friction?",
  ["Coulomb friction is velocity-dependent; static friction is proportional to normal force only.",
   "Static friction is modelled as a spring; Coulomb friction is modelled as a dashpot.",
   "Both are identical phenomena but apply at different joint velocity thresholds.",
   "Static friction must be overcome to initiate motion and is larger; kinetic friction opposes sliding at a lower level."],
  3,"Break-away force vs sliding resistance.",
  "Stiction holds the joint still until a threshold torque is exceeded; kinetic Coulomb friction then acts during motion.",
  "Stiction causes micro-positioning errors in precise manipulation tasks."),

q(1052,"Dynamics","calm","Medium",10,
  "How does the principle of virtual work relate joint torques to end-effector forces?",
  ["It states that internal forces do no work if the system constraints are holonomic.",
   "It provides the minimum-energy path between two joint-space configurations.",
   "It equates kinetic energy to potential energy along any robot trajectory.",
   "Virtual work equality gives τ = J^T·F, mapping Cartesian wrenches to joint torques."],
  3,"Equal virtual work: τ = J^T·F.",
  "This duality of the Jacobian transpose is the basis of force control and impedance control design.",
  "The same J used for velocity mapping maps forces in the transpose direction."),

q(1053,"Dynamics","calm","Hard",10,
  "What does the operational-space inertia Λ = (J·M⁻¹·J^T)⁻¹ represent?",
  ["The joint-space inertia projected onto the Cartesian task axes.",
   "The covariance of end-effector position errors under Gaussian joint noise.",
   "The inverse of the manipulability ellipsoid volume.",
   "The effective inertia seen by Cartesian-space forces applied at the end effector."],
  3,"Task-space inertia decouples Cartesian dynamics.",
  "Λ maps Cartesian forces directly to Cartesian accelerations: F = Λ·ẍ + μ + p, enabling independent axis control.",
  "Modern whole-body controllers for humanoids build on this operational-space formulation."),

q(1054,"Dynamics","calm","Hard",10,
  "Why does impact dynamics require an impulsive force model rather than a continuous one?",
  ["Impact forces are zero because kinetic energy is perfectly conserved at contact.",
   "Continuous models apply only to soft contacts; impulsive models are for stiff contacts.",
   "Impact dynamics only arises in aerial robots, not ground manipulators.",
   "Contact forces are infinite for an infinitesimal duration; only their impulse is finite and physically meaningful."],
  3,"Infinite force × infinitesimal time = finite impulse.",
  "During a rigid impact, velocity changes discontinuously; the impulse F·Δt governed by the restitution coefficient is the relevant quantity.",
  "Legged robot touchdown is modelled using impulsive contact mechanics."),

q(1055,"Dynamics","calm","Hard",10,
  "Why is the manipulator equation said to be linear in the inertial parameters?",
  ["All terms are linear functions of joint angles, making the system an affine map.",
   "The inertia matrix M(q) is always constant, so the equation is trivially linear.",
   "Gravity g(q) is linear in q, making the entire equation linear by extension.",
   "It can be rewritten as Y(q,q̇,q̈)·π = τ where Y is a known regressor and π is the parameter vector."],
  3,"Regressor Y times parameter vector π equals τ.",
  "Linearity in parameters enables adaptive control: π is estimated online while Y is computed from measured trajectories.",
  "This is the foundation of model identification and adaptive robot control algorithms."),

q(1056,"Dynamics","calm","Hard",10,
  "What is the Centroidal Dynamics Model used for in legged robot control?",
  ["It models contact forces at each foot using linearised Coulomb friction cones.",
   "It replaces full multibody dynamics with a linear spring-mass-damper model.",
   "It describes only gravitational potential energy for quasi-static balance control.",
   "It describes total linear and angular momentum about the CoM, decoupled from joint-level details."],
  3,"6D aggregate momentum about CoM.",
  "The centroidal model captures whole-body behaviour compactly, enabling fast MPC for legged locomotion planning.",
  "MIT Cheetah and ANYmal use centroidal MPC for real-time gait planning at control rates."),

q(1057,"Dynamics","calm","Hard",10,
  "Why do Lagrangian and Newton-Euler methods give identical equations despite different philosophies?",
  ["Lagrangian is only correct for energy-conserving systems; Newton-Euler handles friction.",
   "Newton-Euler requires numerical integration; Lagrangian always gives closed-form equations.",
   "They agree only for planar two-link robots, not for general spatial chains.",
   "Both encode the same physical laws; they are algebraically equivalent for rigid multibody systems."],
  3,"Same physics — different but equivalent mathematical paths.",
  "Lagrangian uses generalised coordinates and energy; Newton-Euler uses force/moment balances; both produce M(q)q̈+Cq̇+g=τ.",
  "Students verify equivalence as a classical dynamics exercise on two-link arms."),

q(1058,"Dynamics","calm","Hard",10,
  "What physical interpretation does the manipulability ellipsoid's smallest semi-axis carry?",
  ["It is the distance from the end-effector to the nearest joint limit in configuration space.",
   "It measures the minimum joint torque required for any end-effector motion.",
   "It equals the condition number of the inertia matrix at that configuration.",
   "It equals the smallest singular value of J and represents the worst-case achievable Cartesian velocity per unit joint velocity."],
  3,"Smallest singular value: worst-case velocity gain.",
  "The ellipsoid {Jv : ‖v‖=1} has semi-axes σᵢ; the smallest axis direction is hardest to move along.",
  "A near-zero smallest axis signals proximity to a singular configuration."),

q(1059,"Dynamics","calm","Hard",10,
  "Why is joint flexibility modelled as a torsional spring in harmonic drive gearboxes?",
  ["Joint flexibility arises only from link bending, not from the gearbox itself.",
   "Torsional spring models overestimate actual stiffness by a factor of ten.",
   "Harmonic drives are perfectly rigid; flexibility comes only from motor windings.",
   "Harmonic drives have inherent elastic deformation in the flexspline, creating torsional compliance."],
  3,"Flexspline deformation = inherent elastic compliance.",
  "The thin flexspline deforms cyclically; its torsional stiffness kⱼ links motor and link angles, creating the two-mass model.",
  "SEA designs intentionally increase this compliance for safe and transparent interaction."),

q(1060,"Dynamics","calm","Hard",10,
  "What is the significance of a robot's natural frequencies in trajectory planning?",
  ["Natural frequencies determine the maximum payload without separate computation.",
   "They set only the minimum sampling rate for digital control, nothing else.",
   "Natural frequencies are only relevant for aerospace structures, not robot links.",
   "Exciting trajectories near natural frequencies causes resonance, amplifying joint oscillations."],
  3,"Avoid resonance: trajectory bandwidth must stay below natural frequencies.",
  "Joint flexibility and link compliance create resonance modes; trajectory frequencies near these modes cause vibration.",
  "Input shaping filters notch the trajectory spectrum at identified resonance frequencies."),

// ── CALM: Perception (1061-1075) ──────────────────────────
q(1061,"Perception","calm","Easy",10,
  "What does the pinhole camera model describe?",
  ["3D forces mapped to 2D torques via a spatial Jacobian transform.",
   "Pixel coordinates converted to metric depth via stereo triangulation.",
   "World points mapped to joint angles via inverse kinematics.",
   "3D world points projected to 2D image coordinates through a focal centre via perspective projection."],
  3,"Perspective projection through a focal centre.",
  "Intrinsic matrix K maps homogeneous 3D points to pixel coordinates.",
  "Camera calibration recovers K and distortion coefficients from a planar target."),

q(1062,"Perception","calm","Easy",10,
  "What does epipolar geometry constrain in stereo vision?",
  ["The geometry of a single camera's lens distortion field.",
   "Depth from defocus measured via the blur circle diameter.",
   "Camera rotation inferred purely from histogram intensity changes.",
   "The search for correspondences to a 1D epipolar line in the second image, reducing matching effort."],
  3,"Constrains correspondence search to a line.",
  "F·x = 0 means a point in image 1 corresponds to a point on the epipolar line in image 2.",
  "Rectification aligns epipolar lines with image rows for efficient stereo matching."),

q(1063,"Perception","calm","Easy",10,
  "Why is RANSAC preferred over least-squares for feature matching in robotics?",
  ["RANSAC is always faster than least-squares for every possible dataset size.",
   "RANSAC requires no geometric model, making it simpler to implement.",
   "RANSAC produces exact solutions without iteration for small datasets.",
   "RANSAC fits models to random minimal subsets, identifying inliers while robustly ignoring outliers."],
  3,"Robust to outliers via consensus set.",
  "Least-squares is distorted by even a few outlier matches; RANSAC random sampling finds an inlier consensus set.",
  "Used in homography estimation, essential matrix computation, and point-cloud alignment."),

q(1064,"Perception","calm","Easy",10,
  "What makes SIFT features invariant to scale and rotation?",
  ["Normalisation by image mean and variance across the entire patch.",
   "Binary pixel pair comparisons similar to ORB descriptor construction.",
   "3D convolutions that mathematically cancel rotational effects.",
   "Scale-space extrema detection combined with a dominant orientation histogram assignment."],
  3,"Scale-space plus orientation normalisation.",
  "SIFT builds a 128-dimensional gradient histogram normalised by the dominant orientation.",
  "It remains a benchmark for challenging wide-baseline image matching scenarios."),

q(1065,"Perception","calm","Easy",10,
  "What distinguishes intrinsic from extrinsic camera parameters?",
  ["Intrinsics are measured per scene; extrinsics are fixed permanently at manufacturing.",
   "Extrinsics encode lens distortion; intrinsics encode the camera-to-robot transform.",
   "Both are identical and interchangeable in the standard projection model.",
   "Intrinsics describe internal optics (focal length, principal point, distortion); extrinsics describe camera pose in the world."],
  3,"Optics K vs pose [R|t].",
  "K encodes how 3D rays map to pixels; [R|t] encodes where the camera sits in the world.",
  "Multi-camera calibration estimates both for accurate 3D reconstruction."),

q(1066,"Perception","calm","Medium",10,
  "How does an occupancy grid represent environmental uncertainty differently from a point cloud?",
  ["Occupancy grids are always denser than point clouds in memory usage.",
   "Point clouds represent uncertainty as covariance ellipsoids; occupancy grids do not.",
   "Occupancy grids only work in 2D; point clouds are exclusively 3D.",
   "Each cell stores a probability of occupancy updated via a Bayes filter; a point cloud stores geometry without uncertainty."],
  3,"Probabilistic cells vs deterministic geometry.",
  "Each occupancy cell applies a binary Bayes filter; point clouds record geometry without explicit occupancy probability.",
  "2D occupancy grids are the standard representation for mobile robot navigation."),

q(1067,"Perception","calm","Medium",10,
  "What role does the attention mechanism play in vision transformers for robot perception?",
  ["Attention selects which camera to use among multiple competing sensor inputs.",
   "It applies edge detection before feature extraction to reduce computational cost.",
   "Attention normalises pixel intensities across the image for lighting invariance.",
   "Self-attention computes pairwise relationships between all image patches, enabling long-range context."],
  3,"Global context via pairwise patch relationships.",
  "ViT tokenises image patches and applies multi-head self-attention to model global relationships.",
  "Robots use ViT-based backbones for robust semantic scene understanding."),

q(1068,"Perception","calm","Medium",10,
  "Why does monocular scale ambiguity make metric depth recovery impossible from geometry alone?",
  ["Scale ambiguity only affects rotating cameras, not translating ones.",
   "Focal length encodes absolute metric scale after careful calibration.",
   "Scale can always be recovered from two consecutive frames via homography.",
   "A scaled version of the scene produces an identical image sequence; only non-visual information breaks the ambiguity."],
  3,"Scaled scene produces identical images (projective ambiguity).",
  "Perspective projection is scale-invariant; without additional constraints the absolute depth is unobservable.",
  "Known object sizes, ground planes, or IMU pre-integration recover metric scale."),

q(1069,"Perception","calm","Medium",10,
  "What is the aperture problem in optical flow and why does it limit local estimation?",
  ["The aperture problem states that wide-aperture cameras produce severe motion blur.",
   "Local flow is limited by sensor noise rather than any geometric constraint.",
   "The aperture problem only affects depth-direction flow, not lateral motion.",
   "Only the flow component perpendicular to an edge is measurable locally; the parallel component is unobservable."],
  3,"Only normal flow is locally observable.",
  "Inside a small aperture, an oriented edge moving at many velocities produces the same local spatial gradient.",
  "Lucas-Kanade assumes local spatial smoothness to resolve the aperture ambiguity."),

q(1070,"Perception","calm","Hard",10,
  "Why do voxel-based 3D detectors trade spatial resolution for computational efficiency?",
  ["Voxels increase resolution by averaging all points within each cell.",
   "Voxel methods are used only for 2D projections of 3D point clouds.",
   "Voxelisation converts the problem to a 1D sequence for transformer processing.",
   "Quantising space into voxels converts sparse point operations into regular 3D convolutions, losing sub-voxel detail."],
  3,"Sparse to regular 3D grid enables convolutions.",
  "PointNet processes raw points but is slow at scale; voxelisation enables efficient sparse 3D CNNs at the cost of resolution.",
  "VoxelNet and CenterPoint combine voxel features with anchor-free detection heads."),

q(1071,"Perception","calm","Hard",10,
  "How does domain randomisation address the sim-to-real visual gap?",
  ["Sim-to-real fails because simulators cannot correctly model gravity.",
   "Domain randomisation reduces dataset size by removing redundant images.",
   "Simulation is too slow for real-time inference, making this approach impractical.",
   "Training on many random rendering parameters spans the real distribution, making the model invariant to rendering details."],
  3,"Randomising rendering parameters spans the real distribution.",
  "Randomising textures, lighting, object poses, and camera parameters teaches invariance to rendering details.",
  "OpenAI Dexterous Hand used extreme domain randomisation for successful policy transfer."),

q(1072,"Perception","calm","Hard",10,
  "Why is instance segmentation architecturally harder than semantic segmentation?",
  ["Semantic segmentation requires 3D understanding, making it inherently harder.",
   "Instance segmentation uses bounding boxes as proxies, making it simpler.",
   "The difficulty is identical; only the loss function differs between them.",
   "Instance segmentation must distinguish separate objects of the same class; per-instance mask heads address this."],
  3,"Same-class separation requires per-instance masks.",
  "Semantic segmentation assigns one label per pixel; instance segmentation additionally separates car1 from car2.",
  "Mask R-CNN adds a parallel mask branch to the Faster R-CNN detection head."),

q(1073,"Perception","calm","Hard",10,
  "What is the core idea behind NeRF-based 3D reconstruction?",
  ["NeRF uses sparse keypoints to reconstruct geometry like SfM.",
   "NeRF requires LiDAR depth supervision to recover 3D structure.",
   "NeRF encodes only appearance, not geometry, in its neural representation.",
   "A neural implicit function maps (x,y,z,direction) coordinates to density and colour, enabling novel view synthesis."],
  3,"Implicit neural radiance field: coordinate → density and colour.",
  "Optimising f(x,y,z,θ,φ)→(RGB,σ) via volume rendering produces photorealistic novel views and implicit 3D geometry.",
  "Robots use NeRF-based scene representations for object manipulation and navigation."),

q(1074,"Perception","calm","Hard",10,
  "Why does image undistortion precede all geometric vision algorithms?",
  ["Undistortion removes electrical noise from the sensor amplifier circuit.",
   "Undistortion converts the image from YCbCr to the RGB colour space.",
   "Undistortion is only needed for fisheye lenses, not standard camera optics.",
   "Distortion violates the linear pinhole projection model; undistortion makes epipolar and homography relations valid."],
  3,"Distortion breaks the linear camera model.",
  "Radial and tangential distortion curve straight 3D lines into bent image curves; K assumes straight-line projection.",
  "All calibration toolboxes output distortion coefficients needed for undistortion preprocessing."),

q(1075,"Perception","calm","Hard",10,
  "What advantage do event cameras offer over frame cameras for fast robot motion estimation?",
  ["Event cameras provide denser absolute depth information than RGB cameras.",
   "Event cameras operate in absolute intensity, not change, making them simpler.",
   "Event cameras have higher spatial resolution than comparable frame cameras.",
   "Microsecond-latency asynchronous brightness change detection eliminates motion blur at speeds far beyond frame cameras."],
  3,"Asynchronous microsecond-resolution events eliminate blur.",
  "Each pixel fires independently when log-intensity changes by a threshold; at high speeds frame cameras blur while events stay sharp.",
  "Davis346 cameras enable sub-millisecond visual odometry for high-speed platforms."),

// ── CALM: Machine Learning (1076-1090) ────────────────────
q(1076,"Machine Learning","calm","Easy",10,
  "What does the bias-variance tradeoff describe in model selection?",
  ["Bias measures training speed; variance measures final prediction accuracy.",
   "Adding data always increases both bias and variance simultaneously.",
   "It describes the tradeoff between model interpretability and computational cost.",
   "High bias means underfit (too simple); high variance means overfit (too complex); the tradeoff minimises test error."],
  3,"Underfitting vs overfitting.",
  "Expected test error = bias² + variance + irreducible noise; model complexity shifts the balance between them.",
  "Cross-validation finds the complexity that minimises total generalisation error."),

q(1077,"Machine Learning","calm","Easy",10,
  "Why does batch normalisation improve training of deep networks?",
  ["It randomly drops neurons to prevent co-adaptation during each forward pass.",
   "It averages gradients over mini-batches to reduce stochastic gradient noise.",
   "It constrains weights to a unit sphere, preventing gradient explosion.",
   "It normalises layer inputs to zero mean and unit variance, reducing internal covariate shift."],
  3,"Reduces internal covariate shift.",
  "Normalising activations smooths the loss landscape, making optimisation more stable and allowing higher learning rates.",
  "BatchNorm also acts as a regulariser, sometimes replacing explicit dropout."),

q(1078,"Machine Learning","calm","Easy",10,
  "How do LSTM gating mechanisms address the vanishing gradient problem?",
  ["LSTM eliminates recurrence entirely, replacing it with feedforward connections.",
   "LSTM uses larger hidden states which inherently prevent gradient decay.",
   "LSTM applies layer normalisation at each timestep to rescale gradients.",
   "LSTM gates allow gradients to flow across many timesteps via additive cell-state updates, avoiding exponential decay."],
  3,"Additive cell-state updates preserve gradient flow.",
  "In vanilla RNNs gradients multiply the recurrent weight matrix at each step; LSTM additive updates prevent exponential decay.",
  "Transformers have largely replaced LSTMs but LSTMs appear in embedded robotics controllers."),

q(1079,"Machine Learning","calm","Easy",10,
  "What is the role of the kernel function in a support vector machine?",
  ["It filters training examples below a margin threshold for speed.",
   "It defines the loss function penalising misclassified training points.",
   "It sets the learning rate schedule during gradient descent optimisation.",
   "It implicitly maps inputs to a high-dimensional feature space, enabling linear separation of nonlinearly separable data."],
  3,"Implicit feature mapping via dot products.",
  "K(x,x')=φ(x)^T φ(x') computes the high-dimensional dot product without explicitly forming φ.",
  "RBF kernels enable infinite-dimensional feature spaces for complex decision boundaries."),

q(1080,"Machine Learning","calm","Easy",10,
  "What does the softmax function accomplish in a neural classifier?",
  ["It normalises input features to zero mean before the forward pass.",
   "It applies a hard threshold mapping each logit to exactly 0 or 1.",
   "It computes the gradient of the cross-entropy loss directly.",
   "It converts raw logit scores into a probability distribution that sums to one."],
  3,"Logits to probability simplex.",
  "softmax(zᵢ) = exp(zᵢ)/Σexp(zⱼ); differentiable and produces valid probabilities for categorical prediction.",
  "Used with cross-entropy loss for standard multi-class classification tasks."),

q(1081,"Machine Learning","calm","Medium",10,
  "How do L1 and L2 regularisation differ in their effect on model weights?",
  ["L1 penalises squared weights; L2 penalises absolute weight values.",
   "Both produce identical solutions for any convex loss function.",
   "L2 causes weight explosion; L1 prevents it in deep networks.",
   "L1 induces sparsity by driving some weights exactly to zero; L2 shrinks all weights without enforcing sparsity."],
  3,"L1 induces sparsity; L2 shrinks all weights.",
  "The L1 penalty has a corner at zero where the sub-gradient includes zero, creating exact zeros; L2 has a smooth minimum above zero.",
  "Feature selection uses L1; weight-decay regularisation typically uses L2."),

q(1082,"Machine Learning","calm","Medium",10,
  "Why does dropout act as implicit ensemble learning during training?",
  ["Dropout permanently removes the least-useful neurons after each epoch.",
   "Dropout randomly shuffles input features to prevent feature co-adaptation.",
   "Dropout samples weights from a Gaussian prior at each training step.",
   "Each forward pass randomly masks units, training a different sub-network; test time approximates averaging all sub-networks."],
  3,"Random sub-networks form an ensemble average.",
  "With drop probability p there are 2ⁿ possible sub-networks; weight scaling at test time approximates their geometric mean.",
  "Dropout is most effective for large fully connected layers in deep networks."),

q(1083,"Machine Learning","calm","Medium",10,
  "How does the attention mechanism in transformers differ from convolution in terms of inductive bias?",
  ["Attention is a special case of convolution with a learnable adaptive kernel size.",
   "Convolution computes global context; attention operates only locally.",
   "Both have identical inductive biases but attention is slower to train.",
   "Attention has no spatial locality bias and computes all pairwise dependencies; convolution enforces local translation equivariance."],
  3,"Global pairwise vs local equivariant.",
  "CNNs assume local features suffice and are translation-equivariant; transformers make no such assumption, learning which tokens to attend to.",
  "Transformers need more data but generalise better across diverse domains."),

q(1084,"Machine Learning","calm","Hard",10,
  "Why does knowledge distillation allow a smaller student network to approach teacher performance?",
  ["The student copies teacher weights directly, reducing parameter count needed.",
   "Distillation works because the student uses a deliberately higher learning rate.",
   "The teacher provides additional labelled data the student did not train on.",
   "The student learns from soft probability distributions that encode inter-class similarities invisible in hard labels."],
  3,"Soft targets contain inter-class similarity information.",
  "Hinton dark knowledge: teacher softmax at temperature T>1 reveals class relationships not visible in hard labels.",
  "Mobile robot perception systems use distillation to deploy large models on edge hardware."),

q(1085,"Machine Learning","calm","Hard",10,
  "What is the lottery ticket hypothesis and what does it imply for network pruning?",
  ["Any randomly initialised network will win a given task with enough training.",
   "Pruning should always be done before training to find the optimal sparse network.",
   "Weight magnitude alone determines which parameters are important.",
   "Dense networks contain sparse sub-networks that, trained from their original initialisation, match the full network accuracy."],
  3,"Sparse sub-networks with correct initialisation match full networks.",
  "Frankle and Carlin showed winning tickets identified by magnitude pruning plus rewinding reach full accuracy at a fraction of parameters.",
  "This motivates efficient sparse training for resource-constrained robotic systems."),

q(1086,"Machine Learning","calm","Hard",10,
  "Why does contrastive self-supervised learning require negative pairs or architectural asymmetry?",
  ["A large learning rate forces the network to explore diverse representations.",
   "Batch normalisation alone prevents collapse by normalising embedding norms.",
   "Collapse is prevented by using L2 loss instead of cross-entropy.",
   "Without negatives, the trivial constant-output solution minimises contrastive loss; negatives or asymmetry break this symmetry."],
  3,"Negative pairs or asymmetry prevent trivial constant output.",
  "Without negatives, minimising contrastive loss leads to constant output; negatives push apart different-sample representations.",
  "BYOL avoids negatives using a slow-moving teacher (momentum encoder) and a predictor head asymmetry."),

q(1087,"Machine Learning","calm","Hard",10,
  "What does the Neural Tangent Kernel reveal about infinitely wide neural networks?",
  ["Infinitely wide networks always overfit training data due to excess capacity.",
   "NTK shows weight initialisation uniquely determines the final trained network.",
   "The NTK proves deeper networks are always better than wider ones.",
   "In the infinite-width limit, gradient descent is equivalent to kernel regression with a fixed kernel — the NTK."],
  3,"Infinite width leads to linear kernel regression.",
  "As width→∞, weights barely move during training and the network behaves as a linear model in the NTK feature space.",
  "NTK theory illuminates why overparameterised networks generalise despite zero training error."),

q(1088,"Machine Learning","calm","Hard",10,
  "How does meta-learning differ from standard supervised learning in its objective?",
  ["Meta-learning requires larger datasets than standard supervised learning.",
   "Meta-learning is identical to transfer learning from a pretrained model.",
   "Meta-learning minimises validation loss; standard learning minimises training loss.",
   "Meta-learning optimises for fast adaptation to new tasks using few examples; standard learning minimises loss on a fixed task."],
  3,"Learning to learn: optimise for fast adaptation.",
  "MAML finds θ such that one gradient step on a new task produces a good model.",
  "Robot manipulation systems use meta-learning to acquire new skills from a handful of demonstrations."),

q(1089,"Machine Learning","calm","Hard",10,
  "Why do transformers require positional encodings despite being theoretically permutation-invariant?",
  ["Positional encodings normalise token magnitudes to prevent attention saturation.",
   "Transformers are not actually permutation-invariant; encodings are optional.",
   "Positional encodings replace the need for the multi-head attention mechanism.",
   "Self-attention is permutation-equivariant and loses sequence order without explicit positional information."],
  3,"Attention is permutation-equivariant: position must be injected explicitly.",
  "Attention(Q,K,V) treats tokens as a set; sine/cosine or learned positional embeddings added to token embeddings break the symmetry.",
  "Relative positional encodings (RoPE, ALiBi) improve generalisation to longer sequences."),

q(1090,"Machine Learning","calm","Hard",10,
  "What makes graph neural networks suitable for robot multi-agent coordination?",
  ["GNNs are faster than transformers for all graph-structured data in practice.",
   "GNNs require a fixed agent count at both training and test time.",
   "GNNs replace the need for any communication protocols between agents.",
   "GNNs model inter-agent relationships as graph nodes and edges, aggregating neighbour information for joint decisions."],
  3,"Graph structure encodes inter-agent relations.",
  "Each agent is a node; communication links are edges; message passing aggregates neighbourhood information for decentralised coordination.",
  "Multi-robot task allocation and formation control use GNN-based policies."),

// ── CALM: Linear Algebra (1091-1105) ──────────────────────
q(1091,"Linear Algebra","calm","Easy",10,
  "What does the rank of a matrix physically represent in a robot Jacobian?",
  ["Number of non-zero eigenvalues times the matrix determinant.",
   "Total number of scalar elements stored in the matrix.",
   "Ratio of the largest to smallest non-zero entry in the matrix.",
   "The number of independent task-space directions that can be actuated."],
  3,"Dimension of the column space.",
  "Rank = dim(col space); in a Jacobian it tells how many independent Cartesian directions can be actuated.",
  "Rank loss at singularities means some directions become uncontrollable."),

q(1092,"Linear Algebra","calm","Easy",10,
  "What does the SVD A = UΣV^T reveal about a linear map?",
  ["It factorises A into eigenvalues regardless of whether A is square.",
   "It converts A to a diagonal matrix only when A is symmetric.",
   "It finds the matrix inverse of A without Gaussian elimination.",
   "Orthonormal input directions (V), scaling factors (Σ), and orthonormal output directions (U)."],
  3,"Geometry: input principal axes, scaling, output principal axes.",
  "Columns of V are input directions; singular values are scaling magnitudes; columns of U are output directions.",
  "SVD underlies pseudoinverse computation, PCA, and numerical rank determination."),

q(1093,"Linear Algebra","calm","Easy",10,
  "When is the Moore-Penrose pseudoinverse A† used instead of A⁻¹?",
  ["Only when A is positive definite and perfectly square.",
   "When A has more rows than columns and a unique exact solution exists.",
   "A† is used only for diagonal matrices with repeated singular values.",
   "When A is non-square or singular; A† gives the minimum-norm least-squares solution."],
  3,"Non-square or singular matrices need the pseudoinverse.",
  "A† = VΣ†U^T; it minimises ‖Ax−b‖ and, among those, minimises ‖x‖.",
  "Over-determined inverse kinematics uses A† to find minimum joint-velocity solutions."),

q(1094,"Linear Algebra","calm","Easy",10,
  "What does positive definiteness of matrix M mean for a quadratic form x^T·M·x?",
  ["All entries of M are positive real numbers.",
   "M has at least one positive eigenvalue.",
   "M is a valid rotation matrix with det=+1.",
   "It is strictly positive for all non-zero x, defining a proper energy or metric on the space."],
  3,"Energy is always positive for non-zero x.",
  "PD ensures x^T·M·x>0 for all non-zero x, guaranteeing M defines a valid inner product.",
  "The inertia matrix of a robot is always symmetric positive definite."),

q(1095,"Linear Algebra","calm","Easy",10,
  "What does the Cayley-Hamilton theorem state?",
  ["All eigenvalues of a rotation matrix lie on the unit circle.",
   "Every invertible matrix has a positive-definite square root.",
   "The trace of a matrix equals the sum of its singular values.",
   "Every matrix satisfies its own characteristic polynomial, reducing matrix powers to lower-degree polynomials."],
  3,"A satisfies p_A(A) = 0.",
  "For a 3×3 matrix, A³ can be expressed as a linear combination of I, A, A²; this truncates the matrix exponential series.",
  "Used in Rodrigues rotation formula to compute SO(3) exponentials in closed form."),

q(1096,"Linear Algebra","calm","Medium",10,
  "How does a high condition number affect numerical solution accuracy in robotics?",
  ["Condition number measures closeness to orthogonality of a matrix.",
   "A condition number of 1 means the matrix is singular and non-invertible.",
   "High condition number guarantees faster convergence of iterative solvers.",
   "Small input perturbations cause large output changes, making solutions numerically unreliable."],
  3,"cond(A) amplifies numerical errors.",
  "cond(A) = σ_max/σ_min; the relative error in the solution is bounded by cond(A) × the relative data error.",
  "Ill-conditioned Jacobians near singularities cause unreliable velocity commands."),

q(1097,"Linear Algebra","calm","Medium",10,
  "Why is solving the normal equations A^T·A·x = A^T·b numerically inferior to QR decomposition?",
  ["The normal equations are only unstable when the right-hand side b has zero entries.",
   "A^T·A is always singular, making the normal equations technically unsolvable.",
   "Instability arises only when A has more columns than rows.",
   "Squaring A squares its condition number, amplifying errors; QR applied directly to A is more stable."],
  3,"cond(A^T·A) = cond(A)², doubling numerical problems.",
  "Computing A^T·A loses half the significant bits in floating-point; QR decomposition applied to A directly avoids this.",
  "Least-squares calibration in robotics prefers QR or SVD solvers."),

q(1098,"Linear Algebra","calm","Medium",10,
  "What is the Schur complement and why does it appear in EKF covariance updates?",
  ["It is the sum of all diagonal blocks of a partitioned matrix.",
   "It is used only for symmetric indefinite matrices in optimisation.",
   "Schur complements are equivalent to eigenvalue decomposition for block-diagonal matrices.",
   "It allows block matrix inversion without inverting the full matrix, enabling efficient covariance updates."],
  3,"Block elimination avoids full matrix inversion.",
  "In the Kalman update the innovation covariance S=HPH^T+R and P update use the Schur complement to avoid inverting the full state covariance.",
  "Sparse EKF variants exploit Schur complements for scalable SLAM updates."),

q(1099,"Linear Algebra","calm","Hard",10,
  "How does PCA use eigenvectors of the covariance matrix for dimensionality reduction?",
  ["PCA finds eigenvectors of the raw data matrix, not the covariance matrix.",
   "PCA uses singular vectors of the data matrix, different from covariance eigenvectors.",
   "PCA projects onto the null space to remove redundant dimensions.",
   "It projects data onto eigenvectors with the largest eigenvalues, capturing maximum variance in fewer dimensions."],
  3,"Top eigenvectors maximise variance explained.",
  "Cov = UΛU^T; projecting onto the top k columns of U retains the k directions of greatest variance.",
  "Robot proprioception data is often compressed via PCA before training a neural policy."),

q(1100,"Linear Algebra","calm","Hard",10,
  "Why must optimisation on the SO(3) manifold use Riemannian methods?",
  ["SO(3) is flat but numerical issues require Riemannian approaches.",
   "Euclidean gradient descent on SO(3) converges only to local minima.",
   "SO(3) can be embedded in R⁶ without loss, making Euclidean methods valid.",
   "SO(3) is a curved manifold; Euclidean updates leave the manifold by violating orthogonality, so retraction steps are needed."],
  3,"Curved manifold: Euclidean steps violate R^T·R=I.",
  "Adding a small matrix to a rotation matrix generally produces a non-rotation; retraction keeps iterates on SO(3).",
  "Rotation averaging in SLAM uses Riemannian optimisation on SO(3)."),

q(1101,"Linear Algebra","calm","Hard",10,
  "What does the Perron-Frobenius theorem guarantee for positive matrices?",
  ["All eigenvalues of a rotation matrix lie on the unit circle.",
   "The theorem applies only to diagonal positive matrices.",
   "Every stochastic matrix is invertible and has full rank.",
   "A positive square matrix has a unique largest real eigenvalue with a corresponding all-positive eigenvector."],
  3,"Unique dominant positive eigenvalue and eigenvector.",
  "Perron-Frobenius underpins consensus algorithms and Markov chains used in multi-robot coordination.",
  "The dominant eigenvector of the transition matrix gives the stationary distribution."),

q(1102,"Linear Algebra","calm","Hard",10,
  "Why is LU decomposition preferred over repeated Gaussian elimination for multiple right-hand sides?",
  ["LU is more numerically stable than Gaussian elimination for all matrix types.",
   "LU requires no pivoting and always succeeds without modification.",
   "LU is preferred only for symmetric positive definite matrices.",
   "A=LU is factorised once in O(n³); each subsequent solve is O(n²) via substitution."],
  3,"Factorise once, solve many times cheaply.",
  "Repeated control loops that solve the same inertia matrix system benefit from cached LU factors.",
  "Robot dynamics libraries re-use factorised inertia matrices across control cycles."),

q(1103,"Linear Algebra","calm","Hard",10,
  "How does the Kronecker product vectorise matrix equations in robot learning?",
  ["The Kronecker product computes the element-wise product of two matrices.",
   "It combines two rotation matrices into a single 6-DOF transform.",
   "Kronecker products only apply when both matrices are square and the same size.",
   "vec(AXB) = (B^T ⊗ A)·vec(X) converts matrix equations into linear systems solvable by standard methods."],
  3,"Vectorisation linearises matrix equations.",
  "Many system identification and structured regression problems in robotics are linear in parameter matrices; Kronecker products make this explicit.",
  "Used in tensor regression, covariance estimation, and Gaussian process hyperparameter learning."),

q(1104,"Linear Algebra","calm","Hard",10,
  "What makes classical Gram-Schmidt practically inferior to Householder reflections?",
  ["Gram-Schmidt requires O(n³) more operations than Householder reflections.",
   "Gram-Schmidt only applies to square matrices; Householder handles all shapes.",
   "Gram-Schmidt cannot handle rank-deficient matrices of any size.",
   "Classical Gram-Schmidt accumulates numerical errors, producing near-orthogonal vectors; Householder reflections are numerically stable."],
  3,"Numerical error accumulation degrades orthogonality in Gram-Schmidt.",
  "Each Gram-Schmidt projection subtracts small components from large vectors; floating-point cancellation accumulates; Householder preserves orthogonality exactly.",
  "QR via Householder is used in all major robotics calibration libraries."),

q(1105,"Linear Algebra","calm","Hard",10,
  "Why does tensor product structure in multi-body robot state spaces enable efficient batch computation?",
  ["Tensor products double the state dimension, making computation more expensive.",
   "Tensor structure only applies when all joints are geometrically identical.",
   "Tensors replace the need for homogeneous transform chains entirely.",
   "Kronecker product structure allows whole-body Jacobians and inertia matrices to be assembled from per-link tensors, avoiding redundant recomputation."],
  3,"Structured assembly avoids redundant per-link recomputation.",
  "Pinocchio and Drake exploit tree structure; Kronecker and block-sparse structures allow vectorised computation over multiple configurations.",
  "Trajectory optimisers batch forward dynamics over an entire time horizon using tensor structure."),

// ── CALM: Probability (1106-1120) ─────────────────────────
q(1106,"Probability","calm","Easy",10,
  "How is Bayes theorem applied in robot state estimation?",
  ["It computes the joint probability of two independent events.",
   "It states the prior and posterior are always Gaussian distributions.",
   "It only applies when the state space is discrete and finite.",
   "P(state|obs) = P(obs|state)·P(state)/P(obs) updates the belief over the hidden state given a new observation."],
  3,"Posterior ∝ likelihood × prior.",
  "The Bayesian update is the foundation of all recursive estimators: Kalman, particle, and grid filters all implement it.",
  "P(x|z) is the posterior pose given sensor reading z."),

q(1107,"Probability","calm","Easy",10,
  "What does the Markov property state in robot state estimation?",
  ["All states in the sequence are mutually independent of each other.",
   "The robot state is always Gaussian regardless of the dynamics model.",
   "Measurement noise must be white and Gaussian for the property to hold.",
   "The future state is conditionally independent of the history given the current state."],
  3,"Past is irrelevant given present state.",
  "P(x_{t+1}|x_t,x_{t-1},…) = P(x_{t+1}|x_t); this enables recursive memoryless filter implementations.",
  "Most robot motion models satisfy the Markov property by augmenting the state vector."),

q(1108,"Probability","calm","Easy",10,
  "What does the entropy of a probability distribution measure?",
  ["Mean value of the distribution weighted by its variance.",
   "Squared distance between the distribution and a Gaussian reference.",
   "Number of bits needed to store distribution parameters compactly.",
   "Average uncertainty or information content of the distribution."],
  3,"Average uncertainty.",
  "H(X) = −Σp(x)log p(x); high entropy means high uncertainty; low entropy means concentrated distribution.",
  "Entropy minimisation is used in active perception to select uncertainty-reducing actions."),

q(1109,"Probability","calm","Easy",10,
  "What distinguishes aleatoric from epistemic uncertainty in robot learning?",
  ["Aleatoric comes from the model; epistemic comes from measurement noise.",
   "Both are identical and can both be reduced with more training data.",
   "Epistemic uncertainty only appears in Bayesian neural network architectures.",
   "Aleatoric is irreducible noise in the data; epistemic is reducible model uncertainty due to limited knowledge."],
  3,"Data noise vs model uncertainty.",
  "Aleatoric: inherent sensor noise; epistemic: model uncertainty that shrinks with more training data.",
  "Safety-critical robots must quantify both types for reliable decision-making."),

q(1110,"Probability","calm","Easy",10,
  "What does the law of total probability compute?",
  ["Probabilities of all events in a sample space sum to more than one.",
   "Conditional probability of two dependent events.",
   "The expectation of any distribution always equals its mode.",
   "P(A) = Σ P(A|Bᵢ)·P(Bᵢ) for a partition {Bᵢ}, marginalising over a hidden variable."],
  3,"Marginalise over a partition.",
  "By summing over all values of a conditioning variable, total probability collapses the joint distribution.",
  "Bayes filter prediction: p(x_t|z_{1:t-1}) = ∫p(x_t|x_{t-1})p(x_{t-1}|z_{1:t-1})dx_{t-1}."),

q(1111,"Probability","calm","Medium",10,
  "Why is KL divergence asymmetric and what does KL(P‖Q) represent?",
  ["KL divergence is symmetric; KL(P‖Q) = KL(Q‖P) always holds.",
   "KL(P‖Q) measures the entropy of the mixture (P+Q)/2.",
   "KL divergence equals squared Euclidean distance between distribution means.",
   "KL(P‖Q) = E_P[log P/Q] measures the expected log-ratio under P; P and Q play different roles."],
  3,"D_KL(P‖Q) = E_P[log P/Q] penalises where P is high and Q is low.",
  "Asymmetry: KL(P‖Q) penalises regions where P is high but Q is low; KL(Q‖P) penalises the opposite.",
  "VAE training minimises KL(q(z|x)‖p(z)), the forward KL from approximate to prior."),

q(1112,"Probability","calm","Medium",10,
  "What is the Cramér-Rao lower bound and why is it important for sensor fusion?",
  ["It specifies the minimum sample size for a statistically consistent estimate.",
   "It bounds the maximum likelihood from above for Gaussian distributions.",
   "It states that posterior variance is always larger than prior variance.",
   "It sets a lower bound on the variance of any unbiased estimator, equal to the inverse Fisher information matrix."],
  3,"Variance ≥ (Fisher info)⁻¹.",
  "No unbiased estimator can achieve variance below the CRLB; the Kalman filter achieves it for linear Gaussian systems.",
  "Comparing estimator variance to the CRLB reveals sensor fusion algorithm efficiency."),

q(1113,"Probability","calm","Hard",10,
  "How does Gaussian process regression handle model uncertainty differently from parametric regression?",
  ["GP uses a fixed parameterised function and provides no uncertainty estimate.",
   "GP requires more data than neural networks to achieve equivalent accuracy.",
   "GP regression is identical to Bayesian linear regression with a fixed feature map.",
   "GP regression maintains a full posterior distribution over functions, providing calibrated uncertainty at every prediction point."],
  3,"Non-parametric posterior over functions.",
  "A GP is defined by a mean function and covariance kernel; the posterior gives calibrated confidence intervals after observing data.",
  "Safe robot controllers use GP-based uncertainty to avoid high-uncertainty regions of the state space."),

q(1114,"Probability","calm","Hard",10,
  "Why does the curse of dimensionality cause particle filters to fail in high-dimensional state spaces?",
  ["Particle filters are less affected by high dimensions than Kalman filters.",
   "High dimensions make particle weights uniform, paradoxically improving estimation.",
   "The curse only affects grid-based filters, not particle filters.",
   "The number of particles needed to represent the distribution with fixed accuracy grows exponentially with state dimension."],
  3,"Exponential particle count required.",
  "In d dimensions, covering the state space to resolution ε needs O((1/ε)^d) particles; infeasible for full 6-DOF pose estimation.",
  "Rao-Blackwellisation and low-dimensional sufficient statistics mitigate the curse."),

q(1115,"Probability","calm","Hard",10,
  "What property of exponential family distributions makes Bayesian updating tractable?",
  ["They have zero entropy, making the posterior deterministic after one update.",
   "All exponential family distributions have Gaussian marginals.",
   "They satisfy the Markov property automatically without any assumptions.",
   "They have conjugate priors, so the posterior remains in the same family after a Bayesian update."],
  3,"Conjugate priors lead to closed-form posteriors.",
  "For an exponential family likelihood the conjugate prior update reduces to incrementing natural parameters: tractable and exact.",
  "Kalman filter exploits Gaussian conjugacy; Dirichlet-categorical exploits Dirichlet conjugacy."),

q(1116,"Probability","calm","Hard",10,
  "How does the EM algorithm handle latent variables in robot learning problems?",
  ["EM draws random samples from the prior in the E-step; then updates the posterior in M-step.",
   "EM directly maximises marginal likelihood without introducing latent variables.",
   "EM is only applicable to models with Gaussian latent variable distributions.",
   "E-step computes expected complete-data log-likelihood under current parameters; M-step maximises it, alternating until convergence."],
  3,"Alternating E and M steps on complete-data likelihood.",
  "EM monotonically increases the marginal likelihood by introducing a lower bound via Jensen inequality.",
  "Used for Gaussian mixture models, HMMs, and motion primitive learning."),

q(1117,"Probability","calm","Hard",10,
  "What does calibration mean for a probabilistic classifier?",
  ["Calibration means the classifier achieves maximum accuracy on the test set.",
   "A calibrated model has equal precision and recall across all classes.",
   "Calibration measures correlation between predicted and true labels.",
   "A calibrated classifier's predicted probability p matches the empirical fraction of positive outcomes across bins."],
  3,"Predicted probability equals empirical frequency.",
  "ECE = Σ|acc(Bₘ)−conf(Bₘ)|×|Bₘ|/n measures calibration quality across confidence bins.",
  "Robot safety systems rely on calibrated uncertainty to trigger fallback behaviours."),

q(1118,"Probability","calm","Hard",10,
  "What is an improper prior and when is it acceptable in Bayesian robot estimation?",
  ["A prior that assigns zero probability to any physically feasible states.",
   "A prior that explicitly contradicts the physical constraints of the robot.",
   "A prior derived from a completely mismatched sensor noise model.",
   "A prior that does not integrate to a finite value; acceptable when the posterior is proper given the likelihood."],
  3,"Non-normalisable prior acceptable only when posterior is proper.",
  "Flat priors over unbounded state spaces are improper but if the likelihood is informative enough the posterior is proper and valid.",
  "Uninformative priors are used in robot parameter identification when no prior knowledge is available."),

q(1119,"Probability","calm","Hard",10,
  "How does importance sampling allow estimation of expectations under a hard-to-sample distribution?",
  ["Importance sampling replaces the target distribution with a Gaussian approximation.",
   "It requires the target distribution to be log-concave for convergence.",
   "It is only accurate when proposal and target distributions are identical.",
   "Samples from a tractable proposal are reweighted by the density ratio target/proposal, correcting for the mismatch."],
  3,"Reweight samples by density ratio to correct mismatch.",
  "E_p[f(x)] = E_q[f(x)·p(x)/q(x)]; choosing q close to p·|f| minimises importance weight variance.",
  "Sequential importance sampling is the theoretical foundation of particle filters."),

q(1120,"Probability","calm","Hard",10,
  "Why are heavy-tailed distributions preferred over Gaussians for modelling outlier measurements?",
  ["Gaussian distributions have heavier tails than Student-t distributions.",
   "Heavy-tailed priors increase estimation variance, making them less accurate.",
   "Heavy tails only matter when the measurement space is discrete.",
   "Heavy tails assign non-negligible probability to large deviations, reducing the influence of outliers on the MAP estimate."],
  3,"Non-negligible probability at large deviations reduces outlier influence.",
  "Gaussian M-estimators weight outliers strongly; Student-t or Cauchy distributions downweight large residuals automatically.",
  "Robust SLAM systems use Cauchy or Huber loss on measurement residuals to suppress outlier loop closures."),

// ── CALM: Manipulators (1121-1135) ────────────────────────
q(1121,"Manipulators","calm","Easy",10,
  "What is the distinction between position control and force control in manipulation?",
  ["Force control is a special case of position control with inverted gain sign.",
   "Position control is used only during free-space motion; force control only when stationary.",
   "Both are implemented identically using different sensor modalities as input.",
   "Position control regulates end-effector geometry; force control regulates contact forces; both are needed for constrained tasks."],
  3,"Geometry vs interaction forces.",
  "In free space position control suffices; on contact, regulating force prevents damage and ensures stable interaction.",
  "Hybrid position/force control specifies different modes for different task-space directions."),

q(1122,"Manipulators","calm","Easy",10,
  "What does the dexterity ellipsoid of a manipulator represent?",
  ["Volume of the reachable workspace bounded by all joint limits.",
   "Set of end-effector forces achievable for a unit joint torque input.",
   "Region around the end effector within which forces can be applied.",
   "Set of end-effector velocities achievable for unit joint-velocity norm, reflecting directional bias."],
  3,"Achievable Cartesian velocities for unit joint rates.",
  "Dexterity ellipsoid = {Jv : ‖v‖≤1}; elongated ellipsoids indicate directional bias near singularity.",
  "Manipulability measure w=√det(JJ^T) summarises the ellipsoid as a scalar."),

q(1123,"Manipulators","calm","Easy",10,
  "What is the primary benefit of resolved-rate motion control?",
  ["It eliminates the need for any forward kinematics computation.",
   "It guarantees minimum joint torque for all commanded motions.",
   "It solves the full IK problem analytically for any reachable pose.",
   "It directly specifies end-effector velocity in Cartesian space and computes joint rates via J† in real time."],
  3,"Direct Cartesian velocity to joint rates via J†.",
  "ẋ_desired → q̇ = J†·ẋ_desired; Cartesian velocity commands are intuitive for teleoperation and task-space control.",
  "Real-time resolved-rate control is standard in industrial robot controllers."),

q(1124,"Manipulators","calm","Medium",10,
  "How does the task-priority hierarchical framework handle conflicting objectives?",
  ["All objectives are combined into a single weighted sum and optimised jointly.",
   "Task priorities are assigned randomly at each control timestep.",
   "Higher-priority tasks receive larger gains but may still be violated.",
   "Higher-priority tasks are satisfied exactly; lower-priority tasks are projected into the null space of all higher-priority tasks."],
  3,"Strict hierarchy via null-space projection.",
  "τ=τ₁+N₁^T·(τ₂+N₂^T·(τ₃+…)); Nᵢ is the null-space projector of all tasks above i.",
  "Used in whole-body controllers for humanoid robots combining balance, manipulation, and gaze."),

q(1125,"Manipulators","calm","Medium",10,
  "What distinguishes force closure from grasp quality in grasp planning?",
  ["Stability means the grasp is collision-free; quality measures approach speed.",
   "Both terms are synonymous in the grasp planning literature.",
   "Stability requires point contact; quality requires distributed surface contact.",
   "Force closure is binary (stable or not); quality measures the margin or robustness of that closure."],
  3,"Binary property vs continuous margin.",
  "Force closure means no unresisted wrench; quality metrics like the largest inscribed sphere in the wrench space measure robustness.",
  "Higher quality grasps tolerate larger external perturbations before failing."),

q(1126,"Manipulators","calm","Hard",10,
  "How does the wrist singularity of a 6-DOF spherical-wrist robot manifest?",
  ["Wrist singularity occurs when all six joint angles are simultaneously zero.",
   "It manifests as complete simultaneous loss of all rotational DOF.",
   "Wrist singularity only affects robots with prismatic joints in the wrist.",
   "When the middle wrist joint is at 0° or 180°, the first and third wrist joints become coplanar, losing a DOF."],
  3,"Middle wrist axis alignment collapses two axes to one.",
  "With the middle wrist at 0°, joints 4 and 6 have parallel axes, reducing orientation DOF from 3 to 2.",
  "Path planners route trajectories to avoid wrist singularity configurations."),

q(1127,"Manipulators","calm","Hard",10,
  "What does the selection matrix S accomplish in hybrid position/force control?",
  ["S scales impedance gains for smooth contact transitions.",
   "S selects which joints are torque-controlled vs position-controlled.",
   "S enables or disables the integral term in contact control.",
   "S decomposes the task space into force-controlled and position-controlled directions based on contact geometry."],
  3,"Geometric task-space decomposition into force and position subspaces.",
  "The constraint Jacobian defines constrained directions; S projects the task into these subspaces for independent position and force control.",
  "Grinding, polishing, and insertion tasks use hybrid control with S derived from surface normals."),

q(1128,"Manipulators","calm","Hard",10,
  "Why does dynamic manipulability differ from kinematic manipulability?",
  ["Dynamic manipulability is kinematic manipulability scaled by joint stiffness.",
   "Dynamic manipulability only applies to robots with more than 6 DOF.",
   "Both measures are equivalent for robots with uniform link mass distribution.",
   "Dynamic manipulability accounts for inertia and joint torque limits; kinematic considers only velocity or geometric constraints."],
  3,"Torque-limited acceleration ellipsoid vs velocity ellipsoid.",
  "Dynamic manipulability ellipsoid incorporates the inertia matrix; it changes even without configuration change if velocities change.",
  "Used to plan motions that exploit dynamic capabilities for faster and safer execution."),

q(1129,"Manipulators","calm","Hard",10,
  "How do compliant motion strategies exploit environmental constraints in robotic assembly?",
  ["Maximising stiffness is needed to resist all contact forces during insertion.",
   "Compliant strategies reduce actuator forces to zero during any contact phase.",
   "Environmental constraints are avoided entirely in a compliant motion approach.",
   "By controlling stiffness and damping so contact forces act as geometric guides rather than disturbances."],
  3,"Controlled compliance uses contact as a guide.",
  "Peg-in-hole assembly uses chamfers and stiffness control so contact forces naturally guide the peg; RCC devices do this passively.",
  "Active impedance control generalises this passive compliance to arbitrary task geometries."),

q(1130,"Manipulators","calm","Hard",10,
  "Why does the Jacobian transpose method converge only when away from singularities?",
  ["J^T always converges regardless of configuration.",
   "J^T avoids singularity issues because it never requires matrix inversion.",
   "J^T converges only for position tasks, not orientation tasks.",
   "Near singularities, degenerate directions amplify errors in the gradient-descent-like update, making convergence unreliable."],
  3,"Near singularities degenerate directions amplify errors.",
  "While J^T avoids explicit inversion unlike J†, the gradient-descent-like update has ill-conditioned curvature near singularities.",
  "Damped least squares (Levenberg-Marquardt) provides a singularity-robust alternative."),

q(1131,"Manipulators","calm","Hard",10,
  "What is the grasp matrix G and how does it map contact forces to object wrenches?",
  ["G describes the mass distribution of the grasped object.",
   "G is the Jacobian of the hand kinematics mapping joint rates to finger velocities.",
   "G maps joint torques directly to end-effector contact forces.",
   "G maps individual finger contact force vectors to the net wrench on the object; G^T maps desired object wrenches to contact forces."],
  3,"G: contact forces → object wrench; G^T: object wrench → contact forces.",
  "The rows of G encode contact normals and moment arms; contact force distribution is found by solving G·f=w.",
  "Dexterous manipulation planning uses G to verify force closure and plan internal force distributions."),

q(1132,"Manipulators","calm","Hard",10,
  "Why is torque control preferred over position control for safe human-robot collaboration?",
  ["Torque control is inherently faster than position control, making it safer.",
   "Torque-controlled robots always operate at lower maximum speeds.",
   "Position control is unsafe only when joint limits are physically exceeded.",
   "Torque control enables compliance regulation so the robot yields to external forces rather than rigidly maintaining position."],
  3,"Compliance via torque control allows yielding to contact forces.",
  "Position-controlled robots resist external forces with high stiffness, creating injury risk; torque control enables impedance shaping.",
  "ISO 10218 safety standards for cobots rely on force/torque limiting enabled by torque control."),

q(1133,"Manipulators","calm","Hard",10,
  "How does the gravity compensation term g(q) improve joint-level PD controller performance?",
  ["g(q) replaces the derivative term, reducing overall controller complexity.",
   "Gravity compensation introduces instability in vertically oriented joints.",
   "g(q) is only needed for prismatic joints, not revolute ones.",
   "Adding g(q) as feedforward cancels gravitational joint torques, allowing PD gains to be lowered for softer, more stable positioning."],
  3,"Feedforward gravity cancellation reduces residual PD error.",
  "Without gravity compensation a PD controller must maintain a large integral-like error to hold position against gravity.",
  "KUKA LBR and Franka Panda use real-time gravity compensation for torque-transparent control."),

q(1134,"Manipulators","calm","Hard",10,
  "What role does the internal force component play in multi-finger grasping?",
  ["Internal forces contribute to the net torque on the grasped object.",
   "Internal forces are always zero for any force-closure grasp configuration.",
   "Internal forces arise only in parallel-jaw grippers, not dexterous hands.",
   "Internal forces squeeze between fingers, maintaining grasp stability without affecting the net wrench on the object."],
  3,"Squeeze forces maintain grasp without affecting net wrench.",
  "The null space of G spans internal forces; they generate no net wrench but increase normal contact forces, improving friction margin.",
  "Optimising internal forces prevents slip while minimising total actuator effort."),

q(1135,"Manipulators","calm","Hard",10,
  "Why do series elastic actuators enable better interaction control than stiff geared motors?",
  ["SEAs are preferred only for high-speed motions, not interaction control.",
   "The spring in SEA reduces bandwidth, making the actuator faster overall.",
   "Geared motors provide higher back-drivability than SEAs at all operating points.",
   "The elastic element attenuates impact, stores energy, and provides high-fidelity force sensing via spring deflection."],
  3,"Elastic element: impact attenuation + spring-deflection force sensing.",
  "Rigid gearboxes reflect high inertia and friction; the spring decouples motor inertia and enables force estimation from Δθ.",
  "ANYdrive, HEBI, and Dynamixel Pro use elastic elements for safe compliant manipulation."),

// ── CALM: Computation (1136-1150) ─────────────────────────
q(1136,"Computation","calm","Easy",10,
  "What architectural feature distinguishes a GPU from a CPU for deep learning inference?",
  ["GPUs have larger individual caches and higher single-thread clock speeds.",
   "CPUs are faster for all robotics workloads due to their complex cores.",
   "GPUs operate on integers only; CPUs handle floating-point arithmetic natively.",
   "GPUs have thousands of simpler SIMD cores optimised for data-parallel matrix operations."],
  3,"Thousands of SIMD cores for parallelism.",
  "Modern GPUs have thousands of CUDA cores optimised for FP16 tensor operations vs 16-64 CPU cores designed for serial tasks.",
  "Robot perception stacks run CNNs on GPU while planning runs on CPU concurrently."),

q(1137,"Computation","calm","Easy",10,
  "What is the purpose of Direct Memory Access (DMA) in embedded robot systems?",
  ["DMA doubles the processor clock speed for real-time tasks.",
   "DMA is a memory protection mechanism preventing peripheral access to code.",
   "DMA replaces the OS scheduler for real-time task switching.",
   "DMA transfers data between peripherals and memory without CPU involvement, freeing the CPU for control computation."],
  3,"CPU-free peripheral data transfer.",
  "IMU, encoder, and ADC data can be streamed into RAM via DMA while the CPU executes the control algorithm uninterrupted.",
  "High-frequency servo controllers use DMA for deterministic loop timing."),

q(1138,"Computation","calm","Easy",10,
  "What distinguishes throughput from latency in a robot perception pipeline?",
  ["Throughput and latency are inversely proportional for all pipelined systems.",
   "Latency is the mathematical inverse of throughput for any processor type.",
   "Throughput measures memory bandwidth; latency measures computation time.",
   "Throughput is frames per second; latency is time from sensor capture to decision output for a single frame."],
  3,"Rate vs per-sample delay.",
  "High throughput with high latency means many frames are pipelined simultaneously; low latency is critical for closed-loop control.",
  "A 10 Hz perception loop may have 100 ms latency yet high throughput via batching."),

q(1139,"Computation","calm","Medium",10,
  "Why does quantisation of neural network weights reduce inference latency on edge hardware?",
  ["Quantisation removes non-essential layers, reducing total computation.",
   "Quantisation increases weight precision, making each operation faster.",
   "It replaces convolution with correlation, which is computationally cheaper.",
   "INT8 or INT4 weights reduce memory footprint and enable faster integer SIMD operations vs FP32, fitting more data in cache."],
  3,"Integer ops + smaller memory → faster inference.",
  "FP32 to INT8 reduces model size 4×; NPUs execute INT8 ops at peak throughput orders of magnitude above FP32.",
  "TensorRT and TFLite quantise robot vision models for real-time edge deployment."),

q(1140,"Computation","calm","Medium",10,
  "What is the difference between preemptive and cooperative multitasking in a real-time robot OS?",
  ["Cooperative is always faster because it avoids context-switch overhead.",
   "Preemptive scheduling is only available on multicore processors.",
   "Both models guarantee the same worst-case latency and jitter.",
   "Preemptive: the scheduler can interrupt any task; cooperative: tasks yield voluntarily, risking deadline misses."],
  3,"Forced vs voluntary context switching.",
  "Preemptive RTOS (FreeRTOS, Xenomai) guarantee that a high-priority task runs within bounded time after its deadline.",
  "Motor control loops require preemptive scheduling to meet microsecond deadlines reliably."),

q(1141,"Computation","calm","Hard",10,
  "Why does Amdahl's law limit speedup when parallelising a robot perception pipeline?",
  ["Amdahl's law only applies to GPU parallelism, not CPU parallelism.",
   "Adding processors always linearly increases speedup with Amdahl's model.",
   "The law bounds memory bandwidth, not computation speed or throughput.",
   "The non-parallelisable serial fraction s sets an upper bound of 1/s on total speedup regardless of processor count."],
  3,"Serial bottleneck limits parallelism: speedup ≤ 1/s.",
  "Speedup = 1/(s+(1−s)/N); if 10% is serial, max speedup approaches 10× even with infinite cores.",
  "Pre/post-processing serial steps often bottleneck GPU-accelerated neural inference."),

q(1142,"Computation","calm","Hard",10,
  "How does the ONNX format benefit robot deployment across heterogeneous hardware?",
  ["ONNX compresses weights using lossless encoding for edge deployment.",
   "ONNX is a runtime that executes models faster than TensorFlow or PyTorch natively.",
   "ONNX converts neural networks into C code for MCU deployment directly.",
   "ONNX provides a hardware-agnostic intermediate representation allowing models trained in one framework to be compiled for different targets."],
  3,"Hardware-agnostic IR enables cross-platform deployment.",
  "A model exported to ONNX can be compiled by TensorRT (NVIDIA), OpenVINO (Intel), or CoreML (Apple).",
  "Robot stacks train in PyTorch, export to ONNX, then compile for Jetson or Coral."),

q(1143,"Computation","calm","Hard",10,
  "Why does neuromorphic computing offer advantages for event-driven robot sensing?",
  ["Neuromorphic chips run standard deep learning models faster than GPUs.",
   "Neuromorphic computing eliminates digital-to-analogue conversion in sensors.",
   "Loihi is faster than GPUs only for dense matrix operations.",
   "Spiking neural networks process only when events occur, matching event cameras with orders-of-magnitude lower power."],
  3,"Event-driven computation matches asynchronous event sensors.",
  "Loihi spike-based computation is activated only when input spikes arrive; idle power is minimal.",
  "Research combines event cameras with Loihi for sub-millisecond obstacle detection."),

q(1144,"Computation","calm","Hard",10,
  "What is time-sensitive networking (TSN) and why is it important for distributed real-time robot control?",
  ["TSN is a wireless protocol that reduces interference in multi-robot communication.",
   "TSN replaces CAN bus by increasing bandwidth without any latency guarantees.",
   "TSN is a software scheduling algorithm for single-board computers.",
   "TSN (IEEE 802.1) adds deterministic latency guarantees and priority-based preemption to Ethernet for control network traffic."],
  3,"Deterministic Ethernet for real-time control networks.",
  "Standard Ethernet is best-effort; TSN adds credit-based shaping and frame preemption to guarantee bounded latency.",
  "Industrial robot cells and autonomous vehicles use TSN to synchronise perception, planning, and actuation."),

q(1145,"Computation","calm","Hard",10,
  "Why does the memory wall disproportionately affect sparse robot computation tasks like graph search?",
  ["The memory wall only affects dense matrix operations in neural networks.",
   "Sparse computation is faster than dense regardless of memory access patterns.",
   "Graph search is compute-bound because each node evaluation requires complex arithmetic.",
   "Sparse data structures cause irregular memory access patterns with poor cache locality, making memory bandwidth the bottleneck."],
  3,"Irregular access destroys cache locality.",
  "Dense neural network layers have predictable sequential access (cache-friendly); graph edges point to arbitrary memory locations causing cache misses.",
  "Hardware accelerators for path planning use memory-aware data layouts."),

q(1146,"Computation","calm","Hard",10,
  "What advantage does FPGA-based acceleration provide over GPU for hard real-time robot control?",
  ["FPGAs provide higher floating-point FLOPS than GPUs for deep learning inference.",
   "FPGAs are reprogrammed during runtime without any downtime unlike GPUs.",
   "FPGAs eliminate the need for a host processor in all robot systems.",
   "FPGAs enable deterministic cycle-accurate timing with microsecond latency guarantees that GPU scheduling jitter cannot match."],
  3,"Deterministic cycle-accurate timing vs GPU scheduling jitter.",
  "GPU compute is pipelined and subject to OS scheduling; FPGAs execute hardware logic with nanosecond-level determinism.",
  "Joint-level servo controllers at 10 kHz and EtherCAT master interfaces use FPGA implementations."),

q(1147,"Computation","calm","Hard",10,
  "What is the roofline model and how does it guide neural network optimisation for robot deployment?",
  ["The roofline model predicts absolute execution time for any neural network.",
   "It applies only to GPU hardware, not embedded processors or NPUs.",
   "The roofline model measures the accuracy-latency tradeoff, not hardware utilisation.",
   "The roofline model characterises whether a computation is memory-bandwidth-bound or compute-bound, enabling targeted optimisation."],
  3,"Memory-bound vs compute-bound characterisation guides targeted optimisation.",
  "Arithmetic intensity = FLOP/byte; if intensity is below the ridge point the layer is memory-bound; above it is compute-bound.",
  "Network architects prune low-intensity layers and fuse operations to exceed the ridge point on Jetson."),

q(1148,"Computation","calm","Hard",10,
  "Why do lock-free data structures improve real-time performance in multi-threaded robot software?",
  ["Lock-free structures are faster because hardware atomics are slower than software locks.",
   "Lock-free structures are only beneficial when more than 16 threads are used.",
   "Lock-free structures eliminate the need for memory ordering constraints.",
   "Lock-free structures avoid mutex contention and priority inversion, eliminating blocking delays that cause deadline misses."],
  3,"No mutex blocking: avoids contention and priority inversion.",
  "Mutexes can cause high-priority control threads to block waiting for low-priority sensor threads; lock-free SPSC queues enable wait-free data passing.",
  "ROS2 DDS implementations use lock-free queues for sensor data hand-off to controllers."),

q(1149,"Computation","calm","Hard",10,
  "How does cache-oblivious algorithm design improve performance for robot kinematics libraries?",
  ["Cache-oblivious algorithms always outperform cache-aware algorithms by exactly 2×.",
   "Cache-oblivious design only applies to matrix-vector products, not kinematic chains.",
   "Cache-oblivious algorithms eliminate branch mispredictions in the CPU pipeline.",
   "Cache-oblivious algorithms divide problems recursively until sub-problems fit cache, improving locality automatically without knowing cache size."],
  3,"Recursive divide-until-fits-cache provides automatic locality without tuning.",
  "Pinocchio and similar libraries use blocked recursive kinematic traversals that automatically achieve good cache utilisation.",
  "Improves FK/IK throughput for batch trajectory optimisation on multi-core CPUs."),

q(1150,"Computation","calm","Hard",10,
  "How does HW/SW co-design apply to neural network accelerator development for robots?",
  ["HW/SW co-design means writing assembly code instead of using high-level compilers.",
   "It means the robot software is completely rewritten for each new hardware generation.",
   "Co-design applies only to ASIC development, not FPGA or GPU platforms.",
   "Hardware datapaths are designed for the dominant operations of target networks while the network architecture is co-optimised to match hardware strengths."],
  3,"Hardware datapath designed for network ops; network co-optimised for hardware.",
  "Google TPU targets systolic matrix multiply matching transformer attention; NVIDIA Orin has dedicated DLA cores matching convolutional detection networks.",
  "Efficient robot AI inference requires joint optimisation of network architecture and accelerator datapath."),

// ══════════════════════════════════════════════════════════
// COMPETITIVE MODE — 20 realms × 15 questions = 300 questions
// Starter = 20 pts, Research = 30 pts
// ══════════════════════════════════════════════════════════

// ── Numerical Optimization (2001-2015) ────────────────────
q(2001,"Numerical Optimization","competitive","Starter",20,
  "Why does gradient descent on a non-convex loss surface not guarantee a global minimum?",
  ["Gradient descent always converges to the global minimum given a small enough learning rate.",
   "Non-convex surfaces have only saddle points, no local minima to trap descent.",
   "Gradient descent is undefined for non-convex objective functions.",
   "Non-convex surfaces have multiple local minima and saddle points; gradient descent can terminate at any stationary point."],
  3,"Local stationarity ≠ global optimality.",
  "Without convexity, the gradient being zero can be a local min, max, or saddle; gradient descent is attracted to whichever stationary point it reaches first.",
  "Neural network training navigates this with stochastic updates and momentum."),

q(2002,"Numerical Optimization","competitive","Starter",20,
  "What is a quadratic program and why is it efficiently solvable in robot control loops?",
  ["A QP is efficient because it avoids computing any gradients during optimisation.",
   "A QP is efficient only when the Hessian matrix is strictly diagonal.",
   "A QP is equivalent to a linear program when equality constraints are added.",
   "A QP has a quadratic objective with linear constraints, admitting globally optimal solutions via active-set or interior-point methods."],
  3,"Convex QP: global optimum efficiently via KKT.",
  "The KKT conditions for a QP are linear, enabling direct solution; active-set methods update the constraint set incrementally for warm-starting.",
  "Whole-body robot controllers solve 100+ variable QPs at 1 kHz."),

q(2003,"Numerical Optimization","competitive","Starter",20,
  "Why does Newton's method converge faster than gradient descent near a minimum?",
  ["The Hessian replaces the gradient entirely, eliminating first-order information.",
   "Newton's method needs fewer function evaluations by skipping alternate iterations.",
   "The Hessian projects the gradient onto the feasible constraint set directly.",
   "The Hessian captures local curvature, scaling steps by inverse curvature for quadratic convergence."],
  3,"Curvature-scaled steps → quadratic convergence.",
  "Gradient descent ignores curvature; Newton scales by H⁻¹∇f, taking larger steps in flat directions and smaller in curved ones.",
  "Quasi-Newton methods (BFGS, L-BFGS) approximate H⁻¹ to avoid O(n³) factorisation."),

q(2004,"Numerical Optimization","competitive","Starter",20,
  "What do the KKT conditions provide for constrained optimisation problems?",
  ["Sufficient conditions for global optimality for any smooth optimisation problem.",
   "A direct primal solution without the need for dual variables.",
   "They are only applicable to equality-constrained problems, not inequality ones.",
   "Necessary conditions for a local optimum: stationarity, primal/dual feasibility, and complementary slackness."],
  3,"Necessary conditions at a constrained optimum.",
  "At a local minimum: ∇f+Σλᵢ∇gᵢ=0, λᵢ≥0, λᵢ·gᵢ=0; for convex problems these are also sufficient.",
  "Robot contact force optimisation checks KKT conditions to verify solution validity."),

q(2005,"Numerical Optimization","competitive","Starter",20,
  "Why is warm-starting critical for MPC on embedded robot hardware?",
  ["Warm-starting guarantees global optimality of the MPC solution.",
   "It allows MPC to skip the constraint satisfaction step on the first iteration.",
   "Warm-starting is equivalent to increasing the prediction horizon length.",
   "The previous solution provides a near-feasible initial guess, dramatically reducing iterations needed within the control cycle."],
  3,"Near-feasible init reduces iterations within the control cycle.",
  "MPC re-solves a similar problem every cycle; the previous solution shifted by one timestep often satisfies constraints, converging in 1-3 iterations.",
  "Without warm-starting, cold-start interior-point methods take 20-50 iterations, missing real-time deadlines."),

q(2006,"Numerical Optimization","competitive","Research",30,
  "Why do interior-point methods have polynomial iteration complexity while simplex can be exponential?",
  ["Interior-point methods avoid the feasible set entirely; simplex stays strictly inside it.",
   "Simplex has polynomial average-case complexity; interior-point is exponential.",
   "Both have identical theoretical complexity; differences are only practical.",
   "Interior-point methods follow a central path through the feasible interior with provably polynomial iteration complexity; simplex traverses vertices that can be exponentially many."],
  3,"Central path: polynomial; vertex walk: potentially exponential.",
  "Interior-point reduces a primal-dual system at each step with iteration count O(√n·log(1/ε)); simplex can visit exponentially many vertices.",
  "OSQP and qpOASES are standard primal-dual interior-point solvers in robot control."),

q(2007,"Numerical Optimization","competitive","Research",30,
  "How does ADMM exploit problem structure for distributed multi-robot optimisation?",
  ["ADMM is a gradient method alternating between primal and dual gradient steps.",
   "ADMM requires a centralised coordinator that solves the full problem at each step.",
   "ADMM converges only for purely quadratic objectives without any constraints.",
   "ADMM decomposes the problem into smaller subproblems solved by individual robots, coordinating via dual variable updates to reach consensus."],
  3,"Decompose, local solve, dual update, consensus.",
  "ADMM: minimise f(x)+g(z) s.t. Ax+Bz=c via alternating x-update, z-update, and dual update; each subproblem is solved independently.",
  "Multi-robot trajectory planning uses ADMM to coordinate without sharing full state."),

q(2008,"Numerical Optimization","competitive","Research",30,
  "What makes contact-implicit trajectory optimisation harder than contact-explicit methods?",
  ["Contact-implicit methods are always simpler because they avoid discrete mode enumeration.",
   "Contact-explicit methods must solve mixed-integer programs; contact-implicit avoids integers.",
   "The difficulty is identical; only the solution representation differs.",
   "Contact-implicit formulations include contact forces and modes as variables, creating non-smooth complementarity constraints that are non-convex and combinatorial."],
  3,"Non-smooth complementarity + combinatorial contact modes.",
  "Contact complementarity: fₙ≥0, d≥0, fₙ·d=0 creates non-convex non-smooth constraints; mode enumeration explodes combinatorially.",
  "MPCC and relaxation methods address contact-implicit optimisation."),

q(2009,"Numerical Optimization","competitive","Research",30,
  "Why does iLQR achieve super-linear convergence near the optimal trajectory?",
  ["iLQR converges slowly because it ignores all second-order coupling terms.",
   "Super-linear convergence comes from the line search doubling the step size.",
   "iLQR converges at a linear rate; super-linear applies only to full DDP.",
   "Near the optimum the quadratic approximation is tight; the backward Riccati pass solves the local LQR exactly, giving Newton-like convergence."],
  3,"Tight local quadratic + exact Riccati solve → Newton-like convergence.",
  "iLQR solves the backward Riccati pass exactly for the local LQR problem; this is equivalent to one Newton step on the stationarity conditions.",
  "Differential Dynamic Programming (DDP) adds second-order terms for even faster convergence."),

q(2010,"Numerical Optimization","competitive","Research",30,
  "How does sum-of-squares (SOS) programming certify global optimality for polynomial problems?",
  ["SOS finds the global optimum by factoring the objective into linear terms.",
   "SOS applies only to convex polynomial objectives without any inequality constraints.",
   "SOS relaxations are always tight for any polynomial optimisation program.",
   "SOS relaxes polynomial optimisation to a semidefinite program whose feasibility certifies the polynomial is globally non-negative."],
  3,"SDP relaxation certifies non-negativity and bounds the optimal value.",
  "A polynomial p(x)≥0 iff it can be written as a sum of squares; checking SOS-feasibility via SDP provides a lower bound.",
  "DSOS/SDSOS methods use cheaper relaxations for real-time robot safety verification."),

q(2011,"Numerical Optimization","competitive","Research",30,
  "What is the Moreau envelope and how does it regularise non-smooth optimisation?",
  ["The Moreau envelope adds a hard constraint enforcing trajectory smoothness.",
   "It converts inequality constraints to equality constraints for standard solvers.",
   "The Moreau envelope is identical to the Lagrangian dual function.",
   "The Moreau envelope smooths a non-smooth function by inf-convolution with a quadratic penalty, creating a differentiable approximation."],
  3,"Inf-convolution with quadratic creates a smooth approximation.",
  "Mᵧf(x)=infᵧ[f(y)+(1/2γ)‖x−y‖²]; the minimiser of f equals the minimiser of Mᵧf but Mᵧf is differentiable even when f is not.",
  "Proximal gradient methods for contact-rich manipulation use Moreau envelopes of contact forces."),

q(2012,"Numerical Optimization","competitive","Research",30,
  "How does Pontryagin's minimum principle specify optimal control via the Hamiltonian?",
  ["PMP is a discretisation of the Hamilton-Jacobi-Bellman equation.",
   "The Hamiltonian in PMP equals the total mechanical energy of the robot.",
   "PMP applies only to linear systems; nonlinear systems must use HJB instead.",
   "PMP states that optimal control minimises H=L+λ^T·f at each instant; the costate λ satisfies adjoint equations."],
  3,"Optimal control minimises Hamiltonian; costate from adjoint equations.",
  "H(x,u,λ)=L(x,u)+λ^T·f(x,u); u*=argmin_u H; λ̇=−∂H/∂x.",
  "Indirect methods for robot trajectory optimisation solve the boundary-value problem from PMP."),

q(2013,"Numerical Optimization","competitive","Research",30,
  "Why does the primal-dual interior-point method become ill-conditioned near the feasible set boundary?",
  ["Ill-conditioning only occurs for non-convex objective functions.",
   "The KKT matrix remains well-conditioned throughout all interior-point iterations.",
   "Ill-conditioning only arises when equality constraints are present.",
   "Barrier functions and slack variables approach zero near constraints, making the KKT matrix ill-conditioned as the central-path parameter approaches 0."],
  3,"Slacks approaching zero near boundary make KKT system ill-conditioned.",
  "The KKT matrix includes terms proportional to 1/s (slack inverse); as s→0 these dominate and condition number grows.",
  "Mehrotra predictor-corrector steps and regularisation mitigate numerical ill-conditioning."),

q(2014,"Numerical Optimization","competitive","Research",30,
  "What is the Frank-Wolfe algorithm advantage for motion planning under L1-ball constraints?",
  ["Frank-Wolfe is faster because it computes the full Hessian at each step.",
   "Frank-Wolfe is equivalent to gradient descent with a fixed step size.",
   "It avoids computing gradients of the constraint set entirely.",
   "Frank-Wolfe linearises the objective and solves a linear program over the constraint set, producing sparse iterates without projection."],
  3,"Linear minimisation oracle produces sparse iterates without projection.",
  "At each step: s=argmin_{x∈C}∇f(xₜ)^T·x (LMO) then xₜ₊₁=(1−γ)·xₜ+γ·s; L1-ball LMO is cheap and yields sparse solutions.",
  "Sparse waypoint generation for robot trajectories benefits from Frank-Wolfe sparsity."),

q(2015,"Numerical Optimization","competitive","Research",30,
  "How do chance constraints in stochastic MPC differ from deterministic constraints?",
  ["Chance constraints are identical to robust constraints but with a tighter bound.",
   "Stochastic MPC replaces hard constraints with soft penalty terms.",
   "Chance constraints are easier because they allow more frequent constraint violation.",
   "Chance constraints require P(g(x,w)≤0)≥1−ε for uncertain w, coupling the constraint to the distribution of uncertainty."],
  3,"Probabilistic satisfaction couples constraint to the uncertainty distribution.",
  "Deterministic: g(x)≤0 always; chance: P(g(x,w)≤0)≥1−ε for random w; the feasible set depends on the distribution.",
  "Autonomous driving MPC uses chance constraints for uncertain pedestrian trajectories."),

// ── Reinforcement Learning (2016-2030) ────────────────────
q(2016,"Reinforcement Learning","competitive","Starter",20,
  "What distinguishes on-policy from off-policy reinforcement learning?",
  ["On-policy methods require a model of the environment; off-policy do not.",
   "Off-policy algorithms always converge faster regardless of task structure.",
   "On-policy methods cannot handle continuous action spaces at all.",
   "On-policy learns the value of the current behaviour policy; off-policy learns a target policy different from the data-collection policy."],
  3,"Target policy vs behaviour policy.",
  "SARSA is on-policy; Q-learning is off-policy (targets the greedy policy regardless of behaviour).",
  "Off-policy enables experience replay with data collected by any policy."),

q(2017,"Reinforcement Learning","competitive","Starter",20,
  "Why does the temporal difference error drive learning in value-based RL?",
  ["TD error measures the mean-squared difference between predicted and actual actions.",
   "TD learning requires complete episodes before any update, like Monte Carlo.",
   "TD error equals the gradient of the policy with respect to state value.",
   "TD error = r+γ·V(s')−V(s) measures discrepancy between current estimates and bootstrapped returns, providing a training signal."],
  3,"Bootstrap target − current estimate = online learning signal.",
  "TD combines one-step reward with bootstrapped future value; this signal enables within-episode learning without complete trajectories.",
  "Q-learning, DQN, and TD3 all use TD errors as their core update signal."),

q(2018,"Reinforcement Learning","competitive","Starter",20,
  "What is the policy gradient theorem and why is it important for continuous action spaces?",
  ["It proves all policies converge to the globally optimal policy.",
   "It converts RL to supervised learning with TD errors serving as labels.",
   "It applies only to deterministic policies, not stochastic ones.",
   "It provides an analytical expression for the gradient of expected return: ∇J(θ)=E[∇log π(a|s)·Q(s,a)]."],
  3,"Gradient of expected return enables direct gradient ascent.",
  "The theorem avoids differentiating through the environment, enabling gradient-based policy optimisation in continuous action spaces.",
  "REINFORCE, PPO, and SAC all build on the policy gradient theorem."),

q(2019,"Reinforcement Learning","competitive","Starter",20,
  "What problem does the actor-critic architecture solve compared to pure policy gradients?",
  ["Actor-critic eliminates the need for any value function in the loop.",
   "The critic replaces the reward signal with a fully learned reward model.",
   "Actor-critic combines model-based and model-free methods directly.",
   "The critic estimates a baseline (value function), reducing variance of policy gradient estimates while keeping them unbiased."],
  3,"Variance reduction via critic baseline.",
  "REINFORCE has high variance (full-return Monte Carlo); the critic value estimate as baseline reduces variance without adding bias.",
  "A2C, PPO, and SAC all use actor-critic architectures."),

q(2020,"Reinforcement Learning","competitive","Starter",20,
  "Why does experience replay stabilise DQN training?",
  ["Experience replay increases the effective number of environment interactions.",
   "It prevents the Q-network from forgetting early experiences entirely.",
   "Experience replay eliminates the need for a separate target network.",
   "Randomly sampling past transitions breaks temporal correlations, providing approximately i.i.d. training batches."],
  3,"Decorrelates sequential samples for stable gradient updates.",
  "Sequential transitions are highly correlated; batching random samples approximates i.i.d. data, stabilising stochastic gradient descent.",
  "Prioritised experience replay samples high-TD-error transitions more frequently."),

q(2021,"Reinforcement Learning","competitive","Research",30,
  "Why does the deadly triad (function approximation, bootstrapping, off-policy) cause instability?",
  ["The deadly triad is only a theoretical concern; DQN is stable for all tasks.",
   "Bootstrapping is the sole cause; function approximation and off-policy are harmless alone.",
   "The triad causes instability only in continuous state spaces.",
   "The bootstrap target depends on the same approximator being updated; with off-policy data the fixed-point iteration can diverge."],
  3,"Bootstrap from approximator + off-policy updates → divergent fixed-point.",
  "The update target r+γ·Q(s',a') uses the network being updated; with off-policy data the fixed-point iteration can diverge (Baird counterexample).",
  "Target networks in DQN stabilise bootstrap targets by fixing them temporarily."),

q(2022,"Reinforcement Learning","competitive","Research",30,
  "How does maximum entropy RL (soft RL) change the optimisation objective?",
  ["Soft RL removes the entropy term entirely to improve convergence speed.",
   "Maximum entropy RL maximises entropy while completely ignoring the reward signal.",
   "Soft RL is identical to standard RL but with a different temperature parameter.",
   "Soft RL maximises expected return plus expected policy entropy, encouraging exploration and preventing premature commitment."],
  3,"Reward + entropy bonus → diverse behaviour.",
  "J(π)=E[Σγᵗ·(rₜ+α·H(π(·|sₜ)))]; the entropy bonus prevents mode collapse and enables multi-modal policies.",
  "SAC maximises this objective with automatic temperature tuning."),

q(2023,"Reinforcement Learning","competitive","Research",30,
  "Why does distributional RL (C51, QR-DQN) outperform standard Q-learning on many tasks?",
  ["It is faster because it requires fewer total environment interactions.",
   "It outperforms only in sparse-reward environments, not dense ones.",
   "Distributional methods eliminate bootstrapping, avoiding the deadly triad.",
   "Distributional RL models the full return distribution rather than its expectation, preserving multimodality and enabling risk-sensitive optimisation."],
  3,"Full return distribution vs scalar expectation.",
  "Standard Q-learning collapses the return distribution to its mean, losing variance and multimodality; distributional RL preserves these for better representation.",
  "IQN and RAINBOW include distributional components as key improvements over DQN."),

q(2024,"Reinforcement Learning","competitive","Research",30,
  "How does hindsight experience replay (HER) address the sparse reward problem?",
  ["HER densifies reward by adding intermediate sub-goal rewards along the path.",
   "HER uses a generative model to hallucinate successful example trajectories.",
   "HER modifies the discount factor to weight sparse rewards more heavily.",
   "HER relabels failed trajectories with the goal that was actually achieved, creating artificial successes that provide dense learning signal."],
  3,"Relabel with achieved goal → dense artificial successes.",
  "For a trajectory ending at s_T≠g, HER creates a new transition with goal g'=s_T and reward r=0 (success), providing training signal even for failures.",
  "Robotic manipulation with 0-1 success rewards converges with HER + DDPG."),

q(2025,"Reinforcement Learning","competitive","Research",30,
  "What theoretical property of the Bellman operator guarantees Q-learning convergence in the tabular setting?",
  ["Q-learning converges because of the replay buffer ensuring state ergodicity.",
   "The Bellman operator is a contraction only for deterministic MDPs.",
   "Convergence is guaranteed only with a constant learning rate throughout training.",
   "The Bellman optimality operator is a γ-contraction under the L∞ norm, guaranteeing a unique fixed point Q* that Q-learning converges to."],
  3,"γ-contraction → unique fixed point Q* via Banach fixed-point theorem.",
  "‖TQ₁−TQ₂‖∞≤γ‖Q₁−Q₂‖∞ for γ<1; Banach guarantees Q-learning converges to Q*.",
  "Function approximation breaks this contraction, requiring target networks and gradient clipping."),

q(2026,"Reinforcement Learning","competitive","Research",30,
  "How does GAIL differ from behavioural cloning for robot imitation learning?",
  ["GAIL directly minimises the L2 distance between agent and expert actions.",
   "GAIL is equivalent to behavioural cloning with aggressive data augmentation.",
   "GAIL requires a complete dynamics model of the environment to work.",
   "GAIL trains a discriminator to distinguish agent from expert state-action pairs, using its reward signal to train a policy via RL."],
  3,"Adversarial occupancy measure matching vs direct action regression.",
  "BC minimises E[‖π(s)−πₑ(s)‖²]; GAIL minimises JS divergence between occupancy measures ρ_π and ρₑ via a learned adversarial reward.",
  "GAIL avoids the compounding error from distribution shift that plagues behavioural cloning."),

q(2027,"Reinforcement Learning","competitive","Research",30,
  "Why does RLHF require a separate reward model rather than directly using human labels?",
  ["Human labels are too noisy to use at all; the reward model filters them.",
   "RLHF directly uses human labels without any reward model in modern implementations.",
   "The reward model converts categorical labels into continuous control signals.",
   "Human feedback is sparse and expensive; a learned reward model generalises from few labels to dense signals for scalable RL."],
  3,"Generalise sparse human labels → dense training signal.",
  "Collecting human preferences on every state-action pair is infeasible; the reward model rθ(s,a) trained on comparisons generalises to unseen states.",
  "InstructGPT and robot manipulation systems use RLHF for alignment with human intent."),

q(2028,"Reinforcement Learning","competitive","Research",30,
  "What is meta-RL and how does MAML address non-stationary environments?",
  ["MAML prevents non-stationarity by using target networks in the meta-loop.",
   "Meta-RL addresses non-stationarity by averaging gradients across all past environments.",
   "Policy gradients are unaffected by non-stationarity if the learning rate is small enough.",
   "Meta-RL learns an initialisation that quickly adapts to new MDPs via a few gradient steps; MAML finds θ such that θ−α·∇Lτ is near-optimal for any task τ."],
  3,"MAML finds a fast-adaptation initialisation via bi-level optimisation.",
  "Standard policy gradient assumes fixed MDP; MAML meta-trains across MDPs so the policy can adapt in one or a few gradient steps at test time.",
  "MAML has been applied to few-shot robot skill adaptation."),

q(2029,"Reinforcement Learning","competitive","Research",30,
  "Why does double DQN address overestimation bias in Q-value targets?",
  ["Double DQN uses two separate replay buffers to reduce gradient variance.",
   "It averages two independent Q-value estimates at each update step.",
   "Double DQN is identical to DQN but with a larger target network update frequency.",
   "Double DQN decouples action selection (online network) from action evaluation (target network), preventing the max operator from exploiting estimation noise."],
  3,"Decoupling selection and evaluation reduces max-bias.",
  "Standard DQN: y=r+γ·max_{a'}Q_target(s',a'); Double DQN: y=r+γ·Q_target(s',argmax_{a'}Q_online(s',a')).",
  "Prevents inflated Q-values that destabilise training and degrade final performance."),

q(2030,"Reinforcement Learning","competitive","Research",30,
  "What is the fundamental challenge of credit assignment in long-horizon manipulation tasks?",
  ["Rewards always occur immediately after every action in manipulation tasks.",
   "Long-horizon tasks make exploration completely unnecessary.",
   "Long-horizon tasks remove the need for any temporal reasoning.",
   "Important rewards may occur long after the actions that caused them, making it hard for the gradient signal to propagate to early decisions."],
  3,"Delayed consequences → vanishing credit signals.",
  "A manipulation success may depend on a grasp choice made 50 steps earlier; the gradient signal at that early step is tiny due to γᵗ discounting.",
  "Hierarchical RL and reward shaping are common approaches to the credit assignment problem."),

// ── Foundation Models (2031-2045) ─────────────────────────
q(2031,"Foundation Models","competitive","Starter",20,
  "Why do LLMs trained on internet text not automatically possess grounded physical understanding?",
  ["LLMs lack physical understanding because they are not trained on enough text.",
   "Physical grounding is absent because LLMs use attention instead of convolution.",
   "LLMs have full physical understanding accessible via the right prompt engineering.",
   "Text describes the physical world but lacks embodied sensorimotor experience; spatial, force, and temporal relationships are only partially captured."],
  3,"Language approximates but does not ground physics.",
  "The symbol grounding problem: words like 'weight' or 'smooth' refer to physical experiences absent from text training.",
  "PaLM-E and RT-2 attempt to ground LLMs through embodied training."),

q(2032,"Foundation Models","competitive","Starter",20,
  "What does the scaling hypothesis state about large foundation models?",
  ["Scaling beyond a threshold causes capability degradation due to overfitting.",
   "Scaling laws apply only to language models, not vision or robotics models.",
   "Doubling parameters always exactly doubles model accuracy on benchmarks.",
   "Model capability improves predictably with scale (parameters, data, compute) following power-law scaling laws."],
  3,"Capability scales predictably via power laws.",
  "Kaplan et al showed log-linear scaling of cross-entropy loss with N, D, and C; this motivated investment in larger models.",
  "The hypothesis underpins the race to scale robot foundation models like RT-2."),

q(2033,"Foundation Models","competitive","Starter",20,
  "What distinguishes in-context learning (ICL) from fine-tuning in LLMs?",
  ["ICL and fine-tuning are identical except ICL uses a larger learning rate.",
   "ICL requires gradient computation; fine-tuning does not.",
   "ICL is only possible for classification tasks, not generation.",
   "ICL adapts model behaviour via prompt examples at inference time without updating weights; fine-tuning updates weights on new task data."],
  3,"Prompt-based adaptation vs weight updates.",
  "ICL: model(prompt with k examples) → prediction; no gradient flows; knowledge is retrieved from pretraining weights.",
  "Robotic manipulation systems use ICL to specify new tasks via a few demonstration descriptions."),

q(2034,"Foundation Models","competitive","Starter",20,
  "What distinguishes a vision-language-action (VLA) model from a standard vision-language model (VLM)?",
  ["VLMs are always larger than VLAs and require more compute at inference.",
   "VLAs replace the language encoder with a proprioception encoder.",
   "VLMs output actions implicitly through text descriptions; VLAs output them explicitly.",
   "VLAs additionally output continuous or discrete robot actions; VLMs produce only text or classification outputs."],
  3,"VLA outputs actions; VLM outputs text or labels.",
  "VLM: image+text→text; VLA: image+text+robot state→action vector; the action head bridges perception and control.",
  "RT-2, Octo, and OpenVLA are VLA models trained on large robot manipulation datasets."),

q(2035,"Foundation Models","competitive","Starter",20,
  "Why is chain-of-thought (CoT) prompting effective for multi-step robot task planning?",
  ["CoT works because longer outputs inherently contain more useful information.",
   "CoT reduces computational cost by avoiding full forward passes.",
   "CoT is only effective for mathematical reasoning, not spatial planning.",
   "CoT elicits intermediate reasoning steps that decompose complex tasks into subgoals, reducing error accumulation vs direct answer generation."],
  3,"Explicit intermediate steps reduce compounding errors.",
  "Without CoT LLMs must compress multi-step reasoning into one output; step-by-step reasoning externalises working memory.",
  "SayCan and ProgPrompt use CoT-style decomposition for robot instruction following."),

q(2036,"Foundation Models","competitive","Research",30,
  "Why does catastrophic forgetting challenge fine-tuning foundation models for robot tasks?",
  ["Catastrophic forgetting only affects attention layers, not feedforward blocks.",
   "Fine-tuning inherently prevents forgetting via its lower learning rate.",
   "Forgetting is irrelevant if the robot only ever needs the fine-tuned task.",
   "Gradient updates for the new task overwrite weights encoding previous capabilities, destroying general knowledge from pretraining."],
  3,"Weight updates for new task overwrite general knowledge.",
  "Neural networks have no explicit memory separation; updating weights for task B degrades task A performance in proportion to gradient overlap.",
  "LoRA, adapters, and EWC (Elastic Weight Consolidation) mitigate forgetting."),

q(2037,"Foundation Models","competitive","Research",30,
  "How does Low-Rank Adaptation (LoRA) enable parameter-efficient fine-tuning?",
  ["LoRA freezes all weights and adds a separate small network per task.",
   "LoRA quantises weights to INT4 to reduce memory during fine-tuning.",
   "LoRA applies gradient checkpointing to reduce peak memory consumption.",
   "LoRA constrains weight updates to a low-rank factorisation ΔW=A·B (r≪d,k), reducing trainable parameters drastically."],
  3,"Low-rank decomposition of weight updates.",
  "Instead of updating the full d×k weight matrix, LoRA trains A (d×r) and B (r×k) with r≪min(d,k); typical r=4-64 reduces params 100-1000×.",
  "RT-2 and Octo use LoRA to adapt foundation models to new robot embodiments quickly."),

q(2038,"Foundation Models","competitive","Research",30,
  "Why does tokenising robot actions in VLA models create a tension with vocabulary size?",
  ["Tokenisation improves precision because discrete tokens represent arbitrary values.",
   "The tension only applies to joint-space actions, not Cartesian actions.",
   "Larger vocabularies always improve performance by increasing resolution.",
   "Finer discretisation of continuous actions requires exponentially larger vocabularies that stress the output head and increase model size."],
  3,"Finer discretisation → exponentially larger vocabulary.",
  "6-DOF actions at 0.001 rad resolution requires 10⁶ tokens per DOF; coarser discretisation (256 bins) limits precision.",
  "Diffusion policy heads and flow-matching decoders generate continuous actions to avoid this tension."),

q(2039,"Foundation Models","competitive","Research",30,
  "What is the cross-embodiment generalisation problem and why is it challenging?",
  ["Cross-embodiment generalisation is straightforward because all robots share a joint-space representation.",
   "The problem is only about visual appearance differences between robot bodies.",
   "Cross-embodiment is solved entirely by using a universal language interface.",
   "Different robots have different morphologies, action spaces, and sensor modalities; a model trained on one embodiment may not transfer without retraining."],
  3,"Morphology + action-space heterogeneity prevents direct transfer.",
  "A policy trained on a 7-DOF arm cannot directly control a 6-DOF arm; action dimensions, ranges, and dynamics differ fundamentally.",
  "RT-X and Open-X Embodiment datasets aggregate multi-robot data to learn transferable representations."),

q(2040,"Foundation Models","competitive","Research",30,
  "How does the emergent ability phenomenon complicate capability prediction from scaling laws?",
  ["Emergent abilities follow smooth power-law scaling and are easy to predict.",
   "Emergence occurs only in language tasks, not in robot action generation.",
   "Emergent abilities are artefacts of benchmark choice and disappear with better evaluation.",
   "Emergent abilities appear discontinuously at certain scale thresholds, making capability prediction from smaller models unreliable."],
  3,"Discontinuous capability jumps are unpredictable from smooth scaling laws.",
  "Tasks like arithmetic suddenly appear at certain FLOP budgets; no extrapolation from smaller models predicts the threshold.",
  "This makes it hard to predict when robot VLAs will acquire qualitatively new capabilities."),

q(2041,"Foundation Models","competitive","Research",30,
  "How does retrieval-augmented generation (RAG) benefit robot knowledge grounding?",
  ["RAG is faster than pure parametric models because it reduces attention layers.",
   "RAG eliminates hallucination entirely by grounding responses in retrieved facts.",
   "Pure parametric models are always more accurate because they have more parameters.",
   "RAG retrieves relevant external documents at query time, enabling up-to-date scene-specific knowledge without retraining the base model."],
  3,"Dynamic retrieval enables up-to-date scene-specific grounding.",
  "Parametric knowledge is static post-training; RAG queries a knowledge base (environment maps, task manuals) at runtime.",
  "Robot task planners use RAG to retrieve object affordances and workspace geometry."),

q(2042,"Foundation Models","competitive","Research",30,
  "What is the world model bottleneck hypothesis and how does latent video prediction address it?",
  ["The bottleneck hypothesis claims model size is the primary limit on performance.",
   "Latent video prediction is used only for data augmentation, not planning.",
   "The world model bottleneck is resolved by using larger language models as planners.",
   "The hypothesis states that robust robot behaviour requires internal predictions of future states; latent video models learn compact world representations."],
  3,"Planning requires future state prediction; latent video models provide it.",
  "Without a world model robots cannot simulate action consequences; latent video models predict future observations in compressed latent space.",
  "Dreamer-V3 and SWIM use latent world models for sample-efficient robot control."),

q(2043,"Foundation Models","competitive","Research",30,
  "Why does physical consistency of foundation model outputs matter more for robotics than language generation?",
  ["Physical consistency matters equally for text generation and robot tasks.",
   "Foundation models naturally produce physically consistent outputs from physics simulation training.",
   "Physical consistency only matters for manipulation tasks, not navigation.",
   "Robot actions have real-world consequences; physically inconsistent outputs cause hardware damage or task failure, unlike text errors."],
  3,"Text errors are harmless; robot action errors cause physical consequences.",
  "An LLM hallucinating a date is benign; a VLA outputting a joint configuration exceeding hardware limits causes damage.",
  "Physical constraint layers, safety shields, and simulation-in-the-loop validation address this."),

q(2044,"Foundation Models","competitive","Research",30,
  "How does the concept of affordance bridge visual perception and robot action selection?",
  ["Affordances are learned only from language descriptions of object properties.",
   "Affordance models predict object positions but not required robot actions.",
   "Affordances are equivalent to object segmentation masks in modern vision systems.",
   "Affordances represent action possibilities of objects (graspability, pushability) that directly link what the robot perceives to what actions are feasible."],
  3,"Perception → action possibility mapping (Gibson ecological theory).",
  "Affordances are relational properties between objects and actor capabilities; VLA models that predict affordance maps before selecting actions generalise better.",
  "Visual affordance prediction is a key research direction in robot manipulation."),

q(2045,"Foundation Models","competitive","Research",30,
  "What is the alignment tax in RLHF-trained robot foundation models?",
  ["The alignment tax is the computational cost of running human preference labelling.",
   "It describes the reduction in inference speed due to safety filtering layers.",
   "Alignment tax is the increase in model size required to support RLHF training.",
   "Aligning to human preferences can reduce raw capability on benchmark tasks, representing a capability-safety tradeoff."],
  3,"Alignment may degrade raw capability: capability-safety tradeoff.",
  "InstructGPT showed slight perplexity degradation after RLHF; similarly safe robot policies may be less capable in edge-case scenarios.",
  "Understanding this tradeoff is critical for deploying foundation models in safety-critical robotics."),

// ── Aerial Robotics (2046-2060) ───────────────────────────
q(2046,"Aerial Robotics","competitive","Starter",20,
  "Why is a quadrotor considered underactuated and what coupling results?",
  ["Underactuation means the quadrotor has fewer motors than propeller blades.",
   "All multirotors are fully actuated because they can hover at any orientation.",
   "Underactuation decouples yaw from altitude control.",
   "It has 4 inputs controlling 6 DOF; thrust is always body-z aligned, coupling lateral motion to attitude changes."],
  3,"4 inputs for 6 DOF; thrust direction couples attitude and translation.",
  "The quadrotor cannot accelerate laterally without first tilting; position control is achieved via an inner attitude loop.",
  "Tilt-rotor and omnidirectional multirotors address underactuation with additional actuation."),

q(2047,"Aerial Robotics","competitive","Starter",20,
  "What is differential flatness of a quadrotor and how does it simplify trajectory generation?",
  ["Differential flatness means the quadrotor can fly any trajectory without attitude changes.",
   "It implies the quadrotor dynamics are linear and time-invariant.",
   "Differential flatness is a property only of fixed-wing aircraft.",
   "A quadrotor is differentially flat with outputs [x,y,z,ψ]; any smooth trajectory in this 4D space uniquely determines all states and inputs."],
  3,"Flat outputs determine full state and inputs algebraically.",
  "Given x(t),ẋ(t),ẍ(t), and ψ(t), all states and inputs can be computed algebraically; planning in flat space avoids dynamics simulation.",
  "Minimum-snap trajectory generation exploits flatness for smooth dynamically feasible paths."),

q(2048,"Aerial Robotics","competitive","Starter",20,
  "Why is the cascaded control architecture standard for multirotor UAVs?",
  ["The cascade guarantees optimal control by decomposing the nonlinear problem into linear subproblems.",
   "It minimises the number of sensors needed for stable flight.",
   "The cascaded structure is required only for fixed-wing aircraft.",
   "It exploits timescale separation: inner loops (fast attitude) stabilise before outer loops (slow position) issue new references."],
  3,"Timescale separation enables stable nested loops.",
  "Attitude dynamics (ωₙ~10-30 Hz) are faster than position dynamics (ωₙ~1-5 Hz); the inner loop is effectively static for the outer loop.",
  "This architecture is implemented in PX4, ArduPilot, and Betaflight."),

q(2049,"Aerial Robotics","competitive","Starter",20,
  "What is the ground effect in UAV flight and how does it affect controller performance near landing?",
  ["Ground effect refers to electromagnetic interference from ground-based electronics.",
   "Ground effect causes rotors to stall completely below 1 m altitude.",
   "Ground effect decreases drag near the ground, requiring less thrust to hover.",
   "Ground effect increases rotor efficiency via air recirculation as the UAV approaches a surface, causing unexpected lift increase."],
  3,"Air recirculation near surface unexpectedly increases thrust.",
  "The boundary between ground effect and free-air hover creates a nonlinear thrust-altitude relationship not captured by standard hover controllers.",
  "Landing controllers must account for the ground effect altitude-thrust coupling."),

q(2050,"Aerial Robotics","competitive","Starter",20,
  "What is motor mixing in a multirotor autopilot?",
  ["Mapping camera images into rotor-efficiency estimates.",
   "Mapping battery temperature into GPS altitude corrections.",
   "Mapping altitude setpoints into sensor covariance matrices.",
   "Mapping desired thrust and body torques into individual rotor commands according to frame geometry."],
  3,"Control allocation: desired wrench → individual rotor commands.",
  "Motor mixing converts collective and attitude demands into motor-level signals based on the rotor arrangement and spin directions.",
  "Every multirotor controller uses a motor mixing strategy."),

q(2051,"Aerial Robotics","competitive","Research",30,
  "How does minimum-snap trajectory optimisation guarantee dynamically feasible quadrotor trajectories?",
  ["Minimum-snap minimises thrust by constraining the trajectory to constant altitude.",
   "Feasibility is guaranteed by adding collision avoidance constraints to the QP.",
   "Minimum-snap generates trajectories in joint space and converts to Cartesian via FK.",
   "By leveraging differential flatness, it minimises the 4th derivative (snap) of flat outputs as a surrogate for input cost; results are directly feasible."],
  3,"Flatness + snap minimisation → feasible polynomial trajectories.",
  "The trajectory is piecewise polynomial in flat outputs; minimising the integral of snap² ensures thrust and torques are bounded.",
  "Mellinger and Kumar (2011) introduced this formulation; it remains standard in UAV planning."),

q(2052,"Aerial Robotics","competitive","Research",30,
  "Why do aggressive maneuvers like flips require nonlinear geometric controllers?",
  ["Aggressive maneuvers require more PID terms, not a different architecture.",
   "Cascaded PID is capable of any maneuver with sufficiently high gains.",
   "Nonlinear controllers are only needed for hover, not aggressive flight.",
   "Cascaded PID relies on timescale separation which breaks down during large-attitude maneuvers where attitude and position dynamics are tightly coupled."],
  3,"Large-angle maneuvers violate timescale separation.",
  "During a full flip the quadrotor operates far from hover equilibrium; the linearisation assumed by cascaded PID is invalid.",
  "Geometric controllers on SE(3) handle arbitrary attitudes without singularities."),

q(2053,"Aerial Robotics","competitive","Research",30,
  "How does the geometric attitude controller on SO(3) avoid singularities?",
  ["Geometric controllers use Euler angles in a different more stable sequence.",
   "SO(3) controllers avoid singularities by limiting roll to ±90°.",
   "Geometric controllers eliminate attitude tracking by working only in position space.",
   "It defines errors directly on the rotation manifold using the Lie algebra, avoiding gimbal lock and Euler singularities."],
  3,"Errors on SO(3) manifold are globally defined without singularities.",
  "Error rotation: Rₑ=Rᵈ^T·R; angular velocity error: ωₑ=ω−R^T·Rᵈ·ωᵈ; defined for all R∈SO(3) without coordinate singularities.",
  "Lee Leok McClamroch (2010) geometric controller is standard for agile UAV research."),

q(2054,"Aerial Robotics","competitive","Research",30,
  "How does optical flow time-to-collision (τ) enable bio-inspired obstacle avoidance?",
  ["τ requires stereo depth; optical flow alone is insufficient for this.",
   "τ is computed from the gyroscope, not from camera optical flow.",
   "τ gives distance to obstacles, not time to collision.",
   "τ=s/ṡ directly gives time to contact from radial optical flow, allowing avoidance without computing absolute depth."],
  3,"Divergence of radial flow = inverse time-to-contact.",
  "s is angular size, ṡ its rate; τ=s/ṡ; bees and UAVs can react to τ thresholds without knowing absolute distances.",
  "Event cameras enable sub-millisecond τ computation for high-speed obstacle avoidance."),

q(2055,"Aerial Robotics","competitive","Research",30,
  "Why does L1 adaptive control provide robustness guarantees for UAV systems?",
  ["L1 adaptive control learns a PID gain schedule offline and applies it online.",
   "It provides robustness by increasing integral gain during disturbances.",
   "L1 control guarantees stability only for linear time-invariant UAV models.",
   "L1 uses a fast adaptation law to estimate and cancel matched uncertainties within a bandwidth defined by a low-pass filter, providing bounded tracking error."],
  3,"Fast adaptation + low-pass filter → bounded tracking with stability.",
  "L1 separates adaptation (fast) from control (filtered), avoiding the tradeoff between adaptation speed and stability present in MRAC.",
  "L1 adaptive control has been flight-tested for fixed-wing and quadrotor uncertainty rejection."),

q(2056,"Aerial Robotics","competitive","Research",30,
  "What advantage do event cameras provide for high-speed aerial robotics research?",
  ["They provide dense absolute depth at every pixel natively.",
   "They remove the need for inertial sensing during aggressive maneuvers.",
   "They guarantee perfect scene semantics at all frame rates.",
   "They offer high temporal resolution and large dynamic range, reacting to brightness changes with very low latency suited for fast flight."],
  3,"Asynchronous low-latency brightness change detection.",
  "Event cameras output microsecond-timestamped events rather than frames, capturing fast motion without motion blur.",
  "They appear prominently in agile-flight research for state estimation and obstacle avoidance."),

q(2057,"Aerial Robotics","competitive","Research",30,
  "Why is nonlinear MPC common in advanced UAV research papers?",
  ["It removes the need for any state estimate or model of the vehicle.",
   "It guarantees zero computation time on embedded hardware.",
   "It turns every underactuated UAV into a fully actuated system.",
   "It handles vehicle nonlinearities and constraints more explicitly than linear controllers designed for hover equilibrium."],
  3,"Nonlinear dynamics + constraints beyond hover linearisation.",
  "Aggressive flight and obstacle-rich motion require planners/controllers that reason with nonlinear dynamics directly.",
  "Research UAV stacks frequently use nonlinear MPC for constraint-aware trajectory tracking."),

q(2058,"Aerial Robotics","competitive","Research",30,
  "What limits ICP-based LiDAR odometry without a good initialisation?",
  ["ICP always converges to the global minimum regardless of initialisation.",
   "ICP requires initialisation only for 2D scans; 3D ICP is globally convergent.",
   "Without initialisation ICP takes more iterations but converges to the same result.",
   "Without a close initial guess ICP converges to a local minimum with incorrect correspondences, producing large pose error or divergence."],
  3,"Non-convex correspondence cost → local minima without close init.",
  "ICP alternates between nearest-neighbour correspondences and minimising their distance; distant initialisations cause incorrect correspondences.",
  "NDT and GICP are more robust alternatives used in UAV SLAM."),

q(2059,"Aerial Robotics","competitive","Research",30,
  "How does neural inertial navigation reduce drift compared to classical dead-reckoning?",
  ["Neural inertial navigation replaces the IMU with a camera for better accuracy.",
   "It integrates accelerometer data with higher precision via double-precision arithmetic.",
   "Neural inertial navigation is identical to classical dead-reckoning but runs on a GPU.",
   "Neural networks predict velocity or position directly from raw IMU windows, implicitly compensating for sensor biases and integration drift."],
  3,"Learned bias compensation reduces integration drift.",
  "Classical double-integration drift grows as t²; neural networks predict Δp directly from IMU windows, learning to cancel bias patterns.",
  "TLIO, RONIN, and AirIMU significantly reduce drift in GPS-denied UAV navigation."),

q(2060,"Aerial Robotics","competitive","Research",30,
  "How does perception-aware planning improve state estimation performance in UAV research?",
  ["Control actions are always independent of sensing quality in flight.",
   "Perception-aware planning means removing dynamics from the planner.",
   "Perception-aware planning only matters when GPS is perfectly available.",
   "By choosing trajectories that improve visual observability and feature quality, state-estimation accuracy is improved rather than ignored."],
  3,"Motion choices affect sensing quality and therefore estimation accuracy.",
  "The chosen path can improve or degrade visual observability and feature quality; perception-aware planners explicitly account for this coupling.",
  "This coupling between control and perception is a major UAV research topic."),

// ── Underwater Robotics (2061-2075) ───────────────────────
q(2061,"Underwater Robotics","competitive","Starter",20,
  "Why do Doppler Velocity Logs serve as the primary velocity reference for AUVs?",
  ["DVL is preferred for higher sampling rates than IMU-based estimation.",
   "DVL measures acceleration directly and is integrated like an IMU.",
   "DVL is used only when GPS is available to correct its readings.",
   "DVL measures velocity relative to the seafloor via Doppler shift, providing bounded velocity error; IMU integration accumulates unbounded drift."],
  3,"Bounded DVL velocity vs unbounded IMU drift.",
  "DVL Doppler measurement error is bounded by beam geometry and acoustic noise; double-integrating IMU acceleration has drift growing as t².",
  "AUV nav filters fuse DVL velocity with IMU attitude for accurate dead-reckoning."),

q(2062,"Underwater Robotics","competitive","Starter",20,
  "What is LBL acoustic positioning and why does it achieve higher accuracy than USBL?",
  ["LBL uses a single transducer on the surface; USBL uses multiple seabed nodes.",
   "USBL always achieves higher accuracy because it uses phase measurements.",
   "LBL and USBL provide identical accuracy at all operating depths.",
   "LBL triangulates position from multiple seabed transponders; the long baseline provides better geometric dilution of precision than USBL's single transducer."],
  3,"Multiple transponders → better geometry (lower GDOP).",
  "USBL: single head gives bearing+range from ship; accuracy degrades with depth. LBL: 3+ seabed transponders triangulate; accuracy is range-independent.",
  "Scientific AUV surveys use LBL for cm-level positioning."),

q(2063,"Underwater Robotics","competitive","Starter",20,
  "What makes acoustic multipath propagation degrade underwater communication?",
  ["Multipath improves range accuracy by averaging multiple signal arrivals.",
   "Multipath only occurs in shallow water and disappears below 100 m depth.",
   "Multipath affects optical sensors but not acoustic sensors underwater.",
   "Sound reflects off the seabed, surface, and thermal layers, arriving via multiple paths with different delays causing inter-symbol interference."],
  3,"Multiple reflections → delay spread and ISI.",
  "Each reflected path adds a delayed copy of the signal; in ranging, ghost echoes bias the range estimate.",
  "OFDM underwater modems and matched-filter equalizers mitigate multipath."),

q(2064,"Underwater Robotics","competitive","Starter",20,
  "Why is drag especially significant in underwater robot dynamics?",
  ["Drag is negligible underwater compared with aerial vehicles.",
   "Drag only affects sensors, not thruster-driven dynamics.",
   "Drag disappears once the vehicle is neutrally buoyant.",
   "Water is much denser than air, so drag and added-mass effects are central to underwater vehicle modelling."],
  3,"High fluid density makes drag dominant.",
  "AUV dynamics: M_RB·ẍ+M_A·ẍ_r+D(ẋ_r)·ẋ_r=τ; M_A is added mass and D is drag — both absent in aerial models.",
  "Controllers must account for these hydrodynamic effects for accurate trajectory tracking."),

q(2065,"Underwater Robotics","competitive","Starter",20,
  "What is one major challenge for underwater vision and how does it affect robot perception?",
  ["Images underwater are always sharper than in air due to water filtering.",
   "Underwater scenes remove the need for camera calibration entirely.",
   "Water guarantees constant illumination everywhere in the environment.",
   "Light scattering and absorption degrade image quality, reducing contrast, colour fidelity, and visibility."],
  3,"Scattering and absorption degrade optical sensing.",
  "Red channel attenuation, backscatter, and limited visibility make visual perception much harder.",
  "This affects detection, mapping, and visual odometry algorithms."),

q(2066,"Underwater Robotics","competitive","Research",30,
  "Why does terrain-relative navigation (TRN) provide better long-duration AUV accuracy than dead-reckoning?",
  ["TRN uses GPS corrections every hour to reset DVL drift.",
   "TRN works only in shallow water where sonar resolution is sufficient.",
   "TRN replaces the DVL entirely for long-duration missions.",
   "TRN correlates onboard sonar maps with pre-stored bathymetric databases, providing absolute position corrections that bound navigation error."],
  3,"Absolute map-matching corrections bound dead-reckoning drift over time.",
  "Dead-reckoning drift grows over time; TRN matches current depth/altitude maps to precomputed charts, providing absolute position fixes.",
  "MBARI SLAM-based TRN enables AUVs to resurvey exact previous tracks without GPS."),

q(2067,"Underwater Robotics","competitive","Research",30,
  "Why is the underwater acoustic channel fundamentally limited in bandwidth compared to RF?",
  ["The underwater channel supports higher bandwidth because water is denser.",
   "Acoustic underwater communication is unaffected by Doppler because sound travels slowly.",
   "The main challenge is attenuation; bandwidth and Doppler are not significant.",
   "Sound speed ~1500 m/s causes severe Doppler for moving AUVs and bandwidth is limited to a few kHz vs GHz for RF."],
  3,"Low sound speed → severe Doppler; limited bandwidth vs RF.",
  "Carrier frequency ~10 kHz limits bandwidth to ~5 kHz; 1 m/s AUV motion causes 6 Hz Doppler shift significant at these frequencies.",
  "MIMO-OFDM and Doppler-compensation equalizers address these challenges."),

q(2068,"Underwater Robotics","competitive","Research",30,
  "How does the Seaglider AUV buoyancy-driven propulsion achieve superior energy efficiency?",
  ["Buoyancy propulsion is more efficient because it uses lighter battery chemistry.",
   "Thruster AUVs are more efficient at low speed; gliders only at high speed.",
   "Buoyancy propulsion avoids drag entirely through the water column.",
   "Buoyancy engines control density by pumping oil; gliding at low speed requires only energy to pump oil, not to overcome drag at high power."],
  3,"Low-speed glide: P∝v³; oil pump energy is minimal.",
  "Thruster propulsion P∝v³; at low speed propulsive power is tiny; the energy cost is dominated by pumping buoyancy oil, enabling months-long missions.",
  "Seaglider endurance: >1 year; thruster AUV: hours to days."),

q(2069,"Underwater Robotics","competitive","Research",30,
  "Why is underwater SLAM still an active research area?",
  ["Underwater vehicles already have perfect global localisation from acoustics.",
   "Mapping is trivial underwater because scenes are completely static.",
   "SLAM is unnecessary once a depth sensor is installed on the vehicle.",
   "Vehicles must localise with noisy sparse environment-dependent sensing in GPS-denied conditions where standard methods degrade rapidly."],
  3,"GPS-denied + noisy sparse sensing + drift create ongoing challenges.",
  "Recent underwater SLAM literature emphasises that sensing is difficult, observability is limited, and drift accumulates quickly.",
  "Sonar- and vision-based SLAM remain important active research topics."),

q(2070,"Underwater Robotics","competitive","Research",30,
  "How does MPPI control offer advantages for AUV trajectory optimisation in dynamic ocean currents?",
  ["MPPI is preferred because it requires fewer samples than other sampling methods.",
   "MPPI provides global optimality guarantees for nonlinear AUV dynamics.",
   "MPPI replaces the AUV dynamic model with a learned neural network.",
   "MPPI uses parallel GPU sampling of many trajectory rollouts to approximate optimal control without gradient computation, handling non-smooth disturbances."],
  3,"Gradient-free GPU-parallel sampling handles non-smooth disturbances.",
  "Ocean current fields are non-differentiable and stochastic; MPPI samples K trajectories in parallel, evaluates costs, and computes a weighted control update.",
  "MPPI enables real-time AUV replanning in turbulent shallow-water currents."),

q(2071,"Underwater Robotics","competitive","Research",30,
  "What limits the spatial resolution of underwater acoustic cameras?",
  ["Acoustic cameras achieve higher resolution than optical cameras at all depths.",
   "Resolution is limited only by transducer array size, not acoustic wavelength.",
   "Acoustic cameras cannot form 2D images of underwater scenes.",
   "Acoustic wavelength at typical frequencies (100 kHz to 1 MHz) is mm-cm scale, limiting diffraction resolution vs micron scale for optics."],
  3,"λ=v/f limits diffraction: acoustic λ ≫ optical λ.",
  "At 1 MHz λ=1.5 mm; diffraction limit ≈λ·R/D; for R=2m, D=0.1m limit is ≈30 mm vs microns for optical.",
  "Acoustic cameras (BlueView) are used for close-range inspection where optical visibility fails."),

q(2072,"Underwater Robotics","competitive","Research",30,
  "How does cooperative AUV localisation improve accuracy beyond single-AUV dead-reckoning?",
  ["Cooperative localisation improves speed but not positioning accuracy.",
   "Cooperation requires all AUVs to surface simultaneously for GPS updates.",
   "Cooperative localisation only works if all AUVs start from the same known position.",
   "Peer-to-peer acoustic ranging between AUVs creates inter-vehicle constraints that reduce collective positioning uncertainty."],
  3,"Inter-AUV range constraints reduce collective positioning uncertainty.",
  "Each AUV position uncertainty contributes to others via acoustic ranging; with sufficient geometric diversity the collective uncertainty is lower.",
  "REMUS vehicles use cooperative acoustic positioning during coordinated surveys."),

q(2073,"Underwater Robotics","competitive","Research",30,
  "What makes underwater visual odometry more challenging than aerial or ground VO?",
  ["Underwater VO is easier because the robot moves slowly and features are stable.",
   "The main challenge is computational; underwater cameras have lower resolution.",
   "Underwater VO is identical to ground VO because water is optically similar to air.",
   "Backscatter, limited visibility, colour absorption, lack of texture, and dynamic marine life degrade standard VO pipelines."],
  3,"Backscatter + colour shift + low texture + dynamic scene degrade standard VO.",
  "Red channel exponential attenuation, backscatter, and low feature density all degrade standard VO algorithms.",
  "WaterSLAM and SeaThru use physics-based image formation models for underwater reconstruction."),

q(2074,"Underwater Robotics","competitive","Research",30,
  "Why does the constant-velocity model fail for AUV dynamics in ocean currents?",
  ["The constant-velocity model fails only in turbulent shallow water.",
   "It fails because AUVs always move at non-constant speed.",
   "A simpler single-integrator model is always preferred for real-time prediction.",
   "The constant-velocity model ignores hydrodynamic forces and currents; a 6-DOF maneuvering model with added mass and drag provides accurate prediction."],
  3,"6-DOF maneuvering model with hydrodynamics and current terms needed.",
  "AUV dynamics: M_RB·ẍ+M_A·ẍ_r+D(ẋ_r)·ẋ_r+g(η)=τ+τ_c; added mass M_A and drag D significantly affect trajectory prediction.",
  "System identification experiments in calm water estimate M_A and D for mission planning."),

q(2075,"Underwater Robotics","competitive","Research",30,
  "How does multi-sensor fusion address the limitations of individual underwater sensors?",
  ["Every underwater sensor provides the same failure-free information.",
   "Fusion removes the need for vehicle dynamics models in the filter.",
   "Fusion guarantees perfect loop closure at every timestep.",
   "No single underwater sensor is reliable enough across all conditions; fusing IMU, DVL, depth, sonar, and vision provides complementary coverage."],
  3,"Complementary sensing: each modality covers others' failure modes.",
  "IMU: high rate but drifts; DVL: bounded velocity but fails near boundaries; sonar: good range but limited resolution; fusion combines strengths.",
  "Robust AUV navigation depends on tightly coupled multi-sensor fusion."),

// ── Autonomous Driving (2076-2090) ────────────────────────
q(2076,"Autonomous Driving","competitive","Starter",20,
  "What information does an HD map contain beyond a standard road map?",
  ["Standard maps stored at higher resolution for more detailed display.",
   "Only GPS coordinates of road intersections and major landmarks.",
   "Real-time sensor data generated by the vehicle during operation.",
   "Centimetre-level lane geometry, road markings, signs, traffic light positions, and semantic attributes used for precise localisation and planning."],
  3,"Centimetre-level semantic geometry for localisation and planning.",
  "Standard maps: road network topology. HD maps: lane-level geometry (polylines), sign semantics, surface type, speed limits — used to localise to within 10 cm.",
  "Waymo, Cruise, and Mobileye maintain proprietary HD maps of operational domains."),

q(2077,"Autonomous Driving","competitive","Starter",20,
  "What is the bicycle model and why is it used in autonomous vehicle planning?",
  ["The bicycle model describes only two-wheeled vehicles; cars use a unicycle model.",
   "The bicycle model includes tyre slip dynamics for high-speed planning.",
   "It is used only for computing braking distances, not turning trajectories.",
   "The bicycle model approximates a 4-wheel vehicle as 2-wheel, relating steering angle to curvature for efficient path planning."],
  3,"2-wheel kinematic approximation: κ=tan(δ)/L.",
  "κ=tan(δ)/L (wheelbase L, steering angle δ); the bicycle model enables efficient trajectory planning at low speed.",
  "High-speed planning uses dynamic Pacejka tyre models that include slip effects."),

q(2078,"Autonomous Driving","competitive","Starter",20,
  "Why is sensor fusion widely used in self-driving systems?",
  ["A single sensor already dominates all conditions perfectly.",
   "Fusion removes the need for state estimation or calibration.",
   "Fusion guarantees zero-latency decisions in every operating scenario.",
   "Different sensors provide complementary strengths and failure modes; fusion improves robustness across all conditions."],
  3,"Complementary sensing: cameras, LiDAR, radar, IMU each cover others' weaknesses.",
  "Cameras excel at semantics; LiDAR at geometry; radar at velocity and adverse weather; GNSS at global position; IMU at high-rate attitude.",
  "No single sensor is reliable everywhere; fusion is essential for robust AV operation."),

q(2079,"Autonomous Driving","competitive","Starter",20,
  "Why is safety validation fundamentally hard in autonomous driving?",
  ["Traffic scenarios are simple and perfectly repetitive in practice.",
   "Validation needs only a few short closed-course tests to be sufficient.",
   "Simulation automatically proves correctness in all possible conditions.",
   "Rare edge cases and long-tail events cannot be exhaustively covered in testing."],
  3,"The long tail of rare safety-critical scenarios cannot be exhaustively tested.",
  "Driving systems must handle a vast distribution of scenarios; many rare events are safety-critical but statistically unlikely.",
  "Scenario generation, simulation, and formal methods are used to address the validation challenge."),

q(2080,"Autonomous Driving","competitive","Starter",20,
  "What is the key insight of the Frenet frame representation for trajectory planning?",
  ["Frenet coordinates are identical to Cartesian with a simple rotation applied.",
   "The Frenet frame only applies to perfectly straight road segments.",
   "Frenet coordinates eliminate the need for a reference path entirely.",
   "It decouples longitudinal progress (s) along a reference path from lateral deviation (d), reducing 2D planning to two 1D problems."],
  3,"s-d decomposition decouples longitudinal and lateral planning.",
  "In Frenet: s=arc length along reference, d=lateral offset; lane change and speed control decompose naturally into independent 1D optimisations.",
  "Most industry trajectory planners use Frenet-based parameterisations."),

q(2081,"Autonomous Driving","competitive","Research",30,
  "Why does distributional shift remain the fundamental unsolved challenge for AV perception?",
  ["Distributional shift is solved by training on large enough datasets.",
   "Perception failures are primarily caused by hardware faults, not distributional shift.",
   "Larger models always generalise better, solving the distributional shift problem.",
   "The long tail of rare scenarios cannot be exhaustively covered in training data, causing perception failures in novel conditions."],
  3,"Infinite long-tail scenarios cannot be exhaustively collected.",
  "The training distribution D_train≠D_deploy for all rare events; neural perception models have no mechanism to flag out-of-distribution inputs.",
  "Uncertainty quantification, active learning, and synthetic data generation address this partially."),

q(2082,"Autonomous Driving","competitive","Research",30,
  "How does BEV (bird-eye view) feature transformation improve 3D object detection?",
  ["BEV detection eliminates the need for depth estimation entirely.",
   "BEV features are simply perspective features rotated 90 degrees.",
   "BEV transformation requires LiDAR; cameras alone cannot produce BEV.",
   "BEV transforms perspective features to a top-down metric grid, providing a consistent geometric representation for detection and tracking."],
  3,"Metric top-down grid unifies geometry for 3D detection.",
  "Perspective images encode depth implicitly; BEV transformation (LSS depth distribution, BEVFormer cross-attention) lifts features to 3D and projects down.",
  "BEVFusion, BEVFormer, and VectorMapNet all operate in BEV space."),

q(2083,"Autonomous Driving","competitive","Research",30,
  "What is the behavioural cloning covariate shift problem and how does DAgger address it?",
  ["Covariate shift means the input distribution shifts due to camera exposure differences.",
   "DAgger addresses shift by augmenting training data with random noise perturbations.",
   "Behavioural cloning has no covariate shift if demonstrations are diverse enough.",
   "At deployment the learner encounters novel states caused by its own errors; DAgger queries the expert on states visited by the learner policy."],
  3,"Learner visits novel states; DAgger iteratively collects data at learner states.",
  "BC trains on D_expert; at test, learner deviates to novel states causing compounding errors. DAgger: D_{i+1}=D_i∪{(s_learner,a_expert)}.",
  "NVIDIA DAVE and recent end-to-end driving systems use DAgger-inspired online learning."),

q(2084,"Autonomous Driving","competitive","Research",30,
  "Why do Transformer-based motion prediction models capture scene context better than LSTMs?",
  ["Transformer models are preferred only because they are generally larger.",
   "LSTMs capture longer temporal context; Transformers only model spatial context.",
   "Transformers predict deterministic trajectories; LSTMs predict multimodal distributions.",
   "Transformers model multi-agent interactions via self-attention across all agents simultaneously; LSTMs encode each agent independently."],
  3,"Global self-attention captures all pairwise agent interactions simultaneously.",
  "LSTM prediction: encode each agent history → decode future; Transformer: cross-attend between all agents, map polylines, and history → joint conditional prediction.",
  "MTR achieves state-of-the-art on Waymo Open Motion Dataset."),

q(2085,"Autonomous Driving","competitive","Research",30,
  "What is the fundamental limitation of the predict-then-plan paradigm in dense traffic?",
  ["The paradigm is limited only by prediction model accuracy.",
   "Prediction before planning is always suboptimal because planning improves prediction.",
   "The limitation is purely computational: joint prediction and planning is intractable.",
   "Prediction is performed independently of the ego vehicle's planned actions, missing the reactive coupling where other agents respond to ego behaviour."],
  3,"Prediction ignores ego-agent interaction; reactive coupling is missing.",
  "If ego plans to brake, other vehicles react differently than if it accelerates; predict-then-plan assumes fixed agent trajectories regardless of ego.",
  "Conditional prediction and game-theoretic planning (MPDM, DiMA) address this coupling."),

q(2086,"Autonomous Driving","competitive","Research",30,
  "How does the occupancy network representation outperform object-list detectors for unknown obstacles?",
  ["Occupancy networks are computationally cheaper for all scenarios.",
   "Object lists outperform occupancy networks when the object count is large.",
   "Occupancy networks require LiDAR; object lists work with cameras only.",
   "Occupancy networks model free/occupied space without class hypotheses, handling any obstacle including out-of-class objects not in the training set."],
  3,"Geometry without class hypothesis handles unknown objects.",
  "A fallen tree trunk is not detected by a class-specific detector; occupancy marks it as occupied space regardless.",
  "Tesla occupancy network and Waymo 3D occupancy predictions are state-of-the-art."),

q(2087,"Autonomous Driving","competitive","Research",30,
  "Why do contingency planning approaches improve safety in interactive driving?",
  ["Contingency planning is slower and provides no measurable safety benefit.",
   "Single-trajectory planners already account for uncertainty via safety margins.",
   "Contingency planning is equivalent to planning with worst-case trajectories.",
   "Contingency planners simultaneously optimise trajectories for different agent behaviour hypotheses, maintaining feasible fallbacks for each mode."],
  3,"Multiple hypothesis trees give feasible fallbacks for each agent mode.",
  "If another vehicle has 70% probability of yielding and 30% of not, a contingency planner maintains two trajectories; the vehicle commits only when uncertainty resolves.",
  "Risk-POMDP and contingent MPC formalise this for autonomous driving."),

q(2088,"Autonomous Driving","competitive","Research",30,
  "How does responsibility-sensitive safety (RSS) provide formal safety guarantees?",
  ["RSS guarantees zero probability of collision for any traffic scenario.",
   "RSS is a statistical method bounding collision probability to below 10⁻⁶ per mile.",
   "RSS replaces the planner with a formal verification algorithm.",
   "RSS defines physics-based rules for safe distances and right-of-way that provably prevent the ego vehicle from being the proximate cause of any collision."],
  3,"Physics-based rules provably prevent ego-at-fault collisions.",
  "RSS defines proper response: if an agent violates RSS invariants the ego follows a defined safety response; the proof shows this cannot lead to ego-fault collisions.",
  "Intel/Mobileye RSS is integrated into some ADAS systems as a safety supervisor layer."),

q(2089,"Autonomous Driving","competitive","Research",30,
  "Why is closed-loop evaluation emphasised over open-loop metrics in AV research?",
  ["Open-loop metrics fully determine safety and planning quality.",
   "Closed-loop evaluation removes the need for simulation entirely.",
   "Closed-loop evaluation only matters for low-speed parking tasks.",
   "Open-loop perception metrics do not capture full decision-feedback interaction quality; closed-loop evaluates the feedback loop where ego behaviour affects future observations."],
  3,"Behaviour affects future observations; closed loop captures this.",
  "Driving is an interactive sequential control problem; open-loop metrics like mAP miss how planning decisions affect the scenarios that subsequently arise.",
  "Modern driving challenges increasingly emphasise closed-loop assessment."),

q(2090,"Autonomous Driving","competitive","Research",30,
  "How does end-to-end driving research challenge traditional modular pipeline design?",
  ["It removes the need for any training data because driving is deterministic.",
   "It guarantees better interpretability than every modular system.",
   "End-to-end means the vehicle no longer needs any control outputs.",
   "It aims to learn planning behaviour directly from sensor inputs, avoiding compounding interface errors between hand-designed modules."],
  3,"Sensor-to-plan learning avoids modular interface errors.",
  "Modular pipelines suffer from error propagation across interfaces; end-to-end learning jointly optimises all components.",
  "Recent tutorials highlight both its promise and challenges for deployment."),

// ── Legged Locomotion (2091-2105) ─────────────────────────
q(2091,"Legged Locomotion","competitive","Starter",20,
  "What is the Zero Moment Point (ZMP) and how is it used for biped balance control?",
  ["ZMP is the point directly below the centre of mass regardless of motion.",
   "ZMP balance requires the robot to be completely stationary.",
   "ZMP equals the centre of pressure only for massless legs.",
   "ZMP is the point where the net moment of gravity and inertia forces has zero horizontal component; keeping ZMP inside the support polygon ensures stability."],
  3,"ZMP inside support polygon means dynamically stable.",
  "From Newton-Euler dynamics ZMP=(Σ(mᵢ·(rᵢ×(g−aᵢ))))_{xy}; if ZMP exits the support polygon the robot tips over.",
  "ASIMO and HRP use ZMP preview control for stable biped walking."),

q(2092,"Legged Locomotion","competitive","Starter",20,
  "What distinguishes a static gait from a dynamic gait in legged locomotion?",
  ["Static gaits require fewer legs; dynamic gaits require at least 6 legs.",
   "Dynamic gaits always move faster than static gaits at every speed.",
   "Static gaits are used only for quadrupeds; dynamic gaits for bipeds.",
   "Static: CoM projection stays inside the support polygon at all times; dynamic: CoM may leave the polygon with inertial forces maintaining balance."],
  3,"Support polygon containment: static vs inertia-assisted.",
  "Static: any instantaneous freeze is stable (hexapod tripod gait). Dynamic: momentary instability is tolerated using momentum (running, bounding, jumping).",
  "Boston Dynamics Spot uses dynamic gaits; deliberate industrial hexapods use static gaits."),

q(2093,"Legged Locomotion","competitive","Starter",20,
  "What is the spring-loaded inverted pendulum (SLIP) model and why is it used?",
  ["SLIP is a full 3D model including all leg joint dynamics.",
   "SLIP only applies to bipeds; quadrupeds use lateral-SLIP instead.",
   "SLIP models are used only for analysis, not controller design.",
   "SLIP models a runner as a point mass on a massless spring leg, capturing energy storage/return mechanics with a minimal 2-parameter model."],
  3,"Point mass + spring leg: energy exchange template for running.",
  "SLIP exhibits self-stable running solutions; real runners exploit leg compliance similarly.",
  "Atlas, Cassie, and MIT Cheetah controllers are anchored to SLIP dynamics via virtual compliance."),

q(2094,"Legged Locomotion","competitive","Starter",20,
  "What is the role of centroidal angular momentum in legged robot balance control?",
  ["Centroidal angular momentum is zero for all statically balanced postures.",
   "It is used only to compute ZMP for biped balance control.",
   "It is equivalent to the sum of all joint velocities in the chain.",
   "Centroidal angular momentum represents whole-body rotational momentum about the CoM; regulating it prevents undesired whole-body rotation during contact transitions."],
  3,"Whole-body rotational momentum about CoM must be regulated.",
  "During contact transition (foot lift) angular momentum can spin the body; momentum-aware controllers explicitly regulate L=Σ(Iᵢ·ωᵢ+rᵢ×mᵢ·vᵢ).",
  "Atlas whole-body controller explicitly minimises centroidal angular momentum rate."),

q(2095,"Legged Locomotion","competitive","Starter",20,
  "Why do legged robots require contact force distribution optimisation when multiple limbs are in contact?",
  ["Contact forces are uniquely determined by Newton laws for any number of contacts.",
   "Force distribution is only needed when more than 6 contact points exist.",
   "Legged robots avoid simultaneous multi-contact phases to simplify control.",
   "Multiple contacts create statically indeterminate force distributions; QP-based optimisation distributes forces satisfying friction cone and normal force constraints."],
  3,"Statically indeterminate: optimisation needed with friction/normal constraints.",
  "With n>6 contacts infinite force distributions satisfy Newton-Euler; QP-based distribution minimises joint torques subject to friction cones.",
  "Whole-body controllers for quadrupeds and humanoids solve force QPs at 1 kHz."),

q(2096,"Legged Locomotion","competitive","Research",30,
  "How does centroidal MPC enable real-time whole-body motion planning for quadrupeds?",
  ["Centroidal MPC solves full multibody dynamics in real time.",
   "The centroidal model is used only for offline trajectory design.",
   "Centroidal MPC directly commands joint torques without any inner-loop controller.",
   "Centroidal MPC plans CoM and contact force trajectories using a simplified 6-DOF centroidal model; a whole-body IK controller tracks the plan at joint level."],
  3,"Fast centroidal MPC + whole-body IK inner loop → hierarchical control.",
  "Centroidal model: 6 DOF (CoM translation + rotation); MPC horizon ~0.5 s at 100 Hz. WBC maps centroidal plan to joint torques.",
  "MIT Mini Cheetah and ANYmal use centroidal MPC for real-time gait planning."),

q(2097,"Legged Locomotion","competitive","Research",30,
  "Why does RL-based locomotion achieve better hardware robustness than model-based controllers?",
  ["RL is more robust because it uses larger neural networks.",
   "RL only outperforms model-based controllers on perfectly flat terrain.",
   "RL requires perfect state estimation; model-based controllers are more robust to noise.",
   "RL policies trained with domain randomisation are exposed to diverse dynamics, learning robust strategies that transfer better than controllers tuned for nominal parameters."],
  3,"Domain randomisation → robust generalisation.",
  "Randomising mass, friction, terrain, and actuator parameters; the RL policy learns to cope with all variations implicitly.",
  "ANYmal, Cassie, and MIT Cheetah achieved hardware transfer via RL plus domain randomisation."),

q(2098,"Legged Locomotion","competitive","Research",30,
  "What makes contact-implicit trajectory optimisation for legged locomotion computationally challenging?",
  ["Contact-implicit TO is simpler because it avoids discrete mode enumeration.",
   "Contact-implicit formulations always converge to the global optimum for periodic gaits.",
   "The main challenge is computing the inertia matrix at each timestep.",
   "Contact-implicit TO includes contact forces and mode sequences as optimisation variables, creating complementarity-constrained NLP with non-convex non-smooth structure."],
  3,"Complementarity constraints + mode combinatorics → non-smooth MINLP.",
  "Contact: fₙ≥0, d≥0, fₙ·d=0 (complementarity); mode sequences create combinatorial explosion; relaxations are needed.",
  "DIRTREL, CALIPSO, and MCIK address contact-implicit optimisation."),

q(2099,"Legged Locomotion","competitive","Research",30,
  "How does energy return in series elastic actuators improve legged locomotion efficiency?",
  ["SEA improves efficiency by reducing joint friction.",
   "Elastic actuators are more efficient only above 5 m/s.",
   "SEA reduces control bandwidth requirements, not energy consumption.",
   "The SEA elastic element stores impact energy during landing and releases it during push-off, reducing net electrical energy per step."],
  3,"Elastic energy storage-return reduces net electrical energy per step.",
  "In running, impact energy E_imp=F_max·δ/2; rigid actuators dissipate this as heat; SEA returns it to the system.",
  "ANYmal uses ANYdrive SEAs; their springs return ~20% of step energy."),

q(2100,"Legged Locomotion","competitive","Research",30,
  "What is the Raibert stepping controller's key insight for robust running?",
  ["The Raibert controller solves full SLIP dynamics online for each step.",
   "The controller requires a precomputed lookup table of all possible gait trajectories.",
   "The Raibert rule only applies to quadrupedal bounding gaits.",
   "Place the foot at the SLIP neutral point plus a correction proportional to CoM velocity error, centering the gait without explicit dynamics solving."],
  3,"Foot placement = neutral + velocity correction → passive gait centering.",
  "Neutral point: foot position where SLIP returns to initial conditions. Correction: Δx=k_v·(v−v*) reduces velocity error each step.",
  "BigDog and MIT Cheetah use Raibert-inspired stepping for robust running."),

q(2101,"Legged Locomotion","competitive","Research",30,
  "How does hybrid zero dynamics (HZD) enable provably stable bipedal walking?",
  ["Virtual constraints are physical springs embedded in the robot joints.",
   "HZD applies only to holonomically constrained systems.",
   "Virtual constraints directly specify joint angle references without feedback.",
   "Virtual constraints enforce output functions to zero via feedback, rendering invariant a lower-dimensional surface where periodic orbits can be stabilised."],
  3,"Feedback-enforced outputs=0 → invariant surface with stable periodic orbits.",
  "By choosing outputs y=h(q)=0 and enforcing via I/O linearisation, dynamics reduce to zero dynamics; stability of the hybrid orbit implies full-system stability.",
  "DURUS, RABBIT, and Cassie locomotion controllers use HZD-based gait design."),

q(2102,"Legged Locomotion","competitive","Research",30,
  "How does convex decomposition of friction cones enable real-time QP-based force control?",
  ["Convex decomposition simplifies kinematic models, not force control.",
   "The contact wrench cone is already convex and requires no decomposition.",
   "QP-based force control requires the full nonlinear friction cone.",
   "Linearising friction cones into polyhedral approximations converts the SOCP into a QP solvable at 1 kHz on embedded hardware."],
  3,"Polyhedral friction cone approximation converts SOCP to QP.",
  "True friction cone: ‖fₜ‖≤μ·fₙ (SOCP). Polyhedral approx: n linear inequalities per contact; QP solvers handle this in microseconds.",
  "MIT Cheetah, ANYmal, and Spot use linearised friction cone QPs for torque-controlled locomotion."),

q(2103,"Legged Locomotion","competitive","Research",30,
  "What limits model-based footstep planners on unstructured outdoor terrain?",
  ["Model-based planners always outperform learning-based ones on outdoor terrain.",
   "Learning-based footstep planners require full 3D maps unlike model-based ones.",
   "The limitation is computational; model-based planners are simply too slow.",
   "Model-based planners require accurate terrain models and dynamics parameters; learning-based approaches generalise to terrain outside the model scope."],
  3,"Model accuracy limits while learning generalises beyond model scope.",
  "Uneven terrain (mud, grass, rocks) creates contact dynamics outside rigid-body model scope; learned policies trained on diverse simulation terrain generalise via domain randomisation.",
  "Boston Dynamics Spot uses both model-based planning and learned terrain adaptation."),

q(2104,"Legged Locomotion","competitive","Research",30,
  "How does gait emergence in RL-trained legged locomotion differ from model-based gaits?",
  ["RL can only discover walking gaits; other gaits require explicit programming.",
   "Emergent RL gaits are always less efficient than analytically derived gaits.",
   "RL-discovered gaits are identical to analytically derived SLIP-based gaits.",
   "RL discovers gait patterns (trot, bound, gallop) as emergent solutions to the reward objective without being programmed; model-based gaits are explicitly specified."],
  3,"Reward optimisation → gait patterns emerging without explicit programming.",
  "Trained with energy efficiency and velocity rewards, RL policies spontaneously produce trot, bound, and gallop transitions at appropriate speeds.",
  "DeepMind and ETH Zurich RL controllers exhibit gait transitions not explicitly programmed."),

q(2105,"Legged Locomotion","competitive","Research",30,
  "What is the passivity-based control advantage for legged robots in uncertain contact?",
  ["Passivity-based control eliminates the need for any feedback sensor.",
   "Passive control is only stable for quasi-static walking gaits.",
   "Passivity guarantees stability only when contact is perfectly rigid.",
   "Passive systems have inherent stability for any passive environment; designing the robot as passive ensures stable interaction regardless of ground stiffness uncertainty."],
  3,"Passive robot + passive environment → stable interaction without contact model.",
  "If the robot is passive (V̇≤u^T·y) and the ground is passive, their interconnection is stable by passivity composition regardless of contact model uncertainty.",
  "Variable impedance controllers on Atlas and Valkyrie exploit passivity for robust contact."),

// ── Motion Planning (2106-2120) ───────────────────────────
q(2106,"Motion Planning","competitive","Starter",20,
  "What is completeness and why is probabilistic completeness weaker than resolution completeness?",
  ["Probabilistic completeness is stronger because it provides a probability guarantee.",
   "Resolution completeness applies only to grid-based planners.",
   "Both guarantee finding a path in finite time if one exists.",
   "Resolution complete: finds a path if one exists at the given discretisation; probabilistic complete: probability approaches 1 as samples→∞ but may not in finite time."],
  3,"Resolution: finite-time guarantee; probabilistic: asymptotic guarantee.",
  "Resolution-complete planners (A* on fine grid) find paths given fine enough discretisation. Probabilistically complete planners (RRT) will eventually find a path but without a finite-time guarantee.",
  "PRM* and RRT* are probabilistically complete and asymptotically optimal."),

q(2107,"Motion Planning","competitive","Starter",20,
  "Why does A* guarantee finding the optimal path when the heuristic is admissible?",
  ["A* is optimal only when the heuristic equals zero (Dijkstra algorithm).",
   "Admissible heuristics guarantee optimality only for grid-based graphs.",
   "A* finds the optimal path only if the heuristic is also consistent.",
   "An admissible heuristic never overestimates the true cost; A* expands nodes in order of f=g+h, guaranteeing the goal is first reached via minimum-cost path."],
  3,"h≤h* → A* expands the optimal path first.",
  "With admissible h, no overestimate biases the expansion order; the goal is first popped only when its true optimal cost g* is known.",
  "Euclidean distance is admissible for holonomic robots in obstacle-free space."),

q(2108,"Motion Planning","competitive","Starter",20,
  "What is the key computational advantage of RRT over grid-based planners for high-dimensional C-spaces?",
  ["RRT is faster because it uses a hash table instead of a priority queue.",
   "RRT avoids collision checking by assuming a convex environment.",
   "RRT is faster than A* only for low-dimensional problems below 3 DOF.",
   "RRT grows a tree by random sampling and nearest-neighbour extension, avoiding explicit discretisation of the high-dimensional C-space."],
  3,"Sampling avoids exponential grid size in high dimensions.",
  "A 10-DOF robot with 100 cells/joint needs 10¹⁰ nodes; RRT samples grow logarithmically with dimension, making it tractable for 7-DOF+ arms.",
  "RRT is standard for manipulation path planning in MoveIt! and OMPL."),

q(2109,"Motion Planning","competitive","Starter",20,
  "What asymptotic optimality property does RRT* provide compared to RRT?",
  ["RRT* finds the optimal path in finite time with a fixed number of samples.",
   "RRT* is asymptotically optimal only for holonomic systems.",
   "Asymptotic optimality of RRT* requires a consistent heuristic function.",
   "RRT* rewires the tree to maintain optimal paths; as samples→∞ the solution path converges to the optimal path."],
  3,"Rewiring → optimal path as samples→∞.",
  "RRT adds a node connecting to the nearest neighbour; RRT* additionally considers nearby nodes within a shrinking radius, rewiring if a shorter path exists.",
  "For manipulation, 10000 samples of RRT* often find near-optimal paths."),

q(2110,"Motion Planning","competitive","Starter",20,
  "Why is PRM preferred over RRT for multi-query planning scenarios?",
  ["PRM is faster than RRT for single-query planning in all environments.",
   "PRM avoids collision checking by sampling only valid configurations.",
   "PRM guarantees finding the globally shortest path in all cases.",
   "PRM builds a graph of sampled configurations once; multiple queries are answered by connecting start/goal to the graph, amortising construction cost."],
  3,"Precomputed roadmap amortises cost over multiple queries.",
  "RRT: one tree per query. PRM: build once, query many times; for an assembly robot with hundreds of pick-and-place queries PRM is much more efficient.",
  "Warehouse robots use PRMs precomputed for their static environment."),

q(2111,"Motion Planning","competitive","Research",30,
  "How does the narrow passage problem limit sampling-based planner performance?",
  ["Narrow passages are easily handled by linearly increasing sample count.",
   "The narrow passage problem only affects PRM, not RRT.",
   "Narrow passages are only problematic above 6 DOF.",
   "In narrow passages uniform random sampling rarely generates valid samples inside, requiring exponentially more samples or specialised samplers."],
  3,"Uniform sampling underrepresents narrow passages → exponential sample count.",
  "Probability of sampling in passage of measure ε: ε/V≈0. Bridge sampling, Gaussian sampling, and obstacle-based samplers bias toward narrow regions.",
  "OBPRM, Visibility-based PRM, and obstacle-based sampling address narrow passages."),

q(2112,"Motion Planning","competitive","Research",30,
  "What is kinodynamic planning and why do sampling-based methods require forward simulation?",
  ["Kinodynamic planning uses inverse kinematics to connect states directly.",
   "Forward simulation is only needed when the robot has more than 4 actuators.",
   "Kinodynamic constraints can always be converted to holonomic constraints.",
   "Kinodynamic planning respects velocity/acceleration bounds; connecting two states requires simulating differential equations forward rather than interpolation."],
  3,"Differential constraints require forward simulation to connect states.",
  "For a car steering constraint: ẏ/ẋ=tan(θ); connecting (x₁,y₁,θ₁) to (x₂,y₂,θ₂) in a straight line violates this; RRT simulates control inputs forward.",
  "SST*, kinodynamic RRT*, and trajectory optimisation solve kinodynamic planning."),

q(2113,"Motion Planning","competitive","Research",30,
  "How does BIT* improve upon RRT* in terms of convergence speed?",
  ["BIT* is faster by using a larger nearest-neighbour radius than RRT*.",
   "BIT* improves speed by reducing search space dimensionality.",
   "BIT* replaces random sampling with quasi-random Halton sequences.",
   "BIT* combines informed search (heuristic pruning) with batch implicit sampling, focusing samples on the region that can improve the current solution."],
  3,"Heuristic pruning + batch sampling focus computation on improving the current solution.",
  "BIT*: maintain an implicit RRT over batch samples; prune samples with f=g+h≥c_best; process remaining edges in cost order combining A* pruning with RRT* rewiring.",
  "BIT* achieves RRT* quality with 10-100× fewer vertex expansions on typical problems."),

q(2114,"Motion Planning","competitive","Research",30,
  "Why does trajectory optimisation tend to produce locally optimal solutions?",
  ["Trajectory optimisation always finds global optima if the problem is smooth.",
   "Local optima only occur in non-holonomic systems.",
   "Trajectory optimisation with obstacle constraints is always convex.",
   "Trajectory optimisation solves a non-convex NLP with multiple local minima; gradient-based methods converge to the nearest local minimum from the initial trajectory."],
  3,"Non-convex NLP: local convergence depends on initialisation.",
  "Obstacle avoidance creates non-convex constraints; smooth gradient-based methods (STOMP, TrajOpt, GPMP2) cannot escape local minima.",
  "Combining sampling-based initialisation with trajectory optimisation provides both feasibility and local quality."),

q(2115,"Motion Planning","competitive","Research",30,
  "What is a signed distance field (SDF) and why is it preferred for collision avoidance in trajectory optimisation?",
  ["SDF is preferred because it requires less memory than mesh representations.",
   "SDF cannot accurately represent concave obstacles.",
   "SDF is used only for 2D environments; meshes are required for 3D planning.",
   "SDF stores the signed distance to the nearest obstacle at every grid point; smooth gradients enable differentiable collision avoidance without explicit contact computation."],
  3,"Smooth distance function → differentiable collision avoidance everywhere.",
  "SDF(x)=±dist(x,surface); gradient of SDF points away from the nearest obstacle; trajectory optimisers use this as a smooth collision cost.",
  "TrajOpt, GPMP2, and CHOMP use SDF-based collision costs for arm trajectory optimisation."),

q(2116,"Motion Planning","competitive","Research",30,
  "How does CHOMP functional gradient differ from standard parameter optimisation?",
  ["CHOMP optimises only endpoint positions, not the full trajectory.",
   "CHOMP is a sampling-based method evaluating trajectory cost by simulation.",
   "CHOMP uses L2 norm of joint torques as its objective function.",
   "CHOMP minimises a combination of obstacle cost and trajectory smoothness via functional gradient descent on the space of trajectories."],
  3,"Functional gradient descent on trajectory space combines obstacle + smoothness costs.",
  "Objective: U[q]=∫[A_obs(q(t))+(1/2)‖q̇‖²]dt; functional gradient δU/δq gives the descent direction in trajectory space.",
  "CHOMP and GPMP2 produce smooth collision-free trajectories for 7-DOF manipulation."),

q(2117,"Motion Planning","competitive","Research",30,
  "What is the key insight of the informed RRT* algorithm?",
  ["Informed RRT* uses the heuristic to sort existing nodes to rewire first.",
   "It restricts sampling to the convex hull of the current path.",
   "Informed sampling applies only after the first solution is found.",
   "It samples only from the prolate hyperspheroid containing all configurations that could improve the current solution."],
  3,"Ellipsoidal subset of improving solutions focuses sampling.",
  "The set of states that can improve a path of cost c* is the prolate hyperspheroid {x:d(x_start,x)+d(x,x_goal)≤c*}; sampling only this region wastes no samples.",
  "Informed RRT* converges to optimum 10-100× faster than RRT* on typical benchmarks."),

q(2118,"Motion Planning","competitive","Research",30,
  "How does Gaussian process motion planning (GPMP) unify probabilistic inference with trajectory optimisation?",
  ["GPMP uses GPs only for environment modelling, not trajectory parameterisation.",
   "GPMP is a sampling-based method drawing trajectory samples from a GP.",
   "The GP prior encodes the robot dynamics model exactly.",
   "GPMP models the trajectory as a sample from a GP prior then uses factor graph inference to find the MAP trajectory minimising obstacle cost."],
  3,"GP trajectory prior + factor graph MAP inference = probabilistic trajectory optimisation.",
  "GP prior penalises kinodynamic violations; obstacle factors penalise collisions; MAP inference via factor graphs solves the joint problem efficiently.",
  "GPMP2 achieves real-time arm trajectory planning with uncertainty-aware collision avoidance."),

q(2119,"Motion Planning","competitive","Research",30,
  "Why does topological path diversity matter for robust robot manipulation planning?",
  ["All paths between the same endpoints are topologically identical.",
   "Topological path classes only matter for 2D navigation, not 3D manipulation.",
   "Different homotopy classes are equivalent in path length.",
   "Different homotopy classes represent qualitatively different obstacle avoidance strategies; maintaining solutions in multiple classes enables immediate fallback."],
  3,"Different homotopy classes give different avoidance strategies as fallbacks.",
  "If a robot's primary path (left of obstacle) becomes blocked, a pre-computed solution in a different homotopy class (right of obstacle) enables immediate fallback.",
  "Homotopy-aware PRM and topological mapping maintain diverse path options."),

q(2120,"Motion Planning","competitive","Research",30,
  "How does the cell decomposition approach differ from sampling-based methods in completeness?",
  ["Cell decomposition provides probabilistic completeness; sampling provides exact completeness.",
   "Cell decomposition is incomplete because cells cannot represent narrow passages.",
   "Cell decomposition requires sampling to fill each cell with valid configurations.",
   "Exact cell decomposition provides resolution completeness by explicitly representing free space; approximate decomposition provides completeness at the grid scale."],
  3,"Exact decomposition explicitly represents free space → resolution completeness.",
  "Exact: decompose C_free into cells and compute connectivity graph — complete. Approximate: quantise to grid — complete at grid resolution.",
  "2D navigation stacks use occupancy grid decomposition with A* for global planning."),

// ── ROS2 (3001-3015) ──────────────────────────────────────
q(3001,"ROS2","competitive","Starter",20,
  "What DDS-based communication layer replaces the ROS1 rosmaster in ROS2?",
  ["ROS2 replaces the rosmaster with a centralised ROS2 broker process.",
   "ROS2 uses raw TCP sockets directly without any middleware abstraction.",
   "ROS2 retains rosmaster but upgrades it with multi-threading support.",
   "ROS2 uses DDS as the default middleware, eliminating the single-point-of-failure rosmaster for peer-to-peer discovery."],
  3,"DDS peer-to-peer discovery replaces centralised rosmaster.",
  "DDS provides automatic participant discovery via multicast; nodes communicate directly without a name server.",
  "Fast DDS, Cyclone DDS, and Connext are supported ROS2 DDS implementations."),

q(3002,"ROS2","competitive","Starter",20,
  "What is a ROS2 lifecycle node and what states does it define?",
  ["A lifecycle node is a standard node that automatically restarts on crash.",
   "Lifecycle nodes run only on real-time operating systems.",
   "A lifecycle node replaces the action server interface in ROS2.",
   "A lifecycle node has configurable states (Unconfigured, Inactive, Active, Finalized) allowing coordinated startup and shutdown of robot subsystems."],
  3,"Configurable state machine for coordinated node lifecycle management.",
  "Transition callbacks (on_configure, on_activate, on_deactivate, on_cleanup) allow fine-grained control over resource acquisition.",
  "Robot bringup sequences use lifecycle nodes to enforce dependency ordering."),

q(3003,"ROS2","competitive","Starter",20,
  "How do ROS2 Quality of Service (QoS) profiles differ from ROS1 message passing?",
  ["ROS2 QoS only affects service calls, not topic publishing.",
   "ROS1 supported QoS settings via launch file parameters.",
   "QoS settings in ROS2 are only relevant for action servers.",
   "ROS2 QoS allows specifying reliability (best-effort vs reliable), durability (volatile vs transient-local), and deadline per topic; ROS1 offers no such per-topic control."],
  3,"Per-topic QoS: reliability, durability, deadline, liveliness.",
  "Transient-local durability allows late-joining subscribers to receive the last N messages; best-effort suits sensor streams; reliable suits commands.",
  "Sensor QoS preset is best-effort volatile; system default is reliable volatile."),

q(3004,"ROS2","competitive","Starter",20,
  "What is the role of the ROS2 executor and how does SingleThreadedExecutor differ from MultiThreadedExecutor?",
  ["SingleThreadedExecutor uses multiple processes; MultiThreadedExecutor uses a single process.",
   "The executor is only needed for action servers, not regular topics.",
   "MultiThreadedExecutor requires manual mutex management by the user for all data.",
   "The executor schedules callbacks for nodes; SingleThreadedExecutor runs all callbacks sequentially; MultiThreadedExecutor runs them in a thread pool."],
  3,"Executor schedules callbacks; single vs multi-thread parallelism.",
  "For sensor fusion nodes with independent callbacks at different rates, a MultiThreadedExecutor prevents slow callbacks from blocking fast ones.",
  "StaticSingleThreadedExecutor pre-analyses the callback graph for improved real-time behaviour."),

q(3005,"ROS2","competitive","Starter",20,
  "What is the colcon build tool and why does it replace catkin in ROS2?",
  ["colcon replaces catkin because it is written in Rust for faster compilation.",
   "catkin is still used in ROS2; colcon is only for non-ROS packages.",
   "colcon eliminates the need for CMakeLists.txt files entirely.",
   "colcon is a generic build tool that orchestrates CMake, Python setuptools, and other build systems across packages without ROS-specific dependencies."],
  3,"Generic multi-build-system orchestrator replaces catkin.",
  "catkin required packages to use catkin_package macros and catkin-specific CMake; colcon works with any build system, making ROS2 packages more portable.",
  "colcon test integrates CTest and pytest for unified ROS2 package testing."),

q(3006,"ROS2","competitive","Research",30,
  "Why does ROS2 real-time performance require additional OS configuration beyond the default install?",
  ["ROS2 automatically configures real-time settings on supported hardware.",
   "Real-time performance in ROS2 requires only increasing executor thread priority.",
   "The DDS layer provides nanosecond-level determinism without any OS changes.",
   "DDS middleware and the Linux scheduler are not preemptive by default; PREEMPT_RT kernel patches, mlockall, and CPU isolation are needed for deterministic latency."],
  3,"PREEMPT_RT + mlockall + CPU isolation needed for determinism.",
  "Default Linux scheduling introduces jitter >1 ms; PREEMPT_RT reduces this to <100 µs; mlockall prevents page fault jitter; CPU isolation prevents scheduler interference.",
  "ros2_realtime_examples demonstrates the full stack required for real-time ROS2 control."),

q(3007,"ROS2","competitive","Research",30,
  "How do ROS2 parameters differ architecturally from the ROS1 parameter server?",
  ["ROS2 parameters are global like ROS1 but stored in a distributed database.",
   "ROS2 parameters require restart to take effect; ROS1 parameters updated live.",
   "ROS2 parameter server is distributed across multiple discovery nodes.",
   "ROS2 parameters are node-local with type enforcement and callback notification; ROS1 used a global parameter server accessible without node context."],
  3,"Node-local typed parameters with change callbacks vs global untyped server.",
  "ROS2: each node owns its parameters declared with type; get/set via parameter client; on_set_parameters_callback notifies node of changes.",
  "Dynamic parameter reconfiguration in ROS2 replaces dynamic_reconfigure from ROS1."),

q(3008,"ROS2","competitive","Research",30,
  "What guarantees does the ROS2 action interface provide over a simple service call?",
  ["Actions are faster than services for all computation lengths.",
   "Actions eliminate the need for a feedback topic by embedding it in the response.",
   "Actions are synchronous while services are asynchronous.",
   "Actions provide goal acceptance/rejection, periodic feedback during execution, and preemptable cancellation; services are fire-and-forget without feedback."],
  3,"Goal management, feedback streaming, and cancellation for long tasks.",
  "Service: request/response; Action: send_goal→accepted/rejected→feedback*→result; the client can cancel mid-execution.",
  "Navigation2 uses ROS2 actions for navigate_to_pose with continuous pose feedback."),

q(3009,"ROS2","competitive","Research",30,
  "Why does the ROS2 launch system use Python instead of XML like ROS1?",
  ["Python launch files are faster to parse than XML.",
   "XML launch files are still supported and preferred in ROS2 for simplicity.",
   "Python was chosen because it eliminates the need for xacro preprocessing.",
   "Python launch files allow programmatic conditionals, loops, and variable substitution enabling complex multi-robot and conditional startup logic impossible in static XML."],
  3,"Programmatic launch logic: conditionals, loops, and dynamic substitution.",
  "ROS1 roslaunch XML required xacro hacks for conditionals; ROS2 launch.py allows arbitrary Python logic for sophisticated bringup sequences.",
  "Multi-robot namespacing, hardware-in-the-loop vs simulation switching, and parameter generation all benefit from Python launch."),

q(3010,"ROS2","competitive","Research",30,
  "What is the ROS2 Component concept and how does it improve runtime efficiency?",
  ["Components are multi-process nodes with shared disk storage.",
   "Components eliminate the need for the DDS middleware layer.",
   "Components are only available for sensor driver nodes, not algorithm nodes.",
   "Components are compiled as shared libraries and can be loaded into a single process, sharing memory and avoiding IPC serialisation overhead between co-located nodes."],
  3,"Intra-process shared memory avoids IPC serialisation for co-located nodes.",
  "Separate node processes communicate via DDS serialise/deserialise; components in one container use zero-copy intra-process communication.",
  "Image processing pipelines (camera→rectify→detect) use components for zero-copy intra-process image passing."),

q(3011,"ROS2","competitive","Research",30,
  "How do ros2 node info and ros2 topic support debugging of a running ROS2 system?",
  ["ros2 node info only displays process IDs, not topic connections.",
   "These tools require the node source code to be available.",
   "ros2 topic hz measures latency, not publish rate.",
   "ros2 node info lists publishers/subscribers/services/actions per node; ros2 topic echo streams messages; ros2 topic hz measures publish rate."],
  3,"Node info + topic echo + hz enables data-flow debugging at runtime.",
  "These CLI tools query DDS participant and topic information live; essential for verifying all expected connections are active and rates are correct.",
  "ros2 doctor runs a system health check identifying missing DDS configurations."),

q(3012,"ROS2","competitive","Research",30,
  "Why does ROS2 use strongly typed messages via IDL and what advantage does this provide?",
  ["ROS2 messages are dynamically typed at runtime for maximum flexibility.",
   "IDL is only used for action goals and results, not standard topics.",
   "Strongly typed messages eliminate the need for serialisation entirely.",
   "IDL-generated message types are validated at compile time, enabling language-agnostic serialisation and integration with non-ROS DDS participants."],
  3,"Compile-time typed messages enable cross-language and cross-system DDS interoperability.",
  "ROS1 .msg files generated Python dicts and C++ structs only for ROS; ROS2 IDL generates code for any DDS-capable language.",
  "Industrial PLC systems can subscribe directly to ROS2 topics via native DDS."),

q(3013,"ROS2","competitive","Research",30,
  "What is the significance of a Long Term Support (LTS) ROS2 release for production deployments?",
  ["LTS releases include more features than standard releases.",
   "LTS releases are only supported on Ubuntu, not other Linux distributions.",
   "LTS means the release supports legacy ROS1 nodes via automatic translation.",
   "LTS releases receive 5 years of security and bug fixes, enabling production robot deployments without forcing frequent upgrades or recertification."],
  3,"5-year support window enables stable production deployments.",
  "Standard ROS2 releases are supported for ~1.5 years; LTS releases give 5 years enabling industrial robots with multi-year lifecycles to maintain security patches.",
  "ROSCon presentations highlight LTS as critical for medical and industrial robot certification."),

q(3014,"ROS2","competitive","Research",30,
  "How does the Nav2 behaviour tree framework extend ROS2 navigation beyond a single planner-controller loop?",
  ["Nav2 behaviour trees replace the need for a global planner entirely.",
   "Behaviour trees are used only for obstacle avoidance, not full navigation.",
   "Nav2 uses behaviour trees only during startup, not during active navigation.",
   "Behaviour trees compose complex multi-step navigation behaviours (recovery, replanning, subtask sequencing) with explicit failure handling that a flat loop cannot express."],
  3,"Behaviour trees enable composable multi-step navigation with failure recovery.",
  "BT nodes (Sequence, Fallback, Retry) compose planners, controllers, recovery behaviours, and conditions; failure of one branch triggers a defined recovery action.",
  "NavigateToPose BT includes ComputePathToPose→FollowPath→ClearCostmap recovery."),

q(3015,"ROS2","competitive","Research",30,
  "Why is micro-ROS needed for microcontroller integration and how does it bridge to the ROS2 graph?",
  ["micro-ROS runs full DDS natively on all microcontrollers with enough flash.",
   "micro-ROS is only for Raspberry Pi, not true microcontrollers.",
   "micro-ROS replaces the DDS layer with a proprietary lightweight protocol.",
   "micro-ROS runs a minimal ROS2 client library on MCUs and communicates with the full ROS2 graph via a micro-ROS Agent bridge using Micro XRCE-DDS."],
  3,"Minimal ROS2 client on MCU bridged via XRCE-DDS Agent to full graph.",
  "micro-ROS uses XRCE-DDS which compresses DDS for resource-constrained MCUs; the Agent on a Linux host translates to/from full DDS.",
  "Motor controllers, IMUs, and ADCs on STM32 publish directly to the ROS2 topic graph via micro-ROS."),

// ── Cloud Robotics (3016-3030) ────────────────────────────
q(3016,"Cloud Robotics","competitive","Starter",20,
  "Why does containerising a robot software stack with Docker improve deployment reproducibility?",
  ["Docker eliminates all network latency in robot communication.",
   "Containerised stacks run faster because of aggressive layer caching.",
   "Docker ensures the robot stack is always compiled with the latest library versions.",
   "Docker packages code, dependencies, and OS libraries into an immutable image ensuring identical execution across development, simulation, and production hardware."],
  3,"Immutable image = identical execution environment everywhere.",
  "Dependency drift, OS version mismatches, and library conflicts are eliminated by packaging everything into a versioned Docker image.",
  "Robot OEMs ship hardware with Docker images for field software updates."),

q(3017,"Cloud Robotics","competitive","Starter",20,
  "What is Kubernetes and why is it used for fleet robotics orchestration?",
  ["Kubernetes is a Docker alternative that eliminates the need for containers.",
   "Kubernetes is used only for web service backends, not robot systems.",
   "Kubernetes provides hardware drivers for robot peripherals.",
   "Kubernetes automates deployment, scaling, health monitoring, and rolling updates of containerised robot software across a fleet of heterogeneous compute nodes."],
  3,"Container orchestration: deploy, scale, and update fleet robot software automatically.",
  "K8s manages pods (robot software components), services (inter-pod networking), and deployments (rolling updates) across many robot compute nodes.",
  "Autonomous mobile robot fleets use K8s to push perception model updates without downtime."),

q(3018,"Cloud Robotics","competitive","Starter",20,
  "What is a digital twin and how does it benefit cloud-connected robot fleets?",
  ["A digital twin is a backup copy of the robot firmware stored in the cloud.",
   "Digital twins are used only during robot design, not during operation.",
   "A digital twin replaces the need for simulation during development.",
   "A digital twin is a real-time virtual replica of a physical robot synchronised with live sensor data, enabling remote monitoring and predictive maintenance."],
  3,"Real-time virtual replica enables monitoring and predictive maintenance.",
  "The physical robot streams state data to its cloud twin; anomaly detection on the twin predicts failure before it occurs on the physical platform.",
  "AWS RoboMaker and Azure Digital Twins provide cloud twin infrastructure for robot fleets."),

q(3019,"Cloud Robotics","competitive","Starter",20,
  "What distinguishes edge computing from cloud computing in a robot deployment context?",
  ["Edge computing is slower than cloud computing for all tasks.",
   "Cloud computing always provides lower latency than edge for real-time control.",
   "Edge and cloud computing are identical in robot deployment contexts.",
   "Edge computing processes data on or near the robot with low latency; cloud computing offloads heavier computation to remote servers with higher latency."],
  3,"Low-latency local processing vs high-latency remote offloading.",
  "Safety-critical control must run at the edge (<1 ms); computationally heavy tasks like global map building or model re-training can be offloaded to cloud.",
  "NVIDIA Jetson is the standard edge compute platform for robot perception."),

q(3020,"Cloud Robotics","competitive","Starter",20,
  "What is a CI/CD pipeline and why is it valuable for robot software development?",
  ["CI/CD is a project management methodology, not a software tool.",
   "CI/CD is only applicable to web backends, not safety-critical robot code.",
   "CI/CD requires the robot to be connected to the internet at all times.",
   "CI/CD automates building, testing, and deploying robot software on every code commit, reducing integration bugs and enabling rapid validated iterations."],
  3,"Automated build-test-deploy on every commit reduces integration bugs.",
  "Every push triggers unit tests, integration tests in simulation, static analysis, and if passing an OTA update package is staged.",
  "GitHub Actions, GitLab CI, and Jenkins orchestrate ROS2 CI/CD pipelines with Docker and Gazebo simulation stages."),

q(3021,"Cloud Robotics","competitive","Research",30,
  "How does OTA software update architecture manage rollback safety for deployed robot fleets?",
  ["OTA updates overwrite the active partition directly with no rollback mechanism.",
   "Rollback requires a hardware reset button press on each individual robot.",
   "A/B partitions are only used for firmware, not containerised software stacks.",
   "OTA systems use A/B partition schemes where the update is written to the inactive partition; the robot reverts to the previous partition if a health check fails."],
  3,"A/B partitions allow automatic revert on health-check failure.",
  "Boot from partition B; if startup health checks pass, mark B as primary; if they fail within a watchdog window, reboot to A automatically.",
  "Mender, SWUpdate, and custom Yocto layers implement A/B OTA for field robots."),

q(3022,"Cloud Robotics","competitive","Research",30,
  "Why does multi-robot fleet coordination benefit from centralised task allocation?",
  ["Decentralised allocation always outperforms centralised for large fleets.",
   "Centralised allocation introduces a single point of failure, acceptable only for small fleets.",
   "Centralised allocation eliminates all network communication between robots.",
   "A centralised service has a global view of all robot states and task queues, enabling globally optimal assignment that decentralised methods cannot achieve."],
  3,"Global view enables optimal assignment; decentralised suffers from local information.",
  "The Hungarian algorithm or MILP on a centralised server can minimise total fleet travel time; decentralised auction-based methods are suboptimal under contention.",
  "Amazon Robotics and Fetch Robotics use centralised fleet management servers."),

q(3023,"Cloud Robotics","competitive","Research",30,
  "What security challenge is unique to cloud-connected autonomous robots?",
  ["Cloud robots face the same threat model as smart thermostats.",
   "Security is irrelevant for autonomous robots in controlled environments.",
   "The main threat to cloud robots is data exfiltration, not command injection.",
   "Compromised cloud connections can inject malicious action commands that cause physical harm — not just data breaches unlike passive IoT sensors."],
  3,"Physical actuation expands the threat model beyond data breach to physical harm.",
  "A hacked thermostat changes temperature; a hacked robot arm executes a dangerous trajectory; command signing, TLS mutual authentication, and air-gap policies address this.",
  "SROS2 uses DDS-Sec with PKI to authenticate and encrypt all inter-node communication."),

q(3024,"Cloud Robotics","competitive","Research",30,
  "How does Helm chart versioning manage complex ROS2 application deployments on Kubernetes?",
  ["Helm is a Docker alternative for robot software packaging.",
   "Helm charts only manage database deployments, not robot application stacks.",
   "Helm versioning is equivalent to git tagging and provides no additional benefit.",
   "Helm charts package all Kubernetes manifests with versioned values, enabling reproducible upgrades and rollbacks of complex robot software."],
  3,"Packaged manifests with versioned values enable reproducible deploy and rollback.",
  "A single helm upgrade upgrades all interdependent pods atomically; helm rollback reverts all resources to the previous release version.",
  "Fleet deployments of map servers, mission planners, and perception stacks use Helm charts for reproducible updates."),

q(3025,"Cloud Robotics","competitive","Research",30,
  "Why do multi-robot systems benefit from a shared cloud map?",
  ["Independent maps are always more accurate because they avoid inter-robot data conflicts.",
   "A shared cloud map requires all robots to stop moving during map merging.",
   "Shared maps are only useful for 2D occupancy grids, not 3D representations.",
   "A shared cloud map aggregates observations from all robots, improving coverage speed and providing loop closure between robots."],
  3,"Aggregated multi-robot observations improve coverage and enable inter-robot loop closure.",
  "A single robot SLAM accumulates drift; when robot A and B observe the same area their relative constraint corrects both trajectories simultaneously.",
  "AWS RoboMaker and Cogniteam Nimbus provide cloud map sharing for AMR fleets."),

q(3026,"Cloud Robotics","competitive","Research",30,
  "What is serverless computing and how can it reduce cost for intermittent robot cloud workloads?",
  ["Serverless computing provides faster inference than dedicated GPU servers.",
   "Serverless platforms cannot run containerised robot software at all.",
   "Serverless eliminates the need for edge compute on the robot entirely.",
   "Serverless platforms provision compute on demand, billing per invocation; robot workloads like log analytics avoid paying for idle servers."],
  3,"Pay-per-invocation avoids idle server cost for bursty workloads.",
  "A fleet of 100 robots generates bursts of map update requests; serverless scales from 0 to 1000 concurrent instances in seconds and costs nothing when idle.",
  "RoboMaker uses Lambda for stateless simulation orchestration and log processing."),

q(3027,"Cloud Robotics","competitive","Research",30,
  "How does semantic versioning of robot software components help prevent deployment failures?",
  ["Semantic versioning is a naming convention without any technical enforcement.",
   "Patch version changes can include breaking API changes in robot software.",
   "Semantic versioning is only relevant for open-source robot packages.",
   "Major.Minor.Patch versioning communicates API compatibility; bumping major signals breaking changes, allowing fleet managers to stage upgrades safely."],
  3,"Major version signals breaking changes enabling staged compatible upgrades.",
  "If planning node v2.0.0 changes its action interface all robots must upgrade atomically; semantic versioning makes this explicit, enabling canary deployments.",
  "ROS2 package.xml version fields and Docker image tags enforce semantic versioning in CI/CD pipelines."),

q(3028,"Cloud Robotics","competitive","Research",30,
  "What is the key benefit of infrastructure-as-code (Terraform) for managing cloud robotics backends?",
  ["Terraform speeds up container builds by caching cloud layers.",
   "Infrastructure as code is only beneficial for large enterprise deployments.",
   "Terraform eliminates the need for CI/CD pipelines in robot development.",
   "Terraform declaratively describes all cloud resources in version-controlled files, enabling reproducible environment creation and audit trails."],
  3,"Declarative version-controlled infra enables reproducibility and audit trails.",
  "Manually created cloud resources are undocumented and hard to reproduce; Terraform files describe VPCs, compute instances, and databases as code.",
  "Robot simulation farms and telemetry pipelines use Terraform for repeatable cloud environments."),

q(3029,"Cloud Robotics","competitive","Research",30,
  "Why do robot telemetry time-series databases require different indexing than general SQL databases?",
  ["SQL databases are equally efficient for time-series data with proper indexing.",
   "Time-series databases cannot store structured telemetry data.",
   "SQL is preferred for robot telemetry when data rates are above 1 kHz.",
   "Time-series databases optimise writes and range queries by timestamp; robot sensor streams overwhelm row-insert throughput and index update overhead of SQL."],
  3,"Timestamp-optimised write and range query outperforms SQL for high-rate sensor streams.",
  "InfluxDB, TimescaleDB, and Apache Parquet columnar stores handle millions of points per second; SQL B-tree indexes are rewritten on every insert at high rates.",
  "Fleet telemetry platforms (Foxglove, Rerun) use time-series backends for robot log storage."),

q(3030,"Cloud Robotics","competitive","Research",30,
  "How does a feature store benefit machine learning pipelines in cloud robotics?",
  ["A feature store is equivalent to a model registry for trained weights.",
   "Feature stores are only used for natural language, not robot perception tasks.",
   "Feature stores eliminate the need for data preprocessing entirely.",
   "A feature store caches pre-computed features from robot deployments, enabling training and inference to share consistent features without redundant recomputation."],
  3,"Centralised cached features enable train-serve consistency and avoid redundant computation.",
  "Training and serving often recompute the same features independently causing training-serving skew; a feature store computes once and serves consistently.",
  "AWS SageMaker Feature Store and Tecton are used for robot perception model training pipelines."),

// ── Robot Communication (3031-3045) ──────────────────────
q(3031,"Robot Communication","competitive","Starter",20,
  "Why is CAN bus widely used for intra-robot communication in embedded actuator networks?",
  ["CAN is preferred because it supports Ethernet-like bandwidth of 1 Gbps.",
   "CAN eliminates the need for a dedicated clock signal.",
   "CAN is used because it supports wireless communication unlike SPI.",
   "CAN provides deterministic multi-master arbitration with error detection and differential signalling, making it robust to EMI in motor-heavy environments."],
  3,"Deterministic multi-master arbitration with error detection and EMI robustness.",
  "CAN CSMA/CD with bit-level arbitration guarantees the highest-priority message wins without collision; differential pair rejects common-mode noise from motor drivers.",
  "Brushless motor controllers, encoders, and IMUs on robot arms use CAN at 1 Mbit/s."),

q(3032,"Robot Communication","competitive","Starter",20,
  "What distinguishes EtherCAT from standard Ethernet for real-time robot control?",
  ["EtherCAT is wireless Ethernet optimised for robot environments.",
   "EtherCAT uses faster Ethernet hardware achieving 10 Gbps bandwidth.",
   "EtherCAT replaces the Ethernet physical layer with fibre optic cables.",
   "EtherCAT uses a processing-on-the-fly slave protocol where each device reads and writes its data as the frame passes through, giving cycle times of 100 µs."],
  3,"Processing-on-the-fly + distributed clocks → sub-100 µs deterministic cycles.",
  "Standard Ethernet is store-and-forward introducing variable latency; EtherCAT slaves modify a single frame as it propagates, giving fully deterministic cycle times.",
  "KUKA iiwa, Franka Panda, and Beckhoff motion controllers use EtherCAT."),

q(3033,"Robot Communication","competitive","Starter",20,
  "What is the key advantage of UDP over TCP for real-time robot sensor streaming?",
  ["UDP guarantees delivery like TCP but with lower per-packet overhead.",
   "TCP is always preferred for robot communication because it ensures reliability.",
   "UDP eliminates the need for IP addressing in local networks.",
   "UDP has no connection overhead, retransmission, or head-of-line blocking, ensuring low-latency delivery where a dropped packet is better than a delayed one."],
  3,"No retransmission or blocking: late data is worse than lost data for real-time control.",
  "A delayed motor command from TCP retransmission is more dangerous than a missed one; UDP drops bad packets and delivers the next fresh command.",
  "ROS2 DDS with best-effort QoS uses UDP transport for high-rate sensor topics."),

q(3034,"Robot Communication","competitive","Starter",20,
  "What frequency band do most short-range robot wireless control systems use and why?",
  ["900 MHz is exclusively used for robot control due to better penetration.",
   "60 GHz mmWave is preferred because it avoids 2.4 GHz congestion.",
   "5 GHz is always used for robot control because it offers higher data rates.",
   "2.4 GHz provides a worldwide licence-exempt band with sufficient bandwidth and is supported by off-the-shelf receivers with compact antennas."],
  3,"2.4 GHz ISM: worldwide licence-free, adequate bandwidth, compact hardware.",
  "2.4 GHz has shorter range and higher congestion than 900 MHz but compact antenna size and global licence-free status make it ubiquitous.",
  "Commercial RC systems (FrSky, Spektrum) and Wi-Fi-based teleoperation use 2.4 GHz."),

q(3035,"Robot Communication","competitive","Starter",20,
  "What is the MQTT protocol and why is it used for robot fleet telemetry?",
  ["MQTT is a peer-to-peer protocol without a broker for direct robot-to-robot communication.",
   "MQTT requires high-bandwidth connections above 100 Mbps.",
   "MQTT is identical to HTTP but with a smaller header size.",
   "MQTT is a lightweight publish-subscribe protocol over TCP with minimal overhead, designed for constrained devices enabling efficient telemetry from many robots."],
  3,"Lightweight pub-sub with minimal overhead for constrained IoT and fleet telemetry.",
  "MQTT header is 2 bytes; QoS levels 0/1/2 match delivery guarantees to the use case; a broker aggregates telemetry from thousands of robots.",
  "AWS IoT Core and Mosquitto aggregate robot fleet status data via MQTT."),

q(3036,"Robot Communication","competitive","Research",30,
  "Why does time synchronisation (PTP IEEE 1588) critically affect multi-sensor robot fusion?",
  ["PTP is only needed for GPS receivers, not robot sensors.",
   "NTP provides sub-microsecond synchronisation adequate for all robot sensor fusion.",
   "Sensor fusion does not require timestamp synchronisation if data rates are identical.",
   "Without synchronised timestamps, sensor data from camera, LiDAR, and IMU cannot be correctly fused; PTP achieves sub-microsecond synchronisation across networked sensors."],
  3,"Sub-microsecond timestamps enable correct spatio-temporal sensor alignment.",
  "A 10 ms timestamp error between LiDAR and IMU at 30 km/h causes 8 cm position error; PTP hardware timestamping achieves <1 µs synchronisation.",
  "AV sensor suites use PTP to synchronise cameras, LiDAR, and GPS within 500 ns."),

q(3037,"Robot Communication","competitive","Research",30,
  "What is TSN (Time-Sensitive Networking) and why does it outperform standard Ethernet for robot control?",
  ["TSN replaces Ethernet with a custom physical layer for lower latency.",
   "TSN is a wireless protocol for robot-to-robot communication.",
   "Standard Ethernet achieves identical latency to TSN with QoS priority tagging.",
   "TSN adds IEEE 802.1 standards for time-aware shaping, preemption, and scheduled traffic providing deterministic bounded latency on standard Ethernet hardware."],
  3,"Deterministic bounded latency on standard Ethernet via scheduled traffic and preemption.",
  "Credit-based shaper (802.1Qav) and frame preemption (802.1Qbu) allow time-critical control frames to preempt best-effort data, keeping worst-case latency bounded.",
  "Next-generation industrial robot cells use TSN to replace dedicated fieldbus with standard Ethernet."),

q(3038,"Robot Communication","competitive","Research",30,
  "How does 5G URLLC enable remote robot teleoperation?",
  ["5G URLLC provides lower latency than wired connections.",
   "URLLC achieves low latency by reducing the transmitted data packet size only.",
   "5G URLLC is only relevant for video streaming, not control data.",
   "5G URLLC provides <1 ms radio latency with 99.999% reliability, enabling closed-loop haptic teleoperation over a public network for the first time."],
  3,"Sub-1ms radio latency with 99.999% reliability enables closed-loop teleoperation.",
  "Prior LTE latency (~20 ms) exceeded the stability limit for haptic teleoperation; URLLC slices with dedicated scheduling achieve the <10 ms round-trip needed.",
  "5G URLLC-based tele-surgery and hazardous environment remote manipulation are active research areas."),

q(3039,"Robot Communication","competitive","Research",30,
  "Why does SROS2 use a PKI-based trust model rather than simple shared-key encryption?",
  ["Shared-key encryption is stronger than PKI for robot networks.",
   "PKI is only needed for internet-connected robots, not LAN-based systems.",
   "PKI requires more bandwidth than symmetric encryption, making it impractical.",
   "PKI allows each node to have a unique identity certificate; revocation of a compromised node does not require re-keying the entire fleet."],
  3,"Per-node certificates enable selective revocation without fleet re-keying.",
  "A shared key compromise requires updating every node; PKI revokes only the compromised node's certificate, leaving all others intact.",
  "SROS2 generates per-node RSA/EC certificates signed by a fleet CA for DDS-Sec authentication."),

q(3040,"Robot Communication","competitive","Research",30,
  "What is the role of RTP in robot video teleoperation systems?",
  ["RTP guarantees video delivery via acknowledgements like TCP.",
   "RTP is used only for audio, not video, in robot systems.",
   "RTP replaces the need for a codec in video transmission.",
   "RTP sequences and timestamps media packets enabling jitter buffering and synchronisation of audio/video streams without relying on TCP retransmission."],
  3,"Sequence numbers + timestamps enable jitter buffering without TCP retransmission.",
  "Video packets arriving out-of-order or with variable delay (jitter) are reordered by the RTP sequence number and playout buffer; lost packets are concealed.",
  "WebRTC (used in robot teleoperation UIs) uses RTP/SRTP for real-time video transport."),

q(3041,"Robot Communication","competitive","Research",30,
  "How does the MAVLink protocol optimise communication for UAV autopilots?",
  ["MAVLink uses JSON serialisation for human-readable debugging.",
   "MAVLink requires Ethernet hardware and is incompatible with serial links.",
   "MAVLink is identical to ROS2 topic serialisation.",
   "MAVLink is a lightweight binary serial protocol with 8-byte header and CRC; message IDs are pre-defined and serialisation is schema-driven, minimising bandwidth."],
  3,"Binary schema-driven serialisation with CRC optimises low-bandwidth telemetry links.",
  "A MAVLink heartbeat is 9 bytes vs hundreds of bytes for JSON; critical for 57600 baud radio telemetry links typical in UAV ground control.",
  "ArduPilot, PX4, and QGroundControl all use MAVLink v2 for UAV-GCS communication."),

q(3042,"Robot Communication","competitive","Research",30,
  "Why does LoRa radio provide a viable alternative to cellular for outdoor robot telemetry?",
  ["LoRa achieves higher bandwidth than cellular at all distances.",
   "LoRa requires licenced spectrum unlike cellular networks.",
   "LoRa is only suitable for indoor robots with line-of-sight links.",
   "LoRa's chirp spread-spectrum modulation achieves 15+ km range with 100 mW at the cost of low data rate, suited for telemetry but not video."],
  3,"15+ km range with 100 mW via spread-spectrum trading bandwidth for distance.",
  "LoRa's processing gain from chirp spread spectrum allows link budgets of 155 dB, enabling rural robot telemetry without cellular coverage.",
  "Agricultural robots, flood-monitoring UGVs, and remote-area AUV tenders use LoRaWAN telemetry."),

// ============================================================
// PART 2 of 3 — Remaining Questions (continue array from Part 1),
//               then close array, add utilities, sound, timer
// ============================================================

// ── continuing QUESTION_BANK array from Part 1 ────────────

  q(3043,"Robot Communication","competitive","Research",30,
    "What is the publish-subscribe advantage of DDS compared to point-to-point sockets for multi-robot systems?",
    ["Point-to-point sockets have lower overhead than DDS for all use cases.",
     "DDS requires all participants to share the same local area network.",
     "DDS automatically compresses all data unlike raw socket connections.",
     "DDS provides automatic discovery, topic-based decoupling, QoS enforcement, and built-in fault tolerance; sockets require explicit addressing and manual reconnection."],
    3,"Automatic discovery + QoS + decoupling vs manual addressing and reconnection.",
    "Adding a new robot subscriber requires no changes to the publisher; DDS discovery announces it automatically; point-to-point sockets require updating publisher connection lists.",
    "ROS2 DDS, OpenDDS, and RTI Connext implement the OMG DDS standard."),

  q(3044,"Robot Communication","competitive","Research",30,
    "How does the CANopen protocol extend basic CAN for robot joint coordination?",
    ["CANopen is a wireless extension of CAN for mobile robot platforms.",
     "CANopen increases CAN bandwidth to 10 Mbit/s for high-speed applications.",
     "CANopen replaces the need for CAN hardware with software simulation.",
     "CANopen defines a standardised object dictionary, PDO/SDO messaging, and NMT state machine enabling interoperable multi-axis robot joint control."],
    3,"Object dictionary + PDO/SDO + NMT enables interoperable multi-axis coordination.",
    "CAN defines physical and link layers only; CANopen adds application-layer services allowing any compliant drive to be configured and controlled without vendor-specific drivers.",
    "Robotic arm joint drives (ELMO, Maxon EPOS) use CANopen for interoperable torque control."),

  q(3045,"Robot Communication","competitive","Research",30,
    "What wireless communication challenge do electromagnetic actuators create for co-located radio receivers?",
    ["Motor actuators improve radio reception by reflecting signals toward the antenna.",
     "EMI from motors only affects visual sensors, not radio receivers.",
     "Robot body shielding eliminates all EMI without requiring any design measures.",
     "High-current motor switching generates broadband electromagnetic interference that elevates the noise floor and desensitises co-located radio receivers."],
    3,"Switching current generates broadband EMI that desensitises co-located receivers.",
    "PWM motor drives create current transients with harmonics from DC to hundreds of MHz; unshielded cables radiate this, degrading radio SNR.",
    "EMC compliance testing, cable shielding, ferrite beads, and antenna spatial separation mitigate motor EMI in robot designs."),

  // ── Space Robotics (3046-3060) ────────────────────────────
  q(3046,"Space Robotics","competitive","Starter",20,
    "What radiation-hardening technique is essential for electronic components in space robots?",
    ["Standard COTS components are sufficient for all space missions.",
     "Radiation shielding is achieved by painting components with a lead-based coating.",
     "Radiation hardening requires replacing silicon with gallium nitride in all circuits.",
     "Radiation-hardened ICs use thicker gate oxides and triple-modular redundancy (TMR) to tolerate total ionising dose and single-event upsets without latch-up."],
    3,"Rad-hard ICs with TMR tolerate TID and SEUs without latch-up.",
    "High-energy particles cause SEUs (bit flips) and TID (threshold voltage shift); TMR voting detects errors; thick-oxide transistors resist TID accumulation.",
    "Curiosity rover RAD750 processor uses rad-hard techniques for long Mars mission life."),

  q(3047,"Space Robotics","competitive","Starter",20,
    "Why does the round-trip communication delay to Mars require space robots to operate with high autonomy?",
    ["Real-time teleoperation is possible via relay satellites that reduce delay to milliseconds.",
     "Mars robots are teleoperated using predictive methods with zero perceived delay.",
     "Communication delay is less than 1 second for all solar system bodies.",
     "One-way delay is 3-22 minutes depending on orbital position, making real-time teleoperation impossible; onboard autonomy must handle surface operations between uplink/downlink windows."],
    3,"3-22 min one-way delay: teleoperation impossible, autonomy mandatory.",
    "Command upload windows are typically once or twice per day; the rover must execute multi-hour autonomous drives, science observations, and fault responses independently.",
    "Perseverance AutoNav drives autonomously between daily command sequences."),

  q(3048,"Space Robotics","competitive","Starter",20,
    "What is the function of a robot end-effector designed for on-orbit satellite servicing?",
    ["On-orbit end-effectors only handle cooperative satellites with dedicated grapple pins.",
     "Space end-effectors use standard parallel-jaw grippers from industrial robots.",
     "Space end-effectors do not need force sensing because microgravity eliminates contact forces.",
     "A servicing end-effector must capture a tumbling non-cooperative target, stabilise it, and interface with its mechanical and electrical systems without prior dedicated grapple fixtures."],
    3,"Capture tumbling non-cooperative target and interface without prior fixtures.",
    "Targets like old satellites tumble and lack grapple points; end-effectors must match tumble rate, clamp to structural features like nozzles, and transfer power/data.",
    "DARPA RSGS and ClearSpace-1 develop non-cooperative capture end-effectors."),

  q(3049,"Space Robotics","competitive","Starter",20,
    "What terrain mobility challenge do planetary rovers face that wheeled ground robots on Earth do not?",
    ["Planetary rovers face no mobility challenges because all planets have hard rocky surfaces.",
     "Lower gravity makes wheels more effective on other planets, easing mobility.",
     "Rovers face no slip because regolith has higher traction than Earth soil.",
     "Low gravity, soft loose regolith with low bearing capacity and high slip, and the inability to call for recovery require ultra-conservative terrain assessment."],
    3,"Low-bearing-capacity regolith causes high slip; no recovery is possible.",
    "Mars regolith has low cohesion and bearing capacity; a rover stuck has no recovery option; slip estimation and terrain assessment are critical.",
    "Curiosity embedded in sand used detailed slip-aware path planning to escape."),

  q(3050,"Space Robotics","competitive","Starter",20,
    "What is Canadarm2 and why is it architecturally unique among space robot manipulators?",
    ["Canadarm2 is a 6-DOF arm with a fixed base attached to the ISS truss.",
     "Canadarm2 uses pneumatic actuators to minimise mass in microgravity.",
     "Canadarm2 is a single-link arm designed only for payload capture.",
     "Canadarm2 is a 7-DOF space station manipulator with no fixed base; it can relocate by grappling different anchor points across the ISS structure."],
    3,"Mobile base: relocates by grappling anchor points across ISS.",
    "Unlike Earth manipulators with fixed bases, Canadarm2 walks end-over-end to reach any ISS module, enabling full-station maintenance.",
    "Its 7 DOF provides redundancy for singularity avoidance during delicate ISS module installation."),

  q(3051,"Space Robotics","competitive","Research",30,
    "How does visual terrain-relative navigation (TRN) enable precise Mars helicopter landing?",
    ["Mars helicopters use GPS for all navigation like aircraft on Earth.",
     "TRN is used only for orbital spacecraft, not surface platforms.",
     "Visual TRN requires a surface beacon to provide a reference point.",
     "Ingenuity matches onboard images to pre-loaded Digital Terrain Models in real time, computing position corrections that enable landings within metres in GPS-absent conditions."],
    3,"Image-to-DTM matching provides GPS-absent position corrections for precision landing.",
    "Ingenuity's navigation camera images are matched to pre-loaded DTM tiles; position updates correct IMU drift between each ~30 Hz control cycle.",
    "Perseverance's landing also used terrain-relative navigation for hazard avoidance during EDL."),

  q(3052,"Space Robotics","competitive","Research",30,
    "What design constraint forces space robot joints to use harmonic drives rather than standard gearboxes?",
    ["Harmonic drives are chosen purely for cost reduction over standard gearboxes.",
     "Standard planetary gearboxes are used in space because harmonic drives cannot handle torque in vacuum.",
     "Harmonic drives reduce the need for motor controllers, saving spacecraft power.",
     "Harmonic drives provide zero backlash, high gear ratio in a single stage, and vacuum-compatible operation without lubrication concerns critical for space life."],
    3,"Zero backlash + high ratio + vacuum-compatible lubrication.",
    "Standard gears have backlash that creates position error; harmonic drives have no backlash due to continuous tooth engagement; dry or ionic lubricants work in vacuum.",
    "All NASA and ESA space robot arms use harmonic drives (Canadarm2, ExoMars arm)."),

  q(3053,"Space Robotics","competitive","Research",30,
    "Why does free-flying satellite capture require matching the target's angular velocity before grasping?",
    ["Free-flying targets must be fully de-spun by external means before any robot can approach.",
     "Angular velocity matching is only needed for cooperative targets.",
     "Only translational velocity matching is needed; rotational mismatch has no effect in microgravity.",
     "A large angular momentum mismatch at contact transfers impulsive torques that can damage both chaser and target or impart uncontrolled tumble to the mated stack."],
    3,"Angular momentum mismatch at contact causes damaging impulsive torques.",
    "Momentum is conserved at contact; if ω_target ≫ ω_chaser the capture impulse applies large torques; matching within ~0.5 deg/s prevents damage.",
    "JAXA and ESA debris removal missions plan angular velocity matching phases before capture."),

  q(3054,"Space Robotics","competitive","Research",30,
    "What is the role of onboard executive planning in AEGIS on the Curiosity rover?",
    ["AEGIS is a ground-based tool used to plan all rover activities.",
     "AEGIS replaces the rover's IMU for autonomous navigation.",
     "AEGIS provides communication relay between Curiosity and Mars orbiters.",
     "AEGIS autonomously identifies geological targets in camera images and directs science instruments to acquire data between Earth command windows without requiring ground approval."],
    3,"Onboard science autonomy identifies and targets geological features independently.",
    "Camera images are processed onboard by AEGIS; detected rock targets satisfying science criteria trigger LIBS laser measurements without ground uplink.",
    "AEGIS increases science return per sol by enabling science during communication blackouts."),

  q(3055,"Space Robotics","competitive","Research",30,
    "How does thermal cycling degrade robotic joint performance on planetary surfaces?",
    ["Thermal cycling only affects electronic components, not mechanical joints.",
     "Lower temperatures improve joint performance by reducing friction.",
     "Thermal cycling effects are negligible for missions shorter than one Earth year.",
     "Daily temperature swings of 100+ °C cause differential thermal expansion of metals and lubricant viscosity changes, causing gear backlash growth and bearing preload loss."],
    3,"100+ °C cycling causes differential expansion: backlash growth and bearing preload loss.",
    "Steel gears and aluminium housing expand differently; lubricant viscosity changes 10⁴× between -100 and +50 °C; joints must be designed for full thermal range.",
    "Curiosity's arm joints use dry lubricants and high-clearance tolerances for Mars thermal environment."),

  q(3056,"Space Robotics","competitive","Research",30,
    "Why is fault detection, isolation, and recovery (FDIR) more critical for space robots than ground robots?",
    ["FDIR is equally important for ground and space robots.",
     "Ground-based FDIR algorithms can be directly applied to space robots without modification.",
     "Space FDIR is simpler because space environments have fewer fault sources than industrial floors.",
     "Space robots cannot be serviced or manually rescued; FDIR must detect hardware faults autonomously and transition to degraded modes that continue the mission."],
    3,"No servicing: FDIR must autonomously maintain mission continuity in degraded modes.",
    "A stuck joint or SEU on a ground robot is recovered by a technician; a space robot must detect the fault, isolate the failed component, and reconfigure autonomously within minutes.",
    "Curiosity's FDIR switched to its backup computer multiple times during the mission."),

  q(3057,"Space Robotics","competitive","Research",30,
    "What is ISAM (In-Space Servicing, Assembly, and Manufacturing) and why does it require new robot dexterity?",
    ["ISAM only involves refuelling, which requires simple gripper capabilities.",
     "ISAM robots use the same end-effectors as industrial manufacturing robots.",
     "ISAM is a ground-based manufacturing concept not related to space robotics.",
     "ISAM extends satellite life and constructs large structures in orbit; robots must handle flexible, deformable, and legacy components with no standard interfaces."],
    3,"Diverse non-standard interfaces + flexible components require contact-rich dexterous manipulation.",
    "Replacing solar panels, refuelling tanks, and assembling truss structures each require different grasps on non-cooperative legacy hardware in microgravity.",
    "DARPA RSGS, NRL Starfish, and GITAI develop ISAM robot capabilities."),

  q(3058,"Space Robotics","competitive","Research",30,
    "How does wheel odometry fail on soft planetary regolith and what sensor compensates?",
    ["Wheel odometry is unaffected by regolith because all planets have hard surfaces.",
     "Wheel encoders are the most accurate odometry source on planetary surfaces.",
     "IMU integration compensates for wheel odometry errors better than visual odometry.",
     "High wheel slip on loose regolith decouples wheel rotation from actual displacement; visual odometry using surface feature tracking provides slip-independent displacement estimates."],
    3,"Wheel slip decouples rotation from displacement; VO provides slip-independent estimates.",
    "Spirit and Opportunity experienced >40% wheel slip in some terrains; VO using hazard camera images corrected odometry errors, enabling accurate position estimation.",
    "All modern rovers (Curiosity, Perseverance) use visual odometry alongside wheel odometry."),

  q(3059,"Space Robotics","competitive","Research",30,
    "Why do multi-arm space robots need whole-body control for base attitude management?",
    ["Multi-arm robots do not need attitude control because microgravity eliminates gravity torques.",
     "Base attitude disturbances from manipulation are corrected by reaction wheels independently.",
     "Whole-body control is only needed for ground robots, not space platforms.",
     "Manipulator motion shifts the system centre of mass and angular momentum, causing base attitude disturbances; whole-body control coordinates arm motion to minimise reaction torques."],
    3,"Manipulation shifts CoM and angular momentum causing base attitude disturbances.",
    "In microgravity every joint torque applies a reaction to the base; uncoordinated arm motion spins the spacecraft; WBC plans joint trajectories that null base reaction.",
    "ETS-VII and JAXA free-flyer experiments validated whole-body reactive joint planning."),

  q(3060,"Space Robotics","competitive","Research",30,
    "What communication architecture enables coordinated multi-robot lunar surface operations?",
    ["Direct Earth-to-Moon links provide continuous coverage without any relays.",
     "Lunar surface robots must be fully autonomous because no communication is possible.",
     "Communication between Earth and the Moon has zero latency enabling real-time control.",
     "A relay-satellite constellation above the Moon provides continuous communication coverage, enabling near-real-time teleoperation and data uplink for multiple surface robots."],
    3,"Relay constellation provides continuous coverage for teleoperation and data uplink.",
    "The Moon's far side and polar craters have no direct Earth visibility; relay satellites in lunar halo orbits provide near-continuous coverage.",
    "NASA Lunar Gateway and LunaNet architecture plan relay infrastructure for Artemis surface robots."),

  // ── Assistive Robotics (3061-3075) ────────────────────────
  q(3061,"Assistive Robotics","competitive","Starter",20,
    "What is the primary control interface for a powered lower-limb exoskeleton during gait rehabilitation?",
    ["Exoskeletons are controlled by joysticks operated by the therapist.",
     "Lower-limb exoskeletons use only pre-programmed gait patterns without user input.",
     "Brain-computer interfaces are the exclusive control method for all lower-limb exoskeletons.",
     "Surface EMG signals from residual leg muscles or intention detection from trunk/hip motion provide voluntary control commands that the exoskeleton amplifies into full gait assistance."],
    3,"sEMG or motion intention detection provides voluntary control for assisted gait.",
    "Surface EMG detects muscle activation onset before movement; the exoskeleton uses this signal to time and scale assistance in sync with the user's intention.",
    "Ekso, ReWalk, and Indego exoskeletons use sEMG or heel-strike detection for gait initiation."),

  q(3062,"Assistive Robotics","competitive","Starter",20,
    "What distinguishes a body-powered prosthetic from a myoelectric prosthetic arm?",
    ["Body-powered prosthetics use EMG signals; myoelectric use cable harnesses.",
     "Myoelectric prosthetics are passive and require no batteries.",
     "Body-powered devices always have higher grip force than myoelectric devices.",
     "Body-powered devices use a harness and cable operated by shoulder/arm motion; myoelectric devices use surface EMG from residual limb muscles to command motor-driven fingers."],
    3,"Cable-harness body power vs EMG-commanded motor drive.",
    "Body-powered devices are durable and provide haptic feedback through the cable; myoelectric devices offer more natural proportional control but require batteries.",
    "Ottobock MyoHand and DEKA LUKE arm use multi-channel EMG for finger control."),

  q(3063,"Assistive Robotics","competitive","Starter",20,
    "What is a brain-computer interface (BCI) and what signal modality does non-invasive BCI use?",
    ["Non-invasive BCI uses subcortical electrode arrays implanted in the brain.",
     "EEG BCI achieves single-neuron resolution equal to invasive electrode arrays.",
     "Non-invasive BCI requires the user to speak aloud to generate command signals.",
     "A BCI translates neural activity into device commands; non-invasive BCI uses EEG recorded from scalp electrodes, capturing population-level electrical signals without surgery."],
    3,"EEG captures population electrical activity from scalp without surgery.",
    "EEG measures cortical oscillations (mu, beta) and event-related potentials (P300, SSVEP); classification maps patterns to device commands.",
    "P300-based EEG BCI systems allow ALS patients to control communication aids and wheelchairs."),

  q(3064,"Assistive Robotics","competitive","Starter",20,
    "What are the primary safety standards governing medical exoskeleton deployment?",
    ["Exoskeletons require no special certification because they assist not replace limbs.",
     "ISO 10218 (industrial robot safety) applies directly to all medical exoskeletons.",
     "Medical exoskeletons only need CE marking; FDA approval is not required for US markets.",
     "IEC 62133 (battery safety), ISO 13482 (personal care robots), and FDA 510(k) clearance or CE marking govern design, testing, and clinical use of medical exoskeletons."],
    3,"ISO 13482, IEC 62133, FDA 510(k) or CE marking govern medical exoskeleton deployment.",
    "These standards address fall prevention, torque limits, emergency stop, battery safety, and clinical efficacy requiring extensive testing before patient use.",
    "Ekso GT and Lokomat received FDA 510(k) clearance following ISO 13482 compliance testing."),

  q(3065,"Assistive Robotics","competitive","Starter",20,
    "How does impedance control improve safety in robot-assisted physical rehabilitation?",
    ["Impedance control maximises joint torque to ensure full passive range of motion.",
     "Impedance control eliminates the need for force sensors in rehabilitation robots.",
     "Rehabilitation robots use position control exclusively to enforce prescribed trajectories.",
     "By shaping the virtual mechanical impedance, the therapist can specify how compliantly the robot guides or resists patient movement, enabling active participation and preventing over-forcing."],
    3,"Virtual impedance shapes robot compliance enabling active patient participation safely.",
    "High impedance = position-guiding; low impedance = transparent; the therapist tunes the impedance to match patient capability as recovery progresses.",
    "MIT-MANUS, ARM Guide, and Lokomat use impedance-based therapy modes."),

  q(3066,"Assistive Robotics","competitive","Research",30,
    "What is the challenge of co-adaptation in myoelectric prosthetic control?",
    ["EMG patterns are stable over years, making adaptation completely unnecessary.",
     "Co-adaptation refers to the user adapting to a fixed classifier without retraining.",
     "Adaptive algorithms address co-adaptation by increasing the number of EMG channels.",
     "EMG patterns shift over time due to electrode displacement and muscle fatigue; adaptive classifiers continuously update decision boundaries to maintain decoding accuracy."],
    3,"EMG pattern shift from electrode drift and fatigue; adaptive classifiers update boundaries online.",
    "Linear discriminant analysis with streaming updates or transfer learning from a shared prior model can track EMG distribution shifts without full re-calibration sessions.",
    "Coapt and Infinite Biomedical Technologies prosthetic controllers use adaptive EMG decoding."),

  q(3067,"Assistive Robotics","competitive","Research",30,
    "How does shared autonomy balance user intent and robot assistance in wheelchair-mounted manipulation?",
    ["Shared autonomy gives full control to the robot, completely ignoring user input.",
     "Shared autonomy is only used for navigation tasks, not manipulation.",
     "Shared autonomy requires the user to explicitly specify the desired assistance level numerically.",
     "Shared autonomy infers the user's goal from noisy/incomplete input and blends assistance with user control, scaling autonomy inversely with user command certainty."],
    3,"Intent inference scales autonomy inversely with user command certainty.",
    "Disabled users with limited motor bandwidth provide coarse commands; the robot infers the intended target from context and smoothly corrects trajectories toward it.",
    "Kinova JACO arm with shared autonomy assists tetraplegic users with activities of daily living."),

  q(3068,"Assistive Robotics","competitive","Research",30,
    "Why is sensorised prosthetic socket fit monitoring important for amputee health?",
    ["Socket fit only affects comfort, not tissue health.",
     "Socket pressure monitoring is replaced by external visual inspection of the limb.",
     "Pressure hotspots only occur in lower-limb prosthetics, not upper-limb devices.",
     "Socket pressure hotspots cause skin breakdown and residual limb damage; embedded pressure sensors detect dangerous loading patterns triggering fit alerts before injury occurs."],
    3,"Pressure hotspots cause skin breakdown; embedded sensors detect dangerous loading early.",
    "Shear and normal pressures >30 kPa cause ischaemia in <30 min; sensor arrays inside the socket map pressure distribution and alert users before damage occurs.",
    "Smart socket research (MIT, UCSF) embeds strain gauges and capacitive sensors for continuous fit monitoring."),

  q(3069,"Assistive Robotics","competitive","Research",30,
    "How do exoskeleton torque controllers balance transparency and assistance to avoid metabolic penalty?",
    ["Maximum torque injection always reduces metabolic cost.",
     "Exoskeleton torque phasing has no effect on metabolic energy expenditure.",
     "Metabolic cost is determined only by exoskeleton mass, not torque controller design.",
     "Transparent modes minimise mechanical impedance allowing natural movement; assistance modes inject torques phased with the gait cycle; poor phasing increases metabolic cost beyond unassisted walking."],
    3,"Correct torque phasing reduces metabolic cost; incorrect phasing increases it beyond unassisted.",
    "Positive power during push-off reduces metabolic cost; out-of-phase torques resist natural gait mechanics.",
    "Collins et al (Science 2015) showed ankle exoskeleton optimisation reduced metabolic cost by 24%."),

  q(3070,"Assistive Robotics","competitive","Research",30,
    "What neural plasticity mechanism enables long-term EEG BCI performance improvement?",
    ["EEG BCI improves only because the classifier adapts; the brain does not change.",
     "Neuroplasticity is irrelevant for adult users of BCI systems.",
     "Long-term improvement is caused entirely by electrode impedance stabilisation.",
     "Motor imagery training induces neuroplastic changes in cortical activation patterns, strengthening the spatial/spectral features used by the BCI classifier over weeks of training."],
    3,"Motor imagery training induces cortical reorganisation improving BCI-relevant neural features.",
    "Longitudinal fMRI and EEG studies show expanded motor representation and increased mu-rhythm suppression in trained BCI users.",
    "8-12 weeks of motor imagery BCI training produces measurable cortical map changes."),

  q(3071,"Assistive Robotics","competitive","Research",30,
    "How does targeted muscle reinnervation (TMR) improve prosthetic limb control?",
    ["TMR is a surgical technique that restores sensation only, without improving motor control.",
     "TMR only works for lower-limb amputees, not upper-limb devices.",
     "TMR removes the need for pattern recognition by providing direct joint angle signals.",
     "TMR redirects severed peripheral nerves to residual chest or arm muscles, creating additional distinct EMG control sites that map intuitively to prosthetic joint DOF."],
    3,"Redirected nerves create additional intuitive EMG sites mapped to prosthetic DOF.",
    "Instead of 2 EMG sites from biceps/triceps, TMR creates 4-6 sites each mapping to a distinct prosthetic motion, reducing cognitive load and enabling multi-DOF simultaneous control.",
    "Northwestern University TMR surgery enabled amputees to control elbow, wrist, and hand simultaneously."),

  q(3072,"Assistive Robotics","competitive","Research",30,
    "What is the challenge of haptic feedback latency in upper-limb prosthetics?",
    ["Haptic feedback latency is irrelevant because prosthetic users adapt to any delay.",
     "Only visual feedback matters for prosthetic manipulation; haptic feedback has no effect.",
     "Latency only affects gross motor tasks, not fine manipulation.",
     "Sensory-motor loops require feedback within ~30 ms; delays above 100 ms cause instability in grip force control and break the sense of embodiment of the prosthetic limb."],
    3,">30 ms feedback delay destabilises grip force control and breaks embodiment.",
    "The natural sensory-motor loop operates at ~20-50 ms; prosthetic feedback delivered above 100 ms causes overshoot oscillations and reduces the sense that the limb belongs to the user.",
    "Vibrotactile and electrotactile feedback with low-latency encoders partially restore sensory-motor loops."),

  q(3073,"Assistive Robotics","competitive","Research",30,
    "Why do soft robotic exosuits outperform rigid exoskeletons for daily living assistance in some use cases?",
    ["Rigid exoskeletons always provide higher force output, making them universally superior.",
     "Soft exosuits are always more energy-efficient than rigid exoskeletons.",
     "Soft exosuits do not require any actuation and work purely through elastic recoil.",
     "Soft exosuits use cable-driven fabric structures that are lightweight, conformal, and do not constrain natural joint axes, making them comfortable for all-day wear outside clinical settings."],
    3,"Lightweight conformal fabric does not constrain natural joint axes enabling all-day wear.",
    "Rigid exoskeletons misalign with biological joint axes causing discomfort; soft suits conform to the body and transmit forces along natural motion directions.",
    "Harvard Biodesign Lab soft exosuits assist stroke and CP patients in home environments."),

  q(3074,"Assistive Robotics","competitive","Research",30,
    "How does intent detection latency affect safety in powered wheelchair control for severely paralysed users?",
    ["Intent detection latency only affects comfort, not safety.",
     "Powered wheelchairs automatically stop when any obstacle is detected regardless of user intent.",
     "Latency above 500 ms is acceptable because wheelchair speeds are low.",
     "High-latency intent detection (>200 ms) causes the wheelchair to continue moving after the user intends to stop, creating collision risk; low-latency BCI or switch scanning reduces stopping distance."],
    3,">200 ms latency increases stopping distance causing collision risk.",
    "At 1 m/s, 200 ms detection latency means the chair travels 20 cm before the stop command is processed; with obstacle clearances of 5-10 cm this causes collisions.",
    "Eye-gaze and P300 BCI wheelchairs target <150 ms end-to-end detection latency."),

  q(3075,"Assistive Robotics","competitive","Research",30,
    "What is the embodiment illusion and why does it matter for prosthetic and rehabilitation robot acceptance?",
    ["The embodiment illusion is purely psychological and unrelated to device performance.",
     "Embodiment only applies to virtual reality, not physical prosthetics.",
     "Achieving embodiment always requires invasive neural interfaces.",
     "The embodiment illusion is the brain's sense that an external device belongs to one's own body; achieving it improves acceptance, reduces phantom pain, and enhances motor control quality."],
    3,"Embodiment illusion improves acceptance, reduces phantom pain, and enhances motor quality.",
    "Synchronous visual-tactile stimulation can be extended to prosthetics; users who experience embodiment show lower cortisol, reduced phantom pain, and better grip modulation.",
    "Research at ETH Zurich showed synchronised vibrotactile feedback induces embodiment of a prosthetic hand."),

  // ── Industrial Robotics (3076-3090) ───────────────────────
  q(3076,"Industrial Robotics","competitive","Starter",20,
    "What is ISO 10218 and what safety requirements does it impose on industrial robot installations?",
    ["ISO 10218 is a voluntary guideline with no legal enforcement.",
     "ISO 10218 applies only to mobile robots, not fixed arm installations.",
     "ISO 10218 only covers electrical safety, not mechanical hazards.",
     "ISO 10218 specifies safety requirements for industrial robot design (Part 1) and integration (Part 2) including safeguarding, speed/force limiting, and risk assessment."],
    3,"ISO 10218 Part 1/2: mandatory safeguarding, speed/force limits, risk assessment.",
    "Part 1 covers robot manufacturer requirements; Part 2 covers integrator requirements for guarding, emergency stops, and risk assessment in the complete installation.",
    "All industrial robot installations in the EU and many other jurisdictions require ISO 10218 compliance."),

  q(3077,"Industrial Robotics","competitive","Starter",20,
    "What distinguishes a collaborative robot (cobot) from a traditional industrial robot?",
    ["Cobots are smaller versions of industrial robots with identical safety requirements.",
     "Traditional industrial robots can operate without safety fences at all speeds.",
     "Cobots use higher speed than traditional robots to minimise human exposure time.",
     "Cobots are designed for power-and-force limiting, speed/separation monitoring, and hand-guiding, enabling safe operation alongside humans without fixed safety fences."],
    3,"Power-and-force limiting + speed/separation monitoring enables safe human co-working.",
    "ISO/TS 15066 defines four collaborative modes: safety-rated stop, hand guiding, speed/separation monitoring, and power-and-force limiting; cobots implement one or more.",
    "Universal Robots UR series, KUKA LBR, and Franka Panda are paradigmatic cobots."),

  q(3078,"Industrial Robotics","competitive","Starter",20,
    "What is the definition of robot repeatability and how does it differ from accuracy?",
    ["Repeatability and accuracy are identical metrics measured in different units.",
     "Accuracy is always higher than repeatability for well-calibrated industrial robots.",
     "Repeatability measures speed; accuracy measures position error.",
     "Repeatability is the ability to return to the same position repeatedly under the same command; accuracy is the ability to reach the commanded absolute position in space."],
    3,"Repeatability: return to same pose; accuracy: reach commanded absolute pose.",
    "A robot can have 0.02 mm repeatability (excellent) but 1 mm accuracy (poor) if its kinematic model is imprecise; calibration improves accuracy but not necessarily repeatability.",
    "Industrial robots prioritise repeatability for task-to-task consistency."),

  q(3079,"Industrial Robotics","competitive","Starter",20,
    "What is the role of a teach pendant in industrial robot programming?",
    ["A teach pendant replaces the robot controller for all motion execution.",
     "Teach pendants are only used for safety testing, not production programming.",
     "A teach pendant is a wireless sensor that tracks operator hand position.",
     "A teach pendant is a handheld device that allows an operator to manually jog the robot, record waypoints, and write/edit motion programs without offline software."],
    3,"Handheld jog + waypoint recording + program editing at the robot.",
    "The operator physically moves the robot to key positions, records each pose, and assembles motion sequences; this on-the-fly programming is fast for simple pick-and-place tasks.",
    "FANUC, ABB, and KUKA each have proprietary teach pendant languages (TP, RAPID, KRL)."),

  q(3080,"Industrial Robotics","competitive","Starter",20,
    "What is the purpose of a robotic end-of-arm tooling (EOAT) quick-change system?",
    ["Quick-change systems replace the robot controller during tool changes.",
     "EOAT quick-change is only used for welding applications, not gripping.",
     "Quick-change systems reduce robot payload capacity by 50%.",
     "Quick-change systems allow the robot to autonomously swap end-effectors between tasks without manual intervention, increasing flexibility."],
    3,"Autonomous EOAT swap between tasks without manual intervention.",
    "A single robot can perform welding, vision inspection, and pick-and-place in sequence by autonomously exchanging tools stored in a tool rack.",
    "ATI Industrial Automation and Stäubli make standard robot tool changers used across industries."),

  q(3081,"Industrial Robotics","competitive","Research",30,
    "How does OPC-UA integration improve industrial robot cell flexibility?",
    ["OPC-UA replaces EtherCAT for all real-time motion control in modern factories.",
     "PLC and ROS2 integration requires manual data format translation at every interface.",
     "OPC-UA is only used for supervisory SCADA systems, not robot cell control.",
     "OPC-UA provides a vendor-neutral semantic data model and encrypted transport allowing ROS2-based perception and planning nodes to exchange structured data with PLC-controlled actuators."],
    3,"Vendor-neutral semantic model + encrypted transport bridges ROS2 and PLC ecosystems.",
    "OPC-UA UA4ROS bridges ROS2 topics to OPC-UA nodes; PLCs expose actuator states as typed address-space objects; the robot cell shares a single unified information model.",
    "Bosch Rexroth and Siemens use OPC-UA to integrate ROS2 AI components with TIA Portal PLC programs."),

  q(3082,"Industrial Robotics","competitive","Research",30,
    "Why does offline programming (OLP) reduce production downtime compared to teach-pendant programming?",
    ["OLP requires more downtime than teach-pendant programming because simulation is slow.",
     "OLP is only applicable to welding tasks, not general manipulation.",
     "Teach-pendant programming is always more accurate because it uses the real robot.",
     "OLP creates and simulates robot programs in a virtual cell model before deployment; the robot continues production while the program is prepared, validated, and briefly interrupted only for upload."],
    3,"Virtual programming + simulation runs offline; robot stays in production until upload.",
    "Teach-pendant programming halts production during the entire programming session; OLP allows engineers to program, simulate, and verify offline then upload a tested program in minutes.",
    "ABB RobotStudio, FANUC ROBOGUIDE, and KUKA.Sim are standard OLP tools."),

  q(3083,"Industrial Robotics","competitive","Research",30,
    "What is a robot workcell risk assessment and why is it mandatory under the Machinery Directive?",
    ["Risk assessment is optional for robots below 10 kg payload.",
     "Risk assessment only covers electrical hazards, not mechanical ones.",
     "The Machinery Directive only applies to mobile robots, not fixed arms.",
     "A risk assessment identifies all hazards, estimates their severity and likelihood, and documents mitigation measures; it is legally required under EU Machinery Directive 2006/42/EC for CE marking."],
    3,"Legal requirement under Machinery Directive 2006/42/EC for CE marking.",
    "Without a documented risk assessment, the robot cell cannot receive CE marking making it illegal to operate in the EU; integrators must enumerate hazards and demonstrate adequate safeguarding.",
    "TÜV and Lloyd's Register certify industrial robot cells against ISO 10218-2 and Machinery Directive requirements."),

  q(3084,"Industrial Robotics","competitive","Research",30,
    "How does vision-guided robotic bin-picking differ from fixed-position pick-and-place?",
    ["Bin-picking is simpler because parts are always at the same height in the bin.",
     "Fixed-position picking requires more complex perception than bin-picking.",
     "Bin-picking only requires 2D vision because parts are always upright.",
     "Bin-picking must detect randomly oriented overlapping parts using 3D vision, select a collision-free grasp, and plan a trajectory through cluttered space; fixed-position picking uses pre-taught poses."],
    3,"Random orientation + occlusion + clutter require 3D detection, grasp planning, and collision-free motion.",
    "3D point clouds from structured light or stereo detect part pose; grasp ranking selects the most accessible part; collision-aware IK avoids the bin walls.",
    "Fanuc 3D Area Sensor, Photoneo, and Mech-Mind provide industrial bin-picking solutions."),

  q(3085,"Industrial Robotics","competitive","Research",30,
    "What is the significance of OEE (Overall Equipment Effectiveness) for evaluating robotic manufacturing cells?",
    ["OEE only measures robot speed, not quality or availability.",
     "An OEE of 100% means the robot is running at maximum speed regardless of quality.",
     "OEE is a financial metric unrelated to robot performance.",
     "OEE = Availability × Performance × Quality measures how productively a robot cell operates; it identifies bottlenecks, unplanned downtime, and quality losses enabling data-driven improvement."],
    3,"Availability × Performance × Quality identifies bottlenecks and productivity losses.",
    "A cell running 90% availability, 95% performance, 98% quality has OEE = 83.8%; below-industry-standard OEE points to specific improvement areas (maintenance, speed, defects).",
    "Industry 4.0 robot cells stream OEE data to MES dashboards for real-time monitoring."),

  q(3086,"Industrial Robotics","competitive","Research",30,
    "How does force-controlled robotic assembly reduce part rejection rates in tight-tolerance insertion tasks?",
    ["Force control is slower than position control, making it unsuitable for high-throughput assembly.",
     "Force sensors are only used for quality inspection, not active assembly control.",
     "Tight-tolerance insertion requires higher stiffness, not compliant force control.",
     "Force control detects contact forces during insertion and follows a compliance strategy (spiral search, chamfer-guided) that corrects misalignment within the clearance zone preventing jamming."],
    3,"Contact force compliance corrects misalignment within clearance zone preventing jamming.",
    "In peg-in-hole with 0.01 mm clearance, even small position errors cause jamming; force-controlled spiral search corrects alignment using measured lateral forces.",
    "KUKA LBR and Franka Panda perform force-controlled circuit board and bearing insertion in production."),

  q(3087,"Industrial Robotics","competitive","Research",30,
    "What is the difference between a safety PLC and a standard PLC for robot safety circuits?",
    ["Safety PLCs are faster than standard PLCs for all motion control tasks.",
     "Standard PLCs achieve the same safety level as safety PLCs with software redundancy.",
     "Safety PLCs are only required for mobile robots, not fixed industrial arms.",
     "A safety PLC uses dual-channel redundant logic, self-test routines, and IEC 62061 SIL/PLr certification to guarantee fail-safe behaviour even in the presence of internal faults."],
    3,"Dual-channel redundant logic + self-test + SIL/PLr certification ensures fail-safe behaviour.",
    "A single-channel standard PLC can fail silently; dual-channel safety PLCs compare outputs and trigger safe state on any discrepancy.",
    "Pilz PNOZmulti, Siemens F-series, and Allen-Bradley GuardLogix are certified safety PLCs for robot cells."),

  q(3088,"Industrial Robotics","competitive","Research",30,
    "How does digital thread technology connect robot programming to manufacturing lifecycle data?",
    ["Digital thread only connects CAD to CNC machines, not robot arms.",
     "Digital thread is a marketing term without technical implementation.",
     "Digital thread requires all systems to use the same software vendor.",
     "A digital thread links CAD geometry, process parameters, robot programs, sensor data, and quality records in a traceable chain enabling rapid reprogramming when design changes occur."],
    3,"Traceable data chain from design → robot program → quality record enables rapid reprogramming.",
    "When a part design changes, the digital thread propagates the update to robot OLP, simulation, and quality inspection automatically, reducing reprogramming time from days to hours.",
    "Siemens Teamcenter and PTC Windchill implement digital thread for robotic manufacturing cells."),

  q(3089,"Industrial Robotics","competitive","Research",30,
    "Why does compliant assembly require understanding of part-in-hole jamming and wedging conditions?",
    ["Jamming and wedging are identical failure modes with the same correction.",
     "Jamming only occurs above a critical insertion speed, not related to compliance.",
     "Part geometry does not affect the occurrence of jamming during insertion.",
     "Jamming occurs when lateral forces create moments that lock the peg; wedging occurs at two contact points; understanding these conditions defines the compliance strategy to avoid them."],
    3,"Jamming: lateral force → locking moment; wedging: two-point contact; both require specific compliance strategies.",
    "Whitney jamming analysis: for a cylindrical peg, if the friction cone angle exceeds the contact angle, jamming is inevitable without compliance; Remote Centre Compliance (RCC) avoids both modes.",
    "RCC devices and active impedance controllers are designed based on jamming analysis."),

  q(3090,"Industrial Robotics","competitive","Research",30,
    "What is the role of machine vision calibration in maintaining robot accuracy over time in production?",
    ["Calibration is only performed once at installation and never needs to be repeated.",
     "Vision calibration compensates for all robot mechanical errors without kinematic recalibration.",
     "Thermal expansion has negligible effect on robot accuracy in controlled factory environments.",
     "Periodic hand-eye calibration and robot kinematic recalibration correct drift from thermal expansion, mechanical wear, and vibration, maintaining consistent pick accuracy within production tolerances."],
    3,"Periodic hand-eye + kinematic recalibration corrects drift from thermal and mechanical changes.",
    "Thermal expansion shifts the robot's tool centre point by 0.1-0.5 mm; calibration targets placed in the workcell enable automated recalibration without stopping production for extended periods.",
    "Cognex and Keyence vision systems include automated hand-eye calibration routines for robot guidance."),

  // ── CAD for Robotics (3091-3105) ──────────────────────────
  q(3091,"CAD for Robotics","competitive","Starter",20,
    "What is URDF and what information does it encode for robot simulation?",
    ["URDF is a proprietary Solidworks format for robot CAD drawings.",
     "URDF only encodes visual geometry, not kinematic or inertial properties.",
     "URDF is used exclusively for legged robots, not manipulators.",
     "URDF (Unified Robot Description Format) is an XML format encoding link geometries, joint types, kinematic parameters, inertial properties, and collision meshes for simulation."],
    3,"XML encoding of kinematics, inertia, collision geometry for ROS/Gazebo simulation.",
    "Links contain visual, collision, and inertial elements; joints encode type (revolute, prismatic), axis, limits, and parent-child relationships.",
    "All ROS2 robot packages distribute a URDF for MoveIt, Nav2, and Gazebo compatibility."),

  q(3092,"CAD for Robotics","competitive","Starter",20,
    "What distinguishes SDF (Simulation Description Format) from URDF for robot simulation?",
    ["SDF and URDF are interchangeable with no meaningful differences.",
     "URDF supports world models; SDF only supports single robot descriptions.",
     "SDF is a deprecated format replaced entirely by URDF in ROS2.",
     "SDF supports multiple models, worlds, plugins, and sensors in a single file with richer physics and lighting descriptions than URDF which only describes a single robot kinematic tree."],
    3,"SDF: multi-model world + plugins + sensors; URDF: single robot kinematic tree.",
    "SDF describes complete simulation worlds including terrain, lighting, joints between multiple bodies, and Gazebo plugins; URDF focuses on a single robot for ROS integration.",
    "Gazebo's native format is SDF; ros2_control and MoveIt prefer URDF; gz_ros2_control bridges both."),

  q(3093,"CAD for Robotics","competitive","Starter",20,
    "What is Geometric Dimensioning and Tolerancing (GD&T) and why is it important for robot mechanism design?",
    ["GD&T only specifies surface finish requirements, not geometric tolerances.",
     "GD&T is only applicable to machined parts, not 3D-printed robot components.",
     "GD&T replaces the need for physical inspection of manufactured parts.",
     "GD&T is a symbolic language on engineering drawings that precisely defines allowable geometric variations (flatness, circularity, position) ensuring parts assemble correctly within functional tolerance zones."],
    3,"Symbolic language defining allowable geometric variation ensuring functional assembly.",
    "Without GD&T, tolerance stack-up in robot joint assemblies causes binding, backlash, or interference; GD&T specifies exactly which surfaces must be controlled to maintain kinematic accuracy.",
    "Robot arm link joints specify GD&T position tolerances of ±0.01 mm on bearing bores to ensure smooth rotation."),

  q(3094,"CAD for Robotics","competitive","Starter",20,
    "What is Finite Element Analysis (FEA) and how is it used in robot link structural design?",
    ["FEA only applies to fluid mechanics, not solid robot structures.",
     "FEA can only analyse static loads, not dynamic robot forces.",
     "FEA requires physical prototypes to validate the simulation results.",
     "FEA discretises a link into elements, applies load cases (gravity, payload, dynamic forces), and computes stress/deflection distributions to verify structural integrity and optimise material distribution."],
    3,"FEA: discretise → apply loads → compute stress/deflection → verify/optimise structure.",
    "A robot forearm FEA with worst-case payload at full extension reveals peak von Mises stress locations; wall thickness is increased there and removed where stress is low, reducing mass.",
    "ANSYS and Abaqus are used in robot arm structural design; Fusion 360 Simulation targets lighter analysis tasks."),

  q(3095,"CAD for Robotics","competitive","Starter",20,
    "What is the purpose of a tolerance stack-up analysis in robot assembly design?",
    ["Tolerance stack-up only applies to electronic circuit board assembly, not mechanical robots.",
     "Tolerance analysis assumes all parts are manufactured at their nominal dimension.",
     "Stack-up analysis is performed only after assembly failures occur in production.",
     "Tolerance stack-up analysis quantifies how individual part tolerances accumulate to produce worst-case variation in a critical assembly dimension, ensuring function is maintained."],
    3,"Accumulation of individual tolerances defines worst-case assembly variation.",
    "In a 5-link chain each with ±0.05 mm tolerance, worst-case stack-up is ±0.25 mm; if this exceeds clearance for a bearing race, redesign or tighter tolerances are required.",
    "RSS and worst-case stack-up methods are standard in robot joint assembly design."),

  q(3096,"CAD for Robotics","competitive","Research",30,
    "How does topology optimisation change the structural design process for robot links?",
    ["Topology optimisation always produces heavier designs than conventional beam designs.",
     "Topology optimisation only applies to flat 2D parts, not 3D robot links.",
     "Topology optimisation requires no manufacturing constraints and always produces printable parts.",
     "Topology optimisation computationally removes material from low-stress regions subject to load cases and manufacturing constraints, producing organic minimal-mass structures."],
    3,"Computational material removal in low-stress regions → minimal-mass organic structures.",
    "Given boundary conditions, loads, and volume fraction target, the algorithm redistributes density to minimise compliance; resulting geometry is typically manufactured by metal additive manufacturing.",
    "Boston Dynamics uses topology-optimised titanium links in Atlas; Renishaw prints optimised robot brackets."),

  q(3097,"CAD for Robotics","competitive","Research",30,
    "What is the significance of the DH parameter sign convention and frame assignment?",
    ["DH parameter sign conventions are interchangeable with no effect on the final FK result.",
     "Only the joint angle signs matter; link lengths and offsets are always positive.",
     "Frame assignment errors only affect singularity detection, not forward kinematics.",
     "Inconsistent frame assignments (proximal vs distal, modified vs standard DH) produce different transformation chains; mixing conventions causes systematic pose errors that are hard to debug."],
    3,"Inconsistent DH convention mixing causes systematic pose errors in FK chains.",
    "Standard DH (Craig) and modified DH (Khalil) assign frames differently; a URDF using modified DH constants plugged into standard DH FK code produces systematically wrong poses at every joint.",
    "All major robot manufacturers publish their DH table with explicit convention declarations to prevent this."),

  q(3098,"CAD for Robotics","competitive","Research",30,
    "How does multi-body dynamics simulation in Gazebo/Isaac Sim validate a URDF-based robot before hardware build?",
    ["Simulation validates only kinematics, not dynamics, so inertial parameters are irrelevant.",
     "Gazebo always matches real hardware behaviour with no model errors.",
     "Multi-body simulation is only valid for quasi-static motions, not dynamic operations.",
     "The simulator integrates equations of motion using URDF inertial parameters, applies actuator torque models, and propagates contacts, allowing controller validation on a physics-faithful virtual prototype."],
    3,"Physics-faithful virtual prototype enables controller validation before hardware build.",
    "Inertial parameters (mass, CoM, inertia tensor) from CAD directly populate URDF; the simulator's integrator propagates dynamics; discrepancies reveal model errors before costly hardware prototyping.",
    "NASA and ESA simulate planetary rover designs in multi-body simulators for months before hardware fabrication."),

  q(3099,"CAD for Robotics","competitive","Research",30,
    "What is STEP (ISO 10303) and why is it the preferred format for exchanging robot CAD data?",
    ["STEP is a proprietary Solidworks format not accepted by other CAD tools.",
     "STEP only supports 2D drawing exchange, not 3D solid models.",
     "STEP is less accurate than STL for describing robot link geometries.",
     "STEP is a neutral ISO standard for 3D solid model exchange that preserves geometry, assembly structure, and metadata without loss across different CAD systems."],
    3,"Neutral ISO 3D solid exchange preserving geometry, assembly, and metadata across CAD tools.",
    "STL only stores triangulated surface geometry losing parametric history and assembly structure; STEP preserves B-rep solids enabling downstream FEA, CAM, and URDF generation.",
    "Robot integrators exchange STEP files to import customer CAD into simulation and URDF generators."),

  q(3100,"CAD for Robotics","competitive","Research",30,
    "Why does robot wrist design require careful analysis of kinematic reach and singularity avoidance during the CAD phase?",
    ["Wrist geometry only affects the robot's visual appearance, not kinematic behaviour.",
     "Singularity analysis is performed only after CAD is finalised, not during design.",
     "All 6-DOF wrist designs have identical singularity distributions regardless of link lengths.",
     "Wrist link lengths and offset distances directly determine the dexterous workspace volume and the configuration-space regions near wrist singularities that must be avoided in trajectory planning."],
    3,"Link lengths determine dexterous workspace and singularity regions that constrain trajectory planning.",
    "Shortening the wrist offset reduces the singularity-free workspace; lengthening it increases reach but may increase link mass and vibration; these tradeoffs are evaluated via CAD-integrated workspace analysis.",
    "RoboDK and SolidWorks Robot module compute reachability maps directly from CAD geometry during design."),

  q(3101,"CAD for Robotics","competitive","Research",30,
    "What is the role of Design for Manufacturability (DFM) in reducing robot production costs?",
    ["DFM increases part accuracy by adding more manufacturing steps.",
     "DFM is only relevant for consumer products, not precision robot components.",
     "DFM always reduces part strength to achieve lower manufacturing cost.",
     "DFM modifies part geometry to eliminate undercuts, reduce setup changes, and use standard tooling, reducing machining time, fixturing cost, and inspection requirements for each robot link."],
    3,"Geometry modification eliminates undercuts, reduces setups, uses standard tooling → lower cost.",
    "A robot link with a deep internal cavity requires 5-axis machining; DFM splits it into two machinable halves bonded together, reducing cycle time from 4 hours to 45 minutes.",
    "Derisking through DFM review is standard practice before robot link design freeze in agile hardware development."),

  q(3102,"CAD for Robotics","competitive","Research",30,
    "How does parametric CAD modelling accelerate robot family design iteration?",
    ["Parametric CAD requires manual update of all dimensions when one parameter changes.",
     "Parametric modelling is only useful for 2D drawings, not 3D assemblies.",
     "Parametric models always increase file size making collaboration harder.",
     "Parametric models define geometry through linked equations; changing a master parameter (link length, joint diameter) automatically propagates to all dependent geometry and assembly relationships."],
    3,"Linked equations propagate parameter changes automatically to all dependent geometry.",
    "Changing the forearm length parameter in a parametric robot model automatically updates the URDF, collision mesh, mass estimate, and DH table, reducing iteration from days to hours.",
    "Fusion 360 and CATIA parametric families are used to generate entire robot product lines from a single master model."),

  q(3103,"CAD for Robotics","competitive","Research",30,
    "What is photorealistic rendering used for in robot system CAD and why does it matter for AI training?",
    ["Photorealistic rendering is only for marketing materials, not engineering use.",
     "Synthetic datasets from CAD renders are always inferior to real data for perception training.",
     "Photorealistic rendering requires manufacturing prototypes before rendering is possible.",
     "Photorealistic renders of robot-in-scene CAD models with randomised lighting, textures, and camera parameters generate large labelled synthetic datasets for training perception networks."],
    3,"CAD-based synthetic renders with domain randomisation generate labelled perception training data.",
    "Rendering a robot cell CAD model with randomised object poses, lighting, and camera parameters produces unlimited labelled images; models trained on these transfer to real scenes via domain randomisation.",
    "NVIDIA Isaac Sim and BlenderProc generate synthetic training data from ROS/URDF robot CAD models."),

  q(3104,"CAD for Robotics","competitive","Research",30,
    "Why is cable management a critical mechanical design challenge in robot arm CAD?",
    ["Cables are always routed externally and do not affect robot kinematics.",
     "Cable management is only relevant for high-power industrial robots, not lightweight cobots.",
     "Cable failures in robots are prevented entirely by using wireless power and communication.",
     "Cables routed through joints must accommodate full range of motion without exceeding minimum bend radius, causing fatigue failures, or producing interference with the kinematic chain."],
    3,"Cables must accommodate full joint range without bend radius violation or kinematic interference.",
    "A cable routed through a revolute joint that exceeds its minimum bend radius by ±180° will fatigue-fracture within 10⁶ cycles; through-bore routing, spiral wrapping, and strain relief fittings address this.",
    "Franka Panda and KUKA LBR route power and signal cables through hollow joint bores for clean cable management."),

  q(3105,"CAD for Robotics","competitive","Research",30,
    "What is the advantage of mesh simplification algorithms when converting CAD geometry to robot collision models?",
    ["More triangles always improve collision detection accuracy with no performance cost.",
     "Mesh simplification is only needed for visual rendering, not collision models.",
     "Collision detection performance is independent of mesh triangle count.",
     "Simplified collision meshes with fewer triangles reduce physics engine computation time for collision detection while maintaining sufficient geometric fidelity for accurate contact response."],
    3,"Fewer triangles reduce physics engine computation while maintaining contact fidelity.",
    "A 500k-triangle CAD mesh causes millisecond collision checks; a 200-triangle convex hull approximation reduces this to microseconds with acceptable accuracy for manipulation planning.",
    "V-HACD and Open3D provide convex decomposition used in Gazebo and MoveIt collision models."),

  // ── Power Systems (3106-3120) ─────────────────────────────
  q(3106,"Power Systems","competitive","Starter",20,
    "What is a Battery Management System (BMS) and what critical functions does it perform?",
    ["A BMS only monitors battery temperature without any cell protection functions.",
     "BMS cell balancing equalises cell temperatures, not voltages.",
     "A BMS is only required for lead-acid batteries, not lithium-ion cells.",
     "A BMS monitors cell voltages, temperatures, and currents; enforces charge/discharge limits; performs cell balancing; and estimates state of charge and state of health to protect lithium cells."],
    3,"Monitor + protect + balance + SoC/SoH estimation for lithium cell safety and longevity.",
    "Lithium cells damaged by over-voltage (>4.2 V), under-voltage (<2.5 V), or over-temperature (>60 °C) experience capacity loss or thermal runaway; the BMS enforces all three limits.",
    "All commercial robot battery packs (Boston Dynamics Spot, DJI drones) include integrated BMS circuits."),

  q(3107,"Power Systems","competitive","Starter",20,
    "What is specific energy versus energy density and why do both matter for mobile robot battery selection?",
    ["Specific energy and energy density are identical metrics expressed in different units.",
     "Energy density matters only for stationary robots; specific energy only for mobile ones.",
     "Higher specific energy always means higher energy density for any battery chemistry.",
     "Specific energy (Wh/kg) governs operational endurance per unit mass; energy density (Wh/L) governs energy per volume; mobile robots must optimise both."],
    3,"Wh/kg governs endurance per mass; Wh/L governs energy per volume; mobile robots need both high.",
    "A drone optimises specific energy (Wh/kg) because every gram reduces flight time; a tight-chassis ground robot optimises energy density (Wh/L) because volume is limited.",
    "Li-Po (250 Wh/kg, 700 Wh/L) outperforms NiMH (100 Wh/kg, 300 Wh/L) on both metrics for mobile robots."),

  q(3108,"Power Systems","competitive","Starter",20,
    "What is regenerative braking and how does it benefit robot joint energy efficiency?",
    ["Regenerative braking only works for wheeled mobile robots, not robot arm joints.",
     "Regenerative braking increases motor heat dissipation compared to friction braking.",
     "Regenerative braking requires supercapacitors and cannot charge lithium batteries directly.",
     "Regenerative braking converts kinetic energy during deceleration back into electrical energy by operating the motor as a generator, reducing net energy consumption per motion cycle."],
    3,"Motor-as-generator during deceleration recovers kinetic energy → lower net consumption.",
    "A robot arm decelerating a heavy payload converts joint kinetic energy into electrical charge returned to the bus; without regeneration this energy is dissipated as heat in braking resistors.",
    "KUKA's KR AGILUS and ABB IRB robots recover braking energy back to the DC bus for use by other joints."),

  q(3109,"Power Systems","competitive","Starter",20,
    "Why is a BLDC motor preferred over a brushed DC motor for robot joint actuation?",
    ["Brushed DC motors produce higher torque than BLDC motors at all speeds.",
     "BLDC motors require no electronic commutation, making them simpler to control.",
     "Brushed DC motors are preferred for robot joints because they are cheaper to drive.",
     "BLDC motors have no brushes to wear, operate at higher efficiency, tolerate higher speeds, and produce less electromagnetic interference while delivering comparable torque."],
    3,"No brush wear + higher efficiency + lower EMI + higher speed for same frame size.",
    "Brush friction and wear limit brushed motor lifespan to millions of commutations; BLDC electronic commutation via Hall sensors or encoders enables billions of cycles.",
    "Dynamixel, Maxon EC, and T-Motor BLDC servos power collaborative robot joints."),

  q(3110,"Power Systems","competitive","Starter",20,
    "What is the C-rate of a battery and how does it affect robot peak current capability?",
    ["C-rate measures battery temperature rise during discharge, not current capability.",
     "A higher C-rate means the battery lasts longer at the same power level.",
     "C-rate is only relevant for charging, not discharging in robot applications.",
     "C-rate defines charge/discharge current as a multiple of capacity (1C = full discharge in 1 hour); high-C-rate cells sustain robot peak currents during aggressive manoeuvres without voltage sag."],
    3,"C-rate = current multiple of capacity; high C-rate sustains peak currents without voltage sag.",
    "A 5 Ah cell at 10C can deliver 50 A continuously; during a jump or sprint manoeuvre a legged robot may demand 20× nominal current; low-C-rate cells sag in voltage causing controller shutdown.",
    "LiPo packs rated 30-100C are used in high-performance UAVs and racing robots."),

  q(3111,"Power Systems","competitive","Research",30,
    "How does EKF-based SoC estimation improve upon simple voltage-based methods?",
    ["Voltage-based SoC is always more accurate than EKF because it requires no model.",
     "EKF SoC estimation requires laboratory coulometry for every battery cycle.",
     "Voltage-based SoC is only inaccurate below 10% charge; EKF provides no benefit above 20%.",
     "EKF SoC estimation fuses open-circuit voltage, current integration, and a battery equivalent-circuit model to correct drift and account for temperature and aging effects."],
    3,"EKF fuses voltage + current + model to correct integration drift and temperature/aging effects.",
    "Open-circuit voltage varies less than 0.1 V across 50-80% SoC making voltage lookup ambiguous; EKF propagates SoC through a Thevenin equivalent circuit model correcting for self-discharge and temperature.",
    "Texas Instruments bq34z100 and Maxim DS2780 implement EKF-based SoC for robot battery packs."),

  q(3112,"Power Systems","competitive","Research",30,
    "What is a DC-DC converter's role in a multi-voltage robot power architecture and why is synchronous rectification preferred?",
    ["DC-DC converters only step voltage up, never down, in robot systems.",
     "Synchronous rectification increases switching losses, making it unsuitable for high-frequency converters.",
     "Linear regulators are preferred over DC-DC converters in high-current robot power systems.",
     "DC-DC converters step voltage levels from the battery bus to logic and motor driver rails; synchronous rectification replaces diodes with MOSFETs, reducing conduction losses by 10×."],
    3,"Voltage level conversion; synchronous rectification (MOSFET vs diode) reduces conduction losses 10×.",
    "Schottky diode drop 0.3-0.5 V × 10 A = 3-5 W loss per rail; synchronous MOSFET R_DS(on) × I² may be 10× lower; critical for battery life in robots with many rails.",
    "Texas Instruments LMR33630 and Infineon IFX27001 synchronous buck converters power robot SBCs and sensors."),

  q(3113,"Power Systems","competitive","Research",30,
    "Why does thermal management critically affect peak power delivery in robot motor drives?",
    ["Motor drive performance is independent of temperature below 100 °C.",
     "Thermal management is only needed for drives above 1 kW, not small robot joint drives.",
     "Increasing switching frequency always reduces drive temperature.",
     "MOSFET junction temperature rise increases R_DS(on) and causes derating; thermal runaway can permanently damage the drive; adequate heatsinking and thermal throttling maintain rated peak torque."],
    3,"Junction temperature rise → R_DS(on) increase + derating; thermal runaway risks permanent damage.",
    "At 150 °C junction temperature, MOSFET R_DS(on) doubles vs 25 °C; drive efficiency drops and current limiting kicks in; sustained peak torque demands adequate thermal path from junction to ambient.",
    "Field-installed cobots with enclosed drives use liquid cooling or phase-change thermal interface materials for sustained peak torque."),

  q(3114,"Power Systems","competitive","Research",30,
    "How do supercapacitors complement lithium batteries in pulsed-power robot applications?",
    ["Supercapacitors have higher energy density than lithium batteries, making them suitable as primary energy sources.",
     "Supercapacitors are only used for backup power, not peak-power buffering.",
     "Combining supercapacitors with lithium batteries always reduces total system energy.",
     "Supercapacitors have very high power density and cycle life, absorbing and delivering current spikes during robot jumps or rapid arm accelerations that would otherwise stress and degrade lithium cells."],
    3,"High power density + unlimited cycles absorbs current spikes protecting lithium cells.",
    "Lithium cells have limited C-rate; supercapacitors (1000+ F, 100+ C-rate) buffer transient currents; the battery provides average power while the supercapacitor handles peaks.",
    "Boston Dynamics Atlas uses supercapacitor buffers for jump and recovery manoeuvres to protect battery health."),

  q(3115,"Power Systems","competitive","Research",30,
    "What is wireless power transfer (WPT) and what constraints does it impose on autonomous robot charging?",
    ["WPT achieves 100% efficiency at all misalignment distances.",
     "WPT requires direct metallic contact and is identical to conductive charging.",
     "WPT is only practical for stationary industrial robots, not mobile platforms.",
     "WPT uses resonant inductive coupling to transfer power without physical connectors enabling autonomous docking charging, but requires precise coil alignment (<10 mm) and accepts ~85-93% efficiency."],
    3,"Resonant inductive coupling: no connector but requires <10 mm alignment and accepts ~85-93% efficiency.",
    "Misalignment reduces coupling coefficient k dramatically; coil area and frequency determine power level; 85-93% efficiency vs 98% for conductive charging represents measurable battery heating.",
    "iRobot Roomba and Clearpath Jackal use inductive WPT for autonomous return-to-dock charging."),

  q(3116,"Power Systems","competitive","Research",30,
    "How does motor field-weakening extend robot joint speed range beyond rated base speed?",
    ["Field-weakening increases both torque and speed simultaneously above base speed.",
     "Field-weakening only applies to induction motors, not BLDC or PMSM motors used in robots.",
     "Reducing flux above base speed always reduces motor efficiency to below 50%.",
     "Field-weakening reduces the d-axis flux current above base speed, trading torque for higher RPM while keeping terminal voltage within inverter limits, extending the constant-power region."],
    3,"Reduce d-axis flux → higher RPM within voltage limit at reduced torque.",
    "At base speed back-EMF equals inverter voltage ceiling; reducing field current lowers back-EMF allowing higher speed; torque is reduced proportionally maintaining constant power.",
    "Field-weakening in PMSM robot drives extends velocity range 3-5× beyond base speed for high-speed joint trajectories."),

  q(3117,"Power Systems","competitive","Research",30,
    "What is the effect of battery internal resistance on robot performance during high-current manoeuvres?",
    ["Internal resistance only affects battery temperature, not terminal voltage.",
     "Internal resistance decreases during high-current discharge, providing more voltage.",
     "Under-voltage shutdowns triggered by internal resistance sag only occur below 5% SoC.",
     "High internal resistance causes voltage sag (V = V_OC - I·R_int) during peak current draws, reducing available motor bus voltage and potentially triggering under-voltage protection shutdowns."],
    3,"Voltage sag V = V_OC - I·R_int reduces bus voltage → limits peak torque at high currents.",
    "A 100 mΩ internal resistance at 50 A peak causes 5 V sag on a 48 V bus; if motor controller minimum voltage is 44 V, sag triggers shutdown mid-manoeuvre.",
    "Parallel cell configurations reduce effective internal resistance for high-power robot battery packs."),

  q(3118,"Power Systems","competitive","Research",30,
    "How does power hardware-in-the-loop (P-HIL) testing validate robot motor drive designs?",
    ["P-HIL is a software-only simulation with no physical hardware involved.",
     "P-HIL testing is only applicable to motor drives above 10 kW.",
     "P-HIL requires a complete physical robot build before testing can commence.",
     "P-HIL replaces the physical load with a real-time simulation of mechanical robot dynamics interfaced through a power amplifier, testing drive behaviour under realistic loading without a physical robot."],
    3,"Real-time mechanical simulation via power amplifier tests drive under realistic loads without physical robot.",
    "The power amplifier emulates joint inertia, friction, and contact forces at hardware speed; the drive under test responds as if connected to the real robot, enabling full fault injection and edge-case testing.",
    "OPAL-RT and NI VeriStand platforms implement P-HIL for robot drive validation programs."),

  q(3119,"Power Systems","competitive","Research",30,
    "Why is galvanic isolation critical in robot motor drive power stages?",
    ["Galvanic isolation reduces motor efficiency by adding transformer losses.",
     "Isolation is only needed for drives above 1000 V, not low-voltage robot drives.",
     "Robot motor drives and communication hardware always share a common ground safely.",
     "Galvanic isolation blocks DC ground loops and high-voltage transients from motor PWM switching from coupling into sensitive microcontroller and communication hardware."],
    3,"Isolation blocks PWM transients and ground loops from coupling into sensitive communication hardware.",
    "Motor switching transients (dV/dt > 10 kV/µs) couple capacitively into signal ground; isolated gate drivers, isolated CAN transceivers, and optocouplers break this coupling path.",
    "Texas Instruments ISO7741 and Analog Devices ADuM3442 isolated gate drivers are standard in robot servo drives."),

  q(3120,"Power Systems","competitive","Research",30,
    "How does dynamic power allocation between multiple robot joints improve overall energy efficiency?",
    ["All robot joints always receive equal power allocation regardless of motion demands.",
     "Dynamic power allocation only benefits mobile robots, not fixed-arm manipulators.",
     "Throttling lower-priority joints causes trajectory errors that outweigh energy savings.",
     "A centralised power supervisor monitors per-joint current demand and allocates bus current priority to high-priority joints while throttling low-priority joints, preventing total bus overcurrent."],
    3,"Centralised supervisor allocates bus current priority → prevents overcurrent and reduces peak battery draw.",
    "During a pick-and-place, the shoulder joint demands 80% of peak bus current during lift; elbow and wrist joints are throttled to 30%; this 2× reduction in peak current halves I²R losses in cables and BMS.",
    "HEBI Robotics and Kinova smart servo modules implement per-joint power telemetry for centralised power management."),

  // ── Deep Learning Robotics (3121-3135) ────────────────────
  q(3121,"Deep Learning Robotics","competitive","Starter",20,
    "What is imitation learning and how does it differ from reinforcement learning?",
    ["Imitation learning requires more environment interactions than RL for the same skill.",
     "RL always outperforms imitation learning for robot manipulation tasks.",
     "Imitation learning and RL are identical when the reward equals the expert's action.",
     "Imitation learning learns policies directly from expert demonstrations without a reward function; RL learns from trial-and-error guided by a reward signal that must be engineered."],
    3,"Policy from demonstrations without reward engineering vs trial-and-error with reward.",
    "Imitation learning (BC, DAgger, GAIL) requires expert trajectories not reward design; RL requires a reward function which is often hard to specify for complex manipulation.",
    "ACT, Diffusion Policy, and BC on human teleoperation data are state-of-the-art imitation learning approaches."),

  q(3122,"Deep Learning Robotics","competitive","Starter",20,
    "What is the role of data augmentation in training robust robot perception models?",
    ["Data augmentation reduces model accuracy by adding noise to training labels.",
     "Data augmentation is only effective for object detection, not semantic segmentation.",
     "Data augmentation replaces the need for real robot data entirely.",
     "Data augmentation applies random transformations (crop, flip, colour jitter, noise) to training images, increasing apparent dataset size and teaching invariance to irrelevant visual variations."],
    3,"Random transforms increase effective dataset size and teach invariance to irrelevant variations.",
    "A robot trained only on lab lighting fails outdoors; augmenting with brightness jitter, shadows, and sensor noise teaches the model to be invariant to these factors.",
    "RandAugment and AutoAugment policies are standard in robot perception training pipelines."),

  q(3123,"Deep Learning Robotics","competitive","Starter",20,
    "What is transfer learning and why is it valuable for robot perception with limited labelled data?",
    ["Transfer learning requires retraining all layers from random initialisation on the robot dataset.",
     "Transfer learning only works between tasks in the same domain.",
     "Transfer learning reduces model accuracy because pre-training introduces bias.",
     "Transfer learning fine-tunes a model pre-trained on a large generic dataset (ImageNet) on a small robot-specific dataset, leveraging shared low-level features to achieve high accuracy."],
    3,"Fine-tune large pre-trained model on small robot dataset leveraging shared low-level features.",
    "ImageNet pre-trained features (edges, textures, shapes) are universally useful; fine-tuning only the last layers on 1000 robot-specific images achieves 90%+ accuracy vs 60% from scratch.",
    "PyTorch torchvision and Hugging Face provide pre-trained robot-deployable vision backbones."),

  q(3124,"Deep Learning Robotics","competitive","Starter",20,
    "What is the sim-to-real gap and what causes it in deep learning robot policies?",
    ["The sim-to-real gap only affects vision-based policies, not proprioceptive controllers.",
     "Perfect physics simulators eliminate the sim-to-real gap entirely.",
     "The sim-to-real gap is larger for simpler tasks than for complex manipulation.",
     "The sim-to-real gap is the performance degradation when a policy trained in simulation is deployed on real hardware, caused by differences in physics, sensor noise, actuation dynamics, and visual appearance."],
    3,"Performance degradation from sim-to-real caused by physics, sensing, actuation, and visual discrepancies.",
    "Simulated contacts are stiff and noise-free; real contacts have compliance, slip, and force noise; visual textures in simulation differ from real materials.",
    "Domain randomisation, system identification, and real-data fine-tuning are the primary mitigation strategies."),

  q(3125,"Deep Learning Robotics","competitive","Starter",20,
    "What is a convolutional neural network (CNN) and why is it suited for robot visual perception?",
    ["CNNs process images as flat vectors without exploiting spatial structure.",
     "CNNs are only suitable for 1D time-series data, not 2D images.",
     "CNNs require manually designed feature extractors and do not learn features automatically.",
     "CNNs apply learnable filters that detect local spatial features in a translation-equivariant manner, efficiently processing high-dimensional image inputs for classification and detection."],
    3,"Learnable local spatial filters + translation equivariance → efficient image feature extraction.",
    "Shared convolutional weights reduce parameters vs fully connected; pooling provides spatial invariance; hierarchical features from edges to objects emerge through depth.",
    "ResNet, EfficientNet, and MobileNet CNN backbones power robot object detection and semantic segmentation."),

  q(3126,"Deep Learning Robotics","competitive","Research",30,
    "How does the Diffusion Policy represent robot action distributions and why does it outperform Gaussian mixture policies for multimodal tasks?",
    ["Diffusion Policy only models unimodal Gaussian action distributions.",
     "Gaussian mixture policies always outperform diffusion models for robot manipulation.",
     "Diffusion Policy requires 100× more computation than Gaussian policies with no accuracy benefit.",
     "Diffusion Policy models the action distribution as a denoising diffusion process, iteratively refining a noisy action sample into a clean action, capturing complex multimodal distributions that GMMs truncate."],
    3,"Denoising diffusion captures complex multimodal action distributions that GMMs truncate.",
    "For tasks with multiple valid solutions (place object left or right), GMM averages between modes producing a wrong action; diffusion samples from the full distribution preserving all modes.",
    "Chi et al (RSS 2023) showed Diffusion Policy outperforms BC and GAIL on multimodal manipulation benchmarks."),

  q(3127,"Deep Learning Robotics","competitive","Research",30,
    "What is Action Chunking with Transformers (ACT) and how does it reduce compounding errors?",
    ["ACT increases compounding errors by predicting multiple steps at once.",
     "ACT replaces transformers with LSTMs for lower-latency action prediction.",
     "Action chunking is only beneficial for tasks longer than 10 seconds.",
     "ACT predicts a chunk of future actions as a single transformer output, reducing the number of autoregressive steps and the associated compounding error accumulation."],
    3,"Predicting action chunks reduces autoregressive compounding error vs step-by-step prediction.",
    "Each autoregressive step accumulates small prediction errors; predicting K steps jointly makes only 1/K autoregressive decisions per trajectory, reducing total error accumulation.",
    "Zhao et al (RSS 2023) ACT achieved state-of-the-art on bimanual manipulation from 50 human demonstrations."),

  q(3128,"Deep Learning Robotics","competitive","Research",30,
    "Why do robot learning systems require uncertainty quantification and how does Monte Carlo dropout provide it?",
    ["Uncertainty quantification is only needed during training, not at deployment.",
     "MC dropout provides aleatoric, not epistemic, uncertainty estimates.",
     "A single deterministic forward pass provides sufficient uncertainty information.",
     "MC dropout applies dropout at test time and averages multiple stochastic forward passes, estimating epistemic uncertainty from prediction variance to trigger safe fallbacks when inputs are out-of-distribution."],
    3,"MC dropout at test time: variance across stochastic passes estimates epistemic uncertainty.",
    "Enabling dropout at inference and averaging N forward passes produces a distribution; high variance indicates out-of-distribution input where the policy may fail.",
    "Safe robot systems (surgical, nuclear) use MC dropout uncertainty to halt autonomous operation when confidence is low."),

  q(3129,"Deep Learning Robotics","competitive","Research",30,
    "How does self-supervised pre-training on robot video improve downstream manipulation learning?",
    ["Self-supervised pre-training requires labelled robot action data to be useful.",
     "Pre-trained representations from natural image datasets always outperform robot video pre-training.",
     "Self-supervised pre-training only helps for navigation tasks, not manipulation.",
     "Pre-training a visual encoder on large unlabelled robot video datasets using masked autoencoding or contrastive objectives learns rich visual representations that fine-tune efficiently with few labelled demonstrations."],
    3,"Unlabelled robot video pre-training learns task-relevant representations that fine-tune efficiently.",
    "Natural image representations encode object category; robot video representations additionally encode object affordances, motion, and contact relevant for manipulation.",
    "R3M and MVP pre-train on Ego4D human video then fine-tune on robot demonstrations with 10× fewer labels."),

  q(3130,"Deep Learning Robotics","competitive","Research",30,
    "What is flow matching and how does it relate to diffusion models for robot policy learning?",
    ["Flow matching and diffusion models are identical algorithms with different names.",
     "Flow matching is less expressive than diffusion models for multimodal distributions.",
     "Flow matching requires 100 neural function evaluations per action sample like diffusion.",
     "Flow matching learns a continuous normalising flow from noise to data by regressing a vector field that transports probability mass along straight paths; it is faster to sample than diffusion."],
    3,"Straight-path ODE transport of probability mass is faster to sample than diffusion SDE.",
    "Diffusion models use hundreds of denoising steps; flow matching regresses straight OT paths requiring far fewer NFEs (5-10) during sampling with comparable distribution quality.",
    "π₀ and GROOT robot policies use flow matching action heads for real-time 50 Hz control."),

  q(3131,"Deep Learning Robotics","competitive","Research",30,
    "Why does the choice of observation representation critically affect deep learning robot policy performance?",
    ["Pixel-only policies always outperform multi-modal policies because CNNs are expressive enough.",
     "Proprioception alone is sufficient for all contact-rich manipulation tasks.",
     "Point cloud policies are always slower and less accurate than pixel policies.",
     "Each modality captures different information: pixels encode scene appearance, proprioception encodes robot state, point clouds encode 3D geometry; missing a relevant modality creates information bottlenecks."],
    3,"Each modality captures distinct information; missing relevant modality creates performance bottleneck.",
    "For contact-rich insertion, force/torque data is critical; for long-horizon planning, scene semantics from pixels help; combining modalities with appropriate encoders achieves best performance.",
    "OpenVLA uses pixel+language; Diffusion Policy uses pixel; ACT uses pixel+proprio; each optimised for different task classes."),

  q(3132,"Deep Learning Robotics","competitive","Research",30,
    "What is residual policy learning and when is it beneficial for robot control?",
    ["Residual policies always outperform pure model-based controllers on all tasks.",
     "Residual policies replace the nominal controller entirely once training converges.",
     "Residual learning is only beneficial when the nominal controller already achieves 100% success.",
     "Residual policy learning trains a neural network to output a small corrective action added to a nominal model-based controller, combining model efficiency with learned adaptation to model errors."],
    3,"Neural correction atop nominal controller combines model efficiency with learned adaptation.",
    "The nominal controller handles the bulk of the task; the residual network corrects systematic errors due to model mismatch or unmodelled contacts; this requires far less data than learning from scratch.",
    "Silver et al showed residual RL fine-tuning on a model-predictive base controller achieves robust insertion with 10× less data than pure RL."),

  q(3133,"Deep Learning Robotics","competitive","Research",30,
    "How does curriculum learning improve the training efficiency of deep learning robot policies?",
    ["Curriculum learning always requires manual design of every difficulty level.",
     "Curriculum learning is only beneficial for tasks with dense rewards, not sparse ones.",
     "Presenting all difficulty levels randomly from the start always outperforms curriculum.",
     "Curriculum learning presents progressively harder task instances, reducing the probability of sparse-reward training failure and guiding the policy toward the complex task region."],
    3,"Progressive difficulty reduces sparse-reward failure and guides policy toward complex task region.",
    "Starting a grasp policy with large object and short distance, then reducing object size and increasing distance, avoids the zero-reward regime that stalls random-exploration RL.",
    "OpenAI Dexterous Hand and DeepMind Playroom use automatic curriculum generation for complex manipulation."),

  q(3134,"Deep Learning Robotics","competitive","Research",30,
    "What is the role of a world model in model-based deep reinforcement learning for robot planning?",
    ["A world model replaces the robot dynamics model entirely for all control tasks.",
     "World models are only useful for video game environments, not physical robot tasks.",
     "World models require perfect prediction to provide any planning benefit.",
     "A world model is a neural network that predicts future observations and rewards from current state and action, enabling the RL agent to plan by imagining trajectories in latent space."],
    3,"Imagined trajectory planning in latent space reduces real environment interactions needed.",
    "Dreamer-V3 plans in the latent space of a recurrent world model; the policy is trained entirely on imagined data; real robot interactions only update the world model.",
    "World model-based approaches achieve 10-100× sample efficiency vs model-free RL on robot locomotion."),

  q(3135,"Deep Learning Robotics","competitive","Research",30,
    "Why does the choice of loss function critically affect the calibration of deep learning robot perception outputs?",
    ["All loss functions produce equally calibrated outputs when trained on enough data.",
     "MSE loss always produces better-calibrated outputs than cross-entropy for classification.",
     "Calibration only matters for offline analysis, not online robot safety decisions.",
     "Cross-entropy loss with temperature scaling produces calibrated probability outputs; MSE regression losses produce overconfident predictions; calibrated outputs are essential for safe robot decisions."],
    3,"Cross-entropy + temperature scaling produces calibrated probabilities; MSE produces overconfident predictions.",
    "An overconfident perception model assigns 99% probability to incorrect classifications; a calibrated model assigns probabilities matching empirical accuracy, enabling reliable safety thresholds.",
    "Platt scaling and temperature scaling post-hoc calibration are standard for safety-critical robot perception models."),

  // ── Sensors (3136-3150) ───────────────────────────────────
  q(3136,"Sensors","competitive","Starter",20,
    "What is the working principle of a solid-state LiDAR and how does it differ from a spinning mechanical LiDAR?",
    ["Solid-state LiDAR spins faster than mechanical LiDAR, achieving wider coverage.",
     "Mechanical LiDAR has no moving parts, unlike solid-state designs.",
     "Solid-state LiDAR uses sound waves, not laser pulses, for ranging.",
     "Solid-state LiDAR uses MEMS mirrors, optical phased arrays, or flash illumination to steer the beam without rotating parts, achieving smaller size and higher reliability at the cost of limited FoV."],
    3,"No rotating parts (MEMS/OPA/flash) → smaller, more reliable but limited FoV.",
    "Spinning LiDARs (Velodyne HDL-64E) achieve 360° FoV via mechanical rotation; solid-state designs (Livox, Luminar Iris) use beam steering without bearings for higher MTBF.",
    "Solid-state LiDARs are preferred for automotive series production due to vibration resistance."),

  q(3137,"Sensors","competitive","Starter",20,
    "What is an IMU and what quantities does it typically measure?",
    ["An IMU measures GPS position and barometric altitude.",
     "An IMU only measures angular velocity, not linear acceleration.",
     "An IMU measures wheel encoder counts and converts them to velocity.",
     "An IMU measures linear acceleration (accelerometer, 3 axes) and angular velocity (gyroscope, 3 axes); some units include a magnetometer adding 3 more axes for 9-DOF measurement."],
    3,"Accelerometer (3-axis linear accel) + gyroscope (3-axis angular vel) + optional magnetometer.",
    "The accelerometer measures specific force (gravity + linear acceleration); the gyroscope integrates to attitude; fusing both with a filter (EKF, UKF) produces pose estimates.",
    "Bosch BMI088, STMicroelectronics LSM6DSO, and VectorNav VN-100 are IMUs used in robot platforms."),

  q(3138,"Sensors","competitive","Starter",20,
    "What distinguishes a strain gauge force sensor from a piezoelectric force sensor?",
    ["Piezoelectric sensors measure both static and dynamic forces equally well.",
     "Strain gauges can only measure compressive forces, not tensile or shear.",
     "Piezoelectric sensors have lower bandwidth than strain gauge sensors.",
     "Strain gauges measure static and quasi-static forces via resistance change from elastic deformation; piezoelectric sensors measure dynamic forces via charge generation but cannot sense static loads."],
    3,"Strain gauge: DC + quasi-static via resistance change; piezo: AC only via charge generation.",
    "A piezoelectric sensor generates charge proportional to strain rate; holding a constant force produces zero output as the charge dissipates; strain gauge Wheatstone bridges maintain DC output.",
    "ATI Gamma and Robotiq FT 300 use strain gauge Wheatstone bridges for wrist force/torque sensing."),

  q(3139,"Sensors","competitive","Starter",20,
    "What is the purpose of a rotary encoder in robot joint control and what distinguishes absolute from incremental?",
    ["Absolute encoders require homing; incremental encoders do not.",
     "Rotary encoders measure joint torque, not position.",
     "Incremental encoders always have higher resolution than absolute encoders.",
     "Rotary encoders measure joint angle position; absolute encoders output a unique code for every angular position (no homing needed); incremental encoders count pulses requiring a homing routine after power-up."],
    3,"Absolute: unique code per position (no homing); incremental: count pulses (homing required).",
    "After a power loss an incremental encoder loses position reference requiring a homing move to a known limit switch; an absolute encoder retains position even after power-off.",
    "Franka Panda uses absolute encoders on all joints enabling zero-homing startup."),

  q(3140,"Sensors","competitive","Starter",20,
    "What is depth-from-stereo and what determines its depth resolution?",
    ["Stereo depth resolution is independent of camera baseline.",
     "Stereo cameras work without a known baseline distance between cameras.",
     "Larger baseline always degrades stereo depth accuracy.",
     "Stereo triangulates depth from the horizontal disparity between left and right camera images; depth resolution scales as Z² × (pixel pitch)/(baseline × focal length)."],
    3,"Disparity triangulation; resolution ∝ Z²/(baseline × focal length).",
    "Disparity error of 1 pixel at Z=1 m with 10 cm baseline and 500 px focal length gives 2 mm depth error; at Z=5 m the same pixel error gives 50 mm depth error (Z² scaling).",
    "Intel RealSense D435 uses a 5 cm baseline achieving ~1 mm depth accuracy at 1 m."),

  q(3141,"Sensors","competitive","Research",30,
    "Why do radar sensors provide advantages over LiDAR in adverse weather and what Doppler capability do they add?",
    ["Radar is less affected by weather than LiDAR but cannot measure target velocity.",
     "LiDAR outperforms radar in all adverse weather conditions including heavy rain.",
     "Radar provides higher angular resolution than LiDAR for the same aperture size.",
     "Radar millimetre waves penetrate fog, rain, and dust with low attenuation while Doppler frequency shift directly measures radial velocity of targets — capabilities absent in LiDAR and cameras."],
    3,"mm-wave penetrates weather + Doppler = direct radial velocity from a single scan.",
    "LiDAR attenuation in heavy rain (200 mm/hr) exceeds 10 dB/km; 77 GHz radar attenuation is <0.1 dB/km; Doppler shift Δf=2v/λ gives velocity without temporal differencing.",
    "Automotive AV stacks use 77 GHz FMCW radar for all-weather velocity-aware detection."),

  q(3142,"Sensors","competitive","Research",30,
    "How does a structured light 3D sensor differ from a time-of-flight camera and in what robot applications is each preferred?",
    ["Structured light and ToF sensors use identical principles with different wavelengths.",
     "ToF cameras have higher spatial resolution than structured light sensors at all ranges.",
     "Structured light sensors work outdoors under bright sunlight as well as ToF.",
     "Structured light projects known patterns and measures deformation for high-accuracy close-range geometry; ToF measures per-pixel travel time for fast full-scene depth at longer range with lower accuracy."],
    3,"Structured light: high-accuracy close-range pattern deformation; ToF: fast full-scene depth at longer range.",
    "Structured light (0.01 mm accuracy) suits precision assembly inspection; ToF (Intel RealSense L515) suits robot navigation where speed and range matter more than sub-mm accuracy.",
    "Structured light dominates quality inspection; ToF dominates mobile robot navigation."),

  q(3143,"Sensors","competitive","Research",30,
    "What is the noise spectral density of a MEMS accelerometer and how does it affect dead-reckoning accuracy?",
    ["Noise spectral density does not affect dead-reckoning; only bias affects integration.",
     "Higher noise spectral density leads to more accurate dead-reckoning via averaging.",
     "Noise spectral density only affects high-frequency vibration sensing, not dead-reckoning.",
     "Noise spectral density (µg/√Hz) integrated over the IMU bandwidth determines velocity random walk; lower NSD means slower drift allowing longer accurate dead-reckoning between GPS fixes."],
    3,"NSD × √BW = velocity random walk; lower NSD → slower drift between corrections.",
    "At 50 µg/√Hz with 1 kHz bandwidth, RMS noise = 50µg × √1000 ≈ 1.6 mg; double-integrated over 1 s gives ~8 µm position error; over 60 s this grows to ~30 mm.",
    "Navigation-grade IMUs (< 1 µg/√Hz) maintain sub-metre accuracy over minutes; MEMS IMUs require frequent GPS corrections."),

  q(3144,"Sensors","competitive","Research",30,
    "Why do tactile sensor arrays require specialised signal processing different from force/torque sensors?",
    ["Tactile arrays are processed identically to 6-axis force/torque sensors.",
     "Tactile sensors only measure normal force; shear forces require separate sensors.",
     "Tactile arrays have lower spatial resolution than 6-axis F/T sensors.",
     "Tactile arrays produce high-dimensional spatially distributed pressure images requiring contact localisation, shape estimation, slip detection, and texture classification algorithms."],
    3,"Distributed pressure images require localisation, shape estimation, slip detection, and texture classification.",
    "A 16×16 tactile array produces 256 channels per frame at 1 kHz; slip detection requires temporal gradient analysis; object shape estimation uses pressure centroid tracking.",
    "SynTouch BioTac and XELA Robotics uSkin provide high-density tactile arrays for dexterous manipulation research."),

  q(3145,"Sensors","competitive","Research",30,
    "How does barometric pressure sensing complement GPS altitude estimation in aerial robot navigation?",
    ["GPS altitude is more accurate than barometric altitude for all hover manoeuvres.",
     "Barometric sensors measure absolute altitude with higher accuracy than GPS.",
     "Barometric sensors are only used for weather forecasting, not robot navigation.",
     "Barometric sensors provide high-rate, low-noise relative altitude changes at 100+ Hz with <0.1 m resolution; GPS altitude has high noise (>2 m) and low update rate (1-10 Hz), making barometric-GPS fusion optimal."],
    3,"Barometer: high-rate <0.1 m relative change; GPS altitude: noisy + slow → fusion optimal.",
    "Barometer measures differential pressure ΔP proportional to Δh; its noise is <0.01 hPa (~0.1 m); GPS altitude error is typically 3-5 m; EKF fusion gives sub-0.5 m altitude accuracy.",
    "All commercial UAV autopilots (PX4, ArduPilot) fuse barometer and GPS altitude in the EKF estimator."),

  q(3146,"Sensors","competitive","Research",30,
    "What is the Allan deviation and why is it used to characterise IMU noise and bias stability?",
    ["Allan deviation only measures IMU temperature sensitivity.",
     "Allan deviation is identical to power spectral density and provides no additional information.",
     "Allan deviation is only applicable to gyroscopes, not accelerometers.",
     "Allan deviation plots RMS error vs averaging time revealing distinct noise sources: angle random walk (slope -0.5), bias instability (slope 0), and rate random walk (slope +0.5)."],
    3,"Log-log plot reveals angle random walk, bias instability, and rate random walk as distinct slopes.",
    "ARW determines short-term attitude noise; bias instability is the minimum achievable error through averaging; RRW limits long-term integration; navigation system design matches IMU quality to mission duration.",
    "IEEE 647 and IEEE 1554 specify Allan deviation characterisation procedures for inertial sensor evaluation."),

  q(3147,"Sensors","competitive","Research",30,
    "How does extrinsic sensor calibration differ from intrinsic calibration and why must both be performed?",
    ["Extrinsic calibration is sufficient; intrinsic parameters are fixed at manufacture and never drift.",
     "Intrinsic calibration is only needed for cameras, not LiDAR or IMU.",
     "Extrinsic and intrinsic calibration are performed simultaneously in a single procedure.",
     "Intrinsic calibration determines each sensor's internal model (focal length, IMU bias, LiDAR point transform); extrinsic calibration determines the rigid transform between sensor frames; fusion requires both."],
    3,"Intrinsic: per-sensor internal model; extrinsic: inter-sensor rigid transform; both needed for common-frame fusion.",
    "Fusing camera and LiDAR: camera intrinsics (K, distortion) from checkerboard; extrinsic T_cam_lidar from target-based or targetless calibration; errors in either degrade 3D-to-pixel projection accuracy.",
    "Kalibr and target-based LiDAR-camera calibration toolboxes estimate both intrinsic and extrinsic parameters jointly."),

  q(3148,"Sensors","competitive","Research",30,
    "What is a phase-sensitive detector (lock-in amplifier) and how does it improve SNR in robot proximity sensing?",
    ["Lock-in amplifiers are only used in laboratory instruments, not embedded robot sensors.",
     "Lock-in detection reduces signal strength as well as noise, making it unsuitable for weak signals.",
     "Phase-sensitive detection is equivalent to simple low-pass filtering with no SNR advantage.",
     "A lock-in amplifier multiplies the sensor signal by a reference sine wave and low-pass filters the product, recovering signals at the reference frequency buried in broadband noise with SNR improvement of √(BW_total / BW_lock-in)."],
    3,"Reference-frequency multiplication + LPF recovers signal from broadband noise: SNR ∝ √(BW ratio).",
    "An IR proximity sensor modulated at 38 kHz and demodulated by a lock-in stage rejects all broadband ambient light noise except the narrow 38 kHz band, enabling sub-mm detection in bright environments.",
    "Sharp GP2Y0A02 and SICK S300 use modulated emission + synchronous demodulation for robust proximity sensing."),

  q(3149,"Sensors","competitive","Research",30,
    "Why does a rolling shutter camera cause problems for fast robot motion estimation and how does a global shutter resolve this?",
    ["Rolling shutter cameras are faster than global shutter cameras because they do not wait for full-frame exposure.",
     "Global shutter cameras have lower sensitivity than rolling shutter cameras, making them unsuitable for indoor robots.",
     "Rolling shutter distortion only occurs for rotational motion, not translational motion.",
     "Rolling shutter exposes each row at a different time causing geometric distortion when the camera moves rapidly; global shutter exposes all pixels simultaneously eliminating inter-row temporal offsets."],
    3,"Row-by-row exposure causes geometric distortion under fast motion; global shutter = simultaneous exposure.",
    "At 30 Hz with 33 ms frame time, a rolling shutter may expose rows 0 and 1000 separated by 33 ms; at 1 m/s camera velocity this causes 33 mm row offset in the image.",
    "Event cameras and global shutter sensors (Sony IMX676) are used for high-speed robot visual odometry."),

  q(3150,"Sensors","competitive","Research",30,
    "How does sensor placement optimisation (observability analysis) guide the design of robot sensing systems?",
    ["Sensor placement does not affect estimation quality as long as sensors are operational.",
     "Observability analysis is only relevant for single-sensor systems.",
     "Maximum sensor count always produces the highest observability regardless of placement.",
     "Placing sensors at kinematic configurations where the observability Gramian has high minimum eigenvalue ensures all state variables can be accurately estimated from the sensor outputs."],
    3,"High minimum eigenvalue of observability Gramian ensures all states are accurately estimable.",
    "A poorly placed camera on a robot arm may be observability-deficient for certain joint configurations; the observability Gramian minimum eigenvalue quantifies how well all states are excited by the sensor layout.",
    "Optimal camera placement on legged robots uses Gramian-based analysis to maximise pose estimation accuracy."),

  // ── Actuators (3151-3165) ─────────────────────────────────
  q(3151,"Actuators","competitive","Starter",20,
    "What is back-drivability in a robot actuator and why is it important for collaborative robots?",
    ["Back-drivability means the motor can be reversed to return to a home position.",
     "High gear ratios always increase back-drivability by amplifying motor torque.",
     "Back-drivability is only required for mobile robots, not fixed robot arms.",
     "Back-drivability is the ability for external forces to move the output shaft; high back-drivability enables direct force sensing, safe human interaction, and accurate force control without force sensors."],
    3,"External force can move output shaft → direct force sensing, safe HRC, force control.",
    "A high-ratio worm gear is non-back-drivable; external forces cannot move the output and are invisible to current-based force estimation; quasi-direct-drive (low-ratio) actuators are back-drivable.",
    "MIT Mini Cheetah quasi-direct-drive and Franka Panda use low-ratio transmissions for back-drivability."),

  q(3152,"Actuators","competitive","Starter",20,
    "What is the stall torque of a DC motor and how does it relate to rated operating torque?",
    ["Stall torque equals rated torque for all DC motors.",
     "Stall torque is the torque at maximum speed, not zero speed.",
     "Rated torque always exceeds stall torque because motors are most efficient at high speed.",
     "Stall torque is the maximum torque at zero speed (peak current × torque constant); rated torque is the continuous torque the motor can sustain thermally without overheating, typically 10-30% of stall."],
    3,"Stall torque = peak I × Kt; rated torque = thermally sustainable continuous torque ≈ 10-30% of stall.",
    "Exceeding rated torque causes winding temperature rise; motor protection circuits limit current to the rated value; brief torque peaks up to stall are allowed for robot jumps or grips.",
    "Motor datasheets specify stall torque (peak) and continuous rated torque for robot actuator sizing."),

  q(3153,"Actuators","competitive","Starter",20,
    "What is a harmonic drive and what are its key advantages for robot joint transmissions?",
    ["Harmonic drives use planetary gears and have significant backlash.",
     "Harmonic drives are limited to low gear ratios (below 10:1).",
     "Harmonic drives require oil lubrication making them unsuitable for precision robots.",
     "A harmonic drive is a zero-backlash gear using a wave generator, flexspline, and circular spline achieving high gear ratios (50:1-320:1) in a compact package with zero backlash and high torque density."],
    3,"Zero backlash + high ratio (50-320:1) + compact + high torque density.",
    "The flexspline's wave-deformation tooth engagement creates zero backlash; one full wave rotation produces only a few teeth of output motion giving very high reduction ratios.",
    "Harmonic Drive AG gears power KUKA, FANUC, and ABB robot arm joints worldwide."),

  q(3154,"Actuators","competitive","Starter",20,
    "What distinguishes hydraulic actuators from electric actuators for robot applications?",
    ["Electric actuators always provide higher force density than hydraulic actuators.",
     "Hydraulic actuators are more energy-efficient than electric actuators at all operating points.",
     "Hydraulic actuators require no feedback control for position accuracy.",
     "Hydraulic actuators provide very high force density and are back-drivable at high loads, but require a hydraulic supply, have leak risk, and are less position-accurate than electric servos."],
    3,"High force density + back-drivable at high load but requires supply + leak risk + lower position accuracy.",
    "A hydraulic cylinder delivers 100× more force per unit volume than a comparably sized electric motor; Boston Dynamics Atlas (original) used hydraulics for whole-body dynamic motion.",
    "Modern Atlas V2 switched to electric for cleaner, quieter operation accepting lower force density."),

  q(3155,"Actuators","competitive","Starter",20,
    "What is a pneumatic soft actuator and how does it enable compliant robot grippers?",
    ["Pneumatic soft actuators require rigid structural elements to function.",
     "Soft pneumatic actuators cannot produce sufficient force for practical gripping.",
     "Pneumatic soft actuators are always slower than rigid electric grippers.",
     "Pneumatic soft actuators use pressurised air to deform elastomeric chambers, producing bending or linear motion that conforms to object surfaces providing inherently compliant grasping without feedback control."],
    3,"Air-pressurised elastomeric chambers → compliant deformation conforming to object shape.",
    "Pressurising a bellows chamber causes predictable bending; the soft structure naturally conforms to irregular surfaces distributing contact stress without requiring per-finger force control.",
    "Harvard Soft Robotics Toolkit pneumatic grippers grasp delicate food and biological specimens without damage."),

  q(3156,"Actuators","competitive","Research",30,
    "Why does a quasi-direct-drive (QDD) actuator achieve better force transparency than a high-gear-ratio actuator?",
    ["High gear ratios improve force transparency by amplifying motor torque resolution.",
     "QDD actuators always require external force sensors because motor current is insufficient.",
     "Force transparency is identical for all gear ratios if current sensing resolution is high enough.",
     "QDD uses low gear ratios (1:1 to 9:1) resulting in low reflected inertia and friction so that motor current provides a faithful estimate of output torque, enabling high-bandwidth force control."],
    3,"Low ratio → low reflected inertia and friction → current-based force estimation faithful without sensors.",
    "Reflected inertia scales as N²; a 100:1 gear makes a 10 g motor appear as 100 kg to the environment destroying force transparency; 6:1 gear keeps reflected inertia manageable.",
    "MIT Mini Cheetah, Unitree, and Anybotics use QDD actuators for whole-body torque-transparent control."),

  q(3157,"Actuators","competitive","Research",30,
    "What is the role of field-oriented control (FOC) in BLDC motor drives for robot joints?",
    ["FOC only applies to induction motors, not BLDC or PMSM motors used in robots.",
     "FOC increases motor noise by switching at audio frequencies.",
     "FOC requires a sensorless scheme; encoder-based control always outperforms FOC.",
     "FOC decouples torque-producing (q-axis) and flux-producing (d-axis) current components in the rotor frame, enabling independent control of torque and flux for maximum efficiency and smooth low-speed operation."],
    3,"q/d-axis current decoupling → independent torque and flux control, smooth low-speed operation.",
    "Without FOC, trapezoidal commutation produces torque ripple at commutation steps; FOC with sinusoidal current references produces smooth torque throughout the electrical cycle.",
    "SimpleFOC, ODrive, and Moteus implement FOC for open-source robot joint drives."),

  q(3158,"Actuators","competitive","Research",30,
    "How does tendon-driven actuation benefit robot hand and finger mechanism design?",
    ["Tendon-driven hands always require more motors than direct-drive hands.",
     "Tendons add backlash that degrades finger position accuracy compared to direct-drive.",
     "Tendon routing cannot achieve coupled multi-joint finger movements.",
     "Routing tendons from proximal motors to distal joints reduces distal mass and inertia, allowing faster and more compliant finger movements while enabling complex joint coupling for underactuated grasp strategies."],
    3,"Proximal motors + distal tendons reduce distal inertia enabling fast compliant finger motion.",
    "Moving motors to the palm reduces finger mass from 200 g to 30 g; lower inertia improves contact stability and reduces impact forces during fast grasping.",
    "Shadow Dexterous Hand, DLR Hand, and Allegro Hand use tendon routing for lightweight finger design."),

  q(3159,"Actuators","competitive","Research",30,
    "What is electroactive polymer (EAP) actuation and what advantage does it offer for soft robotics?",
    ["EAP actuators require high gear ratios like electric motors.",
     "EAP actuation only works underwater, not in air.",
     "EAP materials produce less strain than pneumatic actuators.",
     "EAP materials deform electrically (dielectric elastomers, ionic polymer-metal composites) providing muscle-like contraction with high strain, low weight, and silent operation suited for bio-inspired soft robots."],
    3,"Electrically driven muscle-like deformation: high strain + low weight + silent operation.",
    "Dielectric elastomers can achieve >100% strain vs <1% for piezoelectric; actuator weight is dominated by the polymer not a motor/gearbox assembly.",
    "EAP soft robots are used in underwater swimming, micro-UAV wings, and wearable haptic feedback devices."),

  q(3160,"Actuators","competitive","Research",30,
    "How does the torque-speed characteristic of a PMSM motor affect robot arm trajectory design?",
    ["PMSM produces constant torque at all speeds, making trajectory design independent of dynamics.",
     "Peak torque occurs at maximum speed, not zero speed, for PMSM motors.",
     "The torque-speed envelope is identical for all PMSM motors regardless of winding configuration.",
     "The PMSM produces peak torque at low speed and reduces torque above base speed (field weakening region); robot trajectories must stay within the torque-speed envelope at all joint configurations and speeds."],
    3,"Peak torque at low speed reduces in field-weakening region; trajectories must respect this envelope.",
    "A rapid joint acceleration may require peak torque; if the joint is moving fast (above base speed), available torque is reduced; trajectory planners incorporate motor torque-speed curves as constraints.",
    "MoveIt! and Drake trajectory optimisers accept PMSM torque-speed envelopes as joint limit constraints."),

  q(3161,"Actuators","competitive","Research",30,
    "What is magnetic cogging torque in BLDC motors and how does it affect low-speed robot joint control?",
    ["Cogging torque only affects motors above 1000 RPM, not low-speed robot joints.",
     "Cogging torque improves position accuracy by creating stable equilibrium points.",
     "Cogging torque is eliminated by adding a gearbox to the motor output.",
     "Cogging torque arises from the magnetic attraction between rotor magnets and stator slots; it creates periodic torque disturbances that cause velocity ripple and position errors at low speeds."],
    3,"Magnetic rotor-slot attraction → periodic torque disturbances causing velocity ripple at low speed.",
    "Cogging is strongest at low speed where back-EMF is negligible relative to cogging magnitude; direct-drive robots must compensate cogging explicitly in the controller.",
    "Cogging torque maps stored as lookup tables and subtracted feed-forward are standard in direct-drive robot joint controllers."),

  q(3162,"Actuators","competitive","Research",30,
    "How does shape memory alloy (SMA) actuation differ from conventional actuators and what limits its use?",
    ["SMA actuation provides higher bandwidth than electric motors for all load levels.",
     "SMA actuators have no hysteresis, making position control straightforward.",
     "SMAs are only used as passive structural elements, not active actuators.",
     "SMA contracts when heated above transformation temperature producing large strain forces; it is reversible on cooling but suffers from low bandwidth (<1 Hz), limited cycle life, and hysteretic position control."],
    3,"Thermally driven contraction: large force + large strain but low bandwidth (<1 Hz) + hysteresis.",
    "Nitinol SMA wires contract 4-8% when heated; this strain exceeds all other actuator technologies per unit weight; but thermal time constants limit frequency to <1 Hz and hysteresis complicates control.",
    "SMA actuators power micro-scale robotic catheters, endoscopes, and shape-changing structures in research."),

  q(3163,"Actuators","competitive","Research",30,
    "What is the advantage of a series elastic actuator (SEA) over a rigid geared actuator for force estimation?",
    ["SEAs require higher-fidelity force sensors than rigid actuators.",
     "Rigid actuators always provide more accurate force estimates because there is no spring deflection uncertainty.",
     "The compliance in SEA always reduces force bandwidth, making it unsuitable for high-frequency force control.",
     "The elastic element acts as a calibrated spring; force is estimated from Δθ × k without a force sensor; the compliance also reduces shock transmission and increases stability margins for contact control."],
    3,"Spring deflection × k = force without a sensor; compliance also reduces shock and improves stability.",
    "Measuring the deflection between motor and link encoders gives force = k × Δθ; this is the fundamental principle of all compliant actuator force estimation.",
    "Atlas (V1), ANYdrive, and HEBI actuators use SEA spring deflection as the primary force sensing mechanism."),

  q(3164,"Actuators","competitive","Research",30,
    "How does hydraulic series elastic actuation differ from electric SEA and what are its trade-offs?",
    ["Hydraulic SEA provides lower force density than electric SEA at equivalent volume.",
     "Hydraulic actuators cannot be made series elastic because cylinders are rigid.",
     "Electric SEA and hydraulic SEA have identical force bandwidth characteristics.",
     "Hydraulic SEA uses a compliant element between the hydraulic cylinder and the output, providing higher force density than electric SEA at the cost of hydraulic supply complexity and fluid management."],
    3,"Higher force density vs electric SEA at the cost of hydraulic supply and fluid management.",
    "A hydraulic SEA at 5000 psi delivers 10× more force than an equivalent electric SEA for the same volume; but it requires a pump, accumulator, servo valve, and fluid circuit.",
    "NASA Valkyrie uses electric SEA; early Boston Dynamics Atlas used hydraulic SEA for higher force density."),

  q(3165,"Actuators","competitive","Research",30,
    "What is the role of a motor controller's current loop bandwidth in determining the quality of robot joint force control?",
    ["Current loop bandwidth only affects motor speed, not force control quality.",
     "A slow current loop (10 Hz) is sufficient for all robot force control applications.",
     "Current loop bandwidth and force control bandwidth are independent because force is controlled in an outer loop.",
     "The current loop bandwidth determines how quickly the motor controller can track current commands; higher bandwidth enables higher force control bandwidth, allowing the robot to respond to contact events faster."],
    3,"Current loop bandwidth determines force control bandwidth; higher bandwidth → faster contact response.",
    "A 10 kHz current loop allows force control bandwidth up to ~2-5 kHz; a 100 Hz current loop limits force control to ~10-20 Hz, too slow for stable contact with stiff environments.",
    "Elmo Gold, EPOS4, and Moteus motor controllers achieve 10-40 kHz current loop bandwidth for high-performance robot joint control."),

  // ── Robotic Dexterity (3166-3180) ─────────────────────────
  q(3166,"Robotic Dexterity","competitive","Starter",20,
    "What is an underactuated robotic hand and what trade-off does it make?",
    ["Underactuated hands always have higher grasp success rates than fully actuated hands.",
     "Fully actuated hands require fewer sensors than underactuated hands.",
     "Underactuated hands cannot achieve power grasps; only precision grasps are possible.",
     "An underactuated hand has fewer actuators than DOF; tendons and springs passively distribute contact forces enabling adaptive grasping of varied objects without per-joint control, at the cost of reduced dexterity."],
    3,"Fewer actuators than DOF: passive compliance enables adaptive grasping at cost of dexterity.",
    "Spring-loaded tendons automatically distribute forces across links as fingers close around irregular objects; a single motor closes the whole finger; but independent finger positioning is lost.",
    "Robotiq 2F-85, Barrett Hand, and SAKE Robotics EZGripper are underactuated commercial grippers."),

  q(3167,"Robotic Dexterity","competitive","Starter",20,
    "What is tactile sensing and why is it critical for in-hand manipulation of delicate objects?",
    ["Tactile sensing only measures contact presence, not force distribution.",
     "Force/torque sensors at the wrist provide all the information that tactile sensors provide.",
     "Tactile sensing is only needed for industrial robots, not research platforms.",
     "Tactile sensing measures contact pressure distribution, shear forces, and vibration at the fingertip enabling grasp stability assessment, slip detection, and texture classification essential for fragile objects."],
    3,"Fingertip pressure + shear + vibration enables stability assessment, slip detection, texture classification.",
    "Wrist F/T sensors cannot locate contact; tactile arrays resolve where on the fingertip contact occurs enabling local slip detection and grasp adjustment without dropping the object.",
    "SynTouch NumaTac and XELA Robotics tactile sensors provide 16×16 arrays for dexterous manipulation."),

  q(3168,"Robotic Dexterity","competitive","Starter",20,
    "What are the primary grasp types and how are power grasps distinguished from precision grasps?",
    ["Power grasps require more DOF than precision grasps.",
     "Precision grasps always apply higher force than power grasps.",
     "Power grasps are only possible with rigid hands, not compliant or underactuated hands.",
     "Power grasps use the full hand to envelope an object for high force; precision grasps use fingertips for fine object manipulation requiring higher dexterity and lower contact force."],
    3,"Power grasp: whole-hand envelopment for high force; precision grasp: fingertip control for fine manipulation.",
    "Hammering uses a power grasp (cylindrical wrap); writing uses a precision grasp (tripod); a robot hand must be capable of both for versatile manipulation.",
    "The Cutkosky grasp taxonomy classifies 16 grasp types along the power-precision continuum."),

  q(3169,"Robotic Dexterity","competitive","Starter",20,
    "What is soft robotics and what key property of soft materials enables safe human-robot interaction?",
    ["Soft materials are only used for aesthetic purposes, not functional robot components.",
     "Soft robots are always slower than rigid robots due to material compliance.",
     "Compliance in soft robots requires active stiffness control to limit contact forces.",
     "Soft robotics uses elastomers, gels, and fabrics with Young's moduli matching biological tissues; high compliance naturally limits contact forces during unexpected collisions without active control."],
    3,"Tissue-like compliance (low Young's modulus) passively limits contact force without active control.",
    "A rigid robot arm hitting a human at 1 m/s may deliver 100 N of impact force; a soft arm with the same mass compresses on contact, extending the collision time and reducing peak force.",
    "FESTO Bionic Cobot, iSoft robotics grippers, and Harvard soft arms target human-safe close collaboration."),

  q(3170,"Robotic Dexterity","competitive","Starter",20,
    "What is in-hand manipulation and why is it harder than pick-and-place?",
    ["In-hand manipulation is simpler than pick-and-place because the object is already grasped.",
     "In-hand manipulation only requires 2 fingers regardless of object shape.",
     "Pick-and-place requires more finger DOF than in-hand manipulation.",
     "In-hand manipulation repositions an object within the hand without releasing and regrasping, requiring coordinated finger motion, contact mode transitions, and real-time slip detection."],
    3,"Finger-coordinated object repositioning within hand requires contact mode transitions and slip detection.",
    "Pick-and-place: grasp → move → place (no in-hand motion needed); in-hand manipulation: rotate/translate object using rolling, sliding, or pivoting contacts while maintaining force closure.",
    "OpenAI Dexterous Hand rotated a Rubik's cube using in-hand manipulation with RL policy."),

  q(3171,"Robotic Dexterity","competitive","Research",30,
    "How does the contact-mode transition graph describe in-hand manipulation planning?",
    ["Contact-mode transitions are continuous and cannot be represented as a graph.",
     "In-hand manipulation planning uses configuration-space sampling without contact-mode analysis.",
     "The contact-mode graph is only applicable to 2D manipulation, not 3D in-hand tasks.",
     "The contact-mode graph enumerates discrete contact configurations (roll, slide, break, form) as nodes and transitions between them as edges; in-hand manipulation planning searches for a path through this graph."],
    3,"Discrete contact modes as nodes + transitions as edges → graph search for manipulation paths.",
    "For a cube in a two-finger gripper, modes include edge contact (roll possible), face contact (slide), and point contact (pivoting); paths through the graph correspond to valid manipulation sequences.",
    "Goldberg and Mason formalised contact-mode analysis for parts orienting; modern work extends this to dexterous hands."),

  q(3172,"Robotic Dexterity","competitive","Research",30,
    "What is the grasp wrench space and how does it relate to grasp quality metrics?",
    ["The grasp wrench space only includes normal forces, not frictional wrenches.",
     "Grasp quality metrics are independent of the friction coefficient at each contact.",
     "The grasp wrench space is equivalent to the workspace of the robot arm.",
     "The grasp wrench space is the set of all wrenches resisted by the grasp under friction and force constraints; quality metrics measure properties like the radius of the largest inscribed sphere."],
    3,"GWS = resisted wrenches under friction/force constraints; quality = largest inscribed sphere radius.",
    "A large inscribed sphere radius means the grasp resists all external wrenches up to a large magnitude — a high-quality grasp; small radius means near force-closure with low robustness.",
    "Ferrari and Canny introduced the largest-minimum-singular-value metric; Kirkpatrick introduced the L1 quality metric based on the GWS inscribed sphere."),

  q(3173,"Robotic Dexterity","competitive","Research",30,
    "How does learning-from-demonstration improve dexterous manipulation policies compared to RL from scratch?",
    ["RL from scratch always produces higher-quality policies than learning from demonstration.",
     "Learning from demonstration requires millions of demonstrations to be effective.",
     "Human demonstrations introduce bias that always degrades RL policy performance.",
     "Learning from demonstration initialises the policy near the task manifold from human demonstrations, dramatically reducing the exploration required and avoiding sparse-reward training failure."],
    3,"Demo initialisation near task manifold drastically reduces RL exploration for dexterous tasks.",
    "In-hand cube rotation trained from scratch with RL requires 10⁸ simulation steps; pre-initialising from 50 teleoperation demos reduces this to 10⁶ steps while improving success rate.",
    "ACT, Diffusion Policy, and GAIL use demonstrations to initialise dexterous manipulation policies."),

  q(3174,"Robotic Dexterity","competitive","Research",30,
    "What is the role of fingertip compliance in stabilising high-frequency contact dynamics during dexterous manipulation?",
    ["Rigid fingertips always produce more stable contacts than compliant ones.",
     "Fingertip compliance reduces grasp stability by allowing contact point motion.",
     "Compliance only helps during initial contact, not during sustained manipulation.",
     "Fingertip compliance filters high-frequency contact impulses, preventing chatter and maintaining stable contact force profiles during rapid in-hand repositioning that would destabilise rigid fingertips."],
    3,"Compliance filters contact impulses preventing chatter and stabilising rapid in-hand motion.",
    "A rigid fingertip in contact with a glass surface chatters at kHz frequencies during lateral sliding; a 1 mm silicone tip absorbs these vibrations maintaining stable contact.",
    "All commercial dexterous hands use rubber or silicone fingertip pads for contact stability."),

  q(3175,"Robotic Dexterity","competitive","Research",30,
    "How does visuotactile sensor technology (like GelSight) enable high-resolution contact geometry measurement?",
    ["Visuotactile sensors use ultrasound, not cameras, for contact geometry measurement.",
     "GelSight sensors only measure normal force, not shear or contact geometry.",
     "Visuotactile sensors have lower spatial resolution than traditional piezoresistive arrays.",
     "GelSight-type sensors use a camera to image deformations of a gel surface during contact, reconstructing high-resolution 3D contact geometry and shear direction from photometric stereo or marker tracking."],
    3,"Camera images gel surface deformation → photometric stereo reconstructs 3D contact geometry + shear.",
    "Embedded LEDs illuminate the gel from multiple directions; photometric stereo inverts surface normals to depth; marker displacement quantifies shear; spatial resolution <0.1 mm is achievable.",
    "Yuan et al (ICRA 2017) GelSight achieves 0.1 mm depth resolution enabling micro-scale surface inspection during grasping."),

  q(3176,"Robotic Dexterity","competitive","Research",30,
    "What is the significance of the friction cone constraint in grasp planning and how does it affect finger placement?",
    ["The friction cone only applies to cylindrical grasps, not arbitrary geometries.",
     "A larger friction coefficient always produces force closure regardless of finger placement.",
     "The friction cone constraint only applies to line contacts, not point contacts.",
     "Each contact must generate a friction force within a cone (μ × normal force) to prevent slip; optimising finger placement maximises the minimum friction cone margin across all contacts."],
    3,"Friction force must lie within cone: μ × fₙ; optimise placement to maximise friction cone margin.",
    "Contact with a slippery surface (μ=0.1) has a narrow cone; finger placement must ensure contact normals create a force-closure configuration within this narrow cone.",
    "GraspIt! and OpenRAVE optimise finger placement considering per-contact friction cone constraints."),

  q(3177,"Robotic Dexterity","competitive","Research",30,
    "How does model-free tactile servo control achieve stable in-hand rotation without object models?",
    ["Tactile servo control always requires a 3D model of the grasped object.",
     "In-hand rotation without object models is impossible because kinematics require geometry.",
     "Tactile servo control is only applicable to rotation, not translation of objects in hand.",
     "Tactile servo control regulates the contact pressure distribution and slip signals from tactile arrays in real time, adjusting finger forces to maintain stable contact without needing an explicit object model."],
    3,"Real-time pressure distribution + slip regulation maintains stable contact without object model.",
    "Slip signals (temporal gradient of tactile array) indicate incipient contact failure; increasing normal force when slip is detected maintains contact without knowing object geometry.",
    "In-hand cube rotation policies use tactile slip detection as reward shaping for RL."),

  q(3178,"Robotic Dexterity","competitive","Research",30,
    "What is a continuum robot and how does its kinematics differ from a rigid-link serial manipulator?",
    ["Continuum robots use DH parameters identical to rigid-link robots.",
     "Continuum robot kinematics are always simpler than rigid-link kinematics.",
     "Continuum robots cannot apply forces at their tip because they lack rigid links.",
     "A continuum robot deforms continuously along its length; its kinematics are described by curvature and arc length parameters (constant curvature model) rather than discrete joint angles in a DH table."],
    3,"Continuous deformation described by curvature/arc length, not discrete joints in a DH table.",
    "The constant-curvature model parameterises backbone shape by arc length s and curvature κ; workspace and Jacobian are derived by integrating the Frenet-Serret equations along the backbone.",
    "Tendon-driven continuum robots (STIFF-FLOP, Festo Bionic Cobot) navigate confined surgical cavities."),

  q(3179,"Robotic Dexterity","competitive","Research",30,
    "How does the deformable object manipulation problem differ fundamentally from rigid object manipulation?",
    ["Deformable objects are simpler to manipulate because they conform to the gripper shape.",
     "Rigid-body manipulation algorithms apply directly to deformable objects with small corrections.",
     "Deformable objects cannot be grasped by force-closure because they yield to applied forces.",
     "Deformable objects have infinite DOF and state-dependent dynamics that cannot be pre-computed from geometry alone; the robot must adapt manipulation to measured deformation feedback in real time."],
    3,"Infinite DOF + state-dependent dynamics → real-time deformation feedback control required.",
    "Folding a shirt requires estimating cloth state from visual/tactile feedback and planning manipulation that transitions the cloth through a desired deformation sequence — no analytic geometry model is sufficient.",
    "Cloth folding, wire routing, and dough kneading are active deformable manipulation research challenges."),

  q(3180,"Robotic Dexterity","competitive","Research",30,
    "What is regrasping and why is it necessary for dexterous manipulation of objects with complex geometries?",
    ["Regrasping is only necessary for objects that cannot be grasped at all.",
     "Regrasping always reduces manipulation efficiency and should always be avoided.",
     "Regrasping is only needed for two-fingered grippers, not dexterous multi-finger hands.",
     "Regrasping releases and re-grasps an object to reach a grasp configuration that enables a subsequent task when the initial grasp does not allow the required motion range."],
    3,"Release-and-regrasp reaches task-enabling grasp when initial grasp limits motion range.",
    "Grasping a hammer by the head and transferring to the handle requires regrasping; the initial grasp cannot reach the handle configuration directly.",
    "Regrasping planning algorithms enumerate reachable grasp sequences and plan safe handoff trajectories."),

]; // ── END OF QUESTION_BANK ───────────────────────────────

// ════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ════════════════════════════════════════════════════════

// Shuffle array (Fisher-Yates)
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Build a shuffled pack of up to 15 questions for a realm
function buildPack(mode, realmName) {
  const pool = QUESTION_BANK.filter(q => q.mode === mode && q.realm === realmName);
  return shuffleArray(pool).slice(0, 15);
}

// Shuffle options but track which index is now correct
// Returns: { shuffled: string[], correctIdx: number }
function shuffleOptions(options, answerIdx) {
  const indexed = options.map((text, i) => ({ text, isCorrect: i === answerIdx }));
  const shuffled = shuffleArray(indexed);
  return {
    shuffled: shuffled.map(o => o.text),
    correctIdx: shuffled.findIndex(o => o.isCorrect),
  };
}

// ── Sound engine ──────────────────────────────────────────
function useSound() {
  const ctx    = useRef(null);
  const nodes  = useRef([]);
  const active = useRef(false);

  function stop() {
    nodes.current.forEach(n => { try { n.stop(); } catch(e) {} });
    nodes.current = [];
    active.current = false;
  }

  function calm() {
    if (active.current) return;
    try {
      if (!ctx.current) ctx.current = new (window.AudioContext || window.webkitAudioContext)();
      const ac = ctx.current;
      active.current = true;
      const buf = ac.createBuffer(1, ac.sampleRate * 4, ac.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      const src = ac.createBufferSource(); src.buffer = buf; src.loop = true;
      const flt = ac.createBiquadFilter(); flt.type = "lowpass"; flt.frequency.value = 350;
      const g = ac.createGain(); g.gain.value = 0.022;
      src.connect(flt); flt.connect(g); g.connect(ac.destination); src.start();
      nodes.current.push(src);
      [[110, 0.007], [220, 0.005], [55, 0.009]].forEach(([freq, gain]) => {
        const o = ac.createOscillator(); const og = ac.createGain();
        o.type = "sine"; o.frequency.value = freq; og.gain.value = gain;
        o.connect(og); og.connect(ac.destination); o.start();
        nodes.current.push(o);
      });
    } catch(e) {}
  }

  function competitive() {
    if (active.current) return;
    try {
      if (!ctx.current) ctx.current = new (window.AudioContext || window.webkitAudioContext)();
      const ac = ctx.current;
      active.current = true;
      [[220, 3, 0.016], [440, 6, 0.011], [880, 12, 0.006]].forEach(([freq, lfoFreq, gain]) => {
        const o = ac.createOscillator(); const g = ac.createGain();
        const lfo = ac.createOscillator(); const lg = ac.createGain();
        o.type = "sine"; o.frequency.value = freq;
        lfo.type = "sine"; lfo.frequency.value = lfoFreq;
        lg.gain.value = 0.01; g.gain.value = gain;
        lfo.connect(lg); lg.connect(g.gain);
        o.connect(g); g.connect(ac.destination);
        lfo.start(); o.start();
        nodes.current.push(lfo, o);
      });
      const buf = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      const src = ac.createBufferSource(); src.buffer = buf; src.loop = true;
      const flt = ac.createBiquadFilter(); flt.type = "bandpass"; flt.frequency.value = 2800; flt.Q.value = 0.5;
      const g = ac.createGain(); g.gain.value = 0.007;
      src.connect(flt); flt.connect(g); g.connect(ac.destination); src.start();
      nodes.current.push(src);
    } catch(e) {}
  }

  useEffect(() => () => stop(), []);
  return { calm, competitive, stop };
}

// ── 60-second timer hook ──────────────────────────────────
function useTimer(active, onExpire) {
  const [timeLeft, setTimeLeft] = useState(60);
  const intRef = useRef(null);

  useEffect(() => {
    clearInterval(intRef.current);
    if (!active) return;
    setTimeLeft(60);
    intRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(intRef.current); onExpire(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(intRef.current);
  }, [active]);

  return timeLeft;
}

// ============================================================
// PART 3 of 3 — Main App Component
// Paste AFTER Part 1 + Part 2 in a single App.jsx file
// ============================================================

// ── Robot SVG illustrations for Home ─────────────────────
function RobotArm({ className = "" }) {
  return (
    <svg viewBox="0 0 120 180" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="50" y="160" width="20" height="15" rx="4" fill="#334155"/>
      <rect x="45" y="145" width="30" height="18" rx="6" fill="#475569"/>
      <rect x="52" y="110" width="16" height="38" rx="5" fill="#64748b"/>
      <circle cx="60" cy="108" r="10" fill="#94a3b8" stroke="#475569" strokeWidth="2"/>
      <rect x="56" y="72" width="18" height="38" rx="5" fill="#64748b" transform="rotate(-20 60 90)"/>
      <circle cx="68" cy="72" r="9" fill="#94a3b8" stroke="#475569" strokeWidth="2"/>
      <rect x="62" y="38" width="16" height="36" rx="5" fill="#64748b" transform="rotate(-40 68 56)"/>
      <circle cx="78" cy="40" r="8" fill="#94a3b8" stroke="#475569" strokeWidth="2"/>
      <ellipse cx="82" cy="30" rx="12" ry="6" fill="#334155" transform="rotate(-40 80 30)"/>
      <circle cx="60" cy="20" r="14" fill="#1e293b" stroke="#475569" strokeWidth="2"/>
      <circle cx="55" cy="18" r="3" fill="#38bdf8"/>
      <circle cx="65" cy="18" r="3" fill="#38bdf8"/>
      <rect x="53" y="24" width="14" height="2.5" rx="1.2" fill="#38bdf8" opacity="0.6"/>
    </svg>
  );
}

function RobotFace({ className = "" }) {
  return (
    <svg viewBox="0 0 140 140" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="30" width="100" height="90" rx="20" fill="#1e293b" stroke="#334155" strokeWidth="2"/>
      <rect x="40" y="10" width="60" height="25" rx="10" fill="#334155"/>
      <rect x="55" y="5" width="30" height="12" rx="6" fill="#475569"/>
      <rect x="30" y="55" width="35" height="25" rx="8" fill="#0f172a"/>
      <rect x="75" y="55" width="35" height="25" rx="8" fill="#0f172a"/>
      <circle cx="47" cy="67" r="9" fill="#38bdf8" opacity="0.9"/>
      <circle cx="93" cy="67" r="9" fill="#38bdf8" opacity="0.9"/>
      <circle cx="47" cy="67" r="4" fill="white"/>
      <circle cx="93" cy="67" r="4" fill="white"/>
      <rect x="38" y="95" width="64" height="10" rx="5" fill="#334155"/>
      <rect x="50" y="98" width="8" height="4" rx="2" fill="#38bdf8"/>
      <rect x="62" y="98" width="16" height="4" rx="2" fill="#38bdf8" opacity="0.7"/>
      <rect x="82" y="98" width="8" height="4" rx="2" fill="#38bdf8"/>
      <rect x="5" y="55" width="15" height="40" rx="7" fill="#334155"/>
      <rect x="120" y="55" width="15" height="40" rx="7" fill="#334155"/>
    </svg>
  );
}

function QuadrotorSVG({ className = "" }) {
  return (
    <svg viewBox="0 0 160 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="60" y="50" width="40" height="20" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1.5"/>
      <rect x="72" y="54" width="16" height="12" rx="4" fill="#334155"/>
      <line x1="20" y1="60" x2="60" y2="60" stroke="#475569" strokeWidth="3" strokeLinecap="round"/>
      <line x1="100" y1="60" x2="140" y2="60" stroke="#475569" strokeWidth="3" strokeLinecap="round"/>
      <line x1="80" y1="30" x2="80" y2="50" stroke="#475569" strokeWidth="3" strokeLinecap="round"/>
      <line x1="80" y1="70" x2="80" y2="90" stroke="#475569" strokeWidth="3" strokeLinecap="round"/>
      <ellipse cx="20" cy="60" rx="18" ry="5" fill="#38bdf8" opacity="0.3" stroke="#38bdf8" strokeWidth="1"/>
      <ellipse cx="140" cy="60" rx="18" ry="5" fill="#38bdf8" opacity="0.3" stroke="#38bdf8" strokeWidth="1"/>
      <ellipse cx="80" cy="30" rx="18" ry="5" fill="#38bdf8" opacity="0.3" stroke="#38bdf8" strokeWidth="1"/>
      <ellipse cx="80" cy="90" rx="18" ry="5" fill="#38bdf8" opacity="0.3" stroke="#38bdf8" strokeWidth="1"/>
      <circle cx="20" cy="60" r="4" fill="#334155"/>
      <circle cx="140" cy="60" r="4" fill="#334155"/>
      <circle cx="80" cy="30" r="4" fill="#334155"/>
      <circle cx="80" cy="90" r="4" fill="#334155"/>
      <circle cx="82" cy="58" r="2" fill="#38bdf8"/>
      <circle cx="82" cy="62" r="1.5" fill="#38bdf8" opacity="0.5"/>
    </svg>
  );
}

// ── Main App ──────────────────────────────────────────────
export default function App() {
  const [screen, setScreen]     = useState("home");
  const [mode, setMode]         = useState("calm");
  const [ri, setRi]             = useState(0);
  const [qi, setQi]             = useState(0);
  const [pack, setPack]         = useState([]);
  const [sel, setSel]           = useState(null);
  const [explain, setExplain]   = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [score, setScore]       = useState(0);
  const [answered, setAnswered] = useState([]);
  const [saved, setSaved]       = useState([]);
  const [muted, setMuted]       = useState(false);
  const [search, setSearch]     = useState("");
  const [history, setHistory]   = useState([]);
  const snd = useSound();

  const comp   = mode === "competitive";
  const realms = comp ? COMPETITIVE_REALMS : CALM_REALMS;
  const realm  = realms[ri];

  // Current question with shuffled options
  const curQ = pack[qi] || null;
  const { shuffledOpts, correctIdx } = useMemo(() => {
    if (!curQ) return { shuffledOpts: [], correctIdx: 0 };
    const { shuffled, correctIdx } = shuffleOptions(curQ.options, curQ.answer);
    return { shuffledOpts: shuffled, correctIdx };
  }, [curQ?.id]);

  const acc  = answered.length > 0 ? Math.round(answered.filter(a => a.correct).length / answered.length * 100) : 0;
  const prog = pack.length > 0 ? (qi / pack.length) * 100 : 0;

  // Timer — only active in competitive mode, before answering
  const timerActive = comp && screen === "play" && !explain && !timedOut && !!curQ;
  const timeLeft = useTimer(timerActive, () => {
    if (!explain) {
      setTimedOut(true);
      setExplain(true);
      setAnswered(a => [...a, { id: curQ?.id, correct: false }]);
    }
  });

  // ── Theme tokens ──────────────────────────────────────────
  const T = comp ? {
    screenBg: "bg-[#030712]",
    heroBg:   "bg-gradient-to-b from-[#050d1a] to-[#030712]",
    card:     "bg-[#0a1628] border border-blue-500/20",
    panel:    "bg-blue-950/20 border border-blue-500/15",
    btn:      "bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold shadow-[0_0_24px_rgba(59,130,246,0.4)] hover:shadow-[0_0_36px_rgba(59,130,246,0.6)]",
    outlineBtn:"border border-blue-500/40 text-blue-300 hover:bg-blue-950/60 hover:border-blue-400/60",
    accent:   "text-blue-400",
    accentBr: "text-blue-300",
    heading:  "text-white",
    sub:      "text-slate-400",
    muted:    "text-slate-300",
    badge:    "bg-blue-950/60 text-blue-300 border border-blue-500/30",
    barGrad:  "from-blue-900 via-blue-500 to-cyan-400",
    progColor:"bg-blue-500",
    correct:  "border-emerald-400/70 bg-emerald-950/30",
    wrong:    "border-red-500/70 bg-red-950/30",
    selected: "border-blue-400 bg-blue-950/40",
    idle:     "border-blue-500/15 bg-slate-900/60 hover:bg-blue-950/30 hover:border-blue-400/40",
    glowCard: "shadow-[0_0_60px_rgba(59,130,246,0.12)]",
    timerNorm:"bg-blue-500",
    timerWarn:"bg-amber-500",
    timerCrit:"bg-red-500",
  } : {
    screenBg: "bg-[#f8fafb]",
    heroBg:   "bg-gradient-to-b from-white to-[#f0f7f4]",
    card:     "bg-white border border-slate-200/80",
    panel:    "bg-emerald-50/80 border border-emerald-100",
    btn:      "bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold shadow-md hover:shadow-lg",
    outlineBtn:"border border-slate-300 text-slate-600 hover:bg-slate-50 hover:border-slate-400",
    accent:   "text-emerald-700",
    accentBr: "text-emerald-600",
    heading:  "text-slate-900",
    sub:      "text-slate-500",
    muted:    "text-slate-600",
    badge:    "bg-emerald-50 text-emerald-700 border border-emerald-200",
    barGrad:  "from-emerald-500 via-teal-400 to-cyan-400",
    progColor:"bg-emerald-500",
    correct:  "border-emerald-400 bg-emerald-50",
    wrong:    "border-rose-400 bg-rose-50",
    selected: "border-emerald-500 bg-emerald-50",
    idle:     "border-slate-200 bg-white hover:bg-emerald-50/50 hover:border-emerald-300",
    glowCard: "shadow-sm",
    timerNorm:"bg-emerald-500",
    timerWarn:"bg-amber-500",
    timerCrit:"bg-red-500",
  };

  function timerColor() {
    if (!comp) return T.timerNorm;
    if (timeLeft > 30) return T.timerNorm;
    if (timeLeft > 15) return T.timerWarn;
    return T.timerCrit;
  }

  // ── Helpers ───────────────────────────────────────────────
  function resetQ() { setSel(null); setExplain(false); setTimedOut(false); }

  function loadRealm(m, idx) {
    const rList = m === "competitive" ? COMPETITIVE_REALMS : CALM_REALMS;
    const newPack = buildPack(m, rList[idx].name);
    setPack(newPack);
    setMode(m); setRi(idx); setQi(0); resetQ();
  }

  function startMode(m) {
    loadRealm(m, 0);
    setScore(0); setAnswered([]);
    setScreen("play");
    if (!muted) { snd.stop(); setTimeout(() => m === "calm" ? snd.calm() : snd.competitive(), 300); }
  }

  function openRealm(m, idx) {
    loadRealm(m, idx);
    setScore(0); setAnswered([]);
    setScreen("play");
    if (!muted) { snd.stop(); setTimeout(() => m === "calm" ? snd.calm() : snd.competitive(), 300); }
  }

  function submit() {
    if (sel === null || explain || !curQ) return;
    const correct = sel === correctIdx;
    if (correct) setScore(s => s + curQ.points);
    setAnswered(a => [...a, { id: curQ.id, correct }]);
    setExplain(true);
  }

  function next() {
    if (!curQ) return;
    if (qi + 1 < pack.length) { setQi(i => i + 1); resetQ(); return; }
    if (ri + 1 < realms.length) { setScreen("done"); return; }
    setHistory(h => [...h, { mode, score, acc, date: new Date().toLocaleDateString() }]);
    setScreen("result"); snd.stop();
  }

  function continueRealm() {
    const nextRi = ri + 1;
    if (nextRi >= realms.length) {
      setHistory(h => [...h, { mode, score, acc, date: new Date().toLocaleDateString() }]);
      setScreen("result"); snd.stop(); return;
    }
    loadRealm(mode, nextRi);
    setScreen("play");
  }

  function toggleSave() {
    if (!curQ) return;
    setSaved(s => s.includes(curQ.id) ? s.filter(x => x !== curQ.id) : [...s, curQ.id]);
  }

  function goHome() { setScreen("home"); snd.stop(); }

  function toggleMute() {
    if (muted) {
      setMuted(false);
      if (screen === "play") setTimeout(() => mode === "calm" ? snd.calm() : snd.competitive(), 100);
    } else { setMuted(true); snd.stop(); }
  }

  const fCalm = CALM_REALMS.filter(r =>
    !search || r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.desc.toLowerCase().includes(search.toLowerCase())
  );
  const fComp = COMPETITIVE_REALMS.filter(r =>
    !search || r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.desc.toLowerCase().includes(search.toLowerCase())
  );

  // ═══════════════════════════════════════════════════════════
  // HOME SCREEN — Apple-inspired
  // ═══════════════════════════════════════════════════════════
  if (screen === "home") return (
    <div className="min-h-screen bg-[#050a14] text-white overflow-x-hidden">

      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 backdrop-blur-2xl bg-black/40 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-base font-black">P</div>
          <span className="font-bold text-lg tracking-tight">Physical AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          <a href="#modes" className="hover:text-white transition-colors">Modes</a>
          <a href="#realms" className="hover:text-white transition-colors">Realms</a>
          <a href="#stats" className="hover:text-white transition-colors">Stats</a>
        </div>
        <button onClick={toggleMute}
          className="text-sm text-slate-400 hover:text-white transition-colors px-4 py-2 rounded-full border border-white/10 hover:border-white/20">
          {muted ? "🔇 Sound Off" : "🔊 Sound On"}
        </button>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 pb-12 overflow-hidden">
        {/* Background glow orbs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-blue-600/8 blur-[120px] pointer-events-none" />
        <div className="absolute top-2/3 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-indigo-600/6 blur-[80px] pointer-events-none" />

        {/* Robot illustrations */}
        <div className="relative flex items-end justify-center gap-8 mb-12 select-none">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <RobotArm className="w-24 h-36 opacity-70" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <RobotFace className="w-36 h-36" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <QuadrotorSVG className="w-28 h-24 opacity-70 mb-4" />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <div className="inline-flex items-center gap-2 text-blue-400 text-sm font-semibold tracking-widest uppercase mb-6 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-950/30 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            450 Questions · 30 Realms · 10,000 Points
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] mb-6">
            <span className="bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent">Physical AI</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">Mission Possible</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12">
            Master robotics from fundamentals to cutting-edge research.
            <br className="hidden md:block" /> Two modes. Every realm. One quiz to rule them all.
          </p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <button onClick={() => startMode("competitive")}
            className="px-10 py-5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xl font-bold transition-all shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:shadow-[0_0_60px_rgba(59,130,246,0.7)] active:scale-95">
            Enter Competitive Mode ⚡
          </button>
          <button onClick={() => startMode("calm")}
            className="px-10 py-5 rounded-2xl border border-white/20 text-white text-xl font-semibold hover:bg-white/5 hover:border-white/30 transition-all active:scale-95">
            Start Calm Mode 🌿
          </button>
        </motion.div>

        {/* Stats bar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          id="stats"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl w-full">
          {[
            { n: "450", l: "Questions", icon: "📚" },
            { n: "30",  l: "Realms",    icon: "🌐" },
            { n: "60s", l: "Timer",     icon: "⏱" },
            { n: "10K", l: "Max Points",icon: "🏆" },
          ].map(s => (
            <div key={s.l} className="rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-5 text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-3xl font-black text-white">{s.n}</div>
              <div className="text-sm text-slate-400 mt-1">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Mode Cards ── */}
      <section id="modes" className="px-6 py-24 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Choose Your Mode</h2>
          <p className="text-slate-400 text-xl">Two experiences. One mission.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Calm */}
          <motion.div whileHover={{ y: -6, scale: 1.01 }} whileTap={{ scale: 0.99 }}
            onClick={() => startMode("calm")}
            className="rounded-[32px] border border-emerald-500/20 bg-[#061410] cursor-pointer overflow-hidden group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400" />
            <div className="p-8 relative z-10">
              <div className="text-5xl mb-4">🌿</div>
              <h3 className="text-3xl font-black text-white mb-3">Calm Mode</h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-6">10 foundational realms. 150 questions. Nature soundscape. Build deep understanding without pressure or time limits.</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {CALM_REALMS.slice(0,5).map(r => (
                  <span key={r.name} className="px-3 py-1.5 rounded-full bg-emerald-950/60 text-emerald-400 text-sm border border-emerald-500/30">{r.icon} {r.name}</span>
                ))}
                <span className="px-3 py-1.5 rounded-full bg-slate-800/60 text-slate-400 text-sm border border-slate-600/30">+5 more</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-sm">No timer · 10 pts/question</span>
                <div className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-base group-hover:bg-emerald-500 transition-colors">Begin →</div>
              </div>
            </div>
          </motion.div>

          {/* Competitive */}
          <motion.div whileHover={{ y: -6, scale: 1.01 }} whileTap={{ scale: 0.99 }}
            onClick={() => startMode("competitive")}
            className="rounded-[32px] border border-blue-500/30 bg-[#04091a] cursor-pointer overflow-hidden group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="h-1.5 bg-gradient-to-r from-blue-900 via-blue-500 to-cyan-400" />
            <div className="p-8 relative z-10">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-3xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-3">Competitive Mode</h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-6">20 research-level realms. 300 questions. Electric soundscape. 60-second timer per question. 10,000 points total.</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {COMPETITIVE_REALMS.slice(0,5).map(r => (
                  <span key={r.name} className="px-3 py-1.5 rounded-full bg-blue-950/60 text-blue-300 text-sm border border-blue-500/30">{r.icon} {r.name}</span>
                ))}
                <span className="px-3 py-1.5 rounded-full bg-slate-800/60 text-slate-400 text-sm border border-slate-600/30">+15 more</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-sm">60s timer · 20–30 pts/question</span>
                <div className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-base shadow-[0_0_20px_rgba(59,130,246,0.4)] group-hover:bg-blue-500 transition-colors">Enter →</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Browse Realms ── */}
      <section id="realms" className="px-6 pb-24 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Browse All Realms</h2>
          <p className="text-slate-400 text-xl mb-8">30 topics across robotics, AI, and engineering.</p>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="🔍 Search topics…"
            className="w-full max-w-md mx-auto block px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 outline-none focus:border-blue-400/50 focus:bg-white/8 transition-all text-lg" />
        </motion.div>

        {/* Calm realms */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-2 rounded-full bg-emerald-950/60 text-emerald-400 text-sm font-bold border border-emerald-500/30">🌿 Calm Mode</span>
            <span className="text-slate-500 text-sm">15 questions each · No timer</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {fCalm.map(r => (
              <motion.button key={r.name} whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => openRealm("calm", CALM_REALMS.indexOf(r))}
                className="rounded-2xl border border-emerald-500/15 bg-[#061410] hover:bg-emerald-950/40 hover:border-emerald-500/30 p-5 text-left transition-all">
                <div className={`h-1 rounded-full bg-gradient-to-r ${r.color} mb-4`} />
                <div className="text-2xl mb-2">{r.icon}</div>
                <div className="font-bold text-white text-base mb-1">{r.name}</div>
                <div className="text-xs text-slate-500 leading-relaxed line-clamp-2">{r.desc}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Competitive realms */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-2 rounded-full bg-blue-950/60 text-blue-300 text-sm font-bold border border-blue-500/30">⚡ Competitive Mode</span>
            <span className="text-slate-500 text-sm">15 questions each · 60s timer</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {fComp.map(r => (
              <motion.button key={r.name} whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => openRealm("competitive", COMPETITIVE_REALMS.indexOf(r))}
                className="rounded-2xl border border-blue-500/15 bg-[#04091a] hover:bg-blue-950/40 hover:border-blue-500/30 p-5 text-left transition-all">
                <div className={`h-1 rounded-full bg-gradient-to-r ${r.color} mb-4`} />
                <div className="text-2xl mb-2">{r.icon}</div>
                <div className="font-bold text-blue-100 text-base mb-1">{r.name}</div>
                <div className="text-xs text-slate-500 leading-relaxed line-clamp-2">{r.desc}</div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── History ── */}
      {history.length > 0 && (
        <section className="px-6 pb-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-6 text-center">📊 Recent Sessions</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {history.slice(-6).reverse().map((h, i) => (
              <div key={i} className="rounded-2xl border border-white/8 bg-white/3 p-5 text-center">
                <div className="text-slate-400 text-sm mb-1">{h.mode === "competitive" ? "⚡ Competitive" : "🌿 Calm"}</div>
                <div className="text-slate-500 text-xs mb-3">{h.date}</div>
                <div className="text-3xl font-black text-white">{h.score}</div>
                <div className="text-slate-400 text-sm">pts · {h.acc}% acc</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Footer ── */}
      <footer className="text-center py-12 border-t border-white/5 text-slate-600 text-sm">
        Physical AI Quiz · Built for serious learners · {QUESTION_BANK.length} questions across {CALM_REALMS.length + COMPETITIVE_REALMS.length} realms
      </footer>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // PLAY SCREEN
  // ═══════════════════════════════════════════════════════════
  if (screen === "play" && curQ) return (
    <div className={`min-h-screen ${T.screenBg} p-4 md:p-6 transition-colors duration-500`}>
      <div className="max-w-6xl mx-auto space-y-5">

        {/* Top bar */}
        <div className={`flex flex-wrap items-center justify-between gap-4 rounded-3xl px-6 py-4 ${T.card} ${T.glowCard}`}>
          <div className="flex flex-wrap items-center gap-3">
            <span className={`px-3 py-1.5 rounded-full text-sm font-bold ${T.badge}`}>{realm?.icon} {realm?.name}</span>
            <span className={`px-3 py-1.5 rounded-full text-sm font-bold ${T.badge}`}>{curQ.difficulty}</span>
            <span className={`px-3 py-1.5 rounded-full text-sm font-bold ${T.badge}`}>Q{qi+1}/{pack.length}</span>
            <span className={`text-base font-black ${T.accentBr}`}>{curQ.points}pts</span>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-base font-bold ${T.accent}`}>Score: {score}</span>
            <button onClick={toggleMute} className={`px-4 py-2 rounded-xl text-sm border transition-all ${T.outlineBtn}`}>
              {muted ? "🔇" : "🔊"}
            </button>
            <button onClick={goHome} className={`px-5 py-2.5 rounded-xl text-base border transition-all font-semibold ${T.outlineBtn}`}>← Home</button>
          </div>
        </div>

        <div className="grid xl:grid-cols-[1.2fr_0.8fr] gap-5 items-start">
          {/* Question card */}
          <div className={`rounded-[32px] overflow-hidden ${T.card} ${T.glowCard}`}>
            <div className={`h-2 bg-gradient-to-r ${T.barGrad}`} />
            <div className="p-7 md:p-8 space-y-6">

              {/* Progress */}
              <div className="space-y-2">
                <div className={`flex justify-between text-sm font-semibold ${T.sub}`}>
                  <span>Realm Progress</span><span>{Math.round(prog)}%</span>
                </div>
                <Progress value={prog} className="h-3 rounded-full" color={T.progColor} />
              </div>

              {/* Timer (competitive only) */}
              {comp && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`text-sm font-semibold ${T.sub}`}>⏱ Time Remaining</span>
                    <span className={`text-2xl font-black tabular-nums ${timeLeft <= 15 ? "text-red-400 animate-pulse" : timeLeft <= 30 ? "text-amber-400" : T.accentBr}`}>
                      {timeLeft}s
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-1000 ${timerColor()}`}
                      style={{ width: `${(timeLeft/60)*100}%` }} />
                  </div>
                </div>
              )}

              {/* Timeout notice */}
              {timedOut && (
                <div className="rounded-2xl border border-amber-500/40 bg-amber-950/20 px-5 py-4 text-amber-300 text-base font-semibold">
                  ⏰ Time's up! See the correct answer highlighted below.
                </div>
              )}

              {/* Question */}
              <AnimatePresence mode="wait">
                <motion.div key={curQ.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="space-y-5">

                  <div className={`rounded-2xl border p-6 ${T.panel}`}>
                    <div className={`text-sm font-bold uppercase tracking-widest mb-3 ${T.accent}`}>Question</div>
                    <h2 className={`text-2xl md:text-3xl font-black leading-snug ${T.heading}`}>{curQ.prompt}</h2>
                  </div>

                  {/* Options */}
                  <div className="grid gap-3">
                    {shuffledOpts.map((text, i) => {
                      const isC = explain && i === correctIdx;
                      const isW = explain && sel === i && i !== correctIdx;
                      return (
                        <motion.button key={i} whileHover={!explain ? { scale: 1.01 } : {}}
                          whileTap={!explain ? { scale: 0.99 } : {}}
                          onClick={() => !explain && setSel(i)}
                          className={`rounded-2xl border px-6 py-5 text-left transition-all duration-200 ${
                            isC ? T.correct : isW ? T.wrong : sel === i ? T.selected : T.idle
                          }`}>
                          <div className="flex items-start gap-4">
                            <div className={`mt-0.5 w-10 h-10 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-base font-black ${
                              isC ? "border-emerald-400 text-emerald-400" :
                              isW ? "border-red-400 text-red-400" :
                              sel === i ? (comp ? "border-blue-400 text-blue-300" : "border-emerald-500 text-emerald-600") :
                              comp ? "border-blue-500/25 text-blue-500/40" : "border-slate-300 text-slate-400"
                            }`}>{String.fromCharCode(65+i)}</div>
                            <span className={`leading-relaxed text-base md:text-lg flex-1 ${T.muted}`}>{text}</span>
                            {isC && <span className="ml-2 text-emerald-400 text-2xl font-black flex-shrink-0">✓</span>}
                            {isW && <span className="ml-2 text-red-400 text-2xl flex-shrink-0">✗</span>}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 pt-1">
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      onClick={submit} disabled={sel === null || explain}
                      className={`px-8 py-4 rounded-2xl text-lg disabled:opacity-40 transition-all ${T.btn}`}>
                      Submit Answer
                    </motion.button>
                    <button onClick={toggleSave}
                      className={`px-6 py-4 rounded-2xl text-base border transition-all font-semibold ${T.outlineBtn}`}>
                      {saved.includes(curQ.id) ? "⭐ Saved" : "☆ Save"}
                    </button>
                  </div>

                  {/* Explanation */}
                  {explain && (
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                      <div className={`rounded-2xl border p-6 ${timedOut ? "border-amber-500/30 bg-amber-950/15" : "border-emerald-400/25 bg-emerald-950/15"}`}>
                        <div className={`text-sm font-bold uppercase tracking-widest mb-3 ${timedOut ? "text-amber-400" : "text-emerald-400"}`}>
                          {timedOut ? "⏰ Time Expired — Explanation" : "✓ Explanation"}
                        </div>
                        <p className={`text-lg leading-relaxed ${T.muted}`}>{curQ.explain}</p>
                      </div>
                      <div className={`rounded-2xl border p-5 ${T.panel}`}>
                        <div className={`text-sm font-bold uppercase tracking-widest mb-2 ${T.accent}`}>Real-World Example</div>
                        <p className={`text-base leading-relaxed ${T.sub}`}>{curQ.example}</p>
                      </div>
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                        onClick={next} className={`w-full py-5 rounded-2xl text-xl transition-all ${T.btn}`}>
                        {qi+1 < pack.length ? "Next Question →" : ri+1 < realms.length ? "Next Realm →" : "See Results 🏆"}
                      </motion.button>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Session stats */}
            <div className={`rounded-3xl p-6 space-y-4 ${T.card} ${T.glowCard}`}>
              <h3 className={`text-xl font-black ${T.heading}`}>Session Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { l: "Score", v: score, i: "🏆" },
                  { l: "Accuracy", v: `${acc}%`, i: "🎯" },
                  { l: "Answered", v: answered.length, i: "📝" },
                  { l: "Saved", v: saved.length, i: "⭐" },
                ].map(s => (
                  <div key={s.l} className={`rounded-2xl border p-4 text-center ${T.panel}`}>
                    <div className="text-xl mb-1">{s.i}</div>
                    <div className={`text-sm font-bold uppercase tracking-wide ${T.sub}`}>{s.l}</div>
                    <div className={`text-2xl font-black mt-1 ${T.accentBr}`}>{s.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Realm map */}
            <div className={`rounded-3xl p-6 ${T.card}`}>
              <h3 className={`text-lg font-black mb-4 ${T.heading}`}>Realm Map</h3>
              <div className="flex flex-wrap gap-2">
                {realms.map((r, idx) => (
                  <div key={r.name} title={r.name}
                    className={`w-9 h-9 rounded-xl text-sm flex items-center justify-center border transition-all ${
                      idx < ri
                        ? (comp ? "border-blue-400/50 bg-blue-950/60 text-blue-300" : "border-emerald-400 bg-emerald-100 text-emerald-700")
                        : idx === ri
                        ? (comp ? "border-blue-400 bg-blue-600 text-white shadow-[0_0_10px_rgba(59,130,246,0.7)]" : "border-emerald-500 bg-emerald-600 text-white")
                        : (comp ? "border-blue-500/15 bg-slate-900/40 text-blue-500/30" : "border-slate-200 bg-slate-50 text-slate-300")
                    }`}>{r.icon}</div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className={`rounded-3xl p-6 ${T.card}`}>
              <h3 className={`text-lg font-black mb-3 ${T.heading}`}>Tips</h3>
              <div className="space-y-2">
                {(comp ? [
                  "All 4 options are plausible — only one is the most precise and correct.",
                  comp ? "60 seconds per question — think fast but carefully." : "",
                  "Timeout = 0 pts but the explanation still shows.",
                  "Research Qs = 30 pts · Starter Qs = 20 pts.",
                ] : [
                  "Take your time — deep understanding matters here.",
                  "All options are similar in style — read carefully.",
                  "Save questions you want to review later.",
                  "Questions increase in depth across the realm.",
                ]).filter(Boolean).map((t, i) => (
                  <div key={i} className={`rounded-xl border p-3 text-sm leading-relaxed ${T.panel} ${T.sub}`}>{t}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // DONE SCREEN (end of realm, more realms remain)
  // ═══════════════════════════════════════════════════════════
  if (screen === "done") return (
    <div className={`min-h-screen ${T.screenBg} flex items-center justify-center p-6`}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className={`w-full max-w-2xl rounded-[40px] overflow-hidden ${T.card} ${T.glowCard}`}>
        <div className={`h-2 bg-gradient-to-r ${T.barGrad}`} />
        <div className="p-10 text-center space-y-7">
          <div className="text-7xl">{comp ? "⚡" : "🌿"}</div>
          <div>
            <div className={`text-base font-bold uppercase tracking-widest ${T.accent}`}>Realm Complete!</div>
            <h2 className={`mt-2 text-4xl font-black ${T.heading}`}>{realm?.name} ✓</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { l: "Score so far", v: score },
              { l: "Accuracy", v: `${acc}%` },
              { l: "Up Next", v: realms[ri+1]?.name || "Results" },
            ].map(s => (
              <div key={s.l} className={`rounded-2xl border p-5 ${T.panel}`}>
                <div className={`text-sm font-bold ${T.sub}`}>{s.l}</div>
                <div className={`text-xl font-black mt-2 ${T.accentBr}`}>{s.v}</div>
              </div>
            ))}
          </div>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={continueRealm}
            className={`w-full py-5 rounded-2xl text-xl transition-all ${T.btn}`}>
            Continue → {realms[ri+1]?.name || "See Results 🏆"}
          </motion.button>
          <button onClick={goHome} className={`text-base px-6 py-3 rounded-xl border transition-all ${T.outlineBtn}`}>
            ← Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // RESULT SCREEN
  // ═══════════════════════════════════════════════════════════
  if (screen === "result") return (
    <div className={`min-h-screen ${T.screenBg} flex items-center justify-center p-6`}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className={`w-full max-w-2xl rounded-[40px] overflow-hidden ${T.card} ${T.glowCard}`}>
        <div className={`h-2 bg-gradient-to-r ${T.barGrad}`} />
        <div className="p-10 text-center space-y-7">
          <div className="text-7xl">🏆</div>
          <div>
            <h2 className={`text-4xl font-black ${comp ? "bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent" : T.heading}`}>
              Mission Complete!
            </h2>
            <p className={`mt-2 text-lg ${T.sub}`}>{comp ? "Competitive Mode" : "Calm Mode"} — all realms conquered</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { l: "Final Score", v: score, i: "🏆" },
              { l: "Accuracy", v: `${acc}%`, i: "🎯" },
              { l: "Saved Cards", v: saved.length, i: "⭐" },
            ].map(s => (
              <div key={s.l} className={`rounded-2xl border p-6 ${T.panel}`}>
                <div className="text-3xl mb-2">{s.i}</div>
                <div className={`text-sm font-bold ${T.sub}`}>{s.l}</div>
                <div className={`text-3xl font-black mt-1 ${T.accentBr}`}>{s.v}</div>
              </div>
            ))}
          </div>

          {/* Score badge */}
          <div className={`rounded-2xl border p-5 text-lg font-semibold ${T.panel} ${T.muted}`}>
            {score >= 8000 ? "🌟 Legendary — Truly exceptional mastery!" :
             score >= 6000 ? "🔥 Expert — Outstanding depth of knowledge!" :
             score >= 4000 ? "👍 Proficient — Solid foundations established!" :
             score >= 2000 ? "📚 Learning — Great progress, keep going!" :
                             "🌱 Just starting — Every question is a step forward!"}
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => startMode(mode)}
              className={`px-8 py-4 rounded-2xl text-lg transition-all ${T.btn}`}>
              Replay {comp ? "Competitive ⚡" : "Calm 🌿"}
            </motion.button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => startMode(comp ? "calm" : "competitive")}
              className={`px-8 py-4 rounded-2xl text-lg border transition-all font-semibold ${T.outlineBtn}`}>
              Try {comp ? "Calm 🌿" : "Competitive ⚡"}
            </motion.button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={goHome}
              className={`px-8 py-4 rounded-2xl text-lg border transition-all font-semibold ${T.outlineBtn}`}>
              🏠 Home
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  // Fallback
  return null;
}
