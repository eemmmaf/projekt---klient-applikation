# Projektuppgift - DT193G
Skapad av Emma Forslund, emfo2102@student.miun.se, 2022

Detta repo innehåller filerna till en klient-applikation. Applikationen är skapad för det fiktiva företaget Matbolaget. Matbolaget behövde ett intranät för att lagra produkter. Applikationen konsumerar en REST-webbtjänst som är skapad i detta projekt. 
Applikationen är skapad med frontend-ramverket Vue.js. På applikationen är det möjligt att registrera användare, logga in och logga ut. För inloggade användare finns det full CRUD-funktionalitet för både produkter och kategorier. 

## Struktur
Applikationen är en SPA(Single-Page-Application) och är uppdelad i komponenter. 8 stycken komponenter har skapats: 
* Aside.vue - Sidebar med navigering.
* Header.vue - Applikationens header.
* Footer.vue - Applikationens footer.
* Category.vue - Skriver ut lagrade kategorier i article-element
* LatestProducts.vue - Skriver ut de 5 senast tillagda produkterna
* Product.vue - Skriver ut alla lagrade produkter i en tabell
* Searchbox.vue - Sökruta med sökfunktionalitet. 
* Userinfo.vue - Skriver ut den inloggade användarens namn

### Views och Routing
För att byta ut innehållet på applikationen används Vues router-system. Innehållet har delats upp på 10 olika views:
* AddCategoryView.vue - Vy med formulär för att lägga till en kategori
* AddProductView.vue - Vy med formulär för att lägga till en produkt
* AddUserView.vue - Vy med formulär för att lägga till en användare
* CategoryView.vue - Importerar komponenten Category.vue och loopar igenom de lagrade kategorierna.
* HomeView.vue - Applikationens startsida. Den visar hur stort antal produkter och kategorier som finns lagrade. Importerar komponenten LatestProducts och Userinfo.
* LoginView.vue - Vy med ett formulär för att logga in.
* Notfound.vue - 404-sida.
* ProductView.vue - Här skrivs produkterna ut i tabellen. Importerar komponenten Product.vue. Finns även funktioner för sortering av produkterna. 
* SingleCategoryView.vue - Formulär där enskild kategori visas. På denna vy går det att uppdatera info om kategorin.
* SingleProductView.vue - Formulär där enskild produkt visas. På denna vy går det att uppdatera info om produkten.

## Autentisering
Vid inloggning genereras en token. Token sparas i localStorage. Vid varje fetch-anrop skickas en token med. Det görs även en kontroll i index.js för att se om någon token finns lagrad i localStorage. 

## Provköra applikationen
Applikationen har inte publicerats. Klona ner detta repo och kör kommandot `npm run dev`. 
