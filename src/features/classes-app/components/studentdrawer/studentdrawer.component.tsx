import React, { useEffect } from 'react';
import { Box, Button, Drawer, IconButton, TextField, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDrawerContext, initialStudentInputData } from "../../../context";
import { useStudentContext } from "../../../context";
import { IStudentInputData } from './student-drawer.types.ts';
import { CalculateStudentStatus } from '../../../../services/calculate-student-status/calculate-student-status.service';
import { ApiException } from '../../../../services/calculate-student-status/ApiException.service';

type Props = {
  children?: React.ReactNode;
};

export const StudentDrawer: React.FC<Props> = ({ children }) => {
  const { isDrawerOpen, toggleDrawerOpen, studentInputData, setStudentInputData} = useDrawerContext();
  const { selectedStudent } = useStudentContext();


  useEffect(() => { if (!isDrawerOpen) {
    setStudentInputData(initialStudentInputData); } }, [isDrawerOpen, setStudentInputData]);

  if (!selectedStudent) {
    return <>{children}</>;
  }

  const handleSubmit = () => {

    if (studentInputData.aulas_atendidas > studentInputData.aulas_lecionadas){
      alert('Aluno não pode atender mais aulas do que o professor lecionou');
      return;
    }
    if (studentInputData.nota_p1 > 10 || studentInputData.nota_p2 > 10){
      alert('Apenas notas de 0 a 10');
      return;
    }
    console.log({studentInputData});
    CalculateStudentStatus.calculate(studentInputData, selectedStudent)
      .then((result) => {
        if (result instanceof ApiException){
          console.log(result.message);
        } else {
          console.log(result);
        }
      })
    setStudentInputData(initialStudentInputData);
    toggleDrawerOpen();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof IStudentInputData) => {
    let value = Number(event.target.value);

    if (field ==='aulas_atendidas' && value > studentInputData.aulas_lecionadas) {
      value = studentInputData.aulas_lecionadas;
    }
    if ((field === 'nota_p1' || field === 'nota_p2') && value > 10){
      value = 10;
    }

    const updatedData = {
      ...studentInputData,
      [field]: value,
    };
    setStudentInputData(updatedData);
  };

  const isButtonDisabled = !studentInputData.aulas_lecionadas || !studentInputData.aulas_atendidas || !studentInputData.nota_p1 || !studentInputData.nota_p2;

  return (
    <>
      <Drawer open={isDrawerOpen} anchor="right" onClose={toggleDrawerOpen}>
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
              value={studentInputData.aulas_lecionadas}
              onChange={(e) => handleInputChange(e, 'aulas_lecionadas')}
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
              value={studentInputData.aulas_atendidas}
              onChange={(e) => handleInputChange(e, 'aulas_atendidas')}
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
              value={studentInputData.nota_p1}
              onChange={(e) => handleInputChange(e, 'nota_p1')}
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
              value={studentInputData.nota_p2}
              onChange={(e) => handleInputChange(e, 'nota_p2')}
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
