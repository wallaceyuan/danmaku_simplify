var winWidth = document.documentElement.clientWidth,
    winHeight = document.documentElement.clientHeight,
    ua = navigator.userAgent.toLowerCase(),
    isAndroid = -1 != ua.indexOf("android"),
    isIos = -1 != ua.indexOf("iphone") || -1 != ua.indexOf("ipad"),
    video = document.getElementsByTagName("video")[0],
    mobile = !1,
    state = !0,
    inst, mesRec = "";
/iphone|nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|wap|android|iPod/i.test(navigator.userAgent.toLowerCase()) && (mobile = !0);
var socket = io.connect("http://127.0.0.1:3000/live");
socket.on("connect", function () {
    $(".listW").append('<p class="syinfo">\u623f\u95f4\u8fde\u63a5\u4e2d...</p>');
    socket.emit("userInit", {
        room: 1,
        openid: wxInfo.openid,
        nickName: wxInfo.nickname,
        posterURL: wxInfo.headimgurl
    })
});
socket.on("userStatus", function (a) {
    parseInt(700 == a.status) && (state = !1);
    var b = '<p class="syinfo">\u6b22\u8fce' + wxInfo.nickname + '\u6765\u5230\u76f4\u64ad\u95f4</p><p class="syinfo">\u5f39\u5e55\u8fde\u63a5\u4e2d...</p>';
    $(".listW").append(b);
    console.log(a)
});
$(".text").on("keyup", function (a) {
    null != this.value && null != a && 13 === a.keyCode && "" != this.value && (a = this.value, this.value = "", $(".text").blur(), mesRec = a = {
        message: a,
        type: 0,
        up: 0,
        down: 0,
        perform: {
            color: "red",
            fontSize: "16px"
        }
    }, state ? socket.emit("createMessage", a) : (a.nickName = wxInfo.nickname, messageAdd(a, !0)))
});
$(".inputLogin span").on("click", function () {
    var a = $(".text").val();
    "" != a && ($(".text").val(""), $(".text").blur(), mesRec = a = {
        message: a,
        type: 0,
        up: 0,
        down: 0,
        perform: {
            color: "red",
            fontSize: "16px"
        }
    }, state ? socket.emit("createMessage", a) : (a.nickName = wxInfo.nickname, messageAdd(a, !0)))
});
socket.on("message.add", function (a) {
    messageAdd(a, !0)
});
socket.on("message.error", function (a) {
    702 == parseInt(a.status) && (state = !1, mesRec.nickName = wxInfo.nickname, messageAdd(mesRec, !0));
    console.log("messageError", a)
});
socket.on("historyData", function (a) {
    $(".listW").append('<p class="syinfo">\u5f39\u5e55\u8fde\u63a5\u6210\u529f</p>');
    a = a.history;
    for (var b in a) a.hasOwnProperty(b) && messageAdd(a[b], !1)
});
var vidologinH = lib.flexible.rem2px(5.625),
    videoHeight = 9 * winWidth / 16;
videoHeight > vidologinH && (videoHeight = vidologinH);
window.addEventListener("load", function () {
    $(".loading").css("display", "none");
    inst = ABP.create(document.getElementById("load-player"), {
        src: {
            playlist: [{
                video: document.getElementById("video-1"),
                comments: "comment-otsukimi.xml"
            }]
        },
        width: "100%",
        height: videoHeight,
        mobile: mobile,
        comment: !1
    });
    if (180 === window.orientation || 0 === window.orientation) resizeBlock(),
        $(".ABP-Text").addClass("shu");
    90 !== window.orientation && -90 !== window.orientation || winHW("B")
});
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", orientationChange, !1);

function messageAdd(a, b) {
    var c = "<p><span>" + a.nickName + ": </span>" + a.message + "</p>";
    $(".listW").append(c);
    c = document.getElementById("listW");
    c.scrollTop = c.scrollHeight;
    c = {
        mode: 1,
        text: a.message,
        size: 16
    };
    b && inst.sendDanma(c)
}
function resizeBlock() {
    var a = $(".banner").innerHeight(),
        b = $(".inputLogin").innerHeight(),
        c = $("#load-player").innerHeight();
    $(".content").height($(window).height() - (c + a + b + 2))
}
function winHW(a) {
    var b = $(".ABP-Unit");
    "B" == a ? ($(".ABP-Unit").addClass("ABP-FullScreen"), $(".bottomContent,.inputLogin").css("display", "none"), $(".ABP-Unit .ABP-Text").removeClass("shu"), inst.cmStageResize(), isIos ? b.css({
        width: $(window).width(),
        height: $(window).height()
    }) : ($("video").css({
        width: "100%",
        height: "100%"
    }), launchFullscreen(video)), setTimeout(function () {
        resizeBlock("heng");
        $(".loading").css("display", "none")
    }, 800)) : (b.css({
        width: $(window).width(),
        height: "5.625rem"
    }), isIos || exitFullscreen(), $(".bottomContent,.inputLogin").css("display", "block"), $(".ABP-Unit").removeClass("ABP-FullScreen"), inst.cmStageResize(), setTimeout(function () {
        $(".ABP-Unit .ABP-Text").addClass("shu");
        resizeBlock("shu");
        var a = document.getElementById("listW");
        a.scrollTop = a.scrollHeight;
        $(".loading").css("display", "none")
    }, 800))
}
function orientationChange() {
    $(".loading").css("display", "block");
    if (mobile) switch (window.orientation) {
        case 0:
        case 180:
            winHW("");
            break;
        case -90:
        case 90:
            winHW("B")
    }
}
var invokeFieldOrMethod = function (a, b) {
    var c;
    ["webkit", "moz", "ms", "o", ""].forEach(function (d) {
        if (!c) {
            "" === d && (b = b.slice(0, 1).toLowerCase() + b.slice(1));
            var e = typeof a[d + b];
            "undefined" !== e + "" && (c = "function" === e ? a[d + b]() : a[d + b])
        }
    });
    return c
};

function launchFullscreen(a) {
    if (a.requestFullscreen) a.requestFullscreen();
    else if (a.mozRequestFullScreen) a.mozRequestFullScreen();
    else if (a.msRequestFullscreen) a.msRequestFullscreen();
    else if (a.oRequestFullscreen) a.oRequestFullscreen();
    else if (a.webkitRequestFullscreen) a.webkitRequestFullScreen();
    else {
        a = document.documentElement;
        var b = document.body,
            c = document.getElementById("load-player");
        a.style.cssText = "width:100%;height:100%;overflow:hidden;";
        b.style.cssText = "width:100%;height:100%;overflow:hidden;";
        c.style.cssText = "width:100%;height:100%;overflow:hidden;;margin:0px;padding:0px;";
        document.IsFullScreen = !0
    }
}
function exitFullscreen() {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
    else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
    else if (document.oRequestFullscreen) document.oCancelFullScreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    else {
        var a = document.documentElement,
            b = document.body,
            c = document.getElementById("load-player");
        a.style.cssText = "";
        b.style.cssText = "";
        c.style.cssText = "";
        document.IsFullScreen = !1
    }
}
var fullscreen = function (a) {
        return a.webkitEnterFullScreen ? "webkitEnterFullScreen" : a.webkitRequestFullScreen ? "webkitRequestFullScreen" : !1
    },
    cancelfullscreen = function (a) {
        return a.webkitExitFullScreen ? "webkitExitFullScreen" : a.webkitCancelFullScreen ? "webkitCancelFullScreen" : !1
    };