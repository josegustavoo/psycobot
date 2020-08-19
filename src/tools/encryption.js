const crypto = require('crypto');

module.exports = {
	
	encrypt: value => {
		const iv = crypto.randomBytes(32);
		
		const key = crypto.randomBytes(32);
		
		const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
		
		const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
		
		const tag = cipher.getAuthTag();
		
		return Buffer.concat([key, iv, tag, encrypted]).toString('base64');
	},
	
	decrypt: value => {
		const data = Buffer.from(value, 'base64');
		
        const key = data.slice(0, 32);
        const iv = data.slice(32, 64);
        const tag = data.slice(64, 80);
        const text = data.slice(80);
		
        const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
        decipher.setAuthTag(tag);
		
        const decrypted = decipher.update(text, 'binary', 'utf8') + decipher.final('utf8');

        return decrypted;
	},
	encryptDB: value => {
		const iv = crypto.randomBytes(32);
		const key = Buffer.from(process.env.AES_SECRET);
		
		const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
		
		const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
		
		const tag = cipher.getAuthTag();
		
		return Buffer.concat([iv, tag, encrypted]).toString('base64');
	},
	decryptDB: value => {
		const data = Buffer.from(value, 'base64');
		
        const key = Buffer.from(process.env.AES_SECRET);
		
        const iv = data.slice(0, 32);
        const tag = data.slice(32, 48);
        const text = data.slice(48);
		
        const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
        decipher.setAuthTag(tag);
		
        const decrypted = decipher.update(text, 'binary', 'utf8') + decipher.final('utf8');

        return decrypted;
	}
}
