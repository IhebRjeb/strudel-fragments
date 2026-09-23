samples('github:tidalcycles/dirt-samples')

setcpm(133/4)
// Initialize Hydra with Strudel feed enabled
await initHydra({feedStrudel:true})
// Hydration of the visual/audio source
// BASE: two stripe patterns, the second rotated 90°, blended with diff to make a moiré grid
osc(60,-0.015,0.3)                 // osc(frequency, sync, offset): 60 = stripe density; negative sync = slow drift one way
  .diff(osc(60,0.08).rotate(Math.PI/2))   // subtract a crossed stripe layer; 0.08 = its speed, Math.PI/2 = 90° turn

  // WARP: noise bends the grid; the noise is itself wobbled by a rocking osc
	.modulateScale(
	  noise(3.5,0.25)              // noise(scale, speed): lower scale = bigger blobs, higher speed = faster movement
	    .modulateScale(osc(15).rotate(()=>Math.sin(time/2))),  // rocks back and forth; time/2 = rocking speed
	  0.6)                         // warp strength: 0 = none, 2 = wild

  // COLOR: tint (red, green, blue multipliers) then punch the contrast
	.color(1,0.5,0.4)              // less green and blue = warm look; try (0.4,0.8,1) for cold blue
	.contrast(1.4)                 // above 1 = harder blacks/whites, below 1 = softer

  // FEEDBACK: adds the previous frame (o0) back in, rippled by itself
	.add(src(o0).modulate(o0,.04),.6)   // .04 = ripple amount (0 = still, 0.2 = melting); .6 = trail strength (0 = none, 0.95 = near-frozen, can burn out)

  // FINISH: flip colors, lift brightness, punch contrast again
	.invert()                      // delete this line to un-invert
	.brightness(0.1)               // -1 to 1; raise if the image gets too dark
	.contrast(1.2)

  // BREATHING ZOOM
	.modulateScale(osc(2),-0.2)    // osc(2) = zoom pulse speed; -0.2 = pull in, positive = push out

  .out()                           // no argument = output o0, which the feedback line above reads
//

all(x => x.fft(4).scope({pos:0 , smear:.95}))

let metal = sound("perc:9(7,16)")
    .hpf(3000)
    .gain(0.5)
    .room(1)
    .every(4, off(1/8))
    .orbit(4)

let sub = note("g1")
    .s("sine")
    .gain(0.9)
    .attack(0.05)
    .release(0.2)
    .orbit(4)

let kick = s("bd:6*4")
    .bank("tr808")
    .cutoff(80) // example cutoff value
    .hpf(80)
    .sustain(0.8)
    .duck(4)
    .sometimesBy(.1, x => x.ply(2))

let groove = sound("perc:<7>(5,8)")
    .bank("dr550")
    .gain(0.15)
    .delay(0.15)
    .hpf(1500)
    .sometimesBy(.3, x => x.ply(2))
    .jux(rev)
    .orbit(4)

let hat = sound("hh:2*8").decay(0.08)
    .bank("tr808")
    .gain(0.3)
    .every(4, fast(2))
    .orbit("4:2")

let hardgroove = stack(
    s("perc:5*8")
    .struct("x(3,8) . x(5,8)") // varied pulses
    .hpf(150)
    .lpf(800)
    .gain(0.2)
    .delay(0.24)
    .shape(0.1)
    .duckorbit(2)
)
let main_kick = s("<[sbd!3 [sbd sbd]] [[sbd!2 [sbd sbd ]] sbd]>")
    .lpf("742")
    .hpf("80")

bass: sub

track: stack(
    // metal,
    hardgroove,
    hat,
    groove,
    kick,
    // main_kick,
)
// minimal hardgroove track configuration
// .lpf(slider(0,0,2000))
// .hpf(slider(0,0,3000))