var Enum = require("enumify");

class InstanceType extends Enum { }

InstanceType.initEnum([
    HTTP = "HTTP", UDP = "UDP"
])

module.exports = InstanceType