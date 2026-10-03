import { createElement as _h, Fragment as _F } from "react";
import { useState, useEffect, useRef, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { css, cssx, CHROMELESS as DC_CHROMELESS, buildLayout, buildSidebar, buildUser, useViewportW, AppShell, Sidebar as DSidebar, BottomNav as DBottomNav, ProfileSheet as DProfileSheet, AddGymSheet as DAddGymSheet, Toasts as DToasts, RestOverlay as DRestOverlay, SplashScreen as DSplash, WelcomeScreen as DWelcome, AuthScreen as DAuth, OnboardingScreen as DOnb, LoginScreen as DLogin, PaywallScreen as DPaywall, PurchaseStatesScreen as DPayMsg, OfflineScreen as DOffline, HomeScreen as DHome, BodyLabScreen as DBodyLab, ProgramsScreen as DPrograms, ExercisesScreen as DGuide, StatsScreen as DStats, WeightScreen as DWeight, SocialScreen as DSocial, ActiveWorkoutScreen as DActive, PostWorkoutScreen as DPost, SettingsHub as DSettingsHub, AccountPage as DAcct, BillingPage as DBilling, NotifPrefsPage as DNotifPrefs, LegalPage as DLegal, HelpPage as DHelp, AboutPage as DAbout, DeleteAccountPage as DDelAcct, ExportPage as DExport, ReferralPage as DReferral, AdminScreen as DAdmin, ProgramEditor as DEditor, MuscleBuilderModal as DBuilder, ActiveWorkoutV5 as DActiveV5 } from "./design.js";
const C = {
  bg: "#16120D",
  cream: "#F4ECDD",
  ink: "var(--ink)",
  glass: "#221E18",
  glassHard: "#221E18",
  cardAlt: "#1B1610",
  surface: "rgba(255,255,255,0.035)",
  border: "rgba(255,255,255,0.06)",
  shadow: "0 14px 34px rgba(0,0,0,0.28)",
  shadowSm: "0 8px 20px rgba(0,0,0,0.2)",
  accent: "var(--ac)",
  accentDark: "var(--acd)",
  accentBg: "rgba(var(--acr),0.14)",
  amber: "var(--ac)",
  amberGrad: "linear-gradient(150deg,var(--acl),var(--ac) 55%,var(--acd))",
  btnGrad: "linear-gradient(135deg,var(--acl),var(--acd))",
  avatarGrad: "linear-gradient(140deg,var(--ac),var(--acd))",
  text: "#F4ECDD",
  mid: "#A99E8C",
  muted: "#8E8475",
  faint: "#6E665B",
  onAmberMuted: "rgba(var(--inkr),0.62)",
  creamMuted: "#9A8E7B",
  danger: "#E26A4F",
  good: "#57C08A",
  pink: "#E8825C",
  purple: "var(--ac)",
  supersetA: "rgba(var(--acr),0.10)",
  supersetB: "rgba(var(--acr),0.08)",
  supersetBorder: "rgba(var(--acr),0.4)"
};
function mkEx(name, sets = 3, repsMin = 8, repsMax = 12) {
  return {
    type: "ex",
    id: uid(),
    name,
    sets,
    repsMin,
    repsMax
  };
}
function mkSS(...exList) {
  return {
    type: "ss",
    id: uid(),
    exercises: exList.map(e => ({
      ...e,
      id: e.id || uid()
    }))
  };
}
const INIT_USERS = [{
  id: "alex",
  name: "Alex",
  av: "A",
  pin: null,
  color: C.accent
}, {
  id: "sam",
  name: "Sam",
  av: "S",
  pin: "1234",
  color: C.pink
}, {
  id: "maria",
  name: "Maria",
  av: "M",
  pin: null,
  color: C.purple
}];
const USER_COLORS = ["var(--ac)", "#ff8fab", "var(--ac)", "var(--ac)", "#54a0ff", "#ff6b6b", "#1dd1a1", "#f368e0", "#ffd32a", "#0abde3"];
const INIT_COLLECTIONS = [{
  id: "c1",
  owner: "alex",
  name: "PPL Program",
  emoji: "🏋️",
  desc: "Push Pull Legs 6-day split",
  pub: true,
  workouts: [{
    id: "w1",
    name: "Push A",
    emoji: "💪",
    entries: [mkEx("Bench Press", 4, 6, 10), mkEx("Incline DB Press", 3, 8, 12), mkSS(mkEx("Overhead Press", 3, 8, 12), mkEx("Lateral Raise", 3, 12, 15)), mkEx("Tricep Pushdown", 3, 12, 15)]
  }, {
    id: "w2",
    name: "Pull A",
    emoji: "🦾",
    entries: [mkEx("Deadlift", 3, 4, 6), mkEx("Pull-Up", 4, 6, 10), mkSS(mkEx("Barbell Row", 3, 8, 12), mkEx("Face Pull", 3, 15, 20)), mkEx("Bicep Curl", 3, 10, 14)]
  }, {
    id: "w3",
    name: "Legs A",
    emoji: "🦵",
    entries: [mkEx("Squat", 4, 6, 10), mkEx("Romanian Deadlift", 3, 8, 12), mkSS(mkEx("Leg Press", 3, 10, 15), mkEx("Leg Curl", 3, 12, 15)), mkEx("Calf Raise", 4, 15, 20)]
  }]
}, {
  id: "c2",
  owner: "alex",
  name: "Bro Split",
  emoji: "🏆",
  desc: "Classic 5-day bodybuilder split",
  pub: true,
  workouts: [{
    id: "w4",
    name: "Chest Day",
    emoji: "💥",
    entries: [mkEx("Bench Press", 4, 6, 10), mkSS(mkEx("Incline Bench", 3, 8, 12), mkEx("Cable Fly", 3, 12, 15)), mkEx("Dip", 3, 10, 15)]
  }, {
    id: "w5",
    name: "Back Day",
    emoji: "🦾",
    entries: [mkEx("Deadlift", 3, 4, 6), mkEx("Pull-Up", 3, 6, 10), mkSS(mkEx("Barbell Row", 3, 8, 12), mkEx("Lat Pulldown", 3, 10, 14))]
  }, {
    id: "w6",
    name: "Shoulder Day",
    emoji: "🎯",
    entries: [mkEx("Overhead Press", 4, 6, 10), mkSS(mkEx("Lateral Raise", 3, 12, 15), mkEx("Front Raise", 3, 12, 15), mkEx("Face Pull", 3, 15, 20)), mkEx("Face Pull", 3, 15, 20)]
  }, {
    id: "w7",
    name: "Arm Day",
    emoji: "💪",
    entries: [mkSS(mkEx("Bicep Curl", 4, 10, 14), mkEx("Tricep Pushdown", 4, 10, 14)), mkSS(mkEx("Hammer Curl", 3, 10, 14), mkEx("Skull Crusher", 3, 10, 14))]
  }, {
    id: "w8",
    name: "Leg Day",
    emoji: "🦵",
    entries: [mkEx("Squat", 4, 6, 10), mkSS(mkEx("Leg Press", 3, 10, 15), mkEx("Leg Curl", 3, 12, 15)), mkEx("Calf Raise", 4, 15, 20)]
  }]
}, {
  id: "c3",
  owner: "sam",
  name: "Sam Full Body",
  emoji: "⚡",
  desc: "3-day full body",
  pub: true,
  workouts: [{
    id: "w9",
    name: "Full Body A",
    emoji: "⚡",
    entries: [mkEx("Squat", 3, 8, 12), mkEx("Bench Press", 3, 8, 12), mkSS(mkEx("Deadlift", 3, 6, 8), mkEx("Overhead Press", 3, 8, 12))]
  }]
}];
const INIT_HISTORY = {
  alex: [{
    id: "h1",
    date: "2025-03-29",
    workoutName: "Push A",
    collectionName: "PPL Program",
    dur: 54,
    vol: 8400,
    sets: [{
      ex: "Bench Press",
      reps: 8,
      kg: 100
    }, {
      ex: "Bench Press",
      reps: 7,
      kg: 100
    }, {
      ex: "Overhead Press",
      reps: 10,
      kg: 60
    }, {
      ex: "Lateral Raise",
      reps: 15,
      kg: 14,
      supersetWith: "Overhead Press"
    }]
  }, {
    id: "h2",
    date: "2025-04-01",
    workoutName: "Push A",
    collectionName: "PPL Program",
    dur: 58,
    vol: 8900,
    sets: [{
      ex: "Bench Press",
      reps: 8,
      kg: 102.5
    }, {
      ex: "Bench Press",
      reps: 8,
      kg: 102.5
    }, {
      ex: "Overhead Press",
      reps: 10,
      kg: 62.5
    }]
  }],
  sam: [],
  maria: []
};
const INIT_WEIGHTS = {
  alex: [{
    date: "Mar 1",
    w: 84.2
  }, {
    date: "Mar 8",
    w: 83.8
  }, {
    date: "Mar 15",
    w: 83.4
  }, {
    date: "Mar 22",
    w: 83.0
  }, {
    date: "Mar 29",
    w: 82.6
  }, {
    date: "Apr 1",
    w: 82.2
  }],
  sam: [],
  maria: []
};
const INIT_MSGS = [{
  id: "m1",
  from: "sam",
  to: "alex",
  subject: "Love the PPL!",
  body: "Hey Alex! Tried your PPL Push A — those supersets of OHP + Lateral Raise are brutal! 😅",
  time: "2025-04-01T10:00:00Z",
  read: false
}, {
  id: "m2",
  from: "maria",
  to: "alex",
  subject: "Rest tip 💡",
  body: "For supersets I rest 90s after the second exercise, not between them. Makes it way more intense!",
  time: "2025-04-01T15:00:00Z",
  read: false
}];
const BASE_EXERCISES = ["Bench Press", "Incline Bench", "Incline DB Press", "Cable Fly", "Machine Fly", "Dip", "Pec Deck", "Overhead Press", "Lateral Raise", "Front Raise", "Upright Row", "Face Pull", "Arnold Press", "Tricep Pushdown", "Skull Crusher", "Tricep Dip", "Close Grip Bench", "Overhead Tricep Extension", "Deadlift", "Pull-Up", "Chin-Up", "Barbell Row", "Cable Row", "Lat Pulldown", "Seated Row", "T-Bar Row", "Bicep Curl", "Hammer Curl", "Preacher Curl", "Cable Curl", "Concentration Curl", "Squat", "Romanian Deadlift", "Leg Press", "Leg Curl", "Leg Extension", "Calf Raise", "Hip Thrust", "Lunge", "Bulgarian Split Squat", "Plank", "Ab Rollout", "Hanging Leg Raise", "Cable Crunch", "Russian Twist"];
const EXERCISE_DB = {
  "Chest": [{
    name: "Barbell Bench Press",
    slug: "barbell-bench-press"
  }, {
    name: "Incline Bench Press",
    slug: "incline-bench-press"
  }, {
    name: "Decline Bench Press",
    slug: "decline-bench-press"
  }, {
    name: "Dumbbell Bench Press",
    slug: "dumbbell-bench-press"
  }, {
    name: "Incline Dumbbell Bench Press",
    slug: "incline-dumbbell-bench-press"
  }, {
    name: "Decline Dumbbell Bench Press",
    slug: "decline-dumbbell-bench-press"
  }, {
    name: "Neutral Grip Dumbbell Bench Press",
    slug: "palms-in-dumbbell-bench-press"
  }, {
    name: "Reverse Grip Dumbbell Bench Press",
    slug: "reverse-dumbbell-bench-press"
  }, {
    name: "One-Arm Dumbbell Bench Press",
    slug: "one-arm-dumbbell-bench-press"
  }, {
    name: "Close Grip Dumbbell Press",
    slug: "close-grip-dumbbell-press"
  }, {
    name: "Dumbbell Floor Press",
    slug: "dumbbell-floor-press"
  }, {
    name: "Floor Press",
    slug: "floor-bench-press"
  }, {
    name: "Smith Machine Bench Press",
    slug: "smith-machine-bench-press"
  }, {
    name: "Incline Smith Machine Bench Press",
    slug: "incline-smith-machine-bench-press"
  }, {
    name: "Decline Smith Machine Bench Press",
    slug: "decline-smith-machine-bench-press"
  }, {
    name: "Hammer Strength Bench Press",
    slug: "hammer-strength-bench-press"
  }, {
    name: "Incline Close Grip Bench Press",
    slug: "incline-close-grip-bench-press"
  }, {
    name: "Dumbbell Flys",
    slug: "dumbbell-flys"
  }, {
    name: "Incline Dumbbell Flys",
    slug: "incline-dumbbell-flys"
  }, {
    name: "Decline Dumbbell Flys",
    slug: "decline-dumbbell-flys"
  }, {
    name: "Cable Fly",
    slug: "cable-crossovers-(mid-chest)"
  }, {
    name: "Pec Deck",
    slug: "pec-dec"
  }, {
    name: "Push Up",
    slug: "push-up"
  }, {
    name: "Decline Push Up",
    slug: "decline-push-up"
  }, {
    name: "Close Grip Push Up",
    slug: "close-grip-push-up"
  }, {
    name: "Chest Dip",
    slug: "chest-dip"
  }, {
    name: "Weighted Chest Dip",
    slug: "weighted-chest-dip"
  }, {
    name: "Dumbbell Pullover",
    slug: "dumbbell-pullover"
  }, {
    name: "Barbell Pullover",
    slug: "barbell-pullover"
  }],
  "Back": [{
    name: "Lat Pulldown",
    slug: "lat-pull-down"
  }, {
    name: "Close Grip Lat Pulldown",
    slug: "close-grip-pull-down"
  }, {
    name: "Wide Grip Lat Pulldown",
    slug: "wide-grip-pull-down"
  }, {
    name: "Reverse Grip Lat Pulldown",
    slug: "reverse-grip-lat-pull-down"
  }, {
    name: "Straight Arm Lat Pulldown",
    slug: "straight-arm-lat-pull-down"
  }, {
    name: "Wide Grip Pull Up",
    slug: "wide-grip-pull-up"
  }, {
    name: "Pull Up",
    slug: "pull-up"
  }, {
    name: "Chin Up",
    slug: "chin-up"
  }, {
    name: "V-Bar Pull Up",
    slug: "v-bar-pull-up"
  }, {
    name: "Bent Over Barbell Row",
    slug: "bent-over-barbell-row"
  }, {
    name: "One Arm Dumbbell Row",
    slug: "one-arm-dumbbell-row"
  }, {
    name: "Bent Over Dumbbell Row",
    slug: "bent-over-dumbbell-row"
  }, {
    name: "Chest Supported Dumbbell Row",
    slug: "chest-supported-dumbbell-row"
  }, {
    name: "Seated Cable Row",
    slug: "seated-row"
  }, {
    name: "Cable Face Pull",
    slug: "cable-face-pull"
  }, {
    name: "Inverted Row",
    slug: "high-inverted-row"
  }, {
    name: "Hyperextension",
    slug: "hyperextension"
  }, {
    name: "Weighted Hyperextension",
    slug: "weighted-hyperextension"
  }, {
    name: "Good Mornings",
    slug: "good-mornings"
  }, {
    name: "Superman",
    slug: "superman"
  }, {
    name: "Deadlift",
    slug: "deadlifts"
  }, {
    name: "Sumo Deadlift",
    slug: "sumo-deadlift"
  }],
  "Shoulders": [{
    name: "Overhead Press",
    slug: "military-press"
  }, {
    name: "Seated Dumbbell Press",
    slug: "seated-dumbbell-press"
  }, {
    name: "Standing Dumbbell Press",
    slug: "standing-dumbbell-press"
  }, {
    name: "Arnold Press",
    slug: "seated-arnold-press"
  }, {
    name: "Standing Arnold Press",
    slug: "standing-arnold-press"
  }, {
    name: "Smith Machine Shoulder Press",
    slug: "smith-machine-shoulder-press"
  }, {
    name: "Z Press",
    slug: "z-press"
  }, {
    name: "Lateral Raise",
    slug: "dumbbell-lateral-raise"
  }, {
    name: "Seated Lateral Raise",
    slug: "seated-dumbbell-lateral-raise"
  }, {
    name: "Cable Lateral Raise",
    slug: "two-arm-cable-lateral-raise"
  }, {
    name: "One Arm Cable Lateral Raise",
    slug: "one-arm-cable-lateral-raise"
  }, {
    name: "Front Raise",
    slug: "dumbbell-front-raise"
  }, {
    name: "Barbell Front Raise",
    slug: "barbell-front-raise"
  }, {
    name: "Rear Delt Fly",
    slug: "bent-over-dumbbell-reverse-fly"
  }, {
    name: "Incline Rear Delt Fly",
    slug: "dumbbell-reverse-fly-on-incline-bench"
  }, {
    name: "Upright Row",
    slug: "upright-row"
  }, {
    name: "Cable Upright Row",
    slug: "cable-upright-row"
  }],
  "Biceps": [{
    name: "Barbell Curl",
    slug: "standing-barbell-curl"
  }, {
    name: "Dumbbell Curl",
    slug: "standing-dumbbell-curl"
  }, {
    name: "Seated Dumbbell Curl",
    slug: "seated-dumbbell-curl"
  }, {
    name: "Incline Dumbbell Curl",
    slug: "incline-dumbbell-curl"
  }, {
    name: "Concentration Curl",
    slug: "concentration-cur"
  }, {
    name: "Hammer Curl",
    slug: "standing-hammer-curl"
  }, {
    name: "Cross Body Hammer Curl",
    slug: "hammer-curl-across-the-body"
  }, {
    name: "Incline Hammer Curl",
    slug: "incline-hammer-curl"
  }, {
    name: "EZ Bar Curl",
    slug: "ez-bar-curl"
  }, {
    name: "Preacher Curl",
    slug: "preacher-curl"
  }, {
    name: "EZ Bar Preacher Curl",
    slug: "ez-bar-preacher-curl"
  }, {
    name: "Dumbbell Preacher Curl",
    slug: "dumbbell-preacher-curl"
  }, {
    name: "Cable Curl",
    slug: "cable-curl"
  }, {
    name: "Rope Cable Curl",
    slug: "rope-cable-curl"
  }, {
    name: "Cable Preacher Curl",
    slug: "cable-preacher-curl"
  }, {
    name: "Spider Curl",
    slug: "spider-curl"
  }, {
    name: "Zottman Curl",
    slug: "zottman-curl"
  }, {
    name: "Reverse Barbell Curl",
    slug: "reverse-barbell-curl"
  }, {
    name: "Drag Curl",
    slug: "barbell-drag-curl"
  }, {
    name: "Machine Bicep Curl",
    slug: "machine-bicep-curl"
  }],
  "Triceps": [{
    name: "Tricep Pushdown",
    slug: "tricep-extension"
  }, {
    name: "Rope Tricep Pushdown",
    slug: "rope-tricep-extension"
  }, {
    name: "Reverse Grip Tricep Pushdown",
    slug: "reverse-grip-tricep-extension"
  }, {
    name: "Close Grip Bench Press",
    slug: "close-grip-bench-press"
  }, {
    name: "Skull Crusher",
    slug: "lying-tricep-extension"
  }, {
    name: "EZ Bar Skull Crusher",
    slug: "ez-bar-skullcrusher"
  }, {
    name: "Incline Skull Crusher",
    slug: "incline-skullcrusher"
  }, {
    name: "Tricep Dip",
    slug: "tricep-dip"
  }, {
    name: "Weighted Tricep Dip",
    slug: "weighted-tricep-dips"
  }, {
    name: "Bench Dip",
    slug: "tricep-bench-dip"
  }, {
    name: "Overhead Tricep Extension",
    slug: "overhead-tricep-extension"
  }, {
    name: "Dumbbell Tricep Extension",
    slug: "two-arm-dumbbell-extension"
  }, {
    name: "One Arm Dumbbell Extension",
    slug: "one-arm-dumbbell-extension"
  }, {
    name: "Tricep Kickback",
    slug: "tricep-kickback"
  }, {
    name: "Cable Tricep Kickback",
    slug: "cable-tricep-kickback"
  }, {
    name: "French Press",
    slug: "french-press"
  }, {
    name: "Overhead Barbell Extension",
    slug: "overhead-barbell-extension"
  }],
  "Legs": [{
    name: "Squat",
    slug: "squat"
  }, {
    name: "Front Squat",
    slug: "front-squat"
  }, {
    name: "Dumbbell Squat",
    slug: "dumbbell-squat"
  }, {
    name: "Goblet Squat",
    slug: "dumbbell-goblet-squat"
  }, {
    name: "Sumo Squat",
    slug: "sumo-squat"
  }, {
    name: "Smith Machine Squat",
    slug: "smith-machine-squat"
  }, {
    name: "Hack Squat",
    slug: "hack-squat"
  }, {
    name: "Bulgarian Split Squat",
    slug: "one-leg-dumbbell-squat-aka-bulgarian-squat"
  }, {
    name: "Split Squat",
    slug: "split-squat"
  }, {
    name: "Lunge",
    slug: "dumbbell-lunge"
  }, {
    name: "Walking Lunge",
    slug: "dumbbell-walking-lunge"
  }, {
    name: "Reverse Lunge",
    slug: "dumbbell-rear-lunge"
  }, {
    name: "Step Up",
    slug: "dumbbell-step-up"
  }, {
    name: "Leg Press",
    slug: "45-degree-leg-press"
  }, {
    name: "Leg Extension",
    slug: "leg-extension"
  }, {
    name: "Romanian Deadlift",
    slug: "stiff-leg-deadlift-aka-romanian-deadlift"
  }, {
    name: "Dumbbell RDL",
    slug: "dumbbell-stiff-leg-deadlift"
  }, {
    name: "Leg Curl",
    slug: "leg-curl"
  }, {
    name: "Seated Leg Curl",
    slug: "seated-leg-curl"
  }, {
    name: "Nordic Hamstring Curl",
    slug: "partner-assisted-nordic-hamstring-curls"
  }, {
    name: "Hip Thrust",
    slug: "barbell-hip-thrust"
  }, {
    name: "Glute Bridge",
    slug: "barbell-glute-bridge"
  }, {
    name: "Calf Raise",
    slug: "standing-calf-raise"
  }, {
    name: "Seated Calf Raise",
    slug: "seated-calf-raise"
  }, {
    name: "Donkey Calf Raise",
    slug: "donkey-calf-raise"
  }],
  "Abs": [{
    name: "Cable Crunch",
    slug: "cable-crunch"
  }, {
    name: "Crunch",
    slug: "ab-crunch"
  }, {
    name: "Weighted Crunch",
    slug: "weighted-crunch"
  }, {
    name: "Reverse Crunch",
    slug: "reverse-crunch-to-dead-bug"
  }, {
    name: "Plank",
    slug: "hover"
  }, {
    name: "Side Plank",
    slug: "side-hover"
  }, {
    name: "Hanging Leg Raise",
    slug: "hanging-leg-raise"
  }, {
    name: "Hanging Knee Raise",
    slug: "hanging-knee-raise"
  }, {
    name: "Lying Leg Raise",
    slug: "lying-floor-leg-raise"
  }, {
    name: "Sit Up",
    slug: "sit-up"
  }, {
    name: "Decline Sit Up",
    slug: "decline-situp"
  }, {
    name: "Ab Wheel Rollout",
    slug: "abdominal-barbell-rollouts"
  }, {
    name: "Wood Chop",
    slug: "wood-chop"
  }, {
    name: "Landmine Rotation",
    slug: "landmine-rotation"
  }],
  "Calves": [{
    name: "Standing Calf Raise",
    slug: "standing-calf-raise"
  }, {
    name: "Smith Machine Calf Raise",
    slug: "smith-machine-calf-raise"
  }, {
    name: "Leg Press Calf Raise",
    slug: "45-degress-calf-press"
  }, {
    name: "Single Leg Calf Raise",
    slug: "standing-one-leg-calf-raise-with-dumbbell"
  }],
  "Forearms": [{
    name: "Barbell Wrist Curl",
    slug: "barbell-wrist-curl"
  }, {
    name: "Reverse Wrist Curl",
    slug: "reverse-barbell-wrist-curl"
  }, {
    name: "Dumbbell Wrist Curl",
    slug: "dumbbell-wrist-curl-over-bench"
  }],
  "Traps": [{
    name: "Barbell Shrug",
    slug: "barbell-shrug"
  }, {
    name: "Dumbbell Shrug",
    slug: "dumbbell-shrugs"
  }, {
    name: "Cable Shrug",
    slug: "cable-shrug"
  }, {
    name: "Machine Shrug",
    slug: "machine-shrug"
  }, {
    name: "Smith Machine Shrug",
    slug: "smith-machine-shrug"
  }, {
    name: "High Pull",
    slug: "high-pull"
  }, {
    name: "Band Pull Apart",
    slug: "band-pull-apart"
  }],
  "Glutes": [{
    name: "Barbell Hip Thrust",
    slug: "barbell-hip-thrust"
  }, {
    name: "Bodyweight Hip Thrust",
    slug: "bodyweight-hip-thrust"
  }, {
    name: "Single Leg Hip Thrust",
    slug: "single-leg-hip-thrust"
  }, {
    name: "Barbell Glute Bridge",
    slug: "barbell-glute-bridge"
  }, {
    name: "Bodyweight Glute Bridge",
    slug: "bodyweight-glute-bridge"
  }, {
    name: "Banded Glute Bridge",
    slug: "banded-glute-bridge"
  }, {
    name: "Glute Kickback",
    slug: "glute-kick-back"
  }, {
    name: "Hip Abduction Machine",
    slug: "hip-abduction-machine"
  }, {
    name: "Hip Adduction Machine",
    slug: "hip-adduction-machine"
  }, {
    name: "Lateral Band Walk",
    slug: "lateral-band-walk"
  }, {
    name: "Curtsy Lunge",
    slug: "curtsy-lunge"
  }],
  "Calisthenics": [{
    name: "Pull Up",
    slug: "pull-up"
  }, {
    name: "Chin Up",
    slug: "chin-up"
  }, {
    name: "Wide Grip Pull Up",
    slug: "wide-grip-pull-up"
  }, {
    name: "Australian Pull Up",
    slug: "inverted-row"
  }, {
    name: "Commando Pull Up",
    slug: "commando-pull-up"
  }, {
    name: "Archer Pull Up",
    slug: "archer-pull-up"
  }, {
    name: "Muscle Up",
    slug: "muscle-up"
  }, {
    name: "Push Up",
    slug: "push-up"
  }, {
    name: "Diamond Push Up",
    slug: "close-grip-push-up"
  }, {
    name: "Incline Push Up",
    slug: "incline-push-up"
  }, {
    name: "Decline Push Up",
    slug: "decline-push-up"
  }, {
    name: "Pike Push Up",
    slug: "pike-push-up"
  }, {
    name: "One Arm Push Up",
    slug: "one-arm-push-up"
  }, {
    name: "Handstand Push Up",
    slug: "handstand-push-up"
  }, {
    name: "Chest Dip",
    slug: "chest-dip"
  }, {
    name: "Tricep Dip",
    slug: "tricep-dip"
  }, {
    name: "Bench Dip",
    slug: "tricep-bench-dip"
  }, {
    name: "Bodyweight Squat",
    slug: "bodyweight-squat"
  }, {
    name: "Pistol Squat",
    slug: "pistol-squat"
  }, {
    name: "Jump Squat",
    slug: "jump-squat"
  }, {
    name: "Burpee",
    slug: "burpee"
  }, {
    name: "Mountain Climbers",
    slug: "mountain-climbers"
  }, {
    name: "Wall Sit",
    slug: "wall-sit"
  }, {
    name: "Box Jump",
    slug: "box-jump"
  }, {
    name: "Hanging Leg Raise",
    slug: "hanging-leg-raise"
  }, {
    name: "Hanging Knee Raise",
    slug: "hanging-knee-raise"
  }, {
    name: "Toes to Bar",
    slug: "toes-to-bar"
  }, {
    name: "L-Sit",
    slug: "l-sit"
  }, {
    name: "Front Lever",
    slug: "front-lever"
  }, {
    name: "Back Lever",
    slug: "back-lever"
  }, {
    name: "Dragon Flag",
    slug: "dragon-flag"
  }, {
    name: "Flutter Kicks",
    slug: "flutter-kicks"
  }, {
    name: "Plank",
    slug: "hover"
  }, {
    name: "Side Plank",
    slug: "side-hover"
  }],
  "Olympic": [{
    name: "Clean & Jerk",
    slug: "clean-and-jerk"
  }, {
    name: "Clean",
    slug: "clean"
  }, {
    name: "Hang Clean",
    slug: "hang-clean"
  }, {
    name: "Power Clean",
    slug: "power-clean"
  }, {
    name: "Snatch",
    slug: "snatch"
  }, {
    name: "Split Jerk",
    slug: "split-jerk"
  }, {
    name: "Split Snatch",
    slug: "split-snatch"
  }],
  "Stretching": [{
    name: "World's Greatest Stretch",
    slug: "worlds-greatest-stretch"
  }, {
    name: "Inchworm",
    slug: "inchworm"
  }, {
    name: "90/90 Piriformis Stretch",
    slug: "90-90-piriformis-stretch"
  }, {
    name: "Figure 4 Glute Stretch",
    slug: "figure-4-glute-stretch"
  }, {
    name: "Half Kneeling Quad Stretch",
    slug: "half-kneeling-quad-stretch"
  }, {
    name: "Deep Squat Prying",
    slug: "deep-squat-prying"
  }, {
    name: "Rocking Frog Stretch",
    slug: "rocking-frog-stretch"
  }, {
    name: "Hamstring Foam Roll",
    slug: "foam-rolling-hamstrings"
  }, {
    name: "Quad Foam Roll",
    slug: "foam-rolling-quads"
  }, {
    name: "IT Band Foam Roll",
    slug: "foam-rolling-it-band"
  }, {
    name: "Lat Foam Roll",
    slug: "foam-rolling-lats"
  }, {
    name: "Glute Foam Roll",
    slug: "foam-rolling-glutes"
  }, {
    name: "Thoracic Spine Foam Roll",
    slug: "foam-rolling-thoracic-spine"
  }]
};
function findSlug(exName) {
  if (!exName) return null;
  const name = exName.toLowerCase().trim();
  for (const cat of Object.values(EXERCISE_DB)) {
    for (const ex of cat) {
      if (ex.name.toLowerCase() === name) return ex.slug;
    }
  }
  for (const cat of Object.values(EXERCISE_DB)) {
    for (const ex of cat) {
      if (ex.name.toLowerCase().includes(name) || name.includes(ex.name.toLowerCase())) return ex.slug;
    }
  }
  return null;
}
function getMSUrl(exName) {
  const slug = findSlug(exName);
  return slug ? "https://www.muscleandstrength.com/exercises/" + slug : null;
}
const IMG_BASE = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/";
let _exDbCache = null;
let _exDbPromise = null;
function loadExerciseDB() {
  if (_exDbCache) return Promise.resolve(_exDbCache);
  if (_exDbPromise) return _exDbPromise;
  _exDbPromise = fetch("https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json").then(r => r.json()).then(data => {
    _exDbCache = data;
    return data;
  }).catch(() => []);
  return _exDbPromise;
}
const EXERCISE_DB_OVERRIDES = {
  "Barbell Bench Press": "Barbell Bench Press - Medium Grip",
  "Incline Bench Press": "Barbell Incline Bench Press - Medium Grip",
  "Decline Bench Press": "Decline Barbell Bench Press",
  "Dumbbell Bench Press": "Dumbbell Bench Press",
  "Incline Dumbbell Bench Press": "Incline Dumbbell Press",
  "Decline Dumbbell Bench Press": "Decline Dumbbell Bench Press",
  "Close Grip Dumbbell Press": "Close-Grip Dumbbell Press",
  "Dumbbell Floor Press": "Dumbbell Floor Press",
  "Floor Press": "Floor Press",
  "Smith Machine Bench Press": "Smith Machine Bench Press",
  "Incline Close Grip Bench Press": "Close-Grip Barbell Bench Press",
  "Dumbbell Flys": "Dumbbell Flyes",
  "Incline Dumbbell Flys": "Incline Dumbbell Flyes",
  "Decline Dumbbell Flys": "Decline Dumbbell Flyes",
  "Cable Fly": "Cable Crossover",
  "Pec Deck": "Butterfly",
  "Push Up": "Pushups",
  "Decline Push Up": "Decline Push-Up",
  "Chest Dip": "Dips - Chest Version",
  "Dumbbell Pullover": "Bent-Arm Dumbbell Pullover",
  "Barbell Pullover": "Bent-Arm Barbell Pullover",
  "Lat Pulldown": "Wide-Grip Lat Pulldown",
  "Wide Grip Lat Pulldown": "Wide-Grip Lat Pulldown",
  "Reverse Grip Lat Pulldown": "Underhand Cable Pulldowns",
  "Straight Arm Lat Pulldown": "Straight-Arm Pulldown",
  "Wide Grip Pull Up": "Wide-Grip Rear Pull-Up",
  "Pull Up": "Pullups",
  "Chin Up": "Chin-Up",
  "V-Bar Pull Up": null,
  "Bent Over Barbell Row": "Bent Over Barbell Row",
  "One Arm Dumbbell Row": "One-Arm Dumbbell Row",
  "Bent Over Dumbbell Row": "Bent Over Two-Dumbbell Row",
  "Seated Cable Row": "Seated Cable Rows",
  "Cable Face Pull": "Face Pull",
  "Inverted Row": "Inverted Row",
  "Hyperextension": "Hyperextensions (Back Extensions)",
  "Good Mornings": "Good Morning",
  "Superman": "Superman",
  "Deadlift": "Barbell Deadlift",
  "Sumo Deadlift": "Sumo Deadlift",
  "Overhead Press": "Standing Military Press",
  "Seated Dumbbell Press": "Seated Dumbbell Press",
  "Standing Dumbbell Press": "Standing Dumbbell Press",
  "Arnold Press": "Arnold Dumbbell Press",
  "Smith Machine Shoulder Press": "Smith Machine Overhead Shoulder Press",
  "Lateral Raise": "Side Lateral Raise",
  "Cable Lateral Raise": "Cable Seated Lateral Raise",
  "One Arm Cable Lateral Raise": null,
  "Front Raise": "Front Dumbbell Raise",
  "Barbell Front Raise": "Standing Front Barbell Raise Over Head",
  "Rear Delt Fly": "Seated Bent-Over Rear Delt Raise",
  "Upright Row": "Upright Barbell Row",
  "Barbell Curl": "Barbell Curl",
  "Dumbbell Curl": "Dumbbell Bicep Curl",
  "Seated Dumbbell Curl": "Seated Dumbbell Curl",
  "Incline Dumbbell Curl": "Incline Dumbbell Curl",
  "Concentration Curl": "Concentration Curls",
  "Hammer Curl": "Hammer Curls",
  "Cross Body Hammer Curl": "Cross Body Hammer Curl",
  "Incline Hammer Curl": "Incline Hammer Curls",
  "EZ Bar Curl": "EZ-Bar Curl",
  "Preacher Curl": "Preacher Curl",
  "EZ Bar Preacher Curl": null,
  "Dumbbell Preacher Curl": "One Arm Dumbbell Preacher Curl",
  "Cable Curl": "Standing Biceps Cable Curl",
  "Cable Preacher Curl": "Cable Preacher Curl",
  "Spider Curl": "Spider Curl",
  "Zottman Curl": "Zottman Curl",
  "Reverse Barbell Curl": "Reverse Barbell Curl",
  "Drag Curl": "Drag Curl",
  "Machine Bicep Curl": "Machine Bicep Curl",
  "Tricep Pushdown": "Triceps Pushdown",
  "Reverse Grip Tricep Pushdown": "Reverse Grip Triceps Pushdown",
  "Close Grip Bench Press": "Close-Grip Barbell Bench Press",
  "Skull Crusher": "EZ-Bar Skullcrusher",
  "EZ Bar Skull Crusher": "EZ-Bar Skullcrusher",
  "Incline Skull Crusher": "Incline Barbell Triceps Extension",
  "Tricep Dip": "Dips - Triceps Version",
  "Bench Dip": "Bench Dips",
  "Overhead Tricep Extension": "Cable Rope Overhead Triceps Extension",
  "Dumbbell Tricep Extension": "Seated Triceps Press",
  "Tricep Kickback": "Tricep Dumbbell Kickback",
  "Cable Tricep Kickback": null,
  "French Press": "Seated Triceps Press",
  "Overhead Barbell Extension": "Standing Overhead Barbell Triceps Extension",
  "Squat": "Barbell Squat",
  "Front Squat": "Front Squat (Clean Grip)",
  "Dumbbell Squat": "Dumbbell Squat",
  "Goblet Squat": "Goblet Squat",
  "Sumo Squat": "Plie Dumbbell Squat",
  "Smith Machine Squat": "Smith Machine Squat",
  "Hack Squat": "Hack Squat",
  "Bulgarian Split Squat": "Split Squat with Dumbbells",
  "Split Squat": "Split Squats",
  "Lunge": "Barbell Lunge",
  "Walking Lunge": "Bodyweight Walking Lunge",
  "Step Up": "Dumbbell Step Ups",
  "Leg Press": "Leg Press",
  "Leg Extension": "Leg Extensions",
  "Romanian Deadlift": "Romanian Deadlift",
  "Dumbbell RDL": "Stiff-Legged Dumbbell Deadlift",
  "Leg Curl": "Lying Leg Curls",
  "Seated Leg Curl": "Seated Leg Curl",
  "Nordic Hamstring Curl": null,
  "Hip Thrust": "Barbell Hip Thrust",
  "Glute Bridge": "Barbell Glute Bridge",
  "Calf Raise": "Standing Calf Raises",
  "Seated Calf Raise": "Seated Calf Raise",
  "Donkey Calf Raise": "Donkey Calf Raises",
  "Cable Crunch": "Cable Crunch",
  "Crunch": "Crunches",
  "Reverse Crunch": "Reverse Crunch",
  "Plank": "Plank",
  "Side Plank": "Side Bridge",
  "Hanging Leg Raise": "Hanging Leg Raise",
  "Hanging Knee Raise": "Hanging Leg Raise",
  "Lying Leg Raise": "Flat Bench Lying Leg Raise",
  "Sit Up": "Sit-Up",
  "Ab Wheel Rollout": "Barbell Ab Rollout",
  "Wood Chop": "Standing Cable Wood Chop",
  "Landmine Rotation": null,
  "Standing Calf Raise": "Standing Calf Raises",
  "Smith Machine Calf Raise": "Smith Machine Calf Raise",
  "Leg Press Calf Raise": "Calf Press On The Leg Press Machine",
  "Barbell Wrist Curl": "Palms-Up Barbell Wrist Curl Over A Bench",
  "Reverse Wrist Curl": "Palms-Down Wrist Curl Over A Bench",
  "Dumbbell Wrist Curl": "Palms-Up Dumbbell Wrist Curl Over A Bench",
  "Barbell Shrug": "Barbell Shrug",
  "Dumbbell Shrug": "Dumbbell Shrug",
  "Cable Shrug": "Cable Shrugs",
  "High Pull": null,
  "Band Pull Apart": "Band Pull Apart",
  "Barbell Hip Thrust": "Barbell Hip Thrust",
  "Single Leg Hip Thrust": null,
  "Barbell Glute Bridge": "Barbell Glute Bridge",
  "Glute Kickback": "Glute Kickback",
  "Hip Abduction Machine": null,
  "Hip Adduction Machine": "Cable Hip Adduction",
  "Lateral Band Walk": null,
  "Curtsy Lunge": "Crossover Reverse Lunge",
  "Clean & Jerk": "Clean and Jerk",
  "Clean": "Clean",
  "Hang Clean": "Hang Clean",
  "Power Clean": "Power Clean",
  "Snatch": "Snatch",
  "Split Jerk": "Split Jerk",
  "Split Snatch": "Split Snatch",
  "Australian Pull Up": "Inverted Row",
  "Commando Pull Up": "Rocky Pull-Ups/Pulldowns",
  "Archer Pull Up": null,
  "Muscle Up": "Muscle Up",
  "Diamond Push Up": "Push-Ups - Close Triceps Position",
  "Incline Push Up": "Incline Push-Up",
  "Pike Push Up": null,
  "One Arm Push Up": null,
  "Handstand Push Up": "Handstand Push-Ups",
  "Bodyweight Squat": "Bodyweight Squat",
  "Pistol Squat": null,
  "Jump Squat": "Freehand Jump Squat",
  "Burpee": null,
  "Mountain Climbers": "Mountain Climbers",
  "Wall Sit": null,
  "Box Jump": "Box Jump (Multiple Response)",
  "Toes to Bar": "Hanging Pike",
  "L-Sit": null,
  "Front Lever": null,
  "Back Lever": null,
  "Dragon Flag": null,
  "Flutter Kicks": "Flutter Kicks",
  "World's Greatest Stretch": null,
  "Inchworm": "Inchworm",
  "90/90 Piriformis Stretch": null,
  "Figure 4 Glute Stretch": null,
  "Half Kneeling Quad Stretch": null,
  "Deep Squat Prying": null,
  "Rocking Frog Stretch": null,
  "Hamstring Foam Roll": null,
  "Quad Foam Roll": null,
  "IT Band Foam Roll": null,
  "Lat Foam Roll": null,
  "Glute Foam Roll": null,
  "Thoracic Spine Foam Roll": null
};
const EXERCISE_VARIANTS = {
  "Neutral Grip Dumbbell Bench Press": {
    base: "Dumbbell Bench Press",
    note: "Palms face each other (neutral grip). Same movement as Dumbbell Bench Press — elbows track closer to your sides."
  },
  "Reverse Grip Dumbbell Bench Press": {
    base: "Dumbbell Bench Press",
    note: "Palms face toward you (supinated grip). Same press movement but targets upper chest more. Demo shows standard grip."
  },
  "One-Arm Dumbbell Bench Press": {
    base: "Dumbbell Bench Press",
    note: "Single arm only. Brace your core hard to prevent rotation. Same pressing motion as Dumbbell Bench Press."
  },
  "Incline Smith Machine Bench Press": {
    base: "Smith Machine Bench Press",
    note: "Set the bench to 30–45°. Same movement as Smith Machine Bench Press but targets upper chest."
  },
  "Decline Smith Machine Bench Press": {
    base: "Smith Machine Bench Press",
    note: "Set the bench to a slight decline. Same movement as Smith Machine Bench Press but targets lower chest."
  },
  "Hammer Strength Bench Press": {
    base: "Barbell Bench Press",
    note: "Machine version — same pressing pattern as Bench Press. Seat the machine so the handles are at mid-chest."
  },
  "Close Grip Push Up": {
    base: "Push-Up",
    note: "Hands placed shoulder-width or narrower. Same movement as Push-Up but shifts emphasis to triceps."
  },
  "Weighted Chest Dip": {
    base: "Assisted Chest Dip",
    note: "Add a dip belt or hold a dumbbell between your legs. Lean forward to keep chest emphasis. Same movement as Chest Dip."
  },
  "Close Grip Lat Pulldown": {
    base: "Lat Pulldown",
    note: "Use a close neutral-grip handle. Same pulldown movement — slightly more bicep involvement."
  },
  "Chest Supported Dumbbell Row": {
    base: "Dumbbell Bent Over Row",
    note: "Lie chest-down on an incline bench to remove lower back stress. Same rowing motion as Bent Over Dumbbell Row."
  },
  "Weighted Hyperextension": {
    base: "Hyperextension",
    note: "Hold a plate or dumbbell to your chest. Same movement as Hyperextension with added load."
  },
  "Standing Arnold Press": {
    base: "Arnold Dumbbell Press",
    note: "Same rotation as the Arnold Press but performed standing. Engage your core throughout."
  },
  "Z Press": {
    base: "Overhead Press",
    note: "Seated on the floor with legs straight out. Eliminates leg drive — same pressing pattern as Overhead Press."
  },
  "Seated Lateral Raise": {
    base: "Dumbbell Lateral Raise",
    note: "Same movement as Lateral Raise performed seated. Reduces momentum cheating."
  },
  "Incline Rear Delt Fly": {
    base: "Dumbbell Rear Delt Fly",
    note: "Lie face-down on an incline bench. Same fly motion as Rear Delt Fly with chest supported."
  },
  "Cable Upright Row": {
    base: "Barbell Upright Row",
    note: "Same upright row movement using a cable for constant tension. Demo shows barbell version."
  },
  "Rope Cable Curl": {
    base: "Cable Curl",
    note: "Attach a rope handle. Same curl movement with a neutral grip at the top. Allows full supination."
  },
  "Rope Tricep Pushdown": {
    base: "Cable Triceps Pushdown",
    note: "Attach a rope handle. Allows you to flare hands apart at the bottom for a stronger contraction."
  },
  "Weighted Tricep Dip": {
    base: "Assisted Triceps Dip",
    note: "Add a dip belt or hold a dumbbell between your legs for extra load. Same movement as Tricep Dip."
  },
  "One Arm Dumbbell Extension": {
    base: "Dumbbell Lying Triceps Extension",
    note: "Single arm version. Same overhead extension movement — keep upper arm vertical throughout."
  },
  "Reverse Lunge": {
    base: "Barbell Lunge",
    note: "Step backward instead of forward. Easier on the knees and more glute-focused. Same mechanics as Forward Lunge."
  },
  "Single Leg Calf Raise": {
    base: "Calf Raise",
    note: "Perform on one leg for increased difficulty. Same calf raise movement with added balance challenge."
  },
  "Weighted Crunch": {
    base: "Cable Crunch",
    note: "Hold a plate on your chest or use cables. Same crunch movement with added resistance."
  },
  "Decline Sit Up": {
    base: "Sit-Up",
    note: "Performed on a decline bench. Same sit-up movement with increased range of motion due to the decline angle."
  },
  "Machine Shrug": {
    base: "Barbell Shrug",
    note: "Same shrug movement on a machine. Allows heavier load with less grip fatigue. Demo shows barbell version."
  },
  "Smith Machine Shrug": {
    base: "Barbell Shrug",
    note: "Same shrug movement on a Smith machine. Demo shows barbell version — movement is identical."
  },
  "Bodyweight Hip Thrust": {
    base: "Hip Thrust",
    note: "Same hip thrust movement without a barbell. Great for learning the pattern before adding load."
  },
  "Banded Glute Bridge": {
    base: "Glute Bridge",
    note: "Place a resistance band above your knees. Same glute bridge movement with added abduction resistance."
  },
  "Bodyweight Glute Bridge": {
    base: "Glute Bridge",
    note: "Same glute bridge without added weight. Focus on squeezing glutes at the top of each rep."
  }
};
function findExerciseInDB(db, name) {
  if (!db || !name) return null;
  if (Object.prototype.hasOwnProperty.call(EXERCISE_DB_OVERRIDES, name)) {
    const overrideName = EXERCISE_DB_OVERRIDES[name];
    if (!overrideName) return null;
    return db.find(e => e.name === overrideName) || null;
  }
  const norm = s => s.toLowerCase().replace(/aka.*$/i, "").replace(/[^a-z0-9 ]/g, " ").replace(/barbell/g, "barbell").replace(/dumbbell/g, "dumbbell").replace(/db/g, "dumbbell").replace(/bb/g, "barbell").replace(/press/g, "press").replace(/curl/g, "curl").replace(/row/g, "row").replace(/squat/g, "squat").replace(/deadlift/g, "deadlift").replace(/extension/g, "extension").replace(/flyes?/g, "fly").replace(/rolling/g, "roll").replace(/roller/g, "roll").replace(/crunches/g, "crunch").replace(/raises?/g, "raise").replace(/curls/g, "curl").replace(/presses/g, "press").replace(/rows/g, "row").replace(/squats/g, "squat").replace(/\s+/g, " ").trim();
  const q = norm(name);
  let match = db.find(e => norm(e.name) === q);
  if (match) return match;
  match = db.find(e => {
    const en = norm(e.name);
    return en === q || en.includes(q) || q.includes(en);
  });
  if (match) return match;
  const skipWords = new Set(["with", "from", "the", "and", "for", "one", "arm", "leg", "two", "low", "high", "off", "onto"]);
  const words = q.split(" ").filter(w => w.length >= 4 && !skipWords.has(w));
  if (words.length >= 2) {
    match = db.find(e => {
      const en = norm(e.name);
      const matched = words.filter(w => en.includes(w)).length;
      return matched >= words.length;
    });
    if (match) return match;
    match = db.find(e => {
      const en = norm(e.name);
      const matched = words.filter(w => en.includes(w)).length;
      return matched >= Math.ceil(words.length * 0.75);
    });
    if (match) return match;
  }
  if (words.length >= 1) {
    const first = words[0];
    match = db.find(e => {
      const en = norm(e.name);
      return en.includes(first) && words.slice(1).some(w => en.includes(w));
    });
    if (match) return match;
  }
  return null;
}
function VideoModal({
  videoId,
  title,
  onClose
}) {
  const [exData, setExData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgIdx, setImgIdx] = useState(0);
  const variant = EXERCISE_VARIANTS[title] || null;
  useEffect(() => {
    if (!title) return;
    setLoading(true);
    setExData(null);
    setImgIdx(0);
    const lookupName = variant ? variant.base : title;
    loadExerciseDB().then(db => {
      const found = findExerciseInDB(db, lookupName);
      setExData(found);
      setLoading(false);
    });
  }, [title]);
  if (!title) return null;
  const images = exData?.images || [];
  const instructions = exData?.instructions || [];
  const muscles = exData?.primaryMuscles || [];
  return _h("div", {
    className: "popIn",
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      background: "rgba(0,0,0,0.82)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px",
      overflowY: "auto"
    },
    onClick: e => {
      if (e.target === e.currentTarget) onClose();
    }
  }, _h("div", {
    style: {
      width: "100%",
      maxWidth: 480,
      background: "#211C15",
      borderRadius: 22,
      overflow: "hidden",
      boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
      maxHeight: "90vh",
      display: "flex",
      flexDirection: "column"
    }
  }, _h("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 18px 12px",
      flexShrink: 0
    }
  }, _h("div", {
    style: {
      flex: 1,
      marginRight: 12
    }
  }, _h("div", {
    style: {
      fontSize: 16,
      fontWeight: 900,
      color: "white"
    }
  }, title), variant && _h("div", {
    style: {
      fontSize: 11,
      color: "var(--ac)",
      fontWeight: 700,
      marginTop: 3
    }
  }, "\u21B3 variant of ", variant.base), !variant && muscles.length > 0 && _h("div", {
    style: {
      fontSize: 11,
      color: "rgba(var(--acr),0.8)",
      fontWeight: 700,
      marginTop: 2
    }
  }, muscles.join(", "))), _h("div", {
    className: "press",
    onClick: onClose,
    style: {
      width: 32,
      height: 32,
      borderRadius: 10,
      background: "rgba(255,255,255,0.1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 16,
      color: "white",
      flexShrink: 0
    }
  }, "\u2715")), _h("div", {
    style: {
      overflowY: "auto",
      flex: 1
    }
  }, loading && _h("div", {
    style: {
      textAlign: "center",
      padding: "40px 20px",
      color: "rgba(255,255,255,0.5)",
      fontSize: 13
    }
  }, _h("div", {
    style: {
      width: 28,
      height: 28,
      border: "2px solid rgba(var(--acr),0.3)",
      borderTop: "2px solid var(--ac)",
      borderRadius: "50%",
      animation: "spin 0.8s linear infinite",
      margin: "0 auto 12px"
    }
  }), "Loading exercise demo..."), !loading && images.length === 0 && _h("div", {
    style: {
      textAlign: "center",
      padding: "32px 20px"
    }
  }, _h("div", {
    style: {
      fontSize: 36,
      marginBottom: 12
    }
  }, "\uD83D\uDD0D"), _h("div", {
    style: {
      color: "rgba(255,255,255,0.04)",
      fontSize: 14,
      fontWeight: 700,
      marginBottom: 6
    }
  }, "No local demo found"), _h("div", {
    style: {
      color: "rgba(255,255,255,0.4)",
      fontSize: 12,
      marginBottom: 20,
      lineHeight: 1.5
    }
  }, "This exercise isn't in the local database yet.", _h("br", null), "Find it on Muscle & Strength:"), getMSUrl(title) ? _h("a", {
    href: getMSUrl(title),
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "12px 20px",
      background: "rgba(var(--acr),0.15)",
      border: "1.5px solid rgba(var(--acr),0.3)",
      borderRadius: 14,
      fontSize: 13,
      fontWeight: 800,
      color: "var(--ac)",
      textDecoration: "none"
    }
  }, "\uD83D\uDD17 Open on Muscle & Strength") : _h("a", {
    href: "https://www.muscleandstrength.com/exercises/" + title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "12px 20px",
      background: "rgba(var(--acr),0.15)",
      border: "1.5px solid rgba(var(--acr),0.3)",
      borderRadius: 14,
      fontSize: 13,
      fontWeight: 800,
      color: "var(--ac)",
      textDecoration: "none"
    }
  }, "\uD83D\uDD17 Search on Muscle & Strength")), !loading && images.length > 0 && _h(_F, null, variant && _h("div", {
    style: {
      margin: "0 16px 12px",
      padding: "10px 14px",
      background: "rgba(251,191,36,0.1)",
      border: "1px solid rgba(251,191,36,0.25)",
      borderRadius: 12
    }
  }, _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: "var(--ac)",
      marginBottom: 4,
      letterSpacing: 0.5
    }
  }, "ABOUT THIS VARIANT"), _h("div", {
    style: {
      fontSize: 12,
      color: "rgba(255,255,255,0.8)",
      lineHeight: 1.55
    }
  }, variant.note), _h("div", {
    style: {
      fontSize: 11,
      color: "rgba(255,255,255,0.4)",
      marginTop: 6
    }
  }, "Demo below shows: ", _h("span", {
    style: {
      color: "rgba(255,255,255,0.6)",
      fontWeight: 700
    }
  }, variant.base))), _h("div", {
    style: {
      display: "flex",
      gap: 8,
      padding: "0 16px 12px",
      justifyContent: "center"
    }
  }, images.slice(0, 2).map((img, i) => _h("div", {
    key: i,
    style: {
      flex: 1,
      borderRadius: 12,
      overflow: "hidden",
      background: "rgba(0,0,0,0.3)"
    }
  }, _h("img", {
    src: IMG_BASE + img,
    alt: title + " " + (i === 0 ? "start" : "end"),
    style: {
      width: "100%",
      height: "auto",
      display: "block"
    },
    onError: e => {
      e.target.style.display = "none";
    }
  }), _h("div", {
    style: {
      textAlign: "center",
      padding: "4px 0 6px",
      fontSize: 10,
      color: "rgba(255,255,255,0.4)",
      fontWeight: 700,
      letterSpacing: 0.5
    }
  }, i === 0 ? "START" : "END")))), _h("div", {
    style: {
      display: "flex",
      gap: 8,
      padding: "0 16px 12px",
      flexWrap: "wrap"
    }
  }, exData?.level && _h("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "var(--ac)",
      background: "rgba(var(--acr),0.15)",
      borderRadius: 8,
      padding: "3px 10px"
    }
  }, exData.level), exData?.equipment && _h("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "rgba(255,255,255,0.6)",
      background: "rgba(255,255,255,0.08)",
      borderRadius: 8,
      padding: "3px 10px"
    }
  }, exData.equipment), exData?.mechanic && _h("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "rgba(255,255,255,0.4)",
      background: "rgba(255,255,255,0.05)",
      borderRadius: 8,
      padding: "3px 10px"
    }
  }, exData.mechanic)), instructions.length > 0 && _h("div", {
    style: {
      padding: "0 16px 16px"
    }
  }, _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: "rgba(255,255,255,0.4)",
      letterSpacing: 0.8,
      textTransform: "uppercase",
      marginBottom: 8
    }
  }, "How to do it"), instructions.map((step, i) => _h("div", {
    key: i,
    style: {
      display: "flex",
      gap: 10,
      marginBottom: 8,
      alignItems: "flex-start"
    }
  }, _h("div", {
    style: {
      width: 20,
      height: 20,
      borderRadius: 7,
      background: "rgba(var(--acr),0.2)",
      color: "var(--ac)",
      fontSize: 10,
      fontWeight: 900,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      marginTop: 1
    }
  }, i + 1), _h("div", {
    style: {
      fontSize: 12,
      color: "rgba(255,255,255,0.75)",
      lineHeight: 1.55,
      fontWeight: 500
    }
  }, step))))))));
}
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
let _audioCtx = null;
function getAudioCtx() {
  try {
    if (!_audioCtx) _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (_audioCtx.state === "suspended") _audioCtx.resume();
    return _audioCtx;
  } catch (e) {
    return null;
  }
}
function playPop(times = 1) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  for (let i = 0; i < times; i++) {
    const t0 = ctx.currentTime + i * 0.18;
    const osc = ctx.createOscillator(),
      gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(420, t0);
    osc.frequency.exponentialRampToValueAtTime(880, t0 + 0.09);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(0.5, t0 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.16);
    osc.start(t0);
    osc.stop(t0 + 0.18);
  }
  try {
    navigator.vibrate && navigator.vibrate([120, 60, 120]);
  } catch (e) {}
}
let _keepAlive = null;
function keepAliveAudio(on) {
  try {
    if (!_keepAlive) {
      _keepAlive = new Audio("data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=");
      _keepAlive.loop = true;
      _keepAlive.volume = 0.01;
    }
    if (on) {
      const p = _keepAlive.play();
      if (p && p.catch) p.catch(() => {});
    } else _keepAlive.pause();
  } catch (e) {}
}
function askNotifyPermission() {
  try {
    if ("Notification" in window && Notification.permission === "default") Notification.requestPermission();
  } catch (e) {}
}
let NOTIF_PREFS = {
  enabled: true,
  rest: true,
  nudge: true,
  messages: true,
  training: true
};
function setNotifPrefs(p) {
  NOTIF_PREFS = {
    ...NOTIF_PREFS,
    ...(p || {})
  };
}
function notifCategory(tag) {
  if (!tag) return null;
  if (tag === "rest") return "rest";
  if (tag === "nudge") return "nudge";
  if (tag.startsWith("msg-")) return "messages";
  if (tag.startsWith("train-")) return "training";
  return null;
}
function notify(title, body, tag) {
  try {
    if (!NOTIF_PREFS.enabled) return false;
    const cat = notifCategory(tag);
    if (cat && NOTIF_PREFS[cat] === false) return false;
    if (!("Notification" in window) || Notification.permission !== "granted") return false;
    const n = new Notification(title, {
      body,
      tag: tag || "ironlog",
      icon: "/favicon.svg",
      badge: "/favicon.svg",
      renotify: true
    });
    n.onclick = () => {
      try {
        window.focus();
        n.close();
      } catch (e) {}
    };
    return true;
  } catch (e) {
    return false;
  }
}
const MUSCLES = [{
  key: "chest",
  name: "Chest",
  base: 60,
  shapes: [{
    v: "front",
    t: "e",
    cx: 93,
    cy: 104,
    rx: 17,
    ry: 13
  }, {
    v: "front",
    t: "e",
    cx: 127,
    cy: 104,
    rx: 17,
    ry: 13
  }]
}, {
  key: "shoulders",
  name: "Shoulders",
  base: 48,
  shapes: [{
    v: "front",
    t: "c",
    cx: 77,
    cy: 82,
    r: 13
  }, {
    v: "front",
    t: "c",
    cx: 143,
    cy: 82,
    r: 13
  }, {
    v: "back",
    t: "c",
    cx: 77,
    cy: 82,
    r: 13
  }, {
    v: "back",
    t: "c",
    cx: 143,
    cy: 82,
    r: 13
  }]
}, {
  key: "biceps",
  name: "Biceps",
  base: 48,
  shapes: [{
    v: "front",
    t: "e",
    cx: 64,
    cy: 115,
    rx: 9,
    ry: 17
  }, {
    v: "front",
    t: "e",
    cx: 156,
    cy: 115,
    rx: 9,
    ry: 17
  }]
}, {
  key: "triceps",
  name: "Triceps",
  base: 48,
  shapes: [{
    v: "back",
    t: "e",
    cx: 64,
    cy: 115,
    rx: 9,
    ry: 17
  }, {
    v: "back",
    t: "e",
    cx: 156,
    cy: 115,
    rx: 9,
    ry: 17
  }]
}, {
  key: "forearms",
  name: "Forearms",
  base: 36,
  shapes: [{
    v: "front",
    t: "e",
    cx: 56,
    cy: 163,
    rx: 7,
    ry: 18
  }, {
    v: "front",
    t: "e",
    cx: 164,
    cy: 163,
    rx: 7,
    ry: 18
  }, {
    v: "back",
    t: "e",
    cx: 56,
    cy: 163,
    rx: 7,
    ry: 18
  }, {
    v: "back",
    t: "e",
    cx: 164,
    cy: 163,
    rx: 7,
    ry: 18
  }]
}, {
  key: "abs",
  name: "Abs",
  base: 36,
  shapes: [{
    v: "front",
    t: "r",
    x: 96,
    y: 126,
    w: 28,
    h: 54,
    rx: 9
  }]
}, {
  key: "obliques",
  name: "Obliques",
  base: 36,
  shapes: [{
    v: "front",
    t: "r",
    x: 84,
    y: 130,
    w: 9,
    h: 44,
    rx: 4
  }, {
    v: "front",
    t: "r",
    x: 127,
    y: 130,
    w: 9,
    h: 44,
    rx: 4
  }]
}, {
  key: "quads",
  name: "Quads",
  base: 72,
  shapes: [{
    v: "front",
    t: "e",
    cx: 98,
    cy: 262,
    rx: 12,
    ry: 35
  }, {
    v: "front",
    t: "e",
    cx: 122,
    cy: 262,
    rx: 12,
    ry: 35
  }]
}, {
  key: "adductors",
  name: "Adductors",
  base: 60,
  shapes: [{
    v: "front",
    t: "e",
    cx: 110,
    cy: 243,
    rx: 6,
    ry: 22
  }]
}, {
  key: "hamstrings",
  name: "Hamstrings",
  base: 72,
  shapes: [{
    v: "back",
    t: "e",
    cx: 98,
    cy: 278,
    rx: 12,
    ry: 33
  }, {
    v: "back",
    t: "e",
    cx: 122,
    cy: 278,
    rx: 12,
    ry: 33
  }]
}, {
  key: "glutes",
  name: "Glutes",
  base: 60,
  shapes: [{
    v: "back",
    t: "c",
    cx: 99,
    cy: 224,
    r: 14
  }, {
    v: "back",
    t: "c",
    cx: 121,
    cy: 224,
    r: 14
  }]
}, {
  key: "calves",
  name: "Calves",
  base: 48,
  shapes: [{
    v: "front",
    t: "e",
    cx: 97,
    cy: 362,
    rx: 8,
    ry: 27
  }, {
    v: "front",
    t: "e",
    cx: 123,
    cy: 362,
    rx: 8,
    ry: 27
  }, {
    v: "back",
    t: "e",
    cx: 97,
    cy: 360,
    rx: 9,
    ry: 28
  }, {
    v: "back",
    t: "e",
    cx: 123,
    cy: 360,
    rx: 9,
    ry: 28
  }]
}, {
  key: "lats",
  name: "Back / Lats",
  base: 60,
  shapes: [{
    v: "back",
    t: "e",
    cx: 91,
    cy: 130,
    rx: 15,
    ry: 27
  }, {
    v: "back",
    t: "e",
    cx: 129,
    cy: 130,
    rx: 15,
    ry: 27
  }]
}, {
  key: "traps",
  name: "Traps",
  base: 48,
  shapes: [{
    v: "back",
    t: "p",
    d: "M110,56 L80,86 L110,100 L140,86 Z"
  }]
}, {
  key: "lowerback",
  name: "Lower Back",
  base: 72,
  shapes: [{
    v: "back",
    t: "r",
    x: 97,
    y: 162,
    w: 26,
    h: 32,
    rx: 9
  }]
}];
const MUSCLE_BY_KEY = Object.fromEntries(MUSCLES.map(m => [m.key, m]));
function musclesFor(name) {
  const n = (name || "").toLowerCase();
  const has = re => re.test(n);
  const out = [];
  const add = (...ks) => ks.forEach(k => {
    if (!out.includes(k)) out.push(k);
  });
  if (has(/muscle.?up/)) add("lats", "chest", "triceps");else if (has(/handstand/)) add("shoulders", "triceps");else if (has(/planche/)) add("shoulders", "chest", "abs");else if (has(/front lever|back lever|dragon flag/)) add("lats", "abs");
  if (has(/wrist|grip(?!.*pull)/)) add("forearms");
  if (has(/skull|pushdown|pressdown|close.?grip bench|french press/) || has(/tricep/) && !has(/rope face/)) add("triceps");
  if (has(/overhead.*extension|extension.*overhead/)) add("triceps");
  if (has(/hammer curl/)) add("biceps", "forearms");else if (has(/curl/) && !has(/leg curl|nordic|wrist/)) add("biceps");
  if (has(/leg curl|nordic|hamstring|romanian|rdl|stiff.?leg|good morning|pull.?through/)) add("hamstrings", "glutes");
  if (has(/deadlift/) && !has(/romanian|rdl|stiff/)) add("lowerback", "hamstrings", "glutes", "traps");
  if (has(/hyperextension|back extension|superman/)) add("lowerback", "glutes");
  if (has(/hip thrust|glute|abduct/) && !has(/tricep/)) add("glutes");
  if (has(/kickback/) && !has(/tricep/)) add("glutes");
  if (has(/adduct|sumo squat|plie/)) add("adductors", "quads");
  if (has(/squat|leg press|lunge|step.?up|leg extension|hack|pistol|wall sit/) && !has(/sissy calf/)) add("quads", "glutes");
  if (has(/calf|calves/)) add("calves");
  if (has(/shrug/)) add("traps");
  if (has(/face pull|rear delt|reverse fly|band pull/)) add("shoulders", "traps");
  if (has(/lateral raise|front raise|shoulder press|overhead press|military|arnold|upright row|delt|z press/)) add("shoulders");
  if (has(/pull.?up|chin.?up|pulldown|pullover|row(?!.*upright)|lat |lats/) && !has(/upright/)) add("lats", "biceps");
  if (has(/bench|push.?up|chest|fly|flye|pec |pec-|dip/) && !has(/leg raise/)) {
    add("chest");
    if (has(/close|diamond|dip/)) add("triceps");
  }
  if (has(/oblique|side bend|side plank|side bridge|woodchop|wood chop|russian twist|rotation|pallof/)) add("obliques", "abs");else if (has(/crunch|sit.?up|plank|hover|ab |abs|leg raise|knee raise|rollout|dead bug|hollow|l.?sit|toes to bar|v.?up/)) add("abs");
  if (!out.length) {
    for (const [cat, list] of Object.entries(EXERCISE_DB)) {
      if (list.some(e => e.name.toLowerCase() === n)) {
        const m = {
          "Chest": "chest",
          "Back": "lats",
          "Shoulders": "shoulders",
          "Biceps": "biceps",
          "Triceps": "triceps",
          "Legs": "quads",
          "Abs": "abs",
          "Calves": "calves",
          "Forearms": "forearms",
          "Traps": "traps",
          "Glutes": "glutes",
          "Calisthenics": "lats"
        }[cat];
        if (m) out.push(m);
        break;
      }
    }
  }
  return out;
}
function entryTime(h) {
  if (h.ts) return h.ts;
  const t = Date.parse((h.date || "") + "T18:00:00");
  return isNaN(t) ? 0 : t;
}
const FEEL_INTENSITY = {
  1: 0.35,
  2: 0.6,
  3: 0.85,
  4: 1.0,
  5: 1.15,
  unrated: 0.9
};
const clampN = (lo, hi, v) => Math.max(lo, Math.min(hi, v));
const num = v => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};
const TAU_BY_BASE = {
  36: 8,
  48: 10,
  60: 13,
  72: 15
};
const SAT = 5;
const F_READY = -SAT * Math.log(0.95);
const META_OVERRIDES = {
  "Romanian Deadlift": {
    muscles: {
      hamstrings: 1,
      glutes: 0.7,
      lowerback: 0.6,
      forearms: 0.25
    },
    ecc: 1,
    str: 1,
    sys: 0.8
  },
  "Deadlift": {
    muscles: {
      lowerback: 1,
      hamstrings: 0.8,
      glutes: 0.8,
      traps: 0.5,
      forearms: 0.4,
      quads: 0.3
    },
    ecc: 0.7,
    str: 0.7,
    sys: 1
  },
  "Barbell Bench Press": {
    muscles: {
      chest: 1,
      triceps: 0.55,
      shoulders: 0.4
    },
    ecc: 0.55,
    str: 0.6,
    sys: 0.6
  },
  "Barbell Squat": {
    muscles: {
      quads: 1,
      glutes: 0.7,
      adductors: 0.45,
      lowerback: 0.35,
      hamstrings: 0.25
    },
    ecc: 0.7,
    str: 0.7,
    sys: 0.9
  },
  "Pull Up": {
    muscles: {
      lats: 1,
      biceps: 0.55,
      traps: 0.3,
      forearms: 0.3
    },
    ecc: 0.5,
    str: 0.8,
    sys: 0.5,
    bwCoef: 1
  },
  "Chin Up": {
    muscles: {
      lats: 1,
      biceps: 0.7,
      forearms: 0.3
    },
    ecc: 0.5,
    str: 0.8,
    sys: 0.5,
    bwCoef: 1
  },
  "Push Up": {
    muscles: {
      chest: 1,
      triceps: 0.6,
      shoulders: 0.4,
      abs: 0.2
    },
    ecc: 0.5,
    str: 0.5,
    sys: 0.4,
    bwCoef: 0.64
  },
  "Nordic Hamstring Curl": {
    muscles: {
      hamstrings: 1,
      glutes: 0.3
    },
    ecc: 1,
    str: 0.6,
    sys: 0.4,
    bwCoef: 0.5
  },
  "Bulgarian Split Squat": {
    muscles: {
      quads: 1,
      glutes: 0.8,
      adductors: 0.4,
      hamstrings: 0.3
    },
    ecc: 0.8,
    str: 0.8,
    sys: 0.7
  },
  "Dumbbell Pullover": {
    muscles: {
      lats: 0.8,
      chest: 0.8,
      triceps: 0.3
    },
    ecc: 0.6,
    str: 1,
    sys: 0.3
  }
};
const META_CACHE = {};
function metaFor(name) {
  const key = name || "";
  if (META_CACHE[key]) return META_CACHE[key];
  const n = key.toLowerCase();
  const has = re => re.test(n);
  const o = META_OVERRIDES[key] || {};
  let muscles = o.muscles;
  if (!muscles) {
    const grades = [1, 0.55, 0.35, 0.25];
    muscles = {};
    musclesFor(key).forEach((k, i) => {
      muscles[k] = grades[Math.min(i, grades.length - 1)];
    });
  }
  const ecc = o.ecc != null ? o.ecc : has(/nordic|negative|eccentric|romanian|rdl|stiff.?leg|good morning/) ? 1 : has(/deadlift|bulgarian|split squat|lunge|rollout|dragon flag|front lever|back lever|step.?down/) ? 0.8 : has(/squat|fly|flye|pullover|pull.?up|chin.?up|dip|push.?up|bench|press|row/) ? 0.55 : has(/machine|cable|raise|shrug|crunch|plank|curl|extension/) ? 0.4 : 0.5;
  const str = o.str != null ? o.str : has(/fly|flye|pullover|romanian|rdl|stiff.?leg|good morning|deficit|overhead.*extension|preacher|incline.*curl|pull.?up|chin.?up|pulldown/) ? 0.8 : has(/dip|bench|squat|lunge|row|deadlift|leg curl|calf/) ? 0.55 : has(/shrug|lateral raise|front raise|crunch|plank|leg raise/) ? 0.25 : 0.4;
  const sys = o.sys != null ? o.sys : has(/deadlift/) && !has(/romanian|rdl|stiff/) ? 1 : has(/squat|leg press|clean|snatch|jerk|thruster|muscle up/) && !has(/sissy/) ? 0.85 : has(/romanian|rdl|lunge|bulgarian|step.?up|good morning|hip thrust|nordic/) ? 0.7 : has(/row|pull.?up|chin.?up|bench|overhead press|shoulder press|military|dip|push.?up|pulldown|handstand/) ? 0.5 : 0.15;
  const bwCoef = o.bwCoef != null ? o.bwCoef : has(/muscle.?up|pull.?up|chin.?up|front lever|back lever|rope climb|handstand/) ? 1 : has(/bench dip/) ? 0.5 : has(/pike push/) ? 0.6 : has(/push.?up/) ? 0.64 : has(/\bdip\b|tricep dip|chest dip/) ? 0.96 : has(/inverted row|australian/) ? 0.5 : has(/pistol/) ? 0.85 : 0;
  const mechF = clampN(0.85, 1.25, 0.85 + 0.25 * ecc + 0.15 * str);
  return META_CACHE[key] = {
    muscles,
    ecc,
    str,
    sys,
    bwCoef,
    mechF
  };
}
function buildTopKg(history) {
  const top = {};
  for (const h of history || []) {
    for (const s of h.sets || []) {
      if (!s.ex) continue;
      const k = s.drops && s.drops.length ? Math.max(...s.drops.map(d => num(d.kg))) : num(s.kg);
      if (k > (top[s.ex] || 0)) top[s.ex] = k;
    }
  }
  return top;
}
function e1rmOf(kgEff, reps) {
  return kgEff > 0 && reps >= 1 && reps <= 12 ? kgEff * (1 + reps / 30) : 0;
}
function setLoad(s, meta, bw) {
  const isDrop = !!(s.drops && s.drops.length);
  const reps = isDrop ? s.drops.reduce((a, d) => a + num(d.reps), 0) : num(s.reps);
  const kg = (isDrop ? Math.max(...s.drops.map(d => num(d.kg))) : num(s.kg)) + meta.bwCoef * bw;
  return {
    isDrop,
    reps,
    kg
  };
}
function setStimulus(s, contrib, ctx) {
  const meta = ctx.meta || metaFor(s.ex);
  const {
    isDrop,
    reps,
    kg
  } = setLoad(s, meta, ctx.bw || 0);
  if (reps <= 0) return 0;
  const repF = clampN(0.2, 1.4, Math.pow(reps / 10, 0.6));
  const proxF = FEEL_INTENSITY[s.feel] || FEEL_INTENSITY.unrated;
  let loadF = 1;
  if (ctx.B > 0 && kg > 0) {
    const ratio = e1rmOf(kg, Math.min(reps, 12)) / ctx.B;
    if (ratio > 0) loadF = clampN(0.85, 1.15, 1 + 0.5 * (ratio - 1));
  }
  const restF = num(s.restSecs) > 0 ? clampN(0.92, 1.12, 1 + (90 - num(s.restSecs)) / 750) : 1;
  const dropF = isDrop ? 1.2 : 1;
  const M = clampN(0.6, 1.8, loadF * meta.mechF * restF * (ctx.novF || 1) * dropF);
  return contrib * repF * proxF * M;
}
function computeRecovery(history, nowMs, opts) {
  const now = nowMs || Date.now();
  const bw = num(opts && opts.bw);
  const hist = (history || []).map(h => ({
    h,
    t: Math.min(entryTime(h), now)
  })).filter(x => x.t > 0 && entryTime(x.h) - now < 24 * 3600e3).sort((a, b) => a.t - b.t);
  const checks = (opts && opts.checkins || []).filter(c => c && MUSCLE_BY_KEY[c.muscle] && num(c.ts) > 0 && num(c.ts) <= now && c.level >= 1 && c.level <= 4).sort((a, b) => a.ts - b.ts);
  const CHECK_ROBS = {
    1: 1.0,
    2: 0.85,
    3: 0.6,
    4: 0.35
  };
  let ci = 0;
  const spanDays = hist.length ? (now - hist[0].t) / (24 * 3600e3) : 0;
  const canJudgeFrequency = spanDays >= 21;
  const state = {};
  const sysSt = {
    F: 0,
    lastT: 0
  };
  const baselines = {};
  const expo = {};
  const hitTimes = {};
  const rho = {};
  const rhoEff = k => {
    const p = rho[k];
    return p ? 1 + (p.r - 1) * p.n / (p.n + 4) : 1;
  };
  const tauOf = k => {
    const m = MUSCLE_BY_KEY[k];
    return (TAU_BY_BASE[m.base] || 12) * rhoEff(k);
  };
  const decayTo = (k, t) => {
    const st = state[k];
    if (!st) return;
    const dt = (t - st.lastT) / 3600e3;
    if (dt > 0) {
      st.F *= Math.exp(-dt / tauOf(k));
      st.lastT = t;
    }
  };
  const lastCheck = {};
  const applyChecks = cutoff => {
    for (; ci < checks.length && checks[ci].ts <= cutoff; ci++) {
      const c = checks[ci],
        k = c.muscle;
      if (!state[k]) continue;
      const lastHit = (hitTimes[k] || []).slice(-1)[0];
      if (!lastHit) continue;
      const gapH = (c.ts - lastHit) / 3600e3;
      if (gapH < 4 || gapH > 168) continue;
      if (lastCheck[k] && c.ts - lastCheck[k] < 12 * 3600e3) continue;
      lastCheck[k] = c.ts;
      decayTo(k, c.ts);
      const st = state[k];
      const Rhat = Math.exp(-st.F / SAT);
      const Robs = CHECK_ROBS[c.level];
      const p = rho[k] = rho[k] || {
        r: 1,
        n: 0
      };
      if (Math.abs(Rhat - Robs) > 0.03) {
        const eta = 0.3 / (1 + p.n / 8);
        p.r = clampN(0.6, 1.6, p.r * Math.exp(eta * 0.3 * (Rhat - Robs)));
      }
      p.n++;
      const Fobs = -SAT * Math.log(clampN(0.05, 1, Robs));
      st.F = st.F + 0.35 * (Fobs - st.F);
      st.peakF = Math.max(st.peakF || 0, st.F);
    }
  };
  for (const {
    h,
    t
  } of hist) {
    const sets = h.sets || [];
    applyChecks(t);
    const seen = {};
    for (const s of sets) {
      const meta = metaFor(s.ex);
      const {
        reps,
        kg
      } = setLoad(s, meta, bw);
      for (const [k, c] of Object.entries(meta.muscles)) {
        if (c < 0.6 || seen[k]) continue;
        seen[k] = 1;
        if (reps < 3 || reps > 12 || kg <= 0) continue;
        const bl = baselines[s.ex];
        if (!bl || bl.n < 3) continue;
        const lastHit = (hitTimes[k] || []).slice(-1)[0];
        if (!lastHit) continue;
        const gapH = (t - lastHit) / 3600e3;
        if (gapH < 12 || gapH > 168) continue;
        const P = e1rmOf(kg, reps) / bl.b;
        if (P < 0.7 || P > 1.15) continue;
        decayTo(k, t);
        const Rhat = Math.exp(-(state[k] ? state[k].F : 0) / SAT);
        const Robs = P >= 1 ? 1 : clampN(0, 1, 1 - 3.5 * (1 - P));
        const p = rho[k] = rho[k] || {
          r: 1,
          n: 0
        };
        if (Math.abs(Rhat - Robs) > 0.03) {
          const eta = 0.3 / (1 + p.n / 8);
          p.r = clampN(0.6, 1.6, p.r * Math.exp(eta * (Rhat - Robs)));
        }
        p.n++;
      }
    }
    const perM = {};
    let sysDose = 0;
    for (const s of sets) {
      const meta = metaFor(s.ex);
      const nExpo = (expo[s.ex] || []).filter(ts => ts > t - 90 * 24 * 3600e3).length;
      const novF = 1 + 0.25 * Math.pow(0.5, nExpo);
      const ctx = {
        meta,
        bw,
        novF,
        B: (baselines[s.ex] || {}).b || 0
      };
      let core = 0;
      for (const [k, c] of Object.entries(meta.muscles)) {
        const d = setStimulus(s, c, ctx);
        if (d > 0) {
          perM[k] = (perM[k] || 0) + d;
          if (c >= 0.99) core = d;
        }
      }
      sysDose += core * meta.sys;
    }
    for (const [k, V0] of Object.entries(perM)) {
      const m = MUSCLE_BY_KEY[k];
      if (!m) continue;
      const n28 = (hitTimes[k] || []).filter(ts => ts > t - 28 * 24 * 3600e3).length;
      let adapt = clampN(0.75, 1.25, 1.25 - 0.125 * n28);
      if (!canJudgeFrequency) adapt = Math.min(adapt, 1);
      const V = V0 * adapt;
      decayTo(k, t);
      const st = state[k] = state[k] || {
        F: 0,
        lastT: t
      };
      st.F += V;
      st.lastT = t;
      st.peakF = st.F;
      st.peakT = t;
      st.V = V;
      st.workout = h.workoutName;
      st.adapt = Math.round(adapt * 100) / 100;
      st.n28 = n28;
      (hitTimes[k] = hitTimes[k] || []).push(t);
    }
    if (sysSt.lastT) {
      const dt = (t - sysSt.lastT) / 3600e3;
      if (dt > 0) sysSt.F *= Math.exp(-dt / 18);
    }
    sysSt.F += sysDose;
    sysSt.lastT = t;
    const bestByEx = {};
    for (const s of sets) {
      const meta = metaFor(s.ex);
      const {
        reps,
        kg
      } = setLoad(s, meta, bw);
      const feelOk = !s.feel || s.feel >= 3;
      const e1 = feelOk ? e1rmOf(kg, reps) : 0;
      if (e1 > (bestByEx[s.ex] || 0)) bestByEx[s.ex] = e1;
    }
    for (const [ex, e1] of Object.entries(bestByEx)) {
      const bl = baselines[ex];
      if (bl) {
        bl.b = bl.b + 0.25 * (e1 - bl.b);
        bl.n++;
      } else baselines[ex] = {
        b: e1,
        n: 1
      };
      (expo[ex] = expo[ex] || []).push(t);
    }
  }
  applyChecks(now);
  const out = {};
  const week = now - 7 * 24 * 3600e3;
  const sysF = sysSt.lastT ? sysSt.F * Math.exp(-Math.max(0, (now - sysSt.lastT) / 3600e3) / 18) : 0;
  const sysReady = Math.exp(-sysF / 25);
  for (const [k, st] of Object.entries(state)) {
    const m = MUSCLE_BY_KEY[k];
    if (!m) continue;
    const tH = tauOf(k);
    const F = st.F * Math.exp(-Math.max(0, (now - st.lastT) / 3600e3) / tH);
    if (st.peakT < week && F <= F_READY) continue;
    const readiness = Math.exp(-F / SAT);
    const overall = readiness * (0.8 + 0.2 * sysReady);
    const hours = Math.max(1, Math.round(tH * Math.log(Math.max(st.peakF, F_READY * 1.0001) / F_READY)));
    const readyAt = F > F_READY ? now + tH * Math.log(F / F_READY) * 3600e3 : Math.min(now, st.peakT + hours * 3600e3);
    const p = rho[k];
    const nObs = p ? p.n : 0;
    out[k] = {
      t: st.peakT,
      hours,
      readyAt,
      sets: Math.round(st.V * 10) / 10,
      workout: st.workout,
      pct: st.peakF > F_READY ? clampN(0, 1, 1 - Math.log(Math.max(F, F_READY) / F_READY) / Math.log(st.peakF / F_READY)) : 1,
      remainH: Math.max(0, Math.ceil((readyAt - now) / 3600e3)),
      readiness: Math.round(readiness * 100),
      overall: Math.round(overall * 100),
      factors: {
        V: Math.round(st.V * 100) / 100,
        adapt: st.adapt,
        n28: st.n28,
        F: Math.round(F * 100) / 100,
        rho: Math.round(rhoEff(k) * 100) / 100,
        nObs,
        conf: nObs >= 10 ? "calibrated" : nObs >= 3 ? "calibrating" : "learning",
        sys: Math.round(sysReady * 100),
        tau: Math.round(tH * 10) / 10,
        ceiling: m.base
      }
    };
  }
  return out;
}
try {
  if (typeof window !== "undefined") window.__ilRecovery = {
    computeRecovery,
    musclesFor,
    buildTopKg,
    setStimulus,
    metaFor,
    e1rmOf,
    setLoad
  };
} catch (e) {}
function recColor(pct) {
  return "hsl(" + Math.round(pct * 120) + ",72%,52%)";
}
function BodyMap({
  colorFor,
  onPick,
  selected,
  height = 380
}) {
  const [view, setView] = useState("front");
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({
    x: 0,
    y: 0
  });
  const drag = useRef(null);
  const svgRef = useRef();
  const onDown = e => {
    const p = e.touches ? e.touches[0] : e;
    drag.current = {
      x: p.clientX,
      y: p.clientY,
      px: pan.x,
      py: pan.y,
      moved: false
    };
  };
  const onMove = e => {
    if (!drag.current) return;
    const p = e.touches ? e.touches[0] : e;
    const dx = p.clientX - drag.current.x,
      dy = p.clientY - drag.current.y;
    if (Math.abs(dx) + Math.abs(dy) > 6) drag.current.moved = true;
    if (zoom > 1) setPan({
      x: drag.current.px + dx,
      y: drag.current.py + dy
    });
  };
  const onUp = () => {
    setTimeout(() => {
      drag.current = null;
    }, 0);
  };
  const tap = key => {
    if (drag.current && drag.current.moved) return;
    onPick && onPick(key);
  };
  const mannequin = _h("g", {
    style: {
      fill: "#262019",
      stroke: "rgba(255,255,255,0.08)",
      strokeWidth: 1.5
    }
  }, _h("circle", {
    cx: "110",
    cy: "34",
    r: "20"
  }), _h("rect", {
    x: "101",
    y: "52",
    width: "18",
    height: "14",
    rx: "5"
  }), _h("path", {
    d: "M74,66 L146,66 C158,66 164,76 165,88 L160,190 C159,204 150,212 140,214 L80,214 C70,212 61,204 60,190 L55,88 C56,76 62,66 74,66 Z"
  }), _h("rect", {
    x: "52",
    y: "88",
    width: "22",
    height: "58",
    rx: "11",
    transform: "rotate(8 63 117)"
  }), _h("rect", {
    x: "146",
    y: "88",
    width: "22",
    height: "58",
    rx: "11",
    transform: "rotate(-8 157 117)"
  }), _h("rect", {
    x: "47",
    y: "142",
    width: "17",
    height: "52",
    rx: "8",
    transform: "rotate(5 55 168)"
  }), _h("rect", {
    x: "156",
    y: "142",
    width: "17",
    height: "52",
    rx: "8",
    transform: "rotate(-5 165 168)"
  }), _h("rect", {
    x: "86",
    y: "214",
    width: "23",
    height: "92",
    rx: "11"
  }), _h("rect", {
    x: "111",
    y: "214",
    width: "23",
    height: "92",
    rx: "11"
  }), _h("rect", {
    x: "89",
    y: "306",
    width: "19",
    height: "102",
    rx: "9"
  }), _h("rect", {
    x: "112",
    y: "306",
    width: "19",
    height: "102",
    rx: "9"
  }));
  const shapes = [];
  for (const m of MUSCLES) {
    for (const s of m.shapes) {
      if (s.v !== view) continue;
      const fill = colorFor && colorFor(m.key) || "rgba(var(--acr),0.12)";
      const sel = selected === m.key;
      const common = {
        style: {
          fill,
          stroke: sel ? "var(--ac)" : "rgba(255,255,255,0.12)",
          strokeWidth: sel ? 2.5 : 1,
          cursor: "pointer",
          transition: "fill .3s",
          animation: sel ? "mpulse 1.1s ease-in-out infinite" : "none"
        },
        onClick: () => tap(m.key)
      };
      if (s.t === "e") shapes.push(_h("ellipse", {
        key: m.key + shapes.length,
        cx: s.cx,
        cy: s.cy,
        rx: s.rx,
        ry: s.ry,
        ...common
      }));else if (s.t === "c") shapes.push(_h("circle", {
        key: m.key + shapes.length,
        cx: s.cx,
        cy: s.cy,
        r: s.r,
        ...common
      }));else if (s.t === "r") shapes.push(_h("rect", {
        key: m.key + shapes.length,
        x: s.x,
        y: s.y,
        width: s.w,
        height: s.h,
        rx: s.rx,
        ...common
      }));else if (s.t === "p") shapes.push(_h("path", {
        key: m.key + shapes.length,
        d: s.d,
        ...common
      }));
    }
  }
  const btn = (label, onClick) => _h("div", {
    className: "press",
    onClick: onClick,
    style: {
      width: 36,
      height: 36,
      borderRadius: 11,
      background: "rgba(255,255,255,0.06)",
      border: "1px solid " + C.border,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: C.text,
      fontSize: 15,
      fontWeight: 800
    }
  }, label);
  return _h("div", {
    style: {
      position: "relative",
      background: "rgba(255,255,255,0.025)",
      border: "1px solid " + C.border,
      borderRadius: 22,
      overflow: "hidden"
    }
  }, _h("div", {
    style: {
      position: "absolute",
      top: 10,
      left: 10,
      zIndex: 5,
      display: "flex",
      flexDirection: "column",
      gap: 7
    }
  }, btn("+", () => setZoom(z => Math.min(3, Math.round((z + 0.5) * 10) / 10))), btn("−", () => setZoom(z => {
    const nz = Math.max(1, Math.round((z - 0.5) * 10) / 10);
    if (nz === 1) setPan({
      x: 0,
      y: 0
    });
    return nz;
  })), btn("⟲", () => {
    setZoom(1);
    setPan({
      x: 0,
      y: 0
    });
  })), _h("div", {
    className: "press",
    onClick: () => setView(v => v === "front" ? "back" : "front"),
    style: {
      position: "absolute",
      top: 10,
      right: 10,
      zIndex: 5,
      padding: "8px 13px",
      borderRadius: 11,
      background: "rgba(var(--acr),0.14)",
      border: "1px solid rgba(var(--acr),0.35)",
      color: C.accent,
      fontSize: 12,
      fontWeight: 800
    }
  }, view === "front" ? "Front" : "Back", " \u21C4"), _h("div", {
    style: {
      touchAction: zoom > 1 ? "none" : "auto",
      cursor: zoom > 1 ? "grab" : "default"
    },
    onMouseDown: onDown,
    onMouseMove: onMove,
    onMouseUp: onUp,
    onMouseLeave: onUp,
    onTouchStart: onDown,
    onTouchMove: onMove,
    onTouchEnd: onUp
  }, _h("svg", {
    ref: svgRef,
    viewBox: "0 0 220 460",
    style: {
      width: "100%",
      height,
      display: "block"
    }
  }, _h("g", {
    style: {
      transform: `translate(${pan.x}px,${pan.y}px) scale(${zoom})`,
      transformOrigin: "110px 230px",
      transition: drag.current ? "none" : "transform .28s cubic-bezier(.2,.8,.2,1)"
    }
  }, mannequin, shapes))), _h("div", {
    style: {
      position: "absolute",
      bottom: 10,
      left: 0,
      right: 0,
      textAlign: "center",
      fontSize: 10,
      fontWeight: 800,
      letterSpacing: 1.5,
      color: C.faint,
      pointerEvents: "none"
    }
  }, view.toUpperCase(), " \xB7 TAP A MUSCLE", zoom > 1 ? " · DRAG TO PAN" : ""));
}
let _body3dLoad = null;
function loadBody3D() {
  if (window.BodyAnatomy3D) return Promise.resolve(true);
  if (_body3dLoad) return _body3dLoad;
  _body3dLoad = new Promise(resolve => {
    const s = document.createElement("script");
    s.src = "/body3d.js";
    s.onload = () => resolve(!!window.BodyAnatomy3D);
    s.onerror = () => resolve(false);
    document.head.appendChild(s);
  });
  return _body3dLoad;
}
function currentAccentHex() {
  try {
    const v = getComputedStyle(document.documentElement).getPropertyValue("--ac").trim();
    return v || "#F2B33D";
  } catch (e) {
    return "#F2B33D";
  }
}
function Body3D({
  mode = "explore",
  heat,
  onPick,
  selected,
  height = 380,
  autoRotate = true
}) {
  const elRef = useRef();
  const handleRef = useRef();
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let dead = false;
    loadBody3D().then(ok => {
      if (dead || !elRef.current) return;
      if (!ok) {
        setFailed(true);
        return;
      }
      try {
        handleRef.current = window.BodyAnatomy3D.mount(elRef.current, {
          mode,
          heat: heat || {},
          accent: currentAccentHex(),
          selected,
          autoRotate,
          radius: 22,
          background: "radial-gradient(120% 85% at 50% 18%, #322A20 0%, #221E18 55%, #0C0906 100%)",
          onPick: k => onPick && onPick(k)
        });
        setReady(true);
      } catch (e) {
        setFailed(true);
      }
    });
    return () => {
      dead = true;
      try {
        handleRef.current && handleRef.current.dispose && handleRef.current.dispose();
      } catch (e) {}
      handleRef.current = null;
    };
  }, []);
  useEffect(() => {
    if (!handleRef.current || !handleRef.current.update) return;
    try {
      handleRef.current.update({
        mode,
        heat: heat || {},
        accent: currentAccentHex(),
        selected
      });
    } catch (e) {}
  }, [mode, heat, selected]);
  if (failed) return _h(BodyMap, {
    colorFor: () => null,
    onPick: onPick,
    selected: selected,
    height: height
  });
  return _h("div", {
    style: {
      position: "relative",
      background: "rgba(255,255,255,0.025)",
      border: "1px solid " + C.border,
      borderRadius: 22,
      overflow: "hidden"
    }
  }, _h("div", {
    ref: elRef,
    style: {
      width: "100%",
      height,
      position: "relative"
    }
  }), !ready && _h("div", {
    style: {
      position: "absolute",
      bottom: 10,
      left: 0,
      right: 0,
      textAlign: "center",
      fontSize: 10,
      fontWeight: 800,
      letterSpacing: 1.5,
      color: C.faint,
      pointerEvents: "none"
    }
  }, "LOADING BODY\u2026"));
}
const G = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap');
  /* ── Accent themes (7) — switch via data-accent on <html> or applyTheme() ── */
  :root,
  [data-accent="amber"]   { --ac:#F2B33D; --acl:#F8C95E; --acd:#E6822A; --acr:242,179,61;  --aclr:248,201,94;  --acdr:230,140,40; --ink:#1A1208; --inkr:26,18,8; }
  [data-accent="emerald"] { --ac:#2FBF87; --acl:#5BD6A0; --acd:#1E9E6A; --acr:47,191,135;  --aclr:91,214,160;  --acdr:30,158,106; --ink:#06150E; --inkr:6,21,14; }
  [data-accent="violet"]  { --ac:#9B8CF5; --acl:#B6A8FF; --acd:#7A68E0; --acr:155,140,245; --aclr:182,168,255; --acdr:122,104,224; --ink:#120C26; --inkr:18,12,38; }
  [data-accent="coral"]   { --ac:#FF7A66; --acl:#FF9C82; --acd:#E85A45; --acr:255,122,102; --aclr:255,156,130; --acdr:232,90,69;  --ink:#2A0E08; --inkr:42,14,8; }
  [data-accent="sky"]     { --ac:#4FA9F5; --acl:#79C2FF; --acd:#2E86DB; --acr:79,169,245;  --aclr:121,194,255; --acdr:46,134,219; --ink:#06182A; --inkr:6,24,42; }
  [data-accent="rose"]    { --ac:#F26FAE; --acl:#FF92C4; --acd:#E04C90; --acr:242,111,174; --aclr:255,146,196; --acdr:224,76,144; --ink:#2A0A1B; --inkr:42,10,27; }
  [data-accent="lime"]    { --ac:#B6D94B; --acl:#CDE96E; --acd:#94BE2E; --acr:182,217,75;  --aclr:205,233,110; --acdr:148,190,46; --ink:#16200A; --inkr:22,32,10; }
  *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
  html,body{height:100%;background:#0E0B07;font-family:'Manrope',sans-serif;overflow-x:hidden;}   /* DC body bg - see design/PORT-GUIDE.md tokens */
  ::-webkit-scrollbar{width:0;height:0;}
  ::-webkit-scrollbar-track{background:transparent;}
  ::-webkit-scrollbar-thumb{background:rgba(var(--acr),0.3);border-radius:4px;}
  input,select,textarea{font-family:'Manrope',sans-serif;}
  .sora{font-family:'Sora',sans-serif;}
  input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:none;}}
  @keyframes popIn{from{opacity:0;transform:scale(0.9);}to{opacity:1;transform:scale(1);}}
  @keyframes slide{from{opacity:0;transform:translateX(22px);}to{opacity:1;transform:none;}}
  @keyframes mpulse{0%,100%{opacity:1;}50%{opacity:0.45;}}
  .fadeUp{animation:fadeUp 0.32s ease both;}
  .popIn{animation:popIn 0.26s cubic-bezier(0.34,1.56,0.64,1) both;}
  .slide{animation:slide 0.28s ease both;}
  .press{transition:transform 0.12s,opacity 0.12s;cursor:pointer;}
  .press:active{transform:scale(0.96);opacity:0.85;}
  /* ── LAYOUT ── */

  /* Mobile-first: full viewport, no overflow */
  html,body,#root{
    width:100%;max-width:100vw;
    overflow-x:hidden;
    height:100%;
  }
  .app-shell{
    display:block;
    width:100%;max-width:100vw;
    overflow-x:hidden;
    background:#16120D;
    min-height:100vh;
  }
  .sidebar{display:none;}
  .main-pane{
    width:100%;max-width:100vw;
    overflow-x:hidden;
  }
  .page-wrap{
    width:100%;max-width:100vw;
    background:#16120D;
    min-height:100vh;
    overflow-x:hidden;
    padding-bottom:96px;
  }
  .page-content{
    width:100%;
    overflow-x:hidden;
  }
  /* Fixed bottom nav on mobile */
  .bottom-nav-wrap{
    position:fixed;
    bottom:0;left:0;right:0;
    width:100%;
    z-index:9999;
    display:flex;
  }
  .nav-spacer{display:none;}

  /* Desktop overrides */
  @media(min-width:768px){
    .app-shell{
      display:flex;
      background:#16120D;
      max-width:none;
    }
    .sidebar{
      display:flex;flex-direction:column;
      width:230px;flex-shrink:0;
      min-height:100vh;height:100vh;
      background:#1B1610;
      border-right:1px solid rgba(255,255,255,0.06);
      padding:36px 0 24px;
      position:sticky;top:0;
      box-shadow:2px 0 20px rgba(0,0,0,0.3);
    }
    .sidebar-logo{padding:0 24px 36px;font-size:28px;font-weight:800;letter-spacing:-1px;color:#F4ECDD;font-family:'Sora',sans-serif;}
    .sidebar-logo span{color:var(--ac);}
    .sidebar-item{
      display:flex;align-items:center;gap:12px;padding:13px 24px;cursor:pointer;
      font-size:14px;font-weight:700;color:#8C8270;transition:all 0.15s;
      border-left:3px solid transparent;margin-bottom:2px;
    }
    .sidebar-item:hover{background:rgba(var(--acr),0.07);color:var(--ac);}
    .sidebar-item.active{background:rgba(var(--acr),0.12);color:var(--ac);border-left-color:var(--ac);}
    .sidebar-icon{font-size:19px;width:26px;text-align:center;}
    .sidebar-badge{background:#ff6b6b;color:white;border-radius:8px;font-size:10px;font-weight:900;padding:1px 6px;margin-left:auto;}
    .sidebar-footer{margin-top:auto;padding:16px 20px;border-top:1px solid rgba(var(--acr),0.12);}
    .main-pane{flex:1;display:flex;overflow:hidden;max-width:none;height:100vh;}
    .page-wrap{flex:1;max-width:none;padding-bottom:0;height:100vh;overflow-y:auto;overflow-x:hidden;}
    .page-content{width:100%;min-height:100%;}
    .bottom-nav-wrap{display:none!important;}
  }
  @media(min-width:1200px){
    .sidebar{width:260px;}
  }
`;
function Btn({
  children,
  onClick,
  style = {},
  outline,
  sm,
  danger,
  full
}) {
  const base = {
    border: "none",
    borderRadius: sm ? 13 : 18,
    fontFamily: "'Sora',sans-serif",
    fontWeight: 800,
    cursor: "pointer",
    fontSize: sm ? 13 : 15,
    padding: sm ? "9px 18px" : "15px 20px",
    transition: "transform 0.1s",
    width: full ? "100%" : "auto"
  };
  const v = outline ? {
    background: "rgba(255,255,255,0.06)",
    border: "1.5px solid " + C.accent,
    color: C.accent
  } : danger ? {
    background: C.danger,
    color: "white",
    boxShadow: "0 4px 16px rgba(255,107,107,0.25)"
  } : {
    background: C.btnGrad,
    color: C.ink,
    boxShadow: "0 10px 24px rgba(224,123,46,0.32)"
  };
  return _h("button", {
    className: "press",
    style: {
      ...base,
      ...v,
      ...style
    },
    onClick: onClick
  }, children);
}
function Card({
  children,
  style = {},
  onClick
}) {
  return _h("div", {
    className: onClick ? "press" : "",
    onClick: onClick,
    style: {
      background: C.glass,
      backdropFilter: "blur(16px)",
      border: "1px solid " + C.border,
      borderRadius: 22,
      boxShadow: C.shadow,
      padding: 18,
      margin: "0 18px 14px",
      cursor: onClick ? "pointer" : "default",
      ...style
    }
  }, children);
}
function savePhoto(userId, dataUrl) {
  try {
    if (dataUrl) localStorage.setItem("il_photo_" + userId, dataUrl);else localStorage.removeItem("il_photo_" + userId);
    window.dispatchEvent(new CustomEvent("il-photo-updated", {
      detail: userId
    }));
  } catch (e) {}
}
function Ava({
  user,
  size = 46
}) {
  const [photo, setPhoto] = useState(() => {
    try {
      return localStorage.getItem("il_photo_" + user.id) || null;
    } catch (e) {
      return null;
    }
  });
  useEffect(() => {
    const onUpdate = e => {
      if (e.detail === user.id) {
        try {
          setPhoto(localStorage.getItem("il_photo_" + user.id) || null);
        } catch (err) {}
      }
    };
    window.addEventListener("il-photo-updated", onUpdate);
    return () => window.removeEventListener("il-photo-updated", onUpdate);
  }, [user.id]);
  if (photo) return _h("div", {
    style: {
      width: size,
      height: size,
      borderRadius: size * 0.35,
      backgroundImage: "url(" + photo + ")",
      backgroundSize: "cover",
      backgroundPosition: "center",
      border: "2px solid " + user.color + "44",
      flexShrink: 0
    }
  });
  return _h("div", {
    style: {
      width: size,
      height: size,
      borderRadius: size * 0.35,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: size * 0.36,
      fontWeight: 800,
      background: user.color + "22",
      color: user.color,
      border: "2px solid " + user.color + "44",
      flexShrink: 0
    }
  }, user.av);
}
function Chip({
  children,
  active = true,
  onClick,
  style = {}
}) {
  return _h("div", {
    className: onClick ? "press" : "",
    onClick: onClick,
    style: {
      background: active ? C.accentBg : "rgba(255,255,255,0.05)",
      color: active ? C.accent : C.mid,
      borderRadius: 9,
      padding: "5px 12px",
      fontSize: 12,
      fontWeight: 700,
      border: active ? "1px solid " + C.accent + "55" : "1px solid transparent",
      display: "inline-block",
      ...style
    }
  }, children);
}
function SecTitle({
  children
}) {
  return _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.muted,
      letterSpacing: 1.2,
      textTransform: "uppercase",
      padding: "0 18px",
      marginBottom: 10,
      marginTop: 6
    }
  }, children);
}
function FInput({
  label,
  style = {},
  ...props
}) {
  return _h("div", {
    style: {
      marginBottom: 14
    }
  }, label && _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.muted,
      letterSpacing: 0.8,
      marginBottom: 6,
      textTransform: "uppercase"
    }
  }, label), _h("input", {
    style: {
      width: "100%",
      padding: "12px 14px",
      background: "rgba(255,255,255,0.05)",
      border: "1.5px solid rgba(var(--acr),0.22)",
      borderRadius: 13,
      fontSize: 14,
      color: C.text,
      outline: "none",
      ...style
    },
    ...props
  }));
}
function Toggle({
  value,
  onChange,
  label
}) {
  return _h("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, _h("div", {
    className: "press",
    onClick: () => onChange(!value),
    style: {
      width: 44,
      height: 24,
      borderRadius: 12,
      background: value ? C.accent : "rgba(255,255,255,0.12)",
      position: "relative",
      transition: "background 0.2s",
      flexShrink: 0
    }
  }, _h("div", {
    style: {
      width: 18,
      height: 18,
      borderRadius: 9,
      background: "white",
      position: "absolute",
      top: 3,
      left: value ? 23 : 3,
      transition: "left 0.2s",
      boxShadow: "0 1px 4px rgba(0,0,0,0.18)"
    }
  })), label && _h("span", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: C.mid
    }
  }, label));
}
function GymPicker({
  gyms,
  activeGym,
  onSelect,
  onAdd,
  dark = true
}) {
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const submit = () => {
    const n = name.trim();
    if (n) onAdd(n);
    setName("");
    setAdding(false);
  };
  const inactiveBg = dark ? "rgba(255,255,255,0.08)" : "rgba(26,20,12,0.06)";
  const inactiveFg = dark ? C.text : C.ink;
  return _h("div", null, _h("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      alignItems: "center"
    }
  }, (gyms || []).map(g => _h("div", {
    key: g,
    className: "press",
    onClick: () => onSelect(g),
    style: {
      padding: "6px 12px",
      borderRadius: 10,
      fontSize: 12,
      fontWeight: 800,
      background: g === activeGym ? C.accent : inactiveBg,
      color: g === activeGym ? C.ink : inactiveFg,
      border: g === activeGym ? "1px solid " + C.accent : "1px solid transparent"
    }
  }, "\uD83D\uDCCD ", g)), !adding && _h("div", {
    className: "press",
    onClick: () => setAdding(true),
    style: {
      padding: "6px 12px",
      borderRadius: 10,
      fontSize: 12,
      fontWeight: 800,
      border: "1.5px dashed " + (dark ? "rgba(255,255,255,0.3)" : "rgba(224,123,46,0.5)"),
      color: dark ? C.mid : C.accentDark
    }
  }, "\uFF0B Add gym")), adding && _h("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 8
    }
  }, _h("input", {
    autoFocus: true,
    value: name,
    onChange: e => setName(e.target.value),
    onKeyDown: e => {
      if (e.key === "Enter") submit();
    },
    placeholder: "Gym name (e.g. PureGym, Home)",
    style: {
      flex: 1,
      padding: "9px 12px",
      borderRadius: 10,
      border: "1.5px solid rgba(var(--acr),0.3)",
      fontSize: 13,
      outline: "none",
      fontFamily: "'Manrope',sans-serif",
      background: dark ? "rgba(255,255,255,0.06)" : "#fff",
      color: dark ? C.text : C.ink
    }
  }), _h(Btn, {
    sm: true,
    onClick: submit
  }, "Add")));
}
const ACCENTS = [{
  id: "amber",
  acl: "#F8C95E",
  acd: "#E6822A"
}, {
  id: "emerald",
  acl: "#5BD6A0",
  acd: "#1E9E6A"
}, {
  id: "violet",
  acl: "#B6A8FF",
  acd: "#7A68E0"
}, {
  id: "coral",
  acl: "#FF9C82",
  acd: "#E85A45"
}, {
  id: "sky",
  acl: "#79C2FF",
  acd: "#2E86DB"
}, {
  id: "rose",
  acl: "#FF92C4",
  acd: "#E04C90"
}, {
  id: "lime",
  acl: "#CDE96E",
  acd: "#94BE2E"
}];
function AccentPicker({
  accent,
  onPick
}) {
  return _h("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 11
    }
  }, ACCENTS.map(t => _h("div", {
    key: t.id,
    className: "press",
    onClick: () => onPick(t.id),
    style: {
      width: 42,
      height: 42,
      borderRadius: 13,
      background: "linear-gradient(135deg," + t.acl + "," + t.acd + ")",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "2.5px solid " + (accent === t.id ? "#F4ECDD" : "transparent"),
      boxShadow: "0 5px 16px " + t.acd + "66"
    }
  }, accent === t.id && _h("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    style: {
      fill: "none",
      stroke: "var(--ink)",
      strokeWidth: 3.2,
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  }, _h("path", {
    d: "M5 13l4 4 10-11"
  })))));
}
function ExInput({
  value,
  onChange,
  allExercises,
  placeholder = "Exercise name",
  style = {}
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef();
  const suggestions = value.length > 0 ? allExercises.filter(e => e.toLowerCase().includes(value.toLowerCase()) && e.toLowerCase() !== value.toLowerCase()).slice(0, 6) : allExercises.slice(0, 6);
  useEffect(() => {
    const h = e => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return _h("div", {
    ref: wrapRef,
    style: {
      position: "relative",
      ...style
    }
  }, _h("input", {
    value: value,
    placeholder: placeholder,
    onChange: e => {
      onChange(e.target.value);
      setOpen(true);
    },
    onFocus: () => setOpen(true),
    style: {
      width: "100%",
      padding: "11px 14px",
      background: "rgba(255,255,255,0.05)",
      border: "1.5px solid rgba(var(--acr),0.22)",
      borderRadius: 12,
      fontSize: 14,
      color: C.text,
      outline: "none",
      fontFamily: "'Manrope',sans-serif"
    }
  }), open && suggestions.length > 0 && _h("div", {
    className: "popIn",
    style: {
      position: "absolute",
      top: "calc(100% + 4px)",
      left: 0,
      right: 0,
      zIndex: 999,
      background: C.glassHard,
      border: "1px solid " + C.border,
      borderRadius: 14,
      boxShadow: C.shadow,
      overflow: "hidden"
    }
  }, suggestions.map((s, i) => _h("div", {
    key: i,
    className: "press",
    onClick: () => {
      onChange(s);
      setOpen(false);
    },
    style: {
      padding: "11px 14px",
      fontSize: 13,
      color: C.text,
      fontWeight: 600,
      borderBottom: i < suggestions.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none"
    }
  }, s))));
}
function NumInput({
  value,
  onChange,
  min = 0,
  placeholder = ""
}) {
  return _h("input", {
    type: "number",
    value: value,
    placeholder: placeholder,
    min: min,
    onChange: e => onChange(parseInt(e.target.value) || 0),
    style: {
      width: "100%",
      padding: "10px 6px",
      background: "rgba(255,255,255,0.05)",
      border: "1.5px solid rgba(var(--acr),0.2)",
      borderRadius: 10,
      fontSize: 14,
      fontWeight: 700,
      color: C.text,
      outline: "none",
      textAlign: "center",
      fontFamily: "'Manrope',sans-serif"
    }
  });
}
function ExRow({
  ex,
  onChange,
  onRemove,
  allExercises,
  compact = false
}) {
  return _h("div", {
    style: {
      background: "rgba(255,255,255,0.04)",
      border: "1px solid " + C.border,
      borderRadius: 12,
      padding: "10px 12px",
      marginBottom: 8
    }
  }, _h("div", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center",
      marginBottom: compact ? 6 : 10
    }
  }, _h(ExInput, {
    value: ex.name,
    onChange: v => onChange({
      ...ex,
      name: v
    }),
    allExercises: allExercises,
    style: {
      flex: 1
    }
  }), _h("div", {
    className: "press",
    onClick: onRemove,
    style: {
      color: C.danger,
      fontSize: 15,
      padding: "3px 8px",
      flexShrink: 0
    }
  }, "\u2715")), _h("div", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center",
      marginBottom: 8
    }
  }, _h("div", {
    style: {
      flex: 1
    }
  }, _h("div", {
    style: {
      fontSize: 9,
      fontWeight: 800,
      color: C.muted,
      letterSpacing: 0.8,
      textTransform: "uppercase",
      marginBottom: 4
    }
  }, "Sets"), _h(NumInput, {
    value: ex.sets,
    onChange: v => onChange({
      ...ex,
      sets: v
    }),
    min: 1
  })), _h("div", {
    style: {
      paddingTop: 16,
      color: C.muted,
      fontSize: 13,
      fontWeight: 700
    }
  }, "\xD7"), _h("div", {
    style: {
      flex: 1
    }
  }, _h("div", {
    style: {
      fontSize: 9,
      fontWeight: 800,
      color: C.muted,
      letterSpacing: 0.8,
      textTransform: "uppercase",
      marginBottom: 4
    }
  }, "Min reps"), _h(NumInput, {
    value: ex.repsMin,
    onChange: v => onChange({
      ...ex,
      repsMin: v
    }),
    min: 1
  })), _h("div", {
    style: {
      paddingTop: 16,
      color: C.muted,
      fontSize: 12
    }
  }, "\u2013"), _h("div", {
    style: {
      flex: 1
    }
  }, _h("div", {
    style: {
      fontSize: 9,
      fontWeight: 800,
      color: C.muted,
      letterSpacing: 0.8,
      textTransform: "uppercase",
      marginBottom: 4
    }
  }, "Max reps"), _h(NumInput, {
    value: ex.repsMax,
    onChange: v => onChange({
      ...ex,
      repsMax: v
    }),
    min: 1
  }))));
}
function SupersetBlock({
  block,
  onChange,
  onRemove,
  allExercises
}) {
  const [open, setOpen] = useState(block.exercises.length === 0);
  const addEx = () => onChange({
    ...block,
    exercises: [...block.exercises, mkEx("", 3, 8, 12)]
  });
  const updateEx = (id, updated) => onChange({
    ...block,
    exercises: block.exercises.map(e => e.id === id ? updated : e)
  });
  const removeEx = id => onChange({
    ...block,
    exercises: block.exercises.filter(e => e.id !== id)
  });
  return _h("div", {
    style: {
      marginBottom: 10
    }
  }, _h("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: "rgba(var(--acr),0.12)",
      border: "1.5px solid " + C.supersetBorder,
      borderRadius: open ? "14px 14px 0 0" : 14,
      padding: "10px 14px"
    }
  }, _h("div", {
    style: {
      fontSize: 16
    }
  }, "\uD83D\uDD17"), _h("div", {
    style: {
      flex: 1
    }
  }, _h("div", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: C.purple
    }
  }, "SUPERSET"), !open && _h("div", {
    style: {
      fontSize: 11,
      color: C.mid,
      fontWeight: 600
    }
  }, block.exercises.length, " exercise", block.exercises.length !== 1 ? "s" : "", " \xB7 tap to edit")), _h("div", {
    className: "press",
    onClick: () => setOpen(p => !p),
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: C.purple,
      background: "rgba(var(--acr),0.15)",
      borderRadius: 8,
      padding: "5px 10px"
    }
  }, open ? "✓ Close" : "✏️ Edit"), _h("div", {
    className: "press",
    onClick: onRemove,
    style: {
      color: C.danger,
      fontSize: 15,
      padding: "4px 8px"
    }
  }, "\u2715")), open && _h("div", {
    style: {
      background: "rgba(var(--acr),0.06)",
      border: "1.5px solid " + C.supersetBorder,
      borderTop: "none",
      borderRadius: "0 0 14px 14px",
      padding: "10px 12px 12px"
    }
  }, block.exercises.length === 0 && _h("div", {
    style: {
      textAlign: "center",
      padding: "12px 0",
      fontSize: 12,
      color: C.muted,
      fontWeight: 600
    }
  }, "No exercises yet \u2014 add some below"), block.exercises.map(ex => _h(ExRow, {
    key: ex.id,
    ex: ex,
    onChange: updated => updateEx(ex.id, updated),
    onRemove: () => removeEx(ex.id),
    allExercises: allExercises,
    compact: true
  })), _h("div", {
    className: "press",
    onClick: addEx,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      padding: "9px 12px",
      borderRadius: 10,
      border: "1.5px dashed " + C.supersetBorder,
      color: C.purple,
      fontSize: 12,
      fontWeight: 700,
      marginTop: 4
    }
  }, _h("span", null, "\uFF0B"), " Add exercise to superset")), !open && block.exercises.length > 0 && _h("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 5,
      padding: "8px 14px 10px",
      background: "rgba(var(--acr),0.04)",
      border: "1.5px solid " + C.supersetBorder,
      borderTop: "none",
      borderRadius: "0 0 14px 14px"
    }
  }, block.exercises.map((ex, i) => _h("span", {
    key: ex.id,
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.mid
    }
  }, ex.name || "(unnamed)", i < block.exercises.length - 1 && _h("span", {
    style: {
      color: C.supersetBorder,
      margin: "0 4px"
    }
  }, "\u2192")))));
}
function WorkoutEditor({
  workout,
  onChange,
  onRemove,
  allExercises
}) {
  const [emojiOpen, setEmojiOpen] = useState(false);
  const EMOJIS = ["💪", "🏋️", "🦵", "🦾", "🔥", "⚡", "💥", "🎯", "🏃", "🤸", "🧗", "🚴", "🥊", "⚽", "🏊", "🤼", "🎽", "🩻", "💉", "🩹", "🫀", "🦴", "🧬", "🏅", "🥇", "🥈", "🥉", "🏆", "🎖️", "🎗️"];
  const entries = workout.entries || [];
  const updateEntry = (id, updated) => onChange({
    ...workout,
    entries: entries.map(e => e.id === id ? updated : e)
  });
  const removeEntry = id => onChange({
    ...workout,
    entries: entries.filter(e => e.id !== id)
  });
  const moveEntry = (id, dir) => {
    const idx = entries.findIndex(e => e.id === id);
    if (idx < 0) return;
    const newEntries = [...entries];
    const swapIdx = idx + dir;
    if (swapIdx < 0 || swapIdx >= newEntries.length) return;
    [newEntries[idx], newEntries[swapIdx]] = [newEntries[swapIdx], newEntries[idx]];
    onChange({
      ...workout,
      entries: newEntries
    });
  };
  const addExercise = () => onChange({
    ...workout,
    entries: [...entries, mkEx("", 3, 8, 12)]
  });
  const addSuperset = () => onChange({
    ...workout,
    entries: [...entries, mkSS()]
  });
  const [bodyOpen, setBodyOpen] = useState(false);
  const [bodySel, setBodySel] = useState(null);
  const addFromBody = name => onChange({
    ...workout,
    entries: [...(workout.entries || []), mkEx(name, 3, 8, 12)]
  });
  return _h("div", {
    style: {
      background: "rgba(255,255,255,0.04)",
      borderRadius: 18,
      border: "1px solid " + C.border,
      padding: 14,
      marginBottom: 14
    }
  }, _h("div", {
    style: {
      marginBottom: 14
    }
  }, _h("div", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center",
      marginBottom: emojiOpen ? 10 : 0
    }
  }, _h("div", {
    className: "press",
    onClick: () => setEmojiOpen(p => !p),
    style: {
      fontSize: 22,
      padding: "5px 7px",
      borderRadius: 10,
      background: emojiOpen ? C.accentBg : "rgba(255,255,255,0.05)",
      border: "1.5px solid " + (emojiOpen ? C.accent : "transparent"),
      lineHeight: 1
    }
  }, workout.emoji), _h("input", {
    value: workout.name,
    onChange: e => onChange({
      ...workout,
      name: e.target.value
    }),
    placeholder: "Workout name",
    style: {
      flex: 1,
      padding: "9px 12px",
      background: "rgba(255,255,255,0.05)",
      border: "1.5px solid rgba(var(--acr),0.2)",
      borderRadius: 11,
      fontSize: 14,
      color: C.text,
      outline: "none",
      fontFamily: "'Manrope',sans-serif",
      fontWeight: 700
    }
  }), _h("div", {
    className: "press",
    onClick: () => {
      const count = (workout.entries || []).length;
      if (count === 0 || window.confirm('Delete "' + (workout.name || "this workout") + '" and its ' + count + ' exercise' + (count === 1 ? "" : "s") + '?')) onRemove();
    },
    style: {
      color: C.danger,
      fontSize: 18,
      padding: "4px 8px"
    }
  }, "\u2715")), emojiOpen && _h("div", {
    className: "popIn",
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      padding: "10px 12px",
      background: "rgba(255,255,255,0.05)",
      borderRadius: 14,
      border: "1px solid " + C.border
    }
  }, EMOJIS.map(e => _h("div", {
    key: e,
    className: "press",
    onClick: () => {
      onChange({
        ...workout,
        emoji: e
      });
      setEmojiOpen(false);
    },
    style: {
      fontSize: 20,
      padding: "5px 6px",
      borderRadius: 8,
      background: workout.emoji === e ? C.accentBg : "transparent",
      border: "1.5px solid " + (workout.emoji === e ? C.accent : "transparent")
    }
  }, e)))), entries.map((entry, entIdx) => {
    const moveBtn = dir => _h("div", {
      className: "press",
      onClick: () => moveEntry(entry.id, dir),
      style: {
        width: 24,
        height: 24,
        borderRadius: 6,
        background: "rgba(255,255,255,0.05)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        color: C.muted,
        flexShrink: 0,
        opacity: dir === -1 && entIdx === 0 || dir === 1 && entIdx === entries.length - 1 ? 0.3 : 1
      }
    }, dir === -1 ? "↑" : "↓");
    if (entry.type === "ss") {
      return _h("div", {
        key: entry.id,
        style: {
          display: "flex",
          gap: 6,
          alignItems: "flex-start"
        }
      }, _h("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 4,
          paddingTop: 10
        }
      }, moveBtn(-1), moveBtn(1)), _h("div", {
        style: {
          flex: 1
        }
      }, _h(SupersetBlock, {
        block: entry,
        onChange: updated => updateEntry(entry.id, updated),
        onRemove: () => removeEntry(entry.id),
        allExercises: allExercises
      })));
    }
    return _h("div", {
      key: entry.id,
      style: {
        display: "flex",
        gap: 6,
        alignItems: "flex-start"
      }
    }, _h("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 4,
        paddingTop: 10
      }
    }, moveBtn(-1), moveBtn(1)), _h("div", {
      style: {
        flex: 1
      }
    }, _h(ExRow, {
      ex: entry,
      onChange: updated => updateEntry(entry.id, updated),
      onRemove: () => removeEntry(entry.id),
      allExercises: allExercises
    })));
  }), _h("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 10
    }
  }, _h("div", {
    className: "press",
    onClick: addExercise,
    style: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      padding: "10px 8px",
      borderRadius: 12,
      border: "1.5px dashed rgba(var(--acr),0.3)",
      color: C.accentDark,
      fontSize: 12.5,
      fontWeight: 700
    }
  }, _h("span", {
    style: {
      fontSize: 15
    }
  }, "\uFF0B"), " Exercise"), _h("div", {
    className: "press",
    onClick: addSuperset,
    style: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      padding: "10px 8px",
      borderRadius: 12,
      border: "1.5px dashed " + C.supersetBorder,
      color: C.purple,
      fontSize: 12.5,
      fontWeight: 700,
      background: "rgba(var(--acr),0.05)"
    }
  }, _h("span", null, "\uD83D\uDD17"), " Superset"), _h("div", {
    className: "press",
    onClick: () => {
      setBodyOpen(true);
      setBodySel(null);
    },
    style: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      padding: "10px 8px",
      borderRadius: 12,
      border: "1.5px dashed rgba(var(--acr),0.3)",
      color: C.accent,
      fontSize: 12.5,
      fontWeight: 700
    }
  }, _h("span", null, "\uD83E\uDDCD"), " By muscle")), bodyOpen && _h("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 10500,
      background: "rgba(8,6,4,0.75)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16
    },
    onClick: e => {
      if (e.target === e.currentTarget) setBodyOpen(false);
    }
  }, _h("div", {
    className: "popIn",
    style: {
      width: "100%",
      maxWidth: 440,
      maxHeight: "92vh",
      overflowY: "auto",
      background: "#221E18",
      border: "1px solid " + C.border,
      borderRadius: 24,
      padding: 16
    }
  }, _h("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12
    }
  }, _h("div", {
    className: "sora",
    style: {
      fontWeight: 800,
      fontSize: 17,
      color: C.text
    }
  }, "\uD83E\uDDCD Pick by muscle"), _h("div", {
    className: "press",
    onClick: () => setBodyOpen(false),
    style: {
      width: 32,
      height: 32,
      borderRadius: 10,
      background: "rgba(255,255,255,0.06)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: C.muted,
      fontSize: 15
    }
  }, "\u2715")), _h(Body3D, {
    mode: "explore",
    selected: bodySel,
    onPick: k => setBodySel(s => s === k ? null : k),
    height: 300
  }), bodySel && _h("div", {
    style: {
      marginTop: 12
    }
  }, _h("div", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      letterSpacing: 1,
      color: C.muted,
      marginBottom: 9
    }
  }, MUSCLE_BY_KEY[bodySel].name.toUpperCase(), " EXERCISES"), exercisesForMuscle(bodySel).map(name => _h("div", {
    key: name,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "9px 12px",
      background: C.surface,
      border: "1px solid " + C.border,
      borderRadius: 12,
      marginBottom: 7
    }
  }, _h("div", {
    style: {
      flex: 1,
      fontSize: 12.5,
      fontWeight: 700,
      color: C.text
    }
  }, name), _h("div", {
    className: "press",
    onClick: () => {
      addFromBody(name);
    },
    style: {
      padding: "6px 12px",
      borderRadius: 9,
      background: C.btnGrad,
      color: C.ink,
      fontSize: 11,
      fontWeight: 800
    }
  }, "\uFF0B Add")))), !bodySel && _h("div", {
    style: {
      textAlign: "center",
      fontSize: 12,
      color: C.muted,
      fontWeight: 600,
      padding: "12px 0 4px"
    }
  }, "Tap a muscle to list its exercises."))));
}
function CollectionEditor({
  collection,
  onSave,
  onClose,
  allExercises
}) {
  const isNew = !collection.id;
  const [name, setName] = useState(collection.name || "");
  const [desc, setDesc] = useState(collection.desc || "");
  const [emoji, setEmoji] = useState(collection.emoji || "🏆");
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [pub, setPub] = useState(collection.pub || false);
  const [ttype, setTtype] = useState(collection.type || "gym");
  const [workouts, setWorkouts] = useState(collection.workouts?.length ? collection.workouts : [{
    id: uid(),
    name: "Workout A",
    emoji: "💪",
    entries: []
  }]);
  const EMOJIS = ["🏋️", "💪", "🦵", "🦾", "🔥", "⚡", "💥", "🎯", "🏃", "🤸", "🧗", "🚴", "🥊", "🏊", "🤼", "🎽", "🩻", "🫀", "🦴", "🏅", "🥇", "🏆", "🎖️", "🧘", "🤾", "🏇", "🏄", "⛹️", "🤺", "🎿"];
  const addWorkout = () => setWorkouts(p => [...p, {
    id: uid(),
    name: "New Workout",
    emoji: "💪",
    entries: []
  }]);
  const updateWorkout = (id, updated) => setWorkouts(p => p.map(w => w.id === id ? updated : w));
  const removeWorkout = id => setWorkouts(p => p.filter(w => w.id !== id));
  const [saveErr, setSaveErr] = useState("");
  const volumeHeat = useMemo(() => {
    const perMuscle = {};
    workouts.forEach(w => (w.entries || []).forEach(en => {
      const list = en.type === "ss" ? en.exercises || [] : [en];
      list.forEach(ex => {
        const sets = Number(ex.sets) || 0;
        if (!ex.name || sets <= 0) return;
        const mm = metaFor(ex.name).muscles || {};
        Object.entries(mm).forEach(([k, c]) => {
          perMuscle[k] = (perMuscle[k] || 0) + sets * c;
        });
      });
    }));
    const TARGET = 12;
    const heat = {};
    MUSCLES.forEach(m => {
      heat[m.key] = Math.min(1, (perMuscle[m.key] || 0) / TARGET);
    });
    const rows = MUSCLES.map(m => ({
      key: m.key,
      name: m.name,
      sets: Math.round((perMuscle[m.key] || 0) * 10) / 10
    })).sort((a, b) => b.sets - a.sets);
    return {
      heat,
      rows,
      total: Object.values(perMuscle).reduce((a, b) => a + b, 0)
    };
  }, [workouts]);
  const save = () => {
    if (!name.trim()) {
      setSaveErr("Please enter a program name");
      return;
    }
    setSaveErr("");
    onSave({
      ...collection,
      id: collection.id || uid(),
      name,
      desc,
      emoji,
      pub,
      type: ttype,
      workouts
    });
  };
  return _h("div", {
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9998,
      background: C.bg,
      overflowY: "auto",
      paddingBottom: 100
    }
  }, _h("div", {
    style: {
      background: "#16120D",
      padding: "32px 18px 16px",
      position: "sticky",
      top: 0,
      zIndex: 10,
      borderBottom: "1px solid " + C.border
    }
  }, _h("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, _h("div", {
    style: {
      fontSize: 20,
      fontWeight: 900,
      color: C.text
    }
  }, isNew ? "New Program" : "Edit Program"), _h("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, _h(Btn, {
    sm: true,
    outline: true,
    onClick: onClose
  }, "Cancel"), _h(Btn, {
    sm: true,
    onClick: save
  }, "Save"))), saveErr && _h("div", {
    style: {
      color: C.danger,
      fontSize: 13,
      fontWeight: 700,
      marginTop: 8
    }
  }, saveErr)), _h("div", {
    style: {
      padding: "16px 18px 0"
    }
  }, _h("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 9
    }
  }, _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      letterSpacing: 2,
      color: "#8E8475"
    }
  }, "WEEKLY ", _h("span", {
    style: {
      color: "#F4ECDD"
    }
  }, "COVERAGE")), _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#6E665B"
    }
  }, Math.round(volumeHeat.total), " sets planned")), _h("div", {
    style: {
      borderRadius: 22,
      overflow: "hidden",
      border: "1px solid rgba(255,255,255,.07)",
      background: "#181410"
    }
  }, _h(Body3D, {
    mode: "coverage",
    heat: volumeHeat.heat,
    height: 260,
    autoRotate: true
  })), _h("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginTop: 8
    }
  }, _h("div", {
    style: {
      flex: 1,
      height: 6,
      borderRadius: 4,
      background: "linear-gradient(90deg,#8E1B12 0%,#C4432B 28%,#E0913F 55%,#9CC466 80%,#57C08A 100%)"
    }
  })), _h("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 4,
      fontSize: 9.5,
      fontWeight: 800,
      letterSpacing: 1,
      color: "#6E665B"
    }
  }, _h("span", null, "NOT TRAINED"), _h("span", null, "LIGHT"), _h("span", null, "12+ SETS / WEEK")), volumeHeat.total > 0 && _h("div", {
    style: {
      display: "flex",
      gap: 7,
      overflowX: "auto",
      marginTop: 11,
      paddingBottom: 2
    }
  }, volumeHeat.rows.filter(r => r.sets > 0).slice(0, 6).map(r => _h("div", {
    key: r.key,
    style: {
      flexShrink: 0,
      padding: "7px 11px",
      borderRadius: 11,
      background: "rgba(255,255,255,.04)",
      border: "1px solid rgba(255,255,255,.07)"
    }
  }, _h("div", {
    style: {
      fontSize: 10.5,
      fontWeight: 800,
      color: "#F4ECDD"
    }
  }, r.name), _h("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: r.sets >= 12 ? "#57C08A" : r.sets >= 6 ? "#F2B33D" : "#E26A4F",
      marginTop: 2
    }
  }, r.sets, " sets"))), volumeHeat.rows.filter(r => r.sets === 0).length > 0 && _h("div", {
    style: {
      flexShrink: 0,
      padding: "7px 11px",
      borderRadius: 11,
      background: "rgba(226,106,79,.09)",
      border: "1px solid rgba(226,106,79,.28)"
    }
  }, _h("div", {
    style: {
      fontSize: 10.5,
      fontWeight: 800,
      color: "#E8B39F"
    }
  }, "Untrained"), _h("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#E26A4F",
      marginTop: 2
    }
  }, volumeHeat.rows.filter(r => r.sets === 0).length, " muscles")))), _h("div", {
    style: {
      padding: "18px 18px 0"
    }
  }, _h("div", {
    style: {
      marginBottom: 14
    }
  }, _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.muted,
      letterSpacing: 0.8,
      marginBottom: 8,
      textTransform: "uppercase"
    }
  }, "Icon"), _h("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, _h("div", {
    className: "press",
    onClick: () => setEmojiOpen(p => !p),
    style: {
      fontSize: 28,
      padding: "7px 10px",
      borderRadius: 12,
      background: emojiOpen ? C.accentBg : "rgba(255,255,255,0.05)",
      border: "1.5px solid " + (emojiOpen ? C.accent : C.border),
      lineHeight: 1
    }
  }, emoji), _h("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      fontWeight: 600
    }
  }, emojiOpen ? "Pick an icon →" : "Tap to change")), emojiOpen && _h("div", {
    className: "popIn",
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      padding: "12px",
      background: "rgba(255,255,255,0.95)",
      borderRadius: 14,
      border: "1px solid " + C.border,
      marginTop: 10
    }
  }, EMOJIS.map(e => _h("div", {
    key: e,
    className: "press",
    onClick: () => {
      setEmoji(e);
      setEmojiOpen(false);
    },
    style: {
      fontSize: 24,
      padding: "6px 8px",
      borderRadius: 10,
      background: emoji === e ? C.accentBg : "transparent",
      border: "1.5px solid " + (emoji === e ? C.accent : "transparent")
    }
  }, e)))), _h(FInput, {
    label: "Program Name",
    value: name,
    onChange: e => setName(e.target.value),
    placeholder: "e.g. PPL Program, Bro Split"
  }), _h(FInput, {
    label: "Description",
    value: desc,
    onChange: e => setDesc(e.target.value),
    placeholder: "Short description"
  }), _h("div", {
    style: {
      marginBottom: 14
    }
  }, _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.muted,
      letterSpacing: 0.8,
      marginBottom: 8,
      textTransform: "uppercase"
    }
  }, "Training type"), _h("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, [["gym", "🏋️ Gym"], ["calisthenics", "🤸 Calisthenics"]].map(([id, label]) => _h("div", {
    key: id,
    className: "press",
    onClick: () => setTtype(id),
    style: {
      flex: 1,
      textAlign: "center",
      padding: "11px 0",
      borderRadius: 13,
      fontSize: 13,
      fontWeight: 800,
      background: ttype === id ? "rgba(var(--acr),0.14)" : "rgba(255,255,255,0.04)",
      border: "1.5px solid " + (ttype === id ? "rgba(var(--acr),0.5)" : C.border),
      color: ttype === id ? C.accent : C.muted
    }
  }, label)))), _h("div", {
    style: {
      marginBottom: 18
    }
  }, _h(Toggle, {
    value: pub,
    onChange: setPub,
    label: pub ? "Public — others can see & use this" : "Private — only you can see this"
  })), _h("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12
    }
  }, _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.muted,
      letterSpacing: 0.8,
      textTransform: "uppercase"
    }
  }, "Workouts (", workouts.length, ")"), _h(Btn, {
    sm: true,
    onClick: addWorkout
  }, "+ Add Workout")), workouts.map(w => _h(WorkoutEditor, {
    key: w.id,
    workout: w,
    onChange: u => updateWorkout(w.id, u),
    onRemove: () => removeWorkout(w.id),
    allExercises: allExercises
  }))));
}
function BackBtn({
  goBack
}) {
  return _h("div", {
    className: "press",
    onClick: goBack,
    style: {
      width: 40,
      height: 40,
      borderRadius: 14,
      background: "rgba(255,255,255,0.06)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, _h("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    style: {
      fill: "none",
      stroke: C.text,
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  }, _h("path", {
    d: "M15 18l-6-6 6-6"
  })));
}
function PageHeader({
  goBack,
  title,
  subtitle,
  children,
  light
}) {
  const bg = light ? "#16120D" : "#16120D";
  return _h("div", {
    style: {
      background: bg,
      padding: "20px 18px 16px"
    }
  }, _h("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: 36,
      marginBottom: subtitle || children ? 8 : 0
    }
  }, _h("div", {
    style: {
      position: "absolute",
      left: 0
    }
  }, _h(BackBtn, {
    goBack: goBack
  })), _h("div", {
    style: {
      textAlign: "center"
    }
  }, _h("div", {
    className: "sora",
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: C.text,
      lineHeight: 1.2,
      letterSpacing: -0.5
    }
  }, title))), subtitle && _h("div", {
    style: {
      textAlign: "center",
      fontSize: 13,
      color: C.muted,
      fontWeight: 600,
      marginBottom: children ? 10 : 0
    }
  }, subtitle), children);
}
function NavIcon({
  name,
  color
}) {
  const common = {
    width: 23,
    height: 23,
    viewBox: "0 0 24 24",
    style: {
      fill: "none",
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  };
  if (name === "home") return _h("svg", {
    ...common
  }, _h("path", {
    d: "M3 11l9-8 9 8"
  }), _h("path", {
    d: "M5 10v10h5v-6h4v6h5V10"
  }));
  if (name === "stats") return _h("svg", {
    ...common
  }, _h("path", {
    d: "M4 5v15h16"
  }), _h("path", {
    d: "M8 16l3-4 3 2 4-6"
  }));
  if (name === "programs") return _h("svg", {
    ...common
  }, _h("rect", {
    x: "4",
    y: "5",
    width: "16",
    height: "16",
    rx: "3"
  }), _h("path", {
    d: "M4 9h16M8 3v4M16 3v4"
  }));
  if (name === "more") return _h("svg", {
    ...common
  }, _h("circle", {
    cx: "5",
    cy: "12",
    r: "1.6"
  }), _h("circle", {
    cx: "12",
    cy: "12",
    r: "1.6"
  }), _h("circle", {
    cx: "19",
    cy: "12",
    r: "1.6"
  }));
  return null;
}
function Nav({
  screen,
  go,
  unread,
  onMore,
  onQuick
}) {
  const inactive = "#B6AB99";
  const col = sc => screen === sc ? C.accent : inactive;
  const slot = (icon, onClick, active, badge) => _h("div", {
    className: "press",
    onClick: onClick,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 40,
      height: 40,
      position: "relative"
    }
  }, _h(NavIcon, {
    name: icon,
    color: active
  }), badge > 0 && _h("span", {
    style: {
      position: "absolute",
      top: 0,
      right: 0,
      background: C.danger,
      color: "white",
      borderRadius: 8,
      fontSize: 9,
      fontWeight: 900,
      padding: "1px 5px"
    }
  }, badge));
  return _h("div", {
    style: {
      position: "absolute",
      left: 16,
      right: 16,
      bottom: "max(16px,env(safe-area-inset-bottom))",
      height: 68,
      borderRadius: 26,
      background: "#FCFAF6",
      boxShadow: "0 16px 38px rgba(0,0,0,0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 28px",
      zIndex: 50,
      maxWidth: 460,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }, slot("home", () => go("home"), col("home")), slot("stats", () => go("stats"), col("stats")), _h("div", {
    className: "press",
    onClick: onQuick,
    style: {
      width: 56,
      height: 56,
      borderRadius: "50%",
      background: "#1A1612",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 10px 22px rgba(0,0,0,0.3)",
      transform: "translateY(-15px)",
      flexShrink: 0
    }
  }, _h("svg", {
    width: "26",
    height: "26",
    viewBox: "0 0 24 24",
    style: {
      fill: "none",
      stroke: "var(--ac)",
      strokeWidth: 2.4,
      strokeLinecap: "round"
    }
  }, _h("path", {
    d: "M12 5v14M5 12h14"
  }))), slot("programs", () => go("programs"), col("programs")), slot("more", onMore, screen === "body" || screen === "mail" || screen === "exercises" ? C.accent : inactive, unread));
}
const THEMES = {
  amber: {
    name: "Amber",
    ac: "#F2B33D",
    acl: "#F8C95E",
    acd: "#E6822A",
    acr: "242,179,61",
    aclr: "248,201,94",
    acdr: "230,140,40",
    ink: "#1A1208",
    inkr: "26,18,8"
  },
  emerald: {
    name: "Emerald",
    ac: "#2FBF87",
    acl: "#5BD6A0",
    acd: "#1E9E6A",
    acr: "47,191,135",
    aclr: "91,214,160",
    acdr: "30,158,106",
    ink: "#06150E",
    inkr: "6,21,14"
  },
  violet: {
    name: "Violet",
    ac: "#9B8CF5",
    acl: "#B6A8FF",
    acd: "#7A68E0",
    acr: "155,140,245",
    aclr: "182,168,255",
    acdr: "122,104,224",
    ink: "#120C26",
    inkr: "18,12,38"
  },
  coral: {
    name: "Coral",
    ac: "#FF7A66",
    acl: "#FF9C82",
    acd: "#E85A45",
    acr: "255,122,102",
    aclr: "255,156,130",
    acdr: "232,90,69",
    ink: "#2A0E08",
    inkr: "42,14,8"
  },
  sky: {
    name: "Sky",
    ac: "#4FA9F5",
    acl: "#79C2FF",
    acd: "#2E86DB",
    acr: "79,169,245",
    aclr: "121,194,255",
    acdr: "46,134,219",
    ink: "#06182A",
    inkr: "6,24,42"
  },
  rose: {
    name: "Rose",
    ac: "#F26FAE",
    acl: "#FF92C4",
    acd: "#E04C90",
    acr: "242,111,174",
    aclr: "255,146,196",
    acdr: "224,76,144",
    ink: "#2A0A1B",
    inkr: "42,10,27"
  },
  lime: {
    name: "Lime",
    ac: "#B6D94B",
    acl: "#CDE96E",
    acd: "#94BE2E",
    acr: "182,217,75",
    aclr: "205,233,110",
    acdr: "148,190,46",
    ink: "#16200A",
    inkr: "22,32,10"
  }
};
const THEME_ORDER = ["amber", "emerald", "violet", "coral", "sky", "rose", "lime"];
const DC_FROM_REAL = {
  workout: "active",
  postWorkout: "post",
  body: "weight",
  muscles: "body",
  exercises: "guide",
  mail: "inbox",
  mailDetail: "inbox",
  compose: "inbox",
  exportdata: "export",
  referralpage: "referral",
  trialending: "trialend",
  previewTrialEnding: "trialend",
  locked: "expired",
  previewLocked: "expired"
};
const REAL_FROM_DC = {
  active: "workout",
  post: "postWorkout",
  weight: "body",
  body: "muscles",
  guide: "exercises",
  inbox: "mail",
  export: "exportdata",
  referral: "referralpage",
  trialend: "trialending",
  expired: "locked"
};
const dcScreenOf = real => DC_FROM_REAL[real] || real || "";
const realScreenOf = dc => REAL_FROM_DC[dc] || dc;
function photoOf(userId, prefs) {
  if (prefs && prefs.photo) return prefs.photo;
  if (!userId) return null;
  try {
    return localStorage.getItem("il_photo_" + userId) || null;
  } catch (e) {
    return null;
  }
}
function buildCore(ctx) {
  const {
    s,
    user,
    prefs,
    accent,
    gyms,
    activeGym,
    unreadCount,
    toasts,
    minimizedWorkout,
    ui,
    go,
    on
  } = ctx;
  const u = user || {};
  const UI = ui || {};
  const H = on || {};
  const setUi = ctx.setUi || (() => {});
  const screen = dcScreenOf(s);
  const goDC = dcId => {
    setUi({
      profileOpen: false
    });
    go(realScreenOf(dcId));
  };
  const flash = msg => {
    if (H.flash) H.flash(msg);
  };
  const navC = sc => screen === sc ? "var(--ac)" : "#B9AE9B";
  const o = {
    isLogin: screen === "login",
    isHome: screen === "home",
    isPrograms: screen === "programs",
    isActive: screen === "active",
    isPost: screen === "post",
    isStats: screen === "stats",
    isWeight: screen === "weight",
    isInbox: screen === "inbox",
    isAdmin: screen === "admin",
    isBody: screen === "body",
    isGuide: screen === "guide",
    isSplash: screen === "splash",
    isWelcome: screen === "welcome",
    isOnb: screen === "onb",
    isPaywall: screen === "paywall",
    isOffline: screen === "offline",
    isSettings: screen === "settings",
    isAuthForm: ["signup", "signin"].includes(screen),
    isAuthMsg: ["forgot", "reset", "verify"].includes(screen),
    isForgot: screen === "forgot",
    isReset: screen === "reset",
    isVerify: screen === "verify",
    isPayMsg: ["trialok", "purchok", "trialend", "expired"].includes(screen),
    isSubPage: ["acct", "billing", "notifprefs", "privacy", "terms", "help", "about", "delacct", "export", "referral"].includes(screen),
    user: buildUser(user, photoOf(u.id, prefs)),
    openProfile: () => setUi({
      profileOpen: true
    }),
    nav: {
      home: () => goDC("home"),
      stats: () => goDC("stats"),
      programs: () => goDC("programs"),
      body: () => goDC("body"),
      guide: () => goDC("guide"),
      quick: () => {
        if (minimizedWorkout) {
          H.resumeWorkout();
          return;
        }
        goDC("programs");
      },
      more: () => setUi({
        profileOpen: true
      }),
      inbox: () => goDC("inbox"),
      settings: () => goDC("settings"),
      acct: () => goDC("acct"),
      billing: () => goDC("billing"),
      terms: () => goDC("terms"),
      privacy: () => goDC("privacy"),
      paywall: () => goDC("paywall"),
      homeC: navC("home"),
      statsC: navC("stats"),
      programsC: navC("programs"),
      moreC: "#B9AE9B"
    },
    toast: {
      show: !!UI.flashMsg,
      msg: UI.flashMsg || ""
    }
  };
  o.unreadCount = Number(unreadCount) || 0;
  o.mailBadge = String(o.unreadCount || 0);
  o.toastList = (toasts || []).map(t => ({
    icon: t.icon || "🔔",
    title: t.title || "",
    body: t.body || "",
    cta: t.cta || "",
    onTap: () => {
      if (t.onTap) t.onTap();
      H.dismissToast(t.id);
    }
  }));
  o.gyms = {
    list: (gyms || []).map(g => ({
      name: g,
      onSelect: () => {
        H.selectGym(g);
        flash(g + " selected");
      },
      style: g === activeGym ? "padding:7px 14px;border-radius:11px;background:linear-gradient(135deg,var(--acl),var(--acd));color:var(--ink);font-size:12px;font-weight:800;" : "padding:7px 14px;border-radius:11px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);color:#A99E8C;font-size:12px;font-weight:800;"
    })),
    onAdd: () => setUi({
      addGymOpen: true,
      gymInput: ""
    })
  };
  o.addGym = {
    open: !!UI.addGymOpen,
    value: UI.gymInput || "",
    onChange: e => setUi({
      gymInput: e.target.value
    }),
    save: () => {
      const name = (UI.gymInput || "").trim();
      if (name) H.addGym(name);
      setUi({
        addGymOpen: false,
        gymInput: ""
      });
      if (name) flash(name + " added");
    },
    cancel: () => setUi({
      addGymOpen: false
    }),
    stop: e => e.stopPropagation()
  };
  o.profile = {
    open: !!UI.profileOpen,
    close: () => setUi({
      profileOpen: false,
      deleteConfirm: false
    }),
    logout: () => {
      setUi({
        profileOpen: false
      });
      H.logout();
    },
    admin: () => {
      setUi({
        profileOpen: false
      });
      H.openAdmin();
    },
    weight: () => goDC("weight"),
    inbox: () => goDC("inbox"),
    body: () => goDC("body"),
    guide: () => goDC("guide"),
    settings: () => {
      setUi({
        profileOpen: false
      });
      goDC("settings");
    },
    paywall: () => {
      setUi({
        profileOpen: false
      });
      goDC("paywall");
    },
    showDeleteBtn: !UI.deleteConfirm,
    deleteConfirm: !!UI.deleteConfirm,
    askDelete: () => setUi({
      deleteConfirm: true
    }),
    cancelDelete: () => setUi({
      deleteConfirm: false
    }),
    doDelete: () => {
      setUi({
        profileOpen: false,
        deleteConfirm: false
      });
      H.deleteUser(u.id);
    }
  };
  o.themes = THEME_ORDER.map(id => {
    const t = THEMES[id];
    return {
      id,
      name: t.name,
      active: accent === id,
      onPick: () => H.setAccent(id),
      swatchStyle: `width:100%;aspect-ratio:1;border-radius:13px;background:linear-gradient(135deg,${t.acl},${t.acd});display:flex;align-items:center;justify-content:center;border:2.5px solid ${accent === id ? "#F4ECDD" : "transparent"};box-shadow:0 5px 16px rgba(${t.acr},.4);`
    };
  });
  o.jump = {
    groups: [{
      title: "NEW USER FLOW",
      ids: [["splash", "Splash"], ["welcome", "Welcome"], ["signup", "Sign up"], ["signin", "Sign in"], ["verify", "Verify email"], ["onb", "Onboarding"]]
    }, {
      title: "PASSWORD",
      ids: [["forgot", "Forgot"], ["reset", "Reset"], ["login", "PIN picker"]]
    }, {
      title: "SUBSCRIPTION",
      ids: [["paywall", "Paywall"], ["trialok", "Trial started"], ["purchok", "Purchased"], ["trialend", "Trial ending"], ["expired", "Expired"]]
    }, {
      title: "ACCOUNT & OTHER",
      ids: [["settings", "Settings"], ["referral", "Invite friends"], ["export", "Export data"], ["delacct", "Delete account"], ["privacy", "Privacy"], ["terms", "Terms"], ["help", "Help"], ["about", "About"], ["offline", "Offline"]]
    }].map(g => ({
      title: g.title,
      items: g.ids.map(it => ({
        label: it[1],
        go: () => {
          setUi({
            profileOpen: false
          });
          goDC(it[0]);
        },
        style: "padding:6px 11px;border-radius:9px;background:" + (screen === it[0] ? "rgba(var(--acr),.16)" : "rgba(255,255,255,.05)") + ";border:1px solid " + (screen === it[0] ? "rgba(var(--acr),.4)" : "rgba(255,255,255,.07)") + ";font-size:11px;font-weight:800;color:" + (screen === it[0] ? "var(--ac)" : "#C9BEAD") + ";"
      }))
    }))
  };
  o.layout = buildLayout(screen, UI.vw != null ? UI.vw : 1280);
  o.layout.showBottomNav = o.layout.showBottomNav && !UI.editorOpen;
  o.sidebar = buildSidebar(screen, dcId => goDC(dcId), o.unreadCount);
  o.profile.sheetStyle = o.layout.isDesktop ? `position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:420px;max-width:92%;max-height:86vh;overflow-y:auto;z-index:91;background:#1B1712;border-radius:26px;padding:24px 22px 26px;box-shadow:0 30px 80px rgba(0,0,0,.6);animation:pop .38s cubic-bezier(.2,.9,.25,1) both;` : `position:absolute;left:0;right:0;bottom:0;max-width:520px;margin:0 auto;max-height:90vh;overflow-y:auto;z-index:91;background:#1B1712;border-radius:30px 30px 0 0;padding:14px 22px 30px;box-shadow:0 -10px 50px rgba(0,0,0,.5);animation:sheetIn .42s cubic-bezier(.2,.9,.25,1) both;`;
  return o;
}
const AC_BY_ACCENT = {
  amber: "#F2B33D",
  emerald: "#2FBF87",
  violet: "#9B8CF5",
  coral: "#FF7A66",
  sky: "#4FA9F5",
  rose: "#F26FAE",
  lime: "#B6D94B"
};
function readyFmt(n) {
  const r = Math.round(n || 0);
  return r >= 1000 ? r.toLocaleString() : String(r);
}
function readyEntryNames(e) {
  if (!e) return [];
  if (Array.isArray(e.exercises)) return e.exercises.map(x => x && x.name).filter(Boolean);
  if (Array.isArray(e.ss)) return e.ss.map(x => x && x.name).filter(Boolean);
  return e.name ? [e.name] : [];
}
function buildReady(ctx) {
  const user = ctx.user || {};
  const users = ctx.users || [];
  const history = ctx.history || [];
  const collections = ctx.collections || [];
  const rec = ctx.rec || {};
  const sessions = ctx.sessions || {};
  const mySubs = ctx.mySubs || [];
  const ui = ctx.ui || {};
  const on = ctx.on || {};
  const go = ctx.go || function () {};
  const minWk = ctx.minimizedWorkout || null;
  const nowMs = ctx.nowTick || Date.now();
  const DAY = 86400000;
  const tint = c => c + "24",
    ring = c => c + "77";
  const favSess = Array.isArray(ui.favSess) ? ui.favSess : [];
  const hiddenSess = Array.isArray(ui.hiddenSess) ? ui.hiddenSess : [];
  const heatRec = {};
  Object.keys(rec).forEach(k => {
    heatRec[k] = rec[k].pct;
  });
  const acHex = AC_BY_ACCENT[ctx.accent] || AC_BY_ACCENT.amber;
  const NM2 = Object.fromEntries(MUSCLES.map(m => [m.key, m.name]));
  const o = {};
  o.ready = (() => {
    const myColls = collections.filter(c => c.owner === user.id);
    const cands = myColls.flatMap(p => (p.workouts || []).map(w => ({
      p,
      w
    })));
    const scored = cands.map(x => {
      const names = (x.w.entries || []).flatMap(readyEntryNames);
      const mset = new Set();
      names.forEach(n => musclesFor(n).forEach(k => mset.add(k)));
      const sore = [...mset].filter(k => rec[k] && rec[k].pct < 1);
      const worstRemain = sore.length ? Math.max(...sore.map(k => rec[k].remainH)) : 0;
      return {
        x,
        sore,
        worstRemain
      };
    });
    scored.sort((a, b) => a.sore.length - b.sore.length || a.worstRemain - b.worstRemain);
    const keyOf = c => c.x.w.id || c.x.p.name + "/" + c.x.w.name;
    const visP = scored.filter(c => hiddenSess.indexOf(keyOf(c)) === -1).sort((a, b) => (favSess.indexOf(keyOf(b)) > -1 ? 1 : 0) - (favSess.indexOf(keyOf(a)) > -1 ? 1 : 0));
    const picks = visP.slice(0, 6).map((c, pi) => {
      const k = keyOf(c),
        isFav = favSess.indexOf(k) > -1;
      return {
        fav: isFav,
        favIcon: isFav ? "★" : "☆",
        favStyle: "position:absolute;top:9px;right:9px;width:26px;height:26px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:13px;background:rgba(12,9,6,.34);color:" + (isFav ? "#F8C95E" : "#B9AE9B") + ";",
        onFav: ev => {
          if (ev && ev.stopPropagation) ev.stopPropagation();
          if (on.toggleFav) on.toggleFav(k);
        },
        onHide: ev => {
          if (ev && ev.stopPropagation) ev.stopPropagation();
          if (on.hideSess) on.hideSess(k);
          if (on.flash) on.flash(c.x.w.name + " removed from Home");
        },
        emoji: c.x.w.emoji || "💪",
        name: c.x.w.name,
        sub: c.x.p.name,
        tagText: c.sore.length ? "⚠ " + c.sore.length + " sore" : "FRESH",
        tagStyle: pi === 0 ? c.sore.length ? "background:rgba(26,18,8,.16);color:var(--ink);" : "background:rgba(var(--inkr),.16);color:var(--ink);" : c.sore.length ? "background:rgba(226,106,79,.12);color:#E26A4F;" : "background:rgba(87,192,138,.14);color:#57C08A;",
        cardStyle: pi === 0 ? "flex:none;width:166px;border-radius:22px;padding:16px;background:linear-gradient(150deg,var(--acl),var(--ac) 55%,var(--acd));box-shadow:0 14px 30px rgba(var(--acdr),.28);" : "flex:none;width:166px;border-radius:22px;padding:16px;background:#221E18;border:1px solid rgba(255,255,255,.06);",
        cardFg: pi === 0 ? "var(--ink)" : "#F4ECDD",
        cardSub: pi === 0 ? "rgba(var(--inkr),.62)" : "#8E8475",
        onStart: () => {
          if (on.startWorkout) on.startWorkout(c.x.w, c.x.p);
        }
      };
    });
    const best = scored[0];
    const anySore = scored.some(c => c.sore.length > 0);
    let verdict = "Ready to train",
      sub = "Pick whatever's next in your program.";
    if (best) {
      if (!anySore) {
        verdict = "Fully recovered — any day works";
        sub = "Nothing is flagged. Pick whatever's next in your program.";
      } else {
        verdict = "Good day for " + best.x.w.name;
        const soreKeys = Object.keys(rec).filter(k => rec[k].pct < 1).sort((a, b) => rec[b].remainH - rec[a].remainH).slice(0, 3);
        const names = soreKeys.map(k => NM2[k] || k);
        const joined = names.length > 1 ? names.slice(0, -1).join(", ") + " & " + names[names.length - 1] : names[0] || "a few muscles";
        sub = joined + " still recovering — give " + (names.length > 1 ? "them" : "it") + " a bit more time.";
      }
    }
    return {
      heat: heatRec,
      accent: acHex,
      verdict,
      sub,
      picks,
      onPick: k => {
        const info = typeof window !== "undefined" && window.BODY3D_INFO ? window.BODY3D_INFO[k] || null : null;
        if (on.pickMuscle) on.pickMuscle(k, info, "recovery");
        go("body");
      }
    };
  })();
  const editing = !!ui.editPicks;
  o.picksUI = {
    editing: editing,
    label: editing ? "Done" : "Edit",
    style: "padding:6px 12px;border-radius:10px;font-size:10.5px;font-weight:800;letter-spacing:.4px;" + (editing ? "background:linear-gradient(135deg,var(--acl),var(--acd));color:var(--ink);" : "background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);color:#A99E8C;"),
    toggle: () => {
      if (ui.setEditPicks) ui.setEditPicks(!editing);
    },
    hasHidden: hiddenSess.length > 0,
    restore: () => {
      if (on.restoreSessions) on.restoreSessions();
      if (on.flash) on.flash("All sessions back on Home");
    },
    addNew: () => go("programs")
  };
  const tsOf = h => h.ts || (h.date ? Date.parse(h.date + "T12:00:00") : 0);
  const dayKey = ms => {
    const d = new Date(ms);
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  };
  const todayK = dayKey(nowMs),
    yestK = dayKey(nowMs - DAY);
  const weekHist = history.filter(h => tsOf(h) >= nowMs - 7 * DAY);
  const wkVol = weekHist.reduce((a, h) => a + (h.vol || 0), 0);
  const wkSets = weekHist.reduce((a, h) => a + (h.sets || []).length, 0);
  const wkDays = new Set(weekHist.map(h => h.date)).size;
  const wkMin = weekHist.reduce((a, h) => a + (h.dur || 0), 0);
  const nowD = new Date(nowMs);
  const emojiByWorkout = {};
  collections.forEach(c => (c.workouts || []).forEach(w => {
    if (w.name && !emojiByWorkout[w.name]) emojiByWorkout[w.name] = w.emoji;
  }));
  const whenLabel = dstr => {
    if (dstr === todayK) return "TODAY";
    if (dstr === yestK) return "YESTERDAY";
    const d = new Date((dstr || todayK) + "T12:00:00");
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short"
    }).toUpperCase();
  };
  o.home = {
    minimized: !!minWk,
    minEmoji: minWk ? minWk.workout && minWk.workout.emoji || "💪" : "",
    minTitle: minWk ? minWk.workout && minWk.workout.name || "Workout" : "",
    minClock: minWk ? Math.floor((minWk.elapsed || 0) / 60) + ":" + String((minWk.elapsed || 0) % 60).padStart(2, "0") : "",
    resume: () => {
      if (on.resumeWorkout) on.resumeWorkout();
    },
    actDate: nowD.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    }).toUpperCase(),
    actTime: nowD.getHours() + ":" + String(nowD.getMinutes()).padStart(2, "0"),
    actVol: readyFmt(wkVol),
    actSets: String(wkSets),
    actDays: String(wkDays),
    actDur: wkMin >= 60 ? Math.floor(wkMin / 60) + "h " + String(wkMin % 60).padStart(2, "0") : String(wkMin) + " min",
    prev: history.slice(0, 4).map(h => {
      const vals = (h.sets || []).map(x => Math.max(0, (Number(x.kg) || 0) * (Number(x.reps) || 0)));
      const mx = Math.max(1, ...vals);
      const spark = vals.length > 1 ? vals.map((v, i) => `${i * (90 / (vals.length - 1))},${24 - v / mx * 22}`).join(" ") : "0,13 90,13";
      const top = (h.sets || []).reduce((b, x) => (Number(x.kg) || 0) > (b ? Number(b.kg) || 0 : -1) ? x : b, null);
      return {
        when: whenLabel(h.date),
        emoji: h.emoji || emojiByWorkout[h.workoutName] || "💪",
        mins: String(h.dur || 0),
        level: h.collectionName || h.workoutName || "",
        spark: spark,
        tag: top ? String(top.ex || "").toUpperCase() : "SETS",
        tagVal: top ? Math.round((Number(top.kg) || 0) * 10) / 10 + " kg" : String((h.sets || []).length),
        onOpen: () => go("stats")
      };
    })
  };
  const userById = {};
  users.forEach(u => {
    userById[u.id] = u;
  });
  const live = Object.keys(sessions).filter(id => sessions[id] && sessions[id].workout).map(id => ({
    id,
    ss: sessions[id],
    u: userById[id]
  })).filter(x => x.u);
  const liveIds = {};
  live.forEach(x => {
    liveIds[x.id] = true;
  });
  o.nowT = {
    list: live.map(({
      id,
      ss,
      u
    }) => {
      const elapsedMin = Math.max(1, Math.round((nowMs - (ss.startTime || nowMs)) / 60000));
      return {
        av: u.av,
        color: u.color,
        tint: tint(u.color),
        ring: ring(u.color),
        name: id === user.id ? "You" : u.name,
        workout: ss.workout && ss.workout.name || "Workout",
        gym: ss.gym || ctx.activeGym || "",
        clock: elapsedMin + " min",
        sets: ss.loggedSets && ss.loggedSets.length || 0
      };
    }),
    bells: users.filter(u => u.id !== user.id && !liveIds[u.id]).map(u => {
      const subbed = mySubs.indexOf(u.id) > -1;
      return {
        name: u.name,
        icon: subbed ? "🔔" : "🔕",
        onToggle: () => {
          if (on.toggleSub) on.toggleSub(u.id);
          if (!subbed && on.pushToast) on.pushToast({
            icon: "🔔",
            title: "Subscribed",
            body: "You'll get a POP when " + u.name + " starts training.",
            cta: "OK"
          });
        },
        style: subbed ? "display:inline-flex;align-items:center;gap:5px;padding:7px 12px;border-radius:10px;background:rgba(var(--acr),.14);border:1px solid rgba(var(--acr),.4);color:var(--ac);font-size:11.5px;font-weight:800;" : "display:inline-flex;align-items:center;gap:5px;padding:7px 12px;border-radius:10px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);color:#8E8475;font-size:11.5px;font-weight:800;"
      };
    })
  };
  return o;
}
const PROG_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
function buildPrograms(ctx) {
  const {
    user,
    collections = [],
    history = [],
    ui = {},
    setUi = () => {},
    on = {}
  } = ctx;
  const s = ui;
  const now = Date.now();
  const meId = user ? user.id : null;
  const ownerOf = p => p.owner || "";
  const typeOf = p => p.type || "gym";
  const nExW = w => (w.entries || []).reduce((b, e) => b + (e.type === "ss" ? (e.exercises || []).length : 1), 0);
  const nEx = p => (p.workouts || []).reduce((a, w) => a + nExW(w), 0);
  const titleOf = w => {
    const nm = (w.name || "Workout").trim();
    const parts = nm.split(" ");
    return {
      titleA: parts.length > 1 ? parts.slice(0, -1).join(" ") : nm,
      titleB: parts.length > 1 ? parts[parts.length - 1] : "Day"
    };
  };
  const hist = history.slice().sort((a, b) => (b.ts || Date.parse(b.date) || 0) - (a.ts || Date.parse(a.date) || 0));
  const progressOf = (w, p) => {
    let done = 0;
    const back = [0, 0, 0, 0, 0, 0, 0, 0];
    hist.forEach(h => {
      if (h.workoutName !== w.name) return;
      if (h.collectionName && p.name && h.collectionName !== p.name) return;
      const t = h.ts || Date.parse(h.date) || 0;
      const wi = Math.floor((now - t) / PROG_WEEK_MS);
      if (wi === 0) done++;else if (wi >= 1 && wi <= 8) back[wi - 1]++;
    });
    const target = typeof w.target === "number" ? Math.max(1, w.target) : Math.max(1, done, ...back);
    return {
      done: typeof w.done === "number" ? w.done : done,
      target
    };
  };
  const minePs = collections.filter(p => ownerOf(p) === meId);
  const commPs = collections.filter(p => p.pub && ownerOf(p) !== meId);
  const scope = s.progScope || "mine";
  const progFilter = s.progFilter || "all";
  const inType = p => progFilter === "all" || typeOf(p) === progFilter;
  const scoped = (scope === "mine" ? minePs : commPs).filter(inType);
  const progOpen = s.progOpen || {};
  const tabId = scoped.some(p => p.id === s.tab) ? s.tab : "all";
  const tabs = [{
    id: "all",
    label: "ALL"
  }, ...scoped.map(p => ({
    id: p.id,
    label: (p.name || "").toUpperCase()
  }))];
  const blankProgram = () => ({
    name: "",
    desc: "",
    emoji: "🏆",
    pub: false,
    workouts: [],
    owner: meId
  });
  const o = {};
  o.programs = {
    tabs: tabs.map(t => ({
      label: t.label,
      active: tabId === t.id,
      color: tabId === t.id ? "#F4ECDD" : "#6E665B",
      onClick: () => setUi({
        tab: t.id
      })
    })),
    scopes: [{
      id: "mine",
      label: "MY PROGRAMS (" + minePs.length + ")"
    }, {
      id: "community",
      label: "COMMUNITY (" + commPs.length + ")"
    }].map(x => ({
      label: x.label,
      onClick: () => setUi({
        progScope: x.id,
        tab: "all"
      }),
      style: scope === x.id ? "flex:1;text-align:center;padding:11px 0;border-radius:12px;background:rgba(var(--acr),.15);border:1px solid rgba(var(--acr),.4);color:var(--ac);font-size:11.5px;font-weight:800;letter-spacing:.6px;" : "flex:1;text-align:center;padding:11px 0;border-radius:12px;color:#8E8475;font-size:11.5px;font-weight:800;letter-spacing:.6px;"
    })),
    newProgram: () => on.onEdit(blankProgram()),
    empty: scoped.length === 0,
    emptyMsg: scope === "mine" ? "No programs here yet — tap ＋ New to build one" : "No public programs match this filter",
    list: scoped.map((p, i) => {
      const isMine = ownerOf(p) === meId;
      const open = !!progOpen[p.id];
      return {
        emoji: p.emoji || (typeOf(p) === "calisthenics" ? "🤸" : "🏋️"),
        name: p.name,
        delay: i * 0.05 + "s",
        open,
        sub: (p.desc ? p.desc + " · " : "") + (p.workouts || []).length + " workouts · " + nEx(p) + " exercises",
        typeIcon: typeOf(p) === "calisthenics" ? "🤸" : "🏋️",
        isPublic: !!p.pub,
        isMine,
        canAdd: !isMine,
        onToggle: () => setUi({
          progOpen: {
            ...progOpen,
            [p.id]: !progOpen[p.id]
          }
        }),
        chevStyle: "width:32px;height:32px;border-radius:10px;background:rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center;color:#A99E8C;font-size:13px;transition:transform .2s ease;transform:rotate(" + (open ? 180 : 0) + "deg);",
        onEdit: () => on.onEdit(p),
        onTogglePub: () => {
          const next = !p.pub;
          on.saveCollection({
            ...p,
            pub: next
          });
          on.flash(next ? "Program is public 🌍" : "Program is private 🔒");
        },
        pubLabel: p.pub ? "Public — others can see & use this" : "Private — only you can see this",
        switchStyle: "width:42px;height:24px;border-radius:12px;flex-shrink:0;display:flex;align-items:center;padding:3px;box-sizing:border-box;transition:all .2s ease;background:" + (p.pub ? "linear-gradient(135deg,var(--acl),var(--acd))" : "rgba(255,255,255,.1)") + ";justify-content:" + (p.pub ? "flex-end" : "flex-start") + ";",
        knobStyle: "width:18px;height:18px;border-radius:50%;background:" + (p.pub ? "var(--ink)" : "#8E8475") + ";",
        onAddToAccount: () => {
          on.addToAccount(p);
          setUi({
            progScope: "mine",
            tab: "all"
          });
          on.flash("Added to My Programs 💪");
        },
        workouts: (p.workouts || []).map(w => ({
          emoji: w.emoji || "💪",
          name: w.name,
          count: nExW(w) + " EX",
          onStart: () => on.startWorkout(w, p),
          rows: (w.entries || []).map(e => e.type === "ss" ? {
            isSS: true,
            isPlain: false,
            exs: (e.exercises || []).map(x => ({
              name: x.name,
              reps: x.sets + "×" + x.repsMin + "-" + x.repsMax
            }))
          } : {
            isSS: false,
            isPlain: true,
            name: e.name,
            reps: e.sets + "×" + e.repsMin + "-" + e.repsMax
          })
        }))
      };
    }),
    typeChips: [{
      id: "all",
      label: "All"
    }, {
      id: "gym",
      label: "🏋️ Gym"
    }, {
      id: "calisthenics",
      label: "🤸 Calisthenics"
    }].map(tc => ({
      label: tc.label,
      onClick: () => setUi({
        progFilter: tc.id,
        tab: "all"
      }),
      style: progFilter === tc.id ? "padding:8px 14px;border-radius:11px;background:linear-gradient(135deg,var(--acl),var(--acd));color:var(--ink);font-size:12px;font-weight:800;" : "padding:8px 14px;border-radius:11px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);color:#A99E8C;font-size:12px;font-weight:800;"
    })),
    byMuscle: () => on.openMuscleBuilder ? on.openMuscleBuilder() : on.onEdit(blankProgram()),
    cards: (() => {
      const src = scoped.filter(p => tabId === "all" || p.id === tabId);
      const cards = [];
      src.forEach(p => (p.workouts || []).forEach(w => cards.push({
        w,
        p
      })));
      const last = hist[0];
      if (last) {
        const k = cards.findIndex(c => c.w.name === last.workoutName && (!last.collectionName || c.p.name === last.collectionName));
        if (k > 0) cards.unshift(cards.splice(k, 1)[0]);
      }
      const CIRC = 2 * Math.PI * 17;
      return cards.map((c, i) => {
        const hi = i === 0;
        const pr = progressOf(c.w, c.p);
        const pct = Math.max(0, Math.min(100, Math.round(pr.done / pr.target * 100)));
        const t = titleOf(c.w);
        return {
          titleA: t.titleA,
          titleB: t.titleB,
          emoji: c.w.emoji || "🏋️",
          badge: typeOf(c.p) === "calisthenics" ? "🤸 CALI" : "🏋️ GYM",
          badgeStyle: hi ? "padding:4px 9px;border-radius:8px;background:rgba(26,18,8,.18);color:var(--ink);font-size:9px;font-weight:800;letter-spacing:.5px;" : "padding:4px 9px;border-radius:8px;background:rgba(255,255,255,.06);color:#A99E8C;font-size:9px;font-weight:800;letter-spacing:.5px;",
          prog: `${pr.done} / ${pr.target}`,
          pct: pct + "%",
          barW: pct + "%",
          delay: i * 0.05 + "s",
          dash: `${(pct / 100 * CIRC).toFixed(1)} ${CIRC.toFixed(1)}`,
          onStart: () => on.startWorkout(c.w, c.p),
          cardStyle: hi ? "border-radius:26px;padding:18px;background:linear-gradient(155deg,var(--acl),var(--acd));box-shadow:0 16px 34px rgba(var(--acdr),.32)" : "border-radius:26px;padding:18px;background:#211C15;border:1px solid rgba(255,255,255,.06)",
          iconBg: hi ? "rgba(26,18,8,.16)" : "rgba(var(--acr),.13)",
          titleColor: hi ? "var(--ink)" : "#F4ECDD",
          muted: hi ? "rgba(var(--inkr),.62)" : "#8E8475",
          track: hi ? "rgba(26,18,8,.18)" : "rgba(255,255,255,.08)",
          bar: hi ? "var(--ink)" : "var(--ac)",
          ring: hi ? "var(--ink)" : "var(--ac)"
        };
      });
    })()
  };
  o.programs.hero = o.programs.cards[0] || null;
  o.programs.hasHero = !!o.programs.hero;
  return o.programs;
}
const RECRAMP = [[0, [126, 23, 16]], [0.30, [181, 48, 30]], [0.55, [217, 99, 74]], [0.78, [235, 165, 147]], [1, [242, 237, 228]]];
const recCol = p => {
  p = Math.max(0, Math.min(1, p || 0));
  for (let i = 1; i < RECRAMP.length; i++) {
    if (p <= RECRAMP[i][0] || i === RECRAMP.length - 1) {
      const a = RECRAMP[i - 1],
        c = RECRAMP[i];
      const t = (p - a[0]) / Math.max(1e-6, c[0] - a[0]);
      const mix = (x, y) => Math.round(x + (y - x) * Math.max(0, Math.min(1, t)));
      return "rgb(" + mix(a[1][0], c[1][0]) + "," + mix(a[1][1], c[1][1]) + "," + mix(a[1][2], c[1][2]) + ")";
    }
  }
  return "#F2EDE4";
};
const RECTEXT = [[0, [232, 112, 90]], [0.45, [238, 150, 124]], [1, [242, 237, 228]]];
const recTextCol = p => {
  p = Math.max(0, Math.min(1, p || 0));
  for (let i = 1; i < RECTEXT.length; i++) {
    if (p <= RECTEXT[i][0] || i === RECTEXT.length - 1) {
      const a = RECTEXT[i - 1],
        c = RECTEXT[i];
      const t = (p - a[0]) / Math.max(1e-6, c[0] - a[0]);
      const mix = (x, y) => Math.round(x + (y - x) * Math.max(0, Math.min(1, t)));
      return "rgb(" + mix(a[1][0], c[1][0]) + "," + mix(a[1][1], c[1][1]) + "," + mix(a[1][2], c[1][2]) + ")";
    }
  }
  return "#F2EDE4";
};
const BODY3D_PAL_FALLBACK = ["#D64533", "#3D9C56", "#3E64D6", "#E08A2E", "#8C4FD6", "#2FA8A0"];
const body3dPal = () => typeof window !== "undefined" && window.BODY3D_PALETTE || BODY3D_PAL_FALLBACK;
const body3dInfo = k => typeof window !== "undefined" && window.BODY3D_INFO && k ? window.BODY3D_INFO[k] || null : null;
const accentHexOf = ctx => ctx.accentHex || (typeof currentAccentHex === "function" ? currentAccentHex() : "#F2B33D");
const entryTs = h => h.ts || Date.parse((h.date || "") + "T18:00:00") || 0;
function buildBodyLab(ctx) {
  const ui = ctx.ui,
    setUI = ui.set,
    on = ctx.on || {};
  const rec = ctx.rec || {};
  const acHex = accentHexOf(ctx);
  const heatRec = {};
  Object.keys(rec).forEach(k => {
    heatRec[k] = rec[k].pct;
  });
  const PAL = body3dPal();
  const bMode = ui.bodyMode || "recovery";
  const bSel = ui.bodySel || null;
  const bInfo0 = ui.bodyInfo || body3dInfo(bSel);
  const selRec = bSel ? rec[bSel] : null;
  const selBase = bSel && MUSCLE_BY_KEY[bSel] ? MUSCLE_BY_KEY[bSel].base : bInfo0 ? bInfo0.base : 0;
  ui.b3d = ui.b3d || {};
  const o = {
    modes: [{
      id: "recovery",
      label: "🔋 Recovery"
    }, {
      id: "explore",
      label: "🔍 Explore"
    }].map(m => ({
      label: m.label,
      onClick: () => setUI({
        bodyMode: m.id
      }),
      style: "flex:1;text-align:center;padding:10px 0;border-radius:12px;font-size:13px;font-weight:800;transition:all .2s;" + (bMode === m.id ? "background:rgba(var(--acr),.16);color:var(--ac);box-shadow:inset 0 0 0 1px rgba(var(--acr),.35);" : "color:#8E8475;")
    })),
    isRecovery: bMode === "recovery",
    isExplore: bMode === "explore",
    mode3d: bMode === "recovery" ? "recovery" : "explore",
    heat: heatRec,
    accent: acHex,
    sel: bSel,
    autoRotate: (ctx.prefs || {}).autoRotate3d !== false,
    onReady: (h, tag) => {
      ui.b3d = ui.b3d || {};
      ui.b3d[tag || "lab"] = h;
    },
    onPick: (k, inf) => setUI({
      bodySel: k,
      bodyInfo: inf || null,
      bodyPartSel: null
    }),
    onPartPick: pid => setUI({
      bodyPartSel: pid
    }),
    close: () => setUI({
      bodySel: null,
      bodyInfo: null,
      bodyPartSel: null
    }),
    hasSel: !!(bSel && bInfo0),
    showHint: !bSel && bMode === "explore",
    selName: bInfo0 ? bInfo0.name : "",
    selLatin: bInfo0 ? bInfo0.latin : "",
    selBlurb: bInfo0 ? bInfo0.blurb : "",
    selStatus: selRec ? selRec.pct >= 1 ? "Ready ✓" : "~" + selRec.remainH + "h to recover" : bInfo0 ? "~" + selBase + "h base recovery" : "",
    selStatusStyle: "padding:6px 11px;border-radius:9px;font-size:11px;font-weight:800;" + (selRec && selRec.pct < 1 ? `background:rgba(194,59,44,.14);color:${recTextCol(selRec.pct)};border:1px solid rgba(194,59,44,.3);` : "background:rgba(87,192,138,.12);color:#57C08A;border:1px solid rgba(87,192,138,.3);"),
    parts: bInfo0 ? (bInfo0.parts || []).map((p, i) => ({
      name: p.name,
      latin: p.latin,
      tip: p.tip,
      dot: PAL[i % PAL.length],
      glow: PAL[i % PAL.length] + "55",
      onPick: () => {
        const pin = ui.bodyPartSel === p.id ? null : p.id;
        setUI({
          bodyPartSel: pin
        });
        const h = ui.b3d && ui.b3d.lab;
        if (h && h.highlightPart) h.highlightPart(pin);
      },
      style: "display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:13px;transition:all .15s;" + (ui.bodyPartSel === p.id ? "background:rgba(var(--acr),.1);border:1px solid rgba(var(--acr),.4);" : "background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.05);")
    })) : [],
    exs: bSel ? exercisesForMuscle(bSel).map(n => ({
      name: n,
      onHow: () => on.howTo && on.howTo(n)
    })) : [],
    recList: MUSCLES.filter(m => rec[m.key]).sort((a, b) => rec[b.key].remainH - rec[a.key].remainH).map(m => {
      const r = rec[m.key];
      const ready = r.pct >= 1;
      const pctS = Math.round(r.pct * 100) + "%";
      return {
        name: m.name,
        status: ready ? "Ready ✓" : "~" + r.remainH + "h left",
        color: recTextCol(r.pct),
        swatch: recCol(r.pct),
        pct: pctS,
        markerLeft: `calc(${pctS} - 2px)`,
        meta: r.workout + " · " + r.sets + " sets · needs ~" + r.hours + "h recovery",
        onClick: () => setUI({
          bodySel: m.key,
          bodyInfo: body3dInfo(m.key),
          bodyPartSel: null
        }),
        style: "padding:13px 15px;border-radius:16px;background:" + (bSel === m.key ? "rgba(var(--acr),.08)" : "#221E18") + ";border:1px solid " + (bSel === m.key ? "rgba(var(--acr),.35)" : "rgba(255,255,255,.06)") + ";"
      };
    })
  };
  o.hasRec = o.recList.length > 0;
  o.noRec = o.recList.length === 0;
  const D14 = 14 * 24 * 3600e3,
    nowMs = Date.now();
  const hitsByMuscle = {};
  (ctx.history || []).forEach(h => {
    const ts = entryTs(h);
    if (!ts || nowMs - ts > D14) return;
    const ks = new Set();
    (h.sets || []).forEach(x => {
      const p = musclesFor(x.ex)[0];
      if (p) ks.add(p);
    });
    ks.forEach(k => {
      (hitsByMuscle[k] = hitsByMuscle[k] || []).push(ts);
    });
  });
  o.flagged = MUSCLES.filter(m => {
    const hits = hitsByMuscle[m.key] || [],
      r = rec[m.key];
    return hits.length >= 3 && r && r.pct < 0.6;
  }).map(m => {
    const hits = hitsByMuscle[m.key],
      r = rec[m.key];
    return {
      name: m.name,
      sessions: hits.length,
      days: Math.max(1, Math.round((nowMs - Math.min(...hits)) / 86400000)),
      pct: Math.round(r.pct * 100),
      onEase: () => {
        if (on.flash) on.flash("Noted - easing off " + m.name);else if (on.pushToast) on.pushToast("💤", "Noted", "Easing off " + m.name + " - keep it light this week.");
      }
    };
  });
  o.hasFlag = o.flagged.length > 0;
  return o;
}
function buildGuide(ctx) {
  const ui = ctx.ui,
    setUI = ui.set,
    on = ctx.on || {};
  const rec = ctx.rec || {};
  const PAL2 = body3dPal();
  const idxByKey = {};
  MUSCLES.forEach((m, i) => idxByKey[m.key] = i);
  const NM2 = Object.fromEntries(MUSCLES.map(m => [m.key, m.name]));
  const all = [];
  for (const [cat, dbList] of Object.entries(EXERCISE_DB)) {
    for (const ex of dbList) {
      const cali = cat === "Calisthenics";
      all.push({
        n: ex.name,
        slug: ex.slug,
        mk: musclesFor(ex.name)[0] || "chest",
        eq: guideEquipFor(ex.name, cali),
        cali
      });
    }
  }
  const gq = (ui.guideQ || "").toLowerCase(),
    gg = ui.guideGroup || "all",
    ge = ui.guideEquip || "all",
    gt = ui.guideType || "all";
  const list = all.filter(e => (gt === "all" || (gt === "cali" ? e.cali : !e.cali)) && (gg === "all" || e.mk === gg) && (ge === "all" || e.eq === ge) && (!gq || e.n.toLowerCase().includes(gq))).sort((a, b) => a.n.localeCompare(b.n)).map(e => {
    const r = rec[e.mk];
    const meta = (NM2[e.mk] || e.mk) + " · " + e.eq + (r ? r.pct >= 1 ? " · Ready ✓" : " · ~" + r.remainH + "h left" : "");
    return {
      name: e.n,
      cali: e.cali,
      dot: PAL2[(idxByKey[e.mk] || 0) % PAL2.length],
      meta,
      onHow: () => on.howTo && on.howTo(e.n)
    };
  });
  const EQUIP = typeof GUIDE_EQUIP !== "undefined" && GUIDE_EQUIP || ["All", "Barbell", "Dumbbell", "Machine", "Cable", "Bodyweight", "Bar"];
  return {
    q: ui.guideQ || "",
    onQ: ev => setUI({
      guideQ: ev.target.value
    }),
    typeChips: [{
      id: "all",
      label: "All"
    }, {
      id: "gym",
      label: "🏋️ Gym"
    }, {
      id: "cali",
      label: "🤸 Calisthenics"
    }].map(c => ({
      label: c.label,
      onClick: () => setUI({
        guideType: c.id
      }),
      style: gt === c.id ? "flex-shrink:0;white-space:nowrap;padding:8px 14px;border-radius:11px;background:linear-gradient(135deg,var(--acl),var(--acd));color:var(--ink);font-size:12px;font-weight:800;" : "flex-shrink:0;white-space:nowrap;padding:8px 14px;border-radius:11px;background:rgba(255,255,255,.05);color:#8E8475;font-size:12px;font-weight:800;"
    })),
    groupChips: [{
      id: "all",
      label: "All muscles"
    }, ...MUSCLES.map(m => ({
      id: m.key,
      label: m.name
    }))].map(c => ({
      label: c.label,
      onClick: () => setUI({
        guideGroup: c.id
      }),
      style: gg === c.id ? "flex-shrink:0;white-space:nowrap;padding:7px 13px;border-radius:10px;background:rgba(var(--acr),.16);border:1px solid rgba(var(--acr),.5);color:var(--ac);font-size:11.5px;font-weight:800;" : "flex-shrink:0;white-space:nowrap;padding:7px 13px;border-radius:10px;background:transparent;border:1px solid rgba(255,255,255,.08);color:#8E8475;font-size:11.5px;font-weight:800;"
    })),
    equipChips: EQUIP.map(label => {
      const id = label === "All" ? "all" : label;
      return {
        label,
        onClick: () => setUI({
          guideEquip: id
        }),
        style: ge === id ? "flex-shrink:0;white-space:nowrap;padding:7px 13px;border-radius:10px;background:rgba(255,255,255,.1);color:#F4ECDD;font-size:11.5px;font-weight:800;" : "flex-shrink:0;white-space:nowrap;padding:7px 13px;border-radius:10px;background:transparent;border:1px solid rgba(255,255,255,.06);color:#6E665B;font-size:11.5px;font-weight:800;"
      };
    }),
    list,
    empty: list.length === 0,
    count: list.length,
    showBody: (ui.guideView || "body") === "body",
    modeBody: () => setUI({
      guideView: "body"
    }),
    modeList: () => setUI({
      guideView: "list"
    }),
    modeBodyStyle: "padding:8px 14px;border-radius:10px;font-size:11.5px;font-weight:800;white-space:nowrap;" + ((ui.guideView || "body") === "body" ? "background:linear-gradient(135deg,var(--acl),var(--acd));color:var(--ink);" : "color:#8E8475;"),
    modeListStyle: "padding:8px 14px;border-radius:10px;font-size:11.5px;font-weight:800;white-space:nowrap;" + (ui.guideView === "list" ? "background:linear-gradient(135deg,var(--acl),var(--acd));color:var(--ink);" : "color:#8E8475;"),
    sel3d: gg === "all" ? null : gg,
    hasGroup: gg !== "all",
    groupName: gg === "all" ? "" : (MUSCLE_BY_KEY[gg] || {}).name || "",
    onPick3d: k => setUI({
      guideGroup: k || "all"
    })
  };
}
const ST_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const ST_MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const ST_GROUPS = ["Chest", "Back", "Shoulders", "Arms", "Legs", "Core"];
const ST_GROUP_OF = {
  chest: "Chest",
  lats: "Back",
  traps: "Back",
  lowerback: "Back",
  shoulders: "Shoulders",
  biceps: "Arms",
  triceps: "Arms",
  forearms: "Arms",
  quads: "Legs",
  hamstrings: "Legs",
  glutes: "Legs",
  calves: "Legs",
  adductors: "Legs",
  abs: "Core",
  obliques: "Core"
};
const ST_DAY = 86400000,
  ST_WK = 7 * ST_DAY;
const stNum = v => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};
const stFmt = n => {
  const r = Math.round(stNum(n));
  return r >= 1000 ? r.toLocaleString() : String(r);
};
const stTs = h => {
  if (h && h.ts) return stNum(h.ts);
  const t = Date.parse((h && h.date || "") + "T12:00");
  return isNaN(t) ? 0 : t;
};
const stVol = h => h && h.vol != null ? stNum(h.vol) : (h && h.sets || []).reduce((a, s) => a + stNum(s.kg) * stNum(s.reps), 0);
const stSetKg = s => s.drops && s.drops.length ? Math.max(...s.drops.map(d => stNum(d.kg))) : stNum(s.kg);
const stSetReps = s => s.drops && s.drops.length ? s.drops.reduce((a, d) => a + stNum(d.reps), 0) : stNum(s.reps);
const stDayKey = ms => {
  const d = new Date(ms);
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
};
const stLevel = sets => sets <= 0 ? 0 : sets <= 6 ? 1 : sets <= 14 ? 2 : 3;
function stSmooth(vals, w, h, pad) {
  let v = (vals || []).filter(x => Number.isFinite(x));
  if (!v.length) return {
    line: "",
    area: "",
    last: [pad, h - 8]
  };
  if (v.length === 1) v = [v[0], v[0]];
  const mn = Math.min(...v),
    mx = Math.max(...v),
    sp = mx - mn || 1;
  const pts = v.map((x, i) => [pad + i * (w - 2 * pad) / (v.length - 1), h - 8 - (x - mn) / sp * (h - 20)]);
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i],
      [x1, y1] = pts[i + 1];
    const cx = (x0 + x1) / 2;
    d += ` C${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }
  return {
    line: d,
    area: d + ` L${pts[pts.length - 1][0]},${h} L${pts[0][0]},${h} Z`,
    last: pts[pts.length - 1]
  };
}
function buildStats(ctx) {
  const history = ctx.history || [];
  const allHistory = ctx.allHistory || {};
  const users = ctx.users || [];
  const collections = ctx.collections || [];
  const prefs = ctx.prefs || {};
  const ui = ctx.ui || {};
  const set = ui.set || (() => {});
  const now = ctx.nowMs || Date.now();
  const o = {};
  const RANGE_DEFS = {
    "4W": {
      n: 4,
      unit: "w",
      sub: "last 4 weeks",
      labels: ["W1", "W2", "W3", "W4"]
    },
    "12W": {
      n: 12,
      unit: "w",
      sub: "last 12 weeks",
      labels: ["12w", "9w", "6w", "3w", "now"]
    },
    "1Y": {
      n: 12,
      unit: "m",
      sub: "last 12 months",
      labels: null
    }
  };
  const rk = RANGE_DEFS[ui.statsRange] ? ui.statsRange : "12W";
  const rg = RANGE_DEFS[rk];
  const series = new Array(rg.n).fill(0);
  const rSessions = [];
  if (rg.unit === "w") {
    const span = rg.n * ST_WK;
    history.forEach(h => {
      const t = stTs(h);
      if (!t) return;
      const age = now - t;
      if (age < 0 || age >= span) return;
      series[rg.n - 1 - Math.floor(age / ST_WK)] += stVol(h);
      rSessions.push(h);
    });
  } else {
    const nd = new Date(now),
      bY = nd.getFullYear(),
      bM = nd.getMonth();
    history.forEach(h => {
      const t = stTs(h);
      if (!t) return;
      const d = new Date(t);
      const diff = (bY - d.getFullYear()) * 12 + (bM - d.getMonth());
      if (diff < 0 || diff >= rg.n) return;
      series[rg.n - 1 - diff] += stVol(h);
      rSessions.push(h);
    });
  }
  let rangeLabelsSrc = rg.labels;
  if (!rangeLabelsSrc) {
    const nd = new Date(now);
    rangeLabelsSrc = [0, 3, 6, 9, 11].map(i => ST_MON[new Date(nd.getFullYear(), nd.getMonth() - (rg.n - 1 - i), 1).getMonth()]);
  }
  const sm = stSmooth(series, 300, 110, 6);
  const total = series.reduce((a, b) => a + b, 0);
  const sFirst = series[0],
    sLast = series[series.length - 1];
  const delta = sFirst > 0 ? Math.round((sLast - sFirst) / sFirst * 100) : sLast > 0 ? 100 : 0;
  const rSessionCount = rSessions.length;
  const rMin = rSessions.reduce((a, h) => a + stNum(h.dur), 0);
  const rAvg = rSessionCount ? Math.round(rMin / rSessionCount) : 0;
  const rTime = Math.floor(rMin / 60) + "h " + String(rMin % 60).padStart(2, "0");
  const nd0 = new Date(now);
  const monday = new Date(nd0.getFullYear(), nd0.getMonth(), nd0.getDate() - (nd0.getDay() + 6) % 7).getTime();
  const WEEK_SETS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(label => ({
    label,
    v: 0
  }));
  let weekDone = 0;
  history.forEach(h => {
    const t = stTs(h);
    if (t < monday || t >= monday + ST_WK) return;
    weekDone++;
    const di = Math.floor((t - monday) / ST_DAY);
    if (WEEK_SETS[di]) WEEK_SETS[di].v += (h.sets || []).length;
  });
  const mxs = Math.max(...WEEK_SETS.map(w => w.v), 1);
  const dayHas = new Set(history.map(h => {
    const t = stTs(h);
    return t ? stDayKey(t) : "";
  }).filter(Boolean));
  let streakCur = 0;
  for (let i = 0; i < 365; i++) {
    const k = stDayKey(now - i * ST_DAY);
    if (dayHas.has(k)) streakCur++;else if (i > 0) break;
  }
  let streakBest = 0;
  {
    const days = [...dayHas].map(k => Date.parse(k + "T12:00")).filter(t => !isNaN(t)).sort((a, b) => a - b);
    let run = 0,
      prev = 0;
    days.forEach(t => {
      run = prev && Math.round((t - prev) / ST_DAY) === 1 ? run + 1 : 1;
      prev = t;
      if (run > streakBest) streakBest = run;
    });
  }
  let weekGoal = Math.round(stNum(prefs.weeklyGoal));
  if (!weekGoal) {
    const in8 = history.filter(h => {
      const t = stTs(h);
      return t && now - t < 8 * ST_WK;
    }).length;
    weekGoal = Math.max(3, Math.min(7, Math.round(in8 / 8) || 3));
  }
  const C2 = 2 * Math.PI * 16;
  const setsByDay = {};
  history.forEach(h => {
    const t = stTs(h);
    if (!t) return;
    const k = stDayKey(t);
    setsByDay[k] = (setsByDay[k] || 0) + ((h.sets || []).length || 1);
  });
  const HEAT = [];
  for (let i = 83; i >= 0; i--) HEAT.push(stLevel(setsByDay[stDayKey(now - i * ST_DAY)] || 0));
  const splitKg = Object.fromEntries(ST_GROUPS.map(g => [g, 0]));
  rSessions.forEach(h => (h.sets || []).forEach(s => {
    const load = stSetKg(s) > 0 ? stSetKg(s) * stSetReps(s) : stSetReps(s);
    if (load <= 0) return;
    const mm = metaFor(s.ex).muscles || {};
    const tot = Object.values(mm).reduce((a, b) => a + b, 0) || 1;
    Object.entries(mm).forEach(([k, c]) => {
      const g = ST_GROUP_OF[k];
      if (g) splitKg[g] += load * c / tot;
    });
  }));
  const splitRows = ST_GROUPS.map(g => ({
    name: g,
    kg: Math.round(splitKg[g])
  })).sort((a, b) => b.kg - a.kg);
  const splitTot = splitRows.reduce((a, r) => a + r.kg, 0);
  const splitMax = Math.max(...splitRows.map(r => r.kg), 1);
  const prBest = {};
  [...history].sort((a, b) => stTs(a) - stTs(b)).forEach(h => (h.sets || []).forEach(s => {
    if (!s.ex) return;
    const kg = stSetKg(s),
      reps = stSetReps(s);
    if (kg <= 0 || reps < 1 || reps > 12) return;
    const e1 = e1rmOf(kg, reps);
    const cur = prBest[s.ex];
    if (!cur || e1 > cur.e1 + 0.01) prBest[s.ex] = {
      e1,
      kg,
      reps,
      ts: stTs(h),
      prev: cur ? cur.e1 : null
    };
  }));
  const prRows = Object.entries(prBest).map(([ex, p]) => ({
    ex,
    ...p
  })).sort((a, b) => b.e1 - a.e1).slice(0, 5);
  const prDate = t => {
    const d = new Date(t);
    return ST_MON[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
  };
  const emojiFor = h => {
    let hit = null;
    (collections || []).forEach(c => {
      (c.workouts || []).forEach(w => {
        if (w.name !== h.workoutName) return;
        if (!hit || h.collectionName && c.name === h.collectionName) hit = w.emoji || hit;
      });
    });
    return hit || "🏋️";
  };
  const todayMid = new Date(nd0.getFullYear(), nd0.getMonth(), nd0.getDate()).getTime();
  const whenLabel = t => {
    if (t >= todayMid) return "TODAY";
    if (t >= todayMid - ST_DAY) return "YESTERDAY";
    const d = new Date(t);
    return d.getDate() + " " + ST_MON[d.getMonth()].toUpperCase();
  };
  const topSetOf = h => {
    let best = null;
    (h.sets || []).forEach(s => {
      const kg = stSetKg(s);
      if (kg > 0 && (!best || kg > best.kg)) best = {
        ex: s.ex || "",
        kg
      };
    });
    return best;
  };
  o.stats = {
    totalVol: stFmt(total),
    delta: delta + "%",
    line: sm.line,
    area: sm.area,
    lastX: sm.last[0].toFixed(1),
    lastY: sm.last[1].toFixed(1),
    heroSub: "total kg lifted · " + rg.sub,
    rangeLabels: rangeLabelsSrc.map(t => ({
      t
    })),
    ranges: Object.keys(RANGE_DEFS).map(k => ({
      label: k,
      pick: () => set({
        statsRange: k
      }),
      bg: k === rk ? "var(--ac)" : "transparent",
      fg: k === rk ? "var(--ink)" : "#8E8475"
    })),
    tiles: [{
      n: String(rSessionCount),
      l: "SESSIONS",
      fg: "#F4ECDD"
    }, {
      n: rAvg + "m",
      l: "AVG DURATION",
      fg: "var(--ac)"
    }, {
      n: (total / 1000).toFixed(1) + "t",
      l: "TOTAL VOLUME",
      fg: "#F4ECDD"
    }, {
      n: rTime,
      l: "TIME UNDER BAR",
      fg: "#F4ECDD"
    }],
    bars: WEEK_SETS.map(w => ({
      label: w.label,
      h: w.v === 0 ? "4px" : Math.round(w.v / mxs * 100) + "%",
      color: w.v === mxs ? "var(--ac)" : w.v === 0 ? "rgba(255,255,255,.06)" : "rgba(var(--acr),.35)"
    })),
    streakCur: String(streakCur),
    streakBest: String(streakBest),
    weekDone: String(weekDone),
    weekGoal: String(weekGoal),
    weekDash: (Math.min(1, weekGoal ? weekDone / weekGoal : 0) * C2).toFixed(1) + " " + C2.toFixed(1),
    weekPct: (weekGoal ? Math.round(weekDone / weekGoal * 100) : 0) + "%",
    heat: HEAT.map(v => ({
      bg: v === 0 ? "rgba(255,255,255,.045)" : "rgba(var(--acr)," + (0.26 + v * 0.25).toFixed(2) + ")",
      glow: v >= 3 ? "0 0 10px rgba(var(--acr),.4)" : "none"
    })),
    heatDays: ["M", "T", "W", "T", "F", "S", "S"].map(t => ({
      t
    })),
    heatLegend: [0, 1, 2, 3].map(v => ({
      bg: v === 0 ? "rgba(255,255,255,.045)" : "rgba(var(--acr)," + (0.26 + v * 0.25).toFixed(2) + ")"
    })),
    muscles: splitRows.map(x => ({
      name: x.name,
      kg: stFmt(x.kg) + " kg",
      pct: Math.round(splitTot ? x.kg / splitTot * 100 : 0) + "%",
      w: Math.round(x.kg / splitMax * 100) + "%",
      fill: x.kg === splitRows[0].kg && x.kg > 0 ? "linear-gradient(90deg,var(--acl),var(--acd))" : "rgba(var(--acr),.4)"
    })),
    muscleNote: splitTot > 0 ? splitRows[0].name + " leads this block · " + splitRows[splitRows.length - 1].name.toLowerCase() + " is your lightest group" : "",
    prs: prRows.map(p => {
      const isNew = now - p.ts < 30 * ST_DAY;
      const gain = p.prev != null ? Math.round((p.e1 - p.prev) * 10) / 10 : null;
      return {
        ex: p.ex,
        date: prDate(p.ts),
        val: Math.round(p.e1 * 2) / 2 + " kg",
        prev: p.prev != null ? "prev " + Math.round(p.prev * 2) / 2 + " kg" : p.kg + " kg × " + p.reps,
        badge: isNew ? "NEW" : gain != null ? "+" + gain + " kg" : "PR",
        badgeBg: isNew ? "rgba(87,192,138,.16)" : "rgba(255,255,255,.06)",
        badgeFg: isNew ? "#57C08A" : "#A99E8C"
      };
    }),
    sessions: history.slice(0, 4).map(h => {
      const t = stTs(h),
        best = topSetOf(h);
      return {
        emoji: emojiFor(h),
        workout: h.workoutName || "Workout",
        when: whenLabel(t),
        mins: String(stNum(h.dur)),
        level: h.collectionName || (h.sets || []).length + " sets",
        tag: best ? (best.ex.split(" ")[0] || "TOP").toUpperCase() : "SETS",
        tagVal: best ? Math.round(best.kg) + " kg" : String((h.sets || []).length)
      };
    })
  };
  const cmOff = Number.isFinite(ui.calMonth) ? ui.calMonth : 0;
  const cAnchor = new Date(nd0.getFullYear(), nd0.getMonth() + cmOff, 1);
  const cy = cAnchor.getFullYear(),
    cm = cAnchor.getMonth();
  const dim = new Date(cy, cm + 1, 0).getDate();
  const fd = (new Date(cy, cm, 1).getDay() + 6) % 7;
  const trained = {};
  for (let d = 1; d <= dim; d++) {
    const lvl = stLevel(setsByDay[stDayKey(new Date(cy, cm, d).getTime())] || 0);
    if (lvl) trained[d] = lvl;
  }
  const today = cy === nd0.getFullYear() && cm === nd0.getMonth() ? nd0.getDate() : -1;
  const cells = [];
  for (let k = 0; k < fd; k++) cells.push({
    n: "",
    lvl: 0,
    bg: "transparent",
    fg: "transparent",
    ring: ""
  });
  for (let d = 1; d <= dim; d++) {
    const v = trained[d] || 0;
    const isT = d === today;
    cells.push({
      n: String(d),
      lvl: v,
      bg: v >= 3 ? "rgba(var(--acr),.34)" : v > 0 ? "rgba(var(--acr),.16)" : "transparent",
      fg: v >= 3 ? "#1A1206" : v > 0 ? "var(--ac)" : "#6F6659",
      ring: isT ? "box-shadow:inset 0 0 0 1.5px #F4ECDD;" : ""
    });
  }
  o.stats.cal = cells;
  o.stats.calHead = ["M", "T", "W", "T", "F", "S", "S"].map(t => ({
    t
  }));
  o.stats.calTitle = ST_MONTHS[cm] + " " + cy;
  o.stats.calCount = String(Object.keys(trained).filter(k => trained[k] > 0).length);
  o.stats.calPrev = () => set({
    calMonth: cmOff - 1
  });
  o.stats.calNext = () => set({
    calMonth: cmOff + 1
  });
  const exCounts = {};
  history.forEach(h => (h.sets || []).forEach(s => {
    if (s.ex) exCounts[s.ex] = (exCounts[s.ex] || 0) + 1;
  }));
  const exList = Object.entries(exCounts).sort((a, b) => b[1] - a[1]).map(([n]) => n).slice(0, 12);
  const exSel = ui.statsEx && exCounts[ui.statsEx] ? ui.statsEx : exList[0] || "";
  const exPts = history.filter(h => (h.sets || []).some(s => s.ex === exSel)).slice(0, 6).reverse().map(h => {
    let kg = 0,
      e1 = 0;
    (h.sets || []).filter(s => s.ex === exSel).forEach(s => {
      const k = stSetKg(s),
        r = stSetReps(s);
      if (k > kg) kg = k;
      const e = e1rmOf(k, Math.min(r, 12));
      if (e > e1) e1 = e;
    });
    return {
      t: stTs(h),
      kg,
      e1
    };
  }).filter(p => p.kg > 0);
  const exSeries = exPts.map(p => p.kg);
  const exBest = exSeries.length ? Math.max(...exSeries) : 0;
  const ex1rm = exPts.length ? Math.max(...exPts.map(p => p.e1)) : 0;
  const exs = stSmooth(exSeries, 300, 96, 6);
  const exGainN = exSeries.length ? Math.round((exSeries[exSeries.length - 1] - exSeries[0]) * 10) / 10 : 0;
  o.stats.exChips = exList.map(n => ({
    name: n,
    pick: () => set({
      statsEx: n
    }),
    bg: n === exSel ? "rgba(var(--acr),.16)" : "rgba(255,255,255,.04)",
    bd: n === exSel ? "rgba(var(--acr),.4)" : "rgba(255,255,255,.07)",
    fg: n === exSel ? "var(--ac)" : "#A99E8C"
  }));
  o.stats.exName = exSel;
  o.stats.exBest = String(Math.round(exBest * 2) / 2);
  o.stats.ex1rm = Math.round(ex1rm * 2) / 2 + "";
  o.stats.exGain = (exGainN < 0 ? "" : "+") + exGainN + " kg";
  o.stats.exLine = exs.line;
  o.stats.exArea = exs.area;
  o.stats.exLastX = exs.last[0].toFixed(1);
  o.stats.exLastY = exs.last[1].toFixed(1);
  o.stats.exLabels = exPts.map((p, i) => {
    if (i === exPts.length - 1) return {
      t: "now"
    };
    return {
      t: Math.max(1, Math.round((now - p.t) / ST_WK)) + "w"
    };
  });
  const tab = ui.compTab || "sessions";
  o.stats.compTabs = [["sessions", "Sessions"], ["volume", "Volume"], ["exercise", "Per exercise"]].map(([id, label]) => ({
    label,
    pick: () => set({
      compTab: id
    }),
    bg: tab === id ? "rgba(255,255,255,.08)" : "transparent",
    fg: tab === id ? "var(--ac)" : "#8E8475"
  }));
  const allCounts = {};
  Object.values(allHistory).forEach(arr => (arr || []).forEach(h => (h.sets || []).forEach(s => {
    if (s.ex) allCounts[s.ex] = (allCounts[s.ex] || 0) + 1;
  })));
  const compList = Object.entries(allCounts).sort((a, b) => b[1] - a[1]).map(([n]) => n).slice(0, 10);
  const cEx = ui.compEx && allCounts[ui.compEx] ? ui.compEx : compList[0] || "";
  o.stats.showCompEx = tab === "exercise";
  o.stats.compExChips = compList.map(n => ({
    name: n,
    pick: () => set({
      compEx: n
    }),
    bg: n === cEx ? "rgba(var(--acr),.16)" : "rgba(255,255,255,.04)",
    bd: n === cEx ? "rgba(var(--acr),.4)" : "rgba(255,255,255,.07)",
    fg: n === cEx ? "var(--ac)" : "#A99E8C"
  }));
  const compRaw = users.map(u => {
    const uh = allHistory[u.id] || [];
    const exSets = uh.flatMap(h => (h.sets || []).filter(s => s.ex === cEx));
    return {
      name: u.name,
      color: u.color || "var(--ac)",
      sessions: uh.length,
      volume: Math.round(uh.reduce((a, h) => a + stVol(h), 0) / 1000 * 10) / 10,
      lift: exSets.length ? Math.round(Math.max(...exSets.map(s => stSetKg(s))) * 2) / 2 : 0
    };
  });
  const pick = d => tab === "sessions" ? {
    v: d.sessions,
    l: d.sessions + " sessions"
  } : tab === "volume" ? {
    v: d.volume,
    l: d.volume + "t"
  } : {
    v: d.lift,
    l: d.lift + " kg"
  };
  const mxc = Math.max(...compRaw.map(d => pick(d).v), 1);
  const ranked = [...compRaw].sort((a, b) => pick(b).v - pick(a).v);
  const medals = ["🥇", "🥈", "🥉"];
  o.stats.comp = ranked.map((d, i) => {
    const p = pick(d);
    const c2 = /^#[0-9a-fA-F]{6}$/.test(d.color) ? d.color + "aa" : d.color;
    return {
      name: d.name,
      color: d.color,
      label: p.l,
      medal: medals[i] || "·",
      pct: Math.max(p.v / mxc * 100, 4).toFixed(0) + "%",
      fill: "linear-gradient(90deg," + c2 + "," + d.color + ")"
    };
  });
  const win = ranked[0];
  o.stats.winner = win ? win.name + " leads on " + (tab === "sessions" ? "sessions" : tab === "volume" ? "volume" : cEx + " 1RM") : "";
  o.stats.winnerVal = win ? pick(win).l : "";
  return o.stats;
}
function buildStatsDrill(ctx) {
  const history = ctx.history || [];
  const rec = ctx.rec || {};
  const ui = ctx.ui || {};
  const set = ui.set || (() => {});
  const now = ctx.nowMs || Date.now();
  const RECTEXT = [[0, [232, 112, 90]], [0.45, [238, 150, 124]], [1, [242, 237, 228]]];
  const recTextCol = p => {
    p = Math.max(0, Math.min(1, p || 0));
    for (let i = 1; i < RECTEXT.length; i++) {
      if (p <= RECTEXT[i][0] || i === RECTEXT.length - 1) {
        const a = RECTEXT[i - 1],
          c = RECTEXT[i];
        const t = (p - a[0]) / Math.max(1e-6, c[0] - a[0]);
        const mix = (x, y) => Math.round(x + (y - x) * Math.max(0, Math.min(1, t)));
        return "rgb(" + mix(a[1][0], c[1][0]) + "," + mix(a[1][1], c[1][1]) + "," + mix(a[1][2], c[1][2]) + ")";
      }
    }
    return "#F2EDE4";
  };
  const heatRec = {};
  Object.keys(rec).forEach(k => {
    heatRec[k] = rec[k].pct;
  });
  const NM2 = Object.fromEntries(MUSCLES.map(m => [m.key, m.name]));
  const cutoff = now - 14 * ST_DAY;
  const setsByEx = {};
  history.forEach(h => {
    const t = stTs(h);
    if (!t || t < cutoff) return;
    (h.sets || []).forEach(x => {
      if (!x.ex) return;
      setsByEx[x.ex] = (setsByEx[x.ex] || 0) + 1;
    });
  });
  const sel = ui.statsSel || null,
    r = sel ? rec[sel] : null;
  const rows = sel ? Object.entries(setsByEx).filter(([name]) => musclesFor(name).includes(sel)).sort((a, b) => b[1] - a[1]).map(([name, sets]) => ({
    name,
    sets
  })) : Object.entries(setsByEx).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, sets]) => ({
    name,
    sets
  }));
  return {
    heat: heatRec,
    accent: ctx.accentHex || "#F2B33D",
    sel,
    onPick: k => set({
      statsSel: ui.statsSel === k ? null : k
    }),
    clearSel: () => set({
      statsSel: null
    }),
    hasSel: !!sel,
    noSel: !sel,
    name: sel ? NM2[sel] || sel : "",
    status: r ? r.pct >= 1 ? "Ready ✓" : "~" + r.remainH + "h left" : sel ? "No recent training" : "",
    statusColor: r ? recTextCol(r.pct) : "#57C08A",
    rows,
    empty: rows.length === 0,
    emptyMsg: sel ? "No sets logged for " + (NM2[sel] || sel) + " in the last 14 days." : "No sets logged in the last 14 days."
  };
}
function buildStatsVolume(ctx) {
  const history = ctx.history || [];
  const ui = ctx.ui || {};
  const set = ui.set || (() => {});
  const now = ctx.nowMs || Date.now();
  const buckets = {};
  MUSCLES.forEach(m => buckets[m.key] = [0, 0, 0, 0]);
  history.forEach(h => {
    const t = stTs(h);
    if (!t) return;
    const age = now - t;
    if (age < 0 || age >= 4 * ST_WK) return;
    const wi = 3 - Math.floor(age / ST_WK);
    const per = {};
    (h.sets || []).forEach(x => {
      musclesFor(x.ex).forEach((k, i) => {
        per[k] = (per[k] || 0) + (i === 0 ? 1 : 0.5);
      });
    });
    Object.keys(per).forEach(k => {
      if (buckets[k]) buckets[k][wi] += per[k];
    });
  });
  const any = MUSCLES.some(m => buckets[m.key].some(v => v > 0));
  const wi = ui.volWeek == null ? 3 : ui.volWeek;
  const REF = 10;
  const rows = MUSCLES.map(m => {
    const v = Math.round((buckets[m.key][wi] || 0) * 10) / 10;
    const a = Math.min(1, v / REF);
    return {
      name: m.name,
      val: v,
      cellBg: "rgba(var(--acr)," + (0.06 + 0.5 * a).toFixed(2) + ")",
      cellFg: a > 0.4 ? "var(--ink)" : "#C9BEAD"
    };
  });
  const totalOf = key => buckets[key] ? buckets[key].reduce((a, b) => a + b, 0) : 0;
  const groupTotal = g => MUSCLES.reduce((a, m) => a + (ST_GROUP_OF[m.key] === g ? totalOf(m.key) : 0), 0);
  let callout = null;
  const tChest = groupTotal("Chest"),
    tBack = groupTotal("Back");
  if (tChest >= 4 && tChest > 2 * tBack) callout = "Chest volume is " + (tBack > 0 ? (tChest / tBack).toFixed(1) + "x" : "way over") + " Back across 4 weeks - balance push and pull.";else if (tBack >= 4 && tBack > 2 * tChest) callout = "Back volume is " + (tChest > 0 ? (tBack / tChest).toFixed(1) + "x" : "way over") + " Chest across 4 weeks - balance push and pull.";
  if (!callout) {
    let worst = MUSCLES[0],
      worstTotal = 1e9;
    MUSCLES.forEach(m => {
      const t = totalOf(m.key);
      if (t < worstTotal) {
        worstTotal = t;
        worst = m;
      }
    });
    callout = worst.name + " - only " + Math.round(worstTotal * 10) / 10 + " sets across 4 weeks. Worth a set or two next week.";
  }
  return {
    any,
    none: !any,
    rows,
    weeks: ["3 weeks ago", "2 weeks ago", "Last week", "This week"].map((label, i) => ({
      label,
      onClick: () => set({
        volWeek: i
      }),
      style: wi === i ? "padding:7px 12px;border-radius:9px;background:linear-gradient(135deg,var(--acl),var(--acd));color:var(--ink);font-size:11px;font-weight:800;" : "padding:7px 12px;border-radius:9px;background:rgba(255,255,255,.05);color:#8E8475;font-size:11px;font-weight:800;"
    })),
    callout
  };
}
const AW_NOOP = () => {};
const AW_FEEL = [{
  v: 1,
  icon: "😌",
  label: "EASY"
}, {
  v: 2,
  icon: "🙂",
  label: "LIGHT"
}, {
  v: 3,
  icon: "😤",
  label: "SOLID"
}, {
  v: 4,
  icon: "🥵",
  label: "HARD"
}, {
  v: 5,
  icon: "💀",
  label: "FAILURE"
}];
const AW_BLANK = {
  emoji: "",
  name: "",
  meta: "",
  sessionPct: "0%",
  sessionLabel: "0/0",
  minimize: AW_NOOP,
  finish: AW_NOOP,
  isSuperset: false,
  ssPos: "",
  chain: [],
  curName: "",
  setNum: 1,
  plannedSets: 3,
  repRange: "8-12",
  howTo: AW_NOOP,
  kg: "0",
  reps: "",
  onKg: AW_NOOP,
  onReps: AW_NOOP,
  kgPlus: AW_NOOP,
  kgMinus: AW_NOOP,
  repsPlus: AW_NOOP,
  repsMinus: AW_NOOP,
  toggleDrop: AW_NOOP,
  dropBorder: "rgba(255,255,255,.2)",
  dropBg: "transparent",
  dropCheck: "",
  dropCount: 0,
  dropList: [],
  addDrop: AW_NOOP,
  hasDrops: false,
  feelOpts: [],
  gymNote: "",
  gymNoteStyle: "",
  hasLast: false,
  useLastKg: AW_NOOP,
  useLastLabel: "",
  toggleNote: AW_NOOP,
  noteOpen: false,
  note: "",
  onNote: AW_NOOP,
  noteChips: [],
  restOpts: [],
  logSet: AW_NOOP,
  logLabel: "Log Set",
  skipSet: AW_NOOP,
  skipEx: AW_NOOP,
  switchEx: AW_NOOP,
  plan: [],
  isRest: false,
  restLabel: "90",
  restDash: "0 590",
  nextName: "",
  addRest: AW_NOOP,
  skipRest: AW_NOOP,
  soundArmed: true,
  toggleSound: AW_NOOP,
  soundPillStyle: "display:flex;align-items:center;gap:8px;margin-top:14px;padding:8px 13px;border-radius:10px;border:1px solid rgba(87,192,138,.35);background:rgba(87,192,138,.08);font-size:11px;font-weight:700;color:#8E8475;",
  soundDot: "#57C08A",
  soundDotAnim: "pulseDot 1.6s ease infinite",
  soundLabel: "🔊 Sound armed — POP + buzz when rest ends, even with screen off",
  nudge: false,
  nudgeStill: AW_NOOP,
  addOpen: false,
  addClosed: true,
  addQ: "",
  onAddQ: AW_NOOP,
  addMatches: [],
  addHasMatches: false,
  addSets: 3,
  addLo: 8,
  addHi: 12,
  addSetsMinus: AW_NOOP,
  addSetsPlus: AW_NOOP,
  addLoMinus: AW_NOOP,
  addLoPlus: AW_NOOP,
  addHiMinus: AW_NOOP,
  addHiPlus: AW_NOOP,
  addConfirm: AW_NOOP,
  addToggle: AW_NOOP,
  pr: 0,
  e1rm: 0,
  elapsed: 0,
  loggedCount: 0
};
function awTopKg(s) {
  if (!s) return 0;
  return s.drops && s.drops.length ? Math.max(...s.drops.map(d => d.kg || 0)) : s.kg || 0;
}
function awPrFor(history, exName) {
  let max = 0;
  (history || []).forEach(h => (h.sets || []).forEach(s => {
    if (s.ex !== exName) return;
    const t = awTopKg(s);
    if (t > max) max = t;
  }));
  return max;
}
function awLastTime(history, exName, gym, match) {
  if (!history || !exName) return null;
  for (const session of history) {
    let sets = (session.sets || []).filter(s => s.ex === exName);
    if (match === "same") sets = sets.filter(s => (s.gym || session.gym || "") === gym);else if (match === "other") sets = sets.filter(s => (s.gym || session.gym || "") !== gym);
    if (sets.length === 0) continue;
    const weights = sets.flatMap(s => s.drops && s.drops.length ? s.drops.map(d => d.kg) : [s.kg]).filter(k => k > 0);
    const allReps = sets.flatMap(s => s.drops && s.drops.length ? s.drops.map(d => d.reps) : [s.reps]).filter(r => r > 0);
    if (weights.length === 0) continue;
    const avgKg = roundKg(weights.reduce((a, b) => a + b, 0) / weights.length, exName);
    const avgReps = allReps.length ? Math.round(allReps.reduce((a, b) => a + b, 0) / allReps.length) : 0;
    const notes = sets.filter(s => s.note).map(s => s.note);
    return {
      date: session.date,
      gym: (sets.find(s => s.gym) || {}).gym || session.gym || "",
      sets: sets.length,
      avgKg,
      avgReps,
      maxKg: Math.max(...weights),
      notes
    };
  }
  return null;
}
function buildAw(ctx) {
  const ui = ctx.ui || {};
  const on = ctx.on || {};
  const act = ctx.activeWorkout;
  const steps = ui.steps || [];
  const order = ui.stepOrder || [];
  if (!act || !act.workout || steps.length === 0 || order.length === 0) return AW_BLANK;
  const position = ui.position || 0;
  const curOrig = order[position] != null ? order[position] : 0;
  const curStep = steps[curOrig];
  if (!curStep || !curStep.ex) return AW_BLANK;
  const switched = ui.switchedNames || {};
  const nameAt = (origIdx, ex) => switched[origIdx] || (ex ? ex.name : "");
  const curEntry = {
    ...curStep.ex,
    name: nameAt(curOrig, curStep.ex)
  };
  const ssId = curStep.ssId;
  const ssExercises = curStep.ssExercises || [];
  const ssExIdx = curStep.ssExIdx != null ? curStep.ssExIdx : -1;
  const lastInSS = ssId ? ssExIdx === ssExercises.length - 1 : true;
  const plannedSets = curEntry.sets || 3;
  const setNum = ui.setNum || 1;
  const elapsed = ui.elapsed || 0;
  const logged = ui.loggedSets || [];
  const drops = ui.drops || [];
  const dropMode = !!ui.dropMode;
  const gym = ctx.activeGym || "";
  const gymLabel = gym || "this gym";
  const history = ctx.history || [];
  const willFinish = !ssId && setNum >= plannedSets && position === order.length - 1;
  const glSame = awLastTime(history, curEntry.name, gym, gym ? "same" : "any");
  const glOther = gym ? awLastTime(history, curEntry.name, gym, "other") : null;
  const pr = awPrFor(history, curEntry.name);
  const curKg = parseFloat(ui.kg) || 0;
  const curReps = parseInt(ui.reps) || 0;
  const isNewPR = pr > 0 && curKg > pr;
  const isFirstPR = pr === 0 && curKg > 0;
  const dropCount = drops.length + (curReps > 0 ? 1 : 0);
  const restTotal = ui.restSecs > 0 ? ui.restSecs : 90;
  const isRest = ui.phase === "rest";
  const restRemain = isRest && ui.restEndsAt ? Math.max(0, Math.ceil((ui.restEndsAt - (ui.nowTick || Date.now())) / 1000)) : 0;
  const orderedSteps = order.map(i => steps[i]);
  const skipped = ui.skippedSteps || new Set();
  const completed = ui.completedOriginalIdxs || new Set();
  const addQ = ui.addName || "";
  const addMatches = addQ.length > 0 ? (ctx.allExercises || []).filter(n => n.toLowerCase().includes(addQ.toLowerCase()) && n.toLowerCase() !== addQ.toLowerCase()).slice(0, 6).map(n => ({
    name: n,
    onPick: () => on.setAddName(n)
  })) : [];
  const addSets = ui.addSets != null ? ui.addSets : 3;
  const addLo = ui.addMin != null ? ui.addMin : 8;
  const addHi = ui.addMax != null ? ui.addMax : 12;
  const prevNotes = [...new Set(history.flatMap(h => (h.sets || []).filter(x => x.ex === curEntry.name && x.note).map(x => x.note)))].slice(0, 3);
  const soundArmed = ui.soundArmed !== false;
  const logLabel = dropMode ? "🔻 Log Dropset" + (dropCount > 0 ? " (" + dropCount + " drops)" : "") : isNewPR ? "🏆 New PR! Log Set" : isFirstPR ? "🏆 First PR! Log Set" : willFinish ? "Finish Workout ✓" : ssId && !lastInSS ? "Log Set → Next in Superset" : "Log Set → Rest";
  return {
    emoji: act.workout.emoji || "",
    name: act.workout.name || "",
    meta: `${act.collection && act.collection.name || ""} · ${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, "0")} · ${logged.length} sets logged`,
    sessionPct: Math.round(position / order.length * 100) + "%",
    sessionLabel: `${Math.min(position + 1, order.length)}/${order.length}`,
    minimize: () => on.minimize(),
    finish: () => on.finishWorkout(),
    isSuperset: !!ssId,
    ssPos: ssId ? `${ssExIdx + 1}/${ssExercises.length}` : "",
    chain: ssId ? ssExercises.map((e, i) => {
      const orig = steps.findIndex(st => st.ssId === ssId && st.ssExIdx === i);
      return {
        name: nameAt(orig, e),
        color: i === ssExIdx ? "var(--ac)" : "#A99E8C",
        weight: i === ssExIdx ? "800" : "600",
        sep: i < ssExercises.length - 1 ? " → " : ""
      };
    }) : [],
    curName: curEntry.name,
    setNum,
    plannedSets,
    repRange: `${curEntry.repsMin}-${curEntry.repsMax}`,
    howTo: () => on.howTo(curEntry.name),
    kg: ui.kg != null ? ui.kg : "",
    reps: ui.reps != null ? ui.reps : "",
    onKg: e => on.setKg(e.target.value),
    onReps: e => on.setReps(e.target.value),
    kgPlus: () => on.bumpKg(+1, curEntry.name),
    kgMinus: () => on.bumpKg(-1, curEntry.name),
    repsPlus: () => on.bumpReps(+1),
    repsMinus: () => on.bumpReps(-1),
    toggleDrop: () => on.toggleDropMode(),
    dropBorder: dropMode ? "var(--ac)" : "rgba(255,255,255,.2)",
    dropBg: dropMode ? "var(--ac)" : "transparent",
    dropCheck: dropMode ? "✓" : "",
    dropCount: drops.length,
    hasDrops: drops.length > 0,
    dropList: drops.map((d, i) => ({
      label: `${i + 1}. ${d.kg}kg × ${d.reps}`,
      onRemove: () => on.removeDrop(i)
    })),
    addDrop: () => on.addDrop(),
    feelOpts: AW_FEEL.map(f => ({
      icon: f.icon,
      label: f.label,
      onPick: () => on.setFeel(ui.feel === f.v ? null : f.v),
      style: ui.feel === f.v ? "padding:9px 2px;text-align:center;border-radius:12px;background:rgba(var(--acr),.16);border:1.5px solid var(--ac);color:var(--ac);" : "padding:9px 2px;text-align:center;border-radius:12px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);color:#8E8475;"
    })),
    gymNote: glSame ? "📍 " + gymLabel + " · last time " + glSame.avgKg + " kg × " + glSame.avgReps : glOther ? "📍 First time on this at " + gymLabel + " — in " + (glOther.gym || "another gym") + " you did " + glOther.avgKg + " kg × " + glOther.avgReps + ". Enter today's numbers." : "📍 First time logging this — set your numbers for " + gymLabel + ".",
    gymNoteStyle: glSame ? "margin-top:12px;padding:10px 13px;border-radius:12px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.06);font-size:11.5px;font-weight:700;color:#A99E8C;line-height:1.45;" : "margin-top:12px;padding:10px 13px;border-radius:12px;background:rgba(var(--acr),.08);border:1px solid rgba(var(--acr),.28);font-size:11.5px;font-weight:700;color:var(--ac);line-height:1.45;",
    hasLast: !!(glSame || glOther),
    useLastKg: () => on.setKg(String((glSame || glOther || {}).avgKg || 0)),
    useLastLabel: glSame || glOther ? "↑ Use " + (glSame || glOther).avgKg + " kg" : "",
    toggleNote: () => on.toggleNote(),
    noteOpen: !!ui.showNote,
    note: ui.note || "",
    onNote: e => on.setNote(e.target.value),
    noteChips: prevNotes.map(n => ({
      text: n,
      onPick: () => on.setNote(n)
    })),
    restOpts: [30, 60, 90, 120, 180].map(r => ({
      label: r + "s",
      onPick: () => on.setRestSecs(r),
      style: ui.restSecs === r ? "padding:10px 4px;text-align:center;border-radius:12px;background:rgba(var(--acr),.14);border:1.5px solid var(--ac);color:var(--ac);font-size:12.5px;font-weight:800;" : "padding:10px 4px;text-align:center;border-radius:12px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);color:#A99E8C;font-size:12.5px;font-weight:700;"
    })),
    logSet: () => on.logSet(),
    logLabel,
    skipSet: () => on.skipSet(),
    skipEx: () => on.skipExercise(),
    switchEx: () => on.toggleSwitch(),
    plan: orderedSteps.map((st, pos) => {
      const origIdx = order[pos];
      const isFirstSS = !!st.ssId && (pos === 0 || (orderedSteps[pos - 1] || {}).ssId !== st.ssId);
      return {
        n: pos + 1,
        added: !!st.extra,
        name: nameAt(origIdx, st.ex),
        scheme: `${st.ex.sets}×${st.ex.repsMin}-${st.ex.repsMax}`,
        isFirstSS,
        tick: st.ssId ? "rgba(var(--acr),.5)" : "transparent",
        weight: pos === position ? "800" : "600",
        color: pos === position ? "#F4ECDD" : "#A99E8C",
        numStyle: pos === position ? "width:26px;height:26px;border-radius:9px;background:linear-gradient(135deg,var(--acl),var(--acd));color:var(--ink);font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:'Sora',sans-serif" : "width:26px;height:26px;border-radius:9px;background:rgba(255,255,255,.05);color:#8E8475;font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:'Sora',sans-serif",
        done: completed.has ? completed.has(origIdx) : false,
        skipped: skipped.has ? skipped.has(origIdx) : false,
        switched: !!switched[origIdx],
        onJump: () => on.jumpToPosition(pos)
      };
    }),
    isRest,
    restLabel: String(restRemain),
    restDash: `${((restTotal - restRemain) / restTotal * (2 * Math.PI * 94)).toFixed(1)} ${(2 * Math.PI * 94).toFixed(1)}`,
    nextName: curEntry.name,
    addRest: () => on.addRest(),
    skipRest: () => on.skipRest(),
    soundArmed,
    toggleSound: () => on.toggleSound(),
    soundPillStyle: "display:flex;align-items:center;gap:8px;margin-top:14px;padding:8px 13px;border-radius:10px;border:1px solid " + (soundArmed ? "rgba(87,192,138,.35)" : "rgba(226,106,79,.35)") + ";background:" + (soundArmed ? "rgba(87,192,138,.08)" : "rgba(226,106,79,.08)") + ";font-size:11px;font-weight:700;color:" + (soundArmed ? "#8E8475" : "#E26A4F") + ";",
    soundDot: soundArmed ? "#57C08A" : "#E26A4F",
    soundDotAnim: soundArmed ? "pulseDot 1.6s ease infinite" : "none",
    soundLabel: soundArmed ? "🔊 Sound armed — POP + buzz when rest ends, even with screen off" : "🔕 Silent — you won't hear the rest-done buzz",
    nudge: !!ui.nudge,
    nudgeStill: () => on.nudgeStill(),
    addOpen: !!ui.addOpen,
    addClosed: !ui.addOpen,
    addQ,
    onAddQ: e => on.setAddName(e.target.value),
    addMatches,
    addHasMatches: addMatches.length > 0,
    addSets,
    addLo,
    addHi,
    addSetsMinus: () => on.setAddSets(Math.max(1, addSets - 1)),
    addSetsPlus: () => on.setAddSets(Math.min(8, addSets + 1)),
    addLoMinus: () => on.setAddMin(Math.max(1, addLo - 1)),
    addLoPlus: () => on.setAddMin(Math.min(addHi, addLo + 1)),
    addHiMinus: () => on.setAddMax(Math.max(addLo, addHi - 1)),
    addHiPlus: () => on.setAddMax(Math.min(30, addHi + 1)),
    addConfirm: () => on.addSessionExercise(),
    addToggle: () => on.toggleAddPanel(),
    pr,
    e1rm: curKg > 0 && curReps > 0 && curReps <= 30 ? Math.round(curKg * (1 + curReps / 30)) : 0,
    elapsed,
    loggedCount: logged.length,
    programName: act.collection && act.collection.name || "",
    workoutName: act.workout.name || "",
    gymName: gym || "",
    clock: `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, "0")}`,
    sessionVolume: logged.reduce((a, x) => a + (x.drops && x.drops.length ? x.drops.reduce((b, d) => b + (Number(d.kg) || 0) * (Number(d.reps) || 0), 0) : (Number(x.kg) || 0) * (Number(x.reps) || 0)), 0),
    remainingCount: order.filter((oi, pos) => pos > position && !completed.has(oi) && !skipped.has(oi)).length,
    feelValue: ui.feel != null ? ui.feel : null,
    setFeel: v => on.setFeel(v),
    clearFeel: () => on.setFeel(null),
    coach: (() => {
      const rec = ctx.rec || {};
      const mm = metaFor(curEntry.name).muscles || {};
      const primary = Object.entries(mm).sort((a, b) => b[1] - a[1])[0];
      const key = primary ? primary[0] : null;
      const r = key ? rec[key] : null;
      const label = key ? (MUSCLE_BY_KEY[key] || {}).name || key : "";
      const last = glSame || glOther;
      return {
        has: !!(r || last),
        muscle: label.toUpperCase(),
        readiness: r ? Math.round(r.readiness) : null,
        conf: r && r.factors ? r.factors.conf : null,
        line: last ? `Last time ${last.avgKg} kg × ${last.avgReps}. Try ${Math.max(last.avgReps + 1, curEntry.repsMin || 8)} reps.` : "First time logging this - set your numbers."
      };
    })(),
    reorder: (fromPos, toPos) => on.reorder(fromPos, toPos)
  };
}
const POST_BLANK = {
  title: "",
  stats: [],
  dur: "",
  sets: "",
  vol: "",
  heat: {},
  muscleChips: [],
  tops: [],
  shareTitle: "",
  shareMeta: "",
  shareMuscles: "",
  onShare: AW_NOOP,
  onSaveImg: AW_NOOP,
  breakdown: [],
  sessionNote: "",
  onSessionNote: AW_NOOP,
  saveNote: AW_NOOP,
  noteSaved: false,
  sharePreview: null,
  gym: "",
  date: "",
  newPRs: 0
};
function postFmt(n) {
  return Math.round(Number(n) || 0).toLocaleString();
}
function buildPost(ctx) {
  const entry = ctx.post && ctx.post.entry;
  if (!entry) return POST_BLANK;
  const ui = ctx.ui || {};
  const on = ctx.on || {};
  const sets = entry.sets || [];
  const raw = {},
    counts = {};
  sets.forEach(s => {
    const m = metaFor(s.ex).muscles || {};
    Object.entries(m).forEach(([k, c]) => {
      raw[k] = (raw[k] || 0) + c;
      if (c >= 0.5) counts[k] = (counts[k] || 0) + 1;
    });
  });
  const ranked = Object.entries(raw).sort((a, b) => b[1] - a[1]);
  const heat = {};
  ranked.forEach(([k, v]) => {
    heat[k] = Math.min(1, v / 8);
  });
  const muscleNames = ranked.map(([k]) => (MUSCLE_BY_KEY[k] || {}).name || k);
  const prior = (ctx.history || []).filter(h => h.id !== entry.id);
  const bestNow = {};
  sets.forEach(s => {
    const t = awTopKg(s);
    if (!(s.ex in bestNow) || t > bestNow[s.ex]) bestNow[s.ex] = t;
  });
  const newPRs = Object.entries(bestNow).filter(([ex, kg]) => kg > 0 && kg > awPrFor(prior, ex)).length;
  const best = {};
  sets.forEach(s => {
    const sc = setVolume(s);
    if (!best[s.ex] || sc > best[s.ex].sc) {
      best[s.ex] = {
        sc,
        disp: s.drops && s.drops.length ? "🔻 " + s.drops.map(d => d.kg + "×" + d.reps).join(" → ") : (s.kg > 0 ? s.kg + " kg" : "BW") + " × " + s.reps
      };
    }
  });
  const tops = Object.entries(best).slice(0, 3).map(([ex, b]) => ({
    ex,
    disp: b.disp
  }));
  const byEx = {};
  sets.forEach(s => {
    (byEx[s.ex] = byEx[s.ex] || []).push(s);
  });
  const title = [entry.collectionName || "", entry.workoutName || ""].filter(Boolean).join(" · ");
  const todayISO = new Date().toISOString().slice(0, 10);
  return {
    title,
    dur: entry.dur,
    sets: sets.length,
    vol: postFmt(entry.vol),
    stats: [{
      value: entry.dur,
      label: "MINUTES",
      bg: "linear-gradient(150deg,var(--acl),var(--acd))",
      fg: "var(--ink)",
      muted: "rgba(var(--inkr),.62)",
      delay: "0s"
    }, {
      value: sets.length,
      label: "SETS LOGGED",
      bg: "#221E18",
      fg: "#F4ECDD",
      muted: "#8E8475",
      delay: ".06s"
    }, {
      value: postFmt(entry.vol),
      label: "VOLUME KG",
      bg: "#221E18",
      fg: "#F4ECDD",
      muted: "#8E8475",
      delay: ".12s"
    }, {
      value: "+" + newPRs,
      label: "NEW PR",
      bg: "#221E18",
      fg: "var(--ac)",
      muted: "#8E8475",
      delay: ".18s"
    }],
    heat,
    muscleChips: ranked.slice(0, 8).map(([k]) => {
      const n = counts[k] || 0;
      return {
        name: (MUSCLE_BY_KEY[k] || {}).name || k,
        sets: n === 0 ? "assist" : n === 1 ? "1 set" : n + " sets"
      };
    }),
    tops,
    shareTitle: title,
    shareMeta: (ctx.user && ctx.user.name || "") + " · " + (entry.gym || "IronLog") + " · " + (entry.date === todayISO ? "today" : entry.date),
    shareMuscles: muscleNames.slice(0, 5).join(", "),
    onShare: () => on.share(entry),
    onSaveImg: () => on.saveShareImage(entry),
    breakdown: Object.entries(byEx).map(([ex, list]) => ({
      ex,
      isSuperset: !!(list[0] && list[0].ssId),
      volume: postFmt(list.reduce((a, s) => a + setVolume(s), 0)),
      sets: list.map((s, i) => ({
        label: s.drops && s.drops.length ? "Set " + (i + 1) + " 🔻: " + s.drops.map(d => d.kg + "×" + d.reps).join(" → ") : "Set " + (i + 1) + ": " + s.kg + "kg × " + s.reps,
        note: s.note || "",
        isDrop: !!(s.drops && s.drops.length)
      }))
    })),
    sessionNote: ui.sessionNote != null ? ui.sessionNote : entry.sessionNote || "",
    onSessionNote: e => on.setSessionNote(e.target.value),
    saveNote: () => on.saveSessionNote(entry.id, ui.sessionNote || ""),
    noteSaved: !!ui.noteSaved,
    sharePreview: ui.sharePreview || null,
    shareMsg: ui.shareMsg || "",
    gym: entry.gym || "",
    date: entry.date || "",
    newPRs
  };
}
const SUB_TITLES = {
  acct: "Account",
  billing: "Subscription & billing",
  notifprefs: "Notifications",
  delacct: "Delete account",
  export: "Export data",
  importdata: "Import workouts",
  referral: "Invite friends",
  help: "Help & FAQ",
  about: "About IronLog"
};
const SUB_PLAN_ORDER = ["m1", "m3", "m6", "y1", "life"];
const SUB_PLAN_PER = {
  m1: "per month",
  m3: "every 3 mo",
  m6: "every 6 mo",
  y1: "per year",
  life: "once"
};
const SUB_PLAN_MONTHS = {
  m1: 1,
  m3: 3,
  m6: 6,
  y1: 12,
  life: null
};
const subPrice = id => {
  const p = PAYWALL_PLANS.find(x => x.id === id);
  return p ? Number(String(p.price).replace(/[^0-9.]/g, "")) || 0 : 0;
};
function subPlanOf(id) {
  const meta = PAYWALL_PLANS.find(x => x.id === id) || PAYWALL_PLANS[0];
  const raw = subPrice(meta.id);
  const months = SUB_PLAN_MONTHS[meta.id];
  const base = subPrice("m1");
  let tag = meta.badge || "";
  if (!tag && months && months > 1 && base) tag = "SAVE " + Math.round((1 - raw / (base * months)) * 100) + "%";
  return {
    id: meta.id,
    label: meta.label,
    raw,
    price: "€" + raw.toFixed(2),
    per: SUB_PLAN_PER[meta.id] || "",
    months,
    tag,
    sub: meta.id === "life" ? "One payment, yours forever" : months === 1 ? "Billed monthly" : "€" + (raw / months).toFixed(2) + " / month"
  };
}
const subDay = ms => ms ? new Date(ms).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric"
}) : "";
const subDayLong = ms => ms ? new Date(ms).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric"
}) : "";
const subDayShort = ms => ms ? new Date(ms).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "short"
}) : "";
const subMonthYr = ms => ms ? new Date(ms).toLocaleDateString("en-GB", {
  month: "short",
  year: "numeric"
}) : "";
const subSize = b => b < 1024 ? "~" + b + " B" : b < 1048576 ? "~" + Math.round(b / 1024) + " KB" : "~" + (b / 1048576).toFixed(1) + " MB";
const SUB_NOTIFS = [{
  id: "enabled",
  icon: "🔔",
  label: "All notifications",
  sub: "Master switch - nothing pings when this is off"
}, {
  id: "rest",
  icon: "⏱️",
  label: "Rest timer done",
  sub: "POP + notification when rest hits zero"
}, {
  id: "nudge",
  icon: "😴",
  label: "Inactivity nudge",
  sub: "10 minutes without logging a set"
}, {
  id: "messages",
  icon: "✉️",
  label: "Messages",
  sub: "When someone writes to you"
}, {
  id: "training",
  icon: "🏋️",
  label: "Friend training pings",
  sub: "When someone you follow starts"
}];
const SUB_DOCS = {
  privacy: {
    title: "Privacy Policy",
    blocks: [["What we store", "Your workouts, body-weight entries, gyms, programs, profile name/photo and - if you create an account - your email and a salted password hash. That's it."], ["Where it lives", "On the IronLog server you connect to. In this household build, that's a machine in your own home - data never leaves it."], ["What we never do", "No ads. No selling or sharing data. No location, no contacts, no third-party analytics or trackers of any kind."], ["Export & deletion", "Export everything any time (Settings -> Export). Deleting your account has a 30-day grace period, then removal."]]
  },
  terms: {
    title: "Terms of Service",
    blocks: [["The deal", "One free month with every feature, then a paid plan. No free tier. If you don't subscribe, the app locks but your data is kept, never deleted."], ["Your data is yours", "You can export it at any time in open formats (JSON/CSV). Cancelling or being locked never destroys data."], ["Fair use", "One account per person. Sharing an account across a household is what shared-device profiles are for."], ["No medical advice", "Recovery estimates and training info are guidance, not medical advice. Train sensibly."]]
  }
};
const SUB_VERSION = "v0.9";
const SUB_VERSION_LONG = "v0.9 · August 2026";
function buildSub(ctx) {
  const {
    s,
    user,
    account,
    history,
    allHistory,
    weights,
    collections,
    gyms,
    accent,
    prefs,
    ui,
    setUi,
    go,
    goBack,
    on
  } = ctx;
  const u = user || {};
  const acc = account || null;
  const UI = ui || {};
  const H = on || {};
  const set = setUi || (() => {});
  const screen = dcScreenOf(s);
  const flash = m => {
    if (H.flash) H.flash(m);
  };
  const hist = history && history.length ? history : (allHistory || {})[acc && acc.userId] || [];
  const wts = weights || [];
  const myProgs = (collections || []).filter(c => c.owner === u.id);
  const setCount = hist.reduce((a, h) => a + (h.sets || []).length, 0);
  const asub = acc && acc.subscription ? acc.subscription : null;
  const isLife = !!(asub && asub.lifetime);
  const active = !!(acc && acc.subscriptionActive);
  const locked = !!(acc && acc.locked);
  const trialD = acc ? Number(acc.trialDaysLeft) || 0 : 0;
  const selPlan = subPlanOf(UI.plan || asub && asub.plan || "y1");
  const actPlan = asub && asub.plan ? subPlanOf(asub.plan) : null;
  const np = prefs && prefs.notifs || {};
  const notifOn = id => np[id] !== false;
  const notifCount = SUB_NOTIFS.filter(n => notifOn(n.id)).length;
  const o = {};
  const row = (icon, label, value, onTap, fg) => ({
    icon,
    label,
    value: value || "",
    onTap,
    fg: fg || "#F4ECDD",
    style: "display:flex;align-items:center;gap:12px;padding:14px 16px;background:#221E18;border-bottom:1px solid rgba(255,255,255,.05);"
  });
  const planName = !acc ? "Household profile" : active ? isLife ? "IronLog Lifetime" : "IronLog Pro · " + (asub.label || "Active") : locked ? "No active plan" : "Free trial";
  const planSub = !acc ? "Shared-device profile - free forever" : active ? isLife ? "Yours forever - thanks for backing us early" : "Renews " + subDay(asub.until) : locked ? "Subscribe to unlock the app" : "Free trial · " + trialD + " days left" + (actPlan ? ", then " + actPlan.price : "");
  const planBadge = !acc ? "FREE" : active ? isLife ? "LIFETIME" : asub.mock ? "DEMO PLAN" : "ACTIVE" : locked ? "LOCKED" : trialD + " DAYS FREE LEFT";
  const rows = [row("💬", "Help & FAQ", "", () => go("help")), row("📄", "Privacy Policy", "", () => go("privacy")), row("📜", "Terms of Service", "", () => go("terms")), row("ℹ️", "About IronLog", SUB_VERSION, () => go("about")), row("⬇️", "Export my data", "", () => go("exportdata")), row("📥", "Import workouts", "", () => go("importdata"))];
  if (acc) rows.push(row("🗑️", "Delete account", acc.deleteScheduledAt ? "Scheduled " + subDayShort(acc.deleteScheduledAt) : "", () => go("delacct"), "#E26A4F"));
  rows[rows.length - 1].style = "display:flex;align-items:center;gap:12px;padding:14px 16px;background:#221E18;";
  o.settings = {
    email: acc ? acc.email : u.name ? u.name + " · shared-device profile" : "",
    hasAccount: !!acc,
    version: SUB_VERSION_LONG,
    planIcon: !acc ? "🏠" : locked ? "🔒" : "⭐",
    planName,
    planSub,
    planBadge,
    tiles: [{
      icon: "🔔",
      label: "Notifications",
      sub: notifCount + " of " + SUB_NOTIFS.length + " on",
      onTap: () => go("notifprefs"),
      fg: "#F4ECDD",
      style: "border-radius:20px;padding:16px;background:#221E18;border:1px solid rgba(255,255,255,.06);"
    }, {
      icon: "📍",
      label: "Gyms",
      sub: (gyms || []).length + " saved" + (ctx.activeGym ? " · " + ctx.activeGym : ""),
      onTap: () => set({
        profileOpen: true
      }),
      fg: "#F4ECDD",
      style: "border-radius:20px;padding:16px;background:#221E18;border:1px solid rgba(255,255,255,.06);"
    }, {
      icon: "🎨",
      label: "Appearance",
      sub: (accent || "amber") + " accent",
      onTap: () => set({
        profileOpen: true
      }),
      fg: "#F4ECDD",
      style: "border-radius:20px;padding:16px;background:#221E18;border:1px solid rgba(255,255,255,.06);"
    }, {
      icon: "🎁",
      label: "Invite friends",
      sub: "Get a free month",
      onTap: () => go("referralpage"),
      fg: "var(--ac)",
      style: "border-radius:20px;padding:16px;background:rgba(var(--acr),.09);border:1.5px dashed rgba(var(--acr),.4);"
    }],
    rows,
    logout: () => H.logout(),
    signOutAccount: () => H.accountSignOut()
  };
  o.pay = {
    close: () => {
      if (acc && !active && !locked && trialD > 0) flash("You're on the free month - enjoy");
      go(locked ? "locked" : u.id ? "home" : "welcome");
    },
    restore: () => H.restorePurchases(),
    perks: [{
      text: "Unlimited programs and custom workouts"
    }, {
      text: "Full 3D recovery map and muscle drill-down"
    }, {
      text: "Per-gym weight memory"
    }, {
      text: "Complete stats history and PR tracking"
    }, {
      text: "Friends, leaderboards and training pings"
    }],
    plans: SUB_PLAN_ORDER.map(id => {
      const p = subPlanOf(id);
      const on = selPlan.id === p.id;
      return {
        label: p.label,
        sub: p.sub,
        price: p.price,
        per: p.per,
        tag: p.tag,
        hasTag: !!p.tag,
        onPick: () => set({
          plan: p.id
        }),
        priceColor: on ? "var(--ac)" : "#F4ECDD",
        style: "display:flex;align-items:center;gap:13px;padding:14px 16px;border-radius:18px;background:" + (on ? "rgba(var(--acr),.09)" : "#221E18") + ";border:1.5px solid " + (on ? "rgba(var(--acr),.5)" : "rgba(255,255,255,.06)") + ";transition:all .18s;",
        radioStyle: "width:21px;height:21px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;border:2px solid " + (on ? "var(--ac)" : "rgba(255,255,255,.18)") + ";",
        dotStyle: "width:10px;height:10px;border-radius:50%;background:" + (on ? "var(--ac)" : "transparent") + ";",
        tagStyle: "padding:3px 8px;border-radius:7px;font-size:8.5px;font-weight:800;letter-spacing:.6px;background:rgba(var(--acr),.16);color:var(--ac);"
      };
    }),
    fineprint: acc && !active && trialD > 0 ? "Free for " + trialD + " more days, then " + selPlan.price + " " + selPlan.per + ". Cancel any time in Settings." : selPlan.price + " " + selPlan.per + ". Cancel any time in Settings.",
    cta: "Subscribe · " + selPlan.price,
    start: () => H.purchasePlan(selPlan.id),
    busy: !!UI.payBusy
  };
  o.payMsg = (() => {
    const lastPurchase = acc && (acc.purchases || []).slice(-1)[0] || null;
    const paid = "€" + Number((asub && asub.price) != null ? asub.price : lastPurchase ? lastPurchase.price : selPlan.raw).toFixed(2);
    const trialEnd = acc ? acc.trialEndsAt : 0;
    const M = {
      trialok: {
        icon: "🎉",
        iconBg: "rgba(var(--acr),.14)",
        title: "Your free month starts now",
        body: "Everything is unlocked. We'll remind you 3 days before anything is charged.",
        rows: [["Plan", selPlan.label, "#F4ECDD"], ["Free until", subDay(trialEnd), "#F4ECDD"], ["Then", selPlan.price + " " + selPlan.per, "var(--ac)"]],
        cta: "Start training",
        action: () => go(u.id ? "home" : "onb"),
        secondary: "",
        secondaryAction: () => {}
      },
      purchok: {
        icon: "✅",
        iconBg: "rgba(87,192,138,.14)",
        title: "You're all set",
        body: "Payment received. Thanks for backing an app built by lifters, for lifters.",
        rows: [["Plan", actPlan ? actPlan.label : selPlan.label, "#F4ECDD"], ["Paid", paid, "#57C08A"], ["Renews", isLife ? "Never" : subDay(asub && asub.until), "#F4ECDD"]],
        cta: "Back to training",
        action: () => {
          if (u.id) go("home");else if (acc && H.enterAccount) H.enterAccount(acc);else go("onb");
        },
        secondary: "View purchase history",
        secondaryAction: () => go("billing")
      },
      trialend: {
        icon: "⏳",
        iconBg: "rgba(242,179,61,.14)",
        title: trialD + (trialD === 1 ? " day" : " days") + " of free left",
        body: "When your month is up the app locks until you subscribe. Nothing is deleted - but you won't be able to log or view anything.",
        rows: [["Trial ends", subDay(trialEnd), "#F2B33D"], ["You'll pay", selPlan.price + " " + selPlan.per, "#F4ECDD"], ["If you don't", "App locks", "#E26A4F"]],
        cta: "Subscribe now",
        action: () => go("paywall"),
        secondary: "Remind me later",
        secondaryAction: () => go(u.id ? "home" : "welcome")
      },
      expired: {
        icon: "🔒",
        iconBg: "rgba(226,106,79,.13)",
        title: "IronLog is locked",
        body: "Your free month has ended. Your " + hist.length + " session" + (hist.length === 1 ? " is" : "s are") + " safe and waiting - subscribe to unlock the app again.",
        rows: [["Last plan", actPlan ? actPlan.label : lastPurchase ? lastPurchase.label : "Free trial", "#F4ECDD"], ["Locked since", subDay(trialEnd), "#E26A4F"], ["Your data", "Kept safe", "#57C08A"]],
        cta: "Subscribe to unlock",
        action: () => go("paywall"),
        secondary: "Export my data",
        secondaryAction: () => go("exportdata")
      }
    }[screen] || {
      icon: "",
      iconBg: "",
      title: "",
      body: "",
      rows: [],
      cta: "",
      action: () => {},
      secondary: "",
      secondaryAction: () => {}
    };
    const isPurch = screen === "purchok";
    const M2 = isPurch && isLife ? {
      ...M,
      title: "Yours. Forever.",
      body: "You backed IronLog early, so every feature we ever ship is included - no renewals, ever.",
      rows: [["Founding member", subMonthYr(acc && acc.createdAt) || "-", "#F2B33D"], ["Paid", paid, "#57C08A"], ["Renews", "Never", "#57C08A"]]
    } : M;
    return {
      icon: M2.icon,
      iconBg: M2.iconBg,
      title: M2.title,
      body: M2.body,
      cta: M2.cta,
      action: M2.action,
      isTrial: screen === "trialok",
      isCard: isPurch && !isLife,
      isLifetime: isPurch && isLife,
      isPlainIcon: !(screen === "trialok" || isPurch),
      isPurchase: isPurch,
      paidAmount: paid,
      renews: isLife ? "NEVER" : String(subDay(asub && asub.until)).toUpperCase(),
      hasBox: M2.rows.length > 0,
      hasSecondary: !!M2.secondary,
      secondary: M2.secondary,
      secondaryAction: M2.secondaryAction,
      rows: M2.rows.map((r, i) => ({
        k: r[0],
        v: r[1],
        vColor: r[2],
        style: "display:flex;justify-content:space-between;align-items:center;padding:9px 0;" + (i ? "border-top:1px solid rgba(255,255,255,.06);" : "")
      }))
    };
  })();
  const doc = SUB_DOCS[screen];
  const hq = (UI.helpQ || "").toLowerCase();
  const faqShown = FAQ_ITEMS.filter(f => !hq || f[0].toLowerCase().includes(hq) || f[1].toLowerCase().includes(hq));
  if (screen !== "delacct" && (UI.delStep || UI.delPw || UI.delConfirm)) {
    setTimeout(() => {
      if (dcScreenOf(ctx.s) !== "delacct") set({
        delStep: 0,
        delPw: "",
        delConfirm: "",
        delErr: ""
      });
    }, 0);
  }
  const delStep = UI.delStep || 0;
  const delOk = (UI.delConfirm || "").trim().toUpperCase() === "DELETE";
  const graceAt = acc && acc.deleteScheduledAt || Date.now() + 30 * 24 * 3600e3;
  const jsonBytes = (() => {
    try {
      return JSON.stringify({
        history: hist,
        weights: wts,
        gyms: gyms || [],
        programs: myProgs
      }).length;
    } catch (e) {
      return 0;
    }
  })();
  const openExport = params => {
    if (!u.id || !API) {
      if (H.pushToast) H.pushToast("📤", "Export unavailable", "No server connection.");
      return;
    }
    window.open(API + "/export/" + u.id + "?" + params, "_blank");
  };
  const impParsed = UI.impParsed || null;
  const impResult = UI.impResult || null;
  const impRange = impParsed && impParsed.sessions ? (() => {
    const ds = impParsed.sessions.map(x => x.date).sort();
    return ds[0] + " → " + ds[ds.length - 1];
  })() : "";
  o.sub = {
    title: doc ? doc.title : SUB_TITLES[screen] || SUB_TITLES[s] || "Settings",
    back: () => goBack(),
    isAcct: screen === "acct",
    isBilling: screen === "billing",
    isNotif: screen === "notifprefs",
    isDoc: !!doc,
    isDelete: screen === "delacct",
    isExport: screen === "export",
    isImport: s === "importdata",
    isReferral: screen === "referral",
    isHelp: screen === "help",
    isAbout: screen === "about",
    docMeta: doc ? "DRAFT · WRITTEN HONESTLY, NOT LAWYER-REVIEWED" : "",
    docBlocks: doc ? doc.blocks.map(b => ({
      h: b[0],
      p: b[1]
    })) : [],
    docHasContact: false,
    docContact: "",
    helpQ: UI.helpQ || "",
    onHelpQ: e => set({
      helpQ: e.target.value
    }),
    faqEmpty: faqShown.length === 0,
    faqs: faqShown.map((f, i) => {
      const open = UI.faqOpen === f[0];
      return {
        q: f[0],
        a: f[1],
        open,
        onTap: () => set({
          faqOpen: open ? null : f[0]
        }),
        chevStyle: "color:" + (open ? "var(--ac)" : "#5A5147") + ";font-size:14px;transform:rotate(" + (open ? "90deg" : "0deg") + ");transition:transform .18s;",
        style: "padding:14px 16px;background:" + (open ? "#262017" : "#221E18") + ";" + (i ? "border-top:1px solid rgba(255,255,255,.05);" : "")
      };
    }),
    emailSupport: () => flash("No support mailbox is wired up yet - the FAQ above is the whole of it"),
    credits: () => flash("3D anatomy in-house · React 19 + Express + three.js · demos from free-exercise-db"),
    name: UI.acctName != null ? UI.acctName : u.name || "",
    onName: e => set({
      acctName: e.target.value
    }),
    email: acc ? acc.email : "",
    emailReadOnly: true,
    onEmail: () => flash("Changing the account email isn't supported yet"),
    verified: !!(acc && acc.verified),
    verifyBadge: acc ? acc.verified ? "✓ VERIFIED" : "UNVERIFIED" : "",
    resendVerify: async () => {
      const d = await api("POST", "/auth/resend-verify");
      if (d && d.devVerifyCode) {
        H.goVerify(d.devVerifyCode);
        return;
      }
      if (d && d.account) {
        H.setAccount(d.account);
        flash("Verification email sent");
      }
    },
    colors: USER_COLORS.map(c => ({
      hex: c,
      border: u.color === c ? "#F4ECDD" : "transparent",
      onPick: () => H.updateUser({
        color: c
      })
    })),
    onPhoto: ev => {
      const f = ev.target.files && ev.target.files[0];
      if (!f) return;
      H.photoFile(f);
      ev.target.value = "";
    },
    removePhoto: () => {
      H.removePhoto();
      flash("Photo removed");
    },
    changePw: () => go("forgot"),
    pw: {
      cur: UI.pwCur || "",
      next: UI.pwNext || "",
      onCur: e => set({
        pwCur: e.target.value,
        pwMsg: null
      }),
      onNext: e => set({
        pwNext: e.target.value,
        pwMsg: null
      }),
      msg: UI.pwMsg ? UI.pwMsg.text : "",
      msgColor: UI.pwMsg ? UI.pwMsg.ok ? "#57C08A" : "#E26A4F" : "#8E8475",
      submit: async () => {
        const d = await api("POST", "/auth/change-password", {
          current: UI.pwCur || "",
          next: UI.pwNext || ""
        });
        if (!d || d.error) {
          set({
            pwMsg: {
              ok: false,
              text: d && d.error || "Server unreachable"
            }
          });
          return;
        }
        set({
          pwCur: "",
          pwNext: "",
          pwMsg: {
            ok: true,
            text: "Password changed ✓"
          }
        });
      }
    },
    save: () => {
      const nm = (UI.acctName != null ? UI.acctName : u.name || "").trim();
      if (!nm) {
        flash("Enter a name");
        return;
      }
      if (nm !== u.name) H.updateUser({
        name: nm
      });
      set({
        acctName: null
      });
      flash("Account updated");
      go("settings");
    },
    billRows: [["Status", !acc ? "Household profile - free" : active ? asub && asub.mock ? "Active (demo billing)" : "Active" : locked ? "Locked" : "Free trial"], ["Plan", actPlan ? actPlan.label : "None"], ["Price", actPlan ? actPlan.price + " " + actPlan.per : "-"], ["Next charge", !acc ? "Never" : isLife ? "Never" : asub && asub.until ? subDayLong(asub.until) : acc.trialEndsAt ? "Trial ends " + subDay(acc.trialEndsAt) : "-"], ["Payment", asub && asub.mock ? "Demo - no card charged" : acc ? "None on file" : "-"]].map((r, i) => ({
      k: r[0],
      v: r[1],
      style: "display:flex;justify-content:space-between;align-items:center;padding:14px 16px;background:#221E18;" + (i ? "border-top:1px solid rgba(255,255,255,.05);" : "")
    })),
    purchases: (acc ? acc.purchases || [] : []).slice().reverse().map((p, i) => ({
      label: p.label,
      mock: !!p.mock,
      value: "€" + Number(p.price).toFixed(2) + " · " + subDayShort(p.at),
      style: "display:flex;justify-content:space-between;align-items:center;padding:14px 16px;background:#221E18;" + (i ? "border-top:1px solid rgba(255,255,255,.05);" : "")
    })),
    manage: () => flash("Billing is demo-only for now - no card is ever charged"),
    restore: () => H.restorePurchases(),
    changePlan: () => go("paywall"),
    cancel: () => flash("Cancelling isn't wired up yet - demo billing, nothing renews"),
    notifs: SUB_NOTIFS.map(n => {
      const on = notifOn(n.id);
      return {
        icon: n.icon,
        label: n.label,
        sub: n.sub,
        onToggle: () => H.saveNotifPrefs({
          ...np,
          [n.id]: !on
        }),
        trackStyle: "width:44px;height:26px;border-radius:13px;flex-shrink:0;padding:3px;display:flex;transition:background .2s;background:" + (on ? "var(--ac)" : "rgba(255,255,255,.1)") + ";justify-content:" + (on ? "flex-end" : "flex-start") + ";",
        knobStyle: "width:20px;height:20px;border-radius:50%;background:" + (on ? "var(--ink)" : "#8E8475") + ";transition:all .2s;"
      };
    }),
    delRows: [{
      t: hist.length + " logged session" + (hist.length === 1 ? "" : "s")
    }, {
      t: setCount + " logged sets and every personal record"
    }, {
      t: myProgs.length + " program" + (myProgs.length === 1 ? "" : "s") + " and all custom workouts"
    }, {
      t: wts.length + " body-weight " + (wts.length === 1 ? "entry" : "entries")
    }],
    delSummary: "Still want to delete? This removes " + hist.length + " session" + (hist.length === 1 ? "" : "s") + ", " + setCount + " set" + (setCount === 1 ? "" : "s") + " and " + myProgs.length + " program" + (myProgs.length === 1 ? "" : "s") + ".",
    delGraceDate: subDayLong(graceAt),
    delGraceDateShort: subDay(graceAt).toUpperCase(),
    delConfirm: UI.delConfirm || "",
    onDelConfirm: e => set({
      delConfirm: e.target.value
    }),
    delBtnBg: delOk ? "#C4442A" : "rgba(226,106,79,.12)",
    delBtnFg: delOk ? "#fff" : "rgba(226,106,79,.45)",
    delStep1: delStep === 0 && !(acc && acc.deleteScheduledAt),
    delStep2: delStep === 1 && !(acc && acc.deleteScheduledAt),
    delStep3: delStep === 2 && !(acc && acc.deleteScheduledAt),
    delDots: [0, 1, 2].map(k => ({
      style: "flex:1;height:3px;border-radius:3px;background:" + (acc && acc.deleteScheduledAt || k <= delStep ? "#E26A4F" : "rgba(255,255,255,.1)") + ";"
    })),
    delAlts: (() => {
      const cheapest = SUB_PLAN_ORDER.map(subPlanOf).filter(p => p.months).reduce((a, p) => a && a.raw / a.months <= p.raw / p.months ? a : p, null);
      const alts = [{
        icon: "💸",
        title: "Too expensive?",
        sub: "See cheaper plans - from €" + (cheapest ? (cheapest.raw / cheapest.months).toFixed(2) : "1.67") + " a month",
        onTap: () => go("paywall")
      }, {
        icon: "🔕",
        title: "Too many notifications?",
        sub: "Turn them all off in one tap",
        onTap: () => {
          H.saveNotifPrefs({
            ...np,
            enabled: false
          });
          flash("Notifications off");
        }
      }];
      if (acc && acc.canPause) alts.push({
        icon: "⏸️",
        title: "Taking a break?",
        sub: "Pause your account for 3 months - free, once",
        onTap: () => H.pauseAccount()
      });else if (acc && acc.pausedUntil) alts.push({
        icon: "⏸️",
        title: "Already paused",
        sub: "Your one pause is used - open until " + subDay(acc.trialEndsAt),
        onTap: () => flash("Pause already used on this account")
      });
      alts.push({
        icon: "💬",
        title: "Something broken?",
        sub: "Check the FAQ - it covers most of it",
        onTap: () => go("help")
      });
      return alts;
    })(),
    delNext: () => {
      if (delStep === 1 && !delOk) {
        flash("Type DELETE to confirm");
        return;
      }
      set({
        delStep: delStep + 1
      });
    },
    delBack: () => set({
      delStep: Math.max(0, delStep - 1)
    }),
    delPw: UI.delPw || "",
    onDelPw: e => set({
      delPw: e.target.value,
      delErr: ""
    }),
    delErr: UI.delErr || "",
    delFinalBg: (UI.delPw || "").length >= 4 ? "#C4442A" : "rgba(226,106,79,.12)",
    delFinalFg: (UI.delPw || "").length >= 4 ? "#fff" : "rgba(226,106,79,.45)",
    hasFaceId: false,
    faceId: () => flash("Face ID isn't wired up yet - use your password"),
    doDelete: async () => {
      if ((UI.delPw || "").length < 4) {
        flash("Enter your password to confirm");
        return;
      }
      const d = await api("POST", "/auth/delete-account", {
        password: UI.delPw
      });
      if (!d || d.error) {
        set({
          delErr: d && d.error || "Server unreachable"
        });
        return;
      }
      H.setAccount(d.account);
      set({
        delStep: 0,
        delPw: "",
        delConfirm: "",
        delErr: ""
      });
      if (H.pushToast) H.pushToast("⏳", "Deletion scheduled", "Everything is removed on " + subDayLong(d.account.deleteScheduledAt) + " - sign in before then to cancel.");
    },
    delScheduled: !!(acc && acc.deleteScheduledAt),
    delScheduledDate: subDayLong(acc && acc.deleteScheduledAt),
    cancelDelete: async () => {
      const d = await api("POST", "/auth/cancel-delete");
      if (d && d.account) {
        H.setAccount(d.account);
        set({
          delStep: 0
        });
        if (H.pushToast) H.pushToast("💚", "Deletion cancelled", "Your account is staying.");
      }
    },
    exportFirst: () => go("exportdata"),
    exportFmts: [{
      icon: "📦",
      label: "Everything (JSON)",
      sub: "History, weights, gyms, programs - full fidelity",
      size: subSize(jsonBytes),
      params: "format=json"
    }, {
      icon: "📊",
      label: "Workouts (CSV)",
      sub: "Every set as a spreadsheet row",
      size: subSize(setCount * 72 + 64),
      params: "format=csv&what=workouts"
    }, {
      icon: "⚖️",
      label: "Body weight (CSV)",
      sub: "Dated weigh-ins",
      size: subSize(wts.length * 24 + 16),
      params: "format=csv&what=weights"
    }].map(f => ({
      ...f,
      onPick: () => openExport(f.params)
    })),
    imp: {
      hint: "Hevy CSV · Strong CSV · IronLog JSON",
      onFile: ev => {
        const f = ev.target.files && ev.target.files[0];
        if (!f) return;
        const rd = new FileReader();
        rd.onload = () => set({
          impParsed: parseImportFile(f.name, String(rd.result || "")),
          impResult: null
        });
        rd.readAsText(f);
        ev.target.value = "";
      },
      hasError: !!(impParsed && impParsed.error),
      error: impParsed && impParsed.error || "",
      hasPreview: !!(impParsed && impParsed.sessions && !impResult),
      rows: (impParsed && impParsed.sessions ? [["Source", impParsed.format], ["Sessions", String(impParsed.sessions.length)], ["Sets", String(impParsed.sessions.reduce((a, x) => a + x.sets.length, 0))], ["Dates", impRange]] : []).map((r, i) => ({
        k: r[0],
        v: r[1],
        style: "display:flex;justify-content:space-between;align-items:center;padding:14px 16px;background:#221E18;" + (i ? "border-top:1px solid rgba(255,255,255,.05);" : "")
      })),
      busy: !!UI.impBusy,
      cta: UI.impBusy ? "Importing…" : "Import " + (impParsed && impParsed.sessions ? impParsed.sessions.length : 0) + " sessions",
      doImport: async () => {
        if (!impParsed || !impParsed.sessions || !u.id) return;
        set({
          impBusy: true
        });
        const existing = new Set((hist || []).map(h => h.date + "|" + h.workoutName + "|" + (h.sets || []).length));
        const fresh = impParsed.sessions.filter(x => !existing.has(x.date + "|" + x.workoutName + "|" + x.sets.length));
        const dupes = impParsed.sessions.length - fresh.length;
        const d = fresh.length ? await api("POST", "/history/bulk", {
          userId: u.id,
          entries: fresh
        }) : {
          ok: true,
          imported: 0,
          skipped: 0
        };
        if (!d || d.error) {
          set({
            impBusy: false,
            impResult: {
              error: d && d.error === "locked" ? d.message : d && d.error || "Server unreachable"
            }
          });
          return;
        }
        set({
          impBusy: false,
          impResult: {
            imported: d.imported,
            skipped: (d.skipped || 0) + dupes
          }
        });
        if (d.imported && H.importedSessions) H.importedSessions(fresh);
      },
      hasResult: !!impResult,
      resultError: impResult && impResult.error || "",
      resultTitle: impResult && !impResult.error ? impResult.imported + " session" + (impResult.imported === 1 ? "" : "s") + " imported" : "",
      resultSub: impResult && !impResult.error && impResult.skipped > 0 ? impResult.skipped + " skipped (already logged)" : ""
    },
    refCode: acc && acc.referralCode || (u.name || "USER").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 10) + "30",
    refLink: "https://ironlog.app/r/" + (acc && acc.referralCode || (u.name || "USER").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 10) + "30"),
    copyCode: () => {
      const code = acc && acc.referralCode || (u.name || "USER").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 10) + "30";
      try {
        navigator.clipboard.writeText(code).catch(() => {});
      } catch (e) {}
      flash("Code copied");
    },
    share: () => {
      const code = acc && acc.referralCode || (u.name || "USER").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 10) + "30";
      const link = "https://ironlog.app/r/" + code;
      try {
        if (navigator.share) {
          navigator.share({
            title: "IronLog",
            text: "Train with me on IronLog - use my code for a free month:",
            url: link
          }).catch(() => {});
          return;
        }
        navigator.clipboard.writeText(link).catch(() => {});
      } catch (e) {}
      flash("Invite link copied");
    },
    refInvited: String(acc ? acc.invited || 0 : 0),
    refEarned: String(acc ? acc.earnedMonths || 0 : 0),
    refNote: acc ? "A friend enters your code at sign-up: they get an extra free month, you earn one on your plan." : "Referral codes work with email accounts - create one to get a working code."
  };
  return o;
}
const dcTint = c => (c || "#F2B33D") + "24";
const dcRing = c => (c || "#F2B33D") + "77";
function buildAuth(ctx) {
  const {
    ui = {},
    setUi = () => {},
    go = () => {},
    on = {}
  } = ctx;
  const screen = dcScreenOf(ctx.s);
  const isSignup = screen === "signup",
    isSignin = screen === "signin";
  const email = ui.authEmail || "";
  const pw = ui.authPw || "";
  const pw2 = ui.authPw2 || "";
  const code = ui.authCode || "";
  const validate = () => {
    const e = email.trim();
    if (isSignup && !(ui.authName || "").trim()) return "Enter your name";
    if (!e || e.indexOf("@") < 1 || e.indexOf(".") < 3) return "Enter a valid email address";
    if (pw.length < 6) return "Password must be at least 6 characters";
    return "";
  };
  const run = async fn => {
    if (ui.authBusy) return null;
    setUi({
      authBusy: true,
      authErr: ""
    });
    let res = null;
    try {
      res = await fn();
    } catch (err) {
      res = {
        error: "Can't reach the server"
      };
    }
    setUi({
      authBusy: false
    });
    return res || {
      error: "Can't reach the server"
    };
  };
  const msg = {
    forgot: {
      icon: "🔑",
      title: "Forgot your password?",
      body: "Enter the email you signed up with and we'll send you a reset link.",
      cta: "Send reset link",
      hasEmail: true,
      hasPw: false,
      hasCode: false,
      resend: false,
      action: async () => {
        if (!email.includes("@")) {
          setUi({
            authErr: "Enter a valid email"
          });
          return;
        }
        const d = await run(() => on.authForgot({
          email: email.trim()
        }));
        if (!d || d.error) {
          setUi({
            authErr: d && d.error || "Can't reach the server"
          });
          return;
        }
        setUi({
          authResetCode: d.devResetCode || null,
          authCode: "",
          authPw: "",
          authPw2: ""
        });
        go(realScreenOf("reset"));
        if (on.flash) on.flash("Reset code sent");
      }
    },
    reset: {
      icon: "🔒",
      title: "Set a new password",
      body: "Pick something you'll remember. At least 6 characters.",
      cta: "Save new password",
      hasEmail: false,
      hasPw: true,
      hasCode: true,
      resend: false,
      action: async () => {
        if (pw.length < 6) {
          if (on.flash) on.flash("Password too short");
          return;
        }
        if (pw !== pw2) {
          if (on.flash) on.flash("Passwords don't match");
          return;
        }
        const d = await run(() => on.authReset({
          email: email.trim(),
          code,
          password: pw
        }));
        if (!d || d.error) {
          setUi({
            authErr: d && d.error || "Can't reach the server"
          });
          return;
        }
        setUi({
          authPw: "",
          authPw2: "",
          authCode: "",
          authResetCode: null
        });
        go(realScreenOf("signin"));
        if (on.flash) on.flash("Password updated - log in");
      }
    },
    verify: {
      icon: "📬",
      title: "Check your inbox",
      body: "We sent a verification link to " + (email || "you@email.com") + ". Tap it to activate your account.",
      cta: "I've verified - continue",
      hasEmail: false,
      hasPw: false,
      hasCode: true,
      resend: true,
      action: async () => {
        const d = await run(() => on.authVerify({
          code
        }));
        if (!d || d.error) {
          setUi({
            authErr: d && d.error || "Can't reach the server"
          });
          return;
        }
        setUi({
          authCode: ""
        });
      }
    }
  }[screen] || {
    icon: "",
    title: "",
    body: "",
    cta: "",
    hasEmail: false,
    hasPw: false,
    hasCode: false,
    resend: false,
    action: () => {}
  };
  return {
    valueProps: [{
      icon: "📊",
      text: "Every set, rep and PR in one place"
    }, {
      icon: "🧍",
      text: "3D muscle recovery you can actually read"
    }, {
      icon: "🏋️",
      text: "Per-gym weights - machines never match"
    }, {
      icon: "🔥",
      text: "Streaks and head-to-head with your friends"
    }],
    toWelcome: () => go(realScreenOf("welcome")),
    toSignup: () => {
      setUi({
        authErr: ""
      });
      go(realScreenOf("signup"));
    },
    toSignin: () => {
      setUi({
        authErr: ""
      });
      go(realScreenOf("signin"));
    },
    toForgot: () => {
      setUi({
        authErr: ""
      });
      go(realScreenOf("forgot"));
    },
    toPinLogin: () => go(realScreenOf("login")),
    back: () => {
      setUi({
        authErr: ""
      });
      go(realScreenOf(screen === "reset" ? "forgot" : screen === "forgot" ? "signin" : "welcome"));
    },
    isSignup,
    isSignin,
    formTitle: isSignup ? "Create your account" : "Welcome back",
    formSub: isSignup ? "One month free. No card needed to start." : "Log in to pick up where you left off.",
    name: ui.authName || "",
    onName: e => setUi({
      authName: e.target.value
    }),
    email,
    onEmail: e => setUi({
      authEmail: e.target.value,
      authErr: ""
    }),
    emailBorder: ui.authErr && ui.authErr.includes("email") ? "rgba(226,106,79,.5)" : "rgba(255,255,255,.09)",
    pw,
    onPw: e => setUi({
      authPw: e.target.value,
      authErr: ""
    }),
    pw2,
    onPw2: e => setUi({
      authPw2: e.target.value
    }),
    err: !!ui.authErr,
    errText: ui.authErr || "",
    submitLabel: isSignup ? "Create account" : "Log in",
    submit: async () => {
      const err = validate();
      if (err) {
        setUi({
          authErr: err
        });
        return;
      }
      const d = await run(() => on.authSubmit({
        mode: isSignup ? "signup" : "signin",
        email: email.trim(),
        password: pw,
        referralCode: (ui.authRef || "").trim()
      }));
      if (d && d.error) {
        setUi({
          authErr: d.error
        });
        return;
      }
      setUi({
        authPw: "",
        authPw2: ""
      });
    },
    swapLabel: isSignup ? "Already have an account?" : "New to IronLog?",
    swapCta: isSignup ? "Log in" : "Create one",
    swap: () => {
      setUi({
        authErr: ""
      });
      go(realScreenOf(isSignup ? "signin" : "signup"));
    },
    ssoApple: () => on.pushToast && on.pushToast("🔌", "Not connected yet", "Apple & Google sign-in need real developer accounts - use email for now."),
    ssoGoogle: () => on.pushToast && on.pushToast("🔌", "Not connected yet", "Apple & Google sign-in need real developer accounts - use email for now."),
    msgIcon: msg.icon,
    msgTitle: msg.title,
    msgBody: msg.body,
    msgCta: msg.cta,
    msgAction: msg.action,
    msgHasEmail: msg.hasEmail,
    msgHasPw: msg.hasPw,
    msgHasResend: msg.resend,
    resend: async () => {
      await run(() => on.authResend({
        email: email.trim()
      }));
      if (on.flash) on.flash("Verification email resent");
    },
    msgHasCode: msg.hasCode,
    code,
    onCode: e => setUi({
      authCode: e.target.value.replace(/\D/g, ""),
      authErr: ""
    }),
    devCode: (screen === "reset" ? ui.authResetCode : ui.authVerifyCode) || null,
    ref: ui.authRef || "",
    onRef: e => setUi({
      authRef: e.target.value.toUpperCase()
    }),
    busy: !!ui.authBusy
  };
}
const ONB_GOALS_LBL = {
  strength: "Get stronger 🏋️",
  size: "Build muscle 💪",
  cali: "Calisthenics 🤸",
  general: "Stay in shape ⚡"
};
const ONB_LEVELS_LBL = {
  new: "Just starting 🌱",
  inter: "Intermediate 🔥",
  adv: "Advanced 🏆"
};
function buildOnb(ctx) {
  const {
    users = [],
    ui = {},
    setUi = () => {},
    go = () => {},
    on = {}
  } = ctx;
  const STEPS = [{
    icon: "👋",
    title: "Welcome to IronLog",
    body: "A logger for people who lift - no AI coach telling you what to do, just your numbers, kept honestly.",
    cta: "Show me",
    skip: "Skip tour"
  }, {
    icon: "🧍",
    title: "See what's recovered",
    body: "Every set you log paints your 3D body map. Sore muscles glow red, rested ones green - so you always know what to train.",
    cta: "Next",
    skip: "Skip tour"
  }, {
    icon: "🏋️",
    title: "One profile, many gyms",
    body: "The bench at your gym isn't the bench at your mate's. IronLog keeps separate weights per gym and reminds you what you lifted where.",
    cta: "Next",
    skip: "Skip tour"
  }, {
    icon: "🙋",
    title: "Set up your profile",
    body: "How should we show you in stats and on the leaderboard?",
    cta: "Continue",
    skip: "",
    name: true
  }, {
    icon: "🎯",
    title: "What are you training for?",
    body: "Optional - it just changes which programs we suggest first.",
    cta: "Continue",
    skip: "Skip this",
    opts: "goal"
  }, {
    icon: "📈",
    title: "How long have you been lifting?",
    body: "Optional - helps us pick sensible starting weights.",
    cta: "Continue",
    skip: "Skip this",
    opts: "level"
  }, {
    icon: "📍",
    title: "Add your first gym",
    body: "You can add more later. Every gym keeps its own weights.",
    cta: "Continue",
    skip: "I'll do this later",
    gym: true
  }, {
    icon: "🔔",
    title: "Want a nudge when it counts?",
    body: "Rest timers, streak reminders and a ping when a friend starts training. You can change any of this later.",
    cta: "Enable notifications",
    skip: "Not now",
    last: true
  }];
  const i = Math.max(0, Math.min(ui.onbStep || 0, STEPS.length - 1)),
    st = STEPS[i];
  const GOALS = [{
    id: "strength",
    icon: "🏋️",
    label: "Get stronger",
    sub: "Heavy compounds, low reps"
  }, {
    id: "size",
    icon: "💪",
    label: "Build muscle",
    sub: "Volume and hypertrophy work"
  }, {
    id: "cali",
    icon: "🤸",
    label: "Calisthenics",
    sub: "Bodyweight skills and control"
  }, {
    id: "general",
    icon: "⚡",
    label: "Stay in shape",
    sub: "Balanced, sustainable training"
  }];
  const LEVELS = [{
    id: "new",
    icon: "🌱",
    label: "Just starting",
    sub: "Under 6 months"
  }, {
    id: "inter",
    icon: "🔥",
    label: "Intermediate",
    sub: "6 months - 3 years"
  }, {
    id: "adv",
    icon: "🏆",
    label: "Advanced",
    sub: "3+ years, know my numbers"
  }];
  const opts = st.opts === "goal" ? GOALS : st.opts === "level" ? LEVELS : [];
  const selId = st.opts === "goal" ? ui.onbGoal : ui.onbLevel;
  const nameNow = (ui.authName || "").trim();
  const colorNow = ui.onbColor || USER_COLORS[0];
  const finish = wantNotifs => {
    if (!on.completeOnboarding) return;
    on.completeOnboarding({
      user: {
        id: uid(),
        name: nameNow,
        av: nameNow.slice(0, 2),
        pin: null,
        color: colorNow
      },
      goal: ui.onbGoal ? GOALS.find(g => g.id === ui.onbGoal).icon + " " + GOALS.find(g => g.id === ui.onbGoal).label : null,
      experience: ui.onbLevel ? LEVELS.find(l => l.id === ui.onbLevel).icon + " " + LEVELS.find(l => l.id === ui.onbLevel).label : null,
      gym: (ui.onbGym || "").trim() || null,
      wantNotifs
    });
  };
  const next = () => {
    if (st.name) {
      if (!nameNow) {
        if (on.flash) on.flash("Enter your name");
        return;
      }
      if (users.find(u => (u.name || "").toLowerCase() === nameNow.toLowerCase())) {
        if (on.flash) on.flash("That name is taken on this device");
        return;
      }
    }
    if (i >= STEPS.length - 1) {
      finish(true);
      return;
    }
    setUi({
      onbStep: i + 1
    });
  };
  const bubbleThem = "align-self:flex-start;max-width:82%;padding:12px 15px;border-radius:19px 19px 19px 5px;background:#221E18;border:1px solid rgba(255,255,255,.06);font-size:12.5px;line-height:1.5;font-weight:600;color:#F4ECDD;";
  const bubbleMe = "align-self:flex-end;max-width:76%;padding:11px 15px;border-radius:19px 19px 5px 19px;background:linear-gradient(135deg,var(--acl),var(--acd));font-size:12.5px;font-weight:800;color:var(--ink);";
  const ANSWERS = {
    0: "Let's do it 👋",
    1: "Nice - show me",
    2: "Makes sense",
    3: nameNow,
    4: ONB_GOALS_LBL[ui.onbGoal],
    5: ONB_LEVELS_LBL[ui.onbLevel],
    6: (ui.onbGym || "").trim()
  };
  const thread = [];
  for (let k = Math.max(0, i - 2); k < i; k++) {
    thread.push({
      text: STEPS[k].title,
      style: bubbleThem
    });
    if (ANSWERS[k]) thread.push({
      text: ANSWERS[k],
      style: bubbleMe
    });
  }
  return {
    stepNum: String(i + 1),
    thread,
    dots: STEPS.map((_, k) => ({
      style: "flex:1;height:3px;border-radius:3px;background:" + (k <= i ? "var(--ac)" : "rgba(255,255,255,.1)") + ";transition:background .3s;"
    })),
    back: () => {
      if (i === 0) go(realScreenOf("welcome"));else setUi({
        onbStep: i - 1
      });
    },
    skipLabel: i >= STEPS.length - 1 ? "" : "Skip",
    skip: () => {
      if (i >= STEPS.length - 1) finish(false);else setUi({
        onbStep: i + 1
      });
    },
    icon: st.icon,
    title: st.title,
    body: st.body,
    cta: st.cta,
    next,
    hasSecondary: !!st.skip,
    secondary: st.skip,
    hasName: !!st.name,
    name: ui.authName || "",
    onName: e => setUi({
      authName: e.target.value
    }),
    colors: USER_COLORS.map(c => ({
      hex: c,
      border: colorNow === c ? "#F4ECDD" : "transparent",
      onPick: () => setUi({
        onbColor: c
      })
    })),
    units: [{
      id: "kg",
      label: "kg"
    }, {
      id: "lb",
      label: "lb"
    }].map(u => ({
      label: u.label,
      onPick: () => {
        if (u.id === "lb") {
          if (on.flash) on.flash("lb is coming soon - kg for now");
          return;
        }
        setUi({
          onbUnits: u.id
        });
      },
      style: "flex:1;text-align:center;padding:9px 0;border-radius:11px;font-size:13px;font-weight:800;" + ((ui.onbUnits || "kg") === u.id ? "background:linear-gradient(135deg,var(--acl),var(--acd));color:var(--ink);" : "color:#8E8475;")
    })),
    hasOptions: opts.length > 0,
    options: opts.map(op => ({
      icon: op.icon,
      label: op.label,
      sub: op.sub,
      onPick: () => st.opts === "goal" ? setUi({
        onbGoal: op.id
      }) : setUi({
        onbLevel: op.id
      }),
      style: "display:flex;align-items:center;gap:13px;padding:15px 16px;border-radius:18px;background:" + (selId === op.id ? "rgba(var(--acr),.1)" : "#221E18") + ";border:1.5px solid " + (selId === op.id ? "rgba(var(--acr),.45)" : "rgba(255,255,255,.06)") + ";transition:all .18s;",
      checkStyle: "width:22px;height:22px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;flex-shrink:0;background:" + (selId === op.id ? "var(--ac)" : "rgba(255,255,255,.05)") + ";color:" + (selId === op.id ? "var(--ink)" : "transparent") + ";"
    })),
    hasGym: !!st.gym,
    gymName: ui.onbGym || "",
    onGym: e => setUi({
      onbGym: e.target.value
    })
  };
}
function buildLogin(ctx) {
  const {
    users = [],
    ui = {},
    setUi = () => {},
    go = () => {},
    on = {}
  } = ctx;
  const sel = users.find(x => x.id === ui.loginSel) || null;
  const create = () => {
    const nm = (ui.newName || "").trim();
    if (!nm) {
      setUi({
        addErr: "Enter a name"
      });
      return;
    }
    if (users.find(u => (u.name || "").toLowerCase() === nm.toLowerCase())) {
      setUi({
        addErr: "Name already taken"
      });
      return;
    }
    const nu = {
      id: uid(),
      name: nm,
      av: (ui.newAv || "").trim() || nm.slice(0, 2),
      pin: (ui.newPin || "").trim() || null,
      color: ui.newColor || USER_COLORS[0]
    };
    on.addUser(nu);
    setUi({
      addUserOpen: false,
      newName: "",
      newAv: "",
      newPin: "",
      addErr: "",
      loginSel: nu.id
    });
    if (on.flash) on.flash(nm + " created");
  };
  return {
    users: users.map(usr => ({
      name: usr.name,
      av: usr.av,
      color: usr.color,
      tint: dcTint(usr.color),
      ring: ui.loginSel === usr.id ? usr.color : dcRing(usr.color),
      badge: usr.pin ? "🔒 PIN" : "open",
      badgeBg: usr.pin ? "rgba(var(--acr),.16)" : "rgba(255,255,255,.05)",
      badgeFg: usr.pin ? "var(--ac)" : "#8E8475",
      cardStyle: "padding:16px 8px 13px;border-radius:18px;display:flex;flex-direction:column;align-items:center;gap:9px;background:" + (ui.loginSel === usr.id ? "#262017" : "#1E1A14") + ";border:2px solid " + (ui.loginSel === usr.id ? usr.color + "88" : "rgba(255,255,255,.06)") + ";box-shadow:inset 0 1px 0 rgba(255,255,255,.05)" + (ui.loginSel === usr.id ? ",0 10px 26px " + usr.color + "22" : "") + ";transition:all .2s;transform:scale(" + (ui.loginSel === usr.id ? "1.04" : "1") + ")",
      onPick: () => setUi({
        loginSel: usr.id,
        loginPin: "",
        loginErr: false,
        addUserOpen: false
      })
    })),
    hasSel: !!sel,
    selName: sel ? sel.name : "",
    showPin: !!(sel && sel.pin),
    pin: ui.loginPin || "",
    pinPlaceholder: sel ? "PIN for " + sel.name : "",
    pinBorder: ui.loginErr ? "#E26A4F" : "rgba(255,255,255,.1)",
    err: !!ui.loginErr,
    errText: "Wrong PIN ✗",
    onPin: e => setUi({
      loginPin: e.target.value,
      loginErr: false
    }),
    enter: () => {
      if (!sel) return;
      if (sel.pin && sel.pin !== (ui.loginPin || "")) {
        setUi({
          loginErr: true
        });
        return;
      }
      setUi({
        loginSel: null,
        loginPin: "",
        loginErr: false
      });
      on.login(sel);
    },
    addOpen: !!ui.addUserOpen,
    toggleAdd: () => setUi({
      addUserOpen: !ui.addUserOpen,
      loginSel: null,
      addErr: ""
    }),
    addIcon: ui.addUserOpen ? "✕" : "＋",
    addLabel: ui.addUserOpen ? "Cancel" : "Add user",
    addBtnBg: ui.addUserOpen ? "rgba(var(--acr),.1)" : "rgba(255,255,255,.04)",
    addBtnBorder: ui.addUserOpen ? "rgba(var(--acr),.3)" : "rgba(255,255,255,.08)",
    addBtnFg: ui.addUserOpen ? "var(--ac)" : "#8E8475",
    newName: ui.newName || "",
    onNewName: e => setUi({
      newName: e.target.value,
      newAv: e.target.value.slice(0, 2),
      addErr: ""
    }),
    colors: USER_COLORS.map(c => ({
      hex: c,
      border: (ui.newColor || USER_COLORS[0]) === c ? "#F4ECDD" : "transparent",
      onPick: () => setUi({
        newColor: c
      })
    })),
    create,
    newAv: ui.newAv || "",
    onNewAv: e => setUi({
      newAv: e.target.value.slice(0, 3)
    }),
    newPin: ui.newPin || "",
    onNewPin: e => setUi({
      newPin: e.target.value
    }),
    addErr: ui.addErr || "",
    hasAddErr: !!ui.addErr,
    hasEmailAuth: true,
    emailAuth: () => go(realScreenOf("welcome"))
  };
}
function socialStatsFor(userId, allHistory) {
  const hist = (allHistory || {})[userId] || [];
  const streak = calcStreak(hist);
  const wkCut = Date.now() - 7 * 86400000;
  const week = hist.reduce((n, h) => new Date(h.date + "T12:00:00").getTime() >= wkCut ? n + (h.vol || 0) : n, 0);
  let bestKg = 0,
    bestEx = "";
  hist.forEach(h => (h.sets || []).forEach(s => {
    const kg = num(s.kg),
      reps = num(s.reps);
    if (kg > 0 && reps >= 1) {
      const e = kg * (1 + reps / 30);
      if (e > bestKg) {
        bestKg = e;
        bestEx = s.ex;
      }
    }
  }));
  return {
    streak,
    sessions: hist.length,
    week: week >= 1000 ? (week / 1000).toFixed(1) + "k" : String(Math.round(week)),
    pr: bestEx ? bestEx + " " + Math.round(bestKg) + " kg" : "—"
  };
}
function buildInbox(ctx) {
  const {
    user,
    users = [],
    allHistory = {},
    allMessages = [],
    mySubs = [],
    sessions = {},
    ui = {},
    setUi = () => {},
    on = {}
  } = ctx;
  const meId = user ? user.id : null;
  const byId = id => users.find(u => u.id === id) || null;
  const sq = (ui.socialQ || "").toLowerCase();
  const people = users.filter(u => u.id !== meId && (!sq || (u.name || "").toLowerCase().includes(sq)));
  const social = {
    q: ui.socialQ || "",
    onQ: ev => setUi({
      socialQ: ev.target.value
    }),
    people: people.map(u => {
      const st = socialStatsFor(u.id, allHistory);
      const on_ = mySubs.includes(u.id);
      const ss = sessions[u.id];
      const live = !!(ss && ss.workout);
      return {
        name: u.name,
        av: u.av,
        color: u.color,
        tint: dcTint(u.color),
        ring: dcRing(u.color),
        streak: String(st.streak),
        week: st.week,
        sessions: String(st.sessions),
        pr: st.pr,
        live,
        liveWorkout: live ? ss.workout.name || "" : "",
        subLabel: on_ ? "🔔 Subscribed" : "🔕 Subscribe",
        subOn: on_,
        subStyle: on_ ? "padding:8px 13px;border-radius:11px;background:rgba(var(--acr),.15);border:1px solid rgba(var(--acr),.4);color:var(--ac);font-size:11.5px;font-weight:800;" : "padding:8px 13px;border-radius:11px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);color:#8E8475;font-size:11.5px;font-weight:800;",
        onSub: () => {
          const nv = !on_;
          on.toggleSub(u.id);
          if (on.flash) on.flash(nv ? "You'll get a ping when " + u.name + " trains" : "Unsubscribed from " + u.name);
        },
        onMsg: () => setUi({
          openThread: u.id,
          composeOpen: false,
          draft: ""
        })
      };
    }),
    empty: people.length === 0
  };
  const tsOf = m => Date.parse(m.time) || 0;
  const dayOf = m => new Date(m.time).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short"
  });
  const clockOf = m => new Date(m.time).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit"
  });
  const folder = ui.mailFolder === "sent" ? "sent" : "inbox";
  const inboxMsgs = allMessages.filter(m => m.to === meId);
  const sentMsgs = allMessages.filter(m => m.from === meId);
  const listMsgs = (folder === "sent" ? sentMsgs : inboxMsgs).slice().sort((a, b) => tsOf(b) - tsOf(a));
  const unreadN = inboxMsgs.filter(m => !m.read).length;
  const openThread = ui.openThread || null;
  const other = openThread ? byId(openThread) : null;
  const openFn = otherId => () => {
    inboxMsgs.filter(m => m.from === otherId && !m.read).forEach(m => on.readMsg(m.id));
    setUi({
      openThread: otherId,
      composeOpen: false,
      draft: ""
    });
  };
  const inbox = {
    hasList: !openThread,
    hasThread: !!openThread,
    composeOpen: !!ui.composeOpen,
    toggleCompose: () => setUi({
      composeOpen: !ui.composeOpen
    }),
    people: users.filter(u => u.id !== meId).map(u => ({
      name: u.name,
      av: u.av,
      color: u.color,
      tint: dcTint(u.color),
      ring: dcRing(u.color),
      open: openFn(u.id)
    })),
    msgs: listMsgs.map((m, i) => {
      const partner = byId(folder === "sent" ? m.to : m.from);
      const un = folder === "inbox" && !m.read;
      return {
        from: (folder === "sent" ? "To: " : "") + (partner && partner.name || "Unknown"),
        av: partner && partner.av || "??",
        color: partner && partner.color || "#A99E8C",
        tint: dcTint(partner && partner.color),
        ring: dcRing(partner && partner.color),
        subject: m.subject,
        preview: m.body,
        time: dayOf(m),
        unread: un,
        border: un ? "rgba(var(--acr),.25)" : "rgba(255,255,255,.06)",
        delay: (i * 0.06).toFixed(2) + "s",
        open: openFn(folder === "sent" ? m.to : m.from)
      };
    }),
    folder,
    folders: [{
      id: "inbox",
      label: "Inbox" + (unreadN ? " (" + unreadN + " unread)" : "")
    }, {
      id: "sent",
      label: "Sent (" + sentMsgs.length + ")"
    }].map(f => ({
      label: f.label,
      active: folder === f.id,
      onPick: () => setUi({
        mailFolder: f.id
      })
    }))
  };
  if (openThread) {
    const base = allMessages.filter(m => m.from === meId && m.to === openThread || m.from === openThread && m.to === meId).slice().sort((a, b) => tsOf(a) - tsOf(b));
    inbox.tName = other && other.name || "Unknown";
    inbox.tAv = other && other.av || "??";
    inbox.tColor = other && other.color || "#A99E8C";
    inbox.tTint = dcTint(other && other.color);
    inbox.tRing = dcRing(other && other.color);
    inbox.tStatus = base.length ? "Active today" : "No messages yet - say hi";
    inbox.bubbles = base.map(b => ({
      t: b.body,
      at: clockOf(b),
      subj: b.subject,
      align: b.from === meId ? "flex-end" : "flex-start",
      radius: b.from === meId ? "18px 18px 5px 18px" : "18px 18px 18px 5px",
      bg: b.from === meId ? "linear-gradient(135deg,var(--acl),var(--acd))" : "#221E18",
      fg: b.from === meId ? "var(--ink)" : "#F4ECDD",
      meta: b.from === meId ? "rgba(var(--inkr),.55)" : "#6E665B"
    }));
    inbox.draft = ui.draft || "";
    inbox.back = () => setUi({
      openThread: null,
      draft: ""
    });
    inbox.onDraft = e => setUi({
      draft: e.target.value
    });
    const send = () => {
      const t = (ui.draft || "").trim();
      if (!t) return;
      const last = base[base.length - 1];
      const subject = last && last.subject || t.slice(0, 48);
      on.sendMsg(openThread, subject, t);
      setUi({
        draft: ""
      });
    };
    inbox.send = send;
    inbox.onKey = e => {
      if (e.key === "Enter") {
        e.preventDefault();
        send();
      }
    };
  }
  return {
    inbox,
    social
  };
}
function buildWeight(ctx) {
  const {
    user,
    weights = [],
    ui = {},
    setUi = () => {},
    on = {}
  } = ctx;
  const uidKey = user ? user.id : "solo";
  const ls = (k, d) => {
    try {
      return localStorage.getItem(k);
    } catch (e) {
      return d;
    }
  };
  const mode = ui.wMode || (WMODES.some(x => x.id === ls("il_wmode_" + uidKey)) ? ls("il_wmode_" + uidKey) : "cut");
  const mi = WMODES.find(m => m.id === mode) || WMODES[0];
  const goalRaw = ui.wGoal !== undefined ? ui.wGoal : ls("il_goalw_" + uidKey + "_" + mode) || "";
  const goal = goalRaw !== "" && !isNaN(parseFloat(goalRaw)) ? parseFloat(goalRaw) : null;
  const cur = weights[weights.length - 1] || null;
  const first = weights[0] || null;
  const curKg = cur ? num(cur.w) : null,
    startKg = first ? num(first.w) : null;
  const delta = cur && first ? +(curKg - startKg).toFixed(1) : null;
  const rate = weeklyRate(weights);
  const rateShown = rate !== null ? Math.round(rate * 100) / 100 : null;
  const goodDir = v => mode === "bulk" ? v > 0 : mode === "cut" ? v < 0 : Math.abs(v) <= 1;
  const deltaGood = delta !== null && goodDir(delta);
  const toGo = goal !== null && curKg !== null ? Math.round(Math.abs(goal - curKg) * 10) / 10 : null;
  const span = goal !== null && startKg !== null ? Math.abs(goal - startKg) || 1 : 1;
  const wPct = curKg !== null && startKg !== null && goal !== null ? Math.max(0, Math.min(100, Math.round(Math.abs(curKg - startKg) / span * 100))) : 0;
  const sm = stSmooth(weights.map(w => num(w.w)), 300, 100, 6);
  const sign = n => n > 0 ? "+" : n < 0 ? "−" : "";
  let planLine, etaLine;
  if (!cur) {
    planLine = "Log your first weigh-in";
    etaLine = "Your plan and ETA appear once you have entries";
  } else if (goal === null) {
    planLine = mi.label + " mode";
    etaLine = mode === "maintain" ? "Set a goal weight to anchor your ±1 kg band" : "Set a goal weight to get a plan and ETA";
  } else if (mode === "maintain") {
    const dev = +(curKg - goal).toFixed(1);
    planLine = "Holding at " + goal + " kg";
    etaLine = Math.abs(dev) <= 1 ? "Inside your ±1 kg band - nicely steady" : dev > 0 ? Math.abs(dev) + " kg above your band - ease off a little" : Math.abs(dev) + " kg below your band - eat a little more";
  } else {
    const dist = +(goal - curKg).toFixed(1);
    if (Math.abs(dist) <= 0.2) {
      planLine = (mode === "cut" ? "Cut" : "Bulk") + " goal reached · " + goal + " kg";
      etaLine = "Switch to Maintain to hold it here";
    } else {
      planLine = (mode === "cut" ? "Cutting to " : "Bulking to ") + goal + " kg · " + Math.abs(dist) + " kg to go";
      if (rate === null || Math.abs(rate) < 0.05 || rate * dist < 0) etaLine = "No consistent trend yet - keep logging";else {
        const weeksLeft = dist / rate;
        if (weeksLeft > 104) etaLine = "Over 2 years at this pace - keep logging";else {
          const eta = new Date(Date.now() + weeksLeft * 7 * 864e5);
          etaLine = "At this pace you'll reach " + goal + " kg by " + eta.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric"
          });
        }
      }
    }
  }
  return {
    current: cur ? cur.w : "–",
    change: delta === null ? "–" : sign(delta) + Math.abs(delta).toFixed(1) + " kg",
    changeColor: delta === null || delta === 0 ? "#A99E8C" : deltaGood ? "#57C08A" : "#E4A33C",
    goal: goal !== null ? String(goal) : "–",
    line: sm.line,
    area: sm.area,
    start: startKg !== null ? String(startKg) : "–",
    pct: wPct + "%",
    modeLabel: mi.label,
    modeEmoji: mi.emoji,
    modes: WMODES.map(m => ({
      label: m.label,
      pick: () => {
        let g = "";
        try {
          g = localStorage.getItem("il_goalw_" + uidKey + "_" + m.id) || "";
        } catch (e) {
          g = "";
        }
        try {
          localStorage.setItem("il_wmode_" + uidKey, m.id);
        } catch (e) {}
        setUi({
          wMode: m.id,
          wGoal: g
        });
      },
      bg: m.id === mode ? "var(--ac)" : "transparent",
      fg: m.id === mode ? "var(--ink)" : "#8E8475"
    })),
    tiles: [{
      n: (startKg !== null ? startKg : "–") + " kg",
      l: "START",
      fg: "#F4ECDD"
    }, {
      n: (toGo !== null ? toGo : "–") + " kg",
      l: "TO GO",
      fg: "var(--ac)"
    }, {
      n: rateShown === null ? "– kg" : sign(rateShown) + Math.abs(rateShown) + " kg",
      l: "PER WEEK",
      fg: rateShown === null || Math.abs(rateShown) < 0.05 ? "#A99E8C" : goodDir(rateShown) ? "#57C08A" : "#E4A33C"
    }],
    planLine,
    etaLine,
    value: ui.wInput || "",
    onValue: e => setUi({
      wInput: e.target.value
    }),
    canLog: !!(ui.wInput || "").trim() && !isNaN(parseFloat(ui.wInput)),
    onLog: () => {
      const v = (ui.wInput || "").trim();
      if (!v || isNaN(parseFloat(v))) {
        if (on.flash) on.flash("Enter today's weight first");
        return;
      }
      on.addWeight(v);
      setUi({
        wInput: ""
      });
    },
    goalValue: goalRaw === null ? "" : String(goalRaw),
    onGoal: e => {
      const v = e.target.value;
      try {
        v ? localStorage.setItem("il_goalw_" + uidKey + "_" + mode, v) : localStorage.removeItem("il_goalw_" + uidKey + "_" + mode);
      } catch (err) {}
      setUi({
        wGoal: v
      });
    },
    log: weights.slice().reverse().map((w, i, arr) => {
      const prev = arr[i + 1];
      const d = prev ? +(num(w.w) - num(prev.w)).toFixed(1) : 0;
      const realIdx = weights.length - 1 - i;
      return {
        date: w.date,
        kg: w.w,
        d: d === 0 ? "–" : d < 0 ? "▼ " + Math.abs(d).toFixed(1) : "▲ " + d.toFixed(1),
        dColor: d < 0 ? "#57C08A" : d > 0 ? "#E4726F" : "#6E665B",
        onDelete: () => on.deleteWeight(realIdx)
      };
    })
  };
}
function buildAdmin(ctx) {
  const {
    users = [],
    collections = [],
    allHistory = {},
    allMessages = [],
    ui = {},
    setUi = () => {},
    go = () => {},
    on = {}
  } = ctx;
  const totalSetsLogged = Object.keys(allHistory).reduce((n, k) => n + (allHistory[k] || []).reduce((m, h) => m + (h.sets || []).length, 0), 0);
  return {
    locked: !ui.adminOk,
    unlocked: !!ui.adminOk,
    pw: ui.adminPw || "",
    onPw: e => setUi({
      adminPw: e.target.value,
      adminErr: false
    }),
    err: !!ui.adminErr,
    pwBorder: ui.adminErr ? "#E26A4F" : "rgba(255,255,255,.09)",
    unlock: async () => {
      const pw = (ui.adminPw || "").trim();
      // Ask the server: the password lives in IRONLOG_ADMIN_PASS, never in the client.
      setAdminSecret(pw || null);
      const r = pw ? await api("GET", "/admin/check") : null;
      if (r && r.ok) {
        if (on.setAdminSecret) on.setAdminSecret(pw);
        setUi({
          adminOk: true,
          adminPw: "",
          adminErr: false
        });
        if (on.flash) on.flash("Admin unlocked");
      } else {
        setAdminSecret(null);
        setUi({
          adminErr: true
        });
      }
    },
    lock: () => {
      if (on.setAdminSecret) on.setAdminSecret(null);
      setUi({
        adminOk: false,
        adminPw: ""
      });
      if (on.flash) on.flash("Admin locked");
    },
    stats: [{
      emoji: "👥",
      value: users.length,
      label: "USERS",
      delay: "0s"
    }, {
      emoji: "📋",
      value: collections.length,
      label: "PROGRAMS",
      delay: ".05s"
    }, {
      emoji: "🏋️",
      value: totalSetsLogged,
      label: "SETS LOGGED",
      delay: ".1s"
    }, {
      emoji: "✉️",
      value: allMessages.length,
      label: "MESSAGES",
      delay: ".15s"
    }],
    rows: [{
      emoji: "👥",
      title: "Manage users",
      sub: "Edit, reset PINs, remove",
      onClick: () => on.pushToast && on.pushToast("🛠️", "Not in this panel yet", "User management still lives in the old admin screen.")
    }, {
      emoji: "📋",
      title: "Manage programs",
      sub: "Public library & templates",
      onClick: () => on.pushToast && on.pushToast("🛠️", "Not in this panel yet", "Program management still lives in the old admin screen.")
    }, {
      emoji: "💾",
      title: "Export data",
      sub: "Download all as JSON",
      onClick: () => go(realScreenOf("export"))
    }]
  };
}
function buildBuilder(ctx) {
  const {
    user,
    collections = [],
    ui = {},
    setUi = () => {},
    go = () => {},
    on = {}
  } = ctx;
  const bd = ui.builder || {
    open: false,
    sel: null,
    info: null,
    added: [],
    target: null
  };
  const added = bd.added || [];
  const bInfo = bd.info || body3dInfo(bd.sel);
  const isDesk0 = (ui.vw || 1280) >= 900;
  const meId = user ? user.id : null;
  const bHeat = {};
  added.forEach(a => {
    musclesFor(a.name).forEach((k, i) => {
      bHeat[k] = (bHeat[k] || 0) + (i === 0 ? 1 : 0.45);
    });
  });
  const bMax = Math.max(1, ...Object.values(bHeat));
  const bHeatN = {};
  Object.keys(bHeat).forEach(k => {
    bHeatN[k] = Math.min(1, 0.35 + 0.65 * (bHeat[k] / bMax));
  });
  const MNAME = Object.fromEntries(MUSCLES.map(m => [m.key, m.name]));
  const ed = ui.ed || null;
  const tgW = bd.target != null && ed ? (ed.workouts || [])[bd.target] : null;
  const patch = p => setUi({
    builder: {
      ...bd,
      ...p
    }
  });
  const closed = {
    open: false,
    sel: null,
    info: null,
    added: [],
    target: null
  };
  return {
    open: !!bd.open,
    heat: bHeatN,
    sel: bd.sel || null,
    mode: added.length ? "volume" : "explore",
    coverage: Object.entries(bHeat).sort((a, b) => b[1] - a[1]).map(([k, v]) => ({
      name: MNAME[k] || k,
      sets: Math.round(v * 10) / 10 + "×"
    })),
    hasCoverage: Object.keys(bHeat).length > 0,
    close: () => patch({
      open: false
    }),
    onPick: (k, inf) => patch({
      sel: k,
      info: inf || null
    }),
    clearSel: () => patch({
      sel: null,
      info: null
    }),
    hasSel: !!bd.sel,
    noSel: !bd.sel,
    selName: bInfo ? bInfo.name : MNAME[bd.sel] || bd.sel || "",
    toWorkout: bd.target != null && !!ed,
    toWorkoutName: tgW ? tgW.name || "this workout" : "",
    exs: bd.sel ? exercisesForMuscle(bd.sel).map(n => {
      const isAdded = tgW ? (tgW.entries || []).some(e2 => e2.type === "ss" ? (e2.exercises || []).some(x => x.name === n) : e2.name === n) : added.some(a => a.name === n);
      return {
        name: n,
        addLabel: isAdded ? "✓ Added" : "＋ Add",
        addStyle: isAdded ? "padding:7px 12px;border-radius:9px;background:rgba(87,192,138,.15);color:#57C08A;font-size:11px;font-weight:800;" : "padding:7px 12px;border-radius:9px;background:rgba(var(--acr),.12);color:var(--ac);font-size:11px;font-weight:800;",
        onAdd: () => {
          if (isAdded) return;
          if (bd.target != null && ed) {
            const wi = bd.target;
            const ws = (ed.workouts || []).map(w => ({
              ...w,
              entries: (w.entries || []).map(e2 => e2.type === "ss" ? {
                ...e2,
                exercises: (e2.exercises || []).map(x => ({
                  ...x
                }))
              } : {
                ...e2
              })
            }));
            ws[wi].entries.push(mkEx(n, 3, 8, 12));
            setUi({
              ed: {
                ...ed,
                workouts: ws
              }
            });
            if (on.flash) on.flash(n + " added ✓");
            return;
          }
          patch({
            added: [...added, {
              name: n
            }]
          });
        }
      };
    }) : [],
    added: added.map((a, i) => ({
      name: a.name,
      onRemove: () => patch({
        added: added.filter((_, j) => j !== i)
      })
    })),
    hasAdded: added.length > 0,
    count: added.length + (added.length === 1 ? " exercise" : " exercises"),
    save: () => {
      if (!added.length) {
        if (on.flash) on.flash("Add exercises first");
        return;
      }
      const existing = collections.find(c => c.owner === meId && c.name === "My Builder") || null;
      const nn = existing ? (existing.workouts || []).length + 1 : 1;
      const w = {
        id: uid(),
        name: "Muscle Mix " + nn,
        emoji: "🧍",
        entries: added.map(a => mkEx(a.name, 3, 8, 12))
      };
      const next = existing ? {
        ...existing,
        workouts: [...(existing.workouts || []), w]
      } : {
        id: uid(),
        owner: meId,
        name: "My Builder",
        emoji: "🧍",
        desc: "Built from the body map",
        pub: false,
        type: "gym",
        workouts: [w]
      };
      on.saveCollection(next);
      setUi({
        builder: closed,
        tab: "all",
        progScope: "mine",
        progOpen: {
          ...(ui.progOpen || {}),
          [next.id]: true
        }
      });
      go(realScreenOf("programs"));
      if (on.flash) on.flash("Workout saved to My Builder 💪");
    },
    sheetStyle: isDesk0 ? "position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:520px;max-width:94%;max-height:88vh;overflow-y:auto;z-index:95;background:#1B1712;border-radius:26px;padding:22px;box-shadow:0 30px 80px rgba(0,0,0,.6);animation:pop .38s cubic-bezier(.2,.9,.25,1) both;" : "position:absolute;left:0;right:0;bottom:0;max-width:560px;margin:0 auto;max-height:92vh;overflow-y:auto;z-index:95;background:#1B1712;border-radius:30px 30px 0 0;padding:18px 20px 28px;box-shadow:0 -10px 50px rgba(0,0,0,.5);animation:sheetIn .42s cubic-bezier(.2,.9,.25,1) both;"
  };
}
function edDraftFrom(collection, meId) {
  const p = collection || null;
  return p ? {
    base: p,
    pid: p.id,
    owner: p.owner || meId,
    name: p.name || "",
    desc: p.desc || "",
    emoji: p.emoji || (p.type === "calisthenics" ? "🤸" : "🏋️"),
    pub: !!p.pub,
    type: p.type || "gym",
    workouts: JSON.parse(JSON.stringify(p.workouts || [])),
    emojiOpen: false,
    wEmoji: null,
    ssOpen: {},
    err: ""
  } : {
    base: null,
    pid: null,
    owner: meId,
    name: "",
    desc: "",
    emoji: "🏆",
    pub: false,
    type: "gym",
    workouts: [{
      id: uid(),
      name: "Workout A",
      emoji: "💪",
      entries: []
    }],
    emojiOpen: false,
    wEmoji: null,
    ssOpen: {},
    err: ""
  };
}
const EMOJIS_P = ["🏋️", "💪", "🦵", "🦾", "🔥", "⚡", "💥", "🎯", "🏃", "🤸", "🧗", "🚴", "🥊", "🏊", "🤼", "🫀", "🦴", "🏅", "🥇", "🏆", "🎖️", "🧘", "🤾", "🏄"];
const EMOJIS_W = ["💪", "🏋️", "🦵", "🦾", "🔥", "⚡", "💥", "🎯", "🏃", "🤸", "🧗", "🥊", "🩻", "🫀", "🦴", "🏅", "🏆", "🧍"];
function buildEd(ctx) {
  const {
    user,
    allExercises = [],
    ui = {},
    setUi = () => {},
    on = {}
  } = ctx;
  const e = ui.ed || null;
  if (!e) {
    return {
      open: false,
      title: "",
      sub: "",
      err: "",
      hasErr: false,
      emoji: "",
      emojiOpen: false,
      emojiHint: "",
      emojiBtnStyle: "",
      emojis: [],
      name: "",
      desc: "",
      types: [],
      pubLabel: "",
      switchStyle: "",
      knobStyle: "",
      wCount: "",
      workouts: [],
      toggleEmoji: () => {},
      onName: () => {},
      onDesc: () => {},
      togglePub: () => {},
      addWorkout: () => {},
      cancel: () => {},
      save: () => {}
    };
  }
  const so = e.ssOpen || {};
  const meId = user ? user.id : null;
  const cloneWs = ws => (ws || []).map(w => ({
    ...w,
    entries: (w.entries || []).map(en => en.type === "ss" ? {
      ...en,
      exercises: (en.exercises || []).map(x => ({
        ...x
      }))
    } : {
      ...en
    })
  }));
  const edPatch = patch => setUi({
    ed: {
      ...e,
      ...patch
    }
  });
  const edWs = (fn, extra) => {
    const ws = cloneWs(e.workouts);
    fn(ws);
    setUi({
      ed: {
        ...e,
        workouts: ws,
        ...(extra || {})
      }
    });
  };
  const edEx = (wi, ei, si, fn) => edWs(ws => {
    const en = ws[wi] && ws[wi].entries[ei];
    if (!en) return;
    fn(si == null ? en : en.exercises[si]);
  });
  const edMove = (wi, ei, dir) => edWs(ws => {
    const es = ws[wi].entries,
      j = ei + dir;
    if (j < 0 || j >= es.length) return;
    const t = es[ei];
    es[ei] = es[j];
    es[j] = t;
  });
  const sugFor = (key, val) => {
    const v = (val || "").trim().toLowerCase();
    if (ui.edFocus !== key || v.length < 1) return [];
    return allExercises.filter(n => n.toLowerCase().includes(v) && n.toLowerCase() !== v).slice(0, 5);
  };
  const mkNums = (t, wi, ei, si) => [{
    label: "SETS",
    value: t.sets,
    onMinus: () => edEx(wi, ei, si, x => {
      x.sets = Math.max(1, (x.sets || 1) - 1);
    }),
    onPlus: () => edEx(wi, ei, si, x => {
      x.sets = Math.min(10, (x.sets || 1) + 1);
    })
  }, {
    label: "MIN REPS",
    value: t.repsMin,
    onMinus: () => edEx(wi, ei, si, x => {
      x.repsMin = Math.max(1, (x.repsMin || 1) - 1);
    }),
    onPlus: () => edEx(wi, ei, si, x => {
      x.repsMin = Math.min(x.repsMax || 40, (x.repsMin || 1) + 1);
    })
  }, {
    label: "MAX REPS",
    value: t.repsMax,
    onMinus: () => edEx(wi, ei, si, x => {
      x.repsMax = Math.max(x.repsMin || 1, (x.repsMax || 1) - 1);
    }),
    onPlus: () => edEx(wi, ei, si, x => {
      x.repsMax = Math.min(40, (x.repsMax || 1) + 1);
    })
  }];
  const arrow = dis => "width:26px;height:26px;border-radius:8px;background:rgba(255,255,255,.05);display:flex;align-items:center;justify-content:center;font-size:12px;color:#A99E8C;opacity:" + (dis ? ".3" : "1") + ";";
  const closeEditor = () => setUi({
    ed: null,
    editorOpen: false,
    edFocus: null,
    builder: {
      open: false,
      sel: null,
      info: null,
      added: [],
      target: null
    }
  });
  return {
    open: true,
    title: e.pid ? "Edit Program" : "New Program",
    sub: e.pid ? "Changes save to your library" : "Build a program from scratch",
    err: e.err || "",
    hasErr: !!e.err,
    emoji: e.emoji,
    emojiOpen: !!e.emojiOpen,
    emojiHint: e.emojiOpen ? "Pick an icon →" : "Tap to change",
    emojiBtnStyle: "font-size:27px;padding:8px 11px;border-radius:14px;line-height:1;background:" + (e.emojiOpen ? "rgba(var(--acr),.16)" : "rgba(255,255,255,.05)") + ";border:1.5px solid " + (e.emojiOpen ? "var(--ac)" : "rgba(255,255,255,.07)") + ";",
    toggleEmoji: () => edPatch({
      emojiOpen: !e.emojiOpen
    }),
    emojis: EMOJIS_P.map(ch => ({
      ch,
      onPick: () => edPatch({
        emoji: ch,
        emojiOpen: false
      }),
      style: "font-size:22px;padding:6px 8px;border-radius:11px;line-height:1;background:" + (e.emoji === ch ? "rgba(var(--acr),.16)" : "transparent") + ";border:1.5px solid " + (e.emoji === ch ? "var(--ac)" : "transparent") + ";"
    })),
    name: e.name,
    onName: ev => edPatch({
      name: ev.target.value,
      err: ""
    }),
    desc: e.desc,
    onDesc: ev => edPatch({
      desc: ev.target.value
    }),
    types: [{
      id: "gym",
      label: "🏋️ Gym"
    }, {
      id: "calisthenics",
      label: "🤸 Calisthenics"
    }].map(t => ({
      label: t.label,
      onClick: () => edPatch({
        type: t.id
      }),
      style: e.type === t.id ? "flex:1;text-align:center;padding:13px 0;border-radius:14px;background:rgba(var(--acr),.14);border:1.5px solid rgba(var(--acr),.5);color:var(--ac);font-size:13px;font-weight:800;" : "flex:1;text-align:center;padding:13px 0;border-radius:14px;background:rgba(255,255,255,.04);border:1.5px solid rgba(255,255,255,.07);color:#8E8475;font-size:13px;font-weight:800;"
    })),
    pubLabel: e.pub ? "Public — others can see & use this" : "Private — only you can see this",
    togglePub: () => edPatch({
      pub: !e.pub
    }),
    switchStyle: "width:42px;height:24px;border-radius:12px;flex-shrink:0;display:flex;align-items:center;padding:3px;box-sizing:border-box;transition:all .2s ease;background:" + (e.pub ? "linear-gradient(135deg,var(--acl),var(--acd))" : "rgba(255,255,255,.1)") + ";justify-content:" + (e.pub ? "flex-end" : "flex-start") + ";",
    knobStyle: "width:18px;height:18px;border-radius:50%;background:" + (e.pub ? "var(--ink)" : "#8E8475") + ";",
    wCount: "WORKOUTS (" + (e.workouts || []).length + ")",
    addWorkout: () => edWs(ws => {
      ws.push({
        id: uid(),
        name: "New Workout",
        emoji: "💪",
        entries: []
      });
    }),
    cancel: closeEditor,
    save: () => {
      if (!(e.name || "").trim()) {
        edPatch({
          err: "Please enter a program name"
        });
        return;
      }
      const ws = (e.workouts || []).map(w => {
        const nm = (w.name || "Workout").trim();
        const entries = (w.entries || []).map(en => en.type === "ss" ? {
          ...en,
          exercises: (en.exercises || []).filter(x => (x.name || "").trim())
        } : en).filter(en => en.type === "ss" ? en.exercises.length > 0 : !!(en.name || "").trim());
        return {
          ...w,
          name: nm,
          entries
        };
      }).filter(w => w.entries.length > 0 || (e.workouts || []).length === 1);
      const id = e.pid || uid();
      on.saveCollection({
        ...(e.base || {}),
        id,
        owner: e.owner || meId,
        name: e.name.trim(),
        desc: e.desc || "",
        emoji: e.emoji,
        pub: !!e.pub,
        type: e.type || "gym",
        workouts: ws
      });
      setUi({
        ed: null,
        editorOpen: false,
        edFocus: null,
        progScope: "mine",
        tab: "all",
        progOpen: {
          ...(ui.progOpen || {}),
          [id]: true
        }
      });
      if (on.flash) on.flash(e.pid ? "Program updated ✓" : "Program created 💪");
    },
    workouts: (e.workouts || []).map((w, wi) => ({
      emoji: w.emoji,
      name: w.name,
      onName: ev => {
        const v = ev.target.value;
        edWs(ws => {
          ws[wi].name = v;
        });
      },
      emojiOpen: e.wEmoji === wi,
      emojiBtnStyle: "font-size:21px;padding:8px 10px;border-radius:12px;flex-shrink:0;line-height:1;background:" + (e.wEmoji === wi ? "rgba(var(--acr),.16)" : "rgba(255,255,255,.05)") + ";border:1.5px solid " + (e.wEmoji === wi ? "var(--ac)" : "transparent") + ";",
      toggleEmoji: () => edPatch({
        wEmoji: e.wEmoji === wi ? null : wi
      }),
      emojis: EMOJIS_W.map(ch => ({
        ch,
        onPick: () => edWs(ws => {
          ws[wi].emoji = ch;
        }, {
          wEmoji: null
        }),
        style: "font-size:20px;padding:5px 7px;border-radius:10px;line-height:1;background:" + (w.emoji === ch ? "rgba(var(--acr),.16)" : "transparent") + ";border:1.5px solid " + (w.emoji === ch ? "var(--ac)" : "transparent") + ";"
      })),
      onRemove: () => edWs(ws => {
        ws.splice(wi, 1);
      }),
      addEx: () => edWs(ws => {
        ws[wi].entries.push(mkEx("", 3, 8, 12));
      }),
      addSS: () => {
        const at = ((e.workouts[wi] || {}).entries || []).length;
        edWs(ws => {
          ws[wi].entries.push(mkSS(mkEx("", 3, 8, 12), mkEx("", 3, 8, 12)));
        }, {
          ssOpen: {
            ...so,
            [wi + "-" + at]: true
          }
        });
      },
      byMuscle: () => setUi({
        builder: {
          open: true,
          sel: null,
          info: null,
          added: [],
          target: wi
        }
      }),
      entries: (w.entries || []).map((en, ei) => {
        const key = wi + "-" + ei;
        const base = {
          onUp: () => edMove(wi, ei, -1),
          onDown: () => edMove(wi, ei, 1),
          upStyle: arrow(ei === 0),
          downStyle: arrow(ei === (w.entries || []).length - 1),
          onRemove: () => edWs(ws => {
            ws[wi].entries.splice(ei, 1);
          })
        };
        if (en.type === "ss") {
          const exs = en.exercises || [];
          const isOpen = so[key] === undefined ? true : !!so[key];
          return {
            ...base,
            isSS: true,
            isPlain: false,
            ssOpen: isOpen,
            ssClosed: !isOpen,
            ssLabel: isOpen ? "✓ Close" : "✏️ Edit",
            ssCount: exs.length + (exs.length === 1 ? " exercise" : " exercises") + " · tap to edit",
            ssPreview: exs.map(x => x.name || "(unnamed)").join("  →  "),
            showPreview: !isOpen && exs.length > 0,
            ssHeadStyle: "display:flex;align-items:center;gap:9px;padding:10px 12px;background:rgba(var(--acr),.12);border:1.5px solid rgba(var(--acr),.3);border-radius:" + (isOpen ? "15px 15px 0 0" : "15px") + ";",
            toggleSS: () => edPatch({
              ssOpen: {
                ...so,
                [key]: !isOpen
              }
            }),
            addSSEx: () => edWs(ws => {
              ws[wi].entries[ei].exercises.push(mkEx("", 3, 8, 12));
            }),
            exs: exs.map((x, si) => {
              const k2 = key + "-" + si,
                sg = sugFor(k2, x.name);
              return {
                name: x.name,
                onFocus: () => setUi({
                  edFocus: k2
                }),
                onName: ev => {
                  const v = ev.target.value;
                  edWs(ws => {
                    ws[wi].entries[ei].exercises[si].name = v;
                  });
                  setUi({
                    edFocus: k2
                  });
                },
                hasSugg: sg.length > 0,
                sugg: sg.map(n => ({
                  name: n,
                  onPick: () => {
                    edWs(ws => {
                      ws[wi].entries[ei].exercises[si].name = n;
                    });
                    setUi({
                      edFocus: null
                    });
                  }
                })),
                onRemove: () => edWs(ws => {
                  ws[wi].entries[ei].exercises.splice(si, 1);
                }),
                nums: mkNums(x, wi, ei, si)
              };
            })
          };
        }
        const sg = sugFor(key, en.name);
        return {
          ...base,
          isSS: false,
          isPlain: true,
          name: en.name,
          onFocus: () => setUi({
            edFocus: key
          }),
          onName: ev => {
            const v = ev.target.value;
            edWs(ws => {
              ws[wi].entries[ei].name = v;
            });
            setUi({
              edFocus: key
            });
          },
          hasSugg: sg.length > 0,
          sugg: sg.map(n => ({
            name: n,
            onPick: () => {
              edWs(ws => {
                ws[wi].entries[ei].name = n;
              });
              setUi({
                edFocus: null
              });
            }
          })),
          nums: mkNums(en, wi, ei, null)
        };
      })
    }))
  };
}
function Splash({
  onDone
}) {
  useEffect(() => {
    const t = setTimeout(onDone, 1200);
    return () => clearTimeout(t);
  }, []);
  return _h("div", {
    className: "press popIn",
    onClick: onDone,
    style: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "0 26px",
      overflow: "hidden",
      background: "#080705"
    }
  }, _h("div", {
    className: "sora",
    style: {
      fontSize: 76,
      fontWeight: 800,
      lineHeight: 0.92,
      letterSpacing: -3.6,
      color: "#F4ECDD",
      whiteSpace: "nowrap"
    }
  }, "IRON"), _h("div", {
    className: "sora",
    style: {
      fontSize: 76,
      fontWeight: 800,
      lineHeight: 0.92,
      letterSpacing: -3.6,
      whiteSpace: "nowrap",
      background: "linear-gradient(135deg,var(--acl),var(--acd))",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent"
    }
  }, "LOG."), _h("div", {
    style: {
      marginTop: 22,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 3.4,
      color: "#3E3830"
    }
  }, "EST. 2026"));
}
function Login({
  users,
  onLogin,
  onAddUser,
  onEmailAuth
}) {
  const [sel, setSel] = useState(null);
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newAv, setNewAv] = useState("");
  const [newPin, setNewPin] = useState("");
  const [newColor, setNewColor] = useState(USER_COLORS[0]);
  const [newErr, setNewErr] = useState("");
  const pick = u => {
    setSel(u);
    setPin("");
    setErr("");
    setShowAdd(false);
  };
  const doLogin = () => {
    if (!sel) return;
    if (sel.pin && sel.pin !== pin) {
      setErr("Wrong PIN ✗");
      return;
    }
    onLogin(sel);
  };
  const doAdd = () => {
    if (!newName.trim()) {
      setNewErr("Enter a name");
      return;
    }
    if (users.find(u => u.name.toLowerCase() === newName.trim().toLowerCase())) {
      setNewErr("Name already taken");
      return;
    }
    const av = newAv.trim() || newName.trim().slice(0, 2);
    onAddUser({
      id: uid(),
      name: newName.trim(),
      av,
      pin: newPin.trim() || null,
      color: newColor
    });
    setShowAdd(false);
    setNewName("");
    setNewAv("");
    setNewPin("");
    setNewErr("");
  };
  return _h("div", {
    style: {
      minHeight: "100vh",
      background: "radial-gradient(120% 90% at 80% 0%, #221a10 0%, #16120D 55%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 26px 60px",
      position: "relative",
      overflow: "hidden"
    }
  }, _h("div", {
    style: {
      position: "absolute",
      width: 300,
      height: 300,
      borderRadius: "50%",
      background: "radial-gradient(circle,rgba(var(--acr),0.14) 0%,transparent 70%)",
      top: -80,
      right: -60
    }
  }), _h("div", {
    style: {
      position: "absolute",
      width: 200,
      height: 200,
      borderRadius: "50%",
      background: "radial-gradient(circle,rgba(var(--acr),0.10) 0%,transparent 70%)",
      bottom: 30,
      left: -50
    }
  }), _h("div", {
    className: "fadeUp",
    style: {
      textAlign: "center",
      marginBottom: 40
    }
  }, _h("div", {
    className: "sora",
    style: {
      fontSize: 50,
      fontWeight: 800,
      letterSpacing: -2,
      color: C.cream
    }
  }, "IRON", _h("span", {
    style: {
      color: C.amber
    }
  }, "LOG")), _h("div", {
    style: {
      fontSize: 13,
      color: C.muted,
      marginTop: 8,
      fontWeight: 600,
      letterSpacing: 0.5
    }
  }, "your lifts \xB7 your data \xB7 your progress")), _h("div", {
    className: "fadeUp",
    style: {
      width: "100%",
      maxWidth: 420
    }
  }, _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.muted,
      letterSpacing: 1.2,
      textTransform: "uppercase",
      textAlign: "center",
      marginBottom: 16
    }
  }, "Who's training?"), _h("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 12,
      marginBottom: 20
    }
  }, users.map(u => _h("div", {
    key: u.id,
    className: "press",
    onClick: () => pick(u),
    style: {
      background: sel?.id === u.id ? C.glassHard : C.glass,
      backdropFilter: "blur(12px)",
      border: "2px solid " + (sel?.id === u.id ? u.color + "66" : C.border),
      borderRadius: 18,
      padding: "18px 8px 14px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
      boxShadow: sel?.id === u.id ? "0 8px 28px " + u.color + "22" : C.shadow,
      transform: sel?.id === u.id ? "scale(1.04)" : "scale(1)",
      transition: "all 0.2s"
    }
  }, _h(Ava, {
    user: u,
    size: 48
  }), _h("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: C.text,
      textAlign: "center",
      wordBreak: "break-word"
    }
  }, u.name), _h("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      background: u.pin ? C.accentBg : "rgba(255,255,255,0.04)",
      color: u.pin ? C.accentDark : C.muted,
      borderRadius: 6,
      padding: "2px 8px"
    }
  }, u.pin ? "🔒 PIN" : "open")))), sel?.pin && _h("div", {
    className: "popIn",
    style: {
      marginBottom: 14
    }
  }, _h("input", {
    autoFocus: true,
    type: "password",
    placeholder: "PIN for " + sel.name,
    value: pin,
    onChange: e => {
      setPin(e.target.value);
      setErr("");
    },
    onKeyDown: e => e.key === "Enter" && doLogin(),
    style: {
      width: "100%",
      padding: "14px 18px",
      background: C.glassHard,
      border: "1.5px solid " + C.border,
      borderRadius: 16,
      fontSize: 16,
      color: C.text,
      outline: "none",
      textAlign: "center",
      letterSpacing: 4
    }
  }), err && _h("div", {
    style: {
      color: C.danger,
      fontSize: 13,
      marginTop: 6,
      textAlign: "center",
      fontWeight: 700
    }
  }, err)), sel && _h(Btn, {
    full: true,
    onClick: doLogin
  }, "Enter as ", sel.name, " \u2192"), _h("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 20
    }
  }, onEmailAuth ? _h("div", {
    className: "press",
    onClick: onEmailAuth,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "7px 14px",
      borderRadius: 20,
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      fontSize: 12,
      fontWeight: 700,
      color: C.muted
    }
  }, "\u2709\uFE0F Email account") : _h("div", null), _h("div", {
    className: "press",
    onClick: () => {
      setShowAdd(p => !p);
      setSel(null);
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "7px 14px",
      borderRadius: 20,
      background: showAdd ? "rgba(var(--acr),0.1)" : "rgba(255,255,255,0.04)",
      border: "1px solid " + (showAdd ? "rgba(var(--acr),0.3)" : "rgba(255,255,255,0.08)"),
      fontSize: 12,
      fontWeight: 700,
      color: showAdd ? C.accentDark : C.muted
    }
  }, _h("span", {
    style: {
      fontSize: 14
    }
  }, showAdd ? "✕" : "＋"), " ", showAdd ? "Cancel" : "Add user")), showAdd && _h("div", {
    className: "popIn",
    style: {
      background: C.glassHard,
      border: "1.5px solid rgba(var(--acr),0.25)",
      borderRadius: 20,
      padding: 20,
      marginTop: 12
    }
  }, _h("div", {
    style: {
      fontSize: 15,
      fontWeight: 800,
      color: C.text,
      marginBottom: 16
    }
  }, "New User"), _h("div", {
    style: {
      marginBottom: 12
    }
  }, _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.muted,
      letterSpacing: 0.8,
      textTransform: "uppercase",
      marginBottom: 6
    }
  }, "Name *"), _h("input", {
    autoFocus: true,
    value: newName,
    onChange: e => {
      setNewName(e.target.value);
      setNewAv(e.target.value.slice(0, 2));
      setNewErr("");
    },
    placeholder: "e.g. Alex",
    style: {
      width: "100%",
      padding: "11px 14px",
      background: "rgba(255,255,255,0.05)",
      border: "1.5px solid rgba(var(--acr),0.22)",
      borderRadius: 12,
      fontSize: 14,
      color: C.text,
      outline: "none",
      fontFamily: "'Manrope',sans-serif"
    }
  })), _h("div", {
    style: {
      marginBottom: 12
    }
  }, _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.muted,
      letterSpacing: 0.8,
      textTransform: "uppercase",
      marginBottom: 6
    }
  }, "Avatar letters (auto if empty)"), _h("input", {
    value: newAv,
    onChange: e => setNewAv(e.target.value.slice(0, 3)),
    placeholder: "e.g. Al",
    maxLength: 3,
    style: {
      width: "100%",
      padding: "11px 14px",
      background: "rgba(255,255,255,0.05)",
      border: "1.5px solid rgba(var(--acr),0.22)",
      borderRadius: 12,
      fontSize: 14,
      color: C.text,
      outline: "none",
      fontFamily: "'Manrope',sans-serif"
    }
  })), _h("div", {
    style: {
      marginBottom: 12
    }
  }, _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.muted,
      letterSpacing: 0.8,
      textTransform: "uppercase",
      marginBottom: 8
    }
  }, "Color"), _h("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, USER_COLORS.map(col => _h("div", {
    key: col,
    className: "press",
    onClick: () => setNewColor(col),
    style: {
      width: 30,
      height: 30,
      borderRadius: 10,
      background: col,
      border: "2.5px solid " + (newColor === col ? "#F4ECDD" : "transparent"),
      boxShadow: newColor === col ? "0 0 0 2px white inset" : "none",
      flexShrink: 0
    }
  })))), _h("div", {
    style: {
      marginBottom: 16
    }
  }, _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.muted,
      letterSpacing: 0.8,
      textTransform: "uppercase",
      marginBottom: 6
    }
  }, "PIN (optional)"), _h("input", {
    type: "password",
    value: newPin,
    onChange: e => setNewPin(e.target.value),
    placeholder: "Leave empty for open access",
    style: {
      width: "100%",
      padding: "11px 14px",
      background: "rgba(255,255,255,0.05)",
      border: "1.5px solid rgba(var(--acr),0.22)",
      borderRadius: 12,
      fontSize: 14,
      color: C.text,
      outline: "none",
      fontFamily: "'Manrope',sans-serif"
    }
  })), newErr && _h("div", {
    style: {
      color: C.danger,
      fontSize: 12,
      fontWeight: 700,
      marginBottom: 10
    }
  }, newErr), _h("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "10px 14px",
      background: "rgba(var(--acr),0.06)",
      borderRadius: 12,
      marginBottom: 16
    }
  }, _h("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 12,
      background: newColor + "22",
      color: newColor,
      border: "2px solid " + newColor + "55",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 14,
      fontWeight: 800,
      flexShrink: 0
    }
  }, newAv || newName.slice(0, 2) || "??"), _h("div", null, _h("div", {
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: C.text
    }
  }, newName || "Name"), _h("div", {
    style: {
      fontSize: 11,
      color: C.muted
    }
  }, newPin ? "🔒 PIN protected" : "open access"))), _h(Btn, {
    full: true,
    onClick: doAdd
  }, "Create User"))));
}
function Home({
  user,
  account = null,
  history,
  collections,
  go,
  onStart,
  onLogout,
  onDeleteUser,
  minimizedWorkout,
  onResumeWorkout,
  onAbandonWorkout,
  onOpenAdmin,
  gyms = [],
  activeGym = "",
  onSelectGym,
  onAddGym,
  onRenameGym,
  onDeleteGym,
  accent = "amber",
  onSetAccent,
  users = [],
  sessions = {},
  mySubs = [],
  onToggleSub,
  unread = 0,
  prefs = {},
  onSavePrefs,
  bodyKg = 0,
  myCheckins = []
}) {
  const mine = collections.filter(c => c.owner === user.id);
  const last = history[0];
  const allWorkouts = mine.flatMap(c => c.workouts.map(w => ({
    ...w,
    collName: c.name,
    collId: c.id,
    coll: c
  })));
  const [showSettings, setShowSettings] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteTyped, setDeleteTyped] = useState("");
  const [nowTick, setNowTick] = useState(() => Date.now());
  useEffect(() => {
    const iv = setInterval(() => setNowTick(Date.now()), 30000);
    return () => clearInterval(iv);
  }, []);
  const [favSess, setFavSess] = useState(() => {
    if (Array.isArray(prefs.favSess)) return prefs.favSess;
    try {
      return JSON.parse(localStorage.getItem("il_fav_" + user.id) || "[]");
    } catch (e) {
      return [];
    }
  });
  const [hiddenSess, setHiddenSess] = useState(() => {
    if (Array.isArray(prefs.hiddenSess)) return prefs.hiddenSess;
    try {
      return JSON.parse(localStorage.getItem("il_hidden_" + user.id) || "[]");
    } catch (e) {
      return [];
    }
  });
  const [editSessions, setEditSessions] = useState(false);
  const favBootRef = useRef(true);
  useEffect(() => {
    try {
      localStorage.setItem("il_fav_" + user.id, JSON.stringify(favSess));
    } catch (e) {}
    try {
      localStorage.setItem("il_hidden_" + user.id, JSON.stringify(hiddenSess));
    } catch (e) {}
    if (favBootRef.current) {
      favBootRef.current = false;
      return;
    }
    onSavePrefs && onSavePrefs({
      favSess,
      hiddenSess
    });
  }, [favSess, hiddenSess, user.id]);
  const toggleFav = id => setFavSess(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const hideSess = id => setHiddenSess(p => p.includes(id) ? p : [...p, id]);
  const handlePhotoFile = file => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new window.Image();
      img.onload = () => {
        const size = 240;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        const scale = Math.max(size / img.width, size / img.height);
        const w = img.width * scale,
          h = img.height * scale;
        ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        savePhoto(user.id, dataUrl);
        onSavePrefs && onSavePrefs({
          photo: dataUrl
        });
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };
  const workoutDates = new Set(history.map(h => h.date));
  const calcStreak = () => {
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const ds = d.toISOString().slice(0, 10);
      if (workoutDates.has(ds)) streak++;else if (i > 0) break;
    }
    return streak;
  };
  const streak = calcStreak();
  const now = new Date();
  const year = now.getFullYear(),
    month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDow = new Date(year, month, 1).getDay();
  const calDates = Array.from({
    length: daysInMonth
  }, (_, i) => {
    const d = new Date(year, month, i + 1);
    return d.toISOString().slice(0, 10);
  });
  const closeSettings = () => {
    setShowSettings(false);
    setConfirmDelete(false);
    setDeleteTyped("");
  };
  const rec = useMemo(() => computeRecovery(history, null, {
    bw: bodyKg,
    checkins: myCheckins
  }), [history, bodyKg, myCheckins]);
  const heroPending = useMemo(() => MUSCLES.filter(m => rec[m.key] && rec[m.key].pct < 1).map(m => ({
    m,
    r: rec[m.key]
  })).sort((a, b) => b.r.remainH - a.r.remainH), [rec]);
  const heroHeat = useMemo(() => Object.fromEntries(Object.entries(rec).map(([k, r]) => [k, r.pct])), [rec]);
  const heroAnyData = Object.keys(rec).length > 0;
  return _h("div", {
    style: {
      minHeight: "100vh",
      paddingBottom: 32,
      background: "radial-gradient(110% 90% at 78% 4%, #2A2012 0%, #14100B 48%, #0C0906 100%)"
    },
    className: "slide"
  }, showSettings && _h("div", {
    className: "popIn",
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 800,
      background: "rgba(0,0,0,0.45)",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center"
    },
    onClick: e => {
      if (e.target === e.currentTarget) closeSettings();
    }
  }, _h("div", {
    style: {
      width: "100%",
      maxWidth: 480,
      background: C.glassHard,
      borderRadius: "24px 24px 0 0",
      padding: "28px 22px 44px",
      boxShadow: "0 -8px 40px rgba(0,0,0,0.18)"
    }
  }, _h("div", {
    style: {
      width: 36,
      height: 4,
      borderRadius: 2,
      background: "rgba(255,255,255,0.15)",
      margin: "0 auto 24px"
    }
  }), _h("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      marginBottom: 24
    }
  }, _h("div", {
    className: "press",
    onClick: () => document.getElementById("il-photo-input").click(),
    style: {
      position: "relative"
    }
  }, _h(Ava, {
    user: user,
    size: 52
  }), _h("div", {
    style: {
      position: "absolute",
      bottom: -2,
      right: -2,
      width: 20,
      height: 20,
      borderRadius: 7,
      background: C.accent,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 10,
      border: "2px solid " + C.glassHard
    }
  }, "\uD83D\uDCF7")), _h("input", {
    id: "il-photo-input",
    type: "file",
    accept: "image/*",
    style: {
      display: "none"
    },
    onChange: e => {
      handlePhotoFile(e.target.files[0]);
      e.target.value = "";
    }
  }), _h("div", null, _h("div", {
    style: {
      fontSize: 18,
      fontWeight: 900,
      color: C.text
    }
  }, user.name), _h("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      fontWeight: 600
    }
  }, user.pin ? "🔒 PIN protected" : "Open access"))), _h("div", {
    style: {
      marginBottom: 16
    }
  }, _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.muted,
      letterSpacing: 0.8,
      marginBottom: 8,
      textTransform: "uppercase"
    }
  }, "\uD83D\uDCCD Your gyms"), _h(GymPicker, {
    gyms: gyms,
    activeGym: activeGym,
    onSelect: onSelectGym,
    onAdd: onAddGym
  }), gyms.length > 0 && _h("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      marginTop: 10
    }
  }, gyms.map(g => _h("div", {
    key: g,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "8px 10px",
      background: "rgba(255,255,255,0.03)",
      borderRadius: 10
    }
  }, _h("div", {
    style: {
      flex: 1,
      fontSize: 13,
      fontWeight: 700,
      color: C.text
    }
  }, "\uD83D\uDCCD ", g, g === activeGym && _h("span", {
    style: {
      fontSize: 10,
      color: C.accent,
      marginLeft: 6,
      fontWeight: 800
    }
  }, "active")), _h("div", {
    className: "press",
    onClick: () => {
      const n = window.prompt("Rename gym", g);
      if (n && n.trim()) onRenameGym && onRenameGym(g, n.trim());
    },
    style: {
      fontSize: 13,
      padding: "3px 8px",
      color: C.mid
    }
  }, "\u270F\uFE0F"), _h("div", {
    className: "press",
    onClick: () => {
      if (window.confirm('Delete gym "' + g + '"? Past workouts keep their data.')) onDeleteGym && onDeleteGym(g);
    },
    style: {
      fontSize: 13,
      padding: "3px 8px",
      color: C.danger
    }
  }, "\uD83D\uDDD1\uFE0F"))))), _h("div", {
    style: {
      marginBottom: 16
    }
  }, _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.muted,
      letterSpacing: 0.8,
      marginBottom: 10,
      textTransform: "uppercase"
    }
  }, "\uD83C\uDFA8 Accent color"), _h(AccentPicker, {
    accent: accent,
    onPick: onSetAccent
  })), account && _h("div", {
    className: "press",
    onClick: () => {
      closeSettings();
      go("referralpage");
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "14px 16px",
      borderRadius: 14,
      background: "rgba(255,255,255,0.04)",
      marginBottom: 10
    }
  }, _h("span", {
    style: {
      fontSize: 20
    }
  }, "\uD83C\uDF81"), _h("div", null, _h("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: C.text
    }
  }, "Invite friends"), _h("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      fontWeight: 500,
      marginTop: 2
    }
  }, "Give a month, get a month"))), _h("div", {
    className: "press",
    onClick: () => {
      closeSettings();
      onLogout();
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "14px 16px",
      borderRadius: 14,
      background: "rgba(255,255,255,0.04)",
      marginBottom: 10
    }
  }, _h("span", {
    style: {
      fontSize: 20
    }
  }, "\uD83D\uDEAA"), _h("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: C.text
    }
  }, "Log out")), _h("div", {
    className: "press",
    onClick: () => {
      closeSettings();
      onOpenAdmin();
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "14px 16px",
      borderRadius: 14,
      background: "rgba(255,255,255,0.04)",
      marginBottom: 10
    }
  }, _h("span", {
    style: {
      fontSize: 20
    }
  }, "\u2699\uFE0F"), _h("div", null, _h("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: C.text
    }
  }, "Admin Panel"), _h("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      fontWeight: 500,
      marginTop: 2
    }
  }, "Password protected"))), !confirmDelete && _h("div", {
    className: "press",
    onClick: () => setConfirmDelete(true),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "14px 16px",
      borderRadius: 14,
      background: "rgba(255,255,255,0.03)",
      marginBottom: 10,
      border: "1px solid rgba(255,255,255,0.06)"
    }
  }, _h("span", {
    style: {
      fontSize: 20
    }
  }, "\uD83D\uDDD1\uFE0F"), _h("div", null, _h("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: C.muted
    }
  }, "Delete profile"), _h("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      fontWeight: 500,
      marginTop: 2
    }
  }, "Removes this profile and all its data permanently"))), confirmDelete && _h("div", {
    className: "popIn",
    style: {
      background: "rgba(255,107,107,0.06)",
      border: "1.5px solid rgba(255,107,107,0.22)",
      borderRadius: 16,
      padding: 16,
      marginBottom: 10
    }
  }, _h("div", {
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: C.danger,
      marginBottom: 6
    }
  }, "\u26A0\uFE0F Delete profile?"), _h("div", {
    style: {
      fontSize: 13,
      color: C.mid,
      fontWeight: 600,
      marginBottom: 14
    }
  }, "This removes ", _h("strong", null, user.name), "'s profile, all workouts, weight history and messages forever. To confirm, type your name below."), _h("input", {
    autoFocus: true,
    value: deleteTyped,
    onChange: e => setDeleteTyped(e.target.value),
    placeholder: "Type your name to confirm",
    style: {
      width: "100%",
      padding: "11px 14px",
      background: "rgba(255,255,255,0.05)",
      border: "1.5px solid rgba(255,107,107,0.3)",
      borderRadius: 12,
      fontSize: 14,
      color: C.text,
      outline: "none",
      fontFamily: "'Manrope',sans-serif",
      marginBottom: 12
    }
  }), _h("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, _h("button", {
    disabled: deleteTyped.trim().toLowerCase() !== user.name.toLowerCase(),
    onClick: () => {
      closeSettings();
      onDeleteUser(user.id);
    },
    style: {
      flex: 1,
      padding: "11px 0",
      borderRadius: 12,
      border: "none",
      fontSize: 13,
      fontWeight: 800,
      cursor: deleteTyped.trim().toLowerCase() === user.name.toLowerCase() ? "pointer" : "not-allowed",
      background: deleteTyped.trim().toLowerCase() === user.name.toLowerCase() ? C.danger : "rgba(255,255,255,0.1)",
      color: deleteTyped.trim().toLowerCase() === user.name.toLowerCase() ? "white" : C.muted,
      transition: "all 0.2s",
      fontFamily: "'Manrope',sans-serif"
    }
  }, "Delete forever"), _h(Btn, {
    sm: true,
    outline: true,
    onClick: () => {
      setConfirmDelete(false);
      setDeleteTyped("");
    },
    style: {
      flex: 1,
      textAlign: "center"
    }
  }, "Cancel"))), _h("div", {
    className: "press",
    onClick: closeSettings,
    style: {
      textAlign: "center",
      padding: "12px",
      fontSize: 14,
      fontWeight: 700,
      color: C.muted,
      marginTop: 4
    }
  }, "Close"))), _h("div", {
    style: {
      padding: "36px 18px 4px",
      overflowX: "hidden"
    }
  }, _h("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 22
    }
  }, _h("div", {
    className: "press",
    onClick: () => setShowSettings(true),
    style: {
      width: 42,
      height: 42,
      borderRadius: 14,
      background: C.surface,
      border: "1px solid " + C.border,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, _h("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    style: {
      fill: "none",
      stroke: C.text,
      strokeWidth: 2,
      strokeLinecap: "round"
    }
  }, _h("path", {
    d: "M4 8h16M4 14h11"
  }))), _h("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, _h("div", {
    className: "press",
    onClick: () => go("mail"),
    style: {
      position: "relative",
      width: 42,
      height: 42,
      borderRadius: 14,
      background: unread > 0 ? "rgba(var(--acr),0.14)" : C.surface,
      border: "1px solid " + (unread > 0 ? "rgba(var(--acr),0.45)" : C.border),
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, _h("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    style: {
      fill: "none",
      stroke: unread > 0 ? "var(--ac)" : C.text,
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  }, _h("rect", {
    x: "3",
    y: "5",
    width: "18",
    height: "14",
    rx: "3"
  }), _h("path", {
    d: "M3 8l9 6 9-6"
  })), unread > 0 && _h("span", {
    style: {
      position: "absolute",
      top: -5,
      right: -5,
      background: C.danger,
      color: "white",
      borderRadius: 9,
      fontSize: 10,
      fontWeight: 900,
      padding: "1px 6px",
      border: "2px solid #16120D"
    }
  }, unread)), _h("div", {
    className: "press",
    onClick: () => setShowSettings(true)
  }, _h(Ava, {
    user: user,
    size: 46
  })))), _h("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: 2.5,
      color: C.muted
    }
  }, "WELCOME, ", user.name.toUpperCase()), _h("div", {
    className: "sora",
    style: {
      marginTop: 7,
      fontWeight: 800,
      fontSize: 40,
      lineHeight: 1.0,
      letterSpacing: -1.4,
      color: C.text
    }
  }, "Let's ", _h("span", {
    style: {
      background: C.btnGrad,
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent"
    }
  }, "train.")), _h("div", {
    style: {
      marginTop: 18,
      display: "flex",
      alignItems: "center",
      gap: 9,
      flexWrap: "wrap"
    }
  }, _h("span", {
    style: {
      fontSize: 15
    }
  }, "\uD83D\uDCCD"), _h(GymPicker, {
    gyms: gyms,
    activeGym: activeGym,
    onSelect: onSelectGym,
    onAdd: onAddGym
  }))), minimizedWorkout && _h("div", {
    className: "popIn",
    style: {
      margin: "4px 18px 0"
    }
  }, _h("div", {
    className: "press",
    onClick: onResumeWorkout,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 13,
      padding: "14px 16px",
      borderRadius: 18,
      background: "linear-gradient(135deg,rgba(var(--aclr),0.16),rgba(var(--acdr),0.10))",
      border: "1px solid rgba(var(--acr),0.34)"
    }
  }, _h("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 12,
      background: "rgba(var(--acr),0.16)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 20
    }
  }, minimizedWorkout.workout?.emoji || "💪"), _h("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, _h("div", {
    style: {
      fontSize: 10,
      fontWeight: 800,
      letterSpacing: 1,
      color: "var(--ac)"
    }
  }, "SESSION PAUSED \xB7 ", Math.floor((minimizedWorkout.elapsed || 0) / 60), ":", String((minimizedWorkout.elapsed || 0) % 60).padStart(2, "0")), _h("div", {
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: C.text
    }
  }, minimizedWorkout.workout?.name)), _h("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 5,
      color: C.ink,
      background: C.btnGrad,
      padding: "8px 13px",
      borderRadius: 11,
      fontSize: 12,
      fontWeight: 800
    }
  }, "Resume \u25B8")), _h("div", {
    className: "press",
    onClick: () => {
      if (window.confirm("Abandon this workout? All logged sets will be lost.")) onAbandonWorkout();
    },
    style: {
      textAlign: "center",
      marginTop: 8,
      fontSize: 12,
      fontWeight: 700,
      color: C.muted
    }
  }, "Abandon session")), heroAnyData && _h("div", {
    style: {
      margin: "20px 18px 0"
    }
  }, _h("div", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      letterSpacing: 2,
      color: C.muted,
      marginBottom: 10
    }
  }, "MUSCLE ", _h("span", {
    style: {
      color: C.text
    }
  }, "RECOVERY")), _h("div", {
    className: "sora",
    style: {
      fontSize: 18,
      fontWeight: 800,
      lineHeight: 1.25,
      color: heroPending.length === 0 ? C.good : C.text,
      marginBottom: 13
    }
  }, heroPending.length === 0 ? "Fully recovered — ready for anything 💪" : _h(_F, null, heroPending[0].m.name, " needs the most time \u2014 ", _h("span", {
    style: {
      color: recColor(heroPending[0].r.pct)
    }
  }, "~", heroPending[0].r.remainH, "h left"))), _h(Body3D, {
    mode: "recovery",
    heat: heroHeat,
    height: 300
  }), heroPending.length > 0 && _h("div", {
    style: {
      display: "flex",
      gap: 8,
      overflowX: "auto",
      marginTop: 12,
      paddingBottom: 2
    }
  }, heroPending.slice(0, 4).map(({
    m,
    r
  }) => _h("div", {
    key: m.key,
    style: {
      flexShrink: 0,
      padding: "9px 13px",
      borderRadius: 14,
      background: C.glass,
      border: "1px solid " + C.border
    }
  }, _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.text
    }
  }, m.name), _h("div", {
    className: "sora",
    style: {
      fontSize: 12.5,
      fontWeight: 800,
      color: recColor(r.pct),
      marginTop: 2
    }
  }, "~", r.remainH, "h left")))), _h("div", {
    className: "press",
    onClick: () => go("muscles"),
    style: {
      fontSize: 11.5,
      fontWeight: 800,
      color: C.accent,
      marginTop: 12
    }
  }, "Open Body Lab \u2192")), _h("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "22px 18px 0"
    }
  }, _h("div", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      letterSpacing: 2,
      color: C.muted
    }
  }, "QUICK START"), _h("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center"
    }
  }, editSessions && hiddenSess.length > 0 && _h("div", {
    className: "press",
    onClick: () => setHiddenSess([]),
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.accent
    }
  }, "Restore all (", hiddenSess.length, ")"), allWorkouts.length > 0 && _h("div", {
    className: "press",
    onClick: () => setEditSessions(p => !p),
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: editSessions ? C.accent : C.muted
    }
  }, editSessions ? "Done" : "Edit"))), _h("div", {
    style: {
      display: "flex",
      gap: 12,
      overflowX: "auto",
      padding: "0 18px 4px",
      flexWrap: "nowrap"
    }
  }, (() => {
    const recentNames = history.slice(0, 10).map(h => h.workoutName);
    const sorted = [...allWorkouts].filter(w => !hiddenSess.includes(w.id)).sort((a, b) => {
      const af = favSess.includes(a.id),
        bf = favSess.includes(b.id);
      if (af !== bf) return af ? -1 : 1;
      const ai = recentNames.indexOf(a.name);
      const bi = recentNames.indexOf(b.name);
      if (ai === -1 && bi === -1) return 0;
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
    return sorted.slice(0, Math.max(6, favSess.length)).map(w => {
      const isFav = favSess.includes(w.id);
      return _h("div", {
        key: w.id,
        className: "press",
        onClick: () => {
          if (!editSessions) onStart(w, w.coll);
        },
        style: {
          position: "relative",
          minWidth: 150,
          background: C.glass,
          border: "1px solid " + C.border,
          borderRadius: 22,
          padding: 17,
          boxShadow: C.shadow,
          flexShrink: 0
        }
      }, _h("div", {
        className: "press",
        onClick: e => {
          e.stopPropagation();
          toggleFav(w.id);
        },
        style: {
          position: "absolute",
          top: 12,
          right: 12,
          fontSize: 15,
          color: isFav ? C.accent : C.faint
        }
      }, isFav ? "★" : "☆"), editSessions && _h("div", {
        className: "press",
        onClick: e => {
          e.stopPropagation();
          hideSess(w.id);
        },
        style: {
          position: "absolute",
          top: 9,
          left: 9,
          width: 22,
          height: 22,
          borderRadius: 8,
          background: "rgba(226,106,79,0.18)",
          color: C.danger,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          fontWeight: 800
        }
      }, "\u2715"), _h("div", {
        style: {
          fontSize: 30
        }
      }, w.emoji), _h("div", {
        className: "sora",
        style: {
          fontSize: 18,
          fontWeight: 800,
          color: C.text,
          marginTop: 10
        }
      }, w.name), _h("div", {
        style: {
          fontSize: 11,
          color: C.muted,
          marginTop: 3,
          fontWeight: 700
        }
      }, w.collName), _h("div", {
        style: {
          marginTop: 13,
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          padding: "6px 12px",
          borderRadius: 10,
          background: "rgba(var(--acr),0.14)",
          color: C.accent,
          fontSize: 11,
          fontWeight: 800
        }
      }, "Start \u25B8"));
    });
  })(), _h("div", {
    className: "press",
    onClick: () => go("programs"),
    style: {
      minWidth: 110,
      background: "rgba(var(--acr),0.06)",
      border: "1.5px dashed rgba(var(--acr),0.3)",
      borderRadius: 22,
      padding: 14,
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 8
    }
  }, _h("div", {
    style: {
      fontSize: 28
    }
  }, "\uFF0B"), _h("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: C.accent
    }
  }, "Browse"))), _h("div", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      letterSpacing: 2,
      color: C.muted,
      padding: "24px 18px 0"
    }
  }, "TODAY'S ", _h("span", {
    style: {
      color: C.text
    }
  }, "ACTIVITY")), _h("div", {
    style: {
      margin: "13px 18px 0",
      borderRadius: 28,
      padding: "21px 22px",
      background: C.amberGrad,
      boxShadow: "0 18px 40px rgba(var(--acdr),0.3)"
    }
  }, _h("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      color: "rgba(var(--inkr),0.62)",
      fontSize: 12,
      fontWeight: 700
    }
  }, _h("span", null, now.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).toUpperCase()), _h("span", null, streak > 0 ? "🔥 " + streak + " DAY STREAK" : mine.length + " PROGRAMS")), (() => {
    const vols = history.slice(0, 8).reverse().map(h => h.vol || 0);
    if (vols.length < 2) return _h("div", {
      style: {
        height: 56
      }
    });
    const max = Math.max(...vols, 1);
    const pts = vols.map((v, i) => `${(i * (300 / (vols.length - 1))).toFixed(1)},${(74 - v / max * 64).toFixed(1)}`).join(" ");
    return _h("svg", {
      viewBox: "0 0 300 80",
      preserveAspectRatio: "none",
      style: {
        width: "100%",
        height: 62,
        display: "block",
        margin: "8px 0 4px",
        overflow: "visible"
      }
    }, _h("polyline", {
      points: pts,
      style: {
        fill: "none",
        stroke: "#fff",
        strokeWidth: 3.5,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        filter: "drop-shadow(0 4px 6px rgba(140,90,20,.25))"
      }
    }));
  })(), _h("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginTop: 6
    }
  }, _h("div", null, _h("div", {
    className: "sora",
    style: {
      fontWeight: 800,
      fontSize: 26,
      color: C.ink,
      lineHeight: 1
    }
  }, history.reduce((a, h) => a + (h.vol || 0), 0).toLocaleString(), " ", _h("span", {
    style: {
      fontWeight: 600,
      fontSize: 15
    }
  }, "kg")), _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "rgba(var(--inkr),0.62)",
      marginTop: 5
    }
  }, history.length, " sessions logged")), _h("div", {
    style: {
      textAlign: "right"
    }
  }, _h("div", {
    className: "sora",
    style: {
      fontWeight: 800,
      fontSize: 26,
      color: C.ink,
      lineHeight: 1
    }
  }, history.reduce((a, h) => a + (h.dur || 0), 0), " ", _h("span", {
    style: {
      fontWeight: 600,
      fontSize: 15
    }
  }, "min")), _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "rgba(var(--inkr),0.62)",
      marginTop: 5
    }
  }, "total time")))), (() => {
    const others = users.filter(u => u.id !== user.id);
    const live = Object.entries(sessions || {}).filter(([id, s]) => s && s.workout).map(([id, s]) => ({
      u: users.find(x => x.id === id),
      s,
      me: id === user.id
    })).filter(x => x.u);
    const idle = others.filter(u => !(sessions || {})[u.id]?.workout);
    return _h("div", null, _h("div", {
      style: {
        fontSize: 12,
        fontWeight: 800,
        letterSpacing: 2,
        color: C.muted,
        padding: "24px 18px 0"
      }
    }, "NOW ", _h("span", {
      style: {
        color: C.text
      }
    }, "TRAINING"), " ", live.length > 0 && _h("span", {
      style: {
        color: C.good
      }
    }, "\xB7 ", live.length, " live")), _h("div", {
      style: {
        margin: "13px 18px 0"
      }
    }, live.length === 0 && _h("div", {
      style: {
        padding: "14px 16px",
        borderRadius: 16,
        background: C.surface,
        border: "1px solid " + C.border,
        fontSize: 12.5,
        color: C.muted,
        fontWeight: 600,
        textAlign: "center"
      }
    }, "Nobody is training right now. Be the first \uD83D\uDCAA"), live.map(({
      u,
      s,
      me
    }) => {
      const mins = s.startTime ? Math.max(0, Math.floor((nowTick - s.startTime) / 60000)) : null;
      return _h("div", {
        key: u.id,
        style: {
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "13px 15px",
          borderRadius: 18,
          background: "linear-gradient(135deg,rgba(87,192,138,0.10),rgba(87,192,138,0.03))",
          border: "1px solid rgba(87,192,138,0.3)",
          marginBottom: 9
        }
      }, _h("div", {
        style: {
          position: "relative",
          flexShrink: 0
        }
      }, _h(Ava, {
        user: u,
        size: 42
      }), _h("div", {
        style: {
          position: "absolute",
          bottom: -2,
          right: -2,
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: C.good,
          border: "2.5px solid #16120D",
          animation: "mpulse 1.4s ease-in-out infinite"
        }
      })), _h("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, _h("div", {
        style: {
          fontSize: 14,
          fontWeight: 800,
          color: C.text
        }
      }, me ? "You" : u.name, " ", _h("span", {
        style: {
          fontSize: 11,
          fontWeight: 700,
          color: C.good
        }
      }, "\u25CF live")), _h("div", {
        style: {
          fontSize: 11.5,
          color: C.mid,
          fontWeight: 600,
          marginTop: 2,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }
      }, s.workout?.emoji, " ", s.workout?.name, s.gym ? " · 📍 " + s.gym : "", mins != null ? " · " + (mins < 60 ? mins + " min" : Math.floor(mins / 60) + "h " + mins % 60 + "m") : "", s.loggedSets?.length ? " · " + s.loggedSets.length + " sets" : "")), me ? _h("div", {
        className: "press",
        onClick: onResumeWorkout,
        style: {
          padding: "8px 13px",
          borderRadius: 11,
          background: C.btnGrad,
          color: C.ink,
          fontSize: 12,
          fontWeight: 800,
          flexShrink: 0
        }
      }, "Resume") : _h("div", {
        className: "press",
        onClick: () => onToggleSub && onToggleSub(u.id),
        style: {
          fontSize: 18,
          flexShrink: 0,
          opacity: mySubs.includes(u.id) ? 1 : 0.4
        }
      }, mySubs.includes(u.id) ? "🔔" : "🔕"));
    }), idle.length > 0 && _h("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexWrap: "wrap",
        marginTop: 4
      }
    }, _h("span", {
      style: {
        fontSize: 10.5,
        fontWeight: 800,
        letterSpacing: 0.8,
        color: C.faint
      }
    }, "NOTIFY ME WHEN THEY TRAIN:"), idle.map(u => _h("div", {
      key: u.id,
      className: "press",
      onClick: () => onToggleSub && onToggleSub(u.id),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 10px",
        borderRadius: 10,
        background: mySubs.includes(u.id) ? "rgba(var(--acr),0.14)" : C.surface,
        border: "1px solid " + (mySubs.includes(u.id) ? "rgba(var(--acr),0.4)" : C.border),
        fontSize: 11.5,
        fontWeight: 700,
        color: mySubs.includes(u.id) ? C.accent : C.muted
      }
    }, mySubs.includes(u.id) ? "🔔" : "🔕", " ", u.name)))));
  })(), history.length > 0 && _h("div", {
    style: {
      margin: "0 18px 16px"
    }
  }, _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.muted,
      letterSpacing: 1,
      textTransform: "uppercase",
      marginBottom: 10
    }
  }, now.toLocaleString("default", {
    month: "long"
  }), " ", year), _h("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(7,1fr)",
      gap: 4
    }
  }, ["S", "M", "T", "W", "T", "F", "S"].map((d, i) => _h("div", {
    key: i,
    style: {
      textAlign: "center",
      fontSize: 9,
      fontWeight: 800,
      color: C.muted,
      paddingBottom: 2
    }
  }, d)), Array.from({
    length: firstDow
  }).map((_, i) => _h("div", {
    key: "e" + i
  })), calDates.map((date, i) => {
    const hasWorkout = workoutDates.has(date);
    const isToday = date === now.toISOString().slice(0, 10);
    return _h("div", {
      key: date,
      style: {
        textAlign: "center",
        padding: "4px 0",
        borderRadius: 8,
        background: hasWorkout ? C.accent : isToday ? "rgba(var(--acr),0.12)" : "transparent",
        border: isToday && !hasWorkout ? "1.5px solid rgba(var(--acr),0.4)" : "none"
      }
    }, _h("div", {
      style: {
        fontSize: 11,
        fontWeight: hasWorkout ? 800 : 500,
        color: hasWorkout ? "white" : isToday ? C.accentDark : C.muted
      }
    }, i + 1));
  }))), last && _h(_F, null, _h(SecTitle, null, "Last Session"), _h(Card, null, _h("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start"
    }
  }, _h("div", null, _h("div", {
    style: {
      fontSize: 16,
      fontWeight: 800,
      color: C.text
    }
  }, last.workoutName), _h("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginTop: 3,
      fontWeight: 600
    }
  }, last.collectionName, " \xB7 ", last.date, " \xB7 ", last.dur, " min")), _h("div", {
    style: {
      fontSize: 26
    }
  }, "\uD83C\uDFCB\uFE0F")), _h("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 6,
      marginTop: 10
    }
  }, [...new Set(last.sets.map(s => s.ex))].map(ex => _h(Chip, {
    key: ex,
    active: false
  }, ex))), last.vol > 0 && _h("div", {
    style: {
      marginTop: 10,
      fontSize: 12,
      color: C.muted,
      fontWeight: 600
    }
  }, "Volume: ", _h("span", {
    style: {
      color: C.accentDark,
      fontWeight: 800
    }
  }, last.vol.toLocaleString(), " kg")))));
}
function Programs({
  user,
  collections,
  history,
  onStart,
  onAddToAccount,
  onSave,
  allExercises,
  go,
  goBack,
  onEdit
}) {
  const [tab, setTab] = useState("mine");
  const [typeFilter, setTypeFilter] = useState("all");
  const [expanded, setExpanded] = useState({});
  const mine = collections.filter(c => c.owner === user.id);
  const community = collections.filter(c => c.pub && c.owner !== user.id);
  const byType = c => typeFilter === "all" || (c.type || "gym") === typeFilter;
  const list = (tab === "mine" ? mine : community).filter(byType);
  const lastEntry = (history || [])[0] || null;
  let hero = null;
  if (lastEntry) {
    for (const c of mine) {
      const w = (c.workouts || []).find(x => x.name === lastEntry.workoutName);
      if (w) {
        hero = {
          w,
          c
        };
        break;
      }
    }
  }
  const heroAgo = (() => {
    if (!hero) return "";
    const t = lastEntry.ts || Date.parse(lastEntry.date) || Date.now();
    const d = Math.max(0, Math.floor((Date.now() - t) / 86400000));
    return d === 0 ? "last done today" : d === 1 ? "last done yesterday" : "last done " + d + " days ago";
  })();
  const shelf = [];
  list.forEach(c => (c.workouts || []).forEach(w => shelf.push({
    w,
    c
  })));
  return _h("div", {
    style: {
      minHeight: "100vh",
      paddingBottom: 32
    },
    className: "slide"
  }, _h("div", {
    style: {
      background: "#16120D",
      padding: "20px 18px 14px"
    }
  }, _h("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: 36,
      marginBottom: 4
    }
  }, _h("div", {
    style: {
      position: "absolute",
      left: 0
    }
  }, _h(BackBtn, {
    goBack: goBack
  })), _h("div", {
    style: {
      fontSize: 20,
      fontWeight: 900,
      color: C.text
    }
  }, "Programs"), _h("div", {
    style: {
      position: "absolute",
      right: 0
    }
  }, _h(Btn, {
    sm: true,
    onClick: () => onEdit({
      name: "",
      desc: "",
      emoji: "🏆",
      pub: false,
      workouts: [],
      owner: user.id
    })
  }, "+ New"))), _h("div", {
    style: {
      textAlign: "center",
      fontSize: 12,
      color: C.muted,
      fontWeight: 600
    }
  }, "Your collections & community")), hero && _h("div", {
    className: "press",
    onClick: () => onStart(hero.w, hero.c),
    style: {
      margin: "16px 18px 6px",
      borderRadius: 26,
      padding: 18,
      background: C.amberGrad,
      boxShadow: "0 16px 34px rgba(var(--acdr),0.32)"
    }
  }, _h("div", {
    style: {
      fontSize: 10,
      fontWeight: 800,
      letterSpacing: 1.6,
      color: "rgba(var(--inkr),0.62)"
    }
  }, "CONTINUE"), _h("div", {
    style: {
      marginTop: 10,
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, _h("div", {
    style: {
      width: 46,
      height: 46,
      borderRadius: 15,
      background: "rgba(var(--inkr),0.16)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 23,
      flexShrink: 0
    }
  }, hero.w.emoji || "🏋️"), _h("div", {
    style: {
      minWidth: 0
    }
  }, _h("div", {
    className: "sora",
    style: {
      fontWeight: 800,
      fontSize: 19,
      color: C.ink,
      lineHeight: 1.15
    }
  }, hero.w.name), _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "rgba(var(--inkr),0.62)",
      marginTop: 3
    }
  }, hero.c.name, " \xB7 ", heroAgo))), _h("div", {
    className: "sora",
    style: {
      marginTop: 14,
      textAlign: "center",
      padding: "11px 0",
      borderRadius: 13,
      background: "rgba(var(--inkr),0.9)",
      color: "var(--acl)",
      fontWeight: 800,
      fontSize: 13
    }
  }, "Start ", hero.w.name, " \u25B8")), shelf.length > 0 && _h(_F, null, _h("div", {
    style: {
      margin: "22px 18px 0",
      fontSize: 11,
      fontWeight: 800,
      letterSpacing: 2,
      color: C.muted
    }
  }, "JUMP INTO A WORKOUT"), _h("div", {
    style: {
      display: "flex",
      gap: 13,
      overflowX: "auto",
      padding: "14px 18px 10px"
    }
  }, shelf.map(({
    w,
    c
  }, i) => {
    const hi = i === 0;
    const nEx = (w.entries || []).reduce((a, e) => a + (e.type === "ss" ? (e.exercises || []).length : 1), 0);
    return _h("div", {
      key: c.id + "_" + w.id,
      className: "press",
      onClick: () => onStart(w, c),
      style: {
        flex: "none",
        width: 198,
        borderRadius: 26,
        padding: 18,
        background: hi ? C.amberGrad : "#211C15",
        border: hi ? "none" : "1px solid " + C.border,
        boxShadow: hi ? "0 16px 34px rgba(var(--acdr),0.32)" : "none"
      }
    }, _h("div", {
      style: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 8
      }
    }, _h("div", {
      style: {
        width: 42,
        height: 42,
        borderRadius: 14,
        background: hi ? "rgba(var(--inkr),0.16)" : "rgba(var(--acr),0.13)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 21
      }
    }, w.emoji || "🏋️"), _h("div", {
      style: {
        padding: "4px 9px",
        borderRadius: 8,
        background: hi ? "rgba(var(--inkr),0.18)" : "rgba(255,255,255,0.06)",
        color: hi ? C.ink : C.mid,
        fontSize: 9,
        fontWeight: 800,
        letterSpacing: 0.5
      }
    }, (c.type || "gym") === "calisthenics" ? "🤸 CALI" : "🏋️ GYM")), _h("div", {
      className: "sora",
      style: {
        marginTop: 16,
        fontWeight: 800,
        fontSize: 17,
        color: hi ? C.ink : C.text,
        lineHeight: 1.12
      }
    }, w.name), _h("div", {
      style: {
        marginTop: 13,
        fontSize: 10,
        fontWeight: 800,
        letterSpacing: 0.8,
        color: hi ? "rgba(var(--inkr),0.62)" : C.muted,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, nEx, " exercises \xB7 ", c.name), _h("div", {
      className: "sora",
      style: {
        marginTop: 13,
        textAlign: "center",
        padding: "9px 0",
        borderRadius: 11,
        background: hi ? "rgba(var(--inkr),0.9)" : C.btnGrad,
        color: hi ? "var(--acl)" : C.ink,
        fontSize: 12,
        fontWeight: 800
      }
    }, "Start"));
  }))), _h("div", {
    style: {
      display: "flex",
      background: "rgba(255,255,255,0.5)",
      borderRadius: 14,
      padding: 4,
      margin: "0 18px 12px",
      gap: 4
    }
  }, [["mine", "My Programs (" + mine.length + ")"], ["pub", "Community (" + community.length + ")"]].map(([id, label]) => _h("div", {
    key: id,
    className: "press",
    onClick: () => setTab(id),
    style: {
      flex: 1,
      textAlign: "center",
      padding: "9px 0",
      borderRadius: 11,
      background: tab === id ? C.glassHard : "transparent",
      color: tab === id ? C.accent : C.muted,
      fontSize: 13,
      fontWeight: 800,
      transition: "all 0.2s"
    }
  }, label))), _h("div", {
    style: {
      display: "flex",
      gap: 8,
      margin: "0 18px 16px"
    }
  }, [["all", "All"], ["gym", "🏋️ Gym"], ["calisthenics", "🤸 Calisthenics"]].map(([id, label]) => _h("div", {
    key: id,
    className: "press",
    onClick: () => setTypeFilter(id),
    style: {
      padding: "7px 14px",
      borderRadius: 11,
      fontSize: 12,
      fontWeight: 800,
      background: typeFilter === id ? "rgba(var(--acr),0.14)" : "rgba(255,255,255,0.04)",
      border: "1px solid " + (typeFilter === id ? "rgba(var(--acr),0.45)" : C.border),
      color: typeFilter === id ? C.accent : C.muted
    }
  }, label))), list.length === 0 && _h("div", {
    style: {
      textAlign: "center",
      padding: "40px 18px",
      color: C.muted
    }
  }, _h("div", {
    style: {
      fontSize: 44,
      marginBottom: 12
    }
  }, "\uD83D\uDCCB"), _h("div", {
    style: {
      fontSize: 14,
      fontWeight: 700
    }
  }, tab === "mine" ? "Create your first program!" : "No public programs yet.")), list.map(c => _h(Card, {
    key: c.id,
    className: "fadeUp"
  }, _h("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center"
    }
  }, _h("div", {
    style: {
      fontSize: 30
    }
  }, c.emoji), _h("div", {
    style: {
      flex: 1
    }
  }, _h("div", {
    style: {
      fontSize: 16,
      fontWeight: 800,
      color: C.text
    }
  }, c.name), _h("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      fontWeight: 600
    }
  }, c.desc, " \xB7 ", c.workouts.length, " workouts")), _h("div", {
    style: {
      display: "flex",
      gap: 6,
      alignItems: "center"
    }
  }, _h(Chip, {
    active: false,
    style: {
      fontSize: 11
    }
  }, (c.type || "gym") === "calisthenics" ? "🤸" : "🏋️"), c.pub && _h(Chip, {
    style: {
      fontSize: 11
    }
  }, "Public"), c.owner === user.id && _h("div", {
    className: "press",
    onClick: () => onEdit(c),
    style: {
      fontSize: 15,
      padding: "4px 8px",
      borderRadius: 8,
      background: C.accentBg,
      color: C.accentDark
    }
  }, "\u270F\uFE0F"), _h("div", {
    className: "press",
    onClick: () => setExpanded(p => ({
      ...p,
      [c.id]: !p[c.id]
    })),
    style: {
      fontSize: 15,
      padding: "4px 8px",
      borderRadius: 8,
      background: "rgba(255,255,255,0.05)",
      color: C.mid,
      transition: "transform 0.2s",
      display: "inline-block",
      transform: expanded[c.id] ? "rotate(180deg)" : "none"
    }
  }, "\u25BE"))), expanded[c.id] && _h("div", {
    className: "fadeUp",
    style: {
      marginTop: 14
    }
  }, c.workouts.map(w => {
    const entriesWithSuperset = w.entries || [];
    return _h("div", {
      key: w.id,
      style: {
        background: "rgba(255,255,255,0.04)",
        borderRadius: 14,
        padding: "12px 14px",
        marginBottom: 10,
        border: "1px solid " + C.border
      }
    }, _h("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10
      }
    }, _h("div", {
      style: {
        display: "flex",
        gap: 8,
        alignItems: "center"
      }
    }, _h("div", {
      style: {
        fontSize: 20
      }
    }, w.emoji), _h("div", {
      style: {
        fontSize: 14,
        fontWeight: 800,
        color: C.text
      }
    }, w.name)), _h(Btn, {
      sm: true,
      onClick: () => onStart(w, c)
    }, "Start")), (w.entries || []).map(entry => {
      if (entry.type === "ss") {
        return _h("div", {
          key: entry.id,
          style: {
            marginBottom: 6
          }
        }, _h("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 4
          }
        }, _h("span", {
          style: {
            fontSize: 10,
            fontWeight: 800,
            color: C.purple,
            background: "rgba(var(--acr),0.1)",
            borderRadius: 5,
            padding: "2px 7px"
          }
        }, "SS")), entry.exercises.map((ex, i) => _h("div", {
          key: ex.id,
          style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            paddingLeft: 12,
            marginBottom: 3
          }
        }, i > 0 && _h("div", {
          style: {
            width: 2,
            height: 12,
            background: C.supersetBorder,
            borderRadius: 2,
            marginLeft: -8,
            marginRight: 2
          }
        }), _h("div", {
          style: {
            fontSize: 12,
            fontWeight: 700,
            color: C.text
          }
        }, ex.name), _h("div", {
          style: {
            fontSize: 11,
            color: C.muted,
            marginLeft: "auto",
            fontWeight: 600
          }
        }, ex.sets, "\xD7", ex.repsMin, "-", ex.repsMax))));
      }
      return _h("div", {
        key: entry.id,
        style: {
          marginBottom: 6
        }
      }, _h("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8
        }
      }, _h("div", {
        style: {
          width: 6,
          height: 6,
          borderRadius: 3,
          background: C.accent,
          flexShrink: 0,
          marginLeft: 3
        }
      }), _h("div", {
        style: {
          fontSize: 12,
          fontWeight: 700,
          color: C.text
        }
      }, entry.name), _h("div", {
        style: {
          fontSize: 11,
          color: C.muted,
          marginLeft: "auto",
          fontWeight: 600
        }
      }, entry.sets, "\xD7", entry.repsMin, "-", entry.repsMax)));
    }));
  }), c.owner !== user.id && _h(Btn, {
    outline: true,
    sm: true,
    onClick: () => onAddToAccount(c),
    style: {
      marginTop: 4
    }
  }, "Add to My Programs"), c.owner === user.id && _h("div", {
    style: {
      marginTop: 10
    }
  }, _h(Toggle, {
    value: c.pub,
    onChange: v => onSave({
      ...c,
      pub: v
    }),
    label: c.pub ? "Public" : "Private"
  }))))));
}
function setVolume(s) {
  if (!s) return 0;
  if (s.drops && s.drops.length) return s.drops.reduce((a, d) => a + (d.kg || 0) * (d.reps || 0), 0);
  return (s.kg || 0) * (s.reps || 0);
}
function getPR(history, exName) {
  let max = 0;
  (history || []).forEach(session => {
    (session.sets || []).forEach(s => {
      if (s.ex !== exName) return;
      const top = s.drops && s.drops.length ? Math.max(...s.drops.map(d => d.kg || 0)) : s.kg;
      if (top > max) max = top;
    });
  });
  return max;
}
function EditableSet({
  s,
  realIdx,
  onSave
}) {
  const [editing, setEditing] = useState(false);
  const [eKg, setEKg] = useState(String(s.kg));
  const [eReps, setEReps] = useState(String(s.reps));
  const save = () => {
    onSave(realIdx, parseFloat(eKg) || 0, parseInt(eReps) || 0);
    setEditing(false);
  };
  if (s.drops && s.drops.length) return _h("div", {
    style: {
      padding: "8px 0",
      borderBottom: "1px solid rgba(255,255,255,0.04)"
    }
  }, _h("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 4
    }
  }, _h("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: C.text
    }
  }, s.ssId && _h("span", {
    style: {
      fontSize: 10,
      color: C.purple,
      fontWeight: 800,
      marginRight: 6
    }
  }, "SS"), s.ex, " ", _h("span", {
    style: {
      fontSize: 10,
      color: "var(--acd)",
      fontWeight: 800,
      marginLeft: 4
    }
  }, "\uD83D\uDD3B DROPSET")), _h("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted
    }
  }, setVolume(s).toFixed(0), " kg")), _h("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 5
    }
  }, s.drops.map((d, i) => _h("span", {
    key: i,
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "var(--acd)",
      background: "rgba(var(--acr),0.12)",
      borderRadius: 7,
      padding: "3px 8px"
    }
  }, d.kg, "\xD7", d.reps))), (s.note || s.feel) && _h("div", {
    style: {
      fontSize: 11,
      color: C.mid,
      marginTop: 3,
      fontWeight: 600
    }
  }, s.feel && _h("span", {
    style: {
      color: feelMeta(s.feel)?.col,
      fontWeight: 800,
      marginRight: s.note ? 6 : 0
    }
  }, feelMeta(s.feel)?.name), s.note));
  if (editing) return _h("div", {
    className: "popIn",
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center",
      padding: "8px 0",
      borderBottom: "1px solid rgba(255,255,255,0.04)"
    }
  }, _h("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: C.text,
      flex: 1,
      minWidth: 0,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, s.ex), _h("input", {
    type: "number",
    value: eKg,
    onChange: e => setEKg(e.target.value),
    style: {
      width: 58,
      padding: "5px 6px",
      borderRadius: 8,
      border: "1.5px solid " + C.accent,
      fontSize: 13,
      fontWeight: 700,
      color: C.text,
      textAlign: "center",
      outline: "none"
    }
  }), _h("span", {
    style: {
      fontSize: 12,
      color: C.muted
    }
  }, "\xD7"), _h("input", {
    type: "number",
    value: eReps,
    onChange: e => setEReps(e.target.value),
    style: {
      width: 48,
      padding: "5px 6px",
      borderRadius: 8,
      border: "1.5px solid " + C.accent,
      fontSize: 13,
      fontWeight: 700,
      color: C.text,
      textAlign: "center",
      outline: "none"
    }
  }), _h("div", {
    className: "press",
    onClick: save,
    style: {
      fontSize: 16,
      color: C.accent,
      fontWeight: 800,
      padding: "4px 6px"
    }
  }, "\u2713"), _h("div", {
    className: "press",
    onClick: () => setEditing(false),
    style: {
      fontSize: 14,
      color: C.muted,
      padding: "4px 6px"
    }
  }, "\u2715"));
  return _h("div", {
    className: "press",
    onClick: () => {
      setEKg(String(s.kg));
      setEReps(String(s.reps));
      setEditing(true);
    },
    style: {
      padding: "8px 0",
      borderBottom: "1px solid rgba(255,255,255,0.04)"
    }
  }, _h("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, _h("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: C.text
    }
  }, s.ssId && _h("span", {
    style: {
      fontSize: 10,
      color: C.purple,
      fontWeight: 800,
      marginRight: 6
    }
  }, "SS"), s.ex), _h("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, _h(Chip, null, s.kg, "kg \xD7 ", s.reps), _h("span", {
    style: {
      fontSize: 11,
      color: C.muted
    }
  }, "\u270F\uFE0F"))), (s.note || s.feel) && _h("div", {
    style: {
      fontSize: 11,
      color: C.mid,
      marginTop: 3,
      fontWeight: 600
    }
  }, s.feel && _h("span", {
    style: {
      color: feelMeta(s.feel)?.col,
      fontWeight: 800,
      marginRight: s.note ? 6 : 0
    }
  }, feelMeta(s.feel)?.name), s.note));
}
const FEEL_LEVELS = [{
  v: 1,
  name: "EASY",
  hint: "Could do many more",
  col: "#57C08A"
}, {
  v: 2,
  name: "LIGHT",
  hint: "3–4 reps left",
  col: "#9BC85F"
}, {
  v: 3,
  name: "SOLID",
  hint: "2–3 reps left",
  col: "#F2B33D"
}, {
  v: 4,
  name: "HARD",
  hint: "1–2 reps left",
  col: "#E8883F"
}, {
  v: 5,
  name: "FAILURE",
  hint: "Nothing left",
  col: "#E26A4F"
}];
const feelMeta = v => FEEL_LEVELS[(v || 0) - 1] || null;
function FeelSlider({
  value,
  onChange
}) {
  const trackRef = useRef(null);
  const draggingRef = useRef(false);
  const PAD = 11;
  const pick = clientX => {
    const el = trackRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - r.left - PAD, 0), r.width - PAD * 2);
    const w = r.width - PAD * 2;
    const v = w <= 0 ? 1 : Math.min(5, Math.max(1, Math.round(x / w * 4) + 1));
    if (v !== value) onChange(v);
  };
  const onDown = e => {
    draggingRef.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {}
    pick(e.clientX);
  };
  const onMove = e => {
    if (draggingRef.current) pick(e.clientX);
  };
  const onUp = () => {
    draggingRef.current = false;
  };
  const lvl = feelMeta(value);
  const frac = value ? (value - 1) / 4 : 0;
  return _h("div", null, _h("div", {
    style: {
      textAlign: "center",
      height: 26,
      marginBottom: 6
    }
  }, lvl ? _h("span", null, _h("span", {
    className: "sora",
    style: {
      fontWeight: 800,
      fontSize: 19,
      letterSpacing: -0.4,
      color: lvl.col
    }
  }, lvl.name), _h("span", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: C.muted,
      marginLeft: 8
    }
  }, lvl.hint), _h("span", {
    className: "press",
    onClick: () => onChange(null),
    style: {
      fontSize: 9.5,
      fontWeight: 800,
      color: C.faint,
      background: "rgba(255,255,255,0.05)",
      borderRadius: 7,
      padding: "3px 8px",
      marginLeft: 10,
      verticalAlign: "2px"
    }
  }, "CLEAR")) : _h("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 700,
      color: C.faint
    }
  }, "Drag to rate")), _h("div", {
    ref: trackRef,
    onPointerDown: onDown,
    onPointerMove: onMove,
    onPointerUp: onUp,
    onPointerCancel: onUp,
    style: {
      position: "relative",
      height: 38,
      display: "flex",
      alignItems: "center",
      padding: "0 " + PAD + "px",
      touchAction: "none",
      cursor: "pointer"
    }
  }, _h("div", {
    style: {
      position: "absolute",
      left: PAD,
      right: PAD,
      height: 3,
      borderRadius: 2,
      background: "rgba(255,255,255,0.09)"
    }
  }), value && _h("div", {
    style: {
      position: "absolute",
      left: PAD,
      height: 3,
      borderRadius: 2,
      background: lvl.col,
      width: "calc((100% - " + PAD * 2 + "px) * " + frac + ")",
      transition: draggingRef.current ? "none" : "width .15s"
    }
  }), FEEL_LEVELS.map((l, i) => _h("div", {
    key: l.v,
    style: {
      position: "absolute",
      left: "calc(" + PAD + "px + (100% - " + PAD * 2 + "px) * " + i / 4 + ")",
      transform: "translateX(-50%)",
      width: 6,
      height: 6,
      borderRadius: 3,
      background: value && l.v <= value ? lvl.col : "rgba(255,255,255,0.18)",
      transition: "background .15s"
    }
  })), value && _h("div", {
    style: {
      position: "absolute",
      left: "calc(" + PAD + "px + (100% - " + PAD * 2 + "px) * " + frac + ")",
      transform: "translateX(-50%)",
      width: 22,
      height: 22,
      borderRadius: 11,
      background: lvl.col,
      boxShadow: "0 0 0 5px " + lvl.col + "22, 0 3px 10px rgba(0,0,0,0.4)",
      transition: draggingRef.current ? "none" : "left .15s"
    }
  })), _h("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 2,
      fontSize: 9.5,
      fontWeight: 700,
      color: C.faint
    }
  }, _h("span", null, "Easy"), _h("span", null, "Failure")));
}
const CHECK_LEVELS = [{
  level: 1,
  t: "FRESH",
  s: "no soreness",
  c: "#57C08A"
}, {
  level: 2,
  t: "A BIT",
  s: "slightly tired",
  c: "#9BC85F"
}, {
  level: 3,
  t: "SORE",
  s: "noticeably fatigued",
  c: "#E8883F"
}, {
  level: 4,
  t: "WRECKED",
  s: "deep soreness",
  c: "#E26A4F"
}];
function ReadinessCheck({
  muscleName,
  agoH,
  expectPct,
  onPick,
  onSkip
}) {
  const [picked, setPicked] = useState(null);
  return _h("div", {
    style: {
      margin: "10px 18px 2px",
      padding: "14px 15px",
      borderRadius: 18,
      background: C.surface,
      border: "1px solid " + C.border
    }
  }, _h("div", {
    className: "sora",
    style: {
      fontSize: 14.5,
      fontWeight: 800,
      color: C.text
    }
  }, "How ", muscleName === "Abs" ? "do" : "does", " your ", muscleName.toLowerCase(), " feel?"), _h("div", {
    style: {
      fontSize: 11.5,
      color: C.muted,
      fontWeight: 600,
      marginTop: 2,
      marginBottom: 12
    }
  }, "Trained ", agoH, "h ago \xB7 engine expects ~", expectPct, "% recovered"), _h("div", {
    style: {
      display: "flex",
      gap: 7
    }
  }, CHECK_LEVELS.map(l => _h("div", {
    key: l.level,
    className: "press",
    onClick: () => {
      if (picked != null) return;
      setPicked(l.level);
      setTimeout(() => onPick(l.level), 260);
    },
    style: {
      flex: 1,
      textAlign: "center",
      padding: "10px 3px",
      borderRadius: 13,
      border: "1px solid " + (picked === l.level ? l.c : C.border),
      background: picked === l.level ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
      boxShadow: picked === l.level ? "0 0 0 1px " + l.c + " inset" : "none"
    }
  }, _h("div", {
    className: "sora",
    style: {
      fontSize: 11.5,
      fontWeight: 800,
      color: l.c
    }
  }, l.t), _h("div", {
    style: {
      fontSize: 9,
      color: C.muted,
      fontWeight: 600,
      marginTop: 2
    }
  }, l.s)))), _h("div", {
    className: "press",
    onClick: onSkip,
    style: {
      textAlign: "center",
      marginTop: 10,
      fontSize: 11.5,
      fontWeight: 700,
      color: C.muted
    }
  }, "Skip - let the engine guess"));
}
function ActiveWorkout({
  workout,
  collection,
  onFinish,
  allExercises,
  history,
  onMinimize,
  minimizedState,
  onHowTo,
  gym = "",
  gyms = [],
  onSelectGym,
  onAddGym,
  onPersist,
  bodyKg = 0,
  myCheckins = [],
  onCheckin,
  v4 = null
}) {
  const [extraEntries, setExtraEntries] = useState([]);
  const steps = useMemo(() => {
    const result = [];
    for (const entry of workout?.entries || []) {
      if (!entry) continue;
      if (entry.type === "ss") {
        const exList = entry.exercises || [];
        exList.forEach((ex, i) => {
          result.push({
            ex,
            ssId: entry.id,
            ssExercises: exList,
            ssExIdx: i
          });
        });
      } else {
        result.push({
          ex: entry
        });
      }
    }
    for (const entry of extraEntries) result.push({
      ex: entry,
      extra: true
    });
    return result;
  }, [workout, extraEntries]);
  const [loggedSets, setLoggedSets] = useState([]);
  const [checkQueue, setCheckQueue] = useState(() => {
    try {
      if (minimizedState) return [];
      const rec = computeRecovery(history, null, {
        bw: bodyKg,
        checkins: myCheckins
      });
      const asked = new Set(myCheckins.filter(c => Date.now() - c.ts < 12 * 3600e3).map(c => c.muscle));
      const onMenu = new Set();
      for (const st of steps) Object.entries(metaFor(st.ex.name || "").muscles).forEach(([k, c]) => {
        if (c >= 0.6) onMenu.add(k);
      });
      return [...onMenu].filter(k => rec[k] && rec[k].readiness < 95 && !asked.has(k)).sort((a, b) => rec[a].readiness - rec[b].readiness).slice(0, 2).map(k => ({
        k,
        name: MUSCLE_BY_KEY[k].name,
        agoH: Math.max(1, Math.round((Date.now() - rec[k].t) / 3600e3)),
        expectPct: rec[k].readiness
      }));
    } catch (e) {
      return [];
    }
  });
  const [position, setPosition] = useState(0);
  const [stepOrder, setStepOrder] = useState(() => steps.map((_, i) => i));
  const [completedOriginalIdxs, setCompletedOriginalIdxs] = useState(new Set());
  const [switchedNames, setSwitchedNames] = useState({});
  const [setNum, setSetNum] = useState(1);
  const [kg, setKg] = useState("");
  const [reps, setReps] = useState("");
  const [note, setNote] = useState("");
  const [showNote, setShowNote] = useState(false);
  const [feel, setFeel] = useState(null);
  const [phase, setPhase] = useState("training");
  const [restSecs, setRestSecs] = useState(90);
  const [restEndsAt, setRestEndsAt] = useState(0);
  const [nowTick, setNowTick] = useState(() => Date.now());
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef(Date.now());
  const [showSwitch, setShowSwitch] = useState(false);
  const [switchName, setSwitchName] = useState("");
  const [skippedSteps, setSkippedSteps] = useState(new Set());
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);
  const [switchMode, setSwitchMode] = useState("replace");
  const [dropMode, setDropMode] = useState(false);
  const [drops, setDrops] = useState([]);
  const restDoneRef = useRef(false);
  const [soundArmed, setSoundArmed] = useState(() => {
    try {
      return localStorage.getItem("ironlog_sound") !== "0";
    } catch (e) {
      return true;
    }
  });
  const soundRef = useRef(soundArmed);
  useEffect(() => {
    soundRef.current = soundArmed;
  }, [soundArmed]);
  const toggleSound = () => setSoundArmed(p => {
    const n = !p;
    try {
      localStorage.setItem("ironlog_sound", n ? "1" : "0");
    } catch (e) {}
    if (!n) keepAliveAudio(false);
    return n;
  });
  const [addOpen, setAddOpen] = useState(false);
  const [addName, setAddName] = useState("");
  const [addSets, setAddSets] = useState(3);
  const [addMin, setAddMin] = useState(8);
  const [addMax, setAddMax] = useState(12);
  const lastActionRef = useRef(Date.now());
  const nudgedRef = useRef(false);
  const [nudge, setNudge] = useState(false);
  const [confirmSkip, setConfirmSkip] = useState(null);
  const [confirmFinish, setConfirmFinish] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [editKg, setEditKg] = useState("");
  const [editReps, setEditReps] = useState("");
  const touch = () => {
    lastActionRef.current = Date.now();
    nudgedRef.current = false;
    setNudge(false);
  };
  useEffect(() => {
    const iv = setInterval(() => {
      if (Date.now() - lastActionRef.current > 10 * 60 * 1000 && !nudgedRef.current) {
        nudgedRef.current = true;
        setNudge(true);
        playPop(2);
        notify("Still training? 💪", "10 min with no activity — log a set or finish the workout. We're not here to chill!", "nudge");
      }
    }, 30000);
    const onVis = () => {
      if (!document.hidden && Date.now() - lastActionRef.current > 10 * 60 * 1000 && !nudgedRef.current) {
        nudgedRef.current = true;
        setNudge(true);
        playPop(2);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearInterval(iv);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);
  const addSessionExercise = () => {
    const n = addName.trim();
    if (!n) return;
    const entry = mkEx(n, Math.max(1, addSets || 3), Math.max(1, addMin || 8), Math.max(1, addMax || 12));
    const newIdx = steps.length;
    setExtraEntries(p => [...p, entry]);
    setStepOrder(p => [...p, newIdx]);
    setAddOpen(false);
    setAddName("");
    touch();
  };
  const getLastTime = exName => {
    if (!history || !exName) return null;
    const scan = mustMatchGym => {
      for (const session of history) {
        let sets = session.sets.filter(s => s.ex === exName);
        if (mustMatchGym) sets = sets.filter(s => (s.gym || session.gym || "") === gym);
        if (sets.length === 0) continue;
        const weights = sets.flatMap(s => s.drops?.length ? s.drops.map(d => d.kg) : [s.kg]).filter(k => k > 0);
        const allReps = sets.flatMap(s => s.drops?.length ? s.drops.map(d => d.reps) : [s.reps]).filter(r => r > 0);
        if (weights.length === 0) continue;
        const avgKg = weights.reduce((a, b) => a + b, 0) / weights.length;
        const avgReps = allReps.length > 0 ? allReps.reduce((a, b) => a + b, 0) / allReps.length : 0;
        const maxKg = Math.max(...weights);
        const notes = sets.filter(s => s.note).map(s => s.note);
        return {
          date: session.date,
          gym: session.gym || null,
          sets: sets.length,
          avgKg: Math.round(avgKg * 10) / 10,
          maxKg,
          avgReps: Math.round(avgReps * 10) / 10,
          notes,
          sameGym: mustMatchGym
        };
      }
      return null;
    };
    return gym && scan(true) || scan(false);
  };
  const restoredRef = useRef(false);
  useEffect(() => {
    if (minimizedState && !restoredRef.current) {
      restoredRef.current = true;
      setLoggedSets(minimizedState.loggedSets || []);
      setPosition(minimizedState.position || 0);
      setStepOrder(minimizedState.stepOrder || steps.map((_, i) => i));
      setSetNum(minimizedState.setNum || 1);
      setKg(minimizedState.kg || "");
      setReps(minimizedState.reps || "");
      setNote(minimizedState.note || "");
      setFeel(minimizedState.feel || null);
      setRestSecs(minimizedState.restSecs || 90);
      if (minimizedState.phase === "rest" && minimizedState.restEndsAt && minimizedState.restEndsAt > Date.now()) {
        setRestEndsAt(minimizedState.restEndsAt);
        setPhase("rest");
      }
      setDropMode(!!minimizedState.dropMode);
      setDrops(minimizedState.drops || []);
      setSkippedSteps(new Set(minimizedState.skippedSteps || []));
      setCompletedOriginalIdxs(new Set(minimizedState.completedOriginalIdxs || []));
      setSwitchedNames(minimizedState.switchedNames || {});
      setExtraEntries(minimizedState.extraEntries || []);
      if (minimizedState.startTime) startRef.current = minimizedState.startTime;
    }
  }, []);
  useEffect(() => {
    const tick = () => setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
    tick();
    const iv = setInterval(tick, 1000);
    const onVis = () => {
      if (!document.hidden) tick();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearInterval(iv);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);
  useEffect(() => {
    if (phase !== "rest") {
      keepAliveAudio(false);
      return;
    }
    restDoneRef.current = false;
    if (soundRef.current) keepAliveAudio(true);
    const done = () => {
      if (soundRef.current) playPop(2);
      const nx = steps[stepOrder[position]]?.ex;
      notify("⏱ Rest done — GO!", nx ? "Next: " + (switchedNames[stepOrder[position]] || nx.name) : "Back to work", "rest");
    };
    const tick = () => {
      const rem = restEndsAt ? Math.ceil((restEndsAt - Date.now()) / 1000) : 0;
      if (rem <= 0) {
        if (!restDoneRef.current) {
          restDoneRef.current = true;
          done();
        }
        keepAliveAudio(false);
        setRestEndsAt(0);
        setPhase("training");
      } else {
        setNowTick(Date.now());
      }
    };
    tick();
    const iv = setInterval(tick, 250);
    const onVis = () => {
      if (!document.hidden) tick();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearInterval(iv);
      document.removeEventListener("visibilitychange", onVis);
      keepAliveAudio(false);
    };
  }, [phase, restEndsAt]);
  const currentOriginalIdx = stepOrder[position] ?? 0;
  const curStep = steps[currentOriginalIdx];
  if (!curStep) return null;
  const curEntry = curStep?.ex ? {
    ...curStep.ex,
    name: switchedNames[currentOriginalIdx] || curStep.ex.name
  } : null;
  const ssId = curStep?.ssId;
  const ssExercises = curStep?.ssExercises || [];
  const ssExIdx = curStep?.ssExIdx ?? -1;
  const isLastInSS = ssId ? ssExIdx === ssExercises.length - 1 : true;
  const plannedSets = curEntry?.sets || 3;
  useEffect(() => {
    if (!curEntry) return;
    const last = getLastTime(curEntry.name);
    if (last) setKg(String(last.avgKg));else setKg("");
    setNote("");
    setShowNote(false);
    setFeel(null);
    setDropMode(false);
    setDrops([]);
  }, [position, gym]);
  const startRest = () => {
    setRestEndsAt(Date.now() + restSecs * 1000);
    setPhase("rest");
  };
  const resetEntryInputs = () => {
    setReps("");
    setNote("");
    setFeel(null);
    setDropMode(false);
    setDrops([]);
  };
  const advance = rest => {
    if (ssId && !isLastInSS) {
      setPosition(p => p + 1);
      return;
    }
    if (setNum < plannedSets) {
      if (ssId) {
        const firstPos = stepOrder.findIndex(origIdx => steps[origIdx]?.ssId === ssId);
        setPosition(firstPos >= 0 ? firstPos : position);
      }
      setSetNum(n => n + 1);
      if (rest) startRest();else setPhase("training");
    } else {
      setCompletedOriginalIdxs(p => {
        const next = new Set([...p, currentOriginalIdx]);
        if (ssId) stepOrder.forEach(origIdx => {
          if (steps[origIdx]?.ssId === ssId) next.add(origIdx);
        });
        return next;
      });
      const nextPos = position + 1;
      if (nextPos < stepOrder.length) {
        setPosition(nextPos);
        setSetNum(1);
        if (rest) startRest();else setPhase("training");
      } else {
        finishWorkout();
      }
    }
  };
  const lastLogRef = useRef(0);
  const logSet = () => {
    if (Date.now() - lastLogRef.current < 600) return;
    lastLogRef.current = Date.now();
    let newSet;
    if (dropMode) {
      const all = [...drops];
      const pk = parseFloat(kg),
        pr = parseInt(reps);
      if (!isNaN(pr) && pr > 0) all.push({
        kg: isNaN(pk) ? 0 : pk,
        reps: pr
      });
      if (all.length === 0) return;
      newSet = {
        ex: curEntry.name,
        kg: all[0].kg,
        reps: all[0].reps,
        drops: all,
        isDropset: true,
        note: note.trim() || null,
        feel: feel || null,
        ssId: ssId || null,
        gym: gym || null,
        at: Date.now(),
        restSecs
      };
    } else {
      if (reps === '' || reps === null || reps === undefined) return;
      newSet = {
        ex: curEntry.name,
        kg: parseFloat(kg) || 0,
        reps: parseInt(reps) || 0,
        note: note.trim() || null,
        feel: feel || null,
        ssId: ssId || null,
        gym: gym || null,
        at: Date.now(),
        restSecs
      };
    }
    setLoggedSets(p => [...p, newSet]);
    setKg(String(newSet.kg || 0));
    resetEntryInputs();
    touch();
    advance(true);
  };
  const addDrop = () => {
    const k = parseFloat(kg),
      r = parseInt(reps);
    if (isNaN(r) || r <= 0) return;
    setDrops(d => [...d, {
      kg: isNaN(k) ? 0 : k,
      reps: r
    }]);
    touch();
    setReps("");
  };
  const skipSet = () => {
    resetEntryInputs();
    touch();
    advance(false);
  };
  const finishWorkout = (force = false) => {
    if (!force && loggedSets.length === 0) {
      if (!window.confirm("You haven't logged any sets. Finish anyway?")) return;
    }
    const dur = Math.max(1, Math.floor(elapsed / 60));
    const vol = loggedSets.reduce((a, s) => a + setVolume(s), 0);
    onFinish(loggedSets, dur, Math.round(vol), gym);
  };
  const snapshot = () => ({
    workout,
    collection,
    loggedSets,
    position,
    stepOrder,
    setNum,
    kg,
    reps,
    note,
    feel,
    phase,
    restSecs,
    restEndsAt,
    dropMode,
    drops,
    gym,
    extraEntries,
    skippedSteps: [...skippedSteps],
    completedOriginalIdxs: [...completedOriginalIdxs],
    switchedNames,
    startTime: startRef.current,
    elapsed,
    updatedAt: Date.now()
  });
  const handleMinimize = () => {
    onMinimize(snapshot());
  };
  const skipExercise = () => {
    touch();
    setSkippedSteps(p => new Set([...p, currentOriginalIdx]));
    const nextPos = position + 1;
    if (nextPos < stepOrder.length) {
      setPosition(nextPos);
      setSetNum(1);
      setPhase("training");
    } else {
      finishWorkout();
    }
  };
  const snapRef = useRef(null);
  snapRef.current = snapshot();
  useEffect(() => {
    if (onPersist) onPersist(snapshot());
  }, [loggedSets, position, stepOrder, setNum, phase, restEndsAt, dropMode, drops, gym, skippedSteps, completedOriginalIdxs, switchedNames, extraEntries]);
  useEffect(() => {
    const flush = () => {
      try {
        onPersist && onPersist(snapRef.current, true);
      } catch (e) {}
    };
    const onVis = () => {
      if (document.hidden) flush();
    };
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);
  const confirmSwitch = () => {
    if (!switchName.trim()) return;
    setSwitchedNames(p => ({
      ...p,
      [currentOriginalIdx]: switchName.trim()
    }));
    setShowSwitch(false);
    setSwitchName("");
    setKg("");
    setReps("");
  };
  const swapWithStep = targetOriginalIdx => {
    const newOrder = [...stepOrder];
    const curSsId = curStep?.ssId;
    let curPositions = [];
    if (curSsId) {
      newOrder.forEach((origIdx, pos) => {
        if (pos >= position && steps[origIdx]?.ssId === curSsId) {
          curPositions.push(pos);
        }
      });
      curPositions = curPositions.filter(p => p >= position);
    } else {
      curPositions = [position];
    }
    const targetOrigStep = steps[targetOriginalIdx];
    const targetSsId = targetOrigStep?.ssId;
    let targetPositions = [];
    if (targetSsId) {
      newOrder.forEach((origIdx, pos) => {
        if (steps[origIdx]?.ssId === targetSsId && !completedOriginalIdxs.has(origIdx) && !skippedSteps.has(origIdx)) {
          targetPositions.push(pos);
        }
      });
      targetPositions = targetPositions.filter(p => p > position);
    } else {
      const targetPos = newOrder.findIndex(i => i === targetOriginalIdx);
      if (targetPos !== -1) targetPositions = [targetPos];
    }
    if (targetPositions.length === 0) return;
    const curBlock = curPositions.map(p => newOrder[p]);
    const targetBlock = targetPositions.map(p => newOrder[p]);
    const finalOrder = [...newOrder];
    curPositions.forEach((pos, i) => {
      finalOrder[pos] = i < targetBlock.length ? targetBlock[i] : null;
    });
    targetPositions.forEach((pos, i) => {
      finalOrder[pos] = i < curBlock.length ? curBlock[i] : null;
    });
    const packed = finalOrder.filter(x => x !== null);
    setStepOrder(packed);
    setSetNum(1);
    setPhase("training");
    setShowSwitch(false);
  };
  const orderedSteps = stepOrder.map(i => steps[i]);
  const timer = phase === "rest" && restEndsAt ? Math.max(0, Math.ceil((restEndsAt - nowTick) / 1000)) : 0;
  const pct = restSecs > 0 ? (restSecs - timer) / restSecs * 360 : 360;
  const progress = steps.length > 0 ? Math.round(position / steps.length * 100) : 0;
  if (v4) {
    const awUi = {
      steps,
      stepOrder,
      position,
      setNum,
      kg,
      reps,
      note,
      showNote,
      feel,
      phase,
      restSecs,
      restEndsAt,
      nowTick,
      elapsed,
      loggedSets,
      dropMode,
      drops,
      nudge,
      addOpen,
      addName,
      addSets,
      addMin,
      addMax,
      switchedNames,
      skippedSteps,
      completedOriginalIdxs,
      soundArmed
    };
    const awOn = {
      minimize: handleMinimize,
      finishWorkout: () => finishWorkout(),
      howTo: onHowTo,
      setKg,
      setReps,
      setNote,
      toggleNote: () => setShowNote(p => !p),
      setFeel,
      setRestSecs,
      bumpKg: (dir, exName) => setKg(prev => {
        const st = kgStepFor(exName);
        const next = (parseFloat(prev) || 0) + dir * st;
        return String(Math.max(0, roundKg(next, exName)));
      }),
      bumpReps: dir => setReps(prev => String(Math.max(0, (parseInt(prev) || 0) + dir))),
      toggleDropMode: () => setDropMode(p => !p),
      addDrop,
      removeDrop: i => setDrops(p => p.filter((_, j) => j !== i)),
      logSet,
      skipSet: () => setConfirmSkip("set"),
      skipExercise: () => setConfirmSkip("exercise"),
      toggleSwitch: () => setShowSwitch(p => !p),
      jumpToPosition: pos => setPosition(pos),
      addRest: () => setRestEndsAt(t => t + 15000),
      skipRest: () => {
        setPhase("training");
        setRestEndsAt(0);
      },
      toggleSound,
      nudgeStill: () => setNudge(false),
      toggleAddPanel: () => setAddOpen(p => !p),
      setAddName,
      setAddSets,
      setAddMin,
      setAddMax,
      addSessionExercise,
      reorder: (from, to) => setStepOrder(prev => {
        if (from === to || from < 0 || to < 0 || from >= prev.length || to >= prev.length) return prev;
        const next = [...prev];
        const [moved] = next.splice(from, 1);
        next.splice(to, 0, moved);
        setPosition(p => {
          if (p === from) return to;
          if (from < p && to >= p) return p - 1;
          if (from > p && to <= p) return p + 1;
          return p;
        });
        return next;
      })
    };
    let aw;
    try {
      aw = buildAw({
        activeWorkout: {
          workout,
          collection
        },
        activeGym: gym,
        history,
        allExercises,
        user: v4.user,
        ui: awUi,
        on: awOn,
        rec: v4._rec || {}
      });
    } catch (e) {
      console.error("buildAw failed", e);
      aw = null;
    }
    if (aw) {
      const vv = {
        ...v4,
        aw
      };
      const programAlternatives = steps.map((st, origIdx) => ({
        origIdx,
        name: switchedNames[origIdx] || st.ex && st.ex.name || ""
      })).filter(x => x.name && x.origIdx !== currentOriginalIdx);
      const doReplaceWith = name => {
        setSwitchedNames(p => ({
          ...p,
          [currentOriginalIdx]: name
        }));
        setShowSwitch(false);
        setSwitchName("");
        setKg("");
        setReps("");
      };
      const saveEdit = () => {
        const k = parseFloat(editKg),
          r = parseInt(editReps);
        setLoggedSets(prev => prev.map((x, i) => i === editIdx ? {
          ...x,
          kg: Number.isFinite(k) ? k : x.kg,
          reps: Number.isFinite(r) ? r : x.reps
        } : x));
        setEditIdx(null);
        touch();
      };
      const deleteLogged = i => {
        setLoggedSets(prev => prev.filter((_, j) => j !== i));
        setEditIdx(null);
        touch();
      };
      const sheet = (title, body) => _h("div", {
        style: {
          position: "fixed",
          inset: 0,
          zIndex: 95,
          background: "rgba(8,6,4,.62)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 22,
          animation: "fadeIn .2s ease both"
        },
        onClick: e => {
          if (e.target === e.currentTarget) {
            setConfirmSkip(null);
            setShowSwitch(false);
            setEditIdx(null);
            setConfirmFinish(false);
          }
        }
      }, _h("div", {
        style: {
          width: "100%",
          maxWidth: 420,
          background: "#1B1712",
          borderRadius: 26,
          padding: "22px 20px 20px",
          boxShadow: "0 30px 80px rgba(0,0,0,.6)",
          animation: "pop .32s cubic-bezier(.2,.9,.25,1) both"
        }
      }, _h("div", {
        className: "sora",
        style: {
          fontSize: 18,
          fontWeight: 800,
          color: "#F4ECDD",
          marginBottom: 6
        }
      }, title), body));
      return _h(_F, null, checkQueue.length > 0 && loggedSets.length === 0 && _h("div", {
        style: {
          position: "relative",
          zIndex: 5,
          maxWidth: 600,
          margin: "0 auto",
          padding: "10px 22px 0"
        }
      }, _h(ReadinessCheck, {
        key: checkQueue[0].k,
        muscleName: checkQueue[0].name,
        agoH: checkQueue[0].agoH,
        expectPct: checkQueue[0].expectPct,
        onPick: lvl => {
          onCheckin && onCheckin(checkQueue[0].k, lvl);
          setCheckQueue(q => q.slice(1));
        },
        onSkip: () => setCheckQueue([])
      })), _h(DActiveV5, {
        v: vv,
        onFinishAsk: () => setConfirmFinish(true)
      }), _h(DRestOverlay, {
        v: vv
      }), confirmFinish && sheet("Finish this workout?", _h(_F, null, _h("div", {
        style: {
          fontSize: 13,
          color: "#A99E8C",
          fontWeight: 600,
          lineHeight: 1.5
        }
      }, aw.remainingCount > 0 ? _h(_F, null, "You still have ", _h("strong", {
        style: {
          color: "#F4ECDD"
        }
      }, aw.remainingCount, " exercise", aw.remainingCount === 1 ? "" : "s"), " left in the plan.") : _h(_F, null, "You have worked through the whole plan.")), _h("div", {
        style: {
          display: "flex",
          gap: 7,
          margin: "13px 0"
        }
      }, [[aw.clock, "MINUTES"], [String(aw.loggedCount), "SETS"], [String(Math.round(aw.sessionVolume)), "VOLUME KG"]].map(([val, lbl], i) => _h("div", {
        key: i,
        style: {
          flex: 1,
          textAlign: "center",
          padding: "10px 4px",
          borderRadius: 13,
          background: "rgba(255,255,255,.04)"
        }
      }, _h("div", {
        className: "sora",
        style: {
          fontWeight: 800,
          fontSize: 17,
          color: i === 2 ? "var(--ac)" : "#F4ECDD"
        }
      }, val), _h("div", {
        style: {
          fontSize: 8.5,
          fontWeight: 800,
          letterSpacing: ".1em",
          color: "#6E665B",
          marginTop: 3
        }
      }, lbl)))), aw.loggedCount === 0 ? _h("div", {
        style: {
          display: "flex",
          gap: 9,
          padding: "11px 12px",
          borderRadius: 13,
          background: "rgba(226,106,79,.09)",
          border: "1px solid rgba(226,106,79,.28)",
          fontSize: 11.5,
          fontWeight: 700,
          color: "#E8B39F",
          lineHeight: 1.45
        }
      }, _h("span", null, "\u26A0"), _h("div", null, "No sets logged - nothing will be saved and this session is discarded.")) : _h("div", {
        style: {
          display: "flex",
          gap: 9,
          padding: "11px 12px",
          borderRadius: 13,
          background: "rgba(242,179,61,.09)",
          border: "1px solid rgba(242,179,61,.28)",
          fontSize: 11.5,
          fontWeight: 700,
          color: "#E8C98F",
          lineHeight: 1.45
        }
      }, _h("span", null, "\u26A0"), _h("div", null, "Unfinished exercises are not logged. Your ", aw.loggedCount, " completed set", aw.loggedCount === 1 ? "" : "s", " ", aw.loggedCount === 1 ? "is" : "are", " saved either way.")), _h("div", {
        style: {
          display: "flex",
          gap: 8,
          marginTop: 15
        }
      }, _h("div", {
        className: "press",
        onClick: () => setConfirmFinish(false),
        style: {
          flex: 1,
          textAlign: "center",
          padding: "13px 0",
          borderRadius: 15,
          background: "rgba(255,255,255,.05)",
          border: "1px solid rgba(255,255,255,.08)",
          fontSize: 13,
          fontWeight: 800,
          color: "#C9BEAD"
        }
      }, "Keep training"), _h("div", {
        className: "press",
        onClick: () => {
          setConfirmFinish(false);
          finishWorkout(true);
        },
        style: {
          flex: 1,
          textAlign: "center",
          padding: "13px 0",
          borderRadius: 15,
          background: aw.loggedCount === 0 ? "linear-gradient(135deg,#E26A4F,#C24E36)" : "linear-gradient(135deg,#57C08A,#3E9E6C)",
          color: aw.loggedCount === 0 ? "#1A0D08" : "#06150E",
          fontSize: 13,
          fontWeight: 800
        }
      }, aw.loggedCount === 0 ? "Discard workout" : "Finish & save")))), confirmSkip && sheet(confirmSkip === "set" ? "Skip this set?" : "Skip this exercise?", _h(_F, null, _h("div", {
        style: {
          fontSize: 13,
          color: "#A99E8C",
          fontWeight: 600,
          lineHeight: 1.5,
          marginBottom: 16
        }
      }, confirmSkip === "set" ? _h(_F, null, "Set ", setNum, " of ", curEntry.sets || 3, " of ", _h("strong", {
        style: {
          color: "#F4ECDD"
        }
      }, curEntry.name), " will be marked skipped and not logged.") : _h(_F, null, "The remaining sets of ", _h("strong", {
        style: {
          color: "#F4ECDD"
        }
      }, curEntry.name), " will be skipped and you move to the next exercise.")), _h("div", {
        style: {
          display: "flex",
          gap: 9
        }
      }, _h("div", {
        className: "press",
        onClick: () => setConfirmSkip(null),
        style: {
          flex: 1,
          textAlign: "center",
          padding: "13px 0",
          borderRadius: 15,
          background: "rgba(255,255,255,.05)",
          border: "1px solid rgba(255,255,255,.08)",
          color: "#C9BEAD",
          fontSize: 13.5,
          fontWeight: 800
        }
      }, "Keep going"), _h("div", {
        className: "press",
        onClick: () => {
          const w = confirmSkip;
          setConfirmSkip(null);
          if (w === "set") skipSet();else skipExercise();
        },
        style: {
          flex: 1,
          textAlign: "center",
          padding: "13px 0",
          borderRadius: 15,
          background: "rgba(226,106,79,.16)",
          border: "1px solid rgba(226,106,79,.45)",
          color: "#E8B39F",
          fontSize: 13.5,
          fontWeight: 800
        }
      }, confirmSkip === "set" ? "Skip set" : "Skip exercise")))), showSwitch && sheet("🔄 Switch exercise", _h(_F, null, _h("div", {
        style: {
          fontSize: 12,
          color: "#8E8475",
          fontWeight: 700,
          marginBottom: 10
        }
      }, "Replace ", _h("strong", {
        style: {
          color: "#F4ECDD"
        }
      }, curEntry.name), " with another exercise from this workout:"), _h("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 7,
          maxHeight: 230,
          overflowY: "auto"
        }
      }, programAlternatives.length === 0 && _h("div", {
        style: {
          fontSize: 12.5,
          color: "#6E665B",
          fontWeight: 600,
          padding: "10px 0"
        }
      }, "No other exercises in this workout."), programAlternatives.map(alt => _h("div", {
        key: alt.origIdx,
        className: "press",
        onClick: () => doReplaceWith(alt.name),
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 14px",
          borderRadius: 14,
          background: "rgba(255,255,255,.04)",
          border: "1px solid rgba(255,255,255,.07)"
        }
      }, _h("span", {
        style: {
          fontSize: 13,
          fontWeight: 800,
          color: "#F4ECDD"
        }
      }, alt.name), _h("span", {
        style: {
          fontSize: 11,
          fontWeight: 800,
          color: "var(--ac)"
        }
      }, "Use this \u25B8")))), _h("div", {
        style: {
          marginTop: 14,
          paddingTop: 13,
          borderTop: "1px solid rgba(255,255,255,.06)"
        }
      }, _h("div", {
        style: {
          fontSize: 11,
          color: "#6E665B",
          fontWeight: 700,
          marginBottom: 7
        }
      }, "Or pick any other exercise"), _h(ExInput, {
        value: switchName,
        onChange: v => setSwitchName(v),
        allExercises: allExercises
      }), _h("div", {
        style: {
          display: "flex",
          gap: 9,
          marginTop: 11
        }
      }, _h("div", {
        className: "press",
        onClick: () => setShowSwitch(false),
        style: {
          flex: 1,
          textAlign: "center",
          padding: "12px 0",
          borderRadius: 15,
          background: "rgba(255,255,255,.05)",
          border: "1px solid rgba(255,255,255,.08)",
          color: "#C9BEAD",
          fontSize: 13,
          fontWeight: 800
        }
      }, "Cancel"), _h("div", {
        className: "press",
        onClick: () => {
          if (switchName.trim()) doReplaceWith(switchName.trim());
        },
        style: {
          flex: 1,
          textAlign: "center",
          padding: "12px 0",
          borderRadius: 15,
          background: "linear-gradient(135deg,var(--acl),var(--acd))",
          color: "var(--ink)",
          fontSize: 13,
          fontWeight: 800
        }
      }, "Confirm"))))), loggedSets.length > 0 && _h("div", {
        className: "homePad",
        style: {
          maxWidth: 600,
          margin: "0 auto",
          padding: "0 22px 120px"
        }
      }, _h("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "18px 0 10px"
        }
      }, _h("div", {
        style: {
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: 2,
          color: "#8E8475"
        }
      }, "LOGGED ", _h("span", {
        style: {
          color: "#F4ECDD"
        }
      }, "THIS SESSION")), _h("div", {
        style: {
          fontSize: 11,
          fontWeight: 700,
          color: "#6E665B"
        }
      }, "tap a set to edit")), _h("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 7
        }
      }, loggedSets.map((ls, i) => _h("div", {
        key: i,
        className: "press",
        onClick: () => {
          setEditIdx(i);
          setEditKg(String(ls.kg ?? ""));
          setEditReps(String(ls.reps ?? ""));
        },
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "11px 14px",
          borderRadius: 13,
          background: "rgba(255,255,255,.035)",
          border: "1px solid rgba(255,255,255,.06)"
        }
      }, _h("span", {
        style: {
          fontSize: 12.5,
          fontWeight: 700,
          color: "#C9BEAD"
        }
      }, ls.ex), _h("span", {
        style: {
          fontSize: 12.5,
          fontWeight: 800,
          color: "#F4ECDD"
        }
      }, ls.drops && ls.drops.length ? "🔻 " + ls.drops.map(d => d.kg + "×" + d.reps).join(" → ") : (ls.kg > 0 ? ls.kg + " kg" : "BW") + " × " + ls.reps, _h("span", {
        style: {
          color: "#6E665B",
          fontWeight: 700,
          marginLeft: 8
        }
      }, "\u270E")))))), editIdx != null && loggedSets[editIdx] && sheet("Edit set", _h(_F, null, _h("div", {
        style: {
          fontSize: 12.5,
          color: "#8E8475",
          fontWeight: 700,
          marginBottom: 14
        }
      }, loggedSets[editIdx].ex), _h("div", {
        style: {
          display: "flex",
          gap: 10
        }
      }, _h("div", {
        style: {
          flex: 1
        }
      }, _h("div", {
        style: {
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: 1,
          color: "#8E8475",
          marginBottom: 6
        }
      }, "WEIGHT (KG)"), _h("input", {
        value: editKg,
        onChange: e => setEditKg(e.target.value),
        type: "text",
        inputMode: "decimal",
        style: {
          width: "100%",
          padding: "12px 14px",
          background: "rgba(255,255,255,.05)",
          border: "1px solid rgba(255,255,255,.09)",
          borderRadius: 14,
          color: "#F4ECDD",
          fontSize: 16,
          fontWeight: 800,
          outline: "none",
          fontFamily: "'Sora',sans-serif"
        }
      })), _h("div", {
        style: {
          flex: 1
        }
      }, _h("div", {
        style: {
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: 1,
          color: "#8E8475",
          marginBottom: 6
        }
      }, "REPS"), _h("input", {
        value: editReps,
        onChange: e => setEditReps(e.target.value),
        type: "text",
        inputMode: "numeric",
        style: {
          width: "100%",
          padding: "12px 14px",
          background: "rgba(255,255,255,.05)",
          border: "1px solid rgba(255,255,255,.09)",
          borderRadius: 14,
          color: "#F4ECDD",
          fontSize: 16,
          fontWeight: 800,
          outline: "none",
          fontFamily: "'Sora',sans-serif"
        }
      }))), _h("div", {
        style: {
          display: "flex",
          gap: 9,
          marginTop: 16
        }
      }, _h("div", {
        className: "press",
        onClick: () => deleteLogged(editIdx),
        style: {
          padding: "12px 15px",
          borderRadius: 15,
          background: "rgba(226,106,79,.14)",
          border: "1px solid rgba(226,106,79,.4)",
          color: "#E8B39F",
          fontSize: 13,
          fontWeight: 800
        }
      }, "Delete"), _h("div", {
        className: "press",
        onClick: () => setEditIdx(null),
        style: {
          flex: 1,
          textAlign: "center",
          padding: "12px 0",
          borderRadius: 15,
          background: "rgba(255,255,255,.05)",
          border: "1px solid rgba(255,255,255,.08)",
          color: "#C9BEAD",
          fontSize: 13,
          fontWeight: 800
        }
      }, "Cancel"), _h("div", {
        className: "press",
        onClick: saveEdit,
        style: {
          flex: 1,
          textAlign: "center",
          padding: "12px 0",
          borderRadius: 15,
          background: "linear-gradient(135deg,var(--acl),var(--acd))",
          color: "var(--ink)",
          fontSize: 13,
          fontWeight: 800
        }
      }, "Save")))));
    }
  }
  return _h("div", {
    style: {
      minHeight: "100vh",
      paddingBottom: 20,
      background: "#16120D"
    },
    className: "slide"
  }, _h("div", {
    style: {
      padding: "36px 18px 14px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      background: "#16120D",
      borderRadius: "0 0 20px 20px",
      marginBottom: 4
    }
  }, _h("div", null, _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.muted,
      letterSpacing: 1.5,
      textTransform: "uppercase"
    }
  }, "Active Session"), _h("div", {
    className: "sora",
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: C.cream,
      letterSpacing: -0.5
    }
  }, workout?.emoji, " ", workout?.name), _h("div", {
    style: {
      fontSize: 12,
      color: C.amber,
      fontWeight: 700,
      marginTop: 2
    }
  }, collection?.name, " \xB7 ", Math.floor(elapsed / 60), ":", String(elapsed % 60).padStart(2, "0"), " \xB7 ", loggedSets.length, " sets logged")), _h("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, _h("div", {
    className: "press",
    onClick: handleMinimize,
    style: {
      background: "rgba(255,255,255,0.08)",
      borderRadius: 12,
      padding: "9px 12px",
      fontSize: 12,
      fontWeight: 800,
      color: C.text
    }
  }, "\u2199 Min"), _h("div", {
    className: "press",
    onClick: () => finishWorkout(),
    style: {
      background: C.accent,
      borderRadius: 12,
      padding: "9px 16px",
      fontSize: 12,
      fontWeight: 800,
      color: C.ink
    }
  }, "Finish"))), checkQueue.length > 0 && loggedSets.length === 0 && _h(ReadinessCheck, {
    key: checkQueue[0].k,
    muscleName: checkQueue[0].name,
    agoH: checkQueue[0].agoH,
    expectPct: checkQueue[0].expectPct,
    onPick: lvl => {
      onCheckin && onCheckin(checkQueue[0].k, lvl);
      setCheckQueue(q => q.slice(1));
    },
    onSkip: () => setCheckQueue([])
  }), _h("div", {
    style: {
      padding: "10px 18px 2px",
      display: "flex",
      alignItems: "center",
      gap: 8,
      flexWrap: "wrap"
    }
  }, _h("span", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.muted,
      letterSpacing: 0.5
    }
  }, "\uD83D\uDCCD"), _h(GymPicker, {
    gyms: gyms,
    activeGym: gym,
    onSelect: onSelectGym,
    onAdd: onAddGym
  })), _h("div", {
    style: {
      margin: "6px 18px 16px",
      display: "flex",
      alignItems: "center",
      gap: 11
    }
  }, _h("span", {
    style: {
      fontSize: 10,
      fontWeight: 800,
      letterSpacing: 1,
      color: C.muted,
      flexShrink: 0
    }
  }, "PROGRESS"), _h("div", {
    style: {
      flex: 1,
      height: 7,
      borderRadius: 5,
      background: "rgba(255,255,255,0.07)",
      overflow: "hidden"
    }
  }, _h("div", {
    style: {
      width: progress + "%",
      height: "100%",
      background: C.btnGrad,
      borderRadius: 5,
      transition: "width 0.55s cubic-bezier(.2,.8,.2,1)",
      boxShadow: "0 0 12px rgba(var(--acr),0.5)"
    }
  })), _h("span", {
    className: "sora",
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: C.accent,
      flexShrink: 0
    }
  }, Math.min(position + 1, steps.length), "/", steps.length)), phase === "rest" && _h("div", {
    className: "popIn",
    style: {
      textAlign: "center",
      padding: "10px 18px 20px"
    }
  }, _h("div", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: C.muted,
      letterSpacing: 1,
      marginBottom: 18,
      textTransform: "uppercase"
    }
  }, "Rest Time"), _h("div", {
    style: {
      width: 148,
      height: 148,
      borderRadius: "50%",
      background: "conic-gradient(" + C.accent + " " + pct + "deg,rgba(var(--acr),0.1) 0deg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 18px",
      boxShadow: "0 0 36px rgba(var(--acr),0.2)"
    }
  }, _h("div", {
    style: {
      width: 116,
      height: 116,
      borderRadius: "50%",
      background: C.glassHard,
      backdropFilter: "blur(8px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }
  }, _h("div", {
    style: {
      fontSize: 36,
      fontWeight: 900,
      color: C.text
    }
  }, timer), _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted
    }
  }, "seconds"))), loggedSets.length > 0 && (() => {
    const ls = loggedSets[loggedSets.length - 1];
    return _h("div", {
      style: {
        fontSize: 13,
        color: C.mid,
        fontWeight: 600,
        marginBottom: 8
      }
    }, "Last: ", _h("strong", {
      style: {
        color: C.text
      }
    }, ls.ex, " \u2014 ", ls.drops && ls.drops.length ? "🔻 " + ls.drops.map(d => d.kg + "×" + d.reps).join(" → ") : ls.kg + "kg × " + ls.reps));
  })(), _h("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      fontWeight: 600,
      marginBottom: 18
    }
  }, "Next: ", _h("strong", {
    style: {
      color: C.text
    }
  }, orderedSteps[position]?.ex?.name), orderedSteps[position] && _h("span", null, " \u2014 Set ", setNum, "/", orderedSteps[position].ex.sets, " \xB7 ", orderedSteps[position].ex.repsMin, "\u2013", orderedSteps[position].ex.repsMax, " reps"), orderedSteps[position]?.ssId && _h("span", {
    style: {
      color: C.purple,
      fontWeight: 700
    }
  }, " (Superset)")), _h("div", {
    style: {
      display: "flex",
      gap: 12,
      justifyContent: "center"
    }
  }, _h(Btn, {
    outline: true,
    onClick: () => setRestEndsAt(t => (t || Date.now()) + 15000)
  }, "+15s"), _h(Btn, {
    onClick: () => {
      setRestEndsAt(0);
      setPhase("training");
    }
  }, "Skip rest \u2192"))), phase === "training" && curEntry && _h("div", {
    style: {
      padding: "0 18px"
    },
    className: "fadeUp"
  }, ssId && _h("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 12,
      padding: "10px 14px",
      background: "rgba(var(--acr),0.1)",
      borderRadius: 14,
      border: "1px solid " + C.supersetBorder
    }
  }, _h("div", {
    style: {
      fontSize: 18
    }
  }, "\uD83D\uDD17"), _h("div", {
    style: {
      flex: 1
    }
  }, _h("div", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: C.purple
    }
  }, "SUPERSET (", ssExIdx + 1, "/", ssExercises.length, ")"), _h("div", {
    style: {
      fontSize: 11,
      color: C.mid,
      fontWeight: 600
    }
  }, ssExercises.map((e, i) => _h("span", {
    key: i,
    style: {
      fontWeight: i === ssExIdx ? 800 : 500,
      color: i === ssExIdx ? C.purple : C.muted
    }
  }, e.name || "?", i < ssExercises.length - 1 ? " → " : ""))))), (() => {
    const lastTime = getLastTime(curEntry.name);
    const prevNotes = history ? history.flatMap(s => s.sets.filter(x => x.ex === curEntry.name && x.note)).map(x => x.note).filter(Boolean) : [];
    const uniquePrevNotes = [...new Set(prevNotes)].slice(0, 3);
    return _h(Card, null, _h("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 12
      }
    }, _h("div", {
      style: {
        flex: 1
      }
    }, _h("div", {
      className: "sora",
      style: {
        fontSize: 26,
        fontWeight: 800,
        color: C.text,
        letterSpacing: -0.8,
        lineHeight: 1.05
      }
    }, curEntry.name), _h("div", {
      style: {
        fontSize: 12,
        color: C.muted,
        fontWeight: 600,
        marginTop: 3
      }
    }, "Set ", setNum, " of ", curEntry.sets, " \xB7 Target: ", curEntry.repsMin, "\u2013", curEntry.repsMax, " reps"), _h("div", {
      className: "press",
      onClick: () => onHowTo(curEntry.name),
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        marginTop: 8,
        padding: "5px 11px",
        background: "rgba(var(--acr),0.1)",
        border: "1px solid rgba(var(--acr),0.25)",
        borderRadius: 8,
        fontSize: 11,
        fontWeight: 800,
        color: C.accentDark
      }
    }, "\uD83D\uDCCB How to do this")), _h("div", {
      style: {
        background: C.accentBg,
        borderRadius: 12,
        padding: "6px 12px",
        textAlign: "center"
      }
    }, _h("div", {
      style: {
        fontSize: 18,
        fontWeight: 900,
        color: C.accent
      }
    }, setNum), _h("div", {
      style: {
        fontSize: 9,
        fontWeight: 800,
        color: C.muted
      }
    }, "SET"))), lastTime && _h("div", {
      className: "fadeUp",
      style: {
        background: "linear-gradient(135deg,rgba(var(--acr),0.08),rgba(var(--acr),0.04))",
        border: "1px solid rgba(var(--acr),0.22)",
        borderRadius: 12,
        padding: "10px 12px",
        marginBottom: 14
      }
    }, _h("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginBottom: 4
      }
    }, _h("span", {
      style: {
        fontSize: 14
      }
    }, "\uD83D\uDD50"), _h("span", {
      style: {
        fontSize: 11,
        fontWeight: 800,
        color: C.accentDark,
        letterSpacing: 0.5
      }
    }, "LAST TIME \xB7 ", lastTime.date), gym && lastTime.sameGym && _h("span", {
      style: {
        fontSize: 10,
        fontWeight: 800,
        color: C.accent,
        background: C.accentBg,
        borderRadius: 6,
        padding: "1px 6px"
      }
    }, "\uD83D\uDCCD ", gym), gym && !lastTime.sameGym && _h("span", {
      style: {
        fontSize: 10,
        fontWeight: 700,
        color: "var(--acd)",
        background: "rgba(var(--acr),0.12)",
        borderRadius: 6,
        padding: "1px 6px"
      }
    }, "\u2260 gym", lastTime.gym ? " · " + lastTime.gym : "")), _h("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: C.text
      }
    }, "Avg ", _h("span", {
      style: {
        color: C.accent,
        fontWeight: 900
      }
    }, lastTime.avgKg, " kg"), " ", "for avg ", _h("span", {
      style: {
        color: C.accent,
        fontWeight: 900
      }
    }, lastTime.avgReps, " reps"), lastTime.maxKg !== lastTime.avgKg && _h("span", {
      style: {
        color: C.muted,
        fontWeight: 600
      }
    }, " \xB7 max ", lastTime.maxKg, " kg")), lastTime.notes.length > 0 && _h("div", {
      style: {
        fontSize: 11,
        color: C.mid,
        marginTop: 4,
        fontWeight: 600
      }
    }, "\uD83D\uDCDD ", lastTime.notes[lastTime.notes.length - 1]), _h("div", {
      className: "press",
      onClick: () => setKg(String(lastTime.avgKg)),
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        marginTop: 8,
        fontSize: 11,
        fontWeight: 800,
        color: C.accentDark,
        background: C.accentBg,
        border: "1px solid " + C.accent + "44",
        borderRadius: 8,
        padding: "5px 10px"
      }
    }, "\u2191 Use ", lastTime.avgKg, " kg")), (() => {
      const stepBtn = (label, onClick) => _h("div", {
        className: "press",
        onClick: onClick,
        style: {
          width: 34,
          height: 34,
          borderRadius: 11,
          background: "rgba(255,255,255,0.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: C.text,
          fontSize: 22,
          fontWeight: 700,
          flexShrink: 0
        }
      }, label);
      const field = (value, onChange, ph, mode) => _h("input", {
        type: "number",
        inputMode: mode || "decimal",
        value: value,
        onChange: onChange,
        placeholder: ph,
        className: "sora",
        style: {
          width: 50,
          flexShrink: 0,
          background: "transparent",
          border: "none",
          outline: "none",
          textAlign: "center",
          color: C.text,
          fontWeight: 800,
          fontSize: 23,
          padding: 0
        }
      });
      const pr = getPR(history, curEntry.name);
      return _h("div", {
        style: {
          display: "flex",
          gap: 12,
          marginBottom: 14
        }
      }, _h("div", {
        style: {
          flex: 1,
          minWidth: 0,
          borderRadius: 20,
          background: C.surface,
          padding: "14px 10px"
        }
      }, _h("div", {
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          marginBottom: 10
        }
      }, _h("div", {
        style: {
          fontSize: 11,
          fontWeight: 800,
          color: C.muted,
          letterSpacing: 1,
          textTransform: "uppercase"
        }
      }, "Weight (kg)"), pr > 0 && _h("div", {
        style: {
          fontSize: 10,
          fontWeight: 800,
          color: C.accent
        }
      }, "\uD83C\uDFC6 ", pr)), _h("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8
        }
      }, stepBtn("–", () => setKg(v => String(Math.max(0, Math.round(((parseFloat(v) || 0) - 2.5) * 10) / 10)))), field(kg, e => setKg(e.target.value), "0"), stepBtn("+", () => setKg(v => String(Math.round(((parseFloat(v) || 0) + 2.5) * 10) / 10))))), _h("div", {
        style: {
          flex: 1,
          minWidth: 0,
          borderRadius: 20,
          background: C.surface,
          padding: "14px 10px"
        }
      }, _h("div", {
        style: {
          textAlign: "center",
          fontSize: 11,
          fontWeight: 800,
          color: C.muted,
          letterSpacing: 1,
          textTransform: "uppercase",
          marginBottom: 10
        }
      }, "Reps ", _h("span", {
        style: {
          color: C.accent
        }
      }, curEntry.repsMin, "\u2013", curEntry.repsMax)), _h("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8
        }
      }, stepBtn("–", () => setReps(v => String(Math.max(0, (parseInt(v) || 0) - 1)))), field(reps, e => setReps(e.target.value), String(curEntry.repsMin), "numeric"), stepBtn("+", () => setReps(v => String((parseInt(v) || 0) + 1))))));
    })(), _h("div", {
      style: {
        marginBottom: 14
      }
    }, _h("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, _h("div", {
      className: "press",
      onClick: () => setDropMode(m => !m),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, _h("div", {
      style: {
        width: 22,
        height: 22,
        borderRadius: 7,
        border: "2px solid " + (dropMode ? "var(--ac)" : "rgba(0,0,0,0.2)"),
        background: dropMode ? "var(--ac)" : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: 13,
        fontWeight: 900
      }
    }, dropMode ? "✓" : ""), _h("div", {
      style: {
        fontSize: 13,
        fontWeight: 800,
        color: dropMode ? "var(--acd)" : C.mid
      }
    }, "\uD83D\uDD3B Dropset")), dropMode && _h("div", {
      style: {
        fontSize: 11,
        color: C.muted,
        fontWeight: 700
      }
    }, drops.length, " drop", drops.length !== 1 ? "s" : "")), dropMode && _h("div", {
      className: "fadeUp",
      style: {
        marginTop: 10,
        background: "rgba(var(--acr),0.06)",
        border: "1.5px solid rgba(var(--acr),0.25)",
        borderRadius: 12,
        padding: 12
      }
    }, _h("div", {
      style: {
        fontSize: 11,
        color: C.mid,
        fontWeight: 600,
        marginBottom: 10,
        lineHeight: 1.5
      }
    }, "Set the weight + reps above, tap ", _h("strong", null, "Add drop"), ", drop the weight and repeat. All drops save as one set. Tap ", _h("strong", null, "Log Dropset"), " when done."), drops.length > 0 && _h("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: 6,
        marginBottom: 10
      }
    }, drops.map((d, i) => _h("div", {
      key: i,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 5,
        background: "white",
        border: "1px solid rgba(var(--acr),0.35)",
        borderRadius: 9,
        padding: "4px 8px",
        fontSize: 12,
        fontWeight: 800,
        color: "var(--acd)"
      }
    }, _h("span", null, i + 1, ". ", d.kg, "kg \xD7 ", d.reps), _h("span", {
      className: "press",
      onClick: () => setDrops(ds => ds.filter((_, j) => j !== i)),
      style: {
        color: C.danger,
        fontSize: 13,
        marginLeft: 2
      }
    }, "\u2715")))), _h("div", {
      className: "press",
      onClick: addDrop,
      style: {
        textAlign: "center",
        padding: "9px 0",
        borderRadius: 10,
        border: "1.5px dashed var(--ac)",
        color: "var(--acd)",
        fontSize: 12,
        fontWeight: 800
      }
    }, "\uFF0B Add drop"))), _h("div", {
      style: {
        marginBottom: 14
      }
    }, _h("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: showNote ? 8 : 0
      }
    }, _h("div", {
      className: "press",
      onClick: () => setShowNote(p => !p),
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: showNote ? C.accentDark : C.muted,
        background: showNote ? C.accentBg : "rgba(255,255,255,0.04)",
        border: "1px solid " + (showNote ? C.accent + "44" : "transparent"),
        borderRadius: 8,
        padding: "5px 10px"
      }
    }, "\uD83D\uDCDD ", showNote ? "Hide note" : "Add note"), !showNote && uniquePrevNotes.map((n, i) => _h("div", {
      key: i,
      className: "press",
      onClick: () => {
        setNote(n);
        setShowNote(true);
      },
      style: {
        fontSize: 11,
        fontWeight: 600,
        color: C.mid,
        background: "rgba(255,255,255,0.04)",
        borderRadius: 8,
        padding: "5px 10px",
        maxWidth: 120,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, n))), showNote && _h("div", {
      className: "fadeUp"
    }, _h("input", {
      value: note,
      onChange: e => setNote(e.target.value),
      placeholder: "e.g. felt heavy, 30\xB0 incline, narrow grip, left shoulder tight\u2026",
      style: {
        width: "100%",
        padding: "10px 14px",
        background: "rgba(255,255,255,0.05)",
        border: "1.5px solid rgba(var(--acr),0.2)",
        borderRadius: 12,
        fontSize: 13,
        color: C.text,
        outline: "none",
        fontFamily: "'Manrope',sans-serif"
      }
    }))), _h("div", {
      style: {
        marginBottom: 14
      }
    }, _h("div", {
      style: {
        fontSize: 11,
        fontWeight: 800,
        color: C.muted,
        letterSpacing: 0.8,
        marginBottom: 8,
        textTransform: "uppercase"
      }
    }, "How did that set feel? ", _h("span", {
      style: {
        textTransform: "none",
        fontWeight: 600,
        color: C.faint
      }
    }, "(optional)")), _h(FeelSlider, {
      value: feel,
      onChange: setFeel
    })), _h("div", {
      style: {
        marginBottom: 14
      }
    }, _h("div", {
      style: {
        fontSize: 11,
        fontWeight: 800,
        color: C.muted,
        letterSpacing: 0.8,
        marginBottom: 8,
        textTransform: "uppercase"
      }
    }, "Rest After"), _h("div", {
      style: {
        display: "flex",
        gap: 8,
        flexWrap: "wrap"
      }
    }, [30, 60, 90, 120, 180].map(t => _h("div", {
      key: t,
      className: "press",
      onClick: () => setRestSecs(t)
    }, _h(Chip, {
      active: restSecs === t
    }, t, "s"))))), (() => {
      const pr = getPR(history, curEntry.name);
      const curKg = parseFloat(kg) || 0;
      const isNewPR = pr > 0 && curKg > pr;
      const isFirstPR = pr === 0 && curKg > 0;
      const dropCount = drops.length + ((parseInt(reps) || 0) > 0 ? 1 : 0);
      return _h(Btn, {
        full: true,
        onClick: logSet,
        style: isNewPR || isFirstPR || dropMode ? {
          background: "linear-gradient(135deg,var(--acl),var(--acd))",
          border: "none"
        } : {}
      }, dropMode ? "🔻 Log Dropset" + (dropCount > 0 ? " (" + dropCount + " drops)" : "") : isNewPR ? "🏆 New PR! Log Set" : isFirstPR ? "🏆 First PR! Log Set" : ssId && !isLastInSS ? "Log Set → Next in Superset" : "Log Set + Start Rest");
    })(), (() => {
      const k = parseFloat(kg) || 0;
      const r = parseInt(reps) || 0;
      if (k > 0 && r > 0 && r <= 30) {
        const orm = Math.round(k * (1 + r / 30));
        return _h("div", {
          style: {
            marginTop: 8,
            padding: "6px 12px",
            background: "rgba(var(--acr),0.08)",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            gap: 8
          }
        }, _h("span", {
          style: {
            fontSize: 12
          }
        }, "\uD83E\uDDEE"), _h("span", {
          style: {
            fontSize: 12,
            fontWeight: 700,
            color: C.purple
          }
        }, "Est. 1RM: ", orm, " kg"), _h("span", {
          style: {
            fontSize: 11,
            color: C.muted
          }
        }, "(Epley)"));
      }
      return null;
    })(), _h("div", {
      style: {
        display: "flex",
        gap: 8,
        marginTop: 10
      }
    }, _h("div", {
      className: "press",
      onClick: skipSet,
      style: {
        flex: 1,
        textAlign: "center",
        padding: "10px 0",
        borderRadius: 12,
        border: "1.5px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.03)",
        fontSize: 12,
        fontWeight: 800,
        color: C.mid
      }
    }, "\u23ED Skip set"), _h("div", {
      className: "press",
      onClick: () => setShowSkipConfirm(p => !p),
      style: {
        flex: 1,
        textAlign: "center",
        padding: "10px 0",
        borderRadius: 12,
        border: "1.5px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.03)",
        fontSize: 12,
        fontWeight: 800,
        color: C.muted
      }
    }, "\u23ED\u23ED Skip exercise"), _h("div", {
      className: "press",
      onClick: () => {
        setShowSwitch(p => !p);
        setShowSkipConfirm(false);
        setSwitchMode("replace");
        setSwitchName("");
      },
      style: {
        flex: 1,
        textAlign: "center",
        padding: "10px 0",
        borderRadius: 12,
        border: "1.5px solid rgba(var(--acr),0.3)",
        background: "rgba(var(--acr),0.06)",
        fontSize: 12,
        fontWeight: 800,
        color: "var(--ac)"
      }
    }, "\uD83D\uDD04 Switch")), showSkipConfirm && _h("div", {
      className: "popIn",
      style: {
        marginTop: 10,
        background: "rgba(255,255,255,0.03)",
        border: "1.5px solid rgba(255,255,255,0.1)",
        borderRadius: 14,
        padding: 14
      }
    }, _h("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: C.text,
        marginBottom: 12
      }
    }, "Skip ", _h("strong", null, curEntry.name), " entirely?"), _h("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, _h(Btn, {
      sm: true,
      danger: true,
      onClick: () => {
        setShowSkipConfirm(false);
        skipExercise();
      },
      style: {
        flex: 1,
        textAlign: "center"
      }
    }, "Yes, skip it"), _h(Btn, {
      sm: true,
      outline: true,
      onClick: () => setShowSkipConfirm(false),
      style: {
        flex: 1,
        textAlign: "center"
      }
    }, "Cancel"))), showSwitch && _h("div", {
      className: "popIn",
      style: {
        marginTop: 10,
        background: "rgba(var(--acr),0.05)",
        border: "1.5px solid rgba(var(--acr),0.25)",
        borderRadius: 14,
        padding: 14
      }
    }, _h("div", {
      style: {
        fontSize: 13,
        fontWeight: 800,
        color: "var(--ac)",
        marginBottom: 12
      }
    }, "\uD83D\uDD04 Switch \u2014 what do you want to do?"), _h("div", {
      style: {
        display: "flex",
        background: "rgba(255,255,255,0.05)",
        borderRadius: 10,
        padding: 3,
        marginBottom: 14,
        gap: 3
      }
    }, [{
      id: "replace",
      label: "Replace exercise"
    }, {
      id: "swap",
      label: "Swap order"
    }].map(m => _h("div", {
      key: m.id,
      className: "press",
      onClick: () => setSwitchMode(m.id),
      style: {
        flex: 1,
        textAlign: "center",
        padding: "7px 0",
        borderRadius: 8,
        fontSize: 12,
        fontWeight: 800,
        transition: "all 0.15s",
        background: switchMode === m.id ? "rgba(var(--acr),0.15)" : "transparent",
        color: switchMode === m.id ? "var(--ac)" : C.muted
      }
    }, m.label))), switchMode === "replace" && _h("div", null, _h("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: C.muted,
        marginBottom: 8
      }
    }, "Replace ", _h("strong", {
      style: {
        color: C.text
      }
    }, curEntry.name), " with:"), _h(ExInput, {
      value: switchName,
      onChange: v => setSwitchName(v),
      allExercises: allExercises
    }), _h("div", {
      style: {
        display: "flex",
        gap: 8,
        marginTop: 10
      }
    }, _h(Btn, {
      sm: true,
      onClick: confirmSwitch,
      style: {
        flex: 1,
        textAlign: "center",
        background: "var(--ac)",
        border: "none"
      }
    }, "Confirm"), _h(Btn, {
      sm: true,
      outline: true,
      onClick: () => setShowSwitch(false),
      style: {
        flex: 1,
        textAlign: "center"
      }
    }, "Cancel"))), switchMode === "swap" && (() => {
      const swapItems = [];
      const seenSsIds = new Set();
      orderedSteps.forEach((s, pos) => {
        const origIdx = stepOrder[pos];
        if (pos <= position || skippedSteps.has(origIdx) || completedOriginalIdxs.has(origIdx)) return;
        if (s.ssId) {
          if (seenSsIds.has(s.ssId)) return;
          seenSsIds.add(s.ssId);
          const ssExercises = orderedSteps.filter((ss, p) => p > position && stepOrder[p] !== undefined && ss.ssId === s.ssId && !completedOriginalIdxs.has(stepOrder[p]) && !skippedSteps.has(stepOrder[p]));
          swapItems.push({
            type: "ss",
            ssId: s.ssId,
            origIdx,
            exercises: ssExercises
          });
        } else {
          swapItems.push({
            type: "ex",
            origIdx,
            step: s
          });
        }
      });
      const curIsInSS = !!curStep?.ssId;
      const swapLabel = curIsInSS ? "Swap entire superset block ↕" : "Swap ↕";
      return _h("div", null, _h("div", {
        style: {
          fontSize: 11,
          fontWeight: 700,
          color: C.muted,
          marginBottom: 4
        }
      }, curIsInSS ? _h(_F, null, "The ", _h("strong", {
        style: {
          color: C.purple
        }
      }, "entire superset"), " will be swapped as a block:") : _h(_F, null, "Pick an upcoming exercise to do ", _h("strong", {
        style: {
          color: C.text
        }
      }, "now instead"), ":")), curIsInSS && _h("div", {
        style: {
          fontSize: 11,
          color: C.muted,
          marginBottom: 10,
          lineHeight: 1.5
        }
      }, "You'll do the selected exercise first, then your superset later."), swapItems.length === 0 && _h("div", {
        style: {
          fontSize: 12,
          color: C.muted,
          textAlign: "center",
          padding: "12px 0"
        }
      }, "No upcoming exercises to swap with"), swapItems.map((item, i) => {
        if (item.type === "ss") {
          return _h("div", {
            key: item.ssId,
            className: "press",
            onClick: () => swapWithStep(item.origIdx),
            style: {
              padding: "10px 12px",
              borderRadius: 11,
              background: "rgba(var(--acr),0.08)",
              border: "1.5px solid rgba(var(--acr),0.25)",
              marginBottom: 8
            }
          }, _h("div", {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 6
            }
          }, _h("span", {
            style: {
              fontSize: 10,
              fontWeight: 800,
              color: C.purple,
              background: "rgba(var(--acr),0.15)",
              borderRadius: 5,
              padding: "2px 8px"
            }
          }, "SUPERSET"), _h("div", {
            style: {
              fontSize: 12,
              fontWeight: 800,
              color: "var(--ac)"
            }
          }, swapLabel)), item.exercises.map((ex, j) => _h("div", {
            key: j,
            style: {
              fontSize: 12,
              fontWeight: 600,
              color: C.text,
              paddingLeft: 4,
              marginBottom: 2
            }
          }, "\u2022 ", switchedNames[stepOrder[orderedSteps.indexOf(ex)]] || ex.ex.name)));
        }
        return _h("div", {
          key: item.origIdx,
          className: "press",
          onClick: () => swapWithStep(item.origIdx),
          style: {
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 12px",
            borderRadius: 11,
            background: "rgba(255,255,255,0.04)",
            border: "1.5px solid rgba(var(--acr),0.2)",
            marginBottom: 8
          }
        }, _h("div", {
          style: {
            flex: 1
          }
        }, _h("div", {
          style: {
            fontSize: 13,
            fontWeight: 700,
            color: C.text
          }
        }, switchedNames[item.origIdx] || item.step.ex.name), _h("div", {
          style: {
            fontSize: 11,
            color: C.muted
          }
        }, item.step.ex.sets, "\xD7", item.step.ex.repsMin, "\u2013", item.step.ex.repsMax)), _h("div", {
          style: {
            fontSize: 12,
            fontWeight: 800,
            color: "var(--ac)"
          }
        }, swapLabel));
      }), _h(Btn, {
        sm: true,
        outline: true,
        onClick: () => setShowSwitch(false),
        style: {
          width: "100%",
          marginTop: 4,
          textAlign: "center"
        }
      }, "Cancel"));
    })()));
  })(), _h(SecTitle, null, "Workout Plan"), orderedSteps.map((step, pos) => {
    const origIdx = stepOrder[pos];
    const isCurrent = pos === position;
    const isDone = completedOriginalIdxs.has(origIdx);
    const isSkipped = skippedSteps.has(origIdx);
    const isFirstInSS = step.ssId && (pos === 0 || orderedSteps[pos - 1]?.ssId !== step.ssId);
    const isInSS = !!step.ssId && !isFirstInSS;
    return _h("div", {
      key: origIdx + "-" + pos,
      style: {
        display: "flex",
        gap: 10,
        alignItems: "center",
        padding: "8px 0",
        borderBottom: "1px solid rgba(255,255,255,0.04)"
      }
    }, _h("div", {
      style: {
        width: 24,
        height: 24,
        borderRadius: 8,
        background: isCurrent ? C.accent : isSkipped ? "rgba(255,107,107,0.15)" : isDone ? "rgba(var(--acr),0.2)" : "rgba(255,255,255,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
      }
    }, isSkipped ? _h("span", {
      style: {
        fontSize: 11
      }
    }, "\u2013") : isDone ? _h("span", {
      style: {
        fontSize: 12
      }
    }, "\u2713") : _h("span", {
      style: {
        fontSize: 11,
        fontWeight: 800,
        color: isCurrent ? "white" : C.muted
      }
    }, pos + 1)), isFirstInSS && _h("span", {
      style: {
        fontSize: 10,
        fontWeight: 800,
        color: C.purple,
        background: "rgba(var(--acr),0.1)",
        borderRadius: 5,
        padding: "2px 6px",
        flexShrink: 0
      }
    }, "SS"), isInSS && _h("div", {
      style: {
        width: 2,
        height: 20,
        background: C.supersetBorder,
        borderRadius: 2
      }
    }), _h("div", {
      style: {
        flex: 1
      }
    }, _h("div", {
      style: {
        fontSize: 13,
        fontWeight: isCurrent ? 800 : 600,
        color: isSkipped ? C.muted : isCurrent ? C.text : C.mid,
        textDecoration: isSkipped ? "line-through" : "none"
      }
    }, switchedNames[origIdx] || step.ex.name, switchedNames[origIdx] && _h("span", {
      style: {
        fontSize: 10,
        color: "var(--ac)",
        fontWeight: 700,
        marginLeft: 4
      }
    }, "\u2194"), step.extra && _h("span", {
      style: {
        fontSize: 9,
        color: C.good,
        fontWeight: 800,
        marginLeft: 5,
        background: "rgba(87,192,138,0.14)",
        borderRadius: 5,
        padding: "1px 5px"
      }
    }, "ADDED"))), _h("div", {
      style: {
        fontSize: 11,
        color: C.muted,
        fontWeight: 600
      }
    }, step.ex.sets, "\xD7", step.ex.repsMin, "\u2013", step.ex.repsMax));
  }), !addOpen && _h("div", {
    className: "press",
    onClick: () => setAddOpen(true),
    style: {
      marginTop: 12,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
      padding: "12px",
      borderRadius: 14,
      border: "1.5px dashed rgba(var(--acr),0.4)",
      color: C.accent,
      fontSize: 13,
      fontWeight: 800
    }
  }, "\uFF0B Add exercise (this session only)"), addOpen && _h("div", {
    className: "popIn",
    style: {
      marginTop: 12,
      padding: 14,
      borderRadius: 16,
      background: C.surface,
      border: "1.5px solid rgba(var(--acr),0.3)"
    }
  }, _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      letterSpacing: 1,
      color: C.muted,
      marginBottom: 8
    }
  }, "ADD TO THIS SESSION ", _h("span", {
    style: {
      color: C.faint
    }
  }, "\xB7 original program untouched")), _h(ExInput, {
    value: addName,
    onChange: setAddName,
    allExercises: allExercises,
    placeholder: "Exercise name"
  }), _h("div", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center",
      margin: "10px 0"
    }
  }, _h("div", {
    style: {
      flex: 1
    }
  }, _h("div", {
    style: {
      fontSize: 9,
      fontWeight: 800,
      color: C.muted,
      letterSpacing: 0.8,
      marginBottom: 4
    }
  }, "SETS"), _h(NumInput, {
    value: addSets,
    onChange: setAddSets,
    min: 1
  })), _h("div", {
    style: {
      paddingTop: 14,
      color: C.muted,
      fontSize: 13,
      fontWeight: 700
    }
  }, "\xD7"), _h("div", {
    style: {
      flex: 1
    }
  }, _h("div", {
    style: {
      fontSize: 9,
      fontWeight: 800,
      color: C.muted,
      letterSpacing: 0.8,
      marginBottom: 4
    }
  }, "MIN"), _h(NumInput, {
    value: addMin,
    onChange: setAddMin,
    min: 1
  })), _h("div", {
    style: {
      paddingTop: 14,
      color: C.muted,
      fontSize: 12
    }
  }, "\u2013"), _h("div", {
    style: {
      flex: 1
    }
  }, _h("div", {
    style: {
      fontSize: 9,
      fontWeight: 800,
      color: C.muted,
      letterSpacing: 0.8,
      marginBottom: 4
    }
  }, "MAX"), _h(NumInput, {
    value: addMax,
    onChange: setAddMax,
    min: 1
  }))), _h("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, _h(Btn, {
    sm: true,
    onClick: addSessionExercise,
    style: {
      flex: 1,
      textAlign: "center"
    }
  }, "\uFF0B Add to session"), _h(Btn, {
    sm: true,
    outline: true,
    onClick: () => {
      setAddOpen(false);
      setAddName("");
    },
    style: {
      flex: 1,
      textAlign: "center"
    }
  }, "Cancel")))), nudge && _h("div", {
    className: "popIn",
    style: {
      position: "fixed",
      left: 16,
      right: 16,
      bottom: "max(20px,env(safe-area-inset-bottom))",
      zIndex: 11000,
      maxWidth: 440,
      margin: "0 auto",
      padding: "16px 17px",
      borderRadius: 20,
      background: "#221E18",
      border: "1.5px solid rgba(var(--acr),0.5)",
      boxShadow: "0 18px 44px rgba(0,0,0,0.55)"
    }
  }, _h("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 12
    }
  }, _h("span", {
    style: {
      fontSize: 26
    }
  }, "\uD83D\uDE34"), _h("div", null, _h("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 800,
      color: C.text
    }
  }, "Still training?"), _h("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      fontWeight: 600,
      marginTop: 2
    }
  }, "10 min with no activity. Move your ass \u2014 or wrap it up."))), _h("div", {
    style: {
      display: "flex",
      gap: 9
    }
  }, _h("div", {
    className: "press",
    onClick: touch,
    style: {
      flex: 1,
      textAlign: "center",
      padding: "12px 0",
      borderRadius: 13,
      background: C.btnGrad,
      color: C.ink,
      fontSize: 13,
      fontWeight: 800
    }
  }, "\uD83D\uDCAA Still here \u2014 training!"), _h("div", {
    className: "press",
    onClick: () => {
      setNudge(false);
      finishWorkout();
    },
    style: {
      flex: 1,
      textAlign: "center",
      padding: "12px 0",
      borderRadius: 13,
      background: "rgba(255,255,255,0.06)",
      border: "1px solid " + C.border,
      color: C.mid,
      fontSize: 13,
      fontWeight: 800
    }
  }, "\uD83C\uDFC1 Finish workout"))), loggedSets.length > 0 && phase === "training" && _h("div", {
    style: {
      padding: "16px 18px 0"
    }
  }, _h(SecTitle, null, "Logged This Session"), [...loggedSets].reverse().slice(0, 8).map((s, revIdx) => {
    const realIdx = loggedSets.length - 1 - revIdx;
    return _h(EditableSet, {
      key: realIdx,
      s: s,
      realIdx: realIdx,
      onSave: (idx, kg, reps) => setLoggedSets(p => p.map((x, i) => i === idx ? {
        ...x,
        kg,
        reps
      } : x))
    });
  })));
}
function buildShareCard(entry, userName) {
  const css = getComputedStyle(document.documentElement);
  const AC = (css.getPropertyValue("--ac") || "#F2B33D").trim();
  const ACL = (css.getPropertyValue("--acl") || "#F8C95E").trim();
  const ACD = (css.getPropertyValue("--acd") || "#E6822A").trim();
  const INK = (css.getPropertyValue("--ink") || "#1A1208").trim();
  const W = 1080,
    H = 1350;
  const cv = document.createElement("canvas");
  cv.width = W;
  cv.height = H;
  const x = cv.getContext("2d");
  const rr = (x0, y0, w, h, r) => {
    x.beginPath();
    x.moveTo(x0 + r, y0);
    x.arcTo(x0 + w, y0, x0 + w, y0 + h, r);
    x.arcTo(x0 + w, y0 + h, x0, y0 + h, r);
    x.arcTo(x0, y0 + h, x0, y0, r);
    x.arcTo(x0, y0, x0 + w, y0, r);
    x.closePath();
  };
  const bg = x.createRadialGradient(W * 0.78, 60, 80, W * 0.5, H * 0.5, H);
  bg.addColorStop(0, "#2A2012");
  bg.addColorStop(0.5, "#16120D");
  bg.addColorStop(1, "#0C0906");
  x.fillStyle = bg;
  x.fillRect(0, 0, W, H);
  x.textBaseline = "alphabetic";
  x.font = "800 64px Sora, sans-serif";
  x.fillStyle = "#F4ECDD";
  x.fillText("IRON", 70, 120);
  x.fillStyle = AC;
  x.fillText("LOG", 70 + x.measureText("IRON").width, 120);
  x.font = "700 30px Manrope, sans-serif";
  x.fillStyle = "#8E8475";
  x.textAlign = "right";
  x.fillText(entry.date || "", W - 70, 112);
  x.textAlign = "left";
  x.font = "800 34px Manrope, sans-serif";
  x.fillStyle = "#8E8475";
  x.fillText((userName || "").toUpperCase() + " · SESSION COMPLETE", 70, 224);
  x.font = "800 92px Sora, sans-serif";
  x.fillStyle = "#F4ECDD";
  const wname = entry.workoutName || "Workout";
  x.fillText(wname.length > 16 ? wname.slice(0, 15) + "…" : wname, 70, 330);
  x.font = "700 34px Manrope, sans-serif";
  x.fillStyle = AC;
  x.fillText((entry.collectionName || "") + (entry.gym ? "  ·  📍 " + entry.gym : ""), 70, 388);
  const grad = x.createLinearGradient(70, 440, W - 70, 700);
  grad.addColorStop(0, ACL);
  grad.addColorStop(1, ACD);
  rr(70, 440, W - 140, 260, 44);
  x.fillStyle = grad;
  x.fill();
  const sets = entry.sets || [];
  const stats = [[String(entry.dur || 0) + "m", "DURATION"], [String(sets.length), "SETS"], [Math.round(entry.vol || 0).toLocaleString(), "VOLUME KG"]];
  stats.forEach((st, i) => {
    const cxp = 70 + (W - 140) * (i + 0.5) / 3;
    x.textAlign = "center";
    x.font = "800 84px Sora, sans-serif";
    x.fillStyle = INK;
    x.fillText(st[0], cxp, 570);
    x.font = "800 28px Manrope, sans-serif";
    x.fillStyle = "rgba(0,0,0,0.55)";
    x.fillText(st[1], cxp, 630);
  });
  x.textAlign = "left";
  const byEx = {};
  sets.forEach(s => {
    (byEx[s.ex] = byEx[s.ex] || []).push(s);
  });
  const tops = Object.entries(byEx).slice(0, 6).map(([ex, ss]) => {
    const kgOf = s => s.drops && s.drops.length ? Math.max(...s.drops.map(d => d.kg || 0)) : s.kg || 0;
    const best = ss.reduce((a, b) => kgOf(b) > kgOf(a) ? b : a);
    const label = best.drops && best.drops.length ? "DROP " + best.drops.map(d => d.kg + "×" + d.reps).join(" → ") : best.kg > 0 ? best.kg + " kg × " + best.reps : best.reps + " reps";
    return [ex, label, ss.length];
  });
  x.font = "800 30px Manrope, sans-serif";
  x.fillStyle = "#8E8475";
  x.fillText("TOP LIFTS", 70, 790);
  tops.forEach(([ex, label, n], i) => {
    const y = 840 + i * 74;
    rr(70, y - 46, W - 140, 62, 20);
    x.fillStyle = "rgba(255,255,255,0.045)";
    x.fill();
    x.font = "700 32px Manrope, sans-serif";
    x.fillStyle = "#F4ECDD";
    x.fillText((ex.length > 22 ? ex.slice(0, 21) + "…" : ex) + "  ×" + n, 96, y);
    x.textAlign = "right";
    x.font = "800 32px Sora, sans-serif";
    x.fillStyle = AC;
    x.fillText(label, W - 96, y);
    x.textAlign = "left";
  });
  const mset = new Set();
  sets.forEach(s => musclesFor(s.ex).forEach(k => mset.add(k)));
  const mnames = [...mset].map(k => MUSCLE_BY_KEY[k]?.name).filter(Boolean).slice(0, 7);
  const my = 840 + tops.length * 74 + 40;
  x.font = "800 30px Manrope, sans-serif";
  x.fillStyle = "#8E8475";
  x.fillText("MUSCLES HIT", 70, my);
  x.font = "700 30px Manrope, sans-serif";
  x.fillStyle = AC;
  x.fillText(mnames.join("  ·  ") || "—", 70, my + 52);
  x.font = "700 28px Manrope, sans-serif";
  x.fillStyle = "#6E665B";
  x.fillText("your lifts · your data · your progress", 70, H - 70);
  x.textAlign = "right";
  x.fillStyle = AC;
  x.fillText("IronLog 💪", W - 70, H - 70);
  x.textAlign = "left";
  return cv;
}
async function shareWorkoutCard(entry, userName) {
  const cv = buildShareCard(entry, userName);
  const blob = await new Promise(res => cv.toBlob(res, "image/png"));
  if (!blob) return "error";
  const file = new File([blob], "ironlog-" + (entry.date || "session") + ".png", {
    type: "image/png"
  });
  if (navigator.canShare && navigator.canShare({
    files: [file]
  })) {
    try {
      await navigator.share({
        files: [file],
        title: "IronLog session",
        text: "Crushed " + (entry.workoutName || "a workout") + " 💪 " + Math.round(entry.vol || 0).toLocaleString() + " kg total"
      });
      return "shared";
    } catch (e) {
      return "cancelled";
    }
  }
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = file.name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
  return "downloaded";
}
async function downloadShareCard(entry, userName) {
  const cv = buildShareCard(entry, userName);
  const blob = await new Promise(res => cv.toBlob(res, "image/png"));
  if (!blob) return "error";
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "ironlog-" + (entry.date || "session") + ".png";
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
  return "downloaded";
}
function PostWorkout({
  data,
  go,
  goBack,
  onSaveNote,
  userName,
  v4 = null
}) {
  const [sessionNote, setSessionNote] = useState(data?.entry?.sessionNote || "");
  const [noteSaved, setNoteSaved] = useState(false);
  const [sharePreview, setSharePreview] = useState(null);
  const [shareMsg, setShareMsg] = useState("");
  const saveNote = () => {
    if (data?.entry?.id) {
      onSaveNote(data.entry.id, sessionNote);
      setNoteSaved(true);
      setTimeout(() => setNoteSaved(false), 1500);
    }
  };
  const trained = useMemo(() => {
    const raw = {},
      counts = {};
    (data?.entry?.sets || []).forEach(s => {
      const m = metaFor(s.ex).muscles || {};
      Object.entries(m).forEach(([k, c]) => {
        raw[k] = (raw[k] || 0) + c;
        if (c >= 0.5) counts[k] = (counts[k] || 0) + 1;
      });
    });
    const max = Math.max(0.001, ...Object.values(raw));
    const heat = {};
    Object.keys(raw).forEach(k => {
      heat[k] = Math.round((1 - raw[k] / max) * 55) / 100;
    });
    const chips = Object.entries(raw).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([k]) => ({
      key: k,
      name: MUSCLE_BY_KEY[k]?.name || k,
      sets: counts[k] || 0
    }));
    return {
      heat,
      chips
    };
  }, [data]);
  if (!data) return null;
  if (v4) {
    let post;
    try {
      post = buildPost({
        post: {
          entry: data.entry
        },
        history: v4._history || [],
        ui: {
          sessionNote,
          noteSaved,
          sharePreview,
          shareMsg
        },
        on: {
          share: async e => {
            const r = await shareWorkoutCard(e || data.entry, userName);
            setShareMsg(r === "shared" ? "Shared! 🎉" : r === "downloaded" ? "Image saved — post it anywhere 📲" : r === "error" ? "Could not build the image" : "");
            setTimeout(() => setShareMsg(""), 4000);
          },
          saveShareImage: async e => {
            const r = await downloadShareCard(e || data.entry, userName);
            setShareMsg(r === "downloaded" ? "Image saved — post it anywhere 📲" : "Could not build the image");
            setTimeout(() => setShareMsg(""), 4000);
          },
          setSessionNote: val => setSessionNote(typeof val === "string" ? val : val.target.value),
          saveSessionNote: saveNote,
          done: () => go("home")
        }
      });
    } catch (e) {
      console.error("buildPost failed", e);
      post = null;
    }
    if (post) return _h(DPost, {
      v: {
        ...v4,
        post
      }
    });
  }
  const {
    entry
  } = data;
  const byEx = {};
  (entry.sets || []).forEach(s => {
    if (!byEx[s.ex]) byEx[s.ex] = [];
    byEx[s.ex].push(s);
  });
  return _h("div", {
    style: {
      minHeight: "100vh",
      paddingBottom: 32,
      background: "#16120D"
    },
    className: "slide"
  }, _h("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: 44,
      padding: "0 18px"
    }
  }, _h("div", {
    style: {
      position: "absolute",
      left: 18
    }
  }, _h(BackBtn, {
    goBack: goBack
  }))), _h("div", {
    style: {
      textAlign: "center",
      padding: "8px 18px 24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  }, _h("div", {
    className: "popIn",
    style: {
      width: 96,
      height: 96,
      borderRadius: "50%",
      background: C.btnGrad,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 16px 40px rgba(224,123,46,0.4)"
    }
  }, _h("svg", {
    width: "46",
    height: "46",
    viewBox: "0 0 24 24",
    style: {
      fill: "none",
      stroke: C.ink,
      strokeWidth: 2.6,
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  }, _h("path", {
    d: "M5 13l4 4 10-11"
  }))), _h("div", {
    style: {
      marginTop: 24,
      fontSize: 12,
      fontWeight: 800,
      letterSpacing: 2,
      color: C.muted
    }
  }, "SESSION COMPLETE"), _h("div", {
    className: "sora",
    style: {
      marginTop: 8,
      fontSize: 34,
      fontWeight: 800,
      letterSpacing: -1,
      color: C.text
    }
  }, "Nicely ", _h("span", {
    style: {
      color: C.amber
    }
  }, "done.")), _h("div", {
    style: {
      fontSize: 13,
      color: C.muted,
      marginTop: 6,
      fontWeight: 600
    }
  }, entry.workoutName, " \xB7 ", entry.collectionName, " \xB7 ", entry.date)), _h("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12,
      padding: "0 18px",
      marginBottom: 20
    }
  }, [{
    n: entry.dur + "m",
    l: "MINUTES",
    amber: true
  }, {
    n: entry.sets.length,
    l: "SETS LOGGED"
  }, {
    n: Math.round(entry.vol).toLocaleString(),
    l: "VOLUME KG"
  }, {
    n: entry.gym || "—",
    l: "GYM",
    small: true
  }].map((s, i) => _h("div", {
    key: i,
    style: {
      borderRadius: 22,
      padding: "20px 16px",
      background: s.amber ? C.amberGrad : C.surface
    }
  }, _h("div", {
    className: "sora",
    style: {
      fontSize: s.small ? 18 : 30,
      fontWeight: 800,
      color: s.amber ? C.ink : C.text,
      lineHeight: 1
    }
  }, s.n), _h("div", {
    style: {
      marginTop: 8,
      fontSize: 11,
      fontWeight: 800,
      letterSpacing: 1.5,
      color: s.amber ? C.onAmberMuted : C.muted
    }
  }, s.l)))), trained.chips.length > 0 && _h(_F, null, _h(SecTitle, null, "Muscles Hit"), _h(Card, null, _h(Body3D, {
    mode: "recovery",
    heat: trained.heat,
    height: 260,
    autoRotate: true
  }), _h("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      marginTop: 12
    }
  }, trained.chips.map(mc => _h("div", {
    key: mc.key,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      padding: "7px 12px",
      borderRadius: 11,
      background: "rgba(194,59,44,0.13)",
      border: "1px solid rgba(194,59,44,0.35)"
    }
  }, _h("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: "50%",
      background: "#C23B2C"
    }
  }), _h("span", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: C.text
    }
  }, mc.name), _h("span", {
    style: {
      fontSize: 10.5,
      fontWeight: 700,
      color: C.mid
    }
  }, mc.sets === 0 ? "assist" : mc.sets === 1 ? "1 set" : mc.sets + " sets")))))), _h(SecTitle, null, "Breakdown"), Object.entries(byEx).map(([ex, sets]) => _h(Card, {
    key: ex
  }, _h("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10
    }
  }, _h("div", {
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: C.text
    }
  }, ex), sets[0]?.ssId && _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.purple,
      background: "rgba(var(--acr),0.1)",
      borderRadius: 7,
      padding: "3px 8px"
    }
  }, "\uD83D\uDD17 Superset")), _h("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 6
    }
  }, sets.map((s, i) => s.drops && s.drops.length ? _h("div", {
    key: i,
    style: {
      background: "rgba(var(--acr),0.12)",
      color: "var(--acd)",
      borderRadius: 9,
      padding: "5px 12px",
      fontSize: 12,
      fontWeight: 700,
      border: "1px solid rgba(var(--acr),0.3)"
    }
  }, "Set ", i + 1, " \uD83D\uDD3B: ", s.drops.map(d => d.kg + "×" + d.reps).join(" → "), s.note && _h("span", {
    style: {
      color: C.mid,
      fontWeight: 600
    }
  }, " \xB7 ", s.note)) : _h("div", {
    key: i,
    style: {
      background: C.accentBg,
      color: C.accentDark,
      borderRadius: 9,
      padding: "5px 12px",
      fontSize: 12,
      fontWeight: 700,
      border: "1px solid " + C.accent + "33"
    }
  }, "Set ", i + 1, ": ", s.kg, "kg \xD7 ", s.reps, s.note && _h("span", {
    style: {
      color: C.mid,
      fontWeight: 600
    }
  }, " \xB7 ", s.note)))), _h("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginTop: 8,
      fontWeight: 600
    }
  }, "Volume: ", _h("span", {
    style: {
      color: C.accentDark,
      fontWeight: 800
    }
  }, sets.reduce((a, s) => a + setVolume(s), 0).toFixed(0), " kg")))), _h(Card, null, _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.muted,
      letterSpacing: 0.8,
      textTransform: "uppercase",
      marginBottom: 8
    }
  }, "Session Note"), _h("textarea", {
    value: sessionNote,
    onChange: e => setSessionNote(e.target.value),
    placeholder: "How did it feel? Sleep, energy, anything notable...",
    style: {
      width: "100%",
      minHeight: 80,
      padding: "10px 12px",
      background: "rgba(255,255,255,0.05)",
      border: "1.5px solid rgba(var(--acr),0.2)",
      borderRadius: 12,
      fontSize: 13,
      color: C.text,
      outline: "none",
      resize: "vertical",
      lineHeight: 1.6,
      fontFamily: "'Manrope',sans-serif"
    }
  }), _h("div", {
    className: "press",
    onClick: saveNote,
    style: {
      marginTop: 8,
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "7px 14px",
      background: noteSaved ? C.accentBg : "rgba(255,255,255,0.04)",
      borderRadius: 10,
      fontSize: 12,
      fontWeight: 800,
      color: noteSaved ? C.accentDark : C.muted
    }
  }, noteSaved ? "✓ Saved!" : "💾 Save note")), _h(Card, null, _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.muted,
      letterSpacing: 0.8,
      textTransform: "uppercase",
      marginBottom: 10
    }
  }, "\uD83D\uDCE4 Share your session"), sharePreview && _h("img", {
    src: sharePreview,
    alt: "Share card",
    style: {
      width: "100%",
      borderRadius: 14,
      border: "1px solid " + C.border,
      marginBottom: 10,
      display: "block"
    }
  }), _h("div", {
    style: {
      display: "flex",
      gap: 9
    }
  }, _h(Btn, {
    sm: true,
    onClick: async () => {
      const r = await shareWorkoutCard(entry, userName);
      setShareMsg(r === "shared" ? "Shared! 🎉" : r === "downloaded" ? "Image saved — post it anywhere 📲" : "");
    },
    style: {
      flex: 1,
      textAlign: "center"
    }
  }, "\uD83D\uDCE4 Share"), _h(Btn, {
    sm: true,
    outline: true,
    onClick: () => {
      const cv = buildShareCard(entry, userName);
      setSharePreview(cv.toDataURL("image/png"));
    },
    style: {
      flex: 1,
      textAlign: "center"
    }
  }, "\uD83D\uDC40 Preview")), shareMsg && _h("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: C.good,
      marginTop: 8
    }
  }, shareMsg)), _h("div", {
    style: {
      padding: "8px 18px 0"
    }
  }, _h(Btn, {
    full: true,
    onClick: () => go("home")
  }, "Back to Home"), _h(Btn, {
    full: true,
    outline: true,
    onClick: () => go("stats"),
    style: {
      marginTop: 10
    }
  }, "View Progress \u2192")));
}
function FullHistory({
  history,
  go,
  goBack
}) {
  return _h("div", {
    style: {
      minHeight: "100vh",
      paddingBottom: 32
    },
    className: "slide"
  }, _h("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: 44,
      padding: "16px 18px 0"
    }
  }, _h("div", {
    style: {
      position: "absolute",
      left: 18
    }
  }, _h(BackBtn, {
    goBack: goBack
  })), _h("div", {
    style: {
      fontSize: 20,
      fontWeight: 900,
      color: C.text
    }
  }, "All Sessions")), _h("div", {
    style: {
      padding: "4px 18px 16px"
    }
  }, _h("div", {
    style: {
      fontSize: 13,
      color: C.muted,
      fontWeight: 600
    }
  }, history.length, " total workouts")), history.length === 0 && _h("div", {
    style: {
      textAlign: "center",
      padding: "60px 18px",
      color: C.muted
    }
  }, _h("div", {
    style: {
      fontSize: 48
    }
  }, "\uD83C\uDFCB\uFE0F"), _h("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      marginTop: 12
    }
  }, "No sessions yet")), history.map(h => _h(Card, {
    key: h.id,
    style: {
      padding: "14px 16px"
    }
  }, _h("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, _h("div", null, _h("div", {
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: C.text
    }
  }, h.workoutName), _h("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      fontWeight: 600
    }
  }, h.collectionName, " \xB7 ", h.date, " \xB7 ", h.dur, " min")), _h(Chip, null, (h.vol || 0).toLocaleString(), " kg")), _h("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 5,
      marginTop: 8
    }
  }, [...new Set(h.sets.map(s => s.ex))].slice(0, 4).map(ex => _h(Chip, {
    key: ex,
    active: false,
    style: {
      fontSize: 11
    }
  }, ex))))));
}
function Stats({
  history,
  allHistory,
  users,
  go,
  goBack
}) {
  const [selEx, setSelEx] = useState(null);
  const [compTab, setCompTab] = useState("sessions");
  const allHistoryFlat = Object.values(allHistory).flatMap(arr => arr);
  const exCounts = {};
  allHistoryFlat.forEach(h => (h.sets || []).forEach(s => {
    exCounts[s.ex] = (exCounts[s.ex] || 0) + 1;
  }));
  const topEx = Object.entries(exCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "Bench Press";
  const [compEx, setCompEx] = useState(topEx);
  const RANGES = [["4W", 28], ["3M", 91], ["1Y", 365], ["All", Infinity]];
  const [range, setRange] = useState("3M");
  const rangeDays = RANGES.find(r => r[0] === range)[1];
  const nowMs = Date.now();
  const tsOf = h => h.ts || new Date(h.date + "T12:00").getTime();
  const rHistory = rangeDays === Infinity ? history : history.filter(h => nowMs - tsOf(h) < rangeDays * 86400000);
  const [drillSel, setDrillSel] = useState(null);
  const exProgRef = useRef(null);
  const allEx = [...new Set(history.flatMap(h => h.sets.map(s => s.ex)))];
  const exChoices = drillSel ? allEx.filter(e => musclesFor(e).includes(drillSel)) : allEx;
  const ex = selEx || exChoices[0] || allEx[0] || "";
  const exData = history.map(h => {
    const s = h.sets.filter(x => x.ex === ex);
    return {
      date: h.date.slice(5),
      weight: s.length ? Math.max(...s.map(x => x.kg)) : 0
    };
  }).filter(d => d.weight > 0);
  const volData = rHistory.map(h => ({
    date: h.date.slice(5),
    vol: h.vol || 0
  }));
  const avgDur = rHistory.length > 0 ? Math.round(rHistory.reduce((a, h) => a + (h.dur || 0), 0) / rHistory.length) : 0;
  const totalVol = rHistory.reduce((a, h) => a + (h.vol || 0), 0);
  const totalMin = rHistory.reduce((a, h) => a + (h.dur || 0), 0);
  const GROUPS = ["Chest", "Back", "Shoulders", "Arms", "Legs", "Core"];
  const GROUP_OF = {
    chest: "Chest",
    lats: "Back",
    traps: "Back",
    lowerback: "Back",
    shoulders: "Shoulders",
    biceps: "Arms",
    triceps: "Arms",
    forearms: "Arms",
    quads: "Legs",
    hamstrings: "Legs",
    glutes: "Legs",
    calves: "Legs",
    adductors: "Legs",
    abs: "Core",
    obliques: "Core"
  };
  const splitKg = Object.fromEntries(GROUPS.map(g => [g, 0]));
  rHistory.forEach(h => (h.sets || []).forEach(s => {
    const load = (s.kg || 0) > 0 ? (s.kg || 0) * (s.reps || 0) : s.reps || 0;
    if (load <= 0) return;
    const mm = metaFor(s.ex).muscles || {};
    const tot = Object.values(mm).reduce((a, b) => a + b, 0) || 1;
    Object.entries(mm).forEach(([k, c]) => {
      const g = GROUP_OF[k];
      if (g) splitKg[g] += load * c / tot;
    });
  }));
  const splitRows = GROUPS.map(g => ({
    g,
    kg: Math.round(splitKg[g])
  })).sort((a, b) => b.kg - a.kg);
  const splitTot = splitRows.reduce((a, r) => a + r.kg, 0);
  const splitMax = Math.max(...splitRows.map(r => r.kg), 1);
  const splitNote = splitTot > 0 ? splitRows[0].g + " leads this block · " + splitRows[splitRows.length - 1].g.toLowerCase() + " is your lightest group" : "";
  const [volWeek, setVolWeek] = useState(3);
  const WK = 7 * 86400000;
  const grpWeeks = Object.fromEntries(GROUPS.map(g => [g, [0, 0, 0, 0]]));
  history.forEach(h => {
    const age = nowMs - tsOf(h);
    if (age < 0 || age >= 4 * WK) return;
    const wi = 3 - Math.floor(age / WK);
    (h.sets || []).forEach(s => {
      musclesFor(s.ex).forEach((k, i) => {
        const g = GROUP_OF[k];
        if (g) grpWeeks[g][wi] += i === 0 ? 1 : 0.5;
      });
    });
  });
  const balAny = GROUPS.some(g => grpWeeks[g].some(v => v > 0));
  const balMax = Math.max(...GROUPS.map(g => grpWeeks[g][volWeek]), 1);
  const grpTot = g => grpWeeks[g].reduce((a, b) => a + b, 0);
  let balWarn = null;
  [["Chest", "Back"]].forEach(([a, b]) => {
    const ta = grpTot(a),
      tb = grpTot(b);
    if (ta >= 4 && ta > 2 * tb) balWarn = a + " volume is " + (tb > 0 ? (ta / tb).toFixed(1) + "x" : "way over") + " " + b + " across 4 weeks - balance push and pull.";else if (tb >= 4 && tb > 2 * ta) balWarn = b + " volume is " + (ta > 0 ? (tb / ta).toFixed(1) + "x" : "way over") + " " + a + " across 4 weeks - balance push and pull.";
  });
  const worstGrp = [...GROUPS].sort((a, b) => grpTot(a) - grpTot(b))[0];
  const balCallout = balWarn || (balAny ? worstGrp + " - only " + Math.round(grpTot(worstGrp) * 10) / 10 + " sets across 4 weeks. Worth a set or two next week." : null);
  const prBest = {};
  [...history].sort((a, b) => tsOf(a) - tsOf(b)).forEach(h => (h.sets || []).forEach(s => {
    const kg = s.kg || 0,
      reps = s.reps || 0;
    if (kg <= 0 || reps < 1 || reps > 12) return;
    const e1 = kg * (1 + reps / 30);
    const cur = prBest[s.ex];
    if (!cur || e1 > cur.e1 + 0.01) prBest[s.ex] = {
      e1,
      kg,
      reps,
      date: h.date,
      ts: tsOf(h),
      prev: cur ? cur.e1 : null
    };
  }));
  const prRows = Object.entries(prBest).map(([name, p]) => ({
    name,
    ...p
  })).sort((a, b) => b.e1 - a.e1).slice(0, 5);
  const drillRows = (() => {
    const counts = {};
    history.forEach(h => {
      if (nowMs - tsOf(h) > 14 * 86400000) return;
      (h.sets || []).forEach(s => {
        if (!drillSel || musclesFor(s.ex).includes(drillSel)) counts[s.ex] = (counts[s.ex] || 0) + 1;
      });
    });
    const trained = Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([name, sets]) => ({
      name,
      sets
    }));
    if (!drillSel) return trained.slice(0, 5);
    return trained.length ? trained : exercisesForMuscle(drillSel).slice(0, 5).map(name => ({
      name,
      sets: 0
    }));
  })();
  const allCompEx = [...new Set(Object.values(allHistory).flatMap(arr => arr.flatMap(h => h.sets.map(s => s.ex))))];
  const compData = users.map(u => {
    const uHistory = allHistory[u.id] || [];
    const sessions = uHistory.length;
    const totalVolume = uHistory.reduce((a, h) => a + (h.vol || 0), 0);
    const exSets = uHistory.flatMap(h => h.sets.filter(s => s.ex === compEx));
    const maxLift = exSets.length > 0 ? Math.max(...exSets.map(s => s.kg)) : 0;
    const totalMinutes = uHistory.reduce((a, h) => a + (h.dur || 0), 0);
    return {
      name: u.name,
      color: u.color,
      sessions,
      totalVolume,
      maxLift,
      totalMinutes
    };
  });
  const maxSessions = Math.max(...compData.map(d => d.sessions), 1);
  const maxVolume = Math.max(...compData.map(d => d.totalVolume), 1);
  const maxLift = Math.max(...compData.map(d => d.maxLift), 1);
  const maxMinutes = Math.max(...compData.map(d => d.totalMinutes), 1);
  const getVal = d => {
    if (compTab === "sessions") return {
      val: d.sessions,
      label: d.sessions + " sessions",
      max: maxSessions
    };
    if (compTab === "exercise") return {
      val: d.maxLift,
      label: d.maxLift + "kg",
      max: maxLift
    };
    if (compTab === "volume") return {
      val: Math.round(d.totalVolume / 1000 * 10) / 10,
      label: Math.round(d.totalVolume / 1000 * 10) / 10 + "t",
      max: maxVolume
    };
    return {
      val: 0,
      label: "",
      max: 1
    };
  };
  const recentHistory = history.slice(0, 5);
  const hasMore = history.length > 5;
  return _h("div", {
    style: {
      minHeight: "100vh",
      paddingBottom: 32
    },
    className: "slide"
  }, _h(PageHeader, {
    goBack: goBack,
    title: "Progress \uD83D\uDCC8",
    subtitle: "Your lifting journey"
  }, _h("div", {
    style: {
      display: "flex",
      gap: 4,
      padding: 4,
      borderRadius: 15,
      background: "rgba(255,255,255,0.045)",
      border: "1px solid " + C.border,
      marginBottom: 10
    }
  }, RANGES.map(([k]) => _h("div", {
    key: k,
    className: "press",
    onClick: () => setRange(k),
    style: {
      flex: 1,
      textAlign: "center",
      padding: "8px 0",
      borderRadius: 11,
      fontSize: 12,
      fontWeight: 800,
      letterSpacing: 0.5,
      background: range === k ? "var(--ac)" : "transparent",
      color: range === k ? C.ink : C.muted,
      transition: "background 0.2s"
    }
  }, k))), _h("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, [{
    n: rHistory.length,
    l: "SESSIONS"
  }, {
    n: avgDur + "m",
    l: "AVG DURATION",
    a: true
  }, {
    n: (totalVol / 1000).toFixed(1) + "t",
    l: "TOTAL VOL"
  }, {
    n: totalMin + "m",
    l: "TOTAL TIME"
  }].map((s, i) => _h("div", {
    key: i,
    style: {
      flex: "1 1 calc(50% - 4px)",
      background: C.glass,
      border: "1px solid " + C.border,
      borderRadius: 16,
      padding: "12px 8px",
      textAlign: "center"
    }
  }, _h("div", {
    style: {
      fontSize: 20,
      fontWeight: 900,
      color: s.a ? C.accent : C.text
    }
  }, s.n), _h("div", {
    style: {
      fontSize: 9,
      fontWeight: 800,
      color: C.muted,
      letterSpacing: 0.8
    }
  }, s.l))))), allEx.length === 0 ? _h("div", {
    style: {
      textAlign: "center",
      padding: "60px 18px",
      color: C.muted
    }
  }, _h("div", {
    style: {
      fontSize: 48
    }
  }, "\uD83D\uDCCA"), _h("div", {
    style: {
      marginTop: 12,
      fontSize: 14,
      fontWeight: 700
    }
  }, "Complete a workout to see stats!")) : _h(_F, null, _h(SecTitle, null, "Muscle Split"), _h(Card, null, splitTot > 0 ? _h(_F, null, _h("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 13
    }
  }, splitRows.map((r, i) => _h("div", {
    key: r.g
  }, _h("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 6
    }
  }, _h("span", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: C.text
    }
  }, r.g), _h("span", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: C.muted
    }
  }, r.kg.toLocaleString(), " kg \xB7 ", Math.round(r.kg / splitTot * 100), "%")), _h("div", {
    style: {
      height: 9,
      borderRadius: 5,
      background: "rgba(255,255,255,0.05)",
      overflow: "hidden"
    }
  }, _h("div", {
    style: {
      height: "100%",
      borderRadius: 5,
      width: Math.round(r.kg / splitMax * 100) + "%",
      background: i === 0 ? "linear-gradient(90deg,var(--acl),var(--acd))" : "rgba(var(--acr),0.4)",
      transition: "width 0.5s ease"
    }
  }))))), _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted,
      marginTop: 13
    }
  }, splitNote)) : _h("div", {
    style: {
      color: C.muted,
      fontSize: 13,
      textAlign: "center",
      padding: 14
    }
  }, "No sets in this range yet")), _h(SecTitle, null, "Tap a Muscle"), _h(Card, {
    style: {
      padding: 0,
      overflow: "hidden"
    }
  }, _h("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      padding: "8px 0 0"
    }
  }, _h("div", {
    style: {
      width: "100%",
      maxWidth: 258
    }
  }, _h(Body3D, {
    mode: "explore",
    height: 300,
    autoRotate: true,
    selected: drillSel,
    onPick: k => setDrillSel(p => p === k ? null : k)
  }))), _h("div", {
    style: {
      padding: "15px 17px"
    }
  }, _h("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      minHeight: 20
    }
  }, drillSel ? _h(_F, null, _h("span", {
    className: "sora",
    style: {
      fontSize: 14.5,
      fontWeight: 800,
      color: C.text
    }
  }, MUSCLE_BY_KEY[drillSel]?.name || drillSel), _h("div", {
    className: "press",
    onClick: () => setDrillSel(null),
    style: {
      marginLeft: "auto",
      fontSize: 10.5,
      fontWeight: 800,
      color: C.muted,
      padding: "5px 10px",
      borderRadius: 8,
      background: "rgba(255,255,255,0.05)"
    }
  }, "\u2715")) : _h("span", {
    className: "sora",
    style: {
      fontSize: 14.5,
      fontWeight: 800,
      color: C.text
    }
  }, "All muscles - last 14 days")), _h("div", {
    style: {
      marginTop: 11,
      display: "flex",
      flexDirection: "column",
      gap: 7
    }
  }, drillRows.map(r => _h("div", {
    key: r.name,
    className: "press",
    onClick: () => {
      if (allEx.includes(r.name)) {
        setSelEx(r.name);
        exProgRef.current?.scrollIntoView({
          behavior: "smooth"
        });
      }
    },
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 12px",
      borderRadius: 12,
      background: "rgba(255,255,255,0.03)"
    }
  }, _h("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 700,
      color: C.text
    }
  }, r.name), _h("span", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.accent
    }
  }, r.sets > 0 ? r.sets + " sets" : "no recent sets"))), drillRows.length === 0 && _h("div", {
    style: {
      textAlign: "center",
      padding: 14,
      color: C.muted,
      fontSize: 12,
      fontWeight: 600
    }
  }, "No sets logged in the last 14 days.")))), _h(SecTitle, null, "Weekly Volume Balance"), _h(Card, {
    style: {
      padding: 17
    }
  }, balAny ? _h(_F, null, _h("div", {
    style: {
      display: "flex",
      gap: 5,
      flexWrap: "wrap"
    }
  }, ["3 weeks ago", "2 weeks ago", "Last week", "This week"].map((label, i) => _h("div", {
    key: i,
    className: "press",
    onClick: () => setVolWeek(i),
    style: {
      padding: "7px 12px",
      borderRadius: 9,
      fontSize: 11,
      fontWeight: 800,
      background: volWeek === i ? C.btnGrad : "rgba(255,255,255,0.05)",
      color: volWeek === i ? C.ink : C.muted
    }
  }, label))), _h("div", {
    style: {
      marginTop: 12,
      display: "flex",
      flexDirection: "column",
      gap: 5
    }
  }, GROUPS.map(g => {
    const v = Math.round((grpWeeks[g][volWeek] || 0) * 10) / 10;
    const a = Math.min(1, v / balMax);
    return _h("div", {
      key: g,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, _h("div", {
      style: {
        width: 88,
        flexShrink: 0,
        fontSize: 11.5,
        fontWeight: 800,
        color: C.text,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, g), _h("div", {
      style: {
        flex: 1,
        height: 20,
        borderRadius: 6,
        background: "rgba(var(--acr)," + (0.06 + 0.5 * a).toFixed(2) + ")",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingRight: 8
      }
    }, _h("span", {
      style: {
        fontSize: 10.5,
        fontWeight: 800,
        color: a > 0.4 ? C.ink : C.mid
      }
    }, v, " sets")));
  })), balCallout && _h("div", {
    style: {
      marginTop: 13,
      padding: "12px 14px",
      borderRadius: 13,
      background: "rgba(226,106,79,0.08)",
      border: "1px solid rgba(226,106,79,0.25)",
      fontSize: 11.5,
      color: "#E8B39F",
      fontWeight: 700,
      lineHeight: 1.5
    }
  }, "\u26A0 ", balCallout)) : _h("div", {
    style: {
      textAlign: "center",
      padding: 16,
      color: C.muted,
      fontSize: 12.5,
      fontWeight: 600
    }
  }, "Log a few workouts to see your weekly balance here.")), _h("div", {
    ref: exProgRef
  }, _h(SecTitle, null, "Exercise Progress")), _h("div", {
    style: {
      display: "flex",
      gap: 8,
      overflowX: "auto",
      padding: "0 18px",
      marginBottom: 14
    }
  }, exChoices.map(e => _h("div", {
    key: e,
    className: "press",
    onClick: () => setSelEx(e),
    style: {
      flexShrink: 0
    }
  }, _h(Chip, {
    active: ex === e
  }, e)))), _h(Card, null, _h("div", {
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: C.text,
      marginBottom: 4
    }
  }, ex, " \u2014 Max Weight (kg)"), exData.length > 0 ? _h(ResponsiveContainer, {
    width: "100%",
    height: 150
  }, _h(AreaChart, {
    data: exData,
    margin: {
      top: 5,
      right: 5,
      bottom: 0,
      left: -20
    }
  }, _h("defs", null, _h("linearGradient", {
    id: "ag",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, _h("stop", {
    offset: "5%",
    stopColor: C.accent,
    stopOpacity: 0.2
  }), _h("stop", {
    offset: "95%",
    stopColor: C.accent,
    stopOpacity: 0
  }))), _h(XAxis, {
    dataKey: "date",
    tick: {
      fontSize: 10,
      fill: C.muted
    },
    axisLine: false,
    tickLine: false
  }), _h(YAxis, {
    tick: {
      fontSize: 10,
      fill: C.muted
    },
    axisLine: false,
    tickLine: false
  }), _h(Tooltip, {
    contentStyle: {
      background: C.glassHard,
      border: "none",
      borderRadius: 12,
      fontSize: 12
    }
  }), _h(Area, {
    type: "monotone",
    dataKey: "weight",
    stroke: C.accent,
    strokeWidth: 2.5,
    fill: "url(#ag)",
    dot: {
      fill: C.accent,
      r: 4,
      strokeWidth: 0
    }
  }))) : _h("div", {
    style: {
      color: C.muted,
      fontSize: 13,
      textAlign: "center",
      padding: 20
    }
  }, "No data yet")), _h(SecTitle, null, "Session Volume"), _h(Card, null, _h(ResponsiveContainer, {
    width: "100%",
    height: 140
  }, _h(AreaChart, {
    data: volData,
    margin: {
      top: 5,
      right: 5,
      bottom: 0,
      left: -20
    }
  }, _h("defs", null, _h("linearGradient", {
    id: "vg",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, _h("stop", {
    offset: "5%",
    stopColor: C.purple,
    stopOpacity: 0.25
  }), _h("stop", {
    offset: "95%",
    stopColor: C.purple,
    stopOpacity: 0
  }))), _h(XAxis, {
    dataKey: "date",
    tick: {
      fontSize: 10,
      fill: C.muted
    },
    axisLine: false,
    tickLine: false
  }), _h(YAxis, {
    tick: {
      fontSize: 10,
      fill: C.muted
    },
    axisLine: false,
    tickLine: false
  }), _h(Tooltip, {
    contentStyle: {
      background: C.glassHard,
      border: "none",
      borderRadius: 12,
      fontSize: 12
    }
  }), _h(Area, {
    type: "monotone",
    dataKey: "vol",
    stroke: C.purple,
    strokeWidth: 2.5,
    fill: "url(#vg)",
    dot: {
      fill: C.purple,
      r: 4,
      strokeWidth: 0
    }
  })))), _h(SecTitle, null, "\uD83C\uDFC6 Competition"), _h(Card, null, _h("div", {
    style: {
      display: "flex",
      background: "rgba(255,255,255,0.04)",
      borderRadius: 12,
      padding: 3,
      marginBottom: 16,
      gap: 3
    }
  }, [["sessions", "Sessions"], ["volume", "Volume"], ["exercise", "Exercise"]].map(([id, label]) => _h("div", {
    key: id,
    className: "press",
    onClick: () => setCompTab(id),
    style: {
      flex: 1,
      textAlign: "center",
      padding: "7px 0",
      borderRadius: 10,
      background: compTab === id ? C.glassHard : "transparent",
      color: compTab === id ? C.accent : C.muted,
      fontSize: 12,
      fontWeight: 800,
      transition: "all 0.18s"
    }
  }, label))), compTab === "exercise" && _h("div", {
    style: {
      marginBottom: 14
    }
  }, _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.muted,
      letterSpacing: 0.8,
      marginBottom: 8,
      textTransform: "uppercase"
    }
  }, "Compare on"), _h("div", {
    style: {
      display: "flex",
      gap: 6,
      overflowX: "auto",
      paddingBottom: 2
    }
  }, allCompEx.slice(0, 10).map(e => _h("div", {
    key: e,
    className: "press",
    onClick: () => setCompEx(e),
    style: {
      flexShrink: 0
    }
  }, _h(Chip, {
    active: compEx === e,
    style: {
      fontSize: 11
    }
  }, e))))), _h("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, compData.map(d => {
    const {
      val,
      label,
      max
    } = getVal(d);
    const pct = max > 0 ? Math.max(val / max * 100, val > 0 ? 4 : 0) : 0;
    return _h("div", {
      key: d.name
    }, _h("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6
      }
    }, _h("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, _h("div", {
      style: {
        width: 10,
        height: 10,
        borderRadius: 3,
        background: d.color
      }
    }), _h("div", {
      style: {
        fontSize: 13,
        fontWeight: 800,
        color: C.text
      }
    }, d.name)), _h("div", {
      style: {
        fontSize: 14,
        fontWeight: 900,
        color: d.color
      }
    }, label)), _h("div", {
      style: {
        height: 10,
        borderRadius: 5,
        background: "rgba(255,255,255,0.06)",
        overflow: "hidden"
      }
    }, _h("div", {
      style: {
        width: pct + "%",
        height: "100%",
        background: "linear-gradient(90deg," + d.color + "aa," + d.color + ")",
        borderRadius: 5,
        transition: "width 0.6s cubic-bezier(0.34,1.56,0.64,1)"
      }
    })));
  })), (() => {
    const winner = compData.reduce((a, b) => getVal(a).val >= getVal(b).val ? a : b);
    const label = compTab === "sessions" ? "most sessions" : compTab === "volume" ? "most volume" : "heaviest lift";
    if (getVal(winner).val === 0) return null;
    return _h("div", {
      style: {
        marginTop: 16,
        padding: "10px 14px",
        background: "linear-gradient(135deg,rgba(var(--acr),0.08),rgba(var(--acr),0.04))",
        border: "1px solid rgba(var(--acr),0.2)",
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, _h("div", {
      style: {
        fontSize: 24
      }
    }, "\uD83E\uDD47"), _h("div", null, _h("div", {
      style: {
        fontSize: 13,
        fontWeight: 800,
        color: C.text
      }
    }, winner.name, " leads with ", label), _h("div", {
      style: {
        fontSize: 12,
        color: C.muted,
        fontWeight: 600
      }
    }, getVal(winner).label)));
  })()), _h(SecTitle, null, "Personal Records"), prRows.map(p => {
    const isNew = nowMs - p.ts < 30 * 86400000;
    const gain = p.prev != null ? Math.round((p.e1 - p.prev) * 10) / 10 : null;
    return _h(Card, {
      key: p.name,
      style: {
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        gap: 14
      }
    }, _h("div", {
      style: {
        width: 40,
        height: 40,
        borderRadius: 13,
        background: "rgba(var(--acr),0.14)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18
      }
    }, "\uD83C\uDFC6"), _h("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, _h("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 7
      }
    }, _h("span", {
      style: {
        fontSize: 14,
        fontWeight: 800,
        color: C.text
      }
    }, p.name), (isNew || gain != null) && _h("span", {
      style: {
        fontSize: 9,
        fontWeight: 800,
        letterSpacing: 0.6,
        padding: "2px 6px",
        borderRadius: 6,
        background: isNew ? "rgba(87,192,138,0.16)" : "rgba(255,255,255,0.06)",
        color: isNew ? C.good : C.mid
      }
    }, isNew ? "NEW" : "+" + gain + " kg")), _h("div", {
      style: {
        fontSize: 11,
        color: C.muted,
        fontWeight: 600,
        marginTop: 2
      }
    }, p.date, " \xB7 ", p.kg, " kg \xD7 ", p.reps)), _h("div", {
      className: "sora",
      style: {
        fontWeight: 800,
        fontSize: 17,
        color: C.accent
      }
    }, Math.round(p.e1 * 2) / 2, " kg"));
  }), prRows.length === 0 && _h(Card, null, _h("div", {
    style: {
      color: C.muted,
      fontSize: 13,
      textAlign: "center",
      padding: 8
    }
  }, "Log weighted sets to start tracking PRs")), _h("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "6px 18px 10px"
    }
  }, _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.muted,
      letterSpacing: 1.2,
      textTransform: "uppercase"
    }
  }, "Recent Sessions"), hasMore && _h("div", {
    className: "press",
    onClick: () => go("fullHistory"),
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: C.accent
    }
  }, "View all ", history.length, " \u2192")), recentHistory.map(h => _h(Card, {
    key: h.id,
    style: {
      padding: "14px 16px"
    }
  }, _h("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, _h("div", null, _h("div", {
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: C.text
    }
  }, h.workoutName), _h("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      fontWeight: 600
    }
  }, h.collectionName, " \xB7 ", h.date, " \xB7 ", h.dur, " min")), _h(Chip, null, (h.vol || 0).toLocaleString(), " kg")))), hasMore && _h("div", {
    className: "press",
    onClick: () => go("fullHistory"),
    style: {
      margin: "4px 18px 20px",
      padding: "13px",
      borderRadius: 16,
      border: "1.5px solid rgba(var(--acr),0.3)",
      textAlign: "center",
      color: C.accent,
      fontSize: 13,
      fontWeight: 800
    }
  }, "View all ", history.length, " sessions \u2192")));
}
const WMODES = [{
  id: "cut",
  label: "Cut",
  emoji: "🔥"
}, {
  id: "maintain",
  label: "Maintain",
  emoji: "⚖️"
}, {
  id: "bulk",
  label: "Bulk",
  emoji: "🍚"
}];
function parseWDate(dstr) {
  if (!dstr) return null;
  const t = Date.parse(dstr + " " + new Date().getFullYear());
  if (isNaN(t)) return null;
  const d = new Date(t);
  if (d.getTime() > Date.now() + 2 * 864e5) d.setFullYear(d.getFullYear() - 1);
  return d;
}
function weeklyRate(weights) {
  if (!weights || weights.length < 2) return null;
  const last4 = weights.slice(-4);
  const d0 = parseWDate(last4[0].date),
    d1 = parseWDate(last4[last4.length - 1].date);
  if (!d0 || !d1) return null;
  const days = (d1 - d0) / 864e5;
  if (days < 3) return null;
  return (last4[last4.length - 1].w - last4[0].w) / (days / 7);
}
function Body({
  weights,
  onAdd,
  onDelete,
  go,
  goBack,
  user
}) {
  const uid = user ? user.id : "solo";
  const [val, setVal] = useState("");
  const [mode, setMode] = useState(() => {
    try {
      const m = localStorage.getItem("il_wmode_" + uid);
      return WMODES.some(x => x.id === m) ? m : "cut";
    } catch (e) {
      return "cut";
    }
  });
  const [goalStr, setGoalStr] = useState(() => {
    try {
      return localStorage.getItem("il_goalw_" + uid + "_" + (() => {
        const m = localStorage.getItem("il_wmode_" + uid);
        return WMODES.some(x => x.id === m) ? m : "cut";
      })()) || "";
    } catch (e) {
      return "";
    }
  });
  const pickMode = m => {
    setMode(m);
    try {
      localStorage.setItem("il_wmode_" + uid, m);
    } catch (e) {}
    try {
      setGoalStr(localStorage.getItem("il_goalw_" + uid + "_" + m) || "");
    } catch (e) {
      setGoalStr("");
    }
  };
  const setGoal = s => {
    setGoalStr(s);
    try {
      s ? localStorage.setItem("il_goalw_" + uid + "_" + mode, s) : localStorage.removeItem("il_goalw_" + uid + "_" + mode);
    } catch (e) {}
  };
  const mi = WMODES.find(m => m.id === mode) || WMODES[0];
  const cur = weights[weights.length - 1];
  const first = weights[0];
  const delta = cur && first ? +(cur.w - first.w).toFixed(1) : null;
  const goal = goalStr !== "" && !isNaN(parseFloat(goalStr)) ? parseFloat(goalStr) : null;
  const rate = weeklyRate(weights);
  const add = () => {
    if (!val || isNaN(parseFloat(val))) return;
    onAdd(val);
    setVal("");
  };
  const sgn = n => (n > 0 ? "+" : "") + n;
  const deltaGood = delta !== null && (mode === "bulk" ? delta > 0 : mode === "cut" ? delta < 0 : Math.abs(delta) <= 1);
  const deltaBad = delta !== null && delta !== 0 && !deltaGood;
  let pct = null,
    bandPos = null,
    inBand = false;
  if (goal !== null && cur && first) {
    if (mode === "maintain") {
      bandPos = Math.max(0, Math.min(100, (cur.w - (goal - 1)) / 2 * 100));
      inBand = Math.abs(cur.w - goal) <= 1;
    } else if (Math.abs(goal - first.w) > 0.01) {
      pct = Math.round(Math.max(0, Math.min(100, (cur.w - first.w) / (goal - first.w) * 100)));
    }
  }
  let planLine, etaLine;
  if (!cur) {
    planLine = "Log your first weigh-in";
    etaLine = "Your plan and ETA appear once you have entries";
  } else if (goal === null) {
    planLine = mi.label + " mode";
    etaLine = mode === "maintain" ? "Set a goal weight to anchor your ±1 kg band" : "Set a goal weight to get a plan and ETA";
  } else if (mode === "maintain") {
    const dev = +(cur.w - goal).toFixed(1);
    planLine = "Holding at " + goal + " kg";
    etaLine = Math.abs(dev) <= 1 ? "Inside your ±1 kg band - nicely steady" : dev > 0 ? Math.abs(dev) + " kg above your band - ease off a little" : Math.abs(dev) + " kg below your band - eat a little more";
  } else {
    const dist = +(goal - cur.w).toFixed(1);
    const toGo = Math.abs(dist);
    if (toGo <= 0.2) {
      planLine = (mode === "cut" ? "Cut" : "Bulk") + " goal reached · " + goal + " kg";
      etaLine = "Switch to Maintain to hold it here";
    } else {
      planLine = (mode === "cut" ? "Cutting to " : "Bulking to ") + goal + " kg · " + toGo + " kg to go";
      if (rate === null || Math.abs(rate) < 0.05 || rate * dist < 0) etaLine = "No consistent trend yet - keep logging";else {
        const weeksLeft = dist / rate;
        if (weeksLeft > 104) etaLine = "Over 2 years at this pace - keep logging";else {
          const eta = new Date(Date.now() + weeksLeft * 7 * 864e5);
          etaLine = "At this pace you'll reach " + goal + " kg by " + eta.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric"
          });
        }
      }
    }
  }
  const rateShown = rate !== null ? Math.round(rate * 100) / 100 : null;
  const tiles = [{
    n: cur ? cur.w + " kg" : "–",
    l: "CURRENT",
    fg: C.text
  }, {
    n: delta !== null ? sgn(delta) + " kg" : "–",
    l: "SINCE START",
    fg: delta === null || delta === 0 ? C.mid : deltaGood ? C.good : mode === "maintain" ? "#F2B33D" : C.danger
  }, {
    n: rateShown !== null ? sgn(rateShown) + " kg" : "–",
    l: "PER WEEK",
    fg: rateShown === null || Math.abs(rateShown) < 0.05 ? C.mid : (mode === "bulk" ? rateShown > 0 : mode === "cut" ? rateShown < 0 : Math.abs(rateShown) < 0.15) ? C.good : "#E4A33C"
  }];
  return _h("div", {
    style: {
      minHeight: "100vh",
      paddingBottom: 32
    },
    className: "slide"
  }, _h(PageHeader, {
    goBack: goBack,
    title: "Body Weight \u2696\uFE0F",
    subtitle: "Your trend, plan and history"
  }), _h("div", {
    style: {
      margin: "0 18px 14px",
      borderRadius: 28,
      padding: 22,
      background: C.amberGrad,
      boxShadow: "0 20px 44px rgba(var(--acdr),0.32)"
    }
  }, _h("div", {
    style: {
      fontSize: 10,
      fontWeight: 800,
      letterSpacing: 2,
      color: "rgba(var(--inkr),0.6)"
    }
  }, "TODAY'S WEIGHT"), _h("div", {
    style: {
      marginTop: 8,
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      gap: 10
    }
  }, _h("div", {
    className: "sora",
    style: {
      fontWeight: 800,
      fontSize: 44,
      lineHeight: 1,
      letterSpacing: -1.6,
      color: C.ink
    }
  }, cur ? cur.w : "–", " ", _h("span", {
    style: {
      fontSize: 18,
      fontWeight: 700
    }
  }, "kg")), delta !== null && _h("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 800,
      color: deltaGood ? C.good : deltaBad ? mode === "maintain" ? "#F2B33D" : C.danger : C.mid,
      background: "rgba(var(--inkr),0.88)",
      padding: "6px 12px",
      borderRadius: 10,
      flexShrink: 0,
      boxShadow: "0 4px 14px rgba(var(--inkr),0.28)"
    }
  }, sgn(delta), " kg")), _h("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: "rgba(var(--inkr),0.62)",
      marginTop: 2
    }
  }, cur ? "since start · last " + cur.date : "log your first entry below"), _h("div", {
    style: {
      marginTop: 16,
      display: "flex",
      gap: 8
    }
  }, _h("input", {
    value: val,
    onChange: e => setVal(e.target.value),
    type: "number",
    inputMode: "decimal",
    placeholder: "e.g. 82.5",
    style: {
      flex: 1,
      minWidth: 0,
      padding: "12px 14px",
      background: "rgba(var(--inkr),0.12)",
      border: "1.5px solid rgba(var(--inkr),0.22)",
      borderRadius: 15,
      fontSize: 14,
      fontWeight: 700,
      color: C.ink,
      outline: "none"
    }
  }), _h("div", {
    className: "press sora",
    onClick: add,
    style: {
      padding: "12px 20px",
      borderRadius: 15,
      background: C.ink,
      color: "var(--acl)",
      fontWeight: 800,
      fontSize: 14,
      display: "flex",
      alignItems: "center"
    }
  }, "+ Log"))), _h("div", {
    style: {
      margin: "0 18px 14px",
      display: "flex",
      gap: 4,
      padding: 4,
      borderRadius: 15,
      background: "rgba(255,255,255,0.045)",
      border: "1px solid " + C.border
    }
  }, WMODES.map(m => _h("div", {
    key: m.id,
    className: "press",
    onClick: () => pickMode(m.id),
    style: {
      flex: 1,
      textAlign: "center",
      padding: "9px 0",
      borderRadius: 11,
      fontSize: 12,
      fontWeight: 800,
      background: mode === m.id ? C.accent : "transparent",
      color: mode === m.id ? C.ink : C.muted,
      transition: "background 0.2s"
    }
  }, m.label))), _h(Card, {
    style: {
      borderRadius: 26,
      padding: 22
    }
  }, _h("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10
    }
  }, _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      letterSpacing: 1.5,
      color: C.muted
    }
  }, "WEIGHT TREND"), _h("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, _h("input", {
    value: goalStr,
    onChange: e => setGoal(e.target.value),
    type: "number",
    inputMode: "decimal",
    placeholder: "--",
    style: {
      width: 62,
      textAlign: "right",
      padding: "4px 8px",
      background: "rgba(255,255,255,0.06)",
      border: "1px solid " + C.border,
      borderRadius: 9,
      fontSize: 15,
      fontWeight: 800,
      color: C.accent,
      outline: "none",
      fontFamily: "'Sora',sans-serif"
    }
  }), _h("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted
    }
  }, "kg ", mi.label.toLowerCase(), " target"))), weights.length > 1 && _h("div", {
    style: {
      marginTop: 14
    }
  }, _h(ResponsiveContainer, {
    width: "100%",
    height: 160
  }, _h(AreaChart, {
    data: weights,
    margin: {
      top: 5,
      right: 5,
      bottom: 0,
      left: -20
    }
  }, _h("defs", null, _h("linearGradient", {
    id: "wg",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, _h("stop", {
    offset: "5%",
    stopColor: C.accent,
    stopOpacity: 0.2
  }), _h("stop", {
    offset: "95%",
    stopColor: C.accent,
    stopOpacity: 0
  }))), _h(XAxis, {
    dataKey: "date",
    tick: {
      fontSize: 10,
      fill: C.muted
    },
    axisLine: false,
    tickLine: false
  }), _h(YAxis, {
    tick: {
      fontSize: 10,
      fill: C.muted
    },
    axisLine: false,
    tickLine: false,
    domain: ["auto", "auto"]
  }), _h(Tooltip, {
    contentStyle: {
      background: C.glassHard,
      border: "none",
      borderRadius: 12,
      fontSize: 12
    },
    formatter: v => [v + " kg", "Weight"]
  }), _h(Area, {
    type: "monotone",
    dataKey: "w",
    stroke: C.accent,
    strokeWidth: 2.5,
    fill: "url(#wg)",
    dot: {
      fill: C.accent,
      r: 4,
      strokeWidth: 0
    }
  })))), goal !== null && cur && mode !== "maintain" && pct !== null && _h(_F, null, _h("div", {
    style: {
      marginTop: 16,
      height: 9,
      borderRadius: 5,
      background: "rgba(255,255,255,0.06)",
      overflow: "hidden"
    }
  }, _h("div", {
    style: {
      height: "100%",
      borderRadius: 5,
      width: pct + "%",
      background: C.btnGrad,
      transition: "width 0.5s"
    }
  })), _h("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 7
    }
  }, _h("span", {
    style: {
      fontSize: 10.5,
      fontWeight: 700,
      color: C.muted
    }
  }, first.w, " kg start"), _h("span", {
    style: {
      fontSize: 10.5,
      fontWeight: 800,
      color: C.accent
    }
  }, pct, "% there"), _h("span", {
    style: {
      fontSize: 10.5,
      fontWeight: 700,
      color: C.muted
    }
  }, goal, " kg goal"))), goal !== null && cur && mode === "maintain" && _h(_F, null, _h("div", {
    style: {
      marginTop: 16,
      height: 9,
      borderRadius: 5,
      background: "rgba(255,255,255,0.06)",
      overflow: "hidden",
      position: "relative"
    }
  }, _h("div", {
    style: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: bandPos + "%",
      borderRadius: 5,
      background: inBand ? C.good : "#F2B33D",
      opacity: 0.85,
      transition: "width 0.5s"
    }
  })), _h("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 7
    }
  }, _h("span", {
    style: {
      fontSize: 10.5,
      fontWeight: 700,
      color: C.muted
    }
  }, +(goal - 1).toFixed(1), " kg"), _h("span", {
    style: {
      fontSize: 10.5,
      fontWeight: 800,
      color: inBand ? C.good : "#F2B33D"
    }
  }, "\xB11 kg band", inBand ? " ✓" : ""), _h("span", {
    style: {
      fontSize: 10.5,
      fontWeight: 700,
      color: C.muted
    }
  }, +(goal + 1).toFixed(1), " kg"))), goal === null && _h("div", {
    style: {
      marginTop: 14,
      fontSize: 12,
      fontWeight: 700,
      color: C.muted
    }
  }, "Set a goal weight above to track progress")), _h("div", {
    style: {
      margin: "0 18px 14px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 9
    }
  }, tiles.map((t, i) => _h("div", {
    key: i,
    style: {
      background: C.glass,
      border: "1px solid " + C.border,
      borderRadius: 18,
      padding: "14px 12px"
    }
  }, _h("div", {
    className: "sora",
    style: {
      fontSize: 19,
      fontWeight: 800,
      color: t.fg,
      lineHeight: 1
    }
  }, t.n), _h("div", {
    style: {
      fontSize: 9,
      fontWeight: 800,
      letterSpacing: 0.8,
      color: C.muted,
      marginTop: 6
    }
  }, t.l)))), _h("div", {
    style: {
      margin: "0 18px 14px",
      display: "flex",
      alignItems: "center",
      gap: 13,
      padding: "15px 17px",
      borderRadius: 20,
      background: "rgba(var(--acr),0.07)",
      border: "1px solid rgba(var(--acr),0.18)"
    }
  }, _h("span", {
    style: {
      fontSize: 22
    }
  }, mi.emoji), _h("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, _h("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: C.text
    }
  }, planLine), _h("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 600,
      color: C.muted,
      marginTop: 2
    }
  }, etaLine))), weights.length > 0 && _h(_F, null, _h(SecTitle, null, "History"), _h("div", {
    style: {
      margin: "0 18px",
      display: "flex",
      flexDirection: "column",
      gap: 9
    }
  }, [...weights].reverse().map((w, i, arr) => {
    const realIdx = weights.length - 1 - i;
    const prev = arr[i + 1];
    const d = prev ? +(w.w - prev.w).toFixed(1) : 0;
    return _h("div", {
      key: realIdx,
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 16px",
        borderRadius: 16,
        background: C.surface,
        border: "1px solid rgba(255,255,255,0.05)"
      }
    }, _h("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: C.mid
      }
    }, w.date), _h("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, _h("span", {
      className: "sora",
      style: {
        fontWeight: 800,
        fontSize: 16,
        color: C.text
      }
    }, w.w, " kg"), _h("span", {
      style: {
        fontSize: 11,
        fontWeight: 800,
        color: d < 0 ? C.good : d > 0 ? "#E4726F" : C.faint
      }
    }, d === 0 ? "–" : d < 0 ? "▼ " + Math.abs(d) : "▲ " + d), _h("div", {
      className: "press",
      onClick: () => onDelete(realIdx),
      style: {
        width: 28,
        height: 28,
        borderRadius: 8,
        background: "rgba(255,107,107,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        color: C.danger
      }
    }, "\u2715")));
  }))));
}
function Mail({
  user,
  users,
  messages,
  onSelect,
  onCompose,
  go,
  goBack,
  allHistory = {},
  mySubs = [],
  onToggleSub
}) {
  const [tab, setTab] = useState("people");
  const [q, setQ] = useState("");
  const [mailTab, setMailTab] = useState("inbox");
  const inbox = messages.filter(m => m.to === user.id).sort((a, b) => b.time.localeCompare(a.time));
  const sent = messages.filter(m => m.from === user.id).sort((a, b) => b.time.localeCompare(a.time));
  const unreadN = inbox.filter(m => !m.read).length;
  const getU = id => users.find(u => u.id === id);
  const list = mailTab === "inbox" ? inbox : sent;
  const statsFor = uid => {
    const hist = allHistory[uid] || [];
    const streak = calcStreak(hist);
    const wkCut = Date.now() - 7 * 86400000;
    const week = hist.reduce((n, h) => new Date(h.date + "T12:00:00").getTime() >= wkCut ? n + (h.vol || 0) : n, 0);
    let bestKg = 0,
      bestEx = "";
    hist.forEach(h => (h.sets || []).forEach(s => {
      const kg = +s.kg || 0,
        reps = +s.reps || 0;
      if (kg > 0 && reps >= 1) {
        const e = kg * (1 + reps / 30);
        if (e > bestKg) {
          bestKg = e;
          bestEx = s.ex;
        }
      }
    }));
    return {
      streak,
      sessions: hist.length,
      week: week >= 1000 ? (week / 1000).toFixed(1) + "k" : String(Math.round(week)),
      pr: bestEx ? bestEx + " " + Math.round(bestKg) + " kg" : "—"
    };
  };
  const sq = q.trim().toLowerCase();
  const people = users.filter(u => u.id !== user.id && (!sq || u.name.toLowerCase().includes(sq)));
  return _h("div", {
    style: {
      minHeight: "100vh",
      paddingBottom: 32
    },
    className: "slide"
  }, _h("div", {
    style: {
      background: "#16120D",
      padding: "20px 18px 0"
    }
  }, _h("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start"
    }
  }, _h(BackBtn, {
    goBack: goBack
  }), _h(Ava, {
    user: user,
    size: 44
  })), _h("div", {
    style: {
      marginTop: 18,
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: 2.5,
      color: C.muted
    }
  }, "PEOPLE & MESSAGES"), _h("div", {
    className: "sora",
    style: {
      marginTop: 7,
      fontWeight: 800,
      fontSize: 40,
      lineHeight: 1,
      letterSpacing: -1.2,
      color: C.text
    }
  }, "Your ", _h("span", {
    style: {
      background: C.btnGrad,
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent"
    }
  }, "Social")), _h("div", {
    style: {
      display: "flex",
      background: C.surface,
      border: "1px solid " + C.border,
      borderRadius: 12,
      padding: 3,
      marginTop: 16,
      gap: 3
    }
  }, [["people", "People"], ["msgs", "Messages" + (unreadN ? " (" + unreadN + ")" : "")]].map(([id, label]) => _h("div", {
    key: id,
    className: "press",
    onClick: () => setTab(id),
    style: {
      flex: 1,
      textAlign: "center",
      padding: "8px 0",
      borderRadius: 10,
      background: tab === id ? C.glassHard : "transparent",
      color: tab === id ? C.accent : C.muted,
      fontSize: 12.5,
      fontWeight: 800,
      transition: "all 0.2s"
    }
  }, label)))), tab === "people" && _h("div", {
    style: {
      padding: "0 18px"
    }
  }, _h("input", {
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Search people\u2026",
    style: {
      marginTop: 18,
      width: "100%",
      padding: "13px 16px",
      background: "rgba(255,255,255,0.05)",
      border: "1.5px solid rgba(255,255,255,0.08)",
      borderRadius: 14,
      color: C.text,
      fontSize: 13.5,
      fontWeight: 600,
      outline: "none",
      display: "block"
    }
  }), _h("div", {
    style: {
      marginTop: 16,
      fontSize: 11,
      fontWeight: 800,
      letterSpacing: 1.5,
      color: C.muted
    }
  }, "TRAINING ", _h("span", {
    style: {
      color: C.text
    }
  }, "CIRCLE"), " ", "·", " subscribe for a ping when they start"), _h("div", {
    style: {
      marginTop: 12,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, people.map(u => {
    const st = statsFor(u.id);
    const on = mySubs.includes(u.id);
    return _h("div", {
      key: u.id,
      style: {
        borderRadius: 20,
        padding: "15px 16px",
        background: C.glass,
        border: "1px solid " + C.border
      }
    }, _h("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12
      }
    }, _h(Ava, {
      user: u,
      size: 44
    }), _h("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, _h("div", {
      style: {
        fontSize: 14.5,
        fontWeight: 800,
        color: C.text
      }
    }, u.name), _h("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: C.muted,
        marginTop: 2
      }
    }, "🔥", " ", st.streak, " day streak ", "·", " ", st.week, " kg this week")), _h("div", {
      className: "press",
      onClick: () => onToggleSub && onToggleSub(u.id),
      style: on ? {
        padding: "8px 13px",
        borderRadius: 11,
        background: "rgba(var(--acr),0.15)",
        border: "1px solid rgba(var(--acr),0.4)",
        color: C.accent,
        fontSize: 11.5,
        fontWeight: 800,
        flexShrink: 0
      } : {
        padding: "8px 13px",
        borderRadius: 11,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.09)",
        color: C.muted,
        fontSize: 11.5,
        fontWeight: 800,
        flexShrink: 0
      }
    }, on ? "🔔 Subscribed" : "🔕 Subscribe")), _h("div", {
      style: {
        marginTop: 12,
        display: "flex",
        gap: 8
      }
    }, _h("div", {
      style: {
        flex: 1,
        padding: "9px 11px",
        borderRadius: 12,
        background: C.surface
      }
    }, _h("div", {
      className: "sora",
      style: {
        fontSize: 15,
        fontWeight: 800,
        color: C.text
      }
    }, st.sessions), _h("div", {
      style: {
        fontSize: 9,
        fontWeight: 800,
        letterSpacing: 0.7,
        color: C.muted,
        marginTop: 2
      }
    }, "SESSIONS")), _h("div", {
      style: {
        flex: 2,
        minWidth: 0,
        padding: "9px 11px",
        borderRadius: 12,
        background: C.surface
      }
    }, _h("div", {
      className: "sora",
      style: {
        fontSize: 13,
        fontWeight: 800,
        color: C.accent,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, st.pr), _h("div", {
      style: {
        fontSize: 9,
        fontWeight: 800,
        letterSpacing: 0.7,
        color: C.muted,
        marginTop: 2
      }
    }, "BEST LIFT")), _h("div", {
      className: "press",
      onClick: () => onCompose(u.id),
      style: {
        flex: "none",
        padding: "9px 13px",
        borderRadius: 12,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        color: "#C9BEAD",
        fontSize: 11.5,
        fontWeight: 800,
        display: "flex",
        alignItems: "center"
      }
    }, "✉", " Message")));
  }), people.length === 0 && _h("div", {
    style: {
      textAlign: "center",
      padding: 26,
      color: C.muted,
      fontSize: 12.5,
      fontWeight: 600
    }
  }, "No one matches that search."))), tab === "msgs" && _h(_F, null, _h("div", {
    style: {
      display: "flex",
      gap: 8,
      padding: "16px 18px 0"
    }
  }, _h(Chip, {
    active: mailTab === "inbox",
    onClick: () => setMailTab("inbox")
  }, "Inbox", unreadN ? " (" + unreadN + " unread)" : ""), _h(Chip, {
    active: mailTab === "sent",
    onClick: () => setMailTab("sent")
  }, "Sent (", sent.length, ")")), _h("div", {
    className: "press",
    onClick: () => onCompose(),
    style: {
      margin: "14px 18px",
      display: "flex",
      alignItems: "center",
      gap: 11,
      padding: "14px 16px",
      borderRadius: 18,
      background: "rgba(var(--acr),0.09)",
      border: "1.5px dashed rgba(var(--acr),0.35)"
    }
  }, _h("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 11,
      background: "rgba(var(--acr),0.16)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: C.accent,
      fontSize: 16,
      fontWeight: 800
    }
  }, "✎"), _h("span", {
    style: {
      fontSize: 13.5,
      fontWeight: 800,
      color: C.accent
    }
  }, "New message")), list.length === 0 && _h("div", {
    style: {
      textAlign: "center",
      padding: "48px 18px",
      color: C.muted
    }
  }, _h("div", {
    style: {
      fontSize: 48
    }
  }, mailTab === "inbox" ? "📭" : "📤"), _h("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      marginTop: 12
    }
  }, mailTab === "inbox" ? "No messages yet" : "No sent messages")), list.map(msg => {
    const otherUser = getU(mailTab === "inbox" ? msg.from : msg.to);
    const un = mailTab === "inbox" && !msg.read;
    return _h(Card, {
      key: msg.id,
      onClick: () => mailTab === "inbox" ? onSelect(msg) : null,
      style: {
        borderRadius: 20,
        padding: 16,
        cursor: mailTab === "inbox" ? "pointer" : "default",
        border: "1px solid " + (un ? "rgba(var(--acr),0.25)" : C.border)
      }
    }, _h("div", {
      style: {
        display: "flex",
        gap: 13,
        alignItems: "flex-start"
      }
    }, otherUser && _h(Ava, {
      user: otherUser,
      size: 44
    }), _h("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, _h("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    }, _h("div", {
      style: {
        fontSize: 14,
        fontWeight: 800,
        color: C.text
      }
    }, mailTab === "inbox" ? "" : "To: ", otherUser?.name), _h("div", {
      style: {
        fontSize: 10,
        color: C.faint,
        fontWeight: 700
      }
    }, new Date(msg.time).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short"
    }))), _h("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: un ? C.accent : C.mid,
        marginTop: 2
      }
    }, msg.subject), _h("div", {
      style: {
        fontSize: 12,
        color: C.muted,
        fontWeight: 500,
        marginTop: 3,
        lineHeight: 1.4,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, msg.body)), un && _h("div", {
      style: {
        width: 9,
        height: 9,
        borderRadius: "50%",
        background: C.accent,
        flexShrink: 0,
        marginTop: 4
      }
    })));
  })));
}
function MailDetail({
  msg,
  users,
  go,
  goBack,
  onReply
}) {
  if (!msg) return null;
  const sender = users.find(u => u.id === msg.from);
  return _h("div", {
    style: {
      minHeight: "100vh",
      paddingBottom: 32
    },
    className: "slide"
  }, _h("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      padding: "36px 18px 16px"
    }
  }, _h(Btn, {
    sm: true,
    outline: true,
    onClick: () => go("mail")
  }, "\u2190 Back"), _h(Btn, {
    sm: true,
    onClick: onReply
  }, "Reply")), _h(Card, null, _h("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center",
      marginBottom: 16
    }
  }, sender && _h(Ava, {
    user: sender,
    size: 46
  }), _h("div", null, _h("div", {
    style: {
      fontSize: 15,
      fontWeight: 800,
      color: C.text
    }
  }, sender?.name), _h("div", {
    style: {
      fontSize: 11,
      color: C.muted
    }
  }, new Date(msg.time).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  })))), _h("div", {
    style: {
      fontSize: 18,
      fontWeight: 900,
      color: C.text,
      marginBottom: 16
    }
  }, msg.subject), _h("div", {
    style: {
      fontSize: 14,
      color: C.mid,
      lineHeight: 1.75,
      fontWeight: 500
    }
  }, msg.body)));
}
function Compose({
  user,
  users,
  go,
  goBack,
  onSend,
  initialTo = ""
}) {
  const [to, setTo] = useState(initialTo);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sent, setSent] = useState(false);
  const others = users.filter(u => u.id !== user.id);
  const send = () => {
    if (!to || !subject || !body) return;
    onSend(to, subject, body);
    setSent(true);
    setTimeout(() => go("mail"), 1000);
  };
  return _h("div", {
    style: {
      minHeight: "100vh",
      paddingBottom: 32
    },
    className: "slide"
  }, _h("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: 44,
      padding: "20px 18px 16px"
    }
  }, _h("div", {
    style: {
      position: "absolute",
      left: 18
    }
  }, _h(BackBtn, {
    goBack: goBack
  })), _h("div", {
    style: {
      fontSize: 22,
      fontWeight: 900,
      color: C.text
    }
  }, "New Message"), _h("div", {
    style: {
      position: "absolute",
      right: 18
    }
  }, _h(Btn, {
    sm: true,
    outline: true,
    onClick: () => go("mail")
  }, "Cancel"))), _h(Card, null, _h("div", {
    style: {
      marginBottom: 14
    }
  }, _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.muted,
      letterSpacing: 0.8,
      textTransform: "uppercase",
      marginBottom: 8
    }
  }, "To"), _h("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, others.map(u => _h("div", {
    key: u.id,
    className: "press",
    onClick: () => setTo(u.id),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "8px 14px",
      borderRadius: 12,
      background: to === u.id ? C.accentBg : "rgba(255,255,255,0.05)",
      border: "1.5px solid " + (to === u.id ? C.accent : "transparent"),
      cursor: "pointer"
    }
  }, _h(Ava, {
    user: u,
    size: 28
  }), _h("span", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: to === u.id ? C.accentDark : C.mid
    }
  }, u.name))))), _h(FInput, {
    label: "Subject",
    value: subject,
    onChange: e => setSubject(e.target.value),
    placeholder: "What's it about?"
  }), _h("div", null, _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.muted,
      letterSpacing: 0.8,
      textTransform: "uppercase",
      marginBottom: 6
    }
  }, "Message"), _h("textarea", {
    value: body,
    onChange: e => setBody(e.target.value),
    placeholder: "Write your message...",
    style: {
      width: "100%",
      minHeight: 130,
      padding: "12px 14px",
      background: "rgba(255,255,255,0.05)",
      border: "1.5px solid rgba(var(--acr),0.2)",
      borderRadius: 13,
      fontSize: 14,
      color: C.text,
      outline: "none",
      resize: "vertical",
      lineHeight: 1.65,
      fontFamily: "'Manrope',sans-serif"
    }
  })), _h(Btn, {
    full: true,
    onClick: send,
    style: {
      marginTop: 14,
      background: sent ? "#4caf50" : undefined
    }
  }, sent ? "✓ Sent!" : "Send Message")));
}
function calcStreak(history) {
  const dates = new Set((history || []).map(h => h.date));
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const ds = d.toISOString().slice(0, 10);
    if (dates.has(ds)) streak++;else if (i > 0) break;
  }
  return streak;
}
function monthStats(history) {
  const cutoff = Date.now() - 30 * 24 * 3600e3;
  const sorted = (history || []).slice().sort((a, b) => entryTime(a) - entryTime(b));
  const runningMax = {};
  let newPRs = 0,
    best = null;
  sorted.forEach(h => {
    const isRecent = entryTime(h) >= cutoff;
    const hitThisSession = {};
    (h.sets || []).forEach(s => {
      if (!s.ex) return;
      const top = s.drops && s.drops.length ? Math.max(...s.drops.map(d => d.kg || 0)) : s.kg || 0;
      if (!top) return;
      const prevMax = runningMax[s.ex] || 0;
      if (top > prevMax) {
        runningMax[s.ex] = top;
        if (isRecent && !hitThisSession[s.ex]) {
          hitThisSession[s.ex] = true;
          newPRs++;
          if (prevMax && (!best || top - prevMax > best.delta)) best = {
            ex: s.ex,
            delta: Math.round((top - prevMax) * 10) / 10
          };
        }
      }
    });
  });
  const recent = sorted.filter(h => entryTime(h) >= cutoff);
  const kgMoved = recent.reduce((a, h) => a + (h.vol || 0), 0);
  return {
    sessions: recent.length,
    kgMoved,
    newPRs,
    best
  };
}
function TrialEndingCard({
  history,
  daysLeft = 3,
  lockDate = "5 September",
  price = "€19.99/yr",
  onSubscribe,
  onSeePlans,
  goBack
}) {
  const {
    sessions,
    kgMoved,
    newPRs,
    best
  } = monthStats(history);
  const streak = calcStreak(history);
  const fmtKg = kgMoved >= 1000 ? Math.round(kgMoved / 100) / 10 + "k" : Math.round(kgMoved);
  return _h("div", {
    className: "slide",
    style: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      padding: "0 22px 28px",
      background: "radial-gradient(90% 40% at 50% 0%,#2A2012 0%,#0C0906 58%)"
    }
  }, _h("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "18px 0 0"
    }
  }, _h("div", {
    className: "press",
    onClick: goBack,
    style: {
      color: C.muted,
      fontSize: 22,
      fontWeight: 800
    }
  }, "\u2039"), _h("span", {
    style: {
      color: C.faint,
      fontSize: 12,
      letterSpacing: 2
    }
  }, "\u2022\u2022\u2022")), _h("div", {
    style: {
      marginTop: 18
    }
  }, _h("div", {
    style: {
      color: C.accent,
      fontSize: 11,
      fontWeight: 800,
      letterSpacing: 1.5
    }
  }, daysLeft, " DAYS OF FREE LEFT"), _h("div", {
    className: "sora",
    style: {
      marginTop: 11,
      fontSize: 30,
      fontWeight: 800,
      color: C.text,
      lineHeight: 1.15
    }
  }, "Look what you", _h("br", null), "built in a month")), _h("div", {
    style: {
      marginTop: 16,
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 9
    }
  }, [["Sessions logged", sessions, C.text], ["Kg moved", fmtKg, C.text], ["Day streak", streak, C.accent], ["New PRs", newPRs, C.good]].map(([label, val, color]) => _h("div", {
    key: label,
    style: {
      padding: 14,
      borderRadius: 16,
      background: C.glass,
      border: "1px solid " + C.border
    }
  }, _h("div", {
    className: "sora",
    style: {
      fontSize: 20,
      fontWeight: 800,
      color
    }
  }, val), _h("div", {
    style: {
      marginTop: 4,
      fontSize: 8.5,
      fontWeight: 800,
      letterSpacing: 0.8,
      color: C.faint
    }
  }, label.toUpperCase())))), best && _h("div", {
    style: {
      marginTop: 11,
      padding: "14px 16px",
      borderRadius: 18,
      background: "linear-gradient(150deg,rgba(var(--acr),0.14),rgba(var(--acr),0.04))",
      border: "1.5px solid rgba(var(--acr),0.3)"
    }
  }, _h("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 800,
      color: C.text
    }
  }, best.ex, " +", best.delta, "kg in four weeks"), _h("div", {
    style: {
      marginTop: 3,
      fontSize: 10.5,
      fontWeight: 700,
      color: C.muted
    }
  }, "The fastest run you've logged.")), _h("div", {
    style: {
      marginTop: 14,
      padding: "14px 16px",
      borderRadius: 16,
      background: "rgba(226,106,79,0.1)",
      border: "1px solid rgba(226,106,79,0.25)"
    }
  }, _h("div", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: C.text
    }
  }, "\uD83D\uDD12 On ", lockDate, " this all locks"), _h("div", {
    style: {
      marginTop: 6,
      fontSize: 11,
      fontWeight: 700,
      lineHeight: 1.6,
      color: "#E8B39F"
    }
  }, "Nothing is deleted \u2014 but you won't be able to log, view or export until you subscribe.")), _h("div", {
    style: {
      flex: 1
    }
  }), _h(Btn, {
    full: true,
    onClick: onSubscribe,
    style: {
      marginTop: 16
    }
  }, "Keep going \xB7 ", price), _h("div", {
    className: "press",
    onClick: onSeePlans,
    style: {
      marginTop: 10,
      textAlign: "center",
      fontSize: 12,
      fontWeight: 800,
      color: C.muted
    }
  }, "See all plans"));
}
function LockedScreen({
  history,
  lockedSince = "2 August",
  onClaim,
  onSeePlans,
  onExport,
  onLogout,
  goBack
}) {
  const sessions = (history || []).length;
  const streak = calcStreak(history);
  return _h("div", {
    className: "slide",
    style: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      padding: "0 22px 28px",
      background: "radial-gradient(90% 40% at 50% 0%,#2A2012 0%,#0C0906 58%)"
    }
  }, _h("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "18px 0 0"
    }
  }, _h("div", {
    className: "press",
    onClick: goBack,
    style: {
      color: C.muted,
      fontSize: 22,
      fontWeight: 800
    }
  }, "\u2039"), _h("span", {
    style: {
      color: C.faint,
      fontSize: 12,
      letterSpacing: 2
    }
  }, "\u2022\u2022\u2022")), _h("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "22px 0"
    }
  }, _h("div", {
    className: "sora",
    style: {
      fontSize: 30,
      fontWeight: 800,
      color: C.text,
      lineHeight: 1.15
    }
  }, "We kept your", _h("br", null), "spot warm"), _h("div", {
    style: {
      marginTop: 10,
      fontSize: 13.5,
      fontWeight: 600,
      lineHeight: 1.6,
      color: C.muted
    }
  }, "All ", sessions, " sessions", streak > 0 ? ", your " + streak + "-day streak" : "", " and every PR are still there \u2014 the app just needs a plan to open."), _h("div", {
    style: {
      marginTop: 20,
      borderRadius: 22,
      padding: 20,
      background: "linear-gradient(150deg,#F8C95E,#F2B33D 55%,#E6822A)",
      boxShadow: "0 16px 34px rgba(230,130,40,0.28)",
      textAlign: "center"
    }
  }, _h("div", {
    style: {
      fontSize: 9.5,
      fontWeight: 800,
      letterSpacing: 1.5,
      color: "rgba(26,18,8,0.6)"
    }
  }, "COME-BACK OFFER \xB7 7 DAYS ONLY"), _h("div", {
    style: {
      marginTop: 9,
      display: "flex",
      alignItems: "baseline",
      justifyContent: "center",
      gap: 9
    }
  }, _h("span", {
    className: "sora",
    style: {
      fontSize: 36,
      fontWeight: 800,
      letterSpacing: -1.5,
      color: "#1A1208"
    }
  }, "\u20AC12.99"), _h("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: "rgba(26,18,8,0.5)",
      textDecoration: "line-through"
    }
  }, "\u20AC19.99")), _h("div", {
    style: {
      marginTop: 4,
      fontSize: 11.5,
      fontWeight: 800,
      color: "rgba(26,18,8,0.7)"
    }
  }, "first year \xB7 \u20AC1.08 a month")), _h("div", {
    style: {
      marginTop: 11,
      textAlign: "center",
      fontSize: 10.5,
      fontWeight: 700,
      color: C.muted
    }
  }, "Renews at the standard \u20AC19.99/yr afterwards")), _h(Btn, {
    full: true,
    onClick: onClaim
  }, "Claim and unlock"), _h("div", {
    style: {
      marginTop: 10,
      display: "flex",
      gap: 9
    }
  }, _h("div", {
    className: "press",
    onClick: onSeePlans,
    style: {
      flex: 1,
      textAlign: "center",
      padding: "12px 0",
      borderRadius: 14,
      background: "rgba(255,255,255,0.06)",
      color: C.text,
      fontSize: 12.5,
      fontWeight: 800
    }
  }, "See all plans"), _h("div", {
    className: "press",
    onClick: onExport,
    style: {
      flex: 1,
      textAlign: "center",
      padding: "12px 0",
      borderRadius: 14,
      background: "rgba(255,255,255,0.06)",
      color: C.text,
      fontSize: 12.5,
      fontWeight: 800
    }
  }, "Export data")), _h("div", {
    className: "press",
    onClick: onLogout,
    style: {
      marginTop: 12,
      textAlign: "center",
      fontSize: 11.5,
      fontWeight: 800,
      color: C.faint
    }
  }, "Log out"));
}
function Admin({
  users,
  collections,
  history,
  weights,
  messages,
  go,
  goBack,
  onDeleteUser,
  onDeleteCollection,
  onRenameCollection,
  onDeleteWorkout,
  onRenameWorkout,
  onDeleteHistoryEntry,
  onDeleteAllHistory,
  onDeleteWeightEntry,
  onDeleteAllWeights,
  onDeleteMessage,
  onDeleteAllMessages,
  onResetAll
}) {
  const [tab, setTab] = useState("users");
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetTyped, setResetTyped] = useState("");
  const [editingName, setEditingName] = useState(null);
  const tabs = [{
    id: "users",
    label: "👤 Users"
  }, {
    id: "programs",
    label: "📋 Programs"
  }, {
    id: "history",
    label: "🏋️ History"
  }, {
    id: "weights",
    label: "⚖️ Weights"
  }, {
    id: "messages",
    label: "✉️ Messages"
  }, {
    id: "preview",
    label: "🔍 Preview"
  }, {
    id: "danger",
    label: "⚠️ Reset"
  }];
  const saveEdit = () => {
    if (!editingName || !editingName.value.trim()) return;
    if (editingName.type === "collection") onRenameCollection(editingName.id, editingName.value.trim());
    if (editingName.type === "workout") onRenameWorkout(editingName.collId, editingName.id, editingName.value.trim());
    setEditingName(null);
  };
  return _h("div", {
    style: {
      minHeight: "100vh",
      paddingBottom: 40
    },
    className: "slide"
  }, _h("div", {
    style: {
      background: "#16120D",
      padding: "32px 18px 20px"
    }
  }, _h("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, _h("div", null, _h("div", {
    style: {
      fontSize: 22,
      fontWeight: 900,
      color: "white"
    }
  }, "\u2699\uFE0F Admin"), _h("div", {
    style: {
      fontSize: 12,
      color: "rgba(255,255,255,0.5)",
      marginTop: 2,
      fontWeight: 600
    }
  }, "Manage everything")), _h("div", {
    className: "press",
    onClick: goBack,
    style: {
      background: "rgba(255,255,255,0.1)",
      color: "white",
      borderRadius: 12,
      padding: "8px 16px",
      fontSize: 13,
      fontWeight: 700
    }
  }, "\u2190 Back")), _h("div", {
    style: {
      display: "flex",
      gap: 6,
      marginTop: 18,
      overflowX: "auto",
      paddingBottom: 2
    }
  }, tabs.map(t => _h("div", {
    key: t.id,
    className: "press",
    onClick: () => setTab(t.id),
    style: {
      flexShrink: 0,
      padding: "7px 14px",
      borderRadius: 20,
      fontSize: 12,
      fontWeight: 800,
      background: tab === t.id ? "var(--ac)" : "rgba(255,255,255,0.1)",
      color: tab === t.id ? "white" : "rgba(255,255,255,0.6)"
    }
  }, t.label)))), tab === "users" && _h("div", {
    style: {
      padding: "16px 0"
    }
  }, users.map(u => _h("div", {
    key: u.id,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 18px",
      borderBottom: "1px solid rgba(255,255,255,0.05)"
    }
  }, _h("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 12,
      background: u.color + "22",
      color: u.color,
      border: "2px solid " + u.color + "44",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 14,
      fontWeight: 800,
      flexShrink: 0
    }
  }, u.av), _h("div", {
    style: {
      flex: 1
    }
  }, _h("div", {
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: C.text
    }
  }, u.name), _h("div", {
    style: {
      fontSize: 11,
      color: C.muted
    }
  }, u.pin ? "PIN protected" : "Open", " \xB7 ", (history[u.id] || []).length, " sessions \xB7 ", (weights[u.id] || []).length, " weight entries")), _h("div", {
    className: "press",
    onClick: () => onDeleteUser(u.id),
    style: {
      color: C.danger,
      fontSize: 12,
      fontWeight: 700,
      background: "rgba(255,107,107,0.08)",
      borderRadius: 8,
      padding: "6px 12px",
      border: "1px solid rgba(255,107,107,0.2)"
    }
  }, "Delete")))), tab === "programs" && _h("div", {
    style: {
      padding: "16px 0"
    }
  }, collections.map(c => _h("div", {
    key: c.id,
    style: {
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      paddingBottom: 12,
      marginBottom: 4
    }
  }, _h("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 18px"
    }
  }, _h("div", {
    style: {
      fontSize: 22
    }
  }, c.emoji), _h("div", {
    style: {
      flex: 1
    }
  }, editingName?.id === c.id && editingName?.type === "collection" ? _h("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, _h("input", {
    autoFocus: true,
    value: editingName.value,
    onChange: e => setEditingName(p => ({
      ...p,
      value: e.target.value
    })),
    onKeyDown: e => {
      if (e.key === "Enter") saveEdit();
      if (e.key === "Escape") setEditingName(null);
    },
    style: {
      flex: 1,
      padding: "6px 10px",
      borderRadius: 8,
      border: "1.5px solid " + C.accent,
      fontSize: 14,
      fontWeight: 700,
      color: C.text,
      outline: "none",
      fontFamily: "'Manrope',sans-serif"
    }
  }), _h("div", {
    className: "press",
    onClick: saveEdit,
    style: {
      color: C.accentDark,
      fontWeight: 800,
      fontSize: 13,
      padding: "6px 10px"
    }
  }, "\u2713")) : _h("div", {
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: C.text
    }
  }, c.name), _h("div", {
    style: {
      fontSize: 11,
      color: C.muted
    }
  }, c.workouts.length, " workouts \xB7 ", c.pub ? "Public" : "Private", " \xB7 by ", users.find(u => u.id === c.owner)?.name || c.owner)), _h("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, _h("div", {
    className: "press",
    onClick: () => setEditingName({
      id: c.id,
      type: "collection",
      value: c.name
    }),
    style: {
      color: C.accentDark,
      fontSize: 12,
      fontWeight: 700,
      background: C.accentBg,
      borderRadius: 8,
      padding: "6px 10px"
    }
  }, "\u270F\uFE0F"), _h("div", {
    className: "press",
    onClick: () => onDeleteCollection(c.id),
    style: {
      color: C.danger,
      fontSize: 12,
      fontWeight: 700,
      background: "rgba(255,107,107,0.08)",
      borderRadius: 8,
      padding: "6px 10px"
    }
  }, "\uD83D\uDDD1\uFE0F"))), c.workouts.map(w => _h("div", {
    key: w.id,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "6px 18px 6px 48px"
    }
  }, _h("div", {
    style: {
      fontSize: 16
    }
  }, w.emoji), _h("div", {
    style: {
      flex: 1
    }
  }, editingName?.id === w.id && editingName?.type === "workout" ? _h("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, _h("input", {
    autoFocus: true,
    value: editingName.value,
    onChange: e => setEditingName(p => ({
      ...p,
      value: e.target.value
    })),
    onKeyDown: e => {
      if (e.key === "Enter") saveEdit();
      if (e.key === "Escape") setEditingName(null);
    },
    style: {
      flex: 1,
      padding: "5px 10px",
      borderRadius: 8,
      border: "1.5px solid " + C.accent,
      fontSize: 13,
      fontWeight: 700,
      color: C.text,
      outline: "none",
      fontFamily: "'Manrope',sans-serif"
    }
  }), _h("div", {
    className: "press",
    onClick: saveEdit,
    style: {
      color: C.accentDark,
      fontWeight: 800,
      fontSize: 13,
      padding: "5px 8px"
    }
  }, "\u2713")) : _h("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: C.mid
    }
  }, w.name), _h("div", {
    style: {
      fontSize: 11,
      color: C.muted
    }
  }, (w.entries || []).reduce((a, e) => a + (e.type === "ss" ? e.exercises.length : 1), 0), " exercises")), _h("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, _h("div", {
    className: "press",
    onClick: () => setEditingName({
      id: w.id,
      type: "workout",
      collId: c.id,
      value: w.name
    }),
    style: {
      color: C.accentDark,
      fontSize: 11,
      fontWeight: 700,
      background: C.accentBg,
      borderRadius: 8,
      padding: "5px 9px"
    }
  }, "\u270F\uFE0F"), _h("div", {
    className: "press",
    onClick: () => onDeleteWorkout(c.id, w.id),
    style: {
      color: C.danger,
      fontSize: 11,
      fontWeight: 700,
      background: "rgba(255,107,107,0.08)",
      borderRadius: 8,
      padding: "5px 9px"
    }
  }, "\uD83D\uDDD1\uFE0F")))))), collections.length === 0 && _h("div", {
    style: {
      textAlign: "center",
      padding: "40px",
      color: C.muted,
      fontSize: 14
    }
  }, "No programs")), tab === "history" && _h("div", {
    style: {
      padding: "16px 0"
    }
  }, users.map(u => {
    const uHistory = history[u.id] || [];
    if (uHistory.length === 0) return null;
    return _h("div", {
      key: u.id
    }, _h("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 18px",
        background: "rgba(255,255,255,0.03)"
      }
    }, _h("div", {
      style: {
        fontSize: 12,
        fontWeight: 800,
        color: C.text,
        letterSpacing: 0.5
      }
    }, u.name, " \u2014 ", uHistory.length, " sessions"), _h("div", {
      className: "press",
      onClick: () => onDeleteAllHistory(u.id),
      style: {
        color: C.danger,
        fontSize: 11,
        fontWeight: 700,
        background: "rgba(255,107,107,0.08)",
        borderRadius: 8,
        padding: "5px 10px"
      }
    }, "Delete all")), uHistory.map(h => _h("div", {
      key: h.id,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 18px",
        borderBottom: "1px solid rgba(255,255,255,0.04)"
      }
    }, _h("div", {
      style: {
        flex: 1
      }
    }, _h("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: C.text
      }
    }, h.workoutName), _h("div", {
      style: {
        fontSize: 11,
        color: C.muted
      }
    }, h.date, " \xB7 ", h.dur, " min \xB7 ", (h.vol || 0).toLocaleString(), " kg")), _h("div", {
      className: "press",
      onClick: () => onDeleteHistoryEntry(u.id, h.id),
      style: {
        color: C.danger,
        fontSize: 11,
        fontWeight: 700,
        background: "rgba(255,107,107,0.08)",
        borderRadius: 8,
        padding: "5px 10px"
      }
    }, "\uD83D\uDDD1\uFE0F"))));
  })), tab === "weights" && _h("div", {
    style: {
      padding: "16px 0"
    }
  }, users.map(u => {
    const uWeights = weights[u.id] || [];
    if (uWeights.length === 0) return null;
    return _h("div", {
      key: u.id
    }, _h("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 18px",
        background: "rgba(255,255,255,0.03)"
      }
    }, _h("div", {
      style: {
        fontSize: 12,
        fontWeight: 800,
        color: C.text
      }
    }, u.name, " \u2014 ", uWeights.length, " entries"), _h("div", {
      className: "press",
      onClick: () => onDeleteAllWeights(u.id),
      style: {
        color: C.danger,
        fontSize: 11,
        fontWeight: 700,
        background: "rgba(255,107,107,0.08)",
        borderRadius: 8,
        padding: "5px 10px"
      }
    }, "Delete all")), [...uWeights].reverse().map((w, i) => _h("div", {
      key: i,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 18px",
        borderBottom: "1px solid rgba(255,255,255,0.04)"
      }
    }, _h("div", {
      style: {
        flex: 1
      }
    }, _h("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: C.text
      }
    }, w.date), _h("div", {
      style: {
        fontSize: 14,
        fontWeight: 900,
        color: C.accent
      }
    }, w.w, " kg")), _h("div", {
      className: "press",
      onClick: () => onDeleteWeightEntry(u.id, uWeights.length - 1 - i),
      style: {
        color: C.danger,
        fontSize: 11,
        fontWeight: 700,
        background: "rgba(255,107,107,0.08)",
        borderRadius: 8,
        padding: "5px 10px"
      }
    }, "\uD83D\uDDD1\uFE0F"))));
  })), tab === "messages" && _h("div", {
    style: {
      padding: "16px 0"
    }
  }, _h("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      padding: "0 18px 12px"
    }
  }, _h("div", {
    className: "press",
    onClick: onDeleteAllMessages,
    style: {
      color: C.danger,
      fontSize: 12,
      fontWeight: 700,
      background: "rgba(255,107,107,0.08)",
      borderRadius: 8,
      padding: "7px 14px"
    }
  }, "Delete all messages")), messages.map(m => {
    const sender = users.find(u => u.id === m.from);
    const receiver = users.find(u => u.id === m.to);
    return _h("div", {
      key: m.id,
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        padding: "12px 18px",
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }
    }, _h("div", {
      style: {
        flex: 1
      }
    }, _h("div", {
      style: {
        fontSize: 13,
        fontWeight: 800,
        color: C.text
      }
    }, m.subject), _h("div", {
      style: {
        fontSize: 11,
        color: C.muted,
        marginTop: 2
      }
    }, "From: ", sender?.name || m.from, " \u2192 To: ", receiver?.name || m.to, " \xB7 ", m.read ? "read" : "unread"), _h("div", {
      style: {
        fontSize: 12,
        color: C.mid,
        marginTop: 4,
        lineHeight: 1.5
      }
    }, m.body)), _h("div", {
      className: "press",
      onClick: () => onDeleteMessage(m.id),
      style: {
        color: C.danger,
        fontSize: 11,
        fontWeight: 700,
        background: "rgba(255,107,107,0.08)",
        borderRadius: 8,
        padding: "5px 10px",
        flexShrink: 0
      }
    }, "\uD83D\uDDD1\uFE0F"));
  }), messages.length === 0 && _h("div", {
    style: {
      textAlign: "center",
      padding: "40px",
      color: C.muted,
      fontSize: 14
    }
  }, "No messages")), tab === "preview" && _h("div", {
    style: {
      padding: "16px 18px"
    }
  }, _h("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      fontWeight: 600,
      lineHeight: 1.6,
      marginBottom: 14
    }
  }, "Trial/paywall isn't wired up yet - these two use your real logged-in stats so you can review the chosen designs (T13b, T14d) before the real auth+billing build."), [{
    id: "previewTrialEnding",
    label: "Trial ending",
    sub: "T13b · Your month in numbers"
  }, {
    id: "previewLocked",
    label: "Locked",
    sub: "T14d · Win-back offer"
  }].map(it => _h("div", {
    key: it.id,
    className: "press",
    onClick: () => go(it.id),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "14px 16px",
      borderRadius: 16,
      background: C.surface,
      border: "1px solid " + C.border,
      marginBottom: 10
    }
  }, _h("div", {
    style: {
      flex: 1
    }
  }, _h("div", {
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: C.text
    }
  }, it.label), _h("div", {
    style: {
      fontSize: 11.5,
      color: C.muted,
      marginTop: 2
    }
  }, it.sub)), _h("div", {
    style: {
      color: C.muted,
      fontSize: 16
    }
  }, "\u203A")))), tab === "danger" && _h("div", {
    style: {
      padding: "24px 18px"
    }
  }, _h("div", {
    style: {
      background: "rgba(255,107,107,0.06)",
      border: "1.5px solid rgba(255,107,107,0.2)",
      borderRadius: 18,
      padding: 20
    }
  }, _h("div", {
    style: {
      fontSize: 16,
      fontWeight: 900,
      color: C.danger,
      marginBottom: 8
    }
  }, "\u26A0\uFE0F Reset Everything"), _h("div", {
    style: {
      fontSize: 13,
      color: C.mid,
      fontWeight: 600,
      lineHeight: 1.6,
      marginBottom: 20
    }
  }, "This will permanently delete ALL workout history, ALL body weight data, ALL messages, and ALL programs for ALL users. Users will remain. This cannot be undone."), !confirmReset ? _h("div", {
    className: "press",
    onClick: () => setConfirmReset(true),
    style: {
      background: C.danger,
      color: "white",
      borderRadius: 12,
      padding: "13px",
      textAlign: "center",
      fontSize: 14,
      fontWeight: 800
    }
  }, "Reset all data") : _h("div", null, _h("div", {
    style: {
      fontSize: 13,
      color: C.danger,
      fontWeight: 700,
      marginBottom: 10
    }
  }, "Type ", _h("strong", null, "RESET"), " to confirm:"), _h("input", {
    autoFocus: true,
    value: resetTyped,
    onChange: e => setResetTyped(e.target.value),
    placeholder: "Type RESET",
    style: {
      width: "100%",
      padding: "11px 14px",
      background: "rgba(255,255,255,0.05)",
      border: "1.5px solid rgba(255,107,107,0.3)",
      borderRadius: 12,
      fontSize: 14,
      color: C.text,
      outline: "none",
      fontFamily: "'Manrope',sans-serif",
      marginBottom: 12
    }
  }), _h("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, _h("button", {
    disabled: resetTyped !== "RESET",
    onClick: () => {
      onResetAll();
      setConfirmReset(false);
      setResetTyped("");
    },
    style: {
      flex: 1,
      padding: "12px",
      borderRadius: 12,
      border: "none",
      fontFamily: "'Manrope',sans-serif",
      fontSize: 14,
      fontWeight: 800,
      cursor: resetTyped === "RESET" ? "pointer" : "not-allowed",
      background: resetTyped === "RESET" ? C.danger : "rgba(255,255,255,0.1)",
      color: resetTyped === "RESET" ? "white" : C.muted,
      transition: "all 0.2s"
    }
  }, "Confirm Reset"), _h("div", {
    className: "press",
    onClick: () => {
      setConfirmReset(false);
      setResetTyped("");
    },
    style: {
      flex: 1,
      padding: "12px",
      borderRadius: 12,
      border: "1.5px solid " + C.accent,
      color: C.accent,
      fontSize: 14,
      fontWeight: 800,
      textAlign: "center"
    }
  }, "Cancel"))))));
}
function exercisesForMuscle(key) {
  const out = [];
  for (const list of Object.values(EXERCISE_DB)) {
    for (const e of list) {
      const ms = musclesFor(e.name);
      if (ms[0] === key) out.unshift(e.name);else if (ms.includes(key)) out.push(e.name);
    }
  }
  return [...new Set(out)].slice(0, 16);
}
function RecoveryBar({
  pct
}) {
  return _h("div", {
    style: {
      height: 9,
      borderRadius: 5,
      background: "linear-gradient(90deg,hsl(0,72%,45%),hsl(35,80%,50%),hsl(60,75%,50%),hsl(120,60%,45%))",
      position: "relative",
      overflow: "hidden"
    }
  }, _h("div", {
    style: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: pct * 100 + "%",
      right: 0,
      background: "rgba(10,8,6,0.82)"
    }
  }), _h("div", {
    style: {
      position: "absolute",
      top: -2,
      bottom: -2,
      left: "calc(" + pct * 100 + "% - 2px)",
      width: 4,
      borderRadius: 2,
      background: "#F4ECDD",
      boxShadow: "0 0 6px rgba(0,0,0,0.6)"
    }
  }));
}
function MuscleLab({
  history,
  go,
  goBack,
  onHowTo,
  bodyKg = 0,
  myCheckins = []
}) {
  const [mode, setMode] = useState("recovery");
  const [sel, setSel] = useState(null);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setTick(t => t + 1), 60000);
    return () => clearInterval(iv);
  }, []);
  const rec = useMemo(() => computeRecovery(history, null, {
    bw: bodyKg,
    checkins: myCheckins
  }), [history, tick, bodyKg, myCheckins]);
  const hits14 = useMemo(() => {
    const now = Date.now(),
      win = 14 * 24 * 3600e3,
      out = {};
    (history || []).forEach(h => {
      const ts = h.ts || Date.parse((h.date || "") + "T18:00:00") || 0;
      if (!ts || now - ts > win) return;
      const ks = new Set();
      (h.sets || []).forEach(x => {
        const p = musclesFor(x.ex)[0];
        if (p) ks.add(p);
      });
      ks.forEach(k => {
        const o = out[k] || (out[k] = {
          n: 0,
          first: ts
        });
        o.n++;
        if (ts < o.first) o.first = ts;
      });
    });
    return out;
  }, [history, tick]);
  const trained = MUSCLES.filter(m => rec[m.key]).sort((a, b) => rec[b.key].remainH - rec[a.key].remainH);
  const colorFor = key => {
    if (mode === "recovery") {
      const r = rec[key];
      return r ? recColor(r.pct) : null;
    }
    return sel === key ? "rgba(var(--acr),0.55)" : null;
  };
  return _h("div", {
    style: {
      minHeight: "100vh",
      paddingBottom: 110
    },
    className: "slide"
  }, _h(PageHeader, {
    goBack: goBack,
    title: "Body Lab \uD83E\uDDCD",
    subtitle: "Explore muscles \xB7 recovery status"
  }), _h("div", {
    style: {
      display: "flex",
      background: "rgba(255,255,255,0.05)",
      borderRadius: 14,
      padding: 4,
      margin: "0 18px 14px",
      gap: 4
    }
  }, [["recovery", "🔋 Recovery"], ["explore", "🔍 Explore"]].map(([id, label]) => _h("div", {
    key: id,
    className: "press",
    onClick: () => setMode(id),
    style: {
      flex: 1,
      textAlign: "center",
      padding: "9px 0",
      borderRadius: 11,
      background: mode === id ? C.glassHard : "transparent",
      color: mode === id ? C.accent : C.muted,
      fontSize: 13,
      fontWeight: 800,
      transition: "all 0.2s"
    }
  }, label))), _h("div", {
    style: {
      margin: "0 18px 14px"
    }
  }, _h(Body3D, {
    mode: mode === "recovery" ? "recovery" : "explore",
    heat: mode === "recovery" ? Object.fromEntries(Object.entries(rec).map(([k, r]) => [k, r.pct])) : null,
    selected: sel,
    onPick: k => setSel(s => s === k ? null : k),
    height: 370
  })), mode === "recovery" && _h("div", {
    style: {
      padding: "0 18px"
    }
  }, trained.length === 0 && _h(Card, {
    style: {
      margin: 0,
      textAlign: "center"
    }
  }, _h("div", {
    style: {
      fontSize: 30,
      marginBottom: 8
    }
  }, "\uD83D\uDCA4"), _h("div", {
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: C.text
    }
  }, "No recent training data"), _h("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      fontWeight: 600,
      marginTop: 4
    }
  }, "Finish a workout and recovery shows up here.")), trained.map(m => {
    const r = rec[m.key];
    const ready = r.pct >= 1;
    return _h("div", {
      key: m.key,
      className: "press",
      onClick: () => setSel(s => s === m.key ? null : m.key),
      style: {
        padding: "13px 15px",
        borderRadius: 16,
        background: sel === m.key ? "rgba(var(--acr),0.08)" : C.surface,
        border: "1px solid " + (sel === m.key ? "rgba(var(--acr),0.35)" : C.border),
        marginBottom: 9
      }
    }, _h("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8
      }
    }, _h("div", {
      style: {
        fontSize: 14,
        fontWeight: 800,
        color: C.text
      }
    }, m.name), _h("div", {
      className: "sora",
      style: {
        fontSize: 13,
        fontWeight: 800,
        color: ready ? C.good : recColor(r.pct)
      }
    }, ready ? "Ready ✓" : r.overall + "% · ~" + r.remainH + "h left")), _h(RecoveryBar, {
      pct: r.pct
    }), _h("div", {
      style: {
        fontSize: 11,
        color: C.muted,
        fontWeight: 600,
        marginTop: 7
      }
    }, r.workout, " \xB7 ", r.sets, " effective set", r.sets === 1 ? "" : "s", " \xB7 needs ~", r.hours, "h", r.factors?.conf === "learning" && _h("span", null, " \xB7 learning your recovery"), r.factors?.conf === "calibrating" && _h("span", {
      style: {
        color: "var(--acd)"
      }
    }, " \xB7 calibrating to you (", r.factors.nObs, " checks)"), r.factors?.conf === "calibrated" && _h("span", {
      style: {
        color: C.good
      }
    }, " \xB7 calibrated to you", r.factors.rho < 0.95 ? " — recovers faster than average" : r.factors.rho > 1.05 ? " — needs more rest than average" : ""), r.factors?.adapt <= 0.9 && _h("span", {
      style: {
        color: C.good
      }
    }, " \xB7 trains often \u2192 recovers faster"), r.factors?.adapt >= 1.1 && _h("span", {
      style: {
        color: "var(--acd)"
      }
    }, " \xB7 rarely trained \u2192 extra rest"), r.factors?.sys < 85 && _h("span", {
      style: {
        color: C.danger
      }
    }, " \xB7 whole-body fatigue slowing it down")), (() => {
      const f = hits14[m.key];
      return f && f.n >= 3 && r.pct < 0.6 ? _h("div", {
        style: {
          fontSize: 11,
          fontWeight: 800,
          color: C.danger,
          marginTop: 6
        }
      }, "\u26A0 Chronically under-recovered - trained ", f.n, "x in ", Math.max(1, Math.round((Date.now() - f.first) / 86400000)), " days, only ", Math.round(r.pct * 100), "% recovered. Consider a lighter week.") : null;
    })());
  })), mode === "explore" && _h("div", {
    style: {
      padding: "0 18px"
    }
  }, !sel && _h("div", {
    style: {
      textAlign: "center",
      fontSize: 13,
      color: C.muted,
      fontWeight: 600,
      padding: "14px 0"
    }
  }, "Tap a muscle on the body to see exercises for it."), sel && (() => {
    const m = MUSCLE_BY_KEY[sel];
    const exs = exercisesForMuscle(sel);
    const r = rec[sel];
    return _h("div", null, _h("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10
      }
    }, _h("div", {
      className: "sora",
      style: {
        fontSize: 20,
        fontWeight: 800,
        color: C.text
      }
    }, m.name), _h(Chip, null, r ? r.pct >= 1 ? "Recovered" : "~" + r.remainH + "h to recover" : "up to " + m.base + "h after an all-out session")), exs.map(name => _h("div", {
      key: name,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "11px 14px",
        background: C.surface,
        border: "1px solid " + C.border,
        borderRadius: 14,
        marginBottom: 8
      }
    }, _h("div", {
      style: {
        flex: 1,
        fontSize: 13,
        fontWeight: 700,
        color: C.text
      }
    }, name), _h("div", {
      className: "press",
      onClick: () => onHowTo(name),
      style: {
        padding: "6px 12px",
        borderRadius: 9,
        background: "rgba(var(--acr),0.12)",
        color: C.accent,
        fontSize: 11,
        fontWeight: 800
      }
    }, "\uD83D\uDCCB How to"))));
  })()));
}
const GUIDE_EQUIP = ["All", "Barbell", "Dumbbell", "Machine", "Cable", "Bodyweight", "Bar"];
const GUIDE_PAL_FALLBACK = ["#D64533", "#3D9C56", "#3E64D6", "#E08A2E", "#8C4FD6", "#2FA8A0"];
function guideEquipFor(name, cali) {
  const n = (name || "").toLowerCase();
  if (/pull.?up|chin.?up|dip$|muscle.?up|lever|l.?sit|toes to bar|human flag|dead hang|ring row|archer|commando/.test(n)) return "Bar";
  if (cali) return "Bodyweight";
  if (/nordic/.test(n)) return "Bodyweight";
  if (/dumbbell|incline db|\bdb\b/.test(n)) return "Dumbbell";
  if (/barbell/.test(n)) return "Barbell";
  if (/cable|pushdown|pallof|face pull|seated row/.test(n)) return "Cable";
  if (/machine|smith|pec deck|hammer strength|leg press|lat pulldown|leg extension|leg curl|hack|calf raise|tib raise/.test(n)) return "Machine";
  if (/push.?up|plank|crunch|sit.?up|leg raise|hanging|burpee|mountain climber|superman|bird dog|bridge|stretch|pose|hold/.test(n)) return "Bodyweight";
  if (/curl|raise|fly|flye|shrug|extension/.test(n)) return "Dumbbell";
  if (/squat|deadlift|press|row|thrust|good morning|clean|snatch|jerk/.test(n)) return "Barbell";
  return "Bodyweight";
}
function Exercises({
  goBack,
  onHowTo
}) {
  const [view, setView] = useState("body");
  const [q, setQ] = useState("");
  const [type, setType] = useState("all");
  const [group, setGroup] = useState("all");
  const [equip, setEquip] = useState("all");
  const all = useMemo(() => {
    const out = [];
    for (const [cat, list] of Object.entries(EXERCISE_DB)) {
      for (const ex of list) {
        const cali = cat === "Calisthenics";
        out.push({
          name: ex.name,
          slug: ex.slug,
          cat,
          cali,
          mk: musclesFor(ex.name)[0] || "chest",
          eq: guideEquipFor(ex.name, cali)
        });
      }
    }
    return out;
  }, []);
  const idxByKey = useMemo(() => {
    const o = {};
    MUSCLES.forEach((m, i) => o[m.key] = i);
    return o;
  }, []);
  const PAL = typeof window !== "undefined" && window.BODY3D_PALETTE || GUIDE_PAL_FALLBACK;
  const ql = q.toLowerCase().trim();
  const results = all.filter(e => (type === "all" || (type === "cali" ? e.cali : !e.cali)) && (group === "all" || e.mk === group) && (equip === "all" || e.eq === equip) && (!ql || e.name.toLowerCase().includes(ql))).sort((a, b) => a.name.localeCompare(b.name));
  const seg = on => ({
    padding: "8px 14px",
    borderRadius: 10,
    fontSize: 11.5,
    fontWeight: 800,
    whiteSpace: "nowrap",
    ...(on ? {
      background: C.btnGrad,
      color: C.ink
    } : {
      color: C.muted
    })
  });
  return _h("div", {
    style: {
      minHeight: "100vh",
      padding: "20px 22px 132px"
    },
    className: "slide"
  }, _h(BackBtn, {
    goBack: goBack
  }), _h("div", {
    style: {
      marginTop: 22,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: 12,
      flexWrap: "wrap"
    }
  }, _h("div", null, _h("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: 2.5,
      color: C.muted
    }
  }, "EXERCISE LIBRARY"), _h("div", {
    className: "sora",
    style: {
      marginTop: 7,
      fontWeight: 800,
      fontSize: 40,
      lineHeight: 1,
      letterSpacing: -1.2,
      color: C.text
    }
  }, "Exercises ", _h("span", {
    style: {
      background: C.btnGrad,
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent"
    }
  }, "guide"))), _h("div", {
    style: {
      display: "flex",
      gap: 3,
      padding: 3,
      borderRadius: 12,
      background: "rgba(255,255,255,0.05)",
      flexShrink: 0
    }
  }, _h("div", {
    className: "press",
    onClick: () => setView("body"),
    style: seg(view === "body")
  }, "\uD83E\uDDCD Body"), _h("div", {
    className: "press",
    onClick: () => setView("list"),
    style: seg(view === "list")
  }, "\u2630 List"))), view === "body" && _h(_F, null, _h("div", {
    style: {
      marginTop: 16,
      borderRadius: 24,
      overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.07)",
      boxShadow: "0 18px 44px rgba(0,0,0,0.32)"
    }
  }, _h(Body3D, {
    mode: "explore",
    selected: group === "all" ? null : group,
    onPick: k => setGroup(k || "all"),
    height: 320,
    autoRotate: true
  })), _h("div", {
    style: {
      marginTop: 10,
      textAlign: "center",
      fontSize: 12,
      color: C.muted,
      fontWeight: 600
    }
  }, "Rotate 360\xB0 \xB7 tap any muscle to filter the list below"), group !== "all" && _h("div", {
    style: {
      marginTop: 8,
      display: "flex",
      justifyContent: "center"
    }
  }, _h("span", {
    style: {
      padding: "6px 12px",
      borderRadius: 9,
      background: C.accentBg,
      color: C.accent,
      fontSize: 11.5,
      fontWeight: 800
    }
  }, "\uD83C\uDFAF Filtered to ", MUSCLE_BY_KEY[group]?.name || group))), _h("input", {
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Search exercises\u2026",
    style: {
      marginTop: 16,
      width: "100%",
      padding: "13px 16px",
      background: "rgba(255,255,255,0.05)",
      border: "1.5px solid rgba(255,255,255,0.08)",
      borderRadius: 14,
      color: C.text,
      fontSize: 13.5,
      fontWeight: 600,
      outline: "none",
      display: "block"
    }
  }), _h("div", {
    style: {
      marginTop: 14,
      display: "flex",
      flexWrap: "wrap",
      gap: 7
    }
  }, [["all", "All"], ["gym", "🏋️ Gym"], ["cali", "🤸 Calisthenics"]].map(([id, label]) => _h("div", {
    key: id,
    className: "press",
    onClick: () => setType(id),
    style: {
      flexShrink: 0,
      whiteSpace: "nowrap",
      padding: "8px 14px",
      borderRadius: 11,
      fontSize: 12,
      fontWeight: 800,
      ...(type === id ? {
        background: C.btnGrad,
        color: C.ink
      } : {
        background: "rgba(255,255,255,0.05)",
        color: C.muted
      })
    }
  }, label))), _h("div", {
    style: {
      marginTop: 9,
      display: "flex",
      flexWrap: "wrap",
      gap: 6
    }
  }, [{
    key: "all",
    name: "All muscles"
  }, ...MUSCLES].map(m => _h("div", {
    key: m.key,
    className: "press",
    onClick: () => setGroup(m.key),
    style: {
      flexShrink: 0,
      whiteSpace: "nowrap",
      padding: "7px 13px",
      borderRadius: 10,
      fontSize: 11.5,
      fontWeight: 800,
      ...(group === m.key ? {
        background: "rgba(var(--acr),0.16)",
        border: "1px solid rgba(var(--acr),0.5)",
        color: C.accent
      } : {
        background: "transparent",
        border: "1px solid rgba(255,255,255,0.08)",
        color: C.muted
      })
    }
  }, m.name))), _h("div", {
    style: {
      marginTop: 9,
      display: "flex",
      flexWrap: "wrap",
      gap: 6
    }
  }, GUIDE_EQUIP.map(label => {
    const id = label === "All" ? "all" : label;
    return _h("div", {
      key: id,
      className: "press",
      onClick: () => setEquip(id),
      style: {
        flexShrink: 0,
        whiteSpace: "nowrap",
        padding: "7px 13px",
        borderRadius: 10,
        fontSize: 11.5,
        fontWeight: 800,
        ...(equip === id ? {
          background: "rgba(255,255,255,0.1)",
          color: C.text,
          border: "1px solid transparent"
        } : {
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.06)",
          color: C.faint
        })
      }
    }, label);
  })), _h("div", {
    style: {
      marginTop: 9,
      fontSize: 11,
      fontWeight: 700,
      color: C.faint
    }
  }, results.length, " exercises"), _h("div", {
    style: {
      marginTop: 12,
      display: "flex",
      flexDirection: "column",
      gap: 9
    }
  }, results.map(e => _h("div", {
    key: e.slug,
    className: "press",
    onClick: () => onHowTo(e.name),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "14px 15px",
      borderRadius: 16,
      background: C.glass,
      border: "1px solid " + C.border
    }
  }, _h("div", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 3,
      flexShrink: 0,
      background: PAL[(idxByKey[e.mk] || 0) % PAL.length]
    }
  }), _h("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, _h("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, _h("span", {
    style: {
      fontSize: 13.5,
      fontWeight: 800,
      color: C.text
    }
  }, e.name), e.cali && _h("span", {
    style: {
      fontSize: 13
    }
  }, "\uD83E\uDD38")), _h("div", {
    style: {
      fontSize: 10.5,
      fontWeight: 700,
      color: C.muted,
      marginTop: 2
    }
  }, (MUSCLE_BY_KEY[e.mk]?.name || e.mk) + " · " + e.eq)), _h("div", {
    style: {
      fontSize: 10.5,
      fontWeight: 800,
      color: C.accent,
      flexShrink: 0
    }
  }, "How-to \u25B6"))), results.length === 0 && _h("div", {
    style: {
      textAlign: "center",
      padding: 30,
      color: C.muted,
      fontSize: 12.5,
      fontWeight: 600
    }
  }, "No exercises match those filters.")));
}
function SettingsRow({
  icon,
  label,
  sub,
  onClick,
  danger
}) {
  return _h("div", {
    className: "press",
    onClick: onClick,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 13,
      padding: "14px 16px",
      borderRadius: 16,
      background: C.surface,
      border: "1px solid " + C.border,
      marginBottom: 9
    }
  }, _h("span", {
    style: {
      fontSize: 20
    }
  }, icon), _h("div", {
    style: {
      flex: 1
    }
  }, _h("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 800,
      color: danger ? C.danger : C.text
    }
  }, label), sub && _h("div", {
    style: {
      fontSize: 11.5,
      color: C.muted,
      fontWeight: 600,
      marginTop: 2
    }
  }, sub)), _h("span", {
    style: {
      color: C.faint,
      fontSize: 16
    }
  }, "\u203A"));
}
function SettingsHub({
  user,
  account,
  go,
  goBack
}) {
  const sub = account?.subscription;
  const subLabel = !account ? "Household profile — free" : account.subscriptionActive ? sub?.lifetime ? "Lifetime" : sub?.label || "Active" : account.locked ? "Locked — no active plan" : account.trialDaysLeft + " trial days left";
  return _h("div", {
    style: {
      minHeight: "100vh",
      paddingBottom: 110
    },
    className: "slide"
  }, _h(PageHeader, {
    goBack: goBack,
    title: "Settings \u2699\uFE0F",
    subtitle: account ? account.email : user ? user.name + " · shared-device profile" : ""
  }), _h("div", {
    style: {
      padding: "0 18px"
    }
  }, _h(SettingsRow, {
    icon: "\uD83D\uDC64",
    label: "Account",
    sub: account ? account.verified ? "Verified" : "Email not verified yet" : "Profile, photo & email account",
    onClick: () => go("acct")
  }), _h(SettingsRow, {
    icon: "\uD83D\uDCB3",
    label: "Subscription & billing",
    sub: subLabel,
    onClick: () => go("billing")
  }), _h(SettingsRow, {
    icon: "\uD83D\uDD14",
    label: "Notifications",
    sub: "Rest timer, streaks, friends",
    onClick: () => go("notifprefs")
  }), _h(SettingsRow, {
    icon: "\uD83C\uDF81",
    label: "Invite friends",
    sub: "Give a month, get a month",
    onClick: () => go("referralpage")
  }), _h(SettingsRow, {
    icon: "\uD83D\uDCE4",
    label: "Export my data",
    sub: "JSON or CSV, yours to keep",
    onClick: () => go("exportdata")
  }), _h(SettingsRow, {
    icon: "\uD83D\uDCE5",
    label: "Import workouts",
    sub: "From Hevy, Strong or a backup",
    onClick: () => go("importdata")
  }), _h("div", {
    style: {
      height: 10
    }
  }), _h(SettingsRow, {
    icon: "\uD83D\uDEDF",
    label: "Help & FAQ",
    sub: "Answers to common questions",
    onClick: () => go("help")
  }), _h(SettingsRow, {
    icon: "\uD83D\uDD12",
    label: "Privacy",
    onClick: () => go("privacy")
  }), _h(SettingsRow, {
    icon: "\uD83D\uDCDC",
    label: "Terms",
    onClick: () => go("terms")
  }), _h(SettingsRow, {
    icon: "\u2139\uFE0F",
    label: "About",
    onClick: () => go("about")
  }), account && _h(_F, null, _h("div", {
    style: {
      height: 10
    }
  }), _h(SettingsRow, {
    icon: "\uD83D\uDDD1\uFE0F",
    label: "Delete account",
    sub: account.deleteScheduledAt ? "Scheduled for " + new Date(account.deleteScheduledAt).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short"
    }) : "30-day grace period",
    onClick: () => go("delacct"),
    danger: true
  }))));
}
function AccountPage({
  user,
  account,
  goBack,
  onPhotoFile,
  onSignOutAccount,
  onGoVerify,
  pushToast,
  setAccount
}) {
  const [curPw, setCurPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [pwMsg, setPwMsg] = useState(null);
  const changePw = async () => {
    const d = await api("POST", "/auth/change-password", {
      current: curPw,
      next: newPw
    });
    if (!d || d.error) {
      setPwMsg({
        ok: false,
        text: d?.error || "Server unreachable"
      });
      return;
    }
    setPwMsg({
      ok: true,
      text: "Password changed ✓"
    });
    setCurPw("");
    setNewPw("");
  };
  const resendVerify = async () => {
    const d = await api("POST", "/auth/resend-verify");
    if (d && d.devVerifyCode) onGoVerify(d.devVerifyCode);else if (d && d.account) setAccount(d.account);
  };
  return _h("div", {
    style: {
      minHeight: "100vh",
      paddingBottom: 110
    },
    className: "slide"
  }, _h(PageHeader, {
    goBack: goBack,
    title: "Account \uD83D\uDC64",
    subtitle: "Profile & sign-in"
  }), _h("div", {
    style: {
      padding: "0 18px"
    }
  }, user && _h(Card, {
    style: {
      margin: "0 0 14px"
    }
  }, _h("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, _h("div", {
    className: "press",
    onClick: () => document.getElementById("il-photo-input-acct").click(),
    style: {
      position: "relative"
    }
  }, _h(Ava, {
    user: user,
    size: 56
  }), _h("div", {
    style: {
      position: "absolute",
      bottom: -2,
      right: -2,
      width: 20,
      height: 20,
      borderRadius: 7,
      background: C.accent,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 10,
      border: "2px solid " + C.glassHard
    }
  }, "\uD83D\uDCF7")), _h("input", {
    id: "il-photo-input-acct",
    type: "file",
    accept: "image/*",
    style: {
      display: "none"
    },
    onChange: e => {
      onPhotoFile(e.target.files[0]);
      e.target.value = "";
    }
  }), _h("div", null, _h("div", {
    style: {
      fontSize: 17,
      fontWeight: 900,
      color: C.text
    }
  }, user.name), _h("div", {
    style: {
      fontSize: 11.5,
      color: C.muted,
      fontWeight: 600,
      marginTop: 2
    }
  }, "Tap the photo to change it")))), account ? _h(_F, null, _h(Card, {
    style: {
      margin: "0 0 14px"
    }
  }, _h("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: account.verified ? 0 : 12
    }
  }, _h("div", null, _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      letterSpacing: 0.8,
      color: C.muted,
      textTransform: "uppercase",
      marginBottom: 4
    }
  }, "Email"), _h("div", {
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: C.text
    }
  }, account.email)), _h("span", {
    style: {
      fontSize: 10,
      fontWeight: 800,
      padding: "3px 9px",
      borderRadius: 8,
      background: account.verified ? "rgba(87,192,138,0.14)" : "rgba(242,179,61,0.14)",
      color: account.verified ? C.good : C.accent
    }
  }, account.verified ? "✓ VERIFIED" : "UNVERIFIED")), !account.verified && _h("div", {
    className: "press",
    onClick: resendVerify,
    style: {
      textAlign: "center",
      padding: "10px",
      borderRadius: 12,
      background: C.accentBg,
      fontSize: 12.5,
      fontWeight: 800,
      color: C.accentDark
    }
  }, "Verify email now")), _h(Card, {
    style: {
      margin: "0 0 14px"
    }
  }, _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      letterSpacing: 0.8,
      color: C.muted,
      textTransform: "uppercase",
      marginBottom: 12
    }
  }, "Change password"), _h(FInput, {
    label: "Current password",
    type: "password",
    value: curPw,
    onChange: e => {
      setCurPw(e.target.value);
      setPwMsg(null);
    }
  }), _h(FInput, {
    label: "New password",
    type: "password",
    value: newPw,
    onChange: e => {
      setNewPw(e.target.value);
      setPwMsg(null);
    },
    placeholder: "At least 6 characters"
  }), pwMsg && _h("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 700,
      color: pwMsg.ok ? C.good : C.danger,
      marginBottom: 10
    }
  }, pwMsg.text), _h(Btn, {
    full: true,
    sm: true,
    onClick: changePw
  }, "Update password")), _h("div", {
    className: "press",
    onClick: onSignOutAccount,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      padding: "13px 0",
      borderRadius: 14,
      background: "rgba(255,255,255,0.05)",
      fontSize: 13.5,
      fontWeight: 800,
      color: C.text
    }
  }, "\uD83D\uDEAA Sign out of this account")) : _h(Card, {
    style: {
      margin: 0
    }
  }, _h("div", {
    style: {
      fontSize: 13.5,
      fontWeight: 800,
      color: C.text,
      marginBottom: 6
    }
  }, "No email account linked"), _h("div", {
    style: {
      fontSize: 12.5,
      color: C.muted,
      fontWeight: 600,
      lineHeight: 1.6
    }
  }, "This is a shared-device profile \u2014 it works forever without an account. An email account adds sign-in from other devices, a subscription, and (eventually) sync."))));
}
function BillingPage({
  account,
  goBack,
  go,
  onRestore
}) {
  const sub = account?.subscription;
  return _h("div", {
    style: {
      minHeight: "100vh",
      paddingBottom: 110
    },
    className: "slide"
  }, _h(PageHeader, {
    goBack: goBack,
    title: "Subscription \uD83D\uDCB3",
    subtitle: "Plan & billing"
  }), _h("div", {
    style: {
      padding: "0 18px"
    }
  }, !account && _h(Card, {
    style: {
      margin: 0
    }
  }, _h("div", {
    style: {
      fontSize: 13.5,
      fontWeight: 800,
      color: C.text,
      marginBottom: 6
    }
  }, "Household profile \u2014 free"), _h("div", {
    style: {
      fontSize: 12.5,
      color: C.muted,
      fontWeight: 600,
      lineHeight: 1.6
    }
  }, "Profiles on this shared device are grandfathered in: no trial, no lock, no payment. Email accounts created later get a 30-day trial and then need a plan.")), account && _h(_F, null, _h("div", {
    style: {
      borderRadius: 20,
      padding: 20,
      marginBottom: 14,
      background: account.subscriptionActive ? "linear-gradient(150deg,#F8C95E,#F2B33D 55%,#E6822A)" : C.glass,
      border: account.subscriptionActive ? "none" : "1px solid " + C.border
    }
  }, account.subscriptionActive ? _h(_F, null, _h("div", {
    style: {
      display: "flex",
      justifyContent: "space-between"
    }
  }, _h("div", {
    className: "sora",
    style: {
      fontSize: 16,
      fontWeight: 800,
      color: "#1A1208"
    }
  }, sub.lifetime ? "Lifetime" : sub.label), _h("span", {
    style: {
      fontSize: 9,
      fontWeight: 800,
      letterSpacing: 1,
      color: "rgba(26,18,8,0.55)"
    }
  }, sub.mock ? "DEMO PLAN" : "ACTIVE")), _h("div", {
    style: {
      marginTop: 8,
      fontSize: 12,
      fontWeight: 700,
      color: "rgba(26,18,8,0.65)"
    }
  }, sub.lifetime ? "No renewals, ever." : "Renews " + new Date(sub.until).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }))) : _h(_F, null, _h("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 800,
      color: C.text
    }
  }, account.locked ? "No active plan — app is locked" : "Free month in progress"), _h("div", {
    style: {
      marginTop: 6,
      fontSize: 12.5,
      fontWeight: 600,
      color: C.muted
    }
  }, account.locked ? "Subscribe to unlock everything instantly." : account.trialDaysLeft + " days left, every feature included. Then from €1.67/month."))), _h(Btn, {
    full: true,
    onClick: () => go("paywall"),
    style: {
      marginBottom: 10
    }
  }, account.subscriptionActive ? "Change plan" : "See plans"), _h("div", {
    className: "press",
    onClick: onRestore,
    style: {
      textAlign: "center",
      padding: "12px",
      borderRadius: 14,
      background: "rgba(255,255,255,0.05)",
      fontSize: 13,
      fontWeight: 800,
      color: C.text,
      marginBottom: 18
    }
  }, "Restore purchases"), (account.subscription?.mock || !account.subscriptionActive) && _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      lineHeight: 1.6,
      color: C.faint,
      textAlign: "center",
      marginBottom: 14
    }
  }, "Billing is demo-only for now \u2014 no card is ever charged. Real App Store / Play billing is on the launch checklist."), (account.purchases || []).length > 0 && _h(Card, {
    style: {
      margin: 0
    }
  }, _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      letterSpacing: 0.8,
      color: C.muted,
      textTransform: "uppercase",
      marginBottom: 10
    }
  }, "Purchase history"), (account.purchases || []).slice().reverse().map((p, i) => _h("div", {
    key: i,
    style: {
      display: "flex",
      justifyContent: "space-between",
      padding: "8px 0",
      borderBottom: "1px solid rgba(255,255,255,0.04)"
    }
  }, _h("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: C.text
    }
  }, p.label, " ", p.mock && _h("span", {
    style: {
      fontSize: 9,
      color: C.faint
    }
  }, "DEMO")), _h("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 700,
      color: C.muted
    }
  }, "\u20AC", p.price, " \xB7 ", new Date(p.at).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short"
  }))))))));
}
function NotifPrefsPage({
  prefs,
  onSave,
  goBack
}) {
  const [p, setP] = useState({
    enabled: true,
    rest: true,
    nudge: true,
    messages: true,
    training: true,
    ...(prefs || {})
  });
  const upd = (k, v) => {
    const next = {
      ...p,
      [k]: v
    };
    setP(next);
    onSave(next);
  };
  const rows = [["rest", "⏱ Rest timer done", "POP + notification when rest hits zero"], ["nudge", "😴 Inactivity nudge", "10 minutes without logging a set"], ["messages", "✉️ Messages", "When someone writes to you"], ["training", "🏋️ Friend training pings", "When someone you follow starts"]];
  return _h("div", {
    style: {
      minHeight: "100vh",
      paddingBottom: 110
    },
    className: "slide"
  }, _h(PageHeader, {
    goBack: goBack,
    title: "Notifications \uD83D\uDD14",
    subtitle: "What's allowed to ping you"
  }), _h("div", {
    style: {
      padding: "0 18px"
    }
  }, _h(Card, {
    style: {
      margin: "0 0 14px"
    }
  }, _h("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, _h("div", null, _h("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 800,
      color: C.text
    }
  }, "All notifications"), _h("div", {
    style: {
      fontSize: 11.5,
      color: C.muted,
      fontWeight: 600,
      marginTop: 2
    }
  }, "Master switch")), _h(Toggle, {
    value: p.enabled,
    onChange: v => upd("enabled", v)
  }))), _h(Card, {
    style: {
      margin: 0,
      opacity: p.enabled ? 1 : 0.45
    }
  }, rows.map(([k, label, sub], i) => _h("div", {
    key: k,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "11px 0",
      borderBottom: i < rows.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none"
    }
  }, _h("div", null, _h("div", {
    style: {
      fontSize: 13.5,
      fontWeight: 800,
      color: C.text
    }
  }, label), _h("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      fontWeight: 600,
      marginTop: 2
    }
  }, sub)), _h(Toggle, {
    value: p[k] !== false,
    onChange: v => upd(k, v)
  })))), _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      lineHeight: 1.6,
      color: C.faint,
      textAlign: "center",
      marginTop: 14
    }
  }, "These apply on this device via browser notifications. Real push (works when the app is closed) needs the native app build.")));
}
function ExportPage({
  user,
  goBack,
  pushToast
}) {
  const dl = params => {
    if (!user || !API) {
      pushToast && pushToast("📤", "Export unavailable", "No server connection.");
      return;
    }
    window.open(API + "/export/" + user.id + "?" + params, "_blank");
  };
  const rows = [["📦", "Everything (JSON)", "History, weights, gyms, programs — full fidelity", "format=json"], ["📊", "Workouts (CSV)", "Every set as a spreadsheet row", "format=csv&what=workouts"], ["⚖️", "Body weight (CSV)", "Dated weigh-ins", "format=csv&what=weights"]];
  return _h("div", {
    style: {
      minHeight: "100vh",
      paddingBottom: 110
    },
    className: "slide"
  }, _h(PageHeader, {
    goBack: goBack,
    title: "Export data \uD83D\uDCE4",
    subtitle: "Your training, yours to keep"
  }), _h("div", {
    style: {
      padding: "0 18px"
    }
  }, rows.map(([icon, label, sub, params]) => _h(SettingsRow, {
    key: label,
    icon: icon,
    label: label,
    sub: sub,
    onClick: () => dl(params)
  })), _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      lineHeight: 1.6,
      color: C.faint,
      textAlign: "center",
      marginTop: 14
    }
  }, "Downloads come straight from your own server \u2014 no third party ever sees them. PDF export is still on the wishlist.")));
}
function parseCSV(text) {
  const rows = [];
  let row = [],
    field = "",
    inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else inQuotes = false;
      } else field += ch;
    } else {
      if (ch === '"') inQuotes = true;else if (ch === ",") {
        row.push(field);
        field = "";
      } else if (ch === "\n" || ch === "\r") {
        if (ch === "\r" && text[i + 1] === "\n") i++;
        row.push(field);
        field = "";
        if (row.length > 1 || row[0] !== "") rows.push(row);
        row = [];
      } else field += ch;
    }
  }
  if (field !== "" || row.length) {
    row.push(field);
    if (row.length > 1 || row[0] !== "") rows.push(row);
  }
  return rows;
}
function lbToKg(v) {
  return Math.round(v * 0.45359237 * 2) / 2;
}
function rpeToFeel(rpe) {
  const r = parseFloat(rpe);
  if (isNaN(r)) return null;
  if (r <= 6.5) return 2;
  if (r <= 7.5) return 3;
  if (r <= 8.5) return 4;
  return 5;
}
function parseDurationMins(s) {
  if (!s) return 0;
  const h = /(\d+)\s*h/.exec(s),
    m = /(\d+)\s*m/.exec(s);
  if (h || m) return (h ? parseInt(h[1]) * 60 : 0) + (m ? parseInt(m[1]) : 0);
  const n = parseInt(s);
  return isNaN(n) ? 0 : n;
}
function parseImportFile(name, text) {
  if (name.toLowerCase().endsWith(".json") || text.trim().startsWith("{")) {
    try {
      const j = JSON.parse(text);
      const hist = Array.isArray(j) ? j : j.history || [];
      const sessions = hist.filter(h => h && h.date && Array.isArray(h.sets));
      if (!sessions.length) return {
        error: "No sessions found in this JSON file"
      };
      return {
        format: "IronLog JSON",
        sessions
      };
    } catch (e) {
      return {
        error: "Couldn't parse this JSON file"
      };
    }
  }
  const rows = parseCSV(text);
  if (rows.length < 2) return {
    error: "This file has no data rows"
  };
  const headers = rows[0].map(h => h.trim().toLowerCase());
  const col = n => headers.indexOf(n);
  const get = (row, n) => {
    const i = col(n);
    return i >= 0 ? (row[i] || "").trim() : "";
  };
  const isHevy = col("exercise_title") >= 0 && col("weight_kg") >= 0;
  const isStrong = col("exercise name") >= 0 && col("workout name") >= 0;
  if (!isHevy && !isStrong) return {
    error: "Unrecognized CSV — expected a Hevy or Strong export"
  };
  const groups = {};
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    if (!row || row.length < 3) continue;
    let date, workoutName, ex, kg, reps, note, feel, dur;
    if (isHevy) {
      if ((get(row, "set_type") || "").toLowerCase() === "warmup") continue;
      const start = Date.parse(get(row, "start_time"));
      date = isNaN(start) ? null : new Date(start).toISOString().slice(0, 10);
      workoutName = get(row, "title") || "Imported workout";
      ex = get(row, "exercise_title");
      kg = parseFloat(get(row, "weight_kg")) || 0;
      reps = parseInt(get(row, "reps")) || 0;
      note = get(row, "exercise_notes") || null;
      feel = rpeToFeel(get(row, "rpe"));
      const end = Date.parse(get(row, "end_time"));
      dur = !isNaN(start) && !isNaN(end) ? Math.max(0, Math.round((end - start) / 60000)) : 0;
    } else {
      const raw = get(row, "date");
      date = raw ? raw.slice(0, 10) : null;
      workoutName = get(row, "workout name") || "Imported workout";
      ex = get(row, "exercise name");
      kg = parseFloat(get(row, "weight")) || 0;
      const unit = (get(row, "weight unit") || "").toLowerCase();
      if (unit.startsWith("lb")) kg = lbToKg(kg);
      reps = parseInt(get(row, "reps")) || 0;
      note = get(row, "notes") || null;
      feel = rpeToFeel(get(row, "rpe"));
      dur = parseDurationMins(get(row, "duration"));
    }
    if (!date || !ex || reps <= 0) continue;
    const key = date + "|" + workoutName;
    if (!groups[key]) groups[key] = {
      date,
      workoutName,
      dur: dur || 0,
      sets: []
    };
    if (dur && !groups[key].dur) groups[key].dur = dur;
    groups[key].sets.push({
      ex,
      kg,
      reps,
      note,
      feel,
      ssId: null,
      gym: null
    });
  }
  const sessions = Object.values(groups).map(g => ({
    id: uid(),
    ts: Date.parse(g.date + "T18:00:00") || Date.now(),
    date: g.date,
    workoutName: g.workoutName,
    collectionName: "Imported",
    dur: g.dur,
    vol: Math.round(g.sets.reduce((a, s) => a + s.kg * s.reps, 0)),
    gym: null,
    sets: g.sets,
    sessionNote: ""
  }));
  if (!sessions.length) return {
    error: "Parsed the file but found no usable sets"
  };
  return {
    format: isHevy ? "Hevy" : "Strong",
    sessions
  };
}
function ImportPage({
  user,
  history,
  goBack,
  onImported
}) {
  const [parsed, setParsed] = useState(null);
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const onFile = file => {
    if (!file) return;
    setResult(null);
    const reader = new FileReader();
    reader.onload = () => setParsed(parseImportFile(file.name, String(reader.result || "")));
    reader.readAsText(file);
  };
  const doImport = async () => {
    if (!parsed?.sessions || !user) return;
    setBusy(true);
    const existingKeys = new Set((history || []).map(h => h.date + "|" + h.workoutName + "|" + (h.sets || []).length));
    const fresh = parsed.sessions.filter(s => !existingKeys.has(s.date + "|" + s.workoutName + "|" + s.sets.length));
    const dupes = parsed.sessions.length - fresh.length;
    const d = fresh.length ? await api("POST", "/history/bulk", {
      userId: user.id,
      entries: fresh
    }) : {
      ok: true,
      imported: 0,
      skipped: 0
    };
    setBusy(false);
    if (!d || d.error) {
      setResult({
        error: d?.error === "locked" ? d.message : d?.error || "Server unreachable"
      });
      return;
    }
    setResult({
      imported: d.imported,
      skipped: (d.skipped || 0) + dupes
    });
    if (d.imported && onImported) onImported(fresh);
  };
  const range = parsed?.sessions ? (() => {
    const ds = parsed.sessions.map(s => s.date).sort();
    return ds[0] + " → " + ds[ds.length - 1];
  })() : "";
  return _h("div", {
    style: {
      minHeight: "100vh",
      paddingBottom: 110
    },
    className: "slide"
  }, _h(PageHeader, {
    goBack: goBack,
    title: "Import workouts \uD83D\uDCE5",
    subtitle: "From Hevy, Strong or an IronLog export"
  }), _h("div", {
    style: {
      padding: "0 18px"
    }
  }, _h("div", {
    className: "press",
    onClick: () => document.getElementById("il-import-input").click(),
    style: {
      padding: "22px 16px",
      borderRadius: 18,
      border: "1.5px dashed rgba(var(--acr),0.4)",
      background: "rgba(var(--acr),0.05)",
      textAlign: "center",
      marginBottom: 14
    }
  }, _h("div", {
    style: {
      fontSize: 28,
      marginBottom: 6
    }
  }, "\uD83D\uDCC2"), _h("div", {
    style: {
      fontSize: 13.5,
      fontWeight: 800,
      color: C.accent
    }
  }, "Choose a file"), _h("div", {
    style: {
      fontSize: 11.5,
      color: C.muted,
      fontWeight: 600,
      marginTop: 4
    }
  }, "Hevy CSV \xB7 Strong CSV \xB7 IronLog JSON")), _h("input", {
    id: "il-import-input",
    type: "file",
    accept: ".csv,.json,text/csv,application/json",
    style: {
      display: "none"
    },
    onChange: e => {
      onFile(e.target.files[0]);
      e.target.value = "";
    }
  }), parsed?.error && _h(Card, {
    style: {
      margin: "0 0 12px",
      border: "1.5px solid rgba(226,106,79,0.3)"
    }
  }, _h("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: C.danger
    }
  }, "\u26A0\uFE0F ", parsed.error), _h("div", {
    style: {
      fontSize: 11.5,
      color: C.muted,
      fontWeight: 600,
      marginTop: 6,
      lineHeight: 1.6
    }
  }, "Export from Hevy: Profile \u2192 Settings \u2192 Export Data. From Strong: Settings \u2192 Export Strong Data.")), parsed?.sessions && !result && _h(Card, {
    style: {
      margin: "0 0 12px"
    }
  }, _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      letterSpacing: 0.8,
      color: C.muted,
      textTransform: "uppercase",
      marginBottom: 10
    }
  }, "Found in this file"), [["Source", parsed.format], ["Sessions", parsed.sessions.length], ["Sets", parsed.sessions.reduce((a, s) => a + s.sets.length, 0)], ["Dates", range]].map(([k, v]) => _h("div", {
    key: k,
    style: {
      display: "flex",
      justifyContent: "space-between",
      padding: "7px 0",
      borderBottom: "1px solid rgba(255,255,255,0.04)"
    }
  }, _h("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 700,
      color: C.muted
    }
  }, k), _h("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 800,
      color: C.text
    }
  }, v))), _h("div", {
    style: {
      marginTop: 12
    }
  }, _h(Btn, {
    full: true,
    onClick: doImport,
    style: {
      opacity: busy ? 0.6 : 1
    }
  }, busy ? "Importing…" : "Import " + parsed.sessions.length + " sessions")), _h("div", {
    style: {
      fontSize: 10.5,
      fontWeight: 600,
      color: C.faint,
      textAlign: "center",
      marginTop: 8
    }
  }, "Sessions that match ones already logged (same day, name and set count) are skipped.")), result && _h(Card, {
    style: {
      margin: 0,
      textAlign: "center"
    }
  }, result.error ? _h(_F, null, _h("div", {
    style: {
      fontSize: 30,
      marginBottom: 8
    }
  }, "\u26A0\uFE0F"), _h("div", {
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: C.danger
    }
  }, result.error)) : _h(_F, null, _h("div", {
    style: {
      fontSize: 30,
      marginBottom: 8
    }
  }, "\u2705"), _h("div", {
    style: {
      fontSize: 15,
      fontWeight: 800,
      color: C.text
    }
  }, result.imported, " session", result.imported === 1 ? "" : "s", " imported"), result.skipped > 0 && _h("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      fontWeight: 600,
      marginTop: 4
    }
  }, result.skipped, " skipped (already logged)"), _h("div", {
    style: {
      fontSize: 11.5,
      color: C.muted,
      fontWeight: 600,
      marginTop: 8,
      lineHeight: 1.6
    }
  }, "PRs, stats and the recovery map now include your imported history.")))));
}
function ReferralPage({
  user,
  account,
  goBack
}) {
  const [copied, setCopied] = useState(false);
  const code = account?.referralCode || (user?.name || "USER").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 10) + "30";
  const link = "https://ironlog.app/r/" + code;
  const copy = text => {
    try {
      navigator.clipboard.writeText(text).catch(() => {});
    } catch (e) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const share = () => {
    if (navigator.share) navigator.share({
      title: "IronLog",
      text: "Train with me on IronLog — use my code for a free month:",
      url: link
    }).catch(() => {});else copy(link);
  };
  return _h("div", {
    style: {
      minHeight: "100vh",
      paddingBottom: 110
    },
    className: "slide"
  }, _h(PageHeader, {
    goBack: goBack,
    title: "Invite friends \uD83C\uDF81",
    subtitle: "Give a month, get a month"
  }), _h("div", {
    style: {
      padding: "0 18px"
    }
  }, _h("div", {
    style: {
      borderRadius: 18,
      padding: 20,
      background: "linear-gradient(150deg,rgba(var(--acr),0.14),rgba(var(--acr),0.04))",
      border: "1.5px solid rgba(var(--acr),0.3)",
      textAlign: "center",
      marginBottom: 14
    }
  }, _h("div", {
    style: {
      fontSize: 10,
      fontWeight: 800,
      letterSpacing: 1.5,
      color: C.muted
    }
  }, "YOUR CODE"), _h("div", {
    className: "sora",
    style: {
      fontSize: 28,
      fontWeight: 800,
      letterSpacing: 2,
      color: C.accent,
      marginTop: 8
    }
  }, code)), _h("div", {
    style: {
      display: "flex",
      gap: 9,
      marginBottom: 14
    }
  }, _h("div", {
    className: "press",
    onClick: () => copy(code),
    style: {
      flex: 1,
      textAlign: "center",
      padding: "12px 0",
      borderRadius: 14,
      background: "rgba(255,255,255,0.06)",
      color: C.text,
      fontSize: 12.5,
      fontWeight: 800
    }
  }, copied ? "✓ Copied" : "Copy code"), _h("div", {
    className: "press",
    onClick: share,
    style: {
      flex: 1,
      textAlign: "center",
      padding: "12px 0",
      borderRadius: 14,
      background: C.btnGrad,
      color: C.ink,
      fontSize: 12.5,
      fontWeight: 800
    }
  }, "Share link")), account && _h("div", {
    style: {
      display: "flex",
      gap: 9,
      marginBottom: 14
    }
  }, _h("div", {
    style: {
      flex: 1,
      textAlign: "center",
      padding: "12px 0",
      borderRadius: 14,
      background: C.surface,
      border: "1px solid " + C.border
    }
  }, _h("div", {
    className: "sora",
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: C.text
    }
  }, account.invited || 0), _h("div", {
    style: {
      fontSize: 10,
      fontWeight: 800,
      color: C.faint,
      marginTop: 2
    }
  }, "INVITED")), _h("div", {
    style: {
      flex: 1,
      textAlign: "center",
      padding: "12px 0",
      borderRadius: 14,
      background: C.surface,
      border: "1px solid " + C.border
    }
  }, _h("div", {
    className: "sora",
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: C.good
    }
  }, account.earnedMonths || 0), _h("div", {
    style: {
      fontSize: 10,
      fontWeight: 800,
      color: C.faint,
      marginTop: 2
    }
  }, "MONTHS EARNED"))), _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      lineHeight: 1.6,
      color: C.faint,
      textAlign: "center"
    }
  }, account ? "A friend enters your code at sign-up: they get an extra free month, you earn one on your plan." : "Referral codes work with email accounts — create one to get a working code.")));
}
const FAQ_ITEMS = [["Can I import my data from Hevy / Strong / another app?", "Yes - Settings → Import workouts takes CSV exports from Hevy and Strong, plus IronLog's own JSON backup. You see a preview first and duplicate sessions are skipped automatically. Your data also exports cleanly (Settings → Export), so nothing you log is ever stuck."], ["What happens when my free month ends?", "The app locks for your email until you subscribe. Nothing is deleted — every session, PR and weigh-in is kept and comes back instantly when you subscribe."], ["Is there a free tier?", "No. One month free with every feature, then a paid plan (from €1.67/month). We'd rather be honest than cripple the app."], ["How does the recovery map work?", "Every set is scored as a fraction of one hard working set — from your reps, how close to failure it felt, the weight relative to your recent numbers for that lift, how eccentric/stretched the exercise is, and how familiar the movement is. That fatigue then fades exponentially, faster for small muscles than for quads or hamstrings, and the 3D body colours red → green as it does. The clever part: whenever you train a muscle again, IronLog quietly compares your first working set against your recent baseline — if you keep performing sooner than predicted, your personal recovery rate for that muscle speeds up (and vice versa). The longer you log, the more the map is calibrated to your body, not a textbook average."], ["What does the set-feel slider do?", "It's optional RPE — how close to failure the set was. It directly scales the recovery estimate: an EASY set counts about a third of a HARD one, and true FAILURE costs extra. Unrated sets count as solid working sets."], ["Why per-gym weights?", "The same machine loaded with 50kg feels different in another gym. IronLog remembers your numbers per gym and shows what you lifted elsewhere as a reference."], ["Do rest-timer alerts work with the screen off?", "Best effort on the web: a silent audio loop keeps the session alive so the POP can fire. Guaranteed background alerts need the native app."], ["Can I pause my subscription?", "Yes - once per account. While you're not on an active paid plan, Settings → Delete account offers 'Pause for 3 months instead', which pushes your lock date 3 months out with no charge. Cancelling a paid plan keeps the app open until the end of the paid period."], ["How do I delete my account?", "Settings → Delete account. It's a 3-step flow with a 30-day grace period — sign in any time before the date and everything is exactly where you left it."], ["Is my data sold or shown to advertisers?", "Never. No ads, no data sales, no trackers. The subscription is the whole business model."]];
function HelpPage({
  goBack
}) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(null);
  const items = FAQ_ITEMS.filter(([question, answer]) => !q.trim() || question.toLowerCase().includes(q.toLowerCase()) || answer.toLowerCase().includes(q.toLowerCase()));
  return _h("div", {
    style: {
      minHeight: "100vh",
      paddingBottom: 110
    },
    className: "slide"
  }, _h(PageHeader, {
    goBack: goBack,
    title: "Help \uD83D\uDEDF",
    subtitle: "Frequently asked questions"
  }), _h("div", {
    style: {
      padding: "0 18px"
    }
  }, _h("div", {
    style: {
      position: "relative",
      marginBottom: 14
    }
  }, _h("input", {
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Search the FAQ\u2026",
    style: {
      width: "100%",
      padding: "11px 14px 11px 38px",
      background: "rgba(255,255,255,0.05)",
      border: "1.5px solid rgba(var(--acr),0.2)",
      borderRadius: 14,
      fontSize: 14,
      color: C.text,
      outline: "none",
      fontFamily: "'Manrope',sans-serif"
    }
  }), _h("span", {
    style: {
      position: "absolute",
      left: 12,
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: 15
    }
  }, "\uD83D\uDD0D")), items.map(([question, answer], i) => _h("div", {
    key: question,
    className: "press",
    onClick: () => setOpen(open === i ? null : i),
    style: {
      padding: "13px 15px",
      borderRadius: 14,
      background: open === i ? "rgba(var(--acr),0.07)" : C.surface,
      border: "1px solid " + (open === i ? "rgba(var(--acr),0.3)" : C.border),
      marginBottom: 8
    }
  }, _h("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: 10
    }
  }, _h("div", {
    style: {
      fontSize: 13.5,
      fontWeight: 800,
      color: C.text
    }
  }, question), _h("span", {
    style: {
      color: C.muted,
      fontSize: 13,
      flexShrink: 0
    }
  }, open === i ? "−" : "+")), open === i && _h("div", {
    style: {
      fontSize: 12.5,
      color: C.mid,
      fontWeight: 600,
      lineHeight: 1.65,
      marginTop: 8
    }
  }, answer))), items.length === 0 && _h("div", {
    style: {
      textAlign: "center",
      color: C.muted,
      fontSize: 13,
      padding: 30,
      fontWeight: 600
    }
  }, "Nothing matches \"", q, "\"")));
}
function LegalPage({
  kind,
  goBack
}) {
  const privacy = [["What we store", "Your workouts, body-weight entries, gyms, programs, profile name/photo and — if you create an account — your email and a salted password hash. That's it."], ["Where it lives", "On the IronLog server you connect to. In this household build, that's a machine in your own home — data never leaves it."], ["What we never do", "No ads. No selling or sharing data. No location, no contacts, no third-party analytics or trackers of any kind."], ["Export & deletion", "Export everything any time (Settings → Export). Deleting your account has a 30-day grace period, then removal."]];
  const terms = [["The deal", "One free month with every feature, then a paid plan. No free tier. If you don't subscribe, the app locks but your data is kept, never deleted."], ["Your data is yours", "You can export it at any time in open formats (JSON/CSV). Cancelling or being locked never destroys data."], ["Fair use", "One account per person. Sharing an account across a household is what shared-device profiles are for."], ["No medical advice", "Recovery estimates and training info are guidance, not medical advice. Train sensibly."]];
  const items = kind === "privacy" ? privacy : terms;
  return _h("div", {
    style: {
      minHeight: "100vh",
      paddingBottom: 110
    },
    className: "slide"
  }, _h(PageHeader, {
    goBack: goBack,
    title: kind === "privacy" ? "Privacy 🔒" : "Terms 📜",
    subtitle: "Plain language, no small print"
  }), _h("div", {
    style: {
      padding: "0 18px"
    }
  }, _h("div", {
    style: {
      padding: "9px 13px",
      borderRadius: 12,
      background: "rgba(var(--acr),0.08)",
      border: "1px dashed rgba(var(--acr),0.3)",
      fontSize: 10.5,
      fontWeight: 700,
      color: C.accentDark,
      marginBottom: 14
    }
  }, "DRAFT \u2014 written honestly but not lawyer-reviewed; a hosted, reviewed version is required before app-store submission."), items.map(([h, body]) => _h(Card, {
    key: h,
    style: {
      margin: "0 0 12px"
    }
  }, _h("div", {
    style: {
      fontSize: 13.5,
      fontWeight: 800,
      color: C.text,
      marginBottom: 6
    }
  }, h), _h("div", {
    style: {
      fontSize: 12.5,
      color: C.mid,
      fontWeight: 600,
      lineHeight: 1.65
    }
  }, body)))));
}
function AboutPage({
  goBack
}) {
  return _h("div", {
    style: {
      minHeight: "100vh",
      paddingBottom: 110
    },
    className: "slide"
  }, _h(PageHeader, {
    goBack: goBack,
    title: "About \u2139\uFE0F",
    subtitle: "IronLog"
  }), _h("div", {
    style: {
      padding: "0 18px"
    }
  }, _h(Card, {
    style: {
      margin: "0 0 12px",
      textAlign: "center"
    }
  }, _h("div", {
    className: "sora",
    style: {
      fontSize: 30,
      fontWeight: 800,
      letterSpacing: -1,
      color: C.cream
    }
  }, "IRON", _h("span", {
    style: {
      color: C.amber
    }
  }, "LOG")), _h("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      fontWeight: 600,
      marginTop: 6
    }
  }, "your lifts \xB7 your data \xB7 your progress"), _h("div", {
    style: {
      fontSize: 11,
      color: C.faint,
      fontWeight: 700,
      marginTop: 10
    }
  }, "Version 0.9 \xB7 August 2026")), _h(Card, {
    style: {
      margin: 0
    }
  }, [["Built with", "React 19 + Express + three.js"], ["Data", "Self-hosted, JSON-file storage"], ["Ads & trackers", "Zero, forever"], ["Made for", "People who actually train"]].map(([k, v]) => _h("div", {
    key: k,
    style: {
      display: "flex",
      justifyContent: "space-between",
      padding: "9px 0",
      borderBottom: "1px solid rgba(255,255,255,0.04)"
    }
  }, _h("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 700,
      color: C.muted
    }
  }, k), _h("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 800,
      color: C.text
    }
  }, v))))));
}
function DeleteAccountPage({
  account,
  goBack,
  go,
  onScheduled,
  pushToast,
  setAccount
}) {
  const [step, setStep] = useState(account?.deleteScheduledAt ? 3 : 0);
  const [typed, setTyped] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const doDelete = async () => {
    setErr("");
    const d = await api("POST", "/auth/delete-account", {
      password: pw
    });
    if (!d || d.error) {
      setErr(d?.error || "Server unreachable");
      return;
    }
    setAccount(d.account);
    setStep(3);
    onScheduled && onScheduled(d.account);
  };
  const cancelDelete = async () => {
    const d = await api("POST", "/auth/cancel-delete");
    if (d && d.account) {
      setAccount(d.account);
      setStep(0);
      pushToast && pushToast("💚", "Deletion cancelled", "Your account is staying.");
    }
  };
  if (!account) return null;
  return _h("div", {
    style: {
      minHeight: "100vh",
      paddingBottom: 110
    },
    className: "slide"
  }, _h(PageHeader, {
    goBack: goBack,
    title: "Delete account \uD83D\uDDD1\uFE0F",
    subtitle: account.email
  }), _h("div", {
    style: {
      padding: "0 18px"
    }
  }, step === 0 && _h(_F, null, _h(Card, {
    style: {
      margin: "0 0 12px"
    }
  }, _h("div", {
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: C.text,
      marginBottom: 8
    }
  }, "Before you go \u2014 would one of these help?"), _h("div", {
    style: {
      fontSize: 12.5,
      color: C.mid,
      fontWeight: 600,
      lineHeight: 1.7
    }
  }, "\xB7 ", _h("b", null, "Money?"), " The 12-month plan is \u20AC1.67/month.", _h("br", null), "\xB7 ", _h("b", null, "Break?"), " Pause below, or just stop logging \u2014 data waits for free.", _h("br", null), "\xB7 ", _h("b", null, "Something broken or missing?"), " Tell us in Help & FAQ.")), account.canPause && _h("div", {
    className: "press",
    onClick: async () => {
      const d = await api("POST", "/auth/pause");
      if (d && d.account) {
        setAccount(d.account);
        pushToast && pushToast("⏸️", "Paused for 3 months", "The app stays open until " + new Date(d.account.trialEndsAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long"
        }) + " — no charge.");
        goBack();
      } else pushToast && pushToast("⚠️", "Couldn't pause", d?.error || "Server unreachable");
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "14px 16px",
      borderRadius: 16,
      background: "rgba(87,192,138,0.1)",
      border: "1.5px solid rgba(87,192,138,0.3)",
      marginBottom: 12
    }
  }, _h("span", {
    style: {
      fontSize: 20
    }
  }, "\u23F8\uFE0F"), _h("div", null, _h("div", {
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: C.good
    }
  }, "Pause for 3 months instead"), _h("div", {
    style: {
      fontSize: 11.5,
      color: C.muted,
      fontWeight: 600,
      marginTop: 2
    }
  }, "Free, once per account. The lock moves 3 months out."))), account.pausedUntil && !account.canPause && _h("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 700,
      color: C.muted,
      textAlign: "center",
      marginBottom: 12
    }
  }, "\u23F8\uFE0F Your one pause is used \u2014 the app stays open until ", new Date(account.trialEndsAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }), "."), _h(Btn, {
    full: true,
    outline: true,
    onClick: goBack,
    style: {
      marginBottom: 10
    }
  }, "Keep my account"), _h("div", {
    className: "press",
    onClick: () => setStep(1),
    style: {
      textAlign: "center",
      padding: "12px",
      fontSize: 13,
      fontWeight: 800,
      color: C.danger
    }
  }, "Continue deleting")), step === 1 && _h(_F, null, _h(Card, {
    style: {
      margin: "0 0 12px",
      border: "1.5px solid rgba(226,106,79,0.3)"
    }
  }, _h("div", {
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: C.danger,
      marginBottom: 8
    }
  }, "What deletion means"), _h("div", {
    style: {
      fontSize: 12.5,
      color: C.mid,
      fontWeight: 600,
      lineHeight: 1.7
    }
  }, "\xB7 Every session, PR, weigh-in and program \u2014 gone.", _h("br", null), "\xB7 Your subscription ends. No refunds for partial periods.", _h("br", null), "\xB7 ", _h("b", null, "30-day grace period:"), " sign in before the date and everything is restored.")), _h("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: C.muted,
      marginBottom: 8
    }
  }, "Type ", _h("b", {
    style: {
      color: C.danger
    }
  }, "DELETE"), " to continue"), _h(FInput, {
    value: typed,
    onChange: e => setTyped(e.target.value),
    placeholder: "DELETE",
    style: {
      textAlign: "center",
      letterSpacing: 3
    }
  }), _h(Btn, {
    full: true,
    danger: true,
    onClick: () => typed.trim() === "DELETE" && setStep(2),
    style: {
      opacity: typed.trim() === "DELETE" ? 1 : 0.45,
      marginBottom: 10
    }
  }, "Continue"), _h("div", {
    className: "press",
    onClick: goBack,
    style: {
      textAlign: "center",
      padding: "11px",
      fontSize: 13,
      fontWeight: 700,
      color: C.muted
    }
  }, "Never mind \u2014 keep my account")), step === 2 && _h(_F, null, _h(Card, {
    style: {
      margin: "0 0 12px"
    }
  }, _h("div", {
    style: {
      fontSize: 13.5,
      fontWeight: 800,
      color: C.text,
      marginBottom: 10
    }
  }, "Confirm it's you"), _h(FInput, {
    label: "Password",
    type: "password",
    value: pw,
    onChange: e => {
      setPw(e.target.value);
      setErr("");
    },
    placeholder: "Your account password"
  }), err && _h("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 700,
      color: C.danger,
      marginBottom: 10
    }
  }, err), _h(Btn, {
    full: true,
    danger: true,
    onClick: doDelete
  }, "Schedule deletion")), _h("div", {
    className: "press",
    onClick: goBack,
    style: {
      textAlign: "center",
      padding: "11px",
      fontSize: 13,
      fontWeight: 700,
      color: C.muted
    }
  }, "Cancel")), step === 3 && account.deleteScheduledAt && _h(_F, null, _h(Card, {
    style: {
      margin: "0 0 12px",
      textAlign: "center"
    }
  }, _h("div", {
    style: {
      fontSize: 34,
      marginBottom: 8
    }
  }, "\u23F3"), _h("div", {
    style: {
      fontSize: 15,
      fontWeight: 800,
      color: C.text
    }
  }, "Deletion scheduled"), _h("div", {
    style: {
      fontSize: 12.5,
      color: C.mid,
      fontWeight: 600,
      lineHeight: 1.7,
      marginTop: 8
    }
  }, "Your account and data will be removed on", _h("br", null), _h("b", {
    style: {
      color: C.danger
    }
  }, new Date(account.deleteScheduledAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  })), ".", _h("br", null), "Sign in any time before then to cancel \u2014 everything will be exactly where you left it.")), _h(Btn, {
    full: true,
    onClick: cancelDelete
  }, "\uD83D\uDC9A Cancel deletion \u2014 keep everything"))));
}
function AuthShell({
  children,
  onBack,
  wide
}) {
  return _h("div", {
    style: {
      minHeight: "100vh",
      background: "radial-gradient(120% 90% at 80% 0%, #221a10 0%, #16120D 55%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 26px 60px",
      position: "relative",
      overflow: "hidden"
    }
  }, _h("div", {
    style: {
      position: "absolute",
      width: 300,
      height: 300,
      borderRadius: "50%",
      background: "radial-gradient(circle,rgba(var(--acr),0.14) 0%,transparent 70%)",
      top: -80,
      right: -60
    }
  }), _h("div", {
    style: {
      position: "absolute",
      width: 200,
      height: 200,
      borderRadius: "50%",
      background: "radial-gradient(circle,rgba(var(--acr),0.10) 0%,transparent 70%)",
      bottom: 30,
      left: -50
    }
  }), onBack && _h("div", {
    className: "press",
    onClick: onBack,
    style: {
      position: "absolute",
      top: 22,
      left: 20,
      width: 38,
      height: 38,
      borderRadius: 13,
      background: "rgba(255,255,255,0.05)",
      border: "1px solid " + C.border,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: C.text,
      fontSize: 17,
      zIndex: 5
    }
  }, "\u2039"), _h("div", {
    className: "fadeUp",
    style: {
      textAlign: "center",
      marginBottom: 30
    }
  }, _h("div", {
    className: "sora",
    style: {
      fontSize: 42,
      fontWeight: 800,
      letterSpacing: -1.8,
      color: C.cream
    }
  }, "IRON", _h("span", {
    style: {
      color: C.amber
    }
  }, "LOG"))), _h("div", {
    className: "fadeUp",
    style: {
      width: "100%",
      maxWidth: wide ? 480 : 420
    }
  }, children));
}
function SsoButtons({
  onNote
}) {
  return _h("div", {
    style: {
      marginBottom: 16
    }
  }, [["", "Continue with Apple"], ["G", "Continue with Google"]].map(([icon, label]) => _h("div", {
    key: label,
    className: "press",
    onClick: onNote,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 9,
      padding: "13px 0",
      borderRadius: 14,
      background: "rgba(255,255,255,0.06)",
      border: "1px solid " + C.border,
      marginBottom: 9,
      fontSize: 14,
      fontWeight: 800,
      color: C.text
    }
  }, _h("span", {
    style: {
      fontSize: 16,
      fontWeight: 900
    }
  }, icon), label)), _h("div", {
    style: {
      textAlign: "center",
      fontSize: 10.5,
      fontWeight: 600,
      color: C.faint
    }
  }, "Apple & Google sign-in aren't connected yet \u2014 use email below"));
}
function DevCodeNote({
  code,
  label = "verification"
}) {
  if (!code) return null;
  return _h("div", {
    style: {
      padding: "12px 14px",
      borderRadius: 14,
      background: "rgba(var(--acr),0.1)",
      border: "1.5px dashed rgba(var(--acr),0.4)",
      marginBottom: 14
    }
  }, _h("div", {
    style: {
      fontSize: 10,
      fontWeight: 800,
      letterSpacing: 1.2,
      color: C.accentDark
    }
  }, "DEV MODE \u2014 NO EMAIL SERVICE YET"), _h("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      color: C.mid,
      marginTop: 4
    }
  }, "Nothing was actually emailed. Your ", label, " code is:"), _h("div", {
    className: "sora",
    style: {
      fontSize: 24,
      fontWeight: 800,
      letterSpacing: 4,
      color: C.accent,
      marginTop: 6,
      textAlign: "center"
    }
  }, code));
}
function WelcomeScreen({
  onSignup,
  onSignin,
  onPicker
}) {
  return _h(AuthShell, null, _h("div", {
    style: {
      textAlign: "center",
      marginBottom: 26
    }
  }, _h("div", {
    className: "sora",
    style: {
      fontSize: 24,
      fontWeight: 800,
      color: C.text,
      lineHeight: 1.2
    }
  }, "Every set counts.", _h("br", null), "Start logging yours."), _h("div", {
    style: {
      fontSize: 13,
      color: C.muted,
      fontWeight: 600,
      marginTop: 10,
      lineHeight: 1.6
    }
  }, "One month free with every feature.", _h("br", null), "Your data stays yours, always.")), _h(Btn, {
    full: true,
    onClick: onSignup,
    style: {
      marginBottom: 10
    }
  }, "Create account"), _h("div", {
    className: "press",
    onClick: onSignin,
    style: {
      textAlign: "center",
      padding: "13px 0",
      borderRadius: 14,
      background: "rgba(255,255,255,0.06)",
      border: "1.5px solid rgba(var(--acr),0.35)",
      fontSize: 14,
      fontWeight: 800,
      color: C.accent,
      marginBottom: 22
    }
  }, "Sign in"), _h("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 18
    }
  }, _h("div", {
    style: {
      flex: 1,
      height: 1,
      background: C.border
    }
  }), _h("span", {
    style: {
      fontSize: 10.5,
      fontWeight: 800,
      letterSpacing: 1,
      color: C.faint
    }
  }, "SHARED DEVICE?"), _h("div", {
    style: {
      flex: 1,
      height: 1,
      background: C.border
    }
  })), _h("div", {
    className: "press",
    onClick: onPicker,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      padding: "12px 0",
      borderRadius: 14,
      background: "rgba(255,255,255,0.04)",
      fontSize: 13,
      fontWeight: 700,
      color: C.mid
    }
  }, "\uD83D\uDC65 Use the profile picker"));
}
function AuthFormScreen({
  mode,
  onDone,
  onSwitch,
  onForgot,
  onBack,
  onSsoNote
}) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [refCode, setRefCode] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const isSignup = mode === "signup";
  const submit = async () => {
    setErr("");
    if (isSignup && pass !== pass2) {
      setErr("Passwords don't match");
      return;
    }
    setBusy(true);
    const d = await api("POST", isSignup ? "/auth/signup" : "/auth/signin", isSignup ? {
      email,
      password: pass,
      referralCode: refCode
    } : {
      email,
      password: pass
    });
    setBusy(false);
    if (!d) {
      setErr("Can't reach the server");
      return;
    }
    if (d.error) {
      setErr(d.error);
      return;
    }
    onDone(d);
  };
  return _h(AuthShell, {
    onBack: onBack
  }, _h("div", {
    className: "sora",
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: C.text,
      marginBottom: 4
    }
  }, isSignup ? "Create your account" : "Welcome back"), _h("div", {
    style: {
      fontSize: 12.5,
      color: C.muted,
      fontWeight: 600,
      marginBottom: 20
    }
  }, isSignup ? "One month free. Everything included." : "Sign in to pick up where you left off."), _h(SsoButtons, {
    onNote: onSsoNote
  }), _h(FInput, {
    label: "Email",
    type: "email",
    value: email,
    autoComplete: "email",
    onChange: e => {
      setEmail(e.target.value);
      setErr("");
    },
    placeholder: "you@example.com"
  }), _h(FInput, {
    label: "Password",
    type: "password",
    value: pass,
    autoComplete: isSignup ? "new-password" : "current-password",
    onChange: e => {
      setPass(e.target.value);
      setErr("");
    },
    placeholder: isSignup ? "At least 6 characters" : "Your password",
    onKeyDown: e => {
      if (e.key === "Enter" && !isSignup) submit();
    }
  }), isSignup && _h(FInput, {
    label: "Confirm password",
    type: "password",
    value: pass2,
    onChange: e => {
      setPass2(e.target.value);
      setErr("");
    },
    placeholder: "Same again"
  }), isSignup && _h(FInput, {
    label: "Referral code (optional)",
    value: refCode,
    onChange: e => setRefCode(e.target.value.toUpperCase()),
    placeholder: "Adds a free month for you both",
    style: {
      letterSpacing: 1
    },
    onKeyDown: e => e.key === "Enter" && submit()
  }), err && _h("div", {
    style: {
      color: C.danger,
      fontSize: 13,
      fontWeight: 700,
      marginBottom: 12
    }
  }, err), _h(Btn, {
    full: true,
    onClick: submit,
    style: {
      marginBottom: 12,
      opacity: busy ? 0.6 : 1
    }
  }, busy ? "…" : isSignup ? "Start my free month" : "Sign in"), _h("div", {
    style: {
      display: "flex",
      justifyContent: "space-between"
    }
  }, _h("div", {
    className: "press",
    onClick: onSwitch,
    style: {
      fontSize: 12.5,
      fontWeight: 700,
      color: C.muted,
      padding: "6px 0"
    }
  }, isSignup ? "Have an account? Sign in" : "New here? Create account"), !isSignup && _h("div", {
    className: "press",
    onClick: onForgot,
    style: {
      fontSize: 12.5,
      fontWeight: 700,
      color: C.accentDark,
      padding: "6px 0"
    }
  }, "Forgot password?")));
}
function VerifyEmailScreen({
  email,
  devCode,
  onVerified,
  onSkip,
  onBack
}) {
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async () => {
    setBusy(true);
    setErr("");
    const d = await api("POST", "/auth/verify", {
      code
    });
    setBusy(false);
    if (!d || d.error) {
      setErr(d?.error || "Can't reach the server");
      return;
    }
    onVerified(d.account);
  };
  return _h(AuthShell, {
    onBack: onBack
  }, _h("div", {
    className: "sora",
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: C.text,
      marginBottom: 4
    }
  }, "Check your email"), _h("div", {
    style: {
      fontSize: 12.5,
      color: C.muted,
      fontWeight: 600,
      marginBottom: 18
    }
  }, "We'd normally send a 6-digit code to ", _h("span", {
    style: {
      color: C.text
    }
  }, email), "."), _h(DevCodeNote, {
    code: devCode
  }), _h(FInput, {
    label: "Verification code",
    value: code,
    inputMode: "numeric",
    maxLength: 6,
    onChange: e => {
      setCode(e.target.value.replace(/\D/g, ""));
      setErr("");
    },
    placeholder: "6-digit code",
    style: {
      textAlign: "center",
      letterSpacing: 6,
      fontSize: 18
    },
    onKeyDown: e => e.key === "Enter" && submit()
  }), err && _h("div", {
    style: {
      color: C.danger,
      fontSize: 13,
      fontWeight: 700,
      marginBottom: 12
    }
  }, err), _h(Btn, {
    full: true,
    onClick: submit,
    style: {
      marginBottom: 10,
      opacity: busy ? 0.6 : 1
    }
  }, busy ? "…" : "Verify"), _h("div", {
    className: "press",
    onClick: onSkip,
    style: {
      textAlign: "center",
      padding: "11px",
      fontSize: 13,
      fontWeight: 700,
      color: C.muted
    }
  }, "Verify later"));
}
function ForgotResetScreen({
  onDone,
  onBack
}) {
  const [phase, setPhase] = useState("email");
  const [email, setEmail] = useState("");
  const [devCode, setDevCode] = useState(null);
  const [code, setCode] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const request = async () => {
    setBusy(true);
    setErr("");
    const d = await api("POST", "/auth/forgot", {
      email
    });
    setBusy(false);
    if (!d || d.error) {
      setErr(d?.error || "Can't reach the server");
      return;
    }
    setDevCode(d.devResetCode);
    setPhase("reset");
  };
  const reset = async () => {
    setBusy(true);
    setErr("");
    const d = await api("POST", "/auth/reset", {
      email,
      code,
      password: pass
    });
    setBusy(false);
    if (!d || d.error) {
      setErr(d?.error || "Can't reach the server");
      return;
    }
    setPhase("done");
  };
  return _h(AuthShell, {
    onBack: onBack
  }, phase === "email" && _h(_F, null, _h("div", {
    className: "sora",
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: C.text,
      marginBottom: 4
    }
  }, "Reset password"), _h("div", {
    style: {
      fontSize: 12.5,
      color: C.muted,
      fontWeight: 600,
      marginBottom: 18
    }
  }, "Enter your account email to get a reset code."), _h(FInput, {
    label: "Email",
    type: "email",
    value: email,
    onChange: e => {
      setEmail(e.target.value);
      setErr("");
    },
    placeholder: "you@example.com",
    onKeyDown: e => e.key === "Enter" && request()
  }), err && _h("div", {
    style: {
      color: C.danger,
      fontSize: 13,
      fontWeight: 700,
      marginBottom: 12
    }
  }, err), _h(Btn, {
    full: true,
    onClick: request,
    style: {
      opacity: busy ? 0.6 : 1
    }
  }, busy ? "…" : "Send reset code")), phase === "reset" && _h(_F, null, _h("div", {
    className: "sora",
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: C.text,
      marginBottom: 14
    }
  }, "Enter the code"), _h(DevCodeNote, {
    code: devCode,
    label: "reset"
  }), _h(FInput, {
    label: "Reset code",
    value: code,
    inputMode: "numeric",
    maxLength: 6,
    onChange: e => {
      setCode(e.target.value.replace(/\D/g, ""));
      setErr("");
    },
    placeholder: "6-digit code",
    style: {
      textAlign: "center",
      letterSpacing: 6
    }
  }), _h(FInput, {
    label: "New password",
    type: "password",
    value: pass,
    onChange: e => {
      setPass(e.target.value);
      setErr("");
    },
    placeholder: "At least 6 characters",
    onKeyDown: e => e.key === "Enter" && reset()
  }), err && _h("div", {
    style: {
      color: C.danger,
      fontSize: 13,
      fontWeight: 700,
      marginBottom: 12
    }
  }, err), _h(Btn, {
    full: true,
    onClick: reset,
    style: {
      opacity: busy ? 0.6 : 1
    }
  }, busy ? "…" : "Set new password")), phase === "done" && _h(_F, null, _h("div", {
    style: {
      textAlign: "center",
      padding: "10px 0 4px"
    }
  }, _h("div", {
    style: {
      fontSize: 38,
      marginBottom: 10
    }
  }, "\u2705"), _h("div", {
    className: "sora",
    style: {
      fontSize: 20,
      fontWeight: 800,
      color: C.text,
      marginBottom: 6
    }
  }, "Password changed"), _h("div", {
    style: {
      fontSize: 13,
      color: C.muted,
      fontWeight: 600,
      marginBottom: 22
    }
  }, "Sign in with your new password."), _h(Btn, {
    full: true,
    onClick: onDone
  }, "Go to sign in"))));
}
function OnboardingScreen({
  users,
  onComplete
}) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [color, setColor] = useState(USER_COLORS[0]);
  const [goal, setGoal] = useState(null);
  const [exp, setExp] = useState(null);
  const [gym, setGym] = useState("");
  const [err, setErr] = useState("");
  const TOTAL = 8;
  const slides = [{
    icon: "🏋️",
    title: "Log every set in seconds",
    body: "Weights, reps, dropsets, how it felt. The timer runs itself."
  }, {
    icon: "🧍",
    title: "See your body recover",
    body: "A 3D map shows which muscles are ready and which need rest."
  }, {
    icon: "🔥",
    title: "Train with your people",
    body: "See who's training right now, keep streaks, compare lifts."
  }];
  const goals = ["💪 Build muscle", "🏋️ Get stronger", "🔥 Lose fat", "📆 Stay consistent"];
  const exps = ["🌱 Just starting", "💪 1–2 years", "🦾 3+ years"];
  const answers = [];
  if (step > 3 && name) answers.push("I'm " + name);
  if (step > 4 && goal !== null) answers.push(goals[goal]);
  if (step > 5 && exp !== null) answers.push(exps[exp]);
  if (step > 6) answers.push(gym.trim() ? "🏠 " + gym.trim() : "No gym yet");
  const nextFromName = () => {
    const n = name.trim();
    if (!n) {
      setErr("Enter your name");
      return;
    }
    if (users.find(u => u.name.toLowerCase() === n.toLowerCase())) {
      setErr("That name is taken on this device");
      return;
    }
    setErr("");
    setStep(4);
  };
  const finish = wantNotifs => {
    onComplete({
      user: {
        id: uid(),
        name: name.trim(),
        av: name.trim().slice(0, 2),
        pin: null,
        color
      },
      goal: goal !== null ? goals[goal] : null,
      experience: exp !== null ? exps[exp] : null,
      gym: gym.trim() || null,
      wantNotifs
    });
  };
  return _h(AuthShell, {
    wide: true
  }, _h("div", {
    style: {
      display: "flex",
      gap: 5,
      justifyContent: "center",
      marginBottom: 22
    }
  }, Array.from({
    length: TOTAL
  }).map((_, i) => _h("div", {
    key: i,
    style: {
      width: step === i ? 18 : 6,
      height: 6,
      borderRadius: 3,
      background: i <= step ? C.accent : "rgba(255,255,255,0.12)",
      transition: "all 0.25s"
    }
  }))), answers.length > 0 && _h("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 6,
      marginBottom: 16
    }
  }, answers.map((a, i) => _h("div", {
    key: i,
    style: {
      padding: "7px 13px",
      borderRadius: "14px 14px 4px 14px",
      background: "rgba(var(--acr),0.16)",
      border: "1px solid rgba(var(--acr),0.3)",
      fontSize: 12.5,
      fontWeight: 700,
      color: C.text
    }
  }, a))), step < 3 && _h("div", {
    style: {
      textAlign: "center"
    }
  }, _h("div", {
    style: {
      fontSize: 52,
      marginBottom: 14
    }
  }, slides[step].icon), _h("div", {
    className: "sora",
    style: {
      fontSize: 23,
      fontWeight: 800,
      color: C.text,
      marginBottom: 8
    }
  }, slides[step].title), _h("div", {
    style: {
      fontSize: 13.5,
      color: C.muted,
      fontWeight: 600,
      lineHeight: 1.6,
      marginBottom: 26
    }
  }, slides[step].body), _h(Btn, {
    full: true,
    onClick: () => setStep(step + 1)
  }, step < 2 ? "Next" : "Let's set you up"), step < 2 && _h("div", {
    className: "press",
    onClick: () => setStep(3),
    style: {
      textAlign: "center",
      padding: "11px",
      fontSize: 12.5,
      fontWeight: 700,
      color: C.faint,
      marginTop: 6
    }
  }, "Skip intro")), step === 3 && _h(_F, null, _h("div", {
    className: "sora",
    style: {
      fontSize: 21,
      fontWeight: 800,
      color: C.text,
      marginBottom: 14
    }
  }, "What should we call you?"), _h(FInput, {
    label: "Name",
    value: name,
    autoFocus: true,
    onChange: e => {
      setName(e.target.value);
      setErr("");
    },
    placeholder: "e.g. Alex",
    onKeyDown: e => e.key === "Enter" && nextFromName()
  }), _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.muted,
      letterSpacing: 0.8,
      textTransform: "uppercase",
      marginBottom: 8
    }
  }, "Your colour"), _h("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      marginBottom: 18
    }
  }, USER_COLORS.map(col => _h("div", {
    key: col,
    className: "press",
    onClick: () => setColor(col),
    style: {
      width: 32,
      height: 32,
      borderRadius: 11,
      background: col,
      border: "2.5px solid " + (color === col ? "#F4ECDD" : "transparent"),
      flexShrink: 0
    }
  }))), _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.muted,
      letterSpacing: 0.8,
      textTransform: "uppercase",
      marginBottom: 8
    }
  }, "Units"), _h("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 18
    }
  }, _h(Chip, {
    active: true
  }, "kg"), _h(Chip, {
    active: false,
    style: {
      opacity: 0.55
    }
  }, "lb \u2014 coming soon")), err && _h("div", {
    style: {
      color: C.danger,
      fontSize: 13,
      fontWeight: 700,
      marginBottom: 12
    }
  }, err), _h(Btn, {
    full: true,
    onClick: nextFromName
  }, "Continue")), step === 4 && _h(_F, null, _h("div", {
    className: "sora",
    style: {
      fontSize: 21,
      fontWeight: 800,
      color: C.text,
      marginBottom: 14
    }
  }, "What's the goal?"), goals.map((g, i) => _h("div", {
    key: g,
    className: "press",
    onClick: () => {
      setGoal(i);
      setStep(5);
    },
    style: {
      padding: "14px 16px",
      borderRadius: 14,
      background: goal === i ? C.accentBg : C.surface,
      border: "1.5px solid " + (goal === i ? C.accent + "66" : C.border),
      marginBottom: 9,
      fontSize: 14,
      fontWeight: 800,
      color: C.text
    }
  }, g))), step === 5 && _h(_F, null, _h("div", {
    className: "sora",
    style: {
      fontSize: 21,
      fontWeight: 800,
      color: C.text,
      marginBottom: 14
    }
  }, "How long have you trained?"), exps.map((g, i) => _h("div", {
    key: g,
    className: "press",
    onClick: () => {
      setExp(i);
      setStep(6);
    },
    style: {
      padding: "14px 16px",
      borderRadius: 14,
      background: exp === i ? C.accentBg : C.surface,
      border: "1.5px solid " + (exp === i ? C.accent + "66" : C.border),
      marginBottom: 9,
      fontSize: 14,
      fontWeight: 800,
      color: C.text
    }
  }, g))), step === 6 && _h(_F, null, _h("div", {
    className: "sora",
    style: {
      fontSize: 21,
      fontWeight: 800,
      color: C.text,
      marginBottom: 6
    }
  }, "Where do you train?"), _h("div", {
    style: {
      fontSize: 12.5,
      color: C.muted,
      fontWeight: 600,
      marginBottom: 16
    }
  }, "Weights are remembered per gym \u2014 machines feel different in each place."), _h(FInput, {
    label: "Gym name (optional)",
    value: gym,
    onChange: e => setGym(e.target.value),
    placeholder: "e.g. Pulse Fitness",
    onKeyDown: e => e.key === "Enter" && setStep(7)
  }), _h(Btn, {
    full: true,
    onClick: () => setStep(7),
    style: {
      marginBottom: 8
    }
  }, "Continue"), _h("div", {
    className: "press",
    onClick: () => {
      setGym("");
      setStep(7);
    },
    style: {
      textAlign: "center",
      padding: "10px",
      fontSize: 12.5,
      fontWeight: 700,
      color: C.faint
    }
  }, "Skip for now")), step === 7 && _h(_F, null, _h("div", {
    style: {
      textAlign: "center"
    }
  }, _h("div", {
    style: {
      fontSize: 46,
      marginBottom: 12
    }
  }, "\uD83D\uDD14"), _h("div", {
    className: "sora",
    style: {
      fontSize: 21,
      fontWeight: 800,
      color: C.text,
      marginBottom: 8
    }
  }, "One last thing"), _h("div", {
    style: {
      fontSize: 13,
      color: C.muted,
      fontWeight: 600,
      lineHeight: 1.6,
      marginBottom: 24
    }
  }, "Notifications power the rest timer, streak reminders and friend-training pings. No spam, ever."), _h(Btn, {
    full: true,
    onClick: () => finish(true),
    style: {
      marginBottom: 8
    }
  }, "Enable notifications"), _h("div", {
    className: "press",
    onClick: () => finish(false),
    style: {
      textAlign: "center",
      padding: "11px",
      fontSize: 13,
      fontWeight: 700,
      color: C.muted
    }
  }, "Maybe later"))));
}
const PAYWALL_PLANS = [{
  id: "y1",
  label: "12 months",
  price: "€19.99",
  perMonth: "€1.67 a month",
  badge: "BEST VALUE"
}, {
  id: "m6",
  label: "6 months",
  price: "€11.99",
  perMonth: "€2.00 a month"
}, {
  id: "m3",
  label: "3 months",
  price: "€6.99",
  perMonth: "€2.33 a month"
}, {
  id: "m1",
  label: "1 month",
  price: "€2.99",
  perMonth: "Cancel any month"
}, {
  id: "life",
  label: "Lifetime",
  price: "€29.99",
  perMonth: "Never pay again",
  badge: "EARLY ADOPTER"
}];
function PaywallScreen({
  account,
  onPurchase,
  goBack,
  busy
}) {
  const [sel, setSel] = useState("y1");
  return _h("div", {
    className: "slide",
    style: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      padding: "0 22px 28px",
      background: "radial-gradient(90% 40% at 50% 0%,#2A2012 0%,#0C0906 58%)"
    }
  }, _h("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "18px 0 0"
    }
  }, _h("div", {
    className: "press",
    onClick: goBack,
    style: {
      color: C.muted,
      fontSize: 22,
      fontWeight: 800
    }
  }, "\u2039"), _h("span", {
    style: {
      color: C.faint,
      fontSize: 12,
      letterSpacing: 2
    }
  }, "\u2022\u2022\u2022")), _h("div", {
    style: {
      marginTop: 14
    }
  }, _h("div", {
    className: "sora",
    style: {
      fontSize: 28,
      fontWeight: 800,
      color: C.text,
      lineHeight: 1.15
    }
  }, "Pick your plan"), _h("div", {
    style: {
      fontSize: 12.5,
      color: C.muted,
      fontWeight: 600,
      marginTop: 6
    }
  }, "Every feature, every plan. Your data is never deleted.")), _h("div", {
    style: {
      marginTop: 18
    }
  }, PAYWALL_PLANS.map(p => _h("div", {
    key: p.id,
    className: "press",
    onClick: () => setSel(p.id),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "14px 16px",
      borderRadius: 16,
      marginBottom: 9,
      background: sel === p.id ? "linear-gradient(150deg,rgba(var(--acr),0.16),rgba(var(--acr),0.05))" : C.surface,
      border: "1.5px solid " + (sel === p.id ? "rgba(var(--acr),0.55)" : C.border)
    }
  }, _h("div", {
    style: {
      width: 18,
      height: 18,
      borderRadius: 9,
      border: "2px solid " + (sel === p.id ? C.accent : C.faint),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, sel === p.id && _h("div", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 4,
      background: C.accent
    }
  })), _h("div", {
    style: {
      flex: 1
    }
  }, _h("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, _h("span", {
    style: {
      fontSize: 14.5,
      fontWeight: 800,
      color: C.text
    }
  }, p.label), p.badge && _h("span", {
    style: {
      fontSize: 8.5,
      fontWeight: 800,
      letterSpacing: 0.8,
      padding: "2px 7px",
      borderRadius: 6,
      background: C.accentBg,
      color: C.accentDark
    }
  }, p.badge)), _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted,
      marginTop: 2
    }
  }, p.perMonth)), _h("div", {
    className: "sora",
    style: {
      fontSize: 17,
      fontWeight: 800,
      color: sel === p.id ? C.accent : C.text
    }
  }, p.price)))), _h("div", {
    style: {
      marginTop: 6,
      fontSize: 11,
      fontWeight: 600,
      lineHeight: 1.6,
      color: C.faint,
      textAlign: "center"
    }
  }, "There is no free tier. Without a plan the app locks when your free month ends \u2014 your data stays safe but stays closed."), _h("div", {
    style: {
      flex: 1
    }
  }), _h("div", {
    style: {
      padding: "10px 12px",
      borderRadius: 12,
      background: "rgba(var(--acr),0.07)",
      border: "1px dashed rgba(var(--acr),0.3)",
      fontSize: 10.5,
      fontWeight: 700,
      color: C.accentDark,
      textAlign: "center",
      marginBottom: 12
    }
  }, "DEMO BILLING \u2014 no real payment happens yet. This records the plan and unlocks the app."), _h(Btn, {
    full: true,
    onClick: () => onPurchase(sel),
    style: {
      opacity: busy ? 0.6 : 1
    }
  }, busy ? "…" : "Subscribe · " + (PAYWALL_PLANS.find(p => p.id === sel)?.price || "")), _h("div", {
    className: "press",
    onClick: () => onPurchase(null),
    style: {
      marginTop: 10,
      textAlign: "center",
      fontSize: 12,
      fontWeight: 800,
      color: C.muted
    }
  }, "Restore purchases"));
}
function PurchaseOkScreen({
  account,
  onContinue
}) {
  const sub = account?.subscription;
  const lifetime = !!sub?.lifetime;
  return _h("div", {
    className: "slide",
    style: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "40px 26px",
      background: "radial-gradient(90% 40% at 50% 0%,#2A2012 0%,#0C0906 58%)"
    }
  }, _h("div", {
    style: {
      textAlign: "center",
      marginBottom: 22
    }
  }, _h("div", {
    style: {
      fontSize: 46,
      marginBottom: 10
    }
  }, lifetime ? "🏆" : "✅"), _h("div", {
    className: "sora",
    style: {
      fontSize: 26,
      fontWeight: 800,
      color: C.text,
      lineHeight: 1.15
    }
  }, lifetime ? "You're a founding member." : "You're in.")), _h("div", {
    style: {
      borderRadius: 22,
      padding: 22,
      background: "linear-gradient(150deg,#F8C95E,#F2B33D 55%,#E6822A)",
      boxShadow: "0 16px 34px rgba(230,130,40,0.28)",
      marginBottom: 16
    }
  }, _h("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start"
    }
  }, _h("div", {
    className: "sora",
    style: {
      fontSize: 18,
      fontWeight: 800,
      letterSpacing: -0.5,
      color: "#1A1208"
    }
  }, "IRON", _h("span", {
    style: {
      opacity: 0.65
    }
  }, "LOG")), _h("div", {
    style: {
      fontSize: 9,
      fontWeight: 800,
      letterSpacing: 1.2,
      color: "rgba(26,18,8,0.55)"
    }
  }, lifetime ? "LIFETIME" : "MEMBER")), _h("div", {
    style: {
      marginTop: 22,
      fontSize: 13,
      fontWeight: 800,
      color: "rgba(26,18,8,0.75)"
    }
  }, account?.email), _h("div", {
    style: {
      marginTop: 4,
      fontSize: 11,
      fontWeight: 700,
      color: "rgba(26,18,8,0.55)"
    }
  }, lifetime ? "Forever · no renewals, ever" : (sub?.label || "") + " · renews " + (sub?.until ? new Date(sub.until).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }) : ""))), _h("div", {
    style: {
      padding: "14px 16px",
      borderRadius: 16,
      background: C.surface,
      border: "1px solid " + C.border,
      fontSize: 12.5,
      fontWeight: 600,
      lineHeight: 1.65,
      color: C.mid,
      marginBottom: 22
    }
  }, lifetime ? "You backed this early, and that means a lot. Every feature we ever build is yours — thank you for believing in it. 🖤" : "Thank you for supporting IronLog. Every subscription keeps the app fast, honest and ad-free. 🖤"), _h(Btn, {
    full: true,
    onClick: onContinue
  }, "Let's train \u2192"));
}
function kgStepFor(exName) {
  const n = (exName || "").toLowerCase();
  if (/machine|smith|press machine|leg press|hack|pec deck|hammer strength|lat pulldown|leg extension|leg curl|stack/.test(n)) return 5;
  if (/cable|pushdown|pressdown|pallof|face pull|crossover/.test(n)) return 2.5;
  if (/dumbbell|\bdb\b|goblet/.test(n)) return 2;
  if (/barbell|\bbb\b|bench press|squat|deadlift|row|overhead press|military|shrug|clean|snatch|jerk|good morning|hip thrust/.test(n)) return 2.5;
  if (/pull.?up|chin.?up|dip|weighted|belt/.test(n)) return 1.25;
  return 2.5;
}
function roundKg(kg, exName) {
  const v = Number(kg);
  if (!Number.isFinite(v) || v <= 0) return 0;
  let step = kgStepFor(exName);
  if (/dumbbell|\bdb\b/.test((exName || "").toLowerCase()) && v < 10) step = 1;
  const r = Math.round(v / step) * step;
  return Math.round(r * 100) / 100;
}
function getAPI() {
  try {
    if (typeof window !== "undefined" && window.__IRONLOG_API__) return window.__IRONLOG_API__;
    const {
      protocol,
      host,
      port
    } = window.location;
    if (!host || protocol === "blob:" || host.includes("claude.ai")) return null;
    if (typeof window !== "undefined" && window.Capacitor && (host === "localhost" || host === "")) return null;
    if (port === "5173" || port === "5174") return "http://localhost:3001/api";
    return protocol + "//" + host + "/api";
  } catch {
    return null;
  }
}
const API = getAPI();
let authToken = null;
try {
  authToken = localStorage.getItem("il_auth_token") || null;
} catch (e) {}
function setAuthToken(t) {
  authToken = t;
  try {
    t ? localStorage.setItem("il_auth_token", t) : localStorage.removeItem("il_auth_token");
  } catch (e) {}
}
let adminSecret = null;
function setAdminSecret(p) {
  adminSecret = p;
}
async function api(method, path, body, opts = {}) {
  if (!API) return null;
  try {
    const headers = {
      "Content-Type": "application/json"
    };
    if (authToken) headers["Authorization"] = "Bearer " + authToken;
    if (adminSecret) headers["x-admin-pass"] = adminSecret;
    const res = await fetch(API + path, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      keepalive: !!opts.keepalive
    });
    return res.json();
  } catch {
    return null;
  }
}
function readQueue() {
  try {
    return JSON.parse(localStorage.getItem("il_offline_queue") || "[]");
  } catch (e) {
    return [];
  }
}
function writeQueue(q) {
  try {
    localStorage.setItem("il_offline_queue", JSON.stringify(q));
  } catch (e) {}
  try {
    window.dispatchEvent(new CustomEvent("il-queue-changed", {
      detail: q.length
    }));
  } catch (e) {}
}
async function apiQueued(method, path, body) {
  const d = await api(method, path, body);
  if (d === null && API) {
    const q = readQueue();
    q.push({
      method,
      path,
      body,
      at: Date.now()
    });
    writeQueue(q);
    return {
      queued: true
    };
  }
  return d;
}
async function flushQueue() {
  let q = readQueue();
  while (q.length) {
    const item = q[0];
    const d = await api(item.method, item.path, item.body);
    if (d === null) break;
    q = q.slice(1);
    writeQueue(q);
  }
  return q.length;
}
const CHROMELESS = ["splash", "login", "workout", "postWorkout", "previewTrialEnding", "previewLocked", "locked", "paywall", "purchok", "trialending", "welcome", "signup", "signin", "verify", "forgot", "onb"];
export default function App() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(INIT_USERS);
  const [collections, setCollections] = useState(INIT_COLLECTIONS);
  const [messages, setMessages] = useState(INIT_MSGS);
  const [history, setHistory] = useState(INIT_HISTORY);
  const [weights, setWeights] = useState(INIT_WEIGHTS);
  const [checkins, setCheckins] = useState({});
  const [screen, setScreen] = useState("splash");
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [postData, setPostData] = useState(null);
  const [mailDetail, setMailDetail] = useState(null);
  const [composeTo, setComposeTo] = useState("");
  const [allExercises, setAllExercises] = useState(BASE_EXERCISES);
  const [serverConnected, setServerConnected] = useState(false);
  const [loading, setLoading] = useState(!!API);
  const [gymsMap, setGymsMap] = useState({});
  const [serverSessions, setServerSessions] = useState({});
  const [activeGym, setActiveGym] = useState("");
  const persistTimer = useRef();
  const [accent, setAccentState] = useState(() => {
    try {
      return localStorage.getItem("il_accent") || "amber";
    } catch (e) {
      return "amber";
    }
  });
  useEffect(() => {
    try {
      document.documentElement.setAttribute("data-accent", accent);
      localStorage.setItem("il_accent", accent);
    } catch (e) {}
  }, [accent]);
  const setAccent = id => setAccentState(id);
  const [account, setAccount] = useState(null);
  const [authFlow, setAuthFlow] = useState({});
  const trialNudgedRef = useRef(false);
  const [prefsMap, setPrefsMap] = useState({});
  const [offline, setOffline] = useState(() => {
    try {
      return !navigator.onLine;
    } catch (e) {
      return false;
    }
  });
  const [queueCount, setQueueCount] = useState(() => readQueue().length);
  useEffect(() => {
    const onQ = e => setQueueCount(e.detail);
    const onUp = () => {
      setOffline(false);
      flushQueue();
    };
    const onDown = () => setOffline(true);
    window.addEventListener("il-queue-changed", onQ);
    window.addEventListener("online", onUp);
    window.addEventListener("offline", onDown);
    return () => {
      window.removeEventListener("il-queue-changed", onQ);
      window.removeEventListener("online", onUp);
      window.removeEventListener("offline", onDown);
    };
  }, []);
  useEffect(() => {
    if (!API) {
      setLoading(false);
      return;
    }
    api("GET", "/data").then(data => {
      if (data) {
        setServerConnected(true);
        setUsers(data.users || INIT_USERS);
        setCollections(data.collections || INIT_COLLECTIONS);
        setHistory(data.history || INIT_HISTORY);
        setWeights(data.weights || INIT_WEIGHTS);
        setCheckins(data.checkins || {});
        setMessages(data.messages || INIT_MSGS);
        setGymsMap(data.gyms || {});
        setServerSessions(data.activeSessions || {});
        setSubsMap(data.subscriptions || {});
        setPrefsMap(data.prefs || {});
        knownMsgIds.current = new Set((data.messages || []).map(m => m.id));
        if (readQueue().length) flushQueue();
        console.log("✅ Connected to IronLog server");
      } else {
        console.warn("⚠️ Server not found — running in local mode");
      }
      setLoading(false);
    });
    if (authToken) {
      api("GET", "/auth/me").then(d => {
        if (d && d.ok) setAccount(d.account);else if (d && d.error) setAuthToken(null);
      });
    }
  }, []);
  const [toasts, setToasts] = useState([]);
  const pushToast = (icon, title, body, onTap) => {
    const id = uid();
    setToasts(p => [...p.slice(-2), {
      id,
      icon,
      title,
      body,
      onTap
    }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 6000);
  };
  const [subsMap, setSubsMap] = useState({});
  const mySubs = user ? subsMap[user.id] || [] : [];
  const toggleSub = async targetId => {
    if (!user) return;
    const cur = subsMap[user.id] || [];
    const next = cur.includes(targetId) ? cur.filter(x => x !== targetId) : [...cur, targetId];
    setSubsMap(p => ({
      ...p,
      [user.id]: next
    }));
    await api("POST", "/subscriptions", {
      userId: user.id,
      subs: next
    });
  };
  const knownMsgIds = useRef(new Set());
  const prevActiveIds = useRef(new Set());
  const userRef = useRef(null);
  userRef.current = user;
  const subsRef = useRef([]);
  subsRef.current = mySubs;
  const usersRef = useRef([]);
  usersRef.current = users;
  useEffect(() => {
    if (!API) return;
    const poll = async () => {
      if (document.hidden) return;
      const data = await api("GET", "/poll");
      if (!data) {
        setOffline(true);
        return;
      }
      setOffline(false);
      if (readQueue().length) flushQueue();
      const me = userRef.current;
      setMessages(data.messages || []);
      if (me) {
        const fresh = (data.messages || []).filter(m => !knownMsgIds.current.has(m.id) && m.to === me.id && m.from !== me.id);
        if (fresh.length) {
          const senders = usersRef.current;
          fresh.forEach(m => {
            const from = senders.find(u => u.id === m.from);
            pushToast("✉️", "Message from " + (from ? from.name : "?"), m.subject || m.body?.slice(0, 60) || "", () => go("mail"));
            notify("✉️ " + (from ? from.name : "New message"), m.subject || "", "msg-" + m.id);
          });
          playPop(2);
        }
      }
      (data.messages || []).forEach(m => knownMsgIds.current.add(m.id));
      const sessions = data.activeSessions || {};
      setServerSessions(sessions);
      setUsers(data.users || []);
      setSubsMap(data.subscriptions || {});
      const activeIds = new Set(Object.keys(sessions).filter(id => sessions[id] && sessions[id].workout));
      if (me) {
        activeIds.forEach(id => {
          if (id !== me.id && !prevActiveIds.current.has(id) && subsRef.current.includes(id)) {
            const u = usersRef.current.find(x => x.id === id);
            const s = sessions[id];
            pushToast("🏋️", (u ? u.name : "Someone") + " started training", (s.workout?.name || "") + (s.gym ? " · " + s.gym : ""));
            notify("🏋️ " + (u ? u.name : "Someone") + " is training", (s.workout?.name || "") + (s.gym ? " @ " + s.gym : ""), "train-" + id);
            playPop(1);
          }
        });
      }
      prevActiveIds.current = activeIds;
    };
    const iv = setInterval(poll, 15000);
    const onVis = () => {
      if (!document.hidden) poll();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearInterval(iv);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);
  const [screenHistory, setScreenHistory] = useState([]);
  const [globalVideoEx, setGlobalVideoEx] = useState(null);
  const [globalEditing, setGlobalEditing] = useState(null);
  const go = s => {
    setScreenHistory(prev => [...prev, screen]);
    setScreen(s);
  };
  const goBack = () => {
    setScreenHistory(prev => {
      const hist = [...prev];
      const last = hist.pop();
      if (last) setScreen(last);
      return hist;
    });
  };
  const [minimizedWorkout, setMinimizedWorkout] = useState(null);
  const measureVw = () => {
    if (typeof window === "undefined") return 1280;
    return window.innerWidth || document.documentElement?.clientWidth || 1280;
  };
  const [ui4, setUi4Raw] = useState({
    vw: measureVw()
  });
  const setUi4 = patch => setUi4Raw(p => ({
    ...p,
    ...patch
  }));
  useEffect(() => {
    const onR = () => setUi4Raw(p => {
      const w = measureVw();
      return w === p.vw ? p : {
        ...p,
        vw: w
      };
    });
    window.addEventListener("resize", onR);
    const iv = setInterval(() => setUi4Raw(p => ({
      ...p,
      tick: Date.now(),
      vw: measureVw()
    })), 30000);
    const vis = () => onR();
    document.addEventListener("visibilitychange", vis);
    return () => {
      window.removeEventListener("resize", onR);
      document.removeEventListener("visibilitychange", vis);
      clearInterval(iv);
    };
  }, []);
  const dismissToast = id => setToasts(p => p.filter(t => t.id !== id));
  const flash4 = msg => {
    setUi4({
      flashMsg: msg
    });
    setTimeout(() => setUi4Raw(p => p.flashMsg === msg ? {
      ...p,
      flashMsg: ""
    } : p), 1600);
  };
  const myHistory = user ? history[user.id] || [] : [];
  const myWeights = user ? weights[user.id] || [] : [];
  const myMessages = user ? messages.filter(m => m.to === user.id) : [];
  const myGyms = user ? gymsMap[user.id] || [] : [];
  const unread = myMessages.filter(m => !m.read).length;
  const learnExercise = name => {
    const t = name.trim();
    if (t && !allExercises.includes(t)) setAllExercises(p => [t, ...p]);
  };
  const selectGym = name => {
    setActiveGym(name);
    try {
      if (user) localStorage.setItem("ironlog_gym_" + user.id, name || "");
    } catch (e) {}
  };
  const login = u => {
    setUser(u);
    askNotifyPermission();
    getAudioCtx();
    const p = prefsMap[u.id] || {};
    setNotifPrefs(p.notifs || {});
    if (p.photo) {
      try {
        localStorage.setItem("il_photo_" + u.id, p.photo);
        window.dispatchEvent(new CustomEvent("il-photo-updated", {
          detail: u.id
        }));
      } catch (e) {}
    }
    const sess = serverSessions[u.id];
    if (sess && sess.workout) setMinimizedWorkout(sess);
    let g = "";
    try {
      g = localStorage.getItem("ironlog_gym_" + u.id) || "";
    } catch (e) {}
    if (!g) g = (gymsMap[u.id] || [])[0] || "";
    setActiveGym(g);
    go("home");
  };
  const logout = () => {
    if (account && user && account.userId === user.id) {
      api("POST", "/auth/signout");
      setAuthToken(null);
      setAccount(null);
    }
    setUser(null);
    setMinimizedWorkout(null);
    go("login");
  };
  const handleAuthDone = (d, mode) => {
    setAuthToken(d.token);
    setAccount(d.account);
    if (d.deleteCancelled) pushToast("💚", "Deletion cancelled", "Welcome back — your account is staying.");
    if (d.referralApplied) pushToast("🎁", "Referral applied", "A free month was added for you and your friend.");
    if (mode === "signup") {
      setAuthFlow({
        email: d.account.email,
        devVerifyCode: d.devVerifyCode
      });
      go("verify");
      return;
    }
    enterAccount(d.account);
  };
  const enterAccount = acc => {
    if (acc.locked) {
      go("locked");
      return;
    }
    if (!acc.userId) {
      go("onb");
      return;
    }
    const u = users.find(x => x.id === acc.userId);
    if (u) login(u);else go("onb");
  };
  const completeOnboarding = async ({
    user: newUser,
    goal,
    experience,
    gym,
    wantNotifs
  }) => {
    const d = await api("POST", "/auth/link-user", {
      user: newUser
    });
    if (!d || d.error) {
      pushToast("⚠️", "Couldn't create the profile", d?.error || "Server unreachable");
      return;
    }
    setAccount(d.account);
    setUsers(p => [...p, newUser]);
    setHistory(p => ({
      ...p,
      [newUser.id]: []
    }));
    setWeights(p => ({
      ...p,
      [newUser.id]: []
    }));
    if (goal || experience) api("POST", "/prefs", {
      userId: newUser.id,
      prefs: {
        goal,
        experience
      }
    });
    if (gym) {
      setGymsMap(p => ({
        ...p,
        [newUser.id]: [gym]
      }));
      api("POST", "/gyms", {
        userId: newUser.id,
        gyms: [gym]
      });
    }
    if (wantNotifs) askNotifyPermission();
    setUser(newUser);
    setActiveGym(gym || "");
    getAudioCtx();
    go("home");
  };
  const accountSignOut = async () => {
    await api("POST", "/auth/signout");
    setAuthToken(null);
    setAccount(null);
    logout();
  };
  const savePrefs = (userId, patch) => {
    setPrefsMap(p => ({
      ...p,
      [userId]: {
        ...(p[userId] || {}),
        ...patch
      }
    }));
    api("POST", "/prefs", {
      userId,
      prefs: patch
    });
  };
  const saveNotifPrefs = next => {
    setNotifPrefs(next);
    if (user) savePrefs(user.id, {
      notifs: next
    });
  };
  const handlePhotoFileApp = file => {
    if (!file || !user) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new window.Image();
      img.onload = () => {
        const size = 240;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        const scale = Math.max(size / img.width, size / img.height);
        const w = img.width * scale,
          h = img.height * scale;
        ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        savePhoto(user.id, dataUrl);
        savePrefs(user.id, {
          photo: dataUrl
        });
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };
  const purchasePlan = async planId => {
    if (!planId) {
      const d = await api("GET", "/auth/me");
      if (d && d.ok) {
        setAccount(d.account);
        if (d.account.subscriptionActive) {
          pushToast("✅", "Purchases restored", "Your plan is active.");
          go(user ? "home" : "onb");
        } else pushToast("🔍", "Nothing to restore", "No active plan found for this account.");
      }
      return;
    }
    const d = await api("POST", "/billing/purchase", {
      plan: planId
    });
    if (!d || d.error) {
      pushToast("⚠️", "Purchase failed", d?.error || "Server unreachable");
      return;
    }
    setAccount(d.account);
    go("purchok");
  };
  useEffect(() => {
    if (account?.locked && !["locked", "paywall", "purchok"].includes(screen)) go("locked");
  }, [account, screen]);
  useEffect(() => {
    if (!account || !user || trialNudgedRef.current) return;
    if (!account.subscriptionActive && !account.locked && account.trialDaysLeft <= 3) {
      trialNudgedRef.current = true;
      notify("⏳ " + account.trialDaysLeft + " day" + (account.trialDaysLeft === 1 ? "" : "s") + " of free left", "IronLog locks on " + new Date(account.trialEndsAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long"
      }) + " — subscribe to keep logging.", "trial");
      go("trialending");
    }
  }, [account, user]);
  const autoEnteredRef = useRef(false);
  useEffect(() => {
    if (autoEnteredRef.current || !account || user || loading) return;
    if (screen !== "login") return;
    autoEnteredRef.current = true;
    enterAccount(account);
  }, [account, users, loading, screen]);
  const persistGyms = async list => {
    setGymsMap(p => ({
      ...p,
      [user.id]: list
    }));
    await api("POST", "/gyms", {
      userId: user.id,
      gyms: list
    });
  };
  const addGym = name => {
    const n = (name || "").trim();
    if (!n) return;
    const list = [...(gymsMap[user.id] || [])];
    if (list.some(g => g.toLowerCase() === n.toLowerCase())) {
      selectGym(list.find(g => g.toLowerCase() === n.toLowerCase()));
      return;
    }
    list.push(n);
    persistGyms(list);
    selectGym(n);
  };
  const renameGym = (oldN, newN) => {
    const n = (newN || "").trim();
    if (!n) return;
    const list = (gymsMap[user.id] || []).map(g => g === oldN ? n : g);
    persistGyms(list);
    if (activeGym === oldN) selectGym(n);
  };
  const deleteGym = name => {
    const list = (gymsMap[user.id] || []).filter(g => g !== name);
    persistGyms(list);
    if (activeGym === name) selectGym(list[0] || "");
  };
  const persistActive = (snap, immediate) => {
    if (!user) return;
    const post = () => api("POST", "/active", {
      userId: user.id,
      session: snap
    }, {
      keepalive: !!immediate
    });
    clearTimeout(persistTimer.current);
    if (immediate) post();else persistTimer.current = setTimeout(post, 700);
  };
  const clearActive = () => {
    clearTimeout(persistTimer.current);
    if (user) {
      setServerSessions(p => {
        const n = {
          ...p
        };
        delete n[user.id];
        return n;
      });
      api("DELETE", "/active/" + user.id + "?endedAt=" + Date.now());
    }
  };
  const addUser = async u => {
    setUsers(prev => [...prev, u]);
    await api("POST", "/users", u);
  };
  const deleteUser = async id => {
    setUsers(prev => prev.filter(u => u.id !== id));
    setHistory(prev => {
      const n = {
        ...prev
      };
      delete n[id];
      return n;
    });
    setWeights(prev => {
      const n = {
        ...prev
      };
      delete n[id];
      return n;
    });
    setMessages(prev => prev.filter(m => m.from !== id && m.to !== id));
    setCollections(prev => prev.filter(c => c.owner !== id));
    if (user && id === user.id) {
      setUser(null);
      go("login");
    }
    await api("DELETE", "/users/" + id);
  };
  const [pendingWorkout, setPendingWorkout] = useState(null);
  const startWorkout = (workout, collection) => {
    setPendingWorkout({
      workout,
      collection
    });
  };
  const minimizeWorkout = workoutState => {
    setMinimizedWorkout(workoutState);
    persistActive(workoutState, true);
    go("home");
  };
  const resumeWorkout = () => {
    if (!minimizedWorkout) return;
    if (!activeWorkout && minimizedWorkout.workout) {
      setActiveWorkout({
        workout: minimizedWorkout.workout,
        collection: minimizedWorkout.collection
      });
    }
    if (minimizedWorkout.gym != null) selectGym(minimizedWorkout.gym);
    go("workout");
  };
  const abandonWorkout = () => {
    setMinimizedWorkout(null);
    setActiveWorkout(null);
    clearActive();
  };
  const confirmStartWorkout = () => {
    if (!pendingWorkout) return;
    setActiveWorkout(pendingWorkout);
    setMinimizedWorkout(null);
    setPendingWorkout(null);
    go("workout");
  };
  const finishWorkout = async (sets, dur, vol, gym) => {
    if (!sets || sets.length === 0) {
      abandonWorkout();
      go("home");
      return;
    }
    sets.forEach(s => learnExercise(s.ex));
    const entry = {
      id: uid(),
      ts: Date.now(),
      date: new Date().toISOString().slice(0, 10),
      workoutName: activeWorkout.workout.name,
      collectionName: activeWorkout.collection?.name || "",
      dur,
      vol,
      gym: gym || activeGym || null,
      sets,
      sessionNote: ""
    };
    setHistory(prev => ({
      ...prev,
      [user.id]: [entry, ...(prev[user.id] || [])]
    }));
    setPostData({
      entry
    });
    setActiveWorkout(null);
    setMinimizedWorkout(null);
    clearActive();
    go("postWorkout");
    const res = await apiQueued("POST", "/history", {
      userId: user.id,
      entry
    });
    if (res?.queued) pushToast("📴", "Saved offline", "This session is queued and will sync when the server is back.");
  };
  const saveSessionNote = async (entryId, note) => {
    setHistory(prev => ({
      ...prev,
      [user.id]: (prev[user.id] || []).map(h => h.id === entryId ? {
        ...h,
        sessionNote: note
      } : h)
    }));
    await api("PATCH", "/history/note", {
      userId: user.id,
      entryId,
      note
    });
  };
  const saveCollection = async c => {
    const withOwner = {
      ...c,
      owner: c.owner || user.id
    };
    withOwner.workouts.forEach(w => (w.entries || []).forEach(e => {
      if (e.type === "ss") (e.exercises || []).forEach(x => learnExercise(x.name));else learnExercise(e.name);
    }));
    setCollections(prev => {
      const ex = prev.find(x => x.id === withOwner.id);
      return ex ? prev.map(x => x.id === withOwner.id ? withOwner : x) : [...prev, withOwner];
    });
    await api("POST", "/collections", withOwner);
  };
  const addToAccount = async c => {
    const copy = {
      ...c,
      id: uid(),
      owner: user.id,
      pub: false,
      name: c.name + " (mine)"
    };
    setCollections(prev => [...prev, copy]);
    await api("POST", "/collections", copy);
  };
  const lastWeightLogRef = useRef(0);
  const addCheckin = async (muscle, level) => {
    if (!user) return;
    const entry = {
      ts: Date.now(),
      muscle,
      level
    };
    setCheckins(prev => ({
      ...prev,
      [user.id]: [...(prev[user.id] || []), entry].slice(-200)
    }));
    await apiQueued("POST", "/checkins", {
      userId: user.id,
      entry
    });
  };
  const addWeight = async w => {
    if (Date.now() - lastWeightLogRef.current < 600) return;
    lastWeightLogRef.current = Date.now();
    const e = {
      date: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short"
      }),
      w: parseFloat(w)
    };
    setWeights(prev => ({
      ...prev,
      [user.id]: [...(prev[user.id] || []), e]
    }));
    const res = await apiQueued("POST", "/weights", {
      userId: user.id,
      entry: e
    });
    if (res?.queued) pushToast("📴", "Saved offline", "This weigh-in will sync when the server is back.");
  };
  const deleteWeight = async idx => {
    setWeights(prev => ({
      ...prev,
      [user.id]: (prev[user.id] || []).filter((_, i) => i !== idx)
    }));
    await api("DELETE", "/weights/" + user.id + "/" + idx);
  };
  const sendMsg = async (to, subject, body) => {
    const msg = {
      id: uid(),
      from: user.id,
      to,
      subject,
      body,
      time: new Date().toISOString(),
      read: false
    };
    setMessages(prev => [...prev, msg]);
    await api("POST", "/messages", msg);
  };
  const readMsg = async id => {
    setMessages(prev => prev.map(m => m.id === id ? {
      ...m,
      read: true
    } : m));
    await api("PATCH", "/messages/" + id, {
      read: true
    });
  };
  const adminDeleteCollection = async id => {
    setCollections(p => p.filter(c => c.id !== id));
    await api("DELETE", "/collections/" + id);
  };
  const adminRenameCollection = async (id, name) => {
    const updated = collections.map(c => c.id === id ? {
      ...c,
      name
    } : c);
    setCollections(updated);
    const c = updated.find(x => x.id === id);
    if (c) await api("POST", "/collections", c);
  };
  const adminDeleteWorkout = async (collId, workoutId) => {
    const updated = collections.map(c => c.id === collId ? {
      ...c,
      workouts: c.workouts.filter(w => w.id !== workoutId)
    } : c);
    setCollections(updated);
    const c = updated.find(x => x.id === collId);
    if (c) await api("POST", "/collections", c);
  };
  const adminRenameWorkout = async (collId, workoutId, name) => {
    const updated = collections.map(c => c.id === collId ? {
      ...c,
      workouts: c.workouts.map(w => w.id === workoutId ? {
        ...w,
        name
      } : w)
    } : c);
    setCollections(updated);
    const c = updated.find(x => x.id === collId);
    if (c) await api("POST", "/collections", c);
  };
  const adminDeleteHistoryEntry = async (userId, entryId) => {
    setHistory(prev => ({
      ...prev,
      [userId]: (prev[userId] || []).filter(h => h.id !== entryId)
    }));
    await api("DELETE", "/history/" + userId + "/" + entryId);
  };
  const adminDeleteAllHistory = async userId => {
    setHistory(prev => ({
      ...prev,
      [userId]: []
    }));
    await api("DELETE", "/history/" + userId);
  };
  const adminDeleteWeightEntry = async (userId, idx) => {
    setWeights(prev => ({
      ...prev,
      [userId]: (prev[userId] || []).filter((_, i) => i !== idx)
    }));
    await api("DELETE", "/weights/" + userId + "/" + idx);
  };
  const adminDeleteAllWeights = async userId => {
    setWeights(prev => ({
      ...prev,
      [userId]: []
    }));
    await api("DELETE", "/weights/" + userId);
  };
  const adminDeleteMessage = async id => {
    setMessages(prev => prev.filter(m => m.id !== id));
    await api("DELETE", "/messages/" + id);
  };
  const adminDeleteAllMessages = async () => {
    setMessages([]);
    await api("DELETE", "/messages");
  };
  const adminResetAll = async () => {
    const newHistory = {};
    const newWeights = {};
    users.forEach(u => {
      newHistory[u.id] = [];
      newWeights[u.id] = [];
    });
    setHistory(newHistory);
    setWeights(newWeights);
    setMessages([]);
    setCollections([]);
    await api("POST", "/admin/reset");
  };
  const V4_SCREENS = new Set(["home", "muscles", "exercises", "programs", "stats", "workout", "postWorkout", "body", "mail", "settings", "admin", "acct", "billing", "notifprefs", "privacy", "terms", "help", "about", "delacct", "exportdata", "referralpage", "paywall", "trialok", "purchok", "trialending", "locked"]);
  const bodyKg4 = num(myWeights[myWeights.length - 1]?.w);
  const myCheckins4 = user ? checkins[user.id] || [] : [];
  const recMemo = useMemo(() => computeRecovery(myHistory, null, {
    bw: bodyKg4,
    checkins: myCheckins4
  }), [myHistory, bodyKg4, myCheckins4, ui4.tick]);
  const buildV4 = () => {
    const rec = recMemo;
    const ctx = {
      s: screen,
      user,
      users,
      history: myHistory,
      allHistory: history,
      collections,
      weights: myWeights,
      messages: myMessages,
      prefs: user ? prefsMap[user.id] || {} : {},
      account,
      gyms: myGyms,
      activeGym,
      accent,
      unreadCount: unread,
      toasts,
      minimizedWorkout,
      sessions: serverSessions,
      mySubs,
      checkins: myCheckins4,
      bodyKg: bodyKg4,
      rec,
      nowTick: ui4.tick || Date.now(),
      ui: {
        ...ui4,
        favSess: user && prefsMap[user.id]?.favSess || [],
        hiddenSess: user && prefsMap[user.id]?.hiddenSess || [],
        editPicks: !!ui4.editPicks,
        setEditPicks: v => setUi4({
          editPicks: v
        })
      },
      setUi: setUi4,
      go,
      goBack,
      on: {
        selectGym,
        addGym,
        setAccent,
        logout,
        openAdmin: openAdminGate,
        deleteUser,
        resumeWorkout,
        startWorkout,
        toggleSub,
        pushToast,
        dismissToast,
        flash: flash4,
        toggleFav: id => {
          const cur = prefsMap[user.id]?.favSess || [];
          savePrefs(user.id, {
            favSess: cur.includes(id) ? cur.filter(x => x !== id) : [...cur, id]
          });
        },
        hideSess: id => {
          const cur = prefsMap[user.id]?.hiddenSess || [];
          if (!cur.includes(id)) savePrefs(user.id, {
            hiddenSess: [...cur, id]
          });
        },
        restoreSessions: () => savePrefs(user.id, {
          hiddenSess: []
        }),
        pickMuscle: k => {
          setUi4({
            bodySel: k
          });
          go("muscles");
        },
        onEdit: c => setGlobalEditing(c),
        addToAccount,
        onHowTo: name => setGlobalVideoEx({
          name
        })
      }
    };
    const v = buildCore(ctx);
    v._rec = rec;
    try {
      Object.assign(v, buildReady(ctx));
    } catch (e) {
      console.error("bind ready", e);
    }
    try {
      v.programs = buildPrograms(ctx);
    } catch (e) {
      console.error("bind programs", e);
    }
    try {
      v.bodyLab = buildBodyLab(ctx);
    } catch (e) {
      console.error("bind bodyLab", e);
    }
    try {
      v.guide = buildGuide(ctx);
    } catch (e) {
      console.error("bind guide", e);
    }
    try {
      v.stats = buildStats(ctx);
      v.statsDrill = buildStatsDrill(ctx);
      v.statsVolume = buildStatsVolume(ctx);
    } catch (e) {
      console.error("bind stats", e);
    }
    try {
      Object.assign(v, buildSub(ctx));
    } catch (e) {
      console.error("bind sub", e);
    }
    try {
      v.auth = buildAuth(ctx);
    } catch (e) {
      console.error("bind auth", e);
    }
    try {
      v.onb = buildOnb(ctx);
    } catch (e) {
      console.error("bind onb", e);
    }
    try {
      v.login = buildLogin(ctx);
    } catch (e) {
      console.error("bind login", e);
    }
    try {
      Object.assign(v, buildInbox(ctx));
    } catch (e) {
      console.error("bind inbox", e);
    }
    try {
      v.weight = buildWeight(ctx);
    } catch (e) {
      console.error("bind weight", e);
    }
    try {
      v.admin = buildAdmin(ctx);
    } catch (e) {
      console.error("bind admin", e);
    }
    try {
      v.builder = buildBuilder(ctx);
    } catch (e) {
      console.error("bind builder", e);
    }
    try {
      v.ed = buildEd(ctx);
    } catch (e) {
      console.error("bind ed", e);
    }
    return v;
  };
  const render = () => {
    if (user && V4_SCREENS.has(screen)) {
      try {
        const v = buildV4();
        const dc = dcScreenOf(screen);
        return _h(AppShell, {
          v: v
        }, dc === "home" && _h(DHome, {
          v: v
        }), dc === "body" && _h(DBodyLab, {
          v: v
        }), dc === "guide" && _h(DGuide, {
          v: v
        }), dc === "programs" && _h(DPrograms, {
          v: v
        }), dc === "stats" && _h(DStats, {
          v: v
        }), dc === "active" && _h(ActiveWorkout, {
          workout: activeWorkout?.workout,
          collection: activeWorkout?.collection,
          onFinish: finishWorkout,
          allExercises: allExercises,
          history: myHistory,
          onMinimize: minimizeWorkout,
          minimizedState: minimizedWorkout,
          gym: activeGym,
          gyms: myGyms,
          onSelectGym: selectGym,
          onAddGym: addGym,
          onPersist: persistActive,
          bodyKg: num(myWeights[myWeights.length - 1]?.w),
          myCheckins: checkins[user.id] || [],
          onCheckin: addCheckin,
          onHowTo: ex => setGlobalVideoEx({
            name: ex
          }),
          v4: v
        }), dc === "post" && _h(PostWorkout, {
          data: postData,
          go: go,
          goBack: goBack,
          onSaveNote: saveSessionNote,
          userName: user?.name || "",
          v4: {
            ...v,
            _history: myHistory
          }
        }), dc === "weight" && _h(DWeight, {
          v: v
        }), dc === "inbox" && _h(DSocial, {
          v: v
        }), dc === "settings" && _h(DSettingsHub, {
          v: v
        }), dc === "acct" && _h(DAcct, {
          v: v
        }), dc === "billing" && _h(DBilling, {
          v: v
        }), dc === "notifprefs" && _h(DNotifPrefs, {
          v: v
        }), (dc === "privacy" || dc === "terms") && _h(DLegal, {
          v: v
        }), dc === "help" && _h(DHelp, {
          v: v
        }), dc === "about" && _h(DAbout, {
          v: v
        }), dc === "delacct" && _h(DDelAcct, {
          v: v
        }), dc === "export" && _h(DExport, {
          v: v
        }), dc === "referral" && _h(DReferral, {
          v: v
        }), dc === "paywall" && _h(DPaywall, {
          v: v
        }), ["trialok", "purchok", "trialend", "expired"].includes(dc) && _h(DPayMsg, {
          v: v
        }), dc === "admin" && _h(DAdmin, {
          v: v
        }));
      } catch (e) {
        console.error("V4 render failed, falling back", e);
      }
    }
    if (screen === "splash") return _h(Splash, {
      onDone: () => setScreen("login")
    });
    if (screen === "locked") return _h(LockedScreen, {
      history: account?.userId ? history[account.userId] || [] : [],
      goBack: () => {
        if (!account?.locked) go(user ? "home" : "login");
      },
      onClaim: () => go("paywall"),
      onSeePlans: () => go("paywall"),
      onExport: () => {
        if (account?.userId && API) window.open(API + "/export/" + account.userId + "?format=json", "_blank");else pushToast("📤", "Nothing to export", "This account has no profile data yet.");
      },
      onLogout: accountSignOut
    });
    if (screen === "paywall") return _h(PaywallScreen, {
      account: account,
      onPurchase: purchasePlan,
      goBack: () => go(account?.locked ? "locked" : user ? "home" : "welcome")
    });
    if (screen === "purchok") return _h(PurchaseOkScreen, {
      account: account,
      onContinue: () => {
        if (!account?.userId) go("onb");else if (user) go("home");else {
          const u = users.find(x => x.id === account.userId);
          u ? login(u) : go("onb");
        }
      }
    });
    if (screen === "trialending") return _h(TrialEndingCard, {
      history: myHistory,
      daysLeft: account?.trialDaysLeft ?? 3,
      lockDate: account ? new Date(account.trialEndsAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long"
      }) : "",
      goBack: () => go("home"),
      onSubscribe: () => go("paywall"),
      onSeePlans: () => go("paywall")
    });
    if (screen === "welcome") return _h(WelcomeScreen, {
      onSignup: () => go("signup"),
      onSignin: () => go("signin"),
      onPicker: () => go("login")
    });
    if (screen === "signup" || screen === "signin") return _h(AuthFormScreen, {
      mode: screen,
      onDone: d => handleAuthDone(d, screen),
      onSwitch: () => go(screen === "signup" ? "signin" : "signup"),
      onForgot: () => go("forgot"),
      onBack: () => go("welcome"),
      onSsoNote: () => pushToast("🔌", "Not connected yet", "Apple & Google sign-in need real developer accounts — use email for now.")
    });
    if (screen === "verify") return _h(VerifyEmailScreen, {
      email: authFlow.email || account?.email,
      devCode: authFlow.devVerifyCode,
      onVerified: acc => {
        setAccount(acc);
        enterAccount(acc);
      },
      onSkip: () => enterAccount(account),
      onBack: () => go("welcome")
    });
    if (screen === "forgot") return _h(ForgotResetScreen, {
      onDone: () => go("signin"),
      onBack: () => go("signin")
    });
    if (screen === "onb") return _h(OnboardingScreen, {
      users: users,
      onComplete: completeOnboarding
    });
    if (screen === "settings") return _h(SettingsHub, {
      user: user,
      account: account,
      go: go,
      goBack: goBack
    });
    if (screen === "acct") return _h(AccountPage, {
      user: user,
      account: account,
      goBack: goBack,
      onPhotoFile: handlePhotoFileApp,
      onSignOutAccount: accountSignOut,
      setAccount: setAccount,
      pushToast: pushToast,
      onGoVerify: devCode => {
        setAuthFlow({
          email: account?.email,
          devVerifyCode: devCode
        });
        go("verify");
      }
    });
    if (screen === "billing") return _h(BillingPage, {
      account: account,
      goBack: goBack,
      go: go,
      onRestore: () => purchasePlan(null)
    });
    if (screen === "notifprefs") return _h(NotifPrefsPage, {
      prefs: user ? prefsMap[user.id]?.notifs : null,
      onSave: saveNotifPrefs,
      goBack: goBack
    });
    if (screen === "exportdata") return _h(ExportPage, {
      user: user,
      goBack: goBack,
      pushToast: pushToast
    });
    if (screen === "importdata") return _h(ImportPage, {
      user: user,
      history: myHistory,
      goBack: goBack,
      onImported: fresh => {
        setHistory(prev => ({
          ...prev,
          [user.id]: [...fresh, ...(prev[user.id] || [])].sort((a, b) => (b.ts || 0) - (a.ts || 0))
        }));
      }
    });
    if (screen === "referralpage") return _h(ReferralPage, {
      user: user,
      account: account,
      goBack: goBack
    });
    if (screen === "help") return _h(HelpPage, {
      goBack: goBack
    });
    if (screen === "privacy") return _h(LegalPage, {
      kind: "privacy",
      goBack: goBack
    });
    if (screen === "terms") return _h(LegalPage, {
      kind: "terms",
      goBack: goBack
    });
    if (screen === "about") return _h(AboutPage, {
      goBack: goBack
    });
    if (screen === "delacct") return _h(DeleteAccountPage, {
      account: account,
      goBack: goBack,
      go: go,
      setAccount: setAccount,
      pushToast: pushToast
    });
    if (screen === "login" || !user) return _h(Login, {
      users: users,
      onLogin: login,
      onAddUser: addUser,
      onEmailAuth: () => go("welcome")
    });
    if (screen === "home") return _h(Home, {
      user: user,
      account: account,
      history: myHistory,
      collections: collections,
      go: go,
      onStart: startWorkout,
      onLogout: logout,
      onDeleteUser: deleteUser,
      minimizedWorkout: minimizedWorkout,
      onResumeWorkout: resumeWorkout,
      onAbandonWorkout: abandonWorkout,
      onOpenAdmin: openAdminGate,
      gyms: myGyms,
      activeGym: activeGym,
      onSelectGym: selectGym,
      onAddGym: addGym,
      onRenameGym: renameGym,
      onDeleteGym: deleteGym,
      accent: accent,
      onSetAccent: setAccent,
      users: users,
      sessions: serverSessions,
      mySubs: mySubs,
      onToggleSub: toggleSub,
      unread: unread,
      prefs: prefsMap[user.id] || {},
      onSavePrefs: patch => savePrefs(user.id, patch),
      bodyKg: num(myWeights[myWeights.length - 1]?.w),
      myCheckins: checkins[user.id] || []
    });
    if (screen === "programs") return _h(Programs, {
      user: user,
      collections: collections,
      history: myHistory,
      onStart: startWorkout,
      onAddToAccount: addToAccount,
      onSave: saveCollection,
      allExercises: allExercises,
      go: go,
      goBack: goBack,
      onEdit: c => setGlobalEditing(c)
    });
    if (screen === "workout") return _h(ActiveWorkout, {
      workout: activeWorkout?.workout,
      collection: activeWorkout?.collection,
      onFinish: finishWorkout,
      allExercises: allExercises,
      history: myHistory,
      onMinimize: minimizeWorkout,
      minimizedState: minimizedWorkout,
      gym: activeGym,
      gyms: myGyms,
      onSelectGym: selectGym,
      onAddGym: addGym,
      onPersist: persistActive,
      bodyKg: num(myWeights[myWeights.length - 1]?.w),
      myCheckins: checkins[user.id] || [],
      onCheckin: addCheckin,
      onHowTo: ex => setGlobalVideoEx({
        name: ex
      })
    });
    if (screen === "postWorkout") return _h(PostWorkout, {
      data: postData,
      go: go,
      goBack: goBack,
      onSaveNote: saveSessionNote,
      userName: user?.name || ""
    });
    if (screen === "stats") return _h(Stats, {
      history: myHistory,
      allHistory: history,
      users: users,
      go: go,
      goBack: goBack
    });
    if (screen === "fullHistory") return _h(FullHistory, {
      history: myHistory,
      go: go,
      goBack: goBack
    });
    if (screen === "body") return _h(Body, {
      weights: myWeights,
      onAdd: addWeight,
      onDelete: deleteWeight,
      go: go,
      goBack: goBack,
      user: user
    });
    if (screen === "mail") return _h(Mail, {
      user: user,
      users: users,
      messages: myMessages,
      onSelect: m => {
        readMsg(m.id);
        setMailDetail(m);
        go("mailDetail");
      },
      onCompose: toId => {
        setComposeTo(toId || "");
        go("compose");
      },
      go: go,
      goBack: goBack,
      allHistory: history,
      mySubs: mySubs,
      onToggleSub: toggleSub
    });
    if (screen === "mailDetail") return _h(MailDetail, {
      msg: mailDetail,
      users: users,
      go: go,
      goBack: goBack,
      onReply: () => go("compose")
    });
    if (screen === "compose") return _h(Compose, {
      user: user,
      users: users,
      go: go,
      goBack: goBack,
      onSend: sendMsg,
      initialTo: composeTo
    });
    if (screen === "exercises") return _h(Exercises, {
      goBack: goBack,
      onHowTo: ex => setGlobalVideoEx({
        name: ex
      })
    });
    if (screen === "muscles") return _h(MuscleLab, {
      history: myHistory,
      go: go,
      goBack: goBack,
      onHowTo: ex => setGlobalVideoEx({
        name: ex
      }),
      bodyKg: num(myWeights[myWeights.length - 1]?.w),
      myCheckins: checkins[user.id] || []
    });
    if (screen === "previewTrialEnding") return _h(TrialEndingCard, {
      history: myHistory,
      goBack: goBack,
      onSubscribe: () => pushToast("💳", "Payments aren't wired up yet", "This is a design preview."),
      onSeePlans: () => pushToast("💳", "Payments aren't wired up yet", "This is a design preview.")
    });
    if (screen === "previewLocked") return _h(LockedScreen, {
      history: myHistory,
      goBack: goBack,
      onLogout: logout,
      onClaim: () => pushToast("💳", "Payments aren't wired up yet", "This is a design preview."),
      onSeePlans: () => pushToast("💳", "Payments aren't wired up yet", "This is a design preview."),
      onExport: () => pushToast("📤", "Export isn't wired up yet", "Data export is still on the build list.")
    });
    if (screen === "admin") return _h(Admin, {
      users: users,
      collections: collections,
      history: history,
      weights: weights,
      messages: messages,
      go: go,
      goBack: goBack,
      onDeleteUser: deleteUser,
      onDeleteCollection: adminDeleteCollection,
      onRenameCollection: adminRenameCollection,
      onDeleteWorkout: adminDeleteWorkout,
      onRenameWorkout: adminRenameWorkout,
      onDeleteHistoryEntry: adminDeleteHistoryEntry,
      onDeleteAllHistory: adminDeleteAllHistory,
      onDeleteWeightEntry: adminDeleteWeightEntry,
      onDeleteAllWeights: adminDeleteAllWeights,
      onDeleteMessage: adminDeleteMessage,
      onDeleteAllMessages: adminDeleteAllMessages,
      onResetAll: adminResetAll
    });
    return null;
  };
  const serverBadge = !serverConnected && _h("div", {
    style: {
      position: "fixed",
      bottom: 80,
      left: "50%",
      transform: "translateX(-50%)",
      background: "rgba(255,107,107,0.95)",
      color: "white",
      borderRadius: 20,
      padding: "6px 14px",
      fontSize: 11,
      fontWeight: 800,
      zIndex: 9998,
      whiteSpace: "nowrap"
    }
  }, "\u26A0\uFE0F No server \u2014 data won't save");
  const [showAdminGate, setShowAdminGate] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [adminErr, setAdminErr] = useState("");
  const [moreOpen, setMoreOpen] = useState(false);
  const goWithAdminGate = id => {
    go(id);
  };
  const openAdminGate = () => {
    setShowAdminGate(true);
    setAdminPass("");
    setAdminErr("");
  };
  const submitAdminPass = async () => {
    setAdminSecret(adminPass);
    const r = await api("GET", "/admin/check");
    if (r && r.ok) {
      setShowAdminGate(false);
      go("admin");
    } else {
      setAdminSecret(null);
      setAdminErr(r && r.error === "Too many attempts - try again in a minute" ? r.error : "Wrong password");
    }
  };
  const tabs = [{
    id: "home",
    icon: "🏠",
    label: "Home"
  }, {
    id: "programs",
    icon: "📋",
    label: "Programs"
  }, {
    id: "stats",
    icon: "📈",
    label: "Stats"
  }, {
    id: "body",
    icon: "⚖️",
    label: "Weight"
  }, {
    id: "mail",
    icon: "✉️",
    label: "Inbox"
  }, {
    id: "exercises",
    icon: "📚",
    label: "Exercises"
  }];
  return _h("div", {
    className: "app-shell",
    style: {
      fontFamily: "'Manrope',sans-serif"
    }
  }, _h("style", null, G), (offline || queueCount > 0) && _h("div", {
    style: {
      position: "fixed",
      top: 10,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 12000,
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "8px 16px",
      borderRadius: 20,
      background: offline ? "rgba(226,106,79,0.95)" : "rgba(87,192,138,0.95)",
      boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
      fontSize: 12,
      fontWeight: 800,
      color: "#fff",
      whiteSpace: "nowrap"
    }
  }, offline ? _h(_F, null, "\uD83D\uDCF4 Offline \u2014 keep training, it syncs later", queueCount > 0 && _h("span", {
    style: {
      opacity: 0.85
    }
  }, " \xB7 ", queueCount, " queued")) : _h(_F, null, "\uD83D\uDD01 Syncing ", queueCount, " saved item", queueCount > 1 ? "s" : "", "\u2026")), showAdminGate && _h("div", {
    className: "popIn",
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 1000,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 24px"
    }
  }, _h("div", {
    style: {
      width: "100%",
      maxWidth: 380,
      background: C.glassHard,
      borderRadius: 24,
      padding: "28px 24px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.25)"
    }
  }, _h("div", {
    style: {
      textAlign: "center",
      marginBottom: 24
    }
  }, _h("div", {
    style: {
      fontSize: 36,
      marginBottom: 8
    }
  }, "\u2699\uFE0F"), _h("div", {
    style: {
      fontSize: 18,
      fontWeight: 900,
      color: C.text
    }
  }, "Admin Access"), _h("div", {
    style: {
      fontSize: 13,
      color: C.muted,
      marginTop: 4,
      fontWeight: 600
    }
  }, "Enter the admin password to continue")), _h("input", {
    autoFocus: true,
    type: "password",
    value: adminPass,
    onChange: e => {
      setAdminPass(e.target.value);
      setAdminErr("");
    },
    onKeyDown: e => e.key === "Enter" && submitAdminPass(),
    placeholder: "Password",
    style: {
      width: "100%",
      padding: "14px 18px",
      background: "rgba(255,255,255,0.05)",
      border: "1.5px solid " + (adminErr ? C.danger : "rgba(var(--acr),0.22)"),
      borderRadius: 14,
      fontSize: 16,
      color: C.text,
      outline: "none",
      textAlign: "center",
      letterSpacing: 4,
      marginBottom: 8,
      fontFamily: "'Manrope',sans-serif"
    }
  }), adminErr && _h("div", {
    style: {
      color: C.danger,
      fontSize: 13,
      fontWeight: 700,
      textAlign: "center",
      marginBottom: 10
    }
  }, adminErr), _h(Btn, {
    full: true,
    onClick: submitAdminPass,
    style: {
      marginBottom: 10
    }
  }, "Enter Admin"), _h("div", {
    className: "press",
    onClick: () => setShowAdminGate(false),
    style: {
      textAlign: "center",
      padding: "10px",
      fontSize: 13,
      fontWeight: 700,
      color: C.muted
    }
  }, "IDK the password"))), _h(VideoModal, {
    title: globalVideoEx?.name,
    onClose: () => setGlobalVideoEx(null)
  }), globalEditing && _h(CollectionEditor, {
    collection: globalEditing,
    onSave: c => {
      saveCollection(c);
      setGlobalEditing(null);
    },
    onClose: () => setGlobalEditing(null),
    allExercises: allExercises
  }), user && !CHROMELESS.includes(screen) && !V4_SCREENS.has(screen) && _h("aside", {
    className: "sidebar"
  }, _h("div", {
    className: "sidebar-logo"
  }, "IRON", _h("span", null, "LOG")), tabs.map(t => _h("div", {
    key: t.id,
    className: "sidebar-item" + (screen === t.id ? " active" : ""),
    onClick: () => goWithAdminGate(t.id)
  }, _h("span", {
    className: "sidebar-icon"
  }, t.icon), t.label, t.id === "mail" && unread > 0 && _h("span", {
    className: "sidebar-badge"
  }, unread))), _h("div", {
    className: "sidebar-footer"
  }, _h("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      cursor: "pointer",
      marginBottom: 10
    },
    onClick: openAdminGate
  }, _h("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 10,
      background: "rgba(255,255,255,0.06)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 16
    }
  }, "\u2699\uFE0F"), _h("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: C.muted
    }
  }, "Admin")), _h("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      cursor: "pointer"
    },
    onClick: logout
  }, _h(Ava, {
    user: user,
    size: 36
  }), _h("div", null, _h("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: C.text
    }
  }, user.name), _h("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      fontWeight: 600
    }
  }, "Tap to logout"))))), _h("div", {
    className: "main-pane"
  }, _h("div", {
    className: "page-wrap"
  }, _h("div", {
    className: "page-content"
  }, render()))), serverBadge, toasts.length > 0 && _h("div", {
    style: {
      position: "fixed",
      top: "max(14px,env(safe-area-inset-top))",
      left: 14,
      right: 14,
      zIndex: 12000,
      display: "flex",
      flexDirection: "column",
      gap: 8,
      maxWidth: 440,
      margin: "0 auto",
      pointerEvents: "none"
    }
  }, toasts.map(t => _h("div", {
    key: t.id,
    className: "popIn press",
    onClick: () => {
      if (t.onTap) t.onTap();
      setToasts(p => p.filter(x => x.id !== t.id));
    },
    style: {
      pointerEvents: "auto",
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "13px 15px",
      borderRadius: 16,
      background: "#221E18",
      border: "1px solid rgba(var(--acr),0.4)",
      boxShadow: "0 14px 34px rgba(0,0,0,0.5)"
    }
  }, _h("div", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 12,
      background: "rgba(var(--acr),0.16)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 19,
      flexShrink: 0
    }
  }, t.icon), _h("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, _h("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: C.text,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, t.title), t.body && _h("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      fontWeight: 600,
      marginTop: 2,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, t.body)), _h("div", {
    style: {
      color: C.muted,
      fontSize: 14
    }
  }, "\u2715")))), pendingWorkout && _h("div", {
    className: "popIn",
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 1000,
      background: "rgba(0,0,0,0.45)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 24px"
    }
  }, _h("div", {
    style: {
      width: "100%",
      maxWidth: 380,
      background: C.glassHard,
      borderRadius: 24,
      padding: "28px 24px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.2)"
    }
  }, _h("div", {
    style: {
      textAlign: "center",
      marginBottom: 20
    }
  }, _h("div", {
    style: {
      fontSize: 44,
      marginBottom: 10
    }
  }, pendingWorkout.workout.emoji), _h("div", {
    style: {
      fontSize: 20,
      fontWeight: 900,
      color: C.text
    }
  }, pendingWorkout.workout.name), _h("div", {
    style: {
      fontSize: 13,
      color: C.muted,
      marginTop: 4,
      fontWeight: 600
    }
  }, pendingWorkout.collection?.name), _h("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginTop: 8,
      fontWeight: 500
    }
  }, (pendingWorkout.workout.entries || []).reduce((a, e) => a + (e.type === "ss" ? e.exercises.length : 1), 0), " exercises")), _h("div", {
    style: {
      marginBottom: 16
    }
  }, _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.muted,
      letterSpacing: 0.8,
      marginBottom: 8,
      textTransform: "uppercase"
    }
  }, "\uD83D\uDCCD Training at"), _h(GymPicker, {
    gyms: myGyms,
    activeGym: activeGym,
    onSelect: selectGym,
    onAdd: addGym
  }), myGyms.length === 0 && _h("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginTop: 8,
      fontWeight: 600,
      lineHeight: 1.5
    }
  }, "Add the gym you're in so weights are remembered per gym (machines feel different in each place).")), _h(Btn, {
    full: true,
    onClick: confirmStartWorkout,
    style: {
      marginBottom: 10
    }
  }, "\uD83D\uDCAA Let's go!"), _h("div", {
    className: "press",
    onClick: () => setPendingWorkout(null),
    style: {
      textAlign: "center",
      padding: "11px",
      fontSize: 14,
      fontWeight: 700,
      color: C.muted,
      background: "rgba(255,255,255,0.04)",
      borderRadius: 14
    }
  }, "Not now"))), user && !CHROMELESS.includes(screen) && !V4_SCREENS.has(screen) && _h("div", {
    className: "bottom-nav-wrap"
  }, _h(Nav, {
    screen: screen,
    go: goWithAdminGate,
    unread: unread,
    dark: screen !== "home",
    onQuick: () => go("programs"),
    onMore: () => setMoreOpen(true)
  })), moreOpen && _h("div", {
    className: "popIn",
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 900,
      background: "rgba(0,0,0,0.55)",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center"
    },
    onClick: e => {
      if (e.target === e.currentTarget) setMoreOpen(false);
    }
  }, _h("div", {
    style: {
      width: "100%",
      maxWidth: 480,
      background: C.cardAlt,
      borderRadius: "24px 24px 0 0",
      padding: "26px 22px 40px",
      boxShadow: "0 -8px 40px rgba(0,0,0,0.5)",
      border: "1px solid " + C.border
    }
  }, _h("div", {
    style: {
      width: 36,
      height: 4,
      borderRadius: 2,
      background: "rgba(255,255,255,0.15)",
      margin: "0 auto 22px"
    }
  }), _h("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      letterSpacing: 1,
      color: C.muted,
      marginBottom: 12
    }
  }, "\uD83C\uDFA8 ACCENT COLOR"), _h("div", {
    style: {
      marginBottom: 20
    }
  }, _h(AccentPicker, {
    accent: accent,
    onPick: setAccent
  })), [{
    id: "body",
    icon: "⚖️",
    label: "Weight",
    sub: "Track body composition"
  }, {
    id: "mail",
    icon: "✉️",
    label: "Inbox",
    sub: unread > 0 ? unread + " unread" : "Messages",
    badge: unread
  }, {
    id: "exercises",
    icon: "📚",
    label: "Exercises",
    sub: "Guides & how-to"
  }, {
    id: "muscles",
    icon: "🧍",
    label: "Body Lab",
    sub: "Anatomy map & muscle recovery"
  }, {
    id: "settings",
    icon: "⚙️",
    label: "Settings",
    sub: "Account, billing, notifications, export"
  }].map(it => _h("div", {
    key: it.id,
    className: "press",
    onClick: () => {
      setMoreOpen(false);
      go(it.id);
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "14px 16px",
      borderRadius: 16,
      background: C.surface,
      marginBottom: 10
    }
  }, _h("span", {
    style: {
      fontSize: 22
    }
  }, it.icon), _h("div", {
    style: {
      flex: 1
    }
  }, _h("div", {
    style: {
      fontSize: 15,
      fontWeight: 800,
      color: C.text
    }
  }, it.label), _h("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      fontWeight: 600,
      marginTop: 2
    }
  }, it.sub)), it.badge > 0 && _h("span", {
    style: {
      background: C.danger,
      color: "white",
      borderRadius: 8,
      fontSize: 10,
      fontWeight: 900,
      padding: "2px 7px"
    }
  }, it.badge))), _h("div", {
    className: "press",
    onClick: () => {
      setMoreOpen(false);
      openAdminGate();
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "14px 16px",
      borderRadius: 16,
      background: C.surface,
      marginBottom: 10
    }
  }, _h("span", {
    style: {
      fontSize: 22
    }
  }, "\u2699\uFE0F"), _h("div", {
    style: {
      flex: 1
    }
  }, _h("div", {
    style: {
      fontSize: 15,
      fontWeight: 800,
      color: C.text
    }
  }, "Admin"), _h("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      fontWeight: 600,
      marginTop: 2
    }
  }, "Password protected"))), _h("div", {
    className: "press",
    onClick: () => setMoreOpen(false),
    style: {
      textAlign: "center",
      padding: "12px",
      fontSize: 14,
      fontWeight: 800,
      color: C.muted,
      marginTop: 4
    }
  }, "Close"))));
}
