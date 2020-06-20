import React from 'react';

export default function Repository(props) {
  return (
    <li key={props.id}>
      {props.title}
      {props.children}
    </li>
  )
}