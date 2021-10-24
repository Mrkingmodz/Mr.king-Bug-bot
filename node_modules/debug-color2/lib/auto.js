"use strict";

if (require("./chk").isNodeJs())
{
	module.exports = require('./node');
}
else
{
	module.exports = require('./browser');
}
