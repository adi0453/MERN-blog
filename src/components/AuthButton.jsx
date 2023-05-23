import React from 'react';
import Button from 'react-bootstrap/Button';

export default function AuthButton(props) {
  return (
    <>
    <div>
      <Button variant="outline-info" className='mx-3'>{props.signupButton}</Button>
      <Button variant="outline-info" className='mx-3'>{props.signinButton}</Button>
    </div>
    </>
  );
}

