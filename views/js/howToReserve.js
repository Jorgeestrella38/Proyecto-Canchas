
       var image1= document.getElementById("1");
       image1.addEventListener('mouseover', setImage1On);
       image1.addEventListener('mouseout', setImage1Out);
       function setImage1On(){var i="1"; hoverFunOn(i);}
       function setImage1Out(){var i="1"; hoverFunOut(i);}

       var image1= document.getElementById("2");
       image1.addEventListener('mouseover', setImage2On);
       image1.addEventListener('mouseout', setImage2Out);
       function setImage2On(){var i="2"; hoverFunOn(i);}
       function setImage2Out(){var i="2"; hoverFunOut(i);}

       var image1= document.getElementById("3");
       image1.addEventListener('mouseover', setImage3On);
       image1.addEventListener('mouseout', setImage3Out);
       function setImage3On(){var i="3"; hoverFunOn(i);}
       function setImage3Out(){var i="3"; hoverFunOut(i);}

       var image1= document.getElementById("4");
       image1.addEventListener('mouseover', setImage4On);
       image1.addEventListener('mouseout', setImage4Out);
       function setImage4On(){var i="4"; hoverFunOn(i);}
       function setImage4Out(){var i="4"; hoverFunOut(i);}

       var image1= document.getElementById("5");
       image1.addEventListener('mouseover', setImage5On);
       image1.addEventListener('mouseout', setImage5Out);
       function setImage5On(){var i="5"; hoverFunOn(i);}
       function setImage5Out(){var i="5"; hoverFunOut(i);}

       function hoverFunOn(e){
           var image = document.getElementById(e)
           image.style.height="19vw"
           image.style.width="32vw"
           image.style.marginTop="1vw"
           image.style.marginBottom="1vw"
           image.style.marginRight="0vw"
           image.style.marginLeft="0vw"
       }
       function hoverFunOut(e){
           var image = document.getElementById(e)
           image.style.height="17vw"
           image.style.width="30vw"
           image.style.marginTop="2vw"
           image.style.marginBottom="2vw"
           image.style.marginRight="1vw"
           image.style.marginLeft="1vw"
       }