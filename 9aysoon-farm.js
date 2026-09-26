setcpm(118/4)
// @title  (9aysoon farm)
// // VISUAL
// await initHydra()

// // 2. Initialize screen capture on source s0
// Open this youtube video in other ongle https://www.youtube.com/watch?v=iqgU7iOd2Eo&themeRefresh=1
// s0.initScreen()

// // dreamy synthetic "postcard" layer
// const dreamLayer = osc(4, 0.05, 1.5)
//   .color(1, 0.7, 0.9)
//   .rotate(0.1)
//   .kaleid(4)
//   .scale(1.5)

// src(s0)
//   .scale(1.5)
//   .blend(dreamLayer, 0.35) // 0.35 = how much of the dream layer bleeds through
//   .out(o0)

// ================================================================
// DRUMS
// ================================================================

// --- Drum hits ---
const KICK_1 = sound("[bd*2]").bank("lm1").gain(1.5) // was 1.2 — louder kick
const KICK_2 = sound("[[-@7 bd] -]").bank("lm1").gain(.5)
const KICK_3 = sound("bd bd bd -").bank("lm1").gain(1.2)
const SNARE_1 = sound("<[- sd]*2>").bank("lm1").decay(.4).room(.25)
const SNARE_2 = sound("[- sd] [- sd sd lt]").bank("lm1").decay(.4).room(.25)
const SNARE_3 = sound("[- sd] [- sd [sd sd] -]").bank("lm1").decay(.4).room(.25)
const SNARE_4 = sound("[- sd] [- [sd sd lt -]]").bank("lm1").decay(.4).room(.25)
const SNARE_5 = sound("[sd sd] [sd sd] [ht ht] lt").bank("lm1").decay(.4).room(.25)
const HI_HATS = sound("[hh]*16").bank("lm1").decay(.2).gain(.07)

// --- Drum bus + combined loops/fills ---
const DRUM_BUS = input => input.hpf(60)
const DRUM_LOOP = DRUM_BUS(stack(KICK_1, KICK_2, SNARE_1, HI_HATS))
const DRUM_FILL_1 = DRUM_BUS(stack(KICK_1, KICK_2, SNARE_2, HI_HATS))
const DRUM_FILL_2 = DRUM_BUS(stack(KICK_1, KICK_2, SNARE_3, HI_HATS))
const DRUM_FILL_3 = DRUM_BUS(stack(KICK_1, KICK_2, SNARE_4, HI_HATS))
const DRUM_FILL_4 = DRUM_BUS(stack(SNARE_5, HI_HATS))

// ================================================================
// SOUND DEFINITIONS (instrument timbres)
// ================================================================

const PULSE_SOUND = n => note(n).sound("pulse").decay(.1).hpf(1000).phaser(sine).phasercenter(400).gain(.6).spread(.8).label("DAYONE")

// --- Bass ---
const BASS_1_SOUND = n => stack(
  note(n).sound("wt_digital_bad_day").decay(.6).gain(1.1).lpf("800"),
  note(n).sound("sawtooth").decay(.6).gain(.3).hpf("800"),
  note(n).sound("pulse").decay(.3).gain(.5),
).hpf(100).room(.05).label("AW COLLECTIVE")

const BASS_2_CORE = n => note(n).sound("pulse").lpenv(3).lpf(600).ftype("2").distort(2).gain(.1).label("AW COLLECTIVE")
const BASS_2_SOUND = n => BASS_2_CORE(n).decay(.2)
const BASS_2_SLIDE_SOUND = n => BASS_2_CORE(n).penv(12).pattack("1").penv("-12")

// --- Synths / pads ---
const PERFECT_FIFTH_SYNTH_SOUND = n => stack(
  note(n).sound("gm_lead_2_sawtooth").trans(12),
  note(n).sound("supersaw").trans(24),
  note(n).sound("sawtooth").trans(31),
).decay(.6).room(.3).spread(.8).gain(.15).label("F.ragmen.t")

const STRINGS_SOUND = n => note(n).sound("gm_synth_strings_1").hpf(400).gain(.18).spread(.8).room(.3).label("DAYONE")

const STABS_SOUND = n => note(n).sound("gm_brass_section").gain(.4).attack(.04).decay(.15).room(.7).label("AW COLLECTIVE")

const EIGHTHS_SOUND = n => stack(
  note(n).sound("supersaw"),
  note(n).sound("z_sawtooth"),
).gain(.1).decay(.2).sustain(.15).pan(.3).label("F.ragmen.t")

const STUTTER_SOUND = n => stack(
  note(n).sound("gm_baritone_sax").gain(.2),
  note(n).sound("square").gain(.44),
  note(n).sound("square").trans(5).gain(.4),
).attack(.09).decay(.06).lpf(4300).gain(.1).pan(.6).label("DAYONE")

const POLY_SYNTH_SOUND = n => stack(
  note(n).sound("sine").attack(.01).gain(.04),
  note(n).sound("supersaw").attack(0.02).gain(.08).pan(.45),
  note(n).sound("gm_synth_brass_1").attack(.02).gain(.13).pan(.65),
).hpf(50).lpf(5000).spread(1).label("F.ragmen.t")
const CHORUS_SYNTH_SOUND = n => POLY_SYNTH_SOUND(n).gain(.15).decay(.2).room(.1)
const VERSE_SYNTH_SOUND = n => POLY_SYNTH_SOUND(n).release(.7).room(.8)

const BRIDGE_SYNTH_SOUND = n => stack(
  note(n).sound("gm_synth_brass_1").gain(.4),
).lpf(6000).attack(.05).decay(.2).sustain(.15).pan(.7).room(1).label("AW COLLECTIVE")

const CHORUS_MELODY_SOUND = n => stack(
  note(n).sound("supersaw").gain(.15).trans(-12),
  note(n).sound("sawtooth").gain(.23),
).decay(.4).hpf(300).release(0.2).room(.05).label("F.ragmen.t")

// ================================================================
// PATTERNS (per-section note data + rendered sounds)
// ================================================================

// --- Intro ---
const INTRO_PULSE = PULSE_SOUND("c4*16")

// --- Instrumental ---
const INSTRUMENTAL_BASS_NOTES = "<[a1 [a1@3 e1] [g1 a1] -] <[a1 e1 g1 c2@5] <[a1 c2 g1 a1@5] [d2 e2 d2 c2 b1@2 a1@5 -@5]>>>"
const INSTRUMENTAL_BASS = BASS_1_SOUND(INSTRUMENTAL_BASS_NOTES)
const INSTRUMENTAL_SYNTH = PERFECT_FIFTH_SYNTH_SOUND(INSTRUMENTAL_BASS_NOTES)
const INSTRUMENTAL_STRINGS_NOTES = "<[a3,c4,e4] <[a3,c4,f4] [g3,b3,e4]>>"
const INSTRUMENTAL_STRINGS = STRINGS_SOUND(INSTRUMENTAL_STRINGS_NOTES)

// --- Verse ---
const VERSE_BASS_NOTES = "<[f2*2 [c2 f2 - c2] f2 -] <[g2*2 [d2 g2 - d2] g2 -] <[g2*2 [d2 g2 - d2] g2 [-@2 d2 e2]] [g2*2 [d2 g2 - d2] g2 <[-@2 g2 d3] [-@2 e2 g2]>]>>>"
const VERSE_BASS = BASS_2_SOUND(VERSE_BASS_NOTES)

const VERSE_CHORDS_1_NOTES = `
  {d5@0.25 -@.25 c5@0.25 -@15.25}/4,
  {b4@0.25 -@0.25 a4@0.25 -@15.25}/4,
  {g4@0.25 -@0.25 f4@0.25 -@15.25}/4`.late(.75)
const VERSE_CHORDS_1 = VERSE_SYNTH_SOUND(VERSE_CHORDS_1_NOTES)

const VERSE_CHORDS_2_NOTES = `
  {-@3.5 e5@0.25 -@1.75 d5@0.25 -@1.25 d5@0.25 -@0.25 c5@0.25 -@2.75 g4@0.25 -@0.75 d5@0.25 -@4.25}/4,
  {-@3.5 c5@0.25 -@1.75 b4@0.25 -@1.25 b4@0.25 -@0.25 a4@0.25 -@2.75 e4@0.25 -@0.75 b4@0.25 -@4.25}/4,
  {-@3.5 a4@0.25 -@1.75 g4@0.25 -@1.25 g4@0.25 -@0.25 f4@0.25 -@2.75 c4@0.25 -@0.75 g4@0.25 -@4.25}/4`
const VERSE_CHORDS_2 = VERSE_SYNTH_SOUND(VERSE_CHORDS_2_NOTES)

const VERSE_STABS_1_NOTES = `-@10 b4 -@2 c5 -@2, -@10 d5 -@2 e5 -@2`
const VERSE_STABS_1 = STABS_SOUND(VERSE_STABS_1_NOTES)

const VERSE_STABS_2_NOTES = `
  <[b4 -@2 a4 -@2 f4 -@3 a4 -@2 b4 -@2, d5 -@2 c5 -@2 a4 -@3 c5 -@2 d5 -@2]
  [c5 -@2 b4 -@2 g4 -@3 b4 -@2 c5 -@2, e5 -@2 d5 -@2 b4 -@3 d5 -@2 e5 -@2]
  [b4 -@2 a4 -@2 f4 -@3 a4 -@2 b4 -@2, d5 -@2 c5 -@2 a4 -@3 c5 -@2 d5 -@2]
  [g4 -@15, b4 -@15]>`
const VERSE_STABS_2 = STABS_SOUND(VERSE_STABS_2_NOTES)

const VERSE_STUTTER_NOTES = `
  <[{b3 c4 [c4 -] c4 - [c4 -] c4 - [c4 -] c4 - [c4 -] c4 - c4 c4}]
  <[{e4 e4 [e4 -] e4 - [e4 -] d4 - [d4 -] d4 - [d4 -] d4 - d4 d4}]
  [{d4 d4 [d4 -] d4 - [d4 -] d4 - [d4 -] d4 - [d4 -] d4 - d4 d4}]>>`
const VERSE_STUTTER = STUTTER_SOUND(VERSE_STUTTER_NOTES)

// --- Bridge ---
const BRIDGE_BASS_1_NOTES = "<[[a2*2] [g2 a2 - g2] a2 -] [[e2*2] [d2 e2 - d2] e2 -] [[f2*2] [e2 f2 - e2] f2 -] [[d2*2] [b1 d2 - b1] g1 <[- [e2 g2]] [-]>]>"
const BRIDGE_BASS_1 = BASS_2_SOUND(BRIDGE_BASS_1_NOTES)

const BRIDGE_BASS_2_NOTES = "[a1*2 a1*2 a1*2 [a1 [g1 a1]] b1*2 b1*2 b1*2 b1*2 c2*2 c2*2 c2*2 [c2 [c2 d2]] e2*2 e2*2 e2*2 -]/4"
const BRIDGE_BASS_2_SLIDE_NOTES = "[-@16 e1]/4"
const BRIDGE_BASS_2 = stack(
  BASS_2_SOUND(BRIDGE_BASS_2_NOTES),
  BASS_2_SLIDE_SOUND(BRIDGE_BASS_2_SLIDE_NOTES),
)

const BRIDGE_EIGHTHS_1_NOTES = `
  <[a4*8] [a4*8] [a4*8] a4*8>,
  <[c5*8] [b4*8] [c5*8] [c5*4 [c5*2 c5*2]]>,
  <[e5*8] [e5*8] [f5*8] [f5*4 [e5*2 d5*2]]>`
const BRIDGE_EIGHTHS_1 = EIGHTHS_SOUND(BRIDGE_EIGHTHS_1_NOTES)

const BRIDGE_EIGHTHS_2_NOTES = `
  <e4*8 f4*8 a4*8 [g#4*7 -@0.125]>,
  <a4*8 a4*8 c5*8 [b4*7 -@0.125]>,
  <c#5*8 d5*8 e5*8 [e5*7 -@0.125]>`
const BRIDGE_EIGHTHS_2 = EIGHTHS_SOUND(BRIDGE_EIGHTHS_2_NOTES)

const BRIDGE_CHORDS_1_NOTES = `
  {a4@3 -@0.5 e4@3.5 -@0.5 f4@3.5 -@0.5 a4@2.5 g4 g4 a4@3 -@0.5 e4@3.5 -@0.5 f4@3.5 -@0.5 a4@2.5 g4 g4}/8,
  {c5@3 -@0.5 g4@3.5 -@0.5 a4@3.5 -@0.5 d5@2.5 c5 b4 c5@3 -@0.5 g4@3.5 -@0.5 a4@3.5 -@0.5 d5@2.5 c5 b4}/8,
  {e5@3 -@0.5 b4@3.5 -@0.5 c5@3.5 -@0.5 f5@2.5 e5 d5 e5@3 -@0.5 b4@3.5 -@0.5 c5@3.5 -@0.5 f5@2.5 e5 d5}/8`
const BRIDGE_CHORDS_1 = BRIDGE_SYNTH_SOUND(BRIDGE_CHORDS_1_NOTES)

const BRIDGE_CHORDS_2_NOTES = `
  <{e4@3 -@0.5 f4@3.5 -@0.5 a4@3.5 -@0.5 g#4@4 -@0.5}>/4,
  <{a4@3 -@0.5 b4@3.5 -@0.5 c5@3.5 -@0.5 b4@4 -@0.5}>/4,
  <{c#5@3 -@0.5 d5@3.5 -@0.5 e5@3.5 -@0.5 e5@4 -@0.5}>/4`
const BRIDGE_CHORDS_2 = BRIDGE_SYNTH_SOUND(BRIDGE_CHORDS_2_NOTES)

// --- Chorus ---
const CHORUS_PULSE = PULSE_SOUND("<c4*16 d4*16>")

const CHORUS_STRINGS_NOTES = `
  <{f4@3 e4@0.5 d4@3.5 e4@0.5 f4@3.5 e4@0.5 d4@3.5 -}>/4,
  <{c4@3.5 b3@4 c4@4 b3@3.5 -}>/4
`
const CHORUS_STRINGS = STRINGS_SOUND(CHORUS_STRINGS_NOTES)

const CHORUS_SYNTH_NOTES = `
  <[[c5 c5] -@0.5 c5 -@0.5 c5] [[d5 d5] -@0.5 d5 -@0.5 d5]>,
  <[[a4 a4] -@0.5 a4 -@0.5 a4] [[b4 b4] -@0.5 b4 -@0.5 b4]>,
  <[[f4 f4] -@0.5 f4 -@0.5 f4] [[g4 g4] -@0.5 g4 -@0.5 g4]>
`
const CHORUS_SYNTH = CHORUS_SYNTH_SOUND(CHORUS_SYNTH_NOTES)

const CHORUS_MELODY_NOTES = "<{f3 [c4 d4] [- c4] [a3 g3] [f3] c4 d4 -} <{g3 [d4 e4] [- d4] [b3 a3] [g3] d4 e4 -} {g3 [d4 e4] [- d4] [b3 a3] [g3] -@3}>>"
const CHORUS_MELODY = CHORUS_MELODY_SOUND(CHORUS_MELODY_NOTES)

// ================================================================
// SECTIONS (combine drum + instrument patterns into full sections)
// ================================================================

const INTRO = stack(
  arrange([2, INTRO_PULSE]),
  arrange([2, DRUM_LOOP]),
)

const INSTRUMENTAL = stack(
  arrange([8, INTRO_PULSE]),
  arrange([7, DRUM_LOOP], [1, DRUM_FILL_1]),
  arrange([8, INSTRUMENTAL_BASS]),
  arrange([8, INSTRUMENTAL_SYNTH]),
  arrange([8, INSTRUMENTAL_STRINGS]),
)

const INSTRUMENTAL_INTO_VERSE = stack(INSTRUMENTAL, arrange([7, silence], [1, VERSE_CHORDS_1]))

const VERSE = stack(
  arrange([7, DRUM_LOOP], [1, DRUM_FILL_2], [3, DRUM_LOOP], [1, DRUM_FILL_2], [3, DRUM_LOOP], [1, DRUM_FILL_3]),
  arrange([16, VERSE_BASS]),
  arrange([16, VERSE_CHORDS_2]),
  arrange([3, silence], [1, VERSE_CHORDS_1], [3, silence], [1, VERSE_CHORDS_1], [3, silence], [1, VERSE_CHORDS_1], [4, silence]),
  arrange([16, VERSE_STUTTER]),
  arrange([7, silence], [1, VERSE_STABS_1], [3, silence], [1, VERSE_STABS_1]),
  arrange([8, silence], [8, VERSE_STABS_2]),
)

const BRIDGE = stack(
  arrange([7, DRUM_LOOP], [1, DRUM_FILL_3], [3, DRUM_LOOP], [1, DRUM_FILL_4]),
  arrange([8, BRIDGE_BASS_1], [4, BRIDGE_BASS_2]),
  arrange([8, BRIDGE_EIGHTHS_1], [4, BRIDGE_EIGHTHS_2]),
  arrange([8, BRIDGE_CHORDS_1], [4, BRIDGE_CHORDS_2]),
)

const CHORUS = stack(
  arrange([8, CHORUS_PULSE]),
  arrange([7, DRUM_LOOP], [1, DRUM_FILL_2]),
  arrange([8, VERSE_BASS]),
  arrange([8, CHORUS_SYNTH]),
  arrange([8, CHORUS_STRINGS]),
  arrange([8, CHORUS_MELODY]),
)

const CHORUS_INTO_VERSE = stack(
  CHORUS,
  arrange([7, silence], [1, VERSE_CHORDS_1]),
)

const CHORUS_INTO_STABS = stack(
  CHORUS,
  arrange([7, silence], [1, VERSE_STABS_1], [3, silence], [1, VERSE_STABS_1], [3, silence], [1, VERSE_STABS_1]),
  arrange([8, silence], [8, VERSE_STABS_2]),
)

const OUTRO = stack(CHORUS, VERSE_STABS_2)

// ================================================================
// SONG ARRANGEMENT
// ================================================================

arrange(
  [2, INTRO],
  [8, INSTRUMENTAL_INTO_VERSE],
  [16, VERSE],
  [12, BRIDGE],
  [8, CHORUS_INTO_VERSE],
  [16, VERSE],
  [12, BRIDGE],
  [8, CHORUS],
  [8, INSTRUMENTAL],
  [16, CHORUS_INTO_STABS],
  [8, OUTRO],
  [100, silence],
).pianoroll({
  fold: 0,
  cycles: 8,
  labels: 1,
  fill: 1,
  fillActive: 1,
  active: "#FFCA28",
  inactive: "#4C5C8C",
})