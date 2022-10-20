//declaration of two global array
    var confLocs = [];
    var confTheta = [];

function setup() {
    createCanvas(900, 800, WEBGL);
    
//creating slider to display and set values
    slider1 = createSlider(50, 500, 100); 
    slider1.position(350, 720);
    slider1.style('width', '200px');
    
    slider2 = createSlider(0, 15, 2); 
    slider2.position(350, 750);
    slider2.style('width', '200px');
    
//pushing 200 3D vectors into confLocs and a random angle into confTheta
     for(var i = 0; i < 200; i++)
     {
      confLocs[i] = [(random(-500,500)), (random(-800,0)), (random(-500,500))];
      confTheta[i] = [random(0,360)];
     }
}

function draw() {
    background(125);
    angleMode(DEGREES);
    
//camera angle requirement to rotate around x-axis
    var xLoc = cos(frameCount*0.2) * (height+450);
    var zLoc = sin(frameCount*0.2) * (height+450);
    
//by default to point center, it should be 0,0,0 after the first 3 value
    camera(xLoc, -900, zLoc, 
           0, 0, 0,
           0, 1, 0);
    
//nested for loop to create the boxes
    for(var x = -400; x<= 400; x+=50)
        {
       for (var z = -400; z <= 400; z+=50)
            {
                push();
                translate(x, 0, z);
                
//saving distance of x and z coordinates into variable distance
                var distance = dist(0, 0, x, z);

//declariing variable to store value of slider
                var sliderval1 = slider1.value();
                var sliderval2 = slider2.value();
                
//store calculation for height of box into variable length based on slider value
                var length = (((sin(360 * distance/600 + frameCount * sliderval2) + 1)/2) * 200)+sliderval1;
                
//task 2
//set material to normal with stroke and strokeWeight set to required value
               /* normalMaterial();
                stroke(0);
                strokeWeight(2);*/
                
//task 7 
//extra task for material and light
                var locX = mouseX - height / 2;
                var locY = mouseY - width / 2;
                
//light settings
                ambientLight(40, 40, 40);
                pointLight(255, 0, 0, locY, locX, 100);
                
//material setting with stroke/strok
                specularMaterial(255);
                stroke(0);
                strokeWeight(2);
                

//create boxes with require size and height based on the length    
                box(50, length , 50);
                pop();
            }
        }
    
//calling confetti function
        confetti();
}


//confetti function
function confetti(){

//settings confetti to have no stroke and material set to normal
    normalMaterial();
    noStroke();
    
//loop over confLocs array
    for(var j = 0; j < 200; j++)
        {
            push();
            
            var valx = confLocs[j][0];
            var valy = confLocs[j][1]+=1;
            var valz = confLocs[j][2];
//translate with values stored in confLocs array, y coordinates increment to move downwards
            translate(valx, valy, valz);
            
//rotate with values stored in confTheta array, rotate increment of 10
            rotateX(confTheta[j][0]+=10);
            
//drawing planes
            plane(15,15);
            
//condition checker for y coordinate
//if y coordinate is more than 0, set y coordinates to -800
            if(valy > 0)
           {
               confLocs[j][1] = -800;
           }
            
            pop();
        }
}
