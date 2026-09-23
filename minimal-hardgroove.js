samples('github:tidalcycles/dirt-samples')

setcpm(133/4)
// Initialize Hydra with Strudel feed enabled
await initHydra({feedStrudel:true})
// Hydration of the visual/audio source
src(s0).kaleid(H("<7 13 21>"))
    .diff(osc(1,0.5,13))
    .modulateScale(osc(2,-0.5,.5))
    .out()
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
    kick,
    // main_kick,
)
// minimal hardgroove track configuration
// .lpf(slider(0,0,2000))
// .hpf(slider(0,0,3000))