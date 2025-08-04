package api

import (
    "github.com/gofiber/fiber/v2"
    "gorm.io/gorm"
)

func RegisterRoutes(app *fiber.App, db *gorm.DB) {
    app.Get("/", func(c *fiber.Ctx) error {
        return c.SendString("Backend is running!")
    })

    app.Get("/employees", func(c *fiber.Ctx) error {
        var employees []interface{}
        result := db.Find(&employees)
        if result.Error != nil {
            return c.Status(500).SendString("Error fetching employees")
        }
        return c.JSON(employees)
    })
}
