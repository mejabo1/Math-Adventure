
export interface StorySegment {
  id: string;
  text: string;
  choices: { text: string; nextId: string }[];
  isGameOver?: boolean;
  ending?: {
    id: string;
    title: string;
    description: string;
    type: 'good' | 'bad' | 'neutral' | 'secret';
  };
}

export const SCENARIOS: Record<string, StorySegment> = {
  start: {
    id: "start",
    text: "You slide into your desk just as the bell rings. The teacher is already writing equations on the board. The air smells like dry erase markers and despair. What's your strategy for today?",
    choices: [
      { text: "Take meticulous notes", nextId: "boring_lecture" },
      { text: "Try to sleep with your eyes open", nextId: "teacher_question" },
      { text: "Pass a note to your friend", nextId: "mystery_note" },
      { text: "Check your phone under the desk", nextId: "phone_confiscated" }
    ]
  },
  boring_lecture: {
    id: "boring_lecture",
    text: "You try to focus, but the teacher is explaining coefficients for the twentieth time. The clock seems to be ticking backwards. Your eyelids are heavy.",
    choices: [
      { text: "Doodle an epic battle in the margins", nextId: "window_distraction" },
      { text: "Force yourself to pay attention", nextId: "pop_quiz" },
      { text: "Text your friend under the desk", nextId: "mystery_note" },
      { text: "Ask a question to stay awake", nextId: "teacher_impressed" }
    ]
  },
  teacher_question: {
    id: "teacher_question",
    text: "The teacher spins around and points directly at you. 'You there! What is the value of x if 3x + 2 = 11?' The whole class turns to look.",
    choices: [
      { text: "Answer confidently", nextId: "group_project" },
      { text: "Pretend to cough", nextId: "nurse_office" },
      { text: "Drop your pencil to buy time", nextId: "substitute_teacher" },
      { text: "Guess '42'", nextId: "class_clown" }
    ]
  },
  mystery_note: {
    id: "mystery_note",
    text: "A folded piece of notebook paper lands on your desk. It has 'DO NOT OPEN' written on it in red pen.",
    choices: [
      { text: "Open it immediately", nextId: "detention_slip" },
      { text: "Pass it to the person next to you", nextId: "group_project" },
      { text: "Eat it to destroy the evidence", nextId: "nurse_office" },
      { text: "Put it in your pocket for later", nextId: "locker_discovery" }
    ]
  },
  phone_confiscated: {
    id: "phone_confiscated",
    text: "You feel a shadow loom over you. The teacher holds out a hand. 'Phone. Now.'",
    choices: [
      { text: "Hand it over reluctantly", nextId: "boring_lecture" },
      { text: "Claim it's a calculator", nextId: "detention_slip" },
      { text: "Slide it into your sleeve", nextId: "principal_office" },
      { text: "Beg for mercy", nextId: "detention_slip" }
    ]
  },
  teacher_impressed: {
    id: "teacher_impressed",
    text: "The teacher stops writing. 'That... is actually a very good question.' The class looks at you in shock.",
    choices: [
      { text: "Play it cool", nextId: "group_project" },
      { text: "Ask another one", nextId: "ending_valedictorian" },
      { text: "High five yourself", nextId: "class_clown" },
      { text: "Retire while you're ahead", nextId: "window_distraction" }
    ]
  },
  locker_discovery: {
    id: "locker_discovery",
    text: "Later at your locker, you open the note. It's a map of the school with an 'X' on the library.",
    choices: [
      { text: "Go investigate immediately", nextId: "hall_pass" },
      { text: "Throw it away", nextId: "boring_lecture" },
      { text: "Show your friend", nextId: "group_project" },
      { text: "Assume it's a prank", nextId: "cafeteria_smell" }
    ]
  },
  group_project: {
    id: "group_project",
    text: "You've been assigned a group project. Your partners are the class overachiever and the kid who eats glue. They are arguing about who holds the marker.",
    choices: [
      { text: "Take charge and assign roles", nextId: "presentation_day" },
      { text: "Sit back and let them fight", nextId: "teacher_intervention" },
      { text: "Do the whole project yourself", nextId: "presentation_day" },
      { text: "Build a fort out of poster board", nextId: "detention_slip" }
    ]
  },
  substitute_teacher: {
    id: "substitute_teacher",
    text: "The regular teacher is gone. There's a substitute who looks nervous and is holding the attendance sheet with shaking hands. They mispronounce your name.",
    choices: [
      { text: "Correct them politely", nextId: "boring_lecture" },
      { text: "Claim your name is 'Spartacus'", nextId: "class_clown" },
      { text: "Switch seats with your friend", nextId: "teacher_question" },
      { text: "Start a fake cough epidemic", nextId: "nurse_office" }
    ]
  },
  window_distraction: {
    id: "window_distraction",
    text: "A squirrel is running back and forth on the tree branch outside the window. It's doing acrobatics. Half the class is watching it.",
    choices: [
      { text: "Yell 'Parkour Squirrel!'", nextId: "detention_slip" },
      { text: "Ignore it and focus", nextId: "pop_quiz" },
      { text: "Wait... is that a Quinjet?", nextId: "avengers_arrival" },
      { text: "Draw the squirrel", nextId: "art_class" }
    ]
  },
  art_class: {
    id: "art_class",
    text: "Your drawing is so good the teacher thinks you're tracing. 'Pay attention to math, not art!'",
    choices: [
      { text: "Apologize", nextId: "boring_lecture" },
      { text: "Claim it's geometry", nextId: "teacher_impressed" },
      { text: "Sign it and gift it to them", nextId: "ending_artist" },
      { text: "Eat the drawing", nextId: "nurse_office" }
    ]
  },
  cafeteria_smell: {
    id: "cafeteria_smell",
    text: "A strange smell is wafting in from the hallway. It smells like burnt popcorn and floor wax. It's distracting everyone.",
    choices: [
      { text: "Ask to go check it out", nextId: "hall_pass" },
      { text: "Hold your nose dramatically", nextId: "class_clown" },
      { text: "Wait... is that oatmeal?", nextId: "brimley_entrance" },
      { text: "Faint from the fumes", nextId: "nurse_office" }
    ]
  },

  // --- WILFORD BRIMLEY BRANCH ---
  brimley_entrance: {
    id: "brimley_entrance",
    text: "The door flies open! Wilford Brimley rides in on a horse made of Quaker Oats boxes. 'STOP WHAT YOU'RE DOIN'!' he bellows. 'I need to talk to you about DIABEETUS!'",
    choices: [
      { text: "Scream 'DIABEETUS!' back", nextId: "ending_diabeetus" },
      { text: "Ask about testing supplies", nextId: "medical_supplies" },
      { text: "Offer him some oatmeal", nextId: "oatmeal_challenge" },
      { text: "Hide under your desk", nextId: "detention_slip" }
    ]
  },
  medical_supplies: {
    id: "medical_supplies",
    text: "He pats his pockets frantically. 'I check my blood sugar often. I do it because I want to stay healthy. But I can't calculate the co-pay! If Liberty Medical covers 80% of a $50 monitor, what do I owe?'",
    choices: [
      { text: "$10", nextId: "ending_insurance" },
      { text: "$50", nextId: "brimley_rage" },
      { text: "It's free if you call now", nextId: "ending_insurance" },
      { text: "Check your mustache", nextId: "ending_mustache" }
    ]
  },
  oatmeal_challenge: {
    id: "oatmeal_challenge",
    text: "'It's the right thing to do,' he says, producing a cauldron of steaming oats. 'Eat this wholesome breakfast to prove you aren't afraid of fiber!'",
    choices: [
      { text: "Eat it all", nextId: "ending_oatmeal" },
      { text: "Add a pound of sugar", nextId: "brimley_rage" },
      { text: "Refuse politely", nextId: "detention_slip" },
      { text: "Ask for dinosaur eggs", nextId: "ending_oatmeal" }
    ]
  },
  brimley_rage: {
    id: "brimley_rage",
    text: "Wilford's face turns beet red. 'You're not taking this seriously! High blood sugar is no joke!' He starts throwing testing strips everywhere.",
    choices: [
      { text: "Apologize", nextId: "medical_supplies" },
      { text: "Run for your life", nextId: "hallway_chase" },
      { text: "Catch them all", nextId: "ending_athlete" },
      { text: "Call the nurse", nextId: "nurse_office" }
    ]
  },

  // --- BRIMLEY ENDINGS ---
  ending_diabeetus: {
    id: "ending_diabeetus",
    text: "You and Wilford scream 'DIABEETUS' in perfect harmony. The sheer sonic power shatters the windows. You are now the face of Liberty Medical.",
    choices: [],
    isGameOver: true,
    ending: {
      id: "diabeetus",
      title: "The Spokesperson",
      description: "You checked your blood sugar, and you checked it often.",
      type: "secret"
    }
  },
  ending_insurance: {
    id: "ending_insurance",
    text: "Wilford nods solemnly. 'You're a smart kid. I'm signing you up for a lifetime supply of testing materials.' You are 12, but your retirement is set.",
    choices: [],
    isGameOver: true,
    ending: {
      id: "insurance",
      title: "Liberty Medical Member",
      description: "Call now to receive your free meter.",
      type: "good"
    }
  },
  ending_mustache: {
    id: "ending_mustache",
    text: "You reach into his magnificent mustache and pull out the missing monitor. He sheds a single, oat-based tear. 'You found it.'",
    choices: [],
    isGameOver: true,
    ending: {
      id: "mustache",
      title: "Mustache Explorer",
      description: "It holds many secrets.",
      type: "secret"
    }
  },
  ending_oatmeal: {
    id: "ending_oatmeal",
    text: "You consume the oats. You feel... regular. Extremely regular. Wilford tips his hat and rides into the sunset. Your cholesterol is perfect.",
    choices: [],
    isGameOver: true,
    ending: {
      id: "oatmeal",
      title: "Oatmeal Baron",
      description: "It was the right thing to do.",
      type: "good"
    }
  },
  pop_quiz: {
    id: "pop_quiz",
    text: "SURPRISE QUIZ! The teacher slams a stack of papers on the desk. You didn't study at all.",
    choices: [
      { text: "Panic silently", nextId: "teacher_question" },
      { text: "Guess everything 'C'", nextId: "bad_grade" },
      { text: "Try to peek at your neighbor", nextId: "detention_slip" },
      { text: "Fake a stomach ache", nextId: "nurse_office" }
    ]
  },
  detention_slip: {
    id: "detention_slip",
    text: "The teacher walks over and drops a pink slip on your desk. Detention. For 'disruptive behavior'.",
    choices: [
      { text: "Argue your case", nextId: "principal_office" },
      { text: "Accept your fate", nextId: "ending_detention_regular" },
      { text: "Crumple it up", nextId: "principal_office" },
      { text: "Frame your nemesis", nextId: "mystery_note" }
    ]
  },
  hall_pass: {
    id: "hall_pass",
    text: "You get the wooden block that serves as a hall pass. Freedom! The hallway is empty and quiet.",
    choices: [
      { text: "Walk slowly to the water fountain", nextId: "water_fountain" },
      { text: "Go visit your friend in the other class", nextId: "caught_in_hallway" },
      { text: "Just wander around", nextId: "principal_office" },
      { text: "Investigate the library", nextId: "secret_passage" }
    ]
  },
  water_fountain: {
    id: "water_fountain",
    text: "You lean down to take a sip. The water pressure is surprisingly high and splashes your shirt.",
    choices: [
      { text: "Try to dry it off", nextId: "boring_lecture" },
      { text: "Start a water fight", nextId: "detention_slip" },
      { text: "Claim it's a fashion statement", nextId: "class_clown" },
      { text: "Go to the nurse for a dry shirt", nextId: "nurse_office" }
    ]
  },
  caught_in_hallway: {
    id: "caught_in_hallway",
    text: "You peek into your friend's classroom. Their teacher spots you immediately. 'Do you belong in here?'",
    choices: [
      { text: "Say 'Yes' confidently", nextId: "substitute_teacher" },
      { text: "Run away", nextId: "hallway_chase" },
      { text: "Say you're delivering a message", nextId: "mystery_note" },
      { text: "Freeze like a deer", nextId: "principal_office" }
    ]
  },
  secret_passage: {
    id: "secret_passage",
    text: "You find a loose book in the library. Pulling it reveals... nothing. Just dust. But you feel like a detective.",
    choices: [
      { text: "Go back to class", nextId: "boring_lecture" },
      { text: "Hide in the stacks", nextId: "detention_slip" },
      { text: "Read a comic book", nextId: "hall_pass" },
      { text: "Keep searching for secrets", nextId: "ending_secret_agent" }
    ]
  },
  class_clown: {
    id: "class_clown",
    text: "The whole class is laughing. You've achieved peak comedy. But the teacher doesn't look amused.",
    choices: [
      { text: "Take a bow", nextId: "detention_slip" },
      { text: "Sit down quickly", nextId: "teacher_question" },
      { text: "Blame it on someone else", nextId: "group_project" },
      { text: "Keep the bit going", nextId: "ending_comedian" }
    ]
  },
  teacher_intervention: {
    id: "teacher_intervention",
    text: "The teacher steps in to break up the chaos. 'Everyone settle down!' they shout. The room goes quiet.",
    choices: [
      { text: "Apologize", nextId: "boring_lecture" },
      { text: "Stay silent", nextId: "pop_quiz" },
      { text: "Ask a distractor question", nextId: "teacher_question" },
      { text: "Whistle innocently", nextId: "detention_slip" }
    ]
  },
  presentation_day: {
    id: "presentation_day",
    text: "It's time to present your project. Your poster is half-finished and your partner is hyperventilating.",
    choices: [
      { text: "Improvise the whole thing", nextId: "class_clown" },
      { text: "Read directly from the textbook", nextId: "boring_lecture" },
      { text: "Pretend to faint", nextId: "nurse_office" },
      { text: "Interpretive dance", nextId: "principal_office" }
    ]
  },
  principal_office: {
    id: "principal_office",
    text: "You are sent to the Principal's office. The secretary gives you a stern look over her glasses.",
    choices: [
      { text: "Wait nervously", nextId: "start" }, 
      { text: "Explain it was a misunderstanding", nextId: "boring_lecture" },
      { text: "Ask for a lawyer", nextId: "ending_expelled" },
      { text: "Complement her glasses", nextId: "hall_pass" }
    ]
  },
  nurse_office: {
    id: "nurse_office",
    text: "You are lying on the crinkly paper of the nurse's cot. It smells like rubbing alcohol.",
    choices: [
      { text: "Take a nap", nextId: "ending_nap_champion" },
      { text: "Call your parents", nextId: "start" },
      { text: "Go back to class", nextId: "pop_quiz" },
      { text: "Fake a miraculous recovery", nextId: "hall_pass" }
    ]
  },
  bad_grade: {
    id: "bad_grade",
    text: "You get the paper back. It's covered in red ink. Not your best work.",
    choices: [
      { text: "Ask for extra credit", nextId: "teacher_question" },
      { text: "Hide it in your backpack", nextId: "boring_lecture" },
      { text: "Vow to study harder", nextId: "boring_lecture" },
      { text: "Turn it into a paper airplane", nextId: "detention_slip" }
    ]
  },


  // --- AVENGERS BRANCH ---
  avengers_arrival: {
    id: "avengers_arrival",
    text: "A portal opens on the soccer field! Thanos and his army are invading! Tony Stark lands next to you. 'Kid! The Reality Stone is turning teachers into chickens! I need a strategist who knows algebra!'",
    choices: [
      { text: "Raise your hand heroically", nextId: "tony_stark_puzzle" },
      { text: "Claim you are a calculus genius", nextId: "tony_stark_puzzle" },
      { text: "Hide under the desk", nextId: "boring_lecture" },
      { text: "Throw an eraser at Thanos", nextId: "detention_slip" }
    ]
  },
  tony_stark_puzzle: {
    id: "tony_stark_puzzle",
    text: "Tony points to a swarm of Ultron bots. 'I need to overload their circuits! If each bot takes 50 gigajoules and I have 300, how many can I fry at once?'",
    choices: [
      { text: "6 bots", nextId: "meet_spiderman" },
      { text: "Tell him to divide by zero", nextId: "ending_chaos" },
      { text: "Ask for a suit first", nextId: "meet_spiderman" },
      { text: "Say 'I love you 3000'", nextId: "meet_spiderman" }
    ]
  },
  meet_spiderman: {
    id: "meet_spiderman",
    text: "Spider-Man swings in, dodging pumpkin bombs. 'Green Goblin is attacking the gym! He's flying in a parabola! If I web him at the vertex (h, k), where do I aim?'",
    choices: [
      { text: "Calculate the vertex", nextId: "meet_thor" },
      { text: "Tell him to just shoot everywhere", nextId: "meet_thor" },
      { text: "Give him the wrong coordinates", nextId: "ending_spidey_fail" },
      { text: "Ask for a selfie", nextId: "meet_thor" }
    ]
  },
  meet_thor: {
    id: "meet_thor",
    text: "Thor crashes through the ceiling. 'Loki has cloned himself! The real Loki's power level is a prime number! Is it 9, 15, or 17?'",
    choices: [
      { text: "17", nextId: "meet_strange" },
      { text: "Smash them all with Mjolnir", nextId: "ending_ragnarok" },
      { text: "9", nextId: "meet_strange" },
      { text: "Challenge Loki to a riddle", nextId: "nurse_office" }
    ]
  },
  meet_strange: {
    id: "meet_strange",
    text: "Dr. Strange holds back a swirling vortex. 'Dormammu has trapped us in a time loop! I need the next number in the Fibonacci sequence to break it: 2, 3, 5, 8...?'",
    choices: [
      { text: "13", nextId: "ending_avenger" },
      { text: "21", nextId: "ending_multiverse" },
      { text: "Push him into the vortex", nextId: "ending_sorcerer" },
      { text: "Ask to see a card trick", nextId: "ending_avenger" }
    ]
  },

  // --- AVENGERS ENDINGS ---
  ending_avenger: {
    id: "ending_avenger",
    text: "You solved the math and saved the universe! Thanos is defeated, the teachers are human again, and Tony Stark offers you an internship at Stark Industries.",
    choices: [],
    isGameOver: true,
    ending: {
      id: "avenger",
      title: "Honorary Avenger",
      description: "Earth's Mightiest Math Student.",
      type: "good"
    }
  },
  ending_chaos: {
    id: "ending_chaos",
    text: "Tony listens to you. The calculation error causes the Ultron bots to multiply instead of explode. The school is now a robot factory.",
    choices: [],
    isGameOver: true,
    ending: {
      id: "chaos",
      title: "Age of Ultron (School Edition)",
      description: "You welcomed our new robot overlords.",
      type: "bad"
    }
  },
  ending_spidey_fail: {
    id: "ending_spidey_fail",
    text: "Spider-Man misses the Goblin and webs the principal instead. Green Goblin takes over the cafeteria. No more pizza Fridays.",
    choices: [],
    isGameOver: true,
    ending: {
      id: "spidey_fail",
      title: "Goblin Mode",
      description: "You failed the friendly neighborhood Spider-Man.",
      type: "bad"
    }
  },
  ending_ragnarok: {
    id: "ending_ragnarok",
    text: "Thor smashes everything. He got the real Loki, but also the gym, the library, and your locker. The school is destroyed.",
    choices: [],
    isGameOver: true,
    ending: {
      id: "ragnarok",
      title: "School of Ragnarok",
      description: "No school. Only rubble.",
      type: "neutral"
    }
  },
  ending_multiverse: {
    id: "ending_multiverse",
    text: "You give the wrong number. The time loop breaks... but now everyone has hot dogs for fingers. Welcome to the Multiverse of Madness.",
    choices: [],
    isGameOver: true,
    ending: {
      id: "multiverse",
      title: "Dimension Hopper",
      description: "Math works differently here.",
      type: "secret"
    }
  },
  ending_sorcerer: {
    id: "ending_sorcerer",
    text: "You push Strange. He falls. The cloak of levitation chooses YOU. You defeat Dormammu with a protractor. You are the Sorcerer Supreme.",
    choices: [],
    isGameOver: true,
    ending: {
      id: "sorcerer",
      title: "Sorcerer Supreme",
      description: "Magic > Algebra.",
      type: "good"
    }
  },

  // --- NEW SCENARIOS ---
  
  // Arguing with Student Path
  argument_student: {
    id: "argument_student",
    text: "You turn around and confront Doug 'The Divider'. 'Stop throwing spitballs, you numerator!' The class gasps.",
    choices: [
      { text: "Challenge him to a math duel", nextId: "math_duel" },
      { text: "Insult his long division skills", nextId: "detention_slip" },
      { text: "Flip his desk (mentally)", nextId: "teacher_intervention" },
      { text: "Report him to the teacher", nextId: "ending_snitch" }
    ]
  },
  math_duel: {
    id: "math_duel",
    text: "It's a Math Duel! You both grab chalk and race to the board. The problem: Integrate x^2 from 0 to 3.",
    choices: [
      { text: "Solve it correctly (9)", nextId: "ending_math_champion" },
      { text: "Draw a smiley face", nextId: "class_clown" },
      { text: "Panic and run out of the room", nextId: "hallway_chase" },
      { text: "Pretend to faint", nextId: "nurse_office" }
    ]
  },

  // Arguing with Teacher Path
  argument_teacher: {
    id: "argument_teacher",
    text: "You stand up. 'This curriculum is derivative! We demand real-world applications!' The teacher looks stunned.",
    choices: [
      { text: "Start a revolution", nextId: "ending_revolutionary" },
      { text: "Sit back down immediately", nextId: "boring_lecture" },
      { text: "Walk out in protest", nextId: "hallway_chase" },
      { text: "Offer a better lesson plan", nextId: "teacher_impressed" }
    ]
  },

  // Running Outside Path
  hallway_chase: {
    id: "hallway_chase",
    text: "You burst out of the classroom door! The hallway stretches out before you. You hear footsteps behind you.",
    choices: [
      { text: "Run to the exit", nextId: "outside_freedom" },
      { text: "Hide in a locker", nextId: "detention_slip" },
      { text: "Duck into the science lab", nextId: "science_lab" },
      { text: "Pull the fire alarm", nextId: "ending_expelled" }
    ]
  },
  outside_freedom: {
    id: "outside_freedom",
    text: "You push open the double doors. Fresh air! The sun is shining. You are free.",
    choices: [
      { text: "Run into the woods", nextId: "ending_feral" },
      { text: "Go to the playground", nextId: "playground_king" },
      { text: "Follow the smell of onions", nextId: "shrek_swamp" },
      { text: "Walk home", nextId: "ending_dropout" }
    ]
  },

  // --- SHREK BRANCH ---
  shrek_swamp: {
    id: "shrek_swamp",
    text: "You follow the scent to a muddy patch behind the gym. A familiar outhouse stands there. The door kicks open. 'WHAT ARE YOU DOING IN MY SWAMP?!' yells a large green ogre.",
    choices: [
      { text: "Scream 'SOMEBODY ONCE TOLD ME'", nextId: "sing_along" },
      { text: "Ask about onion layers", nextId: "onion_math" },
      { text: "Run away in terror", nextId: "hallway_chase" },
      { text: "Ask for an autograph", nextId: "shrek_friend" }
    ]
  },
  sing_along: {
    id: "sing_along",
    text: "Shrek sighs, but Donkey pops out and starts beatboxing. You belt out the lyrics. It's a musical number!",
    choices: [
      { text: "Hit the high note", nextId: "ending_all_star" },
      { text: "Do the dance", nextId: "ending_all_star" },
      { text: "Stop awkwardly", nextId: "shrek_swamp" },
      { text: "Mic drop", nextId: "ending_all_star" }
    ]
  },
  onion_math: {
    id: "onion_math",
    text: "'Ogres are like onions!' you say. 'If your radius is 50cm, what is your volume?' Shrek scratches his head. 'Is this common core?'",
    choices: [
      { text: "Calculate the volume", nextId: "ending_math_ogre" },
      { text: "Peel the onion", nextId: "shrek_swamp" },
      { text: "Say 'Parfaits are better'", nextId: "ending_swamp_friend" },
      { text: "Just eat the onion", nextId: "nurse_office" }
    ]
  },
  shrek_friend: {
    id: "shrek_friend",
    text: "Shrek grumbles but signs your textbook with a muddy finger. 'That'll do, student. That'll do.'",
    choices: [
      { text: "Say thanks", nextId: "ending_swamp_friend" },
      { text: "Ask for waffles", nextId: "ending_swamp_friend" },
      { text: "Hug him", nextId: "shrek_swamp" },
      { text: "Leave before he gets mad", nextId: "outside_freedom" }
    ]
  },

  // --- SHREK ENDINGS ---
  ending_all_star: {
    id: "ending_all_star",
    text: "The musical number goes viral on TikTok. You, Shrek, and Donkey are now a famous boy band. School is out forever.",
    choices: [],
    isGameOver: true,
    ending: {
      id: "all_star",
      title: "All Star",
      description: "You got your game on. You got paid.",
      type: "good"
    }
  },
  ending_math_ogre: {
    id: "ending_math_ogre",
    text: "Shrek respects your math skills. He lets you live in the swamp as his accountant. You calculate the trajectory of donkey-kicks.",
    choices: [],
    isGameOver: true,
    ending: {
      id: "math_ogre",
      title: "Swamp Accountant",
      description: "It's all ogre now.",
      type: "secret"
    }
  },
  ending_swamp_friend: {
    id: "ending_swamp_friend",
    text: "You and Shrek make waffles in the morning. You're late for class, but who cares? You're friends with an ogre.",
    choices: [],
    isGameOver: true,
    ending: {
      id: "swamp_friend",
      title: "Noble Steed",
      description: "You found a fairytale ending.",
      type: "good"
    }
  },
  playground_king: {
    id: "playground_king",
    text: "You climb to the top of the slide. You are the ruler of the empty playground.",
    choices: [
      { text: "Declare yourself King/Queen", nextId: "ending_playground_monarch" },
      { text: "Slide down", nextId: "principal_office" },
      { text: "Hide in the tube", nextId: "ending_secret_agent" },
      { text: "Do pull-ups", nextId: "gym_class" }
    ]
  },

  // Other Class Path
  science_lab: {
    id: "science_lab",
    text: "You sneak into the science lab. Mr. Beaker is mixing colorful liquids. He doesn't see you.",
    choices: [
      { text: "Put on a lab coat", nextId: "ending_scientist" },
      { text: "Drink the blue liquid", nextId: "nurse_office" },
      { text: "Mix everything together", nextId: "ending_explosion" },
      { text: "Ask about quantum physics", nextId: "teacher_impressed" }
    ]
  },
  gym_class: {
    id: "gym_class",
    text: "You wander into the gym. Coach Whistle blows his whistle. 'Drop and give me twenty!'",
    choices: [
      { text: "Do the pushups", nextId: "ending_athlete" },
      { text: "Refuse and run", nextId: "hallway_chase" },
      { text: "Claim you have a doctor's note", nextId: "nurse_office" },
      { text: "Climb the rope", nextId: "ending_stuck" }
    ]
  },

  // --- RESTORED ENDINGS ---
  ending_valedictorian: {
    id: "ending_valedictorian",
    text: "The teacher is so impressed by your questions that they recommend you for advanced placement. You are now the smartest kid in school.",
    choices: [],
    isGameOver: true,
    ending: {
      id: "valedictorian",
      title: "The Valedictorian",
      description: "You outsmarted the system (and the teacher).",
      type: "good"
    }
  },
  ending_expelled: {
    id: "ending_expelled",
    text: "Demanding a lawyer in 6th grade didn't go over well. You are suspended indefinitely.",
    choices: [],
    isGameOver: true,
    ending: {
      id: "expelled",
      title: "Legal Trouble",
      description: "You fought the law and the law won.",
      type: "bad"
    }
  },
  ending_detention_regular: {
    id: "ending_detention_regular",
    text: "You accept your fate. You spend the afternoon staring at a wall. It becomes your new routine.",
    choices: [],
    isGameOver: true,
    ending: {
      id: "detention_regular",
      title: "Detention Regular",
      description: "You and the detention monitor are on a first-name basis.",
      type: "neutral"
    }
  },
  ending_secret_agent: {
    id: "ending_secret_agent",
    text: "You discover a hidden ventilation shaft behind the library books. You crawl inside and vanish from school forever, living in the walls.",
    choices: [],
    isGameOver: true,
    ending: {
      id: "secret_agent",
      title: "The Phantom Student",
      description: "You found the school's secrets and became one of them.",
      type: "secret"
    }
  },
  ending_comedian: {
    id: "ending_comedian",
    text: "You refuse to stop the bit. The principal is laughing. The teacher is laughing. You are expelled, but you have a Netflix special now.",
    choices: [],
    isGameOver: true,
    ending: {
      id: "comedian",
      title: "Class Clown Legend",
      description: "Worth it for the laughs.",
      type: "good"
    }
  },
  ending_artist: {
    id: "ending_artist",
    text: "The teacher frames your squirrel drawing. You fail math, but win the district art competition.",
    choices: [],
    isGameOver: true,
    ending: {
      id: "artist",
      title: "The Visionary",
      description: "Math is temporary. Art is forever.",
      type: "good"
    }
  },
  ending_nap_champion: {
    id: "ending_nap_champion",
    text: "You fall asleep on the nurse's cot and wake up three years later. You are now in high school.",
    choices: [],
    isGameOver: true,
    ending: {
      id: "nap_champion",
      title: "Nap Champion",
      description: "You slept through middle school. Lucky you.",
      type: "secret"
    }
  },

  // --- NEW ENDINGS ---
  ending_math_champion: {
    id: "ending_math_champion",
    text: "You solve the integral in record time. Doug cries. The class cheers. You are the undisputed Math Champion.",
    choices: [],
    isGameOver: true,
    ending: {
      id: "math_champion",
      title: "Math Duel Champion",
      description: "You calculated your victory perfectly.",
      type: "good"
    }
  },
  ending_snitch: {
    id: "ending_snitch",
    text: "You tell the teacher. Doug gets detention. But now everyone calls you 'The Tattler'.",
    choices: [],
    isGameOver: true,
    ending: {
      id: "snitch",
      title: "The Informant",
      description: "You won the battle but lost the war.",
      type: "neutral"
    }
  },
  ending_revolutionary: {
    id: "ending_revolutionary",
    text: "The class rallies behind you! You overthrow the syllabus and replace math with video games. Viva la Revolution!",
    choices: [],
    isGameOver: true,
    ending: {
      id: "revolutionary",
      title: "The Revolutionary",
      description: "You changed the system from the inside.",
      type: "good"
    }
  },
  ending_feral: {
    id: "ending_feral",
    text: "You run into the woods behind the school. You never return. Legend says you now live among the squirrels.",
    choices: [],
    isGameOver: true,
    ending: {
      id: "feral",
      title: "Feral Child",
      description: "Return to nature. Reject algebra.",
      type: "secret"
    }
  },
  ending_dropout: {
    id: "ending_dropout",
    text: "You walk all the way home. Your parents are confused. You decide school just isn't for you.",
    choices: [],
    isGameOver: true,
    ending: {
      id: "dropout",
      title: "Early Retirement",
      description: "You clocked out early.",
      type: "bad"
    }
  },
  ending_playground_monarch: {
    id: "ending_playground_monarch",
    text: "You rule the playground with an iron fist until recess ends and the 4th graders overthrow you.",
    choices: [],
    isGameOver: true,
    ending: {
      id: "playground_monarch",
      title: "King of the Slide",
      description: "Heavy is the head that wears the paper crown.",
      type: "neutral"
    }
  },
  ending_scientist: {
    id: "ending_scientist",
    text: "Mr. Beaker assumes you're a transfer student. You discover a new element. You win a Nobel Prize.",
    choices: [],
    isGameOver: true,
    ending: {
      id: "scientist",
      title: "The Scientist",
      description: "Eureka!",
      type: "good"
    }
  },
  ending_explosion: {
    id: "ending_explosion",
    text: "BOOM! The lab fills with purple smoke. The fire alarm goes off. You are grounded for life.",
    choices: [],
    isGameOver: true,
    ending: {
      id: "explosion",
      title: "Mad Chemist",
      description: "You went out with a bang.",
      type: "bad"
    }
  },
  ending_athlete: {
    id: "ending_athlete",
    text: "You do 100 pushups. Coach Whistle weeps with joy. You are drafted to the Olympics immediately.",
    choices: [],
    isGameOver: true,
    ending: {
      id: "athlete",
      title: "The Olympian",
      description: "Physical education is your true calling.",
      type: "good"
    }
  },
  ending_stuck: {
    id: "ending_stuck",
    text: "You climb to the top of the rope and freeze. You can't get down. The fire department has to rescue you.",
    choices: [],
    isGameOver: true,
    ending: {
      id: "stuck",
      title: "High Altitude Rescue",
      description: "What goes up must come down... eventually.",
      type: "bad"
    }
  },
};

export function getInitialStory(): StorySegment {
  return SCENARIOS['start'];
}

export function getNextStorySegment(
  currentId: string,
  choiceIndex: number,
  wasCorrect: boolean
): StorySegment {
  const currentScenario = SCENARIOS[currentId];
  const choice = currentScenario.choices[choiceIndex];
  const nextScenarioId = choice.nextId;
  const nextScenario = SCENARIOS[nextScenarioId];

  return {
    id: nextScenario.id,
    text: nextScenario.text,
    choices: nextScenario.choices,
    isGameOver: nextScenario.isGameOver,
    ending: nextScenario.ending
  };
}
