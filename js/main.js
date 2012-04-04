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
		$next = $images.last();
	
	// populate the first 2 pages for initial load
	$current.attr('src',dirPages + pages[0]).data('page',1);
	$next.attr('src',dirPages + pages[1]).data('page',2);
	
	// add handler for clicking/tapping for next page
	// TODO: backward navigation and swipe
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
			next = Number($next.data('page'));
			next++;
			if(next > pages.length){
				next = 1;
			}
			$(this).css({display:'none',left:nextWidth+'px'})
				.attr('src',dirPages+pages[next-1])
				.data('page',next);
			// now this one is holding the next page
			$next = $(this);
		});	
		// swipe next page in as current
		$next.show().css({left:currentWidth+'px'}).animate({'left':'0px'},function(){
			$current = $(this);
			$pages.css({width:nextWidth+'px'}).data('anim',false);
		});
	})
});