!(function () {
  "use strict";
  var n = {
      476: function (n, t, e) {
        e.r(t),
          e.d(t, {
            convertSegmentsToSVG: function () {
              return l;
            },
            generatePolygonSegments: function () {
              return c;
            },
          });
        var r = e(324),
          o = e(907);
        var a = e(181);
        function i(n) {
          return (
            (function (n) {
              if (Array.isArray(n)) return (0, o.Z)(n);
            })(n) ||
            (function (n) {
              if (
                ("undefined" !== typeof Symbol && null != n[Symbol.iterator]) ||
                null != n["@@iterator"]
              )
                return Array.from(n);
            })(n) ||
            (0, a.Z)(n) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
        function u(n, t) {
          var e =
            ("undefined" !== typeof Symbol && n[Symbol.iterator]) ||
            n["@@iterator"];
          if (!e) {
            if (
              Array.isArray(n) ||
              (e = (0, a.Z)(n)) ||
              (t && n && "number" === typeof n.length)
            ) {
              e && (n = e);
              var r = 0,
                o = function () {};
              return {
                s: o,
                n: function () {
                  return r >= n.length
                    ? {
                        done: !0,
                      }
                    : {
                        done: !1,
                        value: n[r++],
                      };
                },
                e: function (n) {
                  throw n;
                },
                f: o,
              };
            }
            throw new TypeError(
              "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          }
          var i,
            u = !0,
            f = !1;
          return {
            s: function () {
              e = e.call(n);
            },
            n: function () {
              var n = e.next();
              return (u = n.done), n;
            },
            e: function (n) {
              (f = !0), (i = n);
            },
            f: function () {
              try {
                u || null == e.return || e.return();
              } finally {
                if (f) throw i;
              }
            },
          };
        }
        var f = function (n) {
            return n.split(" ").map(function (n) {
              return parseInt(n);
            });
          },
          c = function (n, t) {
            var e = (function (n, t) {
              for (
                var e = [],
                  r = {
                    line: -1,
                    points: [],
                  },
                  o = 0,
                  a = function () {
                    r.points.length > 0 &&
                      (e.push({
                        line: r.line,
                        points: r.points,
                      }),
                      (r.points = []));
                  },
                  i = 1;
                i < n.length;
                i += 2
              ) {
                var u = (o += n[i - 1]) % t,
                  f = Math.floor(o / t),
                  c = (o += n[i]) % t,
                  l = Math.floor(o / t);
                if ((r.line !== f && (a(), (r.line = f)), f !== l)) {
                  r.points.push(u, t), a(), (r.line = l);
                  for (var s = f + 1; s < l; s++)
                    e.push({
                      line: s,
                      points: [0, t],
                    });
                  c > 0 && r.points.push(0, c);
                } else r.points.push(u, c);
              }
              return a(), e;
            })(n, t);
            if (0 === e.length) return new Map();
            var o,
              a = new Map(),
              c = -1,
              l = [],
              s = new Map(),
              v = function (n, t) {
                var e = "".concat(n.x, " ").concat(n.y),
                  r = "".concat(t.x, " ").concat(t.y);
                a.has(e) || a.set(e, new Set()),
                  a.get(e).add(r),
                  a.has(r) || a.set(r, new Set()),
                  a.get(r).add(e);
              },
              y = function (n, t) {
                t !== s.get(n) &&
                  (v(
                    {
                      x: s.get(n),
                      y: n,
                    },
                    {
                      x: t,
                      y: n,
                    }
                  ),
                  s.delete(n));
              },
              d = function (n, t, e, r) {
                if (t !== r) {
                  var o = !1,
                    a = Math.max(n, e);
                  s.has(t) && (y(t, a), (o = !0)),
                    s.has(r) && (y(r, a), (o = !0)),
                    o
                      ? v(
                          {
                            x: a,
                            y: t,
                          },
                          {
                            x: a,
                            y: r,
                          }
                        )
                      : v(
                          {
                            x: n,
                            y: t,
                          },
                          {
                            x: e,
                            y: r,
                          }
                        );
                } else s.has(t) || s.set(t, n);
              },
              p = function (n, t) {
                var e,
                  r = u(t);
                try {
                  for (r.s(); !(e = r.n()).done; ) {
                    var o = e.value;
                    d(n, o, n + 1, o);
                  }
                } catch (i) {
                  r.e(i);
                } finally {
                  r.f();
                }
                for (var a = 1; a < t.length; a += 2)
                  d(n + 1, t[a - 1], n + 1, t[a]);
              },
              h = u(e);
            try {
              for (h.s(); !(o = h.n()).done; ) {
                var g = o.value,
                  m = g.line,
                  b = g.points;
                m !== c + 1 && (p(c, l), (c = m - 1), (l = []));
                for (
                  var S = l.length && l[0] <= b[0] ? c : m,
                    Z = S === c ? l[0] : b[0],
                    w = S === c ? 1 : 0,
                    x = S === c ? 0 : 1,
                    M = !0;
                  w < l.length || x < b.length;

                ) {
                  var A = void 0,
                    j = void 0;
                  w === l.length || b[x] < l[w]
                    ? ((A = m), (j = b[x]), x++)
                    : ((A = c), (j = l[w]), w++),
                    M &&
                      (S === c && A === c
                        ? (d(c, Z, m, Z), d(c, j, m, j), d(m, Z, m, j))
                        : d(S, Z, A, j)),
                    (M = !M),
                    (S = A),
                    (Z = j);
                }
                (c = m), (l = b);
              }
            } catch (I) {
              h.e(I);
            } finally {
              h.f();
            }
            p(c, l);
            var T = new Map(
              i(a).sort(function (n, t) {
                var e = f(n[0]),
                  o = (0, r.Z)(e, 2),
                  a = o[0],
                  i = o[1],
                  u = f(t[0]),
                  c = (0, r.Z)(u, 2),
                  l = c[0],
                  s = c[1];
                return a === l ? i - s : a - l;
              })
            );
            return T;
          },
          l = function (n) {
            for (var t = []; n.size; ) {
              for (
                var e = (0, r.Z)(n.entries().next().value, 2),
                  o = e[0],
                  a = e[1],
                  i = o,
                  u = [f(i)],
                  c = null;
                c !== i;

              ) {
                (c = a.values().next().value),
                  u.push(f(c)),
                  a.delete(c),
                  0 === a.size && n.delete(o);
                var l = n.get(c);
                if ((l.delete(o), 0 === l.size)) {
                  n.delete(c);
                  break;
                }
                (o = c), (a = l);
              }
              t.push(u);
            }
            for (var s = [], v = 0, y = t; v < y.length; v++) {
              var d = y[v];
              !1;
              var p = d
                  .slice(1)
                  .map(function (n) {
                    var t = (0, r.Z)(n, 2),
                      e = t[0],
                      o = t[1];
                    return "".concat(e, " ").concat(o);
                  })
                  .join(" "),
                h = "M".concat(d[0][0], " ").concat(d[0][1], " L") + p;
              s.push(h);
            }
            return s;
          };
      },
      0: function (n, t, e) {
        e.r(t),
          e.d(t, {
            encodedMaskToSVG: function () {
              return i;
            },
          });
        var r = e(476),
          o = r.generatePolygonSegments,
          a = r.convertSegmentsToSVG;
        function i(n, t) {
          var e = (function (n) {
              for (var t = [], e = 0; e < n.length; ) {
                for (var r = 0, o = 0, a = 1; a; ) {
                  var i = n.charCodeAt(e) - 48;
                  (r |= (31 & i) << (5 * o)),
                    e++,
                    o++,
                    !(a = 32 & i) && 16 & i && (r |= -1 << (5 * o));
                }
                t.length > 2 && (r += t[t.length - 2]), t.push(r);
              }
              return t;
            })(n),
            r = o(e, t);
          return a(r).join(" ");
        }
      },
      907: function (n, t, e) {
        function r(n, t) {
          (null == t || t > n.length) && (t = n.length);
          for (var e = 0, r = new Array(t); e < t; e++) r[e] = n[e];
          return r;
        }
        e.d(t, {
          Z: function () {
            return r;
          },
        });
      },
      878: function (n, t, e) {
        function r(n) {
          if (Array.isArray(n)) return n;
        }
        e.d(t, {
          Z: function () {
            return r;
          },
        });
      },
      902: function (n, t, e) {
        function r(n, t) {
          var e =
            null == n
              ? null
              : ("undefined" !== typeof Symbol && n[Symbol.iterator]) ||
                n["@@iterator"];
          if (null != e) {
            var r,
              o,
              a = [],
              i = !0,
              u = !1;
            try {
              for (
                e = e.call(n);
                !(i = (r = e.next()).done) &&
                (a.push(r.value), !t || a.length !== t);
                i = !0
              );
            } catch (f) {
              (u = !0), (o = f);
            } finally {
              try {
                i || null == e.return || e.return();
              } finally {
                if (u) throw o;
              }
            }
            return a;
          }
        }
        e.d(t, {
          Z: function () {
            return r;
          },
        });
      },
      267: function (n, t, e) {
        function r() {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        }
        e.d(t, {
          Z: function () {
            return r;
          },
        });
      },
      324: function (n, t, e) {
        e.d(t, {
          Z: function () {
            return u;
          },
        });
        var r = e(878),
          o = e(902),
          a = e(181),
          i = e(267);
        function u(n, t) {
          return (0, r.Z)(n) || (0, o.Z)(n, t) || (0, a.Z)(n, t) || (0, i.Z)();
        }
      },
      181: function (n, t, e) {
        e.d(t, {
          Z: function () {
            return o;
          },
        });
        var r = e(907);
        function o(n, t) {
          if (n) {
            if ("string" === typeof n) return (0, r.Z)(n, t);
            var e = Object.prototype.toString.call(n).slice(8, -1);
            return (
              "Object" === e && n.constructor && (e = n.constructor.name),
              "Map" === e || "Set" === e
                ? Array.from(n)
                : "Arguments" === e ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)
                ? (0, r.Z)(n, t)
                : void 0
            );
          }
        }
      },
    },
    t = {};
  function e(r) {
    var o = t[r];
    if (void 0 !== o) return o.exports;
    var a = (t[r] = {
      exports: {},
    });
    return n[r](a, a.exports, e), a.exports;
  }
  (e.d = function (n, t) {
    for (var r in t)
      e.o(t, r) &&
        !e.o(n, r) &&
        Object.defineProperty(n, r, {
          enumerable: !0,
          get: t[r],
        });
  }),
    (e.o = function (n, t) {
      return Object.prototype.hasOwnProperty.call(n, t);
    }),
    (e.r = function (n) {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(n, Symbol.toStringTag, {
          value: "Module",
        }),
        Object.defineProperty(n, "__esModule", {
          value: !0,
        });
    }),
    (function () {
      var n = e(324),
        t = e(0).encodedMaskToSVG;
      onmessage = function (e) {
        var r = (0, n.Z)(e.data, 2),
          o = r[0],
          a = r[1],
          i = o.masks.map(function (n) {
            return n.segmentation.svg || t(n.segmentation.counts, a);
          });
        postMessage(i);
      };
    })();
})();
