package errors

import "errors"

var (
	ErrorLoadingEnvFile       = errors.New("error loading .env file")
	ErrorCreatingGeminiClient = errors.New("error creating Gemini client")
	ErrorGeneratingContent    = errors.New("error generating content")
	ErrorNoContentGenerated   = errors.New("no content generated")
	ErrorInvalidSubject       = errors.New("invalid subject	")
	ErrorMissingApiKey        = errors.New("missing API_KEY environment variable")
)
