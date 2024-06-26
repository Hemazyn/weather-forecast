export const convertTimeTo12HourFormat = (time) => {
     const date = new Date(time * 1000);
     let hours = date.getHours();
     const minutes = date.getMinutes();
     const ampm = hours >= 12 ? 'PM' : 'AM';
     hours = hours % 12;
     hours = hours ? hours : 12;
     const minutesStr = minutes < 10 ? '0' + minutes : minutes;
     return hours + ':' + minutesStr + ' ' + ampm;
};
