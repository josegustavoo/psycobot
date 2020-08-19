const fs = require('fs');

module.exports = class i18n {
	constructor(lang) {
		if(!lang)
			lang = 'en';
		
		if( lang.includes('-') ) {
			var arr = lang.split('-');
			lang = arr[0];
		}
		
		if( fs.existsSync(`${ __dirname }/locales/${ lang }/index.json`) ) {
			this.json = JSON.parse( fs.readFileSync( `${ __dirname }/locales/${ lang }/index.json` ));
		} else {
			this.json = JSON.parse( fs.readFileSync( `${ __dirname }/locales/en/index.json` ));
		}
		
	}
	
	t(name) {
		let text = null;
		
		if(name.includes('.')) {
			var arr = name.split('.');
			var jsonArr = this.json[arr[0]];
			
			text = jsonArr[arr[1]];
		} else {
			text = this.json[name];
		}
		
		if(text == undefined)
			text = 'undefined';
		
		return text;
	}
	
}
