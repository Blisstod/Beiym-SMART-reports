package student

import (
	"context"
	"errors"
	"fmt"
	"log/slog"
	"os"
	"strings"

	"github.com/google/generative-ai-go/genai"
	"github.com/joho/godotenv"
	"google.golang.org/api/option"
)

var (
	ErrorLoadingEnvFile       = errors.New("error loading .env file")
	ErrorCreatingGeminiClient = errors.New("error creating Gemini client")
	ErrorGeneratingContent    = errors.New("error generating content")
	ErrorNoContentGenerated   = errors.New("no content generated")
	ErrorInvalidSubject       = errors.New("invalid subject")
)

type StudentRepository struct {
	logger *slog.Logger
}

func NewStudentRepository(logger *slog.Logger) *StudentRepository {
	return &StudentRepository{
		logger: logger,
	}
}

func (StudentRepo *StudentRepository) GetStudentOverallReview(SR StudentRequest) (string, error) {
	ctx := context.Background()

	err := godotenv.Load(".env")
	if err != nil {
		StudentRepo.logger.Error("Error loading .env file", "error", err)
		return "", ErrorLoadingEnvFile
	}
	apiKey := os.Getenv("API_KEY")
	if apiKey == "" {
		return "", errors.New("missing API_KEY environment variable")
	}

	client, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		StudentRepo.logger.Error("Error creating Gemini client", "error", err)
		return "", ErrorCreatingGeminiClient
	}
	defer client.Close()

	model := client.GenerativeModel("gemini-pro")

	promt, err := getStudentOverallReviewPrompt(SR)
	if err != nil {
		StudentRepo.logger.Error("Error getting prompt", "error", err)
		return "", ErrorInvalidSubject
	}
	resp, err := model.GenerateContent(ctx, genai.Text(promt))
	if err != nil {
		StudentRepo.logger.Error("Error generating content", "error", err)
		return "", ErrorGeneratingContent
	}

	if len(resp.Candidates) == 0 || len(resp.Candidates[0].Content.Parts) == 0 {
		return "", ErrorNoContentGenerated
	}

	var result strings.Builder
	for _, part := range resp.Candidates[0].Content.Parts {
		result.WriteString(fmt.Sprintf("%v", part))
	}

	return result.String(), nil
}

func (StudentRepo *StudentRepository) GetStudentOverallPredict(SR StudentRequest) (string, error) {
	ctx := context.Background()

	err := godotenv.Load(".env")
	if err != nil {
		StudentRepo.logger.Error("Error loading .env file", "error", err)
		return "", ErrorLoadingEnvFile
	}
	apiKey := os.Getenv("API_KEY")
	if apiKey == "" {
		return "", errors.New("missing API_KEY environment variable")
	}

	client, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		StudentRepo.logger.Error("Error creating Gemini client", "error", err)
		return "", ErrorCreatingGeminiClient
	}
	defer client.Close()

	model := client.GenerativeModel("gemini-pro")

	promt, err := getStudentOverallPredictPrompt(SR)
	if err != nil {
		StudentRepo.logger.Error("Error getting prompt", "error", err)
		return "", ErrorInvalidSubject
	}
	resp, err := model.GenerateContent(ctx, genai.Text(promt))
	if err != nil {
		StudentRepo.logger.Error("Error generating content", "error", err)
		return "", ErrorGeneratingContent
	}

	if len(resp.Candidates) == 0 || len(resp.Candidates[0].Content.Parts) == 0 {
		return "", ErrorNoContentGenerated
	}

	var result strings.Builder
	for _, part := range resp.Candidates[0].Content.Parts {
		result.WriteString(fmt.Sprintf("%v", part))
	}

	return result.String(), nil
}

func (StudentRepo *StudentRepository) GetStudentSubjectReview(SSR StudentSubjectRequest) (string, error) {
	ctx := context.Background()

	err := godotenv.Load(".env")
	if err != nil {
		StudentRepo.logger.Error("Error loading .env file", "error", err)
		return "", ErrorLoadingEnvFile
	}
	apiKey := os.Getenv("API_KEY")
	if apiKey == "" {
		return "", errors.New("missing API_KEY environment variable")
	}

	client, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		StudentRepo.logger.Error("Error creating Gemini client", "error", err)
		return "", ErrorCreatingGeminiClient
	}
	defer client.Close()

	model := client.GenerativeModel("gemini-pro")

	promt, err := getStudentSubjectPrompt(SSR)
	if err != nil {
		StudentRepo.logger.Error("Error getting prompt", "error", err)
		return "", ErrorInvalidSubject
	}
	resp, err := model.GenerateContent(ctx, genai.Text(promt))
	if err != nil {
		StudentRepo.logger.Error("Error generating content", "error", err)
		return "", ErrorGeneratingContent
	}

	if len(resp.Candidates) == 0 || len(resp.Candidates[0].Content.Parts) == 0 {
		return "", ErrorNoContentGenerated
	}

	var result strings.Builder
	for _, part := range resp.Candidates[0].Content.Parts {
		result.WriteString(fmt.Sprintf("%v", part))
	}

	return result.String(), nil
}

func (StudentRepo *StudentRepository) GetStudentSubjectPredict(SSR StudentSubjectRequest) (string, error) {
	ctx := context.Background()

	err := godotenv.Load(".env")
	if err != nil {
		StudentRepo.logger.Error("Error loading .env file", "error", err)
		return "", ErrorLoadingEnvFile
	}
	apiKey := os.Getenv("API_KEY")
	if apiKey == "" {
		return "", errors.New("missing API_KEY environment variable")
	}

	client, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		StudentRepo.logger.Error("Error creating Gemini client", "error", err)
		return "", ErrorCreatingGeminiClient
	}
	defer client.Close()

	model := client.GenerativeModel("gemini-pro")

	promt, err := getStudentSubjectPredictPrompt(SSR)
	if err != nil {
		StudentRepo.logger.Error("Error getting prompt", "error", err)
		return "", ErrorInvalidSubject
	}
	resp, err := model.GenerateContent(ctx, genai.Text(promt))
	if err != nil {
		StudentRepo.logger.Error("Error generating content", "error", err)
		return "", ErrorGeneratingContent
	}

	if len(resp.Candidates) == 0 || len(resp.Candidates[0].Content.Parts) == 0 {
		return "", ErrorNoContentGenerated
	}

	var result strings.Builder
	for _, part := range resp.Candidates[0].Content.Parts {
		result.WriteString(fmt.Sprintf("%v", part))
	}

	return result.String(), nil
}

func getStudentOverallReviewPrompt(SR StudentRequest) (string, error) {
	recipient := SR.Recipient
	name := SR.Name
	date := SR.Date
	totalScore := SR.TotalScore
	subjectScores := SR.SubjectScores
	previousResults := SR.PreviousResults
	differenceWithPrevious := SR.DifferenceWithPrevious
	goal := SR.Goal
	time := SR.Time
	subject1 := SR.Subject1
	subject2 := SR.Subject2
	prompt := fmt.Sprintf(`
		Напиши анализ для ученика на основе результатов его экзамена, напиши просто 1 блок текста с чистым анализом,
		учти все предыдущие результаты, добавь цифр и процентов, в конце скажи что-нибудь приятное или мотивационное. 
		
		ОБЯЗАТЕЛЬНО ПИШИ ПО ДАННОМУ ШАБЛОНУ, НИЧЕГО НЕ ПРОПУСКАЙ И НЕ ПРИДУМЫВАЙ НИЧЕГО ИЗ СЕБЯ:

		Привет, [ученик].

		Сравнив результаты этого и предыдущего экзамена, можно отметить следующее:

	    Общий анализ:
	        Твой общий балл на текущем экзамене составил [текущий балл], в то время как на предыдущем экзамене он был [предыдущий балл]. Это снижение/увеличение на [разница в процентах] относительно предыдущего экзамена.

	    По предметам:
	        Математическая грамотность: [Текущий балл по математической грамотности] (предыдущий: [предыдущий балл]).
	        Грамотность чтения: [Текущий балл по грамотности чтения] (предыдущий: [предыдущий балл]).
	        История Казахстана: [Текущий балл по истории Казахстана] (предыдущий: [предыдущий балл]).
	        {1 профильный предмет, ПРИМЕР: Математика}: [Текущий балл по 1 профильному предмету] (предыдущий: [предыдущий балл]).
	        {2 профильный предмет, ПРИМЕР: Физика}: [Текущий балл по 2 профильному предмету] (предыдущий: [предыдущий балл]).

	    Общая оценка за все время:
	        За период времени с предыдущего экзамена стоит отметить следующее: [введите общую оценку за все время, учитывая все предыдущие результаты].

		Этот отчет позволяет проанализировать твои текущие достижения и сравнить их с предыдущими результатами, что может помочь в дальнейшем планировании обучения и поддержке.

		Входные данные:

		Получатель: %v

		Имя: %v

		Дата: %v

		Результаты экзамена ЕНТ:


		Общий балл : %v из 140 

		Разница с предыдущим экзаменом: %v -  %v; %v
		
		Баллы по предметам:
		- Математическая грамотность: %v из 10
		- Грамотность чтения: %v из 10
		- История Казахстана: %v из 20
		- %v: %v из 50
		- %v: %v из 50

		Предыдущие результаты слева направо с 1 по последний экзамен:
		`, recipient, name, date, totalScore, differenceWithPrevious.ScoreDifference[0], differenceWithPrevious.ScoreDifference[1],
		differenceWithPrevious.PercentageChange, subjectScores["mathematical_literacy"], subjectScores["reading_literacy"],
		subjectScores["history_of_Kazakhstan"], subject1[0], subjectScores[subject1[1]], subject2[0], subjectScores[subject2[1]])

	for subject, results := range previousResults {
		switch subject {
		case "total_score":
			prompt += fmt.Sprintf(`%v: `, "Общий балл")
		case "mathematical_literacy":
			prompt += fmt.Sprintf(`%v: `, "Математическая грамотность")
		case "reading_literacy":
			prompt += fmt.Sprintf(`%v: `, "Грамотность чтения")
		case "history_of_Kazakhstan":
			prompt += fmt.Sprintf(`%v: `, "История Казахстана")
		case "mathematics":
			prompt += fmt.Sprintf(`%v: `, "Математика")
		case "physics":
			prompt += fmt.Sprintf(`%v: `, "Физика")
		case "geography":
			prompt += fmt.Sprintf(`%v: `, "География")
		case "chemisSRy":
			prompt += fmt.Sprintf(`%v: `, "Химия")
		case "biology":
			prompt += fmt.Sprintf(`%v: `, "Биология")
		default:
			return "", ErrorInvalidSubject
		}
		for _, result := range results {
			prompt += fmt.Sprintf(`%v, `, result)
		}
		prompt += "\n	"
	}

	if goal.Achieved {
		prompt += fmt.Sprintf(`
	Цель %v баллов достигнута
	`, goal.TargetScore)
	} else {
		prompt += fmt.Sprintf(`
	Цель %v баллов не достигнута
	`, goal.TargetScore)
	}
	prompt += fmt.Sprintf(`
	Время с предыдущего экзамена: %v дней
	`, time)

	return prompt, nil
}

func getStudentOverallPredictPrompt(SR StudentRequest) (string, error) {
	recipient := SR.Recipient
	name := SR.Name
	date := SR.Date
	totalScore := SR.TotalScore
	subjectScores := SR.SubjectScores
	previousResults := SR.PreviousResults
	differenceWithPrevious := SR.DifferenceWithPrevious
	goal := SR.Goal
	time := SR.Time
	subject1 := SR.Subject1
	subject2 := SR.Subject2
	prompt := fmt.Sprintf(`
	Напиши прогноз на будущее для ученика на основе результатов его экзамена, напиши просто 1 блок текста с чистым анализом и прогнозом,
	учти все предыдущие результаты, добавь цифр и процентов, в конце скажи что-нибудь приятное или мотивационное. 
	
	ОБЯЗАТЕЛЬНО ПИШИ ПО ДАННОМУ ШАБЛОНУ, НИЧЕГО НЕ ПРОПУСКАЙ И НЕ ПРИДУМЫВАЙ НИЧЕГО ИЗ СЕБЯ:


	Привет, [Ученик].

	Исходя из текущих результатов и предыдущих тенденций, можно сделать следующий прогноз на следующий экзамен:

	Общий прогноз:
		Средний балл класса на следующем экзамене ожидается на уровне [предполагаемый балл]. Учитывая текущий тренд роста/снижения, есть вероятность улучшения/ухудшения результатов на [процент изменения] относительно предыдущего экзамена.

	Прогноз по предметам:
		Математическая грамотность: Ожидается достижение балла около [предполагаемый балл по математической грамотности].
		Грамотность чтения: Предполагается, что балл будет около [предполагаемый балл по грамотности чтения].
		История Казахстана: Прогнозируется достижение балла в районе [предполагаемый балл по истории Казахстана].
		{1 профильный предмет}: Ожидается улучшение/ухудшение результатов с текущего уровня [текущий балл по {1 профильный предмет}], возможно, до [предполагаемый балл по {1 профильный предмет}].
		{2 профильный предмет}: Предполагается улучшение/ухудшение результатов с текущего уровня [текущий балл по {2 профильный предмет}], возможно, до [предполагаемый балл по {2 профильный предмет}].

	Общая оценка:
		В целом, ожидается [оптимистическая/пессимистическая] динамика развития твоих учебных достижений на следующем экзамене. 
	Входные данные:

		Получатель: %v

		Имя: %v

		Дата: %v

		Результаты экзамена ЕНТ:


		Общий балл : %v из 140 

		Разница с предыдущим экзаменом: %v -  %v; %v
		
		Баллы по предметам:
		- Математическая грамотность: %v из 10
		- Грамотность чтения: %v из 10
		- История Казахстана: %v из 20
		- %v: %v из 50
		- %v: %v из 50

		Предыдущие результаты слева направо с 1 по последний экзамен:
		`, recipient, name, date, totalScore, differenceWithPrevious.ScoreDifference[0], differenceWithPrevious.ScoreDifference[1],
		differenceWithPrevious.PercentageChange, subjectScores["mathematical_literacy"], subjectScores["reading_literacy"],
		subjectScores["history_of_Kazakhstan"], subject1[0], subjectScores[subject1[1]], subject2[0], subjectScores[subject2[1]])

	for subject, results := range previousResults {
		switch subject {
		case "total_score":
			prompt += fmt.Sprintf(`%v: `, "Общий балл")
		case "mathematical_literacy":
			prompt += fmt.Sprintf(`%v: `, "Математическая грамотность")
		case "reading_literacy":
			prompt += fmt.Sprintf(`%v: `, "Грамотность чтения")
		case "history_of_Kazakhstan":
			prompt += fmt.Sprintf(`%v: `, "История Казахстана")
		case "mathematics":
			prompt += fmt.Sprintf(`%v: `, "Математика")
		case "physics":
			prompt += fmt.Sprintf(`%v: `, "Физика")
		case "geography":
			prompt += fmt.Sprintf(`%v: `, "География")
		case "chemisSRy":
			prompt += fmt.Sprintf(`%v: `, "Химия")
		case "biology":
			prompt += fmt.Sprintf(`%v: `, "Биология")
		default:
			return "", ErrorInvalidSubject
		}
		for _, result := range results {
			prompt += fmt.Sprintf(`%v, `, result)
		}
		prompt += "\n	"
	}

	if goal.Achieved {
		prompt += fmt.Sprintf(`
	Цель %v баллов достигнута
	`, goal.TargetScore)
	} else {
		prompt += fmt.Sprintf(`
	Цель %v баллов не достигнута
	`, goal.TargetScore)
	}
	prompt += fmt.Sprintf(`
	Время с предыдущего экзамена: %v дней
	`, time)

	return prompt, nil
}

func getStudentSubjectPrompt(SSR StudentSubjectRequest) (string, error) {
	recipient := SSR.Recipient
	name := SSR.Name
	date := SSR.Date
	subject := SSR.Subject
	totalScore := SSR.TotalScore
	previousResults := SSR.PreviousResults
	differenceWithPreviousExam := SSR.DifferenceWithPreviousExam
	goal := SSR.Goal
	time := SSR.Time
	percentages := SSR.Percentages
	prompt := fmt.Sprintf(`
	Напиши анализ для ученика на основе результатов его результатов одного предмета, напиши просто 1 блок текста с чистым анализом,
	учти все предыдущие результаты, добавь цифр и процентов, в конце скажи что-нибудь приятное или мотивационное. 
	
	ОБЯЗАТЕЛЬНО ПИШИ ПО ДАННОМУ ШАБЛОНУ, НИЧЕГО НЕ ПРОПУСКАЙ И НЕ ПРИДУМЫВАЙ НИЧЕГО ИЗ СЕБЯ:

	Привет, [ученик].

	Сравнив результаты этого и предыдущего экзамена, можно отметить следующее:

	Общий анализ:
		Твой балл за {предмет} на текущем экзамене составил [текущий балл], в то время как на предыдущем экзамене он был [предыдущий балл]. Это снижение/увеличение на [разница в процентах] относительно предыдущего экзамена.

	
	Общая оценка за все время:
		За период времени с предыдущего экзамена стоит отметить следующее: [введите общую оценку за все время, учитывая все предыдущие результаты].

	Этот отчет позволяет проанализировать твои текущие достижения и сравнить их с предыдущими результатами, что может помочь в дальнейшем планировании обучения и поддержке.

		Входные данные:

		Получатель: %v

		Имя: %v

		Дата: %v

		Результаты экзамена ЕНТ:

		Балл за предмет : %v из %v 

		Разница с предыдущим экзаменом: %v -  %v; %v
		
		Проценты:
		31-40 Баллов: %v
		41-50 Баллов: %v
		21-30 Баллов: %v
		 0-20 Баллов: %v
		

		Предыдущие результаты слева направо с 1 по последний экзамен:
		%v: %v
		`, recipient, name, date, totalScore[0], totalScore[1], differenceWithPreviousExam.ScoreDifference[0], differenceWithPreviousExam.ScoreDifference[1],
		differenceWithPreviousExam.PercentageChange, percentages["31-40"], percentages["41-50"], percentages["21-30"], percentages["0-20"],
		subject, previousResults)

	if goal.Achieved {
		prompt += fmt.Sprintf(`
	Цель %v баллов достигнута
	`, goal.TargetScore)
	} else {
		prompt += fmt.Sprintf(`
	Цель %v баллов не достигнута
	`, goal.TargetScore)
	}
	prompt += fmt.Sprintf(`
	Время с предыдущего экзамена: %v дней
	`, time)

	return prompt, nil
}

func getStudentSubjectPredictPrompt(SSR StudentSubjectRequest) (string, error) {
	recipient := SSR.Recipient
	name := SSR.Name
	date := SSR.Date
	subject := SSR.Subject
	totalScore := SSR.TotalScore
	previousResults := SSR.PreviousResults
	differenceWithPreviousExam := SSR.DifferenceWithPreviousExam
	goal := SSR.Goal
	time := SSR.Time
	percentages := SSR.Percentages
	prompt := fmt.Sprintf(`
	Напиши прогноз на будущее по определенному предмету для ученика на основе результатов его экзамена, напиши просто 1 блок текста с чистым анализом и прогнозом,
	учти все предыдущие результаты, добавь цифр и процентов, в конце скажи что-нибудь приятное или мотивационное. 
	
	ОБЯЗАТЕЛЬНО ПИШИ ПО ДАННОМУ ШАБЛОНУ, НИЧЕГО НЕ ПРОПУСКАЙ И НЕ ПРИДУМЫВАЙ НИЧЕГО ИЗ СЕБЯ:


	Привет, [Ученик].

	Исходя из текущих результатов и предыдущих тенденций, можно сделать следующий прогноз на следующий экзамен:

	Общий прогноз:
		Балл за предмет {прдемет} на следующем экзамене ожидается на уровне [предполагаемый балл]. Учитывая текущий тренд роста/снижения, есть вероятность улучшения/ухудшения результатов на [процент изменения] относительно предыдущего экзамена.

	Общая оценка:
		В целом, ожидается [оптимистическая/пессимистическая] динамика развития твоих учебных достижений на следующем экзамене. 
	Входные данные:

		Входные данные:

		Получатель: %v

		Имя: %v

		Дата: %v

		Результаты экзамена ЕНТ:

		Балл за предмет : %v из %v 

		Разница с предыдущим экзаменом: %v -  %v; %v
		
		Проценты:
		31-40 Баллов: %v
		41-50 Баллов: %v
		21-30 Баллов: %v
		 0-20 Баллов: %v
		

		Предыдущие результаты слева направо с 1 по последний экзамен:
		%v: %v
		`, recipient, name, date, totalScore[0], totalScore[1], differenceWithPreviousExam.ScoreDifference[0], differenceWithPreviousExam.ScoreDifference[1],
		differenceWithPreviousExam.PercentageChange, percentages["31-40"], percentages["41-50"], percentages["21-30"], percentages["0-20"],
		subject, previousResults)

	if goal.Achieved {
		prompt += fmt.Sprintf(`
	Цель %v баллов достигнута
	`, goal.TargetScore)
	} else {
		prompt += fmt.Sprintf(`
	Цель %v баллов не достигнута
	`, goal.TargetScore)
	}
	prompt += fmt.Sprintf(`
	Время с предыдущего экзамена: %v дней
	`, time)

	return prompt, nil
}
