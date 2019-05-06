function onBridgeReady() {
    var mainTitle=args.Title,
		mainTitlefrends=args.FrendTitle,
        mainDesc=args.Descs,
        mainURL=args.Links,
        mainImgUrl= args.Photo;

    //转发朋友圈
    WeixinJSBridge.on("menu:share:timeline", function(e) {
        var data = {
            img_url:mainImgUrl,
            img_width: "120",
            img_height: "120",
            link: mainURL,
            //desc这个属性要加上，虽然不会显示，但是不加暂时会导致无法转发至朋友圈，
            desc: mainDesc,
            title: mainTitle
        };
        WeixinJSBridge.invoke("shareTimeline", data, function(res) {
            args.afterShareFriend(res)
			
        });
    });
    //分享给朋友
    WeixinJSBridge.on('menu:share:appmessage', function(argv) {
        WeixinJSBridge.invoke("sendAppMessage", {
            img_url: mainImgUrl,
            img_width: "120",
            img_height: "120",
            link: mainURL,
            desc: mainDesc,
            title: mainTitlefrends
        }, function(res) {
            args.afterShareTimeLine(res)
			
        });
    });

	
};
//执行
document.addEventListener('WeixinJSBridgeReady', function() {
	
    args.Edits && onBridgeReady();
});