import os

files_to_remove = [
    'about-us.html', 'about.html', 'blog-post.html', 'blogs.html', 
    'case-studies.html', 'case-study-visual.html', 'contact.html', 
    'insights.html', 'news.html', 'partners.html', 'process.html', 
    'services.html', 'solutions.html', 'cybersecurity.html', 
    'securitylens.html', 'risksignal.html', 'predictive-intelligence.html', 
    'what-is-ai.html', 'types-of-ai.html', 'ai-led-automation.html', 
    'ai-ready-data.html'
]

for file in files_to_remove:
    if os.path.exists(file):
        os.remove(file)
        print(f"Removed {file}")
