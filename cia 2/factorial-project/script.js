function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

// Get the input from the user
let number = prompt("Enter a positive integer:");

// Convert input to integer
number = parseInt(number);

// Validate input and calculate result
if (isNaN(number) || number < 0) {
    alert("Please enter a valid positive integer!");
} else {
    // Calculate factorial and display result
    let result = factorial(number);
    alert(`The factorial of ${number} is ${result}`);
}