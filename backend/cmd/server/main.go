package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/mohammadhasan-jp/pairwise-eval/backend/internal/api"
)

func main() {
	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000, http://127.0.0.1:3000", // دامنه و پورت فرانت
		AllowMethods: "GET,POST,HEAD,PUT,DELETE,PATCH",
	}))
	app.Post("/rankings/bradley-terry", api.HandleBradleyTerryRanking)

	app.Listen(":3000")
}
