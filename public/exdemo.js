/* IronLog — exercise demo resolver
   Pulls real start/end demo frames + step instructions from the open
   free-exercise-db (yuhonas). Exposes window.ExDemo.getDemo(name) -> Promise.
   Movements the photo DB doesn't cover (levers, planche, flag …) fall back to a
   hand-written phase breakdown so every exercise still shows how it's done. */
(function () {
  var IMG = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/";
  var DB_URL = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json";

  var _db = null, _pending = null;
  function loadDB() {
    if (_db) return Promise.resolve(_db);
    if (_pending) return _pending;
    _pending = fetch(DB_URL).then(function (r) { return r.json(); })
      .then(function (d) { _db = d || []; return _db; })
      .catch(function () { _db = []; return _db; });
    return _pending;
  }

  /* app name -> free-exercise-db entry name.  null = no photo demo on purpose. */
  var MAP = {
    /* --- barbell / machine --- */
    "Bench Press": "Barbell Bench Press - Medium Grip",
    "Incline Bench": "Barbell Incline Bench Press - Medium Grip",
    "Incline DB Press": "Incline Dumbbell Press",
    "Overhead Press": "Standing Military Press",
    "Lateral Raise": "Side Lateral Raise",
    "Tricep Pushdown": "Triceps Pushdown",
    "Deadlift": "Barbell Deadlift",
    "Sumo Deadlift": "Sumo Deadlift",
    "Romanian Deadlift": "Romanian Deadlift",
    "Back Squat": "Barbell Squat",
    "Squat": "Barbell Squat",
    "Goblet Squat": "Goblet Squat",
    "Smith Squat": "Smith Machine Squat",
    "Box Squat": "Box Squat with Bands",
    "Chest Press": "Machine Bench Press",
    "Incline Bench Press": "Barbell Incline Bench Press - Medium Grip",
    "Close-Grip Bench Press": "Close-Grip Barbell Bench Press",
    "Front Squat": "Front Squat (Clean Grip)",
    "Hack Squat": "Hack Squat",
    "Leg Press": "Leg Press",
    "Leg Extension": "Leg Extensions",
    "Lying Leg Curl": "Lying Leg Curls",
    "Barbell Row": "Bent Over Barbell Row",
    "Seated Row": "Seated Cable Rows",
    "Lat Pulldown": "Wide-Grip Lat Pulldown",
    "Face Pull": "Face Pull",
    "Cable Fly": "Cable Crossover",
    "Bicep Curl": "Dumbbell Bicep Curl",
    "Hammer Curl": "Hammer Curls",
    "Preacher Curl": "Preacher Curl",
    "Skull Crusher": "EZ-Bar Skullcrusher",
    "Overhead Tricep Extension": "Cable Rope Overhead Triceps Extension",
    "Hip Thrust": "Barbell Hip Thrust",
    "Standing Calf Raise": "Standing Calf Raises",
    "Seated Calf Raise": "Seated Calf Raise",
    "Shrug": "Barbell Shrug",
    "Good Morning": "Good Morning",
    "Hyperextension": "Hyperextensions (Back Extensions)",
    "Glute Kickback": "Glute Kickback",
    "Adduction Machine": "Thigh Adductor",
    "Wrist Curl": "Palms-Up Barbell Wrist Curl Over A Bench",
    "Ab Wheel Rollout": "Ab Roller",
    "Russian Twist": "Russian Twist",
    "Crunch": "Crunches",
    "Hanging Knee Raise": "Hanging Leg Raise",
    "Nordic Curl": "Natural Glute Ham Raise",
    "Tib Raise": null,
    "Copenhagen Plank": null,
    "Woodchop": null,
    "Lateral Lunges": null,

    /* --- warm-up / conditioning --- */
    "Bodyweight Squats": "Bodyweight Squat",
    "Bodyweight Lunges": "Bodyweight Walking Lunge",
    "Jump Squats": "Freehand Jump Squat",
    "Lateral Bounds": "Lateral Bound",

    /* --- calisthenics --- */
    "Push-Up": "Pushups",
    "Wide Push-Up": "Push-Up Wide",
    "Decline Push-Up": "Push-Ups With Feet Elevated",
    "Incline Push-Up": "Incline Push-Up",
    "Diamond Push-Up": "Push-Ups - Close Triceps Position",
    "Explosive Push-Up": "Plyo Push-up",
    "Single-Arm Push-Up": "Single-Arm Push-Up",
    "Pseudo Planche Push-Up": "Pushups",
    "Pike Push-Up": "Handstand Push-Ups",
    "Handstand Push-Up": "Handstand Push-Ups",
    "Dip": "Dips - Triceps Version",
    "Ring Dip": "Ring Dips",
    "Bench Dip": "Bench Dips",
    "Pull-Up": "Pullups",
    "Chin-Up": "Chin-Up",
    "Wide-Grip Pull-Up": "Pullups",
    "Negative Pull-Up": "Pullups",
    "Scapular Pull-Up": "Pullups",
    "Archer Pull-Up": "Pullups",
    "Commando Pull-Up": "Mixed Grip Chin",
    "Muscle-Up": "Muscle Up",
    "Rope Climb": "Rope Climb",
    "Inverted Row": "Inverted Row",
    "Australian Pull-Up": "Inverted Row",
    "Ring Row": "Inverted Row with Straps",
    "Toes to Bar": "Hanging Leg Raise",
    "Hanging Leg Raise": "Hanging Leg Raise",
    "Dead Hang": null,
    "Pistol Squat": "Kettlebell Pistol Squat",
    "Split Squat": "Split Squats",
    "Walking Lunge": "Bodyweight Walking Lunge",
    "Step-Up": "Step-up with Knee Raise",
    "Box Jump": "Box Jump (Multiple Response)",
    "Broad Jump": "Standing Long Jump",
    "Skater Jump": "Lateral Bound",
    "Glute Bridge": "Butt Lift (Bridge)",
    "Single-Leg Glute Bridge": "Single Leg Glute Bridge",
    "Bear Crawl": "Spider Crawl",
    "Inchworm": "Inchworm",
    "Mountain Climber": "Mountain Climbers",
    "Superman": "Superman",
    "Side Plank": "Side Bridge",
    "Plank": "Plank",
    "Dead Bug": "Dead Bug",
    "Flutter Kick": "Flutter Kicks",
    "Reverse Crunch": "Reverse Crunch",
    "Bicycle Crunch": "Air Bike",
    "V-Up": "Jackknife Sit-Up",
    /* skills with no photo entry — phase breakdown below */
    "Front Lever": null, "Back Lever": null, "L-Sit": null, "Dragon Flag": null,
    "Planche Lean": null, "Tuck Planche": null, "Human Flag": null, "Wall Walk": null,
    "Handstand Hold": null, "Skin the Cat": null, "Hollow Body Hold": null,
    "Hollow Rock": null, "Shrimp Squat": null, "Cossack Squat": null,
    "Wall Sit": null, "Burpee": null,
  };

  /* when the demo shown is a close relative, say so */
  var NOTE = {
    "Bear Crawl": "Demo shows a spider crawl — same hand-and-foot travel; keep your knees an inch off the floor and your hips low.",
    "Pistol Squat": "Demo shows the kettlebell-counterweighted version — the bodyweight pistol is the same path with your arms straight out front.",
    "Commando Pull-Up": "Demo shows a mixed-grip chin — for the commando, grip the bar along its length and pull your head past each side alternately.",
    "Hanging Knee Raise": "Demo shows the straight-leg version — bend your knees to about 90° and drive them to your chest instead.",
    "Toes to Bar": "Demo shows a hanging leg raise — same hang and hollow, but keep going until your toes touch the bar.",
    "V-Up": "Demo shows a jackknife sit-up — identical movement, arms and legs meeting over your hips.",
    "Skater Jump": "Demo shows a lateral bound — same push-off; land soft on one leg and hold a beat before the next jump.",
    "Pseudo Planche Push-Up": "Demo shows a standard push-up — same path, but set your hands at hip level and lean your shoulders past your wrists.",
    "Pike Push-Up": "Demo shows the handstand version — same pressing path with your hips piked and feet on the floor.",
    "Archer Pull-Up": "Demo shows a standard pull-up — go wide and pull to one hand while the other arm stays straight.",
    "Wide-Grip Pull-Up": "Demo shows a standard pull-up — take a grip about 1.5× shoulder width.",
    "Negative Pull-Up": "Demo shows a standard pull-up — jump to the top position, then lower for 5 seconds.",
    "Scapular Pull-Up": "Demo shows a standard pull-up — arms stay straight, only the shoulder blades pull down.",
    "Commando Pull-Up": "Demo shows a mixed-grip chin — straddle the bar and pull your head past it, alternating sides.",
    "Pistol Squat": "Demo shows the loaded version — a light weight held out front is the easiest way to learn it.",
    "Australian Pull-Up": "Same movement as the inverted row — bar at hip height, body straight.",
    "Ring Row": "Demo shows straps; rings work identically.",
    "Toes to Bar": "Demo shows the hanging pike — keep going until your toes touch the bar.",
    "Bear Crawl": "Demo shows a spider crawl — same hands-and-toes travel, knees hovering a fist off the floor.",
    "Dead Hang": "Demo shows a one-handed hang — use both hands, shoulders relaxed but engaged.",
    "Skater Jump": "Same as the lateral bound — land on one leg, stick it, then rebound.",
    "Broad Jump": "Same as the standing long jump — swing the arms, land soft in a squat.",
    "Bicycle Crunch": "Also known as the air bike.",
    "V-Up": "Demo shows the jackknife sit-up — same simultaneous fold of legs and torso.",
    "Hanging Knee Raise": "Demo shows the straight-leg version — bend the knees to make it easier.",
    "Nordic Curl": "Demo shows the glute-ham raise — anchor your heels and lower under control.",
  };

  /* hand-written breakdowns for movements the photo DB doesn't carry */
  var PHASES = {
    "Dead Hang": [
      ["GRIP", "Overhand grip just outside shoulder width, thumbs wrapped around the bar."],
      ["HANG", "Let your body hang long — arms straight, legs together, ankles crossed if you like."],
      ["SHOULDERS", "Stay active: don't shrug into your ears, keep a light pull down through your lats."],
      ["BREATHE", "Relax your jaw and breathe. Hold for time, drop before your grip fails completely."],
    ],
    "Front Lever": [
      ["HANG", "Dead hang, arms straight, shoulder blades pulled down and back."],
      ["TUCK", "Pull the bar toward your hips and tuck both knees to your chest."],
      ["EXTEND", "Open the legs out slowly, ribs down, hips level with your shoulders."],
      ["HOLD", "One straight line, chest and toes at the same height. Breathe, then tuck back in."]],
    "Back Lever": [
      ["INVERT", "From a hang, pull your knees through your arms until you're upside down."],
      ["TUCK", "Lower to a tuck with your back to the floor, arms locked."],
      ["EXTEND", "Open the hips and legs out, squeezing glutes hard."],
      ["HOLD", "Body flat and parallel to the ground, then return the same way."]],
    "L-Sit": [
      ["SET UP", "Hands on parallettes or the floor beside your hips, arms locked."],
      ["PUSH", "Press the floor away — depress the shoulders, hips lift off."],
      ["LIFT", "Draw the knees up, then straighten both legs to horizontal."],
      ["HOLD", "Toes pointed, quads tight, 90° at the hip. Breathe shallow."]],
    "Dragon Flag": [
      ["SET UP", "Lie on a bench, grip behind your head, elbows tucked in."],
      ["ROLL UP", "Kick the legs up until you're stacked on your upper back."],
      ["LOWER", "Lower the whole body as one rigid line — no hinge at the hip."],
      ["STOP", "Stop a few inches off the bench, then reverse. Never let the lower back arch."]],
    "Planche Lean": [
      ["SET UP", "Top of a push-up, hands turned slightly out, level with your hips."],
      ["LEAN", "Shift your shoulders forward past your wrists, arms locked."],
      ["BRACE", "Protract the shoulder blades, posterior tilt the pelvis, squeeze glutes."],
      ["HOLD", "Hold 10–20 s at the deepest lean you can keep straight arms."]],
    "Tuck Planche": [
      ["SET UP", "Parallettes, arms locked, shoulders leaning forward."],
      ["LOAD", "Round the upper back, knees to chest, weight fully on the hands."],
      ["LIFT", "Feet leave the floor — hips rise to shoulder height."],
      ["HOLD", "Knees tucked, back rounded, hold, then set the feet down softly."]],
    "Human Flag": [
      ["GRIP", "Top hand pulls, bottom hand presses — vertical bar, hands about shoulder-width apart."],
      ["LOAD", "Kick the hips up, stack them over the bottom shoulder."],
      ["EXTEND", "Open into a tuck, then straddle, then straight legs as you get stronger."],
      ["HOLD", "Body horizontal, ribs down. Lower with control, don't drop."]],
    "Wall Walk": [
      ["SET UP", "Chest to the floor, feet against the wall."],
      ["WALK UP", "Walk the feet up the wall while the hands walk in toward it."],
      ["TOP", "Nose close to the wall, shoulders stacked over the wrists, ribs down."],
      ["WALK DOWN", "Reverse under control — hands out, feet down, no crashing."]],
    "Handstand Hold": [
      ["SET UP", "Hands shoulder-width, fingers spread, kick-up leg back."],
      ["KICK", "Kick up with a straight arm line, eyes between the hands."],
      ["STACK", "Wrists, shoulders, hips, heels in one line. Squeeze glutes."],
      ["BALANCE", "Correct with your fingertips, not your hips. Bail by cartwheeling out."]],
    "Skin the Cat": [
      ["HANG", "Dead hang from rings or a bar, arms straight."],
      ["TUCK", "Pull the knees to the chest and roll them up through the arms."],
      ["ROLL THROUGH", "Keep rolling until your body is inverted and behind you."],
      ["RETURN", "Extend slowly to the bottom, then pull back through to the hang."]],
    "Hollow Body Hold": [
      ["SET UP", "On your back, arms overhead, legs straight."],
      ["PRESS", "Flatten the lower back into the floor — no gap at all."],
      ["LIFT", "Raise shoulders and heels a few inches, keeping that flat back."],
      ["HOLD", "Long banana shape, breathe through the ribs, 20–40 s."]],
    "Hollow Rock": [
      ["SET UP", "Start in a tight hollow hold, lower back glued to the floor."],
      ["ROCK BACK", "Rock toward your shoulders without breaking the shape."],
      ["ROCK FORWARD", "Rock toward your heels — the whole body moves as one piece."],
      ["RHYTHM", "Drive from the upper back, not the legs. Keep it smooth."]],
    "Shrimp Squat": [
      ["SET UP", "Stand tall, grab one ankle behind you, knee pointing down."],
      ["LOWER", "Sit back and down until the trailing knee taps the floor."],
      ["TAP", "Light tap — torso stays upright, front heel flat."],
      ["DRIVE", "Push through the front heel back to standing without falling forward."]],
    "Cossack Squat": [
      ["SET UP", "Very wide stance, toes slightly out, arms out front."],
      ["SHIFT", "Shift all the weight to one side, that heel stays down."],
      ["BOTTOM", "Deep on the bent leg, other leg straight with toes up."],
      ["SWITCH", "Push back to centre, then flow to the other side."]],
    "Wall Sit": [
      ["SET UP", "Back flat on a wall, feet a stride out, shoulder-width."],
      ["SLIDE", "Slide down until knees and hips are both at 90°."],
      ["BRACE", "Knees over the mid-foot, whole back in contact, hands off the thighs."],
      ["HOLD", "Breathe steadily — 30–60 s. Quads will burn, that's the exercise."]],
    "Burpee": [
      ["DROP", "From standing, hands to the floor and shoot the feet back."],
      ["PUSH-UP", "Chest to the floor, then press back up in one piece."],
      ["JUMP IN", "Hop the feet back under your hips."],
      ["JUMP UP", "Explode into a jump, hands overhead. Land soft, repeat."]],
    "Tib Raise": [
      ["SET UP", "Back against a wall, heels a step or two out in front."],
      ["LIFT", "Pull the toes up toward your shins as far as they go."],
      ["SQUEEZE", "Hold the top for a beat — the shin muscle should cramp up."],
      ["LOWER", "Lower slowly, 3 seconds, keeping tension the whole way."]],
    "Copenhagen Plank": [
      ["SET UP", "Side plank position, top leg on a bench at knee or ankle height."],
      ["LIFT", "Press the top leg down into the bench and lift the hips."],
      ["ALIGN", "Head, hips and bottom foot in one line, bottom leg hovering."],
      ["HOLD", "10–30 s per side. Lower under control, don't collapse."]],
    "Woodchop": [
      ["SET UP", "Cable or band set high, stand side-on, arms straight."],
      ["ROTATE", "Pull across and down toward the opposite hip, pivoting the back foot."],
      ["FINISH", "Arms end outside the knee, hips square to the finish."],
      ["RETURN", "Resist the way back up — the rotation is the exercise, not the arms."]],
    "Lateral Lunges": [
      ["SET UP", "Stand tall, feet together, chest up."],
      ["STEP OUT", "Big step to the side, that foot flat and pointing forward."],
      ["SIT", "Sit back into the stepping hip, other leg straight."],
      ["PUSH BACK", "Drive off the outside foot back to the start."]],
  };

  var DEFAULT_PHASES = [
    ["SET UP", "Brace your core, set your grip and your stance before the first rep."],
    ["LOWER", "Control the eccentric — roughly two seconds, no bouncing."],
    ["BOTTOM", "Full range, short pause, keep the tension on the working muscle."],
    ["DRIVE", "Drive back to the start, exhale, and reset before the next rep."]];

  function byName(db, n) {
    for (var i = 0; i < db.length; i++) if (db[i].name === n) return db[i];
    return null;
  }
  function norm(s) {
    return (s || "").toLowerCase().replace(/[^a-z0-9 ]/g, " ")
      .replace(/\bdb\b/g, "dumbbell").replace(/\bbb\b/g, "barbell")
      .replace(/flyes?/g, "fly").replace(/(crunches|raises|curls|presses|rows|squats|pushups|push ups)/g,
        function (m) { return { crunches: "crunch", raises: "raise", curls: "curl", presses: "press", rows: "row", squats: "squat", pushups: "pushup", "push ups": "pushup" }[m]; })
      .replace(/\s+/g, " ").trim();
  }
  function fuzzy(db, name) {
    var q = norm(name), i, en;
    for (i = 0; i < db.length; i++) if (norm(db[i].name) === q) return db[i];
    for (i = 0; i < db.length; i++) { en = norm(db[i].name); if (en.indexOf(q) >= 0 || q.indexOf(en) >= 0) return db[i]; }
    var skip = { with: 1, from: 1, the: 1, and: 1, for: 1, one: 1, arm: 1, leg: 1, two: 1 };
    var words = q.split(" ").filter(function (w) { return w.length >= 4 && !skip[w]; });
    if (words.length >= 2) {
      for (i = 0; i < db.length; i++) {
        en = norm(db[i].name);
        var hit = words.filter(function (w) { return en.indexOf(w) >= 0; }).length;
        if (hit >= Math.ceil(words.length * 0.75)) return db[i];
      }
    }
    return null;
  }
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ""; }

  function phasesFor(name) {
    var p = PHASES[name] || DEFAULT_PHASES;
    return p.map(function (x, i) { return { n: i + 1, label: x[0], cue: x[1] }; });
  }

  function getDemo(name) {
    return loadDB().then(function (db) {
      var e = null;
      if (Object.prototype.hasOwnProperty.call(MAP, name)) {
        var t = MAP[name];
        if (t) e = byName(db, t);
      } else {
        e = fuzzy(db, name);
      }
      var yt = "https://www.youtube.com/results?search_query=" + encodeURIComponent(name + " exercise form tutorial");
      if (e && e.images && e.images.length) {
        return {
          name: name, mode: "photo", dbName: e.name,
          frames: e.images.slice(0, 2).map(function (f) { return IMG + f; }),
          steps: (e.instructions || []).slice(0, 6),
          primary: (e.primaryMuscles || []).map(cap),
          equipment: cap(e.equipment || ""), level: cap(e.level || ""),
          note: NOTE[name] || "", yt: yt,
          phases: phasesFor(name),
        };
      }
      var ph = phasesFor(name);
      return {
        name: name, mode: "phases", dbName: "",
        frames: [], steps: ph.map(function (p) { return p.label + " — " + p.cue; }),
        primary: [], equipment: "", level: "",
        note: PHASES[name] ? "" : "No photo demo for this one yet — here's the movement broken into phases.",
        yt: yt, phases: ph,
      };
    });
  }

  window.ExDemo = { getDemo: getDemo, IMG: IMG, prefetch: loadDB };
})();
