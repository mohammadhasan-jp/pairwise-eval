package config

import (
    "os"
    "log"
    "github.com/joho/godotenv"
)

type Config struct {
    Port        string
    DatabaseURL string
}

func LoadConfig() (*Config, error) {
    err := godotenv.Load()
    if err != nil {
        log.Println("No .env file found, using environment variables")
    }

    cfg := &Config{
        Port:        getEnv("PORT", ":8080"),
        DatabaseURL: getEnv("DATABASE_URL", "host=localhost user=postgres password=postgres dbname=pairwise port=5432 sslmode=disable"),
    }
    return cfg, nil
}

func getEnv(key, fallback string) string {
    if value, exists := os.LookupEnv(key); exists {
        return value
    }
    return fallback
}
