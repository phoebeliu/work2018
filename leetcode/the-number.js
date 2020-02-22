//input: 27699
//output: 2
function theNumber(input) {
    if (!(input >= 1 && input <= 100000000)) {
        return;
    }
    var numberList = '';
    var numberListArray = [];
    for (let i = 1; i <= input; i++) {
        numberList = numberList + i;
    }
    numberListArray = numberList.split('');
    return numberListArray[input + 1];
}
theNumber(27699);