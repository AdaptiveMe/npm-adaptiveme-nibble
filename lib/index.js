/**
 * Says hello to a person.
 *
 * @param name Name of the person to greet.
 */
var sayHello = function(name) {
    return 'Hello, ' + name;
};

// Allows us to call this function from outside of the library file.
// Without this, the function would be private to this file.
exports.sayHello = sayHello;
