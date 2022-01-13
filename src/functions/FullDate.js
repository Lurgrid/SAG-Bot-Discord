"use strict";
export default class {
    async execute() {
        const ladate = new Date() 
        let h=ladate.getHours();
        if (h<10) {h = "0" + h}
        let m=ladate.getMinutes();
        if (m<10) {m = "0" + m}
        let s=ladate.getSeconds();
        if (s<10) {s = "0" + s}
        let j=ladate.getDate();
        if(j<10) {j = "0" + j}
        let M=ladate.getMonth() + 1;
        if (M<10) {M = "0" + M }
        let a=ladate.getFullYear();
        return `[${h}:${m}:${s} | ${j}/${M}/${a}]`
    };
}