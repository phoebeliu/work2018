tomcat install

<https://wolfpaulus.com/mac/tomcat/>

<https://stackoverflow.com/questions/51906217/setting-up-tomcat-from-eclipse-in-mac>



eclips project start error:`Failed to initialize component`

<https://stackoverflow.com/questions/40945116/failed-to-start-component-zipexception-invalid-loc-header-bad-signature/41499934>

I have solved similar kind of problem by deleting all files present in local maven repository and downloading them again.

linux or mac users can follow below steps for deleting all files.

1. navigate to .m2 file
2. execute remove command (rm -rf repository/).

# [Where is my m2 folder on Mac OS X Mavericks](https://stackoverflow.com/questions/24496131/where-is-my-m2-folder-on-mac-os-x-mavericks)

On the top of the screen you can find the Finder. Click `Go -> Go to Folder -> search ~/.m2`

If it is not found, as `m2` is a hidden file you need to enable visibility by typing the following command in terminal:

```
defaults write com.apple.finder AppleShowAllFiles YES
```

