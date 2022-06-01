export default function(request, response, next) {
  console.log(getFullDate());
  console.log(
    `[${request.method}]`, 
    `${request.protocol}://${request.hostname}${request.originalUrl}`
  );
  console.log('[body]', request.body);
  console.log('[params]', request.query);
  console.log('[headers]', request.headers);
  next(); 
}

function getFullDate() {
  const date   = new Date();
  const year   = date.getFullYear();
  const month  = addZeroBeginning(date.getMonth()+1);
  const day    = addZeroBeginning(date.getDate());
  const hour   = addZeroBeginning(date.getHours());
  const minute = addZeroBeginning(date.getMinutes());
  const second = addZeroBeginning(date.getSeconds());
  return `[${year}/${month}/${day} ${hour}:${minute}:${second}]`
}

function addZeroBeginning(number) {
  return number > 9 ? number : parseInt(`0${number}`);
}
