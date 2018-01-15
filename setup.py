from __future__ import print_function
import os
import shutil

to_copy = ['navbar.css', 'navbar.js']
text_insert = [
    ('custom.js', '$.getScript("/custom/jupyter-navbar/navbar.js");'),
    ('custom.css', '@import url("jupyter-navbar/navbar.css");'),
]

def line_in_file(content, text):
    """Test if row of text exists in file content"""
    for line in content.splitlines():
        line = line.strip()
        if line == code:
            return True
    return False

# Define paths
home = os.path.expanduser("~")
custom = os.path.join(home, '.jupyter/custom')
navbar = os.path.join(custom, 'jupyter-navbar')

print('Creating directory structure')
if not os.path.exists(navbar):
    os.makedirs(navbar)

# Copy JS and CSS file into subdir of custom
print('Copying necessary files')
for name in to_copy:
    target = os.path.join(navbar, name)
    shutil.copyfile(name, target)

# Append code to custom.js and custom.css to run navbar
print('Modifying custom.js and custom.css')
for name, code in text_insert:
    path = os.path.join(custom, name)

    content = ''
    if os.path.exists(path):
        with open(path) as f:
            content = f.read()

    if not line_in_file(content, code):
        with open(path, 'w+') as f:
            f.write('%s\n\n%s' % (code, content))  # Append to start of file

print('Setup complete successfully.')
