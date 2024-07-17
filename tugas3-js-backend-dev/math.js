

function circleArea(radius) {
    return Math.round(Math.PI * Math.pow(radius, 2));
}

function kuadratNilai(array) {

    let kuadrat = array.map(number => Math.pow(number, 2));

    return kuadrat;
}

console.log(circleArea(20));
console.log(kuadratNilai([1, 2, 3, 4, 5]));

