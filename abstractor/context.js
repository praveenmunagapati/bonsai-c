function Context(parentContext) {
	this.parentContext = parentContext;
	this.isGlobalContext = !parentContext;
	if (this.isGlobalContext) {
		this.nextHeapAddress = 0;
	}
	this.variables = {};
}
var id = 0;
Context.prototype.define = function(name, type) {
	var definition = {'name': name, 'type': type, 'id': id++};
	this.variables[name] = definition;
	return definition;
};
Context.prototype.get = function(name) {
	if (name in this.variables) {
		return this.variables[name];
	} else if (this.parentContext) {
		return this.parentContext.get(name);
	}
	return null;
};
Context.prototype.createChildContext = function() {
	return new Context(this);
};
Context.prototype.allocateFromHeap = function(size) {
	if (!this.isGlobalContext) {
		throw("Can only allocate heap storage from the global context");
	}
	var result = this.nextHeapAddress;
	this.nextHeapAddress += size;
	return result;
};

exports.Context = Context;
