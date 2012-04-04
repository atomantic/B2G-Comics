/**
 * Super basic comics reader created on the fly at http://2012.jsconf.us/
 * @author Adam Eivy
 * @link https://github.com/atomantic/B2G-Comics
 */
$(function(){	
	// TODO: get the comic info from an API
	// TODO: allow user selection of comic from list
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
		$next = $current.next(),
		$preload = $next.next();
	
	// populate the first 2 pages for initial load
	$current.attr('src',dirPages + pages[0]).data('page',1);
	$next.attr('src',dirPages + pages[1]).data('page',2);
	$preload.attr('src',dirPages + pages[2]).data('page',3);
	
	// add handler for clicking/tapping to next page
	// TODO: backward navigation and swipe events
	$pages.on('click',function(){
		// make sure we are not in the middle of animation
		if($pages.data('anim')){
			return;
		}
		$pages.data('anim',true);
		// image sizes
		var currentWidth = $current.width(),
			nextWidth = $next.width();
		// swipe current off page
		$current.animate({'left':'-'+currentWidth+'px'},function(){
			// figure out the next preload that this image element will cache
			preload = Number($preload.data('page'));
			preload++;
			if(preload > pages.length){
				preload = 1;
			}
			// hide it and position it at the end
			$(this).css({display:'none',left:(currentWidth+nextWidth)+'px'})
				.attr('src',dirPages+pages[preload-1])
				.data('page',preload);
			// now the next image is the former preload
			$next = $preload;
			// now this element is holding the preload page
			$preload = $(this);
		});	
		// swipe next page in as current
		$next.show().css({left:currentWidth+'px'}).animate({'left':'0px'},function(){
			// now this is the current
			$current = $(this);
			$pages.css({width:nextWidth+'px'}).data('anim',false);
		});
	})
});