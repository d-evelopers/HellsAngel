# Hell's Angel #
In it's current form, this is a VN engine with some development tools
that were made to allow a number of people who wanted to build a game
to do just that!

Hell's Angel was planned to be a game where you somehow find a devil girl
in your care. The idea was that neither of you knew where she came from,
but if she was going to live with you, she was going to have to live
under your rules.

This repo is currently dormant, but if there is interest to make
something with it, maybe I'll just have to continue to build the tools to
do so..!

[![Build Status](https://travis-ci.org/d-evelopers/HellsAngel.svg?branch=master)](https://travis-ci.org/d-evelopers/HellsAngel)

## Prerequisates ##
You will first need [Node.js](https://nodejs.org/en/) insatlled on
your system to develop or use Hell's Angel.

...and if you wish to contribute changes, you will also need
[Git](https://git-scm.com/) installed.

## Installing ##
First thing you'll need to do is get the codebase from
[GitHub](https://github.com/d-evelopers/HellsAngel).

You can either download a ZIP containing the code from the above
linked page, or by running the following command in the folder you
want to download the code to:
```sh
git clone https://github.com/d-evelopers/HellsAngel.git
```

And then, when you are in the folder, run the command:
```sh
npm install
```

This will download all of the things needed to run and develop Hell's
Angel.

After that, you have two choices, you can either run the program
normally like so:
```sh
npm start
```

Or, you can run it in debug mode like:
```sh
npm run dev
```
In addition to starting the game, this will:
- Show the menubar of the application (Allowing access to the Blink
  devtools)
- ...and drop the console to a REPL

In the REPL, you can type `reactionEditor()` to open the respective
window, or `help()` to get a list of the things you can use. (There is
Tab completion so you can explore..!)

## Troubleshooting ##
This section is for common questions about getting things up and
running. If I get asked a question that isn't in this section
enough--I'll add it..!

### Halp! `git pull` broke something! ###
Usually, this is because of a dependency change and can usually be
fixed with `npm update`.

If that does not solve it, copy any files you have added that you want
to keep, run `git clean -df` and then `npm install`.

If that doesn't do it either... Post a
[bug](https://github.com/d-evelopers/HellsAngel/issues), and I'll see
what I can do for you!
