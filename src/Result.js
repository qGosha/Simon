import React from 'react';

export const Result = ({strict, restarting, win}) => {
  let result;
  if(win) {
    result = 'You won the Game!!!';
  } else if (restarting) {
    result = 'Restart';
  } else {
    if(strict) {
      result = 'Try again The Game will restart';
    } else {
      result = 'Try again';
    }
  }
  return (
    <section className='Result'><span>{result}</span></section>
  )
}
