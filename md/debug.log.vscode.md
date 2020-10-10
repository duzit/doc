
### I might have found a workaround for this issue.   
I'm not sure what's causing it, but changing the permissions on the folder C:\Program Files\Microsoft VS Code Insiders seems to have made the issue go away. What I changed was:

1. Open the folder properties
2. Go to the security tab
3. Click Edit -> Add...
4. Add my user
5. Give my user the Full Control permissions
