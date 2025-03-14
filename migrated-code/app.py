# Refactored Python file
class User:
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age

    def get_details(self) -> str:
        return f"{self.name} is {self.age} years old."

def greet_user(user: dict) -> str:
    return f"Hello, {user['name']}!"

def say_goodbye(name: str) -> str:
    return f"Goodbye, {name}!"

print(greet_user({"name": "Alice"}))
print(say_goodbye("Bob"))
