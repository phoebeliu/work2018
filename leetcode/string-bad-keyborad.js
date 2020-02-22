// 7+IE.
// 7_This_is_a_test.
//['7+IE.','7_This_is_a_test.']
//out put :_hs_s_a_tst
//['a', 'z', 'A', 'Z', '0', '9', '_', ' ', ',', '.', '-', '+']
function badKeyborad(inputs) {
    if (inputs[0].length == 0) {
        return '';
    }
    var badkey = inputs[0];
    var words = inputs[1].split('');
    var output = '';
    var finalOutput = '';
    var keyborad = {};
    if (badkey.indexOf('+') > -1) {
        words.forEach(element => {
            if (!(element >= 'A' && element <= 'Z')) {
                output = output + element;
            }
        });
    }
    badkey = badkey.split('');
    badkey.forEach(element => {
        if (element >= 'A' && element <= 'Z') {
            keyborad[element.toLowerCase()] = true;
        }
        keyborad[element] = true;
    });
    output = output.split('');
    output.forEach(element => {
        if (keyborad[element] != true) {
            finalOutput = finalOutput + element;
        }
    });
    return finalOutput;
}
badKeyborad(['7+IE.', '7_This_is_a_test.']);