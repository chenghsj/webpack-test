import print from "./print";
import "./index.css";
import "./assets/iconFonts/flaticon.css";

print();

console.log("this is .js file");

if (module.hot) {
  module.hot.accept("./print.js", () => {
    print();
  });
}
