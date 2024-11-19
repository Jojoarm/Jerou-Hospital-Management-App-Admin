import { createContext } from 'react';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const convertTime = (time) => {
    const [hour, minute] = time.split(':');
    let formattedHour = parseInt(hour);

    if (formattedHour > 12) {
      formattedHour = formattedHour - 12;
      return `${formattedHour}:${minute} PM`;
    } else {
      return `${hour}:${minute} AM`;
    }
  };

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return (
      dateArray[0] + ' ' + months[Number(dateArray[1]) - 1] + ' ' + dateArray[2]
    );
  };

  const value = { calculateAge, slotDateFormat, convertTime, months };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
