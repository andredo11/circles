function xInit() {

    var cnv = document.getElementById('cnv'),
        ctx = cnv.getContext('2d');
    var cw, ch; // canvas width, height
    var rd, crd, grd;
    var outer = true; // czy kulka gracza jest na zewnatrz okregu
    var diff, pcx, pcy, score = 0;



    function gframe(mstm) {

        var tm = mstm * 0.001;
        var outtm = tm + 2;
        var intm = tm + 1;
        rd = Math.min(cw, ch) * 0.3; // promien okregu
        crd = rd * 0.08; // promien kulek
        var outrd = rd + crd;
        var inrd = rd - crd;
        if (outer) diff = crd;
        else diff = -crd;

        grd = rd + diff;
        //enemy speed
        var ensp = 2;
        var ensp1 = 4;
        var ensp2 = 1.5;

        pcx = cw / 2 + Math.sin(tm * 1.5) * grd, pcy = ch / 2 + Math.cos(tm * 1.5) * grd; // srodek kulki gracza
        encx = cw / 2 + Math.sin(outtm * ensp) * outrd, ency = ch / 2 + Math.cos(outtm * ensp) * outrd; // srodek kulki enemy outer
        encx1 = cw / 2 - Math.sin(outtm * ensp1) * outrd, ency1 = ch / 2 + Math.cos(outtm * ensp1) * outrd; // srodek kulki enemy outer 1
        encx2 = cw / 2 - Math.sin(intm * ensp2) * inrd, ency2 = ch / 2 + Math.cos(intm * ensp2) * inrd; // srodek kulki enemy inner
        //czyszczenie canvasa
        ctx.fillStyle = '#fafafa';
        ctx.fillRect(0, 0, cw, ch);

        drawBall('black', cw / 2, ch / 2, rd, false); // glowny okrag


        drawBall('red', pcx, pcy, crd, true); // kolko gracza

        //kolka enemy 
        drawBall('black', encx, ency, crd, true);
        drawBall('black', encx1, ency1, crd, true);
        drawBall('black', encx2, ency2, crd, true);

        //kolizja
        distance = Math.sqrt((pcx - encx) ** 2 + (pcy - ency) ** 2);
        distance1 = Math.sqrt((pcx - encx1) ** 2 + (pcy - ency1) ** 2);
        distance2 = Math.sqrt((pcx - encx2) ** 2 + (pcy - ency2) ** 2);
        if (distance >= 2 * crd && distance1 >= 2 * crd && distance2 >= 2 * crd) requestAnimationFrame(gframe);
        //dodawanie punktow
        if (distance == 2 * crd || distance1 == 2 * crd || distance2 == 2 * crd) score += 1;
        console.log(distance2);


    }

    function drawBall(color, x, y, r, fill) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        if (fill) ctx.fill();
        ctx.stroke();

    }

    function gInit() {

        window.addEventListener('resize', updsize);
        cnv.addEventListener('pointerdown', function (e) {
            console.log(2 * crd);
            if (outer) outer = false;
            else outer = true;


        });

        updsize();



        requestAnimationFrame(gframe);

    }


    function updsize() {
        cw = cnv.offsetWidth, ch = cnv.offsetHeight;
        cnv.width = cw, cnv.height = ch;
    }

    gInit();

}

window.onload = xInit;