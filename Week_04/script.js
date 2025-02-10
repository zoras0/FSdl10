// script.js
document.getElementById('agebutton').addEventListener('click', function() {
    const inputNumber = document.getElementById('numberInput').value;
    const multiplier = 13; // 
    const result = inputNumber * multiplier;

    // Display the result
    document.getElementById('result').innerText = `Your Age : ${result}`;
});
