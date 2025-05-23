# Autentiserings-API 

Detta är ett REST API byggt med **Node.js**, **Express**, **MongoDB** och **JWT**, som möjliggör **registrering av användare**, **inloggning**, och **åtkomst till skyddad data** med hjälp av **JSON Web Tokens (JWT)**.

---

## Databas

API:et använder en **MongoDB-databas** (hostad på Atlas) där användarkonton lagras. Varje användare innehåller följande fält:

```json
{
  "_id": "ObjectId",
  "username": "string",
  "password": "string (hashad med bcrypt)",
  "account_created": "Date"
}
```
## Användning av API-endpoints
| Metod | URL                  | Body                   | Headers                         | Beskrivning                                      |
| ----- | -------------------- | ---------------------- | ------------------------------- | ------------------------------------------------ |
| POST  | `/api/auth/register` | `username`, `password` | –                               | Registrerar ett nytt användarkonto               |
| POST  | `/api/auth/login`    | `username`, `password` | –                               | Loggar in användaren och returnerar en JWT-token |
| GET   | `/api/protected`     | –                      | `Authorization: Bearer <token>` | Returnerar skyddad data för inloggade användare  |
