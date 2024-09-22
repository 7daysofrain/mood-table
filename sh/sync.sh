alias run_rsync='sshpass -p "raspberry" rsync -azP --exclude ".*/" --exclude ".*" --exclude "tmp/" --exclude "node_modules/" . pi@moodtable.local:/home/pi/f1-led'
run_rsync; fswatch -o . | while read f; do run_rsync; done
