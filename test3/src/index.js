// import print from "./print";
import $ from "jquery";
import "./index.css";
import "./assets/iconFonts/flaticon.css";

// const sum = (...args) => args.reduce((acc, arg) => acc + arg, 0);

// print();

// import(/* webpackChunkName: 'print' */ "./print")
//   .then((resolve) => {
//     console.log(resolve.default());
//     console.log("success");
//   })
//   .catch(() => {
//     console.log("fail");
//   });

// console.log(sum(1, 2, 3, 4, 5));

console.log("this is index.js");
console.log($);

document.getElementById("btn").onclick = async () => {
  try {
    const { print } = await import(
      /* webpackChunkName: 'print', 
      // webpackPrefetch: true 
      */
      "./print"
    );
    console.log(print());
  } catch (err) {
    console.log(err);
  }
};

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => {
        console.log("register success");
      })
      .catch(() => {
        console.log("register failed");
      });
  });
}
