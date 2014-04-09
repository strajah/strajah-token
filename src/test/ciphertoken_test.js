var debug = require('debug')('ciphertoken-test');
var crypto = require('crypto');
var assert = require('assert');

var ciphertoken = require('../ciphertoken');

var VALID_CIPHER_KEY = 'myCipherKey123';
var VALID_FIRM_KEY 	 = 'myFirmKey123';
var VALID_USER_ID 	 = 'myUserId123';

describe('# Creation', function() {

	it('CipherToken creation ok', function() {
		var cToken = ciphertoken.create(VALID_CIPHER_KEY,VALID_FIRM_KEY);
		assert.notEqual(cToken,null);
	});

	it('CipherToken creation with no cipher key error', function() {
		try {
			var cToken = ciphertoken.create();
		}
		catch (err) {
			debug('creation error no cipher key', err);
			assert.notEqual(err,null);
		}
	});

	it('CipherToken creation with no hmac key error', function() {
		try {
			var cToken = ciphertoken.create(VALID_CIPHER_KEY);
		}
		catch (err) {
			debug('Creation error no hmac key', err);
			assert.notEqual(err,null);
		}
	});

});

describe('# refreshToken', function() {

	it('refreshToken creation ok', function() {
		var cToken = ciphertoken.create(VALID_CIPHER_KEY,VALID_FIRM_KEY);
		assert.notEqual(cToken.createRefreshToken(),null);
	});

});

describe('# accessToken', function() {

	it('accessToken creation ok', function() {
		var cToken = ciphertoken.create(VALID_CIPHER_KEY,VALID_FIRM_KEY);
		var accessToken = cToken.createAccessToken(VALID_USER_ID,new Date().getTime());
		debug('accessToken creation ok', accessToken);
		assert.notEqual(accessToken,null);
	});

	it('accessToken get a set ok', function() {
		var cToken = ciphertoken.create(VALID_CIPHER_KEY,VALID_FIRM_KEY);
		var timestamp = new Date().getTime();
		var accessToken = cToken.createAccessToken(VALID_USER_ID,timestamp);
		var accessTokenSet = cToken.getAccessTokenSet(accessToken);
		debug('accessToken get a set ok', accessTokenSet);
		assert.notEqual(accessTokenSet,null);
		assert.equal(accessTokenSet.consummerId,VALID_USER_ID);
		assert.equal(accessTokenSet.timestamp,timestamp);
	});

	it('accessToken check correct timestamp', function() {
		var cToken = ciphertoken.create(VALID_CIPHER_KEY,VALID_FIRM_KEY);
		var refreshToken = cToken.createRefreshToken();
		var accessToken = cToken.createAccessToken(VALID_USER_ID,new Date().getTime());
		debug('accessToken check correct timestamp', accessToken);
		assert.equal( cToken.getAccessTokenExpiration( accessToken ).expired, false );
	});

	it('accessToken check incorrect timestamp', function() {
		var cToken = ciphertoken.create(VALID_CIPHER_KEY,VALID_FIRM_KEY);
		var refreshToken = cToken.createRefreshToken();
		var accessToken = cToken.createAccessToken(VALID_USER_ID,new Date().getTime()-999999);
		debug('accessToken check incorrect timestamp', accessToken);
		assert.equal( cToken.getAccessTokenExpiration( accessToken ).expired, false );
	});

/**
	TODO TEST COMMON ATTACKS

	it('attempted accessToken modification', function() {

	});

**/
	

});







