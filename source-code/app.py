# Example Python file
class User:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def get_details(self):
        return f"{self.name} is {self.age} years old."

def greet_user(user):
    return f"Hello, {user['name']}!"

def say_goodbye(name):
    return f"Goodbye, {name}!"

print(greet_user({"name": "Alice"}))
print(say_goodbye("Bob"))
