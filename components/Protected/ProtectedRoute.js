import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ProtectedRoute({ children, user }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/'); 
    }
    if(token){
      const userActual = JSON.parse(localStorage.getItem('user'));
      if(userActual.nickname !== user.nickname){
        router.push('/');
      }
    }
  }, []);

  return  children;
}
