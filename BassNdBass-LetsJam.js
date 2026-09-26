samples('github:eddyflux/crate')
setcpm(127/4)

let bassDrum = s("bd - bd - bd - bd bd:0:.6").dist(.8)
let snareDrum = s("[- sd:<0 1>]*2").room(.2)
let rimShot = s("[- rim]*2").room(.2)
let hihat = n("0 .. 15").s("hh").room(.2)

$drum: stack(
  bassDrum
    .lastOf( 4, x => x.ply("2") )
    .speed(saw.range(.5,2))
  ,
  // snareDrum.delay(.5)
  //   .sometimes(x => x.ply("<4 [2 8]>")).cut(1).dec(.08),
  rimShot,
  hihat.sometimesBy(.7, x => x.slow(2))
).bank('crate')

$vibration: stack(
  n("0 .. 7").s("djembe").dec(.1)
    .rarely( x => x.ply("2") )
    .speed(rand.range(1,1.5))
).bank('crate')

$voicinnng : stack(
  chord("<Fm11!2 Cm11!2>").att(.5)
  .voicing().vib('4:.2')
  .room(.8),
).hpf(slider(8000,800,8000))

$bass : stack(
  n("0 - - <4 7> - - -1 -")
  .scale("F1:dorian").s("supersaw")
  .lpf(200).lpd(.1).lpe(2).lpq(8)
  .dist(1.4).room(.2).postgain(".1")
  ._scope(),
  note("[- g1]*2").s("supersaw")
      .lpf(sine.range(100,400)).slow(4)
      .lpq(8).dec(.2).lpe(rand.range(0,4))
      .lpq("<8 10 20 12>").dist(saw.range(1.5,2))
      .room(.6)
      .rarely(ply("2"))
      ._scope()
)