const express = require('express');
const ytdl = require('ytdl-core');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.post('/convert', express.urlencoded({ extended: true }), (req, res) => {
    const videoUrl = req.body.url;
    console.log("Received URL:", videoUrl);
    if (!videoUrl || !ytdl.validateURL(videoUrl)) {
        console.error("Invalid YouTube URL");
        return res.status(400).send('Invalid YouTube URL');
    }
    const fileName = `downloads/${Date.now()}.mp3`;
    console.log("File will be saved as:", fileName);

    const command = `yt-dlp -x --audio-format mp3 -o "${fileName}" ${videoUrl}`;
    console.log("Executing command:", command);

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send(`Error occurred during conversion: ${stderr}`);
        }
        console.log("Command output:", stdout);
        console.error("Command error output:", stderr);

        res.download(fileName, (err) => {
            if (err) {
                console.error("Error sending file:", err);
                return res.status(500).send('Error sending file');
            } else {
                console.log("File sent successfully");
            }
            fs.unlinkSync(fileName);
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
