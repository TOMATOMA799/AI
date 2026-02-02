<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Count from 1 to 1 Million</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        #countList {
            white-space: pre-wrap;  /* Keeps the formatting with spaces and commas */
        }
    </style>
</head>
<body>
    <h1>Counting from 1 to 1 Million</h1>
    <button id="startButton">Start Counting</button>
    <div id="countList"></div>

    <script>
        document.getElementById('startButton').addEventListener('click', () => {
            const countListDiv = document.getElementById('countList');
            let currentCount = 1;
            let countText = '';

            // To avoid freezing the UI, we use `setTimeout` to increment in chunks
            function countNumbers() {
                if (currentCount <= 1000000) {
                    // Add current number with a comma and space if it's not the last number
                    countText += (currentCount < 1000000 ? currentCount + ', ' : currentCount);
                    countListDiv.textContent = countText;
                    currentCount++;
                    setTimeout(countNumbers, 0);  // Call recursively after rendering each number
                }
            }

            countNumbers();  // Start the counting process
        });
    </script>
</body>
</html>
