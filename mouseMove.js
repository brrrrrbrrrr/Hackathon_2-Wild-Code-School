import { cursor } from './elements/cursor.js';

export function handleMouseMove(e) {
  cursor.style.left = e.pageX + 'px';
  cursor.style.top = e.pageY + 'px';
  console.log(e.target.classList);
}
