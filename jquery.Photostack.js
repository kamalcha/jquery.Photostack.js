/**
* jquery.Photostack.js v0.1.0 - Simple Photostack plugin for jQuery
* https://github.com/steelydylan/jquery.Photostack.js
* MIT Licensed
* Copyright (C) 2015 steelydylan http://horicdesign.com
*/
(function($){
	var getRand = function (a, b) {
        return ~~(Math.random() * (b - a + 1)) + a;
    }
    var getPrefix = function(){
    	var userAgent = window.navigator.userAgent.toLowerCase();
    	if(userAgent.indexOf("msie")){
    		return "-ms-";
    	}else if(userAgent.indexOf("chrome") || userAgent.indexOf("safari")){
    		return "-webkit-"
    	}else if(userAgent.indexOf("firefox")){
    		return "-moz-";
    	}else if(userAgent.indexOf("opera")){
    		return "-o-";
    	}else{
    		return "";
    	}
    }
    var def = {
    	top:40,
    	left:500
    }
	$.prototype.Photostack = function(opt){
		opt = $.extend(def,opt);
		var $this = $(this);
		var $children = $this.children();
		var prefix = getPrefix();
		var zindex = 0;
		$this.addClass("js-photostack");
		$children.each(function(){
			var $child = $(this);
			var rand = getRand(-20,20);
			var rotate = "rotate("+rand+"deg)";
			$child.css(prefix+"transform",rotate);
			$child.css("transform",rotate);
			$child.css("z-index",zindex);
			zindex++;
		});
		$this.click(function(){
			var max = 0;
			$children.each(function(){
				var current = parseInt($(this).css("z-index"));
				current++;
				$(this).css("z-index",current);
				if(current > max){
					max = current;
				}
			});
			var $child = $children.filter(function(){
				return max == $(this).css("z-index");
			});
			$child
			.animate({top:opt.top,left:opt.left})
			.queue(function(next){
				$child.css("z-index",0);
				next();
			})
			.animate({top:0,left:0});
		});
	};
})(jQuery);