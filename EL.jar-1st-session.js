// making music with code/Strudel.cc:
/* @title    EL.JAR - hummmmm
   @by       F.ragmen.t
   @stage    in-progress
*/

setcpm(132/4)
// tb303 style filter envelope control between 0 & 1 values for useful range
register('acidenv', (x, pat) => pat.lpf(100)
  .lpenv(x * 9).lps(.2).lpd(.12).lpq(2)
)

samples('github:yaxu/spicule')
samples('github:bubobubobubobubo/dough-fox')
// await initHydra()

// osc(13,.2,13).kaleid(13).blend(noise(1, 0.1), 0.7).out()

piano: s("fmpiano/2")
  .note("e")
  .delay(3/16).delaytime(2/16).delayfeedback(0.9)
  .lpf(1600).lfo({sync: 1/5, depth: 1.75, curve: 2})
  .lpq(3)
  .speed("<0.5 1 .25>")
  .room(.5)
  .gain(.6)
  ._pianoroll()
// _rythm:  s("<- bees:3!2 ->/4").room("<0.9:1 0.9:4>").lpf(800)

kick: s("bskick*10").n("6")
  .gain("0 .1 .1 .2 .3 .5 .8 .2 1 .1")
  .fast(16/10)                                        // time(1/16) = 16 hits per cycle
  .distort("1.5")
  .attack(0.001).decay(0.06).sustain(0)                // shape(1 60) 

hat: s("rolandtr808_ht")
  .beat("0,1,2,3,5,8",8)
  .shape(".35")
  .gain(".2")
  .lpf(perlin.range(50,5000))
  ._scope()
// choose(16 tablas): dough-fox ships "ftabla"
tabla: s("ftabla")
  .n("[0|3|5]*16")                                 // random pick per step from 3 tablas
  .speed("<1 1.1 1.1 1.2 1.3>*16")                 // "speeds" ring
  .gain(.1)
  .distort(3)                                      // fx(drive 7), tamed
  .lpf(sine.range(200, 5000).slow(5)).lpq(4)       // low 5 5000 200 ...
  .delay(.4).delaytime(2/16).delayfeedback(.6)     // 2/16 ...
  .room(.8).roomsize(18).orbit(2)                  // own orbit so the reverb doesn't hit your piano
  .postgain(.6)
  .pan(rand2)

snare: s("<bossdr550_sd>/4") // /4 ===> !2 ==> 1
  .room(.2)
  .speed("<1 0.875>")
  .gain(.5)
  // .lpf(4000)

drum: s("mc202_bd!4")
  .lpf(slider(4000,80,4000))

bass: note("0 0 1 0 1 ")
  .s("saw")
  .shape(".1 .8 .2")
  .lpf("<cosine.range(300,1400) square.range(300,1400)>")
  .lpa(.7)
  .gain(.6)
