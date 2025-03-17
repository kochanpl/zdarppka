'use client';

import Image from "next/image";
import { useState } from "react";
import ScratchCard from "@/components/ScratchCard";
import WinAlert from "@/components/WinAlert";
import UserForm from "@/components/UserForm";
import { registerUser, getPrizeForUser, registerWin, UserData, PrizeData } from "@/services/mockApi";

export default function Home() {
  const [showAlert, setShowAlert] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [prize, setPrize] = useState<PrizeData | null>(null);
  const [isLoadingPrize, setIsLoadingPrize] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Obsługa wysłania formularza
  const handleFormSubmit = async (formData: UserData) => {
    setIsFormSubmitting(true);
    setError(null);
    
    try {
      // Rejestracja użytkownika w API
      const result = await registerUser(formData);
      
      if (result.success && result.sessionId) {
        setUserData(formData);
        setSessionId(result.sessionId);
        setIsFormSubmitted(true);
      } else {
        setError(result.error || "Wystąpił błąd podczas rejestracji. Spróbuj ponownie.");
      }
    } catch (error) {
      console.error("Błąd podczas rejestracji:", error);
      setError("Wystąpił błąd podczas rejestracji. Spróbuj ponownie.");
    } finally {
      setIsFormSubmitting(false);
    }
  };
  
  // Obsługa zdrapania zdrapki
  const handleScratchComplete = async () => {
    if (!sessionId) return;
    
    setIsLoadingPrize(true);
    setError(null);
    
    try {
      // Pobieranie nagrody z API
      const prizeData = await getPrizeForUser(sessionId);
      setPrize(prizeData);
      setShowAlert(true);
      
      // Rejestracja wygranej
      await registerWin(sessionId, prizeData.id);
    } catch (error) {
      console.error("Błąd podczas pobierania nagrody:", error);
      setError("Wystąpił błąd podczas pobierania nagrody. Spróbuj ponownie.");
    } finally {
      setIsLoadingPrize(false);
    }
  };
  
  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="w-full max-w-7xl mx-auto pt-5 px-4">

        {/* Banner główny */}
        <div className="super-banner mb-24 overflow-visible relative">
          <div className="absolute inset-0 z-0"></div>
          
          <div className="relative z-10">
            <div className="px-4 sm:px-6 py-8 sm:py-12 text-center">
              {/* Logo SUPER - responsive */}
              <div className="flex flex-col items-center">
                <div className="text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] font-extrabold leading-none tracking-tighter inline-flex mb-2 -ml-0 sm:-ml-48 md:-ml-72 lg:-ml-96 relative">
                  <span style={{color: "#1e3a8a"}}>S</span>
                  <span style={{color: "#f87171"}}>U</span>
                  <span style={{color: "#2dd4bf"}}>P</span>
                  <span style={{color: "#fb923c"}}>E</span>
                  <span style={{color: "#facc15"}}>R</span>
                </div>
                
                {/* LOTERIA - zachowanie układu */}
                <div className="flex items-center -mt-10 sm:-mt-14 md:-mt-16 lg:-mt-20 relative">
                  <span className="text-[50px] sm:text-[70px] md:text-[85px] lg:text-[100px] font-extrabold text-[#1e3a8a] leading-none tracking-tight -mr-[120px] sm:-mr-[170px] md:-mr-[200px] lg:-mr-[240px] relative" style={{
                    textShadow: "0 0 1px white, 0 0 2px white, 0 0 3px white, 0 0 4px white",
                  }}>LOTERIA</span>

                  <div className="flex flex-col items-start mt-2 ml-32 sm:ml-42 md:ml-52 lg:ml-64">
                    <span className="text-[28px] sm:text-[36px] md:text-[40px] lg:text-[46px] text-[#3b82f6] font-bold leading-none" style={{
                      textShadow: "0 0 1px white, 0 0 2px white, 0 0 3px white",
                    }}>WYGRYWAJ</span>
                    <span className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] text-[#3b82f6] font-bold">w KLUBIE <span className="text-xs">®</span></span>
                  </div>
                </div>
              </div>
              
              {/* Nagroda główna */}
              <div className="mt-12 sm:mt-16 mb-16 sm:mb-20 text-center">
                <div className="inline-flex flex-col items-center">
                  <div className="bg-[#1e3a8a] text-white text-lg sm:text-xl font-bold py-2 px-6 sm:px-8 rounded-full tracking-wide">
                    NAGRODA GŁÓWNA
                  </div>
                  <div className="bg-[#ef4444] text-white text-5xl sm:text-6xl md:text-7xl font-bold py-2 sm:py-3 px-8 sm:px-12 rounded-full">
                    100 000<span className="text-2xl sm:text-3xl md:text-4xl ml-1">zł</span>
                  </div>
                </div>
              </div>

              {/* Nagrody w linii - responsywne */}
              <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-8 gap-y-20 sm:gap-y-24 mb-16 sm:mb-24">
                {/* Dyson */}
                <div className="relative mb-16 w-full sm:w-auto">
                  <div className="mx-auto w-48 sm:w-64 h-48 sm:h-64 flex items-center justify-center relative z-10">
                    <Image 
                      src="/dyson-prize.png" 
                      alt="Dyson" 
                      width={221} 
                      height={300} 
                      className="object-contain" 
                    />
                  </div>
                  <div className="absolute -bottom-12 sm:-bottom-16 inset-x-0 mx-auto bg-[#f87171] rounded-full p-3 sm:p-4 text-white text-center w-28 sm:w-32 h-28 sm:h-32 flex flex-col items-center justify-center animate-float shadow-lg border-2 border-white z-20">
                    <div className="text-2xl sm:text-3xl font-bold">10x</div>
                    <div className="text-[10px] sm:text-xs font-medium mt-1">MULTISTYLER<br/>DYSON</div>
                  </div>
                </div>

                {/* Hotel */}
                <div className="relative mb-16 w-full sm:w-auto">
                  <div className="mx-auto w-48 sm:w-64 h-48 sm:h-64 flex items-center justify-center relative z-10">
                    <Image 
                      src="/voucher-prize.png" 
                      alt="Voucher do hotelu" 
                      width={218} 
                      height={290} 
                      className="object-contain" 
                    />
                  </div>
                  <div className="absolute -bottom-12 sm:-bottom-16 inset-x-0 mx-auto bg-[#2dd4bf] rounded-full p-3 sm:p-4 text-white text-center w-28 sm:w-32 h-28 sm:h-32 flex flex-col items-center justify-center animate-float shadow-lg border-2 border-white z-20" style={{animationDelay: "0.2s"}}>
                    <div className="text-2xl sm:text-3xl font-bold">4x</div>
                    <div className="text-[10px] sm:text-xs font-medium mt-1">VOUCHER<br/>DO HOTELU</div>
                  </div>
                </div>

                {/* Nagrody natychmiastowe */}
                <div className="relative mb-16 w-full sm:w-auto">
                  <div className="mx-auto w-48 sm:w-64 h-48 sm:h-64 flex items-center justify-center relative z-10">
                    <Image 
                      src="/cosmetics-prize.png" 
                      alt="Kosmetyki" 
                      width={235} 
                      height={280} 
                      className="object-contain" 
                    />
                  </div>
                  <div className="absolute -bottom-12 sm:-bottom-16 inset-x-0 mx-auto bg-[#fb923c] rounded-full p-3 sm:p-4 text-white text-center w-32 sm:w-36 h-32 sm:h-36 flex flex-col items-center justify-center animate-float shadow-lg border-2 border-white z-20" style={{animationDelay: "0.4s"}}>
                    <div className="text-xs sm:text-sm font-bold">PONAD</div>
                    <div className="text-xl sm:text-2xl font-bold">20 000</div>
                    <div className="text-[8px] sm:text-[10px] mt-1">NAGRÓD<br/>NATYCHMIASTOWYCH</div>
                  </div>
                </div>
              </div>

              {/* Przycisk */}
              <div className="text-center pt-12 sm:pt-16 pb-6 sm:pb-8">
                <a href="#" className="text-[#1e3a8a] text-sm font-bold hover:underline uppercase">
                  Pokaż wszystkie nagrody
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Zasady */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-[#1e3a8a] text-2xl sm:text-[35px] font-bold mb-8 sm:mb-10 tracking-tight uppercase">Zasady Superloterii</h2>
        </div>
        
        {/* Sekcja zdrapki */}
        <div className="flex flex-col items-center mb-20">
          <h2 className="text-[#1e3a8a] text-xl sm:text-2xl font-bold mb-6 sm:mb-8 tracking-tight">Zdrap i sprawdź swoją wygraną!</h2>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 w-full max-w-md">
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          {!isFormSubmitted ? (
            <div className="w-full max-w-md">
              <UserForm onSubmit={handleFormSubmit} isLoading={isFormSubmitting} />
            </div>
          ) : (
            <div className="relative flex flex-col items-center">
              {isLoadingPrize && (
                <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-30 rounded-xl">
                  <div className="flex flex-col items-center">
                    <svg className="animate-spin h-10 w-10 text-[#1e3a8a] mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-[#1e3a8a] font-medium">Sprawdzanie wygranej...</p>
                  </div>
                </div>
              )}
              
              <div className="bg-white p-6 rounded-xl shadow-lg mb-6 w-full max-w-md">
                <p className="text-green-600 font-medium mb-2">✓ Dane zarejestrowane</p>
                <p className="text-gray-600 text-sm">
                  Witaj <span className="font-semibold">{userData?.firstName}</span>! Twoje dane zostały zapisane. 
                  Teraz możesz zdrapać zdrapkę i sprawdzić swoją wygraną.
                </p>
                
                {userData?.acceptMarketing && (
                  <div className="mt-3 text-xs text-gray-500 border-t border-gray-100 pt-3">
                    <p>Dziękujemy za wyrażenie zgody na otrzymywanie informacji marketingowych.</p>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <ScratchCard
                  coverImage="/scratch-cover.svg"
                  revealImage="/scratch-reveal.svg"
                  width={300}
                  height={200}
                  percentToFinish={60}
                  onComplete={handleScratchComplete}
                />
                <p className="text-center mt-4 text-gray-500 text-sm">Zdrap palcem lub myszką aby odkryć nagrodę</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Alert o wygranej */}
        <WinAlert 
          isOpen={showAlert} 
          onClose={closeAlert}
          prize={prize}
        />
      </div>
    </main>
  );
}
