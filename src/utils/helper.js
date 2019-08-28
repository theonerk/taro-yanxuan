 
export   function convertTime (time) { 
  const date = new Date(time);
  const month = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
  const day = date.getDate();
  const hour = date.getHours();
  const min  = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();
  const seconds= date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds();
  const displayDate= month+ '-'+day+' '+hour+':'+min+':'+seconds;
  return displayDate; 
 
};
 
export function convertMoney(amount){
  const str= amount.toString();
  const low=  str.slice(-2);
  const high = str.slice(0,str.length-2); 
  const displayAmount =high+'.'+low ;
  return displayAmount
}
export function checkNumbers(number) {
  if(number>1){
      return '不唯一！'
  }
  else
  {
        return '唯一！'
  }
}
