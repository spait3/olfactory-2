


function flower1(dia){

  rotateX(180);
  rotateZ(dia+10);

 
  let rad = map(dia, 0, 25, 2,10);
  pNum = 21;

  fD = rad;
  pLen = 23;
  pSharp = 0.4;
  push();
  

  fHeight = 140;
  curve1 = 0.8;
  curve2 = 0.2;

  b = 2.5;
  bNum = 10;
  
  for(theta = 0; theta < rows; theta += 1){
    v.push([]);
    for(let phi = 0; phi < cols; phi += 1){
      let r = (pLen*pow(abs(sin(pNum/2*phi*360/cols)),pSharp)+fD) * theta/rows;
      let x = r * cos(phi*360/cols);
      let y = r * sin(phi*360/cols);
      let z = vShape(fHeight, r/100, curve1, curve2, 1.5) - 200+
        bumpiness(b, r/100, bNum, phi*360/cols);

        let pos = createVector(x, y, z);
        v[theta].push(pos);
    }
  }

  for(let theta = 0; theta < v.length; theta++){

    fill(340, 100-theta, 150);
    for(let phi = 0; phi < v[theta].length; phi++){
      if(theta < v.length-1 && phi < v[theta].length-1){
        beginShape();
        vertex(v[theta][phi].x, v[theta][phi].y, v[theta][phi].z);
        vertex(v[theta+1][phi].x, v[theta+1][phi].y, v[theta+1][phi].z);
        vertex(v[theta+1][phi+1].x, v[theta+1][phi+1].y, v[theta+1][phi+1].z);
        vertex(v[theta][phi+1].x, v[theta][phi+1].y, v[theta][phi+1].z);
        endShape(CLOSE);
      }else if(theta < v.length-1 && phi == v[theta].length-1){
        beginShape();
        vertex(v[theta][phi].x, v[theta][phi].y, v[theta][phi].z);
        vertex(v[theta][0].x, v[theta][0].y, v[theta][0].z);
        vertex(v[theta+1][0].x, v[theta+1][0].y, v[theta+1][0].z);
        vertex(v[theta+1][phi].x, v[theta+1][phi].y, v[theta+1][phi].z);
        endShape(CLOSE);
      }
    }
  }

  v = [];
  pop();
}


function vShape(A, r, a, b, c){
  return A*pow(Math.E, -b*pow(abs(r), c))*pow(abs(r), a);
}

function bumpiness(A, r, f, angle){
  return 1 + A * pow(r, 2) * sin(f * angle);
}




function flower2(dia, text2){
let m = map(dia,-50,50,0.1,2.5)
console.log(dia);
console.log("Bade Phool ka Radius:" + m);
let v = [];
let cols = 600, rows = 30;
let t_D = 180*15 / cols;
let r_D =  1 / rows;

let canvas;
let opening = 3;
let vDensity = m;
let pAlign = 3.6;
let curve1 = 2;
let curve2 = 1.3;
push();
rotateX(270);
translate(0, 150, 0);

  for(let r = 0; r <= rows; r++){
    v.push([]);
    for(let theta = 0; theta <= cols; theta++){
      let phi = (180/opening)*Math.exp(-theta*t_D/(vDensity*180));
      let petalCut = 1 - (1/2) * pow((5/4)*pow(1-((pAlign*theta*t_D%360)/180), 2)-1/4, 2);
      let hangDown = curve1*pow(r*r_D, 2)*pow(curve2*r*r_D-1, 2)*sin(phi);

      let pX = 260 * petalCut * (r*r_D * sin(phi)+hangDown*cos(phi)) * sin(theta*t_D);
      let pY = -260 * petalCut * (r*r_D * cos(phi)-hangDown*sin(phi));
      let pZ = 260 * petalCut * (r*r_D * sin(phi)+hangDown*cos(phi)) * cos(theta*t_D);
      let pos = createVector(pX, pY, pZ);
      v[r].push(pos);
    }
  }

  for(let r = 0; r < v.length; r++){
    fill(270, 100, -20+r*r_D*120);
    for(let theta = 0; theta < v[r].length; theta++){
	     if(r < v.length-1 && theta < v[r].length-1){
         beginShape();
         vertex(v[r][theta].x, v[r][theta].y, v[r][theta].z);
         vertex(v[r+1][theta].x, v[r+1][theta].y, v[r+1][theta].z);
         vertex(v[r+1][theta+1].x, v[r+1][theta+1].y, v[r+1][theta+1].z);
         vertex(v[r][theta+1].x, v[r][theta+1].y, v[r][theta+1].z);
         endShape(CLOSE);
       }
    }
  }

  v = [];
  
pop();
}

function mouseClicked() {
  dia+=2;
}
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    dia-= 1 ;
  } else{
    clear();
  }
}


