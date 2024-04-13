package teacher

import (
	errs "AI/internal/errors"
	"context"
	"fmt"
	"log/slog"
	"os"
	"strings"

	"github.com/google/generative-ai-go/genai"
	"github.com/joho/godotenv"
	"google.golang.org/api/option"
)

type teacherRepository struct {
	logger *slog.Logger
}

func NewTeacherRepository(logger *slog.Logger) *teacherRepository {
	return &teacherRepository{
		logger: logger,
	}
}

func (TeacherRepo *teacherRepository) GetTeacherReview(TR TeacherRequest) (string, error) {
	ctx := context.Background()

	err := godotenv.Load(".env")
	if err != nil {
		TeacherRepo.logger.Error("Error loading .env file", "error", err)
		return "", errs.ErrorLoadingEnvFile
	}
	apiKey := os.Getenv("API_KEY")
	if apiKey == "" {
		return "", errs.ErrorMissingApiKey
	}

	client, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		TeacherRepo.logger.Error("Error creating Gemini client", "error", err)
		return "", errs.ErrorCreatingGeminiClient
	}
	defer client.Close()

	model := client.GenerativeModel("gemini-pro")

	promt, err := getReviewPrompt(TR)
	if err != nil {
		TeacherRepo.logger.Error("Error getting prompt", "error", err)
		return "", err
	}
	resp, err := model.GenerateContent(ctx, genai.Text(promt))
	if err != nil {
		TeacherRepo.logger.Error("Error generating content", "error", err)
		return "", errs.ErrorGeneratingContent
	}

	if len(resp.Candidates) == 0 || len(resp.Candidates[0].Content.Parts) == 0 {
		return "", errs.ErrorNoContentGenerated
	}

	var result strings.Builder
	for _, part := range resp.Candidates[0].Content.Parts {
		result.WriteString(fmt.Sprintf("%v", part))
	}

	return result.String(), nil
}

func (TeacherRepo *teacherRepository) GetTeacherPredict(TR TeacherRequest) (string, error) {
	ctx := context.Background()

	err := godotenv.Load(".env")
	if err != nil {
		TeacherRepo.logger.Error("Error loading .env file", "error", err)
		return "", errs.ErrorLoadingEnvFile
	}
	apiKey := os.Getenv("API_KEY")
	if apiKey == "" {
		return "", errs.ErrorMissingApiKey
	}

	client, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		TeacherRepo.logger.Error("Error creating Gemini client", "error", err)
		return "", errs.ErrorCreatingGeminiClient
	}
	defer client.Close()

	model := client.GenerativeModel("gemini-pro")

	promt, err := getPredictPrompt(TR)
	if err != nil {
		TeacherRepo.logger.Error("Error getting predict prompt", "error", err)
		return "", err
	}
	resp, err := model.GenerateContent(ctx, genai.Text(promt))
	if err != nil {
		TeacherRepo.logger.Error("Error generating content", "error", err)
		return "", errs.ErrorGeneratingContent
	}

	if len(resp.Candidates) == 0 || len(resp.Candidates[0].Content.Parts) == 0 {
		return "", errs.ErrorNoContentGenerated
	}

	var result strings.Builder
	for _, part := range resp.Candidates[0].Content.Parts {
		result.WriteString(fmt.Sprintf("%v", part))
	}

	return result.String(), nil
}

func getReviewPrompt(TR TeacherRequest) (string, error) {
	recipient := TR.Recipient
	name := TR.Name
	date := TR.Date
	averageClassScore := TR.AverageClassScore
	subjectScores := TR.SubjectScores
	previousResults := TR.PreviousResults
	differenceWithPrevious := TR.DifferenceWithPrevious
	goal := TR.Goal
	time := TR.Time
	subject1 := TR.Subject1
	subject2 := TR.Subject2
	prompt := fmt.Sprintf(`
		Напиши анализ для учителя на основе результатов его учеников, напиши просто 1 блок текста с чистым анализом,
		учти все предыдущие результаты, добавь цифр и процентов, в конце скажи что-нибудь приятное или мотивационное. 
		
	ОБЯЗАТЕЛЬНО ПИШИ ПО ДАННОМУ ШАБЛОНУ, НИЧЕГО НЕ ПРОПУСКАЙ И НЕ ПРИДУМЫВАЙ НИЧЕГО ИЗ СЕБЯ:


		Здравствуйте, [учитель].

		Сравнив результаты этого и предыдущего экзамена, можно отметить следующее:

	    Общий анализ:
	        Средний балл класса на текущем экзамене составил [текущий балл], в то время как на предыдущем экзамене он был [предыдущий балл]. Это снижение/увеличение на [разница в процентах] относительно предыдущего экзамена.

	    По предметам:
	        Математическая грамотность: [Текущий балл по математической грамотности] (предыдущий: [предыдущий балл]).
	        Грамотность чтения: [Текущий балл по грамотности чтения] (предыдущий: [предыдущий балл]).
	        История Казахстана: [Текущий балл по истории Казахстана] (предыдущий: [предыдущий балл]).
	        {1 профильный предмет, ПРИМЕР: Математика}: [Текущий балл по 1 профильному предмету] (предыдущий: [предыдущий балл]).
	        {2 профильный предмет, ПРИМЕР: Физика}: [Текущий балл по 2 профильному предмету] (предыдущий: [предыдущий балл]).

	    Общая оценка за все время:
	        За период времени с предыдущего экзамена стоит отметить следующее: [введите общую оценку за все время, учитывая все предыдущие результаты].

		Этот отчет позволяет проанализировать текущие достижения учеников и сравнить их с предыдущими результатами, что может помочь в дальнейшем планировании обучения и поддержке учащихся.

		Входные данные:

		Получатель: %v

		Имя: %v

		Дата: %v

		Результаты экзамена ЕНТ:


		Средний балл класса: %v из 140

		Разница с предыдущим экзаменом: %v - %v; %v
		
		Баллы по предметам:
		- Математическая грамотность: %v из 10
		- Грамотность чтения: %v из 10
		- История Казахстана: %v из 20
		- %v: %v из 50
		- %v: %v из 50

		Предыдущие результаты слева направо с 1 по последний экзамен:
		`, recipient, name, date, averageClassScore, differenceWithPrevious.ScoreDifference[0], differenceWithPrevious.ScoreDifference[1],
		differenceWithPrevious.PercentageChange, subjectScores["mathematical_literacy"], subjectScores["reading_literacy"],
		subjectScores["history_of_Kazakhstan"], subject1[0], subjectScores[subject1[1]], subject2[0], subjectScores[subject2[1]])

	for subject, results := range previousResults {
		switch subject {
		case "average_score":
			prompt += fmt.Sprintf(`%v: `, "Средний балл класса")
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
		case "chemistry":
			prompt += fmt.Sprintf(`%v: `, "Химия")
		case "biology":
			prompt += fmt.Sprintf(`%v: `, "Биология")
		default:
			return "", errs.ErrorInvalidSubject
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

func getPredictPrompt(TR TeacherRequest) (string, error) {
	recipient := TR.Recipient
	name := TR.Name
	date := TR.Date
	averageClassScore := TR.AverageClassScore
	subjectScores := TR.SubjectScores
	previousResults := TR.PreviousResults
	differenceWithPrevious := TR.DifferenceWithPrevious
	goal := TR.Goal
	time := TR.Time
	subject1 := TR.Subject1
	subject2 := TR.Subject2
	prompt := fmt.Sprintf(`
		Напиши прогноз на будущее для учителя на основе результатов его учеников, напиши просто 1 блок текста с чистым анализом и прогнозом,
		учти все предыдущие результаты, добавь цифр и процентов, в конце скажи что-нибудь приятное или мотивационное. 
		
	ОБЯЗАТЕЛЬНО ПИШИ ПО ДАННОМУ ШАБЛОНУ, НИЧЕГО НЕ ПРОПУСКАЙ И НЕ ПРИДУМЫВАЙ НИЧЕГО ИЗ СЕБЯ:


		Здравствуйте, [учитель].

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
			В целом, ожидается [оптимистическая/пессимистическая] динамика развития учебных достижений класса на следующем экзамене. Необходимо продолжить мониторинг и поддержку учеников, чтобы максимально реализовать их потенциал и добиться желаемых результатов.

		Входные данные:

		Получатель: %v

		Имя: %v

		Дата: %v

		Результаты экзамена ЕНТ:


		Средний балл класса: %v из 140

		Разница с предыдущим экзаменом: %v - %v; %v
		
		Баллы по предметам:
		- Математическая грамотность: %v из 10
		- Грамотность чтения: %v из 10
		- История Казахстана: %v из 20
		- %v: %v из 50
		- %v: %v из 50

		Предыдущие результаты слева направо с 1 по последний экзамен:
		`, recipient, name, date, averageClassScore, differenceWithPrevious.ScoreDifference[0], differenceWithPrevious.ScoreDifference[1],
		differenceWithPrevious.PercentageChange, subjectScores["mathematical_literacy"], subjectScores["reading_literacy"],
		subjectScores["history_of_Kazakhstan"], subject1[0], subjectScores[subject1[1]], subject2[0], subjectScores[subject2[1]])

	for subject, results := range previousResults {
		switch subject {
		case "average_score":
			prompt += fmt.Sprintf(`%v: `, "Средний балл класса")
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
		case "chemistry":
			prompt += fmt.Sprintf(`%v: `, "Химия")
		case "biology":
			prompt += fmt.Sprintf(`%v: `, "Биология")
		default:
			return "", errs.ErrorInvalidSubject
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
