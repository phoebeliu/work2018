/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    let l = 0;
    let r = 94906265; // Math.floor(Math.sqrt(Number.MAX_SAFE_INTEGER));
    while (l <= r) {
        const m = Math.floor(l + (r - l) / 2);
        const m2 = m * m;
        if (m2 === x) {
            return m;
        } else if (x < m2) {
            r = m - 1;
        } else {
            l = m + 1;
        }
    }
    return r;
};