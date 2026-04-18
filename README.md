# lab-2-API i kursen Backend-baserad webbutveckling, DT207G

**Genomförd av joha2102**

Detta projekt är en del av Laboration 2 i kursen Backend-baserad webbutveckling.
Syftet är att skapa en REST-baserad webbtjänst som kan hantera data och kommunicera med en frontend-applikation. Del 2 av uppgiften är en frontend-applikation som finns här: -länk kommer.

Den här delen av uppgiften, API-delen är skapad med NodeJS, Express och CORS (för att frontend-applikationen ska kunna göra anrop) samt databasen i Mysql.

## Om applikationen

Applikationen hanterar arbetserfarenheter och hanterar CRUD-operationer (Create, Read, Update och Delete) mot en databas.

Applikatioen använder även validering: 
- Obligatoriska fält måste skickas med i POST och PUT
- När data saknas, visas ett felmeddelande
- Statuskoder används

## Skapa databas

1. Skapa databas och tabell i phpMyAdmin:
```sql
CREATE DATABASE cv;

USE cv;

CREATE TABLE workexperience (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(100) NOT NULL,
    job_title VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    description TEXT
);
```
2. Lägg in testdata om du vill:
```sql
INSERT INTO workexperience 
(company_name, job_title, start_date, end_date, description)
VALUES 
('Test AB', 'Testare', '2019-01-01', '2020-01-01', 'Jobbade med test'),
('Best AB', 'Bestare', '2020-01-09', '2021-01-01', 'Jobbade med best'),
('Fest AB', 'Festare', '2021-01-02', '2022-01-01', 'Jobbade med fest'),
('Hest AB', 'Hestare', '2022-01-02', NULL, 'Jobbade med hest');
```

## Installation

1. Klona repositoryt  
2. Installera dependencies:

```bash
npm install
```
3. Starta servern:
`node server.js`

Servern körs på:
`http://localhost:3500`


## API Endpoints

|Metod  |Ändpunkt               |Beskrivning                                                                 |
|-------|-----------------------|----------------------------------------------------------------------------|
|GET    |/api/workexperience    |Hämtar alla tillgängliga objekt.                                            |
|POST   |/api/workexperience    |Lägger till ett nytt objekt.                                                |
|PUT    |/api/workexperience/:ID|Uppdaterar ett objekt med angivet ID.                                       |
|DELETE |/api/workexperience/:ID|Raderar ett objekt med angivet ID.                                          |

## Exempel på POST (JSON)
{ "company_name": "Exempel AB",
    "job_title": "Exempeljobb",
    "start_date": "2025-01-01",
    "end_date": "2026-01-01",
    "description": "Arbete med expempel."
}