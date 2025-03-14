// Example TypeScript file
class User {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    getDetails(): string {
        return `${this.name} is ${this.age} years old.`;
    }
}

function greetUser(user: { name: string }): string {
    return `Hello, ${user.name}!`;
}

const sayGoodbye = (name: string): string => `Goodbye, ${name}!`;

console.log(greetUser({ name: "Alice" }));
console.log(sayGoodbye("Bob"));
