'use client';

const Button = () => {
  return (
    <button
      type='button'
      id='login-button'
      className='mx-auto'
      onClick={() => console.log('CLICK')}>
      Login
    </button>
  );
};

export default Button;
