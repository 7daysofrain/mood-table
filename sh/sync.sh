alias run_rsync='rsync -azP --exclude ".*/" --exclude ".*" --exclude "tmp/" /Users/7daysofrain/Documents/Proyectos/mood-table pi@moodtable.local:/home/pi/f1-led'
run_rsync; fswatch -o . | while read f; do run_rsync; done
