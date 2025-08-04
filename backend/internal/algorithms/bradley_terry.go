package algorithms

import "github.com/mohammadhasan-jp/pairwise-eval/backend/internal/models"

// BradleyTerry اجرای الگوریتم بردلی-تری روی داده‌ها
func BradleyTerry(employees []models.Employee, comparisons []models.Comparison, iterations int) map[int]float64 {
    n := len(employees)
    scores := make(map[int]float64, n)

    // مقداردهی اولیه همه امتیازها 1
    for _, emp := range employees {
        scores[emp.ID] = 1.0
    }

    for iter := 0; iter < iterations; iter++ {
        newScores := make(map[int]float64, n)

        for _, emp := range employees {
            numerator := 0.0
            denominator := 0.0

            for _, comp := range comparisons {
                if comp.WinnerID == emp.ID {
                    numerator += 1.0
                }
                if comp.WinnerID == emp.ID || comp.LoserID == emp.ID {
                    otherID := comp.LoserID
                    if comp.WinnerID == emp.ID {
                        otherID = comp.LoserID
                    } else {
                        otherID = comp.WinnerID
                    }
                    denominator += 1.0 / (scores[emp.ID] + scores[otherID])
                }
            }

            if denominator > 0 {
                newScores[emp.ID] = numerator / denominator
            } else {
                newScores[emp.ID] = scores[emp.ID]
            }
        }
        scores = newScores
    }

    // نرمال‌سازی به ۰ تا ۱
    maxScore := 0.0
    for _, v := range scores {
        if v > maxScore {
            maxScore = v
        }
    }
    for k, v := range scores {
        scores[k] = v / maxScore
    }

    return scores
}
