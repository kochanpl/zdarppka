'use client';

import { useState, useEffect } from 'react';

interface UserFormProps {
  onSubmit: (userData: { 
    firstName: string; 
    lastName: string; 
    email: string; 
    acceptTerms: boolean;
    acceptMarketing: boolean;
  }) => void;
  isLoading: boolean;
}

export default function UserForm({ onSubmit, isLoading }: UserFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  // Walidacja w czasie rzeczywistym przy zmianie danych
  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      validateForm(false);
    }
  }, [firstName, lastName, email, acceptTerms]);

  const validateForm = (isSubmitting = true) => {
    const newErrors: { [key: string]: string } = {};
    const nameRegex = /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż\s-]+$/; // Tylko litery, spacje i myślniki
    
    // Walidacja imienia
    if (!firstName.trim()) {
      newErrors.firstName = 'Imię jest wymagane';
    } else if (!nameRegex.test(firstName)) {
      newErrors.firstName = 'Imię może zawierać tylko litery';
    } else if (firstName.trim().length < 3) {
      newErrors.firstName = 'Imię musi mieć co najmniej 3 znaki';
    } else if (firstName.trim().length > 50) {
      newErrors.firstName = 'Imię nie może przekraczać 50 znaków';
    }
    
    // Walidacja nazwiska
    if (!lastName.trim()) {
      newErrors.lastName = 'Nazwisko jest wymagane';
    } else if (!nameRegex.test(lastName)) {
      newErrors.lastName = 'Nazwisko może zawierać tylko litery';
    } else if (lastName.trim().length < 3) {
      newErrors.lastName = 'Nazwisko musi mieć co najmniej 3 znaki';
    } else if (lastName.trim().length > 50) {
      newErrors.lastName = 'Nazwisko nie może przekraczać 50 znaków';
    }
    
    // Walidacja emaila
    if (!email.trim()) {
      newErrors.email = 'Email jest wymagany';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Niepoprawny format adresu email';
    }
    
    // Walidacja zgody na regulamin
    if (!acceptTerms && isSubmitting) {
      newErrors.acceptTerms = 'Akceptacja regulaminu jest wymagana';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Oznacz wszystkie pola jako dotknięte
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      acceptTerms: true
    });
    
    if (validateForm()) {
      onSubmit({ 
        firstName, 
        lastName, 
        email, 
        acceptTerms, 
        acceptMarketing 
      });
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateForm(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto">
      <h3 className="text-xl font-bold text-[#1e3a8a] mb-4">Wprowadź swoje dane</h3>
      <p className="text-gray-600 text-sm mb-6">
        Aby wziąć udział w loterii i odkryć swoją zdrapkę, wypełnij poniższy formularz.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 text-sm font-medium mb-1">
            Imię <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onBlur={() => handleBlur('firstName')}
            className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 ${
              errors.firstName && touched.firstName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-100'
            }`}
            disabled={isLoading}
            placeholder="Wprowadź swoje imię"
          />
          {errors.firstName && touched.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 text-sm font-medium mb-1">
            Nazwisko <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onBlur={() => handleBlur('lastName')}
            className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 ${
              errors.lastName && touched.lastName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-100'
            }`}
            disabled={isLoading}
            placeholder="Wprowadź swoje nazwisko"
          />
          {errors.lastName && touched.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>
        
        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur('email')}
            className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 ${
              errors.email && touched.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-100'
            }`}
            disabled={isLoading}
            placeholder="np. jan.kowalski@example.com"
          />
          {errors.email && touched.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        
        <div className="mb-3">
          <div className="flex items-start mb-2">
            <div className="flex items-center h-5">
              <input
                id="acceptTerms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                onBlur={() => handleBlur('acceptTerms')}
                className={`w-4 h-4 border rounded focus:ring-2 focus:ring-blue-100 ${
                  errors.acceptTerms && touched.acceptTerms ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isLoading}
              />
            </div>
            <label htmlFor="acceptTerms" className="ml-2 text-sm text-gray-600">
              Akceptuję <a href="#" className="text-[#1e3a8a] hover:underline">regulamin</a> loterii i wyrażam zgodę na przetwarzanie moich danych osobowych <span className="text-red-500">*</span>
            </label>
          </div>
          {errors.acceptTerms && touched.acceptTerms && (
            <p className="text-red-500 text-xs mt-1">{errors.acceptTerms}</p>
          )}
        </div>
        
        <div className="mb-6">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="acceptMarketing"
                type="checkbox"
                checked={acceptMarketing}
                onChange={(e) => setAcceptMarketing(e.target.checked)}
                className="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-100"
                disabled={isLoading}
              />
            </div>
            <label htmlFor="acceptMarketing" className="ml-2 text-sm text-gray-600">
              Wyrażam zgodę na otrzymywanie informacji marketingowych (opcjonalnie)
            </label>
          </div>
        </div>
        
        <button
          type="submit"
          className={`w-full bg-[#1e3a8a] text-white py-2 px-4 rounded-lg font-medium 
            ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#1e3a8a]/90 transition-colors'}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Przetwarzanie...
            </div>
          ) : (
            'Potwierdź i odkryj zdrapkę'
          )}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Pola oznaczone <span className="text-red-500">*</span> są wymagane
        </p>
      </div>
    </div>
  );
} 