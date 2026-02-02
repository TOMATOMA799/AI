<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fibonacci Sequence</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        #fibonacciList {
            white-space: pre-wrap;  /* Keeps the formatting with spaces and commas */
        }
    </style>
</head>
<body>
    <h1>Fibonacci Sequence</h1>
    <button id="startButton">Start Fibonacci</button>
    <div id="fibonacciList"></div>

    <script>
        document.getElementById('startButton').addEventListener('click', () => {
            const fibonacciListDiv = document.getElementById('fibonacciList');
            let count = 0;
            let a = 0, b = 1;
            let fibonacciText = '';

            // Function to generate Fibonacci numbers
            function generateFibonacci() {
                if (count < 1000) {  // Limit to the first 1000 Fibonacci numbers
                    fibonacciText += (count > 0 ? ', ' : '') + a;  // Add number to string with comma separation
                    let next = a + b;
                    a = b;
                    b = next;
                    count++;
                    fibonacciListDiv.textContent = fibonacciText;
                    setTimeout(generateFibonacci, 0);  // Call recursively to avoid blocking UI
                }
            }

            generateFibonacci();  // Start the Fibonacci generation
        });
    </script>
</body>
</html>
