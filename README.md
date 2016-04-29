# education
A e-system to learn Chinese


First! You need to install NodeJS!

How to Set Up:

1. git clone https://github.com/one-pieces/education.git
2. cd education
3. npm install
4. bower install
5. grunt update
6. grunt develop
7. 浏览器输入localhost:5000/education

Attention!! If it report some ERROR about "node-sass" when running grunt update, please run "npm rebuild node-sass". More detail on http://stackoverflow.com/questions/28409100/try-reinstalling-node-sass-on-node-0-12#

This project has used MEAN(Mongo, Express, AngularJS, NodeJS) framework. The following is the file structure:

1. app -- The front end code folders
2. config -- The env configuration files
3. server -- The back end code folders
4. gruntfile.js -- The grunt configuration file (The JavaScript Task Runner, http://gruntjs.com/)
5. bower.json -- A mainfest file which Bower keeps track of the packages in (Bower is a package manager for the web, http://bower.io/)
6. package.json -- A mainfest file of npm (npm is a package manager for NodeJS, https://www.npmjs.com/)
7. .bowerrc -- The Bower configuration file
8. .gitigonre -- A mainfest file which the files git will igonre
9. .jshintrc -- The configuration file of JSHint
10. .csslintrc -- The configuration file of CSSLintrc