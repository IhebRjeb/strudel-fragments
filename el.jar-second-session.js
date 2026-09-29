// making music with code/Strudel.cc:
/* @title    EL.JAR - that sound is mine
   @by       F.ragmen.t
   @stage    in-progress
*/

samples('github:algorave-dave/samples')
samples('https://samples.grbt.com.au/strudel.json')

setcpm(132/4)

Sbass: note("0*16").s("<saw  sawtooth>").room(.2).lpf("200 700 800 1400 700 4000").lpq("<0 10 20 30>").lpenv("<4 2 1 0 -1 -2 -4>/4")

Sdrum: s("sbd").struct("<x(3,8) x(3,8) x(5,8)>")

Ssnare: s("- sd - [sd sd]").lpf(400).lpq("<0 10 20 30>").lpenv("<4 2 1 0 -1 -2 -4>/4")

Shats: s("linn9000_hh*8").gain(".4 .2 .3 .1 .2").sometimesBy(.1, x => x.ply(4))

Shuhahah: s("whatuneed:1").distort("<.9 .3 1.5 2 1.7>").speed("<1>")

// Srave : s("<ravetoalgo:3 ~ ~ ~ ~>").begin(0.01).end(0.9).loopAt(1.1)   // stretch/squash to exactly 2 cycles (8 beats), changes pitch
    // cut the sample at the event length
// all(x => x.lpf(slider(5000,100,5000)))

// Svoice: s("<crime_pays - - ->/8")
// Smorekick: s("brevenmore1:9").loopAt(1.1)
Svocals: s("<- - - - - - technologic>/8").distort(.8).cut(1)