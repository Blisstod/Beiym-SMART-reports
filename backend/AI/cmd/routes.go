package main

import (
	"net/http"
)

func (app *application) routes() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("/teacherReview", app.teacherReview)
	mux.HandleFunc("/teacherPredict", app.teacherPredict)

	mux.HandleFunc("/studentOverallReview", app.getStudentOverallReview)
	mux.HandleFunc("/studentOverallPredict", app.getStudentOverallPredict)

	mux.HandleFunc("/studentSubjectReview", app.getStudentSubjectReview)
	mux.HandleFunc("/studentSubjectPredict", app.getStudentSubjectPredict)
	return mux
}
