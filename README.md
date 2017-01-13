# camera-upload-backup
A script to automatically back up Camera Upload of Dropbox

```sh
node index.js --src path-to-camera-upload --out output-dir
```
### Output Directory Structure

```
├── YYYY
|   └── YYYY MMM
|       └── YYYY MMM D
|           ├── file 
```

Change this [line](https://github.com/waitingcheung/camera-upload-backup/blob/master/index.js#L28) to modify the output directory structure.
