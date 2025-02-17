document.getElementById("convert-form").addEventListener("submit", function (event) {
    event.preventDefault();  
    console.log("Form submitted");
    const url = document.getElementById("link-input").value;
    console.log("URL:", url);
    fetch('/convert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `url=${encodeURIComponent(url)}`
    })
    .then(response => {
        console.log("Response status:", response.status);
        if (response.ok) {
            return response.blob();
        } else {
            return response.text().then(text => {
                throw new Error(`Conversion failed: ${text}`);
            });
        }
    })
    .then(blob => {
        console.log("Blob received");
        const downloadLink = document.createElement("a");
        const url = window.URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = "converted.mp3";
        downloadLink.click();
    })
    .catch(error => {
        console.error("Error:", error.message);
        alert(error.message);
    });
});