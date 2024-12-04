import '../scss/styles.scss'
import { addNewComment, renderComments } from './components/comments'

// Add event listener to the button
document.getElementById("buttonAddComment").addEventListener("click", addNewComment);

document.addEventListener("DOMContentLoaded", renderComments);
