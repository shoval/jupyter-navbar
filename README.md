# jupyter-navbar
A handy navigation pane for Jupyter Notebook.
Jupyter-navbar searches for headers written in markdown cells, and displays links to them in the sidebar in a hierarchical fashion. The sidebar is resizable and can be toggled.

![Screenshot of jupyter-navbar](https://raw.githubusercontent.com/shoval/jupyter-navbar/master/screenshots/navbar_screenshot.png?v=2)

## Installation 

Either clone or download/extract jupyter-navbar into the `.jupyter/custom/` directory, such that the files `navbar.css` and `navbar.js` are under `.jupyter/custom/jupyter-navbar/`.

__Note:__ the `.jupyter` directory should be inside your home directory:
* In Linux: `~/.jupyter`
* In Windows: `%HOMEPATH%\.jupyter`

Copy and paste the following code into `.jupyter/custom/custom.js`:

    $.getScript("/custom/jupyter-navbar/navbar.js");

Copy and paste the following code _at the very top_ of `.jupyter/custom/custom.css`:

    @import url("jupyter-navbar/navbar.css");

The code in `custom.css` and `custom.js` gets automatically executed when a notebook is loaded. In turn, the navbar code gets called.

### Compatibility with jupyter-themes

The third-party package [jupyter-themes](https://github.com/dunovank/jupyter-themes) changes the design of Jupyter notebooks. It does so by overwriting the contents of `custom.css`. When installing jupyter-navbar, you should add the `@import` code to the top of the file. When changing a theme, you will need to add it again, since the CSS file gets replaced.
