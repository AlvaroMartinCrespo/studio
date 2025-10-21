'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Cookie } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'cookie_consent_given';

export function CookieConsent() {
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (storedConsent === 'true') {
        setConsentGiven(true);
      } else {
        setConsentGiven(false);
      }
    } catch (error) {
      // If localStorage is not available (e.g. server-side or blocked), assume no consent
      setConsentGiven(false);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
      setConsentGiven(true);
    } catch (error) {
      console.error('Could not save cookie consent.', error);
    }
  };
  
  if (consentGiven === null || consentGiven === true) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-10 duration-500">
      <Card className="max-w-2xl mx-auto shadow-2xl">
        <CardHeader className="flex flex-row items-start gap-4 space-y-0">
          <div className="bg-primary/10 text-primary p-3 rounded-full">
            <Cookie className="h-6 w-6" />
          </div>
          <div>
            <CardTitle>Tu privacidad es importante</CardTitle>
            <CardDescription className="mt-1">
              Este sitio web utiliza cookies para recopilar análisis de forma anónima que me ayudan a mejorar la experiencia. Al continuar, aceptas el uso de estas cookies.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Button onClick={handleAccept} className="w-full">
            Entendido, aceptar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
