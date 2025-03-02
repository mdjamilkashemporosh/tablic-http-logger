# HTTP Logger for Express.js & NestJS

A solid HTTP logger middleware for **Express.js** applications, fully compatible with **NestJS**. This logger provides customizable, detailed logs with fields such as timestamp, HTTP method, URL, status, response time, client IP, user-agent, and more. The log output is structured in a table-like format, allowing dynamic control over visible fields and timestamp formatting.

## Features
- Works seamlessly with both **Express.js** and **NestJS**.
- Logs detailed request information such as:
  - Timestamp
  - HTTP Method
  - URL
  - HTTP Status Code
  - Response Time
  - Client IP
  - User-Agent
  - Referrer
  - Response Size
  - HTTP Version
- Dynamic configuration to toggle the visibility of each field in the logs.
- Customizable timestamp format (`ISO` or `Locale Time`).
- Table-like log output with borders and styling for easy readability.

## Installation

You can install the logger middleware using npm or yarn:

```bash
npm install http-logger
```

## Available Configuration Options

You can customize the logger by passing options to the `createHttpLogger` function. Here's a list of available options and their explanations:

- **showTimestamp** (boolean, default: `true`): Display the timestamp in the log.
- **showMethod** (boolean, default: `true`): Display the HTTP method (GET, POST, etc.).
- **showUrl** (boolean, default: `true`): Display the requested URL.
- **showStatus** (boolean, default: `true`): Display the HTTP status code.
- **showResponseTime** (boolean, default: `true`): Display the response time in milliseconds.
- **showClientIP** (boolean, default: `true`): Display the client's IP address.
- **showUserAgent** (boolean, default: `true`): Display the user-agent string.
- **showReferrer** (boolean, default: `true`): Display the referrer (if available).
- **showResponseSize** (boolean, default: `true`): Display the response size.
- **showHttpVersion** (boolean, default: `true`): Display the HTTP version.
- **timeFormat** (string, default: `'iso'`): The format of the timestamp. Can be `'iso'` for ISO format or `'short'` for a more concise, human-readable local time.

## Example Log Output

![Screenshot 2025-03-02 at 11 29 00 PM](https://github.com/user-attachments/assets/c3bfcbe4-0a08-4cf9-92eb-c0d2be1487ad)

![Screenshot 2025-03-02 at 11 28 19 PM](https://github.com/user-attachments/assets/e17d4c33-6435-43fa-8cd2-77cc30a5b5bb)

## Usage in a Express.js App

```javascript
const express = require('express');
const { createHttpLogger } = require('http-logger');

const app = express();

// Use the logger middleware
app.use(createHttpLogger({
  showTimestamp: true,  // Default: true
  showMethod: true,     // Default: true
  showUrl: true,        // Default: true
  showStatus: true,     // Default: true
  showResponseTime: true, // Default: true
  showClientIP: true,   // Default: true
  showUserAgent: true,  // Default: true
  showReferrer: true,   // Default: true
  showResponseSize: true, // Default: true
  showHttpVersion: true, // Default: true
  timeFormat: 'iso',    // Default: 'iso' (Can be 'iso' or 'short')
}));

// Example route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

## Usage in a NestJS App

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { createHttpLogger } from 'http-logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.use(createHttpLogger({
    // You can customize the logger options here
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

## Contribution

We welcome contributions to improve this project! Here are some ways you can contribute:

- **Bug Fixes**: If you find a bug, please submit an issue on GitHub and, if possible, provide a fix in a pull request.
- **Feature Requests**: Have an idea for a new feature? Open an issue with a description of the feature, and we can discuss it.
- **Code Improvements**: Feel free to suggest or submit code improvements for better performance, cleaner code, etc.

### Steps to Contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes.
4. Run tests (if applicable) and ensure everything works as expected.
5. Create a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License.

## Issues

If you encounter any issues or have questions, please feel free to open an issue on GitHub. Make sure to include relevant information such as error messages, system environment, and steps to reproduce the issue.
