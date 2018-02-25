import React from 'react';

export const Control = ({onGameStarted,onModeChange,game,onGameChange,strict,count}) => {
  return (
   <section className='Control'>
    <h2>Simon</h2>
    <div className='buttonPanel'>
    <div className='count'>
    <span className='display'>{game ? count : ''}</span>
    <span>Count</span>
    </div>
    <div className='start'>
    <button onClick={() => { if(game) onGameStarted() }}></button>
    <span>Start</span>
    </div>
    <div className='strict'>
    <span className={strict ? 'strictShow red' : 'strictShow'}></span>
    <button onClick={() => { if(game) onModeChange() }}></button>
    <span>Strict</span>
    </div>
    </div>
    <div className='checkboxGame'>
    <span className='off'>Off</span>
    <label className="switch">
      <input type="checkbox" checked={game} onChange={ () => {
        if(game && strict) onModeChange();
          onGameChange()
      } }/>
      <span className="slider round"></span>
    </label>
    <span className='on'>On</span>
    </div>
</section>
  )
}
