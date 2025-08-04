package api

import (
    "github.com/gofiber/fiber/v2"
    "github.com/mohammadhasan-jp/pairwise-eval/backend/internal/algorithms"
    "github.com/mohammadhasan-jp/pairwise-eval/backend/internal/models"
)

type RankingResult struct {
    EmployeeID int     `json:"employee_id"`
    Score      float64 `json:"score"`
}

func HandleBradleyTerryRanking(c *fiber.Ctx) error {
    var req models.RankingRequest
    if err := c.BodyParser(&req); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid request"})
    }

    scores := algorithms.BradleyTerry(req.Employees, req.Comparisons, 100)

    results := make([]RankingResult, 0, len(req.Employees))
    for _, emp := range req.Employees {
        results = append(results, RankingResult{
            EmployeeID: emp.ID,
            Score:      scores[emp.ID],
        })
    }

    return c.JSON(results)
}
