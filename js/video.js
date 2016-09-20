$(document).ready(function(){
	
	var delay = 384;
	
	var video = document.getElementById('video_v');
	var video_f_l = document.getElementById('video_f_l').getElementsByTagName('img').item(0);
	var video_f_r = document.getElementById('video_f_r').getElementsByTagName('img').item(0);
	
	var video_gif_cash = $('#video_gif_cash');
	var wait = $('#wait');
	var wait_op = $('#wait img, #wait p');
	var wait_p = document.getElementById('wait').getElementsByTagName('p').item(0);
	
	var c_gif = 17;
	
	function video_f(isrc) {
		video_f_l.src = isrc;
		video_f_r.src = isrc;
	}
	
	function video_t_v_gif(o) {
		var video_t = Math.round(o.currentTime);
		if (video_t > c_gif) video_t = c_gif;
		video_f('video/it-technology/'+video_t+'.gif');
		if (video_t <= c_gif) {
			setTimeout(function(){
				if (o.paused) return false;
				var video_t = Math.round(o.currentTime);
				if (video_t > c_gif) video_t = c_gif;
				video_f('video/it-technology/'+video_t+'.gif');
				return video_t_v_gif(o);
			}, 1000);
		} else {
			return false;
		}
	}
	
	function video_t_v_jpg(o) {
		var video_t = Math.round(o.currentTime);
		if (video_t > c_gif) video_t = c_gif;
		video_f('video/it-technology/'+video_t+'.jpg');
	}
	
	gif_cash.f = 0;
	function gif_cash(o,t) {
		if (gif_cash.f == 1) {
			var t_v = video_t_v_gif(o);
		} else {
			if ((t>=0) && (t<=c_gif)) {
				if (o.play) o.pause();
				wait.css('display','block')
				wait_op.animate({opacity: 1}, delay);
				video_gif_cash.append('<img id="gif'+t+'" src="video/it-technology/'+t+'.gif" alt="IT-Technology">');
				$('#gif'+t).bind('load', function () {
					wait_p.innerHTML = Math.round((100/c_gif)*t)+'%';
					t++;
					gif_cash(o,t);
				});
			} else {
				gif_cash.f = 1;
				wait_op.animate({opacity: 0}, delay);
				setTimeout(function(){
					wait.css('display','none');
					if (o.paused) o.play();
					var t_v = video_t_v_gif(o);
				}, delay);
			}
		}
	}
	
	video.onclick = function(event) {
		event.preventDefault();
		if (this.paused) {
			this.play();
		} else {
			this.pause();
		}
	};
	
	video.addEventListener('play',function(){
		gif_cash(this,0);
	});
	
	video.addEventListener('pause',function(){
		var t_v = video_t_v_jpg(this);
	});
	
	video.addEventListener('ended',function(){
		video_f('video/it-technology/'+c_gif+'.gif');
	});
	
});