const App = (new function AppContainer() {
	let _size	= 30;
	let _dice	= 13378;
	
	this.convertColor = function convertColor(color) {
		return 'rgba(' + color.getRed() + ', ' + color.getGreen() + ', ' + color.getBlue() + ', ' + (color.getAlpha() / 255) + ')';
	};
	
	this.onOpen = function onOpen(user) {
		setTimeout(function() {
			let session	= user.getAppContentSession(AppViewMode.Overlay);
			
			if(session === null) {
				var content = AppContent.overlayContent(new HTMLFile('index.html', {
					channel: {
						foreground: this.convertColor(KnuddelsServer.getChannel().getChannelDesign().getDefaultFontColor()),
						background: this.convertColor(KnuddelsServer.getChannel().getChannelDesign().getBackgroundColor())
					}
				}), _size, _size);
				
				if(!user.canSendAppContent(content)) {
					return;
				}
				
				user.sendAppContent(content);
				return;
			}
		}.bind(this), 400);
	};
	
	this.mayUserDice = function mayUserDice(user, config) {
		return !(config.getDices()[0] == '1W' + _dice);
    };
	
	this.chatCommands = {
		StayOnline: function StayOnline(user) {
			this.onOpen(user);
		}.bind(this)
	};
}());
