package teacher

type TeacherRequest struct {
	Recipient              string                 `json:"recipient"`
	Name                   string                 `json:"name"`
	Date                   string                 `json:"date"`
	AverageClassScore      int                    `json:"average_class_score"`
	SubjectScores          map[string]float32     `json:"subject_scores"`
	PreviousResults        map[string][]int       `json:"previous_results"`
	DifferenceWithPrevious DifferenceWithPrevious `json:"difference_with_previous_exam"`
	Goal                   Goal                   `json:"goal"`
	Time                   int                    `json:"time"`
	Subject1               [2]string              `json:"subject1"`
	Subject2               [2]string              `json:"subject2"`
}

type Goal struct {
	TargetScore int  `json:"target_score"`
	Achieved    bool `json:"achieved"`
}

type DifferenceWithPrevious struct {
	ScoreDifference  [2]int `json:"score_difference"`
	PercentageChange string `json:"percentage_change"`
}
