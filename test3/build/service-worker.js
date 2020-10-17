/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  const singleRequire = name => {
    if (name !== 'require') {
      name = name + '.js';
    }
    let promise = Promise.resolve();
    if (!registry[name]) {
      
        promise = new Promise(async resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = name;
            document.head.appendChild(script);
            script.onload = resolve;
          } else {
            importScripts(name);
            resolve();
          }
        });
      
    }
    return promise.then(() => {
      if (!registry[name]) {
        throw new Error(`Module ${name} didn’t register its module`);
      }
      return registry[name];
    });
  };

  const require = (names, resolve) => {
    Promise.all(names.map(singleRequire))
      .then(modules => resolve(modules.length === 1 ? modules[0] : modules));
  };
  
  const registry = {
    require: Promise.resolve(require)
  };

  self.define = (moduleName, depsNames, factory) => {
    if (registry[moduleName]) {
      // Module is already loading or loaded.
      return;
    }
    registry[moduleName] = Promise.resolve().then(() => {
      let exports = {};
      const module = {
        uri: location.origin + moduleName.slice(1)
      };
      return Promise.all(
        depsNames.map(depName => {
          switch(depName) {
            case "exports":
              return exports;
            case "module":
              return module;
            default:
              return singleRequire(depName);
          }
        })
      ).then(deps => {
        const facValue = factory(...deps);
        if(!exports.default) {
          exports.default = facValue;
        }
        return exports;
      });
    });
  };
}
define("./service-worker.js",['./workbox-8e833ff1'], function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  workbox.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "css/built.0e61c7dd49.css",
    "revision": "d4109c8a85c91411c081c7823310af91"
  }, {
    "url": "imgs/react.png",
    "revision": "13c51607b8ad74a580f63c915a7e0e59"
  }, {
    "url": "index.html",
    "revision": "db67686c639744549a1929da188ccc31"
  }, {
    "url": "js/main.6db921a96c.js",
    "revision": "6ff90507b2cf10a90b8f46c2ad9496ca"
  }, {
    "url": "js/print.697a1e39e6.js",
    "revision": "a9f9f50d6b38aaa0ca780516fc6ca3ae"
  }, {
    "url": "media/404906ab5ec6d59e4aea42c0dc558dcd.eot",
    "revision": "b0c6f7e2212af1a9c97438503371cac6"
  }, {
    "url": "media/b6a18bf5e1e61bf96ee54e4f4a582780.woff2",
    "revision": "0c75997f834af66da9c9709ab3c6a3fb"
  }, {
    "url": "media/ccd46f2c3664d1d7b74c856f8180c96a.woff",
    "revision": "7e27a0b37d06ce94993ac83c64c496cd"
  }, {
    "url": "media/e7a17e0a004788c32d7ee8f96c08cff8.svg",
    "revision": "5409284af65fc245d4bfcdf09b1c3931"
  }, {
    "url": "media/e8f1724dbef171dec4417098a078a41c.ttf",
    "revision": "b856217edfd3110408d7ae4871347d35"
  }], {});

});
//# sourceMappingURL=service-worker.js.map
