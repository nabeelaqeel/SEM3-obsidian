Kali Linux


------DOCKER------------

docker build - t <your_image_image> .

docker run -d --name your_container_name your_image_name

docker run -d -p 8080:80 --name your_container_name your_image_name
------------BINARY EXPLOITATION---------------------

gcc -o <file> <cfile> -g

-------------BASIC-------------
>     : rewrite file or empty files
>>    : add file
&     : run in background
&&    : run both or nor
||    : run either one

bug - xfwm4

./file - to run file 
./file -h - to help #but not every program has this

Image
binwalk file : check for other file type signature in the image file
exiftool file : check for any interesting exif-metadata
exiftool -b file :
Use stegsolve and switch through the layers and look for abnormalities.
Use zsteg to automatically test the most common bitstegos and sort by %ascii-in-results. : for png only
string file : print out strings that are at least 4 characters long
grep "String" file : search for a specific string in a file or output
hexdump file
base64 file
base64 -d <<< base64String
openssl base64 -d <<< base64String
we can unzip .jpg : use binwalk first to check if there a zip
xxd file
stat file
head file
strings file
tr
awk


Notes:
 BMP file is short for Bitmap Image file 

General 

you can tab to autocomplete cd


Web

GET,POST,HEAD
/robots.txt --> can Disallow: /example.html
apache : /.htaccess
mac : DS_Store
javascript can be run on bookmark : bookmarklet

grep -r "String" * : for searching all directories and sub
/index.phps --> source of index.php file


Cryptography
A1Z26 : change 1=A,2=B..26=Z
nc ip port : 



netsh wlan show profile
netsh wlan show profiles name="Angkasa Gemilang 5G" key=clear

-----------------Forensic-----------------------

sha256sum <files>

u can sha256sum <directory>/* --> all files

zbarimg <files>
zbarimg -q --raw <files>
zbarcam
tar -xzvf : unzip the tar.qz file
stegseek
sstv -d <file> -o dump.png: convert .wav file

one file can have both pdf and png filetype see in binwalk . you can copy and change extension
