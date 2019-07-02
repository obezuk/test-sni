# Test HTTP / HTTPS Server

Creates a test server for the purpose of testing HTTP Headers and SNI properties. This is useful for diagnosing differences in SNI / Host Headers which may occur when using Reverse Proxies.

## Quick Start

`docker run -p 80:3080 -p 443:3443 obezuk/test-sni`

## Build

- `docker build -t test-sni .`
- `docker run -it -p 3080:3080 -p 3443:3443 test-sni`

## Response

This server returns a JSON response with the client request headers and SNI property.

Docker image automatically generates a self-signed certificate for `example.com`.

### Example HTTP Response
`{"headers":{"host":"127.0.0.1:3080","user-agent":"curl/7.54.0","accept":"*/*"}}`

### Example HTTPS Response
`{"headers":{"host":"foo.com","user-agent":"curl/7.54.0","accept":"*/*"},"servername":"www.example.com"}`
