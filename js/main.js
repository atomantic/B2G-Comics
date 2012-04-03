$(function(){
    var dirPages = 'comics/issue01/',
	    pages = [
	   	 	'SleepDeprivationNinja-01.jpg',
		    'SleepDeprivationNinja-02.jpg',
		    'SleepDeprivationNinja-03.jpg',
		    'SleepDeprivationNinja-04.jpg',
		    'SleepDeprivationNinja-05.jpg',
		    'SleepDeprivationNinja-06.jpg',
		    'SleepDeprivationNinja-07.jpg',
		    'SleepDeprivationNinja-08.jpg'
	    ],
		$pages = $('#pages'),
		$images = $pages.find('img'),
		$current = $images.first(),
		$next = $images.last();
		
	$current.attr('src',dirPages + pages[0]).data('page',1);
	$next.attr('src',dirPages + pages[1]).data('page',2);
	$pages.on('click',function(){
		if($pages.data('anim')){
			return;
		}
		$pages.data('anim',true);
		var currentWidth = $current.width(),
			nextWidth = $next.width();
		$current.animate({'left':'-'+currentWidth+'px'},function(){
			next = Number($next.data('page'));
			next++;
			if(next > pages.length){
				next = 1;
			}
			$(this).css({display:'none',left:nextWidth+'px'})
				.attr('src',dirPages+pages[next-1])
				.data('page',next);
			$next = $(this);
		});	
		$next.show().css({left:currentWidth+'px'}).animate({'left':'0px'},function(){
			//$pages.css({width:bwidth+'px'});
			$current = $(this);
			$pages.css({width:$current.width()+'px'}).data('anim',false);
		});
	})
});