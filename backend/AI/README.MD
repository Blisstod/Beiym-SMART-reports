внутри AI папки создай .env файл и добавь туда следующие переменные:
```env
API_KEY=<API ключ>
```

### localhost:8080/teacherReview POST - method возвращает анализ для учителя и ошибку
Request:
```json
{
    "recipient": "Учитель",
    "name": "Билли Херингтон",
    "date": "2021-09-01",
    "average_class_score": 99,
    "subject_scores": {
        "mathematical_literacy": 6.7,
        "reading_literacy": 7.9,
        "history_of_Kazakhstan": 14.2,
        "mathematics": 33,
        "physics": 24
    },
    "previous_results": {
        "average_score": [54, 60, 61, 77, 102, 99],
        "mathematical_literacy": [3, 5, 6, 9, 9, 10],
        "reading_literacy": [3, 5, 6, 9, 9, 10],
        "history_of_Kazakhstan": [9, 10, 11, 15, 16, 20],
        "mathematics": [10, 18, 20, 30, 31, 42],
        "physics": [10, 18, 19, 25, 27, 35]
    },
    "difference_with_previous_exam": {
        "score_difference": [99, 102],
        "percentage_change": "-3%"
    },
    "goal": {
        "target_score": 105,
        "achieved": false
    },
    "time": 12,
    "subject1": ["Математика", "mathematics"],
    "subject2": ["Физика", "physics"]
}
```

Response:
"some text"


### localhost:8080/teacherPredict POST - method возвращает прогноз для учителя и ошибку
Request:
```json
{
    "recipient": "Учитель",
    "name": "Билли Херингтон",
    "date": "2021-09-01",
    "average_class_score": 99,
    "subject_scores": {
        "mathematical_literacy": 6.7,
        "reading_literacy": 7.9,
        "history_of_Kazakhstan": 14.2,
        "mathematics": 33,
        "physics": 24
    },
    "previous_results": {
        "average_score": [54, 60, 61, 77, 102, 99],
        "mathematical_literacy": [3, 5, 6, 9, 9, 10],
        "reading_literacy": [3, 5, 6, 9, 9, 10],
        "history_of_Kazakhstan": [9, 10, 11, 15, 16, 20],
        "mathematics": [10, 18, 20, 30, 31, 42],
        "physics": [10, 18, 19, 25, 27, 35]
    },
    "difference_with_previous_exam": {
        "score_difference": [99, 102],
        "percentage_change": "-3%"
    },
    "goal": {
        "target_score": 105,
        "achieved": false
    },
    "time": 12,
    "subject1": ["Математика", "mathematics"],
    "subject2": ["Физика", "physics"]
}
```

Response:
"some text"


### localhost:8080/studentOverallReview POST - method возвращает общий анализ для ученика
Request:
```json
{
    "recipient": "Ученик",
    "name": "Досымжан",
    "date": "13 апреля 2024 г.",
    "total_score": 123,
    "subject_scores": {
        "mathematical_literacy": 10,
        "reading_literacy": 10,
        "history_of_Kazakhstan": 13,
        "mathematics": 45,
        "physics": 45
    },
    "previous_results": {
        "total_score": [60, 65, 70, 69, 90, 94, 105, 112, 123],
        "mathematical_literacy": [5, 5, 6, 6, 8, 9, 9, 9, 10],
        "reading_literacy": [5, 6, 7, 7, 8, 9, 9, 9, 10],
        "history_of_Kazakhstan": [10, 11, 14, 13, 17, 18, 20, 20, 13],
        "mathematics": [20, 22, 24, 23, 33, 35, 38, 42, 45],
        "physics": [20, 21, 19, 20, 24, 27, 34, 37, 45]
    },
    "difference_with_previous_exam": {
        "score_difference": [123, 112],
        "percentage_change": "+12.5%"
    },
    "goal": {
        "target_score": 45,
        "achieved": true
    },
    "time": 12,
    "subject1": ["Математика", "mathematics"],
    "subject2": ["Физика", "physics"]
}
``` 

Response:
"some text"

### localhost:8080/studentOverallPredict POST - method возвращает общий прогноз для ученика
Request:
```json
{
    "recipient": "Ученик",
    "name": "Досымжан",
    "date": "13 апреля 2024 г.",
    "total_score": 123,
    "subject_scores": {
        "mathematical_literacy": 10,
        "reading_literacy": 10,
        "history_of_Kazakhstan": 13,
        "mathematics": 45,
        "physics": 45
    },
    "previous_results": {
        "total_score": [60, 65, 70, 69, 90, 94, 105, 112, 123],
        "mathematical_literacy": [5, 5, 6, 6, 8, 9, 9, 9, 10],
        "reading_literacy": [5, 6, 7, 7, 8, 9, 9, 9, 10],
        "history_of_Kazakhstan": [10, 11, 14, 13, 17, 18, 20, 20, 13],
        "mathematics": [20, 22, 24, 23, 33, 35, 38, 42, 45],
        "physics": [20, 21, 19, 20, 24, 27, 34, 37, 45]
    },
    "difference_with_previous_exam": {
        "score_difference": [123, 112],
        "percentage_change": "+12.5%"
    },
    "goal": {
        "target_score": 45,
        "achieved": true
    },
    "time": 12,
    "subject1": ["Математика", "mathematics"],
    "subject2": ["Физика", "physics"]
}
``` 

Response:
"some text"

### localhost:8080/studentSubjectReview POST - method возвращает анализ по предмету для ученика
Request:
```json
{
    "recipient": "Ученик",
    "name": "Досымжан",
    "date": "13 апреля 2024 г.",
    "subject": "Математика",
    "total_score": [45, 50],
    "previous_results": [20, 22, 24, 23, 33, 35, 38, 42, 45],
    "difference_with_previous_exam": {
        "score_difference": [45, 40],
        "percentage_change": "+12.5%"
    },
    "goal": {
        "target_score": 45,
        "achieved": true
    },
    "time": 12,
    "percentages": {
        "31-40": "38.6%",
        "41-50": "22.5%",
        "21-30": "30.8%",
        "0-20": "8.1%"
    }
}
```

Response:
"some text"

### localhost:8080/studentSubjectPredict POST - method возвращает прогноз по предмету для ученика
Request:
```json
{
    "recipient": "Ученик",
    "name": "Досымжан",
    "date": "13 апреля 2024 г.",
    "subject": "Математика",
    "total_score": [45, 50],
    "previous_results": [20, 22, 24, 23, 33, 35, 38, 42, 45],
    "difference_with_previous_exam": {
        "score_difference": [45, 40],
        "percentage_change": "+12.5%"
    },
    "goal": {
        "target_score": 45,
        "achieved": true
    },
    "time": 12,
    "percentages": {
        "31-40": "38.6%",
        "41-50": "22.5%",
        "21-30": "30.8%",
        "0-20": "8.1%"
    }
}
```

Response:
"some text"
