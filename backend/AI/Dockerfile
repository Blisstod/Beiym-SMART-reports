FROM golang:latest

WORKDIR /app/go

COPY . /app/go

RUN go mod download 

CMD [ "go", "run", "./cmd"]