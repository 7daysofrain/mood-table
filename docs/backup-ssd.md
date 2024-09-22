# Get the disk name
$ diskutil list

# Umount the disk
$ diskutil umountDisk /dev/disk5

# Backup
$ sudo dd if=/dev/disk5 status=progress bs=10M | gzip -c > ./backup.img.gz

# Restore
$ gunzip -c /Volumes/drive_name/folder/backup.img.gz | sudo dd of=/dev/disk5 status=progress bs=100M
