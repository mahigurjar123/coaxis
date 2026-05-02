import os
import re

# Move files to folder-based index.html
mappings = {
    'solutions.html': 'solutions/index.html',
    'insights.html': 'insights/index.html',
    'about.html': 'about-us/index.html',
    'services.html': 'solutions/services/index.html',
    'partners.html': 'solutions/partners/index.html',
    'process.html': 'solutions/process/index.html',
    'news.html': 'insights/news/index.html',
    'blogs.html': 'insights/blogs/index.html',
    'case-studies.html': 'insights/case-studies/index.html',
}

# Create directories if they don't exist
for src, dst in mappings.items():
    dir_path = os.path.dirname(dst)
    if not os.path.exists(dir_path):
        os.makedirs(dir_path)
    
    if os.path.exists(src):
        with open(src, 'r', encoding='utf-8') as f:
            content = f.read()
        with open(dst, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Copied {src} to {dst}")

# Define navigation replacements
nav_replacements = {
    '/solutions.html': '/solutions/',
    '/insights.html': '/insights/',
    '/about.html': '/about-us/',
    '/services.html': '/solutions/services/',
    '/partners.html': '/solutions/partners/',
    '/process.html': '/solutions/process/',
    '/news.html': '/insights/news/',
    '/blogs.html': '/insights/blogs/',
    '/case-studies.html': '/insights/case-studies/',
    '/contact.html': '/contact/' # Let's do contact too
}

if not os.path.exists('contact'):
    os.makedirs('contact')
if os.path.exists('contact.html'):
    with open('contact.html', 'r', encoding='utf-8') as f:
        content = f.read()
    with open('contact/index.html', 'w', encoding='utf-8') as f:
        f.write(content)

def update_nav(content):
    for old, new in nav_replacements.items():
        content = content.replace(f'href="{old}"', f'href="{new}"')
    return content

# Update all HTML files
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
            
            new_content = update_nav(content)
            
            if content != new_content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated navigation in {path}")
