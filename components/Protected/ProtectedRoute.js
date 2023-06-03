import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/register'); // Redireccionar al inicio de sesión si no está autenticado
    }
  }, []);

  return  children;
}
