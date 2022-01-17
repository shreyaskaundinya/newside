# Newsside - News app using the NY Times API and MERN Stack

## Data flow Diagram

![data flow image](https://github.com/shreyaskaundinya/newside/blob/main/assets/newside-data-flow.drawio.png?raw=true)

## Git Commands / Git branch strategy

### If you're a contributor, steps to start contributing :

1.

-   Clone the git repository using : `git clone <git link>`
-   [or] use ssh method [google]
-   [or] continue using the previously cloned repo

2.

-   Create a new branch for a new feature/update/bug using the naming convention
    below
-   [or] Use already created branch
-   [or] If branch is/was merged then deleted the merged branch and create a new
    one

3. Make changes and add the changes to staging area using :

-   `git add .` : add all files
-   `git add <file name>` : add file by file to make the commit more meaningful

4. Commit the changes in the branch

-   `git commit -m <message in quotes>` : commit with a message which describes
    the changes made
-   `git commit -am <message in quotes>` : to add all files to staging and
    commit

5. Push the code to the remote repo : `git push -u origin <branch name>`

6. Pull a request with the details of what changes has been made [this is done
   on github]

To create a branch : `git checkout -b <branch name>`

To check the status / see what changes are made / add files to the staging area
: `git status`

To check which branch you're currently on:

-   `git status`
-   List of branches : `git branch --list`

### Branch Name Convention

[yourname]\_[feature/update/fix]\_[page/component]

Example :

john-doe_feature_creating-navbar

john-doe_update_login-page

john-doe_fix_signup-form
