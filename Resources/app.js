var win = Ti.UI.createWindow({
	backgroundColor: '#fff'
});


// create image lambert
var imageView = Ti.UI.createImageView({
	image: "assets/images/lambert01.png",
	width: 300
});


// create audio
var soundPlayer = Ti.Media.createSound({
	url: "assets/son/lambert.mp3"
});






app =
{
	init:function()
	{
		app.reset();

		Ti.Gesture.addEventListener("shake", app.initSound);
		imageView.addEventListener("click", app.initSound);

		imageView.setImage("assets/images/lambert01.png");
	},


	reset:function()
	{
		Ti.Gesture.removeListener("shake", app.initSound);
		imageView.removeEventListener("click", app.initSound);
	},


	initSound:function()
	{
		if (!soundPlayer.isPlaying()) {
			soundPlayer.addEventListener('complete', app.completeSound);
			soundPlayer.play();

			imageView.setImage("assets/images/lambert02.png");
		}
	},


	completeSound:function()
	{
		soundPlayer.removeEventListener('complete', app.completeSound);
		soundPlayer.release();

		imageView.setImage("assets/images/lambert01.png");
	}
}



app.init();




win.add(imageView);
win.addEventListener("open", function(e) {
	win.activity.addEventListener("resume", function() {
		Ti.App.fireEvent('resume');
	});
	
	win.activity.addEventListener("pause", function() {
		Ti.App.fireEvent('paused');
	});
});


Ti.App.addEventListener('resume',function(e) {
	app.init();
});

Ti.App.addEventListener('paused',function(e) {
	app.reset();
});



win.open();