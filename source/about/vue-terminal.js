!function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define("VueTerminal", [], e) : "object" == typeof exports ? exports.VueTerminal = e() : t.VueTerminal = e()
}(this, function() {
    return function(t) {
        function e(i) {
            if (n[i])
                return n[i].exports;
            var r = n[i] = {
                i: i,
                l: !1,
                exports: {}
            };
            return t[i].call(r.exports, r, r.exports, e), r.l = !0, r.exports
        }
        var n = {};
        return e.m = t, e.c = n, e.d = function(t, n, i) {
            e.o(t, n) || Object.defineProperty(t, n, {
                configurable: !1,
                enumerable: !0,
                get: i
            })
        }, e.n = function(t) {
            var n = t && t.__esModule ? function() {
                return t.default
            } : function() {
                return t
            };
            return e.d(n, "a", n), n
        }, e.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, e.p = "/dist/", e(e.s = 8)
    }([function(t, e) {
        var n = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
        "number" == typeof __g && (__g = n)
    }, function(t, e) {
        var n = t.exports = {
            version: "2.5.1"
        };
        "number" == typeof __e && (__e = n)
    }, function(t, e) {
        t.exports = function(t) {
            return "object" == typeof t ? null !== t : "function" == typeof t
        }
    }, function(t, e, n) {
        t.exports = !n(4)(function() {
            return 7 != Object.defineProperty({}, "a", {
                get: function() {
                    return 7
                }
            }).a
        })
    }, function(t, e) {
        t.exports = function(t) {
            try {
                return !!t()
            } catch (t) {
                return !0
            }
        }
    }, function(t, e) {
        t.exports = function(t) {
            if (void 0 == t)
                throw TypeError("Can't call method on  " + t);
            return t
        }
    }, function(t, e, n) {
        var i = n(24),
            r = n(5);
        t.exports = function(t) {
            return i(r(t))
        }
    }, function(t, e) {
        var n = Math.ceil,
            i = Math.floor;
        t.exports = function(t) {
            return isNaN(t = +t) ? 0 : (t > 0 ? i : n)(t)
        }
    }, function(t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(9);
        e.default = i.a, "undefined" != typeof window && window.Vue && window.Vue.component("vue-terminal", i.a)
    }, function(t, e, n) {
        "use strict";
        function i(t) {
            n(10)
        }
        var r = n(16),
            o = n(44),
            a = n(15),
            s = i,
            u = a(r.a, o.a, !1, s, "data-v-38761ee9", null);
        e.a = u.exports
    }, function(t, e, n) {
        var i = n(11);
        "string" == typeof i && (i = [[t.i, i, ""]]), i.locals && (t.exports = i.locals);
        n(13)("bce2a0fe", i, !0)
    }, function(t, e, n) {
        e = t.exports = n(12)(void 0), e.push([t.i, '.terminal[data-v-38761ee9]{position:relative;width:100%;border-radius:4px;color:#fff;margin-bottom:10px;max-height:580px}.terminal .terminal-window[data-v-38761ee9]{padding-top:50px;background-color:#313131;min-height:140px;padding:20px;font-weight:400;font-family:Monaco,Menlo,Consolas,monospace;color:#fff}.terminal .terminal-window pre[data-v-38761ee9]{font-family:Monaco,Menlo,Consolas,monospace;white-space:pre-wrap}.terminal .terminal-window p[data-v-38761ee9]{overflow-wrap:break-word;word-break:break-all;font-size:13px}.terminal .terminal-window p .cmd[data-v-38761ee9]{line-height:24px}.terminal .terminal-window p .info[data-v-38761ee9]{padding:2px 3px;background:#2980b9}.terminal .terminal-window p .warning[data-v-38761ee9]{padding:2px 3px;background:#f39c12}.terminal .terminal-window p .success[data-v-38761ee9]{padding:2px 3px;background:#27ae60}.terminal .terminal-window p .error[data-v-38761ee9]{padding:2px 3px;background:#c0392b}.terminal .terminal-window p .system[data-v-38761ee9]{padding:2px 3px;background:#bdc3c7}.terminal .terminal-window pre[data-v-38761ee9]{display:inline}.terminal .header ul.shell-dots li[data-v-38761ee9]{display:inline-block;width:12px;height:12px;border-radius:6px;background-color:#030924;margin-left:6px}.terminal .header ul.shell-dots li.red[data-v-38761ee9]{background-color:#c83030}.terminal .header ul.shell-dots li.yellow[data-v-38761ee9]{background-color:#f7db60}.terminal .header ul.shell-dots li.green[data-v-38761ee9]{background-color:#2ec971}.terminal .header[data-v-38761ee9]{position:absolute;z-index:2;top:0;right:0;left:0;background-color:#222;text-align:center;padding:2px;border-top-left-radius:4px;border-top-right-radius:4px}.terminal .header h4[data-v-38761ee9]{font-size:14px;margin:5px;letter-spacing:1px}.terminal .header ul.shell-dots[data-v-38761ee9]{position:absolute;top:5px;left:8px;padding-left:0;margin:0}.terminal .terminal-window .prompt[data-v-38761ee9]:before{content:"$";margin-right:10px}.terminal .terminal-window .cursor[data-v-38761ee9]{margin:0;background-color:#fff;animation:blink-data-v-38761ee9 1s step-end infinite;-webkit-animation:blink-data-v-38761ee9 1s step-end infinite;margin-left:-5px}@keyframes blink-data-v-38761ee9{50%{visibility:hidden}}@-webkit-keyframes blink-data-v-38761ee9{50%{visibility:hidden}}.terminal .terminal-window .loading[data-v-38761ee9]{display:inline-block;width:0;overflow:hidden;animation:load-data-v-38761ee9 1.2s step-end infinite;-webkit-animation:load-data-v-38761ee9 1.2s step-end infinite}@keyframes load-data-v-38761ee9{0%{width:0}20%{width:5px}40%{width:10px}60%{width:15px}80%{width:20px}}@-webkit-keyframes load-data-v-38761ee9{0%{width:0}20%{width:5px}40%{width:10px}60%{width:15px}80%{width:20px}}.terminal-last-line[data-v-38761ee9]{font-size:0;word-spacing:0;letter-spacing:0}.input-box[data-v-38761ee9]{position:relative;background:#030924;border:none;width:1px;opacity:0;cursor:default}.input-box[data-v-38761ee9]:focus{outline:none;border:none}', ""])
    }, function(t, e) {
        function n(t, e) {
            var n = t[1] || "",
                r = t[3];
            if (!r)
                return n;
            if (e && "function" == typeof btoa) {
                var o = i(r);
                return [n].concat(r.sources.map(function(t) {
                    return "/*# sourceURL=" + r.sourceRoot + t + " */"
                })).concat([o]).join("\n")
            }
            return [n].join("\n")
        }
        function i(t) {
            return "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(t)))) + " */"
        }
        t.exports = function(t) {
            var e = [];
            return e.toString = function() {
                return this.map(function(e) {
                    var i = n(e, t);
                    return e[2] ? "@media " + e[2] + "{" + i + "}" : i
                }).join("")
            }, e.i = function(t, n) {
                "string" == typeof t && (t = [[null, t, ""]]);
                for (var i = {}, r = 0; r < this.length; r++) {
                    var o = this[r][0];
                    "number" == typeof o && (i[o] = !0)
                }
                for (r = 0; r < t.length; r++) {
                    var a = t[r];
                    "number" == typeof a[0] && i[a[0]] || (n && !a[2] ? a[2] = n : n && (a[2] = "(" + a[2] + ") and (" + n + ")"), e.push(a))
                }
            }, e
        }
    }, function(t, e, n) {
        function i(t) {
            for (var e = 0; e < t.length; e++) {
                var n = t[e],
                    i = l[n.id];
                if (i) {
                    i.refs++;
                    for (var r = 0; r < i.parts.length; r++)
                        i.parts[r](n.parts[r]);
                    for (; r < n.parts.length; r++)
                        i.parts.push(o(n.parts[r]));
                    i.parts.length > n.parts.length && (i.parts.length = n.parts.length)
                } else {
                    for (var a = [], r = 0; r < n.parts.length; r++)
                        a.push(o(n.parts[r]));
                    l[n.id] = {
                        id: n.id,
                        refs: 1,
                        parts: a
                    }
                }
            }
        }
        function r() {
            var t = document.createElement("style");
            return t.type = "text/css", p.appendChild(t), t
        }
        function o(t) {
            var e,
                n,
                i = document.querySelector('style[data-vue-ssr-id~="' + t.id + '"]');
            if (i) {
                if (m)
                    return h;
                i.parentNode.removeChild(i)
            }
            if (v) {
                var o = f++;
                i = d || (d = r()), e = a.bind(null, i, o, !1), n = a.bind(null, i, o, !0)
            } else
                i = r(), e = s.bind(null, i), n = function() {
                    i.parentNode.removeChild(i)
                };
            return e(t), function(i) {
                if (i) {
                    if (i.css === t.css && i.media === t.media && i.sourceMap === t.sourceMap)
                        return;
                    e(t = i)
                } else
                    n()
            }
        }
        function a(t, e, n, i) {
            var r = n ? "" : i.css;
            if (t.styleSheet)
                t.styleSheet.cssText = g(e, r);
            else {
                var o = document.createTextNode(r),
                    a = t.childNodes;
                a[e] && t.removeChild(a[e]), a.length ? t.insertBefore(o, a[e]) : t.appendChild(o)
            }
        }
        function s(t, e) {
            var n = e.css,
                i = e.media,
                r = e.sourceMap;
            if (i && t.setAttribute("media", i), r && (n += "\n/*# sourceURL=" + r.sources[0] + " */", n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(r)))) + " */"), t.styleSheet)
                t.styleSheet.cssText = n;
            else {
                for (; t.firstChild;)
                    t.removeChild(t.firstChild);
                t.appendChild(document.createTextNode(n))
            }
        }
        var u = "undefined" != typeof document;
        if ("undefined" != typeof DEBUG && DEBUG && !u)
            throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");
        var c = n(14),
            l = {},
            p = u && (document.head || document.getElementsByTagName("head")[0]),
            d = null,
            f = 0,
            m = !1,
            h = function() {},
            v = "undefined" != typeof navigator && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());
        t.exports = function(t, e, n) {
            m = n;
            var r = c(t, e);
            return i(r), function(e) {
                for (var n = [], o = 0; o < r.length; o++) {
                    var a = r[o],
                        s = l[a.id];
                    s.refs--, n.push(s)
                }
                e ? (r = c(t, e), i(r)) : r = [];
                for (var o = 0; o < n.length; o++) {
                    var s = n[o];
                    if (0 === s.refs) {
                        for (var u = 0; u < s.parts.length; u++)
                            s.parts[u]();
                        delete l[s.id]
                    }
                }
            }
        };
        var g = function() {
            var t = [];
            return function(e, n) {
                return t[e] = n, t.filter(Boolean).join("\n")
            }
        }()
    }, function(t, e) {
        t.exports = function(t, e) {
            for (var n = [], i = {}, r = 0; r < e.length; r++) {
                var o = e[r],
                    a = o[0],
                    s = o[1],
                    u = o[2],
                    c = o[3],
                    l = {
                        id: t + ":" + r,
                        css: s,
                        media: u,
                        sourceMap: c
                    };
                i[a] ? i[a].parts.push(l) : n.push(i[a] = {
                    id: a,
                    parts: [l]
                })
            }
            return n
        }
    }, function(t, e) {
        t.exports = function(t, e, n, i, r, o) {
            var a,
                s = t = t || {},
                u = typeof t.default;
            "object" !== u && "function" !== u || (a = t, s = t.default);
            var c = "function" == typeof s ? s.options : s;
            e && (c.render = e.render, c.staticRenderFns = e.staticRenderFns, c._compiled = !0), n && (c.functional = !0), r && (c._scopeId = r);
            var l;
            if (o ? (l = function(t) {
                t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, t || "undefined" == typeof __VUE_SSR_CONTEXT__ || (t = __VUE_SSR_CONTEXT__), i && i.call(this, t), t && t._registeredComponents && t._registeredComponents.add(o)
            }, c._ssrRegister = l) : i && (l = i), l) {
                var p = c.functional,
                    d = p ? c.render : c.beforeCreate;
                p ? (c._injectStyles = l, c.render = function(t, e) {
                    return l.call(e), d(t, e)
                }) : c.beforeCreate = d ? [].concat(d, l) : [l]
            }
            return {
                esModule: a,
                exports: s,
                options: c
            }
        }
    }, function(t, e, n) {
        "use strict";
        var i = n(17),
            r = n.n(i);
        e.a = {
            name: "VueTerminal",
            data: function() {
                return {
                    title: "AboutMe",
                    messageList: [],
                    actionResult: "",
                    lastLineContent: "...",
                    inputCommand: "",
                    supportingCommandList: "",
                    historyIndex: 0,
                    commandHistory: []
                }
            },
            props: {
                defaultTask: {
                    required: !1,
                    default: "defaultTask"
                },
                commandList: {
                    required: !1,
                    default: function() {
                        return {}
                    }
                },
                taskList: {
                    required: !1,
                    default: function() {
                        return {}
                    }
                }
            },
            computed: {
                lastLineClass: function() {
                    return "&nbsp" === this.lastLineContent ? "cursor" : "..." === this.lastLineContent ? "loading" : void 0
                }
            },
            created: function() {
                var t = this;
                this.supportingCommandList = r()(this.commandList).concat(r()(this.taskList)), this.handleRun(this.defaultTask).then(function() {
                    t.pushToList({
                        type: "system",
                        label: "System",
                        message: 'Type "help" to get a supporting command list.'
                    }), t.handleFocus()
                })
            },
            methods: {
                handleFocus: function() {
                    this.$refs.inputBox.focus()
                },
                handleCommand: function(t) {
                    var e = this;
                    if (13 !== t.keyCode)
                        return void this.handlekeyEvent(t);
                    if (this.commandHistory.push(this.inputCommand), this.historyIndex = this.commandHistory.length, this.pushToList({
                        message: "$ " + this.title + "/ " + this.inputCommand + " "
                    }), this.inputCommand) {
                        var n = this.inputCommand.split(" ");
                        "help" === n[0] ? this.printHelp(n[1]) : this.commandList[this.inputCommand] ? this.commandList[this.inputCommand].messages.map(function(t) {
                            return e.pushToList(t)
                        }) : this.taskList[this.inputCommand.split(" ")[0]] ? this.handleRun(this.inputCommand.split(" ")[0], this.inputCommand) : (this.pushToList({
                            type: "system",
                            label: "System",
                            message: "Unknown Command."
                        }), this.pushToList({
                            type: "system",
                            label: "System",
                            message: 'type "help" to get a supporting command list.'
                        })), this.inputCommand = "", this.autoScroll()
                    }
                },
                handlekeyEvent: function(t) {
                    switch (t.keyCode) {
                        case 38:
                            this.historyIndex = 0 === this.historyIndex ? 0 : this.historyIndex - 1, this.inputCommand = this.commandHistory[this.historyIndex];
                            break;
                        case 40:
                            this.historyIndex = this.historyIndex === this.commandHistory.length ? this.commandHistory.length : this.historyIndex + 1, this.inputCommand = this.commandHistory[this.historyIndex]
                    }
                },
                handleRun: function(t, e) {
                    var n = this;
                    return this.lastLineContent = "...", this.taskList[t][t](this.pushToList, e).then(function(t) {
                        n.pushToList(t), n.lastLineContent = "&nbsp"
                    }).catch(function(t) {
                        n.pushToList(t || {
                            type: "error",
                            label: "Error",
                            message: "Something went wrong!"
                        }), n.lastLineContent = "&nbsp"
                    })
                },
                pushToList: function(t) {
                    this.messageList.push(t), this.autoScroll()
                },
                printHelp: function(t) {
                    var e = this;
                    if (t) {
                        var n = this.commandList[t] || this.taskList[t];
                        this.pushToList({
                            message: n.description
                        })
                    } else
                        this.pushToList({
                            message: "Here is a list of supporting command."
                        }), this.supportingCommandList.map(function(t) {
                            e.commandList[t] ? e.pushToList({
                                type: "success",
                                label: t,
                                message: "---\x3e " + e.commandList[t].description
                            }) : e.pushToList({
                                type: "success",
                                label: t,
                                message: "---\x3e " + e.taskList[t].description
                            })
                        }), this.pushToList({
                            message: "Enter help <command> to get help for a particular command."
                        });
                    this.autoScroll()
                },
                time: function() {
                    return (new Date).toLocaleTimeString().split("").splice(2).join("")
                },
                autoScroll: function() {
                    var t = this;
                    this.$nextTick(function() {
                        t.$refs.terminalWindow.scrollTop = t.$refs.terminalLastLine.offsetTop
                    })
                }
            }
        }
    }, function(t, e, n) {
        t.exports = {
            default: n(18),
            __esModule: !0
        }
    }, function(t, e, n) {
        n(19), t.exports = n(1).Object.keys
    }, function(t, e, n) {
        var i = n(20),
            r = n(21);
        n(33)("keys", function() {
            return function(t) {
                return r(i(t))
            }
        })
    }, function(t, e, n) {
        var i = n(5);
        t.exports = function(t) {
            return Object(i(t))
        }
    }, function(t, e, n) {
        var i = n(22),
            r = n(32);
        t.exports = Object.keys || function(t) {
            return i(t, r)
        }
    }, function(t, e, n) {
        var i = n(23),
            r = n(6),
            o = n(26)(!1),
            a = n(29)("IE_PROTO");
        t.exports = function(t, e) {
            var n,
                s = r(t),
                u = 0,
                c = [];
            for (n in s)
                n != a && i(s, n) && c.push(n);
            for (; e.length > u;)
                i(s, n = e[u++]) && (~o(c, n) || c.push(n));
            return c
        }
    }, function(t, e) {
        var n = {}.hasOwnProperty;
        t.exports = function(t, e) {
            return n.call(t, e)
        }
    }, function(t, e, n) {
        var i = n(25);
        t.exports = Object("z").propertyIsEnumerable(0) ? Object : function(t) {
            return "String" == i(t) ? t.split("") : Object(t)
        }
    }, function(t, e) {
        var n = {}.toString;
        t.exports = function(t) {
            return n.call(t).slice(8, -1)
        }
    }, function(t, e, n) {
        var i = n(6),
            r = n(27),
            o = n(28);
        t.exports = function(t) {
            return function(e, n, a) {
                var s,
                    u = i(e),
                    c = r(u.length),
                    l = o(a, c);
                if (t && n != n) {
                    for (; c > l;)
                        if ((s = u[l++]) != s)
                            return !0
                } else
                    for (; c > l; l++)
                        if ((t || l in u) && u[l] === n)
                            return t || l || 0;
                return !t && -1
            }
        }
    }, function(t, e, n) {
        var i = n(7),
            r = Math.min;
        t.exports = function(t) {
            return t > 0 ? r(i(t), 9007199254740991) : 0
        }
    }, function(t, e, n) {
        var i = n(7),
            r = Math.max,
            o = Math.min;
        t.exports = function(t, e) {
            return t = i(t), t < 0 ? r(t + e, 0) : o(t, e)
        }
    }, function(t, e, n) {
        var i = n(30)("keys"),
            r = n(31);
        t.exports = function(t) {
            return i[t] || (i[t] = r(t))
        }
    }, function(t, e, n) {
        var i = n(0),
            r = i["__core-js_shared__"] || (i["__core-js_shared__"] = {});
        t.exports = function(t) {
            return r[t] || (r[t] = {})
        }
    }, function(t, e) {
        var n = 0,
            i = Math.random();
        t.exports = function(t) {
            return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++n + i).toString(36))
        }
    }, function(t, e) {
        t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
    }, function(t, e, n) {
        var i = n(34),
            r = n(1),
            o = n(4);
        t.exports = function(t, e) {
            var n = (r.Object || {})[t] || Object[t],
                a = {};
            a[t] = e(n), i(i.S + i.F * o(function() {
                n(1)
            }), "Object", a)
        }
    }, function(t, e, n) {
        var i = n(0),
            r = n(1),
            o = n(35),
            a = n(37),
            s = function(t, e, n) {
                var u,
                    c,
                    l,
                    p = t & s.F,
                    d = t & s.G,
                    f = t & s.S,
                    m = t & s.P,
                    h = t & s.B,
                    v = t & s.W,
                    g = d ? r : r[e] || (r[e] = {}),
                    x = g.prototype,
                    y = d ? i : f ? i[e] : (i[e] || {}).prototype;
                d && (n = e);
                for (u in n)
                    (c = !p && y && void 0 !== y[u]) && u in g || (l = c ? y[u] : n[u], g[u] = d && "function" != typeof y[u] ? n[u] : h && c ? o(l, i) : v && y[u] == l ? function(t) {
                        var e = function(e, n, i) {
                            if (this instanceof t) {
                                switch (arguments.length) {
                                    case 0:
                                        return new t;
                                    case 1:
                                        return new t(e);
                                    case 2:
                                        return new t(e, n)
                                }
                                return new t(e, n, i)
                            }
                            return t.apply(this, arguments)
                        };
                        return e.prototype = t.prototype, e
                    }(l) : m && "function" == typeof l ? o(Function.call, l) : l, m && ((g.virtual || (g.virtual = {}))[u] = l, t & s.R && x && !x[u] && a(x, u, l)))
            };
        s.F = 1, s.G = 2, s.S = 4, s.P = 8, s.B = 16, s.W = 32, s.U = 64, s.R = 128, t.exports = s
    }, function(t, e, n) {
        var i = n(36);
        t.exports = function(t, e, n) {
            if (i(t), void 0 === e)
                return t;
            switch (n) {
                case 1:
                    return function(n) {
                        return t.call(e, n)
                    };
                case 2:
                    return function(n, i) {
                        return t.call(e, n, i)
                    };
                case 3:
                    return function(n, i, r) {
                        return t.call(e, n, i, r)
                    }
            }
            return function() {
                return t.apply(e, arguments)
            }
        }
    }, function(t, e) {
        t.exports = function(t) {
            if ("function" != typeof t)
                throw TypeError(t + " is not a function!");
            return t
        }
    }, function(t, e, n) {
        var i = n(38),
            r = n(43);
        t.exports = n(3) ? function(t, e, n) {
            return i.f(t, e, r(1, n))
        } : function(t, e, n) {
            return t[e] = n, t
        }
    }, function(t, e, n) {
        var i = n(39),
            r = n(40),
            o = n(42),
            a = Object.defineProperty;
        e.f = n(3) ? Object.defineProperty : function(t, e, n) {
            if (i(t), e = o(e, !0), i(n), r)
                try {
                    return a(t, e, n)
                } catch (t) {}
            if ("get" in n || "set" in n)
                throw TypeError("Accessors not supported!");
            return "value" in n && (t[e] = n.value), t
        }
    }, function(t, e, n) {
        var i = n(2);
        t.exports = function(t) {
            if (!i(t))
                throw TypeError(t + " is not an object!");
            return t
        }
    }, function(t, e, n) {
        t.exports = !n(3) && !n(4)(function() {
            return 7 != Object.defineProperty(n(41)("div"), "a", {
                get: function() {
                    return 7
                }
            }).a
        })
    }, function(t, e, n) {
        var i = n(2),
            r = n(0).document,
            o = i(r) && i(r.createElement);
        t.exports = function(t) {
            return o ? r.createElement(t) : {}
        }
    }, function(t, e, n) {
        var i = n(2);
        t.exports = function(t, e) {
            if (!i(t))
                return t;
            var n,
                r;
            if (e && "function" == typeof (n = t.toString) && !i(r = n.call(t)))
                return r;
            if ("function" == typeof (n = t.valueOf) && !i(r = n.call(t)))
                return r;
            if (!e && "function" == typeof (n = t.toString) && !i(r = n.call(t)))
                return r;
            throw TypeError("Can't convert object to primitive value")
        }
    }, function(t, e) {
        t.exports = function(t, e) {
            return {
                enumerable: !(1 & t),
                configurable: !(2 & t),
                writable: !(4 & t),
                value: e
            }
        }
    }, function(t, e, n) {
        "use strict";
        var i = function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "terminal",
                    on: {
                        click: t.handleFocus
                    }
                }, [n("div", {
                    staticStyle: {
                        position: "relative"
                    }
                }, [n("div", {
                    staticClass: "header"
                }, [n("h4", [t._v(t._s(t.title))]), t._v(" "), t._m(0)]), t._v(" "), n("div", {
                    ref: "terminalWindow",
                    staticStyle: {
                        position: "absolute",
                        top: "0",
                        left: "0",
                        right: "0",
                        overflow: "auto",
                        "z-index": "1",
                        "margin-top": "30px",
                        "max-height": "645px"
                    }
                }, [n("div", {
                    staticClass: "terminal-window",
                    attrs: {
                        id: "terminalWindow"
                    }
                }, [n("p", [t._v("Welcome to " + t._s(t.title) + ".")]), t._v(" "), n("p", [n("span", {
                    staticClass: "prompt"
                }), n("span", {
                    staticClass: "cmd"
                }, [t._v("cd " + t._s(t.title))])]), t._v(" "), t._l(t.messageList, function(e, i) {
                    return n("p", {
                        key: i
                    }, [n("span", [t._v(t._s(e.time))]), t._v(" "), e.label ? n("span", {
                        class: e.type
                    }, [t._v(t._s(e.label))]) : t._e(), t._v(" "), e.message.list ? n("span", {
                        staticClass: "cmd"
                    }, [n("span", [t._v(t._s(e.message.text))]), t._v(" "), n("ul", t._l(e.message.list, function(e, i) {
                        return n("li", {
                            key: i
                        }, [e.label ? n("span", {
                            class: e.type
                        }, [t._v(t._s(e.label) + ":")]) : t._e(), t._v(" "), n("pre", [t._v(t._s(e.message))])])
                    }))]) : n("span", {
                        staticClass: "cmd"
                    }, [t._v(t._s(e.message))])])
                }), t._v(" "), t.actionResult ? n("p", [n("span", {
                    staticClass: "cmd"
                }, [t._v(t._s(t.actionResult))])]) : t._e(), t._v(" "), n("p", {
                    ref: "terminalLastLine",
                    staticClass: "terminal-last-line"
                }, ["&nbsp" === t.lastLineContent ? n("span", {
                    staticClass: "prompt"
                }, [t._v("" + t._s(t.title) + "/ ")]) : t._e(), t._v(" "), n("span", [t._v(t._s(t.inputCommand))]), t._v(" "), n("span", {
                    class: t.lastLineClass,
                    domProps: {
                        innerHTML: t._s(t.lastLineContent)
                    }
                }), t._v(" "), n("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.inputCommand,
                        expression: "inputCommand"
                    }],
                    ref: "inputBox",
                    staticClass: "input-box",
                    attrs: {
                        disabled: "&nbsp" !== t.lastLineContent,
                        autofocus: "true",
                        type: "text"
                    },
                    domProps: {
                        value: t.inputCommand
                    },
                    on: {
                        keyup: function(e) {
                            t.handleCommand(e)
                        },
                        input: function(e) {
                            e.target.composing || (t.inputCommand = e.target.value)
                        }
                    }
                })])], 2)])])])
            },
            r = [function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("ul", {
                    staticClass: "shell-dots"
                }, [n("li", {
                    staticClass: "red"
                }), t._v(" "), n("li", {
                    staticClass: "yellow"
                }), t._v(" "), n("li", {
                    staticClass: "green"
                })])
            }],
            o = {
                render: i,
                staticRenderFns: r
            };
        e.a = o
    }])
});
//# sourceMappingURL=vue-terminal.min.js.map

