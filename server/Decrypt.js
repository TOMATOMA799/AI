<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Encrypt & Decrypt Message</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            width: 100%;
            max-width: 700px;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 25px;
            text-align: center;
        }

        .header h1 {
            font-size: 24px;
            font-weight: 600;
        }

        .content {
            padding: 25px;
            overflow-y: auto;
            flex: 1;
        }

        #chatBox {
            border: 2px solid #e0e0e0;
            padding: 15px;
            max-height: 250px;
            overflow-y: auto;
            margin-bottom: 20px;
            border-radius: 10px;
            background-color: #f8f9fa;
        }

        .message {
            margin-bottom: 15px;
            padding: 15px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            font-size: 14px;
            line-height: 1.6;
        }

        .message strong {
            color: #667eea;
            display: inline-block;
            min-width: 160px;
        }

        .message-row {
            margin-bottom: 8px;
            word-wrap: break-word;
        }

        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #333;
            font-size: 14px;
        }

        input, textarea, select {
            width: 100%;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 14px;
            transition: border-color 0.3s;
            font-family: 'Courier New', monospace;
        }

        input:focus, textarea:focus, select:focus {
            outline: none;
            border-color: #667eea;
        }

        textarea {
            min-height: 80px;
            resize: vertical;
        }

        .button-container {
            display: flex;
            gap: 10px;
            margin-top: 25px;
        }

        button {
            flex: 1;
            padding: 14px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
        }

        #decryptButton {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }

        #decryptButton:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        #clearButton {
            background: #f0f0f0;
            color: #333;
        }

        #clearButton:hover {
            background: #e0e0e0;
        }

        .error-message {
            background-color: #fee;
            border-left: 4px solid #f00;
            padding: 12px;
            margin-top: 15px;
            border-radius: 5px;
            color: #c00;
            font-size: 14px;
        }

        .success-message {
            background-color: #efe;
            border-left: 4px solid #0a0;
            padding: 12px;
            margin-top: 15px;
            border-radius: 5px;
            color: #070;
            font-size: 14px;
        }

        .info-text {
            font-size: 12px;
            color: #666;
            margin-top: 5px;
        }

        .format-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 10px;
            margin-top: 10px;
        }

        .format-option {
            padding: 8px;
            background: #f5f5f5;
            border-radius: 5px;
            text-align: center;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.3s;
            border: 2px solid transparent;
        }

        .format-option:hover {
            background: #e8e8e8;
        }

        .format-option.active {
            background: #667eea;
            color: white;
            border-color: #5568d3;
        }

        ::-webkit-scrollbar {
            width: 8px;
        }

        ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #555;
        }
    </style>
</head>
<body>

    <div class="container">
        <div class="header">
            <h1>🔐 Encrypt & Decrypt Message</h1>
        </div>

        <div class="content">
            <div id="chatBox"></div>

            <div class="form-group">
                <label for="encryptionMethod">Encryption Method:</label>
                <select id="encryptionMethod">
                    <option value="AES-CBC">AES-CBC - Advanced Encryption Standard - CBC Mode</option>
                    <option value="AES-GCM">AES-GCM - Advanced Encryption Standard - GCM Mode</option>
                    <option value="AES-CTR">AES-CTR - Advanced Encryption Standard - CTR Mode</option>
                </select>
            </div>

            <div class="form-group">
                <label for="keyFormat">Key Format:</label>
                <select id="keyFormat">
                    <option value="hex">Hexadecimal</option>
                    <option value="base64">Base64</option>
                    <option value="utf8">UTF-8 Text</option>
                    <option value="raw">Raw Bytes (comma-separated)</option>
                </select>
                <div class="info-text">Choose the format of your encryption key</div>
            </div>

            <div class="form-group">
                <label for="key">Encryption Key:</label>
                <input type="text" id="key" placeholder="Enter encryption key in selected format">
                <div class="info-text">Supports any byte length - will be padded/truncated to match encryption standard</div>
            </div>

            <div class="form-group">
                <label for="ivFormat">IV/Nonce Format:</label>
                <select id="ivFormat">
                    <option value="hex">Hexadecimal</option>
                    <option value="base64">Base64</option>
                    <option value="utf8">UTF-8 Text</option>
                    <option value="raw">Raw Bytes (comma-separated)</option>
                </select>
            </div>

            <div class="form-group">
                <label for="iv">Initialization Vector / Nonce:</label>
                <input type="text" id="iv" placeholder="Enter IV/Nonce in selected format">
                <div class="info-text">Will be adjusted to required length for chosen encryption method</div>
            </div>

            <div class="form-group">
                <label for="messageFormat">Encrypted Message Format:</label>
                <select id="messageFormat">
                    <option value="base64">Base64</option>
                    <option value="hex">Hexadecimal</option>
                    <option value="raw">Raw Bytes (comma-separated)</option>
                </select>
            </div>

            <div class="form-group">
                <label for="encryptedMessage">Encrypted Message:</label>
                <textarea id="encryptedMessage" placeholder="Enter the encrypted message in selected format"></textarea>
            </div>

            <div class="button-container">
                <button id="decryptButton">🔓 Decrypt Message</button>
                <button id="clearButton">🗑️ Clear All</button>
            </div>

            <div id="messageContainer"></div>
        </div>
    </div>

    <script>
        // Decrypt button handler
        document.getElementById('decryptButton').addEventListener('click', async function() {
            const messageContainer = document.getElementById('messageContainer');
            messageContainer.innerHTML = '';

            try {
                // Get user inputs
                const method = document.getElementById('encryptionMethod').value;
                const keyFormat = document.getElementById('keyFormat').value;
                const keyInput = document.getElementById('key').value.trim();
                const ivFormat = document.getElementById('ivFormat').value;
                const ivInput = document.getElementById('iv').value.trim();
                const messageFormat = document.getElementById('messageFormat').value;
                const encryptedMessage = document.getElementById('encryptedMessage').value.trim();

                // Validation
                if (!keyInput || !ivInput || !encryptedMessage) {
                    throw new Error('All fields are required.');
                }

                // Convert inputs to bytes
                const keyBytes = convertToBytes(keyInput, keyFormat);
                const ivBytes = convertToBytes(ivInput, ivFormat);
                const encryptedBytes = convertToBytes(encryptedMessage, messageFormat);

                // Determine required key length for AES (128, 192, or 256 bits)
                const keyLength = getAppropriateKeyLength(keyBytes.length);
                const adjustedKey = adjustKeyLength(keyBytes, keyLength);

                // Determine required IV length
                const ivLength = getRequiredIVLength(method);
                const adjustedIV = adjustKeyLength(ivBytes, ivLength);

                // Decrypt the message
                const decryptedMessage = await decryptMessage(method, adjustedKey, adjustedIV, encryptedBytes);

                // Display in chat box
                const chatBox = document.getElementById('chatBox');
                const messageElement = document.createElement('div');
                messageElement.classList.add('message');
                messageElement.innerHTML = `
                    <div class="message-row"><strong>Method:</strong> ${method}</div>
                    <div class="message-row"><strong>Key Length:</strong> ${adjustedKey.length * 8}-bit</div>
                    <div class="message-row"><strong>Key Format:</strong> ${keyFormat.toUpperCase()}</div>
                    <div class="message-row"><strong>Key:</strong> ${keyInput.substring(0, 80)}${keyInput.length > 80 ? '...' : ''}</div>
                    <div class="message-row"><strong>IV Length:</strong> ${adjustedIV.length * 8}-bit</div>
                    <div class="message-row"><strong>IV Format:</strong> ${ivFormat.toUpperCase()}</div>
                    <div class="message-row"><strong>IV/Nonce:</strong> ${ivInput.substring(0, 80)}${ivInput.length > 80 ? '...' : ''}</div>
                    <div class="message-row"><strong>Message Format:</strong> ${messageFormat.toUpperCase()}</div>
                    <div class="message-row"><strong>Encrypted Message:</strong> ${encryptedMessage.substring(0, 60)}${encryptedMessage.length > 60 ? '...' : ''}</div>
                    <div class="message-row"><strong>Decrypted Message:</strong> ${decryptedMessage}</div>
                `;
                chatBox.appendChild(messageElement);
                chatBox.scrollTop = chatBox.scrollHeight;

                messageContainer.innerHTML = '<div class="success-message">✅ Decryption successful!</div>';

            } catch (error) {
                messageContainer.innerHTML = `<div class="error-message">❌ Decryption failed: ${error.message}</div>`;
                console.error('Decryption error:', error);
            }
        });

        // Clear button handler
        document.getElementById('clearButton').addEventListener('click', function() {
            document.getElementById('key').value = '';
            document.getElementById('iv').value = '';
            document.getElementById('encryptedMessage').value = '';
            document.getElementById('chatBox').innerHTML = '';
            document.getElementById('messageContainer').innerHTML = '';
        });

        // Convert input to bytes based on format
        function convertToBytes(input, format) {
            switch(format) {
                case 'hex':
                    return hexToBytes(input);
                case 'base64':
                    return base64ToBytes(input);
                case 'utf8':
                    return utf8ToBytes(input);
                case 'raw':
                    return rawToBytes(input);
                default:
                    throw new Error('Unsupported format');
            }
        }

        // Get appropriate AES key length
        function getAppropriateKeyLength(currentLength) {
            if (currentLength <= 16) return 16; // 128-bit
            if (currentLength <= 24) return 24; // 192-bit
            return 32; // 256-bit
        }

        // Get required IV length for encryption method
        function getRequiredIVLength(method) {
            switch(method) {
                case 'AES-CBC':
                    return 16; // 128-bit
                case 'AES-GCM':
                    return 12; // 96-bit (recommended)
                case 'AES-CTR':
                    return 16; // 128-bit
                default:
                    return 16;
            }
        }

        // Adjust key/IV length (pad with zeros or truncate)
        function adjustKeyLength(bytes, targetLength) {
            if (bytes.length === targetLength) {
                return bytes;
            } else if (bytes.length < targetLength) {
                // Pad with zeros
                const padded = new Uint8Array(targetLength);
                padded.set(bytes);
                return padded;
            } else {
                // Truncate
                return bytes.slice(0, targetLength);
            }
        }

        // Main decryption function
        async function decryptMessage(method, keyBytes, ivBytes, encryptedBytes) {
            let algorithm;
            
            switch(method) {
                case 'AES-CBC':
                    algorithm = { name: "AES-CBC", iv: ivBytes };
                    break;
                case 'AES-GCM':
                    algorithm = { name: "AES-GCM", iv: ivBytes };
                    break;
                case 'AES-CTR':
                    algorithm = { name: "AES-CTR", counter: ivBytes, length: 64 };
                    break;
                default:
                    throw new Error('Unsupported encryption method');
            }

            const cryptoKey = await window.crypto.subtle.importKey(
                "raw", 
                keyBytes, 
                { name: algorithm.name }, 
                false, 
                ["decrypt"]
            );

            const decrypted = await window.crypto.subtle.decrypt(
                algorithm, 
                cryptoKey, 
                encryptedBytes
            );

            return new TextDecoder().decode(decrypted);
        }

        // Conversion helper functions
        function hexToBytes(hex) {
            hex = hex.replace(/\s/g, '').replace(/[^0-9a-fA-F]/g, '');
            const bytes = [];
            for (let i = 0; i < hex.length; i += 2) {
                bytes.push(parseInt(hex.substr(i, 2), 16));
            }
            return new Uint8Array(bytes);
        }

        function base64ToBytes(base64) {
            const binaryString = atob(base64);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            return bytes;
        }

        function utf8ToBytes(text) {
            return new TextEncoder().encode(text);
        }

        function rawToBytes(raw) {
            const numbers = raw.split(',').map(n => parseInt(n.trim()));
            return new Uint8Array(numbers);
        }

        // Allow Ctrl+Enter to trigger decryption
        document.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && e.ctrlKey) {
                document.getElementById('decryptButton').click();
            }
        });
    </script>

</body>
</html>
