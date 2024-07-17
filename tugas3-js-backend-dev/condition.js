
let number = 9;
let day = 7;

if (number % 2 === 0) {
    console.log(`Number ${number} is even`);
} else {
    console.log(`Number ${number} is odd`);
}


switch (day) {
    case 1:
        console.log("Senin");
        break;
    case 2:
        console.log("Selasa");
        break;
    case 3:
        console.log("Rabu");
        break;
    case 4:
        console.log("Kamis");
        break;
    case 5:
        console.log("Jumat");
        break;
    case 6:
        console.log("Sabtu");
        break;
    case 7:
        console.log("Minggu");
        break;
    default:
        console.log("Nilai tidak valid");
        break;
}
