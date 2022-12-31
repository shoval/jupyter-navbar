# jupyter-navbar
A handy navigation pane for Jupyter Notebook.
Jupyter-navbar searches for headers written in markdown cells, and displays links to them in the sidebar in a hierarchical fashion. The sidebar is resizable and collapsible.

![Screenshot of jupyter-navbar](https://raw.githubusercontent.com/shoval/jupyter-navbar/master/screenshots/navbar_screenshot.png?v=3)

## Installation

### Using setup.py

1. Clone or download/extract jupyter-navbar
2. Run `python setup.py` from within the directory

__Note:__ if you have any trouble with `setup.py`, you may proceed to manual installation.

### Manual installation

1. Either clone or download/extract jupyter-navbar
2. Locate the `.jupyter` directory, which should be inside your home directory:
    * In Linux: `~/.jupyter`
    * In Windows: `%HOMEPATH%\.jupyter`
3. Copy `navbar.css` and `navbar.js` to `.jupyter/custom/jupyter-navbar/` (create directories as needed)
4. Copy and paste the following code into `.jupyter/custom/custom.js` (create file if it doesn't exist):

       $.getScript("/custom/jupyter-navbar/navbar.js");
    
5. Copy and paste the following code _at the very top_ of `.jupyter/custom/custom.css` (create file if it doesn't exist):

       @import url("jupyter-navbar/navbar.css");

The code in `custom.css` and `custom.js` gets automatically executed when a notebook is loaded. In turn, the navbar code gets called.

### Manual uninstall

1. Locate the `.jupyter` directory, which should be inside your home directory:
    * In Linux: `~/.jupyter`
    * In Windows: `%HOMEPATH%\.jupyter`
2. Locate and remove the following line from `.jupyter/custom/custom.js`:

       $.getScript("/custom/jupyter-navbar/navbar.js");
    
3. Locate and remove the following line from `.jupyter/custom/custom.css`:

       @import url("jupyter-navbar/navbar.css");
       
4. Optional: delete the directory `jupyter-navbar` from `.jupyter/custom/`

### Compatibility with jupyter-themes

The third-party package [jupyter-themes](https://github.com/dunovank/jupyter-themes) changes the design of Jupyter notebooks. It does so by overwriting the contents of `custom.css`. When installing jupyter-navbar, you should add the `@import` code to the top of the file. When changing a theme, you will need to add it again, since the CSS file gets replaced. This can be done either manually, or by running `setup.py` again.
