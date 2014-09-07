/* bf.js - Brainfuck in JavaScript
 * Author: Matt Stasch <matt.stasch@gmail.com>
 * Date: 2011.07.14
 */

'use strict';

var bf = function(src, input) {
    if(src == undefined || src.length == undefined || src.length == 0)
        throw 'No source!';
    if(input == undefined || input.length == undefined)
        throw 'No input!';

    var MAXMEM = 65536;
    
    var mem = new ArrayBuffer(MAXMEM);
    var output = new Array();
    var stack = new Array();
    var p = 0,      // Memory pointer
        s = 0,      // STDIN pointer
        t = '\0',   // Code token
        i = 0,      // Iterator
        l = 0;      // Length

    // Initialize memory
    for(i = 0, mem[0] = 0; i < MAXMEM; i++, mem[i] = 0);
    
    // Execute code
    for(i = 0, l = src.length, t = src[0]; i < l; i++, t = src[i]) {
        switch(t) {
            case '+': 
                mem[p]++;
                break;
            case ',':
                mem[p] = (s == input.length) ? 0 : input[s++];
                break;
            case '-':
                mem[p]--;
                break;
            case '.':
                output.push(mem[p]);
                break;
            case '<':
                p--;
                break;
            case '>':
                p++;
                break;
            case '[':
                if(mem[p] != 0) stack.push(i - 1);
                else for(;src[++i] != ']' && i<l;);
                break;
            case ']':
                i = stack.pop();
                break;
        }
    }

    if(stack.length > 0) {
        throw 'Missing "]"!';
    }

    return output;
};