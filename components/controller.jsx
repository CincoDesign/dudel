import React from "react";

var Buttons = React.createClass({

  render: function() {

    var xbox = navigator.getGamepads()[0];
    var buttonText;
    var buttonArray = [];

    for (var i = 0; i < xbox.buttons.length; i++) {

      buttonText = "Button " + i + ": ";

      var disp = buttonText;

      if (xbox.buttons[i].pressed) {
        disp = buttonText += "pressed";
      }

      buttonArray.push(disp);
    }

    return (
      <ul>
        {buttonArray.map(function(name, index) {
          return <li key={ index }>{name}</li>;
        })}
      </ul>
    );
  }
});

var Sticks = React.createClass({
 render: function() {

   var xbox = navigator.getGamepads()[0];

   var axis = xbox.axes;

   var L_STICK_X = axis[0];
   var L_STICK_Y = axis[1];
   var R_STICK_X = axis[2];
   var R_STICK_Y = axis[3];

   var up, down, left, right;

   var stickText;
   var stickArray = [];

   for (var i = 0; i < axis.length; i++) {

     stickText = "Stick " + i + ": " + axis[i];

     var disp = stickText;

     stickArray.push(disp);
   }

  //  if (L_STICK_X > 0.25) {right = true;}
  //  else right = false;
  //  if (L_STICK_X < -0.25) { left = true;}
  //  else left = false;
  //  if (L_STICK_Y > 0.25) { down = true;}
  //  else down = false;
  //  if (L_STICK_Y < -0.25) {   up = true;}
  //  else up = false;
   //
  //   if (right && !up && !down) console.log('E');
  //   if (left && !up && !down) console.log('W');
  //   if (down && !left && !right) console.log('S');
  //   if (up && !left && !right) console.log('N');
   //
  //   if (up && right) console.log('NE');
  //   if (up && left) console.log('NW');
  //   if (down && left) console.log('SW');
  //   if (down && right) console.log('SE');

   return (
     <ul>
       {stickArray.map(function(name, index) {
         return <li key={ index }>{name}</li>;
       })}
     </ul>
   );
 }
});

export default React.createClass({
  render: function() {

    var xbox = navigator.getGamepads()[0];
    var type = "Connected: " + xbox.id;

    // render
    return (
      <div>
      {type}
        <Buttons />
        <Sticks />
      </div>
    );
  }
});
