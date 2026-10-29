// $: note("C D E F G A B").s("bd")
// $: chord("<Am C D F Am E Am E>").voicing().s("sawtooth")
// Bass: s("bd:3 bd:3 ~ [bd:4 bd:3]").beat("0,4,8,11,14",16).duckorbit(2).duckattack("<0.2 0 0.4>").duckdepth(1)

// snare: s("sd").struct("x(3,8)").lpf(400)

Inmsect: s("insect").struct("x - [x x] x").n("<1 3 1 2>").slow(4)

// hhat: s("hh*4").sometimesBy(.4, x=> x.ply(4))


// crow: s("crow").lpf(10000).slow(2)


darbuka: s("darbuka").beat("1,4,5,7,8",8).n("<1 2 4 5 7>").postgain(4).slow(8)