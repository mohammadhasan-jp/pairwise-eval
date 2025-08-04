package api

import "github.com/gofiber/fiber/v2"

func GetMessage(c *fiber.Ctx) error {
    return c.JSON(fiber.Map{
        "message": "سلام! این پیام از سرور آمده است.",
    })
}
