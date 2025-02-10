document.getElementById('agebutton').addEventListener('click', function() {
    const inputNumber = document.getElementById('numberInput').value;
    const multiplier = 4; // 
    const result = inputNumber * multiplier;
    document.getElementById('result').innerText = `Your Age : ${result}`;
});
