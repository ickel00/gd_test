var _riskFpMode = _riskFpMode || "strict";
"fast" != _riskFpMode && (_riskFpMode = "strict");
"function" != typeof String.prototype.startsWith && (String.prototype.startsWith = function(m) {
    return this.slice(0, m.length) === m
});
"function" != typeof String.prototype.endsWith && (String.prototype.endsWith = function(m) {
    return -1 !== this.indexOf(m, this.length - m.length)
});

(function() {
    if (!window.__global_jdt_risk_fp_exec) {
        window.__global_jdt_risk_fp_exec = "1";
        try {
            (new SdkCollector({
                sdkBizId: jdtRiskUtil.getBizId()
            })).getSdkToken(function(l, g, f, d) {
                jdtRiskContext.d && console.log("sdk token result: ", l, g, f);
                l && f && (jdtRiskContext.deviceInfo.sdkToken = f, l = {
                    tk: f,
                    t: (new Date).getTime()
                }, d || jdtRiskStorageManager.store(collectConfig.store.sdkTokenKey, JSON.stringify(l), !1));
                jdtRiskContext.isSdkTokenFinished = !0
            })
        } catch (l) {}
        if (window.bp_bot_detect_enable) try {
            loadScript("//gias.jd.com/dy/js/mom.js?bizId=" + window.bp_bizid + "&pageId=" + window.bp_pageid)
        } catch (l) {}
        try {
            if (jdtRiskUtil.isDegrade()) {
                var m = jdtRiskStorageManager.load(collectConfig.store[_riskFpMode].jsTokenKey),
                    n = jdtRiskStorageManager.load(collectConfig.store[_riskFpMode].fpKey, !1);
                if (jdtRiskUtil.isValidJsToken(m)) {
                    jdtRiskContext.deviceInfo.jsToken = m;
                    jdtRiskContext.deviceInfo.fp = n;
                    jdtRiskContext.isJsTokenFinished = !0;
                    return
                }
            }
        } catch (l) {}
        doCollectFp()
    }
})();

var jdtRiskContext = jdtRiskContext || {
        d: !1,
        canvas_fp_md5: "",
        isRpTok: !1,
        isSdkTokenFinished: !1,
        isJsTokenFinished: !1,
        version: "3.1.1.0",
        deviceInfo: {
            jsToken: "",
            eid: "",
            sdkToken: "",
            clientVersion: "",
            fp: ""
        },
        isReady: function() {
            return this.isJsTokenFinished && this.isSdkTokenFinished
        }
    },
    collectConfig = collectConfig || {
        fp: {
            language: "language",
            userAgent: "userAgent",
            colorDepth: "colorDepth",
            screenResolution: "screenResolution",
            timezoneOffset: "timezoneOffset",
            sessionStorage: "sessionStorage",
            localStorage: "localStorage",
            indexedDb: "indexedDb",
            addBehavior: "addBehavior",
            openDatabase: "openDatabase",
            cpuClass: "cpuClass",
            platform: "platform",
            hardwareConcurrency: "hardwareConcurrency",
            doNotTrack: "doNotTrack",
            plugins: "plugins",
            canvas: "canvas",
            webgl: "webgl"
        },
        env: {
            color: "color",
            canvas: "canvas",
            browserMode: "browserMode",
            fonts: "fonts",
            feature: "feature",
            plugins: "plugins",
            screen: "screen",
            position: "position",
            storeCheck: "storeCheck"
        },
        store: {
            sdkTokenKey: "BATQW722QTLYVCRD",
            giaDKey: "_gia_d",
            canvasFpKey: "CA1AN5BV0CA8DS2E3F",
            ldeKey: "GIA_LDE_MAP_KEY",
            strict: {
                jsTokenKey: "3AB9D23F7A4B3CSS",
                fpKey: "FFA9D23F7A4B3CSS",
                fpTsKey: "TSA9D23F7A4B3CSS",
                eidKey: "3AB9D23F7A4B3C9B"
            },
            fast: {
                jsTokenKey: "3AB9D23F7A4B3CFF",
                fpKey: "FFA9D23F7A4B3CFF",
                fpTsKey: "TSA9D23F7A4B3CFF",
                eidKey: "3AB9D23F7A4B3CFF"
            }
        },
        getEnvExcludeOptions: function(m) {
            if ("strict" == m) return {};
            if ("fast" == m) return m = {}, m[this.env.color] = !0, m[this.env.fonts] = !0, m
        },
        getFpExcludeOptions: function(m) {
            if ("strict" == m) return {};
            if ("fast" == m) return m = {}, m[this.fp.webgl] = !0, m[this.fp.plugins] = !0, m[this.fp.userAgent] = !0, m[this.fp.doNotTrack] = !0, m
        }
    },
    jdtRiskUtil = function(m) {
        var n = "https:" == document.location.protocol ? "https://" : "http://",
            l = window.__fp_domain || "gia.jd.com",
            g = "",
            f = "",
            d = "";
        (function() {
            var a = document.location.href.toString();
            try {
                var b = /^https?:\/\/(?:\w+\.)*?(\w*\.(?:com\.cn|cn|com|net|id))[\\\/]*/.exec(a);
                f = b && 1 < b.length ? b[1] : document.domain.split(".").slice(-2).join(".");
                var e = a.indexOf("?");
                0 < e && (g = a.substring(e + 1), 500 < g.length && (g = g.substring(0, 499)), a = a.substring(0, e));
                d = a.substring(n.length)
            } catch (c) {}
        })();
        m.getCurrentPageUrl = function() {
            return d
        };
        m.getCurrentPageProtocol = function() {
            return n
        };
        m.getCurrentRootDomain = function() {
            return f
        };
        m.getFpServerDomain = function() {
            return l
        };
        m.getUrlQueryStr = function() {
            return g
        };
        m.getBizId = function() {
            return "undefined" == typeof bp_bizid ? "" : bp_bizid
        };
        m.createWorker = function() {
            if (window.Worker && !m.worker) {
                try {
                    var a = new Blob(["onmessage = function (event) {\n    var data = JSON.parse(event.data);\n    try {\n        var httpRequest;\n        try {\n            httpRequest = new XMLHttpRequest();\n        } catch (h) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Microsoft.XMLHTTP')\n            } catch (l) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Msxml2.XMLHTTP')\n            } catch (r) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Msxml3.XMLHTTP')\n            } catch (n) {}\n\n        if(data){\n            httpRequest['open']('POST', data.url, false);\n            httpRequest['setRequestHeader']('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');\n            httpRequest['onreadystatechange'] = function () {\n                if (4 === httpRequest['readyState'] && 200 === httpRequest['status']) {\n                    postMessage(httpRequest.responseText);\n                }\n            };\n            httpRequest['send'](data.data);\n        }\n\n    }catch (e){console.error(e);}\n};"], {
                        type: "application/javascript"
                    })
                } catch (b) {
                    window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder, a = new BlobBuilder, a.append("onmessage = function (event) {\n    var data = JSON.parse(event.data);\n    try {\n        var httpRequest;\n        try {\n            httpRequest = new XMLHttpRequest();\n        } catch (h) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Microsoft.XMLHTTP')\n            } catch (l) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Msxml2.XMLHTTP')\n            } catch (r) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Msxml3.XMLHTTP')\n            } catch (n) {}\n\n        if(data){\n            httpRequest['open']('POST', data.url, false);\n            httpRequest['setRequestHeader']('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');\n            httpRequest['onreadystatechange'] = function () {\n                if (4 === httpRequest['readyState'] && 200 === httpRequest['status']) {\n                    postMessage(httpRequest.responseText);\n                }\n            };\n            httpRequest['send'](data.data);\n        }\n\n    }catch (e){console.error(e);}\n};"), a = a.getBlob()
                }
                try {
                    m.worker = new Worker(URL.createObjectURL(a))
                } catch (b) {}
            }
        };
        m.reportWorker = function(a, b, e, c) {
            try {
                m.worker && (this.worker.postMessage(JSON.stringify({
                    url: a,
                    data: b,
                    success: !1,
                    async: !1
                })), this.worker.onmessage = function(h) {})
            } catch (h) {}
        };
        m.compareVersion = function(a, b) {
            try {
                if (a === b) return 0;
                var e = a.split(".");
                var c = b.split(".");
                for (a = 0; a < e.length; a++) {
                    var h = parseInt(e[a]);
                    if (!c[a]) return 1;
                    var k = parseInt(c[a]);
                    if (h < k) break;
                    if (h > k) return 1
                }
            } catch (q) {}
            return -1
        };
        m.obtainPin = function(a) {
            var b = "";
            "string" === typeof jd_jr_td_risk_pin && 1 == a ? b = jd_jr_td_risk_pin : "string" === typeof pin ? b = pin : "object" === typeof pin && "string" === typeof jd_jr_td_risk_pin && (b = jd_jr_td_risk_pin);
            return b
        };
        m.sendRequest = function(a, b, e) {
            try {
                try {
                    var c = new window.XMLHttpRequest
                } catch (h) {}
                if (!c) try {
                    c = new window.ActiveXObject("Microsoft.XMLHTTP")
                } catch (h) {}
                if (!c) try {
                    c = new window.ActiveXObject("Msxml2.XMLHTTP")
                } catch (h) {}
                if (!c) try {
                    c = new window.ActiveXObject("Msxml3.XMLHTTP")
                } catch (h) {}
                c.open("POST", a, !0);
                c.timeout = 1E4;
                c.withCredentials = !0;
                c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
                c.onreadystatechange = function() {
                    4 === c.readyState && 200 === c.status && e && e(c.responseText)
                };
                c.send(b)
            } catch (h) {
                jdtRiskContext.d && console.error("sendRequest error : ", h)
            }
        };
        m.isDegrade = function() {
            var a = jdtRiskCookieManager.getCookie(collectConfig.store.giaDKey);
            if (a && 1 == a) return !0;
            a = jdtLocalStorageManager.get(collectConfig.store.ldeKey);
            if (!a) return !1;
            try {
                var b = JSON.parse(a)[jdtRiskUtil.getBizId()];
                return b ? b >= (new Date).getTime() : !1
            } catch (e) {}
            return !1
        };
        m.isValidSdkToken = function(a) {
            return a ? a.startsWith("jdd01") && a.endsWith("01234567") : !1
        };
        m.isValidJsToken = function(a) {
            return a ? a.startsWith("jdd03") && a.endsWith("X") : !1
        };
        m.cleanAndPushDeS = function(a, b) {
            try {
                if (a && b) {
                    var e = jdtLocalStorageManager.get(collectConfig.store.ldeKey),
                        c = {};
                    e && (c = JSON.parse(e));
                    var h = (new Date).getTime(),
                        k;
                    for (k in c) c[k] < h && delete c[k];
                    c[a] = h + 1E3 * b;
                    jdtLocalStorageManager.set(collectConfig.store.ldeKey, JSON.stringify(c))
                }
            } catch (q) {}
        };
        m.randomStr = function(a) {
            var b = "";
            try {
                for (var e = 0; e < a; e++) b += "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz".charAt(Math.floor(62 * Math.random()))
            } catch (c) {}
            return b
        };
        return m
    }(jdtRiskUtil || {}),
    jdtRiskEncryptUtil = function(m) {
        m.MD5 = function() {
            function n(a, b, e, c, h, k) {
                a = d(d(b, a), d(c, k));
                return d(a << h | a >>> 32 - h, e)
            }

            function l(a, b, e, c, h, k, q) {
                return n(b & e | ~b & c, a, b, h, k, q)
            }

            function g(a, b, e, c, h, k, q) {
                return n(b & c | e & ~c, a, b, h, k, q)
            }

            function f(a, b, e, c, h, k, q) {
                return n(e ^ (b | ~c), a, b, h, k, q)
            }

            function d(a, b) {
                var e = (a & 65535) + (b & 65535);
                return (a >> 16) + (b >> 16) + (e >> 16) << 16 | e & 65535
            }
            return {
                hex_md5: function(a) {
                    if (null == a || void 0 == a || "" == a) return "";
                    if (null == a || void 0 == a || "" == a) var b = "";
                    else {
                        b = [];
                        for (var e = 0; e < 8 * a.length; e += 8) b[e >> 5] |= (a.charCodeAt(e / 8) & 255) << e % 32
                    }
                    a = 8 * a.length;
                    b[a >> 5] |= 128 << a % 32;
                    b[(a + 64 >>> 9 << 4) + 14] = a;
                    a = 1732584193;
                    e = -271733879;
                    for (var c = -1732584194, h = 271733878, k = 0; k < b.length; k += 16) {
                        var q = a,
                            p = e,
                            t = c,
                            u = h;
                        a = l(a, e, c, h, b[k + 0], 7, -680876936);
                        h = l(h, a, e, c, b[k + 1], 12, -389564586);
                        c = l(c, h, a, e, b[k + 2], 17, 606105819);
                        e = l(e, c, h, a, b[k + 3], 22, -1044525330);
                        a = l(a, e, c, h, b[k + 4], 7, -176418897);
                        h = l(h, a, e, c, b[k + 5], 12, 1200080426);
                        c = l(c, h, a, e, b[k + 6], 17, -1473231341);
                        e = l(e, c, h, a, b[k + 7], 22, -45705983);
                        a = l(a, e, c, h, b[k + 8], 7, 1770035416);
                        h = l(h, a, e, c, b[k + 9], 12, -1958414417);
                        c = l(c, h, a, e, b[k + 10], 17, -42063);
                        e = l(e, c, h, a, b[k + 11], 22, -1990404162);
                        a = l(a, e, c, h, b[k + 12], 7, 1804603682);
                        h = l(h, a, e, c, b[k + 13], 12, -40341101);
                        c = l(c, h, a, e, b[k + 14], 17, -1502002290);
                        e = l(e, c, h, a, b[k + 15], 22, 1236535329);
                        a = g(a, e, c, h, b[k + 1], 5, -165796510);
                        h = g(h, a, e, c, b[k + 6], 9, -1069501632);
                        c = g(c, h, a, e, b[k + 11], 14, 643717713);
                        e = g(e, c, h, a, b[k + 0], 20, -373897302);
                        a = g(a, e, c, h, b[k + 5], 5, -701558691);
                        h = g(h, a, e, c, b[k + 10], 9, 38016083);
                        c = g(c, h, a, e, b[k + 15], 14, -660478335);
                        e = g(e, c, h, a, b[k + 4], 20, -405537848);
                        a = g(a, e, c, h, b[k + 9], 5, 568446438);
                        h = g(h, a, e, c, b[k + 14], 9, -1019803690);
                        c = g(c, h, a, e, b[k + 3], 14, -187363961);
                        e = g(e, c, h, a, b[k + 8], 20, 1163531501);
                        a = g(a, e, c, h, b[k + 13], 5, -1444681467);
                        h = g(h, a, e, c, b[k + 2], 9, -51403784);
                        c = g(c, h, a, e, b[k + 7], 14, 1735328473);
                        e = g(e, c, h, a, b[k + 12], 20, -1926607734);
                        a = n(e ^ c ^ h, a, e, b[k + 5], 4, -378558);
                        h = n(a ^ e ^ c, h, a, b[k + 8], 11, -2022574463);
                        c = n(h ^ a ^ e, c, h, b[k + 11], 16, 1839030562);
                        e = n(c ^ h ^ a, e, c, b[k + 14], 23, -35309556);
                        a = n(e ^ c ^ h, a, e, b[k + 1], 4, -1530992060);
                        h = n(a ^ e ^ c, h, a, b[k + 4], 11, 1272893353);
                        c = n(h ^ a ^ e, c, h, b[k + 7], 16, -155497632);
                        e = n(c ^ h ^ a, e, c, b[k + 10], 23, -1094730640);
                        a = n(e ^ c ^ h, a, e, b[k + 13], 4, 681279174);
                        h = n(a ^ e ^ c, h, a, b[k + 0], 11, -358537222);
                        c = n(h ^ a ^ e, c, h, b[k + 3], 16, -722521979);
                        e = n(c ^ h ^ a, e, c, b[k + 6], 23, 76029189);
                        a = n(e ^ c ^ h, a, e, b[k + 9], 4, -640364487);
                        h = n(a ^ e ^ c, h, a, b[k + 12], 11, -421815835);
                        c = n(h ^ a ^ e, c, h, b[k + 15], 16, 530742520);
                        e = n(c ^ h ^ a, e, c, b[k + 2], 23, -995338651);
                        a = f(a, e, c, h, b[k + 0], 6, -198630844);
                        h = f(h, a, e, c, b[k + 7], 10, 1126891415);
                        c = f(c, h, a, e, b[k + 14], 15, -1416354905);
                        e = f(e, c, h, a, b[k + 5], 21, -57434055);
                        a = f(a, e, c, h, b[k + 12], 6, 1700485571);
                        h = f(h, a, e, c, b[k + 3], 10, -1894986606);
                        c = f(c, h, a, e, b[k + 10], 15, -1051523);
                        e = f(e, c, h, a, b[k + 1], 21, -2054922799);
                        a = f(a, e, c, h, b[k + 8], 6, 1873313359);
                        h = f(h, a, e, c, b[k + 15], 10, -30611744);
                        c = f(c, h, a, e, b[k + 6], 15, -1560198380);
                        e = f(e, c, h, a, b[k + 13], 21, 1309151649);
                        a = f(a, e, c, h, b[k + 4], 6, -145523070);
                        h = f(h, a, e, c, b[k + 11], 10, -1120210379);
                        c = f(c, h, a, e, b[k + 2], 15, 718787259);
                        e = f(e, c, h, a, b[k + 9], 21, -343485551);
                        a = d(a, q);
                        e = d(e, p);
                        c = d(c, t);
                        h = d(h, u)
                    }
                    b = [a, e, c, h];
                    a = "";
                    for (e = 0; e < 4 * b.length; e++) a += "0123456789abcdef".charAt(b[e >> 2] >> e % 4 * 8 + 4 & 15) + "0123456789abcdef".charAt(b[e >> 2] >> e % 4 * 8 & 15);
                    return a
                }
            }
        }();
        m.HASH = function() {
            function n(b, e) {
                b = [b[0] >>> 16, b[0] & 65535, b[1] >>> 16, b[1] & 65535];
                e = [e[0] >>> 16, e[0] & 65535, e[1] >>> 16, e[1] & 65535];
                var c = [0, 0, 0, 0];
                c[3] += b[3] + e[3];
                c[2] += c[3] >>> 16;
                c[3] &= 65535;
                c[2] += b[2] + e[2];
                c[1] += c[2] >>> 16;
                c[2] &= 65535;
                c[1] += b[1] + e[1];
                c[0] += c[1] >>> 16;
                c[1] &= 65535;
                c[0] += b[0] + e[0];
                c[0] &= 65535;
                return [c[0] << 16 | c[1], c[2] << 16 | c[3]]
            }

            function l(b, e) {
                b = [b[0] >>> 16, b[0] & 65535, b[1] >>> 16, b[1] & 65535];
                e = [e[0] >>> 16, e[0] & 65535, e[1] >>> 16, e[1] & 65535];
                var c = [0, 0, 0, 0];
                c[3] += b[3] * e[3];
                c[2] += c[3] >>> 16;
                c[3] &= 65535;
                c[2] += b[2] * e[3];
                c[1] += c[2] >>> 16;
                c[2] &= 65535;
                c[2] += b[3] * e[2];
                c[1] += c[2] >>> 16;
                c[2] &= 65535;
                c[1] += b[1] * e[3];
                c[0] += c[1] >>> 16;
                c[1] &= 65535;
                c[1] += b[2] * e[2];
                c[0] += c[1] >>> 16;
                c[1] &= 65535;
                c[1] += b[3] * e[1];
                c[0] += c[1] >>> 16;
                c[1] &= 65535;
                c[0] += b[0] * e[3] + b[1] * e[2] + b[2] * e[1] + b[3] * e[0];
                c[0] &= 65535;
                return [c[0] << 16 | c[1], c[2] << 16 | c[3]]
            }

            function g(b, e) {
                e %= 64;
                if (32 === e) return [b[1], b[0]];
                if (32 > e) return [b[0] << e | b[1] >>> 32 - e, b[1] << e | b[0] >>> 32 - e];
                e -= 32;
                return [b[1] << e | b[0] >>> 32 - e, b[0] << e | b[1] >>> 32 - e]
            }

            function f(b, e) {
                e %= 64;
                return 0 === e ? b : 32 > e ? [b[0] << e | b[1] >>> 32 - e, b[1] << e] : [b[1] << e - 32, 0]
            }

            function d(b, e) {
                return [b[0] ^ e[0], b[1] ^ e[1]]
            }

            function a(b) {
                b = d(b, [0, b[0] >>> 1]);
                b = l(b, [4283543511, 3981806797]);
                b = d(b, [0, b[0] >>> 1]);
                b = l(b, [3301882366, 444984403]);
                return b = d(b, [0, b[0] >>> 1])
            }
            return {
                hash128: function(b, e) {
                    b = b || "";
                    var c = e || 0;
                    e = b.length % 16;
                    var h = b.length - e,
                        k = [0, c];
                    c = [0, c];
                    for (var q, p, t = [2277735313, 289559509], u = [1291169091, 658871167], r = 0; r < h; r += 16) q = [b.charCodeAt(r + 4) & 255 | (b.charCodeAt(r + 5) & 255) << 8 | (b.charCodeAt(r + 6) & 255) << 16 | (b.charCodeAt(r + 7) & 255) << 24, b.charCodeAt(r) & 255 | (b.charCodeAt(r + 1) & 255) << 8 | (b.charCodeAt(r + 2) & 255) << 16 | (b.charCodeAt(r + 3) & 255) << 24], p = [b.charCodeAt(r + 12) & 255 | (b.charCodeAt(r + 13) & 255) << 8 | (b.charCodeAt(r + 14) & 255) << 16 | (b.charCodeAt(r + 15) & 255) << 24, b.charCodeAt(r + 8) & 255 | (b.charCodeAt(r + 9) & 255) << 8 | (b.charCodeAt(r + 10) & 255) << 16 | (b.charCodeAt(r + 11) & 255) << 24], q = l(q, t), q = g(q, 31), q = l(q, u), k = d(k, q), k = g(k, 27), k = n(k, c), k = n(l(k, [0, 5]), [0, 1390208809]), p = l(p, u), p = g(p, 33), p = l(p, t), c = d(c, p), c = g(c, 31), c = n(c, k), c = n(l(c, [0, 5]), [0, 944331445]);
                    q = [0, 0];
                    p = [0, 0];
                    switch (e) {
                        case 15:
                            p = d(p, f([0, b.charCodeAt(r + 14)], 48));
                        case 14:
                            p = d(p, f([0, b.charCodeAt(r + 13)], 40));
                        case 13:
                            p = d(p, f([0, b.charCodeAt(r + 12)], 32));
                        case 12:
                            p = d(p, f([0, b.charCodeAt(r + 11)], 24));
                        case 11:
                            p = d(p, f([0, b.charCodeAt(r + 10)], 16));
                        case 10:
                            p = d(p, f([0, b.charCodeAt(r + 9)], 8));
                        case 9:
                            p = d(p, [0, b.charCodeAt(r + 8)]), p = l(p, u), p = g(p, 33), p = l(p, t), c = d(c, p);
                        case 8:
                            q = d(q, f([0, b.charCodeAt(r + 7)], 56));
                        case 7:
                            q = d(q, f([0, b.charCodeAt(r + 6)], 48));
                        case 6:
                            q = d(q, f([0, b.charCodeAt(r + 5)], 40));
                        case 5:
                            q = d(q, f([0, b.charCodeAt(r + 4)], 32));
                        case 4:
                            q = d(q, f([0, b.charCodeAt(r + 3)], 24));
                        case 3:
                            q = d(q, f([0, b.charCodeAt(r + 2)], 16));
                        case 2:
                            q = d(q, f([0, b.charCodeAt(r + 1)], 8));
                        case 1:
                            q = d(q, [0, b.charCodeAt(r)]), q = l(q, t), q = g(q, 31), q = l(q, u), k = d(k, q)
                    }
                    k = d(k, [0, b.length]);
                    c = d(c, [0, b.length]);
                    k = n(k, c);
                    c = n(c, k);
                    k = a(k);
                    c = a(c);
                    k = n(k, c);
                    c = n(c, k);
                    return ("00000000" + (k[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (k[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (c[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (c[1] >>> 0).toString(16)).slice(-8)
                }
            }
        }();
        m.TDEncrypt = function() {
            return function(n) {
                n = JSON.stringify(n);
                n = encodeURIComponent(n);
                var l = "",
                    g = 0;
                do {
                    var f = n.charCodeAt(g++);
                    var d = n.charCodeAt(g++);
                    var a = n.charCodeAt(g++);
                    var b = f >> 2;
                    f = (f & 3) << 4 | d >> 4;
                    var e = (d & 15) << 2 | a >> 6;
                    var c = a & 63;
                    isNaN(d) ? e = c = 64 : isNaN(a) && (c = 64);
                    l = l + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(b) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(f) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(e) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(c)
                } while (g < n.length);
                return l + "/"
            }
        }();
        return m
    }(jdtRiskEncryptUtil || {}),
    JdtRiskFingerPrint = function(m) {
        function n() {
            var f = document.createElement("canvas");
            return !(!f.getContext || !f.getContext("2d"))
        }
        m = m || {};
        var l = "",
            g = function() {
                var f = {};
                f.nativeForEach = Array.prototype.forEach;
                f.nativeMap = Array.prototype.map;
                f.each = function(d, a, b) {
                    if (null !== d)
                        if (f.nativeForEach && d.forEach === f.nativeForEach) d.forEach(a, b);
                        else if (d.length === +d.length)
                        for (var e = 0, c = d.length; e < c && a.call(b, d[e], e, d) !== {}; e++);
                    else
                        for (e in d)
                            if (d.hasOwnProperty(e) && a.call(b, d[e], e, d) === {}) break
                };
                f.map = function(d, a, b) {
                    var e = [];
                    if (null == d) return e;
                    if (f.nativeMap && d.map === f.nativeMap) return d.map(a, b);
                    f.each(d, function(c, h, k) {
                        e[e.length] = a.call(b, c, h, k)
                    });
                    return e
                };
                f.execute = function(d) {
                    try {
                        if (this[d]) {
                            var a = (new Date).getTime(),
                                b = this[d]();
                            jdtRiskContext.d && console.log("FP function : [" + d + "] Cost time :", (new Date).getTime() - a);
                            return b
                        }
                    } catch (e) {
                        return jdtRiskContext.d && console.log("fp collect error", e), ""
                    }
                };
                f.getLanguage = function() {
                    return navigator.language
                };
                f.getUserAgent = function() {
                    var d = navigator.userAgent.toLowerCase();
                    d.indexOf("jdapp") && (d = d.substring(0, 90));
                    return d
                };
                f.getOsInfo = function() {
                    var d = f.getUserAgent(),
                        a = "NA",
                        b = "NA";
                    try {
                        -1 != d.indexOf("win") && -1 != d.indexOf("95") && (a = "windows", b = "95"), -1 != d.indexOf("win") && -1 != d.indexOf("98") && (a = "windows", b = "98"), -1 != d.indexOf("win 9x") && -1 != d.indexOf("4.90") && (a = "windows", b = "me"), -1 != d.indexOf("win") && -1 != d.indexOf("nt 5.0") && (a = "windows", b = "2000"), -1 != d.indexOf("win") && -1 != d.indexOf("nt") && (a = "windows", b = "NT"), -1 != d.indexOf("win") && -1 != d.indexOf("nt 5.1") && (a = "windows", b = "xp"), -1 != d.indexOf("win") && -1 != d.indexOf("32") && (a = "windows", b = "32"), -1 != d.indexOf("win") && -1 != d.indexOf("nt 5.1") && (a = "windows", b = "7"), -1 != d.indexOf("win") && -1 != d.indexOf("6.0") && (a = "windows", b = "8"), -1 == d.indexOf("win") || -1 == d.indexOf("nt 6.0") && -1 == d.indexOf("nt 6.1") || (a = "windows", b = "9"), -1 != d.indexOf("win") && -1 != d.indexOf("nt 6.2") && (a = "windows", b = "10"), -1 != d.indexOf("linux") && (a = "linux"), -1 != d.indexOf("unix") && (a = "unix"), -1 != d.indexOf("sun") && -1 != d.indexOf("os") && (a = "sun os"), -1 != d.indexOf("ibm") && -1 != d.indexOf("os") && (a = "ibm os/2"), -1 != d.indexOf("mac") && -1 != d.indexOf("pc") && (a = "mac"), -1 != d.indexOf("aix") && (a = "aix"), -1 != d.indexOf("powerpc") && (a = "powerPC"), -1 != d.indexOf("hpux") && (a = "hpux"), -1 != d.indexOf("netbsd") && (a = "NetBSD"), -1 != d.indexOf("bsd") && (a = "BSD"), -1 != d.indexOf("osf1") && (a = "OSF1"), -1 != d.indexOf("irix") && (a = "IRIX", b = ""), -1 != d.indexOf("freebsd") && (a = "FreeBSD"), -1 != d.indexOf("symbianos") && (a = "SymbianOS", b = d.substring(d.indexOf("SymbianOS/") + 10, 3))
                    } catch (e) {}
                    return {
                        os: a,
                        osVersion: b
                    }
                };
                f.getBrowserInfo = function() {
                    var d = f.getUserAgent(),
                        a = "NA",
                        b = "NA";
                    try {
                        -1 != d.indexOf("msie") && (a = "ie", b = d.substring(d.indexOf("msie ") + 5), b.indexOf(";") && (b = b.substring(0, b.indexOf(";")))); - 1 != d.indexOf("firefox") && (a = "Firefox", b = d.substring(d.indexOf("firefox/") + 8)); - 1 != d.indexOf("opera") && (a = "Opera", b = d.substring(d.indexOf("opera/") + 6, 4)); - 1 != d.indexOf("safari") && (a = "safari", b = d.substring(d.indexOf("safari/") + 7)); - 1 != d.indexOf("chrome") && (a = "chrome", b = d.substring(d.indexOf("chrome/") + 7), b.indexOf(" ") && (b = b.substring(0, b.indexOf(" ")))); - 1 != d.indexOf("navigator") && (a = "navigator", b = d.substring(d.indexOf("navigator/") + 10)); - 1 != d.indexOf("applewebkit") && (a = "applewebkit_chrome", b = d.substring(d.indexOf("applewebkit/") + 12), b.indexOf(" ") && (b = b.substring(0, b.indexOf(" ")))); - 1 != d.indexOf("sogoumobilebrowser") && (a = "\u641c\u72d7\u624b\u673a\u6d4f\u89c8\u5668");
                        if (-1 != d.indexOf("ucbrowser") || -1 != d.indexOf("ucweb")) a = "UC\u6d4f\u89c8\u5668";
                        if (-1 != d.indexOf("qqbrowser") || -1 != d.indexOf("tencenttraveler")) a = "QQ\u6d4f\u89c8\u5668"; - 1 != d.indexOf("metasr") && (a = "\u641c\u72d7\u6d4f\u89c8\u5668"); - 1 != d.indexOf("360se") && (a = "360\u6d4f\u89c8\u5668"); - 1 != d.indexOf("the world") && (a = "\u4e16\u754c\u4e4b\u7a97\u6d4f\u89c8\u5668"); - 1 != d.indexOf("maxthon") && (a = "\u9068\u6e38\u6d4f\u89c8\u5668")
                    } catch (e) {}
                    return {
                        browser: a,
                        browserVersion: b
                    }
                };
                f.getColorDepth = function() {
                    return screen.colorDepth
                };
                f.getScreenResolution = function() {
                    return [screen.height, screen.width].join("x")
                };
                f.getTimezoneOffset = function() {
                    return (new Date).getTimezoneOffset()
                };
                f.getSessionStorageSupport = function() {
                    try {
                        return !!window.sessionStorage
                    } catch (d) {
                        return !0
                    }
                };
                f.getLocalStorageSupport = function() {
                    try {
                        return !!window.localStorage
                    } catch (d) {
                        return !0
                    }
                };
                f.getIndexedDBSupport = function() {
                    return !!window.indexedDB
                };
                f.getAddBehaviorSupport = function() {
                    return document.body && !!document.body.addBehavior
                };
                f.getOpenDatabaseSupport = function() {
                    return !!window.openDatabase
                };
                f.getNavigatorCpuClass = function() {
                    return navigator.cpuClass ? navigator.cpuClass : "NA"
                };
                f.getNavigatorPlatform = function() {
                    return navigator.platform ? navigator.platform : "NA"
                };
                f.getHardwareConcurrency = function() {
                    return navigator.hardwareConcurrency ? navigator.hardwareConcurrency : "NA"
                };
                f.getDoNotTrack = function() {
                    return navigator.doNotTrack ? navigator.doNotTrack : "NA"
                };
                f.getIEPluginsString = function() {
                    return window.ActiveXObject ? f.map("AcroPDF.PDF;Adodb.Stream;AgControl.AgControl;DevalVRXCtrl.DevalVRXCtrl.1;MacromediaFlashPaper.MacromediaFlashPaper;Msxml2.DOMDocument;Msxml2.XMLHTTP;PDF.PdfCtrl;QuickTime.QuickTime;QuickTimeCheckObject.QuickTimeCheck.1;RealPlayer;RealPlayer.RealPlayer(tm) ActiveX Control (32-bit);RealVideo.RealVideo(tm) ActiveX Control (32-bit);Scripting.Dictionary;SWCtl.SWCtl;Shell.UIHelper;ShockwaveFlash.ShockwaveFlash;Skype.Detection;TDCCtl.TDCCtl;WMPlayer.OCX;rmocx.RealPlayer G2 Control;rmocx.RealPlayer G2 Control.1".split(";"), function(d) {
                        try {
                            return new ActiveXObject(d), d
                        } catch (a) {
                            return null
                        }
                    }).join(";") : ""
                };
                f.getRegularPluginsString = function() {
                    return f.map(navigator.plugins, function(d) {
                        var a = f.map(d, function(b) {
                            return [b.type, b.suffixes].join("~")
                        }).join(",");
                        return [d.name, d.description, a].join("::")
                    }, this).join(";")
                };
                f.getCanvasFp = function() {
                    var d = navigator.userAgent.toLowerCase();
                    if ((0 < d.indexOf("jdjr-app") || 0 <= d.indexOf("jdapp")) && (0 < d.indexOf("iphone") || 0 < d.indexOf("ipad"))) return null;
                    d = document.createElement("canvas");
                    var a = d.getContext("2d");
                    a.fillStyle = "red";
                    a.fillRect(30, 10, 200, 100);
                    a.strokeStyle = "#1a3bc1";
                    a.lineWidth = 6;
                    a.lineCap = "round";
                    a.arc(50, 50, 20, 0, Math.PI, !1);
                    a.stroke();
                    a.fillStyle = "#42e1a2";
                    a.font = "15.4px 'Arial'";
                    a.textBaseline = "alphabetic";
                    a.fillText("PR flacks quiz gym: TV DJ box when? \u2620", 15, 60);
                    a.shadowOffsetX = 1;
                    a.shadowOffsetY = 2;
                    a.shadowColor = "white";
                    a.fillStyle = "rgba(0, 0, 200, 0.5)";
                    a.font = "60px 'Not a real font'";
                    a.fillText("No\u9a97", 40, 80);
                    return d.toDataURL()
                };
                f.getWebglFp = function() {
                    var d = navigator.userAgent;
                    d = d.toLowerCase();
                    if ((0 < d.indexOf("jdjr-app") || 0 <= d.indexOf("jdapp")) && (0 < d.indexOf("iphone") || 0 < d.indexOf("ipad"))) return null;
                    d = function(p) {
                        a.clearColor(0, 0, 0, 1);
                        a.enable(a.DEPTH_TEST);
                        a.depthFunc(a.LEQUAL);
                        a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT);
                        return "[" + p[0] + ", " + p[1] + "]"
                    };
                    var a = f.getWebglCanvas();
                    if (!a) return null;
                    var b = [],
                        e = a.createBuffer();
                    a.bindBuffer(a.ARRAY_BUFFER, e);
                    var c = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .732134444, 0]);
                    a.bufferData(a.ARRAY_BUFFER, c, a.STATIC_DRAW);
                    e.itemSize = 3;
                    e.numItems = 3;
                    c = a.createProgram();
                    var h = a.createShader(a.VERTEX_SHADER);
                    a.shaderSource(h, "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}");
                    a.compileShader(h);
                    var k = a.createShader(a.FRAGMENT_SHADER);
                    a.shaderSource(k, "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}");
                    a.compileShader(k);
                    a.attachShader(c, h);
                    a.attachShader(c, k);
                    a.linkProgram(c);
                    a.useProgram(c);
                    c.vertexPosAttrib = a.getAttribLocation(c, "attrVertex");
                    c.offsetUniform = a.getUniformLocation(c, "uniformOffset");
                    a.enableVertexAttribArray(c.vertexPosArray);
                    a.vertexAttribPointer(c.vertexPosAttrib, e.itemSize, a.FLOAT, !1, 0, 0);
                    a.uniform2f(c.offsetUniform, 1, 1);
                    a.drawArrays(a.TRIANGLE_STRIP, 0, e.numItems);
                    null != a.canvas && b.push(a.canvas.toDataURL());
                    b.push("extensions:" + a.getSupportedExtensions().join(";"));
                    b.push("extensions:" + a.getSupportedExtensions().join(";"));
                    b.push("w1" + d(a.getParameter(a.ALIASED_LINE_WIDTH_RANGE)));
                    b.push("w2" + d(a.getParameter(a.ALIASED_POINT_SIZE_RANGE)));
                    b.push("w3" + a.getParameter(a.ALPHA_BITS));
                    b.push("w4" + (a.getContextAttributes().antialias ? "yes" : "no"));
                    b.push("w5" + a.getParameter(a.BLUE_BITS));
                    b.push("w6" + a.getParameter(a.DEPTH_BITS));
                    b.push("w7" + a.getParameter(a.GREEN_BITS));
                    b.push("w8" + function(p) {
                        var t, u = p.getExtension("EXT_texture_filter_anisotropic") || p.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || p.getExtension("MOZ_EXT_texture_filter_anisotropic");
                        return u ? (t = p.getParameter(u.MAX_TEXTURE_MAX_ANISOTROPY_EXT), 0 === t && (t = 2), t) : null
                    }(a));
                    b.push("w9" + a.getParameter(a.MAX_COMBINED_TEXTURE_IMAGE_UNITS));
                    b.push("w10" + a.getParameter(a.MAX_CUBE_MAP_TEXTURE_SIZE));
                    b.push("w11" + a.getParameter(a.MAX_FRAGMENT_UNIFORM_VECTORS));
                    b.push("w12" + a.getParameter(a.MAX_RENDERBUFFER_SIZE));
                    b.push("w13" + a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS));
                    b.push("w14" + a.getParameter(a.MAX_TEXTURE_SIZE));
                    b.push("w15" + a.getParameter(a.MAX_VARYING_VECTORS));
                    b.push("w16" + a.getParameter(a.MAX_VERTEX_ATTRIBS));
                    b.push("w17" + a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
                    b.push("w18" + a.getParameter(a.MAX_VERTEX_UNIFORM_VECTORS));
                    b.push("w19" + d(a.getParameter(a.MAX_VIEWPORT_DIMS)));
                    b.push("w20" + a.getParameter(a.RED_BITS));
                    b.push("w21" + a.getParameter(a.RENDERER));
                    b.push("w22" + a.getParameter(a.SHADING_LANGUAGE_VERSION));
                    b.push("w23" + a.getParameter(a.STENCIL_BITS));
                    b.push("w24" + a.getParameter(a.VENDOR));
                    b.push("w25" + a.getParameter(a.VERSION));
                    try {
                        var q = a.getExtension("WEBGL_debug_renderer_info");
                        q && (b.push("wuv:" + a.getParameter(q.UNMASKED_VENDOR_WEBGL)), b.push("wur:" + a.getParameter(q.UNMASKED_RENDERER_WEBGL)))
                    } catch (p) {}
                    return b.join("\u00a7")
                };
                f.getWebglCanvas = function() {
                    var d = document.createElement("canvas"),
                        a = null;
                    try {
                        var b = navigator.userAgent;
                        b = b.toLowerCase();
                        (0 < b.indexOf("jdjr-app") || 0 <= b.indexOf("jdapp")) && (0 < b.indexOf("iphone") || 0 < b.indexOf("ipad")) || (a = d.getContext("webgl") || d.getContext("experimental-webgl"))
                    } catch (e) {}
                    a || (a = null);
                    return a
                };
                return f
            }();
        return {
            getFp: function(f) {
                l = l || jdtRiskStorageManager.load(collectConfig.store[_riskFpMode].fpKey, !1);
                var d = 1 * jdtLocalStorageManager.get(collectConfig.store[_riskFpMode].fpTsKey);
                if (!(l && 32 == l.length && (d || 0) >= (new Date).getTime())) {
                    var a = m;
                    a = a || {};
                    d = [];
                    var b = g.execute("getBrowserInfo"),
                        e = g.execute("getOsInfo");
                    if (!a[collectConfig.fp.userAgent]) {
                        var c = g.execute("getUserAgent"),
                            h = 1 * b.browserVersion;
                        "ie" == b.browser && 7 <= h ? d.push(c) : (c = navigator.userAgent, 0 <= c.indexOf("jdapp") && (c = c.substring(0, 90)), d.push(c))
                    }
                    a[collectConfig.fp.language] || d.push(g.execute("getLanguage"));
                    d.push(b.browser);
                    d.push(b.browserVersion);
                    d.push(e.os);
                    d.push(e.osVersion);
                    a[collectConfig.fp.colorDepth] || d.push(g.execute("getColorDepth"));
                    a[collectConfig.fp.screenResolution] || d.push(g.execute("getScreenResolution"));
                    a[collectConfig.fp.timezoneOffset] || d.push(g.execute("getTimezoneOffset"));
                    a[collectConfig.fp.sessionStorage] || g.execute("getSessionStorageSupport") && d.push("sessionStorageKey");
                    a[collectConfig.fp.localStorage] || g.execute("getLocalStorageSupport") && d.push("localStorageKey");
                    a[collectConfig.fp.indexedDb] || g.execute("getIndexedDBSupport") && d.push("indexedDbKey");
                    a[collectConfig.fp.addBehavior] || g.execute("getAddBehaviorSupport") && d.push("addBehaviorKey");
                    a[collectConfig.fp.openDatabase] || g.execute("getOpenDatabaseSupport") && d.push("openDatabase");
                    a[collectConfig.fp.cpuClass] || d.push(g.execute("getNavigatorCpuClass"));
                    a[collectConfig.fp.platform] || d.push(g.execute("getNavigatorPlatform"));
                    a[collectConfig.fp.hardwareConcurrency] || d.push(g.execute("getHardwareConcurrency"));
                    a[collectConfig.fp.doNotTrack] || d.push(g.execute("getDoNotTrack"));
                    a[collectConfig.fp.plugins] || ("Microsoft Internet Explorer" === navigator.appName || "Netscape" === navigator.appName && /Trident/.test(navigator.userAgent) ? d.push(g.execute("getIEPluginsString")) : d.push(g.execute("getRegularPluginsString")));
                    !a[collectConfig.fp.canvas] && n() && (b = g.execute("getCanvasFp"), jdtRiskContext.canvas_fp_md5 = jdtRiskEncryptUtil.MD5.hex_md5(b), jdtRiskStorageManager.store(collectConfig.store.canvasFpKey, jdtRiskContext.canvas_fp_md5, !1), d.push(b));
                    !a[collectConfig.fp.webgl] && n() && (a = g.execute("getWebglFp"), d.push(a));
                    jdtRiskContext.d && console.log("fp keys:", d);
                    l = jdtRiskEncryptUtil.HASH.hash128(d.join("~~~"), 31);
                    jdtRiskStorageManager.store(collectConfig.store[_riskFpMode].fpKey, l, !1);
                    jdtLocalStorageManager.set(collectConfig.store[_riskFpMode].fpTsKey, (new Date).getTime() + 6E5)
                }
                f(l)
            }
        }
    },
    jdtRiskCookieManager = function() {
        return {
            setCookie: function(m, n, l) {
                try {
                    if (n) {
                        "undefined" == typeof l && (l = 31104E3);
                        var g = new Date;
                        g.setTime(g.getTime() + 1E3 * l);
                        var f = "expires=" + g.toUTCString();
                        document.cookie = m + "=" + n + "; " + f + "; path=/; domain=" + jdtRiskUtil.getCurrentRootDomain()
                    }
                } catch (d) {}
            },
            getCookie: function(m) {
                try {
                    m += "=";
                    for (var n = document.cookie.split(";"), l = 0; l < n.length; l++) {
                        var g = n[l].trim();
                        if (0 == g.indexOf(m)) return g.substring(m.length, g.length)
                    }
                } catch (f) {}
                return ""
            }
        }
    }(),
    jdtLocalStorageManager = function() {
        return {
            set: function(m, n) {
                try {
                    n && window.localStorage && window.localStorage.setItem(m, n)
                } catch (l) {}
            },
            get: function(m) {
                try {
                    if (window.localStorage) return window.localStorage.getItem(m)
                } catch (n) {}
                return ""
            }
        }
    }(),
    jdtRiskStorageManager = function(m) {
        m.db = void 0;
        return {
            store: function(n, l, g, f) {
                "undefined" == typeof g && (g = !0);
                if (g) try {
                    jdtRiskCookieManager.setCookie(n, l, f)
                } catch (d) {}
                try {
                    jdtLocalStorageManager.set(n, l)
                } catch (d) {}
                try {
                    window.sessionStorage && window.sessionStorage.setItem(n, l)
                } catch (d) {}
                try {
                    window.globalStorage && window.globalStorage[".localdomain"].setItem(n, l)
                } catch (d) {}
            },
            load: function(n, l, g) {
                "undefined" == typeof l && (l = !0);
                g = g || function(d) {
                    return !!d
                };
                var f = null;
                if (l) try {
                    if (f = jdtRiskCookieManager.getCookie(n), g(f)) return f
                } catch (d) {}
                try {
                    if (f = jdtLocalStorageManager.get(n), g(f)) return f
                } catch (d) {}
                try {
                    if (window.sessionStorage && (f = window.sessionStorage[n], g(f))) return f
                } catch (d) {}
                try {
                    if (window.globalStorage && (f = window.globalStorage[".localdomain"][n], g(f))) return f
                } catch (d) {}
                return f
            }
        }
    }(jdtRiskStorageManager || {}),
    TDEnvCollector = function(m) {
        function n(g) {
            var f = {};
            f.name = g.name;
            f.filename = g.filename.toLowerCase();
            f.description = g.description;
            void 0 !== g.version && (f.version = g.version);
            f.mimeTypes = [];
            for (var d = 0; d < g.length; d++) {
                var a = g[d],
                    b = {};
                b.description = a.description;
                b.suffixes = a.suffixes;
                b.type = a.type;
                f.mimeTypes.push(b)
            }
            return f
        }
        m = m || {};
        var l = function() {
            return {
                execute: function(g) {
                    try {
                        if (this[g]) {
                            var f = (new Date).getTime(),
                                d = this[g]();
                            jdtRiskContext.d && console.log("ENV Collector function : [" + g + "] Cost time :", (new Date).getTime() - f);
                            return d
                        }
                    } catch (a) {
                        return jdtRiskContext.d && console.log("env collect error", a), ""
                    }
                },
                getColorRgb: function() {
                    var g = {};
                    try {
                        var f = document.createElement("div"),
                            d = "ActiveBorder ActiveCaption AppWorkspace Background ButtonFace ButtonHighlight ButtonShadow ButtonText CaptionText GrayText Highlight HighlightText InactiveBorder InactiveCaption InactiveCaptionText InfoBackground InfoText Menu MenuText Scrollbar ThreeDDarkShadow ThreeDFace ThreeDHighlight ThreeDLightShadow ThreeDShadow Window WindowFrame WindowText".split(" ");
                        if (window.getComputedStyle)
                            for (var a = 0; a < d.length; a++) document.body.appendChild(f), f.style.color = d[a], g[d[a]] = window.getComputedStyle(f).getPropertyValue("color"), document.body.removeChild(f)
                    } catch (b) {}
                    return g
                },
                getCanvasInfo: function() {
                    var g = {};
                    g.tdHash = jdtRiskContext.canvas_fp_md5 || jdtRiskStorageManager.load(collectConfig.store.canvasFpKey, !1);
                    var f = !1,
                        d;
                    if (d = window.WebGLRenderingContext) d = navigator.userAgent, d = d.toLowerCase(), d = (0 < d.indexOf("jdjr-app") || 0 <= d.indexOf("jdapp")) && (0 < d.indexOf("iphone") || 0 < d.indexOf("ipad")) ? !0 : !1, d = !d;
                    if (d) {
                        d = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"];
                        for (var a = [], b, e = 0; e < d.length; e++) try {
                            var c = !1;
                            (c = document.createElement("canvas").getContext(d[e], {
                                stencil: !0
                            })) && c && (b = c, a.push(d[e]))
                        } catch (k) {}
                        a.length && (f = {
                            name: a,
                            gl: b
                        })
                    }
                    if (f) {
                        b = f.gl;
                        g.contextName = f.name.join();
                        g.webglversion = b.getParameter(b.VERSION);
                        g.shadingLV = b.getParameter(b.SHADING_LANGUAGE_VERSION);
                        g.vendor = b.getParameter(b.VENDOR);
                        g.renderer = b.getParameter(b.RENDERER);
                        f = [];
                        try {
                            f = b.getSupportedExtensions(), g.extensions = f
                        } catch (k) {}
                        try {
                            var h = b.getExtension("WEBGL_debug_renderer_info");
                            h && (g.wuv = b.getParameter(h.UNMASKED_VENDOR_WEBGL), g.wur = b.getParameter(h.UNMASKED_RENDERER_WEBGL))
                        } catch (k) {}
                    }
                    return g
                },
                getBrowserMode: function() {
                    return {
                        documentMode: document.documentMode,
                        compatMode: document.compatMode
                    }
                },
                getSupportFonts: function() {
                    function g(q) {
                        var p = {};
                        c.style.fontFamily = q;
                        document.body.appendChild(c);
                        p.height = c.offsetHeight;
                        p.width = c.offsetWidth;
                        document.body.removeChild(c);
                        return p
                    }

                    function f(q) {
                        for (var p = 0; p < e.length; p++) {
                            var t = g(q + "," + b[p]),
                                u = e[p];
                            if (t.height !== u.height || t.width !== u.width) return !0
                        }
                        return !1
                    }
                    var d = [],
                        a = "Abadi MT Condensed Light;Adobe Fangsong Std;Adobe Hebrew;Adobe Ming Std;Agency FB;Arab;Arabic Typesetting;Arial Black;Batang;Bauhaus 93;Bell MT;Bitstream Vera Serif;Bodoni MT;Bookman Old Style;Braggadocio;Broadway;Calibri;Californian FB;Castellar;Casual;Centaur;Century Gothic;Chalkduster;Colonna MT;Copperplate Gothic Light;DejaVu LGC Sans Mono;Desdemona;DFKai-SB;Dotum;Engravers MT;Eras Bold ITC;Eurostile;FangSong;Forte;Franklin Gothic Heavy;French Script MT;Gabriola;Gigi;Gisha;Goudy Old Style;Gulim;GungSeo;Haettenschweiler;Harrington;Hiragino Sans GB;Impact;Informal Roman;KacstOne;Kino MT;Kozuka Gothic Pr6N;Lohit Gujarati;Loma;Lucida Bright;Lucida Fax;Magneto;Malgun Gothic;Matura MT Script Capitals;Menlo;MingLiU-ExtB;MoolBoran;MS PMincho;MS Reference Sans Serif;News Gothic MT;Niagara Solid;Nyala;Palace Script MT;Papyrus;Perpetua;Playbill;PMingLiU;Rachana;Rockwell;Sawasdee;Script MT Bold;Segoe Print;Showcard Gothic;SimHei;Snap ITC;TlwgMono;Tw Cen MT Condensed Extra Bold;Ubuntu;Umpush;Univers;Utopia;Vladimir Script;Wide Latin".split(";"),
                        b = ["monospace", "sans-serif", "serif"],
                        e = [],
                        c = document.createElement("span");
                    c.style.fontSize = "72px";
                    c.style.visibility = "hidden";
                    c.innerHTML = "mmmmmmmmmmlli";
                    for (var h = 0; h < b.length; h++) e[h] = g(b[h]);
                    for (h = 0; h < a.length; h++) {
                        var k = a[h];
                        f(k) && d.push(k)
                    }
                    return d
                },
                getFeature: function() {
                    var g = {},
                        f = [],
                        d;
                    for (d in navigator) "object" != typeof navigator[d] && (g[d] = navigator[d]), f.push(d);
                    g.enumerationOrder = f;
                    g.javaEnabled = navigator.javaEnabled();
                    try {
                        g.taintEnabled = navigator.taintEnabled()
                    } catch (a) {}
                    return g
                },
                getPlugins: function() {
                    var g = [],
                        f = "4game;AdblockPlugin;AdobeExManCCDetect;AdobeExManDetect;Alawar NPAPI utils;Aliedit Plug-In;Alipay Security Control 3;AliSSOLogin plugin;AmazonMP3DownloaderPlugin;AOL Media Playback Plugin;AppUp;ArchiCAD;AVG SiteSafety plugin;Babylon ToolBar;Battlelog Game Launcher;BitCometAgent;Bitdefender QuickScan;BlueStacks Install Detector;CatalinaGroup Update;Citrix ICA Client;Citrix online plug-in;Citrix Receiver Plug-in;Coowon Update;DealPlyLive Update;Default Browser Helper;DivX Browser Plug-In;DivX Plus Web Player;DivX VOD Helper Plug-in;doubleTwist Web Plugin;Downloaders plugin;downloadUpdater;eMusicPlugin DLM6;ESN Launch Mozilla Plugin;ESN Sonar API;Exif Everywhere;Facebook Plugin;File Downloader Plug-in;FileLab plugin;FlyOrDie Games Plugin;Folx 3 Browser Plugin;FUZEShare;GDL Object Web Plug-in 16.00;GFACE Plugin;Ginger;Gnome Shell Integration;Google Earth Plugin;Google Earth Plug-in;Google Gears 0.5.33.0;Google Talk Effects Plugin;Google Update;Harmony Firefox Plugin;Harmony Plug-In;Heroes & Generals live;HPDetect;Html5 location provider;IE Tab plugin;iGetterScriptablePlugin;iMesh plugin;Kaspersky Password Manager;LastPass;LogMeIn Plugin 1.0.0.935;LogMeIn Plugin 1.0.0.961;Ma-Config.com plugin;Microsoft Office 2013;MinibarPlugin;Native Client;Nitro PDF Plug-In;Nokia Suite Enabler Plugin;Norton Identity Safe;npAPI Plugin;NPLastPass;NPPlayerShell;npTongbuAddin;NyxLauncher;Octoshape Streaming Services;Online Storage plug-in;Orbit Downloader;Pando Web Plugin;Parom.TV player plugin;PDF integrado do WebKit;PDF-XChange Viewer;PhotoCenterPlugin1.1.2.2;Picasa;PlayOn Plug-in;QQ2013 Firefox Plugin;QQDownload Plugin;QQMiniDL Plugin;QQMusic;RealDownloader Plugin;Roblox Launcher Plugin;RockMelt Update;Safer Update;SafeSearch;Scripting.Dictionary;SefClient Plugin;Shell.UIHelper;Silverlight Plug-In;Simple Pass;Skype Web Plugin;SumatraPDF Browser Plugin;Symantec PKI Client;Tencent FTN plug-in;Thunder DapCtrl NPAPI Plugin;TorchHelper;Unity Player;Uplay PC;VDownloader;Veetle TV Core;VLC Multimedia Plugin;Web Components;WebKit-integrierte PDF;WEBZEN Browser Extension;Wolfram Mathematica;WordCaptureX;WPI Detector 1.4;Yandex Media Plugin;Yandex PDF Viewer;YouTube Plug-in;zako".split(";"),
                        d = navigator.userAgent.toLowerCase(),
                        a;
                    if (a = d.match(/rv:([\d.]+)\) like gecko/)) var b = a[1];
                    if (a = d.match(/msie ([\d.]+)/)) b = a[1];
                    if (b)
                        for (d = "AcroPDF.PDF;Adodb.Stream;AgControl.AgControl;DevalVRXCtrl.DevalVRXCtrl.1;MacromediaFlashPaper.MacromediaFlashPaper;Msxml2.DOMDocument;Msxml2.XMLHTTP;PDF.PdfCtrl;QuickTime.QuickTime;QuickTimeCheckObject.QuickTimeCheck.1;RealPlayer;RealPlayer.RealPlayer(tm) ActiveX Control (32-bit);RealVideo.RealVideo(tm) ActiveX Control (32-bit);rmocx.RealPlayer G2 Control;Scripting.Dictionary;Shell.UIHelper;ShockwaveFlash.ShockwaveFlash;SWCtl.SWCtl;TDCCtl.TDCCtl;WMPlayer.OCX".split(";"), b = 0; b < d.length; b++) {
                            var e = d[b];
                            try {
                                var c = new ActiveXObject(e);
                                a = {};
                                a.name = e;
                                try {
                                    a.version = c.GetVariable("$version")
                                } catch (h) {}
                                try {
                                    a.version = c.GetVersions()
                                } catch (h) {}
                                a.version && 0 < a.version.length || (a.version = "");
                                g.push(a)
                            } catch (h) {}
                        } else {
                            d = navigator.plugins;
                            a = {};
                            for (b = 0; b < d.length; b++) e = d[b], a[e.name] = 1, g.push(n(e));
                            for (b = 0; b < f.length; b++) c = f[b], a[c] || (e = d[c], e && g.push(n(e)))
                        }
                    return g
                },
                getScreenInfo: function() {
                    for (var g = {}, f = "availHeight availWidth colorDepth bufferDepth deviceXDPI deviceYDPI height width logicalXDPI logicalYDPI pixelDepth updateInterval".split(" "), d = 0; f.length > d; d++) {
                        var a = f[d];
                        void 0 !== screen[a] && (g[a] = screen[a])
                    }
                    return g
                },
                getPositionInfo: function() {
                    for (var g = {}, f = ["devicePixelRatio", "screenTop", "screenLeft"], d = 0; f.length > d; d++) {
                        var a = f[d];
                        void 0 !== window[a] && (g[a] = window[a])
                    }
                    return g
                },
                getStoreCheck: function() {
                    var g = {};
                    try {
                        g.cookie = navigator.cookieEnabled, g.localStorage = !!window.localStorage, g.sessionStorage = !!window.sessionStorage, g.globalStorage = !!window.globalStorage, g.indexedDB = !!window.indexedDB
                    } catch (f) {}
                    return g
                }
            }
        }();
        return {
            getEncryptedCollectInfo: function() {
                var g = m;
                g = g || {};
                var f = {},
                    d = new Date;
                f.ts = {};
                f.ts.deviceTime = d.getTime();
                g[collectConfig.env.canvas] || (f.ca = l.execute("getCanvasInfo") || {});
                g[collectConfig.env.browserMode] || (f.m = l.execute("getBrowserMode") || {});
                g[collectConfig.env.fonts] || (f.fo = l.execute("getSupportFonts") || []);
                g[collectConfig.env.feature] || (f.n = l.execute("getFeature") || {});
                g[collectConfig.env.plugins] || (f.p = l.execute("getPlugins") || []);
                g[collectConfig.env.position] || (f.w = l.execute("getPositionInfo") || {});
                g[collectConfig.env.screen] || (f.s = l.execute("getScreenInfo") || {});
                g[collectConfig.env.color] || (f.sc = l.execute("getColorRgb") || {});
                g[collectConfig.env.storeCheck] || (f.ss = l.execute("getStoreCheck") || {});
                f.tz = d.getTimezoneOffset();
                f.lil = "";
                f.wil = "";
                f.ts.deviceEndTime = (new Date).getTime();
                jdtRiskContext.d && console.log("collect env data :", f);
                return jdtRiskEncryptUtil.TDEncrypt(f)
            }
        }
    },
    SdkCollector = function(m) {
        function n(k, q) {
            window._bioDeviceSdkTokenCb = function(t) {
                jdtRiskContext.d && console.log("JD JS Bridge Result :", t);
                try {
                    var u = "object" == typeof t ? t : JSON.parse(t),
                        r = u && "0" == u.status,
                        v = r ? u.data.token : "";
                    q(r, "FINISHED", v)
                } catch (x) {
                    jdtRiskContext.d && console.log("JD JS SDK Callback ERROR", x);
                    a: {
                        try {
                            if (t) {
                                var w = (t + "").match(/"token":"(.*?)"/);
                                if (w && 1 < w.length) {
                                    v = w[1];
                                    break a
                                }
                            }
                        } catch (y) {}
                        v = ""
                    }
                    q(!!v, "FROM REGX", v)
                }
            };
            try {
                window.top == window.self || window.top._bioDeviceSdkTokenCb || (window.top._bioDeviceSdkTokenCb = window._bioDeviceSdkTokenCb)
            } catch (t) {}
            try {
                var p = JSON.stringify({
                    businessType: "bridgeBiologicalProbe",
                    callBackName: "_bioDeviceSdkTokenCb",
                    params: {
                        pin: "",
                        jsonData: {
                            type: h,
                            operation: k ? 5 : 1,
                            data: {
                                bizId: b,
                                duraTime: e,
                                interval: c
                            },
                            biometricData: {
                                bizId: b,
                                duraTime: e,
                                interval: c
                            }
                        }
                    }
                });
                navigator.userAgent.match(/supportJDSHWK/i) || 1 == window._is_jdsh_wkwebview ? window.webkit.messageHandlers.JDAppUnite.postMessage({
                    method: "notifyMessageToNative",
                    params: p
                }) : window.JDAppUnite && window.JDAppUnite.notifyMessageToNative(p)
            } catch (t) {
                jdtRiskContext.d && console.log("JD SDK call ERROR", t), q(!1, "JS BRIDGE CALL ERROR")
            }
        }

        function l(k, q) {
            try {
                "undefined" == typeof JrBridge || !JrBridge || !JrBridge._version || 0 > jdtRiskUtil.compareVersion(JrBridge._version, "2.0.0") ? q(!1, "JR BRIDGE NOT SUPPORT") : JrBridge.callNative({
                    type: h,
                    operation: k ? 5 : 1,
                    biometricData: {
                        bizId: b,
                        duraTime: e,
                        interval: c
                    }
                }, function(p) {
                    jdtRiskContext.d && console.log("JR JS Bridge Result :", p);
                    try {
                        var t = ("object" == typeof p ? p : JSON.parse(p)).token;
                        q(!!t, "FINISHED", t)
                    } catch (u) {
                        jdtRiskContext.d && console.log("JR JS SDK Callback ERROR", u), q(!1, "JR CALLBACK ERROR")
                    }
                })
            } catch (p) {
                jdtRiskContext.d && console.log("JR SDK call ERROR", p), q(!1, "JR BRIDGE CALL ERROR")
            }
        }

        function g(k) {
            try {
                var q = jdtRiskStorageManager.load(collectConfig.store.sdkTokenKey, !1);
                if (!q) return !1;
                var p = JSON.parse(q),
                    t = (new Date).getTime();
                if (p && p.tk && p.t) {
                    if (12E5 >= t - p.t && p.tk.startsWith("jdd")) return k(!0, "FROM LOCAL CACHE", p.tk, !0), !0;
                    jdtRiskContext.deviceInfo.sdkToken = p.tk
                }
            } catch (u) {}
            return !1
        }
        var f = !1,
            d = !1,
            a = !1,
            b = m.sdkBizId || "jsDefault",
            e = m.duraTime || 2,
            c = m.interval || 50,
            h = m.type || "42";
        (function() {
            var k = navigator.userAgent.toLowerCase();
            a = k.match(/(iphone|ipad|ipod)/i);
            !a && (-1 < k.indexOf("android") || k.indexOf("adr"));
            f = -1 < k.indexOf("jdapp");
            d = -1 < k.indexOf("jdjr")
        })();
        return {
            getSdkToken: function(k) {
                if (!g(k))
                    if (f) {
                        jdtRiskContext.deviceInfo.clientVersion = navigator.userAgent.split(";")[2];
                        var q = 0 < jdtRiskUtil.compareVersion(jdtRiskContext.deviceInfo.clientVersion, "7.0.2");
                        q ? n(!0, function(p, t, u) {
                            p && u && u.startsWith("jdd") ? k(p, t, u) : n(!1, function(r, v, w) {
                                k(r, v, w)
                            })
                        }) : k(!1, "JD APP VERSION NOT SUPPORT")
                    } else d ? (jdtRiskContext.deviceInfo.clientVersion = navigator.userAgent.match(RegExp("clientVersion=([^&]*)(&|$)"))[1], (q = 0 < jdtRiskUtil.compareVersion(jdtRiskContext.deviceInfo.clientVersion, "4.6.0")) ? l(!0, function(p, t, u) {
                        p && u && u.startsWith("jdd") ? k(p, t, u) : l(!1, function(r, v, w) {
                            k(r, v, w)
                        })
                    }) : k(!1, "JR APP VERSION NOT SUPPORT")) : window.JDTRiskBridgeUtil ? window.JDTRiskBridgeUtil.callAppBridge(navigator.userAgent, {
                        bizId: b
                    }, function(p, t, u) {
                        p ? k(!0, t, u.sdkToken) : k(!1, t)
                    }) : k(!1, "UNSUPPORTED APP")
            }
        }
    };

function clearCookie() {
    try {
        for (var m = ["CA1AN5BV0CA8DS2E3F", "FFA9D23F7A4B3CSS", "BATQW722QTLYVCRD"], n = 0, l = m.length; n < l; n++) {
            var g = m[n],
                f = jdtRiskCookieManager.getCookie(g);
            f && jdtRiskCookieManager.setCookie(g, f, 0)
        }
    } catch (d) {}
}
clearCookie();

function doCollectFp() {
    try {
        jdtRiskContext.deviceInfo.jsToken = jdtRiskStorageManager.load(collectConfig.store[_riskFpMode].jsTokenKey);
        (new JdtRiskFingerPrint(collectConfig.getFpExcludeOptions(_riskFpMode))).getFp(function(b) {
            b && (jdtRiskContext.deviceInfo.fp = b)
        });
        var m = (new TDEnvCollector(collectConfig.getEnvExcludeOptions(_riskFpMode))).getEncryptedCollectInfo(),
            n = "string" === typeof orderId ? orderId : "",
            l = "undefined" !== typeof jdfp_pinenp_ext && jdfp_pinenp_ext ? 2 : 1,
            g = {
                pin: jdtRiskUtil.obtainPin(l),
                oid: n,
                bizId: jdtRiskUtil.getBizId(),
                fc: jdtRiskStorageManager.load(collectConfig.store[_riskFpMode].eidKey),
                mode: _riskFpMode,
                p: "https:" == document.location.protocol ? "s" : "h",
                fp: jdtRiskContext.deviceInfo.fp,
                ctype: l,
                v: jdtRiskContext.version,
                f: "3",
                o: jdtRiskUtil.getCurrentPageUrl(),
                qs: jdtRiskUtil.getUrlQueryStr(),
                jsTk: jdtRiskContext.deviceInfo.jsToken
            };
        try {
            if ("undefined" != typeof gia_fp_qd_uuid && 0 <= gia_fp_qd_uuid.length) g.qi = gia_fp_qd_uuid;
            else {
                var f = jdtRiskCookieManager.getCookie("qd_uid");
                g.qi = void 0 == f ? "" : f
            }
        } catch (b) {}
        jdtRiskContext.deviceInfo.sdkToken && (g.stk = jdtRiskContext.deviceInfo.sdkToken, jdtRiskContext.isRpTok = !0);
        var d = jdtRiskEncryptUtil.TDEncrypt(g);
        m = "d=" + m;
        var a = jdtRiskUtil.getCurrentPageProtocol() + jdtRiskUtil.getFpServerDomain() + "/jsTk.do?a=" + d;
        jdtRiskUtil.sendRequest(a, m, function(b) {
            try {
                var e = JSON.parse(b);
                if (e && 0 == e.code && e.data) {
                    jdtRiskContext.deviceInfo.jsToken = e.data.token;
                    jdtRiskStorageManager.store(collectConfig.store[_riskFpMode].jsTokenKey, e.data.token);
                    jdtRiskContext.deviceInfo.eid = e.data.eid;
                    jdtRiskStorageManager.store(collectConfig.store[_riskFpMode].eidKey, e.data.eid);
                    try {
                        e.data.gia_d && 1 == e.data.gia_d && jdtRiskCookieManager.setCookie(collectConfig.store.giaDKey, e.data.gia_d, e.data.ds || 600), e.data.deMap && jdtRiskUtil.cleanAndPushDeS(jdtRiskUtil.getBizId(), e.data.deMap[jdtRiskUtil.getBizId()])
                    } catch (c) {}
                }
                jdtRiskContext.isJsTokenFinished = !0
            } catch (c) {
                console.error("resp parse error", c)
            }
        })
    } catch (b) {
        console.error("init func error :", b)
    }
}

function loadScript(m) {
    try {
        var n = document.createElement("script");
        n.type = "text/javascript";
        n.src = m;
        document.body.appendChild(n)
    } catch (l) {}
}

function __getTkResult() {
    var m = {
        jsToken: jdtRiskContext.deviceInfo.jsToken,
        fp: jdtRiskContext.deviceInfo.fp,
        sdkToken: jdtRiskContext.deviceInfo.sdkToken
    };
    m.jsToken = m.jsToken || jdtRiskStorageManager.load(collectConfig.store[_riskFpMode].jsTokenKey) || null;
    m.sdkToken = m.sdkToken || jdtRiskStorageManager.load(collectConfig.store.sdkTokenKey, !1) || null;
    m.fp = m.fp || jdtRiskStorageManager.load(collectConfig.store[_riskFpMode].fpKey, !1) || jdtRiskUtil.randomStr(32);
    jdtRiskUtil.isValidSdkToken(m.sdkToken) && (jdtRiskContext.isSdkTokenFinished = !0);
    jdtRiskUtil.isValidJsToken(m.jsToken) && (jdtRiskContext.isJsTokenFinished = !0);
    return m
}

function __callbackWrapper(m, n) {
    m && m(n);
    try {
        if (!jdtRiskContext.isRpTok && !jdtRiskUtil.isDegrade() && n.sdkToken && n.jsToken) {
            jdtRiskUtil.createWorker();
            var l = jdtRiskEncryptUtil.TDEncrypt({
                jsTk: n.jsToken,
                stk: n.sdkToken,
                v: jdtRiskContext.version
            });
            jdtRiskUtil.reportWorker(jdtRiskUtil.getCurrentPageProtocol() + jdtRiskUtil.getFpServerDomain() + "/ek.html", "a=" + l);
            jdtRiskContext.isRpTok = !0
        }
    } catch (g) {}
}

function getJsToken(m, n) {
    n = n || 3E3;
    var l = __getTkResult();
    if (0 >= n || 50 >= n || jdtRiskContext.isReady()) __callbackWrapper(m, l);
    else var g = Math.ceil(1 * n / 50),
        f = 1,
        d = setInterval(function() {
            f++;
            if (jdtRiskContext.isReady() || f > g) l = __getTkResult(), clearInterval(d), __callbackWrapper(m, l)
        }, 50)
}

function getJdEid(m, n) {
    n = n || 0;
    var l = __getTkResult();
    if (0 >= n || 50 >= n || jdtRiskContext.isReady()) return l.jsToken = "", l.eid = jdtRiskContext.deviceInfo.eid || jdtRiskStorageManager.load(collectConfig.store[_riskFpMode].eidKey), __callbackWrapper(m, l), l;
    var g = Math.ceil(1 * n / 50),
        f = 1,
        d = setInterval(function() {
            f++;
            if (jdtRiskContext.isReady() || f > g) l = __getTkResult(), l.jsToken = "", l.eid = jdtRiskContext.deviceInfo.eid || jdtRiskStorageManager.load(collectConfig.store[_riskFpMode].eidKey), clearInterval(d), __callbackWrapper(m, l)
        }, 50);
    return l
};