(() => {
  "use strict";
  Object.create,
    Object.create,
    "function" == typeof SuppressedError && SuppressedError;
  var e = (function () {
    function e() {}
    return (
      (e.initialize = function () {
        return (
          (e = this),
          (n = void 0),
          (r = function () {
            return (function (e, n) {
              var t,
                r,
                o,
                i,
                u = {
                  label: 0,
                  sent: function () {
                    if (1 & o[0]) throw o[1];
                    return o[1];
                  },
                  trys: [],
                  ops: [],
                };
              return (
                (i = { next: a(0), throw: a(1), return: a(2) }),
                "function" == typeof Symbol &&
                  (i[Symbol.iterator] = function () {
                    return this;
                  }),
                i
              );
              function a(a) {
                return function (c) {
                  return (function (a) {
                    if (t)
                      throw new TypeError("Generator is already executing.");
                    for (; i && ((i = 0), a[0] && (u = 0)), u; )
                      try {
                        if (
                          ((t = 1),
                          r &&
                            (o =
                              2 & a[0]
                                ? r.return
                                : a[0]
                                ? r.throw || ((o = r.return) && o.call(r), 0)
                                : r.next) &&
                            !(o = o.call(r, a[1])).done)
                        )
                          return o;
                        switch (
                          ((r = 0), o && (a = [2 & a[0], o.value]), a[0])
                        ) {
                          case 0:
                          case 1:
                            o = a;
                            break;
                          case 4:
                            return u.label++, { value: a[1], done: !1 };
                          case 5:
                            u.label++, (r = a[1]), (a = [0]);
                            continue;
                          case 7:
                            (a = u.ops.pop()), u.trys.pop();
                            continue;
                          default:
                            if (
                              !(
                                (o =
                                  (o = u.trys).length > 0 && o[o.length - 1]) ||
                                (6 !== a[0] && 2 !== a[0])
                              )
                            ) {
                              u = 0;
                              continue;
                            }
                            if (
                              3 === a[0] &&
                              (!o || (a[1] > o[0] && a[1] < o[3]))
                            ) {
                              u.label = a[1];
                              break;
                            }
                            if (6 === a[0] && u.label < o[1]) {
                              (u.label = o[1]), (o = a);
                              break;
                            }
                            if (o && u.label < o[2]) {
                              (u.label = o[2]), u.ops.push(a);
                              break;
                            }
                            o[2] && u.ops.pop(), u.trys.pop();
                            continue;
                        }
                        a = n.call(e, u);
                      } catch (e) {
                        (a = [6, e]), (r = 0);
                      } finally {
                        t = o = 0;
                      }
                    if (5 & a[0]) throw a[1];
                    return { value: a[0] ? a[1] : void 0, done: !0 };
                  })([a, c]);
                };
              }
            })(this, function (e) {
              return [2, Promise.resolve()];
            });
          }),
          new ((t = void 0) || (t = Promise))(function (o, i) {
            function u(e) {
              try {
                c(r.next(e));
              } catch (e) {
                i(e);
              }
            }
            function a(e) {
              try {
                c(r.throw(e));
              } catch (e) {
                i(e);
              }
            }
            function c(e) {
              var n;
              e.done
                ? o(e.value)
                : ((n = e.value),
                  n instanceof t
                    ? n
                    : new t(function (e) {
                        e(n);
                      })).then(u, a);
            }
            c((r = r.apply(e, n || [])).next());
          })
        );
        var e, n, t, r;
      }),
      e
    );
  })();
  (window.preload = e), e.initialize();
})();
