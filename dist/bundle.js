"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // dragula/dragula.min.js
  var require_dragula_min = __commonJS({
    "dragula/dragula.min.js"(exports, module) {
      !(function(e) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).dragula = e();
      })(function() {
        return (function o(r, i, u) {
          function c(t, e2) {
            if (!i[t]) {
              if (!r[t]) {
                var n = "function" == typeof __require && __require;
                if (!e2 && n) return n(t, true);
                if (a) return a(t, true);
                throw (n = new Error("Cannot find module '" + t + "'")).code = "MODULE_NOT_FOUND", n;
              }
              n = i[t] = { exports: {} }, r[t][0].call(n.exports, function(e3) {
                return c(r[t][1][e3] || e3);
              }, n, n.exports, o, r, i, u);
            }
            return i[t].exports;
          }
          for (var a = "function" == typeof __require && __require, e = 0; e < u.length; e++) c(u[e]);
          return c;
        })({ 1: [function(e, t, n) {
          "use strict";
          var o = {}, r = "(?:^|\\s)", i = "(?:\\s|$)";
          function u(e2) {
            var t2 = o[e2];
            return t2 ? t2.lastIndex = 0 : o[e2] = t2 = new RegExp(r + e2 + i, "g"), t2;
          }
          t.exports = { add: function(e2, t2) {
            var n2 = e2.className;
            n2.length ? u(t2).test(n2) || (e2.className += " " + t2) : e2.className = t2;
          }, rm: function(e2, t2) {
            e2.className = e2.className.replace(u(t2), " ").trim();
          } };
        }, {}], 2: [function(e, t, n) {
          (function(r) {
            "use strict";
            var M = e("contra/emitter"), k = e("crossvent"), j = e("./classes"), R = document, q = R.documentElement;
            function U(e2, t2, n2, o) {
              r.navigator.pointerEnabled ? k[t2](e2, { mouseup: "pointerup", mousedown: "pointerdown", mousemove: "pointermove" }[n2], o) : r.navigator.msPointerEnabled ? k[t2](e2, { mouseup: "MSPointerUp", mousedown: "MSPointerDown", mousemove: "MSPointerMove" }[n2], o) : (k[t2](e2, { mouseup: "touchend", mousedown: "touchstart", mousemove: "touchmove" }[n2], o), k[t2](e2, n2, o));
            }
            function K(e2) {
              if (void 0 !== e2.touches) return e2.touches.length;
              if (void 0 !== e2.which && 0 !== e2.which) return e2.which;
              if (void 0 !== e2.buttons) return e2.buttons;
              e2 = e2.button;
              return void 0 !== e2 ? 1 & e2 ? 1 : 2 & e2 ? 3 : 4 & e2 ? 2 : 0 : void 0;
            }
            function z(e2, t2) {
              return void 0 !== r[t2] ? r[t2] : (q.clientHeight ? q : R.body)[e2];
            }
            function H(e2, t2, n2) {
              var o = (e2 = e2 || {}).className || "";
              return e2.className += " gu-hide", n2 = R.elementFromPoint(t2, n2), e2.className = o, n2;
            }
            function V() {
              return false;
            }
            function $() {
              return true;
            }
            function G(e2) {
              return e2.width || e2.right - e2.left;
            }
            function J(e2) {
              return e2.height || e2.bottom - e2.top;
            }
            function Q(e2) {
              return e2.parentNode === R ? null : e2.parentNode;
            }
            function W(e2) {
              return "INPUT" === e2.tagName || "TEXTAREA" === e2.tagName || "SELECT" === e2.tagName || (function e3(t2) {
                if (!t2) return false;
                if ("false" === t2.contentEditable) return false;
                if ("true" === t2.contentEditable) return true;
                return e3(Q(t2));
              })(e2);
            }
            function Z(t2) {
              return t2.nextElementSibling || (function() {
                var e2 = t2;
                for (; e2 = e2.nextSibling, e2 && 1 !== e2.nodeType; ) ;
                return e2;
              })();
            }
            function ee(e2, t2) {
              var t2 = (n2 = t2).targetTouches && n2.targetTouches.length ? n2.targetTouches[0] : n2.changedTouches && n2.changedTouches.length ? n2.changedTouches[0] : n2, n2 = { pageX: "clientX", pageY: "clientY" };
              return e2 in n2 && !(e2 in t2) && n2[e2] in t2 && (e2 = n2[e2]), t2[e2];
            }
            t.exports = function(e2, t2) {
              var l, f, s, d, m, o, r2, v, p, h, n2;
              1 === arguments.length && false === Array.isArray(e2) && (t2 = e2, e2 = []);
              var i, g = null, y = t2 || {};
              void 0 === y.moves && (y.moves = $), void 0 === y.accepts && (y.accepts = $), void 0 === y.invalid && (y.invalid = function() {
                return false;
              }), void 0 === y.containers && (y.containers = e2 || []), void 0 === y.isContainer && (y.isContainer = V), void 0 === y.copy && (y.copy = false), void 0 === y.copySortSource && (y.copySortSource = false), void 0 === y.revertOnSpill && (y.revertOnSpill = false), void 0 === y.removeOnSpill && (y.removeOnSpill = false), void 0 === y.direction && (y.direction = "vertical"), void 0 === y.ignoreInputTextSelection && (y.ignoreInputTextSelection = true), void 0 === y.mirrorContainer && (y.mirrorContainer = R.body);
              var w = M({ containers: y.containers, start: function(e3) {
                e3 = S(e3);
                e3 && C(e3);
              }, end: O, cancel: L, remove: X, destroy: function() {
                c(true), N({});
              }, canMove: function(e3) {
                return !!S(e3);
              }, dragging: false });
              return true === y.removeOnSpill && w.on("over", function(e3) {
                j.rm(e3, "gu-hide");
              }).on("out", function(e3) {
                w.dragging && j.add(e3, "gu-hide");
              }), c(), w;
              function u(e3) {
                return -1 !== w.containers.indexOf(e3) || y.isContainer(e3);
              }
              function c(e3) {
                e3 = e3 ? "remove" : "add";
                U(q, e3, "mousedown", E), U(q, e3, "mouseup", N);
              }
              function a(e3) {
                U(q, e3 ? "remove" : "add", "mousemove", x);
              }
              function b(e3) {
                e3 = e3 ? "remove" : "add";
                k[e3](q, "selectstart", T), k[e3](q, "click", T);
              }
              function T(e3) {
                i && e3.preventDefault();
              }
              function E(e3) {
                var t3, n3;
                o = e3.clientX, r2 = e3.clientY, 1 !== K(e3) || e3.metaKey || e3.ctrlKey || (n3 = S(t3 = e3.target)) && (i = n3, a(), "mousedown" === e3.type && (W(t3) ? t3.focus() : e3.preventDefault()));
              }
              function x(e3) {
                if (i) if (0 !== K(e3)) {
                  if (!(void 0 !== e3.clientX && Math.abs(e3.clientX - o) <= (y.slideFactorX || 0) && void 0 !== e3.clientY && Math.abs(e3.clientY - r2) <= (y.slideFactorY || 0))) {
                    if (y.ignoreInputTextSelection) {
                      var t3 = ee("clientX", e3) || 0, n3 = ee("clientY", e3) || 0;
                      if (W(R.elementFromPoint(t3, n3))) return;
                    }
                    n3 = i;
                    a(true), b(), O(), C(n3);
                    n3 = (function(e4) {
                      e4 = e4.getBoundingClientRect();
                      return { left: e4.left + z("scrollLeft", "pageXOffset"), top: e4.top + z("scrollTop", "pageYOffset") };
                    })(s);
                    d = ee("pageX", e3) - n3.left, m = ee("pageY", e3) - n3.top, j.add(h || s, "gu-transit"), (function() {
                      if (l) return;
                      var e4 = s.getBoundingClientRect();
                      (l = s.cloneNode(true)).style.width = G(e4) + "px", l.style.height = J(e4) + "px", j.rm(l, "gu-transit"), j.add(l, "gu-mirror"), y.mirrorContainer.appendChild(l), U(q, "add", "mousemove", P), j.add(y.mirrorContainer, "gu-unselectable"), w.emit("cloned", l, s, "mirror");
                    })(), P(e3);
                  }
                } else N({});
              }
              function S(e3) {
                if (!(w.dragging && l || u(e3))) {
                  for (var t3 = e3; Q(e3) && false === u(Q(e3)); ) {
                    if (y.invalid(e3, t3)) return;
                    if (!(e3 = Q(e3))) return;
                  }
                  var n3 = Q(e3);
                  if (n3) {
                    if (!y.invalid(e3, t3)) {
                      if (y.moves(e3, n3, t3, Z(e3))) return { item: e3, source: n3 };
                    }
                  }
                }
              }
              function C(e3) {
                var t3, n3;
                t3 = e3.item, n3 = e3.source, ("boolean" == typeof y.copy ? y.copy : y.copy(t3, n3)) && (h = e3.item.cloneNode(true), w.emit("cloned", h, e3.item, "copy")), f = e3.source, s = e3.item, v = p = Z(e3.item), w.dragging = true, w.emit("drag", s, f);
              }
              function O() {
                var e3;
                w.dragging && _(e3 = h || s, Q(e3));
              }
              function I() {
                a(!(i = false)), b(true);
              }
              function N(e3) {
                var t3, n3;
                I(), w.dragging && (t3 = h || s, n3 = ee("clientX", e3) || 0, e3 = ee("clientY", e3) || 0, (e3 = B(H(l, n3, e3), n3, e3)) && (h && y.copySortSource || !h || e3 !== f) ? _(t3, e3) : (y.removeOnSpill ? X : L)());
              }
              function _(e3, t3) {
                var n3 = Q(e3);
                h && y.copySortSource && t3 === f && n3.removeChild(s), A(t3) ? w.emit("cancel", e3, f, f) : w.emit("drop", e3, t3, f, p), Y();
              }
              function X() {
                var e3, t3;
                w.dragging && ((t3 = Q(e3 = h || s)) && t3.removeChild(e3), w.emit(h ? "cancel" : "remove", e3, t3, f), Y());
              }
              function L(e3) {
                var t3, n3, o2;
                w.dragging && (t3 = 0 < arguments.length ? e3 : y.revertOnSpill, false === (e3 = A(o2 = Q(n3 = h || s))) && t3 && (h ? o2 && o2.removeChild(h) : f.insertBefore(n3, v)), e3 || t3 ? w.emit("cancel", n3, f, f) : w.emit("drop", n3, o2, f, p), Y());
              }
              function Y() {
                var e3 = h || s;
                I(), l && (j.rm(y.mirrorContainer, "gu-unselectable"), U(q, "remove", "mousemove", P), Q(l).removeChild(l), l = null), e3 && j.rm(e3, "gu-transit"), n2 && clearTimeout(n2), w.dragging = false, g && w.emit("out", e3, g, f), w.emit("dragend", e3), f = s = h = v = p = n2 = g = null;
              }
              function A(e3, t3) {
                t3 = void 0 !== t3 ? t3 : l ? p : Z(h || s);
                return e3 === f && t3 === v;
              }
              function B(t3, n3, o2) {
                for (var r3 = t3; r3 && !(function() {
                  if (false === u(r3)) return false;
                  var e3 = D(r3, t3), e3 = F(r3, e3, n3, o2);
                  if (A(r3, e3)) return true;
                  return y.accepts(s, r3, f, e3);
                })(); ) r3 = Q(r3);
                return r3;
              }
              function P(e3) {
                if (l) {
                  e3.preventDefault();
                  var t3 = ee("clientX", e3) || 0, n3 = ee("clientY", e3) || 0, o2 = t3 - d, r3 = n3 - m;
                  l.style.left = o2 + "px", l.style.top = r3 + "px";
                  var i2 = h || s, e3 = H(l, t3, n3), o2 = B(e3, t3, n3), u2 = null !== o2 && o2 !== g;
                  !u2 && null !== o2 || (g && a2("out"), g = o2, u2 && a2("over"));
                  r3 = Q(i2);
                  if (o2 !== f || !h || y.copySortSource) {
                    var c2, e3 = D(o2, e3);
                    if (null !== e3) c2 = F(o2, e3, t3, n3);
                    else {
                      if (true !== y.revertOnSpill || h) return void (h && r3 && r3.removeChild(i2));
                      c2 = v, o2 = f;
                    }
                    (null === c2 && u2 || c2 !== i2 && c2 !== Z(i2)) && (p = c2, o2.insertBefore(i2, c2), w.emit("shadow", i2, o2, f));
                  } else r3 && r3.removeChild(i2);
                }
                function a2(e4) {
                  w.emit(e4, i2, g, f);
                }
              }
              function D(e3, t3) {
                for (var n3 = t3; n3 !== e3 && Q(n3) !== e3; ) n3 = Q(n3);
                return n3 === q ? null : n3;
              }
              function F(r3, t3, i2, u2) {
                var c2 = "horizontal" === y.direction;
                return (t3 !== r3 ? function() {
                  var e3 = t3.getBoundingClientRect();
                  if (c2) return n3(i2 > e3.left + G(e3) / 2);
                  return n3(u2 > e3.top + J(e3) / 2);
                } : function() {
                  var e3, t4, n4, o2 = r3.children.length;
                  for (e3 = 0; e3 < o2; e3++) {
                    if (t4 = r3.children[e3], n4 = t4.getBoundingClientRect(), c2 && n4.left + n4.width / 2 > i2) return t4;
                    if (!c2 && n4.top + n4.height / 2 > u2) return t4;
                  }
                  return null;
                })();
                function n3(e3) {
                  return e3 ? Z(t3) : t3;
                }
              }
            };
          }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, { "./classes": 1, "contra/emitter": 5, crossvent: 6 }], 3: [function(e, t, n) {
          t.exports = function(e2, t2) {
            return Array.prototype.slice.call(e2, t2);
          };
        }, {}], 4: [function(e, t, n) {
          "use strict";
          var o = e("ticky");
          t.exports = function(e2, t2, n2) {
            e2 && o(function() {
              e2.apply(n2 || null, t2 || []);
            });
          };
        }, { ticky: 10 }], 5: [function(e, t, n) {
          "use strict";
          var c = e("atoa"), a = e("./debounce");
          t.exports = function(r, e2) {
            var i = e2 || {}, u = {};
            return void 0 === r && (r = {}), r.on = function(e3, t2) {
              return u[e3] ? u[e3].push(t2) : u[e3] = [t2], r;
            }, r.once = function(e3, t2) {
              return t2._once = true, r.on(e3, t2), r;
            }, r.off = function(e3, t2) {
              var n2 = arguments.length;
              if (1 === n2) delete u[e3];
              else if (0 === n2) u = {};
              else {
                e3 = u[e3];
                if (!e3) return r;
                e3.splice(e3.indexOf(t2), 1);
              }
              return r;
            }, r.emit = function() {
              var e3 = c(arguments);
              return r.emitterSnapshot(e3.shift()).apply(this, e3);
            }, r.emitterSnapshot = function(o) {
              var e3 = (u[o] || []).slice(0);
              return function() {
                var t2 = c(arguments), n2 = this || r;
                if ("error" === o && false !== i.throws && !e3.length) throw 1 === t2.length ? t2[0] : t2;
                return e3.forEach(function(e4) {
                  i.async ? a(e4, t2, n2) : e4.apply(n2, t2), e4._once && r.off(o, e4);
                }), r;
              };
            }, r;
          };
        }, { "./debounce": 4, atoa: 3 }], 6: [function(n, o, e) {
          (function(r) {
            "use strict";
            var i = n("custom-event"), u = n("./eventmap"), c = r.document, e2 = function(e3, t2, n2, o2) {
              return e3.addEventListener(t2, n2, o2);
            }, t = function(e3, t2, n2, o2) {
              return e3.removeEventListener(t2, n2, o2);
            }, a = [];
            function l(e3, t2, n2) {
              t2 = (function(e4, t3, n3) {
                var o2, r2;
                for (o2 = 0; o2 < a.length; o2++) if ((r2 = a[o2]).element === e4 && r2.type === t3 && r2.fn === n3) return o2;
              })(e3, t2, n2);
              if (t2) {
                n2 = a[t2].wrapper;
                return a.splice(t2, 1), n2;
              }
            }
            r.addEventListener || (e2 = function(e3, t2, n2) {
              return e3.attachEvent("on" + t2, (function(e4, t3, n3) {
                var o2 = l(e4, t3, n3) || /* @__PURE__ */ (function(n4, o3) {
                  return function(e5) {
                    var t4 = e5 || r.event;
                    t4.target = t4.target || t4.srcElement, t4.preventDefault = t4.preventDefault || function() {
                      t4.returnValue = false;
                    }, t4.stopPropagation = t4.stopPropagation || function() {
                      t4.cancelBubble = true;
                    }, t4.which = t4.which || t4.keyCode, o3.call(n4, t4);
                  };
                })(e4, n3);
                return a.push({ wrapper: o2, element: e4, type: t3, fn: n3 }), o2;
              })(e3, t2, n2));
            }, t = function(e3, t2, n2) {
              n2 = l(e3, t2, n2);
              if (n2) return e3.detachEvent("on" + t2, n2);
            }), o.exports = { add: e2, remove: t, fabricate: function(e3, t2, n2) {
              var o2 = -1 === u.indexOf(t2) ? new i(t2, { detail: n2 }) : (function() {
                var e4;
                c.createEvent ? (e4 = c.createEvent("Event")).initEvent(t2, true, true) : c.createEventObject && (e4 = c.createEventObject());
                return e4;
              })();
              e3.dispatchEvent ? e3.dispatchEvent(o2) : e3.fireEvent("on" + t2, o2);
            } };
          }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, { "./eventmap": 7, "custom-event": 8 }], 7: [function(e, r, t) {
          (function(e2) {
            "use strict";
            var t2 = [], n = "", o = /^on/;
            for (n in e2) o.test(n) && t2.push(n.slice(2));
            r.exports = t2;
          }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {}], 8: [function(e, n, t) {
          (function(e2) {
            var t2 = e2.CustomEvent;
            n.exports = (function() {
              try {
                var e3 = new t2("cat", { detail: { foo: "bar" } });
                return "cat" === e3.type && "bar" === e3.detail.foo;
              } catch (e4) {
              }
            })() ? t2 : "undefined" != typeof document && "function" == typeof document.createEvent ? function(e3, t3) {
              var n2 = document.createEvent("CustomEvent");
              return t3 ? n2.initCustomEvent(e3, t3.bubbles, t3.cancelable, t3.detail) : n2.initCustomEvent(e3, false, false, void 0), n2;
            } : function(e3, t3) {
              var n2 = document.createEventObject();
              return n2.type = e3, t3 ? (n2.bubbles = Boolean(t3.bubbles), n2.cancelable = Boolean(t3.cancelable), n2.detail = t3.detail) : (n2.bubbles = false, n2.cancelable = false, n2.detail = void 0), n2;
            };
          }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {}], 9: [function(e, t, n) {
          var o, r, t = t.exports = {};
          function i() {
            throw new Error("setTimeout has not been defined");
          }
          function u() {
            throw new Error("clearTimeout has not been defined");
          }
          function c(t2) {
            if (o === setTimeout) return setTimeout(t2, 0);
            if ((o === i || !o) && setTimeout) return o = setTimeout, setTimeout(t2, 0);
            try {
              return o(t2, 0);
            } catch (e2) {
              try {
                return o.call(null, t2, 0);
              } catch (e3) {
                return o.call(this, t2, 0);
              }
            }
          }
          !(function() {
            try {
              o = "function" == typeof setTimeout ? setTimeout : i;
            } catch (e2) {
              o = i;
            }
            try {
              r = "function" == typeof clearTimeout ? clearTimeout : u;
            } catch (e2) {
              r = u;
            }
          })();
          var a, l = [], f = false, s = -1;
          function d() {
            f && a && (f = false, a.length ? l = a.concat(l) : s = -1, l.length && m());
          }
          function m() {
            if (!f) {
              var e2 = c(d);
              f = true;
              for (var t2 = l.length; t2; ) {
                for (a = l, l = []; ++s < t2; ) a && a[s].run();
                s = -1, t2 = l.length;
              }
              a = null, f = false, (function(t3) {
                if (r === clearTimeout) return clearTimeout(t3);
                if ((r === u || !r) && clearTimeout) return r = clearTimeout, clearTimeout(t3);
                try {
                  r(t3);
                } catch (e3) {
                  try {
                    return r.call(null, t3);
                  } catch (e4) {
                    return r.call(this, t3);
                  }
                }
              })(e2);
            }
          }
          function v(e2, t2) {
            this.fun = e2, this.array = t2;
          }
          function p() {
          }
          t.nextTick = function(e2) {
            var t2 = new Array(arguments.length - 1);
            if (1 < arguments.length) for (var n2 = 1; n2 < arguments.length; n2++) t2[n2 - 1] = arguments[n2];
            l.push(new v(e2, t2)), 1 !== l.length || f || c(m);
          }, v.prototype.run = function() {
            this.fun.apply(null, this.array);
          }, t.title = "browser", t.browser = true, t.env = {}, t.argv = [], t.version = "", t.versions = {}, t.on = p, t.addListener = p, t.once = p, t.off = p, t.removeListener = p, t.removeAllListeners = p, t.emit = p, t.prependListener = p, t.prependOnceListener = p, t.listeners = function(e2) {
            return [];
          }, t.binding = function(e2) {
            throw new Error("process.binding is not supported");
          }, t.cwd = function() {
            return "/";
          }, t.chdir = function(e2) {
            throw new Error("process.chdir is not supported");
          }, t.umask = function() {
            return 0;
          };
        }, {}], 10: [function(e, n, t) {
          (function(t2) {
            var e2 = "function" == typeof t2 ? function(e3) {
              t2(e3);
            } : function(e3) {
              setTimeout(e3, 0);
            };
            n.exports = e2;
          }).call(this, e("timers").setImmediate);
        }, { timers: 11 }], 11: [function(a, e, l) {
          (function(e2, t) {
            var o = a("process/browser.js").nextTick, n = Function.prototype.apply, r = Array.prototype.slice, i = {}, u = 0;
            function c(e3, t2) {
              this._id = e3, this._clearFn = t2;
            }
            l.setTimeout = function() {
              return new c(n.call(setTimeout, window, arguments), clearTimeout);
            }, l.setInterval = function() {
              return new c(n.call(setInterval, window, arguments), clearInterval);
            }, l.clearTimeout = l.clearInterval = function(e3) {
              e3.close();
            }, c.prototype.unref = c.prototype.ref = function() {
            }, c.prototype.close = function() {
              this._clearFn.call(window, this._id);
            }, l.enroll = function(e3, t2) {
              clearTimeout(e3._idleTimeoutId), e3._idleTimeout = t2;
            }, l.unenroll = function(e3) {
              clearTimeout(e3._idleTimeoutId), e3._idleTimeout = -1;
            }, l._unrefActive = l.active = function(e3) {
              clearTimeout(e3._idleTimeoutId);
              var t2 = e3._idleTimeout;
              0 <= t2 && (e3._idleTimeoutId = setTimeout(function() {
                e3._onTimeout && e3._onTimeout();
              }, t2));
            }, l.setImmediate = "function" == typeof e2 ? e2 : function(e3) {
              var t2 = u++, n2 = !(arguments.length < 2) && r.call(arguments, 1);
              return i[t2] = true, o(function() {
                i[t2] && (n2 ? e3.apply(null, n2) : e3.call(null), l.clearImmediate(t2));
              }), t2;
            }, l.clearImmediate = "function" == typeof t ? t : function(e3) {
              delete i[e3];
            };
          }).call(this, a("timers").setImmediate, a("timers").clearImmediate);
        }, { "process/browser.js": 9, timers: 11 }] }, {}, [2])(2);
      });
    }
  });

  // viewerjs/viewer.min.js
  var require_viewer_min = __commonJS({
    "viewerjs/viewer.min.js"(exports, module) {
      ((t, e) => {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).Viewer = e();
      })(exports, function() {
        function n(t2, e2) {
          for (var i2 = 0; i2 < e2.length; i2++) {
            var n2 = e2[i2];
            n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(t2, r(n2.key), n2);
          }
        }
        function s(e2, t2) {
          var i2, n2 = Object.keys(e2);
          return Object.getOwnPropertySymbols && (i2 = Object.getOwnPropertySymbols(e2), t2 && (i2 = i2.filter(function(t3) {
            return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
          })), n2.push.apply(n2, i2)), n2;
        }
        function P(n2) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = null != arguments[t2] ? arguments[t2] : {};
            t2 % 2 ? s(Object(o2), true).forEach(function(t3) {
              var e2, i2;
              e2 = n2, i2 = o2[t3 = t3], (t3 = r(t3)) in e2 ? Object.defineProperty(e2, t3, { value: i2, enumerable: true, configurable: true, writable: true }) : e2[t3] = i2;
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n2, Object.getOwnPropertyDescriptors(o2)) : s(Object(o2)).forEach(function(t3) {
              Object.defineProperty(n2, t3, Object.getOwnPropertyDescriptor(o2, t3));
            });
          }
          return n2;
        }
        function r(t2) {
          t2 = ((t3, e2) => {
            if ("object" != typeof t3 || !t3) return t3;
            var i2 = t3[Symbol.toPrimitive];
            if (void 0 === i2) return ("string" === e2 ? String : Number)(t3);
            if ("object" != typeof (i2 = i2.call(t3, e2 || "default"))) return i2;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          })(t2, "string");
          return "symbol" == typeof t2 ? t2 : t2 + "";
        }
        function l(t2) {
          return (l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        var W = { backdrop: true, button: true, navbar: true, title: true, toolbar: true, className: "", container: "body", filter: null, fullscreen: true, inheritedAttributes: ["crossOrigin", "decoding", "isMap", "loading", "referrerPolicy", "sizes", "srcset", "useMap"], initialCoverage: 0.9, initialViewIndex: 0, inline: false, interval: 5e3, keyboard: true, focus: true, loading: true, loop: true, minWidth: 200, minHeight: 100, movable: true, rotatable: true, scalable: true, zoomable: true, zoomOnTouch: true, zoomOnWheel: true, slideOnTouch: true, toggleOnDblclick: true, tooltip: true, transition: true, zIndex: 2015, zIndexInline: 0, zoomRatio: 0.1, minZoomRatio: 0.01, maxZoomRatio: 100, url: "src", ready: null, show: null, shown: null, hide: null, hidden: null, view: null, viewed: null, move: null, moved: null, rotate: null, rotated: null, scale: null, scaled: null, zoom: null, zoomed: null, play: null, stop: null }, t = "undefined" != typeof window && void 0 !== window.document, e = t ? window : {}, a = !(!t || !e.document.documentElement) && "ontouchstart" in e.document.documentElement, i = t && "PointerEvent" in e, g = "viewer", h = "move", j = "switch", c = "zoom", f = "".concat(g, "-active"), H = "".concat(g, "-close"), B = "".concat(g, "-fade"), V = "".concat(g, "-fixed"), U = "".concat(g, "-fullscreen"), K = "".concat(g, "-fullscreen-exit"), v = "".concat(g, "-hide"), Z = "".concat(g, "-hide-md-down"), $ = "".concat(g, "-hide-sm-down"), _ = "".concat(g, "-hide-xs-down"), u = "".concat(g, "-in"), p = "".concat(g, "-invisible"), b = "".concat(g, "-loading"), G = "".concat(g, "-move"), J = "".concat(g, "-open"), d = "".concat(g, "-show"), m = "".concat(g, "-transition"), w = "click", Q = "dblclick", tt = "dragstart", et = "focusin", it = "keydown", y = "load", x = "error", nt = i ? "pointerdown" : a ? "touchstart" : "mousedown", ot = i ? "pointermove" : a ? "touchmove" : "mousemove", st = i ? "pointerup pointercancel" : a ? "touchend touchcancel" : "mouseup", at = "resize", k = "transitionend", rt = "wheel", z = "viewed", lt = "rotated", ht = "".concat(g, "Action"), ct = /\s\s*/, ut = ["zoom-in", "zoom-out", "one-to-one", "reset", "prev", "play", "next", "rotate-left", "rotate-right", "flip-horizontal", "flip-vertical"];
        function T(t2) {
          return "string" == typeof t2;
        }
        var dt = Number.isNaN || e.isNaN;
        function E(t2) {
          return "number" == typeof t2 && !dt(t2);
        }
        function D(t2) {
          return void 0 === t2;
        }
        function o(t2) {
          return "object" === l(t2) && null !== t2;
        }
        var mt = Object.prototype.hasOwnProperty;
        function S(t2) {
          if (!o(t2)) return false;
          try {
            var e2 = t2.constructor, i2 = e2.prototype;
            return e2 && i2 && mt.call(i2, "isPrototypeOf");
          } catch (t3) {
            return false;
          }
        }
        function I(t2) {
          return "function" == typeof t2;
        }
        function A(e2, i2) {
          if (e2 && I(i2)) if (Array.isArray(e2) || E(e2.length)) for (var t2 = e2.length, n2 = 0; n2 < t2 && false !== i2.call(e2, e2[n2], n2, e2); n2 += 1) ;
          else o(e2) && Object.keys(e2).forEach(function(t3) {
            i2.call(e2, e2[t3], t3, e2);
          });
        }
        var O = Object.assign || function(i2) {
          for (var t2 = arguments.length, e2 = new Array(1 < t2 ? t2 - 1 : 0), n2 = 1; n2 < t2; n2++) e2[n2 - 1] = arguments[n2];
          return o(i2) && 0 < e2.length && e2.forEach(function(e3) {
            o(e3) && Object.keys(e3).forEach(function(t3) {
              i2[t3] = e3[t3];
            });
          }), i2;
        }, gt = /^(?:width|height|left|top|marginLeft|marginTop)$/;
        function C(t2, e2) {
          var i2 = t2.style;
          A(e2, function(t3, e3) {
            gt.test(e3) && E(t3) && (t3 += "px"), i2[e3] = t3;
          });
        }
        function L(t2, e2) {
          return t2 && e2 && (t2.classList ? t2.classList.contains(e2) : -1 < t2.className.indexOf(e2));
        }
        function R(t2, e2) {
          var i2;
          t2 && e2 && (E(t2.length) ? A(t2, function(t3) {
            R(t3, e2);
          }) : t2.classList ? t2.classList.add(e2) : (i2 = t2.className.trim()) ? i2.indexOf(e2) < 0 && (t2.className = "".concat(i2, " ").concat(e2)) : t2.className = e2);
        }
        function M(t2, e2) {
          t2 && e2 && (E(t2.length) ? A(t2, function(t3) {
            M(t3, e2);
          }) : t2.classList ? t2.classList.remove(e2) : 0 <= t2.className.indexOf(e2) && (t2.className = t2.className.replace(e2, "")));
        }
        function F(t2, e2, i2) {
          e2 && (E(t2.length) ? A(t2, function(t3) {
            F(t3, e2, i2);
          }) : (i2 ? R : M)(t2, e2));
        }
        var ft = /([a-z\d])([A-Z])/g;
        function vt(t2) {
          return t2.replace(ft, "$1-$2").toLowerCase();
        }
        function N(t2, e2) {
          return o(t2[e2]) ? t2[e2] : t2.dataset ? t2.dataset[e2] : t2.getAttribute("data-".concat(vt(e2)));
        }
        function pt(t2, e2, i2) {
          o(i2) ? t2[e2] = i2 : t2.dataset ? t2.dataset[e2] = i2 : t2.setAttribute("data-".concat(vt(e2)), i2);
        }
        wt = false, t && (bt = false, i = function() {
        }, t = Object.defineProperty({}, "once", { get: function() {
          return wt = true, bt;
        }, set: function(t2) {
          bt = t2;
        } }), e.addEventListener("test", i, t), e.removeEventListener("test", i, t));
        var bt, wt, yt = wt;
        function Y(i2, t2, n2, e2) {
          var o2 = 3 < arguments.length && void 0 !== e2 ? e2 : {}, s2 = n2;
          t2.trim().split(ct).forEach(function(t3) {
            var e3;
            yt || (e3 = i2.listeners) && e3[t3] && e3[t3][n2] && (s2 = e3[t3][n2], delete e3[t3][n2], 0 === Object.keys(e3[t3]).length && delete e3[t3], 0 === Object.keys(e3).length) && delete i2.listeners, i2.removeEventListener(t3, s2, o2);
          });
        }
        function X(s2, t2, a2, e2) {
          var r2 = 3 < arguments.length && void 0 !== e2 ? e2 : {}, l2 = a2;
          t2.trim().split(ct).forEach(function(n2) {
            var t3, o2;
            r2.once && !yt && (t3 = s2.listeners, l2 = function() {
              delete o2[n2][a2], s2.removeEventListener(n2, l2, r2);
              for (var t4 = arguments.length, e3 = new Array(t4), i2 = 0; i2 < t4; i2++) e3[i2] = arguments[i2];
              a2.apply(s2, e3);
            }, (o2 = void 0 === t3 ? {} : t3)[n2] || (o2[n2] = {}), o2[n2][a2] && s2.removeEventListener(n2, o2[n2][a2], r2), o2[n2][a2] = l2, s2.listeners = o2), s2.addEventListener(n2, l2, r2);
          });
        }
        function q(t2, e2, i2, n2) {
          var o2;
          return I(Event) && I(CustomEvent) ? o2 = new CustomEvent(e2, P({ bubbles: true, cancelable: true, detail: i2 }, n2)) : (o2 = document.createEvent("CustomEvent")).initCustomEvent(e2, true, true, i2), t2.dispatchEvent(o2);
        }
        function xt(t2) {
          var e2 = t2.rotate, i2 = t2.scaleX, n2 = t2.scaleY, o2 = t2.translateX, t2 = t2.translateY, s2 = [], o2 = (E(o2) && 0 !== o2 && s2.push("translateX(".concat(o2, "px)")), E(t2) && 0 !== t2 && s2.push("translateY(".concat(t2, "px)")), E(e2) && 0 !== e2 && s2.push("rotate(".concat(e2, "deg)")), E(i2) && 1 !== i2 && s2.push("scaleX(".concat(i2, ")")), E(n2) && 1 !== n2 && s2.push("scaleY(".concat(n2, ")")), s2.length ? s2.join(" ") : "none");
          return { WebkitTransform: o2, msTransform: o2, transform: o2 };
        }
        var kt = e.navigator && /Version\/\d+(\.\d+)+?\s+Safari/i.test(e.navigator.userAgent);
        function zt(i2, t2, e2) {
          var n2, o2 = document.createElement("img");
          return i2.naturalWidth && !kt ? e2(i2.naturalWidth, i2.naturalHeight) : (n2 = document.body || document.documentElement, o2.onload = function() {
            e2(o2.width, o2.height), kt || n2.removeChild(o2);
          }, A(t2.inheritedAttributes, function(t3) {
            var e3 = i2.getAttribute(t3);
            null !== e3 && o2.setAttribute(t3, e3);
          }), o2.src = i2.src, kt || (o2.style.cssText = "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;", n2.appendChild(o2))), o2;
        }
        function Tt(t2) {
          switch (t2) {
            case 2:
              return _;
            case 3:
              return $;
            case 4:
              return Z;
            default:
              return "";
          }
        }
        function Et(t2, e2) {
          var i2 = t2.pageX, t2 = t2.pageY, n2 = { endX: i2, endY: t2 };
          return e2 ? n2 : P({ timeStamp: Date.now(), startX: i2, startY: t2 }, n2);
        }
        var Dt, i = { render: function() {
          this.initContainer(), this.initViewer(), this.initList(), this.renderViewer();
        }, initBody: function() {
          var t2 = this.element.ownerDocument, e2 = t2.body || t2.documentElement;
          this.body = e2, this.scrollbarWidth = window.innerWidth - t2.documentElement.clientWidth, this.initialBodyPaddingRight = e2.style.paddingRight, this.initialBodyComputedPaddingRight = window.getComputedStyle(e2).paddingRight;
        }, initContainer: function() {
          this.containerData = { width: window.innerWidth, height: window.innerHeight };
        }, initViewer: function() {
          var t2, e2 = this.options, i2 = this.parent;
          e2.inline && (t2 = { width: Math.max(i2.offsetWidth, e2.minWidth), height: Math.max(i2.offsetHeight, e2.minHeight) }, this.parentData = t2), !this.fulled && t2 || (t2 = this.containerData), this.viewerData = O({}, t2);
        }, renderViewer: function() {
          this.options.inline && !this.fulled && C(this.viewer, this.viewerData);
        }, initList: function() {
          var r2 = this, t2 = this.element, l2 = this.options, h2 = this.list, c2 = [];
          h2.innerHTML = "", A(this.images, function(i2, t3) {
            var e2, n2, o2 = i2.src, s2 = i2.alt || (T(s2 = o2) ? decodeURIComponent(s2.replace(/^.*\//, "").replace(/[?&#].*$/, "")) : ""), a2 = r2.getImageURL(i2);
            (o2 || a2) && (e2 = document.createElement("li"), n2 = document.createElement("img"), A(l2.inheritedAttributes, function(t4) {
              var e3 = i2.getAttribute(t4);
              null !== e3 && n2.setAttribute(t4, e3);
            }), l2.navbar && (n2.src = o2 || a2), n2.alt = s2, n2.setAttribute("data-original-url", a2 || o2), e2.setAttribute("data-index", t3), e2.setAttribute("data-viewer-action", "view"), e2.setAttribute("role", "button"), l2.keyboard && e2.setAttribute("tabindex", 0), e2.appendChild(n2), h2.appendChild(e2), c2.push(e2));
          }), A(this.items = c2, function(e2) {
            var t3, i2, n2 = e2.firstElementChild;
            pt(n2, "filled", true), l2.loading && R(e2, b), X(n2, y, t3 = function(t4) {
              Y(n2, x, i2), l2.loading && M(e2, b), r2.loadImage(t4);
            }, { once: true }), X(n2, x, i2 = function() {
              Y(n2, y, t3), l2.loading && M(e2, b);
            }, { once: true });
          }), l2.transition && X(t2, z, function() {
            R(h2, m);
          }, { once: true });
        }, renderList: function() {
          var t2, e2, i2 = this.index, n2 = this.items[i2];
          n2 && (t2 = n2.nextElementSibling, t2 = parseInt(window.getComputedStyle(t2 || n2).marginLeft, 10), n2 = n2.offsetWidth, C(this.list, O({ width: (e2 = n2 + t2) * this.length - t2 }, xt({ translateX: (this.viewerData.width - n2) / 2 - e2 * i2 }))));
        }, resetList: function() {
          var t2 = this.list;
          t2.innerHTML = "", M(t2, m), C(t2, xt({ translateX: 0 }));
        }, initImage: function(r2) {
          var t2, l2 = this, h2 = this.options, e2 = this.image, i2 = this.viewerData, n2 = this.footer.offsetHeight, c2 = i2.width, u2 = Math.max(i2.height - n2, n2), d2 = this.imageData || {};
          this.imageInitializing = { abort: function() {
            t2.onload = null;
          } }, t2 = zt(e2, h2, function(t3, e3) {
            var i3 = t3 / e3, n3 = Math.max(0, Math.min(1, h2.initialCoverage)), o2 = c2, s2 = u2, n3 = (l2.imageInitializing = false, c2 < u2 * i3 ? s2 = c2 / i3 : o2 = u2 * i3, n3 = E(n3) ? n3 : 0.9, o2 = Math.min(o2 * n3, t3), s2 = Math.min(s2 * n3, e3), (c2 - o2) / 2), a2 = (u2 - s2) / 2, n3 = { left: n3, top: a2, x: n3, y: a2, width: o2, height: s2, oldRatio: 1, ratio: o2 / t3, aspectRatio: i3, naturalWidth: t3, naturalHeight: e3 }, a2 = O({}, n3);
            h2.rotatable && (n3.rotate = d2.rotate || 0, a2.rotate = 0), h2.scalable && (n3.scaleX = d2.scaleX || 1, n3.scaleY = d2.scaleY || 1, a2.scaleX = 1, a2.scaleY = 1), l2.imageData = n3, l2.initialImageData = a2, r2 && r2();
          });
        }, renderImage: function(t2) {
          var e2, i2 = this, n2 = this.image, o2 = this.imageData;
          C(n2, O({ width: o2.width, height: o2.height, marginLeft: o2.x, marginTop: o2.y }, xt(o2))), t2 && ((this.viewing || this.moving || this.rotating || this.scaling || this.zooming) && this.options.transition && L(n2, m) ? (e2 = function() {
            i2.imageRendering = false, t2();
          }, this.imageRendering = { abort: function() {
            Y(n2, k, e2);
          } }, X(n2, k, e2, { once: true })) : t2());
        }, resetImage: function() {
          var t2 = this.image;
          t2 && (this.viewing && this.viewing.abort(), t2.parentNode.removeChild(t2), this.image = null, this.title.innerHTML = "");
        } }, t = { bind: function() {
          var t2 = this.options, e2 = this.viewer, i2 = this.canvas, n2 = this.element.ownerDocument;
          X(e2, w, this.onClick = this.click.bind(this)), X(e2, tt, this.onDragStart = this.dragstart.bind(this)), X(i2, nt, this.onPointerDown = this.pointerdown.bind(this)), X(n2, ot, this.onPointerMove = this.pointermove.bind(this)), X(n2, st, this.onPointerUp = this.pointerup.bind(this)), X(n2, it, this.onKeyDown = this.keydown.bind(this)), X(window, at, this.onResize = this.resize.bind(this)), t2.zoomable && t2.zoomOnWheel && X(e2, rt, this.onWheel = this.wheel.bind(this), { passive: false, capture: true }), t2.toggleOnDblclick && X(i2, Q, this.onDblclick = this.dblclick.bind(this));
        }, unbind: function() {
          var t2 = this.options, e2 = this.viewer, i2 = this.canvas, n2 = this.element.ownerDocument;
          Y(e2, w, this.onClick), Y(e2, tt, this.onDragStart), Y(i2, nt, this.onPointerDown), Y(n2, ot, this.onPointerMove), Y(n2, st, this.onPointerUp), Y(n2, it, this.onKeyDown), Y(window, at, this.onResize), t2.zoomable && t2.zoomOnWheel && Y(e2, rt, this.onWheel, { passive: false, capture: true }), t2.toggleOnDblclick && Y(i2, Q, this.onDblclick);
        } }, St = { click: function(t2) {
          var e2 = this.options, i2 = this.imageData, n2 = t2.target, o2 = N(n2, ht);
          switch (o2 || "img" !== n2.localName || "li" !== n2.parentElement.localName || (o2 = N(n2 = n2.parentElement, ht)), a && t2.isTrusted && n2 === this.canvas && clearTimeout(this.clickCanvasTimeout), o2) {
            case "mix":
              this.played ? this.stop() : e2.inline ? this.fulled ? this.exit() : this.full() : this.hide();
              break;
            case "hide":
              this.pointerMoved || this.hide();
              break;
            case "view":
              this.view(N(n2, "index"));
              break;
            case "zoom-in":
              this.zoom(0.1, true);
              break;
            case "zoom-out":
              this.zoom(-0.1, true);
              break;
            case "one-to-one":
              this.toggle();
              break;
            case "reset":
              this.reset();
              break;
            case "prev":
              this.prev(e2.loop);
              break;
            case "play":
              this.play(e2.fullscreen);
              break;
            case "next":
              this.next(e2.loop);
              break;
            case "rotate-left":
              this.rotate(-90);
              break;
            case "rotate-right":
              this.rotate(90);
              break;
            case "flip-horizontal":
              this.scaleX(-i2.scaleX || -1);
              break;
            case "flip-vertical":
              this.scaleY(-i2.scaleY || -1);
              break;
            default:
              this.played && this.stop();
          }
        }, dblclick: function(t2) {
          t2.preventDefault(), this.viewed && t2.target === this.image && (a && t2.isTrusted && clearTimeout(this.doubleClickImageTimeout), this.toggle(t2.isTrusted ? t2 : t2.detail && t2.detail.originalEvent));
        }, load: function() {
          var t2 = this, e2 = (this.timeout && (clearTimeout(this.timeout), this.timeout = false), this.element), i2 = this.options, n2 = this.image, o2 = this.index, s2 = this.viewerData;
          M(n2, p), i2.loading && M(this.canvas, b), n2.style.cssText = "height:0;" + "margin-left:".concat(s2.width / 2, "px;") + "margin-top:".concat(s2.height / 2, "px;") + "max-width:none!important;position:relative;width:0;", this.initImage(function() {
            F(n2, G, i2.movable), F(n2, m, i2.transition), t2.renderImage(function() {
              t2.viewed = true, t2.viewing = false, I(i2.viewed) && X(e2, z, i2.viewed, { once: true }), q(e2, z, { originalImage: t2.images[o2], index: o2, image: n2 }, { cancelable: false });
            });
          });
        }, loadImage: function(t2) {
          var n2 = t2.target, t2 = n2.parentNode, o2 = t2.offsetWidth || 30, s2 = t2.offsetHeight || 50, a2 = !!N(n2, "filled");
          zt(n2, this.options, function(t3, e2) {
            var t3 = t3 / e2, e2 = o2, i2 = s2;
            o2 < s2 * t3 ? a2 ? e2 = s2 * t3 : i2 = o2 / t3 : a2 ? i2 = o2 / t3 : e2 = s2 * t3, C(n2, O({ width: e2, height: i2 }, xt({ translateX: (o2 - e2) / 2, translateY: (s2 - i2) / 2 })));
          });
        }, keydown: function(t2) {
          var e2 = this.options;
          if (e2.keyboard) {
            var i2 = t2.keyCode || t2.which || t2.charCode;
            if (13 === i2 && this.viewer.contains(t2.target) && this.click(t2), this.fulled) switch (i2) {
              case 27:
                this.played ? this.stop() : e2.inline ? this.fulled && this.exit() : this.hide();
                break;
              case 32:
                this.played && this.stop();
                break;
              case 37:
                this.played && this.playing ? this.playing.prev() : this.prev(e2.loop);
                break;
              case 38:
                t2.preventDefault(), this.zoom(e2.zoomRatio, true);
                break;
              case 39:
                this.played && this.playing ? this.playing.next() : this.next(e2.loop);
                break;
              case 40:
                t2.preventDefault(), this.zoom(-e2.zoomRatio, true);
                break;
              case 48:
              case 49:
                t2.ctrlKey && (t2.preventDefault(), this.toggle());
            }
          }
        }, dragstart: function(t2) {
          "img" === t2.target.localName && t2.preventDefault();
        }, pointerdown: function(t2) {
          var e2 = this.options, i2 = this.pointers, n2 = t2.buttons, o2 = t2.button;
          this.pointerMoved = false, !this.viewed || this.showing || this.viewing || this.hiding || ("mousedown" === t2.type || "pointerdown" === t2.type && "mouse" === t2.pointerType) && (E(n2) && 1 !== n2 || E(o2) && 0 !== o2 || t2.ctrlKey) || (t2.preventDefault(), t2.changedTouches ? A(t2.changedTouches, function(t3) {
            i2[t3.identifier] = Et(t3);
          }) : i2[t2.pointerId || 0] = Et(t2), n2 = !!e2.movable && h, e2.zoomOnTouch && e2.zoomable && 1 < Object.keys(i2).length ? n2 = c : e2.slideOnTouch && ("touch" === t2.pointerType || "touchstart" === t2.type) && this.isSwitchable() && (n2 = j), !e2.transition || n2 !== h && n2 !== c || M(this.image, m), this.action = n2);
        }, pointermove: function(t2) {
          var e2 = this.pointers, i2 = this.action;
          this.viewed && i2 && (t2.preventDefault(), t2.changedTouches ? A(t2.changedTouches, function(t3) {
            O(e2[t3.identifier] || {}, Et(t3, true));
          }) : O(e2[t2.pointerId || 0] || {}, Et(t2, true)), this.change(t2));
        }, pointerup: function(t2) {
          var e2, i2 = this, n2 = this.options, o2 = this.action, s2 = this.pointers;
          t2.changedTouches ? A(t2.changedTouches, function(t3) {
            e2 = s2[t3.identifier], delete s2[t3.identifier];
          }) : (e2 = s2[t2.pointerId || 0], delete s2[t2.pointerId || 0]), o2 && (t2.preventDefault(), !n2.transition || o2 !== h && o2 !== c || R(this.image, m), this.action = false, a) && o2 !== c && e2 && Date.now() - e2.timeStamp < 500 && (clearTimeout(this.clickCanvasTimeout), clearTimeout(this.doubleClickImageTimeout), n2.toggleOnDblclick && this.viewed && t2.target === this.image ? this.imageClicked ? (this.imageClicked = false, this.doubleClickImageTimeout = setTimeout(function() {
            q(i2.image, Q, { originalEvent: t2 });
          }, 50)) : (this.imageClicked = true, this.doubleClickImageTimeout = setTimeout(function() {
            i2.imageClicked = false;
          }, 500)) : (this.imageClicked = false, n2.backdrop && "static" !== n2.backdrop && t2.target === this.canvas && (this.clickCanvasTimeout = setTimeout(function() {
            q(i2.canvas, w, { originalEvent: t2 });
          }, 50))));
        }, resize: function() {
          var e2 = this;
          this.isShown && !this.hiding && (this.fulled && (this.close(), this.initBody(), this.open()), this.initContainer(), this.initViewer(), this.renderViewer(), this.renderList(), this.viewed && this.initImage(function() {
            e2.renderImage();
          }), this.played) && (this.options.fullscreen && this.fulled && !(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) ? this.stop() : A(this.player.getElementsByTagName("img"), function(t2) {
            X(t2, y, e2.loadImage.bind(e2), { once: true }), q(t2, y);
          }));
        }, wheel: function(t2) {
          var e2, i2, n2 = this;
          this.viewed && (t2.preventDefault(), this.wheeling || (this.wheeling = true, setTimeout(function() {
            n2.wheeling = false;
          }, 50), e2 = Number(this.options.zoomRatio) || 0.1, i2 = 1, t2.deltaY ? i2 = 0 < t2.deltaY ? 1 : -1 : t2.wheelDelta ? i2 = -t2.wheelDelta / 120 : t2.detail && (i2 = 0 < t2.detail ? 1 : -1), this.zoom(-i2 * e2, true, null, t2)));
        } }, It = { show: function() {
          var t2, e2, i2 = 0 < arguments.length && void 0 !== arguments[0] && arguments[0], n2 = this.element, o2 = this.options;
          return o2.inline || this.showing || this.isShown || this.showing || (this.ready ? (I(o2.show) && X(n2, "show", o2.show, { once: true }), false !== q(n2, "show") && this.ready && (this.hiding && this.transitioning.abort(), this.showing = true, this.open(), M(t2 = this.viewer, v), t2.setAttribute("role", "dialog"), t2.setAttribute("aria-labelledby", this.title.id), t2.setAttribute("aria-modal", true), t2.removeAttribute("aria-hidden"), o2.transition && !i2 ? (e2 = this.shown.bind(this), this.transitioning = { abort: function() {
            Y(t2, k, e2), M(t2, u);
          } }, R(t2, m), t2.initialOffsetWidth = t2.offsetWidth, X(t2, k, e2, { once: true }), R(t2, u)) : (R(t2, u), this.shown()))) : (this.build(), this.ready && this.show(i2))), this;
        }, hide: function() {
          var e2, t2, i2, n2, o2, s2 = this, a2 = 0 < arguments.length && void 0 !== arguments[0] && arguments[0], r2 = this.element, l2 = this.options;
          return l2.inline || this.hiding || !this.isShown && !this.showing || (I(l2.hide) && X(r2, "hide", l2.hide, { once: true }), false !== q(r2, "hide") && (this.showing && this.transitioning.abort(), this.hiding = true, this.played ? this.stop() : this.viewing && this.viewing.abort(), e2 = this.viewer, t2 = this.image, i2 = function() {
            M(e2, u), s2.hidden();
          }, l2.transition && !a2 ? (n2 = function(t3) {
            t3 && t3.target === e2 && (Y(e2, k, n2), s2.hidden());
          }, o2 = function() {
            L(e2, m) ? (X(e2, k, n2), M(e2, u)) : i2();
          }, this.transitioning = { abort: function() {
            s2.viewed && L(t2, m) ? Y(t2, k, o2) : L(e2, m) && Y(e2, k, n2);
          } }, this.viewed && L(t2, m) ? (X(t2, k, o2, { once: true }), this.zoomTo(0, false, null, null, true)) : o2()) : i2())), this;
        }, view: function() {
          var i2 = this, t2 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.options.initialViewIndex, t2 = Number(t2) || 0;
          if (!(this.hiding || this.played || t2 < 0 || t2 >= this.length || this.viewed && t2 === this.index)) {
            if (!this.isShown) return this.index = t2, this.show();
            this.viewing && this.viewing.abort();
            var e2, n2, o2, s2 = this.element, a2 = this.options, r2 = this.title, l2 = this.canvas, h2 = this.items[t2], c2 = h2.querySelector("img"), u2 = N(c2, "originalUrl"), d2 = c2.getAttribute("alt"), m2 = document.createElement("img");
            A(a2.inheritedAttributes, function(t3) {
              var e3 = c2.getAttribute(t3);
              null !== e3 && m2.setAttribute(t3, e3);
            }), m2.src = u2, m2.alt = d2, I(a2.view) && X(s2, "view", a2.view, { once: true }), false === q(s2, "view", { originalImage: this.images[t2], index: t2, image: m2 }) || !this.isShown || this.hiding || this.played || ((u2 = this.items[this.index]) && (M(u2, f), u2.removeAttribute("aria-selected")), R(h2, f), h2.setAttribute("aria-selected", true), a2.focus && h2.focus(), this.image = m2, this.viewed = false, this.index = t2, this.imageData = {}, R(m2, p), a2.loading && R(l2, b), l2.innerHTML = "", l2.appendChild(m2), this.renderList(), r2.innerHTML = "", X(s2, z, e2 = function() {
              var t3 = i2.imageData, e3 = Array.isArray(a2.title) ? a2.title[1] : a2.title;
              r2.innerHTML = T(e3 = I(e3) ? e3.call(i2, m2, t3) : "".concat(d2, " (").concat(t3.naturalWidth, " \xD7 ").concat(t3.naturalHeight, ")")) ? e3.replace(/&(?!amp;|quot;|#39;|lt;|gt;)/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : e3;
            }, { once: true }), this.viewing = { abort: function() {
              Y(s2, z, e2), m2.complete ? i2.imageRendering ? i2.imageRendering.abort() : i2.imageInitializing && i2.imageInitializing.abort() : (m2.src = "", Y(m2, y, n2), i2.timeout && clearTimeout(i2.timeout));
            } }, m2.complete ? this.load() : (X(m2, y, n2 = function() {
              Y(m2, x, o2), i2.load();
            }, { once: true }), X(m2, x, o2 = function() {
              Y(m2, y, n2), i2.timeout && (clearTimeout(i2.timeout), i2.timeout = false), M(m2, p), a2.loading && M(i2.canvas, b);
            }, { once: true }), this.timeout && clearTimeout(this.timeout), this.timeout = setTimeout(function() {
              M(m2, p), i2.timeout = false;
            }, 1e3)));
          }
          return this;
        }, prev: function() {
          var t2 = this.index - 1;
          return t2 < 0 && (t2 = 0 < arguments.length && void 0 !== arguments[0] && arguments[0] ? this.length - 1 : 0), this.view(t2), this;
        }, next: function() {
          var t2 = this.length - 1, e2 = this.index + 1;
          return this.view(e2 = t2 < e2 ? 0 < arguments.length && void 0 !== arguments[0] && arguments[0] ? 0 : t2 : e2), this;
        }, move: function(t2) {
          var e2 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : t2, i2 = this.imageData;
          return this.moveTo(D(t2) ? t2 : i2.x + Number(t2), D(e2) ? e2 : i2.y + Number(e2)), this;
        }, moveTo: function(t2) {
          var e2 = this, i2 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : t2, n2 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null, o2 = this.element, s2 = this.options, a2 = this.imageData;
          if (t2 = Number(t2), i2 = Number(i2), this.viewed && !this.played && s2.movable) {
            var r2 = a2.x, l2 = a2.y, h2 = false;
            if (E(t2) ? h2 = true : t2 = r2, E(i2) ? h2 = true : i2 = l2, h2) {
              if (I(s2.move) && X(o2, "move", s2.move, { once: true }), false === q(o2, "move", { x: t2, y: i2, oldX: r2, oldY: l2, originalEvent: n2 })) return this;
              a2.x = t2, a2.y = i2, a2.left = t2, a2.top = i2, this.moving = true, this.renderImage(function() {
                e2.moving = false, I(s2.moved) && X(o2, "moved", s2.moved, { once: true }), q(o2, "moved", { x: t2, y: i2, oldX: r2, oldY: l2, originalEvent: n2 }, { cancelable: false });
              });
            }
          }
          return this;
        }, rotate: function(t2) {
          return this.rotateTo((this.imageData.rotate || 0) + Number(t2)), this;
        }, rotateTo: function(t2) {
          var e2 = this, i2 = this.element, n2 = this.options, o2 = this.imageData;
          if (E(t2 = Number(t2)) && this.viewed && !this.played && n2.rotatable) {
            var s2 = o2.rotate;
            if (I(n2.rotate) && X(i2, "rotate", n2.rotate, { once: true }), false === q(i2, "rotate", { degree: t2, oldDegree: s2 })) return this;
            o2.rotate = t2, this.rotating = true, this.renderImage(function() {
              e2.rotating = false, I(n2.rotated) && X(i2, lt, n2.rotated, { once: true }), q(i2, lt, { degree: t2, oldDegree: s2 }, { cancelable: false });
            });
          }
          return this;
        }, scaleX: function(t2) {
          return this.scale(t2, this.imageData.scaleY), this;
        }, scaleY: function(t2) {
          return this.scale(this.imageData.scaleX, t2), this;
        }, scale: function(t2) {
          var e2 = this, i2 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : t2, n2 = this.element, o2 = this.options, s2 = this.imageData;
          if (t2 = Number(t2), i2 = Number(i2), this.viewed && !this.played && o2.scalable) {
            var a2 = s2.scaleX, r2 = s2.scaleY, l2 = false;
            if (E(t2) ? l2 = true : t2 = a2, E(i2) ? l2 = true : i2 = r2, l2) {
              if (I(o2.scale) && X(n2, "scale", o2.scale, { once: true }), false === q(n2, "scale", { scaleX: t2, scaleY: i2, oldScaleX: a2, oldScaleY: r2 })) return this;
              s2.scaleX = t2, s2.scaleY = i2, this.scaling = true, this.renderImage(function() {
                e2.scaling = false, I(o2.scaled) && X(n2, "scaled", o2.scaled, { once: true }), q(n2, "scaled", { scaleX: t2, scaleY: i2, oldScaleX: a2, oldScaleY: r2 }, { cancelable: false });
              });
            }
          }
          return this;
        }, zoom: function(t2) {
          var e2 = 1 < arguments.length && void 0 !== arguments[1] && arguments[1], i2 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null, n2 = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null, o2 = this.imageData;
          return t2 = Number(t2), this.zoomTo(o2.width * (t2 = t2 < 0 ? 1 / (1 - t2) : 1 + t2) / o2.naturalWidth, e2, i2, n2), this;
        }, zoomTo: function(t2) {
          var i2, n2, o2, e2 = this, s2 = 1 < arguments.length && void 0 !== arguments[1] && arguments[1], a2 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null, r2 = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null, l2 = 4 < arguments.length && void 0 !== arguments[4] && arguments[4], h2 = this.element, c2 = this.options, u2 = this.pointers, d2 = this.imageData, m2 = d2.x, g2 = d2.y, f2 = d2.width, v2 = d2.height, p2 = d2.naturalWidth, b2 = d2.naturalHeight;
          if (E(t2 = Math.max(0, t2)) && this.viewed && !this.played && (l2 || c2.zoomable)) {
            if (l2 || (l2 = Math.max(0.01, c2.minZoomRatio), y2 = Math.min(100, c2.maxZoomRatio), t2 = Math.min(Math.max(t2, l2), y2)), r2) switch (r2.type) {
              case "wheel":
                0.055 <= c2.zoomRatio && 0.95 < t2 && t2 < 1.05 && (t2 = 1);
                break;
              case "pointermove":
              case "touchmove":
              case "mousemove":
                0.99 < t2 && t2 < 1.01 && (t2 = 1);
            }
            var w2, l2 = p2 * t2, y2 = b2 * t2, p2 = l2 - f2, b2 = y2 - v2, x2 = d2.ratio;
            if (I(c2.zoom) && X(h2, "zoom", c2.zoom, { once: true }), false === q(h2, "zoom", { ratio: t2, oldRatio: x2, originalEvent: r2 })) return this;
            this.zooming = true, r2 ? (w2 = { left: (w2 = (w2 = this.viewer).getBoundingClientRect()).left + (window.pageXOffset - document.documentElement.clientLeft), top: w2.top + (window.pageYOffset - document.documentElement.clientTop) }, u2 = u2 && 0 < Object.keys(u2).length ? (o2 = n2 = i2 = 0, A(u2, function(t3) {
              var e3 = t3.startX;
              i2 += e3, n2 += t3.startY, o2 += 1;
            }), { pageX: i2 /= o2, pageY: n2 /= o2 }) : { pageX: r2.pageX, pageY: r2.pageY }, d2.x -= (u2.pageX - w2.left - m2) / f2 * p2, d2.y -= (u2.pageY - w2.top - g2) / v2 * b2) : S(a2) && E(a2.x) && E(a2.y) ? (d2.x -= p2 * ((a2.x - m2) / f2), d2.y -= b2 * ((a2.y - g2) / v2)) : (d2.x -= p2 / 2, d2.y -= b2 / 2), d2.left = d2.x, d2.top = d2.y, d2.width = l2, d2.height = y2, d2.oldRatio = x2, d2.ratio = t2, this.renderImage(function() {
              e2.zooming = false, I(c2.zoomed) && X(h2, "zoomed", c2.zoomed, { once: true }), q(h2, "zoomed", { ratio: t2, oldRatio: x2, originalEvent: r2 }, { cancelable: false });
            }), s2 && this.tooltip();
          }
          return this;
        }, play: function() {
          var t2, o2, s2, a2, r2, l2, h2, e2, i2, n2 = this, c2 = 0 < arguments.length && void 0 !== arguments[0] && arguments[0];
          return this.isShown && !this.played && (t2 = this.element, I((o2 = this.options).play) && X(t2, "play", o2.play, { once: true }), false !== q(t2, "play") && (s2 = this.player, a2 = this.loadImage.bind(this), r2 = [], h2 = l2 = 0, this.played = true, this.onLoadWhenPlay = a2, c2 && this.requestFullscreen(c2), R(s2, d), A(this.items, function(t3, e3) {
            var i3 = t3.querySelector("img"), n3 = document.createElement("img");
            n3.src = N(i3, "originalUrl"), n3.alt = i3.getAttribute("alt"), n3.referrerPolicy = i3.referrerPolicy, l2 += 1, R(n3, B), F(n3, m, o2.transition), L(t3, f) && (R(n3, u), h2 = e3), r2.push(n3), X(n3, y, a2, { once: true }), s2.appendChild(n3);
          }), E(o2.interval)) && 0 < o2.interval && (e2 = function() {
            clearTimeout(n2.playing.timeout), M(r2[h2], u), R(r2[h2 = 0 <= --h2 ? h2 : l2 - 1], u), n2.playing.timeout = setTimeout(e2, o2.interval);
          }, i2 = function() {
            clearTimeout(n2.playing.timeout), M(r2[h2], u), R(r2[h2 = (h2 += 1) < l2 ? h2 : 0], u), n2.playing.timeout = setTimeout(i2, o2.interval);
          }, 1 < l2)) && (this.playing = { prev: e2, next: i2, timeout: setTimeout(i2, o2.interval) }), this;
        }, stop: function() {
          var t2, e2, i2 = this;
          return this.played && (t2 = this.element, I((e2 = this.options).stop) && X(t2, "stop", e2.stop, { once: true }), false !== q(t2, "stop")) && (e2 = this.player, clearTimeout(this.playing.timeout), this.playing = false, this.played = false, A(e2.getElementsByTagName("img"), function(t3) {
            Y(t3, y, i2.onLoadWhenPlay);
          }), M(e2, d), e2.innerHTML = "", this.exitFullscreen()), this;
        }, full: function() {
          var t2 = this, e2 = this.options, i2 = this.viewer, n2 = this.image, o2 = this.list;
          return this.isShown && !this.played && !this.fulled && e2.inline && (this.fulled = true, this.open(), R(this.button, K), e2.transition && (M(o2, m), this.viewed) && M(n2, m), R(i2, V), i2.setAttribute("role", "dialog"), i2.setAttribute("aria-labelledby", this.title.id), i2.setAttribute("aria-modal", true), i2.removeAttribute("style"), C(i2, { zIndex: e2.zIndex }), e2.focus && this.enforceFocus(), this.initContainer(), this.viewerData = O({}, this.containerData), this.renderList(), this.viewed) && this.initImage(function() {
            t2.renderImage(function() {
              e2.transition && setTimeout(function() {
                R(n2, m), R(o2, m);
              }, 0);
            });
          }), this;
        }, exit: function() {
          var t2 = this, e2 = this.options, i2 = this.viewer, n2 = this.image, o2 = this.list;
          return this.isShown && !this.played && this.fulled && e2.inline && (this.fulled = false, this.close(), M(this.button, K), e2.transition && (M(o2, m), this.viewed) && M(n2, m), e2.focus && this.clearEnforceFocus(), i2.removeAttribute("role"), i2.removeAttribute("aria-labelledby"), i2.removeAttribute("aria-modal"), M(i2, V), C(i2, { zIndex: e2.zIndexInline }), this.viewerData = O({}, this.parentData), this.renderViewer(), this.renderList(), this.viewed) && this.initImage(function() {
            t2.renderImage(function() {
              e2.transition && setTimeout(function() {
                R(n2, m), R(o2, m);
              }, 0);
            });
          }), this;
        }, tooltip: function() {
          var t2 = this, e2 = this.options, i2 = this.tooltipBox, n2 = this.imageData;
          return this.viewed && !this.played && e2.tooltip && (i2.textContent = "".concat(Math.round(100 * n2.ratio), "%"), this.tooltipping ? clearTimeout(this.tooltipping) : e2.transition ? (this.fading && q(i2, k), R(i2, d), R(i2, B), R(i2, m), i2.removeAttribute("aria-hidden"), i2.initialOffsetWidth = i2.offsetWidth, R(i2, u)) : (R(i2, d), i2.removeAttribute("aria-hidden")), this.tooltipping = setTimeout(function() {
            e2.transition ? (X(i2, k, function() {
              M(i2, d), M(i2, B), M(i2, m), i2.setAttribute("aria-hidden", true), t2.fading = false;
            }, { once: true }), M(i2, u), t2.fading = true) : (M(i2, d), i2.setAttribute("aria-hidden", true)), t2.tooltipping = false;
          }, 1e3)), this;
        }, toggle: function() {
          var t2 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : null;
          return 1 === this.imageData.ratio ? this.zoomTo(this.imageData.oldRatio, true, null, t2) : this.zoomTo(1, true, null, t2), this;
        }, reset: function() {
          return this.viewed && !this.played && (this.imageData = O({}, this.initialImageData), this.renderImage()), this;
        }, update: function() {
          var n2, o2, e2 = this, t2 = this.element, i2 = this.options, s2 = this.isImg;
          return s2 && !t2.parentNode ? this.destroy() : (n2 = [], A(s2 ? [t2] : t2.querySelectorAll("img"), function(t3) {
            I(i2.filter) ? i2.filter.call(e2, t3) && n2.push(t3) : e2.getImageURL(t3) && n2.push(t3);
          }), n2.length && (this.images = n2, this.length = n2.length, this.ready ? (o2 = [], A(this.items, function(t3, e3) {
            var t3 = t3.querySelector("img"), i3 = n2[e3];
            i3 && t3 && i3.src === t3.src && i3.alt === t3.alt || o2.push(e3);
          }), C(this.list, { width: "auto" }), this.initList(), this.isShown && (this.length ? this.viewed && (0 <= (s2 = o2.indexOf(this.index)) ? (this.viewed = false, this.view(Math.max(Math.min(this.index - s2, this.length - 1), 0))) : (R(t2 = this.items[this.index], f), t2.setAttribute("aria-selected", true))) : (this.image = null, this.viewed = false, this.index = 0, this.imageData = {}, this.canvas.innerHTML = "", this.title.innerHTML = ""))) : this.build()), this);
        }, destroy: function() {
          var t2 = this.element, e2 = this.options;
          return t2[g] && (this.destroyed = true, this.ready ? (this.played && this.stop(), e2.inline ? (this.fulled && this.exit(), this.unbind()) : this.isShown ? (this.viewing && (this.imageRendering ? this.imageRendering.abort() : this.imageInitializing && this.imageInitializing.abort()), this.hiding && this.transitioning.abort(), this.hidden()) : this.showing && (this.transitioning.abort(), this.hidden()), this.ready = false, this.viewer.parentNode.removeChild(this.viewer)) : e2.inline && (this.delaying ? this.delaying.abort() : this.initializing && this.initializing.abort()), e2.inline || Y(t2, w, this.onStart), t2[g] = void 0), this;
        } }, At = { getImageURL: function(t2) {
          var e2 = this.options.url;
          return e2 = T(e2) ? t2.getAttribute(e2) : I(e2) ? e2.call(this, t2) : "";
        }, enforceFocus: function() {
          var n2 = this;
          this.clearEnforceFocus(), X(document, et, this.onFocusin = function(t2) {
            var e2 = n2.viewer, i2 = t2.target;
            if (i2 !== document && i2 !== e2 && !e2.contains(i2)) {
              for (; i2; ) {
                if (null !== i2.getAttribute("tabindex") || "true" === i2.getAttribute("aria-modal")) return;
                i2 = i2.parentElement;
              }
              e2.focus();
            }
          });
        }, clearEnforceFocus: function() {
          this.onFocusin && (Y(document, et, this.onFocusin), this.onFocusin = null);
        }, open: function() {
          var t2 = this.body;
          R(t2, J), 0 < this.scrollbarWidth && (t2.style.paddingRight = "".concat(this.scrollbarWidth + (parseFloat(this.initialBodyComputedPaddingRight) || 0), "px"));
        }, close: function() {
          var t2 = this.body;
          M(t2, J), 0 < this.scrollbarWidth && (t2.style.paddingRight = this.initialBodyPaddingRight);
        }, shown: function() {
          var t2 = this.element, e2 = this.options, i2 = this.viewer;
          this.fulled = true, this.isShown = true, this.render(), this.bind(), this.showing = false, e2.focus && (i2.focus(), this.enforceFocus()), I(e2.shown) && X(t2, "shown", e2.shown, { once: true }), false !== q(t2, "shown") && this.ready && this.isShown && !this.hiding && this.view(this.index);
        }, hidden: function() {
          var t2 = this.element, e2 = this.options, i2 = this.viewer;
          e2.fucus && this.clearEnforceFocus(), this.close(), this.unbind(), R(i2, v), i2.removeAttribute("role"), i2.removeAttribute("aria-labelledby"), i2.removeAttribute("aria-modal"), i2.setAttribute("aria-hidden", true), this.resetList(), this.resetImage(), this.fulled = false, this.viewed = false, this.isShown = false, this.hiding = false, this.destroyed || (I(e2.hidden) && X(t2, "hidden", e2.hidden, { once: true }), q(t2, "hidden", null, { cancelable: false }));
        }, requestFullscreen: function(t2) {
          var e2 = this.element.ownerDocument;
          this.fulled && !(e2.fullscreenElement || e2.webkitFullscreenElement || e2.mozFullScreenElement || e2.msFullscreenElement) && ((e2 = e2.documentElement).requestFullscreen ? S(t2) ? e2.requestFullscreen(t2) : e2.requestFullscreen() : e2.webkitRequestFullscreen ? e2.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT) : e2.mozRequestFullScreen ? e2.mozRequestFullScreen() : e2.msRequestFullscreen && e2.msRequestFullscreen());
        }, exitFullscreen: function() {
          var t2 = this.element.ownerDocument;
          this.fulled && (t2.fullscreenElement || t2.webkitFullscreenElement || t2.mozFullScreenElement || t2.msFullscreenElement) && (t2.exitFullscreen ? t2.exitFullscreen() : t2.webkitExitFullscreen ? t2.webkitExitFullscreen() : t2.mozCancelFullScreen ? t2.mozCancelFullScreen() : t2.msExitFullscreen && t2.msExitFullscreen());
        }, change: function(t2) {
          var e2 = this.options, i2 = this.pointers, n2 = i2[Object.keys(i2)[0]];
          if (n2) {
            var s2, a2, o2 = n2.endX - n2.startX, r2 = n2.endY - n2.startY;
            switch (this.action) {
              case h:
                0 == o2 && 0 == r2 || (this.pointerMoved = true, this.move(o2, r2, t2));
                break;
              case c:
                this.zoom((s2 = P({}, l2 = i2), a2 = [], A(l2, function(o3, t3) {
                  delete s2[t3], A(s2, function(t4) {
                    var e3 = Math.abs(o3.startX - t4.startX), i3 = Math.abs(o3.startY - t4.startY), n3 = Math.abs(o3.endX - t4.endX), t4 = Math.abs(o3.endY - t4.endY), e3 = Math.sqrt(e3 * e3 + i3 * i3), i3 = Math.sqrt(n3 * n3 + t4 * t4);
                    a2.push((i3 - e3) / e3);
                  });
                }), a2.sort(function(t3, e3) {
                  return Math.abs(t3) < Math.abs(e3);
                }), a2[0]), false, null, t2);
                break;
              case j:
                this.action = "switched";
                var l2 = Math.abs(o2);
                1 < l2 && l2 > Math.abs(r2) && (this.pointers = {}, 1 < o2 ? this.prev(e2.loop) : o2 < -1 && this.next(e2.loop));
            }
            A(i2, function(t3) {
              t3.startX = t3.endX, t3.startY = t3.endY;
            });
          }
        }, isSwitchable: function() {
          var t2 = this.imageData, e2 = this.viewerData;
          return 1 < this.length && 0 <= t2.x && 0 <= t2.y && t2.width <= e2.width && t2.height <= e2.height;
        } }, Ot = e.Viewer, Ct = (Dt = -1, function() {
          return Dt += 1;
        }), e = (() => {
          function o2(t3) {
            var e3 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, i3 = this, n2 = o2;
            if (!(i3 instanceof n2)) throw new TypeError("Cannot call a class as a function");
            if (!t3 || 1 !== t3.nodeType) throw new Error("The first argument is required and must be an element.");
            this.element = t3, this.options = O({}, W, S(e3) && e3), this.action = false, this.fading = false, this.fulled = false, this.hiding = false, this.imageClicked = false, this.imageData = {}, this.index = this.options.initialViewIndex, this.isImg = false, this.isShown = false, this.length = 0, this.moving = false, this.played = false, this.playing = false, this.pointers = {}, this.ready = false, this.rotating = false, this.scaling = false, this.showing = false, this.timeout = false, this.tooltipping = false, this.viewed = false, this.viewing = false, this.wheeling = false, this.zooming = false, this.pointerMoved = false, this.id = Ct(), this.init();
          }
          return t2 = o2, i2 = [{ key: "noConflict", value: function() {
            return window.Viewer = Ot, o2;
          } }, { key: "setDefaults", value: function(t3) {
            O(W, S(t3) && t3);
          } }], (e2 = [{ key: "init", value: function() {
            var t3, e3, i3, n2, o3 = this, s2 = this.element, a2 = this.options;
            s2[g] || (s2[g] = this, a2.focus && !a2.keyboard && (a2.focus = false), e3 = [], A((t3 = "img" === s2.localName) ? [s2] : s2.querySelectorAll("img"), function(t4) {
              I(a2.filter) ? a2.filter.call(o3, t4) && e3.push(t4) : o3.getImageURL(t4) && e3.push(t4);
            }), this.isImg = t3, this.length = e3.length, this.images = e3, this.initBody(), D(document.createElement(g).style.transition) && (a2.transition = false), a2.inline ? (i3 = 0, n2 = function() {
              var t4;
              (i3 += 1) === o3.length && (o3.initializing = false, o3.delaying = { abort: function() {
                clearTimeout(t4);
              } }, t4 = setTimeout(function() {
                o3.delaying = false, o3.build();
              }, 0));
            }, this.initializing = { abort: function() {
              A(e3, function(t4) {
                t4.complete || (Y(t4, y, n2), Y(t4, x, n2));
              });
            } }, A(e3, function(t4) {
              var e4, i4;
              t4.complete ? n2() : (X(t4, y, e4 = function() {
                Y(t4, x, i4), n2();
              }, { once: true }), X(t4, x, i4 = function() {
                Y(t4, y, e4), n2();
              }, { once: true }));
            })) : X(s2, w, this.onStart = function(t4) {
              t4 = t4.target;
              "img" !== t4.localName || I(a2.filter) && !a2.filter.call(o3, t4) || o3.view(o3.images.indexOf(t4));
            }));
          } }, { key: "build", value: function() {
            var t3, s2, e3, i3, n2, o3, a2, r2, l2, h2, c2, u2, d2, m2;
            this.ready || (t3 = this.element, s2 = this.options, e3 = t3.parentNode, (d2 = document.createElement("div")).innerHTML = '<div class="viewer-container" tabindex="-1" touch-action="none"><div class="viewer-canvas"></div><div class="viewer-footer"><div class="viewer-title"></div><div class="viewer-toolbar"></div><div class="viewer-navbar"><ul class="viewer-list" role="navigation"></ul></div></div><div class="viewer-tooltip" role="alert" aria-hidden="true"></div><div class="viewer-button" data-viewer-action="mix" role="button"></div><div class="viewer-player"></div></div>', d2 = (i3 = d2.querySelector(".".concat(g, "-container"))).querySelector(".".concat(g, "-title")), n2 = i3.querySelector(".".concat(g, "-toolbar")), m2 = i3.querySelector(".".concat(g, "-navbar")), o3 = i3.querySelector(".".concat(g, "-button")), a2 = i3.querySelector(".".concat(g, "-canvas")), this.parent = e3, this.viewer = i3, this.title = d2, this.toolbar = n2, this.navbar = m2, this.button = o3, this.canvas = a2, this.footer = i3.querySelector(".".concat(g, "-footer")), this.tooltipBox = i3.querySelector(".".concat(g, "-tooltip")), this.player = i3.querySelector(".".concat(g, "-player")), this.list = i3.querySelector(".".concat(g, "-list")), i3.id = "".concat(g).concat(this.id), d2.id = "".concat(g, "Title").concat(this.id), R(d2, s2.title ? Tt(Array.isArray(s2.title) ? s2.title[0] : s2.title) : v), R(m2, s2.navbar ? Tt(s2.navbar) : v), F(o3, v, !s2.button), s2.keyboard && o3.setAttribute("tabindex", 0), s2.backdrop && (R(i3, "".concat(g, "-backdrop")), s2.inline || "static" === s2.backdrop || pt(a2, ht, "hide")), T(s2.className) && s2.className && s2.className.split(ct).forEach(function(t4) {
              R(i3, t4);
            }), s2.toolbar ? (r2 = document.createElement("ul"), l2 = S(s2.toolbar), h2 = ut.slice(0, 3), c2 = ut.slice(7, 9), u2 = ut.slice(9), l2 || R(n2, Tt(s2.toolbar)), A(l2 ? s2.toolbar : ut, function(t4, e4) {
              var i4, n3 = l2 && S(t4), e4 = l2 ? vt(e4) : t4, o4 = n3 && !D(t4.show) ? t4.show : t4;
              !o4 || !s2.zoomable && -1 !== h2.indexOf(e4) || !s2.rotatable && -1 !== c2.indexOf(e4) || !s2.scalable && -1 !== u2.indexOf(e4) || (i4 = n3 && !D(t4.size) ? t4.size : t4, n3 = n3 && !D(t4.click) ? t4.click : t4, t4 = document.createElement("li"), s2.keyboard && t4.setAttribute("tabindex", 0), t4.setAttribute("role", "button"), R(t4, "".concat(g, "-").concat(e4)), I(n3) || pt(t4, ht, e4), E(o4) && R(t4, Tt(o4)), -1 !== ["small", "large"].indexOf(i4) ? R(t4, "".concat(g, "-").concat(i4)) : "play" === e4 && R(t4, "".concat(g, "-large")), I(n3) && X(t4, w, n3), r2.appendChild(t4));
            }), n2.appendChild(r2)) : R(n2, v), s2.rotatable || (R(d2 = n2.querySelectorAll('li[class*="rotate"]'), p), A(d2, function(t4) {
              n2.appendChild(t4);
            })), s2.inline ? (R(o3, U), C(i3, { zIndex: s2.zIndexInline }), "static" === window.getComputedStyle(e3).position && C(e3, { position: "relative" }), e3.insertBefore(i3, t3.nextSibling)) : (R(o3, H), R(i3, V), R(i3, B), R(i3, v), C(i3, { zIndex: s2.zIndex }), (m2 = (m2 = T(m2 = s2.container) ? t3.ownerDocument.querySelector(m2) : m2) || this.body).appendChild(i3)), s2.inline && (this.render(), this.bind(), this.isShown = true), this.ready = true, I(s2.ready) && X(t3, "ready", s2.ready, { once: true }), false === q(t3, "ready") ? this.ready = false : this.ready && s2.inline && this.view(this.index));
          } }]) && n(t2.prototype, e2), i2 && n(t2, i2), Object.defineProperty(t2, "prototype", { writable: false }), t2;
          var t2, e2, i2;
        })();
        return O(e.prototype, i, t, St, It, At), e;
      });
    }
  });

  // zip.js/zip.min.js
  var require_zip_min = __commonJS({
    "zip.js/zip.min.js"(exports, module) {
      ((e, t) => {
        "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).zip = {});
      })(exports, (function(e) {
        "use strict";
        const { Array: t, Object: n, String: r, Number: s, BigInt: i, Math: a, Date: o, Map: c, Set: l, Response: u, URL: f, Error: d, Uint8Array: w, Uint16Array: h, Uint32Array: p, DataView: g, Blob: m, Promise: y, TextEncoder: b, TextDecoder: S, document: k, crypto: z, btoa: v, TransformStream: x, ReadableStream: A, WritableStream: C, CompressionStream: _, DecompressionStream: D, navigator: F, Worker: R } = "undefined" != typeof globalThis ? globalThis : this || self;
        var E = void 0 !== k ? k.currentScript : null;
        const T = 4294967295, U = 65535, L = 67324752, I = 134695760, N = I, W = 33639248, j = 101010256, O = 101075792, P = 117853008, H = 22, G = 21589, M = 2048, q = "/", B = new o(2107, 11, 31), V = new o(1980, 0, 1), Z = void 0, K = "undefined", X = "function";
        class Y {
          constructor(e2) {
            return class extends x {
              constructor(t2, n2) {
                const r2 = new e2(n2);
                super({ transform(e3, t3) {
                  t3.enqueue(r2.append(e3));
                }, flush(e3) {
                  const t3 = r2.flush();
                  t3 && e3.enqueue(t3);
                } });
              }
            };
          }
        }
        let J = 2;
        try {
          typeof F != K && F.hardwareConcurrency && (J = F.hardwareConcurrency);
        } catch (e2) {
        }
        const Q = { chunkSize: 524288, maxWorkers: J, terminateWorkerTimeout: 5e3, useWebWorkers: true, useCompressionStream: true, workerScripts: Z, CompressionStreamNative: typeof _ != K && _, DecompressionStreamNative: typeof D != K && D }, $ = n.assign({}, Q);
        function ee() {
          return $;
        }
        function te(e2) {
          return a.max(e2.chunkSize, 64);
        }
        function ne(e2) {
          const { baseURL: n2, chunkSize: r2, maxWorkers: s2, terminateWorkerTimeout: i2, useCompressionStream: a2, useWebWorkers: o2, Deflate: c2, Inflate: l2, CompressionStream: u2, DecompressionStream: f2, workerScripts: w2 } = e2;
          if (re("baseURL", n2), re("chunkSize", r2), re("maxWorkers", s2), re("terminateWorkerTimeout", i2), re("useCompressionStream", a2), re("useWebWorkers", o2), c2 && ($.CompressionStream = new Y(c2)), l2 && ($.DecompressionStream = new Y(l2)), re("CompressionStream", u2), re("DecompressionStream", f2), w2 !== Z) {
            const { deflate: e3, inflate: n3 } = w2;
            if ((e3 || n3) && ($.workerScripts || ($.workerScripts = {})), e3) {
              if (!t.isArray(e3)) throw new d("workerScripts.deflate must be an array");
              $.workerScripts.deflate = e3;
            }
            if (n3) {
              if (!t.isArray(n3)) throw new d("workerScripts.inflate must be an array");
              $.workerScripts.inflate = n3;
            }
          }
        }
        function re(e2, t2) {
          t2 !== Z && ($[e2] = t2);
        }
        function se(e2, t2, r2) {
          return class {
            constructor(s3) {
              const i2 = this;
              var a2, o2;
              a2 = s3, o2 = "level", (typeof n.hasOwn === X ? n.hasOwn(a2, o2) : a2.hasOwnProperty(o2)) && s3.level === Z && delete s3.level, i2.codec = new e2(n.assign({}, t2, s3)), r2(i2.codec, ((e3) => {
                if (i2.pendingData) {
                  const t3 = i2.pendingData;
                  i2.pendingData = new w(t3.length + e3.length);
                  const { pendingData: n2 } = i2;
                  n2.set(t3, 0), n2.set(e3, t3.length);
                } else i2.pendingData = new w(e3);
              }));
            }
            append(e3) {
              return this.codec.push(e3), s2(this);
            }
            flush() {
              return this.codec.push(new w(), true), s2(this);
            }
          };
          function s2(e3) {
            if (e3.pendingData) {
              const t3 = e3.pendingData;
              return e3.pendingData = null, t3;
            }
            return new w();
          }
        }
        const ie = [];
        for (let e2 = 0; 256 > e2; e2++) {
          let t2 = e2;
          for (let e3 = 0; 8 > e3; e3++) 1 & t2 ? t2 = t2 >>> 1 ^ 3988292384 : t2 >>>= 1;
          ie[e2] = t2;
        }
        class ae {
          constructor(e2) {
            this.crc = e2 || -1;
          }
          append(e2) {
            let t2 = 0 | this.crc;
            for (let n2 = 0, r2 = 0 | e2.length; r2 > n2; n2++) t2 = t2 >>> 8 ^ ie[255 & (t2 ^ e2[n2])];
            this.crc = t2;
          }
          get() {
            return ~this.crc;
          }
        }
        class oe extends x {
          constructor() {
            let e2;
            const t2 = new ae();
            super({ transform(e3, n2) {
              t2.append(e3), n2.enqueue(e3);
            }, flush() {
              const n2 = new w(4);
              new g(n2.buffer).setUint32(0, t2.get()), e2.value = n2;
            } }), e2 = this;
          }
        }
        function ce(e2) {
          if (typeof b == K) {
            const t2 = new w((e2 = unescape(encodeURIComponent(e2))).length);
            for (let n2 = 0; n2 < t2.length; n2++) t2[n2] = e2.charCodeAt(n2);
            return t2;
          }
          return new b().encode(e2);
        }
        const le = { concat(e2, t2) {
          if (0 === e2.length || 0 === t2.length) return e2.concat(t2);
          const n2 = e2[e2.length - 1], r2 = le.getPartial(n2);
          return 32 === r2 ? e2.concat(t2) : le._shiftRight(t2, r2, 0 | n2, e2.slice(0, e2.length - 1));
        }, bitLength(e2) {
          const t2 = e2.length;
          if (0 === t2) return 0;
          const n2 = e2[t2 - 1];
          return 32 * (t2 - 1) + le.getPartial(n2);
        }, clamp(e2, t2) {
          if (32 * e2.length < t2) return e2;
          const n2 = (e2 = e2.slice(0, a.ceil(t2 / 32))).length;
          return t2 &= 31, n2 > 0 && t2 && (e2[n2 - 1] = le.partial(t2, e2[n2 - 1] & 2147483648 >> t2 - 1, 1)), e2;
        }, partial: (e2, t2, n2) => 32 === e2 ? t2 : (n2 ? 0 | t2 : t2 << 32 - e2) + 1099511627776 * e2, getPartial: (e2) => a.round(e2 / 1099511627776) || 32, _shiftRight(e2, t2, n2, r2) {
          for (void 0 === r2 && (r2 = []); t2 >= 32; t2 -= 32) r2.push(n2), n2 = 0;
          if (0 === t2) return r2.concat(e2);
          for (let s3 = 0; s3 < e2.length; s3++) r2.push(n2 | e2[s3] >>> t2), n2 = e2[s3] << 32 - t2;
          const s2 = e2.length ? e2[e2.length - 1] : 0, i2 = le.getPartial(s2);
          return r2.push(le.partial(t2 + i2 & 31, t2 + i2 > 32 ? n2 : r2.pop(), 1)), r2;
        } }, ue = { bytes: { fromBits(e2) {
          const t2 = le.bitLength(e2) / 8, n2 = new w(t2);
          let r2;
          for (let s2 = 0; t2 > s2; s2++) 3 & s2 || (r2 = e2[s2 / 4]), n2[s2] = r2 >>> 24, r2 <<= 8;
          return n2;
        }, toBits(e2) {
          const t2 = [];
          let n2, r2 = 0;
          for (n2 = 0; n2 < e2.length; n2++) r2 = r2 << 8 | e2[n2], 3 & ~n2 || (t2.push(r2), r2 = 0);
          return 3 & n2 && t2.push(le.partial(8 * (3 & n2), r2)), t2;
        } } }, fe = class {
          constructor(e2) {
            const t2 = this;
            t2.blockSize = 512, t2._init = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], t2._key = [1518500249, 1859775393, 2400959708, 3395469782], e2 ? (t2._h = e2._h.slice(0), t2._buffer = e2._buffer.slice(0), t2._length = e2._length) : t2.reset();
          }
          reset() {
            const e2 = this;
            return e2._h = e2._init.slice(0), e2._buffer = [], e2._length = 0, e2;
          }
          update(e2) {
            const t2 = this;
            "string" == typeof e2 && (e2 = ue.utf8String.toBits(e2));
            const n2 = t2._buffer = le.concat(t2._buffer, e2), r2 = t2._length, s2 = t2._length = r2 + le.bitLength(e2);
            if (s2 > 9007199254740991) throw new d("Cannot hash more than 2^53 - 1 bits");
            const i2 = new p(n2);
            let a2 = 0;
            for (let e3 = t2.blockSize + r2 - (t2.blockSize + r2 & t2.blockSize - 1); s2 >= e3; e3 += t2.blockSize) t2._block(i2.subarray(16 * a2, 16 * (a2 + 1))), a2 += 1;
            return n2.splice(0, 16 * a2), t2;
          }
          finalize() {
            const e2 = this;
            let t2 = e2._buffer;
            const n2 = e2._h;
            t2 = le.concat(t2, [le.partial(1, 1)]);
            for (let e3 = t2.length + 2; 15 & e3; e3++) t2.push(0);
            for (t2.push(a.floor(e2._length / 4294967296)), t2.push(0 | e2._length); t2.length; ) e2._block(t2.splice(0, 16));
            return e2.reset(), n2;
          }
          _f(e2, t2, n2, r2) {
            return e2 > 19 ? e2 > 39 ? e2 > 59 ? e2 > 79 ? void 0 : t2 ^ n2 ^ r2 : t2 & n2 | t2 & r2 | n2 & r2 : t2 ^ n2 ^ r2 : t2 & n2 | ~t2 & r2;
          }
          _S(e2, t2) {
            return t2 << e2 | t2 >>> 32 - e2;
          }
          _block(e2) {
            const n2 = this, r2 = n2._h, s2 = t(80);
            for (let t2 = 0; 16 > t2; t2++) s2[t2] = e2[t2];
            let i2 = r2[0], o2 = r2[1], c2 = r2[2], l2 = r2[3], u2 = r2[4];
            for (let e3 = 0; 79 >= e3; e3++) {
              16 > e3 || (s2[e3] = n2._S(1, s2[e3 - 3] ^ s2[e3 - 8] ^ s2[e3 - 14] ^ s2[e3 - 16]));
              const t2 = n2._S(5, i2) + n2._f(e3, o2, c2, l2) + u2 + s2[e3] + n2._key[a.floor(e3 / 20)] | 0;
              u2 = l2, l2 = c2, c2 = n2._S(30, o2), o2 = i2, i2 = t2;
            }
            r2[0] = r2[0] + i2 | 0, r2[1] = r2[1] + o2 | 0, r2[2] = r2[2] + c2 | 0, r2[3] = r2[3] + l2 | 0, r2[4] = r2[4] + u2 | 0;
          }
        }, de = { getRandomValues(e2) {
          const t2 = new p(e2.buffer), n2 = (e3) => {
            let t3 = 987654321;
            const n3 = 4294967295;
            return () => (t3 = 36969 * (65535 & t3) + (t3 >> 16) & n3, (((t3 << 16) + (e3 = 18e3 * (65535 & e3) + (e3 >> 16) & n3) & n3) / 4294967296 + 0.5) * (a.random() > 0.5 ? 1 : -1));
          };
          for (let r2, s2 = 0; s2 < e2.length; s2 += 4) {
            const e3 = n2(4294967296 * (r2 || a.random()));
            r2 = 987654071 * e3(), t2[s2 / 4] = 4294967296 * e3() | 0;
          }
          return e2;
        } }, we = { importKey: (e2) => new we.hmacSha1(ue.bytes.toBits(e2)), pbkdf2(e2, t2, n2, r2) {
          if (n2 = n2 || 1e4, 0 > r2 || 0 > n2) throw new d("invalid params to pbkdf2");
          const s2 = 1 + (r2 >> 5) << 2;
          let i2, a2, o2, c2, l2;
          const u2 = new ArrayBuffer(s2), f2 = new g(u2);
          let w2 = 0;
          const h2 = le;
          for (t2 = ue.bytes.toBits(t2), l2 = 1; (s2 || 1) > w2; l2++) {
            for (i2 = a2 = e2.encrypt(h2.concat(t2, [l2])), o2 = 1; n2 > o2; o2++) for (a2 = e2.encrypt(a2), c2 = 0; c2 < a2.length; c2++) i2[c2] ^= a2[c2];
            for (o2 = 0; (s2 || 1) > w2 && o2 < i2.length; o2++) f2.setInt32(w2, i2[o2]), w2 += 4;
          }
          return u2.slice(0, r2 / 8);
        }, hmacSha1: class {
          constructor(e2) {
            const t2 = this, n2 = t2._hash = fe, r2 = [[], []];
            t2._baseHash = [new n2(), new n2()];
            const s2 = t2._baseHash[0].blockSize / 32;
            e2.length > s2 && (e2 = new n2().update(e2).finalize());
            for (let t3 = 0; s2 > t3; t3++) r2[0][t3] = 909522486 ^ e2[t3], r2[1][t3] = 1549556828 ^ e2[t3];
            t2._baseHash[0].update(r2[0]), t2._baseHash[1].update(r2[1]), t2._resultHash = new n2(t2._baseHash[0]);
          }
          reset() {
            const e2 = this;
            e2._resultHash = new e2._hash(e2._baseHash[0]), e2._updated = false;
          }
          update(e2) {
            this._updated = true, this._resultHash.update(e2);
          }
          digest() {
            const e2 = this, t2 = e2._resultHash.finalize(), n2 = new e2._hash(e2._baseHash[1]).update(t2).finalize();
            return e2.reset(), n2;
          }
          encrypt(e2) {
            if (this._updated) throw new d("encrypt on already updated hmac called!");
            return this.update(e2), this.digest(e2);
          }
        } }, he = typeof z != K && typeof z.getRandomValues == X, pe = "Invalid password", ge = "Invalid signature", me = "zipjs-abort-check-password";
        function ye(e2) {
          return he ? z.getRandomValues(e2) : de.getRandomValues(e2);
        }
        const be = 16, Se = { name: "PBKDF2" }, ke = n.assign({ hash: { name: "HMAC" } }, Se), ze = n.assign({ iterations: 1e3, hash: { name: "SHA-1" } }, Se), ve = ["deriveBits"], xe = [8, 12, 16], Ae = [16, 24, 32], Ce = 10, _e = [0, 0, 0, 0], De = typeof z != K, Fe = De && z.subtle, Re = De && typeof Fe != K, Ee = ue.bytes, Te = class {
          constructor(e2) {
            const t2 = this;
            t2._tables = [[[], [], [], [], []], [[], [], [], [], []]], t2._tables[0][0][0] || t2._precompute();
            const n2 = t2._tables[0][4], r2 = t2._tables[1], s2 = e2.length;
            let i2, a2, o2, c2 = 1;
            if (4 !== s2 && 6 !== s2 && 8 !== s2) throw new d("invalid aes key size");
            for (t2._key = [a2 = e2.slice(0), o2 = []], i2 = s2; 4 * s2 + 28 > i2; i2++) {
              let e3 = a2[i2 - 1];
              (i2 % s2 == 0 || 8 === s2 && i2 % s2 == 4) && (e3 = n2[e3 >>> 24] << 24 ^ n2[e3 >> 16 & 255] << 16 ^ n2[e3 >> 8 & 255] << 8 ^ n2[255 & e3], i2 % s2 == 0 && (e3 = e3 << 8 ^ e3 >>> 24 ^ c2 << 24, c2 = c2 << 1 ^ 283 * (c2 >> 7))), a2[i2] = a2[i2 - s2] ^ e3;
            }
            for (let e3 = 0; i2; e3++, i2--) {
              const t3 = a2[3 & e3 ? i2 : i2 - 4];
              o2[e3] = 4 >= i2 || 4 > e3 ? t3 : r2[0][n2[t3 >>> 24]] ^ r2[1][n2[t3 >> 16 & 255]] ^ r2[2][n2[t3 >> 8 & 255]] ^ r2[3][n2[255 & t3]];
            }
          }
          encrypt(e2) {
            return this._crypt(e2, 0);
          }
          decrypt(e2) {
            return this._crypt(e2, 1);
          }
          _precompute() {
            const e2 = this._tables[0], t2 = this._tables[1], n2 = e2[4], r2 = t2[4], s2 = [], i2 = [];
            let a2, o2, c2, l2;
            for (let e3 = 0; 256 > e3; e3++) i2[(s2[e3] = e3 << 1 ^ 283 * (e3 >> 7)) ^ e3] = e3;
            for (let u2 = a2 = 0; !n2[u2]; u2 ^= o2 || 1, a2 = i2[a2] || 1) {
              let i3 = a2 ^ a2 << 1 ^ a2 << 2 ^ a2 << 3 ^ a2 << 4;
              i3 = i3 >> 8 ^ 255 & i3 ^ 99, n2[u2] = i3, r2[i3] = u2, l2 = s2[c2 = s2[o2 = s2[u2]]];
              let f2 = 16843009 * l2 ^ 65537 * c2 ^ 257 * o2 ^ 16843008 * u2, d2 = 257 * s2[i3] ^ 16843008 * i3;
              for (let n3 = 0; 4 > n3; n3++) e2[n3][u2] = d2 = d2 << 24 ^ d2 >>> 8, t2[n3][i3] = f2 = f2 << 24 ^ f2 >>> 8;
            }
            for (let n3 = 0; 5 > n3; n3++) e2[n3] = e2[n3].slice(0), t2[n3] = t2[n3].slice(0);
          }
          _crypt(e2, t2) {
            if (4 !== e2.length) throw new d("invalid aes block size");
            const n2 = this._key[t2], r2 = n2.length / 4 - 2, s2 = [0, 0, 0, 0], i2 = this._tables[t2], a2 = i2[0], o2 = i2[1], c2 = i2[2], l2 = i2[3], u2 = i2[4];
            let f2, w2, h2, p2 = e2[0] ^ n2[0], g2 = e2[t2 ? 3 : 1] ^ n2[1], m2 = e2[2] ^ n2[2], y2 = e2[t2 ? 1 : 3] ^ n2[3], b2 = 4;
            for (let e3 = 0; r2 > e3; e3++) f2 = a2[p2 >>> 24] ^ o2[g2 >> 16 & 255] ^ c2[m2 >> 8 & 255] ^ l2[255 & y2] ^ n2[b2], w2 = a2[g2 >>> 24] ^ o2[m2 >> 16 & 255] ^ c2[y2 >> 8 & 255] ^ l2[255 & p2] ^ n2[b2 + 1], h2 = a2[m2 >>> 24] ^ o2[y2 >> 16 & 255] ^ c2[p2 >> 8 & 255] ^ l2[255 & g2] ^ n2[b2 + 2], y2 = a2[y2 >>> 24] ^ o2[p2 >> 16 & 255] ^ c2[g2 >> 8 & 255] ^ l2[255 & m2] ^ n2[b2 + 3], b2 += 4, p2 = f2, g2 = w2, m2 = h2;
            for (let e3 = 0; 4 > e3; e3++) s2[t2 ? 3 & -e3 : e3] = u2[p2 >>> 24] << 24 ^ u2[g2 >> 16 & 255] << 16 ^ u2[m2 >> 8 & 255] << 8 ^ u2[255 & y2] ^ n2[b2++], f2 = p2, p2 = g2, g2 = m2, m2 = y2, y2 = f2;
            return s2;
          }
        }, Ue = class {
          constructor(e2, t2) {
            this._prf = e2, this._initIv = t2, this._iv = t2;
          }
          reset() {
            this._iv = this._initIv;
          }
          update(e2) {
            return this.calculate(this._prf, e2, this._iv);
          }
          incWord(e2) {
            if (255 & ~(e2 >> 24)) e2 += 1 << 24;
            else {
              let t2 = e2 >> 16 & 255, n2 = e2 >> 8 & 255, r2 = 255 & e2;
              255 === t2 ? (t2 = 0, 255 === n2 ? (n2 = 0, 255 === r2 ? r2 = 0 : ++r2) : ++n2) : ++t2, e2 = 0, e2 += t2 << 16, e2 += n2 << 8, e2 += r2;
            }
            return e2;
          }
          incCounter(e2) {
            0 === (e2[0] = this.incWord(e2[0])) && (e2[1] = this.incWord(e2[1]));
          }
          calculate(e2, t2, n2) {
            let r2;
            if (!(r2 = t2.length)) return [];
            const s2 = le.bitLength(t2);
            for (let s3 = 0; r2 > s3; s3 += 4) {
              this.incCounter(n2);
              const r3 = e2.encrypt(n2);
              t2[s3] ^= r3[0], t2[s3 + 1] ^= r3[1], t2[s3 + 2] ^= r3[2], t2[s3 + 3] ^= r3[3];
            }
            return le.clamp(t2, s2);
          }
        }, Le = we.hmacSha1;
        let Ie = De && Re && typeof Fe.importKey == X, Ne = De && Re && typeof Fe.deriveBits == X;
        class We extends x {
          constructor({ password: e2, rawPassword: t2, signed: r2, encryptionStrength: s2, checkPasswordOnly: i2 }) {
            super({ start() {
              n.assign(this, { ready: new y(((e3) => this.resolveReady = e3)), password: He(e2, t2), signed: r2, strength: s2 - 1, pending: new w() });
            }, async transform(e3, t3) {
              const n2 = this, { password: r3, strength: s3, resolveReady: a2, ready: o2 } = n2;
              r3 ? (await (async (e4, t4, n3, r4) => {
                const s4 = await Pe(e4, t4, n3, Me(r4, 0, xe[t4])), i3 = Me(r4, xe[t4]);
                if (s4[0] != i3[0] || s4[1] != i3[1]) throw new d(pe);
              })(n2, s3, r3, Me(e3, 0, xe[s3] + 2)), e3 = Me(e3, xe[s3] + 2), i2 ? t3.error(new d(me)) : a2()) : await o2;
              const c2 = new w(e3.length - Ce - (e3.length - Ce) % be);
              t3.enqueue(Oe(n2, e3, c2, 0, Ce, true));
            }, async flush(e3) {
              const { signed: t3, ctr: n2, hmac: r3, pending: s3, ready: i3 } = this;
              if (r3 && n2) {
                await i3;
                const a2 = Me(s3, 0, s3.length - Ce), o2 = Me(s3, s3.length - Ce);
                let c2 = new w();
                if (a2.length) {
                  const e4 = Be(Ee, a2);
                  r3.update(e4);
                  const t4 = n2.update(e4);
                  c2 = qe(Ee, t4);
                }
                if (t3) {
                  const e4 = Me(qe(Ee, r3.digest()), 0, Ce);
                  for (let t4 = 0; Ce > t4; t4++) if (e4[t4] != o2[t4]) throw new d(ge);
                }
                e3.enqueue(c2);
              }
            } });
          }
        }
        class je extends x {
          constructor({ password: e2, rawPassword: t2, encryptionStrength: r2 }) {
            let s2;
            super({ start() {
              n.assign(this, { ready: new y(((e3) => this.resolveReady = e3)), password: He(e2, t2), strength: r2 - 1, pending: new w() });
            }, async transform(e3, t3) {
              const n2 = this, { password: r3, strength: s3, resolveReady: i2, ready: a2 } = n2;
              let o2 = new w();
              r3 ? (o2 = await (async (e4, t4, n3) => {
                const r4 = ye(new w(xe[t4]));
                return Ge(r4, await Pe(e4, t4, n3, r4));
              })(n2, s3, r3), i2()) : await a2;
              const c2 = new w(o2.length + e3.length - e3.length % be);
              c2.set(o2, 0), t3.enqueue(Oe(n2, e3, c2, o2.length, 0));
            }, async flush(e3) {
              const { ctr: t3, hmac: n2, pending: r3, ready: i2 } = this;
              if (n2 && t3) {
                await i2;
                let a2 = new w();
                if (r3.length) {
                  const e4 = t3.update(Be(Ee, r3));
                  n2.update(e4), a2 = qe(Ee, e4);
                }
                s2.signature = qe(Ee, n2.digest()).slice(0, Ce), e3.enqueue(Ge(a2, s2.signature));
              }
            } }), s2 = this;
          }
        }
        function Oe(e2, t2, n2, r2, s2, i2) {
          const { ctr: a2, hmac: o2, pending: c2 } = e2, l2 = t2.length - s2;
          let u2;
          for (c2.length && (t2 = Ge(c2, t2), n2 = ((e3, t3) => {
            if (t3 && t3 > e3.length) {
              const n3 = e3;
              (e3 = new w(t3)).set(n3, 0);
            }
            return e3;
          })(n2, l2 - l2 % be)), u2 = 0; l2 - be >= u2; u2 += be) {
            const e3 = Be(Ee, Me(t2, u2, u2 + be));
            i2 && o2.update(e3);
            const s3 = a2.update(e3);
            i2 || o2.update(s3), n2.set(qe(Ee, s3), u2 + r2);
          }
          return e2.pending = Me(t2, u2), n2;
        }
        async function Pe(e2, r2, s2, i2) {
          e2.password = null;
          const a2 = await (async (e3, t2, n2, r3, s3) => {
            if (!Ie) return we.importKey(t2);
            try {
              return await Fe.importKey("raw", t2, n2, false, s3);
            } catch (e4) {
              return Ie = false, we.importKey(t2);
            }
          })(0, s2, ke, 0, ve), o2 = await (async (e3, t2, n2) => {
            if (!Ne) return we.pbkdf2(t2, e3.salt, ze.iterations, n2);
            try {
              return await Fe.deriveBits(e3, t2, n2);
            } catch (r3) {
              return Ne = false, we.pbkdf2(t2, e3.salt, ze.iterations, n2);
            }
          })(n.assign({ salt: i2 }, ze), a2, 8 * (2 * Ae[r2] + 2)), c2 = new w(o2), l2 = Be(Ee, Me(c2, 0, Ae[r2])), u2 = Be(Ee, Me(c2, Ae[r2], 2 * Ae[r2])), f2 = Me(c2, 2 * Ae[r2]);
          return n.assign(e2, { keys: { key: l2, authentication: u2, passwordVerification: f2 }, ctr: new Ue(new Te(l2), t.from(_e)), hmac: new Le(u2) }), f2;
        }
        function He(e2, t2) {
          return t2 === Z ? ce(e2) : t2;
        }
        function Ge(e2, t2) {
          let n2 = e2;
          return e2.length + t2.length && (n2 = new w(e2.length + t2.length), n2.set(e2, 0), n2.set(t2, e2.length)), n2;
        }
        function Me(e2, t2, n2) {
          return e2.subarray(t2, n2);
        }
        function qe(e2, t2) {
          return e2.fromBits(t2);
        }
        function Be(e2, t2) {
          return e2.toBits(t2);
        }
        class Ve extends x {
          constructor({ password: e2, passwordVerification: t2, checkPasswordOnly: r2 }) {
            super({ start() {
              n.assign(this, { password: e2, passwordVerification: t2 }), Ye(this, e2);
            }, transform(e3, t3) {
              const n2 = this;
              if (n2.password) {
                const t4 = Ke(n2, e3.subarray(0, 12));
                if (n2.password = null, t4[11] != n2.passwordVerification) throw new d(pe);
                e3 = e3.subarray(12);
              }
              r2 ? t3.error(new d(me)) : t3.enqueue(Ke(n2, e3));
            } });
          }
        }
        class Ze extends x {
          constructor({ password: e2, passwordVerification: t2 }) {
            super({ start() {
              n.assign(this, { password: e2, passwordVerification: t2 }), Ye(this, e2);
            }, transform(e3, t3) {
              const n2 = this;
              let r2, s2;
              if (n2.password) {
                n2.password = null;
                const t4 = ye(new w(12));
                t4[11] = n2.passwordVerification, r2 = new w(e3.length + t4.length), r2.set(Xe(n2, t4), 0), s2 = 12;
              } else r2 = new w(e3.length), s2 = 0;
              r2.set(Xe(n2, e3), s2), t3.enqueue(r2);
            } });
          }
        }
        function Ke(e2, t2) {
          const n2 = new w(t2.length);
          for (let r2 = 0; r2 < t2.length; r2++) n2[r2] = Qe(e2) ^ t2[r2], Je(e2, n2[r2]);
          return n2;
        }
        function Xe(e2, t2) {
          const n2 = new w(t2.length);
          for (let r2 = 0; r2 < t2.length; r2++) n2[r2] = Qe(e2) ^ t2[r2], Je(e2, t2[r2]);
          return n2;
        }
        function Ye(e2, t2) {
          const r2 = [305419896, 591751049, 878082192];
          n.assign(e2, { keys: r2, crcKey0: new ae(r2[0]), crcKey2: new ae(r2[2]) });
          for (let n2 = 0; n2 < t2.length; n2++) Je(e2, t2.charCodeAt(n2));
        }
        function Je(e2, t2) {
          let [n2, r2, s2] = e2.keys;
          e2.crcKey0.append([t2]), n2 = ~e2.crcKey0.get(), r2 = et(a.imul(et(r2 + $e(n2)), 134775813) + 1), e2.crcKey2.append([r2 >>> 24]), s2 = ~e2.crcKey2.get(), e2.keys = [n2, r2, s2];
        }
        function Qe(e2) {
          const t2 = 2 | e2.keys[2];
          return $e(a.imul(t2, 1 ^ t2) >>> 8);
        }
        function $e(e2) {
          return 255 & e2;
        }
        function et(e2) {
          return 4294967295 & e2;
        }
        const tt = "deflate-raw";
        class nt extends x {
          constructor(e2, { chunkSize: t2, CompressionStream: n2, CompressionStreamNative: r2 }) {
            super({});
            const { compressed: s2, encrypted: i2, useCompressionStream: a2, zipCrypto: o2, signed: c2, level: l2 } = e2, u2 = this;
            let f2, d2, w2 = st(super.readable);
            i2 && !o2 || !c2 || (f2 = new oe(), w2 = ot(w2, f2)), s2 && (w2 = at(w2, a2, { level: l2, chunkSize: t2 }, r2, n2)), i2 && (o2 ? w2 = ot(w2, new Ze(e2)) : (d2 = new je(e2), w2 = ot(w2, d2))), it(u2, w2, (() => {
              let e3;
              i2 && !o2 && (e3 = d2.signature), i2 && !o2 || !c2 || (e3 = new g(f2.value.buffer).getUint32(0)), u2.signature = e3;
            }));
          }
        }
        class rt extends x {
          constructor(e2, { chunkSize: t2, DecompressionStream: n2, DecompressionStreamNative: r2 }) {
            super({});
            const { zipCrypto: s2, encrypted: i2, signed: a2, signature: o2, compressed: c2, useCompressionStream: l2 } = e2;
            let u2, f2, w2 = st(super.readable);
            i2 && (s2 ? w2 = ot(w2, new Ve(e2)) : (f2 = new We(e2), w2 = ot(w2, f2))), c2 && (w2 = at(w2, l2, { chunkSize: t2 }, r2, n2)), i2 && !s2 || !a2 || (u2 = new oe(), w2 = ot(w2, u2)), it(this, w2, (() => {
              if ((!i2 || s2) && a2) {
                const e3 = new g(u2.value.buffer);
                if (o2 != e3.getUint32(0, false)) throw new d(ge);
              }
            }));
          }
        }
        function st(e2) {
          return ot(e2, new x({ transform(e3, t2) {
            e3 && e3.length && t2.enqueue(e3);
          } }));
        }
        function it(e2, t2, r2) {
          t2 = ot(t2, new x({ flush: r2 })), n.defineProperty(e2, "readable", { get: () => t2 });
        }
        function at(e2, t2, n2, r2, s2) {
          try {
            e2 = ot(e2, new (t2 && r2 ? r2 : s2)(tt, n2));
          } catch (r3) {
            if (!t2) return e2;
            try {
              e2 = ot(e2, new s2(tt, n2));
            } catch (t3) {
              return e2;
            }
          }
          return e2;
        }
        function ot(e2, t2) {
          return e2.pipeThrough(t2);
        }
        const ct = "data", lt = "close", ut = "deflate", ft = "inflate";
        class dt extends x {
          constructor(e2, t2) {
            super({});
            const r2 = this, { codecType: s2 } = e2;
            let i2;
            s2.startsWith(ut) ? i2 = nt : s2.startsWith(ft) && (i2 = rt);
            let a2 = 0, o2 = 0;
            const c2 = new i2(e2, t2), l2 = super.readable, u2 = new x({ transform(e3, t3) {
              e3 && e3.length && (o2 += e3.length, t3.enqueue(e3));
            }, flush() {
              n.assign(r2, { inputSize: o2 });
            } }), f2 = new x({ transform(e3, t3) {
              e3 && e3.length && (a2 += e3.length, t3.enqueue(e3));
            }, flush() {
              const { signature: e3 } = c2;
              n.assign(r2, { signature: e3, outputSize: a2, inputSize: o2 });
            } });
            n.defineProperty(r2, "readable", { get: () => l2.pipeThrough(u2).pipeThrough(c2).pipeThrough(f2) });
          }
        }
        class wt extends x {
          constructor(e2) {
            let t2;
            super({ transform: function n2(r2, s2) {
              if (t2) {
                const e3 = new w(t2.length + r2.length);
                e3.set(t2), e3.set(r2, t2.length), r2 = e3, t2 = null;
              }
              r2.length > e2 ? (s2.enqueue(r2.slice(0, e2)), n2(r2.slice(e2), s2)) : t2 = r2;
            }, flush(e3) {
              t2 && t2.length && e3.enqueue(t2);
            } });
          }
        }
        let ht = typeof R != K;
        class pt {
          constructor(e2, { readable: t2, writable: r2 }, { options: s2, config: i2, streamOptions: a2, useWebWorkers: o2, transferStreams: c2, scripts: l2 }, u2) {
            const { signal: f2 } = a2;
            return n.assign(e2, { busy: true, readable: t2.pipeThrough(new wt(i2.chunkSize)).pipeThrough(new gt(t2, a2), { signal: f2 }), writable: r2, options: n.assign({}, s2), scripts: l2, transferStreams: c2, terminate: () => new y(((t3) => {
              const { worker: n2, busy: r3 } = e2;
              n2 ? (r3 ? e2.resolveTerminated = t3 : (n2.terminate(), t3()), e2.interface = null) : t3();
            })), onTaskFinished() {
              const { resolveTerminated: t3 } = e2;
              t3 && (e2.resolveTerminated = null, e2.terminated = true, e2.worker.terminate(), t3()), e2.busy = false, u2(e2);
            } }), (o2 && ht ? bt : yt)(e2, i2);
          }
        }
        class gt extends x {
          constructor(e2, { onstart: t2, onprogress: n2, size: r2, onend: s2 }) {
            let i2 = 0;
            super({ async start() {
              t2 && await mt(t2, r2);
            }, async transform(e3, t3) {
              i2 += e3.length, n2 && await mt(n2, i2, r2), t3.enqueue(e3);
            }, async flush() {
              e2.size = i2, s2 && await mt(s2, i2);
            } });
          }
        }
        async function mt(e2, ...t2) {
          try {
            await e2(...t2);
          } catch (e3) {
          }
        }
        function yt(e2, t2) {
          return { run: () => (async ({ options: e3, readable: t3, writable: n2, onTaskFinished: r2 }, s2) => {
            try {
              const r3 = new dt(e3, s2);
              await t3.pipeThrough(r3).pipeTo(n2, { preventClose: true, preventAbort: true });
              const { signature: i2, inputSize: a2, outputSize: o2 } = r3;
              return { signature: i2, inputSize: a2, outputSize: o2 };
            } finally {
              r2();
            }
          })(e2, t2) };
        }
        function bt(e2, t2) {
          const { baseURL: r2, chunkSize: s2 } = t2;
          if (!e2.interface) {
            let i2;
            try {
              i2 = ((e3, t3, r3) => {
                const s3 = { type: "module" };
                let i3, a2;
                typeof e3 == X && (e3 = e3());
                try {
                  i3 = new f(e3, t3);
                } catch (t4) {
                  i3 = e3;
                }
                if (St) try {
                  a2 = new R(i3);
                } catch (e4) {
                  St = false, a2 = new R(i3, s3);
                }
                else a2 = new R(i3, s3);
                return a2.addEventListener("message", ((e4) => (async ({ data: e5 }, t4) => {
                  const { type: r4, value: s4, messageId: i4, result: a3, error: o2 } = e5, { reader: c2, writer: l2, resolveResult: u2, rejectResult: f2, onTaskFinished: h2 } = t4;
                  try {
                    if (o2) {
                      const { message: e6, stack: t5, code: r5, name: s5 } = o2, i5 = new d(e6);
                      n.assign(i5, { stack: t5, code: r5, name: s5 }), p2(i5);
                    } else {
                      if ("pull" == r4) {
                        const { value: e6, done: n2 } = await c2.read();
                        zt({ type: ct, value: e6, done: n2, messageId: i4 }, t4);
                      }
                      r4 == ct && (await l2.ready, await l2.write(new w(s4)), zt({ type: "ack", messageId: i4 }, t4)), r4 == lt && p2(null, a3);
                    }
                  } catch (o3) {
                    zt({ type: lt, messageId: i4 }, t4), p2(o3);
                  }
                  function p2(e6, t5) {
                    e6 ? f2(e6) : u2(t5), l2 && l2.releaseLock(), h2();
                  }
                })(e4, r3))), a2;
              })(e2.scripts[0], r2, e2);
            } catch (n2) {
              return ht = false, yt(e2, t2);
            }
            n.assign(e2, { worker: i2, interface: { run: () => (async (e3, t3) => {
              let r3, s3;
              const i3 = new y(((e4, t4) => {
                r3 = e4, s3 = t4;
              }));
              n.assign(e3, { reader: null, writer: null, resolveResult: r3, rejectResult: s3, result: i3 });
              const { readable: a2, options: o2, scripts: c2 } = e3, { writable: l2, closed: u2 } = ((e4) => {
                let t4;
                const n2 = new y(((e5) => t4 = e5));
                return { writable: new C({ async write(t5) {
                  const n3 = e4.getWriter();
                  await n3.ready, await n3.write(t5), n3.releaseLock();
                }, close() {
                  t4();
                }, abort: (t5) => e4.getWriter().abort(t5) }), closed: n2 };
              })(e3.writable), f2 = zt({ type: "start", scripts: c2.slice(1), options: o2, config: t3, readable: a2, writable: l2 }, e3);
              f2 || n.assign(e3, { reader: a2.getReader(), writer: l2.getWriter() });
              const d2 = await i3;
              return f2 || await l2.getWriter().close(), await u2, d2;
            })(e2, { chunkSize: s2 }) } });
          }
          return e2.interface;
        }
        let St = true, kt = true;
        function zt(e2, { worker: t2, writer: n2, onTaskFinished: r2, transferStreams: s2 }) {
          try {
            let { value: n3, readable: r3, writable: i2 } = e2;
            const a2 = [];
            if (n3 && (n3.byteLength < n3.buffer.byteLength ? e2.value = n3.buffer.slice(0, n3.byteLength) : e2.value = n3.buffer, a2.push(e2.value)), s2 && kt ? (r3 && a2.push(r3), i2 && a2.push(i2)) : e2.readable = e2.writable = null, a2.length) try {
              return t2.postMessage(e2, a2), true;
            } catch (n4) {
              kt = false, e2.readable = e2.writable = null, t2.postMessage(e2);
            }
            else t2.postMessage(e2);
          } catch (e3) {
            throw n2 && n2.releaseLock(), r2(), e3;
          }
        }
        let vt = [];
        const xt = [];
        let At = 0;
        async function Ct(e2, t2) {
          const { options: n2, config: r2 } = t2, { transferStreams: i2, useWebWorkers: a2, useCompressionStream: o2, codecType: c2, compressed: l2, signed: u2, encrypted: f2 } = n2, { workerScripts: d2, maxWorkers: w2 } = r2;
          t2.transferStreams = i2 || i2 === Z;
          const h2 = !(l2 || u2 || f2 || t2.transferStreams);
          return t2.useWebWorkers = !h2 && (a2 || a2 === Z && r2.useWebWorkers), t2.scripts = t2.useWebWorkers && d2 ? d2[c2] : [], n2.useCompressionStream = o2 || o2 === Z && r2.useCompressionStream, (await (async () => {
            const n3 = vt.find(((e3) => !e3.busy));
            if (n3) return _t(n3), new pt(n3, e2, t2, p2);
            if (vt.length < w2) {
              const n4 = { indexWorker: At };
              return At++, vt.push(n4), new pt(n4, e2, t2, p2);
            }
            return new y(((n4) => xt.push({ resolve: n4, stream: e2, workerOptions: t2 })));
          })()).run();
          function p2(e3) {
            if (xt.length) {
              const [{ resolve: t3, stream: n3, workerOptions: r3 }] = xt.splice(0, 1);
              t3(new pt(e3, n3, r3, p2));
            } else e3.worker ? (_t(e3), ((e4, t3) => {
              const { config: n3 } = t3, { terminateWorkerTimeout: r3 } = n3;
              s.isFinite(r3) && r3 >= 0 && (e4.terminated ? e4.terminated = false : e4.terminateTimeout = setTimeout((async () => {
                vt = vt.filter(((t4) => t4 != e4));
                try {
                  await e4.terminate();
                } catch (e5) {
                }
              }), r3));
            })(e3, t2)) : vt = vt.filter(((t3) => t3 != e3));
          }
        }
        function _t(e2) {
          const { terminateTimeout: t2 } = e2;
          t2 && (clearTimeout(t2), e2.terminateTimeout = null);
        }
        const Dt = "HTTP error ", Ft = "HTTP Range not supported", Rt = "Writer iterator completed too soon", Et = "Range", Tt = "GET", Ut = "bytes", Lt = 65536, It = "writable";
        class Nt {
          constructor() {
            this.size = 0;
          }
          init() {
            this.initialized = true;
          }
        }
        class Wt extends Nt {
          get readable() {
            const e2 = this, { chunkSize: t2 = Lt } = e2, n2 = new A({ start() {
              this.chunkOffset = 0;
            }, async pull(r2) {
              const { offset: s2 = 0, size: i2, diskNumberStart: o2 } = n2, { chunkOffset: c2 } = this;
              r2.enqueue(await on(e2, s2 + c2, a.min(t2, i2 - c2), o2)), c2 + t2 > i2 ? r2.close() : this.chunkOffset += t2;
            } });
            return n2;
          }
        }
        class jt extends Nt {
          constructor() {
            super();
            const e2 = this, t2 = new C({ write: (t3) => e2.writeUint8Array(t3) });
            n.defineProperty(e2, It, { get: () => t2 });
          }
          writeUint8Array() {
          }
        }
        class Ot extends Wt {
          constructor(e2) {
            super(), n.assign(this, { blob: e2, size: e2.size });
          }
          async readUint8Array(e2, t2) {
            const n2 = this, r2 = e2 + t2, s2 = e2 || r2 < n2.size ? n2.blob.slice(e2, r2) : n2.blob;
            let i2 = await s2.arrayBuffer();
            return i2.byteLength > t2 && (i2 = i2.slice(e2, r2)), new w(i2);
          }
        }
        class Pt extends Nt {
          constructor(e2) {
            super();
            const t2 = new x(), r2 = [];
            e2 && r2.push(["Content-Type", e2]), n.defineProperty(this, It, { get: () => t2.writable }), this.blob = new u(t2.readable, { headers: r2 }).blob();
          }
          getData() {
            return this.blob;
          }
        }
        class Ht extends Wt {
          constructor(e2, t2) {
            super(), Mt(this, e2, t2);
          }
          async init() {
            await qt(this, Qt, Kt), super.init();
          }
          readUint8Array(e2, t2) {
            return Bt(this, e2, t2, Qt, Kt);
          }
        }
        class Gt extends Wt {
          constructor(e2, t2) {
            super(), Mt(this, e2, t2);
          }
          async init() {
            await qt(this, $t, Xt), super.init();
          }
          readUint8Array(e2, t2) {
            return Bt(this, e2, t2, $t, Xt);
          }
        }
        function Mt(e2, t2, r2) {
          const { preventHeadRequest: s2, useRangeHeader: i2, forceRangeRequests: a2, combineSizeEocd: o2 } = r2;
          delete (r2 = n.assign({}, r2)).preventHeadRequest, delete r2.useRangeHeader, delete r2.forceRangeRequests, delete r2.combineSizeEocd, delete r2.useXHR, n.assign(e2, { url: t2, options: r2, preventHeadRequest: s2, useRangeHeader: i2, forceRangeRequests: a2, combineSizeEocd: o2 });
        }
        async function qt(e2, t2, n2) {
          const { url: r2, preventHeadRequest: i2, useRangeHeader: a2, forceRangeRequests: o2, combineSizeEocd: c2 } = e2;
          if (((e3) => {
            const { baseURL: t3 } = ee(), { protocol: n3 } = new f(e3, t3);
            return "http:" == n3 || "https:" == n3;
          })(r2) && (a2 || o2) && (void 0 === i2 || i2)) {
            const r3 = await t2(Tt, e2, Vt(e2, c2 ? -22 : void 0));
            if (!o2 && r3.headers.get("Accept-Ranges") != Ut) throw new d(Ft);
            {
              let i3;
              c2 && (e2.eocdCache = new w(await r3.arrayBuffer()));
              const a3 = r3.headers.get("Content-Range");
              if (a3) {
                const e3 = a3.trim().split(/\s*\/\s*/);
                if (e3.length) {
                  const t3 = e3[1];
                  t3 && "*" != t3 && (i3 = s(t3));
                }
              }
              i3 === Z ? await Jt(e2, t2, n2) : e2.size = i3;
            }
          } else await Jt(e2, t2, n2);
        }
        async function Bt(e2, t2, n2, r2, s2) {
          const { useRangeHeader: i2, forceRangeRequests: a2, eocdCache: o2, size: c2, options: l2 } = e2;
          if (i2 || a2) {
            if (o2 && t2 == c2 - H && n2 == H) return o2;
            const s3 = await r2(Tt, e2, Vt(e2, t2, n2));
            if (206 != s3.status) throw new d(Ft);
            return new w(await s3.arrayBuffer());
          }
          {
            const { data: r3 } = e2;
            return r3 || await s2(e2, l2), new w(e2.data.subarray(t2, t2 + n2));
          }
        }
        function Vt(e2, t2 = 0, r2 = 1) {
          return n.assign({}, Zt(e2), { [Et]: Ut + "=" + (0 > t2 ? t2 : t2 + "-" + (t2 + r2 - 1)) });
        }
        function Zt({ options: e2 }) {
          const { headers: t2 } = e2;
          if (t2) return Symbol.iterator in t2 ? n.fromEntries(t2) : t2;
        }
        async function Kt(e2) {
          await Yt(e2, Qt);
        }
        async function Xt(e2) {
          await Yt(e2, $t);
        }
        async function Yt(e2, t2) {
          const n2 = await t2(Tt, e2, Zt(e2));
          e2.data = new w(await n2.arrayBuffer()), e2.size || (e2.size = e2.data.length);
        }
        async function Jt(e2, t2, n2) {
          if (e2.preventHeadRequest) await n2(e2, e2.options);
          else {
            const r2 = (await t2("HEAD", e2, Zt(e2))).headers.get("Content-Length");
            r2 ? e2.size = s(r2) : await n2(e2, e2.options);
          }
        }
        async function Qt(e2, { options: t2, url: r2 }, s2) {
          const i2 = await fetch(r2, n.assign({}, t2, { method: e2, headers: s2 }));
          if (400 > i2.status) return i2;
          throw 416 == i2.status ? new d(Ft) : new d(Dt + (i2.statusText || i2.status));
        }
        function $t(e2, { url: t2 }, r2) {
          return new y(((s2, i2) => {
            const a2 = new XMLHttpRequest();
            if (a2.addEventListener("load", (() => {
              if (400 > a2.status) {
                const e3 = [];
                a2.getAllResponseHeaders().trim().split(/[\r\n]+/).forEach(((t3) => {
                  const n2 = t3.trim().split(/\s*:\s*/);
                  n2[0] = n2[0].trim().replace(/^[a-z]|-[a-z]/g, ((e4) => e4.toUpperCase())), e3.push(n2);
                })), s2({ status: a2.status, arrayBuffer: () => a2.response, headers: new c(e3) });
              } else i2(416 == a2.status ? new d(Ft) : new d(Dt + (a2.statusText || a2.status)));
            }), false), a2.addEventListener("error", ((e3) => i2(e3.detail ? e3.detail.error : new d("Network error"))), false), a2.open(e2, t2), r2) for (const e3 of n.entries(r2)) a2.setRequestHeader(e3[0], e3[1]);
            a2.responseType = "arraybuffer", a2.send();
          }));
        }
        class en extends Wt {
          constructor(e2, t2 = {}) {
            super(), n.assign(this, { url: e2, reader: t2.useXHR ? new Gt(e2, t2) : new Ht(e2, t2) });
          }
          set size(e2) {
          }
          get size() {
            return this.reader.size;
          }
          async init() {
            await this.reader.init(), super.init();
          }
          readUint8Array(e2, t2) {
            return this.reader.readUint8Array(e2, t2);
          }
        }
        class tn extends Wt {
          constructor(e2) {
            super(), this.readers = e2;
          }
          async init() {
            const e2 = this, { readers: t2 } = e2;
            e2.lastDiskNumber = 0, e2.lastDiskOffset = 0, await y.all(t2.map((async (n2, r2) => {
              await n2.init(), r2 != t2.length - 1 && (e2.lastDiskOffset += n2.size), e2.size += n2.size;
            }))), super.init();
          }
          async readUint8Array(e2, t2, n2 = 0) {
            const r2 = this, { readers: s2 } = this;
            let i2, o2 = n2;
            -1 == o2 && (o2 = s2.length - 1);
            let c2 = e2;
            for (; c2 >= s2[o2].size; ) c2 -= s2[o2].size, o2++;
            const l2 = s2[o2], u2 = l2.size;
            if (c2 + t2 > u2) {
              const s3 = u2 - c2;
              i2 = new w(t2), i2.set(await on(l2, c2, s3)), i2.set(await r2.readUint8Array(e2 + s3, t2 - s3, n2), s3);
            } else i2 = await on(l2, c2, t2);
            return r2.lastDiskNumber = a.max(o2, r2.lastDiskNumber), i2;
          }
        }
        class nn extends Nt {
          constructor(e2, t2 = 4294967295) {
            super();
            const r2 = this;
            let s2, i2, a2;
            n.assign(r2, { diskNumber: 0, diskOffset: 0, size: 0, maxSize: t2, availableSize: t2 });
            const o2 = new C({ async write(t3) {
              const { availableSize: n2 } = r2;
              if (a2) t3.length < n2 ? await c2(t3) : (await c2(t3.slice(0, n2)), await l2(), r2.diskOffset += s2.size, r2.diskNumber++, a2 = null, await this.write(t3.slice(n2)));
              else {
                const { value: n3, done: o3 } = await e2.next();
                if (o3 && !n3) throw new d(Rt);
                s2 = n3, s2.size = 0, s2.maxSize && (r2.maxSize = s2.maxSize), r2.availableSize = r2.maxSize, await rn(s2), i2 = n3.writable, a2 = i2.getWriter(), await this.write(t3);
              }
            }, async close() {
              await a2.ready, await l2();
            } });
            async function c2(e3) {
              const t3 = e3.length;
              t3 && (await a2.ready, await a2.write(e3), s2.size += t3, r2.size += t3, r2.availableSize -= t3);
            }
            async function l2() {
              i2.size = s2.size, await a2.close();
            }
            n.defineProperty(r2, It, { get: () => o2 });
          }
        }
        async function rn(e2, t2) {
          if (!e2.init || e2.initialized) return y.resolve();
          await e2.init(t2);
        }
        function sn(e2) {
          return t.isArray(e2) && (e2 = new tn(e2)), e2 instanceof A && (e2 = { readable: e2 }), e2;
        }
        function an(e2) {
          e2.writable === Z && typeof e2.next == X && (e2 = new nn(e2)), e2 instanceof C && (e2 = { writable: e2 });
          const { writable: t2 } = e2;
          return t2.size === Z && (t2.size = 0), e2 instanceof nn || n.assign(e2, { diskNumber: 0, diskOffset: 0, availableSize: 1 / 0, maxSize: 1 / 0 }), e2;
        }
        function on(e2, t2, n2, r2) {
          return e2.readUint8Array(t2, n2, r2);
        }
        const cn = tn, ln = nn, un = "\0\u263A\u263B\u2665\u2666\u2663\u2660\u2022\u25D8\u25CB\u25D9\u2642\u2640\u266A\u266B\u263C\u25BA\u25C4\u2195\u203C\xB6\xA7\u25AC\u21A8\u2191\u2193\u2192\u2190\u221F\u2194\u25B2\u25BC !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\u2302\xC7\xFC\xE9\xE2\xE4\xE0\xE5\xE7\xEA\xEB\xE8\xEF\xEE\xEC\xC4\xC5\xC9\xE6\xC6\xF4\xF6\xF2\xFB\xF9\xFF\xD6\xDC\xA2\xA3\xA5\u20A7\u0192\xE1\xED\xF3\xFA\xF1\xD1\xAA\xBA\xBF\u2310\xAC\xBD\xBC\xA1\xAB\xBB\u2591\u2592\u2593\u2502\u2524\u2561\u2562\u2556\u2555\u2563\u2551\u2557\u255D\u255C\u255B\u2510\u2514\u2534\u252C\u251C\u2500\u253C\u255E\u255F\u255A\u2554\u2569\u2566\u2560\u2550\u256C\u2567\u2568\u2564\u2565\u2559\u2558\u2552\u2553\u256B\u256A\u2518\u250C\u2588\u2584\u258C\u2590\u2580\u03B1\xDF\u0393\u03C0\u03A3\u03C3\xB5\u03C4\u03A6\u0398\u03A9\u03B4\u221E\u03C6\u03B5\u2229\u2261\xB1\u2265\u2264\u2320\u2321\xF7\u2248\xB0\u2219\xB7\u221A\u207F\xB2\u25A0 ".split("");
        function fn(e2, t2) {
          return t2 && "cp437" == t2.trim().toLowerCase() ? ((e3) => {
            {
              let t3 = "";
              for (let n2 = 0; n2 < e3.length; n2++) t3 += un[e3[n2]];
              return t3;
            }
          })(e2) : new S(t2).decode(e2);
        }
        const dn = "filename", wn = "rawFilename", hn = "comment", pn = "rawComment", gn = "uncompressedSize", mn = "compressedSize", yn = "offset", bn = "diskNumberStart", Sn = "lastModDate", kn = "rawLastModDate", zn = "lastAccessDate", vn = "creationDate", xn = "internalFileAttribute", An = "externalFileAttribute", Cn = "msDosCompatible", _n = "zip64", Dn = "encrypted", Fn = "version", Rn = "versionMadeBy", En = "zipCrypto", Tn = [dn, wn, mn, gn, Sn, kn, hn, pn, zn, vn, yn, bn, bn, xn, An, Cn, _n, Dn, Fn, Rn, En, "directory", "bitFlag", "signature", "filenameUTF8", "commentUTF8", "compressionMethod", "extraField", "rawExtraField", "extraFieldZip64", "extraFieldUnicodePath", "extraFieldUnicodeComment", "extraFieldAES", "extraFieldNTFS", "extraFieldExtendedTimestamp"];
        class Un {
          constructor(e2) {
            Tn.forEach(((t2) => this[t2] = e2[t2]));
          }
        }
        const Ln = "File format is not recognized", In = "End of central directory not found", Nn = "End of Zip64 central directory locator not found", Wn = "Central directory header not found", jn = "Local file header not found", On = "Zip64 extra field not found", Pn = "File contains encrypted entry", Hn = "Encryption method not supported", Gn = "Compression method not supported", Mn = "Split zip file", qn = "utf-8", Bn = "cp437", Vn = [[gn, T], [mn, T], [yn, T], [bn, U]], Zn = { [U]: { getValue: sr, bytes: 4 }, [T]: { getValue: ir, bytes: 8 } };
        class Kn {
          constructor(e2, t2 = {}) {
            n.assign(this, { reader: sn(e2), options: t2, config: ee() });
          }
          async *getEntriesGenerator(e2 = {}) {
            const t2 = this;
            let { reader: r2 } = t2;
            const { config: s2 } = t2;
            if (await rn(r2), r2.size !== Z && r2.readUint8Array || (r2 = new Ot(await new u(r2.readable).blob()), await rn(r2)), r2.size < H) throw new d(Ln);
            r2.chunkSize = te(s2);
            const i2 = await (async (e3, t3, n2) => {
              const r3 = new w(4);
              var s3;
              return s3 = t3, ar(r3).setUint32(0, s3, true), await i3(22) || await i3(a.min(1048582, n2));
              async function i3(t4) {
                const s4 = n2 - t4, i4 = await on(e3, s4, t4);
                for (let e4 = i4.length - 22; e4 >= 0; e4--) if (i4[e4] == r3[0] && i4[e4 + 1] == r3[1] && i4[e4 + 2] == r3[2] && i4[e4 + 3] == r3[3]) return { offset: s4 + e4, buffer: i4.slice(e4, e4 + 22).buffer };
              }
            })(r2, j, r2.size);
            if (!i2) throw sr(ar(await on(r2, 0, 4))) == I ? new d(Mn) : new d(In);
            const o2 = ar(i2);
            let c2 = sr(o2, 12), l2 = sr(o2, 16);
            const f2 = i2.offset, h2 = rr(o2, 20), p2 = f2 + H + h2;
            let g2 = rr(o2, 4);
            const m2 = r2.lastDiskNumber || 0;
            let y2 = rr(o2, 6), b2 = rr(o2, 8), S2 = 0, k2 = 0;
            if (l2 == T || c2 == T || b2 == U || y2 == U) {
              const e3 = ar(await on(r2, i2.offset - 20, 20));
              if (sr(e3, 0) == P) {
                l2 = ir(e3, 8);
                let t3 = await on(r2, l2, 56, -1), n2 = ar(t3);
                const s3 = i2.offset - 20 - 56;
                if (sr(n2, 0) != O && l2 != s3) {
                  const e4 = l2;
                  l2 = s3, S2 = l2 - e4, t3 = await on(r2, l2, 56, -1), n2 = ar(t3);
                }
                if (sr(n2, 0) != O) throw new d(Nn);
                g2 == U && (g2 = sr(n2, 16)), y2 == U && (y2 = sr(n2, 20)), b2 == U && (b2 = ir(n2, 32)), c2 == T && (c2 = ir(n2, 40)), l2 -= c2;
              }
            }
            if (l2 < r2.size || (S2 = r2.size - l2 - c2 - H, l2 = r2.size - c2 - H), m2 != g2) throw new d(Mn);
            if (0 > l2) throw new d(Ln);
            let z2 = 0, v2 = await on(r2, l2, c2, y2), x2 = ar(v2);
            if (c2) {
              const e3 = i2.offset - c2;
              if (sr(x2, z2) != W && l2 != e3) {
                const t3 = l2;
                l2 = e3, S2 += l2 - t3, v2 = await on(r2, l2, c2, y2), x2 = ar(v2);
              }
            }
            const A2 = i2.offset - l2 - (r2.lastDiskOffset || 0);
            if (c2 == A2 || 0 > A2 || (c2 = A2, v2 = await on(r2, l2, c2, y2), x2 = ar(v2)), 0 > l2 || l2 >= r2.size) throw new d(Ln);
            const C2 = $n(t2, e2, "filenameEncoding"), _2 = $n(t2, e2, "commentEncoding");
            for (let i3 = 0; b2 > i3; i3++) {
              const o3 = new Xn(r2, s2, t2.options);
              if (sr(x2, z2) != W) throw new d(Wn);
              Yn(o3, x2, z2 + 6);
              const c3 = !!o3.bitFlag.languageEncodingFlag, l3 = z2 + 46, u2 = l3 + o3.filenameLength, f3 = u2 + o3.extraFieldLength, w2 = rr(x2, z2 + 4), h3 = true, p3 = v2.subarray(l3, u2), g3 = rr(x2, z2 + 32), m3 = f3 + g3, y3 = v2.subarray(f3, m3), A3 = c3, D3 = c3, F3 = h3 && !(16 & ~nr(x2, z2 + 38)), R2 = sr(x2, z2 + 42) + S2;
              n.assign(o3, { versionMadeBy: w2, msDosCompatible: h3, compressedSize: 0, uncompressedSize: 0, commentLength: g3, directory: F3, offset: R2, diskNumberStart: rr(x2, z2 + 34), internalFileAttribute: rr(x2, z2 + 36), externalFileAttribute: sr(x2, z2 + 38), rawFilename: p3, filenameUTF8: A3, commentUTF8: D3, rawExtraField: v2.subarray(u2, f3) });
              const E2 = $n(t2, e2, "decodeText") || fn, T2 = A3 ? qn : C2 || Bn, U2 = D3 ? qn : _2 || Bn;
              let L2 = E2(p3, T2);
              L2 === Z && (L2 = fn(p3, T2));
              let I2 = E2(y3, U2);
              I2 === Z && (I2 = fn(y3, U2)), n.assign(o3, { rawComment: y3, filename: L2, comment: I2, directory: F3 || L2.endsWith(q) }), k2 = a.max(R2, k2), await Jn(o3, o3, x2, z2 + 6), o3.zipCrypto = o3.encrypted && !o3.extraFieldAES;
              const N2 = new Un(o3);
              N2.getData = (e3, t3) => o3.getData(e3, N2, t3), z2 = m3;
              const { onprogress: j2 } = e2;
              if (j2) try {
                await j2(i3 + 1, b2, new Un(o3));
              } catch (e3) {
              }
              yield N2;
            }
            const D2 = $n(t2, e2, "extractPrependedData"), F2 = $n(t2, e2, "extractAppendedData");
            return D2 && (t2.prependedData = k2 > 0 ? await on(r2, 0, k2) : new w()), t2.comment = h2 ? await on(r2, f2 + H, h2) : new w(), F2 && (t2.appendedData = p2 < r2.size ? await on(r2, p2, r2.size - p2) : new w()), true;
          }
          async getEntries(e2 = {}) {
            const t2 = [];
            for await (const n2 of this.getEntriesGenerator(e2)) t2.push(n2);
            return t2;
          }
          async close() {
          }
        }
        class Xn {
          constructor(e2, t2, r2) {
            n.assign(this, { reader: e2, config: t2, options: r2 });
          }
          async getData(e2, t2, r2 = {}) {
            const s2 = this, { reader: i2, offset: a2, diskNumberStart: o2, extraFieldAES: c2, compressionMethod: l2, config: u2, bitFlag: f2, signature: h2, rawLastModDate: p2, uncompressedSize: g2, compressedSize: m2 } = s2, y2 = t2.localDirectory = {}, b2 = ar(await on(i2, a2, 30, o2));
            let S2 = $n(s2, r2, "password"), k2 = $n(s2, r2, "rawPassword");
            const z2 = $n(s2, r2, "passThrough");
            if (S2 = S2 && S2.length && S2, k2 = k2 && k2.length && k2, c2 && 99 != c2.originalCompressionMethod) throw new d(Gn);
            if (0 != l2 && 8 != l2 && !z2) throw new d(Gn);
            if (sr(b2, 0) != L) throw new d(jn);
            Yn(y2, b2, 4), y2.rawExtraField = y2.extraFieldLength ? await on(i2, a2 + 30 + y2.filenameLength, y2.extraFieldLength, o2) : new w(), await Jn(s2, y2, b2, 4, true), n.assign(t2, { lastAccessDate: y2.lastAccessDate, creationDate: y2.creationDate });
            const v2 = s2.encrypted && y2.encrypted && !z2, x2 = v2 && !c2;
            if (z2 || (t2.zipCrypto = x2), v2) {
              if (!x2 && c2.strength === Z) throw new d(Hn);
              if (!S2 && !k2) throw new d(Pn);
            }
            const A2 = a2 + 30 + y2.filenameLength + y2.extraFieldLength, _2 = m2, D2 = i2.readable;
            n.assign(D2, { diskNumberStart: o2, offset: A2, size: _2 });
            const F2 = $n(s2, r2, "signal"), R2 = $n(s2, r2, "checkPasswordOnly");
            R2 && (e2 = new C()), e2 = an(e2), await rn(e2, z2 ? m2 : g2);
            const { writable: E2 } = e2, { onstart: T2, onprogress: U2, onend: I2 } = r2, N2 = { options: { codecType: ft, password: S2, rawPassword: k2, zipCrypto: x2, encryptionStrength: c2 && c2.strength, signed: $n(s2, r2, "checkSignature") && !z2, passwordVerification: x2 && (f2.dataDescriptor ? p2 >>> 8 & 255 : h2 >>> 24 & 255), signature: h2, compressed: 0 != l2 && !z2, encrypted: s2.encrypted && !z2, useWebWorkers: $n(s2, r2, "useWebWorkers"), useCompressionStream: $n(s2, r2, "useCompressionStream"), transferStreams: $n(s2, r2, "transferStreams"), checkPasswordOnly: R2 }, config: u2, streamOptions: { signal: F2, size: _2, onstart: T2, onprogress: U2, onend: I2 } };
            let W2 = 0;
            try {
              ({ outputSize: W2 } = await Ct({ readable: D2, writable: E2 }, N2));
            } catch (e3) {
              if (!R2 || e3.message != me) throw e3;
            } finally {
              const e3 = $n(s2, r2, "preventClose");
              E2.size += W2, e3 || E2.locked || await E2.getWriter().close();
            }
            return R2 ? Z : e2.getData ? e2.getData() : E2;
          }
        }
        function Yn(e2, t2, r2) {
          const s2 = e2.rawBitFlag = rr(t2, r2 + 2), i2 = !(1 & ~s2), a2 = sr(t2, r2 + 6);
          n.assign(e2, { encrypted: i2, version: rr(t2, r2), bitFlag: { level: (6 & s2) >> 1, dataDescriptor: !(8 & ~s2), languageEncodingFlag: (s2 & M) == M }, rawLastModDate: a2, lastModDate: er(a2), filenameLength: rr(t2, r2 + 22), extraFieldLength: rr(t2, r2 + 24) });
        }
        async function Jn(e2, t2, r2, s2, i2) {
          const { rawExtraField: a2 } = t2, l2 = t2.extraField = new c(), u2 = ar(new w(a2));
          let f2 = 0;
          try {
            for (; f2 < a2.length; ) {
              const e3 = rr(u2, f2), t3 = rr(u2, f2 + 2);
              l2.set(e3, { type: e3, data: a2.slice(f2 + 4, f2 + 4 + t3) }), f2 += 4 + t3;
            }
          } catch (e3) {
          }
          const h2 = rr(r2, s2 + 4);
          n.assign(t2, { signature: sr(r2, s2 + 10), uncompressedSize: sr(r2, s2 + 18), compressedSize: sr(r2, s2 + 14) });
          const p2 = l2.get(1);
          p2 && (((e3, t3) => {
            t3.zip64 = true;
            const n2 = ar(e3.data), r3 = Vn.filter((([e4, n3]) => t3[e4] == n3));
            for (let s3 = 0, i3 = 0; s3 < r3.length; s3++) {
              const [a3, o2] = r3[s3];
              if (t3[a3] == o2) {
                const r4 = Zn[o2];
                t3[a3] = e3[a3] = r4.getValue(n2, i3), i3 += r4.bytes;
              } else if (e3[a3]) throw new d(On);
            }
          })(p2, t2), t2.extraFieldZip64 = p2);
          const g2 = l2.get(28789);
          g2 && (await Qn(g2, dn, wn, t2, e2), t2.extraFieldUnicodePath = g2);
          const m2 = l2.get(25461);
          m2 && (await Qn(m2, hn, pn, t2, e2), t2.extraFieldUnicodeComment = m2);
          const y2 = l2.get(39169);
          y2 ? (((e3, t3, r3) => {
            const s3 = ar(e3.data), i3 = nr(s3, 4);
            n.assign(e3, { vendorVersion: nr(s3, 0), vendorId: nr(s3, 2), strength: i3, originalCompressionMethod: r3, compressionMethod: rr(s3, 5) }), t3.compressionMethod = e3.compressionMethod;
          })(y2, t2, h2), t2.extraFieldAES = y2) : t2.compressionMethod = h2;
          const b2 = l2.get(10);
          b2 && (((e3, t3) => {
            const r3 = ar(e3.data);
            let s3, i3 = 4;
            try {
              for (; i3 < e3.data.length && !s3; ) {
                const t4 = rr(r3, i3), n2 = rr(r3, i3 + 2);
                1 == t4 && (s3 = e3.data.slice(i3 + 4, i3 + 4 + n2)), i3 += 4 + n2;
              }
            } catch (e4) {
            }
            try {
              if (s3 && 24 == s3.length) {
                const r4 = ar(s3), i4 = r4.getBigUint64(0, true), a3 = r4.getBigUint64(8, true), o2 = r4.getBigUint64(16, true);
                n.assign(e3, { rawLastModDate: i4, rawLastAccessDate: a3, rawCreationDate: o2 });
                const c2 = { lastModDate: tr(i4), lastAccessDate: tr(a3), creationDate: tr(o2) };
                n.assign(e3, c2), n.assign(t3, c2);
              }
            } catch (e4) {
            }
          })(b2, t2), t2.extraFieldNTFS = b2);
          const S2 = l2.get(G);
          S2 && (((e3, t3, n2) => {
            const r3 = ar(e3.data), s3 = nr(r3, 0), i3 = [], a3 = [];
            n2 ? (1 & ~s3 || (i3.push(Sn), a3.push(kn)), 2 & ~s3 || (i3.push(zn), a3.push("rawLastAccessDate")), 4 & ~s3 || (i3.push(vn), a3.push("rawCreationDate"))) : 5 > e3.data.length || (i3.push(Sn), a3.push(kn));
            let c2 = 1;
            i3.forEach(((n3, s4) => {
              if (e3.data.length >= c2 + 4) {
                const i4 = sr(r3, c2);
                t3[n3] = e3[n3] = new o(1e3 * i4);
                const l3 = a3[s4];
                e3[l3] = i4;
              }
              c2 += 4;
            }));
          })(S2, t2, i2), t2.extraFieldExtendedTimestamp = S2);
          const k2 = l2.get(6534);
          k2 && (t2.extraFieldUSDZ = k2);
        }
        async function Qn(e2, t2, r2, s2, i2) {
          const a2 = ar(e2.data), o2 = new ae();
          o2.append(i2[r2]);
          const c2 = ar(new w(4));
          c2.setUint32(0, o2.get(), true);
          const l2 = sr(a2, 1);
          n.assign(e2, { version: nr(a2, 0), [t2]: fn(e2.data.subarray(5)), valid: !i2.bitFlag.languageEncodingFlag && l2 == sr(c2, 0) }), e2.valid && (s2[t2] = e2[t2], s2[t2 + "UTF8"] = true);
        }
        function $n(e2, t2, n2) {
          return t2[n2] === Z ? e2.options[n2] : t2[n2];
        }
        function er(e2) {
          const t2 = (4294901760 & e2) >> 16, n2 = 65535 & e2;
          try {
            return new o(1980 + ((65024 & t2) >> 9), ((480 & t2) >> 5) - 1, 31 & t2, (63488 & n2) >> 11, (2016 & n2) >> 5, 2 * (31 & n2), 0);
          } catch (e3) {
          }
        }
        function tr(e2) {
          return new o(s(e2 / i(1e4) - i(116444736e5)));
        }
        function nr(e2, t2) {
          return e2.getUint8(t2);
        }
        function rr(e2, t2) {
          return e2.getUint16(t2, true);
        }
        function sr(e2, t2) {
          return e2.getUint32(t2, true);
        }
        function ir(e2, t2) {
          return s(e2.getBigUint64(t2, true));
        }
        function ar(e2) {
          return new g(e2.buffer);
        }
        const or = "File already exists", cr = "Zip file comment exceeds 64KB", lr = "File entry comment exceeds 64KB", ur = "File entry name exceeds 64KB", fr = "Version exceeds 65535", dr = "The strength must equal 1, 2, or 3", wr = "Extra field type exceeds 65535", hr = "Extra field data exceeds 64KB", pr = "Zip64 is not supported (make sure 'keepOrder' is set to 'true')", gr = "Undefined uncompressed size", mr = new w([7, 0, 2, 0, 65, 69, 3, 0, 0]);
        let yr = 0;
        const br = [];
        class Sr {
          constructor(e2, t2 = {}) {
            const r2 = (e2 = an(e2)).availableSize !== Z && e2.availableSize > 0 && e2.availableSize !== 1 / 0 && e2.maxSize !== Z && e2.maxSize > 0 && e2.maxSize !== 1 / 0;
            n.assign(this, { writer: e2, addSplitZipSignature: r2, options: t2, config: ee(), files: new c(), filenames: new l(), offset: t2.offset === Z ? e2.writable.size : t2.offset, pendingEntriesSize: 0, pendingAddFileCalls: new l(), bufferedWrites: 0 });
          }
          async add(e2 = "", r2, s2 = {}) {
            const c2 = this, { pendingAddFileCalls: l2, config: f2 } = c2;
            let m2;
            yr < f2.maxWorkers ? yr++ : await new y(((e3) => br.push(e3)));
            try {
              if (e2 = e2.trim(), c2.filenames.has(e2)) throw new d(or);
              return c2.filenames.add(e2), m2 = (async (e3, r3, s3, c3) => {
                r3 = r3.trim(), c3.directory && !r3.endsWith(q) ? r3 += q : c3.directory = r3.endsWith(q);
                const l3 = vr(e3, c3, "encodeText", ce);
                let f3 = l3(r3);
                if (f3 === Z && (f3 = ce(r3)), Er(f3) > U) throw new d(ur);
                const m3 = c3.comment || "";
                let b2 = l3(m3);
                if (b2 === Z && (b2 = ce(m3)), Er(b2) > U) throw new d(lr);
                const S2 = vr(e3, c3, Fn, 20);
                if (S2 > U) throw new d(fr);
                const k2 = vr(e3, c3, Rn, 20);
                if (k2 > U) throw new d(fr);
                const z2 = vr(e3, c3, Sn, new o()), v2 = vr(e3, c3, zn), A2 = vr(e3, c3, vn), C2 = vr(e3, c3, Cn, true), _2 = vr(e3, c3, xn, 0), D2 = vr(e3, c3, An, 0), F2 = vr(e3, c3, "passThrough");
                let R2, E2;
                F2 || (R2 = vr(e3, c3, "password"), E2 = vr(e3, c3, "rawPassword"));
                const W2 = vr(e3, c3, "encryptionStrength", 3), j2 = vr(e3, c3, En), O2 = vr(e3, c3, "extendedTimestamp", true), P2 = vr(e3, c3, "keepOrder", true), H2 = vr(e3, c3, "level"), K2 = vr(e3, c3, "useWebWorkers"), X2 = vr(e3, c3, "bufferedWrite"), Y2 = vr(e3, c3, "dataDescriptorSignature", false), J2 = vr(e3, c3, "signal"), Q2 = vr(e3, c3, "useUnicodeFileNames", true), $2 = vr(e3, c3, "useCompressionStream"), ee2 = vr(e3, c3, "compressionMethod");
                let ne2 = vr(e3, c3, "dataDescriptor", true), re2 = vr(e3, c3, _n);
                if (!j2 && (R2 !== Z || E2 !== Z) && (1 > W2 || W2 > 3)) throw new d(dr);
                let se2 = new w();
                const { extraField: ie2 } = c3;
                if (ie2) {
                  let e4 = 0, t2 = 0;
                  ie2.forEach(((t3) => e4 += 4 + Er(t3))), se2 = new w(e4), ie2.forEach(((e5, n2) => {
                    if (n2 > U) throw new d(wr);
                    if (Er(e5) > U) throw new d(hr);
                    Fr(se2, new h([n2]), t2), Fr(se2, new h([Er(e5)]), t2 + 2), Fr(se2, e5, t2 + 4), t2 += 4 + Er(e5);
                  }));
                }
                let ae2 = 0, oe2 = 0, le2 = 0;
                if (F2 && ({ uncompressedSize: le2 } = c3, le2 === Z)) throw new d(gr);
                const ue2 = true === re2;
                s3 && (s3 = sn(s3), await rn(s3), F2 ? ae2 = xr(le2) : s3.size === Z ? (ne2 = true, (re2 || re2 === Z) && (re2 = true, le2 = ae2 = 4294967296)) : (le2 = s3.size, ae2 = xr(le2)));
                const { diskOffset: fe2, diskNumber: de2, maxSize: we2 } = e3.writer, he2 = ue2 || le2 > T, pe2 = ue2 || ae2 > T, ge2 = ue2 || e3.offset + e3.pendingEntriesSize - fe2 > T, me2 = vr(e3, c3, "supportZip64SplitFile", true) && ue2 || de2 + a.ceil(e3.pendingEntriesSize / we2) > U;
                if (ge2 || he2 || pe2 || me2) {
                  if (false === re2 || !P2) throw new d(pr);
                  re2 = true;
                }
                re2 = re2 || false;
                const ye2 = vr(e3, c3, Dn), { signature: be2 } = c3, Se2 = ((e4) => {
                  const { rawFilename: t2, lastModDate: n2, lastAccessDate: r4, creationDate: s4, level: i2, zip64: o2, zipCrypto: c4, useUnicodeFileNames: l4, dataDescriptor: u2, directory: f4, rawExtraField: d2, encryptionStrength: h2, extendedTimestamp: g2, encrypted: m4 } = e4, y2 = 0 !== i2 && !f4;
                  let b3, S3, k3, z3, { version: v3, compressionMethod: x2 } = e4;
                  if (m4 && !c4) {
                    b3 = new w(Er(mr) + 2);
                    const e5 = Rr(b3);
                    Cr(e5, 0, 39169), Fr(b3, mr, 2), Ar(e5, 8, h2);
                  } else b3 = new w();
                  if (g2) {
                    k3 = new w(9 + (r4 ? 4 : 0) + (s4 ? 4 : 0));
                    const e5 = Rr(k3);
                    Cr(e5, 0, G), Cr(e5, 2, Er(k3) - 4), z3 = 1 + (r4 ? 2 : 0) + (s4 ? 4 : 0), Ar(e5, 4, z3);
                    let t3 = 5;
                    _r(e5, t3, a.floor(n2.getTime() / 1e3)), t3 += 4, r4 && (_r(e5, t3, a.floor(r4.getTime() / 1e3)), t3 += 4), s4 && _r(e5, t3, a.floor(s4.getTime() / 1e3));
                    try {
                      S3 = new w(36);
                      const e6 = Rr(S3), t4 = zr(n2);
                      Cr(e6, 0, 10), Cr(e6, 2, 32), Cr(e6, 8, 1), Cr(e6, 10, 24), Dr(e6, 12, t4), Dr(e6, 20, zr(r4) || t4), Dr(e6, 28, zr(s4) || t4);
                    } catch (e6) {
                      S3 = new w();
                    }
                  } else S3 = k3 = new w();
                  let A3 = 0;
                  l4 && (A3 |= M), u2 && (A3 |= 8), x2 === Z && (x2 = y2 ? 8 : 0), 8 == x2 && (i2 >= 1 && 3 > i2 && (A3 |= 6), i2 >= 3 && 5 > i2 && (A3 |= 1), 9 === i2 && (A3 |= 2)), o2 && (v3 = v3 > 45 ? v3 : 45), m4 && (A3 |= 1, c4 || (v3 = v3 > 51 ? v3 : 51, b3[9] = x2, x2 = 99));
                  const C3 = new w(26), _3 = Rr(C3);
                  Cr(_3, 0, v3), Cr(_3, 2, A3), Cr(_3, 4, x2);
                  const D3 = new p(1), F3 = Rr(D3);
                  let R3;
                  R3 = V > n2 ? V : n2 > B ? B : n2, Cr(F3, 0, (R3.getHours() << 6 | R3.getMinutes()) << 5 | R3.getSeconds() / 2), Cr(F3, 2, (R3.getFullYear() - 1980 << 4 | R3.getMonth() + 1) << 5 | R3.getDate());
                  const E3 = D3[0];
                  _r(_3, 6, E3), Cr(_3, 22, Er(t2));
                  const T2 = Er(b3, k3, S3, d2);
                  Cr(_3, 24, T2);
                  const U2 = new w(30 + Er(t2) + T2);
                  return _r(Rr(U2), 0, L), Fr(U2, C3, 4), Fr(U2, t2, 30), Fr(U2, b3, 30 + Er(t2)), Fr(U2, k3, 30 + Er(t2, b3)), Fr(U2, S3, 30 + Er(t2, b3, k3)), Fr(U2, d2, 30 + Er(t2, b3, k3, S3)), { localHeaderArray: U2, headerArray: C3, headerView: _3, lastModDate: n2, rawLastModDate: E3, encrypted: m4, compressed: y2, version: v3, compressionMethod: x2, extraFieldExtendedTimestampFlag: z3, rawExtraFieldExtendedTimestamp: k3, rawExtraFieldNTFS: S3, rawExtraFieldAES: b3, extraFieldLength: T2 };
                })(c3 = n.assign({}, c3, { rawFilename: f3, rawComment: b2, version: S2, versionMadeBy: k2, lastModDate: z2, lastAccessDate: v2, creationDate: A2, rawExtraField: se2, zip64: re2, zip64UncompressedSize: he2, zip64CompressedSize: pe2, zip64Offset: ge2, zip64DiskNumberStart: me2, password: R2, rawPassword: E2, level: $2 || e3.config.CompressionStream !== Z || e3.config.CompressionStreamNative !== Z ? H2 : 0, useWebWorkers: K2, encryptionStrength: W2, extendedTimestamp: O2, zipCrypto: j2, bufferedWrite: X2, keepOrder: P2, useUnicodeFileNames: Q2, dataDescriptor: ne2, dataDescriptorSignature: Y2, signal: J2, msDosCompatible: C2, internalFileAttribute: _2, externalFileAttribute: D2, useCompressionStream: $2, passThrough: F2, encrypted: !!(R2 && Er(R2) || E2 && Er(E2)) || F2 && ye2, signature: be2, compressionMethod: ee2 })), ke2 = ((e4) => {
                  const { zip64: t2, dataDescriptor: n2, dataDescriptorSignature: r4 } = e4;
                  let s4, i2 = new w(), a2 = 0;
                  return n2 && (i2 = new w(t2 ? r4 ? 24 : 20 : r4 ? 16 : 12), s4 = Rr(i2), r4 && (a2 = 4, _r(s4, 0, N))), { dataDescriptorArray: i2, dataDescriptorView: s4, dataDescriptorOffset: a2 };
                })(c3), ze2 = Er(Se2.localHeaderArray, ke2.dataDescriptorArray);
                let ve2;
                oe2 = ze2 + ae2, e3.options.usdz && (oe2 += oe2 + 64), e3.pendingEntriesSize += oe2;
                try {
                  ve2 = await (async (e4, r4, s4, a2, o2) => {
                    const { files: c4, writer: l4 } = e4, { keepOrder: f4, dataDescriptor: h2, signal: p2 } = o2, { headerInfo: m4 } = a2, { usdz: b3 } = e4.options, S3 = t.from(c4.values()).pop();
                    let k3, z3, v3, A3, C3, _3, D3, F3 = {};
                    c4.set(r4, F3);
                    try {
                      let t2;
                      f4 && (t2 = S3 && S3.lock, F3.lock = new y(((e5) => v3 = e5))), !(o2.bufferedWrite || e4.writerLocked || e4.bufferedWrites && f4) && h2 || b3 ? (_3 = l4, await R3()) : (_3 = new x(), D3 = new u(_3.readable).blob(), _3.writable.size = 0, k3 = true, e4.bufferedWrites++, await rn(l4)), await rn(_3);
                      const { writable: m5 } = l4;
                      let { diskOffset: z4 } = l4;
                      if (e4.addSplitZipSignature) {
                        delete e4.addSplitZipSignature;
                        const t3 = new w(4);
                        _r(Rr(t3), 0, I), await kr(m5, t3), e4.offset += 4;
                      }
                      b3 && ((e5, t3) => {
                        const { headerInfo: n2 } = e5;
                        let { localHeaderArray: r5, extraFieldLength: s5 } = n2, i2 = Rr(r5), a3 = 64 - (t3 + Er(r5)) % 64;
                        4 > a3 && (a3 += 64);
                        const o3 = new w(a3), c5 = Rr(o3);
                        Cr(c5, 0, 6534), Cr(c5, 2, a3 - 2);
                        const l5 = r5;
                        n2.localHeaderArray = r5 = new w(Er(l5) + a3), Fr(r5, l5), Fr(r5, o3, Er(l5)), i2 = Rr(r5), Cr(i2, 28, s5 + a3), e5.metadataSize += a3;
                      })(a2, e4.offset - z4), k3 || (await t2, await E3(m5));
                      const { diskNumber: U2 } = l4;
                      if (C3 = true, F3.diskNumberStart = U2, F3 = await (async (e5, t3, { diskNumberStart: r5, lock: s5 }, a3, o3, c5) => {
                        const { headerInfo: l5, dataDescriptorInfo: u2, metadataSize: f5 } = a3, { localHeaderArray: d2, headerArray: h3, lastModDate: p3, rawLastModDate: g2, encrypted: m6, compressed: y2, version: b4, compressionMethod: S4, rawExtraFieldExtendedTimestamp: k4, extraFieldExtendedTimestampFlag: z5, rawExtraFieldNTFS: v4, rawExtraFieldAES: x2 } = l5, { dataDescriptorArray: A4 } = u2, { rawFilename: C4, lastAccessDate: _4, creationDate: D4, password: F4, rawPassword: R4, level: E4, zip64: U3, zip64UncompressedSize: L2, zip64CompressedSize: I2, zip64Offset: N2, zip64DiskNumberStart: W3, zipCrypto: j3, dataDescriptor: O3, directory: P3, versionMadeBy: H3, rawComment: G2, rawExtraField: M2, useWebWorkers: q2, onstart: B2, onprogress: V2, onend: K3, signal: X3, encryptionStrength: Y3, extendedTimestamp: J3, msDosCompatible: Q3, internalFileAttribute: $3, externalFileAttribute: ee3, useCompressionStream: ne3, passThrough: re3 } = c5, se3 = { lock: s5, versionMadeBy: H3, zip64: U3, directory: !!P3, filenameUTF8: true, rawFilename: C4, commentUTF8: true, rawComment: G2, rawExtraFieldExtendedTimestamp: k4, rawExtraFieldNTFS: v4, rawExtraFieldAES: x2, rawExtraField: M2, extendedTimestamp: J3, msDosCompatible: Q3, internalFileAttribute: $3, externalFileAttribute: ee3, diskNumberStart: r5 };
                        let { signature: ie3, uncompressedSize: ae3 } = c5, oe3 = 0;
                        re3 || (ae3 = 0);
                        const { writable: ce2 } = t3;
                        if (e5) {
                          e5.chunkSize = te(o3), await kr(ce2, d2);
                          const t4 = e5.readable, n2 = t4.size = e5.size, r6 = { options: { codecType: ut, level: E4, rawPassword: R4, password: F4, encryptionStrength: Y3, zipCrypto: m6 && j3, passwordVerification: m6 && j3 && g2 >> 8 & 255, signed: !re3, compressed: y2 && !re3, encrypted: m6 && !re3, useWebWorkers: q2, useCompressionStream: ne3, transferStreams: false }, config: o3, streamOptions: { signal: X3, size: n2, onstart: B2, onprogress: V2, onend: K3 } }, s6 = await Ct({ readable: t4, writable: ce2 }, r6);
                          oe3 = s6.outputSize, re3 || (ae3 = s6.inputSize, ie3 = s6.signature), ce2.size += ae3;
                        } else await kr(ce2, d2);
                        let le3;
                        if (U3) {
                          let e6 = 4;
                          L2 && (e6 += 8), I2 && (e6 += 8), N2 && (e6 += 8), W3 && (e6 += 4), le3 = new w(e6);
                        } else le3 = new w();
                        return ((e6, t4) => {
                          const { signature: n2, rawExtraFieldZip64: r6, compressedSize: s6, uncompressedSize: a4, headerInfo: o4, dataDescriptorInfo: c6 } = e6, { headerView: l6, encrypted: u3 } = o4, { dataDescriptorView: f6, dataDescriptorOffset: d3 } = c6, { zip64: w2, zip64UncompressedSize: h4, zip64CompressedSize: p4, zipCrypto: g3, dataDescriptor: m7 } = t4;
                          if (u3 && !g3 || n2 === Z || (_r(l6, 10, n2), m7 && _r(f6, d3, n2)), w2) {
                            const e7 = Rr(r6);
                            Cr(e7, 0, 1), Cr(e7, 2, Er(r6) - 4);
                            let t5 = 4;
                            h4 && (_r(l6, 18, T), Dr(e7, t5, i(a4)), t5 += 8), p4 && (_r(l6, 14, T), Dr(e7, t5, i(s6))), m7 && (Dr(f6, d3 + 4, i(s6)), Dr(f6, d3 + 12, i(a4)));
                          } else _r(l6, 14, s6), _r(l6, 18, a4), m7 && (_r(f6, d3 + 4, s6), _r(f6, d3 + 8, a4));
                        })({ signature: ie3, rawExtraFieldZip64: le3, compressedSize: oe3, uncompressedSize: ae3, headerInfo: l5, dataDescriptorInfo: u2 }, c5), O3 && await kr(ce2, A4), n.assign(se3, { uncompressedSize: ae3, compressedSize: oe3, lastModDate: p3, rawLastModDate: g2, creationDate: D4, lastAccessDate: _4, encrypted: m6, zipCrypto: j3, size: f5 + oe3, compressionMethod: S4, version: b4, headerArray: h3, signature: ie3, rawExtraFieldZip64: le3, extraFieldExtendedTimestampFlag: z5, zip64UncompressedSize: L2, zip64CompressedSize: I2, zip64Offset: N2, zip64DiskNumberStart: W3 }), se3;
                      })(s4, _3, F3, a2, e4.config, o2), C3 = false, c4.set(r4, F3), F3.filename = r4, k3) {
                        await _3.writable.getWriter().close();
                        let e5 = await D3;
                        await t2, await R3(), A3 = true, h2 || (e5 = await (async (e6, t3, n2, { zipCrypto: r5 }) => {
                          let s5;
                          s5 = await t3.slice(0, 26).arrayBuffer(), 26 != s5.byteLength && (s5 = s5.slice(0, 26));
                          const i2 = new g(s5);
                          return e6.encrypted && !r5 || _r(i2, 14, e6.signature), e6.zip64 ? (_r(i2, 18, T), _r(i2, 22, T)) : (_r(i2, 18, e6.compressedSize), _r(i2, 22, e6.uncompressedSize)), await kr(n2, new w(s5)), t3.slice(s5.byteLength);
                        })(F3, e5, m5, o2)), await E3(m5), F3.diskNumberStart = l4.diskNumber, z4 = l4.diskOffset, await e5.stream().pipeTo(m5, { preventClose: true, preventAbort: true, signal: p2 }), m5.size += e5.size, A3 = false;
                      }
                      if (F3.offset = e4.offset - z4, F3.zip64) ((e5, t3) => {
                        const { rawExtraFieldZip64: n2, offset: r5, diskNumberStart: s5 } = e5, { zip64UncompressedSize: a3, zip64CompressedSize: o3, zip64Offset: c5, zip64DiskNumberStart: l5 } = t3, u2 = Rr(n2);
                        let f5 = 4;
                        a3 && (f5 += 8), o3 && (f5 += 8), c5 && (Dr(u2, f5, i(r5)), f5 += 8), l5 && _r(u2, f5, s5);
                      })(F3, o2);
                      else if (F3.offset > T) throw new d(pr);
                      return e4.offset += F3.size, F3;
                    } catch (t2) {
                      if (k3 && A3 || !k3 && C3) {
                        if (e4.hasCorruptedEntries = true, t2) try {
                          t2.corruptedEntry = true;
                        } catch (e5) {
                        }
                        k3 ? e4.offset += _3.writable.size : e4.offset = _3.writable.size;
                      }
                      throw c4.delete(r4), t2;
                    } finally {
                      k3 && e4.bufferedWrites--, v3 && v3(), z3 && z3();
                    }
                    async function R3() {
                      e4.writerLocked = true;
                      const { lockWriter: t2 } = e4;
                      e4.lockWriter = new y(((t3) => z3 = () => {
                        e4.writerLocked = false, t3();
                      })), await t2;
                    }
                    async function E3(e5) {
                      Er(m4.localHeaderArray) > l4.availableSize && (l4.availableSize = 0, await kr(e5, new w()));
                    }
                  })(e3, r3, s3, { headerInfo: Se2, dataDescriptorInfo: ke2, metadataSize: ze2 }, c3);
                } finally {
                  e3.pendingEntriesSize -= oe2;
                }
                return n.assign(ve2, { name: r3, comment: m3, extraField: ie2 }), new Un(ve2);
              })(c2, e2, r2, s2), l2.add(m2), await m2;
            } catch (t2) {
              throw c2.filenames.delete(e2), t2;
            } finally {
              l2.delete(m2);
              const e3 = br.shift();
              e3 ? e3() : yr--;
            }
          }
          async close(e2 = new w(), n2 = {}) {
            const { pendingAddFileCalls: r2, writer: s2 } = this, { writable: o2 } = s2;
            for (; r2.size; ) await y.allSettled(t.from(r2));
            return await (async (e3, n3, r3) => {
              const { files: s3, writer: o3 } = e3, { diskOffset: c2, writable: l2 } = o3;
              let { diskNumber: u2 } = o3, f2 = 0, h2 = 0, p2 = e3.offset - c2, g2 = s3.size;
              for (const [, e4] of s3) {
                const { rawFilename: t2, rawExtraFieldZip64: n4, rawExtraFieldAES: r4, rawComment: s4, rawExtraFieldNTFS: i2, rawExtraField: o4, extendedTimestamp: c3, extraFieldExtendedTimestampFlag: l3, lastModDate: u3 } = e4;
                let f3;
                if (c3) {
                  f3 = new w(9);
                  const e5 = Rr(f3);
                  Cr(e5, 0, G), Cr(e5, 2, 5), Ar(e5, 4, l3), _r(e5, 5, a.floor(u3.getTime() / 1e3));
                } else f3 = new w();
                e4.rawExtraFieldCDExtendedTimestamp = f3, h2 += 46 + Er(t2, s4, n4, r4, i2, f3, o4);
              }
              const m2 = new w(h2), y2 = Rr(m2);
              await rn(o3);
              let b2 = 0;
              for (const [e4, n4] of t.from(s3.values()).entries()) {
                const { offset: t2, rawFilename: i2, rawExtraFieldZip64: a2, rawExtraFieldAES: c3, rawExtraFieldCDExtendedTimestamp: u3, rawExtraFieldNTFS: d2, rawExtraField: w2, rawComment: h3, versionMadeBy: p3, headerArray: g3, directory: S3, zip64: k3, zip64UncompressedSize: z3, zip64CompressedSize: v3, zip64DiskNumberStart: x3, zip64Offset: A3, msDosCompatible: C2, internalFileAttribute: _2, externalFileAttribute: D2, diskNumberStart: F2, uncompressedSize: R2, compressedSize: E2 } = n4, L2 = Er(a2, c3, u3, d2, w2);
                _r(y2, f2, W), Cr(y2, f2 + 4, p3);
                const I2 = Rr(g3);
                z3 || _r(I2, 18, R2), v3 || _r(I2, 14, E2), Fr(m2, g3, f2 + 6), Cr(y2, f2 + 30, L2), Cr(y2, f2 + 32, Er(h3)), Cr(y2, f2 + 34, k3 && x3 ? U : F2), Cr(y2, f2 + 36, _2), D2 ? _r(y2, f2 + 38, D2) : S3 && C2 && Ar(y2, f2 + 38, 16), _r(y2, f2 + 42, k3 && A3 ? T : t2), Fr(m2, i2, f2 + 46), Fr(m2, a2, f2 + 46 + Er(i2)), Fr(m2, c3, f2 + 46 + Er(i2, a2)), Fr(m2, u3, f2 + 46 + Er(i2, a2, c3)), Fr(m2, d2, f2 + 46 + Er(i2, a2, c3, u3)), Fr(m2, w2, f2 + 46 + Er(i2, a2, c3, u3, d2)), Fr(m2, h3, f2 + 46 + Er(i2) + L2);
                const N2 = 46 + Er(i2, h3) + L2;
                if (f2 - b2 > o3.availableSize && (o3.availableSize = 0, await kr(l2, m2.slice(b2, f2)), b2 = f2), f2 += N2, r3.onprogress) try {
                  await r3.onprogress(e4 + 1, s3.size, new Un(n4));
                } catch (e5) {
                }
              }
              await kr(l2, b2 ? m2.slice(b2) : m2);
              let S2 = o3.diskNumber;
              const { availableSize: k2 } = o3;
              H > k2 && S2++;
              let z2 = vr(e3, r3, _n);
              if (p2 > T || h2 > T || g2 > U || S2 > U) {
                if (false === z2) throw new d(pr);
                z2 = true;
              }
              const v2 = new w(z2 ? 98 : H), x2 = Rr(v2);
              f2 = 0, z2 && (_r(x2, 0, O), Dr(x2, 4, i(44)), Cr(x2, 12, 45), Cr(x2, 14, 45), _r(x2, 16, S2), _r(x2, 20, u2), Dr(x2, 24, i(g2)), Dr(x2, 32, i(g2)), Dr(x2, 40, i(h2)), Dr(x2, 48, i(p2)), _r(x2, 56, P), Dr(x2, 64, i(p2) + i(h2)), _r(x2, 72, S2 + 1), vr(e3, r3, "supportZip64SplitFile", true) && (S2 = U, u2 = U), g2 = U, p2 = T, h2 = T, f2 += 76), _r(x2, f2, j), Cr(x2, f2 + 4, S2), Cr(x2, f2 + 6, u2), Cr(x2, f2 + 8, g2), Cr(x2, f2 + 10, g2), _r(x2, f2 + 12, h2), _r(x2, f2 + 16, p2);
              const A2 = Er(n3);
              if (A2) {
                if (A2 > U) throw new d(cr);
                Cr(x2, f2 + 20, A2);
              }
              await kr(l2, v2), A2 && await kr(l2, n3);
            })(this, e2, n2), vr(this, n2, "preventClose") || await o2.getWriter().close(), s2.getData ? s2.getData() : o2;
          }
        }
        async function kr(e2, t2) {
          const n2 = e2.getWriter();
          try {
            await n2.ready, e2.size += Er(t2), await n2.write(t2);
          } finally {
            n2.releaseLock();
          }
        }
        function zr(e2) {
          if (e2) return (i(e2.getTime()) + i(116444736e5)) * i(1e4);
        }
        function vr(e2, t2, n2, r2) {
          const s2 = t2[n2] === Z ? e2.options[n2] : t2[n2];
          return s2 === Z ? r2 : s2;
        }
        function xr(e2) {
          return e2 + 5 * (a.floor(e2 / 16383) + 1);
        }
        function Ar(e2, t2, n2) {
          e2.setUint8(t2, n2);
        }
        function Cr(e2, t2, n2) {
          e2.setUint16(t2, n2, true);
        }
        function _r(e2, t2, n2) {
          e2.setUint32(t2, n2, true);
        }
        function Dr(e2, t2, n2) {
          e2.setBigUint64(t2, n2, true);
        }
        function Fr(e2, t2, n2) {
          e2.set(t2, n2);
        }
        function Rr(e2) {
          return new g(e2.buffer);
        }
        function Er(...e2) {
          let t2 = 0;
          return e2.forEach(((e3) => e3 && (t2 += e3.length))), t2;
        }
        let Tr;
        try {
          Tr = void 0 === k && "undefined" == typeof location ? __require("url").pathToFileURL(__filename).href : void 0 === k ? location.href : E && "SCRIPT" === E.tagName.toUpperCase() && E.src || new f("zip.min.js", k.baseURI).href;
        } catch (e2) {
        }
        ne({ baseURL: Tr }), ((e2, t2 = {}) => {
          const n2 = 'const{Array:e,Object:t,Number:n,Math:r,Error:s,Uint8Array:i,Uint16Array:o,Uint32Array:c,Int32Array:f,Map:a,DataView:l,Promise:u,TextEncoder:w,crypto:h,postMessage:d,TransformStream:p,ReadableStream:y,WritableStream:m,CompressionStream:b,DecompressionStream:g}=self,k=void 0,v="undefined",S="function";class z{constructor(e){return class extends p{constructor(t,n){const r=new e(n);super({transform(e,t){t.enqueue(r.append(e))},flush(e){const t=r.flush();t&&e.enqueue(t)}})}}}}const C=[];for(let e=0;256>e;e++){let t=e;for(let e=0;8>e;e++)1&t?t=t>>>1^3988292384:t>>>=1;C[e]=t}class x{constructor(e){this.t=e||-1}append(e){let t=0|this.t;for(let n=0,r=0|e.length;r>n;n++)t=t>>>8^C[255&(t^e[n])];this.t=t}get(){return~this.t}}class A extends p{constructor(){let e;const t=new x;super({transform(e,n){t.append(e),n.enqueue(e)},flush(){const n=new i(4);new l(n.buffer).setUint32(0,t.get()),e.value=n}}),e=this}}const _={concat(e,t){if(0===e.length||0===t.length)return e.concat(t);const n=e[e.length-1],r=_.i(n);return 32===r?e.concat(t):_.o(t,r,0|n,e.slice(0,e.length-1))},l(e){const t=e.length;if(0===t)return 0;const n=e[t-1];return 32*(t-1)+_.i(n)},u(e,t){if(32*e.length<t)return e;const n=(e=e.slice(0,r.ceil(t/32))).length;return t&=31,n>0&&t&&(e[n-1]=_.h(t,e[n-1]&2147483648>>t-1,1)),e},h:(e,t,n)=>32===e?t:(n?0|t:t<<32-e)+1099511627776*e,i:e=>r.round(e/1099511627776)||32,o(e,t,n,r){for(void 0===r&&(r=[]);t>=32;t-=32)r.push(n),n=0;if(0===t)return r.concat(e);for(let s=0;s<e.length;s++)r.push(n|e[s]>>>t),n=e[s]<<32-t;const s=e.length?e[e.length-1]:0,i=_.i(s);return r.push(_.h(t+i&31,t+i>32?n:r.pop(),1)),r}},I={p:{m(e){const t=_.l(e)/8,n=new i(t);let r;for(let s=0;t>s;s++)3&s||(r=e[s/4]),n[s]=r>>>24,r<<=8;return n},k(e){const t=[];let n,r=0;for(n=0;n<e.length;n++)r=r<<8|e[n],3&~n||(t.push(r),r=0);return 3&n&&t.push(_.h(8*(3&n),r)),t}}},P=class{constructor(e){const t=this;t.blockSize=512,t.v=[1732584193,4023233417,2562383102,271733878,3285377520],t.S=[1518500249,1859775393,2400959708,3395469782],e?(t.C=e.C.slice(0),t.A=e.A.slice(0),t._=e._):t.reset()}reset(){const e=this;return e.C=e.v.slice(0),e.A=[],e._=0,e}update(e){const t=this;"string"==typeof e&&(e=I.I.k(e));const n=t.A=_.concat(t.A,e),r=t._,i=t._=r+_.l(e);if(i>9007199254740991)throw new s("Cannot hash more than 2^53 - 1 bits");const o=new c(n);let f=0;for(let e=t.blockSize+r-(t.blockSize+r&t.blockSize-1);i>=e;e+=t.blockSize)t.P(o.subarray(16*f,16*(f+1))),f+=1;return n.splice(0,16*f),t}D(){const e=this;let t=e.A;const n=e.C;t=_.concat(t,[_.h(1,1)]);for(let e=t.length+2;15&e;e++)t.push(0);for(t.push(r.floor(e._/4294967296)),t.push(0|e._);t.length;)e.P(t.splice(0,16));return e.reset(),n}V(e,t,n,r){return e>19?e>39?e>59?e>79?void 0:t^n^r:t&n|t&r|n&r:t^n^r:t&n|~t&r}R(e,t){return t<<e|t>>>32-e}P(t){const n=this,s=n.C,i=e(80);for(let e=0;16>e;e++)i[e]=t[e];let o=s[0],c=s[1],f=s[2],a=s[3],l=s[4];for(let e=0;79>=e;e++){16>e||(i[e]=n.R(1,i[e-3]^i[e-8]^i[e-14]^i[e-16]));const t=n.R(5,o)+n.V(e,c,f,a)+l+i[e]+n.S[r.floor(e/20)]|0;l=a,a=f,f=n.R(30,c),c=o,o=t}s[0]=s[0]+o|0,s[1]=s[1]+c|0,s[2]=s[2]+f|0,s[3]=s[3]+a|0,s[4]=s[4]+l|0}},D={getRandomValues(e){const t=new c(e.buffer),n=e=>{let t=987654321;const n=4294967295;return()=>(t=36969*(65535&t)+(t>>16)&n,(((t<<16)+(e=18e3*(65535&e)+(e>>16)&n)&n)/4294967296+.5)*(r.random()>.5?1:-1))};for(let s,i=0;i<e.length;i+=4){const e=n(4294967296*(s||r.random()));s=987654071*e(),t[i/4]=4294967296*e()|0}return e}},V={importKey:e=>new V.B(I.p.k(e)),M(e,t,n,r){if(n=n||1e4,0>r||0>n)throw new s("invalid params to pbkdf2");const i=1+(r>>5)<<2;let o,c,f,a,u;const w=new ArrayBuffer(i),h=new l(w);let d=0;const p=_;for(t=I.p.k(t),u=1;(i||1)>d;u++){for(o=c=e.encrypt(p.concat(t,[u])),f=1;n>f;f++)for(c=e.encrypt(c),a=0;a<c.length;a++)o[a]^=c[a];for(f=0;(i||1)>d&&f<o.length;f++)h.setInt32(d,o[f]),d+=4}return w.slice(0,r/8)},B:class{constructor(e){const t=this,n=t.U=P,r=[[],[]];t.K=[new n,new n];const s=t.K[0].blockSize/32;e.length>s&&(e=(new n).update(e).D());for(let t=0;s>t;t++)r[0][t]=909522486^e[t],r[1][t]=1549556828^e[t];t.K[0].update(r[0]),t.K[1].update(r[1]),t.N=new n(t.K[0])}reset(){const e=this;e.N=new e.U(e.K[0]),e.O=!1}update(e){this.O=!0,this.N.update(e)}digest(){const e=this,t=e.N.D(),n=new e.U(e.K[1]).update(t).D();return e.reset(),n}encrypt(e){if(this.O)throw new s("encrypt on already updated hmac called!");return this.update(e),this.digest(e)}}},R=typeof h!=v&&typeof h.getRandomValues==S,B="Invalid password",E="Invalid signature",M="zipjs-abort-check-password";function U(e){return R?h.getRandomValues(e):D.getRandomValues(e)}const K=16,N={name:"PBKDF2"},O=t.assign({hash:{name:"HMAC"}},N),T=t.assign({iterations:1e3,hash:{name:"SHA-1"}},N),W=["deriveBits"],j=[8,12,16],H=[16,24,32],L=10,F=[0,0,0,0],q=typeof h!=v,G=q&&h.subtle,J=q&&typeof G!=v,Q=I.p,X=class{constructor(e){const t=this;t.T=[[[],[],[],[],[]],[[],[],[],[],[]]],t.T[0][0][0]||t.W();const n=t.T[0][4],r=t.T[1],i=e.length;let o,c,f,a=1;if(4!==i&&6!==i&&8!==i)throw new s("invalid aes key size");for(t.S=[c=e.slice(0),f=[]],o=i;4*i+28>o;o++){let e=c[o-1];(o%i==0||8===i&&o%i==4)&&(e=n[e>>>24]<<24^n[e>>16&255]<<16^n[e>>8&255]<<8^n[255&e],o%i==0&&(e=e<<8^e>>>24^a<<24,a=a<<1^283*(a>>7))),c[o]=c[o-i]^e}for(let e=0;o;e++,o--){const t=c[3&e?o:o-4];f[e]=4>=o||4>e?t:r[0][n[t>>>24]]^r[1][n[t>>16&255]]^r[2][n[t>>8&255]]^r[3][n[255&t]]}}encrypt(e){return this.j(e,0)}decrypt(e){return this.j(e,1)}W(){const e=this.T[0],t=this.T[1],n=e[4],r=t[4],s=[],i=[];let o,c,f,a;for(let e=0;256>e;e++)i[(s[e]=e<<1^283*(e>>7))^e]=e;for(let l=o=0;!n[l];l^=c||1,o=i[o]||1){let i=o^o<<1^o<<2^o<<3^o<<4;i=i>>8^255&i^99,n[l]=i,r[i]=l,a=s[f=s[c=s[l]]];let u=16843009*a^65537*f^257*c^16843008*l,w=257*s[i]^16843008*i;for(let n=0;4>n;n++)e[n][l]=w=w<<24^w>>>8,t[n][i]=u=u<<24^u>>>8}for(let n=0;5>n;n++)e[n]=e[n].slice(0),t[n]=t[n].slice(0)}j(e,t){if(4!==e.length)throw new s("invalid aes block size");const n=this.S[t],r=n.length/4-2,i=[0,0,0,0],o=this.T[t],c=o[0],f=o[1],a=o[2],l=o[3],u=o[4];let w,h,d,p=e[0]^n[0],y=e[t?3:1]^n[1],m=e[2]^n[2],b=e[t?1:3]^n[3],g=4;for(let e=0;r>e;e++)w=c[p>>>24]^f[y>>16&255]^a[m>>8&255]^l[255&b]^n[g],h=c[y>>>24]^f[m>>16&255]^a[b>>8&255]^l[255&p]^n[g+1],d=c[m>>>24]^f[b>>16&255]^a[p>>8&255]^l[255&y]^n[g+2],b=c[b>>>24]^f[p>>16&255]^a[y>>8&255]^l[255&m]^n[g+3],g+=4,p=w,y=h,m=d;for(let e=0;4>e;e++)i[t?3&-e:e]=u[p>>>24]<<24^u[y>>16&255]<<16^u[m>>8&255]<<8^u[255&b]^n[g++],w=p,p=y,y=m,m=b,b=w;return i}},Y=class{constructor(e,t){this.H=e,this.L=t,this.F=t}reset(){this.F=this.L}update(e){return this.q(this.H,e,this.F)}G(e){if(255&~(e>>24))e+=1<<24;else{let t=e>>16&255,n=e>>8&255,r=255&e;255===t?(t=0,255===n?(n=0,255===r?r=0:++r):++n):++t,e=0,e+=t<<16,e+=n<<8,e+=r}return e}J(e){0===(e[0]=this.G(e[0]))&&(e[1]=this.G(e[1]))}q(e,t,n){let r;if(!(r=t.length))return[];const s=_.l(t);for(let s=0;r>s;s+=4){this.J(n);const r=e.encrypt(n);t[s]^=r[0],t[s+1]^=r[1],t[s+2]^=r[2],t[s+3]^=r[3]}return _.u(t,s)}},Z=V.B;let $=q&&J&&typeof G.importKey==S,ee=q&&J&&typeof G.deriveBits==S;class te extends p{constructor({password:e,rawPassword:n,signed:r,encryptionStrength:o,checkPasswordOnly:c}){super({start(){t.assign(this,{ready:new u((e=>this.X=e)),password:ie(e,n),signed:r,Y:o-1,pending:new i})},async transform(e,t){const n=this,{password:r,Y:o,X:f,ready:a}=n;r?(await(async(e,t,n,r)=>{const i=await se(e,t,n,ce(r,0,j[t])),o=ce(r,j[t]);if(i[0]!=o[0]||i[1]!=o[1])throw new s(B)})(n,o,r,ce(e,0,j[o]+2)),e=ce(e,j[o]+2),c?t.error(new s(M)):f()):await a;const l=new i(e.length-L-(e.length-L)%K);t.enqueue(re(n,e,l,0,L,!0))},async flush(e){const{signed:t,Z:n,$:r,pending:o,ready:c}=this;if(r&&n){await c;const f=ce(o,0,o.length-L),a=ce(o,o.length-L);let l=new i;if(f.length){const e=ae(Q,f);r.update(e);const t=n.update(e);l=fe(Q,t)}if(t){const e=ce(fe(Q,r.digest()),0,L);for(let t=0;L>t;t++)if(e[t]!=a[t])throw new s(E)}e.enqueue(l)}}})}}class ne extends p{constructor({password:e,rawPassword:n,encryptionStrength:r}){let s;super({start(){t.assign(this,{ready:new u((e=>this.X=e)),password:ie(e,n),Y:r-1,pending:new i})},async transform(e,t){const n=this,{password:r,Y:s,X:o,ready:c}=n;let f=new i;r?(f=await(async(e,t,n)=>{const r=U(new i(j[t]));return oe(r,await se(e,t,n,r))})(n,s,r),o()):await c;const a=new i(f.length+e.length-e.length%K);a.set(f,0),t.enqueue(re(n,e,a,f.length,0))},async flush(e){const{Z:t,$:n,pending:r,ready:o}=this;if(n&&t){await o;let c=new i;if(r.length){const e=t.update(ae(Q,r));n.update(e),c=fe(Q,e)}s.signature=fe(Q,n.digest()).slice(0,L),e.enqueue(oe(c,s.signature))}}}),s=this}}function re(e,t,n,r,s,o){const{Z:c,$:f,pending:a}=e,l=t.length-s;let u;for(a.length&&(t=oe(a,t),n=((e,t)=>{if(t&&t>e.length){const n=e;(e=new i(t)).set(n,0)}return e})(n,l-l%K)),u=0;l-K>=u;u+=K){const e=ae(Q,ce(t,u,u+K));o&&f.update(e);const s=c.update(e);o||f.update(s),n.set(fe(Q,s),u+r)}return e.pending=ce(t,u),n}async function se(n,r,s,o){n.password=null;const c=await(async(e,t,n,r,s)=>{if(!$)return V.importKey(t);try{return await G.importKey("raw",t,n,!1,s)}catch(e){return $=!1,V.importKey(t)}})(0,s,O,0,W),f=await(async(e,t,n)=>{if(!ee)return V.M(t,e.salt,T.iterations,n);try{return await G.deriveBits(e,t,n)}catch(r){return ee=!1,V.M(t,e.salt,T.iterations,n)}})(t.assign({salt:o},T),c,8*(2*H[r]+2)),a=new i(f),l=ae(Q,ce(a,0,H[r])),u=ae(Q,ce(a,H[r],2*H[r])),w=ce(a,2*H[r]);return t.assign(n,{keys:{key:l,ee:u,passwordVerification:w},Z:new Y(new X(l),e.from(F)),$:new Z(u)}),w}function ie(e,t){return t===k?(e=>{if(typeof w==v){const t=new i((e=unescape(encodeURIComponent(e))).length);for(let n=0;n<t.length;n++)t[n]=e.charCodeAt(n);return t}return(new w).encode(e)})(e):t}function oe(e,t){let n=e;return e.length+t.length&&(n=new i(e.length+t.length),n.set(e,0),n.set(t,e.length)),n}function ce(e,t,n){return e.subarray(t,n)}function fe(e,t){return e.m(t)}function ae(e,t){return e.k(t)}class le extends p{constructor({password:e,passwordVerification:n,checkPasswordOnly:r}){super({start(){t.assign(this,{password:e,passwordVerification:n}),de(this,e)},transform(e,t){const n=this;if(n.password){const t=we(n,e.subarray(0,12));if(n.password=null,t[11]!=n.passwordVerification)throw new s(B);e=e.subarray(12)}r?t.error(new s(M)):t.enqueue(we(n,e))}})}}class ue extends p{constructor({password:e,passwordVerification:n}){super({start(){t.assign(this,{password:e,passwordVerification:n}),de(this,e)},transform(e,t){const n=this;let r,s;if(n.password){n.password=null;const t=U(new i(12));t[11]=n.passwordVerification,r=new i(e.length+t.length),r.set(he(n,t),0),s=12}else r=new i(e.length),s=0;r.set(he(n,e),s),t.enqueue(r)}})}}function we(e,t){const n=new i(t.length);for(let r=0;r<t.length;r++)n[r]=ye(e)^t[r],pe(e,n[r]);return n}function he(e,t){const n=new i(t.length);for(let r=0;r<t.length;r++)n[r]=ye(e)^t[r],pe(e,t[r]);return n}function de(e,n){const r=[305419896,591751049,878082192];t.assign(e,{keys:r,te:new x(r[0]),ne:new x(r[2])});for(let t=0;t<n.length;t++)pe(e,n.charCodeAt(t))}function pe(e,t){let[n,s,i]=e.keys;e.te.append([t]),n=~e.te.get(),s=be(r.imul(be(s+me(n)),134775813)+1),e.ne.append([s>>>24]),i=~e.ne.get(),e.keys=[n,s,i]}function ye(e){const t=2|e.keys[2];return me(r.imul(t,1^t)>>>8)}function me(e){return 255&e}function be(e){return 4294967295&e}const ge="deflate-raw";class ke extends p{constructor(e,{chunkSize:t,CompressionStream:n,CompressionStreamNative:r}){super({});const{compressed:s,encrypted:i,useCompressionStream:o,zipCrypto:c,signed:f,level:a}=e,u=this;let w,h,d=Se(super.readable);i&&!c||!f||(w=new A,d=xe(d,w)),s&&(d=Ce(d,o,{level:a,chunkSize:t},r,n)),i&&(c?d=xe(d,new ue(e)):(h=new ne(e),d=xe(d,h))),ze(u,d,(()=>{let e;i&&!c&&(e=h.signature),i&&!c||!f||(e=new l(w.value.buffer).getUint32(0)),u.signature=e}))}}class ve extends p{constructor(e,{chunkSize:t,DecompressionStream:n,DecompressionStreamNative:r}){super({});const{zipCrypto:i,encrypted:o,signed:c,signature:f,compressed:a,useCompressionStream:u}=e;let w,h,d=Se(super.readable);o&&(i?d=xe(d,new le(e)):(h=new te(e),d=xe(d,h))),a&&(d=Ce(d,u,{chunkSize:t},r,n)),o&&!i||!c||(w=new A,d=xe(d,w)),ze(this,d,(()=>{if((!o||i)&&c){const e=new l(w.value.buffer);if(f!=e.getUint32(0,!1))throw new s(E)}}))}}function Se(e){return xe(e,new p({transform(e,t){e&&e.length&&t.enqueue(e)}}))}function ze(e,n,r){n=xe(n,new p({flush:r})),t.defineProperty(e,"readable",{get:()=>n})}function Ce(e,t,n,r,s){try{e=xe(e,new(t&&r?r:s)(ge,n))}catch(r){if(!t)return e;try{e=xe(e,new s(ge,n))}catch(t){return e}}return e}function xe(e,t){return e.pipeThrough(t)}const Ae="data",_e="close";class Ie extends p{constructor(e,n){super({});const r=this,{codecType:s}=e;let i;s.startsWith("deflate")?i=ke:s.startsWith("inflate")&&(i=ve);let o=0,c=0;const f=new i(e,n),a=super.readable,l=new p({transform(e,t){e&&e.length&&(c+=e.length,t.enqueue(e))},flush(){t.assign(r,{inputSize:c})}}),u=new p({transform(e,t){e&&e.length&&(o+=e.length,t.enqueue(e))},flush(){const{signature:e}=f;t.assign(r,{signature:e,outputSize:o,inputSize:c})}});t.defineProperty(r,"readable",{get:()=>a.pipeThrough(l).pipeThrough(f).pipeThrough(u)})}}class Pe extends p{constructor(e){let t;super({transform:function n(r,s){if(t){const e=new i(t.length+r.length);e.set(t),e.set(r,t.length),r=e,t=null}r.length>e?(s.enqueue(r.slice(0,e)),n(r.slice(e),s)):t=r},flush(e){t&&t.length&&e.enqueue(t)}})}}const De=new a,Ve=new a;let Re,Be=0,Ee=!0;async function Me(e){try{const{options:t,scripts:r,config:s}=e;if(r&&r.length)try{Ee?importScripts.apply(k,r):await Ue(r)}catch(e){Ee=!1,await Ue(r)}self.initCodec&&self.initCodec(),s.CompressionStreamNative=self.CompressionStream,s.DecompressionStreamNative=self.DecompressionStream,self.Deflate&&(s.CompressionStream=new z(self.Deflate)),self.Inflate&&(s.DecompressionStream=new z(self.Inflate));const i={highWaterMark:1},o=e.readable||new y({async pull(e){const t=new u((e=>De.set(Be,e)));Ke({type:"pull",messageId:Be}),Be=(Be+1)%n.MAX_SAFE_INTEGER;const{value:r,done:s}=await t;e.enqueue(r),s&&e.close()}},i),c=e.writable||new m({async write(e){let t;const r=new u((e=>t=e));Ve.set(Be,t),Ke({type:Ae,value:e,messageId:Be}),Be=(Be+1)%n.MAX_SAFE_INTEGER,await r}},i),f=new Ie(t,s);Re=new AbortController;const{signal:a}=Re;await o.pipeThrough(f).pipeThrough(new Pe(s.chunkSize)).pipeTo(c,{signal:a,preventClose:!0,preventAbort:!0}),await c.getWriter().close();const{signature:l,inputSize:w,outputSize:h}=f;Ke({type:_e,result:{signature:l,inputSize:w,outputSize:h}})}catch(e){Ne(e)}}async function Ue(e){for(const t of e)await import(t)}function Ke(e){let{value:t}=e;if(t)if(t.length)try{t=new i(t),e.value=t.buffer,d(e,[e.value])}catch(t){d(e)}else d(e);else d(e)}function Ne(e=new s("Unknown error")){const{message:t,stack:n,code:r,name:i}=e;d({error:{message:t,stack:n,code:r,name:i}})}addEventListener("message",(({data:e})=>{const{type:t,messageId:n,value:r,done:s}=e;try{if("start"==t&&Me(e),t==Ae){const e=De.get(n);De.delete(n),e({value:new i(r),done:s})}if("ack"==t){const e=Ve.get(n);Ve.delete(n),e()}t==_e&&Re.abort()}catch(e){Ne(e)}}));const Oe=-2;function Te(t){return We(t.map((([t,n])=>new e(t).fill(n,0,t))))}function We(t){return t.reduce(((t,n)=>t.concat(e.isArray(n)?We(n):n)),[])}const je=[0,1,2,3].concat(...Te([[2,4],[2,5],[4,6],[4,7],[8,8],[8,9],[16,10],[16,11],[32,12],[32,13],[64,14],[64,15],[2,0],[1,16],[1,17],[2,18],[2,19],[4,20],[4,21],[8,22],[8,23],[16,24],[16,25],[32,26],[32,27],[64,28],[64,29]]));function He(){const e=this;function t(e,t){let n=0;do{n|=1&e,e>>>=1,n<<=1}while(--t>0);return n>>>1}e.re=n=>{const s=e.se,i=e.oe.ie,o=e.oe.ce;let c,f,a,l=-1;for(n.fe=0,n.ae=573,c=0;o>c;c++)0!==s[2*c]?(n.le[++n.fe]=l=c,n.ue[c]=0):s[2*c+1]=0;for(;2>n.fe;)a=n.le[++n.fe]=2>l?++l:0,s[2*a]=1,n.ue[a]=0,n.we--,i&&(n.he-=i[2*a+1]);for(e.de=l,c=r.floor(n.fe/2);c>=1;c--)n.pe(s,c);a=o;do{c=n.le[1],n.le[1]=n.le[n.fe--],n.pe(s,1),f=n.le[1],n.le[--n.ae]=c,n.le[--n.ae]=f,s[2*a]=s[2*c]+s[2*f],n.ue[a]=r.max(n.ue[c],n.ue[f])+1,s[2*c+1]=s[2*f+1]=a,n.le[1]=a++,n.pe(s,1)}while(n.fe>=2);n.le[--n.ae]=n.le[1],(t=>{const n=e.se,r=e.oe.ie,s=e.oe.ye,i=e.oe.me,o=e.oe.be;let c,f,a,l,u,w,h=0;for(l=0;15>=l;l++)t.ge[l]=0;for(n[2*t.le[t.ae]+1]=0,c=t.ae+1;573>c;c++)f=t.le[c],l=n[2*n[2*f+1]+1]+1,l>o&&(l=o,h++),n[2*f+1]=l,f>e.de||(t.ge[l]++,u=0,i>f||(u=s[f-i]),w=n[2*f],t.we+=w*(l+u),r&&(t.he+=w*(r[2*f+1]+u)));if(0!==h){do{for(l=o-1;0===t.ge[l];)l--;t.ge[l]--,t.ge[l+1]+=2,t.ge[o]--,h-=2}while(h>0);for(l=o;0!==l;l--)for(f=t.ge[l];0!==f;)a=t.le[--c],a>e.de||(n[2*a+1]!=l&&(t.we+=(l-n[2*a+1])*n[2*a],n[2*a+1]=l),f--)}})(n),((e,n,r)=>{const s=[];let i,o,c,f=0;for(i=1;15>=i;i++)s[i]=f=f+r[i-1]<<1;for(o=0;n>=o;o++)c=e[2*o+1],0!==c&&(e[2*o]=t(s[c]++,c))})(s,e.de,n.ge)}}function Le(e,t,n,r,s){const i=this;i.ie=e,i.ye=t,i.me=n,i.ce=r,i.be=s}He.ke=[0,1,2,3,4,5,6,7].concat(...Te([[2,8],[2,9],[2,10],[2,11],[4,12],[4,13],[4,14],[4,15],[8,16],[8,17],[8,18],[8,19],[16,20],[16,21],[16,22],[16,23],[32,24],[32,25],[32,26],[31,27],[1,28]])),He.ve=[0,1,2,3,4,5,6,7,8,10,12,14,16,20,24,28,32,40,48,56,64,80,96,112,128,160,192,224,0],He.Se=[0,1,2,3,4,6,8,12,16,24,32,48,64,96,128,192,256,384,512,768,1024,1536,2048,3072,4096,6144,8192,12288,16384,24576],He.ze=e=>256>e?je[e]:je[256+(e>>>7)],He.Ce=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],He.xe=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],He.Ae=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],He._e=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];const Fe=Te([[144,8],[112,9],[24,7],[8,8]]);Le.Ie=We([12,140,76,204,44,172,108,236,28,156,92,220,60,188,124,252,2,130,66,194,34,162,98,226,18,146,82,210,50,178,114,242,10,138,74,202,42,170,106,234,26,154,90,218,58,186,122,250,6,134,70,198,38,166,102,230,22,150,86,214,54,182,118,246,14,142,78,206,46,174,110,238,30,158,94,222,62,190,126,254,1,129,65,193,33,161,97,225,17,145,81,209,49,177,113,241,9,137,73,201,41,169,105,233,25,153,89,217,57,185,121,249,5,133,69,197,37,165,101,229,21,149,85,213,53,181,117,245,13,141,77,205,45,173,109,237,29,157,93,221,61,189,125,253,19,275,147,403,83,339,211,467,51,307,179,435,115,371,243,499,11,267,139,395,75,331,203,459,43,299,171,427,107,363,235,491,27,283,155,411,91,347,219,475,59,315,187,443,123,379,251,507,7,263,135,391,71,327,199,455,39,295,167,423,103,359,231,487,23,279,151,407,87,343,215,471,55,311,183,439,119,375,247,503,15,271,143,399,79,335,207,463,47,303,175,431,111,367,239,495,31,287,159,415,95,351,223,479,63,319,191,447,127,383,255,511,0,64,32,96,16,80,48,112,8,72,40,104,24,88,56,120,4,68,36,100,20,84,52,116,3,131,67,195,35,163,99,227].map(((e,t)=>[e,Fe[t]])));const qe=Te([[30,5]]);function Ge(e,t,n,r,s){const i=this;i.Pe=e,i.De=t,i.Ve=n,i.Re=r,i.Be=s}Le.Ee=We([0,16,8,24,4,20,12,28,2,18,10,26,6,22,14,30,1,17,9,25,5,21,13,29,3,19,11,27,7,23].map(((e,t)=>[e,qe[t]]))),Le.Me=new Le(Le.Ie,He.Ce,257,286,15),Le.Ue=new Le(Le.Ee,He.xe,0,30,15),Le.Ke=new Le(null,He.Ae,0,19,7);const Je=[new Ge(0,0,0,0,0),new Ge(4,4,8,4,1),new Ge(4,5,16,8,1),new Ge(4,6,32,32,1),new Ge(4,4,16,16,2),new Ge(8,16,32,32,2),new Ge(8,16,128,128,2),new Ge(8,32,128,256,2),new Ge(32,128,258,1024,2),new Ge(32,258,258,4096,2)],Qe=["need dictionary","stream end","","","stream error","data error","","buffer error","",""],Xe=113,Ye=666,Ze=262;function $e(e,t,n,r){const s=e[2*t],i=e[2*n];return i>s||s==i&&r[t]<=r[n]}function et(){const e=this;let t,n,s,c,f,a,l,u,w,h,d,p,y,m,b,g,k,v,S,z,C,x,A,_,I,P,D,V,R,B,E,M,U;const K=new He,N=new He,O=new He;let T,W,j,H,L,F;function q(){let t;for(t=0;286>t;t++)E[2*t]=0;for(t=0;30>t;t++)M[2*t]=0;for(t=0;19>t;t++)U[2*t]=0;E[512]=1,e.we=e.he=0,W=j=0}function G(e,t){let n,r=-1,s=e[1],i=0,o=7,c=4;0===s&&(o=138,c=3),e[2*(t+1)+1]=65535;for(let f=0;t>=f;f++)n=s,s=e[2*(f+1)+1],++i<o&&n==s||(c>i?U[2*n]+=i:0!==n?(n!=r&&U[2*n]++,U[32]++):i>10?U[36]++:U[34]++,i=0,r=n,0===s?(o=138,c=3):n==s?(o=6,c=3):(o=7,c=4))}function J(t){e.Ne[e.pending++]=t}function Q(e){J(255&e),J(e>>>8&255)}function X(e,t){let n;const r=t;F>16-r?(n=e,L|=n<<F&65535,Q(L),L=n>>>16-F,F+=r-16):(L|=e<<F&65535,F+=r)}function Y(e,t){const n=2*e;X(65535&t[n],65535&t[n+1])}function Z(e,t){let n,r,s=-1,i=e[1],o=0,c=7,f=4;for(0===i&&(c=138,f=3),n=0;t>=n;n++)if(r=i,i=e[2*(n+1)+1],++o>=c||r!=i){if(f>o)do{Y(r,U)}while(0!=--o);else 0!==r?(r!=s&&(Y(r,U),o--),Y(16,U),X(o-3,2)):o>10?(Y(18,U),X(o-11,7)):(Y(17,U),X(o-3,3));o=0,s=r,0===i?(c=138,f=3):r==i?(c=6,f=3):(c=7,f=4)}}function $(){16==F?(Q(L),L=0,F=0):8>F||(J(255&L),L>>>=8,F-=8)}function ee(t,n){let s,i,o;if(e.Oe[W]=t,e.Te[W]=255&n,W++,0===t?E[2*n]++:(j++,t--,E[2*(He.ke[n]+256+1)]++,M[2*He.ze(t)]++),!(8191&W)&&D>2){for(s=8*W,i=C-k,o=0;30>o;o++)s+=M[2*o]*(5+He.xe[o]);if(s>>>=3,j<r.floor(W/2)&&s<r.floor(i/2))return!0}return W==T-1}function te(t,n){let r,s,i,o,c=0;if(0!==W)do{r=e.Oe[c],s=e.Te[c],c++,0===r?Y(s,t):(i=He.ke[s],Y(i+256+1,t),o=He.Ce[i],0!==o&&(s-=He.ve[i],X(s,o)),r--,i=He.ze(r),Y(i,n),o=He.xe[i],0!==o&&(r-=He.Se[i],X(r,o)))}while(W>c);Y(256,t),H=t[513]}function ne(){F>8?Q(L):F>0&&J(255&L),L=0,F=0}function re(t,n,r){X(0+(r?1:0),3),((t,n)=>{ne(),H=8,Q(n),Q(~n),e.Ne.set(u.subarray(t,t+n),e.pending),e.pending+=n})(t,n)}function se(n){((t,n,r)=>{let s,i,o=0;D>0?(K.re(e),N.re(e),o=(()=>{let t;for(G(E,K.de),G(M,N.de),O.re(e),t=18;t>=3&&0===U[2*He._e[t]+1];t--);return e.we+=14+3*(t+1),t})(),s=e.we+3+7>>>3,i=e.he+3+7>>>3,i>s||(s=i)):s=i=n+5,n+4>s||-1==t?i==s?(X(2+(r?1:0),3),te(Le.Ie,Le.Ee)):(X(4+(r?1:0),3),((e,t,n)=>{let r;for(X(e-257,5),X(t-1,5),X(n-4,4),r=0;n>r;r++)X(U[2*He._e[r]+1],3);Z(E,e-1),Z(M,t-1)})(K.de+1,N.de+1,o+1),te(E,M)):re(t,n,r),q(),r&&ne()})(0>k?-1:k,C-k,n),k=C,t.We()}function ie(){let e,n,r,s;do{if(s=w-A-C,0===s&&0===C&&0===A)s=f;else if(-1==s)s--;else if(C>=f+f-Ze){u.set(u.subarray(f,f+f),0),x-=f,C-=f,k-=f,e=y,r=e;do{n=65535&d[--r],d[r]=f>n?0:n-f}while(0!=--e);e=f,r=e;do{n=65535&h[--r],h[r]=f>n?0:n-f}while(0!=--e);s+=f}if(0===t.je)return;e=t.He(u,C+A,s),A+=e,3>A||(p=255&u[C],p=(p<<g^255&u[C+1])&b)}while(Ze>A&&0!==t.je)}function oe(e){let t,n,r=I,s=C,i=_;const o=C>f-Ze?C-(f-Ze):0;let c=B;const a=l,w=C+258;let d=u[s+i-1],p=u[s+i];R>_||(r>>=2),c>A&&(c=A);do{if(t=e,u[t+i]==p&&u[t+i-1]==d&&u[t]==u[s]&&u[++t]==u[s+1]){s+=2,t++;do{}while(u[++s]==u[++t]&&u[++s]==u[++t]&&u[++s]==u[++t]&&u[++s]==u[++t]&&u[++s]==u[++t]&&u[++s]==u[++t]&&u[++s]==u[++t]&&u[++s]==u[++t]&&w>s);if(n=258-(w-s),s=w-258,n>i){if(x=e,i=n,n>=c)break;d=u[s+i-1],p=u[s+i]}}}while((e=65535&h[e&a])>o&&0!=--r);return i>A?A:i}e.ue=[],e.ge=[],e.le=[],E=[],M=[],U=[],e.pe=(t,n)=>{const r=e.le,s=r[n];let i=n<<1;for(;i<=e.fe&&(i<e.fe&&$e(t,r[i+1],r[i],e.ue)&&i++,!$e(t,s,r[i],e.ue));)r[n]=r[i],n=i,i<<=1;r[n]=s},e.Le=(t,S,x,W,j,G)=>(W||(W=8),j||(j=8),G||(G=0),t.Fe=null,-1==S&&(S=6),1>j||j>9||8!=W||9>x||x>15||0>S||S>9||0>G||G>2?Oe:(t.qe=e,a=x,f=1<<a,l=f-1,m=j+7,y=1<<m,b=y-1,g=r.floor((m+3-1)/3),u=new i(2*f),h=[],d=[],T=1<<j+6,e.Ne=new i(4*T),s=4*T,e.Oe=new o(T),e.Te=new i(T),D=S,V=G,(t=>(t.Ge=t.Je=0,t.Fe=null,e.pending=0,e.Qe=0,n=Xe,c=0,K.se=E,K.oe=Le.Me,N.se=M,N.oe=Le.Ue,O.se=U,O.oe=Le.Ke,L=0,F=0,H=8,q(),(()=>{w=2*f,d[y-1]=0;for(let e=0;y-1>e;e++)d[e]=0;P=Je[D].De,R=Je[D].Pe,B=Je[D].Ve,I=Je[D].Re,C=0,k=0,A=0,v=_=2,z=0,p=0})(),0))(t))),e.Xe=()=>42!=n&&n!=Xe&&n!=Ye?Oe:(e.Te=null,e.Oe=null,e.Ne=null,d=null,h=null,u=null,e.qe=null,n==Xe?-3:0),e.Ye=(e,t,n)=>{let r=0;return-1==t&&(t=6),0>t||t>9||0>n||n>2?Oe:(Je[D].Be!=Je[t].Be&&0!==e.Ge&&(r=e.Ze(1)),D!=t&&(D=t,P=Je[D].De,R=Je[D].Pe,B=Je[D].Ve,I=Je[D].Re),V=n,r)},e.$e=(e,t,r)=>{let s,i=r,o=0;if(!t||42!=n)return Oe;if(3>i)return 0;for(i>f-Ze&&(i=f-Ze,o=r-i),u.set(t.subarray(o,o+i),0),C=i,k=i,p=255&u[0],p=(p<<g^255&u[1])&b,s=0;i-3>=s;s++)p=(p<<g^255&u[s+2])&b,h[s&l]=d[p],d[p]=s;return 0},e.Ze=(r,i)=>{let o,w,m,I,R;if(i>4||0>i)return Oe;if(!r.et||!r.tt&&0!==r.je||n==Ye&&4!=i)return r.Fe=Qe[4],Oe;if(0===r.nt)return r.Fe=Qe[7],-5;var B;if(t=r,I=c,c=i,42==n&&(w=8+(a-8<<4)<<8,m=(D-1&255)>>1,m>3&&(m=3),w|=m<<6,0!==C&&(w|=32),w+=31-w%31,n=Xe,J((B=w)>>8&255),J(255&B)),0!==e.pending){if(t.We(),0===t.nt)return c=-1,0}else if(0===t.je&&I>=i&&4!=i)return t.Fe=Qe[7],-5;if(n==Ye&&0!==t.je)return r.Fe=Qe[7],-5;if(0!==t.je||0!==A||0!=i&&n!=Ye){switch(R=-1,Je[D].Be){case 0:R=(e=>{let n,r=65535;for(r>s-5&&(r=s-5);;){if(1>=A){if(ie(),0===A&&0==e)return 0;if(0===A)break}if(C+=A,A=0,n=k+r,(0===C||C>=n)&&(A=C-n,C=n,se(!1),0===t.nt))return 0;if(C-k>=f-Ze&&(se(!1),0===t.nt))return 0}return se(4==e),0===t.nt?4==e?2:0:4==e?3:1})(i);break;case 1:R=(e=>{let n,r=0;for(;;){if(Ze>A){if(ie(),Ze>A&&0==e)return 0;if(0===A)break}if(3>A||(p=(p<<g^255&u[C+2])&b,r=65535&d[p],h[C&l]=d[p],d[p]=C),0===r||(C-r&65535)>f-Ze||2!=V&&(v=oe(r)),3>v)n=ee(0,255&u[C]),A--,C++;else if(n=ee(C-x,v-3),A-=v,v>P||3>A)C+=v,v=0,p=255&u[C],p=(p<<g^255&u[C+1])&b;else{v--;do{C++,p=(p<<g^255&u[C+2])&b,r=65535&d[p],h[C&l]=d[p],d[p]=C}while(0!=--v);C++}if(n&&(se(!1),0===t.nt))return 0}return se(4==e),0===t.nt?4==e?2:0:4==e?3:1})(i);break;case 2:R=(e=>{let n,r,s=0;for(;;){if(Ze>A){if(ie(),Ze>A&&0==e)return 0;if(0===A)break}if(3>A||(p=(p<<g^255&u[C+2])&b,s=65535&d[p],h[C&l]=d[p],d[p]=C),_=v,S=x,v=2,0!==s&&P>_&&f-Ze>=(C-s&65535)&&(2!=V&&(v=oe(s)),5>=v&&(1==V||3==v&&C-x>4096)&&(v=2)),3>_||v>_)if(0!==z){if(n=ee(0,255&u[C-1]),n&&se(!1),C++,A--,0===t.nt)return 0}else z=1,C++,A--;else{r=C+A-3,n=ee(C-1-S,_-3),A-=_-1,_-=2;do{++C>r||(p=(p<<g^255&u[C+2])&b,s=65535&d[p],h[C&l]=d[p],d[p]=C)}while(0!=--_);if(z=0,v=2,C++,n&&(se(!1),0===t.nt))return 0}}return 0!==z&&(n=ee(0,255&u[C-1]),z=0),se(4==e),0===t.nt?4==e?2:0:4==e?3:1})(i)}if(2!=R&&3!=R||(n=Ye),0==R||2==R)return 0===t.nt&&(c=-1),0;if(1==R){if(1==i)X(2,3),Y(256,Le.Ie),$(),9>1+H+10-F&&(X(2,3),Y(256,Le.Ie),$()),H=7;else if(re(0,0,!1),3==i)for(o=0;y>o;o++)d[o]=0;if(t.We(),0===t.nt)return c=-1,0}}return 4!=i?0:1}}function tt(){const e=this;e.rt=0,e.st=0,e.je=0,e.Ge=0,e.nt=0,e.Je=0}function nt(e){const t=new tt,n=(o=e&&e.chunkSize?e.chunkSize:65536)+5*(r.floor(o/16383)+1);var o;const c=new i(n);let f=e?e.level:-1;void 0===f&&(f=-1),t.Le(f),t.et=c,this.append=(e,r)=>{let o,f,a=0,l=0,u=0;const w=[];if(e.length){t.rt=0,t.tt=e,t.je=e.length;do{if(t.st=0,t.nt=n,o=t.Ze(0),0!=o)throw new s("deflating: "+t.Fe);t.st&&(t.st==n?w.push(new i(c)):w.push(c.subarray(0,t.st))),u+=t.st,r&&t.rt>0&&t.rt!=a&&(r(t.rt),a=t.rt)}while(t.je>0||0===t.nt);return w.length>1?(f=new i(u),w.forEach((e=>{f.set(e,l),l+=e.length}))):f=w[0]?new i(w[0]):new i,f}},this.flush=()=>{let e,r,o=0,f=0;const a=[];do{if(t.st=0,t.nt=n,e=t.Ze(4),1!=e&&0!=e)throw new s("deflating: "+t.Fe);n-t.nt>0&&a.push(c.slice(0,t.st)),f+=t.st}while(t.je>0||0===t.nt);return t.Xe(),r=new i(f),a.forEach((e=>{r.set(e,o),o+=e.length})),r}}tt.prototype={Le(e,t){const n=this;return n.qe=new et,t||(t=15),n.qe.Le(n,e,t)},Ze(e){const t=this;return t.qe?t.qe.Ze(t,e):Oe},Xe(){const e=this;if(!e.qe)return Oe;const t=e.qe.Xe();return e.qe=null,t},Ye(e,t){const n=this;return n.qe?n.qe.Ye(n,e,t):Oe},$e(e,t){const n=this;return n.qe?n.qe.$e(n,e,t):Oe},He(e,t,n){const r=this;let s=r.je;return s>n&&(s=n),0===s?0:(r.je-=s,e.set(r.tt.subarray(r.rt,r.rt+s),t),r.rt+=s,r.Ge+=s,s)},We(){const e=this;let t=e.qe.pending;t>e.nt&&(t=e.nt),0!==t&&(e.et.set(e.qe.Ne.subarray(e.qe.Qe,e.qe.Qe+t),e.st),e.st+=t,e.qe.Qe+=t,e.Je+=t,e.nt-=t,e.qe.pending-=t,0===e.qe.pending&&(e.qe.Qe=0))}};const rt=-2,st=-3,it=-5,ot=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],ct=[96,7,256,0,8,80,0,8,16,84,8,115,82,7,31,0,8,112,0,8,48,0,9,192,80,7,10,0,8,96,0,8,32,0,9,160,0,8,0,0,8,128,0,8,64,0,9,224,80,7,6,0,8,88,0,8,24,0,9,144,83,7,59,0,8,120,0,8,56,0,9,208,81,7,17,0,8,104,0,8,40,0,9,176,0,8,8,0,8,136,0,8,72,0,9,240,80,7,4,0,8,84,0,8,20,85,8,227,83,7,43,0,8,116,0,8,52,0,9,200,81,7,13,0,8,100,0,8,36,0,9,168,0,8,4,0,8,132,0,8,68,0,9,232,80,7,8,0,8,92,0,8,28,0,9,152,84,7,83,0,8,124,0,8,60,0,9,216,82,7,23,0,8,108,0,8,44,0,9,184,0,8,12,0,8,140,0,8,76,0,9,248,80,7,3,0,8,82,0,8,18,85,8,163,83,7,35,0,8,114,0,8,50,0,9,196,81,7,11,0,8,98,0,8,34,0,9,164,0,8,2,0,8,130,0,8,66,0,9,228,80,7,7,0,8,90,0,8,26,0,9,148,84,7,67,0,8,122,0,8,58,0,9,212,82,7,19,0,8,106,0,8,42,0,9,180,0,8,10,0,8,138,0,8,74,0,9,244,80,7,5,0,8,86,0,8,22,192,8,0,83,7,51,0,8,118,0,8,54,0,9,204,81,7,15,0,8,102,0,8,38,0,9,172,0,8,6,0,8,134,0,8,70,0,9,236,80,7,9,0,8,94,0,8,30,0,9,156,84,7,99,0,8,126,0,8,62,0,9,220,82,7,27,0,8,110,0,8,46,0,9,188,0,8,14,0,8,142,0,8,78,0,9,252,96,7,256,0,8,81,0,8,17,85,8,131,82,7,31,0,8,113,0,8,49,0,9,194,80,7,10,0,8,97,0,8,33,0,9,162,0,8,1,0,8,129,0,8,65,0,9,226,80,7,6,0,8,89,0,8,25,0,9,146,83,7,59,0,8,121,0,8,57,0,9,210,81,7,17,0,8,105,0,8,41,0,9,178,0,8,9,0,8,137,0,8,73,0,9,242,80,7,4,0,8,85,0,8,21,80,8,258,83,7,43,0,8,117,0,8,53,0,9,202,81,7,13,0,8,101,0,8,37,0,9,170,0,8,5,0,8,133,0,8,69,0,9,234,80,7,8,0,8,93,0,8,29,0,9,154,84,7,83,0,8,125,0,8,61,0,9,218,82,7,23,0,8,109,0,8,45,0,9,186,0,8,13,0,8,141,0,8,77,0,9,250,80,7,3,0,8,83,0,8,19,85,8,195,83,7,35,0,8,115,0,8,51,0,9,198,81,7,11,0,8,99,0,8,35,0,9,166,0,8,3,0,8,131,0,8,67,0,9,230,80,7,7,0,8,91,0,8,27,0,9,150,84,7,67,0,8,123,0,8,59,0,9,214,82,7,19,0,8,107,0,8,43,0,9,182,0,8,11,0,8,139,0,8,75,0,9,246,80,7,5,0,8,87,0,8,23,192,8,0,83,7,51,0,8,119,0,8,55,0,9,206,81,7,15,0,8,103,0,8,39,0,9,174,0,8,7,0,8,135,0,8,71,0,9,238,80,7,9,0,8,95,0,8,31,0,9,158,84,7,99,0,8,127,0,8,63,0,9,222,82,7,27,0,8,111,0,8,47,0,9,190,0,8,15,0,8,143,0,8,79,0,9,254,96,7,256,0,8,80,0,8,16,84,8,115,82,7,31,0,8,112,0,8,48,0,9,193,80,7,10,0,8,96,0,8,32,0,9,161,0,8,0,0,8,128,0,8,64,0,9,225,80,7,6,0,8,88,0,8,24,0,9,145,83,7,59,0,8,120,0,8,56,0,9,209,81,7,17,0,8,104,0,8,40,0,9,177,0,8,8,0,8,136,0,8,72,0,9,241,80,7,4,0,8,84,0,8,20,85,8,227,83,7,43,0,8,116,0,8,52,0,9,201,81,7,13,0,8,100,0,8,36,0,9,169,0,8,4,0,8,132,0,8,68,0,9,233,80,7,8,0,8,92,0,8,28,0,9,153,84,7,83,0,8,124,0,8,60,0,9,217,82,7,23,0,8,108,0,8,44,0,9,185,0,8,12,0,8,140,0,8,76,0,9,249,80,7,3,0,8,82,0,8,18,85,8,163,83,7,35,0,8,114,0,8,50,0,9,197,81,7,11,0,8,98,0,8,34,0,9,165,0,8,2,0,8,130,0,8,66,0,9,229,80,7,7,0,8,90,0,8,26,0,9,149,84,7,67,0,8,122,0,8,58,0,9,213,82,7,19,0,8,106,0,8,42,0,9,181,0,8,10,0,8,138,0,8,74,0,9,245,80,7,5,0,8,86,0,8,22,192,8,0,83,7,51,0,8,118,0,8,54,0,9,205,81,7,15,0,8,102,0,8,38,0,9,173,0,8,6,0,8,134,0,8,70,0,9,237,80,7,9,0,8,94,0,8,30,0,9,157,84,7,99,0,8,126,0,8,62,0,9,221,82,7,27,0,8,110,0,8,46,0,9,189,0,8,14,0,8,142,0,8,78,0,9,253,96,7,256,0,8,81,0,8,17,85,8,131,82,7,31,0,8,113,0,8,49,0,9,195,80,7,10,0,8,97,0,8,33,0,9,163,0,8,1,0,8,129,0,8,65,0,9,227,80,7,6,0,8,89,0,8,25,0,9,147,83,7,59,0,8,121,0,8,57,0,9,211,81,7,17,0,8,105,0,8,41,0,9,179,0,8,9,0,8,137,0,8,73,0,9,243,80,7,4,0,8,85,0,8,21,80,8,258,83,7,43,0,8,117,0,8,53,0,9,203,81,7,13,0,8,101,0,8,37,0,9,171,0,8,5,0,8,133,0,8,69,0,9,235,80,7,8,0,8,93,0,8,29,0,9,155,84,7,83,0,8,125,0,8,61,0,9,219,82,7,23,0,8,109,0,8,45,0,9,187,0,8,13,0,8,141,0,8,77,0,9,251,80,7,3,0,8,83,0,8,19,85,8,195,83,7,35,0,8,115,0,8,51,0,9,199,81,7,11,0,8,99,0,8,35,0,9,167,0,8,3,0,8,131,0,8,67,0,9,231,80,7,7,0,8,91,0,8,27,0,9,151,84,7,67,0,8,123,0,8,59,0,9,215,82,7,19,0,8,107,0,8,43,0,9,183,0,8,11,0,8,139,0,8,75,0,9,247,80,7,5,0,8,87,0,8,23,192,8,0,83,7,51,0,8,119,0,8,55,0,9,207,81,7,15,0,8,103,0,8,39,0,9,175,0,8,7,0,8,135,0,8,71,0,9,239,80,7,9,0,8,95,0,8,31,0,9,159,84,7,99,0,8,127,0,8,63,0,9,223,82,7,27,0,8,111,0,8,47,0,9,191,0,8,15,0,8,143,0,8,79,0,9,255],ft=[80,5,1,87,5,257,83,5,17,91,5,4097,81,5,5,89,5,1025,85,5,65,93,5,16385,80,5,3,88,5,513,84,5,33,92,5,8193,82,5,9,90,5,2049,86,5,129,192,5,24577,80,5,2,87,5,385,83,5,25,91,5,6145,81,5,7,89,5,1537,85,5,97,93,5,24577,80,5,4,88,5,769,84,5,49,92,5,12289,82,5,13,90,5,3073,86,5,193,192,5,24577],at=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],lt=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,112,112],ut=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],wt=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];function ht(){let e,t,n,r,s,i;function o(e,t,o,c,f,a,l,u,w,h,d){let p,y,m,b,g,k,v,S,z,C,x,A,_,I,P;C=0,g=o;do{n[e[t+C]]++,C++,g--}while(0!==g);if(n[0]==o)return l[0]=-1,u[0]=0,0;for(S=u[0],k=1;15>=k&&0===n[k];k++);for(v=k,k>S&&(S=k),g=15;0!==g&&0===n[g];g--);for(m=g,S>g&&(S=g),u[0]=S,I=1<<k;g>k;k++,I<<=1)if(0>(I-=n[k]))return st;if(0>(I-=n[g]))return st;for(n[g]+=I,i[1]=k=0,C=1,_=2;0!=--g;)i[_]=k+=n[C],_++,C++;g=0,C=0;do{0!==(k=e[t+C])&&(d[i[k]++]=g),C++}while(++g<o);for(o=i[m],i[0]=g=0,C=0,b=-1,A=-S,s[0]=0,x=0,P=0;m>=v;v++)for(p=n[v];0!=p--;){for(;v>A+S;){if(b++,A+=S,P=m-A,P=P>S?S:P,(y=1<<(k=v-A))>p+1&&(y-=p+1,_=v,P>k))for(;++k<P&&(y<<=1)>n[++_];)y-=n[_];if(P=1<<k,h[0]+P>1440)return st;s[b]=x=h[0],h[0]+=P,0!==b?(i[b]=g,r[0]=k,r[1]=S,k=g>>>A-S,r[2]=x-s[b-1]-k,w.set(r,3*(s[b-1]+k))):l[0]=x}for(r[1]=v-A,o>C?d[C]<c?(r[0]=256>d[C]?0:96,r[2]=d[C++]):(r[0]=a[d[C]-c]+16+64,r[2]=f[d[C++]-c]):r[0]=192,y=1<<v-A,k=g>>>A;P>k;k+=y)w.set(r,3*(x+k));for(k=1<<v-1;g&k;k>>>=1)g^=k;for(g^=k,z=(1<<A)-1;(g&z)!=i[b];)b--,A-=S,z=(1<<A)-1}return 0!==I&&1!=m?it:0}function c(o){let c;for(e||(e=[],t=[],n=new f(16),r=[],s=new f(15),i=new f(16)),t.length<o&&(t=[]),c=0;o>c;c++)t[c]=0;for(c=0;16>c;c++)n[c]=0;for(c=0;3>c;c++)r[c]=0;s.set(n.subarray(0,15),0),i.set(n.subarray(0,16),0)}this.it=(n,r,s,i,f)=>{let a;return c(19),e[0]=0,a=o(n,0,19,19,null,null,s,r,i,e,t),a==st?f.Fe="oversubscribed dynamic bit lengths tree":a!=it&&0!==r[0]||(f.Fe="incomplete dynamic bit lengths tree",a=st),a},this.ot=(n,r,s,i,f,a,l,u,w)=>{let h;return c(288),e[0]=0,h=o(s,0,n,257,at,lt,a,i,u,e,t),0!=h||0===i[0]?(h==st?w.Fe="oversubscribed literal/length tree":-4!=h&&(w.Fe="incomplete literal/length tree",h=st),h):(c(288),h=o(s,n,r,0,ut,wt,l,f,u,e,t),0!=h||0===f[0]&&n>257?(h==st?w.Fe="oversubscribed distance tree":h==it?(w.Fe="incomplete distance tree",h=st):-4!=h&&(w.Fe="empty distance tree with lengths",h=st),h):0)}}function dt(){const e=this;let t,n,r,s,i=0,o=0,c=0,f=0,a=0,l=0,u=0,w=0,h=0,d=0;function p(e,t,n,r,s,i,o,c){let f,a,l,u,w,h,d,p,y,m,b,g,k,v,S,z;d=c.rt,p=c.je,w=o.ct,h=o.ft,y=o.write,m=y<o.read?o.read-y-1:o.end-y,b=ot[e],g=ot[t];do{for(;20>h;)p--,w|=(255&c.lt(d++))<<h,h+=8;if(f=w&b,a=n,l=r,z=3*(l+f),0!==(u=a[z]))for(;;){if(w>>=a[z+1],h-=a[z+1],16&u){for(u&=15,k=a[z+2]+(w&ot[u]),w>>=u,h-=u;15>h;)p--,w|=(255&c.lt(d++))<<h,h+=8;for(f=w&g,a=s,l=i,z=3*(l+f),u=a[z];;){if(w>>=a[z+1],h-=a[z+1],16&u){for(u&=15;u>h;)p--,w|=(255&c.lt(d++))<<h,h+=8;if(v=a[z+2]+(w&ot[u]),w>>=u,h-=u,m-=k,v>y){S=y-v;do{S+=o.end}while(0>S);if(u=o.end-S,k>u){if(k-=u,y-S>0&&u>y-S)do{o.ut[y++]=o.ut[S++]}while(0!=--u);else o.ut.set(o.ut.subarray(S,S+u),y),y+=u,S+=u,u=0;S=0}}else S=y-v,y-S>0&&2>y-S?(o.ut[y++]=o.ut[S++],o.ut[y++]=o.ut[S++],k-=2):(o.ut.set(o.ut.subarray(S,S+2),y),y+=2,S+=2,k-=2);if(y-S>0&&k>y-S)do{o.ut[y++]=o.ut[S++]}while(0!=--k);else o.ut.set(o.ut.subarray(S,S+k),y),y+=k,S+=k,k=0;break}if(64&u)return c.Fe="invalid distance code",k=c.je-p,k=k>h>>3?h>>3:k,p+=k,d-=k,h-=k<<3,o.ct=w,o.ft=h,c.je=p,c.Ge+=d-c.rt,c.rt=d,o.write=y,st;f+=a[z+2],f+=w&ot[u],z=3*(l+f),u=a[z]}break}if(64&u)return 32&u?(k=c.je-p,k=k>h>>3?h>>3:k,p+=k,d-=k,h-=k<<3,o.ct=w,o.ft=h,c.je=p,c.Ge+=d-c.rt,c.rt=d,o.write=y,1):(c.Fe="invalid literal/length code",k=c.je-p,k=k>h>>3?h>>3:k,p+=k,d-=k,h-=k<<3,o.ct=w,o.ft=h,c.je=p,c.Ge+=d-c.rt,c.rt=d,o.write=y,st);if(f+=a[z+2],f+=w&ot[u],z=3*(l+f),0===(u=a[z])){w>>=a[z+1],h-=a[z+1],o.ut[y++]=a[z+2],m--;break}}else w>>=a[z+1],h-=a[z+1],o.ut[y++]=a[z+2],m--}while(m>=258&&p>=10);return k=c.je-p,k=k>h>>3?h>>3:k,p+=k,d-=k,h-=k<<3,o.ct=w,o.ft=h,c.je=p,c.Ge+=d-c.rt,c.rt=d,o.write=y,0}e.init=(e,i,o,c,f,a)=>{t=0,u=e,w=i,r=o,h=c,s=f,d=a,n=null},e.wt=(e,y,m)=>{let b,g,k,v,S,z,C,x=0,A=0,_=0;for(_=y.rt,v=y.je,x=e.ct,A=e.ft,S=e.write,z=S<e.read?e.read-S-1:e.end-S;;)switch(t){case 0:if(z>=258&&v>=10&&(e.ct=x,e.ft=A,y.je=v,y.Ge+=_-y.rt,y.rt=_,e.write=S,m=p(u,w,r,h,s,d,e,y),_=y.rt,v=y.je,x=e.ct,A=e.ft,S=e.write,z=S<e.read?e.read-S-1:e.end-S,0!=m)){t=1==m?7:9;break}c=u,n=r,o=h,t=1;case 1:for(b=c;b>A;){if(0===v)return e.ct=x,e.ft=A,y.je=v,y.Ge+=_-y.rt,y.rt=_,e.write=S,e.ht(y,m);m=0,v--,x|=(255&y.lt(_++))<<A,A+=8}if(g=3*(o+(x&ot[b])),x>>>=n[g+1],A-=n[g+1],k=n[g],0===k){f=n[g+2],t=6;break}if(16&k){a=15&k,i=n[g+2],t=2;break}if(!(64&k)){c=k,o=g/3+n[g+2];break}if(32&k){t=7;break}return t=9,y.Fe="invalid literal/length code",m=st,e.ct=x,e.ft=A,y.je=v,y.Ge+=_-y.rt,y.rt=_,e.write=S,e.ht(y,m);case 2:for(b=a;b>A;){if(0===v)return e.ct=x,e.ft=A,y.je=v,y.Ge+=_-y.rt,y.rt=_,e.write=S,e.ht(y,m);m=0,v--,x|=(255&y.lt(_++))<<A,A+=8}i+=x&ot[b],x>>=b,A-=b,c=w,n=s,o=d,t=3;case 3:for(b=c;b>A;){if(0===v)return e.ct=x,e.ft=A,y.je=v,y.Ge+=_-y.rt,y.rt=_,e.write=S,e.ht(y,m);m=0,v--,x|=(255&y.lt(_++))<<A,A+=8}if(g=3*(o+(x&ot[b])),x>>=n[g+1],A-=n[g+1],k=n[g],16&k){a=15&k,l=n[g+2],t=4;break}if(!(64&k)){c=k,o=g/3+n[g+2];break}return t=9,y.Fe="invalid distance code",m=st,e.ct=x,e.ft=A,y.je=v,y.Ge+=_-y.rt,y.rt=_,e.write=S,e.ht(y,m);case 4:for(b=a;b>A;){if(0===v)return e.ct=x,e.ft=A,y.je=v,y.Ge+=_-y.rt,y.rt=_,e.write=S,e.ht(y,m);m=0,v--,x|=(255&y.lt(_++))<<A,A+=8}l+=x&ot[b],x>>=b,A-=b,t=5;case 5:for(C=S-l;0>C;)C+=e.end;for(;0!==i;){if(0===z&&(S==e.end&&0!==e.read&&(S=0,z=S<e.read?e.read-S-1:e.end-S),0===z&&(e.write=S,m=e.ht(y,m),S=e.write,z=S<e.read?e.read-S-1:e.end-S,S==e.end&&0!==e.read&&(S=0,z=S<e.read?e.read-S-1:e.end-S),0===z)))return e.ct=x,e.ft=A,y.je=v,y.Ge+=_-y.rt,y.rt=_,e.write=S,e.ht(y,m);e.ut[S++]=e.ut[C++],z--,C==e.end&&(C=0),i--}t=0;break;case 6:if(0===z&&(S==e.end&&0!==e.read&&(S=0,z=S<e.read?e.read-S-1:e.end-S),0===z&&(e.write=S,m=e.ht(y,m),S=e.write,z=S<e.read?e.read-S-1:e.end-S,S==e.end&&0!==e.read&&(S=0,z=S<e.read?e.read-S-1:e.end-S),0===z)))return e.ct=x,e.ft=A,y.je=v,y.Ge+=_-y.rt,y.rt=_,e.write=S,e.ht(y,m);m=0,e.ut[S++]=f,z--,t=0;break;case 7:if(A>7&&(A-=8,v++,_--),e.write=S,m=e.ht(y,m),S=e.write,z=S<e.read?e.read-S-1:e.end-S,e.read!=e.write)return e.ct=x,e.ft=A,y.je=v,y.Ge+=_-y.rt,y.rt=_,e.write=S,e.ht(y,m);t=8;case 8:return m=1,e.ct=x,e.ft=A,y.je=v,y.Ge+=_-y.rt,y.rt=_,e.write=S,e.ht(y,m);case 9:return m=st,e.ct=x,e.ft=A,y.je=v,y.Ge+=_-y.rt,y.rt=_,e.write=S,e.ht(y,m);default:return m=rt,e.ct=x,e.ft=A,y.je=v,y.Ge+=_-y.rt,y.rt=_,e.write=S,e.ht(y,m)}},e.dt=()=>{}}ht.yt=(e,t,n,r)=>(e[0]=9,t[0]=5,n[0]=ct,r[0]=ft,0);const pt=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];function yt(e,t){const n=this;let r,s=0,o=0,c=0,a=0;const l=[0],u=[0],w=new dt;let h=0,d=new f(4320);const p=new ht;n.ft=0,n.ct=0,n.ut=new i(t),n.end=t,n.read=0,n.write=0,n.reset=(e,t)=>{t&&(t[0]=0),6==s&&w.dt(e),s=0,n.ft=0,n.ct=0,n.read=n.write=0},n.reset(e,null),n.ht=(e,t)=>{let r,s,i;return s=e.st,i=n.read,r=(i>n.write?n.end:n.write)-i,r>e.nt&&(r=e.nt),0!==r&&t==it&&(t=0),e.nt-=r,e.Je+=r,e.et.set(n.ut.subarray(i,i+r),s),s+=r,i+=r,i==n.end&&(i=0,n.write==n.end&&(n.write=0),r=n.write-i,r>e.nt&&(r=e.nt),0!==r&&t==it&&(t=0),e.nt-=r,e.Je+=r,e.et.set(n.ut.subarray(i,i+r),s),s+=r,i+=r),e.st=s,n.read=i,t},n.wt=(e,t)=>{let i,f,y,m,b,g,k,v;for(m=e.rt,b=e.je,f=n.ct,y=n.ft,g=n.write,k=g<n.read?n.read-g-1:n.end-g;;){let S,z,C,x,A,_,I,P;switch(s){case 0:for(;3>y;){if(0===b)return n.ct=f,n.ft=y,e.je=b,e.Ge+=m-e.rt,e.rt=m,n.write=g,n.ht(e,t);t=0,b--,f|=(255&e.lt(m++))<<y,y+=8}switch(i=7&f,h=1&i,i>>>1){case 0:f>>>=3,y-=3,i=7&y,f>>>=i,y-=i,s=1;break;case 1:S=[],z=[],C=[[]],x=[[]],ht.yt(S,z,C,x),w.init(S[0],z[0],C[0],0,x[0],0),f>>>=3,y-=3,s=6;break;case 2:f>>>=3,y-=3,s=3;break;case 3:return f>>>=3,y-=3,s=9,e.Fe="invalid block type",t=st,n.ct=f,n.ft=y,e.je=b,e.Ge+=m-e.rt,e.rt=m,n.write=g,n.ht(e,t)}break;case 1:for(;32>y;){if(0===b)return n.ct=f,n.ft=y,e.je=b,e.Ge+=m-e.rt,e.rt=m,n.write=g,n.ht(e,t);t=0,b--,f|=(255&e.lt(m++))<<y,y+=8}if((~f>>>16&65535)!=(65535&f))return s=9,e.Fe="invalid stored block lengths",t=st,n.ct=f,n.ft=y,e.je=b,e.Ge+=m-e.rt,e.rt=m,n.write=g,n.ht(e,t);o=65535&f,f=y=0,s=0!==o?2:0!==h?7:0;break;case 2:if(0===b)return n.ct=f,n.ft=y,e.je=b,e.Ge+=m-e.rt,e.rt=m,n.write=g,n.ht(e,t);if(0===k&&(g==n.end&&0!==n.read&&(g=0,k=g<n.read?n.read-g-1:n.end-g),0===k&&(n.write=g,t=n.ht(e,t),g=n.write,k=g<n.read?n.read-g-1:n.end-g,g==n.end&&0!==n.read&&(g=0,k=g<n.read?n.read-g-1:n.end-g),0===k)))return n.ct=f,n.ft=y,e.je=b,e.Ge+=m-e.rt,e.rt=m,n.write=g,n.ht(e,t);if(t=0,i=o,i>b&&(i=b),i>k&&(i=k),n.ut.set(e.He(m,i),g),m+=i,b-=i,g+=i,k-=i,0!=(o-=i))break;s=0!==h?7:0;break;case 3:for(;14>y;){if(0===b)return n.ct=f,n.ft=y,e.je=b,e.Ge+=m-e.rt,e.rt=m,n.write=g,n.ht(e,t);t=0,b--,f|=(255&e.lt(m++))<<y,y+=8}if(c=i=16383&f,(31&i)>29||(i>>5&31)>29)return s=9,e.Fe="too many length or distance symbols",t=st,n.ct=f,n.ft=y,e.je=b,e.Ge+=m-e.rt,e.rt=m,n.write=g,n.ht(e,t);if(i=258+(31&i)+(i>>5&31),!r||r.length<i)r=[];else for(v=0;i>v;v++)r[v]=0;f>>>=14,y-=14,a=0,s=4;case 4:for(;4+(c>>>10)>a;){for(;3>y;){if(0===b)return n.ct=f,n.ft=y,e.je=b,e.Ge+=m-e.rt,e.rt=m,n.write=g,n.ht(e,t);t=0,b--,f|=(255&e.lt(m++))<<y,y+=8}r[pt[a++]]=7&f,f>>>=3,y-=3}for(;19>a;)r[pt[a++]]=0;if(l[0]=7,i=p.it(r,l,u,d,e),0!=i)return(t=i)==st&&(r=null,s=9),n.ct=f,n.ft=y,e.je=b,e.Ge+=m-e.rt,e.rt=m,n.write=g,n.ht(e,t);a=0,s=5;case 5:for(;i=c,258+(31&i)+(i>>5&31)>a;){let o,w;for(i=l[0];i>y;){if(0===b)return n.ct=f,n.ft=y,e.je=b,e.Ge+=m-e.rt,e.rt=m,n.write=g,n.ht(e,t);t=0,b--,f|=(255&e.lt(m++))<<y,y+=8}if(i=d[3*(u[0]+(f&ot[i]))+1],w=d[3*(u[0]+(f&ot[i]))+2],16>w)f>>>=i,y-=i,r[a++]=w;else{for(v=18==w?7:w-14,o=18==w?11:3;i+v>y;){if(0===b)return n.ct=f,n.ft=y,e.je=b,e.Ge+=m-e.rt,e.rt=m,n.write=g,n.ht(e,t);t=0,b--,f|=(255&e.lt(m++))<<y,y+=8}if(f>>>=i,y-=i,o+=f&ot[v],f>>>=v,y-=v,v=a,i=c,v+o>258+(31&i)+(i>>5&31)||16==w&&1>v)return r=null,s=9,e.Fe="invalid bit length repeat",t=st,n.ct=f,n.ft=y,e.je=b,e.Ge+=m-e.rt,e.rt=m,n.write=g,n.ht(e,t);w=16==w?r[v-1]:0;do{r[v++]=w}while(0!=--o);a=v}}if(u[0]=-1,A=[],_=[],I=[],P=[],A[0]=9,_[0]=6,i=c,i=p.ot(257+(31&i),1+(i>>5&31),r,A,_,I,P,d,e),0!=i)return i==st&&(r=null,s=9),t=i,n.ct=f,n.ft=y,e.je=b,e.Ge+=m-e.rt,e.rt=m,n.write=g,n.ht(e,t);w.init(A[0],_[0],d,I[0],d,P[0]),s=6;case 6:if(n.ct=f,n.ft=y,e.je=b,e.Ge+=m-e.rt,e.rt=m,n.write=g,1!=(t=w.wt(n,e,t)))return n.ht(e,t);if(t=0,w.dt(e),m=e.rt,b=e.je,f=n.ct,y=n.ft,g=n.write,k=g<n.read?n.read-g-1:n.end-g,0===h){s=0;break}s=7;case 7:if(n.write=g,t=n.ht(e,t),g=n.write,k=g<n.read?n.read-g-1:n.end-g,n.read!=n.write)return n.ct=f,n.ft=y,e.je=b,e.Ge+=m-e.rt,e.rt=m,n.write=g,n.ht(e,t);s=8;case 8:return t=1,n.ct=f,n.ft=y,e.je=b,e.Ge+=m-e.rt,e.rt=m,n.write=g,n.ht(e,t);case 9:return t=st,n.ct=f,n.ft=y,e.je=b,e.Ge+=m-e.rt,e.rt=m,n.write=g,n.ht(e,t);default:return t=rt,n.ct=f,n.ft=y,e.je=b,e.Ge+=m-e.rt,e.rt=m,n.write=g,n.ht(e,t)}}},n.dt=e=>{n.reset(e,null),n.ut=null,d=null},n.bt=(e,t,r)=>{n.ut.set(e.subarray(t,t+r),0),n.read=n.write=r},n.gt=()=>1==s?1:0}const mt=13,bt=[0,0,255,255];function gt(){const e=this;function t(e){return e&&e.kt?(e.Ge=e.Je=0,e.Fe=null,e.kt.mode=7,e.kt.vt.reset(e,null),0):rt}e.mode=0,e.method=0,e.St=[0],e.zt=0,e.marker=0,e.Ct=0,e.xt=t=>(e.vt&&e.vt.dt(t),e.vt=null,0),e.At=(n,r)=>(n.Fe=null,e.vt=null,8>r||r>15?(e.xt(n),rt):(e.Ct=r,n.kt.vt=new yt(n,1<<r),t(n),0)),e._t=(e,t)=>{let n,r;if(!e||!e.kt||!e.tt)return rt;const s=e.kt;for(t=4==t?it:0,n=it;;)switch(s.mode){case 0:if(0===e.je)return n;if(n=t,e.je--,e.Ge++,8!=(15&(s.method=e.lt(e.rt++)))){s.mode=mt,e.Fe="unknown compression method",s.marker=5;break}if(8+(s.method>>4)>s.Ct){s.mode=mt,e.Fe="invalid win size",s.marker=5;break}s.mode=1;case 1:if(0===e.je)return n;if(n=t,e.je--,e.Ge++,r=255&e.lt(e.rt++),((s.method<<8)+r)%31!=0){s.mode=mt,e.Fe="incorrect header check",s.marker=5;break}if(!(32&r)){s.mode=7;break}s.mode=2;case 2:if(0===e.je)return n;n=t,e.je--,e.Ge++,s.zt=(255&e.lt(e.rt++))<<24&4278190080,s.mode=3;case 3:if(0===e.je)return n;n=t,e.je--,e.Ge++,s.zt+=(255&e.lt(e.rt++))<<16&16711680,s.mode=4;case 4:if(0===e.je)return n;n=t,e.je--,e.Ge++,s.zt+=(255&e.lt(e.rt++))<<8&65280,s.mode=5;case 5:return 0===e.je?n:(n=t,e.je--,e.Ge++,s.zt+=255&e.lt(e.rt++),s.mode=6,2);case 6:return s.mode=mt,e.Fe="need dictionary",s.marker=0,rt;case 7:if(n=s.vt.wt(e,n),n==st){s.mode=mt,s.marker=0;break}if(0==n&&(n=t),1!=n)return n;n=t,s.vt.reset(e,s.St),s.mode=12;case 12:return e.je=0,1;case mt:return st;default:return rt}},e.It=(e,t,n)=>{let r=0,s=n;if(!e||!e.kt||6!=e.kt.mode)return rt;const i=e.kt;return s<1<<i.Ct||(s=(1<<i.Ct)-1,r=n-s),i.vt.bt(t,r,s),i.mode=7,0},e.Pt=e=>{let n,r,s,i,o;if(!e||!e.kt)return rt;const c=e.kt;if(c.mode!=mt&&(c.mode=mt,c.marker=0),0===(n=e.je))return it;for(r=e.rt,s=c.marker;0!==n&&4>s;)e.lt(r)==bt[s]?s++:s=0!==e.lt(r)?0:4-s,r++,n--;return e.Ge+=r-e.rt,e.rt=r,e.je=n,c.marker=s,4!=s?st:(i=e.Ge,o=e.Je,t(e),e.Ge=i,e.Je=o,c.mode=7,0)},e.Dt=e=>e&&e.kt&&e.kt.vt?e.kt.vt.gt():rt}function kt(){}function vt(e){const t=new kt,n=e&&e.chunkSize?r.floor(2*e.chunkSize):131072,o=new i(n);let c=!1;t.At(),t.et=o,this.append=(e,r)=>{const f=[];let a,l,u=0,w=0,h=0;if(0!==e.length){t.rt=0,t.tt=e,t.je=e.length;do{if(t.st=0,t.nt=n,0!==t.je||c||(t.rt=0,c=!0),a=t._t(0),c&&a===it){if(0!==t.je)throw new s("inflating: bad input")}else if(0!==a&&1!==a)throw new s("inflating: "+t.Fe);if((c||1===a)&&t.je===e.length)throw new s("inflating: bad input");t.st&&(t.st===n?f.push(new i(o)):f.push(o.subarray(0,t.st))),h+=t.st,r&&t.rt>0&&t.rt!=u&&(r(t.rt),u=t.rt)}while(t.je>0||0===t.nt);return f.length>1?(l=new i(h),f.forEach((e=>{l.set(e,w),w+=e.length}))):l=f[0]?new i(f[0]):new i,l}},this.flush=()=>{t.xt()}}kt.prototype={At(e){const t=this;return t.kt=new gt,e||(e=15),t.kt.At(t,e)},_t(e){const t=this;return t.kt?t.kt._t(t,e):rt},xt(){const e=this;if(!e.kt)return rt;const t=e.kt.xt(e);return e.kt=null,t},Pt(){const e=this;return e.kt?e.kt.Pt(e):rt},It(e,t){const n=this;return n.kt?n.kt.It(n,e,t):rt},lt(e){return this.tt[e]},He(e,t){return this.tt.subarray(e,e+t)}},self.initCodec=()=>{self.Deflate=nt,self.Inflate=vt};\n', r2 = () => t2.useDataURI ? "data:text/javascript," + encodeURIComponent(n2) : f.createObjectURL(new m([n2], { type: "text/javascript" }));
          e2({ workerScripts: { inflate: [r2], deflate: [r2] } });
        })(ne), e.BlobReader = Ot, e.BlobWriter = Pt, e.Data64URIReader = class extends Wt {
          constructor(e2) {
            super();
            let t2 = e2.length;
            for (; "=" == e2.charAt(t2 - 1); ) t2--;
            const r2 = e2.indexOf(",") + 1;
            n.assign(this, { dataURI: e2, dataStart: r2, size: a.floor(0.75 * (t2 - r2)) });
          }
          readUint8Array(e2, t2) {
            const { dataStart: n2, dataURI: r2 } = this, s2 = new w(t2), i2 = 4 * a.floor(e2 / 3), o2 = atob(r2.substring(i2 + n2, 4 * a.ceil((e2 + t2) / 3) + n2)), c2 = e2 - 3 * a.floor(i2 / 4);
            for (let e3 = c2; c2 + t2 > e3; e3++) s2[e3 - c2] = o2.charCodeAt(e3);
            return s2;
          }
        }, e.Data64URIWriter = class extends jt {
          constructor(e2) {
            super(), n.assign(this, { data: "data:" + (e2 || "") + ";base64,", pending: [] });
          }
          writeUint8Array(e2) {
            const t2 = this;
            let n2 = 0, s2 = t2.pending;
            const i2 = t2.pending.length;
            for (t2.pending = "", n2 = 0; n2 < 3 * a.floor((i2 + e2.length) / 3) - i2; n2++) s2 += r.fromCharCode(e2[n2]);
            for (; n2 < e2.length; n2++) t2.pending += r.fromCharCode(e2[n2]);
            s2.length > 2 ? t2.data += v(s2) : t2.pending = s2;
          }
          getData() {
            return this.data + v(this.pending);
          }
        }, e.ERR_BAD_FORMAT = Ln, e.ERR_CENTRAL_DIRECTORY_NOT_FOUND = Wn, e.ERR_DUPLICATED_NAME = or, e.ERR_ENCRYPTED = Pn, e.ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND = Nn, e.ERR_EOCDR_NOT_FOUND = In, e.ERR_EXTRAFIELD_ZIP64_NOT_FOUND = On, e.ERR_HTTP_RANGE = Ft, e.ERR_INVALID_COMMENT = cr, e.ERR_INVALID_ENCRYPTION_STRENGTH = dr, e.ERR_INVALID_ENTRY_COMMENT = lr, e.ERR_INVALID_ENTRY_NAME = ur, e.ERR_INVALID_EXTRAFIELD_DATA = hr, e.ERR_INVALID_EXTRAFIELD_TYPE = wr, e.ERR_INVALID_PASSWORD = pe, e.ERR_INVALID_SIGNATURE = ge, e.ERR_INVALID_VERSION = fr, e.ERR_ITERATOR_COMPLETED_TOO_SOON = Rt, e.ERR_LOCAL_FILE_HEADER_NOT_FOUND = jn, e.ERR_SPLIT_ZIP_FILE = Mn, e.ERR_UNDEFINED_UNCOMPRESSED_SIZE = gr, e.ERR_UNSUPPORTED_COMPRESSION = Gn, e.ERR_UNSUPPORTED_ENCRYPTION = Hn, e.ERR_UNSUPPORTED_FORMAT = pr, e.HttpRangeReader = class extends en {
          constructor(e2, t2 = {}) {
            t2.useRangeHeader = true, super(e2, t2);
          }
        }, e.HttpReader = en, e.Reader = Wt, e.SplitDataReader = tn, e.SplitDataWriter = nn, e.SplitZipReader = cn, e.SplitZipWriter = ln, e.TextReader = class extends Ot {
          constructor(e2) {
            super(new m([e2], { type: "text/plain" }));
          }
        }, e.TextWriter = class extends Pt {
          constructor(e2) {
            super(e2), n.assign(this, { encoding: e2, utf8: !e2 || "utf-8" == e2.toLowerCase() });
          }
          async getData() {
            const { encoding: e2, utf8: t2 } = this, r2 = await super.getData();
            if (r2.text && t2) return r2.text();
            {
              const t3 = new FileReader();
              return new y(((s2, i2) => {
                n.assign(t3, { onload: ({ target: e3 }) => s2(e3.result), onerror: () => i2(t3.error) }), t3.readAsText(r2, e2);
              }));
            }
          }
        }, e.Uint8ArrayReader = class extends Wt {
          constructor(e2) {
            super(), n.assign(this, { array: e2, size: e2.length });
          }
          readUint8Array(e2, t2) {
            return this.array.slice(e2, e2 + t2);
          }
        }, e.Uint8ArrayWriter = class extends jt {
          init(e2 = 0) {
            n.assign(this, { offset: 0, array: new w(e2) }), super.init();
          }
          writeUint8Array(e2) {
            const t2 = this;
            if (t2.offset + e2.length > t2.array.length) {
              const n2 = t2.array;
              t2.array = new w(n2.length + e2.length), t2.array.set(n2);
            }
            t2.array.set(e2, t2.offset), t2.offset += e2.length;
          }
          getData() {
            return this.array;
          }
        }, e.Writer = jt, e.ZipReader = Kn, e.ZipReaderStream = class {
          constructor(e2 = {}) {
            const { readable: t2, writable: n2 } = new x(), r2 = new Kn(t2, e2).getEntriesGenerator();
            this.readable = new A({ async pull(e3) {
              const { done: t3, value: n3 } = await r2.next();
              if (t3) return e3.close();
              const s2 = { ...n3, readable: (() => {
                const { readable: e4, writable: t4 } = new x();
                if (n3.getData) return n3.getData(t4), e4;
              })() };
              delete s2.getData, e3.enqueue(s2);
            } }), this.writable = n2;
          }
        }, e.ZipWriter = Sr, e.ZipWriterStream = class {
          constructor(e2 = {}) {
            const { readable: t2, writable: n2 } = new x();
            this.readable = t2, this.zipWriter = new Sr(n2, e2);
          }
          transform(e2) {
            const { readable: t2, writable: n2 } = new x({ flush: () => {
              this.zipWriter.close();
            } });
            return this.zipWriter.add(e2, t2), { readable: this.readable, writable: n2 };
          }
          writable(e2) {
            const { readable: t2, writable: n2 } = new x();
            return this.zipWriter.add(e2, t2), n2;
          }
          close(e2, t2 = {}) {
            return this.zipWriter.close(e2, t2);
          }
        }, e.configure = ne, e.getMimeType = () => "application/octet-stream", e.initReader = sn, e.initShimAsyncCodec = (e2, t2 = {}, n2) => ({ Deflate: se(e2.Deflate, t2.deflate, n2), Inflate: se(e2.Inflate, t2.inflate, n2) }), e.initStream = rn, e.initWriter = an, e.readUint8Array = on, e.terminateWorkers = async () => {
          await y.allSettled(vt.map(((e2) => (_t(e2), e2.terminate()))));
        };
      }));
    }
  });

  // app/util.ts
  function uuid(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  function uuidtime() {
    return uuid(16) + (/* @__PURE__ */ new Date()).getTime();
  }
  async function downloadURI(uri, name) {
    if (!name) {
      if (new URL(uri).protocol === "blob:") {
        let blobby = await fetch(uri).then((r) => r.blob());
        if (blobby.constructor == File) {
          name = blobby.name;
        } else {
          name = "Unnamed";
        }
      } else {
        name = "Unnamed";
      }
    }
    let link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
  }
  function revokeBlobSoonTM(bloburl) {
    setTimeout(() => {
      URL.revokeObjectURL(bloburl);
    }, 5e3);
  }
  async function constructorPrototypeCopyNoReadOnly(obj) {
    if (Object.getPrototypeOf(obj) === Object.getPrototypeOf({})) return obj;
    let prototypes = [];
    let newobj = {};
    const callback = (item) => {
      prototypes.push(item);
    };
    async function constructorPrototypeCopyNoReadOnly_helper(obj2, callback2) {
      return await new Promise(async (resolve) => {
        if (!Object.getPrototypeOf(obj2)) {
          resolve();
          return;
        }
        Object.keys(Object.getPrototypeOf(obj2)).forEach((val) => {
          callback2(val);
        });
        if (!Object.getPrototypeOf(obj2)) {
          resolve();
          return;
        }
        if (Object.getPrototypeOf(Object.getPrototypeOf(obj2)) !== Object.getPrototypeOf(obj2)) {
          await constructorPrototypeCopyNoReadOnly_helper(Object.getPrototypeOf(obj2), callback2);
          resolve();
        } else {
          resolve();
        }
      });
    }
    await constructorPrototypeCopyNoReadOnly_helper(obj, callback);
    prototypes.forEach((val) => {
      newobj[val] = obj[val];
    });
    return newobj;
  }
  function confirmation(msg, callback, callbackNo) {
    let popupid = uuidtime();
    let parent = document.createElement("div");
    parent.classList.add("confirmation");
    parent.id = popupid;
    let child = document.createElement("div");
    let alt_cancel = document.createElement("div");
    alt_cancel.classList.add("confirmation-bg-cancel");
    alt_cancel.onclick = () => {
      callbackNo?.();
      document.getElementById(popupid)?.remove();
    };
    let header = document.createElement("h1");
    header.innerHTML = msg;
    let cancel = document.createElement("button");
    cancel.innerText = "Cancel";
    cancel.classList.add("confirmation-cancel");
    cancel.onclick = () => {
      callbackNo?.();
      document.getElementById(popupid)?.remove();
    };
    let confirm = document.createElement("button");
    confirm.innerText = "Confirm";
    confirm.classList.add("confirmation-confirm");
    confirm.onclick = () => {
      callback();
      document.getElementById(popupid)?.remove();
    };
    child.append(header, cancel, confirm);
    parent.append(child, alt_cancel);
    document.body.append(parent);
  }
  function bytesToText(num, depth = 0) {
    for (; String(Math.round(num)).length > 3 && depth < 5; depth++) {
      num /= 1e3;
    }
    let append = " ";
    switch (depth) {
      case 0:
        append += "B";
        break;
      case 1:
        append += "KB";
        break;
      case 2:
        append += "MB";
        break;
      case 3:
        append += "GB";
        break;
      case 4:
        append += "TB";
        break;
      default:
        append += "PB";
        break;
    }
    return num.toFixed(1) + append;
  }

  // app/other-ui.ts
  async function updateStorageInfo() {
    try {
      const result = await navigator.storage.estimate();
      document.getElementById("storageinfo").innerText = `${bytesToText(result.usage ?? NaN)} (${((result.usage ?? NaN) / (result.quota ?? NaN) * 100).toFixed(1)}%) / ${bytesToText(result.quota ?? NaN)}`;
    } catch (error) {
      console.error(error);
    }
  }
  var ourFullscreen = false;
  var ourHiding = false;
  function toggleFullscreenGallery(options = {}) {
    const { toggle = true, noFullscreen = false } = options;
    const areWeAlreadyFullscreen = !!document.fullscreenElement;
    if (!noFullscreen) {
      if (areWeAlreadyFullscreen) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen().catch((err) => {
          ourFullscreen = false;
          document.documentElement.classList.remove("fullscreen");
        });
      }
    }
    if (!areWeAlreadyFullscreen || !noFullscreen) {
      if (document.documentElement.classList.contains("fullscreen")) {
        document.documentElement.classList.remove("fullscreen");
      } else if (!ourHiding) {
        document.documentElement.classList.add("fullscreen");
      }
      if (!document.documentElement.classList.contains("fullscreen") && ourHiding && !noFullscreen) {
        document.documentElement.classList.add("fullscreen");
        ourHiding = false;
      }
    }
    if (!noFullscreen && toggle) {
      ourFullscreen = !ourFullscreen;
    }
    if (noFullscreen && !areWeAlreadyFullscreen && toggle) {
      ourHiding = !ourHiding;
    }
  }

  // app/globals.ts
  var import_dragula2 = __toESM(require_dragula_min());

  // node_modules/.pnpm/@logtape+logtape@2.2.0/node_modules/@logtape/logtape/dist/filter.js
  function toFilter(filter) {
    if (typeof filter === "function") return filter;
    return getLevelFilter(filter);
  }
  function getLevelFilter(level) {
    if (level == null) return () => false;
    if (level === "fatal") return (record) => record.level === "fatal";
    else if (level === "error") return (record) => record.level === "fatal" || record.level === "error";
    else if (level === "warning") return (record) => record.level === "fatal" || record.level === "error" || record.level === "warning";
    else if (level === "info") return (record) => record.level === "fatal" || record.level === "error" || record.level === "warning" || record.level === "info";
    else if (level === "debug") return (record) => record.level === "fatal" || record.level === "error" || record.level === "warning" || record.level === "info" || record.level === "debug";
    else if (level === "trace") return () => true;
    throw new TypeError(`Invalid log level: ${level}.`);
  }

  // node_modules/.pnpm/@logtape+logtape@2.2.0/node_modules/@logtape/logtape/dist/level.js
  var logLevels = [
    "trace",
    "debug",
    "info",
    "warning",
    "error",
    "fatal"
  ];
  function compareLogLevel(a, b) {
    const aIndex = logLevels.indexOf(a);
    if (aIndex < 0) throw new TypeError(`Invalid log level: ${JSON.stringify(a)}.`);
    const bIndex = logLevels.indexOf(b);
    if (bIndex < 0) throw new TypeError(`Invalid log level: ${JSON.stringify(b)}.`);
    return aIndex - bIndex;
  }

  // node_modules/.pnpm/@logtape+logtape@2.2.0/node_modules/@logtape/logtape/dist/logger.js
  var lazySymbol = /* @__PURE__ */ Symbol.for("logtape.lazy");
  var throttlingSummaryRecordSymbol = /* @__PURE__ */ Symbol.for("LogTape.throttlingSummaryRecord");
  var immediateSinkSymbol = /* @__PURE__ */ Symbol.for("LogTape.sinkSnapshotPolicy.immediate");
  var internalStringLogRecords = /* @__PURE__ */ new WeakSet();
  var resolvedStringLogRecords = /* @__PURE__ */ new WeakSet();
  function isLazy(value) {
    return value != null && typeof value === "object" && lazySymbol in value && value[lazySymbol] === true;
  }
  function resolveProperties(properties) {
    const resolved = {};
    for (const key in properties) {
      const value = properties[key];
      resolved[key] = isLazy(value) ? value.getter() : value;
    }
    const symbolProperties = properties;
    const symbolResolved = resolved;
    if (Object.prototype.propertyIsEnumerable.call(properties, throttlingSummaryRecordSymbol)) {
      const value = symbolProperties[throttlingSummaryRecordSymbol];
      symbolResolved[throttlingSummaryRecordSymbol] = isLazy(value) ? value.getter() : value;
    }
    return resolved;
  }
  function isPromiseObject(value) {
    if (value instanceof Promise) return true;
    return Object.prototype.toString.call(value) === "[object Promise]" && typeof value.then === "function";
  }
  function logStringMessage(logger, level, message, props) {
    if (typeof props !== "function") {
      const properties = props ?? {};
      logger.log(level, message, properties);
      return;
    }
    if (!logger.isEnabledFor(level)) return Promise.resolve();
    const result = props();
    if (isPromiseObject(result)) return Promise.resolve(result).then((resolvedProps) => {
      logger.log(level, message, resolvedProps);
    });
    logger.log(level, message, result);
  }
  function snapshotLogRecordProperties(record) {
    if (resolvedStringLogRecords.has(record)) return record;
    const properties = resolveProperties(record.properties);
    if (internalStringLogRecords.has(record)) return {
      category: record.category,
      level: record.level,
      get message() {
        return record.message;
      },
      rawMessage: record.rawMessage,
      timestamp: record.timestamp,
      properties
    };
    const descriptors = Object.getOwnPropertyDescriptors(record);
    descriptors.properties = {
      value: properties,
      enumerable: true,
      configurable: true
    };
    return Object.defineProperties({}, descriptors);
  }
  function hasEnumerableProperties(properties) {
    if (properties == null || typeof properties !== "object") return false;
    return Object.keys(properties).length > 0 || Object.prototype.propertyIsEnumerable.call(properties, throttlingSummaryRecordSymbol);
  }
  function shouldSnapshotForSink(sink) {
    return sink[immediateSinkSymbol] !== true;
  }
  function getLogger(category = []) {
    return LoggerImpl.getLogger(category);
  }
  var globalRootLoggerSymbol = /* @__PURE__ */ Symbol.for("logtape.rootLogger");
  function isMetaLoggerCategory(category) {
    return category.length === 2 && category[0] === "logtape" && category[1] === "meta";
  }
  var LoggerImpl = class LoggerImpl2 {
    parent;
    children;
    category;
    sinks;
    filters;
    contextLocalStorage;
    #parentSinks = "inherit";
    #lowestLevel = "trace";
    #sinkPlanCache = {};
    static getLogger(category = []) {
      let rootLogger = globalRootLoggerSymbol in globalThis ? globalThis[globalRootLoggerSymbol] ?? null : null;
      if (rootLogger == null) {
        rootLogger = new LoggerImpl2(null, []);
        globalThis[globalRootLoggerSymbol] = rootLogger;
      }
      if (typeof category === "string") return rootLogger.getChild(category);
      if (category.length === 0) return rootLogger;
      return rootLogger.getChild(category);
    }
    static getNearestExistingLogger(category) {
      let logger = LoggerImpl2.getLogger();
      for (const name of category) {
        const childRef = logger.children[name];
        const child = childRef instanceof LoggerImpl2 ? childRef : childRef?.deref();
        if (child == null) break;
        logger = child;
      }
      return logger;
    }
    constructor(parent, category) {
      this.parent = parent;
      this.children = {};
      this.category = category;
      this.sinks = [];
      this.filters = [];
    }
    get parentSinks() {
      return this.#parentSinks;
    }
    set parentSinks(value) {
      if (this.#parentSinks === value) return;
      this.#parentSinks = value;
    }
    get lowestLevel() {
      return this.#lowestLevel;
    }
    set lowestLevel(value) {
      if (this.#lowestLevel === value) return;
      this.#lowestLevel = value;
    }
    getChild(subcategory) {
      const name = typeof subcategory === "string" ? subcategory : subcategory[0];
      const childRef = this.children[name];
      let child = childRef instanceof LoggerImpl2 ? childRef : childRef?.deref();
      if (child == null) {
        child = new LoggerImpl2(this, [...this.category, name]);
        this.children[name] = "WeakRef" in globalThis ? new WeakRef(child) : child;
      }
      if (typeof subcategory === "string" || subcategory.length === 1) return child;
      return child.getChild(subcategory.slice(1));
    }
    /**
    * Reset the logger.  This removes all sinks and filters from the logger.
    */
    reset() {
      while (this.sinks.length > 0) this.sinks.shift();
      this.parentSinks = "inherit";
      while (this.filters.length > 0) this.filters.shift();
      this.lowestLevel = "trace";
    }
    /**
    * Reset the logger and all its descendants.  This removes all sinks and
    * filters from the logger and all its descendants.
    */
    resetDescendants() {
      for (const child of Object.values(this.children)) {
        const logger = child instanceof LoggerImpl2 ? child : child.deref();
        if (logger != null) logger.resetDescendants();
      }
      this.reset();
    }
    with(properties) {
      return new LoggerCtx(this, { ...properties });
    }
    filter(record) {
      for (const filter of this.filters) if (!filter(record)) return false;
      if (this.filters.length < 1) return this.parent?.filter(record) ?? true;
      return true;
    }
    *getSinks(level) {
      const plan = this.getSinkDispatchPlan(level);
      switch (plan.kind) {
        case "none":
          return;
        case "one":
          yield plan.sink;
          return;
        case "many":
          yield* plan.sinks;
          return;
      }
    }
    getSinkDispatchPlan(level) {
      const cached = this.#sinkPlanCache[level];
      if (cached != null && this.isSinkDispatchPlanFresh(level, cached)) return cached;
      const parentPlan = this.parent != null && this.parentSinks === "inherit" ? this.parent.getSinkDispatchPlan(level) : void 0;
      const plan = this.createSinkDispatchPlan(level, parentPlan);
      this.#sinkPlanCache[level] = plan;
      return plan;
    }
    isSinkDispatchPlanFresh(level, plan) {
      if (plan.lowestLevel !== this.lowestLevel || plan.parentSinks !== this.parentSinks || plan.localSinks.length !== this.sinks.length) return false;
      for (let i = 0; i < plan.localSinks.length; i++) if (plan.localSinks[i] !== this.sinks[i]) return false;
      const parentPlan = this.parent != null && this.parentSinks === "inherit" ? this.parent.getSinkDispatchPlan(level) : void 0;
      return plan.parentPlan === parentPlan;
    }
    createSinkDispatchPlan(level, parentPlan) {
      const state = {
        localSinks: [...this.sinks],
        parentSinks: this.parentSinks,
        lowestLevel: this.lowestLevel,
        parentPlan
      };
      if (state.lowestLevel === null) return {
        ...state,
        kind: "none"
      };
      if (compareLogLevel(level, state.lowestLevel) < 0) return {
        ...state,
        kind: "none"
      };
      let firstSink;
      let sinks;
      const appendSink = (sink) => {
        if (sinks != null) sinks.push(sink);
        else if (firstSink == null) firstSink = sink;
        else sinks = [firstSink, sink];
      };
      if (parentPlan != null) {
        if (parentPlan.kind === "one") firstSink = parentPlan.sink;
        else if (parentPlan.kind === "many") sinks = [...parentPlan.sinks];
      }
      for (const sink of state.localSinks) appendSink(sink);
      if (sinks != null) return {
        ...state,
        kind: "many",
        sinks
      };
      if (firstSink != null) return {
        ...state,
        kind: "one",
        sink: firstSink
      };
      return {
        ...state,
        kind: "none"
      };
    }
    isEnabledFor(level) {
      const categoryPrefix = isMetaLoggerCategory(this.category) ? [] : getCategoryPrefix();
      const dispatcher = categoryPrefix.length > 0 ? LoggerImpl2.getNearestExistingLogger([...categoryPrefix, ...this.category]) : this;
      return dispatcher.isEnabledForResolved(level);
    }
    isEnabledForResolved(level) {
      return this.getSinkDispatchPlan(level).kind !== "none";
    }
    emit(record, bypassSinks) {
      const hasCategory = "category" in record;
      const baseCategory = hasCategory ? record.category : this.category;
      const categoryPrefix = isMetaLoggerCategory(baseCategory) ? [] : getCategoryPrefix();
      const fullCategory = categoryPrefix.length > 0 ? [...categoryPrefix, ...baseCategory] : baseCategory;
      if (categoryPrefix.length < 1 && Object.prototype.hasOwnProperty.call(record, "category")) {
        this.emitResolved(record, bypassSinks);
        return;
      }
      const descriptors = Object.getOwnPropertyDescriptors(record);
      descriptors.category = {
        value: fullCategory,
        enumerable: true,
        configurable: true
      };
      const fullRecord = Object.defineProperties({}, descriptors);
      const dispatcher = categoryPrefix.length > 0 ? LoggerImpl2.getNearestExistingLogger(fullCategory) : this;
      dispatcher.emitResolved(fullRecord, bypassSinks);
    }
    emitResolved(record, bypassSinks) {
      if (this.lowestLevel === null || compareLogLevel(record.level, this.lowestLevel) < 0 || !this.filter(record)) return;
      const plan = this.getSinkDispatchPlan(record.level);
      if (plan.kind === "none") return;
      let snapshot;
      let snapshotFailed = false;
      if (plan.kind === "one") {
        const sink = plan.sink;
        if (bypassSinks?.has(sink)) return;
        try {
          if (shouldSnapshotForSink(sink)) try {
            snapshot = snapshotLogRecordProperties(record);
          } catch {
            snapshotFailed = true;
            snapshot = record;
          }
          sink(snapshot ?? record);
        } catch (error) {
          const bypassSinks2 = new Set(bypassSinks);
          bypassSinks2.add(sink);
          metaLogger.log("fatal", "Failed to emit a log record to sink {sink}: {error}", {
            sink,
            error,
            record
          }, bypassSinks2);
        }
        return;
      }
      for (const sink of plan.sinks) {
        if (bypassSinks?.has(sink)) continue;
        try {
          if (snapshot == null && !snapshotFailed && shouldSnapshotForSink(sink)) try {
            snapshot = snapshotLogRecordProperties(record);
          } catch {
            snapshotFailed = true;
            snapshot = record;
          }
          sink(snapshot ?? record);
        } catch (error) {
          const bypassSinks2 = new Set(bypassSinks);
          bypassSinks2.add(sink);
          metaLogger.log("fatal", "Failed to emit a log record to sink {sink}: {error}", {
            sink,
            error,
            record
          }, bypassSinks2);
        }
      }
    }
    log(level, rawMessage, properties, bypassSinks) {
      const implicitContext = getImplicitContextIfAny();
      if (typeof properties !== "function" && implicitContext == null && !rawMessage.includes("{") && !hasEnumerableProperties(properties)) {
        const record$1 = {
          category: this.category,
          level,
          message: [rawMessage],
          rawMessage,
          timestamp: Date.now(),
          properties: {}
        };
        resolvedStringLogRecords.add(record$1);
        this.emit(record$1, bypassSinks);
        return;
      }
      let cachedProps = void 0;
      let cachedMessage = void 0;
      const record = typeof properties === "function" ? {
        category: this.category,
        level,
        timestamp: Date.now(),
        get message() {
          if (cachedMessage == null) cachedMessage = parseMessageTemplate(rawMessage, this.properties);
          return cachedMessage;
        },
        rawMessage,
        get properties() {
          if (cachedProps == null) cachedProps = resolveProperties({
            ...implicitContext ?? {},
            ...properties()
          });
          return cachedProps;
        }
      } : {
        category: this.category,
        level,
        timestamp: Date.now(),
        get message() {
          if (cachedMessage == null) cachedMessage = parseMessageTemplate(rawMessage, this.properties);
          return cachedMessage;
        },
        rawMessage,
        get properties() {
          if (cachedProps == null) cachedProps = resolveProperties({
            ...implicitContext ?? {},
            ...properties
          });
          return cachedProps;
        }
      };
      internalStringLogRecords.add(record);
      this.emit(record, bypassSinks);
    }
    logLazily(level, callback, properties = {}) {
      const implicitContext = getImplicitContextIfAny();
      let rawMessage = void 0;
      let msg = void 0;
      function realizeMessage() {
        if (msg == null || rawMessage == null) {
          msg = callback((tpl, ...values) => {
            rawMessage = tpl;
            return renderMessage(tpl, values);
          });
          if (rawMessage == null) throw new TypeError("No log record was made.");
        }
        return [msg, rawMessage];
      }
      this.emit({
        category: this.category,
        level,
        get message() {
          return realizeMessage()[0];
        },
        get rawMessage() {
          return realizeMessage()[1];
        },
        timestamp: Date.now(),
        properties: {
          ...implicitContext ?? {},
          ...properties
        }
      });
    }
    logTemplate(level, messageTemplate, values, properties = {}) {
      const implicitContext = getImplicitContextIfAny();
      this.emit({
        category: this.category,
        level,
        message: renderMessage(messageTemplate, values),
        rawMessage: messageTemplate,
        timestamp: Date.now(),
        properties: {
          ...implicitContext ?? {},
          ...properties
        }
      });
    }
    trace(message, ...values) {
      if (typeof message === "string") return logStringMessage(this, "trace", message, values[0]);
      else if (typeof message === "function") this.logLazily("trace", message);
      else if (!Array.isArray(message)) this.log("trace", "{*}", message);
      else this.logTemplate("trace", message, values);
    }
    debug(message, ...values) {
      if (typeof message === "string") return logStringMessage(this, "debug", message, values[0]);
      else if (typeof message === "function") this.logLazily("debug", message);
      else if (!Array.isArray(message)) this.log("debug", "{*}", message);
      else this.logTemplate("debug", message, values);
    }
    info(message, ...values) {
      if (typeof message === "string") return logStringMessage(this, "info", message, values[0]);
      else if (typeof message === "function") this.logLazily("info", message);
      else if (!Array.isArray(message)) this.log("info", "{*}", message);
      else this.logTemplate("info", message, values);
    }
    logError(level, error, props) {
      if (typeof props !== "function") {
        this.log(level, "{error.message}", {
          ...props,
          error
        });
        return;
      }
      if (!this.isEnabledFor(level)) return Promise.resolve();
      const result = props();
      if (result instanceof Promise) return result.then((resolved) => {
        this.log(level, "{error.message}", {
          ...resolved,
          error
        });
      });
      this.log(level, "{error.message}", {
        ...result,
        error
      });
    }
    warn(message, ...values) {
      if (message instanceof Error) return this.logError("warning", message, values[0]);
      else if (typeof message === "string" && values[0] instanceof Error) this.log("warning", message, { error: values[0] });
      else if (typeof message === "string") return logStringMessage(this, "warning", message, values[0]);
      else if (typeof message === "function") this.logLazily("warning", message);
      else if (!Array.isArray(message)) this.log("warning", "{*}", message);
      else this.logTemplate("warning", message, values);
    }
    warning(message, ...values) {
      if (message instanceof Error) return this.logError("warning", message, values[0]);
      else if (typeof message === "string" && values[0] instanceof Error) this.log("warning", message, { error: values[0] });
      else if (typeof message === "string") return logStringMessage(this, "warning", message, values[0]);
      else if (typeof message === "function") this.logLazily("warning", message);
      else if (!Array.isArray(message)) this.log("warning", "{*}", message);
      else this.logTemplate("warning", message, values);
    }
    error(message, ...values) {
      if (message instanceof Error) return this.logError("error", message, values[0]);
      else if (typeof message === "string" && values[0] instanceof Error) this.log("error", message, { error: values[0] });
      else if (typeof message === "string") return logStringMessage(this, "error", message, values[0]);
      else if (typeof message === "function") this.logLazily("error", message);
      else if (!Array.isArray(message)) this.log("error", "{*}", message);
      else this.logTemplate("error", message, values);
    }
    fatal(message, ...values) {
      if (message instanceof Error) return this.logError("fatal", message, values[0]);
      else if (typeof message === "string" && values[0] instanceof Error) this.log("fatal", message, { error: values[0] });
      else if (typeof message === "string") return logStringMessage(this, "fatal", message, values[0]);
      else if (typeof message === "function") this.logLazily("fatal", message);
      else if (!Array.isArray(message)) this.log("fatal", "{*}", message);
      else this.logTemplate("fatal", message, values);
    }
  };
  var LoggerCtx = class LoggerCtx2 {
    logger;
    properties;
    constructor(logger, properties) {
      this.logger = logger;
      this.properties = properties;
    }
    get category() {
      return this.logger.category;
    }
    get parent() {
      return this.logger.parent;
    }
    getChild(subcategory) {
      return this.logger.getChild(subcategory).with(this.properties);
    }
    with(properties) {
      return new LoggerCtx2(this.logger, {
        ...this.properties,
        ...properties
      });
    }
    log(level, message, properties, bypassSinks) {
      const contextProps = this.properties;
      this.logger.log(level, message, typeof properties === "function" ? () => resolveProperties({
        ...contextProps,
        ...properties()
      }) : () => resolveProperties({
        ...contextProps,
        ...properties
      }), bypassSinks);
    }
    logLazily(level, callback) {
      this.logger.logLazily(level, callback, resolveProperties(this.properties));
    }
    logTemplate(level, messageTemplate, values) {
      this.logger.logTemplate(level, messageTemplate, values, resolveProperties(this.properties));
    }
    emit(record) {
      const recordWithContext = {
        ...record,
        properties: resolveProperties({
          ...this.properties,
          ...record.properties
        })
      };
      this.logger.emit(recordWithContext);
    }
    isEnabledFor(level) {
      return this.logger.isEnabledFor(level);
    }
    trace(message, ...values) {
      if (typeof message === "string") return logStringMessage(this, "trace", message, values[0]);
      else if (typeof message === "function") this.logLazily("trace", message);
      else if (!Array.isArray(message)) this.log("trace", "{*}", message);
      else this.logTemplate("trace", message, values);
    }
    debug(message, ...values) {
      if (typeof message === "string") return logStringMessage(this, "debug", message, values[0]);
      else if (typeof message === "function") this.logLazily("debug", message);
      else if (!Array.isArray(message)) this.log("debug", "{*}", message);
      else this.logTemplate("debug", message, values);
    }
    info(message, ...values) {
      if (typeof message === "string") return logStringMessage(this, "info", message, values[0]);
      else if (typeof message === "function") this.logLazily("info", message);
      else if (!Array.isArray(message)) this.log("info", "{*}", message);
      else this.logTemplate("info", message, values);
    }
    logError(level, error, props) {
      if (typeof props !== "function") {
        this.log(level, "{error.message}", {
          ...props,
          error
        });
        return;
      }
      if (!this.isEnabledFor(level)) return Promise.resolve();
      const result = props();
      if (result instanceof Promise) return result.then((resolved) => {
        this.log(level, "{error.message}", {
          ...resolved,
          error
        });
      });
      this.log(level, "{error.message}", {
        ...result,
        error
      });
    }
    warn(message, ...values) {
      if (message instanceof Error) return this.logError("warning", message, values[0]);
      else if (typeof message === "string" && values[0] instanceof Error) this.log("warning", message, { error: values[0] });
      else if (typeof message === "string") return logStringMessage(this, "warning", message, values[0]);
      else if (typeof message === "function") this.logLazily("warning", message);
      else if (!Array.isArray(message)) this.log("warning", "{*}", message);
      else this.logTemplate("warning", message, values);
    }
    warning(message, ...values) {
      if (message instanceof Error) return this.logError("warning", message, values[0]);
      else if (typeof message === "string" && values[0] instanceof Error) this.log("warning", message, { error: values[0] });
      else if (typeof message === "string") return logStringMessage(this, "warning", message, values[0]);
      else if (typeof message === "function") this.logLazily("warning", message);
      else if (!Array.isArray(message)) this.log("warning", "{*}", message);
      else this.logTemplate("warning", message, values);
    }
    error(message, ...values) {
      if (message instanceof Error) return this.logError("error", message, values[0]);
      else if (typeof message === "string" && values[0] instanceof Error) this.log("error", message, { error: values[0] });
      else if (typeof message === "string") return logStringMessage(this, "error", message, values[0]);
      else if (typeof message === "function") this.logLazily("error", message);
      else if (!Array.isArray(message)) this.log("error", "{*}", message);
      else this.logTemplate("error", message, values);
    }
    fatal(message, ...values) {
      if (message instanceof Error) return this.logError("fatal", message, values[0]);
      else if (typeof message === "string" && values[0] instanceof Error) this.log("fatal", message, { error: values[0] });
      else if (typeof message === "string") return logStringMessage(this, "fatal", message, values[0]);
      else if (typeof message === "function") this.logLazily("fatal", message);
      else if (!Array.isArray(message)) this.log("fatal", "{*}", message);
      else this.logTemplate("fatal", message, values);
    }
  };
  var metaLogger = LoggerImpl.getLogger(["logtape", "meta"]);
  function isNestedAccess(key) {
    return key.includes(".") || key.includes("[") || key.includes("?.");
  }
  function getOwnProperty(obj, key) {
    if (key === "__proto__" || key === "prototype" || key === "constructor") return void 0;
    if ((typeof obj === "object" || typeof obj === "function") && obj !== null) return Object.prototype.hasOwnProperty.call(obj, key) ? obj[key] : void 0;
    return void 0;
  }
  function parseNextSegment(path, fromIndex) {
    const len = path.length;
    let i = fromIndex;
    if (i >= len) return null;
    let segment;
    if (path[i] === "[") {
      i++;
      if (i >= len) return null;
      if (path[i] === '"' || path[i] === "'") {
        const quote = path[i];
        i++;
        let segmentStr = "";
        while (i < len && path[i] !== quote) if (path[i] === "\\") {
          i++;
          if (i < len) {
            const escapeChar = path[i];
            switch (escapeChar) {
              case "n":
                segmentStr += "\n";
                break;
              case "t":
                segmentStr += "	";
                break;
              case "r":
                segmentStr += "\r";
                break;
              case "b":
                segmentStr += "\b";
                break;
              case "f":
                segmentStr += "\f";
                break;
              case "v":
                segmentStr += "\v";
                break;
              case "0":
                segmentStr += "\0";
                break;
              case "\\":
                segmentStr += "\\";
                break;
              case '"':
                segmentStr += '"';
                break;
              case "'":
                segmentStr += "'";
                break;
              case "u":
                if (i + 4 < len) {
                  const hex = path.slice(i + 1, i + 5);
                  const codePoint = Number.parseInt(hex, 16);
                  if (!Number.isNaN(codePoint)) {
                    segmentStr += String.fromCharCode(codePoint);
                    i += 4;
                  } else segmentStr += escapeChar;
                } else segmentStr += escapeChar;
                break;
              default:
                segmentStr += escapeChar;
            }
            i++;
          }
        } else {
          segmentStr += path[i];
          i++;
        }
        if (i >= len) return null;
        segment = segmentStr;
        i++;
      } else {
        const startIndex = i;
        while (i < len && path[i] !== "]" && path[i] !== "'" && path[i] !== '"') i++;
        if (i >= len) return null;
        const indexStr = path.slice(startIndex, i);
        if (indexStr.length === 0) return null;
        const indexNum = Number(indexStr);
        segment = Number.isNaN(indexNum) ? indexStr : indexNum;
      }
      while (i < len && path[i] !== "]") i++;
      if (i < len) i++;
    } else {
      const startIndex = i;
      while (i < len && path[i] !== "." && path[i] !== "[" && path[i] !== "?" && path[i] !== "]") i++;
      segment = path.slice(startIndex, i);
      if (segment.length === 0) return null;
    }
    if (i < len && path[i] === ".") i++;
    return {
      segment,
      nextIndex: i
    };
  }
  function accessProperty(obj, segment) {
    if (typeof segment === "string") return getOwnProperty(obj, segment);
    if (Array.isArray(obj) && segment >= 0 && segment < obj.length) return obj[segment];
    return void 0;
  }
  function resolvePropertyPath(obj, path) {
    if (obj == null) return void 0;
    if (path.length === 0 || path.endsWith(".")) return void 0;
    let current = obj;
    let i = 0;
    const len = path.length;
    while (i < len) {
      const isOptional = path.slice(i, i + 2) === "?.";
      if (isOptional) {
        i += 2;
        if (current == null) return void 0;
      } else if (current == null) return void 0;
      const result = parseNextSegment(path, i);
      if (result === null) return void 0;
      const { segment, nextIndex } = result;
      i = nextIndex;
      current = accessProperty(current, segment);
      if (current === void 0) return void 0;
    }
    return current;
  }
  function parseMessageTemplate(template, properties) {
    const length = template.length;
    if (length === 0) return [""];
    if (!template.includes("{")) return [template];
    const message = [];
    let startIndex = 0;
    for (let i = 0; i < length; i++) {
      const char = template[i];
      if (char === "{") {
        const nextChar = i + 1 < length ? template[i + 1] : "";
        if (nextChar === "{") {
          i++;
          continue;
        }
        const closeIndex = template.indexOf("}", i + 1);
        if (closeIndex === -1) continue;
        const beforeText = template.slice(startIndex, i);
        message.push(beforeText.replace(/{{/g, "{").replace(/}}/g, "}"));
        const key = template.slice(i + 1, closeIndex);
        let prop;
        const trimmedKey = key.trim();
        if (trimmedKey === "*") prop = key in properties ? properties[key] : "*" in properties ? properties["*"] : properties;
        else {
          if (key !== trimmedKey) prop = key in properties ? properties[key] : properties[trimmedKey];
          else prop = properties[key];
          if (prop === void 0 && isNestedAccess(trimmedKey)) prop = resolvePropertyPath(properties, trimmedKey);
        }
        message.push(prop);
        i = closeIndex;
        startIndex = i + 1;
      } else if (char === "}" && i + 1 < length && template[i + 1] === "}") i++;
    }
    const remainingText = template.slice(startIndex);
    message.push(remainingText.replace(/{{/g, "{").replace(/}}/g, "}"));
    return message;
  }
  function renderMessage(template, values) {
    const args = [];
    for (let i = 0; i < template.length; i++) {
      args.push(template[i]);
      if (i < values.length) args.push(values[i]);
    }
    return args;
  }

  // node_modules/.pnpm/@logtape+logtape@2.2.0/node_modules/@logtape/logtape/dist/context.js
  var categoryPrefixSymbol = /* @__PURE__ */ Symbol.for("logtape.categoryPrefix");
  function getCategoryPrefix() {
    const rootLogger = LoggerImpl.getLogger();
    const store = rootLogger.contextLocalStorage?.getStore();
    if (store == null) return [];
    const prefix = store[categoryPrefixSymbol];
    return Array.isArray(prefix) ? prefix : [];
  }
  function getImplicitContextIfAny() {
    const rootLogger = LoggerImpl.getLogger();
    const store = rootLogger.contextLocalStorage?.getStore();
    if (store == null) return void 0;
    const keys = Object.keys(store);
    if (keys.length < 1) return void 0;
    const result = {};
    for (const key of keys) result[key] = store[key];
    return result;
  }

  // node_modules/.pnpm/@logtape+logtape@2.2.0/node_modules/@logtape/logtape/dist/util.js
  var util_exports = {};
  __export(util_exports, {
    inspect: () => inspect
  });
  function inspect(obj, options) {
    const indent = options?.compact === true ? void 0 : 2;
    return JSON.stringify(obj, null, indent);
  }

  // node_modules/.pnpm/@logtape+logtape@2.2.0/node_modules/@logtape/logtape/dist/formatter.js
  var levelAbbreviations = {
    "trace": "TRC",
    "debug": "DBG",
    "info": "INF",
    "warning": "WRN",
    "error": "ERR",
    "fatal": "FTL"
  };
  var platformInspect = typeof document !== "undefined" || typeof navigator !== "undefined" && navigator.product === "ReactNative" ? (v) => JSON.stringify(v) : "Deno" in globalThis && "inspect" in globalThis.Deno && typeof globalThis.Deno.inspect === "function" ? (v, opts) => globalThis.Deno.inspect(v, {
    strAbbreviateSize: Infinity,
    iterableLimit: Infinity,
    ...opts
  }) : util_exports != null && "inspect" in util_exports && typeof inspect === "function" ? (v, opts) => inspect(v, {
    maxArrayLength: Infinity,
    maxStringLength: Infinity,
    ...opts
  }) : (v) => JSON.stringify(v);
  var inspect2 = (value, options) => String(platformInspect(value, options));
  var utf8Encoder = new TextEncoder();
  function renderMessageParts(msgParts, valueRenderer) {
    const msgLen = msgParts.length;
    if (msgLen === 1) return msgParts[0];
    if (msgLen <= 6) {
      let message = "";
      for (let i = 0; i < msgLen; i++) message += i % 2 === 0 ? msgParts[i] : valueRenderer(msgParts[i]);
      return message;
    }
    const parts = new Array(msgLen);
    for (let i = 0; i < msgLen; i++) parts[i] = i % 2 === 0 ? msgParts[i] : valueRenderer(msgParts[i]);
    return parts.join("");
  }
  function padZero(num) {
    return num < 10 ? `0${num}` : `${num}`;
  }
  function padThree(num) {
    return num < 10 ? `00${num}` : num < 100 ? `0${num}` : `${num}`;
  }
  var fixedOffsetPattern = /^([+-])(0\d|1\d|2[0-3]):([0-5]\d)$/;
  function formatOffset(minutes, full) {
    const sign = minutes < 0 ? "-" : "+";
    const absolute = Math.abs(minutes);
    const hour = padZero(Math.floor(absolute / 60));
    const minute = padZero(absolute % 60);
    if (!full && minute === "00") return `${sign}${hour}`;
    return `${sign}${hour}:${minute}`;
  }
  function readPartsFromFormatter(formatter, ts) {
    const parts = formatter.formatToParts(new Date(ts));
    let year = "";
    let month = "";
    let day = "";
    let hour = "";
    let minute = "";
    let second = "";
    for (const part of parts) if (part.type === "year") year = part.value;
    else if (part.type === "month") month = part.value;
    else if (part.type === "day") day = part.value;
    else if (part.type === "hour") hour = part.value;
    else if (part.type === "minute") minute = part.value;
    else if (part.type === "second") second = part.value;
    return {
      year,
      month,
      day,
      hour,
      minute,
      second
    };
  }
  function getDateParts(ts, config) {
    const d = new Date(ts);
    const ms = padThree(d.getUTCMilliseconds());
    if (config.kind === "utc") return {
      year: `${d.getUTCFullYear()}`,
      month: padZero(d.getUTCMonth() + 1),
      day: padZero(d.getUTCDate()),
      hour: padZero(d.getUTCHours()),
      minute: padZero(d.getUTCMinutes()),
      second: padZero(d.getUTCSeconds()),
      ms,
      offsetMinutes: 0
    };
    if (config.kind === "local") return {
      year: `${d.getFullYear()}`,
      month: padZero(d.getMonth() + 1),
      day: padZero(d.getDate()),
      hour: padZero(d.getHours()),
      minute: padZero(d.getMinutes()),
      second: padZero(d.getSeconds()),
      ms,
      offsetMinutes: -d.getTimezoneOffset()
    };
    if (config.kind === "offset") {
      const shifted = new Date(ts + config.minutes * 6e4);
      return {
        year: `${shifted.getUTCFullYear()}`,
        month: padZero(shifted.getUTCMonth() + 1),
        day: padZero(shifted.getUTCDate()),
        hour: padZero(shifted.getUTCHours()),
        minute: padZero(shifted.getUTCMinutes()),
        second: padZero(shifted.getUTCSeconds()),
        ms,
        offsetMinutes: config.minutes
      };
    }
    const parts = readPartsFromFormatter(config.formatter, ts);
    const asUtc = Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day), Number(parts.hour), Number(parts.minute), Number(parts.second), d.getUTCMilliseconds());
    const offsetMinutes = Math.round((asUtc - ts) / 6e4);
    return {
      ...parts,
      ms,
      offsetMinutes
    };
  }
  function resolveTimeZone(timeZone) {
    if (typeof timeZone === "undefined") return { kind: "utc" };
    if (timeZone === null) return { kind: "local" };
    const offsetMatch = fixedOffsetPattern.exec(timeZone);
    if (offsetMatch != null) {
      const sign = offsetMatch[1] === "-" ? -1 : 1;
      const hours = Number(offsetMatch[2]);
      const minutes = Number(offsetMatch[3]);
      return {
        kind: "offset",
        minutes: sign * (hours * 60 + minutes)
      };
    }
    if (typeof Intl === "undefined" || typeof Intl.DateTimeFormat !== "function") throw new TypeError(`Invalid timeZone option: ${JSON.stringify(timeZone)}. This environment does not support IANA time zones.`);
    try {
      return {
        kind: "iana",
        formatter: new Intl.DateTimeFormat("en-CA", {
          timeZone,
          hour12: false,
          hourCycle: "h23",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        })
      };
    } catch {
      throw new TypeError(`Invalid timeZone option: ${JSON.stringify(timeZone)}. Expected an IANA time zone name (e.g., "Asia/Seoul") or a fixed UTC offset string (e.g., "+09:00").`);
    }
  }
  function createTimestampFormatter(pattern, timeZone) {
    if (pattern === "none") return () => null;
    if (pattern === "rfc3339" && timeZone.kind === "utc") return (ts) => new Date(ts).toISOString();
    return (ts) => {
      const parts = getDateParts(ts, timeZone);
      const date = `${parts.year}-${parts.month}-${parts.day}`;
      const time = `${parts.hour}:${parts.minute}:${parts.second}.${parts.ms}`;
      const tzLong = formatOffset(parts.offsetMinutes, true);
      const tzShort = formatOffset(parts.offsetMinutes, false);
      if (pattern === "date-time-timezone") return `${date} ${time} ${tzLong}`;
      if (pattern === "date-time-tz") return `${date} ${time} ${tzShort}`;
      if (pattern === "date-time") return `${date} ${time}`;
      if (pattern === "time-timezone") return `${time} ${tzLong}`;
      if (pattern === "time-tz") return `${time} ${tzShort}`;
      if (pattern === "time") return time;
      if (pattern === "date") return date;
      return `${date}T${time}${tzLong}`;
    };
  }
  var levelRenderersCache = {
    ABBR: levelAbbreviations,
    abbr: {
      trace: "trc",
      debug: "dbg",
      info: "inf",
      warning: "wrn",
      error: "err",
      fatal: "ftl"
    },
    FULL: {
      trace: "TRACE",
      debug: "DEBUG",
      info: "INFO",
      warning: "WARNING",
      error: "ERROR",
      fatal: "FATAL"
    },
    full: {
      trace: "trace",
      debug: "debug",
      info: "info",
      warning: "warning",
      error: "error",
      fatal: "fatal"
    },
    L: {
      trace: "T",
      debug: "D",
      info: "I",
      warning: "W",
      error: "E",
      fatal: "F"
    },
    l: {
      trace: "t",
      debug: "d",
      info: "i",
      warning: "w",
      error: "e",
      fatal: "f"
    }
  };
  function getLineEndingValue(lineEnding) {
    return lineEnding === "crlf" ? "\r\n" : "\n";
  }
  function jsonReplacer(_key, value) {
    if (!(value instanceof Error)) return value;
    const serialized = {
      name: value.name,
      message: value.message
    };
    if (typeof value.stack === "string") serialized.stack = value.stack;
    const cause = value.cause;
    if (cause !== void 0) serialized.cause = cause;
    if (typeof AggregateError !== "undefined" && value instanceof AggregateError) serialized.errors = value.errors;
    for (const key of Object.keys(value)) if (!(key in serialized)) serialized[key] = value[key];
    return serialized;
  }
  function renderDefaultJsonLinesMessage(message) {
    const messageLength = message.length;
    if (messageLength === 1) return message[0];
    if (messageLength === 3) return message[0] + JSON.stringify(message[1]) + message[2];
    let rendered = message[0];
    for (let i = 1; i < messageLength; i++) rendered += i & 1 ? JSON.stringify(message[i]) : message[i];
    return rendered;
  }
  function stringifyJsonLinesField(key, value) {
    if (value != null && (typeof value === "object" || typeof value === "function" || typeof value === "bigint")) {
      const toJSON = value.toJSON;
      if (typeof toJSON === "function") value = toJSON.call(value, key);
    }
    return JSON.stringify(jsonReplacer(key, value), jsonReplacer);
  }
  function formatDefaultJsonLinesRecord(record, lineEnding) {
    const level = record.level === "warning" ? "WARN" : record.level.toUpperCase();
    const messageJson = stringifyJsonLinesField("message", renderDefaultJsonLinesMessage(record.message));
    const propertiesJson = stringifyJsonLinesField("properties", record.properties);
    let line = `{"@timestamp":${JSON.stringify(new Date(record.timestamp).toISOString())},"level":${JSON.stringify(level)}`;
    if (messageJson !== void 0) line += `,"message":${messageJson}`;
    line += `,"logger":${JSON.stringify(record.category.join("."))}`;
    if (propertiesJson !== void 0) line += `,"properties":${propertiesJson}`;
    return `${line}}${lineEnding}`;
  }
  function getTextFormatter(options = {}) {
    const timestampRenderer = (() => {
      const tsOption = options.timestamp;
      const timeZone = resolveTimeZone(options.timeZone);
      if (tsOption == null) return createTimestampFormatter("date-time-timezone", timeZone);
      else if (tsOption === "disabled") return createTimestampFormatter("none", timeZone);
      else if (typeof tsOption === "string" && (tsOption === "date-time-timezone" || tsOption === "date-time-tz" || tsOption === "date-time" || tsOption === "time-timezone" || tsOption === "time-tz" || tsOption === "time" || tsOption === "date" || tsOption === "rfc3339" || tsOption === "none")) return createTimestampFormatter(tsOption, timeZone);
      else return tsOption;
    })();
    const categorySeparator = options.category ?? "\xB7";
    const valueRenderer = options.value ? (v) => options.value(v, inspect2) : inspect2;
    const levelRenderer = (() => {
      const levelOption = options.level;
      if (levelOption == null || levelOption === "ABBR") return (level) => levelRenderersCache.ABBR[level];
      else if (levelOption === "abbr") return (level) => levelRenderersCache.abbr[level];
      else if (levelOption === "FULL") return (level) => levelRenderersCache.FULL[level];
      else if (levelOption === "full") return (level) => levelRenderersCache.full[level];
      else if (levelOption === "L") return (level) => levelRenderersCache.L[level];
      else if (levelOption === "l") return (level) => levelRenderersCache.l[level];
      else return levelOption;
    })();
    const lineEnding = getLineEndingValue(options.lineEnding);
    const formatter = options.format ?? (({ timestamp, level, category, message }) => `${timestamp ? `${timestamp} ` : ""}[${level}] ${category}: ${message}`);
    return (record) => {
      const message = renderMessageParts(record.message, valueRenderer);
      const timestamp = timestampRenderer(record.timestamp);
      const level = levelRenderer(record.level);
      const category = typeof categorySeparator === "function" ? categorySeparator(record.category) : record.category.join(categorySeparator);
      const values = {
        timestamp,
        level,
        category,
        message,
        record
      };
      return `${formatter(values)}${lineEnding}`;
    };
  }
  var defaultTextFormatter = getTextFormatter();
  var RESET = "\x1B[0m";
  var ansiColors = {
    black: "\x1B[30m",
    red: "\x1B[31m",
    green: "\x1B[32m",
    yellow: "\x1B[33m",
    blue: "\x1B[34m",
    magenta: "\x1B[35m",
    cyan: "\x1B[36m",
    white: "\x1B[37m"
  };
  var ansiStyles = {
    bold: "\x1B[1m",
    dim: "\x1B[2m",
    italic: "\x1B[3m",
    underline: "\x1B[4m",
    strikethrough: "\x1B[9m"
  };
  var defaultLevelColors = {
    trace: null,
    debug: "blue",
    info: "green",
    warning: "yellow",
    error: "red",
    fatal: "magenta"
  };
  function getAnsiColorFormatter(options = {}) {
    const format = options.format;
    const timestampStyle = typeof options.timestampStyle === "undefined" ? "dim" : options.timestampStyle;
    const timestampColor = options.timestampColor ?? null;
    const timestampPrefix = `${timestampStyle == null ? "" : ansiStyles[timestampStyle]}${timestampColor == null ? "" : ansiColors[timestampColor]}`;
    const timestampSuffix = timestampStyle == null && timestampColor == null ? "" : RESET;
    const levelStyle = typeof options.levelStyle === "undefined" ? "bold" : options.levelStyle;
    const levelColors = options.levelColors ?? defaultLevelColors;
    const categoryStyle = typeof options.categoryStyle === "undefined" ? "dim" : options.categoryStyle;
    const categoryColor = options.categoryColor ?? null;
    const categoryPrefix = `${categoryStyle == null ? "" : ansiStyles[categoryStyle]}${categoryColor == null ? "" : ansiColors[categoryColor]}`;
    const categorySuffix = categoryStyle == null && categoryColor == null ? "" : RESET;
    return getTextFormatter({
      timestamp: "date-time-tz",
      value(value, fallbackInspect) {
        return fallbackInspect(value, { colors: true });
      },
      ...options,
      format({ timestamp, level, category, message, record }) {
        const levelColor = levelColors[record.level];
        timestamp = timestamp == null ? null : `${timestampPrefix}${timestamp}${timestampSuffix}`;
        level = `${levelStyle == null ? "" : ansiStyles[levelStyle]}${levelColor == null ? "" : ansiColors[levelColor]}${level}${levelStyle == null && levelColor == null ? "" : RESET}`;
        return format == null ? `${timestamp == null ? "" : `${timestamp} `}${level} ${categoryPrefix}${category}:${categorySuffix} ${message}` : format({
          timestamp,
          level,
          category: `${categoryPrefix}${category}${categorySuffix}`,
          message,
          record
        });
      }
    });
  }
  var ansiColorFormatter = getAnsiColorFormatter();
  function getJsonLinesFormatter(options = {}) {
    const lineEnding = getLineEndingValue(options.lineEnding);
    if (!options.categorySeparator && !options.message && !options.properties) return (record) => formatDefaultJsonLinesRecord(record, lineEnding);
    const isTemplateMessage = options.message === "template";
    const propertiesOption = options.properties ?? "nest:properties";
    let joinCategory;
    if (typeof options.categorySeparator === "function") joinCategory = options.categorySeparator;
    else {
      const separator = options.categorySeparator ?? ".";
      joinCategory = (category) => category.join(separator);
    }
    let getProperties;
    if (propertiesOption === "flatten") getProperties = (properties) => properties;
    else if (propertiesOption.startsWith("prepend:")) {
      const prefix = propertiesOption.substring(8);
      if (prefix === "") throw new TypeError(`Invalid properties option: ${JSON.stringify(propertiesOption)}. It must be of the form "prepend:<prefix>" where <prefix> is a non-empty string.`);
      getProperties = (properties) => {
        const result = {};
        for (const key in properties) result[`${prefix}${key}`] = properties[key];
        return result;
      };
    } else if (propertiesOption.startsWith("nest:")) {
      const key = propertiesOption.substring(5);
      getProperties = (properties) => ({ [key]: properties });
    } else throw new TypeError(`Invalid properties option: ${JSON.stringify(propertiesOption)}. It must be "flatten", "prepend:<prefix>", or "nest:<key>".`);
    let getMessage;
    if (isTemplateMessage) getMessage = (record) => {
      if (typeof record.rawMessage === "string") return record.rawMessage;
      let msg = "";
      for (let i = 0; i < record.rawMessage.length; i++) {
        if (i > 0) msg += "{}";
        msg += record.rawMessage[i];
      }
      return msg;
    };
    else getMessage = (record) => {
      const msgLen = record.message.length;
      if (msgLen === 1) return record.message[0];
      let msg = "";
      for (let i = 0; i < msgLen; i++) msg += i % 2 < 1 ? record.message[i] : JSON.stringify(record.message[i]);
      return msg;
    };
    return (record) => {
      return JSON.stringify({
        "@timestamp": new Date(record.timestamp).toISOString(),
        level: record.level === "warning" ? "WARN" : record.level.toUpperCase(),
        message: getMessage(record),
        logger: joinCategory(record.category),
        ...getProperties(record.properties)
      }, jsonReplacer) + lineEnding;
    };
  }
  var jsonLinesFormatter = getJsonLinesFormatter();
  function renderStructuredMessage(record, template) {
    if (template) {
      if (typeof record.rawMessage === "string") return record.rawMessage;
      return record.rawMessage.join("{}");
    }
    return renderMessageParts(record.message, stringifyLogfmtValue);
  }
  function filterLogfmtKey(key) {
    if (key === "") return null;
    let needsEscape = false;
    for (const char of key) {
      const code = char.codePointAt(0);
      if (shouldEscapeLogfmtKeyChar(char, code)) {
        needsEscape = true;
        break;
      }
    }
    if (!needsEscape) return key;
    let result = "";
    for (const char of key) {
      const code = char.codePointAt(0);
      if (shouldEscapeLogfmtKeyChar(char, code)) result += encodeLogfmtKeyChar(char);
      else result += char;
    }
    return result;
  }
  function shouldEscapeLogfmtKeyChar(char, code) {
    return code <= 32 || code === 127 || code === 65533 || char === "=" || char === '"' || char === "%";
  }
  function encodeLogfmtKeyChar(char) {
    let result = "";
    for (const byte of utf8Encoder.encode(char)) result += `%${byte.toString(16).toUpperCase().padStart(2, "0")}`;
    return result;
  }
  function stringifyLogfmtValue(value) {
    if (typeof value === "string") return value;
    if (value === null) return "null";
    if (typeof value === "number" || typeof value === "boolean" || typeof value === "bigint" || typeof value === "undefined" || typeof value === "symbol" || typeof value === "function") return String(value);
    try {
      const json = JSON.stringify(value, jsonReplacer);
      if (typeof json === "string") return unwrapJsonStringLiteral(json);
    } catch {
    }
    return inspect2(value, { colors: false });
  }
  function unwrapJsonStringLiteral(json) {
    if (json.startsWith('"') && json.endsWith('"')) return JSON.parse(json);
    return json;
  }
  function quoteLogfmtValue(value, isString) {
    let needsQuote = value === "" || isString && shouldQuoteStringLiteral(value);
    for (const char of value) {
      const code = char.codePointAt(0);
      if (shouldQuoteLogfmtValueChar(char, code)) {
        needsQuote = true;
        break;
      }
    }
    if (!needsQuote) return value;
    let quoted = "";
    for (const char of value) {
      const code = char.codePointAt(0);
      quoted += escapeLogfmtValueChar(char, code);
    }
    return `"${quoted}"`;
  }
  function shouldQuoteStringLiteral(value) {
    return value === "null" || value === "undefined" || value === "true" || value === "false";
  }
  function shouldQuoteLogfmtValueChar(char, code) {
    return code <= 32 || code === 127 || code === 65533 || char === "=" || char === '"' || char === "\\";
  }
  function escapeLogfmtValueChar(char, code) {
    switch (char) {
      case "	":
        return "\\t";
      case "\n":
        return "\\n";
      case "\r":
        return "\\r";
      case '"':
        return '\\"';
      case "\\":
        return "\\\\";
      default:
        return code <= 31 || code === 127 ? `\\u${code.toString(16).padStart(4, "0")}` : char;
    }
  }
  function formatLogfmtValue(value) {
    const stringified = stringifyLogfmtValue(value);
    return quoteLogfmtValue(stringified, typeof value === "string");
  }
  function pushLogfmtPair(pairs, key, value) {
    const filteredKey = filterLogfmtKey(key);
    if (filteredKey == null) return;
    pairs.push(`${filteredKey}=${formatLogfmtValue(value)}`);
  }
  function getLogfmtFormatter(options = {}) {
    const prependPrefix = "prepend:";
    const lineEnding = getLineEndingValue(options.lineEnding);
    const timestampRenderer = createTimestampFormatter("rfc3339", resolveTimeZone(options.timeZone));
    const isTemplateMessage = options.message === "template";
    const propertiesOption = options.properties ?? "flatten";
    let joinCategory;
    if (typeof options.categorySeparator === "function") joinCategory = options.categorySeparator;
    else {
      const separator = options.categorySeparator ?? ".";
      joinCategory = (category) => category.join(separator);
    }
    let propertyPrefix = "";
    if (propertiesOption === "flatten") propertyPrefix = "";
    else if (propertiesOption.startsWith(prependPrefix)) {
      propertyPrefix = propertiesOption.substring(prependPrefix.length);
      if (propertyPrefix === "") throw new TypeError("Invalid properties option: " + JSON.stringify(propertiesOption) + '. It must be of the form "prepend:<prefix>" where <prefix> is a non-empty string.');
    } else throw new TypeError(`Invalid properties option: ${JSON.stringify(propertiesOption)}. It must be "flatten" or "prepend:<prefix>".`);
    return (record) => {
      const pairs = [];
      pushLogfmtPair(pairs, "time", timestampRenderer(record.timestamp));
      pushLogfmtPair(pairs, "level", record.level);
      pushLogfmtPair(pairs, "logger", joinCategory(record.category));
      pushLogfmtPair(pairs, "msg", renderStructuredMessage(record, isTemplateMessage));
      for (const key in record.properties) if (Object.prototype.hasOwnProperty.call(record.properties, key)) pushLogfmtPair(pairs, `${propertyPrefix}${key}`, record.properties[key]);
      return `${pairs.join(" ")}${lineEnding}`;
    };
  }
  var logfmtFormatter = getLogfmtFormatter();
  var logLevelStyles = {
    "trace": "background-color: gray; color: white;",
    "debug": "background-color: gray; color: white;",
    "info": "background-color: white; color: black;",
    "warning": "background-color: orange; color: black;",
    "error": "background-color: red; color: white;",
    "fatal": "background-color: maroon; color: white;"
  };
  function defaultConsoleFormatter(record) {
    let msg = "";
    const values = [];
    for (let i = 0; i < record.message.length; i++) if (i % 2 === 0) msg += record.message[i];
    else {
      msg += "%o";
      values.push(record.message[i]);
    }
    const date = new Date(record.timestamp);
    const time = `${date.getUTCHours().toString().padStart(2, "0")}:${date.getUTCMinutes().toString().padStart(2, "0")}:${date.getUTCSeconds().toString().padStart(2, "0")}.${date.getUTCMilliseconds().toString().padStart(3, "0")}`;
    return [
      `%c${time} %c${levelAbbreviations[record.level]}%c %c${record.category.join("\xB7")} %c${msg}`,
      "color: gray;",
      logLevelStyles[record.level],
      "background-color: default;",
      "color: gray;",
      "color: default;",
      ...values
    ];
  }

  // node_modules/.pnpm/@logtape+logtape@2.2.0/node_modules/@logtape/logtape/dist/sink.js
  function getConsoleSink(options = {}) {
    const formatter = options.formatter ?? defaultConsoleFormatter;
    const levelMap = {
      trace: "debug",
      debug: "debug",
      info: "info",
      warning: "warn",
      error: "error",
      fatal: "error",
      ...options.levelMap ?? {}
    };
    const console2 = options.console ?? globalThis.console;
    const baseSink = (record) => {
      const args = formatter(record);
      const method = levelMap[record.level];
      if (method === void 0) throw new TypeError(`Invalid log level: ${record.level}.`);
      if (typeof args === "string") {
        const msg = args.replace(/\r?\n$/, "");
        console2[method](msg);
      } else console2[method](...args);
    };
    if (!options.nonBlocking) return baseSink;
    const nonBlockingConfig = options.nonBlocking === true ? {} : options.nonBlocking;
    const bufferSize = nonBlockingConfig.bufferSize ?? 100;
    const flushInterval = nonBlockingConfig.flushInterval ?? 100;
    const buffer = [];
    let flushTimer = null;
    let scheduledFlushTimer = null;
    let disposed = false;
    let flushScheduled = false;
    const maxBufferSize = bufferSize * 2;
    function flush() {
      if (buffer.length === 0) return;
      const records = buffer.splice(0);
      for (const record of records) try {
        baseSink(record);
      } catch {
      }
    }
    function scheduleFlush() {
      if (flushScheduled) return;
      flushScheduled = true;
      scheduledFlushTimer = setTimeout(() => {
        scheduledFlushTimer = null;
        flushScheduled = false;
        flush();
      }, 0);
    }
    function startFlushTimer() {
      if (flushTimer !== null || disposed) return;
      flushTimer = setInterval(() => {
        flush();
      }, flushInterval);
    }
    const nonBlockingSink = (record) => {
      if (disposed) return;
      if (buffer.length >= maxBufferSize) buffer.shift();
      buffer.push(record);
      if (buffer.length >= bufferSize) scheduleFlush();
      else if (flushTimer === null) startFlushTimer();
    };
    nonBlockingSink[Symbol.dispose] = () => {
      disposed = true;
      if (flushTimer !== null) {
        clearInterval(flushTimer);
        flushTimer = null;
      }
      if (scheduledFlushTimer !== null) {
        clearTimeout(scheduledFlushTimer);
        scheduledFlushTimer = null;
        flushScheduled = false;
      }
      flush();
    };
    return nonBlockingSink;
  }

  // node_modules/.pnpm/@logtape+logtape@2.2.0/node_modules/@logtape/logtape/dist/config.js
  var currentConfig = null;
  var strongRefs = /* @__PURE__ */ new Set();
  var filterDisposables = /* @__PURE__ */ new Set();
  var sinkDisposables = /* @__PURE__ */ new Set();
  var asyncFilterDisposables = /* @__PURE__ */ new Set();
  var asyncSinkDisposables = /* @__PURE__ */ new Set();
  function isLoggerConfigMeta(cfg) {
    const category = Array.isArray(cfg.category) ? cfg.category : [cfg.category];
    return category.length === 0 || category.length === 1 && category[0] === "logtape" || category.length === 2 && category[0] === "logtape" && category[1] === "meta";
  }
  function registerDisposeHook(allowAsync) {
    const handler = allowAsync ? dispose : disposeSync;
    if (typeof globalThis.EdgeRuntime !== "string" && "process" in globalThis && !("Deno" in globalThis)) {
      const proc = globalThis.process;
      const onMethod = proc?.["on"];
      if (typeof onMethod === "function") {
        onMethod.call(proc, "exit", handler);
        return;
      }
    }
    const addEventListenerMethod = globalThis.addEventListener;
    if (typeof addEventListenerMethod !== "function") return;
    if ("Deno" in globalThis) addEventListenerMethod.call(globalThis, "unload", handler);
    else addEventListenerMethod.call(globalThis, "pagehide", handler);
  }
  function configureSync(config) {
    if (currentConfig != null && !config.reset) throw new ConfigError("Already configured; if you want to reset, turn on the reset flag.");
    if (asyncFilterDisposables.size > 0 || asyncSinkDisposables.size > 0) throw new ConfigError("Previously configured async disposables are still active. Use configure() instead or explicitly dispose them using dispose().");
    resetSync();
    try {
      configureInternal(config, false);
    } catch (e) {
      if (e instanceof ConfigError) resetSync();
      throw e;
    }
  }
  function configureInternal(config, allowAsync) {
    currentConfig = config;
    let metaConfigured = false;
    const configuredCategories = /* @__PURE__ */ new Set();
    for (const cfg of config.loggers) {
      if (isLoggerConfigMeta(cfg)) metaConfigured = true;
      const categoryKey = Array.isArray(cfg.category) ? JSON.stringify(cfg.category) : JSON.stringify([cfg.category]);
      if (configuredCategories.has(categoryKey)) throw new ConfigError(`Duplicate logger configuration for category: ${categoryKey}. Each category can only be configured once.`);
      configuredCategories.add(categoryKey);
      const logger = LoggerImpl.getLogger(cfg.category);
      for (const sinkId of cfg.sinks ?? []) {
        const sink = config.sinks[sinkId];
        if (!sink) throw new ConfigError(`Sink not found: ${sinkId}.`);
        logger.sinks.push(sink);
      }
      logger.parentSinks = cfg.parentSinks ?? "inherit";
      if (cfg.lowestLevel !== void 0) logger.lowestLevel = cfg.lowestLevel;
      for (const filterId of cfg.filters ?? []) {
        const filter = config.filters?.[filterId];
        if (filter === void 0) throw new ConfigError(`Filter not found: ${filterId}.`);
        logger.filters.push(toFilter(filter));
      }
      strongRefs.add(logger);
    }
    LoggerImpl.getLogger().contextLocalStorage = config.contextLocalStorage;
    for (const sink of Object.values(config.sinks)) {
      if (Symbol.asyncDispose in sink) if (allowAsync) asyncSinkDisposables.add(sink);
      else throw new ConfigError("Async disposables cannot be used with configureSync().");
      if (Symbol.dispose in sink) sinkDisposables.add(sink);
    }
    for (const filter of Object.values(config.filters ?? {})) {
      if (filter == null || typeof filter === "string") continue;
      if (Symbol.asyncDispose in filter) {
        if (allowAsync) asyncFilterDisposables.add(filter);
        else throw new ConfigError("Async disposables cannot be used with configureSync().");
        asyncSinkDisposables.delete(filter);
      }
      if (Symbol.dispose in filter) {
        filterDisposables.add(filter);
        sinkDisposables.delete(filter);
      }
    }
    registerDisposeHook(allowAsync);
    const meta = LoggerImpl.getLogger(["logtape", "meta"]);
    if (!metaConfigured) meta.sinks.push(getConsoleSink());
    meta.info("LogTape loggers are configured.  Note that LogTape itself uses the meta logger, which has category {metaLoggerCategory}.  The meta logger is used to log internal diagnostics such as sink exceptions.  It's recommended to configure the meta logger with a separate sink so that you can easily notice if logging itself fails or is misconfigured.  To turn off this message, configure the meta logger with higher log levels than {dismissLevel}.  See also <https://logtape.org/manual/categories#meta-logger>.", {
      metaLoggerCategory: ["logtape", "meta"],
      dismissLevel: "info"
    });
  }
  function resetSync() {
    disposeSync();
    resetInternal();
  }
  function resetInternal() {
    const rootLogger = LoggerImpl.getLogger([]);
    rootLogger.resetDescendants();
    delete rootLogger.contextLocalStorage;
    strongRefs.clear();
    currentConfig = null;
  }
  async function dispose() {
    const errors = [];
    try {
      disposeSyncFilters();
    } catch (error) {
      errors.push(error);
    }
    try {
      await disposeAsyncFilters();
    } catch (error) {
      errors.push(error);
    }
    try {
      disposeSyncSinks();
    } catch (error) {
      errors.push(error);
    }
    try {
      await disposeAsyncSinks();
    } catch (error) {
      errors.push(error);
    }
    throwDisposeErrors(errors);
  }
  function disposeSync() {
    const errors = [];
    try {
      disposeSyncFilters();
    } catch (error) {
      errors.push(error);
    }
    try {
      disposeSyncSinks();
    } catch (error) {
      errors.push(error);
    }
    throwDisposeErrors(errors);
  }
  function disposeSyncFilters() {
    disposeSyncDisposables(filterDisposables);
  }
  function disposeSyncSinks() {
    disposeSyncDisposables(sinkDisposables);
  }
  function disposeSyncDisposables(disposables) {
    const errors = [];
    try {
      for (const disposable of disposables) try {
        disposable[Symbol.dispose]();
      } catch (error) {
        errors.push(error);
      } finally {
        disposables.delete(disposable);
      }
    } finally {
      disposables.clear();
    }
    throwDisposeErrors(errors);
  }
  async function disposeAsyncFilters() {
    await disposeAsyncDisposables(asyncFilterDisposables);
  }
  async function disposeAsyncSinks() {
    await disposeAsyncDisposables(asyncSinkDisposables);
  }
  async function disposeAsyncDisposables(disposables) {
    const promises = [];
    try {
      for (const disposable of disposables) try {
        promises.push(Promise.resolve(disposable[Symbol.asyncDispose]()));
      } catch (error) {
        promises.push(Promise.reject(error));
      } finally {
        disposables.delete(disposable);
      }
    } finally {
      disposables.clear();
    }
    await settleDisposePromises(promises);
  }
  async function settleDisposePromises(promises) {
    const results = await Promise.allSettled(promises);
    throwDisposeErrors(results.filter((result) => result.status === "rejected").map((result) => result.reason));
  }
  function throwDisposeErrors(errors) {
    if (errors.length < 1) return;
    if (errors.length === 1) throw errors[0];
    throw new AggregateError(errors, "Multiple errors occurred while disposing LogTape resources.");
  }
  var ConfigError = class extends Error {
    /**
    * Constructs a new configuration error.
    * @param message The error message.
    */
    constructor(message) {
      super(message);
      this.name = "ConfigError";
    }
  };

  // app/database.ts
  var MediaDatabaseDo = class {
    transaction;
    objectStore;
    logger;
    constructor(db, mainLogger) {
      this.logger = mainLogger;
      this.transaction = db.transaction("media", "readwrite");
      this.objectStore = this.transaction.objectStore("media");
    }
    /**
     * Adds a new Media entry to database. It's usually more useful to get the new UUID back, so this is the return value instead of the IDBRequest.
     * @param blob Binary Data
     * @param other.collection Collection ID
     * @param other.id Media ID (optional)
     * @returns UUIDTime of result
     */
    add(blob, other) {
      this.logger.debug("Adding Media {*}", { collection: other.collection, id: other.id });
      return new Promise((resolve, reject) => {
        const id = other.id ?? uuidtime();
        const req = this.objectStore.add({
          blob,
          collection: other.collection,
          id
        });
        req.onsuccess = () => {
          resolve(id);
          updateStorageInfo();
        };
        req.onerror = (ev) => {
          reject(ev);
        };
      });
    }
    /**
     * Edit an ID. Requires collection and Blob specified, as it overwrites the entry.
     * @param id 
     * @param other 
     */
    edit(id, other) {
      this.logger.debug("Editing Media {*}", { collection: other.collection, id });
      const req = this.objectStore.put({
        blob: other.blob,
        collection: other.collection,
        id
      });
      req.addEventListener("success", () => {
        updateStorageInfo();
      });
      return req;
    }
    /**
     * The same as the normal `edit` function, but without needing to specify the collection ID or a new blob. It still allows it to be specified, just to provide an easier implementation.
     * @param blob 
     * @param other 
     * @returns 
     */
    async editPartially(id, other) {
      this.logger.debug("Editing Media (partially) {*}", { collection: other.collection, id, editsBlob: !!other.blob });
      if (!other.collection || !other.blob) {
        const entry = new Promise((resolve, reject) => {
          const req2 = this.getSingle(id);
          req2.onsuccess = () => {
            resolve(req2.result);
          };
          req2.onerror = () => {
            reject(new Error("Unable to get collection while editing object. Is the ID valid?", { cause: id }));
          };
        });
        !other.collection ? other.collection = (await entry).collection : null;
        !other.blob ? other.blob = (await entry).blob : null;
      }
      const req = this.objectStore.put({
        blob: other.blob,
        collection: other.collection,
        id
      });
      req.addEventListener("success", () => {
        updateStorageInfo();
      });
      return req;
    }
    /**
     * Get Media by ID
     * @param id Media ID
     * @returns 
     */
    getSingle(id) {
      return this.objectStore.get(id);
    }
    /**
     * Get collection by ID
     * @param id Collection ID
     * @returns 
     */
    getCollection(id) {
      return this.objectStore.index("collection").getAll(id);
    }
    /**
     * Delete Media by ID
     * @param id Media ID
     * @returns 
     */
    deleteSingle(id) {
      this.logger.debug("Deleting Media {id}", { id });
      const req = this.objectStore.delete(id);
      req.addEventListener("success", () => {
        updateStorageInfo();
      });
      return req;
    }
    /**
     * Delete Collection by ID
     * @param id Collection ID
     * @returns 
     */
    deleteCollection(id) {
      this.logger.debug("Deleting Collection {id}", { id });
      return new Promise((resolve, reject) => {
        const keysReq = this.objectStore.index("collection").openKeyCursor(id);
        keysReq.onsuccess = () => {
          const cursor = keysReq.result;
          if (cursor) {
            this.objectStore.delete(cursor.primaryKey);
            cursor.continue();
          } else {
            resolve();
            updateStorageInfo();
          }
        };
        keysReq.onerror = (ev) => {
          reject(new Error("Opening cursor for collection deletion failed.", { cause: ev }));
        };
      });
    }
    /**
     * Delete everything in the Database
     * @returns 
     */
    clear() {
      this.logger.debug("Deleting Media Table");
      const req = this.objectStore.clear();
      req.addEventListener("success", () => {
        updateStorageInfo();
      });
      return req;
    }
    /**
     * Dump the database
     */
    dump() {
      return this.objectStore.getAll();
    }
  };
  var MediaDatabase = class _MediaDatabase {
    db;
    logger;
    // protected transaction: IDBTransaction;
    constructor(preparedClassVariables) {
      this.db = preparedClassVariables.db;
      this.logger = getLogger("MediaDatabase");
    }
    /**
     * Functions for creating Tables. Automatically deletes the table if it already exists, unless specified otherwise. If specified to not delete no matter what, expect errors to be thrown.
     * 
     * **WARNING: DO NOT USE THIS TO DELETE THE CONTENTS!** Use `objectStore.clear()` instead. It avoids recreating the table.
     */
    static tableInit = {
      media: (db, removeIfExists = true) => {
        if (db.objectStoreNames.contains("media") && removeIfExists) db.deleteObjectStore("media");
        const table2 = db.createObjectStore("media", { keyPath: "id", autoIncrement: false });
        table2.createIndex("collection", "collection", { unique: false });
        table2.createIndex("blob", "blob", { unique: false });
      }
    };
    /**
     * Does all the async stuff before the database is really available. Also sets up the Database with the needed tables.
     */
    static async init() {
      const preparedClassVariables = {};
      const finishedPrep = new Promise((resolve, reject) => {
        const dbreq = indexedDB.open("media", 1);
        dbreq.onsuccess = () => {
          preparedClassVariables.db = dbreq.result;
          preparedClassVariables.transaction = preparedClassVariables.db.transaction("media", "readwrite");
          resolve();
        };
        dbreq.onupgradeneeded = () => {
          const db = dbreq.result;
          _MediaDatabase.tableInit.media(db);
        };
        dbreq.onerror = (reason) => {
          reject(reason);
        };
      });
      finishedPrep.catch((reason) => {
        throw new Error("Something went wrong while preparing the init variables.", { cause: reason });
      });
      await finishedPrep;
      if (
        // ensure variables are defined
        preparedClassVariables.db !== void 0 && preparedClassVariables.transaction !== void 0
      ) {
        return new _MediaDatabase(preparedClassVariables);
      } else {
        throw new Error("Init failed: Some variables were undefined during creation. Something went terribly wrong.", { cause: preparedClassVariables });
      }
    }
    /**
     * Do actions in the database. Do not do asynchronous tasks inside, as the Transaction may be invalid by the time they complete. 
     * @param func Function that receives a MediaDatabaseDo as its only parameter. This is run within the database.
     * @returns Return value is the same as the `func`s return value 
     */
    do(func) {
      return func(new MediaDatabaseDo(this.db, this.logger));
    }
  };
  var mediadb = MediaDatabase.init();
  var MediaCollectionMediaEvent = class extends Event {
    constructor(type, target) {
      super(type, { bubbles: false, cancelable: false, composed: false });
      this.affected = target;
    }
    affected;
  };
  var MediaCollectionEvent = class extends Event {
    constructor(type, target) {
      super(type, { bubbles: false, cancelable: false, composed: false });
      this.id = target.id;
      this.collection = target.collection;
      this.newName = target.newName;
      this.alreadyBroadcast = target.alreadyBroadcast ?? false;
    }
    id;
    collection;
    newName;
    alreadyBroadcast;
  };
  var MediaCollectionLogger = getLogger(["MediaCollection"]);
  var temporaryCollectionsCache = {};
  var MediaCollection = class _MediaCollection {
    static metadataPrefix = "collectionMetadata_";
    static mediaOrderPrefix = "mediaOrder_";
    static boardcastPrefix = "mediaCollectionUpdates_";
    /**
     * Load an existing collection from the Database or Cache
     * @param id Collection ID
     * @returns 
     */
    static async load(id) {
      if (temporaryCollectionsCache[id]) return temporaryCollectionsCache[id];
      const collectionPromise = (await mediadb).do(async (actions) => new Promise((resolve, reject) => {
        const req = actions.getCollection(id);
        req.onsuccess = () => {
          resolve(req.result);
        };
        req.onerror = () => {
          reject(new Error("Failed getting collection"));
        };
      }));
      const collection = await collectionPromise;
      const blobs = collection.reduce((prev, current) => {
        prev[current.id] = current.blob;
        return prev;
      }, {});
      const knownBlobIds = Object.keys(blobs);
      const order = JSON.parse(localStorage.getItem(_MediaCollection.mediaOrderPrefix + id) ?? "[]").filter((itemId) => {
        if (knownBlobIds.includes(itemId)) {
          return true;
        } else {
          console.warn(`MediaCollection: ${itemId} went missing in DB of collection ${id}! Discarding to avoid unexpected issues.`);
          return false;
        }
      });
      const knownBlobIdsSet = new Set(knownBlobIds);
      const orderSet = new Set(order);
      const unassignedBlobs = knownBlobIdsSet.difference(orderSet);
      if (unassignedBlobs.size > 0) {
        order.push(...unassignedBlobs);
        Array.from(unassignedBlobs).map((v) => console.warn(`MediaCollection: Found ${v} in collection ${id}, but it was not in order. Adding it to the order. lost+found.`));
      }
      const collectionMetadata = JSON.parse(localStorage.getItem(_MediaCollection.metadataPrefix + id) ?? "null") ?? {
        name: "Unnamed Collection " + id
      };
      return new this({
        order,
        blobs,
        temporary: false,
        id,
        metadata: collectionMetadata
      });
    }
    /**
     * Create a brand new Collection with no contents
     * @param type 
     * @returns 
     */
    static async create(type) {
      if (type === "temporary") {
        const id = uuidtime();
        const result = new this({
          order: [],
          id,
          temporary: true,
          blobs: {},
          metadata: {
            name: "Temporary Collection " + uuid(6)
          }
        });
        temporaryCollectionsCache[id] = result;
        window.dispatchEvent(new MediaCollectionEvent("collectionadded", { id }));
        return result;
      } else if (type === "database") {
        const id = uuidtime();
        const result = new this({
          order: [],
          id,
          temporary: false,
          blobs: {},
          metadata: {
            name: "Unnamed Collection " + id
          }
        });
        window.dispatchEvent(new MediaCollectionEvent("collectionadded", { id }));
        return result;
      } else {
        throw new Error("Invalid Type", { cause: type });
      }
    }
    /** Order of blobs, based on ID. Please Read Only. Can be modified by talking to this Collection directly, which is preferred, as it takes care of the saving process. */
    order;
    /** ID of collection. Will be changed to `null` after wipe to effectively disable any useful saving functionality. */
    id;
    /** If the collection is temporary. If true, saving will be disabled. */
    temporary;
    /** Name of Collection. User defined. */
    name;
    /** Blobs */
    blobs;
    /**
     * Events fired when something happens
     */
    events = new EventTarget();
    /** If this collection was wiped */
    wiped = false;
    /** Broadcast Channel used for duplicating changes across tabs. Does the exact same things as the events. */
    broadcast;
    logger;
    constructor(preparedVars) {
      const orderSet = new Set(preparedVars.order);
      const blobsIdSet = new Set(Object.keys(preparedVars.blobs));
      const diff = Array.from(blobsIdSet.difference(orderSet));
      if (diff.length > 0) {
        preparedVars.order.push(...diff);
      }
      this.logger = MediaCollectionLogger.getChild(String(preparedVars.id));
      this.order = preparedVars.order;
      this.blobs = preparedVars.blobs;
      this.name = preparedVars.metadata.name;
      this.id = preparedVars.id;
      this.temporary = preparedVars.temporary;
      this.save();
      this.broadcast = new BroadcastChannel(_MediaCollection.boardcastPrefix + preparedVars.id);
      this.broadcast.addEventListener("message", this.broadcastDealer.bind(this));
      window.dispatchEvent(new MediaCollectionEvent("collectionloaded", { id: this.id, collection: this }));
    }
    /** Appends one or more new Media blobs to the collection — Order dependant */
    async append(...blob) {
      return this.appendWithDetail(blob.map((v) => ({
        blob: v,
        id: uuidtime()
      })));
    }
    /** same as append, but with more detail. Better suited for specific scenarios. */
    async appendWithDetail(entries, options) {
      options = {
        skipDatabase: options?.skipDatabase ?? false,
        dispatchEvent: options?.dispatchEvent ?? true,
        sendBroadcast: options?.sendBroadcast ?? true
      };
      entries = entries.filter((v) => v.blob.type.includes("image") || v.blob.type.includes("video"));
      if (entries.length === 0) return new Promise((resolve) => resolve([]));
      if (this.id && !this.temporary && !options.skipDatabase) {
        const collectionId = this.id;
        const promises = (await mediadb).do((actions) => entries.map((v) => {
          return actions.add(v.blob, { collection: collectionId, id: v.id });
        }));
        await Promise.all(promises);
      }
      entries.forEach((item) => {
        this.blobs[item.id] = item.blob;
      });
      const mediaIds = entries.map((v) => v.id);
      this.order.push(...mediaIds);
      this.save();
      if (options.dispatchEvent) this.events.dispatchEvent(new MediaCollectionMediaEvent("collectionmediaappended", entries));
      if (options.sendBroadcast) this.broadcast.postMessage({
        type: "added",
        target: entries
      });
      return mediaIds;
    }
    /**
     * Delete one or more Media elements depending on ID
     * @param id 
     */
    delete(...id) {
      return this.deleteWithDetail(id);
    }
    /**
     * Delete one or more Media elements depending on ID
     * @param ids 
     */
    async deleteWithDetail(ids, options) {
      options = {
        dispatchEvent: options?.dispatchEvent ?? true,
        sendBroadcast: options?.sendBroadcast ?? true
      };
      for (const thisId of ids) {
        try {
          delete this.blobs[thisId];
        } catch {
          console.warn("Couldn't delte ID", thisId, "from Collection", this.id);
        }
      }
      if (this.id && !this.temporary) {
        const mediadbnow = await mediadb;
        const promises = ids.map((v) => {
          return mediadbnow.do((actions) => {
            return new Promise((resolve, reject) => {
              const req = actions.deleteSingle(v);
              req.addEventListener("success", resolve);
              req.addEventListener("error", reject);
            });
          });
        });
        await Promise.allSettled(promises);
      }
      this.order = this.order.filter((val) => !ids.includes(val));
      this.save();
      if (options.dispatchEvent) this.events.dispatchEvent(new MediaCollectionMediaEvent("collectionmediaremoved", ids.map((v) => ({ id: v }))));
      if (options.sendBroadcast) this.broadcast.postMessage({
        type: "removed",
        target: ids
      });
    }
    /**
     * Delete the entire collection, without loading it
     * @param id ID of collection
     * @param skipDatabase If database deletion should be skipped. The only good reason to do so is if you delete everything anyways and just don't want to deal with localStorage.
     */
    static async wipe(id, skipDatabase = false) {
      if (id) {
        if (!skipDatabase) await (await mediadb).do((actions) => {
          return actions.deleteCollection(id);
        });
        localStorage.removeItem(_MediaCollection.mediaOrderPrefix + id);
        localStorage.removeItem(_MediaCollection.metadataPrefix + id);
      }
      MediaCollectionLogger.debug("Wiped {id}", { id });
      window.dispatchEvent(new MediaCollectionEvent("collectionremoved", { id }));
    }
    /** Delete the entire collection */
    async wipe() {
      if (this.id) {
        await _MediaCollection.wipe(this.id, this.temporary);
      }
      this.wiped = true;
      this.id = null;
      this.blobs = {};
      this.order = [];
      this.logger.debug("Wiped myself");
      this.unload();
    }
    /** Change order */
    reorder(newOrder) {
      return this.reorderWithDetail(newOrder);
    }
    /** Change order */
    reorderWithDetail(newOrder, options) {
      options = {
        dispatchEvent: options?.dispatchEvent ?? true,
        sendBroadcast: options?.sendBroadcast ?? true
      };
      this.order = newOrder;
      this.save();
      if (options.dispatchEvent) this.events.dispatchEvent(new MediaCollectionMediaEvent("collectionmediareordered"));
      if (options.sendBroadcast) this.broadcast.postMessage({
        type: "reordered",
        target: newOrder
      });
      this.logger.debug("Reordered");
    }
    /**
     * Rename collection (note: empty names will be subset with "Unnamed Collection \<ID\>")
     * @param newName 
     */
    rename(newName) {
      this.name = newName;
      if (this.name === "") this.name = "Unnamed Collection " + this.id;
      this.save();
      window.dispatchEvent(new MediaCollectionEvent("collectionrenamed", { id: this.id, newName: this.name }));
    }
    /** Saves some additional Metadata about the collection: Media Order and Metadata (Name) */
    save() {
      if (this.id && !this.temporary) {
        localStorage.setItem(_MediaCollection.mediaOrderPrefix + this.id, JSON.stringify(this.order));
        localStorage.setItem(_MediaCollection.metadataPrefix + this.id, JSON.stringify({ name: this.name }));
        this.logger.debug("Saved");
      } else {
        this.logger.debug("Skipped Save");
      }
    }
    /**
     * Switches collection to temporary collection. Throws Exception if already Temporary.
     * @param deleteDB If the contents should be wiped from disk. Does not throw an error if ID is null.
     */
    switchToTemporary(deleteDB = false) {
      if (this.temporary) throw new Error("Collection already Temporary.");
      this.temporary = true;
      if (deleteDB && this.id) {
        _MediaCollection.wipe(this.id);
      }
    }
    /**
     * Switches collection to database collection. Throws Exception if already Database.
     */
    async switchToDatabase(saveDB = false) {
      if (!this.temporary) throw new Error("Collection already Database.");
      this.temporary = false;
      if (saveDB && this.id) {
        const metadata = _MediaCollection.dumpStorage(this.id);
        let filteredBlobs;
        if (metadata.order) {
          const dbCollection = await (await mediadb).do((actions) => {
            return new Promise((resolve, reject) => {
              const req = actions.getCollection(this.id);
              req.onsuccess = () => {
                resolve(req.result);
              };
              req.onerror = () => {
                reject(new Error("Failed to get collection (while converting TEMP to DB)"));
              };
            });
          });
          const knownIds = dbCollection.map((v) => v.id);
          filteredBlobs = Object.entries(this.blobs).map((v) => {
            if (knownIds.includes(v[0])) return void 0;
            return { id: v[0], blob: v[1], collection: this.id };
          }).filter((v) => v !== void 0);
        } else {
          filteredBlobs = Object.entries(this.blobs).map((v) => {
            return { id: v[0], blob: v[1], collection: this.id };
          }).filter((v) => v !== void 0);
        }
        const promises = (await mediadb).do((actions) => {
          return filteredBlobs.map((v) => {
            return actions.add(v.blob, { collection: v.collection, id: v.id });
          });
        });
        await Promise.all(promises);
        this.save();
      }
    }
    broadcastDealer(e) {
      const data = e.data;
      this.logger.debug("Received Broadcast - {type}", { type: data.type });
      const knownBlobs = Object.keys(this.blobs);
      switch (data.type) {
        case "added":
          const newlyAdded = data.target.filter((v) => !knownBlobs.includes(v.id));
          if (newlyAdded.length > 0) {
            this.appendWithDetail(newlyAdded, { skipDatabase: true, sendBroadcast: false });
          }
          break;
        case "removed":
          const toBeRemoved = data.target.filter((v) => knownBlobs.includes(v));
          if (toBeRemoved.length > 0) {
            this.deleteWithDetail(toBeRemoved, { sendBroadcast: false });
          }
          break;
        case "reordered":
          const doubleCheckOrder = data.target.every((v, i) => v === this.order[i]);
          if (!doubleCheckOrder) {
            this.reorderWithDetail(data.target, { sendBroadcast: false });
          }
          break;
        default:
          break;
      }
    }
    /**
     * Unloads collection.
     */
    unload() {
      this.broadcast.close();
    }
    /**
     * Dump data stored in localStorage
     * @param id 
     */
    static dumpStorage(id) {
      return {
        order: localStorage.getItem(_MediaCollection.mediaOrderPrefix + id),
        metadata: localStorage.getItem(_MediaCollection.metadataPrefix + id)
      };
    }
    /**
     * Get `localStorage` Metadata of a collection, without loading it
     * @param id 
     * @returns 
     */
    static getMetadata(id) {
      return JSON.parse(localStorage.getItem(_MediaCollection.metadataPrefix + id) ?? "{}");
    }
  };
  var MediaCollectionsManager = class _MediaCollectionsManager {
    static collectionsLocalStorageKey = "mediaCollections";
    static collectionIdToUrl(id) {
      const url = new URL(window.location.toString());
      url.searchParams.set("collection", id.toString());
      return url;
    }
    static collectionNoIdToUrl() {
      const url = new URL(window.location.toString());
      url.searchParams.delete("collection");
      return url;
    }
    static pushHistory(updateUrl) {
      window.history.pushState({}, "", updateUrl);
    }
    static getAlphabeticalFirstCollection(list) {
      const metadata = list.reduce((prev, id) => {
        const data = MediaCollection.getMetadata(id);
        return { ...prev, [id]: data.name };
      }, {});
      const sorted = list.toSorted((a, b) => {
        if (!metadata[a] || !metadata[b]) return 0;
        const nameA = metadata[a]?.name?.toLocaleLowerCase();
        const nameB = metadata[b]?.name?.toLocaleLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      return sorted[0];
    }
    /** Collections found in store. Only IDs are stored */
    available;
    /** What collections NOT to save, since they're temporary */
    temporary = [];
    current;
    gallery;
    broadcast;
    logger;
    static async init(gallery, returnPreparedVars = false) {
      const loggerMain = getLogger("MediaCollectionsManager");
      const logger = loggerMain.getChild("Init");
      let available = JSON.parse(localStorage.getItem(_MediaCollectionsManager.collectionsLocalStorageKey) ?? "[]");
      if (!Array.isArray(available)) {
        localStorage.setItem("mediaCollections_LegacyV0_Backup", JSON.stringify(available));
        available = [];
      }
      let updateUrl = null;
      let collectionId;
      let current = void 0;
      if (available.length === 0) {
        collectionId = null;
        logger.debug("No collections available.");
      } else {
        const params = new URLSearchParams(window.location.search);
        const grabbedCollectionId = params.get("collection");
        if (!grabbedCollectionId) {
          collectionId = _MediaCollectionsManager.getAlphabeticalFirstCollection(available);
          updateUrl = _MediaCollectionsManager.collectionIdToUrl(collectionId);
          logger.debug("Collections available. No collection ID provided.");
        } else {
          if (available.includes(grabbedCollectionId)) {
            collectionId = grabbedCollectionId;
            logger.debug("Collections available. Valid Collection ID provided.");
          } else {
            collectionId = _MediaCollectionsManager.getAlphabeticalFirstCollection(available);
            updateUrl = _MediaCollectionsManager.collectionIdToUrl(collectionId);
            logger.debug("Collections available. Invalid Collection ID provided (ignoring).");
          }
        }
      }
      if (!collectionId) {
        current = await MediaCollection.create("database");
        available.push(current.id);
        updateUrl = _MediaCollectionsManager.collectionIdToUrl(current.id);
      } else {
        current = await MediaCollection.load(collectionId);
      }
      if (updateUrl) {
        _MediaCollectionsManager.pushHistory(updateUrl);
      }
      logger.debug("Completed Init", {
        url: updateUrl,
        currentId: collectionId
      });
      gallery.switchCollection(current);
      const preparedVars = { available, current, gallery, logger: loggerMain };
      if (returnPreparedVars) {
        return preparedVars;
      } else {
        return new this(preparedVars);
      }
    }
    constructor(preparedVars) {
      this.logger = preparedVars.logger;
      this.available = preparedVars.available;
      this.current = preparedVars.current;
      this.gallery = preparedVars.gallery;
      this.broadcast = new BroadcastChannel("mediaCollectionsManager");
      this.broadcast.addEventListener("message", this.broadcastDealer.bind(this));
      window.addEventListener("collectionrenamed", (e) => {
        if (e instanceof MediaCollectionEvent && !e.alreadyBroadcast) {
          this.broadcast.postMessage({
            type: "collectionRename",
            target: {
              id: e.id,
              newName: e.newName
            }
          });
        }
      });
    }
    /**
     * Create a new collection, but don't switch to it immediately
     * @param type 
     */
    async newCollection(type) {
      const newCollection = await MediaCollection.create(type);
      if (newCollection.id) {
        this.available.push(newCollection.id);
        if (newCollection.temporary) this.temporary.push(newCollection.id);
        this.save();
      }
      return newCollection;
    }
    /**
     * Switch to a known collection
     * @param idOrMC ID or a MediaCollection
     */
    async switchCollection(idOrMC) {
      this.current.save();
      this.current.unload();
      if (typeof idOrMC === "string") {
        if (!this.available.includes(idOrMC)) throw new Error("ID is not a known collection");
        this.current = await MediaCollection.load(idOrMC);
      } else if (idOrMC instanceof MediaCollection) {
        this.current = idOrMC;
      }
      this.gallery.switchCollection(this.current);
      if (this.current.id) {
        _MediaCollectionsManager.pushHistory(_MediaCollectionsManager.collectionIdToUrl(this.current.id));
      } else {
        _MediaCollectionsManager.pushHistory(_MediaCollectionsManager.collectionNoIdToUrl());
      }
    }
    async deleteCurrentCollection() {
      this.available = this.available.filter((v) => v !== this.current.id);
      await this.current.wipe();
      this.save();
      this.ensureCollectionInGallery();
    }
    async deleteCollection(id) {
      if (this.available.includes(id)) {
        this.available = this.available.filter((v) => v !== id);
        await MediaCollection.wipe(id);
        this.save();
      } else {
        throw new Error("Collection is unknown (existence debatable)", { cause: id });
      }
    }
    ensureCollectionInGallery() {
      if (this.gallery.collection?.wiped === false) return;
      if (this.available[0]) {
        const metadata = this.available.map((id) => ({ id, metadata: MediaCollection.getMetadata(id) }));
        metadata.sort((a, b) => {
          const alow = a.metadata.name.toLocaleLowerCase();
          const blow = b.metadata.name.toLocaleLowerCase();
          if (alow < blow) return -1;
          if (alow > blow) return 1;
          return 0;
        });
        this.switchCollection(metadata[0].id);
      } else {
        this.newCollection("database").then((c) => this.switchCollection(c));
      }
    }
    /**
     * Wipes everything, cleanly.
     * 
     * - Database is fully deleted
     * - Collections each individually delete their localStorage things.
     * - `this.save()` dispatches changes across tabs
     * - re-initializes for the tab where the deletion occured
     */
    async deleteEverything() {
      const localStorageWipes = this.available.map((id) => MediaCollection.wipe(id, true));
      const clearResult = (await mediadb).do((actions) => {
        return actions.clear();
      });
      const clearPromise = new Promise((resolve, reject) => {
        clearResult.onsuccess = resolve;
        clearResult.onerror = reject;
      });
      this.available = [];
      this.save();
      _MediaCollectionsManager.pushHistory(_MediaCollectionsManager.collectionNoIdToUrl());
      await Promise.all([...localStorageWipes, clearPromise]);
      const newThis = await _MediaCollectionsManager.init(this.gallery, true);
      this.logger = newThis.logger;
      this.available = newThis.available;
      this.current = newThis.current;
      this.gallery = newThis.gallery;
    }
    /**
     * Save current states
     */
    save() {
      localStorage.setItem(_MediaCollectionsManager.collectionsLocalStorageKey, JSON.stringify(this.available.filter((id) => !this.temporary.includes(id))));
      this.gallery.collection?.save();
      this.logger.debug("Saved state");
      this.broadcast.postMessage({
        type: "localStorageSave"
      });
      this.logger.info("Saved");
    }
    /**
     * Reloads current states and dispatch events
     */
    reload() {
      const newAvailableNoSet = JSON.parse(localStorage.getItem(_MediaCollectionsManager.collectionsLocalStorageKey) ?? "[]");
      const newAvailable = new Set(newAvailableNoSet);
      const oldAvailable = new Set(this.available.filter((id) => !this.temporary.includes(id)));
      const onlyInOld = Array.from(oldAvailable.difference(newAvailable));
      onlyInOld.forEach((id) => {
        if (this.current.id === id) {
          this.current.id = null;
          this.current.wiped = true;
          this.current.unload();
        }
        MediaCollection.wipe(id, true);
      });
      const onlyInNew = Array.from(newAvailable.difference(oldAvailable));
      onlyInNew.forEach((id) => {
        window.dispatchEvent(new MediaCollectionEvent("collectionadded", {
          id
        }));
      });
      this.available = [...newAvailableNoSet, ...this.temporary];
      this.ensureCollectionInGallery();
      this.logger.info("Reloaded");
    }
    broadcastDealer(e) {
      const data = e.data;
      this.logger.debug("Received Broadcast - {type}", { type: data.type });
      switch (data.type) {
        case "localStorageSave":
          this.reload();
          break;
        case "collectionRename":
          if (this.current.id === data.target.id) {
            this.current.name = data.target.newName;
          }
          window.dispatchEvent(new MediaCollectionEvent("collectionrenamed", {
            id: data.target.id,
            newName: data.target.newName,
            alreadyBroadcast: true
          }));
          break;
        default:
          break;
      }
    }
    /**
     * Dump everything about collections
     */
    async dump() {
      const available = this.available;
      const dataDump = available.map((id) => ({
        id,
        data: MediaCollection.dumpStorage(id)
      })).reduce((prev, c) => ({
        ...prev,
        [c.id]: c.data
      }), {});
      const blobsReq = (await mediadb).do((actions) => actions.dump());
      const blobs = await new Promise((resolve, reject) => {
        blobsReq.onsuccess = () => {
          resolve(blobsReq.result);
        };
        blobsReq.onerror = reject;
      });
      return {
        available,
        collections: dataDump,
        blobs
      };
    }
    async switchCollectionToType(id, type) {
      throw new Error("TODO: Implement.");
    }
  };

  // app/dependant.ts
  var DependantEvent = class extends Event {
    instance;
    codename;
    constructor(type, codename, instance) {
      super(type, { bubbles: false, cancelable: false, composed: false });
      this.instance = instance;
      this.codename = codename;
    }
  };
  var DependantSettledEvent = class extends DependantEvent {
    rejected;
    result;
    constructor(codename, instance, rejected, result) {
      super("dependantsettled", codename, instance);
      this.rejected = rejected;
      this.result = result;
    }
  };
  var DependantAddedEvent = class extends DependantEvent {
    promise;
    codename;
    constructor(codename, instance) {
      instance.ErrorIfUnknownCodename(codename);
      super("dependantsettled", codename, instance);
      this.promise = instance.promises[codename];
      this.codename = codename;
    }
  };
  var Dependant = class _Dependant {
    // BASICS
    /** Internal promises: Can actually be modified */
    _promises = {};
    /** Object containing the Promises (read-only) */
    get promises() {
      return this._promises;
    }
    /** Object containing the functions for resolving or rejecting the promises */
    promiseFunctions = {};
    eventTarget = new EventTarget();
    publicEvents;
    /**
     * Create a ReferenceError with Codename as a subject. Used when Codename doesn't exist.
     * @param codename 
     * @returns 
     */
    CodenameError(codename) {
      const err = new ReferenceError(`Codename ${codename.toString()} doesn't exist on this instance.`);
      err.name = "CodenameError";
      err.cause = { instance: this, codename };
      return err;
    }
    /**
     * Check for Codename, and if it doesn't exist, throw `ReferenceError` with name `CodenameError`.
     * @param codename 
     */
    ErrorIfUnknownCodename(codename) {
      if (!this.exists(codename)) throw this.CodenameError(codename);
    }
    /**
     * Check if a codename is a valid codename
     * @param codename 
     * @returns 
     */
    isCodename(codename) {
      switch (typeof codename) {
        case "string":
        case "symbol":
        case "number":
          return true;
        default:
          return false;
      }
    }
    /**
     * Dispatch a `DependantEvent`. Takes care of where to dispatch it.
     * @param event instance of `DependantEvent` or extended from it
     */
    dispatchEvent(event) {
      this.eventTarget.dispatchEvent(event);
      if (this.publicEvents === true) window.dispatchEvent(event);
    }
    // CONSTRUCTOR
    /**
     * Create a new dependency tree. 
     * @param codenames One or more codenames to create on init
     * @param publicEvent if the state change of a Promise should be broadcast on `window` alongside the instance.
     */
    constructor(codenames, publicEvents = false) {
      const realCodenames = [];
      const realDependants = [];
      codenames.map((codename) => {
        if (this.isCodename(codename)) {
          realCodenames.push(codename);
        } else if (codename instanceof _Dependant) {
          realDependants.push(codename);
        }
      });
      this.add(...realCodenames);
      const expandedDependants = realDependants.flatMap((dep) => dep.all);
      expandedDependants.map((prom) => {
        this._add(/* @__PURE__ */ Symbol("Other Dependant"), prom);
      });
      this.publicEvents = publicEvents;
    }
    // GET & CHECK
    /** Array of all promises registered to instance */
    get all() {
      return Object.values(this.promises);
    }
    /**
     * Check if a codename exists
     * @param codename 
     */
    exists(codename) {
      return this.promises[codename] !== void 0;
    }
    /**
     * Get array of Promises from codenames. Undefined codenames are silently ignored. Useful for chaining like:
     * ```ts
     * await Promise.all(instance.await("wait1", "wait2"))
     * ```
     * @param codenames 
     * @returns 
     */
    await(...codenames) {
      return codenames.map((codename) => {
        this.ErrorIfUnknownCodename(codename);
        return this.promises[codename];
      }).filter((val) => val !== void 0);
    }
    // ADD, RESOLVE, REJECT
    /**
     * Internal function that adds the promise with a given objectKey to the promises.
     * 
     * **WARNING:** Silently rejects on found duplicate.
     * @param objectKey 
     * @param promise 
     */
    _add(objectKey, promise, overwrite = false) {
      if (!overwrite && this.exists(objectKey)) return;
      this._promises[objectKey] = promise;
    }
    /**
     * Adds new dependencies to the instance. Duplicates are silently ignored.
     * @param codenames 
     * @returns Object with the codenames associated to their solvers. Can be used in conjunction with `Dependant.await`.
     */
    add(...codenames) {
      if (codenames.length > 1) {
        let codenamesDeduplicated = /* @__PURE__ */ new Set();
        codenames.map((codename) => codenamesDeduplicated.add(codename));
        codenames = Array.from(codenamesDeduplicated);
      }
      const codenamesToPromises = codenames.map((codename) => ({ codename, promise: new Promise((resolve, reject) => {
        this.promiseFunctions[codename] = {
          resolve,
          reject
        };
      }) }));
      codenamesToPromises.map((entry) => {
        this._add(entry.codename, entry.promise);
        this.dispatchEvent(new DependantAddedEvent(entry.codename, this));
      });
    }
    resolve(codename, value) {
      return this.resolve_or_reject(codename, value, false);
    }
    reject(codename, reason) {
      return this.resolve_or_reject(codename, reason, true);
    }
    resolve_or_reject(codename, result, rejected = false) {
      this.ErrorIfUnknownCodename(codename);
      const promise_call = rejected ? this.promiseFunctions[codename].reject : this.promiseFunctions[codename].resolve;
      promise_call(result);
      this.dispatchEvent(new DependantSettledEvent(codename, this, rejected, result));
    }
  };

  // app/gallery-dom.ts
  var import_viewerjs2 = __toESM(require_viewer_min());

  // app/settings.ts
  var settingsLogger = getLogger("Settings");
  var LOCAL_FOR_OBJECT_ONLY_settings = JSON.parse(localStorage.getItem("settings")) ?? new Object();
  var settings = new Proxy(LOCAL_FOR_OBJECT_ONLY_settings, {
    get(target, prop, receiver) {
      if (prop === "replaceObject") {
        return (newObject) => {
          for (let variableKey in target) {
            if (target.hasOwnProperty(variableKey)) {
              delete target[variableKey];
            }
          }
          for (let variableKey in newObject) {
            target[variableKey] = newObject[variableKey];
          }
          LOCAL_FOR_OBJECT_ONLY_settings = newObject;
          localStorage.setItem("settings", JSON.stringify(target));
          settingsLogger.debug("Settings Object replaced");
        };
      }
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value) {
      const result = Reflect.set(target, prop, value);
      localStorage.setItem("settings", JSON.stringify(target));
      return result;
    }
    // Note: Implementation of "deleteProperty" is not necessary, because we don't delete settings.
  });
  var settings_valid = [
    "rowHeight",
    "bgColor",
    "bgColor-txt",
    "textColor",
    "textColor-txt",
    "imgMargin",
    "imgReverse",
    "zoomRatio",
    "mouseActionDelay",
    "accentColor",
    "accentColor-txt",
    /*"disableFullscreenB",*/
    "kivbbo",
    "dontImportSubfolders",
    "importAsTemporary",
    "editorMode",
    "emergencyURL",
    "emergencyTitle",
    "emergencyIcon",
    "emergencyOverride",
    "widthForFill",
    "emergencyContextmenu",
    "rtlGallery",
    "mouseHideDelay"
  ];
  var settings_no_display_val = [
    "imgReverse",
    /*"disableFullscreenB",*/
    "kivbbo",
    "dontImportSubfolders",
    "importAsTemporary",
    "editorMode",
    "emergencyURL",
    "emergencyTitle",
    "emergencyIcon",
    "emergencyOverride",
    "emergencyContextmenu",
    "rtlGallery"
  ];
  var EditorModeToggledEvent = class extends Event {
    status;
    constructor(status) {
      super("editorModeToggled");
      this.status = status;
    }
  };
  var settings_first_load = true;
  async function reloadSettings(resetDOM = false) {
    const haveWeFinishedProcessingYet = [];
    settings_valid.forEach((id) => {
      haveWeFinishedProcessingYet.push(new Promise((resolve) => {
        try {
          let elm = document.getElementById(id);
          if (!(elm instanceof HTMLInputElement)) throw new Error("The fucking settings element is NOT an input, or is gone.", { cause: { id, elm } });
          let elmType = elm.getAttribute("type");
          let valToCheck = "value";
          if (elmType == "checkbox") {
            valToCheck = "checked";
          }
          if (resetDOM) {
            if (valToCheck === "checked") {
              elm.checked = elm.getAttribute("checked") === "" ? true : false;
            } else {
              elm.value = elm.getAttribute("value") ?? "";
            }
          }
          let doFunction = function(e) {
            settingsDo(id, e.target[valToCheck]);
          };
          if (id.match(/(accent|text|bg)color(-txt|)/gi)) {
            doFunction = function(e) {
              settingsDo(id, standardize_color(e.target[valToCheck]));
            };
          }
          settings_first_load ? elm.addEventListener("input", doFunction) : null;
          settingsDo(id, elm[valToCheck], { load: true, elm, elmValToCheck: valToCheck });
          resolve(void 0);
        } catch (error) {
          console.error(error);
          resolve(void 0);
        }
      }));
    });
    await Promise.all(haveWeFinishedProcessingYet);
    if (settings_first_load) {
      systemd.resolve("loadingSettings");
      settings_first_load = false;
    }
  }
  window.addEventListener("load", () => {
    reloadSettings();
  });
  function settingsDo(id, val, options = { load: false, elm: void 0, elmValToCheck: void 0 }) {
    let settingid = id.replace("-txt", "");
    if (options.load === true) {
      val = settings[settingid] ?? val;
      if (options.elm && options.elmValToCheck) {
        if (options.elmValToCheck === "checked") {
          options.elm[options.elmValToCheck] = val;
        } else {
          options.elm[options.elmValToCheck] = val.toString();
        }
      }
    }
    settings[settingid] = val;
    changeSetting(id, val);
    updateVal(id, val);
  }
  function settingsReset() {
    settings.replaceObject({});
    reloadSettings(true);
    settingsLogger.info("Settings Reset");
  }
  function updateVal(id, val) {
    try {
      if (settings_no_display_val.includes(id)) {
        return;
      }
      const elm = document.getElementById(id);
      const elmName = elm.getAttribute("name");
      const status_elm = elm.parentElement.querySelector(`.input-value[data-value-of="${elmName}"]`);
      const status_name = status_elm.tagName.toLowerCase();
      if (status_name == "input") {
        status_elm.value = val.toString();
      } else {
        status_elm.innerText = val.toString();
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function changeSetting(id, val) {
    switch (id) {
      case "rowHeight":
        await systemd.promises["galleryFirstLoad"];
        galleryElm.resetMediaSizes();
        break;
      case "bgColor":
      case "bgColor-txt":
      case "textColor":
      case "textColor-txt":
      case "accentColor":
      case "accentColor-txt":
        colorFunc(id, val.toString());
        break;
      case "imgMargin":
        document.body.style.setProperty("--mediaMargin", `${val * 0.5}px`);
        break;
      case "imgReverse":
        await Promise.all(systemd.all);
        galleryElm.reverseChildren(!!val);
        break;
      // case "disableFullscreenB":
      //     if (val == true) {
      //         document.documentElement.style.setProperty("--fsb-display", "none");
      //     } else if (val == false) {
      //         document.documentElement.style.setProperty("--fsb-display", "inline-block");
      //     }
      //     break;
      case "kivbbo":
        if (val == false) {
          document.documentElement.style.setProperty("--viewer-footer-not-on-hover-opacity", "0");
          document.documentElement.style.setProperty("--viewer-footer-transition", "opacity 0.3s ease-in-out");
          document.documentElement.style.setProperty("--viewer-footer-translation-of-backdrop", "0 100%");
        } else if (val == true) {
          document.documentElement.style.setProperty("--viewer-footer-not-on-hover-opacity", "1");
          document.documentElement.style.setProperty("--viewer-footer-transition", "unset");
          document.documentElement.style.setProperty("--viewer-footer-translation-of-backdrop", "0 0");
        }
        break;
      case "zoomRatio":
        await systemd.promises["galleryFirstLoad"];
        galleryElm.viewer.options.zoomRatio = Number(val);
        break;
      case "mouseActionDelay":
        break;
      case "dontImportSubfolders":
        settings.dontImportSubfolders = val;
        break;
      case "importAsTemporary":
        break;
      case "editorMode":
        let editorModeToggledEvent = new EditorModeToggledEvent(Boolean(val));
        window.dispatchEvent(editorModeToggledEvent);
        break;
      case "emergencyURL":
      case "emergencyTitle":
      case "emergencyIcon":
      case "emergencyOverride":
      case "emergencyContextmenu":
        break;
      case "widthForFill":
        document.body.style.setProperty("--minWidthAfterGallery", `${val}%`);
        break;
      case "rtlGallery":
        await systemd.promises["galleryFirstLoad"];
        galleryElm.style.flexDirection = val ? "row-reverse" : "row";
        break;
      case "mouseHideDelay":
        settings.mouseHideDelay = Number(val);
        break;
      default:
        console.warn("uknown id for settings:", id);
        break;
    }
  }
  function standardize_color(str) {
    var ctx = document.createElement("canvas").getContext("2d");
    ctx.fillStyle = str;
    return ctx.fillStyle;
  }
  function colorFunc(which, val) {
    if (which.includes("bgColor")) {
      document.documentElement.style.setProperty("--bg-user", val);
      document.querySelector("meta[name='theme-color']").content = val;
    }
    if (which.includes("textColor")) {
      document.documentElement.style.setProperty("--text-user", val);
    }
    if (which.includes("accentColor")) {
      document.documentElement.style.setProperty("--accent-user", val);
    }
    if (which.includes("txt")) {
      const whichElmVal = document.getElementById(which).value;
    }
  }

  // app/viewer.ts
  var import_viewerjs = __toESM(require_viewer_min());
  var viewerAmIcurrentlyBeingResizedCuzIfNotImmaRescale;
  function resizeViewerSetup(thisVar) {
    thisVar.viewer.viewer.addEventListener("pointerdown", () => {
      thisVar.viewer.image.classList.remove("viewer-special-transition");
    });
    thisVar.viewer.viewer.addEventListener("pointerup", () => {
      thisVar.viewer.image.classList.add("viewer-special-transition");
    });
  }
  async function resizeViewer(thisVar) {
    if (!thisVar.viewer.isShown) {
      return;
    }
    thisVar.viewer.image.classList.remove("viewer-special-transition");
    let footer_no_title_height, image_height, image_width, screen_height, screen_width, scale_to_width, scale_to_height, zoomy;
    if (settings.kivbbo == true) {
      footer_no_title_height = thisVar.viewer.footer.clientHeight - thisVar.viewer.footer.querySelector(".viewer-title").clientHeight;
      image_height = thisVar.viewer.image.naturalHeight;
      image_width = thisVar.viewer.image.naturalWidth;
      screen_height = thisVar.viewer.viewer.clientHeight - footer_no_title_height * 2;
      screen_width = thisVar.viewer.viewer.clientWidth;
      scale_to_width = screen_width / image_width;
      scale_to_height = screen_height / image_height;
      zoomy = scale_to_height;
    } else {
      image_height = thisVar.viewer.image.naturalHeight;
      image_width = thisVar.viewer.image.naturalWidth;
      screen_height = thisVar.viewer.viewer.clientHeight;
      screen_width = thisVar.viewer.viewer.clientWidth;
      scale_to_width = screen_width / image_width;
      scale_to_height = screen_height / image_height;
      zoomy = scale_to_height;
    }
    if (scale_to_width < scale_to_height) {
      zoomy = scale_to_width;
    }
    thisVar.viewer.zoomTo(zoomy);
    image_height = thisVar.viewer.image.height;
    image_width = thisVar.viewer.image.width;
    if (settings.kivbbo == true) {
      thisVar.viewer.move(0, thisVar.viewer.footer.querySelector(".viewer-title").clientHeight);
    } else {
      thisVar.viewer.moveTo((screen_width - image_width) / 2, (screen_height - image_height) / 2);
    }
    setTimeout(() => {
      thisVar.viewer.image.classList.add("viewer-special-transition");
    }, 100);
  }
  function createGalleryViewer(gallery) {
    const view = new import_viewerjs.default(gallery, {
      transition: false,
      tooltip: false,
      slideOnTouch: false,
      // Allow mobile users to move images
      ready() {
        let beMyGuest = this;
        window.addEventListener("resize", () => {
          clearTimeout(viewerAmIcurrentlyBeingResizedCuzIfNotImmaRescale);
          viewerAmIcurrentlyBeingResizedCuzIfNotImmaRescale = setTimeout(() => {
            resizeViewer(beMyGuest);
          }, 100);
        });
        resizeViewerSetup(this);
      },
      shown() {
        if (document.querySelector("#contextmenu.visible")) {
          view.hide();
        }
      },
      viewed() {
        resizeViewer(this);
      }
    });
    return view;
  }

  // app/gallery-dom.ts
  var import_dragula = __toESM(require_dragula_min());

  // app/emergency.ts
  function executeEmergency() {
    if (!settings.emergencyOverride) {
      window.open(settings.emergencyURL, "_blank");
      let currentURL = new URL(window.location.toString());
      currentURL.searchParams.set("iconurl", settings.emergencyIcon);
      currentURL.searchParams.set("title", settings.emergencyTitle);
      window.history.pushState({}, "", currentURL);
      collectionManager.newCollection("database").then((c) => collectionManager.switchCollection(c));
    } else {
      window.location.replace(settings.emergencyURL);
    }
  }

  // app/zoom-pincher.ts
  var zoomPincher = {
    prevdiff: 0,
    // previous difference calculated every single move
    cache: [],
    // cache of at least two fingers
    build: 0,
    // buildup of differences until a threshold
    lasttap: -1e3,
    // latest touch event was fired
    moved: false,
    // if during the tapping there was a movement fired at least once
    maxtouches: 0
    // how many touches there were before the end
  };
  function distanceBetweenPoints([pointAX, pointAY], [pointBX, pointBY]) {
    return Math.abs(
      Math.sqrt(
        (pointAX - pointBX) ** 2 + (pointAY - pointBY) ** 2
      )
    );
  }
  var zoomPincherConditionToCancel = (e) => {
    return e.pointerType != "touch" || settings.editorMode == true;
  };
  window.addEventListener("load", () => {
    function newTouch(e) {
      if (zoomPincherConditionToCancel(e)) return;
      zoomPincher.cache.push(e);
      zoomPincher.lasttap = performance.now();
      zoomPincher.maxtouches = zoomPincher.maxtouches < zoomPincher.cache.length ? zoomPincher.cache.length : zoomPincher.maxtouches;
    }
    function moveTouch(e) {
      if (zoomPincherConditionToCancel(e)) return;
      if (!(e.target instanceof HTMLElement)) return;
      zoomPincher.moved = true;
      const pointerIdIndex = zoomPincher.cache.findIndex((x) => x.pointerId == e.pointerId);
      zoomPincher.cache[pointerIdIndex] = e;
      if (zoomPincher.cache.length === 2 && // assert there's two touches. Might cause a time of check, time of use (TOCTOU) problem
      (galleryElm.contains(e.target) || navbar.contains(e.target) || document.querySelector("body > section").contains(e.target))) {
        const newdiff = distanceBetweenPoints(
          [zoomPincher.cache[0].clientX, zoomPincher.cache[0].clientY],
          [zoomPincher.cache[1].clientX, zoomPincher.cache[1].clientY]
        );
        if (zoomPincher.prevdiff != 0) zoomPincher.build += newdiff - zoomPincher.prevdiff;
        if (Math.abs(zoomPincher.build) > 10) {
          const rowdiff = zoomPincher.build > 0 ? 10 : -10;
          zoomPincher.build -= rowdiff;
          const rowHeightSettingElm = document.getElementById("rowHeight");
          const rownum = Number(rowHeightSettingElm.value) + rowdiff;
          if (Number(rowHeightSettingElm.min) <= rownum && rownum <= Number(rowHeightSettingElm.max)) {
            rowHeightSettingElm.value = rownum.toString();
            settingsDo("rowHeight", rownum);
          }
        }
        zoomPincher.prevdiff = newdiff;
      }
    }
    function endTouch(e) {
      if (zoomPincherConditionToCancel(e) || zoomPincher.cache.findIndex((x) => x.pointerId === e.pointerId) == -1) return;
      zoomPincher.cache.splice(zoomPincher.cache.findIndex((x) => x.pointerId == e.pointerId), 1);
      if (zoomPincher.cache.length < 2) zoomPincher.prevdiff = 0;
      if (zoomPincher.cache.length === 0 && zoomPincher.maxtouches == 2 && zoomPincher.moved == false && performance.now() - zoomPincher.lasttap <= settings.mouseActionDelay) {
        (async () => {
          e.target?.dispatchEvent(new PointerEvent("contextmenu", await constructorPrototypeCopyNoReadOnly(e)));
        })();
      }
      if (zoomPincher.cache.length === 0) {
        zoomPincher.moved = false;
        zoomPincher.maxtouches = 0;
      }
    }
    document.body.addEventListener("pointerdown", newTouch);
    document.body.addEventListener("pointermove", moveTouch);
    document.body.addEventListener("pointerup", endTouch);
    document.body.addEventListener("pointercancel", endTouch);
    document.body.addEventListener("pointerout", endTouch);
    document.body.addEventListener("pointerleave", endTouch);
  });

  // app/context-menu.ts
  function contextMenu(buttons, e) {
    return new Promise((resolve) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      let contextmenu = document.getElementById("contextmenu");
      if (e.target == contextmenu || contextmenu.contains(e.target)) return;
      contextmenu.innerHTML = "";
      for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        if (Object.keys(button).length == 0) continue;
        let html = document.createElement("button");
        html.type = "button";
        if (button.callback) html.addEventListener("click", button.callback);
        html.addEventListener("click", closeContextMenu);
        html.innerHTML = button.text;
        html.style = button.style ?? "";
        button.class ? html.setAttribute("class", button.class) : null;
        button.disabled ? html.setAttribute("disabled", "") : null;
        document.getElementById("contextmenu").append(html);
      }
      contextmenu.classList.add("visible");
      let posX = e.clientX + document.documentElement.scrollLeft;
      let posY = e.clientY + document.documentElement.scrollTop;
      let screenX = document.documentElement.scrollLeft + document.documentElement.clientWidth;
      let screenY = document.documentElement.scrollTop + document.documentElement.clientHeight;
      if (posX + contextmenu.clientWidth > screenX) {
        contextmenu.style.left = screenX - contextmenu.clientWidth - 8 + "px";
      } else {
        contextmenu.style.left = posX + "px";
      }
      if (posY + contextmenu.clientHeight > screenY) {
        contextmenu.style.top = screenY - contextmenu.clientHeight - 8 + "px";
      } else {
        contextmenu.style.top = posY + "px";
      }
      let ghost = document.createElement("button");
      ghost.classList.add("ghost-button");
      document.getElementById("contextmenu").prepend(ghost);
      contextmenu.querySelector(":first-child").focus();
      resolve();
    });
  }
  function closeContextMenuHelper(el = null) {
    if (!document.getElementById("contextmenu").contains(el)) {
      closeContextMenu();
    }
  }
  function closeContextMenu() {
    if (ignoreContextMenuCancelOnce) return ignoreContextMenuCancelOnce = false;
    document.getElementById("contextmenu").classList.remove("visible");
    window.dispatchEvent(new Event("closedcontextmenu"));
  }
  function makeThumbnail(mediaElement) {
    return new Promise((resolve, reject) => {
      let node = mediaElement;
      if (!node) {
        reject();
        return;
      }
      let ratio = node.clientWidth / node.clientHeight;
      let width = 512;
      let height = width / ratio;
      let ctx = document.createElement("canvas");
      ctx.setAttribute("width", width.toString());
      ctx.setAttribute("height", height.toString());
      const context2d = ctx.getContext("2d");
      if (context2d === null) return;
      context2d.filter = `blur(${width * 0.05}px)`;
      context2d.drawImage(node.querySelector("img, video"), 0, 0, width, height);
      context2d.canvas.toBlob((blob) => resolve(URL.createObjectURL(blob)), "image/jpeg", 0.75);
    });
  }
  function getBlobURIfromElement(elm) {
    let link = "";
    if (elm.nodeName == "A") {
      link = elm.querySelector("img, source")?.src;
    } else if (elm.nodeName == "IMG") {
      link = elm.src;
    } else if (elm.nodeName == "VIDEO") {
      link = elm.querySelector("source")?.src;
    }
    if (link !== "") {
      return link;
    }
  }
  async function dlMedia(elm) {
    if (elm instanceof JGVMedia) {
      const url = getBlobURIfromElement(elm);
      if (!url) throw new Error("Couldn't get URL from Element in dlMedia.", { cause: elm });
      downloadURI(url);
    } else if (typeof elm === "string") {
      let media = galleryElm.collection.blobs;
      const blob = media[elm];
      if (!blob) throw new Error("Couldn't get Blob from given ID");
      const url = URL.createObjectURL(blob);
      downloadURI(url);
    } else if (elm instanceof Array) {
      elm.forEach(async (item) => {
        dlMedia(item);
      });
    } else {
      throw new Error("elm was neither JGVMedia, ID, or Array of JGVMedias and IDs", { cause: elm });
    }
  }
  document.addEventListener("contextmenu", (e) => {
    if (!(e.target instanceof HTMLElement)) return;
    if (e.target.nodeName == "IMG" && document.body.classList.contains("viewer-open") || e.target.nodeName == "VIDEO" && document.fullscreenElement == e.target) {
      return;
    }
    const conf_context = {
      fullscreen: { text: ourFullscreen ? "Exit Fullscreen" : "Fullscreen", callback: () => {
        toggleFullscreenGallery();
      } },
      hide: { text: ourHiding ? "Show UI" : "Hide UI", callback: () => {
        toggleFullscreenGallery({ noFullscreen: true });
      }, disabled: ourFullscreen },
      nav: () => {
        if (document.documentElement.classList.contains("fullscreen")) {
          return { text: `${manualOpenNavbar.c() ? "Close" : "Open"} Navbar`, callback: manualOpenNavbar.c() ? () => {
            manualOpenNavbar.s(false);
          } : () => {
            manualOpenNavbar.s(true);
          } };
        } else {
          return {};
        }
      },
      emergency: () => {
        if (settings.emergencyContextmenu) {
          return { text: "Emergency Mode", callback: () => {
            executeEmergency();
          } };
        } else {
          return {};
        }
      },
      close: { text: "<div style='text-align:center;height:0.5em;line-height:0.5em;'>\xD7</div>", callback: () => {
        closeContextMenu();
      } }
    };
    let mediaTarget = void 0;
    if (galleryElm.contains(e.target) && galleryElm !== e.target) {
      if (e.target instanceof JGVMedia) {
        mediaTarget = e.target;
      } else {
        let parent = e.target.parentElement;
        while (parent) {
          if (parent instanceof JGVMedia) {
            mediaTarget = parent;
            parent = null;
          } else {
            parent = parent.parentElement;
          }
        }
      }
    }
    if (mediaTarget) {
      e.preventDefault();
      e.stopImmediatePropagation();
      let comebackto = uuidtime();
      let config = [
        { text: "Download", callback: () => {
          dlMedia(mediaTarget);
        }, class: "download " + comebackto, style: "" },
        { text: "Delete", callback: () => {
          galleryElm.collection?.delete(mediaTarget.id);
        } },
        conf_context.fullscreen,
        conf_context.hide,
        conf_context.nav(),
        conf_context.emergency(),
        conf_context.close
      ];
      let promise = contextMenu(config, e);
      (async () => {
        try {
          let pic = await makeThumbnail(mediaTarget);
          await promise;
          document.querySelector('[class*="' + comebackto + '"]').style = `background: url(${pic}) 50% 50% / cover, var(--dl-bg);`;
          window.addEventListener("closedcontextmenu", () => {
            URL.revokeObjectURL(pic);
          }, { once: true });
        } catch (error) {
          if (!(error instanceof DOMException)) {
            console.error(error);
          }
        }
      })();
    } else {
      let config = [
        conf_context.fullscreen,
        conf_context.hide,
        conf_context.nav(),
        conf_context.emergency(),
        conf_context.close
      ];
      contextMenu(config, e);
    }
  });
  window.addEventListener("load", () => {
    document.body.addEventListener("mousedown", (e) => closeContextMenuHelper(e.target));
    document.body.addEventListener("drag", (e) => closeContextMenuHelper(e.target));
    document.body.addEventListener("touchstart", (e) => closeContextMenuHelper(e.target));
    window.addEventListener("resize", () => closeContextMenuHelper());
  });
  window.addEventListener("keydown", (e) => {
    if (e.code == "Escape") {
      closeContextMenu();
    }
    if (!(e.target instanceof HTMLElement)) return;
    if (document.getElementById("contextmenu").contains(e.target)) {
      if (e.code == "ArrowDown" || e.code == "ArrowRight" || e.code == "ArrowUp" || e.code == "ArrowLeft") {
        const upwards = e.code == "ArrowUp" || e.code == "ArrowLeft";
        const parent = e.target.parentElement;
        const firstorlast = upwards ? parent.lastChild : parent.firstChild;
        const sibling = upwards ? e.target.previousSibling : e.target.nextSibling;
        const ghost = document.querySelector("#contextmenu .ghost-button");
        ghost ? ghost.remove() : null;
        if (sibling == null) {
          firstorlast?.focus();
        } else {
          sibling?.focus();
        }
        e.preventDefault();
      }
    }
  });
  var interesting = 0;
  var offsetFromOrigin = class {
    absx = 0;
    absy = 0;
    /** If asbx and absy were defined before */
    absd = false;
    x = 0;
    y = 0;
    i;
    // Represents the how manyth offsetFromOrigin instance it is.
    touch;
    elm;
    func(e) {
      if (!this.absd) {
        this.absx = e.screenX;
        this.absy = e.screenY;
        this.absd = true;
      }
      this.x = e.screenX;
      this.y = e.screenY;
    }
    funcTouch(e) {
      if (!e.touches[0]) throw Error("TouchEvent without touches???", { cause: e });
      if (!this.absd) {
        this.absx = e.touches[0].screenX;
        this.absy = e.touches[0].screenY;
        this.absd = true;
      }
      this.x = e.touches[0].screenX;
      this.y = e.touches[0].screenY;
    }
    constructor(origin = null, touch = false) {
      this.elm = origin ? origin : document.body;
      this.i = interesting;
      interesting++;
      this.touch = touch;
      if (this.touch) {
        this.elm.addEventListener("touchmove", this.funcTouch.bind(this));
      } else {
        this.elm.addEventListener("pointermove", this.func.bind(this));
      }
      return this;
    }
    stop() {
      try {
        if (this.touch) {
          this.elm.removeEventListener("touchmove", this.funcTouch.bind(this));
        } else {
          this.elm.removeEventListener("pointermove", this.func.bind(this));
        }
      } catch (e) {
      }
      return { x: this.x, y: this.y };
    }
  };
  var ignoreContextMenuCancelOnce = false;
  var mouseActionLastMovement = void 0;
  window.addEventListener("load", async () => {
    await Promise.all(systemd.all);
    var mouseTimer;
    var lastDown = 0;
    function mouseDown(e, elm = null) {
      if (lastDown > performance.now() - 300) return;
      lastDown = performance.now();
      if (e.button === 1) {
        e.preventDefault();
        execMouseDown(e);
        return;
      }
      mouseActionLastMovement = new offsetFromOrigin(elm ?? null, e.type.includes("touch"));
      mouseTimer = window.setTimeout(() => {
        execMouseDown(e);
      }, settings.mouseActionDelay);
    }
    function mouseUp() {
      if (mouseTimer) {
        window.clearTimeout(mouseTimer);
        mouseTimer = void 0;
      }
      if (mouseActionLastMovement) {
        mouseActionLastMovement.stop();
        mouseActionLastMovement = void 0;
      }
    }
    async function execMouseDown(e) {
      if (
        /*settings.editorMode === false || */
        dragulaDragging === true || e.button == 2
      ) {
        return;
      }
      if (e.button == 1) {
        if (e.target instanceof JGVMedia && galleryElm.contains(e.target)) {
          if (e.target.id) {
            galleryElm.collection?.delete(e.target.id);
          }
        }
        return;
      }
      if (zoomPincher.moved) return;
      if (!(mouseActionLastMovement instanceof offsetFromOrigin)) return;
      if (distanceBetweenPoints([mouseActionLastMovement.absx, mouseActionLastMovement.absy], [mouseActionLastMovement.x, mouseActionLastMovement.y]) > 5) return;
      let eventobj = await constructorPrototypeCopyNoReadOnly(e);
      let vent = new PointerEvent("contextmenu", eventobj);
      e.target.dispatchEvent(vent);
    }
    async function touchToPointer(evt) {
      const evtCopy = await constructorPrototypeCopyNoReadOnly(evt);
      const evtTouchCopy = await constructorPrototypeCopyNoReadOnly(evtCopy.changedTouches[0]);
      return Object.assign(evtCopy, evtTouchCopy);
    }
    galleryElm.addEventListener("mousedown", (e) => {
      ignoreContextMenuCancelOnce = false;
      mouseDown(e);
    });
    galleryElm.addEventListener("touchstart", async (e) => {
      ignoreContextMenuCancelOnce = true;
      mouseDown(await touchToPointer(e));
    });
    document.body.addEventListener("mouseup", mouseUp);
    document.body.addEventListener("touchend", async (e) => mouseUp());
    document.body.addEventListener("dragend", mouseUp);
  });

  // app/gallery-dom.ts
  function typeOfMedia(mime) {
    if (mime.includes("image/")) return "image";
    if (mime.includes("video/")) return "video";
    return null;
  }
  function mediaElmsLoadPromises(...elms) {
    return elms.map((elm) => new Promise((resolve, reject) => {
      switch (elm.type) {
        case "image":
          const foundImg = elm.querySelector("img");
          foundImg.addEventListener("load", resolve);
          foundImg.addEventListener("error", reject);
          break;
        case "video":
          const foundVid = elm.querySelector("video");
          foundVid.addEventListener("loadedmetadata", resolve);
          foundVid.addEventListener("error", reject);
          break;
        default:
          break;
      }
    }));
  }
  var JGVGalleryEvent = class extends Event {
    collection;
    constructor(type, collection) {
      super(type);
      this.collection = collection;
    }
  };
  var JGVGallery2 = class extends HTMLElement {
    // protected placeholder: JGVMedia | undefined
    placeholder = (() => {
      const placeholder = new JGVMedia("placeholder.svg", null, { type: "image" });
      placeholder.id = "placeholderImage";
      return placeholder;
    })();
    collection;
    viewer;
    styleElm;
    dragulaGallery;
    dragulaDragging = false;
    shouldScrollNewMediaIntoView = true;
    constructor() {
      super();
    }
    connectedCallback() {
      this.placeholderPlacement(true);
      this.id = "gallery-" + uuidtime();
      this.styleElm = document.createElement("style");
      document.head.appendChild(this.styleElm);
      this.viewer = createGalleryViewer(this);
      this.dragulaGallery = (0, import_dragula.default)([this], {
        moves: function() {
          return settings.editorMode;
        }
      });
      this.dragulaGallery.on("drop", () => {
        const newOrder = Array.from(this.children).map((v) => v.id);
        this.collection?.reorder(newOrder);
      });
      this.dragulaGallery.on("drag", (el) => {
        if (document.querySelector("#contextmenu.visible")) {
          closeContextMenuHelper(el);
        }
        this.dragulaDragging = true;
      });
      this.dragulaGallery.on("dragend", () => {
        this.dragulaDragging = false;
      });
      window.addEventListener("collectionadded", this.refreshGallery.bind(this));
      window.addEventListener("collectionremoved", this.refreshGallery.bind(this));
    }
    connectedMoveCallback() {
    }
    // TODO: Does the above still run?
    disconnectedCallback() {
      window.removeEventListener("collectionadded", this.refreshGallery.bind(this));
      window.removeEventListener("collectionremoved", this.refreshGallery.bind(this));
    }
    /**
     * Enable or disable the Placeholder
     * @param enabled 
     */
    async placeholderPlacement(enabled) {
      if (enabled) {
        if (!this.contains(this.placeholder)) {
          this.append(this.placeholder);
        }
      } else {
        this.placeholder.remove();
      }
      await Promise.allSettled(mediaElmsLoadPromises(this.placeholder));
      this.refreshGallery();
    }
    /**
     * Called when anything changes that has a representation in the JGVGallery UI (order, size, media count)
     */
    refreshGallery() {
      if (this.collection === void 0 || this.collection.order.length === 0) {
        this.placeholderPlacement(true);
      } else {
        this.placeholderPlacement(false);
      }
      this.resetMediaSizes();
      updateStorageInfo();
      this.viewer?.update();
    }
    /**
     * Expensive function for reordering the gallery and creating new elements. It's better to find a way to do it using direct DOM manipulation (like Dragula) than through this function.
     * 
     * It will first compare the order of the `this.collection` with `this.children`. If there's ANY difference, it will:
     * 1. find newly missing elements and remove them
     * 2. find newly added elements and create them
     * 3. use a fuck ton of `insertAfter()` to add them all into the DOM
     * 
     * It will silenty exit if no `this.collection` is set.
     */
    refreshMediaAndOrder() {
      if (!this.collection) return;
      const oldChildren = Array.from(this.children);
      const oldOrder = oldChildren.map((v) => v.id);
      const newOrder = this.collection.order;
      if (this.reversed) oldOrder.reverse();
      const areTheSame = newOrder.every((v, i) => v === oldOrder[i]);
      if (areTheSame) {
        this.refreshGallery();
        return;
      }
      ;
      const oldOrderSet = new Set(oldOrder);
      const newOrderSet = new Set(newOrder);
      const onlyInOldSet = oldOrderSet.difference(newOrderSet);
      const onlyInOldSetElms = oldChildren.filter((elm) => onlyInOldSet.has(elm.id));
      onlyInOldSetElms.forEach((elm) => elm.remove());
      const newElms = newOrder.map((id) => {
        const possiblyExisting = oldChildren.find((v) => v.id === id);
        if (possiblyExisting) {
          return possiblyExisting;
        }
        return new JGVMedia(this.collection.blobs[id], id);
      });
      if (this.reversed) {
        this.prepend(...newElms.toReversed());
      } else {
        this.append(...newElms);
      }
      this.refreshGallery();
    }
    /**
     * Change this JGVGallery Element to represent a different `MediaCollection`, or one at all.
     * @param collection 
     */
    switchCollection(collection) {
      this.shouldScrollNewMediaIntoView = false;
      if (this.collection) {
        const ev2 = this.collection.events;
        ev2.removeEventListener("collectionmediaappended", this.catchCollectionEventUnknownFix);
        ev2.removeEventListener("collectionmediaremoved", this.catchCollectionEventUnknownFix);
        ev2.removeEventListener("collectionmediareordered", this.catchCollectionEventUnknownFix);
        this.empty();
      }
      this.collection = collection;
      if (this.collection.order.length === 0) {
        this.placeholderPlacement(true);
      } else {
        this.placeholderPlacement(false);
        const addableMedia = this.collection.order.map((id) => ({ blob: this.collection.blobs[id], id }));
        this.addedMedia(...addableMedia);
      }
      const ev = this.collection.events;
      ev.addEventListener("collectionmediaappended", this.catchCollectionEventUnknownFix);
      ev.addEventListener("collectionmediaremoved", this.catchCollectionEventUnknownFix);
      ev.addEventListener("collectionmediareordered", this.catchCollectionEventUnknownFix);
      this.refreshGallery();
      this.dispatchEvent(new JGVGalleryEvent("collectionswitched", this.collection));
      this.shouldScrollNewMediaIntoView = true;
    }
    catchCollectionEventUnknownFix = (event) => {
      this.catchCollectionEvent(event);
    };
    catchCollectionEvent(event) {
      switch (event.type) {
        case "collectionmediaappended":
          this.addedMedia(...event.affected);
          break;
        case "collectionmediaremoved":
          this.removedMedia(...event.affected.map((v) => v.id));
          break;
        case "collectionmediareordered":
          this.refreshMediaAndOrder();
          break;
        default:
          break;
      }
    }
    /**
     * Add Media to the DOM. Accepts options as a spread list.
     * 
     * **Is order Dependant**
     * @param options 
     */
    async addedMedia(...options) {
      const shouldScrollNewMediaIntoView = this.shouldScrollNewMediaIntoView;
      const elms = options.map((opt) => new JGVMedia(opt.blob, opt.id));
      this.reversed ? this.prepend(...elms.toReversed()) : this.append(...elms);
      await Promise.allSettled(mediaElmsLoadPromises(...elms));
      this.refreshGallery();
      if (document.visibilityState === "visible" && shouldScrollNewMediaIntoView) elms[elms.length - 1]?.scrollIntoView({ behavior: "smooth" });
    }
    /**
     * Remove Media from the DOM. Accepts a spread list of IDs
     * @param id 
     */
    removedMedia(...id) {
      const noNullIds = id.filter((v) => v !== null);
      Array.from(this.children).forEach((v) => {
        if (noNullIds.includes(v.id)) v.remove();
      });
      this.refreshGallery();
    }
    /**
     * Recalculates the given heights for the Media elements.
     */
    resetMediaSizes() {
      const children = Array.from(this.children);
      const cssArray = children.map((elm, index) => `#${this.id} > :nth-child(${index + 1}) { ${elm.generateCSS()} }`);
      if (this.styleElm) this.styleElm.innerText = cssArray.join("\n");
    }
    /**
     * Empty the DOM. Please immediately load another collection, as we otherwise have a problem.
     */
    empty() {
      Array.from(this.children).forEach((v) => v.remove());
    }
    remove() {
      super.remove();
      if (this.styleElm) this.styleElm.remove();
    }
    /** If the media elements are reversed */
    reversed = false;
    /**
     * If the order of Media elements should be flipped.
     * @param status 
     * @returns 
     */
    reverseChildren(status) {
      if (status === this.reversed) return;
      for (let i = 1; i < this.childNodes.length; i++) {
        this.insertBefore(this.childNodes[i], this.firstChild);
      }
      this.reversed = status;
      this.refreshGallery();
    }
  };
  var JGVMedia = class extends HTMLAnchorElement {
    type;
    src;
    // Null is not an option here, because I said so and these CAN'T be a placeholder (because I have decreed so).
    constructor(media, id, options) {
      super();
      if (id) this.id = id;
      if (typeof media === "string") {
        if (!options.type) throw new Error("A type must be set in options", { cause: options });
        switch (options.type) {
          case "image":
          case "video":
            this.type = options.type;
            break;
          default:
            throw new Error("A valid type must be set in options", { cause: options?.type });
        }
        this.src = media;
      } else if (media !== void 0) {
        const type = typeOfMedia(media.type);
        if (!type) throw new Error("Invalid Mime Type", { cause: media.type });
        this.type = type;
        this.src = URL.createObjectURL(media);
      } else {
        this.type = "image";
        this.src = "";
        this.mediaWidth = () => 0;
        this.mediaRatioH = () => 0;
        return;
      }
      let mediaElement;
      let mediaWidth, mediaHeight;
      switch (this.type) {
        case "image":
          this.classList.add("image");
          mediaElement = document.createElement("img");
          mediaElement.src = this.src;
          mediaWidth = () => {
            return mediaElement.naturalWidth;
          };
          mediaHeight = () => {
            return mediaElement.naturalHeight;
          };
          break;
        case "video":
          this.classList.add("video");
          mediaElement = document.createElement("video");
          mediaElement.setAttribute("controls", "");
          const videoElement = document.createElement("source");
          videoElement.src = this.src;
          const videoXButton = document.createElement("div");
          videoXButton.innerText = "X";
          videoXButton.classList.add("closer");
          videoXButton.addEventListener("click", (() => {
            this.remove();
          }).bind(this));
          mediaElement.append(videoElement);
          this.append(videoXButton);
          mediaWidth = () => {
            return mediaElement.videoWidth;
          };
          mediaHeight = () => {
            return mediaElement.videoHeight;
          };
          break;
        default:
          throw new Error("how the fuck", { cause: this.type });
      }
      this.append(document.createElement("i"), mediaElement);
      this.mediaWidth = () => {
        return mediaWidth() * settings.rowHeight / mediaHeight();
      };
      this.mediaRatioH = () => {
        return mediaHeight() / mediaWidth();
      };
      window.addEventListener("unload", () => {
        URL.revokeObjectURL(this.src);
      });
    }
    connectedMoveCallback() {
    }
    disconnectedCallback() {
      try {
        URL.revokeObjectURL(this.src);
      } catch {
      }
    }
    mediaWidth;
    mediaRatioH;
    /**
     * Generate CSS that if it targets this element specifically can be used to give each element their correct ratio.
     * 
     * **WARNING! Cannot be used in `HTMLElement.style`, as it uses CSS selectors!**
     * ```css
     * #gallery > :nth-child(0) { generateCSS() output }
     * ```
     * @returns 
     */
    generateCSS() {
      const mediaWidth = this.mediaWidth();
      return `width: ${mediaWidth}px; flex-grow: ${mediaWidth}; i { padding-bottom: ${this.mediaRatioH() * 100}%; }`;
    }
  };
  customElements.define("jgv-gallery", JGVGallery2);
  customElements.define("jgv-media", JGVMedia, { extends: "a" });
  console.debug("Added JGV Gallery related elements!");
  window.JGVGallery = JGVGallery2;
  window.JGVMedia = JGVMedia;

  // app/jgvdb.ts
  var zip = __toESM(require_zip_min());

  // zip.js/mime-types.js
  var table = {
    "application": {
      "andrew-inset": "ez",
      "annodex": "anx",
      "atom+xml": "atom",
      "atomcat+xml": "atomcat",
      "atomserv+xml": "atomsrv",
      "bbolin": "lin",
      "cu-seeme": "cu",
      "davmount+xml": "davmount",
      "dsptype": "tsp",
      "ecmascript": [
        "es",
        "ecma"
      ],
      "futuresplash": "spl",
      "hta": "hta",
      "java-archive": "jar",
      "java-serialized-object": "ser",
      "java-vm": "class",
      "m3g": "m3g",
      "mac-binhex40": "hqx",
      "mathematica": [
        "nb",
        "ma",
        "mb"
      ],
      "msaccess": "mdb",
      "msword": [
        "doc",
        "dot",
        "wiz"
      ],
      "mxf": "mxf",
      "oda": "oda",
      "ogg": "ogx",
      "pdf": "pdf",
      "pgp-keys": "key",
      "pgp-signature": [
        "asc",
        "sig"
      ],
      "pics-rules": "prf",
      "postscript": [
        "ps",
        "ai",
        "eps",
        "epsi",
        "epsf",
        "eps2",
        "eps3"
      ],
      "rar": "rar",
      "rdf+xml": "rdf",
      "rss+xml": "rss",
      "rtf": "rtf",
      "xhtml+xml": [
        "xhtml",
        "xht"
      ],
      "xml": [
        "xml",
        "xsl",
        "xsd",
        "xpdl"
      ],
      "xspf+xml": "xspf",
      "zip": "zip",
      "vnd.android.package-archive": "apk",
      "vnd.cinderella": "cdy",
      "vnd.google-earth.kml+xml": "kml",
      "vnd.google-earth.kmz": "kmz",
      "vnd.mozilla.xul+xml": "xul",
      "vnd.ms-excel": [
        "xls",
        "xlb",
        "xlt",
        "xlm",
        "xla",
        "xlc",
        "xlw"
      ],
      "vnd.ms-pki.seccat": "cat",
      "vnd.ms-pki.stl": "stl",
      "vnd.ms-powerpoint": [
        "ppt",
        "pps",
        "pot",
        "ppa",
        "pwz"
      ],
      "vnd.oasis.opendocument.chart": "odc",
      "vnd.oasis.opendocument.database": "odb",
      "vnd.oasis.opendocument.formula": "odf",
      "vnd.oasis.opendocument.graphics": "odg",
      "vnd.oasis.opendocument.graphics-template": "otg",
      "vnd.oasis.opendocument.image": "odi",
      "vnd.oasis.opendocument.presentation": "odp",
      "vnd.oasis.opendocument.presentation-template": "otp",
      "vnd.oasis.opendocument.spreadsheet": "ods",
      "vnd.oasis.opendocument.spreadsheet-template": "ots",
      "vnd.oasis.opendocument.text": "odt",
      "vnd.oasis.opendocument.text-master": [
        "odm",
        "otm"
      ],
      "vnd.oasis.opendocument.text-template": "ott",
      "vnd.oasis.opendocument.text-web": "oth",
      "vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
      "vnd.openxmlformats-officedocument.spreadsheetml.template": "xltx",
      "vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
      "vnd.openxmlformats-officedocument.presentationml.slideshow": "ppsx",
      "vnd.openxmlformats-officedocument.presentationml.template": "potx",
      "vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
      "vnd.openxmlformats-officedocument.wordprocessingml.template": "dotx",
      "vnd.smaf": "mmf",
      "vnd.stardivision.calc": "sdc",
      "vnd.stardivision.chart": "sds",
      "vnd.stardivision.draw": "sda",
      "vnd.stardivision.impress": "sdd",
      "vnd.stardivision.math": [
        "sdf",
        "smf"
      ],
      "vnd.stardivision.writer": [
        "sdw",
        "vor"
      ],
      "vnd.stardivision.writer-global": "sgl",
      "vnd.sun.xml.calc": "sxc",
      "vnd.sun.xml.calc.template": "stc",
      "vnd.sun.xml.draw": "sxd",
      "vnd.sun.xml.draw.template": "std",
      "vnd.sun.xml.impress": "sxi",
      "vnd.sun.xml.impress.template": "sti",
      "vnd.sun.xml.math": "sxm",
      "vnd.sun.xml.writer": "sxw",
      "vnd.sun.xml.writer.global": "sxg",
      "vnd.sun.xml.writer.template": "stw",
      "vnd.symbian.install": [
        "sis",
        "sisx"
      ],
      "vnd.visio": [
        "vsd",
        "vst",
        "vss",
        "vsw",
        "vsdx",
        "vssx",
        "vstx",
        "vssm",
        "vstm"
      ],
      "vnd.wap.wbxml": "wbxml",
      "vnd.wap.wmlc": "wmlc",
      "vnd.wap.wmlscriptc": "wmlsc",
      "vnd.wordperfect": "wpd",
      "vnd.wordperfect5.1": "wp5",
      "x-123": "wk",
      "x-7z-compressed": "7z",
      "x-abiword": "abw",
      "x-apple-diskimage": "dmg",
      "x-bcpio": "bcpio",
      "x-bittorrent": "torrent",
      "x-cbr": [
        "cbr",
        "cba",
        "cbt",
        "cb7"
      ],
      "x-cbz": "cbz",
      "x-cdf": [
        "cdf",
        "cda"
      ],
      "x-cdlink": "vcd",
      "x-chess-pgn": "pgn",
      "x-cpio": "cpio",
      "x-csh": "csh",
      "x-director": [
        "dir",
        "dxr",
        "cst",
        "cct",
        "cxt",
        "w3d",
        "fgd",
        "swa"
      ],
      "x-dms": "dms",
      "x-doom": "wad",
      "x-dvi": "dvi",
      "x-httpd-eruby": "rhtml",
      "x-font": "pcf.Z",
      "x-freemind": "mm",
      "x-gnumeric": "gnumeric",
      "x-go-sgf": "sgf",
      "x-graphing-calculator": "gcf",
      "x-gtar": [
        "gtar",
        "taz"
      ],
      "x-hdf": "hdf",
      "x-httpd-php": [
        "phtml",
        "pht",
        "php"
      ],
      "x-httpd-php-source": "phps",
      "x-httpd-php3": "php3",
      "x-httpd-php3-preprocessed": "php3p",
      "x-httpd-php4": "php4",
      "x-httpd-php5": "php5",
      "x-ica": "ica",
      "x-info": "info",
      "x-internet-signup": [
        "ins",
        "isp"
      ],
      "x-iphone": "iii",
      "x-iso9660-image": "iso",
      "x-java-jnlp-file": "jnlp",
      "x-jmol": "jmz",
      "x-killustrator": "kil",
      "x-latex": "latex",
      "x-lyx": "lyx",
      "x-lzx": "lzx",
      "x-maker": [
        "frm",
        "fb",
        "fbdoc"
      ],
      "x-ms-wmd": "wmd",
      "x-msdos-program": [
        "com",
        "exe",
        "bat",
        "dll"
      ],
      "x-netcdf": [
        "nc"
      ],
      "x-ns-proxy-autoconfig": [
        "pac",
        "dat"
      ],
      "x-nwc": "nwc",
      "x-object": "o",
      "x-oz-application": "oza",
      "x-pkcs7-certreqresp": "p7r",
      "x-python-code": [
        "pyc",
        "pyo"
      ],
      "x-qgis": [
        "qgs",
        "shp",
        "shx"
      ],
      "x-quicktimeplayer": "qtl",
      "x-redhat-package-manager": [
        "rpm",
        "rpa"
      ],
      "x-ruby": "rb",
      "x-sh": "sh",
      "x-shar": "shar",
      "x-shockwave-flash": [
        "swf",
        "swfl"
      ],
      "x-silverlight": "scr",
      "x-stuffit": "sit",
      "x-sv4cpio": "sv4cpio",
      "x-sv4crc": "sv4crc",
      "x-tar": "tar",
      "x-tex-gf": "gf",
      "x-tex-pk": "pk",
      "x-texinfo": [
        "texinfo",
        "texi"
      ],
      "x-trash": [
        "~",
        "%",
        "bak",
        "old",
        "sik"
      ],
      "x-ustar": "ustar",
      "x-wais-source": "src",
      "x-wingz": "wz",
      "x-x509-ca-cert": [
        "crt",
        "der",
        "cer"
      ],
      "x-xcf": "xcf",
      "x-xfig": "fig",
      "x-xpinstall": "xpi",
      "applixware": "aw",
      "atomsvc+xml": "atomsvc",
      "ccxml+xml": "ccxml",
      "cdmi-capability": "cdmia",
      "cdmi-container": "cdmic",
      "cdmi-domain": "cdmid",
      "cdmi-object": "cdmio",
      "cdmi-queue": "cdmiq",
      "docbook+xml": "dbk",
      "dssc+der": "dssc",
      "dssc+xml": "xdssc",
      "emma+xml": "emma",
      "epub+zip": "epub",
      "exi": "exi",
      "font-tdpfr": "pfr",
      "gml+xml": "gml",
      "gpx+xml": "gpx",
      "gxf": "gxf",
      "hyperstudio": "stk",
      "inkml+xml": [
        "ink",
        "inkml"
      ],
      "ipfix": "ipfix",
      "jsonml+json": "jsonml",
      "lost+xml": "lostxml",
      "mads+xml": "mads",
      "marc": "mrc",
      "marcxml+xml": "mrcx",
      "mathml+xml": [
        "mathml",
        "mml"
      ],
      "mbox": "mbox",
      "mediaservercontrol+xml": "mscml",
      "metalink+xml": "metalink",
      "metalink4+xml": "meta4",
      "mets+xml": "mets",
      "mods+xml": "mods",
      "mp21": [
        "m21",
        "mp21"
      ],
      "mp4": "mp4s",
      "oebps-package+xml": "opf",
      "omdoc+xml": "omdoc",
      "onenote": [
        "onetoc",
        "onetoc2",
        "onetmp",
        "onepkg"
      ],
      "oxps": "oxps",
      "patch-ops-error+xml": "xer",
      "pgp-encrypted": "pgp",
      "pkcs10": "p10",
      "pkcs7-mime": [
        "p7m",
        "p7c"
      ],
      "pkcs7-signature": "p7s",
      "pkcs8": "p8",
      "pkix-attr-cert": "ac",
      "pkix-crl": "crl",
      "pkix-pkipath": "pkipath",
      "pkixcmp": "pki",
      "pls+xml": "pls",
      "prs.cww": "cww",
      "pskc+xml": "pskcxml",
      "reginfo+xml": "rif",
      "relax-ng-compact-syntax": "rnc",
      "resource-lists+xml": "rl",
      "resource-lists-diff+xml": "rld",
      "rls-services+xml": "rs",
      "rpki-ghostbusters": "gbr",
      "rpki-manifest": "mft",
      "rpki-roa": "roa",
      "rsd+xml": "rsd",
      "sbml+xml": "sbml",
      "scvp-cv-request": "scq",
      "scvp-cv-response": "scs",
      "scvp-vp-request": "spq",
      "scvp-vp-response": "spp",
      "sdp": "sdp",
      "set-payment-initiation": "setpay",
      "set-registration-initiation": "setreg",
      "shf+xml": "shf",
      "sparql-query": "rq",
      "sparql-results+xml": "srx",
      "srgs": "gram",
      "srgs+xml": "grxml",
      "sru+xml": "sru",
      "ssdl+xml": "ssdl",
      "ssml+xml": "ssml",
      "tei+xml": [
        "tei",
        "teicorpus"
      ],
      "thraud+xml": "tfi",
      "timestamped-data": "tsd",
      "vnd.3gpp.pic-bw-large": "plb",
      "vnd.3gpp.pic-bw-small": "psb",
      "vnd.3gpp.pic-bw-var": "pvb",
      "vnd.3gpp2.tcap": "tcap",
      "vnd.3m.post-it-notes": "pwn",
      "vnd.accpac.simply.aso": "aso",
      "vnd.accpac.simply.imp": "imp",
      "vnd.acucobol": "acu",
      "vnd.acucorp": [
        "atc",
        "acutc"
      ],
      "vnd.adobe.air-application-installer-package+zip": "air",
      "vnd.adobe.formscentral.fcdt": "fcdt",
      "vnd.adobe.fxp": [
        "fxp",
        "fxpl"
      ],
      "vnd.adobe.xdp+xml": "xdp",
      "vnd.adobe.xfdf": "xfdf",
      "vnd.ahead.space": "ahead",
      "vnd.airzip.filesecure.azf": "azf",
      "vnd.airzip.filesecure.azs": "azs",
      "vnd.amazon.ebook": "azw",
      "vnd.americandynamics.acc": "acc",
      "vnd.amiga.ami": "ami",
      "vnd.anser-web-certificate-issue-initiation": "cii",
      "vnd.anser-web-funds-transfer-initiation": "fti",
      "vnd.antix.game-component": "atx",
      "vnd.apple.installer+xml": "mpkg",
      "vnd.apple.mpegurl": "m3u8",
      "vnd.aristanetworks.swi": "swi",
      "vnd.astraea-software.iota": "iota",
      "vnd.audiograph": "aep",
      "vnd.blueice.multipass": "mpm",
      "vnd.bmi": "bmi",
      "vnd.businessobjects": "rep",
      "vnd.chemdraw+xml": "cdxml",
      "vnd.chipnuts.karaoke-mmd": "mmd",
      "vnd.claymore": "cla",
      "vnd.cloanto.rp9": "rp9",
      "vnd.clonk.c4group": [
        "c4g",
        "c4d",
        "c4f",
        "c4p",
        "c4u"
      ],
      "vnd.cluetrust.cartomobile-config": "c11amc",
      "vnd.cluetrust.cartomobile-config-pkg": "c11amz",
      "vnd.commonspace": "csp",
      "vnd.contact.cmsg": "cdbcmsg",
      "vnd.cosmocaller": "cmc",
      "vnd.crick.clicker": "clkx",
      "vnd.crick.clicker.keyboard": "clkk",
      "vnd.crick.clicker.palette": "clkp",
      "vnd.crick.clicker.template": "clkt",
      "vnd.crick.clicker.wordbank": "clkw",
      "vnd.criticaltools.wbs+xml": "wbs",
      "vnd.ctc-posml": "pml",
      "vnd.cups-ppd": "ppd",
      "vnd.curl.car": "car",
      "vnd.curl.pcurl": "pcurl",
      "vnd.dart": "dart",
      "vnd.data-vision.rdz": "rdz",
      "vnd.dece.data": [
        "uvf",
        "uvvf",
        "uvd",
        "uvvd"
      ],
      "vnd.dece.ttml+xml": [
        "uvt",
        "uvvt"
      ],
      "vnd.dece.unspecified": [
        "uvx",
        "uvvx"
      ],
      "vnd.dece.zip": [
        "uvz",
        "uvvz"
      ],
      "vnd.denovo.fcselayout-link": "fe_launch",
      "vnd.dna": "dna",
      "vnd.dolby.mlp": "mlp",
      "vnd.dpgraph": "dpg",
      "vnd.dreamfactory": "dfac",
      "vnd.ds-keypoint": "kpxx",
      "vnd.dvb.ait": "ait",
      "vnd.dvb.service": "svc",
      "vnd.dynageo": "geo",
      "vnd.ecowin.chart": "mag",
      "vnd.enliven": "nml",
      "vnd.epson.esf": "esf",
      "vnd.epson.msf": "msf",
      "vnd.epson.quickanime": "qam",
      "vnd.epson.salt": "slt",
      "vnd.epson.ssf": "ssf",
      "vnd.eszigno3+xml": [
        "es3",
        "et3"
      ],
      "vnd.ezpix-album": "ez2",
      "vnd.ezpix-package": "ez3",
      "vnd.fdf": "fdf",
      "vnd.fdsn.mseed": "mseed",
      "vnd.fdsn.seed": [
        "seed",
        "dataless"
      ],
      "vnd.flographit": "gph",
      "vnd.fluxtime.clip": "ftc",
      "vnd.framemaker": [
        "fm",
        "frame",
        "maker",
        "book"
      ],
      "vnd.frogans.fnc": "fnc",
      "vnd.frogans.ltf": "ltf",
      "vnd.fsc.weblaunch": "fsc",
      "vnd.fujitsu.oasys": "oas",
      "vnd.fujitsu.oasys2": "oa2",
      "vnd.fujitsu.oasys3": "oa3",
      "vnd.fujitsu.oasysgp": "fg5",
      "vnd.fujitsu.oasysprs": "bh2",
      "vnd.fujixerox.ddd": "ddd",
      "vnd.fujixerox.docuworks": "xdw",
      "vnd.fujixerox.docuworks.binder": "xbd",
      "vnd.fuzzysheet": "fzs",
      "vnd.genomatix.tuxedo": "txd",
      "vnd.geogebra.file": "ggb",
      "vnd.geogebra.tool": "ggt",
      "vnd.geometry-explorer": [
        "gex",
        "gre"
      ],
      "vnd.geonext": "gxt",
      "vnd.geoplan": "g2w",
      "vnd.geospace": "g3w",
      "vnd.gmx": "gmx",
      "vnd.grafeq": [
        "gqf",
        "gqs"
      ],
      "vnd.groove-account": "gac",
      "vnd.groove-help": "ghf",
      "vnd.groove-identity-message": "gim",
      "vnd.groove-injector": "grv",
      "vnd.groove-tool-message": "gtm",
      "vnd.groove-tool-template": "tpl",
      "vnd.groove-vcard": "vcg",
      "vnd.hal+xml": "hal",
      "vnd.handheld-entertainment+xml": "zmm",
      "vnd.hbci": "hbci",
      "vnd.hhe.lesson-player": "les",
      "vnd.hp-hpgl": "hpgl",
      "vnd.hp-hpid": "hpid",
      "vnd.hp-hps": "hps",
      "vnd.hp-jlyt": "jlt",
      "vnd.hp-pcl": "pcl",
      "vnd.hp-pclxl": "pclxl",
      "vnd.hydrostatix.sof-data": "sfd-hdstx",
      "vnd.ibm.minipay": "mpy",
      "vnd.ibm.modcap": [
        "afp",
        "listafp",
        "list3820"
      ],
      "vnd.ibm.rights-management": "irm",
      "vnd.ibm.secure-container": "sc",
      "vnd.iccprofile": [
        "icc",
        "icm"
      ],
      "vnd.igloader": "igl",
      "vnd.immervision-ivp": "ivp",
      "vnd.immervision-ivu": "ivu",
      "vnd.insors.igm": "igm",
      "vnd.intercon.formnet": [
        "xpw",
        "xpx"
      ],
      "vnd.intergeo": "i2g",
      "vnd.intu.qbo": "qbo",
      "vnd.intu.qfx": "qfx",
      "vnd.ipunplugged.rcprofile": "rcprofile",
      "vnd.irepository.package+xml": "irp",
      "vnd.is-xpr": "xpr",
      "vnd.isac.fcs": "fcs",
      "vnd.jam": "jam",
      "vnd.jcp.javame.midlet-rms": "rms",
      "vnd.jisp": "jisp",
      "vnd.joost.joda-archive": "joda",
      "vnd.kahootz": [
        "ktz",
        "ktr"
      ],
      "vnd.kde.karbon": "karbon",
      "vnd.kde.kchart": "chrt",
      "vnd.kde.kformula": "kfo",
      "vnd.kde.kivio": "flw",
      "vnd.kde.kontour": "kon",
      "vnd.kde.kpresenter": [
        "kpr",
        "kpt"
      ],
      "vnd.kde.kspread": "ksp",
      "vnd.kde.kword": [
        "kwd",
        "kwt"
      ],
      "vnd.kenameaapp": "htke",
      "vnd.kidspiration": "kia",
      "vnd.kinar": [
        "kne",
        "knp"
      ],
      "vnd.koan": [
        "skp",
        "skd",
        "skt",
        "skm"
      ],
      "vnd.kodak-descriptor": "sse",
      "vnd.las.las+xml": "lasxml",
      "vnd.llamagraphics.life-balance.desktop": "lbd",
      "vnd.llamagraphics.life-balance.exchange+xml": "lbe",
      "vnd.lotus-1-2-3": "123",
      "vnd.lotus-approach": "apr",
      "vnd.lotus-freelance": "pre",
      "vnd.lotus-notes": "nsf",
      "vnd.lotus-organizer": "org",
      "vnd.lotus-screencam": "scm",
      "vnd.lotus-wordpro": "lwp",
      "vnd.macports.portpkg": "portpkg",
      "vnd.mcd": "mcd",
      "vnd.medcalcdata": "mc1",
      "vnd.mediastation.cdkey": "cdkey",
      "vnd.mfer": "mwf",
      "vnd.mfmp": "mfm",
      "vnd.micrografx.flo": "flo",
      "vnd.micrografx.igx": "igx",
      "vnd.mif": "mif",
      "vnd.mobius.daf": "daf",
      "vnd.mobius.dis": "dis",
      "vnd.mobius.mbk": "mbk",
      "vnd.mobius.mqy": "mqy",
      "vnd.mobius.msl": "msl",
      "vnd.mobius.plc": "plc",
      "vnd.mobius.txf": "txf",
      "vnd.mophun.application": "mpn",
      "vnd.mophun.certificate": "mpc",
      "vnd.ms-artgalry": "cil",
      "vnd.ms-cab-compressed": "cab",
      "vnd.ms-excel.addin.macroenabled.12": "xlam",
      "vnd.ms-excel.sheet.binary.macroenabled.12": "xlsb",
      "vnd.ms-excel.sheet.macroenabled.12": "xlsm",
      "vnd.ms-excel.template.macroenabled.12": "xltm",
      "vnd.ms-fontobject": "eot",
      "vnd.ms-htmlhelp": "chm",
      "vnd.ms-ims": "ims",
      "vnd.ms-lrm": "lrm",
      "vnd.ms-officetheme": "thmx",
      "vnd.ms-powerpoint.addin.macroenabled.12": "ppam",
      "vnd.ms-powerpoint.presentation.macroenabled.12": "pptm",
      "vnd.ms-powerpoint.slide.macroenabled.12": "sldm",
      "vnd.ms-powerpoint.slideshow.macroenabled.12": "ppsm",
      "vnd.ms-powerpoint.template.macroenabled.12": "potm",
      "vnd.ms-project": [
        "mpp",
        "mpt"
      ],
      "vnd.ms-word.document.macroenabled.12": "docm",
      "vnd.ms-word.template.macroenabled.12": "dotm",
      "vnd.ms-works": [
        "wps",
        "wks",
        "wcm",
        "wdb"
      ],
      "vnd.ms-wpl": "wpl",
      "vnd.ms-xpsdocument": "xps",
      "vnd.mseq": "mseq",
      "vnd.musician": "mus",
      "vnd.muvee.style": "msty",
      "vnd.mynfc": "taglet",
      "vnd.neurolanguage.nlu": "nlu",
      "vnd.nitf": [
        "ntf",
        "nitf"
      ],
      "vnd.noblenet-directory": "nnd",
      "vnd.noblenet-sealer": "nns",
      "vnd.noblenet-web": "nnw",
      "vnd.nokia.n-gage.data": "ngdat",
      "vnd.nokia.n-gage.symbian.install": "n-gage",
      "vnd.nokia.radio-preset": "rpst",
      "vnd.nokia.radio-presets": "rpss",
      "vnd.novadigm.edm": "edm",
      "vnd.novadigm.edx": "edx",
      "vnd.novadigm.ext": "ext",
      "vnd.oasis.opendocument.chart-template": "otc",
      "vnd.oasis.opendocument.formula-template": "odft",
      "vnd.oasis.opendocument.image-template": "oti",
      "vnd.olpc-sugar": "xo",
      "vnd.oma.dd2+xml": "dd2",
      "vnd.openofficeorg.extension": "oxt",
      "vnd.openxmlformats-officedocument.presentationml.slide": "sldx",
      "vnd.osgeo.mapguide.package": "mgp",
      "vnd.osgi.dp": "dp",
      "vnd.osgi.subsystem": "esa",
      "vnd.palm": [
        "pdb",
        "pqa",
        "oprc"
      ],
      "vnd.pawaafile": "paw",
      "vnd.pg.format": "str",
      "vnd.pg.osasli": "ei6",
      "vnd.picsel": "efif",
      "vnd.pmi.widget": "wg",
      "vnd.pocketlearn": "plf",
      "vnd.powerbuilder6": "pbd",
      "vnd.previewsystems.box": "box",
      "vnd.proteus.magazine": "mgz",
      "vnd.publishare-delta-tree": "qps",
      "vnd.pvi.ptid1": "ptid",
      "vnd.quark.quarkxpress": [
        "qxd",
        "qxt",
        "qwd",
        "qwt",
        "qxl",
        "qxb"
      ],
      "vnd.realvnc.bed": "bed",
      "vnd.recordare.musicxml": "mxl",
      "vnd.recordare.musicxml+xml": "musicxml",
      "vnd.rig.cryptonote": "cryptonote",
      "vnd.rn-realmedia": "rm",
      "vnd.rn-realmedia-vbr": "rmvb",
      "vnd.route66.link66+xml": "link66",
      "vnd.sailingtracker.track": "st",
      "vnd.seemail": "see",
      "vnd.sema": "sema",
      "vnd.semd": "semd",
      "vnd.semf": "semf",
      "vnd.shana.informed.formdata": "ifm",
      "vnd.shana.informed.formtemplate": "itp",
      "vnd.shana.informed.interchange": "iif",
      "vnd.shana.informed.package": "ipk",
      "vnd.simtech-mindmapper": [
        "twd",
        "twds"
      ],
      "vnd.smart.teacher": "teacher",
      "vnd.solent.sdkm+xml": [
        "sdkm",
        "sdkd"
      ],
      "vnd.spotfire.dxp": "dxp",
      "vnd.spotfire.sfs": "sfs",
      "vnd.stepmania.package": "smzip",
      "vnd.stepmania.stepchart": "sm",
      "vnd.sus-calendar": [
        "sus",
        "susp"
      ],
      "vnd.svd": "svd",
      "vnd.syncml+xml": "xsm",
      "vnd.syncml.dm+wbxml": "bdm",
      "vnd.syncml.dm+xml": "xdm",
      "vnd.tao.intent-module-archive": "tao",
      "vnd.tcpdump.pcap": [
        "pcap",
        "cap",
        "dmp"
      ],
      "vnd.tmobile-livetv": "tmo",
      "vnd.trid.tpt": "tpt",
      "vnd.triscape.mxs": "mxs",
      "vnd.trueapp": "tra",
      "vnd.ufdl": [
        "ufd",
        "ufdl"
      ],
      "vnd.uiq.theme": "utz",
      "vnd.umajin": "umj",
      "vnd.unity": "unityweb",
      "vnd.uoml+xml": "uoml",
      "vnd.vcx": "vcx",
      "vnd.visionary": "vis",
      "vnd.vsf": "vsf",
      "vnd.webturbo": "wtb",
      "vnd.wolfram.player": "nbp",
      "vnd.wqd": "wqd",
      "vnd.wt.stf": "stf",
      "vnd.xara": "xar",
      "vnd.xfdl": "xfdl",
      "vnd.yamaha.hv-dic": "hvd",
      "vnd.yamaha.hv-script": "hvs",
      "vnd.yamaha.hv-voice": "hvp",
      "vnd.yamaha.openscoreformat": "osf",
      "vnd.yamaha.openscoreformat.osfpvg+xml": "osfpvg",
      "vnd.yamaha.smaf-audio": "saf",
      "vnd.yamaha.smaf-phrase": "spf",
      "vnd.yellowriver-custom-menu": "cmp",
      "vnd.zul": [
        "zir",
        "zirz"
      ],
      "vnd.zzazz.deck+xml": "zaz",
      "voicexml+xml": "vxml",
      "widget": "wgt",
      "winhlp": "hlp",
      "wsdl+xml": "wsdl",
      "wspolicy+xml": "wspolicy",
      "x-ace-compressed": "ace",
      "x-authorware-bin": [
        "aab",
        "x32",
        "u32",
        "vox"
      ],
      "x-authorware-map": "aam",
      "x-authorware-seg": "aas",
      "x-blorb": [
        "blb",
        "blorb"
      ],
      "x-bzip": "bz",
      "x-bzip2": [
        "bz2",
        "boz"
      ],
      "x-cfs-compressed": "cfs",
      "x-chat": "chat",
      "x-conference": "nsc",
      "x-dgc-compressed": "dgc",
      "x-dtbncx+xml": "ncx",
      "x-dtbook+xml": "dtb",
      "x-dtbresource+xml": "res",
      "x-eva": "eva",
      "x-font-bdf": "bdf",
      "x-font-ghostscript": "gsf",
      "x-font-linux-psf": "psf",
      "x-font-pcf": "pcf",
      "x-font-snf": "snf",
      "x-font-ttf": [
        "ttf",
        "ttc"
      ],
      "x-font-type1": [
        "pfa",
        "pfb",
        "pfm",
        "afm"
      ],
      "x-freearc": "arc",
      "x-gca-compressed": "gca",
      "x-glulx": "ulx",
      "x-gramps-xml": "gramps",
      "x-install-instructions": "install",
      "x-lzh-compressed": [
        "lzh",
        "lha"
      ],
      "x-mie": "mie",
      "x-mobipocket-ebook": [
        "prc",
        "mobi"
      ],
      "x-ms-application": "application",
      "x-ms-shortcut": "lnk",
      "x-ms-xbap": "xbap",
      "x-msbinder": "obd",
      "x-mscardfile": "crd",
      "x-msclip": "clp",
      "application/x-ms-installer": "msi",
      "x-msmediaview": [
        "mvb",
        "m13",
        "m14"
      ],
      "x-msmetafile": [
        "wmf",
        "wmz",
        "emf",
        "emz"
      ],
      "x-msmoney": "mny",
      "x-mspublisher": "pub",
      "x-msschedule": "scd",
      "x-msterminal": "trm",
      "x-mswrite": "wri",
      "x-nzb": "nzb",
      "x-pkcs12": [
        "p12",
        "pfx"
      ],
      "x-pkcs7-certificates": [
        "p7b",
        "spc"
      ],
      "x-research-info-systems": "ris",
      "x-silverlight-app": "xap",
      "x-sql": "sql",
      "x-stuffitx": "sitx",
      "x-subrip": "srt",
      "x-t3vm-image": "t3",
      "x-tex-tfm": "tfm",
      "x-tgif": "obj",
      "x-xliff+xml": "xlf",
      "x-xz": "xz",
      "x-zmachine": [
        "z1",
        "z2",
        "z3",
        "z4",
        "z5",
        "z6",
        "z7",
        "z8"
      ],
      "xaml+xml": "xaml",
      "xcap-diff+xml": "xdf",
      "xenc+xml": "xenc",
      "xml-dtd": "dtd",
      "xop+xml": "xop",
      "xproc+xml": "xpl",
      "xslt+xml": "xslt",
      "xv+xml": [
        "mxml",
        "xhvml",
        "xvml",
        "xvm"
      ],
      "yang": "yang",
      "yin+xml": "yin",
      "envoy": "evy",
      "fractals": "fif",
      "internet-property-stream": "acx",
      "olescript": "axs",
      "vnd.ms-outlook": "msg",
      "vnd.ms-pkicertstore": "sst",
      "x-compress": "z",
      "x-perfmon": [
        "pma",
        "pmc",
        "pmr",
        "pmw"
      ],
      "ynd.ms-pkipko": "pko",
      "gzip": [
        "gz",
        "tgz"
      ],
      "smil+xml": [
        "smi",
        "smil"
      ],
      "vnd.debian.binary-package": [
        "deb",
        "udeb"
      ],
      "vnd.hzn-3d-crossword": "x3d",
      "vnd.sqlite3": [
        "db",
        "sqlite",
        "sqlite3",
        "db-wal",
        "sqlite-wal",
        "db-shm",
        "sqlite-shm"
      ],
      "vnd.wap.sic": "sic",
      "vnd.wap.slc": "slc",
      "x-krita": [
        "kra",
        "krz"
      ],
      "x-perl": [
        "pm",
        "pl"
      ],
      "yaml": [
        "yaml",
        "yml"
      ]
    },
    "audio": {
      "amr": "amr",
      "amr-wb": "awb",
      "annodex": "axa",
      "basic": [
        "au",
        "snd"
      ],
      "flac": "flac",
      "midi": [
        "mid",
        "midi",
        "kar",
        "rmi"
      ],
      "mpeg": [
        "mpga",
        "mpega",
        "mp3",
        "m4a",
        "mp2a",
        "m2a",
        "m3a"
      ],
      "mpegurl": "m3u",
      "ogg": [
        "oga",
        "ogg",
        "spx"
      ],
      "prs.sid": "sid",
      "x-aiff": "aifc",
      "x-gsm": "gsm",
      "x-ms-wma": "wma",
      "x-ms-wax": "wax",
      "x-pn-realaudio": "ram",
      "x-realaudio": "ra",
      "x-sd2": "sd2",
      "adpcm": "adp",
      "mp4": "mp4a",
      "s3m": "s3m",
      "silk": "sil",
      "vnd.dece.audio": [
        "uva",
        "uvva"
      ],
      "vnd.digital-winds": "eol",
      "vnd.dra": "dra",
      "vnd.dts": "dts",
      "vnd.dts.hd": "dtshd",
      "vnd.lucent.voice": "lvp",
      "vnd.ms-playready.media.pya": "pya",
      "vnd.nuera.ecelp4800": "ecelp4800",
      "vnd.nuera.ecelp7470": "ecelp7470",
      "vnd.nuera.ecelp9600": "ecelp9600",
      "vnd.rip": "rip",
      "webm": "weba",
      "x-caf": "caf",
      "x-matroska": "mka",
      "x-pn-realaudio-plugin": "rmp",
      "xm": "xm",
      "aac": "aac",
      "aiff": [
        "aiff",
        "aif",
        "aff"
      ],
      "opus": "opus",
      "wav": "wav"
    },
    "chemical": {
      "x-alchemy": "alc",
      "x-cache": [
        "cac",
        "cache"
      ],
      "x-cache-csf": "csf",
      "x-cactvs-binary": [
        "cbin",
        "cascii",
        "ctab"
      ],
      "x-cdx": "cdx",
      "x-chem3d": "c3d",
      "x-cif": "cif",
      "x-cmdf": "cmdf",
      "x-cml": "cml",
      "x-compass": "cpa",
      "x-crossfire": "bsd",
      "x-csml": [
        "csml",
        "csm"
      ],
      "x-ctx": "ctx",
      "x-cxf": [
        "cxf",
        "cef"
      ],
      "x-embl-dl-nucleotide": [
        "emb",
        "embl"
      ],
      "x-gamess-input": [
        "inp",
        "gam",
        "gamin"
      ],
      "x-gaussian-checkpoint": [
        "fch",
        "fchk"
      ],
      "x-gaussian-cube": "cub",
      "x-gaussian-input": [
        "gau",
        "gjc",
        "gjf"
      ],
      "x-gaussian-log": "gal",
      "x-gcg8-sequence": "gcg",
      "x-genbank": "gen",
      "x-hin": "hin",
      "x-isostar": [
        "istr",
        "ist"
      ],
      "x-jcamp-dx": [
        "jdx",
        "dx"
      ],
      "x-kinemage": "kin",
      "x-macmolecule": "mcm",
      "x-macromodel-input": "mmod",
      "x-mdl-molfile": "mol",
      "x-mdl-rdfile": "rd",
      "x-mdl-rxnfile": "rxn",
      "x-mdl-sdfile": "sd",
      "x-mdl-tgf": "tgf",
      "x-mmcif": "mcif",
      "x-mol2": "mol2",
      "x-molconn-Z": "b",
      "x-mopac-graph": "gpt",
      "x-mopac-input": [
        "mop",
        "mopcrt",
        "zmt"
      ],
      "x-mopac-out": "moo",
      "x-ncbi-asn1": "asn",
      "x-ncbi-asn1-ascii": [
        "prt",
        "ent"
      ],
      "x-ncbi-asn1-binary": "val",
      "x-rosdal": "ros",
      "x-swissprot": "sw",
      "x-vamas-iso14976": "vms",
      "x-vmd": "vmd",
      "x-xtel": "xtel",
      "x-xyz": "xyz"
    },
    "font": {
      "otf": "otf",
      "woff": "woff",
      "woff2": "woff2"
    },
    "image": {
      "gif": "gif",
      "ief": "ief",
      "jpeg": [
        "jpeg",
        "jpg",
        "jpe",
        "jfif",
        "jfif-tbnl",
        "jif"
      ],
      "pcx": "pcx",
      "png": "png",
      "svg+xml": [
        "svg",
        "svgz"
      ],
      "tiff": [
        "tiff",
        "tif"
      ],
      "vnd.djvu": [
        "djvu",
        "djv"
      ],
      "vnd.wap.wbmp": "wbmp",
      "x-canon-cr2": "cr2",
      "x-canon-crw": "crw",
      "x-cmu-raster": "ras",
      "x-coreldraw": "cdr",
      "x-coreldrawpattern": "pat",
      "x-coreldrawtemplate": "cdt",
      "x-corelphotopaint": "cpt",
      "x-epson-erf": "erf",
      "x-icon": "ico",
      "x-jg": "art",
      "x-jng": "jng",
      "x-nikon-nef": "nef",
      "x-olympus-orf": "orf",
      "x-portable-anymap": "pnm",
      "x-portable-bitmap": "pbm",
      "x-portable-graymap": "pgm",
      "x-portable-pixmap": "ppm",
      "x-rgb": "rgb",
      "x-xbitmap": "xbm",
      "x-xpixmap": "xpm",
      "x-xwindowdump": "xwd",
      "bmp": "bmp",
      "cgm": "cgm",
      "g3fax": "g3",
      "ktx": "ktx",
      "prs.btif": "btif",
      "sgi": "sgi",
      "vnd.dece.graphic": [
        "uvi",
        "uvvi",
        "uvg",
        "uvvg"
      ],
      "vnd.dwg": "dwg",
      "vnd.dxf": "dxf",
      "vnd.fastbidsheet": "fbs",
      "vnd.fpx": "fpx",
      "vnd.fst": "fst",
      "vnd.fujixerox.edmics-mmr": "mmr",
      "vnd.fujixerox.edmics-rlc": "rlc",
      "vnd.ms-modi": "mdi",
      "vnd.ms-photo": "wdp",
      "vnd.net-fpx": "npx",
      "vnd.xiff": "xif",
      "webp": "webp",
      "x-3ds": "3ds",
      "x-cmx": "cmx",
      "x-freehand": [
        "fh",
        "fhc",
        "fh4",
        "fh5",
        "fh7"
      ],
      "x-pict": [
        "pic",
        "pct"
      ],
      "x-tga": "tga",
      "cis-cod": "cod",
      "avif": "avifs",
      "heic": [
        "heif",
        "heic"
      ],
      "pjpeg": [
        "pjpg"
      ],
      "vnd.adobe.photoshop": "psd",
      "x-adobe-dng": "dng",
      "x-fuji-raf": "raf",
      "x-icns": "icns",
      "x-kodak-dcr": "dcr",
      "x-kodak-k25": "k25",
      "x-kodak-kdc": "kdc",
      "x-minolta-mrw": "mrw",
      "x-panasonic-raw": [
        "raw",
        "rw2",
        "rwl"
      ],
      "x-pentax-pef": [
        "pef",
        "ptx"
      ],
      "x-sigma-x3f": "x3f",
      "x-sony-arw": "arw",
      "x-sony-sr2": "sr2",
      "x-sony-srf": "srf"
    },
    "message": {
      "rfc822": [
        "eml",
        "mime",
        "mht",
        "mhtml",
        "nws"
      ]
    },
    "model": {
      "iges": [
        "igs",
        "iges"
      ],
      "mesh": [
        "msh",
        "mesh",
        "silo"
      ],
      "vrml": [
        "wrl",
        "vrml"
      ],
      "x3d+vrml": [
        "x3dv",
        "x3dvz"
      ],
      "x3d+xml": "x3dz",
      "x3d+binary": [
        "x3db",
        "x3dbz"
      ],
      "vnd.collada+xml": "dae",
      "vnd.dwf": "dwf",
      "vnd.gdl": "gdl",
      "vnd.gtw": "gtw",
      "vnd.mts": "mts",
      "vnd.usdz+zip": "usdz",
      "vnd.vtu": "vtu"
    },
    "text": {
      "cache-manifest": [
        "manifest",
        "appcache"
      ],
      "calendar": [
        "ics",
        "icz",
        "ifb"
      ],
      "css": "css",
      "csv": "csv",
      "h323": "323",
      "html": [
        "html",
        "htm",
        "shtml",
        "stm"
      ],
      "iuls": "uls",
      "plain": [
        "txt",
        "text",
        "brf",
        "conf",
        "def",
        "list",
        "log",
        "in",
        "bas",
        "diff",
        "ksh"
      ],
      "richtext": "rtx",
      "scriptlet": [
        "sct",
        "wsc"
      ],
      "texmacs": "tm",
      "tab-separated-values": "tsv",
      "vnd.sun.j2me.app-descriptor": "jad",
      "vnd.wap.wml": "wml",
      "vnd.wap.wmlscript": "wmls",
      "x-bibtex": "bib",
      "x-boo": "boo",
      "x-c++hdr": [
        "h++",
        "hpp",
        "hxx",
        "hh"
      ],
      "x-c++src": [
        "c++",
        "cpp",
        "cxx",
        "cc"
      ],
      "x-component": "htc",
      "x-dsrc": "d",
      "x-diff": "patch",
      "x-haskell": "hs",
      "x-java": "java",
      "x-literate-haskell": "lhs",
      "x-moc": "moc",
      "x-pascal": [
        "p",
        "pas",
        "pp",
        "inc"
      ],
      "x-pcs-gcd": "gcd",
      "x-python": "py",
      "x-scala": "scala",
      "x-setext": "etx",
      "x-tcl": [
        "tcl",
        "tk"
      ],
      "x-tex": [
        "tex",
        "ltx",
        "sty",
        "cls"
      ],
      "x-vcalendar": "vcs",
      "x-vcard": "vcf",
      "n3": "n3",
      "prs.lines.tag": "dsc",
      "sgml": [
        "sgml",
        "sgm"
      ],
      "troff": [
        "t",
        "tr",
        "roff",
        "man",
        "me",
        "ms"
      ],
      "turtle": "ttl",
      "uri-list": [
        "uri",
        "uris",
        "urls"
      ],
      "vcard": "vcard",
      "vnd.curl": "curl",
      "vnd.curl.dcurl": "dcurl",
      "vnd.curl.scurl": "scurl",
      "vnd.curl.mcurl": "mcurl",
      "vnd.dvb.subtitle": "sub",
      "vnd.fly": "fly",
      "vnd.fmi.flexstor": "flx",
      "vnd.graphviz": "gv",
      "vnd.in3d.3dml": "3dml",
      "vnd.in3d.spot": "spot",
      "x-asm": [
        "s",
        "asm"
      ],
      "x-c": [
        "c",
        "h",
        "dic"
      ],
      "x-fortran": [
        "f",
        "for",
        "f77",
        "f90"
      ],
      "x-opml": "opml",
      "x-nfo": "nfo",
      "x-sfv": "sfv",
      "x-uuencode": "uu",
      "webviewhtml": "htt",
      "javascript": "js",
      "json": "json",
      "markdown": [
        "md",
        "markdown",
        "mdown",
        "markdn"
      ],
      "vnd.wap.si": "si",
      "vnd.wap.sl": "sl"
    },
    "video": {
      "avif": "avif",
      "3gpp": "3gp",
      "annodex": "axv",
      "dl": "dl",
      "dv": [
        "dif",
        "dv"
      ],
      "fli": "fli",
      "gl": "gl",
      "mpeg": [
        "mpeg",
        "mpg",
        "mpe",
        "m1v",
        "m2v",
        "mp2",
        "mpa",
        "mpv2"
      ],
      "mp4": [
        "mp4",
        "mp4v",
        "mpg4"
      ],
      "quicktime": [
        "qt",
        "mov"
      ],
      "ogg": "ogv",
      "vnd.mpegurl": [
        "mxu",
        "m4u"
      ],
      "x-flv": "flv",
      "x-la-asf": [
        "lsf",
        "lsx"
      ],
      "x-mng": "mng",
      "x-ms-asf": [
        "asf",
        "asx",
        "asr"
      ],
      "x-ms-wm": "wm",
      "x-ms-wmv": "wmv",
      "x-ms-wmx": "wmx",
      "x-ms-wvx": "wvx",
      "x-msvideo": "avi",
      "x-sgi-movie": "movie",
      "x-matroska": [
        "mpv",
        "mkv",
        "mk3d",
        "mks"
      ],
      "3gpp2": "3g2",
      "h261": "h261",
      "h263": "h263",
      "h264": "h264",
      "jpeg": "jpgv",
      "jpm": [
        "jpm",
        "jpgm"
      ],
      "mj2": [
        "mj2",
        "mjp2"
      ],
      "vnd.dece.hd": [
        "uvh",
        "uvvh"
      ],
      "vnd.dece.mobile": [
        "uvm",
        "uvvm"
      ],
      "vnd.dece.pd": [
        "uvp",
        "uvvp"
      ],
      "vnd.dece.sd": [
        "uvs",
        "uvvs"
      ],
      "vnd.dece.video": [
        "uvv",
        "uvvv"
      ],
      "vnd.dvb.file": "dvb",
      "vnd.fvt": "fvt",
      "vnd.ms-playready.media.pyv": "pyv",
      "vnd.uvvu.mp4": [
        "uvu",
        "uvvu"
      ],
      "vnd.vivo": "viv",
      "webm": "webm",
      "x-f4v": "f4v",
      "x-m4v": "m4v",
      "x-ms-vob": "vob",
      "x-smv": "smv",
      "mp2t": "ts"
    },
    "x-conference": {
      "x-cooltalk": "ice"
    },
    "x-world": {
      "x-vrml": [
        "vrm",
        "flr",
        "wrz",
        "xaf",
        "xof"
      ]
    }
  };
  var mimeTypes = (() => {
    const mimeTypes2 = {};
    for (const type of Object.keys(table)) {
      for (const subtype of Object.keys(table[type])) {
        const value = table[type][subtype];
        if (typeof value == "string") {
          mimeTypes2[value] = type + "/" + subtype;
        } else {
          for (let indexMimeType = 0; indexMimeType < value.length; indexMimeType++) {
            mimeTypes2[value[indexMimeType]] = type + "/" + subtype;
          }
        }
      }
    }
    return mimeTypes2;
  })();
  function getMimeType(filename) {
    return filename && mimeTypes[filename.split(".").pop().toLowerCase()] || "application/octet-stream";
  }

  // app/jgvdb.ts
  var JGVDB = class {
    /** Reference for export function what to name the file (in both downloadURI and when creating the File blob) */
    filename = "";
    static async generate() {
      throw new Error("Implementation must provide this");
    }
    /**
     * Exports the configuration to the User's Downloads folder. Calls `JGVDB.zip()` and automatically downloads it.
     * @returns Promise resolves when exported (when download starts), or rejects, if something went wrong.
     */
    export() {
      throw new Error("Implementation must provide this");
    }
    /**
     * Imports the configuration into the User's Browser. Calls necessary classes and functions and user confirmations automatically.
     * @returns Promise resolves when imported, and rejects if user cancels or something went wrong.
     */
    import() {
      throw new Error("Implementation must provide this");
    }
    /** Takes a ZIP and unzips it. Combine with Import for auto-delegation. */
    static async unzip(file) {
      const zipEntries = await new zip.ZipReader(new zip.BlobReader(file)).getEntries();
      const filesPromised = zipEntries.map(async (v) => {
        const data = await v.getData?.(new zip.BlobWriter());
        if (data) {
          return new File([data], v.filename, { lastModified: Number(v.rawLastModDate), type: getMimeType(v.filename) });
        }
      });
      const files = [];
      for (const f of filesPromised) {
        const solved = await f;
        if (solved) files.push(solved);
      }
      let configFile = void 0;
      const filteredFiles = [];
      files.forEach((f) => {
        if (f.name == "conf.json") {
          configFile = f;
        } else {
          filteredFiles.push(f);
        }
      });
      let config;
      if (configFile) {
        config = JSON.parse(await configFile.text());
      } else {
        config = void 0;
      }
      return {
        config,
        files: filteredFiles
      };
    }
    static import(config, files) {
      let prep;
      switch (config.type) {
        case 0:
          if (config.version === 0) {
            prep = new JGVDB_DB(JGVDB_DB.updateFrom0(config), files);
          } else {
            prep = new JGVDB_DB(config, files);
          }
          return prep.import();
        case 1:
          if (config.version === 0) {
            prep = new JGVDB_MC(JGVDB_MC.updateFrom0(config), files);
          } else {
            prep = new JGVDB_MC(config, files);
          }
          return prep.import(settings.importAsTemporary === true);
        case 2:
          if (config.version === 0) {
            prep = new JGVDB_SG(JGVDB_SG.updateFrom0(config));
          } else {
            prep = new JGVDB_SG(config);
          }
          return prep.import();
        default:
          const errmsg = `JGVDB type is unknown: ${config.type}. Must be one of 0, 1, or 2.`;
          alert(errmsg + " See console for more info about the config element found/given.");
          throw new Error(errmsg, { cause: config });
      }
    }
    /** Make JGVDB File and return it */
    static async zip(contents, filename) {
      const zipper = new zip.BlobWriter("application/zip");
      const writer = new zip.ZipWriter(zipper);
      const promises = contents.map((f) => {
        return writer.add(f.name, new zip.BlobReader(f), { lastModDate: new Date(f.lastModified) });
      });
      await Promise.all(promises);
      return new File([await writer.close()], filename, { type: "application/zip" });
    }
    /** Standard procedure for downloading */
    static download(file, filename) {
      const u = URL.createObjectURL(file);
      downloadURI(u, filename);
      revokeBlobSoonTM(u);
    }
    version = 1;
    /** These Files are finished for zipping up. This means their name includes the ID. */
    blobsInZip = [];
    config = {
      type: -1,
      version: -1
    };
    constructor() {
    }
  };
  var JGVDB_DB = class _JGVDB_DB extends JGVDB {
    filename = "Database.jgvdb";
    config;
    blobsInZip;
    constructor(config, blobs) {
      super();
      this.config = config;
      this.blobsInZip = blobs;
    }
    async export() {
      const files = Array.from(this.blobsInZip);
      files.push(new File([JSON.stringify(this.config)], "conf.json"));
      const result = await JGVDB.zip(files, this.filename);
      JGVDB.download(result, this.filename);
    }
    async import(importCollections = true) {
      if (importCollections) {
        const blobs = this.blobsInZip.reduce((prev, file) => {
          const [id, ...filename] = file.name.split("__");
          if (!id) return prev;
          return { ...prev, [id]: new File([file], filename.join("__"), { lastModified: file.lastModified, type: file.type }) };
        }, {});
        Object.entries(this.config.data.mediaCollections).map(async (val) => {
          const metadata = val[1];
          const collectionPromise = collectionManager.newCollection("database");
          const filteredBlobs = metadata.data.map((id) => blobs[id]);
          const collection = await collectionPromise;
          collection.rename(metadata.name);
          collection.append(...filteredBlobs);
        });
      }
      confirmation("Overwrite settings?", () => {
        settings.replaceObject(this.config.data.settings);
        reloadSettings();
      });
    }
    static async generate() {
      const dump = await collectionManager.dump();
      const blobsInZip = dump.blobs.map((blob) => {
        if (blob.blob instanceof File) {
          return new File([blob.blob], blob.id + "__" + (blob.blob.name ?? ""), { lastModified: blob.blob.lastModified, type: blob.blob.type });
        } else {
          return new File([blob.blob], blob.id + "__No Name");
        }
      });
      return new _JGVDB_DB({
        type: 0,
        version: 1,
        data: {
          mediaCollections: Object.entries(dump.collections).reduce((prev, c) => ({
            ...prev,
            [c[0]]: {
              name: c[1].metadata.name,
              data: c[1].order
            }
          }), {}),
          settings
        }
      }, blobsInZip);
    }
    /**
     * Update old config version from 0 to 1
     */
    static updateFrom0(config) {
      function fixUpMC(data) {
        const parsed = {
          mediaCollections: JSON.parse(data.mediaCollections),
          // mediaOrder: JSON.parse(data.mediaOrder),
          settings: JSON.parse(data.mediaOrder)
        };
        const newData = {
          settings: parsed.settings,
          mediaCollections: Object.entries(parsed.mediaCollections).map((v) => {
            if (v[0] === "collections" || v[0] === "current") {
              return void 0;
            } else {
              return Object.fromEntries([v]);
            }
          }).filter((v) => v !== void 0)
          // TS, trust me, even though I don't trust myself
        };
        return newData;
      }
      return {
        type: 0,
        version: 1,
        data: fixUpMC(config.data)
      };
    }
  };
  var JGVDB_MC = class extends JGVDB {
    filename;
    config;
    blobsInZip;
    constructor(config, blobsInZip) {
      super();
      this.config = config;
      this.filename = config.data.name + ".jgvdb";
      this.blobsInZip = blobsInZip;
    }
    async export() {
      const files = Array.from(this.blobsInZip);
      files.push(new File([JSON.stringify(this.config)], "conf.json", { type: "application/zip" }));
      const final = await JGVDB.zip(files, this.filename);
      const u = URL.createObjectURL(final);
      downloadURI(u, this.filename);
      revokeBlobSoonTM(u);
    }
    async import(temporarily = false) {
      const collectionPromise = collectionManager.newCollection(temporarily ? "temporary" : "database");
      const blobs = this.blobsInZip.reduce((prev, file) => {
        const [id, ...filename] = file.name.split("__");
        if (!id) return prev;
        return { ...prev, [id]: new File([file], filename.join("__"), { lastModified: file.lastModified, type: file.type }) };
      }, {});
      const orderedBlobs = this.config.data.data.map((id) => blobs[id]).filter((v) => v !== void 0);
      const collection = await collectionPromise;
      collection.append(...orderedBlobs);
      collection.rename(this.config.data.name);
      return collection.id;
    }
    static async generate(mediaCollection) {
      let collection;
      if (!(mediaCollection instanceof MediaCollection)) {
        collection = await MediaCollection.load(mediaCollection);
      } else {
        collection = mediaCollection;
      }
      const blobsInZip = Object.entries(collection.blobs).map((v) => new File([v[1]], v[0] + "__" + (v[1].name ?? ""), { lastModified: v[1].lastModified, type: v[1].type }));
      return new this({
        type: 1,
        version: 1,
        data: {
          name: collection.name,
          data: collection.order
        }
      }, blobsInZip);
    }
    static updateFrom0(config) {
      return {
        type: 1,
        version: 1,
        data: config.data
      };
    }
  };
  async function exportMCAsZip(mediaCollection) {
    let collection;
    if (!(mediaCollection instanceof MediaCollection)) {
      collection = await MediaCollection.load(mediaCollection);
    } else {
      collection = mediaCollection;
    }
    const filename = collection.name + ".zip";
    const zip2 = await JGVDB.zip(Object.values(collection.blobs).map((f) => {
      if (f instanceof File) return f;
      return new File([f], "Unknown File", { type: f.type });
    }), filename);
    JGVDB.download(zip2, filename);
  }
  var JGVDB_SG = class _JGVDB_SG extends JGVDB {
    filename = "settings.jgvdb";
    config;
    constructor(config) {
      super();
      this.config = config;
    }
    async export() {
      const final = await JGVDB.zip(
        [new File([JSON.stringify(this.config)], "conf.json", { type: "application/json" })],
        this.filename
      );
      const u = URL.createObjectURL(final);
      downloadURI(u, this.filename);
      revokeBlobSoonTM(u);
    }
    async import() {
      return new Promise((resolve, reject) => {
        confirmation("This will overwrite your current settings. Are you sure?", () => {
          settings.replaceObject(this.config.data);
          reloadSettings();
          resolve();
        }, reject);
      });
    }
    static async generate() {
      return new Promise((resolve) => {
        resolve(new _JGVDB_SG({
          type: 2,
          version: 1,
          data: settings
        }));
      });
    }
    static updateFrom0(config) {
      return {
        type: 2,
        version: 1,
        data: config.data
      };
    }
  };

  // app/globals.ts
  var galleryElm;
  var navbar;
  var collectionManager;
  var dragulaDragging = false;
  var mediaSizesStylesheet2 = document.head.appendChild(document.createElement("style"));
  var systemd = new Dependant(["viewerCompletion", "galleryFirstLoad", "loadingSettings"]);
  window.addEventListener("load", async () => {
    navbar = document.querySelector("nav");
    galleryElm = document.getElementsByTagName("jgv-gallery")[0];
    window.galleryElm = galleryElm;
    collectionManager = await MediaCollectionsManager.init(galleryElm);
    window.collectionManager = collectionManager;
    window.addEventListener("unload", () => {
      collectionManager.save();
    });
    window.mediadb = mediadb;
    systemd.resolve("galleryFirstLoad");
    systemd.resolve("viewerCompletion");
    document.getElementById("browserinfo").innerText = `${navigator.userAgent}`;
    updateStorageInfo();
  });
  var manualOpenNavbar = {
    t: function() {
      if (manualOpenNavbar.c()) {
        navbar.classList.remove("active");
      } else {
        navbar.classList.add("active");
      }
    },
    c: function() {
      return navbar.classList.contains("active");
    },
    s: function(val) {
      val ? navbar.classList.add("active") : navbar.classList.remove("active");
    }
  };
  async function autoImportUnknownData(...files) {
    const easilyAppendableFiles = files.map(async (f) => {
      if (/^(image\/|video\/)/g.test(f.type)) {
        return f;
      } else if (f.type === "application/zip") {
        if (f instanceof File) {
          if (f.name.endsWith(".jgvdb")) {
            JGVDB.unzip(f).then((f2) => JGVDB.import(f2.config, f2.files));
          } else {
            JGVDB.unzip(f).then((f2) => autoImportUnknownData(...f2.files));
          }
        } else {
          JGVDB.unzip(f).then((f2) => autoImportUnknownData(...f2.files));
        }
      }
    });
    let appendable = [];
    for (const f of easilyAppendableFiles) {
      const ff = await f;
      if (ff) appendable.push(ff);
    }
    collectionManager.current.append(...appendable);
  }
  async function getImageOnline(urls, resolve) {
    const splitted = urls.map((v) => v.split("\n"));
    const set = new Set(splitted.flat());
    const deduplicatedUrls = Array.from(set);
    deduplicatedUrls.forEach((url) => {
      try {
        new URL(url);
      } catch (error) {
        console.warn("Invalid url.", url);
        resolve();
        return;
      }
      let xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "blob";
      xhr.onload = function() {
        if (xhr.status === 200) {
          autoImportUnknownData(xhr.response);
          resolve();
        } else {
          console.error("Something went wrong trying to fetch this image (Post Download)!", xhr.status, xhr, url);
          manualdl.init(url);
          resolve();
        }
      };
      xhr.onerror = function() {
        console.error("Something went wrong trying to fetch this image (While sending request)!", xhr.status, xhr, url);
        manualdl.init(url);
        resolve();
      };
      xhr.send();
    });
  }
  var manualdl = {
    /**
     * Download external images by asking the user nicely to do it
     * @param url URL to prompt the user to download
     * @returns 
     */
    init: function(url) {
      let id = uuidtime();
      let html = new DOMParser().parseFromString(`<div id="${id}" class="manualdl">
    <div>
        <div class="manualdl-instruction">
            <h1>Manually copy + paste this image.</h1>
            <div>
                <div>
                    <ol>
                        <li>Right Click Image</li>
                        <li>Press copy image</li>
                        <li>Click outside of it and Ctrl + V</li>
                    </ol>
                    <p style="width: min-content; min-width: 100%">If there's only a &lt;color between BG and FG&gt; box below, then it sadly did not work and you need to find another way.</p>
                </div>
                <img src="./assets/how to import external link when cors is stupid.gif">
            </div>
        </div>
        <iframe class="manualdl-todo"></iframe>
        <button onclick="()=>{manualdl.exit('${id}')}" class="manualdl-exit">X</button>
    </div>
    <div onclick="()=>{manualdl.exit('${id}')}" class="manualdl-alt-exit"></div>
</div>`, "text/html").body.firstChild;
      let iframe = html.querySelector(".manualdl-todo");
      iframe.src = url;
      html.addEventListener("paste", (e) => {
        if (e.clipboardData?.files) {
          autoImportUnknownData(...e.clipboardData.files);
          manualdl.exit(id);
        }
      });
      html.querySelector(".manualdl-exit").addEventListener("click", () => {
        manualdl.exit(id);
      });
      html.querySelector(".manualdl-alt-exit").addEventListener("click", () => {
        manualdl.exit(id);
      });
      document.body.append(html);
      return id;
    },
    /**
     * Internal function for quitting the interface
     * @param id 
     */
    exit: function(id) {
      document.getElementById(id)?.remove();
    }
  };

  // app/html-integration.ts
  window.confirmation = confirmation;
  window.jgvdb = {
    exportSettings: () => {
      JGVDB_SG.generate().then((v) => v.export());
    },
    exportDatabase: () => {
      JGVDB_DB.generate().then((v) => v.export());
    },
    exportCurrentCollection: () => {
      JGVDB_MC.generate(collectionManager.current).then((v) => v.export());
    },
    exportCurrentCollectionAsZip: () => {
      exportMCAsZip(collectionManager.current);
    },
    newCollectionAndSwitch: async (temporary) => {
      const collection = await collectionManager.newCollection(temporary ? "temporary" : "database");
      collectionManager.switchCollection(collection);
    },
    deleteCurrentCollection: () => {
      collectionManager.deleteCurrentCollection();
    },
    deleteDatabase: () => {
      collectionManager.deleteEverything();
    }
  };
  window.settingsReset = settingsReset;
  window.settings = settings;
  window.updateStorageInfo = updateStorageInfo;
  window.MediaCollection = MediaCollection;

  // app/filesystem.ts
  function getFSFiles(item) {
    return new Promise(async (resolve, reject) => {
      if (item instanceof FileSystemFileEntry) {
        item.file((f) => resolve([f]), reject);
        return;
      }
      if (item instanceof FileSystemDirectoryEntry) {
        let readerSuccess2 = function(entries) {
          entries.forEach((entry) => {
            if (entry instanceof FileSystemFileEntry) {
              const prom = new Promise((resolve2, reject2) => entry.file(resolve2, reject2));
              result.push(prom);
            } else if (entry instanceof FileSystemDirectoryEntry) {
              if (settings.dontImportSubfolders) return;
              readRecursively2(entry);
            }
          });
        }, readRecursively2 = function(fsd) {
          const reader = fsd.createReader();
          reader.readEntries(readerSuccess2);
        };
        var readerSuccess = readerSuccess2, readRecursively = readRecursively2;
        const result = [];
        readRecursively2(item);
        const awaitedResult = [];
        for (const promiseResult of result) {
          awaitedResult.push(await promiseResult);
        }
        resolve(awaitedResult);
      }
      throw new Error("How do you have NEITHER a file NOR a directory, what the FUCK bro", { cause: item });
    });
  }

  // app/app.ts
  configureSync({
    sinks: {
      console: getConsoleSink()
    },
    loggers: [
      {
        category: "JGV",
        lowestLevel: "debug",
        sinks: ["console"]
      },
      {
        category: "MediaDatabase",
        lowestLevel: "debug",
        sinks: ["console"]
      },
      {
        category: "MediaCollection",
        lowestLevel: "debug",
        sinks: ["console"]
      },
      {
        category: "MediaCollectionsManager",
        lowestLevel: "debug",
        sinks: ["console"]
      },
      {
        category: "Settings",
        lowestLevel: "debug",
        sinks: ["console"]
      },
      { category: ["logtape", "meta"], lowestLevel: "warning", sinks: ["console"] }
    ]
  });
  var sortMCOpts = (a, b) => {
    if (!a || !b) return 0;
    const alow = a.innerText.toLocaleLowerCase();
    const blow = b.innerText.toLocaleLowerCase();
    if (alow < blow) {
      return -1;
    } else if (alow > blow) {
      return 1;
    }
    return 0;
  };
  var MCSelectorManager = class {
    input;
    collectionAdded(e) {
      if (!e.id) return;
      const opt = this.createOpt(e.id);
      let looping = true;
      let i = 0;
      const children = this.input.children;
      for (let i2 = 0; i2 < this.input.childElementCount; i2++) {
        const element = children[i2];
        if (opt.innerText.toLocaleLowerCase() < element.innerText) {
          this.input.insertBefore(opt, element);
          break;
        }
      }
      if (looping === true) {
        this.input.appendChild(opt);
      }
    }
    collectionRemoved(e) {
      this.input.querySelector(`[value="${e.id}"]`).remove();
    }
    collectionRenamed(e) {
      this.input.querySelector(`[value="${e.id}"]`).innerText = e.newName;
    }
    collectionSwitched(e) {
      if (e.collection.id) this.input.value = e.collection.id;
    }
    createOpt(val) {
      let name, id;
      if (typeof val === "string") {
        const metadata = MediaCollection.getMetadata(val);
        name = metadata.name;
        id = val;
      } else {
        if (val.id === null) return;
        name = val.name;
        id = val.id;
      }
      let opt = document.createElement("option");
      opt.value = id;
      opt.innerText = name ?? "Invalid Collection Name \u2014 Something went terribly wrong.";
      if (id === collectionManager.current.id) {
        opt.setAttribute("selected", "");
      }
      return opt;
    }
    constructor(elm) {
      this.input = elm;
      const elms = collectionManager.available.map((id) => this.createOpt(id)).filter((v) => v !== void 0);
      elms.sort(sortMCOpts);
      this.input.append(...elms);
      this.input.addEventListener("change", () => {
        if (this.input.selectedIndex === -1) return;
        const selected = this.input.options[this.input.selectedIndex];
        collectionManager.switchCollection(selected.value);
      });
      window.addEventListener("collectionadded", (e) => {
        this.collectionAdded(e);
      });
      window.addEventListener("collectionremoved", (e) => {
        this.collectionRemoved(e);
      });
      window.addEventListener("collectionrenamed", (e) => {
        this.collectionRenamed(e);
      });
      galleryElm.addEventListener("collectionswitched", (e) => {
        this.collectionSwitched(e);
      });
    }
  };
  window.addEventListener("load", async () => {
    await systemd.promises["galleryFirstLoad"];
    const nameEditor = document.getElementById("changeCollectionName");
    nameEditor.value = galleryElm.collection.name;
    nameEditor.addEventListener("input", (e) => {
      galleryElm.collection.rename(nameEditor.value);
    });
    galleryElm.addEventListener("collectionswitched", (e) => {
      e = e;
      nameEditor.value = galleryElm.collection.name;
    });
    window.addEventListener("collectionrenamed", (e) => {
      if (e instanceof MediaCollectionEvent) {
        if (e.newName && collectionManager.current.id === e.id && e.newName !== nameEditor.value) {
          nameEditor.value = e.newName;
        }
      }
    });
    const collectionSelector = document.getElementById("selectCollection");
    new MCSelectorManager(collectionSelector);
  });
  window.addEventListener("mouseup", async (e) => {
    await systemd.promises["galleryFirstLoad"];
    if (!navbar?.contains(e.target) && navbar.classList.contains("active")) manualOpenNavbar.s(false);
  });
  function toggleFilePickerDir(e) {
    const attrs = ["webkitdirectory", "directory"];
    if (e.key == "Control" && e.type == "keydown") {
      attrs.forEach((attr) => {
        document.getElementById("filePicker").setAttribute(attr, "");
      });
    } else if (e.type == "keyup") {
      attrs.forEach((attr) => {
        document.getElementById("filePicker").removeAttribute(attr);
      });
    }
  }
  window.addEventListener("load", () => {
    document.body.addEventListener("keydown", (e) => {
      toggleFilePickerDir(e);
    });
    document.body.addEventListener("keyup", (e) => {
      toggleFilePickerDir(e);
    });
  });
  async function generalPastingAndDroppingMediaDealer(e) {
    e.preventDefault();
    let theItems;
    if (e instanceof DragEvent) {
      if (e.dataTransfer?.items) {
        theItems = e.dataTransfer.items;
      } else return;
    } else if (e instanceof ClipboardEvent) {
      try {
        const items = await navigator.clipboard.read();
        theItems = items;
      } catch (error) {
        console.warn("Full clipboard access is not allowed.", error);
        if (e.clipboardData) {
          const text = e.clipboardData.getData("text/plain");
          if (text === "") return;
          try {
            new URL(text);
          } catch (error2) {
            console.warn("Given text not URL-able");
            return;
          }
          theItems = new DataTransferItemList();
          theItems.add(text, "text/uri");
        } else return;
      }
    } else {
      throw new Error("Wrong Event type", { cause: e });
    }
    if (theItems.length === 0) return;
    if (theItems.length === 1) {
      let item = void 0, condition;
      if (theItems[0] instanceof DataTransferItem) {
        item = theItems[0];
        condition = item.kind === "file";
      } else if (theItems[0] instanceof ClipboardItem) {
        item = theItems[0];
        condition = item.types.some((v) => v === "application/zip");
      } else {
        condition = false;
      }
      if (condition && item) {
        let file = void 0;
        if (item instanceof DataTransferItem) {
          const maybe = item.getAsFile();
          if (maybe) {
            if (maybe.type === "application/zip") file = maybe;
          }
        } else if (item instanceof ClipboardItem) {
          file = await item.getType("application/zip");
        }
        if (file) {
          const data = await JGVDB.unzip(file);
          if (data.config) {
            const id = await JGVDB.import(data.config, data.files);
            if (typeof id === "string") {
              collectionManager.switchCollection(id);
            }
          } else {
            autoImportUnknownData(...data.files);
          }
          return;
        }
      }
    }
    let listOfMedia = [];
    if (theItems instanceof DataTransferItemList) {
      const urls = [];
      for (let item of Object.values(theItems)) {
        if (item.kind == "file") {
          const itemFS = item.webkitGetAsEntry();
          if (itemFS) listOfMedia.push(getFSFiles(itemFS));
        } else if (item.kind == "string" && (item.type == "text/x-moz-url" || item.type == "text/uri-list")) {
          item.getAsString((urllist) => {
            urls.push(urllist);
          });
        }
      }
      getImageOnline(urls, () => {
      });
    } else if (theItems[0] instanceof ClipboardItem) {
      const items = theItems;
      const urls = [];
      for (const item of items) {
        let urllist = void 0;
        switch (true) {
          case item.types.includes("text/uri-list"):
            urllist = await (await item.getType("text/uri-list")).text();
            break;
          case item.types.includes("text/plain"):
            urllist = await (await item.getType("text/plain")).text();
            break;
          case item.types.includes("text/x-moz-url"):
            urllist = await (await item.getType("text/x-moz-url")).text();
            break;
          default:
            break;
        }
        if (urllist) {
          urls.push(urllist);
        } else if (item.types.length > 0) {
          console.log(item);
          let gettype = item.types.reduce((prev, v) => {
            if (prev.includes("video")) return prev;
            if (prev.includes("image")) {
              if (v.includes("video")) return v;
              else return prev;
            }
            if (v.includes("image")) return v;
            return "";
          }, "");
          if (gettype !== "") listOfMedia.push(item.getType(gettype));
        }
      }
      getImageOnline(urls, () => {
      });
    }
    if (listOfMedia.length === 0) return;
    let importable = [];
    for (const item of listOfMedia) {
      let awaited = await item;
      let final;
      if (awaited instanceof Array) {
        final = awaited.flat();
      } else {
        final = [awaited];
      }
      importable.push(...final);
    }
    autoImportUnknownData(...importable);
  }
  window.addEventListener("load", () => {
    let filePicker = document.getElementById("filePicker");
    filePicker.addEventListener("change", async () => {
      galleryElm.collection?.append(...Object.values(filePicker.files));
      filePicker.value = "";
    });
    if (filePicker.files && filePicker.files.length != 0) {
      filePicker.dispatchEvent(new Event("change"));
    }
    document.body.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    document.body.addEventListener("paste", generalPastingAndDroppingMediaDealer);
    document.body.addEventListener("drop", generalPastingAndDroppingMediaDealer);
  });
  window.addEventListener("load", async () => {
    await Promise.all(systemd.all);
    document.body.addEventListener("keydown", (e) => {
      if (!(e.target instanceof HTMLElement)) return;
      if (e.code === "KeyF" && !(e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) && e.target.getAttribute("type") != "text") {
        toggleFullscreenGallery();
      }
      if (e.code === "KeyH" && !(e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) && e.target.getAttribute("type") != "text") {
        toggleFullscreenGallery({ noFullscreen: true });
      }
      if (e.code === "KeyU" && !(e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) && e.target.getAttribute("type") != "text") {
        executeEmergency();
      }
    });
    document.addEventListener("fullscreenchange", exitHandler, false);
    function exitHandler() {
      if (!document.fullscreenElement && ourFullscreen == true) {
        toggleFullscreenGallery({ toggle: false });
      }
    }
    document.body.addEventListener("mousemove", (e) => dragHelper(e));
    document.body.addEventListener("touchmove", (e) => dragHelper(e));
    function dragHelper(e) {
      let screenHeight = window.screen.availHeight;
      let draggedAtY;
      if ("touches" in e) {
        draggedAtY = e.touches[0].clientY;
      } else {
        draggedAtY = e.clientY;
      }
      let draggedAtFlippedY = screenHeight - draggedAtY;
      if (document.querySelector(".gu-transit")) {
        if (draggedAtFlippedY < screenHeight * 0.1 + 64) {
          let percentage = (screenHeight * 0.1 + 64 - draggedAtFlippedY) / 100;
          let toScroll = screenHeight * 0.1 * percentage;
          window.scrollBy(0, toScroll);
        } else if (draggedAtY < screenHeight * 0.1) {
          let percentage = (screenHeight * 0.1 - draggedAtY) / 100;
          let toScroll = screenHeight * 0.1 * percentage;
          window.scrollBy(0, -toScroll);
        }
      }
    }
    let customIconURL = new URLSearchParams(window.location.search).get("iconurl");
    if (customIconURL !== null) {
      document.querySelectorAll("head link[rel*='icon']").forEach((item) => {
        item.href = customIconURL;
      });
    }
    let titleURL = new URLSearchParams(window.location.search).get("title");
    if (titleURL !== null) {
      document.querySelector("head title").innerText = titleURL;
    }
  });
  window.addEventListener("editorModeToggled", function(e) {
    if (e.status == true) {
      document.body.classList.add("editorMode");
    } else {
      document.body.classList.remove("editorMode");
    }
  });
  window.toggleEmergencySettings = () => {
    let emergency = document.getElementById("emergencySettings");
    if (emergency.classList.contains("visible")) {
      emergency.classList.remove("visible");
    } else {
      emergency.classList.add("visible");
    }
  };
  window.addEventListener("load", () => {
    document.getElementById("importingFile").addEventListener("change", (e) => {
      const files = e.target.files;
      if (files) for (const file of files) {
        JGVDB.unzip(file).then((unzipped) => JGVDB.import(unzipped.config, unzipped.files));
      }
      e.target.value = "";
    });
  });
  window.addEventListener("load", () => {
    let timer;
    function applyIdleTimer() {
      if (document.body.classList.contains("idle")) {
        document.body.classList.remove("idle");
      } else {
        if (timer) {
          clearTimeout(timer);
        }
      }
      setTimeout(() => {
        document.body.classList.add("idle");
      }, settings.mouseHideDelay);
    }
    document.body.addEventListener("mousemove", applyIdleTimer);
    applyIdleTimer();
  });
  window.addEventListener("load", () => {
    function checkIfTargetHasNav(target) {
      return target.parentElement?.parentElement !== navbar;
    }
    document.body.addEventListener("keydown", (e) => {
      if (!(e.target instanceof HTMLElement)) return;
      if (checkIfTargetHasNav(e.target)) return;
      if (e.key !== "Tab") return;
      let sibling = e.shiftKey ? e.target.previousElementSibling : e.target.nextElementSibling;
      if (!sibling && e.shiftKey) return;
      if (!sibling && !e.shiftKey) sibling = document.getElementById("editorMode");
      if (!sibling) throw new Error("the fuck happened bro", { cause: sibling });
      e.preventDefault();
      e.stopPropagation();
      sibling.focus();
    });
    document.body.addEventListener("keypress", (e) => {
      if (!(e.target instanceof HTMLElement)) return;
      if (checkIfTargetHasNav(e.target)) return;
      if (e.key !== "Enter" && e.key !== " ") return;
      e.target.querySelector(":is(input, button)")?.focus?.();
    });
  });
})();
/*!
 * Viewer.js v1.11.7
 * https://fengyuanchen.github.io/viewerjs
 *
 * Copyright 2015-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2024-11-24T04:32:19.116Z
 */
//# sourceMappingURL=bundle.js.map
