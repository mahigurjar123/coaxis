import os
import re

def fix_paths(content):
    # Fix images
    content = re.sub(r'src="\./images/', 'src="/images/', content)
    content = re.sub(r'src="images/', 'src="/images/', content)
    
    # Fix CSS
    content = re.sub(r'href="style.css"', 'href="/style.css"', content)
    content = re.sub(r'href="\./style.css"', 'href="/style.css"', content)
    
    # Fix JS
    content = re.sub(r'src="main.js"', 'src="/main.js"', content)
    content = re.sub(r'src="\./main.js"', 'src="/main.js"', content)
    
    # Fix internal links to root pages
    root_pages = ['index.html', 'solutions.html', 'services.html', 'partners.html', 'process.html', 'insights.html', 'news.html', 'blogs.html', 'case-studies.html', 'about.html', 'contact.html']
    for page in root_pages:
        content = re.sub(f'href="{page}"', f'href="/{page}"', content)
        content = re.sub(f'href="./{page}"', f'href="/{page}"', content)
        
    return content

for root, dirs, files in os.walk('.'):
    if 'node_modules' in dirs:
        dirs.remove('node_modules')
    if '.git' in dirs:
        dirs.remove('.git')
        
    for file in files:
        if file.endswith('.html'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = fix_paths(content)
            
            if content != new_content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Fixed paths in {path}")
