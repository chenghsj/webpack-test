import print from "./print";
import "./index.css";
import "./assets/iconFonts/flaticon.css";

print();

const sum = (...args) => args.reduce((acc, arg) => acc + arg, 0);

console.log(sum(1, 2, 3, 4, 5));

if (module.hot) {
  module.hot.accept("./print.js", () => {
    print();
  });
}
