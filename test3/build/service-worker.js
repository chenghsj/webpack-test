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
    "url": "css/built.dcce1812a4.css",
    "revision": "d4109c8a85c91411c081c7823310af91"
  }, {
    "url": "imgs/react.png",
    "revision": "13c51607b8ad74a580f63c915a7e0e59"
  }, {
    "url": "index.html",
    "revision": "283a35e432db8b957b1ba0b2ba272d43"
  }, {
    "url": "jquery.js",
    "revision": "5e471a2c57ced94104d21471db242579"
  }, {
    "url": "js/main.0510f8cce8.js",
    "revision": "5664fbf7fa1cdb8245af2bbd42b10de6"
  }, {
    "url": "js/print.6ce84ce798.js",
    "revision": "e013098efa4a333b4b2646406a28a6df"
  }, {
    "url": "js/vendors~main.4132dd4f46.js",
    "revision": "9f56a7ae3a5445b05862a5e7fd08dbcb"
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
