FROM ubuntu:16.04

RUN apt-get update && apt-get install openssl -y

WORKDIR /root
COPY ./csr-configuration.txt /root/csr-configuration.txt
RUN openssl ecparam -genkey -name prime256v1 -out key.pem
RUN openssl req -new -sha256 -key key.pem -out csr.csr -config ./csr-configuration.txt
RUN openssl req -x509 -sha256 -days 365 -key key.pem -in csr.csr -out certificate.pem

FROM node
RUN mkdir -p /src
WORKDIR /src
COPY --from=0 /root/key.pem /src
COPY --from=0 /root/certificate.pem /src
COPY ./index.js /src/index.js

EXPOSE 3080
EXPOSE 3443

ENTRYPOINT ["node", "index.js"]