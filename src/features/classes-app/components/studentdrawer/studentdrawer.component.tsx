import React, { useEffect } from 'react';
import { Box, Button, Drawer, IconButton, TextField, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDrawerContext } from "../../../context";
import { useStudentContext } from "../../../context";
import { StudentInputData } from './StudentData';

type Props = {
  children?: React.ReactNode;
};

export const StudentDrawer: React.FC<Props> = ({ children }) => {
  const { isDrawerOpen, toggleDrawerOpen, studentInputData, setStudentInputData } = useDrawerContext();
  const { selectedStudent } = useStudentContext();

  const initialStudentInputData: StudentInputData = {
    aulasLecionadas: '',
    aulasAtendidas: '',
    notaP1: '',
    notaP2: '',
  };

  useEffect(() => { if (!isDrawerOpen) {
    setStudentInputData(initialStudentInputData); } }, [isDrawerOpen, setStudentInputData]);

  if (!selectedStudent) {
    return <>{children}</>;
  }

  const handleSubmit = () => {
    if (!studentInputData.aulasLecionadas || !studentInputData.aulasAtendidas || !studentInputData.notaP1 || !studentInputData.notaP2) {
      console.error('All input fields are required');
      return;
    }

    console.log(studentInputData);
    setStudentInputData(initialStudentInputData);
    toggleDrawerOpen();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof StudentInputData) => {
    const value = event.target.value;

    const updatedData = {
      ...studentInputData,
      [field]: value,
    };
    setStudentInputData(updatedData);
  };

  const isButtonDisabled = !studentInputData.aulasLecionadas || !studentInputData.aulasAtendidas || !studentInputData.notaP1 || !studentInputData.notaP2;

  return (
    <>
      <Drawer open={isDrawerOpen} variant="temporary" anchor="right" onClose={toggleDrawerOpen}>
        <Box p={2} width={300}>
          <IconButton style={{ float: 'right' }} onClick={toggleDrawerOpen}>
            <ArrowBackIcon />
          </IconButton>
          <>
            <Typography gutterBottom={true} variant="h6">{selectedStudent.name}</Typography>
            <Typography gutterBottom={true} variant="body1">RA:{selectedStudent.id}</Typography>
            <Typography gutterBottom={true} variant="body1">Status:{selectedStudent.status}</Typography>

            <TextField
              label="Aulas Lecionadas"
              margin="normal"
              value={studentInputData.aulasLecionadas}
              onChange={(e) => handleInputChange(e, 'aulasLecionadas')}
              required
              onKeyDown={(e) => {
                if (!/[0-9]/.test(e.key) && e.key !== '.' && e.key !== 'Backspace' && e.key !== 'Delete') {
                  e.preventDefault();
                }
              }}
              
            />
            <TextField
              label="Aulas Atendidas"
              margin="normal"
              value={studentInputData.aulasAtendidas}
              onChange={(e) => handleInputChange(e, 'aulasAtendidas')}
              required
              onKeyDown={(e) => {
                if (!/[0-9]/.test(e.key) && e.key !== '.' && e.key !== 'Backspace' && e.key !== 'Delete') {
                  e.preventDefault();
                }
              }}
            />
            <TextField
              label="Nota da Prova 1"
              margin="normal"
              value={studentInputData.notaP1}
              onChange={(e) => handleInputChange(e, 'notaP1')}
              required
              onKeyDown={(e) => {
                if (!/[0-9]/.test(e.key) && e.key !== '.' && e.key !== 'Backspace' && e.key !== 'Delete') {
                  e.preventDefault();
                }
              }}
            />
            <TextField
              required
              label="Nota da Prova 2"
              margin="normal"
              value={studentInputData.notaP2}
              onChange={(e) => handleInputChange(e, 'notaP2')}
              onKeyDown={(e) => {
                if (!/[0-9]/.test(e.key) && e.key !== '.' && e.key !== 'Backspace' && e.key !== 'Delete') {
                  e.preventDefault();
                }
              }}
            />

            <Button
              variant="contained"
              size="large"
              color={isButtonDisabled ? "inherit" : "primary"}
              sx={{ marginTop: '60px', backgroundColor: isButtonDisabled ? '#b0b0b0' : undefined }}
              onClick={() => handleSubmit()}
              disabled={isButtonDisabled}
            >
              Lançar Notas e Frequência
            </Button>
          </>
        </Box>
      </Drawer>
      {children}
    </>
  );
};
