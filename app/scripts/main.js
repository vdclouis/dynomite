/* Snapjs */
var snapper = new Snap({
  element: document.getElementById('snapper'),
  disable: 'right',
  touchToDrag: false
});

document.getElementById('open-left').addEventListener('click', function() {
  if( snapper.state().state === 'left' ) {
    snapper.close();
  } else {
    snapper.open('left');
  }
});
