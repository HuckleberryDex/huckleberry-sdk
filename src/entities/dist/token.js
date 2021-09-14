"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a;
exports.__esModule = true;
exports.WETH = exports.currencyEquals = exports.Token = void 0;
var tiny_invariant_1 = require("tiny-invariant");
var constants_1 = require("../constants");
var utils_1 = require("../utils");
var currency_1 = require("./currency");
/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
var Token = /** @class */ (function (_super) {
    __extends(Token, _super);
    function Token(chainId, address, decimals, symbol, name) {
        var _this = _super.call(this, decimals, symbol, name) || this;
        _this.chainId = chainId;
        _this.address = utils_1.validateAndParseAddress(address);
        return _this;
    }
    /**
     * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
     * @param other other token to compare
     */
    Token.prototype.equals = function (other) {
        // short circuit on reference equality
        if (this === other) {
            return true;
        }
        return this.chainId === other.chainId && this.address === other.address;
    };
    /**
     * Returns true if the address of this token sorts before the address of the other token
     * @param other other token to compare
     * @throws if the tokens have the same address
     * @throws if the tokens are on different chains
     */
    Token.prototype.sortsBefore = function (other) {
        tiny_invariant_1["default"](this.chainId === other.chainId, 'CHAIN_IDS');
        tiny_invariant_1["default"](this.address !== other.address, 'ADDRESSES');
        return this.address.toLowerCase() < other.address.toLowerCase();
    };
    return Token;
}(currency_1.Currency));
exports.Token = Token;
/**
 * Compares two currencies for equality
 */
function currencyEquals(currencyA, currencyB) {
    if (currencyA instanceof Token && currencyB instanceof Token) {
        return currencyA.equals(currencyB);
    }
    else if (currencyA instanceof Token) {
        return false;
    }
    else if (currencyB instanceof Token) {
        return false;
    }
    else {
        return currencyA === currencyB;
    }
}
exports.currencyEquals = currencyEquals;
exports.WETH = (_a = {},
    _a[constants_1.ChainId.MAINNET] = new Token(constants_1.ChainId.MAINNET, '0x98878B06940aE243284CA214f92Bb71a2b032B8A', 18, 'WMOVR', 'Wrapped MOVR'),
    _a[constants_1.ChainId.MOON_MAINNET] = new Token(constants_1.ChainId.MOON_MAINNET, '0x98878B06940aE243284CA214f92Bb71a2b032B8A', 18, 'WMOVR', 'Wrapped MOVR'),
    _a[constants_1.ChainId.MOON_TESTNET] = new Token(constants_1.ChainId.MOON_TESTNET, '0xbd23fCD60bD2682dea6A3aad84b498c54d56c494', 18, 'WDEV', 'Wrapped MDEV'),
    _a);
