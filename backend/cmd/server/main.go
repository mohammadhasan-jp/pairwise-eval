package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/mohammadhasan-jp/pairwise-eval/backend/internal/api"
)

func main() {
	app := fiber.New()

	// فعال‌سازی CORS برای درخواست‌های فرانت
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "*",
		AllowHeaders:     "Origin, Content-Type, Accept",
		AllowCredentials: true,
		AllowMethods:     "GET,POST,OPTIONS",
	}))

	// روت اصلی برای رتبه‌بندی Bradley-Terry
	app.Post("/rankings/bradley-terry", api.HandleBradleyTerryRanking)

	// خواندن پورت از محیط، با پیش‌فرض 8080
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server running on port %s", port)
	log.Fatal(app.Listen(":" + port))
}
