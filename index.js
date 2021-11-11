var fuzzylogic = require("fuzzylogic")


var resGrade = fuzzylogic.grade(3, 0, 1);

var threatCalc = function(threat) {
    var probabNoAttack          = fuzzylogic.triangle(threat, 0, 20, 40);
    var probabNormalAttack      = fuzzylogic.trapezoid(threat, 20, 30, 90, 100);
    var probabEnragedAttack     = fuzzylogic.grade(threat, 90, 100);
    console.log('Threat: ' + threat);
    console.log('no attack: '       + probabNoAttack);
    console.log('normal attack: '   + probabNormalAttack);
    console.log('enraged attack: '  + probabEnragedAttack);
};

// makanan menggunakan trapesium fuzzy
const makanan = {
    tengik:(mkn) => {
        return fuzzylogic.trapezoid(mkn, 0, 1, 1, 3)
    },
    lezat:(mkn) => {
        return fuzzylogic.trapezoid(mkn, 7, 9, 10, 10)
    }
}
// let makanan = (mkn) => {
    
//     let tengik = fuzzylogic.trapezoid(mkn, 0, 1, 1, 3)
//     let lezat = fuzzylogic.trapezoid(mkn, 7, 9, 10, 10)
// }
// pelayanan menggunakan segitga fuzzy
const pelayanan = {
    jelek: (ply) => {
        return fuzzylogic.triangle(ply, 0, 0, 4)
    },
    sedang: (ply) => {
        return fuzzylogic.triangle(ply, 2, 5, 9)
    },
    bagus: (ply) => {
        return fuzzylogic.triangle(ply, 6, 10, 10)
    }
}

const tip = {
    rendah: (p) => {
        return fuzzylogic.triangle(p, 0, 0, 10)
    },
    standar: (p) => {
        return fuzzylogic.triangle(p, 10, 10, 20)
    },
    tinggi: (p) => {
        return fuzzylogic.triangle(p, 20, 20, 30)
    }
}

var resGrade = fuzzylogic.grade(3,0,1);
console.log(resGrade);

// threatCalc(10);
const valueOfMakanan = 8;
const valueOfPelayanan = 7;
console.log("-----[himpunan makanan]--------");
console.log(makanan.lezat(valueOfMakanan))
console.log(makanan.tengik(valueOfMakanan))
console.log("-----[himpunan m]--------");
console.log(pelayanan.jelek(valueOfPelayanan))
console.log(pelayanan.sedang(valueOfPelayanan))
console.log(pelayanan.bagus(valueOfPelayanan))

// rules output
let z = new Array(3);
let alfa = new Array(3);
function max(a,b) {
    return a > b ? a : b;
}

const rules = ()  => {
    // jika pelayanan jelek atau makanan tengik maka tip rendah
    alfa[0] = max(makanan.tengik(valueOfMakanan), pelayanan.jelek(valueOfPelayanan))
    z[0] = tip.rendah(alfa[0]);

    // jika pelayanan sedang maka tip standar
    alfa[1] = max(0, pelayanan.sedang(valueOfPelayanan))
    z[1] = pelayanan.sedang(valueOfPelayanan);

    // jika pelayanan bagus atau makanan lezat maka tip tinggi
    alfa[2] = max(pelayanan.bagus(valueOfPelayanan), makanan.lezat(valueOfMakanan))
    z[2] = tip.tinggi(alfa[2]);

    // return z;
}

// console.log(rules());
rules();
const defuzzy = () => {
    let temp1 = 0;
    let temp2 = 0;
    let hasil = 0;
    for (let i = 0; i < 3; i++){
        // console.log(alfa[i])
        temp1 = temp1 + alfa[i] * z[i];
        temp2 = temp2 + alfa[i];
    }

    hasil = temp1/temp2;
    return (hasil);
}
console.log("============================")
console.log("defuzzy = " +defuzzy());
