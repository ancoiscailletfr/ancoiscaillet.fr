/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-webp-setclasses ! */
!(function (e, n, A) { function o (e) { let n = u.className; const A = Modernizr._config.classPrefix || ''; if (c && (n = n.baseVal), Modernizr._config.enableJSClass) { const o = new RegExp('(^|\\s)' + A + 'no-js(\\s|$)'); n = n.replace(o, '$1' + A + 'js$2') }Modernizr._config.enableClasses && (n += ' ' + A + e.join(' ' + A), c ? u.className.baseVal = n : u.className = n) } function t (e, n) { return typeof e === n } function a () { let e, n, A, o, a, i, l; for (const f in r) if (r.hasOwnProperty(f)) { if (e = [], n = r[f], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)) for (A = 0; A < n.options.aliases.length; A++)e.push(n.options.aliases[A].toLowerCase()); for (o = t(n.fn, 'function') ? n.fn() : n.fn, a = 0; a < e.length; a++)i = e[a], l = i.split('.'), l.length === 1 ? Modernizr[l[0]] = o : (!Modernizr[l[0]] || Modernizr[l[0]] instanceof Boolean || (Modernizr[l[0]] = new Boolean(Modernizr[l[0]])), Modernizr[l[0]][l[1]] = o), s.push((o ? '' : 'no-') + l.join('-')) } } function i (e, n) { if (typeof e === 'object') for (const A in e)f(e, A) && i(A, e[A]); else { e = e.toLowerCase(); const t = e.split('.'); let a = Modernizr[t[0]]; if (t.length == 2 && (a = a[t[1]]), typeof a !== 'undefined') return Modernizr; n = typeof n === 'function' ? n() : n, t.length == 1 ? Modernizr[t[0]] = n : (!Modernizr[t[0]] || Modernizr[t[0]] instanceof Boolean || (Modernizr[t[0]] = new Boolean(Modernizr[t[0]])), Modernizr[t[0]][t[1]] = n), o([(n && n != 0 ? '' : 'no-') + t.join('-')]), Modernizr._trigger(e, n) } return Modernizr } var s = []; var r = []; const l = { _version: '3.6.0', _config: { classPrefix: '', enableClasses: !0, enableJSClass: !0, usePrefixes: !0 }, _q: [], on: function (e, n) { const A = this; setTimeout(function () { n(A[e]) }, 0) }, addTest: function (e, n, A) { r.push({ name: e, fn: n, options: A }) }, addAsyncTest: function (e) { r.push({ name: null, fn: e }) } }; var Modernizr = function () {}; Modernizr.prototype = l, Modernizr = new Modernizr(); let f; var u = n.documentElement; var c = u.nodeName.toLowerCase() === 'svg'; !(function () { const e = {}.hasOwnProperty; f = t(e, 'undefined') || t(e.call, 'undefined') ? function (e, n) { return n in e && t(e.constructor.prototype[n], 'undefined') } : function (n, A) { return e.call(n, A) } }()), l._l = {}, l.on = function (e, n) { this._l[e] || (this._l[e] = []), this._l[e].push(n), Modernizr.hasOwnProperty(e) && setTimeout(function () { Modernizr._trigger(e, Modernizr[e]) }, 0) }, l._trigger = function (e, n) { if (this._l[e]) { const A = this._l[e]; setTimeout(function () { let e, o; for (e = 0; e < A.length; e++)(o = A[e])(n) }, 0), delete this._l[e] } }, Modernizr._q.push(function () { l.addTest = i }), Modernizr.addAsyncTest(function () { function e (e, n, A) { function o (n) { const o = n && n.type === 'load' ? t.width == 1 : !1; const a = e === 'webp'; i(e, a && o ? new Boolean(o) : o), A && A(n) } var t = new Image(); t.onerror = o, t.onload = o, t.src = n } const n = [{ uri: 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=', name: 'webp' }, { uri: 'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==', name: 'webp.alpha' }, { uri: 'data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA', name: 'webp.animation' }, { uri: 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=', name: 'webp.lossless' }]; const A = n.shift(); e(A.name, A.uri, function (A) { if (A && A.type === 'load') for (let o = 0; o < n.length; o++)e(n[o].name, n[o].uri) }) }), a(), o(s), delete l.addTest, delete l.addAsyncTest; for (let p = 0; p < Modernizr._q.length; p++)Modernizr._q[p](); e.Modernizr = Modernizr }(window, document))
