/*
This macro is used to provide movement of the gears of hate in tomb of annihilation.  The macro:
  Provides set rotational locations for various configurations of the gears
  Grabs token data to set the current rotational position of the gears
  Calculates the relative rotation needed to get from a given input position to the desired rotation
  Uses the Sequencer mode to animate the movement
  Prompts a dialog box to ask the suer to select which configuration they want to move the gears to

*/

(async () => {
// Target positions based on Masterhawk
const config_1 = [218,142,233];
const config_2 = [286,72,286];
const config_3 = [0,0,0];
const config_4 = [98,292,68];
const config_5 = [156,218,127];

let gear_confirmation = false;

// Get token data
let token1 = canvas.tokens.placeables.find(t => t.data.name === "gear1");
let token2 = canvas.tokens.placeables.find(t => t.data.name === "gear2");
let token3 = canvas.tokens.placeables.find(t => t.data.name === "gear3");

// Set initial rotation value
let token1_init_rot = token1.data.rotation;
let token2_init_rot = token2.data.rotation;
let token3_init_rot = token3.data.rotation;

// Set token rotation value
let token1_rot = 0;
let token2_rot = 0;
let token3_rot = 0;


//Radial Distance functions
function radialDist(init, target){
    if (init > target){
        distance = 360 - (init-target);
    } else {
        distance = target - init;
    }
    return distance;
}
function radialDistInvert(init, target){
    if (init > target){
        distance = (init-target) * -1;
    } else {
        distance = (360 - (target - init)) * -1;
    }
    return distance;
}

// Sequencer
new Sequence(gearAnimation)
     .animation()
     .on(token1)
     .rotateIn(token1.data.rotation + token1_rot, 2000,{ease: "easeInOutCubic",delay: -250})
   .animation()
     .on(token2)
     .rotateIn(token2.data.rotation + token2_rot, 2000,{ease: "easeInOutCubic",delay: -250})
   .animation()
     .on(token3)
     .rotateIn(token3.data.rotation + token3_rot, 2000,{ease: "easeInOutCubic",delay: -250});

// Calculate gear rotation
function gearRotation(gear_confirmation){
  if (gear_confirmation === 1) {
    token1_rot = radialDist(token1_init_rot,config_1[0]);
    token2_rot = radialDistInvert(token2_init_rot,config_1[1]);
    token3_rot = radialDist(token3_init_rot,config_1[2]);
    gearAnimation.play();
  }
  else if (gear_confirmation === 2) {
    token1_rot = radialDist(token1_init_rot,config_2[0]);
    token2_rot = radialDistInvert(token2_init_rot,config_2[1]);
    token3_rot = radialDist(token3_init_rot,config_2[2]);
    gearAnimation.play();
  }
  else if (gear_confirmation === 3) {
    token1_rot = radialDist(token1_init_rot,config_3[0]);
    token2_rot = radialDistInvert(token2_init_rot,config_3[1]);
    token3_rot = radialDist(token3_init_rot,config_3[2]);
    gearAnimation.play();
  }
  else if (gear_confirmation === 4) {
    token1_rot = radialDist(token1_init_rot,config_4[0]);
    token2_rot = radialDistInvert(token2_init_rot,config_4[1]);
    token3_rot = radialDist(token3_init_rot,config_4[2]);
    gearAnimation.play();
  }
  else if (gear_confirmation === 5) {
    token1_rot = radialDist(token1_init_rot,config_5[0]);
    token2_rot = radialDistInvert(token2_init_rot,config_5[1]);
    token3_rot = radialDist(token3_init_rot,config_5[2]);
    gearAnimation.play();
  }
}



//Dialog
let d = new Dialog({
 title: "Select Gear Configuration",
 content: "<p>You must choose one configuration:</p>",
 buttons: {
  one: {
   label: "One",
   callback: () => gear_confirmation = 1
  },
  two: {
   label: "Two",
   callback: () => gear_confirmation = 2
  },
  three: {
   label: "Three",
   callback: () => gear_confirmation = 3
  },
  four: {
   label: "Four",
   callback: () => gear_confirmation = 4
  },
  five: {
   label: "Five",
   callback: () => gear_confirmation = 5
  },
 },
 default: "three",
 render: html => console.log("Gear Selected"),
 close: html => {
     (async () => {
        if (gear_confirmation) {
            gearRotation(gear_confirmation);
        }
     });
 }

});
d.render(true);
})();
