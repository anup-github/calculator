// Example JavaScript file
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    getDetails() {
        return `${this.name} is ${this.age} years old.`;
    }
}

function greetUser(user) {
    return `Hello, ${user.name}!`;
}

const sayGoodbye = (name) => `Goodbye, ${name}!`;

console.log(greetUser({ name: "Alice" }));
console.log(sayGoodbye("Bob"));
