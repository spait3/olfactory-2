function branch1(dia){
  push();
  translate(-100,100,-100)
  rotateZ(40)
  scale(30+(dia/3));
  texture(t);
  model(branch);
  pop();
}
 
function branch2(dia){
  push();
  translate(-100,-100,-100);
  rotateZ(120);
  scale(30+(dia/3));
  texture(t);
  model(branch);
  pop();
}

function branch3(dia){
  push();
  translate(100,-100,-100);
  rotateZ(240);
  scale(30+(dia/3));
  texture(t);
  model(branch);
  pop();
}


function branch4(dia){
  push();
  translate(+100,100,-100)
  rotateZ(320)
  scale(30+(dia/3));
  texture(t);
  model(branch);
  pop();
}

function lemon1(dia){
  //
  push();
  scale(1*(dia/2));
  translate(5,-10,-20);
  texture(lemtext);
  rotateX(1.7*dia)
  model(lem);
  pop();
}



