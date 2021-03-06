'use strict';

const firmToken = require('../tokenFirm/firmToken.js'),
    uuid = require('node-uuid');

module.exports = (settings, tokenProperties) => {
    const expiresAtTimestamp = new Date().getTime() + settings.tokenExpirationMinutes * 60 * 1000;
    const dataToSerialize = createDataToSerialize(tokenProperties.userId, expiresAtTimestamp, tokenProperties.data);

    let tokenSet = {
        userId: tokenProperties.userId,
        expiresAtTimestamp: expiresAtTimestamp,
        firm: firmToken(settings, settings.firmKey, dataToSerialize)
    };

    if (tokenProperties.data !== undefined) {
        tokenSet.data = tokenProperties.data;
    }

    if (settings.enableSessionId) {
        tokenSet.sessionId = addSessionId(tokenProperties);
    }

    return tokenSet;
};

function addSessionId(tokenProperties) {
    if (tokenProperties.sessionId !== undefined) {
        return tokenProperties.sessionId;
    }
    return uuid.v4();
}

function createDataToSerialize(userId, expiresAtTimestamp, data) {
    return {
        userId: userId,
        expiresAtTimestamp: expiresAtTimestamp,
        data: data
    }
}
