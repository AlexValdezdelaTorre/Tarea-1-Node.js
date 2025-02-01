"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protecAccountOwner = void 0;
const protecAccountOwner = (ownerUserId, sessionUserId) => {
    if (ownerUserId !== sessionUserId) {
        return false;
    }
    return true;
};
exports.protecAccountOwner = protecAccountOwner;
