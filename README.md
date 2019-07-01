# Test HTTP / HTTPS Server

Creates a test server for the purpose of testing HTTP Headers and SNI properties.

- `docker build -t test-sni .`
- `docker run -it -p 3080:3080 -p 3443:3443 test-sni`

## HTTP

Server returns JSON object with client request headers.

## HTTPS

Server returns JSON object with client request headers and SNI (servername) value.

Docker image automatically generates a self-signed certificate for `example.com`.