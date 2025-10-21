
import { FirebaseClientProvider } from '@/firebase';
import { LoginLoader } from '@/components/login/login-loader';

export default function LoginPage() {
  return (
    <FirebaseClientProvider>
      <LoginLoader />
    </FirebaseClientProvider>
  );
}
