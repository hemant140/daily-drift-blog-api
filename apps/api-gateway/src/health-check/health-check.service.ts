import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthCheckService {

    async check() {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
        };
    }

    generateHtml(status: 'ok' | 'fail', timestamp: string, errorMessage?: string) {
        const color = status === 'ok' ? 'green' : 'red';
        const statusText = status === 'ok' ? '✔️ OK' : '❌ FAILED';

        const formattedDate = new Date(timestamp).toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });

        return `
          <!DOCTYPE html>
          <html>
          <head>
            <title>Health Check</title>
            <style>
              body {
                display: flex;
                height: 100vh;
                justify-content: center;
                align-items: center;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f0f2f5;
                margin: 0;
              }
              .status-box {
                text-align: center;
                background: #ffffff;
                padding: 2rem 3rem;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
              }
              .status {
                font-size: 1.75rem;
                font-weight: bold;
                color: ${color};
                margin-bottom: 0.5rem;
              }
              .timestamp {
                font-size: 1rem;
                color: #555;
                margin-bottom: 1rem;
              }
              .error {
                color: #b00020;
                margin-top: 10px;
                font-size: 1rem;
                background-color: #ffe6e6;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                display: inline-block;
              }
            </style>
          </head>
          <body>
            <div class="status-box">
              <div class="status">Health Check Status: ${statusText}</div>
              <div class="timestamp">${formattedDate}</div>
              ${errorMessage ? `<div class="error">Error: ${errorMessage}</div>` : ''}
            </div>
          </body>
          </html>
        `;
    }

}
