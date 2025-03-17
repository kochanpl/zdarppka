// Typy danych
export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  acceptTerms?: boolean;
  acceptMarketing?: boolean;
}

export interface PrizeData {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  type: 'physical' | 'voucher' | 'discount';
  value: string;
}

// Przykładowe dane nagród
const availablePrizes: PrizeData[] = [
  {
    id: 'prize1',
    name: 'Multistyler Dyson',
    description: 'Wysokiej klasy multistyler do włosów Dyson Airwrap',
    imageUrl: '/prize-dyson.svg',
    type: 'physical',
    value: 'Wartość: 2299 zł'
  },
  {
    id: 'prize2',
    name: 'Voucher do hotelu',
    description: 'Voucher na pobyt weekendowy dla 2 osób w luksusowym hotelu',
    imageUrl: '/prize-hotel.svg',
    type: 'voucher',
    value: 'Wartość: 1800 zł'
  },
  {
    id: 'prize3',
    name: 'Zestaw kosmetyków',
    description: 'Ekskluzywny zestaw kosmetyków znanych marek',
    imageUrl: '/prize-cosmetics.svg',
    type: 'physical',
    value: 'Wartość: 650 zł'
  },
  {
    id: 'prize4',
    name: 'Rabat 10%',
    description: 'Kupon rabatowy 10% na kolejne zakupy',
    imageUrl: '/prize-discount.svg',
    type: 'discount',
    value: '10% zniżki'
  },
  {
    id: 'prize5',
    name: 'Próbka perfum',
    description: 'Ekskluzywna próbka perfum',
    imageUrl: '/prize-perfume.svg',
    type: 'physical',
    value: 'Wartość: 50 zł'
  }
];

// Rejestracja użytkownika
export async function registerUser(userData: UserData): Promise<{ success: boolean; sessionId?: string; error?: string }> {
  // Symulacja opóźnienia sieciowego
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  console.log('Otrzymane dane użytkownika:', userData);
  
  // Mockowa weryfikacja danych - w prawdziwej aplikacji tutaj byłaby komunikacja z serwerem
  if (!userData.email || !userData.email.includes('@')) {
    return { success: false, error: "Nieprawidłowy adres email" };
  }
  
  // Sprawdzenie zgody na regulamin
  if (userData.acceptTerms !== true) {
    return { success: false, error: "Akceptacja regulaminu jest wymagana" };
  }
  
  // Walidacja istnienia imienia i nazwiska
  if (!userData.firstName || userData.firstName.trim() === '') {
    return { success: false, error: "Imię jest wymagane" };
  }
  
  if (!userData.lastName || userData.lastName.trim() === '') {
    return { success: false, error: "Nazwisko jest wymagane" };
  }
  
  // Walidacja tylko liter w imieniu i nazwisku
  const nameRegex = /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż\s-]+$/;
  if (!nameRegex.test(userData.firstName)) {
    return { success: false, error: "Imię może zawierać tylko litery" };
  }
  
  if (!nameRegex.test(userData.lastName)) {
    return { success: false, error: "Nazwisko może zawierać tylko litery" };
  }
  
  // Walidacja długości imienia i nazwiska
  if (userData.firstName.length < 3 || userData.firstName.length > 50) {
    return { success: false, error: "Nieprawidłowa długość imienia (3-50 znaków)" };
  }
  
  if (userData.lastName.length < 3 || userData.lastName.length > 50) {
    return { success: false, error: "Nieprawidłowa długość nazwiska (3-50 znaków)" };
  }
  
  // Generowanie mockowego identyfikatora sesji
  const sessionId = `session_${Math.random().toString(36).substring(2, 15)}`;
  
  // W prawdziwej aplikacji tutaj zapisałoby dane w bazie danych lub wysłały na serwer
  console.log('Zarejestrowano użytkownika:', userData);
  
  return { success: true, sessionId };
}

// Pobieranie nagrody dla użytkownika
export async function getPrizeForUser(sessionId: string): Promise<PrizeData> {
  // Symulacja opóźnienia sieciowego
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Losowanie nagrody - w prawdziwej aplikacji tutaj byłby bardziej zaawansowany algorytm
  const randomIndex = Math.floor(Math.random() * availablePrizes.length);
  const prize = availablePrizes[randomIndex];
  
  // W prawdziwej aplikacji tutaj aktualizowałoby się dane w bazie danych itp.
  console.log(`Użytkownik ${sessionId} otrzymał nagrodę:`, prize.name);
  
  return prize;
}

// Rejestracja wygranej
export async function registerWin(sessionId: string, prizeId: string): Promise<{ success: boolean }> {
  // Symulacja opóźnienia sieciowego
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // W prawdziwej aplikacji tutaj zapisałoby dane wygranej w bazie danych
  console.log(`Użytkownik ${sessionId} zgłosił wygraną nagrody ${prizeId}`);
  
  return { success: true };
} 