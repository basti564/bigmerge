/*! For license information please see pixi.3f6b532dc18f657e214a.js.LICENSE.txt */
"use strict";
(self.webpackChunkfarm_merge = self.webpackChunkfarm_merge || []).push([
  [863],
  {
    499: (t, e, r) => {
      r.d(e, { L: () => a, V: () => o });
      var i = r(29),
        n = r(5323),
        o = {
          accessible: !1,
          accessibleTitle: null,
          accessibleHint: null,
          tabIndex: 0,
          _accessibleActive: !1,
          _accessibleDiv: null,
          accessibleType: "button",
          accessiblePointerEvents: "auto",
          accessibleChildren: !0,
          renderId: -1,
        };
      i.s$.mixin(o);
      var s = 100,
        a = (function () {
          function t(t) {
            (this._hookDiv = null),
              (n.isMobile.tablet || n.isMobile.phone) && this.createTouchHook();
            var e = document.createElement("div");
            (e.style.width = s + "px"),
              (e.style.height = s + "px"),
              (e.style.position = "absolute"),
              (e.style.top = "0px"),
              (e.style.left = "0px"),
              (e.style.zIndex = (2).toString()),
              (this.div = e),
              (this.pool = []),
              (this.renderId = 0),
              (this.debug = !1),
              (this.renderer = t),
              (this.children = []),
              (this._onKeyDown = this._onKeyDown.bind(this)),
              (this._onMouseMove = this._onMouseMove.bind(this)),
              (this._isActive = !1),
              (this._isMobileAccessibility = !1),
              (this.androidUpdateCount = 0),
              (this.androidUpdateFrequency = 500),
              window.addEventListener("keydown", this._onKeyDown, !1);
          }
          return (
            Object.defineProperty(t.prototype, "isActive", {
              get: function () {
                return this._isActive;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "isMobileAccessibility", {
              get: function () {
                return this._isMobileAccessibility;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (t.prototype.createTouchHook = function () {
              var t = this,
                e = document.createElement("button");
              (e.style.width = "1px"),
                (e.style.height = "1px"),
                (e.style.position = "absolute"),
                (e.style.top = "-1000px"),
                (e.style.left = "-1000px"),
                (e.style.zIndex = (2).toString()),
                (e.style.backgroundColor = "#FF0000"),
                (e.title = "select to enable accessability for this content"),
                e.addEventListener("focus", function () {
                  (t._isMobileAccessibility = !0),
                    t.activate(),
                    t.destroyTouchHook();
                }),
                document.body.appendChild(e),
                (this._hookDiv = e);
            }),
            (t.prototype.destroyTouchHook = function () {
              this._hookDiv &&
                (document.body.removeChild(this._hookDiv),
                (this._hookDiv = null));
            }),
            (t.prototype.activate = function () {
              this._isActive ||
                ((this._isActive = !0),
                window.document.addEventListener(
                  "mousemove",
                  this._onMouseMove,
                  !0
                ),
                window.removeEventListener("keydown", this._onKeyDown, !1),
                this.renderer.on("postrender", this.update, this),
                this.renderer.view.parentNode &&
                  this.renderer.view.parentNode.appendChild(this.div));
            }),
            (t.prototype.deactivate = function () {
              this._isActive &&
                !this._isMobileAccessibility &&
                ((this._isActive = !1),
                window.document.removeEventListener(
                  "mousemove",
                  this._onMouseMove,
                  !0
                ),
                window.addEventListener("keydown", this._onKeyDown, !1),
                this.renderer.off("postrender", this.update),
                this.div.parentNode &&
                  this.div.parentNode.removeChild(this.div));
            }),
            (t.prototype.updateAccessibleObjects = function (t) {
              if (t.visible && t.accessibleChildren) {
                t.accessible &&
                  t.interactive &&
                  (t._accessibleActive || this.addChild(t),
                  (t.renderId = this.renderId));
                for (var e = t.children, r = 0; r < e.length; r++)
                  this.updateAccessibleObjects(e[r]);
              }
            }),
            (t.prototype.update = function () {
              var t = performance.now();
              if (
                !(n.isMobile.android.device && t < this.androidUpdateCount) &&
                ((this.androidUpdateCount = t + this.androidUpdateFrequency),
                this.renderer.renderingToScreen)
              ) {
                this.renderer._lastObjectRendered &&
                  this.updateAccessibleObjects(
                    this.renderer._lastObjectRendered
                  );
                var e = this.renderer.view.getBoundingClientRect(),
                  r = this.renderer.resolution,
                  i = (e.width / this.renderer.width) * r,
                  o = (e.height / this.renderer.height) * r,
                  s = this.div;
                (s.style.left = e.left + "px"),
                  (s.style.top = e.top + "px"),
                  (s.style.width = this.renderer.width + "px"),
                  (s.style.height = this.renderer.height + "px");
                for (var a = 0; a < this.children.length; a++) {
                  var h = this.children[a];
                  if (h.renderId !== this.renderId)
                    (h._accessibleActive = !1),
                      (0, n.removeItems)(this.children, a, 1),
                      this.div.removeChild(h._accessibleDiv),
                      this.pool.push(h._accessibleDiv),
                      (h._accessibleDiv = null),
                      a--;
                  else {
                    s = h._accessibleDiv;
                    var u = h.hitArea,
                      l = h.worldTransform;
                    h.hitArea
                      ? ((s.style.left = (l.tx + u.x * l.a) * i + "px"),
                        (s.style.top = (l.ty + u.y * l.d) * o + "px"),
                        (s.style.width = u.width * l.a * i + "px"),
                        (s.style.height = u.height * l.d * o + "px"))
                      : ((u = h.getBounds()),
                        this.capHitArea(u),
                        (s.style.left = u.x * i + "px"),
                        (s.style.top = u.y * o + "px"),
                        (s.style.width = u.width * i + "px"),
                        (s.style.height = u.height * o + "px"),
                        s.title !== h.accessibleTitle &&
                          null !== h.accessibleTitle &&
                          (s.title = h.accessibleTitle),
                        s.getAttribute("aria-label") !== h.accessibleHint &&
                          null !== h.accessibleHint &&
                          s.setAttribute("aria-label", h.accessibleHint)),
                      (h.accessibleTitle === s.title &&
                        h.tabIndex === s.tabIndex) ||
                        ((s.title = h.accessibleTitle),
                        (s.tabIndex = h.tabIndex),
                        this.debug && this.updateDebugHTML(s));
                  }
                }
                this.renderId++;
              }
            }),
            (t.prototype.updateDebugHTML = function (t) {
              t.innerHTML =
                "type: " +
                t.type +
                "</br> title : " +
                t.title +
                "</br> tabIndex: " +
                t.tabIndex;
            }),
            (t.prototype.capHitArea = function (t) {
              t.x < 0 && ((t.width += t.x), (t.x = 0)),
                t.y < 0 && ((t.height += t.y), (t.y = 0)),
                t.x + t.width > this.renderer.width &&
                  (t.width = this.renderer.width - t.x),
                t.y + t.height > this.renderer.height &&
                  (t.height = this.renderer.height - t.y);
            }),
            (t.prototype.addChild = function (t) {
              var e = this.pool.pop();
              e ||
                (((e = document.createElement("button")).style.width =
                  s + "px"),
                (e.style.height = s + "px"),
                (e.style.backgroundColor = this.debug
                  ? "rgba(255,255,255,0.5)"
                  : "transparent"),
                (e.style.position = "absolute"),
                (e.style.zIndex = (2).toString()),
                (e.style.borderStyle = "none"),
                navigator.userAgent.toLowerCase().indexOf("chrome") > -1
                  ? e.setAttribute("aria-live", "off")
                  : e.setAttribute("aria-live", "polite"),
                navigator.userAgent.match(/rv:.*Gecko\//)
                  ? e.setAttribute("aria-relevant", "additions")
                  : e.setAttribute("aria-relevant", "text"),
                e.addEventListener("click", this._onClick.bind(this)),
                e.addEventListener("focus", this._onFocus.bind(this)),
                e.addEventListener("focusout", this._onFocusOut.bind(this))),
                (e.style.pointerEvents = t.accessiblePointerEvents),
                (e.type = t.accessibleType),
                t.accessibleTitle && null !== t.accessibleTitle
                  ? (e.title = t.accessibleTitle)
                  : (t.accessibleHint && null !== t.accessibleHint) ||
                    (e.title = "displayObject " + t.tabIndex),
                t.accessibleHint &&
                  null !== t.accessibleHint &&
                  e.setAttribute("aria-label", t.accessibleHint),
                this.debug && this.updateDebugHTML(e),
                (t._accessibleActive = !0),
                (t._accessibleDiv = e),
                (e.displayObject = t),
                this.children.push(t),
                this.div.appendChild(t._accessibleDiv),
                (t._accessibleDiv.tabIndex = t.tabIndex);
            }),
            (t.prototype._onClick = function (t) {
              var e = this.renderer.plugins.interaction;
              e.dispatchEvent(t.target.displayObject, "click", e.eventData),
                e.dispatchEvent(
                  t.target.displayObject,
                  "pointertap",
                  e.eventData
                ),
                e.dispatchEvent(t.target.displayObject, "tap", e.eventData);
            }),
            (t.prototype._onFocus = function (t) {
              t.target.getAttribute("aria-live") ||
                t.target.setAttribute("aria-live", "assertive");
              var e = this.renderer.plugins.interaction;
              e.dispatchEvent(t.target.displayObject, "mouseover", e.eventData);
            }),
            (t.prototype._onFocusOut = function (t) {
              t.target.getAttribute("aria-live") ||
                t.target.setAttribute("aria-live", "polite");
              var e = this.renderer.plugins.interaction;
              e.dispatchEvent(t.target.displayObject, "mouseout", e.eventData);
            }),
            (t.prototype._onKeyDown = function (t) {
              9 === t.keyCode && this.activate();
            }),
            (t.prototype._onMouseMove = function (t) {
              (0 === t.movementX && 0 === t.movementY) || this.deactivate();
            }),
            (t.prototype.destroy = function () {
              this.destroyTouchHook(),
                (this.div = null),
                window.document.removeEventListener(
                  "mousemove",
                  this._onMouseMove,
                  !0
                ),
                window.removeEventListener("keydown", this._onKeyDown),
                (this.pool = null),
                (this.children = null),
                (this.renderer = null);
            }),
            t
          );
        })();
    },
    5233: (t, e, r) => {
      r.d(e, { M: () => o });
      var i = r(29),
        n = r(5307),
        o = (function () {
          function t(e) {
            var r = this;
            (e = Object.assign({ forceCanvas: !1 }, e)),
              (this.renderer = (0, n.e6)(e)),
              (this.stage = new i.W2()),
              t._plugins.forEach(function (t) {
                t.init.call(r, e);
              });
          }
          return (
            (t.registerPlugin = function (e) {
              t._plugins.push(e);
            }),
            (t.prototype.render = function () {
              this.renderer.render(this.stage);
            }),
            Object.defineProperty(t.prototype, "view", {
              get: function () {
                return this.renderer.view;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "screen", {
              get: function () {
                return this.renderer.screen;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (t.prototype.destroy = function (e, r) {
              var i = this,
                n = t._plugins.slice(0);
              n.reverse(),
                n.forEach(function (t) {
                  t.destroy.call(i);
                }),
                this.stage.destroy(r),
                (this.stage = null),
                this.renderer.destroy(e),
                (this.renderer = null);
            }),
            t
          );
        })();
      o._plugins = [];
      var s = (function () {
        function t() {}
        return (
          (t.init = function (t) {
            var e = this;
            Object.defineProperty(this, "resizeTo", {
              set: function (t) {
                window.removeEventListener("resize", this.queueResize),
                  (this._resizeTo = t),
                  t &&
                    (window.addEventListener("resize", this.queueResize),
                    this.resize());
              },
              get: function () {
                return this._resizeTo;
              },
            }),
              (this.queueResize = function () {
                e._resizeTo &&
                  (e.cancelResize(),
                  (e._resizeId = requestAnimationFrame(function () {
                    return e.resize();
                  })));
              }),
              (this.cancelResize = function () {
                e._resizeId &&
                  (cancelAnimationFrame(e._resizeId), (e._resizeId = null));
              }),
              (this.resize = function () {
                if (e._resizeTo) {
                  var t, r;
                  if ((e.cancelResize(), e._resizeTo === window))
                    (t = window.innerWidth), (r = window.innerHeight);
                  else {
                    var i = e._resizeTo;
                    (t = i.clientWidth), (r = i.clientHeight);
                  }
                  e.renderer.resize(t, r);
                }
              }),
              (this._resizeId = null),
              (this._resizeTo = null),
              (this.resizeTo = t.resizeTo || null);
          }),
          (t.destroy = function () {
            window.removeEventListener("resize", this.queueResize),
              this.cancelResize(),
              (this.cancelResize = null),
              (this.queueResize = null),
              (this.resizeTo = null),
              (this.resize = null);
          }),
          t
        );
      })();
      o.registerPlugin(s);
    },
    7054: (t, e, r) => {
      var i, n, o, s, a, h, u, l, c, d, p, f, m, v, y, g, _;
      r.d(e, {
        A7: () => g,
        G5: () => _,
        I2: () => h,
        N3: () => n,
        Nt: () => d,
        T$: () => s,
        UN: () => v,
        V0: () => o,
        Vi: () => i,
        WB: () => p,
        aH: () => c,
        cB: () => y,
        iw: () => f,
        lg: () => a,
        sp: () => u,
        vK: () => l,
        yl: () => m,
      }),
        (function (t) {
          (t[(t.WEBGL_LEGACY = 0)] = "WEBGL_LEGACY"),
            (t[(t.WEBGL = 1)] = "WEBGL"),
            (t[(t.WEBGL2 = 2)] = "WEBGL2");
        })(i || (i = {})),
        (function (t) {
          (t[(t.UNKNOWN = 0)] = "UNKNOWN"),
            (t[(t.WEBGL = 1)] = "WEBGL"),
            (t[(t.CANVAS = 2)] = "CANVAS");
        })(n || (n = {})),
        (function (t) {
          (t[(t.COLOR = 16384)] = "COLOR"),
            (t[(t.DEPTH = 256)] = "DEPTH"),
            (t[(t.STENCIL = 1024)] = "STENCIL");
        })(o || (o = {})),
        (function (t) {
          (t[(t.NORMAL = 0)] = "NORMAL"),
            (t[(t.ADD = 1)] = "ADD"),
            (t[(t.MULTIPLY = 2)] = "MULTIPLY"),
            (t[(t.SCREEN = 3)] = "SCREEN"),
            (t[(t.OVERLAY = 4)] = "OVERLAY"),
            (t[(t.DARKEN = 5)] = "DARKEN"),
            (t[(t.LIGHTEN = 6)] = "LIGHTEN"),
            (t[(t.COLOR_DODGE = 7)] = "COLOR_DODGE"),
            (t[(t.COLOR_BURN = 8)] = "COLOR_BURN"),
            (t[(t.HARD_LIGHT = 9)] = "HARD_LIGHT"),
            (t[(t.SOFT_LIGHT = 10)] = "SOFT_LIGHT"),
            (t[(t.DIFFERENCE = 11)] = "DIFFERENCE"),
            (t[(t.EXCLUSION = 12)] = "EXCLUSION"),
            (t[(t.HUE = 13)] = "HUE"),
            (t[(t.SATURATION = 14)] = "SATURATION"),
            (t[(t.COLOR = 15)] = "COLOR"),
            (t[(t.LUMINOSITY = 16)] = "LUMINOSITY"),
            (t[(t.NORMAL_NPM = 17)] = "NORMAL_NPM"),
            (t[(t.ADD_NPM = 18)] = "ADD_NPM"),
            (t[(t.SCREEN_NPM = 19)] = "SCREEN_NPM"),
            (t[(t.NONE = 20)] = "NONE"),
            (t[(t.SRC_OVER = 0)] = "SRC_OVER"),
            (t[(t.SRC_IN = 21)] = "SRC_IN"),
            (t[(t.SRC_OUT = 22)] = "SRC_OUT"),
            (t[(t.SRC_ATOP = 23)] = "SRC_ATOP"),
            (t[(t.DST_OVER = 24)] = "DST_OVER"),
            (t[(t.DST_IN = 25)] = "DST_IN"),
            (t[(t.DST_OUT = 26)] = "DST_OUT"),
            (t[(t.DST_ATOP = 27)] = "DST_ATOP"),
            (t[(t.ERASE = 26)] = "ERASE"),
            (t[(t.SUBTRACT = 28)] = "SUBTRACT"),
            (t[(t.XOR = 29)] = "XOR");
        })(s || (s = {})),
        (function (t) {
          (t[(t.POINTS = 0)] = "POINTS"),
            (t[(t.LINES = 1)] = "LINES"),
            (t[(t.LINE_LOOP = 2)] = "LINE_LOOP"),
            (t[(t.LINE_STRIP = 3)] = "LINE_STRIP"),
            (t[(t.TRIANGLES = 4)] = "TRIANGLES"),
            (t[(t.TRIANGLE_STRIP = 5)] = "TRIANGLE_STRIP"),
            (t[(t.TRIANGLE_FAN = 6)] = "TRIANGLE_FAN");
        })(a || (a = {})),
        (function (t) {
          (t[(t.RGBA = 6408)] = "RGBA"),
            (t[(t.RGB = 6407)] = "RGB"),
            (t[(t.ALPHA = 6406)] = "ALPHA"),
            (t[(t.LUMINANCE = 6409)] = "LUMINANCE"),
            (t[(t.LUMINANCE_ALPHA = 6410)] = "LUMINANCE_ALPHA"),
            (t[(t.DEPTH_COMPONENT = 6402)] = "DEPTH_COMPONENT"),
            (t[(t.DEPTH_STENCIL = 34041)] = "DEPTH_STENCIL");
        })(h || (h = {})),
        (function (t) {
          (t[(t.TEXTURE_2D = 3553)] = "TEXTURE_2D"),
            (t[(t.TEXTURE_CUBE_MAP = 34067)] = "TEXTURE_CUBE_MAP"),
            (t[(t.TEXTURE_2D_ARRAY = 35866)] = "TEXTURE_2D_ARRAY"),
            (t[(t.TEXTURE_CUBE_MAP_POSITIVE_X = 34069)] =
              "TEXTURE_CUBE_MAP_POSITIVE_X"),
            (t[(t.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070)] =
              "TEXTURE_CUBE_MAP_NEGATIVE_X"),
            (t[(t.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071)] =
              "TEXTURE_CUBE_MAP_POSITIVE_Y"),
            (t[(t.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072)] =
              "TEXTURE_CUBE_MAP_NEGATIVE_Y"),
            (t[(t.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073)] =
              "TEXTURE_CUBE_MAP_POSITIVE_Z"),
            (t[(t.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074)] =
              "TEXTURE_CUBE_MAP_NEGATIVE_Z");
        })(u || (u = {})),
        (function (t) {
          (t[(t.UNSIGNED_BYTE = 5121)] = "UNSIGNED_BYTE"),
            (t[(t.UNSIGNED_SHORT = 5123)] = "UNSIGNED_SHORT"),
            (t[(t.UNSIGNED_SHORT_5_6_5 = 33635)] = "UNSIGNED_SHORT_5_6_5"),
            (t[(t.UNSIGNED_SHORT_4_4_4_4 = 32819)] = "UNSIGNED_SHORT_4_4_4_4"),
            (t[(t.UNSIGNED_SHORT_5_5_5_1 = 32820)] = "UNSIGNED_SHORT_5_5_5_1"),
            (t[(t.FLOAT = 5126)] = "FLOAT"),
            (t[(t.HALF_FLOAT = 36193)] = "HALF_FLOAT");
        })(l || (l = {})),
        (function (t) {
          (t[(t.NEAREST = 0)] = "NEAREST"), (t[(t.LINEAR = 1)] = "LINEAR");
        })(c || (c = {})),
        (function (t) {
          (t[(t.CLAMP = 33071)] = "CLAMP"),
            (t[(t.REPEAT = 10497)] = "REPEAT"),
            (t[(t.MIRRORED_REPEAT = 33648)] = "MIRRORED_REPEAT");
        })(d || (d = {})),
        (function (t) {
          (t[(t.OFF = 0)] = "OFF"),
            (t[(t.POW2 = 1)] = "POW2"),
            (t[(t.ON = 2)] = "ON");
        })(p || (p = {})),
        (function (t) {
          (t[(t.NPM = 0)] = "NPM"),
            (t[(t.UNPACK = 1)] = "UNPACK"),
            (t[(t.PMA = 2)] = "PMA"),
            (t[(t.NO_PREMULTIPLIED_ALPHA = 0)] = "NO_PREMULTIPLIED_ALPHA"),
            (t[(t.PREMULTIPLY_ON_UPLOAD = 1)] = "PREMULTIPLY_ON_UPLOAD"),
            (t[(t.PREMULTIPLY_ALPHA = 2)] = "PREMULTIPLY_ALPHA");
        })(f || (f = {})),
        (function (t) {
          (t[(t.NO = 0)] = "NO"),
            (t[(t.YES = 1)] = "YES"),
            (t[(t.AUTO = 2)] = "AUTO"),
            (t[(t.BLEND = 0)] = "BLEND"),
            (t[(t.CLEAR = 1)] = "CLEAR"),
            (t[(t.BLIT = 2)] = "BLIT");
        })(m || (m = {})),
        (function (t) {
          (t[(t.AUTO = 0)] = "AUTO"), (t[(t.MANUAL = 1)] = "MANUAL");
        })(v || (v = {})),
        (function (t) {
          (t.LOW = "lowp"), (t.MEDIUM = "mediump"), (t.HIGH = "highp");
        })(y || (y = {})),
        (function (t) {
          (t[(t.NONE = 0)] = "NONE"),
            (t[(t.SCISSOR = 1)] = "SCISSOR"),
            (t[(t.STENCIL = 2)] = "STENCIL"),
            (t[(t.SPRITE = 3)] = "SPRITE");
        })(g || (g = {})),
        (function (t) {
          (t[(t.NONE = 0)] = "NONE"),
            (t[(t.LOW = 2)] = "LOW"),
            (t[(t.MEDIUM = 4)] = "MEDIUM"),
            (t[(t.HIGH = 8)] = "HIGH");
        })(_ || (_ = {}));
    },
    5307: (t, e, r) => {
      r.d(e, {
        $r: () => Dt,
        AI: () => O,
        Bv: () => _e,
        Ei: () => Kt,
        HI: () => ht,
        I8: () => oe,
        Ie: () => ce,
        JZ: () => me,
        Jb: () => S,
        Rv: () => de,
        TI: () => L,
        TJ: () => ge,
        Th: () => se,
        UX: () => Ut,
        VL: () => v,
        W1: () => qt,
        Y9: () => ue,
        ZM: () => Nt,
        ZX: () => V,
        Zk: () => fe,
        a$: () => le,
        a7: () => Ot,
        aF: () => M,
        ah: () => U,
        bO: () => J,
        e6: () => ae,
        eG: () => ie,
        eo: () => pe,
        ex: () => Rt,
        fy: () => ee,
        jV: () => $,
        jd: () => C,
        kP: () => he,
        lD: () => W,
        lW: () => k,
        oo: () => K,
        sg: () => wt,
        tT: () => rt,
        uW: () => F,
        ud: () => Y,
        wn: () => Lt,
        xE: () => R,
        xP: () => I,
        z9: () => Bt,
      });
      var i = r(1573),
        n = r(7054),
        o = r(5323),
        s = r(3557),
        a = r(5662),
        h = r(4295);
      (i.X.PREFER_ENV = o.isMobile.any ? n.Vi.WEBGL : n.Vi.WEBGL2),
        (i.X.STRICT_TEXTURE_CACHE = !1);
      var u = [];
      function l(t, e) {
        if (!t) return null;
        var r = "";
        if ("string" == typeof t) {
          var i = /\.(\w{3,4})(?:$|\?|#)/i.exec(t);
          i && (r = i[1].toLowerCase());
        }
        for (var n = u.length - 1; n >= 0; --n) {
          var o = u[n];
          if (o.test && o.test(t, r)) return new o(t, e);
        }
        throw new Error("Unrecognized source type to auto-detect Resource");
      }
      var c = function (t, e) {
        return (
          (c =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (t, e) {
                t.__proto__ = e;
              }) ||
            function (t, e) {
              for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
            }),
          c(t, e)
        );
      };
      function d(t, e) {
        function r() {
          this.constructor = t;
        }
        c(t, e),
          (t.prototype =
            null === e
              ? Object.create(e)
              : ((r.prototype = e.prototype), new r()));
      }
      var p = (function () {
          function t(t, e) {
            void 0 === t && (t = 0),
              void 0 === e && (e = 0),
              (this._width = t),
              (this._height = e),
              (this.destroyed = !1),
              (this.internal = !1),
              (this.onResize = new s.R("setRealSize")),
              (this.onUpdate = new s.R("update")),
              (this.onError = new s.R("onError"));
          }
          return (
            (t.prototype.bind = function (t) {
              this.onResize.add(t),
                this.onUpdate.add(t),
                this.onError.add(t),
                (this._width || this._height) &&
                  this.onResize.emit(this._width, this._height);
            }),
            (t.prototype.unbind = function (t) {
              this.onResize.remove(t),
                this.onUpdate.remove(t),
                this.onError.remove(t);
            }),
            (t.prototype.resize = function (t, e) {
              (t === this._width && e === this._height) ||
                ((this._width = t),
                (this._height = e),
                this.onResize.emit(t, e));
            }),
            Object.defineProperty(t.prototype, "valid", {
              get: function () {
                return !!this._width && !!this._height;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (t.prototype.update = function () {
              this.destroyed || this.onUpdate.emit();
            }),
            (t.prototype.load = function () {
              return Promise.resolve(this);
            }),
            Object.defineProperty(t.prototype, "width", {
              get: function () {
                return this._width;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "height", {
              get: function () {
                return this._height;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (t.prototype.style = function (t, e, r) {
              return !1;
            }),
            (t.prototype.dispose = function () {}),
            (t.prototype.destroy = function () {
              this.destroyed ||
                ((this.destroyed = !0),
                this.dispose(),
                this.onError.removeAll(),
                (this.onError = null),
                this.onResize.removeAll(),
                (this.onResize = null),
                this.onUpdate.removeAll(),
                (this.onUpdate = null));
            }),
            (t.test = function (t, e) {
              return !1;
            }),
            t
          );
        })(),
        f = (function (t) {
          function e(e, r) {
            var i = this,
              n = r || {},
              o = n.width,
              s = n.height;
            if (!o || !s)
              throw new Error("BufferResource width or height invalid");
            return ((i = t.call(this, o, s) || this).data = e), i;
          }
          return (
            d(e, t),
            (e.prototype.upload = function (t, e, r) {
              var i = t.gl;
              return (
                i.pixelStorei(
                  i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
                  e.alphaMode === n.iw.UNPACK
                ),
                r.width === e.width && r.height === e.height
                  ? i.texSubImage2D(
                      e.target,
                      0,
                      0,
                      0,
                      e.width,
                      e.height,
                      e.format,
                      e.type,
                      this.data
                    )
                  : ((r.width = e.width),
                    (r.height = e.height),
                    i.texImage2D(
                      e.target,
                      0,
                      r.internalFormat,
                      e.width,
                      e.height,
                      0,
                      e.format,
                      r.type,
                      this.data
                    )),
                !0
              );
            }),
            (e.prototype.dispose = function () {
              this.data = null;
            }),
            (e.test = function (t) {
              return (
                t instanceof Float32Array ||
                t instanceof Uint8Array ||
                t instanceof Uint32Array
              );
            }),
            e
          );
        })(p),
        m = { scaleMode: n.aH.NEAREST, format: n.I2.RGBA, alphaMode: n.iw.NPM },
        v = (function (t) {
          function e(e, r) {
            void 0 === e && (e = null), void 0 === r && (r = null);
            var s = t.call(this) || this,
              a = (r = r || {}).alphaMode,
              h = r.mipmap,
              u = r.anisotropicLevel,
              c = r.scaleMode,
              d = r.width,
              f = r.height,
              m = r.wrapMode,
              v = r.format,
              y = r.type,
              g = r.target,
              _ = r.resolution,
              b = r.resourceOptions;
            return (
              !e || e instanceof p || ((e = l(e, b)).internal = !0),
              (s.width = d || 0),
              (s.height = f || 0),
              (s.resolution = _ || i.X.RESOLUTION),
              (s.mipmap = void 0 !== h ? h : i.X.MIPMAP_TEXTURES),
              (s.anisotropicLevel = void 0 !== u ? u : i.X.ANISOTROPIC_LEVEL),
              (s.wrapMode = m || i.X.WRAP_MODE),
              (s.scaleMode = void 0 !== c ? c : i.X.SCALE_MODE),
              (s.format = v || n.I2.RGBA),
              (s.type = y || n.vK.UNSIGNED_BYTE),
              (s.target = g || n.sp.TEXTURE_2D),
              (s.alphaMode = void 0 !== a ? a : n.iw.UNPACK),
              void 0 !== r.premultiplyAlpha &&
                (s.premultiplyAlpha = r.premultiplyAlpha),
              (s.uid = (0, o.uid)()),
              (s.touched = 0),
              (s.isPowerOfTwo = !1),
              s._refreshPOT(),
              (s._glTextures = {}),
              (s.dirtyId = 0),
              (s.dirtyStyleId = 0),
              (s.cacheId = null),
              (s.valid = d > 0 && f > 0),
              (s.textureCacheIds = []),
              (s.destroyed = !1),
              (s.resource = null),
              (s._batchEnabled = 0),
              (s._batchLocation = 0),
              (s.parentTextureArray = null),
              s.setResource(e),
              s
            );
          }
          return (
            d(e, t),
            Object.defineProperty(e.prototype, "realWidth", {
              get: function () {
                return Math.ceil(this.width * this.resolution - 1e-4);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "realHeight", {
              get: function () {
                return Math.ceil(this.height * this.resolution - 1e-4);
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.setStyle = function (t, e) {
              var r;
              return (
                void 0 !== t &&
                  t !== this.scaleMode &&
                  ((this.scaleMode = t), (r = !0)),
                void 0 !== e &&
                  e !== this.mipmap &&
                  ((this.mipmap = e), (r = !0)),
                r && this.dirtyStyleId++,
                this
              );
            }),
            (e.prototype.setSize = function (t, e, r) {
              return (
                (this.resolution = r || this.resolution),
                (this.width = t),
                (this.height = e),
                this._refreshPOT(),
                this.update(),
                this
              );
            }),
            (e.prototype.setRealSize = function (t, e, r) {
              return (
                (this.resolution = r || this.resolution),
                (this.width = t / this.resolution),
                (this.height = e / this.resolution),
                this._refreshPOT(),
                this.update(),
                this
              );
            }),
            (e.prototype._refreshPOT = function () {
              this.isPowerOfTwo =
                (0, o.isPow2)(this.realWidth) && (0, o.isPow2)(this.realHeight);
            }),
            (e.prototype.setResolution = function (t) {
              var e = this.resolution;
              return (
                e === t ||
                  ((this.resolution = t),
                  this.valid &&
                    ((this.width = (this.width * e) / t),
                    (this.height = (this.height * e) / t),
                    this.emit("update", this)),
                  this._refreshPOT()),
                this
              );
            }),
            (e.prototype.setResource = function (t) {
              if (this.resource === t) return this;
              if (this.resource)
                throw new Error("Resource can be set only once");
              return t.bind(this), (this.resource = t), this;
            }),
            (e.prototype.update = function () {
              this.valid
                ? (this.dirtyId++,
                  this.dirtyStyleId++,
                  this.emit("update", this))
                : this.width > 0 &&
                  this.height > 0 &&
                  ((this.valid = !0),
                  this.emit("loaded", this),
                  this.emit("update", this));
            }),
            (e.prototype.onError = function (t) {
              this.emit("error", this, t);
            }),
            (e.prototype.destroy = function () {
              this.resource &&
                (this.resource.unbind(this),
                this.resource.internal && this.resource.destroy(),
                (this.resource = null)),
                this.cacheId &&
                  (delete o.BaseTextureCache[this.cacheId],
                  delete o.TextureCache[this.cacheId],
                  (this.cacheId = null)),
                this.dispose(),
                e.removeFromCache(this),
                (this.textureCacheIds = null),
                (this.destroyed = !0);
            }),
            (e.prototype.dispose = function () {
              this.emit("dispose", this);
            }),
            (e.prototype.castToBaseTexture = function () {
              return this;
            }),
            (e.from = function (t, r, n) {
              void 0 === n && (n = i.X.STRICT_TEXTURE_CACHE);
              var s = "string" == typeof t,
                a = null;
              s
                ? (a = t)
                : (t._pixiId || (t._pixiId = "pixiid_" + (0, o.uid)()),
                  (a = t._pixiId));
              var h = o.BaseTextureCache[a];
              if (s && n && !h)
                throw new Error(
                  'The cacheId "' + a + '" does not exist in BaseTextureCache.'
                );
              return (
                h || (((h = new e(t, r)).cacheId = a), e.addToCache(h, a)), h
              );
            }),
            (e.fromBuffer = function (t, r, i, o) {
              t = t || new Float32Array(r * i * 4);
              var s = new f(t, { width: r, height: i }),
                a = t instanceof Float32Array ? n.vK.FLOAT : n.vK.UNSIGNED_BYTE;
              return new e(
                s,
                Object.assign(m, o || { width: r, height: i, type: a })
              );
            }),
            (e.addToCache = function (t, e) {
              e &&
                (-1 === t.textureCacheIds.indexOf(e) &&
                  t.textureCacheIds.push(e),
                o.BaseTextureCache[e] &&
                  console.warn(
                    "BaseTexture added to the cache with an id [" +
                      e +
                      "] that already had an entry"
                  ),
                (o.BaseTextureCache[e] = t));
            }),
            (e.removeFromCache = function (t) {
              if ("string" == typeof t) {
                var e = o.BaseTextureCache[t];
                if (e) {
                  var r = e.textureCacheIds.indexOf(t);
                  return (
                    r > -1 && e.textureCacheIds.splice(r, 1),
                    delete o.BaseTextureCache[t],
                    e
                  );
                }
              } else if (t && t.textureCacheIds) {
                for (var i = 0; i < t.textureCacheIds.length; ++i)
                  delete o.BaseTextureCache[t.textureCacheIds[i]];
                return (t.textureCacheIds.length = 0), t;
              }
              return null;
            }),
            (e._globalBatch = 0),
            e
          );
        })(o.EventEmitter),
        y = (function (t) {
          function e(e, r) {
            var i = this,
              n = r || {},
              o = n.width,
              s = n.height;
            ((i = t.call(this, o, s) || this).items = []),
              (i.itemDirtyIds = []);
            for (var a = 0; a < e; a++) {
              var h = new v();
              i.items.push(h), i.itemDirtyIds.push(-2);
            }
            return (i.length = e), (i._load = null), (i.baseTexture = null), i;
          }
          return (
            d(e, t),
            (e.prototype.initFromArray = function (t, e) {
              for (var r = 0; r < this.length; r++)
                t[r] &&
                  (t[r].castToBaseTexture
                    ? this.addBaseTextureAt(t[r].castToBaseTexture(), r)
                    : t[r] instanceof p
                    ? this.addResourceAt(t[r], r)
                    : this.addResourceAt(l(t[r], e), r));
            }),
            (e.prototype.dispose = function () {
              for (var t = 0, e = this.length; t < e; t++)
                this.items[t].destroy();
              (this.items = null),
                (this.itemDirtyIds = null),
                (this._load = null);
            }),
            (e.prototype.addResourceAt = function (t, e) {
              if (!this.items[e])
                throw new Error("Index " + e + " is out of bounds");
              return (
                t.valid && !this.valid && this.resize(t.width, t.height),
                this.items[e].setResource(t),
                this
              );
            }),
            (e.prototype.bind = function (e) {
              if (null !== this.baseTexture)
                throw new Error(
                  "Only one base texture per TextureArray is allowed"
                );
              t.prototype.bind.call(this, e);
              for (var r = 0; r < this.length; r++)
                (this.items[r].parentTextureArray = e),
                  this.items[r].on("update", e.update, e);
            }),
            (e.prototype.unbind = function (e) {
              t.prototype.unbind.call(this, e);
              for (var r = 0; r < this.length; r++)
                (this.items[r].parentTextureArray = null),
                  this.items[r].off("update", e.update, e);
            }),
            (e.prototype.load = function () {
              var t = this;
              if (this._load) return this._load;
              var e = this.items
                .map(function (t) {
                  return t.resource;
                })
                .filter(function (t) {
                  return t;
                })
                .map(function (t) {
                  return t.load();
                });
              return (
                (this._load = Promise.all(e).then(function () {
                  var e = t.items[0],
                    r = e.realWidth,
                    i = e.realHeight;
                  return t.resize(r, i), Promise.resolve(t);
                })),
                this._load
              );
            }),
            e
          );
        })(p),
        g = (function (t) {
          function e(e, r) {
            var i,
              n,
              o = this,
              s = r || {},
              a = s.width,
              h = s.height;
            return (
              Array.isArray(e) ? ((i = e), (n = e.length)) : (n = e),
              (o = t.call(this, n, { width: a, height: h }) || this),
              i && o.initFromArray(i, r),
              o
            );
          }
          return (
            d(e, t),
            (e.prototype.addBaseTextureAt = function (t, e) {
              if (!t.resource)
                throw new Error("ArrayResource does not support RenderTexture");
              return this.addResourceAt(t.resource, e), this;
            }),
            (e.prototype.bind = function (e) {
              t.prototype.bind.call(this, e),
                (e.target = n.sp.TEXTURE_2D_ARRAY);
            }),
            (e.prototype.upload = function (t, e, r) {
              var i = this,
                n = i.length,
                o = i.itemDirtyIds,
                s = i.items,
                a = t.gl;
              r.dirtyId < 0 &&
                a.texImage3D(
                  a.TEXTURE_2D_ARRAY,
                  0,
                  e.format,
                  this._width,
                  this._height,
                  n,
                  0,
                  e.format,
                  e.type,
                  null
                );
              for (var h = 0; h < n; h++) {
                var u = s[h];
                o[h] < u.dirtyId &&
                  ((o[h] = u.dirtyId),
                  u.valid &&
                    a.texSubImage3D(
                      a.TEXTURE_2D_ARRAY,
                      0,
                      0,
                      0,
                      h,
                      u.resource.width,
                      u.resource.height,
                      1,
                      e.format,
                      e.type,
                      u.resource.source
                    ));
              }
              return !0;
            }),
            e
          );
        })(y),
        _ = (function (t) {
          function e(e) {
            var r = this,
              i = e,
              n = i.naturalWidth || i.videoWidth || i.width,
              o = i.naturalHeight || i.videoHeight || i.height;
            return (
              ((r = t.call(this, n, o) || this).source = e),
              (r.noSubImage = !1),
              r
            );
          }
          return (
            d(e, t),
            (e.crossOrigin = function (t, e, r) {
              void 0 === r && 0 !== e.indexOf("data:")
                ? (t.crossOrigin = (0, o.determineCrossOrigin)(e))
                : !1 !== r &&
                  (t.crossOrigin = "string" == typeof r ? r : "anonymous");
            }),
            (e.prototype.upload = function (t, e, r, i) {
              var o = t.gl,
                s = e.realWidth,
                a = e.realHeight;
              return (
                (i = i || this.source),
                o.pixelStorei(
                  o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
                  e.alphaMode === n.iw.UNPACK
                ),
                this.noSubImage ||
                e.target !== o.TEXTURE_2D ||
                r.width !== s ||
                r.height !== a
                  ? ((r.width = s),
                    (r.height = a),
                    o.texImage2D(e.target, 0, e.format, e.format, e.type, i))
                  : o.texSubImage2D(o.TEXTURE_2D, 0, 0, 0, e.format, e.type, i),
                !0
              );
            }),
            (e.prototype.update = function () {
              if (!this.destroyed) {
                var e = this.source,
                  r = e.naturalWidth || e.videoWidth || e.width,
                  i = e.naturalHeight || e.videoHeight || e.height;
                this.resize(r, i), t.prototype.update.call(this);
              }
            }),
            (e.prototype.dispose = function () {
              this.source = null;
            }),
            e
          );
        })(p),
        b = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            d(e, t),
            (e.test = function (t) {
              var e = window.OffscreenCanvas;
              return !!(e && t instanceof e) || t instanceof HTMLCanvasElement;
            }),
            e
          );
        })(_),
        x = (function (t) {
          function e(r, i) {
            var o = this,
              s = i || {},
              a = s.width,
              h = s.height,
              u = s.autoLoad,
              l = s.linkBaseTexture;
            if (r && r.length !== e.SIDES)
              throw new Error(
                "Invalid length. Got " + r.length + ", expected 6"
              );
            o = t.call(this, 6, { width: a, height: h }) || this;
            for (var c = 0; c < e.SIDES; c++)
              o.items[c].target = n.sp.TEXTURE_CUBE_MAP_POSITIVE_X + c;
            return (
              (o.linkBaseTexture = !1 !== l),
              r && o.initFromArray(r, i),
              !1 !== u && o.load(),
              o
            );
          }
          return (
            d(e, t),
            (e.prototype.bind = function (e) {
              t.prototype.bind.call(this, e),
                (e.target = n.sp.TEXTURE_CUBE_MAP);
            }),
            (e.prototype.addBaseTextureAt = function (t, e, r) {
              if ((void 0 === r && (r = this.linkBaseTexture), !this.items[e]))
                throw new Error("Index " + e + " is out of bounds");
              if (
                !this.linkBaseTexture ||
                t.parentTextureArray ||
                Object.keys(t._glTextures).length > 0
              ) {
                if (!t.resource)
                  throw new Error(
                    "CubeResource does not support copying of renderTexture."
                  );
                this.addResourceAt(t.resource, e);
              } else
                (t.target = n.sp.TEXTURE_CUBE_MAP_POSITIVE_X + e),
                  (t.parentTextureArray = this.baseTexture),
                  (this.items[e] = t);
              return (
                t.valid &&
                  !this.valid &&
                  this.resize(t.realWidth, t.realHeight),
                (this.items[e] = t),
                this
              );
            }),
            (e.prototype.upload = function (t, r, i) {
              for (var n = this.itemDirtyIds, o = 0; o < e.SIDES; o++) {
                var s = this.items[o];
                n[o] < s.dirtyId &&
                  (s.valid && s.resource
                    ? (s.resource.upload(t, s, i), (n[o] = s.dirtyId))
                    : n[o] < -1 &&
                      (t.gl.texImage2D(
                        s.target,
                        0,
                        i.internalFormat,
                        r.realWidth,
                        r.realHeight,
                        0,
                        r.format,
                        i.type,
                        null
                      ),
                      (n[o] = -1)));
              }
              return !0;
            }),
            (e.test = function (t) {
              return Array.isArray(t) && t.length === e.SIDES;
            }),
            (e.SIDES = 6),
            e
          );
        })(y),
        T = (function (t) {
          function e(e, r) {
            var n = this;
            if (((r = r || {}), !(e instanceof HTMLImageElement))) {
              var o = new Image();
              _.crossOrigin(o, e, r.crossorigin), (o.src = e), (e = o);
            }
            return (
              (n = t.call(this, e) || this),
              !e.complete &&
                n._width &&
                n._height &&
                ((n._width = 0), (n._height = 0)),
              (n.url = e.src),
              (n._process = null),
              (n.preserveBitmap = !1),
              (n.createBitmap =
                (void 0 !== r.createBitmap
                  ? r.createBitmap
                  : i.X.CREATE_IMAGE_BITMAP) && !!window.createImageBitmap),
              (n.alphaMode =
                "number" == typeof r.alphaMode ? r.alphaMode : null),
              void 0 !== r.premultiplyAlpha &&
                (n.premultiplyAlpha = r.premultiplyAlpha),
              (n.bitmap = null),
              (n._load = null),
              !1 !== r.autoLoad && n.load(),
              n
            );
          }
          return (
            d(e, t),
            (e.prototype.load = function (t) {
              var e = this;
              return (
                this._load ||
                  (void 0 !== t && (this.createBitmap = t),
                  (this._load = new Promise(function (t, r) {
                    var i = e.source;
                    e.url = i.src;
                    var n = function () {
                      e.destroyed ||
                        ((i.onload = null),
                        (i.onerror = null),
                        e.resize(i.width, i.height),
                        (e._load = null),
                        e.createBitmap ? t(e.process()) : t(e));
                    };
                    i.complete && i.src
                      ? n()
                      : ((i.onload = n),
                        (i.onerror = function (t) {
                          r(t), e.onError.emit(t);
                        }));
                  }))),
                this._load
              );
            }),
            (e.prototype.process = function () {
              var t = this,
                e = this.source;
              return null !== this._process
                ? this._process
                : null === this.bitmap && window.createImageBitmap
                ? ((this._process = window
                    .createImageBitmap(e, 0, 0, e.width, e.height, {
                      premultiplyAlpha:
                        this.alphaMode === n.iw.UNPACK ? "premultiply" : "none",
                    })
                    .then(function (e) {
                      return t.destroyed
                        ? Promise.reject()
                        : ((t.bitmap = e),
                          t.update(),
                          (t._process = null),
                          Promise.resolve(t));
                    })),
                  this._process)
                : Promise.resolve(this);
            }),
            (e.prototype.upload = function (e, r, i) {
              if (
                ("number" == typeof this.alphaMode &&
                  (r.alphaMode = this.alphaMode),
                !this.createBitmap)
              )
                return t.prototype.upload.call(this, e, r, i);
              if (!this.bitmap && (this.process(), !this.bitmap)) return !1;
              if (
                (t.prototype.upload.call(this, e, r, i, this.bitmap),
                !this.preserveBitmap)
              ) {
                var n = !0,
                  o = r._glTextures;
                for (var s in o) {
                  var a = o[s];
                  if (a !== i && a.dirtyId !== r.dirtyId) {
                    n = !1;
                    break;
                  }
                }
                n &&
                  (this.bitmap.close && this.bitmap.close(),
                  (this.bitmap = null));
              }
              return !0;
            }),
            (e.prototype.dispose = function () {
              (this.source.onload = null),
                (this.source.onerror = null),
                t.prototype.dispose.call(this),
                this.bitmap && (this.bitmap.close(), (this.bitmap = null)),
                (this._process = null),
                (this._load = null);
            }),
            (e.test = function (t) {
              return "string" == typeof t || t instanceof HTMLImageElement;
            }),
            e
          );
        })(_),
        E = (function (t) {
          function e(e, r) {
            var i = this;
            return (
              (r = r || {}),
              ((i =
                t.call(this, document.createElement("canvas")) ||
                this)._width = 0),
              (i._height = 0),
              (i.svg = e),
              (i.scale = r.scale || 1),
              (i._overrideWidth = r.width),
              (i._overrideHeight = r.height),
              (i._resolve = null),
              (i._crossorigin = r.crossorigin),
              (i._load = null),
              !1 !== r.autoLoad && i.load(),
              i
            );
          }
          return (
            d(e, t),
            (e.prototype.load = function () {
              var t = this;
              return (
                this._load ||
                  (this._load = new Promise(function (e) {
                    if (
                      ((t._resolve = function () {
                        t.resize(t.source.width, t.source.height), e(t);
                      }),
                      /^\<svg/.test(t.svg.trim()))
                    ) {
                      if (!btoa)
                        throw new Error(
                          "Your browser doesn't support base64 conversions."
                        );
                      t.svg =
                        "data:image/svg+xml;base64," +
                        btoa(unescape(encodeURIComponent(t.svg)));
                    }
                    t._loadSvg();
                  })),
                this._load
              );
            }),
            (e.prototype._loadSvg = function () {
              var t = this,
                e = new Image();
              _.crossOrigin(e, this.svg, this._crossorigin),
                (e.src = this.svg),
                (e.onerror = function (r) {
                  t._resolve && ((e.onerror = null), t.onError.emit(r));
                }),
                (e.onload = function () {
                  if (t._resolve) {
                    var r = e.width,
                      i = e.height;
                    if (!r || !i)
                      throw new Error(
                        "The SVG image must have width and height defined (in pixels), canvas API needs them."
                      );
                    var n = r * t.scale,
                      s = i * t.scale;
                    (t._overrideWidth || t._overrideHeight) &&
                      ((n = t._overrideWidth || (t._overrideHeight / i) * r),
                      (s = t._overrideHeight || (t._overrideWidth / r) * i)),
                      (n = Math.round(n)),
                      (s = Math.round(s));
                    var a = t.source;
                    (a.width = n),
                      (a.height = s),
                      (a._pixiId = "canvas_" + (0, o.uid)()),
                      a.getContext("2d").drawImage(e, 0, 0, r, i, 0, 0, n, s),
                      t._resolve(),
                      (t._resolve = null);
                  }
                });
            }),
            (e.getSize = function (t) {
              var r = e.SVG_SIZE.exec(t),
                i = {};
              return (
                r &&
                  ((i[r[1]] = Math.round(parseFloat(r[3]))),
                  (i[r[5]] = Math.round(parseFloat(r[7])))),
                i
              );
            }),
            (e.prototype.dispose = function () {
              t.prototype.dispose.call(this),
                (this._resolve = null),
                (this._crossorigin = null);
            }),
            (e.test = function (t, e) {
              return (
                "svg" === e ||
                ("string" == typeof t &&
                  /^data:image\/svg\+xml(;(charset=utf8|utf8))?;base64/.test(
                    t
                  )) ||
                ("string" == typeof t && 0 === t.indexOf("<svg"))
              );
            }),
            (e.SVG_SIZE =
              /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i),
            e
          );
        })(_),
        w = (function (t) {
          function e(r, i) {
            var n = this;
            if (((i = i || {}), !(r instanceof HTMLVideoElement))) {
              var o = document.createElement("video");
              o.setAttribute("preload", "auto"),
                o.setAttribute("webkit-playsinline", ""),
                o.setAttribute("playsinline", ""),
                "string" == typeof r && (r = [r]);
              var s = r[0].src || r[0];
              _.crossOrigin(o, s, i.crossorigin);
              for (var a = 0; a < r.length; ++a) {
                var h = document.createElement("source"),
                  u = r[a],
                  l = u.src,
                  c = u.mime,
                  d = (l = l || r[a]).split("?").shift().toLowerCase(),
                  p = d.substr(d.lastIndexOf(".") + 1);
                (c = c || e.MIME_TYPES[p] || "video/" + p),
                  (h.src = l),
                  (h.type = c),
                  o.appendChild(h);
              }
              r = o;
            }
            return (
              ((n = t.call(this, r) || this).noSubImage = !0),
              (n._autoUpdate = !0),
              (n._isConnectedToTicker = !1),
              (n._updateFPS = i.updateFPS || 0),
              (n._msToNextUpdate = 0),
              (n.autoPlay = !1 !== i.autoPlay),
              (n._load = null),
              (n._resolve = null),
              (n._onCanPlay = n._onCanPlay.bind(n)),
              (n._onError = n._onError.bind(n)),
              !1 !== i.autoLoad && n.load(),
              n
            );
          }
          return (
            d(e, t),
            (e.prototype.update = function (e) {
              if ((void 0 === e && (e = 0), !this.destroyed)) {
                var r = a.vB.shared.elapsedMS * this.source.playbackRate;
                (this._msToNextUpdate = Math.floor(this._msToNextUpdate - r)),
                  (!this._updateFPS || this._msToNextUpdate <= 0) &&
                    (t.prototype.update.call(this),
                    (this._msToNextUpdate = this._updateFPS
                      ? Math.floor(1e3 / this._updateFPS)
                      : 0));
              }
            }),
            (e.prototype.load = function () {
              var t = this;
              if (this._load) return this._load;
              var e = this.source;
              return (
                (e.readyState === e.HAVE_ENOUGH_DATA ||
                  e.readyState === e.HAVE_FUTURE_DATA) &&
                  e.width &&
                  e.height &&
                  (e.complete = !0),
                e.addEventListener("play", this._onPlayStart.bind(this)),
                e.addEventListener("pause", this._onPlayStop.bind(this)),
                this._isSourceReady()
                  ? this._onCanPlay()
                  : (e.addEventListener("canplay", this._onCanPlay),
                    e.addEventListener("canplaythrough", this._onCanPlay),
                    e.addEventListener("error", this._onError, !0)),
                (this._load = new Promise(function (r) {
                  t.valid ? r(t) : ((t._resolve = r), e.load());
                })),
                this._load
              );
            }),
            (e.prototype._onError = function (t) {
              this.source.removeEventListener("error", this._onError, !0),
                this.onError.emit(t);
            }),
            (e.prototype._isSourcePlaying = function () {
              var t = this.source;
              return (
                t.currentTime > 0 &&
                !1 === t.paused &&
                !1 === t.ended &&
                t.readyState > 2
              );
            }),
            (e.prototype._isSourceReady = function () {
              var t = this.source;
              return 3 === t.readyState || 4 === t.readyState;
            }),
            (e.prototype._onPlayStart = function () {
              this.valid || this._onCanPlay(),
                this.autoUpdate &&
                  !this._isConnectedToTicker &&
                  (a.vB.shared.add(this.update, this),
                  (this._isConnectedToTicker = !0));
            }),
            (e.prototype._onPlayStop = function () {
              this._isConnectedToTicker &&
                (a.vB.shared.remove(this.update, this),
                (this._isConnectedToTicker = !1));
            }),
            (e.prototype._onCanPlay = function () {
              var t = this.source;
              t.removeEventListener("canplay", this._onCanPlay),
                t.removeEventListener("canplaythrough", this._onCanPlay);
              var e = this.valid;
              this.resize(t.videoWidth, t.videoHeight),
                !e &&
                  this._resolve &&
                  (this._resolve(this), (this._resolve = null)),
                this._isSourcePlaying()
                  ? this._onPlayStart()
                  : this.autoPlay && t.play();
            }),
            (e.prototype.dispose = function () {
              this._isConnectedToTicker &&
                a.vB.shared.remove(this.update, this);
              var e = this.source;
              e &&
                (e.removeEventListener("error", this._onError, !0),
                e.pause(),
                (e.src = ""),
                e.load()),
                t.prototype.dispose.call(this);
            }),
            Object.defineProperty(e.prototype, "autoUpdate", {
              get: function () {
                return this._autoUpdate;
              },
              set: function (t) {
                t !== this._autoUpdate &&
                  ((this._autoUpdate = t),
                  !this._autoUpdate && this._isConnectedToTicker
                    ? (a.vB.shared.remove(this.update, this),
                      (this._isConnectedToTicker = !1))
                    : this._autoUpdate &&
                      !this._isConnectedToTicker &&
                      this._isSourcePlaying() &&
                      (a.vB.shared.add(this.update, this),
                      (this._isConnectedToTicker = !0)));
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "updateFPS", {
              get: function () {
                return this._updateFPS;
              },
              set: function (t) {
                t !== this._updateFPS && (this._updateFPS = t);
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.test = function (t, r) {
              return t instanceof HTMLVideoElement || e.TYPES.indexOf(r) > -1;
            }),
            (e.TYPES = [
              "mp4",
              "m4v",
              "webm",
              "ogg",
              "ogv",
              "h264",
              "avi",
              "mov",
            ]),
            (e.MIME_TYPES = {
              ogv: "video/ogg",
              mov: "video/quicktime",
              m4v: "video/mp4",
            }),
            e
          );
        })(_),
        A = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            d(e, t),
            (e.test = function (t) {
              return !!window.createImageBitmap && t instanceof ImageBitmap;
            }),
            e
          );
        })(_);
      u.push(T, A, b, w, E, f, x, g);
      var S = {
          Resource: p,
          BaseImageResource: _,
          INSTALLED: u,
          autoDetectResource: l,
          AbstractMultiResource: y,
          ArrayResource: g,
          BufferResource: f,
          CanvasResource: b,
          CubeResource: x,
          ImageResource: T,
          SVGResource: E,
          VideoResource: w,
          ImageBitmapResource: A,
        },
        I = (function () {
          function t(t) {
            this.renderer = t;
          }
          return (
            (t.prototype.destroy = function () {
              this.renderer = null;
            }),
            t
          );
        })(),
        P = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            d(e, t),
            (e.prototype.upload = function (t, e, r) {
              var i = t.gl;
              return (
                i.pixelStorei(
                  i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
                  e.alphaMode === n.iw.UNPACK
                ),
                r.width === e.width && r.height === e.height
                  ? i.texSubImage2D(
                      e.target,
                      0,
                      0,
                      0,
                      e.width,
                      e.height,
                      e.format,
                      e.type,
                      this.data
                    )
                  : ((r.width = e.width),
                    (r.height = e.height),
                    i.texImage2D(
                      e.target,
                      0,
                      1 === t.context.webGLVersion
                        ? i.DEPTH_COMPONENT
                        : i.DEPTH_COMPONENT16,
                      e.width,
                      e.height,
                      0,
                      e.format,
                      e.type,
                      this.data
                    )),
                !0
              );
            }),
            e
          );
        })(f),
        O = (function () {
          function t(t, e) {
            (this.width = Math.ceil(t || 100)),
              (this.height = Math.ceil(e || 100)),
              (this.stencil = !1),
              (this.depth = !1),
              (this.dirtyId = 0),
              (this.dirtyFormat = 0),
              (this.dirtySize = 0),
              (this.depthTexture = null),
              (this.colorTextures = []),
              (this.glFramebuffers = {}),
              (this.disposeRunner = new s.R("disposeFramebuffer")),
              (this.multisample = n.G5.NONE);
          }
          return (
            Object.defineProperty(t.prototype, "colorTexture", {
              get: function () {
                return this.colorTextures[0];
              },
              enumerable: !1,
              configurable: !0,
            }),
            (t.prototype.addColorTexture = function (t, e) {
              return (
                void 0 === t && (t = 0),
                (this.colorTextures[t] =
                  e ||
                  new v(null, {
                    scaleMode: n.aH.NEAREST,
                    resolution: 1,
                    mipmap: n.WB.OFF,
                    width: this.width,
                    height: this.height,
                  })),
                this.dirtyId++,
                this.dirtyFormat++,
                this
              );
            }),
            (t.prototype.addDepthTexture = function (t) {
              return (
                (this.depthTexture =
                  t ||
                  new v(
                    new P(null, { width: this.width, height: this.height }),
                    {
                      scaleMode: n.aH.NEAREST,
                      resolution: 1,
                      width: this.width,
                      height: this.height,
                      mipmap: n.WB.OFF,
                      format: n.I2.DEPTH_COMPONENT,
                      type: n.vK.UNSIGNED_SHORT,
                    }
                  )),
                this.dirtyId++,
                this.dirtyFormat++,
                this
              );
            }),
            (t.prototype.enableDepth = function () {
              return (
                (this.depth = !0), this.dirtyId++, this.dirtyFormat++, this
              );
            }),
            (t.prototype.enableStencil = function () {
              return (
                (this.stencil = !0), this.dirtyId++, this.dirtyFormat++, this
              );
            }),
            (t.prototype.resize = function (t, e) {
              if (
                ((t = Math.ceil(t)),
                (e = Math.ceil(e)),
                t !== this.width || e !== this.height)
              ) {
                (this.width = t),
                  (this.height = e),
                  this.dirtyId++,
                  this.dirtySize++;
                for (var r = 0; r < this.colorTextures.length; r++) {
                  var i = this.colorTextures[r],
                    n = i.resolution;
                  i.setSize(t / n, e / n);
                }
                this.depthTexture &&
                  ((n = this.depthTexture.resolution),
                  this.depthTexture.setSize(t / n, e / n));
              }
            }),
            (t.prototype.dispose = function () {
              this.disposeRunner.emit(this, !1);
            }),
            (t.prototype.destroyDepthTexture = function () {
              this.depthTexture &&
                (this.depthTexture.destroy(),
                (this.depthTexture = null),
                ++this.dirtyId,
                ++this.dirtyFormat);
            }),
            t
          );
        })(),
        C = (function (t) {
          function e(e) {
            var r = this;
            "number" == typeof e &&
              (e = {
                width: arguments[0],
                height: arguments[1],
                scaleMode: arguments[2],
                resolution: arguments[3],
              }),
              (r = t.call(this, null, e) || this);
            var i = e || {},
              n = i.width,
              o = i.height;
            return (
              (r.mipmap = 0),
              (r.width = Math.ceil(n) || 100),
              (r.height = Math.ceil(o) || 100),
              (r.valid = !0),
              (r.clearColor = [0, 0, 0, 0]),
              (r.framebuffer = new O(
                r.width * r.resolution,
                r.height * r.resolution
              ).addColorTexture(0, r)),
              (r.maskStack = []),
              (r.filterStack = [{}]),
              r
            );
          }
          return (
            d(e, t),
            (e.prototype.resize = function (t, e) {
              (t = Math.ceil(t)),
                (e = Math.ceil(e)),
                this.framebuffer.resize(
                  t * this.resolution,
                  e * this.resolution
                );
            }),
            (e.prototype.dispose = function () {
              this.framebuffer.dispose(), t.prototype.dispose.call(this);
            }),
            (e.prototype.destroy = function () {
              t.prototype.destroy.call(this),
                this.framebuffer.destroyDepthTexture(),
                (this.framebuffer = null);
            }),
            e
          );
        })(v),
        M = (function () {
          function t() {
            (this.x0 = 0),
              (this.y0 = 0),
              (this.x1 = 1),
              (this.y1 = 0),
              (this.x2 = 1),
              (this.y2 = 1),
              (this.x3 = 0),
              (this.y3 = 1),
              (this.uvsFloat32 = new Float32Array(8));
          }
          return (
            (t.prototype.set = function (t, e, r) {
              var i = e.width,
                n = e.height;
              if (r) {
                var o = t.width / 2 / i,
                  s = t.height / 2 / n,
                  a = t.x / i + o,
                  u = t.y / n + s;
                (r = h.Lv.add(r, h.Lv.NW)),
                  (this.x0 = a + o * h.Lv.uX(r)),
                  (this.y0 = u + s * h.Lv.uY(r)),
                  (r = h.Lv.add(r, 2)),
                  (this.x1 = a + o * h.Lv.uX(r)),
                  (this.y1 = u + s * h.Lv.uY(r)),
                  (r = h.Lv.add(r, 2)),
                  (this.x2 = a + o * h.Lv.uX(r)),
                  (this.y2 = u + s * h.Lv.uY(r)),
                  (r = h.Lv.add(r, 2)),
                  (this.x3 = a + o * h.Lv.uX(r)),
                  (this.y3 = u + s * h.Lv.uY(r));
              } else
                (this.x0 = t.x / i),
                  (this.y0 = t.y / n),
                  (this.x1 = (t.x + t.width) / i),
                  (this.y1 = t.y / n),
                  (this.x2 = (t.x + t.width) / i),
                  (this.y2 = (t.y + t.height) / n),
                  (this.x3 = t.x / i),
                  (this.y3 = (t.y + t.height) / n);
              (this.uvsFloat32[0] = this.x0),
                (this.uvsFloat32[1] = this.y0),
                (this.uvsFloat32[2] = this.x1),
                (this.uvsFloat32[3] = this.y1),
                (this.uvsFloat32[4] = this.x2),
                (this.uvsFloat32[5] = this.y2),
                (this.uvsFloat32[6] = this.x3),
                (this.uvsFloat32[7] = this.y3);
            }),
            t
          );
        })(),
        D = new M(),
        R = (function (t) {
          function e(r, i, n, o, s, a) {
            var u = t.call(this) || this;
            if (
              ((u.noFrame = !1),
              i || ((u.noFrame = !0), (i = new h.Ae(0, 0, 1, 1))),
              r instanceof e && (r = r.baseTexture),
              (u.baseTexture = r),
              (u._frame = i),
              (u.trim = o),
              (u.valid = !1),
              (u._uvs = D),
              (u.uvMatrix = null),
              (u.orig = n || i),
              (u._rotate = Number(s || 0)),
              !0 === s)
            )
              u._rotate = 2;
            else if (u._rotate % 2 != 0)
              throw new Error(
                "attempt to use diamond-shaped UVs. If you are sure, set rotation manually"
              );
            return (
              (u.defaultAnchor = a ? new h.E9(a.x, a.y) : new h.E9(0, 0)),
              (u._updateID = 0),
              (u.textureCacheIds = []),
              r.valid
                ? u.noFrame
                  ? r.valid && u.onBaseTextureUpdated(r)
                  : (u.frame = i)
                : r.once("loaded", u.onBaseTextureUpdated, u),
              u.noFrame && r.on("update", u.onBaseTextureUpdated, u),
              u
            );
          }
          return (
            d(e, t),
            (e.prototype.update = function () {
              this.baseTexture.resource && this.baseTexture.resource.update();
            }),
            (e.prototype.onBaseTextureUpdated = function (t) {
              if (this.noFrame) {
                if (!this.baseTexture.valid) return;
                (this._frame.width = t.width),
                  (this._frame.height = t.height),
                  (this.valid = !0),
                  this.updateUvs();
              } else this.frame = this._frame;
              this.emit("update", this);
            }),
            (e.prototype.destroy = function (t) {
              if (this.baseTexture) {
                if (t) {
                  var r = this.baseTexture;
                  r &&
                    r.url &&
                    o.TextureCache[r.url] &&
                    e.removeFromCache(r.url),
                    this.baseTexture.destroy();
                }
                this.baseTexture.off("loaded", this.onBaseTextureUpdated, this),
                  this.baseTexture.off(
                    "update",
                    this.onBaseTextureUpdated,
                    this
                  ),
                  (this.baseTexture = null);
              }
              (this._frame = null),
                (this._uvs = null),
                (this.trim = null),
                (this.orig = null),
                (this.valid = !1),
                e.removeFromCache(this),
                (this.textureCacheIds = null);
            }),
            (e.prototype.clone = function () {
              return new e(
                this.baseTexture,
                this.frame.clone(),
                this.orig.clone(),
                this.trim && this.trim.clone(),
                this.rotate,
                this.defaultAnchor
              );
            }),
            (e.prototype.updateUvs = function () {
              this._uvs === D && (this._uvs = new M()),
                this._uvs.set(this._frame, this.baseTexture, this.rotate),
                this._updateID++;
            }),
            (e.from = function (t, r, n) {
              void 0 === r && (r = {}),
                void 0 === n && (n = i.X.STRICT_TEXTURE_CACHE);
              var s = "string" == typeof t,
                a = null;
              s
                ? (a = t)
                : (t._pixiId || (t._pixiId = "pixiid_" + (0, o.uid)()),
                  (a = t._pixiId));
              var h = o.TextureCache[a];
              if (s && n && !h)
                throw new Error(
                  'The cacheId "' + a + '" does not exist in TextureCache.'
                );
              return (
                h ||
                  (r.resolution ||
                    (r.resolution = (0, o.getResolutionOfUrl)(t)),
                  ((h = new e(new v(t, r))).baseTexture.cacheId = a),
                  v.addToCache(h.baseTexture, a),
                  e.addToCache(h, a)),
                h
              );
            }),
            (e.fromURL = function (t, r) {
              var i = Object.assign(
                  { autoLoad: !1 },
                  null == r ? void 0 : r.resourceOptions
                ),
                n = e.from(t, Object.assign({ resourceOptions: i }, r), !1),
                o = n.baseTexture.resource;
              return n.baseTexture.valid
                ? Promise.resolve(n)
                : o.load().then(function () {
                    return Promise.resolve(n);
                  });
            }),
            (e.fromBuffer = function (t, r, i, n) {
              return new e(v.fromBuffer(t, r, i, n));
            }),
            (e.fromLoader = function (t, r, n) {
              var s = new T(t);
              s.url = r;
              var a = new e(
                new v(s, {
                  scaleMode: i.X.SCALE_MODE,
                  resolution: (0, o.getResolutionOfUrl)(r),
                })
              );
              return (
                n || (n = r),
                v.addToCache(a.baseTexture, n),
                e.addToCache(a, n),
                n !== r && (v.addToCache(a.baseTexture, r), e.addToCache(a, r)),
                a
              );
            }),
            (e.addToCache = function (t, e) {
              e &&
                (-1 === t.textureCacheIds.indexOf(e) &&
                  t.textureCacheIds.push(e),
                o.TextureCache[e] &&
                  console.warn(
                    "Texture added to the cache with an id [" +
                      e +
                      "] that already had an entry"
                  ),
                (o.TextureCache[e] = t));
            }),
            (e.removeFromCache = function (t) {
              if ("string" == typeof t) {
                var e = o.TextureCache[t];
                if (e) {
                  var r = e.textureCacheIds.indexOf(t);
                  return (
                    r > -1 && e.textureCacheIds.splice(r, 1),
                    delete o.TextureCache[t],
                    e
                  );
                }
              } else if (t && t.textureCacheIds) {
                for (var i = 0; i < t.textureCacheIds.length; ++i)
                  o.TextureCache[t.textureCacheIds[i]] === t &&
                    delete o.TextureCache[t.textureCacheIds[i]];
                return (t.textureCacheIds.length = 0), t;
              }
              return null;
            }),
            Object.defineProperty(e.prototype, "resolution", {
              get: function () {
                return this.baseTexture.resolution;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "frame", {
              get: function () {
                return this._frame;
              },
              set: function (t) {
                (this._frame = t), (this.noFrame = !1);
                var e = t.x,
                  r = t.y,
                  i = t.width,
                  n = t.height,
                  o = e + i > this.baseTexture.width,
                  s = r + n > this.baseTexture.height;
                if (o || s) {
                  var a = o && s ? "and" : "or",
                    h =
                      "X: " +
                      e +
                      " + " +
                      i +
                      " = " +
                      (e + i) +
                      " > " +
                      this.baseTexture.width,
                    u =
                      "Y: " +
                      r +
                      " + " +
                      n +
                      " = " +
                      (r + n) +
                      " > " +
                      this.baseTexture.height;
                  throw new Error(
                    "Texture Error: frame does not fit inside the base Texture dimensions: " +
                      h +
                      " " +
                      a +
                      " " +
                      u
                  );
                }
                (this.valid = i && n && this.baseTexture.valid),
                  this.trim || this.rotate || (this.orig = t),
                  this.valid && this.updateUvs();
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "rotate", {
              get: function () {
                return this._rotate;
              },
              set: function (t) {
                (this._rotate = t), this.valid && this.updateUvs();
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "width", {
              get: function () {
                return this.orig.width;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "height", {
              get: function () {
                return this.orig.height;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.castToBaseTexture = function () {
              return this.baseTexture;
            }),
            e
          );
        })(o.EventEmitter);
      function N(t) {
        (t.destroy = function () {}),
          (t.on = function () {}),
          (t.once = function () {}),
          (t.emit = function () {});
      }
      (R.EMPTY = new R(new v())),
        N(R.EMPTY),
        N(R.EMPTY.baseTexture),
        (R.WHITE = (function () {
          var t = document.createElement("canvas");
          (t.width = 16), (t.height = 16);
          var e = t.getContext("2d");
          return (
            (e.fillStyle = "white"),
            e.fillRect(0, 0, 16, 16),
            new R(new v(new b(t)))
          );
        })()),
        N(R.WHITE),
        N(R.WHITE.baseTexture);
      var L = (function (t) {
          function e(e, r) {
            var i = this,
              n = null;
            if (!(e instanceof C)) {
              var o = arguments[1],
                s = arguments[2],
                a = arguments[3],
                h = arguments[4];
              console.warn(
                "Please use RenderTexture.create(" +
                  o +
                  ", " +
                  s +
                  ") instead of the ctor directly."
              ),
                (n = arguments[0]),
                (r = null),
                (e = new C({
                  width: o,
                  height: s,
                  scaleMode: a,
                  resolution: h,
                }));
            }
            return (
              ((i = t.call(this, e, r) || this).legacyRenderer = n),
              (i.valid = !0),
              (i.filterFrame = null),
              (i.filterPoolKey = null),
              i.updateUvs(),
              i
            );
          }
          return (
            d(e, t),
            Object.defineProperty(e.prototype, "framebuffer", {
              get: function () {
                return this.baseTexture.framebuffer;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.resize = function (t, e, r) {
              void 0 === r && (r = !0),
                (t = Math.ceil(t)),
                (e = Math.ceil(e)),
                (this.valid = t > 0 && e > 0),
                (this._frame.width = this.orig.width = t),
                (this._frame.height = this.orig.height = e),
                r && this.baseTexture.resize(t, e),
                this.updateUvs();
            }),
            (e.prototype.setResolution = function (t) {
              var e = this.baseTexture;
              e.resolution !== t &&
                (e.setResolution(t), this.resize(e.width, e.height, !1));
            }),
            (e.create = function (t) {
              return (
                "number" == typeof t &&
                  (t = {
                    width: t,
                    height: arguments[1],
                    scaleMode: arguments[2],
                    resolution: arguments[3],
                  }),
                new e(new C(t))
              );
            }),
            e
          );
        })(R),
        F = (function () {
          function t(t) {
            (this.texturePool = {}),
              (this.textureOptions = t || {}),
              (this.enableFullScreen = !1),
              (this._pixelsWidth = 0),
              (this._pixelsHeight = 0);
          }
          return (
            (t.prototype.createTexture = function (t, e) {
              var r = new C(
                Object.assign(
                  { width: t, height: e, resolution: 1 },
                  this.textureOptions
                )
              );
              return new L(r);
            }),
            (t.prototype.getOptimalTexture = function (e, r, i) {
              void 0 === i && (i = 1);
              var n = t.SCREEN_KEY;
              (e *= i),
                (r *= i),
                (this.enableFullScreen &&
                  e === this._pixelsWidth &&
                  r === this._pixelsHeight) ||
                  (n =
                    ((65535 & (e = (0, o.nextPow2)(e))) << 16) |
                    (65535 & (r = (0, o.nextPow2)(r)))),
                this.texturePool[n] || (this.texturePool[n] = []);
              var s = this.texturePool[n].pop();
              return (
                s || (s = this.createTexture(e, r)),
                (s.filterPoolKey = n),
                s.setResolution(i),
                s
              );
            }),
            (t.prototype.getFilterTexture = function (t, e) {
              var r = this.getOptimalTexture(
                t.width,
                t.height,
                e || t.resolution
              );
              return (r.filterFrame = t.filterFrame), r;
            }),
            (t.prototype.returnTexture = function (t) {
              var e = t.filterPoolKey;
              (t.filterFrame = null), this.texturePool[e].push(t);
            }),
            (t.prototype.returnFilterTexture = function (t) {
              this.returnTexture(t);
            }),
            (t.prototype.clear = function (t) {
              if ((t = !1 !== t))
                for (var e in this.texturePool) {
                  var r = this.texturePool[e];
                  if (r) for (var i = 0; i < r.length; i++) r[i].destroy(!0);
                }
              this.texturePool = {};
            }),
            (t.prototype.setScreenSize = function (e) {
              if (
                e.width !== this._pixelsWidth ||
                e.height !== this._pixelsHeight
              ) {
                var r = t.SCREEN_KEY,
                  i = this.texturePool[r];
                if (((this.enableFullScreen = e.width > 0 && e.height > 0), i))
                  for (var n = 0; n < i.length; n++) i[n].destroy(!0);
                (this.texturePool[r] = []),
                  (this._pixelsWidth = e.width),
                  (this._pixelsHeight = e.height);
              }
            }),
            (t.SCREEN_KEY = "screen"),
            t
          );
        })(),
        U = (function () {
          function t(t, e, r, i, n, o, s) {
            void 0 === e && (e = 0),
              void 0 === r && (r = !1),
              void 0 === i && (i = 5126),
              (this.buffer = t),
              (this.size = e),
              (this.normalized = r),
              (this.type = i),
              (this.stride = n),
              (this.start = o),
              (this.instance = s);
          }
          return (
            (t.prototype.destroy = function () {
              this.buffer = null;
            }),
            (t.from = function (e, r, i, n, o) {
              return new t(e, r, i, n, o);
            }),
            t
          );
        })(),
        B = 0,
        k = (function () {
          function t(t, e, r) {
            void 0 === e && (e = !0),
              void 0 === r && (r = !1),
              (this.data = t || new Float32Array(1)),
              (this._glBuffers = {}),
              (this._updateID = 0),
              (this.index = r),
              (this.static = e),
              (this.id = B++),
              (this.disposeRunner = new s.R("disposeBuffer"));
          }
          return (
            (t.prototype.update = function (t) {
              (this.data = t || this.data), this._updateID++;
            }),
            (t.prototype.dispose = function () {
              this.disposeRunner.emit(this, !1);
            }),
            (t.prototype.destroy = function () {
              this.dispose(), (this.data = null);
            }),
            (t.from = function (e) {
              return e instanceof Array && (e = new Float32Array(e)), new t(e);
            }),
            t
          );
        })();
      function j(t) {
        if (4 === t.BYTES_PER_ELEMENT)
          return t instanceof Float32Array
            ? "Float32Array"
            : t instanceof Uint32Array
            ? "Uint32Array"
            : "Int32Array";
        if (2 === t.BYTES_PER_ELEMENT) {
          if (t instanceof Uint16Array) return "Uint16Array";
        } else if (1 === t.BYTES_PER_ELEMENT && t instanceof Uint8Array)
          return "Uint8Array";
        return null;
      }
      var H = { Float32Array, Uint32Array, Int32Array, Uint8Array },
        X = { 5126: 4, 5123: 2, 5121: 1 },
        G = 0,
        z = { Float32Array, Uint32Array, Int32Array, Uint8Array, Uint16Array },
        V = (function () {
          function t(t, e) {
            void 0 === t && (t = []),
              void 0 === e && (e = {}),
              (this.buffers = t),
              (this.indexBuffer = null),
              (this.attributes = e),
              (this.glVertexArrayObjects = {}),
              (this.id = G++),
              (this.instanced = !1),
              (this.instanceCount = 1),
              (this.disposeRunner = new s.R("disposeGeometry")),
              (this.refCount = 0);
          }
          return (
            (t.prototype.addAttribute = function (t, e, r, i, n, o, s, a) {
              if (
                (void 0 === r && (r = 0),
                void 0 === i && (i = !1),
                void 0 === a && (a = !1),
                !e)
              )
                throw new Error(
                  "You must pass a buffer when creating an attribute"
                );
              e instanceof k ||
                (e instanceof Array && (e = new Float32Array(e)),
                (e = new k(e)));
              var h = t.split("|");
              if (h.length > 1) {
                for (var u = 0; u < h.length; u++)
                  this.addAttribute(h[u], e, r, i, n);
                return this;
              }
              var l = this.buffers.indexOf(e);
              return (
                -1 === l &&
                  (this.buffers.push(e), (l = this.buffers.length - 1)),
                (this.attributes[t] = new U(l, r, i, n, o, s, a)),
                (this.instanced = this.instanced || a),
                this
              );
            }),
            (t.prototype.getAttribute = function (t) {
              return this.attributes[t];
            }),
            (t.prototype.getBuffer = function (t) {
              return this.buffers[this.getAttribute(t).buffer];
            }),
            (t.prototype.addIndex = function (t) {
              return (
                t instanceof k ||
                  (t instanceof Array && (t = new Uint16Array(t)),
                  (t = new k(t))),
                (t.index = !0),
                (this.indexBuffer = t),
                -1 === this.buffers.indexOf(t) && this.buffers.push(t),
                this
              );
            }),
            (t.prototype.getIndex = function () {
              return this.indexBuffer;
            }),
            (t.prototype.interleave = function () {
              if (
                1 === this.buffers.length ||
                (2 === this.buffers.length && this.indexBuffer)
              )
                return this;
              var t,
                e = [],
                r = [],
                i = new k();
              for (t in this.attributes) {
                var n = this.attributes[t],
                  o = this.buffers[n.buffer];
                e.push(o.data),
                  r.push((n.size * X[n.type]) / 4),
                  (n.buffer = 0);
              }
              for (
                i.data = (function (t, e) {
                  for (var r = 0, i = 0, n = {}, o = 0; o < t.length; o++)
                    (i += e[o]), (r += t[o].length);
                  var s = new ArrayBuffer(4 * r),
                    a = null,
                    h = 0;
                  for (o = 0; o < t.length; o++) {
                    var u = e[o],
                      l = t[o],
                      c = j(l);
                    n[c] || (n[c] = new H[c](s)), (a = n[c]);
                    for (var d = 0; d < l.length; d++)
                      a[((d / u) | 0) * i + h + (d % u)] = l[d];
                    h += u;
                  }
                  return new Float32Array(s);
                })(e, r),
                  t = 0;
                t < this.buffers.length;
                t++
              )
                this.buffers[t] !== this.indexBuffer &&
                  this.buffers[t].destroy();
              return (
                (this.buffers = [i]),
                this.indexBuffer && this.buffers.push(this.indexBuffer),
                this
              );
            }),
            (t.prototype.getSize = function () {
              for (var t in this.attributes) {
                var e = this.attributes[t];
                return (
                  this.buffers[e.buffer].data.length / (e.stride / 4 || e.size)
                );
              }
              return 0;
            }),
            (t.prototype.dispose = function () {
              this.disposeRunner.emit(this, !1);
            }),
            (t.prototype.destroy = function () {
              this.dispose(),
                (this.buffers = null),
                (this.indexBuffer = null),
                (this.attributes = null);
            }),
            (t.prototype.clone = function () {
              for (var e = new t(), r = 0; r < this.buffers.length; r++)
                e.buffers[r] = new k(this.buffers[r].data.slice(0));
              for (var r in this.attributes) {
                var i = this.attributes[r];
                e.attributes[r] = new U(
                  i.buffer,
                  i.size,
                  i.normalized,
                  i.type,
                  i.stride,
                  i.start,
                  i.instance
                );
              }
              return (
                this.indexBuffer &&
                  ((e.indexBuffer =
                    e.buffers[this.buffers.indexOf(this.indexBuffer)]),
                  (e.indexBuffer.index = !0)),
                e
              );
            }),
            (t.merge = function (e) {
              for (
                var r, i = new t(), n = [], o = [], s = [], a = 0;
                a < e.length;
                a++
              ) {
                r = e[a];
                for (var h = 0; h < r.buffers.length; h++)
                  (o[h] = o[h] || 0),
                    (o[h] += r.buffers[h].data.length),
                    (s[h] = 0);
              }
              for (a = 0; a < r.buffers.length; a++)
                (n[a] = new z[j(r.buffers[a].data)](o[a])),
                  (i.buffers[a] = new k(n[a]));
              for (a = 0; a < e.length; a++)
                for (r = e[a], h = 0; h < r.buffers.length; h++)
                  n[h].set(r.buffers[h].data, s[h]),
                    (s[h] += r.buffers[h].data.length);
              if (((i.attributes = r.attributes), r.indexBuffer)) {
                (i.indexBuffer = i.buffers[r.buffers.indexOf(r.indexBuffer)]),
                  (i.indexBuffer.index = !0);
                var u = 0,
                  l = 0,
                  c = 0,
                  d = 0;
                for (a = 0; a < r.buffers.length; a++)
                  if (r.buffers[a] !== r.indexBuffer) {
                    d = a;
                    break;
                  }
                for (var a in r.attributes) {
                  var p = r.attributes[a];
                  (0 | p.buffer) === d && (l += (p.size * X[p.type]) / 4);
                }
                for (a = 0; a < e.length; a++) {
                  var f = e[a].indexBuffer.data;
                  for (h = 0; h < f.length; h++) i.indexBuffer.data[h + c] += u;
                  (u += r.buffers[d].data.length / l), (c += f.length);
                }
              }
              return i;
            }),
            t
          );
        })(),
        W = (function (t) {
          function e() {
            var e = t.call(this) || this;
            return (
              e
                .addAttribute(
                  "aVertexPosition",
                  new Float32Array([0, 0, 1, 0, 1, 1, 0, 1])
                )
                .addIndex([0, 1, 3, 2]),
              e
            );
          }
          return d(e, t), e;
        })(V),
        Y = (function (t) {
          function e() {
            var e = t.call(this) || this;
            return (
              (e.vertices = new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1])),
              (e.uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1])),
              (e.vertexBuffer = new k(e.vertices)),
              (e.uvBuffer = new k(e.uvs)),
              e
                .addAttribute("aVertexPosition", e.vertexBuffer)
                .addAttribute("aTextureCoord", e.uvBuffer)
                .addIndex([0, 1, 2, 0, 2, 3]),
              e
            );
          }
          return (
            d(e, t),
            (e.prototype.map = function (t, e) {
              var r = 0,
                i = 0;
              return (
                (this.uvs[0] = r),
                (this.uvs[1] = i),
                (this.uvs[2] = r + e.width / t.width),
                (this.uvs[3] = i),
                (this.uvs[4] = r + e.width / t.width),
                (this.uvs[5] = i + e.height / t.height),
                (this.uvs[6] = r),
                (this.uvs[7] = i + e.height / t.height),
                (r = e.x),
                (i = e.y),
                (this.vertices[0] = r),
                (this.vertices[1] = i),
                (this.vertices[2] = r + e.width),
                (this.vertices[3] = i),
                (this.vertices[4] = r + e.width),
                (this.vertices[5] = i + e.height),
                (this.vertices[6] = r),
                (this.vertices[7] = i + e.height),
                this.invalidate(),
                this
              );
            }),
            (e.prototype.invalidate = function () {
              return (
                this.vertexBuffer._updateID++, this.uvBuffer._updateID++, this
              );
            }),
            e
          );
        })(V),
        q = 0,
        K = (function () {
          function t(t, e) {
            (this.uniforms = t),
              (this.group = !0),
              (this.syncUniforms = {}),
              (this.dirtyId = 0),
              (this.id = q++),
              (this.static = !!e);
          }
          return (
            (t.prototype.update = function () {
              this.dirtyId++;
            }),
            (t.prototype.add = function (e, r, i) {
              this.uniforms[e] = new t(r, i);
            }),
            (t.from = function (e, r) {
              return new t(e, r);
            }),
            t
          );
        })(),
        $ = (function () {
          function t() {
            (this.renderTexture = null),
              (this.target = null),
              (this.legacy = !1),
              (this.resolution = 1),
              (this.sourceFrame = new h.Ae()),
              (this.destinationFrame = new h.Ae()),
              (this.filters = []);
          }
          return (
            (t.prototype.clear = function () {
              (this.target = null),
                (this.filters = null),
                (this.renderTexture = null);
            }),
            t
          );
        })(),
        Z = (function (t) {
          function e(e) {
            var r = t.call(this, e) || this;
            return (
              (r.defaultFilterStack = [{}]),
              (r.texturePool = new F()),
              r.texturePool.setScreenSize(e.view),
              (r.statePool = []),
              (r.quad = new W()),
              (r.quadUv = new Y()),
              (r.tempRect = new h.Ae()),
              (r.activeState = {}),
              (r.globalUniforms = new K(
                {
                  outputFrame: r.tempRect,
                  inputSize: new Float32Array(4),
                  inputPixel: new Float32Array(4),
                  inputClamp: new Float32Array(4),
                  resolution: 1,
                  filterArea: new Float32Array(4),
                  filterClamp: new Float32Array(4),
                },
                !0
              )),
              (r.forceClear = !1),
              (r.useMaxPadding = !1),
              r
            );
          }
          return (
            d(e, t),
            (e.prototype.push = function (t, e) {
              for (
                var r = this.renderer,
                  i = this.defaultFilterStack,
                  n = this.statePool.pop() || new $(),
                  o = e[0].resolution,
                  s = e[0].padding,
                  a = e[0].autoFit,
                  h = e[0].legacy,
                  u = 1;
                u < e.length;
                u++
              ) {
                var l = e[u];
                (o = Math.min(o, l.resolution)),
                  (s = this.useMaxPadding
                    ? Math.max(s, l.padding)
                    : s + l.padding),
                  (a = a && l.autoFit),
                  (h = h || l.legacy);
              }
              1 === i.length &&
                (this.defaultFilterStack[0].renderTexture =
                  r.renderTexture.current),
                i.push(n),
                (n.resolution = o),
                (n.legacy = h),
                (n.target = t),
                n.sourceFrame.copyFrom(t.filterArea || t.getBounds(!0)),
                n.sourceFrame.pad(s),
                a && n.sourceFrame.fit(this.renderer.renderTexture.sourceFrame),
                n.sourceFrame.ceil(o),
                (n.renderTexture = this.getOptimalFilterTexture(
                  n.sourceFrame.width,
                  n.sourceFrame.height,
                  o
                )),
                (n.filters = e),
                (n.destinationFrame.width = n.renderTexture.width),
                (n.destinationFrame.height = n.renderTexture.height);
              var c = this.tempRect;
              (c.width = n.sourceFrame.width),
                (c.height = n.sourceFrame.height),
                (n.renderTexture.filterFrame = n.sourceFrame),
                r.renderTexture.bind(n.renderTexture, n.sourceFrame, c),
                r.renderTexture.clear();
            }),
            (e.prototype.pop = function () {
              var t = this.defaultFilterStack,
                e = t.pop(),
                r = e.filters;
              this.activeState = e;
              var i = this.globalUniforms.uniforms;
              (i.outputFrame = e.sourceFrame), (i.resolution = e.resolution);
              var o = i.inputSize,
                s = i.inputPixel,
                a = i.inputClamp;
              if (
                ((o[0] = e.destinationFrame.width),
                (o[1] = e.destinationFrame.height),
                (o[2] = 1 / o[0]),
                (o[3] = 1 / o[1]),
                (s[0] = o[0] * e.resolution),
                (s[1] = o[1] * e.resolution),
                (s[2] = 1 / s[0]),
                (s[3] = 1 / s[1]),
                (a[0] = 0.5 * s[2]),
                (a[1] = 0.5 * s[3]),
                (a[2] = e.sourceFrame.width * o[2] - 0.5 * s[2]),
                (a[3] = e.sourceFrame.height * o[3] - 0.5 * s[3]),
                e.legacy)
              ) {
                var h = i.filterArea;
                (h[0] = e.destinationFrame.width),
                  (h[1] = e.destinationFrame.height),
                  (h[2] = e.sourceFrame.x),
                  (h[3] = e.sourceFrame.y),
                  (i.filterClamp = i.inputClamp);
              }
              this.globalUniforms.update();
              var u = t[t.length - 1];
              if (
                (e.renderTexture.framebuffer.multisample > 1 &&
                  this.renderer.framebuffer.blit(),
                1 === r.length)
              )
                r[0].apply(
                  this,
                  e.renderTexture,
                  u.renderTexture,
                  n.yl.BLEND,
                  e
                ),
                  this.returnFilterTexture(e.renderTexture);
              else {
                var l = e.renderTexture,
                  c = this.getOptimalFilterTexture(
                    l.width,
                    l.height,
                    e.resolution
                  );
                c.filterFrame = l.filterFrame;
                var d = 0;
                for (d = 0; d < r.length - 1; ++d) {
                  r[d].apply(this, l, c, n.yl.CLEAR, e);
                  var p = l;
                  (l = c), (c = p);
                }
                r[d].apply(this, l, u.renderTexture, n.yl.BLEND, e),
                  this.returnFilterTexture(l),
                  this.returnFilterTexture(c);
              }
              e.clear(), this.statePool.push(e);
            }),
            (e.prototype.bindAndClear = function (t, e) {
              if ((void 0 === e && (e = n.yl.CLEAR), t && t.filterFrame)) {
                var r = this.tempRect;
                (r.width = t.filterFrame.width),
                  (r.height = t.filterFrame.height),
                  this.renderer.renderTexture.bind(t, t.filterFrame, r);
              } else this.renderer.renderTexture.bind(t);
              "boolean" == typeof e &&
                ((e = e ? n.yl.CLEAR : n.yl.BLEND),
                (0, o.deprecation)(
                  "5.2.1",
                  "Use CLEAR_MODES when using clear applyFilter option"
                )),
                (e === n.yl.CLEAR || (e === n.yl.BLIT && this.forceClear)) &&
                  this.renderer.renderTexture.clear();
            }),
            (e.prototype.applyFilter = function (t, e, r, i) {
              var o = this.renderer;
              this.bindAndClear(r, i),
                (t.uniforms.uSampler = e),
                (t.uniforms.filterGlobals = this.globalUniforms),
                o.state.set(t.state),
                o.shader.bind(t),
                t.legacy
                  ? (this.quadUv.map(e._frame, e.filterFrame),
                    o.geometry.bind(this.quadUv),
                    o.geometry.draw(n.lg.TRIANGLES))
                  : (o.geometry.bind(this.quad),
                    o.geometry.draw(n.lg.TRIANGLE_STRIP));
            }),
            (e.prototype.calculateSpriteMatrix = function (t, e) {
              var r = this.activeState,
                i = r.sourceFrame,
                n = r.destinationFrame,
                o = e._texture.orig,
                s = t.set(n.width, 0, 0, n.height, i.x, i.y),
                a = e.worldTransform.copyTo(h.y3.TEMP_MATRIX);
              return (
                a.invert(),
                s.prepend(a),
                s.scale(1 / o.width, 1 / o.height),
                s.translate(e.anchor.x, e.anchor.y),
                s
              );
            }),
            (e.prototype.destroy = function () {
              this.texturePool.clear(!1);
            }),
            (e.prototype.getOptimalFilterTexture = function (t, e, r) {
              return (
                void 0 === r && (r = 1),
                this.texturePool.getOptimalTexture(t, e, r)
              );
            }),
            (e.prototype.getFilterTexture = function (t, e) {
              if ("number" == typeof t) {
                var r = t;
                (t = e), (e = r);
              }
              t = t || this.activeState.renderTexture;
              var i = this.texturePool.getOptimalTexture(
                t.width,
                t.height,
                e || t.resolution
              );
              return (i.filterFrame = t.filterFrame), i;
            }),
            (e.prototype.returnFilterTexture = function (t) {
              this.texturePool.returnTexture(t);
            }),
            (e.prototype.emptyPool = function () {
              this.texturePool.clear(!0);
            }),
            (e.prototype.resize = function () {
              this.texturePool.setScreenSize(this.renderer.view);
            }),
            e
          );
        })(I),
        J = (function () {
          function t(t) {
            this.renderer = t;
          }
          return (
            (t.prototype.flush = function () {}),
            (t.prototype.destroy = function () {
              this.renderer = null;
            }),
            (t.prototype.start = function () {}),
            (t.prototype.stop = function () {
              this.flush();
            }),
            (t.prototype.render = function (t) {}),
            t
          );
        })(),
        Q = (function (t) {
          function e(e) {
            var r = t.call(this, e) || this;
            return (
              (r.emptyRenderer = new J(e)),
              (r.currentRenderer = r.emptyRenderer),
              r
            );
          }
          return (
            d(e, t),
            (e.prototype.setObjectRenderer = function (t) {
              this.currentRenderer !== t &&
                (this.currentRenderer.stop(),
                (this.currentRenderer = t),
                this.currentRenderer.start());
            }),
            (e.prototype.flush = function () {
              this.setObjectRenderer(this.emptyRenderer);
            }),
            (e.prototype.reset = function () {
              this.setObjectRenderer(this.emptyRenderer);
            }),
            (e.prototype.copyBoundTextures = function (t, e) {
              for (
                var r = this.renderer.texture.boundTextures, i = e - 1;
                i >= 0;
                --i
              )
                (t[i] = r[i] || null), t[i] && (t[i]._batchLocation = i);
            }),
            (e.prototype.boundArray = function (t, e, r, i) {
              for (
                var n = t.elements, o = t.ids, s = t.count, a = 0, h = 0;
                h < s;
                h++
              ) {
                var u = n[h],
                  l = u._batchLocation;
                if (l >= 0 && l < i && e[l] === u) o[h] = l;
                else
                  for (; a < i; ) {
                    var c = e[a];
                    if (!c || c._batchEnabled !== r || c._batchLocation !== a) {
                      (o[h] = a), (u._batchLocation = a), (e[a] = u);
                      break;
                    }
                    a++;
                  }
              }
            }),
            e
          );
        })(I),
        tt = 0,
        et = (function (t) {
          function e(e) {
            var r = t.call(this, e) || this;
            return (
              (r.webGLVersion = 1),
              (r.extensions = {}),
              (r.supports = { uint32Indices: !1 }),
              (r.handleContextLost = r.handleContextLost.bind(r)),
              (r.handleContextRestored = r.handleContextRestored.bind(r)),
              e.view.addEventListener(
                "webglcontextlost",
                r.handleContextLost,
                !1
              ),
              e.view.addEventListener(
                "webglcontextrestored",
                r.handleContextRestored,
                !1
              ),
              r
            );
          }
          return (
            d(e, t),
            Object.defineProperty(e.prototype, "isLost", {
              get: function () {
                return !this.gl || this.gl.isContextLost();
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.contextChange = function (t) {
              (this.gl = t),
                (this.renderer.gl = t),
                (this.renderer.CONTEXT_UID = tt++),
                t.isContextLost() &&
                  t.getExtension("WEBGL_lose_context") &&
                  t.getExtension("WEBGL_lose_context").restoreContext();
            }),
            (e.prototype.initFromContext = function (t) {
              (this.gl = t),
                this.validateContext(t),
                (this.renderer.gl = t),
                (this.renderer.CONTEXT_UID = tt++),
                this.renderer.runners.contextChange.emit(t);
            }),
            (e.prototype.initFromOptions = function (t) {
              var e = this.createContext(this.renderer.view, t);
              this.initFromContext(e);
            }),
            (e.prototype.createContext = function (t, e) {
              var r;
              if (
                (i.X.PREFER_ENV >= n.Vi.WEBGL2 &&
                  (r = t.getContext("webgl2", e)),
                r)
              )
                this.webGLVersion = 2;
              else if (
                ((this.webGLVersion = 1),
                !(r =
                  t.getContext("webgl", e) ||
                  t.getContext("experimental-webgl", e)))
              )
                throw new Error(
                  "This browser does not support WebGL. Try using the canvas renderer"
                );
              return (this.gl = r), this.getExtensions(), this.gl;
            }),
            (e.prototype.getExtensions = function () {
              var t = this.gl;
              1 === this.webGLVersion
                ? Object.assign(this.extensions, {
                    drawBuffers: t.getExtension("WEBGL_draw_buffers"),
                    depthTexture: t.getExtension("WEBGL_depth_texture"),
                    loseContext: t.getExtension("WEBGL_lose_context"),
                    vertexArrayObject:
                      t.getExtension("OES_vertex_array_object") ||
                      t.getExtension("MOZ_OES_vertex_array_object") ||
                      t.getExtension("WEBKIT_OES_vertex_array_object"),
                    anisotropicFiltering: t.getExtension(
                      "EXT_texture_filter_anisotropic"
                    ),
                    uint32ElementIndex: t.getExtension(
                      "OES_element_index_uint"
                    ),
                    floatTexture: t.getExtension("OES_texture_float"),
                    floatTextureLinear: t.getExtension(
                      "OES_texture_float_linear"
                    ),
                    textureHalfFloat: t.getExtension("OES_texture_half_float"),
                    textureHalfFloatLinear: t.getExtension(
                      "OES_texture_half_float_linear"
                    ),
                  })
                : 2 === this.webGLVersion &&
                  Object.assign(this.extensions, {
                    anisotropicFiltering: t.getExtension(
                      "EXT_texture_filter_anisotropic"
                    ),
                    colorBufferFloat: t.getExtension("EXT_color_buffer_float"),
                    floatTextureLinear: t.getExtension(
                      "OES_texture_float_linear"
                    ),
                  });
            }),
            (e.prototype.handleContextLost = function (t) {
              t.preventDefault();
            }),
            (e.prototype.handleContextRestored = function () {
              this.renderer.runners.contextChange.emit(this.gl);
            }),
            (e.prototype.destroy = function () {
              var t = this.renderer.view;
              t.removeEventListener("webglcontextlost", this.handleContextLost),
                t.removeEventListener(
                  "webglcontextrestored",
                  this.handleContextRestored
                ),
                this.gl.useProgram(null),
                this.extensions.loseContext &&
                  this.extensions.loseContext.loseContext();
            }),
            (e.prototype.postrender = function () {
              this.renderer.renderingToScreen && this.gl.flush();
            }),
            (e.prototype.validateContext = function (t) {
              var e = t.getContextAttributes(),
                r =
                  "WebGL2RenderingContext" in window &&
                  t instanceof window.WebGL2RenderingContext;
              r && (this.webGLVersion = 2),
                e.stencil ||
                  console.warn(
                    "Provided WebGL context does not have a stencil buffer, masks may not render correctly"
                  );
              var i = r || !!t.getExtension("OES_element_index_uint");
              (this.supports.uint32Indices = i),
                i ||
                  console.warn(
                    "Provided WebGL context does not support 32 index buffer, complex graphics may not render correctly"
                  );
            }),
            e
          );
        })(I),
        rt = function (t) {
          (this.framebuffer = t),
            (this.stencil = null),
            (this.dirtyId = 0),
            (this.dirtyFormat = 0),
            (this.dirtySize = 0),
            (this.multisample = n.G5.NONE),
            (this.msaaBuffer = null),
            (this.blitFramebuffer = null);
        },
        it = new h.Ae(),
        nt = (function (t) {
          function e(e) {
            var r = t.call(this, e) || this;
            return (
              (r.managedFramebuffers = []),
              (r.unknownFramebuffer = new O(10, 10)),
              (r.msaaSamples = null),
              r
            );
          }
          return (
            d(e, t),
            (e.prototype.contextChange = function () {
              var t = (this.gl = this.renderer.gl);
              if (
                ((this.CONTEXT_UID = this.renderer.CONTEXT_UID),
                (this.current = this.unknownFramebuffer),
                (this.viewport = new h.Ae()),
                (this.hasMRT = !0),
                (this.writeDepthTexture = !0),
                this.disposeAll(!0),
                1 === this.renderer.context.webGLVersion)
              ) {
                var e = this.renderer.context.extensions.drawBuffers,
                  r = this.renderer.context.extensions.depthTexture;
                i.X.PREFER_ENV === n.Vi.WEBGL_LEGACY &&
                  ((e = null), (r = null)),
                  e
                    ? (t.drawBuffers = function (t) {
                        return e.drawBuffersWEBGL(t);
                      })
                    : ((this.hasMRT = !1), (t.drawBuffers = function () {})),
                  r || (this.writeDepthTexture = !1);
              } else
                this.msaaSamples = t.getInternalformatParameter(
                  t.RENDERBUFFER,
                  t.RGBA8,
                  t.SAMPLES
                );
            }),
            (e.prototype.bind = function (t, e) {
              var r = this.gl;
              if (t) {
                var i =
                  t.glFramebuffers[this.CONTEXT_UID] || this.initFramebuffer(t);
                this.current !== t &&
                  ((this.current = t),
                  r.bindFramebuffer(r.FRAMEBUFFER, i.framebuffer)),
                  i.dirtyId !== t.dirtyId &&
                    ((i.dirtyId = t.dirtyId),
                    i.dirtyFormat !== t.dirtyFormat
                      ? ((i.dirtyFormat = t.dirtyFormat),
                        this.updateFramebuffer(t))
                      : i.dirtySize !== t.dirtySize &&
                        ((i.dirtySize = t.dirtySize),
                        this.resizeFramebuffer(t)));
                for (var n = 0; n < t.colorTextures.length; n++) {
                  var o = t.colorTextures[n];
                  this.renderer.texture.unbind(o.parentTextureArray || o);
                }
                t.depthTexture && this.renderer.texture.unbind(t.depthTexture),
                  e
                    ? this.setViewport(e.x, e.y, e.width, e.height)
                    : this.setViewport(0, 0, t.width, t.height);
              } else
                this.current &&
                  ((this.current = null),
                  r.bindFramebuffer(r.FRAMEBUFFER, null)),
                  e
                    ? this.setViewport(e.x, e.y, e.width, e.height)
                    : this.setViewport(
                        0,
                        0,
                        this.renderer.width,
                        this.renderer.height
                      );
            }),
            (e.prototype.setViewport = function (t, e, r, i) {
              var n = this.viewport;
              (n.width === r && n.height === i && n.x === t && n.y === e) ||
                ((n.x = t),
                (n.y = e),
                (n.width = r),
                (n.height = i),
                this.gl.viewport(t, e, r, i));
            }),
            Object.defineProperty(e.prototype, "size", {
              get: function () {
                return this.current
                  ? {
                      x: 0,
                      y: 0,
                      width: this.current.width,
                      height: this.current.height,
                    }
                  : {
                      x: 0,
                      y: 0,
                      width: this.renderer.width,
                      height: this.renderer.height,
                    };
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.clear = function (t, e, r, i, o) {
              void 0 === o && (o = n.V0.COLOR | n.V0.DEPTH);
              var s = this.gl;
              s.clearColor(t, e, r, i), s.clear(o);
            }),
            (e.prototype.initFramebuffer = function (t) {
              var e = this.gl,
                r = new rt(e.createFramebuffer());
              return (
                (r.multisample = this.detectSamples(t.multisample)),
                (t.glFramebuffers[this.CONTEXT_UID] = r),
                this.managedFramebuffers.push(t),
                t.disposeRunner.add(this),
                r
              );
            }),
            (e.prototype.resizeFramebuffer = function (t) {
              var e = this.gl,
                r = t.glFramebuffers[this.CONTEXT_UID];
              r.stencil &&
                (e.bindRenderbuffer(e.RENDERBUFFER, r.stencil),
                e.renderbufferStorage(
                  e.RENDERBUFFER,
                  e.DEPTH_STENCIL,
                  t.width,
                  t.height
                ));
              for (var i = t.colorTextures, n = 0; n < i.length; n++)
                this.renderer.texture.bind(i[n], 0);
              t.depthTexture && this.renderer.texture.bind(t.depthTexture, 0);
            }),
            (e.prototype.updateFramebuffer = function (t) {
              var e = this.gl,
                r = t.glFramebuffers[this.CONTEXT_UID],
                i = t.colorTextures.length;
              e.drawBuffers || (i = Math.min(i, 1)),
                r.multisample > 1 &&
                  ((r.msaaBuffer = e.createRenderbuffer()),
                  e.bindRenderbuffer(e.RENDERBUFFER, r.msaaBuffer),
                  e.renderbufferStorageMultisample(
                    e.RENDERBUFFER,
                    r.multisample,
                    e.RGBA8,
                    t.width,
                    t.height
                  ),
                  e.framebufferRenderbuffer(
                    e.FRAMEBUFFER,
                    e.COLOR_ATTACHMENT0,
                    e.RENDERBUFFER,
                    r.msaaBuffer
                  ));
              for (var n = [], o = 0; o < i; o++)
                if (!(0 === o && r.multisample > 1)) {
                  var s = t.colorTextures[o],
                    a = s.parentTextureArray || s;
                  this.renderer.texture.bind(a, 0),
                    e.framebufferTexture2D(
                      e.FRAMEBUFFER,
                      e.COLOR_ATTACHMENT0 + o,
                      s.target,
                      a._glTextures[this.CONTEXT_UID].texture,
                      0
                    ),
                    n.push(e.COLOR_ATTACHMENT0 + o);
                }
              if (
                (n.length > 1 && e.drawBuffers(n),
                t.depthTexture && this.writeDepthTexture)
              ) {
                var h = t.depthTexture;
                this.renderer.texture.bind(h, 0),
                  e.framebufferTexture2D(
                    e.FRAMEBUFFER,
                    e.DEPTH_ATTACHMENT,
                    e.TEXTURE_2D,
                    h._glTextures[this.CONTEXT_UID].texture,
                    0
                  );
              }
              r.stencil ||
                (!t.stencil && !t.depth) ||
                ((r.stencil = e.createRenderbuffer()),
                e.bindRenderbuffer(e.RENDERBUFFER, r.stencil),
                e.renderbufferStorage(
                  e.RENDERBUFFER,
                  e.DEPTH_STENCIL,
                  t.width,
                  t.height
                ),
                t.depthTexture ||
                  e.framebufferRenderbuffer(
                    e.FRAMEBUFFER,
                    e.DEPTH_STENCIL_ATTACHMENT,
                    e.RENDERBUFFER,
                    r.stencil
                  ));
            }),
            (e.prototype.detectSamples = function (t) {
              var e = this.msaaSamples,
                r = n.G5.NONE;
              if (t <= 1 || null === e) return r;
              for (var i = 0; i < e.length; i++)
                if (e[i] <= t) {
                  r = e[i];
                  break;
                }
              return 1 === r && (r = n.G5.NONE), r;
            }),
            (e.prototype.blit = function (t, e, r) {
              var i = this,
                n = i.current,
                o = i.renderer,
                s = i.gl,
                a = i.CONTEXT_UID;
              if (2 === o.context.webGLVersion && n) {
                var h = n.glFramebuffers[a];
                if (h) {
                  if (!t) {
                    if (h.multisample <= 1) return;
                    h.blitFramebuffer ||
                      ((h.blitFramebuffer = new O(n.width, n.height)),
                      h.blitFramebuffer.addColorTexture(0, n.colorTextures[0])),
                      ((t = h.blitFramebuffer).width = n.width),
                      (t.height = n.height);
                  }
                  e || (((e = it).width = n.width), (e.height = n.height)),
                    r || (r = e);
                  var u = e.width === r.width && e.height === r.height;
                  this.bind(t),
                    s.bindFramebuffer(s.READ_FRAMEBUFFER, h.framebuffer),
                    s.blitFramebuffer(
                      e.x,
                      e.y,
                      e.width,
                      e.height,
                      r.x,
                      r.y,
                      r.width,
                      r.height,
                      s.COLOR_BUFFER_BIT,
                      u ? s.NEAREST : s.LINEAR
                    );
                }
              }
            }),
            (e.prototype.disposeFramebuffer = function (t, e) {
              var r = t.glFramebuffers[this.CONTEXT_UID],
                i = this.gl;
              if (r) {
                delete t.glFramebuffers[this.CONTEXT_UID];
                var n = this.managedFramebuffers.indexOf(t);
                n >= 0 && this.managedFramebuffers.splice(n, 1),
                  t.disposeRunner.remove(this),
                  e ||
                    (i.deleteFramebuffer(r.framebuffer),
                    r.stencil && i.deleteRenderbuffer(r.stencil));
              }
            }),
            (e.prototype.disposeAll = function (t) {
              var e = this.managedFramebuffers;
              this.managedFramebuffers = [];
              for (var r = 0; r < e.length; r++)
                this.disposeFramebuffer(e[r], t);
            }),
            (e.prototype.forceStencil = function () {
              var t = this.current;
              if (t) {
                var e = t.glFramebuffers[this.CONTEXT_UID];
                if (e && !e.stencil) {
                  t.enableStencil();
                  var r = t.width,
                    i = t.height,
                    n = this.gl,
                    o = n.createRenderbuffer();
                  n.bindRenderbuffer(n.RENDERBUFFER, o),
                    n.renderbufferStorage(
                      n.RENDERBUFFER,
                      n.DEPTH_STENCIL,
                      r,
                      i
                    ),
                    (e.stencil = o),
                    n.framebufferRenderbuffer(
                      n.FRAMEBUFFER,
                      n.DEPTH_STENCIL_ATTACHMENT,
                      n.RENDERBUFFER,
                      o
                    );
                }
              }
            }),
            (e.prototype.reset = function () {
              (this.current = this.unknownFramebuffer),
                (this.viewport = new h.Ae());
            }),
            e
          );
        })(I),
        ot = function (t) {
          (this.buffer = t || null),
            (this.updateID = -1),
            (this.byteLength = -1),
            (this.refCount = 0);
        },
        st = { 5126: 4, 5123: 2, 5121: 1 },
        at = (function (t) {
          function e(e) {
            var r = t.call(this, e) || this;
            return (
              (r._activeGeometry = null),
              (r._activeVao = null),
              (r.hasVao = !0),
              (r.hasInstance = !0),
              (r.canUseUInt32ElementIndex = !1),
              (r.managedGeometries = {}),
              (r.managedBuffers = {}),
              r
            );
          }
          return (
            d(e, t),
            (e.prototype.contextChange = function () {
              this.disposeAll(!0);
              var t = (this.gl = this.renderer.gl),
                e = this.renderer.context;
              if (
                ((this.CONTEXT_UID = this.renderer.CONTEXT_UID),
                2 !== e.webGLVersion)
              ) {
                var r = this.renderer.context.extensions.vertexArrayObject;
                i.X.PREFER_ENV === n.Vi.WEBGL_LEGACY && (r = null),
                  r
                    ? ((t.createVertexArray = function () {
                        return r.createVertexArrayOES();
                      }),
                      (t.bindVertexArray = function (t) {
                        return r.bindVertexArrayOES(t);
                      }),
                      (t.deleteVertexArray = function (t) {
                        return r.deleteVertexArrayOES(t);
                      }))
                    : ((this.hasVao = !1),
                      (t.createVertexArray = function () {
                        return null;
                      }),
                      (t.bindVertexArray = function () {
                        return null;
                      }),
                      (t.deleteVertexArray = function () {
                        return null;
                      }));
              }
              if (2 !== e.webGLVersion) {
                var o = t.getExtension("ANGLE_instanced_arrays");
                o
                  ? ((t.vertexAttribDivisor = function (t, e) {
                      return o.vertexAttribDivisorANGLE(t, e);
                    }),
                    (t.drawElementsInstanced = function (t, e, r, i, n) {
                      return o.drawElementsInstancedANGLE(t, e, r, i, n);
                    }),
                    (t.drawArraysInstanced = function (t, e, r, i) {
                      return o.drawArraysInstancedANGLE(t, e, r, i);
                    }))
                  : (this.hasInstance = !1);
              }
              this.canUseUInt32ElementIndex =
                2 === e.webGLVersion || !!e.extensions.uint32ElementIndex;
            }),
            (e.prototype.bind = function (t, e) {
              e = e || this.renderer.shader.shader;
              var r = this.gl,
                i = t.glVertexArrayObjects[this.CONTEXT_UID],
                n = !1;
              i ||
                ((this.managedGeometries[t.id] = t),
                t.disposeRunner.add(this),
                (t.glVertexArrayObjects[this.CONTEXT_UID] = i = {}),
                (n = !0));
              var o = i[e.program.id] || this.initGeometryVao(t, e.program, n);
              (this._activeGeometry = t),
                this._activeVao !== o &&
                  ((this._activeVao = o),
                  this.hasVao
                    ? r.bindVertexArray(o)
                    : this.activateVao(t, e.program)),
                this.updateBuffers();
            }),
            (e.prototype.reset = function () {
              this.unbind();
            }),
            (e.prototype.updateBuffers = function () {
              for (
                var t = this._activeGeometry, e = this.gl, r = 0;
                r < t.buffers.length;
                r++
              ) {
                var i = t.buffers[r],
                  n = i._glBuffers[this.CONTEXT_UID];
                if (i._updateID !== n.updateID) {
                  n.updateID = i._updateID;
                  var o = i.index ? e.ELEMENT_ARRAY_BUFFER : e.ARRAY_BUFFER;
                  if (
                    (e.bindBuffer(o, n.buffer),
                    (this._boundBuffer = n),
                    n.byteLength >= i.data.byteLength)
                  )
                    e.bufferSubData(o, 0, i.data);
                  else {
                    var s = i.static ? e.STATIC_DRAW : e.DYNAMIC_DRAW;
                    (n.byteLength = i.data.byteLength),
                      e.bufferData(o, i.data, s);
                  }
                }
              }
            }),
            (e.prototype.checkCompatibility = function (t, e) {
              var r = t.attributes,
                i = e.attributeData;
              for (var n in i)
                if (!r[n])
                  throw new Error(
                    'shader and geometry incompatible, geometry missing the "' +
                      n +
                      '" attribute'
                  );
            }),
            (e.prototype.getSignature = function (t, e) {
              var r = t.attributes,
                i = e.attributeData,
                n = ["g", t.id];
              for (var o in r) i[o] && n.push(o);
              return n.join("-");
            }),
            (e.prototype.initGeometryVao = function (t, e, r) {
              void 0 === r && (r = !0), this.checkCompatibility(t, e);
              var i = this.gl,
                n = this.CONTEXT_UID,
                o = this.getSignature(t, e),
                s = t.glVertexArrayObjects[this.CONTEXT_UID],
                a = s[o];
              if (a) return (s[e.id] = a), a;
              var h = t.buffers,
                u = t.attributes,
                l = {},
                c = {};
              for (var d in h) (l[d] = 0), (c[d] = 0);
              for (var d in u)
                !u[d].size && e.attributeData[d]
                  ? (u[d].size = e.attributeData[d].size)
                  : u[d].size ||
                    console.warn(
                      "PIXI Geometry attribute '" +
                        d +
                        "' size cannot be determined (likely the bound shader does not have the attribute)"
                    ),
                  (l[u[d].buffer] += u[d].size * st[u[d].type]);
              for (var d in u) {
                var p = u[d],
                  f = p.size;
                void 0 === p.stride &&
                  (l[p.buffer] === f * st[p.type]
                    ? (p.stride = 0)
                    : (p.stride = l[p.buffer])),
                  void 0 === p.start &&
                    ((p.start = c[p.buffer]), (c[p.buffer] += f * st[p.type]));
              }
              (a = i.createVertexArray()), i.bindVertexArray(a);
              for (var m = 0; m < h.length; m++) {
                var v = h[m];
                v._glBuffers[n] ||
                  ((v._glBuffers[n] = new ot(i.createBuffer())),
                  (this.managedBuffers[v.id] = v),
                  v.disposeRunner.add(this)),
                  r && v._glBuffers[n].refCount++;
              }
              return (
                this.activateVao(t, e),
                (this._activeVao = a),
                (s[e.id] = a),
                (s[o] = a),
                a
              );
            }),
            (e.prototype.disposeBuffer = function (t, e) {
              if (this.managedBuffers[t.id]) {
                delete this.managedBuffers[t.id];
                var r = t._glBuffers[this.CONTEXT_UID],
                  i = this.gl;
                t.disposeRunner.remove(this),
                  r &&
                    (e || i.deleteBuffer(r.buffer),
                    delete t._glBuffers[this.CONTEXT_UID]);
              }
            }),
            (e.prototype.disposeGeometry = function (t, e) {
              if (this.managedGeometries[t.id]) {
                delete this.managedGeometries[t.id];
                var r = t.glVertexArrayObjects[this.CONTEXT_UID],
                  i = this.gl,
                  n = t.buffers;
                if ((t.disposeRunner.remove(this), r)) {
                  for (var o = 0; o < n.length; o++) {
                    var s = n[o]._glBuffers[this.CONTEXT_UID];
                    s.refCount--,
                      0 !== s.refCount || e || this.disposeBuffer(n[o], e);
                  }
                  if (!e)
                    for (var a in r)
                      if ("g" === a[0]) {
                        var h = r[a];
                        this._activeVao === h && this.unbind(),
                          i.deleteVertexArray(h);
                      }
                  delete t.glVertexArrayObjects[this.CONTEXT_UID];
                }
              }
            }),
            (e.prototype.disposeAll = function (t) {
              for (
                var e = Object.keys(this.managedGeometries), r = 0;
                r < e.length;
                r++
              )
                this.disposeGeometry(this.managedGeometries[e[r]], t);
              for (
                e = Object.keys(this.managedBuffers), r = 0;
                r < e.length;
                r++
              )
                this.disposeBuffer(this.managedBuffers[e[r]], t);
            }),
            (e.prototype.activateVao = function (t, e) {
              var r = this.gl,
                i = this.CONTEXT_UID,
                n = t.buffers,
                o = t.attributes;
              t.indexBuffer &&
                r.bindBuffer(
                  r.ELEMENT_ARRAY_BUFFER,
                  t.indexBuffer._glBuffers[i].buffer
                );
              var s = null;
              for (var a in o) {
                var h = o[a],
                  u = n[h.buffer]._glBuffers[i];
                if (e.attributeData[a]) {
                  s !== u && (r.bindBuffer(r.ARRAY_BUFFER, u.buffer), (s = u));
                  var l = e.attributeData[a].location;
                  if (
                    (r.enableVertexAttribArray(l),
                    r.vertexAttribPointer(
                      l,
                      h.size,
                      h.type || r.FLOAT,
                      h.normalized,
                      h.stride,
                      h.start
                    ),
                    h.instance)
                  ) {
                    if (!this.hasInstance)
                      throw new Error(
                        "geometry error, GPU Instancing is not supported on this device"
                      );
                    r.vertexAttribDivisor(l, 1);
                  }
                }
              }
            }),
            (e.prototype.draw = function (t, e, r, i) {
              var n = this.gl,
                o = this._activeGeometry;
              if (o.indexBuffer) {
                var s = o.indexBuffer.data.BYTES_PER_ELEMENT,
                  a = 2 === s ? n.UNSIGNED_SHORT : n.UNSIGNED_INT;
                2 === s || (4 === s && this.canUseUInt32ElementIndex)
                  ? o.instanced
                    ? n.drawElementsInstanced(
                        t,
                        e || o.indexBuffer.data.length,
                        a,
                        (r || 0) * s,
                        i || 1
                      )
                    : n.drawElements(
                        t,
                        e || o.indexBuffer.data.length,
                        a,
                        (r || 0) * s
                      )
                  : console.warn("unsupported index buffer type: uint32");
              } else
                o.instanced
                  ? n.drawArraysInstanced(t, r, e || o.getSize(), i || 1)
                  : n.drawArrays(t, r, e || o.getSize());
              return this;
            }),
            (e.prototype.unbind = function () {
              this.gl.bindVertexArray(null),
                (this._activeVao = null),
                (this._activeGeometry = null);
            }),
            e
          );
        })(I),
        ht = (function () {
          function t(t) {
            void 0 === t && (t = null),
              (this.type = n.A7.NONE),
              (this.autoDetect = !0),
              (this.maskObject = t || null),
              (this.pooled = !1),
              (this.isMaskData = !0),
              (this._stencilCounter = 0),
              (this._scissorCounter = 0),
              (this._scissorRect = null),
              (this._target = null);
          }
          return (
            (t.prototype.reset = function () {
              this.pooled &&
                ((this.maskObject = null),
                (this.type = n.A7.NONE),
                (this.autoDetect = !0)),
                (this._target = null);
            }),
            (t.prototype.copyCountersOrReset = function (t) {
              t
                ? ((this._stencilCounter = t._stencilCounter),
                  (this._scissorCounter = t._scissorCounter),
                  (this._scissorRect = t._scissorRect))
                : ((this._stencilCounter = 0),
                  (this._scissorCounter = 0),
                  (this._scissorRect = null));
            }),
            t
          );
        })();
      function ut(t, e, r) {
        var i = t.createShader(e);
        return t.shaderSource(i, r), t.compileShader(i), i;
      }
      function lt(t, e, r, i) {
        var n = ut(t, t.VERTEX_SHADER, e),
          o = ut(t, t.FRAGMENT_SHADER, r),
          s = t.createProgram();
        if ((t.attachShader(s, n), t.attachShader(s, o), i))
          for (var a in i) t.bindAttribLocation(s, i[a], a);
        return (
          t.linkProgram(s),
          t.getProgramParameter(s, t.LINK_STATUS) ||
            (t.getShaderParameter(n, t.COMPILE_STATUS) ||
              (console.warn(e), console.error(t.getShaderInfoLog(n))),
            t.getShaderParameter(o, t.COMPILE_STATUS) ||
              (console.warn(r), console.error(t.getShaderInfoLog(o))),
            console.error("Pixi.js Error: Could not initialize shader."),
            console.error(
              "gl.VALIDATE_STATUS",
              t.getProgramParameter(s, t.VALIDATE_STATUS)
            ),
            console.error("gl.getError()", t.getError()),
            "" !== t.getProgramInfoLog(s) &&
              console.warn(
                "Pixi.js Warning: gl.getProgramInfoLog()",
                t.getProgramInfoLog(s)
              ),
            t.deleteProgram(s),
            (s = null)),
          t.deleteShader(n),
          t.deleteShader(o),
          s
        );
      }
      function ct(t) {
        for (var e = new Array(t), r = 0; r < e.length; r++) e[r] = !1;
        return e;
      }
      function dt(t, e) {
        switch (t) {
          case "float":
          case "int":
          case "sampler2D":
          case "sampler2DArray":
            return 0;
          case "vec2":
            return new Float32Array(2 * e);
          case "vec3":
            return new Float32Array(3 * e);
          case "vec4":
            return new Float32Array(4 * e);
          case "ivec2":
            return new Int32Array(2 * e);
          case "ivec3":
            return new Int32Array(3 * e);
          case "ivec4":
            return new Int32Array(4 * e);
          case "bool":
            return !1;
          case "bvec2":
            return ct(2 * e);
          case "bvec3":
            return ct(3 * e);
          case "bvec4":
            return ct(4 * e);
          case "mat2":
            return new Float32Array([1, 0, 0, 1]);
          case "mat3":
            return new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
          case "mat4":
            return new Float32Array([
              1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
            ]);
        }
        return null;
      }
      var pt,
        ft = {},
        mt = ft;
      function vt() {
        if (mt === ft || (mt && mt.isContextLost())) {
          var t = document.createElement("canvas"),
            e = void 0;
          i.X.PREFER_ENV >= n.Vi.WEBGL2 && (e = t.getContext("webgl2", {})),
            e ||
              ((e =
                t.getContext("webgl", {}) ||
                t.getContext("experimental-webgl", {}))
                ? e.getExtension("WEBGL_draw_buffers")
                : (e = null)),
            (mt = e);
        }
        return mt;
      }
      function yt(t, e, r) {
        if ("precision" !== t.substring(0, 9)) {
          var i = e;
          return (
            e === n.cB.HIGH && r !== n.cB.HIGH && (i = n.cB.MEDIUM),
            "precision " + i + " float;\n" + t
          );
        }
        return r !== n.cB.HIGH && "precision highp" === t.substring(0, 15)
          ? t.replace("precision highp", "precision mediump")
          : t;
      }
      var gt = {
        float: 1,
        vec2: 2,
        vec3: 3,
        vec4: 4,
        int: 1,
        ivec2: 2,
        ivec3: 3,
        ivec4: 4,
        bool: 1,
        bvec2: 2,
        bvec3: 3,
        bvec4: 4,
        mat2: 4,
        mat3: 9,
        mat4: 16,
        sampler2D: 1,
      };
      function _t(t) {
        return gt[t];
      }
      var bt = null,
        xt = {
          FLOAT: "float",
          FLOAT_VEC2: "vec2",
          FLOAT_VEC3: "vec3",
          FLOAT_VEC4: "vec4",
          INT: "int",
          INT_VEC2: "ivec2",
          INT_VEC3: "ivec3",
          INT_VEC4: "ivec4",
          BOOL: "bool",
          BOOL_VEC2: "bvec2",
          BOOL_VEC3: "bvec3",
          BOOL_VEC4: "bvec4",
          FLOAT_MAT2: "mat2",
          FLOAT_MAT3: "mat3",
          FLOAT_MAT4: "mat4",
          SAMPLER_2D: "sampler2D",
          INT_SAMPLER_2D: "sampler2D",
          UNSIGNED_INT_SAMPLER_2D: "sampler2D",
          SAMPLER_CUBE: "samplerCube",
          INT_SAMPLER_CUBE: "samplerCube",
          UNSIGNED_INT_SAMPLER_CUBE: "samplerCube",
          SAMPLER_2D_ARRAY: "sampler2DArray",
          INT_SAMPLER_2D_ARRAY: "sampler2DArray",
          UNSIGNED_INT_SAMPLER_2D_ARRAY: "sampler2DArray",
        };
      function Tt(t, e) {
        if (!bt) {
          var r = Object.keys(xt);
          bt = {};
          for (var i = 0; i < r.length; ++i) {
            var n = r[i];
            bt[t[n]] = xt[n];
          }
        }
        return bt[e];
      }
      var Et,
        wt = [
          {
            test: function (t) {
              return "float" === t.type && 1 === t.size;
            },
            code: function (t) {
              return (
                '\n            if(uv["' +
                t +
                '"] !== ud["' +
                t +
                '"].value)\n            {\n                ud["' +
                t +
                '"].value = uv["' +
                t +
                '"]\n                gl.uniform1f(ud["' +
                t +
                '"].location, uv["' +
                t +
                '"])\n            }\n            '
              );
            },
          },
          {
            test: function (t) {
              return (
                ("sampler2D" === t.type ||
                  "samplerCube" === t.type ||
                  "sampler2DArray" === t.type) &&
                1 === t.size &&
                !t.isArray
              );
            },
            code: function (t) {
              return (
                't = syncData.textureCount++;\n\n            renderer.texture.bind(uv["' +
                t +
                '"], t);\n\n            if(ud["' +
                t +
                '"].value !== t)\n            {\n                ud["' +
                t +
                '"].value = t;\n                gl.uniform1i(ud["' +
                t +
                '"].location, t);\n; // eslint-disable-line max-len\n            }'
              );
            },
          },
          {
            test: function (t, e) {
              return "mat3" === t.type && 1 === t.size && void 0 !== e.a;
            },
            code: function (t) {
              return (
                '\n            gl.uniformMatrix3fv(ud["' +
                t +
                '"].location, false, uv["' +
                t +
                '"].toArray(true));\n            '
              );
            },
          },
          {
            test: function (t, e) {
              return "vec2" === t.type && 1 === t.size && void 0 !== e.x;
            },
            code: function (t) {
              return (
                '\n                cv = ud["' +
                t +
                '"].value;\n                v = uv["' +
                t +
                '"];\n\n                if(cv[0] !== v.x || cv[1] !== v.y)\n                {\n                    cv[0] = v.x;\n                    cv[1] = v.y;\n                    gl.uniform2f(ud["' +
                t +
                '"].location, v.x, v.y);\n                }'
              );
            },
          },
          {
            test: function (t) {
              return "vec2" === t.type && 1 === t.size;
            },
            code: function (t) {
              return (
                '\n                cv = ud["' +
                t +
                '"].value;\n                v = uv["' +
                t +
                '"];\n\n                if(cv[0] !== v[0] || cv[1] !== v[1])\n                {\n                    cv[0] = v[0];\n                    cv[1] = v[1];\n                    gl.uniform2f(ud["' +
                t +
                '"].location, v[0], v[1]);\n                }\n            '
              );
            },
          },
          {
            test: function (t, e) {
              return "vec4" === t.type && 1 === t.size && void 0 !== e.width;
            },
            code: function (t) {
              return (
                '\n                cv = ud["' +
                t +
                '"].value;\n                v = uv["' +
                t +
                '"];\n\n                if(cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height)\n                {\n                    cv[0] = v.x;\n                    cv[1] = v.y;\n                    cv[2] = v.width;\n                    cv[3] = v.height;\n                    gl.uniform4f(ud["' +
                t +
                '"].location, v.x, v.y, v.width, v.height)\n                }'
              );
            },
          },
          {
            test: function (t) {
              return "vec4" === t.type && 1 === t.size;
            },
            code: function (t) {
              return (
                '\n                cv = ud["' +
                t +
                '"].value;\n                v = uv["' +
                t +
                '"];\n\n                if(cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])\n                {\n                    cv[0] = v[0];\n                    cv[1] = v[1];\n                    cv[2] = v[2];\n                    cv[3] = v[3];\n\n                    gl.uniform4f(ud["' +
                t +
                '"].location, v[0], v[1], v[2], v[3])\n                }'
              );
            },
          },
        ],
        At = {
          float:
            "\n    if(cv !== v)\n    {\n        cv.v = v;\n        gl.uniform1f(location, v)\n    }",
          vec2: "\n    if(cv[0] !== v[0] || cv[1] !== v[1])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        gl.uniform2f(location, v[0], v[1])\n    }",
          vec3: "\n    if(cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n\n        gl.uniform3f(location, v[0], v[1], v[2])\n    }",
          vec4: "gl.uniform4f(location, v[0], v[1], v[2], v[3])",
          int: "gl.uniform1i(location, v)",
          ivec2: "gl.uniform2i(location, v[0], v[1])",
          ivec3: "gl.uniform3i(location, v[0], v[1], v[2])",
          ivec4: "gl.uniform4i(location, v[0], v[1], v[2], v[3])",
          bool: "gl.uniform1i(location, v)",
          bvec2: "gl.uniform2i(location, v[0], v[1])",
          bvec3: "gl.uniform3i(location, v[0], v[1], v[2])",
          bvec4: "gl.uniform4i(location, v[0], v[1], v[2], v[3])",
          mat2: "gl.uniformMatrix2fv(location, false, v)",
          mat3: "gl.uniformMatrix3fv(location, false, v)",
          mat4: "gl.uniformMatrix4fv(location, false, v)",
          sampler2D: "gl.uniform1i(location, v)",
          samplerCube: "gl.uniform1i(location, v)",
          sampler2DArray: "gl.uniform1i(location, v)",
        },
        St = {
          float: "gl.uniform1fv(location, v)",
          vec2: "gl.uniform2fv(location, v)",
          vec3: "gl.uniform3fv(location, v)",
          vec4: "gl.uniform4fv(location, v)",
          mat4: "gl.uniformMatrix4fv(location, false, v)",
          mat3: "gl.uniformMatrix3fv(location, false, v)",
          mat2: "gl.uniformMatrix2fv(location, false, v)",
          int: "gl.uniform1iv(location, v)",
          ivec2: "gl.uniform2iv(location, v)",
          ivec3: "gl.uniform3iv(location, v)",
          ivec4: "gl.uniform4iv(location, v)",
          bool: "gl.uniform1iv(location, v)",
          bvec2: "gl.uniform2iv(location, v)",
          bvec3: "gl.uniform3iv(location, v)",
          bvec4: "gl.uniform4iv(location, v)",
          sampler2D: "gl.uniform1iv(location, v)",
          samplerCube: "gl.uniform1iv(location, v)",
          sampler2DArray: "gl.uniform1iv(location, v)",
        },
        It = [
          "precision mediump float;",
          "void main(void){",
          "float test = 0.1;",
          "%forloop%",
          "gl_FragColor = vec4(0.0);",
          "}",
        ].join("\n");
      function Pt(t) {
        for (var e = "", r = 0; r < t; ++r)
          r > 0 && (e += "\nelse "),
            r < t - 1 && (e += "if(test == " + r + ".0){}");
        return e;
      }
      function Ot(t, e) {
        if (0 === t)
          throw new Error(
            "Invalid value of `0` passed to `checkMaxIfStatementsInShader`"
          );
        for (var r = e.createShader(e.FRAGMENT_SHADER); ; ) {
          var i = It.replace(/%forloop%/gi, Pt(t));
          if (
            (e.shaderSource(r, i),
            e.compileShader(r),
            e.getShaderParameter(r, e.COMPILE_STATUS))
          )
            break;
          t = (t / 2) | 0;
        }
        return t;
      }
      var Ct = 0,
        Mt = {},
        Dt = (function () {
          function t(e, r, o) {
            void 0 === o && (o = "pixi-shader"),
              (this.id = Ct++),
              (this.vertexSrc = e || t.defaultVertexSrc),
              (this.fragmentSrc = r || t.defaultFragmentSrc),
              (this.vertexSrc = this.vertexSrc.trim()),
              (this.fragmentSrc = this.fragmentSrc.trim()),
              "#version" !== this.vertexSrc.substring(0, 8) &&
                ((o = o.replace(/\s+/g, "-")),
                Mt[o] ? (Mt[o]++, (o += "-" + Mt[o])) : (Mt[o] = 1),
                (this.vertexSrc =
                  "#define SHADER_NAME " + o + "\n" + this.vertexSrc),
                (this.fragmentSrc =
                  "#define SHADER_NAME " + o + "\n" + this.fragmentSrc),
                (this.vertexSrc = yt(
                  this.vertexSrc,
                  i.X.PRECISION_VERTEX,
                  n.cB.HIGH
                )),
                (this.fragmentSrc = yt(
                  this.fragmentSrc,
                  i.X.PRECISION_FRAGMENT,
                  (function () {
                    if (!pt) {
                      pt = n.cB.MEDIUM;
                      var t = vt();
                      if (t && t.getShaderPrecisionFormat) {
                        var e = t.getShaderPrecisionFormat(
                          t.FRAGMENT_SHADER,
                          t.HIGH_FLOAT
                        );
                        pt = e.precision ? n.cB.HIGH : n.cB.MEDIUM;
                      }
                    }
                    return pt;
                  })()
                ))),
              this.extractData(this.vertexSrc, this.fragmentSrc),
              (this.glPrograms = {}),
              (this.syncUniforms = null);
          }
          return (
            (t.prototype.extractData = function (t, e) {
              var r = vt();
              if (r) {
                var i = lt(r, t, e);
                (this.attributeData = this.getAttributeData(i, r)),
                  (this.uniformData = this.getUniformData(i, r)),
                  r.deleteProgram(i);
              } else (this.uniformData = {}), (this.attributeData = {});
            }),
            (t.prototype.getAttributeData = function (t, e) {
              for (
                var r = {},
                  i = [],
                  n = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES),
                  o = 0;
                o < n;
                o++
              ) {
                var s = e.getActiveAttrib(t, o),
                  a = Tt(e, s.type),
                  h = { type: a, name: s.name, size: _t(a), location: 0 };
                (r[s.name] = h), i.push(h);
              }
              for (
                i.sort(function (t, e) {
                  return t.name > e.name ? 1 : -1;
                }),
                  o = 0;
                o < i.length;
                o++
              )
                i[o].location = o;
              return r;
            }),
            (t.prototype.getUniformData = function (t, e) {
              for (
                var r = {},
                  i = e.getProgramParameter(t, e.ACTIVE_UNIFORMS),
                  n = 0;
                n < i;
                n++
              ) {
                var o = e.getActiveUniform(t, n),
                  s = o.name.replace(/\[.*?\]$/, ""),
                  a = o.name.match(/\[.*?\]$/),
                  h = Tt(e, o.type);
                r[s] = {
                  type: h,
                  size: o.size,
                  isArray: a,
                  value: dt(h, o.size),
                };
              }
              return r;
            }),
            Object.defineProperty(t, "defaultVertexSrc", {
              get: function () {
                return "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void){\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n}\n";
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t, "defaultFragmentSrc", {
              get: function () {
                return "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n   gl_FragColor *= texture2D(uSampler, vTextureCoord);\n}";
              },
              enumerable: !1,
              configurable: !0,
            }),
            (t.from = function (e, r, i) {
              var n = e + r,
                s = o.ProgramCache[n];
              return s || (o.ProgramCache[n] = s = new t(e, r, i)), s;
            }),
            t
          );
        })(),
        Rt = (function () {
          function t(t, e) {
            for (var r in ((this.program = t),
            (this.uniformGroup = e
              ? e instanceof K
                ? e
                : new K(e)
              : new K({})),
            t.uniformData))
              this.uniformGroup.uniforms[r] instanceof Array &&
                (this.uniformGroup.uniforms[r] = new Float32Array(
                  this.uniformGroup.uniforms[r]
                ));
          }
          return (
            (t.prototype.checkUniformExists = function (t, e) {
              if (e.uniforms[t]) return !0;
              for (var r in e.uniforms) {
                var i = e.uniforms[r];
                if (i.group && this.checkUniformExists(t, i)) return !0;
              }
              return !1;
            }),
            (t.prototype.destroy = function () {
              this.uniformGroup = null;
            }),
            Object.defineProperty(t.prototype, "uniforms", {
              get: function () {
                return this.uniformGroup.uniforms;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (t.from = function (e, r, i) {
              return new t(Dt.from(e, r), i);
            }),
            t
          );
        })(),
        Nt = (function () {
          function t() {
            (this.data = 0),
              (this.blendMode = n.T$.NORMAL),
              (this.polygonOffset = 0),
              (this.blend = !0);
          }
          return (
            Object.defineProperty(t.prototype, "blend", {
              get: function () {
                return !!(1 & this.data);
              },
              set: function (t) {
                !!(1 & this.data) !== t && (this.data ^= 1);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "offsets", {
              get: function () {
                return !!(2 & this.data);
              },
              set: function (t) {
                !!(2 & this.data) !== t && (this.data ^= 2);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "culling", {
              get: function () {
                return !!(4 & this.data);
              },
              set: function (t) {
                !!(4 & this.data) !== t && (this.data ^= 4);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "depthTest", {
              get: function () {
                return !!(8 & this.data);
              },
              set: function (t) {
                !!(8 & this.data) !== t && (this.data ^= 8);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "clockwiseFrontFace", {
              get: function () {
                return !!(16 & this.data);
              },
              set: function (t) {
                !!(16 & this.data) !== t && (this.data ^= 16);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "blendMode", {
              get: function () {
                return this._blendMode;
              },
              set: function (t) {
                (this.blend = t !== n.T$.NONE), (this._blendMode = t);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "polygonOffset", {
              get: function () {
                return this._polygonOffset;
              },
              set: function (t) {
                (this.offsets = !!t), (this._polygonOffset = t);
              },
              enumerable: !1,
              configurable: !0,
            }),
            (t.for2d = function () {
              var e = new t();
              return (e.depthTest = !1), (e.blend = !0), e;
            }),
            t
          );
        })(),
        Lt = (function (t) {
          function e(r, n, o) {
            var s = this,
              a = Dt.from(r || e.defaultVertexSrc, n || e.defaultFragmentSrc);
            return (
              ((s = t.call(this, a, o) || this).padding = 0),
              (s.resolution = i.X.FILTER_RESOLUTION),
              (s.enabled = !0),
              (s.autoFit = !0),
              (s.legacy = !!s.program.attributeData.aTextureCoord),
              (s.state = new Nt()),
              s
            );
          }
          return (
            d(e, t),
            (e.prototype.apply = function (t, e, r, i, n) {
              t.applyFilter(this, e, r, i);
            }),
            Object.defineProperty(e.prototype, "blendMode", {
              get: function () {
                return this.state.blendMode;
              },
              set: function (t) {
                this.state.blendMode = t;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e, "defaultVertexSrc", {
              get: function () {
                return "attribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord( void )\n{\n    return aVertexPosition * (outputFrame.zw * inputSize.zw);\n}\n\nvoid main(void)\n{\n    gl_Position = filterVertexPosition();\n    vTextureCoord = filterTextureCoord();\n}\n";
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e, "defaultFragmentSrc", {
              get: function () {
                return "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n}\n";
              },
              enumerable: !1,
              configurable: !0,
            }),
            e
          );
        })(Rt),
        Ft = new h.y3(),
        Ut = (function () {
          function t(t, e) {
            (this._texture = t),
              (this.mapCoord = new h.y3()),
              (this.uClampFrame = new Float32Array(4)),
              (this.uClampOffset = new Float32Array(2)),
              (this._textureID = -1),
              (this._updateID = 0),
              (this.clampOffset = 0),
              (this.clampMargin = void 0 === e ? 0.5 : e),
              (this.isSimple = !1);
          }
          return (
            Object.defineProperty(t.prototype, "texture", {
              get: function () {
                return this._texture;
              },
              set: function (t) {
                (this._texture = t), (this._textureID = -1);
              },
              enumerable: !1,
              configurable: !0,
            }),
            (t.prototype.multiplyUvs = function (t, e) {
              void 0 === e && (e = t);
              for (var r = this.mapCoord, i = 0; i < t.length; i += 2) {
                var n = t[i],
                  o = t[i + 1];
                (e[i] = n * r.a + o * r.c + r.tx),
                  (e[i + 1] = n * r.b + o * r.d + r.ty);
              }
              return e;
            }),
            (t.prototype.update = function (t) {
              var e = this._texture;
              if (!e || !e.valid) return !1;
              if (!t && this._textureID === e._updateID) return !1;
              (this._textureID = e._updateID), this._updateID++;
              var r = e._uvs;
              this.mapCoord.set(
                r.x1 - r.x0,
                r.y1 - r.y0,
                r.x3 - r.x0,
                r.y3 - r.y0,
                r.x0,
                r.y0
              );
              var i = e.orig,
                n = e.trim;
              n &&
                (Ft.set(
                  i.width / n.width,
                  0,
                  0,
                  i.height / n.height,
                  -n.x / n.width,
                  -n.y / n.height
                ),
                this.mapCoord.append(Ft));
              var o = e.baseTexture,
                s = this.uClampFrame,
                a = this.clampMargin / o.resolution,
                h = this.clampOffset;
              return (
                (s[0] = (e._frame.x + a + h) / o.width),
                (s[1] = (e._frame.y + a + h) / o.height),
                (s[2] = (e._frame.x + e._frame.width - a + h) / o.width),
                (s[3] = (e._frame.y + e._frame.height - a + h) / o.height),
                (this.uClampOffset[0] = h / o.realWidth),
                (this.uClampOffset[1] = h / o.realHeight),
                (this.isSimple =
                  e._frame.width === o.width &&
                  e._frame.height === o.height &&
                  0 === e.rotate),
                !0
              );
            }),
            t
          );
        })(),
        Bt = (function (t) {
          function e(e) {
            var r = this,
              i = new h.y3();
            return (
              (r =
                t.call(
                  this,
                  "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n}\n",
                  "varying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform sampler2D mask;\nuniform float alpha;\nuniform float npmAlpha;\nuniform vec4 maskClamp;\n\nvoid main(void)\n{\n    float clip = step(3.5,\n        step(maskClamp.x, vMaskCoord.x) +\n        step(maskClamp.y, vMaskCoord.y) +\n        step(vMaskCoord.x, maskClamp.z) +\n        step(vMaskCoord.y, maskClamp.w));\n\n    vec4 original = texture2D(uSampler, vTextureCoord);\n    vec4 masky = texture2D(mask, vMaskCoord);\n    float alphaMul = 1.0 - npmAlpha * (1.0 - masky.a);\n\n    original *= (alphaMul * masky.r * alpha * clip);\n\n    gl_FragColor = original;\n}\n"
                ) || this),
              (e.renderable = !1),
              (r.maskSprite = e),
              (r.maskMatrix = i),
              r
            );
          }
          return (
            d(e, t),
            (e.prototype.apply = function (t, e, r, i) {
              var n = this.maskSprite,
                o = n._texture;
              o.valid &&
                (o.uvMatrix || (o.uvMatrix = new Ut(o, 0)),
                o.uvMatrix.update(),
                (this.uniforms.npmAlpha = o.baseTexture.alphaMode ? 0 : 1),
                (this.uniforms.mask = o),
                (this.uniforms.otherMatrix = t
                  .calculateSpriteMatrix(this.maskMatrix, n)
                  .prepend(o.uvMatrix.mapCoord)),
                (this.uniforms.alpha = n.worldAlpha),
                (this.uniforms.maskClamp = o.uvMatrix.uClampFrame),
                t.applyFilter(this, e, r, i));
            }),
            e
          );
        })(Lt),
        kt = (function (t) {
          function e(e) {
            var r = t.call(this, e) || this;
            return (
              (r.enableScissor = !1),
              (r.alphaMaskPool = []),
              (r.maskDataPool = []),
              (r.maskStack = []),
              (r.alphaMaskIndex = 0),
              r
            );
          }
          return (
            d(e, t),
            (e.prototype.setMaskStack = function (t) {
              (this.maskStack = t),
                this.renderer.scissor.setMaskStack(t),
                this.renderer.stencil.setMaskStack(t);
            }),
            (e.prototype.push = function (t, e) {
              var r = e;
              if (!r.isMaskData) {
                var i = this.maskDataPool.pop() || new ht();
                (i.pooled = !0), (i.maskObject = e), (r = i);
              }
              switch (
                (r.autoDetect && this.detect(r),
                r.copyCountersOrReset(
                  this.maskStack[this.maskStack.length - 1]
                ),
                (r._target = t),
                r.type)
              ) {
                case n.A7.SCISSOR:
                  this.maskStack.push(r), this.renderer.scissor.push(r);
                  break;
                case n.A7.STENCIL:
                  this.maskStack.push(r), this.renderer.stencil.push(r);
                  break;
                case n.A7.SPRITE:
                  r.copyCountersOrReset(null),
                    this.pushSpriteMask(r),
                    this.maskStack.push(r);
              }
            }),
            (e.prototype.pop = function (t) {
              var e = this.maskStack.pop();
              if (e && e._target === t) {
                switch (e.type) {
                  case n.A7.SCISSOR:
                    this.renderer.scissor.pop();
                    break;
                  case n.A7.STENCIL:
                    this.renderer.stencil.pop(e.maskObject);
                    break;
                  case n.A7.SPRITE:
                    this.popSpriteMask();
                }
                e.reset(), e.pooled && this.maskDataPool.push(e);
              }
            }),
            (e.prototype.detect = function (t) {
              var e = t.maskObject;
              if (e.isSprite) t.type = n.A7.SPRITE;
              else if (
                ((t.type = n.A7.STENCIL),
                this.enableScissor && e.isFastRect && e.isFastRect())
              ) {
                var r = e.worldTransform,
                  i = Math.atan2(r.b, r.a),
                  o = Math.atan2(r.d, r.c);
                (i = Math.round(i * (180 / Math.PI) * 100)),
                  (o =
                    (((o = Math.round(o * (180 / Math.PI) * 100) - i) % 18e3) +
                      18e3) %
                    18e3),
                  0 == (i = ((i % 9e3) + 9e3) % 9e3) &&
                    9e3 === o &&
                    (t.type = n.A7.SCISSOR);
              }
            }),
            (e.prototype.pushSpriteMask = function (t) {
              var e = t.maskObject,
                r = t._target,
                i = this.alphaMaskPool[this.alphaMaskIndex];
              i || (i = this.alphaMaskPool[this.alphaMaskIndex] = [new Bt(e)]),
                (i[0].resolution = this.renderer.resolution),
                (i[0].maskSprite = e);
              var n = r.filterArea;
              (r.filterArea = e.getBounds(!0)),
                this.renderer.filter.push(r, i),
                (r.filterArea = n),
                this.alphaMaskIndex++;
            }),
            (e.prototype.popSpriteMask = function () {
              this.renderer.filter.pop(), this.alphaMaskIndex--;
            }),
            e
          );
        })(I),
        jt = (function (t) {
          function e(e) {
            var r = t.call(this, e) || this;
            return (r.maskStack = []), (r.glConst = 0), r;
          }
          return (
            d(e, t),
            (e.prototype.getStackLength = function () {
              return this.maskStack.length;
            }),
            (e.prototype.setMaskStack = function (t) {
              var e = this.renderer.gl,
                r = this.getStackLength();
              this.maskStack = t;
              var i = this.getStackLength();
              i !== r &&
                (0 === i
                  ? e.disable(this.glConst)
                  : (e.enable(this.glConst), this._useCurrent()));
            }),
            (e.prototype._useCurrent = function () {}),
            (e.prototype.destroy = function () {
              t.prototype.destroy.call(this), (this.maskStack = null);
            }),
            e
          );
        })(I),
        Ht = (function (t) {
          function e(e) {
            var r = t.call(this, e) || this;
            return (r.glConst = WebGLRenderingContext.SCISSOR_TEST), r;
          }
          return (
            d(e, t),
            (e.prototype.getStackLength = function () {
              var t = this.maskStack[this.maskStack.length - 1];
              return t ? t._scissorCounter : 0;
            }),
            (e.prototype.push = function (t) {
              var e = t.maskObject;
              e.renderable = !0;
              var r = t._scissorRect,
                i = e.getBounds(!0),
                n = this.renderer.gl;
              (e.renderable = !1),
                r ? i.fit(r) : n.enable(n.SCISSOR_TEST),
                t._scissorCounter++,
                (t._scissorRect = i),
                this._useCurrent();
            }),
            (e.prototype.pop = function () {
              var t = this.renderer.gl;
              this.getStackLength() > 0
                ? this._useCurrent()
                : t.disable(t.SCISSOR_TEST);
            }),
            (e.prototype._useCurrent = function () {
              var t = this.maskStack[this.maskStack.length - 1]._scissorRect,
                e = this.renderer.renderTexture.current,
                r = this.renderer.projection,
                i = r.transform,
                n = r.sourceFrame,
                o = r.destinationFrame,
                s = e ? e.resolution : this.renderer.resolution,
                a = (t.x - n.x) * s + o.x,
                h = (t.y - n.y) * s + o.y,
                u = t.width * s,
                l = t.height * s;
              i && ((a += i.tx * s), (h += i.ty * s)),
                e || (h = this.renderer.height - l - h),
                this.renderer.gl.scissor(a, h, u, l);
            }),
            e
          );
        })(jt),
        Xt = (function (t) {
          function e(e) {
            var r = t.call(this, e) || this;
            return (r.glConst = WebGLRenderingContext.STENCIL_TEST), r;
          }
          return (
            d(e, t),
            (e.prototype.getStackLength = function () {
              var t = this.maskStack[this.maskStack.length - 1];
              return t ? t._stencilCounter : 0;
            }),
            (e.prototype.push = function (t) {
              var e = t.maskObject,
                r = this.renderer.gl,
                i = t._stencilCounter;
              0 === i &&
                (this.renderer.framebuffer.forceStencil(),
                r.enable(r.STENCIL_TEST)),
                t._stencilCounter++,
                r.colorMask(!1, !1, !1, !1),
                r.stencilFunc(r.EQUAL, i, this._getBitwiseMask()),
                r.stencilOp(r.KEEP, r.KEEP, r.INCR),
                (e.renderable = !0),
                e.render(this.renderer),
                this.renderer.batch.flush(),
                (e.renderable = !1),
                this._useCurrent();
            }),
            (e.prototype.pop = function (t) {
              var e = this.renderer.gl;
              0 === this.getStackLength()
                ? (e.disable(e.STENCIL_TEST),
                  e.clear(e.STENCIL_BUFFER_BIT),
                  e.clearStencil(0))
                : (e.colorMask(!1, !1, !1, !1),
                  e.stencilOp(e.KEEP, e.KEEP, e.DECR),
                  (t.renderable = !0),
                  t.render(this.renderer),
                  this.renderer.batch.flush(),
                  (t.renderable = !1),
                  this._useCurrent());
            }),
            (e.prototype._useCurrent = function () {
              var t = this.renderer.gl;
              t.colorMask(!0, !0, !0, !0),
                t.stencilFunc(
                  t.EQUAL,
                  this.getStackLength(),
                  this._getBitwiseMask()
                ),
                t.stencilOp(t.KEEP, t.KEEP, t.KEEP);
            }),
            (e.prototype._getBitwiseMask = function () {
              return (1 << this.getStackLength()) - 1;
            }),
            e
          );
        })(jt),
        Gt = (function (t) {
          function e(e) {
            var r = t.call(this, e) || this;
            return (
              (r.destinationFrame = null),
              (r.sourceFrame = null),
              (r.defaultFrame = null),
              (r.projectionMatrix = new h.y3()),
              (r.transform = null),
              r
            );
          }
          return (
            d(e, t),
            (e.prototype.update = function (t, e, r, i) {
              (this.destinationFrame =
                t || this.destinationFrame || this.defaultFrame),
                (this.sourceFrame = e || this.sourceFrame || t),
                this.calculateProjection(
                  this.destinationFrame,
                  this.sourceFrame,
                  r,
                  i
                ),
                this.transform && this.projectionMatrix.append(this.transform);
              var n = this.renderer;
              (n.globalUniforms.uniforms.projectionMatrix =
                this.projectionMatrix),
                n.globalUniforms.update(),
                n.shader.shader &&
                  n.shader.syncUniformGroup(n.shader.shader.uniforms.globals);
            }),
            (e.prototype.calculateProjection = function (t, e, r, i) {
              var n = this.projectionMatrix,
                o = i ? -1 : 1;
              n.identity(),
                (n.a = (1 / e.width) * 2),
                (n.d = o * ((1 / e.height) * 2)),
                (n.tx = -1 - e.x * n.a),
                (n.ty = -o - e.y * n.d);
            }),
            (e.prototype.setTransform = function (t) {}),
            e
          );
        })(I),
        zt = new h.Ae(),
        Vt = new h.Ae(),
        Wt = new h.Ae(),
        Yt = (function (t) {
          function e(e) {
            var r = t.call(this, e) || this;
            return (
              (r.clearColor = e._backgroundColorRgba),
              (r.defaultMaskStack = []),
              (r.current = null),
              (r.sourceFrame = new h.Ae()),
              (r.destinationFrame = new h.Ae()),
              r
            );
          }
          return (
            d(e, t),
            (e.prototype.bind = function (t, e, r) {
              void 0 === t && (t = null);
              var i,
                n,
                o,
                s = this.renderer;
              (this.current = t),
                t
                  ? ((o = (i = t.baseTexture).resolution),
                    e ||
                      ((zt.width = t.frame.width),
                      (zt.height = t.frame.height),
                      (e = zt)),
                    r ||
                      ((Vt.x = t.frame.x),
                      (Vt.y = t.frame.y),
                      (Vt.width = e.width),
                      (Vt.height = e.height),
                      (r = Vt)),
                    (n = i.framebuffer))
                  : ((o = s.resolution),
                    e ||
                      ((zt.width = s.screen.width),
                      (zt.height = s.screen.height),
                      (e = zt)),
                    r || (((r = zt).width = e.width), (r.height = e.height))),
                (Wt.x = r.x * o),
                (Wt.y = r.y * o),
                (Wt.width = r.width * o),
                (Wt.height = r.height * o),
                this.renderer.framebuffer.bind(n, Wt),
                this.renderer.projection.update(r, e, o, !n),
                t
                  ? this.renderer.mask.setMaskStack(i.maskStack)
                  : this.renderer.mask.setMaskStack(this.defaultMaskStack),
                this.sourceFrame.copyFrom(e),
                this.destinationFrame.copyFrom(r);
            }),
            (e.prototype.clear = function (t, e) {
              (t = this.current
                ? t || this.current.baseTexture.clearColor
                : t || this.clearColor),
                this.renderer.framebuffer.clear(t[0], t[1], t[2], t[3], e);
            }),
            (e.prototype.resize = function () {
              this.bind(null);
            }),
            (e.prototype.reset = function () {
              this.bind(null);
            }),
            e
          );
        })(I),
        qt = function () {},
        Kt = (function () {
          function t(t, e) {
            (this.program = t),
              (this.uniformData = e),
              (this.uniformGroups = {});
          }
          return (
            (t.prototype.destroy = function () {
              (this.uniformData = null),
                (this.uniformGroups = null),
                (this.program = null);
            }),
            t
          );
        })(),
        $t = 0,
        Zt = { textureCount: 0 },
        Jt = (function (t) {
          function e(e) {
            var r = t.call(this, e) || this;
            return (
              (r.destroyed = !1),
              r.systemCheck(),
              (r.gl = null),
              (r.shader = null),
              (r.program = null),
              (r.cache = {}),
              (r.id = $t++),
              r
            );
          }
          return (
            d(e, t),
            (e.prototype.systemCheck = function () {
              if (
                !(function () {
                  if ("boolean" == typeof Et) return Et;
                  try {
                    var t = new Function(
                      "param1",
                      "param2",
                      "param3",
                      "return param1[param2] === param3;"
                    );
                    Et = !0 === t({ a: "b" }, "a", "b");
                  } catch (t) {
                    Et = !1;
                  }
                  return Et;
                })()
              )
                throw new Error(
                  "Current environment does not allow unsafe-eval, please use @pixi/unsafe-eval module to enable support."
                );
            }),
            (e.prototype.contextChange = function (t) {
              (this.gl = t), this.reset();
            }),
            (e.prototype.bind = function (t, e) {
              t.uniforms.globals = this.renderer.globalUniforms;
              var r = t.program,
                i =
                  r.glPrograms[this.renderer.CONTEXT_UID] ||
                  this.generateShader(t);
              return (
                (this.shader = t),
                this.program !== r &&
                  ((this.program = r), this.gl.useProgram(i.program)),
                e ||
                  ((Zt.textureCount = 0),
                  this.syncUniformGroup(t.uniformGroup, Zt)),
                i
              );
            }),
            (e.prototype.setUniforms = function (t) {
              var e = this.shader.program,
                r = e.glPrograms[this.renderer.CONTEXT_UID];
              e.syncUniforms(r.uniformData, t, this.renderer);
            }),
            (e.prototype.syncUniformGroup = function (t, e) {
              var r = this.getglProgram();
              (t.static && t.dirtyId === r.uniformGroups[t.id]) ||
                ((r.uniformGroups[t.id] = t.dirtyId),
                this.syncUniforms(t, r, e));
            }),
            (e.prototype.syncUniforms = function (t, e, r) {
              (
                t.syncUniforms[this.shader.program.id] ||
                this.createSyncGroups(t)
              )(e.uniformData, t.uniforms, this.renderer, r);
            }),
            (e.prototype.createSyncGroups = function (t) {
              var e = this.getSignature(t, this.shader.program.uniformData);
              return (
                this.cache[e] ||
                  (this.cache[e] = (function (t, e) {
                    var r = [
                      "\n        var v = null;\n        var cv = null\n        var t = 0;\n        var gl = renderer.gl\n    ",
                    ];
                    for (var i in t.uniforms) {
                      var n = e[i];
                      if (n) {
                        for (
                          var o = t.uniforms[i], s = !1, a = 0;
                          a < wt.length;
                          a++
                        )
                          if (wt[a].test(n, o)) {
                            r.push(wt[a].code(i, o)), (s = !0);
                            break;
                          }
                        if (!s) {
                          var h = (1 === n.size ? At : St)[n.type].replace(
                            "location",
                            'ud["' + i + '"].location'
                          );
                          r.push(
                            '\n            cv = ud["' +
                              i +
                              '"].value;\n            v = uv["' +
                              i +
                              '"];\n            ' +
                              h +
                              ";"
                          );
                        }
                      } else
                        t.uniforms[i].group &&
                          r.push(
                            '\n                    renderer.shader.syncUniformGroup(uv["' +
                              i +
                              '"], syncData);\n                '
                          );
                    }
                    return new Function(
                      "ud",
                      "uv",
                      "renderer",
                      "syncData",
                      r.join("\n")
                    );
                  })(t, this.shader.program.uniformData)),
                (t.syncUniforms[this.shader.program.id] = this.cache[e]),
                t.syncUniforms[this.shader.program.id]
              );
            }),
            (e.prototype.getSignature = function (t, e) {
              var r = t.uniforms,
                i = [];
              for (var n in r) i.push(n), e[n] && i.push(e[n].type);
              return i.join("-");
            }),
            (e.prototype.getglProgram = function () {
              return this.shader
                ? this.shader.program.glPrograms[this.renderer.CONTEXT_UID]
                : null;
            }),
            (e.prototype.generateShader = function (t) {
              var e = this.gl,
                r = t.program,
                i = {};
              for (var n in r.attributeData) i[n] = r.attributeData[n].location;
              var o = lt(e, r.vertexSrc, r.fragmentSrc, i),
                s = {};
              for (var n in r.uniformData) {
                var a = r.uniformData[n];
                s[n] = {
                  location: e.getUniformLocation(o, n),
                  value: dt(a.type, a.size),
                };
              }
              var h = new Kt(o, s);
              return (r.glPrograms[this.renderer.CONTEXT_UID] = h), h;
            }),
            (e.prototype.reset = function () {
              (this.program = null), (this.shader = null);
            }),
            (e.prototype.destroy = function () {
              this.destroyed = !0;
            }),
            e
          );
        })(I),
        Qt = (function (t) {
          function e(e) {
            var r = t.call(this, e) || this;
            return (
              (r.gl = null),
              (r.stateId = 0),
              (r.polygonOffset = 0),
              (r.blendMode = n.T$.NONE),
              (r._blendEq = !1),
              (r.map = []),
              (r.map[0] = r.setBlend),
              (r.map[1] = r.setOffset),
              (r.map[2] = r.setCullFace),
              (r.map[3] = r.setDepthTest),
              (r.map[4] = r.setFrontFace),
              (r.checks = []),
              (r.defaultState = new Nt()),
              (r.defaultState.blend = !0),
              r
            );
          }
          return (
            d(e, t),
            (e.prototype.contextChange = function (t) {
              (this.gl = t),
                (this.blendModes = (function (t, e) {
                  return (
                    void 0 === e && (e = []),
                    (e[n.T$.NORMAL] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
                    (e[n.T$.ADD] = [t.ONE, t.ONE]),
                    (e[n.T$.MULTIPLY] = [
                      t.DST_COLOR,
                      t.ONE_MINUS_SRC_ALPHA,
                      t.ONE,
                      t.ONE_MINUS_SRC_ALPHA,
                    ]),
                    (e[n.T$.SCREEN] = [
                      t.ONE,
                      t.ONE_MINUS_SRC_COLOR,
                      t.ONE,
                      t.ONE_MINUS_SRC_ALPHA,
                    ]),
                    (e[n.T$.OVERLAY] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
                    (e[n.T$.DARKEN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
                    (e[n.T$.LIGHTEN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
                    (e[n.T$.COLOR_DODGE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
                    (e[n.T$.COLOR_BURN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
                    (e[n.T$.HARD_LIGHT] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
                    (e[n.T$.SOFT_LIGHT] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
                    (e[n.T$.DIFFERENCE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
                    (e[n.T$.EXCLUSION] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
                    (e[n.T$.HUE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
                    (e[n.T$.SATURATION] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
                    (e[n.T$.COLOR] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
                    (e[n.T$.LUMINOSITY] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
                    (e[n.T$.NONE] = [0, 0]),
                    (e[n.T$.NORMAL_NPM] = [
                      t.SRC_ALPHA,
                      t.ONE_MINUS_SRC_ALPHA,
                      t.ONE,
                      t.ONE_MINUS_SRC_ALPHA,
                    ]),
                    (e[n.T$.ADD_NPM] = [t.SRC_ALPHA, t.ONE, t.ONE, t.ONE]),
                    (e[n.T$.SCREEN_NPM] = [
                      t.SRC_ALPHA,
                      t.ONE_MINUS_SRC_COLOR,
                      t.ONE,
                      t.ONE_MINUS_SRC_ALPHA,
                    ]),
                    (e[n.T$.SRC_IN] = [t.DST_ALPHA, t.ZERO]),
                    (e[n.T$.SRC_OUT] = [t.ONE_MINUS_DST_ALPHA, t.ZERO]),
                    (e[n.T$.SRC_ATOP] = [t.DST_ALPHA, t.ONE_MINUS_SRC_ALPHA]),
                    (e[n.T$.DST_OVER] = [t.ONE_MINUS_DST_ALPHA, t.ONE]),
                    (e[n.T$.DST_IN] = [t.ZERO, t.SRC_ALPHA]),
                    (e[n.T$.DST_OUT] = [t.ZERO, t.ONE_MINUS_SRC_ALPHA]),
                    (e[n.T$.DST_ATOP] = [t.ONE_MINUS_DST_ALPHA, t.SRC_ALPHA]),
                    (e[n.T$.XOR] = [
                      t.ONE_MINUS_DST_ALPHA,
                      t.ONE_MINUS_SRC_ALPHA,
                    ]),
                    (e[n.T$.SUBTRACT] = [
                      t.ONE,
                      t.ONE,
                      t.ONE,
                      t.ONE,
                      t.FUNC_REVERSE_SUBTRACT,
                      t.FUNC_ADD,
                    ]),
                    e
                  );
                })(t)),
                this.set(this.defaultState),
                this.reset();
            }),
            (e.prototype.set = function (t) {
              if (((t = t || this.defaultState), this.stateId !== t.data)) {
                for (var e = this.stateId ^ t.data, r = 0; e; )
                  1 & e && this.map[r].call(this, !!(t.data & (1 << r))),
                    (e >>= 1),
                    r++;
                this.stateId = t.data;
              }
              for (r = 0; r < this.checks.length; r++) this.checks[r](this, t);
            }),
            (e.prototype.forceState = function (t) {
              t = t || this.defaultState;
              for (var e = 0; e < this.map.length; e++)
                this.map[e].call(this, !!(t.data & (1 << e)));
              for (e = 0; e < this.checks.length; e++) this.checks[e](this, t);
              this.stateId = t.data;
            }),
            (e.prototype.setBlend = function (t) {
              this.updateCheck(e.checkBlendMode, t),
                this.gl[t ? "enable" : "disable"](this.gl.BLEND);
            }),
            (e.prototype.setOffset = function (t) {
              this.updateCheck(e.checkPolygonOffset, t),
                this.gl[t ? "enable" : "disable"](this.gl.POLYGON_OFFSET_FILL);
            }),
            (e.prototype.setDepthTest = function (t) {
              this.gl[t ? "enable" : "disable"](this.gl.DEPTH_TEST);
            }),
            (e.prototype.setCullFace = function (t) {
              this.gl[t ? "enable" : "disable"](this.gl.CULL_FACE);
            }),
            (e.prototype.setFrontFace = function (t) {
              this.gl.frontFace(this.gl[t ? "CW" : "CCW"]);
            }),
            (e.prototype.setBlendMode = function (t) {
              if (t !== this.blendMode) {
                this.blendMode = t;
                var e = this.blendModes[t],
                  r = this.gl;
                2 === e.length
                  ? r.blendFunc(e[0], e[1])
                  : r.blendFuncSeparate(e[0], e[1], e[2], e[3]),
                  6 === e.length
                    ? ((this._blendEq = !0),
                      r.blendEquationSeparate(e[4], e[5]))
                    : this._blendEq &&
                      ((this._blendEq = !1),
                      r.blendEquationSeparate(r.FUNC_ADD, r.FUNC_ADD));
              }
            }),
            (e.prototype.setPolygonOffset = function (t, e) {
              this.gl.polygonOffset(t, e);
            }),
            (e.prototype.reset = function () {
              this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, !1),
                this.forceState(this.defaultState),
                (this._blendEq = !0),
                (this.blendMode = -1),
                this.setBlendMode(0);
            }),
            (e.prototype.updateCheck = function (t, e) {
              var r = this.checks.indexOf(t);
              e && -1 === r
                ? this.checks.push(t)
                : e || -1 === r || this.checks.splice(r, 1);
            }),
            (e.checkBlendMode = function (t, e) {
              t.setBlendMode(e.blendMode);
            }),
            (e.checkPolygonOffset = function (t, e) {
              t.setPolygonOffset(1, e.polygonOffset);
            }),
            e
          );
        })(I),
        te = (function (t) {
          function e(e) {
            var r = t.call(this, e) || this;
            return (
              (r.count = 0),
              (r.checkCount = 0),
              (r.maxIdle = i.X.GC_MAX_IDLE),
              (r.checkCountMax = i.X.GC_MAX_CHECK_COUNT),
              (r.mode = i.X.GC_MODE),
              r
            );
          }
          return (
            d(e, t),
            (e.prototype.postrender = function () {
              this.renderer.renderingToScreen &&
                (this.count++,
                this.mode !== n.UN.MANUAL &&
                  (this.checkCount++,
                  this.checkCount > this.checkCountMax &&
                    ((this.checkCount = 0), this.run())));
            }),
            (e.prototype.run = function () {
              for (
                var t = this.renderer.texture,
                  e = t.managedTextures,
                  r = !1,
                  i = 0;
                i < e.length;
                i++
              ) {
                var n = e[i];
                !n.framebuffer &&
                  this.count - n.touched > this.maxIdle &&
                  (t.destroyTexture(n, !0), (e[i] = null), (r = !0));
              }
              if (r) {
                var o = 0;
                for (i = 0; i < e.length; i++) null !== e[i] && (e[o++] = e[i]);
                e.length = o;
              }
            }),
            (e.prototype.unload = function (t) {
              var e = this.renderer.texture,
                r = t._texture;
              r && !r.framebuffer && e.destroyTexture(r);
              for (var i = t.children.length - 1; i >= 0; i--)
                this.unload(t.children[i]);
            }),
            e
          );
        })(I),
        ee = function (t) {
          (this.texture = t),
            (this.width = -1),
            (this.height = -1),
            (this.dirtyId = -1),
            (this.dirtyStyleId = -1),
            (this.mipmap = !1),
            (this.wrapMode = 33071),
            (this.type = 6408),
            (this.internalFormat = 5121);
        },
        re = (function (t) {
          function e(e) {
            var r = t.call(this, e) || this;
            return (
              (r.boundTextures = []),
              (r.currentLocation = -1),
              (r.managedTextures = []),
              (r._unknownBoundTextures = !1),
              (r.unknownTexture = new v()),
              r
            );
          }
          return (
            d(e, t),
            (e.prototype.contextChange = function () {
              var t = (this.gl = this.renderer.gl);
              (this.CONTEXT_UID = this.renderer.CONTEXT_UID),
                (this.webGLVersion = this.renderer.context.webGLVersion);
              var e = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS);
              this.boundTextures.length = e;
              for (var r = 0; r < e; r++) this.boundTextures[r] = null;
              this.emptyTextures = {};
              var i = new ee(t.createTexture());
              for (
                t.bindTexture(t.TEXTURE_2D, i.texture),
                  t.texImage2D(
                    t.TEXTURE_2D,
                    0,
                    t.RGBA,
                    1,
                    1,
                    0,
                    t.RGBA,
                    t.UNSIGNED_BYTE,
                    new Uint8Array(4)
                  ),
                  this.emptyTextures[t.TEXTURE_2D] = i,
                  this.emptyTextures[t.TEXTURE_CUBE_MAP] = new ee(
                    t.createTexture()
                  ),
                  t.bindTexture(
                    t.TEXTURE_CUBE_MAP,
                    this.emptyTextures[t.TEXTURE_CUBE_MAP].texture
                  ),
                  r = 0;
                r < 6;
                r++
              )
                t.texImage2D(
                  t.TEXTURE_CUBE_MAP_POSITIVE_X + r,
                  0,
                  t.RGBA,
                  1,
                  1,
                  0,
                  t.RGBA,
                  t.UNSIGNED_BYTE,
                  null
                );
              for (
                t.texParameteri(
                  t.TEXTURE_CUBE_MAP,
                  t.TEXTURE_MAG_FILTER,
                  t.LINEAR
                ),
                  t.texParameteri(
                    t.TEXTURE_CUBE_MAP,
                    t.TEXTURE_MIN_FILTER,
                    t.LINEAR
                  ),
                  r = 0;
                r < this.boundTextures.length;
                r++
              )
                this.bind(null, r);
            }),
            (e.prototype.bind = function (t, e) {
              void 0 === e && (e = 0);
              var r = this.gl;
              if (t) {
                if ((t = t.castToBaseTexture()).parentTextureArray) return;
                if (t.valid) {
                  t.touched = this.renderer.textureGC.count;
                  var i =
                    t._glTextures[this.CONTEXT_UID] || this.initTexture(t);
                  this.boundTextures[e] !== t &&
                    (this.currentLocation !== e &&
                      ((this.currentLocation = e),
                      r.activeTexture(r.TEXTURE0 + e)),
                    r.bindTexture(t.target, i.texture)),
                    i.dirtyId !== t.dirtyId &&
                      (this.currentLocation !== e &&
                        ((this.currentLocation = e),
                        r.activeTexture(r.TEXTURE0 + e)),
                      this.updateTexture(t)),
                    (this.boundTextures[e] = t);
                }
              } else
                this.currentLocation !== e &&
                  ((this.currentLocation = e), r.activeTexture(r.TEXTURE0 + e)),
                  r.bindTexture(
                    r.TEXTURE_2D,
                    this.emptyTextures[r.TEXTURE_2D].texture
                  ),
                  (this.boundTextures[e] = null);
            }),
            (e.prototype.reset = function () {
              (this._unknownBoundTextures = !0), (this.currentLocation = -1);
              for (var t = 0; t < this.boundTextures.length; t++)
                this.boundTextures[t] = this.unknownTexture;
            }),
            (e.prototype.unbind = function (t) {
              var e = this.gl,
                r = this.boundTextures;
              if (this._unknownBoundTextures) {
                this._unknownBoundTextures = !1;
                for (var i = 0; i < r.length; i++)
                  r[i] === this.unknownTexture && this.bind(null, i);
              }
              for (i = 0; i < r.length; i++)
                r[i] === t &&
                  (this.currentLocation !== i &&
                    (e.activeTexture(e.TEXTURE0 + i),
                    (this.currentLocation = i)),
                  e.bindTexture(t.target, this.emptyTextures[t.target].texture),
                  (r[i] = null));
            }),
            (e.prototype.initTexture = function (t) {
              var e = new ee(this.gl.createTexture());
              return (
                (e.dirtyId = -1),
                (t._glTextures[this.CONTEXT_UID] = e),
                this.managedTextures.push(t),
                t.on("dispose", this.destroyTexture, this),
                e
              );
            }),
            (e.prototype.initTextureType = function (t, e) {
              if (
                ((e.internalFormat = t.format),
                (e.type = t.type),
                2 === this.webGLVersion)
              ) {
                var r = this.renderer.gl;
                t.type === r.FLOAT &&
                  t.format === r.RGBA &&
                  (e.internalFormat = r.RGBA32F),
                  t.type === n.vK.HALF_FLOAT && (e.type = r.HALF_FLOAT),
                  e.type === r.HALF_FLOAT &&
                    t.format === r.RGBA &&
                    (e.internalFormat = r.RGBA16F);
              }
            }),
            (e.prototype.updateTexture = function (t) {
              var e = t._glTextures[this.CONTEXT_UID];
              if (e) {
                var r = this.renderer;
                if (
                  (this.initTextureType(t, e),
                  t.resource && t.resource.upload(r, t, e))
                );
                else {
                  var i = t.realWidth,
                    n = t.realHeight,
                    o = r.gl;
                  (e.width !== i || e.height !== n || e.dirtyId < 0) &&
                    ((e.width = i),
                    (e.height = n),
                    o.texImage2D(
                      t.target,
                      0,
                      e.internalFormat,
                      i,
                      n,
                      0,
                      t.format,
                      e.type,
                      null
                    ));
                }
                t.dirtyStyleId !== e.dirtyStyleId && this.updateTextureStyle(t),
                  (e.dirtyId = t.dirtyId);
              }
            }),
            (e.prototype.destroyTexture = function (t, e) {
              var r = this.gl;
              if (
                (t = t.castToBaseTexture())._glTextures[this.CONTEXT_UID] &&
                (this.unbind(t),
                r.deleteTexture(t._glTextures[this.CONTEXT_UID].texture),
                t.off("dispose", this.destroyTexture, this),
                delete t._glTextures[this.CONTEXT_UID],
                !e)
              ) {
                var i = this.managedTextures.indexOf(t);
                -1 !== i && (0, o.removeItems)(this.managedTextures, i, 1);
              }
            }),
            (e.prototype.updateTextureStyle = function (t) {
              var e = t._glTextures[this.CONTEXT_UID];
              e &&
                ((t.mipmap !== n.WB.POW2 && 2 === this.webGLVersion) ||
                t.isPowerOfTwo
                  ? (e.mipmap = t.mipmap >= 1)
                  : (e.mipmap = !1),
                2 === this.webGLVersion || t.isPowerOfTwo
                  ? (e.wrapMode = t.wrapMode)
                  : (e.wrapMode = n.Nt.CLAMP),
                (t.resource && t.resource.style(this.renderer, t, e)) ||
                  this.setStyle(t, e),
                (e.dirtyStyleId = t.dirtyStyleId));
            }),
            (e.prototype.setStyle = function (t, e) {
              var r = this.gl;
              if (
                (e.mipmap && r.generateMipmap(t.target),
                r.texParameteri(t.target, r.TEXTURE_WRAP_S, e.wrapMode),
                r.texParameteri(t.target, r.TEXTURE_WRAP_T, e.wrapMode),
                e.mipmap)
              ) {
                r.texParameteri(
                  t.target,
                  r.TEXTURE_MIN_FILTER,
                  t.scaleMode === n.aH.LINEAR
                    ? r.LINEAR_MIPMAP_LINEAR
                    : r.NEAREST_MIPMAP_NEAREST
                );
                var i = this.renderer.context.extensions.anisotropicFiltering;
                if (
                  i &&
                  t.anisotropicLevel > 0 &&
                  t.scaleMode === n.aH.LINEAR
                ) {
                  var o = Math.min(
                    t.anisotropicLevel,
                    r.getParameter(i.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
                  );
                  r.texParameterf(t.target, i.TEXTURE_MAX_ANISOTROPY_EXT, o);
                }
              } else
                r.texParameteri(
                  t.target,
                  r.TEXTURE_MIN_FILTER,
                  t.scaleMode === n.aH.LINEAR ? r.LINEAR : r.NEAREST
                );
              r.texParameteri(
                t.target,
                r.TEXTURE_MAG_FILTER,
                t.scaleMode === n.aH.LINEAR ? r.LINEAR : r.NEAREST
              );
            }),
            e
          );
        })(I),
        ie = {
          FilterSystem: Z,
          BatchSystem: Q,
          ContextSystem: et,
          FramebufferSystem: nt,
          GeometrySystem: at,
          MaskSystem: kt,
          ScissorSystem: Ht,
          StencilSystem: Xt,
          ProjectionSystem: Gt,
          RenderTextureSystem: Yt,
          ShaderSystem: Jt,
          StateSystem: Qt,
          TextureGCSystem: te,
          TextureSystem: re,
        },
        ne = new h.y3(),
        oe = (function (t) {
          function e(e, r) {
            void 0 === e && (e = n.N3.UNKNOWN);
            var s = t.call(this) || this;
            return (
              (r = Object.assign({}, i.X.RENDER_OPTIONS, r)).roundPixels &&
                ((i.X.ROUND_PIXELS = r.roundPixels),
                (0, o.deprecation)(
                  "5.0.0",
                  "Renderer roundPixels option is deprecated, please use PIXI.settings.ROUND_PIXELS",
                  2
                )),
              (s.options = r),
              (s.type = e),
              (s.screen = new h.Ae(0, 0, r.width, r.height)),
              (s.view = r.view || document.createElement("canvas")),
              (s.resolution = r.resolution || i.X.RESOLUTION),
              (s.transparent = r.transparent),
              (s.autoDensity = r.autoDensity || r.autoResize || !1),
              (s.preserveDrawingBuffer = r.preserveDrawingBuffer),
              (s.clearBeforeRender = r.clearBeforeRender),
              (s._backgroundColor = 0),
              (s._backgroundColorRgba = [0, 0, 0, 0]),
              (s._backgroundColorString = "#000000"),
              (s.backgroundColor = r.backgroundColor || s._backgroundColor),
              (s._lastObjectRendered = null),
              (s.plugins = {}),
              s
            );
          }
          return (
            d(e, t),
            (e.prototype.initPlugins = function (t) {
              for (var e in t) this.plugins[e] = new t[e](this);
            }),
            Object.defineProperty(e.prototype, "width", {
              get: function () {
                return this.view.width;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "height", {
              get: function () {
                return this.view.height;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.resize = function (t, e) {
              (this.screen.width = t),
                (this.screen.height = e),
                (this.view.width = t * this.resolution),
                (this.view.height = e * this.resolution),
                this.autoDensity &&
                  ((this.view.style.width = t + "px"),
                  (this.view.style.height = e + "px")),
                this.emit("resize", t, e);
            }),
            (e.prototype.generateTexture = function (t, e, r, i) {
              0 === (i = i || t.getLocalBounds(null, !0)).width &&
                (i.width = 1),
                0 === i.height && (i.height = 1);
              var n = L.create({
                width: 0 | i.width,
                height: 0 | i.height,
                scaleMode: e,
                resolution: r,
              });
              return (
                (ne.tx = -i.x),
                (ne.ty = -i.y),
                this.render(t, n, !1, ne, !!t.parent),
                n
              );
            }),
            (e.prototype.destroy = function (t) {
              for (var e in this.plugins)
                this.plugins[e].destroy(), (this.plugins[e] = null);
              t &&
                this.view.parentNode &&
                this.view.parentNode.removeChild(this.view);
              var r = this;
              (r.plugins = null),
                (r.type = n.N3.UNKNOWN),
                (r.view = null),
                (r.screen = null),
                (r._tempDisplayObjectParent = null),
                (r.options = null),
                (this._backgroundColorRgba = null),
                (this._backgroundColorString = null),
                (this._lastObjectRendered = null);
            }),
            Object.defineProperty(e.prototype, "backgroundColor", {
              get: function () {
                return this._backgroundColor;
              },
              set: function (t) {
                (this._backgroundColor = t),
                  (this._backgroundColorString = (0, o.hex2string)(t)),
                  (0, o.hex2rgb)(t, this._backgroundColorRgba);
              },
              enumerable: !1,
              configurable: !0,
            }),
            e
          );
        })(o.EventEmitter),
        se = (function (t) {
          function e(r) {
            var i = t.call(this, n.N3.WEBGL, r) || this;
            return (
              (r = i.options),
              (i.gl = null),
              (i.CONTEXT_UID = 0),
              (i.runners = {
                destroy: new s.R("destroy"),
                contextChange: new s.R("contextChange"),
                reset: new s.R("reset"),
                update: new s.R("update"),
                postrender: new s.R("postrender"),
                prerender: new s.R("prerender"),
                resize: new s.R("resize"),
              }),
              (i.globalUniforms = new K({ projectionMatrix: new h.y3() }, !0)),
              i
                .addSystem(kt, "mask")
                .addSystem(et, "context")
                .addSystem(Qt, "state")
                .addSystem(Jt, "shader")
                .addSystem(re, "texture")
                .addSystem(at, "geometry")
                .addSystem(nt, "framebuffer")
                .addSystem(Ht, "scissor")
                .addSystem(Xt, "stencil")
                .addSystem(Gt, "projection")
                .addSystem(te, "textureGC")
                .addSystem(Z, "filter")
                .addSystem(Yt, "renderTexture")
                .addSystem(Q, "batch"),
              i.initPlugins(e.__plugins),
              r.context
                ? i.context.initFromContext(r.context)
                : i.context.initFromOptions({
                    alpha: !!i.transparent,
                    antialias: r.antialias,
                    premultipliedAlpha:
                      i.transparent && "notMultiplied" !== i.transparent,
                    stencil: !0,
                    preserveDrawingBuffer: r.preserveDrawingBuffer,
                    powerPreference: i.options.powerPreference,
                  }),
              (i.renderingToScreen = !0),
              (0, o.sayHello)(
                2 === i.context.webGLVersion ? "WebGL 2" : "WebGL 1"
              ),
              i.resize(i.options.width, i.options.height),
              i
            );
          }
          return (
            d(e, t),
            (e.create = function (t) {
              if ((0, o.isWebGLSupported)()) return new e(t);
              throw new Error(
                'WebGL unsupported in this browser, use "pixi.js-legacy" for fallback canvas2d support.'
              );
            }),
            (e.prototype.addSystem = function (t, e) {
              e || (e = t.name);
              var r = new t(this);
              if (this[e])
                throw new Error(
                  'Whoops! The name "' + e + '" is already in use'
                );
              for (var i in ((this[e] = r), this.runners))
                this.runners[i].add(r);
              return this;
            }),
            (e.prototype.render = function (t, e, r, i, n) {
              if (
                ((this.renderingToScreen = !e),
                this.runners.prerender.emit(),
                this.emit("prerender"),
                (this.projection.transform = i),
                !this.context.isLost)
              ) {
                if ((e || (this._lastObjectRendered = t), !n)) {
                  var o = t.enableTempParent();
                  t.updateTransform(), t.disableTempParent(o);
                }
                this.renderTexture.bind(e),
                  this.batch.currentRenderer.start(),
                  (void 0 !== r ? r : this.clearBeforeRender) &&
                    this.renderTexture.clear(),
                  t.render(this),
                  this.batch.currentRenderer.flush(),
                  e && e.baseTexture.update(),
                  this.runners.postrender.emit(),
                  (this.projection.transform = null),
                  this.emit("postrender");
              }
            }),
            (e.prototype.resize = function (e, r) {
              t.prototype.resize.call(this, e, r),
                this.runners.resize.emit(e, r);
            }),
            (e.prototype.reset = function () {
              return this.runners.reset.emit(), this;
            }),
            (e.prototype.clear = function () {
              this.renderTexture.bind(), this.renderTexture.clear();
            }),
            (e.prototype.destroy = function (e) {
              for (var r in (this.runners.destroy.emit(), this.runners))
                this.runners[r].destroy();
              t.prototype.destroy.call(this, e), (this.gl = null);
            }),
            (e.registerPlugin = function (t, r) {
              (e.__plugins = e.__plugins || {}), (e.__plugins[t] = r);
            }),
            e
          );
        })(oe);
      function ae(t) {
        return se.create(t);
      }
      var he =
          "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}",
        ue =
          "attribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord( void )\n{\n    return aVertexPosition * (outputFrame.zw * inputSize.zw);\n}\n\nvoid main(void)\n{\n    gl_Position = filterVertexPosition();\n    vTextureCoord = filterTextureCoord();\n}\n",
        le = function () {
          (this.texArray = null),
            (this.blend = 0),
            (this.type = n.lg.TRIANGLES),
            (this.start = 0),
            (this.size = 0),
            (this.data = null);
        },
        ce = (function () {
          function t() {
            (this.elements = []), (this.ids = []), (this.count = 0);
          }
          return (
            (t.prototype.clear = function () {
              for (var t = 0; t < this.count; t++) this.elements[t] = null;
              this.count = 0;
            }),
            t
          );
        })(),
        de = (function () {
          function t(t) {
            (this.rawBinaryData = new ArrayBuffer(t)),
              (this.uint32View = new Uint32Array(this.rawBinaryData)),
              (this.float32View = new Float32Array(this.rawBinaryData));
          }
          return (
            Object.defineProperty(t.prototype, "int8View", {
              get: function () {
                return (
                  this._int8View ||
                    (this._int8View = new Int8Array(this.rawBinaryData)),
                  this._int8View
                );
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "uint8View", {
              get: function () {
                return (
                  this._uint8View ||
                    (this._uint8View = new Uint8Array(this.rawBinaryData)),
                  this._uint8View
                );
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "int16View", {
              get: function () {
                return (
                  this._int16View ||
                    (this._int16View = new Int16Array(this.rawBinaryData)),
                  this._int16View
                );
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "uint16View", {
              get: function () {
                return (
                  this._uint16View ||
                    (this._uint16View = new Uint16Array(this.rawBinaryData)),
                  this._uint16View
                );
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "int32View", {
              get: function () {
                return (
                  this._int32View ||
                    (this._int32View = new Int32Array(this.rawBinaryData)),
                  this._int32View
                );
              },
              enumerable: !1,
              configurable: !0,
            }),
            (t.prototype.view = function (t) {
              return this[t + "View"];
            }),
            (t.prototype.destroy = function () {
              (this.rawBinaryData = null),
                (this._int8View = null),
                (this._uint8View = null),
                (this._int16View = null),
                (this._uint16View = null),
                (this._int32View = null),
                (this.uint32View = null),
                (this.float32View = null);
            }),
            (t.sizeOf = function (t) {
              switch (t) {
                case "int8":
                case "uint8":
                  return 1;
                case "int16":
                case "uint16":
                  return 2;
                case "int32":
                case "uint32":
                case "float32":
                  return 4;
                default:
                  throw new Error(t + " isn't a valid view type");
              }
            }),
            t
          );
        })(),
        pe = (function (t) {
          function e(e) {
            var r = t.call(this, e) || this;
            return (
              (r.shaderGenerator = null),
              (r.geometryClass = null),
              (r.vertexSize = null),
              (r.state = Nt.for2d()),
              (r.size = 4 * i.X.SPRITE_BATCH_SIZE),
              (r._vertexCount = 0),
              (r._indexCount = 0),
              (r._bufferedElements = []),
              (r._bufferedTextures = []),
              (r._bufferSize = 0),
              (r._shader = null),
              (r._packedGeometries = []),
              (r._packedGeometryPoolSize = 2),
              (r._flushId = 0),
              (r._aBuffers = {}),
              (r._iBuffers = {}),
              (r.MAX_TEXTURES = 1),
              r.renderer.on("prerender", r.onPrerender, r),
              e.runners.contextChange.add(r),
              (r._dcIndex = 0),
              (r._aIndex = 0),
              (r._iIndex = 0),
              (r._attributeBuffer = null),
              (r._indexBuffer = null),
              (r._tempBoundTextures = []),
              r
            );
          }
          return (
            d(e, t),
            (e.prototype.contextChange = function () {
              var t = this.renderer.gl;
              i.X.PREFER_ENV === n.Vi.WEBGL_LEGACY
                ? (this.MAX_TEXTURES = 1)
                : ((this.MAX_TEXTURES = Math.min(
                    t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),
                    i.X.SPRITE_MAX_TEXTURES
                  )),
                  (this.MAX_TEXTURES = Ot(this.MAX_TEXTURES, t))),
                (this._shader = this.shaderGenerator.generateShader(
                  this.MAX_TEXTURES
                ));
              for (var e = 0; e < this._packedGeometryPoolSize; e++)
                this._packedGeometries[e] = new this.geometryClass();
              this.initFlushBuffers();
            }),
            (e.prototype.initFlushBuffers = function () {
              for (
                var t = e._drawCallPool,
                  r = e._textureArrayPool,
                  i = this.size / 4,
                  n = Math.floor(i / this.MAX_TEXTURES) + 1;
                t.length < i;

              )
                t.push(new le());
              for (; r.length < n; ) r.push(new ce());
              for (var o = 0; o < this.MAX_TEXTURES; o++)
                this._tempBoundTextures[o] = null;
            }),
            (e.prototype.onPrerender = function () {
              this._flushId = 0;
            }),
            (e.prototype.render = function (t) {
              t._texture.valid &&
                (this._vertexCount + t.vertexData.length / 2 > this.size &&
                  this.flush(),
                (this._vertexCount += t.vertexData.length / 2),
                (this._indexCount += t.indices.length),
                (this._bufferedTextures[this._bufferSize] =
                  t._texture.baseTexture),
                (this._bufferedElements[this._bufferSize++] = t));
            }),
            (e.prototype.buildTexturesAndDrawCalls = function () {
              var t = this._bufferedTextures,
                r = this.MAX_TEXTURES,
                i = e._textureArrayPool,
                n = this.renderer.batch,
                o = this._tempBoundTextures,
                s = this.renderer.textureGC.count,
                a = ++v._globalBatch,
                h = 0,
                u = i[0],
                l = 0;
              n.copyBoundTextures(o, r);
              for (var c = 0; c < this._bufferSize; ++c) {
                var d = t[c];
                (t[c] = null),
                  d._batchEnabled !== a &&
                    (u.count >= r &&
                      (n.boundArray(u, o, a, r),
                      this.buildDrawCalls(u, l, c),
                      (l = c),
                      (u = i[++h]),
                      ++a),
                    (d._batchEnabled = a),
                    (d.touched = s),
                    (u.elements[u.count++] = d));
              }
              for (
                u.count > 0 &&
                  (n.boundArray(u, o, a, r),
                  this.buildDrawCalls(u, l, this._bufferSize),
                  ++h,
                  ++a),
                  c = 0;
                c < o.length;
                c++
              )
                o[c] = null;
              v._globalBatch = a;
            }),
            (e.prototype.buildDrawCalls = function (t, r, i) {
              var n = this,
                s = n._bufferedElements,
                a = n._attributeBuffer,
                h = n._indexBuffer,
                u = n.vertexSize,
                l = e._drawCallPool,
                c = this._dcIndex,
                d = this._aIndex,
                p = this._iIndex,
                f = l[c];
              (f.start = this._iIndex), (f.texArray = t);
              for (var m = r; m < i; ++m) {
                var v = s[m],
                  y = v._texture.baseTexture,
                  g = o.premultiplyBlendMode[y.alphaMode ? 1 : 0][v.blendMode];
                (s[m] = null),
                  r < m &&
                    f.blend !== g &&
                    ((f.size = p - f.start),
                    (r = m),
                    ((f = l[++c]).texArray = t),
                    (f.start = p)),
                  this.packInterleavedGeometry(v, a, h, d, p),
                  (d += (v.vertexData.length / 2) * u),
                  (p += v.indices.length),
                  (f.blend = g);
              }
              r < i && ((f.size = p - f.start), ++c),
                (this._dcIndex = c),
                (this._aIndex = d),
                (this._iIndex = p);
            }),
            (e.prototype.bindAndClearTexArray = function (t) {
              for (var e = this.renderer.texture, r = 0; r < t.count; r++)
                e.bind(t.elements[r], t.ids[r]), (t.elements[r] = null);
              t.count = 0;
            }),
            (e.prototype.updateGeometry = function () {
              var t = this,
                e = t._packedGeometries,
                r = t._attributeBuffer,
                n = t._indexBuffer;
              i.X.CAN_UPLOAD_SAME_BUFFER
                ? (e[this._flushId]._buffer.update(r.rawBinaryData),
                  e[this._flushId]._indexBuffer.update(n),
                  this.renderer.geometry.updateBuffers())
                : (this._packedGeometryPoolSize <= this._flushId &&
                    (this._packedGeometryPoolSize++,
                    (e[this._flushId] = new this.geometryClass())),
                  e[this._flushId]._buffer.update(r.rawBinaryData),
                  e[this._flushId]._indexBuffer.update(n),
                  this.renderer.geometry.bind(e[this._flushId]),
                  this.renderer.geometry.updateBuffers(),
                  this._flushId++);
            }),
            (e.prototype.drawBatches = function () {
              for (
                var t = this._dcIndex,
                  r = this.renderer,
                  i = r.gl,
                  n = r.state,
                  o = e._drawCallPool,
                  s = null,
                  a = 0;
                a < t;
                a++
              ) {
                var h = o[a],
                  u = h.texArray,
                  l = h.type,
                  c = h.size,
                  d = h.start,
                  p = h.blend;
                s !== u && ((s = u), this.bindAndClearTexArray(u)),
                  (this.state.blendMode = p),
                  n.set(this.state),
                  i.drawElements(l, c, i.UNSIGNED_SHORT, 2 * d);
              }
            }),
            (e.prototype.flush = function () {
              0 !== this._vertexCount &&
                ((this._attributeBuffer = this.getAttributeBuffer(
                  this._vertexCount
                )),
                (this._indexBuffer = this.getIndexBuffer(this._indexCount)),
                (this._aIndex = 0),
                (this._iIndex = 0),
                (this._dcIndex = 0),
                this.buildTexturesAndDrawCalls(),
                this.updateGeometry(),
                this.drawBatches(),
                (this._bufferSize = 0),
                (this._vertexCount = 0),
                (this._indexCount = 0));
            }),
            (e.prototype.start = function () {
              this.renderer.state.set(this.state),
                this.renderer.shader.bind(this._shader),
                i.X.CAN_UPLOAD_SAME_BUFFER &&
                  this.renderer.geometry.bind(
                    this._packedGeometries[this._flushId]
                  );
            }),
            (e.prototype.stop = function () {
              this.flush();
            }),
            (e.prototype.destroy = function () {
              for (var e = 0; e < this._packedGeometryPoolSize; e++)
                this._packedGeometries[e] &&
                  this._packedGeometries[e].destroy();
              this.renderer.off("prerender", this.onPrerender, this),
                (this._aBuffers = null),
                (this._iBuffers = null),
                (this._packedGeometries = null),
                (this._attributeBuffer = null),
                (this._indexBuffer = null),
                this._shader && (this._shader.destroy(), (this._shader = null)),
                t.prototype.destroy.call(this);
            }),
            (e.prototype.getAttributeBuffer = function (t) {
              var e = (0, o.nextPow2)(Math.ceil(t / 8)),
                r = (0, o.log2)(e),
                i = 8 * e;
              this._aBuffers.length <= r && (this._iBuffers.length = r + 1);
              var n = this._aBuffers[i];
              return (
                n || (this._aBuffers[i] = n = new de(i * this.vertexSize * 4)),
                n
              );
            }),
            (e.prototype.getIndexBuffer = function (t) {
              var e = (0, o.nextPow2)(Math.ceil(t / 12)),
                r = (0, o.log2)(e),
                i = 12 * e;
              this._iBuffers.length <= r && (this._iBuffers.length = r + 1);
              var n = this._iBuffers[r];
              return n || (this._iBuffers[r] = n = new Uint16Array(i)), n;
            }),
            (e.prototype.packInterleavedGeometry = function (t, e, r, i, n) {
              for (
                var s = e.uint32View,
                  a = e.float32View,
                  h = i / this.vertexSize,
                  u = t.uvs,
                  l = t.indices,
                  c = t.vertexData,
                  d = t._texture.baseTexture._batchLocation,
                  p = Math.min(t.worldAlpha, 1),
                  f =
                    p < 1 && t._texture.baseTexture.alphaMode
                      ? (0, o.premultiplyTint)(t._tintRGB, p)
                      : t._tintRGB + ((255 * p) << 24),
                  m = 0;
                m < c.length;
                m += 2
              )
                (a[i++] = c[m]),
                  (a[i++] = c[m + 1]),
                  (a[i++] = u[m]),
                  (a[i++] = u[m + 1]),
                  (s[i++] = f),
                  (a[i++] = d);
              for (m = 0; m < l.length; m++) r[n++] = h + l[m];
            }),
            (e._drawCallPool = []),
            (e._textureArrayPool = []),
            e
          );
        })(J),
        fe = (function () {
          function t(t, e) {
            if (
              ((this.vertexSrc = t),
              (this.fragTemplate = e),
              (this.programCache = {}),
              (this.defaultGroupCache = {}),
              e.indexOf("%count%") < 0)
            )
              throw new Error('Fragment template must contain "%count%".');
            if (e.indexOf("%forloop%") < 0)
              throw new Error('Fragment template must contain "%forloop%".');
          }
          return (
            (t.prototype.generateShader = function (t) {
              if (!this.programCache[t]) {
                for (var e = new Int32Array(t), r = 0; r < t; r++) e[r] = r;
                this.defaultGroupCache[t] = K.from({ uSamplers: e }, !0);
                var i = this.fragTemplate;
                (i = (i = i.replace(/%count%/gi, "" + t)).replace(
                  /%forloop%/gi,
                  this.generateSampleSrc(t)
                )),
                  (this.programCache[t] = new Dt(this.vertexSrc, i));
              }
              var n = {
                tint: new Float32Array([1, 1, 1, 1]),
                translationMatrix: new h.y3(),
                default: this.defaultGroupCache[t],
              };
              return new Rt(this.programCache[t], n);
            }),
            (t.prototype.generateSampleSrc = function (t) {
              var e = "";
              (e += "\n"), (e += "\n");
              for (var r = 0; r < t; r++)
                r > 0 && (e += "\nelse "),
                  r < t - 1 && (e += "if(vTextureId < " + r + ".5)"),
                  (e += "\n{"),
                  (e +=
                    "\n\tcolor = texture2D(uSamplers[" +
                    r +
                    "], vTextureCoord);"),
                  (e += "\n}");
              return (e += "\n") + "\n";
            }),
            t
          );
        })(),
        me = (function (t) {
          function e(e) {
            void 0 === e && (e = !1);
            var r = t.call(this) || this;
            return (
              (r._buffer = new k(null, e, !1)),
              (r._indexBuffer = new k(null, e, !0)),
              r
                .addAttribute("aVertexPosition", r._buffer, 2, !1, n.vK.FLOAT)
                .addAttribute("aTextureCoord", r._buffer, 2, !1, n.vK.FLOAT)
                .addAttribute("aColor", r._buffer, 4, !0, n.vK.UNSIGNED_BYTE)
                .addAttribute("aTextureId", r._buffer, 1, !0, n.vK.FLOAT)
                .addIndex(r._indexBuffer),
              r
            );
          }
          return d(e, t), e;
        })(V),
        ve =
          "precision highp float;\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\nattribute float aTextureId;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform vec4 tint;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\n\nvoid main(void){\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vTextureId = aTextureId;\n    vColor = aColor * tint;\n}\n",
        ye =
          "varying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\nuniform sampler2D uSamplers[%count%];\n\nvoid main(void){\n    vec4 color;\n    %forloop%\n    gl_FragColor = color * vColor;\n}\n",
        ge = (function () {
          function t() {}
          return (
            (t.create = function (t) {
              var e = Object.assign(
                  {
                    vertex: ve,
                    fragment: ye,
                    geometryClass: me,
                    vertexSize: 6,
                  },
                  t
                ),
                r = e.vertex,
                i = e.fragment,
                n = e.vertexSize,
                o = e.geometryClass;
              return (function (t) {
                function e(e) {
                  var s = t.call(this, e) || this;
                  return (
                    (s.shaderGenerator = new fe(r, i)),
                    (s.geometryClass = o),
                    (s.vertexSize = n),
                    s
                  );
                }
                return d(e, t), e;
              })(pe);
            }),
            Object.defineProperty(t, "defaultVertexSrc", {
              get: function () {
                return ve;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t, "defaultFragmentTemplate", {
              get: function () {
                return ye;
              },
              enumerable: !1,
              configurable: !0,
            }),
            t
          );
        })(),
        _e = ge.create();
    },
    29: (t, e, r) => {
      r.d(e, { Ql: () => l, W2: () => d, YZ: () => s, s$: () => u });
      var i = r(1573),
        n = r(4295),
        o = r(5323);
      i.X.SORTABLE_CHILDREN = !1;
      var s = (function () {
          function t() {
            (this.minX = 1 / 0),
              (this.minY = 1 / 0),
              (this.maxX = -1 / 0),
              (this.maxY = -1 / 0),
              (this.rect = null),
              (this.updateID = -1);
          }
          return (
            (t.prototype.isEmpty = function () {
              return this.minX > this.maxX || this.minY > this.maxY;
            }),
            (t.prototype.clear = function () {
              (this.minX = 1 / 0),
                (this.minY = 1 / 0),
                (this.maxX = -1 / 0),
                (this.maxY = -1 / 0);
            }),
            (t.prototype.getRectangle = function (t) {
              return this.minX > this.maxX || this.minY > this.maxY
                ? n.Ae.EMPTY
                : (((t = t || new n.Ae(0, 0, 1, 1)).x = this.minX),
                  (t.y = this.minY),
                  (t.width = this.maxX - this.minX),
                  (t.height = this.maxY - this.minY),
                  t);
            }),
            (t.prototype.addPoint = function (t) {
              (this.minX = Math.min(this.minX, t.x)),
                (this.maxX = Math.max(this.maxX, t.x)),
                (this.minY = Math.min(this.minY, t.y)),
                (this.maxY = Math.max(this.maxY, t.y));
            }),
            (t.prototype.addQuad = function (t) {
              var e = this.minX,
                r = this.minY,
                i = this.maxX,
                n = this.maxY,
                o = t[0],
                s = t[1];
              (e = o < e ? o : e),
                (r = s < r ? s : r),
                (i = o > i ? o : i),
                (n = s > n ? s : n),
                (e = (o = t[2]) < e ? o : e),
                (r = (s = t[3]) < r ? s : r),
                (i = o > i ? o : i),
                (n = s > n ? s : n),
                (e = (o = t[4]) < e ? o : e),
                (r = (s = t[5]) < r ? s : r),
                (i = o > i ? o : i),
                (n = s > n ? s : n),
                (e = (o = t[6]) < e ? o : e),
                (r = (s = t[7]) < r ? s : r),
                (i = o > i ? o : i),
                (n = s > n ? s : n),
                (this.minX = e),
                (this.minY = r),
                (this.maxX = i),
                (this.maxY = n);
            }),
            (t.prototype.addFrame = function (t, e, r, i, n) {
              this.addFrameMatrix(t.worldTransform, e, r, i, n);
            }),
            (t.prototype.addFrameMatrix = function (t, e, r, i, n) {
              var o = t.a,
                s = t.b,
                a = t.c,
                h = t.d,
                u = t.tx,
                l = t.ty,
                c = this.minX,
                d = this.minY,
                p = this.maxX,
                f = this.maxY,
                m = o * e + a * r + u,
                v = s * e + h * r + l;
              (c = m < c ? m : c),
                (d = v < d ? v : d),
                (p = m > p ? m : p),
                (f = v > f ? v : f),
                (c = (m = o * i + a * r + u) < c ? m : c),
                (d = (v = s * i + h * r + l) < d ? v : d),
                (p = m > p ? m : p),
                (f = v > f ? v : f),
                (c = (m = o * e + a * n + u) < c ? m : c),
                (d = (v = s * e + h * n + l) < d ? v : d),
                (p = m > p ? m : p),
                (f = v > f ? v : f),
                (c = (m = o * i + a * n + u) < c ? m : c),
                (d = (v = s * i + h * n + l) < d ? v : d),
                (p = m > p ? m : p),
                (f = v > f ? v : f),
                (this.minX = c),
                (this.minY = d),
                (this.maxX = p),
                (this.maxY = f);
            }),
            (t.prototype.addVertexData = function (t, e, r) {
              for (
                var i = this.minX,
                  n = this.minY,
                  o = this.maxX,
                  s = this.maxY,
                  a = e;
                a < r;
                a += 2
              ) {
                var h = t[a],
                  u = t[a + 1];
                (i = h < i ? h : i),
                  (n = u < n ? u : n),
                  (o = h > o ? h : o),
                  (s = u > s ? u : s);
              }
              (this.minX = i),
                (this.minY = n),
                (this.maxX = o),
                (this.maxY = s);
            }),
            (t.prototype.addVertices = function (t, e, r, i) {
              this.addVerticesMatrix(t.worldTransform, e, r, i);
            }),
            (t.prototype.addVerticesMatrix = function (t, e, r, i, n, o) {
              void 0 === n && (n = 0), void 0 === o && (o = n);
              for (
                var s = t.a,
                  a = t.b,
                  h = t.c,
                  u = t.d,
                  l = t.tx,
                  c = t.ty,
                  d = this.minX,
                  p = this.minY,
                  f = this.maxX,
                  m = this.maxY,
                  v = r;
                v < i;
                v += 2
              ) {
                var y = e[v],
                  g = e[v + 1],
                  _ = s * y + h * g + l,
                  b = u * g + a * y + c;
                (d = Math.min(d, _ - n)),
                  (f = Math.max(f, _ + n)),
                  (p = Math.min(p, b - o)),
                  (m = Math.max(m, b + o));
              }
              (this.minX = d),
                (this.minY = p),
                (this.maxX = f),
                (this.maxY = m);
            }),
            (t.prototype.addBounds = function (t) {
              var e = this.minX,
                r = this.minY,
                i = this.maxX,
                n = this.maxY;
              (this.minX = t.minX < e ? t.minX : e),
                (this.minY = t.minY < r ? t.minY : r),
                (this.maxX = t.maxX > i ? t.maxX : i),
                (this.maxY = t.maxY > n ? t.maxY : n);
            }),
            (t.prototype.addBoundsMask = function (t, e) {
              var r = t.minX > e.minX ? t.minX : e.minX,
                i = t.minY > e.minY ? t.minY : e.minY,
                n = t.maxX < e.maxX ? t.maxX : e.maxX,
                o = t.maxY < e.maxY ? t.maxY : e.maxY;
              if (r <= n && i <= o) {
                var s = this.minX,
                  a = this.minY,
                  h = this.maxX,
                  u = this.maxY;
                (this.minX = r < s ? r : s),
                  (this.minY = i < a ? i : a),
                  (this.maxX = n > h ? n : h),
                  (this.maxY = o > u ? o : u);
              }
            }),
            (t.prototype.addBoundsMatrix = function (t, e) {
              this.addFrameMatrix(e, t.minX, t.minY, t.maxX, t.maxY);
            }),
            (t.prototype.addBoundsArea = function (t, e) {
              var r = t.minX > e.x ? t.minX : e.x,
                i = t.minY > e.y ? t.minY : e.y,
                n = t.maxX < e.x + e.width ? t.maxX : e.x + e.width,
                o = t.maxY < e.y + e.height ? t.maxY : e.y + e.height;
              if (r <= n && i <= o) {
                var s = this.minX,
                  a = this.minY,
                  h = this.maxX,
                  u = this.maxY;
                (this.minX = r < s ? r : s),
                  (this.minY = i < a ? i : a),
                  (this.maxX = n > h ? n : h),
                  (this.maxY = o > u ? o : u);
              }
            }),
            (t.prototype.pad = function (t, e) {
              void 0 === t && (t = 0),
                void 0 === e && (e = t),
                this.isEmpty() ||
                  ((this.minX -= t),
                  (this.maxX += t),
                  (this.minY -= e),
                  (this.maxY += e));
            }),
            (t.prototype.addFramePad = function (t, e, r, i, n, o) {
              (t -= n),
                (e -= o),
                (r += n),
                (i += o),
                (this.minX = this.minX < t ? this.minX : t),
                (this.maxX = this.maxX > r ? this.maxX : r),
                (this.minY = this.minY < e ? this.minY : e),
                (this.maxY = this.maxY > i ? this.maxY : i);
            }),
            t
          );
        })(),
        a = function (t, e) {
          return (
            (a =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (t, e) {
                  t.__proto__ = e;
                }) ||
              function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
              }),
            a(t, e)
          );
        };
      function h(t, e) {
        function r() {
          this.constructor = t;
        }
        a(t, e),
          (t.prototype =
            null === e
              ? Object.create(e)
              : ((r.prototype = e.prototype), new r()));
      }
      var u = (function (t) {
          function e() {
            var e = t.call(this) || this;
            return (
              (e.tempDisplayObjectParent = null),
              (e.transform = new n.wx()),
              (e.alpha = 1),
              (e.visible = !0),
              (e.renderable = !0),
              (e.parent = null),
              (e.worldAlpha = 1),
              (e._lastSortedIndex = 0),
              (e._zIndex = 0),
              (e.filterArea = null),
              (e.filters = null),
              (e._enabledFilters = null),
              (e._bounds = new s()),
              (e._localBounds = null),
              (e._boundsID = 0),
              (e._boundsRect = null),
              (e._localBoundsRect = null),
              (e._mask = null),
              (e._destroyed = !1),
              (e.isSprite = !1),
              (e.isMask = !1),
              e
            );
          }
          return (
            h(e, t),
            (e.mixin = function (t) {
              for (var r = Object.keys(t), i = 0; i < r.length; ++i) {
                var n = r[i];
                Object.defineProperty(
                  e.prototype,
                  n,
                  Object.getOwnPropertyDescriptor(t, n)
                );
              }
            }),
            (e.prototype._recursivePostUpdateTransform = function () {
              this.parent
                ? (this.parent._recursivePostUpdateTransform(),
                  this.transform.updateTransform(this.parent.transform))
                : this.transform.updateTransform(
                    this._tempDisplayObjectParent.transform
                  );
            }),
            (e.prototype.updateTransform = function () {
              this._boundsID++,
                this.transform.updateTransform(this.parent.transform),
                (this.worldAlpha = this.alpha * this.parent.worldAlpha);
            }),
            (e.prototype.getBounds = function (t, e) {
              return (
                t ||
                  (this.parent
                    ? (this._recursivePostUpdateTransform(),
                      this.updateTransform())
                    : ((this.parent = this._tempDisplayObjectParent),
                      this.updateTransform(),
                      (this.parent = null))),
                this._bounds.updateID !== this._boundsID &&
                  (this.calculateBounds(),
                  (this._bounds.updateID = this._boundsID)),
                e ||
                  (this._boundsRect || (this._boundsRect = new n.Ae()),
                  (e = this._boundsRect)),
                this._bounds.getRectangle(e)
              );
            }),
            (e.prototype.getLocalBounds = function (t) {
              t ||
                (this._localBoundsRect || (this._localBoundsRect = new n.Ae()),
                (t = this._localBoundsRect)),
                this._localBounds || (this._localBounds = new s());
              var e = this.transform,
                r = this.parent;
              (this.parent = null),
                (this.transform = this._tempDisplayObjectParent.transform);
              var i = this._bounds,
                o = this._boundsID;
              this._bounds = this._localBounds;
              var a = this.getBounds(!1, t);
              return (
                (this.parent = r),
                (this.transform = e),
                (this._bounds = i),
                (this._bounds.updateID += this._boundsID - o),
                a
              );
            }),
            (e.prototype.toGlobal = function (t, e, r) {
              return (
                void 0 === r && (r = !1),
                r ||
                  (this._recursivePostUpdateTransform(),
                  this.parent
                    ? this.displayObjectUpdateTransform()
                    : ((this.parent = this._tempDisplayObjectParent),
                      this.displayObjectUpdateTransform(),
                      (this.parent = null))),
                this.worldTransform.apply(t, e)
              );
            }),
            (e.prototype.toLocal = function (t, e, r, i) {
              return (
                e && (t = e.toGlobal(t, r, i)),
                i ||
                  (this._recursivePostUpdateTransform(),
                  this.parent
                    ? this.displayObjectUpdateTransform()
                    : ((this.parent = this._tempDisplayObjectParent),
                      this.displayObjectUpdateTransform(),
                      (this.parent = null))),
                this.worldTransform.applyInverse(t, r)
              );
            }),
            (e.prototype.setParent = function (t) {
              if (!t || !t.addChild)
                throw new Error("setParent: Argument must be a Container");
              return t.addChild(this), t;
            }),
            (e.prototype.setTransform = function (t, e, r, i, n, o, s, a, h) {
              return (
                void 0 === t && (t = 0),
                void 0 === e && (e = 0),
                void 0 === r && (r = 1),
                void 0 === i && (i = 1),
                void 0 === n && (n = 0),
                void 0 === o && (o = 0),
                void 0 === s && (s = 0),
                void 0 === a && (a = 0),
                void 0 === h && (h = 0),
                (this.position.x = t),
                (this.position.y = e),
                (this.scale.x = r || 1),
                (this.scale.y = i || 1),
                (this.rotation = n),
                (this.skew.x = o),
                (this.skew.y = s),
                (this.pivot.x = a),
                (this.pivot.y = h),
                this
              );
            }),
            (e.prototype.destroy = function (t) {
              this.parent && this.parent.removeChild(this),
                this.removeAllListeners(),
                (this.transform = null),
                (this.parent = null),
                (this._bounds = null),
                (this._mask = null),
                (this.filters = null),
                (this.filterArea = null),
                (this.hitArea = null),
                (this.interactive = !1),
                (this.interactiveChildren = !1),
                (this._destroyed = !0);
            }),
            Object.defineProperty(e.prototype, "_tempDisplayObjectParent", {
              get: function () {
                return (
                  null === this.tempDisplayObjectParent &&
                    (this.tempDisplayObjectParent = new l()),
                  this.tempDisplayObjectParent
                );
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.enableTempParent = function () {
              var t = this.parent;
              return (this.parent = this._tempDisplayObjectParent), t;
            }),
            (e.prototype.disableTempParent = function (t) {
              this.parent = t;
            }),
            Object.defineProperty(e.prototype, "x", {
              get: function () {
                return this.position.x;
              },
              set: function (t) {
                this.transform.position.x = t;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "y", {
              get: function () {
                return this.position.y;
              },
              set: function (t) {
                this.transform.position.y = t;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "worldTransform", {
              get: function () {
                return this.transform.worldTransform;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "localTransform", {
              get: function () {
                return this.transform.localTransform;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "position", {
              get: function () {
                return this.transform.position;
              },
              set: function (t) {
                this.transform.position.copyFrom(t);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "scale", {
              get: function () {
                return this.transform.scale;
              },
              set: function (t) {
                this.transform.scale.copyFrom(t);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "pivot", {
              get: function () {
                return this.transform.pivot;
              },
              set: function (t) {
                this.transform.pivot.copyFrom(t);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "skew", {
              get: function () {
                return this.transform.skew;
              },
              set: function (t) {
                this.transform.skew.copyFrom(t);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "rotation", {
              get: function () {
                return this.transform.rotation;
              },
              set: function (t) {
                this.transform.rotation = t;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "angle", {
              get: function () {
                return this.transform.rotation * n.jl;
              },
              set: function (t) {
                this.transform.rotation = t * n.ZX;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "zIndex", {
              get: function () {
                return this._zIndex;
              },
              set: function (t) {
                (this._zIndex = t), this.parent && (this.parent.sortDirty = !0);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "worldVisible", {
              get: function () {
                var t = this;
                do {
                  if (!t.visible) return !1;
                  t = t.parent;
                } while (t);
                return !0;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "mask", {
              get: function () {
                return this._mask;
              },
              set: function (t) {
                var e;
                this._mask &&
                  (((e = this._mask.maskObject || this._mask).renderable = !0),
                  (e.isMask = !1)),
                  (this._mask = t),
                  this._mask &&
                    (((e = this._mask.maskObject || this._mask).renderable =
                      !1),
                    (e.isMask = !0));
              },
              enumerable: !1,
              configurable: !0,
            }),
            e
          );
        })(o.EventEmitter),
        l = (function (t) {
          function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            return (e.sortDirty = null), e;
          }
          return h(e, t), e;
        })(u);
      function c(t, e) {
        return t.zIndex === e.zIndex
          ? t._lastSortedIndex - e._lastSortedIndex
          : t.zIndex - e.zIndex;
      }
      u.prototype.displayObjectUpdateTransform = u.prototype.updateTransform;
      var d = (function (t) {
        function e() {
          var e = t.call(this) || this;
          return (
            (e.children = []),
            (e.sortableChildren = i.X.SORTABLE_CHILDREN),
            (e.sortDirty = !1),
            e
          );
        }
        return (
          h(e, t),
          (e.prototype.onChildrenChange = function (t) {}),
          (e.prototype.addChild = function () {
            for (var t = arguments, e = [], r = 0; r < arguments.length; r++)
              e[r] = t[r];
            if (e.length > 1)
              for (var i = 0; i < e.length; i++) this.addChild(e[i]);
            else {
              var n = e[0];
              n.parent && n.parent.removeChild(n),
                (n.parent = this),
                (this.sortDirty = !0),
                (n.transform._parentID = -1),
                this.children.push(n),
                this._boundsID++,
                this.onChildrenChange(this.children.length - 1),
                this.emit("childAdded", n, this, this.children.length - 1),
                n.emit("added", this);
            }
            return e[0];
          }),
          (e.prototype.addChildAt = function (t, e) {
            if (e < 0 || e > this.children.length)
              throw new Error(
                t +
                  "addChildAt: The index " +
                  e +
                  " supplied is out of bounds " +
                  this.children.length
              );
            return (
              t.parent && t.parent.removeChild(t),
              (t.parent = this),
              (this.sortDirty = !0),
              (t.transform._parentID = -1),
              this.children.splice(e, 0, t),
              this._boundsID++,
              this.onChildrenChange(e),
              t.emit("added", this),
              this.emit("childAdded", t, this, e),
              t
            );
          }),
          (e.prototype.swapChildren = function (t, e) {
            if (t !== e) {
              var r = this.getChildIndex(t),
                i = this.getChildIndex(e);
              (this.children[r] = e),
                (this.children[i] = t),
                this.onChildrenChange(r < i ? r : i);
            }
          }),
          (e.prototype.getChildIndex = function (t) {
            var e = this.children.indexOf(t);
            if (-1 === e)
              throw new Error(
                "The supplied DisplayObject must be a child of the caller"
              );
            return e;
          }),
          (e.prototype.setChildIndex = function (t, e) {
            if (e < 0 || e >= this.children.length)
              throw new Error(
                "The index " +
                  e +
                  " supplied is out of bounds " +
                  this.children.length
              );
            var r = this.getChildIndex(t);
            (0, o.removeItems)(this.children, r, 1),
              this.children.splice(e, 0, t),
              this.onChildrenChange(e);
          }),
          (e.prototype.getChildAt = function (t) {
            if (t < 0 || t >= this.children.length)
              throw new Error("getChildAt: Index (" + t + ") does not exist.");
            return this.children[t];
          }),
          (e.prototype.removeChild = function () {
            for (var t = arguments, e = [], r = 0; r < arguments.length; r++)
              e[r] = t[r];
            if (e.length > 1)
              for (var i = 0; i < e.length; i++) this.removeChild(e[i]);
            else {
              var n = e[0],
                s = this.children.indexOf(n);
              if (-1 === s) return null;
              (n.parent = null),
                (n.transform._parentID = -1),
                (0, o.removeItems)(this.children, s, 1),
                this._boundsID++,
                this.onChildrenChange(s),
                n.emit("removed", this),
                this.emit("childRemoved", n, this, s);
            }
            return e[0];
          }),
          (e.prototype.removeChildAt = function (t) {
            var e = this.getChildAt(t);
            return (
              (e.parent = null),
              (e.transform._parentID = -1),
              (0, o.removeItems)(this.children, t, 1),
              this._boundsID++,
              this.onChildrenChange(t),
              e.emit("removed", this),
              this.emit("childRemoved", e, this, t),
              e
            );
          }),
          (e.prototype.removeChildren = function (t, e) {
            void 0 === t && (t = 0), void 0 === e && (e = this.children.length);
            var r,
              i = t,
              n = e - i;
            if (n > 0 && n <= e) {
              r = this.children.splice(i, n);
              for (var o = 0; o < r.length; ++o)
                (r[o].parent = null),
                  r[o].transform && (r[o].transform._parentID = -1);
              for (
                this._boundsID++, this.onChildrenChange(t), o = 0;
                o < r.length;
                ++o
              )
                r[o].emit("removed", this),
                  this.emit("childRemoved", r[o], this, o);
              return r;
            }
            if (0 === n && 0 === this.children.length) return [];
            throw new RangeError(
              "removeChildren: numeric values are outside the acceptable range."
            );
          }),
          (e.prototype.sortChildren = function () {
            for (var t = !1, e = 0, r = this.children.length; e < r; ++e) {
              var i = this.children[e];
              (i._lastSortedIndex = e), t || 0 === i.zIndex || (t = !0);
            }
            t && this.children.length > 1 && this.children.sort(c),
              (this.sortDirty = !1);
          }),
          (e.prototype.updateTransform = function () {
            this.sortableChildren && this.sortDirty && this.sortChildren(),
              this._boundsID++,
              this.transform.updateTransform(this.parent.transform),
              (this.worldAlpha = this.alpha * this.parent.worldAlpha);
            for (var t = 0, e = this.children.length; t < e; ++t) {
              var r = this.children[t];
              r.visible && r.updateTransform();
            }
          }),
          (e.prototype.calculateBounds = function () {
            this._bounds.clear(), this._calculateBounds();
            for (var t = 0; t < this.children.length; t++) {
              var e = this.children[t];
              if (e.visible && e.renderable)
                if ((e.calculateBounds(), e._mask)) {
                  var r = e._mask.maskObject || e._mask;
                  r.calculateBounds(),
                    this._bounds.addBoundsMask(e._bounds, r._bounds);
                } else
                  e.filterArea
                    ? this._bounds.addBoundsArea(e._bounds, e.filterArea)
                    : this._bounds.addBounds(e._bounds);
            }
            this._bounds.updateID = this._boundsID;
          }),
          (e.prototype.getLocalBounds = function (e, r) {
            void 0 === r && (r = !1);
            var i = t.prototype.getLocalBounds.call(this, e);
            if (!r)
              for (var n = 0, o = this.children.length; n < o; ++n) {
                var s = this.children[n];
                s.visible && s.updateTransform();
              }
            return i;
          }),
          (e.prototype._calculateBounds = function () {}),
          (e.prototype.render = function (t) {
            if (this.visible && !(this.worldAlpha <= 0) && this.renderable)
              if (this._mask || (this.filters && this.filters.length))
                this.renderAdvanced(t);
              else {
                this._render(t);
                for (var e = 0, r = this.children.length; e < r; ++e)
                  this.children[e].render(t);
              }
          }),
          (e.prototype.renderAdvanced = function (t) {
            t.batch.flush();
            var e = this.filters,
              r = this._mask;
            if (e) {
              this._enabledFilters || (this._enabledFilters = []),
                (this._enabledFilters.length = 0);
              for (var i = 0; i < e.length; i++)
                e[i].enabled && this._enabledFilters.push(e[i]);
              this._enabledFilters.length &&
                t.filter.push(this, this._enabledFilters);
            }
            r && t.mask.push(this, this._mask), this._render(t), (i = 0);
            for (var n = this.children.length; i < n; i++)
              this.children[i].render(t);
            t.batch.flush(),
              r && t.mask.pop(this),
              e &&
                this._enabledFilters &&
                this._enabledFilters.length &&
                t.filter.pop();
          }),
          (e.prototype._render = function (t) {}),
          (e.prototype.destroy = function (e) {
            t.prototype.destroy.call(this), (this.sortDirty = !1);
            var r = "boolean" == typeof e ? e : e && e.children,
              i = this.removeChildren(0, this.children.length);
            if (r) for (var n = 0; n < i.length; ++n) i[n].destroy(e);
          }),
          Object.defineProperty(e.prototype, "width", {
            get: function () {
              return this.scale.x * this.getLocalBounds().width;
            },
            set: function (t) {
              var e = this.getLocalBounds().width;
              (this.scale.x = 0 !== e ? t / e : 1), (this._width = t);
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, "height", {
            get: function () {
              return this.scale.y * this.getLocalBounds().height;
            },
            set: function (t) {
              var e = this.getLocalBounds().height;
              (this.scale.y = 0 !== e ? t / e : 1), (this._height = t);
            },
            enumerable: !1,
            configurable: !0,
          }),
          e
        );
      })(u);
      d.prototype.containerUpdateTransform = d.prototype.updateTransform;
    },
    4587: (t, e, r) => {
      r.d(e, { Q: () => a });
      var i = r(5323),
        n = r(4295),
        o = r(5307),
        s = new n.Ae(),
        a = (function () {
          function t(t) {
            (this.renderer = t), (t.extract = this);
          }
          return (
            (t.prototype.image = function (t, e, r) {
              var i = new Image();
              return (i.src = this.base64(t, e, r)), i;
            }),
            (t.prototype.base64 = function (t, e, r) {
              return this.canvas(t).toDataURL(e, r);
            }),
            (t.prototype.canvas = function (e) {
              var r,
                n,
                a,
                h = this.renderer,
                u = !1,
                l = !1;
              e &&
                (e instanceof o.TI
                  ? (a = e)
                  : ((a = this.renderer.generateTexture(e)), (l = !0))),
                a
                  ? ((r = a.baseTexture.resolution),
                    (n = a.frame),
                    (u = !1),
                    h.renderTexture.bind(a))
                  : ((r = this.renderer.resolution),
                    (u = !0),
                    ((n = s).width = this.renderer.width),
                    (n.height = this.renderer.height),
                    h.renderTexture.bind(null));
              var c = Math.floor(n.width * r + 1e-4),
                d = Math.floor(n.height * r + 1e-4),
                p = new i.CanvasRenderTarget(c, d, 1),
                f = new Uint8Array(4 * c * d),
                m = h.gl;
              m.readPixels(n.x * r, n.y * r, c, d, m.RGBA, m.UNSIGNED_BYTE, f);
              var v = p.context.getImageData(0, 0, c, d);
              if (
                (t.arrayPostDivide(f, v.data),
                p.context.putImageData(v, 0, 0),
                u)
              ) {
                var y = new i.CanvasRenderTarget(p.width, p.height, 1);
                y.context.scale(1, -1),
                  y.context.drawImage(p.canvas, 0, -d),
                  p.destroy(),
                  (p = y);
              }
              return l && a.destroy(!0), p.canvas;
            }),
            (t.prototype.pixels = function (e) {
              var r,
                i,
                n,
                a = this.renderer,
                h = !1;
              e &&
                (e instanceof o.TI
                  ? (n = e)
                  : ((n = this.renderer.generateTexture(e)), (h = !0))),
                n
                  ? ((r = n.baseTexture.resolution),
                    (i = n.frame),
                    a.renderTexture.bind(n))
                  : ((r = a.resolution),
                    ((i = s).width = a.width),
                    (i.height = a.height),
                    a.renderTexture.bind(null));
              var u = i.width * r,
                l = i.height * r,
                c = new Uint8Array(4 * u * l),
                d = a.gl;
              return (
                d.readPixels(
                  i.x * r,
                  i.y * r,
                  u,
                  l,
                  d.RGBA,
                  d.UNSIGNED_BYTE,
                  c
                ),
                h && n.destroy(!0),
                t.arrayPostDivide(c, c),
                c
              );
            }),
            (t.prototype.destroy = function () {
              (this.renderer.extract = null), (this.renderer = null);
            }),
            (t.arrayPostDivide = function (t, e) {
              for (var r = 0; r < t.length; r += 4) {
                var i = (e[r + 3] = t[r + 3]);
                0 !== i
                  ? ((e[r] = Math.round(Math.min((255 * t[r]) / i, 255))),
                    (e[r + 1] = Math.round(
                      Math.min((255 * t[r + 1]) / i, 255)
                    )),
                    (e[r + 2] = Math.round(
                      Math.min((255 * t[r + 2]) / i, 255)
                    )))
                  : ((e[r] = t[r]),
                    (e[r + 1] = t[r + 1]),
                    (e[r + 2] = t[r + 2]));
              }
            }),
            t
          );
        })();
    },
    6131: (t, e, r) => {
      r.d(e, { U: () => o });
      var i = r(5307),
        n = function (t, e) {
          return (
            (n =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (t, e) {
                  t.__proto__ = e;
                }) ||
              function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
              }),
            n(t, e)
          );
        },
        o = (function (t) {
          function e(e) {
            void 0 === e && (e = 1);
            var r =
              t.call(
                this,
                i.kP,
                "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float uAlpha;\n\nvoid main(void)\n{\n   gl_FragColor = texture2D(uSampler, vTextureCoord) * uAlpha;\n}\n",
                { uAlpha: 1 }
              ) || this;
            return (r.alpha = e), r;
          }
          return (
            (function (t, e) {
              function r() {
                this.constructor = t;
              }
              n(t, e),
                (t.prototype =
                  null === e
                    ? Object.create(e)
                    : ((r.prototype = e.prototype), new r()));
            })(e, t),
            Object.defineProperty(e.prototype, "alpha", {
              get: function () {
                return this.uniforms.uAlpha;
              },
              set: function (t) {
                this.uniforms.uAlpha = t;
              },
              enumerable: !1,
              configurable: !0,
            }),
            e
          );
        })(i.wn);
    },
    4500: (t, e, r) => {
      r.d(e, { T: () => I, Y: () => S });
      var i = r(5307),
        n = r(1573),
        o = function (t, e) {
          return (
            (o =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (t, e) {
                  t.__proto__ = e;
                }) ||
              function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
              }),
            o(t, e)
          );
        };
      function s(t, e) {
        function r() {
          this.constructor = t;
        }
        o(t, e),
          (t.prototype =
            null === e
              ? Object.create(e)
              : ((r.prototype = e.prototype), new r()));
      }
      var a,
        h,
        u,
        l,
        c,
        d,
        p,
        f,
        m,
        v,
        y,
        g,
        _,
        b,
        x,
        T,
        E,
        w = {
          5: [0.153388, 0.221461, 0.250301],
          7: [0.071303, 0.131514, 0.189879, 0.214607],
          9: [0.028532, 0.067234, 0.124009, 0.179044, 0.20236],
          11: [0.0093, 0.028002, 0.065984, 0.121703, 0.175713, 0.198596],
          13: [
            0.002406, 0.009255, 0.027867, 0.065666, 0.121117, 0.174868,
            0.197641,
          ],
          15: [
            489e-6, 0.002403, 0.009246, 0.02784, 0.065602, 0.120999, 0.174697,
            0.197448,
          ],
        },
        A = [
          "varying vec2 vBlurTexCoords[%size%];",
          "uniform sampler2D uSampler;",
          "void main(void)",
          "{",
          "    gl_FragColor = vec4(0.0);",
          "    %blur%",
          "}",
        ].join("\n");
      !(function (t) {
        (t[(t.WEBGL_LEGACY = 0)] = "WEBGL_LEGACY"),
          (t[(t.WEBGL = 1)] = "WEBGL"),
          (t[(t.WEBGL2 = 2)] = "WEBGL2");
      })(a || (a = {})),
        (function (t) {
          (t[(t.UNKNOWN = 0)] = "UNKNOWN"),
            (t[(t.WEBGL = 1)] = "WEBGL"),
            (t[(t.CANVAS = 2)] = "CANVAS");
        })(h || (h = {})),
        (function (t) {
          (t[(t.COLOR = 16384)] = "COLOR"),
            (t[(t.DEPTH = 256)] = "DEPTH"),
            (t[(t.STENCIL = 1024)] = "STENCIL");
        })(u || (u = {})),
        (function (t) {
          (t[(t.NORMAL = 0)] = "NORMAL"),
            (t[(t.ADD = 1)] = "ADD"),
            (t[(t.MULTIPLY = 2)] = "MULTIPLY"),
            (t[(t.SCREEN = 3)] = "SCREEN"),
            (t[(t.OVERLAY = 4)] = "OVERLAY"),
            (t[(t.DARKEN = 5)] = "DARKEN"),
            (t[(t.LIGHTEN = 6)] = "LIGHTEN"),
            (t[(t.COLOR_DODGE = 7)] = "COLOR_DODGE"),
            (t[(t.COLOR_BURN = 8)] = "COLOR_BURN"),
            (t[(t.HARD_LIGHT = 9)] = "HARD_LIGHT"),
            (t[(t.SOFT_LIGHT = 10)] = "SOFT_LIGHT"),
            (t[(t.DIFFERENCE = 11)] = "DIFFERENCE"),
            (t[(t.EXCLUSION = 12)] = "EXCLUSION"),
            (t[(t.HUE = 13)] = "HUE"),
            (t[(t.SATURATION = 14)] = "SATURATION"),
            (t[(t.COLOR = 15)] = "COLOR"),
            (t[(t.LUMINOSITY = 16)] = "LUMINOSITY"),
            (t[(t.NORMAL_NPM = 17)] = "NORMAL_NPM"),
            (t[(t.ADD_NPM = 18)] = "ADD_NPM"),
            (t[(t.SCREEN_NPM = 19)] = "SCREEN_NPM"),
            (t[(t.NONE = 20)] = "NONE"),
            (t[(t.SRC_OVER = 0)] = "SRC_OVER"),
            (t[(t.SRC_IN = 21)] = "SRC_IN"),
            (t[(t.SRC_OUT = 22)] = "SRC_OUT"),
            (t[(t.SRC_ATOP = 23)] = "SRC_ATOP"),
            (t[(t.DST_OVER = 24)] = "DST_OVER"),
            (t[(t.DST_IN = 25)] = "DST_IN"),
            (t[(t.DST_OUT = 26)] = "DST_OUT"),
            (t[(t.DST_ATOP = 27)] = "DST_ATOP"),
            (t[(t.ERASE = 26)] = "ERASE"),
            (t[(t.SUBTRACT = 28)] = "SUBTRACT"),
            (t[(t.XOR = 29)] = "XOR");
        })(l || (l = {})),
        (function (t) {
          (t[(t.POINTS = 0)] = "POINTS"),
            (t[(t.LINES = 1)] = "LINES"),
            (t[(t.LINE_LOOP = 2)] = "LINE_LOOP"),
            (t[(t.LINE_STRIP = 3)] = "LINE_STRIP"),
            (t[(t.TRIANGLES = 4)] = "TRIANGLES"),
            (t[(t.TRIANGLE_STRIP = 5)] = "TRIANGLE_STRIP"),
            (t[(t.TRIANGLE_FAN = 6)] = "TRIANGLE_FAN");
        })(c || (c = {})),
        (function (t) {
          (t[(t.RGBA = 6408)] = "RGBA"),
            (t[(t.RGB = 6407)] = "RGB"),
            (t[(t.ALPHA = 6406)] = "ALPHA"),
            (t[(t.LUMINANCE = 6409)] = "LUMINANCE"),
            (t[(t.LUMINANCE_ALPHA = 6410)] = "LUMINANCE_ALPHA"),
            (t[(t.DEPTH_COMPONENT = 6402)] = "DEPTH_COMPONENT"),
            (t[(t.DEPTH_STENCIL = 34041)] = "DEPTH_STENCIL");
        })(d || (d = {})),
        (function (t) {
          (t[(t.TEXTURE_2D = 3553)] = "TEXTURE_2D"),
            (t[(t.TEXTURE_CUBE_MAP = 34067)] = "TEXTURE_CUBE_MAP"),
            (t[(t.TEXTURE_2D_ARRAY = 35866)] = "TEXTURE_2D_ARRAY"),
            (t[(t.TEXTURE_CUBE_MAP_POSITIVE_X = 34069)] =
              "TEXTURE_CUBE_MAP_POSITIVE_X"),
            (t[(t.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070)] =
              "TEXTURE_CUBE_MAP_NEGATIVE_X"),
            (t[(t.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071)] =
              "TEXTURE_CUBE_MAP_POSITIVE_Y"),
            (t[(t.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072)] =
              "TEXTURE_CUBE_MAP_NEGATIVE_Y"),
            (t[(t.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073)] =
              "TEXTURE_CUBE_MAP_POSITIVE_Z"),
            (t[(t.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074)] =
              "TEXTURE_CUBE_MAP_NEGATIVE_Z");
        })(p || (p = {})),
        (function (t) {
          (t[(t.UNSIGNED_BYTE = 5121)] = "UNSIGNED_BYTE"),
            (t[(t.UNSIGNED_SHORT = 5123)] = "UNSIGNED_SHORT"),
            (t[(t.UNSIGNED_SHORT_5_6_5 = 33635)] = "UNSIGNED_SHORT_5_6_5"),
            (t[(t.UNSIGNED_SHORT_4_4_4_4 = 32819)] = "UNSIGNED_SHORT_4_4_4_4"),
            (t[(t.UNSIGNED_SHORT_5_5_5_1 = 32820)] = "UNSIGNED_SHORT_5_5_5_1"),
            (t[(t.FLOAT = 5126)] = "FLOAT"),
            (t[(t.HALF_FLOAT = 36193)] = "HALF_FLOAT");
        })(f || (f = {})),
        (function (t) {
          (t[(t.NEAREST = 0)] = "NEAREST"), (t[(t.LINEAR = 1)] = "LINEAR");
        })(m || (m = {})),
        (function (t) {
          (t[(t.CLAMP = 33071)] = "CLAMP"),
            (t[(t.REPEAT = 10497)] = "REPEAT"),
            (t[(t.MIRRORED_REPEAT = 33648)] = "MIRRORED_REPEAT");
        })(v || (v = {})),
        (function (t) {
          (t[(t.OFF = 0)] = "OFF"),
            (t[(t.POW2 = 1)] = "POW2"),
            (t[(t.ON = 2)] = "ON");
        })(y || (y = {})),
        (function (t) {
          (t[(t.NPM = 0)] = "NPM"),
            (t[(t.UNPACK = 1)] = "UNPACK"),
            (t[(t.PMA = 2)] = "PMA"),
            (t[(t.NO_PREMULTIPLIED_ALPHA = 0)] = "NO_PREMULTIPLIED_ALPHA"),
            (t[(t.PREMULTIPLY_ON_UPLOAD = 1)] = "PREMULTIPLY_ON_UPLOAD"),
            (t[(t.PREMULTIPLY_ALPHA = 2)] = "PREMULTIPLY_ALPHA");
        })(g || (g = {})),
        (function (t) {
          (t[(t.NO = 0)] = "NO"),
            (t[(t.YES = 1)] = "YES"),
            (t[(t.AUTO = 2)] = "AUTO"),
            (t[(t.BLEND = 0)] = "BLEND"),
            (t[(t.CLEAR = 1)] = "CLEAR"),
            (t[(t.BLIT = 2)] = "BLIT");
        })(_ || (_ = {})),
        (function (t) {
          (t[(t.AUTO = 0)] = "AUTO"), (t[(t.MANUAL = 1)] = "MANUAL");
        })(b || (b = {})),
        (function (t) {
          (t.LOW = "lowp"), (t.MEDIUM = "mediump"), (t.HIGH = "highp");
        })(x || (x = {})),
        (function (t) {
          (t[(t.NONE = 0)] = "NONE"),
            (t[(t.SCISSOR = 1)] = "SCISSOR"),
            (t[(t.STENCIL = 2)] = "STENCIL"),
            (t[(t.SPRITE = 3)] = "SPRITE");
        })(T || (T = {})),
        (function (t) {
          (t[(t.NONE = 0)] = "NONE"),
            (t[(t.LOW = 2)] = "LOW"),
            (t[(t.MEDIUM = 4)] = "MEDIUM"),
            (t[(t.HIGH = 8)] = "HIGH");
        })(E || (E = {}));
      var S = (function (t) {
          function e(e, r, i, o, s) {
            void 0 === r && (r = 8),
              void 0 === i && (i = 4),
              void 0 === o && (o = n.X.FILTER_RESOLUTION),
              void 0 === s && (s = 5);
            var a = this,
              h = (function (t, e) {
                var r,
                  i = Math.ceil(t / 2),
                  n =
                    "\n    attribute vec2 aVertexPosition;\n\n    uniform mat3 projectionMatrix;\n\n    uniform float strength;\n\n    varying vec2 vBlurTexCoords[%size%];\n\n    uniform vec4 inputSize;\n    uniform vec4 outputFrame;\n\n    vec4 filterVertexPosition( void )\n    {\n        vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n        return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n    }\n\n    vec2 filterTextureCoord( void )\n    {\n        return aVertexPosition * (outputFrame.zw * inputSize.zw);\n    }\n\n    void main(void)\n    {\n        gl_Position = filterVertexPosition();\n\n        vec2 textureCoord = filterTextureCoord();\n        %blur%\n    }",
                  o = "";
                r = e
                  ? "vBlurTexCoords[%index%] =  textureCoord + vec2(%sampleIndex% * strength, 0.0);"
                  : "vBlurTexCoords[%index%] =  textureCoord + vec2(0.0, %sampleIndex% * strength);";
                for (var s = 0; s < t; s++) {
                  var a = r.replace("%index%", s.toString());
                  (o += a = a.replace("%sampleIndex%", s - (i - 1) + ".0")),
                    (o += "\n");
                }
                return (n = n.replace("%blur%", o)).replace(
                  "%size%",
                  t.toString()
                );
              })(s, e),
              u = (function (t) {
                for (
                  var e, r = w[t], i = r.length, n = A, o = "", s = 0;
                  s < t;
                  s++
                ) {
                  var a =
                    "gl_FragColor += texture2D(uSampler, vBlurTexCoords[%index%]) * %value%;".replace(
                      "%index%",
                      s.toString()
                    );
                  (e = s),
                    s >= i && (e = t - s - 1),
                    (o += a = a.replace("%value%", r[e].toString())),
                    (o += "\n");
                }
                return (n = n.replace("%blur%", o)).replace(
                  "%size%",
                  t.toString()
                );
              })(s);
            return (
              ((a = t.call(this, h, u) || this).horizontal = e),
              (a.resolution = o),
              (a._quality = 0),
              (a.quality = i),
              (a.blur = r),
              a
            );
          }
          return (
            s(e, t),
            (e.prototype.apply = function (t, e, r, i) {
              if (
                (r
                  ? this.horizontal
                    ? (this.uniforms.strength =
                        (1 / r.width) * (r.width / e.width))
                    : (this.uniforms.strength =
                        (1 / r.height) * (r.height / e.height))
                  : this.horizontal
                  ? (this.uniforms.strength =
                      (1 / t.renderer.width) * (t.renderer.width / e.width))
                  : (this.uniforms.strength =
                      (1 / t.renderer.height) * (t.renderer.height / e.height)),
                (this.uniforms.strength *= this.strength),
                (this.uniforms.strength /= this.passes),
                1 === this.passes)
              )
                t.applyFilter(this, e, r, i);
              else {
                var n = t.getFilterTexture(),
                  o = t.renderer,
                  s = e,
                  a = n;
                (this.state.blend = !1), t.applyFilter(this, s, a, _.CLEAR);
                for (var h = 1; h < this.passes - 1; h++) {
                  t.bindAndClear(s, _.BLIT), (this.uniforms.uSampler = a);
                  var u = a;
                  (a = s), (s = u), o.shader.bind(this), o.geometry.draw(5);
                }
                (this.state.blend = !0),
                  t.applyFilter(this, a, r, i),
                  t.returnFilterTexture(n);
              }
            }),
            Object.defineProperty(e.prototype, "blur", {
              get: function () {
                return this.strength;
              },
              set: function (t) {
                (this.padding = 1 + 2 * Math.abs(t)), (this.strength = t);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "quality", {
              get: function () {
                return this._quality;
              },
              set: function (t) {
                (this._quality = t), (this.passes = t);
              },
              enumerable: !1,
              configurable: !0,
            }),
            e
          );
        })(i.wn),
        I = (function (t) {
          function e(e, r, i, o) {
            void 0 === e && (e = 8),
              void 0 === r && (r = 4),
              void 0 === i && (i = n.X.FILTER_RESOLUTION),
              void 0 === o && (o = 5);
            var s = t.call(this) || this;
            return (
              (s.blurXFilter = new S(!0, e, r, i, o)),
              (s.blurYFilter = new S(!1, e, r, i, o)),
              (s.resolution = i),
              (s.quality = r),
              (s.blur = e),
              (s.repeatEdgePixels = !1),
              s
            );
          }
          return (
            s(e, t),
            (e.prototype.apply = function (t, e, r, i) {
              var n = Math.abs(this.blurXFilter.strength),
                o = Math.abs(this.blurYFilter.strength);
              if (n && o) {
                var s = t.getFilterTexture();
                this.blurXFilter.apply(t, e, s, _.CLEAR),
                  this.blurYFilter.apply(t, s, r, i),
                  t.returnFilterTexture(s);
              } else
                o
                  ? this.blurYFilter.apply(t, e, r, i)
                  : this.blurXFilter.apply(t, e, r, i);
            }),
            (e.prototype.updatePadding = function () {
              this._repeatEdgePixels
                ? (this.padding = 0)
                : (this.padding =
                    2 *
                    Math.max(
                      Math.abs(this.blurXFilter.strength),
                      Math.abs(this.blurYFilter.strength)
                    ));
            }),
            Object.defineProperty(e.prototype, "blur", {
              get: function () {
                return this.blurXFilter.blur;
              },
              set: function (t) {
                (this.blurXFilter.blur = this.blurYFilter.blur = t),
                  this.updatePadding();
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "quality", {
              get: function () {
                return this.blurXFilter.quality;
              },
              set: function (t) {
                this.blurXFilter.quality = this.blurYFilter.quality = t;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "blurX", {
              get: function () {
                return this.blurXFilter.blur;
              },
              set: function (t) {
                (this.blurXFilter.blur = t), this.updatePadding();
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "blurY", {
              get: function () {
                return this.blurYFilter.blur;
              },
              set: function (t) {
                (this.blurYFilter.blur = t), this.updatePadding();
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "blendMode", {
              get: function () {
                return this.blurYFilter.blendMode;
              },
              set: function (t) {
                this.blurYFilter.blendMode = t;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "repeatEdgePixels", {
              get: function () {
                return this._repeatEdgePixels;
              },
              set: function (t) {
                (this._repeatEdgePixels = t), this.updatePadding();
              },
              enumerable: !1,
              configurable: !0,
            }),
            e
          );
        })(i.wn);
    },
    6242: (t, e, r) => {
      r.d(e, { m: () => o });
      var i = r(5307),
        n = function (t, e) {
          return (
            (n =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (t, e) {
                  t.__proto__ = e;
                }) ||
              function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
              }),
            n(t, e)
          );
        },
        o = (function (t) {
          function e() {
            var e = this,
              r = {
                m: new Float32Array([
                  1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
                ]),
                uAlpha: 1,
              };
            return (
              ((e =
                t.call(
                  this,
                  i.Y9,
                  "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float m[20];\nuniform float uAlpha;\n\nvoid main(void)\n{\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    if (uAlpha == 0.0) {\n        gl_FragColor = c;\n        return;\n    }\n\n    // Un-premultiply alpha before applying the color matrix. See issue #3539.\n    if (c.a > 0.0) {\n      c.rgb /= c.a;\n    }\n\n    vec4 result;\n\n    result.r = (m[0] * c.r);\n        result.r += (m[1] * c.g);\n        result.r += (m[2] * c.b);\n        result.r += (m[3] * c.a);\n        result.r += m[4];\n\n    result.g = (m[5] * c.r);\n        result.g += (m[6] * c.g);\n        result.g += (m[7] * c.b);\n        result.g += (m[8] * c.a);\n        result.g += m[9];\n\n    result.b = (m[10] * c.r);\n       result.b += (m[11] * c.g);\n       result.b += (m[12] * c.b);\n       result.b += (m[13] * c.a);\n       result.b += m[14];\n\n    result.a = (m[15] * c.r);\n       result.a += (m[16] * c.g);\n       result.a += (m[17] * c.b);\n       result.a += (m[18] * c.a);\n       result.a += m[19];\n\n    vec3 rgb = mix(c.rgb, result.rgb, uAlpha);\n\n    // Premultiply alpha again.\n    rgb *= result.a;\n\n    gl_FragColor = vec4(rgb, result.a);\n}\n",
                  r
                ) || this).alpha = 1),
              e
            );
          }
          return (
            (function (t, e) {
              function r() {
                this.constructor = t;
              }
              n(t, e),
                (t.prototype =
                  null === e
                    ? Object.create(e)
                    : ((r.prototype = e.prototype), new r()));
            })(e, t),
            (e.prototype._loadMatrix = function (t, e) {
              void 0 === e && (e = !1);
              var r = t;
              e &&
                (this._multiply(r, this.uniforms.m, t),
                (r = this._colorMatrix(r))),
                (this.uniforms.m = r);
            }),
            (e.prototype._multiply = function (t, e, r) {
              return (
                (t[0] =
                  e[0] * r[0] + e[1] * r[5] + e[2] * r[10] + e[3] * r[15]),
                (t[1] =
                  e[0] * r[1] + e[1] * r[6] + e[2] * r[11] + e[3] * r[16]),
                (t[2] =
                  e[0] * r[2] + e[1] * r[7] + e[2] * r[12] + e[3] * r[17]),
                (t[3] =
                  e[0] * r[3] + e[1] * r[8] + e[2] * r[13] + e[3] * r[18]),
                (t[4] =
                  e[0] * r[4] +
                  e[1] * r[9] +
                  e[2] * r[14] +
                  e[3] * r[19] +
                  e[4]),
                (t[5] =
                  e[5] * r[0] + e[6] * r[5] + e[7] * r[10] + e[8] * r[15]),
                (t[6] =
                  e[5] * r[1] + e[6] * r[6] + e[7] * r[11] + e[8] * r[16]),
                (t[7] =
                  e[5] * r[2] + e[6] * r[7] + e[7] * r[12] + e[8] * r[17]),
                (t[8] =
                  e[5] * r[3] + e[6] * r[8] + e[7] * r[13] + e[8] * r[18]),
                (t[9] =
                  e[5] * r[4] +
                  e[6] * r[9] +
                  e[7] * r[14] +
                  e[8] * r[19] +
                  e[9]),
                (t[10] =
                  e[10] * r[0] + e[11] * r[5] + e[12] * r[10] + e[13] * r[15]),
                (t[11] =
                  e[10] * r[1] + e[11] * r[6] + e[12] * r[11] + e[13] * r[16]),
                (t[12] =
                  e[10] * r[2] + e[11] * r[7] + e[12] * r[12] + e[13] * r[17]),
                (t[13] =
                  e[10] * r[3] + e[11] * r[8] + e[12] * r[13] + e[13] * r[18]),
                (t[14] =
                  e[10] * r[4] +
                  e[11] * r[9] +
                  e[12] * r[14] +
                  e[13] * r[19] +
                  e[14]),
                (t[15] =
                  e[15] * r[0] + e[16] * r[5] + e[17] * r[10] + e[18] * r[15]),
                (t[16] =
                  e[15] * r[1] + e[16] * r[6] + e[17] * r[11] + e[18] * r[16]),
                (t[17] =
                  e[15] * r[2] + e[16] * r[7] + e[17] * r[12] + e[18] * r[17]),
                (t[18] =
                  e[15] * r[3] + e[16] * r[8] + e[17] * r[13] + e[18] * r[18]),
                (t[19] =
                  e[15] * r[4] +
                  e[16] * r[9] +
                  e[17] * r[14] +
                  e[18] * r[19] +
                  e[19]),
                t
              );
            }),
            (e.prototype._colorMatrix = function (t) {
              var e = new Float32Array(t);
              return (
                (e[4] /= 255), (e[9] /= 255), (e[14] /= 255), (e[19] /= 255), e
              );
            }),
            (e.prototype.brightness = function (t, e) {
              var r = [
                t,
                0,
                0,
                0,
                0,
                0,
                t,
                0,
                0,
                0,
                0,
                0,
                t,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
              ];
              this._loadMatrix(r, e);
            }),
            (e.prototype.greyscale = function (t, e) {
              var r = [
                t,
                t,
                t,
                0,
                0,
                t,
                t,
                t,
                0,
                0,
                t,
                t,
                t,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
              ];
              this._loadMatrix(r, e);
            }),
            (e.prototype.blackAndWhite = function (t) {
              this._loadMatrix(
                [
                  0.3, 0.6, 0.1, 0, 0, 0.3, 0.6, 0.1, 0, 0, 0.3, 0.6, 0.1, 0, 0,
                  0, 0, 0, 1, 0,
                ],
                t
              );
            }),
            (e.prototype.hue = function (t, e) {
              t = ((t || 0) / 180) * Math.PI;
              var r = Math.cos(t),
                i = Math.sin(t),
                n = 1 / 3,
                o = (0, Math.sqrt)(n),
                s = [
                  r + (1 - r) * n,
                  n * (1 - r) - o * i,
                  n * (1 - r) + o * i,
                  0,
                  0,
                  n * (1 - r) + o * i,
                  r + n * (1 - r),
                  n * (1 - r) - o * i,
                  0,
                  0,
                  n * (1 - r) - o * i,
                  n * (1 - r) + o * i,
                  r + n * (1 - r),
                  0,
                  0,
                  0,
                  0,
                  0,
                  1,
                  0,
                ];
              this._loadMatrix(s, e);
            }),
            (e.prototype.contrast = function (t, e) {
              var r = (t || 0) + 1,
                i = -0.5 * (r - 1),
                n = [
                  r,
                  0,
                  0,
                  0,
                  i,
                  0,
                  r,
                  0,
                  0,
                  i,
                  0,
                  0,
                  r,
                  0,
                  i,
                  0,
                  0,
                  0,
                  1,
                  0,
                ];
              this._loadMatrix(n, e);
            }),
            (e.prototype.saturate = function (t, e) {
              void 0 === t && (t = 0);
              var r = (2 * t) / 3 + 1,
                i = -0.5 * (r - 1),
                n = [
                  r,
                  i,
                  i,
                  0,
                  0,
                  i,
                  r,
                  i,
                  0,
                  0,
                  i,
                  i,
                  r,
                  0,
                  0,
                  0,
                  0,
                  0,
                  1,
                  0,
                ];
              this._loadMatrix(n, e);
            }),
            (e.prototype.desaturate = function () {
              this.saturate(-1);
            }),
            (e.prototype.negative = function (t) {
              this._loadMatrix(
                [-1, 0, 0, 1, 0, 0, -1, 0, 1, 0, 0, 0, -1, 1, 0, 0, 0, 0, 1, 0],
                t
              );
            }),
            (e.prototype.sepia = function (t) {
              this._loadMatrix(
                [
                  0.393, 0.7689999, 0.18899999, 0, 0, 0.349, 0.6859999,
                  0.16799999, 0, 0, 0.272, 0.5339999, 0.13099999, 0, 0, 0, 0, 0,
                  1, 0,
                ],
                t
              );
            }),
            (e.prototype.technicolor = function (t) {
              this._loadMatrix(
                [
                  1.9125277891456083, -0.8545344976951645, -0.09155508482755585,
                  0, 11.793603434377337, -0.3087833385928097,
                  1.7658908555458428, -0.10601743074722245, 0,
                  -70.35205161461398, -0.231103377548616, -0.7501899197440212,
                  1.847597816108189, 0, 30.950940869491138, 0, 0, 0, 1, 0,
                ],
                t
              );
            }),
            (e.prototype.polaroid = function (t) {
              this._loadMatrix(
                [
                  1.438, -0.062, -0.062, 0, 0, -0.122, 1.378, -0.122, 0, 0,
                  -0.016, -0.016, 1.483, 0, 0, 0, 0, 0, 1, 0,
                ],
                t
              );
            }),
            (e.prototype.toBGR = function (t) {
              this._loadMatrix(
                [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                t
              );
            }),
            (e.prototype.kodachrome = function (t) {
              this._loadMatrix(
                [
                  1.1285582396593525, -0.3967382283601348, -0.03992559172921793,
                  0, 63.72958762196502, -0.16404339962244616,
                  1.0835251566291304, -0.05498805115633132, 0,
                  24.732407896706203, -0.16786010706155763, -0.5603416277695248,
                  1.6014850761964943, 0, 35.62982807460946, 0, 0, 0, 1, 0,
                ],
                t
              );
            }),
            (e.prototype.browni = function (t) {
              this._loadMatrix(
                [
                  0.5997023498159715, 0.34553243048391263, -0.2708298674538042,
                  0, 47.43192855600873, -0.037703249837783157,
                  0.8609577587992641, 0.15059552388459913, 0,
                  -36.96841498319127, 0.24113635128153335, -0.07441037908422492,
                  0.44972182064877153, 0, -7.562075277591283, 0, 0, 0, 1, 0,
                ],
                t
              );
            }),
            (e.prototype.vintage = function (t) {
              this._loadMatrix(
                [
                  0.6279345635605994, 0.3202183420819367, -0.03965408211312453,
                  0, 9.651285835294123, 0.02578397704808868, 0.6441188644374771,
                  0.03259127616149294, 0, 7.462829176470591, 0.0466055556782719,
                  -0.0851232987247891, 0.5241648018700465, 0, 5.159190588235296,
                  0, 0, 0, 1, 0,
                ],
                t
              );
            }),
            (e.prototype.colorTone = function (t, e, r, i, n) {
              var o = (((r = r || 16770432) >> 16) & 255) / 255,
                s = ((r >> 8) & 255) / 255,
                a = (255 & r) / 255,
                h = (((i = i || 3375104) >> 16) & 255) / 255,
                u = ((i >> 8) & 255) / 255,
                l = (255 & i) / 255,
                c = [
                  0.3,
                  0.59,
                  0.11,
                  0,
                  0,
                  o,
                  s,
                  a,
                  (t = t || 0.2),
                  0,
                  h,
                  u,
                  l,
                  (e = e || 0.15),
                  0,
                  o - h,
                  s - u,
                  a - l,
                  0,
                  0,
                ];
              this._loadMatrix(c, n);
            }),
            (e.prototype.night = function (t, e) {
              var r = [
                -2 * (t = t || 0.1),
                -t,
                0,
                0,
                0,
                -t,
                0,
                t,
                0,
                0,
                0,
                t,
                2 * t,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
              ];
              this._loadMatrix(r, e);
            }),
            (e.prototype.predator = function (t, e) {
              var r = [
                11.224130630493164 * t,
                -4.794486999511719 * t,
                -2.8746118545532227 * t,
                0 * t,
                0.40342438220977783 * t,
                -3.6330697536468506 * t,
                9.193157196044922 * t,
                -2.951810836791992 * t,
                0 * t,
                -1.316135048866272 * t,
                -3.2184197902679443 * t,
                -4.2375030517578125 * t,
                7.476448059082031 * t,
                0 * t,
                0.8044459223747253 * t,
                0,
                0,
                0,
                1,
                0,
              ];
              this._loadMatrix(r, e);
            }),
            (e.prototype.lsd = function (t) {
              this._loadMatrix(
                [
                  2, -0.4, 0.5, 0, 0, -0.5, 2, -0.4, 0, 0, -0.4, -0.5, 3, 0, 0,
                  0, 0, 0, 1, 0,
                ],
                t
              );
            }),
            (e.prototype.reset = function () {
              this._loadMatrix(
                [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
                !1
              );
            }),
            Object.defineProperty(e.prototype, "matrix", {
              get: function () {
                return this.uniforms.m;
              },
              set: function (t) {
                this.uniforms.m = t;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "alpha", {
              get: function () {
                return this.uniforms.uAlpha;
              },
              set: function (t) {
                this.uniforms.uAlpha = t;
              },
              enumerable: !1,
              configurable: !0,
            }),
            e
          );
        })(i.wn);
      o.prototype.grayscale = o.prototype.greyscale;
    },
    9617: (t, e, r) => {
      r.d(e, { p: () => s });
      var i = r(5307),
        n = r(4295),
        o = function (t, e) {
          return (
            (o =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (t, e) {
                  t.__proto__ = e;
                }) ||
              function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
              }),
            o(t, e)
          );
        },
        s = (function (t) {
          function e(e, r) {
            var i = this,
              o = new n.y3();
            return (
              (e.renderable = !1),
              ((i =
                t.call(
                  this,
                  "attribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\nuniform mat3 filterMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vFilterCoord;\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord( void )\n{\n    return aVertexPosition * (outputFrame.zw * inputSize.zw);\n}\n\nvoid main(void)\n{\n\tgl_Position = filterVertexPosition();\n\tvTextureCoord = filterTextureCoord();\n\tvFilterCoord = ( filterMatrix * vec3( vTextureCoord, 1.0)  ).xy;\n}\n",
                  "varying vec2 vFilterCoord;\nvarying vec2 vTextureCoord;\n\nuniform vec2 scale;\nuniform mat2 rotation;\nuniform sampler2D uSampler;\nuniform sampler2D mapSampler;\n\nuniform highp vec4 inputSize;\nuniform vec4 inputClamp;\n\nvoid main(void)\n{\n  vec4 map =  texture2D(mapSampler, vFilterCoord);\n\n  map -= 0.5;\n  map.xy = scale * inputSize.zw * (rotation * map.xy);\n\n  gl_FragColor = texture2D(uSampler, clamp(vec2(vTextureCoord.x + map.x, vTextureCoord.y + map.y), inputClamp.xy, inputClamp.zw));\n}\n",
                  {
                    mapSampler: e._texture,
                    filterMatrix: o,
                    scale: { x: 1, y: 1 },
                    rotation: new Float32Array([1, 0, 0, 1]),
                  }
                ) || this).maskSprite = e),
              (i.maskMatrix = o),
              null == r && (r = 20),
              (i.scale = new n.E9(r, r)),
              i
            );
          }
          return (
            (function (t, e) {
              function r() {
                this.constructor = t;
              }
              o(t, e),
                (t.prototype =
                  null === e
                    ? Object.create(e)
                    : ((r.prototype = e.prototype), new r()));
            })(e, t),
            (e.prototype.apply = function (t, e, r, i) {
              (this.uniforms.filterMatrix = t.calculateSpriteMatrix(
                this.maskMatrix,
                this.maskSprite
              )),
                (this.uniforms.scale.x = this.scale.x),
                (this.uniforms.scale.y = this.scale.y);
              var n = this.maskSprite.worldTransform,
                o = Math.sqrt(n.a * n.a + n.b * n.b),
                s = Math.sqrt(n.c * n.c + n.d * n.d);
              0 !== o &&
                0 !== s &&
                ((this.uniforms.rotation[0] = n.a / o),
                (this.uniforms.rotation[1] = n.b / o),
                (this.uniforms.rotation[2] = n.c / s),
                (this.uniforms.rotation[3] = n.d / s)),
                t.applyFilter(this, e, r, i);
            }),
            Object.defineProperty(e.prototype, "map", {
              get: function () {
                return this.uniforms.mapSampler;
              },
              set: function (t) {
                this.uniforms.mapSampler = t;
              },
              enumerable: !1,
              configurable: !0,
            }),
            e
          );
        })(i.wn);
    },
    9716: (t, e, r) => {
      r.d(e, { b: () => o });
      var i = r(5307),
        n = function (t, e) {
          return (
            (n =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (t, e) {
                  t.__proto__ = e;
                }) ||
              function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
              }),
            n(t, e)
          );
        },
        o = (function (t) {
          function e() {
            return (
              t.call(
                this,
                "\nattribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nvarying vec2 vFragCoord;\n\nuniform vec4 inputPixel;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvoid texcoords(vec2 fragCoord, vec2 inverseVP,\n               out vec2 v_rgbNW, out vec2 v_rgbNE,\n               out vec2 v_rgbSW, out vec2 v_rgbSE,\n               out vec2 v_rgbM) {\n    v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\n    v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\n    v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\n    v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\n    v_rgbM = vec2(fragCoord * inverseVP);\n}\n\nvoid main(void) {\n\n   gl_Position = filterVertexPosition();\n\n   vFragCoord = aVertexPosition * outputFrame.zw;\n\n   texcoords(vFragCoord, inputPixel.zw, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n}\n",
                'varying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nvarying vec2 vFragCoord;\nuniform sampler2D uSampler;\nuniform highp vec4 inputPixel;\n\n\n/**\n Basic FXAA implementation based on the code on geeks3d.com with the\n modification that the texture2DLod stuff was removed since it\'s\n unsupported by WebGL.\n\n --\n\n From:\n https://github.com/mitsuhiko/webgl-meincraft\n\n Copyright (c) 2011 by Armin Ronacher.\n\n Some rights reserved.\n\n Redistribution and use in source and binary forms, with or without\n modification, are permitted provided that the following conditions are\n met:\n\n * Redistributions of source code must retain the above copyright\n notice, this list of conditions and the following disclaimer.\n\n * Redistributions in binary form must reproduce the above\n copyright notice, this list of conditions and the following\n disclaimer in the documentation and/or other materials provided\n with the distribution.\n\n * The names of the contributors may not be used to endorse or\n promote products derived from this software without specific\n prior written permission.\n\n THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\n LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\n A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\n OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\n SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\n LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\n DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\n THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\n OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n */\n\n#ifndef FXAA_REDUCE_MIN\n#define FXAA_REDUCE_MIN   (1.0/ 128.0)\n#endif\n#ifndef FXAA_REDUCE_MUL\n#define FXAA_REDUCE_MUL   (1.0 / 8.0)\n#endif\n#ifndef FXAA_SPAN_MAX\n#define FXAA_SPAN_MAX     8.0\n#endif\n\n//optimized version for mobile, where dependent\n//texture reads can be a bottleneck\nvec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 inverseVP,\n          vec2 v_rgbNW, vec2 v_rgbNE,\n          vec2 v_rgbSW, vec2 v_rgbSE,\n          vec2 v_rgbM) {\n    vec4 color;\n    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\n    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\n    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\n    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\n    vec4 texColor = texture2D(tex, v_rgbM);\n    vec3 rgbM  = texColor.xyz;\n    vec3 luma = vec3(0.299, 0.587, 0.114);\n    float lumaNW = dot(rgbNW, luma);\n    float lumaNE = dot(rgbNE, luma);\n    float lumaSW = dot(rgbSW, luma);\n    float lumaSE = dot(rgbSE, luma);\n    float lumaM  = dot(rgbM,  luma);\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n\n    mediump vec2 dir;\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n\n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\n                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n\n    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n                  dir * rcpDirMin)) * inverseVP;\n\n    vec3 rgbA = 0.5 * (\n                       texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\n                       texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n    vec3 rgbB = rgbA * 0.5 + 0.25 * (\n                                     texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\n                                     texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n\n    float lumaB = dot(rgbB, luma);\n    if ((lumaB < lumaMin) || (lumaB > lumaMax))\n        color = vec4(rgbA, texColor.a);\n    else\n        color = vec4(rgbB, texColor.a);\n    return color;\n}\n\nvoid main() {\n\n      vec4 color;\n\n      color = fxaa(uSampler, vFragCoord, inputPixel.zw, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n\n      gl_FragColor = color;\n}\n'
              ) || this
            );
          }
          return (
            (function (t, e) {
              function r() {
                this.constructor = t;
              }
              n(t, e),
                (t.prototype =
                  null === e
                    ? Object.create(e)
                    : ((r.prototype = e.prototype), new r()));
            })(e, t),
            e
          );
        })(i.wn);
    },
    3267: (t, e, r) => {
      r.d(e, { L: () => o });
      var i = r(5307),
        n = function (t, e) {
          return (
            (n =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (t, e) {
                  t.__proto__ = e;
                }) ||
              function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
              }),
            n(t, e)
          );
        },
        o = (function (t) {
          function e(e, r) {
            void 0 === e && (e = 0.5), void 0 === r && (r = Math.random());
            var n =
              t.call(
                this,
                i.Y9,
                "precision highp float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform float uNoise;\nuniform float uSeed;\nuniform sampler2D uSampler;\n\nfloat rand(vec2 co)\n{\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main()\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    float randomValue = rand(gl_FragCoord.xy * uSeed);\n    float diff = (randomValue - 0.5) * uNoise;\n\n    // Un-premultiply alpha before applying the color matrix. See issue #3539.\n    if (color.a > 0.0) {\n        color.rgb /= color.a;\n    }\n\n    color.r += diff;\n    color.g += diff;\n    color.b += diff;\n\n    // Premultiply alpha again.\n    color.rgb *= color.a;\n\n    gl_FragColor = color;\n}\n",
                { uNoise: 0, uSeed: 0 }
              ) || this;
            return (n.noise = e), (n.seed = r), n;
          }
          return (
            (function (t, e) {
              function r() {
                this.constructor = t;
              }
              n(t, e),
                (t.prototype =
                  null === e
                    ? Object.create(e)
                    : ((r.prototype = e.prototype), new r()));
            })(e, t),
            Object.defineProperty(e.prototype, "noise", {
              get: function () {
                return this.uniforms.uNoise;
              },
              set: function (t) {
                this.uniforms.uNoise = t;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "seed", {
              get: function () {
                return this.uniforms.uSeed;
              },
              set: function (t) {
                this.uniforms.uSeed = t;
              },
              enumerable: !1,
              configurable: !0,
            }),
            e
          );
        })(i.wn);
    },
    426: (t, e, r) => {
      r.d(e, {
        $o: () => n,
        RB: () => F,
        S: () => i,
        TC: () => j,
        TD: () => U,
        ft: () => c,
        iM: () => R,
        wA: () => l,
        yR: () => D,
      });
      var i,
        n,
        o = r(5307),
        s = r(4295),
        a = r(5323),
        h = r(7054),
        u = r(29);
      !(function (t) {
        (t.MITER = "miter"), (t.BEVEL = "bevel"), (t.ROUND = "round");
      })(i || (i = {})),
        (function (t) {
          (t.BUTT = "butt"), (t.ROUND = "round"), (t.SQUARE = "square");
        })(n || (n = {}));
      var l = {
          adaptive: !0,
          maxLength: 10,
          minSegments: 8,
          maxSegments: 2048,
          epsilon: 1e-4,
          _segmentsCount: function (t, e) {
            if ((void 0 === e && (e = 20), !this.adaptive || !t || isNaN(t)))
              return e;
            var r = Math.ceil(t / this.maxLength);
            return (
              r < this.minSegments
                ? (r = this.minSegments)
                : r > this.maxSegments && (r = this.maxSegments),
              r
            );
          },
        },
        c = (function () {
          function t() {
            (this.color = 16777215),
              (this.alpha = 1),
              (this.texture = o.xE.WHITE),
              (this.matrix = null),
              (this.visible = !1),
              this.reset();
          }
          return (
            (t.prototype.clone = function () {
              var e = new t();
              return (
                (e.color = this.color),
                (e.alpha = this.alpha),
                (e.texture = this.texture),
                (e.matrix = this.matrix),
                (e.visible = this.visible),
                e
              );
            }),
            (t.prototype.reset = function () {
              (this.color = 16777215),
                (this.alpha = 1),
                (this.texture = o.xE.WHITE),
                (this.matrix = null),
                (this.visible = !1);
            }),
            (t.prototype.destroy = function () {
              (this.texture = null), (this.matrix = null);
            }),
            t
          );
        })(),
        d = function (t, e) {
          return (
            (d =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (t, e) {
                  t.__proto__ = e;
                }) ||
              function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
              }),
            d(t, e)
          );
        };
      function p(t, e) {
        function r() {
          this.constructor = t;
        }
        d(t, e),
          (t.prototype =
            null === e
              ? Object.create(e)
              : ((r.prototype = e.prototype), new r()));
      }
      var f = {
          build: function (t) {
            t.points = t.shape.points.slice();
          },
          triangulate: function (t, e) {
            var r = t.points,
              i = t.holes,
              n = e.points,
              o = e.indices;
            if (r.length >= 6) {
              for (var s = [], h = 0; h < i.length; h++) {
                var u = i[h];
                s.push(r.length / 2), (r = r.concat(u.points));
              }
              var l = (0, a.earcut)(r, s, 2);
              if (!l) return;
              var c = n.length / 2;
              for (h = 0; h < l.length; h += 3)
                o.push(l[h] + c), o.push(l[h + 1] + c), o.push(l[h + 2] + c);
              for (h = 0; h < r.length; h++) n.push(r[h]);
            }
          },
        },
        m = {
          build: function (t) {
            var e,
              r,
              i = t.shape,
              n = t.points,
              o = i.x,
              a = i.y;
            if (((n.length = 0), t.type === s.HS.CIRC))
              (e = i.radius), (r = i.radius);
            else {
              var h = t.shape;
              (e = h.width), (r = h.height);
            }
            if (0 !== e && 0 !== r) {
              var u =
                Math.floor(30 * Math.sqrt(i.radius)) ||
                Math.floor(15 * Math.sqrt(e + r));
              u /= 2.3;
              for (var l = (2 * Math.PI) / u, c = 0; c < u - 0.5; c++)
                n.push(o + Math.sin(-l * c) * e, a + Math.cos(-l * c) * r);
              n.push(n[0], n[1]);
            }
          },
          triangulate: function (t, e) {
            var r = t.points,
              i = e.points,
              n = e.indices,
              o = i.length / 2,
              s = o,
              a = t.shape,
              h = t.matrix,
              u = a.x,
              l = a.y;
            i.push(
              t.matrix ? h.a * u + h.c * l + h.tx : u,
              t.matrix ? h.b * u + h.d * l + h.ty : l
            );
            for (var c = 0; c < r.length; c += 2)
              i.push(r[c], r[c + 1]), n.push(o++, s, o);
          },
        },
        v = {
          build: function (t) {
            var e = t.shape,
              r = e.x,
              i = e.y,
              n = e.width,
              o = e.height,
              s = t.points;
            (s.length = 0), s.push(r, i, r + n, i, r + n, i + o, r, i + o);
          },
          triangulate: function (t, e) {
            var r = t.points,
              i = e.points,
              n = i.length / 2;
            i.push(r[0], r[1], r[2], r[3], r[6], r[7], r[4], r[5]),
              e.indices.push(n, n + 1, n + 2, n + 1, n + 2, n + 3);
          },
        };
      function y(t, e, r) {
        return t + (e - t) * r;
      }
      function g(t, e, r, i, n, o, s) {
        void 0 === s && (s = []);
        for (
          var a = s, h = 0, u = 0, l = 0, c = 0, d = 0, p = 0, f = 0, m = 0;
          f <= 20;
          ++f
        )
          (h = y(t, r, (m = f / 20))),
            (u = y(e, i, m)),
            (l = y(r, n, m)),
            (c = y(i, o, m)),
            (d = y(h, l, m)),
            (p = y(u, c, m)),
            a.push(d, p);
        return a;
      }
      var _ = {
        build: function (t) {
          var e = t.shape,
            r = t.points,
            i = e.x,
            n = e.y,
            o = e.width,
            s = e.height,
            a = Math.max(0, Math.min(e.radius, Math.min(o, s) / 2));
          (r.length = 0),
            a
              ? (g(i, n + a, i, n, i + a, n, r),
                g(i + o - a, n, i + o, n, i + o, n + a, r),
                g(i + o, n + s - a, i + o, n + s, i + o - a, n + s, r),
                g(i + a, n + s, i, n + s, i, n + s - a, r))
              : r.push(i, n, i + o, n, i + o, n + s, i, n + s);
        },
        triangulate: function (t, e) {
          for (
            var r = t.points,
              i = e.points,
              n = e.indices,
              o = i.length / 2,
              s = (0, a.earcut)(r, null, 2),
              h = 0,
              u = s.length;
            h < u;
            h += 3
          )
            n.push(s[h] + o), n.push(s[h + 1] + o), n.push(s[h + 2] + o);
          for (h = 0, u = r.length; h < u; h++) i.push(r[h], r[++h]);
        },
      };
      function b(t, e, r, i, n, o, s, a) {
        var h, u;
        s ? ((h = i), (u = -r)) : ((h = -i), (u = r));
        var l = t - r * n + h,
          c = e - i * n + u,
          d = t + r * o + h,
          p = e + i * o + u;
        return a.push(l, c), a.push(d, p), 2;
      }
      function x(t, e, r, i, n, o, s, a) {
        var h = r - t,
          u = i - e,
          l = Math.atan2(h, u),
          c = Math.atan2(n - t, o - e);
        a && l < c ? (l += 2 * Math.PI) : !a && l > c && (c += 2 * Math.PI);
        var d = l,
          p = c - l,
          f = Math.abs(p),
          m = Math.sqrt(h * h + u * u),
          v = 1 + (((15 * f * Math.sqrt(m)) / Math.PI) >> 0),
          y = p / v;
        if (((d += y), a)) {
          s.push(t, e), s.push(r, i);
          for (var g = 1, _ = d; g < v; g++, _ += y)
            s.push(t, e), s.push(t + Math.sin(_) * m, e + Math.cos(_) * m);
          s.push(t, e), s.push(n, o);
        } else {
          for (s.push(r, i), s.push(t, e), g = 1, _ = d; g < v; g++, _ += y)
            s.push(t + Math.sin(_) * m, e + Math.cos(_) * m), s.push(t, e);
          s.push(n, o), s.push(t, e);
        }
        return 2 * v;
      }
      function T(t, e) {
        t.lineStyle.native
          ? (function (t, e) {
              var r = 0,
                i = t.shape,
                n = t.points || i.points,
                o = i.type !== s.HS.POLY || i.closeStroke;
              if (0 !== n.length) {
                var a = e.points,
                  h = e.indices,
                  u = n.length / 2,
                  l = a.length / 2,
                  c = l;
                for (a.push(n[0], n[1]), r = 1; r < u; r++)
                  a.push(n[2 * r], n[2 * r + 1]), h.push(c, c + 1), c++;
                o && h.push(c, l);
              }
            })(t, e)
          : (function (t, e) {
              var r = t.shape,
                o = t.points || r.points.slice(),
                a = e.closePointEps;
              if (0 !== o.length) {
                var h = t.lineStyle,
                  u = new s.E9(o[0], o[1]),
                  c = new s.E9(o[o.length - 2], o[o.length - 1]),
                  d = r.type !== s.HS.POLY || r.closeStroke,
                  p = Math.abs(u.x - c.x) < a && Math.abs(u.y - c.y) < a;
                if (d) {
                  (o = o.slice()),
                    p &&
                      (o.pop(),
                      o.pop(),
                      c.set(o[o.length - 2], o[o.length - 1]));
                  var f = 0.5 * (u.x + c.x),
                    m = 0.5 * (c.y + u.y);
                  o.unshift(f, m), o.push(f, m);
                }
                var v = e.points,
                  y = o.length / 2,
                  g = o.length,
                  _ = v.length / 2,
                  T = h.width / 2,
                  E = T * T,
                  w = h.miterLimit * h.miterLimit,
                  A = o[0],
                  S = o[1],
                  I = o[2],
                  P = o[3],
                  O = 0,
                  C = 0,
                  M = -(S - P),
                  D = A - I,
                  R = 0,
                  N = 0,
                  L = Math.sqrt(M * M + D * D);
                (M /= L), (D /= L), (M *= T), (D *= T);
                var F = h.alignment,
                  U = 2 * (1 - F),
                  B = 2 * F;
                d ||
                  (h.cap === n.ROUND
                    ? (g +=
                        x(
                          A - M * (U - B) * 0.5,
                          S - D * (U - B) * 0.5,
                          A - M * U,
                          S - D * U,
                          A + M * B,
                          S + D * B,
                          v,
                          !0
                        ) + 2)
                    : h.cap === n.SQUARE && (g += b(A, S, M, D, U, B, !0, v))),
                  v.push(A - M * U, S - D * U),
                  v.push(A + M * B, S + D * B);
                for (var k = 1; k < y - 1; ++k) {
                  (A = o[2 * (k - 1)]),
                    (S = o[2 * (k - 1) + 1]),
                    (I = o[2 * k]),
                    (P = o[2 * k + 1]),
                    (O = o[2 * (k + 1)]),
                    (C = o[2 * (k + 1) + 1]),
                    (M = -(S - P)),
                    (D = A - I),
                    (M /= L = Math.sqrt(M * M + D * D)),
                    (D /= L),
                    (M *= T),
                    (D *= T),
                    (R = -(P - C)),
                    (N = I - O),
                    (R /= L = Math.sqrt(R * R + N * N)),
                    (N /= L),
                    (R *= T),
                    (N *= T);
                  var j = I - A,
                    H = S - P,
                    X = I - O,
                    G = C - P,
                    z = H * X - G * j,
                    V = z < 0;
                  if (Math.abs(z) < 0.1)
                    v.push(I - M * U, P - D * U), v.push(I + M * B, P + D * B);
                  else {
                    var W = (-M + A) * (-D + P) - (-M + I) * (-D + S),
                      Y = (-R + O) * (-N + P) - (-R + I) * (-N + C),
                      q = (j * Y - X * W) / z,
                      K = (G * W - H * Y) / z,
                      $ = (q - I) * (q - I) + (K - P) * (K - P),
                      Z = I + (q - I) * U,
                      J = P + (K - P) * U,
                      Q = I - (q - I) * B,
                      tt = P - (K - P) * B,
                      et = V ? U : B;
                    $ <= Math.min(j * j + H * H, X * X + G * G) + et * et * E
                      ? h.join === i.BEVEL || $ / E > w
                        ? (V
                            ? (v.push(Z, J),
                              v.push(I + M * B, P + D * B),
                              v.push(Z, J),
                              v.push(I + R * B, P + N * B))
                            : (v.push(I - M * U, P - D * U),
                              v.push(Q, tt),
                              v.push(I - R * U, P - N * U),
                              v.push(Q, tt)),
                          (g += 2))
                        : h.join === i.ROUND
                        ? V
                          ? (v.push(Z, J),
                            v.push(I + M * B, P + D * B),
                            (g +=
                              x(
                                I,
                                P,
                                I + M * B,
                                P + D * B,
                                I + R * B,
                                P + N * B,
                                v,
                                !0
                              ) + 4),
                            v.push(Z, J),
                            v.push(I + R * B, P + N * B))
                          : (v.push(I - M * U, P - D * U),
                            v.push(Q, tt),
                            (g +=
                              x(
                                I,
                                P,
                                I - M * U,
                                P - D * U,
                                I - R * U,
                                P - N * U,
                                v,
                                !1
                              ) + 4),
                            v.push(I - R * U, P - N * U),
                            v.push(Q, tt))
                        : (v.push(Z, J), v.push(Q, tt))
                      : (v.push(I - M * U, P - D * U),
                        v.push(I + M * B, P + D * B),
                        h.join === i.BEVEL ||
                          $ / E > w ||
                          (h.join === i.ROUND
                            ? (g += V
                                ? x(
                                    I,
                                    P,
                                    I + M * B,
                                    P + D * B,
                                    I + R * B,
                                    P + N * B,
                                    v,
                                    !0
                                  ) + 2
                                : x(
                                    I,
                                    P,
                                    I - M * U,
                                    P - D * U,
                                    I - R * U,
                                    P - N * U,
                                    v,
                                    !1
                                  ) + 2)
                            : (V
                                ? (v.push(Q, tt), v.push(Q, tt))
                                : (v.push(Z, J), v.push(Z, J)),
                              (g += 2))),
                        v.push(I - R * U, P - N * U),
                        v.push(I + R * B, P + N * B),
                        (g += 2));
                  }
                }
                (A = o[2 * (y - 2)]),
                  (S = o[2 * (y - 2) + 1]),
                  (I = o[2 * (y - 1)]),
                  (M = -(S - (P = o[2 * (y - 1) + 1]))),
                  (D = A - I),
                  (M /= L = Math.sqrt(M * M + D * D)),
                  (D /= L),
                  (M *= T),
                  (D *= T),
                  v.push(I - M * U, P - D * U),
                  v.push(I + M * B, P + D * B),
                  d ||
                    (h.cap === n.ROUND
                      ? (g +=
                          x(
                            I - M * (U - B) * 0.5,
                            P - D * (U - B) * 0.5,
                            I - M * U,
                            P - D * U,
                            I + M * B,
                            P + D * B,
                            v,
                            !1
                          ) + 2)
                      : h.cap === n.SQUARE &&
                        (g += b(I, P, M, D, U, B, !1, v)));
                var rt = e.indices,
                  it = l.epsilon * l.epsilon;
                for (k = _; k < g + _ - 2; ++k)
                  (A = v[2 * k]),
                    (S = v[2 * k + 1]),
                    (I = v[2 * (k + 1)]),
                    (P = v[2 * (k + 1) + 1]),
                    (O = v[2 * (k + 2)]),
                    (C = v[2 * (k + 2) + 1]),
                    Math.abs(A * (P - C) + I * (C - S) + O * (S - P)) < it ||
                      rt.push(k, k + 1, k + 2);
              }
            })(t, e);
      }
      var E,
        w = (function (t) {
          function e(e, r, i, n, o, a) {
            void 0 === a && (a = 0), (o = o || n / 2);
            for (
              var h = (-1 * Math.PI) / 2 + a,
                u = 2 * i,
                l = s._b / u,
                c = [],
                d = 0;
              d < u;
              d++
            ) {
              var p = d % 2 ? o : n,
                f = d * l + h;
              c.push(e + p * Math.cos(f), r + p * Math.sin(f));
            }
            return t.call(this, c) || this;
          }
          return p(e, t), e;
        })(s.mg),
        A = (function () {
          function t() {}
          return (
            (t.curveTo = function (t, e, r, i, n, o) {
              var s = o[o.length - 2],
                a = o[o.length - 1] - e,
                h = s - t,
                u = i - e,
                l = r - t,
                c = Math.abs(a * l - h * u);
              if (c < 1e-8 || 0 === n)
                return (
                  (o[o.length - 2] === t && o[o.length - 1] === e) ||
                    o.push(t, e),
                  null
                );
              var d = a * a + h * h,
                p = u * u + l * l,
                f = a * u + h * l,
                m = (n * Math.sqrt(d)) / c,
                v = (n * Math.sqrt(p)) / c,
                y = (m * f) / d,
                g = (v * f) / p,
                _ = m * l + v * h,
                b = m * u + v * a,
                x = h * (v + y),
                T = a * (v + y),
                E = l * (m + g),
                w = u * (m + g);
              return {
                cx: _ + t,
                cy: b + e,
                radius: n,
                startAngle: Math.atan2(T - b, x - _),
                endAngle: Math.atan2(w - b, E - _),
                anticlockwise: h * u > l * a,
              };
            }),
            (t.arc = function (t, e, r, i, n, o, a, h, u) {
              for (
                var c = a - o,
                  d = l._segmentsCount(
                    Math.abs(c) * n,
                    40 * Math.ceil(Math.abs(c) / s._b)
                  ),
                  p = c / (2 * d),
                  f = 2 * p,
                  m = Math.cos(p),
                  v = Math.sin(p),
                  y = d - 1,
                  g = (y % 1) / y,
                  _ = 0;
                _ <= y;
                ++_
              ) {
                var b = p + o + f * (_ + g * _),
                  x = Math.cos(b),
                  T = -Math.sin(b);
                u.push((m * x + v * T) * n + r, (m * -T + v * x) * n + i);
              }
            }),
            t
          );
        })(),
        S = (function () {
          function t() {}
          return (
            (t.curveLength = function (t, e, r, i, n, o, s, a) {
              for (
                var h = 0,
                  u = 0,
                  l = 0,
                  c = 0,
                  d = 0,
                  p = 0,
                  f = 0,
                  m = 0,
                  v = 0,
                  y = 0,
                  g = 0,
                  _ = t,
                  b = e,
                  x = 1;
                x <= 10;
                ++x
              )
                (y =
                  _ -
                  (m =
                    (f = (p = (d = 1 - (u = x / 10)) * d) * d) * t +
                    3 * p * u * r +
                    3 * d * (l = u * u) * n +
                    (c = l * u) * s)),
                  (g = b - (v = f * e + 3 * p * u * i + 3 * d * l * o + c * a)),
                  (_ = m),
                  (b = v),
                  (h += Math.sqrt(y * y + g * g));
              return h;
            }),
            (t.curveTo = function (e, r, i, n, o, s, a) {
              var h = a[a.length - 2],
                u = a[a.length - 1];
              a.length -= 2;
              var c = l._segmentsCount(t.curveLength(h, u, e, r, i, n, o, s)),
                d = 0,
                p = 0,
                f = 0,
                m = 0,
                v = 0;
              a.push(h, u);
              for (var y = 1, g = 0; y <= c; ++y)
                (f = (p = (d = 1 - (g = y / c)) * d) * d),
                  (v = (m = g * g) * g),
                  a.push(
                    f * h + 3 * p * g * e + 3 * d * m * i + v * o,
                    f * u + 3 * p * g * r + 3 * d * m * n + v * s
                  );
            }),
            t
          );
        })(),
        I = (function () {
          function t() {}
          return (
            (t.curveLength = function (t, e, r, i, n, o) {
              var s = t - 2 * r + n,
                a = e - 2 * i + o,
                h = 2 * r - 2 * t,
                u = 2 * i - 2 * e,
                l = 4 * (s * s + a * a),
                c = 4 * (s * h + a * u),
                d = h * h + u * u,
                p = 2 * Math.sqrt(l + c + d),
                f = Math.sqrt(l),
                m = 2 * l * f,
                v = 2 * Math.sqrt(d),
                y = c / f;
              return (
                (m * p +
                  f * c * (p - v) +
                  (4 * d * l - c * c) * Math.log((2 * f + y + p) / (y + v))) /
                (4 * m)
              );
            }),
            (t.curveTo = function (e, r, i, n, o) {
              for (
                var s = o[o.length - 2],
                  a = o[o.length - 1],
                  h = l._segmentsCount(t.curveLength(s, a, e, r, i, n)),
                  u = 0,
                  c = 0,
                  d = 1;
                d <= h;
                ++d
              ) {
                var p = d / h;
                (u = s + (e - s) * p),
                  (c = a + (r - a) * p),
                  o.push(
                    u + (e + (i - e) * p - u) * p,
                    c + (r + (n - r) * p - c) * p
                  );
              }
            }),
            t
          );
        })(),
        P = (function () {
          function t() {
            this.reset();
          }
          return (
            (t.prototype.begin = function (t, e, r) {
              this.reset(),
                (this.style = t),
                (this.start = e),
                (this.attribStart = r);
            }),
            (t.prototype.end = function (t, e) {
              (this.attribSize = e - this.attribStart),
                (this.size = t - this.start);
            }),
            (t.prototype.reset = function () {
              (this.style = null),
                (this.size = 0),
                (this.start = 0),
                (this.attribStart = 0),
                (this.attribSize = 0);
            }),
            t
          );
        })(),
        O =
          (((E = {})[s.HS.POLY] = f),
          (E[s.HS.CIRC] = m),
          (E[s.HS.ELIP] = m),
          (E[s.HS.RECT] = v),
          (E[s.HS.RREC] = _),
          E),
        C = [],
        M = [],
        D = {
          buildPoly: f,
          buildCircle: m,
          buildRectangle: v,
          buildRoundedRectangle: _,
          FILL_COMMANDS: O,
          BATCH_POOL: C,
          DRAW_CALL_POOL: M,
          buildLine: T,
          Star: w,
          ArcUtils: A,
          BezierUtils: S,
          QuadraticUtils: I,
          BatchPart: P,
        },
        R = (function () {
          function t(t, e, r, i) {
            void 0 === e && (e = null),
              void 0 === r && (r = null),
              void 0 === i && (i = null),
              (this.shape = t),
              (this.lineStyle = r),
              (this.fillStyle = e),
              (this.matrix = i),
              (this.type = t.type),
              (this.points = []),
              (this.holes = []);
          }
          return (
            (t.prototype.clone = function () {
              return new t(
                this.shape,
                this.fillStyle,
                this.lineStyle,
                this.matrix
              );
            }),
            (t.prototype.destroy = function () {
              (this.shape = null),
                (this.holes.length = 0),
                (this.holes = null),
                (this.points.length = 0),
                (this.points = null),
                (this.lineStyle = null),
                (this.fillStyle = null);
            }),
            t
          );
        })(),
        N = new s.E9(),
        L = new u.YZ(),
        F = (function (t) {
          function e() {
            var e = t.call(this) || this;
            return (
              (e.uvsFloat32 = null),
              (e.indicesUint16 = null),
              (e.points = []),
              (e.colors = []),
              (e.uvs = []),
              (e.indices = []),
              (e.textureIds = []),
              (e.graphicsData = []),
              (e.dirty = 0),
              (e.batchDirty = -1),
              (e.cacheDirty = -1),
              (e.clearDirty = 0),
              (e.drawCalls = []),
              (e.batches = []),
              (e.shapeIndex = 0),
              (e._bounds = new u.YZ()),
              (e.boundsDirty = -1),
              (e.boundsPadding = 0),
              (e.batchable = !1),
              (e.indicesUint16 = null),
              (e.uvsFloat32 = null),
              (e.closePointEps = 1e-4),
              e
            );
          }
          return (
            p(e, t),
            Object.defineProperty(e.prototype, "bounds", {
              get: function () {
                return (
                  this.boundsDirty !== this.dirty &&
                    ((this.boundsDirty = this.dirty), this.calculateBounds()),
                  this._bounds
                );
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.invalidate = function () {
              (this.boundsDirty = -1),
                this.dirty++,
                this.batchDirty++,
                (this.shapeIndex = 0),
                (this.points.length = 0),
                (this.colors.length = 0),
                (this.uvs.length = 0),
                (this.indices.length = 0),
                (this.textureIds.length = 0);
              for (var t = 0; t < this.drawCalls.length; t++)
                this.drawCalls[t].texArray.clear(), M.push(this.drawCalls[t]);
              for (
                this.drawCalls.length = 0, t = 0;
                t < this.batches.length;
                t++
              ) {
                var e = this.batches[t];
                e.reset(), C.push(e);
              }
              this.batches.length = 0;
            }),
            (e.prototype.clear = function () {
              return (
                this.graphicsData.length > 0 &&
                  (this.invalidate(),
                  this.clearDirty++,
                  (this.graphicsData.length = 0)),
                this
              );
            }),
            (e.prototype.drawShape = function (t, e, r, i) {
              void 0 === e && (e = null),
                void 0 === r && (r = null),
                void 0 === i && (i = null);
              var n = new R(t, e, r, i);
              return this.graphicsData.push(n), this.dirty++, this;
            }),
            (e.prototype.drawHole = function (t, e) {
              if ((void 0 === e && (e = null), !this.graphicsData.length))
                return null;
              var r = new R(t, null, null, e),
                i = this.graphicsData[this.graphicsData.length - 1];
              return (
                (r.lineStyle = i.lineStyle), i.holes.push(r), this.dirty++, this
              );
            }),
            (e.prototype.destroy = function () {
              t.prototype.destroy.call(this);
              for (var e = 0; e < this.graphicsData.length; ++e)
                this.graphicsData[e].destroy();
              (this.points.length = 0),
                (this.points = null),
                (this.colors.length = 0),
                (this.colors = null),
                (this.uvs.length = 0),
                (this.uvs = null),
                (this.indices.length = 0),
                (this.indices = null),
                this.indexBuffer.destroy(),
                (this.indexBuffer = null),
                (this.graphicsData.length = 0),
                (this.graphicsData = null),
                (this.drawCalls.length = 0),
                (this.drawCalls = null),
                (this.batches.length = 0),
                (this.batches = null),
                (this._bounds = null);
            }),
            (e.prototype.containsPoint = function (t) {
              for (var e = this.graphicsData, r = 0; r < e.length; ++r) {
                var i = e[r];
                if (
                  i.fillStyle.visible &&
                  i.shape &&
                  (i.matrix ? i.matrix.applyInverse(t, N) : N.copyFrom(t),
                  i.shape.contains(N.x, N.y))
                ) {
                  var n = !1;
                  if (i.holes)
                    for (var o = 0; o < i.holes.length; o++)
                      if (i.holes[o].shape.contains(N.x, N.y)) {
                        n = !0;
                        break;
                      }
                  if (!n) return !0;
                }
              }
              return !1;
            }),
            (e.prototype.updateBatches = function (t) {
              if (this.graphicsData.length) {
                if (this.validateBatching()) {
                  this.cacheDirty = this.dirty;
                  var e = this.uvs,
                    r = this.graphicsData,
                    i = null,
                    n = null;
                  this.batches.length > 0 &&
                    (n = (i = this.batches[this.batches.length - 1]).style);
                  for (var o = this.shapeIndex; o < r.length; o++) {
                    this.shapeIndex++;
                    var s = r[o],
                      a = s.fillStyle,
                      u = s.lineStyle;
                    O[s.type].build(s),
                      s.matrix && this.transformPoints(s.points, s.matrix);
                    for (var l = 0; l < 2; l++) {
                      var c = 0 === l ? a : u;
                      if (c.visible) {
                        var d = c.texture.baseTexture,
                          p = this.indices.length,
                          f = this.points.length / 2;
                        (d.wrapMode = h.Nt.REPEAT),
                          0 === l ? this.processFill(s) : this.processLine(s);
                        var m = this.points.length / 2 - f;
                        0 !== m &&
                          (i &&
                            !this._compareStyles(n, c) &&
                            (i.end(p, f), (i = null)),
                          i ||
                            ((i = C.pop() || new P()).begin(c, p, f),
                            this.batches.push(i),
                            (n = c)),
                          this.addUvs(
                            this.points,
                            e,
                            c.texture,
                            f,
                            m,
                            c.matrix
                          ));
                      }
                    }
                  }
                  var v = this.indices.length,
                    y = this.points.length / 2;
                  if ((i && i.end(v, y), 0 !== this.batches.length)) {
                    if (
                      this.indicesUint16 &&
                      this.indices.length === this.indicesUint16.length
                    )
                      this.indicesUint16.set(this.indices);
                    else {
                      var g = y > 65535 && t;
                      this.indicesUint16 = g
                        ? new Uint32Array(this.indices)
                        : new Uint16Array(this.indices);
                    }
                    (this.batchable = this.isBatchable()),
                      this.batchable
                        ? this.packBatches()
                        : this.buildDrawCalls();
                  } else this.batchable = !0;
                }
              } else this.batchable = !0;
            }),
            (e.prototype._compareStyles = function (t, e) {
              return (
                !(!t || !e) &&
                t.texture.baseTexture === e.texture.baseTexture &&
                t.color + t.alpha === e.color + e.alpha &&
                !!t.native == !!e.native
              );
            }),
            (e.prototype.validateBatching = function () {
              if (this.dirty === this.cacheDirty || !this.graphicsData.length)
                return !1;
              for (var t = 0, e = this.graphicsData.length; t < e; t++) {
                var r = this.graphicsData[t],
                  i = r.fillStyle,
                  n = r.lineStyle;
                if (i && !i.texture.baseTexture.valid) return !1;
                if (n && !n.texture.baseTexture.valid) return !1;
              }
              return !0;
            }),
            (e.prototype.packBatches = function () {
              this.batchDirty++, (this.uvsFloat32 = new Float32Array(this.uvs));
              for (var t = this.batches, e = 0, r = t.length; e < r; e++)
                for (var i = t[e], n = 0; n < i.size; n++) {
                  var o = i.start + n;
                  this.indicesUint16[o] = this.indicesUint16[o] - i.attribStart;
                }
            }),
            (e.prototype.isBatchable = function () {
              if (this.points.length > 131070) return !1;
              for (var t = this.batches, r = 0; r < t.length; r++)
                if (t[r].style.native) return !1;
              return this.points.length < 2 * e.BATCHABLE_SIZE;
            }),
            (e.prototype.buildDrawCalls = function () {
              for (
                var t = ++o.VL._globalBatch, e = 0;
                e < this.drawCalls.length;
                e++
              )
                this.drawCalls[e].texArray.clear(), M.push(this.drawCalls[e]);
              this.drawCalls.length = 0;
              var r = this.colors,
                i = this.textureIds,
                n = M.pop();
              n || ((n = new o.a$()).texArray = new o.Ie()),
                (n.texArray.count = 0),
                (n.start = 0),
                (n.size = 0),
                (n.type = h.lg.TRIANGLES);
              var s = 0,
                a = null,
                u = 0,
                l = !1,
                c = h.lg.TRIANGLES,
                d = 0;
              for (
                this.drawCalls.push(n), e = 0;
                e < this.batches.length;
                e++
              ) {
                var p = this.batches[e],
                  f = p.style,
                  m = f.texture.baseTexture;
                l !== !!f.native &&
                  ((c = (l = !!f.native) ? h.lg.LINES : h.lg.TRIANGLES),
                  (a = null),
                  (s = 8),
                  t++),
                  a !== m &&
                    ((a = m),
                    m._batchEnabled !== t &&
                      (8 === s &&
                        (t++,
                        (s = 0),
                        n.size > 0 &&
                          ((n = M.pop()) ||
                            ((n = new o.a$()).texArray = new o.Ie()),
                          this.drawCalls.push(n)),
                        (n.start = d),
                        (n.size = 0),
                        (n.texArray.count = 0),
                        (n.type = c)),
                      (m.touched = 1),
                      (m._batchEnabled = t),
                      (m._batchLocation = s),
                      (m.wrapMode = 10497),
                      (n.texArray.elements[n.texArray.count++] = m),
                      s++)),
                  (n.size += p.size),
                  (d += p.size),
                  (u = m._batchLocation),
                  this.addColors(
                    r,
                    f.color,
                    f.alpha,
                    p.attribSize,
                    p.attribStart
                  ),
                  this.addTextureIds(i, u, p.attribSize, p.attribStart);
              }
              (o.VL._globalBatch = t), this.packAttributes();
            }),
            (e.prototype.packAttributes = function () {
              for (
                var t = this.points,
                  e = this.uvs,
                  r = this.colors,
                  i = this.textureIds,
                  n = new ArrayBuffer(3 * t.length * 4),
                  o = new Float32Array(n),
                  s = new Uint32Array(n),
                  a = 0,
                  h = 0;
                h < t.length / 2;
                h++
              )
                (o[a++] = t[2 * h]),
                  (o[a++] = t[2 * h + 1]),
                  (o[a++] = e[2 * h]),
                  (o[a++] = e[2 * h + 1]),
                  (s[a++] = r[h]),
                  (o[a++] = i[h]);
              this._buffer.update(n),
                this._indexBuffer.update(this.indicesUint16);
            }),
            (e.prototype.processFill = function (t) {
              t.holes.length
                ? (this.processHoles(t.holes), f.triangulate(t, this))
                : O[t.type].triangulate(t, this);
            }),
            (e.prototype.processLine = function (t) {
              T(t, this);
              for (var e = 0; e < t.holes.length; e++) T(t.holes[e], this);
            }),
            (e.prototype.processHoles = function (t) {
              for (var e = 0; e < t.length; e++) {
                var r = t[e];
                O[r.type].build(r),
                  r.matrix && this.transformPoints(r.points, r.matrix);
              }
            }),
            (e.prototype.calculateBounds = function () {
              var t = this._bounds,
                e = L,
                r = s.y3.IDENTITY;
              this._bounds.clear(), e.clear();
              for (var i = 0; i < this.graphicsData.length; i++) {
                var n = this.graphicsData[i],
                  o = n.shape,
                  a = n.type,
                  h = n.lineStyle,
                  u = n.matrix || s.y3.IDENTITY,
                  l = 0;
                if (h && h.visible) {
                  var c = h.alignment;
                  (l = h.width),
                    a === s.HS.POLY
                      ? (l *= 0.5 + Math.abs(0.5 - c))
                      : (l *= Math.max(0, c));
                }
                if (
                  (r !== u &&
                    (e.isEmpty() || (t.addBoundsMatrix(e, r), e.clear()),
                    (r = u)),
                  a === s.HS.RECT || a === s.HS.RREC)
                ) {
                  var d = o;
                  e.addFramePad(d.x, d.y, d.x + d.width, d.y + d.height, l, l);
                } else if (a === s.HS.CIRC) {
                  var p = o;
                  e.addFramePad(p.x, p.y, p.x, p.y, p.radius + l, p.radius + l);
                } else if (a === s.HS.ELIP) {
                  var f = o;
                  e.addFramePad(f.x, f.y, f.x, f.y, f.width + l, f.height + l);
                } else {
                  var m = o;
                  t.addVerticesMatrix(r, m.points, 0, m.points.length, l, l);
                }
              }
              e.isEmpty() || t.addBoundsMatrix(e, r),
                t.pad(this.boundsPadding, this.boundsPadding);
            }),
            (e.prototype.transformPoints = function (t, e) {
              for (var r = 0; r < t.length / 2; r++) {
                var i = t[2 * r],
                  n = t[2 * r + 1];
                (t[2 * r] = e.a * i + e.c * n + e.tx),
                  (t[2 * r + 1] = e.b * i + e.d * n + e.ty);
              }
            }),
            (e.prototype.addColors = function (t, e, r, i, n) {
              void 0 === n && (n = 0);
              var o = (e >> 16) + (65280 & e) + ((255 & e) << 16),
                s = (0, a.premultiplyTint)(o, r);
              t.length = Math.max(t.length, n + i);
              for (var h = 0; h < i; h++) t[n + h] = s;
            }),
            (e.prototype.addTextureIds = function (t, e, r, i) {
              void 0 === i && (i = 0), (t.length = Math.max(t.length, i + r));
              for (var n = 0; n < r; n++) t[i + n] = e;
            }),
            (e.prototype.addUvs = function (t, e, r, i, n, o) {
              void 0 === o && (o = null);
              for (var s = 0, a = e.length, h = r.frame; s < n; ) {
                var u = t[2 * (i + s)],
                  l = t[2 * (i + s) + 1];
                if (o) {
                  var c = o.a * u + o.c * l + o.tx;
                  (l = o.b * u + o.d * l + o.ty), (u = c);
                }
                s++, e.push(u / h.width, l / h.height);
              }
              var d = r.baseTexture;
              (h.width < d.width || h.height < d.height) &&
                this.adjustUvs(e, r, a, n);
            }),
            (e.prototype.adjustUvs = function (t, e, r, i) {
              for (
                var n = e.baseTexture,
                  o = 1e-6,
                  s = r + 2 * i,
                  a = e.frame,
                  h = a.width / n.width,
                  u = a.height / n.height,
                  l = a.x / a.width,
                  c = a.y / a.height,
                  d = Math.floor(t[r] + o),
                  p = Math.floor(t[r + 1] + o),
                  f = r + 2;
                f < s;
                f += 2
              )
                (d = Math.min(d, Math.floor(t[f] + o))),
                  (p = Math.min(p, Math.floor(t[f + 1] + o)));
              for (l -= d, c -= p, f = r; f < s; f += 2)
                (t[f] = (t[f] + l) * h), (t[f + 1] = (t[f + 1] + c) * u);
            }),
            (e.BATCHABLE_SIZE = 100),
            e
          );
        })(o.JZ),
        U = (function (t) {
          function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            return (
              (e.width = 0),
              (e.alignment = 0.5),
              (e.native = !1),
              (e.cap = n.BUTT),
              (e.join = i.MITER),
              (e.miterLimit = 10),
              e
            );
          }
          return (
            p(e, t),
            (e.prototype.clone = function () {
              var t = new e();
              return (
                (t.color = this.color),
                (t.alpha = this.alpha),
                (t.texture = this.texture),
                (t.matrix = this.matrix),
                (t.visible = this.visible),
                (t.width = this.width),
                (t.alignment = this.alignment),
                (t.native = this.native),
                (t.cap = this.cap),
                (t.join = this.join),
                (t.miterLimit = this.miterLimit),
                t
              );
            }),
            (e.prototype.reset = function () {
              t.prototype.reset.call(this),
                (this.color = 0),
                (this.alignment = 0.5),
                (this.width = 0),
                (this.native = !1);
            }),
            e
          );
        })(c),
        B = new Float32Array(3),
        k = {},
        j = (function (t) {
          function e(e) {
            void 0 === e && (e = null);
            var r = t.call(this) || this;
            return (
              (r._geometry = e || new F()),
              r._geometry.refCount++,
              (r.shader = null),
              (r.state = o.ZM.for2d()),
              (r._fillStyle = new c()),
              (r._lineStyle = new U()),
              (r._matrix = null),
              (r._holeMode = !1),
              (r.currentPath = null),
              (r.batches = []),
              (r.batchTint = -1),
              (r.batchDirty = -1),
              (r.vertexData = null),
              (r.pluginName = "batch"),
              (r._transformID = -1),
              (r.tint = 16777215),
              (r.blendMode = h.T$.NORMAL),
              r
            );
          }
          return (
            p(e, t),
            Object.defineProperty(e.prototype, "geometry", {
              get: function () {
                return this._geometry;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.clone = function () {
              return this.finishPoly(), new e(this._geometry);
            }),
            Object.defineProperty(e.prototype, "blendMode", {
              get: function () {
                return this.state.blendMode;
              },
              set: function (t) {
                this.state.blendMode = t;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "tint", {
              get: function () {
                return this._tint;
              },
              set: function (t) {
                this._tint = t;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "fill", {
              get: function () {
                return this._fillStyle;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "line", {
              get: function () {
                return this._lineStyle;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.lineStyle = function (t) {
              if ((void 0 === t && (t = null), "number" == typeof t)) {
                var e = arguments;
                t = {
                  width: e[0] || 0,
                  color: e[1] || 0,
                  alpha: void 0 !== e[2] ? e[2] : 1,
                  alignment: void 0 !== e[3] ? e[3] : 0.5,
                  native: !!e[4],
                };
              }
              return this.lineTextureStyle(t);
            }),
            (e.prototype.lineTextureStyle = function (t) {
              if ("number" == typeof t) {
                (0, a.deprecation)(
                  "v5.2.0",
                  "Please use object-based options for Graphics#lineTextureStyle"
                );
                var e = arguments;
                (t = {
                  width: e[0],
                  texture: e[1],
                  color: e[2],
                  alpha: e[3],
                  matrix: e[4],
                  alignment: e[5],
                  native: e[6],
                }),
                  Object.keys(t).forEach(function (e) {
                    return void 0 === t[e] && delete t[e];
                  });
              }
              (t = Object.assign(
                {
                  width: 0,
                  texture: o.xE.WHITE,
                  color: t && t.texture ? 16777215 : 0,
                  alpha: 1,
                  matrix: null,
                  alignment: 0.5,
                  native: !1,
                  cap: n.BUTT,
                  join: i.MITER,
                  miterLimit: 10,
                },
                t
              )),
                this.currentPath && this.startPoly();
              var r = t.width > 0 && t.alpha > 0;
              return (
                r
                  ? (t.matrix &&
                      ((t.matrix = t.matrix.clone()), t.matrix.invert()),
                    Object.assign(this._lineStyle, { visible: r }, t))
                  : this._lineStyle.reset(),
                this
              );
            }),
            (e.prototype.startPoly = function () {
              if (this.currentPath) {
                var t = this.currentPath.points,
                  e = this.currentPath.points.length;
                e > 2 &&
                  (this.drawShape(this.currentPath),
                  (this.currentPath = new s.mg()),
                  (this.currentPath.closeStroke = !1),
                  this.currentPath.points.push(t[e - 2], t[e - 1]));
              } else
                (this.currentPath = new s.mg()),
                  (this.currentPath.closeStroke = !1);
            }),
            (e.prototype.finishPoly = function () {
              this.currentPath &&
                (this.currentPath.points.length > 2
                  ? (this.drawShape(this.currentPath),
                    (this.currentPath = null))
                  : (this.currentPath.points.length = 0));
            }),
            (e.prototype.moveTo = function (t, e) {
              return (
                this.startPoly(),
                (this.currentPath.points[0] = t),
                (this.currentPath.points[1] = e),
                this
              );
            }),
            (e.prototype.lineTo = function (t, e) {
              this.currentPath || this.moveTo(0, 0);
              var r = this.currentPath.points,
                i = r[r.length - 2],
                n = r[r.length - 1];
              return (i === t && n === e) || r.push(t, e), this;
            }),
            (e.prototype._initCurve = function (t, e) {
              void 0 === t && (t = 0),
                void 0 === e && (e = 0),
                this.currentPath
                  ? 0 === this.currentPath.points.length &&
                    (this.currentPath.points = [t, e])
                  : this.moveTo(t, e);
            }),
            (e.prototype.quadraticCurveTo = function (t, e, r, i) {
              this._initCurve();
              var n = this.currentPath.points;
              return (
                0 === n.length && this.moveTo(0, 0),
                I.curveTo(t, e, r, i, n),
                this
              );
            }),
            (e.prototype.bezierCurveTo = function (t, e, r, i, n, o) {
              return (
                this._initCurve(),
                S.curveTo(t, e, r, i, n, o, this.currentPath.points),
                this
              );
            }),
            (e.prototype.arcTo = function (t, e, r, i, n) {
              this._initCurve(t, e);
              var o = this.currentPath.points,
                s = A.curveTo(t, e, r, i, n, o);
              if (s) {
                var a = s.cx,
                  h = s.cy,
                  u = s.radius,
                  l = s.startAngle,
                  c = s.endAngle,
                  d = s.anticlockwise;
                this.arc(a, h, u, l, c, d);
              }
              return this;
            }),
            (e.prototype.arc = function (t, e, r, i, n, o) {
              if ((void 0 === o && (o = !1), i === n)) return this;
              if (
                (!o && n <= i ? (n += s._b) : o && i <= n && (i += s._b),
                0 == n - i)
              )
                return this;
              var a = t + Math.cos(i) * r,
                h = e + Math.sin(i) * r,
                u = this._geometry.closePointEps,
                l = this.currentPath ? this.currentPath.points : null;
              if (l) {
                var c = Math.abs(l[l.length - 2] - a),
                  d = Math.abs(l[l.length - 1] - h);
                (c < u && d < u) || l.push(a, h);
              } else this.moveTo(a, h), (l = this.currentPath.points);
              return A.arc(a, h, t, e, r, i, n, o, l), this;
            }),
            (e.prototype.beginFill = function (t, e) {
              return (
                void 0 === t && (t = 0),
                void 0 === e && (e = 1),
                this.beginTextureFill({
                  texture: o.xE.WHITE,
                  color: t,
                  alpha: e,
                })
              );
            }),
            (e.prototype.beginTextureFill = function (t) {
              if (t instanceof o.xE) {
                (0, a.deprecation)(
                  "v5.2.0",
                  "Please use object-based options for Graphics#beginTextureFill"
                );
                var e = arguments;
                (t = { texture: e[0], color: e[1], alpha: e[2], matrix: e[3] }),
                  Object.keys(t).forEach(function (e) {
                    return void 0 === t[e] && delete t[e];
                  });
              }
              (t = Object.assign(
                {
                  texture: o.xE.WHITE,
                  color: 16777215,
                  alpha: 1,
                  matrix: null,
                },
                t
              )),
                this.currentPath && this.startPoly();
              var r = t.alpha > 0;
              return (
                r
                  ? (t.matrix &&
                      ((t.matrix = t.matrix.clone()), t.matrix.invert()),
                    Object.assign(this._fillStyle, { visible: r }, t))
                  : this._fillStyle.reset(),
                this
              );
            }),
            (e.prototype.endFill = function () {
              return this.finishPoly(), this._fillStyle.reset(), this;
            }),
            (e.prototype.drawRect = function (t, e, r, i) {
              return this.drawShape(new s.Ae(t, e, r, i));
            }),
            (e.prototype.drawRoundedRect = function (t, e, r, i, n) {
              return this.drawShape(new s.c9(t, e, r, i, n));
            }),
            (e.prototype.drawCircle = function (t, e, r) {
              return this.drawShape(new s.Cd(t, e, r));
            }),
            (e.prototype.drawEllipse = function (t, e, r, i) {
              return this.drawShape(new s.Pj(t, e, r, i));
            }),
            (e.prototype.drawPolygon = function () {
              for (
                var t, e = arguments, r = [], i = 0;
                i < arguments.length;
                i++
              )
                r[i] = e[i];
              var n = !0,
                o = r[0];
              o.points
                ? ((n = o.closeStroke), (t = o.points))
                : (t = Array.isArray(r[0]) ? r[0] : r);
              var a = new s.mg(t);
              return (a.closeStroke = n), this.drawShape(a), this;
            }),
            (e.prototype.drawShape = function (t) {
              return (
                this._holeMode
                  ? this._geometry.drawHole(t, this._matrix)
                  : this._geometry.drawShape(
                      t,
                      this._fillStyle.clone(),
                      this._lineStyle.clone(),
                      this._matrix
                    ),
                this
              );
            }),
            (e.prototype.drawStar = function (t, e, r, i, n, o) {
              return (
                void 0 === o && (o = 0),
                this.drawPolygon(new w(t, e, r, i, n, o))
              );
            }),
            (e.prototype.clear = function () {
              return (
                this._geometry.clear(),
                this._lineStyle.reset(),
                this._fillStyle.reset(),
                this._boundsID++,
                (this._matrix = null),
                (this._holeMode = !1),
                (this.currentPath = null),
                this
              );
            }),
            (e.prototype.isFastRect = function () {
              var t = this._geometry.graphicsData;
              return (
                1 === t.length &&
                t[0].shape.type === s.HS.RECT &&
                !(t[0].lineStyle.visible && t[0].lineStyle.width)
              );
            }),
            (e.prototype._render = function (t) {
              this.finishPoly();
              var e = this._geometry,
                r = t.context.supports.uint32Indices;
              e.updateBatches(r),
                e.batchable
                  ? (this.batchDirty !== e.batchDirty &&
                      this._populateBatches(),
                    this._renderBatched(t))
                  : (t.batch.flush(), this._renderDirect(t));
            }),
            (e.prototype._populateBatches = function () {
              var t = this._geometry,
                e = this.blendMode,
                r = t.batches.length;
              (this.batchTint = -1),
                (this._transformID = -1),
                (this.batchDirty = t.batchDirty),
                (this.batches.length = r),
                (this.vertexData = new Float32Array(t.points));
              for (var i = 0; i < r; i++) {
                var n = t.batches[i],
                  o = n.style.color,
                  s = new Float32Array(
                    this.vertexData.buffer,
                    4 * n.attribStart * 2,
                    2 * n.attribSize
                  ),
                  h = new Float32Array(
                    t.uvsFloat32.buffer,
                    4 * n.attribStart * 2,
                    2 * n.attribSize
                  ),
                  u = {
                    vertexData: s,
                    blendMode: e,
                    indices: new Uint16Array(
                      t.indicesUint16.buffer,
                      2 * n.start,
                      n.size
                    ),
                    uvs: h,
                    _batchRGB: (0, a.hex2rgb)(o),
                    _tintRGB: o,
                    _texture: n.style.texture,
                    alpha: n.style.alpha,
                    worldAlpha: 1,
                  };
                this.batches[i] = u;
              }
            }),
            (e.prototype._renderBatched = function (t) {
              if (this.batches.length) {
                t.batch.setObjectRenderer(t.plugins[this.pluginName]),
                  this.calculateVertices(),
                  this.calculateTints();
                for (var e = 0, r = this.batches.length; e < r; e++) {
                  var i = this.batches[e];
                  (i.worldAlpha = this.worldAlpha * i.alpha),
                    t.plugins[this.pluginName].render(i);
                }
              }
            }),
            (e.prototype._renderDirect = function (t) {
              var e = this._resolveDirectShader(t),
                r = this._geometry,
                i = this.tint,
                n = this.worldAlpha,
                o = e.uniforms,
                s = r.drawCalls;
              (o.translationMatrix = this.transform.worldTransform),
                (o.tint[0] = (((i >> 16) & 255) / 255) * n),
                (o.tint[1] = (((i >> 8) & 255) / 255) * n),
                (o.tint[2] = ((255 & i) / 255) * n),
                (o.tint[3] = n),
                t.shader.bind(e),
                t.geometry.bind(r, e),
                t.state.set(this.state);
              for (var a = 0, h = s.length; a < h; a++)
                this._renderDrawCallDirect(t, r.drawCalls[a]);
            }),
            (e.prototype._renderDrawCallDirect = function (t, e) {
              for (
                var r = e.texArray,
                  i = e.type,
                  n = e.size,
                  o = e.start,
                  s = r.count,
                  a = 0;
                a < s;
                a++
              )
                t.texture.bind(r.elements[a], a);
              t.geometry.draw(i, n, o);
            }),
            (e.prototype._resolveDirectShader = function (t) {
              var e = this.shader,
                r = this.pluginName;
              if (!e) {
                if (!k[r]) {
                  for (
                    var i = t.plugins.batch.MAX_TEXTURES,
                      n = new Int32Array(i),
                      a = 0;
                    a < i;
                    a++
                  )
                    n[a] = a;
                  var h = {
                      tint: new Float32Array([1, 1, 1, 1]),
                      translationMatrix: new s.y3(),
                      default: o.oo.from({ uSamplers: n }, !0),
                    },
                    u = t.plugins[r]._shader.program;
                  k[r] = new o.ex(u, h);
                }
                e = k[r];
              }
              return e;
            }),
            (e.prototype._calculateBounds = function () {
              this.finishPoly();
              var t = this._geometry;
              if (t.graphicsData.length) {
                var e = t.bounds,
                  r = e.minX,
                  i = e.minY,
                  n = e.maxX,
                  o = e.maxY;
                this._bounds.addFrame(this.transform, r, i, n, o);
              }
            }),
            (e.prototype.containsPoint = function (t) {
              return (
                this.worldTransform.applyInverse(t, e._TEMP_POINT),
                this._geometry.containsPoint(e._TEMP_POINT)
              );
            }),
            (e.prototype.calculateTints = function () {
              if (this.batchTint !== this.tint) {
                this.batchTint = this.tint;
                for (
                  var t = (0, a.hex2rgb)(this.tint, B), e = 0;
                  e < this.batches.length;
                  e++
                ) {
                  var r = this.batches[e],
                    i = r._batchRGB,
                    n =
                      ((t[0] * i[0] * 255) << 16) +
                      ((t[1] * i[1] * 255) << 8) +
                      (0 | (t[2] * i[2] * 255));
                  r._tintRGB = (n >> 16) + (65280 & n) + ((255 & n) << 16);
                }
              }
            }),
            (e.prototype.calculateVertices = function () {
              var t = this.transform._worldID;
              if (this._transformID !== t) {
                this._transformID = t;
                for (
                  var e = this.transform.worldTransform,
                    r = e.a,
                    i = e.b,
                    n = e.c,
                    o = e.d,
                    s = e.tx,
                    a = e.ty,
                    h = this._geometry.points,
                    u = this.vertexData,
                    l = 0,
                    c = 0;
                  c < h.length;
                  c += 2
                ) {
                  var d = h[c],
                    p = h[c + 1];
                  (u[l++] = r * d + n * p + s), (u[l++] = o * p + i * d + a);
                }
              }
            }),
            (e.prototype.closePath = function () {
              var t = this.currentPath;
              return t && (t.closeStroke = !0), this;
            }),
            (e.prototype.setMatrix = function (t) {
              return (this._matrix = t), this;
            }),
            (e.prototype.beginHole = function () {
              return this.finishPoly(), (this._holeMode = !0), this;
            }),
            (e.prototype.endHole = function () {
              return this.finishPoly(), (this._holeMode = !1), this;
            }),
            (e.prototype.destroy = function (e) {
              this._geometry.refCount--,
                0 === this._geometry.refCount && this._geometry.dispose(),
                (this._matrix = null),
                (this.currentPath = null),
                this._lineStyle.destroy(),
                (this._lineStyle = null),
                this._fillStyle.destroy(),
                (this._fillStyle = null),
                (this._geometry = null),
                (this.shader = null),
                (this.vertexData = null),
                (this.batches.length = 0),
                (this.batches = null),
                t.prototype.destroy.call(this, e);
            }),
            (e._TEMP_POINT = new s.E9()),
            e
          );
        })(u.W2);
    },
    3750: (t, e, r) => {
      r.d(e, {
        Op: () => d,
        bx: () => f,
        gU: () => a,
        s_: () => l,
        sm: () => u,
      });
      var i = r(4295),
        n = r(5662),
        o = r(29),
        s = r(5323),
        a = (function () {
          function t() {
            (this.pressure = 0),
              (this.rotationAngle = 0),
              (this.twist = 0),
              (this.tangentialPressure = 0),
              (this.global = new i.E9()),
              (this.target = null),
              (this.originalEvent = null),
              (this.identifier = null),
              (this.isPrimary = !1),
              (this.button = 0),
              (this.buttons = 0),
              (this.width = 0),
              (this.height = 0),
              (this.tiltX = 0),
              (this.tiltY = 0),
              (this.pointerType = null),
              (this.pressure = 0),
              (this.rotationAngle = 0),
              (this.twist = 0),
              (this.tangentialPressure = 0);
          }
          return (
            Object.defineProperty(t.prototype, "pointerId", {
              get: function () {
                return this.identifier;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (t.prototype.getLocalPosition = function (t, e, r) {
              return t.worldTransform.applyInverse(r || this.global, e);
            }),
            (t.prototype.copyEvent = function (t) {
              "isPrimary" in t && t.isPrimary && (this.isPrimary = !0),
                (this.button = "button" in t && t.button);
              var e = "buttons" in t && t.buttons;
              (this.buttons = Number.isInteger(e)
                ? e
                : "which" in t && t.which),
                (this.width = "width" in t && t.width),
                (this.height = "height" in t && t.height),
                (this.tiltX = "tiltX" in t && t.tiltX),
                (this.tiltY = "tiltY" in t && t.tiltY),
                (this.pointerType = "pointerType" in t && t.pointerType),
                (this.pressure = "pressure" in t && t.pressure),
                (this.rotationAngle = "rotationAngle" in t && t.rotationAngle),
                (this.twist = ("twist" in t && t.twist) || 0),
                (this.tangentialPressure =
                  ("tangentialPressure" in t && t.tangentialPressure) || 0);
            }),
            (t.prototype.reset = function () {
              this.isPrimary = !1;
            }),
            t
          );
        })(),
        h = function (t, e) {
          return (
            (h =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (t, e) {
                  t.__proto__ = e;
                }) ||
              function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
              }),
            h(t, e)
          );
        },
        u = (function () {
          function t() {
            (this.stopped = !1),
              (this.stopsPropagatingAt = null),
              (this.stopPropagationHint = !1),
              (this.target = null),
              (this.currentTarget = null),
              (this.type = null),
              (this.data = null);
          }
          return (
            (t.prototype.stopPropagation = function () {
              (this.stopped = !0),
                (this.stopPropagationHint = !0),
                (this.stopsPropagatingAt = this.currentTarget);
            }),
            (t.prototype.reset = function () {
              (this.stopped = !1),
                (this.stopsPropagatingAt = null),
                (this.stopPropagationHint = !1),
                (this.currentTarget = null),
                (this.target = null);
            }),
            t
          );
        })(),
        l = (function () {
          function t(e) {
            (this._pointerId = e), (this._flags = t.FLAGS.NONE);
          }
          return (
            (t.prototype._doSet = function (t, e) {
              this._flags = e ? this._flags | t : this._flags & ~t;
            }),
            Object.defineProperty(t.prototype, "pointerId", {
              get: function () {
                return this._pointerId;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "flags", {
              get: function () {
                return this._flags;
              },
              set: function (t) {
                this._flags = t;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "none", {
              get: function () {
                return this._flags === t.FLAGS.NONE;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "over", {
              get: function () {
                return 0 != (this._flags & t.FLAGS.OVER);
              },
              set: function (e) {
                this._doSet(t.FLAGS.OVER, e);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "rightDown", {
              get: function () {
                return 0 != (this._flags & t.FLAGS.RIGHT_DOWN);
              },
              set: function (e) {
                this._doSet(t.FLAGS.RIGHT_DOWN, e);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "leftDown", {
              get: function () {
                return 0 != (this._flags & t.FLAGS.LEFT_DOWN);
              },
              set: function (e) {
                this._doSet(t.FLAGS.LEFT_DOWN, e);
              },
              enumerable: !1,
              configurable: !0,
            }),
            (t.FLAGS = Object.freeze({
              NONE: 0,
              OVER: 1,
              LEFT_DOWN: 2,
              RIGHT_DOWN: 4,
            })),
            t
          );
        })(),
        c = (function () {
          function t() {
            this._tempPoint = new i.E9();
          }
          return (
            (t.prototype.recursiveFindHit = function (t, e, r, i, n) {
              if (!e || !e.visible) return !1;
              var o = t.data.global,
                s = !1,
                a = (n = e.interactive || n),
                h = !0;
              if (
                (e.hitArea
                  ? (i &&
                      (e.worldTransform.applyInverse(o, this._tempPoint),
                      e.hitArea.contains(this._tempPoint.x, this._tempPoint.y)
                        ? (s = !0)
                        : ((i = !1), (h = !1))),
                    (a = !1))
                  : e._mask &&
                    i &&
                    ((e._mask.containsPoint && e._mask.containsPoint(o)) ||
                      (i = !1)),
                h && e.interactiveChildren && e.children)
              )
                for (var u = e.children, l = u.length - 1; l >= 0; l--) {
                  var c = u[l],
                    d = this.recursiveFindHit(t, c, r, i, a);
                  if (d) {
                    if (!c.parent) continue;
                    (a = !1), d && (t.target && (i = !1), (s = !0));
                  }
                }
              return (
                n &&
                  (i &&
                    !t.target &&
                    !e.hitArea &&
                    e.containsPoint &&
                    e.containsPoint(o) &&
                    (s = !0),
                  e.interactive &&
                    (s && !t.target && (t.target = e), r && r(t, e, !!s))),
                s
              );
            }),
            (t.prototype.findHit = function (t, e, r, i) {
              this.recursiveFindHit(t, e, r, i, !1);
            }),
            t
          );
        })(),
        d = {
          interactive: !1,
          interactiveChildren: !0,
          hitArea: null,
          get buttonMode() {
            return "pointer" === this.cursor;
          },
          set buttonMode(t) {
            t
              ? (this.cursor = "pointer")
              : "pointer" === this.cursor && (this.cursor = null);
          },
          cursor: null,
          get trackedPointers() {
            return (
              void 0 === this._trackedPointers && (this._trackedPointers = {}),
              this._trackedPointers
            );
          },
          _trackedPointers: void 0,
        };
      o.s$.mixin(d);
      var p = { target: null, data: { global: null } },
        f = (function (t) {
          function e(e, r) {
            var i = t.call(this) || this;
            return (
              (r = r || {}),
              (i.renderer = e),
              (i.autoPreventDefault =
                void 0 === r.autoPreventDefault || r.autoPreventDefault),
              (i.interactionFrequency = r.interactionFrequency || 10),
              (i.mouse = new a()),
              (i.mouse.identifier = 1),
              i.mouse.global.set(-999999),
              (i.activeInteractionData = {}),
              (i.activeInteractionData[1] = i.mouse),
              (i.interactionDataPool = []),
              (i.eventData = new u()),
              (i.interactionDOMElement = null),
              (i.moveWhenInside = !1),
              (i.eventsAdded = !1),
              (i.tickerAdded = !1),
              (i.mouseOverRenderer = !1),
              (i.supportsTouchEvents = "ontouchstart" in window),
              (i.supportsPointerEvents = !!window.PointerEvent),
              (i.onPointerUp = i.onPointerUp.bind(i)),
              (i.processPointerUp = i.processPointerUp.bind(i)),
              (i.onPointerCancel = i.onPointerCancel.bind(i)),
              (i.processPointerCancel = i.processPointerCancel.bind(i)),
              (i.onPointerDown = i.onPointerDown.bind(i)),
              (i.processPointerDown = i.processPointerDown.bind(i)),
              (i.onPointerMove = i.onPointerMove.bind(i)),
              (i.processPointerMove = i.processPointerMove.bind(i)),
              (i.onPointerOut = i.onPointerOut.bind(i)),
              (i.processPointerOverOut = i.processPointerOverOut.bind(i)),
              (i.onPointerOver = i.onPointerOver.bind(i)),
              (i.cursorStyles = { default: "inherit", pointer: "pointer" }),
              (i.currentCursorMode = null),
              (i.cursor = null),
              (i.resolution = 1),
              (i.delayedEvents = []),
              (i.search = new c()),
              (i._tempDisplayObject = new o.Ql()),
              (i._useSystemTicker =
                void 0 === r.useSystemTicker || r.useSystemTicker),
              i.setTargetElement(i.renderer.view, i.renderer.resolution),
              i
            );
          }
          return (
            (function (t, e) {
              function r() {
                this.constructor = t;
              }
              h(t, e),
                (t.prototype =
                  null === e
                    ? Object.create(e)
                    : ((r.prototype = e.prototype), new r()));
            })(e, t),
            Object.defineProperty(e.prototype, "useSystemTicker", {
              get: function () {
                return this._useSystemTicker;
              },
              set: function (t) {
                (this._useSystemTicker = t),
                  t ? this.addTickerListener() : this.removeTickerListener();
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "lastObjectRendered", {
              get: function () {
                return (
                  this.renderer._lastObjectRendered || this._tempDisplayObject
                );
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.hitTest = function (t, e) {
              return (
                (p.target = null),
                (p.data.global = t),
                e || (e = this.lastObjectRendered),
                this.processInteractive(p, e, null, !0),
                p.target
              );
            }),
            (e.prototype.setTargetElement = function (t, e) {
              void 0 === e && (e = 1),
                this.removeTickerListener(),
                this.removeEvents(),
                (this.interactionDOMElement = t),
                (this.resolution = e),
                this.addEvents(),
                this.addTickerListener();
            }),
            (e.prototype.addTickerListener = function () {
              !this.tickerAdded &&
                this.interactionDOMElement &&
                this._useSystemTicker &&
                (n.vB.system.add(this.tickerUpdate, this, n.uF.INTERACTION),
                (this.tickerAdded = !0));
            }),
            (e.prototype.removeTickerListener = function () {
              this.tickerAdded &&
                (n.vB.system.remove(this.tickerUpdate, this),
                (this.tickerAdded = !1));
            }),
            (e.prototype.addEvents = function () {
              if (!this.eventsAdded && this.interactionDOMElement) {
                var t = this.interactionDOMElement.style;
                window.navigator.msPointerEnabled
                  ? ((t.msContentZooming = "none"), (t.msTouchAction = "none"))
                  : this.supportsPointerEvents && (t.touchAction = "none"),
                  this.supportsPointerEvents
                    ? (window.document.addEventListener(
                        "pointermove",
                        this.onPointerMove,
                        !0
                      ),
                      this.interactionDOMElement.addEventListener(
                        "pointerdown",
                        this.onPointerDown,
                        !0
                      ),
                      this.interactionDOMElement.addEventListener(
                        "pointerleave",
                        this.onPointerOut,
                        !0
                      ),
                      this.interactionDOMElement.addEventListener(
                        "pointerover",
                        this.onPointerOver,
                        !0
                      ),
                      window.addEventListener(
                        "pointercancel",
                        this.onPointerCancel,
                        !0
                      ),
                      window.addEventListener(
                        "pointerup",
                        this.onPointerUp,
                        !0
                      ))
                    : (window.document.addEventListener(
                        "mousemove",
                        this.onPointerMove,
                        !0
                      ),
                      this.interactionDOMElement.addEventListener(
                        "mousedown",
                        this.onPointerDown,
                        !0
                      ),
                      this.interactionDOMElement.addEventListener(
                        "mouseout",
                        this.onPointerOut,
                        !0
                      ),
                      this.interactionDOMElement.addEventListener(
                        "mouseover",
                        this.onPointerOver,
                        !0
                      ),
                      window.addEventListener("mouseup", this.onPointerUp, !0)),
                  this.supportsTouchEvents &&
                    (this.interactionDOMElement.addEventListener(
                      "touchstart",
                      this.onPointerDown,
                      !0
                    ),
                    this.interactionDOMElement.addEventListener(
                      "touchcancel",
                      this.onPointerCancel,
                      !0
                    ),
                    this.interactionDOMElement.addEventListener(
                      "touchend",
                      this.onPointerUp,
                      !0
                    ),
                    this.interactionDOMElement.addEventListener(
                      "touchmove",
                      this.onPointerMove,
                      !0
                    )),
                  (this.eventsAdded = !0);
              }
            }),
            (e.prototype.removeEvents = function () {
              if (this.eventsAdded && this.interactionDOMElement) {
                var t = this.interactionDOMElement.style;
                window.navigator.msPointerEnabled
                  ? ((t.msContentZooming = ""), (t.msTouchAction = ""))
                  : this.supportsPointerEvents && (t.touchAction = ""),
                  this.supportsPointerEvents
                    ? (window.document.removeEventListener(
                        "pointermove",
                        this.onPointerMove,
                        !0
                      ),
                      this.interactionDOMElement.removeEventListener(
                        "pointerdown",
                        this.onPointerDown,
                        !0
                      ),
                      this.interactionDOMElement.removeEventListener(
                        "pointerleave",
                        this.onPointerOut,
                        !0
                      ),
                      this.interactionDOMElement.removeEventListener(
                        "pointerover",
                        this.onPointerOver,
                        !0
                      ),
                      window.removeEventListener(
                        "pointercancel",
                        this.onPointerCancel,
                        !0
                      ),
                      window.removeEventListener(
                        "pointerup",
                        this.onPointerUp,
                        !0
                      ))
                    : (window.document.removeEventListener(
                        "mousemove",
                        this.onPointerMove,
                        !0
                      ),
                      this.interactionDOMElement.removeEventListener(
                        "mousedown",
                        this.onPointerDown,
                        !0
                      ),
                      this.interactionDOMElement.removeEventListener(
                        "mouseout",
                        this.onPointerOut,
                        !0
                      ),
                      this.interactionDOMElement.removeEventListener(
                        "mouseover",
                        this.onPointerOver,
                        !0
                      ),
                      window.removeEventListener(
                        "mouseup",
                        this.onPointerUp,
                        !0
                      )),
                  this.supportsTouchEvents &&
                    (this.interactionDOMElement.removeEventListener(
                      "touchstart",
                      this.onPointerDown,
                      !0
                    ),
                    this.interactionDOMElement.removeEventListener(
                      "touchcancel",
                      this.onPointerCancel,
                      !0
                    ),
                    this.interactionDOMElement.removeEventListener(
                      "touchend",
                      this.onPointerUp,
                      !0
                    ),
                    this.interactionDOMElement.removeEventListener(
                      "touchmove",
                      this.onPointerMove,
                      !0
                    )),
                  (this.interactionDOMElement = null),
                  (this.eventsAdded = !1);
              }
            }),
            (e.prototype.tickerUpdate = function (t) {
              (this._deltaTime += t),
                this._deltaTime < this.interactionFrequency ||
                  ((this._deltaTime = 0), this.update());
            }),
            (e.prototype.update = function () {
              if (this.interactionDOMElement)
                if (this._didMove) this._didMove = !1;
                else {
                  for (var t in ((this.cursor = null),
                  this.activeInteractionData))
                    if (this.activeInteractionData.hasOwnProperty(t)) {
                      var e = this.activeInteractionData[t];
                      if (e.originalEvent && "touch" !== e.pointerType) {
                        var r = this.configureInteractionEventForDOMEvent(
                          this.eventData,
                          e.originalEvent,
                          e
                        );
                        this.processInteractive(
                          r,
                          this.lastObjectRendered,
                          this.processPointerOverOut,
                          !0
                        );
                      }
                    }
                  this.setCursorMode(this.cursor);
                }
            }),
            (e.prototype.setCursorMode = function (t) {
              if (((t = t || "default"), this.currentCursorMode !== t)) {
                this.currentCursorMode = t;
                var e = this.cursorStyles[t];
                if (e)
                  switch (typeof e) {
                    case "string":
                      this.interactionDOMElement.style.cursor = e;
                      break;
                    case "function":
                      e(t);
                      break;
                    case "object":
                      Object.assign(this.interactionDOMElement.style, e);
                  }
                else
                  "string" != typeof t ||
                    Object.prototype.hasOwnProperty.call(
                      this.cursorStyles,
                      t
                    ) ||
                    (this.interactionDOMElement.style.cursor = t);
              }
            }),
            (e.prototype.dispatchEvent = function (t, e, r) {
              (r.stopPropagationHint && t !== r.stopsPropagatingAt) ||
                ((r.currentTarget = t),
                (r.type = e),
                t.emit(e, r),
                t[e] && t[e](r));
            }),
            (e.prototype.delayDispatchEvent = function (t, e, r) {
              this.delayedEvents.push({
                displayObject: t,
                eventString: e,
                eventData: r,
              });
            }),
            (e.prototype.mapPositionToPoint = function (t, e, r) {
              var i;
              i = this.interactionDOMElement.parentElement
                ? this.interactionDOMElement.getBoundingClientRect()
                : { x: 0, y: 0, width: 0, height: 0 };
              var n = 1 / this.resolution;
              (t.x =
                (e - i.left) *
                (this.interactionDOMElement.width / i.width) *
                n),
                (t.y =
                  (r - i.top) *
                  (this.interactionDOMElement.height / i.height) *
                  n);
            }),
            (e.prototype.processInteractive = function (t, e, r, i) {
              var n = this.search.findHit(t, e, r, i),
                o = this.delayedEvents;
              if (!o.length) return n;
              t.stopPropagationHint = !1;
              var s = o.length;
              this.delayedEvents = [];
              for (var a = 0; a < s; a++) {
                var h = o[a],
                  u = h.displayObject,
                  l = h.eventString,
                  c = h.eventData;
                c.stopsPropagatingAt === u && (c.stopPropagationHint = !0),
                  this.dispatchEvent(u, l, c);
              }
              return n;
            }),
            (e.prototype.onPointerDown = function (t) {
              if (!this.supportsTouchEvents || "touch" !== t.pointerType) {
                var e = this.normalizeToPointerData(t);
                this.autoPreventDefault &&
                  e[0].isNormalized &&
                  (t.cancelable || !("cancelable" in t)) &&
                  t.preventDefault();
                for (var r = e.length, i = 0; i < r; i++) {
                  var n = e[i],
                    o = this.getInteractionDataForPointerId(n),
                    s = this.configureInteractionEventForDOMEvent(
                      this.eventData,
                      n,
                      o
                    );
                  if (
                    ((s.data.originalEvent = t),
                    this.processInteractive(
                      s,
                      this.lastObjectRendered,
                      this.processPointerDown,
                      !0
                    ),
                    this.emit("pointerdown", s),
                    "touch" === n.pointerType)
                  )
                    this.emit("touchstart", s);
                  else if (
                    "mouse" === n.pointerType ||
                    "pen" === n.pointerType
                  ) {
                    var a = 2 === n.button;
                    this.emit(a ? "rightdown" : "mousedown", this.eventData);
                  }
                }
              }
            }),
            (e.prototype.processPointerDown = function (t, e, r) {
              var i = t.data,
                n = t.data.identifier;
              if (r)
                if (
                  (e.trackedPointers[n] || (e.trackedPointers[n] = new l(n)),
                  this.dispatchEvent(e, "pointerdown", t),
                  "touch" === i.pointerType)
                )
                  this.dispatchEvent(e, "touchstart", t);
                else if ("mouse" === i.pointerType || "pen" === i.pointerType) {
                  var o = 2 === i.button;
                  o
                    ? (e.trackedPointers[n].rightDown = !0)
                    : (e.trackedPointers[n].leftDown = !0),
                    this.dispatchEvent(e, o ? "rightdown" : "mousedown", t);
                }
            }),
            (e.prototype.onPointerComplete = function (t, e, r) {
              for (
                var i = this.normalizeToPointerData(t),
                  n = i.length,
                  o = t.target !== this.interactionDOMElement ? "outside" : "",
                  s = 0;
                s < n;
                s++
              ) {
                var a = i[s],
                  h = this.getInteractionDataForPointerId(a),
                  u = this.configureInteractionEventForDOMEvent(
                    this.eventData,
                    a,
                    h
                  );
                if (
                  ((u.data.originalEvent = t),
                  this.processInteractive(
                    u,
                    this.lastObjectRendered,
                    r,
                    e || !o
                  ),
                  this.emit(e ? "pointercancel" : "pointerup" + o, u),
                  "mouse" === a.pointerType || "pen" === a.pointerType)
                ) {
                  var l = 2 === a.button;
                  this.emit(l ? "rightup" + o : "mouseup" + o, u);
                } else
                  "touch" === a.pointerType &&
                    (this.emit(e ? "touchcancel" : "touchend" + o, u),
                    this.releaseInteractionDataForPointerId(a.pointerId));
              }
            }),
            (e.prototype.onPointerCancel = function (t) {
              (this.supportsTouchEvents && "touch" === t.pointerType) ||
                this.onPointerComplete(t, !0, this.processPointerCancel);
            }),
            (e.prototype.processPointerCancel = function (t, e) {
              var r = t.data,
                i = t.data.identifier;
              void 0 !== e.trackedPointers[i] &&
                (delete e.trackedPointers[i],
                this.dispatchEvent(e, "pointercancel", t),
                "touch" === r.pointerType &&
                  this.dispatchEvent(e, "touchcancel", t));
            }),
            (e.prototype.onPointerUp = function (t) {
              (this.supportsTouchEvents && "touch" === t.pointerType) ||
                this.onPointerComplete(t, !1, this.processPointerUp);
            }),
            (e.prototype.processPointerUp = function (t, e, r) {
              var i = t.data,
                n = t.data.identifier,
                o = e.trackedPointers[n],
                s = "touch" === i.pointerType,
                a = "mouse" === i.pointerType || "pen" === i.pointerType,
                h = !1;
              if (a) {
                var u = 2 === i.button,
                  c = l.FLAGS,
                  d = u ? c.RIGHT_DOWN : c.LEFT_DOWN,
                  p = void 0 !== o && o.flags & d;
                r
                  ? (this.dispatchEvent(e, u ? "rightup" : "mouseup", t),
                    p &&
                      (this.dispatchEvent(e, u ? "rightclick" : "click", t),
                      (h = !0)))
                  : p &&
                    this.dispatchEvent(
                      e,
                      u ? "rightupoutside" : "mouseupoutside",
                      t
                    ),
                  o && (u ? (o.rightDown = !1) : (o.leftDown = !1));
              }
              r
                ? (this.dispatchEvent(e, "pointerup", t),
                  s && this.dispatchEvent(e, "touchend", t),
                  o &&
                    ((a && !h) || this.dispatchEvent(e, "pointertap", t),
                    s && (this.dispatchEvent(e, "tap", t), (o.over = !1))))
                : o &&
                  (this.dispatchEvent(e, "pointerupoutside", t),
                  s && this.dispatchEvent(e, "touchendoutside", t)),
                o && o.none && delete e.trackedPointers[n];
            }),
            (e.prototype.onPointerMove = function (t) {
              if (!this.supportsTouchEvents || "touch" !== t.pointerType) {
                var e = this.normalizeToPointerData(t);
                ("mouse" !== e[0].pointerType && "pen" !== e[0].pointerType) ||
                  ((this._didMove = !0), (this.cursor = null));
                for (var r = e.length, i = 0; i < r; i++) {
                  var n = e[i],
                    o = this.getInteractionDataForPointerId(n),
                    s = this.configureInteractionEventForDOMEvent(
                      this.eventData,
                      n,
                      o
                    );
                  (s.data.originalEvent = t),
                    this.processInteractive(
                      s,
                      this.lastObjectRendered,
                      this.processPointerMove,
                      !0
                    ),
                    this.emit("pointermove", s),
                    "touch" === n.pointerType && this.emit("touchmove", s),
                    ("mouse" !== n.pointerType && "pen" !== n.pointerType) ||
                      this.emit("mousemove", s);
                }
                "mouse" === e[0].pointerType && this.setCursorMode(this.cursor);
              }
            }),
            (e.prototype.processPointerMove = function (t, e, r) {
              var i = t.data,
                n = "touch" === i.pointerType,
                o = "mouse" === i.pointerType || "pen" === i.pointerType;
              o && this.processPointerOverOut(t, e, r),
                (this.moveWhenInside && !r) ||
                  (this.dispatchEvent(e, "pointermove", t),
                  n && this.dispatchEvent(e, "touchmove", t),
                  o && this.dispatchEvent(e, "mousemove", t));
            }),
            (e.prototype.onPointerOut = function (t) {
              if (!this.supportsTouchEvents || "touch" !== t.pointerType) {
                var e = this.normalizeToPointerData(t)[0];
                "mouse" === e.pointerType &&
                  ((this.mouseOverRenderer = !1), this.setCursorMode(null));
                var r = this.getInteractionDataForPointerId(e),
                  i = this.configureInteractionEventForDOMEvent(
                    this.eventData,
                    e,
                    r
                  );
                (i.data.originalEvent = e),
                  this.processInteractive(
                    i,
                    this.lastObjectRendered,
                    this.processPointerOverOut,
                    !1
                  ),
                  this.emit("pointerout", i),
                  "mouse" === e.pointerType || "pen" === e.pointerType
                    ? this.emit("mouseout", i)
                    : this.releaseInteractionDataForPointerId(r.identifier);
              }
            }),
            (e.prototype.processPointerOverOut = function (t, e, r) {
              var i = t.data,
                n = t.data.identifier,
                o = "mouse" === i.pointerType || "pen" === i.pointerType,
                s = e.trackedPointers[n];
              r && !s && (s = e.trackedPointers[n] = new l(n)),
                void 0 !== s &&
                  (r && this.mouseOverRenderer
                    ? (s.over ||
                        ((s.over = !0),
                        this.delayDispatchEvent(e, "pointerover", t),
                        o && this.delayDispatchEvent(e, "mouseover", t)),
                      o && null === this.cursor && (this.cursor = e.cursor))
                    : s.over &&
                      ((s.over = !1),
                      this.dispatchEvent(e, "pointerout", this.eventData),
                      o && this.dispatchEvent(e, "mouseout", t),
                      s.none && delete e.trackedPointers[n]));
            }),
            (e.prototype.onPointerOver = function (t) {
              var e = this.normalizeToPointerData(t)[0],
                r = this.getInteractionDataForPointerId(e),
                i = this.configureInteractionEventForDOMEvent(
                  this.eventData,
                  e,
                  r
                );
              (i.data.originalEvent = e),
                "mouse" === e.pointerType && (this.mouseOverRenderer = !0),
                this.emit("pointerover", i),
                ("mouse" !== e.pointerType && "pen" !== e.pointerType) ||
                  this.emit("mouseover", i);
            }),
            (e.prototype.getInteractionDataForPointerId = function (t) {
              var e,
                r = t.pointerId;
              return (
                1 === r || "mouse" === t.pointerType
                  ? (e = this.mouse)
                  : this.activeInteractionData[r]
                  ? (e = this.activeInteractionData[r])
                  : (((e =
                      this.interactionDataPool.pop() || new a()).identifier =
                      r),
                    (this.activeInteractionData[r] = e)),
                e.copyEvent(t),
                e
              );
            }),
            (e.prototype.releaseInteractionDataForPointerId = function (t) {
              var e = this.activeInteractionData[t];
              e &&
                (delete this.activeInteractionData[t],
                e.reset(),
                this.interactionDataPool.push(e));
            }),
            (e.prototype.configureInteractionEventForDOMEvent = function (
              t,
              e,
              r
            ) {
              return (
                (t.data = r),
                this.mapPositionToPoint(r.global, e.clientX, e.clientY),
                "touch" === e.pointerType &&
                  ((e.globalX = r.global.x), (e.globalY = r.global.y)),
                (r.originalEvent = e),
                t.reset(),
                t
              );
            }),
            (e.prototype.normalizeToPointerData = function (t) {
              var e = [];
              if (this.supportsTouchEvents && t instanceof TouchEvent)
                for (var r = 0, i = t.changedTouches.length; r < i; r++) {
                  var n = t.changedTouches[r];
                  void 0 === n.button && (n.button = t.touches.length ? 1 : 0),
                    void 0 === n.buttons &&
                      (n.buttons = t.touches.length ? 1 : 0),
                    void 0 === n.isPrimary &&
                      (n.isPrimary =
                        1 === t.touches.length && "touchstart" === t.type),
                    void 0 === n.width && (n.width = n.radiusX || 1),
                    void 0 === n.height && (n.height = n.radiusY || 1),
                    void 0 === n.tiltX && (n.tiltX = 0),
                    void 0 === n.tiltY && (n.tiltY = 0),
                    void 0 === n.pointerType && (n.pointerType = "touch"),
                    void 0 === n.pointerId && (n.pointerId = n.identifier || 0),
                    void 0 === n.pressure && (n.pressure = n.force || 0.5),
                    void 0 === n.twist && (n.twist = 0),
                    void 0 === n.tangentialPressure &&
                      (n.tangentialPressure = 0),
                    void 0 === n.layerX && (n.layerX = n.offsetX = n.clientX),
                    void 0 === n.layerY && (n.layerY = n.offsetY = n.clientY),
                    (n.isNormalized = !0),
                    e.push(n);
                }
              else if (
                !(t instanceof MouseEvent) ||
                (this.supportsPointerEvents && t instanceof window.PointerEvent)
              )
                e.push(t);
              else {
                var o = t;
                void 0 === o.isPrimary && (o.isPrimary = !0),
                  void 0 === o.width && (o.width = 1),
                  void 0 === o.height && (o.height = 1),
                  void 0 === o.tiltX && (o.tiltX = 0),
                  void 0 === o.tiltY && (o.tiltY = 0),
                  void 0 === o.pointerType && (o.pointerType = "mouse"),
                  void 0 === o.pointerId && (o.pointerId = 1),
                  void 0 === o.pressure && (o.pressure = 0.5),
                  void 0 === o.twist && (o.twist = 0),
                  void 0 === o.tangentialPressure && (o.tangentialPressure = 0),
                  (o.isNormalized = !0),
                  e.push(o);
              }
              return e;
            }),
            (e.prototype.destroy = function () {
              this.removeEvents(),
                this.removeTickerListener(),
                this.removeAllListeners(),
                (this.renderer = null),
                (this.mouse = null),
                (this.eventData = null),
                (this.interactionDOMElement = null),
                (this.onPointerDown = null),
                (this.processPointerDown = null),
                (this.onPointerUp = null),
                (this.processPointerUp = null),
                (this.onPointerCancel = null),
                (this.processPointerCancel = null),
                (this.onPointerMove = null),
                (this.processPointerMove = null),
                (this.onPointerOut = null),
                (this.processPointerOverOut = null),
                (this.onPointerOver = null),
                (this.search = null);
            }),
            e
          );
        })(s.EventEmitter);
    },
    7235: (t, e, r) => {
      r.d(e, { LP: () => u, aN: () => h, dp: () => a, kC: () => o });
      var i = r(8391),
        n = r(5307),
        o = i._z,
        s = function (t, e) {
          return (
            (s =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (t, e) {
                  t.__proto__ = e;
                }) ||
              function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
              }),
            s(t, e)
          );
        },
        a = (function () {
          function t() {}
          return (
            (t.use = function (t, e) {
              t.data &&
                t.type === i._z.TYPE.IMAGE &&
                (t.texture = n.xE.fromLoader(t.data, t.url, t.name)),
                e();
            }),
            t
          );
        })(),
        h = (function (t) {
          function e(r, i) {
            for (
              var n = t.call(this, r, i) || this, o = 0;
              o < e._plugins.length;
              ++o
            ) {
              var s = e._plugins[o],
                a = s.pre,
                h = s.use;
              a && n.pre(a), h && n.use(h);
            }
            return (n._protected = !1), n;
          }
          return (
            (function (t, e) {
              function r() {
                this.constructor = t;
              }
              s(t, e),
                (t.prototype =
                  null === e
                    ? Object.create(e)
                    : ((r.prototype = e.prototype), new r()));
            })(e, t),
            (e.prototype.destroy = function () {
              this._protected || this.reset();
            }),
            Object.defineProperty(e, "shared", {
              get: function () {
                var t = e._shared;
                return (
                  t || (((t = new e())._protected = !0), (e._shared = t)), t
                );
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.registerPlugin = function (t) {
              return e._plugins.push(t), t.add && t.add(), e;
            }),
            (e._plugins = []),
            e
          );
        })(i.aN);
      h.registerPlugin({ use: i.qR.parsing }), h.registerPlugin(a);
      var u = (function () {
        function t() {}
        return (
          (t.init = function (t) {
            (t = Object.assign({ sharedLoader: !1 }, t)),
              (this.loader = t.sharedLoader ? h.shared : new h());
          }),
          (t.destroy = function () {
            this.loader && (this.loader.destroy(), (this.loader = null));
          }),
          t
        );
      })();
    },
    4295: (t, e, r) => {
      r.d(e, {
        AB: () => p,
        Ae: () => a,
        Cd: () => h,
        E9: () => d,
        HS: () => i,
        Lv: () => T,
        Pj: () => u,
        ZX: () => s,
        _b: () => n,
        c9: () => c,
        jl: () => o,
        mg: () => l,
        wx: () => E,
        y3: () => f,
      });
      var i,
        n = 2 * Math.PI,
        o = 180 / Math.PI,
        s = Math.PI / 180;
      !(function (t) {
        (t[(t.POLY = 0)] = "POLY"),
          (t[(t.RECT = 1)] = "RECT"),
          (t[(t.CIRC = 2)] = "CIRC"),
          (t[(t.ELIP = 3)] = "ELIP"),
          (t[(t.RREC = 4)] = "RREC");
      })(i || (i = {}));
      var a = (function () {
          function t(t, e, r, n) {
            void 0 === t && (t = 0),
              void 0 === e && (e = 0),
              void 0 === r && (r = 0),
              void 0 === n && (n = 0),
              (this.x = Number(t)),
              (this.y = Number(e)),
              (this.width = Number(r)),
              (this.height = Number(n)),
              (this.type = i.RECT);
          }
          return (
            Object.defineProperty(t.prototype, "left", {
              get: function () {
                return this.x;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "right", {
              get: function () {
                return this.x + this.width;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "top", {
              get: function () {
                return this.y;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "bottom", {
              get: function () {
                return this.y + this.height;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t, "EMPTY", {
              get: function () {
                return new t(0, 0, 0, 0);
              },
              enumerable: !1,
              configurable: !0,
            }),
            (t.prototype.clone = function () {
              return new t(this.x, this.y, this.width, this.height);
            }),
            (t.prototype.copyFrom = function (t) {
              return (
                (this.x = t.x),
                (this.y = t.y),
                (this.width = t.width),
                (this.height = t.height),
                this
              );
            }),
            (t.prototype.copyTo = function (t) {
              return (
                (t.x = this.x),
                (t.y = this.y),
                (t.width = this.width),
                (t.height = this.height),
                t
              );
            }),
            (t.prototype.contains = function (t, e) {
              return (
                !(this.width <= 0 || this.height <= 0) &&
                t >= this.x &&
                t < this.x + this.width &&
                e >= this.y &&
                e < this.y + this.height
              );
            }),
            (t.prototype.pad = function (t, e) {
              return (
                void 0 === t && (t = 0),
                void 0 === e && (e = t),
                (this.x -= t),
                (this.y -= e),
                (this.width += 2 * t),
                (this.height += 2 * e),
                this
              );
            }),
            (t.prototype.fit = function (t) {
              var e = Math.max(this.x, t.x),
                r = Math.min(this.x + this.width, t.x + t.width),
                i = Math.max(this.y, t.y),
                n = Math.min(this.y + this.height, t.y + t.height);
              return (
                (this.x = e),
                (this.width = Math.max(r - e, 0)),
                (this.y = i),
                (this.height = Math.max(n - i, 0)),
                this
              );
            }),
            (t.prototype.ceil = function (t, e) {
              void 0 === t && (t = 1), void 0 === e && (e = 0.001);
              var r = Math.ceil((this.x + this.width - e) * t) / t,
                i = Math.ceil((this.y + this.height - e) * t) / t;
              return (
                (this.x = Math.floor((this.x + e) * t) / t),
                (this.y = Math.floor((this.y + e) * t) / t),
                (this.width = r - this.x),
                (this.height = i - this.y),
                this
              );
            }),
            (t.prototype.enlarge = function (t) {
              var e = Math.min(this.x, t.x),
                r = Math.max(this.x + this.width, t.x + t.width),
                i = Math.min(this.y, t.y),
                n = Math.max(this.y + this.height, t.y + t.height);
              return (
                (this.x = e),
                (this.width = r - e),
                (this.y = i),
                (this.height = n - i),
                this
              );
            }),
            t
          );
        })(),
        h = (function () {
          function t(t, e, r) {
            void 0 === t && (t = 0),
              void 0 === e && (e = 0),
              void 0 === r && (r = 0),
              (this.x = t),
              (this.y = e),
              (this.radius = r),
              (this.type = i.CIRC);
          }
          return (
            (t.prototype.clone = function () {
              return new t(this.x, this.y, this.radius);
            }),
            (t.prototype.contains = function (t, e) {
              if (this.radius <= 0) return !1;
              var r = this.radius * this.radius,
                i = this.x - t,
                n = this.y - e;
              return (i *= i) + (n *= n) <= r;
            }),
            (t.prototype.getBounds = function () {
              return new a(
                this.x - this.radius,
                this.y - this.radius,
                2 * this.radius,
                2 * this.radius
              );
            }),
            t
          );
        })(),
        u = (function () {
          function t(t, e, r, n) {
            void 0 === t && (t = 0),
              void 0 === e && (e = 0),
              void 0 === r && (r = 0),
              void 0 === n && (n = 0),
              (this.x = t),
              (this.y = e),
              (this.width = r),
              (this.height = n),
              (this.type = i.ELIP);
          }
          return (
            (t.prototype.clone = function () {
              return new t(this.x, this.y, this.width, this.height);
            }),
            (t.prototype.contains = function (t, e) {
              if (this.width <= 0 || this.height <= 0) return !1;
              var r = (t - this.x) / this.width,
                i = (e - this.y) / this.height;
              return (r *= r) + (i *= i) <= 1;
            }),
            (t.prototype.getBounds = function () {
              return new a(
                this.x - this.width,
                this.y - this.height,
                this.width,
                this.height
              );
            }),
            t
          );
        })(),
        l = (function () {
          function t() {
            for (var t = arguments, e = [], r = 0; r < arguments.length; r++)
              e[r] = t[r];
            var n = Array.isArray(e[0]) ? e[0] : e;
            if ("number" != typeof n[0]) {
              for (var o = [], s = 0, a = n.length; s < a; s++)
                o.push(n[s].x, n[s].y);
              n = o;
            }
            (this.points = n), (this.type = i.POLY), (this.closeStroke = !0);
          }
          return (
            (t.prototype.clone = function () {
              var e = new t(this.points.slice());
              return (e.closeStroke = this.closeStroke), e;
            }),
            (t.prototype.contains = function (t, e) {
              for (
                var r = !1, i = this.points.length / 2, n = 0, o = i - 1;
                n < i;
                o = n++
              ) {
                var s = this.points[2 * n],
                  a = this.points[2 * n + 1],
                  h = this.points[2 * o],
                  u = this.points[2 * o + 1];
                a > e != u > e &&
                  t < ((e - a) / (u - a)) * (h - s) + s &&
                  (r = !r);
              }
              return r;
            }),
            t
          );
        })(),
        c = (function () {
          function t(t, e, r, n, o) {
            void 0 === t && (t = 0),
              void 0 === e && (e = 0),
              void 0 === r && (r = 0),
              void 0 === n && (n = 0),
              void 0 === o && (o = 20),
              (this.x = t),
              (this.y = e),
              (this.width = r),
              (this.height = n),
              (this.radius = o),
              (this.type = i.RREC);
          }
          return (
            (t.prototype.clone = function () {
              return new t(
                this.x,
                this.y,
                this.width,
                this.height,
                this.radius
              );
            }),
            (t.prototype.contains = function (t, e) {
              if (this.width <= 0 || this.height <= 0) return !1;
              if (
                t >= this.x &&
                t <= this.x + this.width &&
                e >= this.y &&
                e <= this.y + this.height
              ) {
                if (
                  (e >= this.y + this.radius &&
                    e <= this.y + this.height - this.radius) ||
                  (t >= this.x + this.radius &&
                    t <= this.x + this.width - this.radius)
                )
                  return !0;
                var r = t - (this.x + this.radius),
                  i = e - (this.y + this.radius),
                  n = this.radius * this.radius;
                if (r * r + i * i <= n) return !0;
                if (
                  (r = t - (this.x + this.width - this.radius)) * r + i * i <=
                  n
                )
                  return !0;
                if (
                  r * r + (i = e - (this.y + this.height - this.radius)) * i <=
                  n
                )
                  return !0;
                if ((r = t - (this.x + this.radius)) * r + i * i <= n)
                  return !0;
              }
              return !1;
            }),
            t
          );
        })(),
        d = (function () {
          function t(t, e) {
            void 0 === t && (t = 0),
              void 0 === e && (e = 0),
              (this.x = t),
              (this.y = e);
          }
          return (
            (t.prototype.clone = function () {
              return new t(this.x, this.y);
            }),
            (t.prototype.copyFrom = function (t) {
              return this.set(t.x, t.y), this;
            }),
            (t.prototype.copyTo = function (t) {
              return t.set(this.x, this.y), t;
            }),
            (t.prototype.equals = function (t) {
              return t.x === this.x && t.y === this.y;
            }),
            (t.prototype.set = function (t, e) {
              return (
                void 0 === t && (t = 0),
                void 0 === e && (e = t),
                (this.x = t),
                (this.y = e),
                this
              );
            }),
            t
          );
        })(),
        p = (function () {
          function t(t, e, r, i) {
            void 0 === r && (r = 0),
              void 0 === i && (i = 0),
              (this._x = r),
              (this._y = i),
              (this.cb = t),
              (this.scope = e);
          }
          return (
            (t.prototype.clone = function (e, r) {
              return (
                void 0 === e && (e = this.cb),
                void 0 === r && (r = this.scope),
                new t(e, r, this._x, this._y)
              );
            }),
            (t.prototype.set = function (t, e) {
              return (
                void 0 === t && (t = 0),
                void 0 === e && (e = t),
                (this._x === t && this._y === e) ||
                  ((this._x = t), (this._y = e), this.cb.call(this.scope)),
                this
              );
            }),
            (t.prototype.copyFrom = function (t) {
              return (
                (this._x === t.x && this._y === t.y) ||
                  ((this._x = t.x), (this._y = t.y), this.cb.call(this.scope)),
                this
              );
            }),
            (t.prototype.copyTo = function (t) {
              return t.set(this._x, this._y), t;
            }),
            (t.prototype.equals = function (t) {
              return t.x === this._x && t.y === this._y;
            }),
            Object.defineProperty(t.prototype, "x", {
              get: function () {
                return this._x;
              },
              set: function (t) {
                this._x !== t && ((this._x = t), this.cb.call(this.scope));
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "y", {
              get: function () {
                return this._y;
              },
              set: function (t) {
                this._y !== t && ((this._y = t), this.cb.call(this.scope));
              },
              enumerable: !1,
              configurable: !0,
            }),
            t
          );
        })(),
        f = (function () {
          function t(t, e, r, i, n, o) {
            void 0 === t && (t = 1),
              void 0 === e && (e = 0),
              void 0 === r && (r = 0),
              void 0 === i && (i = 1),
              void 0 === n && (n = 0),
              void 0 === o && (o = 0),
              (this.array = null),
              (this.a = t),
              (this.b = e),
              (this.c = r),
              (this.d = i),
              (this.tx = n),
              (this.ty = o);
          }
          return (
            (t.prototype.fromArray = function (t) {
              (this.a = t[0]),
                (this.b = t[1]),
                (this.c = t[3]),
                (this.d = t[4]),
                (this.tx = t[2]),
                (this.ty = t[5]);
            }),
            (t.prototype.set = function (t, e, r, i, n, o) {
              return (
                (this.a = t),
                (this.b = e),
                (this.c = r),
                (this.d = i),
                (this.tx = n),
                (this.ty = o),
                this
              );
            }),
            (t.prototype.toArray = function (t, e) {
              this.array || (this.array = new Float32Array(9));
              var r = e || this.array;
              return (
                t
                  ? ((r[0] = this.a),
                    (r[1] = this.b),
                    (r[2] = 0),
                    (r[3] = this.c),
                    (r[4] = this.d),
                    (r[5] = 0),
                    (r[6] = this.tx),
                    (r[7] = this.ty),
                    (r[8] = 1))
                  : ((r[0] = this.a),
                    (r[1] = this.c),
                    (r[2] = this.tx),
                    (r[3] = this.b),
                    (r[4] = this.d),
                    (r[5] = this.ty),
                    (r[6] = 0),
                    (r[7] = 0),
                    (r[8] = 1)),
                r
              );
            }),
            (t.prototype.apply = function (t, e) {
              e = e || new d();
              var r = t.x,
                i = t.y;
              return (
                (e.x = this.a * r + this.c * i + this.tx),
                (e.y = this.b * r + this.d * i + this.ty),
                e
              );
            }),
            (t.prototype.applyInverse = function (t, e) {
              e = e || new d();
              var r = 1 / (this.a * this.d + this.c * -this.b),
                i = t.x,
                n = t.y;
              return (
                (e.x =
                  this.d * r * i +
                  -this.c * r * n +
                  (this.ty * this.c - this.tx * this.d) * r),
                (e.y =
                  this.a * r * n +
                  -this.b * r * i +
                  (-this.ty * this.a + this.tx * this.b) * r),
                e
              );
            }),
            (t.prototype.translate = function (t, e) {
              return (this.tx += t), (this.ty += e), this;
            }),
            (t.prototype.scale = function (t, e) {
              return (
                (this.a *= t),
                (this.d *= e),
                (this.c *= t),
                (this.b *= e),
                (this.tx *= t),
                (this.ty *= e),
                this
              );
            }),
            (t.prototype.rotate = function (t) {
              var e = Math.cos(t),
                r = Math.sin(t),
                i = this.a,
                n = this.c,
                o = this.tx;
              return (
                (this.a = i * e - this.b * r),
                (this.b = i * r + this.b * e),
                (this.c = n * e - this.d * r),
                (this.d = n * r + this.d * e),
                (this.tx = o * e - this.ty * r),
                (this.ty = o * r + this.ty * e),
                this
              );
            }),
            (t.prototype.append = function (t) {
              var e = this.a,
                r = this.b,
                i = this.c,
                n = this.d;
              return (
                (this.a = t.a * e + t.b * i),
                (this.b = t.a * r + t.b * n),
                (this.c = t.c * e + t.d * i),
                (this.d = t.c * r + t.d * n),
                (this.tx = t.tx * e + t.ty * i + this.tx),
                (this.ty = t.tx * r + t.ty * n + this.ty),
                this
              );
            }),
            (t.prototype.setTransform = function (t, e, r, i, n, o, s, a, h) {
              return (
                (this.a = Math.cos(s + h) * n),
                (this.b = Math.sin(s + h) * n),
                (this.c = -Math.sin(s - a) * o),
                (this.d = Math.cos(s - a) * o),
                (this.tx = t - (r * this.a + i * this.c)),
                (this.ty = e - (r * this.b + i * this.d)),
                this
              );
            }),
            (t.prototype.prepend = function (t) {
              var e = this.tx;
              if (1 !== t.a || 0 !== t.b || 0 !== t.c || 1 !== t.d) {
                var r = this.a,
                  i = this.c;
                (this.a = r * t.a + this.b * t.c),
                  (this.b = r * t.b + this.b * t.d),
                  (this.c = i * t.a + this.d * t.c),
                  (this.d = i * t.b + this.d * t.d);
              }
              return (
                (this.tx = e * t.a + this.ty * t.c + t.tx),
                (this.ty = e * t.b + this.ty * t.d + t.ty),
                this
              );
            }),
            (t.prototype.decompose = function (t) {
              var e = this.a,
                r = this.b,
                i = this.c,
                o = this.d,
                s = -Math.atan2(-i, o),
                a = Math.atan2(r, e),
                h = Math.abs(s + a);
              return (
                h < 1e-5 || Math.abs(n - h) < 1e-5
                  ? ((t.rotation = a), (t.skew.x = t.skew.y = 0))
                  : ((t.rotation = 0), (t.skew.x = s), (t.skew.y = a)),
                (t.scale.x = Math.sqrt(e * e + r * r)),
                (t.scale.y = Math.sqrt(i * i + o * o)),
                (t.position.x = this.tx),
                (t.position.y = this.ty),
                t
              );
            }),
            (t.prototype.invert = function () {
              var t = this.a,
                e = this.b,
                r = this.c,
                i = this.d,
                n = this.tx,
                o = t * i - e * r;
              return (
                (this.a = i / o),
                (this.b = -e / o),
                (this.c = -r / o),
                (this.d = t / o),
                (this.tx = (r * this.ty - i * n) / o),
                (this.ty = -(t * this.ty - e * n) / o),
                this
              );
            }),
            (t.prototype.identity = function () {
              return (
                (this.a = 1),
                (this.b = 0),
                (this.c = 0),
                (this.d = 1),
                (this.tx = 0),
                (this.ty = 0),
                this
              );
            }),
            (t.prototype.clone = function () {
              var e = new t();
              return (
                (e.a = this.a),
                (e.b = this.b),
                (e.c = this.c),
                (e.d = this.d),
                (e.tx = this.tx),
                (e.ty = this.ty),
                e
              );
            }),
            (t.prototype.copyTo = function (t) {
              return (
                (t.a = this.a),
                (t.b = this.b),
                (t.c = this.c),
                (t.d = this.d),
                (t.tx = this.tx),
                (t.ty = this.ty),
                t
              );
            }),
            (t.prototype.copyFrom = function (t) {
              return (
                (this.a = t.a),
                (this.b = t.b),
                (this.c = t.c),
                (this.d = t.d),
                (this.tx = t.tx),
                (this.ty = t.ty),
                this
              );
            }),
            Object.defineProperty(t, "IDENTITY", {
              get: function () {
                return new t();
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t, "TEMP_MATRIX", {
              get: function () {
                return new t();
              },
              enumerable: !1,
              configurable: !0,
            }),
            t
          );
        })(),
        m = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1],
        v = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1],
        y = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1],
        g = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1],
        _ = [],
        b = [],
        x = Math.sign;
      !(function () {
        for (var t = 0; t < 16; t++) {
          var e = [];
          _.push(e);
          for (var r = 0; r < 16; r++)
            for (
              var i = x(m[t] * m[r] + y[t] * v[r]),
                n = x(v[t] * m[r] + g[t] * v[r]),
                o = x(m[t] * y[r] + y[t] * g[r]),
                s = x(v[t] * y[r] + g[t] * g[r]),
                a = 0;
              a < 16;
              a++
            )
              if (m[a] === i && v[a] === n && y[a] === o && g[a] === s) {
                e.push(a);
                break;
              }
        }
        for (t = 0; t < 16; t++) {
          var h = new f();
          h.set(m[t], v[t], y[t], g[t], 0, 0), b.push(h);
        }
      })();
      var T = {
          E: 0,
          SE: 1,
          S: 2,
          SW: 3,
          W: 4,
          NW: 5,
          N: 6,
          NE: 7,
          MIRROR_VERTICAL: 8,
          MAIN_DIAGONAL: 10,
          MIRROR_HORIZONTAL: 12,
          REVERSE_DIAGONAL: 14,
          uX: function (t) {
            return m[t];
          },
          uY: function (t) {
            return v[t];
          },
          vX: function (t) {
            return y[t];
          },
          vY: function (t) {
            return g[t];
          },
          inv: function (t) {
            return 8 & t ? 15 & t : 7 & -t;
          },
          add: function (t, e) {
            return _[t][e];
          },
          sub: function (t, e) {
            return _[t][T.inv(e)];
          },
          rotate180: function (t) {
            return 4 ^ t;
          },
          isVertical: function (t) {
            return 2 == (3 & t);
          },
          byDirection: function (t, e) {
            return 2 * Math.abs(t) <= Math.abs(e)
              ? e >= 0
                ? T.S
                : T.N
              : 2 * Math.abs(e) <= Math.abs(t)
              ? t > 0
                ? T.E
                : T.W
              : e > 0
              ? t > 0
                ? T.SE
                : T.SW
              : t > 0
              ? T.NE
              : T.NW;
          },
          matrixAppendRotationInv: function (t, e, r, i) {
            void 0 === r && (r = 0), void 0 === i && (i = 0);
            var n = b[T.inv(e)];
            (n.tx = r), (n.ty = i), t.append(n);
          },
        },
        E = (function () {
          function t() {
            (this.worldTransform = new f()),
              (this.localTransform = new f()),
              (this.position = new p(this.onChange, this, 0, 0)),
              (this.scale = new p(this.onChange, this, 1, 1)),
              (this.pivot = new p(this.onChange, this, 0, 0)),
              (this.skew = new p(this.updateSkew, this, 0, 0)),
              (this._rotation = 0),
              (this._cx = 1),
              (this._sx = 0),
              (this._cy = 0),
              (this._sy = 1),
              (this._localID = 0),
              (this._currentLocalID = 0),
              (this._worldID = 0),
              (this._parentID = 0);
          }
          return (
            (t.prototype.onChange = function () {
              this._localID++;
            }),
            (t.prototype.updateSkew = function () {
              (this._cx = Math.cos(this._rotation + this.skew.y)),
                (this._sx = Math.sin(this._rotation + this.skew.y)),
                (this._cy = -Math.sin(this._rotation - this.skew.x)),
                (this._sy = Math.cos(this._rotation - this.skew.x)),
                this._localID++;
            }),
            (t.prototype.updateLocalTransform = function () {
              var t = this.localTransform;
              this._localID !== this._currentLocalID &&
                ((t.a = this._cx * this.scale.x),
                (t.b = this._sx * this.scale.x),
                (t.c = this._cy * this.scale.y),
                (t.d = this._sy * this.scale.y),
                (t.tx =
                  this.position.x - (this.pivot.x * t.a + this.pivot.y * t.c)),
                (t.ty =
                  this.position.y - (this.pivot.x * t.b + this.pivot.y * t.d)),
                (this._currentLocalID = this._localID),
                (this._parentID = -1));
            }),
            (t.prototype.updateTransform = function (t) {
              var e = this.localTransform;
              if (
                (this._localID !== this._currentLocalID &&
                  ((e.a = this._cx * this.scale.x),
                  (e.b = this._sx * this.scale.x),
                  (e.c = this._cy * this.scale.y),
                  (e.d = this._sy * this.scale.y),
                  (e.tx =
                    this.position.x -
                    (this.pivot.x * e.a + this.pivot.y * e.c)),
                  (e.ty =
                    this.position.y -
                    (this.pivot.x * e.b + this.pivot.y * e.d)),
                  (this._currentLocalID = this._localID),
                  (this._parentID = -1)),
                this._parentID !== t._worldID)
              ) {
                var r = t.worldTransform,
                  i = this.worldTransform;
                (i.a = e.a * r.a + e.b * r.c),
                  (i.b = e.a * r.b + e.b * r.d),
                  (i.c = e.c * r.a + e.d * r.c),
                  (i.d = e.c * r.b + e.d * r.d),
                  (i.tx = e.tx * r.a + e.ty * r.c + r.tx),
                  (i.ty = e.tx * r.b + e.ty * r.d + r.ty),
                  (this._parentID = t._worldID),
                  this._worldID++;
              }
            }),
            (t.prototype.setFromMatrix = function (t) {
              t.decompose(this), this._localID++;
            }),
            Object.defineProperty(t.prototype, "rotation", {
              get: function () {
                return this._rotation;
              },
              set: function (t) {
                this._rotation !== t &&
                  ((this._rotation = t), this.updateSkew());
              },
              enumerable: !1,
              configurable: !0,
            }),
            (t.IDENTITY = new t()),
            t
          );
        })();
    },
    9773: (t, e, r) => {
      r.d(e, {
        AL: () => d,
        Au: () => u,
        IE: () => l,
        VJ: () => c,
        ZT: () => p,
        _1: () => h,
      });
      var i = r(1473),
        n = r(7054),
        o = r(5307),
        s = function (t, e) {
          return (
            (s =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (t, e) {
                  t.__proto__ = e;
                }) ||
              function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
              }),
            s(t, e)
          );
        };
      function a(t, e) {
        function r() {
          this.constructor = t;
        }
        s(t, e),
          (t.prototype =
            null === e
              ? Object.create(e)
              : ((r.prototype = e.prototype), new r()));
      }
      var h = (function (t) {
          function e(e, r, i, n) {
            void 0 === e && (e = 100),
              void 0 === r && (r = 100),
              void 0 === i && (i = 10),
              void 0 === n && (n = 10);
            var o = t.call(this) || this;
            return (
              (o.segWidth = i),
              (o.segHeight = n),
              (o.width = e),
              (o.height = r),
              o.build(),
              o
            );
          }
          return (
            a(e, t),
            (e.prototype.build = function () {
              for (
                var t = this.segWidth * this.segHeight,
                  e = [],
                  r = [],
                  i = [],
                  n = this.segWidth - 1,
                  o = this.segHeight - 1,
                  s = this.width / n,
                  a = this.height / o,
                  h = 0;
                h < t;
                h++
              ) {
                var u = h % this.segWidth,
                  l = (h / this.segWidth) | 0;
                e.push(u * s, l * a), r.push(u / n, l / o);
              }
              var c = n * o;
              for (h = 0; h < c; h++) {
                var d = h % n,
                  p = (h / n) | 0,
                  f = p * this.segWidth + d,
                  m = p * this.segWidth + d + 1,
                  v = (p + 1) * this.segWidth + d,
                  y = (p + 1) * this.segWidth + d + 1;
                i.push(f, m, v, m, y, v);
              }
              (this.buffers[0].data = new Float32Array(e)),
                (this.buffers[1].data = new Float32Array(r)),
                (this.indexBuffer.data = new Uint16Array(i)),
                this.buffers[0].update(),
                this.buffers[1].update(),
                this.indexBuffer.update();
            }),
            e
          );
        })(i.xc),
        u = (function (t) {
          function e(e, r, i) {
            void 0 === e && (e = 200), void 0 === i && (i = 0);
            var n =
              t.call(
                this,
                new Float32Array(4 * r.length),
                new Float32Array(4 * r.length),
                new Uint16Array(6 * (r.length - 1))
              ) || this;
            return (
              (n.points = r), (n._width = e), (n.textureScale = i), n.build(), n
            );
          }
          return (
            a(e, t),
            Object.defineProperty(e.prototype, "width", {
              get: function () {
                return this._width;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.build = function () {
              var t = this.points;
              if (t) {
                var e = this.getBuffer("aVertexPosition"),
                  r = this.getBuffer("aTextureCoord"),
                  i = this.getIndex();
                if (!(t.length < 1)) {
                  e.data.length / 4 !== t.length &&
                    ((e.data = new Float32Array(4 * t.length)),
                    (r.data = new Float32Array(4 * t.length)),
                    (i.data = new Uint16Array(6 * (t.length - 1))));
                  var n = r.data,
                    o = i.data;
                  (n[0] = 0), (n[1] = 0), (n[2] = 0), (n[3] = 1);
                  for (
                    var s = 0,
                      a = t[0],
                      h = this._width * this.textureScale,
                      u = t.length,
                      l = 0;
                    l < u;
                    l++
                  ) {
                    var c = 4 * l;
                    if (this.textureScale > 0) {
                      var d = a.x - t[l].x,
                        p = a.y - t[l].y,
                        f = Math.sqrt(d * d + p * p);
                      (a = t[l]), (s += f / h);
                    } else s = l / (u - 1);
                    (n[c] = s), (n[c + 1] = 0), (n[c + 2] = s), (n[c + 3] = 1);
                  }
                  var m = 0;
                  for (l = 0; l < u - 1; l++)
                    (c = 2 * l),
                      (o[m++] = c),
                      (o[m++] = c + 1),
                      (o[m++] = c + 2),
                      (o[m++] = c + 2),
                      (o[m++] = c + 1),
                      (o[m++] = c + 3);
                  r.update(), i.update(), this.updateVertices();
                }
              }
            }),
            (e.prototype.updateVertices = function () {
              var t = this.points;
              if (!(t.length < 1)) {
                for (
                  var e,
                    r = t[0],
                    i = 0,
                    n = 0,
                    o = this.buffers[0].data,
                    s = t.length,
                    a = 0;
                  a < s;
                  a++
                ) {
                  var h = t[a],
                    u = 4 * a;
                  (n = -((e = a < t.length - 1 ? t[a + 1] : h).x - r.x)),
                    (i = e.y - r.y);
                  var l = Math.sqrt(i * i + n * n),
                    c =
                      this.textureScale > 0
                        ? (this.textureScale * this._width) / 2
                        : this._width / 2;
                  (i /= l),
                    (n /= l),
                    (i *= c),
                    (n *= c),
                    (o[u] = h.x + i),
                    (o[u + 1] = h.y + n),
                    (o[u + 2] = h.x - i),
                    (o[u + 3] = h.y - n),
                    (r = h);
                }
                this.buffers[0].update();
              }
            }),
            (e.prototype.update = function () {
              this.textureScale > 0 ? this.build() : this.updateVertices();
            }),
            e
          );
        })(i.xc),
        l = (function (t) {
          function e(e, r, o) {
            void 0 === o && (o = 0);
            var s = this,
              a = new u(e.height, r, o),
              h = new i.rY(e);
            return (
              o > 0 && (e.baseTexture.wrapMode = n.Nt.REPEAT),
              ((s = t.call(this, a, h) || this).autoUpdate = !0),
              s
            );
          }
          return (
            a(e, t),
            (e.prototype._render = function (e) {
              var r = this.geometry;
              (this.autoUpdate || r._width !== this.shader.texture.height) &&
                ((r._width = this.shader.texture.height), r.update()),
                t.prototype._render.call(this, e);
            }),
            e
          );
        })(i.Kj),
        c = (function (t) {
          function e(e, r, n) {
            var s = this,
              a = new h(e.width, e.height, r, n),
              u = new i.rY(o.xE.WHITE);
            return ((s = t.call(this, a, u) || this).texture = e), s;
          }
          return (
            a(e, t),
            (e.prototype.textureUpdated = function () {
              this._textureID = this.shader.texture._updateID;
              var t = this.geometry;
              (t.width = this.shader.texture.width),
                (t.height = this.shader.texture.height),
                t.build();
            }),
            Object.defineProperty(e.prototype, "texture", {
              get: function () {
                return this.shader.texture;
              },
              set: function (t) {
                this.shader.texture !== t &&
                  ((this.shader.texture = t),
                  (this._textureID = -1),
                  t.baseTexture.valid
                    ? this.textureUpdated()
                    : t.once("update", this.textureUpdated, this));
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype._render = function (e) {
              this._textureID !== this.shader.texture._updateID &&
                this.textureUpdated(),
                t.prototype._render.call(this, e);
            }),
            (e.prototype.destroy = function (e) {
              this.shader.texture.off("update", this.textureUpdated, this),
                t.prototype.destroy.call(this, e);
            }),
            e
          );
        })(i.Kj),
        d = (function (t) {
          function e(e, r, n, s, a) {
            void 0 === e && (e = o.xE.EMPTY);
            var h = this,
              u = new i.xc(r, n, s);
            u.getBuffer("aVertexPosition").static = !1;
            var l = new i.rY(e);
            return (
              ((h = t.call(this, u, l, null, a) || this).autoUpdate = !0), h
            );
          }
          return (
            a(e, t),
            Object.defineProperty(e.prototype, "vertices", {
              get: function () {
                return this.geometry.getBuffer("aVertexPosition").data;
              },
              set: function (t) {
                this.geometry.getBuffer("aVertexPosition").data = t;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype._render = function (e) {
              this.autoUpdate &&
                this.geometry.getBuffer("aVertexPosition").update(),
                t.prototype._render.call(this, e);
            }),
            e
          );
        })(i.Kj),
        p = (function (t) {
          function e(e, r, i, n, s) {
            void 0 === r && (r = 10),
              void 0 === i && (i = 10),
              void 0 === n && (n = 10),
              void 0 === s && (s = 10);
            var a = t.call(this, o.xE.WHITE, 4, 4) || this;
            return (
              (a._origWidth = e.orig.width),
              (a._origHeight = e.orig.height),
              (a._width = a._origWidth),
              (a._height = a._origHeight),
              (a._leftWidth = r),
              (a._rightWidth = n),
              (a._topHeight = i),
              (a._bottomHeight = s),
              (a.texture = e),
              a
            );
          }
          return (
            a(e, t),
            (e.prototype.textureUpdated = function () {
              (this._textureID = this.shader.texture._updateID),
                this._refresh();
            }),
            Object.defineProperty(e.prototype, "vertices", {
              get: function () {
                return this.geometry.getBuffer("aVertexPosition").data;
              },
              set: function (t) {
                this.geometry.getBuffer("aVertexPosition").data = t;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.updateHorizontalVertices = function () {
              var t = this.vertices,
                e = this._getMinScale();
              (t[9] = t[11] = t[13] = t[15] = this._topHeight * e),
                (t[17] =
                  t[19] =
                  t[21] =
                  t[23] =
                    this._height - this._bottomHeight * e),
                (t[25] = t[27] = t[29] = t[31] = this._height);
            }),
            (e.prototype.updateVerticalVertices = function () {
              var t = this.vertices,
                e = this._getMinScale();
              (t[2] = t[10] = t[18] = t[26] = this._leftWidth * e),
                (t[4] =
                  t[12] =
                  t[20] =
                  t[28] =
                    this._width - this._rightWidth * e),
                (t[6] = t[14] = t[22] = t[30] = this._width);
            }),
            (e.prototype._getMinScale = function () {
              var t = this._leftWidth + this._rightWidth,
                e = this._width > t ? 1 : this._width / t,
                r = this._topHeight + this._bottomHeight,
                i = this._height > r ? 1 : this._height / r;
              return Math.min(e, i);
            }),
            Object.defineProperty(e.prototype, "width", {
              get: function () {
                return this._width;
              },
              set: function (t) {
                (this._width = t), this._refresh();
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "height", {
              get: function () {
                return this._height;
              },
              set: function (t) {
                (this._height = t), this._refresh();
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "leftWidth", {
              get: function () {
                return this._leftWidth;
              },
              set: function (t) {
                (this._leftWidth = t), this._refresh();
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "rightWidth", {
              get: function () {
                return this._rightWidth;
              },
              set: function (t) {
                (this._rightWidth = t), this._refresh();
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "topHeight", {
              get: function () {
                return this._topHeight;
              },
              set: function (t) {
                (this._topHeight = t), this._refresh();
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "bottomHeight", {
              get: function () {
                return this._bottomHeight;
              },
              set: function (t) {
                (this._bottomHeight = t), this._refresh();
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype._refresh = function () {
              var t = this.texture,
                e = this.geometry.buffers[1].data;
              (this._origWidth = t.orig.width),
                (this._origHeight = t.orig.height);
              var r = 1 / this._origWidth,
                i = 1 / this._origHeight;
              (e[0] = e[8] = e[16] = e[24] = 0),
                (e[1] = e[3] = e[5] = e[7] = 0),
                (e[6] = e[14] = e[22] = e[30] = 1),
                (e[25] = e[27] = e[29] = e[31] = 1),
                (e[2] = e[10] = e[18] = e[26] = r * this._leftWidth),
                (e[4] = e[12] = e[20] = e[28] = 1 - r * this._rightWidth),
                (e[9] = e[11] = e[13] = e[15] = i * this._topHeight),
                (e[17] = e[19] = e[21] = e[23] = 1 - i * this._bottomHeight),
                this.updateHorizontalVertices(),
                this.updateVerticalVertices(),
                this.geometry.buffers[0].update(),
                this.geometry.buffers[1].update();
            }),
            e
          );
        })(c);
    },
    1473: (t, e, r) => {
      r.d(e, { Kj: () => f, rY: () => m, wQ: () => c, xc: () => v });
      var i = r(5307),
        n = r(4295),
        o = r(7054),
        s = r(29),
        a = r(1573),
        h = r(5323),
        u = function (t, e) {
          return (
            (u =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (t, e) {
                  t.__proto__ = e;
                }) ||
              function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
              }),
            u(t, e)
          );
        };
      function l(t, e) {
        function r() {
          this.constructor = t;
        }
        u(t, e),
          (t.prototype =
            null === e
              ? Object.create(e)
              : ((r.prototype = e.prototype), new r()));
      }
      var c = (function () {
          function t(t, e) {
            (this.uvBuffer = t),
              (this.uvMatrix = e),
              (this.data = null),
              (this._bufferUpdateId = -1),
              (this._textureUpdateId = -1),
              (this._updateID = 0);
          }
          return (
            (t.prototype.update = function (t) {
              if (
                t ||
                this._bufferUpdateId !== this.uvBuffer._updateID ||
                this._textureUpdateId !== this.uvMatrix._updateID
              ) {
                (this._bufferUpdateId = this.uvBuffer._updateID),
                  (this._textureUpdateId = this.uvMatrix._updateID);
                var e = this.uvBuffer.data;
                (this.data && this.data.length === e.length) ||
                  (this.data = new Float32Array(e.length)),
                  this.uvMatrix.multiplyUvs(e, this.data),
                  this._updateID++;
              }
            }),
            t
          );
        })(),
        d = new n.E9(),
        p = new n.mg(),
        f = (function (t) {
          function e(e, r, n, s) {
            void 0 === s && (s = o.lg.TRIANGLES);
            var h = t.call(this) || this;
            return (
              (h.geometry = e),
              e.refCount++,
              (h.shader = r),
              (h.state = n || i.ZM.for2d()),
              (h.drawMode = s),
              (h.start = 0),
              (h.size = 0),
              (h.uvs = null),
              (h.indices = null),
              (h.vertexData = new Float32Array(1)),
              (h.vertexDirty = 0),
              (h._transformID = -1),
              (h._roundPixels = a.X.ROUND_PIXELS),
              (h.batchUvs = null),
              h
            );
          }
          return (
            l(e, t),
            Object.defineProperty(e.prototype, "uvBuffer", {
              get: function () {
                return this.geometry.buffers[1];
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "verticesBuffer", {
              get: function () {
                return this.geometry.buffers[0];
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "material", {
              get: function () {
                return this.shader;
              },
              set: function (t) {
                this.shader = t;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "blendMode", {
              get: function () {
                return this.state.blendMode;
              },
              set: function (t) {
                this.state.blendMode = t;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "roundPixels", {
              get: function () {
                return this._roundPixels;
              },
              set: function (t) {
                this._roundPixels !== t && (this._transformID = -1),
                  (this._roundPixels = t);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "tint", {
              get: function () {
                return this.shader.tint;
              },
              set: function (t) {
                this.shader.tint = t;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "texture", {
              get: function () {
                return this.shader.texture;
              },
              set: function (t) {
                this.shader.texture = t;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype._render = function (t) {
              var r = this.geometry.buffers[0].data;
              this.shader.batchable &&
              this.drawMode === o.lg.TRIANGLES &&
              r.length < 2 * e.BATCHABLE_SIZE
                ? this._renderToBatch(t)
                : this._renderDefault(t);
            }),
            (e.prototype._renderDefault = function (t) {
              var e = this.shader;
              (e.alpha = this.worldAlpha),
                e.update && e.update(),
                t.batch.flush(),
                e.program.uniformData.translationMatrix &&
                  (e.uniforms.translationMatrix =
                    this.transform.worldTransform.toArray(!0)),
                t.shader.bind(e),
                t.state.set(this.state),
                t.geometry.bind(this.geometry, e),
                t.geometry.draw(
                  this.drawMode,
                  this.size,
                  this.start,
                  this.geometry.instanceCount
                );
            }),
            (e.prototype._renderToBatch = function (t) {
              var e = this.geometry;
              this.shader.uvMatrix &&
                (this.shader.uvMatrix.update(), this.calculateUvs()),
                this.calculateVertices(),
                (this.indices = e.indexBuffer.data),
                (this._tintRGB = this.shader._tintRGB),
                (this._texture = this.shader.texture);
              var r = this.material.pluginName;
              t.batch.setObjectRenderer(t.plugins[r]),
                t.plugins[r].render(this);
            }),
            (e.prototype.calculateVertices = function () {
              var t = this.geometry,
                e = t.buffers[0].data;
              if (
                t.vertexDirtyId !== this.vertexDirty ||
                this._transformID !== this.transform._worldID
              ) {
                (this._transformID = this.transform._worldID),
                  this.vertexData.length !== e.length &&
                    (this.vertexData = new Float32Array(e.length));
                for (
                  var r = this.transform.worldTransform,
                    i = r.a,
                    n = r.b,
                    o = r.c,
                    s = r.d,
                    h = r.tx,
                    u = r.ty,
                    l = this.vertexData,
                    c = 0;
                  c < l.length / 2;
                  c++
                ) {
                  var d = e[2 * c],
                    p = e[2 * c + 1];
                  (l[2 * c] = i * d + o * p + h),
                    (l[2 * c + 1] = n * d + s * p + u);
                }
                if (this._roundPixels) {
                  var f = a.X.RESOLUTION;
                  for (c = 0; c < l.length; ++c)
                    l[c] = Math.round(((l[c] * f) | 0) / f);
                }
                this.vertexDirty = t.vertexDirtyId;
              }
            }),
            (e.prototype.calculateUvs = function () {
              var t = this.geometry.buffers[1];
              this.shader.uvMatrix.isSimple
                ? (this.uvs = t.data)
                : (this.batchUvs ||
                    (this.batchUvs = new c(t, this.shader.uvMatrix)),
                  this.batchUvs.update(),
                  (this.uvs = this.batchUvs.data));
            }),
            (e.prototype._calculateBounds = function () {
              this.calculateVertices(),
                this._bounds.addVertexData(
                  this.vertexData,
                  0,
                  this.vertexData.length
                );
            }),
            (e.prototype.containsPoint = function (t) {
              if (!this.getBounds().contains(t.x, t.y)) return !1;
              this.worldTransform.applyInverse(t, d);
              for (
                var e = this.geometry.getBuffer("aVertexPosition").data,
                  r = p.points,
                  i = this.geometry.getIndex().data,
                  n = i.length,
                  o = 4 === this.drawMode ? 3 : 1,
                  s = 0;
                s + 2 < n;
                s += o
              ) {
                var a = 2 * i[s],
                  h = 2 * i[s + 1],
                  u = 2 * i[s + 2];
                if (
                  ((r[0] = e[a]),
                  (r[1] = e[a + 1]),
                  (r[2] = e[h]),
                  (r[3] = e[h + 1]),
                  (r[4] = e[u]),
                  (r[5] = e[u + 1]),
                  p.contains(d.x, d.y))
                )
                  return !0;
              }
              return !1;
            }),
            (e.prototype.destroy = function (e) {
              t.prototype.destroy.call(this, e),
                this.geometry.refCount--,
                0 === this.geometry.refCount && this.geometry.dispose(),
                (this.geometry = null),
                (this.shader = null),
                (this.state = null),
                (this.uvs = null),
                (this.indices = null),
                (this.vertexData = null);
            }),
            (e.BATCHABLE_SIZE = 100),
            e
          );
        })(s.W2),
        m = (function (t) {
          function e(e, r) {
            var o = this,
              s = {
                uSampler: e,
                alpha: 1,
                uTextureMatrix: n.y3.IDENTITY,
                uColor: new Float32Array([1, 1, 1, 1]),
              };
            return (
              (r = Object.assign(
                { tint: 16777215, alpha: 1, pluginName: "batch" },
                r
              )).uniforms && Object.assign(s, r.uniforms),
              ((o =
                t.call(
                  this,
                  r.program ||
                    i.$r.from(
                      "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTextureMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTextureMatrix * vec3(aTextureCoord, 1.0)).xy;\n}\n",
                      "varying vec2 vTextureCoord;\nuniform vec4 uColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord) * uColor;\n}\n"
                    ),
                  s
                ) || this)._colorDirty = !1),
              (o.uvMatrix = new i.UX(e)),
              (o.batchable = void 0 === r.program),
              (o.pluginName = r.pluginName),
              (o.tint = r.tint),
              (o.alpha = r.alpha),
              o
            );
          }
          return (
            l(e, t),
            Object.defineProperty(e.prototype, "texture", {
              get: function () {
                return this.uniforms.uSampler;
              },
              set: function (t) {
                this.uniforms.uSampler !== t &&
                  ((this.uniforms.uSampler = t), (this.uvMatrix.texture = t));
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "alpha", {
              get: function () {
                return this._alpha;
              },
              set: function (t) {
                t !== this._alpha &&
                  ((this._alpha = t), (this._colorDirty = !0));
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "tint", {
              get: function () {
                return this._tint;
              },
              set: function (t) {
                t !== this._tint &&
                  ((this._tint = t),
                  (this._tintRGB = (t >> 16) + (65280 & t) + ((255 & t) << 16)),
                  (this._colorDirty = !0));
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.update = function () {
              if (this._colorDirty) {
                this._colorDirty = !1;
                var t = this.texture.baseTexture;
                (0, h.premultiplyTintToRgba)(
                  this._tint,
                  this._alpha,
                  this.uniforms.uColor,
                  t.alphaMode
                );
              }
              this.uvMatrix.update() &&
                (this.uniforms.uTextureMatrix = this.uvMatrix.mapCoord);
            }),
            e
          );
        })(i.ex),
        v = (function (t) {
          function e(e, r, n) {
            var s = t.call(this) || this,
              a = new i.lW(e),
              h = new i.lW(r, !0),
              u = new i.lW(n, !0, !0);
            return (
              s
                .addAttribute("aVertexPosition", a, 2, !1, o.vK.FLOAT)
                .addAttribute("aTextureCoord", h, 2, !1, o.vK.FLOAT)
                .addIndex(u),
              (s._updateId = -1),
              s
            );
          }
          return (
            l(e, t),
            Object.defineProperty(e.prototype, "vertexDirtyId", {
              get: function () {
                return this.buffers[0]._updateID;
              },
              enumerable: !1,
              configurable: !0,
            }),
            e
          );
        })(i.ZX);
    },
    923: (t, e, r) => {
      var i = r(5307),
        n = r(9038),
        o = r(29),
        s = r(4295),
        a = r(5323),
        h = r(1573),
        u = new s.y3();
      (o.s$.prototype._cacheAsBitmap = !1), (o.s$.prototype._cacheData = null);
      var l = function () {
        (this.textureCacheId = null),
          (this.originalRender = null),
          (this.originalRenderCanvas = null),
          (this.originalCalculateBounds = null),
          (this.originalGetLocalBounds = null),
          (this.originalUpdateTransform = null),
          (this.originalDestroy = null),
          (this.originalMask = null),
          (this.originalFilterArea = null),
          (this.originalContainsPoint = null),
          (this.sprite = null);
      };
      Object.defineProperties(o.s$.prototype, {
        cacheAsBitmap: {
          get: function () {
            return this._cacheAsBitmap;
          },
          set: function (t) {
            var e;
            this._cacheAsBitmap !== t &&
              ((this._cacheAsBitmap = t),
              t
                ? (this._cacheData || (this._cacheData = new l()),
                  ((e = this._cacheData).originalRender = this.render),
                  (e.originalRenderCanvas = this.renderCanvas),
                  (e.originalUpdateTransform = this.updateTransform),
                  (e.originalCalculateBounds = this.calculateBounds),
                  (e.originalGetLocalBounds = this.getLocalBounds),
                  (e.originalDestroy = this.destroy),
                  (e.originalContainsPoint = this.containsPoint),
                  (e.originalMask = this._mask),
                  (e.originalFilterArea = this.filterArea),
                  (this.render = this._renderCached),
                  (this.renderCanvas = this._renderCachedCanvas),
                  (this.destroy = this._cacheAsBitmapDestroy))
                : ((e = this._cacheData).sprite &&
                    this._destroyCachedDisplayObject(),
                  (this.render = e.originalRender),
                  (this.renderCanvas = e.originalRenderCanvas),
                  (this.calculateBounds = e.originalCalculateBounds),
                  (this.getLocalBounds = e.originalGetLocalBounds),
                  (this.destroy = e.originalDestroy),
                  (this.updateTransform = e.originalUpdateTransform),
                  (this.containsPoint = e.originalContainsPoint),
                  (this._mask = e.originalMask),
                  (this.filterArea = e.originalFilterArea)));
          },
        },
      }),
        (o.s$.prototype._renderCached = function (t) {
          !this.visible ||
            this.worldAlpha <= 0 ||
            !this.renderable ||
            (this._initCachedDisplayObject(t),
            (this._cacheData.sprite.transform._worldID =
              this.transform._worldID),
            (this._cacheData.sprite.worldAlpha = this.worldAlpha),
            this._cacheData.sprite._render(t));
        }),
        (o.s$.prototype._initCachedDisplayObject = function (t) {
          if (!this._cacheData || !this._cacheData.sprite) {
            var e = this.alpha;
            (this.alpha = 1), t.batch.flush();
            var r = this.getLocalBounds(null, !0).clone();
            if (this.filters) {
              var o = this.filters[0].padding;
              r.pad(o);
            }
            r.ceil(h.X.RESOLUTION);
            var s = t.renderTexture.current,
              l = t.renderTexture.sourceFrame.clone(),
              c = t.renderTexture.destinationFrame.clone(),
              d = t.projection.transform,
              p = i.TI.create({ width: r.width, height: r.height }),
              f = "cacheAsBitmap_" + (0, a.uid)();
            (this._cacheData.textureCacheId = f),
              i.VL.addToCache(p.baseTexture, f),
              i.xE.addToCache(p, f);
            var m = this.transform.localTransform
              .copyTo(u)
              .invert()
              .translate(-r.x, -r.y);
            (this.render = this._cacheData.originalRender),
              t.render(this, p, !0, m, !1),
              (t.projection.transform = d),
              t.renderTexture.bind(s, l, c),
              (this.render = this._renderCached),
              (this.updateTransform = this.displayObjectUpdateTransform),
              (this.calculateBounds = this._calculateCachedBounds),
              (this.getLocalBounds = this._getCachedLocalBounds),
              (this._mask = null),
              (this.filterArea = null);
            var v = new n.j(p);
            (v.transform.worldTransform = this.transform.worldTransform),
              (v.anchor.x = -r.x / r.width),
              (v.anchor.y = -r.y / r.height),
              (v.alpha = e),
              (v._bounds = this._bounds),
              (this._cacheData.sprite = v),
              (this.transform._parentID = -1),
              this.parent
                ? this.updateTransform()
                : (this.enableTempParent(),
                  this.updateTransform(),
                  this.disableTempParent(null)),
              (this.containsPoint = v.containsPoint.bind(v));
          }
        }),
        (o.s$.prototype._renderCachedCanvas = function (t) {
          !this.visible ||
            this.worldAlpha <= 0 ||
            !this.renderable ||
            (this._initCachedDisplayObjectCanvas(t),
            (this._cacheData.sprite.worldAlpha = this.worldAlpha),
            this._cacheData.sprite._renderCanvas(t));
        }),
        (o.s$.prototype._initCachedDisplayObjectCanvas = function (t) {
          if (!this._cacheData || !this._cacheData.sprite) {
            var e = this.getLocalBounds(null, !0),
              r = this.alpha;
            this.alpha = 1;
            var o = t.context,
              s = t._projTransform;
            e.ceil(h.X.RESOLUTION);
            var l = i.TI.create({ width: e.width, height: e.height }),
              c = "cacheAsBitmap_" + (0, a.uid)();
            (this._cacheData.textureCacheId = c),
              i.VL.addToCache(l.baseTexture, c),
              i.xE.addToCache(l, c);
            var d = u;
            this.transform.localTransform.copyTo(d),
              d.invert(),
              (d.tx -= e.x),
              (d.ty -= e.y),
              (this.renderCanvas = this._cacheData.originalRenderCanvas),
              t.render(this, l, !0, d, !1),
              (t.context = o),
              (t._projTransform = s),
              (this.renderCanvas = this._renderCachedCanvas),
              (this.updateTransform = this.displayObjectUpdateTransform),
              (this.calculateBounds = this._calculateCachedBounds),
              (this.getLocalBounds = this._getCachedLocalBounds),
              (this._mask = null),
              (this.filterArea = null);
            var p = new n.j(l);
            (p.transform.worldTransform = this.transform.worldTransform),
              (p.anchor.x = -e.x / e.width),
              (p.anchor.y = -e.y / e.height),
              (p.alpha = r),
              (p._bounds = this._bounds),
              (this._cacheData.sprite = p),
              (this.transform._parentID = -1),
              this.parent
                ? this.updateTransform()
                : ((this.parent = t._tempDisplayObjectParent),
                  this.updateTransform(),
                  (this.parent = null)),
              (this.containsPoint = p.containsPoint.bind(p));
          }
        }),
        (o.s$.prototype._calculateCachedBounds = function () {
          this._bounds.clear(),
            (this._cacheData.sprite.transform._worldID =
              this.transform._worldID),
            this._cacheData.sprite._calculateBounds(),
            (this._bounds.updateID = this._boundsID);
        }),
        (o.s$.prototype._getCachedLocalBounds = function () {
          return this._cacheData.sprite.getLocalBounds(null);
        }),
        (o.s$.prototype._destroyCachedDisplayObject = function () {
          this._cacheData.sprite._texture.destroy(!0),
            (this._cacheData.sprite = null),
            i.VL.removeFromCache(this._cacheData.textureCacheId),
            i.xE.removeFromCache(this._cacheData.textureCacheId),
            (this._cacheData.textureCacheId = null);
        }),
        (o.s$.prototype._cacheAsBitmapDestroy = function (t) {
          (this.cacheAsBitmap = !1), this.destroy(t);
        });
    },
    4451: (t, e, r) => {
      var i = r(29);
      (i.s$.prototype.name = null),
        (i.W2.prototype.getChildByName = function (t, e) {
          for (var r = 0, i = this.children.length; r < i; r++)
            if (this.children[r].name === t) return this.children[r];
          if (e)
            for (r = 0, i = this.children.length; r < i; r++)
              if (this.children[r].getChildByName) {
                var n = this.children[r].getChildByName(t, !0);
                if (n) return n;
              }
          return null;
        });
    },
    476: (t, e, r) => {
      var i = r(29),
        n = r(4295);
      i.s$.prototype.getGlobalPosition = function (t, e) {
        return (
          void 0 === t && (t = new n.E9()),
          void 0 === e && (e = !1),
          this.parent
            ? this.parent.toGlobal(this.position, t, e)
            : ((t.x = this.position.x), (t.y = this.position.y)),
          t
        );
      };
    },
    6747: (t, e, r) => {
      r.d(e, { P: () => d, T: () => l });
      var i = r(7054),
        n = r(29),
        o = r(5323),
        s = r(5307),
        a = r(4295),
        h = function (t, e) {
          return (
            (h =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (t, e) {
                  t.__proto__ = e;
                }) ||
              function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
              }),
            h(t, e)
          );
        };
      function u(t, e) {
        function r() {
          this.constructor = t;
        }
        h(t, e),
          (t.prototype =
            null === e
              ? Object.create(e)
              : ((r.prototype = e.prototype), new r()));
      }
      var l = (function (t) {
          function e(e, r, n, o) {
            void 0 === e && (e = 1500),
              void 0 === n && (n = 16384),
              void 0 === o && (o = !1);
            var s = t.call(this) || this;
            return (
              n > 16384 && (n = 16384),
              (s._properties = [!1, !0, !1, !1, !1]),
              (s._maxSize = e),
              (s._batchSize = n),
              (s._buffers = null),
              (s._bufferUpdateIDs = []),
              (s._updateID = 0),
              (s.interactiveChildren = !1),
              (s.blendMode = i.T$.NORMAL),
              (s.autoResize = o),
              (s.roundPixels = !0),
              (s.baseTexture = null),
              s.setProperties(r),
              (s._tint = 0),
              (s.tintRgb = new Float32Array(4)),
              (s.tint = 16777215),
              s
            );
          }
          return (
            u(e, t),
            (e.prototype.setProperties = function (t) {
              t &&
                ((this._properties[0] =
                  "vertices" in t || "scale" in t
                    ? !!t.vertices || !!t.scale
                    : this._properties[0]),
                (this._properties[1] =
                  "position" in t ? !!t.position : this._properties[1]),
                (this._properties[2] =
                  "rotation" in t ? !!t.rotation : this._properties[2]),
                (this._properties[3] =
                  "uvs" in t ? !!t.uvs : this._properties[3]),
                (this._properties[4] =
                  "tint" in t || "alpha" in t
                    ? !!t.tint || !!t.alpha
                    : this._properties[4]));
            }),
            (e.prototype.updateTransform = function () {
              this.displayObjectUpdateTransform();
            }),
            Object.defineProperty(e.prototype, "tint", {
              get: function () {
                return this._tint;
              },
              set: function (t) {
                (this._tint = t), (0, o.hex2rgb)(t, this.tintRgb);
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.render = function (t) {
              var e = this;
              this.visible &&
                !(this.worldAlpha <= 0) &&
                this.children.length &&
                this.renderable &&
                (this.baseTexture ||
                  ((this.baseTexture = this.children[0]._texture.baseTexture),
                  this.baseTexture.valid ||
                    this.baseTexture.once("update", function () {
                      return e.onChildrenChange(0);
                    })),
                t.batch.setObjectRenderer(t.plugins.particle),
                t.plugins.particle.render(this));
            }),
            (e.prototype.onChildrenChange = function (t) {
              for (
                var e = Math.floor(t / this._batchSize);
                this._bufferUpdateIDs.length < e;

              )
                this._bufferUpdateIDs.push(0);
              this._bufferUpdateIDs[e] = ++this._updateID;
            }),
            (e.prototype.dispose = function () {
              if (this._buffers) {
                for (var t = 0; t < this._buffers.length; ++t)
                  this._buffers[t].destroy();
                this._buffers = null;
              }
            }),
            (e.prototype.destroy = function (e) {
              t.prototype.destroy.call(this, e),
                this.dispose(),
                (this._properties = null),
                (this._buffers = null),
                (this._bufferUpdateIDs = null);
            }),
            e
          );
        })(n.W2),
        c = (function () {
          function t(t, e, r) {
            (this.geometry = new s.ZX()),
              (this.indexBuffer = null),
              (this.size = r),
              (this.dynamicProperties = []),
              (this.staticProperties = []);
            for (var n = 0; n < t.length; ++n) {
              var o = t[n];
              (o = {
                attributeName: o.attributeName,
                size: o.size,
                uploadFunction: o.uploadFunction,
                type: o.type || i.vK.FLOAT,
                offset: o.offset,
              }),
                e[n]
                  ? this.dynamicProperties.push(o)
                  : this.staticProperties.push(o);
            }
            (this.staticStride = 0),
              (this.staticBuffer = null),
              (this.staticData = null),
              (this.staticDataUint32 = null),
              (this.dynamicStride = 0),
              (this.dynamicBuffer = null),
              (this.dynamicData = null),
              (this.dynamicDataUint32 = null),
              (this._updateID = 0),
              this.initBuffers();
          }
          return (
            (t.prototype.initBuffers = function () {
              var t = this.geometry,
                e = 0;
              (this.indexBuffer = new s.lW(
                (0, o.createIndicesForQuads)(this.size),
                !0,
                !0
              )),
                t.addIndex(this.indexBuffer),
                (this.dynamicStride = 0);
              for (var r = 0; r < this.dynamicProperties.length; ++r)
                ((u = this.dynamicProperties[r]).offset = e),
                  (e += u.size),
                  (this.dynamicStride += u.size);
              var n = new ArrayBuffer(this.size * this.dynamicStride * 4 * 4);
              (this.dynamicData = new Float32Array(n)),
                (this.dynamicDataUint32 = new Uint32Array(n)),
                (this.dynamicBuffer = new s.lW(this.dynamicData, !1, !1));
              var a = 0;
              for (
                this.staticStride = 0, r = 0;
                r < this.staticProperties.length;
                ++r
              )
                ((u = this.staticProperties[r]).offset = a),
                  (a += u.size),
                  (this.staticStride += u.size);
              var h = new ArrayBuffer(this.size * this.staticStride * 4 * 4);
              for (
                this.staticData = new Float32Array(h),
                  this.staticDataUint32 = new Uint32Array(h),
                  this.staticBuffer = new s.lW(this.staticData, !0, !1),
                  r = 0;
                r < this.dynamicProperties.length;
                ++r
              ) {
                var u = this.dynamicProperties[r];
                t.addAttribute(
                  u.attributeName,
                  this.dynamicBuffer,
                  0,
                  u.type === i.vK.UNSIGNED_BYTE,
                  u.type,
                  4 * this.dynamicStride,
                  4 * u.offset
                );
              }
              for (r = 0; r < this.staticProperties.length; ++r)
                (u = this.staticProperties[r]),
                  t.addAttribute(
                    u.attributeName,
                    this.staticBuffer,
                    0,
                    u.type === i.vK.UNSIGNED_BYTE,
                    u.type,
                    4 * this.staticStride,
                    4 * u.offset
                  );
            }),
            (t.prototype.uploadDynamic = function (t, e, r) {
              for (var n = 0; n < this.dynamicProperties.length; n++) {
                var o = this.dynamicProperties[n];
                o.uploadFunction(
                  t,
                  e,
                  r,
                  o.type === i.vK.UNSIGNED_BYTE
                    ? this.dynamicDataUint32
                    : this.dynamicData,
                  this.dynamicStride,
                  o.offset
                );
              }
              this.dynamicBuffer._updateID++;
            }),
            (t.prototype.uploadStatic = function (t, e, r) {
              for (var n = 0; n < this.staticProperties.length; n++) {
                var o = this.staticProperties[n];
                o.uploadFunction(
                  t,
                  e,
                  r,
                  o.type === i.vK.UNSIGNED_BYTE
                    ? this.staticDataUint32
                    : this.staticData,
                  this.staticStride,
                  o.offset
                );
              }
              this.staticBuffer._updateID++;
            }),
            (t.prototype.destroy = function () {
              (this.indexBuffer = null),
                (this.dynamicProperties = null),
                (this.dynamicBuffer = null),
                (this.dynamicData = null),
                (this.dynamicDataUint32 = null),
                (this.staticProperties = null),
                (this.staticBuffer = null),
                (this.staticData = null),
                (this.staticDataUint32 = null),
                this.geometry.destroy();
            }),
            t
          );
        })(),
        d = (function (t) {
          function e(e) {
            var r = t.call(this, e) || this;
            return (
              (r.shader = null),
              (r.properties = null),
              (r.tempMatrix = new a.y3()),
              (r.properties = [
                {
                  attributeName: "aVertexPosition",
                  size: 2,
                  uploadFunction: r.uploadVertices,
                  offset: 0,
                },
                {
                  attributeName: "aPositionCoord",
                  size: 2,
                  uploadFunction: r.uploadPosition,
                  offset: 0,
                },
                {
                  attributeName: "aRotation",
                  size: 1,
                  uploadFunction: r.uploadRotation,
                  offset: 0,
                },
                {
                  attributeName: "aTextureCoord",
                  size: 2,
                  uploadFunction: r.uploadUvs,
                  offset: 0,
                },
                {
                  attributeName: "aColor",
                  size: 1,
                  type: i.vK.UNSIGNED_BYTE,
                  uploadFunction: r.uploadTint,
                  offset: 0,
                },
              ]),
              (r.shader = s.ex.from(
                "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nattribute vec2 aPositionCoord;\nattribute float aRotation;\n\nuniform mat3 translationMatrix;\nuniform vec4 uColor;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nvoid main(void){\n    float x = (aVertexPosition.x) * cos(aRotation) - (aVertexPosition.y) * sin(aRotation);\n    float y = (aVertexPosition.x) * sin(aRotation) + (aVertexPosition.y) * cos(aRotation);\n\n    vec2 v = vec2(x, y);\n    v = v + aPositionCoord;\n\n    gl_Position = vec4((translationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vColor = aColor * uColor;\n}\n",
                "varying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n    vec4 color = texture2D(uSampler, vTextureCoord) * vColor;\n    gl_FragColor = color;\n}",
                {}
              )),
              (r.state = s.ZM.for2d()),
              r
            );
          }
          return (
            u(e, t),
            (e.prototype.render = function (t) {
              var e = t.children,
                r = t._maxSize,
                i = t._batchSize,
                n = this.renderer,
                s = e.length;
              if (0 !== s) {
                s > r && !t.autoResize && (s = r);
                var a = t._buffers;
                a || (a = t._buffers = this.generateBuffers(t));
                var h = e[0]._texture.baseTexture;
                (this.state.blendMode = (0, o.correctBlendMode)(
                  t.blendMode,
                  h.alphaMode
                )),
                  n.state.set(this.state);
                var u = n.gl,
                  l = t.worldTransform.copyTo(this.tempMatrix);
                l.prepend(n.globalUniforms.uniforms.projectionMatrix),
                  (this.shader.uniforms.translationMatrix = l.toArray(!0)),
                  (this.shader.uniforms.uColor = (0, o.premultiplyRgba)(
                    t.tintRgb,
                    t.worldAlpha,
                    this.shader.uniforms.uColor,
                    h.alphaMode
                  )),
                  (this.shader.uniforms.uSampler = h),
                  this.renderer.shader.bind(this.shader);
                for (var c = !1, d = 0, p = 0; d < s; d += i, p += 1) {
                  var f = s - d;
                  f > i && (f = i),
                    p >= a.length && a.push(this._generateOneMoreBuffer(t));
                  var m = a[p];
                  m.uploadDynamic(e, d, f);
                  var v = t._bufferUpdateIDs[p] || 0;
                  (c = c || m._updateID < v) &&
                    ((m._updateID = t._updateID), m.uploadStatic(e, d, f)),
                    n.geometry.bind(m.geometry),
                    u.drawElements(u.TRIANGLES, 6 * f, u.UNSIGNED_SHORT, 0);
                }
              }
            }),
            (e.prototype.generateBuffers = function (t) {
              for (
                var e = [],
                  r = t._maxSize,
                  i = t._batchSize,
                  n = t._properties,
                  o = 0;
                o < r;
                o += i
              )
                e.push(new c(this.properties, n, i));
              return e;
            }),
            (e.prototype._generateOneMoreBuffer = function (t) {
              var e = t._batchSize,
                r = t._properties;
              return new c(this.properties, r, e);
            }),
            (e.prototype.uploadVertices = function (t, e, r, i, n, o) {
              for (var s = 0, a = 0, h = 0, u = 0, l = 0; l < r; ++l) {
                var c = t[e + l],
                  d = c._texture,
                  p = c.scale.x,
                  f = c.scale.y,
                  m = d.trim,
                  v = d.orig;
                m
                  ? ((s = (a = m.x - c.anchor.x * v.width) + m.width),
                    (h = (u = m.y - c.anchor.y * v.height) + m.height))
                  : ((s = v.width * (1 - c.anchor.x)),
                    (a = v.width * -c.anchor.x),
                    (h = v.height * (1 - c.anchor.y)),
                    (u = v.height * -c.anchor.y)),
                  (i[o] = a * p),
                  (i[o + 1] = u * f),
                  (i[o + n] = s * p),
                  (i[o + n + 1] = u * f),
                  (i[o + 2 * n] = s * p),
                  (i[o + 2 * n + 1] = h * f),
                  (i[o + 3 * n] = a * p),
                  (i[o + 3 * n + 1] = h * f),
                  (o += 4 * n);
              }
            }),
            (e.prototype.uploadPosition = function (t, e, r, i, n, o) {
              for (var s = 0; s < r; s++) {
                var a = t[e + s].position;
                (i[o] = a.x),
                  (i[o + 1] = a.y),
                  (i[o + n] = a.x),
                  (i[o + n + 1] = a.y),
                  (i[o + 2 * n] = a.x),
                  (i[o + 2 * n + 1] = a.y),
                  (i[o + 3 * n] = a.x),
                  (i[o + 3 * n + 1] = a.y),
                  (o += 4 * n);
              }
            }),
            (e.prototype.uploadRotation = function (t, e, r, i, n, o) {
              for (var s = 0; s < r; s++) {
                var a = t[e + s].rotation;
                (i[o] = a),
                  (i[o + n] = a),
                  (i[o + 2 * n] = a),
                  (i[o + 3 * n] = a),
                  (o += 4 * n);
              }
            }),
            (e.prototype.uploadUvs = function (t, e, r, i, n, o) {
              for (var s = 0; s < r; ++s) {
                var a = t[e + s]._texture._uvs;
                a
                  ? ((i[o] = a.x0),
                    (i[o + 1] = a.y0),
                    (i[o + n] = a.x1),
                    (i[o + n + 1] = a.y1),
                    (i[o + 2 * n] = a.x2),
                    (i[o + 2 * n + 1] = a.y2),
                    (i[o + 3 * n] = a.x3),
                    (i[o + 3 * n + 1] = a.y3),
                    (o += 4 * n))
                  : ((i[o] = 0),
                    (i[o + 1] = 0),
                    (i[o + n] = 0),
                    (i[o + n + 1] = 0),
                    (i[o + 2 * n] = 0),
                    (i[o + 2 * n + 1] = 0),
                    (i[o + 3 * n] = 0),
                    (i[o + 3 * n + 1] = 0),
                    (o += 4 * n));
              }
            }),
            (e.prototype.uploadTint = function (t, e, r, i, n, s) {
              for (var a = 0; a < r; ++a) {
                var h = t[e + a],
                  u = h._texture.baseTexture.alphaMode > 0,
                  l = h.alpha,
                  c =
                    l < 1 && u
                      ? (0, o.premultiplyTint)(h._tintRGB, l)
                      : h._tintRGB + ((255 * l) << 24);
                (i[s] = c),
                  (i[s + n] = c),
                  (i[s + 2 * n] = c),
                  (i[s + 3 * n] = c),
                  (s += 4 * n);
              }
            }),
            (e.prototype.destroy = function () {
              t.prototype.destroy.call(this),
                this.shader && (this.shader.destroy(), (this.shader = null)),
                (this.tempMatrix = null);
            }),
            e
          );
        })(s.bO);
    },
    5464: (t, e, r) => {
      var i = r(6713),
        n = r(7418),
        o = r.n(n);
      if (
        (window.Promise || (window.Promise = i.Polyfill),
        Object.assign || (Object.assign = o()),
        (Date.now && Date.prototype.getTime) ||
          (Date.now = function () {
            return new Date().getTime();
          }),
        !window.performance || !window.performance.now)
      ) {
        var s = Date.now();
        window.performance || (window.performance = {}),
          (window.performance.now = function () {
            return Date.now() - s;
          });
      }
      for (
        var a = Date.now(), h = ["ms", "moz", "webkit", "o"], u = 0;
        u < h.length && !window.requestAnimationFrame;
        ++u
      ) {
        var l = h[u];
        (window.requestAnimationFrame = window[l + "RequestAnimationFrame"]),
          (window.cancelAnimationFrame =
            window[l + "CancelAnimationFrame"] ||
            window[l + "CancelRequestAnimationFrame"]);
      }
      window.requestAnimationFrame ||
        (window.requestAnimationFrame = function (t) {
          if ("function" != typeof t)
            throw new TypeError(t + "is not a function");
          var e = Date.now(),
            r = 16 + a - e;
          return (
            r < 0 && (r = 0),
            (a = e),
            window.setTimeout(function () {
              (a = Date.now()), t(performance.now());
            }, r)
          );
        }),
        window.cancelAnimationFrame ||
          (window.cancelAnimationFrame = function (t) {
            return clearTimeout(t);
          }),
        Math.sign ||
          (Math.sign = function (t) {
            return 0 === (t = Number(t)) || isNaN(t) ? t : t > 0 ? 1 : -1;
          }),
        Number.isInteger ||
          (Number.isInteger = function (t) {
            return "number" == typeof t && isFinite(t) && Math.floor(t) === t;
          }),
        window.ArrayBuffer || (window.ArrayBuffer = Array),
        window.Float32Array || (window.Float32Array = Array),
        window.Uint32Array || (window.Uint32Array = Array),
        window.Uint16Array || (window.Uint16Array = Array),
        window.Uint8Array || (window.Uint8Array = Array),
        window.Int32Array || (window.Int32Array = Array);
    },
    4484: (t, e, r) => {
      r.d(e, { B9: () => T, FI: () => E, Zq: () => g, fh: () => l });
      var i = r(1573),
        n = r(5307),
        o = r(426),
        s = r(5662),
        a = r(29),
        h = r(8093);
      i.X.UPLOADS_PER_FRAME = 4;
      var u = function (t, e) {
          return (
            (u =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (t, e) {
                  t.__proto__ = e;
                }) ||
              function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
              }),
            u(t, e)
          );
        },
        l = (function () {
          function t(t) {
            (this.maxItemsPerFrame = t), (this.itemsLeft = 0);
          }
          return (
            (t.prototype.beginFrame = function () {
              this.itemsLeft = this.maxItemsPerFrame;
            }),
            (t.prototype.allowedToUpload = function () {
              return this.itemsLeft-- > 0;
            }),
            t
          );
        })();
      function c(t, e) {
        var r = !1;
        if (t && t._textures && t._textures.length)
          for (var i = 0; i < t._textures.length; i++)
            if (t._textures[i] instanceof n.xE) {
              var o = t._textures[i].baseTexture;
              -1 === e.indexOf(o) && (e.push(o), (r = !0));
            }
        return r;
      }
      function d(t, e) {
        if (t.baseTexture instanceof n.VL) {
          var r = t.baseTexture;
          return -1 === e.indexOf(r) && e.push(r), !0;
        }
        return !1;
      }
      function p(t, e) {
        if (t._texture && t._texture instanceof n.xE) {
          var r = t._texture.baseTexture;
          return -1 === e.indexOf(r) && e.push(r), !0;
        }
        return !1;
      }
      function f(t, e) {
        return e instanceof h.xv && (e.updateText(!0), !0);
      }
      function m(t, e) {
        if (e instanceof h.pn) {
          var r = e.toFontString();
          return h._A.measureFont(r), !0;
        }
        return !1;
      }
      function v(t, e) {
        if (t instanceof h.xv) {
          -1 === e.indexOf(t.style) && e.push(t.style),
            -1 === e.indexOf(t) && e.push(t);
          var r = t._texture.baseTexture;
          return -1 === e.indexOf(r) && e.push(r), !0;
        }
        return !1;
      }
      function y(t, e) {
        return t instanceof h.pn && (-1 === e.indexOf(t) && e.push(t), !0);
      }
      var g = (function () {
        function t(t) {
          var e = this;
          (this.limiter = new l(i.X.UPLOADS_PER_FRAME)),
            (this.renderer = t),
            (this.uploadHookHelper = null),
            (this.queue = []),
            (this.addHooks = []),
            (this.uploadHooks = []),
            (this.completes = []),
            (this.ticking = !1),
            (this.delayedTick = function () {
              e.queue && e.prepareItems();
            }),
            this.registerFindHook(v),
            this.registerFindHook(y),
            this.registerFindHook(c),
            this.registerFindHook(d),
            this.registerFindHook(p),
            this.registerUploadHook(f),
            this.registerUploadHook(m);
        }
        return (
          (t.prototype.upload = function (t, e) {
            "function" == typeof t && ((e = t), (t = null)),
              t && this.add(t),
              this.queue.length
                ? (e && this.completes.push(e),
                  this.ticking ||
                    ((this.ticking = !0),
                    s.vB.system.addOnce(this.tick, this, s.uF.UTILITY)))
                : e && e();
          }),
          (t.prototype.tick = function () {
            setTimeout(this.delayedTick, 0);
          }),
          (t.prototype.prepareItems = function () {
            for (
              this.limiter.beginFrame();
              this.queue.length && this.limiter.allowedToUpload();

            ) {
              var t = this.queue[0],
                e = !1;
              if (t && !t._destroyed)
                for (var r = 0, i = this.uploadHooks.length; r < i; r++)
                  if (this.uploadHooks[r](this.uploadHookHelper, t)) {
                    this.queue.shift(), (e = !0);
                    break;
                  }
              e || this.queue.shift();
            }
            if (this.queue.length)
              s.vB.system.addOnce(this.tick, this, s.uF.UTILITY);
            else {
              this.ticking = !1;
              var n = this.completes.slice(0);
              for (this.completes.length = 0, r = 0, i = n.length; r < i; r++)
                n[r]();
            }
          }),
          (t.prototype.registerFindHook = function (t) {
            return t && this.addHooks.push(t), this;
          }),
          (t.prototype.registerUploadHook = function (t) {
            return t && this.uploadHooks.push(t), this;
          }),
          (t.prototype.add = function (t) {
            for (
              var e = 0, r = this.addHooks.length;
              e < r && !this.addHooks[e](t, this.queue);
              e++
            );
            if (t instanceof a.W2)
              for (e = t.children.length - 1; e >= 0; e--)
                this.add(t.children[e]);
            return this;
          }),
          (t.prototype.destroy = function () {
            this.ticking && s.vB.system.remove(this.tick, this),
              (this.ticking = !1),
              (this.addHooks = null),
              (this.uploadHooks = null),
              (this.renderer = null),
              (this.completes = null),
              (this.queue = null),
              (this.limiter = null),
              (this.uploadHookHelper = null);
          }),
          t
        );
      })();
      function _(t, e) {
        return (
          e instanceof n.VL &&
          (e._glTextures[t.CONTEXT_UID] || t.texture.bind(e), !0)
        );
      }
      function b(t, e) {
        if (!(e instanceof o.TC)) return !1;
        var r = e.geometry;
        e.finishPoly(), r.updateBatches();
        for (var i = r.batches, n = 0; n < i.length; n++) {
          var s = i[n].style.texture;
          s && _(t, s.baseTexture);
        }
        return r.batchable || t.geometry.bind(r, e._resolveDirectShader(t)), !0;
      }
      function x(t, e) {
        return t instanceof o.TC && (e.push(t), !0);
      }
      var T = (function (t) {
          function e(e) {
            var r = t.call(this, e) || this;
            return (
              (r.uploadHookHelper = r.renderer),
              r.registerFindHook(x),
              r.registerUploadHook(_),
              r.registerUploadHook(b),
              r
            );
          }
          return (
            (function (t, e) {
              function r() {
                this.constructor = t;
              }
              u(t, e),
                (t.prototype =
                  null === e
                    ? Object.create(e)
                    : ((r.prototype = e.prototype), new r()));
            })(e, t),
            e
          );
        })(g),
        E = (function () {
          function t(t) {
            (this.maxMilliseconds = t), (this.frameStart = 0);
          }
          return (
            (t.prototype.beginFrame = function () {
              this.frameStart = Date.now();
            }),
            (t.prototype.allowedToUpload = function () {
              return Date.now() - this.frameStart < this.maxMilliseconds;
            }),
            t
          );
        })();
    },
    3557: (t, e, r) => {
      r.d(e, { R: () => i });
      var i = (function () {
        function t(t) {
          (this.items = []), (this._name = t), (this._aliasCount = 0);
        }
        return (
          (t.prototype.emit = function (t, e, r, i, n, o, s, a) {
            if (arguments.length > 8) throw new Error("max arguments reached");
            var h = this.name,
              u = this.items;
            this._aliasCount++;
            for (var l = 0, c = u.length; l < c; l++)
              u[l][h](t, e, r, i, n, o, s, a);
            return u === this.items && this._aliasCount--, this;
          }),
          (t.prototype.ensureNonAliasedItems = function () {
            this._aliasCount > 0 &&
              this.items.length > 1 &&
              ((this._aliasCount = 0), (this.items = this.items.slice(0)));
          }),
          (t.prototype.add = function (t) {
            return (
              t[this._name] &&
                (this.ensureNonAliasedItems(),
                this.remove(t),
                this.items.push(t)),
              this
            );
          }),
          (t.prototype.remove = function (t) {
            var e = this.items.indexOf(t);
            return (
              -1 !== e &&
                (this.ensureNonAliasedItems(), this.items.splice(e, 1)),
              this
            );
          }),
          (t.prototype.contains = function (t) {
            return -1 !== this.items.indexOf(t);
          }),
          (t.prototype.removeAll = function () {
            return this.ensureNonAliasedItems(), (this.items.length = 0), this;
          }),
          (t.prototype.destroy = function () {
            this.removeAll(), (this.items = null), (this._name = null);
          }),
          Object.defineProperty(t.prototype, "empty", {
            get: function () {
              return 0 === this.items.length;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "name", {
            get: function () {
              return this._name;
            },
            enumerable: !1,
            configurable: !0,
          }),
          t
        );
      })();
      Object.defineProperties(i.prototype, {
        dispatch: { value: i.prototype.emit },
        run: { value: i.prototype.emit },
      });
    },
    1573: (t, e, r) => {
      r.d(e, { X: () => n, t: () => i });
      var i = (0, r(3630).Z)(window.navigator),
        n = {
          MIPMAP_TEXTURES: 1,
          ANISOTROPIC_LEVEL: 0,
          RESOLUTION: 1,
          FILTER_RESOLUTION: 1,
          SPRITE_MAX_TEXTURES: (function (t) {
            var e,
              r = !0;
            (i.tablet || i.phone) &&
              (i.apple.device &&
                (e = navigator.userAgent.match(/OS (\d+)_(\d+)?/)) &&
                parseInt(e[1], 10) < 11 &&
                (r = !1),
              i.android.device &&
                (e = navigator.userAgent.match(/Android\s([0-9.]*)/)) &&
                parseInt(e[1], 10) < 7 &&
                (r = !1));
            return r ? 32 : 4;
          })(),
          SPRITE_BATCH_SIZE: 4096,
          RENDER_OPTIONS: {
            view: null,
            antialias: !1,
            autoDensity: !1,
            transparent: !1,
            backgroundColor: 0,
            clearBeforeRender: !0,
            preserveDrawingBuffer: !1,
            width: 800,
            height: 600,
            legacy: !1,
          },
          GC_MODE: 0,
          GC_MAX_IDLE: 3600,
          GC_MAX_CHECK_COUNT: 600,
          WRAP_MODE: 33071,
          SCALE_MODE: 1,
          PRECISION_VERTEX: "highp",
          PRECISION_FRAGMENT: i.apple.device ? "highp" : "mediump",
          CAN_UPLOAD_SAME_BUFFER: !i.apple.device,
          CREATE_IMAGE_BITMAP: !1,
          ROUND_PIXELS: !1,
        };
    },
    2225: (t, e, r) => {
      r.d(e, { K: () => a });
      var i = r(5307),
        n = r(9038),
        o = r(5662),
        s = function (t, e) {
          return (
            (s =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (t, e) {
                  t.__proto__ = e;
                }) ||
              function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
              }),
            s(t, e)
          );
        },
        a = (function (t) {
          function e(e, r) {
            void 0 === r && (r = !0);
            var n =
              t.call(this, e[0] instanceof i.xE ? e[0] : e[0].texture) || this;
            return (
              (n._textures = null),
              (n._durations = null),
              (n._autoUpdate = r),
              (n._isConnectedToTicker = !1),
              (n.animationSpeed = 1),
              (n.loop = !0),
              (n.updateAnchor = !1),
              (n.onComplete = null),
              (n.onFrameChange = null),
              (n.onLoop = null),
              (n._currentTime = 0),
              (n._playing = !1),
              (n._previousFrame = null),
              (n.textures = e),
              n
            );
          }
          return (
            (function (t, e) {
              function r() {
                this.constructor = t;
              }
              s(t, e),
                (t.prototype =
                  null === e
                    ? Object.create(e)
                    : ((r.prototype = e.prototype), new r()));
            })(e, t),
            (e.prototype.stop = function () {
              this._playing &&
                ((this._playing = !1),
                this._autoUpdate &&
                  this._isConnectedToTicker &&
                  (o.vB.shared.remove(this.update, this),
                  (this._isConnectedToTicker = !1)));
            }),
            (e.prototype.play = function () {
              this._playing ||
                ((this._playing = !0),
                this._autoUpdate &&
                  !this._isConnectedToTicker &&
                  (o.vB.shared.add(this.update, this, o.uF.HIGH),
                  (this._isConnectedToTicker = !0)));
            }),
            (e.prototype.gotoAndStop = function (t) {
              this.stop();
              var e = this.currentFrame;
              (this._currentTime = t),
                e !== this.currentFrame && this.updateTexture();
            }),
            (e.prototype.gotoAndPlay = function (t) {
              var e = this.currentFrame;
              (this._currentTime = t),
                e !== this.currentFrame && this.updateTexture(),
                this.play();
            }),
            (e.prototype.update = function (t) {
              if (this._playing) {
                var e = this.animationSpeed * t,
                  r = this.currentFrame;
                if (null !== this._durations) {
                  var i =
                    (this._currentTime % 1) *
                    this._durations[this.currentFrame];
                  for (i += (e / 60) * 1e3; i < 0; )
                    this._currentTime--,
                      (i += this._durations[this.currentFrame]);
                  var n = Math.sign(this.animationSpeed * t);
                  for (
                    this._currentTime = Math.floor(this._currentTime);
                    i >= this._durations[this.currentFrame];

                  )
                    (i -= this._durations[this.currentFrame] * n),
                      (this._currentTime += n);
                  this._currentTime += i / this._durations[this.currentFrame];
                } else this._currentTime += e;
                this._currentTime < 0 && !this.loop
                  ? (this.gotoAndStop(0), this.onComplete && this.onComplete())
                  : this._currentTime >= this._textures.length && !this.loop
                  ? (this.gotoAndStop(this._textures.length - 1),
                    this.onComplete && this.onComplete())
                  : r !== this.currentFrame &&
                    (this.loop &&
                      this.onLoop &&
                      ((this.animationSpeed > 0 && this.currentFrame < r) ||
                        (this.animationSpeed < 0 && this.currentFrame > r)) &&
                      this.onLoop(),
                    this.updateTexture());
              }
            }),
            (e.prototype.updateTexture = function () {
              var t = this.currentFrame;
              this._previousFrame !== t &&
                ((this._previousFrame = t),
                (this._texture = this._textures[t]),
                (this._textureID = -1),
                (this._textureTrimmedID = -1),
                (this._cachedTint = 16777215),
                (this.uvs = this._texture._uvs.uvsFloat32),
                this.updateAnchor &&
                  this._anchor.copyFrom(this._texture.defaultAnchor),
                this.onFrameChange && this.onFrameChange(this.currentFrame));
            }),
            (e.prototype.destroy = function (e) {
              this.stop(),
                t.prototype.destroy.call(this, e),
                (this.onComplete = null),
                (this.onFrameChange = null),
                (this.onLoop = null);
            }),
            (e.fromFrames = function (t) {
              for (var r = [], n = 0; n < t.length; ++n)
                r.push(i.xE.from(t[n]));
              return new e(r);
            }),
            (e.fromImages = function (t) {
              for (var r = [], n = 0; n < t.length; ++n)
                r.push(i.xE.from(t[n]));
              return new e(r);
            }),
            Object.defineProperty(e.prototype, "totalFrames", {
              get: function () {
                return this._textures.length;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "textures", {
              get: function () {
                return this._textures;
              },
              set: function (t) {
                if (t[0] instanceof i.xE)
                  (this._textures = t), (this._durations = null);
                else {
                  (this._textures = []), (this._durations = []);
                  for (var e = 0; e < t.length; e++)
                    this._textures.push(t[e].texture),
                      this._durations.push(t[e].time);
                }
                (this._previousFrame = null),
                  this.gotoAndStop(0),
                  this.updateTexture();
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "currentFrame", {
              get: function () {
                var t = Math.floor(this._currentTime) % this._textures.length;
                return t < 0 && (t += this._textures.length), t;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "playing", {
              get: function () {
                return this._playing;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "autoUpdate", {
              get: function () {
                return this._autoUpdate;
              },
              set: function (t) {
                t !== this._autoUpdate &&
                  ((this._autoUpdate = t),
                  !this._autoUpdate && this._isConnectedToTicker
                    ? (o.vB.shared.remove(this.update, this),
                      (this._isConnectedToTicker = !1))
                    : this._autoUpdate &&
                      !this._isConnectedToTicker &&
                      this._playing &&
                      (o.vB.shared.add(this.update, this),
                      (this._isConnectedToTicker = !0)));
              },
              enumerable: !1,
              configurable: !0,
            }),
            e
          );
        })(n.j);
    },
    4615: (t, e, r) => {
      r.d(e, { S: () => f, o: () => c });
      var i = r(5307),
        n = r(4295),
        o = r(9038),
        s = r(5323),
        a = r(7054),
        h = function (t, e) {
          return (
            (h =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (t, e) {
                  t.__proto__ = e;
                }) ||
              function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
              }),
            h(t, e)
          );
        };
      function u(t, e) {
        function r() {
          this.constructor = t;
        }
        h(t, e),
          (t.prototype =
            null === e
              ? Object.create(e)
              : ((r.prototype = e.prototype), new r()));
      }
      var l = new n.E9(),
        c = (function (t) {
          function e(e, r, o) {
            void 0 === r && (r = 100), void 0 === o && (o = 100);
            var s = t.call(this, e) || this;
            return (
              (s.tileTransform = new n.wx()),
              (s._width = r),
              (s._height = o),
              (s.uvMatrix = s.texture.uvMatrix || new i.UX(e)),
              (s.pluginName = "tilingSprite"),
              (s.uvRespectAnchor = !1),
              s
            );
          }
          return (
            u(e, t),
            Object.defineProperty(e.prototype, "clampMargin", {
              get: function () {
                return this.uvMatrix.clampMargin;
              },
              set: function (t) {
                (this.uvMatrix.clampMargin = t), this.uvMatrix.update(!0);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "tileScale", {
              get: function () {
                return this.tileTransform.scale;
              },
              set: function (t) {
                this.tileTransform.scale.copyFrom(t);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "tilePosition", {
              get: function () {
                return this.tileTransform.position;
              },
              set: function (t) {
                this.tileTransform.position.copyFrom(t);
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype._onTextureUpdate = function () {
              this.uvMatrix && (this.uvMatrix.texture = this._texture),
                (this._cachedTint = 16777215);
            }),
            (e.prototype._render = function (t) {
              var e = this._texture;
              e &&
                e.valid &&
                (this.tileTransform.updateLocalTransform(),
                this.uvMatrix.update(),
                t.batch.setObjectRenderer(t.plugins[this.pluginName]),
                t.plugins[this.pluginName].render(this));
            }),
            (e.prototype._calculateBounds = function () {
              var t = this._width * -this._anchor._x,
                e = this._height * -this._anchor._y,
                r = this._width * (1 - this._anchor._x),
                i = this._height * (1 - this._anchor._y);
              this._bounds.addFrame(this.transform, t, e, r, i);
            }),
            (e.prototype.getLocalBounds = function (e) {
              return 0 === this.children.length
                ? ((this._bounds.minX = this._width * -this._anchor._x),
                  (this._bounds.minY = this._height * -this._anchor._y),
                  (this._bounds.maxX = this._width * (1 - this._anchor._x)),
                  (this._bounds.maxY = this._height * (1 - this._anchor._y)),
                  e ||
                    (this._localBoundsRect ||
                      (this._localBoundsRect = new n.Ae()),
                    (e = this._localBoundsRect)),
                  this._bounds.getRectangle(e))
                : t.prototype.getLocalBounds.call(this, e);
            }),
            (e.prototype.containsPoint = function (t) {
              this.worldTransform.applyInverse(t, l);
              var e = this._width,
                r = this._height,
                i = -e * this.anchor._x;
              if (l.x >= i && l.x < i + e) {
                var n = -r * this.anchor._y;
                if (l.y >= n && l.y < n + r) return !0;
              }
              return !1;
            }),
            (e.prototype.destroy = function (e) {
              t.prototype.destroy.call(this, e),
                (this.tileTransform = null),
                (this.uvMatrix = null);
            }),
            (e.from = function (t, r) {
              return (
                "number" == typeof r &&
                  ((0, s.deprecation)(
                    "5.3.0",
                    "TilingSprite.from use options instead of width and height args"
                  ),
                  (r = { width: r, height: arguments[2] })),
                new e(i.xE.from(t, r), r.width, r.height)
              );
            }),
            Object.defineProperty(e.prototype, "width", {
              get: function () {
                return this._width;
              },
              set: function (t) {
                this._width = t;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "height", {
              get: function () {
                return this._height;
              },
              set: function (t) {
                this._height = t;
              },
              enumerable: !1,
              configurable: !0,
            }),
            e
          );
        })(o.j),
        d =
          "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\n}\n",
        p = new n.y3(),
        f = (function (t) {
          function e(e) {
            var r = t.call(this, e) || this,
              n = { globals: r.renderer.globalUniforms };
            return (
              (r.shader = i.ex.from(
                d,
                "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\nuniform mat3 uMapCoord;\nuniform vec4 uClampFrame;\nuniform vec2 uClampOffset;\n\nvoid main(void)\n{\n    vec2 coord = vTextureCoord + ceil(uClampOffset - vTextureCoord);\n    coord = (uMapCoord * vec3(coord, 1.0)).xy;\n    coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);\n\n    vec4 texSample = texture2D(uSampler, coord);\n    gl_FragColor = texSample * uColor;\n}\n",
                n
              )),
              (r.simpleShader = i.ex.from(
                d,
                "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\n\nvoid main(void)\n{\n    vec4 texSample = texture2D(uSampler, vTextureCoord);\n    gl_FragColor = texSample * uColor;\n}\n",
                n
              )),
              (r.quad = new i.ud()),
              (r.state = i.ZM.for2d()),
              r
            );
          }
          return (
            u(e, t),
            (e.prototype.render = function (t) {
              var e = this.renderer,
                r = this.quad,
                i = r.vertices;
              (i[0] = i[6] = t._width * -t.anchor.x),
                (i[1] = i[3] = t._height * -t.anchor.y),
                (i[2] = i[4] = t._width * (1 - t.anchor.x)),
                (i[5] = i[7] = t._height * (1 - t.anchor.y)),
                t.uvRespectAnchor &&
                  (((i = r.uvs)[0] = i[6] = -t.anchor.x),
                  (i[1] = i[3] = -t.anchor.y),
                  (i[2] = i[4] = 1 - t.anchor.x),
                  (i[5] = i[7] = 1 - t.anchor.y)),
                r.invalidate();
              var n = t._texture,
                o = n.baseTexture,
                h = t.tileTransform.localTransform,
                u = t.uvMatrix,
                l =
                  o.isPowerOfTwo &&
                  n.frame.width === o.width &&
                  n.frame.height === o.height;
              l &&
                (o._glTextures[e.CONTEXT_UID]
                  ? (l = o.wrapMode !== a.Nt.CLAMP)
                  : o.wrapMode === a.Nt.CLAMP && (o.wrapMode = a.Nt.REPEAT));
              var c = l ? this.simpleShader : this.shader,
                d = n.width,
                f = n.height,
                m = t._width,
                v = t._height;
              p.set(
                (h.a * d) / m,
                (h.b * d) / v,
                (h.c * f) / m,
                (h.d * f) / v,
                h.tx / m,
                h.ty / v
              ),
                p.invert(),
                l
                  ? p.prepend(u.mapCoord)
                  : ((c.uniforms.uMapCoord = u.mapCoord.toArray(!0)),
                    (c.uniforms.uClampFrame = u.uClampFrame),
                    (c.uniforms.uClampOffset = u.uClampOffset)),
                (c.uniforms.uTransform = p.toArray(!0)),
                (c.uniforms.uColor = (0, s.premultiplyTintToRgba)(
                  t.tint,
                  t.worldAlpha,
                  c.uniforms.uColor,
                  o.alphaMode
                )),
                (c.uniforms.translationMatrix =
                  t.transform.worldTransform.toArray(!0)),
                (c.uniforms.uSampler = n),
                e.shader.bind(c),
                e.geometry.bind(r),
                (this.state.blendMode = (0, s.correctBlendMode)(
                  t.blendMode,
                  o.alphaMode
                )),
                e.state.set(this.state),
                e.geometry.draw(this.renderer.gl.TRIANGLES, 6, 0);
            }),
            e
          );
        })(i.bO);
    },
    9038: (t, e, r) => {
      r.d(e, { j: () => d });
      var i = r(7054),
        n = r(5307),
        o = r(29),
        s = r(4295),
        a = r(1573),
        h = r(5323),
        u = function (t, e) {
          return (
            (u =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (t, e) {
                  t.__proto__ = e;
                }) ||
              function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
              }),
            u(t, e)
          );
        },
        l = new s.E9(),
        c = new Uint16Array([0, 1, 2, 0, 2, 3]),
        d = (function (t) {
          function e(e) {
            var r = t.call(this) || this;
            return (
              (r._anchor = new s.AB(
                r._onAnchorUpdate,
                r,
                e ? e.defaultAnchor.x : 0,
                e ? e.defaultAnchor.y : 0
              )),
              (r._texture = null),
              (r._width = 0),
              (r._height = 0),
              (r._tint = null),
              (r._tintRGB = null),
              (r.tint = 16777215),
              (r.blendMode = i.T$.NORMAL),
              (r._cachedTint = 16777215),
              (r.uvs = null),
              (r.texture = e || n.xE.EMPTY),
              (r.vertexData = new Float32Array(8)),
              (r.vertexTrimmedData = null),
              (r._transformID = -1),
              (r._textureID = -1),
              (r._transformTrimmedID = -1),
              (r._textureTrimmedID = -1),
              (r.indices = c),
              (r.pluginName = "batch"),
              (r.isSprite = !0),
              (r._roundPixels = a.X.ROUND_PIXELS),
              r
            );
          }
          return (
            (function (t, e) {
              function r() {
                this.constructor = t;
              }
              u(t, e),
                (t.prototype =
                  null === e
                    ? Object.create(e)
                    : ((r.prototype = e.prototype), new r()));
            })(e, t),
            (e.prototype._onTextureUpdate = function () {
              (this._textureID = -1),
                (this._textureTrimmedID = -1),
                (this._cachedTint = 16777215),
                this._width &&
                  (this.scale.x =
                    ((0, h.sign)(this.scale.x) * this._width) /
                    this._texture.orig.width),
                this._height &&
                  (this.scale.y =
                    ((0, h.sign)(this.scale.y) * this._height) /
                    this._texture.orig.height);
            }),
            (e.prototype._onAnchorUpdate = function () {
              (this._transformID = -1), (this._transformTrimmedID = -1);
            }),
            (e.prototype.calculateVertices = function () {
              var t = this._texture;
              if (
                this._transformID !== this.transform._worldID ||
                this._textureID !== t._updateID
              ) {
                this._textureID !== t._updateID &&
                  (this.uvs = this._texture._uvs.uvsFloat32),
                  (this._transformID = this.transform._worldID),
                  (this._textureID = t._updateID);
                var e = this.transform.worldTransform,
                  r = e.a,
                  i = e.b,
                  n = e.c,
                  o = e.d,
                  s = e.tx,
                  h = e.ty,
                  u = this.vertexData,
                  l = t.trim,
                  c = t.orig,
                  d = this._anchor,
                  p = 0,
                  f = 0,
                  m = 0,
                  v = 0;
                if (
                  (l
                    ? ((p = (f = l.x - d._x * c.width) + l.width),
                      (m = (v = l.y - d._y * c.height) + l.height))
                    : ((p = (f = -d._x * c.width) + c.width),
                      (m = (v = -d._y * c.height) + c.height)),
                  (u[0] = r * f + n * v + s),
                  (u[1] = o * v + i * f + h),
                  (u[2] = r * p + n * v + s),
                  (u[3] = o * v + i * p + h),
                  (u[4] = r * p + n * m + s),
                  (u[5] = o * m + i * p + h),
                  (u[6] = r * f + n * m + s),
                  (u[7] = o * m + i * f + h),
                  this._roundPixels)
                )
                  for (var y = a.X.RESOLUTION, g = 0; g < u.length; ++g)
                    u[g] = Math.round(((u[g] * y) | 0) / y);
              }
            }),
            (e.prototype.calculateTrimmedVertices = function () {
              if (this.vertexTrimmedData) {
                if (
                  this._transformTrimmedID === this.transform._worldID &&
                  this._textureTrimmedID === this._texture._updateID
                )
                  return;
              } else this.vertexTrimmedData = new Float32Array(8);
              (this._transformTrimmedID = this.transform._worldID),
                (this._textureTrimmedID = this._texture._updateID);
              var t = this._texture,
                e = this.vertexTrimmedData,
                r = t.orig,
                i = this._anchor,
                n = this.transform.worldTransform,
                o = n.a,
                s = n.b,
                a = n.c,
                h = n.d,
                u = n.tx,
                l = n.ty,
                c = -i._x * r.width,
                d = c + r.width,
                p = -i._y * r.height,
                f = p + r.height;
              (e[0] = o * c + a * p + u),
                (e[1] = h * p + s * c + l),
                (e[2] = o * d + a * p + u),
                (e[3] = h * p + s * d + l),
                (e[4] = o * d + a * f + u),
                (e[5] = h * f + s * d + l),
                (e[6] = o * c + a * f + u),
                (e[7] = h * f + s * c + l);
            }),
            (e.prototype._render = function (t) {
              this.calculateVertices(),
                t.batch.setObjectRenderer(t.plugins[this.pluginName]),
                t.plugins[this.pluginName].render(this);
            }),
            (e.prototype._calculateBounds = function () {
              var t = this._texture.trim,
                e = this._texture.orig;
              !t || (t.width === e.width && t.height === e.height)
                ? (this.calculateVertices(),
                  this._bounds.addQuad(this.vertexData))
                : (this.calculateTrimmedVertices(),
                  this._bounds.addQuad(this.vertexTrimmedData));
            }),
            (e.prototype.getLocalBounds = function (e) {
              return 0 === this.children.length
                ? ((this._bounds.minX =
                    this._texture.orig.width * -this._anchor._x),
                  (this._bounds.minY =
                    this._texture.orig.height * -this._anchor._y),
                  (this._bounds.maxX =
                    this._texture.orig.width * (1 - this._anchor._x)),
                  (this._bounds.maxY =
                    this._texture.orig.height * (1 - this._anchor._y)),
                  e ||
                    (this._localBoundsRect ||
                      (this._localBoundsRect = new s.Ae()),
                    (e = this._localBoundsRect)),
                  this._bounds.getRectangle(e))
                : t.prototype.getLocalBounds.call(this, e);
            }),
            (e.prototype.containsPoint = function (t) {
              this.worldTransform.applyInverse(t, l);
              var e = this._texture.orig.width,
                r = this._texture.orig.height,
                i = -e * this.anchor.x,
                n = 0;
              return (
                l.x >= i &&
                l.x < i + e &&
                ((n = -r * this.anchor.y), l.y >= n && l.y < n + r)
              );
            }),
            (e.prototype.destroy = function (e) {
              if (
                (t.prototype.destroy.call(this, e),
                this._texture.off("update", this._onTextureUpdate, this),
                (this._anchor = null),
                "boolean" == typeof e ? e : e && e.texture)
              ) {
                var r = "boolean" == typeof e ? e : e && e.baseTexture;
                this._texture.destroy(!!r);
              }
              this._texture = null;
            }),
            (e.from = function (t, r) {
              return new e(t instanceof n.xE ? t : n.xE.from(t, r));
            }),
            Object.defineProperty(e.prototype, "roundPixels", {
              get: function () {
                return this._roundPixels;
              },
              set: function (t) {
                this._roundPixels !== t && (this._transformID = -1),
                  (this._roundPixels = t);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "width", {
              get: function () {
                return Math.abs(this.scale.x) * this._texture.orig.width;
              },
              set: function (t) {
                var e = (0, h.sign)(this.scale.x) || 1;
                (this.scale.x = (e * t) / this._texture.orig.width),
                  (this._width = t);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "height", {
              get: function () {
                return Math.abs(this.scale.y) * this._texture.orig.height;
              },
              set: function (t) {
                var e = (0, h.sign)(this.scale.y) || 1;
                (this.scale.y = (e * t) / this._texture.orig.height),
                  (this._height = t);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "anchor", {
              get: function () {
                return this._anchor;
              },
              set: function (t) {
                this._anchor.copyFrom(t);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "tint", {
              get: function () {
                return this._tint;
              },
              set: function (t) {
                (this._tint = t),
                  (this._tintRGB = (t >> 16) + (65280 & t) + ((255 & t) << 16));
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "texture", {
              get: function () {
                return this._texture;
              },
              set: function (t) {
                this._texture !== t &&
                  (this._texture &&
                    this._texture.off("update", this._onTextureUpdate, this),
                  (this._texture = t || n.xE.EMPTY),
                  (this._cachedTint = 16777215),
                  (this._textureID = -1),
                  (this._textureTrimmedID = -1),
                  t &&
                    (t.baseTexture.valid
                      ? this._onTextureUpdate()
                      : t.once("update", this._onTextureUpdate, this)));
              },
              enumerable: !1,
              configurable: !0,
            }),
            e
          );
        })(o.W2);
    },
    2981: (t, e, r) => {
      r.d(e, { c: () => a, o: () => h });
      var i = r(4295),
        n = r(5307),
        o = r(5323),
        s = r(7235),
        a = (function () {
          function t(t, e, r) {
            void 0 === r && (r = null),
              (this._texture = t instanceof n.xE ? t : null),
              (this.baseTexture =
                t instanceof n.VL ? t : this._texture.baseTexture),
              (this.textures = {}),
              (this.animations = {}),
              (this.data = e);
            var i = this.baseTexture.resource;
            (this.resolution = this._updateResolution(r || (i ? i.url : null))),
              (this._frames = this.data.frames),
              (this._frameKeys = Object.keys(this._frames)),
              (this._batchIndex = 0),
              (this._callback = null);
          }
          return (
            (t.prototype._updateResolution = function (t) {
              void 0 === t && (t = null);
              var e = this.data.meta.scale,
                r = (0, o.getResolutionOfUrl)(t, null);
              return (
                null === r && (r = void 0 !== e ? parseFloat(e) : 1),
                1 !== r && this.baseTexture.setResolution(r),
                r
              );
            }),
            (t.prototype.parse = function (e) {
              (this._batchIndex = 0),
                (this._callback = e),
                this._frameKeys.length <= t.BATCH_SIZE
                  ? (this._processFrames(0),
                    this._processAnimations(),
                    this._parseComplete())
                  : this._nextBatch();
            }),
            (t.prototype._processFrames = function (e) {
              for (
                var r = e, o = t.BATCH_SIZE;
                r - e < o && r < this._frameKeys.length;

              ) {
                var s = this._frameKeys[r],
                  a = this._frames[s],
                  h = a.frame;
                if (h) {
                  var u,
                    l = null,
                    c =
                      !1 !== a.trimmed && a.sourceSize ? a.sourceSize : a.frame,
                    d = new i.Ae(
                      0,
                      0,
                      Math.floor(c.w) / this.resolution,
                      Math.floor(c.h) / this.resolution
                    );
                  (u = a.rotated
                    ? new i.Ae(
                        Math.floor(h.x) / this.resolution,
                        Math.floor(h.y) / this.resolution,
                        Math.floor(h.h) / this.resolution,
                        Math.floor(h.w) / this.resolution
                      )
                    : new i.Ae(
                        Math.floor(h.x) / this.resolution,
                        Math.floor(h.y) / this.resolution,
                        Math.floor(h.w) / this.resolution,
                        Math.floor(h.h) / this.resolution
                      )),
                    !1 !== a.trimmed &&
                      a.spriteSourceSize &&
                      (l = new i.Ae(
                        Math.floor(a.spriteSourceSize.x) / this.resolution,
                        Math.floor(a.spriteSourceSize.y) / this.resolution,
                        Math.floor(h.w) / this.resolution,
                        Math.floor(h.h) / this.resolution
                      )),
                    (this.textures[s] = new n.xE(
                      this.baseTexture,
                      u,
                      d,
                      l,
                      a.rotated ? 2 : 0,
                      a.anchor
                    )),
                    n.xE.addToCache(this.textures[s], s);
                }
                r++;
              }
            }),
            (t.prototype._processAnimations = function () {
              var t = this.data.animations || {};
              for (var e in t) {
                this.animations[e] = [];
                for (var r = 0; r < t[e].length; r++) {
                  var i = t[e][r];
                  this.animations[e].push(this.textures[i]);
                }
              }
            }),
            (t.prototype._parseComplete = function () {
              var t = this._callback;
              (this._callback = null),
                (this._batchIndex = 0),
                t.call(this, this.textures);
            }),
            (t.prototype._nextBatch = function () {
              var e = this;
              this._processFrames(this._batchIndex * t.BATCH_SIZE),
                this._batchIndex++,
                setTimeout(function () {
                  e._batchIndex * t.BATCH_SIZE < e._frameKeys.length
                    ? e._nextBatch()
                    : (e._processAnimations(), e._parseComplete());
                }, 0);
            }),
            (t.prototype.destroy = function (t) {
              var e;
              for (var r in (void 0 === t && (t = !1), this.textures))
                this.textures[r].destroy();
              (this._frames = null),
                (this._frameKeys = null),
                (this.data = null),
                (this.textures = null),
                t &&
                  (null === (e = this._texture) || void 0 === e || e.destroy(),
                  this.baseTexture.destroy()),
                (this._texture = null),
                (this.baseTexture = null);
            }),
            (t.BATCH_SIZE = 1e3),
            t
          );
        })(),
        h = (function () {
          function t() {}
          return (
            (t.use = function (e, r) {
              var i = this,
                n = e.name + "_image";
              if (
                e.data &&
                e.type === s.kC.TYPE.JSON &&
                e.data.frames &&
                !i.resources[n]
              ) {
                var o = {
                    crossOrigin: e.crossOrigin,
                    metadata: e.metadata.imageMetadata,
                    parentResource: e,
                  },
                  h = t.getResourcePath(e, i.baseUrl);
                i.add(n, h, o, function (t) {
                  if (t.error) r(t.error);
                  else {
                    var i = new a(t.texture, e.data, e.url);
                    i.parse(function () {
                      (e.spritesheet = i), (e.textures = i.textures), r();
                    });
                  }
                });
              } else r();
            }),
            (t.getResourcePath = function (t, e) {
              return t.isDataUrl
                ? t.data.meta.image
                : o.url.resolve(t.url.replace(e, ""), t.data.meta.image);
            }),
            t
          );
        })();
    },
    9539: (t, e, r) => {
      r.d(e, { UP: () => _, Xz: () => T, d0: () => d, vl: () => E });
      var i = r(4295),
        n = r(1573),
        o = r(1473),
        s = r(5323),
        a = r(5307),
        h = r(8093),
        u = r(29),
        l = r(7235),
        c = function (t, e) {
          return (
            (c =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (t, e) {
                  t.__proto__ = e;
                }) ||
              function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
              }),
            c(t, e)
          );
        },
        d = function () {
          (this.info = []),
            (this.common = []),
            (this.page = []),
            (this.char = []),
            (this.kerning = []);
        },
        p = (function () {
          function t() {}
          return (
            (t.test = function (t) {
              return "string" == typeof t && 0 === t.indexOf("info face=");
            }),
            (t.parse = function (t) {
              var e = t.match(/^[a-z]+\s+.+$/gm),
                r = {
                  info: [],
                  common: [],
                  page: [],
                  char: [],
                  chars: [],
                  kerning: [],
                  kernings: [],
                };
              for (var i in e) {
                var n = e[i].match(/^[a-z]+/gm)[0],
                  o = e[i].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm),
                  s = {};
                for (var a in o) {
                  var h = o[a].split("="),
                    u = h[0],
                    l = h[1].replace(/"/gm, ""),
                    c = parseFloat(l),
                    p = isNaN(c) ? l : c;
                  s[u] = p;
                }
                r[n].push(s);
              }
              var f = new d();
              return (
                r.info.forEach(function (t) {
                  return f.info.push({
                    face: t.face,
                    size: parseInt(t.size, 10),
                  });
                }),
                r.common.forEach(function (t) {
                  return f.common.push({
                    lineHeight: parseInt(t.lineHeight, 10),
                  });
                }),
                r.page.forEach(function (t) {
                  return f.page.push({ id: parseInt(t.id, 10), file: t.file });
                }),
                r.char.forEach(function (t) {
                  return f.char.push({
                    id: parseInt(t.id, 10),
                    page: parseInt(t.page, 10),
                    x: parseInt(t.x, 10),
                    y: parseInt(t.y, 10),
                    width: parseInt(t.width, 10),
                    height: parseInt(t.height, 10),
                    xoffset: parseInt(t.xoffset, 10),
                    yoffset: parseInt(t.yoffset, 10),
                    xadvance: parseInt(t.xadvance, 10),
                  });
                }),
                r.kerning.forEach(function (t) {
                  return f.kerning.push({
                    first: parseInt(t.first, 10),
                    second: parseInt(t.second, 10),
                    amount: parseInt(t.amount, 10),
                  });
                }),
                f
              );
            }),
            t
          );
        })(),
        f = (function () {
          function t() {}
          return (
            (t.test = function (t) {
              return (
                t instanceof XMLDocument &&
                t.getElementsByTagName("page").length &&
                null !== t.getElementsByTagName("info")[0].getAttribute("face")
              );
            }),
            (t.parse = function (t) {
              for (
                var e = new d(),
                  r = t.getElementsByTagName("info"),
                  i = t.getElementsByTagName("common"),
                  n = t.getElementsByTagName("page"),
                  o = t.getElementsByTagName("char"),
                  s = t.getElementsByTagName("kerning"),
                  a = 0;
                a < r.length;
                a++
              )
                e.info.push({
                  face: r[a].getAttribute("face"),
                  size: parseInt(r[a].getAttribute("size"), 10),
                });
              for (a = 0; a < i.length; a++)
                e.common.push({
                  lineHeight: parseInt(i[a].getAttribute("lineHeight"), 10),
                });
              for (a = 0; a < n.length; a++)
                e.page.push({
                  id: parseInt(n[a].getAttribute("id"), 10) || 0,
                  file: n[a].getAttribute("file"),
                });
              for (a = 0; a < o.length; a++) {
                var h = o[a];
                e.char.push({
                  id: parseInt(h.getAttribute("id"), 10),
                  page: parseInt(h.getAttribute("page"), 10) || 0,
                  x: parseInt(h.getAttribute("x"), 10),
                  y: parseInt(h.getAttribute("y"), 10),
                  width: parseInt(h.getAttribute("width"), 10),
                  height: parseInt(h.getAttribute("height"), 10),
                  xoffset: parseInt(h.getAttribute("xoffset"), 10),
                  yoffset: parseInt(h.getAttribute("yoffset"), 10),
                  xadvance: parseInt(h.getAttribute("xadvance"), 10),
                });
              }
              for (a = 0; a < s.length; a++)
                e.kerning.push({
                  first: parseInt(s[a].getAttribute("first"), 10),
                  second: parseInt(s[a].getAttribute("second"), 10),
                  amount: parseInt(s[a].getAttribute("amount"), 10),
                });
              return e;
            }),
            t
          );
        })(),
        m = (function () {
          function t() {}
          return (
            (t.test = function (t) {
              if ("string" == typeof t && t.indexOf("<font>") > -1) {
                var e = new self.DOMParser().parseFromString(t, "text/xml");
                return f.test(e);
              }
              return !1;
            }),
            (t.parse = function (t) {
              var e = new window.DOMParser().parseFromString(t, "text/xml");
              return f.parse(e);
            }),
            t
          );
        })(),
        v = [p, f, m];
      function y(t) {
        for (var e = 0; e < v.length; e++) if (v[e].test(t)) return v[e];
        return null;
      }
      function g(t, e, r, i, n, o, a) {
        var u = r.text,
          l = r.fontProperties;
        e.translate(i, n), e.scale(o, o);
        var c = a.strokeThickness / 2,
          d = -a.strokeThickness / 2;
        if (
          ((e.font = a.toFontString()),
          (e.lineWidth = a.strokeThickness),
          (e.textBaseline = a.textBaseline),
          (e.lineJoin = a.lineJoin),
          (e.miterLimit = a.miterLimit),
          (e.fillStyle = (function (t, e, r, i, n, o) {
            var s,
              a = r.fill;
            if (!Array.isArray(a)) return a;
            if (1 === a.length) return a[0];
            var u = r.dropShadow ? r.dropShadowDistance : 0,
              l = r.padding || 0,
              c = Math.ceil(t.width / i) - u - 2 * l,
              d = Math.ceil(t.height / i) - u - 2 * l,
              p = a.slice(),
              f = r.fillGradientStops.slice();
            if (!f.length)
              for (var m = p.length + 1, v = 1; v < m; ++v) f.push(v / m);
            if (
              (p.unshift(a[0]),
              f.unshift(0),
              p.push(a[a.length - 1]),
              f.push(1),
              r.fillGradientType === h.M_.LINEAR_VERTICAL)
            ) {
              s = e.createLinearGradient(c / 2, l, c / 2, d + l);
              var y = 0,
                g = (o.fontProperties.fontSize + r.strokeThickness) / d;
              for (v = 0; v < n.length; v++)
                for (var _ = o.lineHeight * v, b = 0; b < p.length; b++) {
                  var x =
                      _ / d +
                      ("number" == typeof f[b] ? f[b] : b / p.length) * g,
                    T = Math.max(y, x);
                  (T = Math.min(T, 1)), s.addColorStop(T, p[b]), (y = T);
                }
            } else {
              s = e.createLinearGradient(l, d / 2, c + l, d / 2);
              var E = p.length + 1,
                w = 1;
              for (v = 0; v < p.length; v++) {
                var A;
                (A = "number" == typeof f[v] ? f[v] : w / E),
                  s.addColorStop(A, p[v]),
                  w++;
              }
            }
            return s;
          })(t, e, a, o, [u], r)),
          (e.strokeStyle = a.stroke),
          a.dropShadow)
        ) {
          var p = a.dropShadowColor,
            f = (0, s.hex2rgb)("number" == typeof p ? p : (0, s.string2hex)(p)),
            m = a.dropShadowBlur * o,
            v = a.dropShadowDistance * o;
          (e.shadowColor =
            "rgba(" +
            255 * f[0] +
            "," +
            255 * f[1] +
            "," +
            255 * f[2] +
            "," +
            a.dropShadowAlpha +
            ")"),
            (e.shadowBlur = m),
            (e.shadowOffsetX = Math.cos(a.dropShadowAngle) * v),
            (e.shadowOffsetY = Math.sin(a.dropShadowAngle) * v);
        } else
          (e.shadowColor = "black"),
            (e.shadowBlur = 0),
            (e.shadowOffsetX = 0),
            (e.shadowOffsetY = 0);
        a.stroke &&
          a.strokeThickness &&
          e.strokeText(u, c, d + r.lineHeight - l.descent),
          a.fill && e.fillText(u, c, d + r.lineHeight - l.descent),
          e.setTransform(1, 0, 0, 1, 0, 0),
          (e.fillStyle = "rgba(0, 0, 0, 0)");
      }
      var _ = (function () {
          function t(t, e, r) {
            var n = t.info[0],
              o = t.common[0],
              h = t.page[0],
              u = (0, s.getResolutionOfUrl)(h.file),
              l = {};
            (this._ownsTextures = r),
              (this.font = n.face),
              (this.size = n.size),
              (this.lineHeight = o.lineHeight / u),
              (this.chars = {}),
              (this.pageTextures = l);
            for (var c = 0; c < t.page.length; c++) {
              var d = t.page[c],
                p = d.id,
                f = d.file;
              l[p] = e instanceof Array ? e[c] : e[f];
            }
            for (c = 0; c < t.char.length; c++) {
              var m = t.char[c],
                v = ((p = m.id), m.page),
                y = t.char[c],
                g = y.x,
                _ = y.y,
                b = y.width,
                x = y.height,
                T = y.xoffset,
                E = y.yoffset,
                w = y.xadvance;
              (g /= u),
                (_ /= u),
                (b /= u),
                (x /= u),
                (T /= u),
                (E /= u),
                (w /= u);
              var A = new i.Ae(
                g + l[v].frame.x / u,
                _ + l[v].frame.y / u,
                b,
                x
              );
              this.chars[p] = {
                xOffset: T,
                yOffset: E,
                xAdvance: w,
                kerning: {},
                texture: new a.xE(l[v].baseTexture, A),
                page: v,
              };
            }
            for (c = 0; c < t.kerning.length; c++) {
              var S = t.kerning[c],
                I = S.first,
                P = S.second,
                O = S.amount;
              (I /= u),
                (P /= u),
                (O /= u),
                this.chars[P] && (this.chars[P].kerning[I] = O);
            }
          }
          return (
            (t.prototype.destroy = function () {
              for (var t in this.chars)
                this.chars[t].texture.destroy(), (this.chars[t].texture = null);
              for (var t in this.pageTextures)
                this._ownsTextures && this.pageTextures[t].destroy(!0),
                  (this.pageTextures[t] = null);
              (this.chars = null), (this.pageTextures = null);
            }),
            (t.install = function (e, r, i) {
              var n;
              if (e instanceof d) n = e;
              else {
                var o = y(e);
                if (!o) throw new Error("Unrecognized data format for font.");
                n = o.parse(e);
              }
              r instanceof a.xE && (r = [r]);
              var s = new t(n, r, i);
              return (t.available[s.font] = s), s;
            }),
            (t.uninstall = function (e) {
              var r = t.available[e];
              if (!r) throw new Error("No font found named '" + e + "'");
              r.destroy(), delete t.available[e];
            }),
            (t.from = function (e, r, i) {
              if (!e)
                throw new Error("[BitmapFont] Property `name` is required.");
              var n = Object.assign({}, t.defaultOptions, i),
                o = n.chars,
                s = n.padding,
                u = n.resolution,
                l = n.textureWidth,
                c = n.textureHeight,
                p = (function (t) {
                  "string" == typeof t && (t = [t]);
                  for (var e = [], r = 0, i = t.length; r < i; r++) {
                    var n = t[r];
                    if (Array.isArray(n)) {
                      if (2 !== n.length)
                        throw new Error(
                          "[BitmapFont]: Invalid character range length, expecting 2 got " +
                            n.length +
                            "."
                        );
                      var o = n[0].charCodeAt(0),
                        s = n[1].charCodeAt(0);
                      if (s < o)
                        throw new Error(
                          "[BitmapFont]: Invalid character range."
                        );
                      for (var a = o, h = s; a <= h; a++)
                        e.push(String.fromCharCode(a));
                    } else e.push.apply(e, n.split(""));
                  }
                  if (0 === e.length)
                    throw new Error(
                      "[BitmapFont]: Empty set when resolving characters."
                    );
                  return e;
                })(o),
                f = r instanceof h.pn ? r : new h.pn(r),
                m = l,
                v = new d();
              (v.info[0] = { face: f.fontFamily, size: f.fontSize }),
                (v.common[0] = { lineHeight: f.fontSize });
              for (
                var y, _, b, x = 0, T = 0, E = 0, w = [], A = 0;
                A < p.length;
                A++
              ) {
                y ||
                  (((y = document.createElement("canvas")).width = l),
                  (y.height = c),
                  (_ = y.getContext("2d")),
                  (b = new a.VL(y, { resolution: u })),
                  w.push(new a.xE(b)),
                  v.page.push({ id: w.length - 1, file: "" }));
                var S = h._A.measureText(p[A], f, !1, y),
                  I = S.width,
                  P = Math.ceil(S.height),
                  O = Math.ceil(("italic" === f.fontStyle ? 2 : 1) * I);
                if (T >= c - P * u) {
                  if (0 === T)
                    throw new Error(
                      "[BitmapFont] textureHeight " +
                        c +
                        "px is too small for " +
                        f.fontSize +
                        "px fonts"
                    );
                  --A,
                    (y = null),
                    (_ = null),
                    (b = null),
                    (T = 0),
                    (x = 0),
                    (E = 0);
                } else if (
                  ((E = Math.max(P + S.fontProperties.descent, E)),
                  O * u + x >= m)
                )
                  --A, (T += E * u), (T = Math.ceil(T)), (x = 0), (E = 0);
                else {
                  g(y, _, S, x, T, u, f);
                  var C = S.text.charCodeAt(0);
                  v.char.push({
                    id: C,
                    page: w.length - 1,
                    x: x / u,
                    y: T / u,
                    width: O,
                    height: P,
                    xoffset: 0,
                    yoffset: 0,
                    xadvance: Math.ceil(
                      I -
                        (f.dropShadow ? f.dropShadowDistance : 0) -
                        (f.stroke ? f.strokeThickness : 0)
                    ),
                  }),
                    (x += (O + 2 * s) * u),
                    (x = Math.ceil(x));
                }
              }
              var M = new t(v, w, !0);
              return (
                void 0 !== t.available[e] && t.uninstall(e),
                (t.available[e] = M),
                M
              );
            }),
            (t.ALPHA = [["a", "z"], ["A", "Z"], " "]),
            (t.NUMERIC = [["0", "9"]]),
            (t.ALPHANUMERIC = [["a", "z"], ["A", "Z"], ["0", "9"], " "]),
            (t.ASCII = [[" ", "~"]]),
            (t.defaultOptions = {
              resolution: 1,
              textureWidth: 512,
              textureHeight: 512,
              padding: 4,
              chars: t.ALPHANUMERIC,
            }),
            (t.available = {}),
            t
          );
        })(),
        b = [],
        x = [],
        T = (function (t) {
          function e(r, o) {
            void 0 === o && (o = {});
            var a = t.call(this) || this;
            (a._tint = 16777215),
              o.font &&
                ((0, s.deprecation)(
                  "5.3.0",
                  "PIXI.BitmapText constructor style.font property is deprecated."
                ),
                a._upgradeStyle(o));
            var h = Object.assign({}, e.styleDefaults, o),
              u = h.align,
              l = h.tint,
              c = h.maxWidth,
              d = h.letterSpacing,
              p = h.fontName,
              f = h.fontSize;
            if (!_.available[p])
              throw new Error('Missing BitmapFont "' + p + '"');
            return (
              (a._activePagesMeshData = []),
              (a._textWidth = 0),
              (a._textHeight = 0),
              (a._align = u),
              (a._tint = l),
              (a._fontName = p),
              (a._fontSize = f || _.available[p].size),
              (a._text = r),
              (a._maxWidth = c),
              (a._maxLineHeight = 0),
              (a._letterSpacing = d),
              (a._anchor = new i.AB(
                function () {
                  a.dirty = !0;
                },
                a,
                0,
                0
              )),
              (a._roundPixels = n.X.ROUND_PIXELS),
              (a.dirty = !0),
              (a._textureCache = {}),
              a
            );
          }
          return (
            (function (t, e) {
              function r() {
                this.constructor = t;
              }
              c(t, e),
                (t.prototype =
                  null === e
                    ? Object.create(e)
                    : ((r.prototype = e.prototype), new r()));
            })(e, t),
            (e.prototype.updateText = function () {
              for (
                var t,
                  e = _.available[this._fontName],
                  r = this._fontSize / e.size,
                  n = new i.E9(),
                  h = [],
                  u = [],
                  l = this._text.replace(/(?:\r\n|\r)/g, "\n") || " ",
                  c = l.length,
                  d = (this._maxWidth * e.size) / this._fontSize,
                  p = null,
                  f = 0,
                  m = 0,
                  v = 0,
                  y = -1,
                  g = 0,
                  T = 0,
                  E = 0,
                  w = 0;
                w < c;
                w++
              ) {
                var A = l.charCodeAt(w),
                  S = l.charAt(w);
                if (
                  (/(?:\s)/.test(S) && ((y = w), (g = f)),
                  "\r" !== S && "\n" !== S)
                ) {
                  var I = e.chars[A];
                  if (I) {
                    p && I.kerning[p] && (n.x += I.kerning[p]);
                    var P = x.pop() || {
                      texture: a.xE.EMPTY,
                      line: 0,
                      charCode: 0,
                      position: new i.E9(),
                    };
                    (P.texture = I.texture),
                      (P.line = v),
                      (P.charCode = A),
                      (P.position.x =
                        n.x + I.xOffset + this._letterSpacing / 2),
                      (P.position.y = n.y + I.yOffset),
                      h.push(P),
                      (n.x += I.xAdvance + this._letterSpacing),
                      (f = n.x),
                      (E = Math.max(E, I.yOffset + I.texture.height)),
                      (p = A),
                      -1 !== y &&
                        d > 0 &&
                        n.x > d &&
                        (++T,
                        (0, s.removeItems)(h, 1 + y - T, 1 + w - y),
                        (w = y),
                        (y = -1),
                        u.push(g),
                        (m = Math.max(m, g)),
                        v++,
                        (n.x = 0),
                        (n.y += e.lineHeight),
                        (p = null));
                  }
                } else
                  u.push(f),
                    (m = Math.max(m, f)),
                    ++v,
                    ++T,
                    (n.x = 0),
                    (n.y += e.lineHeight),
                    (p = null);
              }
              var O = l.charAt(l.length - 1);
              "\r" !== O &&
                "\n" !== O &&
                (/(?:\s)/.test(O) && (f = g), u.push(f), (m = Math.max(m, f)));
              var C = [];
              for (w = 0; w <= v; w++) {
                var M = 0;
                "right" === this._align
                  ? (M = m - u[w])
                  : "center" === this._align && (M = (m - u[w]) / 2),
                  C.push(M);
              }
              var D = h.length,
                R = {},
                N = [],
                L = this._activePagesMeshData;
              for (w = 0; w < L.length; w++) b.push(L[w]);
              for (w = 0; w < D; w++) {
                var F = (V = h[w].texture).baseTexture.uid;
                if (!R[F]) {
                  if (!(J = b.pop())) {
                    var U = new o.xc(),
                      B = new o.rY(a.xE.EMPTY);
                    J = {
                      index: 0,
                      indexCount: 0,
                      vertexCount: 0,
                      uvsCount: 0,
                      total: 0,
                      mesh: new o.Kj(U, B),
                      vertices: null,
                      uvs: null,
                      indices: null,
                    };
                  }
                  (J.index = 0),
                    (J.indexCount = 0),
                    (J.vertexCount = 0),
                    (J.uvsCount = 0),
                    (J.total = 0);
                  var k = this._textureCache;
                  (k[F] = k[F] || new a.xE(V.baseTexture)),
                    (J.mesh.texture = k[F]),
                    (J.mesh.tint = this._tint),
                    N.push(J),
                    (R[F] = J);
                }
                R[F].total++;
              }
              for (w = 0; w < L.length; w++)
                -1 === N.indexOf(L[w]) && this.removeChild(L[w].mesh);
              for (w = 0; w < N.length; w++)
                N[w].mesh.parent !== this && this.addChild(N[w].mesh);
              for (var w in ((this._activePagesMeshData = N), R)) {
                var j = (J = R[w]).total;
                if (
                  !(
                    (null === (t = J.indices) || void 0 === t
                      ? void 0
                      : t.length) >
                    6 * j
                  ) ||
                  J.vertices.length < 2 * o.Kj.BATCHABLE_SIZE
                )
                  (J.vertices = new Float32Array(8 * j)),
                    (J.uvs = new Float32Array(8 * j)),
                    (J.indices = new Uint16Array(6 * j));
                else
                  for (
                    var H = J.total, X = J.vertices, G = 4 * H * 2;
                    G < X.length;
                    G++
                  )
                    X[G] = 0;
                J.mesh.size = 6 * j;
              }
              for (w = 0; w < D; w++) {
                var z = (S = h[w]).position.x + C[S.line];
                this._roundPixels && (z = Math.round(z));
                var V,
                  W = z * r,
                  Y = S.position.y * r,
                  q = R[(V = S.texture).baseTexture.uid],
                  K = V.frame,
                  $ = V._uvs,
                  Z = q.index++;
                (q.indices[6 * Z + 0] = 0 + 4 * Z),
                  (q.indices[6 * Z + 1] = 1 + 4 * Z),
                  (q.indices[6 * Z + 2] = 2 + 4 * Z),
                  (q.indices[6 * Z + 3] = 0 + 4 * Z),
                  (q.indices[6 * Z + 4] = 2 + 4 * Z),
                  (q.indices[6 * Z + 5] = 3 + 4 * Z),
                  (q.vertices[8 * Z + 0] = W),
                  (q.vertices[8 * Z + 1] = Y),
                  (q.vertices[8 * Z + 2] = W + K.width * r),
                  (q.vertices[8 * Z + 3] = Y),
                  (q.vertices[8 * Z + 4] = W + K.width * r),
                  (q.vertices[8 * Z + 5] = Y + K.height * r),
                  (q.vertices[8 * Z + 6] = W),
                  (q.vertices[8 * Z + 7] = Y + K.height * r),
                  (q.uvs[8 * Z + 0] = $.x0),
                  (q.uvs[8 * Z + 1] = $.y0),
                  (q.uvs[8 * Z + 2] = $.x1),
                  (q.uvs[8 * Z + 3] = $.y1),
                  (q.uvs[8 * Z + 4] = $.x2),
                  (q.uvs[8 * Z + 5] = $.y2),
                  (q.uvs[8 * Z + 6] = $.x3),
                  (q.uvs[8 * Z + 7] = $.y3);
              }
              for (var w in ((this._textWidth = m * r),
              (this._textHeight = (n.y + e.lineHeight) * r),
              R)) {
                var J = R[w];
                if (0 !== this.anchor.x || 0 !== this.anchor.y)
                  for (
                    var Q = 0,
                      tt = this._textWidth * this.anchor.x,
                      et = this._textHeight * this.anchor.y,
                      rt = 0;
                    rt < J.total;
                    rt++
                  )
                    (J.vertices[Q++] -= tt),
                      (J.vertices[Q++] -= et),
                      (J.vertices[Q++] -= tt),
                      (J.vertices[Q++] -= et),
                      (J.vertices[Q++] -= tt),
                      (J.vertices[Q++] -= et),
                      (J.vertices[Q++] -= tt),
                      (J.vertices[Q++] -= et);
                this._maxLineHeight = E * r;
                var it = J.mesh.geometry.getBuffer("aVertexPosition"),
                  nt = J.mesh.geometry.getBuffer("aTextureCoord"),
                  ot = J.mesh.geometry.getIndex();
                (it.data = J.vertices),
                  (nt.data = J.uvs),
                  (ot.data = J.indices),
                  it.update(),
                  nt.update(),
                  ot.update();
              }
              for (w = 0; w < h.length; w++) x.push(h[w]);
            }),
            (e.prototype.updateTransform = function () {
              this.validate(), this.containerUpdateTransform();
            }),
            (e.prototype.getLocalBounds = function () {
              return this.validate(), t.prototype.getLocalBounds.call(this);
            }),
            (e.prototype.validate = function () {
              this.dirty && (this.updateText(), (this.dirty = !1));
            }),
            Object.defineProperty(e.prototype, "tint", {
              get: function () {
                return this._tint;
              },
              set: function (t) {
                if (this._tint !== t) {
                  this._tint = t;
                  for (var e = 0; e < this._activePagesMeshData.length; e++)
                    this._activePagesMeshData[e].mesh.tint = t;
                }
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "align", {
              get: function () {
                return this._align;
              },
              set: function (t) {
                this._align !== t && ((this._align = t), (this.dirty = !0));
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "fontName", {
              get: function () {
                return this._fontName;
              },
              set: function (t) {
                if (!_.available[t])
                  throw new Error('Missing BitmapFont "' + t + '"');
                this._fontName !== t &&
                  ((this._fontName = t), (this.dirty = !0));
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "fontSize", {
              get: function () {
                return this._fontSize;
              },
              set: function (t) {
                this._fontSize !== t &&
                  ((this._fontSize = t), (this.dirty = !0));
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "anchor", {
              get: function () {
                return this._anchor;
              },
              set: function (t) {
                "number" == typeof t
                  ? this._anchor.set(t)
                  : this._anchor.copyFrom(t);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "text", {
              get: function () {
                return this._text;
              },
              set: function (t) {
                (t = String(null == t ? "" : t)),
                  this._text !== t && ((this._text = t), (this.dirty = !0));
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "maxWidth", {
              get: function () {
                return this._maxWidth;
              },
              set: function (t) {
                this._maxWidth !== t &&
                  ((this._maxWidth = t), (this.dirty = !0));
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "maxLineHeight", {
              get: function () {
                return this.validate(), this._maxLineHeight;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "textWidth", {
              get: function () {
                return this.validate(), this._textWidth;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "letterSpacing", {
              get: function () {
                return this._letterSpacing;
              },
              set: function (t) {
                this._letterSpacing !== t &&
                  ((this._letterSpacing = t), (this.dirty = !0));
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "roundPixels", {
              get: function () {
                return this._roundPixels;
              },
              set: function (t) {
                t !== this._roundPixels &&
                  ((this._roundPixels = t), (this.dirty = !0));
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "textHeight", {
              get: function () {
                return this.validate(), this._textHeight;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype._upgradeStyle = function (t) {
              if ("string" == typeof t.font) {
                var e = t.font.split(" ");
                (t.fontName = 1 === e.length ? e[0] : e.slice(1).join(" ")),
                  e.length >= 2 && (t.fontSize = parseInt(e[0], 10));
              } else
                (t.fontName = t.font.name),
                  (t.fontSize =
                    "number" == typeof t.font.size
                      ? t.font.size
                      : parseInt(t.font.size, 10));
            }),
            (e.prototype.destroy = function (e) {
              var r = this._textureCache;
              for (var i in r) r[i].destroy(), delete r[i];
              (this._textureCache = null), t.prototype.destroy.call(this, e);
            }),
            (e.registerFont = function (t, e) {
              return (
                (0, s.deprecation)(
                  "5.3.0",
                  "PIXI.BitmapText.registerFont is deprecated, use PIXI.BitmapFont.install"
                ),
                _.install(t, e)
              );
            }),
            Object.defineProperty(e, "fonts", {
              get: function () {
                return (
                  (0, s.deprecation)(
                    "5.3.0",
                    "PIXI.BitmapText.fonts is deprecated, use PIXI.BitmapFont.available"
                  ),
                  _.available
                );
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.styleDefaults = {
              align: "left",
              tint: 16777215,
              maxWidth: 0,
              letterSpacing: 0,
            }),
            e
          );
        })(u.W2),
        E = (function () {
          function t() {}
          return (
            (t.add = function () {
              l.kC.setExtensionXhrType("fnt", l.kC.XHR_RESPONSE_TYPE.TEXT);
            }),
            (t.use = function (e, r) {
              var i = y(e.data);
              if (i)
                for (
                  var n = t.getBaseUrl(this, e),
                    o = i.parse(e.data),
                    s = {},
                    a = function (t) {
                      (s[t.metadata.pageFile] = t.texture),
                        Object.keys(s).length === o.page.length &&
                          ((e.bitmapFont = _.install(o, s, !0)), r());
                    },
                    h = 0;
                  h < o.page.length;
                  ++h
                ) {
                  var u = o.page[h].file,
                    c = n + u,
                    d = !1;
                  for (var p in this.resources) {
                    var f = this.resources[p];
                    if (f.url === c) {
                      (f.metadata.pageFile = u),
                        f.texture ? a(f) : f.onAfterMiddleware.add(a),
                        (d = !0);
                      break;
                    }
                  }
                  if (!d) {
                    var m = {
                      crossOrigin: e.crossOrigin,
                      loadType: l.kC.LOAD_TYPE.IMAGE,
                      metadata: Object.assign(
                        { pageFile: u },
                        e.metadata.imageMetadata
                      ),
                      parentResource: e,
                    };
                    this.add(c, m, a);
                  }
                }
              else r();
            }),
            (t.getBaseUrl = function (e, r) {
              var i = r.isDataUrl ? "" : t.dirname(r.url);
              return (
                r.isDataUrl &&
                  ("." === i && (i = ""),
                  e.baseUrl &&
                    i &&
                    "/" === e.baseUrl.charAt(e.baseUrl.length - 1) &&
                    (i += "/")),
                (i = i.replace(e.baseUrl, "")) &&
                  "/" !== i.charAt(i.length - 1) &&
                  (i += "/"),
                i
              );
            }),
            (t.dirname = function (t) {
              var e = t
                .replace(/\\/g, "/")
                .replace(/\/$/, "")
                .replace(/\/[^\/]*$/, "");
              return e === t ? "." : "" === e ? "/" : e;
            }),
            t
          );
        })();
    },
    8093: (t, e, r) => {
      r.d(e, { M_: () => i, _A: () => v, pn: () => d, xv: () => _ });
      var i,
        n = r(9038),
        o = r(5307),
        s = r(1573),
        a = r(4295),
        h = r(5323),
        u = function (t, e) {
          return (
            (u =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (t, e) {
                  t.__proto__ = e;
                }) ||
              function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
              }),
            u(t, e)
          );
        };
      !(function (t) {
        (t[(t.LINEAR_VERTICAL = 0)] = "LINEAR_VERTICAL"),
          (t[(t.LINEAR_HORIZONTAL = 1)] = "LINEAR_HORIZONTAL");
      })(i || (i = {}));
      var l = {
          align: "left",
          breakWords: !1,
          dropShadow: !1,
          dropShadowAlpha: 1,
          dropShadowAngle: Math.PI / 6,
          dropShadowBlur: 0,
          dropShadowColor: "black",
          dropShadowDistance: 5,
          fill: "black",
          fillGradientType: i.LINEAR_VERTICAL,
          fillGradientStops: [],
          fontFamily: "Arial",
          fontSize: 26,
          fontStyle: "normal",
          fontVariant: "normal",
          fontWeight: "normal",
          letterSpacing: 0,
          lineHeight: 0,
          lineJoin: "miter",
          miterLimit: 10,
          padding: 0,
          stroke: "black",
          strokeThickness: 0,
          textBaseline: "alphabetic",
          trim: !1,
          whiteSpace: "pre",
          wordWrap: !1,
          wordWrapWidth: 100,
          leading: 0,
        },
        c = [
          "serif",
          "sans-serif",
          "monospace",
          "cursive",
          "fantasy",
          "system-ui",
        ],
        d = (function () {
          function t(t) {
            (this.styleID = 0), this.reset(), m(this, t, t);
          }
          return (
            (t.prototype.clone = function () {
              var e = {};
              return m(e, this, l), new t(e);
            }),
            (t.prototype.reset = function () {
              m(this, l, l);
            }),
            Object.defineProperty(t.prototype, "align", {
              get: function () {
                return this._align;
              },
              set: function (t) {
                this._align !== t && ((this._align = t), this.styleID++);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "breakWords", {
              get: function () {
                return this._breakWords;
              },
              set: function (t) {
                this._breakWords !== t &&
                  ((this._breakWords = t), this.styleID++);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "dropShadow", {
              get: function () {
                return this._dropShadow;
              },
              set: function (t) {
                this._dropShadow !== t &&
                  ((this._dropShadow = t), this.styleID++);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "dropShadowAlpha", {
              get: function () {
                return this._dropShadowAlpha;
              },
              set: function (t) {
                this._dropShadowAlpha !== t &&
                  ((this._dropShadowAlpha = t), this.styleID++);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "dropShadowAngle", {
              get: function () {
                return this._dropShadowAngle;
              },
              set: function (t) {
                this._dropShadowAngle !== t &&
                  ((this._dropShadowAngle = t), this.styleID++);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "dropShadowBlur", {
              get: function () {
                return this._dropShadowBlur;
              },
              set: function (t) {
                this._dropShadowBlur !== t &&
                  ((this._dropShadowBlur = t), this.styleID++);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "dropShadowColor", {
              get: function () {
                return this._dropShadowColor;
              },
              set: function (t) {
                var e = f(t);
                this._dropShadowColor !== e &&
                  ((this._dropShadowColor = e), this.styleID++);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "dropShadowDistance", {
              get: function () {
                return this._dropShadowDistance;
              },
              set: function (t) {
                this._dropShadowDistance !== t &&
                  ((this._dropShadowDistance = t), this.styleID++);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "fill", {
              get: function () {
                return this._fill;
              },
              set: function (t) {
                var e = f(t);
                this._fill !== e && ((this._fill = e), this.styleID++);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "fillGradientType", {
              get: function () {
                return this._fillGradientType;
              },
              set: function (t) {
                this._fillGradientType !== t &&
                  ((this._fillGradientType = t), this.styleID++);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "fillGradientStops", {
              get: function () {
                return this._fillGradientStops;
              },
              set: function (t) {
                (function (t, e) {
                  if (!Array.isArray(t) || !Array.isArray(e)) return !1;
                  if (t.length !== e.length) return !1;
                  for (var r = 0; r < t.length; ++r)
                    if (t[r] !== e[r]) return !1;
                  return !0;
                })(this._fillGradientStops, t) ||
                  ((this._fillGradientStops = t), this.styleID++);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "fontFamily", {
              get: function () {
                return this._fontFamily;
              },
              set: function (t) {
                this.fontFamily !== t &&
                  ((this._fontFamily = t), this.styleID++);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "fontSize", {
              get: function () {
                return this._fontSize;
              },
              set: function (t) {
                this._fontSize !== t && ((this._fontSize = t), this.styleID++);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "fontStyle", {
              get: function () {
                return this._fontStyle;
              },
              set: function (t) {
                this._fontStyle !== t &&
                  ((this._fontStyle = t), this.styleID++);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "fontVariant", {
              get: function () {
                return this._fontVariant;
              },
              set: function (t) {
                this._fontVariant !== t &&
                  ((this._fontVariant = t), this.styleID++);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "fontWeight", {
              get: function () {
                return this._fontWeight;
              },
              set: function (t) {
                this._fontWeight !== t &&
                  ((this._fontWeight = t), this.styleID++);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "letterSpacing", {
              get: function () {
                return this._letterSpacing;
              },
              set: function (t) {
                this._letterSpacing !== t &&
                  ((this._letterSpacing = t), this.styleID++);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "lineHeight", {
              get: function () {
                return this._lineHeight;
              },
              set: function (t) {
                this._lineHeight !== t &&
                  ((this._lineHeight = t), this.styleID++);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "leading", {
              get: function () {
                return this._leading;
              },
              set: function (t) {
                this._leading !== t && ((this._leading = t), this.styleID++);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "lineJoin", {
              get: function () {
                return this._lineJoin;
              },
              set: function (t) {
                this._lineJoin !== t && ((this._lineJoin = t), this.styleID++);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "miterLimit", {
              get: function () {
                return this._miterLimit;
              },
              set: function (t) {
                this._miterLimit !== t &&
                  ((this._miterLimit = t), this.styleID++);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "padding", {
              get: function () {
                return this._padding;
              },
              set: function (t) {
                this._padding !== t && ((this._padding = t), this.styleID++);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "stroke", {
              get: function () {
                return this._stroke;
              },
              set: function (t) {
                var e = f(t);
                this._stroke !== e && ((this._stroke = e), this.styleID++);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "strokeThickness", {
              get: function () {
                return this._strokeThickness;
              },
              set: function (t) {
                this._strokeThickness !== t &&
                  ((this._strokeThickness = t), this.styleID++);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "textBaseline", {
              get: function () {
                return this._textBaseline;
              },
              set: function (t) {
                this._textBaseline !== t &&
                  ((this._textBaseline = t), this.styleID++);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "trim", {
              get: function () {
                return this._trim;
              },
              set: function (t) {
                this._trim !== t && ((this._trim = t), this.styleID++);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "whiteSpace", {
              get: function () {
                return this._whiteSpace;
              },
              set: function (t) {
                this._whiteSpace !== t &&
                  ((this._whiteSpace = t), this.styleID++);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "wordWrap", {
              get: function () {
                return this._wordWrap;
              },
              set: function (t) {
                this._wordWrap !== t && ((this._wordWrap = t), this.styleID++);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "wordWrapWidth", {
              get: function () {
                return this._wordWrapWidth;
              },
              set: function (t) {
                this._wordWrapWidth !== t &&
                  ((this._wordWrapWidth = t), this.styleID++);
              },
              enumerable: !1,
              configurable: !0,
            }),
            (t.prototype.toFontString = function () {
              var t =
                  "number" == typeof this.fontSize
                    ? this.fontSize + "px"
                    : this.fontSize,
                e = this.fontFamily;
              Array.isArray(this.fontFamily) ||
                (e = this.fontFamily.split(","));
              for (var r = e.length - 1; r >= 0; r--) {
                var i = e[r].trim();
                !/([\"\'])[^\'\"]+\1/.test(i) &&
                  c.indexOf(i) < 0 &&
                  (i = '"' + i + '"'),
                  (e[r] = i);
              }
              return (
                this.fontStyle +
                " " +
                this.fontVariant +
                " " +
                this.fontWeight +
                " " +
                t +
                " " +
                e.join(",")
              );
            }),
            t
          );
        })();
      function p(t) {
        return "number" == typeof t
          ? (0, h.hex2string)(t)
          : ("string" == typeof t &&
              0 === t.indexOf("0x") &&
              (t = t.replace("0x", "#")),
            t);
      }
      function f(t) {
        if (Array.isArray(t)) {
          for (var e = 0; e < t.length; ++e) t[e] = p(t[e]);
          return t;
        }
        return p(t);
      }
      function m(t, e, r) {
        for (var i in r)
          Array.isArray(e[i]) ? (t[i] = e[i].slice()) : (t[i] = e[i]);
      }
      var v = (function () {
          function t(t, e, r, i, n, o, s, a, h) {
            (this.text = t),
              (this.style = e),
              (this.width = r),
              (this.height = i),
              (this.lines = n),
              (this.lineWidths = o),
              (this.lineHeight = s),
              (this.maxLineWidth = a),
              (this.fontProperties = h);
          }
          return (
            (t.measureText = function (e, r, i, n) {
              void 0 === n && (n = t._canvas), (i = null == i ? r.wordWrap : i);
              var o = r.toFontString(),
                s = t.measureFont(o);
              0 === s.fontSize &&
                ((s.fontSize = r.fontSize), (s.ascent = r.fontSize));
              var a = n.getContext("2d");
              a.font = o;
              for (
                var h = (i ? t.wordWrap(e, r, n) : e).split(/(?:\r\n|\r|\n)/),
                  u = new Array(h.length),
                  l = 0,
                  c = 0;
                c < h.length;
                c++
              ) {
                var d =
                  a.measureText(h[c]).width +
                  (h[c].length - 1) * r.letterSpacing;
                (u[c] = d), (l = Math.max(l, d));
              }
              var p = l + r.strokeThickness;
              r.dropShadow && (p += r.dropShadowDistance);
              var f = r.lineHeight || s.fontSize + r.strokeThickness,
                m =
                  Math.max(f, s.fontSize + r.strokeThickness) +
                  (h.length - 1) * (f + r.leading);
              return (
                r.dropShadow && (m += r.dropShadowDistance),
                new t(e, r, p, m, h, u, f + r.leading, l, s)
              );
            }),
            (t.wordWrap = function (e, r, i) {
              void 0 === i && (i = t._canvas);
              for (
                var n = i.getContext("2d"),
                  o = 0,
                  s = "",
                  a = "",
                  h = Object.create(null),
                  u = r.letterSpacing,
                  l = r.whiteSpace,
                  c = t.collapseSpaces(l),
                  d = t.collapseNewlines(l),
                  p = !c,
                  f = r.wordWrapWidth + u,
                  m = t.tokenize(e),
                  v = 0;
                v < m.length;
                v++
              ) {
                var y = m[v];
                if (t.isNewline(y)) {
                  if (!d) {
                    (a += t.addLine(s)), (p = !c), (s = ""), (o = 0);
                    continue;
                  }
                  y = " ";
                }
                if (c) {
                  var g = t.isBreakingSpace(y),
                    _ = t.isBreakingSpace(s[s.length - 1]);
                  if (g && _) continue;
                }
                var b = t.getFromCache(y, u, h, n);
                if (b > f)
                  if (
                    ("" !== s && ((a += t.addLine(s)), (s = ""), (o = 0)),
                    t.canBreakWords(y, r.breakWords))
                  )
                    for (var x = t.wordWrapSplit(y), T = 0; T < x.length; T++) {
                      for (var E = x[T], w = 1; x[T + w]; ) {
                        var A = x[T + w],
                          S = E[E.length - 1];
                        if (t.canBreakChars(S, A, y, T, r.breakWords)) break;
                        (E += A), w++;
                      }
                      T += E.length - 1;
                      var I = t.getFromCache(E, u, h, n);
                      I + o > f &&
                        ((a += t.addLine(s)), (p = !1), (s = ""), (o = 0)),
                        (s += E),
                        (o += I);
                    }
                  else {
                    s.length > 0 && ((a += t.addLine(s)), (s = ""), (o = 0));
                    var P = v === m.length - 1;
                    (a += t.addLine(y, !P)), (p = !1), (s = ""), (o = 0);
                  }
                else
                  b + o > f &&
                    ((p = !1), (a += t.addLine(s)), (s = ""), (o = 0)),
                    (s.length > 0 || !t.isBreakingSpace(y) || p) &&
                      ((s += y), (o += b));
              }
              return a + t.addLine(s, !1);
            }),
            (t.addLine = function (e, r) {
              return (
                void 0 === r && (r = !0), (e = t.trimRight(e)), r ? e + "\n" : e
              );
            }),
            (t.getFromCache = function (t, e, r, i) {
              var n = r[t];
              if ("number" != typeof n) {
                var o = t.length * e;
                (n = i.measureText(t).width + o), (r[t] = n);
              }
              return n;
            }),
            (t.collapseSpaces = function (t) {
              return "normal" === t || "pre-line" === t;
            }),
            (t.collapseNewlines = function (t) {
              return "normal" === t;
            }),
            (t.trimRight = function (e) {
              if ("string" != typeof e) return "";
              for (var r = e.length - 1; r >= 0; r--) {
                var i = e[r];
                if (!t.isBreakingSpace(i)) break;
                e = e.slice(0, -1);
              }
              return e;
            }),
            (t.isNewline = function (e) {
              return (
                "string" == typeof e &&
                t._newlines.indexOf(e.charCodeAt(0)) >= 0
              );
            }),
            (t.isBreakingSpace = function (e) {
              return (
                "string" == typeof e &&
                t._breakingSpaces.indexOf(e.charCodeAt(0)) >= 0
              );
            }),
            (t.tokenize = function (e) {
              var r = [],
                i = "";
              if ("string" != typeof e) return r;
              for (var n = 0; n < e.length; n++) {
                var o = e[n];
                t.isBreakingSpace(o) || t.isNewline(o)
                  ? ("" !== i && (r.push(i), (i = "")), r.push(o))
                  : (i += o);
              }
              return "" !== i && r.push(i), r;
            }),
            (t.canBreakWords = function (t, e) {
              return e;
            }),
            (t.canBreakChars = function (t, e, r, i, n) {
              return !0;
            }),
            (t.wordWrapSplit = function (t) {
              return t.split("");
            }),
            (t.measureFont = function (e) {
              if (t._fonts[e]) return t._fonts[e];
              var r = { ascent: 0, descent: 0, fontSize: 0 },
                i = t._canvas,
                n = t._context;
              n.font = e;
              var o = t.METRICS_STRING + t.BASELINE_SYMBOL,
                s = Math.ceil(n.measureText(o).width),
                a = Math.ceil(n.measureText(t.BASELINE_SYMBOL).width),
                h = 2 * a;
              (a = (a * t.BASELINE_MULTIPLIER) | 0),
                (i.width = s),
                (i.height = h),
                (n.fillStyle = "#f00"),
                n.fillRect(0, 0, s, h),
                (n.font = e),
                (n.textBaseline = "alphabetic"),
                (n.fillStyle = "#000"),
                n.fillText(o, 0, a);
              var u = n.getImageData(0, 0, s, h).data,
                l = u.length,
                c = 4 * s,
                d = 0,
                p = 0,
                f = !1;
              for (d = 0; d < a; ++d) {
                for (var m = 0; m < c; m += 4)
                  if (255 !== u[p + m]) {
                    f = !0;
                    break;
                  }
                if (f) break;
                p += c;
              }
              for (r.ascent = a - d, p = l - c, f = !1, d = h; d > a; --d) {
                for (m = 0; m < c; m += 4)
                  if (255 !== u[p + m]) {
                    f = !0;
                    break;
                  }
                if (f) break;
                p -= c;
              }
              return (
                (r.descent = d - a),
                (r.fontSize = r.ascent + r.descent),
                (t._fonts[e] = r),
                r
              );
            }),
            (t.clearMetrics = function (e) {
              void 0 === e && (e = ""),
                e ? delete t._fonts[e] : (t._fonts = {});
            }),
            t
          );
        })(),
        y = (function () {
          try {
            var t = new OffscreenCanvas(0, 0),
              e = t.getContext("2d");
            return e && e.measureText ? t : document.createElement("canvas");
          } catch (t) {
            return document.createElement("canvas");
          }
        })();
      (y.width = y.height = 10),
        (v._canvas = y),
        (v._context = y.getContext("2d")),
        (v._fonts = {}),
        (v.METRICS_STRING = "|ÉqÅ"),
        (v.BASELINE_SYMBOL = "M"),
        (v.BASELINE_MULTIPLIER = 1.4),
        (v._newlines = [10, 13]),
        (v._breakingSpaces = [
          9, 32, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8200, 8201, 8202,
          8287, 12288,
        ]);
      var g = { texture: !0, children: !1, baseTexture: !0 },
        _ = (function (t) {
          function e(e, r, i) {
            var n = this,
              h = !1;
            i || ((i = document.createElement("canvas")), (h = !0)),
              (i.width = 3),
              (i.height = 3);
            var u = o.xE.from(i);
            return (
              (u.orig = new a.Ae()),
              (u.trim = new a.Ae()),
              ((n = t.call(this, u) || this)._ownCanvas = h),
              (n.canvas = i),
              (n.context = n.canvas.getContext("2d")),
              (n._resolution = s.X.RESOLUTION),
              (n._autoResolution = !0),
              (n._text = null),
              (n._style = null),
              (n._styleListener = null),
              (n._font = ""),
              (n.text = e),
              (n.style = r),
              (n.localStyleID = -1),
              n
            );
          }
          return (
            (function (t, e) {
              function r() {
                this.constructor = t;
              }
              u(t, e),
                (t.prototype =
                  null === e
                    ? Object.create(e)
                    : ((r.prototype = e.prototype), new r()));
            })(e, t),
            (e.prototype.updateText = function (t) {
              var e = this._style;
              if (
                (this.localStyleID !== e.styleID &&
                  ((this.dirty = !0), (this.localStyleID = e.styleID)),
                this.dirty || !t)
              ) {
                this._font = this._style.toFontString();
                var r,
                  i,
                  n = this.context,
                  o = v.measureText(
                    this._text || " ",
                    this._style,
                    this._style.wordWrap,
                    this.canvas
                  ),
                  s = o.width,
                  a = o.height,
                  u = o.lines,
                  l = o.lineHeight,
                  c = o.lineWidths,
                  d = o.maxLineWidth,
                  p = o.fontProperties;
                (this.canvas.width = Math.ceil(
                  (Math.max(1, s) + 2 * e.padding) * this._resolution
                )),
                  (this.canvas.height = Math.ceil(
                    (Math.max(1, a) + 2 * e.padding) * this._resolution
                  )),
                  n.scale(this._resolution, this._resolution),
                  n.clearRect(0, 0, this.canvas.width, this.canvas.height),
                  (n.font = this._font),
                  (n.lineWidth = e.strokeThickness),
                  (n.textBaseline = e.textBaseline),
                  (n.lineJoin = e.lineJoin),
                  (n.miterLimit = e.miterLimit);
                for (var f = e.dropShadow ? 2 : 1, m = 0; m < f; ++m) {
                  var y = e.dropShadow && 0 === m,
                    g = y ? Math.ceil(Math.max(1, a) + 2 * e.padding) : 0,
                    _ = g * this._resolution;
                  if (y) {
                    (n.fillStyle = "black"), (n.strokeStyle = "black");
                    var b = e.dropShadowColor,
                      x = (0, h.hex2rgb)(
                        "number" == typeof b ? b : (0, h.string2hex)(b)
                      ),
                      T = e.dropShadowBlur * this._resolution,
                      E = e.dropShadowDistance * this._resolution;
                    (n.shadowColor =
                      "rgba(" +
                      255 * x[0] +
                      "," +
                      255 * x[1] +
                      "," +
                      255 * x[2] +
                      "," +
                      e.dropShadowAlpha +
                      ")"),
                      (n.shadowBlur = T),
                      (n.shadowOffsetX = Math.cos(e.dropShadowAngle) * E),
                      (n.shadowOffsetY = Math.sin(e.dropShadowAngle) * E + _);
                  } else
                    (n.fillStyle = this._generateFillStyle(e, u, o)),
                      (n.strokeStyle = e.stroke),
                      (n.shadowColor = "black"),
                      (n.shadowBlur = 0),
                      (n.shadowOffsetX = 0),
                      (n.shadowOffsetY = 0);
                  for (var w = 0; w < u.length; w++)
                    (r = e.strokeThickness / 2),
                      (i = e.strokeThickness / 2 + w * l + p.ascent),
                      "right" === e.align
                        ? (r += d - c[w])
                        : "center" === e.align && (r += (d - c[w]) / 2),
                      e.stroke &&
                        e.strokeThickness &&
                        this.drawLetterSpacing(
                          u[w],
                          r + e.padding,
                          i + e.padding - g,
                          !0
                        ),
                      e.fill &&
                        this.drawLetterSpacing(
                          u[w],
                          r + e.padding,
                          i + e.padding - g
                        );
                }
                this.updateTexture();
              }
            }),
            (e.prototype.drawLetterSpacing = function (t, e, r, i) {
              void 0 === i && (i = !1);
              var n = this._style.letterSpacing;
              if (0 !== n)
                for (
                  var o = e,
                    s = Array.from ? Array.from(t) : t.split(""),
                    a = this.context.measureText(t).width,
                    h = 0,
                    u = 0;
                  u < s.length;
                  ++u
                ) {
                  var l = s[u];
                  i
                    ? this.context.strokeText(l, o, r)
                    : this.context.fillText(l, o, r),
                    (o +=
                      a -
                      (h = this.context.measureText(t.substring(u + 1)).width) +
                      n),
                    (a = h);
                }
              else
                i
                  ? this.context.strokeText(t, e, r)
                  : this.context.fillText(t, e, r);
            }),
            (e.prototype.updateTexture = function () {
              var t = this.canvas;
              if (this._style.trim) {
                var e = (0, h.trimCanvas)(t);
                e.data &&
                  ((t.width = e.width),
                  (t.height = e.height),
                  this.context.putImageData(e.data, 0, 0));
              }
              var r = this._texture,
                i = this._style,
                n = i.trim ? 0 : i.padding,
                o = r.baseTexture;
              (r.trim.width = r._frame.width =
                Math.ceil(t.width / this._resolution)),
                (r.trim.height = r._frame.height =
                  Math.ceil(t.height / this._resolution)),
                (r.trim.x = -n),
                (r.trim.y = -n),
                (r.orig.width = r._frame.width - 2 * n),
                (r.orig.height = r._frame.height - 2 * n),
                this._onTextureUpdate(),
                o.setRealSize(t.width, t.height, this._resolution),
                this._recursivePostUpdateTransform(),
                (this.dirty = !1);
            }),
            (e.prototype._render = function (e) {
              this._autoResolution &&
                this._resolution !== e.resolution &&
                ((this._resolution = e.resolution), (this.dirty = !0)),
                this.updateText(!0),
                t.prototype._render.call(this, e);
            }),
            (e.prototype.getLocalBounds = function (e) {
              return (
                this.updateText(!0), t.prototype.getLocalBounds.call(this, e)
              );
            }),
            (e.prototype._calculateBounds = function () {
              this.updateText(!0),
                this.calculateVertices(),
                this._bounds.addQuad(this.vertexData);
            }),
            (e.prototype._generateFillStyle = function (t, e, r) {
              var n,
                o = t.fill;
              if (!Array.isArray(o)) return o;
              if (1 === o.length) return o[0];
              var s = t.dropShadow ? t.dropShadowDistance : 0,
                a = t.padding || 0,
                h = Math.ceil(this.canvas.width / this._resolution) - s - 2 * a,
                u =
                  Math.ceil(this.canvas.height / this._resolution) - s - 2 * a,
                l = o.slice(),
                c = t.fillGradientStops.slice();
              if (!c.length)
                for (var d = l.length + 1, p = 1; p < d; ++p) c.push(p / d);
              if (
                (l.unshift(o[0]),
                c.unshift(0),
                l.push(o[o.length - 1]),
                c.push(1),
                t.fillGradientType === i.LINEAR_VERTICAL)
              ) {
                n = this.context.createLinearGradient(h / 2, a, h / 2, u + a);
                var f = 0,
                  m = (r.fontProperties.fontSize + t.strokeThickness) / u;
                for (p = 0; p < e.length; p++)
                  for (var v = r.lineHeight * p, y = 0; y < l.length; y++) {
                    var g =
                        v / u +
                        ("number" == typeof c[y] ? c[y] : y / l.length) * m,
                      _ = Math.max(f, g);
                    (_ = Math.min(_, 1)), n.addColorStop(_, l[y]), (f = _);
                  }
              } else {
                n = this.context.createLinearGradient(a, u / 2, h + a, u / 2);
                var b = l.length + 1,
                  x = 1;
                for (p = 0; p < l.length; p++) {
                  var T;
                  (T = "number" == typeof c[p] ? c[p] : x / b),
                    n.addColorStop(T, l[p]),
                    x++;
                }
              }
              return n;
            }),
            (e.prototype.destroy = function (e) {
              "boolean" == typeof e && (e = { children: e }),
                (e = Object.assign({}, g, e)),
                t.prototype.destroy.call(this, e),
                this._ownCanvas && (this.canvas.height = this.canvas.width = 0),
                (this.context = null),
                (this.canvas = null),
                (this._style = null);
            }),
            Object.defineProperty(e.prototype, "width", {
              get: function () {
                return (
                  this.updateText(!0),
                  Math.abs(this.scale.x) * this._texture.orig.width
                );
              },
              set: function (t) {
                this.updateText(!0);
                var e = (0, h.sign)(this.scale.x) || 1;
                (this.scale.x = (e * t) / this._texture.orig.width),
                  (this._width = t);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "height", {
              get: function () {
                return (
                  this.updateText(!0),
                  Math.abs(this.scale.y) * this._texture.orig.height
                );
              },
              set: function (t) {
                this.updateText(!0);
                var e = (0, h.sign)(this.scale.y) || 1;
                (this.scale.y = (e * t) / this._texture.orig.height),
                  (this._height = t);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "style", {
              get: function () {
                return this._style;
              },
              set: function (t) {
                (t = t || {}),
                  (this._style = t instanceof d ? t : new d(t)),
                  (this.localStyleID = -1),
                  (this.dirty = !0);
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "text", {
              get: function () {
                return this._text;
              },
              set: function (t) {
                (t = String(null == t ? "" : t)),
                  this._text !== t && ((this._text = t), (this.dirty = !0));
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "resolution", {
              get: function () {
                return this._resolution;
              },
              set: function (t) {
                (this._autoResolution = !1),
                  this._resolution !== t &&
                    ((this._resolution = t), (this.dirty = !0));
              },
              enumerable: !1,
              configurable: !0,
            }),
            e
          );
        })(n.j);
    },
    5662: (t, e, r) => {
      r.d(e, { Sb: () => a, uF: () => i, vB: () => s });
      var i,
        n = r(1573);
      (n.X.TARGET_FPMS = 0.06),
        (function (t) {
          (t[(t.INTERACTION = 50)] = "INTERACTION"),
            (t[(t.HIGH = 25)] = "HIGH"),
            (t[(t.NORMAL = 0)] = "NORMAL"),
            (t[(t.LOW = -25)] = "LOW"),
            (t[(t.UTILITY = -50)] = "UTILITY");
        })(i || (i = {}));
      var o = (function () {
          function t(t, e, r, i) {
            void 0 === e && (e = null),
              void 0 === r && (r = 0),
              void 0 === i && (i = !1),
              (this.fn = t),
              (this.context = e),
              (this.priority = r),
              (this.once = i),
              (this.next = null),
              (this.previous = null),
              (this._destroyed = !1);
          }
          return (
            (t.prototype.match = function (t, e) {
              return (
                void 0 === e && (e = null), this.fn === t && this.context === e
              );
            }),
            (t.prototype.emit = function (t) {
              this.fn &&
                (this.context ? this.fn.call(this.context, t) : this.fn(t));
              var e = this.next;
              return (
                this.once && this.destroy(!0),
                this._destroyed && (this.next = null),
                e
              );
            }),
            (t.prototype.connect = function (t) {
              (this.previous = t),
                t.next && (t.next.previous = this),
                (this.next = t.next),
                (t.next = this);
            }),
            (t.prototype.destroy = function (t) {
              void 0 === t && (t = !1),
                (this._destroyed = !0),
                (this.fn = null),
                (this.context = null),
                this.previous && (this.previous.next = this.next),
                this.next && (this.next.previous = this.previous);
              var e = this.next;
              return (this.next = t ? null : e), (this.previous = null), e;
            }),
            t
          );
        })(),
        s = (function () {
          function t() {
            var t = this;
            (this._head = new o(null, null, 1 / 0)),
              (this._requestId = null),
              (this._maxElapsedMS = 100),
              (this._minElapsedMS = 0),
              (this.autoStart = !1),
              (this.deltaTime = 1),
              (this.deltaMS = 1 / n.X.TARGET_FPMS),
              (this.elapsedMS = 1 / n.X.TARGET_FPMS),
              (this.lastTime = -1),
              (this.speed = 1),
              (this.started = !1),
              (this._protected = !1),
              (this._lastFrame = -1),
              (this._tick = function (e) {
                (t._requestId = null),
                  t.started &&
                    (t.update(e),
                    t.started &&
                      null === t._requestId &&
                      t._head.next &&
                      (t._requestId = requestAnimationFrame(t._tick)));
              });
          }
          return (
            (t.prototype._requestIfNeeded = function () {
              null === this._requestId &&
                this._head.next &&
                ((this.lastTime = performance.now()),
                (this._lastFrame = this.lastTime),
                (this._requestId = requestAnimationFrame(this._tick)));
            }),
            (t.prototype._cancelIfNeeded = function () {
              null !== this._requestId &&
                (cancelAnimationFrame(this._requestId),
                (this._requestId = null));
            }),
            (t.prototype._startIfPossible = function () {
              this.started
                ? this._requestIfNeeded()
                : this.autoStart && this.start();
            }),
            (t.prototype.add = function (t, e, r) {
              return (
                void 0 === r && (r = i.NORMAL),
                this._addListener(new o(t, e, r))
              );
            }),
            (t.prototype.addOnce = function (t, e, r) {
              return (
                void 0 === r && (r = i.NORMAL),
                this._addListener(new o(t, e, r, !0))
              );
            }),
            (t.prototype._addListener = function (t) {
              var e = this._head.next,
                r = this._head;
              if (e) {
                for (; e; ) {
                  if (t.priority > e.priority) {
                    t.connect(r);
                    break;
                  }
                  (r = e), (e = e.next);
                }
                t.previous || t.connect(r);
              } else t.connect(r);
              return this._startIfPossible(), this;
            }),
            (t.prototype.remove = function (t, e) {
              for (var r = this._head.next; r; )
                r = r.match(t, e) ? r.destroy() : r.next;
              return this._head.next || this._cancelIfNeeded(), this;
            }),
            Object.defineProperty(t.prototype, "count", {
              get: function () {
                if (!this._head) return 0;
                for (var t = 0, e = this._head; (e = e.next); ) t++;
                return t;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (t.prototype.start = function () {
              this.started || ((this.started = !0), this._requestIfNeeded());
            }),
            (t.prototype.stop = function () {
              this.started && ((this.started = !1), this._cancelIfNeeded());
            }),
            (t.prototype.destroy = function () {
              if (!this._protected) {
                this.stop();
                for (var t = this._head.next; t; ) t = t.destroy(!0);
                this._head.destroy(), (this._head = null);
              }
            }),
            (t.prototype.update = function (t) {
              var e;
              if (
                (void 0 === t && (t = performance.now()), t > this.lastTime)
              ) {
                if (
                  ((e = this.elapsedMS = t - this.lastTime) >
                    this._maxElapsedMS && (e = this._maxElapsedMS),
                  (e *= this.speed),
                  this._minElapsedMS)
                ) {
                  var r = (t - this._lastFrame) | 0;
                  if (r < this._minElapsedMS) return;
                  this._lastFrame = t - (r % this._minElapsedMS);
                }
                (this.deltaMS = e),
                  (this.deltaTime = this.deltaMS * n.X.TARGET_FPMS);
                for (var i = this._head, o = i.next; o; )
                  o = o.emit(this.deltaTime);
                i.next || this._cancelIfNeeded();
              } else this.deltaTime = this.deltaMS = this.elapsedMS = 0;
              this.lastTime = t;
            }),
            Object.defineProperty(t.prototype, "FPS", {
              get: function () {
                return 1e3 / this.elapsedMS;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "minFPS", {
              get: function () {
                return 1e3 / this._maxElapsedMS;
              },
              set: function (t) {
                var e = Math.min(this.maxFPS, t),
                  r = Math.min(Math.max(0, e) / 1e3, n.X.TARGET_FPMS);
                this._maxElapsedMS = 1 / r;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "maxFPS", {
              get: function () {
                return this._minElapsedMS
                  ? Math.round(1e3 / this._minElapsedMS)
                  : 0;
              },
              set: function (t) {
                if (0 === t) this._minElapsedMS = 0;
                else {
                  var e = Math.max(this.minFPS, t);
                  this._minElapsedMS = 1 / (e / 1e3);
                }
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t, "shared", {
              get: function () {
                if (!t._shared) {
                  var e = (t._shared = new t());
                  (e.autoStart = !0), (e._protected = !0);
                }
                return t._shared;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(t, "system", {
              get: function () {
                if (!t._system) {
                  var e = (t._system = new t());
                  (e.autoStart = !0), (e._protected = !0);
                }
                return t._system;
              },
              enumerable: !1,
              configurable: !0,
            }),
            t
          );
        })(),
        a = (function () {
          function t() {}
          return (
            (t.init = function (t) {
              var e = this;
              (t = Object.assign({ autoStart: !0, sharedTicker: !1 }, t)),
                Object.defineProperty(this, "ticker", {
                  set: function (t) {
                    this._ticker && this._ticker.remove(this.render, this),
                      (this._ticker = t),
                      t && t.add(this.render, this, i.LOW);
                  },
                  get: function () {
                    return this._ticker;
                  },
                }),
                (this.stop = function () {
                  e._ticker.stop();
                }),
                (this.start = function () {
                  e._ticker.start();
                }),
                (this._ticker = null),
                (this.ticker = t.sharedTicker ? s.shared : new s()),
                t.autoStart && this.start();
            }),
            (t.destroy = function () {
              if (this._ticker) {
                var t = this._ticker;
                (this.ticker = null), t.destroy();
              }
            }),
            t
          );
        })();
    },
    5323: (t, e, r) => {
      r.r(e),
        r.d(e, {
          BaseTextureCache: () => j,
          CanvasRenderTarget: () => G,
          DATA_URI: () => W,
          EventEmitter: () => o.a,
          ProgramCache: () => B,
          TextureCache: () => k,
          clearTextureCache: () => X,
          correctBlendMode: () => x,
          createIndicesForQuads: () => A,
          decomposeDataUri: () => Y,
          deprecation: () => U,
          destroyTextureCache: () => H,
          determineCrossOrigin: () => q,
          earcut: () => a.a,
          getBufferType: () => S,
          getResolutionOfUrl: () => K,
          hex2rgb: () => v,
          hex2string: () => y,
          interleaveTypedArrays: () => P,
          isMobile: () => i.t,
          isPow2: () => C,
          isWebGLSupported: () => m,
          log2: () => M,
          nextPow2: () => O,
          premultiplyBlendMode: () => b,
          premultiplyRgba: () => T,
          premultiplyTint: () => E,
          premultiplyTintToRgba: () => w,
          removeItems: () => D,
          rgb2hex: () => _,
          sayHello: () => f,
          sign: () => R,
          skipHello: () => p,
          string2hex: () => g,
          trimCanvas: () => z,
          uid: () => L,
          url: () => h,
        });
      var i = r(1573),
        n = r(6729),
        o = r.n(n),
        s = r(9187),
        a = r.n(s),
        h = r(8575),
        u = r(7054);
      (i.X.RETINA_PREFIX = /@([0-9\.]+)x/),
        (i.X.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = !0);
      var l,
        c = !1,
        d = "5.3.12";
      function p() {
        c = !0;
      }
      function f(t) {
        var e;
        if (!c) {
          if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
            var r = [
              "\n %c %c %c PixiJS " +
                d +
                " - ✰ " +
                t +
                " ✰  %c  %c  http://www.pixijs.com/  %c %c ♥%c♥%c♥ \n\n",
              "background: #ff66a5; padding:5px 0;",
              "background: #ff66a5; padding:5px 0;",
              "color: #ff66a5; background: #030307; padding:5px 0;",
              "background: #ff66a5; padding:5px 0;",
              "background: #ffc3dc; padding:5px 0;",
              "background: #ff66a5; padding:5px 0;",
              "color: #ff2424; background: #fff; padding:5px 0;",
              "color: #ff2424; background: #fff; padding:5px 0;",
              "color: #ff2424; background: #fff; padding:5px 0;",
            ];
            (e = window.console).log.apply(e, r);
          } else
            window.console &&
              window.console.log(
                "PixiJS " + d + " - " + t + " - http://www.pixijs.com/"
              );
          c = !0;
        }
      }
      function m() {
        return (
          void 0 === l &&
            (l = (function () {
              var t = {
                stencil: !0,
                failIfMajorPerformanceCaveat:
                  i.X.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT,
              };
              try {
                if (!window.WebGLRenderingContext) return !1;
                var e = document.createElement("canvas"),
                  r =
                    e.getContext("webgl", t) ||
                    e.getContext("experimental-webgl", t),
                  n = !(!r || !r.getContextAttributes().stencil);
                if (r) {
                  var o = r.getExtension("WEBGL_lose_context");
                  o && o.loseContext();
                }
                return (r = null), n;
              } catch (t) {
                return !1;
              }
            })()),
          l
        );
      }
      function v(t, e) {
        return (
          void 0 === e && (e = []),
          (e[0] = ((t >> 16) & 255) / 255),
          (e[1] = ((t >> 8) & 255) / 255),
          (e[2] = (255 & t) / 255),
          e
        );
      }
      function y(t) {
        var e = t.toString(16);
        return "#" + ("000000".substr(0, 6 - e.length) + e);
      }
      function g(t) {
        return (
          "string" == typeof t && "#" === t[0] && (t = t.substr(1)),
          parseInt(t, 16)
        );
      }
      function _(t) {
        return ((255 * t[0]) << 16) + ((255 * t[1]) << 8) + ((255 * t[2]) | 0);
      }
      var b = (function () {
        for (var t = [], e = [], r = 0; r < 32; r++) (t[r] = r), (e[r] = r);
        (t[u.T$.NORMAL_NPM] = u.T$.NORMAL),
          (t[u.T$.ADD_NPM] = u.T$.ADD),
          (t[u.T$.SCREEN_NPM] = u.T$.SCREEN),
          (e[u.T$.NORMAL] = u.T$.NORMAL_NPM),
          (e[u.T$.ADD] = u.T$.ADD_NPM),
          (e[u.T$.SCREEN] = u.T$.SCREEN_NPM);
        var i = [];
        return i.push(e), i.push(t), i;
      })();
      function x(t, e) {
        return b[e ? 1 : 0][t];
      }
      function T(t, e, r, i) {
        return (
          (r = r || new Float32Array(4)),
          i || void 0 === i
            ? ((r[0] = t[0] * e), (r[1] = t[1] * e), (r[2] = t[2] * e))
            : ((r[0] = t[0]), (r[1] = t[1]), (r[2] = t[2])),
          (r[3] = e),
          r
        );
      }
      function E(t, e) {
        if (1 === e) return ((255 * e) << 24) + t;
        if (0 === e) return 0;
        var r = (t >> 16) & 255,
          i = (t >> 8) & 255,
          n = 255 & t;
        return (
          ((255 * e) << 24) +
          ((r = (r * e + 0.5) | 0) << 16) +
          ((i = (i * e + 0.5) | 0) << 8) +
          ((n * e + 0.5) | 0)
        );
      }
      function w(t, e, r, i) {
        return (
          ((r = r || new Float32Array(4))[0] = ((t >> 16) & 255) / 255),
          (r[1] = ((t >> 8) & 255) / 255),
          (r[2] = (255 & t) / 255),
          (i || void 0 === i) && ((r[0] *= e), (r[1] *= e), (r[2] *= e)),
          (r[3] = e),
          r
        );
      }
      function A(t, e) {
        void 0 === e && (e = null);
        var r = 6 * t;
        if ((e = e || new Uint16Array(r)).length !== r)
          throw new Error(
            "Out buffer length is incorrect, got " +
              e.length +
              " and expected " +
              r
          );
        for (var i = 0, n = 0; i < r; i += 6, n += 4)
          (e[i + 0] = n + 0),
            (e[i + 1] = n + 1),
            (e[i + 2] = n + 2),
            (e[i + 3] = n + 0),
            (e[i + 4] = n + 2),
            (e[i + 5] = n + 3);
        return e;
      }
      function S(t) {
        if (4 === t.BYTES_PER_ELEMENT)
          return t instanceof Float32Array
            ? "Float32Array"
            : t instanceof Uint32Array
            ? "Uint32Array"
            : "Int32Array";
        if (2 === t.BYTES_PER_ELEMENT) {
          if (t instanceof Uint16Array) return "Uint16Array";
        } else if (1 === t.BYTES_PER_ELEMENT && t instanceof Uint8Array)
          return "Uint8Array";
        return null;
      }
      var I = { Float32Array, Uint32Array, Int32Array, Uint8Array };
      function P(t, e) {
        for (var r = 0, i = 0, n = {}, o = 0; o < t.length; o++)
          (i += e[o]), (r += t[o].length);
        var s = new ArrayBuffer(4 * r),
          a = null,
          h = 0;
        for (o = 0; o < t.length; o++) {
          var u = e[o],
            l = t[o],
            c = S(l);
          n[c] || (n[c] = new I[c](s)), (a = n[c]);
          for (var d = 0; d < l.length; d++)
            a[((d / u) | 0) * i + h + (d % u)] = l[d];
          h += u;
        }
        return new Float32Array(s);
      }
      function O(t) {
        return (
          (t += 0 === t ? 1 : 0),
          --t,
          (t |= t >>> 1),
          (t |= t >>> 2),
          (t |= t >>> 4),
          (t |= t >>> 8),
          1 + (t |= t >>> 16)
        );
      }
      function C(t) {
        return !(t & (t - 1) || !t);
      }
      function M(t) {
        var e = (t > 65535 ? 1 : 0) << 4,
          r = ((t >>>= e) > 255 ? 1 : 0) << 3;
        return (
          (e |= r),
          (e |= r = ((t >>>= r) > 15 ? 1 : 0) << 2),
          (e |= r = ((t >>>= r) > 3 ? 1 : 0) << 1) | ((t >>>= r) >> 1)
        );
      }
      function D(t, e, r) {
        var i,
          n = t.length;
        if (!(e >= n || 0 === r)) {
          var o = n - (r = e + r > n ? n - e : r);
          for (i = e; i < o; ++i) t[i] = t[i + r];
          t.length = o;
        }
      }
      function R(t) {
        return 0 === t ? 0 : t < 0 ? -1 : 1;
      }
      var N = 0;
      function L() {
        return ++N;
      }
      var F = {};
      function U(t, e, r) {
        if ((void 0 === r && (r = 3), !F[e])) {
          var i = new Error().stack;
          void 0 === i
            ? console.warn(
                "PixiJS Deprecation Warning: ",
                e + "\nDeprecated since v" + t
              )
            : ((i = i.split("\n").splice(r).join("\n")),
              console.groupCollapsed
                ? (console.groupCollapsed(
                    "%cPixiJS Deprecation Warning: %c%s",
                    "color:#614108;background:#fffbe6",
                    "font-weight:normal;color:#614108;background:#fffbe6",
                    e + "\nDeprecated since v" + t
                  ),
                  console.warn(i),
                  console.groupEnd())
                : (console.warn(
                    "PixiJS Deprecation Warning: ",
                    e + "\nDeprecated since v" + t
                  ),
                  console.warn(i))),
            (F[e] = !0);
        }
      }
      var B = {},
        k = Object.create(null),
        j = Object.create(null);
      function H() {
        var t;
        for (t in k) k[t].destroy();
        for (t in j) j[t].destroy();
      }
      function X() {
        var t;
        for (t in k) delete k[t];
        for (t in j) delete j[t];
      }
      var G = (function () {
        function t(t, e, r) {
          (this.canvas = document.createElement("canvas")),
            (this.context = this.canvas.getContext("2d")),
            (this.resolution = r || i.X.RESOLUTION),
            this.resize(t, e);
        }
        return (
          (t.prototype.clear = function () {
            this.context.setTransform(1, 0, 0, 1, 0, 0),
              this.context.clearRect(
                0,
                0,
                this.canvas.width,
                this.canvas.height
              );
          }),
          (t.prototype.resize = function (t, e) {
            (this.canvas.width = t * this.resolution),
              (this.canvas.height = e * this.resolution);
          }),
          (t.prototype.destroy = function () {
            (this.context = null), (this.canvas = null);
          }),
          Object.defineProperty(t.prototype, "width", {
            get: function () {
              return this.canvas.width;
            },
            set: function (t) {
              this.canvas.width = t;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "height", {
            get: function () {
              return this.canvas.height;
            },
            set: function (t) {
              this.canvas.height = t;
            },
            enumerable: !1,
            configurable: !0,
          }),
          t
        );
      })();
      function z(t) {
        var e,
          r,
          i,
          n = t.width,
          o = t.height,
          s = t.getContext("2d"),
          a = s.getImageData(0, 0, n, o).data,
          h = a.length,
          u = { top: null, left: null, right: null, bottom: null },
          l = null;
        for (e = 0; e < h; e += 4)
          0 !== a[e + 3] &&
            ((r = (e / 4) % n),
            (i = ~~(e / 4 / n)),
            null === u.top && (u.top = i),
            (null === u.left || r < u.left) && (u.left = r),
            (null === u.right || u.right < r) && (u.right = r + 1),
            (null === u.bottom || u.bottom < i) && (u.bottom = i));
        return (
          null !== u.top &&
            ((n = u.right - u.left),
            (o = u.bottom - u.top + 1),
            (l = s.getImageData(u.left, u.top, n, o))),
          { height: o, width: n, data: l }
        );
      }
      var V,
        W =
          /^\s*data:(?:([\w-]+)\/([\w+.-]+))?(?:;charset=([\w-]+))?(?:;(base64))?,(.*)/i;
      function Y(t) {
        var e = W.exec(t);
        if (e)
          return {
            mediaType: e[1] ? e[1].toLowerCase() : void 0,
            subType: e[2] ? e[2].toLowerCase() : void 0,
            charset: e[3] ? e[3].toLowerCase() : void 0,
            encoding: e[4] ? e[4].toLowerCase() : void 0,
            data: e[5],
          };
      }
      function q(t, e) {
        if ((void 0 === e && (e = window.location), 0 === t.indexOf("data:")))
          return "";
        (e = e || window.location),
          V || (V = document.createElement("a")),
          (V.href = t);
        var r = (0, h.parse)(V.href),
          i = (!r.port && "" === e.port) || r.port === e.port;
        return r.hostname === e.hostname && i && r.protocol === e.protocol
          ? ""
          : "anonymous";
      }
      function K(t, e) {
        var r = i.X.RETINA_PREFIX.exec(t);
        return r ? parseFloat(r[1]) : void 0 !== e ? e : 1;
      }
    },
  },
]);
