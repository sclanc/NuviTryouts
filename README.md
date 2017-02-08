#Read This First!

##For the reviewer's consideration: 

The app is not as responsive to smaller screens as I would have hoped, this is mainly because the CSS framework that I am 
using in React is a very early release. The main problem is with the buttons on each action card, they don't respond to 
changes in screen size, which can push things around in frustrating ways. I do feel however, that the purpose of this 
exercise is accomplished regardless. Adjusting the zoom in your browser will correct this problem. (if using Chrome, Ctrl+- || Ctrl++)
   
------

##Build Instructions 

###Locally serving the Build File:
 
 In a Terminal window on a unix based operating system: 
 1. navigate to the directory that contains the build folder
 2. npm install -g pushstate-server
 3. pushstate-server build
 4. open web browser of choice
 5. navigate to http://localhost:9000
 
 ###Build the project yourself and run locally:
 
 In a Terminal window on a unix based operating system: 
 1. navigate to the directory that contains the package.JSON file for this project
 2. npm install 
 3. npm start
 
