# Aplikacja Zdrapki w Next.js

Prosta i efektowna aplikacja demonstrująca wirtualną zdrapkę, którą można zdrapać myszką lub na ekranie dotykowym.

## Funkcje

- Interaktywna zdrapka implementowana przy użyciu HTML Canvas
- Animacja zdrapywania za pomocą myszy lub dotyku
- Responsywny design działający na komputerach i urządzeniach mobilnych
- Możliwość konfiguracji różnych obrazów tła i zawartości
- Detekcja ukończenia zdrapywania

## Jak uruchomić

### Wymagania

- Node.js (wersja 18 lub nowsza)
- npm (dołączony do Node.js)

### Instalacja

1. Sklonuj to repozytorium lub pobierz pliki
2. Przejdź do katalogu projektu
3. Zainstaluj zależności:

```bash
npm install
```

### Uruchomienie w trybie deweloperskim

```bash
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce, aby zobaczyć aplikację.

### Budowanie na produkcję

```bash
npm run build
npm start
```

## Konfiguracja komponentu zdrapki

Komponent `ScratchCard` przyjmuje następujące właściwości:

- `coverImage`: ścieżka do obrazka zakrywającego (co użytkownik zdrapuje)
- `revealImage`: ścieżka do obrazka, który pojawi się po zdrapaniu
- `width`: szerokość zdrapki w pikselach (domyślnie: 300)
- `height`: wysokość zdrapki w pikselach (domyślnie: 300)
- `brushSize`: rozmiar narzędzia do zdrapywania (domyślnie: 40)
- `completionPercent`: procent powierzchni, który trzeba zdrapać, aby uznać zdrapkę za ukończoną (domyślnie: 70)
- `onComplete`: funkcja wywoływana po zdrapaniu określonego procentu powierzchni

## Licencja

Ten projekt jest udostępniany na licencji MIT.
