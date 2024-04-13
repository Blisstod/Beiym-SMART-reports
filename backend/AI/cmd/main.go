package main

import (
	"flag"
	"log/slog"
	"net/http"
	"os"
	"time"
)

type application struct {
	logger *slog.Logger
}

func main() {
	addr := flag.String("addr", ":8080", "HTTP network address")
	flag.Parse()
	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))
	app := &application{logger: logger}
	srv := &http.Server{
		Addr:         *addr,
		Handler:      app.routes(),
		ErrorLog:     slog.NewLogLogger(logger.Handler(), slog.LevelError),
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	logger.Info("starting server", "addr", srv.Addr)

	go func() {
		err := srv.ListenAndServe()
		if err != nil {
			logger.Error(err.Error())
			os.Exit(1)
		}
	}()

}
