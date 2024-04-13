FROM golang:latest

WORKDIR /app/go

COPY . /app/go

EXPOSE 8080

RUN go mod download

CMD [ "go", "run", "main.go"]