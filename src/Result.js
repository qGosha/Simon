import React from 'react';

export const Result = ({error, strict, restarting}) => {
 return (
   <section className='Result'><span>{restarting ? 'Restart' : (strict ? 'Try again The Game will restart' : 'Try again')}</span></section>
 )
}
