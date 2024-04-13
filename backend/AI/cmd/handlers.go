package main

import (
	errs "AI/internal/errors"
	"AI/internal/models/student"
	teacher "AI/internal/models/teacher"
	"encoding/json"
	"errors"
	"net/http"
)

func (app *application) teacherReview(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		app.logger.Error("Invalid request method", "method", r.Method)
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}
	var request teacher.TeacherRequest

	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		app.logger.Error("Error decoding JSON", "error", err)
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	teacherRepo := teacher.NewTeacherRepository(app.logger)

	response, err := teacherRepo.GetTeacherReview(request)
	if err != nil {
		app.logger.Error("Error getting teacher review", "error", err)
		switch {
		case errors.Is(err, errs.ErrorLoadingEnvFile):
			http.Error(w, "Error loading .env file", http.StatusInternalServerError)
		case errors.Is(err, errs.ErrorCreatingGeminiClient):
			http.Error(w, "Error creating Gemini client", http.StatusInternalServerError)
		case errors.Is(err, errs.ErrorGeneratingContent):
			http.Error(w, "Error generating content", http.StatusInternalServerError)
		case errors.Is(err, errs.ErrorNoContentGenerated):
			http.Error(w, "No content generated", http.StatusInternalServerError)
		case errors.Is(err, errs.ErrorInvalidSubject):
			http.Error(w, "Invalid subject", http.StatusBadRequest)
		default:
			http.Error(w, "Something went wrong", http.StatusInternalServerError)
		}
		return
	}

	w.Header().Set("Content-Type", "text/plain")
	w.Write([]byte(response))
}

func (app *application) teacherPredict(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		app.logger.Error("Invalid request method", "method", r.Method)
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}
	var request teacher.TeacherRequest

	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		app.logger.Error("Error decoding JSON", "error", err)
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	teacherRepo := teacher.NewTeacherRepository(app.logger)

	response, err := teacherRepo.GetTeacherPredict(request)
	if err != nil {
		app.logger.Error("Error getting teacher predict", "error", err)
		switch {
		case errors.Is(err, errs.ErrorLoadingEnvFile):
			http.Error(w, "Error loading .env file", http.StatusInternalServerError)
		case errors.Is(err, errs.ErrorCreatingGeminiClient):
			http.Error(w, "Error creating Gemini client", http.StatusInternalServerError)
		case errors.Is(err, errs.ErrorGeneratingContent):
			http.Error(w, "Error generating content", http.StatusInternalServerError)
		case errors.Is(err, errs.ErrorNoContentGenerated):
			http.Error(w, "No content generated", http.StatusInternalServerError)
		case errors.Is(err, errs.ErrorInvalidSubject):
			http.Error(w, "Invalid subject", http.StatusBadRequest)
		default:
			http.Error(w, "Something went wrong", http.StatusInternalServerError)
		}
		return
	}

	w.Header().Set("Content-Type", "text/plain")
	w.Write([]byte(response))
}

func (app *application) getStudentOverallReview(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		app.logger.Error("Invalid request method", "method", r.Method)
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}
	var request student.StudentRequest

	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		app.logger.Error("Error decoding JSON", "error", err)
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	studentRepo := student.NewStudentRepository(app.logger)

	response, err := studentRepo.GetStudentOverallReview(request)
	if err != nil {
		app.logger.Error("Error getting student overall review", "error", err)
		switch {
		case errors.Is(err, errs.ErrorLoadingEnvFile):
			http.Error(w, "Error loading .env file", http.StatusInternalServerError)
		case errors.Is(err, errs.ErrorCreatingGeminiClient):
			http.Error(w, "Error creating Gemini client", http.StatusInternalServerError)
		case errors.Is(err, errs.ErrorGeneratingContent):
			http.Error(w, "Error generating content", http.StatusInternalServerError)
		case errors.Is(err, errs.ErrorNoContentGenerated):
			http.Error(w, "No content generated", http.StatusInternalServerError)
		case errors.Is(err, errs.ErrorInvalidSubject):
			http.Error(w, "Invalid subject", http.StatusBadRequest)
		default:
			http.Error(w, "Something went wrong", http.StatusInternalServerError)
		}
		return
	}

	w.Header().Set("Content-Type", "text/plain")
	w.Write([]byte(response))
}

func (app *application) getStudentSubjectReview(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		app.logger.Error("Invalid request method", "method", r.Method)
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}
	var request student.StudentSubjectRequest

	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		app.logger.Error("Error decoding JSON", "error", err)
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	studentRepo := student.NewStudentRepository(app.logger)

	response, err := studentRepo.GetStudentSubjectReview(request)
	if err != nil {
		app.logger.Error("Error getting student subject review", "error", err)
		switch {
		case errors.Is(err, errs.ErrorLoadingEnvFile):
			http.Error(w, "Error loading .env file", http.StatusInternalServerError)
		case errors.Is(err, errs.ErrorCreatingGeminiClient):
			http.Error(w, "Error creating Gemini client", http.StatusInternalServerError)
		case errors.Is(err, errs.ErrorGeneratingContent):
			http.Error(w, "Error generating content", http.StatusInternalServerError)
		case errors.Is(err, errs.ErrorNoContentGenerated):
			http.Error(w, "No content generated", http.StatusInternalServerError)
		case errors.Is(err, errs.ErrorInvalidSubject):
			http.Error(w, "Invalid subject", http.StatusBadRequest)
		default:
			http.Error(w, "Something went wrong", http.StatusInternalServerError)
		}
		return
	}

	w.Header().Set("Content-Type", "text/plain")
	w.Write([]byte(response))
}

func (app *application) getStudentOverallPredict(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		app.logger.Error("Invalid request method", "method", r.Method)
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}
	var request student.StudentRequest

	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		app.logger.Error("Error decoding JSON", "error", err)
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	studentRepo := student.NewStudentRepository(app.logger)

	response, err := studentRepo.GetStudentOverallPredict(request)
	if err != nil {
		app.logger.Error("Error getting student overall predict", "error", err)
		switch {
		case errors.Is(err, errs.ErrorLoadingEnvFile):
			http.Error(w, "Error loading .env file", http.StatusInternalServerError)
		case errors.Is(err, errs.ErrorCreatingGeminiClient):
			http.Error(w, "Error creating Gemini client", http.StatusInternalServerError)
		case errors.Is(err, errs.ErrorGeneratingContent):
			http.Error(w, "Error generating content", http.StatusInternalServerError)
		case errors.Is(err, errs.ErrorNoContentGenerated):
			http.Error(w, "No content generated", http.StatusInternalServerError)
		case errors.Is(err, errs.ErrorInvalidSubject):
			http.Error(w, "Invalid subject", http.StatusBadRequest)
		default:
			http.Error(w, "Something went wrong", http.StatusInternalServerError)
		}
		return
	}

	w.Header().Set("Content-Type", "text/plain")
	w.Write([]byte(response))
}

func (app *application) getStudentSubjectPredict(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		app.logger.Error("Invalid request method", "method", r.Method)
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}
	var request student.StudentSubjectRequest

	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		app.logger.Error("Error decoding JSON", "error", err)
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	studentRepo := student.NewStudentRepository(app.logger)

	response, err := studentRepo.GetStudentSubjectPredict(request)
	if err != nil {
		app.logger.Error("Error getting student subject predict", "error", err)
		switch {
		case errors.Is(err, errs.ErrorLoadingEnvFile):
			http.Error(w, "Error loading .env file", http.StatusInternalServerError)
		case errors.Is(err, errs.ErrorCreatingGeminiClient):
			http.Error(w, "Error creating Gemini client", http.StatusInternalServerError)
		case errors.Is(err, errs.ErrorGeneratingContent):
			http.Error(w, "Error generating content", http.StatusInternalServerError)
		case errors.Is(err, errs.ErrorNoContentGenerated):
			http.Error(w, "No content generated", http.StatusInternalServerError)
		case errors.Is(err, errs.ErrorInvalidSubject):
			http.Error(w, "Invalid subject", http.StatusBadRequest)
		default:
			http.Error(w, "Something went wrong", http.StatusInternalServerError)
		}
		return
	}

	w.Header().Set("Content-Type", "text/plain")
	w.Write([]byte(response))
}
