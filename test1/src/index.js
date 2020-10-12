/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import data from "./data.json";
import "./styles/index.css";
import "./styles/index.less";
import "./assets/iconFonts/flaticon.css";
// import "@babel/polyfill"; // import all solutions, too many, using core-js

const add = (x, y) => x + y;

console.log(add(1, 2));
console.log(data);
