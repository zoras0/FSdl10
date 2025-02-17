document.getElementById("convert-form").addEventListener("submit", function (event) {
    event.preventDefault();  
    const url = document.getElementById("link-input").value;
    fetch('/convert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `url=${encodeURIComponent(url)}`
    })
    .then(response => {
        if (response.ok) {
            return response.blob();
        } else {
            throw new Error("Conversion failed");
        }
    })
    .then(blob => {
        const downloadLink = document.createElement("a");
        const url = window.URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = "converted.mp3";
        downloadLink.click();
    })
    .catch(error => {
        alert(error.message);
    });
});
