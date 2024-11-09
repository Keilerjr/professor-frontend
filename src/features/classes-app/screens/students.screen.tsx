import React from 'react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CircularProgress, IconButton, Drawer, TextField, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useListStudentsFromClassById } from '../../../hooks/use-list-students-from-class-by-id/use-list-students-from-class-by-id.hook';

interface Student {
  id: number;
  name: string;
  status: string;

}

export const StudentsScreen: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const navigate = useNavigate();
  const { result: studentsInfo, loading, error } = useListStudentsFromClassById({ classId: classId! });


  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [aulasLecionadas, setAulasLecionadas] = useState('');
  const [aulasAtendidas, setAulasAtendidas] = useState('');
  const [notaP1, setNotaP1] = useState('');
  const [notaP2, setNotaP2] = useState('');

  const handleBackClick = () => {
    navigate('/'); 
  };

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedStudent(null);

    setAulasLecionadas('');
    setAulasAtendidas('');
    setNotaP1('');
    setNotaP2('');
  };

  const handleSubmit = () => {


    // Logica para o botao submit vai aqui


    console.log('Submitted:', { classesLectured: aulasLecionadas, lecturesAttended: aulasAtendidas, exam1Grade: notaP1, exam2Grade: notaP2 });
    handleCloseDrawer();
  };

  return (
    <Box sx={{ padding: '40px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <IconButton onClick={handleBackClick} sx={{ marginRight: '2px' }}>
          <ArrowBackIcon/> 
          <Typography variant="h6"> Voltar </Typography> 
        </IconButton>
        <Typography variant="h5" sx={{ marginBottom: '20px', marginTop: '20px' }}>
          Alunos da Turma: {classId}
        </Typography>
      </Box>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      
      {studentsInfo && studentsInfo.length > 0 ? (
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="flex-start"
          gap={2}
        >
          {studentsInfo.map((student) => (
            <Box onClick={() => handleStudentClick(student)} //Eu n entendi o erro, mas funciona perfeitamente mesmo com ele
              key={student.id}
              sx={{
                width: { xs: '100%', sm: '45%', md: '30%' },
                padding: '1rem'
              }}
            >
              <Card sx={{ height: '100%', boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {student.name}
                  </Typography>
                  <Typography color="textSecondary">
                    RA: {student.id}
                  </Typography>
                  <Typography color="textSecondary">
                    Status: {student.status}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      ) : (
        !loading && <Typography>Nenhum aluno encontrado.</Typography>
      )}
      
      <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer}>
        <Box p={2} width={300}>
          <IconButton onClick={handleCloseDrawer} style={{ float: 'right' }}>
            <ArrowBackIcon />
          </IconButton>
          {selectedStudent ? (
            <>
              <Typography gutterBottom={true} variant="h6">{selectedStudent.name}</Typography>
              <Typography gutterBottom={true} variant="body1">RA: {selectedStudent.id}</Typography>
              <Typography gutterBottom={true} variant="body1">Status: {selectedStudent.status}</Typography>
              
              <TextField
                label="Aulas Lecionadas"
                margin="normal"
                value={aulasLecionadas}
                onChange={(e) => setAulasLecionadas(e.target.value)}
                onKeyDown={(e) => {
                  if (!/[0-9]/.test(e.key) && e.key !== '.' && e.key !== 'Backspace' && e.key !== 'Delete') {
                    e.preventDefault();
                  }
                }}
              />
              <TextField
                label="Aulas Atendidas"
                margin="normal"
                value={aulasAtendidas}
                onChange={(e) => setAulasAtendidas(e.target.value)}
                onKeyDown={(e) => {
                  if (!/[0-9]/.test(e.key) && e.key !== '.' && e.key !== 'Backspace' && e.key !== 'Delete') {
                    e.preventDefault();
                  }
                }}
              />
              <TextField
                label="Nota da Prova 1"
                margin="normal"
                value={notaP1}
                onChange={(e) => setNotaP1(e.target.value)}
                onKeyDown={(e) => {
                  if (!/[0-9]/.test(e.key) && e.key !== '.' && e.key !== 'Backspace' && e.key !== 'Delete') {
                    e.preventDefault();
                  }
                }}
              />
              <TextField
                label="Nota da Prova 2"
                margin="normal"
                value={notaP2}
                onChange={(e) => setNotaP2(e.target.value)}
                onKeyDown={(e) => {
                  if (!/[0-9]/.test(e.key) && e.key !== '.' && e.key !== 'Backspace' && e.key !== 'Delete') {
                    e.preventDefault();
                  }
                }}
              />

              <Button
                variant="contained"
                size="large"
                color="primary"
                sx={{ marginTop: '60px' }}
                onClick={handleSubmit}
              >
                Lançar Notas e Frequência
              </Button>
            </>
          ) : (
            <Typography variant="body1">Nenhum aluno selecionado</Typography>
          )}
        </Box>
      </Drawer>
    </Box>
  );
};