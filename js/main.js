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
		$pages = $('#pages');
	// init
	$('#pageA').attr('src',dirPages + pages[0]).data('page',1);
	$('#pageB').attr('src',dirPages + pages[1]).data('page',2);
	$pages.find('img').on('click',function(){
		var $t = $(this).parent();
		if($t.data('anim')){
			return;
		}
		$t.data('anim',true);
		var $images = $t.find('img'),
			$a = $images.first(),	
			$b = $images.last(),
			width = $a.width(),
			next = Number($b.data('page'));
		next++;
		if(next > pages.length){
			next = 1;
		}
		$a.animate({'margin-left':'-'+width+'px'});	
		$b.animate({'margin-left':'0px'},function(){
			$a.detach();
			$b.after(
				$a.css({'margin-left':'0px'})
					.attr('src',dirPages+pages[next-1])
					.data('page',next)
			);
			$t.data('anim',false);
		});
	})
});