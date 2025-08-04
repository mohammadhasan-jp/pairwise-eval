package db

import (
    "fmt"
    "log"
    "os"

    "gorm.io/driver/postgres"
    "gorm.io/gorm"
    "github.com/joho/godotenv"
    
)

var DB *gorm.DB

func InitDB() {
    // بارگذاری فایل .env
    err := godotenv.Load()
    if err != nil {
        log.Println("No .env file found, reading environment variables directly")
    }

    host := os.Getenv("DB_HOST")
    user := os.Getenv("DB_USER")
    password := os.Getenv("DB_PASSWORD")
    dbname := os.Getenv("DB_NAME")
    port := os.Getenv("DB_PORT")

    dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Tehran",
        host, user, password, dbname, port)

    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatal("Failed to connect to database:", err)
    }

    // مهاجرت مدل‌ها (اگر جدول وجود نداشته باشه می‌سازه)

    DB = db

    log.Println("Database connected and migrated successfully")
}
