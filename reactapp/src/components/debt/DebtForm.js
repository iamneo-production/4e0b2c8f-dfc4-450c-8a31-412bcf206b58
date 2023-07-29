import React, { useState } from 'react';
import { FaPlus,FaMoneyBill,FaUser,FaCalendarAlt } from 'react-icons/fa';
import { Modal,  Button, TextInput, Title,Notification } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useSelector } from 'react-redux';

function DebtForm({isOpen,onClose}) {
  const token  = useSelector(state => state.user.token);

  const amount=useStoreState((state)=>state.amount)
  const moneyFrom=useStoreState((state)=>state.moneyFrom)
  const dueDate=useStoreState((state)=>state.dueDate)
  const status = useStoreState((state) => state.status);

  const setAmount=useStoreActions((action)=>action.setAmount)
  const setMoneyFrom=useStoreActions((action)=>action.setMoneyFrom)
  const setdueDate=useStoreActions((action)=>action.setdueDate)
  // const setStatus=useStoreActions((action)=>action.setStatus)
  const addDebt=useStoreActions((action)=>action.addDebt)
  const [newNot,setnewNot]=useState(false);
  const [errN,setErrN]=useState('');
  const [errA,setErrA]=useState('');
  const [errD,setErrD]=useState('');

  const handleSaveModal = async (e) => {
    e.preventDefault();
    if(dueDate.toDateString() === new Date().toDateString()){
      setErrD("Please select a valid date");
      setTimeout(()=>{
        setErrD('')
      },1000);
      return;
    }
    if(!isNaN(moneyFrom) || !moneyFrom.length ){
      console.log(!isNaN(moneyFrom))
      setErrN("Please enter a valid name");
      setTimeout(()=>{
        setErrN('')
      },1000);
      return;

    }
    if(!amount || isNaN(amount)){
      setErrA("please enter a valid amount");
      setTimeout(()=>{
        setErrA('')
      },1000);
      return;

    }
    const dueDate1 = dueDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const NDebt = {
      amount: amount,
      dueDate: dueDate1,
      moneyFrom: moneyFrom,
      status: status,
    };
    // console.log(NDebt);
    addDebt({...NDebt,token:token});
    // console.log("Added")
    onClose();
    setnewNot(true);
    setTimeout(()=>{
      setnewNot(false)
    },1000);

  };
  
  return (
    <>
      {<Modal
        opened={isOpen}
        onClose={onClose}
        centered
        position="center" 

        title={
          <Title size="32" style={{textAlign:"center"}}>
            Add debt
          </Title>
        }
        size="350px"
        padding="35px"
        radius="lg"
        overlayProps={{
          color: "white",
          opacity: 0.55,
          blur: 3,
        }}
      >
        <div>
          <DatePickerInput
              radius="md"
              // style={{marginTop: "2px"}}
              dropdownType="modal"
              label="Due date"
              value={dueDate}
              onChange={setdueDate}
              error={errD}
              icon={<FaCalendarAlt size="1.1rem" stroke={1.5} />}

            />

          <TextInput radius="md" style={{marginTop:"7px"}}
              label="From"
              value={moneyFrom}
              placeholder='Ex : Hariharan'
              data-autofocus
              // required
              withAsterisk
              error={errN}
              onChange={(event) => setMoneyFrom(event.currentTarget.value)}
              icon={<FaUser size="1.1rem" stroke={1.5}/>}
            />
            <TextInput radius="md" style={{marginTop:"7px"}}
              withAsterisk 
              label="Amount"
              value={amount}
              placeholder="1000"
              // required
              error={errA}
              onChange={(event) => setAmount(event.currentTarget.value)}
              icon={<FaMoneyBill size="1.1rem" stroke={1.5}/>}
            />

        </div>
        <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '16px' 
              }}>
          <Button 
            onClick={onClose} 
            fullWidth 
            color='gray'
            style={{ marginLeft: '10px', width: '45%' }} >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveModal}
            fullWidth 
            style={{ marginRight: '10px', width: '45%' }} type='submit'>
            Save
          </Button>
        </div>

      </Modal> }
      {newNot &&
        <Notification
          transition="slide-up"
          title="A New Debt has been Added Successfully !!!"
          color='green'
          icon={
              <FaPlus />}
          style={{ position: 'fixed', bottom: '30px', right: '30px' }}
        />
      }
    </>
  );
}

export default DebtForm;
