for (let i = 0; i < pinout.pins.length; i++) {
    let pin = pinout.pins[i];

    if (i < 100) pin.col = (i%2==0) ? 4 : 3;
    else         pin.col = (i%2==0) ? 0 : 1;

    pin.row = 49 - Math.floor((i % 100) / 2);

}