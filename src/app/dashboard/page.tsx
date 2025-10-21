'use client';

import { useUser, useAuth, useFirestore, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { collection, query, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2, LogOut, Inbox } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { FirebaseClientProvider } from '@/firebase/client-provider';

type Submission = {
  id: string;
  name: string;
  email: string;
  message: string;
  submissionDate: string;
};

function DashboardContent() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();

  const submissionsQuery = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null;
    return query(collection(firestore, 'contact_form_submissions'), orderBy('submissionDate', 'desc'));
  }, [firestore, user?.uid]);

  const { data: submissions, isLoading: submissionsLoading, error } = useCollection<Submission>(submissionsQuery);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const handleLogout = async () => {
    if (auth) {
        await auth.signOut();
    }
    router.push('/login');
  };

  if (isUserLoading || !user) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-16 md:py-24">
      <div className="flex justify-between items-center mb-8">
        <div className='flex items-center gap-4'>
            <Inbox className="h-8 w-8" />
            <h1 className="font-headline text-3xl md:text-4xl font-bold">Bandeja de Entrada</h1>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Cerrar Sesión
          <LogOut className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mensajes Recibidos</CardTitle>
          <CardDescription>Aquí están los mensajes enviados a través del formulario de contacto.</CardDescription>
        </CardHeader>
        <CardContent>
          {(submissionsLoading) && (
             <div className="flex justify-center items-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
             </div>
          )}
          {error && <p className="text-destructive">Error: {error.message}</p>}
          {!submissionsLoading && submissions && submissions.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Fecha</TableHead>
                  <TableHead className="w-[200px]">Nombre</TableHead>
                  <TableHead className="w-[250px]">Email</TableHead>
                  <TableHead>Mensaje</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>
                      <Badge variant="outline">
                        {format(new Date(submission.submissionDate), 'dd MMM, yyyy - HH:mm', { locale: es })}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{submission.name}</TableCell>
                    <TableCell><a href={`mailto:${submission.email}`} className="text-primary hover:underline">{submission.email}</a></TableCell>
                    <TableCell className="text-muted-foreground">{submission.message}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {!submissionsLoading && (!submissions || submissions.length === 0) && (
            <div className="text-center py-10 text-muted-foreground">
              <Inbox className="mx-auto h-12 w-12 mb-4" />
              <p>No hay mensajes por ahora.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function DashboardPage() {
    return (
        <FirebaseClientProvider>
            <DashboardContent />
        </FirebaseClientProvider>
    )
}
