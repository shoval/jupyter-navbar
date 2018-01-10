# jupyter-navbar
Add a handy navigation pane for Jupyter Notebook that follows markdown headers

![Screenshot of jupyter-navbar](https://raw.githubusercontent.com/shoval/jupyter-navbar/master/screenshots/navbar_screenshot.png)

## Installation 

Place `navbar.css` and `navbar.js` in the `.jupyter/custom/` directory.
The `.jupyter` directory should be in your home directory:
* In Linux: `~/.jupyter`
* In Windows: `%HOMEPATH%\.jupyter`

Copy and paste the following code into `.jupyter/custom/custom.js`:

    $.getScript("/custom/navbar.js");

Copy and paste the following code into `.jupyter/custom/custom.css`:

    @import url("navbar.css");

The code in `custom.css` and `custom.js` gets automatically executed when a notebook is loaded. In turn, the navbar code gets called.
